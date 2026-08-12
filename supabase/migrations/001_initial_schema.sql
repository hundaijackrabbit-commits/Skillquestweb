-- Modern Skill Lab Database Schema
-- Migration 001: safe initial account/profile foundation
-- Run before 003_growth_admin.sql on a new Supabase project.
-- Idempotent and intentionally omits the obsolete app.jwt_secret database setting.

BEGIN;

-- Core profile table, extending Supabase auth.users
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

CREATE TABLE IF NOT EXISTS public.user_activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    activity_type TEXT CHECK (activity_type IN ('skill_viewed', 'career_viewed', 'skill_saved', 'career_saved', 'path_started')) NOT NULL,
    item_id TEXT NOT NULL,
    item_type TEXT CHECK (item_type IN ('skill', 'career', 'path')) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

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

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS set_profiles_updated_at ON public.profiles;
CREATE TRIGGER set_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_skill_progress_updated_at ON public.skill_progress;
CREATE TRIGGER set_skill_progress_updated_at
    BEFORE UPDATE ON public.skill_progress
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_skill_paths_updated_at ON public.skill_paths;
CREATE TRIGGER set_skill_paths_updated_at
    BEFORE UPDATE ON public.skill_paths
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_user_paths_updated_at ON public.user_paths;
CREATE TRIGGER set_user_paths_updated_at
    BEFORE UPDATE ON public.user_paths
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_paths ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT TO authenticated USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can view own skill progress" ON public.skill_progress;
CREATE POLICY "Users can view own skill progress" ON public.skill_progress
    FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage own skill progress" ON public.skill_progress;
CREATE POLICY "Users can manage own skill progress" ON public.skill_progress
    FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view own activities" ON public.user_activities;
CREATE POLICY "Users can view own activities" ON public.user_activities
    FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own activities" ON public.user_activities;
CREATE POLICY "Users can insert own activities" ON public.user_activities
    FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Anyone can view skill paths" ON public.skill_paths;
CREATE POLICY "Anyone can view skill paths" ON public.skill_paths
    FOR SELECT TO authenticated, anon USING (true);

DROP POLICY IF EXISTS "Users can manage own paths" ON public.user_paths;
CREATE POLICY "Users can manage own paths" ON public.user_paths
    FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- New account -> profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    IF NEW.email IS NOT NULL THEN
        INSERT INTO public.profiles (id, email, name)
        VALUES (
            NEW.id,
            NEW.email,
            COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1))
        )
        ON CONFLICT (id) DO NOTHING;
    END IF;
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- IMPORTANT: recover profiles for users who signed up before this migration existed.
INSERT INTO public.profiles (id, email, name, created_at, updated_at)
SELECT
    u.id,
    u.email,
    COALESCE(u.raw_user_meta_data->>'name', split_part(u.email, '@', 1)),
    COALESCE(u.created_at, NOW()),
    NOW()
FROM auth.users u
WHERE u.email IS NOT NULL
ON CONFLICT (id) DO UPDATE
SET email = EXCLUDED.email,
    name = COALESCE(public.profiles.name, EXCLUDED.name),
    updated_at = NOW();

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

COMMIT;

-- Quick verification:
-- SELECT COUNT(*) AS auth_users FROM auth.users;
-- SELECT COUNT(*) AS profiles FROM public.profiles;
