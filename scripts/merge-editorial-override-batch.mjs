import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dataDir = path.join(root, 'src', 'data');
const canonicalPath = path.join(dataDir, 'skill-editorial-overrides.json');
const batchFiles = [
  'skill-editorial-overrides-problem-project.json',
  'skill-editorial-overrides-decision-org-development.json',
];

const canonical = JSON.parse(fs.readFileSync(canonicalPath, 'utf8'));
let mergedCount = 0;

for (const batchFile of batchFiles) {
  const batchPath = path.join(dataDir, batchFile);
  const batch = JSON.parse(fs.readFileSync(batchPath, 'utf8'));

  for (const [slug, override] of Object.entries(batch)) {
    if (Object.prototype.hasOwnProperty.call(canonical, slug)) {
      const canonicalText = JSON.stringify(canonical[slug]);
      const batchText = JSON.stringify(override);
      if (canonicalText !== batchText) {
        throw new Error(
          `Editorial override conflict for ${slug}: canonical and ${batchFile} differ`,
        );
      }
      continue;
    }

    canonical[slug] = override;
    mergedCount += 1;
  }
}

fs.writeFileSync(canonicalPath, `${JSON.stringify(canonical, null, 2)}\n`);
console.log(
  `[editorial-overrides] merged ${mergedCount} new override(s) from ${batchFiles.length} batch file(s); ${Object.keys(canonical).length} total`,
);
