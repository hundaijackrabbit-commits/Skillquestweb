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
  
  // Enhanced Content Sections
  whereItShowsUp: z.string().optional(),
  careerApplications: z.string().optional(),
  industryVariations: z.string().optional(),
  realWorldScenarios: z.array(z.string()).optional(),
  skillInAction: z.string().optional(),
  
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
  
  // Enhanced Development Content
  coreSubskills: z.array(z.string()).optional(),
  developmentMethods: z.string().optional(),
  skillStacksWell: z.array(z.string()).optional(),
  learningResources: z.array(z.string()).optional(),
  practiceOpportunities: z.string().optional(),
  
  // Employer & Career Context
  howEmployersEvaluate: z.string().optional(),
  signalsOfMastery: z.array(z.string()).optional(),
  careerImpact: z.string().optional(),
  salaryImpact: z.string().optional(),
  
  // Professional Relevance
  resumeRelevance: z.string(),
  interviewRelevance: z.string(),
  employerSignalValue: z.number().min(1).max(10),
  remoteWorkRelevance: z.string().optional(),
  aiEraRelevance: z.string(),
  automationRisk: AutomationRiskSchema,
  humanAdvantage: z.string(),
  
  // Enhanced Metadata. Transferability has historical free-form values in the
  // library, so preserve them instead of making one legacy record invalidate
  // the entire data file at runtime.
  transferabilityLevel: z.string().optional(),
  demandLevel: z.enum(['low', 'moderate', 'high', 'very-high']).optional(),
  futureProofScore: z.number().min(1).max(10).optional(),
  leadershipRelevance: z.number().min(1).max(10).optional(),
  creativeVsAnalytical: z.enum(['creative', 'analytical', 'hybrid']).optional(),
  
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
  commonIndustries: z.array(z.string()),
  workEnvironments: z.array(z.string()),
  coreSkills: z.array(z.string()),
  secondarySkills: z.array(z.string()),
  transferableSkills: z.array(z.string()),
  tools: z.array(z.string()),
  educationNotes: z.string().optional(),
  alternativePaths: z.array(z.string()),
  beginnerEntryStrategies: z.array(z.string()),
  growthOpportunities: z.array(z.string()),
  relatedCareers: z.array(z.string()),
  futureOutlook: z.string().optional(),
  salaryRange: z.string().optional(),
  demandLevel: z.enum(['low', 'moderate', 'high', 'very-high']).optional(),
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
  criticalSkills: z.array(z.string()),
  emergingSkills: z.array(z.string()),
  commonCareers: z.array(z.string()),
  tools: z.array(z.string()),
  trends: z.array(z.string()),
  challenges: z.array(z.string()),
  opportunities: z.array(z.string()),
  lastUpdated: z.string(),
  featured: z.boolean().default(false),
});

// Blog Post Schema
export const BlogPostSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  excerpt: z.string(),
  content: z.string(),
  author: z.string(),
  publishedAt: z.string(),
  lastUpdated: z.string(),
  reviewedBy: z.string().optional(),
  evidenceNote: z.string().optional(),
  tags: z.array(z.string()),
  relatedSkills: z.array(z.string()),
  relatedCareers: z.array(z.string()),
  relatedIndustries: z.array(z.string()),
  readTime: z.number(),
  featured: z.boolean().default(false),
  category: z.string().optional(),
});

export type Skill = z.infer<typeof SkillSchema>;
export type Career = z.infer<typeof CareerSchema>;
export type Industry = z.infer<typeof IndustrySchema>;
export type BlogPost = z.infer<typeof BlogPostSchema>;
export type SkillCategory = z.infer<typeof SkillCategorySchema>;
export type AutomationRisk = z.infer<typeof AutomationRiskSchema>;
export type DifficultyLevel = z.infer<typeof DifficultyLevelSchema>;

export interface SearchResult {
  type: 'skill' | 'career' | 'industry' | 'blog';
  id: string;
  title: string;
  description: string;
  slug: string;
  category?: string;
  relevance?: number;
}

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

export interface ContentStats {
  totalSkills: number;
  totalCareers: number;
  totalIndustries: number;
  totalBlogPosts: number;
  featuredSkills: number;
  categoryCounts: Record<SkillCategory, number>;
}
