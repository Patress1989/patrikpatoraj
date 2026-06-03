CREATE POLICY "Viewers can view all submissions"
ON public.form_submissions
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'viewer'::app_role));

CREATE POLICY "Viewers can view web briefs"
ON public.web_briefs
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'viewer'::app_role));