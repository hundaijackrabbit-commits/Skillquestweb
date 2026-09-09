import type { Career } from './types';

const GENERIC_TOOLS = new Set([
  'industry-standard software',
  'communication tools',
  'project management platforms',
  'professional platforms',
]);

const GENERIC_ENTRY_PATTERNS = [
  /^Entry-level .* positions$/i,
  /^Internships and apprenticeships$/i,
  /^Professional development programs$/i,
  /^Building relevant skills through projects and coursework$/i,
];

const GENERIC_ALTERNATIVE_PATTERNS = [
  /^Transition from related .* roles$/i,
  /^Professional development and upskilling programs$/i,
  /^Industry certifications and training$/i,
  /^Cross-functional experience and internal mobility$/i,
];

const GENERIC_GROWTH_PATTERNS = [
  /^Senior .+$/i,
  /^Lead .+$/i,
  /^.+ Manager\/Director$/i,
  /^Specialized consulting or freelance work$/i,
  /^Independent consulting and specialized practice$/i,
];

const GENERIC_EDUCATION_PATTERNS = [
  /^Bachelor'?s degree typically preferred, though relevant experience and skills often valued equally/i,
  /^Relevant degree or equivalent experience typically required/i,
  /^Education requirements vary by role/i,
  /^Relevant education and experience requirements vary by role/i,
];

function matches(value: string, patterns: RegExp[]) {
  return patterns.some((pattern) => pattern.test(value.trim()));
}

export function usefulCareerTools(career: Career) {
  return career.tools.filter((tool) => !GENERIC_TOOLS.has(tool.trim().toLowerCase()));
}

export function usefulEntryStrategies(career: Career) {
  return career.beginnerEntryStrategies.filter((item) => !matches(item, GENERIC_ENTRY_PATTERNS));
}

export function usefulAlternativePaths(career: Career) {
  return career.alternativePaths.filter((item) => !matches(item, GENERIC_ALTERNATIVE_PATTERNS));
}

export function usefulGrowthOpportunities(career: Career) {
  const filtered = career.growthOpportunities.filter((item) => !matches(item, GENERIC_GROWTH_PATTERNS));
  return filtered.length >= 2 ? filtered : career.growthOpportunities;
}

export function isCareerEducationSpecific(career: Career) {
  return Boolean(career.educationNotes?.trim()) && !matches(career.educationNotes ?? '', GENERIC_EDUCATION_PATTERNS);
}

export type CareerQualityFlag =
  | 'thin-summary'
  | 'thin-role-description'
  | 'generic-tools'
  | 'generic-entry-routes'
  | 'generic-alternative-routes'
  | 'generic-growth'
  | 'generic-education'
  | 'weak-skill-map';

export function assessCareerQuality(career: Career) {
  const flags: CareerQualityFlag[] = [];
  let score = 100;

  if (career.summary.trim().length < 90) { flags.push('thin-summary'); score -= 15; }
  if (career.whatTheyDo.trim().length < 220) { flags.push('thin-role-description'); score -= 25; }
  if (career.tools.length > 0 && usefulCareerTools(career).length === 0) { flags.push('generic-tools'); score -= 15; }
  if (career.beginnerEntryStrategies.length > 0 && usefulEntryStrategies(career).length === 0) { flags.push('generic-entry-routes'); score -= 10; }
  if (career.alternativePaths.length > 0 && usefulAlternativePaths(career).length === 0) { flags.push('generic-alternative-routes'); score -= 10; }
  if (career.growthOpportunities.length > 0 && career.growthOpportunities.every((item) => matches(item, GENERIC_GROWTH_PATTERNS))) { flags.push('generic-growth'); score -= 15; }
  if (!isCareerEducationSpecific(career)) { flags.push('generic-education'); score -= 5; }
  if (career.coreSkills.length < 3 || career.secondarySkills.length < 2) { flags.push('weak-skill-map'); score -= 10; }

  return { score: Math.max(0, score), flags };
}
