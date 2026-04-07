import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { getAllSkills, getAllCareers } from '@/lib/content';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Briefcase, ArrowRight, Star } from 'lucide-react';

export const metadata = {
  title: 'Dashboard - SkillQuest | Your Personalized Learning Hub',
  description:
    'Track your saved skills, revisit career options, and manage your professional development journey.',
};

type SavedSkillRow = {
  skill_slug: string;
  created_at: string;
};

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect('/auth');
  }

  const [allSkills, allCareers, savedSkillsResult] = await Promise.all([
    getAllSkills(),
    getAllCareers(),
    supabase
      .from('saved_skills')
      .select('skill_slug, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false }),
  ]);

  const savedSkillRows: SavedSkillRow[] = savedSkillsResult?.data ?? [];
  const savedSkillsError = savedSkillsResult?.error ?? null;

  const savedSkills = savedSkillRows
    .map((row) => {
      const skill = allSkills.find((item) => item.slug === row.skill_slug);
      if (!skill) return null;
      return {
        ...skill,
        savedAt: row.created_at,
      };
    })
    .filter(Boolean) as Array<(Awaited<ReturnType<typeof getAllSkills>>)[number] & { savedAt: string }>;

  const relatedCareersMap = new Map<string, (typeof allCareers)[number]>();

  for (const skill of savedSkills) {
    if (Array.isArray(skill.careersAssociated)) {
      for (const careerSlug of skill.careersAssociated) {
        const matchedCareer = allCareers.find((career) => career.slug === careerSlug);
        if (matchedCareer) {
          relatedCareersMap.set(matchedCareer.slug, matchedCareer);
        }
      }
    }
  }

  const suggestedCareers = Array.from(relatedCareersMap.values()).slice(0, 8);
  const recentSavedSkills = savedSkills.slice(0, 12);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-10">
          <div className="mb-3 inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
            Welcome back
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">Your Dashboard</h1>
          <p className="mt-3 max-w-3xl text-lg text-gray-600">
            Keep track of the skills you have saved, revisit valuable career connections, and
            continue building your professional stack with intention.
          </p>
        </div>

        {savedSkillsError && (
          <div className="mb-8 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            There was a problem loading saved skills. Check that the saved_skills table and its
            policies exist in Supabase.
          </div>
        )}

        <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm font-medium text-gray-500">Saved Skills</p>
                <p className="mt-1 text-3xl font-bold text-gray-900">{savedSkills.length}</p>
              </div>
              <div className="rounded-xl bg-blue-100 p-3">
                <Star className="h-6 w-6 text-blue-700" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm font-medium text-gray-500">Career Matches</p>
                <p className="mt-1 text-3xl font-bold text-gray-900">{suggestedCareers.length}</p>
              </div>
              <div className="rounded-xl bg-green-100 p-3">
                <Briefcase className="h-6 w-6 text-green-700" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm font-medium text-gray-500">Repository Access</p>
                <p className="mt-1 text-3xl font-bold text-gray-900">{allSkills.length}</p>
              </div>
              <div className="rounded-xl bg-purple-100 p-3">
                <BookOpen className="h-6 w-6 text-purple-700" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-xl">Saved Skills</CardTitle>
                <Link
                  href="/skills"
                  className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  Explore more skills
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardHeader>
              <CardContent>
                {recentSavedSkills.length === 0 ? (
                  <div className="rounded-2xl border border-dashed p-8 text-center">
                    <h2 className="text-lg font-semibold text-gray-900">No saved skills yet</h2>
                    <p className="mt-2 text-sm text-gray-600">
                      Go to the skills repository and use the Save Skill button on any skill page to
                      add it here.
                    </p>
                    <Link
                      href="/skills"
                      className="mt-4 inline-flex items-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                    >
                      Browse Skills
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {recentSavedSkills.map((skill) => (
                      <Link
                        key={skill.slug}
                        href={`/skills/${skill.slug}`}
                        className="group rounded-2xl border bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md"
                      >
                        <div className="mb-3 flex items-center justify-between gap-3">
                          <Badge variant="outline">{skill.category}</Badge>
                          <span className="text-xs text-gray-500">
                            Saved {new Date(skill.savedAt).toLocaleDateString()}
                          </span>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-700">
                          {skill.name}
                        </h3>

                        <p className="mt-2 line-clamp-3 text-sm text-gray-600">
                          {skill.shortDefinition}
                        </p>

                        <div className="mt-4 inline-flex items-center text-sm font-medium text-blue-600">
                          Open skill page
                          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Quick links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link
                  href="/skills"
                  className="block rounded-xl border px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  Browse all skills
                </Link>
                <Link
                  href="/careers"
                  className="block rounded-xl border px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  Explore careers
                </Link>
                <Link
                  href="/paths"
                  className="block rounded-xl border px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  View skill paths
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}