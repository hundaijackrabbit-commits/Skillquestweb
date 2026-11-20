'use client';

import { useState } from 'react';
import { Check, Copy, Linkedin, MessageCircle, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLearningLanguage } from '@/components/providers/learning-language-provider';

type Props = {
  url: string;
  title: string;
};

export function ShareActions({ url, title }: Props) {
  const { locale } = useLearningLanguage();
  const zh = locale === 'zh-CN';
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'failed'>('idle');

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopyStatus('copied');
    } catch {
      setCopyStatus('failed');
    }
  }

  async function sharePage() {
    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({ title, url });
        return;
      } catch (error) {
        // A cancelled share is not an error and should not show a notification.
        if (error instanceof DOMException && error.name === 'AbortError') return;
      }
    }
    await copyLink();
  }

  const whatsAppUrl = `https://wa.me/?text=${encodeURIComponent(`${title}\n${url}`)}`;
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  return (
    <div className="flex flex-wrap items-center gap-2" role="group" aria-label={zh ? '分享本页' : 'Share this page'}>
      <Button type="button" size="sm" variant="outline" onClick={sharePage}>
        <Share2 className="mr-2 h-4 w-4" aria-hidden="true" />
        {zh ? '分享' : 'Share'}
      </Button>
      <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-9 items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        WhatsApp
      </a>
      <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-9 items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
        <Linkedin className="h-4 w-4" aria-hidden="true" />
        LinkedIn
      </a>
      <Button type="button" size="sm" variant="outline" onClick={copyLink} aria-live="polite">
        {copyStatus === 'copied' ? <Check className="mr-2 h-4 w-4" aria-hidden="true" /> : <Copy className="mr-2 h-4 w-4" aria-hidden="true" />}
        {copyStatus === 'copied'
          ? (zh ? '链接已复制' : 'Link copied')
          : copyStatus === 'failed'
            ? (zh ? '无法复制链接' : 'Copy unavailable')
            : (zh ? '复制链接' : 'Copy link')}
      </Button>
    </div>
  );
}
