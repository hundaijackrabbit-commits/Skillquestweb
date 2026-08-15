'use client';

import { useEffect, useState } from 'react';
import { KnowledgeCheckCard } from '@/components/learning/knowledge-check-card';
import { getDailyKnowledgeCheck, type KnowledgeCheck } from '@/lib/knowledge-checks';

type Props = { className?: string };

export function DailyChallenge({ className = '' }: Props) {
  const [check, setCheck] = useState<KnowledgeCheck | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setCheck(getDailyKnowledgeCheck(new Date())));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  if (!check) {
    return <div className={`h-80 animate-pulse rounded-3xl border border-violet-100 bg-violet-50/50 ${className}`} aria-label="Loading today’s challenge" />;
  }

  return <KnowledgeCheckCard check={check} className={className} />;
}

