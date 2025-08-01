
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import Index from "./pages/Index";
import Features from "./pages/Features";
import HowItWorks from "./pages/HowItWorks";
import Solutions from "./pages/Solutions";
import Pricing from "./pages/Pricing";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Documentation from "./pages/Documentation";
import DocDetails from "./pages/DocDetails";
import DocCategory from "./pages/DocCategory";
import CaseStudies from "./pages/CaseStudies";
import CaseStudyDetails from "./pages/CaseStudyDetails";
import Integrations from "./pages/Integrations";
import IntegrationDetails from "./pages/IntegrationDetails";
import Sitemap from "./pages/Sitemap";
import SitemapXML from "./pages/SitemapXML";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Partners from "./pages/Partners";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import AdminWrapper from "./components/AdminWrapper";
import Admin from "./pages/Admin";

const queryClient = new QueryClient();

const App = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setLoading(false);
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-brandae-dark flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen w-full">
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/features" element={<Features />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/solutions" element={<Solutions />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/docs" element={<Documentation />} />
              <Route path="/docs/category/:slug" element={<DocCategory />} />
              <Route path="/docs/:slug" element={<DocDetails />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/case-studies/:slug" element={<CaseStudyDetails />} />
              <Route path="/integrations" element={<Integrations />} />
              <Route path="/integrations/:slug" element={<IntegrationDetails />} />
              <Route path="/sitemap" element={<Sitemap />} />
              <Route path="/sitemap.xml" element={<SitemapXML />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/partners" element={<Partners />} />
              <Route path="/auth" element={<Auth />} />
              <Route 
                path="/admin/*" 
                element={
                  <AdminWrapper session={session}>
                    <Admin />
                  </AdminWrapper>
                } 
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
