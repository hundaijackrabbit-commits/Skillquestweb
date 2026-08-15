import type { Career, Industry, Skill } from '@/lib/types';

export const CAREER_INTEREST_OPTIONS = [
  { id: 'maker', label: 'Build & operate', description: 'Make tangible things, improve tools, or keep practical systems working.' },
  { id: 'investigator', label: 'Investigate & solve', description: 'Study evidence, diagnose problems, and make sense of complexity.' },
  { id: 'creator', label: 'Create & communicate', description: 'Develop ideas, stories, experiences, visuals, or original approaches.' },
  { id: 'helper', label: 'Help & develop people', description: 'Teach, support, coach, care for, or strengthen other people.' },
  { id: 'persuader', label: 'Influence & lead', description: 'Mobilize people, shape decisions, negotiate, sell, or build momentum.' },
  { id: 'organizer', label: 'Organize & improve systems', description: 'Create order, coordinate details, and make processes more reliable.' },
] as const;

export const CAREER_GOAL_OPTIONS = [
  { id: 'explore', label: 'Explore my options' },
  { id: 'get-hired', label: 'Become more employable' },
  { id: 'switch', label: 'Change career direction' },
  { id: 'grow', label: 'Grow in my current field' },
  { id: 'lead', label: 'Prepare to lead' },
  { id: 'build-business', label: 'Build a business or freelance' },
] as const;

export const WORK_STYLE_OPTIONS = [
  { id: 'collaborative', label: 'Collaborative', description: 'Frequent teamwork and shared problem-solving.' },
  { id: 'independent', label: 'Independent', description: 'Protected ownership and room to choose the approach.' },
  { id: 'structured', label: 'Structured', description: 'Clear standards, repeatable processes, and defined expectations.' },
  { id: 'fast-moving', label: 'Fast-moving', description: 'Short cycles, changing priorities, and visible momentum.' },
  { id: 'remote-flexible', label: 'Remote or flexible', description: 'Location flexibility and digital-first collaboration.' },
  { id: 'hands-on', label: 'Hands-on', description: 'Direct work with people, products, equipment, or environments.' },
] as const;

export const STRENGTH_OPTIONS = [
  { id: 'communicator', label: 'Communicating clearly' },
  { id: 'analyst', label: 'Finding patterns' },
  { id: 'organizer', label: 'Planning and follow-through' },
  { id: 'creator', label: 'Generating original ideas' },
  { id: 'technologist', label: 'Learning tools and systems' },
  { id: 'leader', label: 'Guiding people and decisions' },
] as const;

export type CareerInterestId = (typeof CAREER_INTEREST_OPTIONS)[number]['id'];
export type CareerGoalId = (typeof CAREER_GOAL_OPTIONS)[number]['id'];
export type WorkStyleId = (typeof WORK_STYLE_OPTIONS)[number]['id'];
export type StrengthId = (typeof STRENGTH_OPTIONS)[number]['id'];

export type ProfileAssessment = {
  version: 1;
  goal: CareerGoalId;
  workStyles: WorkStyleId[];
  strengths: StrengthId[];
  completedAt: string;
};

export type FitRecommendation = {
  slug: string;
  name: string;
  summary: string;
  href: string;
  reason: string;
  signal: 'Strong fit signal' | 'Good fit signal' | 'Worth exploring';
  saved?: boolean;
  category?: string;
};

export type ProfileFitMap = {
  industries: FitRecommendation[];
  careers: FitRecommendation[];
  skills: FitRecommendation[];
};

type ProfileFitInput = {
  careerInterests: string[];
  selectedIndustries: string[];
  assessment: ProfileAssessment | null;
  savedSkillSlugs: string[];
  savedCareerSlugs: string[];
};

type Scored<T> = {
  item: T;
  score: number;
  reasons: Array<{ points: number; text: string }>;
};

