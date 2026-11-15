import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dataDir = path.join(root, 'src', 'data');
const careersFile = path.join(dataDir, 'careers.json');
const industriesFile = path.join(dataDir, 'industries.json');
const aliasesFile = path.join(dataDir, 'industry-reference-aliases.json');

const careers = JSON.parse(fs.readFileSync(careersFile, 'utf8'));
const industries = JSON.parse(fs.readFileSync(industriesFile, 'utf8'));
const aliases = JSON.parse(fs.readFileSync(aliasesFile, 'utf8'));

if (!Array.isArray(careers)) throw new Error('Careers dataset root must be an array');
if (!Array.isArray(industries)) throw new Error('Industries dataset root must be an array');
if (!aliases || typeof aliases !== 'object' || Array.isArray(aliases)) {
  throw new Error('Industry reference aliases must be an object');
}

const normalize = (value) =>
  String(value ?? '')
    .trim()
    .toLocaleLowerCase('en')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const industryByReference = new Map();
for (const industry of industries) {
  for (const value of [industry?.id, industry?.slug, industry?.name]) {
    const key = normalize(value);
    if (key) industryByReference.set(key, industry);
  }
}

const canonicalAliases = new Map();
for (const [rawAlias, rawTarget] of Object.entries(aliases)) {
  if (typeof rawTarget !== 'string') {
    throw new Error(`Industry alias ${rawAlias} must target a string reference`);
  }

  const alias = normalize(rawAlias);
  const targetReference = normalize(rawTarget);
  const target = industryByReference.get(targetReference);
  if (!alias) throw new Error('Industry aliases cannot contain an empty key');
  if (!target?.slug) {
    throw new Error(`Industry alias ${rawAlias} targets missing industry ${rawTarget}`);
  }

  const exact = industryByReference.get(alias);
  if (exact && normalize(exact.slug) !== normalize(target.slug)) {
    throw new Error(
      `Industry alias ${rawAlias} would overwrite existing industry ${exact.slug}`,
    );
  }

  canonicalAliases.set(alias, target.slug);
}

let normalizedReferences = 0;
let removedDuplicates = 0;
let updatedCareers = 0;

for (const career of careers) {
  if (!Array.isArray(career?.commonIndustries)) continue;

  const next = [];
  const seen = new Set();
  let changed = false;

  for (const rawReference of career.commonIndustries) {
    const normalized = normalize(rawReference);
    const mapped = canonicalAliases.get(normalized);
    const resolved = mapped ?? rawReference;
    const dedupeKey = normalize(resolved);

    if (mapped && normalize(mapped) !== normalized) {
      normalizedReferences += 1;
      changed = true;
    }

    if (seen.has(dedupeKey)) {
      removedDuplicates += 1;
      changed = true;
      continue;
    }

    seen.add(dedupeKey);
    next.push(resolved);
  }

  if (changed) {
    career.commonIndustries = next;
    updatedCareers += 1;
  }
}

if (updatedCareers > 0) {
  fs.writeFileSync(careersFile, `${JSON.stringify(careers, null, 2)}\n`);
}

console.log(
  `[industry-reference-normalization] normalized ${normalizedReferences} alias reference(s), removed ${removedDuplicates} duplicate(s) across ${updatedCareers} career(s)`,
);
