import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function pageWindow(currentPage: number, totalPages: number) {
  const values = new Set([1, totalPages]);
  for (let page = currentPage - 2; page <= currentPage + 2; page += 1) {
    if (page >= 1 && page <= totalPages) values.add(page);
  }
  return [...values].sort((left, right) => left - right);
}

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
  const pages = pageWindow(currentPage, totalPages);

  return (
    <nav aria-label="Skills directory pagination" className="mt-12 flex flex-wrap items-center justify-center gap-2">
      {currentPage > 1 && (
        <Link href={hrefForPage(currentPage - 1)} className="inline-flex min-h-11 items-center rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 hover:border-blue-300 hover:text-blue-700">
          <ChevronLeft aria-hidden="true" className="mr-1 h-4 w-4" /> Previous
        </Link>
      )}

      {pages.map((page, index) => {
        const previousPage = pages[index - 1];
        return (
          <span key={page} className="contents">
            {previousPage && page - previousPage > 1 && <span className="px-1 text-slate-400">…</span>}
            <Link
              href={hrefForPage(page)}
              aria-current={page === currentPage ? 'page' : undefined}
              className={`inline-flex h-11 min-w-11 items-center justify-center rounded-xl border px-3 text-sm font-semibold ${
                page === currentPage
                  ? 'border-blue-700 bg-blue-700 text-white'
                  : 'border-slate-300 bg-white text-slate-700 hover:border-blue-300 hover:text-blue-700'
              }`}
            >
              {page}
            </Link>
          </span>
        );
      })}

      {currentPage < totalPages && (
        <Link href={hrefForPage(currentPage + 1)} className="inline-flex min-h-11 items-center rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 hover:border-blue-300 hover:text-blue-700">
          Next <ChevronRight aria-hidden="true" className="ml-1 h-4 w-4" />
        </Link>
      )}
    </nav>
  );
}
