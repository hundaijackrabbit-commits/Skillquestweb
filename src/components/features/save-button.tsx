'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { auth, profiles, activity } from '@/lib/supabase'
import { Heart, Bookmark, Plus, Check } from 'lucide-react'

interface SaveButtonProps {
  itemId: string
  itemType: 'skill' | 'career'
  itemTitle: string
  variant?: 'button' | 'badge'
  size?: 'sm' | 'default' | 'lg'
  showLabel?: boolean
  onSaveChange?: (isSaved: boolean) => void
}

export function SaveButton({ 
  itemId, 
  itemType, 
  itemTitle, 
  variant = 'button',
  size = 'default',
  showLabel = true,
  onSaveChange 
}: SaveButtonProps) {
  const [isSaved, setIsSaved] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [showAuthPrompt, setShowAuthPrompt] = useState(false)

  useEffect(() => {
    checkAuthAndSavedStatus()
  }, [itemId, itemType])

  const checkAuthAndSavedStatus = async () => {
    try {
      const { user: currentUser } = await auth.getUser()
      if (!currentUser) {
        setUser(null)
        return
      }

      setUser(currentUser)

      const { data: profile } = await profiles.getProfile(currentUser.id)
      if (profile) {
        const savedItems = itemType === 'skill' ? profile.saved_skills : profile.saved_careers
        setIsSaved(savedItems?.includes(itemId) || false)
      }
    } catch (error) {
      console.error('Error checking saved status:', error)
    }
  }

  const handleSave = async () => {
    if (!user) {
      setShowAuthPrompt(true)
      setTimeout(() => setShowAuthPrompt(false), 3000)
      return
    }

    setIsLoading(true)

    try {
      if (isSaved) {
        // Unsave
        if (itemType === 'skill') {
          await profiles.unsaveSkill(user.id, itemId)
        } else {
          await profiles.unsaveCareer(user.id, itemId)
        }
        setIsSaved(false)
        onSaveChange?.(false)
      } else {
        // Save
        if (itemType === 'skill') {
          await profiles.saveSkill(user.id, itemId)
        } else {
          await profiles.saveCareer(user.id, itemId)
        }
        setIsSaved(true)
        onSaveChange?.(true)

        // Track activity
        await activity.trackActivity(
          user.id,
          itemType === 'skill' ? 'skill_saved' : 'career_saved',
          itemId,
          itemType
        )
      }
    } catch (error) {
      console.error('Error saving item:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (variant === 'badge') {
    if (!user) return null
    
    return (
      <Badge
        variant={isSaved ? 'default' : 'outline'}
        className={`cursor-pointer transition-colors ${
          isSaved 
            ? 'bg-blue-600 text-white hover:bg-blue-700' 
            : 'hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200'
        }`}
        onClick={handleSave}
      >
        {isLoading ? (
          <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin mr-1" />
        ) : isSaved ? (
          <Check className="h-3 w-3 mr-1" />
        ) : (
          <Plus className="h-3 w-3 mr-1" />
        )}
        {isSaved ? 'Saved' : 'Save'}
      </Badge>
    )
  }

  return (
    <div className="relative">
      <Button
        variant={isSaved ? 'default' : 'outline'}
        size={size}
        onClick={handleSave}
        disabled={isLoading}
        className={`transition-all ${
          isSaved 
            ? 'bg-blue-600 text-white hover:bg-blue-700' 
            : 'hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200'
        }`}
      >
        {isLoading ? (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
        ) : isSaved ? (
          <Heart className={`h-4 w-4 ${showLabel ? 'mr-2' : ''} fill-current`} />
        ) : (
          <Bookmark className={`h-4 w-4 ${showLabel ? 'mr-2' : ''}`} />
        )}
        {showLabel && (
          <span>
            {isLoading ? 'Saving...' : isSaved ? 'Saved' : `Save ${itemType}`}
          </span>
        )}
      </Button>

      {/* Auth prompt */}
      {showAuthPrompt && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-gray-900 text-white text-sm p-3 rounded-lg shadow-lg z-10">
          <p className="mb-2">Sign in to save {itemType}s and track your progress</p>
          <Button 
            size="sm" 
            variant="outline" 
            className="bg-white text-gray-900 hover:bg-gray-100"
            onClick={() => window.location.href = '/auth'}
          >
            Sign In
          </Button>
        </div>
      )}
    </div>
  )
}

// Progress tracking component
interface ProgressButtonProps {
  skillId: string
  skillTitle: string
  currentStatus?: 'saved' | 'learning' | 'in-progress' | 'completed'
  onStatusChange?: (status: string) => void
}

export function ProgressButton({ skillId, skillTitle, currentStatus = 'saved', onStatusChange }: ProgressButtonProps) {
  const [status, setStatus] = useState(currentStatus)
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const { user: currentUser } = await auth.getUser()
    setUser(currentUser)
  }

  const handleStatusChange = async (newStatus: string) => {
    if (!user) {
      window.location.href = '/auth'
      return
    }

    setIsLoading(true)

    try {
      // TODO: Implement skill progress tracking in Supabase
      setStatus(newStatus as any)
      onStatusChange?.(newStatus)

      // Track activity
      await activity.trackActivity(user.id, 'skill_viewed', skillId, 'skill')
    } catch (error) {
      console.error('Error updating progress:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) return null

  const statusConfig = {
    saved: { label: 'Start Learning', color: 'bg-gray-100 text-gray-700' },
    learning: { label: 'Learning', color: 'bg-blue-100 text-blue-700' },
    'in-progress': { label: 'In Progress', color: 'bg-yellow-100 text-yellow-700' },
    completed: { label: 'Completed', color: 'bg-green-100 text-green-700' }
  }

  const currentConfig = statusConfig[status]

  return (
    <div className="relative">
      <select
        value={status}
        onChange={(e) => handleStatusChange(e.target.value)}
        disabled={isLoading}
        className={`px-3 py-1 rounded-full text-sm font-medium border-0 cursor-pointer ${currentConfig.color}`}
      >
        <option value="saved">Not Started</option>
        <option value="learning">Learning</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  )
}