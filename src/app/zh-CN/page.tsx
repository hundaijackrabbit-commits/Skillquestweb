import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpen, BrainCircuit, Compass, GraduationCap, Search, ShieldCheck } from 'lucide-react';
import { TOPICS } from '@/lib/topics';
import { translateInterface } from '@/lib/ui-translations';
import { absoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: '中文学习中心｜职场技能、职业方向与实践练习',
  description: 'Modern Skill Lab 简体中文学习入口：探索职场沟通、AI 素养、批判性思维、数据分析和职业规划。了解技能主题与免费学习工具。',
  alternates: { canonical: '/zh-CN' },
  openGraph: {
    title: '中文学习中心｜Modern Skill Lab',
    description: '用简体中文探索实用技能、职业方向和高效学习方法。',
    url: absoluteUrl('/zh-CN'),
    locale: 'zh_CN',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

const startingPoints = [
  {
    icon: BookOpen,
    title: '沟通能力：把话说清楚',
    overview: '有效沟通并不只是表达流利，而是帮助对方准确理解你的目的、背景和下一步行动。',
    steps: [
      '先明确目的：你希望听众了解什么，或者采取什么行动？',
      '用一句话概括要点，再补充必要的事实、限制和截止时间。',
      '请对方复述下一步，检查是否真的达成了共同理解。',
    ],
    task: '实践：选一条日常工作消息，将它改写成“背景—要点—下一步”的三段式表达。',
    href: '/skills/communication',
  },
  {
    icon: BrainCircuit,
    title: 'AI 素养：会使用，也会核验',
    overview: 'AI 能帮助整理想法和生成草稿，但流畅的回答不一定准确。核心能力是提出清晰的问题，并判断结果是否可靠。',
    steps: [
      '描述任务目标、读者、范围和限制，避免含糊指令。',
      '区分 AI 给出的事实、推测和建议，尤其注意数字与引用。',
      '对重要信息查阅原始来源，涉及隐私时不要输入敏感内容。',
    ],
    task: '实践：请 AI 总结一个熟悉的主题，然后逐条检查其中的事实和来源。',
    href: '/skills/ai-literacy',
  },
  {
    icon: Compass,
    title: '批判性思维：先问证据，再下结论',
    overview: '批判性思维不是反对所有观点，而是把事实、假设和判断分开，理解不同结论成立所需要的条件。',
    steps: [
      '将一个观点改写成能够被证据检验的问题。',
      '查找支持和反驳该观点的信息，识别样本、时间与来源限制。',
      '说明目前最合理的判断，以及哪些新证据可能改变它。',
    ],
    task: '实践：选择一条职场建议，分别写出支持证据、反例及仍不确定的地方。',
    href: '/skills/critical-thinking',
  },
];

export default function ChineseLearningHome() {
  return (
    <div lang="zh-CN" dir="ltr" className="min-h-screen bg-gradient-to-b from-blue-50/60 via-white to-white">
      <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-16">
        <nav aria-label="当前位置" className="text-sm text-slate-500">
          <Link href="/" className="font-semibold text-blue-700 hover:underline">Modern Skill Lab</Link>
          <span aria-hidden="true"> / </span>中文学习中心
        </nav>

        <header className="mt-8 max-w-4xl">
          <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1.5 text-sm font-semibold text-blue-800">简体中文 · 免费学习资源</span>
          <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl">从一项技能开始，建立真正用得上的职场能力。</h1>
          <p className="mt-5 text-lg leading-8 text-slate-700">Modern Skill Lab 帮助你了解不同技能的实际用途，选择适合自己的发展方向，并通过短练习巩固学习。不必一次学完所有内容；从最需要的一项开始即可。</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/skills" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white hover:bg-blue-800">浏览技能库 <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            <Link href="/careers" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-800 hover:border-blue-400">探索职业方向</Link>
            <Link href="/learn" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-800 hover:border-blue-400">进入练习实验室</Link>
          </div>
        </header>

        <section aria-labelledby="zh-transparency" className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <h2 id="zh-transparency" className="flex items-center gap-2 font-bold text-amber-950"><ShieldCheck className="h-5 w-5" aria-hidden="true" />中文内容进度说明</h2>
          <p className="mt-2 text-sm leading-7 text-amber-950">本页的学习说明与练习建议已提供简体中文。网站的主要导航、技能搜索和部分界面也支持中文；目前许多完整的技能、职业及博客文章仍为英文。打开这些页面时，可使用页面里的 AI 学习助手请求简体中文解释。AI 回答可能存在错误，重要信息应进一步核实。</p>
        </section>

        <section aria-labelledby="zh-start" className="mt-16">
          <div className="flex items-center gap-2 text-blue-700"><GraduationCap className="h-5 w-5" aria-hidden="true" /><span className="text-sm font-bold">实用学习起点</span></div>
          <h2 id="zh-start" className="mt-2 text-3xl font-bold text-slate-950">今天就能开始的三项核心技能</h2>
          <div className="mt-7 grid gap-5 lg:grid-cols-3">
            {startingPoints.map((item) => (
              <article key={item.title} className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <item.icon className="h-6 w-6 text-blue-700" aria-hidden="true" />
                <h3 className="mt-4 text-xl font-bold text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-700">{item.overview}</p>
                <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-700">
                  {item.steps.map((step) => <li key={step}>{step}</li>)}
                </ol>
                <p className="mt-5 rounded-xl bg-blue-50 p-4 text-sm leading-7 text-blue-900">{item.task}</p>
                <Link href={item.href} className="mt-auto inline-flex min-h-11 items-center gap-2 pt-5 text-sm font-bold text-blue-700">查看完整技能指南（英文）<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="zh-topics" className="mt-16">
          <div className="flex items-center gap-2 text-violet-700"><Search className="h-5 w-5" aria-hidden="true" /><span className="text-sm font-bold">技能分类</span></div>
          <h2 id="zh-topics" className="mt-2 text-3xl font-bold text-slate-950">按你想提升的能力选择主题</h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-600">以下主题提供中文名称和简介，并连接到现有的技能和职业资料。详细文章的翻译仍在完善中。</p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TOPICS.map((topic) => (
              <Link key={topic.slug} href={`/topics/${topic.slug}`} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-blue-300 hover:shadow-sm">
                <h3 className="font-bold text-slate-950">{translateInterface(topic.name, 'zh-CN')}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{translateInterface(topic.description, 'zh-CN')}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-blue-700">查看主题 <ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
        </section>

        <section aria-labelledby="zh-workflow" className="mt-16 rounded-3xl bg-slate-950 px-7 py-10 text-white sm:px-10">
          <h2 id="zh-workflow" className="text-3xl font-bold">更有效的学习方法：理解 → 练习 → 复盘</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div><h3 className="font-bold text-cyan-200">1. 理解</h3><p className="mt-2 text-sm leading-7 text-slate-200">了解概念的意义、适用场景和限制，找一个与你实际工作有关的例子。</p></div>
            <div><h3 className="font-bold text-cyan-200">2. 练习</h3><p className="mt-2 text-sm leading-7 text-slate-200">把刚学到的方法用于一个小任务，做出可观察的成果。</p></div>
            <div><h3 className="font-bold text-cyan-200">3. 复盘</h3><p className="mt-2 text-sm leading-7 text-slate-200">不看原文，尝试解释核心要点；检查遗漏，并计划下一次练习。</p></div>
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/glossary" className="inline-flex min-h-11 items-center rounded-xl border border-white/40 px-5 py-2 text-sm font-bold text-white hover:bg-white/10">知识词典（部分英文）</Link>
            <Link href="/auth?mode=signup&redirect=%2Fdashboard" className="inline-flex min-h-11 items-center rounded-xl bg-white px-5 py-2 text-sm font-bold text-slate-950 hover:bg-cyan-100">创建免费学习账户</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
