import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight, GitBranch, Layers, Network, Sprout, Waypoints } from 'lucide-react';
import type { Skill } from '@/lib/types';
import { formatCategoryName } from '@/lib/utils';
import { getDomainForTopic } from '@/lib/skill-domains';
import { getSkillConnectionMap } from '@/lib/skill-connections';

type Props = { skill: Skill; allSkills: Skill[] };
type GroupProps = {
  title: string;
  description: string;
  skills: Skill[];
  icon: ReactNode;
};

function ConnectionGroup({ title, description, skills, icon }: GroupProps) {
  if (skills.length === 0) return null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2 text-indigo-700">
        {icon}
        <h3 className="font-bold text-slate-950">{title}</h3>
      </div>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
      <div className="mt-4 space-y-2">
        {skills.slice(0, 6).map((item) => (
          <Link
            key={item.slug}
            href={`/skills/${item.slug}`}
            className="group flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 transition hover:border-indigo-300 hover:bg-indigo-50"
          >
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold text-slate-900 group-hover:text-indigo-800">{item.name}</span>
              <span className="mt-0.5 block text-xs text-slate-500">{formatCategoryName(item.category)}</span>
            </span>
            <ArrowRight aria-hidden="true" className="h-4 w-4 flex-none text-slate-400 transition group-hover:translate-x-0.5" />
          </Link>
        ))}
      </div>
    </div>
  );
}

export function SkillConnectionMap({ skill, allSkills }: Props) {
  const connections = getSkillConnectionMap(skill, allSkills);
  const domain = getDomainForTopic(skill.category);
  const count = Object.values(connections).reduce((total, items) => total + items.length, 0);

  return (
    <section className="rounded-[2rem] border border-indigo-200 bg-gradient-to-br from-indigo-50 via-white to-violet-50 p-6 shadow-sm sm:p-8" aria-labelledby="skill-connection-map-heading">
      <div className="max-w-4xl">
        <div className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-indigo-800">
          <Network aria-hidden="true" className="mr-2 h-4 w-4" />
          Where this skill fits
        </div>
        <h2 id="skill-connection-map-heading" className="mt-4 text-3xl font-bold tracking-tight text-slate-950">{skill.name} in the skill map</h2>
        <p className="mt-3 leading-7 text-slate-600">
          This map uses relationships already stored in Modern Skill Lab: explicit prerequisites, reverse prerequisite progressions, subskills, related skills, and complementary stacks.
        </p>
      </div>

      <div className="mt-7 rounded-2xl border border-slate-200 bg-white/90 p-5">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Your location</p>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm font-semibold">
          {domain && (
            <>
              <Link href="/topics" className="rounded-full bg-slate-100 px-3 py-1.5 text-slate-700 hover:bg-slate-200">{domain.name}</Link>
              <ArrowRight aria-hidden="true" className="h-4 w-4 text-slate-400" />
            </>
          )}
          <Link href={`/topics/${skill.category}`} className="rounded-full bg-indigo-100 px-3 py-1.5 text-indigo-800 hover:bg-indigo-200">{formatCategoryName(skill.category)}</Link>
          <ArrowRight aria-hidden="true" className="h-4 w-4 text-slate-400" />
          <span className="rounded-full bg-slate-950 px-3 py-1.5 text-white">{skill.name}</span>
        </div>
        <p className="mt-3 text-sm text-slate-500">
          {count > 0 ? `${count} resolved skill connection${count === 1 ? '' : 's'} are visible from this guide.` : 'No skill-to-skill edge is resolved yet; the topic remains the primary navigation route.'}
        </p>
      </div>

      {count > 0 && (
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <ConnectionGroup title="Builds on" description="Explicit prerequisites attached to this skill." skills={connections.prerequisites} icon={<Sprout aria-hidden="true" className="h-5 w-5" />} />
          <ConnectionGroup title="Unlocks" description="Skills that explicitly name this one as a prerequisite." skills={connections.unlocks} icon={<Waypoints aria-hidden="true" className="h-5 w-5" />} />
          <ConnectionGroup title="Branches into" description="Subskills identified as parts or extensions of this capability." skills={connections.subskills} icon={<GitBranch aria-hidden="true" className="h-5 w-5" />} />
          <ConnectionGroup title="Complements" description="Existing related-skill and complementary-stack relationships." skills={connections.complements} icon={<Layers aria-hidden="true" className="h-5 w-5" />} />
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold">
        <Link href={`/topics/${skill.category}`} className="text-indigo-700 hover:underline">Explore {formatCategoryName(skill.category)} →</Link>
        <Link href="/topics" className="text-slate-600 hover:text-slate-900 hover:underline">Browse all skill areas →</Link>
      </div>
    </section>
  );
}
