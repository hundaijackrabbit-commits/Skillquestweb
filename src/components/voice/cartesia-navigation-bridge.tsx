'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

type UnknownRecord = Record<string, unknown>;
type PendingNavigation = { path: string; label: string } | null;
type ResolvedNavigation = { path: string; label: string };
type ResolverResponse = {
  found?: boolean;
  path?: string;
  label?: string;
  type?: string;
  confidence?: number;
};

const ALLOWED_PREFIXES = ['/blog/', '/careers/', '/industries/', '/learn/', '/paths/', '/skills/', '/topics/'];
const ALLOWED_ROUTES = new Set([
  '/', '/about', '/blog', '/careers', '/community', '/dashboard', '/free-career-guide',
  '/industries', '/learn', '/paths', '/privacy', '/skills', '/topics',
]);
const NAVIGATION_TOOL_NAMES = new Set(['navigate_page', 'validate_navigation', 'navigate', 'open_page']);

const TOP_LEVEL_DESTINATIONS: Array<{ path: string; label: string; aliases: string[] }> = [
  { path: '/skills', label: 'Skills', aliases: ['skill', 'skills', 'skills page', 'skill page', 'skill library', 'skills library', 'skills section'] },
  { path: '/careers', label: 'Careers', aliases: ['career', 'careers', 'career page', 'careers page', 'career library', 'careers section'] },
  { path: '/industries', label: 'Industries', aliases: ['industry', 'industries', 'industry page', 'industries page', 'industries section'] },
  { path: '/learn', label: 'Learn', aliases: ['learn', 'learn page', 'learning hub'] },
  { path: '/paths', label: 'Learning Paths', aliases: ['path', 'paths', 'learning path', 'learning paths', 'skill path', 'skill paths'] },
  { path: '/blog', label: 'Blog', aliases: ['blog', 'blog page', 'articles', 'article library'] },
  { path: '/community', label: 'Community', aliases: ['community', 'community page'] },
  { path: '/dashboard', label: 'Dashboard', aliases: ['dashboard', 'my dashboard', 'my account', 'profile'] },
  { path: '/free-career-guide', label: 'Free Career Guide', aliases: ['free career guide', 'career guide'] },
  { path: '/topics', label: 'Topics', aliases: ['topic', 'topics', 'topics page', 'topics section'] },
  { path: '/about', label: 'About', aliases: ['about', 'about us', 'about page'] },
  { path: '/privacy', label: 'Privacy', aliases: ['privacy', 'privacy policy', 'privacy page'] },
  { path: '/', label: 'Home', aliases: ['home', 'homepage', 'home page', 'main page'] },
];

const DIRECT_NAVIGATION_INTENT = /\b(?:take me(?:\s+to)?|go(?:\s+to)?|open|show me|navigate(?:\s+me)?(?:\s+to)?|bring me(?:\s+to)?|visit|head(?:\s+to)?|send me(?:\s+to)?)\b/i;

function asRecord(value: unknown): UnknownRecord {
  return value && typeof value === 'object' && !Array.isArray(value) ? value as UnknownRecord : {};
}

function maybeParse(value: unknown): unknown {
  if (typeof value !== 'string') return value;
  const trimmed = value.trim();
  if (!trimmed || (!trimmed.startsWith('{') && !trimmed.startsWith('['))) return value;
  try { return JSON.parse(trimmed); } catch { return value; }
}

function collectRecords(value: unknown, depth = 0, records: UnknownRecord[] = []): UnknownRecord[] {
  if (depth > 9) return records;
  const parsed = maybeParse(value);
  if (Array.isArray(parsed)) {
    for (const item of parsed) collectRecords(item, depth + 1, records);
    return records;
  }
  if (!parsed || typeof parsed !== 'object') return records;
  const record = parsed as UnknownRecord;
  records.push(record);
  for (const nested of Object.values(record)) collectRecords(nested, depth + 1, records);
  return records;
}

function firstString(...values: unknown[]) {
  for (const value of values) if (typeof value === 'string' && value.trim()) return value.trim();
  return undefined;
}

function firstBoolean(...values: unknown[]) {
  for (const value of values) {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') {
      const normalized = value.trim().toLowerCase();
      if (['true', 'yes', 'approved', 'confirmed', 'allowed'].includes(normalized)) return true;
      if (['false', 'no', 'denied', 'declined', 'rejected'].includes(normalized)) return false;
    }
  }
  return undefined;
}

