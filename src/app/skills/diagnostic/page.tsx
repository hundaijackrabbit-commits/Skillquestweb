import type { Metadata } from 'next';
import { getIndexableSkills } from '@/lib/content';
import { SkillDiagnostic } from '@/components/skills/skill-diagnostic';
import { Breadcrumbs } from '@/components/navigation/breadcrumbs';

export const metadata: Metadata = { title: 'Skill Diagnostic', description: 'Use a short diagnostic to identify a practical skill stack to explore next.', alternates: { canonical: '/skills/diagnostic' } };

export default async function SkillDiagnosticPage() {
  const skills = (await getIndexableSkills()).filter((skill)=>skill.featured).map(({name,slug,shortDefinition,category})=>({name,slug,shortDefinition,category}));
  return <main className="min-h-screen bg-gradient-to-b from-blue-50/50 to-white py-12"><div className="mx-auto max-w-4xl px-6 lg:px-8">
    <Breadcrumbs items={[{label:'Home',href:'/'},{label:'Skills',href:'/skills'},{label:'Skill diagnostic'}]} />
    <header className="mt-8"><p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-700">Find your starting point</p><h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-6xl">What should you learn next?</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">Answer three practical questions. We will turn your priorities into a small starting stack instead of sending you into a giant library with no direction.</p></header>
    <SkillDiagnostic skills={skills} />
  </div></main>;
}
