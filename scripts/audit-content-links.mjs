import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const readJson = (file) => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
const skills = readJson('src/data/skills-1000plus.json');
const careers = readJson('src/data/careers.json');
const industries = readJson('src/data/industries.json');
const paths = readJson('src/data/skill-paths.json');
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

const skillReferences = makeReferenceSet(skills, ['id', 'slug', 'name']);
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
const check = (source, type, references, valid) => {
  for (const reference of references) {
    if (!valid.has(normalize(reference))) broken.push({ source, type, reference });
  }
};

for (const learningPath of paths) {
  check(`path:${learningPath.id}`, 'skill', learningPath.skills, skillReferences);
  check(`path:${learningPath.id}`, 'career', learningPath.relatedCareers, careerReferences);
}

for (const industry of industries) {
  check(`industry:${industry.slug}`, 'skill', [...industry.criticalSkills, ...industry.emergingSkills], skillReferences);
  check(`industry:${industry.slug}`, 'career', industry.commonCareers, careerReferences);
}

for (const career of careers) {
  check(
    `career:${career.slug}`,
    'skill',
    [...career.coreSkills, ...career.secondarySkills, ...career.transferableSkills],
    skillReferences,
  );
  check(`career:${career.slug}`, 'industry', career.commonIndustries, industryReferences);
  check(`career:${career.slug}`, 'career', career.relatedCareers, careerReferences);
}

const blogDirectory = path.join(root, 'src', 'content', 'blog');
const blogFiles = fs.readdirSync(blogDirectory).filter((file) => file.endsWith('.mdx'));
for (const file of blogFiles) {
  const source = fs.readFileSync(path.join(blogDirectory, file), 'utf8');
  const frontmatter = source.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
  check(`blog:${file}`, 'skill', parseArray(frontmatter, 'relatedSkills'), skillReferences);
  check(`blog:${file}`, 'career', parseArray(frontmatter, 'relatedCareers'), careerReferences);
  check(`blog:${file}`, 'industry', parseArray(frontmatter, 'relatedIndustries'), industryReferences);
}

const skillsWithDeclaredConnections = skills.filter(
  (skill) =>
    skill.relatedSkills.length > 0 ||
    skill.prerequisiteSkills.length > 0 ||
    skill.careers.length > 0 ||
    skill.industries.length > 0 ||
    skill.blogPosts.length > 0,
).length;

console.log('Modern Skill Lab content-link audit');
console.log(`Skill records with declared connections: ${skillsWithDeclaredConnections.toLocaleString()} / ${skills.length.toLocaleString()}`);
console.log(`Learning paths: ${paths.length.toLocaleString()}`);
console.log(`Blog articles checked: ${blogFiles.length.toLocaleString()}`);
console.log(`Unresolved legacy dataset references: ${broken.length.toLocaleString()}`);
console.log(`Accepted legacy baseline: ${acceptedLegacyBaseline.toLocaleString()}`);
console.log(`New unresolved references above baseline: ${Math.max(0, broken.length - acceptedLegacyBaseline).toLocaleString()}`);

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
