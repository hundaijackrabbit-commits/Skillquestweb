'use client';

import { useEffect, useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  Layers3,
  ListOrdered,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { useSupabase } from '@/components/providers/supabase-provider';
import { GamificationAccessGate } from '@/components/learning/gamification-access-gate';
import { Button } from '@/components/ui/button';
import type { InteractivePractice, SequencePractice } from '@/lib/interactive-practice';
import {
  getLearningProfile,
  hasLearningActivity,
  recordLearningActivity,
  type LearningProfile,
} from '@/lib/learning-progress';

type Props = {
  practice: InteractivePractice;
  className?: string;
};

type ExperienceProps = Props & { userId: string };

const emptyProfile: LearningProfile = {
  version: 1,
  totalXp: 0,
  currentStreak: 0,
  longestStreak: 0,
  lastPracticeDate: null,
  activities: [],
};

function shuffledSequence(practice: InteractivePractice) {
  if (practice.kind !== 'sequence') return [];
  const positions = [2, 0, 3, 1];
  return positions.map((position) => practice.items[position]).filter(Boolean);
}

function sessionId() {
  const key = 'msl_session_id';
  const stored = window.sessionStorage.getItem(key);
  if (stored) return stored;
  const created = typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random()}`;
  window.sessionStorage.setItem(key, created);
  return created;
}

export function InteractivePracticeCard({ practice, className = '' }: Props) {
  const { user } = useSupabase();
  const activityType = practice.kind === 'sequence' ? 'sequence builder' : 'categorization challenge';
  return (
    <GamificationAccessGate
      id="interactive-practice"
      className={className}
      featureName={`${practice.skillName} ${activityType}`}
      description="Create an account to manipulate the activity, receive feedback, earn XP, and keep the completion in your private learning profile."
    >
      {user ? <InteractivePracticeExperience practice={practice} className={className} userId={user.id} /> : null}
    </GamificationAccessGate>
  );
}

function InteractivePracticeExperience({ practice, className = '', userId }: ExperienceProps) {
  const [profile, setProfile] = useState(emptyProfile);
  const [order, setOrder] = useState(() => shuffledSequence(practice));
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const [attempted, setAttempted] = useState(false);
  const [solved, setSolved] = useState(false);
  const activityId = `practice:${practice.id}`;

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setProfile(getLearningProfile(userId)));
    return () => window.cancelAnimationFrame(frame);
  }, [userId]);

  const rewarded = hasLearningActivity(profile, activityId);
  const allSorted = practice.kind === 'sort' && practice.items.every((item) => assignments[item.id]);

  function moveItem(index: number, direction: -1 | 1) {
    if (solved) return;
    const destination = index + direction;
    if (destination < 0 || destination >= order.length) return;
    const next = [...order];
    [next[index], next[destination]] = [next[destination], next[index]];
    setOrder(next);
    setAttempted(false);
  }

  function assignItem(itemId: string, categoryId: string) {
    if (solved) return;
    setAssignments((current) => ({ ...current, [itemId]: categoryId }));
    setAttempted(false);
  }

  function isCorrect() {
    if (practice.kind === 'sequence') {
      return order.every((item, index) => item.id === practice.items[index]?.id);
    }
    return practice.items.every((item) => assignments[item.id] === item.categoryId);
  }

  function checkPractice() {
    setAttempted(true);
    if (!isCorrect()) return;
    setSolved(true);
    if (rewarded) return;

    const next = recordLearningActivity({
      id: activityId,
      kind: practice.kind === 'sequence' ? 'sequence-practice' : 'sort-practice',
      skillSlug: practice.skillSlug,
      xp: practice.xp,
    }, userId);
    setProfile(next);

    fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventType: 'cta_click',
        itemType: 'skill',
        itemSlug: `${practice.skillSlug}:${practice.kind}-practice`,
        path: window.location.pathname,
        sessionId: sessionId(),
      }),
      keepalive: true,
    }).catch(() => {});
  }

  function resetPractice() {
    setOrder(shuffledSequence(practice));
    setAssignments({});
    setAttempted(false);
    setSolved(false);
  }

  return (
    <section id="interactive-practice" className={`scroll-mt-28 overflow-hidden rounded-3xl border border-cyan-200 bg-white shadow-sm ${className}`} aria-labelledby={`${practice.id}-title`}>
      <div className="grid lg:grid-cols-[0.72fr_1.28fr]">
        <div className="bg-gradient-to-br from-cyan-950 via-blue-950 to-slate-950 p-7 text-white sm:p-9">
          <div className="inline-flex items-center rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-cyan-200">
            {practice.kind === 'sequence' ? <ListOrdered className="mr-2 h-4 w-4" /> : <Layers3 className="mr-2 h-4 w-4" />}
            {practice.label}
          </div>
          <h2 id={`${practice.id}-title`} className="mt-4 text-3xl font-bold tracking-tight">{practice.title}</h2>
          <p className="mt-3 leading-7 text-cyan-100">{practice.instruction}</p>
          <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold">
            <span className="rounded-full bg-white/10 px-3 py-2"><Sparkles className="mr-1.5 inline h-4 w-4" />{rewarded ? 'Reward earned' : `${practice.xp} XP`}</span>
            <span className="rounded-full bg-white/10 px-3 py-2">Move, test, and retry</span>
          </div>
        </div>

        <div className="p-7 sm:p-9">
          {practice.kind === 'sequence' ? (
            <SequenceBoard order={order} solved={solved} moveItem={moveItem} />
          ) : (
            <div className="space-y-3">
              {practice.items.map((item) => {
                const assigned = assignments[item.id];
                const itemCorrect = assigned === item.categoryId;
                return (
                  <div key={item.id} className={`rounded-2xl border p-4 ${attempted && assigned ? (itemCorrect ? 'border-emerald-200 bg-emerald-50' : 'border-amber-300 bg-amber-50') : 'border-slate-200'}`}>
                    <p className="text-sm font-semibold leading-6 text-slate-900">{item.text}</p>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {practice.categories.map((category) => (
                        <button
                          key={category.id}
                          type="button"
                          disabled={solved}
                          onClick={() => assignItem(item.id, category.id)}
                          aria-pressed={assigned === category.id}
                          className={`rounded-xl border px-3 py-2 text-left text-xs font-bold transition ${assigned === category.id ? 'border-cyan-500 bg-cyan-50 text-cyan-950' : 'border-slate-200 text-slate-600 hover:border-cyan-300'}`}
                        >
                          {category.label}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
              <div className="grid gap-2 sm:grid-cols-2">
                {practice.categories.map((category) => (
                  <div key={category.id} className="rounded-xl bg-slate-50 p-3 text-xs leading-5 text-slate-600"><strong className="text-slate-900">{category.label}:</strong> {category.description}</div>
                ))}
              </div>
            </div>
          )}

          {attempted && (
            <div className={`mt-5 rounded-2xl p-4 text-sm leading-6 ${solved ? 'bg-emerald-50 text-emerald-950' : 'bg-amber-50 text-amber-950'}`} role="status">
              <div className="font-bold">{solved ? 'Pattern complete.' : 'Not yet—review the highlighted choices and try a different structure.'}</div>
              {solved && <p className="mt-1">{practice.explanation}</p>}
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-5">
            <span className="text-sm font-semibold text-slate-600">{solved ? <><CheckCircle2 className="mr-2 inline h-4 w-4 text-emerald-600" />Complete · {profile.totalXp} total XP</> : 'No penalty for retrying'}</span>
            <div className="flex gap-2">
              {solved && <Button type="button" variant="outline" onClick={resetPractice}><RotateCcw className="mr-2 h-4 w-4" />Replay</Button>}
              {!solved && <Button type="button" onClick={checkPractice} disabled={practice.kind === 'sort' && !allSorted}>Check my work</Button>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SequenceBoard({
  order,
  solved,
  moveItem,
}: {
  order: SequencePractice['items'];
  solved: boolean;
  moveItem: (index: number, direction: -1 | 1) => void;
}) {
  return (
    <ol className="space-y-3" aria-label="Arrange the steps">
      {order.map((item, index) => (
        <li key={item.id} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-cyan-100 font-bold text-cyan-800">{index + 1}</span>
          <p className="flex-1 text-sm font-semibold leading-6 text-slate-900">{item.text}</p>
          <div className="flex flex-col gap-1">
            <button type="button" disabled={solved || index === 0} onClick={() => moveItem(index, -1)} className="rounded-lg border bg-white p-1.5 text-slate-600 enabled:hover:border-cyan-400 disabled:opacity-30" aria-label={`Move ${item.text} up`}><ArrowUp className="h-4 w-4" /></button>
            <button type="button" disabled={solved || index === order.length - 1} onClick={() => moveItem(index, 1)} className="rounded-lg border bg-white p-1.5 text-slate-600 enabled:hover:border-cyan-400 disabled:opacity-30" aria-label={`Move ${item.text} down`}><ArrowDown className="h-4 w-4" /></button>
          </div>
        </li>
      ))}
    </ol>
  );
}
