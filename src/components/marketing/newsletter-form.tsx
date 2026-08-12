'use client';

import { FormEvent, useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

type NewsletterFormProps = {
  source?: string;
  compact?: boolean;
  className?: string;
};

export function NewsletterForm({ source = 'website', compact = false, className = '' }: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email || status === 'loading') return;

    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source, company }),
      });
      const data = await response.json();
      setMessage(data.message || (response.ok ? 'You’re on the list.' : 'Could not subscribe.'));
      setStatus(response.ok ? 'success' : 'error');
      if (response.ok) setEmail('');
    } catch {
      setStatus('error');
      setMessage('Could not subscribe right now. Please try again.');
    }
  }

  if (status === 'success') {
    return (
      <div className={`flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800 ${className}`} role="status">
        <CheckCircle2 className="h-4 w-4 shrink-0" />
        {message}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={className}>
      <div className={compact ? 'sm:flex' : 'flex flex-col gap-3 sm:flex-row'}>
        <label htmlFor={`newsletter-email-${source}`} className="sr-only">Email address</label>
        <input
          id={`newsletter-email-${source}`}
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          className="w-full min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />
        <input
          aria-hidden="true"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
          name="company"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className={`${compact ? 'mt-3 sm:ml-3 sm:mt-0' : ''} inline-flex shrink-0 items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-wait disabled:opacity-60`}
        >
          {status === 'loading' ? 'Joining…' : 'Get the weekly skill'}
          {status !== 'loading' && <ArrowRight className="ml-2 h-4 w-4" />}
        </button>
      </div>
      {status === 'error' && <p className="mt-2 text-sm text-red-600" role="alert">{message}</p>}
      <p className="mt-2 text-xs leading-5 text-slate-500">One useful email at a time. Unsubscribe anytime.</p>
    </form>
  );
}
