import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { getAllSkills } from '@/lib/content';

type FeaturedSkillRow = {
  skill_slug: string;
  feature_type: string;
  homepage_headline: string | null;
  starts_at: string;
  ends_at: string | null;
  display_order: number;
};

type TrendingSkillRow = {
  item_slug: string;
  views: number | string | null;
};

function publicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;
  return createSupabaseClient(url, anonKey, { auth: { persistSession: false, autoRefreshToken: false } });
}

export async function getHomepageGrowthData(providedSkills?: Awaited<ReturnType<typeof getAllSkills>>) {
  const skills = providedSkills ?? await getAllSkills();
  const skillBySlug = new Map(skills.map((skill) => [skill.slug, skill]));
  const client = publicClient();
  const now = new Date().toISOString();

  let featured: Array<{
    skill: (typeof skills)[number];
    featureType: string;
    headline: string | null;
  }> = [];

  let trending: Array<{ skill: (typeof skills)[number]; views: number }> = [];
  let marketing = {
    newsletterHeadline: 'One useful skill every week',
    newsletterDescription: 'Get practical skills, career ideas, and modern-work insights worth keeping.',
  };

  if (client) {
    const [featuredResult, trendingResult, marketingResult] = await Promise.all([
      client
        .from('featured_skills')
        .select('skill_slug, feature_type, homepage_headline, starts_at, ends_at, display_order')
        .eq('active', true)
        .lte('starts_at', now)
        .order('display_order')
        .limit(12),
      client.rpc('get_trending_skills', { p_days: 7, p_limit: 6 }),
      client.from('site_settings').select('value').eq('key', 'marketing').maybeSingle(),
    ]);

    const featuredRows = (featuredResult.data || []) as FeaturedSkillRow[];
    const trendingRows = (trendingResult.data || []) as TrendingSkillRow[];

    featured = featuredRows
      .filter((row) => !row.ends_at || row.ends_at >= now)
      .slice(0, 6)
      .map((row) => {
        const skill = skillBySlug.get(row.skill_slug);
        return skill ? { skill, featureType: row.feature_type, headline: row.homepage_headline } : null;
      })
      .filter(Boolean) as typeof featured;

    trending = trendingRows
      .map((row) => {
        const skill = skillBySlug.get(row.item_slug);
        return skill ? { skill, views: Number(row.views) } : null;
      })
      .filter(Boolean) as typeof trending;

    const setting = marketingResult.data?.value as { newsletterHeadline?: string; newsletterDescription?: string } | undefined;
    if (setting?.newsletterHeadline && setting?.newsletterDescription) {
      marketing = {
        newsletterHeadline: setting.newsletterHeadline,
        newsletterDescription: setting.newsletterDescription,
      };
    }
  }

  return { featured, trending, marketing };
}
