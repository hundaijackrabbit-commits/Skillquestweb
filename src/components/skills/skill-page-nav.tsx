interface SkillPageNavItem {
  id: string;
  label: string;
}

interface SkillPageNavProps {
  items: SkillPageNavItem[];
}

/**
 * Compact in-page navigation for long skill guides.
 *
 * Uses ordinary fragment links so it works without client-side JavaScript,
 * follows native browser focus/navigation behavior, and remains useful on
 * narrow screens where a sticky sidebar would consume too much space.
 */
export function SkillPageNav({ items }: SkillPageNavProps) {
  if (items.length < 2) return null;

  return (
    <nav
      aria-label="On this skill page"
      className="mb-8 rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-4 sm:px-5"
    >
      <div className="mb-3 text-sm font-semibold text-slate-900">On this page</div>
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="inline-flex min-h-10 items-center rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-300 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
