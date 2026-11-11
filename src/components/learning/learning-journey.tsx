'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, BookmarkCheck, BookOpenCheck, Clock3, Target } from 'lucide-react';
import { useSupabase } from '@/components/providers/supabase-provider';
import { LEARNING_PROGRESS_EVENT, getLearningProfile, type LearningActivity } from '@/lib/learning-progress';

function activityLink(activity: LearningActivity | null) {
  if (!activity) return '/learn#workshops';
  if (activity.kind === 'workshop') {
    const slug = activity.id.split(':')[1];
    return slug ? `/learn/workshops/${encodeURIComponent(slug)}` : '/learn#workshops';
  }
  if (activity.kind === 'course-lesson') return `/skills/${encodeURIComponent(activity.skillSlug)}/learn`;
  const anchor = activity.kind === 'mission' ? 'skill-mission' : activity.kind === 'knowledge-check' ? 'knowledge-check' : 'interactive-practice';
  return `/skills/${encodeURIComponent(activity.skillSlug)}#${anchor}`;
}

export function LearningJourney({ compact = false }: { compact?: boolean }) {
  const { user } = useSupabase();
  const userId = user?.id;
  const [recent, setRecent] = useState<LearningActivity | null>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!userId) return;
    const refresh = () => {
      try {
        const activities = getLearningProfile(userId).activities;
        setCount(activities.length);
        setRecent(activities.length ? activities[activities.length - 1] : null);
      } catch { /* Storage may be unavailable. */ }
    };
    const frame = window.requestAnimationFrame(refresh);
    window.addEventListener(LEARNING_PROGRESS_EVENT, refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener(LEARNING_PROGRESS_EVENT, refresh);
      window.removeEventListener('storage', refresh);
    };
  }, [userId]);

  return (
    <section aria-labelledby={compact ? 'dashboard-journey-title' : 'practice-journey-title'} className="mb-8 rounded-3xl border border-indigo-200 bg-gradient-to-br from-white to-indigo-50 p-5 shadow-sm sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-indigo-700">Your learning loop</p>
          <h2 id={compact ? 'dashboard-journey-title' : 'practice-journey-title'} className="mt-2 text-xl font-bold text-slate-950 sm:text-2xl">Pick up where you left off</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            {recent ? `Your latest recorded rep involved ${recent.skillSlug.replace(/-/g, ' ')}. Review it, keep a useful insight, then choose your next rep.` : 'Start a guided workshop or Skill Sprint, then return here to revisit and build on it.'}
          </p>
        </div>
        <span className="rounded-full bg-indigo-100 px-3 py-1.5 text-xs font-bold text-indigo-900">{count} completed reps on this browser</span>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <Link href={activityLink(recent)} className="msl-motion-card flex flex-col rounded-2xl border border-slate-200 bg-white p-4 hover:border-blue-300 hover:shadow-md">
          <BookOpenCheck className="h-5 w-5 text-blue-700" />
          <strong className="mt-3 text-sm text-slate-950">{recent ? 'Review your latest rep' : 'Start a workshop'}</strong>
          <span className="mt-1 text-xs leading-5 text-slate-600">{recent ? 'Revisit the explanation or improve your work sample.' : 'Make something useful, not just another score.'}</span>
          <ArrowRight className="mt-3 h-4 w-4 text-blue-700" />
        </Link>
        <Link href="/dashboard#saved" className="msl-motion-card flex flex-col rounded-2xl border border-slate-200 bg-white p-4 hover:border-blue-300 hover:shadow-md">
          <BookmarkCheck className="h-5 w-5 text-violet-700" />
          <strong className="mt-3 text-sm text-slate-950">Saved learning</strong>
          <span className="mt-1 text-xs leading-5 text-slate-600">Return to saved skills, careers, and Knowledge Vault insights.</span>
          <ArrowRight className="mt-3 h-4 w-4 text-violet-700" />
        </Link>
        <Link href="/dashboard#progress" className="msl-motion-card flex flex-col rounded-2xl border border-slate-200 bg-white p-4 hover:border-blue-300 hover:shadow-md">
          <Target className="h-5 w-5 text-emerald-700" />
          <strong className="mt-3 text-sm text-slate-950">Review progress</strong>
          <span className="mt-1 text-xs leading-5 text-slate-600">See your XP, practice rhythm, and achievements.</span>
          <ArrowRight className="mt-3 h-4 w-4 text-emerald-700" />
        </Link>
      </div>
      <p className="mt-4 flex items-center gap-2 text-xs text-slate-500"><Clock3 className="h-3.5 w-3.5" /> Practice activity stays on this device for your signed-in account; cloud-saved skills and insights are separate.</p>
    </section>
  );
}
