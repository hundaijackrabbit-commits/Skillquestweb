/**
 * Read-only inventory for the November 2026 editorial refresh.
 * Run: node scripts/audit-blog-freshness.mjs
 * Never changes publication or modification dates automatically.
 */
import fs from 'node:fs';
import path from 'node:path';

const dir = path.join(process.cwd(), 'src/content/blog');
const cutoff = '2026-11-01';
const today = '2026-11-10';
const files = fs.readdirSync(dir).filter((name) => name.endsWith('.mdx')).sort();
const isValidDate = (value) => /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
const report = files.map((file) => {
  const source = fs.readFileSync(path.join(dir, file), 'utf8');
  const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const field = (name) => {
    const line = frontmatter?.[1].split(/\r?\n/).find((entry) => entry.startsWith(name + ':'));
    const match = line ? [line, line.slice(name.length + 1).trim().replace(/^["']|["']$/g, '')] : null;
    return match?.[1]?.trim() ?? '';
  };
  const lastUpdated = field('lastUpdated');
  const publishedAt = field('publishedAt');
  const body = source.replace(frontmatter?.[0] ?? '', '');
  const sourceUrls = [...body.matchAll(/https?:\/\/[^\s)]+/g)].map((match) => match[0]);
  const hasSource = sourceUrls.length > 0;
  const internalBlogLinks = [...body.matchAll(/\]\(\/blog\/([^)#?]+)(?:[)#?])/g)].map((match) => match[1]);
  const datedRevisionNotes = [...body.matchAll(/(?:updated|revised|rewritten|reviewed)[^\n.]{0,100}(?:August|September|October) 2026/gi)].map((match) => match[0]);
  const flags = [];
  if (!frontmatter) flags.push('missing-frontmatter');
  if (!publishedAt) flags.push('missing-publishedAt');
  if (!lastUpdated) flags.push('missing-lastUpdated');
  if (publishedAt && !isValidDate(publishedAt)) flags.push('invalid-publishedAt');
  if (lastUpdated && !isValidDate(lastUpdated)) flags.push('invalid-lastUpdated');
  if (field('slug') !== path.basename(file, '.mdx')) flags.push('slug-filename-mismatch');
  if (!field('title')) flags.push('missing-title');
  if (!field('excerpt')) flags.push('missing-excerpt');
  if (lastUpdated && lastUpdated < cutoff) flags.push('needs-november-review');
  if (lastUpdated && lastUpdated > today) flags.push('future-dated');
  if (publishedAt && lastUpdated && lastUpdated < publishedAt) flags.push('update-before-publication');
  if (lastUpdated >= cutoff && sourceUrls.length < 2) flags.push('few-evidence-links');
  if (lastUpdated >= cutoff && !/November 2026/i.test(body)) flags.push('missing-november-context');
  if (datedRevisionNotes.length && lastUpdated >= cutoff && !/(?:November 2026|November 10, 2026)/i.test(body.slice(-2200))) flags.push('old-revision-note-needs-context');
  if (!hasSource) flags.push('no-external-source-in-body');
  return { file, title: field('title'), publishedAt, lastUpdated, sourceCount: sourceUrls.length, internalBlogLinks, datedRevisionNotes, hasSource, flags };
});
const knownSlugs = new Set(report.map((row) => path.basename(row.file, '.mdx')));
for (const row of report) {
  for (const slug of row.internalBlogLinks) {
    if (!knownSlugs.has(slug)) row.flags.push('unresolved-blog-link:' + slug);
  }
}
console.log(JSON.stringify({
  auditMonth: '2026-11',
  totalArticles: report.length,
  needingReview: report.filter((row) => row.flags.length > 0).length,
  novemberReviewed: report.filter((row) => row.lastUpdated >= cutoff && row.lastUpdated <= today && !row.flags.length).length,
  flagCounts: Object.fromEntries([...new Set(report.flatMap((row) => row.flags.map((flag) => flag.split(':')[0])))].sort().map((flag) => [flag, report.filter((row) => row.flags.some((item) => item.split(':')[0] === flag)).length])),
  articles: report,
}, null, 2));

if (process.argv.includes('--strict') && report.some((row) => row.flags.length > 0)) process.exitCode = 1;
