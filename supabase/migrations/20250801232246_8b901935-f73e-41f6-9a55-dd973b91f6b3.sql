-- Create user roles enum and table
CREATE TYPE public.app_role AS ENUM ('admin', 'editor', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check user roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = 'public'
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.user_roles
        WHERE user_id = _user_id
        AND role = _role
    );
$$;

-- Create function to get current user role
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS app_role
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = 'public'
AS $$
    SELECT role
    FROM public.user_roles
    WHERE user_id = auth.uid()
    ORDER BY 
        CASE role
            WHEN 'admin' THEN 1
            WHEN 'editor' THEN 2
            WHEN 'user' THEN 3
        END
    LIMIT 1;
$$;

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'user');
    RETURN NEW;
END;
$$;

-- Create trigger for automatic user role assignment
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Enable RLS on unprotected tables
ALTER TABLE public.doc_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documentation ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sitemap_pages ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage all roles"
ON public.user_roles
FOR ALL
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Fix blog_posts policies (replace overly permissive ones)
DROP POLICY IF EXISTS "Admins can manage all blog posts" ON public.blog_posts;

CREATE POLICY "Admins and editors can manage blog posts"
ON public.blog_posts
FOR ALL
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'))
WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

-- Fix case_studies policies
DROP POLICY IF EXISTS "Authenticated users can manage all case studies" ON public.case_studies;

CREATE POLICY "Admins and editors can manage case studies"
ON public.case_studies
FOR ALL
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'))
WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

-- Create policies for documentation
CREATE POLICY "Anyone can view published documentation"
ON public.documentation
FOR SELECT
USING (published = true);

CREATE POLICY "Admins and editors can manage documentation"
ON public.documentation
FOR ALL
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'))
WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

-- Create policies for integrations
CREATE POLICY "Anyone can view active integrations"
ON public.integrations
FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can manage integrations"
ON public.integrations
FOR ALL
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create policies for doc_media
CREATE POLICY "Anyone can view doc media"
ON public.doc_media
FOR SELECT
USING (true);

CREATE POLICY "Admins and editors can manage doc media"
ON public.doc_media
FOR ALL
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'))
WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

-- Create policies for doc_links
CREATE POLICY "Anyone can view doc links"
ON public.doc_links
FOR SELECT
USING (true);

CREATE POLICY "Admins and editors can manage doc links"
ON public.doc_links
FOR ALL
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'))
WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

-- Create policies for sitemap_pages
CREATE POLICY "Anyone can view sitemap pages"
ON public.sitemap_pages
FOR SELECT
USING (true);

CREATE POLICY "Admins can manage sitemap pages"
ON public.sitemap_pages
FOR ALL
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Fix webhook_endpoints policy
DROP POLICY IF EXISTS "Authenticated users can manage webhook endpoints" ON public.webhook_endpoints;

CREATE POLICY "Admins can manage webhook endpoints"
ON public.webhook_endpoints
FOR ALL
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Update triggers for updated_at
CREATE TRIGGER update_user_roles_updated_at
    BEFORE UPDATE ON public.user_roles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();