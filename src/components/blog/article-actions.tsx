'use client';

import { useEffect, useState } from 'react';
import { BookmarkCheck, Check, Share2, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Props = {
  slug: string;
};

function usefulKey(slug: string) {
  return `msl_article_useful_${slug}`;
}

export function ArticleActions({ slug }: Props) {
  const [useful, setUseful] = useState(false);
  const [shareStatus, setShareStatus] = useState<'idle' | 'copied'>('idle');

  useEffect(() => {
    setUseful(window.localStorage.getItem(usefulKey(slug)) === 'true');
  }, [slug]);

  function toggleUseful() {
    const next = !useful;
    setUseful(next);
    window.localStorage.setItem(usefulKey(slug), String(next));
  }

  async function shareArticle() {
    try {
      if (navigator.share) {
        await navigator.share({ title: document.title, url: window.location.href });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShareStatus('copied');
        window.setTimeout(() => setShareStatus('idle'), 2200);
      }
    } catch {
      // Closing the native share dialog should leave the page unchanged.
    }
  }

  return (
    <div className="flex flex-wrap gap-3 border-b pb-6" aria-label="Article actions">
      <Button type="button" variant="outline" size="sm" onClick={toggleUseful} aria-pressed={useful}>
        {useful ? <BookmarkCheck className="mr-2 h-4 w-4 text-emerald-600" /> : <Check className="mr-2 h-4 w-4" />}
        {useful ? 'Marked useful' : 'Mark useful'}
      </Button>
      <Button type="button" variant="outline" size="sm" onClick={shareArticle}>
        <Share2 className="mr-2 h-4 w-4" />{shareStatus === 'copied' ? 'Link copied' : 'Share'}
      </Button>
      <Button type="button" variant="outline" size="sm" onClick={() => document.getElementById('practice-next')?.scrollIntoView({ behavior: 'smooth' })}>
        <Target className="mr-2 h-4 w-4" />Practice next
      </Button>
    </div>
  );
}
