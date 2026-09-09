import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const enhancementPath = path.join(root, 'src/data/skills-2026-enhancements.json');
const targets = [
  path.join(root, 'src/data/skills-2026-wave1.json'),
  path.join(root, 'src/data/skills-2026-wave2.json'),
  path.join(root, 'src/data/skills-1000plus.json'),
];
const enhancements = JSON.parse(fs.readFileSync(enhancementPath, 'utf8'));
const byId = new Map(enhancements.map((item) => [item.id, item]));
for (const target of targets) {
  if (!fs.existsSync(target)) continue;
  const data = JSON.parse(fs.readFileSync(target, 'utf8'));
  let changed = 0;
  const updated = data.map((skill) => {
    const patch = byId.get(skill.id);
    if (!patch) return skill;
    changed += 1;
    return { ...skill, ...patch, id: skill.id, slug: skill.slug, name: skill.name };
  });
  fs.writeFileSync(target, `${JSON.stringify(updated, null, 2)}\n`);
  console.log(`${path.basename(target)}: enhanced ${changed} audited skills`);
}
