-- Modern Skill Lab community learning identity
-- Migration 006: expose a small public-safe learning identity for community posts.
-- No email, private preferences, notes, or raw activity history are exposed.

BEGIN;

CREATE OR REPLACE FUNCTION public.get_community_member_cards(p_user_ids UUID[])
RETURNS TABLE (
  user_id UUID,
  name TEXT,
  identified_skills TEXT[],
  completed_skill_count BIGINT,
  knowledge_check_count BIGINT,
  practice_activity_count BIGINT
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    p.id AS user_id,
    COALESCE(NULLIF(trim(p.name), ''), 'Community member') AS name,
    COALESCE(
      (
        SELECT array_agg(s.skill_slug ORDER BY s.created_at DESC)
        FROM (
          SELECT ss.skill_slug, ss.created_at
          FROM public.saved_skills ss
          WHERE ss.user_id = p.id
          ORDER BY ss.created_at DESC
          LIMIT 6
        ) s
      ),
      '{}'::TEXT[]
    ) AS identified_skills,
    COALESCE((
      SELECT COUNT(*)
      FROM public.skill_progress sp
      WHERE sp.user_id = p.id AND sp.status = 'completed'
    ), 0)::BIGINT AS completed_skill_count,
    COALESCE((
      SELECT COUNT(DISTINCT ce.item_slug)
      FROM public.content_events ce
      WHERE ce.user_id = p.id
        AND ce.event_type = 'cta_click'
        AND ce.item_slug LIKE '%:knowledge-check'
    ), 0)::BIGINT AS knowledge_check_count,
    COALESCE((
      SELECT COUNT(DISTINCT ce.item_slug)
      FROM public.content_events ce
      WHERE ce.user_id = p.id
        AND ce.event_type = 'cta_click'
        AND (
          ce.item_slug LIKE '%:sequence-practice'
          OR ce.item_slug LIKE '%:sort-practice'
        )
    ), 0)::BIGINT AS practice_activity_count
  FROM public.profiles p
  WHERE p.id = ANY(COALESCE(p_user_ids, '{}'::UUID[]));
$$;

REVOKE ALL ON FUNCTION public.get_community_member_cards(UUID[]) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_community_member_cards(UUID[]) TO anon, authenticated;

COMMENT ON FUNCTION public.get_community_member_cards(UUID[]) IS
'Public-safe community learning identity: display name, a small set of saved/identified skills, and aggregate learning participation counts only.';

COMMIT;
