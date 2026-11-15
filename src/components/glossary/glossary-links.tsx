import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  findGlossaryEntries, glossaryEntryForPhrase, GLOSSARY_MATCHER,
  type GlossaryEntry,
} from '@/lib/glossary';

/**
 * Insert descriptive, crawlable glossary links only into existing plain text.
 * Never alter supplied HTML, links, IDs, headings, quiz answers or authored MDX.
 */
export function linkGlossaryText(
  text: string,
  options: { maxLinks?: number; usedSlugs?: Set<string> } = {},
): ReactNode {
  const maxLinks = Math.max(0, Math.min(options.maxLinks ?? 2, 6));
  const usedSlugs = options.usedSlugs ?? new Set<string>();
  const parts: ReactNode[] = [];
  let cursor = 0;
  let added = 0;

  for (const match of text.matchAll(GLOSSARY_MATCHER)) {
    if (added >= maxLinks) break;
    const entry = glossaryEntryForPhrase(match[2]);
    if (!entry || usedSlugs.has(entry.slug)) continue;
    const start = (match.index ?? 0) + match[1].length;
    const end = start + match[2].length;
    if (start < cursor) continue;
    if (start > cursor) parts.push(text.slice(cursor, start));
    parts.push(
      <Link key={`${entry.slug}-${start}`} href={`/glossary/${entry.slug}`}
        title={entry.definition}
        className="font-medium text-indigo-700 underline decoration-dotted underline-offset-4 hover:text-indigo-900 focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600">
        {text.slice(start, end)}
      </Link>,
    );
    cursor = end;
    usedSlugs.add(entry.slug);
    added++;
  }

  if (!parts.length) return text;
  if (cursor < text.length) parts.push(text.slice(cursor));
  return parts;
}

export function GlossaryLinkedText({
  text,
  maxLinks = 2,
}: {
  text: string;
  maxLinks?: number;
}) {
  return <>{linkGlossaryText(text, { maxLinks })}</>;
}

export function RelatedGlossaryTerms({ text, maxTerms = 5 }: { text: string; maxTerms?: number }) {
  const entries: GlossaryEntry[] = findGlossaryEntries(text, maxTerms);
  if (!entries.length) return null;
  return (
    <aside aria-label="Terms explained in the Knowledge Dictionary" className="my-9 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-5 sm:p-6">
      <h2 className="text-base font-bold text-slate-950">Terms worth knowing</h2>
      <p className="mt-1 text-sm leading-6 text-slate-600">Quick definitions of concepts used in this guide. The full skills and career lessons remain here.</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {entries.map((entry) => <Link key={entry.slug} href={`/glossary/${entry.slug}`}
          className="inline-flex min-h-9 items-center rounded-full border border-indigo-200 bg-white px-3 py-1.5 text-sm font-semibold text-indigo-800 hover:border-indigo-400 hover:bg-indigo-100">
          {entry.title}
        </Link>)}
      </div>
      <Link href="/glossary" className="mt-4 inline-block text-sm font-semibold text-indigo-700 hover:underline">Explore the Knowledge Dictionary</Link>
    </aside>
  );
}
