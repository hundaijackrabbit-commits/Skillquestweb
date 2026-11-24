// Protect the published Chinese editorial routes and their English source pages.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { CHINESE_EDITION_SLUGS, hasChineseEdition, editionPath, sourcePath } from '../src/lib/zh-cn/edition-routes.ts';
import { CHINESE_SKILL_EDITIONS } from '../src/lib/zh-cn/skills.ts';
import { CHINESE_CAREER_EDITIONS } from '../src/lib/zh-cn/careers.ts';
import { CHINESE_ARTICLE_EDITIONS } from '../src/lib/zh-cn/articles.ts';

const read = (path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const exists = (path) => existsSync(new URL('../' + path, import.meta.url));
const groups = { skill: CHINESE_SKILL_EDITIONS, career: CHINESE_CAREER_EDITIONS, article: CHINESE_ARTICLE_EDITIONS };
const routes = { skill: 'skills', career: 'careers', article: 'blog' };

test('All ten Chinese editorial editions have distinct, substantive, readable content', () => {
  assert.equal(Object.values(groups).reduce((n, items) => n + Object.keys(items).length, 0), 10);
  for (const [kind, entries] of Object.entries(groups)) {
    for (const [slug, entry] of Object.entries(entries)) {
      assert.equal(entry.kind, kind);
      assert.equal(entry.slug, slug);
      assert.match(entry.title, /[\u3400-\u9fff]/);
      assert.ok(entry.description.length >= 24, 'Metadata description missing for ' + slug);
      assert.ok(entry.sections.length >= 4, 'Not enough teaching sections in ' + slug);
      const prose = [...entry.introduction, ...entry.sections.flatMap(s => [...s.paragraphs, ...(s.points ?? [])]), ...entry.exercise.steps].join('');
      assert.ok((prose.match(/[\u3400-\u9fff]/g) || []).length >= 450, 'Chinese content too short in ' + slug);
      assert.ok(entry.exercise.steps.length >= 3, 'Practice activity missing in ' + slug);
      assert.match(entry.sourceReviewedAt, /^20\d\d-\d\d-\d\d$/);
      assert.ok(!entry.references || entry.references.every(r => r.url.startsWith('https://')));
    }
  }
});

test('Chinese article slugs match the existing unchanged source MDX files', () => {
  for (const slug of Object.keys(groups.article)) {
    const path = 'src/content/blog/' + slug + '.mdx';
    assert.ok(exists(path), 'English source article not found: ' + path);
    assert.match(read(path), new RegExp('slug: "' + slug + '"'));
  }
});

test('Chinese career slugs exist in the original career dataset', () => {
  const all = JSON.parse(read('src/data/careers.json'));
  const slugs = new Set(all.map(c => c.slug));
  for (const slug of Object.keys(groups.career)) assert.ok(slugs.has(slug), 'Missing original career: ' + slug);
});

test('All localized routes use Chinese metadata with reciprocal English alternates', () => {
  for (const [kind, route] of Object.entries(routes)) {
    const page = read('src/app/zh-CN/' + route + '/[slug]/page.tsx');
    assert.ok(page.includes("findChineseEdition('" + kind + "'"));
    assert.ok(page.includes("chineseAlternateLanguages('" + kind + "'"));
    assert.ok(page.includes("locale: 'zh_CN'"));
    assert.ok(page.includes('dynamicParams = false'));
    const englishPage = read('src/app/' + route + '/[slug]/page.tsx');
    assert.ok(englishPage.includes("chineseAlternateLanguages('" + kind + "'"));
    assert.ok(englishPage.includes("editionPath('" + kind + "'"));
  }
  const template = read('src/components/zh-cn/chinese-editorial-page.tsx');
  assert.ok(template.includes('lang="zh-CN"'));
  assert.ok(template.includes('inLanguage:'));
  assert.ok(template.includes('English original'));
});

test('Chinese sitemap and robots discovery use only real translated pages', () => {
  const route = read('src/app/sitemap-zh.xml/route.ts');
  assert.ok(route.includes("listChineseEditions(kind)"));
  assert.ok(route.includes('hreflang="zh-CN"'));
  assert.ok(route.includes('hreflang="en"'));
  assert.ok(read('src/app/sitemap.ts').includes("listChineseEditions(kind)"));
  assert.ok(read('src/app/robots.ts').includes('/sitemap-zh.xml'));
  assert.ok(read('next.config.ts').includes("source: '/zh-CN/:path*'"));
  assert.ok(read('next.config.ts').includes("'Content-Language', value: 'zh-CN'"));
});

test('Chinese index lists edited content without deleting existing learning resources', () => {
  const page = read('src/app/zh-CN/page.tsx');
  assert.ok(page.includes('listChineseEditions(group.kind)'));
  assert.ok(page.includes('id="zh-editions"'));
  assert.ok(page.includes("href: '/zh-CN/skills/ai-literacy'"));
  assert.ok(page.includes('AI 学习助手'));
  assert.ok(read('src/app/layout.tsx').includes('<LearningProgressCloudSync />'));
  assert.ok(read('src/app/layout.tsx').includes('<Header />'));
  assert.ok(read('src/app/layout.tsx').includes('<Footer />'));
});

test('Manual China network probe does not silently run during builds', () => {
  assert.ok(exists('scripts/china-connectivity-probe.mjs'));
  assert.ok(!read('package.json').includes('prebuild": "node scripts/china-connectivity-probe'));
const read = (file) => readFileSync(new URL('../' + file, import.meta.url), 'utf8');
const records = { skill: CHINESE_SKILL_EDITIONS, career: CHINESE_CAREER_EDITIONS, article: CHINESE_ARTICLE_EDITIONS };
const all = Object.entries(records).flatMap(([kind, entries]) => Object.values(entries).map((edition) => ({ kind, edition })));
const chinese = /[\u3400-\u9fff]/;

test('the first rollout has exactly 10 curated, not auto-generated, Chinese editions', () => {
  assert.equal(all.length, 10);
  assert.deepEqual(Object.keys(CHINESE_SKILL_EDITIONS).sort(), [...CHINESE_EDITION_SLUGS.skill].sort());
  assert.deepEqual(Object.keys(CHINESE_CAREER_EDITIONS).sort(), [...CHINESE_EDITION_SLUGS.career].sort());
  assert.deepEqual(Object.keys(CHINESE_ARTICLE_EDITIONS).sort(), [...CHINESE_EDITION_SLUGS.article].sort());
});

test('each Chinese edition contains meaningful original reading and a complete practical exercise', () => {
  const allPaths = new Set(all.map(({ kind, edition }) => editionPath(kind, edition.slug)));
  for (const { kind, edition } of all) {
    assert.equal(edition.kind, kind, edition.slug);
    assert.ok(chinese.test(edition.title), edition.slug + ': no Chinese title');
    assert.ok(chinese.test(edition.description), edition.slug + ': no Chinese description');
    assert.ok(edition.sections.length >= 5, edition.slug + ': too few sections');
    assert.ok(edition.introduction.length >= 2);
    assert.ok(edition.exercise.steps.length >= 4);
    const prose = [...edition.introduction, ...edition.sections.flatMap((s) => [s.heading, ...s.paragraphs, ...(s.points ?? [])]), ...edition.exercise.steps, edition.exercise.success].join('');
    assert.ok(prose.length > 500, edition.slug + ': page content too thin');
    assert.ok((prose.match(/[\u3400-\u9fff]/g) ?? []).length > 300, edition.slug + ': language coverage too low');
    assert.match(edition.sourceReviewedAt, /^20\d\d-\d\d-\d\d$/);
    assert.ok(hasChineseEdition(kind, edition.slug));
    assert.ok(sourcePath(kind, edition.slug).startsWith('/'));
    for (const related of edition.related ?? []) assert.ok(allPaths.has(related.href), edition.slug + ': broken related Chinese link ' + related.href);
    for (const ref of edition.references ?? []) assert.ok(new URL(ref.url).protocol === 'https:', edition.slug + ': unsafe reference');
  }
});

test('all 3 Chinese articles retain their actual source MDX files', () => {
  for (const slug of CHINESE_EDITION_SLUGS.article) {
    assert.ok(existsSync(new URL('../src/content/blog/' + slug + '.mdx', import.meta.url)), slug);
  }
});

test('Chinese detail routes have per-page canonical, hreflang and source references', () => {
  const page = read('src/app/zh-CN/[collection]/[slug]/page.tsx');
  assert.match(page, /lang="zh-CN"/);
  assert.match(page, /languages: \{ 'zh-CN': translated, en: original \}/);
  assert.match(page, /canonical: translated/);
  assert.match(page, /isBasedOn: absoluteUrl\(original\)/);
  assert.match(page, /getChineseEdition|chineseEditionForRoute/);
  assert.match(page, /sourceReviewedAt/);
  assert.ok(read('src/app/zh-CN/page.tsx').includes('CHINESE_EDITION_GROUPS.map'));
});

test('the original 3 English content routes link to Chinese only when an edition exists', () => {
  for (const file of ['src/app/skills/[slug]/page.tsx', 'src/app/careers/[slug]/page.tsx', 'src/app/blog/[slug]/page.tsx']) {
    const source = read(file);
    assert.ok(source.includes('hasChineseEdition('), file + ': missing conditional hreflang');
    assert.ok(source.includes('<ChineseEditionLink '), file + ': missing bilingual link');
  }
  const link = read('src/components/learning/chinese-edition-link.tsx');
  assert.ok(link.includes('if (!hasChineseEdition(kind, slug)) return null'));
});

test('localized pages are included in sitemap without changing the original sitemap', () => {
  const sitemap = read('src/app/sitemap.ts');
  assert.ok(sitemap.includes("CHINESE_EDITION_SLUGS.skill.map"));
  assert.ok(sitemap.includes("CHINESE_EDITION_SLUGS.career.map"));
  assert.ok(sitemap.includes("CHINESE_EDITION_SLUGS.article.map"));
  assert.ok(sitemap.includes('...skills.map('));
  assert.ok(sitemap.includes('...indexableCareers.map('));
  assert.ok(sitemap.includes('...indexablePosts.map('));
});

test('Chinese editorial pages do not depend on video or an external font to deliver the text', () => {
  for (const file of ['src/app/zh-CN/[collection]/[slug]/page.tsx','src/app/zh-CN/page.tsx']) {
    const s = read(file);
    assert.ok(!/<iframe|youtube\.com|fonts\.googleapis\.com/i.test(s), file);
  }
  assert.ok(read('src/components/providers/chinese-route-language.tsx').includes("setLanguage('zh-CN')"));
});
