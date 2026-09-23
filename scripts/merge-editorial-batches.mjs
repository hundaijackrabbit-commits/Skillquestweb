import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dataDir = path.join(root, 'src', 'data');
const basePath = path.join(dataDir, 'skill-editorial-overrides.json');
const batchPattern = /^skill-editorial-batch-\d+\.json$/;

// Intentional later-batch revisions must be listed here so duplicate slugs never
// become an accidental last-write-wins behavior. The key is the skill slug and
// the value is the only batch file permitted to supersede an earlier batch.
const reviewedRevisions = new Map([
  ['ai-evaluation', 'skill-editorial-batch-07.json'],
]);

function readObject(filePath) {
  const parsed = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error(`${path.basename(filePath)} must contain an object keyed by skill slug.`);
  }
  return parsed;
}

const base = readObject(basePath);
const batchFiles = fs.readdirSync(dataDir).filter((name) => batchPattern.test(name)).sort();
const merged = { ...base };
const seenBatchSlugs = new Map();

for (const fileName of batchFiles) {
  const batch = readObject(path.join(dataDir, fileName));
  for (const [slug, override] of Object.entries(batch)) {
    if (!override || typeof override !== 'object' || Array.isArray(override)) {
      throw new Error(`${fileName}: ${slug} must be an object.`);
    }
    const priorBatch = seenBatchSlugs.get(slug);
    if (priorBatch) {
      const approvedRevisionFile = reviewedRevisions.get(slug);
      if (approvedRevisionFile !== fileName) {
        throw new Error(`Duplicate editorial slug ${slug} appears in ${priorBatch} and ${fileName}.`);
      }
      console.log(`Reviewed editorial revision: ${slug} (${priorBatch} -> ${fileName}).`);
    }
    seenBatchSlugs.set(slug, fileName);
    merged[slug] = { ...(merged[slug] ?? {}), ...override };
  }
}

// Fail if a declared revision target is absent or no earlier batch existed.
for (const [slug, expectedFile] of reviewedRevisions) {
  if (seenBatchSlugs.get(slug) !== expectedFile) {
    throw new Error(`Reviewed revision ${slug} must resolve to ${expectedFile}.`);
  }
}

// The loader already reads this file. This build-time merge changes only the
// ephemeral build checkout; the committed base and batch source files remain
// separate and reviewable in Git.
fs.writeFileSync(basePath, `${JSON.stringify(merged, null, 2)}\n`);
console.log(`Editorial overrides ready: ${Object.keys(merged).length} skills (${batchFiles.length} batch file(s)).`);
