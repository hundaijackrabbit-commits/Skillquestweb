import Link from 'next/link';
import { ArrowRight, BookOpenCheck, Sparkles, UserRoundPlus } from 'lucide-react';

type Props = { context: 'skill' | 'career' | 'article' };

const messages = {
  skill: { eyebrow: 'Keep this skill moving', title: 'Turn what you learned into a next step.', description: 'Save useful skills to your free dashboard, or use the workbook to plan what to practice next.' },
  career: { eyebrow: 'Make your career plan actionable', title: 'A direction is better with a plan.', description: 'Use the free career workbook to compare options, then save the skills you want to develop.' },
  article: { eyebrow: 'From reading to doing', title: 'Found something useful? Put it into practice.', description: 'Explore hands-on learning, save a skill, or get a practical career planning workbook.' },
} as const;

export function NextStepPrompt({ context }: Props) {
  const message = messages[context];
  return (
    <aside aria-label="Explore more Modern Skill Lab tools" className="my-10 overflow-hidden rounded-[2rem] border border-indigo-200 bg-gradient-to-br from-sky-50 via-white to-fuchsia-50 p-6 shadow-sm sm:p-8">
      <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-indigo-700"><Sparkles className="h-4 w-4" aria-hidden="true" />{message.eyebrow}</div>
      <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950">{message.title}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{message.description}</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <Link href="/free-career-guide" className="group flex items-center gap-3 rounded-2xl border border-violet-200 bg-white p-4 transition hover:border-violet-400 hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-600">
          <span className="rounded-xl bg-violet-100 p-2 text-violet-700"><BookOpenCheck className="h-5 w-5" aria-hidden="true" /></span>
          <span className="min-w-0 flex-1"><span className="block text-sm font-bold text-slate-950">Get the free career guide</span><span className="block text-xs text-slate-600">A practical fillable workbook</span></span>
          <ArrowRight className="h-4 w-4 shrink-0 text-violet-700 transition group-hover:translate-x-1" aria-hidden="true" />
        </Link>
        <Link href="/auth?mode=signup&redirect=%2Fdashboard" className="group flex items-center gap-3 rounded-2xl border border-sky-200 bg-white p-4 transition hover:border-sky-400 hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-600">
          <span className="rounded-xl bg-sky-100 p-2 text-sky-700"><UserRoundPlus className="h-5 w-5" aria-hidden="true" /></span>
          <span className="min-w-0 flex-1"><span className="block text-sm font-bold text-slate-950">Save your learning</span><span className="block text-xs text-slate-600">Create a free skill dashboard</span></span>
          <ArrowRight className="h-4 w-4 shrink-0 text-sky-700 transition group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
    </aside>
  );
}
