import type { MetadataRoute } from 'next';
import { getAllBlogPosts, getAllCareers, getAllIndustries, getAllSkills } from '@/lib/content';
import { absoluteUrl } from '@/lib/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [skills, careers, industries, posts] = await Promise.all([
    getAllSkills(),
    getAllCareers(),
    getAllIndustries(),
    getAllBlogPosts(),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl('/'), changeFrequency: 'weekly', priority: 1 },
    { url: absoluteUrl('/skills'), changeFrequency: 'weekly', priority: 0.9 },
    { url: absoluteUrl('/careers'), changeFrequency: 'weekly', priority: 0.8 },
    { url: absoluteUrl('/industries'), changeFrequency: 'monthly', priority: 0.7 },
    { url: absoluteUrl('/paths'), changeFrequency: 'monthly', priority: 0.7 },
    { url: absoluteUrl('/blog'), changeFrequency: 'weekly', priority: 0.8 },
    { url: absoluteUrl('/about'), changeFrequency: 'monthly', priority: 0.5 },
    { url: absoluteUrl('/community'), changeFrequency: 'monthly', priority: 0.5 },
    { url: absoluteUrl('/privacy'), changeFrequency: 'yearly', priority: 0.2 },
  ];

  return [
    ...staticPages,
    ...skills.map((skill) => ({ url: absoluteUrl(`/skills/${skill.slug}`), lastModified: skill.lastUpdated, changeFrequency: 'monthly' as const, priority: 0.7 })),
    ...careers.map((career) => ({ url: absoluteUrl(`/careers/${career.slug}`), lastModified: career.lastUpdated, changeFrequency: 'monthly' as const, priority: 0.65 })),
    ...industries.map((industry) => ({ url: absoluteUrl(`/industries/${industry.slug}`), lastModified: industry.lastUpdated, changeFrequency: 'monthly' as const, priority: 0.6 })),
    ...posts.map((post) => ({ url: absoluteUrl(`/blog/${post.slug}`), lastModified: post.lastUpdated, changeFrequency: 'monthly' as const, priority: 0.65 })),
  ];
}
