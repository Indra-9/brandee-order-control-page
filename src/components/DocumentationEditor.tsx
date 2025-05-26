
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Eye, Upload, X, Plus, Youtube, Image, FileText } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

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

interface DocumentationEditorProps {
  doc: Documentation | null;
  categories: DocCategory[];
  onSave: (data: Partial<Documentation>) => void;
  onCancel: () => void;
}

const DocumentationEditor: React.FC<DocumentationEditorProps> = ({
  doc,
  categories,
  onSave,
  onCancel
}) => {
  const [isPreview, setIsPreview] = useState(false);
  const [tags, setTags] = useState<string[]>(doc?.tags || []);
  const [newTag, setNewTag] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const { toast } = useToast();

  const { register, handleSubmit, control, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      title: doc?.title || '',
      slug: doc?.slug || '',
      meta_title: doc?.meta_title || '',
      meta_description: doc?.meta_description || '',
      excerpt: doc?.excerpt || '',
      content: doc?.content || '',
      featured_image_url: doc?.featured_image_url || '',
      category: doc?.category || categories[0]?.name || '',
      author: doc?.author || 'Admin',
      featured: doc?.featured || false,
      published: doc?.published || false,
      seo_keywords: doc?.seo_keywords || '',
      canonical_url: doc?.canonical_url || '',
      reading_time: doc?.reading_time || null,
      sort_order: doc?.sort_order || 0,
    }
  });

  const title = watch('title');
  const content = watch('content');

  // Auto-generate slug from title
  useEffect(() => {
    if (title && !doc) {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .trim();
      setValue('slug', slug);
    }
  }, [title, setValue, doc]);

  // Auto-calculate reading time
  useEffect(() => {
    if (content) {
      const wordCount = content.split(/\s+/).length;
      const readingTime = Math.ceil(wordCount / 200); // Average reading speed
      setValue('reading_time', readingTime);
    }
  }, [content, setValue]);

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const insertYouTube = () => {
    if (youtubeUrl) {
      const currentContent = watch('content') || '';
      const youtubeEmbed = `\n\n[youtube]${youtubeUrl}[/youtube]\n\n`;
      setValue('content', currentContent + youtubeEmbed);
      setYoutubeUrl('');
      toast({
        title: "Success",
        description: "YouTube video added to content"
      });
    }
  };

  const onSubmit = (data: any) => {
    const docData = {
      ...data,
      tags,
      meta_title: data.meta_title || data.title,
      meta_description: data.meta_description || data.excerpt,
    };

    onSave(docData);
  };

  const renderPreview = () => {
    const formData = watch();
    return (
      <div className="bg-brandae-dark text-white p-6 rounded-lg">
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-4">{formData.title}</h1>
          {formData.excerpt && (
            <p className="text-xl text-gray-300 mb-4">{formData.excerpt}</p>
          )}
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="outline" className="border-brandae-green/50 text-brandae-green">
              {formData.category}
            </Badge>
            {formData.featured && (
              <Badge className="bg-brandae-green/20 text-brandae-green">Featured</Badge>
            )}
            {tags.map(tag => (
              <Badge key={tag} variant="secondary" className="bg-brandae-gray text-gray-300">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
        
        {formData.featured_image_url && (
          <img 
            src={formData.featured_image_url} 
            alt={formData.title}
            className="w-full aspect-video object-cover rounded-lg mb-6"
          />
        )}
        
        <div 
          className="article-content prose prose-invert prose-brandae max-w-none"
          dangerouslySetInnerHTML={{ __html: formData.content || '' }}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-brandae-dark text-white p-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={onCancel}
              className="border-brandae-green/50 text-brandae-green hover:bg-brandae-green/10"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-bold">
              {doc ? 'Edit Documentation' : 'Create New Documentation'}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setIsPreview(!isPreview)}
              className="border-brandae-green/50 text-brandae-green hover:bg-brandae-green/10"
            >
              <Eye size={20} className="mr-2" />
              {isPreview ? 'Edit' : 'Preview'}
            </Button>
            <Button
              onClick={handleSubmit(onSubmit)}
              className="bg-brandae-green text-brandae-dark hover:bg-brandae-green/90"
            >
              <Save size={20} className="mr-2" />
              {doc ? 'Update' : 'Create'}
            </Button>
          </div>
        </div>

        {isPreview ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {renderPreview()}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid lg:grid-cols-3 gap-8"
          >
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-brandae-gray border-brandae-green/20">
                <CardHeader>
                  <CardTitle className="text-white">Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title" className="text-white">Title *</Label>
                    <Input
                      id="title"
                      {...register('title', { required: 'Title is required' })}
                      className="bg-brandae-dark border-brandae-green/20 text-white"
                      placeholder="Enter documentation title"
                    />
                    {errors.title && (
                      <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="slug" className="text-white">Slug *</Label>
                    <Input
                      id="slug"
                      {...register('slug', { required: 'Slug is required' })}
                      className="bg-brandae-dark border-brandae-green/20 text-white"
                      placeholder="url-friendly-slug"
                    />
                    {errors.slug && (
                      <p className="text-red-400 text-sm mt-1">{errors.slug.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="excerpt" className="text-white">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      {...register('excerpt')}
                      className="bg-brandae-dark border-brandae-green/20 text-white"
                      placeholder="Brief description of the documentation"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="featured_image_url" className="text-white">Featured Image URL</Label>
                    <Input
                      id="featured_image_url"
                      {...register('featured_image_url')}
                      className="bg-brandae-dark border-brandae-green/20 text-white"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-brandae-gray border-brandae-green/20">
                <CardHeader>
                  <CardTitle className="text-white">Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* YouTube Embed Tool */}
                  <div className="border border-brandae-green/20 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                      <Youtube size={20} className="text-red-500" />
                      Add YouTube Video
                    </h4>
                    <div className="flex gap-2">
                      <Input
                        value={youtubeUrl}
                        onChange={(e) => setYoutubeUrl(e.target.value)}
                        placeholder="YouTube URL"
                        className="bg-brandae-dark border-brandae-green/20 text-white"
                      />
                      <Button
                        type="button"
                        onClick={insertYouTube}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Add
                      </Button>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      Paste a YouTube URL and click Add to embed it in your content
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="content" className="text-white">Content (HTML) *</Label>
                    <Textarea
                      id="content"
                      {...register('content', { required: 'Content is required' })}
                      className="bg-brandae-dark border-brandae-green/20 text-white font-mono"
                      placeholder="Enter HTML content..."
                      rows={20}
                    />
                    {errors.content && (
                      <p className="text-red-400 text-sm mt-1">{errors.content.message}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-1">
                      You can use HTML tags. YouTube videos: [youtube]URL[/youtube]
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="bg-brandae-gray border-brandae-green/20">
                <CardHeader>
                  <CardTitle className="text-white">Publishing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="category" className="text-white">Category *</Label>
                    <select
                      {...register('category', { required: 'Category is required' })}
                      className="w-full p-2 bg-brandae-dark border border-brandae-green/20 text-white rounded-md"
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="author" className="text-white">Author</Label>
                    <Input
                      id="author"
                      {...register('author')}
                      className="bg-brandae-dark border-brandae-green/20 text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="sort_order" className="text-white">Sort Order</Label>
                    <Input
                      id="sort_order"
                      type="number"
                      {...register('sort_order')}
                      className="bg-brandae-dark border-brandae-green/20 text-white"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="featured" className="text-white">Featured</Label>
                    <Controller
                      name="featured"
                      control={control}
                      render={({ field }) => (
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="published" className="text-white">Published</Label>
                    <Controller
                      name="published"
                      control={control}
                      render={({ field }) => (
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-brandae-gray border-brandae-green/20">
                <CardHeader>
                  <CardTitle className="text-white">Tags</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Add tag"
                      className="bg-brandae-dark border-brandae-green/20 text-white"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    />
                    <Button
                      type="button"
                      onClick={addTag}
                      className="bg-brandae-green text-brandae-dark hover:bg-brandae-green/90"
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-brandae-dark text-gray-300 pr-1"
                      >
                        #{tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1 hover:text-red-400"
                        >
                          <X size={12} />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-brandae-gray border-brandae-green/20">
                <CardHeader>
                  <CardTitle className="text-white">SEO Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="meta_title" className="text-white">Meta Title</Label>
                    <Input
                      id="meta_title"
                      {...register('meta_title')}
                      className="bg-brandae-dark border-brandae-green/20 text-white"
                      placeholder="Leave empty to use title"
                    />
                  </div>

                  <div>
                    <Label htmlFor="meta_description" className="text-white">Meta Description</Label>
                    <Textarea
                      id="meta_description"
                      {...register('meta_description')}
                      className="bg-brandae-dark border-brandae-green/20 text-white"
                      placeholder="Leave empty to use excerpt"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="seo_keywords" className="text-white">SEO Keywords</Label>
                    <Input
                      id="seo_keywords"
                      {...register('seo_keywords')}
                      className="bg-brandae-dark border-brandae-green/20 text-white"
                      placeholder="comma, separated, keywords"
                    />
                  </div>

                  <div>
                    <Label htmlFor="canonical_url" className="text-white">Canonical URL</Label>
                    <Input
                      id="canonical_url"
                      {...register('canonical_url')}
                      className="bg-brandae-dark border-brandae-green/20 text-white"
                      placeholder="https://example.com/canonical-url"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DocumentationEditor;
