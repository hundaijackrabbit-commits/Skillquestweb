import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const readJson = (file) => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
const skills = readJson('src/data/skills-1000plus.json');
const careers = readJson('src/data/careers.json');
const industries = readJson('src/data/industries.json');
const paths = readJson('src/data/skill-paths.json');
const blogDirectory = path.join(root, 'src', 'content', 'blog');

const placeholderTitlePattern = /\b(?:specialized|professional) skill \d+\b/i;
const genericDefinitionPatterns = [
  /^The ability to effectively /i,
  /^The capability to .* teams and organizations/i,
  /^Professional competency in .* for solving complex challenges and driving results/i,
];
const genericLongDefinitionPatterns = [
  /encompasses comprehensive understanding and practical application of relevant principles, methodologies, and best practices/i,
  /requires systematic development through training, practice, and real-world application to achieve mastery/i,
];
const genericValuePatterns = [
  /is increasingly important for professional success, enabling individuals to contribute more effectively to organizational goals/i,
  /is increasingly important for professional success, enabling individuals to contribute value in today'?s competitive business environment/i,
  /highly relevant in today'?s fast-paced, technology-enabled business environment/i,
  /digital transformation and evolving business landscapes have made this skill more critical than ever/i,
  /digital transformation and remote work have made this skill more critical than ever/i,
  /critical in the AI era where professionals must understand how to leverage artificial intelligence/i,
  /essential for success in hybrid and remote work environments where traditional face-to-face interaction patterns have been disrupted/i,
  /is crucial for .* in today'?s competitive business environment\. Organizations increasingly value professionals/i,
  /directly impacts revenue growth and business sustainability by ensuring customers achieve their desired outcomes/i,
  /increasingly vital as businesses shift from product-centric to customer-centric models/i,
  /is crucial for remaining competitive in our increasingly digital and AI-driven economy/i,
  /remains relevant in the AI era by providing uniquely human capabilities that complement artificial intelligence/i,
  /remains highly relevant by providing strategic thinking and human judgment capabilities that complement artificial intelligence/i,
  /maintains relevance in the AI era by complementing technological capabilities with human insight and judgment/i,
  /evolves in the AI era, requiring understanding of how AI tools can augment traditional technical capabilities/i,
  /is central to (?:success in the AI era|AI-era success)/i,
  /remains relevant by providing uniquely human capabilities that complement artificial intelligence/i,
  /leverages uniquely human capabilities like emotional intelligence, creativity, and complex judgment that AI cannot replicate/i,
  /leverages uniquely human capabilities including strategic thinking, emotional intelligence, complex problem-solving, and contextual judgment/i,
  /requires .* that AI cannot fully replicate/i,
  /leverages human capabilities like creativity, emotional intelligence, and complex judgment/i,
];
const genericPracticePatterns = [
  /^Develop .* through daily application, structured practice, professional development programs, and mentorship opportunities\.?$/i,
  /^Measure .* progress through performance metrics, feedback collection, and outcome tracking\.?$/i,
  /^Seek opportunities to apply .* in current role, join relevant professional communities, volunteer for challenging assignments/i,
  /^Track project outcomes and performance metrics related to .* application, collect feedback from supervisors and peers/i,
  /^Develop .* through hands-on application, structured learning programs, professional development opportunities/i,
  /^Measure .* progress through performance metrics, stakeholder feedback, project outcomes/i,
];
const genericCareerPatterns = [
  /work across various contexts to deliver value through specialized expertise and professional services/i,
  /apply specialized expertise to solve complex challenges and deliver value within their professional domains/i,
  /leverage specialized expertise to drive organizational success through focused application of industry knowledge/i,
];
const genericCareerEvidencePatterns = [
  /^Bachelor'?s degree typically preferred, though relevant experience and skills often valued equally/i,
  /^Relevant degree or equivalent experience typically required/i,
  /^Education requirements vary by role/i,
  /^Relevant education and experience requirements vary by role/i,
  /^Stable to positive growth outlook with evolving skill requirements/i,
  /^Growth outlook varies by specialization/i,
  /^Growth prospects vary by specialization/i,
];
const genericPathPattern = /^Develop comprehensive expertise in .* through structured learning and practical application\.?$/i;
const repeatedBlogPatterns = [
  /This topic matters because it shapes how professionals make decisions, collaborate with others, and create results that other people can actually trust/i,
  /Do not think of this as a one-time lesson\. Think of it as a professional advantage that compounds/i,
];

const normalize = (value) =>
  String(value ?? '')
    .toLocaleLowerCase('en')
    .replace(/https?:\/\/\S+/g, ' ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');

const words = (value) => normalize(value).split(' ').filter(Boolean);
const isLongPassage = (value) => words(value).length >= 18;

function canonicalSkillRecords(records) {
  const groups = new Map();
  for (const skill of records) {
    const key = normalize(skill.name);
    const current = groups.get(key);
    const length = [
      skill.shortDefinition,
      skill.fullDefinition,
      skill.whyItMatters,
      skill.modernRelevance,
      skill.aiEraRelevance,
    ].join(' ').length;
    if (!current || length > current.length) groups.set(key, { skill, length });
  }
  return [...groups.values()].map(({ skill }) => skill);
}

