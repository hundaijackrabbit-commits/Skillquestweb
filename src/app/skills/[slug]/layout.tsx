import type { ReactNode } from 'react';
import { SkillPageSkipLink } from '@/components/skills/skill-page-skip-link';

interface SkillDetailLayoutProps {
  children: ReactNode;
}

/**
 * Accessibility shell for every skill detail route.
 *
 * This is intentionally a small integration step before the larger page.tsx
 * content reorder. It wires the skip control into the real route without
 * changing or deleting any existing skill-page modules.
 */
export default function SkillDetailLayout({ children }: SkillDetailLayoutProps) {
  return (
    <>
      <SkillPageSkipLink targetId="skill-page-content" />
      <div id="skill-page-content" tabIndex={-1} className="scroll-mt-24 focus:outline-none">
        {children}
      </div>
    </>
  );
}