function normalizeText(value: string) {
  return value
    .toLocaleLowerCase('en')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeInternalPath(value: unknown) {
  if (typeof value !== 'string') return null;
  let path = value.trim();
  if (!path) return null;

  try {
    if (path.startsWith('http://') || path.startsWith('https://')) {
      const url = new URL(path);
      if (!['modernskilllab.space', 'www.modernskilllab.space'].includes(url.hostname)) return null;
      path = `${url.pathname}${url.search}${url.hash}`;
    }
  } catch { return null; }

  if (!path.startsWith('/')) path = `/${path}`;
  const pathOnly = path.split(/[?#]/)[0] || '/';
  const allowed = ALLOWED_ROUTES.has(pathOnly) || ALLOWED_PREFIXES.some((prefix) => pathOnly.startsWith(prefix));
  return allowed ? path : null;
}

function toolNameFromRecord(record: UnknownRecord) {
  const fn = asRecord(record.function);
  const name = firstString(record.name, record.tool_name, record.function_name, fn.name, record.action, record.tool);
  return name?.toLowerCase();
}

function isDirectNavigationRequest(text: string | undefined) {
  return Boolean(text && DIRECT_NAVIGATION_INTENT.test(text));
}

function navigationDestinationText(text: string) {
  return normalizeText(text)
    .replace(/^(?:please\s+)?(?:take me(?:\s+to)?|go(?:\s+to)?|open|show me|navigate(?:\s+me)?(?:\s+to)?|bring me(?:\s+to)?|visit|head(?:\s+to)?|send me(?:\s+to)?)\s+/, '')
    .replace(/^the\s+/, '')
    .replace(/\s+(?:for me|please)$/, '')
    .trim();
}

function resolveKnownDestination(text: string | undefined): ResolvedNavigation | null {
  if (!text) return null;
  const requested = navigationDestinationText(text);
  if (!requested) return null;

  // Fast-path only exact top-level section requests. Anything more specific —
  // for example "cross cultural leadership skill" — must go through the
  // canonical resolver so the word "skill" never swallows the actual title.
  for (const destination of TOP_LEVEL_DESTINATIONS) {
    if (destination.aliases.some((alias) => normalizeText(alias) === requested)) {
      return { path: destination.path, label: destination.label };
    }
  }

  return null;
}

function extractUserUtterance(payload: UnknownRecord) {
  const records = collectRecords(payload);
  const eventType = firstString(payload.event, payload.type)?.toLowerCase() || '';

  for (const record of records) {
    const role = firstString(record.role, record.speaker)?.toLowerCase();
    if (role !== 'user' && role !== 'human') continue;
    const text = firstString(record.text, record.transcript, record.utterance, record.message, record.content);
    if (text) return text;
  }

  if (/(?:user|input).*(?:transcript|speech|text)|(?:transcript|speech).*(?:user|input)/i.test(eventType)) {
    for (const record of records) {
      const text = firstString(record.text, record.transcript, record.utterance, record.message, record.content);
      if (text) return text;
    }
  }

  return undefined;
}

function extractNavigation(payload: UnknownRecord) {
  const records = collectRecords(payload);
  let hasNavigateMarker = false;
  let path: string | null = null;
  let label: string | undefined;
  let permissionGranted: boolean | undefined;

  for (const record of records) {
    const toolName = toolNameFromRecord(record);
    if (toolName && NAVIGATION_TOOL_NAMES.has(toolName)) hasNavigateMarker = true;

    if (!path) path = normalizeInternalPath(firstString(record.path, record.url, record.destination, record.href, record.route, record.pathname));
    if (!label) label = firstString(record.label, record.title, record.page_label, record.page_name)?.slice(0, 100);
    if (permissionGranted === undefined) {
      permissionGranted = firstBoolean(record.permission_granted, record.permissionGranted, record.confirmed, record.user_confirmed, record.userConfirmed, record.approved);
    }
  }

  if (!hasNavigateMarker || !path) return null;
  return { path, label: label || 'that page', permissionGranted };
}

function extractToolDiagnostics(payload: UnknownRecord) {
  const records = collectRecords(payload);
  const names = new Set<string>();
  const argumentKeySets: string[][] = [];
  for (const record of records) {
    const name = toolNameFromRecord(record);
    if (name) names.add(name.slice(0, 80));
    const args = maybeParse(record.arguments ?? record.args ?? record.tool_args);
    if (args && typeof args === 'object' && !Array.isArray(args)) argumentKeySets.push(Object.keys(args as UnknownRecord).slice(0, 16));
  }
  return { toolNames: Array.from(names).slice(0, 12), argumentKeySets: argumentKeySets.slice(0, 8) };
}

function summarizeShape(payload: UnknownRecord, matchedNavigation: boolean, capturedUserText: boolean) {
  const records = collectRecords(payload);
  return {
    eventType: firstString(payload.event, payload.type) || 'unknown',
    topLevelKeys: Object.keys(payload).slice(0, 24),
    nestedKeySets: records.slice(0, 10).map((record) => Object.keys(record).slice(0, 18)),
    matchedNavigation,
    capturedUserText,
    ...extractToolDiagnostics(payload),
  };
}

export function CartesiaNavigationBridge() {
  const router = useRouter();
  const pathname = usePathname();
  const [pending, setPending] = useState<PendingNavigation>(null);
  const reportedShapes = useRef(new Set<string>());
  const latestUserText = useRef('');
  const lastDirectNavigation = useRef('');
  const resolverSequence = useRef(0);

  useEffect(() => {
    const NativeWebSocket = window.WebSocket;

    const goTo = (target: ResolvedNavigation) => {
      const alreadyThere = target.path.split(/[?#]/)[0] === pathname;
      if (alreadyThere) return;
      router.prefetch(target.path);
      router.push(target.path);
      setPending(null);
    };

    const resolveAndNavigate = async (text: string) => {
      const requestId = ++resolverSequence.current;
      try {
        const response = await fetch('/api/agent/resolve-page', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: text }),
        });
        if (!response.ok || requestId !== resolverSequence.current) return;
        const result = await response.json() as ResolverResponse;
        if (!result.found || !result.path || requestId !== resolverSequence.current) return;
        const path = normalizeInternalPath(result.path);
        if (!path) return;
        goTo({ path, label: result.label?.slice(0, 100) || 'that page' });
      } catch {
        // Keep the voice conversation alive if resolution fails.
      }
    };

    const PatchedWebSocket = new Proxy(NativeWebSocket, {
      construct(Target, args) {
        const socket = Reflect.construct(Target, args) as WebSocket;
        const url = String(args[0] ?? '');

        if (/agents\.cartesia\.ai/i.test(url)) {
          socket.addEventListener('message', (event) => {
            if (typeof event.data !== 'string') return;
            let payload: UnknownRecord;
            try { payload = asRecord(JSON.parse(event.data)); } catch { return; }

            const eventType = firstString(payload.event, payload.type)?.toLowerCase();
            if (eventType === 'media_output' || eventType === 'ack' || eventType === 'clear') return;

            const userText = extractUserUtterance(payload);
            if (userText) latestUserText.current = userText;

            if (userText && isDirectNavigationRequest(userText)) {
              const dedupeKey = userText.trim().toLocaleLowerCase('en');
              if (dedupeKey && dedupeKey !== lastDirectNavigation.current) {
                lastDirectNavigation.current = dedupeKey;
                const topLevelTarget = resolveKnownDestination(userText);
                if (topLevelTarget) goTo(topLevelTarget);
                else void resolveAndNavigate(userText);
              }
            }

            if (eventType === 'turn_output_text_delta') return;

            const navigation = extractNavigation(payload);
            const summary = summarizeShape(payload, Boolean(navigation), Boolean(userText));
            const shapeKey = JSON.stringify(summary);
            if (!reportedShapes.current.has(shapeKey)) {
              reportedShapes.current.add(shapeKey);
              fetch('/api/agent/client-event', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(summary),
                keepalive: true,
              }).catch(() => undefined);
            }

            if (!navigation) return;
            const alreadyThere = navigation.path.split(/[?#]/)[0] === pathname;
            if (alreadyThere) return;
            if (navigation.permissionGranted === true) {
              goTo({ path: navigation.path, label: navigation.label });
              return;
            }
            if (navigation.permissionGranted !== false) setPending({ path: navigation.path, label: navigation.label });
          });
        }
        return socket;
      },
    });

    window.WebSocket = PatchedWebSocket as typeof WebSocket;
    return () => {
      if (window.WebSocket === PatchedWebSocket) window.WebSocket = NativeWebSocket;
    };
  }, [pathname, router]);

  if (!pending) return null;

  return (
    <div className="fixed bottom-24 right-4 z-[80] w-[calc(100vw-2rem)] max-w-sm rounded-2xl border border-indigo-100 bg-white p-4 shadow-2xl sm:right-7">
      <p className="text-sm font-semibold text-slate-900">Open {pending.label}?</p>
      <p className="mt-1 text-xs leading-5 text-slate-600">The Skill Guide found this page. You decide whether to leave the current page.</p>
      <div className="mt-3 flex gap-2">
        <button type="button" onClick={() => setPending(null)} className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700">Stay here</button>
        <button
          type="button"
          onClick={() => {
            const target = pending.path;
            setPending(null);
            router.prefetch(target);
            router.push(target);
          }}
          className="flex-1 rounded-xl bg-indigo-700 px-3 py-2 text-sm font-semibold text-white"
        >
          Take me there
        </button>
      </div>
    </div>
  );
}
