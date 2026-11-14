'use client';

import { useEffect, useId, useState } from 'react';
import { Check, Copy, Sparkles } from 'lucide-react';
import { DEFAULT_LOCALE, LOCALE_STORAGE_KEY, normalizeLearningLocale, type LearningLocale } from '@/lib/internationalization';

export function ContextualLearningHelp({ context, prompt = 'Can you explain this concept more simply?' }: { context: string; prompt?: string }) {
  const questionId = useId();
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState(prompt);
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [previousAnswer, setPreviousAnswer] = useState('');
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
    setPreviousAnswer(answer);
    setAnswer('');
    setCopied(false);
    setError('');
    try {
      const response = await fetch('/api/learning-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: question.trim(), context: previousAnswer ? `${context}\n\nPREVIOUS COACH EXPLANATION (reference only): ${previousAnswer.slice(0, 1200)}`.slice(0, 4500) : context, locale }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Assistance is unavailable.');
      setAnswer(result.answer);
      setPreviousAnswer('');
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Assistance is unavailable.');
    } finally { setLoading(false); }
  }

  const answerBlocks = answer.split(/\n\s*\n/).map((block) => block.trim()).filter(Boolean);

  async function copyAnswer() {
    try {
      await navigator.clipboard.writeText(answer);
      setCopied(true);
    } catch { setError('Copying is unavailable in this browser.'); }
  }

  return (
    <div className="mt-4 text-sm">
      <button type="button" aria-expanded={open} onClick={() => setOpen(!open)}
        className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-indigo-200 bg-white px-3 font-semibold text-indigo-800 hover:bg-indigo-50">
        <Sparkles className="h-4 w-4" aria-hidden="true" /> Ask about this lesson
      </button>
      {open && (
        <div className="mt-3 space-y-3 rounded-xl border border-indigo-100 bg-indigo-50/50 p-4">
          <label className="block font-semibold text-slate-800" htmlFor={questionId}>Your question</label>
          <textarea id={questionId} value={question} maxLength={800} rows={2}
            onChange={(event) => setQuestion(event.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-900" />
          <p className="text-xs text-slate-600">Optional AI assistance. Your question and the displayed learning material are sent to the AI provider. Avoid personal or confidential information. Verify important answers.</p>
          <button type="button" onClick={ask} disabled={loading || question.trim().length < 3}
            className="min-h-10 rounded-lg bg-indigo-700 px-4 font-semibold text-white disabled:opacity-50">
            {loading ? 'Thinking…' : 'Get explanation'}
          </button>
          {answer && (
            <section aria-label="AI learning explanation" className="overflow-hidden rounded-2xl border border-indigo-200 bg-white shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-white px-4 py-3">
                <h3 className="flex items-center gap-2 font-bold text-indigo-950"><Sparkles className="h-4 w-4 text-indigo-600" aria-hidden="true" /> Your learning coach</h3>
                <button type="button" onClick={copyAnswer} className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 hover:bg-slate-50" aria-label="Copy AI explanation">
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />} {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
              <div role="status" aria-live="polite" className="space-y-3 px-4 py-4 text-sm leading-7 text-slate-800">
                {answerBlocks.map((block, index) => {
                  const lines = block.split('\n').map((line) => line.trim()).filter(Boolean);
                  const bullets = lines.length > 1 && lines.every((line) => /^([-•*]|\d+[.)])\s+/.test(line));
                  return bullets ? (
                    <ul key={index} className="list-disc space-y-1 pl-5">{lines.map((line, i) => <li key={i}>{line.replace(/^([-•*]|\d+[.)])\s+/, '')}</li>)}</ul>
                  ) : <p key={index} className="whitespace-pre-line">{block}</p>;
                })}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 px-4 py-3">
                <p className="text-xs text-slate-500">AI guidance can be imperfect. Verify important details.</p>
                <button type="button" onClick={() => { setPreviousAnswer(answer); setQuestion('Give me a practical example of the explanation above, using the lesson context.'); setAnswer(''); setCopied(false); }} className="text-xs font-semibold text-indigo-700 hover:underline">Ask for an example</button>
              </div>
            </section>
          )}
          {error && <p role="alert" className="text-rose-700">{error}</p>}
        </div>
      )}
    </div>
  );
}