function isIndexableSkill(skill) {
  const coreLength = [
    skill.shortDefinition,
    skill.fullDefinition,
    skill.whyItMatters,
    skill.modernRelevance,
  ].join('').trim().length;
  return !(
    placeholderTitlePattern.test(skill.name) ||
    genericDefinitionPatterns.some((pattern) => pattern.test(skill.shortDefinition ?? '')) ||
    coreLength < 620
  );
}

function isSkillFieldPublic(skill, field) {
  const value = skill[field] ?? '';
  if (field === 'fullDefinition') return !genericLongDefinitionPatterns.some((pattern) => pattern.test(value));
  if (field === 'howToPractice' || field === 'howToMeasureProgress') {
    return !genericPracticePatterns.some((pattern) => pattern.test(value));
  }
  if (['whyItMatters', 'modernRelevance', 'aiEraRelevance', 'humanAdvantage'].includes(field)) {
    return !genericValuePatterns.some((pattern) => pattern.test(value));
  }
  return true;
}

const isIndexableCareer = (career) => !genericCareerPatterns.some((pattern) => pattern.test(career.whatTheyDo ?? ''));
const isUsefulCareerEvidence = (value) => !genericCareerEvidencePatterns.some((pattern) => pattern.test(value ?? ''));
const isIndexablePath = (learningPath) => !genericPathPattern.test(learningPath.description ?? '');
const isIndexableBlog = (source) => !repeatedBlogPatterns.some((pattern) => pattern.test(source));

function addPassages(target, documentId, field, values, indexable = true, replacement = null) {
  for (const value of Array.isArray(values) ? values : [values]) {
    if (!isLongPassage(value)) continue;
    target.push({
      documentId,
      field,
      value: String(value).trim(),
      normalized: normalize(value),
      templated: normalize(replacement ? String(value).replaceAll(replacement, '[subject]') : value),
      indexable,
    });
  }
}

const passages = [];
const canonicalSkills = canonicalSkillRecords(skills);
const renderedSkillFields = new Set([
  'shortDefinition',
  'fullDefinition',
  'whyItMatters',
  'modernRelevance',
  'whereItShowsUp',
  'careerApplications',
  'industryVariations',
  'realWorldScenarios',
  'skillInAction',
  'aiEraRelevance',
  'humanAdvantage',
  'beginnerActions',
  'intermediateActions',
  'advancedActions',
  'commonMistakes',
  'coreSubskills',
  'developmentMethods',
  'practiceOpportunities',
  'howEmployersEvaluate',
  'signalsOfMastery',
  'careerImpact',
  'learningResources',
  'evidenceSummary',
  'scholarlyNotes',
  'howToPractice',
  'howToMeasureProgress',
]);

for (const skill of canonicalSkills) {
  const documentId = `skill:${skill.slug}`;
  const indexable = isIndexableSkill(skill);
  for (const [field, value] of Object.entries(skill)) {
    addPassages(
      passages,
      documentId,
      field,
      value,
      indexable && renderedSkillFields.has(field) && isSkillFieldPublic(skill, field),
      skill.name,
    );
  }
}

const renderedCareerFields = new Set([
  'summary',
  'whatTheyDo',
  'workEnvironments',
  'tools',
  'alternativePaths',
  'beginnerEntryStrategies',
  'growthOpportunities',
]);
for (const career of careers) {
  const documentId = `career:${career.slug}`;
  const indexable = isIndexableCareer(career);
  for (const [field, value] of Object.entries(career)) {
    const evidenceIsPublic = !['educationNotes', 'futureOutlook'].includes(field) || isUsefulCareerEvidence(value);
    addPassages(
      passages,
      documentId,
      field,
      value,
      indexable && renderedCareerFields.has(field) && evidenceIsPublic,
      career.title,
    );
  }
}

for (const industry of industries) {
  const documentId = `industry:${industry.slug}`;
  const renderedFields = new Set(['description', 'keyCharacteristics', 'trends', 'challenges', 'opportunities']);
  for (const [field, value] of Object.entries(industry)) {
    addPassages(passages, documentId, field, value, renderedFields.has(field), industry.name);
  }
}

for (const learningPath of paths) {
  const indexable = isIndexablePath(learningPath);
  const renderedFields = new Set(['description', 'learningOutcomes', 'prerequisites']);
  for (const [field, value] of Object.entries(learningPath)) {
    addPassages(passages, `path:${learningPath.id}`, field, value, indexable && renderedFields.has(field), learningPath.name);
  }
}

