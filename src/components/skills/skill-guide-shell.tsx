import type { ReactNode } from 'react';
import { SkillPageNav } from '@/components/skills/skill-page-nav';

interface SkillGuideNavItem {
  id: string;
  label: string;
}

interface SkillGuideShellProps {
  items: SkillGuideNavItem[];
  children: ReactNode;
  className?: string;
}

/**
 * Shared shell for the readable, long-form portion of a skill page.
 *
 * The route layout owns the page-level <main> landmark and skip link. This
 * shell deliberately uses a labelled section so it can live inside that main
 * landmark without creating invalid/redundant nested main regions. It owns the
 * compact table of contents and stable guide target for direct navigation.
 */
export function SkillGuideShell({ items, children, className = '' }: SkillGuideShellProps) {
  return (
    <section
      id="skill-guide"
      aria-labelledby="skill-guide-heading"
      className={`scroll-mt-24 ${className}`.trim()}
    >
      <h2 id="skill-guide-heading" className="sr-only">
        Skill guide
      </h2>
      <SkillPageNav items={items} />
      {children}
    </section>
  );
}
