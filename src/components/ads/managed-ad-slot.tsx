'use client';

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type PlacementKey = 'homepage-inline' | 'skill-inline' | 'career-inline' | 'blog-inline';

export function ManagedAdSlot({ placement }: { placement: PlacementKey }) {
  const [slotId, setSlotId] = useState<string | null>(null);
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  useEffect(() => {
    if (!clientId) return;
    fetch(`/api/ad-placement?key=${encodeURIComponent(placement)}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.enabled && data.slotId) setSlotId(data.slotId);
      })
      .catch(() => {});
  }, [clientId, placement]);

  useEffect(() => {
    if (!slotId) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, [slotId]);

  if (!clientId || !slotId) return null;

  return (
    <div className="mx-auto my-8 max-w-5xl" aria-label="Advertisement">
      <div className="mb-1 text-center text-[10px] uppercase tracking-[0.16em] text-slate-400">Advertisement</div>
      <ins
        className="adsbygoogle block"
        data-ad-client={clientId}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
