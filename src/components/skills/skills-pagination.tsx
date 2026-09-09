import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function SkillsPagination({
  currentPage,
  totalPages,
  hrefForPage,
}: {
  currentPage: number;
  totalPages: number;
  hrefForPage: (page: number) => string;
}) {
  if (totalPages <= 1) return null;

  const nearbyPages = Array.from(
    new Set([
      1,
      Math.max(1, currentPage - 2),
      Math.max(1, currentPage - 1),
      currentPage,
      Math.min(totalPages, currentPage + 1),
      Math.min(totalPages, currentPage + 2),
      totalPages,
    ]),
  ).sort((a, b) => a - b);

  return (
    <nav aria-label="Skills directory pagination" className="mt-12 flex flex-wrap items-center justify-center gap-2">
      {currentPage > 1 && (
        <Link
          href={hrefForPage(currentPage - 1)}
          rel="prev"
          className="inline-flex min-h-11 items-center rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 hover:border-blue-300 hover:text-blue-700"
        >
          <ChevronLeft aria-hidden="true" className="mr-1 h-4 w-4" /> Previous
        </Link>
      )}

      {nearbyPages.map((page, index) => {
        const previousPage = nearbyPages[index - 1];
        const showGap = previousPage && page - previousPage > 1;
        return (
          <span key={page} className="contents">
            {showGap && <span className="px-1 text-slate-400" aria-hidden="true">…</span>}
            {page === currentPage ? (
              <span
                aria-current="page"
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl bg-blue-700 px-3 text-sm font-bold text-white"
              >
                {page}
              </span>
            ) : (
              <Link
                href={hrefForPage(page)}
                aria-label={`Go to skills page ${page}`}
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-700 hover:border-blue-300 hover:text-blue-700"
              >
                {page}
              </Link>
            )}
          </span>
        );
      })}

      {currentPage < totalPages && (
        <Link
          href={hrefForPage(currentPage + 1)}
          rel="next"
          className="inline-flex min-h-11 items-center rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 hover:border-blue-300 hover:text-blue-700"
        >
          Next <ChevronRight aria-hidden="true" className="ml-1 h-4 w-4" />
        </Link>
      )}
    </nav>
  );
}
