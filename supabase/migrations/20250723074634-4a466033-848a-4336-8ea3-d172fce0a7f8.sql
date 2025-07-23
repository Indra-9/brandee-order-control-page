
-- Create a table for partner submissions
CREATE TABLE public.partner_submissions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  company_website text,
  address text NOT NULL,
  country text NOT NULL,
  state text NOT NULL,
  pin_code text NOT NULL,
  proposal text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS)
ALTER TABLE public.partner_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy that allows anyone to insert partner submissions
CREATE POLICY "Anyone can submit partner applications" 
  ON public.partner_submissions 
  FOR INSERT 
  WITH CHECK (true);

-- Create policy that allows authenticated users (admins) to view all partner submissions
CREATE POLICY "Authenticated users can view partner submissions" 
  ON public.partner_submissions 
  FOR SELECT 
  USING (auth.role() = 'authenticated'::text);

-- Create trigger to update the updated_at column
CREATE TRIGGER handle_updated_at_partner_submissions
  BEFORE UPDATE ON public.partner_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();
