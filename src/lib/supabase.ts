import { createClient, type PostgrestError } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface UserProfile {
  id: string
  email: string
  name?: string
  created_at: string
  updated_at: string
  career_interests?: string[]
  selected_industries?: string[]
  saved_skills?: string[]
  saved_careers?: string[]
  followed_categories?: string[]
  preferences?: {
    email_notifications?: boolean
    weekly_suggestions?: boolean
    theme?: 'light' | 'dark' | 'auto'
    profile_assessment?: {
      version: 1
      goal: 'explore' | 'get-hired' | 'switch' | 'grow' | 'lead' | 'build-business'
      workStyles: Array<'collaborative' | 'independent' | 'structured' | 'fast-moving' | 'remote-flexible' | 'hands-on'>
      strengths: Array<'communicator' | 'analyst' | 'organizer' | 'creator' | 'technologist' | 'leader'>
      completedAt: string
    }
  }
}

export interface SkillProgress {
  id: string
  user_id: string
  skill_id: string
  status: 'saved' | 'learning' | 'in-progress' | 'completed'
  progress_percentage?: number
  started_at?: string
  completed_at?: string
  notes?: string
}

export interface SkillPath {
  id: string
  name: string
  description: string
  category: string
  skills: string[] // Array of skill IDs in order
  related_careers: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimated_time: string
  created_at: string
  featured?: boolean
}

export interface UserActivity {
  id: string
  user_id: string
  activity_type: 'skill_viewed' | 'career_viewed' | 'skill_saved' | 'career_saved' | 'path_started'
  item_id: string
  item_type: 'skill' | 'career' | 'path'
  created_at: string
}

// Auth helpers
export const auth = {
  async signUp(email: string, password: string, metadata?: { name?: string }) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    })
    return { data, error }
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession()
    return { session, error }
  },

  async getUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  }
}

// Profile helpers
export const profiles = {
  async getProfile(userId: string): Promise<{ data: UserProfile | null, error: PostgrestError | null }> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    
    return { data, error }
  },

  async updateProfile(userId: string, updates: Partial<UserProfile>) {
    const { data, error } = await supabase
      .from('profiles')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', userId)
      .select()
      .single()
    
    return { data, error }
  },

  async saveSkill(userId: string, skillId: string) {
    const { data: profile } = await this.getProfile(userId)
    if (!profile) return { error: 'Profile not found' }

    const savedSkills = [...(profile.saved_skills || []), skillId]
    const uniqueSkills = [...new Set(savedSkills)]

    return await this.updateProfile(userId, { saved_skills: uniqueSkills })
  },

  async unsaveSkill(userId: string, skillId: string) {
    const { data: profile } = await this.getProfile(userId)
    if (!profile) return { error: 'Profile not found' }

    const savedSkills = (profile.saved_skills || []).filter(id => id !== skillId)
    return await this.updateProfile(userId, { saved_skills: savedSkills })
  },

  async saveCareer(userId: string, careerId: string) {
    const { data: profile } = await this.getProfile(userId)
    if (!profile) return { error: 'Profile not found' }

    const savedCareers = [...(profile.saved_careers || []), careerId]
    const uniqueCareers = [...new Set(savedCareers)]

    return await this.updateProfile(userId, { saved_careers: uniqueCareers })
  },

  async unsaveCareer(userId: string, careerId: string) {
    const { data: profile } = await this.getProfile(userId)
    if (!profile) return { error: 'Profile not found' }

    const savedCareers = (profile.saved_careers || []).filter(id => id !== careerId)
    return await this.updateProfile(userId, { saved_careers: savedCareers })
  }
}

// Activity tracking
export const activity = {
  async trackActivity(userId: string, activityType: UserActivity['activity_type'], itemId: string, itemType: UserActivity['item_type']) {
    const { data, error } = await supabase
      .from('user_activities')
      .insert([{
        user_id: userId,
        activity_type: activityType,
        item_id: itemId,
        item_type: itemType
      }])
      .select()
      .single()
    
    return { data, error }
  },

  async getRecentActivity(userId: string, limit: number = 10) {
    const { data, error } = await supabase
      .from('user_activities')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit)
    
    return { data, error }
  }
}

// Skill progress tracking
export const progress = {
  async setSkillProgress(userId: string, skillId: string, status: SkillProgress['status'], progressPercentage?: number) {
    const { data, error } = await supabase
      .from('skill_progress')
      .upsert([{
        user_id: userId,
        skill_id: skillId,
        status,
        progress_percentage: progressPercentage,
        started_at: status !== 'saved' ? new Date().toISOString() : undefined,
        completed_at: status === 'completed' ? new Date().toISOString() : undefined
      }])
      .select()
      .single()
    
    return { data, error }
  },

  async getSkillProgress(userId: string, skillId?: string) {
    let query = supabase
      .from('skill_progress')
      .select('*')
      .eq('user_id', userId)

    if (skillId) {
      query = query.eq('skill_id', skillId)
    }

    const { data, error } = await query
    return { data, error }
  }
}
