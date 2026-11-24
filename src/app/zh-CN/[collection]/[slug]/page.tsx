import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, BookOpen, Globe2, ShieldCheck } from 'lucide-react';
import { chineseEditionForRoute, chineseEditionSlugs } from '@/lib/zh-cn/catalog';
import { editionPath, sourcePath } from '@/lib/zh-cn/edition-routes';
import { absoluteUrl } from '@/lib/site';

type PageProps = { params: Promise<{ collection: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return chineseEditionSlugs();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { collection, slug } = await params;
  const edition = chineseEditionForRoute(collection, slug);
  if (!edition) return { title: '未找到中文内容', robots: { index: false, follow: false } };
  const translated = absoluteUrl(editionPath(edition.kind, edition.slug));
  const original = absoluteUrl(sourcePath(edition.kind, edition.slug));
  return {
    title: edition.title,
    description: edition.description,
    alternates: {
      canonical: translated,
      languages: { 'zh-CN': translated, en: original },
    },
    openGraph: {
      locale: 'zh_CN',
      title: edition.title,
      description: edition.description,
      url: translated,
      type: 'article',
      siteName: 'Modern Skill Lab',
    },
    twitter: { card: 'summary', title: edition.title, description: edition.description },
    robots: { index: true, follow: true },
  };
}

export default async function ChineseEditionPage({ params }: PageProps) {
  const { collection, slug } = await params;
  const edition = chineseEditionForRoute(collection, slug);
  if (!edition) notFound();

  const chineseUrl = absoluteUrl(editionPath(edition.kind, edition.slug));
  const original = sourcePath(edition.kind, edition.slug);
  const structured = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    inLanguage: 'zh-CN',
    headline: edition.title,
    description: edition.description,
    datePublished: '2026-11-19',
    isBasedOn: absoluteUrl(original),
    mainEntityOfPage: chineseUrl,
    author: { '@type': 'Organization', name: 'Modern Skill Lab' },
    publisher: { '@type': 'Organization', name: 'Modern Skill Lab' },
  };

  const sectionLabel = edition.kind === 'skill' ? '技能指南' : edition.kind === 'career' ? '职业指南' : '专题文章';

  return (
    <article lang="zh-CN" dir="ltr" className="min-h-screen bg-gradient-to-b from-blue-50/60 via-white to-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured).replace(/</g, '\\u003c') }} />
      <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8 sm:py-14">
        <nav aria-label="页面导航" className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
          <Link href="/zh-CN" className="inline-flex min-h-11 items-center gap-2 font-semibold text-blue-700 hover:underline"><ArrowLeft aria-hidden="true" className="h-4 w-4" />中文学习中心</Link>
          <span className="text-slate-400" aria-hidden="true">/</span>
          <span className="text-slate-600">{sectionLabel}</span>
        </nav>

        <header className="mt-7">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-2 text-xs font-bold text-blue-800"><Globe2 className="h-4 w-4" aria-hidden="true" />简体中文 · {sectionLabel}</div>
          <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl">{edition.title}</h1>
          <p className="mt-5 text-lg leading-8 text-slate-700">{edition.subtitle}</p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <Link href={original} hrefLang="en" lang="en" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-800 hover:border-blue-500">
              Read original in English <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/zh-CN" className="inline-flex min-h-11 items-center rounded-xl bg-blue-700 px-4 py-2 font-semibold text-white hover:bg-blue-800">浏览更多中文内容</Link>
          </div>
        </header>

        <aside className="mt-9 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-amber-950">
          <div className="flex items-center gap-2 font-bold"><ShieldCheck className="h-5 w-5" aria-hidden="true" />关于中文版</div>
          <p className="mt-2">这是基于本站英文资料编写的中文教学版本，保留主要概念与实践方法，并非逐句翻译或新研究。英文来源内容最后更新：{edition.sourceReviewedAt}。对涉及职业资格、法规或最新统计的数据，请查看原始资料并核实当地要求。</p>
        </aside>

        <div className="mt-10 space-y-5 text-base leading-9 text-slate-800">
          {edition.introduction.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>

        <div className="mt-12 space-y-12">
          {edition.sections.map((section, index) => (
            <section key={section.heading} aria-labelledby={`chinese-section-${index}`} className="scroll-mt-28">
              <h2 id={`chinese-section-${index}`} className="text-2xl font-bold leading-snug text-slate-950">{section.heading}</h2>
              <div className="mt-4 space-y-4 text-base leading-9 text-slate-700">
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              {section.points && (
                <ul className="mt-5 list-disc space-y-2 pl-6 text-base leading-8 text-slate-700">
                  {section.points.map((point) => <li key={point}>{point}</li>)}
                </ul>
              )}
            </section>
          ))}
        </div>

        <section aria-labelledby="chinese-exercise" className="mt-14 rounded-3xl border border-blue-200 bg-blue-50 px-6 py-8 sm:px-9">
          <div className="flex items-center gap-2 text-sm font-semibold text-blue-800"><BookOpen className="h-5 w-5" aria-hidden="true" />动手实践</div>
          <h2 id="chinese-exercise" className="mt-3 text-2xl font-bold text-slate-950">{edition.exercise.title}</h2>
          <ol className="mt-6 list-decimal space-y-3 pl-6 text-base leading-8 text-slate-800">
            {edition.exercise.steps.map((step) => <li key={step}>{step}</li>)}
          </ol>
          <p className="mt-6 rounded-xl bg-white p-4 text-sm leading-7 text-slate-800"><strong>完成标准：</strong>{edition.exercise.success}</p>
        </section>

        {edition.references && edition.references.length > 0 && (
          <section aria-labelledby="chinese-references" className="mt-14">
            <h2 id="chinese-references" className="text-2xl font-bold text-slate-950">参考资料与核验来源</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">以下外部机构资料可用于核对英文原文中的相关结论；访问情况取决于所在地区和网络环境。</p>
            <ul className="mt-4 space-y-3">
              {edition.references.map((reference) => (
                <li key={reference.url}><a href={reference.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-blue-700 underline-offset-4 hover:underline">{reference.title} <ArrowRight aria-hidden="true" className="h-4 w-4" /></a></li>
              ))}
            </ul>
          </section>
        )}

        {edition.related && edition.related.length > 0 && (
          <section aria-labelledby="chinese-related" className="mt-14">
            <h2 id="chinese-related" className="text-2xl font-bold text-slate-950">继续学习</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {edition.related.map((related) => <Link key={related.href} href={related.href} className="flex min-h-14 items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-blue-800 hover:border-blue-400">{related.title}<ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" /></Link>)}
            </div>
          </section>
        )}

        <div className="mt-14 border-t border-slate-200 pt-8">
          <Link href="/zh-CN" className="inline-flex min-h-11 items-center gap-2 font-bold text-blue-700"><ArrowLeft aria-hidden="true" className="h-4 w-4" />返回中文学习中心</Link>
        </div>
      </div>
    </article>
  );
}
