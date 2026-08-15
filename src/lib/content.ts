import fs from 'fs';
import path from 'path';
import { cache } from 'react';
import { Skill, Career, Industry, BlogPost, SkillPath, SkillSchema, CareerSchema, IndustrySchema, BlogPostSchema, SkillPathSchema, SearchResult } from './types';
import Fuse from 'fuse.js';

// Data file paths
const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const SKILLS_FILE = path.join(DATA_DIR, 'skills-1000plus.json');
const CAREERS_FILE = path.join(DATA_DIR, 'careers.json');
const INDUSTRIES_FILE = path.join(DATA_DIR, 'industries.json');
const SKILL_PATHS_FILE = path.join(DATA_DIR, 'skill-paths.json');
const BLOG_DIR = path.join(process.cwd(), 'src', 'content', 'blog');

// Content loading functions
export const getAllSkills = cache(async (): Promise<Skill[]> => {
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
});

function normalizedSkillName(skill: Skill) {
  return skill.name.trim().toLocaleLowerCase('en');
}

function normalizedReference(value: string) {
  return value
    .trim()
    .toLocaleLowerCase('en')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function skillMatchesReference(skill: Skill, reference: string) {
  const normalized = normalizedReference(reference);
  return [skill.id, skill.slug, skill.name].some(
    (value) => normalizedReference(value) === normalized,
  );
}

function careerMatchesReference(career: Career, reference: string) {
  const normalized = normalizedReference(reference);
  return [career.id, career.slug, career.title].some(
    (value) => normalizedReference(value) === normalized,
  );
}

function industryMatchesReference(industry: Industry, reference: string) {
  const normalized = normalizedReference(reference);
  return [industry.id, industry.slug, industry.name].some(
    (value) => normalizedReference(value) === normalized,
  );
}

function skillContentScore(skill: Skill) {
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

  const generatedCopyPenalty = [
    /^The ability to effectively /i,
    /^The capability to .* teams and organizations/i,
    /^Professional competency in .* for solving complex challenges and driving results/i,
  ].some((pattern) => pattern.test(skill.shortDefinition)) ? 1_500 : 0;

  return (
    prose.reduce((total, value) => total + (value?.trim().length ?? 0), 0) +
    lists.reduce((total, value) => total + (value?.length ?? 0) * 80, 0) -
    generatedCopyPenalty
  );
}

/**
 * Return one strongest page for each skill name. The source dataset contains
 * legacy name duplicates with suffixed slugs; keeping only the best version in
 * discovery surfaces and the sitemap prevents competing URLs from diluting
 * indexing signals while preserving the old pages for existing links.
 */
export async function getCanonicalSkills(): Promise<Skill[]> {
  const skills = await getAllSkills();
  const canonicalByName = new Map<string, Skill>();

  for (const skill of skills) {
    const key = normalizedSkillName(skill);
    const current = canonicalByName.get(key);

    if (!current || skillContentScore(skill) > skillContentScore(current)) {
      canonicalByName.set(key, skill);
    }
  }

  return [...canonicalByName.values()];
}

export async function getCanonicalSkillForSlug(slug: string): Promise<Skill | null> {
  const skills = await getAllSkills();
  const requested = skills.find((skill) => skill.slug === slug);
  if (!requested) return null;

  const matching = skills.filter(
    (skill) => normalizedSkillName(skill) === normalizedSkillName(requested),
  );

  return matching.reduce((best, skill) =>
    skillContentScore(skill) > skillContentScore(best) ? skill : best,
  );
}

async function canonicalizeSkillList(skills: Skill[]): Promise<Skill[]> {
  const canonicalSkills = await getCanonicalSkills();
  const canonicalByName = new Map(
    canonicalSkills.map((skill) => [normalizedSkillName(skill), skill]),
  );
  const deduplicated = new Map<string, Skill>();

  for (const skill of skills) {
    const canonical = canonicalByName.get(normalizedSkillName(skill)) ?? skill;
    deduplicated.set(canonical.slug, canonical);
  }

  return [...deduplicated.values()];
}

export async function getSkillBySlug(slug: string): Promise<Skill | null> {
  const skills = await getAllSkills();
  return skills.find(skill => skill.slug === slug) || null;
}

export async function getSkillsByCategory(category: string): Promise<Skill[]> {
  const skills = await getCanonicalSkills();
  return skills.filter(skill => skill.category === category);
}

export async function getFeaturedSkills(limit: number = 10): Promise<Skill[]> {
  const skills = await getCanonicalSkills();
  return skills.filter(skill => skill.featured).slice(0, limit);
}

export async function getAllCareers(): Promise<Career[]> {
  try {
    if (!fs.existsSync(CAREERS_FILE)) {
      console.warn('Careers file not found, returning empty array');
      return [];
    }
    
    const fileContent = fs.readFileSync(CAREERS_FILE, 'utf8');
    const rawCareers = JSON.parse(fileContent);
    
    return rawCareers.map((career: unknown) => CareerSchema.parse(career));
  } catch (error) {
    console.error('Error loading careers:', error);
    return [];
  }
}

export async function getCareerBySlug(slug: string): Promise<Career | null> {
  const careers = await getAllCareers();
  return careers.find(career => career.slug === slug) || null;
}

export async function getFeaturedCareers(limit: number = 10): Promise<Career[]> {
  const careers = await getAllCareers();
  return careers.filter(career => career.featured).slice(0, limit);
}

export async function getAllIndustries(): Promise<Industry[]> {
  try {
    if (!fs.existsSync(INDUSTRIES_FILE)) {
      console.warn('Industries file not found, returning empty array');
      return [];
    }
    
    const fileContent = fs.readFileSync(INDUSTRIES_FILE, 'utf8');
    const rawIndustries = JSON.parse(fileContent);
    
    return rawIndustries.map((industry: unknown) => IndustrySchema.parse(industry));
  } catch (error) {
    console.error('Error loading industries:', error);
    return [];
  }
}

export async function getIndustryBySlug(slug: string): Promise<Industry | null> {
  const industries = await getAllIndustries();
  return industries.find(industry => industry.slug === slug) || null;
}

export async function getSkillPaths(): Promise<SkillPath[]> {
  try {
    if (!fs.existsSync(SKILL_PATHS_FILE)) {
      console.warn('Skill paths file not found, returning empty array');
      return [];
    }
    
    const fileContent = fs.readFileSync(SKILL_PATHS_FILE, 'utf8');
    const rawPaths = JSON.parse(fileContent);
    
    return rawPaths.map((path: unknown) => SkillPathSchema.parse(path));
  } catch (error) {
    console.error('Error loading skill paths:', error);
    return [];
  }
}

export async function getSkillPathBySlug(slug: string): Promise<SkillPath | null> {
  const paths = await getSkillPaths();
  return paths.find(path => path.id === slug) || null;
}

export async function getFeaturedSkillPaths(limit: number = 10): Promise<SkillPath[]> {
  const paths = await getSkillPaths();
  return paths.filter(path => path.featured).slice(0, limit);
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    if (!fs.existsSync(BLOG_DIR)) {
      console.warn('Blog directory not found, returning empty array');
      return [];
    }
    
    const files = fs.readdirSync(BLOG_DIR);
    const mdxFiles = files.filter(file => file.endsWith('.mdx'));
    
    const blogPosts: BlogPost[] = [];
    
    for (const file of mdxFiles) {
      const filePath = path.join(BLOG_DIR, file);
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Extract frontmatter and content
      const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
      const match = content.match(frontmatterRegex);
      
      if (match) {
        const frontmatter = parseFrontmatter(match[1]);
        const postContent = match[2];
        
        const blogPost: BlogPost = {
          id: frontmatter.id || path.parse(file).name,
          slug: frontmatter.slug || path.parse(file).name,
          title: frontmatter.title || '',
          excerpt: frontmatter.excerpt || '',
          content: postContent,
          author: frontmatter.author || 'Modern Skill Lab Team',
          publishedAt: frontmatter.publishedAt || new Date().toISOString(),
          lastUpdated: frontmatter.lastUpdated || new Date().toISOString(),
          tags: frontmatter.tags || [],
          relatedSkills: frontmatter.relatedSkills || [],
          relatedCareers: frontmatter.relatedCareers || [],
          relatedIndustries: frontmatter.relatedIndustries || [],
          readTime: frontmatter.readTime || estimateReadingTime(postContent),
          featured: frontmatter.featured || false,
          category: frontmatter.category || undefined,
        };
        
        // Validate with Zod
        blogPosts.push(BlogPostSchema.parse(blogPost));
      }
    }
    
    // Sort by publication date
    return blogPosts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllBlogPosts();
  return posts.find(post => post.slug === slug) || null;
}

export async function getFeaturedBlogPosts(limit: number = 5): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts();
  return posts.filter(post => post.featured).slice(0, limit);
}

