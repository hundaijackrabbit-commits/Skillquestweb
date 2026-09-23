import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dataDir = path.join(root, 'src', 'data');
const files = fs.readdirSync(dataDir)
  .filter((name) => name === 'skill-editorial-overrides.json' || /^skill-editorial-batch-\d+\.json$/.test(name))
  .sort();

const records = [];
const seenSlugs = new Map();
const errors = [];
const warnings = [];

const normalize = (value) => String(value ?? '')
  .toLocaleLowerCase('en')
  .replace(/https?:\/\/\S+/g, ' ')
  .replace(/[^a-z0-9]+/g, ' ')
  .trim()
  .replace(/\s+/g, ' ');

const words = (value) => normalize(value).split(' ').filter(Boolean);
const proseFields = [
  'shortDefinition', 'fullDefinition', 'whyItMatters', 'modernRelevance',
  'whereItShowsUp', 'careerApplications', 'industryVariations', 'skillInAction',
  'evidenceSummary', 'howToPractice', 'howToMeasureProgress', 'careerImpact',
  'aiEraRelevance', 'humanAdvantage'
];

for (const file of files) {
  const parsed = JSON.parse(fs.readFileSync(path.join(dataDir, file), 'utf8'));
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    errors.push(`${file}: root must be an object keyed by skill slug`);
    continue;
  }
  for (const [slug, value] of Object.entries(parsed)) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      errors.push(`${file}: ${slug} must be an object`);
      continue;
    }
    // A slug may exist in the base file and be intentionally extended by one batch,
    // but two numbered batches must never silently compete for the same skill.
    const prior = seenSlugs.get(slug);
    if (prior && prior !== 'skill-editorial-overrides.json' && file !== 'skill-editorial-overrides.json') {
      errors.push(`Duplicate batch slug ${slug}: ${prior} and ${file}`);
    }
    seenSlugs.set(slug, file);
    records.push({ slug, file, value });
  }
}

// Exact long-field duplicates across different skills.
const exact = new Map();
for (const { slug, file, value } of records) {
  for (const field of proseFields) {
    const text = value[field];
    if (typeof text !== 'string' || words(text).length < 18) continue;
    const key = normalize(text);
    const prior = exact.get(key);
    if (prior && prior.slug !== slug) {
      errors.push(`Exact editorial duplicate: ${prior.slug}.${prior.field} and ${slug}.${field}`);
    } else {
      exact.set(key, { slug, field, file });
    }
  }
}

// Repeated 16-word sequences catch close copy/template reuse without penalizing
// ordinary terminology shared by skills.
const sequences = new Map();
for (const { slug, value } of records) {
  for (const field of proseFields) {
    const tokens = words(value[field]);
    for (let i = 0; i <= tokens.length - 16; i += 1) {
      const key = tokens.slice(i, i + 16).join(' ');
      const prior = sequences.get(key);
      if (prior && prior.slug !== slug) {
        errors.push(`Repeated 16-word editorial passage: ${prior.slug}.${prior.field} and ${slug}.${field}`);
        break;
      }
      sequences.set(key, { slug, field });
    }
  }
}

const unsupportedNumberPattern = /\b\d+(?:\.\d+)?\s*%|\$\s?\d|\b\d+(?:\.\d+)?x\b/i;
for (const { slug, value } of records) {
  const combined = proseFields.map((field) => value[field]).filter((v) => typeof v === 'string').join(' ');
  if (unsupportedNumberPattern.test(combined)) {
    const notes = Array.isArray(value.scholarlyNotes) ? value.scholarlyNotes.join(' ') : '';
    if (!/https?:\/\//i.test(notes)) {
      errors.push(`${slug}: contains quantitative claims but no linked scholarly/source notes`);
    }
  }
  if (typeof value.shortDefinition === 'string' && value.shortDefinition.length > 360) {
    warnings.push(`${slug}: shortDefinition is unusually long (${value.shortDefinition.length} chars)`);
  }
}

// Lightweight source hygiene: research notes should identify a source and a URL.
for (const { slug, value } of records) {
  if (!Array.isArray(value.scholarlyNotes)) continue;
  for (const note of value.scholarlyNotes) {
    if (typeof note !== 'string' || !/https?:\/\//i.test(note)) {
      errors.push(`${slug}: scholarly note is missing a URL`);
    }
  }
}

console.log(`Editorial QA inspected ${records.length} reviewed record(s) across ${files.length} file(s).`);
for (const warning of warnings) console.warn(`WARN: ${warning}`);
if (errors.length) {
  console.error(`Editorial QA failed with ${errors.length} issue(s):`);
  for (const error of [...new Set(errors)]) console.error(`- ${error}`);
  process.exit(1);
}
console.log('Editorial QA passed.');
