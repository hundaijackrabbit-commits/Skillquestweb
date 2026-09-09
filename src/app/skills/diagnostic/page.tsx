import type { Metadata } from 'next';
import { getCanonicalSkills } from '@/lib/content';
import { SkillDiagnostic } from '@/components/skills/skill-diagnostic';
import { Breadcrumbs } from '@/components/navigation/breadcrumbs';

export const metadata: Metadata = { title: 'Skill Interest Diagnostic', description: 'Discover the skill families and specific capabilities that best match your interests, preferred ways of working, and goals.', alternates: { canonical: '/skills/diagnostic' } };

export default async function SkillDiagnosticPage() {
  const skills = (await getCanonicalSkills()).map(({name,slug,shortDefinition,category,careers,industries,relatedSkills})=>({name,slug,shortDefinition,category,careers,industries,relatedSkills}));
  return <main className="min-h-screen bg-gradient-to-b from-blue-50/50 to-white py-12"><div className="mx-auto max-w-4xl px-6 lg:px-8">
    <Breadcrumbs items={[{label:'Home',href:'/'},{label:'Skills',href:'/skills'},{label:'Skill diagnostic'}]} />
    <header className="mt-8"><p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-700">Discover your skill interests</p><h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-6xl">What should you learn next?</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">Explore what kinds of problems, activities, environments and outcomes actually energize you. Your answers are matched against the Modern Skill Lab library to produce a personalized skill-interest profile and concrete recommendations.</p></header>
    <SkillDiagnostic skills={skills} />
  </div></main>;
}
