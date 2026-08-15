'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createPortal } from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useSupabase } from '@/components/providers/supabase-provider';
import { Search, Menu, X, BookOpen, Briefcase, PenTool, User, LogOut, Sparkles, Route, Trophy, Layers3 } from 'lucide-react';

const navigation = [
  { name: 'Skills', href: '/skills', icon: BookOpen },
  { name: 'Topics', href: '/topics', icon: Layers3 },
  { name: 'Practice Lab', href: '/learn', icon: Trophy },
  { name: 'Careers', href: '/careers', icon: Briefcase },
  { name: 'Paths', href: '/paths', icon: Route },
  { name: 'Blog', href: '/blog', icon: PenTool },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const mobileDialogRef = useRef<HTMLDivElement>(null);
  const { user, loading, signOut } = useSupabase();

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
        requestAnimationFrame(() => menuButtonRef.current?.focus());
        return;
      }

      if (event.key !== 'Tab') return;

      const focusableElements = mobileDialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );

      if (!focusableElements?.length) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    const desktopBreakpoint = window.matchMedia('(min-width: 1024px)');
    const handleDesktopBreakpoint = (event: MediaQueryListEvent) => {
      if (event.matches) setMobileMenuOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    desktopBreakpoint.addEventListener('change', handleDesktopBreakpoint);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      desktopBreakpoint.removeEventListener('change', handleDesktopBreakpoint);
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = (restoreFocus = false) => {
    setMobileMenuOpen(false);
    if (restoreFocus) requestAnimationFrame(() => menuButtonRef.current?.focus());
  };

  const mobileMenu =
    mobileMenuOpen && typeof document !== 'undefined'
      ? createPortal(
          <div className="lg:hidden">
            <button
              type="button"
              aria-label="Close main menu"
              tabIndex={-1}
              className="fixed inset-0 z-[60] cursor-default bg-slate-950/35 backdrop-blur-[2px]"
              onClick={() => closeMobileMenu(true)}
            />
            <div
              id="mobile-navigation-dialog"
              ref={mobileDialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="mobile-navigation-title"
              className="fixed inset-y-0 right-0 z-[70] flex h-dvh w-full max-w-sm flex-col overflow-y-auto overscroll-contain bg-white px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-[max(1.25rem,env(safe-area-inset-top))] shadow-2xl sm:px-6"
            >
              <div className="flex min-w-0 items-center justify-between gap-3">
                <Link href="/" className="min-w-0 rounded-xl p-1.5" onClick={() => closeMobileMenu()}>
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-sm font-bold text-white">
                      M
                    </div>
                    <div className="min-w-0">
                      <div id="mobile-navigation-title" className="text-base font-bold leading-tight text-slate-900">
                        Modern Skill Lab
                      </div>
                      <div className="mt-0.5 text-xs leading-snug text-slate-500">Practical skills for modern work</div>
                    </div>
                  </div>
                </Link>
                <button
                  ref={closeButtonRef}
                  type="button"
                  className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-xl text-slate-700 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                  onClick={() => closeMobileMenu(true)}
                >
                  <span className="sr-only">Close menu</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <nav className="mt-6 flex-1 border-t border-slate-200 pt-5" aria-label="Mobile navigation">
                <div className="space-y-1.5">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        aria-current={isActive ? 'page' : undefined}
                        className={`flex min-h-12 items-center gap-3 rounded-xl px-3 py-3 text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 ${
                          isActive ? 'bg-blue-50 text-blue-800' : 'text-slate-900 hover:bg-slate-50'
                        }`}
                        onClick={() => closeMobileMenu()}
                      >
                        <item.icon className={`h-5 w-5 shrink-0 ${isActive ? 'text-blue-700' : 'text-slate-600'}`} />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </nav>

              <div className="mt-6 space-y-3 border-t border-slate-200 pt-5">
                {loading ? (
                  <div className="space-y-3" aria-label="Loading account options">
                    <div className="h-11 w-full animate-pulse rounded-xl bg-slate-200" />
                    <div className="h-11 w-full animate-pulse rounded-xl bg-slate-200" />
                  </div>
                ) : user ? (
                  <div className="space-y-3">
                    <Link href="/dashboard" className="block w-full" onClick={() => closeMobileMenu()}>
                      <Button asChild variant="ghost" size="sm" className="min-h-11 w-full justify-center">
                        <User className="mr-2 h-4 w-4" />
                        My Profile
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      className="min-h-11 w-full justify-center"
                      onClick={() => {
                        void signOut();
                        closeMobileMenu(true);
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link
                      href="/auth?mode=signin&redirect=%2Fdashboard"
                      className="block w-full"
                      onClick={() => closeMobileMenu()}
                    >
                      <Button asChild variant="outline" size="sm" className="min-h-11 w-full justify-center">
                        Sign In
                      </Button>
                    </Link>
                    <Link
                      href="/auth?mode=signup&redirect=%2Fdashboard"
                      className="block w-full"
                      onClick={() => closeMobileMenu()}
                    >
                      <Button asChild variant="primary" size="sm" className="min-h-11 w-full justify-center">
                        <Sparkles className="mr-2 h-4 w-4" />
                        Get Started
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
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
          <Link href="/skills" className="hidden xl:block">
            <Button asChild variant="ghost" size="sm" className="text-slate-700">
              <Search className="mr-2 h-4 w-4" />
              Find a skill
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
                <Button asChild variant="ghost" size="sm" className="text-slate-700">
                  <User className="mr-2 h-4 w-4" />
                  My Profile
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={() => void signOut()}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/auth?mode=signin&redirect=%2Fdashboard">
                <Button asChild variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth?mode=signup&redirect=%2Fdashboard">
                <Button asChild variant="primary" size="sm">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>

        <div className="flex lg:hidden">
          <button
            ref={menuButtonRef}
            type="button"
            aria-controls="mobile-navigation-dialog"
            aria-expanded={mobileMenuOpen}
            aria-haspopup="dialog"
            className="-m-2 inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl p-2 text-slate-700 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        </nav>
      </header>
      {mobileMenu}
    </>
  );
}
