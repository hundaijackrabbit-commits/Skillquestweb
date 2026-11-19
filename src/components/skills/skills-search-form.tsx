'use client';

import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TranslatedText as T, useInterfaceTranslation } from '@/components/providers/learning-language-provider';

type SearchDefaults = { query?: string; category?: string; sort?: string };
type TopicOption = { slug: string; name: string };

/** Keep the existing GET /skills/search contract while localizing native form controls. */
export function SkillsSearchForm({ searchDefaults, topics }: {
  searchDefaults: SearchDefaults;
  topics: TopicOption[];
}) {
  const t = useInterfaceTranslation();

  return (
    <form action="/skills/search" method="get" className="mt-9 grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[minmax(0,1fr)_220px_180px_auto]">
      <label className="relative">
        <span className="sr-only"><T text="Search the skills library" /></span>
        <Search aria-hidden="true" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input type="search" name="q" defaultValue={searchDefaults.query}
          placeholder={t('Search by skill or workplace need')}
          className="min-h-11 w-full rounded-xl border border-slate-300 py-2 pl-10 pr-3 text-sm text-slate-950 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100" />
      </label>
      <label>
        <span className="sr-only"><T text="Filter by topic" /></span>
        <select name="category" defaultValue={searchDefaults.category ?? ''} aria-label={t('Filter by topic')}
          className="min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-800 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100">
          <option value="">{t('All topics')}</option>
          {topics.map((topic) => <option key={topic.slug} value={topic.slug}>{t(topic.name)}</option>)}
        </select>
      </label>
      <label>
        <span className="sr-only"><T text="Sort skills" /></span>
        <select name="sort" defaultValue={searchDefaults.sort ?? 'featured'} aria-label={t('Sort skills')}
          className="min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-800 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100">
          <option value="featured">{t('Featured first')}</option>
          <option value="name">{t('Alphabetical')}</option>
          <option value="signal">{t('Employer signal')}</option>
        </select>
      </label>
      <Button type="submit" className="min-h-11"><T text="Search" /></Button>
    </form>
  );
}
