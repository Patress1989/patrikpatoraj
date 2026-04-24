CREATE TABLE public.order_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),

  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,

  street text NOT NULL,
  city text NOT NULL,
  postal_code text NOT NULL,
  country text NOT NULL DEFAULT 'SK',

  is_company boolean NOT NULL DEFAULT false,
  company_name text,
  company_address text,
  ico text,
  dic text,
  ic_dph text,

  stripe_session_id text,
  payment_status text NOT NULL DEFAULT 'pending',

  gdpr_consent boolean NOT NULL DEFAULT false
);

ALTER TABLE public.order_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an order"
  ON public.order_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (gdpr_consent = true);

CREATE POLICY "Admins can view orders"
  ON public.order_submissions
  FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Service role can update orders"
  ON public.order_submissions
  FOR UPDATE
  TO public
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role can read orders"
  ON public.order_submissions
  FOR SELECT
  TO public
  USING (auth.role() = 'service_role');

CREATE TRIGGER set_order_submissions_updated_at
  BEFORE UPDATE ON public.order_submissions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_order_submissions_stripe_session ON public.order_submissions(stripe_session_id);
CREATE INDEX idx_order_submissions_email ON public.order_submissions(email);