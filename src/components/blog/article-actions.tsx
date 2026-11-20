'use client';

import { useEffect, useState } from 'react';
import { BookmarkCheck, Check, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ShareActions } from '@/components/social/share-actions';

type Props = {
  slug: string;
  title: string;
  url: string;
};

function usefulKey(slug: string) {
  return `msl_article_useful_${slug}`;
}

export function ArticleActions({ slug, title, url }: Props) {
  const [useful, setUseful] = useState(false);

  useEffect(() => {
    try {
      setUseful(window.localStorage.getItem(usefulKey(slug)) === 'true');
    } catch {
      // Local storage may be disabled; sharing and article reading still work.
    }
  }, [slug]);

  function toggleUseful() {
    const next = !useful;
    setUseful(next);
    try {
      window.localStorage.setItem(usefulKey(slug), String(next));
    } catch {
      // Keep the in-page action usable if browser storage is unavailable.
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3 border-b pb-6" aria-label="Article actions">
      <Button type="button" variant="outline" size="sm" onClick={toggleUseful} aria-pressed={useful}>
        {useful ? <BookmarkCheck className="mr-2 h-4 w-4 text-emerald-600" /> : <Check className="mr-2 h-4 w-4" />}
        {useful ? 'Marked useful' : 'Mark useful'}
      </Button>
      <ShareActions url={url} title={title} />
      <Button type="button" variant="outline" size="sm" onClick={() => document.getElementById('practice-next')?.scrollIntoView({ behavior: 'smooth' })}>
        <Target className="mr-2 h-4 w-4" />Practice next
      </Button>
    </div>
  );
}
