'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Brain, Check, CheckCircle2, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { KnowledgeCheck } from '@/lib/knowledge-checks';
import {
  getLearningProfile,
  hasLearningActivity,
  recordLearningActivity,
  type LearningProfile,
} from '@/lib/learning-progress';

type Props = {
  check: KnowledgeCheck;
  className?: string;
};

const emptyProfile: LearningProfile = {
  version: 1,
  totalXp: 0,
  currentStreak: 0,
  longestStreak: 0,
  lastPracticeDate: null,
  activities: [],
};

function sessionId() {
  const key = 'msl_session_id';
  const stored = window.sessionStorage.getItem(key);
  if (stored) return stored;
  const created =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random()}`;
  window.sessionStorage.setItem(key, created);
  return created;
}

export function KnowledgeCheckCard({ check, className = '' }: Props) {
  const [profile, setProfile] = useState(emptyProfile);
  const [selected, setSelected] = useState<number | null>(null);
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const next = getLearningProfile();
      setProfile(next);
      setSolved(hasLearningActivity(next, `check:${check.id}`));
    });
    return () => window.cancelAnimationFrame(frame);
  }, [check.id]);

  const selectedIsCorrect = selected === check.correctIndex;
  const alreadyRewarded = hasLearningActivity(profile, `check:${check.id}`);

  function chooseAnswer(index: number) {
    setSelected(index);
    if (index !== check.correctIndex) return;

    setSolved(true);
    if (alreadyRewarded) return;

    const next = recordLearningActivity({
      id: `check:${check.id}`,
      kind: 'knowledge-check',
      skillSlug: check.skillSlug,
      xp: check.xp,
    });
    setProfile(next);

    fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventType: 'cta_click',
        itemType: 'skill',
        itemSlug: `${check.skillSlug}:knowledge-check`,
        path: window.location.pathname,
        sessionId: sessionId(),
      }),
      keepalive: true,
    }).catch(() => {});
  }

  return (
    <section id="knowledge-check" className={`scroll-mt-28 overflow-hidden rounded-3xl border border-violet-200 bg-white shadow-sm ${className}`} aria-labelledby={`${check.id}-title`}>
      <div className="grid lg:grid-cols-[0.72fr_1.28fr]">
        <div className="bg-gradient-to-br from-violet-950 via-blue-950 to-slate-950 p-6 text-white sm:p-7">
          <div className="inline-flex items-center rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-violet-200">
            <Brain className="mr-2 h-4 w-4" />{check.label}
          </div>
          <h2 id={`${check.id}-title`} className="mt-4 text-2xl font-bold tracking-tight">{check.title}</h2>
          <p className="mt-3 text-sm leading-6 text-blue-100">Answer once from memory, then use the feedback to correct your model.</p>
          <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold">
            <span className="rounded-full bg-white/10 px-3 py-1.5"><Sparkles className="mr-1 inline h-3.5 w-3.5" />{alreadyRewarded ? 'Reward earned' : `${check.xp} XP`}</span>
            <span className="rounded-full bg-white/10 px-3 py-1.5">No penalty for retrying</span>
          </div>
        </div>

        <div className="p-6 sm:p-7">
          <p className="text-lg font-bold leading-7 text-slate-950">{check.question}</p>
          <div className="mt-5 space-y-2.5">
            {check.options.map((option, index) => {
              const isSelected = selected === index;
              const isCorrectAnswer = index === check.correctIndex;
              const showCorrect = selectedIsCorrect && isCorrectAnswer;
              const showIncorrect = isSelected && !isCorrectAnswer;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => chooseAnswer(index)}
                  className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-left text-sm font-medium leading-6 transition ${
                    showCorrect
                      ? 'border-emerald-300 bg-emerald-50 text-emerald-950'
                      : showIncorrect
                        ? 'border-amber-300 bg-amber-50 text-amber-950'
                        : 'border-slate-200 text-slate-700 hover:border-violet-300 hover:bg-violet-50/50'
                  }`}
                >
                  <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full border bg-white text-xs font-bold">
                    {showCorrect ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : showIncorrect ? <X className="h-3.5 w-3.5 text-amber-600" /> : String.fromCharCode(65 + index)}
                  </span>
                  <span>{option}</span>
                </button>
              );
            })}
          </div>

          {selected !== null && (
            <div className={`mt-5 rounded-2xl p-4 text-sm leading-6 ${selectedIsCorrect ? 'bg-emerald-50 text-emerald-950' : 'bg-amber-50 text-amber-950'}`} role="status">
              <div className="font-bold">{selectedIsCorrect ? 'Correct—your model holds up.' : 'Not yet. Compare the decision, evidence, and consequence once more.'}</div>
              <p className="mt-1">{check.explanation}</p>
            </div>
          )}

          {solved && check.continueHref && (
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-5">
              <span className="inline-flex items-center text-sm font-semibold text-emerald-700"><CheckCircle2 className="mr-2 h-4 w-4" />Check complete · {profile.totalXp} total XP</span>
              <Link href={check.continueHref}><Button variant="outline" size="sm">{check.continueLabel ?? 'Continue learning'}<ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
