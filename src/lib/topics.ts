import {
  getAllBlogPosts,
  getAllCareers,
  getAllIndustries,
  getIndexableSkills,
  getSkillPaths,
} from './content';
import {
  compareSkillsForDiscovery,
  isBlogPostIndexable,
  isCareerIndexable,
  isSkillPathIndexable,
} from './content-quality';
import type { BlogPost, Career, Industry, Skill, SkillCategory, SkillPath } from './types';

export type TopicDefinition = {
  slug: SkillCategory;
  name: string;
  description: string;
  startingPoint: string;
};

export const TOPICS: TopicDefinition[] = [
  {
    slug: 'communication',
    name: 'Communication',
    description: 'Make ideas easier to understand, adapt messages to the room, and handle difficult conversations with more clarity.',
    startingPoint: 'Start with the skills that improve everyday writing, listening, speaking, and feedback.',
  },
  {
    slug: 'leadership',
    name: 'Leadership',
    description: 'Help people coordinate, make decisions, and move through change without relying on authority alone.',
    startingPoint: 'Begin with self-awareness, direction-setting, delegation, and useful feedback.',
  },
  {
    slug: 'critical-thinking',
    name: 'Critical Thinking',
    description: 'Examine claims, frame problems, test assumptions, and make decisions that can withstand scrutiny.',
    startingPoint: 'Build from evidence evaluation and problem framing toward judgment under uncertainty.',
  },
  {
    slug: 'collaboration',
    name: 'Collaboration',
    description: 'Work across roles and viewpoints while keeping ownership, information, and expectations visible.',
    startingPoint: 'Start with team communication, coordination, conflict resolution, and shared decision-making.',
  },
  {
    slug: 'personal-effectiveness',
    name: 'Personal Effectiveness',
    description: 'Manage attention, commitments, energy, and learning so good intentions turn into dependable work.',
    startingPoint: 'Begin with prioritization, focus, self-management, and reflective improvement.',
  },
  {
    slug: 'business-strategy',
    name: 'Business & Strategy',
    description: 'Understand how organizations create value, choose priorities, and respond to customers and competitors.',
    startingPoint: 'Start with business models, strategic analysis, decision-making, and execution.',
  },
  {
    slug: 'sales-marketing',
    name: 'Sales & Marketing',
    description: 'Find the right audience, communicate value, earn attention, and learn from real market response.',
    startingPoint: 'Begin with customer understanding, positioning, persuasive communication, and measurement.',
  },
  {
    slug: 'finance-operations',
    name: 'Finance & Operations',
    description: 'Turn resources, processes, and financial information into more reliable organizational decisions.',
    startingPoint: 'Start with financial literacy, process thinking, planning, and operational control.',
  },
  {
    slug: 'human-resources',
    name: 'People & HR',
    description: 'Support fair hiring, useful development, healthy performance, and better employee experiences.',
    startingPoint: 'Begin with interviewing, coaching, performance conversations, and organizational awareness.',
  },
  {
    slug: 'customer-success',
    name: 'Customer Success',
    description: 'Understand customer goals, solve service problems, and build relationships that continue after a sale.',
    startingPoint: 'Start with discovery, expectation-setting, service recovery, and outcome measurement.',
  },
  {
    slug: 'digital-literacy',
    name: 'Digital Literacy',
    description: 'Use digital systems confidently, evaluate online information, and work safely across modern tools.',
    startingPoint: 'Begin with information fluency, digital collaboration, privacy, and practical tool use.',
  },
  {
    slug: 'content-media',
    name: 'Content & Media',
    description: 'Shape useful stories and information for the formats, channels, and audiences that receive them.',
    startingPoint: 'Start with audience intent, writing, editorial judgment, production, and distribution.',
  },
  {
    slug: 'design-ux',
    name: 'Design & UX',
    description: 'Make products and information easier to understand, use, and trust through evidence-led design.',
    startingPoint: 'Begin with user needs, information structure, prototyping, accessibility, and testing.',
  },
  {
    slug: 'technical',
    name: 'Technical Skills',
    description: 'Build, operate, and improve digital systems with a practical understanding of how the pieces connect.',
    startingPoint: 'Choose a foundation in programming, systems, security, cloud, or software delivery.',
  },
  {
    slug: 'analytics-research',
    name: 'Analytics & Research',
    description: 'Ask better questions, gather credible evidence, and translate findings into decisions people can use.',
    startingPoint: 'Start with research design, data interpretation, visualization, and communicating uncertainty.',
  },
  {
    slug: 'ai-era',
    name: 'AI & Automation',
    description: 'Use AI systems with sound judgment while understanding their limits, risks, and changing role at work.',
    startingPoint: 'Begin with AI literacy, verification, workflow design, data awareness, and responsible use.',
  },
];

