import { CHINESE_SKILL_EDITIONS } from './skills';
import { CHINESE_CAREER_EDITIONS } from './careers';
import { CHINESE_ARTICLE_EDITIONS } from './articles';
import type { ChineseEdition, ChineseEditionKind } from './editorial-types';
export { editionPath, sourcePath } from './editorial-types';
export type { ChineseEdition, ChineseEditionKind } from './editorial-types';

export const CHINESE_EDITIONS: Readonly<Record<ChineseEditionKind, Readonly<Record<string, ChineseEdition>>>> = {
  skill: CHINESE_SKILL_EDITIONS,
  career: CHINESE_CAREER_EDITIONS,
  article: CHINESE_ARTICLE_EDITIONS,
};

export function findChineseEdition(kind: ChineseEditionKind, slug: string) {
  return CHINESE_EDITIONS[kind][slug] ?? null;
}

export function listChineseEditions(kind: ChineseEditionKind) {
  return Object.values(CHINESE_EDITIONS[kind]);
}

export function chineseAlternateLanguages(kind: ChineseEditionKind, slug: string) {
  const entry = findChineseEdition(kind, slug);
  if (!entry) return undefined;
  const root = kind === 'skill' ? 'skills' : kind === 'career' ? 'careers' : 'blog';
  return {
    en: `/${root}/${slug}`,
    'zh-CN': `/zh-CN/${root}/${slug}`,
  };
}
