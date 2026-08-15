'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  Check,
  ChevronLeft,
  Compass,
  Heart,
  Layers3,
  Loader2,
  LogOut,
  Pencil,
  Route,
  Sparkles,
  Target,
  UserRound,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LearningAchievements } from '@/components/learning/learning-achievements';
import { LearningProgressSummary } from '@/components/learning/learning-progress-summary';
import { useSupabase } from '@/components/providers/supabase-provider';
import {
  CAREER_GOAL_OPTIONS,
  CAREER_INTEREST_OPTIONS,
  STRENGTH_OPTIONS,
  WORK_STYLE_OPTIONS,
  type CareerGoalId,
  type CareerInterestId,
  type ProfileAssessment,
  type ProfileFitMap,
  type StrengthId,
  type WorkStyleId,
} from '@/lib/profile-fit';
import { saveProfileAssessment } from './actions';

type IndustryOption = {
  slug: string;
  name: string;
  description: string;
};

type SavedItem = {
  slug: string;
  name: string;
  summary: string;
  meta: string;
};

type Props = {
  member: {
    email: string;
    createdAt: string;
  };
  profile: {
    name: string;
    careerInterests: CareerInterestId[];
    selectedIndustries: string[];
    assessment: ProfileAssessment | null;
  };
  industries: IndustryOption[];
  fitMap: ProfileFitMap;
  savedSkills: SavedItem[];
  savedCareers: SavedItem[];
};

type AssessmentDraft = {
  name: string;
  careerInterests: CareerInterestId[];
  selectedIndustries: string[];
  goal: CareerGoalId;
  workStyles: WorkStyleId[];
  strengths: StrengthId[];
};

const steps = ['Interests', 'Goal', 'Work style', 'Strengths', 'Industries'] as const;

function toggleLimited<T extends string>(values: T[], value: T, limit: number) {
  if (values.includes(value)) return values.filter((item) => item !== value);
  return values.length < limit ? [...values, value] : values;
}

function SelectionTile({
  selected,
  disabled,
  label,
  description,
  onClick,
}: {
  selected: boolean;
  disabled?: boolean;
  label: string;
  description?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      className={`relative rounded-2xl border p-4 text-left transition focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-45 ${
        selected
          ? 'border-violet-500 bg-violet-50 text-violet-950 shadow-sm'
          : 'border-slate-200 bg-white text-slate-800 hover:border-violet-300 hover:bg-violet-50/40'
      }`}
    >
      <span className="block pr-7 font-bold">{label}</span>
      {description && <span className="mt-1 block text-sm leading-6 text-slate-600">{description}</span>}
      <span className={`absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full border ${selected ? 'border-violet-600 bg-violet-600 text-white' : 'border-slate-300 bg-white text-transparent'}`}>
        <Check className="h-3.5 w-3.5" />
      </span>
    </button>
  );
}

