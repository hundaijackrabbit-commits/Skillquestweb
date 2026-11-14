import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, ArrowRight } from 'lucide-react';
import { GLOSSARY_CATEGORIES, GLOSSARY_ENTRIES } from '@/lib/glossary';
import { absoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Knowledge Dictionary: Learning, Careers and AI Terms',
  description: 'Plain-language definitions of essential learning, career, AI, and critical-thinking concepts, with examples and practical context.',
  alternates: { canonical: '/glossary' },
  openGraph: {
    title: 'Knowledge Dictionary | Modern Skill Lab',
    description: 'Understand the terms behind skills, career planning, effective practice and responsible AI.',
    url: absoluteUrl('/glossary'),
    type: 'website',
  },
};

export default function GlossaryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
          <Link href="/" className="font-medium text-indigo-700 hover:underline">Home</Link> / Knowledge Dictionary
        </nav>
        <header className="mt-7 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1.5 text-xs font-bold text-indigo-900">
            <BookOpen className="h-4 w-4" aria-hidden="true" /> Quick reference
          </div>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">Knowledge Dictionary</h1>
          <p className="mt-5 text-lg leading-8 text-slate-700">
            Clear definitions for the concepts you meet while learning a skill, planning a career, or evaluating new technology.
            Each entry explains what a term means, why it matters, and what it looks like in practice.
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            This is a reference for concepts—not a duplicate of our <Link href="/skills" className="font-semibold text-indigo-700 underline">Skills Library</Link>,
            which covers what you can learn to do and how to practise.
          </p>
        </header>
        <nav aria-label="Jump to dictionary topic" className="mt-9 flex flex-wrap gap-2">
          {GLOSSARY_CATEGORIES.map((category) => (
            <a key={category} href={`#${category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              className="rounded-full border border-indigo-200 bg-white px-4 py-2 text-sm font-semibold text-indigo-800 hover:border-indigo-400 hover:bg-indigo-50">
              {category}
            </a>
          ))}
        </nav>
        {GLOSSARY_CATEGORIES.map((category) => {
          const entries = GLOSSARY_ENTRIES.filter((entry) => entry.category === category)
            .sort((a, b) => a.title.localeCompare(b.title));
          return (
            <section key={category} id={category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
              className="mt-12 scroll-mt-28" aria-label={category}>
              <h2 className="mb-5 border-b border-slate-200 pb-3 text-2xl font-bold text-slate-950">{category}</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {entries.map((entry) => (
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
    </div>
  );
}
