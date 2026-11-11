/**
 * Read-only inventory for the November 2026 editorial refresh.
 * Run: node scripts/audit-blog-freshness.mjs
 * Never changes publication or modification dates automatically.
 */
import fs from 'node:fs';
import path from 'node:path';

const dir = path.join(process.cwd(), 'src/content/blog');
const cutoff = '2026-11-01';
const files = fs.readdirSync(dir).filter((name) => name.endsWith('.mdx')).sort();
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
  const hasSource = /https?:\/\//.test(source.replace(frontmatter?.[0] ?? '', ''));
  const flags = [];
  if (!frontmatter) flags.push('missing-frontmatter');
  if (!publishedAt) flags.push('missing-publishedAt');
  if (!lastUpdated) flags.push('missing-lastUpdated');
  if (lastUpdated && lastUpdated < cutoff) flags.push('needs-november-review');
  if (lastUpdated && lastUpdated > '2026-11-30') flags.push('future-dated');
  if (!hasSource) flags.push('no-external-source-in-body');
  return { file, title: field('title'), publishedAt, lastUpdated, hasSource, flags };
});
console.log(JSON.stringify({
  auditMonth: '2026-11',
  totalArticles: report.length,
  needingReview: report.filter((row) => row.flags.length > 0).length,
  articles: report,
}, null, 2));
