
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface CaseStudy {
  id?: string;
  title: string;
  slug: string;
  meta_title: string;
  meta_description: string;
  excerpt: string;
  content: string;
  featured_image_url: string;
  client_name: string;
  client_logo_url: string;
  industry: string;
  project_duration: string;
  project_cost_range: string;
  results_summary: string;
  tags: string[];
  technologies_used: string[];
  challenge: string;
  solution: string;
  results: string;
  testimonial: string;
  testimonial_author: string;
  testimonial_position: string;
  featured: boolean;
  published: boolean;
  seo_keywords: string;
  reading_time: number;
}

interface CaseStudyEditorProps {
  study: CaseStudy | null;
  onSave: (data: Partial<CaseStudy>) => void;
  onCancel: () => void;
}

const CaseStudyEditor: React.FC<CaseStudyEditorProps> = ({ study, onSave, onCancel }) => {
  const [formData, setFormData] = useState<CaseStudy>({
    title: '',
    slug: '',
    meta_title: '',
    meta_description: '',
    excerpt: '',
    content: '',
    featured_image_url: '',
    client_name: '',
    client_logo_url: '',
    industry: '',
    project_duration: '',
    project_cost_range: '',
    results_summary: '',
    tags: [],
    technologies_used: [],
    challenge: '',
    solution: '',
    results: '',
    testimonial: '',
    testimonial_author: '',
    testimonial_position: '',
    featured: false,
    published: false,
    seo_keywords: '',
    reading_time: 5,
  });

  const [tagInput, setTagInput] = useState('');
  const [techInput, setTechInput] = useState('');

  useEffect(() => {
    if (study) {
      setFormData(study);
    }
  }, [study]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleInputChange = (field: keyof CaseStudy, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Auto-generate slug from title
    if (field === 'title' && value) {
      setFormData(prev => ({
        ...prev,
        slug: generateSlug(value)
      }));
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleAddTech = () => {
    if (techInput.trim() && !formData.technologies_used.includes(techInput.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies_used: [...prev.technologies_used, techInput.trim()]
      }));
      setTechInput('');
    }
  };

  const handleRemoveTech = (techToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      technologies_used: prev.technologies_used.filter(tech => tech !== techToRemove)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="min-h-screen bg-brandae-dark text-white">
      <div className="pt-8 px-6 md:px-12 lg:px-24">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <Button 
                  onClick={onCancel}
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <ArrowLeft size={20} className="mr-2" />
                  Back
                </Button>
                <h1 className="text-3xl font-bold">
                  {study ? 'Edit Case Study' : 'Create New Case Study'}
                </h1>
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={handleSubmit}
                  className="bg-brandae-green text-brandae-dark hover:bg-brandae-green/90"
                >
                  <Save size={20} className="mr-2" />
                  Save
                </Button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Basic Information */}
                <Card className="bg-brandae-gray border-brandae-green/20">
                  <CardHeader>
                    <CardTitle className="text-brandae-green">Basic Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="Case study title"
                        className="bg-brandae-dark border-brandae-green/30"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="slug">URL Slug *</Label>
                      <Input
                        id="slug"
                        value={formData.slug}
                        onChange={(e) => handleInputChange('slug', e.target.value)}
                        placeholder="url-friendly-slug"
                        className="bg-brandae-dark border-brandae-green/30"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="excerpt">Excerpt *</Label>
                      <Textarea
                        id="excerpt"
                        value={formData.excerpt}
                        onChange={(e) => handleInputChange('excerpt', e.target.value)}
                        placeholder="Brief description of the case study"
                        rows={3}
                        className="bg-brandae-dark border-brandae-green/30"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="featured_image_url">Featured Image URL</Label>
                      <Input
                        id="featured_image_url"
                        value={formData.featured_image_url}
                        onChange={(e) => handleInputChange('featured_image_url', e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        className="bg-brandae-dark border-brandae-green/30"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Client Information */}
                <Card className="bg-brandae-gray border-brandae-green/20">
                  <CardHeader>
                    <CardTitle className="text-brandae-green">Client Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="client_name">Client Name *</Label>
                        <Input
                          id="client_name"
                          value={formData.client_name}
                          onChange={(e) => handleInputChange('client_name', e.target.value)}
                          placeholder="Client company name"
                          className="bg-brandae-dark border-brandae-green/30"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="industry">Industry *</Label>
                        <Input
                          id="industry"
                          value={formData.industry}
                          onChange={(e) => handleInputChange('industry', e.target.value)}
                          placeholder="e.g., Food & Beverage"
                          className="bg-brandae-dark border-brandae-green/30"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="project_duration">Project Duration</Label>
                        <Input
                          id="project_duration"
                          value={formData.project_duration}
                          onChange={(e) => handleInputChange('project_duration', e.target.value)}
                          placeholder="e.g., 6 months"
                          className="bg-brandae-dark border-brandae-green/30"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="project_cost_range">Investment Range</Label>
                        <Input
                          id="project_cost_range"
                          value={formData.project_cost_range}
                          onChange={(e) => handleInputChange('project_cost_range', e.target.value)}
                          placeholder="e.g., $10,000 - $25,000"
                          className="bg-brandae-dark border-brandae-green/30"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="client_logo_url">Client Logo URL</Label>
                      <Input
                        id="client_logo_url"
                        value={formData.client_logo_url}
                        onChange={(e) => handleInputChange('client_logo_url', e.target.value)}
                        placeholder="https://example.com/logo.jpg"
                        className="bg-brandae-dark border-brandae-green/30"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Results & Content */}
                <Card className="bg-brandae-gray border-brandae-green/20">
                  <CardHeader>
                    <CardTitle className="text-brandae-green">Results & Content</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="results_summary">Results Summary *</Label>
                      <Textarea
                        id="results_summary"
                        value={formData.results_summary}
                        onChange={(e) => handleInputChange('results_summary', e.target.value)}
                        placeholder="Brief summary of key results achieved"
                        rows={2}
                        className="bg-brandae-dark border-brandae-green/30"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="challenge">The Challenge</Label>
                      <Textarea
                        id="challenge"
                        value={formData.challenge}
                        onChange={(e) => handleInputChange('challenge', e.target.value)}
                        placeholder="Describe the challenges the client faced"
                        rows={4}
                        className="bg-brandae-dark border-brandae-green/30"
                      />
                    </div>

                    <div>
                      <Label htmlFor="solution">Our Solution</Label>
                      <Textarea
                        id="solution"
                        value={formData.solution}
                        onChange={(e) => handleInputChange('solution', e.target.value)}
                        placeholder="Describe the solution you provided"
                        rows={4}
                        className="bg-brandae-dark border-brandae-green/30"
                      />
                    </div>

                    <div>
                      <Label htmlFor="results">The Results</Label>
                      <Textarea
                        id="results"
                        value={formData.results}
                        onChange={(e) => handleInputChange('results', e.target.value)}
                        placeholder="Describe the detailed results and outcomes"
                        rows={4}
                        className="bg-brandae-dark border-brandae-green/30"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Testimonial */}
                <Card className="bg-brandae-gray border-brandae-green/20">
                  <CardHeader>
                    <CardTitle className="text-brandae-green">Client Testimonial</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="testimonial">Testimonial Quote</Label>
                      <Textarea
                        id="testimonial"
                        value={formData.testimonial}
                        onChange={(e) => handleInputChange('testimonial', e.target.value)}
                        placeholder="Client testimonial quote"
                        rows={3}
                        className="bg-brandae-dark border-brandae-green/30"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="testimonial_author">Author Name</Label>
                        <Input
                          id="testimonial_author"
                          value={formData.testimonial_author}
                          onChange={(e) => handleInputChange('testimonial_author', e.target.value)}
                          placeholder="e.g., John Smith"
                          className="bg-brandae-dark border-brandae-green/30"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="testimonial_position">Author Position</Label>
                        <Input
                          id="testimonial_position"
                          value={formData.testimonial_position}
                          onChange={(e) => handleInputChange('testimonial_position', e.target.value)}
                          placeholder="e.g., CEO, Company Name"
                          className="bg-brandae-dark border-brandae-green/30"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                {/* Publishing Options */}
                <Card className="bg-brandae-gray border-brandae-green/20">
                  <CardHeader>
                    <CardTitle className="text-brandae-green">Publishing</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="published">Published</Label>
                      <Switch
                        id="published"
                        checked={formData.published}
                        onCheckedChange={(checked) => handleInputChange('published', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="featured">Featured</Label>
                      <Switch
                        id="featured"
                        checked={formData.featured}
                        onCheckedChange={(checked) => handleInputChange('featured', checked)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="reading_time">Reading Time (minutes)</Label>
                      <Input
                        id="reading_time"
                        type="number"
                        value={formData.reading_time}
                        onChange={(e) => handleInputChange('reading_time', parseInt(e.target.value) || 5)}
                        min="1"
                        max="60"
                        className="bg-brandae-dark border-brandae-green/30"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* SEO Settings */}
                <Card className="bg-brandae-gray border-brandae-green/20">
                  <CardHeader>
                    <CardTitle className="text-brandae-green">SEO Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="meta_title">Meta Title</Label>
                      <Input
                        id="meta_title"
                        value={formData.meta_title}
                        onChange={(e) => handleInputChange('meta_title', e.target.value)}
                        placeholder="SEO title for search engines"
                        className="bg-brandae-dark border-brandae-green/30"
                      />
                    </div>

                    <div>
                      <Label htmlFor="meta_description">Meta Description</Label>
                      <Textarea
                        id="meta_description"
                        value={formData.meta_description}
                        onChange={(e) => handleInputChange('meta_description', e.target.value)}
                        placeholder="SEO description for search engines"
                        rows={3}
                        className="bg-brandae-dark border-brandae-green/30"
                      />
                    </div>

                    <div>
                      <Label htmlFor="seo_keywords">SEO Keywords</Label>
                      <Input
                        id="seo_keywords"
                        value={formData.seo_keywords}
                        onChange={(e) => handleInputChange('seo_keywords', e.target.value)}
                        placeholder="keyword1, keyword2, keyword3"
                        className="bg-brandae-dark border-brandae-green/30"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Tags */}
                <Card className="bg-brandae-gray border-brandae-green/20">
                  <CardHeader>
                    <CardTitle className="text-brandae-green">Tags</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        placeholder="Add tag"
                        className="bg-brandae-dark border-brandae-green/30"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                      />
                      <Button 
                        type="button"
                        onClick={handleAddTag}
                        variant="outline"
                        className="border-brandae-green/50 text-brandae-green"
                      >
                        Add
                      </Button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map(tag => (
                        <Badge 
                          key={tag} 
                          variant="outline" 
                          className="border-brandae-green/50 text-brandae-green cursor-pointer"
                          onClick={() => handleRemoveTag(tag)}
                        >
                          {tag} ×
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Technologies */}
                <Card className="bg-brandae-gray border-brandae-green/20">
                  <CardHeader>
                    <CardTitle className="text-brandae-green">Technologies Used</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        value={techInput}
                        onChange={(e) => setTechInput(e.target.value)}
                        placeholder="Add technology"
                        className="bg-brandae-dark border-brandae-green/30"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTech())}
                      />
                      <Button 
                        type="button"
                        onClick={handleAddTech}
                        variant="outline"
                        className="border-brandae-green/50 text-brandae-green"
                      >
                        Add
                      </Button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {formData.technologies_used.map(tech => (
                        <Badge 
                          key={tech} 
                          variant="outline" 
                          className="border-brandae-green/50 text-brandae-green cursor-pointer"
                          onClick={() => handleRemoveTech(tech)}
                        >
                          {tech} ×
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyEditor;
