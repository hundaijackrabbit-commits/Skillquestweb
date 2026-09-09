-- Modern Skill Lab community discussions
-- Migration 005: member discussions, replies, reactions, follows and starter conversations

BEGIN;

CREATE TABLE IF NOT EXISTS public.community_discussions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  title TEXT NOT NULL CHECK (char_length(title) BETWEEN 4 AND 180),
  body TEXT NOT NULL CHECK (char_length(body) BETWEEN 4 AND 10000),
  category TEXT NOT NULL DEFAULT 'General',
  skill_slug TEXT,
  discussion_type TEXT NOT NULL DEFAULT 'discussion' CHECK (discussion_type IN ('discussion','question','win','resource','challenge')),
  is_pinned BOOLEAN NOT NULL DEFAULT FALSE,
  is_locked BOOLEAN NOT NULL DEFAULT FALSE,
  is_starter BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.community_replies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  discussion_id UUID NOT NULL REFERENCES public.community_discussions(id) ON DELETE CASCADE,
  author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  parent_reply_id UUID REFERENCES public.community_replies(id) ON DELETE CASCADE,
  body TEXT NOT NULL CHECK (char_length(body) BETWEEN 1 AND 6000),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.community_reactions (
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  discussion_id UUID NOT NULL REFERENCES public.community_discussions(id) ON DELETE CASCADE,
  reaction TEXT NOT NULL DEFAULT 'useful' CHECK (reaction IN ('useful')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, discussion_id, reaction)
);

CREATE TABLE IF NOT EXISTS public.community_follows (
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  discussion_id UUID NOT NULL REFERENCES public.community_discussions(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, discussion_id)
);

DROP TRIGGER IF EXISTS set_community_discussions_updated_at ON public.community_discussions;
CREATE TRIGGER set_community_discussions_updated_at BEFORE UPDATE ON public.community_discussions
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
DROP TRIGGER IF EXISTS set_community_replies_updated_at ON public.community_replies;
CREATE TRIGGER set_community_replies_updated_at BEFORE UPDATE ON public.community_replies
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE INDEX IF NOT EXISTS idx_community_discussions_created ON public.community_discussions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_community_discussions_category ON public.community_discussions(category);
CREATE INDEX IF NOT EXISTS idx_community_discussions_skill ON public.community_discussions(skill_slug);
CREATE INDEX IF NOT EXISTS idx_community_replies_discussion ON public.community_replies(discussion_id, created_at);
CREATE INDEX IF NOT EXISTS idx_community_reactions_discussion ON public.community_reactions(discussion_id);

ALTER TABLE public.community_discussions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_follows ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Community discussions are public" ON public.community_discussions;
CREATE POLICY "Community discussions are public" ON public.community_discussions FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "Members create discussions" ON public.community_discussions;
CREATE POLICY "Members create discussions" ON public.community_discussions FOR INSERT TO authenticated WITH CHECK (auth.uid() = author_id AND NOT is_pinned AND NOT is_starter);
DROP POLICY IF EXISTS "Authors update discussions" ON public.community_discussions;
CREATE POLICY "Authors update discussions" ON public.community_discussions FOR UPDATE TO authenticated USING (auth.uid() = author_id) WITH CHECK (auth.uid() = author_id AND NOT is_pinned AND NOT is_starter);
DROP POLICY IF EXISTS "Authors delete discussions" ON public.community_discussions;
CREATE POLICY "Authors delete discussions" ON public.community_discussions FOR DELETE TO authenticated USING (auth.uid() = author_id AND NOT is_starter);

DROP POLICY IF EXISTS "Community replies are public" ON public.community_replies;
CREATE POLICY "Community replies are public" ON public.community_replies FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "Members create replies" ON public.community_replies;
CREATE POLICY "Members create replies" ON public.community_replies FOR INSERT TO authenticated WITH CHECK (auth.uid() = author_id);
DROP POLICY IF EXISTS "Authors update replies" ON public.community_replies;
CREATE POLICY "Authors update replies" ON public.community_replies FOR UPDATE TO authenticated USING (auth.uid() = author_id) WITH CHECK (auth.uid() = author_id);
DROP POLICY IF EXISTS "Authors delete replies" ON public.community_replies;
CREATE POLICY "Authors delete replies" ON public.community_replies FOR DELETE TO authenticated USING (auth.uid() = author_id);

