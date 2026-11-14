'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ClipboardCheck, Copy } from 'lucide-react';
import { useSupabase } from '@/components/providers/supabase-provider';
import { ContextualLearningHelp } from '@/components/learning/contextual-learning-help';
import type { GuidedWorkshop } from '@/lib/workshops';
import { getLearningProfile, hasLearningActivity, recordLearningActivity, LEARNING_PROGRESS_EVENT } from '@/lib/learning-progress';

type WorkshopDraft = { answers: string[]; checked: boolean[] };
const emptyDraft = (): WorkshopDraft => ({ answers: ['', '', ''], checked: [false, false, false, false] });
const draftKey = (userId: string, slug: string) => `msl_workshop_v1:${userId}:${slug}`;
const activityId = (slug: string) => `workshop:${slug}:v1`;

export function WorkshopRunner({ workshop }: { workshop: GuidedWorkshop }) {
  const { user } = useSupabase();
  const userId = user?.id;
  const [draft, setDraft] = useState<WorkshopDraft>(emptyDraft);
  const [loaded, setLoaded] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!userId) return;
    let next = emptyDraft();
    try {
      const stored = window.localStorage.getItem(draftKey(userId, workshop.slug));
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<WorkshopDraft>;
        next = {
          answers: [0, 1, 2].map((i) => typeof parsed.answers?.[i] === 'string' ? parsed.answers[i] : ''),
          checked: [0, 1, 2, 3].map((i) => parsed.checked?.[i] === true),
        };
      }
    } catch { /* Storage can be unavailable or a previous draft malformed. */ }
    setDraft(next);
    try { setCompleted(hasLearningActivity(getLearningProfile(userId), activityId(workshop.slug))); }
    catch { setCompleted(false); }
    setMessage('');
    setLoaded(true);
  }, [userId, workshop.slug]);

  useEffect(() => {
    if (!userId || !loaded) return;
    const timeout = window.setTimeout(() => {
      try { window.localStorage.setItem(draftKey(userId, workshop.slug), JSON.stringify(draft)); }
      catch { setMessage('This browser could not save your draft. Copy the worksheet before leaving.'); }
    }, 400);
    return () => window.clearTimeout(timeout);
  }, [draft, loaded, userId, workshop.slug]);

  useEffect(() => {
    if (!userId) return;
    const sync = () => {
      try { setCompleted(hasLearningActivity(getLearningProfile(userId), activityId(workshop.slug))); }
      catch { /* Keep the previous state on storage failure. */ }
    };
    window.addEventListener(LEARNING_PROGRESS_EVENT, sync);
    return () => window.removeEventListener(LEARNING_PROGRESS_EVENT, sync);
  }, [userId, workshop.slug]);

  const ready = draft.answers.every((answer) => answer.trim().length >= 40) && draft.checked.every(Boolean);
  const filled = draft.answers.filter((answer) => answer.trim().length >= 40).length;
  const worksheet = () => [
    workshop.title,
    workshop.deliverable,
    ...workshop.steps.flatMap((step, index) => [`\n${index + 1}. ${step.title}\n`, draft.answers[index]]),
    '\nSelf-review:',
    ...workshop.criteria.map((criterion, index) => `${draft.checked[index] ? '[x]' : '[ ]'} ${criterion}`),
    '\nRevisit: ' + workshop.revisit,
  ].join('\n');

  async function copyWorksheet() {
    try {
      await navigator.clipboard.writeText(worksheet());
      setMessage('Worksheet copied. Keep it with your work samples or notes.');
    } catch {
      setMessage('Copying is unavailable in this browser. You can still select the response text.');
    }
  }

  function complete() {
    if (!userId || !ready || completed) return;
    try {
      recordLearningActivity({ id: activityId(workshop.slug), kind: 'workshop', skillSlug: workshop.skillSlug, xp: workshop.xp }, userId);
      setCompleted(true);
      setMessage('Workshop recorded. Your worksheet remains editable on this browser.');
    } catch {
      setMessage('Progress could not be recorded. Copy your worksheet and try again.');
    }
  }

  if (!userId || !loaded) {
    return <div className="h-48 animate-pulse rounded-3xl bg-slate-100" aria-label="Loading workshop worksheet" />;
  }

  return (
    <section aria-labelledby="worksheet-heading" className="space-y-7">
      <div className="rounded-3xl border border-indigo-200 bg-indigo-50 p-5 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-indigo-700">Your practical work sample</p>
            <h2 id="worksheet-heading" className="mt-2 text-2xl font-bold text-slate-950">Workshop worksheet</h2>
          </div>
          <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-indigo-900" aria-live="polite">{filled} of 3 sections drafted</span>
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-700">
          Write in your own words, then compare your decisions with an example and the self-review criteria.
          Drafts are saved for this account <strong>in this browser only</strong>. Your worksheet text is not sent to our servers. Optional AI help sends your question and the published workshop instructions, not your draft answers.
          Do not enter confidential or sensitive workplace information.
        </p>
      </div>

      {workshop.steps.map((step, index) => (
        <article key={step.title} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-800">{index + 1}</span>
            <h3 className="text-xl font-bold text-slate-950">{step.title}</h3>
          </div>
          <p className="mt-4 leading-7 text-slate-700">{step.instruction}</p>
          <label htmlFor={`workshop-response-${index}`} className="mt-5 block text-sm font-bold text-slate-900">Your response</label>
          <textarea
            id={`workshop-response-${index}`}
            rows={5}
            maxLength={2500}
            value={draft.answers[index]}
            placeholder={step.scaffold}
            onChange={(event) => setDraft((current) => ({
              ...current, answers: current.answers.map((answer, i) => i === index ? event.target.value : answer),
            }))}
            className="mt-2 w-full resize-y rounded-xl border border-slate-300 bg-white p-4 text-sm leading-6 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />
          <p className="mt-2 text-xs text-slate-500">{draft.answers[index].trim().length < 40 ? 'Explain the decision in at least 40 characters.' : 'Ready for self-review.'}</p>
          <ContextualLearningHelp context={[workshop.skillName, workshop.title, workshop.scenario, step.title, step.instruction, step.scaffold].join(" | ").slice(0, 4500)} prompt="Can you help me think through this workshop step without writing my response for me?" />
          <details className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
            <summary className="cursor-pointer text-sm font-bold text-amber-950">Compare with an illustrative response</summary>
            <p className="mt-3 text-sm leading-6 text-amber-950">{step.example}</p>
            <p className="mt-2 text-xs text-amber-800">One defensible approach, not the only correct answer.</p>
          </details>
        </article>
      ))}

      <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-7">
        <h3 className="flex items-center gap-2 text-xl font-bold text-slate-950"><ClipboardCheck className="h-6 w-6 text-emerald-700" /> Self-review before finishing</h3>
        <p className="mt-2 text-sm text-slate-600">Check each criterion only when your work demonstrates it. This is a self-assessment, not an automated evaluation.</p>
        <div className="mt-5 space-y-3">
          {workshop.criteria.map((criterion, index) => (
            <label key={criterion} className="flex cursor-pointer items-start gap-3 rounded-xl bg-slate-50 p-3 text-sm leading-6 text-slate-800">
              <input type="checkbox" checked={draft.checked[index]} className="mt-1 h-4 w-4 shrink-0 accent-indigo-700"
                onChange={(event) => setDraft((current) => ({
                  ...current, checked: current.checked.map((checked, i) => i === index ? event.target.checked : checked),
                }))} />
              <span>{criterion}</span>
            </label>
          ))}
        </div>
        <div className="mt-5 rounded-xl bg-rose-50 p-4">
          <div className="font-semibold text-rose-950">Common traps to check</div>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-rose-900">{workshop.pitfalls.map((pitfall) => <li key={pitfall}>{pitfall}</li>)}</ul>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <button type="button" onClick={copyWorksheet} className="msl-motion-press inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-sm font-bold text-slate-800 hover:bg-slate-50"><Copy className="h-4 w-4" />Copy worksheet</button>
          <button type="button" onClick={complete} disabled={!ready || completed} className="msl-motion-press inline-flex min-h-11 items-center gap-2 rounded-xl bg-indigo-700 px-4 py-2 text-sm font-bold text-white hover:bg-indigo-800 disabled:cursor-not-allowed disabled:opacity-50">
            {completed ? <CheckCircle2 className="h-4 w-4" /> : <ClipboardCheck className="h-4 w-4" />}
            {completed ? 'Workshop completed' : `Record practice · ${workshop.xp} XP`}
          </button>
        </div>
        {!completed && !ready && <p className="mt-3 text-xs text-slate-500">To record completion, draft all three sections and review all four criteria.</p>}
        {message && <p role="status" className="msl-status mt-4 text-sm font-medium text-indigo-900">{message}</p>}
      </div>

      <div className="rounded-3xl bg-slate-950 p-6 text-white sm:p-8">
        <p className="text-xs font-bold uppercase tracking-wider text-cyan-300">Revisit and improve</p>
        <h3 className="mt-2 text-xl font-bold">A second look is part of the workshop.</h3>
        <p className="mt-3 text-sm leading-6 text-slate-200">{workshop.revisit}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/dashboard#progress" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-bold text-slate-900 hover:bg-slate-100">Track progress <ArrowRight className="h-4 w-4" /></Link>
          <Link href="/dashboard#saved" className="inline-flex min-h-11 items-center rounded-xl border border-slate-500 px-4 py-2 text-sm font-bold text-white hover:bg-slate-800">Saved learning</Link>
          <Link href={`/skills/${workshop.skillSlug}`} className="inline-flex min-h-11 items-center rounded-xl border border-slate-500 px-4 py-2 text-sm font-bold text-white hover:bg-slate-800">Review skill guide</Link>
        </div>
      </div>
    </section>
  );
}
