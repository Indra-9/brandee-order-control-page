import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, EyeOff, ExternalLink, Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import IntegrationEditor from '@/components/IntegrationEditor';
interface Integration {
  id: string;
  name: string;
  slug: string;
  description: string;
  detailed_description: string;
  logo_url: string;
  category: string;
  website_url: string;
  documentation_url: string;
  pricing_info: string;
  features: string[];
  supported_platforms: string[];
  integration_type: string;
  difficulty_level: string;
  setup_time: string;
  is_featured: boolean;
  is_active: boolean;
  views_count: number;
  meta_title: string;
  meta_description: string;
  seo_keywords: string;
  created_at: string;
  updated_at: string;
}
const IntegrationManager = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingIntegration, setEditingIntegration] = useState<Integration | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const {
    toast
  } = useToast();
  useEffect(() => {
    fetchIntegrations();
  }, []);
  const fetchIntegrations = async () => {
    try {
      const {
        data,
        error
      } = await supabase.from('integrations').select('*').order('created_at', {
        ascending: false
      });
      if (error) throw error;
      setIntegrations(data || []);
    } catch (error) {
      console.error('Error fetching integrations:', error);
      toast({
        title: "Error",
        description: "Failed to fetch integrations",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleCreateNew = () => {
    setEditingIntegration(null);
    setShowEditor(true);
  };
  const handleEdit = (integration: Integration) => {
    setEditingIntegration(integration);
    setShowEditor(true);
  };
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this integration?')) return;
    try {
      const {
        error
      } = await supabase.from('integrations').delete().eq('id', id);
      if (error) throw error;
      setIntegrations(integrations.filter(integration => integration.id !== id));
      toast({
        title: "Success",
        description: "Integration deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting integration:', error);
      toast({
        title: "Error",
        description: "Failed to delete integration",
        variant: "destructive"
      });
    }
  };
  const toggleActive = async (integration: Integration) => {
    try {
      const {
        error
      } = await supabase.from('integrations').update({
        is_active: !integration.is_active
      }).eq('id', integration.id);
      if (error) throw error;
      setIntegrations(integrations.map(i => i.id === integration.id ? {
        ...i,
        is_active: !i.is_active
      } : i));
      toast({
        title: "Success",
        description: `Integration ${!integration.is_active ? 'activated' : 'deactivated'} successfully`
      });
    } catch (error) {
      console.error('Error updating integration:', error);
      toast({
        title: "Error",
        description: "Failed to update integration status",
        variant: "destructive"
      });
    }
  };
  const toggleFeatured = async (integration: Integration) => {
    try {
      const {
        error
      } = await supabase.from('integrations').update({
        is_featured: !integration.is_featured
      }).eq('id', integration.id);
      if (error) throw error;
      setIntegrations(integrations.map(i => i.id === integration.id ? {
        ...i,
        is_featured: !i.is_featured
      } : i));
      toast({
        title: "Success",
        description: `Integration ${!integration.is_featured ? 'featured' : 'unfeatured'} successfully`
      });
    } catch (error) {
      console.error('Error updating integration:', error);
      toast({
        title: "Error",
        description: "Failed to update integration featured status",
        variant: "destructive"
      });
    }
  };
  const handleSaveIntegration = async (integrationData: Partial<Integration>) => {
    try {
      if (editingIntegration) {
        const {
          error
        } = await supabase.from('integrations').update(integrationData).eq('id', editingIntegration.id);
        if (error) throw error;
        toast({
          title: "Success",
          description: "Integration updated successfully"
        });
      } else {
        const {
          error
        } = await supabase.from('integrations').insert([integrationData]);
        if (error) throw error;
        toast({
          title: "Success",
          description: "Integration created successfully"
        });
      }
      setShowEditor(false);
      setEditingIntegration(null);
      fetchIntegrations();
    } catch (error) {
      console.error('Error saving integration:', error);
      toast({
        title: "Error",
        description: "Failed to save integration",
        variant: "destructive"
      });
    }
  };
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-500/20 text-green-400';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'hard':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };
  if (showEditor) {
    return <IntegrationEditor integration={editingIntegration} onSave={handleSaveIntegration} onCancel={() => {
      setShowEditor(false);
      setEditingIntegration(null);
    }} />;
  }
  return <div>
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.4
    }} className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Integrations Management</h2>
        <Button onClick={handleCreateNew} className="bg-brandae-green text-brandae-dark hover:bg-brandae-green/90">
          <Plus size={20} className="mr-2" />
          Create New Integration
        </Button>
      </motion.div>

      {isLoading ? <div className="text-center py-12">
          <div className="text-gray-400">Loading integrations...</div>
        </div> : <motion.div className="grid gap-6" initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      duration: 0.6,
      delay: 0.2
    }}>
          {integrations.length === 0 ? <Card className="bg-brandae-gray border-brandae-green/20">
              <CardContent className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2 text-white">No integrations yet</h3>
                <p className="text-gray-400 mb-4">Create your first integration to get started</p>
                <Button onClick={handleCreateNew} className="bg-brandae-green text-brandae-dark hover:bg-brandae-green/90">
                  <Plus size={20} className="mr-2" />
                  Create Your First Integration
                </Button>
              </CardContent>
            </Card> : integrations.map((integration, index) => <motion.div key={integration.id} initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.4,
        delay: index * 0.1
      }}>
                <Card className="bg-brandae-gray border-brandae-green/20 hover:border-brandae-green/40 transition-colors">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <img src={integration.logo_url} alt={integration.name} className="w-10 h-10 rounded-lg object-cover" />
                          <CardTitle className="text-white">{integration.name}</CardTitle>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <Badge variant="outline" className="border-brandae-green/50 text-brandae-green">
                            {integration.category}
                          </Badge>
                          <Badge className={getDifficultyColor(integration.difficulty_level)}>
                            {integration.difficulty_level}
                          </Badge>
                          {integration.is_featured && <Badge className="bg-brandae-purple/20 text-brandae-purple">
                              <Star size={14} className="mr-1" />
                              Featured
                            </Badge>}
                          <Badge variant={integration.is_active ? "default" : "secondary"} className={integration.is_active ? "bg-green-600" : "bg-gray-600"}>
                            {integration.is_active ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        <p className="text-gray-300 text-sm mb-2">{integration.description}</p>
                        <p className="text-gray-500 text-xs">
                          {integration.integration_type.toUpperCase()} • {integration.setup_time} • {integration.views_count} views
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2 flex-wrap">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(integration)} className="border-brandae-green/50 text-brandae-green hover:bg-brandae-green/10 rounded">
                        <Edit size={16} className="mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => toggleActive(integration)} className="border-brandae-green/50 text-brandae-green hover:bg-brandae-green/10 rounded">
                        {integration.is_active ? <EyeOff size={16} className="mr-1" /> : <Eye size={16} className="mr-1" />}
                        {integration.is_active ? 'Deactivate' : 'Activate'}
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => toggleFeatured(integration)} className="border-brandae-purple/50 text-brandae-purple hover:bg-brandae-purple/10 rounded">
                        <Star size={16} className="mr-1" />
                        {integration.is_featured ? 'Unfeature' : 'Feature'}
                      </Button>
                      {integration.is_active && <Button size="sm" variant="outline" asChild className="border-brandae-green/50 text-brandae-green hover:bg-brandae-green/10">
                          <a href={`/integrations/${integration.slug}`} target="_blank" rel="noopener noreferrer">
                            <ExternalLink size={16} className="mr-1" />
                            View
                          </a>
                        </Button>}
                      <Button size="sm" variant="outline" onClick={() => handleDelete(integration.id)} className="border-red-500/50 text-red-400 hover:bg-red-500/10 rounded">
                        <Trash2 size={16} className="mr-1" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>)}
        </motion.div>}
    </div>;
};
export default IntegrationManager;