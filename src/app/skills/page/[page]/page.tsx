import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SkillsDirectory } from '@/components/skills/skills-directory';
import { getCanonicalSkills } from '@/lib/content';

type Props = { params: Promise<{ page: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  const skills = await getCanonicalSkills();
  return Array.from({ length: Math.max(0, Math.ceil(skills.length / 30) - 1) }, (_, index) => ({
    page: String(index + 2),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = Number((await params).page);
  return {
    title: `Professional Skills Library · Page ${page}`,
    description: `Browse page ${page} of Modern Skill Lab’s complete canonical professional skill guide library.`,
    alternates: { canonical: `/skills/page/${page}` },
  };
}

export default async function PaginatedSkillsPage({ params }: Props) {
  const page = Number((await params).page);
  const skills = await getCanonicalSkills();
  const totalPages = Math.ceil(skills.length / 30);
  if (!Number.isInteger(page) || page < 2 || page > totalPages) notFound();

  const start = (page - 1) * 30;

  return (
    <SkillsDirectory
      skills={skills.slice(start, start + 30)}
      currentPage={page}
      totalPages={totalPages}
    />
  );
}