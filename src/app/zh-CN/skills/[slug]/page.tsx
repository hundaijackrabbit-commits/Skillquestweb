import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ChineseEditorialPage } from '@/components/zh-cn/chinese-editorial-page';
import { chineseAlternateLanguages, editionPath, findChineseEdition, listChineseEditions } from '@/lib/zh-cn';
import { absoluteUrl } from '@/lib/site';

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return listChineseEditions('skill').map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const edition = findChineseEdition('skill', slug);
  if (!edition) return { title: '未找到中文内容', robots: { index: false, follow: true } };
  const path = editionPath('skill', edition.slug);
  return {
    title: edition.title,
    description: edition.description,
    alternates: {
      canonical: path,
      languages: chineseAlternateLanguages('skill', edition.slug),
    },
    openGraph: {
      title: edition.title,
      description: edition.description,
      url: absoluteUrl(path),
      type: 'article',
      locale: 'zh_CN',
    },
    robots: { index: true, follow: true },
    other: { 'content-language': 'zh-CN' },
  };
}

export default async function ChineseSkillPage({ params }: Props) {
  const { slug } = await params;
  const edition = findChineseEdition('skill', slug);
  if (!edition) notFound();
  return <ChineseEditorialPage edition={edition} />;
}
