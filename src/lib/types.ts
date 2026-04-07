import { z } from 'zod';

// Core Enums and Types
export const SkillCategorySchema = z.enum([
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
  'future-resistant'
]);

export const AutomationRiskSchema = z.enum(['low', 'medium', 'high']);
export const DifficultyLevelSchema = z.enum(['beginner', 'intermediate', 'advanced']);

// Skill Schema
export const SkillSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  category: SkillCategorySchema,
  shortDefinition: z.string(),
  fullDefinition: z.string(),
  whyItMatters: z.string(),
  modernRelevance: z.string(),
  economicRelevance: z.string().optional(),
  
  // Professional Context
  professionalContexts: z.array(z.string()),
  relatedSkills: z.array(z.string()),
  prerequisiteSkills: z.array(z.string()),
  subskills: z.array(z.string()),
  careers: z.array(z.string()),
  industries: z.array(z.string()),
  tools: z.array(z.string()),
  
  // Evidence & Research
  evidenceSummary: z.string().optional(),
  scholarlyNotes: z.array(z.string()).optional(),
  marketNotes: z.string().optional(),
  
  // Development Path
  beginnerActions: z.array(z.string()),
  intermediateActions: z.array(z.string()),
  advancedActions: z.array(z.string()),
  howToPractice: z.string(),
  howToMeasureProgress: z.string(),
  commonMistakes: z.array(z.string()),
  estimatedTimeToDevelop: z.string(),
  
  // Professional Relevance
  resumeRelevance: z.string(),
  interviewRelevance: z.string(),
  employerSignalValue: z.number().min(1).max(10),
  remoteWorkRelevance: z.string().optional(),
  aiEraRelevance: z.string(),
  automationRisk: AutomationRiskSchema,
  humanAdvantage: z.string(),
  
  // Metadata
  blogPosts: z.array(z.string()),
  lastUpdated: z.string(),
  featured: z.boolean().default(false),
  difficulty: DifficultyLevelSchema.optional(),
});

// Career Schema
export const CareerSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  whatTheyDo: z.string(),
  
  // Context
  commonIndustries: z.array(z.string()),
  workEnvironments: z.array(z.string()),
  
  // Skills
  coreSkills: z.array(z.string()),
  secondarySkills: z.array(z.string()),
  transferableSkills: z.array(z.string()),
  
  // Professional Development
  tools: z.array(z.string()),
  educationNotes: z.string().optional(),
  alternativePaths: z.array(z.string()),
  beginnerEntryStrategies: z.array(z.string()),
  growthOpportunities: z.array(z.string()),
  relatedCareers: z.array(z.string()),
  
  // Market Information
  futureOutlook: z.string().optional(),
  salaryRange: z.string().optional(),
  demandLevel: z.enum(['low', 'moderate', 'high', 'very-high']).optional(),
  
  // Metadata
  lastUpdated: z.string(),
  featured: z.boolean().default(false),
});

// Industry Schema
export const IndustrySchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  keyCharacteristics: z.array(z.string()),
  
  // Skills & Careers
  criticalSkills: z.array(z.string()),
  emergingSkills: z.array(z.string()),
  commonCareers: z.array(z.string()),
  
  // Context
  tools: z.array(z.string()),
  trends: z.array(z.string()),
  challenges: z.array(z.string()),
  opportunities: z.array(z.string()),
  
  // Metadata
  lastUpdated: z.string(),
  featured: z.boolean().default(false),
});

// Blog Post Schema
export const BlogPostSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  excerpt: z.string(),
  content: z.string(), // MDX content
  
  // Author & Publishing
  author: z.string(),
  publishedAt: z.string(),
  lastUpdated: z.string(),
  
  // Content Organization
  tags: z.array(z.string()),
  relatedSkills: z.array(z.string()),
  relatedCareers: z.array(z.string()),
  relatedIndustries: z.array(z.string()),
  
  // Metadata
  readTime: z.number(),
  featured: z.boolean().default(false),
  category: z.string().optional(),
});

// Export TypeScript types
export type Skill = z.infer<typeof SkillSchema>;
export type Career = z.infer<typeof CareerSchema>;
export type Industry = z.infer<typeof IndustrySchema>;
export type BlogPost = z.infer<typeof BlogPostSchema>;
export type SkillCategory = z.infer<typeof SkillCategorySchema>;
export type AutomationRisk = z.infer<typeof AutomationRiskSchema>;
export type DifficultyLevel = z.infer<typeof DifficultyLevelSchema>;

// Search Result Types
export interface SearchResult {
  type: 'skill' | 'career' | 'industry' | 'blog';
  id: string;
  title: string;
  description: string;
  slug: string;
  category?: string;
  relevance?: number;
}

// Skill Path Types
export const SkillPathSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  category: z.string(),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  estimatedTime: z.string(),
  skills: z.array(z.string()),
  relatedCareers: z.array(z.string()),
  featured: z.boolean().optional(),
  learningOutcomes: z.array(z.string()),
  prerequisites: z.array(z.string()),
});

export type SkillPath = z.infer<typeof SkillPathSchema>;

// Content Statistics
export interface ContentStats {
  totalSkills: number;
  totalCareers: number;
  totalIndustries: number;
  totalBlogPosts: number;
  featuredSkills: number;
  categoryCounts: Record<SkillCategory, number>;
}