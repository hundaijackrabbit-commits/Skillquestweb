import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const canonicalPath = path.join(root, 'src/data/skills-1000plus.json');
const wavePath = path.join(root, 'src/data/skills-2026-wave1.json');

const canonical = JSON.parse(fs.readFileSync(canonicalPath, 'utf8'));
const wave = JSON.parse(fs.readFileSync(wavePath, 'utf8'));

const normalize = (value = '') => value
  .trim()
  .toLowerCase()
  .replace(/&/g, ' and ')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const existingIds = new Set(canonical.map((skill) => normalize(skill.id)));
const existingSlugs = new Set(canonical.map((skill) => normalize(skill.slug)));
const existingNames = new Set(canonical.map((skill) => normalize(skill.name)));
const accepted = [];

for (const skill of wave) {
  const keys = [normalize(skill.id), normalize(skill.slug), normalize(skill.name)];
  if (existingIds.has(keys[0]) || existingSlugs.has(keys[1]) || existingNames.has(keys[2])) {
    console.log(`Skipping duplicate skill: ${skill.name}`);
    continue;
  }
  if (accepted.some((candidate) => {
    const candidateKeys = [normalize(candidate.id), normalize(candidate.slug), normalize(candidate.name)];
    return candidateKeys[0] === keys[0] || candidateKeys[1] === keys[1] || candidateKeys[2] === keys[2];
  })) {
    throw new Error(`Duplicate inside wave file: ${skill.name}`);
  }
  accepted.push(skill);
  existingIds.add(keys[0]);
  existingSlugs.add(keys[1]);
  existingNames.add(keys[2]);
}

if (!accepted.length) {
  console.log('No new skills to merge.');
  process.exit(0);
}

const merged = [...canonical, ...accepted];
fs.writeFileSync(canonicalPath, `${JSON.stringify(merged, null, 2)}\n`);
console.log(`Merged ${accepted.length} new skills into canonical dataset.`);
