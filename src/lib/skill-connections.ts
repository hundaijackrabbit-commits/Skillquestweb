import type { Skill } from '@/lib/types';

function normalized(value: string) {
  return value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function references(skill: Skill, values: string[], target: Skill) {
  const targetValues = new Set([target.id, target.slug, target.name].map(normalized));
  return values.some((value) => targetValues.has(normalized(value)));
}

export function getSkillConnectionReason(origin: Skill, target: Skill) {
  if (references(origin, origin.prerequisiteSkills, target)) {
    return `Foundation: ${target.name} supports the decisions and actions used in ${origin.name}.`;
  }
  if (references(target, target.prerequisiteSkills, origin)) {
    return `Progression: use ${origin.name} as a base for developing ${target.name}.`;
  }
  if (references(origin, origin.skillStacksWell ?? [], target)) {
    return `Skill stack: combining these two capabilities creates more useful evidence of performance.`;
  }

  const sharedCareers = target.careers.filter((career) => origin.careers.includes(career)).length;
  if (sharedCareers > 0) {
    return `Career bridge: both skills contribute to ${sharedCareers} connected career ${sharedCareers === 1 ? 'profile' : 'profiles'}.`;
  }

  const sharedIndustries = target.industries.filter((industry) => origin.industries.includes(industry)).length;
  if (sharedIndustries > 0) {
    return `Transfer route: both skills appear across ${sharedIndustries} shared ${sharedIndustries === 1 ? 'industry' : 'industries'}.`;
  }

  if (origin.category === target.category) {
    return `Depth move: this extends your capability within the ${origin.category.replaceAll('-', ' ')} skill family.`;
  }

  return `Complementary move: this adds a different capability to your ${origin.name} practice.`;
}

