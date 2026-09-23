import type { ReactNode } from 'react';
import { SkillPageNav } from '@/components/skills/skill-page-nav';
import { SkillPageSkipLink } from '@/components/skills/skill-page-skip-link';

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
 * The shell owns the skip target and compact table of contents so the shared
 * skill template only needs to provide stable section IDs. Fragment links use
 * native browser navigation and the main guide can receive programmatic focus
 * after a skip-link jump without entering the normal tab order.
 */
export function SkillGuideShell({ items, children, className = '' }: SkillGuideShellProps) {
  return (
    <>
      <SkillPageSkipLink />
      <main
        id="skill-guide"
        tabIndex={-1}
        aria-label="Skill guide"
        className={`scroll-mt-24 focus:outline-none ${className}`.trim()}
      >
        <SkillPageNav items={items} />
        {children}
      </main>
    </>
  );
}
