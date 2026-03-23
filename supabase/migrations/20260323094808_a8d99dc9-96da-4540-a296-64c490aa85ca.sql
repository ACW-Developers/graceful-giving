-- Allow admins to delete donations (needed for flush)
CREATE POLICY "Admins can delete donations"
ON public.donations
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Allow public to read donations (for receipts display)
CREATE POLICY "Anyone can read donations"
ON public.donations
FOR SELECT
TO public
USING (true);