export function getTopicBySlug(slug: string) {
  return TOPICS.find((topic) => topic.slug === slug) ?? null;
}

function referenceKey(value: string) {
  return value
    .trim()
    .toLocaleLowerCase('en')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function topicReferenceSet(skills: Skill[]) {
  return new Set(skills.flatMap((skill) => [skill.id, skill.slug, skill.name].map(referenceKey)));
}

function overlapCount(references: string[], referenceSet: Set<string>) {
  return references.reduce(
    (total, reference) => total + (referenceSet.has(referenceKey(reference)) ? 1 : 0),
    0,
  );
}

function rankCareers(careers: Career[], references: Set<string>) {
  return careers
    .map((career) => ({
      item: career,
      score: overlapCount(
        [...career.coreSkills, ...career.secondarySkills, ...career.transferableSkills],
        references,
      ),
    }))
    .filter(({ score }) => score > 0)
    .sort((left, right) => right.score - left.score || left.item.title.localeCompare(right.item.title))
    .slice(0, 8)
    .map(({ item }) => item);
}

function rankIndustries(industries: Industry[], references: Set<string>) {
  return industries
    .map((industry) => ({
      item: industry,
      score: overlapCount([...industry.criticalSkills, ...industry.emergingSkills], references),
    }))
    .filter(({ score }) => score > 0)
    .sort((left, right) => right.score - left.score || left.item.name.localeCompare(right.item.name))
    .slice(0, 6)
    .map(({ item }) => item);
}

function rankPaths(paths: SkillPath[], references: Set<string>, topicSlug: string) {
  return paths
    .map((path) => ({
      item: path,
      score: overlapCount(path.skills, references) + (referenceKey(path.category) === topicSlug ? 3 : 0),
    }))
    .filter(({ score }) => score > 0)
    .sort((left, right) => right.score - left.score || left.item.name.localeCompare(right.item.name))
    .slice(0, 6)
    .map(({ item }) => item);
}

function rankPosts(posts: BlogPost[], references: Set<string>, topicSlug: string) {
  return posts
    .map((post) => ({
      item: post,
      score:
        overlapCount(post.relatedSkills, references) * 2 +
        post.tags.filter((tag) => referenceKey(tag) === topicSlug).length +
        (referenceKey(post.category ?? '') === topicSlug ? 2 : 0),
    }))
    .filter(({ score }) => score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, 6)
    .map(({ item }) => item);
}

export async function getTopicContent(topicSlug: SkillCategory) {
  const [allSkills, paths, careers, industries, posts] = await Promise.all([
    getIndexableSkills(),
    getSkillPaths(),
    getAllCareers(),
    getAllIndustries(),
    getAllBlogPosts(),
  ]);
  const skills = allSkills
    .filter((skill) => skill.category === topicSlug)
    .sort(compareSkillsForDiscovery);
  const references = topicReferenceSet(skills);

  return {
    skills,
    paths: rankPaths(paths.filter(isSkillPathIndexable), references, topicSlug),
    careers: rankCareers(careers.filter(isCareerIndexable), references),
    industries: rankIndustries(industries, references),
    posts: rankPosts(posts.filter(isBlogPostIndexable), references, topicSlug),
  };
}
