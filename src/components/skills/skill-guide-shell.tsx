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
 * Keeping the navigation and article content in one component gives the shared
 * skill template a small integration surface: the template supplies stable
 * section IDs, while this shell handles the compact table of contents and the
 * main-content landmark. Fragment links remain native browser navigation.
 */
export function SkillGuideShell({ items, children, className = '' }: SkillGuideShellProps) {
  return (
    <main id="skill-guide" tabIndex={-1} className={`scroll-mt-24 ${className}`.trim()}>
      <SkillPageNav items={items} />
      {children}
    </main>
  );
}
