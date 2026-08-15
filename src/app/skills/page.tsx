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
  const topicCounts = skills.reduce<Record<string, number>>((counts, skill) => {
    counts[skill.category] = (counts[skill.category] ?? 0) + 1;
    return counts;
  }, {});

  return (
    <SkillsDirectory
      skills={skills.slice(0, 30)}
      currentPage={1}
      totalPages={Math.ceil(skills.length / 30)}
      totalSkills={skills.length}
      topicCounts={topicCounts}
    />
  );
}
