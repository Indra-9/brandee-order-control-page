
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, EyeOff, ExternalLink, Search, Filter } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import DocumentationEditor from '@/components/DocumentationEditor';

interface Documentation {
  id: string;
  title: string;
  slug: string;
  meta_title: string | null;
  meta_description: string | null;
  excerpt: string | null;
  content: string | null;
  featured_image_url: string | null;
  category: string;
  tags: string[];
  author: string;
  featured: boolean;
  published: boolean;
  seo_keywords: string | null;
  canonical_url: string | null;
  reading_time: number | null;
  views_count: number;
  sort_order: number;
  parent_id: string | null;
  created_at: string;
  updated_at: string;
}

interface DocCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  color: string;
  sort_order: number;
}

const DocumentationManager = () => {
  const [docs, setDocs] = useState<Documentation[]>([]);
  const [categories, setCategories] = useState<DocCategory[]>([]);
  const [filteredDocs, setFilteredDocs] = useState<Documentation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingDoc, setEditingDoc] = useState<Documentation | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterDocs();
  }, [docs, searchQuery, selectedCategory]);

  const fetchData = async () => {
    try {
      const [docsResponse, categoriesResponse] = await Promise.all([
        supabase
          .from('documentation')
          .select('*')
          .order('created_at', { ascending: false }),
        supabase
          .from('doc_categories')
          .select('*')
          .order('sort_order', { ascending: true })
      ]);

      if (docsResponse.error) throw docsResponse.error;
      if (categoriesResponse.error) throw categoriesResponse.error;

      setDocs(docsResponse.data || []);
      setCategories(categoriesResponse.data || []);
    } catch (error) {
      console.error('Error fetching documentation:', error);
      toast({
        title: "Error",
        description: "Failed to fetch documentation",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filterDocs = () => {
    let filtered = docs;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(doc => 
        doc.title.toLowerCase().includes(query) ||
        doc.excerpt?.toLowerCase().includes(query) ||
        doc.category.toLowerCase().includes(query) ||
        doc.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(doc => doc.category === selectedCategory);
    }

    setFilteredDocs(filtered);
  };

  const handleCreateNew = () => {
    setEditingDoc(null);
    setShowEditor(true);
  };

  const handleEdit = (doc: Documentation) => {
    setEditingDoc(doc);
    setShowEditor(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this documentation? This action cannot be undone.')) return;

    try {
      const { error } = await supabase
        .from('documentation')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setDocs(docs.filter(doc => doc.id !== id));
      toast({
        title: "Success",
        description: "Documentation deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting documentation:', error);
      toast({
        title: "Error",
        description: "Failed to delete documentation",
        variant: "destructive"
      });
    }
  };

  const togglePublished = async (doc: Documentation) => {
    try {
      const { error } = await supabase
        .from('documentation')
        .update({ published: !doc.published })
        .eq('id', doc.id);

      if (error) throw error;

      setDocs(docs.map(d => 
        d.id === doc.id ? { ...d, published: !d.published } : d
      ));

      toast({
        title: "Success",
        description: `Documentation ${!doc.published ? 'published' : 'unpublished'} successfully`
      });
    } catch (error) {
      console.error('Error updating documentation:', error);
      toast({
        title: "Error",
        description: "Failed to update documentation status",
        variant: "destructive"
      });
    }
  };

  const handleSaveDoc = async (docData: Partial<Documentation>) => {
    try {
      if (editingDoc) {
        const { error } = await supabase
          .from('documentation')
          .update(docData)
          .eq('id', editingDoc.id);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Documentation updated successfully"
        });
      } else {
        const { error } = await supabase
          .from('documentation')
          .insert([docData]);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Documentation created successfully"
        });
      }

      setShowEditor(false);
      setEditingDoc(null);
      fetchData();
    } catch (error) {
      console.error('Error saving documentation:', error);
      toast({
        title: "Error",
        description: "Failed to save documentation",
        variant: "destructive"
      });
    }
  };

  if (showEditor) {
    return (
      <DocumentationEditor
        doc={editingDoc}
        categories={categories}
        onSave={handleSaveDoc}
        onCancel={() => {
          setShowEditor(false);
          setEditingDoc(null);
        }}
      />
    );
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex justify-between items-center mb-6"
      >
        <h2 className="text-2xl font-semibold">Documentation Management</h2>
        <Button 
          onClick={handleCreateNew}
          className="bg-brandae-green text-brandae-dark hover:bg-brandae-green/90"
        >
          <Plus size={20} className="mr-2" />
          Create New Documentation
        </Button>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mb-6 space-y-4"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <Input
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-brandae-gray border-brandae-green/20 text-white"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 bg-brandae-gray border border-brandae-green/20 text-white rounded-md"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="text-gray-400">Loading documentation...</div>
        </div>
      ) : (
        <motion.div 
          className="grid gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {filteredDocs.length === 0 ? (
            <Card className="bg-brandae-gray border-brandae-green/20">
              <CardContent className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2 text-white">
                  {searchQuery || selectedCategory !== 'all' ? 'No matching documentation found' : 'No documentation yet'}
                </h3>
                <p className="text-gray-400 mb-4">
                  {searchQuery || selectedCategory !== 'all' 
                    ? 'Try adjusting your search or filters'
                    : 'Create your first documentation article to get started'
                  }
                </p>
                <Button onClick={handleCreateNew} className="bg-brandae-green text-brandae-dark hover:bg-brandae-green/90">
                  <Plus size={20} className="mr-2" />
                  {searchQuery || selectedCategory !== 'all' ? 'Create New' : 'Create Your First Article'}
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredDocs.map((doc, index) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="bg-brandae-gray border-brandae-green/20 hover:border-brandae-green/40 transition-colors">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-white mb-2">{doc.title}</CardTitle>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <Badge variant="outline" className="border-brandae-green/50 text-brandae-green">
                            {doc.category}
                          </Badge>
                          {doc.featured && (
                            <Badge className="bg-brandae-green/20 text-brandae-green">
                              Featured
                            </Badge>
                          )}
                          <Badge 
                            variant={doc.published ? "default" : "secondary"}
                            className={doc.published ? "bg-green-600" : "bg-gray-600"}
                          >
                            {doc.published ? "Published" : "Draft"}
                          </Badge>
                        </div>
                        <p className="text-gray-300 text-sm mb-2 line-clamp-2">{doc.excerpt}</p>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {doc.tags.slice(0, 5).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs bg-brandae-dark/50 text-gray-300">
                              #{tag}
                            </Badge>
                          ))}
                          {doc.tags.length > 5 && (
                            <Badge variant="secondary" className="text-xs bg-brandae-dark/50 text-gray-300">
                              +{doc.tags.length - 5} more
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-500 text-xs">
                          By {doc.author} • {new Date(doc.created_at).toLocaleDateString()} • 
                          {doc.reading_time ? ` ${doc.reading_time} min read •` : ''} {doc.views_count} views
                        </p>
                      </div>
                      {doc.featured_image_url && (
                        <img 
                          src={doc.featured_image_url} 
                          alt={doc.title}
                          className="w-24 h-16 object-cover rounded ml-4"
                        />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2 flex-wrap">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(doc)}
                        className="border-brandae-green/50 text-brandae-green hover:bg-brandae-green/10"
                      >
                        <Edit size={16} className="mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => togglePublished(doc)}
                        className="border-brandae-green/50 text-brandae-green hover:bg-brandae-green/10"
                      >
                        {doc.published ? <EyeOff size={16} className="mr-1" /> : <Eye size={16} className="mr-1" />}
                        {doc.published ? 'Unpublish' : 'Publish'}
                      </Button>
                      {doc.published && (
                        <Button
                          size="sm"
                          variant="outline"
                          asChild
                          className="border-brandae-green/50 text-brandae-green hover:bg-brandae-green/10"
                        >
                          <a href={`/docs/${doc.slug}`} target="_blank" rel="noopener noreferrer">
                            <ExternalLink size={16} className="mr-1" />
                            View
                          </a>
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(doc.id)}
                        className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 size={16} className="mr-1" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </motion.div>
      )}
    </div>
  );
};

export default DocumentationManager;
