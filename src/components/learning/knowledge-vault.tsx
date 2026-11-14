'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookmarkCheck, BrainCircuit, Eye, Sparkles } from 'lucide-react';
import { ContextualLearningHelp } from '@/components/learning/contextual-learning-help';

export type VaultItem = { kind: string; item_slug: string; insight_id: string; title: string; body: string };

export function KnowledgeVault({ items }: { items: VaultItem[] }) {
  // Recall prompts are ephemeral; saved highlights remain unchanged.
  const [recallMode, setRecallMode] = useState<Record<string, boolean>>({});
  const [aiOpen, setAiOpen] = useState<Record<string, boolean>>({});

  return (
    <section className="mx-auto mb-8 max-w-7xl rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-6 shadow-sm sm:p-8" aria-labelledby="vault-title">
      <div className="flex items-center gap-3">
        <BookmarkCheck className="h-6 w-6 text-indigo-700" aria-hidden="true" />
        <h2 id="vault-title" className="text-2xl font-bold text-slate-900">Your Knowledge Vault</h2>
      </div>
      <p className="mt-2 text-sm text-slate-600">
        {items.length} collected insights. Return to a skill or career to review or remove a highlight. You can also ask the AI coach to help you review a saved insight.
      </p>
      {items.length ? (
        <div className="mt-5 grid items-start gap-3 md:grid-cols-2">
          {items.map((item) => {
            const id = `${item.kind}:${item.item_slug}:${item.insight_id}`;
            const testingRecall = Boolean(recallMode[id]);
            const showingAi = Boolean(aiOpen[id]);
            const href = `/${item.kind === 'career' ? 'careers' : 'skills'}/${encodeURIComponent(item.item_slug)}`;
            return (
              <article key={id} className="msl-motion-card rounded-2xl border border-slate-200 bg-white p-5 hover:border-indigo-400 hover:shadow-md">
                <Link href={href} className="block rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">{item.kind} · {item.item_slug.replace(/-/g, ' ')}</span>
                  <h3 className="mt-2 font-bold text-slate-900">{item.title}</h3>
                  {testingRecall ? (
                    <p role="status" className="mt-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm leading-6 text-amber-950">
                      Without looking at the explanation, describe this insight in your own words. Then reveal it to check what you remembered.
                    </p>
                  ) : (
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">{item.body}</p>
                  )}
                </Link>
                <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
                  <button type="button" aria-pressed={testingRecall} onClick={() => setRecallMode((current) => ({ ...current, [id]: !current[id] }))}
                    className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-indigo-200 bg-indigo-50 px-3 text-xs font-bold text-indigo-800 hover:bg-indigo-100">
                    {testingRecall ? <Eye className="h-4 w-4" aria-hidden="true" /> : <BrainCircuit className="h-4 w-4" aria-hidden="true" />}
                    {testingRecall ? 'Reveal insight' : 'Test my recall'}
                  </button>
                  <button type="button" aria-expanded={showingAi} onClick={() => setAiOpen((current) => ({ ...current, [id]: !current[id] }))}
                    className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-slate-200 px-3 text-xs font-bold text-slate-700 hover:bg-slate-50">
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                    {showingAi ? 'Close AI coach' : 'Review with AI'}
                  </button>
                </div>
                {showingAi && (
                  <ContextualLearningHelp
                    defaultOpen
                    showToggle={false}
                    context={[`Saved ${item.kind} insight`, item.title, item.body].join(' | ').slice(0, 4500)}
                    prompt="Quiz me with one practical question about this saved insight. Don't reveal the answer until I try."
                  />
                )}
              </article>
            );
          })}
        </div>
      ) : (
        <p className="mt-4 text-sm text-slate-600">Explore a skill or career and tap an insight to start collecting.</p>
      )}
    </section>
  );
}
