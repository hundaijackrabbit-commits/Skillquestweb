'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

type DiagnosticSkill = { name: string; slug: string; shortDefinition: string; category: string };

export function SkillDiagnostic({ skills }: { skills: DiagnosticSkill[] }) {
  const [answers, setAnswers] = useState<number[]>([]);
  const questions = [
    ['When work is unclear, what slows you down most?', 'Explaining or aligning with people', 'Evaluating information and making a decision', 'Using digital or AI tools confidently', 'Planning, prioritizing, or executing'],
    ['What would create the most value in the next 90 days?', 'Stronger communication and collaboration', 'Sharper analysis and judgment', 'More AI and technical fluency', 'Better leadership and business execution'],
    ['Which practice sounds most useful?', 'A difficult conversation or presentation', 'A case analysis or evidence review', 'An AI workflow or technical project', 'A project plan, delegation exercise, or strategy brief'],
  ];
  const categories = [['communication','collaboration'],['critical-thinking','analytics-research'],['ai-era','technical','digital-literacy'],['leadership','business-strategy','personal-effectiveness']];
  const recommendation = useMemo(() => {
    if (answers.length !== questions.length) return null;
    const counts = [0,0,0,0]; answers.forEach((answer)=>counts[answer]++); const winner = counts.indexOf(Math.max(...counts));
    return skills.filter((skill)=>categories[winner].includes(skill.category)).slice(0,5);
  }, [answers, skills]);
  return <div className="mt-10">
    <div className="space-y-6">{questions.map((question, qi)=><section key={question[0]} className="rounded-2xl border border-slate-200 bg-white p-6"><h2 className="text-lg font-bold text-slate-950">{qi+1}. {question[0]}</h2><div className="mt-4 grid gap-2 sm:grid-cols-2">{question.slice(1).map((option,oi)=><button key={option} onClick={()=>setAnswers((current)=>{const next=[...current];next[qi]=oi;return next;})} className={`rounded-xl border p-4 text-left text-sm font-medium transition ${answers[qi]===oi?'border-blue-600 bg-blue-50 text-blue-900':'border-slate-200 hover:border-blue-300'}`}>{option}</button>)}</div></section>)}</div>
    {recommendation && <section className="mt-8 rounded-3xl bg-slate-950 p-7 text-white"><p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-300">Your starting stack</p><h2 className="mt-2 text-2xl font-bold">Five skills worth exploring first</h2><p className="mt-2 text-slate-300">This is a directional diagnostic, not a scientific personality test. Use the recommendations as hypotheses and adjust them as your goals become clearer.</p><div className="mt-6 grid gap-3 sm:grid-cols-2">{recommendation.map((skill)=><Link key={skill.slug} href={`/skills/${skill.slug}`} className="rounded-xl bg-white/10 p-4 hover:bg-white/15"><span className="font-bold">{skill.name}</span><span className="mt-1 block text-xs leading-5 text-slate-300">{skill.shortDefinition}</span></Link>)}</div></section>}
  </div>;
}
