-- Aggregated global skill activity. Apply this migration before merging the UI.
-- Uses existing first-party skill_view events. Only coarse country codes are kept;
-- no IP addresses or personal profiles are exposed by the public aggregate.
ALTER TABLE public.content_events
  ADD COLUMN IF NOT EXISTS country_code TEXT;

CREATE INDEX IF NOT EXISTS idx_content_events_skill_recent
  ON public.content_events (item_slug, created_at DESC)
  WHERE event_type = 'skill_view' AND session_id IS NOT NULL;

-- Public function intentionally exposes aggregate totals only, never raw sessions.
-- Country pills require at least three distinct browsing sessions per country.
CREATE OR REPLACE FUNCTION public.get_skill_learning_activity(p_slug TEXT)
RETURNS JSONB
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  WITH recent AS (
    SELECT e.session_id, e.country_code
    FROM public.content_events AS e
    WHERE e.event_type = 'skill_view'
      AND e.item_type = 'skill'
      AND e.item_slug = p_slug
      AND p_slug ~ '^[a-z0-9][a-z0-9-]{0,158}$'
      AND e.session_id IS NOT NULL
      AND e.created_at >= NOW() - INTERVAL '24 hours'
  ),
  country_totals AS (
    SELECT r.country_code, COUNT(DISTINCT r.session_id)::INTEGER AS sessions
    FROM recent AS r
    WHERE r.country_code ~ '^[A-Z]{2}$'
    GROUP BY r.country_code
    HAVING COUNT(DISTINCT r.session_id) >= 3
    ORDER BY sessions DESC, r.country_code ASC
    LIMIT 4
  )
  SELECT jsonb_build_object(
    'sessions', (SELECT COUNT(DISTINCT session_id) FROM recent),
    'countries', COALESCE(
      (SELECT jsonb_agg(jsonb_build_object('code', country_code, 'sessions', sessions)
                        ORDER BY sessions DESC, country_code ASC)
       FROM country_totals),
      '[]'::jsonb
    )
  );
$$;

REVOKE ALL ON FUNCTION public.get_skill_learning_activity(TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_skill_learning_activity(TEXT) TO anon, authenticated;
