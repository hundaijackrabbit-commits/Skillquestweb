import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { GlossaryDirectory } from '@/components/glossary/glossary-directory';
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
        <GlossaryDirectory entries={GLOSSARY_ENTRIES} categories={GLOSSARY_CATEGORIES} />
      </div>
    </div>
  );
}
