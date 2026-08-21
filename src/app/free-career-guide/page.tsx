import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpenCheck, CheckCircle2, Compass, FilePenLine, Route, Sparkles } from 'lucide-react';
import { CareerGuideForm } from '@/components/marketing/career-guide-form';
import { absoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Free Career & Life Management Guide',
  description: 'Get the free 60-page Modern Skill Lab Career & Life Map: an interactive workbook for career direction, skill planning, learning sprints, and better weekly decisions.',
  alternates: { canonical: '/free-career-guide' },
  openGraph: {
    title: 'The Modern Skill Lab Career & Life Map',
    description: 'A free 60-page interactive workbook for clearer career and life decisions.',
    url: '/free-career-guide',
    images: [{ url: '/images/guides/career-life-map-cover.png', width: 612, height: 792, alt: 'The Modern Skill Lab Career and Life Map cover' }],
  },
};

const outcomes = [
  { icon: Compass, title: 'Build your personal compass', text: 'Name the values, interests, strengths, constraints, and working conditions that should shape your choices.' },
  { icon: Route, title: 'Compare directions clearly', text: 'Turn vague career ideas into criteria, evidence, trade-offs, and low-risk experiments.' },
  { icon: FilePenLine, title: 'Create a skill plan', text: 'Map gaps, choose a useful skill stack, and define proof that makes your progress visible.' },
  { icon: BookOpenCheck, title: 'Run a repeatable system', text: 'Use weekly, monthly, and quarterly reviews to keep plans realistic as your life changes.' },
];

const included = [
  'A current-state career and life snapshot',
  'Values, interests, strengths, and constraints prompts',
  'Career fit criteria and opportunity comparison tools',
  'Informational interview and small-experiment planners',
  'Skill-gap maps, learning sprints, and evidence trackers',
  'Weekly, monthly, and quarterly review pages',
];

export default function FreeCareerGuidePage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'DigitalDocument',
    name: 'The Modern Skill Lab Career & Life Map',
    description: 'A 60-page interactive career and life management workbook.',
    url: absoluteUrl('/free-career-guide'),
    isAccessibleForFree: true,
    publisher: { '@type': 'Organization', name: 'Modern Skill Lab', url: absoluteUrl('/') },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <section id="top" className="relative scroll-mt-24 overflow-hidden border-b border-violet-100 bg-gradient-to-b from-violet-50 via-white to-white">
        <div className="absolute inset-x-0 top-0 h-96 bg-[radial-gradient(circle_at_top_left,rgba(109,61,245,0.18),transparent_55%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-14 sm:px-6 sm:py-20 lg:grid-cols-[0.82fr_1.18fr] lg:px-8 lg:py-24">
          <div className="mx-auto w-full max-w-[390px] lg:order-first">
            <div className="relative rounded-[2rem] border border-violet-200 bg-white p-3 shadow-[0_30px_80px_-30px_rgba(76,29,149,0.45)] sm:p-4">
              <Image src="/images/guides/career-life-map-cover.png" alt="Cover of The Modern Skill Lab Career and Life Map" width={612} height={792} priority sizes="(max-width: 1024px) 80vw, 390px" className="h-auto w-full rounded-[1.4rem]" />
              <div className="absolute -bottom-4 -right-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-bold text-white shadow-xl sm:-right-5">
                60 pages · fillable PDF
              </div>
            </div>
          </div>

          <div className="lg:pl-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-violet-800">
              <Sparkles className="h-4 w-4" aria-hidden="true" /> Free interactive workbook
            </div>
            <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-slate-950 sm:text-6xl">Make your next career move with more clarity—and less guesswork.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              The Modern Skill Lab Career &amp; Life Map is a practical system for understanding where you are, deciding what matters, exploring realistic directions, and turning insight into a small next action.
            </p>

            <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-violet-950/5 sm:p-7">
              <h2 className="text-2xl font-bold tracking-tight text-slate-950">Send the guide to your inbox</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">You will receive the complete workbook as an attachment plus a backup download link.</p>
              <CareerGuideForm source="career-guide-hero" className="mt-6" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet-700">What it helps you do</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">A decision system, not another motivational download.</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">Use the pages in order or jump to the decision you are facing now. Each section produces a concrete output you can revisit.</p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {outcomes.map((outcome) => (
              <article key={outcome.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="inline-flex rounded-2xl bg-violet-100 p-3 text-violet-700"><outcome.icon className="h-5 w-5" aria-hidden="true" /></div>
                <h3 className="mt-5 text-lg font-bold text-slate-950">{outcome.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{outcome.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet-700">Inside the workbook</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">From reflection to evidence-backed action.</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">The guide connects personal context, career exploration, skill development, and life management so your plan works as one system.</p>
            <Link href="/auth?mode=signup&redirect=%2Fdashboard" className="mt-7 inline-flex min-h-12 items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800">
              Create a free member account <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
            <p className="mt-3 text-xs leading-5 text-slate-500">New members are also sent the guide automatically.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {included.map((item) => (
              <div key={item} className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm font-semibold leading-6 text-slate-800 shadow-sm">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Start with one honest page.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">You do not need a perfect five-year plan. You need a clearer picture of today and a useful experiment for the next seven days.</p>
          <Link href="#top" className="mt-7 inline-flex items-center text-sm font-bold text-violet-700 hover:text-violet-900">Send me the guide <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </div>
      </section>
    </>
  );
}
