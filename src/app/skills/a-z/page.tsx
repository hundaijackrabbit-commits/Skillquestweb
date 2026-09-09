import type { Metadata } from 'next';
import Link from 'next/link';
import { getCanonicalSkills } from '@/lib/content';
import { Breadcrumbs } from '@/components/navigation/breadcrumbs';

export const metadata: Metadata = {
  title: 'A-Z Skills Index',
  description: 'Browse the complete Modern Skill Lab professional skills library alphabetically.',
  alternates: { canonical: '/skills/a-z' },
};

export default async function SkillsAZPage() {
  const skills = (await getCanonicalSkills()).sort((a, b) => a.name.localeCompare(b.name));
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const groups = letters.map((letter) => ({ letter, skills: skills.filter((skill) => skill.name.toUpperCase().startsWith(letter)) })).filter((group) => group.skills.length);

  return <main className="min-h-screen bg-white py-12">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Skills', href: '/skills' }, { label: 'A-Z index' }]} />
      <header className="mt-8 max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-700">Complete directory</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-6xl">Skills A-Z</h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">A fast, crawlable index of every canonical skill guide in Modern Skill Lab. Use it when you know what you want, or explore topic hubs when you want help deciding what comes next.</p>
      </header>
      <nav aria-label="Alphabet" className="mt-8 flex flex-wrap gap-2 border-y border-slate-200 py-5">
        {letters.map((letter) => <a key={letter} href={`#${letter}`} className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-sm font-bold text-slate-700 hover:border-blue-400 hover:text-blue-700">{letter}</a>)}
      </nav>
      <div className="mt-10 space-y-12">
        {groups.map(({ letter, skills: group }) => <section key={letter} id={letter} className="scroll-mt-28">
          <div className="flex items-end gap-4 border-b border-slate-200 pb-3"><h2 className="text-3xl font-bold text-slate-950">{letter}</h2><span className="pb-1 text-sm text-slate-500">{group.length} guides</span></div>
          <div className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {group.map((skill) => <Link key={skill.slug} href={`/skills/${skill.slug}`} className="group rounded-xl p-2 -m-2 hover:bg-blue-50"><span className="font-semibold text-slate-900 group-hover:text-blue-700">{skill.name}</span><span className="mt-1 block text-xs text-slate-500">{skill.shortDefinition}</span></Link>)}
          </div>
        </section>)}
      </div>
    </div>
  </main>;
}