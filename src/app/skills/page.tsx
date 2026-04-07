import { SkillsPageClient } from './skills-client';
import { getAllSkills } from '@/lib/content';

export const metadata = {
  title: 'Skills Repository - SkillQuest | 1000+ Professional Skills',
  description: 'Explore 1000+ professional skills with evidence-backed development paths, career connections, and practical guidance for today\'s economy.',
};

export default async function SkillsPage() {
  const skills = await getAllSkills();

  return <SkillsPageClient skills={skills} />;
}