-- Enable Row Level Security on case_studies table
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view published case studies
CREATE POLICY "Anyone can view published case studies" 
ON public.case_studies 
FOR SELECT 
USING (published = true);

-- Allow authenticated users to manage all case studies (for admin functionality)
CREATE POLICY "Authenticated users can manage all case studies" 
ON public.case_studies 
FOR ALL 
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);