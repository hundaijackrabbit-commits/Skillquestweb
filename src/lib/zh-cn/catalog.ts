import { CHINESE_EDITION_SLUGS } from './edition-routes';
import { CHINESE_SKILL_EDITIONS } from './skills';
import { CHINESE_CAREER_EDITIONS } from './careers';
import { CHINESE_ARTICLE_EDITIONS } from './articles';
import type { ChineseEdition, ChineseEditionKind } from './editorial-types';

const ALL_EDITIONS: Readonly<Record<ChineseEditionKind, Readonly<Record<string, ChineseEdition>>>> = {
  skill: CHINESE_SKILL_EDITIONS,
  career: CHINESE_CAREER_EDITIONS,
  article: CHINESE_ARTICLE_EDITIONS,
};

export function chineseEdition(kind: ChineseEditionKind, slug: string): ChineseEdition | null {
  return ALL_EDITIONS[kind][slug] ?? null;
}

export function chineseEditionForRoute(collection: string, slug: string): ChineseEdition | null {
  const kind: ChineseEditionKind | null =
    collection === 'skills' ? 'skill' : collection === 'careers' ? 'career' : collection === 'blog' ? 'article' : null;
  return kind ? chineseEdition(kind, slug) : null;
}

export function chineseEditionSlugs(): { collection: string; slug: string }[] {
  return Object.entries(CHINESE_EDITION_SLUGS).flatMap(([kind, slugs]) => (
    slugs.map((slug) => ({
      collection: kind === 'skill' ? 'skills' : kind === 'career' ? 'careers' : 'blog',
      slug,
    }))
  ));
}

export const CHINESE_EDITION_GROUPS = [
  { kind: 'skill' as const, label: '精选技能指南', description: '理解一项技能的原理、职场用途和练习方法。' },
  { kind: 'career' as const, label: '职业方向与入行路径', description: '比较工作内容、核心技能和可展示的项目经验。' },
  { kind: 'article' as const, label: '职场专题文章', description: '深入阅读 AI、数据与沟通相关的实用专题。' },
].map((group) => ({ ...group, editions: CHINESE_EDITION_SLUGS[group.kind].map((slug) => ALL_EDITIONS[group.kind][slug]) }));
