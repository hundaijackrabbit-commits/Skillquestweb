'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Search, X } from 'lucide-react';
import type { GlossaryCategory, GlossaryEntry } from '@/lib/glossary';

type Props = { entries: GlossaryEntry[]; categories: readonly GlossaryCategory[] };

/** A local, zero-API search over curated definitions; the original entries remain indexable HTML. */
export function GlossaryDirectory({ entries, categories }: Props) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('all');
  const normalized = query.trim().toLocaleLowerCase('en');
  const filtered = useMemo(() => entries.filter((entry) => {
    if (category !== 'all' && entry.category !== category) return false;
    if (!normalized) return true;
    return [entry.title, entry.definition, entry.category, ...entry.aliases]
      .some((part) => part.toLocaleLowerCase('en').includes(normalized));
  }), [entries, category, normalized]);

  return (
    <div className="mt-9">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <label htmlFor="dictionary-search" className="text-sm font-bold text-slate-900">Find a term or abbreviation</label>
        <div className="relative mt-2">
          <Search className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-slate-400" aria-hidden="true" />
          <input id="dictionary-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)}
            placeholder="Try: LLM, workflow, upskilling, baseline…"
            autoComplete="off"
            className="min-h-11 w-full rounded-xl border border-slate-300 bg-white py-2 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200" />
        </div>
        <div role="group" aria-label="Filter dictionary topics" className="mt-4 flex flex-wrap gap-2">
          {[{ label: 'All topics', value: 'all' }, ...categories.map((value) => ({ label: value, value }))].map((option) => (
            <button key={option.value} type="button" aria-pressed={category === option.value}
              onClick={() => setCategory(option.value)}
              className={`min-h-10 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-700 ${category === option.value ? 'border-indigo-700 bg-indigo-700 text-white' : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-indigo-50'}`}>
              {option.label}
            </button>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p role="status" aria-live="polite" className="text-sm text-slate-600">
            Showing <strong className="text-slate-900">{filtered.length}</strong> of {entries.length} definitions
          </p>
          {(query || category !== 'all') && <button type="button"
            onClick={() => { setQuery(''); setCategory('all'); }}
            className="inline-flex min-h-9 items-center gap-1.5 text-sm font-semibold text-indigo-700 hover:underline">
            <X className="h-4 w-4" aria-hidden="true" /> Clear filters
          </button>}
        </div>
      </div>

      {!filtered.length && (
        <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-7 text-center">
          <p className="font-semibold text-slate-900">No matching definitions yet.</p>
          <p className="mt-2 text-sm text-slate-600">Try a broader phrase, an abbreviation, or another topic.</p>
          <button type="button" onClick={() => { setQuery(''); setCategory('all'); }}
            className="mt-4 text-sm font-semibold text-indigo-700 underline">Show all terms</button>
        </div>
      )}

      {categories.map((topic) => {
        const matches = filtered.filter((entry) => entry.category === topic).sort((a,b) => a.title.localeCompare(b.title));
        if (!matches.length) return null;
        return (
          <section key={topic} id={topic.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
            className="mt-10 scroll-mt-28" aria-label={topic}>
            <h2 className="mb-5 border-b border-slate-200 pb-3 text-2xl font-bold text-slate-950">
              {topic}<span className="ml-2 text-sm font-normal text-slate-500">({matches.length})</span>
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {matches.map((entry) => (
                <Link key={entry.slug} href={`/glossary/${entry.slug}`}
                  className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-indigo-300 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-700">{entry.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{entry.definition}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-indigo-700">
                    Understand the term <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
