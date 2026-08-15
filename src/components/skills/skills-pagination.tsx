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
  return (
    <nav aria-label="Skills directory pagination" className="mt-12 flex flex-wrap items-center justify-center gap-3">
      {currentPage > 1 && (
        <Link href={hrefForPage(currentPage - 1)} className="inline-flex min-h-11 items-center rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 hover:border-blue-300 hover:text-blue-700">
          <ChevronLeft aria-hidden="true" className="mr-1 h-4 w-4" /> Previous
        </Link>
      )}

      {currentPage < totalPages && (
        <Link href={hrefForPage(currentPage + 1)} className="inline-flex min-h-11 items-center rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 hover:border-blue-300 hover:text-blue-700">
          Next <ChevronRight aria-hidden="true" className="ml-1 h-4 w-4" />
        </Link>
      )}
    </nav>
  );
}
