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
                <SelectContent>
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