'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

type DiagnosticSkill = { name: string; slug: string; shortDefinition: string; category: string; careers: string[]; industries: string[]; relatedSkills: string[] };
type Option = { label: string; weights: Record<string, number> };
type Question = { prompt: string; options: Option[] };

const labels: Record<string,string> = {
  'communication':'Communication','leadership':'Leadership','critical-thinking':'Critical Thinking','collaboration':'Collaboration','personal-effectiveness':'Personal Effectiveness','business-strategy':'Business & Strategy','sales-marketing':'Sales & Marketing','finance-operations':'Finance & Operations','human-resources':'People & HR','customer-success':'Customer Success','digital-literacy':'Digital Literacy','content-media':'Content & Media','design-ux':'Design & UX','technical':'Technical Skills','analytics-research':'Analytics & Research','remote-work':'Remote Work','entrepreneurship':'Entrepreneurship','freelance-gig':'Freelance & Independent Work','ai-era':'AI & Automation','future-resistant':'Future-Resistant Skills'
};

const Q = (prompt:string, a:[string,string][]):Question => ({prompt,options:a.map(([label,key])=>({label,weights:Object.fromEntries(key.split('+').map(k=>[k,1]))}))});
const questions: Question[] = [
  Q('Which kind of challenge naturally pulls you in?', [['Making a complicated idea clear','communication'],['Finding the flaw in an argument or plan','critical-thinking'],['Building or fixing something digital','technical'],['Figuring out how a business can win','business-strategy']]),
  Q('If you had a free afternoon to learn something, what sounds most satisfying?', [['Experimenting with AI tools and agents','ai-era+digital-literacy'],['Writing, filming, or shaping a story','content-media+communication'],['Exploring data and discovering a pattern','analytics-research+critical-thinking'],['Designing a useful product or experience','design-ux+technical']]),
  Q('What kind of impact would you most like your skills to create?', [['Help people understand or trust each other','communication+collaboration'],['Help a team perform at a higher level','leadership+human-resources'],['Create customers, demand, or growth','sales-marketing+business-strategy'],['Make systems faster, safer, or more reliable','technical+finance-operations']]),
  Q('Which work activity gives you the most energy?', [['Talking through ideas with people','communication+customer-success'],['Deep solo concentration on a hard problem','critical-thinking+technical'],['Organizing people and moving a project forward','leadership+collaboration'],['Making something original','content-media+design-ux']]),
  Q('How do you prefer to solve an unfamiliar problem?', [['Research evidence before deciding','analytics-research+critical-thinking'],['Prototype and experiment','technical+design-ux'],['Ask people and understand their needs','customer-success+communication'],['Set a direction and coordinate action','leadership+business-strategy']]),
  Q('Which future-of-work capability interests you most?', [['Working effectively with AI','ai-era'],['Building adaptable human skills AI cannot easily replace','future-resistant+personal-effectiveness'],['Running digital systems and tools','technical+digital-literacy'],['Leading change across an organization','leadership+business-strategy']]),
  Q('Which result would make you proudest?', [['A persuasive campaign people respond to','sales-marketing+content-media'],['A decision backed by strong evidence','analytics-research+critical-thinking'],['A team that became better because of your leadership','leadership+collaboration'],['A product or system that genuinely works','technical+design-ux']]),
  Q('What would you most like to become better at personally?', [['Focus, consistency, and managing myself','personal-effectiveness'],['Confidence communicating with others','communication'],['Making difficult decisions','critical-thinking+leadership'],['Learning new technology quickly','digital-literacy+future-resistant']]),
  Q('Which business problem sounds most interesting?', [['Understanding what customers actually want','customer-success+sales-marketing'],['Choosing where a company should compete','business-strategy'],['Improving cost, process, or operations','finance-operations'],['Hiring, coaching, and developing people','human-resources+leadership']]),
  Q('Which creative task sounds most like you?', [['Writing or storytelling','content-media+communication'],['Visual or experience design','design-ux'],['Inventing a business or offer','entrepreneurship+business-strategy'],['Creating a new technical solution','technical+ai-era']]),
  Q('What relationship with work appeals to you?', [['Building inside a team or organization','collaboration'],['Creating and owning something myself','entrepreneurship'],['Working independently across clients or projects','freelance-gig'],['Working flexibly across locations and async teams','remote-work+digital-literacy']]),
  Q('When learning, what makes knowledge stick?', [['Explaining it to another person','communication'],['Doing a hands-on project','technical'],['Testing it against evidence and examples','critical-thinking+analytics-research'],['Using it to solve a real customer or business problem','business-strategy+customer-success']]),
  Q('Which responsibility would you volunteer for?', [['Presenting the idea','communication'],['Analyzing whether the idea will work','analytics-research'],['Coordinating the people involved','leadership+collaboration'],['Building the first version','technical+design-ux']]),
  Q('What kind of uncertainty are you most comfortable with?', [['Human emotions and interpersonal dynamics','human-resources+communication'],['Ambiguous evidence and incomplete information','critical-thinking+analytics-research'],['New markets and commercial risk','entrepreneurship+business-strategy'],['New technology that has not been fully figured out','ai-era+technical']]),
  Q('Which skill outcome feels most immediately useful?', [['Influence people without being pushy','communication+sales-marketing'],['Automate repetitive work','ai-era+technical'],['Turn messy information into insight','analytics-research'],['Plan and execute reliably','personal-effectiveness+finance-operations']]),
  Q('What do people most often rely on you for—or what would you like them to?', [['Explaining and listening','communication'],['Ideas and creativity','content-media+design-ux'],['Judgment and problem solving','critical-thinking'],['Direction and ownership','leadership+entrepreneurship']]),
  Q('Which environment sounds most engaging?', [['Fast-moving startup or new venture','entrepreneurship+business-strategy'],['Research, analysis, or strategy team','analytics-research+critical-thinking'],['Creative studio, media, or marketing team','content-media+sales-marketing'],['Product, engineering, or AI team','technical+ai-era']]),
  Q('Finally, what do you want this recommendation to optimize for?', [['Skills I will genuinely enjoy practicing','personal-effectiveness+future-resistant'],['Skills that make me more useful with people','communication+collaboration'],['Skills for modern digital and AI work','ai-era+digital-literacy+technical'],['Skills that expand leadership or business opportunity','leadership+business-strategy+entrepreneurship']]),
];

