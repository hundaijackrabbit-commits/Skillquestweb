'use client'

import React, { useState } from 'react'
import { AuthForm } from '@/components/auth/auth-form'
import { Users, Target, TrendingUp, Star } from 'lucide-react'

export default function AuthPage() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')

  const handleAuthSuccess = () => {
    // Redirect to dashboard
    window.location.href = '/dashboard'
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/30 to-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 min-h-screen items-center py-12">
          {/* Left Column - Auth Form */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md">
              <AuthForm 
                mode={mode}
                onSuccess={handleAuthSuccess}
                onModeChange={setMode}
              />
            </div>
          </div>

          {/* Right Column - Benefits */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Unlock Your Professional Potential
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Join thousands of professionals building strategic careers with 
                personalized skill development and evidence-backed guidance.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Personalized Learning Paths</h3>
                  <p className="text-gray-600">
                    Get custom skill recommendations based on your career goals 
                    and current expertise level.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Career Intelligence</h3>
                  <p className="text-gray-600">
                    Access detailed career pathways, skill requirements, and 
                    market insights for strategic planning.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Star className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Track Your Progress</h3>
                  <p className="text-gray-600">
                    Save skills, monitor learning progress, and build your 
                    professional development portfolio.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <Users className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Professional Community</h3>
                  <p className="text-gray-600">
                    Connect with like-minded professionals and access exclusive 
                    insights from industry experts.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                Join 50,000+ professionals who trust SkillQuest
              </h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">1,000+</div>
                  <div className="text-sm text-gray-600">Professional Skills</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">500+</div>
                  <div className="text-sm text-gray-600">Career Paths</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">100%</div>
                  <div className="text-sm text-gray-600">Evidence-Based</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}