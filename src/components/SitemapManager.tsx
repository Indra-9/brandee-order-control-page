
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Download, Eye, Edit, Trash2, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface SitemapPage {
  id: string;
  url: string;
  title: string;
  description: string;
  last_modified: string;
  change_frequency: string;
  priority: number;
  is_active: boolean;
  page_type: string;
  meta_keywords: string;
  canonical_url: string;
  created_at: string;
  updated_at: string;
}

const SitemapManager = () => {
  const [pages, setPages] = useState<SitemapPage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSitemapPages();
  }, []);

  const fetchSitemapPages = async () => {
    try {
      const { data, error } = await supabase
        .from('sitemap_pages')
        .select('*')
        .order('priority', { ascending: false });

      if (error) throw error;
      setPages(data || []);
    } catch (error) {
      console.error('Error fetching sitemap pages:', error);
      toast({
        title: "Error",
        description: "Failed to fetch sitemap pages",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateSitemap = async () => {
    setIsUpdating(true);
    try {
      const { error } = await supabase.rpc('update_sitemap_for_content');
      
      if (error) throw error;

      await fetchSitemapPages();
      toast({
        title: "Success",
        description: "Sitemap updated successfully"
      });
    } catch (error) {
      console.error('Error updating sitemap:', error);
      toast({
        title: "Error",
        description: "Failed to update sitemap",
        variant: "destructive"
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const togglePageStatus = async (page: SitemapPage) => {
    try {
      const { error } = await supabase
        .from('sitemap_pages')
        .update({ is_active: !page.is_active })
        .eq('id', page.id);

      if (error) throw error;

      setPages(pages.map(p => 
        p.id === page.id ? { ...p, is_active: !p.is_active } : p
      ));

      toast({
        title: "Success",
        description: `Page ${!page.is_active ? 'activated' : 'deactivated'} successfully`
      });
    } catch (error) {
      console.error('Error updating page status:', error);
      toast({
        title: "Error",
        description: "Failed to update page status",
        variant: "destructive"
      });
    }
  };

  const deletePage = async (pageId: string) => {
    if (!confirm('Are you sure you want to delete this page from the sitemap?')) return;

    try {
      const { error } = await supabase
        .from('sitemap_pages')
        .delete()
        .eq('id', pageId);

      if (error) throw error;

      setPages(pages.filter(p => p.id !== pageId));
      toast({
        title: "Success",
        description: "Page deleted from sitemap successfully"
      });
    } catch (error) {
      console.error('Error deleting page:', error);
      toast({
        title: "Error",
        description: "Failed to delete page",
        variant: "destructive"
      });
    }
  };

  const downloadXMLSitemap = async () => {
    try {
      const { data, error } = await supabase
        .from('sitemap_pages')
        .select('*')
        .eq('is_active', true)
        .order('priority', { ascending: false });

      if (error) throw error;

      const baseUrl = window.location.origin;
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${(data || []).map(page => `  <url>
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

      toast({
        title: "Success",
        description: "Sitemap XML downloaded successfully"
      });
    } catch (error) {
      console.error('Error downloading sitemap:', error);
      toast({
        title: "Error",
        description: "Failed to download sitemap",
        variant: "destructive"
      });
    }
  };

  const getPageTypeColor = (type: string) => {
    switch (type) {
      case 'static': return 'bg-blue-500/20 text-blue-400';
      case 'blog': return 'bg-green-500/20 text-green-400';
      case 'case_study': return 'bg-purple-500/20 text-purple-400';
      case 'integration': return 'bg-yellow-500/20 text-yellow-400';
      case 'documentation': return 'bg-cyan-500/20 text-cyan-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.4 }}
        className="flex justify-between items-center mb-6"
      >
        <h2 className="text-2xl font-semibold">Sitemap Management</h2>
        <div className="flex gap-2">
          <Button 
            onClick={updateSitemap}
            disabled={isUpdating}
            variant="outline"
            className="border-brandae-green/50 text-brandae-green hover:bg-brandae-green/10"
          >
            <RefreshCw size={20} className={`mr-2 ${isUpdating ? 'animate-spin' : ''}`} />
            {isUpdating ? 'Updating...' : 'Update Sitemap'}
          </Button>
          <Button 
            onClick={downloadXMLSitemap}
            className="bg-brandae-green text-brandae-dark hover:bg-brandae-green/90"
          >
            <Download size={20} className="mr-2" />
            Download XML
          </Button>
        </div>
      </motion.div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="text-gray-400">Loading sitemap pages...</div>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-brandae-gray border-brandae-green/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                Sitemap Pages ({pages.length})
                <Badge variant="outline" className="border-brandae-green/50 text-brandae-green">
                  {pages.filter(p => p.is_active).length} Active
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {pages.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  No pages found in sitemap
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-brandae-green/20">
                        <TableHead className="text-gray-300">URL</TableHead>
                        <TableHead className="text-gray-300">Title</TableHead>
                        <TableHead className="text-gray-300">Type</TableHead>
                        <TableHead className="text-gray-300">Priority</TableHead>
                        <TableHead className="text-gray-300">Status</TableHead>
                        <TableHead className="text-gray-300">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pages.map((page, index) => (
                        <motion.tr
                          key={page.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-brandae-green/10 hover:bg-brandae-green/5"
                        >
                          <TableCell>
                            <a 
                              href={page.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-brandae-green hover:text-brandae-green/80 font-mono text-sm"
                            >
                              {page.url}
                            </a>
                          </TableCell>
                          <TableCell>
                            <div className="text-white font-medium">{page.title}</div>
                            {page.description && (
                              <div className="text-gray-400 text-xs mt-1 max-w-xs truncate">
                                {page.description}
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge className={getPageTypeColor(page.page_type)}>
                              {page.page_type.replace('_', ' ')}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="text-gray-300">{page.priority}</div>
                            <div className="text-gray-500 text-xs">{page.change_frequency}</div>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={page.is_active ? "default" : "secondary"}
                              className={page.is_active ? "bg-green-600" : "bg-gray-600"}
                            >
                              {page.is_active ? "Active" : "Inactive"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => togglePageStatus(page)}
                                className="border-brandae-green/50 text-brandae-green hover:bg-brandae-green/10"
                              >
                                <Eye size={14} />
                              </Button>
                              {page.page_type === 'static' && (
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  onClick={() => deletePage(page.id)}
                                  className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                                >
                                  <Trash2 size={14} />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default SitemapManager;
