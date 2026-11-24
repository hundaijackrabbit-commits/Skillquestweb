-- Additive aggregate for public homepage, skill, career and article visits.
-- Run after 20261120130000_skill_community_activity.sql.
ALTER TABLE public.content_events ADD COLUMN IF NOT EXISTS country_code TEXT;
CREATE INDEX IF NOT EXISTS idx_content_events_public_activity
 ON public.content_events (event_type, item_type, item_slug, created_at DESC)
 WHERE session_id IS NOT NULL AND event_type IN ('page_view','skill_view','career_view','blog_view');

CREATE OR REPLACE FUNCTION public.get_public_learning_activity(p_kind TEXT, p_slug TEXT)
RETURNS JSONB LANGUAGE sql STABLE SECURITY DEFINER SET search_path = '' AS $$
 WITH recent AS (
   SELECT session_id, country_code, created_at FROM public.content_events
   WHERE session_id IS NOT NULL AND session_id <> '' AND created_at >= NOW() - INTERVAL '24 hours'
     AND (
       (p_kind = 'home' AND p_slug = 'home' AND event_type = 'page_view' AND item_type = 'page' AND item_slug = 'home' AND path = '/')
       OR (p_kind IN ('skill','career','blog') AND p_slug ~ '^[a-z0-9][a-z0-9-]{0,158}$'
           AND event_type = p_kind || '_view' AND item_type = p_kind AND item_slug = p_slug)
     )
 ), window_choice AS (
   SELECT CASE WHEN COUNT(DISTINCT session_id) FILTER (WHERE created_at >= NOW() - INTERVAL '30 minutes') >= 5
     THEN 30 ELSE 1440 END AS minutes FROM recent
 ), scoped AS (
   SELECT r.* FROM recent r CROSS JOIN window_choice w
   WHERE r.created_at >= NOW() - w.minutes * INTERVAL '1 minute'
 ), totals AS (SELECT COUNT(DISTINCT session_id) AS sessions FROM scoped),
 countries AS (
   SELECT country_code, COUNT(DISTINCT session_id) AS sessions FROM scoped
   WHERE country_code ~ '^[A-Z]{2}$' GROUP BY country_code
   HAVING COUNT(DISTINCT session_id) >= 3 ORDER BY sessions DESC, country_code LIMIT 4
 )
 SELECT jsonb_build_object(
   'sessions', CASE WHEN t.sessions >= 5 THEN t.sessions ELSE 0 END,
   'minutes', w.minutes,
   'countries', CASE WHEN t.sessions >= 5 THEN COALESCE(
     (SELECT jsonb_agg(jsonb_build_object('code', country_code, 'sessions', sessions) ORDER BY sessions DESC, country_code) FROM countries), '[]'::jsonb
   ) ELSE '[]'::jsonb END
 ) FROM totals t CROSS JOIN window_choice w;
$$;
REVOKE ALL ON FUNCTION public.get_public_learning_activity(TEXT,TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_public_learning_activity(TEXT,TEXT) TO anon, authenticated;
