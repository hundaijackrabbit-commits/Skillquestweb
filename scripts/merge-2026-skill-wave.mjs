import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const canonicalPath = path.join(root, 'src/data/skills-1000plus.json');
const wavePaths = [
  path.join(root, 'src/data/skills-2026-wave1.json'),
  path.join(root, 'src/data/skills-2026-wave2.json'),
];

const canonical = JSON.parse(fs.readFileSync(canonicalPath, 'utf8'));
const waves = wavePaths.flatMap((wavePath) => fs.existsSync(wavePath)
  ? JSON.parse(fs.readFileSync(wavePath, 'utf8'))
  : []);

const normalize = (value = '') => value.trim().toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const identityKeys = (skill) => [normalize(skill.id), normalize(skill.slug), normalize(skill.name)].filter(Boolean);
const primaryKey = (skill) => normalize(skill.slug || skill.id || skill.name);

// Replace an older canonical record whenever a researched edition matches any
// of its identity fields. This lets the audit waves upgrade existing pages.
const researchedKeys = new Set(waves.flatMap(identityKeys));
const preserved = canonical.filter((skill) => !identityKeys(skill).some((key) => researchedKeys.has(key)));
const merged = [...preserved, ...waves];

// Validate actual record identity without treating legitimate cross-field
// values (for example one skill named "Communication" and another skill whose
// id happens to be "communication") as duplicate records.
const seenPrimary = new Set();
for (const skill of merged) {
  const key = primaryKey(skill);
  if (!key) throw new Error('Skill is missing id, slug, and name');
  if (seenPrimary.has(key)) throw new Error(`Duplicate skill record after merge: ${key}`);
  seenPrimary.add(key);
}

if (JSON.stringify(canonical) === JSON.stringify(merged)) {
  console.log('Canonical dataset already matches researched editions.');
  process.exit(0);
}

fs.writeFileSync(canonicalPath, `${JSON.stringify(merged, null, 2)}\n`);
console.log(`Refreshed canonical dataset with ${waves.length} researched skill editions.`);
