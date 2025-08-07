import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Wand2, 
  FileText, 
  Briefcase, 
  Puzzle, 
  BookOpen, 
  Loader2,
  Copy,
  Download,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const contentTypes = [
  {
    value: 'blog',
    label: 'Blog Post',
    icon: <FileText className="w-5 h-5" />,
    description: 'Create engaging blog posts with SEO optimization',
    color: 'text-blue-500'
  },
  {
    value: 'case_study',
    label: 'Case Study',
    icon: <Briefcase className="w-5 h-5" />,
    description: 'Detailed project case studies with results',
    color: 'text-green-500'
  },
  {
    value: 'integration',
    label: 'Integration Guide',
    icon: <Puzzle className="w-5 h-5" />,
    description: 'Technical integration documentation',
    color: 'text-purple-500'
  },
  {
    value: 'documentation',
    label: 'Documentation',
    icon: <BookOpen className="w-5 h-5" />,
    description: 'Comprehensive technical documentation',
    color: 'text-orange-500'
  }
];

export default function AIContentGenerator() {
  const [selectedType, setSelectedType] = useState('');
  const [topic, setTopic] = useState('');
  const [additionalInstructions, setAdditionalInstructions] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!selectedType || !topic.trim()) {
      toast({
        title: "Missing Information",
        description: "Please select a content type and enter a topic.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setGeneratedContent(null);

    try {
      const { data, error } = await supabase.functions.invoke('generate-ai-content', {
        body: {
          contentType: selectedType,
          topic: topic.trim(),
          additionalInstructions: additionalInstructions.trim()
        }
      });

      if (error) {
        throw error;
      }

      if (data?.success) {
        setGeneratedContent(data.content);
        toast({
          title: "Content Generated!",
          description: "Your AI-generated content is ready.",
        });
      } else {
        throw new Error(data?.error || 'Failed to generate content');
      }
    } catch (error) {
      console.error('Error generating content:', error);
      toast({
        title: "Generation Failed",
        description: error.message || "Failed to generate content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async (text: string, fieldName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2000);
      toast({
        title: "Copied!",
        description: `${fieldName} copied to clipboard.`,
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy to clipboard.",
        variant: "destructive",
      });
    }
  };

  const downloadContent = () => {
    if (!generatedContent) return;

    const contentText = JSON.stringify(generatedContent, null, 2);
    const blob = new Blob([contentText], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-generated-${selectedType}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Utils for publishing
  const slugify = (str: string) =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

  const makeExcerpt = (text: string, length = 160) =>
    (text || '').replace(/\s+/g, ' ').trim().slice(0, length);

  const estimateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = (content || '').split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  const pushToBlog = async () => {
    if (!generatedContent) return;
    try {
      const title = generatedContent.title || topic;
      const content = generatedContent.content || '';
      const postData = {
        title,
        slug: slugify(title),
        excerpt: generatedContent.metaDescription || makeExcerpt(content, 180),
        content,
        image_url: '',
        author: 'AI Assistant',
        category: 'AI Generated',
        tags: Array.isArray(generatedContent.keywords) ? generatedContent.keywords : [],
        read_time: `${estimateReadingTime(content)} min`,
        featured: false,
        published: false,
      };

      const { error } = await supabase.from('blog_posts').insert([postData]);
      if (error) throw error;
      toast({ title: 'Blog created', description: 'AI content pushed to Blog as draft.' });
    } catch (e:any) {
      console.error('Push blog failed:', e);
      toast({ title: 'Failed to create blog', description: e.message || 'An error occurred', variant: 'destructive' });
    }
  };

  const pushToCaseStudy = async () => {
    if (!generatedContent) return;
    try {
      const title = generatedContent.title || topic;
      const challenge = generatedContent.challenge || '';
      const solution = generatedContent.solution || '';
      const implementation = generatedContent.implementation || '';
      const results = generatedContent.results || '';
      const combinedContent = `${challenge}\n\n${solution}\n\n${implementation}\n\n${results}`.trim();

      const studyData = {
        title,
        slug: slugify(title),
        meta_title: `${title} – Case Study`,
        meta_description: makeExcerpt(results || solution || challenge, 160),
        excerpt: makeExcerpt(challenge || solution, 200),
        content: combinedContent,
        featured_image_url: '',
        client_name: generatedContent.client || 'Confidential Client',
        client_logo_url: '',
        industry: 'AI Generated',
        project_duration: null,
        project_cost_range: null,
        results_summary: results || null,
        tags: Array.isArray(generatedContent.takeaways) ? generatedContent.takeaways : [],
        technologies_used: Array.isArray(generatedContent.technologies) ? generatedContent.technologies : [],
        challenge: challenge || null,
        solution: solution || null,
        results: results || null,
        testimonial: null,
        testimonial_author: null,
        testimonial_position: null,
        featured: false,
        published: false,
        seo_keywords: '',
        canonical_url: '',
        reading_time: estimateReadingTime(combinedContent),
      };

      const { error } = await supabase.from('case_studies').insert([studyData]);
      if (error) throw error;
      toast({ title: 'Case study created', description: 'AI content pushed to Case Studies as draft.' });
    } catch (e:any) {
      console.error('Push case study failed:', e);
      toast({ title: 'Failed to create case study', description: e.message || 'An error occurred', variant: 'destructive' });
    }
  };

  const pushToIntegration = async () => {
    if (!generatedContent) return;
    try {
      const name = generatedContent.name || topic;
      const desc = generatedContent.description || '';
      const details = [
        desc,
        Array.isArray(generatedContent.setupSteps) ? `\n\nSetup Steps:\n- ${generatedContent.setupSteps.join('\n- ')}` : '',
        generatedContent.codeExample ? `\n\nCode Example:\n${generatedContent.codeExample}` : '',
        Array.isArray(generatedContent.benefits) ? `\n\nBenefits:\n- ${generatedContent.benefits.join('\n- ')}` : ''
      ].join('');

      const integrationData = {
        name,
        slug: slugify(name),
        description: desc,
        detailed_description: details,
        logo_url: '',
        category: generatedContent.category || 'General',
        website_url: '',
        documentation_url: '',
        pricing_info: '',
        features: Array.isArray(generatedContent.features) ? generatedContent.features : [],
        supported_platforms: [],
        integration_type: generatedContent.category || 'API',
        difficulty_level: generatedContent.difficulty || 'Medium',
        setup_time: 'Varies',
        is_featured: false,
        is_active: true,
        views_count: 0,
        meta_title: `${name} Integration Guide`,
        meta_description: makeExcerpt(desc, 160),
        seo_keywords: (Array.isArray(generatedContent.features) ? generatedContent.features : []).slice(0, 6).join(', '),
      };

      const { error } = await supabase.from('integrations').insert([integrationData]);
      if (error) throw error;
      toast({ title: 'Integration created', description: 'AI content pushed to Integrations as draft.' });
    } catch (e:any) {
      console.error('Push integration failed:', e);
      toast({ title: 'Failed to create integration', description: e.message || 'An error occurred', variant: 'destructive' });
    }
  };

  const pushToDocumentation = async () => {
    if (!generatedContent) return;
    try {
      const title = generatedContent.title || topic;
      const overview = generatedContent.overview || '';
      const contentParts = [
        overview,
        Array.isArray(generatedContent.prerequisites) ? `\n\nPrerequisites:\n- ${generatedContent.prerequisites.join('\n- ')}` : '',
        Array.isArray(generatedContent.instructions) ? `\n\nInstructions:\n- ${generatedContent.instructions.join('\n- ')}` : '',
        Array.isArray(generatedContent.codeExamples) ? `\n\nCode Examples:\n${generatedContent.codeExamples.join('\n\n')}` : '',
        generatedContent.troubleshooting ? `\n\nTroubleshooting:\n${generatedContent.troubleshooting}` : ''
      ].join('');

      const docData = {
        title,
        slug: slugify(title),
        meta_title: `${title} – Documentation`,
        meta_description: makeExcerpt(overview, 160),
        excerpt: makeExcerpt(overview, 200),
        content: contentParts,
        featured_image_url: '',
        category: generatedContent.category || 'General',
        tags: Array.isArray(generatedContent.relatedTopics) ? generatedContent.relatedTopics : [],
        author: 'AI Assistant',
        featured: false,
        published: false,
        seo_keywords: Array.isArray(generatedContent.relatedTopics) ? generatedContent.relatedTopics.join(', ') : '',
        canonical_url: '',
        reading_time: estimateReadingTime(contentParts),
      };

      const { error } = await supabase.from('documentation').insert([docData]);
      if (error) throw error;
      toast({ title: 'Documentation created', description: 'AI content pushed to Documentation as draft.' });
    } catch (e:any) {
      console.error('Push documentation failed:', e);
      toast({ title: 'Failed to create documentation', description: e.message || 'An error occurred', variant: 'destructive' });
    }
  };

  const renderContentPreview = () => {
    if (!generatedContent) return null;

    const selectedTypeConfig = contentTypes.find(type => type.value === selectedType);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-8"
      >
        <Card className="bg-brandae-gray border-brandae-green/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={selectedTypeConfig?.color}>
                  {selectedTypeConfig?.icon}
                </div>
                <div>
                  <CardTitle className="text-white">Generated Content</CardTitle>
                  <CardDescription>
                    {selectedTypeConfig?.label} for "{topic}"
                  </CardDescription>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={downloadContent}
                  className="border-brandae-green/30 text-brandae-green hover:bg-brandae-green/10"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {Object.entries(generatedContent).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-brandae-green capitalize font-medium">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(String(value), key)}
                    className="h-6 px-2 text-gray-400 hover:text-brandae-green"
                  >
                    {copiedField === key ? (
                      <CheckCircle className="w-3 h-3" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </Button>
                </div>
                <div className="bg-brandae-dark/50 rounded-lg p-4 border border-brandae-green/20">
                  {Array.isArray(value) ? (
                    <div className="space-y-2">
                      {value.map((item, index) => (
                        <Badge 
                          key={index} 
                          variant="outline" 
                          className="border-brandae-green/30 text-gray-300 mr-2 mb-2"
                        >
                          {item}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                      {String(value)}
                    </p>
                  )}
                </div>
              </div>
            ))}
            <div className="border-t border-brandae-green/20 pt-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-white font-semibold">Quick publish</h4>
                <p className="text-xs text-gray-400">Push this content into your CMS as drafts</p>
              </div>
              <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <Button onClick={pushToBlog} variant="outline" className="snap-start shrink-0 border-brandae-green/30 text-white hover:bg-brandae-green/10">
                  <FileText className="w-4 h-4 mr-2" />
                  Push to Blog
                </Button>
                <Button onClick={pushToCaseStudy} variant="outline" className="snap-start shrink-0 border-brandae-green/30 text-white hover:bg-brandae-green/10">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Push to Case Study
                </Button>
                <Button onClick={pushToIntegration} variant="outline" className="snap-start shrink-0 border-brandae-green/30 text-white hover:bg-brandae-green/10">
                  <Puzzle className="w-4 h-4 mr-2" />
                  Push to Integration
                </Button>
                <Button onClick={pushToDocumentation} variant="outline" className="snap-start shrink-0 border-brandae-green/30 text-white hover:bg-brandae-green/10">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Push to Documentation
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Wand2 className="w-8 h-8 text-brandae-green" />
            <h2 className="text-3xl font-bold text-white">AI Content Generator</h2>
          </div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Generate high-quality content for your platform using AI. Choose the content type,
            provide a topic, and let our AI create professional content for you.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="bg-brandae-gray border-brandae-green/30">
          <CardHeader>
            <CardTitle className="text-white">Content Configuration</CardTitle>
            <CardDescription>
              Set up your content generation parameters
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Content Type Selection */}
            <div className="space-y-3">
              <Label className="text-brandae-green">Content Type</Label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="bg-brandae-dark border-brandae-green/30 text-white">
                  <SelectValue placeholder="Select content type" />
                </SelectTrigger>
                <SelectContent className="z-[9999] bg-brandae-dark/95 backdrop-blur-md border border-brandae-green/30 shadow-2xl">
                  {contentTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-3">
                        <div className={type.color}>
                          {type.icon}
                        </div>
                        <div>
                          <div className="font-medium">{type.label}</div>
                          <div className="text-sm text-gray-500">{type.description}</div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Topic Input */}
            <div className="space-y-3">
              <Label htmlFor="topic" className="text-brandae-green">Topic</Label>
              <Input
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter the main topic or title for your content"
                className="bg-brandae-dark border-brandae-green/30 text-white placeholder:text-gray-500"
              />
            </div>

            {/* Additional Instructions */}
            <div className="space-y-3">
              <Label htmlFor="instructions" className="text-brandae-green">
                Additional Instructions (Optional)
              </Label>
              <Textarea
                id="instructions"
                value={additionalInstructions}
                onChange={(e) => setAdditionalInstructions(e.target.value)}
                placeholder="Add any specific requirements, tone, audience, or style preferences..."
                className="bg-brandae-dark border-brandae-green/30 text-white placeholder:text-gray-500 min-h-[100px]"
              />
            </div>

            {/* Generate Button */}
            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !selectedType || !topic.trim()}
              className="w-full bg-brandae-green text-brandae-dark hover:bg-brandae-green/90 font-medium"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating Content...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 mr-2" />
                  Generate Content
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Content Preview */}
      {renderContentPreview()}
    </div>
  );
}