import type { ReactNode } from 'react';

function Figure({ title, caption, children }: { title: string; caption: string; children: ReactNode }) {
  return <figure className="mt-7 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-6">
    <figcaption className="text-lg font-bold text-slate-950">{title}</figcaption>
    <div className="mt-4">{children}</div>
    <p className="mt-4 text-sm leading-6 text-slate-700">{caption}</p>
  </figure>;
}

function Node({ title, detail, tone = 'blue' }: { title: string; detail: string; tone?: 'blue' | 'green' | 'amber' }) {
  const colors = tone === 'green' ? 'border-emerald-200 bg-emerald-50' : tone === 'amber' ? 'border-amber-200 bg-amber-50' : 'border-indigo-200 bg-white';
  return <div className={`rounded-lg border p-3 text-center ${colors}`}><div className="font-semibold text-slate-950">{title}</div><div className="mt-1 text-xs leading-5 text-slate-700">{detail}</div></div>;
}

export function TextbookFigure({ slug }: { slug: string }) {
  switch (slug) {
    case 'communication':
      return <Figure title="Figure 1 · The communication feedback loop" caption="The receiver interprets the message through their own context. Confirmation or correction travels back to the sender; the next message can then resolve any misunderstanding.">
        <div className="grid items-center gap-2 sm:grid-cols-[1fr_auto_1fr_auto_1fr]">
          <Node title="Sender" detail="Intended meaning" /><span aria-hidden="true" className="text-center text-indigo-700">→</span>
          <Node title="Message" detail="Words, channel and context" /><span aria-hidden="true" className="text-center text-indigo-700">→</span>
          <Node title="Receiver" detail="Interpreted meaning" />
        </div>
        <div className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-center text-sm font-medium text-emerald-950">↶ Feedback: restate, clarify, confirm ↵</div>
      </Figure>;
    case 'critical-thinking':
      return <Figure title="Figure 1 · Test competing explanations" caption="One observation can fit several explanations. Evidence must distinguish between them before a causal conclusion is warranted.">
        <Node title="Observation" detail="Sales fell after a redesign." />
        <div aria-hidden="true" className="py-1 text-center text-indigo-700">↓</div>
        <div className="grid gap-2 sm:grid-cols-3"><Node title="Hypothesis A" detail="The design reduced conversion." /><Node title="Hypothesis B" detail="The traffic mix changed." /><Node title="Hypothesis C" detail="Stock or seasonality changed." /></div>
        <div aria-hidden="true" className="py-1 text-center text-indigo-700">↓</div>
        <Node title="Discriminating evidence" detail="Compare equivalent traffic, available inventory and controlled variants." tone="green" />
      </Figure>;
    case 'data-analysis':
      return <Figure title="Figure 1 · Counts versus conversion rates" caption="Illustrative data from the worked example: A has more signups, but B has twice A's observed signup rate. Bars share a zero-to-10% scale. Different traffic mixes may explain the result.">
        <div role="img" aria-label="Page A: 40 signups from 800 visitors, 5 percent. Page B: 30 signups from 300 visitors, 10 percent." className="space-y-4">
          {[{name:'Page A', count:'40 / 800', rate:5},{name:'Page B', count:'30 / 300', rate:10}].map(row=><div key={row.name}>
            <div className="mb-1 flex justify-between gap-2 text-sm font-semibold text-slate-800"><span>{row.name} · {row.count}</span><span>{row.rate}%</span></div>
            <div className="h-7 rounded-md bg-slate-200"><div className="h-full rounded-md bg-indigo-600" style={{width:`${row.rate*10}%`}} /></div>
          </div>)}
          <div className="flex justify-between text-xs text-slate-600"><span>0%</span><span>5%</span><span>10%</span></div>
        </div>
      </Figure>;
    case 'ai-literacy':
      return <Figure title="Figure 1 · The human verification gate" caption="Generation is a drafting step, not approval. Unsupported material goes back for revision or qualified review. A responsible person decides whether the verified output is fit for use.">
        <div className="grid items-center gap-2 sm:grid-cols-[1fr_auto_1fr_auto_1fr]"><Node title="Approved evidence" detail="Task, context and limits" /><span aria-hidden="true" className="text-center text-indigo-700">→</span><Node title="AI draft" detail="Proposed output" /><span aria-hidden="true" className="text-center text-indigo-700">→</span><Node title="Human verification" detail="Check source, omissions and risk" /></div>
        <div className="grid gap-2 pt-3 sm:grid-cols-2"><Node title="Supported → approve" detail="Responsible person signs off." tone="green" /><Node title="Uncertain → revise or escalate" detail="Do not publish unchecked claims." tone="amber" /></div>
      </Figure>;
    case 'active-listening':
      return <Figure title="Figure 1 · Listening as a feedback process" caption="A reflection makes your interpretation visible. The speaker can confirm it or correct it. If corrected, reflect again before proposing a solution.">
        <div className="grid gap-2 sm:grid-cols-2"><Node title="1 · Speaker describes concern" detail="Last-minute changes disrupt planning." /><Node title="2 · Listener reflects" detail="Is the timing the main difficulty?" /><Node title="3 · Speaker clarifies" detail="Actually, I need a clear owner." /><Node title="4 · Listener confirms" detail="So ownership is the main issue?" tone="green" /></div>
        <div className="mt-3 rounded-lg border border-indigo-200 bg-white p-3 text-center text-sm text-indigo-900">↶ If the interpretation is incomplete, return to reflection.</div>
      </Figure>;
    case 'project-management':
      return <Figure title="Figure 1 · A five-day dependency schedule" caption="Illustrative schedule from the guided case. Testing depends on development; privacy approval can run in parallel when its inputs are ready. Release requires completed testing and approval. Day 4 provides contingency for defects.">
        <div className="grid grid-cols-[minmax(86px,1.6fr)_repeat(5,minmax(0,1fr))] gap-1 text-center text-[10px] sm:text-xs" role="img" aria-label="Development days 1 and 2, privacy review day 1, testing day 3, contingency day 4, release day 5 if approved.">
          <div /><div>Day 1</div><div>Day 2</div><div>Day 3</div><div>Day 4</div><div>Day 5</div>
          {([{label:'Development',days:[1,2]},{label:'Privacy review',days:[1]},{label:'Testing',days:[3]},{label:'Contingency',days:[4]},{label:'Release',days:[5]}]).map(row=><div key={row.label} className="contents"><div className="self-center text-left font-medium text-slate-800">{row.label}</div>{[1,2,3,4,5].map(day=><div key={day} className={`h-7 rounded ${row.days.includes(day)?'bg-indigo-600':'bg-slate-200'}`}/>)}</div>)}
        </div>
      </Figure>;
    default:
      return null;
  }
}
