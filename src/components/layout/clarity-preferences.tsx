'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { TranslatedText as T } from '@/components/providers/learning-language-provider';

const KEY = 'msl-clarity-consent-v1';
type Choice = 'allow' | 'deny';
type Clarity = ((...args: unknown[]) => void) & { q?: unknown[][] };
type ClarityWindow = Window & { clarity?: Clarity };

function startClarity() {
  const w = window as ClarityWindow;
  if (document.getElementById('msl-clarity-tag')) return;
  const queue: Clarity = (...args) => { (queue.q ||= []).push(args); };
  w.clarity ||= queue;
  w.clarity('consentv2', { ad_Storage: 'denied', analytics_Storage: 'granted' });
  const script = document.createElement('script');
  script.id = 'msl-clarity-tag';
  script.async = true;
  script.src = 'https://www.clarity.ms/tag/ziic5ja2gh';
  document.head.appendChild(script);
}

export function ClarityPreferences() {
  const pathname = usePathname();
  const [choice, setChoice] = useState<Choice | null>(null);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [production, setProduction] = useState(false);

  useEffect(() => {
    const live = window.location.hostname === 'modernskilllab.space';
    setProduction(live);
    try {
      const saved = localStorage.getItem(KEY);
      if (saved === 'allow' || saved === 'deny') setChoice(saved);
    } catch { /* Storage unavailable: require an explicit choice. */ }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready && production && choice === 'allow' && pathname === '/') startClarity();
  }, [ready, production, choice, pathname]);

  function choose(next: Choice) {
    try { localStorage.setItem(KEY, next); } catch { /* Choice still applies in memory. */ }
    setChoice(next);
    setOpen(false);
    if (next === 'deny' && document.getElementById('msl-clarity-tag')) {
      (window as ClarityWindow).clarity?.('consentv2', { ad_Storage: 'denied', analytics_Storage: 'denied' });
      // Reload to remove the loaded recorder from this document.
      window.location.reload();
    }
  }

  if (!ready || !production) return null;
  const show = open || (pathname === '/' && choice === null);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="text-xs text-slate-600 underline underline-offset-2 hover:text-slate-900">
        <T text="Behaviour analytics preferences" />
      </button>
      {show && (
        <aside aria-label="Optional behaviour analytics" data-clarity-mask="true" className="fixed bottom-4 left-4 right-4 z-50 max-w-sm rounded-2xl border border-slate-200 bg-white p-4 text-slate-900 shadow-xl sm:right-auto">
          <p className="text-sm font-semibold"><T text="Help improve Modern Skill Lab" /></p>
          <p className="mt-2 text-xs leading-5 text-slate-600"><T text="With your permission, Microsoft Clarity records masked browsing interactions, clicks and scrolling to help us improve the website. This is optional." /> <a href="/privacy" className="underline"><T text="Privacy details" /></a></p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" onClick={() => choose('allow')} className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold hover:bg-slate-100"><T text="Allow analytics" /></button>
            <button type="button" onClick={() => choose('deny')} className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold hover:bg-slate-100"><T text="Decline" /></button>
          </div>
        </aside>
      )}
    </>
  );
}
