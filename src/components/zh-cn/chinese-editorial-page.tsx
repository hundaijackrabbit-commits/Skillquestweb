import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpen, ClipboardCheck, ExternalLink, Globe2 } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import { editionPath, sourcePath, type ChineseEdition } from '@/lib/zh-cn/editorial-types';

const kindLabels = { skill: '技能指南', career: '职业指南', article: '专题文章' } as const;

export function ChineseEditorialPage({ edition }: { edition: ChineseEdition }) {
  const ownPath = editionPath(edition.kind, edition.slug);
  const englishPath = sourcePath(edition.kind, edition.slug);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: edition.title,
    description: edition.description,
    inLanguage: 'zh-CN',
    isBasedOn: absoluteUrl(englishPath),
    mainEntityOfPage: absoluteUrl(ownPath),
    dateModified: '2026-11-19',
    author: { '@type': 'Organization', name: 'Modern Skill Lab' },
    publisher: { '@type': 'Organization', name: 'Modern Skill Lab', url: absoluteUrl('/') },
  };

  return (
    <div lang="zh-CN" dir="ltr" className="min-h-screen bg-gradient-to-b from-sky-50/50 via-white to-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      <div className="mx-auto max-w-5xl px-5 pb-20 pt-9 sm:px-8 sm:pt-12">
        <nav aria-label="面包屑导航" className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
          <Link href="/zh-CN" className="font-semibold text-blue-700 hover:underline">中文学习中心</Link>
          <span aria-hidden="true">/</span>
          <span>{kindLabels[edition.kind]}</span>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="font-medium text-slate-900">{edition.title}</span>
        </nav>

        <header className="mt-9 max-w-4xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1.5 text-sm font-bold text-blue-800">
            <Globe2 className="h-4 w-4" aria-hidden="true" />简体中文 · {kindLabels[edition.kind]}
          </span>
          <h1 className="mt-5 text-3xl font-bold leading-snug tracking-tight text-slate-950 sm:text-5xl">{edition.title}</h1>
          <p className="mt-4 text-xl leading-9 text-slate-700">{edition.subtitle}</p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <Link href={englishPath} lang="en" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-800 hover:border-blue-400">English original <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            <Link href="/zh-CN#zh-editions" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-blue-700 px-4 py-2 font-semibold text-white hover:bg-blue-800">浏览更多中文指南</Link>
          </div>
          <p role="note" className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 px-5 py-4 text-sm leading-7 text-blue-950">
            本文是基于现有英文资料编写的中文编辑版，保留核心概念和实际练习，但不保证逐句对应或涵盖英文页面的每一个细节。原文资料最后审核日期为 {edition.sourceReviewedAt}；重要数据与研究结论请查阅所列来源。
          </p>
        </header>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_220px]">
          <article className="min-w-0">
            <section aria-label="导读" className="space-y-4 text-base leading-9 text-slate-700 sm:text-lg">
              {edition.introduction.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
            </section>
            {edition.sections.map((section, index) => (
              <section key={section.heading} id={`section-${index+1}`} className="mt-11 scroll-mt-28 border-t border-slate-200 pt-8">
                <h2 className="text-2xl font-bold leading-snug text-slate-950 sm:text-3xl">{section.heading}</h2>
                <div className="mt-5 space-y-4 text-base leading-9 text-slate-700">
                  {section.paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
                </div>
                {section.points && <ul className="mt-5 list-disc space-y-2 pl-6 text-base leading-8 text-slate-700">{section.points.map((point) => <li key={point}>{point}</li>)}</ul>}
              </section>
            ))}

            <section id="practice" aria-labelledby="practice-heading" className="mt-12 scroll-mt-28 rounded-3xl border border-indigo-200 bg-indigo-50 p-6 sm:p-8">
              <span className="flex items-center gap-2 text-sm font-bold text-indigo-800"><ClipboardCheck className="h-5 w-5" aria-hidden="true" />学以致用</span>
              <h2 id="practice-heading" className="mt-3 text-2xl font-bold text-indigo-950">{edition.exercise.title}</h2>
              <ol className="mt-5 list-decimal space-y-3 pl-5 text-base leading-8 text-indigo-950">{edition.exercise.steps.map((step) => <li key={step}>{step}</li>)}</ol>
              <p className="mt-6 rounded-xl bg-white px-4 py-3 text-sm leading-7 text-indigo-900"><strong>如何判断完成：</strong>{edition.exercise.success}</p>
            </section>

            {edition.references && edition.references.length > 0 && (
              <section id="references" aria-labelledby="source-heading" className="mt-12 scroll-mt-28">
                <h2 id="source-heading" className="text-2xl font-bold text-slate-950">参考资料与研究来源</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">以下链接来自相应英文指南的参考资料；部分外部网站可能因所在地区网络条件而无法访问。</p>
                <ul className="mt-4 space-y-3">{edition.references.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-1 font-semibold leading-7 text-blue-700 underline-offset-2 hover:underline">{source.title} <ExternalLink className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" /></a></li>)}</ul>
              </section>
            )}

            {edition.related && edition.related.length > 0 && (
              <section aria-labelledby="related-heading" className="mt-12">
                <h2 id="related-heading" className="text-2xl font-bold text-slate-950">继续探索相关内容</h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {edition.related.map((item) => <Link key={item.href} href={item.href} className="flex min-h-14 items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-blue-800 hover:border-blue-300 hover:shadow-sm">{item.title}<ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" /></Link>)}
                </div>
              </section>
            )}
          </article>

          <aside className="self-start lg:sticky lg:top-24">
            <nav aria-label="本文目录" className="rounded-2xl border border-slate-200 bg-white p-5">
              <h2 className="flex items-center gap-2 font-bold text-slate-950"><BookOpen className="h-4 w-4" aria-hidden="true" />本文目录</h2>
              <ol className="mt-3 space-y-3 text-sm leading-6">
                {edition.sections.map((section,index) => <li key={section.heading}><a href={`#section-${index+1}`} className="text-slate-600 hover:text-blue-700 hover:underline">{section.heading}</a></li>)}
                <li><a href="#practice" className="font-semibold text-blue-700 hover:underline">动手实践</a></li>
                {edition.references && <li><a href="#references" className="text-slate-600 hover:text-blue-700 hover:underline">参考资料</a></li>}
              </ol>
            </nav>
          </aside>
        </div>

        <footer className="mt-14 border-t border-slate-200 pt-8">
          <Link href="/zh-CN" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-blue-700 hover:underline"><ArrowLeft className="h-4 w-4" aria-hidden="true" />返回中文学习中心</Link>
        </footer>
      </div>
    </div>
  );
}
