'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { auth, profiles, activity, UserProfile } from '@/lib/supabase'
import { getAllSkills, getAllCareers } from '@/lib/content'
import { Skill, Career } from '@/lib/types'
import { 
  BookOpen, 
  Star, 
  TrendingUp, 
  Target, 
  Clock,
  Briefcase,
  Users,
  ArrowRight,
  Plus,
  BarChart3,
  Lightbulb,
  Compass,
  Award,
  Zap,
  Eye,
  Calendar
} from 'lucide-react'

interface DashboardStats {
  savedSkills: number
  savedCareers: number
  inProgressSkills: number
  completedSkills: number
}

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [skills, setSkills] = useState<Skill[]>([])
  const [careers, setCareers] = useState<Career[]>([])
  const [savedSkills, setSavedSkills] = useState<Skill[]>([])
  const [savedCareers, setSavedCareers] = useState<Career[]>([])
  const [recentActivity, setRecentActivity] = useState<any[]>([])
  const [recommendations, setRecommendations] = useState<{skills: Skill[], careers: Career[]}>({skills: [], careers: []})
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState<DashboardStats>({
    savedSkills: 0,
    savedCareers: 0,
    inProgressSkills: 0,
    completedSkills: 0
  })

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      // Check authentication
      const { user: currentUser } = await auth.getUser()
      if (!currentUser) {
        // Redirect to sign in
        window.location.href = '/auth'
        return
      }

      setUser(currentUser)

      // Load profile and data
      const [
        profileResult,
        allSkills,
        allCareers,
        activityResult
      ] = await Promise.all([
        profiles.getProfile(currentUser.id),
        getAllSkills(),
        getAllCareers(),
        activity.getRecentActivity(currentUser.id, 10)
      ])

      if (profileResult.data) {
        setProfile(profileResult.data)
        
        // Filter saved items
        const userSavedSkills = allSkills.filter(skill => 
          profileResult.data?.saved_skills?.includes(skill.id)
        )
        const userSavedCareers = allCareers.filter(career => 
          profileResult.data?.saved_careers?.includes(career.id)
        )

        setSavedSkills(userSavedSkills)
        setSavedCareers(userSavedCareers)

        // Generate recommendations
        const recs = generateRecommendations(profileResult.data, allSkills, allCareers)
        setRecommendations(recs)

        // Update stats
        setStats({
          savedSkills: userSavedSkills.length,
          savedCareers: userSavedCareers.length,
          inProgressSkills: 0, // TODO: Implement from skill progress
          completedSkills: 0   // TODO: Implement from skill progress
        })
      }

      setSkills(allSkills)
      setCareers(allCareers)
      
      if (activityResult.data) {
        setRecentActivity(activityResult.data)
      }

    } catch (error) {
      console.error('Error loading dashboard:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const generateRecommendations = (userProfile: UserProfile, allSkills: Skill[], allCareers: Career[]) => {
    // Simple recommendation logic - can be enhanced with AI later
    const savedSkillIds = userProfile.saved_skills || []
    const savedCareerIds = userProfile.saved_careers || []
    
    // Recommend skills based on saved careers
    const recommendedSkillIds = new Set<string>()
    savedCareerIds.forEach(careerId => {
      const career = allCareers.find(c => c.id === careerId)
      if (career) {
        career.coreSkills.forEach(skillId => recommendedSkillIds.add(skillId))
        career.secondarySkills.forEach(skillId => recommendedSkillIds.add(skillId))
      }
    })

    // Filter out already saved skills
    const skillRecommendations = allSkills.filter(skill => 
      recommendedSkillIds.has(skill.id) && !savedSkillIds.includes(skill.id)
    ).slice(0, 6)

    // Recommend careers based on saved skills
    const careerRecommendations = allCareers.filter(career => {
      const matchingSkills = career.coreSkills.filter(skillId => savedSkillIds.includes(skillId))
      return matchingSkills.length > 0 && !savedCareerIds.includes(career.id)
    }).slice(0, 4)

    return {
      skills: skillRecommendations,
      careers: careerRecommendations
    }
  }

  const handleSignOut = async () => {
    await auth.signOut()
    window.location.href = '/'
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50/30 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50/30 to-white flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-gray-600 mb-4">Please sign in to access your dashboard</p>
            <Button asChild>
              <Link href="/auth">Sign In</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/30 to-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {profile?.name || user.email.split('@')[0]}!
              </h1>
              <p className="text-gray-600 mt-1">
                Continue your professional development journey
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                Member since {new Date(user.created_at).getFullYear()}
              </Badge>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Star className="h-5 w-5 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{stats.savedSkills}</p>
                  <p className="text-sm text-gray-600">Saved Skills</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Briefcase className="h-5 w-5 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{stats.savedCareers}</p>
                  <p className="text-sm text-gray-600">Saved Careers</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{stats.inProgressSkills}</p>
                  <p className="text-sm text-gray-600">In Progress</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Award className="h-5 w-5 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{stats.completedSkills}</p>
                  <p className="text-sm text-gray-600">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
                  Recommended for You
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recommendations.skills.length > 0 || recommendations.careers.length > 0 ? (
                  <div className="space-y-6">
                    {/* Skill Recommendations */}
                    {recommendations.skills.length > 0 && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                          <Zap className="h-4 w-4 mr-2 text-blue-500" />
                          Skills to Develop
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {recommendations.skills.map((skill) => (
                            <Link key={skill.id} href={`/skills/${skill.slug}`}>
                              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                                <CardContent className="p-4">
                                  <div className="flex items-center justify-between mb-2">
                                    <h5 className="font-medium text-gray-900 text-sm">{skill.name}</h5>
                                    <Badge variant="secondary" size="sm">
                                      Recommended
                                    </Badge>
                                  </div>
                                  <p className="text-xs text-gray-600 line-clamp-2">
                                    {skill.shortDefinition}
                                  </p>
                                </CardContent>
                              </Card>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Career Recommendations */}
                    {recommendations.careers.length > 0 && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                          <Target className="h-4 w-4 mr-2 text-green-500" />
                          Career Paths to Explore
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {recommendations.careers.map((career) => (
                            <Link key={career.id} href={`/careers/${career.slug}`}>
                              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                                <CardContent className="p-4">
                                  <div className="flex items-center justify-between mb-2">
                                    <h5 className="font-medium text-gray-900 text-sm">{career.title}</h5>
                                    <Badge variant="secondary" size="sm">
                                      Match
                                    </Badge>
                                  </div>
                                  <p className="text-xs text-gray-600 line-clamp-2">
                                    {career.summary}
                                  </p>
                                </CardContent>
                              </Card>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Compass className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">
                      Save some skills and careers to get personalized recommendations
                    </p>
                    <div className="space-x-4">
                      <Button variant="outline" asChild>
                        <Link href="/skills">Browse Skills</Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link href="/careers">Explore Careers</Link>
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Continue Learning */}
            {savedSkills.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <BookOpen className="h-5 w-5 mr-2 text-blue-500" />
                      Continue Learning
                    </span>
                    <Link href="/skills" className="text-sm text-blue-600 hover:text-blue-700">
                      View all →
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {savedSkills.slice(0, 4).map((skill) => (
                      <Link key={skill.id} href={`/skills/${skill.slug}`}>
                        <Card className="hover:shadow-md transition-shadow cursor-pointer">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="font-medium text-gray-900 text-sm">{skill.name}</h5>
                              <Star className="h-4 w-4 text-yellow-500" />
                            </div>
                            <p className="text-xs text-gray-600 line-clamp-2">
                              {skill.shortDefinition}
                            </p>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-orange-500" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/skills">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Browse Skills
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/careers">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Explore Careers
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/paths">
                    <Target className="h-4 w-4 mr-2" />
                    Skill Paths
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Saved Careers */}
            {savedCareers.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Briefcase className="h-5 w-5 mr-2 text-green-500" />
                      Saved Careers
                    </span>
                    <span className="text-sm text-gray-500">{savedCareers.length}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {savedCareers.slice(0, 3).map((career) => (
                      <Link key={career.id} href={`/careers/${career.slug}`}>
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                          <div className="flex-1">
                            <h5 className="font-medium text-gray-900 text-sm">{career.title}</h5>
                            <p className="text-xs text-gray-600 mt-1">
                              {career.coreSkills.length} core skills required
                            </p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </Link>
                    ))}
                    {savedCareers.length > 3 && (
                      <Link href="/careers" className="block text-center text-sm text-blue-600 hover:text-blue-700 py-2">
                        View {savedCareers.length - 3} more careers →
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="h-5 w-5 mr-2 text-purple-500" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recentActivity.length > 0 ? (
                  <div className="space-y-3">
                    {recentActivity.slice(0, 5).map((activity, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        <span className="text-gray-600">
                          {activity.activity_type.replace('_', ' ')} {activity.item_type}
                        </span>
                        <span className="ml-auto text-xs text-gray-500">
                          {new Date(activity.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 text-center py-4">
                    Start exploring skills and careers to see your activity here
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}