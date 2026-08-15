'use client'

import React, { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react'

interface AuthFormProps {
  mode: 'signin' | 'signup'
  onSuccess?: () => void
  onModeChange?: (mode: 'signin' | 'signup') => void
  redirectTo?: string
  hideModeToggle?: boolean
}

export function AuthForm({ mode, onSuccess, onModeChange, redirectTo = '/dashboard', hideModeToggle = false }: AuthFormProps) {
  const supabase = createClient()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    try {
      if (mode === 'signup') {
        if (formData.password !== formData.confirmPassword) {
          setMessage({ type: 'error', text: 'Passwords do not match' })
          setIsLoading(false)
          return
        }

        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              name: formData.name,
            },
          },
        })

        if (error) {
          setMessage({ type: 'error', text: error.message })
        } else if (data.session) {
          setMessage({ type: 'success', text: 'Account created. Opening your practice area…' })
          setTimeout(() => {
            if (onSuccess) onSuccess()
            else window.location.href = redirectTo
          }, 300)
        } else {
          setMessage({
            type: 'success',
            text: 'Account created! Check your email.',
          })
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        })

        if (error) {
          setMessage({ type: 'error', text: error.message })
        } else {
          setMessage({ type: 'success', text: 'Signed in successfully!' })

          // 🔥 CRITICAL: give cookies time to sync
          setTimeout(() => {
            if (onSuccess) onSuccess()
            else window.location.href = redirectTo
          }, 300)
        }
      }
    } catch {
      setMessage({ type: 'error', text: 'Unexpected error occurred' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          {mode === 'signup' ? 'Create Account' : 'Welcome Back'}
        </CardTitle>
        <CardDescription className="text-center">
          {mode === 'signup'
            ? 'Start your personalized skills journey'
            : 'Continue your professional development'}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {message && (
          <div role={message.type === 'error' ? 'alert' : 'status'} className={`mb-4 p-3 rounded-lg flex items-center space-x-2 ${
            message.type === 'success'
              ? 'bg-green-50 text-green-700'
              : 'bg-red-50 text-red-700'
          }`}>
            {message.type === 'success'
              ? <CheckCircle2 className="h-4 w-4" />
              : <AlertCircle className="h-4 w-4" />}
            <span className="text-sm">{message.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <label className="block text-sm font-medium text-slate-700">
              Full name
              <input
                name="name"
                autoComplete="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 w-full rounded border p-2"
              />
            </label>
          )}

          <label className="block text-sm font-medium text-slate-700">
            Email
            <input
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 w-full rounded border p-2"
            />
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Password
            <span className="relative mt-1 block">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                minLength={mode === 'signup' ? 8 : undefined}
                required
                value={formData.password}
                onChange={handleInputChange}
                className="w-full rounded border p-2 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                aria-pressed={showPassword}
              >
                {showPassword ? <EyeOff size={16}/> : <Eye size={16}/>}
              </button>
            </span>
            {mode === 'signup' && <span className="mt-1 block text-xs font-normal text-slate-500">Use at least 8 characters.</span>}
          </label>

          {mode === 'signup' && (
            <label className="block text-sm font-medium text-slate-700">
              Confirm password
              <input
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                minLength={8}
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="mt-1 w-full rounded border p-2"
              />
            </label>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Loading...' : mode === 'signup' ? 'Create Account' : 'Sign In'}
          </Button>
        </form>

        {!hideModeToggle && (
        <div className="mt-4 text-center">
          <button
            onClick={() => onModeChange?.(mode === 'signup' ? 'signin' : 'signup')}
            className="text-blue-600 text-sm"
          >
            {mode === 'signup' ? 'Already have an account? Sign in' : 'No account? Sign up'}
          </button>
        </div>
        )}
      </CardContent>
    </Card>
  )
}
