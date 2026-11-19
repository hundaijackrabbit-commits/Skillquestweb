'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { DEFAULT_LOCALE, LOCALE_STORAGE_KEY, normalizeLearningLocale, isRightToLeft, type LearningLocale } from '@/lib/internationalization';
import { translateInterface } from '@/lib/ui-translations';

type LanguageContext = {
  locale: LearningLocale;
  setLanguage: (language: string) => void;
};

const Context = createContext<LanguageContext | null>(null);

export function LearningLanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<LearningLocale>(DEFAULT_LOCALE);
  const pathname = usePathname();
  // Explicit Chinese editorial URLs always display Chinese navigation even
  // if a different interface preference was stored for other pages.
  const isChineseEditorialRoute = pathname === '/zh-CN' || pathname.startsWith('/zh-CN/');
  const displayedLocale: LearningLocale = isChineseEditorialRoute ? 'zh-CN' : locale;

  useEffect(() => {
    const refresh = () => {
      try {
        const saved = window.localStorage.getItem(LOCALE_STORAGE_KEY);
        setLocale(normalizeLearningLocale(saved || (window.location.pathname.startsWith('/zh-CN') ? 'zh-CN' : navigator.language)));
      } catch {
        setLocale(normalizeLearningLocale(window.location.pathname.startsWith('/zh-CN') ? 'zh-CN' : navigator.language));
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

  // Language preference is client-side until reviewed, locale-specific routes exist.
  // Keep the document direction and assistive-technology language in sync with the UI.
  useEffect(() => {
    const documentRoot = document.documentElement;
    documentRoot.lang = displayedLocale;
    documentRoot.dir = isRightToLeft(displayedLocale) ? 'rtl' : 'ltr';
    documentRoot.dataset.learningLocale = displayedLocale;
  }, [displayedLocale]);

  const value = useMemo<LanguageContext>(() => ({
    locale: displayedLocale,
    setLanguage: (language: string) => {
      const next = normalizeLearningLocale(language);
      setLocale(next);
      try { window.localStorage.setItem(LOCALE_STORAGE_KEY, next); } catch { /* Storage disabled. */ }
      window.dispatchEvent(new CustomEvent('msl:learning-language-changed', { detail: { locale: next } }));
    },
  }), [displayedLocale]);

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
  const translated = translateInterface(text, locale);
  // Untranslated phrases are still English. Label them accurately for
  // screen readers rather than incorrectly claiming they are French, Arabic, etc.
  const textLocale = locale === 'en' || translated === text ? 'en' : locale;
  return <span lang={textLocale} dir={textLocale === 'ar' ? 'rtl' : 'ltr'}>{translated}</span>;
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

/** Explain editorial language gaps without claiming that article bodies are translated. */
export function EnglishContentNotice({ message }: { message: string }) {
  const { locale } = useLearningLanguage();
  if (locale === 'en') return null;
  return (
    <p role="note" className="mt-4 rounded-xl border border-blue-100 bg-blue-50 px-3 py-2 text-sm leading-6 text-blue-900">
      <TranslatedText text={message} />
    </p>
  );
}
