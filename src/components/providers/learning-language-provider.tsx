'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { DEFAULT_LOCALE, LOCALE_STORAGE_KEY, normalizeLearningLocale, type LearningLocale } from '@/lib/internationalization';
import { translateInterface } from '@/lib/ui-translations';

type LanguageContext = {
  locale: LearningLocale;
  setLanguage: (language: string) => void;
};

const Context = createContext<LanguageContext | null>(null);

export function LearningLanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<LearningLocale>(DEFAULT_LOCALE);

  useEffect(() => {
    const refresh = () => {
      try {
        const saved = window.localStorage.getItem(LOCALE_STORAGE_KEY);
        setLocale(normalizeLearningLocale(saved || navigator.language));
      } catch {
        setLocale(normalizeLearningLocale(navigator.language));
      }
    };
    refresh();
    window.addEventListener('msl:learning-language-changed', refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener('msl:learning-language-changed', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  const value = useMemo<LanguageContext>(() => ({
    locale,
    setLanguage: (language: string) => {
      const next = normalizeLearningLocale(language);
      setLocale(next);
      try { window.localStorage.setItem(LOCALE_STORAGE_KEY, next); } catch { /* Storage disabled. */ }
      window.dispatchEvent(new CustomEvent('msl:learning-language-changed', { detail: { locale: next } }));
    },
  }), [locale]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useLearningLanguage(): LanguageContext {
  const value = useContext(Context);
  if (!value) throw new Error('LearningLanguageProvider is required for translated UI.');
  return value;
}

export function useInterfaceTranslation() {
  const { locale } = useLearningLanguage();
  return (english: string) => translateInterface(english, locale);
}

/** A text-only translation: never renders HTML from user content or a model. */
export function TranslatedText({ text }: { text: string }) {
  const { locale } = useLearningLanguage();
  return <span lang={locale} dir={locale === 'ar' ? 'rtl' : 'auto'}>{translateInterface(text, locale)}</span>;
}

/** Long-form skill articles are still in English. Do not mislabel them as translated. */
export function EnglishGuideNotice() {
  const { locale } = useLearningLanguage();
  if (locale === 'en') return null;
  return (
    <p className="mt-3 rounded-xl border border-blue-100 bg-blue-50 px-3 py-2 text-sm leading-6 text-blue-900">
      <TranslatedText text="Explore the skill guide in English, or ask the AI Coach for an explanation in your preferred language." />
    </p>
  );
}
