'use client';

import Link from 'next/link';
import { BookmarkCheck } from 'lucide-react';
import { ContextualLearningHelp } from '@/components/learning/contextual-learning-help';

export type VaultItem = { kind: string; item_slug: string; insight_id: string; title: string; body: string };
export function KnowledgeVault({ items }: { items: VaultItem[] }) {
  return <section className="mx-auto mb-8 max-w-7xl rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-6 shadow-sm sm:p-8" aria-labelledby="vault-title">
    <div className="flex items-center gap-3"><BookmarkCheck className="h-6 w-6 text-indigo-700" aria-hidden="true" /><h2 id="vault-title" className="text-2xl font-bold text-slate-900">Your Knowledge Vault</h2></div>
    <p className="mt-2 text-sm text-slate-600">{items.length} collected insights. Return to a skill or career to review or remove a highlight. You can also ask the AI coach to help you review a saved insight.</p>
    {items.length ? <div className="mt-5 grid gap-3 md:grid-cols-2">{items.map((item) => <article key={`${item.kind}:${item.item_slug}:${item.insight_id}`} className="msl-motion-card rounded-2xl border border-slate-200 bg-white p-5 hover:border-indigo-400 hover:shadow-md">
      <Link href={`/${item.kind === 'career' ? 'careers' : 'skills'}/${encodeURIComponent(item.item_slug)}`} className="block rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600"><span className="text-xs font-bold uppercase tracking-wider text-indigo-700">{item.kind} · {item.item_slug.replace(/-/g, ' ')}</span><h3 className="mt-2 font-bold text-slate-900">{item.title}</h3><p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">{item.body}</p></Link>
      <ContextualLearningHelp context={[`Saved ${item.kind} insight`, item.title, item.body].join(' | ').slice(0, 4500)} prompt="Quiz me with one practical question about this saved insight. Don't reveal the answer until I try." />
    </article>)}</div> : <p className="mt-4 text-sm text-slate-600">Explore a skill or career and tap an insight to start collecting.</p>}
  </section>;
}
