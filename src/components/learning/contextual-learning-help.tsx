'use client';

import { useId, useState } from 'react';
import { useLearningLanguage, TranslatedText as T } from '@/components/providers/learning-language-provider';
import { Check, Copy, Sparkles } from 'lucide-react';

export function ContextualLearningHelp({ context, prompt = 'Can you explain this concept more simply?', defaultOpen = false, showToggle = true }: { context: string; prompt?: string; defaultOpen?: boolean; showToggle?: boolean }) {
  const questionId = useId();
  const [open, setOpen] = useState(defaultOpen);
  const [question, setQuestion] = useState(prompt);
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [previousAnswer, setPreviousAnswer] = useState('');
  const [lastQuestion, setLastQuestion] = useState('');
  const { locale } = useLearningLanguage();


  async function ask() {
    if (loading || question.trim().length < 3) return;
    setLoading(true);
    setLastQuestion(question.trim());
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
      {showToggle && <button type="button" aria-expanded={open} onClick={() => setOpen(!open)}
        className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-indigo-200 bg-white px-3 font-semibold text-indigo-800 hover:bg-indigo-50">
        <Sparkles className="h-4 w-4" aria-hidden="true" /> {open ? <T text="Hide AI help" /> : <T text="Ask about this lesson" />}
      </button>}
      {open && (
        <div className="mt-3 space-y-3 rounded-xl border border-indigo-100 bg-indigo-50/50 p-4">
          <label className="block font-semibold text-slate-800" htmlFor={questionId}><T text="Your question" /></label>
          <textarea id={questionId} value={question} maxLength={800} rows={2}
            onChange={(event) => setQuestion(event.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-900" />
          <p className="text-xs text-slate-600">Optional AI assistance. Your question and the displayed learning material are sent to the AI provider. Avoid personal or confidential information. Verify important answers.</p>
          <button type="button" onClick={ask} disabled={loading || question.trim().length < 3}
            className="min-h-10 rounded-lg bg-indigo-700 px-4 font-semibold text-white disabled:opacity-50">
            {loading ? <T text="Thinking…" /> : <T text="Get explanation" />}
          </button>
          {answer && (
            <section aria-label="AI learning explanation" className="overflow-hidden rounded-2xl border border-indigo-200 bg-white shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-white px-4 py-3">
                <h3 className="flex items-center gap-2 font-bold text-indigo-950"><Sparkles className="h-4 w-4 text-indigo-600" aria-hidden="true" /> <T text="Your learning coach" /></h3>
                <button type="button" onClick={copyAnswer} className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 hover:bg-slate-50" aria-label="Copy AI explanation">
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />} {copied ? <T text="Copied" /> : <T text="Copy" />}
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
                <div className="flex flex-wrap gap-3">
                  <button type="button" onClick={() => { setPreviousAnswer(answer); setQuestion('Give me a practical example of the explanation above, using the lesson context.'); setAnswer(''); setCopied(false); }} className="text-xs font-semibold text-indigo-700 hover:underline"><T text="Practical example" /></button>
                  <button type="button" onClick={() => { setPreviousAnswer(answer); setQuestion('Ask me one short question to check my understanding of the explanation above. Do not reveal the answer.'); setAnswer(''); setCopied(false); }} className="text-xs font-semibold text-indigo-700 hover:underline"><T text="Check understanding" /></button>
                  <button type="button" onClick={() => { setPreviousAnswer(answer); setQuestion('Explain the same concept in simpler language with a short analogy.'); setAnswer(''); setCopied(false); }} className="text-xs font-semibold text-indigo-700 hover:underline"><T text="Simplify" /></button>
                </div>
              </div>
            </section>
          )}
          {error && <div role="alert" className="flex flex-wrap items-center gap-3 text-rose-700"><span>{error}</span>{lastQuestion && <button type="button" onClick={() => { setQuestion(lastQuestion); setError(''); }} className="rounded-lg border border-rose-200 px-3 py-1.5 text-xs font-semibold hover:bg-rose-50"><T text="Restore question" /></button>}</div>}
        </div>
      )}
    </div>
  );
}
