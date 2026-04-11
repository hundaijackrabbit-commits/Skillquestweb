import Link from 'next/link';
import { BookOpen, Users, Briefcase, Building2, PenTool, Mail, Globe, MessageCircle, Share2 } from 'lucide-react';

const navigation = {
  main: [
    { name: 'Skills', href: '/skills', icon: BookOpen },
    { name: 'Careers', href: '/careers', icon: Briefcase },
    { name: 'Industries', href: '/industries', icon: Building2 },
    { name: 'Blog', href: '/blog', icon: PenTool },
    { name: 'Community', href: '/community', icon: Users },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Mission', href: '/mission' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
  ],
  resources: [
    { name: 'Learning Paths', href: '/learning-paths' },
    { name: 'Skill Assessment', href: '/assessment' },
    { name: 'Career Guide', href: '/career-guide' },
    { name: 'Industry Reports', href: '/reports' },
    { name: 'Research', href: '/research' },
  ],
  social: [
    { name: 'Social', href: '#', icon: MessageCircle },
    { name: 'Community', href: '#', icon: Globe },
    { name: 'Share', href: '#', icon: Share2 },
    { name: 'Newsletter', href: '/newsletter', icon: Mail },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-20 lg:px-8 lg:pt-24">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-sm font-bold text-white">
                M
              </div>
              <div>
                <div className="text-lg font-bold text-slate-900">Modern Skill Lab</div>
                <div className="text-sm text-slate-500">Practical skills for modern work</div>
              </div>
            </div>
            <p className="max-w-md text-sm leading-6 text-slate-600">
              A professional skills and career intelligence platform designed to help ambitious people build useful, modern capabilities with clarity.
            </p>
            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-slate-400 transition-colors hover:text-slate-600"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-900">Platform</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.main.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="flex items-center gap-2 text-sm leading-6 text-slate-600 hover:text-slate-900"
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-900">Resources</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.resources.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-slate-600 hover:text-slate-900">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-900">Company</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-slate-600 hover:text-slate-900">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-900">Newsletter</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Get practical insights on skills, careers, and modern work as the platform grows.
                </p>
                <form className="mt-6 sm:flex sm:max-w-md">
                  <label htmlFor="email-address" className="sr-only">Email address</label>
                  <input
                    type="email"
                    name="email-address"
                    id="email-address"
                    autoComplete="email"
                    required
                    className="w-full min-w-0 appearance-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-base text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 sm:w-64 sm:text-sm xl:w-full"
                    placeholder="Enter your email"
                  />
                  <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
                    <button
                      type="submit"
                      className="flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                    >
                      Subscribe
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-slate-200 pt-6 sm:flex sm:items-center sm:justify-between">
          <p className="text-xs leading-5 text-slate-500">© 2026 Modern Skill Lab. Built for practical, career-relevant growth.</p>
          <p className="mt-3 text-xs leading-5 text-slate-500 sm:mt-0">Clear thinking • Useful skills • Modern work</p>
        </div>
      </div>
    </footer>
  );
}