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
const keys = (skill) => [normalize(skill.id), normalize(skill.slug), normalize(skill.name)].filter(Boolean);

const researchedKeys = new Set(waves.flatMap(keys));
const preserved = canonical.filter((skill) => !keys(skill).some((key) => researchedKeys.has(key)));
const merged = [...preserved, ...waves];

const seen = new Set();
for (const skill of merged) {
  for (const key of keys(skill)) {
    if (seen.has(key)) throw new Error(`Duplicate skill key after merge: ${key}`);
    seen.add(key);
  }
}

if (JSON.stringify(canonical) === JSON.stringify(merged)) {
  console.log('Canonical dataset already matches researched editions.');
  process.exit(0);
}

fs.writeFileSync(canonicalPath, `${JSON.stringify(merged, null, 2)}\n`);
console.log(`Refreshed canonical dataset with ${waves.length} researched skill editions.`);
