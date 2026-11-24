'use client';

import Link from 'next/link';
import { track } from '@vercel/analytics';
import { TranslatedText as T } from '@/components/providers/learning-language-provider';

type Destination = { href: string; title: string; action: string };

export function ContinueLearning({ source, destinations }: {
  source: string;
  destinations: Destination[];
}) {
  const unique = Array.from(new Map(destinations
    .filter((item) => item.href.startsWith('/') && !item.href.startsWith('//') && item.href !== source)
    .map((item) => [item.href, item])).values()).slice(0, 3);

  if (!unique.length) return null;

  function recordClick(target: string) {
    // Never prevent or delay navigation if analytics is unavailable.
    try {
      track('continue_learning', { source, destination: target });
    } catch { /* optional analytics */ }
    try {
      const key = 'msl_session_id';
      let sessionId = window.sessionStorage.getItem(key);
      if (!sessionId) {
        sessionId = typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : String(Date.now()) + '-' + String(Math.random());
        window.sessionStorage.setItem(key, sessionId);
      }
      const segments = target.split('/').filter(Boolean);
      const itemType = segments[0] === 'skills' && segments.length === 2 ? 'skill' :
        segments[0] === 'careers' && segments.length === 2 ? 'career' :
        segments[0] === 'blog' && segments.length === 2 ? 'blog' : 'page';
      void fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
        body: JSON.stringify({
          eventType: 'cta_click',
          itemType,
          itemSlug: (itemType === 'page' ? target : segments[1]).slice(0, 160),
          path: source,
          sessionId,
        }),
      }).catch(() => {});
    } catch { /* optional analytics */ }
  }

  return (
    <nav aria-label="Continue learning" className="mb-8 rounded-2xl border border-indigo-100 bg-indigo-50/50 p-4 sm:p-5">
      <h2 className="text-base font-bold text-slate-900"><T text="Continue learning" /></h2>
      <p className="mt-1 text-sm text-slate-600"><T text="Choose a related topic or put what you learn into practice." /></p>
      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        {unique.map((item) => (
          <Link key={item.href} href={item.href} onClick={() => recordClick(item.href)}
            className="flex min-h-16 items-center justify-between gap-2 rounded-xl border border-indigo-100 bg-white px-3 py-2.5 text-sm hover:border-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600">
            <span className="min-w-0">
              <span className="block text-xs font-medium text-indigo-700"><T text={item.action} /></span>
              <span className="mt-1 block break-words font-semibold text-slate-900">{item.title}</span>
            </span>
            <span aria-hidden="true" className="shrink-0 text-indigo-600">→</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
