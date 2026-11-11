'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, RotateCcw, Sparkles } from 'lucide-react';

const choices = [
  { id: 'direction', label: 'Find my direction', detail: 'I have options, but need a clearer plan.', title: 'Start with your career map', description: 'Get the free Career & Life Map workbook, then turn your answers into a practical next step.', href: '/free-career-guide', action: 'Get the free workbook' },
  { id: 'practice', label: 'Try something practical', detail: 'I want a quick challenge I can actually do.', title: 'Try a skill challenge', description: 'Explore hands-on activities and short exercises. You can browse without creating an account.', href: '/skills', action: 'Explore skill activities' },
  { id: 'progress', label: 'Keep track of progress', detail: 'I want to save skills and return to them.', title: 'Make your learning stick', description: 'Create a free account to save skills and return to your personal learning dashboard.', href: '/auth?mode=signup&redirect=%2Fdashboard', action: 'Create my free account' },
] as const;

export function DiscoveryQuiz() {
  const [choice, setChoice] = useState<(typeof choices)[number]['id'] | null>(null);
  const selected = choices.find((item) => item.id === choice);
  return (
    <section aria-labelledby="discovery-quiz-title" className="rounded-[2rem] border border-indigo-200 bg-gradient-to-br from-indigo-50 via-white to-violet-50 p-6 shadow-sm sm:p-9">
      <div className="flex items-center gap-2 text-sm font-semibold text-indigo-700"><Sparkles className="h-4 w-4" aria-hidden="true" /> 30-second discovery quiz</div>
      <h2 id="discovery-quiz-title" className="mt-3 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">What would help you most today?</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">Pick one. We'll point you to a useful place to start—no email required to see your result.</p>
      <div className="mt-6 grid gap-3 md:grid-cols-3" role="group" aria-label="Choose your learning goal">
        {choices.map((item) => (
          <button key={item.id} type="button" onClick={() => setChoice(item.id)} aria-pressed={choice === item.id} className={`rounded-2xl border p-4 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${choice === item.id ? 'border-indigo-600 bg-indigo-100 shadow-sm' : 'border-slate-200 bg-white hover:border-indigo-300'}`}>
            <span className="block font-semibold text-slate-950">{item.label}</span>
            <span className="mt-1 block text-sm leading-5 text-slate-600">{item.detail}</span>
          </button>
        ))}
      </div>
      {selected && (
        <div aria-live="polite" className="mt-5 rounded-2xl border border-indigo-200 bg-white p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-indigo-700">Your next step</p>
          <h3 className="mt-2 text-xl font-bold text-slate-950">{selected.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">{selected.description}</p>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <Link href={selected.href} className="inline-flex items-center gap-2 rounded-xl bg-indigo-700 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700">{selected.action}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            <button type="button" onClick={() => setChoice(null)} className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 underline-offset-4 hover:underline"><RotateCcw className="h-4 w-4" aria-hidden="true" /> Start over</button>
          </div>
        </div>
      )}
    </section>
  );
}
