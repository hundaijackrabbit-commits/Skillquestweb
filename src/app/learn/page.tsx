import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpenCheck, Brain, Clock3, Compass, Layers3, ListOrdered, Sparkles, Target, Trophy } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getAllSkillCourses } from '@/lib/courses';
import { LearningProgressSummary } from '@/components/learning/learning-progress-summary';
import { DailyChallenge } from '@/components/learning/daily-challenge';
import { LearningAchievements } from '@/components/learning/learning-achievements';
import { GamificationAccessGate } from '@/components/learning/gamification-access-gate';
import { getAllInteractivePractices } from '@/lib/interactive-practice';

export const metadata: Metadata = {
  title: 'Practice Lab: Short Skill Courses',
  description:
    'Build practical skills through short lessons, workplace challenges, and retrieval checks in the Modern Skill Lab Practice Lab.',
  alternates: { canonical: '/learn' },
};

export default function LearnPage() {
  const courses = getAllSkillCourses();
  const practices = getAllInteractivePractices();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/40 to-white py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <section className="mx-auto mb-14 max-w-4xl text-center">
          <div className="mb-5 inline-flex items-center rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-800">
            <Sparkles className="mr-2 h-4 w-4" />
            Practice Lab
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-slate-950 sm:text-6xl">
            Learn less. Practice more.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-slate-600">
            Short Skill Sprints turn selected guides into active practice. Each sprint combines a clear
            concept, a workplace challenge, and a retrieval check you can finish in about fifteen minutes.
          </p>
        </section>

        <GamificationAccessGate
          className="mb-14"
          featureName="the full Practice Lab"
          description="Create a free account to access daily challenges, Skill Sprints, sequence builders, sorting activities, missions, XP, streaks, levels, and achievements."
        >
          <div>
        <LearningProgressSummary />

        <LearningAchievements />

        <section className="mb-14" aria-labelledby="daily-practice-heading">
          <div className="mb-6">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-700">Warm up</div>
            <h2 id="daily-practice-heading" className="mt-2 text-3xl font-bold text-slate-950">Today’s 60-second challenge</h2>
          </div>
          <DailyChallenge />
        </section>

        <section className="mb-14" aria-labelledby="practice-map-heading">
          <div className="mb-7">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">Where to practise</div>
            <h2 id="practice-map-heading" className="mt-2 text-3xl font-bold text-slate-950">Four ways to turn reading into a rep</h2>
            <p className="mt-2 max-w-3xl leading-7 text-slate-600">Every activity feeds the same private XP, level, achievement, and practice-rhythm profile.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                title: 'Scenario checks',
                description: 'Make a judgment, get an explanation, and retry without losing points.',
                href: '/skills/ai-literacy#knowledge-check',
                label: 'Try an AI judgment check',
                icon: Brain,
                color: 'bg-violet-100 text-violet-700',
              },
              {
                title: 'Skill Sprints',
                description: 'Complete short lessons, workplace applications, and retrieval rounds.',
                href: '/skills/communication/learn',
                label: 'Open a Skill Sprint',
                icon: BookOpenCheck,
                color: 'bg-blue-100 text-blue-700',
              },
              {
                title: 'Skill missions',
                description: 'Choose a starter, builder, or stretch challenge and reflect on the result.',
                href: '/skills/communication#skill-mission',
                label: 'Try a real-world mission',
                icon: Target,
                color: 'bg-amber-100 text-amber-700',
              },
              {
                title: 'Connection checks',
                description: 'Match skill meanings across careers, learning paths, industries, and topics.',
                href: '/careers/data-analyst#knowledge-check',
                label: 'Test a career connection',
                icon: Compass,
                color: 'bg-emerald-100 text-emerald-700',
              },
            ].map((item) => (
              <article key={item.title} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className={`w-fit rounded-xl p-2.5 ${item.color}`}><item.icon className="h-5 w-5" /></div>
                <h3 className="mt-4 text-lg font-bold text-slate-950">{item.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{item.description}</p>
                <Link href={item.href} className="mt-5 inline-flex items-center text-sm font-bold text-blue-700 hover:text-blue-900">
                  {item.label} <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-14" aria-labelledby="interactive-library-heading">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">More than quizzes</div>
              <h2 id="interactive-library-heading" className="mt-2 text-3xl font-bold text-slate-950">Interactive practice library</h2>
              <p className="mt-2 max-w-3xl leading-7 text-slate-600">Reorder real workflows and categorize ambiguous signals across twelve additional professional skills.</p>
            </div>
            <Badge variant="outline">Hands-on activities</Badge>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {practices.map((practice) => (
              <Link key={practice.id} href={`/skills/${practice.skillSlug}#interactive-practice`} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-300 hover:shadow-md">
                <div className="flex items-center justify-between gap-3">
                  <span className={`rounded-xl p-2.5 ${practice.kind === 'sequence' ? 'bg-cyan-100 text-cyan-700' : 'bg-fuchsia-100 text-fuchsia-700'}`}>
                    {practice.kind === 'sequence' ? <ListOrdered className="h-5 w-5" /> : <Layers3 className="h-5 w-5" />}
                  </span>
                  <Badge variant="outline">{practice.xp} XP</Badge>
                </div>
                <div className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">{practice.skillName}</div>
                <h3 className="mt-1 text-lg font-bold text-slate-950 group-hover:text-cyan-800">{practice.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{practice.instruction}</p>
                <span className="mt-4 inline-flex items-center text-sm font-bold text-cyan-800">Open activity <ArrowRight className="ml-1.5 h-4 w-4" /></span>
              </Link>
            ))}
          </div>
        </section>

        <section aria-labelledby="available-sprints">
          <div className="mb-7 flex items-end justify-between gap-4">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Start practicing</div>
              <h2 id="available-sprints" className="mt-2 text-3xl font-bold text-slate-950">Available Skill Sprints</h2>
            </div>
            <Badge variant="outline">Short guided courses</Badge>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {courses.map((course) => (
              <Card key={course.skillSlug} className="group flex h-full flex-col overflow-hidden transition hover:-translate-y-1 hover:shadow-xl">
                <div className="h-2 bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-500" />
                <CardHeader>
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <Badge className="bg-blue-100 text-blue-800">Skill Sprint</Badge>
                    <span className="inline-flex items-center text-xs font-medium text-slate-500">
                      <Clock3 className="mr-1.5 h-4 w-4" />
                      {course.estimatedMinutes} minutes
                    </span>
                  </div>
                  <CardTitle className="text-2xl transition-colors group-hover:text-blue-700">{course.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <p className="leading-7 text-slate-600">{course.description}</p>
                  <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-xl bg-slate-50 p-3">
                      <Target className="mb-1.5 h-4 w-4 text-blue-600" />
                      <span className="font-semibold text-slate-900">{course.lessons.length} rounds</span>
                    </div>
                    <div className="rounded-xl bg-amber-50 p-3">
                      <Trophy className="mb-1.5 h-4 w-4 text-amber-600" />
                      <span className="font-semibold text-amber-950">
                        {course.lessons.length * course.pointsPerLesson} XP
                      </span>
                    </div>
                  </div>
                  <div className="mt-auto pt-6">
                    <Link href={`/skills/${course.skillSlug}/learn`}>
                      <Button className="w-full">
                        Start this sprint <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-3xl border border-slate-200 bg-slate-950 p-8 text-white sm:p-10">
          <div className="grid gap-8 lg:grid-cols-3">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-300">The learning loop</div>
              <h2 className="mt-3 text-3xl font-bold">Designed for comprehension, not empty points.</h2>
            </div>
            <div className="lg:col-span-2 lg:grid lg:grid-cols-3 lg:gap-5">
              {[
                ['1', 'Understand', 'A concise model and a realistic example.'],
                ['2', 'Apply', 'A small challenge you can use in real work.'],
                ['3', 'Retrieve', 'A knowledge check with immediate feedback.'],
              ].map(([number, title, copy]) => (
                <div key={number} className="mt-5 rounded-2xl bg-white/10 p-5 first:mt-0 lg:mt-0">
                  <div className="text-sm font-bold text-blue-300">{number}</div>
                  <h3 className="mt-2 font-bold">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-300">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
          </div>
        </GamificationAccessGate>
      </div>
    </div>
  );
}
