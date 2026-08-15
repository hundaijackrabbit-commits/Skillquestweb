import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { getAllCareers, getAllIndustries, getIndexableSkills } from '@/lib/content';
import { isCareerIndexable } from '@/lib/content-quality';
import {
  CAREER_INTEREST_OPTIONS,
  buildProfileFitMap,
  isProfileAssessment,
  type CareerInterestId,
} from '@/lib/profile-fit';
import { PersonalDashboardClient } from './personal-dashboard-client';

export const metadata = {
  title: 'Your Learning Profile',
  description: 'Manage favourites, build a personal career fit map, and return to Modern Skill Lab practice.',
  robots: { index: false, follow: false },
};

type ProfileRow = {
  name: string | null;
  career_interests: string[] | null;
  selected_industries: string[] | null;
  saved_skills: string[] | null;
  saved_careers: string[] | null;
  preferences: unknown;
};

type SavedSkillRow = {
  skill_slug: string;
};

function profileAssessmentFrom(preferences: unknown) {
  if (!preferences || typeof preferences !== 'object' || Array.isArray(preferences)) return null;
  const assessment = (preferences as Record<string, unknown>).profile_assessment;
  return isProfileAssessment(assessment) ? assessment : null;
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect('/auth?mode=signin&redirect=%2Fdashboard');
  }

  const [skills, allCareers, industries, profileResult, savedSkillsResult] = await Promise.all([
    getIndexableSkills(),
    getAllCareers(),
    getAllIndustries(),
    supabase
      .from('profiles')
      .select('name, career_interests, selected_industries, saved_skills, saved_careers, preferences')
      .eq('id', user.id)
      .maybeSingle(),
    supabase
      .from('saved_skills')
      .select('skill_slug')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false }),
  ]);

  const careers = allCareers.filter(isCareerIndexable);
  const profileRow = (profileResult.data ?? null) as ProfileRow | null;
  const savedSkillRows = (savedSkillsResult.data ?? []) as SavedSkillRow[];
  const savedSkillSlugs = savedSkillRows.length > 0
    ? savedSkillRows.map((row) => row.skill_slug)
    : profileRow?.saved_skills ?? [];
  const savedCareerSlugs = profileRow?.saved_careers ?? [];
  const validInterestIds = new Set(CAREER_INTEREST_OPTIONS.map((option) => option.id));
  const careerInterests = (profileRow?.career_interests ?? []).filter(
    (interest): interest is CareerInterestId => validInterestIds.has(interest as CareerInterestId),
  );
  const selectedIndustries = (profileRow?.selected_industries ?? []).filter((slug) =>
    industries.some((industry) => industry.slug === slug),
  );
  const assessment = profileAssessmentFrom(profileRow?.preferences);
  const profileName = profileRow?.name?.trim() || user.user_metadata?.name || user.email?.split('@')[0] || 'Member';

  const fitMap = buildProfileFitMap(
    {
      careerInterests,
      selectedIndustries,
      assessment,
      savedSkillSlugs,
      savedCareerSlugs,
    },
    skills,
    careers,
    industries,
  );

  const savedSkills = savedSkillSlugs
    .map((slug) => skills.find((skill) => skill.slug === slug || skill.id === slug))
    .filter((skill): skill is (typeof skills)[number] => Boolean(skill))
    .map((skill) => ({
      slug: skill.slug,
      name: skill.name,
      summary: skill.shortDefinition,
      meta: skill.category.replace(/-/g, ' '),
    }));

  const savedCareers = savedCareerSlugs
    .map((slug) => careers.find((career) => career.slug === slug || career.id === slug))
    .filter((career): career is (typeof careers)[number] => Boolean(career))
    .map((career) => ({
      slug: career.slug,
      name: career.title,
      summary: career.summary,
      meta: `${career.coreSkills.length} core skills`,
    }));

  return (
    <PersonalDashboardClient
      member={{
        email: user.email ?? 'member',
        createdAt: user.created_at,
      }}
      profile={{
        name: profileName,
        careerInterests,
        selectedIndustries,
        assessment,
      }}
      industries={industries.map((industry) => ({
        slug: industry.slug,
        name: industry.name,
        description: industry.description,
      }))}
      fitMap={fitMap}
      savedSkills={savedSkills}
      savedCareers={savedCareers}
    />
  );
}
