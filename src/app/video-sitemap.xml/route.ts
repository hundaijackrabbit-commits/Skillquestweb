import { INTRO_VIDEO } from '@/lib/video-intro';
import { absoluteUrl } from '@/lib/site';

export const dynamic = 'force-static';

function escapeXml(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

export function GET() {
  const watchUrl = absoluteUrl(INTRO_VIDEO.watchPath);
  const playerUrl = INTRO_VIDEO.embedUrl;
  const thumbnailUrl = INTRO_VIDEO.thumbnailUrl;
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <url>
    <loc>${escapeXml(watchUrl)}</loc>
    <video:video>
      <video:thumbnail_loc>${escapeXml(thumbnailUrl)}</video:thumbnail_loc>
      <video:title>${escapeXml(INTRO_VIDEO.title)}</video:title>
      <video:description>${escapeXml(INTRO_VIDEO.description)}</video:description>
      <video:player_loc allow_embed="yes">${escapeXml(playerUrl)}</video:player_loc>
      <video:duration>${INTRO_VIDEO.durationSeconds}</video:duration>
      <video:publication_date>${INTRO_VIDEO.publishedAt}</video:publication_date>
    </video:video>
  </url>
</urlset>`;
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
