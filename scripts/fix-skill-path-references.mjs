import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dataDir = path.join(root, 'src', 'data');
const pathsFile = path.join(dataDir, 'skill-paths.json');
const careersFile = path.join(dataDir, 'careers.json');

const paths = JSON.parse(fs.readFileSync(pathsFile, 'utf8'));
const careers = JSON.parse(fs.readFileSync(careersFile, 'utf8'));

if (!Array.isArray(paths)) throw new Error('Skill paths dataset root must be an array');
if (!Array.isArray(careers)) throw new Error('Careers dataset root must be an array');

const careerSlugs = new Set(careers.map((career) => career?.slug).filter(Boolean));
const fixes = [
  {
    pathId: 'digital-marketer-path',
    field: 'relatedCareers',
    from: ['digital-marketer', 'marketing-manager', 'content-manager'],
    to: [
      'digital-marketing-manager',
      'content-marketing-manager',
      'performance-marketing-manager',
    ],
  },
];

let updatedPaths = 0;
let updatedReferences = 0;

for (const fix of fixes) {
  const item = paths.find((entry) => entry?.id === fix.pathId);
  if (!item) throw new Error(`Skill path ${fix.pathId} is missing`);

  for (const careerSlug of fix.to) {
    if (!careerSlugs.has(careerSlug)) {
      throw new Error(
        `Skill path ${fix.pathId} targets missing career ${careerSlug}`,
      );
    }
  }

  const current = item[fix.field];
  const currentText = JSON.stringify(current);
  const fromText = JSON.stringify(fix.from);
  const toText = JSON.stringify(fix.to);

  if (currentText === toText) continue;
  if (currentText !== fromText) {
    throw new Error(
      `Unexpected ${fix.pathId}.${fix.field}: expected ${fromText}, received ${currentText}`,
    );
  }

  item[fix.field] = [...fix.to];
  updatedPaths += 1;
  updatedReferences += fix.to.length;
}

if (updatedPaths > 0) {
  fs.writeFileSync(pathsFile, `${JSON.stringify(paths, null, 2)}\n`);
}

console.log(
  `[skill-path-reference-fixes] updated ${updatedReferences} reference(s) across ${updatedPaths} path(s)`,
);
