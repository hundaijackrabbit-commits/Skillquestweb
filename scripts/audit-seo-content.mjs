import fs from 'node:fs';
import path from 'node:path';

const skillsPath = path.join(process.cwd(), 'src', 'data', 'skills-1000plus.json');
const skills = JSON.parse(fs.readFileSync(skillsPath, 'utf8'));

const genericDefinitionPatterns = [
  /^The ability to effectively /i,
  /^The capability to .* teams and organizations/i,
  /^Professional competency in .* for solving complex challenges and driving results/i,
  /^Professional competency in .* for solving complex technical challenges and driving innovation/i,
  /^Professional competency in .* to optimize human capital and organizational effectiveness/i,
  /^Strategic expertise in .* to drive business growth and competitive advantage/i,
  /^Proficiency in .* to drive revenue growth and market success/i,
  /^Proficiency in .* to leverage technology effectively in professional environments/i,
  /^The capability to .* successfully across teams, departments, and organizational boundaries/i,
];

const genericValuePatterns = [
  /is increasingly important for professional success/i,
  /today'?s competitive business environment/i,
  /rapid technological advancement makes technical skills essential/i,
  /digital transformation and evolving business landscapes/i,
  /remains relevant in the AI era by providing uniquely human capabilities/i,
];

const genericPracticePatterns = [
  /^Learn fundamental .* concepts and principles/i,
  /^Practice .* in low-risk environments/i,
  /^Apply .* skills in real professional projects/i,
  /^Develop organizational standards for /i,
  /^Underestimating .* complexity/i,
  /^Insufficient practice/i,
  /^Lack of feedback/i,
  /^Not adapting to context/i,
];

function matchesAny(value, patterns) {
  return patterns.some((pattern) => pattern.test(String(value ?? '').trim()));
}

function contentLength(skill) {
  return [
    skill.shortDefinition,
    skill.fullDefinition,
    skill.whyItMatters,
    skill.modernRelevance,
    skill.whereItShowsUp,
    skill.skillInAction,
    skill.howToPractice,
    skill.howToMeasureProgress,
    skill.evidenceSummary,
  ].reduce((total, value) => total + String(value ?? '').trim().length, 0);
}

function assess(skill) {
  const flags = [];
  if (matchesAny(skill.shortDefinition, genericDefinitionPatterns)) flags.push('generic-definition');
  if (
    matchesAny(skill.whyItMatters, genericValuePatterns) ||
    matchesAny(skill.modernRelevance, genericValuePatterns) ||
    matchesAny(skill.aiEraRelevance, genericValuePatterns)
  ) flags.push('generic-value-copy');

  const actionCopy = [
    ...(skill.beginnerActions ?? []),
    ...(skill.intermediateActions ?? []),
    ...(skill.advancedActions ?? []),
    ...(skill.commonMistakes ?? []),
  ];
  if (actionCopy.some((value) => matchesAny(value, genericPracticePatterns))) {
    flags.push('generic-development-copy');
  }
  if (!skill.whereItShowsUp?.trim() && !skill.skillInAction?.trim() && !(skill.realWorldScenarios?.length)) {
    flags.push('missing-applied-context');
  }
  if (!skill.evidenceSummary?.trim() && !(skill.scholarlyNotes?.length)) {
    flags.push('missing-evidence');
  }
  if (contentLength(skill) < 1800) flags.push('thin-overall');
  if ((skill.tools ?? []).some((tool) => /^(professional software|collaboration tools)$/i.test(tool))) {
    flags.push('generic-tools');
  }
  if ((skill.careers ?? []).length === 0) flags.push('missing-careers');

  const priority =
    flags.length * 12 +
    (skill.featured ? 45 : 0) +
    Number(skill.employerSignalValue ?? 0) * 3 +
    (matchesAny(skill.shortDefinition, genericDefinitionPatterns) ? 35 : 0) +
    (contentLength(skill) < 1800 ? 20 : 0);

  return { flags, priority, length: contentLength(skill) };
}

const groups = new Map();
for (const skill of skills) {
  const key = skill.name.trim().toLocaleLowerCase('en');
  groups.set(key, [...(groups.get(key) ?? []), skill]);
}

const duplicateGroups = [...groups.values()].filter((group) => group.length > 1);
const assessments = skills
  .map((skill) => ({ skill, ...assess(skill) }))
  .filter((entry) => entry.flags.length > 0)
  .sort((left, right) => right.priority - left.priority || left.skill.name.localeCompare(right.skill.name));

const genericDefinitions = assessments.filter((entry) => entry.flags.includes('generic-definition'));
const genericDevelopment = assessments.filter((entry) => entry.flags.includes('generic-development-copy'));
const thinOverall = assessments.filter((entry) => entry.flags.includes('thin-overall'));
const missingEvidence = assessments.filter((entry) => entry.flags.includes('missing-evidence'));

console.log('Modern Skill Lab weak-content audit');
console.log(`Source skill records: ${skills.length.toLocaleString()}`);
console.log(`Canonical skill topics: ${groups.size.toLocaleString()}`);
console.log(`Duplicate-name groups: ${duplicateGroups.length.toLocaleString()}`);
console.log(`Generic short definitions: ${genericDefinitions.length.toLocaleString()}`);
console.log(`Generic development-path copy: ${genericDevelopment.length.toLocaleString()}`);
console.log(`Thin overall guides: ${thinOverall.length.toLocaleString()}`);
console.log(`Guides without evidence notes: ${missingEvidence.length.toLocaleString()}`);

console.log('\nHighest-priority weak guides:');
for (const entry of assessments.slice(0, 40)) {
  console.log(
    `- ${entry.skill.name} [${entry.skill.slug}] priority=${entry.priority} signal=${entry.skill.employerSignalValue ?? 'n/a'}${entry.skill.featured ? ' featured' : ''} :: ${entry.flags.join(', ')}`,
  );
}

console.log('\nHighest-priority duplicate groups:');
for (const group of duplicateGroups
  .sort((left, right) => right.length - left.length)
  .slice(0, 20)) {
  console.log(`- ${group[0].name}: ${group.map((skill) => skill.slug).join(', ')}`);
}
