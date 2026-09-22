import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
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

export default function SkillPathPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-blue-100 bg-gradient-to-b from-blue-50/80 via-white to-white">
        <div className="absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.12),transparent_60%)]" />
        <div className="relative mx-auto max-w-5xl px-6 py-8 text-center sm:py-10 lg:px-8 lg:py-11">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">Free skill-path diagnostic</p>
          <h1 className="mx-auto mt-3 max-w-4xl text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Not sure what to learn next?
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
            Get a focused skill stack, a practical 30-day roadmap, and one proof-of-work project matched to your goals and available time.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs font-semibold text-slate-600 sm:text-sm">
            <span className="inline-flex items-center"><CheckCircle2 className="mr-1.5 h-4 w-4 text-emerald-600" />Free to use</span>
            <span className="inline-flex items-center"><CheckCircle2 className="mr-1.5 h-4 w-4 text-emerald-600" />Personalized result</span>
            <span className="inline-flex items-center"><CheckCircle2 className="mr-1.5 h-4 w-4 text-emerald-600" />About 3 minutes</span>
          </div>
        </div>
      </section>

      <section className="py-6 sm:py-8">
        <div className="mx-auto max-w-4xl px-3 sm:px-6 lg:px-8">
          <MagnetlySkillPathEmbed />

          <div className="mt-4 flex flex-col gap-2 border-t border-slate-100 pt-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:text-sm">
            <p>
              Powered by Magnetly. See the <Link href="/privacy" className="font-semibold text-blue-700 hover:text-blue-900">privacy page</Link> for how diagnostic information is handled.
            </p>
            <Link href="/paths" className="inline-flex shrink-0 items-center font-semibold text-blue-700 hover:text-blue-900">
              Already know your direction? Browse paths <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
