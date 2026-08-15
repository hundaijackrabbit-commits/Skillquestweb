import fs from 'node:fs';
import path from 'node:path';

const skillsPath = path.join(process.cwd(), 'src', 'data', 'skills-1000plus.json');
const skills = JSON.parse(fs.readFileSync(skillsPath, 'utf8'));
const generatedCopyPatterns = [
  /^The ability to effectively /i,
  /^The capability to .* teams and organizations/i,
  /^Professional competency in .* for solving complex challenges and driving results/i,
];

const groups = new Map();
for (const skill of skills) {
  const key = skill.name.trim().toLocaleLowerCase('en');
  groups.set(key, [...(groups.get(key) ?? []), skill]);
}

const duplicateGroups = [...groups.values()].filter((group) => group.length > 1);
const generatedCopy = skills.filter((skill) =>
  generatedCopyPatterns.some((pattern) => pattern.test(skill.shortDefinition ?? '')),
);

console.log('Modern Skill Lab SEO content audit');
console.log(`Source skill records: ${skills.length.toLocaleString()}`);
console.log(`Canonical skill topics: ${groups.size.toLocaleString()}`);
console.log(`Duplicate-name groups: ${duplicateGroups.length.toLocaleString()}`);
console.log(
  `Duplicate records consolidated by canonical metadata: ${(
    skills.length - groups.size
  ).toLocaleString()}`,
);
console.log(`Generated-copy definitions to rewrite: ${generatedCopy.length.toLocaleString()}`);
console.log('\nHighest-priority duplicate groups:');

for (const group of duplicateGroups
  .sort((left, right) => right.length - left.length)
  .slice(0, 20)) {
  console.log(`- ${group[0].name}: ${group.map((skill) => skill.slug).join(', ')}`);
}
