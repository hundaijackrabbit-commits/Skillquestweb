'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

type ResolverResult = {
  found?: boolean;
  path?: string;
  label?: string;
};

function isSafeInternalPath(path: string) {
  return /^\/(?:skills|careers|industries|learn|paths|blog|topics)(?:\/|$)/.test(path)
    || ['/', '/about', '/community', '/dashboard', '/free-career-guide', '/privacy'].includes(path);
}

export function ResolvedNavigationFallback() {
  const router = useRouter();

  useEffect(() => {
    const nativeFetch = window.fetch.bind(window);

    window.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
      const response = await nativeFetch(input, init);

      const url = typeof input === 'string'
        ? input
        : input instanceof URL
          ? input.toString()
          : input.url;

      if (url.includes('/api/agent/resolve-page')) {
        try {
          const data = await response.clone().json() as ResolverResult;
          const path = typeof data.path === 'string' ? data.path : '';
          if (data.found && path && isSafeInternalPath(path) && window.location.pathname !== path) {
            router.prefetch(path);
            router.push(path);

            // Dynamic route transitions should be client-side, but fall back to a
            // full navigation if the route does not change quickly enough.
            window.setTimeout(() => {
              if (window.location.pathname !== path) window.location.assign(path);
            }, 700);
          }
        } catch {
          // Leave the original fetch behavior untouched if the response is not JSON.
        }
      }

      return response;
    }) as typeof window.fetch;

    return () => {
      window.fetch = nativeFetch as typeof window.fetch;
    };
  }, [router]);

  return null;
}
