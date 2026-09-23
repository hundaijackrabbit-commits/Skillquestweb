interface SkillPageSkipLinkProps {
  targetId?: string;
}

/**
 * Lets keyboard and assistive-technology users bypass the hero and supporting
 * modules to reach the primary skill guide directly.
 */
export function SkillPageSkipLink({ targetId = 'skill-guide' }: SkillPageSkipLinkProps) {
  return (
    <a
      href={`#${targetId}`}
      className="sr-only fixed left-4 top-4 z-[100] rounded-lg bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-xl focus:not-sr-only focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      Skip to skill guide
    </a>
  );
}
