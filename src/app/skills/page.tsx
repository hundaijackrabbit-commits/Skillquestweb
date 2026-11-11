import type { Metadata } from 'next';
import Link from 'next/link';
import { SkillsDirectory } from '@/components/skills/skills-directory';
import { getCanonicalSkills } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Professional Skills Library',
  description: 'Explore practical professional skills organized by topic, learning path, career connection, and workplace application.',
  alternates: { canonical: '/skills' },
};

export default async function SkillsPage() {
  const skills = await getCanonicalSkills();
  return <>
    <section className="border-b border-blue-100 bg-blue-50/50">
      <div className="mx-auto grid max-w-7xl gap-3 px-6 py-5 sm:grid-cols-3 lg:px-8">
        <Link href="/skills/clusters" className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm hover:border-blue-300"><span className="font-bold text-slate-950">Explore skill clusters</span><span className="mt-1 block text-sm text-slate-600">See related capabilities as a connected knowledge map.</span></Link>
        <Link href="/skills/a-z" className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm hover:border-blue-300"><span className="font-bold text-slate-950">Browse A-Z</span><span className="mt-1 block text-sm text-slate-600">Jump directly to any guide in the complete index.</span></Link>
        <Link href="/skills/diagnostic" className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm hover:border-blue-300"><span className="font-bold text-slate-950">Take the skill diagnostic</span><span className="mt-1 block text-sm text-slate-600">Turn your current priorities into a focused starting stack.</span></Link>
      </div>
    </section>
    <SkillsDirectory skills={skills.slice(0, 30)} currentPage={1} totalPages={Math.ceil(skills.length / 30)} />
  </>;
}