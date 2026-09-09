import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const skillsPath = path.join(root, 'src', 'data', 'skills-1000plus.json');
const waves = [1,2,3,4,5]
  .map((n) => path.join(root, 'src', 'data', `skills-2026-wave${n}.json`))
  .filter((file) => fs.existsSync(file));

const skills = JSON.parse(fs.readFileSync(skillsPath, 'utf8'));
const researched = waves.flatMap((file) => JSON.parse(fs.readFileSync(file, 'utf8')));
const normalize = (value = '') => String(value).trim().toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const requiredStringFields = ['id','slug','name','category','shortDefinition','fullDefinition','whyItMatters','modernRelevance','howToPractice','howToMeasureProgress','estimatedTimeToDevelop','resumeRelevance','interviewRelevance','aiEraRelevance','humanAdvantage','lastUpdated'];
const requiredArrayFields = ['professionalContexts','relatedSkills','prerequisiteSkills','subskills','careers','industries','tools','beginnerActions','intermediateActions','advancedActions','commonMistakes','blogPosts'];
const requiredNumberFields = ['employerSignalValue'];
const genericPatterns = [
  /^professional competency in .* for solving complex challenges and driving results/i,
  /^understanding and application of .* in the context of/i,
  /^the ability to effectively /i,
  /^the capability to .* teams and organizations/i,
  /^learn .* fundamentals$/i,
  /^practice basic .* techniques$/i,
  /^apply .* in projects$/i,
  /^lead .* initiatives$/i,
  /^develop .* strategy$/i,
  /^train others$/i,
];

const issues = [];
const bySlug = new Map();
const byName = new Map();
for (const skill of skills) {
  const slug = normalize(skill.slug);
  const name = normalize(skill.name);
  if (slug) {
    if (!bySlug.has(slug)) bySlug.set(slug, []);
    bySlug.get(slug).push(skill);
  }
  if (name) {
    if (!byName.has(name)) byName.set(name, []);
    byName.get(name).push(skill);
  }

  const missing = [];
  for (const field of requiredStringFields) if (typeof skill[field] !== 'string' || !skill[field].trim()) missing.push(field);
  for (const field of requiredArrayFields) if (!Array.isArray(skill[field])) missing.push(field);
  for (const field of requiredNumberFields) if (typeof skill[field] !== 'number') missing.push(field);
  if (typeof skill.featured !== 'boolean') missing.push('featured');
  if (!['low','medium','high'].includes(skill.automationRisk)) missing.push('automationRisk');

  const textValues = [skill.shortDefinition, skill.fullDefinition, skill.howToPractice, ...(skill.beginnerActions || []), ...(skill.intermediateActions || []), ...(skill.advancedActions || [])].filter(Boolean);
  const genericHits = textValues.filter((value) => genericPatterns.some((pattern) => pattern.test(String(value).trim()))).length;
  const thin = {
    shortDefinition: (skill.shortDefinition || '').trim().length < 45,
    fullDefinition: (skill.fullDefinition || '').trim().length < 180,
    howToPractice: (skill.howToPractice || '').trim().length < 100,
    beginnerActions: (skill.beginnerActions || []).length < 3,
    intermediateActions: (skill.intermediateActions || []).length < 3,
    advancedActions: (skill.advancedActions || []).length < 3,
    commonMistakes: (skill.commonMistakes || []).length < 3,
  };
  const thinCount = Object.values(thin).filter(Boolean).length;
  if (missing.length || genericHits || thinCount >= 3) issues.push({slug: skill.slug, name: skill.name, missing, genericHits, thinCount, thin});
}

const duplicateSlugs = [...bySlug.entries()].filter(([,items]) => items.length > 1).map(([key,items]) => ({key, slugs: items.map((x)=>x.slug), names: items.map((x)=>x.name)}));
const duplicateNames = [...byName.entries()].filter(([,items]) => items.length > 1).map(([key,items]) => ({key, slugs: items.map((x)=>x.slug), names: items.map((x)=>x.name)}));
const canonicalKeys = new Set(skills.flatMap((skill) => [normalize(skill.id), normalize(skill.slug), normalize(skill.name)]).filter(Boolean));
const researchedMissing = researched.filter((skill) => ![skill.id, skill.slug, skill.name].some((v) => canonicalKeys.has(normalize(v)))).map((skill) => ({slug: skill.slug, name: skill.name}));

const FLOOR = 1300;
const fatal = [];
if (!Array.isArray(skills)) fatal.push('skills dataset is not an array');
if (skills.length < FLOOR) fatal.push(`library count ${skills.length} is below preservation floor ${FLOOR}`);
if (duplicateSlugs.length) fatal.push(`${duplicateSlugs.length} duplicate slug groups`);
if (researchedMissing.length) fatal.push(`${researchedMissing.length} researched Wave 1-5 records are missing from canonical dataset`);

const report = {
  generatedAt: new Date().toISOString(),
  totalSkills: skills.length,
  researchedRecords: researched.length,
  researchedMissing,
  duplicateSlugGroups: duplicateSlugs,
  duplicateNameGroups: duplicateNames,
  recordsNeedingEditorialReview: issues.length,
  topReviewPriorities: issues.sort((a,b) => (b.missing.length + b.genericHits + b.thinCount) - (a.missing.length + a.genericHits + a.thinCount)).slice(0,100),
  fatal,
};

fs.mkdirSync(path.join(root, 'reports'), {recursive: true});
fs.writeFileSync(path.join(root, 'reports', 'library-preservation-audit.json'), JSON.stringify(report, null, 2) + '\n');
console.log(`Library preservation audit: ${skills.length} skills; ${researched.length} researched Wave 1-5 records; ${issues.length} editorial-review candidates.`);
console.log(`Duplicate slug groups: ${duplicateSlugs.length}; duplicate name groups: ${duplicateNames.length}; missing researched records: ${researchedMissing.length}.`);
for (const item of report.topReviewPriorities.slice(0,20)) console.log(`- ${item.name} (${item.slug}): missing=${item.missing.length}, generic=${item.genericHits}, thin=${item.thinCount}`);
if (fatal.length) {
  console.error('PRESERVATION AUDIT FAILED');
  for (const item of fatal) console.error(`- ${item}`);
  process.exit(1);
}
console.log('PRESERVATION AUDIT PASSED');
