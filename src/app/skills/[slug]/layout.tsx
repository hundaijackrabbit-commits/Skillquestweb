import type { ReactNode } from 'react';
import { SkillConnectionMap } from '@/components/skills/skill-connection-map';
import { getIndexableSkills, getSkillBySlug } from '@/lib/content';

type SkillLayoutProps = {
  children: ReactNode;
  params: Promise<{ slug: string }>;
};

export default async function SkillLayout({ children, params }: SkillLayoutProps) {
  const { slug } = await params;
  const [skill, allSkills] = await Promise.all([getSkillBySlug(slug), getIndexableSkills()]);

  return (
    <>
      {children}
      {skill && (
        <div className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
          <SkillConnectionMap skill={skill} allSkills={allSkills} />
        </div>
      )}
    </>
  );
}
