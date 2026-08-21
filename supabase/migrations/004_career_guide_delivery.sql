-- Modern Skill Lab Career & Life Map delivery tracking
-- Keeps requested-resource delivery separate from optional newsletter consent.

CREATE TABLE IF NOT EXISTS public.career_guide_deliveries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  name TEXT,
  asset_slug TEXT NOT NULL DEFAULT 'career-life-map',
  source TEXT NOT NULL DEFAULT 'career-guide-page',
  marketing_consent BOOLEAN NOT NULL DEFAULT FALSE,
  status TEXT NOT NULL DEFAULT 'requested' CHECK (status IN ('requested', 'sent', 'failed')),
  resend_email_id TEXT,
  error_message TEXT,
  requested_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  sent_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(email, asset_slug)
);

CREATE INDEX IF NOT EXISTS idx_career_guide_deliveries_status
  ON public.career_guide_deliveries(status, requested_at DESC);

CREATE INDEX IF NOT EXISTS idx_career_guide_deliveries_requested_at
  ON public.career_guide_deliveries(requested_at DESC);

DROP TRIGGER IF EXISTS set_career_guide_deliveries_updated_at ON public.career_guide_deliveries;
CREATE TRIGGER set_career_guide_deliveries_updated_at
  BEFORE UPDATE ON public.career_guide_deliveries
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

ALTER TABLE public.career_guide_deliveries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins manage career guide deliveries" ON public.career_guide_deliveries;
CREATE POLICY "Admins manage career guide deliveries" ON public.career_guide_deliveries
  FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE OR REPLACE FUNCTION public.request_career_guide(
  p_email TEXT,
  p_name TEXT DEFAULT NULL,
  p_source TEXT DEFAULT 'career-guide-page',
  p_marketing_consent BOOLEAN DEFAULT FALSE
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  delivery_id UUID;
  normalized_email TEXT;
BEGIN
  normalized_email := lower(trim(p_email));

  IF normalized_email IS NULL OR length(normalized_email) > 254 OR normalized_email !~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' THEN
    RAISE EXCEPTION 'invalid email';
  END IF;

  INSERT INTO public.career_guide_deliveries (
    email,
    name,
    source,
    marketing_consent,
    status,
    requested_at
  )
  VALUES (
    normalized_email,
    NULLIF(left(trim(COALESCE(p_name, '')), 100), ''),
    left(COALESCE(NULLIF(trim(p_source), ''), 'career-guide-page'), 80),
    COALESCE(p_marketing_consent, FALSE),
    'requested',
    NOW()
  )
  ON CONFLICT (email, asset_slug) DO UPDATE
    SET name = COALESCE(EXCLUDED.name, public.career_guide_deliveries.name),
        source = EXCLUDED.source,
        marketing_consent = public.career_guide_deliveries.marketing_consent OR EXCLUDED.marketing_consent,
        status = 'requested',
        error_message = NULL,
        requested_at = NOW(),
        updated_at = NOW()
  RETURNING id INTO delivery_id;

  RETURN delivery_id;
END;
$$;

REVOKE ALL ON FUNCTION public.request_career_guide(TEXT, TEXT, TEXT, BOOLEAN) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.request_career_guide(TEXT, TEXT, TEXT, BOOLEAN) TO anon, authenticated;