export async function resolveSkillReferences(
  references: string[],
  limit?: number,
): Promise<Skill[]> {
  const skills = await getCanonicalSkills();
  const resolved = references
    .map((reference) => skills.find((skill) => skillMatchesReference(skill, reference)))
    .filter((skill): skill is Skill => Boolean(skill));
  const deduplicated = [...new Map(resolved.map((skill) => [skill.slug, skill])).values()];
  return typeof limit === 'number' ? deduplicated.slice(0, limit) : deduplicated;
}

export async function resolveCareerReferences(
  references: string[],
  limit?: number,
): Promise<Career[]> {
  const careers = await getAllCareers();
  const resolved = references
    .map((reference) => careers.find((career) => careerMatchesReference(career, reference)))
    .filter((career): career is Career => Boolean(career));
  const deduplicated = [...new Map(resolved.map((career) => [career.slug, career])).values()];
  return typeof limit === 'number' ? deduplicated.slice(0, limit) : deduplicated;
}

export async function resolveIndustryReferences(
  references: string[],
  limit?: number,
): Promise<Industry[]> {
  const industries = await getAllIndustries();
  const resolved = references
    .map((reference) => industries.find((industry) => industryMatchesReference(industry, reference)))
    .filter((industry): industry is Industry => Boolean(industry));
  const deduplicated = [...new Map(resolved.map((industry) => [industry.slug, industry])).values()];
  return typeof limit === 'number' ? deduplicated.slice(0, limit) : deduplicated;
}

