import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Compass, Layers3 } from 'lucide-react';
import { Breadcrumbs } from '@/components/navigation/breadcrumbs';
import { getTopicsForDomain, SKILL_DOMAINS } from '@/lib/skill-domains';

export const metadata: Metadata = {
  title: 'Skill Topics',
  description: 'Browse professional skills by broad domain and topic, then connect them with learning paths, careers, industries, articles, and practice.',
  alternates: { canonical: '/topics' },
};

export default async function TopicsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50/50 via-white to-white py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Topics' }]} />

        <header className="mt-9 max-w-4xl">
          <div className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1.5 text-sm font-semibold text-indigo-800">
            <Compass aria-hidden="true" className="mr-2 h-4 w-4" />
            Connected skill map
          </div>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 sm:text-6xl">Browse skills by area</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Start with a broad skill domain, then narrow into the topic that matches what you want to improve. Every existing topic still connects into guides, learning paths, careers, industries, articles, and practice.
          </p>
        </header>

        <main className="mt-14 space-y-16">
          {SKILL_DOMAINS.map((domain) => {
            const topics = getTopicsForDomain(domain);
            return (
              <section key={domain.slug} aria-labelledby={`domain-${domain.slug}`}>
                <div className="max-w-4xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-700">Skill domain</p>
                  <h2 id={`domain-${domain.slug}`} className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">{domain.name}</h2>
                  <p className="mt-3 text-base leading-7 text-slate-600">{domain.description}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{domain.purpose}</p>
                </div>

                <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {topics.map((topic) => (
                    <Link key={topic.slug} href={`/topics/${topic.slug}`} className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-md">
                      <div className="flex items-center gap-4">
                        <div className="rounded-2xl bg-indigo-50 p-3 text-indigo-700"><Layers3 aria-hidden="true" className="h-5 w-5" /></div>
                      </div>
                      <h3 className="mt-5 text-2xl font-bold text-slate-950 group-hover:text-indigo-700">{topic.name}</h3>
                      <p className="mt-3 text-sm leading-6 text-slate-600">{topic.description}</p>
                      <p className="mt-4 text-sm leading-6 text-slate-500">{topic.startingPoint}</p>
                      <span className="mt-auto inline-flex items-center pt-6 text-sm font-semibold text-indigo-700">Explore topic <ArrowRight aria-hidden="true" className="ml-1.5 h-4 w-4" /></span>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </main>
      </div>
    </div>
  );
}
