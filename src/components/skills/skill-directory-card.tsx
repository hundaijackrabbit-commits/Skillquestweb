import Link from 'next/link';
import { ArrowRight, Gauge, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Skill } from '@/lib/types';
import { formatCategoryName, getCategoryColor } from '@/lib/utils';

export function SkillDirectoryCard({ skill }: { skill: Skill }) {
  const categoryColors = getCategoryColor(skill.category);

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <Link
          href={`/topics/${skill.category}`}
          className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${categoryColors.bg} ${categoryColors.text} ${categoryColors.border}`}
        >
          {formatCategoryName(skill.category)}
        </Link>
        {skill.featured && <Badge className="bg-amber-100 text-amber-800">Editor’s pick</Badge>}
      </div>

      <h2 className="mt-4 text-xl font-bold leading-7 text-slate-950">
        <Link href={`/skills/${skill.slug}`} prefetch={false} className="underline-offset-4 group-hover:text-blue-700 group-hover:underline">
          {skill.name}
        </Link>
      </h2>
      <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">{skill.shortDefinition}</p>

      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-5 text-xs font-medium text-slate-500">
        <span className="inline-flex items-center">
          <Gauge aria-hidden="true" className="mr-1.5 h-3.5 w-3.5 text-blue-600" />
          Signal {skill.employerSignalValue}/10
        </span>
        <span className="inline-flex items-center capitalize">
          <Shield aria-hidden="true" className="mr-1.5 h-3.5 w-3.5 text-emerald-600" />
          {skill.automationRisk} automation risk
        </span>
      </div>

      <Link href={`/skills/${skill.slug}`} prefetch={false} className="mt-5 inline-flex items-center text-sm font-semibold text-blue-700">
        Open skill guide <ArrowRight aria-hidden="true" className="ml-1.5 h-4 w-4" />
      </Link>
    </article>
  );
}
