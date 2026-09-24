import type { ReactNode } from 'react';

interface SkillPageSectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  labelledBy?: string;
}

/**
 * Shared wrapper for major sections in long skill guides.
 *
 * scroll-mt keeps fragment-link targets clear of sticky site chrome, while the
 * optional aria-labelledby hook lets a visible section heading name the region
 * without duplicating text for assistive technology.
 */
export function SkillPageSection({
  id,
  children,
  className = '',
  labelledBy,
}: SkillPageSectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`scroll-mt-24 ${className}`.trim()}
    >
      {children}
    </section>
  );
}
