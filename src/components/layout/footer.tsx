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
    {
      name: 'Social',
      href: '#',
      icon: MessageCircle,
    },
    {
      name: 'Community',
      href: '#',
      icon: Globe,
    },
    {
      name: 'Share',
      href: '#',
      icon: Share2,
    },
    {
      name: 'Newsletter',
      href: '/newsletter',
      icon: Mail,
    },
  ],
};

export function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Brand section */}
          <div className="space-y-8">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-sm">
                SQ
              </div>
              <span className="text-xl font-bold text-gray-900">SkillQuest</span>
            </div>
            <p className="text-sm leading-6 text-gray-600">
              The professional skills repository and career intelligence platform for today's economy. 
              Evidence-backed skill development for ambitious professionals.
            </p>
            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
          
          {/* Links */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-gray-900">Platform</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.main.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="flex items-center space-x-2 text-sm leading-6 text-gray-600 hover:text-gray-900"
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-gray-900">Resources</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.resources.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-gray-900">Company</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-gray-900">Newsletter</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Get weekly insights on skill development and career strategy.
                </p>
                <form className="mt-6 sm:flex sm:max-w-md">
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email-address"
                    id="email-address"
                    autoComplete="email"
                    required
                    className="w-full min-w-0 appearance-none rounded-md border-0 bg-white px-3 py-1.5 text-base text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:w-64 sm:text-sm sm:leading-6 xl:w-full"
                    placeholder="Enter your email"
                  />
                  <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
                    <button
                      type="submit"
                      className="flex w-full items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                      Subscribe
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
          <div className="sm:flex sm:items-center sm:justify-between">
            <p className="text-xs leading-5 text-gray-500">
              &copy; 2024 SkillQuest. Built for the modern professional economy.
            </p>
            <div className="mt-4 sm:mt-0">
              <p className="text-xs leading-5 text-gray-500">
                Evidence-backed • Research-driven • Career-focused
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}