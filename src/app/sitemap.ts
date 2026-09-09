import type { MetadataRoute } from 'next';
import { getAllBlogPosts, getAllCareers, getAllIndustries, getIndexableSkills, getSkillPaths } from '@/lib/content';
import { getAllSkillCourses } from '@/lib/courses';
import { absoluteUrl } from '@/lib/site';
import { isBlogPostIndexable, isCareerIndexable, isSkillPathIndexable } from '@/lib/content-quality';
import { TOPICS } from '@/lib/topics';
import { getSkillIntelligenceBrief } from '@/lib/skill-intelligence';

const lessonIntents = ['how-to','examples','techniques','mistakes','exercises'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [skills, careers, industries, posts, paths] = await Promise.all([getIndexableSkills(),getAllCareers(),getAllIndustries(),getAllBlogPosts(),getSkillPaths()]);
  const courses = getAllSkillCourses();
  const indexableCareers = careers.filter(isCareerIndexable); const indexablePosts = posts.filter(isBlogPostIndexable); const indexablePaths = paths.filter(isSkillPathIndexable);
  const skillDirectoryPages = Array.from({ length: Math.max(0, Math.ceil(skills.length / 30) - 1) },(_, index) => index + 2);
  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl('/'), changeFrequency: 'weekly', priority: 1 },
    { url: absoluteUrl('/skills'), changeFrequency: 'weekly', priority: 0.9 },
    { url: absoluteUrl('/skills/a-z'), changeFrequency: 'weekly', priority: 0.82 },
    { url: absoluteUrl('/skills/clusters'), changeFrequency: 'weekly', priority: 0.84 },
    { url: absoluteUrl('/skills/diagnostic'), changeFrequency: 'monthly', priority: 0.78 },
    { url: absoluteUrl('/topics'), changeFrequency: 'weekly', priority: 0.85 },
    { url: absoluteUrl('/careers'), changeFrequency: 'weekly', priority: 0.8 },
    { url: absoluteUrl('/industries'), changeFrequency: 'monthly', priority: 0.7 },
    { url: absoluteUrl('/paths'), changeFrequency: 'monthly', priority: 0.7 },
    { url: absoluteUrl('/learn'), changeFrequency: 'monthly', priority: 0.75 },
    { url: absoluteUrl('/blog'), changeFrequency: 'weekly', priority: 0.8 },
    { url: absoluteUrl('/free-career-guide'), changeFrequency: 'monthly', priority: 0.85 },
    { url: absoluteUrl('/about'), changeFrequency: 'monthly', priority: 0.5 },
    { url: absoluteUrl('/community'), changeFrequency: 'monthly', priority: 0.5 },
    { url: absoluteUrl('/privacy'), changeFrequency: 'yearly', priority: 0.2 },
  ];
  return [
    ...staticPages,
    ...skillDirectoryPages.map((page) => ({ url: absoluteUrl(`/skills/page/${page}`), changeFrequency: 'weekly' as const, priority: 0.55 })),
    ...TOPICS.map((topic) => ({ url: absoluteUrl(`/topics/${topic.slug}`), changeFrequency: 'weekly' as const, priority: 0.8 })),
    ...skills.map((skill) => ({ url: absoluteUrl(`/skills/${skill.slug}`), lastModified: getSkillIntelligenceBrief(skill.slug)?.reviewedAt ?? skill.lastUpdated, changeFrequency: 'monthly' as const, priority: 0.7 })),
    ...skills.flatMap((skill)=>lessonIntents.map((intent)=>({url:absoluteUrl(`/skills/${skill.slug}/lessons/${intent}`),lastModified:skill.lastUpdated,changeFrequency:'monthly' as const,priority:0.58}))),
    ...indexableCareers.map((career) => ({ url: absoluteUrl(`/careers/${career.slug}`), lastModified: career.lastUpdated, changeFrequency: 'monthly' as const, priority: 0.65 })),
    ...industries.map((industry) => ({ url: absoluteUrl(`/industries/${industry.slug}`), lastModified: industry.lastUpdated, changeFrequency: 'monthly' as const, priority: 0.6 })),
    ...indexablePosts.map((post) => ({ url: absoluteUrl(`/blog/${post.slug}`), lastModified: post.lastUpdated, changeFrequency: 'monthly' as const, priority: 0.65 })),
    ...indexablePaths.map((path) => ({ url: absoluteUrl(`/paths/${path.id}`), changeFrequency: 'monthly' as const, priority: 0.68 })),
    ...courses.map((course) => ({ url: absoluteUrl(`/skills/${course.skillSlug}/learn`), changeFrequency: 'monthly' as const, priority: 0.72 })),
  ];
}
