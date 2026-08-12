'use client';

import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import { AuthForm } from '@/components/auth/auth-form';

export default function AdminLoginPage() {
  return (
    <div className="min-h-[75vh] bg-gradient-to-b from-slate-50 to-white py-16">
      <div className="mx-auto max-w-md px-6">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Admin sign in</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Use your Modern Skill Lab account. Admin access is checked again on the server after sign-in.
          </p>
        </div>
        <AuthForm mode="signin" redirectTo="/admin" hideModeToggle />
        <p className="mt-6 text-center text-sm text-slate-500">
          Not an administrator? <Link href="/auth" className="font-medium text-blue-600">Use member sign in</Link>.
        </p>
      </div>
    </div>
  );
}
