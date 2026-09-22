import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Compass, Layers3, Route } from 'lucide-react';
import { MagnetlySkillPathEmbed } from '@/components/marketing/magnetly-skill-path-embed';

export const metadata: Metadata = {
  title: 'Free Skill-Path Diagnostic',
  description: 'Get a focused skill stack, a practical 30-day roadmap, and one proof-of-work project based on your goals, strengths, constraints, and available time.',
  alternates: { canonical: '/skill-path' },
  openGraph: {
    title: 'Free Skill-Path Diagnostic | Modern Skill Lab',
    description: 'Turn career goals and real-life constraints into a focused skill stack and 30-day learning roadmap.',
    url: '/skill-path',
  },
};

const outcomes = [
  {
    icon: Compass,
    title: 'A clear starting point',
    text: 'Identify the anchor skill that deserves your attention first instead of collecting disconnected topics.',
  },
  {
    icon: Layers3,
    title: 'A useful skill stack',
    text: 'Pair your anchor skill with one or two supporting capabilities that fit the work you want to do.',
  },
  {
    icon: Route,
    title: 'A 30-day roadmap',
    text: 'Turn the recommendation into specific practice, one proof-of-work project, and a realistic weekly rhythm.',
  },
];

export default function SkillPathPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-blue-100 bg-gradient-to-b from-blue-50 via-white to-white">
        <div className="absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.16),transparent_58%)]" />
        <div className="relative mx-auto max-w-5xl px-6 py-14 text-center sm:py-20 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-700">Free skill-path diagnostic</p>
          <h1 className="mx-auto mt-4 max-w-4xl text-4xl font-bold tracking-tight text-slate-950 sm:text-6xl">
            Not sure what to learn next?
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Answer a few practical questions about your goal, strengths, constraints, and available time. You&apos;ll get a focused skill stack, a 30-day roadmap, and one proof-of-work project you can actually use.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-semibold text-slate-700">
            <span className="inline-flex items-center"><CheckCircle2 className="mr-2 h-4 w-4 text-emerald-600" />Free to use</span>
            <span className="inline-flex items-center"><CheckCircle2 className="mr-2 h-4 w-4 text-emerald-600" />Personalized result</span>
            <span className="inline-flex items-center"><CheckCircle2 className="mr-2 h-4 w-4 text-emerald-600" />Built for practical progress</span>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <MagnetlySkillPathEmbed />
          <p className="mx-auto mt-5 max-w-3xl text-center text-xs leading-5 text-slate-500">
            The diagnostic is provided through Magnetly. Information you submit is used to generate your result. See the <Link href="/privacy" className="font-semibold text-blue-700 hover:text-blue-900">Modern Skill Lab privacy page</Link> for details.
          </p>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-3">
            {outcomes.map((outcome) => (
              <article key={outcome.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="inline-flex rounded-2xl bg-blue-50 p-3 text-blue-700"><outcome.icon className="h-5 w-5" aria-hidden="true" /></div>
                <h2 className="mt-5 text-xl font-bold text-slate-950">{outcome.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{outcome.text}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm text-slate-600">Already know the direction you want?</p>
            <Link href="/paths" className="mt-2 inline-flex items-center text-sm font-bold text-blue-700 hover:text-blue-900">
              Browse structured learning paths <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