function RecommendationCard({ item }: { item: ProfileFitMap['skills'][number] }) {
  return (
    <Link
      href={item.href}
      className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Badge className={item.signal === 'Strong fit signal' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'}>
          {item.signal}
        </Badge>
        {item.saved && <span className="inline-flex items-center text-xs font-bold text-rose-600"><Heart className="mr-1 h-3.5 w-3.5 fill-current" />Saved</span>}
      </div>
      <h3 className="mt-4 text-lg font-bold text-slate-950 transition group-hover:text-blue-700">{item.name}</h3>
      <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{item.summary}</p>
      <p className="mt-4 rounded-xl bg-slate-50 p-3 text-xs leading-5 text-slate-700"><strong>Why it surfaced:</strong> {item.reason}</p>
      <span className="mt-auto inline-flex items-center pt-4 text-sm font-bold text-blue-700">Explore <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
    </Link>
  );
}

function SavedCollection({
  title,
  items,
  emptyTitle,
  emptyCopy,
  browseHref,
  browseLabel,
  itemPrefix,
}: {
  title: string;
  items: SavedItem[];
  emptyTitle: string;
  emptyCopy: string;
  browseHref: string;
  browseLabel: string;
  itemPrefix: 'skills' | 'careers';
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-xl font-bold text-slate-950">{title}</h3>
        <Badge variant="outline">{items.length}</Badge>
      </div>
      {items.length > 0 ? (
        <div className="mt-5 space-y-3">
          {items.slice(0, 6).map((item) => (
            <Link key={item.slug} href={`/${itemPrefix}/${item.slug}`} className="group block rounded-2xl border border-slate-200 p-4 transition hover:border-blue-300 hover:bg-blue-50/30">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-bold text-slate-950 group-hover:text-blue-700">{item.name}</div>
                  <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-600">{item.summary}</p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-400">{item.meta}</p>
                </div>
                <ArrowRight className="mt-1 h-4 w-4 flex-none text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-blue-600" />
              </div>
            </Link>
          ))}
          {items.length > 6 && <p className="pt-1 text-center text-xs font-medium text-slate-500">Showing 6 of {items.length} saved items</p>}
        </div>
      ) : (
        <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
          <Heart className="mx-auto h-7 w-7 text-slate-400" />
          <h4 className="mt-3 font-bold text-slate-900">{emptyTitle}</h4>
          <p className="mt-1 text-sm leading-6 text-slate-600">{emptyCopy}</p>
        </div>
      )}
      <Link href={browseHref} className="mt-4 inline-flex items-center text-sm font-bold text-blue-700 hover:text-blue-900">
        {browseLabel}<ArrowRight className="ml-1.5 h-4 w-4" />
      </Link>
    </div>
  );
}

export function PersonalDashboardClient({ member, profile, industries, fitMap, savedSkills, savedCareers }: Props) {
  const { signOut } = useSupabase();
  const [editing, setEditing] = useState(!profile.assessment);
  const [step, setStep] = useState(0);
  const [message, setMessage] = useState('');
  const [isPending, startTransition] = useTransition();
  const [draft, setDraft] = useState<AssessmentDraft>({
    name: profile.name,
    careerInterests: profile.careerInterests,
    selectedIndustries: profile.selectedIndustries,
    goal: profile.assessment?.goal ?? 'explore',
    workStyles: profile.assessment?.workStyles ?? [],
    strengths: profile.assessment?.strengths ?? [],
  });

  const initials = profile.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || member.email[0]?.toUpperCase() || 'M';

  const canContinue =
    step === 0
      ? draft.careerInterests.length > 0
      : step === 1
        ? Boolean(draft.goal)
        : step === 2
          ? draft.workStyles.length > 0
          : step === 3
            ? draft.strengths.length > 0
            : true;

  function submitAssessment() {
    setMessage('');
    startTransition(async () => {
      const result = await saveProfileAssessment(draft);
      setMessage(result.message);
      if (result.ok) setEditing(false);
    });
  }

  async function handleSignOut() {
    await signOut();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-white pb-20">
      <section className="border-b border-slate-200 bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-12">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-400 to-violet-500 text-xl font-black shadow-lg shadow-violet-950/40">{initials}</div>
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">Personal learning profile</div>
                <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">{profile.name}</h1>
                <p className="mt-1 text-sm text-slate-300">Member since {new Date(member.createdAt).toLocaleDateString('en-CA', { month: 'long', year: 'numeric' })}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button type="button" variant="outline" className="border-slate-600 bg-transparent text-white hover:bg-slate-800" onClick={() => { setEditing(true); setStep(0); document.getElementById('profile-assessment')?.scrollIntoView({ behavior: 'smooth' }); }}>
                <Pencil className="mr-2 h-4 w-4" />Edit fit profile
              </Button>
              <Button type="button" variant="ghost" className="text-slate-200 hover:bg-slate-800 hover:text-white" onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />Sign out
              </Button>
            </div>
          </div>
        </div>
      </section>

      <nav className="sticky top-16 z-20 border-b border-slate-200 bg-white/95 backdrop-blur" aria-label="Dashboard sections">
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-6 py-2 lg:px-8">
          {[
            ['fit-map', 'Fit map'],
            ['favourites', 'Favourites'],
            ['practice', 'Practice'],
            ['profile-assessment', 'Profile'],
          ].map(([href, label]) => (
            <a key={href} href={`#${href}`} className="whitespace-nowrap rounded-lg px-3 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100 hover:text-slate-950">{label}</a>
          ))}
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-6 pt-10 lg:px-8">
        <section className="grid gap-4 sm:grid-cols-3" aria-label="Profile overview">
          <a href="#favourites" className="rounded-2xl border border-blue-200 bg-blue-50 p-5 transition hover:border-blue-400">
            <Heart className="h-5 w-5 text-blue-700" />
            <div className="mt-3 text-3xl font-black text-slate-950">{savedSkills.length + savedCareers.length}</div>
            <div className="mt-1 text-sm font-semibold text-slate-600">Saved favourites</div>
          </a>
          <a href="#fit-map" className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 transition hover:border-emerald-400">
            <Compass className="h-5 w-5 text-emerald-700" />
            <div className="mt-3 text-3xl font-black text-slate-950">{profile.assessment ? fitMap.careers.length : 0}</div>
            <div className="mt-1 text-sm font-semibold text-slate-600">Career fit signals</div>
          </a>
          <a href="#practice" className="rounded-2xl border border-violet-200 bg-violet-50 p-5 transition hover:border-violet-400">
            <Layers3 className="h-5 w-5 text-violet-700" />
            <div className="mt-3 text-lg font-black text-slate-950">Practice hub</div>
            <div className="mt-2 inline-flex items-center text-sm font-bold text-violet-700">View XP and achievements<ArrowRight className="ml-1.5 h-4 w-4" /></div>
          </a>
        </section>

        <section id="profile-assessment" className="scroll-mt-36 pt-12" aria-labelledby="assessment-title">
          <div className="overflow-hidden rounded-3xl border border-violet-200 bg-white shadow-sm">
            <div className="bg-gradient-to-r from-violet-950 via-indigo-950 to-blue-950 p-7 text-white sm:p-9">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="max-w-3xl">
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-violet-200">Smart profile</div>
                  <h2 id="assessment-title" className="mt-2 text-3xl font-bold">Build an explainable fit map</h2>
                  <p className="mt-3 leading-7 text-violet-100">Tell us what draws you in, how you prefer to work, and what you want next. Modern Skill Lab connects those signals to its own industries, career profiles, and skill relationships.</p>
                </div>
                {profile.assessment && !editing && (
                  <Button type="button" className="flex-none bg-white text-violet-950 hover:bg-violet-50" onClick={() => { setEditing(true); setStep(0); }}>
                    <Pencil className="mr-2 h-4 w-4" />Update answers
                  </Button>
                )}
              </div>
            </div>

            {editing ? (
              <div className="p-6 sm:p-9">
                <div className="flex items-center justify-between gap-4">
                  <div className="text-sm font-bold text-slate-900">Step {step + 1} of {steps.length}: {steps[step]}</div>
                  <div className="text-xs font-medium text-slate-500">Choose up to 3 where noted</div>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100" aria-label={`${Math.round(((step + 1) / steps.length) * 100)}% complete`}>
                  <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-600 transition-all" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
                </div>

                <div className="mt-8">
                  {step === 0 && (
                    <div>
                      <h3 className="text-2xl font-bold text-slate-950">What kind of work pulls you in?</h3>
                      <p className="mt-2 text-slate-600">Choose one to three. These are interest signals, not permanent labels.</p>
                      <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                        {CAREER_INTEREST_OPTIONS.map((option) => (
                          <SelectionTile key={option.id} selected={draft.careerInterests.includes(option.id)} disabled={draft.careerInterests.length >= 3 && !draft.careerInterests.includes(option.id)} label={option.label} description={option.description} onClick={() => setDraft((current) => ({ ...current, careerInterests: toggleLimited(current.careerInterests, option.id, 3) }))} />
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 1 && (
                    <div>
                      <h3 className="text-2xl font-bold text-slate-950">What are you optimizing for now?</h3>
                      <p className="mt-2 text-slate-600">Pick the goal that should shape your first recommendations.</p>
                      <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                        {CAREER_GOAL_OPTIONS.map((option) => (
                          <SelectionTile key={option.id} selected={draft.goal === option.id} label={option.label} onClick={() => setDraft((current) => ({ ...current, goal: option.id }))} />
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <h3 className="text-2xl font-bold text-slate-950">How do you prefer to work?</h3>
                      <p className="mt-2 text-slate-600">Select up to three environments that help you do good work.</p>
                      <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                        {WORK_STYLE_OPTIONS.map((option) => (
                          <SelectionTile key={option.id} selected={draft.workStyles.includes(option.id)} disabled={draft.workStyles.length >= 3 && !draft.workStyles.includes(option.id)} label={option.label} description={option.description} onClick={() => setDraft((current) => ({ ...current, workStyles: toggleLimited(current.workStyles, option.id, 3) }))} />
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div>
                      <h3 className="text-2xl font-bold text-slate-950">What do people already rely on you for?</h3>
                      <p className="mt-2 text-slate-600">Choose up to three strengths. Recommendations can build from them instead of treating you like a blank slate.</p>
                      <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                        {STRENGTH_OPTIONS.map((option) => (
                          <SelectionTile key={option.id} selected={draft.strengths.includes(option.id)} disabled={draft.strengths.length >= 3 && !draft.strengths.includes(option.id)} label={option.label} onClick={() => setDraft((current) => ({ ...current, strengths: toggleLimited(current.strengths, option.id, 3) }))} />
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div>
                      <h3 className="text-2xl font-bold text-slate-950">Which industries are you curious about?</h3>
                      <p className="mt-2 text-slate-600">This is optional. Choose up to three, or let your other answers surface sectors to explore.</p>
                      <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                        {industries.map((industry) => (
                          <SelectionTile key={industry.slug} selected={draft.selectedIndustries.includes(industry.slug)} disabled={draft.selectedIndustries.length >= 3 && !draft.selectedIndustries.includes(industry.slug)} label={industry.name} description={industry.description} onClick={() => setDraft((current) => ({ ...current, selectedIndustries: toggleLimited(current.selectedIndustries, industry.slug, 3) }))} />
                        ))}
                      </div>
                      <label className="mt-7 block max-w-md text-sm font-bold text-slate-800">
                        Display name
                        <input value={draft.name} onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))} minLength={2} maxLength={80} required className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-200" />
                      </label>
                    </div>
                  )}
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-6">
                  <Button type="button" variant="outline" disabled={step === 0 || isPending} onClick={() => setStep((current) => Math.max(0, current - 1))}>
                    <ChevronLeft className="mr-2 h-4 w-4" />Back
                  </Button>
                  <div className="flex items-center gap-3">
                    {profile.assessment && <Button type="button" variant="ghost" disabled={isPending} onClick={() => setEditing(false)}>Cancel</Button>}
                    {step < steps.length - 1 ? (
                      <Button type="button" disabled={!canContinue || isPending} onClick={() => setStep((current) => Math.min(steps.length - 1, current + 1))}>Continue<ArrowRight className="ml-2 h-4 w-4" /></Button>
                    ) : (
                      <Button type="button" disabled={!canContinue || draft.name.trim().length < 2 || isPending} onClick={submitAssessment}>
                        {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                        {isPending ? 'Building fit map…' : 'Build my fit map'}
                      </Button>
                    )}
                  </div>
                </div>
                {message && <p className={`mt-4 rounded-xl p-3 text-sm font-medium ${message.includes('updated') ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-900'}`} role="status">{message}</p>}
              </div>
            ) : (
              <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                <div>
                  <div className="inline-flex items-center font-bold text-emerald-700"><Check className="mr-2 h-4 w-4" />Profile assessment complete</div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">Your recommendations explain which profile signals caused each match. Revisit the assessment whenever your direction changes.</p>
                </div>
                <a href="#fit-map" className="inline-flex flex-none items-center text-sm font-bold text-blue-700 hover:text-blue-900">See recommendations<ArrowRight className="ml-1.5 h-4 w-4" /></a>
              </div>
            )}
          </div>
        </section>

        <section id="fit-map" className="scroll-mt-36 pt-14" aria-labelledby="fit-map-title">
          <div className="max-w-3xl">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">Personal recommendations</div>
            <h2 id="fit-map-title" className="mt-2 text-3xl font-bold text-slate-950">Your industry, career, and skill fit map</h2>
            <p className="mt-3 leading-7 text-slate-600">This is an exploration aid, not an aptitude verdict. Every result includes the signal that moved it upward.</p>
          </div>

          {!profile.assessment ? (
            <div className="mt-7 rounded-3xl border border-dashed border-violet-300 bg-violet-50 p-8 text-center">
              <Compass className="mx-auto h-10 w-10 text-violet-500" />
              <h3 className="mt-4 text-xl font-bold text-slate-950">Your fit map needs a few signals</h3>
              <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-600">Complete the short profile above to connect your interests, goal, work style, and strengths with Modern Skill Lab content.</p>
              <a href="#profile-assessment" className="mt-5 inline-flex items-center rounded-xl bg-violet-700 px-5 py-3 text-sm font-bold text-white hover:bg-violet-800">Start the profile<ArrowRight className="ml-2 h-4 w-4" /></a>
            </div>
          ) : (
            <div className="mt-8 space-y-10">
              <div>
                <div className="mb-4 flex items-center gap-2"><BriefcaseBusiness className="h-5 w-5 text-emerald-700" /><h3 className="text-xl font-bold text-slate-950">Industries to investigate</h3></div>
                <div className="grid gap-4 md:grid-cols-3">{fitMap.industries.map((item) => <RecommendationCard key={item.slug} item={item} />)}</div>
              </div>
              <div>
                <div className="mb-4 flex items-center gap-2"><Target className="h-5 w-5 text-blue-700" /><h3 className="text-xl font-bold text-slate-950">Career directions</h3></div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{fitMap.careers.map((item) => <RecommendationCard key={item.slug} item={item} />)}</div>
              </div>
              <div>
                <div className="mb-4 flex items-center gap-2"><BookOpen className="h-5 w-5 text-violet-700" /><h3 className="text-xl font-bold text-slate-950">Skills to test next</h3></div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{fitMap.skills.map((item) => <RecommendationCard key={item.slug} item={item} />)}</div>
              </div>
            </div>
          )}
        </section>

        <section id="favourites" className="scroll-mt-36 pt-16" aria-labelledby="favourites-title">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-rose-700">Your library</div>
              <h2 id="favourites-title" className="mt-2 text-3xl font-bold text-slate-950">Favourites in one place</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-600">Save a skill or career from its profile and it will appear here for quick return.</p>
          </div>
          <div className="mt-7 grid gap-6 lg:grid-cols-2">
            <SavedCollection title="Saved skills" items={savedSkills} emptyTitle="No favourite skills yet" emptyCopy="Save useful skills as you explore, then return to them here." browseHref="/skills" browseLabel="Browse skills" itemPrefix="skills" />
            <SavedCollection title="Saved careers" items={savedCareers} emptyTitle="No favourite careers yet" emptyCopy="Use the Save Career control on a career profile to build your shortlist." browseHref="/careers" browseLabel="Browse careers" itemPrefix="careers" />
          </div>
        </section>

        <section id="practice" className="scroll-mt-36 pt-16" aria-labelledby="practice-title">
          <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-violet-700">Practice record</div>
              <h2 id="practice-title" className="mt-2 text-3xl font-bold text-slate-950">Progress, rhythm, and achievements</h2>
            </div>
            <Link href="/learn" className="inline-flex items-center text-sm font-bold text-violet-700 hover:text-violet-900">Open Practice Lab<ArrowRight className="ml-1.5 h-4 w-4" /></Link>
          </div>
          <LearningProgressSummary />
          <LearningAchievements />
        </section>

        <section className="rounded-3xl bg-slate-950 p-7 text-white sm:p-9" aria-labelledby="quick-links-title">
          <h2 id="quick-links-title" className="text-2xl font-bold">Go somewhere useful</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {[
              ['/skills', BookOpen, 'Skill repository'],
              ['/careers', BriefcaseBusiness, 'Career profiles'],
              ['/industries', Compass, 'Industry guides'],
              ['/paths', Route, 'Learning paths'],
              ['/learn', Sparkles, 'Practice Lab'],
            ].map(([href, Icon, label]) => (
              <Link key={href as string} href={href as string} className="flex items-center rounded-2xl border border-white/15 bg-white/5 p-4 text-sm font-bold text-slate-100 transition hover:border-blue-300 hover:bg-white/10">
                <Icon className="mr-3 h-5 w-5 text-blue-300" />{label as string}
              </Link>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-2 text-xs text-slate-400"><UserRound className="h-4 w-4" />Signed in as {member.email}</div>
        </section>
      </main>
    </div>
  );
}
