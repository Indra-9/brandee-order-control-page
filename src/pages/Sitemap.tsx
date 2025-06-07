
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SitemapPage {
  url: string;
  title: string;
  description: string;
  last_modified: string;
  change_frequency: string;
  priority: number;
  page_type: string;
}

const Sitemap = () => {
  const [pages, setPages] = useState<SitemapPage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSitemapPages();
  }, []);

  const fetchSitemapPages = async () => {
    try {
      const { data, error } = await supabase
        .from('sitemap_pages')
        .select('*')
        .eq('is_active', true)
        .order('priority', { ascending: false });

      if (error) throw error;
      setPages(data || []);
    } catch (error) {
      console.error('Error fetching sitemap pages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateXMLSitemap = () => {
    const baseUrl = window.location.origin;
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${new Date(page.last_modified).toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.change_frequency}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    const blob = new Blob([xml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brandae-dark text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl">Loading sitemap...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brandae-dark text-white p-8">
      <div className="container mx-auto max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Website Sitemap</h1>
          <button
            onClick={generateXMLSitemap}
            className="bg-brandae-green text-brandae-dark px-4 py-2 rounded hover:bg-brandae-green/90 transition-colors"
          >
            Download XML Sitemap
          </button>
        </div>

        <div className="grid gap-6">
          {['static', 'blog', 'case_study', 'integration', 'documentation'].map(type => {
            const typePages = pages.filter(page => page.page_type === type);
            if (typePages.length === 0) return null;

            return (
              <div key={type} className="bg-brandae-gray rounded-lg p-6 border border-brandae-green/20">
                <h2 className="text-xl font-semibold mb-4 capitalize text-brandae-green">
                  {type.replace('_', ' ')} Pages ({typePages.length})
                </h2>
                <div className="space-y-3">
                  {typePages.map((page, index) => (
                    <div key={index} className="flex justify-between items-start p-3 bg-brandae-dark rounded border border-brandae-green/10">
                      <div className="flex-1">
                        <a 
                          href={page.url} 
                          className="text-brandae-green hover:text-brandae-green/80 font-medium"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {page.url}
                        </a>
                        <p className="text-gray-300 text-sm mt-1">{page.title}</p>
                        {page.description && (
                          <p className="text-gray-400 text-xs mt-1">{page.description}</p>
                        )}
                      </div>
                      <div className="text-right text-sm text-gray-400 ml-4">
                        <div>Priority: {page.priority}</div>
                        <div>Frequency: {page.change_frequency}</div>
                        <div>Modified: {new Date(page.last_modified).toLocaleDateString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sitemap;
