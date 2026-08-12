import { SkillsPageClient } from './skills-client';
import { getAllSkills } from '@/lib/content';

export const metadata = {
  title: 'Professional Skills Library',
  description: 'Explore 1,500+ practical professional skills with development steps, career connections, workplace context, and modern-work guidance.',
  alternates: { canonical: '/skills' },
};

export default async function SkillsPage() {
  const skills = await getAllSkills();

  return <SkillsPageClient skills={skills} />;
}