import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SkillsDirectory } from '@/components/skills/skills-directory';
import { getIndexableSkills } from '@/lib/content';

type Props = { params: Promise<{ page: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  const skills = await getIndexableSkills();
  return Array.from({ length: Math.max(0, Math.ceil(skills.length / 30) - 1) }, (_, index) => ({
    page: String(index + 2),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = Number((await params).page);
  return {
    title: `Professional Skills Library · Page ${page}`,
    description: `Browse page ${page} of Modern Skill Lab’s editorial-ready professional skill guides.`,
    alternates: { canonical: `/skills/page/${page}` },
  };
}

export default async function PaginatedSkillsPage({ params }: Props) {
  const page = Number((await params).page);
  const skills = await getIndexableSkills();
  const totalPages = Math.ceil(skills.length / 30);
  if (!Number.isInteger(page) || page < 2 || page > totalPages) notFound();

  const topicCounts = skills.reduce<Record<string, number>>((counts, skill) => {
    counts[skill.category] = (counts[skill.category] ?? 0) + 1;
    return counts;
  }, {});
  const start = (page - 1) * 30;

  return (
    <SkillsDirectory
      skills={skills.slice(start, start + 30)}
      currentPage={page}
      totalPages={totalPages}
      totalSkills={skills.length}
      topicCounts={topicCounts}
    />
  );
}
