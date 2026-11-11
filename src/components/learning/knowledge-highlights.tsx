'use client';

import { useEffect, useState } from 'react';
import { Bookmark, Check, Lightbulb } from 'lucide-react';

type Insight = { id: string; title: string; text: string };
type Props = { kind: 'skill' | 'career'; slug: string; name: string; insights: Insight[] };

export function KnowledgeHighlights({ kind, slug, name, insights }: Props) {
  const key = `msl-insights:${kind}:${slug}`;
  const [saved, setSaved] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const value = JSON.parse(window.localStorage.getItem(key) || '[]');
      if (Array.isArray(value)) setSaved(value.filter((id): id is string => typeof id === 'string'));
    } catch { /* Storage may be unavailable or contain outdated data. */ }
    setReady(true);
  }, [key]);

  function toggle(id: string) {
    const next = saved.includes(id) ? saved.filter((item) => item !== id) : [...saved, id];
    setSaved(next);
    try { window.localStorage.setItem(key, JSON.stringify(next)); } catch { /* Keep interaction functional without storage. */ }
  }

  if (!insights.length) return null;

  return (
    <section aria-labelledby="knowledge-highlights-heading" className="mb-12 rounded-[2rem] border border-indigo-100 bg-gradient-to-br from-sky-50 via-white to-fuchsia-50 p-5 shadow-sm sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-indigo-700"><Lightbulb className="h-4 w-4" aria-hidden="true" /> Knowledge worth keeping</p>
          <h2 id="knowledge-highlights-heading" className="mt-2 text-2xl font-bold tracking-tight text-slate-950">Collect insights about {name}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Tap an insight to highlight it for review. Your selections stay on this device for now; account syncing is coming later.</p>
        </div>
        <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-indigo-800 shadow-sm" aria-live="polite">{ready ? saved.length : '…'} collected</span>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {insights.map((insight, index) => {
          const active = saved.includes(insight.id);
          return (
            <button key={insight.id} type="button" aria-pressed={active} onClick={() => toggle(insight.id)}
              className={`group relative min-h-40 rounded-2xl border p-5 text-left shadow-sm transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${active ? 'border-slate-800 bg-slate-900 text-white shadow-xl ring-4 ring-indigo-200/70' : 'border-slate-200 bg-white/95 text-slate-950 hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-lg'}`}>
              <span className={`flex items-center justify-between gap-3 text-xs font-bold uppercase tracking-wider ${active ? 'text-cyan-200' : 'text-indigo-700'}`}>
                <span>Insight {String(index + 1).padStart(2, '0')}</span>{active ? <Check className="h-5 w-5" aria-hidden="true" /> : <Bookmark className="h-5 w-5" aria-hidden="true" />}
              </span>
              <span className="mt-3 block text-lg font-bold">{insight.title}</span>
              <span className={`mt-2 block text-sm leading-6 ${active ? 'text-slate-200' : 'text-slate-600'}`}>{insight.text}</span>
              <span className={`mt-4 block text-xs font-semibold ${active ? 'text-cyan-200' : 'text-indigo-700'}`}>{active ? 'Collected · tap to remove' : 'Tap to collect'}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
