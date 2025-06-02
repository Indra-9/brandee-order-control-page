
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, ExternalLink, Globe, BookOpen, Zap, Shield, Users, Star, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';

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
  meta_title: string;
  meta_description: string;
  seo_keywords: string;
  views_count: number;
  created_at: string;
}

export default function IntegrationDetails() {
  const { slug } = useParams<{ slug: string }>();
  const [integration, setIntegration] = useState<Integration | null>(null);
  const [relatedIntegrations, setRelatedIntegrations] = useState<Integration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (slug) {
      fetchIntegration();
    }
  }, [slug]);

  const fetchIntegration = async () => {
    try {
      // Fetch the main integration
      const { data: integrationData, error: integrationError } = await supabase
        .from('integrations')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .single();

      if (integrationError) throw integrationError;

      if (integrationData) {
        setIntegration(integrationData);
        
        // Increment view count
        await supabase
          .from('integrations')
          .update({ views_count: (integrationData.views_count || 0) + 1 })
          .eq('id', integrationData.id);

        // Fetch related integrations
        const { data: relatedData, error: relatedError } = await supabase
          .from('integrations')
          .select('*')
          .eq('is_active', true)
          .neq('id', integrationData.id)
          .eq('category', integrationData.category)
          .limit(3);

        if (relatedError) throw relatedError;
        setRelatedIntegrations(relatedData || []);
      }
    } catch (error) {
      console.error('Error fetching integration:', error);
      toast({
        title: "Error",
        description: "Failed to load integration details",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'hard': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return <CheckCircle size={16} />;
      case 'medium': return <Clock size={16} />;
      case 'hard': return <AlertCircle size={16} />;
      default: return <Zap size={16} />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'communication': return '💬';
      case 'e-commerce': return '🛒';
      case 'payments': return '💳';
      case 'marketing': return '📈';
      case 'analytics': return '📊';
      case 'crm': return '👥';
      case 'productivity': return '⚡';
      case 'database': return '🗄️';
      case 'automation': return '🔄';
      case 'development': return '👨‍💻';
      case 'project management': return '📋';
      case 'documentation': return '📚';
      case 'design': return '🎨';
      case 'storage': return '☁️';
      case 'finance': return '💰';
      default: return '🔧';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brandae-dark text-white">
        <Navbar />
        <div className="pt-32 px-6 md:px-12 lg:px-24">
          <div className="container mx-auto text-center">
            <div className="text-gray-400">Loading integration details...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!integration) {
    return (
      <div className="min-h-screen bg-brandae-dark text-white">
        <Navbar />
        <div className="pt-32 px-6 md:px-12 lg:px-24">
          <div className="container mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Integration Not Found</h1>
            <p className="text-gray-400 mb-8">The integration you're looking for doesn't exist or has been removed.</p>
            <Link to="/integrations" className="text-brandae-green hover:underline">
              ← Back to Integrations
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brandae-dark text-white">
      <SEO 
        title={integration.meta_title || `${integration.name} Integration`} 
        description={integration.meta_description || integration.description} 
        keywords={integration.seo_keywords || `${integration.name.toLowerCase()}, integration, ${integration.category.toLowerCase()}`}
      />

      <Navbar />
      
      {/* Back Navigation */}
      <section className="pt-32 pb-8 px-6 md:px-12 lg:px-24">
        <div className="container mx-auto">
          <Link to="/integrations" className="inline-flex items-center text-brandae-green hover:underline mb-8">
            <ArrowLeft size={20} className="mr-2" />
            Back to Integrations
          </Link>
        </div>
      </section>

      {/* Hero Section */}
      <section className="pb-12 px-6 md:px-12 lg:px-24">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-12"
          >
            <div className="lg:col-span-2">
              <div className="flex items-start gap-6 mb-6">
                <img 
                  src={integration.logo_url} 
                  alt={integration.name} 
                  className="w-16 h-16 rounded-xl object-cover" 
                />
                <div className="flex-1">
                  <div className="flex flex-wrap gap-3 mb-4">
                    <Badge className="bg-brandae-green/20 text-brandae-green">
                      {getCategoryIcon(integration.category)} {integration.category}
                    </Badge>
                    {integration.is_featured && (
                      <Badge className="bg-brandae-purple/20 text-brandae-purple">
                        <Star size={14} className="mr-1" />
                        Featured
                      </Badge>
                    )}
                    <Badge className={getDifficultyColor(integration.difficulty_level)} variant="outline">
                      {getDifficultyIcon(integration.difficulty_level)}
                      <span className="ml-1">{integration.difficulty_level}</span>
                    </Badge>
                  </div>
                  
                  <h1 className="text-3xl md:text-4xl font-bold mb-4">
                    {integration.name} Integration
                  </h1>
                  
                  <p className="text-xl text-gray-300 mb-6">
                    {integration.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      <span>Setup: {integration.setup_time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={16} />
                      <span>{integration.views_count} views</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap size={16} />
                      <span>{integration.integration_type.toUpperCase()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button 
                  asChild
                  className="bg-brandae-green text-brandae-dark hover:bg-brandae-green/90"
                >
                  <a href={integration.documentation_url} target="_blank" rel="noopener noreferrer">
                    <BookOpen size={18} className="mr-2" />
                    View Documentation
                  </a>
                </Button>
                <Button 
                  variant="outline"
                  asChild
                  className="border-brandae-green/50 text-brandae-green hover:bg-brandae-green/10"
                >
                  <a href={integration.website_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={18} className="mr-2" />
                    Visit Website
                  </a>
                </Button>
              </div>
            </div>

            {/* Quick Info Sidebar */}
            <div className="lg:col-span-1">
              <Card className="bg-brandae-gray border-brandae-green/20 sticky top-32">
                <CardHeader>
                  <CardTitle className="text-brandae-green">Quick Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-white mb-2">Pricing</h4>
                    <p className="text-sm text-gray-300">{integration.pricing_info}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-white mb-2">Supported Platforms</h4>
                    <div className="flex flex-wrap gap-2">
                      {integration.supported_platforms.map(platform => (
                        <Badge key={platform} variant="outline" className="border-brandae-green/50 text-brandae-green">
                          {platform}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-white mb-2">Integration Type</h4>
                    <Badge className="bg-brandae-purple/20 text-brandae-purple">
                      {integration.integration_type.toUpperCase()}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-6 md:px-12 lg:px-24 pb-12">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-brandae-gray">
                <TabsTrigger value="overview" className="data-[state=active]:bg-brandae-green data-[state=active]:text-brandae-dark">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="features" className="data-[state=active]:bg-brandae-green data-[state=active]:text-brandae-dark">
                  Features
                </TabsTrigger>
                <TabsTrigger value="setup" className="data-[state=active]:bg-brandae-green data-[state=active]:text-brandae-dark">
                  Setup Guide
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-8">
                <Card className="bg-brandae-gray border-brandae-green/20">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-4 text-white">About {integration.name}</h3>
                    <div className="prose prose-invert max-w-none">
                      <p className="text-gray-200 leading-relaxed">
                        {integration.detailed_description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="features" className="mt-8">
                <Card className="bg-brandae-gray border-brandae-green/20">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-6 text-white">Key Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {integration.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-brandae-dark/50">
                          <CheckCircle size={20} className="text-brandae-green flex-shrink-0" />
                          <span className="text-gray-200">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="setup" className="mt-8">
                <Card className="bg-brandae-gray border-brandae-green/20">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-6 text-white">Getting Started</h3>
                    <div className="space-y-6">
                      <div className="p-4 rounded-lg bg-brandae-green/10 border border-brandae-green/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock size={18} className="text-brandae-green" />
                          <span className="font-medium text-white">Estimated Setup Time</span>
                        </div>
                        <p className="text-gray-300">{integration.setup_time}</p>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-brandae-green text-brandae-dark flex items-center justify-center font-bold text-sm">
                            1
                          </div>
                          <div>
                            <h4 className="font-medium text-white mb-2">Create Account</h4>
                            <p className="text-gray-300">Sign up for a {integration.name} account if you don't have one already.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-brandae-green text-brandae-dark flex items-center justify-center font-bold text-sm">
                            2
                          </div>
                          <div>
                            <h4 className="font-medium text-white mb-2">Get API Credentials</h4>
                            <p className="text-gray-300">Navigate to the developer section and generate your API keys.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-brandae-green text-brandae-dark flex items-center justify-center font-bold text-sm">
                            3
                          </div>
                          <div>
                            <h4 className="font-medium text-white mb-2">Configure Integration</h4>
                            <p className="text-gray-300">Add your credentials to Brandae and configure the integration settings.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-brandae-green text-brandae-dark flex items-center justify-center font-bold text-sm">
                            4
                          </div>
                          <div>
                            <h4 className="font-medium text-white mb-2">Test Connection</h4>
                            <p className="text-gray-300">Verify that the integration is working correctly with a test request.</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-8">
                        <Button 
                          asChild
                          className="bg-brandae-green text-brandae-dark hover:bg-brandae-green/90"
                        >
                          <a href={integration.documentation_url} target="_blank" rel="noopener noreferrer">
                            <BookOpen size={18} className="mr-2" />
                            View Full Documentation
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>

      {/* Related Integrations */}
      {relatedIntegrations.length > 0 && (
        <section className="px-6 md:px-12 lg:px-24 py-20 bg-brandae-darker">
          <div className="container mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-12 text-center">
                Related <span className="gradient-text">Integrations</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedIntegrations.map((relatedIntegration, index) => (
                  <motion.div
                    key={relatedIntegration.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="bg-brandae-gray border-brandae-green/20 hover:border-brandae-green/40 transition-all duration-300 h-full">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <img 
                            src={relatedIntegration.logo_url} 
                            alt={relatedIntegration.name}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div>
                            <h3 className="text-lg font-semibold text-white">{relatedIntegration.name}</h3>
                            <Badge variant="outline" className="border-brandae-green/50 text-brandae-green text-xs">
                              {getCategoryIcon(relatedIntegration.category)} {relatedIntegration.category}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                          {relatedIntegration.description}
                        </p>
                        <Link to={`/integrations/${relatedIntegration.slug}`}>
                          <Button variant="outline" className="w-full border-brandae-green/50 text-brandae-green hover:bg-brandae-green/10">
                            Learn More
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}
