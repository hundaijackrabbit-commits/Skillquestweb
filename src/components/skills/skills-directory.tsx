import Link from 'next/link';
import { BookOpen, Route, Search, Sparkles } from 'lucide-react';
import { Breadcrumbs } from '@/components/navigation/breadcrumbs';
import { Button } from '@/components/ui/button';
import type { Skill } from '@/lib/types';
import { TOPICS } from '@/lib/topics';
import { SkillDirectoryCard } from './skill-directory-card';
import { SkillsPagination } from './skills-pagination';

type SearchDefaults = {
  query?: string;
  category?: string;
  sort?: string;
};

export function SkillsDirectory({
  skills,
  currentPage,
  totalPages,
  totalSkills,
  topicCounts,
  searchDefaults = {},
  searchResults = false,
}: {
  skills: Skill[];
  currentPage: number;
  totalPages: number;
  totalSkills: number;
  topicCounts: Record<string, number>;
  searchDefaults?: SearchDefaults;
  searchResults?: boolean;
}) {
  const hrefForPage = (page: number) => {
    if (!searchResults) return page === 1 ? '/skills' : `/skills/page/${page}`;
    const parameters = new URLSearchParams();
    if (searchDefaults.query) parameters.set('q', searchDefaults.query);
    if (searchDefaults.category) parameters.set('category', searchDefaults.category);
    if (searchDefaults.sort && searchDefaults.sort !== 'featured') parameters.set('sort', searchDefaults.sort);
    if (page > 1) parameters.set('page', String(page));
    const query = parameters.toString();
    return query ? `/skills/search?${query}` : '/skills/search';
  };

  const start = totalSkills === 0 ? 0 : (currentPage - 1) * 30 + 1;
  const end = Math.min(currentPage * 30, totalSkills);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/40 via-white to-white py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Skills', href: searchResults || currentPage > 1 ? '/skills' : undefined },
            ...(searchResults
              ? [{ label: 'Search results' }]
              : currentPage > 1
                ? [{ label: `Page ${currentPage}` }]
                : []),
          ]}
        />

        <header className="mt-8 max-w-4xl">
          <div className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1.5 text-sm font-semibold text-blue-800">
            <Sparkles aria-hidden="true" className="mr-2 h-4 w-4" />
            {totalSkills.toLocaleString()} editorial-ready guides
          </div>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 sm:text-6xl">
            {searchResults ? 'Find the right skill' : currentPage > 1 ? `Professional skills · Page ${currentPage}` : 'Professional skills, organized for action'}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Search focused guides or browse a topic to connect individual skills with learning paths, careers, industries, and practical exercises.
          </p>
        </header>

        <form action="/skills/search" method="get" className="mt-9 grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[minmax(0,1fr)_220px_180px_auto]">
          <label className="relative">
            <span className="sr-only">Search the skills library</span>
            <Search aria-hidden="true" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              name="q"
              defaultValue={searchDefaults.query}
              placeholder="Search by skill or workplace need"
              className="min-h-11 w-full rounded-xl border border-slate-300 py-2 pl-10 pr-3 text-sm text-slate-950 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </label>
          <label>
            <span className="sr-only">Filter by topic</span>
            <select name="category" defaultValue={searchDefaults.category ?? ''} className="min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-800 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100">
              <option value="">All topics</option>
              {TOPICS.map((topic) => <option key={topic.slug} value={topic.slug}>{topic.name}</option>)}
            </select>
          </label>
          <label>
            <span className="sr-only">Sort skills</span>
            <select name="sort" defaultValue={searchDefaults.sort ?? 'featured'} className="min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-800 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100">
              <option value="featured">Featured first</option>
              <option value="name">Alphabetical</option>
              <option value="signal">Employer signal</option>
            </select>
          </label>
          <Button type="submit" className="min-h-11">Search</Button>
        </form>

        {!searchResults && currentPage === 1 && (
          <section className="mt-12" aria-labelledby="browse-topics">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">Connected browsing</p>
                <h2 id="browse-topics" className="mt-2 text-3xl font-bold text-slate-950">Choose a topic, not a random page</h2>
              </div>
              <Link href="/topics" className="text-sm font-semibold text-blue-700">View all topic hubs →</Link>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {TOPICS.map((topic) => (
                <Link key={topic.slug} href={`/topics/${topic.slug}`} className="rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-blue-300 hover:shadow-sm">
                  <span className="font-semibold text-slate-950">{topic.name}</span>
                  <span className="mt-1 block text-sm text-slate-500">{(topicCounts[topic.slug] ?? 0).toLocaleString()} guides</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mt-14" aria-labelledby="skill-results-heading">
          <div className="flex flex-col gap-2 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 id="skill-results-heading" className="text-3xl font-bold text-slate-950">{searchResults ? 'Matching guides' : 'Browse the library'}</h2>
              <p className="mt-1 text-sm text-slate-600">Showing {start.toLocaleString()}–{end.toLocaleString()} of {totalSkills.toLocaleString()}</p>
            </div>
            {searchResults && <Link href="/skills" className="text-sm font-semibold text-blue-700">Clear search and filters</Link>}
          </div>

          {skills.length > 0 ? (
            <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {skills.map((skill) => <SkillDirectoryCard key={skill.slug} skill={skill} />)}
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
              <BookOpen aria-hidden="true" className="mx-auto h-10 w-10 text-slate-400" />
              <h2 className="mt-4 text-xl font-bold text-slate-950">No matching skill guides</h2>
              <p className="mt-2 text-slate-600">Try a broader phrase or explore one of the topic hubs.</p>
            </div>
          )}

          <SkillsPagination currentPage={currentPage} totalPages={totalPages} hrefForPage={hrefForPage} />
        </section>

        <section className="mt-16 flex flex-col gap-6 rounded-3xl bg-slate-950 p-7 text-white sm:p-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold">Want a sequence instead of a directory?</h2>
            <p className="mt-2 leading-7 text-slate-300">Learning paths arrange connected skills into a practical order so you can build a stack without guessing what comes next.</p>
          </div>
          <Link href="/paths" className="flex-none">
            <Button size="lg" className="bg-white text-slate-950 hover:bg-slate-100"><Route aria-hidden="true" className="mr-2 h-4 w-4" />Browse learning paths</Button>
          </Link>
        </section>
      </div>
    </div>
  );
}
