'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

type UnknownRecord = Record<string, unknown>;
type PendingNavigation = { path: string; label: string } | null;

const ALLOWED_PREFIXES = ['/blog/', '/careers/', '/industries/', '/learn/', '/paths/', '/skills/', '/topics/'];
const ALLOWED_ROUTES = new Set([
  '/', '/about', '/blog', '/careers', '/community', '/dashboard', '/free-career-guide',
  '/industries', '/learn', '/paths', '/privacy', '/skills', '/topics',
]);
const CLIENT_FUNCTION_EVENTS = new Set([
  'client_function_call', 'client_tool_call', 'tool_call', 'function_call', 'agent_tool_called',
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
  if (depth > 7) return records;
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

function extractNavigation(payload: UnknownRecord) {
  const records = collectRecords(payload);
  const rootEvent = firstString(payload.event, payload.type)?.toLowerCase();

  let hasNavigateMarker = false;
  let path: string | null = null;
  let label: string | undefined;
  let permissionGranted: boolean | undefined;

  for (const record of records) {
    const markerValues = [record.name, record.tool_name, record.function_name, record.action, record.tool, record.function];
    for (const marker of markerValues) {
      if (typeof marker === 'string' && ['navigate_page', 'navigate', 'open_page'].includes(marker.trim().toLowerCase())) {
        hasNavigateMarker = true;
      }
    }

    if (!path) {
      path = normalizeInternalPath(firstString(record.path, record.url, record.destination, record.href, record.route, record.pathname));
    }
    if (!label) label = firstString(record.label, record.title, record.page_label, record.page_name)?.slice(0, 100);
    if (permissionGranted === undefined) {
      permissionGranted = firstBoolean(
        record.permission_granted,
        record.permissionGranted,
        record.confirmed,
        record.user_confirmed,
        record.userConfirmed,
        record.approved,
      );
    }
  }

  const looksLikeClientFunction = Boolean(rootEvent && CLIENT_FUNCTION_EVENTS.has(rootEvent));
  if (!path || (!hasNavigateMarker && !looksLikeClientFunction)) return null;

  return {
    path,
    label: label || 'that page',
    permissionGranted,
    trustedInvocation: hasNavigateMarker && looksLikeClientFunction,
    eventType: rootEvent || 'unknown',
  };
}

function summarizeShape(payload: UnknownRecord, matchedNavigation: boolean) {
  const records = collectRecords(payload);
  return {
    eventType: firstString(payload.event, payload.type) || 'unknown',
    topLevelKeys: Object.keys(payload).slice(0, 24),
    nestedKeySets: records.slice(0, 8).map((record) => Object.keys(record).slice(0, 16)),
    matchedNavigation,
  };
}

export function CartesiaNavigationBridge() {
  const router = useRouter();
  const pathname = usePathname();
  const [pending, setPending] = useState<PendingNavigation>(null);
  const reportedShapes = useRef(new Set<string>());

  useEffect(() => {
    const NativeWebSocket = window.WebSocket;

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

            const navigation = extractNavigation(payload);
            const summary = summarizeShape(payload, Boolean(navigation));
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

            if (navigation.permissionGranted === true || (navigation.permissionGranted === undefined && navigation.trustedInvocation)) {
              router.prefetch(navigation.path);
              router.push(navigation.path);
              setPending(null);
              return;
            }

            if (navigation.permissionGranted !== false) {
              setPending({ path: navigation.path, label: navigation.label });
            }
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
        <button
          type="button"
          onClick={() => setPending(null)}
          className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700"
        >
          Stay here
        </button>
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
