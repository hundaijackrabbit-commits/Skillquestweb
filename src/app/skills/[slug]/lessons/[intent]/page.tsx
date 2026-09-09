import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSkillBySlug } from '@/lib/content';
import { Breadcrumbs } from '@/components/navigation/breadcrumbs';

const intents = {
  'how-to': { label: 'How to develop', intro: 'Turn the skill into repeatable behaviour with a staged practice plan.' },
  examples: { label: 'Examples', intro: 'See where the skill appears in realistic work situations and what strong execution looks like.' },
  techniques: { label: 'Techniques & frameworks', intro: 'Use concrete methods, subskills, and practice structures instead of relying on vague advice.' },
  mistakes: { label: 'Common mistakes', intro: 'Recognize predictable failure patterns and replace them with better habits.' },
  exercises: { label: 'Exercises', intro: 'Practise deliberately with small tasks that produce observable evidence of improvement.' },
} as const;
type Intent = keyof typeof intents;

export async function generateMetadata({ params }: { params: Promise<{ slug: string; intent: string }> }): Promise<Metadata> {
  const { slug, intent } = await params; const skill = await getSkillBySlug(slug); const config = intents[intent as Intent];
  if (!skill || !config) return { title: 'Lesson not found' };
  return { title: `${config.label} ${skill.name}`, description: `${config.intro} A practical ${skill.name} lesson from Modern Skill Lab.`, alternates: { canonical: `/skills/${skill.slug}/lessons/${intent}` } };
}

export default async function SkillIntentLesson({ params }: { params: Promise<{ slug: string; intent: string }> }) {
  const { slug, intent } = await params; const skill = await getSkillBySlug(slug); const config = intents[intent as Intent];
  if (!skill || !config) notFound();
  const sections: Record<Intent, { title: string; items: string[] }[]> = {
    'how-to': [
      { title: 'Start here', items: skill.beginnerActions },
      { title: 'Build working proficiency', items: skill.intermediateActions },
      { title: 'Stretch toward advanced practice', items: skill.advancedActions },
    ],
    examples: [
      { title: 'Real-world situations', items: skill.realWorldScenarios?.length ? skill.realWorldScenarios : [skill.whereItShowsUp] },
      { title: 'What strong execution looks like', items: [skill.skillInAction || skill.careerApplications] },
    ],
    techniques: [
      { title: 'Core techniques and subskills', items: skill.coreSubskills?.length ? skill.coreSubskills : skill.subskills },
      { title: 'Ways to develop them', items: [skill.developmentMethods, skill.howToPractice].filter(Boolean) as string[] },
    ],
    mistakes: [{ title: `Mistakes that weaken ${skill.name}`, items: skill.commonMistakes }],
    exercises: [
      { title: 'Beginner exercises', items: skill.beginnerActions },
      { title: 'Applied exercises', items: skill.intermediateActions },
      { title: 'Measure your progress', items: [skill.howToMeasureProgress].filter(Boolean) as string[] },
    ],
  };
  return <main className="min-h-screen bg-white py-12"><div className="mx-auto max-w-4xl px-6 lg:px-8">
    <Breadcrumbs items={[{label:'Home',href:'/'},{label:'Skills',href:'/skills'},{label:skill.name,href:`/skills/${skill.slug}`},{label:config.label}]} />
    <header className="mt-8"><p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-700">Practical lesson</p><h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">{config.label} {skill.name}</h1><p className="mt-5 text-lg leading-8 text-slate-600">{config.intro}</p></header>
    <div className="mt-10 rounded-2xl border border-blue-100 bg-blue-50 p-6"><h2 className="font-bold text-slate-950">The idea in one minute</h2><p className="mt-2 leading-7 text-slate-700">{skill.fullDefinition}</p></div>
    <div className="mt-10 space-y-10">{sections[intent as Intent].map((section) => <section key={section.title}><h2 className="text-2xl font-bold text-slate-950">{section.title}</h2><ol className="mt-5 space-y-3">{section.items.filter(Boolean).map((item,index)=><li key={index} className="flex gap-3 rounded-xl border border-slate-200 p-4"><span className="font-bold text-blue-700">{index+1}.</span><span className="leading-7 text-slate-700">{item}</span></li>)}</ol></section>)}</div>
    <section className="mt-12 rounded-3xl bg-slate-950 p-7 text-white"><h2 className="text-2xl font-bold">Keep building this skill</h2><p className="mt-2 text-slate-300">Return to the complete guide for career context, evidence, related skills, practice and progression.</p><Link href={`/skills/${skill.slug}`} className="mt-5 inline-block font-bold text-blue-300">Open the complete {skill.name} guide →</Link></section>
  </div></main>;
}
