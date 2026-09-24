import type { ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

interface SkillDeepDiveProps {
  title?: string;
  summary?: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

/**
 * Progressive disclosure for secondary long-form skill material.
 *
 * Uses native <details>/<summary> semantics so the control remains keyboard
 * operable without client-side JavaScript. Keep primary definitions, the main
 * value proposition, and core practice guidance outside this component; it is
 * intended for supplementary depth, not for hiding the page's essential answer.
 */
export function SkillDeepDive({
  title = 'Explore the deeper guide',
  summary = 'Open the extended examples, context, and supporting detail when you want to go further.',
  children,
  defaultOpen = false,
}: SkillDeepDiveProps) {
  return (
    <details
      open={defaultOpen}
      className="group rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 rounded-2xl px-5 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 sm:px-6 [&::-webkit-details-marker]:hidden">
        <span>
          <span className="block text-lg font-semibold text-slate-900">{title}</span>
          <span className="mt-1 block max-w-3xl text-sm leading-6 text-slate-600">{summary}</span>
        </span>
        <ChevronDown
          aria-hidden="true"
          className="mt-1 h-5 w-5 flex-none text-slate-500 transition-transform group-open:rotate-180"
        />
      </summary>
      <div className="border-t border-slate-200 px-5 py-6 sm:px-6">{children}</div>
    </details>
  );
}
