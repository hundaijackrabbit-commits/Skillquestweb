'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, Globe2 } from 'lucide-react';
import { useLearningLanguage } from '@/components/providers/learning-language-provider';
import { PortraitIntroVideo } from '@/components/marketing/portrait-intro-video';

/**
 * The English intro is hosted on YouTube, which can be inaccessible in China.
 * For zh-CN readers, render a fully local, meaningful text alternative.
 * Defer the embed until the saved/browser locale is loaded so it is not
 * needlessly requested before showing the Chinese alternative.
 */
export function HomepageVideoByLanguage() {
  const { locale } = useLearningLanguage();
  const [ready, setReady] = useState(false);

  useEffect(() => { setReady(true); }, []);

  if (!ready) {
    return (
      <div aria-hidden="true" className="aspect-[9/16] w-full max-w-[340px] rounded-[1.65rem] border border-white/10 bg-slate-900 sm:max-w-[360px]" />
    );
  }

  if (locale !== 'zh-CN') return <PortraitIntroVideo />;

  return (
    <section lang="zh-CN" aria-label="中文学习简介" className="flex min-h-[380px] w-full max-w-[360px] flex-col justify-between rounded-[1.65rem] border border-cyan-300/30 bg-gradient-to-b from-slate-800 to-indigo-950 p-7 text-white shadow-xl">
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-cyan-200"><Globe2 className="h-4 w-4" aria-hidden="true" />简体中文学习入口</div>
        <h3 className="mt-7 text-3xl font-bold leading-tight">先理解，再实践，最后验证。</h3>
        <p className="mt-5 text-sm leading-8 text-slate-200">从沟通、AI 素养和批判性思维开始，建立能在工作中使用的技能。每次只学一个重点，用短练习验证自己的理解。</p>
        <ol className="mt-5 space-y-3 text-sm leading-6 text-cyan-100">
          <li>01 · 选择与你的目标相关的技能</li>
          <li>02 · 阅读示例，尝试真实任务</li>
          <li>03 · 复盘并记录进步</li>
        </ol>
      </div>
      <div className="mt-8">
        <Link href="/zh-CN" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-slate-950 hover:bg-cyan-100">
          <BookOpen className="h-4 w-4" aria-hidden="true" />进入中文学习中心 <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        <p className="mt-4 text-xs leading-6 text-slate-300">原英文介绍视频使用 YouTube；此处提供无需视频平台的中文替代内容。</p>
      </div>
    </section>
  );
}
