import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, EyeOff, LogOut, Users, Settings as SettingsIcon, FileText, BookOpen } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import BlogEditor from '@/components/BlogEditor';
import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import AuthWrapper from '@/components/AuthWrapper';
import ContactSubmissions from '@/components/ContactSubmissions';
import WebhookManager from '@/components/WebhookManager';
import CaseStudyManager from '@/components/CaseStudyManager';
import DocumentationManager from '@/components/DocumentationManager';
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
const AdminContent = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [activeTab, setActiveTab] = useState('blog');
  const {
    toast
  } = useToast();
  useEffect(() => {
    fetchPosts();
  }, []);
  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Success",
        description: "Signed out successfully"
      });
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive"
      });
    }
  };
  const fetchPosts = async () => {
    try {
      const {
        data,
        error
      } = await supabase.from('blog_posts').select('*').order('created_at', {
        ascending: false
      });
      if (error) throw error;
      setPosts(data || []);
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
  const handleCreateNew = () => {
    setEditingPost(null);
    setShowEditor(true);
  };
  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setShowEditor(true);
  };
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    try {
      const {
        error
      } = await supabase.from('blog_posts').delete().eq('id', id);
      if (error) throw error;
      setPosts(posts.filter(post => post.id !== id));
      toast({
        title: "Success",
        description: "Blog post deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting post:', error);
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive"
      });
    }
  };
  const togglePublished = async (post: BlogPost) => {
    try {
      const {
        error
      } = await supabase.from('blog_posts').update({
        published: !post.published
      }).eq('id', post.id);
      if (error) throw error;
      setPosts(posts.map(p => p.id === post.id ? {
        ...p,
        published: !p.published
      } : p));
      toast({
        title: "Success",
        description: `Post ${!post.published ? 'published' : 'unpublished'} successfully`
      });
    } catch (error) {
      console.error('Error updating post:', error);
      toast({
        title: "Error",
        description: "Failed to update post status",
        variant: "destructive"
      });
    }
  };
  const handleSavePost = async (postData: Partial<BlogPost>) => {
    try {
      if (editingPost) {
        const {
          error
        } = await supabase.from('blog_posts').update(postData).eq('id', editingPost.id);
        if (error) throw error;
        toast({
          title: "Success",
          description: "Blog post updated successfully"
        });
      } else {
        const {
          error
        } = await supabase.from('blog_posts').insert([postData]);
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
  if (showEditor) {
    return <BlogEditor post={editingPost} onSave={handleSavePost} onCancel={() => {
      setShowEditor(false);
      setEditingPost(null);
    }} />;
  }
  return <div className="min-h-screen bg-brandae-dark text-white">
      <SEO title="Admin Dashboard - Brandae" description="Manage your blog posts and content" />
      
      <Navbar />
      
      <div className="pt-32 px-6 md:px-12 lg:px-24">
        <div className="container mx-auto rounded">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">
              Admin <span className="gradient-text">Dashboard</span>
            </h1>
            <Button onClick={handleSignOut} variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded">
              <LogOut size={20} className="mr-2" />
              Sign Out
            </Button>
          </motion.div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-brandae-gray/50 border border-white/10 mb-8">
              <TabsTrigger value="blog" className="data-[state=active]:bg-brandae-green/20 rounded">
                <Edit className="mr-2 h-4 w-4" />
                Blog Posts
              </TabsTrigger>
              <TabsTrigger value="docs" className="data-[state=active]:bg-brandae-green/20">
                <BookOpen className="mr-2 h-4 w-4" />
                Documentation
              </TabsTrigger>
              <TabsTrigger value="case-studies" className="data-[state=active]:bg-brandae-green/20">
                <FileText className="mr-2 h-4 w-4" />
                Case Studies
              </TabsTrigger>
              <TabsTrigger value="contacts" className="data-[state=active]:bg-brandae-green/20">
                <Users className="mr-2 h-4 w-4" />
                Contact Submissions
              </TabsTrigger>
              <TabsTrigger value="webhooks" className="data-[state=active]:bg-brandae-green/20">
                <SettingsIcon className="mr-2 h-4 w-4" />
                Webhook Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="blog">
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.4
            }} className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Blog Management</h2>
                <Button onClick={handleCreateNew} className="bg-brandae-green text-brandae-dark hover:bg-brandae-green/90 rounded">
                  <Plus size={20} className="mr-2" />
                  Create New Post
                </Button>
              </motion.div>

              {isLoading ? <div className="text-center py-12">
                  <div className="text-gray-400">Loading posts...</div>
                </div> : <motion.div className="grid gap-6" initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }} transition={{
              duration: 0.6,
              delay: 0.2
            }}>
                  {posts.length === 0 ? <Card className="bg-brandae-gray border-brandae-green/20">
                      <CardContent className="text-center py-12">
                        <h3 className="text-xl font-semibold mb-2 text-white">No blog posts yet</h3>
                        <p className="text-gray-400 mb-4">Create your first blog post to get started</p>
                        <Button onClick={handleCreateNew} className="bg-brandae-green text-brandae-dark hover:bg-brandae-green/90">
                          <Plus size={20} className="mr-2" />
                          Create Your First Post
                        </Button>
                      </CardContent>
                    </Card> : posts.map((post, index) => <motion.div key={post.id} initial={{
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
                          <CardHeader className="rounded">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <CardTitle className="text-white mb-2">{post.title}</CardTitle>
                                <div className="flex flex-wrap gap-2 mb-2">
                                  <Badge variant="outline" className="border-brandae-green/50 text-brandae-green">
                                    {post.category}
                                  </Badge>
                                  {post.featured && <Badge className="bg-brandae-green/20 text-brandae-green">
                                      Featured
                                    </Badge>}
                                  <Badge variant={post.published ? "default" : "secondary"} className={post.published ? "bg-green-600" : "bg-gray-600"}>
                                    {post.published ? "Published" : "Draft"}
                                  </Badge>
                                </div>
                                <p className="text-gray-300 text-sm mb-2">{post.excerpt}</p>
                                <p className="text-gray-500 text-xs">
                                  By {post.author} • {new Date(post.created_at).toLocaleDateString()}
                                </p>
                              </div>
                              {post.image_url && <img src={post.image_url} alt={post.title} className="w-24 h-16 object-cover rounded ml-4" />}
                            </div>
                          </CardHeader>
                          <CardContent className="rounded">
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" onClick={() => handleEdit(post)} className="border-brandae-green/50 text-brandae-green hover:bg-brandae-green/10 rounded-4px rounded">
                                <Edit size={16} className="mr-1" />
                                Edit
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => togglePublished(post)} className="border-brandae-green/50 text-brandae-green hover:bg-brandae-green/10 rounded">
                                {post.published ? <EyeOff size={16} className="mr-1" /> : <Eye size={16} className="mr-1" />}
                                {post.published ? 'Unpublish' : 'Publish'}
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => handleDelete(post.id)} className="border-red-500/50 text-red-400 hover:bg-red-500/10 rounded">
                                <Trash2 size={16} className="mr-1" />
                                Delete
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>)}
                </motion.div>}
            </TabsContent>

            <TabsContent value="docs">
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.4
            }}>
                <DocumentationManager />
              </motion.div>
            </TabsContent>

            <TabsContent value="case-studies">
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.4
            }}>
                <CaseStudyManager />
              </motion.div>
            </TabsContent>

            <TabsContent value="contacts">
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.4
            }}>
                <ContactSubmissions />
              </motion.div>
            </TabsContent>

            <TabsContent value="webhooks">
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.4
            }}>
                <WebhookManager />
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>;
};
const Admin = () => {
  return <AuthWrapper>
      <AdminContent />
    </AuthWrapper>;
};
export default Admin;