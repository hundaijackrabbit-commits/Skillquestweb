'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Award,
  BookOpenCheck,
  Brain,
  CheckCircle2,
  Flame,
  LockKeyhole,
  Medal,
  Route,
} from 'lucide-react';
import {
  getLearningAchievements,
  getLearningLevel,
  getLearningProfile,
  LEARNING_PROGRESS_EVENT,
  type LearningProfile,
} from '@/lib/learning-progress';

const initialProfile: LearningProfile = {
  version: 1,
  totalXp: 0,
  currentStreak: 0,
  longestStreak: 0,
  lastPracticeDate: null,
  activities: [],
};

const achievementIcons = {
  'first-rep': Medal,
  'skill-explorer': Route,
  'knowledge-builder': Brain,
  'sprint-finisher': BookOpenCheck,
  'evidence-maker': Award,
  'practice-rhythm': Flame,
};

export function LearningAchievements() {
  const [profile, setProfile] = useState(initialProfile);

  useEffect(() => {
    const refresh = () => setProfile(getLearningProfile());
    const frame = window.requestAnimationFrame(refresh);
    window.addEventListener(LEARNING_PROGRESS_EVENT, refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener(LEARNING_PROGRESS_EVENT, refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  const level = useMemo(() => getLearningLevel(profile.totalXp), [profile.totalXp]);
  const achievements = useMemo(() => getLearningAchievements(profile), [profile]);
  const earnedCount = achievements.filter((achievement) => achievement.earned).length;
  const levelProgress = level.nextXp
    ? Math.min(100, Math.round(((profile.totalXp - level.minXp) / (level.nextXp - level.minXp)) * 100))
    : 100;

  return (
    <section className="mb-14 overflow-hidden rounded-3xl border border-violet-200 bg-white shadow-sm" aria-labelledby="achievement-heading">
      <div className="grid lg:grid-cols-[0.7fr_1.3fr]">
        <div className="bg-gradient-to-br from-violet-950 via-indigo-950 to-slate-950 p-7 text-white sm:p-9">
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-violet-200">Your private rank</div>
          <div className="mt-3 flex items-center gap-3">
            <div className="rounded-2xl bg-white/10 p-3"><Medal className="h-7 w-7 text-amber-300" /></div>
            <div>
              <div className="text-sm font-semibold text-violet-200">Level {level.level}</div>
              <h2 id="achievement-heading" className="text-3xl font-bold">{level.name}</h2>
            </div>
          </div>
          <div className="mt-7 h-2.5 overflow-hidden rounded-full bg-white/15" aria-label={`${levelProgress}% progress to the next level`}>
            <div className="h-full rounded-full bg-gradient-to-r from-amber-300 to-fuchsia-400 transition-all" style={{ width: `${levelProgress}%` }} />
          </div>
          <p className="mt-3 text-sm text-violet-100">
            {level.nextXp ? `${level.nextXp - profile.totalXp} XP to the next level` : 'Highest current level reached'}
          </p>
          <p className="mt-6 text-sm leading-6 text-violet-200">Levels and achievements are private. They reward useful practice without ranking you against anyone else.</p>
        </div>

        <div className="p-7 sm:p-9">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-violet-700">Achievement shelf</div>
              <h3 className="mt-1 text-2xl font-bold text-slate-950">{earnedCount} of {achievements.length} unlocked</h3>
            </div>
            <span className="text-xs font-medium text-slate-500">Stored in this browser</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {achievements.map((achievement) => {
              const Icon = achievementIcons[achievement.id as keyof typeof achievementIcons] ?? Award;
              return (
                <div key={achievement.id} className={`rounded-2xl border p-4 ${achievement.earned ? 'border-emerald-200 bg-emerald-50' : 'border-slate-200 bg-slate-50'}`}>
                  <div className="flex items-center justify-between gap-3">
                    <div className={`rounded-xl p-2 ${achievement.earned ? 'bg-emerald-100 text-emerald-700' : 'bg-white text-slate-400'}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    {achievement.earned ? <CheckCircle2 className="h-5 w-5 text-emerald-600" /> : <LockKeyhole className="h-4 w-4 text-slate-400" />}
                  </div>
                  <div className="mt-3 font-bold text-slate-950">{achievement.name}</div>
                  <p className="mt-1 text-xs leading-5 text-slate-600">{achievement.description}</p>
                  <div className="mt-3 text-xs font-semibold text-slate-500">{achievement.current}/{achievement.target}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
