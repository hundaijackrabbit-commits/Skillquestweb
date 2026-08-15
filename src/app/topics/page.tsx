import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Compass, Layers3 } from 'lucide-react';
import { Breadcrumbs } from '@/components/navigation/breadcrumbs';
import { getIndexableSkills } from '@/lib/content';
import { TOPICS } from '@/lib/topics';

export const metadata: Metadata = {
  title: 'Skill Topics',
  description: 'Browse professional skills by topic and connect them with learning paths, careers, industries, articles, and practice.',
  alternates: { canonical: '/topics' },
};

export default async function TopicsPage() {
  const skills = await getIndexableSkills();
  const topicCounts = skills.reduce<Record<string, number>>((counts, skill) => {
    counts[skill.category] = (counts[skill.category] ?? 0) + 1;
    return counts;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50/50 via-white to-white py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Topics' }]} />

        <header className="mt-9 max-w-4xl">
          <div className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1.5 text-sm font-semibold text-indigo-800">
            <Compass aria-hidden="true" className="mr-2 h-4 w-4" />
            {TOPICS.length} connected topic hubs
          </div>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 sm:text-6xl">Browse skills in context</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Topic hubs connect individual guides with useful sequences, relevant careers, industry applications, and practice—so learning does not stop at a definition.
          </p>
        </header>

        <main className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {TOPICS.map((topic) => (
            <Link key={topic.slug} href={`/topics/${topic.slug}`} className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-md">
              <div className="flex items-center justify-between gap-4">
                <div className="rounded-2xl bg-indigo-50 p-3 text-indigo-700"><Layers3 aria-hidden="true" className="h-5 w-5" /></div>
                <span className="text-sm font-semibold text-slate-500">{(topicCounts[topic.slug] ?? 0).toLocaleString()} guides</span>
              </div>
              <h2 className="mt-5 text-2xl font-bold text-slate-950 group-hover:text-indigo-700">{topic.name}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{topic.description}</p>
              <p className="mt-4 text-sm leading-6 text-slate-500">{topic.startingPoint}</p>
              <span className="mt-auto inline-flex items-center pt-6 text-sm font-semibold text-indigo-700">Explore topic <ArrowRight aria-hidden="true" className="ml-1.5 h-4 w-4" /></span>
            </Link>
          ))}
        </main>
      </div>
    </div>
  );
}
