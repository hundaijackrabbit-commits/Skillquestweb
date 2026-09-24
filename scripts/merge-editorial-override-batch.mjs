import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dataDir = path.join(root, 'src', 'data');
const canonicalPath = path.join(dataDir, 'skill-editorial-overrides.json');
const batchPath = path.join(dataDir, 'skill-editorial-overrides-problem-project.json');

const canonical = JSON.parse(fs.readFileSync(canonicalPath, 'utf8'));
const batch = JSON.parse(fs.readFileSync(batchPath, 'utf8'));

for (const [slug, override] of Object.entries(batch)) {
  if (Object.prototype.hasOwnProperty.call(canonical, slug)) {
    const canonicalText = JSON.stringify(canonical[slug]);
    const batchText = JSON.stringify(override);
    if (canonicalText !== batchText) {
      throw new Error(`Editorial override conflict for ${slug}: canonical and batch differ`);
    }
    continue;
  }
  canonical[slug] = override;
}

fs.writeFileSync(canonicalPath, `${JSON.stringify(canonical, null, 2)}\n`);
console.log(`[editorial-overrides] merged ${Object.keys(batch).length} batch override(s); ${Object.keys(canonical).length} total`);
