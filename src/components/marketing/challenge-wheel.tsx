'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, RotateCw, Sparkles } from 'lucide-react';

const challenges = [
  { title: 'Explain it simply', task: 'Choose a skill you know. Explain it in three sentences without jargon.', href: '/skills', action: 'Find a skill' },
  { title: 'Try a learning sprint', task: 'Set a 10-minute timer, learn one new concept, and write down what you remember.', href: '/learn', action: 'Visit Practice Lab' },
  { title: 'Explore a new direction', task: 'Pick one career you have never considered and identify two skills it uses.', href: '/careers', action: 'Explore careers' },
  { title: 'Connect two skills', task: 'Choose two skills that complement each other. Write one real-world task that needs both.', href: '/paths', action: 'Explore learning paths' },
  { title: 'Plan one small win', task: 'Write a specific skill goal you could finish this week and what evidence would prove it.', href: '/skill-path', action: 'Build a skill path' },
  { title: 'Reflect and reset', task: 'Name one strength, one skill gap, and one experiment you could try next.', href: '/free-career-guide', action: 'Get the free workbook' },
] as const;

export function ChallengeWheel() {
  const [selected, setSelected] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);

  function spin() {
    if (spinning) return;
    const next = Math.floor(Math.random() * challenges.length);
    const previous = ((rotation % 360) + 360) % 360;
    const desired = (360 - (next * 60 + 30)) % 360;
    const delta = ((desired - previous + 360) % 360) + 1440;
    setSelected(null);
    setSpinning(true);
    setRotation((value) => value + delta);
  }

  return (
    <section aria-labelledby="challenge-wheel-title" className="overflow-hidden rounded-[2rem] border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-fuchsia-50 p-6 shadow-sm sm:p-9">
      <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div>
          <div className="inline-flex items-center gap-2 text-sm font-bold text-fuchsia-700"><Sparkles className="h-4 w-4" aria-hidden="true" /> A little learning roulette</div>
          <h2 id="challenge-wheel-title" className="mt-3 text-3xl font-bold tracking-tight text-slate-950">Spin for a skill challenge</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">Need a spark? Spin for one quick, practical activity. No prizes, signup, or pressure—just a fresh idea to try.</p>
          <button type="button" onClick={spin} disabled={spinning} className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-xl bg-fuchsia-700 px-6 py-3 font-semibold text-white shadow-lg shadow-fuchsia-200 transition hover:bg-fuchsia-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-700 disabled:cursor-wait disabled:opacity-60"><RotateCw className="h-5 w-5" aria-hidden="true" />{spinning ? 'Spinning…' : selected === null ? 'Spin the wheel' : 'Spin again'}</button>
          <p className="mt-3 text-xs text-slate-500">All challenges are free to try. Animation respects reduced-motion settings.</p>
        </div>
        <div className="relative mx-auto w-full max-w-[340px]">
          <div className="absolute left-1/2 top-[-8px] z-10 h-0 w-0 -translate-x-1/2 border-x-[13px] border-t-[23px] border-x-transparent border-t-slate-900" aria-hidden="true" />
          <div aria-hidden="true" className="aspect-square rounded-full border-[9px] border-white shadow-[0_18px_55px_-20px_rgba(88,28,135,0.45)]" style={{ background: 'conic-gradient(#f0abfc 0deg 60deg,#93c5fd 60deg 120deg,#fde68a 120deg 180deg,#86efac 180deg 240deg,#c4b5fd 240deg 300deg,#fda4af 300deg 360deg)', transform: `rotate(${rotation}deg)`, transition: spinning ? 'transform 2.2s cubic-bezier(.13,.75,.16,1)' : 'none' }} onTransitionEnd={() => { if (spinning) { const angle = ((360 - rotation % 360 + 360) % 360); setSelected(Math.floor(angle / 60) % challenges.length); setSpinning(false); } }}>
            <div className="flex h-full items-center justify-center"><div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-slate-950 text-center text-sm font-extrabold text-white shadow-lg">SKILL<br/>SPIN</div></div>
          </div>
        </div>
      </div>
      {selected !== null && !spinning && <div aria-live="polite" className="mt-7 rounded-2xl border border-fuchsia-200 bg-white p-5"><p className="text-xs font-bold uppercase tracking-wider text-fuchsia-700">Your challenge</p><h3 className="mt-2 text-xl font-bold text-slate-950">{challenges[selected].title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{challenges[selected].task}</p><Link href={challenges[selected].href} className="mt-4 inline-flex items-center gap-2 font-semibold text-fuchsia-800 hover:underline">{challenges[selected].action}<ArrowRight className="h-4 w-4" /></Link></div>}
    </section>
  );
}