// Search functionality
export async function searchContent(query: string, types: ('skill' | 'career' | 'industry' | 'blog')[] = ['skill', 'career', 'industry', 'blog']): Promise<SearchResult[]> {
  const results: SearchResult[] = [];
  
  if (types.includes('skill')) {
    const skills = await getCanonicalSkills();
    const skillResults = skills.map(skill => ({
      type: 'skill' as const,
      id: skill.id,
      title: skill.name,
      description: skill.shortDefinition,
      slug: skill.slug,
      category: skill.category,
      relevance: 1,
    }));
    results.push(...skillResults);
  }
  
  if (types.includes('career')) {
    const careers = await getAllCareers();
    const careerResults = careers.map(career => ({
      type: 'career' as const,
      id: career.id,
      title: career.title,
      description: career.summary,
      slug: career.slug,
      relevance: 1,
    }));
    results.push(...careerResults);
  }
  
  if (types.includes('industry')) {
    const industries = await getAllIndustries();
    const industryResults = industries.map(industry => ({
      type: 'industry' as const,
      id: industry.id,
      title: industry.name,
      description: industry.description,
      slug: industry.slug,
      relevance: 1,
    }));
    results.push(...industryResults);
  }
  
  if (types.includes('blog')) {
    const posts = await getAllBlogPosts();
    const blogResults = posts.map(post => ({
      type: 'blog' as const,
      id: post.id,
      title: post.title,
      description: post.excerpt,
      slug: post.slug,
      category: post.category,
      relevance: 1,
    }));
    results.push(...blogResults);
  }
  
  if (!query.trim()) return results;
  
  // Use Fuse.js for fuzzy search
  const fuse = new Fuse(results, {
    keys: ['title', 'description'],
    threshold: 0.3,
    includeScore: true,
  });
  
  const searchResults = fuse.search(query);
  return searchResults.map(result => ({
    ...result.item,
    relevance: 1 - (result.score || 0),
  }));
}

