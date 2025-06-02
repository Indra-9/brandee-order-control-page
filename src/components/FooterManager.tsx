
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X, Move } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface FooterConfig {
  id: string;
  logo_url: string;
  about_text: string;
  copyright_text: string;
}

interface FooterLinkCategory {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
  is_active: boolean;
}

interface FooterLink {
  id: string;
  category_id: string;
  title: string;
  url: string;
  sort_order: number;
  is_active: boolean;
  is_external: boolean;
}

interface FooterContact {
  id: string;
  email: string;
  phone: string;
  address: string;
}

interface FooterSocialLink {
  id: string;
  platform: string;
  url: string;
  icon_name: string;
  sort_order: number;
  is_active: boolean;
}

const FooterManager = () => {
  const [config, setConfig] = useState<FooterConfig | null>(null);
  const [categories, setCategories] = useState<FooterLinkCategory[]>([]);
  const [links, setLinks] = useState<FooterLink[]>([]);
  const [contact, setContact] = useState<FooterContact | null>(null);
  const [socialLinks, setSocialLinks] = useState<FooterSocialLink[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingConfig, setEditingConfig] = useState(false);
  const [editingContact, setEditingContact] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [configRes, categoriesRes, linksRes, contactRes, socialRes, subscribersRes] = await Promise.all([
        supabase.from('footer_config').select('*').single(),
        supabase.from('footer_link_categories').select('*').order('sort_order'),
        supabase.from('footer_links').select('*').order('sort_order'),
        supabase.from('footer_contact').select('*').single(),
        supabase.from('footer_social_links').select('*').order('sort_order'),
        supabase.from('newsletter_subscribers').select('*').order('subscribed_at', { ascending: false })
      ]);

      if (configRes.data) setConfig(configRes.data);
      if (categoriesRes.data) setCategories(categoriesRes.data);
      if (linksRes.data) setLinks(linksRes.data);
      if (contactRes.data) setContact(contactRes.data);
      if (socialRes.data) setSocialLinks(socialRes.data);
      if (subscribersRes.data) setSubscribers(subscribersRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch footer data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateConfig = async () => {
    if (!config) return;
    try {
      const { error } = await supabase
        .from('footer_config')
        .update({
          logo_url: config.logo_url,
          about_text: config.about_text,
          copyright_text: config.copyright_text
        })
        .eq('id', config.id);

      if (error) throw error;
      setEditingConfig(false);
      toast({
        title: "Success",
        description: "Footer configuration updated",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update configuration",
        variant: "destructive",
      });
    }
  };

  const updateContact = async () => {
    if (!contact) return;
    try {
      const { error } = await supabase
        .from('footer_contact')
        .update({
          email: contact.email,
          phone: contact.phone,
          address: contact.address
        })
        .eq('id', contact.id);

      if (error) throw error;
      setEditingContact(false);
      toast({
        title: "Success",
        description: "Contact information updated",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update contact information",
        variant: "destructive",
      });
    }
  };

  const createCategory = async (name: string, slug: string) => {
    try {
      const { error } = await supabase
        .from('footer_link_categories')
        .insert([{
          name,
          slug,
          sort_order: categories.length + 1
        }]);

      if (error) throw error;
      fetchAllData();
      toast({
        title: "Success",
        description: "Category created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create category",
        variant: "destructive",
      });
    }
  };

  const updateCategory = async (id: string, updates: Partial<FooterLinkCategory>) => {
    try {
      const { error } = await supabase
        .from('footer_link_categories')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      fetchAllData();
      toast({
        title: "Success",
        description: "Category updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update category",
        variant: "destructive",
      });
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      const { error } = await supabase
        .from('footer_link_categories')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchAllData();
      toast({
        title: "Success",
        description: "Category deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete category",
        variant: "destructive",
      });
    }
  };

  const createLink = async (categoryId: string, title: string, url: string, isExternal: boolean) => {
    try {
      const { error } = await supabase
        .from('footer_links')
        .insert([{
          category_id: categoryId,
          title,
          url,
          is_external: isExternal,
          sort_order: links.filter(l => l.category_id === categoryId).length + 1
        }]);

      if (error) throw error;
      fetchAllData();
      toast({
        title: "Success",
        description: "Link created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create link",
        variant: "destructive",
      });
    }
  };

  const updateLink = async (id: string, updates: Partial<FooterLink>) => {
    try {
      const { error } = await supabase
        .from('footer_links')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      fetchAllData();
      toast({
        title: "Success",
        description: "Link updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update link",
        variant: "destructive",
      });
    }
  };

  const deleteLink = async (id: string) => {
    try {
      const { error } = await supabase
        .from('footer_links')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchAllData();
      toast({
        title: "Success",
        description: "Link deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete link",
        variant: "destructive",
      });
    }
  };

  const createSocialLink = async (platform: string, url: string, iconName: string) => {
    try {
      const { error } = await supabase
        .from('footer_social_links')
        .insert([{
          platform,
          url,
          icon_name: iconName,
          sort_order: socialLinks.length + 1
        }]);

      if (error) throw error;
      fetchAllData();
      toast({
        title: "Success",
        description: "Social link created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create social link",
        variant: "destructive",
      });
    }
  };

  const updateSocialLink = async (id: string, updates: Partial<FooterSocialLink>) => {
    try {
      const { error } = await supabase
        .from('footer_social_links')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      fetchAllData();
      toast({
        title: "Success",
        description: "Social link updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update social link",
        variant: "destructive",
      });
    }
  };

  const deleteSocialLink = async (id: string) => {
    try {
      const { error } = await supabase
        .from('footer_social_links')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchAllData();
      toast({
        title: "Success",
        description: "Social link deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete social link",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-brandae-green">Loading footer manager...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">Footer Manager</h1>
        <p className="text-gray-400">Manage all footer components and content</p>
      </motion.div>

      <Tabs defaultValue="config" className="space-y-6">
        <TabsList className="bg-brandae-gray border border-brandae-green/20">
          <TabsTrigger value="config">Configuration</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="links">Links</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
        </TabsList>

        <TabsContent value="config">
          <Card className="bg-brandae-gray border-brandae-green/20">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-brandae-green">Footer Configuration</CardTitle>
                <Button
                  onClick={() => setEditingConfig(!editingConfig)}
                  variant="outline"
                  size="sm"
                  className="border-brandae-green/50 text-brandae-green"
                >
                  {editingConfig ? <X size={16} /> : <Edit size={16} />}
                  {editingConfig ? 'Cancel' : 'Edit'}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {config && (
                <>
                  <div>
                    <Label className="text-white">Logo URL</Label>
                    {editingConfig ? (
                      <Input
                        value={config.logo_url}
                        onChange={(e) => setConfig({ ...config, logo_url: e.target.value })}
                        className="bg-brandae-dark border-brandae-green/20 text-white"
                      />
                    ) : (
                      <p className="text-gray-300 mt-1">{config.logo_url}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-white">About Text</Label>
                    {editingConfig ? (
                      <Textarea
                        value={config.about_text}
                        onChange={(e) => setConfig({ ...config, about_text: e.target.value })}
                        className="bg-brandae-dark border-brandae-green/20 text-white"
                        rows={3}
                      />
                    ) : (
                      <p className="text-gray-300 mt-1">{config.about_text}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-white">Copyright Text</Label>
                    {editingConfig ? (
                      <Input
                        value={config.copyright_text}
                        onChange={(e) => setConfig({ ...config, copyright_text: e.target.value })}
                        className="bg-brandae-dark border-brandae-green/20 text-white"
                      />
                    ) : (
                      <p className="text-gray-300 mt-1">{config.copyright_text}</p>
                    )}
                  </div>
                  {editingConfig && (
                    <Button onClick={updateConfig} className="bg-brandae-green text-brandae-dark">
                      <Save size={16} className="mr-2" />
                      Save Changes
                    </Button>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Add other tab contents for categories, links, contact, social, and subscribers */}
        {/* This would include similar UI patterns for managing each type of footer data */}
        
        <TabsContent value="subscribers">
          <Card className="bg-brandae-gray border-brandae-green/20">
            <CardHeader>
              <CardTitle className="text-brandae-green">Newsletter Subscribers ({subscribers.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {subscribers.map((subscriber) => (
                  <div key={subscriber.id} className="flex justify-between items-center p-3 bg-brandae-dark rounded border border-brandae-green/10">
                    <div>
                      <span className="text-white">{subscriber.email}</span>
                      <span className="text-gray-400 text-sm ml-2">
                        {new Date(subscriber.subscribed_at).toLocaleDateString()}
                      </span>
                    </div>
                    <Switch
                      checked={subscriber.is_active}
                      onCheckedChange={async (checked) => {
                        await supabase
                          .from('newsletter_subscribers')
                          .update({ is_active: checked })
                          .eq('id', subscriber.id);
                        fetchAllData();
                      }}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FooterManager;
