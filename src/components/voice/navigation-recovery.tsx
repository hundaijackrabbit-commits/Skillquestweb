'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';

type UnknownRecord = Record<string, unknown>;

type ResolverResult = {
  found?: boolean;
  path?: string;
  label?: string;
};

const USER_ROLES = new Set(['user', 'human', 'customer', 'caller']);
const AGENT_ROLES = new Set(['assistant', 'agent']);
const DIRECT_USER_NAV = /\b(?:take me(?:\s+to)?|go(?:\s+to)?|open|show me|navigate(?:\s+me)?(?:\s+to)?|bring me(?:\s+to)?|visit|head(?:\s+to)?|send me(?:\s+to)?)\b/i;
const DIRECT_AGENT_NAV = /\b(?:take you(?:\s+to)?|open(?:ing)?|navigate(?:\s+you)?(?:\s+to)?|bring you(?:\s+to)?|send you(?:\s+to)?|go(?:ing)?(?:\s+to)?)\b/i;
const ALLOWED_PREFIXES = ['/blog/', '/careers/', '/industries/', '/learn/', '/paths/', '/skills/', '/topics/'];
const ALLOWED_ROUTES = new Set([
  '/', '/about', '/blog', '/careers', '/community', '/dashboard', '/free-career-guide',
  '/industries', '/learn', '/paths', '/privacy', '/skills', '/topics',
]);

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
  return ALLOWED_ROUTES.has(pathOnly) || ALLOWED_PREFIXES.some((prefix) => pathOnly.startsWith(prefix)) ? path : null;
}

function extractText(payload: UnknownRecord, wantedRoles: Set<string>) {
  for (const record of collectRecords(payload)) {
    const role = firstString(record.role, record.speaker, record.author)?.toLowerCase();
    if (!role || !wantedRoles.has(role)) continue;
    const text = firstString(record.text, record.transcript, record.utterance, record.message, record.content);
    if (text) return text;
  }
  return undefined;
}

function extractExplicitUserTranscript(payload: UnknownRecord) {
  const eventType = firstString(payload.event, payload.type)?.toLowerCase() || '';
  if (!/(?:user|input|caller|customer).*(?:transcript|speech|text|turn)|(?:transcript|speech).*(?:user|input|caller|customer)/i.test(eventType)) {
    return undefined;
  }
  for (const record of collectRecords(payload)) {
    const text = firstString(record.text, record.transcript, record.utterance, record.message, record.content);
    if (text) return text;
  }
  return undefined;
}

function likelyAgentNavigation(text: string | undefined) {
  if (!text || !DIRECT_AGENT_NAV.test(text)) return false;
  return /\b(?:page|section|skill|career|industry|blog|article|topic|path|dashboard|community|home|skills|careers|industries)\b/i.test(text);
}

export function NavigationRecovery() {
  const router = useRouter();
  const pathname = usePathname();
  const lastHandled = useRef('');
  const sequence = useRef(0);

  useEffect(() => {
    const NativeWebSocket = window.WebSocket;

    const resolveAndGo = async (text: string) => {
      const key = text.trim().toLocaleLowerCase('en');
      if (!key || key === lastHandled.current) return;
      lastHandled.current = key;
      const requestId = ++sequence.current;

      try {
        const response = await fetch('/api/agent/resolve-page', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: text }),
        });
        if (!response.ok || requestId !== sequence.current) return;
        const result = await response.json() as ResolverResult;
        const path = normalizeInternalPath(result.path);
        if (!result.found || !path || requestId !== sequence.current) return;
        if (path.split(/[?#]/)[0] === pathname) return;

        router.prefetch(path);
        router.push(path);
        window.setTimeout(() => {
          if (window.location.pathname !== path.split(/[?#]/)[0]) window.location.assign(path);
        }, 700);
      } catch {
        // Voice conversation should continue even if navigation resolution fails.
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

            const userText = extractText(payload, USER_ROLES) || extractExplicitUserTranscript(payload);
            if (userText && DIRECT_USER_NAV.test(userText)) {
              void resolveAndGo(userText);
              return;
            }

            // Recovery path for sessions where Cartesia no longer emits a navigation tool call
            // but the agent verbally confirms that it is opening a destination.
            const agentText = extractText(payload, AGENT_ROLES);
            if (likelyAgentNavigation(agentText)) void resolveAndGo(agentText!);
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

  return null;
}
