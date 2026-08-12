'use client';

import { useEffect } from 'react';

type Props = {
  eventType: 'skill_view' | 'career_view' | 'blog_view' | 'page_view';
  itemType: 'skill' | 'career' | 'blog' | 'page';
  itemSlug: string;
};

function getSessionId() {
  const key = 'msl_session_id';
  const existing = window.sessionStorage.getItem(key);
  if (existing) return existing;
  const next = typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
  window.sessionStorage.setItem(key, next);
  return next;
}

export function ContentViewTracker({ eventType, itemType, itemSlug }: Props) {
  useEffect(() => {
    const payload = {
      eventType,
      itemType,
      itemSlug,
      path: window.location.pathname,
      referrer: document.referrer || undefined,
      sessionId: getSessionId(),
    };

    fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  }, [eventType, itemType, itemSlug]);

  return null;
}
