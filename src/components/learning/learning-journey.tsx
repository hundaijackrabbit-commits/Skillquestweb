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

type SuggestedStep = {
  title: string;
  detail: string;
  href: string;
  actionLabel: string;
  reason: string;
};

// Use the learner's completed activities already stored on this device.
// Recommendations are deterministic and never incur an AI request.
function suggestedStepFor(activity: LearningActivity): SuggestedStep {
  const skill = activity.skillSlug.replace(/-/g, ' ');
  const skillHref = `/skills/${encodeURIComponent(activity.skillSlug)}`;
  const completed = Date.parse(activity.completedAt);
  if (Number.isFinite(completed) && Date.now() - completed >= 48 * 60 * 60 * 1000) {
    return {
      title: `Refresh your ${skill} learning`,
      detail: 'Try recalling the main idea from memory, then revisit your latest activity to check it.',
      href: activityLink(activity),
      actionLabel: 'Review latest activity',
      reason: 'A short review after time away is more useful than simply rereading right away.',
    };
  }

  if (activity.kind === 'workshop') {
    return {
      title: `Strengthen the ${skill} skill behind your work`,
      detail: 'You completed a practical work sample. Now reconnect it with the underlying skill and a new application.',
      href: skillHref,
      actionLabel: 'Explore skill guide',
      reason: 'Connect a finished workshop to the concepts you can reuse elsewhere.',
    };
  }
  if (activity.kind === 'mission') {
    return {
      title: 'Build on your mission with a workshop',
      detail: 'Put your recent real-world practice into a more structured work sample.',
      href: '/learn#workshops',
      actionLabel: 'Find a workshop',
      reason: 'A different practice format can help you transfer what you just learned.',
    };
  }
  if (activity.kind === 'course-lesson') {
    return {
      title: `Apply your ${skill} sprint`,
      detail: 'Pick one action from the skill guide that you can try in a real situation.',
      href: skillHref,
      actionLabel: 'Find a practical action',
      reason: 'Move from a completed lesson to an observable application.',
    };
  }
  if (activity.kind === 'knowledge-check') {
    return {
      title: `Take ${skill} beyond recall`,
      detail: 'You completed a retrieval check. Find a practical activity that uses the same skill.',
      href: skillHref,
      actionLabel: 'Apply this skill',
      reason: 'Use knowledge in context instead of stopping after a quiz.',
    };
  }
  return {
    title: `Connect your ${skill} practice to real work`,
    detail: 'You finished a sorting or sequencing challenge. Review the skill guide and choose a real-world application.',
    href: skillHref,
    actionLabel: 'Explore applications',
    reason: 'Bridge the gap between recognizing a pattern and using it independently.',
  };
}

export function LearningJourney({ compact = false }: { compact?: boolean }) {
  const { user } = useSupabase();
  const userId = user?.id;
  const [recent, setRecent] = useState<LearningActivity | null>(null);
  const [count, setCount] = useState(0);
  const [nextStep, setNextStep] = useState<SuggestedStep | null>(null);

  useEffect(() => {
    if (!userId) return;
    const refresh = () => {
      try {
        const activities = getLearningProfile(userId).activities;
        setCount(activities.length);
        const latest = activities.length ? activities[activities.length - 1] : null;
        setRecent(latest);
        setNextStep(latest ? suggestedStepFor(latest) : null);
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
      {nextStep && (
        <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">Suggested next step · based on your recent practice</p>
            <h3 className="mt-2 text-lg font-bold text-slate-950">{nextStep.title}</h3>
            <p className="mt-1 text-sm leading-6 text-slate-700">{nextStep.detail}</p>
            <p className="mt-2 text-xs leading-5 text-slate-600"><strong>Why this step:</strong> {nextStep.reason}</p>
          </div>
          <Link href={nextStep.href} className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 self-start rounded-xl bg-emerald-800 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700">
            {nextStep.actionLabel}<ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      )}
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
