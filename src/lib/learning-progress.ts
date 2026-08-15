export type LearningActivityKind = 'mission' | 'course-lesson' | 'knowledge-check';

export type LearningActivity = {
  id: string;
  kind: LearningActivityKind;
  skillSlug: string;
  xp: number;
  completedAt: string;
};

export type LearningProfile = {
  version: 1;
  totalXp: number;
  currentStreak: number;
  longestStreak: number;
  lastPracticeDate: string | null;
  activities: LearningActivity[];
};

export type LearningLevel = {
  level: number;
  name: string;
  minXp: number;
  nextXp: number | null;
};

export type LearningAchievement = {
  id: string;
  name: string;
  description: string;
  current: number;
  target: number;
  earned: boolean;
};

const STORAGE_KEY = 'msl_learning_profile_v1';
export const LEARNING_PROGRESS_EVENT = 'msl:learning-progress';

const emptyProfile: LearningProfile = {
  version: 1,
  totalXp: 0,
  currentStreak: 0,
  longestStreak: 0,
  lastPracticeDate: null,
  activities: [],
};

function localDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function daysBetween(left: string, right: string) {
  const [leftYear, leftMonth, leftDay] = left.split('-').map(Number);
  const [rightYear, rightMonth, rightDay] = right.split('-').map(Number);
  const leftUtc = Date.UTC(leftYear, leftMonth - 1, leftDay);
  const rightUtc = Date.UTC(rightYear, rightMonth - 1, rightDay);
  return Math.round((rightUtc - leftUtc) / 86_400_000);
}

function normalizeProfile(value: Partial<LearningProfile> | null): LearningProfile {
  const activities = Array.isArray(value?.activities)
    ? value.activities.filter(
        (activity): activity is LearningActivity =>
          Boolean(
            activity &&
              typeof activity.id === 'string' &&
              typeof activity.skillSlug === 'string' &&
              typeof activity.xp === 'number' &&
              typeof activity.completedAt === 'string',
          ),
      )
    : [];
  const totalXp = activities.reduce((total, activity) => total + activity.xp, 0);
  const today = localDateKey();
  const lastPracticeDate = typeof value?.lastPracticeDate === 'string' ? value.lastPracticeDate : null;
  const storedStreak = Math.max(0, Number(value?.currentStreak) || 0);
  const currentStreak =
    lastPracticeDate && daysBetween(lastPracticeDate, today) <= 1 ? storedStreak : 0;

  return {
    version: 1,
    totalXp,
    currentStreak,
    longestStreak: Math.max(currentStreak, Number(value?.longestStreak) || 0),
    lastPracticeDate,
    activities,
  };
}

export function getLearningProfile(): LearningProfile {
  if (typeof window === 'undefined') return emptyProfile;

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return normalizeProfile(stored ? (JSON.parse(stored) as Partial<LearningProfile>) : null);
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return emptyProfile;
  }
}

type RecordActivityInput = Omit<LearningActivity, 'completedAt'>;

export function recordLearningActivity(input: RecordActivityInput): LearningProfile {
  const current = getLearningProfile();
  if (typeof window === 'undefined' || current.activities.some((activity) => activity.id === input.id)) {
    return current;
  }

  const now = new Date();
  const today = localDateKey(now);
  let currentStreak = current.currentStreak;

  if (current.lastPracticeDate !== today) {
    currentStreak =
      current.lastPracticeDate && daysBetween(current.lastPracticeDate, today) === 1
        ? current.currentStreak + 1
        : 1;
  }

  const next: LearningProfile = {
    version: 1,
    totalXp: current.totalXp + input.xp,
    currentStreak,
    longestStreak: Math.max(current.longestStreak, currentStreak),
    lastPracticeDate: today,
    activities: [...current.activities, { ...input, completedAt: now.toISOString() }],
  };

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent(LEARNING_PROGRESS_EVENT, { detail: next }));
  return next;
}

export function hasLearningActivity(profile: LearningProfile, activityId: string) {
  return profile.activities.some((activity) => activity.id === activityId);
}

const learningLevels = [
  { name: 'Starter', minXp: 0 },
  { name: 'Explorer', minXp: 100 },
  { name: 'Builder', minXp: 250 },
  { name: 'Practitioner', minXp: 500 },
  { name: 'Pathfinder', minXp: 900 },
] as const;

export function getLearningLevel(totalXp: number): LearningLevel {
  const levelIndex = learningLevels.findLastIndex((level) => totalXp >= level.minXp);
  const safeIndex = Math.max(0, levelIndex);
  const current = learningLevels[safeIndex];
  return {
    level: safeIndex + 1,
    name: current.name,
    minXp: current.minXp,
    nextXp: learningLevels[safeIndex + 1]?.minXp ?? null,
  };
}

export function getLearningAchievements(profile: LearningProfile): LearningAchievement[] {
  const uniqueSkills = new Set(profile.activities.map((activity) => activity.skillSlug)).size;
  const knowledgeChecks = profile.activities.filter((activity) => activity.kind === 'knowledge-check').length;
  const courseLessons = profile.activities.filter((activity) => activity.kind === 'course-lesson').length;
  const missions = profile.activities.filter((activity) => activity.kind === 'mission').length;

  const achievements = [
    {
      id: 'first-rep',
      name: 'First Rep',
      description: 'Complete your first active-practice item.',
      current: profile.activities.length,
      target: 1,
    },
    {
      id: 'skill-explorer',
      name: 'Skill Explorer',
      description: 'Practice across three different skills.',
      current: uniqueSkills,
      target: 3,
    },
    {
      id: 'knowledge-builder',
      name: 'Knowledge Builder',
      description: 'Complete five retrieval checks.',
      current: knowledgeChecks,
      target: 5,
    },
    {
      id: 'sprint-finisher',
      name: 'Sprint Finisher',
      description: 'Complete three Skill Sprint rounds.',
      current: courseLessons,
      target: 3,
    },
    {
      id: 'evidence-maker',
      name: 'Evidence Maker',
      description: 'Complete three real-world skill missions.',
      current: missions,
      target: 3,
    },
    {
      id: 'practice-rhythm',
      name: 'Practice Rhythm',
      description: 'Reach a three-day practice streak.',
      current: profile.longestStreak,
      target: 3,
    },
  ];

  return achievements.map((achievement) => ({
    ...achievement,
    current: Math.min(achievement.current, achievement.target),
    earned: achievement.current >= achievement.target,
  }));
}
