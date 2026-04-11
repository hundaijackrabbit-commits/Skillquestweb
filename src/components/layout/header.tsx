'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useSupabase } from '@/components/providers/supabase-provider';
import { Search, Menu, X, BookOpen, Users, Briefcase, Building2, PenTool, User, LogOut, Sparkles } from 'lucide-react';

const navigation = [
  { name: 'Skills', href: '/skills', icon: BookOpen },
  { name: 'Careers', href: '/careers', icon: Briefcase },
  { name: 'Industries', href: '/industries', icon: Building2 },
  { name: 'Blog', href: '/blog', icon: PenTool },
  { name: 'Community', href: '/community', icon: Users },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, loading, signOut } = useSupabase();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="group -m-1.5 p-1.5">
            <span className="sr-only">Modern Skill Lab</span>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-sm font-bold text-white shadow-sm transition group-hover:scale-[1.02]">
                M
              </div>
              <div>
                <div className="text-base font-bold leading-none text-slate-900 sm:text-lg">Modern Skill Lab</div>
                <div className="mt-1 hidden text-xs font-medium text-slate-500 sm:block">
                  Practical skills for modern work
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="hidden lg:flex lg:items-center lg:gap-x-6 xl:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-2 text-sm font-semibold leading-6 text-slate-700 transition-colors hover:text-blue-600"
            >
              <item.icon className="h-4 w-4" />
              <span>{item.name}</span>
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:gap-3">
          <Link href="/blog" className="hidden xl:block">
            <Button variant="ghost" size="sm" className="text-slate-700">
              <Search className="mr-2 h-4 w-4" />
              Search topics
            </Button>
          </Link>

          {loading ? (
            <div className="flex gap-2">
              <div className="h-9 w-20 animate-pulse rounded-lg bg-slate-200" />
              <div className="h-9 w-24 animate-pulse rounded-lg bg-slate-200" />
            </div>
          ) : user ? (
            <div className="flex items-center gap-3">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="text-slate-700">
                  <User className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={() => signOut()}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/auth">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth">
                <Button variant="primary" size="sm">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-slate-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50 bg-slate-900/20" />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-slate-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-sm font-bold text-white">
                    M
                  </div>
                  <div>
                    <div className="text-base font-bold text-slate-900">Modern Skill Lab</div>
                    <div className="text-xs text-slate-500">Practical skills for modern work</div>
                  </div>
                </div>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-slate-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-8 flow-root">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-base font-semibold text-slate-900 hover:bg-slate-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon className="h-5 w-5 text-slate-600" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
              <div className="space-y-3 border-t border-slate-200 py-6">
                {loading ? (
                  <div className="space-y-3">
                    <div className="h-10 w-full animate-pulse rounded-xl bg-slate-200" />
                    <div className="h-10 w-full animate-pulse rounded-xl bg-slate-200" />
                  </div>
                ) : user ? (
                  <div className="space-y-3">
                    <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="ghost" size="sm" className="w-full justify-center">
                        <User className="mr-2 h-4 w-4" />
                        Dashboard
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-center"
                      onClick={() => {
                        signOut();
                        setMobileMenuOpen(false);
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link href="/auth" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" size="sm" className="w-full justify-center">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/auth" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="primary" size="sm" className="w-full justify-center">
                        <Sparkles className="mr-2 h-4 w-4" />
                        Get Started
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}