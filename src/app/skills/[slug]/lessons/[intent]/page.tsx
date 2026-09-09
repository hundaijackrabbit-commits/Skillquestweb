import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSkillBySlug, getRelatedSkills } from '@/lib/content';
import { Breadcrumbs } from '@/components/navigation/breadcrumbs';
import { absoluteUrl } from '@/lib/site';
import { breadcrumbList } from '@/lib/seo';

const intents = {
  'how-to': { label: 'How to develop', intro: 'Turn the skill into repeatable behaviour with a staged practice plan.' },
  examples: { label: 'Examples', intro: 'See where the skill appears in realistic work situations and what strong execution looks like.' },
  techniques: { label: 'Techniques & frameworks', intro: 'Use concrete methods, subskills, and practice structures instead of relying on vague advice.' },
  mistakes: { label: 'Common mistakes', intro: 'Recognize predictable failure patterns and replace them with better habits.' },
  exercises: { label: 'Exercises', intro: 'Practise deliberately with small tasks that produce observable evidence of improvement.' },
} as const;
type Intent = keyof typeof intents;
const clean = (values: Array<string | undefined | null>) => values.filter((value): value is string => Boolean(value));

export async function generateMetadata({ params }: { params: Promise<{ slug: string; intent: string }> }): Promise<Metadata> {
  const { slug, intent } = await params; const skill = await getSkillBySlug(slug); const config = intents[intent as Intent];
  if (!skill || !config) return { title: 'Lesson not found' };
  const canonicalUrl = absoluteUrl(`/skills/${skill.slug}/lessons/${intent}`);
  return {
    title: `${config.label} ${skill.name}`,
    description: `${config.intro} A practical ${skill.name} lesson from Modern Skill Lab.`,
    alternates: { canonical: canonicalUrl },
    openGraph: { title: `${config.label} ${skill.name} | Modern Skill Lab`, description: config.intro, type: 'article', url: canonicalUrl },
  };
}

export default async function SkillIntentLesson({ params }: { params: Promise<{ slug: string; intent: string }> }) {
  const { slug, intent } = await params; const skill = await getSkillBySlug(slug); const config = intents[intent as Intent];
  if (!skill || !config) notFound();
  const related = (await getRelatedSkills(skill.id)).slice(0, 6);
  const canonicalUrl = absoluteUrl(`/skills/${skill.slug}/lessons/${intent}`);
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: `${config.label} ${skill.name}`,
        description: config.intro,
        mainEntityOfPage: canonicalUrl,
        dateModified: skill.lastUpdated,
        author: { '@type': 'Organization', name: 'Modern Skill Lab' },
        publisher: { '@type': 'Organization', name: 'Modern Skill Lab' },
        about: skill.name,
      },
      breadcrumbList([
        { name: 'Modern Skill Lab', url: absoluteUrl('/') },
        { name: 'Skills', url: absoluteUrl('/skills') },
        { name: skill.name, url: absoluteUrl(`/skills/${skill.slug}`) },
        { name: config.label, url: canonicalUrl },
      ]),
    ],
  };
  const sections: Record<Intent, { title: string; items: string[] }[]> = {
    'how-to': [{ title: 'Start here', items: skill.beginnerActions },{ title: 'Build working proficiency', items: skill.intermediateActions },{ title: 'Stretch toward advanced practice', items: skill.advancedActions }],
    examples: [{ title: 'Real-world situations', items: skill.realWorldScenarios?.length ? skill.realWorldScenarios : clean([skill.whereItShowsUp]) },{ title: 'What strong execution looks like', items: clean([skill.skillInAction, skill.careerApplications]) }],
    techniques: [{ title: 'Core techniques and subskills', items: skill.coreSubskills?.length ? skill.coreSubskills : skill.subskills },{ title: 'Ways to develop them', items: clean([skill.developmentMethods, skill.howToPractice]) }],
    mistakes: [{ title: `Mistakes that weaken ${skill.name}`, items: skill.commonMistakes }],
    exercises: [{ title: 'Beginner exercises', items: skill.beginnerActions },{ title: 'Applied exercises', items: skill.intermediateActions },{ title: 'Measure your progress', items: clean([skill.howToMeasureProgress]) }],
  };
  return <main className="min-h-screen bg-white py-12"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} /><div className="mx-auto max-w-4xl px-6 lg:px-8">
    <Breadcrumbs items={[{label:'Home',href:'/'},{label:'Skills',href:'/skills'},{label:skill.name,href:`/skills/${skill.slug}`},{label:config.label}]} />
    <header className="mt-8"><p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-700">Practical lesson</p><h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">{config.label} {skill.name}</h1><p className="mt-5 text-lg leading-8 text-slate-600">{config.intro}</p></header>
    <div className="mt-10 rounded-2xl border border-blue-100 bg-blue-50 p-6"><h2 className="font-bold text-slate-950">The idea in one minute</h2><p className="mt-2 leading-7 text-slate-700">{skill.fullDefinition}</p>{related.length>0&&<p className="mt-4 text-sm leading-6 text-blue-900">This capability connects directly with {related.slice(0,3).map((item,index)=><span key={item.slug}>{index>0?', ':''}<Link href={`/skills/${item.slug}`} className="font-bold underline decoration-blue-300 underline-offset-2">{item.name}</Link></span>)}. Open those concepts when the lesson depends on them rather than treating {skill.name} as an isolated ability.</p>}</div>
    <nav className="mt-6 flex flex-wrap gap-2" aria-label="More lessons">{Object.entries(intents).map(([key,value])=><Link key={key} href={`/skills/${skill.slug}/lessons/${key}`} className={`rounded-full px-3 py-1.5 text-sm font-semibold ${key===intent?'bg-slate-950 text-white':'border border-slate-200 text-slate-700 hover:border-blue-300'}`}>{value.label}</Link>)}</nav>
    <div className="mt-10 space-y-10">{sections[intent as Intent].map((section) => <section key={section.title}><h2 className="text-2xl font-bold text-slate-950">{section.title}</h2><ol className="mt-5 space-y-3">{section.items.filter(Boolean).map((item,index)=><li key={index} className="flex gap-3 rounded-xl border border-slate-200 p-4"><span className="font-bold text-blue-700">{index+1}.</span><span className="leading-7 text-slate-700">{item}</span></li>)}</ol></section>)}</div>
    {related.length>0&&<section className="mt-12"><h2 className="text-2xl font-bold text-slate-950">Build the surrounding skill cluster</h2><div className="mt-4 grid gap-3 sm:grid-cols-2">{related.map((item)=><Link key={item.slug} href={`/skills/${item.slug}`} className="rounded-xl border border-slate-200 p-4 hover:border-blue-300"><span className="font-bold text-slate-950">{item.name}</span><span className="mt-1 block text-sm text-slate-600">{item.shortDefinition}</span></Link>)}</div></section>}
    <section className="mt-12 rounded-3xl bg-slate-950 p-7 text-white"><h2 className="text-2xl font-bold">Keep building this skill</h2><p className="mt-2 text-slate-300">Return to the complete guide for career context, evidence, related skills, practice and progression.</p><Link href={`/skills/${skill.slug}`} className="mt-5 inline-block font-bold text-blue-300">Open the complete {skill.name} guide →</Link></section>
  </div></main>;
}