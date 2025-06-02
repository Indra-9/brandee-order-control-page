
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

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
  meta_title: string;
  meta_description: string;
  seo_keywords: string;
}

interface IntegrationEditorProps {
  integration: Integration | null;
  onSave: (data: Partial<Integration>) => Promise<void>;
  onCancel: () => void;
}

interface FormData {
  name: string;
  slug: string;
  description: string;
  detailed_description: string;
  logo_url: string;
  category: string;
  website_url: string;
  documentation_url: string;
  pricing_info: string;
  features: string;
  supported_platforms: string;
  integration_type: string;
  difficulty_level: string;
  setup_time: string;
  is_featured: boolean;
  is_active: boolean;
  meta_title: string;
  meta_description: string;
  seo_keywords: string;
}

const IntegrationEditor: React.FC<IntegrationEditorProps> = ({ integration, onSave, onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm<FormData>({
    defaultValues: {
      name: integration?.name || '',
      slug: integration?.slug || '',
      description: integration?.description || '',
      detailed_description: integration?.detailed_description || '',
      logo_url: integration?.logo_url || '',
      category: integration?.category || '',
      website_url: integration?.website_url || '',
      documentation_url: integration?.documentation_url || '',
      pricing_info: integration?.pricing_info || '',
      features: integration?.features?.join('\n') || '',
      supported_platforms: integration?.supported_platforms?.join('\n') || '',
      integration_type: integration?.integration_type || 'api',
      difficulty_level: integration?.difficulty_level || 'medium',
      setup_time: integration?.setup_time || '',
      is_featured: integration?.is_featured || false,
      is_active: integration?.is_active !== false,
      meta_title: integration?.meta_title || '',
      meta_description: integration?.meta_description || '',
      seo_keywords: integration?.seo_keywords || ''
    }
  });

  const watchedName = watch('name');

  useEffect(() => {
    if (watchedName && !integration) {
      const slug = watchedName
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setValue('slug', slug);
    }
  }, [watchedName, integration, setValue]);

  const onSubmitForm = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const integrationData = {
        ...data,
        features: data.features.split('\n').filter(f => f.trim()),
        supported_platforms: data.supported_platforms.split('\n').filter(p => p.trim()),
      };
      await onSave(integrationData);
    } catch (error) {
      console.error('Error saving integration:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = [
    'Communication', 'E-commerce', 'Payments', 'Marketing', 'Analytics', 
    'CRM', 'Productivity', 'Database', 'Automation', 'Development', 
    'Project Management', 'Documentation', 'Design', 'Storage', 'Finance'
  ];

  const platforms = ['Web', 'iOS', 'Android', 'Desktop', 'CLI'];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex justify-between items-center"
      >
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onCancel} className="border-brandae-green/50 text-brandae-green hover:bg-brandae-green/10">
            <ArrowLeft size={20} className="mr-2" />
            Back
          </Button>
          <h2 className="text-2xl font-semibold">
            {integration ? `Edit ${integration.name}` : 'Create New Integration'}
          </h2>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setPreviewMode(!previewMode)}
            className="border-brandae-green/50 text-brandae-green hover:bg-brandae-green/10"
          >
            <Eye size={20} className="mr-2" />
            {previewMode ? 'Edit' : 'Preview'}
          </Button>
        </div>
      </motion.div>

      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <Card className="bg-brandae-gray border-brandae-green/20">
            <CardHeader>
              <CardTitle className="text-brandae-green">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-white">Name *</Label>
                <Input
                  id="name"
                  {...register('name', { required: 'Name is required' })}
                  className="bg-brandae-dark border-white/10 text-white"
                  placeholder="Slack"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <Label htmlFor="slug" className="text-white">Slug *</Label>
                <Input
                  id="slug"
                  {...register('slug', { required: 'Slug is required' })}
                  className="bg-brandae-dark border-white/10 text-white"
                  placeholder="slack"
                />
                {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>}
              </div>

              <div>
                <Label htmlFor="description" className="text-white">Short Description *</Label>
                <Textarea
                  id="description"
                  {...register('description', { required: 'Description is required' })}
                  className="bg-brandae-dark border-white/10 text-white"
                  placeholder="Team communication and collaboration platform"
                  rows={3}
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
              </div>

              <div>
                <Label htmlFor="detailed_description" className="text-white">Detailed Description</Label>
                <Textarea
                  id="detailed_description"
                  {...register('detailed_description')}
                  className="bg-brandae-dark border-white/10 text-white"
                  placeholder="Detailed description of the integration..."
                  rows={5}
                />
              </div>

              <div>
                <Label htmlFor="logo_url" className="text-white">Logo URL *</Label>
                <Input
                  id="logo_url"
                  {...register('logo_url', { required: 'Logo URL is required' })}
                  className="bg-brandae-dark border-white/10 text-white"
                  placeholder="https://example.com/logo.png"
                />
                {errors.logo_url && <p className="text-red-500 text-sm mt-1">{errors.logo_url.message}</p>}
              </div>
            </CardContent>
          </Card>

          {/* Configuration */}
          <Card className="bg-brandae-gray border-brandae-green/20">
            <CardHeader>
              <CardTitle className="text-brandae-green">Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="category" className="text-white">Category *</Label>
                <Select onValueChange={(value) => setValue('category', value)} defaultValue={watch('category')}>
                  <SelectTrigger className="bg-brandae-dark border-white/10 text-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="integration_type" className="text-white">Integration Type *</Label>
                <Select onValueChange={(value) => setValue('integration_type', value)} defaultValue={watch('integration_type')}>
                  <SelectTrigger className="bg-brandae-dark border-white/10 text-white">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="api">API</SelectItem>
                    <SelectItem value="webhook">Webhook</SelectItem>
                    <SelectItem value="plugin">Plugin</SelectItem>
                    <SelectItem value="native">Native</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="difficulty_level" className="text-white">Difficulty Level *</Label>
                <Select onValueChange={(value) => setValue('difficulty_level', value)} defaultValue={watch('difficulty_level')}>
                  <SelectTrigger className="bg-brandae-dark border-white/10 text-white">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="setup_time" className="text-white">Setup Time *</Label>
                <Input
                  id="setup_time"
                  {...register('setup_time', { required: 'Setup time is required' })}
                  className="bg-brandae-dark border-white/10 text-white"
                  placeholder="10 minutes"
                />
                {errors.setup_time && <p className="text-red-500 text-sm mt-1">{errors.setup_time.message}</p>}
              </div>

              <div>
                <Label htmlFor="pricing_info" className="text-white">Pricing Information</Label>
                <Textarea
                  id="pricing_info"
                  {...register('pricing_info')}
                  className="bg-brandae-dark border-white/10 text-white"
                  placeholder="Free tier available, paid plans from $10/month"
                  rows={2}
                />
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_featured"
                    checked={watch('is_featured')}
                    onCheckedChange={(checked) => setValue('is_featured', checked)}
                  />
                  <Label htmlFor="is_featured" className="text-white">Featured</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_active"
                    checked={watch('is_active')}
                    onCheckedChange={(checked) => setValue('is_active', checked)}
                  />
                  <Label htmlFor="is_active" className="text-white">Active</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* URLs and Links */}
          <Card className="bg-brandae-gray border-brandae-green/20">
            <CardHeader>
              <CardTitle className="text-brandae-green">URLs and Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="website_url" className="text-white">Website URL</Label>
                <Input
                  id="website_url"
                  {...register('website_url')}
                  className="bg-brandae-dark border-white/10 text-white"
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <Label htmlFor="documentation_url" className="text-white">Documentation URL</Label>
                <Input
                  id="documentation_url"
                  {...register('documentation_url')}
                  className="bg-brandae-dark border-white/10 text-white"
                  placeholder="https://docs.example.com"
                />
              </div>
            </CardContent>
          </Card>

          {/* Features and Platforms */}
          <Card className="bg-brandae-gray border-brandae-green/20">
            <CardHeader>
              <CardTitle className="text-brandae-green">Features and Platforms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="features" className="text-white">Features (one per line)</Label>
                <Textarea
                  id="features"
                  {...register('features')}
                  className="bg-brandae-dark border-white/10 text-white"
                  placeholder="Real-time messaging&#10;File sharing&#10;Workflow automation"
                  rows={6}
                />
              </div>

              <div>
                <Label htmlFor="supported_platforms" className="text-white">Supported Platforms (one per line)</Label>
                <Textarea
                  id="supported_platforms"
                  {...register('supported_platforms')}
                  className="bg-brandae-dark border-white/10 text-white"
                  placeholder="Web&#10;iOS&#10;Android&#10;Desktop"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* SEO Settings */}
          <Card className="bg-brandae-gray border-brandae-green/20 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-brandae-green">SEO Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="meta_title" className="text-white">Meta Title</Label>
                <Input
                  id="meta_title"
                  {...register('meta_title')}
                  className="bg-brandae-dark border-white/10 text-white"
                  placeholder="Slack Integration - Team Communication"
                />
              </div>

              <div>
                <Label htmlFor="meta_description" className="text-white">Meta Description</Label>
                <Textarea
                  id="meta_description"
                  {...register('meta_description')}
                  className="bg-brandae-dark border-white/10 text-white"
                  placeholder="Integrate Slack for seamless team communication and collaboration"
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="seo_keywords" className="text-white">SEO Keywords</Label>
                <Input
                  id="seo_keywords"
                  {...register('seo_keywords')}
                  className="bg-brandae-dark border-white/10 text-white"
                  placeholder="slack integration, team communication, collaboration platform"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="outline" type="button" onClick={onCancel} className="border-white/20 text-white hover:bg-white/5">
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-brandae-green text-brandae-dark hover:bg-brandae-green/90"
          >
            <Save size={20} className="mr-2" />
            {isSubmitting ? 'Saving...' : 'Save Integration'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default IntegrationEditor;
