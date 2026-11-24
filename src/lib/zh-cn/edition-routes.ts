import type { ChineseEditionKind } from './editorial-types';

export const CHINESE_EDITION_SLUGS = {
  skill: ['ai-literacy', 'critical-thinking', 'data-analysis', 'communication'],
  career: ['data-analyst', 'product-manager', 'software-engineer'],
  article: ['ai-skills-2024-guide', 'data-skills-career-growth', 'communication-skills-that-drive-career-success'],
} as const;

export const editionPath = (kind: ChineseEditionKind, slug: string) =>
  `/zh-CN/${kind === 'skill' ? 'skills' : kind === 'career' ? 'careers' : 'blog'}/${slug}`;

export const sourcePath = (kind: ChineseEditionKind, slug: string) =>
  `/${kind === 'skill' ? 'skills' : kind === 'career' ? 'careers' : 'blog'}/${slug}`;

export function hasChineseEdition(kind: ChineseEditionKind, slug: string): boolean {
  return (CHINESE_EDITION_SLUGS[kind] as readonly string[]).includes(slug);
}
