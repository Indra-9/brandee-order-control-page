
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Eye, Share2, Calendar, Tag, BookOpen, ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';

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
  created_at: string;
  updated_at: string;
}

export default function DocDetails() {
  const { slug } = useParams<{ slug: string }>();
  const [doc, setDoc] = useState<Documentation | null>(null);
  const [relatedDocs, setRelatedDocs] = useState<Documentation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (slug) {
      fetchDoc();
    }
  }, [slug]);

  const fetchDoc = async () => {
    try {
      // Fetch the main documentation
      const { data: docData, error: docError } = await supabase
        .from('documentation')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();

      if (docError) throw docError;

      if (docData) {
        setDoc(docData);
        
        // Increment view count
        await supabase
          .from('documentation')
          .update({ views_count: (docData.views_count || 0) + 1 })
          .eq('id', docData.id);

        // Fetch related documentation
        const { data: relatedData, error: relatedError } = await supabase
          .from('documentation')
          .select('*')
          .eq('published', true)
          .neq('id', docData.id)
          .eq('category', docData.category)
          .limit(3);

        if (relatedError) throw relatedError;
        setRelatedDocs(relatedData || []);
      }
    } catch (error) {
      console.error('Error fetching documentation:', error);
      toast({
        title: "Error",
        description: "Failed to load documentation",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: doc?.title,
        text: doc?.excerpt || '',
        url: window.location.href
      });
    } catch (error) {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "Documentation link copied to clipboard"
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brandae-dark text-white">
        <Navbar />
        <div className="pt-32 px-6 md:px-12 lg:px-24">
          <div className="container mx-auto text-center">
            <div className="text-gray-400">Loading documentation...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!doc) {
    return (
      <div className="min-h-screen bg-brandae-dark text-white">
        <Navbar />
        <div className="pt-32 px-6 md:px-12 lg:px-24">
          <div className="container mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Documentation Not Found</h1>
            <p className="text-gray-400 mb-8">The documentation you're looking for doesn't exist or has been removed.</p>
            <Link to="/docs" className="text-brandae-green hover:underline">
              ← Back to Documentation
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brandae-dark text-white">
      <SEO 
        title={doc.meta_title || doc.title} 
        description={doc.meta_description || doc.excerpt} 
        keywords={doc.seo_keywords || `${doc.category}, documentation, ${doc.tags.join(', ')}`}
      />

      <Navbar />
      
      {/* Back Navigation */}
      <section className="pt-32 pb-8 px-6 md:px-12 lg:px-24">
        <div className="container mx-auto">
          <Link to="/docs" className="inline-flex items-center text-brandae-green hover:underline mb-8">
            <ArrowLeft size={20} className="mr-2" />
            Back to Documentation
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
          >
            {doc.featured_image_url && (
              <div className="mb-8 rounded-2xl overflow-hidden">
                <img 
                  src={doc.featured_image_url} 
                  alt={doc.title} 
                  className="w-full h-64 md:h-96 object-cover" 
                />
              </div>
            )}
            
            <div className="flex flex-wrap gap-4 mb-6">
              <Badge className="bg-brandae-green/20 text-brandae-green">
                <BookOpen size={14} className="mr-1" />
                {doc.category}
              </Badge>
              {doc.featured && (
                <Badge className="bg-brandae-green text-brandae-dark">
                  Featured Guide
                </Badge>
              )}
            </div>

            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              {doc.title}
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-4xl">
              {doc.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-8">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>By {doc.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{doc.reading_time} min read</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye size={16} />
                <span>{doc.views_count} views</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleShare}
                className="border-brandae-green/30 text-brandae-green hover:bg-brandae-green/10"
              >
                <Share2 size={14} className="mr-2" />
                Share
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-6 md:px-12 lg:px-24 pb-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6, delay: 0.2 }}
                className="prose prose-invert max-w-none"
              >
                <div 
                  className="text-gray-200 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: doc.content || '' }}
                />
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.6, delay: 0.4 }}
                className="sticky top-32"
              >
                {/* Tags */}
                {doc.tags.length > 0 && (
                  <Card className="bg-brandae-gray border-brandae-green/20 mb-8">
                    <CardHeader>
                      <CardTitle className="text-brandae-green flex items-center gap-2">
                        <Tag size={18} />
                        Tags
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {doc.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="border-brandae-green/50 text-brandae-green">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Quick Actions */}
                <Card className="bg-gradient-to-br from-brandae-green/10 to-[#093d30]/20 border-brandae-green/30">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-lg font-semibold mb-4">Need More Help?</h3>
                    <p className="text-gray-300 text-sm mb-6">
                      Can't find what you're looking for? We're here to help.
                    </p>
                    <div className="space-y-3">
                      <Link to="/docs" className="block">
                        <Button variant="outline" className="w-full border-brandae-green/50 text-brandae-green hover:bg-brandae-green/10">
                          Browse All Docs
                        </Button>
                      </Link>
                      <Link to="/contact" className="block">
                        <Button className="w-full bg-brandae-green text-brandae-dark hover:bg-brandae-green/90">
                          Contact Support
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Documentation */}
      {relatedDocs.length > 0 && (
        <section className="px-6 md:px-12 lg:px-24 py-20 bg-brandae-darker">
          <div className="container mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-12 text-center">
                Related <span className="gradient-text">Documentation</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedDocs.map((relatedDoc, index) => (
                  <motion.div
                    key={relatedDoc.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="bg-brandae-gray border-brandae-green/20 hover:border-brandae-green/40 transition-all duration-300 h-full">
                      <CardContent className="p-0">
                        {relatedDoc.featured_image_url && (
                          <img 
                            src={relatedDoc.featured_image_url} 
                            alt={relatedDoc.title} 
                            className="w-full h-48 object-cover rounded-t-lg" 
                          />
                        )}
                        <div className="p-6">
                          <h3 className="text-lg font-semibold mb-3 line-clamp-2">
                            {relatedDoc.title}
                          </h3>
                          <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                            {relatedDoc.excerpt}
                          </p>
                          <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                            <span>{relatedDoc.reading_time} min read</span>
                            <span>{relatedDoc.views_count} views</span>
                          </div>
                          <Link to={`/docs/${relatedDoc.slug}`}>
                            <motion.button 
                              className="text-brandae-green hover:text-white transition-colors duration-200 flex items-center gap-2"
                              whileHover={{ x: 5 }}
                            >
                              Read Guide <ArrowRight size={16} />
                            </motion.button>
                          </Link>
                        </div>
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
};
