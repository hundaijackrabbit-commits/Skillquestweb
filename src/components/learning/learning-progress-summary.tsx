'use client';

import { useEffect, useState } from 'react';
import { Flame, Sparkles, Trophy } from 'lucide-react';
import {
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

export function LearningProgressSummary() {
  const [profile, setProfile] = useState(initialProfile);

  useEffect(() => {
    const refresh = () => setProfile(getLearningProfile());
    refresh();
    window.addEventListener(LEARNING_PROGRESS_EVENT, refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener(LEARNING_PROGRESS_EVENT, refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  return (
    <section className="mb-12 rounded-3xl border border-blue-200 bg-white p-5 shadow-sm sm:p-6" aria-label="Your learning progress">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-3 rounded-2xl bg-amber-50 p-4">
          <Sparkles className="h-6 w-6 text-amber-600" />
          <div>
            <div className="text-2xl font-bold text-slate-950">{profile.totalXp}</div>
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Practice XP</div>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl bg-orange-50 p-4">
          <Flame className="h-6 w-6 text-orange-600" />
          <div>
            <div className="text-2xl font-bold text-slate-950">{profile.currentStreak} days</div>
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Practice rhythm</div>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl bg-violet-50 p-4">
          <Trophy className="h-6 w-6 text-violet-600" />
          <div>
            <div className="text-2xl font-bold text-slate-950">{profile.activities.length}</div>
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Completed activities</div>
          </div>
        </div>
      </div>
      <p className="mt-4 text-xs leading-5 text-slate-500">
        XP is earned only for completed practice and retrieval checks. Your progress is stored in this browser.
      </p>
    </section>
  );
}

