export const SITE_NAME = 'Modern Skill Lab';
export const SITE_URL = 'https://modernskilllab.space';
export const VERCEL_HOST = 'skillquestweb.vercel.app';
export const SITE_DESCRIPTION =
  'Build practical, career-relevant skills for modern work. Explore skill guides, career paths, AI literacy, communication, critical thinking, and digital growth.';

export function absoluteUrl(path = '/') {
  return new URL(path, SITE_URL).toString();
}
