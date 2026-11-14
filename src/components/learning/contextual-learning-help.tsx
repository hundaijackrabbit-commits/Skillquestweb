'use client';

import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { DEFAULT_LOCALE, LOCALE_STORAGE_KEY, normalizeLearningLocale, type LearningLocale } from '@/lib/internationalization';

export function ContextualLearningHelp({ context, prompt = 'Can you explain this concept more simply?' }: { context: string; prompt?: string }) {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState(prompt);
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [locale, setLocale] = useState<LearningLocale>(DEFAULT_LOCALE);

  useEffect(() => {
    const sync = () => {
      try {
        const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
        setLocale(stored ? normalizeLearningLocale(stored) : normalizeLearningLocale(navigator.language));
      } catch { setLocale(DEFAULT_LOCALE); }
    };
    sync();
    window.addEventListener('msl:learning-language-changed', sync);
    return () => window.removeEventListener('msl:learning-language-changed', sync);
  }, []);

  async function ask() {
    if (loading || question.trim().length < 3) return;
    setLoading(true);
    setAnswer('');
    setError('');
    try {
      const response = await fetch('/api/learning-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: question.trim(), context, locale }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Assistance is unavailable.');
      setAnswer(result.answer);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Assistance is unavailable.');
    } finally { setLoading(false); }
  }

  return (
    <div className="mt-4 text-sm">
      <button type="button" aria-expanded={open} onClick={() => setOpen(!open)}
        className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-indigo-200 bg-white px-3 font-semibold text-indigo-800 hover:bg-indigo-50">
        <Sparkles className="h-4 w-4" aria-hidden="true" /> Ask about this lesson
      </button>
      {open && (
        <div className="mt-3 space-y-3 rounded-xl border border-indigo-100 bg-indigo-50/50 p-4">
          <label className="block font-semibold text-slate-800" htmlFor="learning-help-question">Your question</label>
          <textarea id="learning-help-question" value={question} maxLength={800} rows={2}
            onChange={(event) => setQuestion(event.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-900" />
          <p className="text-xs text-slate-600">Optional AI assistance. Your question and the displayed learning material are sent to the AI provider. Avoid personal or confidential information. Verify important answers.</p>
          <button type="button" onClick={ask} disabled={loading || question.trim().length < 3}
            className="min-h-10 rounded-lg bg-indigo-700 px-4 font-semibold text-white disabled:opacity-50">
            {loading ? 'Thinking…' : 'Get explanation'}
          </button>
          {answer && <p role="status" className="whitespace-pre-wrap rounded-lg bg-white p-3 leading-6 text-slate-800">{answer}</p>}
          {error && <p role="alert" className="text-rose-700">{error}</p>}
        </div>
      )}
    </div>
  );
}
