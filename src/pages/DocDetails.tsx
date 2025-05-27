
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Tag, Share2, Eye, Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';

interface Documentation {
  id: string;
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
  reading_time: number;
  views_count: number;
  seo_keywords: string;
  canonical_url: string;
  created_at: string;
  updated_at: string;
}

interface RelatedDoc {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
  reading_time: number;
  views_count: number;
}

const DocDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const [doc, setDoc] = useState<Documentation | null>(null);
  const [relatedDocs, setRelatedDocs] = useState<RelatedDoc[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (slug) {
      fetchDocumentation();
    }
  }, [slug]);

  const fetchDocumentation = async () => {
    try {
      // Fetch the main documentation
      const { data: docData, error: docError } = await supabase
        .from('documentation')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();

      if (docError) throw docError;
      
      setDoc(docData);

      // Update view count
      await supabase
        .from('documentation')
        .update({ views_count: (docData.views_count || 0) + 1 })
        .eq('id', docData.id);

      // Fetch related documents
      const { data: relatedData, error: relatedError } = await supabase
        .from('documentation')
        .select('id, title, slug, excerpt, category, tags, reading_time, views_count')
        .eq('published', true)
        .neq('id', docData.id)
        .or(`category.eq.${docData.category},tags.cs.{${docData.tags.join(',')}}`)
        .limit(3);

      if (relatedError) throw relatedError;
      setRelatedDocs(relatedData || []);

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
    if (navigator.share) {
      try {
        await navigator.share({
          title: doc?.title,
          text: doc?.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "Article link copied to clipboard"
      });
    }
  };

  const processContent = (content: string) => {
    // Process YouTube embeds
    let processedContent = content.replace(
      /\[youtube\](.*?)\[\/youtube\]/g,
      '<div class="youtube-container"><iframe src="https://www.youtube.com/embed/$1" frameborder="0" allowfullscreen></iframe></div>'
    );

    // Process image embeds
    processedContent = processedContent.replace(
      /\[image\](.*?)\[\/image\]/g,
      '<img src="$1" alt="Documentation image" class="doc-image" />'
    );

    return processedContent;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brandae-dark text-white">
        <Navbar />
        <div className="pt-32 px-6 md:px-12 lg:px-24">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center py-12">
              <div className="text-gray-400">Loading documentation...</div>
            </div>
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
          <div className="container mx-auto max-w-4xl">
            <div className="text-center py-12">
              <h1 className="text-2xl font-bold mb-4">Documentation not found</h1>
              <Link to="/docs">
                <Button className="bg-brandae-green text-brandae-dark hover:bg-brandae-green/90">
                  Back to Documentation
                </Button>
              </Link>
            </div>
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
        keywords={doc.seo_keywords}
        ogUrl={doc.canonical_url || `${window.location.origin}/docs/${doc.slug}`}
      />
      
      <Navbar />
      
      <div className="pt-32 px-6 md:px-12 lg:px-24">
        <div className="container mx-auto max-w-4xl">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <Link to="/docs">
              <Button variant="outline" className="border-brandae-green/50 text-brandae-green hover:bg-brandae-green/10">
                <ArrowLeft size={16} className="mr-2" />
                Back to Documentation
              </Button>
            </Link>
          </motion.div>

          {/* Article Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            {doc.featured_image_url && (
              <div className="mb-6">
                <img 
                  src={doc.featured_image_url} 
                  alt={doc.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            )}
            
            <div className="flex items-center mb-4">
              <Badge className="bg-brandae-green/20 text-brandae-green mr-4">
                {doc.category}
              </Badge>
              <div className="flex items-center text-sm text-gray-400 mr-4">
                <Clock size={14} className="mr-1" />
                {doc.reading_time} min read
              </div>
              <div className="flex items-center text-sm text-gray-400 mr-4">
                <Eye size={14} className="mr-1" />
                {doc.views_count} views
              </div>
              <div className="flex items-center text-sm text-gray-400">
                <Calendar size={14} className="mr-1" />
                {new Date(doc.created_at).toLocaleDateString()}
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              {doc.title}
            </h1>
            
            {doc.excerpt && (
              <p className="text-xl text-gray-300 mb-6">{doc.excerpt}</p>
            )}

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-400">
                By {doc.author}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="border-brandae-green/50 text-brandae-green hover:bg-brandae-green/10"
              >
                <Share2 size={16} className="mr-2" />
                Share
              </Button>
            </div>
          </motion.div>

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div 
              className="prose prose-invert prose-lg max-w-none
                         prose-headings:text-white prose-headings:font-bold
                         prose-h2:text-brandae-green prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                         prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                         prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4
                         prose-a:text-brandae-green prose-a:no-underline hover:prose-a:underline
                         prose-ul:text-gray-300 prose-ol:text-gray-300
                         prose-li:mb-2 prose-strong:text-white
                         prose-code:text-brandae-green prose-code:bg-brandae-gray prose-code:px-2 prose-code:py-1 prose-code:rounded
                         prose-pre:bg-brandae-gray prose-pre:border prose-pre:border-brandae-green/20"
              dangerouslySetInnerHTML={{ __html: processContent(doc.content || '') }}
            />
          </motion.div>

          {/* Tags */}
          {doc.tags.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-12"
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Tag className="mr-2 text-brandae-green" size={20} />
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {doc.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="border-brandae-green/50 text-brandae-green">
                    {tag}
                  </Badge>
                ))}
              </div>
            </motion.div>
          )}

          {/* Related Articles */}
          {relatedDocs.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-12"
            >
              <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedDocs.map((relatedDoc, index) => (
                  <motion.div
                    key={relatedDoc.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                  >
                    <Link to={`/docs/${relatedDoc.slug}`}>
                      <Card className="bg-brandae-gray border-brandae-green/20 hover:border-brandae-green/40 transition-all duration-300 h-full group">
                        <CardContent className="p-4">
                          <Badge className="bg-brandae-green/20 text-brandae-green mb-2 text-xs">
                            {relatedDoc.category}
                          </Badge>
                          <h4 className="font-semibold text-white group-hover:text-brandae-green transition-colors mb-2 line-clamp-2">
                            {relatedDoc.title}
                          </h4>
                          <p className="text-sm text-gray-300 mb-3 line-clamp-2">{relatedDoc.excerpt}</p>
                          <div className="flex items-center text-xs text-gray-400">
                            <Clock size={12} className="mr-1" />
                            {relatedDoc.reading_time} min read
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocDetails;
