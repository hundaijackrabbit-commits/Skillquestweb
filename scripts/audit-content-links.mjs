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
// Temporary guardrail inherited from the raw-dataset audit. Once the effective
// graph has been measured in CI, replace this with its own observed baseline.
const acceptedLegacyBaseline = 814;

const normalize = (value) =>
  String(value ?? '')
    .trim()
    .toLocaleLowerCase('en')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const makeReferenceSet = (records, fields) =>
  new Set(records.flatMap((record) => fields.map((field) => normalize(record[field]))));

const careerReferences = makeReferenceSet(careers, ['id', 'slug', 'title']);
const industryReferences = makeReferenceSet(industries, ['id', 'slug', 'name']);

function parseArray(frontmatter, key) {
  const match = frontmatter.match(new RegExp(`^${key}:\\s*\\[(.*?)\\]`, 'm'));
  if (!match) return [];
  return match[1]
    .split(',')
    .map((value) => value.trim().replace(/^['"]|['"]$/g, ''))
    .filter(Boolean);
}

const broken = [];
const checkSet = (source, type, references, valid) => {
  for (const reference of references ?? []) {
    if (!valid.has(normalize(reference))) broken.push({ source, type, reference });
  }
};
const checkSkills = (source, references) => {
  for (const reference of references ?? []) {
    if (!resolveSkillReference(reference)) broken.push({ source, type: 'skill', reference });
  }
};

for (const learningPath of paths) {
  checkSkills(`path:${learningPath.id}`, learningPath.skills);
  checkSet(`path:${learningPath.id}`, 'career', learningPath.relatedCareers, careerReferences);
}

for (const industry of industries) {
  checkSkills(`industry:${industry.slug}`, [
    ...(industry.criticalSkills ?? []),
    ...(industry.emergingSkills ?? []),
  ]);
  checkSet(`industry:${industry.slug}`, 'career', industry.commonCareers, careerReferences);
}

for (const career of careers) {
  checkSkills(`career:${career.slug}`, [
    ...(career.coreSkills ?? []),
    ...(career.secondarySkills ?? []),
    ...(career.transferableSkills ?? []),
  ]);
  checkSet(`career:${career.slug}`, 'industry', career.commonIndustries, industryReferences);
  checkSet(`career:${career.slug}`, 'career', career.relatedCareers, careerReferences);
}

const blogDirectory = path.join(root, 'src', 'content', 'blog');
const blogFiles = fs.readdirSync(blogDirectory).filter((file) => file.endsWith('.mdx'));
for (const file of blogFiles) {
  const source = fs.readFileSync(path.join(blogDirectory, file), 'utf8');
  const frontmatter = source.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
  checkSkills(`blog:${file}`, parseArray(frontmatter, 'relatedSkills'));
  checkSet(`blog:${file}`, 'career', parseArray(frontmatter, 'relatedCareers'), careerReferences);
  checkSet(`blog:${file}`, 'industry', parseArray(frontmatter, 'relatedIndustries'), industryReferences);
}

const skillsWithDeclaredConnections = skills.filter(
  (skill) =>
    (skill.relatedSkills?.length ?? 0) > 0 ||
    (skill.prerequisiteSkills?.length ?? 0) > 0 ||
    (skill.careers?.length ?? 0) > 0 ||
    (skill.industries?.length ?? 0) > 0 ||
    (skill.blogPosts?.length ?? 0) > 0,
).length;

console.log('Modern Skill Lab content-link audit');
console.log(`Effective canonical skills: ${skills.length.toLocaleString()} / ${allSkills.length.toLocaleString()} source records`);
console.log(`Canonical skills with declared connections: ${skillsWithDeclaredConnections.toLocaleString()} / ${skills.length.toLocaleString()}`);
console.log(`Learning paths: ${paths.length.toLocaleString()}`);
console.log(`Blog articles checked: ${blogFiles.length.toLocaleString()}`);
console.log(`Unresolved effective-graph references: ${broken.length.toLocaleString()}`);
console.log(`Historical raw-dataset strict ceiling: ${acceptedLegacyBaseline.toLocaleString()}`);

if (broken.length > 0) {
  const grouped = new Map();
  for (const item of broken) {
    const key = `${item.source.split(':')[0]} -> ${item.type}`;
    grouped.set(key, (grouped.get(key) ?? 0) + 1);
  }
  console.log('\nUnresolved references by source:');
  for (const [key, count] of [...grouped.entries()].sort((left, right) => right[1] - left[1])) {
    console.log(`- ${key}: ${count.toLocaleString()}`);
  }
  console.log('\nUnresolved references (first 60):');
  for (const item of broken.slice(0, 60)) {
    console.log(`- ${item.source} -> ${item.type}:${item.reference}`);
  }
}

if (process.argv.includes('--strict') && broken.length > acceptedLegacyBaseline) {
  process.exitCode = 1;
}
