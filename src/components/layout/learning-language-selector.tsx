'use client';

import { useEffect, useState } from 'react';
import { Globe2 } from 'lucide-react';
import {
  DEFAULT_LOCALE, LOCALE_LABELS, LOCALE_STORAGE_KEY,
  SUPPORTED_LOCALES, type LearningLocale, normalizeLearningLocale,
} from '@/lib/internationalization';

/**
 * Saves a preferred learning language without claiming the entire site is translated.
 * The English interface remains unchanged until reviewed translations are published.
 */
export function LearningLanguageSelector({ compact = false }: { compact?: boolean }) {
  const [locale, setLocale] = useState<LearningLocale>(DEFAULT_LOCALE);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
      setLocale(stored ? normalizeLearningLocale(stored) : normalizeLearningLocale(navigator.language));
    } catch {
      setLocale(normalizeLearningLocale(navigator.language));
    }
  }, []);

  const changeLanguage = (next: string) => {
    const normalized = normalizeLearningLocale(next);
    setLocale(normalized);
    try { window.localStorage.setItem(LOCALE_STORAGE_KEY, normalized); } catch { /* storage unavailable */ }
    window.dispatchEvent(new CustomEvent('msl:learning-language-changed', { detail: { locale: normalized } }));
  };

  return (
    <label className={`inline-flex min-w-0 items-center gap-1.5 text-sm text-slate-700 ${compact ? 'w-full' : ''}`}>
      <Globe2 className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span className="sr-only">Preferred learning language (site navigation remains in English)</span>
      <select
        aria-label="Preferred learning language; website interface currently remains in English"
        title="Set your preferred learning language. Translated site pages are coming later."
        value={locale}
        onChange={(event) => changeLanguage(event.target.value)}
        className="min-h-10 max-w-full rounded-lg border border-slate-200 bg-white px-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
      >
        {SUPPORTED_LOCALES.map((code) => <option key={code} value={code}>{LOCALE_LABELS[code]}</option>)}
      </select>
    </label>
  );
}
