import Link from 'next/link';
import { ArrowRight, Globe2 } from 'lucide-react';
import { editionPath, hasChineseEdition } from '@/lib/zh-cn/edition-routes';
import type { ChineseEditionKind } from '@/lib/zh-cn/editorial-types';

/** Server-rendered bilingual link; appears only for a genuinely authored edition. */
export function ChineseEditionLink({ kind, slug }: { kind: ChineseEditionKind; slug: string }) {
  if (!hasChineseEdition(kind, slug)) return null;

  return (
    <aside className="mb-6 rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="inline-flex items-center gap-2 text-sm text-slate-700"><Globe2 aria-hidden="true" className="h-4 w-4 text-blue-700" />中文学习版本现已提供</span>
        <Link href={editionPath(kind, slug)} hrefLang="zh-CN" lang="zh-CN" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-blue-800 underline-offset-4 hover:underline">阅读简体中文版本 <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
      </div>
    </aside>
  );
}
