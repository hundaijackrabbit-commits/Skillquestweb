import type { Metadata } from 'next';
import { SkillsDirectory } from '@/components/skills/skills-directory';
import { getIndexableSkills } from '@/lib/content';
import { compareSkillsForDiscovery } from '@/lib/content-quality';
import { TOPICS } from '@/lib/topics';

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export const metadata: Metadata = {
  title: 'Search Professional Skills',
  description: 'Search and filter the Modern Skill Lab skills library.',
  alternates: { canonical: '/skills' },
  robots: { index: false, follow: true },
};

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? '' : value ?? '';
}

function searchScore(skill: Awaited<ReturnType<typeof getIndexableSkills>>[number], query: string) {
  const normalized = query.toLocaleLowerCase('en');
  const name = skill.name.toLocaleLowerCase('en');
  let score = 0;
  if (name === normalized) score += 100;
  else if (name.startsWith(normalized)) score += 60;
  else if (name.includes(normalized)) score += 40;
  if (skill.shortDefinition.toLocaleLowerCase('en').includes(normalized)) score += 20;
  if (skill.professionalContexts.some((context) => context.toLocaleLowerCase('en').includes(normalized))) score += 10;
  return score;
}

export default async function SkillsSearchPage({ searchParams }: { searchParams: SearchParams }) {
  const values = await searchParams;
  const query = first(values.q).trim().slice(0, 100);
  const requestedCategory = first(values.category);
  const category = TOPICS.some((topic) => topic.slug === requestedCategory) ? requestedCategory : '';
  const requestedSort = first(values.sort);
  const sort = ['featured', 'name', 'signal'].includes(requestedSort) ? requestedSort : 'featured';
  const requestedPage = Number(first(values.page) || '1');

  const allSkills = await getIndexableSkills();
  const topicCounts = allSkills.reduce<Record<string, number>>((counts, skill) => {
    counts[skill.category] = (counts[skill.category] ?? 0) + 1;
    return counts;
  }, {});
  const filtered = allSkills.filter((skill) => {
    if (category && skill.category !== category) return false;
    if (!query) return true;
    return searchScore(skill, query) > 0;
  });

  filtered.sort((left, right) => {
    if (query) {
      const difference = searchScore(right, query) - searchScore(left, query);
      if (difference !== 0) return difference;
    }
    if (sort === 'name') return left.name.localeCompare(right.name);
    if (sort === 'signal') return right.employerSignalValue - left.employerSignalValue || left.name.localeCompare(right.name);
    return compareSkillsForDiscovery(left, right);
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / 30));
  const currentPage = Number.isInteger(requestedPage) ? Math.min(Math.max(requestedPage, 1), totalPages) : 1;
  const start = (currentPage - 1) * 30;

  return (
    <SkillsDirectory
      skills={filtered.slice(start, start + 30)}
      currentPage={currentPage}
      totalPages={totalPages}
      totalSkills={filtered.length}
      topicCounts={topicCounts}
      searchDefaults={{ query, category, sort }}
      searchResults
    />
  );
}
