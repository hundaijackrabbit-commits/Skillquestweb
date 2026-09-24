import type { ReactNode } from 'react';
import { SkillPageSkipLink } from '@/components/skills/skill-page-skip-link';

interface SkillDetailLayoutProps {
  children: ReactNode;
}

/**
 * Accessibility and responsive presentation shell for every skill detail route.
 *
 * Keep route-wide, low-risk presentation fixes here while the large shared
 * page template is being reorganized incrementally. The descendant h1 rule has
 * higher specificity than the legacy text-5xl utility in page.tsx, so skill
 * titles scale down on constrained viewports without deleting or rewriting the
 * existing hero markup.
 */
export default function SkillDetailLayout({ children }: SkillDetailLayoutProps) {
  return (
    <>
      <SkillPageSkipLink targetId="skill-page-content" />
      <main
        id="skill-page-content"
        tabIndex={-1}
        className="scroll-mt-24 focus:outline-none [&_h1]:break-words [&_h1]:text-3xl sm:[&_h1]:text-4xl lg:[&_h1]:text-5xl"
      >
        {children}
      </main>
    </>
  );
}
