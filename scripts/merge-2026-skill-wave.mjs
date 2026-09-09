import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const canonicalPath = path.join(root, 'src/data/skills-1000plus.json');
const wavePaths = [
  path.join(root, 'src/data/skills-2026-wave1.json'),
  path.join(root, 'src/data/skills-2026-wave2.json'),
  path.join(root, 'src/data/skills-2026-wave3.json'),
  path.join(root, 'src/data/skills-2026-wave4.json'),
  path.join(root, 'src/data/skills-2026-wave5.json'),
];

const canonical = JSON.parse(fs.readFileSync(canonicalPath, 'utf8'));
const rawWaves = wavePaths.flatMap((wavePath) => fs.existsSync(wavePath)
  ? JSON.parse(fs.readFileSync(wavePath, 'utf8'))
  : []);

const allowedCategories = new Set([
  'communication',
  'leadership',
  'critical-thinking',
  'collaboration',
  'personal-effectiveness',
  'business-strategy',
  'sales-marketing',
  'finance-operations',
  'human-resources',
  'customer-success',
  'digital-literacy',
  'content-media',
  'design-ux',
  'technical',
  'analytics-research',
  'remote-work',
  'entrepreneurship',
  'freelance-gig',
  'ai-era',
  'future-resistant',
]);

const categoryAliases = {
  digital: 'digital-literacy',
  business: 'business-strategy',
  data: 'analytics-research',
  analytics: 'analytics-research',
  ai: 'ai-era',
};

function sanitizeResearchSkill(skill) {
  const category = categoryAliases[skill.category] ?? skill.category;
  if (!allowedCategories.has(category)) {
    throw new Error(`Unsupported researched skill category: ${skill.name} -> ${skill.category}`);
  }

  const professionalContexts = Array.isArray(skill.professionalContexts) && skill.professionalContexts.length
    ? skill.professionalContexts
    : skill.whereItShowsUp
      ? [skill.whereItShowsUp]
      : [];

  return {
    ...skill,
    category,
    professionalContexts,
    careers: Array.isArray(skill.careers) ? skill.careers : [],
    industries: Array.isArray(skill.industries) ? skill.industries : [],
    resumeRelevance: skill.resumeRelevance || `Show ${skill.name} through specific projects, responsibilities, decisions, or measurable outcomes rather than listing the skill alone.`,
    interviewRelevance: skill.interviewRelevance || `Be ready to explain a concrete example of using ${skill.name}, the trade-offs you considered, what you did, and what changed as a result.`,
    humanAdvantage: skill.humanAdvantage || `Human judgment remains important for context, trade-offs, accountability, and deciding when ${skill.name} should be applied or challenged.`,
    blogPosts: Array.isArray(skill.blogPosts) ? skill.blogPosts : [],
  };
}

const waves = rawWaves.map(sanitizeResearchSkill);

const normalize = (value = '') => value.trim().toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const identityKeys = (skill) => [normalize(skill.id), normalize(skill.slug), normalize(skill.name)].filter(Boolean);
const primaryKey = (skill) => normalize(skill.slug || skill.id || skill.name);

// Replace an older canonical record whenever a researched edition matches any
// of its identity fields. This lets the audit waves upgrade existing pages.
const researchedKeys = new Set(waves.flatMap(identityKeys));
const preserved = canonical.filter((skill) => !identityKeys(skill).some((key) => researchedKeys.has(key)));
const merged = [...preserved, ...waves];

// Validate actual record identity without treating legitimate cross-field
// values as duplicate records.
const seenPrimary = new Set();
for (const skill of merged) {
  const key = primaryKey(skill);
  if (!key) throw new Error('Skill is missing id, slug, and name');
  if (seenPrimary.has(key)) throw new Error(`Duplicate skill record after merge: ${key}`);
  seenPrimary.add(key);
}

if (JSON.stringify(canonical) === JSON.stringify(merged)) {
  console.log('Canonical dataset already matches researched editions.');
  process.exit(0);
}

fs.writeFileSync(canonicalPath, `${JSON.stringify(merged, null, 2)}\n`);
console.log(`Refreshed canonical dataset with ${waves.length} researched skill editions.`);
