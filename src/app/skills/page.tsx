import type { Metadata } from 'next';
import { SkillsDirectory } from '@/components/skills/skills-directory';
import { getIndexableSkills } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Professional Skills Library',
  description: 'Explore practical professional skills organized by topic, learning path, career connection, and workplace application.',
  alternates: { canonical: '/skills' },
};

export default async function SkillsPage() {
  const skills = await getIndexableSkills();
  return (
    <SkillsDirectory
      skills={skills.slice(0, 30)}
      currentPage={1}
      totalPages={Math.ceil(skills.length / 30)}
    />
  );
}
