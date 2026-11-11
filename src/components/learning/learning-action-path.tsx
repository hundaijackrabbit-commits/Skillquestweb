import { ArrowRight, CheckCircle2, Compass, Lightbulb } from 'lucide-react';

type LearningActionPathProps = {
  title: string;
  description: string;
  steps: string[];
  outcome?: string;
};

export function LearningActionPath({ title, description, steps, outcome }: LearningActionPathProps) {
  const usefulSteps = steps.filter((step) => typeof step === 'string' && step.trim().length > 0).slice(0, 4);
  if (usefulSteps.length === 0) return null;
  return (
    <section aria-label={title} className="mb-10 rounded-2xl border border-indigo-100 bg-gradient-to-br from-white to-indigo-50/60 p-5 shadow-sm sm:p-7">
      <div className="mb-2 flex items-center gap-2 text-indigo-700"><Compass aria-hidden="true" className="h-5 w-5" /><span className="text-xs font-semibold uppercase tracking-wide">Practical roadmap</span></div>
      <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">{title}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-700">{description}</p>
      <ol className="mt-6 grid gap-3 md:grid-cols-2">
        {usefulSteps.map((step, index) => (
          <li key={index} className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4">
            <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-800">{index + 1}</span>
            <p className="text-sm leading-6 text-slate-800">{step}</p>
          </li>
        ))}
      </ol>
      {outcome?.trim() && <div className="mt-4 flex items-start gap-2 rounded-xl bg-emerald-50 p-4 text-sm leading-6 text-emerald-950"><CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" /><span><strong>What to look for:</strong> {outcome}</span></div>}
      <p className="mt-4 flex items-center gap-2 text-xs text-slate-600"><Lightbulb aria-hidden="true" className="h-4 w-4" /> Adapt these steps to your experience and circumstances. <ArrowRight aria-hidden="true" className="h-3 w-3" /></p>
    </section>
  );
}
