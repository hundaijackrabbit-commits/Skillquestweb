'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Heart, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useSupabase } from '@/components/providers/supabase-provider';

type Props = {
  careerSlug: string;
  className?: string;
};

export function SaveCareerButton({ careerSlug, className = '' }: Props) {
  const supabase = useMemo(() => createClient(), []);
  const { user, loading: authLoading } = useSupabase();
  const router = useRouter();
  const pathname = usePathname();
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let mounted = true;

    async function loadSavedState() {
      if (authLoading) return;
      if (!user) {
        if (mounted) setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('saved_careers')
        .eq('id', user.id)
        .maybeSingle();

      if (!mounted) return;
      if (error) console.error('Error checking saved career:', error.message);
      setIsSaved(Array.isArray(data?.saved_careers) && data.saved_careers.includes(careerSlug));
      setIsLoading(false);
    }

    loadSavedState();
    return () => {
      mounted = false;
    };
  }, [authLoading, careerSlug, supabase, user]);

  function handleToggle() {
    if (!user) {
      const returnTo = pathname || `/careers/${careerSlug}`;
      router.push(`/auth?mode=signup&redirect=${encodeURIComponent(returnTo)}`);
      return;
    }

    startTransition(async () => {
      const { data, error: loadError } = await supabase
        .from('profiles')
        .select('saved_careers')
        .eq('id', user.id)
        .single();

      if (loadError) {
        console.error('Error loading career favourites:', loadError.message);
        return;
      }

      const current = Array.isArray(data.saved_careers) ? data.saved_careers : [];
      const next = isSaved
        ? current.filter((slug: string) => slug !== careerSlug)
        : [...new Set([...current, careerSlug])];
      const { error: saveError } = await supabase
        .from('profiles')
        .update({ saved_careers: next, updated_at: new Date().toISOString() })
        .eq('id', user.id);

      if (saveError) {
        console.error('Error saving career:', saveError.message);
        return;
      }

      setIsSaved(!isSaved);
      router.refresh();
    });
  }

  const busy = authLoading || isLoading || isPending;

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={busy}
      aria-pressed={isSaved}
      className={`inline-flex min-h-11 items-center justify-center rounded-xl border px-4 py-2 text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${
        isSaved
          ? 'border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100'
          : 'border-slate-300 bg-white text-slate-800 hover:border-blue-300 hover:bg-blue-50'
      } ${className}`}
    >
      {busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Heart className={`mr-2 h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />}
      {busy ? 'Checking…' : isSaved ? 'Saved to favourites' : user ? 'Save career' : 'Sign up to save'}
    </button>
  );
}
