-- SkillQuest Web Database Schema
-- Migration 001: Initial schema setup

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    career_interests TEXT[] DEFAULT '{}',
    selected_industries TEXT[] DEFAULT '{}',
    saved_skills TEXT[] DEFAULT '{}',
    saved_careers TEXT[] DEFAULT '{}',
    followed_categories TEXT[] DEFAULT '{}',
    preferences JSONB DEFAULT '{
        "email_notifications": true,
        "weekly_suggestions": true,
        "theme": "auto"
    }'::jsonb
);

-- Create skill_progress table
CREATE TABLE IF NOT EXISTS public.skill_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    skill_id TEXT NOT NULL,
    status TEXT CHECK (status IN ('saved', 'learning', 'in-progress', 'completed')) DEFAULT 'saved',
    progress_percentage INTEGER CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    UNIQUE(user_id, skill_id)
);

-- Create user_activities table
CREATE TABLE IF NOT EXISTS public.user_activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    activity_type TEXT CHECK (activity_type IN ('skill_viewed', 'career_viewed', 'skill_saved', 'career_saved', 'path_started')) NOT NULL,
    item_id TEXT NOT NULL,
    item_type TEXT CHECK (item_type IN ('skill', 'career', 'path')) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create skill_paths table
CREATE TABLE IF NOT EXISTS public.skill_paths (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    skills TEXT[] NOT NULL DEFAULT '{}',
    related_careers TEXT[] DEFAULT '{}',
    difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')) DEFAULT 'beginner',
    estimated_time TEXT,
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create user_paths table (tracks user enrollment in paths)
CREATE TABLE IF NOT EXISTS public.user_paths (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    path_id UUID REFERENCES public.skill_paths(id) ON DELETE CASCADE NOT NULL,
    status TEXT CHECK (status IN ('enrolled', 'in-progress', 'completed', 'paused')) DEFAULT 'enrolled',
    progress_percentage INTEGER CHECK (progress_percentage >= 0 AND progress_percentage <= 100) DEFAULT 0,
    started_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    UNIQUE(user_id, path_id)
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER set_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_skill_progress_updated_at
    BEFORE UPDATE ON public.skill_progress
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_skill_paths_updated_at
    BEFORE UPDATE ON public.skill_paths
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_user_paths_updated_at
    BEFORE UPDATE ON public.user_paths
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_paths ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Skill progress policies
CREATE POLICY "Users can view own skill progress" ON public.skill_progress
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own skill progress" ON public.skill_progress
    FOR ALL USING (auth.uid() = user_id);

-- User activities policies
CREATE POLICY "Users can view own activities" ON public.user_activities
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own activities" ON public.user_activities
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Skill paths policies (public read, admin write)
CREATE POLICY "Anyone can view skill paths" ON public.skill_paths
    FOR SELECT TO authenticated, anon USING (true);

-- User paths policies
CREATE POLICY "Users can manage own paths" ON public.user_paths
    FOR ALL USING (auth.uid() = user_id);

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, name)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1))
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_skill_progress_user_id ON public.skill_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_skill_progress_skill_id ON public.skill_progress(skill_id);
CREATE INDEX IF NOT EXISTS idx_skill_progress_status ON public.skill_progress(status);
CREATE INDEX IF NOT EXISTS idx_user_activities_user_id ON public.user_activities(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activities_created_at ON public.user_activities(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_activities_type ON public.user_activities(activity_type);
CREATE INDEX IF NOT EXISTS idx_skill_paths_category ON public.skill_paths(category);
CREATE INDEX IF NOT EXISTS idx_skill_paths_featured ON public.skill_paths(featured);
CREATE INDEX IF NOT EXISTS idx_user_paths_user_id ON public.user_paths(user_id);
CREATE INDEX IF NOT EXISTS idx_user_paths_path_id ON public.user_paths(path_id);
CREATE INDEX IF NOT EXISTS idx_user_paths_status ON public.user_paths(status);