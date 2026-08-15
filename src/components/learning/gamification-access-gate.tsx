'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, LockKeyhole, ShieldCheck, Sparkles } from 'lucide-react';
import { useSupabase } from '@/components/providers/supabase-provider';
import { Button } from '@/components/ui/button';

type Props = {
  children: ReactNode;
  id?: string;
  featureName?: string;
  description?: string;
  className?: string;
};

export function GamificationAccessGate({
  children,
  id,
  featureName = 'interactive practice',
  description = 'Create a free account to unlock this activity, earn account-scoped XP, and build your private practice record.',
  className = '',
}: Props) {
  const { user, loading } = useSupabase();
  const pathname = usePathname();

  if (loading) {
    return <div id={id} className={`h-64 scroll-mt-28 animate-pulse rounded-3xl border border-violet-100 bg-violet-50/60 ${className}`} aria-label="Checking member access" />;
  }

  if (user) return children;

  const returnTo = pathname || '/learn';
  const signUpHref = `/auth?mode=signup&redirect=${encodeURIComponent(returnTo)}`;
  const signInHref = `/auth?mode=signin&redirect=${encodeURIComponent(returnTo)}`;

  return (
    <section id={id} className={`scroll-mt-28 overflow-hidden rounded-3xl border border-violet-200 bg-white shadow-sm ${className}`} aria-label={`${featureName} requires an account`}>
      <div className="grid lg:grid-cols-[0.72fr_1.28fr]">
        <div className="bg-gradient-to-br from-violet-950 via-indigo-950 to-slate-950 p-7 text-white sm:p-9">
          <div className="inline-flex items-center rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-violet-200">
            <LockKeyhole className="mr-2 h-4 w-4" /> Member practice
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight">Unlock {featureName}</h2>
          <p className="mt-3 leading-7 text-violet-100">{description}</p>
        </div>
        <div className="flex flex-col justify-center p-7 sm:p-9">
          <div className="flex items-start gap-3 rounded-2xl bg-emerald-50 p-4 text-sm leading-6 text-emerald-950">
            <ShieldCheck className="mt-0.5 h-5 w-5 flex-none text-emerald-700" />
            <p>Your skill guides stay free to read. An account is required only for interactive practice, rewards, streaks, and saved progress.</p>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href={signUpHref} className="sm:flex-1">
              <Button className="w-full" size="lg"><Sparkles className="mr-2 h-4 w-4" />Create free account</Button>
            </Link>
            <Link href={signInHref} className="sm:flex-1">
              <Button className="w-full" variant="outline" size="lg">Sign in <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </Link>
          </div>
          <p className="mt-4 text-xs leading-5 text-slate-500">No public leaderboard. Your learning record is private to your account on this browser.</p>
        </div>
      </div>
    </section>
  );
}