const interestSignals: Record<CareerInterestId, { categories: string[]; industries: string[] }> = {
  maker: {
    categories: ['technical', 'finance-operations', 'digital-literacy'],
    industries: ['technology', 'manufacturing', 'retail'],
  },
  investigator: {
    categories: ['critical-thinking', 'analytics-research', 'ai-era', 'finance-operations'],
    industries: ['technology', 'finance', 'healthcare', 'consulting'],
  },
  creator: {
    categories: ['content-media', 'design-ux', 'communication', 'sales-marketing'],
    industries: ['marketing', 'technology', 'retail', 'education'],
  },
  helper: {
    categories: ['customer-success', 'human-resources', 'communication', 'collaboration'],
    industries: ['healthcare', 'education', 'consulting', 'retail'],
  },
  persuader: {
    categories: ['leadership', 'sales-marketing', 'business-strategy', 'entrepreneurship'],
    industries: ['marketing', 'consulting', 'finance', 'retail'],
  },
  organizer: {
    categories: ['personal-effectiveness', 'finance-operations', 'business-strategy', 'remote-work'],
    industries: ['finance', 'manufacturing', 'consulting', 'healthcare'],
  },
};

const strengthCategories: Record<StrengthId, string[]> = {
  communicator: ['communication', 'collaboration', 'customer-success'],
  analyst: ['critical-thinking', 'analytics-research', 'finance-operations'],
  organizer: ['personal-effectiveness', 'business-strategy', 'finance-operations'],
  creator: ['content-media', 'design-ux', 'sales-marketing'],
  technologist: ['technical', 'digital-literacy', 'ai-era'],
  leader: ['leadership', 'human-resources', 'entrepreneurship'],
};

const goalCategories: Record<CareerGoalId, string[]> = {
  explore: ['future-resistant', 'personal-effectiveness'],
  'get-hired': ['communication', 'personal-effectiveness', 'digital-literacy'],
  switch: ['future-resistant', 'digital-literacy', 'critical-thinking'],
  grow: ['leadership', 'business-strategy', 'communication'],
  lead: ['leadership', 'collaboration', 'human-resources'],
  'build-business': ['entrepreneurship', 'sales-marketing', 'finance-operations'],
};

