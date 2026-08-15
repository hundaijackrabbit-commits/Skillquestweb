import type { BlogPost, Career, Skill, SkillPath } from './types';

export type SkillQualityFlag =
  | 'placeholder-title'
  | 'generic-definition'
  | 'generic-long-definition'
  | 'generic-value-copy'
  | 'generic-practice-copy'
  | 'thin-core-content'
  | 'missing-applied-context'
  | 'missing-evidence-notes';

export type SkillQualityAssessment = {
  score: number;
  indexable: boolean;
  flags: SkillQualityFlag[];
};

const placeholderTitlePattern = /\b(?:specialized|professional) skill \d+\b/i;

const genericDefinitionPatterns = [
  /^The ability to effectively /i,
  /^The capability to .* teams and organizations/i,
  /^Professional competency in .* for solving complex challenges and driving results/i,
];

const genericLongDefinitionPatterns = [
  /encompasses comprehensive understanding and practical application of relevant principles, methodologies, and best practices/i,
  /requires systematic development through training, practice, and real-world application to achieve mastery/i,
];

const genericValuePatterns = [
  /is increasingly important for professional success, enabling individuals to contribute more effectively to organizational goals/i,
  /is increasingly important for professional success, enabling individuals to contribute value in today'?s competitive business environment/i,
  /highly relevant in today'?s fast-paced, technology-enabled business environment/i,
  /digital transformation and evolving business landscapes have made this skill more critical than ever/i,
  /digital transformation and remote work have made this skill more critical than ever/i,
  /critical in the AI era where professionals must understand how to leverage artificial intelligence/i,
  /essential for success in hybrid and remote work environments where traditional face-to-face interaction patterns have been disrupted/i,
  /is crucial for .* in today'?s competitive business environment\. Organizations increasingly value professionals/i,
  /directly impacts revenue growth and business sustainability by ensuring customers achieve their desired outcomes/i,
  /increasingly vital as businesses shift from product-centric to customer-centric models/i,
  /is crucial for remaining competitive in our increasingly digital and AI-driven economy/i,
  /remains relevant in the AI era by providing uniquely human capabilities that complement artificial intelligence/i,
  /remains highly relevant by providing strategic thinking and human judgment capabilities that complement artificial intelligence/i,
  /maintains relevance in the AI era by complementing technological capabilities with human insight and judgment/i,
  /evolves in the AI era, requiring understanding of how AI tools can augment traditional technical capabilities/i,
  /is central to (?:success in the AI era|AI-era success)/i,
  /remains relevant by providing uniquely human capabilities that complement artificial intelligence/i,
  /leverages uniquely human capabilities like emotional intelligence, creativity, and complex judgment that AI cannot replicate/i,
  /leverages uniquely human capabilities including strategic thinking, emotional intelligence, complex problem-solving, and contextual judgment/i,
  /requires .* that AI cannot fully replicate/i,
  /leverages human capabilities like creativity, emotional intelligence, and complex judgment/i,
];

const genericPracticePatterns = [
  /^Develop .* through daily application, structured practice, professional development programs, and mentorship opportunities\.?$/i,
  /^Measure .* progress through performance metrics, feedback collection, and outcome tracking\.?$/i,
  /^Seek opportunities to apply .* in current role, join relevant professional communities, volunteer for challenging assignments/i,
  /^Track project outcomes and performance metrics related to .* application, collect feedback from supervisors and peers/i,
  /^Develop .* through hands-on application, structured learning programs, professional development opportunities/i,
  /^Measure .* progress through performance metrics, stakeholder feedback, project outcomes/i,
];

function matchesAny(value: string | undefined, patterns: RegExp[]) {
  return patterns.some((pattern) => pattern.test(value?.trim() ?? ''));
}

/**
 * Editorial gate for search discovery. It deliberately favors fewer, stronger
 * pages over indexing placeholder or highly templated copy at scale.
 */
