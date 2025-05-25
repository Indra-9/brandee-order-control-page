import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Eye, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';

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

interface BlogEditorProps {
  post?: BlogPost | null;
  onSave: (post: Partial<BlogPost>) => void;
  onCancel: () => void;
}

const categories = [
  "Cost Optimization",
  "Marketing", 
  "Technology",
  "Finance",
  "Getting Started",
  "Analytics"
];

const BlogEditor: React.FC<BlogEditorProps> = ({ post, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image_url: '',
    author: '',
    category: 'Technology',
    tags: '',
    read_time: '',
    featured: false,
    published: false
  });

  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt || '',
        content: post.content || '',
        image_url: post.image_url || '',
        author: post.author,
        category: post.category,
        tags: post.tags?.join(', ') || '',
        read_time: post.read_time || '',
        featured: post.featured,
        published: post.published
      });
    }
  }, [post]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const tagsArray = formData.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    onSave({
      title: formData.title,
      slug: formData.slug,
      excerpt: formData.excerpt,
      content: formData.content,
      image_url: formData.image_url,
      author: formData.author,
      category: formData.category,
      tags: tagsArray,
      read_time: formData.read_time,
      featured: formData.featured,
      published: formData.published
    });
  };

  if (showPreview) {
    return (
      <div className="min-h-screen bg-brandae-dark text-white">
        <SEO title="Blog Preview" description="Preview of blog post content" />
        <Navbar />
        
        <div className="pt-32 px-6 md:px-12 lg:px-24">
          <div className="container mx-auto max-w-4xl">
            <div className="flex justify-between items-center mb-8">
              <Button 
                onClick={() => setShowPreview(false)}
                variant="outline"
                className="border-brandae-green/50 text-brandae-green hover:bg-brandae-green/10"
              >
                <ArrowLeft size={20} className="mr-2" />
                Back to Editor
              </Button>
            </div>
            
            <article className="prose prose-invert max-w-none">
              {formData.image_url && (
                <img 
                  src={formData.image_url} 
                  alt={formData.title}
                  className="w-full h-64 object-cover rounded-lg mb-8"
                />
              )}
              
              <div className="flex gap-2 mb-4">
                <span className="px-3 py-1 bg-brandae-green/20 text-brandae-green rounded-full text-sm">
                  {formData.category}
                </span>
                {formData.featured && (
                  <span className="px-3 py-1 bg-brandae-green text-brandae-dark rounded-full text-sm">
                    Featured
                  </span>
                )}
              </div>
              
              <h1 className="text-4xl font-bold mb-4">{formData.title}</h1>
              
              <div className="flex items-center gap-4 text-gray-400 text-sm mb-8">
                <span>By {formData.author}</span>
                <span>•</span>
                <span>{formData.read_time}</span>
              </div>
              
              {formData.excerpt && (
                <p className="text-xl text-gray-300 mb-8 italic">
                  {formData.excerpt}
                </p>
              )}
              
              <div className="whitespace-pre-wrap text-gray-200 leading-relaxed">
                {formData.content}
              </div>
              
              {formData.tags && (
                <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-brandae-green/20">
                  {formData.tags.split(',').map(tag => tag.trim()).filter(Boolean).map(tag => (
                    <span key={tag} className="px-3 py-1 bg-brandae-gray text-gray-300 rounded-full text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </article>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brandae-dark text-white">
      <SEO title={post ? "Edit Blog Post" : "Create Blog Post"} description="Blog post editor for creating and editing content" />
      <Navbar />
      
      <div className="pt-32 px-6 md:px-12 lg:px-24">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold">
                {post ? 'Edit' : 'Create'} <span className="gradient-text">Blog Post</span>
              </h1>
              <div className="flex gap-3">
                <Button 
                  onClick={() => setShowPreview(true)}
                  variant="outline"
                  className="border-brandae-green/50 text-brandae-green hover:bg-brandae-green/10"
                >
                  <Eye size={20} className="mr-2" />
                  Preview
                </Button>
                <Button 
                  onClick={onCancel}
                  variant="outline"
                  className="border-gray-500 text-gray-400 hover:bg-gray-500/10"
                >
                  Cancel
                </Button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Card className="bg-brandae-gray border-brandae-green/20">
                <CardHeader>
                  <CardTitle className="text-white">Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title" className="text-gray-300">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="Enter blog post title"
                      required
                      className="bg-brandae-dark border-brandae-green/30 text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="slug" className="text-gray-300">Slug *</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                      placeholder="url-friendly-slug"
                      required
                      className="bg-brandae-dark border-brandae-green/30 text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="excerpt" className="text-gray-300">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      value={formData.excerpt}
                      onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                      placeholder="Brief description of the blog post"
                      rows={3}
                      className="bg-brandae-dark border-brandae-green/30 text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="content" className="text-gray-300">Content *</Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                      placeholder="Write your blog post content here..."
                      rows={12}
                      required
                      className="bg-brandae-dark border-brandae-green/30 text-white"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-brandae-gray border-brandae-green/20">
                <CardHeader>
                  <CardTitle className="text-white">Metadata</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="author" className="text-gray-300">Author *</Label>
                    <Input
                      id="author"
                      value={formData.author}
                      onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                      placeholder="Author name"
                      required
                      className="bg-brandae-dark border-brandae-green/30 text-white"
                    />
                  </div>

                  <div>
                    <Label className="text-gray-300">Category *</Label>
                    <RadioGroup
                      value={formData.category}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                      className="grid grid-cols-2 gap-4 mt-2"
                    >
                      {categories.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <RadioGroupItem 
                            value={category} 
                            id={category}
                            className="border-brandae-green text-brandae-green" 
                          />
                          <Label 
                            htmlFor={category} 
                            className="text-gray-300 text-sm cursor-pointer"
                          >
                            {category}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div>
                    <Label htmlFor="tags" className="text-gray-300">Tags</Label>
                    <Input
                      id="tags"
                      value={formData.tags}
                      onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                      placeholder="tag1, tag2, tag3"
                      className="bg-brandae-dark border-brandae-green/30 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="read_time" className="text-gray-300">Read Time</Label>
                      <Input
                        id="read_time"
                        value={formData.read_time}
                        onChange={(e) => setFormData(prev => ({ ...prev, read_time: e.target.value }))}
                        placeholder="5 min read"
                        className="bg-brandae-dark border-brandae-green/30 text-white"
                      />
                    </div>

                    <div>
                      <Label htmlFor="image_url" className="text-gray-300">Image URL</Label>
                      <Input
                        id="image_url"
                        value={formData.image_url}
                        onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                        placeholder="https://example.com/image.jpg"
                        className="bg-brandae-dark border-brandae-green/30 text-white"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-brandae-gray border-brandae-green/20">
                <CardHeader>
                  <CardTitle className="text-white">Publishing Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={formData.featured}
                      onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                      className="rounded border-brandae-green/30"
                    />
                    <Label htmlFor="featured" className="text-gray-300">
                      Featured Post
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="published"
                      checked={formData.published}
                      onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
                      className="rounded border-brandae-green/30"
                    />
                    <Label htmlFor="published" className="text-gray-300">
                      Publish immediately
                    </Label>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button 
                  type="submit"
                  className="bg-brandae-green text-brandae-dark hover:bg-brandae-green/90"
                >
                  <Save size={20} className="mr-2" />
                  {post ? 'Update Post' : 'Create Post'}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BlogEditor;
