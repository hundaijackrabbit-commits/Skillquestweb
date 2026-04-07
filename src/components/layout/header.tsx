'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useSupabase } from '@/components/providers/supabase-provider';
import { Search, Menu, X, BookOpen, Users, Briefcase, Building2, PenTool, User, LogOut } from 'lucide-react';

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
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">SkillQuest</span>
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-sm">
                SQ
              </div>
              <span className="text-xl font-bold text-gray-900">SkillQuest</span>
            </div>
          </Link>
        </div>
        
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center space-x-1 text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors"
            >
              <item.icon className="h-4 w-4" />
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
        
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:space-x-4">
          <Button variant="ghost" size="sm">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
          
          {loading ? (
            <div className="flex space-x-2">
              <div className="w-16 h-8 bg-gray-200 rounded animate-pulse" />
              <div className="w-20 h-8 bg-gray-200 rounded animate-pulse" />
            </div>
          ) : user ? (
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => signOut()}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex space-x-2">
              <Link href="/auth">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth">
                <Button variant="primary" size="sm">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <div className="flex items-center space-x-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-sm">
                    SQ
                  </div>
                  <span className="text-xl font-bold text-gray-900">SkillQuest</span>
                </div>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center space-x-3 rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <item.icon className="h-5 w-5 text-gray-600" />
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </div>
                <div className="py-6 space-y-3">
                  <Button variant="outline" size="sm" className="w-full">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                  
                  {loading ? (
                    <div className="space-y-3">
                      <div className="w-full h-8 bg-gray-200 rounded animate-pulse" />
                      <div className="w-full h-8 bg-gray-200 rounded animate-pulse" />
                    </div>
                  ) : user ? (
                    <div className="space-y-3">
                      <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="ghost" size="sm" className="w-full">
                          <User className="h-4 w-4 mr-2" />
                          Dashboard
                        </Button>
                      </Link>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => {
                          signOut();
                          setMobileMenuOpen(false);
                        }}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Link href="/auth" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="outline" size="sm" className="w-full">
                          Sign In
                        </Button>
                      </Link>
                      <Link href="/auth" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="primary" size="sm" className="w-full">
                          Get Started
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}