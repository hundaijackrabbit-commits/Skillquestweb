'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Circle,
  Flame,
  Lightbulb,
  RotateCcw,
  Sparkles,
  Target,
  Trophy,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSupabase } from '@/components/providers/supabase-provider';
import { GamificationAccessGate } from '@/components/learning/gamification-access-gate';
import type { SkillCourse } from '@/lib/courses';
import {
  getLearningProfile,
  hasLearningActivity,
  recordLearningActivity,
  type LearningProfile,
} from '@/lib/learning-progress';

type Props = {
  course: SkillCourse;
  skillName: string;
  relatedSkillHref: string;
};

type ExperienceProps = Props & { userId: string };

function progressKey(skillSlug: string, userId: string) {
  return `msl_skill_sprint_${userId}_${skillSlug}`;
}

function recordCourseEvent(skillSlug: string, action: 'start' | 'complete') {
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
      itemSlug: `${skillSlug}:sprint-${action}`,
      path: window.location.pathname,
      sessionId,
    }),
    keepalive: true,
  }).catch(() => {});
}

export function CourseRunner({ course, skillName, relatedSkillHref }: Props) {
  const { user } = useSupabase();
  return (
    <GamificationAccessGate
      featureName={`${skillName} Skill Sprint`}
      description="Create an account to open the lesson rounds, complete workplace exercises, earn XP, and keep your sprint progress private."
    >
      {user ? <CourseRunnerExperience course={course} skillName={skillName} relatedSkillHref={relatedSkillHref} userId={user.id} /> : null}
    </GamificationAccessGate>
  );
}

