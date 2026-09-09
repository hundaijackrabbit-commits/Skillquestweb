import fs from 'node:fs';
import path from 'node:path';

const filePath = path.join(process.cwd(), 'src/lib/content.ts');
const source = fs.readFileSync(filePath, 'utf8');

const before = `export const getAllSkills = cache(async (): Promise<Skill[]> => {
  try {
    if (!fs.existsSync(SKILLS_FILE)) {
      console.warn('Skills file not found, returning empty array');
      return [];
    }
    
    const fileContent = fs.readFileSync(SKILLS_FILE, 'utf8');
    const rawSkills = JSON.parse(fileContent);
    
    // Validate each skill with Zod
    return rawSkills.map((skill: unknown) => SkillSchema.parse(skill));
  } catch (error) {
    console.error('Error loading skills:', error);
    return [];
  }
});`;

const after = `export const getAllSkills = cache(async (): Promise<Skill[]> => {
  if (!fs.existsSync(SKILLS_FILE)) {
    console.error('Skills file not found');
    return [];
  }

  let rawSkills: unknown;
  try {
    rawSkills = JSON.parse(fs.readFileSync(SKILLS_FILE, 'utf8'));
  } catch (error) {
    console.error('Unable to parse skills dataset:', error);
    return [];
  }

  if (!Array.isArray(rawSkills)) {
    console.error('Skills dataset root must be an array');
    return [];
  }

  const validSkills: Skill[] = [];
  let invalidCount = 0;

  rawSkills.forEach((rawSkill, index) => {
    const parsed = SkillSchema.safeParse(rawSkill);
    if (parsed.success) {
      validSkills.push(parsed.data);
      return;
    }

    invalidCount += 1;
    const candidate = rawSkill && typeof rawSkill === 'object'
      ? rawSkill as Record<string, unknown>
      : null;
    const identity = candidate?.slug ?? candidate?.id ?? candidate?.name ?? \`record-\${index}\`;
    console.error(
      \`Invalid skill record skipped: \${String(identity)}\`,
      parsed.error.issues.map((issue) => ({ path: issue.path.join('.'), message: issue.message })),
    );
  });

  if (invalidCount > 0) {
    console.warn(
      \`Loaded \${validSkills.length} valid skill records and skipped \${invalidCount} invalid record(s).\`,
    );
  }

  return validSkills;
});`;

if (!source.includes(before)) {
  if (source.includes('SkillSchema.safeParse(rawSkill)')) {
    console.log('Skill loader is already hardened.');
    process.exit(0);
  }
  throw new Error('Expected getAllSkills block was not found; refusing to modify content.ts automatically.');
}

fs.writeFileSync(filePath, source.replace(before, after));
console.log('Replaced all-or-nothing skill loading with per-record safe parsing.');