function normalized(value: string) {
  return value.trim().toLocaleLowerCase('en').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function signalForScore(score: number): FitRecommendation['signal'] {
  if (score >= 14) return 'Strong fit signal';
  if (score >= 8) return 'Good fit signal';
  return 'Worth exploring';
}

function strongestReason(reasons: Scored<unknown>['reasons'], fallback: string) {
  return [...reasons].sort((left, right) => right.points - left.points)[0]?.text ?? fallback;
}

function interestLabel(id: string) {
  return CAREER_INTEREST_OPTIONS.find((option) => option.id === id)?.label ?? 'your interests';
}

export function isProfileAssessment(value: unknown): value is ProfileAssessment {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Partial<ProfileAssessment>;
  return (
    candidate.version === 1 &&
    CAREER_GOAL_OPTIONS.some((option) => option.id === candidate.goal) &&
    Array.isArray(candidate.workStyles) &&
    candidate.workStyles.every((style) => WORK_STYLE_OPTIONS.some((option) => option.id === style)) &&
    Array.isArray(candidate.strengths) &&
    candidate.strengths.every((strength) => STRENGTH_OPTIONS.some((option) => option.id === strength)) &&
    typeof candidate.completedAt === 'string'
  );
}

export function buildProfileFitMap(
  input: ProfileFitInput,
  skills: Skill[],
  careers: Career[],
  industries: Industry[],
): ProfileFitMap {
  const selectedIndustrySet = new Set(input.selectedIndustries.map(normalized));
  const selectedInterests = input.careerInterests.filter((interest): interest is CareerInterestId =>
    CAREER_INTEREST_OPTIONS.some((option) => option.id === interest),
  );
  const strengths = input.assessment?.strengths ?? [];
  const workStyles = input.assessment?.workStyles ?? [];
  const goal = input.assessment?.goal ?? 'explore';
  const savedSkills = new Set(input.savedSkillSlugs.map(normalized));
  const savedCareers = new Set(input.savedCareerSlugs.map(normalized));
  const skillByReference = new Map<string, Skill>();

  for (const skill of skills) {
    for (const reference of [skill.id, skill.slug, skill.name]) {
      skillByReference.set(normalized(reference), skill);
    }
  }

  const scoredIndustries: Array<Scored<Industry>> = industries.map((industry) => {
    const reasons: Scored<Industry>['reasons'] = [];
    let score = industry.featured ? 1 : 0;

    if (selectedIndustrySet.has(normalized(industry.slug))) {
      score += 16;
      reasons.push({ points: 16, text: 'You marked this as an industry you want to explore.' });
    }

    for (const interest of selectedInterests) {
      if (interestSignals[interest].industries.includes(industry.slug)) {
        score += 5;
        reasons.push({ points: 5, text: `${interestLabel(interest)} commonly connects with this kind of work.` });
      }
    }

    if (goal === 'build-business' && ['marketing', 'retail', 'consulting', 'finance'].includes(industry.slug)) {
      score += 4;
      reasons.push({ points: 4, text: 'It offers useful context for your business-building goal.' });
    }

    if (workStyles.includes('structured') && ['finance', 'healthcare', 'manufacturing'].includes(industry.slug)) {
      score += 3;
      reasons.push({ points: 3, text: 'Its standards and operating systems align with your preference for structure.' });
    }

    if (workStyles.includes('fast-moving') && ['technology', 'marketing', 'retail'].includes(industry.slug)) {
      score += 3;
      reasons.push({ points: 3, text: 'It often rewards short learning cycles and adaptability.' });
    }

    return { item: industry, score, reasons };
  });

  const topIndustries = scoredIndustries
    .sort((left, right) => right.score - left.score || left.item.name.localeCompare(right.item.name))
    .slice(0, 3);
  const topIndustrySlugs = new Set(topIndustries.map(({ item }) => normalized(item.slug)));

  const scoredCareers: Array<Scored<Career>> = careers.map((career) => {
    const reasons: Scored<Career>['reasons'] = [];
    let score = career.featured ? 1 : 0;

    const industryMatches = career.commonIndustries.filter((industry) =>
      selectedIndustrySet.has(normalized(industry)) || topIndustrySlugs.has(normalized(industry)),
    );
    if (industryMatches.length > 0) {
      score += Math.min(9, industryMatches.length * 5);
      reasons.push({ points: 7, text: 'It appears in industries that match your current interests.' });
    }

    const careerSkills = [...career.coreSkills, ...career.secondarySkills]
      .map((reference) => skillByReference.get(normalized(reference)))
      .filter((skill): skill is Skill => Boolean(skill));

    for (const interest of selectedInterests) {
      const matches = careerSkills.filter((skill) => interestSignals[interest].categories.includes(skill.category));
      if (matches.length > 0) {
        score += Math.min(8, matches.length * 3);
        reasons.push({ points: 6, text: `Its skill mix connects with your ${interestLabel(interest).toLocaleLowerCase('en')} interest.` });
      }
    }

    const savedCoreMatches = career.coreSkills.filter((reference) => savedSkills.has(normalized(reference))).length;
    if (savedCoreMatches > 0) {
      score += savedCoreMatches * 4;
      reasons.push({ points: 8, text: 'You already saved skills that this career uses at its core.' });
    }

    if (goal === 'get-hired' && (career.demandLevel === 'high' || career.demandLevel === 'very-high')) {
      score += 4;
      reasons.push({ points: 4, text: 'Its profile carries a strong demand signal in the repository.' });
    }
    if (goal === 'lead' && /manager|lead|director|administrator/i.test(career.title)) {
      score += 5;
      reasons.push({ points: 5, text: 'The role creates a direct bridge toward people or decision leadership.' });
    }
    if (goal === 'build-business' && /sales|marketing|product|account|operations|consult/i.test(career.title)) {
      score += 5;
      reasons.push({ points: 5, text: 'The role develops capabilities that transfer into client or business ownership.' });
    }
    if (workStyles.includes('remote-flexible') && career.workEnvironments.some((environment) => /remote|digital/i.test(environment))) {
      score += 4;
      reasons.push({ points: 4, text: 'Its listed work environments include remote or digital-first settings.' });
    }

    return { item: career, score, reasons };
  });

  const topCareers = scoredCareers
    .sort((left, right) => right.score - left.score || left.item.title.localeCompare(right.item.title))
    .slice(0, 4);
  const scoredSkills: Array<Scored<Skill>> = skills.map((skill) => {
    const reasons: Scored<Skill>['reasons'] = [];
    let score = skill.featured ? 1 : 0;

    for (const interest of selectedInterests) {
      if (interestSignals[interest].categories.includes(skill.category)) {
        score += 6;
        reasons.push({ points: 6, text: `It develops capability connected to ${interestLabel(interest).toLocaleLowerCase('en')}.` });
      }
    }

    for (const strength of strengths) {
      if (strengthCategories[strength].includes(skill.category)) {
        score += 4;
        reasons.push({ points: 4, text: 'It builds naturally from a strength you already recognize.' });
      }
    }

    if (goalCategories[goal].includes(skill.category)) {
      score += 4;
      reasons.push({ points: 4, text: 'It supports the career goal you selected.' });
    }

    const selectedIndustryMatch = skill.industries.some((industry) => selectedIndustrySet.has(normalized(industry)));
    const industryPriorityMatch = industries.some(
      (industry) =>
        selectedIndustrySet.has(normalized(industry.slug)) &&
        [...industry.criticalSkills, ...industry.emergingSkills].some((reference) => normalized(reference) === normalized(skill.slug)),
    );
    if (selectedIndustryMatch || industryPriorityMatch) {
      score += industryPriorityMatch ? 8 : 5;
      reasons.push({ points: industryPriorityMatch ? 8 : 5, text: 'It is directly connected to an industry you selected.' });
    }

    const careerMatch = topCareers.some(({ item: career }) =>
      [...career.coreSkills, ...career.secondarySkills].some((reference) => normalized(reference) === normalized(skill.slug)),
    );
    if (careerMatch) {
      score += 7;
      reasons.push({ points: 7, text: 'It appears in the skill mix of one of your leading career matches.' });
    }

    if (savedSkills.has(normalized(skill.slug))) score -= 20;
    return { item: skill, score, reasons };
  });

  const topSkills = scoredSkills
    .filter(({ score, item }) => score > 0 && !savedSkills.has(normalized(item.slug)))
    .sort((left, right) => right.score - left.score || right.item.employerSignalValue - left.item.employerSignalValue)
    .slice(0, 6);

  return {
    industries: topIndustries.map(({ item, score, reasons }) => ({
      slug: item.slug,
      name: item.name,
      summary: item.description,
      href: `/industries/${item.slug}`,
      reason: strongestReason(reasons, 'This sector provides a useful comparison point for your fit map.'),
      signal: signalForScore(score),
    })),
    careers: topCareers.map(({ item, score, reasons }) => ({
      slug: item.slug,
      name: item.title,
      summary: item.summary,
      href: `/careers/${item.slug}`,
      reason: strongestReason(reasons, 'This role connects several of the signals in your profile.'),
      signal: signalForScore(score),
      saved: savedCareers.has(normalized(item.slug)),
    })),
    skills: topSkills.map(({ item, score, reasons }) => ({
      slug: item.slug,
      name: item.name,
      summary: item.shortDefinition,
      href: `/skills/${item.slug}`,
      reason: strongestReason(reasons, 'This is a transferable skill worth testing in practice.'),
      signal: signalForScore(score),
      category: item.category,
    })),
  };
}