export function assessSkillContentQuality(skill: Skill): SkillQualityAssessment {
  const flags: SkillQualityFlag[] = [];
  let score = 100;

  if (placeholderTitlePattern.test(skill.name)) {
    flags.push('placeholder-title');
    score -= 55;
  }

  if (matchesAny(skill.shortDefinition, genericDefinitionPatterns)) {
    flags.push('generic-definition');
    score -= 45;
  }

  if (matchesAny(skill.fullDefinition, genericLongDefinitionPatterns)) {
    flags.push('generic-long-definition');
    score -= 10;
  }

  if (
    matchesAny(skill.whyItMatters, genericValuePatterns) ||
    matchesAny(skill.modernRelevance, genericValuePatterns) ||
    matchesAny(skill.aiEraRelevance, genericValuePatterns)
  ) {
    flags.push('generic-value-copy');
    score -= 5;
  }

  if (
    matchesAny(skill.howToPractice, genericPracticePatterns) ||
    matchesAny(skill.howToMeasureProgress, genericPracticePatterns)
  ) {
    flags.push('generic-practice-copy');
    score -= 5;
  }

  const coreLength = [
    skill.shortDefinition,
    skill.fullDefinition,
    skill.whyItMatters,
    skill.modernRelevance,
  ].reduce((total, value) => total + value.trim().length, 0);

  if (coreLength < 620) {
    flags.push('thin-core-content');
    score -= 30;
  }

  if (
    !skill.skillInAction?.trim() &&
    !skill.whereItShowsUp?.trim() &&
    (skill.realWorldScenarios?.length ?? 0) === 0
  ) {
    flags.push('missing-applied-context');
    score -= 4;
  }

  if (!skill.evidenceSummary?.trim() && (skill.scholarlyNotes?.length ?? 0) === 0) {
    flags.push('missing-evidence-notes');
    score -= 2;
  }

  const blockingFlags: SkillQualityFlag[] = [
    'placeholder-title',
    'generic-definition',
    'thin-core-content',
  ];
  const hasBlockingFlag = flags.some((flag) => blockingFlags.includes(flag));

  return {
    score: Math.max(0, score),
    indexable: score >= 65 && !hasBlockingFlag,
    flags,
  };
}

const genericCareerPatterns = [
  /work across various contexts to deliver value through specialized expertise and professional services/i,
  /apply specialized expertise to solve complex challenges and deliver value within their professional domains/i,
  /leverage specialized expertise to drive organizational success through focused application of industry knowledge/i,
];

const genericCareerEvidencePatterns = [
  /^Bachelor'?s degree typically preferred, though relevant experience and skills often valued equally/i,
  /^Relevant degree or equivalent experience typically required/i,
  /^Education requirements vary by role/i,
  /^Relevant education and experience requirements vary by role/i,
  /^Stable to positive growth outlook with evolving skill requirements/i,
  /^Growth outlook varies by specialization/i,
  /^Growth prospects vary by specialization/i,
];

export function isCareerIndexable(career: Career) {
  return !matchesAny(career.whatTheyDo, genericCareerPatterns);
}

export function isCareerEvidenceUseful(value: string | undefined) {
  return Boolean(value?.trim()) && !matchesAny(value, genericCareerEvidencePatterns);
}

const genericPathPatterns = [
  /^Develop comprehensive expertise in .* through structured learning and practical application\.?$/i,
];

export function isSkillPathIndexable(path: SkillPath) {
  return !matchesAny(path.description, genericPathPatterns);
}

const repeatedBlogPatterns = [
  /This topic matters because it shapes how professionals make decisions, collaborate with others, and create results that other people can actually trust/i,
  /Do not think of this as a one-time lesson\. Think of it as a professional advantage that compounds/i,
];

export function isBlogPostIndexable(post: BlogPost) {
  return !matchesAny(post.content, repeatedBlogPatterns);
}

export function isSkillIndexable(skill: Skill) {
  return assessSkillContentQuality(skill).indexable;
}

export function isSkillFieldEditoriallyUseful(
  skill: Skill,
  field:
    | 'fullDefinition'
    | 'whyItMatters'
    | 'modernRelevance'
    | 'aiEraRelevance'
    | 'humanAdvantage'
    | 'howToPractice'
    | 'howToMeasureProgress',
) {
  const value = skill[field];
  if (!value?.trim()) return false;
  if (field === 'fullDefinition') return !matchesAny(value, genericLongDefinitionPatterns);
  if (field === 'howToPractice' || field === 'howToMeasureProgress') {
    return !matchesAny(value, genericPracticePatterns);
  }
  return !matchesAny(value, genericValuePatterns);
}

export function compareSkillsForDiscovery(left: Skill, right: Skill) {
  if (left.featured !== right.featured) return left.featured ? -1 : 1;

  const scoreDifference =
    assessSkillContentQuality(right).score - assessSkillContentQuality(left).score;
  if (scoreDifference !== 0) return scoreDifference;

  const signalDifference = right.employerSignalValue - left.employerSignalValue;
  if (signalDifference !== 0) return signalDifference;

  return left.name.localeCompare(right.name);
}
