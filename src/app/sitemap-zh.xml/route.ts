import { absoluteUrl } from '@/lib/site';
import { editionPath, listChineseEditions, sourcePath } from '@/lib/zh-cn';

const entities: Record<string, string> = {
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;',
};
const escapeXml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => entities[char] ?? char);

export function GET() {
  const urls = [
    { chinese: '/zh-CN', english: '/' },
    ...(['skill', 'career', 'article'] as const).flatMap((kind) =>
      listChineseEditions(kind).map(({ slug }) => ({
        chinese: editionPath(kind, slug), english: sourcePath(kind, slug),
      }))
    ),
  ];
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...urls.map(({ chinese, english }) => [
      '  <url>',
      `    <loc>${escapeXml(absoluteUrl(chinese))}</loc>`,
      `    <xhtml:link rel="alternate" hreflang="zh-CN" href="${escapeXml(absoluteUrl(chinese))}"/>`,
      `    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(absoluteUrl(english))}"/>`,
      '    <changefreq>monthly</changefreq>',
      '  </url>',
    ].join('\n')),
    '</urlset>',
  ].join('\n');
  return new Response(xml, {
    status: 200,
    headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Content-Language': 'zh-CN',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=86400' },
  });
}
