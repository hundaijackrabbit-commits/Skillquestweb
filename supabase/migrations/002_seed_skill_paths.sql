-- Modern Skill Lab Database Schema
-- Migration 002: Seed skill paths data

-- Insert featured skill paths
INSERT INTO public.skill_paths (id, name, description, category, skills, related_careers, difficulty, estimated_time, featured) VALUES
(
  gen_random_uuid(),
  'Communication Mastery',
  'Develop comprehensive communication skills for modern workplaces, from active listening to public speaking and digital communication.',
  'Communication',
  ARRAY['communication', 'active-listening', 'public-speaking', 'writing', 'presentation-skills', 'emotional-intelligence'],
  ARRAY['sales-development-representative', 'account-executive', 'customer-success-manager', 'project-manager', 'hr-coordinator'],
  'beginner',
  '6-8 weeks',
  true
),
(
  gen_random_uuid(),
  'Digital Marketing Professional',
  'Build expertise in modern digital marketing from SEO and content strategy to social media management and analytics.',
  'Marketing',
  ARRAY['digital-marketing', 'seo', 'content-strategy', 'social-media-management', 'copywriting', 'analytics'],
  ARRAY['digital-marketer', 'content-strategist', 'social-media-manager', 'growth-marketer', 'copywriter'],
  'intermediate',
  '8-10 weeks',
  true
),
(
  gen_random_uuid(),
  'Leadership Excellence',
  'Develop essential leadership and management skills for emerging leaders and aspiring managers.',
  'Leadership',
  ARRAY['leadership', 'people-management', 'emotional-intelligence', 'conflict-resolution', 'coaching', 'strategic-thinking'],
  ARRAY['project-manager', 'operations-manager', 'account-manager', 'team-lead', 'department-manager'],
  'advanced',
  '10-12 weeks',
  true
),
(
  gen_random_uuid(),
  'Data Analysis Foundations',
  'Learn to analyze data, create insights, and make data-driven decisions in any role or industry.',
  'Technical',
  ARRAY['data-literacy', 'analytics', 'research-literacy', 'critical-thinking', 'business-analysis', 'data-visualization'],
  ARRAY['data-analyst', 'business-analyst', 'research-analyst', 'operations-analyst', 'marketing-analyst'],
  'beginner',
  '8-10 weeks',
  true
),
(
  gen_random_uuid(),
  'Project Management Professional',
  'Master project management methodologies, tools, and leadership skills for successful project delivery.',
  'Management',
  ARRAY['project-management', 'time-management', 'stakeholder-management', 'leadership', 'problem-solving', 'documentation'],
  ARRAY['project-manager', 'project-coordinator', 'program-manager', 'operations-manager', 'business-analyst'],
  'intermediate',
  '10-12 weeks',
  true
),
(
  gen_random_uuid(),
  'Customer Success Excellence',
  'Build skills to drive customer satisfaction, retention, and growth in customer-facing roles.',
  'Customer Success',
  ARRAY['customer-success', 'communication', 'problem-solving', 'relationship-building', 'data-analysis', 'product-knowledge'],
  ARRAY['customer-success-manager', 'account-manager', 'support-specialist', 'customer-experience-manager', 'sales-development-representative'],
  'intermediate',
  '6-8 weeks',
  true
),
(
  gen_random_uuid(),
  'Sales Professional Development',
  'Develop comprehensive sales skills from prospecting to closing, relationship building to negotiation.',
  'Sales',
  ARRAY['sales', 'communication', 'negotiation', 'relationship-building', 'presentation-skills', 'crm-proficiency'],
  ARRAY['sales-development-representative', 'account-executive', 'business-development-representative', 'account-manager', 'sales-manager'],
  'intermediate',
  '8-10 weeks',
  false
),
(
  gen_random_uuid(),
  'AI-Ready Professional',
  'Prepare for the AI-powered workplace with essential AI literacy and prompt engineering skills.',
  'Technology',
  ARRAY['ai-literacy', 'prompt-writing', 'digital-literacy', 'automation-skills', 'critical-thinking', 'adaptability'],
  ARRAY['content-strategist', 'marketing-specialist', 'data-analyst', 'operations-analyst', 'product-manager'],
  'beginner',
  '4-6 weeks',
  true
),
(
  gen_random_uuid(),
  'Remote Work Mastery',
  'Excel in remote and hybrid work environments with essential digital collaboration and productivity skills.',
  'Remote Work',
  ARRAY['remote-work-skills', 'digital-collaboration', 'time-management', 'self-discipline', 'video-conferencing-etiquette', 'productivity-tools'],
  ARRAY['remote-worker', 'freelancer', 'consultant', 'virtual-assistant', 'digital-nomad'],
  'beginner',
  '4-6 weeks',
  false
),
(
  gen_random_uuid(),
  'Content Creation Professional',
  'Master content creation across multiple formats and platforms for modern digital marketing and communication.',
  'Content',
  ARRAY['content-creation', 'copywriting', 'content-strategy', 'social-media-management', 'seo', 'brand-storytelling'],
  ARRAY['content-strategist', 'copywriter', 'social-media-manager', 'marketing-coordinator', 'communications-specialist'],
  'intermediate',
  '8-10 weeks',
  false
);

-- Update some skill paths to have more realistic skills and careers
UPDATE public.skill_paths 
SET skills = ARRAY['problem-solving', 'critical-thinking', 'analytical-thinking', 'research-literacy', 'decision-making', 'systems-thinking']
WHERE name = 'Critical Thinking & Problem Solving';

-- Insert additional paths for different career tracks
INSERT INTO public.skill_paths (name, description, category, skills, related_careers, difficulty, estimated_time, featured) VALUES
(
  'Operations Excellence',
  'Develop operational efficiency, process improvement, and organizational skills for operations roles.',
  'Operations', 
  ARRAY['operations-management', 'process-improvement', 'data-analysis', 'project-management', 'problem-solving', 'stakeholder-management'],
  ARRAY['operations-manager', 'operations-analyst', 'process-improvement-specialist', 'business-analyst', 'project-coordinator'],
  'intermediate',
  '8-10 weeks',
  false
),
(
  'Human Resources Professional',
  'Build HR expertise in recruitment, employee relations, performance management, and organizational development.',
  'Human Resources',
  ARRAY['recruiting', 'interviewing', 'people-management', 'conflict-resolution', 'performance-management', 'employee-relations'],
  ARRAY['hr-coordinator', 'recruiter', 'hr-business-partner', 'talent-acquisition-specialist', 'hr-generalist'],
  'intermediate',
  '10-12 weeks',
  false
),
(
  'Entrepreneurial Mindset',
  'Develop entrepreneurial thinking, innovation skills, and business acumen for founders and intrapreneurs.',
  'Entrepreneurship',
  ARRAY['entrepreneurship', 'business-development', 'strategic-thinking', 'innovation', 'risk-assessment', 'networking'],
  ARRAY['entrepreneur', 'business-development-manager', 'startup-founder', 'innovation-manager', 'consultant'],
  'advanced',
  '12-16 weeks',
  false
);