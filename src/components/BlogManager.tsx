import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Search, Filter, Star, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import BlogEditor from './BlogEditor';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string;
  author: string;
  category: string;
  tags: string[];
  read_time: string;
  featured: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
}

const BlogManager = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [showCategoryManager, setShowCategoryManager] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    filterPosts();
  }, [posts, searchTerm, categoryFilter, statusFilter]);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setPosts(data || []);
      
      // Extract unique categories
      const uniqueCategories = [...new Set(data?.map(post => post.category) || [])];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast({
        title: "Error",
        description: "Failed to fetch blog posts",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filterPosts = () => {
    let filtered = posts;

    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(post => post.category === categoryFilter);
    }

    if (statusFilter === 'published') {
      filtered = filtered.filter(post => post.published);
    } else if (statusFilter === 'draft') {
      filtered = filtered.filter(post => !post.published);
    } else if (statusFilter === 'featured') {
      filtered = filtered.filter(post => post.featured);
    }

    setFilteredPosts(filtered);
  };

  const handleCreatePost = () => {
    setEditingPost(null);
    setShowEditor(true);
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setShowEditor(true);
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', postId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Blog post deleted successfully"
      });

      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive"
      });
    }
  };

  const handleToggleFeatured = async (post: BlogPost) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({ featured: !post.featured })
        .eq('id', post.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Post ${!post.featured ? 'featured' : 'unfeatured'} successfully`
      });

      fetchPosts();
    } catch (error) {
      console.error('Error updating featured status:', error);
      toast({
        title: "Error",
        description: "Failed to update featured status",
        variant: "destructive"
      });
    }
  };

  const handleTogglePublished = async (post: BlogPost) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({ published: !post.published })
        .eq('id', post.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Post ${!post.published ? 'published' : 'unpublished'} successfully`
      });

      fetchPosts();
    } catch (error) {
      console.error('Error updating published status:', error);
      toast({
        title: "Error",
        description: "Failed to update published status",
        variant: "destructive"
      });
    }
  };

  const handleSavePost = async (postData: Partial<BlogPost>) => {
    try {
      if (editingPost) {
        // Update existing post
        const { error } = await supabase
          .from('blog_posts')
          .update({ ...postData, updated_at: new Date().toISOString() })
          .eq('id', editingPost.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Blog post updated successfully"
        });
      } else {
        // Create new post
        const { error } = await supabase
          .from('blog_posts')
          .insert([postData]);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Blog post created successfully"
        });
      }

      setShowEditor(false);
      setEditingPost(null);
      fetchPosts();
    } catch (error) {
      console.error('Error saving post:', error);
      toast({
        title: "Error",
        description: "Failed to save blog post",
        variant: "destructive"
      });
    }
  };

  const handleCancelEdit = () => {
    setShowEditor(false);
    setEditingPost(null);
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
      <BlogEditor
        post={editingPost}
        onSave={handleSavePost}
        onCancel={handleCancelEdit}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Blog Management</h1>
          <p className="text-gray-400 mt-1">Create and manage blog posts</p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => setShowCategoryManager(!showCategoryManager)}
            variant="outline"
            className="border-brandae-green/50 text-brandae-green hover:bg-brandae-green/10"
          >
            <Filter className="w-4 h-4 mr-2" />
            Categories
          </Button>
          <Button
            onClick={handleCreatePost}
            className="bg-brandae-green text-brandae-dark hover:bg-brandae-green/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Post
          </Button>
        </div>
      </div>

      {/* Category Manager */}
      {showCategoryManager && (
        <Card className="bg-brandae-gray border-brandae-green/20">
          <CardHeader>
            <CardTitle className="text-brandae-green">Blog Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {categories.map((category, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-brandae-green/20 text-brandae-green"
                  >
                    {category}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-gray-400">
                Categories are automatically created when you add them to blog posts.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card className="bg-brandae-gray border-brandae-green/20">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-brandae-dark border-brandae-green/30 text-white"
                />
              </div>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48 bg-brandae-dark border-brandae-green/30 text-white">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48 bg-brandae-dark border-brandae-green/30 text-white">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Posts</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Drafts</SelectItem>
                <SelectItem value="featured">Featured</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Posts Table */}
      <Card className="bg-brandae-gray border-brandae-green/20">
        <CardHeader>
          <CardTitle className="text-brandae-green">
            Blog Posts ({filteredPosts.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-brandae-dark/50 rounded animate-pulse" />
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              No blog posts found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-brandae-green/20">
                    <TableHead className="text-brandae-green">Title</TableHead>
                    <TableHead className="text-brandae-green">Author</TableHead>
                    <TableHead className="text-brandae-green">Category</TableHead>
                    <TableHead className="text-brandae-green">Status</TableHead>
                    <TableHead className="text-brandae-green">Created</TableHead>
                    <TableHead className="text-brandae-green">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPosts.map((post) => (
                    <TableRow key={post.id} className="border-brandae-green/10">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div>
                            <div className="font-medium text-white">{post.title}</div>
                            <div className="text-sm text-gray-400 truncate max-w-xs">
                              {post.excerpt}
                            </div>
                          </div>
                          {post.featured && (
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-300">{post.author}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-brandae-green/20 text-brandae-green">
                          {post.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Badge
                            variant={post.published ? "default" : "secondary"}
                            className={post.published 
                              ? "bg-green-500/20 text-green-400" 
                              : "bg-gray-500/20 text-gray-400"
                            }
                          >
                            {post.published ? 'Published' : 'Draft'}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {formatDate(post.created_at)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleToggleFeatured(post)}
                            className="text-yellow-500 hover:bg-yellow-500/10"
                          >
                            <Star className={`w-4 h-4 ${post.featured ? 'fill-current' : ''}`} />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleTogglePublished(post)}
                            className={post.published 
                              ? "text-gray-400 hover:bg-gray-500/10" 
                              : "text-green-400 hover:bg-green-500/10"
                            }
                          >
                            {post.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEditPost(post)}
                            className="text-brandae-green hover:bg-brandae-green/10"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeletePost(post.id)}
                            className="text-red-400 hover:bg-red-500/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BlogManager;