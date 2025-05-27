
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, X, Eye, Upload, Youtube, Link2, Image as ImageIcon } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';

interface Documentation {
  id?: string;
  title: string;
  slug: string;
  meta_title: string;
  meta_description: string;
  excerpt: string;
  content: string;
  featured_image_url: string;
  category: string;
  tags: string[];
  author: string;
  featured: boolean;
  published: boolean;
  seo_keywords: string;
  canonical_url: string;
  reading_time: number;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface DocumentationEditorProps {
  doc?: Documentation | null;
  onSave: (docData: Partial<Documentation>) => Promise<void>;
  onCancel: () => void;
}

const DocumentationEditor: React.FC<DocumentationEditorProps> = ({
  doc,
  onSave,
  onCancel
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const { toast } = useToast();

  const form = useForm<Documentation>({
    defaultValues: {
      title: doc?.title || '',
      slug: doc?.slug || '',
      meta_title: doc?.meta_title || '',
      meta_description: doc?.meta_description || '',
      excerpt: doc?.excerpt || '',
      content: doc?.content || '',
      featured_image_url: doc?.featured_image_url || '',
      category: doc?.category || '',
      tags: doc?.tags || [],
      author: doc?.author || 'Admin',
      featured: doc?.featured || false,
      published: doc?.published || false,
      seo_keywords: doc?.seo_keywords || '',
      canonical_url: doc?.canonical_url || '',
      reading_time: doc?.reading_time || 5,
    }
  });

  const { watch, setValue, getValues } = form;
  const watchedTitle = watch('title');
  const watchedTags = watch('tags');

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (watchedTitle && !doc) {
      const slug = watchedTitle
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
      setValue('slug', slug);
      setValue('meta_title', `${watchedTitle} - Brandae Documentation`);
    }
  }, [watchedTitle, doc, setValue]);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('doc_categories')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !watchedTags.includes(tagInput.trim())) {
      setValue('tags', [...watchedTags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setValue('tags', watchedTags.filter(tag => tag !== tagToRemove));
  };

  const insertYouTube = () => {
    const videoId = prompt('Enter YouTube video ID:');
    if (videoId) {
      const currentContent = getValues('content');
      setValue('content', currentContent + `\n[youtube]${videoId}[/youtube]\n`);
    }
  };

  const insertImage = () => {
    const imageUrl = prompt('Enter image URL:');
    if (imageUrl) {
      const currentContent = getValues('content');
      setValue('content', currentContent + `\n[image]${imageUrl}[/image]\n`);
    }
  };

  const estimateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  const onSubmit = async (data: Documentation) => {
    setIsLoading(true);
    try {
      const readingTime = estimateReadingTime(data.content);
      await onSave({
        ...data,
        reading_time: readingTime,
      });
    } catch (error) {
      console.error('Error saving documentation:', error);
      toast({
        title: "Error",
        description: "Failed to save documentation",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const processContent = (content: string) => {
    let processedContent = content.replace(
      /\[youtube\](.*?)\[\/youtube\]/g,
      '<div class="youtube-container"><iframe src="https://www.youtube.com/embed/$1" frameborder="0" allowfullscreen></iframe></div>'
    );

    processedContent = processedContent.replace(
      /\[image\](.*?)\[\/image\]/g,
      '<img src="$1" alt="Documentation image" class="doc-image" />'
    );

    return processedContent;
  };

  return (
    <div className="min-h-screen bg-brandae-dark text-white">
      <div className="pt-8 px-6 md:px-12 lg:px-24">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-between items-center mb-8"
          >
            <h1 className="text-4xl font-bold">
              {doc ? 'Edit' : 'Create'} <span className="gradient-text">Documentation</span>
            </h1>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setPreviewMode(!previewMode)}
                className="border-brandae-green/50 text-brandae-green hover:bg-brandae-green/10"
              >
                <Eye size={20} className="mr-2" />
                {previewMode ? 'Edit' : 'Preview'}
              </Button>
              <Button
                variant="outline"
                onClick={onCancel}
                className="border-white/20 text-white hover:bg-white/10"
              >
                <X size={20} className="mr-2" />
                Cancel
              </Button>
            </div>
          </motion.div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {!previewMode ? (
                <Tabs defaultValue="content" className="w-full">
                  <TabsList className="bg-brandae-gray/50 border border-white/10 mb-8">
                    <TabsTrigger value="content" className="data-[state=active]:bg-brandae-green/20">
                      Content
                    </TabsTrigger>
                    <TabsTrigger value="seo" className="data-[state=active]:bg-brandae-green/20">
                      SEO & Meta
                    </TabsTrigger>
                    <TabsTrigger value="settings" className="data-[state=active]:bg-brandae-green/20">
                      Settings
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="content" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Title *</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                className="bg-brandae-gray border-brandae-green/20 focus:border-brandae-green text-white"
                                placeholder="Enter documentation title"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="slug"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Slug *</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                className="bg-brandae-gray border-brandae-green/20 focus:border-brandae-green text-white"
                                placeholder="url-friendly-slug"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="excerpt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Excerpt</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              rows={3}
                              className="bg-brandae-gray border-brandae-green/20 focus:border-brandae-green text-white"
                              placeholder="Brief description of the article"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div>
                      <Label className="text-white mb-2 block">Content Toolbar</Label>
                      <div className="flex gap-2 mb-4">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={insertYouTube}
                          className="border-brandae-green/50 text-brandae-green hover:bg-brandae-green/10"
                        >
                          <Youtube size={16} className="mr-1" />
                          YouTube
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={insertImage}
                          className="border-brandae-green/50 text-brandae-green hover:bg-brandae-green/10"
                        >
                          <ImageIcon size={16} className="mr-1" />
                          Image
                        </Button>
                      </div>
                    </div>

                    <FormField
                      control={form.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Content *</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              rows={20}
                              className="bg-brandae-gray border-brandae-green/20 focus:border-brandae-green text-white font-mono"
                              placeholder="Write your documentation content here. You can use HTML tags and special media embeds."
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div>
                      <Label className="text-white mb-2 block">Tags</Label>
                      <div className="flex gap-2 mb-2">
                        <Input
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                          className="bg-brandae-gray border-brandae-green/20 focus:border-brandae-green text-white"
                          placeholder="Add a tag and press Enter"
                        />
                        <Button
                          type="button"
                          onClick={addTag}
                          variant="outline"
                          className="border-brandae-green/50 text-brandae-green hover:bg-brandae-green/10"
                        >
                          Add
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {watchedTags.map((tag, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="border-brandae-green/50 text-brandae-green cursor-pointer"
                            onClick={() => removeTag(tag)}
                          >
                            {tag} ×
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="seo" className="space-y-6">
                    <FormField
                      control={form.control}
                      name="meta_title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Meta Title</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="bg-brandae-gray border-brandae-green/20 focus:border-brandae-green text-white"
                              placeholder="SEO optimized title"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="meta_description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Meta Description</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              rows={3}
                              className="bg-brandae-gray border-brandae-green/20 focus:border-brandae-green text-white"
                              placeholder="SEO meta description (150-160 characters)"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="seo_keywords"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">SEO Keywords</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="bg-brandae-gray border-brandae-green/20 focus:border-brandae-green text-white"
                              placeholder="keyword1, keyword2, keyword3"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="canonical_url"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Canonical URL</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="bg-brandae-gray border-brandae-green/20 focus:border-brandae-green text-white"
                              placeholder="https://brandae.com/docs/article-slug"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="featured_image_url"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Featured Image URL</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="bg-brandae-gray border-brandae-green/20 focus:border-brandae-green text-white"
                              placeholder="https://example.com/image.jpg"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>

                  <TabsContent value="settings" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Category *</FormLabel>
                            <FormControl>
                              <select
                                {...field}
                                className="w-full p-3 bg-brandae-gray border border-brandae-green/20 focus:border-brandae-green text-white rounded-md"
                              >
                                <option value="">Select Category</option>
                                {categories.map((category) => (
                                  <option key={category.id} value={category.name}>
                                    {category.name}
                                  </option>
                                ))}
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="author"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Author</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                className="bg-brandae-gray border-brandae-green/20 focus:border-brandae-green text-white"
                                placeholder="Author name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="featured"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3">
                            <FormControl>
                              <input
                                type="checkbox"
                                checked={field.value}
                                onChange={field.onChange}
                                className="w-4 h-4 text-brandae-green bg-brandae-gray border-brandae-green/20 rounded focus:ring-brandae-green"
                              />
                            </FormControl>
                            <FormLabel className="text-white">Featured Article</FormLabel>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="published"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3">
                            <FormControl>
                              <input
                                type="checkbox"
                                checked={field.value}
                                onChange={field.onChange}
                                className="w-4 h-4 text-brandae-green bg-brandae-gray border-brandae-green/20 rounded focus:ring-brandae-green"
                              />
                            </FormControl>
                            <FormLabel className="text-white">Published</FormLabel>
                          </FormItem>
                        )}
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              ) : (
                // Preview Mode
                <Card className="bg-brandae-gray border-brandae-green/20">
                  <CardHeader>
                    <CardTitle className="gradient-text">{watch('title') || 'Preview Title'}</CardTitle>
                    {watch('excerpt') && (
                      <p className="text-gray-300">{watch('excerpt')}</p>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div 
                      className="prose prose-invert prose-lg max-w-none"
                      dangerouslySetInnerHTML={{ __html: processContent(watch('content') || '') }}
                    />
                  </CardContent>
                </Card>
              )}

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-brandae-green text-brandae-dark hover:bg-brandae-green/90"
                >
                  <Save size={20} className="mr-2" />
                  {isLoading ? 'Saving...' : 'Save Documentation'}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default DocumentationEditor;
