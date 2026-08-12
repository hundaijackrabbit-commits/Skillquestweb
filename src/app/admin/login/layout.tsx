import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Sign In',
  description: 'Secure Modern Skill Lab administrator sign in.',
  robots: { index: false, follow: false },
};

export default function AdminLoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
