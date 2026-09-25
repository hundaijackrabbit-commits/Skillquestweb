import fs from 'node:fs';
import path from 'node:path';
import {
  editorialBatchFiles,
  editorialPatchFiles,
} from './lib/editorial-override-files.mjs';

const root = process.cwd();
const dataDir = path.join(root, 'src', 'data');
const canonicalPath = path.join(dataDir, 'skill-editorial-overrides.json');

const canonical = JSON.parse(fs.readFileSync(canonicalPath, 'utf8'));
let mergedCount = 0;
let patchedFieldCount = 0;

for (const batchFile of editorialBatchFiles) {
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

for (const patchFile of editorialPatchFiles) {
  const patchPath = path.join(dataDir, patchFile);
  const patches = JSON.parse(fs.readFileSync(patchPath, 'utf8'));

  for (const [slug, patch] of Object.entries(patches)) {
    if (!Object.prototype.hasOwnProperty.call(canonical, slug)) {
      throw new Error(
        `Editorial polish target ${slug} is missing before applying ${patchFile}`,
      );
    }

    for (const [field, value] of Object.entries(patch)) {
      if (Object.prototype.hasOwnProperty.call(canonical[slug], field)) {
        throw new Error(
          `Editorial polish conflict for ${slug}.${field}: ${patchFile} would overwrite an existing override field`,
        );
      }
      canonical[slug][field] = value;
      patchedFieldCount += 1;
    }
  }
}

fs.writeFileSync(canonicalPath, `${JSON.stringify(canonical, null, 2)}\n`);
console.log(
  `[editorial-overrides] merged ${mergedCount} new override(s), added ${patchedFieldCount} guarded polish field(s), ${Object.keys(canonical).length} total`,
);

console.log('[preview-audit] measuring effective canonical graph');
await import('./audit-content-links.mjs');
await import('./audit-internal-link-graph.mjs');
