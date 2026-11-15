/**
 * Shared international learning preferences.
 * This module is deliberately dependency-free and does not translate content.
 * Only mark a locale as published once its learning content has been reviewed.
 */
export const SUPPORTED_LOCALES = ['en', 'zh-CN', 'es', 'fr', 'hi', 'ar'] as const;
export type LearningLocale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: LearningLocale = 'en';
export const LOCALE_STORAGE_KEY = 'msl-learning-locale';

export const LOCALE_LABELS: Record<LearningLocale, string> = {
  en: 'English',
  'zh-CN': '简体中文',
  es: 'Español',
  fr: 'Français',
  hi: 'हिन्दी',
  ar: 'العربية',
};

export function isLearningLocale(value: unknown): value is LearningLocale {
  return typeof value === 'string' &&
    (SUPPORTED_LOCALES as readonly string[]).includes(value);
}

export function normalizeLearningLocale(value: unknown): LearningLocale {
  if (isLearningLocale(value)) return value;
  if (typeof value !== 'string') return DEFAULT_LOCALE;
  const language = value.trim().toLowerCase().replace('_', '-');
  if (language.startsWith('zh')) return 'zh-CN';
  const base = language.split('-')[0];
  return isLearningLocale(base) ? base : DEFAULT_LOCALE;
}

export function isRightToLeft(locale: LearningLocale): boolean {
  return locale === 'ar';
}

/** Not a claim that translated pages are ready to publish. */
export const PUBLISHED_CONTENT_LOCALES: readonly LearningLocale[] = ['en'];
