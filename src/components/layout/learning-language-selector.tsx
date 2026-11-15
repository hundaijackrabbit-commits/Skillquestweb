'use client';

import { Globe2 } from 'lucide-react';
import { LOCALE_LABELS, SUPPORTED_LOCALES } from '@/lib/internationalization';
import { useLearningLanguage } from '@/components/providers/learning-language-provider';

/** Language preference controls available translated UI text and AI replies.
 * Long-form editorial content is left in English until translated and reviewed.
 */
export function LearningLanguageSelector({ compact = false }: { compact?: boolean }) {
  const { locale, setLanguage } = useLearningLanguage();
  return (
    <label className={`inline-flex min-w-0 items-center gap-1.5 text-sm text-slate-700 ${compact ? 'w-full' : ''}`}>
      <Globe2 className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span className="sr-only">Language for available interface translations and AI explanations</span>
      <select
        aria-label="Preferred language for available translations and AI explanations"
        title="Changes available interface translations and AI responses. Some learning articles remain in English."
        value={locale}
        onChange={(event) => setLanguage(event.target.value)}
        className="min-h-10 max-w-full rounded-lg border border-slate-200 bg-white px-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
      >
        {SUPPORTED_LOCALES.map((code) => <option key={code} value={code}>{LOCALE_LABELS[code]}</option>)}
      </select>
    </label>
  );
}
