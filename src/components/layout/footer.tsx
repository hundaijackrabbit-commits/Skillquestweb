import Link from 'next/link';
import { BookOpen, Users, Briefcase, Building2, PenTool, ShieldCheck } from 'lucide-react';
import { NewsletterForm } from '@/components/marketing/newsletter-form';

const navigation = {
  platform: [
    { name: 'Skills', href: '/skills', icon: BookOpen },
    { name: 'Careers', href: '/careers', icon: Briefcase },
    { name: 'Industries', href: '/industries', icon: Building2 },
    { name: 'Learning Paths', href: '/paths', icon: BookOpen },
    { name: 'Blog', href: '/blog', icon: PenTool },
    { name: 'Community', href: '/community', icon: Users },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Privacy', href: '/privacy' },
    { name: 'Member sign in', href: '/auth' },
    { name: 'Admin sign in', href: '/admin/login' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.8fr_1.1fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-sm font-bold text-white">M</div>
              <div>
                <div className="text-lg font-bold text-slate-900">Modern Skill Lab</div>
                <div className="text-sm text-slate-500">Practical skills for modern work</div>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-6 text-slate-600">
              Explore practical skill guides, career pathways, and modern-work ideas designed to help you decide what to learn next.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-900">Explore</h3>
              <ul className="mt-5 space-y-3">
                {navigation.platform.map((item) => (
                  <li key={item.name}><Link href={item.href} className="text-sm text-slate-600 hover:text-slate-900">{item.name}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-900">Account</h3>
              <ul className="mt-5 space-y-3">
                {navigation.company.map((item) => (
                  <li key={item.name}><Link href={item.href} className="text-sm text-slate-600 hover:text-slate-900">{item.name}</Link></li>
                ))}
              </ul>
            </div>
          </div>

          <div id="newsletter">
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-900">One useful skill every week</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">Get practical skills, career ideas, and modern-work insights worth keeping.</p>
            <NewsletterForm source="footer" compact className="mt-5" />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Modern Skill Lab. Practical, career-relevant learning.</p>
          <Link href="/admin/login" className="inline-flex items-center gap-1.5 hover:text-slate-700"><ShieldCheck className="h-3.5 w-3.5" /> Admin</Link>
        </div>
      </div>
    </footer>
  );
}
