import { DashboardClient } from './dashboard-client'
import { getAllSkills, getAllCareers } from '@/lib/content'

export const metadata = {
  title: 'Dashboard - SkillQuest | Your Personalized Learning Hub',
  description: 'Track your progress, discover personalized recommendations, and manage your professional development journey.',
};

export default async function DashboardPage() {
  const skills = await getAllSkills();
  const careers = await getAllCareers();

  return <DashboardClient skills={skills} careers={careers} />;
}