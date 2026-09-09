import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const readJson = (file) => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
const skills = readJson('src/data/skills-1000plus.json');
const careers = readJson('src/data/careers.json');
const industries = readJson('src/data/industries.json');
const paths = readJson('src/data/skill-paths.json');
const blogDir = path.join(root, 'src/content/blog');

const norm = (value) => String(value ?? '').trim().toLowerCase();
const add = (map, key, source) => {
  if (!key) return;
  if (!map.has(key)) map.set(key, new Set());
  map.get(key).add(source);
};
const refs = new Map();

const skillById = new Map(skills.map((s) => [norm(s.id), s]));
const skillBySlug = new Map(skills.map((s) => [norm(s.slug), s]));
const careerBySlug = new Map(careers.map((c) => [norm(c.slug), c]));
const industryBySlug = new Map(industries.map((i) => [norm(i.slug), i]));
const pathById = new Map(paths.map((p) => [norm(p.id), p]));

for (const skill of skills) {
  for (const id of skill.relatedSkills ?? []) {
    const target = skillById.get(norm(id)) ?? skillBySlug.get(norm(id));
    if (target) add(refs, `skill:${target.slug}`, `skill:${skill.slug}`);
  }
  for (const slug of skill.careers ?? []) if (careerBySlug.has(norm(slug))) add(refs, `career:${norm(slug)}`, `skill:${skill.slug}`);
  for (const slug of skill.industries ?? []) if (industryBySlug.has(norm(slug))) add(refs, `industry:${norm(slug)}`, `skill:${skill.slug}`);
}

for (const career of careers) {
  const ids = [...(career.coreSkills ?? []), ...(career.secondarySkills ?? []), ...(career.transferableSkills ?? [])];
  for (const id of ids) {
    const target = skillById.get(norm(id)) ?? skillBySlug.get(norm(id));
    if (target) add(refs, `skill:${target.slug}`, `career:${career.slug}`);
  }
  for (const slug of career.commonIndustries ?? []) if (industryBySlug.has(norm(slug))) add(refs, `industry:${norm(slug)}`, `career:${career.slug}`);
}

for (const item of paths) {
  for (const id of item.skills ?? []) {
    const target = skillById.get(norm(id)) ?? skillBySlug.get(norm(id));
    if (target) add(refs, `skill:${target.slug}`, `path:${item.id}`);
  }
  for (const slug of item.relatedCareers ?? []) if (careerBySlug.has(norm(slug))) add(refs, `career:${norm(slug)}`, `path:${item.id}`);
}

const blogFiles = fs.existsSync(blogDir) ? fs.readdirSync(blogDir).filter((name) => name.endsWith('.mdx')) : [];
for (const file of blogFiles) {
  const source = fs.readFileSync(path.join(blogDir, file), 'utf8');
  const slug = file.replace(/\.mdx$/, '');
  const arrays = [...source.matchAll(/(relatedSkills|relatedCareers|relatedIndustries):\s*\[([^\]]*)\]/g)];
  for (const [, field, raw] of arrays) {
    const values = [...raw.matchAll(/["']([^"']+)["']/g)].map((m) => m[1]);
    for (const value of values) {
      if (field === 'relatedSkills') {
        const target = skillById.get(norm(value)) ?? skillBySlug.get(norm(value));
        if (target) add(refs, `skill:${target.slug}`, `blog:${slug}`);
      } else if (field === 'relatedCareers' && careerBySlug.has(norm(value))) add(refs, `career:${norm(value)}`, `blog:${slug}`);
      else if (field === 'relatedIndustries' && industryBySlug.has(norm(value))) add(refs, `industry:${norm(value)}`, `blog:${slug}`);
    }
  }
}

const score = (key) => refs.get(key)?.size ?? 0;
const summarize = (type, records, keyOf, labelOf) => {
  const rows = records.map((record) => ({ key: keyOf(record), label: labelOf(record), inbound: score(`${type}:${keyOf(record)}`) }));
  return {
    total: rows.length,
    orphaned: rows.filter((r) => r.inbound === 0).length,
    underlinked: rows.filter((r) => r.inbound <= 1).length,
    weakest: rows.sort((a, b) => a.inbound - b.inbound || a.label.localeCompare(b.label)).slice(0, 40),
  };
};

const report = {
  generatedAt: new Date().toISOString(),
  note: 'Relationship-data audit only. Directory pagination, topic hubs, A-Z pages, breadcrumbs, global navigation and rendered contextual links can provide additional crawl paths not counted here.',
  skills: summarize('skill', skills, (s) => s.slug, (s) => s.name),
  careers: summarize('career', careers, (c) => c.slug, (c) => c.title),
  industries: summarize('industry', industries, (i) => i.slug, (i) => i.name),
  paths: summarize('path', paths, (p) => p.id, (p) => p.name),
  totals: { skills: skills.length, careers: careers.length, industries: industries.length, paths: paths.length, blogFiles: blogFiles.length },
};

const outDir = path.join(root, 'reports');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'internal-link-graph.json'), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
