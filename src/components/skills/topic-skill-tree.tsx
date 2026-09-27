import Link from 'next/link';
import { ArrowRight, GitBranch, Network, Sprout } from 'lucide-react';
import type { Skill } from '@/lib/types';

type TopicSkillTreeProps = {
  topicName: string;
  skills: Skill[];
};

type SkillNode = {
  skill: Skill;
  prerequisites: Skill[];
  unlocks: Skill[];
  subskills: Skill[];
  related: Skill[];
};

function referenceKey(value: string) {
  return value
    .trim()
    .toLocaleLowerCase('en')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function uniqueSkills(skills: Skill[]) {
  return Array.from(new Map(skills.map((skill) => [skill.slug, skill])).values());
}

function buildSkillNodes(skills: Skill[]) {
  const lookup = new Map<string, Skill>();
  for (const skill of skills) {
    for (const value of [skill.id, skill.slug, skill.name]) {
      lookup.set(referenceKey(value), skill);
    }
  }

  const resolve = (references: string[], currentSlug?: string) =>
    uniqueSkills(
      references
        .map((reference) => lookup.get(referenceKey(reference)))
        .filter((skill): skill is Skill => Boolean(skill) && skill.slug !== currentSlug),
    );

  const prerequisitesBySlug = new Map<string, Skill[]>();
  for (const skill of skills) {
    prerequisitesBySlug.set(skill.slug, resolve(skill.prerequisiteSkills, skill.slug));
  }

  const unlocksBySlug = new Map<string, Skill[]>();
  for (const skill of skills) {
    for (const prerequisite of prerequisitesBySlug.get(skill.slug) ?? []) {
      const current = unlocksBySlug.get(prerequisite.slug) ?? [];
      current.push(skill);
      unlocksBySlug.set(prerequisite.slug, uniqueSkills(current));
    }
  }

  return skills.map<SkillNode>((skill) => ({
    skill,
    prerequisites: prerequisitesBySlug.get(skill.slug) ?? [],
    unlocks: unlocksBySlug.get(skill.slug) ?? [],
    subskills: resolve(skill.subskills, skill.slug),
    related: resolve(skill.relatedSkills, skill.slug),
  }));
}

function nodeScore(node: SkillNode) {
  const difficulty = (node.skill.difficulty ?? '').toLocaleLowerCase('en');
  return (
    (node.skill.featured ? 100 : 0) +
    node.skill.employerSignalValue * 3 +
    node.unlocks.length * 5 +
    node.prerequisites.length * 3 +
    node.subskills.length * 2 +
    node.related.length +
    (difficulty.includes('beginner') ? 8 : 0)
  );
}

function SkillLinkList({ label, skills }: { label: string; skills: Skill[] }) {
  if (skills.length === 0) return null;

  return (
    <div className="mt-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">{label}</p>
      <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1.5">
        {skills.slice(0, 3).map((skill) => (
          <Link key={skill.slug} href={`/skills/${skill.slug}`} className="text-xs font-semibold text-indigo-700 hover:text-indigo-900 hover:underline">
            {skill.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

function SkillNodeCard({ node }: { node: SkillNode }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <Link href={`/skills/${node.skill.slug}`} className="group inline-flex items-start gap-2 font-bold text-slate-950 hover:text-indigo-700">
        <span>{node.skill.name}</span>
        <ArrowRight aria-hidden="true" className="mt-0.5 h-4 w-4 flex-none transition group-hover:translate-x-0.5" />
      </Link>
      <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{node.skill.shortDefinition}</p>
      <SkillLinkList label="Builds on" skills={node.prerequisites} />
      <SkillLinkList label="Unlocks" skills={node.unlocks} />
      <SkillLinkList label="Branches into" skills={node.subskills} />
      {node.subskills.length === 0 && <SkillLinkList label="Related" skills={node.related} />}
    </article>
  );
}

export function TopicSkillTree({ topicName, skills }: TopicSkillTreeProps) {
  const nodes = buildSkillNodes(skills);
  if (nodes.length < 2) return null;

  const foundations = nodes
    .filter((node) => node.prerequisites.length === 0)
    .sort((left, right) => nodeScore(right) - nodeScore(left) || left.skill.name.localeCompare(right.skill.name))
    .slice(0, 5);

  const progressions = nodes
    .filter((node) => node.prerequisites.length > 0)
    .sort((left, right) => nodeScore(right) - nodeScore(left) || left.skill.name.localeCompare(right.skill.name))
    .slice(0, 6);

  const alreadyShown = new Set([...foundations, ...progressions].map((node) => node.skill.slug));
  const branches = nodes
    .filter((node) => node.subskills.length > 0 || node.related.length > 0)
    .sort((left, right) => nodeScore(right) - nodeScore(left) || left.skill.name.localeCompare(right.skill.name))
    .filter((node) => !alreadyShown.has(node.skill.slug))
    .slice(0, 5);

  const relationshipCount = nodes.reduce(
    (total, node) => total + node.prerequisites.length + node.subskills.length + node.related.length,
    0,
  );

  if (foundations.length === 0 && progressions.length === 0 && branches.length === 0) return null;

  return (
    <section className="mt-14 rounded-[2rem] border border-indigo-200 bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-6 sm:p-8" aria-labelledby="topic-skill-tree">
      <div className="max-w-4xl">
        <div className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-indigo-800">
          <Network aria-hidden="true" className="mr-2 h-4 w-4" />
          Relationship-driven map
        </div>
        <h2 id="topic-skill-tree" className="mt-4 text-3xl font-bold tracking-tight text-slate-950">How {topicName} skills connect</h2>
        <p className="mt-3 leading-7 text-slate-600">
          This map uses the prerequisite, subskill, and related-skill relationships already stored in Modern Skill Lab. Start with foundations, follow explicit prerequisite chains, then branch into adjacent capabilities.
        </p>
        <p className="mt-2 text-sm text-slate-500">{relationshipCount} topic-local relationship references are represented in the current data.</p>
      </div>

      <div className="mt-8 grid gap-7 xl:grid-cols-3">
        {foundations.length > 0 && (
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Sprout aria-hidden="true" className="h-5 w-5 text-emerald-700" />
              <h3 className="text-lg font-bold text-slate-950">Foundation nodes</h3>
            </div>
            <p className="mb-4 text-sm leading-6 text-slate-600">Skills with no prerequisite inside this topic. These are natural entry points, not mandatory first steps.</p>
            <div className="space-y-3">{foundations.map((node) => <SkillNodeCard key={node.skill.slug} node={node} />)}</div>
          </div>
        )}

        {progressions.length > 0 && (
          <div>
            <div className="mb-4 flex items-center gap-2">
              <ArrowRight aria-hidden="true" className="h-5 w-5 text-blue-700" />
              <h3 className="text-lg font-bold text-slate-950">Progression nodes</h3>
            </div>
            <p className="mb-4 text-sm leading-6 text-slate-600">Skills that explicitly build on another capability in this topic.</p>
            <div className="space-y-3">{progressions.map((node) => <SkillNodeCard key={node.skill.slug} node={node} />)}</div>
          </div>
        )}

        {branches.length > 0 && (
          <div>
            <div className="mb-4 flex items-center gap-2">
              <GitBranch aria-hidden="true" className="h-5 w-5 text-violet-700" />
              <h3 className="text-lg font-bold text-slate-950">Branching capabilities</h3>
            </div>
            <p className="mb-4 text-sm leading-6 text-slate-600">Connected skills with useful subskills or adjacent capabilities worth exploring next.</p>
            <div className="space-y-3">{branches.map((node) => <SkillNodeCard key={node.skill.slug} node={node} />)}</div>
          </div>
        )}
      </div>
    </section>
  );
}
