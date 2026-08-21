'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Download, LoaderCircle, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CAREER_GUIDE_DOWNLOAD_PATH } from '@/lib/career-guide';
import { cn } from '@/lib/utils';

type CareerGuideFormProps = {
  source?: string;
  className?: string;
};

type FormStatus = { kind: 'idle' | 'success' | 'error'; message?: string };

export function CareerGuideForm({ source = 'career-guide-page', className }: CareerGuideFormProps) {
  const [status, setStatus] = useState<FormStatus>({ kind: 'idle' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ kind: 'idle' });

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('/api/career-guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: String(formData.get('name') || ''),
          email: String(formData.get('email') || ''),
          company: String(formData.get('company') || ''),
          source,
          marketingConsent: formData.get('marketingConsent') === 'on',
        }),
      });
      const result = (await response.json()) as { ok?: boolean; message?: string };

      if (!response.ok || !result.ok) {
        setStatus({ kind: 'error', message: result.message || 'We could not send the guide. Please try again.' });
        return;
      }

      form.reset();
      setStatus({ kind: 'success', message: result.message || 'Your guide is on its way.' });
    } catch {
      setStatus({ kind: 'error', message: 'We could not reach the delivery service. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (status.kind === 'success') {
    return (
      <div className={cn('rounded-3xl border border-emerald-200 bg-emerald-50 p-6', className)} role="status">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white">
          <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
        </div>
        <h2 className="mt-5 text-2xl font-bold tracking-tight text-slate-950">Check your inbox</h2>
        <p className="mt-2 text-sm leading-6 text-emerald-900">{status.message}</p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <a href={CAREER_GUIDE_DOWNLOAD_PATH} download className="inline-flex min-h-11 items-center justify-center rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800">
            <Download className="mr-2 h-4 w-4" aria-hidden="true" /> Download now
          </a>
          <Link href="/auth?mode=signup&redirect=%2Fdashboard" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-emerald-300 bg-white px-4 py-2.5 text-sm font-semibold text-emerald-900 hover:bg-emerald-100">
            Create free account <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-4', className)} noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold text-slate-800">
          First name
          <input name="name" autoComplete="given-name" maxLength={100} placeholder="Your name" className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-base font-normal text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100" />
        </label>
        <label className="text-sm font-semibold text-slate-800">
          Email address
          <input name="email" type="email" inputMode="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-base font-normal text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100" />
        </label>
      </div>

      <label className="sr-only" aria-hidden="true">
        Company
        <input name="company" tabIndex={-1} autoComplete="off" />
      </label>

      <label className="flex items-start gap-3 rounded-xl bg-slate-50 p-3 text-sm leading-5 text-slate-600">
        <input name="marketingConsent" type="checkbox" className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-violet-600 focus:ring-violet-500" />
        <span>Also send me the weekly skill note. Optional, and I can unsubscribe at any time.</span>
      </label>

      {status.kind === 'error' && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm leading-5 text-red-800" role="alert">
          {status.message}
        </div>
      )}

      <Button type="submit" variant="primary" size="lg" disabled={isSubmitting} className="min-h-12 w-full rounded-xl bg-violet-600 text-base hover:bg-violet-700 focus:ring-violet-500">
        {isSubmitting ? <LoaderCircle className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" /> : <Mail className="mr-2 h-5 w-5" aria-hidden="true" />}
        {isSubmitting ? 'Sending your guide…' : 'Email me the free guide'}
      </Button>

      <p className="text-xs leading-5 text-slate-500">
        We use your email to deliver this resource. Newsletter consent is separate. See our{' '}
        <Link href="/privacy" className="font-semibold text-violet-700 underline underline-offset-2">privacy page</Link>.
      </p>
    </form>
  );
}
