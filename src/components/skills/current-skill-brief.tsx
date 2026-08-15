import { CalendarCheck2, ExternalLink, Radar, Target } from 'lucide-react';
import type { SkillIntelligenceBrief } from '@/lib/skill-intelligence';

type Props = {
  skillName: string;
  brief: SkillIntelligenceBrief;
};

export function CurrentSkillBrief({ skillName, brief }: Props) {
  return (
    <section className="mb-12 rounded-3xl border border-cyan-200 bg-gradient-to-br from-cyan-50 via-white to-blue-50 p-7 shadow-sm sm:p-9" aria-labelledby="current-skill-brief">
      <div className="flex flex-col gap-7 lg:flex-row lg:justify-between">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.15em] text-cyan-800">
            <span className="inline-flex items-center rounded-full bg-cyan-100 px-3 py-1.5"><Radar className="mr-1.5 h-4 w-4" />Current signal</span>
            <span className="inline-flex items-center text-slate-500"><CalendarCheck2 className="mr-1.5 h-4 w-4" />Reviewed {new Date(`${brief.reviewedAt}T12:00:00`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>
          <h2 id="current-skill-brief" className="mt-4 text-2xl font-bold tracking-tight text-slate-950">{brief.signal}</h2>
          <p className="mt-3 leading-7 text-slate-700">{brief.summary}</p>
          <div className="mt-5 rounded-2xl border border-blue-200 bg-white/80 p-5">
            <h3 className="flex items-center font-bold text-blue-950"><Target className="mr-2 h-5 w-5 text-blue-600" />Try this now</h3>
            <p className="mt-2 leading-7 text-blue-900">{brief.action}</p>
          </div>
        </div>
        <aside className="h-fit min-w-64 rounded-2xl border border-slate-200 bg-white p-5 lg:max-w-xs" aria-label={`Sources for the ${skillName} current signal`}>
          <div className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500">First-party sources</div>
          <ul className="mt-3 space-y-4">
            {brief.sources.map((source) => (
              <li key={source.url}>
                <a href={source.url} target="_blank" rel="noreferrer" className="group block text-sm font-semibold leading-5 text-blue-700 hover:text-blue-950">
                  {source.title}<ExternalLink className="ml-1 inline h-3.5 w-3.5" />
                </a>
                <span className="mt-1 block text-xs text-slate-500">{source.publisher} · {new Date(`${source.publishedAt}T12:00:00`).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
