import Link from 'next/link';
import { ArrowRight, BookOpen, BriefcaseBusiness, Compass, Sparkles, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const metadata = {
  title: 'Learning Community',
  description: 'Create a Modern Skill Lab profile, save useful resources, practice skills, and explore career directions.',
  alternates: { canonical: '/community' },
};

const waysToParticipate = [
  {
    icon: UserRound,
    title: 'Build your fit map',
    description: 'Turn your interests, goals, work style, and strengths into explainable industry, career, and skill recommendations.',
    href: '/dashboard#profile-assessment',
    cta: 'Open your profile',
  },
  {
    icon: Sparkles,
    title: 'Practice actively',
    description: 'Use short challenges, missions, sequence builders, Skill Sprints, XP, streaks, and private achievements.',
    href: '/learn',
    cta: 'Open Practice Lab',
  },
  {
    icon: BookOpen,
    title: 'Build a useful library',
    description: 'Save skill guides you want to revisit instead of rebuilding your reading list every time.',
    href: '/skills',
    cta: 'Explore skills',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Shortlist career directions',
    description: 'Compare career profiles, their core skills, work environments, industries, and practical entry routes.',
    href: '/careers',
    cta: 'Explore careers',
  },
] as const;

export default function CommunityPage() {
  return (
    <div className="bg-white">
      <section className="border-b border-slate-200 bg-gradient-to-br from-slate-950 via-blue-950 to-violet-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
          <Badge className="bg-white/10 text-blue-100">Learning community</Badge>
          <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">A personal place to explore, save, and practise modern skills.</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-blue-100">Modern Skill Lab connects the public knowledge repository with a private member profile. Use it to keep useful discoveries, test career directions, and build a steady practice rhythm.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/auth?mode=signup&redirect=%2Fdashboard"><Button size="lg" className="w-full bg-white text-slate-950 hover:bg-blue-50 sm:w-auto">Create free account<ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
            <Link href="/learn"><Button size="lg" variant="outline" className="w-full border-white/30 bg-transparent text-white hover:bg-white/10 sm:w-auto">See member practice</Button></Link>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700">Four useful actions</div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Start with what helps you move forward</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">Every control below leads to a working part of the platform. There are no placeholder feeds or empty community counters.</p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {waysToParticipate.map((item) => (
              <Link key={item.title} href={item.href} className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-700"><item.icon className="h-5 w-5" /></div>
                <h3 className="mt-5 text-xl font-bold text-slate-950 group-hover:text-blue-700">{item.title}</h3>
                <p className="mt-2 leading-7 text-slate-600">{item.description}</p>
                <span className="mt-5 inline-flex items-center text-sm font-bold text-blue-700">{item.cta}<ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
              </Link>
            ))}
          </div>

          <div className="mt-12 flex flex-col gap-5 rounded-3xl bg-slate-50 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-700"><Compass className="h-6 w-6" /></div>
              <div>
                <h2 className="text-xl font-bold text-slate-950">Not sure where to begin?</h2>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600">The personal fit assessment is the fastest route from a large content library to a focused shortlist.</p>
              </div>
            </div>
            <Link href="/dashboard#profile-assessment" className="inline-flex flex-none items-center text-sm font-bold text-blue-700 hover:text-blue-900">Build your fit map<ArrowRight className="ml-1.5 h-4 w-4" /></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
