import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const skillsPath = path.join(root, 'src/data/skills-1000plus.json');
const overridesPath = path.join(root, 'src/data/skill-editorial-overrides.json');

const skills = JSON.parse(fs.readFileSync(skillsPath, 'utf8'));
const overrides = JSON.parse(fs.readFileSync(overridesPath, 'utf8'));

if (!Array.isArray(skills)) throw new Error('Skills dataset must be an array');
if (!overrides || typeof overrides !== 'object' || Array.isArray(overrides)) {
  throw new Error('Editorial overrides must be an object keyed by skill slug');
}

const bySlug = new Map(skills.map((skill) => [skill.slug, skill]));
const errors = [];

for (const [slug, override] of Object.entries(overrides)) {
  const base = bySlug.get(slug);
  if (!base) {
    errors.push(`${slug}: no matching base skill`);
    continue;
  }
  if (!override || typeof override !== 'object' || Array.isArray(override)) {
    errors.push(`${slug}: override must be an object`);
    continue;
  }
  if ('slug' in override && override.slug !== slug) {
    errors.push(`${slug}: override cannot change its slug`);
  }
  if ('id' in override && override.id !== base.id) {
    errors.push(`${slug}: override cannot change its id`);
  }
  if ('name' in override && override.name !== base.name) {
    errors.push(`${slug}: override cannot change its name`);
  }
  const merged = { ...base, ...override };
  if (!merged.shortDefinition || String(merged.shortDefinition).trim().length < 40) {
    errors.push(`${slug}: merged shortDefinition is missing or too thin`);
  }
}

if (errors.length) {
  console.error(`[editorial-overrides] ${errors.length} validation issue(s)`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`[editorial-overrides] ${Object.keys(overrides).length} override(s) validated against ${skills.length} base skills`);
