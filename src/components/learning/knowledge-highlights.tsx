'use client';

import { useEffect, useState } from 'react';
import { Bookmark, Check, Lightbulb } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

type Insight = { id: string; title: string; text: string };
type Props = { kind: 'skill' | 'career'; slug: string; name: string; insights: Insight[] };

export function KnowledgeHighlights({ kind, slug, name, insights }: Props) {
  const key = `msl-insights:${kind}:${slug}`;
  const [saved, setSaved] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const [syncState, setSyncState] = useState<'local' | 'synced' | 'error'>('local');

  useEffect(() => {
    try {
      const value = JSON.parse(window.localStorage.getItem(key) || '[]');
      if (Array.isArray(value)) setSaved(value.filter((id): id is string => typeof id === 'string'));
    } catch { /* Storage may be unavailable or contain outdated data. */ }
    setReady(true);
    let cancelled = false;
    async function loadAccount() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || cancelled) return;
      const { data, error } = await supabase.from('knowledge_highlights').select('insight_id').eq('user_id', user.id).eq('kind', kind).eq('item_slug', slug);
      if (cancelled) return;
      if (error) { setSyncState('error'); return; }
      const cloudIds = (data ?? []).map((row: { insight_id: string }) => row.insight_id);
      const localIds: string[] = (() => { try { const v = JSON.parse(window.localStorage.getItem(key) || '[]'); return Array.isArray(v) ? v.filter((id): id is string => typeof id === 'string') : []; } catch { return []; } })();
      const valid = new Set(insights.map((item) => item.id));
      const missing = localIds.filter((id) => valid.has(id) && !cloudIds.includes(id));
      if (missing.length) {
        const rows = missing.map((id) => { const item = insights.find((x) => x.id === id)!; return { user_id: user.id, kind, item_slug: slug, insight_id: id, title: item.title, body: item.text }; });
        const { error: insertError } = await supabase.from('knowledge_highlights').insert(rows);
        if (insertError) { setSyncState('error'); return; }
      }
      if (!cancelled) {
        const merged = [...new Set([...cloudIds, ...missing])];
        setSaved(merged);
        try { window.localStorage.setItem(key, JSON.stringify(merged)); } catch {}
        setSyncState('synced');
      }
    }
    void loadAccount();
    return () => { cancelled = true; };
  }, [key, kind, slug]);

  async function toggle(id: string) {
    const next = saved.includes(id) ? saved.filter((item) => item !== id) : [...saved, id];
    setSaved(next);
    try { window.localStorage.setItem(key, JSON.stringify(next)); } catch { /* Keep interaction functional without storage. */ }
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const item = insights.find((insight) => insight.id === id);
    if (!item) return;
    const query = supabase.from('knowledge_highlights');
    const { error } = saved.includes(id)
      ? await query.delete().eq('user_id', user.id).eq('kind', kind).eq('item_slug', slug).eq('insight_id', id)
      : await query.insert({ user_id: user.id, kind, item_slug: slug, insight_id: id, title: item.title, body: item.text });
    if (error) { setSyncState('error'); setSaved(saved); try { window.localStorage.setItem(key, JSON.stringify(saved)); } catch {} } else setSyncState('synced');
  }

  if (!insights.length) return null;

  return (
    <section aria-labelledby="knowledge-highlights-heading" className="mb-12 rounded-[2rem] border border-indigo-100 bg-gradient-to-br from-sky-50 via-white to-fuchsia-50 p-5 shadow-sm sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-indigo-700"><Lightbulb className="h-4 w-4" aria-hidden="true" /> Knowledge worth keeping</p>
          <h2 id="knowledge-highlights-heading" className="mt-2 text-2xl font-bold tracking-tight text-slate-950">Collect insights about {name}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Tap an insight to highlight it for review. Signed-in members can keep these insights in their Knowledge Vault across devices. Guest selections stay on this device.</p>
        </div>
        <span key={`${saved.length}:${syncState}`} className="msl-status rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-indigo-800 shadow-sm" aria-live="polite">{ready ? saved.length : '…'} collected · {syncState === 'synced' ? 'Account saved' : syncState === 'error' ? 'Sync unavailable' : 'On this device'}</span>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {insights.map((insight, index) => {
          const active = saved.includes(insight.id);
          return (
            <button key={insight.id} type="button" aria-pressed={active} onClick={() => toggle(insight.id)}
              className={`msl-motion-card group relative min-h-40 rounded-2xl border p-5 text-left shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${active ? 'border-slate-800 bg-slate-900 text-white shadow-lg ring-4 ring-indigo-200/70' : 'border-slate-200 bg-white/95 text-slate-950 hover:border-indigo-300 hover:shadow-lg'}`}>
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
