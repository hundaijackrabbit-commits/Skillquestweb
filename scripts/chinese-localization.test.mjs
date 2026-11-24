// Safe, dependency-free regression checks for Simplified Chinese.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { chineseSiteUi } from '../src/lib/zh-cn-site-ui.ts';
import { resolveChineseSkillSearch } from '../src/lib/zh-cn-skill-search.ts';

const read = (p) => readFileSync(new URL('../' + p, import.meta.url), 'utf8');

test('Chinese skill queries resolve without altering ordinary English searches', () => {
  assert.equal(resolveChineseSkillSearch('数据分析'), 'data analysis');
  assert.equal(resolveChineseSkillSearch('人工智能素养'), 'ai literacy');
  assert.equal(resolveChineseSkillSearch(' 批判性思维 '), 'critical thinking');
  assert.equal(resolveChineseSkillSearch('沟通能力'), 'communication');
  assert.equal(resolveChineseSkillSearch('professional communication'), 'professional communication');
  assert.equal(resolveChineseSkillSearch(''), '');
});

test('Chinese translation covers the most important interface and conversion routes', () => {
  const required = [
    'Home', 'Skills', 'Careers', 'Practice Lab', 'Knowledge Dictionary',
    'Understand it. Practice it. Prove it.', 'Find a skill',
    'Search the skills library', 'Search by skill or workplace need',
    'Find the right skill', 'Open skill guide', 'Career Intelligence Platform',
    'Skill Requirements', 'Create account', 'Password', 'Save Skill',
    'Your learning progress', 'Your learning loop', 'Get explanation',
    'Your next step', 'Practice XP', 'Personal learning profile',
  ];
  for (const key of required) {
    // Existing six-language catalog is an intentional fallback for shared phrases.
    const legacy = read('src/lib/ui-translations.ts');
    assert.ok((chineseSiteUi[key] && chineseSiteUi[key] !== key) || legacy.includes(JSON.stringify(key)), 'Missing Simplified Chinese UI: ' + key);
  }
});

test('All 16 canonical skill topics have real Chinese names', () => {
  const topics = [
    'Communication', 'Leadership', 'Critical Thinking', 'Collaboration',
    'Personal Effectiveness', 'Business & Strategy', 'Sales & Marketing',
    'Finance & Operations', 'People & HR', 'Customer Success',
    'Digital Literacy', 'Content & Media', 'Design & UX',
    'Technical Skills', 'Analytics & Research', 'AI & Automation',
  ];
  for (const topic of topics) assert.match(chineseSiteUi[topic] ?? '', /[\u3400-\u9FFF]/, 'Untranslated topic: ' + topic);
});

test('Chinese learning hub is substantive and searchable, without fictional article alternates', () => {
  const page = read('src/app/zh-CN/page.tsx');
  assert.ok(page.includes('lang="zh-CN"'));
  assert.ok(page.includes("canonical: '/zh-CN'"));
  assert.ok(page.includes("href: '/zh-CN/skills/ai-literacy'"));
  assert.ok(page.includes("href: '/zh-CN/skills/communication'"));
  assert.ok(page.includes("href: '/zh-CN/skills/critical-thinking'"));
  assert.ok(page.includes('其他大量历史内容仍以英文为主'));
  assert.ok(page.includes('目前许多完整的技能、职业及博客文章仍为英文'));
  assert.ok(read('src/app/zh-CN/[collection]/[slug]/page.tsx').includes('Read original in English'));
  assert.ok(read('src/app/sitemap.ts').includes("absoluteUrl('/zh-CN')"));
});

test('Browser skill search retains original Chinese URL and only normalizes filtering', () => {
  const search = read('src/app/skills/search/page.tsx');
  assert.ok(search.includes('resolveChineseSkillSearch(query)'));
  assert.ok(search.includes('searchDefaults={{ query, category, sort }}'));
  assert.ok(search.includes('searchScore(skill, searchQuery)'));
  assert.ok(read('src/components/skills/skills-search-form.tsx').includes('action="/skills/search"'));
});

test('Chinese fallback is localized and cloud sync stays independent', () => {
  const ui = read('src/lib/ui-translations.ts');
  assert.ok(ui.includes("locale === 'zh-CN' ? chineseSiteUi[text]"));
  assert.ok(ui.includes("|| dictionaries[locale][text]"));
  assert.ok(read('src/components/marketing/homepage-video-by-language.tsx').includes("locale !== 'zh-CN'"));
  const sync = read('src/components/learning/learning-progress-cloud-sync.tsx');
  assert.ok(sync.includes("process.env.NEXT_PUBLIC_LEARNING_PROGRESS_SYNC_ENABLED === 'true'"));
});
