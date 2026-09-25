import fs from 'node:fs';
import path from 'node:path';
import { loadEffectiveSkillGraph } from './lib/effective-skills.mjs';

const root = process.cwd();
const readJson = (file) => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
const {
  allSkills,
  canonicalSkills: skills,
  resolveSkillReference,
} = loadEffectiveSkillGraph();
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

const careerBySlug = new Map(careers.map((career) => [norm(career.slug), career]));
const industryBySlug = new Map(industries.map((industry) => [norm(industry.slug), industry]));

for (const skill of skills) {
  for (const reference of skill.relatedSkills ?? []) {
    const target = resolveSkillReference(reference);
    if (target && target.slug !== skill.slug) {
      add(refs, `skill:${target.slug}`, `skill:${skill.slug}`);
    }
  }
  for (const slug of skill.careers ?? []) {
    if (careerBySlug.has(norm(slug))) add(refs, `career:${norm(slug)}`, `skill:${skill.slug}`);
  }
  for (const slug of skill.industries ?? []) {
    if (industryBySlug.has(norm(slug))) add(refs, `industry:${norm(slug)}`, `skill:${skill.slug}`);
  }
}

for (const career of careers) {
  const references = [
    ...(career.coreSkills ?? []),
    ...(career.secondarySkills ?? []),
    ...(career.transferableSkills ?? []),
  ];
  for (const reference of references) {
    const target = resolveSkillReference(reference);
    if (target) add(refs, `skill:${target.slug}`, `career:${career.slug}`);
  }
  for (const slug of career.commonIndustries ?? []) {
    if (industryBySlug.has(norm(slug))) add(refs, `industry:${norm(slug)}`, `career:${career.slug}`);
  }
}

for (const item of paths) {
  for (const reference of item.skills ?? []) {
    const target = resolveSkillReference(reference);
    if (target) {
      add(refs, `skill:${target.slug}`, `path:${item.id}`);
      // Skill pages render paths that contain the skill, so the declared
      // path -> skill relationship creates a reciprocal crawl edge in UI.
      add(refs, `path:${item.id}`, `skill:${target.slug}`);
    }
  }
  for (const slug of item.relatedCareers ?? []) {
    if (careerBySlug.has(norm(slug))) add(refs, `career:${norm(slug)}`, `path:${item.id}`);
  }
}

const blogFiles = fs.existsSync(blogDir)
  ? fs.readdirSync(blogDir).filter((name) => name.endsWith('.mdx'))
  : [];
for (const file of blogFiles) {
  const source = fs.readFileSync(path.join(blogDir, file), 'utf8');
  const slug = file.replace(/\.mdx$/, '');
  const arrays = [...source.matchAll(/(relatedSkills|relatedCareers|relatedIndustries):\s*\[([^\]]*)\]/g)];
  for (const [, field, raw] of arrays) {
    const values = [...raw.matchAll(/["']([^"']+)["']/g)].map((match) => match[1]);
    for (const value of values) {
      if (field === 'relatedSkills') {
        const target = resolveSkillReference(value);
        if (target) add(refs, `skill:${target.slug}`, `blog:${slug}`);
      } else if (field === 'relatedCareers' && careerBySlug.has(norm(value))) {
        add(refs, `career:${norm(value)}`, `blog:${slug}`);
      } else if (field === 'relatedIndustries' && industryBySlug.has(norm(value))) {
        add(refs, `industry:${norm(value)}`, `blog:${slug}`);
      }
    }
  }
}

const score = (key) => refs.get(key)?.size ?? 0;
const summarize = (type, records, keyOf, labelOf) => {
  const rows = records.map((record) => ({
    key: keyOf(record),
    label: labelOf(record),
    inbound: score(`${type}:${keyOf(record)}`),
  }));
  return {
    total: rows.length,
    orphaned: rows.filter((row) => row.inbound === 0).length,
    underlinked: rows.filter((row) => row.inbound <= 1).length,
    weakest: rows
      .sort((left, right) => left.inbound - right.inbound || left.label.localeCompare(right.label))
      .slice(0, 40),
  };
};

const report = {
  generatedAt: new Date().toISOString(),
  note: 'Effective-graph relationship audit. Editorial overrides are applied and duplicate skill names are collapsed to the same canonical winner used by the app. Path membership counts the reciprocal skill-page link rendered from that relationship. Directory pagination, topic hubs, A-Z pages, breadcrumbs, global navigation and other rendered contextual links can provide additional crawl paths not counted here.',
  skills: summarize('skill', skills, (skill) => skill.slug, (skill) => skill.name),
  careers: summarize('career', careers, (career) => career.slug, (career) => career.title),
  industries: summarize('industry', industries, (industry) => industry.slug, (industry) => industry.name),
  paths: summarize('path', paths, (item) => item.id, (item) => item.name),
  totals: {
    sourceSkillRecords: allSkills.length,
    canonicalSkills: skills.length,
    careers: careers.length,
    industries: industries.length,
    paths: paths.length,
    blogFiles: blogFiles.length,
  },
};

const outDir = path.join(root, 'reports');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'internal-link-graph.json'), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));
