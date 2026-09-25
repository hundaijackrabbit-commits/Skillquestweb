import fs from 'node:fs';
import path from 'node:path';
import {
  editorialBatchFiles,
  editorialPatchFiles,
} from './editorial-override-files.mjs';

const root = process.cwd();
const dataDir = path.join(root, 'src', 'data');
const readJson = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf8'));

export const normalizeSkillReference = (value) =>
  String(value ?? '')
    .trim()
    .toLocaleLowerCase('en')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const normalizedSkillName = (skill) =>
  String(skill?.name ?? '').trim().toLocaleLowerCase('en');

function skillContentScore(skill) {
  const prose = [
    skill.shortDefinition,
    skill.fullDefinition,
    skill.whyItMatters,
    skill.modernRelevance,
    skill.aiEraRelevance,
    skill.whereItShowsUp,
    skill.careerApplications,
    skill.industryVariations,
    skill.skillInAction,
    skill.careerImpact,
    skill.evidenceSummary,
  ];
  const lists = [
    skill.professionalContexts,
    skill.beginnerActions,
    skill.intermediateActions,
    skill.advancedActions,
    skill.commonMistakes,
    skill.coreSubskills,
    skill.realWorldScenarios,
    skill.learningResources,
  ];

  const shortDefinition = String(skill.shortDefinition ?? '');
  const generatedCopyPenalty = [
    /^The ability to effectively /i,
    /^The capability to .* teams and organizations/i,
    /^Professional competency in .* for solving complex challenges and driving results/i,
  ].some((pattern) => pattern.test(shortDefinition)) ? 1_500 : 0;

  return (
    prose.reduce((total, value) => total + String(value ?? '').trim().length, 0) +
    lists.reduce(
      (total, value) => total + (Array.isArray(value) ? value.length : 0) * 80,
      0,
    ) -
    generatedCopyPenalty
  );
}

function loadEditorialOverrides() {
  const canonicalPath = path.join(dataDir, 'skill-editorial-overrides.json');
  const canonical = structuredClone(readJson(canonicalPath));

  for (const batchFile of editorialBatchFiles) {
    const batch = readJson(path.join(dataDir, batchFile));
    for (const [slug, override] of Object.entries(batch)) {
      if (Object.prototype.hasOwnProperty.call(canonical, slug)) {
        for (const [field, value] of Object.entries(override)) {
          if (
            !Object.prototype.hasOwnProperty.call(canonical[slug], field) ||
            JSON.stringify(canonical[slug][field]) !== JSON.stringify(value)
          ) {
            throw new Error(
              `Editorial override conflict for ${slug}.${field}: canonical and ${batchFile} differ`,
            );
          }
        }
        continue;
      }
      canonical[slug] = override;
    }
  }

  for (const patchFile of editorialPatchFiles) {
    const patches = readJson(path.join(dataDir, patchFile));
    for (const [slug, patch] of Object.entries(patches)) {
      if (!Object.prototype.hasOwnProperty.call(canonical, slug)) {
        throw new Error(
          `Editorial polish target ${slug} is missing before applying ${patchFile}`,
        );
      }

      for (const [field, value] of Object.entries(patch)) {
        if (Object.prototype.hasOwnProperty.call(canonical[slug], field)) {
          if (JSON.stringify(canonical[slug][field]) !== JSON.stringify(value)) {
            throw new Error(
              `Editorial polish conflict for ${slug}.${field}: ${patchFile} differs from the effective canonical value`,
            );
          }
          continue;
        }
        canonical[slug][field] = value;
      }
    }
  }

  return canonical;
}

export function loadEffectiveSkillGraph() {
  const rawSkills = readJson(path.join(dataDir, 'skills-1000plus.json'));
  if (!Array.isArray(rawSkills)) {
    throw new Error('Skills dataset root must be an array');
  }

  const editorialOverrides = loadEditorialOverrides();
  const allSkills = rawSkills.map((skill) => {
    const override = editorialOverrides[skill.slug];
    return override ? { ...skill, ...override } : skill;
  });

  const canonicalByName = new Map();
  for (const skill of allSkills) {
    const key = normalizedSkillName(skill);
    const current = canonicalByName.get(key);
    if (!current || skillContentScore(skill) > skillContentScore(current)) {
      canonicalByName.set(key, skill);
    }
  }

  const canonicalSkills = [...canonicalByName.values()];
  const aliasToCanonical = new Map();

  for (const skill of allSkills) {
    const canonical = canonicalByName.get(normalizedSkillName(skill)) ?? skill;
    for (const value of [skill.id, skill.slug, skill.name]) {
      const normalized = normalizeSkillReference(value);
      if (normalized) aliasToCanonical.set(normalized, canonical);
    }
  }

  const resolveSkillReference = (reference) =>
    aliasToCanonical.get(normalizeSkillReference(reference)) ?? null;

  return {
    allSkills,
    canonicalSkills,
    resolveSkillReference,
  };
}
