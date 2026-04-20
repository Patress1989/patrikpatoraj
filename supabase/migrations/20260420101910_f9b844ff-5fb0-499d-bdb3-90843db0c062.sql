-- Timestamps trigger function (shared)
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Form submissions table
CREATE TABLE public.form_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  business_area TEXT NOT NULL,
  preferred_colors TEXT,
  existing_website TEXT,
  gdpr_consent BOOLEAN NOT NULL DEFAULT false,
  email_status TEXT NOT NULL DEFAULT 'pending',
  email_error TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;

-- Anyone (including anonymous visitors) can submit a form
CREATE POLICY "Anyone can submit a form"
ON public.form_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (gdpr_consent = true);

-- Only authenticated users can view submissions
CREATE POLICY "Authenticated users can view submissions"
ON public.form_submissions
FOR SELECT
TO authenticated
USING (true);

CREATE TRIGGER update_form_submissions_updated_at
BEFORE UPDATE ON public.form_submissions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_form_submissions_created_at ON public.form_submissions(created_at DESC);
CREATE INDEX idx_form_submissions_email_status ON public.form_submissions(email_status);