// Related content functions
export async function getRelatedSkills(skillId: string, limit: number = 5): Promise<Skill[]> {
  const allSkills = await getAllSkills();
  const skill = allSkills.find(s => s.id === skillId);
  if (!skill) return [];

  const paths = await getSkillPaths();
  const sharedPathReferences = new Set(
    paths
      .filter((path) => path.skills.some((reference) => skillMatchesReference(skill, reference)))
      .flatMap((path) => path.skills)
      .map(normalizedReference),
  );

  const related = allSkills
    .filter((candidate) => candidate.id !== skillId)
    .map((candidate) => {
      let score = 0;
      if (skill.relatedSkills.some((reference) => skillMatchesReference(candidate, reference))) score += 100;
      if (skill.prerequisiteSkills.some((reference) => skillMatchesReference(candidate, reference))) score += 90;
      if (candidate.relatedSkills.some((reference) => skillMatchesReference(skill, reference))) score += 70;
      if (candidate.prerequisiteSkills.some((reference) => skillMatchesReference(skill, reference))) score += 55;
      if (sharedPathReferences.has(normalizedReference(candidate.slug))) score += 60;
      if (skill.skillStacksWell?.some((reference) => skillMatchesReference(candidate, reference))) score += 50;
      if (candidate.category === skill.category) score += 20;
      score += candidate.careers.filter((career) => skill.careers.includes(career)).length * 8;
      score += candidate.industries.filter((industry) => skill.industries.includes(industry)).length * 6;
      return { candidate, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || skillContentScore(b.candidate) - skillContentScore(a.candidate))
    .map(({ candidate }) => candidate);

  return (await canonicalizeSkillList(related)).slice(0, limit);
}

export async function getSkillsForCareer(careerSlug: string): Promise<Skill[]> {
  const career = await getCareerBySlug(careerSlug);
  if (!career) return [];

  return resolveSkillReferences([
    ...career.coreSkills,
    ...career.secondarySkills,
    ...career.transferableSkills,
  ]);
}

export async function getCareersForSkill(skillSlug: string): Promise<Career[]> {
  const skill = await getSkillBySlug(skillSlug);
  if (!skill) return [];

  const allCareers = await getAllCareers();
  const connected = allCareers.filter((career) =>
    [...career.coreSkills, ...career.secondarySkills, ...career.transferableSkills].some(
      (reference) => skillMatchesReference(skill, reference),
    ),
  );
  const declared = await resolveCareerReferences(skill.careers);
  return [...new Map([...connected, ...declared].map((career) => [career.slug, career])).values()];
}

export async function getRelatedCareers(careerSlug: string, limit: number = 6): Promise<Career[]> {
  const career = await getCareerBySlug(careerSlug);
  if (!career) return [];

  const careers = await getAllCareers();
  const declared = await resolveCareerReferences(career.relatedCareers);
  const scored = careers
    .filter((candidate) => candidate.slug !== career.slug)
    .map((candidate) => ({
      candidate,
      score:
        candidate.commonIndustries.filter((industry) => career.commonIndustries.includes(industry)).length * 12 +
        candidate.coreSkills.filter((skill) => career.coreSkills.includes(skill)).length * 10,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ candidate }) => candidate);

  return [...new Map([...declared, ...scored].map((candidate) => [candidate.slug, candidate])).values()]
    .slice(0, limit);
}

export async function getCareersForIndustry(industrySlug: string): Promise<Career[]> {
  const industry = await getIndustryBySlug(industrySlug);
  if (!industry) return [];

  const allCareers = await getAllCareers();
  return allCareers.filter(career =>
    career.commonIndustries.includes(industry.slug) ||
    career.commonIndustries.includes(industry.id)
  );
}

export async function getSkillsForIndustry(industrySlug: string): Promise<Skill[]> {
  const industry = await getIndustryBySlug(industrySlug);
  if (!industry) return [];

  const declared = await resolveSkillReferences([
    ...industry.criticalSkills,
    ...industry.emergingSkills,
  ]);
  const allSkills = await getCanonicalSkills();
  const reverseLinked = allSkills.filter((skill) =>
    skill.industries.some((reference) => industryMatchesReference(industry, reference)),
  );
  return [...new Map([...declared, ...reverseLinked].map((skill) => [skill.slug, skill])).values()];
}

export async function getIndustriesForSkill(skillSlug: string, limit: number = 5): Promise<Industry[]> {
  const skill = await getSkillBySlug(skillSlug);
  if (!skill) return [];

  const industries = await getAllIndustries();
  const declared = await resolveIndustryReferences(skill.industries);
  const reverseLinked = industries.filter((industry) =>
    [...industry.criticalSkills, ...industry.emergingSkills].some((reference) =>
      skillMatchesReference(skill, reference),
    ),
  );
  return [...new Map([...declared, ...reverseLinked].map((industry) => [industry.slug, industry])).values()]
    .slice(0, limit);
}

export async function getIndustriesForCareer(careerSlug: string): Promise<Industry[]> {
  const career = await getCareerBySlug(careerSlug);
  if (!career) return [];
  return resolveIndustryReferences(career.commonIndustries);
}

export async function getSkillPathsForSkill(skillSlug: string, limit: number = 4): Promise<SkillPath[]> {
  const skill = await getSkillBySlug(skillSlug);
  if (!skill) return [];
  const paths = await getSkillPaths();
  return paths
    .filter((path) => path.skills.some((reference) => skillMatchesReference(skill, reference)))
    .slice(0, limit);
}

export async function getSkillPathsForCareer(careerSlug: string, limit: number = 4): Promise<SkillPath[]> {
  const career = await getCareerBySlug(careerSlug);
  if (!career) return [];
  const paths = await getSkillPaths();
  return paths
    .filter((path) => path.relatedCareers.some((reference) => careerMatchesReference(career, reference)))
    .slice(0, limit);
}

export async function getBlogPostsForSkill(skillSlug: string, limit: number = 4): Promise<BlogPost[]> {
  const skill = await getSkillBySlug(skillSlug);
  if (!skill) return [];
  const posts = await getAllBlogPosts();
  const declaredSlugs = new Set(skill.blogPosts.map(normalizedReference));
  return posts
    .filter((post) =>
      post.relatedSkills.some((reference) => skillMatchesReference(skill, reference)) ||
      declaredSlugs.has(normalizedReference(post.slug)) ||
      post.tags.some((tag) => normalizedReference(tag) === normalizedReference(skill.category)),
    )
    .slice(0, limit);
}

export async function getBlogPostsForCareer(careerSlug: string, limit: number = 4): Promise<BlogPost[]> {
  const career = await getCareerBySlug(careerSlug);
  if (!career) return [];
  const posts = await getAllBlogPosts();
  return posts
    .filter((post) => post.relatedCareers.some((reference) => careerMatchesReference(career, reference)))
    .slice(0, limit);
}

export async function getBlogPostsForIndustry(industrySlug: string, limit: number = 4): Promise<BlogPost[]> {
  const industry = await getIndustryBySlug(industrySlug);
  if (!industry) return [];
  const posts = await getAllBlogPosts();
  return posts
    .filter((post) => post.relatedIndustries.some((reference) => industryMatchesReference(industry, reference)))
    .slice(0, limit);
}

// Utility functions
// Frontmatter is normalized into the validated BlogPost schema immediately after parsing.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseFrontmatter(frontmatter: string): Record<string, any> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: Record<string, any> = {};
  
  frontmatter.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length) {
      const value = valueParts.join(':').trim();
      
      // Handle different data types
      if (value === 'true') result[key.trim()] = true;
      else if (value === 'false') result[key.trim()] = false;
      else if (/^\d+$/.test(value)) result[key.trim()] = parseInt(value);
      else if (value.startsWith('[') && value.endsWith(']')) {
        // Parse arrays
        result[key.trim()] = value.slice(1, -1)
          .split(',')
          .map(s => s.trim().replace(/['"]/g, ''))
          .filter(s => s.length > 0);
      }
      else result[key.trim()] = value.replace(/^['"]|['"]$/g, '');
    }
  });
  
  return result;
}

function estimateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

// Content statistics
export async function getContentStats() {
  const [skills, careers, industries, blogPosts] = await Promise.all([
    getAllSkills(),
    getAllCareers(),
    getAllIndustries(),
    getAllBlogPosts(),
  ]);
  
  const categoryCounts: Record<string, number> = {};
  skills.forEach(skill => {
    categoryCounts[skill.category] = (categoryCounts[skill.category] || 0) + 1;
  });
  
  return {
    totalSkills: skills.length,
    totalCareers: careers.length,
    totalIndustries: industries.length,
    totalBlogPosts: blogPosts.length,
    featuredSkills: skills.filter(s => s.featured).length,
    categoryCounts,
  };
}
