import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

type CareerGuidePromoProps = {
  className?: string;
  eyebrow?: string;
};

export function CareerGuidePromo({ className, eyebrow = 'Free career & life management guide' }: CareerGuidePromoProps) {
  return (
    <section className={cn('overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-950 text-white shadow-xl', className)}>
      <div className="grid items-center gap-8 px-6 py-9 sm:px-9 lg:grid-cols-[1fr_220px] lg:px-12 lg:py-12">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-300">{eyebrow}</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">Turn uncertainty into a practical next move.</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-indigo-100 sm:text-base">
            The 60-page Career &amp; Life Map helps you clarify what matters, compare career directions, map skill gaps, and run small experiments before making large commitments.
          </p>
          <div className="mt-5 grid gap-2 text-sm text-indigo-100 sm:grid-cols-2">
            <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-300" /> Interactive worksheets</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-300" /> Weekly and quarterly reviews</span>
          </div>
          <Link href="/free-career-guide" className="mt-7 inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-violet-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-violet-950">
            Get the free guide <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <Link href="/free-career-guide" className="group mx-auto hidden w-full max-w-[210px] rounded-2xl border border-white/20 bg-white/10 p-3 shadow-2xl transition hover:-translate-y-1 lg:block" aria-label="View the Career and Life Map">
          <Image src="/images/guides/career-life-map-cover.png" alt="Cover of The Modern Skill Lab Career and Life Map" width={612} height={792} sizes="210px" className="h-auto w-full rounded-xl" />
          <span className="mt-3 flex items-center justify-center gap-2 text-xs font-semibold text-violet-100"><FileText className="h-4 w-4" /> 60-page interactive PDF</span>
        </Link>
      </div>
    </section>
  );
}

