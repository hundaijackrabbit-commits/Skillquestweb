'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Flame, Sparkles, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  getLearningProfile,
  hasLearningActivity,
  recordLearningActivity,
  type LearningProfile,
} from '@/lib/learning-progress';

type Mission = {
  level: 'Starter' | 'Builder' | 'Stretch';
  action: string;
  xp: number;
};

type Props = {
  skillSlug: string;
  skillName: string;
  missions: Mission[];
  nextSkill?: { name: string; slug: string; reason: string };
};

const blankProfile: LearningProfile = {
  version: 1,
  totalXp: 0,
  currentStreak: 0,
  longestStreak: 0,
  lastPracticeDate: null,
  activities: [],
};

function missionId(skillSlug: string, index: number) {
  return `mission:${skillSlug}:${index}`;
}

export function SkillMission({ skillSlug, skillName, missions, nextSkill }: Props) {
  const [profile, setProfile] = useState(blankProfile);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [reflection, setReflection] = useState('');
  const [justCompleted, setJustCompleted] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setProfile(getLearningProfile()));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const selected = missions[selectedIndex];
  const selectedId = missionId(skillSlug, selectedIndex);
  const isComplete = hasLearningActivity(profile, selectedId);
  const completedCount = useMemo(
    () => missions.filter((_, index) => hasLearningActivity(profile, missionId(skillSlug, index))).length,
    [missions, profile, skillSlug],
  );

  function chooseMission(index: number) {
    setSelectedIndex(index);
    setReflection('');
    setJustCompleted(false);
  }

  function completeMission() {
    if (reflection.trim().length < 20 || isComplete) return;
    const next = recordLearningActivity({
      id: selectedId,
      kind: 'mission',
      skillSlug,
      xp: selected.xp,
    });
    setProfile(next);
    setJustCompleted(true);
    setReflection('');

    const sessionKey = 'msl_session_id';
    let sessionId = window.sessionStorage.getItem(sessionKey);
    if (!sessionId) {
      sessionId =
        typeof crypto !== 'undefined' && 'randomUUID' in crypto
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random()}`;
      window.sessionStorage.setItem(sessionKey, sessionId);
    }

    fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventType: 'cta_click',
        itemType: 'skill',
        itemSlug: `${skillSlug}:mission-${selected.level.toLowerCase()}`,
        path: window.location.pathname,
        sessionId,
      }),
      keepalive: true,
    }).catch(() => {});
  }

  return (
    <section id="skill-mission" className="scroll-mt-28 mb-12 overflow-hidden rounded-3xl border border-blue-200 bg-white shadow-sm" aria-labelledby={`${skillSlug}-mission-title`}>
      <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-violet-950 p-7 text-white sm:p-9">
          <div className="inline-flex items-center rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-blue-200">
            <Target className="mr-2 h-4 w-4" />
            Skill mission
          </div>
          <h2 id={`${skillSlug}-mission-title`} className="mt-4 text-3xl font-bold tracking-tight">
            Turn {skillName} into evidence.
          </h2>
          <p className="mt-3 leading-7 text-blue-100">
            Choose a challenge, apply it in a real situation, then record what changed. Points are awarded for practice—not page views.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold">
            <span className="rounded-full bg-white/10 px-3 py-2"><Sparkles className="mr-1.5 inline h-4 w-4" />{profile.totalXp} total XP</span>
            <span className="rounded-full bg-white/10 px-3 py-2"><Flame className="mr-1.5 inline h-4 w-4" />{profile.currentStreak}-day rhythm</span>
            <span className="rounded-full bg-white/10 px-3 py-2">{completedCount}/{missions.length} complete</span>
          </div>
        </div>

        <div className="p-7 sm:p-9">
          <div className="grid gap-2 sm:grid-cols-3" role="tablist" aria-label="Choose mission difficulty">
            {missions.map((mission, index) => {
              const complete = hasLearningActivity(profile, missionId(skillSlug, index));
              return (
                <button
                  key={mission.level}
                  type="button"
                  role="tab"
                  aria-selected={selectedIndex === index}
                  onClick={() => chooseMission(index)}
                  className={`rounded-2xl border p-3 text-left transition ${selectedIndex === index ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-blue-300'}`}
                >
                  <span className="flex items-center justify-between text-sm font-bold text-slate-950">
                    {mission.level}
                    {complete && <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
                  </span>
                  <span className="mt-1 block text-xs font-semibold text-amber-700">{mission.xp} XP</span>
                </button>
              );
            })}
          </div>

          <div className="mt-5 rounded-2xl bg-slate-50 p-5">
            <div className="text-xs font-bold uppercase tracking-[0.14em] text-blue-600">Your challenge</div>
            <p className="mt-2 leading-7 text-slate-800">{selected.action}</p>
          </div>

          {isComplete ? (
            <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
              <div className="flex items-center font-bold text-emerald-900"><CheckCircle2 className="mr-2 h-5 w-5" />Mission completed</div>
              <p className="mt-1 text-sm text-emerald-800">This reward is locked in. Try another level when you want a new challenge.</p>
            </div>
          ) : (
            <div className="mt-5">
              <label htmlFor={`${skillSlug}-mission-reflection`} className="text-sm font-bold text-slate-900">
                What did you try, and what happened?
              </label>
              <textarea
                id={`${skillSlug}-mission-reflection`}
                value={reflection}
                onChange={(event) => setReflection(event.target.value)}
                rows={3}
                placeholder="Write a brief reflection before you claim the completion…"
                className="mt-2 w-full rounded-2xl border border-slate-300 bg-white p-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-slate-500">Your reflection is checked for effort but is not stored.</p>
                <Button type="button" onClick={completeMission} disabled={reflection.trim().length < 20}>
                  Complete · earn {selected.xp} XP
                </Button>
              </div>
            </div>
          )}

          {(justCompleted || completedCount === missions.length) && nextSkill && (
            <div className="mt-5 border-t border-slate-200 pt-5">
              <div className="text-xs font-bold uppercase tracking-[0.14em] text-violet-700">Recommended next connection</div>
              <p className="mt-2 text-sm leading-6 text-slate-600">{nextSkill.reason}</p>
              <Link href={`/skills/${nextSkill.slug}`} className="mt-3 inline-flex items-center text-sm font-bold text-blue-700 hover:text-blue-900">
                Continue to {nextSkill.name} <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