function CourseRunnerExperience({ course, skillName, relatedSkillHref, userId }: ExperienceProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [learningProfile, setLearningProfile] = useState<LearningProfile>({
    version: 1,
    totalXp: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastPracticeDate: null,
    activities: [],
  });

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(progressKey(course.skillSlug, userId));
      if (stored) {
        const parsed = JSON.parse(stored) as { completed?: string[] };
        const valid = (parsed.completed ?? []).filter((id) =>
          course.lessons.some((lesson) => lesson.id === id),
        );
        setCompleted(valid);
        let profile = getLearningProfile(userId);
        for (const lessonId of valid) {
          profile = recordLearningActivity({
            id: `course:${course.skillSlug}:${lessonId}`,
            kind: 'course-lesson',
            skillSlug: course.skillSlug,
            xp: course.pointsPerLesson,
          }, userId);
        }
        setLearningProfile(profile);
        const firstIncomplete = course.lessons.findIndex((lesson) => !valid.includes(lesson.id));
        if (firstIncomplete >= 0) setCurrentIndex(firstIncomplete);
      } else {
        setLearningProfile(getLearningProfile(userId));
        recordCourseEvent(course.skillSlug, 'start');
      }
    } catch {
      window.localStorage.removeItem(progressKey(course.skillSlug, userId));
    } finally {
      setHasLoaded(true);
    }
  }, [course, userId]);

  const lesson = course.lessons[currentIndex];
  const isCorrect = selectedAnswer === lesson.quiz.correctIndex;
  const courseComplete = completed.length === course.lessons.length;
  const totalPoints = course.lessons.length * course.pointsPerLesson;
  const percent = Math.round((completed.length / course.lessons.length) * 100);

  const completedSet = useMemo(() => new Set(completed), [completed]);

  function chooseLesson(index: number) {
    setCurrentIndex(index);
    setSelectedAnswer(null);
  }

  function completeLesson() {
    if (!isCorrect) return;

    const nextCompleted = completedSet.has(lesson.id) ? completed : [...completed, lesson.id];
    setCompleted(nextCompleted);
    window.localStorage.setItem(
      progressKey(course.skillSlug, userId),
      JSON.stringify({ completed: nextCompleted, updatedAt: new Date().toISOString() }),
    );

    if (!completedSet.has(lesson.id)) {
      setLearningProfile(
        recordLearningActivity({
          id: `course:${course.skillSlug}:${lesson.id}`,
          kind: 'course-lesson',
          skillSlug: course.skillSlug,
          xp: course.pointsPerLesson,
        }, userId),
      );
    }

    const nextIndex = course.lessons.findIndex(
      (candidate, index) => index > currentIndex && !nextCompleted.includes(candidate.id),
    );

    if (nextCompleted.length === course.lessons.length) {
      recordCourseEvent(course.skillSlug, 'complete');
    } else if (nextIndex >= 0) {
      setCurrentIndex(nextIndex);
      setSelectedAnswer(null);
    }
  }

  function resetCourse() {
    window.localStorage.removeItem(progressKey(course.skillSlug, userId));
    setCompleted([]);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    recordCourseEvent(course.skillSlug, 'start');
  }

  if (!hasLoaded) {
    return <div className="h-96 animate-pulse rounded-3xl border bg-white" aria-label="Loading course" />;
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-28">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">Progress</div>
            <div className="mt-1 text-2xl font-bold text-slate-900">{percent}%</div>
          </div>
          <div className="rounded-2xl bg-amber-50 px-3 py-2 text-right">
            <div className="text-xs font-medium text-amber-700">Total practice XP</div>
            <div className="font-bold text-amber-900">{learningProfile.totalXp} XP</div>
          </div>
        </div>

        <div className="mb-5 flex items-center justify-between rounded-2xl bg-orange-50 px-3 py-2 text-sm">
          <span className="inline-flex items-center font-semibold text-orange-900"><Flame className="mr-1.5 h-4 w-4" />Practice rhythm</span>
          <span className="font-bold text-orange-900">{learningProfile.currentStreak} days</span>
        </div>

        <div className="mb-6 h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-600 to-violet-600 transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>

        <ol className="space-y-2">
          {course.lessons.map((candidate, index) => {
            const isDone = completedSet.has(candidate.id);
            const isCurrent = index === currentIndex;
            return (
              <li key={candidate.id}>
                <button
                  type="button"
                  onClick={() => chooseLesson(index)}
                  className={`flex w-full items-start gap-3 rounded-2xl p-3 text-left transition ${
                    isCurrent ? 'bg-blue-50 text-blue-950' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-green-600" />
                  ) : (
                    <Circle className={`mt-0.5 h-5 w-5 flex-none ${isCurrent ? 'text-blue-600' : 'text-slate-300'}`} />
                  )}
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-wide opacity-60">
                      Round {index + 1}
                    </span>
                    <span className="mt-0.5 block text-sm font-semibold">{candidate.title}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        <button
          type="button"
          onClick={resetCourse}
          className="mt-6 inline-flex items-center text-xs font-medium text-slate-500 hover:text-slate-900"
        >
          <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
          Reset this sprint
        </button>
      </aside>

      <main className="min-w-0">
        {courseComplete && completedSet.has(lesson.id) && (
          <div className="mb-6 rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-cyan-50 p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-emerald-600 p-3 text-white">
                  <Trophy className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-emerald-700">Sprint complete · {totalPoints} XP</div>
                  <h2 className="mt-1 text-2xl font-bold text-slate-950">You completed {course.title}</h2>
                  <p className="mt-1 text-sm text-slate-600">
                    Revisit the full {skillName} guide or reset the sprint later for retrieval practice.
                  </p>
                </div>
              </div>
              <Link href={relatedSkillHref}>
                <Button className="w-full sm:w-auto">
                  Return to skill guide <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        )}

        <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 bg-gradient-to-r from-slate-950 to-blue-950 p-7 text-white sm:p-9">
            <div className="mb-4 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-blue-200">
              <span>Round {currentIndex + 1} of {course.lessons.length}</span>
              <span aria-hidden>·</span>
              <span>{course.pointsPerLesson} XP</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight">{lesson.title}</h2>
            <p className="mt-3 max-w-2xl text-blue-100">{lesson.objective}</p>
          </div>

          <div className="space-y-8 p-7 sm:p-9">
            <section>
              <h3 className="flex items-center text-lg font-bold text-slate-900">
                <Lightbulb className="mr-2 h-5 w-5 text-amber-500" />
                Understand it
              </h3>
              <p className="mt-3 leading-7 text-slate-700">{lesson.concept}</p>
              <div className="mt-4 rounded-2xl border-l-4 border-blue-500 bg-blue-50 p-5">
                <div className="text-xs font-bold uppercase tracking-wide text-blue-700">Example</div>
                <p className="mt-2 leading-7 text-blue-950">{lesson.example}</p>
              </div>
            </section>

            <section className="rounded-2xl bg-violet-50 p-5">
              <h3 className="flex items-center font-bold text-violet-950">
                <Target className="mr-2 h-5 w-5 text-violet-600" />
                Try it at work
              </h3>
              <p className="mt-2 leading-7 text-violet-900">{lesson.practice}</p>
            </section>

            <section>
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Retrieval check</div>
                  <h3 className="mt-1 text-xl font-bold text-slate-900">{lesson.quiz.question}</h3>
                </div>
                <Sparkles className="hidden h-6 w-6 text-blue-600 sm:block" />
              </div>

              <div className="space-y-3">
                {lesson.quiz.options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const showCorrect = selectedAnswer !== null && index === lesson.quiz.correctIndex;
                  const showIncorrect = isSelected && !isCorrect;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setSelectedAnswer(index)}
                      className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition ${
                        showCorrect
                          ? 'border-green-300 bg-green-50 text-green-950'
                          : showIncorrect
                            ? 'border-red-300 bg-red-50 text-red-950'
                            : isSelected
                              ? 'border-blue-400 bg-blue-50'
                              : 'border-slate-200 hover:border-blue-300 hover:bg-blue-50/40'
                      }`}
                    >
                      <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full border bg-white text-xs font-bold">
                        {showCorrect ? <Check className="h-4 w-4 text-green-600" /> : String.fromCharCode(65 + index)}
                      </span>
                      <span className="pt-0.5 font-medium">{option}</span>
                    </button>
                  );
                })}
              </div>

              {selectedAnswer !== null && (
                <div
                  className={`mt-5 rounded-2xl p-4 ${
                    isCorrect ? 'bg-green-50 text-green-950' : 'bg-amber-50 text-amber-950'
                  }`}
                  role="status"
                >
                  <div className="font-bold">{isCorrect ? 'Correct—good judgment.' : 'Not quite. Compare the options once more.'}</div>
                  <p className="mt-1 text-sm leading-6">{lesson.quiz.explanation}</p>
                </div>
              )}

              <div className="mt-6 flex justify-end">
                <Button onClick={completeLesson} disabled={!isCorrect} size="lg">
                  {completedSet.has(lesson.id)
                    ? 'Continue'
                    : currentIndex === course.lessons.length - 1
                      ? 'Complete sprint'
                      : hasLearningActivity(learningProfile, `course:${course.skillSlug}:${lesson.id}`)
                        ? 'Complete practice and continue'
                        : `Earn ${course.pointsPerLesson} XP and continue`}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </section>
          </div>
        </article>
      </main>
    </div>
  );
}
