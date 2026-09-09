import { NextRequest, NextResponse } from 'next/server';
import { getSkillPaths, searchContent } from '@/lib/content';
import { TOPICS } from '@/lib/topics';

type ResolvedPage = {
  found: boolean;
  path?: string;
  label?: string;
  type?: string;
  confidence?: number;
};

const STATIC_PAGES = [
  { path: '/', label: 'Home', aliases: ['home', 'homepage', 'main page'] },
  { path: '/skills', label: 'Skills', aliases: ['skill', 'skills', 'skills page', 'skill library', 'skills library'] },
  { path: '/careers', label: 'Careers', aliases: ['career', 'careers', 'careers page', 'career library'] },
  { path: '/industries', label: 'Industries', aliases: ['industry', 'industries', 'industries page'] },
  { path: '/learn', label: 'Learn', aliases: ['learn', 'learning', 'learning hub', 'learn page'] },
  { path: '/paths', label: 'Learning Paths', aliases: ['path', 'paths', 'learning path', 'learning paths', 'skill path', 'skill paths'] },
  { path: '/blog', label: 'Blog', aliases: ['blog', 'articles', 'article library'] },
  { path: '/community', label: 'Community', aliases: ['community', 'community page'] },
  { path: '/dashboard', label: 'Dashboard', aliases: ['dashboard', 'my dashboard', 'my account', 'profile'] },
  { path: '/free-career-guide', label: 'Free Career Guide', aliases: ['free career guide', 'career guide'] },
  { path: '/topics', label: 'Topics', aliases: ['topic', 'topics', 'topics page'] },
  { path: '/about', label: 'About', aliases: ['about', 'about us', 'about page'] },
  { path: '/privacy', label: 'Privacy', aliases: ['privacy', 'privacy page', 'privacy policy'] },
] as const;

function normalize(value: string) {
  return value
    .toLocaleLowerCase('en')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractRequestedTitle(input: string) {
  let value = normalize(input);
  value = value
    .replace(/^(?:please\s+)?(?:take me(?: to)?|go(?: to)?|open|show me|navigate(?: me)?(?: to)?|bring me(?: to)?|visit|head(?: to)?|send me(?: to)?)\s+/, '')
    .replace(/^the\s+/, '')
    .replace(/\s+(?:for me|please)$/, '')
    .replace(/\s+(?:page|section)$/, '')
    .trim();

  // Phrases such as "AI literacy skill page" should resolve to the skill itself,
  // while a bare "skills page" remains the top-level Skills directory.
  value = value
    .replace(/\s+(?:skill|career|industry|article|blog post|topic|learning path)\s+page$/, '')
    .replace(/\s+(?:skill|career|industry|article|blog post|topic|learning path)$/, '')
    .trim();

  return value;
}

function exactStaticPage(query: string) {
  const normalized = normalize(query);
  return STATIC_PAGES.find((page) => page.aliases.some((alias) => normalize(alias) === normalized));
}

function similarity(a: string, b: string) {
  const left = normalize(a);
  const right = normalize(b);
  if (!left || !right) return 0;
  if (left === right) return 1;
  if (left.includes(right) || right.includes(left)) return 0.92;

  const aTokens = new Set(left.split(' '));
  const bTokens = new Set(right.split(' '));
  let overlap = 0;
  for (const token of aTokens) if (bTokens.has(token)) overlap += 1;
  return overlap / Math.max(aTokens.size, bTokens.size);
}

async function resolvePage(rawQuery: string): Promise<ResolvedPage> {
  const requested = extractRequestedTitle(rawQuery);
  if (!requested) return { found: false };

  const staticMatch = exactStaticPage(requested);
  if (staticMatch) {
    return { found: true, path: staticMatch.path, label: staticMatch.label, type: 'section', confidence: 1 };
  }

  // Search the same canonical content source that powers discovery and the sitemap.
  const contentResults = await searchContent(requested);
  const bestContent = contentResults[0];
  if (bestContent) {
    const score = Math.max(bestContent.relevance ?? 0, similarity(requested, bestContent.title));
    if (score >= 0.52) {
      const base = bestContent.type === 'skill' ? '/skills'
        : bestContent.type === 'career' ? '/careers'
        : bestContent.type === 'industry' ? '/industries'
        : '/blog';
      return {
        found: true,
        path: `${base}/${bestContent.slug}`,
        label: bestContent.title,
        type: bestContent.type,
        confidence: Number(score.toFixed(3)),
      };
    }
  }

  const topic = TOPICS
    .map((item) => ({ item, score: Math.max(similarity(requested, item.name), similarity(requested, item.slug)) }))
    .sort((a, b) => b.score - a.score)[0];
  if (topic && topic.score >= 0.7) {
    return {
      found: true,
      path: `/topics/${topic.item.slug}`,
      label: topic.item.name,
      type: 'topic',
      confidence: Number(topic.score.toFixed(3)),
    };
  }

  const paths = await getSkillPaths();
  const learningPath = paths
    .map((item) => ({ item, score: Math.max(similarity(requested, item.name), similarity(requested, item.id)) }))
    .sort((a, b) => b.score - a.score)[0];
  if (learningPath && learningPath.score >= 0.7) {
    return {
      found: true,
      path: `/paths/${learningPath.item.id}`,
      label: learningPath.item.name,
      type: 'path',
      confidence: Number(learningPath.score.toFixed(3)),
    };
  }

  return { found: false };
}

function getQueryFromBody(body: unknown) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return '';
  const record = body as Record<string, unknown>;
  for (const value of [record.query, record.text, record.destination, record.title]) {
    if (typeof value === 'string' && value.trim()) return value.trim().slice(0, 240);
  }
  return '';
}

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q')?.slice(0, 240).trim() ?? '';
  if (!query) return NextResponse.json({ found: false, error: 'Missing q' }, { status: 400 });
  return NextResponse.json(await resolvePage(query), { headers: { 'Cache-Control': 'private, max-age=60' } });
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try { body = await request.json(); } catch {
    return NextResponse.json({ found: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const query = getQueryFromBody(body);
  if (!query) return NextResponse.json({ found: false, error: 'Missing query' }, { status: 400 });
  return NextResponse.json(await resolvePage(query), { headers: { 'Cache-Control': 'no-store' } });
}
