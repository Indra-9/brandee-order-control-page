
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AdminStats {
  contactSubmissions: { current: number; previous: number };
  caseStudies: { current: number; previous: number };
  documentation: { current: number; previous: number };
  integrations: { current: number; previous: number };
  webhooks: { current: number; previous: number };
  sitemapPages: { current: number; previous: number };
}

export const useAdminStats = () => {
  const [stats, setStats] = useState<AdminStats>({
    contactSubmissions: { current: 0, previous: 0 },
    caseStudies: { current: 0, previous: 0 },
    documentation: { current: 0, previous: 0 },
    integrations: { current: 0, previous: 0 },
    webhooks: { current: 0, previous: 0 },
    sitemapPages: { current: 0, previous: 0 }
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const now = new Date();
      const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      const previousMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const previousMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

      // Contact Submissions
      const { count: currentContacts } = await supabase
        .from('contact_submissions')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', currentMonthStart.toISOString());

      const { count: previousContacts } = await supabase
        .from('contact_submissions')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', previousMonthStart.toISOString())
        .lte('created_at', previousMonthEnd.toISOString());

      // Case Studies
      const { count: currentCaseStudies } = await supabase
        .from('case_studies')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', currentMonthStart.toISOString());

      const { count: previousCaseStudies } = await supabase
        .from('case_studies')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', previousMonthStart.toISOString())
        .lte('created_at', previousMonthEnd.toISOString());

      // Documentation
      const { count: currentDocs } = await supabase
        .from('documentation')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', currentMonthStart.toISOString());

      const { count: previousDocs } = await supabase
        .from('documentation')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', previousMonthStart.toISOString())
        .lte('created_at', previousMonthEnd.toISOString());

      // Integrations
      const { count: currentIntegrations } = await supabase
        .from('integrations')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', currentMonthStart.toISOString());

      const { count: previousIntegrations } = await supabase
        .from('integrations')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', previousMonthStart.toISOString())
        .lte('created_at', previousMonthEnd.toISOString());

      // Webhooks
      const { count: currentWebhooks } = await supabase
        .from('webhook_endpoints')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', currentMonthStart.toISOString());

      const { count: previousWebhooks } = await supabase
        .from('webhook_endpoints')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', previousMonthStart.toISOString())
        .lte('created_at', previousMonthEnd.toISOString());

      // Sitemap Pages
      const { count: currentSitemap } = await supabase
        .from('sitemap_pages')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', currentMonthStart.toISOString());

      const { count: previousSitemap } = await supabase
        .from('sitemap_pages')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', previousMonthStart.toISOString())
        .lte('created_at', previousMonthEnd.toISOString());

      setStats({
        contactSubmissions: { current: currentContacts || 0, previous: previousContacts || 0 },
        caseStudies: { current: currentCaseStudies || 0, previous: previousCaseStudies || 0 },
        documentation: { current: currentDocs || 0, previous: previousDocs || 0 },
        integrations: { current: currentIntegrations || 0, previous: previousIntegrations || 0 },
        webhooks: { current: currentWebhooks || 0, previous: previousWebhooks || 0 },
        sitemapPages: { current: currentSitemap || 0, previous: previousSitemap || 0 }
      });
    } catch (error) {
      console.error('Error fetching admin stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { stats, isLoading, refetch: fetchStats };
};
