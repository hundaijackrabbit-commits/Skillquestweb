import { SITE_URL } from '@/lib/site';

export const CAREER_GUIDE_TITLE = 'The Modern Skill Lab Career & Life Map';
export const CAREER_GUIDE_FILENAME = 'ModernSkillLab_Career_and_Life_Map.pdf';
export const CAREER_GUIDE_DOWNLOAD_PATH = `/downloads/${CAREER_GUIDE_FILENAME}`;

export function getCareerGuideDownloadUrl() {
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const baseUrl = configuredSiteUrl || SITE_URL;
  return new URL(CAREER_GUIDE_DOWNLOAD_PATH, baseUrl).toString();
}