const blogFiles = fs.readdirSync(blogDirectory).filter((file) => file.endsWith('.mdx'));
const unattributedBlockquotes = [];
for (const file of blogFiles) {
  const source = fs.readFileSync(path.join(blogDirectory, file), 'utf8');
  const body = source.replace(/^---\n[\s\S]*?\n---\n/, '');
  const indexable = isIndexableBlog(body);
  const paragraphs = body
    .split(/\n\s*\n/)
    .map((value) => value.replace(/^#+\s*/gm, '').replace(/[>*_`#]/g, '').trim())
    .filter(Boolean);
  addPassages(passages, `blog:${file}`, 'body', paragraphs, indexable);

  const quoteLines = body.split('\n').filter((line) => /^>\s+/.test(line));
  for (const line of quoteLines) {
    if (!/https?:\/\//.test(line) && !/\[[^\]]+\]\([^)]+\)/.test(line)) {
      unattributedBlockquotes.push({ file, line: line.replace(/^>\s+/, '').slice(0, 120) });
    }
  }
}

function duplicateGroups(key) {
  const groups = new Map();
  for (const passage of passages) {
    const value = passage[key];
    if (!value) continue;
    const group = groups.get(value) ?? [];
    group.push(passage);
    groups.set(value, group);
  }
  return [...groups.values()].filter(
    (group) => new Set(group.map((item) => item.documentId)).size > 1,
  );
}

const exactGroups = duplicateGroups('normalized');
const templatedGroups = duplicateGroups('templated').filter(
  (group) => new Set(group.map((item) => item.documentId)).size >= 3,
);
const indexableExactGroups = exactGroups.filter((group) => group.every((item) => item.indexable));

const phraseDocuments = new Map();
for (const passage of passages.filter((item) => item.indexable)) {
  const tokens = words(passage.value);
  const seen = new Set();
  for (let index = 0; index <= tokens.length - 16; index += 1) {
    const phrase = tokens.slice(index, index + 16).join(' ');
    if (seen.has(phrase)) continue;
    seen.add(phrase);
    const documents = phraseDocuments.get(phrase) ?? new Set();
    documents.add(passage.documentId);
    phraseDocuments.set(phrase, documents);
  }
}
const reusedLongPhrases = [...phraseDocuments.entries()]
  .filter(([, documentIds]) => documentIds.size > 1)
  .sort((left, right) => right[1].size - left[1].size);

console.log('Modern Skill Lab copyright and originality audit');
console.log(`Documents checked: ${(canonicalSkills.length + careers.length + industries.length + paths.length + blogFiles.length).toLocaleString()}`);
console.log(`Long passages checked: ${passages.length.toLocaleString()}`);
console.log(`Canonical skill pages: ${canonicalSkills.length.toLocaleString()}`);
console.log(`Editorial-ready skill pages: ${canonicalSkills.filter(isIndexableSkill).length.toLocaleString()}`);
console.log(`Quarantined skill pages: ${canonicalSkills.filter((skill) => !isIndexableSkill(skill)).length.toLocaleString()}`);
console.log(`Editorial-ready career pages: ${careers.filter(isIndexableCareer).length.toLocaleString()}`);
console.log(`Editorial-ready learning paths: ${paths.filter(isIndexablePath).length.toLocaleString()}`);
console.log(`Editorial-ready blog posts: ${blogFiles.filter((file) => isIndexableBlog(fs.readFileSync(path.join(blogDirectory, file), 'utf8'))).length.toLocaleString()}`);
console.log(`Exact duplicate passage groups across documents: ${exactGroups.length.toLocaleString()}`);
console.log(`Template-normalized passage groups: ${templatedGroups.length.toLocaleString()}`);
console.log(`Repeated 16-word phrases among public/indexable content: ${reusedLongPhrases.length.toLocaleString()}`);
console.log(`Unattributed Markdown blockquotes: ${unattributedBlockquotes.length.toLocaleString()}`);

if (indexableExactGroups.length > 0) {
  console.log('\nExact duplicates still present in public/indexable content (first 20):');
  for (const group of indexableExactGroups.slice(0, 20)) {
    console.log(`- ${group.map((item) => `${item.documentId}.${item.field}`).join(' | ')}`);
    console.log(`  ${group[0].value.slice(0, 180)}`);
  }
}

if (reusedLongPhrases.length > 0) {
  console.log('\nRepeated long phrases in public/indexable content (first 20):');
  for (const [phrase, documentIds] of reusedLongPhrases.slice(0, 20)) {
    console.log(`- ${[...documentIds].slice(0, 6).join(', ')}`);
    console.log(`  ${phrase}`);
  }
}

if (unattributedBlockquotes.length > 0) {
  console.log('\nBlockquotes requiring attribution review:');
  for (const quote of unattributedBlockquotes.slice(0, 20)) {
    console.log(`- ${quote.file}: ${quote.line}`);
  }
}

const passed =
  indexableExactGroups.length === 0 &&
  reusedLongPhrases.length === 0 &&
  unattributedBlockquotes.length === 0;

console.log(`\nIndexable-content originality gate: ${passed ? 'PASS' : 'REVIEW REQUIRED'}`);
if (!passed && process.argv.includes('--strict')) process.exitCode = 1;
