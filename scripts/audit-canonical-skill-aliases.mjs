import fs from 'node:fs';
import path from 'node:path';
import {
  loadEffectiveSkillGraph,
  normalizeSkillReference,
} from './lib/effective-skills.mjs';

const root = process.cwd();
const readJson = (relativePath) =>
  JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));

const {
  allSkills,
  canonicalSkills,
  resolveSkillReference,
} = loadEffectiveSkillGraph();

const careers = readJson('src/data/careers.json');
const industries = readJson('src/data/industries.json');
const paths = readJson('src/data/skill-paths.json');

const byName = new Map();
for (const skill of allSkills) {
  const key = String(skill?.name ?? '').trim().toLocaleLowerCase('en');
  if (!byName.has(key)) byName.set(key, []);
  byName.get(key).push(skill);
}

const duplicateGroups = [];
const aliasKeys = new Map();
for (const [nameKey, records] of byName.entries()) {
  if (records.length < 2) continue;
  const canonical = canonicalSkills.find(
    (skill) => String(skill?.name ?? '').trim().toLocaleLowerCase('en') === nameKey,
  );
  if (!canonical) continue;

  const aliases = records.filter((record) => record.slug !== canonical.slug);
  duplicateGroups.push({
    name: canonical.name,
    canonicalSlug: canonical.slug,
    aliases: aliases.map((record) => record.slug),
    sourceCount: records.length,
  });

  for (const alias of aliases) {
    for (const value of [alias.id, alias.slug]) {
      const key = normalizeSkillReference(value);
      if (!key) continue;
      const canonicalTokens = new Set(
        [canonical.id, canonical.slug].map(normalizeSkillReference).filter(Boolean),
      );
      if (!canonicalTokens.has(key)) {
        aliasKeys.set(key, {
          aliasSlug: alias.slug,
          canonicalSlug: canonical.slug,
          skillName: canonical.name,
        });
      }
    }
  }
}

const aliasReferences = [];
function checkReference(source, field, reference) {
  const normalized = normalizeSkillReference(reference);
  const alias = aliasKeys.get(normalized);
  if (!alias) return;
  const resolved = resolveSkillReference(reference);
  if (!resolved || resolved.slug !== alias.canonicalSlug) return;
  aliasReferences.push({ source, field, reference, ...alias });
}

for (const skill of allSkills) {
  for (const field of ['relatedSkills', 'prerequisiteSkills', 'skillStacksWell']) {
    for (const reference of skill?.[field] ?? []) {
      checkReference(`skill:${skill.slug}`, field, reference);
    }
  }
}

for (const career of careers) {
  for (const field of ['coreSkills', 'secondarySkills', 'transferableSkills']) {
    for (const reference of career?.[field] ?? []) {
      checkReference(`career:${career.slug}`, field, reference);
    }
  }
}

for (const industry of industries) {
  for (const field of ['criticalSkills', 'emergingSkills']) {
    for (const reference of industry?.[field] ?? []) {
      checkReference(`industry:${industry.slug}`, field, reference);
    }
  }
}

for (const learningPath of paths) {
  for (const reference of learningPath?.skills ?? []) {
    checkReference(`path:${learningPath.id}`, 'skills', reference);
  }
}

const blogDir = path.join(root, 'src', 'content', 'blog');
if (fs.existsSync(blogDir)) {
  for (const file of fs.readdirSync(blogDir).filter((name) => name.endsWith('.mdx'))) {
    const source = fs.readFileSync(path.join(blogDir, file), 'utf8');
    const frontmatter = source.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
    const match = frontmatter.match(/^relatedSkills:\s*\[([^\]]*)\]/m);
    if (!match) continue;
    const values = [...match[1].matchAll(/["']([^"']+)["']/g)].map((item) => item[1]);
    for (const reference of values) {
      checkReference(`blog:${file.replace(/\.mdx$/, '')}`, 'relatedSkills', reference);
    }
  }
}

const byAlias = new Map();
for (const item of aliasReferences) {
  const key = `${item.aliasSlug} -> ${item.canonicalSlug}`;
  const current = byAlias.get(key) ?? { count: 0, examples: [] };
  current.count += 1;
  if (current.examples.length < 8) {
    current.examples.push(`${item.source}.${item.field}=${item.reference}`);
  }
  byAlias.set(key, current);
}

const report = {
  generatedAt: new Date().toISOString(),
  totals: {
    sourceSkillRecords: allSkills.length,
    canonicalSkills: canonicalSkills.length,
    duplicateGroups: duplicateGroups.length,
    duplicateExcessRecords: allSkills.length - canonicalSkills.length,
    canonicalSlugsWithNumericSuffix: duplicateGroups.filter((group) => /-\d+$/.test(group.canonicalSlug)).length,
    explicitAliasReferences: aliasReferences.length,
    referencedAliasFamilies: byAlias.size,
  },
  canonicalSlugsWithNumericSuffix: duplicateGroups
    .filter((group) => /-\d+$/.test(group.canonicalSlug))
    .sort((a, b) => a.name.localeCompare(b.name)),
  referencedAliases: [...byAlias.entries()]
    .map(([alias, detail]) => ({ alias, ...detail }))
    .sort((a, b) => b.count - a.count || a.alias.localeCompare(b.alias)),
  duplicateGroups: duplicateGroups.sort((a, b) => a.name.localeCompare(b.name)),
};

const outDir = path.join(root, 'reports');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(
  path.join(outDir, 'canonical-skill-alias-inventory.json'),
  `${JSON.stringify(report, null, 2)}\n`,
);

console.log('Modern Skill Lab canonical skill alias inventory');
console.log(JSON.stringify(report.totals, null, 2));
console.log('\nCanonical duplicate families using numeric-suffix slugs:');
for (const group of report.canonicalSlugsWithNumericSuffix.slice(0, 80)) {
  console.log(`- ${group.name}: ${group.canonicalSlug} (aliases: ${group.aliases.join(', ')})`);
}
console.log('\nExplicit references to noncanonical alias ids/slugs:');
for (const item of report.referencedAliases.slice(0, 80)) {
  console.log(`- ${item.alias}: ${item.count}`);
  for (const example of item.examples) console.log(`  • ${example}`);
}
