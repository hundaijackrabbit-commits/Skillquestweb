'use client';

import { useState } from 'react';
import { Languages, Loader2 } from 'lucide-react';
import { LOCALE_LABELS, type LearningLocale } from '@/lib/internationalization';
import { useLearningLanguage, TranslatedText as T } from '@/components/providers/learning-language-provider';

/**
 * Optional translation of PUBLISHED learning material only.
 * Never pass learner-written answers or private account data as material.
 * English content and quiz-scoring logic remain unchanged.
 */
export function LearningTranslationPanel({ material }: { material: string }) {
  const { locale } = useLearningLanguage();
  const [cache, setCache] = useState<Partial<Record<LearningLocale, string>>>({});
  const [visible, setVisible] = useState(true);
  const [pending, setPending] = useState<LearningLocale | null>(null);
  const [error, setError] = useState('');

  if (locale === 'en' || material.trim().length < 10 || material.length > 3800) return null;
  const result = cache[locale];
  const showTranslation = Boolean(result && visible);

  async function toggle() {
    if (result) {
      setVisible((current) => !current);
      return;
    }
    if (pending) return;
    const requestedLocale = locale;
    setError('');
    setPending(requestedLocale);
    try {
      const response = await fetch('/api/learning-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'translate',
          locale: requestedLocale,
          question: 'Translate the published learning material without answering its questions.',
          context: material,
        }),
      });
      const data: { answer?: unknown; error?: unknown } = await response.json();
      if (!response.ok || typeof data.answer !== 'string' || !data.answer.trim()) {
        throw new Error(typeof data.error === 'string' ? data.error : 'Translation is temporarily unavailable.');
      }
      setCache((current) => ({ ...current, [requestedLocale]: data.answer as string }));
      setVisible(true);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Translation is temporarily unavailable.');
    } finally {
      setPending(null);
    }
  }

  return (
    <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50/60 p-3 text-sm">
      <button type="button" aria-expanded={showTranslation} disabled={pending !== null}
        className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-blue-200 bg-white px-3 py-2 font-semibold text-blue-900 hover:bg-blue-100 disabled:cursor-wait disabled:opacity-60"
        onClick={() => void toggle()}>
        {pending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Languages className="h-4 w-4" aria-hidden="true" />}
        {pending ? <T text="Translating…" /> : showTranslation ? <T text="Hide translation" /> : result ? <T text="Show translation" /> : <T text="Translate this activity" />}
        <span className="font-normal">({LOCALE_LABELS[locale]})</span>
      </button>
      {showTranslation && (
        <div role="status" aria-live="polite" lang={locale} dir={locale === 'ar' ? 'rtl' : 'auto'}
          className="mt-3 whitespace-pre-wrap rounded-lg border border-blue-100 bg-white p-4 leading-7 text-slate-900">
          {result}
        </div>
      )}
      {error && <p role="alert" className="mt-2 text-xs font-medium text-rose-700">{error}</p>}
      <p className="mt-2 text-xs leading-5 text-slate-600">
        <T text="AI translation is optional and may contain mistakes. Use the original English text and answer choices below to complete the activity." />
      </p>
    </div>
  );
}
