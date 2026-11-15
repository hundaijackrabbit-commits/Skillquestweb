import { TOPICS, type TopicDefinition } from './topics';
import type { SkillCategory } from './types';

export type SkillDomainDefinition = {
  slug: string;
  name: string;
  description: string;
  purpose: string;
  topics: SkillCategory[];
};

/**
 * Broad navigation layer above the existing topic taxonomy.
 *
 * Domains are intentionally additive: every existing topic keeps its slug,
 * page, skills, and relationships. This layer only makes the library easier
 * to scan and gives future skill-tree work a stable top-level structure.
 */
export const SKILL_DOMAINS: SkillDomainDefinition[] = [
  {
    slug: 'people-communication',
    name: 'People & Communication',
    description: 'Communicate clearly, work well with others, lead people, and build healthy team practices.',
    purpose: 'For work that depends on shared understanding, coordination, leadership, and people development.',
    topics: ['communication', 'leadership', 'collaboration', 'human-resources'],
  },
  {
    slug: 'thinking-effectiveness',
    name: 'Thinking & Effectiveness',
    description: 'Strengthen judgment, problem framing, focus, prioritization, and dependable execution.',
    purpose: 'For making better decisions and turning attention and effort into consistent results.',
    topics: ['critical-thinking', 'personal-effectiveness'],
  },
  {
    slug: 'business-operations',
    name: 'Business & Operations',
    description: 'Understand value creation, customers, growth, money, processes, and operational delivery.',
    purpose: 'For connecting strategy and customer needs with the systems that make an organization work.',
    topics: ['business-strategy', 'sales-marketing', 'finance-operations', 'customer-success'],
  },
  {
    slug: 'digital-technology',
    name: 'Digital & Technology',
    description: 'Use, build, evaluate, and improve the digital systems and AI tools shaping modern work.',
    purpose: 'For building digital confidence and progressing into technical, automation, and AI-enabled work.',
    topics: ['digital-literacy', 'technical', 'ai-era'],
  },
  {
    slug: 'data-research',
    name: 'Data & Research',
    description: 'Gather evidence, analyze information, test ideas, and communicate what the data supports.',
    purpose: 'For turning questions and evidence into findings people can understand and use.',
    topics: ['analytics-research'],
  },
  {
    slug: 'creative-experience',
    name: 'Creative & Experience',
    description: 'Create useful content, stories, interfaces, and experiences around real audience and user needs.',
    purpose: 'For shaping how information, products, and experiences are understood, used, and remembered.',
    topics: ['content-media', 'design-ux'],
  },
];

const topicBySlug = new Map<SkillCategory, TopicDefinition>(
  TOPICS.map((topic) => [topic.slug, topic]),
);

export function getTopicsForDomain(domain: SkillDomainDefinition) {
  return domain.topics
    .map((slug) => topicBySlug.get(slug))
    .filter((topic): topic is TopicDefinition => Boolean(topic));
}

export function getDomainForTopic(topicSlug: SkillCategory) {
  return SKILL_DOMAINS.find((domain) => domain.topics.includes(topicSlug)) ?? null;
}
