'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ArrowRight,
  CheckCircle2,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useSupabase } from '@/components/providers/supabase-provider';
import { Button } from '@/components/ui/button';

type Props = {
  children: ReactNode;
  id?: string;
  featureName?: string;
  description?: string;
  className?: string;
};

function BlurredPracticePreview() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none col-start-1 row-start-1 min-h-[38rem] select-none overflow-hidden bg-white opacity-65 blur-[7px] sm:min-h-[34rem]"
      inert
    >
      <div className="grid min-h-full lg:grid-cols-[0.72fr_1.28fr]">
        <div className="bg-gradient-to-br from-violet-950 via-blue-950 to-slate-950 p-6 text-white sm:p-8">
          <div className="h-7 w-36 rounded-full bg-white/20" />
          <div className="mt-7 h-10 w-4/5 rounded-xl bg-white/25" />
          <div className="mt-3 h-5 w-full rounded-lg bg-white/15" />
          <div className="mt-2 h-5 w-3/4 rounded-lg bg-white/15" />
          <div className="mt-8 flex gap-3">
            <div className="h-9 w-24 rounded-full bg-white/15" />
            <div className="h-9 w-32 rounded-full bg-white/15" />
          </div>
        </div>
        <div className="space-y-3 p-5 sm:p-8">
          {[72, 88, 64, 82].map((width, index) => (
            <div key={width} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100 font-bold text-violet-800">{index + 1}</span>
              <span className="h-4 rounded-full bg-slate-300" style={{ width: `${width}%` }} />
              <span className="ml-auto h-8 w-8 rounded-lg border bg-white" />
            </div>
          ))}
          <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-6">
            <div className="h-4 w-32 rounded-full bg-slate-200" />
            <div className="h-11 w-36 rounded-xl bg-violet-600" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function GamificationAccessGate({
  children,
  id,
  featureName = 'interactive practice',
  description = 'Create a free account to unlock this activity, earn account-scoped XP, and build your private practice record.',
  className = '',
}: Props) {
  const { user, loading } = useSupabase();
  const pathname = usePathname();

  if (user && !loading) return children;

  const returnTo = `${pathname || '/learn'}${id ? `#${id}` : ''}`;
  const signUpHref = `/auth?mode=signup&redirect=${encodeURIComponent(returnTo)}`;
  const signInHref = `/auth?mode=signin&redirect=${encodeURIComponent(returnTo)}`;

  return (
    <section
      id={id}
      className={`grid scroll-mt-28 overflow-hidden rounded-3xl border border-violet-200 bg-white shadow-lg ${className}`}
      aria-label={loading ? 'Checking member access' : `${featureName} requires an account`}
      aria-busy={loading}
    >
      <BlurredPracticePreview />
      <div className="z-10 col-start-1 row-start-1 flex min-w-0 items-center justify-center bg-slate-950/30 p-3 backdrop-blur-[2px] min-[380px]:p-4 sm:p-8">
        <div className="w-full min-w-0 max-w-xl overflow-hidden rounded-2xl border border-white/70 bg-white/95 p-5 text-center shadow-2xl shadow-slate-950/25 min-[380px]:p-6 sm:rounded-3xl sm:p-9">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-700 shadow-inner sm:h-14 sm:w-14">
            <LockKeyhole className="h-6 w-6 sm:h-7 sm:w-7" />
          </div>

          {loading ? (
            <>
              <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-violet-700">Member practice</p>
              <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">Checking your access…</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">The activity stays locked until your account session is confirmed.</p>
            </>
          ) : (
            <>
              <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-violet-700">Account required</p>
              <h2 className="mt-2 break-words text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">Unlock {featureName}</h2>
              <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">{description}</p>

              <div className="mt-4 flex items-start gap-3 rounded-2xl bg-emerald-50 p-3 text-left text-xs leading-5 text-emerald-950 sm:mt-5 sm:p-4 sm:text-sm sm:leading-6">
                <ShieldCheck className="mt-0.5 h-5 w-5 flex-none text-emerald-700" />
                <p>Guides remain free to read. Your account unlocks practice, feedback, XP, streaks, achievements, and saved progress.</p>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:mt-6 sm:flex-row">
                <Link href={signUpHref} className="block w-full sm:flex-1">
                  <Button className="w-full" size="lg"><Sparkles className="mr-2 h-4 w-4" />Create free account</Button>
                </Link>
                <Link href={signInHref} className="block w-full sm:flex-1">
                  <Button className="w-full" variant="outline" size="lg">Sign in <ArrowRight className="ml-2 h-4 w-4" /></Button>
                </Link>
              </div>

              <p className="mt-4 inline-flex items-start text-left text-[11px] leading-4 text-slate-500 sm:items-center sm:text-xs sm:leading-5">
                <CheckCircle2 className="mr-1.5 h-3.5 w-3.5 text-emerald-600" />
                You will return to this exact activity after authentication.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
