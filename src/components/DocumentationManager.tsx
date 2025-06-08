
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, Search, Filter, BookOpen } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import DocumentationEditor from '@/components/DocumentationEditor';

interface Documentation {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
  reading_time: number;
  views_count: number;
  featured: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
}

const DocumentationManager = () => {
  const [docs, setDocs] = useState<Documentation[]>([]);
  const [filteredDocs, setFilteredDocs] = useState<Documentation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showEditor, setShowEditor] = useState(false);
  const [editingDoc, setEditingDoc] = useState<Documentation | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchDocumentation();
  }, []);

  useEffect(() => {
    filterDocumentation();
  }, [docs, searchTerm, filterCategory, filterStatus]);

  const fetchDocumentation = async () => {
    try {
      const { data, error } = await supabase
        .from('documentation')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setDocs(data || []);
      
      // Extract unique categories
      const uniqueCategories = [...new Set((data || []).map(doc => doc.category))];
      setCategories(uniqueCategories);
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

  const filterDocumentation = () => {
    let filtered = docs;

    if (searchTerm) {
      filtered = filtered.filter(doc => 
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (filterCategory) {
      filtered = filtered.filter(doc => doc.category === filterCategory);
    }

    if (filterStatus) {
      if (filterStatus === 'published') {
        filtered = filtered.filter(doc => doc.published);
      } else if (filterStatus === 'draft') {
        filtered = filtered.filter(doc => !doc.published);
      } else if (filterStatus === 'featured') {
        filtered = filtered.filter(doc => doc.featured);
      }
    }

    setFilteredDocs(filtered);
  };

  const handleCreateDoc = () => {
    setEditingDoc(null);
    setShowEditor(true);
  };

  const handleEditDoc = (doc: Documentation) => {
    setEditingDoc(doc);
    setShowEditor(true);
  };

  const handleDeleteDoc = async (docId: string) => {
    if (!confirm('Are you sure you want to delete this documentation?')) return;

    try {
      const { error } = await supabase
        .from('documentation')
        .delete()
        .eq('id', docId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Documentation deleted successfully"
      });

      fetchDocumentation();
    } catch (error) {
      console.error('Error deleting documentation:', error);
      toast({
        title: "Error",
        description: "Failed to delete documentation",
        variant: "destructive"
      });
    }
  };

  const handleSaveDoc = async (docData: Partial<Documentation>) => {
    try {
      if (editingDoc) {
        // Update existing documentation
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
        // Create new documentation
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
      fetchDocumentation();
    } catch (error) {
      console.error('Error saving documentation:', error);
      toast({
        title: "Error",
        description: "Failed to save documentation",
        variant: "destructive"
      });
    }
  };

  const handleCancelEdit = () => {
    setShowEditor(false);
    setEditingDoc(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (showEditor) {
    return (
      <DocumentationEditor
        doc={editingDoc}
        onSave={handleSaveDoc}
        onCancel={handleCancelEdit}
      />
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Documentation Manager</h1>
          <p className="text-gray-400">Create and manage documentation articles</p>
        </div>
        <Button
          onClick={handleCreateDoc}
          className="bg-brandae-green text-brandae-dark hover:bg-brandae-green/90"
        >
          <Plus size={20} className="mr-2" />
          Create Documentation
        </Button>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            placeholder="Search documentation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-brandae-gray border-brandae-green/20 text-white"
          />
        </div>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-3 py-2 bg-brandae-gray border border-brandae-green/20 text-white rounded-md"
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 bg-brandae-gray border border-brandae-green/20 text-white rounded-md"
        >
          <option value="">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="featured">Featured</option>
        </select>

        <div className="text-sm text-gray-400 flex items-center">
          <BookOpen size={16} className="mr-2" />
          {filteredDocs.length} documentation(s)
        </div>
      </motion.div>

      {/* Documentation List */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="text-gray-400">Loading documentation...</div>
        </div>
      ) : filteredDocs.length === 0 ? (
        <Card className="bg-brandae-gray border-brandae-green/20">
          <CardContent className="text-center py-12">
            <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-400 mb-4">
              {searchTerm || filterCategory || filterStatus 
                ? 'No documentation found matching your filters.' 
                : 'No documentation created yet.'
              }
            </p>
            {!searchTerm && !filterCategory && !filterStatus && (
              <Button
                onClick={handleCreateDoc}
                className="bg-brandae-green text-brandae-dark hover:bg-brandae-green/90"
              >
                <Plus size={20} className="mr-2" />
                Create Your First Documentation
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {filteredDocs.map((doc, index) => (
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
                      <p className="text-gray-300 text-sm mb-3">{doc.excerpt}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="outline" className="border-brandae-green/30 text-brandae-green">
                          {doc.category}
                        </Badge>
                        {doc.featured && (
                          <Badge className="bg-brandae-green text-brandae-dark">
                            Featured
                          </Badge>
                        )}
                        <Badge variant={doc.published ? "default" : "secondary"}>
                          {doc.published ? 'Published' : 'Draft'}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {doc.tags.slice(0, 3).map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs border-brandae-green/20 text-gray-400">
                            {tag}
                          </Badge>
                        ))}
                        {doc.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs border-brandae-green/20 text-gray-400">
                            +{doc.tags.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditDoc(doc)}
                        className="border-brandae-green/50 text-brandae-green hover:bg-brandae-green/10"
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteDoc(doc.id)}
                        className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex justify-between items-center text-sm text-gray-400">
                    <div className="flex items-center gap-4">
                      <span>📖 {doc.reading_time}m read</span>
                      <span>👁️ {doc.views_count} views</span>
                      <span>Created: {formatDate(doc.created_at)}</span>
                    </div>
                    <span>Updated: {formatDate(doc.updated_at)}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DocumentationManager;
