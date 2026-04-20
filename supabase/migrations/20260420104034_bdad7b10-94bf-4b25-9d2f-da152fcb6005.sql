-- Add new optional columns to form_submissions
ALTER TABLE public.form_submissions
  ADD COLUMN IF NOT EXISTS company_name text,
  ADD COLUMN IF NOT EXISTS business_description text,
  ADD COLUMN IF NOT EXISTS services_list text,
  ADD COLUMN IF NOT EXISTS contact_info text,
  ADD COLUMN IF NOT EXISTS photo_urls text[];

-- Create public storage bucket for project photos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'project-photos',
  'project-photos',
  true,
  5242880,
  ARRAY['image/jpeg','image/jpg','image/png','image/webp','image/gif','image/heic']
)
ON CONFLICT (id) DO UPDATE
  SET public = EXCLUDED.public,
      file_size_limit = EXCLUDED.file_size_limit,
      allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Public read access
CREATE POLICY "Public can view project photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'project-photos');

-- Anyone (incl. anon) can upload
CREATE POLICY "Anyone can upload project photos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'project-photos');