DROP POLICY IF EXISTS "Community reactions are public" ON public.community_reactions;
CREATE POLICY "Community reactions are public" ON public.community_reactions FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "Members manage own reactions" ON public.community_reactions;
CREATE POLICY "Members manage own reactions" ON public.community_reactions FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Members view own follows" ON public.community_follows;
CREATE POLICY "Members view own follows" ON public.community_follows FOR SELECT TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Members manage own follows" ON public.community_follows;
CREATE POLICY "Members manage own follows" ON public.community_follows FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Seed useful conversations without pretending they were written by real members.
INSERT INTO public.community_discussions (title, body, category, skill_slug, discussion_type, is_pinned, is_starter)
SELECT * FROM (VALUES
 ('Welcome to the Modern Skill Lab community', 'Introduce yourself, tell us one skill you are building, and share what you hope to be able to do with it. Keep feedback useful, specific and kind.', 'Community', NULL, 'discussion', TRUE, TRUE),
 ('What is one thing AI genuinely saves you time on?', 'Skip the hype. Share one real workflow where AI has saved you time, what tool or approach you used, and what still needed human judgment.', 'AI & Automation', 'ai-literacy', 'discussion', FALSE, TRUE),
 ('Prompt engineering: what small change improved your results most?', 'Share a before-and-after lesson from a prompt you improved. Was it better context, examples, constraints, structure, or asking the model to critique its own answer?', 'AI & Automation', 'prompt-engineering', 'question', FALSE, TRUE),
 ('What communication habit has had the biggest payoff at work?', 'Think practical: clearer emails, better meeting questions, active listening, presenting, handling disagreement, or something else. What changed after you practiced it?', 'Communication', 'professional-communication', 'discussion', FALSE, TRUE),
 ('Skill win of the week: what did you finally figure out?', 'Small wins count. Share something you can do this week that you could not do a month ago, and the practice that made the difference.', 'Wins & Progress', NULL, 'win', FALSE, TRUE),
 ('What skill are you learning right now, and why that one?', 'Tell the community what you picked, what outcome you want from it, and where you are getting stuck. Someone here may have a useful next step.', 'Learning & Practice', NULL, 'discussion', FALSE, TRUE),
 ('Critical thinking challenge: how do you check an AI answer before trusting it?', 'Share your personal verification checklist. What makes you stop, investigate, compare sources, or ask a better follow-up question?', 'Critical Thinking', 'critical-thinking', 'challenge', FALSE, TRUE),
 ('Career switchers: which transferable skill surprised you most?', 'If you have moved roles or industries, which skill carried over better than expected? If you are planning a switch, share the skill you think will bridge the gap.', 'Careers', NULL, 'discussion', FALSE, TRUE),
 ('Share a resource that actually helped you learn a skill', 'Post one course, book, exercise, video, tool or practice method that was genuinely useful. Tell us what it helped you learn so this becomes a quality resource thread.', 'Resources', NULL, 'resource', FALSE, TRUE),
 ('Thirty-day skill challenge: what are you committing to?', 'Choose one skill and one tiny repeatable action you can complete for the next 30 days. Post your plan here and return with progress, lessons or adjustments.', 'Challenges', NULL, 'challenge', FALSE, TRUE),
 ('How are you using automation without over-automating your work?', 'Where has automation removed busywork, and where have you deliberately kept a human step? Share the boundary you use.', 'AI & Automation', 'automation', 'discussion', FALSE, TRUE),
 ('What makes someone a great collaborator?', 'Name one behavior that makes you want to work with someone again. Bonus points for a concrete example rather than a generic trait.', 'Collaboration', NULL, 'discussion', FALSE, TRUE)
) AS seed(title, body, category, skill_slug, discussion_type, is_pinned, is_starter)
WHERE NOT EXISTS (SELECT 1 FROM public.community_discussions d WHERE d.title = seed.title);

COMMIT;