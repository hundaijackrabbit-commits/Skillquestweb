import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dataDir = path.join(root, 'src', 'data');
const skills = JSON.parse(fs.readFileSync(path.join(dataDir, 'skills-1000plus.json'), 'utf8'));
const batchPattern = /^skill-editorial-batch-\d+\.json$/;
const editorialFiles = fs.readdirSync(dataDir)
  .filter((name) => name === 'skill-editorial-overrides.json' || batchPattern.test(name))
  .sort();

const normalize = (value) => String(value ?? '')
  .trim()
  .toLocaleLowerCase('en')
  .replace(/&/g, ' and ')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');

const skillSlugs = new Set();
const duplicateDatasetSlugs = new Map();
for (const skill of skills) {
  const candidates = [skill.slug, skill.id, skill.name].map(normalize).filter(Boolean);
  for (const candidate of candidates) {
    if (skillSlugs.has(candidate)) {
      duplicateDatasetSlugs.set(candidate, (duplicateDatasetSlugs.get(candidate) ?? 1) + 1);
    }
    skillSlugs.add(candidate);
  }
}

const missing = [];
const editorialSlugs = new Map();
const badSourceNotes = [];
for (const file of editorialFiles) {
  const parsed = JSON.parse(fs.readFileSync(path.join(dataDir, file), 'utf8'));
  for (const [slug, value] of Object.entries(parsed)) {
    const normalized = normalize(slug);
    if (!skillSlugs.has(normalized)) missing.push({ slug, file });
    const files = editorialSlugs.get(normalized) ?? [];
    files.push(file);
    editorialSlugs.set(normalized, files);

    if (Array.isArray(value.scholarlyNotes)) {
      for (const note of value.scholarlyNotes) {
        const urls = String(note).match(/https?:\/\/[^\s)]+/g) ?? [];
        for (const url of urls) {
          try {
            const parsedUrl = new URL(url);
            if (!['http:', 'https:'].includes(parsedUrl.protocol) || !parsedUrl.hostname.includes('.')) {
              badSourceNotes.push({ slug, file, url });
            }
          } catch {
            badSourceNotes.push({ slug, file, url });
          }
        }
      }
    }
  }
}

console.log('Modern Skill Lab editorial slug/source mapping audit');
console.log(`Skill dataset records: ${skills.length.toLocaleString()}`);
console.log(`Editorial files: ${editorialFiles.length.toLocaleString()}`);
console.log(`Unique editorial slugs: ${editorialSlugs.size.toLocaleString()}`);
console.log(`Editorial slugs without a matching skill record: ${missing.length.toLocaleString()}`);
console.log(`Malformed source URLs found: ${badSourceNotes.length.toLocaleString()}`);

if (missing.length) {
  console.log('\nEditorial slugs missing from the skill dataset:');
  for (const item of missing) console.log(`- ${item.slug} (${item.file})`);
}
if (badSourceNotes.length) {
  console.log('\nMalformed source URLs:');
  for (const item of badSourceNotes) console.log(`- ${item.slug} (${item.file}): ${item.url}`);
}

const passed = missing.length === 0 && badSourceNotes.length === 0;
console.log(`\nEditorial mapping gate: ${passed ? 'PASS' : 'REVIEW REQUIRED'}`);
if (!passed && process.argv.includes('--strict')) process.exitCode = 1;
