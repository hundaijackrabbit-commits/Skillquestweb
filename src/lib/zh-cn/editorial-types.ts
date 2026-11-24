export type ChineseEditionKind = 'skill' | 'career' | 'article';

export type ChineseSection = {
  heading: string;
  paragraphs: string[];
  points?: string[];
};

export type ChineseEdition = {
  kind: ChineseEditionKind;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  introduction: string[];
  sections: ChineseSection[];
  exercise: {
    title: string;
    steps: string[];
    success: string;
  };
  references?: { title: string; url: string }[];
  related?: { title: string; href: string }[];
  sourceReviewedAt: string;
};

export const editionPath = (kind: ChineseEditionKind, slug: string) =>
  `/zh-CN/${kind === 'skill' ? 'skills' : kind === 'career' ? 'careers' : 'blog'}/${slug}`;

export const sourcePath = (kind: ChineseEditionKind, slug: string) =>
  `/${kind === 'skill' ? 'skills' : kind === 'career' ? 'careers' : 'blog'}/${slug}`;
