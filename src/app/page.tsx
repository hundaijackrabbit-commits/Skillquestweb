import Link from 'next/link';
import { ArrowRight, Brain, Clock3, Compass, Flame, LineChart, Sparkles, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { NewsletterForm } from '@/components/marketing/newsletter-form';
import { ManagedAdSlot } from '@/components/ads/managed-ad-slot';
import { getAllCareers, getIndexableSkills } from '@/lib/content';
import { isCareerIndexable } from '@/lib/content-quality';
import { getHomepageGrowthData } from '@/lib/growth';
import { getAllSkillCourses } from '@/lib/courses';
import { TOPICS } from '@/lib/topics';
import { DailyChallenge } from '@/components/learning/daily-challenge';

export const dynamic = 'force-dynamic';

const defaultSlugs = ['ai-literacy', 'communication', 'critical-thinking'];

const pillars = [
  { icon: Compass, title: 'Know what to learn next', description: 'Connect useful skills to careers and real-world work instead of learning randomly.' },
  { icon: Brain, title: 'Understand the skill', description: 'Go beyond a definition with practice ideas, workplace context, mistakes, and related capabilities.' },
  { icon: LineChart, title: 'Build a stronger stack', description: 'Save skills, follow connections, and compound capabilities that make you more useful over time.' },
];

export default async function HomePage() {
  const [skills, allCareers] = await Promise.all([
    getIndexableSkills(),
    getAllCareers(),
  ]);
  const careers = allCareers.filter(isCareerIndexable);
  const growth = await getHomepageGrowthData(skills);
  const courses = getAllSkillCourses();

  const defaultSkills = defaultSlugs
    .map((slug) => skills.find((skill) => skill.slug === slug))
    .filter(Boolean) as (typeof skills)[number][];
  const featured = growth.featured.length > 0
    ? growth.featured
    : defaultSkills.map((skill) => ({ skill, featureType: 'editor', headline: null }));

  return (
    <>
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-slate-50 via-white to-white">
        <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.14),transparent_55%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-14 px-6 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-28">
          <div>
            <Badge variant="info" className="rounded-full px-3 py-1 text-xs font-semibold">Practical skills for modern work</Badge>
            <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">Build skills that actually move you forward.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">Explore a deep library of practical skills, career connections, and learning paths built for work that keeps changing.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/skills"><Button variant="primary" size="lg" className="w-full sm:w-auto">Explore {skills.length.toLocaleString()} skills<ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
              <Link href="/careers"><Button variant="outline" size="lg" className="w-full border-slate-300 sm:w-auto">Explore careers</Button></Link>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_70px_-35px_rgba(15,23,42,0.4)]">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div><p className="text-sm font-medium text-slate-500">Your next useful idea</p><h2 className="mt-1 text-xl font-semibold text-slate-900">{growth.marketing.newsletterHeadline}</h2></div>
              <div className="rounded-2xl bg-blue-600/10 p-3 text-blue-600"><Sparkles className="h-5 w-5" /></div>
            </div>
            <p className="mt-5 text-sm leading-6 text-slate-600">{growth.marketing.newsletterDescription}</p>
            <NewsletterForm source="homepage-hero" className="mt-5" />
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 sm:grid-cols-3 lg:px-8">
          <div className="rounded-2xl border bg-white p-5"><div className="text-3xl font-bold text-slate-900">{skills.length.toLocaleString()}</div><p className="mt-1 text-sm text-slate-600">skill guides</p></div>
          <div className="rounded-2xl border bg-white p-5"><div className="text-3xl font-bold text-slate-900">{careers.length.toLocaleString()}</div><p className="mt-1 text-sm text-slate-600">career profiles</p></div>
          <div className="rounded-2xl border bg-white p-5"><div className="text-3xl font-bold text-slate-900">{TOPICS.length.toLocaleString()}</div><p className="mt-1 text-sm text-slate-600">connected topic hubs</p></div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-700">One useful minute</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">Try today’s skill challenge</h2>
            <p className="mt-2 max-w-2xl text-slate-600">A small retrieval check keeps the library active and gives you one idea to carry into work.</p>
          </div>
          <DailyChallenge />
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Selected by Modern Skill Lab</p><h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Featured skills</h2></div>
            <Link href="/skills" className="inline-flex items-center text-sm font-semibold text-blue-600">Browse all skills <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {featured.slice(0, 3).map(({ skill, featureType, headline }) => (
              <Card key={`${featureType}-${skill.slug}`} className="rounded-3xl border-slate-200 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <CardHeader>
                  <Badge variant="success" className="w-fit rounded-full px-3 py-1 text-xs font-semibold">{featureType === 'week' ? 'Skill of the Week' : featureType === 'month' ? 'Skill of the Month' : 'Editor’s Pick'}</Badge>
                  <CardTitle className="text-2xl text-slate-900">{skill.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  {headline && <p className="mb-2 text-sm font-semibold text-blue-700">{headline}</p>}
                  <p className="line-clamp-4 text-sm leading-6 text-slate-600">{skill.shortDefinition}</p>
                  <Link href={`/skills/${skill.slug}`} className="mt-5 inline-flex items-center text-sm font-semibold text-blue-600">Explore skill <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-violet-100 bg-gradient-to-r from-slate-950 via-blue-950 to-violet-950 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">New · Practice Lab</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Turn reading into real comprehension.</h2>
              <p className="mt-4 leading-7 text-blue-100">Short Skill Sprints combine a practical model, a workplace challenge, and a retrieval check—with progress saved in your browser.</p>
            </div>
            <Link href="/learn" className="inline-flex items-center text-sm font-semibold text-white">
              Browse the Practice Lab <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="mt-9 grid gap-5 lg:grid-cols-3">
            {courses.map((course) => (
              <Link key={course.skillSlug} href={`/skills/${course.skillSlug}/learn`} className="group rounded-3xl border border-white/15 bg-white/10 p-6 transition hover:-translate-y-1 hover:bg-white/15">
                <div className="flex items-center justify-between gap-3 text-xs font-semibold text-blue-200">
                  <span className="inline-flex items-center"><Clock3 className="mr-1.5 h-4 w-4" />{course.estimatedMinutes} minutes</span>
                  <span className="inline-flex items-center"><Trophy className="mr-1.5 h-4 w-4 text-amber-300" />{course.lessons.length * course.pointsPerLesson} XP</span>
                </div>
                <h3 className="mt-4 text-xl font-bold group-hover:text-blue-200">{course.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-300">{course.description}</p>
                <span className="mt-5 inline-flex items-center text-sm font-semibold text-white">Start sprint <ArrowRight className="ml-2 h-4 w-4" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {growth.trending.length > 0 && (
        <section className="border-y bg-slate-50 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex items-center gap-3"><div className="rounded-2xl bg-orange-100 p-2.5 text-orange-700"><Flame className="h-5 w-5" /></div><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-700">Chosen by visitors</p><h2 className="text-3xl font-bold text-slate-900">Trending this week</h2></div></div>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {growth.trending.map(({ skill, views }, index) => (
                <Link key={skill.slug} href={`/skills/${skill.slug}`} className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-blue-200 hover:shadow-sm">
                  <div className="min-w-0"><p className="text-xs font-semibold uppercase tracking-wide text-slate-400">#{index + 1} · {views} views</p><h3 className="mt-1 truncate font-semibold text-slate-900 group-hover:text-blue-700">{skill.name}</h3></div><ArrowRight className="h-4 w-4 shrink-0 text-slate-400 group-hover:text-blue-600" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <ManagedAdSlot placement="homepage-inline" />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">A better way to browse</p><h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Turn curiosity into a skill stack.</h2></div>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><div className="inline-flex rounded-2xl bg-blue-600/10 p-3 text-blue-600"><pillar.icon className="h-5 w-5" /></div><h3 className="mt-5 text-lg font-semibold text-slate-900">{pillar.title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{pillar.description}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-[2rem] bg-slate-900 px-6 py-10 text-white sm:px-10 sm:py-12 lg:flex lg:items-center lg:justify-between">
            <div className="max-w-2xl"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">Make it yours</p><h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Save skills and keep building.</h2><p className="mt-4 text-base leading-7 text-slate-300">Create a free account to save useful skills and return to them from your dashboard.</p></div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-0"><Link href="/skills"><Button size="lg" className="w-full bg-white text-slate-900 hover:bg-slate-100 sm:w-auto">Browse skills</Button></Link><Link href="/auth?mode=signup&redirect=%2Fdashboard"><Button size="lg" variant="outline" className="w-full border-slate-600 bg-transparent text-white hover:bg-slate-800 sm:w-auto">Create account</Button></Link></div>
          </div>
        </div>
      </section>
    </>
  );
}
