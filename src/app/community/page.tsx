import { CommunityHub } from '@/components/community/community-hub';

export const metadata = {
  title: 'Skill Community | Modern Skill Lab',
  description: 'Talk with other learners about skills, ask practical questions, share resources, compare approaches, and celebrate progress.',
  alternates: { canonical: '/community' },
};

export default function CommunityPage() {
  return <CommunityHub />;
}