export function SkillDiagnostic({ skills }: { skills: DiagnosticSkill[] }) {
  const [answers, setAnswers] = useState<number[]>([]);
  const [step, setStep] = useState(0);
  const result = useMemo(() => {
    if (answers.filter((v)=>v !== undefined).length !== questions.length) return null;
    const scores:Record<string,number> = {};
    questions.forEach((q,qi)=>{ const option=q.options[answers[qi]]; if(option) Object.entries(option.weights).forEach(([k,v])=>scores[k]=(scores[k]||0)+v); });
    const ranked = Object.entries(scores).sort((a,b)=>b[1]-a[1]);
    const top = ranked.slice(0,3).map(([key,score])=>({key,label:labels[key]||key,score}));
    const max = Math.max(...ranked.map(([,v])=>v),1);
    const recommendations = skills.map((skill)=>{
      let score=(scores[skill.category]||0)*10;
      const text=[skill.name,skill.shortDefinition,...skill.careers,...skill.industries,...skill.relatedSkills].join(' ').toLowerCase();
      top.forEach((t,i)=>{ if(text.includes(t.label.toLowerCase().split(' ')[0])) score += 3-i; });
      return {skill,score};
    }).filter(x=>x.score>0).sort((a,b)=>b.score-a.score || a.skill.name.localeCompare(b.skill.name)).slice(0,8);
    return {top,max,recommendations};
  },[answers,skills]);

  const answer = (index:number) => { setAnswers(current=>{const next=[...current];next[step]=index;return next;}); if(step<questions.length-1) setStep(step+1); };
  const q=questions[step];
  return <div className="mt-10">
    {!result && <><div className="mb-6"><div className="flex justify-between text-sm font-semibold text-slate-600"><span>Question {step+1} of {questions.length}</span><span>{Math.round(((step+1)/questions.length)*100)}%</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200"><div className="h-full bg-blue-600 transition-all" style={{width:`${((step+1)/questions.length)*100}%`}} /></div></div><section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm"><h2 className="text-2xl font-bold text-slate-950">{q.prompt}</h2><p className="mt-2 text-sm text-slate-500">Choose what sounds most like you, not what you think you should choose.</p><div className="mt-6 grid gap-3">{q.options.map((option,oi)=><button key={option.label} onClick={()=>answer(oi)} className={`rounded-2xl border p-4 text-left font-medium transition ${answers[step]===oi?'border-blue-600 bg-blue-50 text-blue-950':'border-slate-200 hover:border-blue-400 hover:bg-blue-50/40'}`}>{option.label}</button>)}</div><div className="mt-6 flex justify-between"><button disabled={step===0} onClick={()=>setStep(s=>Math.max(0,s-1))} className="text-sm font-bold text-slate-600 disabled:opacity-30">← Back</button>{answers[step]!==undefined&&step<questions.length-1&&<button onClick={()=>setStep(s=>s+1)} className="text-sm font-bold text-blue-700">Next →</button>}</div></section></>}
    {result && <section className="rounded-3xl bg-slate-950 p-7 sm:p-9 text-white"><p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-300">Your skill-interest profile</p><h2 className="mt-2 text-3xl font-bold">Your strongest learning directions</h2><p className="mt-3 max-w-2xl text-slate-300">This profile combines the kinds of problems, activities, environments and outcomes you selected. It is a discovery tool rather than a personality diagnosis.</p><div className="mt-7 grid gap-3 sm:grid-cols-3">{result.top.map((item,i)=><div key={item.key} className="rounded-2xl bg-white/10 p-4"><span className="text-xs font-bold text-blue-300">#{i+1} MATCH</span><strong className="mt-1 block">{item.label}</strong><div className="mt-3 h-1.5 rounded-full bg-white/10"><div className="h-full rounded-full bg-blue-300" style={{width:`${Math.max(20,(item.score/result.max)*100)}%`}} /></div></div>)}</div><h3 className="mt-9 text-xl font-bold">Skills recommended for you</h3><div className="mt-4 grid gap-3 sm:grid-cols-2">{result.recommendations.map(({skill},i)=><Link key={skill.slug} href={`/skills/${skill.slug}`} className="rounded-2xl bg-white/10 p-5 hover:bg-white/15"><span className="text-xs font-bold text-blue-300">RECOMMENDATION {i+1}</span><span className="mt-1 block text-lg font-bold">{skill.name}</span><span className="mt-2 block text-sm leading-6 text-slate-300">{skill.shortDefinition}</span></Link>)}</div><div className="mt-7 flex flex-wrap gap-4"><button onClick={()=>{setAnswers([]);setStep(0);}} className="rounded-xl bg-white px-4 py-2 text-sm font-bold text-slate-950">Retake diagnostic</button><Link href="/skills/clusters" className="rounded-xl border border-white/20 px-4 py-2 text-sm font-bold">Explore skill clusters</Link></div></section>}
  </div>;
}
