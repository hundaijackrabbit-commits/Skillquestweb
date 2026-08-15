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
    return rawSkills.map((skill: any) => SkillSchema.parse(skill));
  } catch (error) {
    console.error('Error loading skills:', error);
    return [];
  }
});

function normalizedSkillName(skill: Skill) {
  return skill.name.trim().toLocaleLowerCase('en');
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
    
    return rawCareers.map((career: any) => CareerSchema.parse(career));
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
    
    return rawIndustries.map((industry: any) => IndustrySchema.parse(industry));
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
    
    return rawPaths.map((path: any) => SkillPathSchema.parse(path));
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
  const skill = (await getAllSkills()).find(s => s.id === skillId);
  if (!skill) return [];
  
  const allSkills = await getAllSkills();
  const related = allSkills.filter(s => 
    s.id !== skillId && (
      skill.relatedSkills.includes(s.id) ||
      s.relatedSkills.includes(skillId) ||
      s.category === skill.category
    )
  );
  
  return (await canonicalizeSkillList(related)).slice(0, limit);
}

export async function getSkillsForCareer(careerSlug: string): Promise<Skill[]> {
  const career = await getCareerBySlug(careerSlug);
  if (!career) return [];
  
  const allSkills = await getAllSkills();
  return canonicalizeSkillList(allSkills.filter(skill => career.coreSkills.includes(skill.id)));
}

export async function getCareersForSkill(skillSlug: string): Promise<Career[]> {
  const skill = await getSkillBySlug(skillSlug);
  if (!skill) return [];
  
  const allCareers = await getAllCareers();
  return allCareers.filter(career => 
    career.coreSkills.includes(skill.id) || 
    career.secondarySkills.includes(skill.id)
  );
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

  const allSkills = await getAllSkills();
  return canonicalizeSkillList(allSkills.filter(skill =>
    industry.criticalSkills?.includes(skill.id) || false
  ));
}

// Utility functions
function parseFrontmatter(frontmatter: string): Record<string, any> {
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
