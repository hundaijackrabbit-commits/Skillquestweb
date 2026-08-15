'use client'

import React, { useState } from 'react'
import { AuthForm } from '@/components/auth/auth-form'
import { Users, Target, TrendingUp, Star } from 'lucide-react'

type Props = {
  initialMode: 'signin' | 'signup'
  redirectTo: string
}

export default function AuthPageClient({ initialMode, redirectTo }: Props) {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode)

  const handleAuthSuccess = () => {
    window.location.href = redirectTo
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/30 to-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid min-h-screen grid-cols-1 items-center gap-12 py-12 lg:grid-cols-2">
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md">
              <AuthForm
                mode={mode}
                onSuccess={handleAuthSuccess}
                onModeChange={setMode}
                redirectTo={redirectTo}
              />
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h1 className="mb-4 text-4xl font-bold text-gray-900">
                Unlock Your Professional Potential
              </h1>
              <p className="text-xl leading-relaxed text-gray-600">
                    Build a personal learning hub with saved skills, interactive practice, private XP, and a clear place to return as your goals change.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="rounded-lg bg-blue-100 p-3">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-gray-900">Save What Matters</h3>
                  <p className="text-gray-600">
                    Save useful skills to your dashboard instead of losing the guides you want to revisit.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="rounded-lg bg-green-100 p-3">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-gray-900">Career Intelligence</h3>
                  <p className="text-gray-600">
                    Access detailed career pathways, skill requirements, and
                    market insights for strategic planning.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="rounded-lg bg-purple-100 p-3">
                  <Star className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-gray-900">Build Your Skill Library</h3>
                  <p className="text-gray-600">
                    Collect useful skills in one place and keep building a personal reference library over time.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="rounded-lg bg-yellow-100 p-3">
                  <Users className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-gray-900">Come Back With Context</h3>
                  <p className="text-gray-600">
                    Keep your saved skills and learning activity in one place so you can return to what matters.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-gray-50 p-6">
              <h3 className="mb-3 font-semibold text-gray-900">
                Build a skill stack you can come back to
              </h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">1,300+</div>
                  <div className="text-sm text-gray-600">Professional Skills</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">100</div>
                  <div className="text-sm text-gray-600">Learning Paths</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">Free</div>
                  <div className="text-sm text-gray-600">Member Account</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
