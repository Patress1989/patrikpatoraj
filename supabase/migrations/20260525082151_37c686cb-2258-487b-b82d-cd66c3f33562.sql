
-- Harden SECURITY DEFINER email queue functions: set search_path and revoke EXECUTE from anon/authenticated
ALTER FUNCTION public.enqueue_email(TEXT, JSONB) SET search_path = public, pgmq;
ALTER FUNCTION public.read_email_batch(TEXT, INT, INT) SET search_path = public, pgmq;
ALTER FUNCTION public.delete_email(TEXT, BIGINT) SET search_path = public, pgmq;
ALTER FUNCTION public.move_to_dlq(TEXT, TEXT, BIGINT, JSONB) SET search_path = public, pgmq;

REVOKE EXECUTE ON FUNCTION public.enqueue_email(TEXT, JSONB) FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.read_email_batch(TEXT, INT, INT) FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.delete_email(TEXT, BIGINT) FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.move_to_dlq(TEXT, TEXT, BIGINT, JSONB) FROM anon, authenticated;

-- Storage policies for project-photos bucket
-- Drop overly broad policies. Public read access still works through the
-- public bucket endpoint (/storage/v1/object/public/...) which bypasses RLS,
-- so dropping the SELECT policy removes the ability to LIST files without
-- breaking direct public URL reads.
DROP POLICY IF EXISTS "Public can view project photos" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload project photos" ON storage.objects;

-- Restrict INSERT: anonymous form uploads must live under submissions/ prefix.
CREATE POLICY "Anon can upload form photos to submissions prefix"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (
  bucket_id = 'project-photos'
  AND (storage.foldername(name))[1] = 'submissions'
);

-- Admins can manage (update/delete) any photos for moderation/cleanup.
CREATE POLICY "Admins can update project photos"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'project-photos' AND public.has_role(auth.uid(), 'admin'))
WITH CHECK (bucket_id = 'project-photos' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete project photos"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'project-photos' AND public.has_role(auth.uid(), 'admin'));

-- Admins can list project photos (for CRM moderation views).
CREATE POLICY "Admins can list project photos"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'project-photos' AND public.has_role(auth.uid(), 'admin'));
