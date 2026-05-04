-- Web brief submissions ("Pomôcka k webu")
CREATE TABLE public.web_briefs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),

  -- Kontakt
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company_name TEXT,

  -- O firme
  is_starting BOOLEAN,
  has_brand BOOLEAN,
  business_one_liner TEXT,
  has_existing_site BOOLEAN,
  existing_site_url TEXT,
  existing_site_issues TEXT,

  -- Ciele
  goals TEXT[],
  self_edit BOOLEAN,

  -- Dizajn
  preferred_colors TEXT,
  preferred_typography TEXT,
  has_own_photos BOOLEAN,
  has_own_texts BOOLEAN,
  reference_sites TEXT,

  -- Funkcie
  main_features TEXT,
  sells_products BOOLEAN,
  needs_crm_integration BOOLEAN,
  crm_details TEXT,
  needs_invoicing BOOLEAN,
  needs_analytics BOOLEAN,
  multilingual BOOLEAN,
  languages TEXT,
  contact_form BOOLEAN,
  newsletter_form BOOLEAN,
  special_features TEXT,

  -- Záver
  target_audience TEXT,
  unique_selling_point TEXT,
  maintenance_package BOOLEAN,
  budget_range TEXT,
  deadline TEXT,
  notes TEXT,

  gdpr_consent BOOLEAN NOT NULL DEFAULT false
);

ALTER TABLE public.web_briefs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a web brief"
ON public.web_briefs
FOR INSERT
TO anon, authenticated
WITH CHECK (gdpr_consent = true);

CREATE POLICY "Admins can view web briefs"
ON public.web_briefs
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete web briefs"
ON public.web_briefs
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_web_briefs_updated_at
BEFORE UPDATE ON public.web_briefs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();