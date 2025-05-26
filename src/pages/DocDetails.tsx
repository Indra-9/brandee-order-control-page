
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  Eye, 
  Share2, 
  ChevronRight, 
  Home, 
  Tag,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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

interface DocMedia {
  id: string;
  media_type: string;
  media_url: string;
  title: string | null;
  description: string | null;
  thumbnail_url: string | null;
}

const DocDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [doc, setDoc] = useState<Documentation | null>(null);
  const [media, setMedia] = useState<DocMedia[]>([]);
  const [relatedDocs, setRelatedDocs] = useState<Documentation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (slug) {
      fetchDoc();
    }
  }, [slug]);

  const fetchDoc = async () => {
    try {
      // Fetch the main document
      const { data: docData, error: docError } = await supabase
        .from('documentation')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();

      if (docError) {
        if (docError.code === 'PGRST116') {
          navigate('/docs');
          return;
        }
        throw docError;
      }

      setDoc(docData);

      // Increment view count
      await supabase
        .from('documentation')
        .update({ views_count: docData.views_count + 1 })
        .eq('id', docData.id);

      // Fetch related media
      const { data: mediaData, error: mediaError } = await supabase
        .from('doc_media')
        .select('*')
        .eq('doc_id', docData.id);

      if (mediaError) throw mediaError;
      setMedia(mediaData || []);

      // Fetch related documents
      const { data: relatedData, error: relatedError } = await supabase
        .from('documentation')
        .select('id, title, slug, excerpt, category, tags, reading_time, views_count')
        .eq('published', true)
        .neq('id', docData.id)
        .or(`category.eq.${docData.category},tags.ov.{${docData.tags.join(',')}}`)
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
      navigate('/docs');
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Success",
        description: "Link copied to clipboard"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy link",
        variant: "destructive"
      });
    }
  };

  const renderYouTubeEmbed = (url: string) => {
    const getYouTubeId = (url: string) => {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      return (match && match[2].length === 11) ? match[2] : null;
    };

    const videoId = getYouTubeId(url);
    if (!videoId) return null;

    return (
      <div className="aspect-video mb-6">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full rounded-lg"
        ></iframe>
      </div>
    );
  };

  const processContent = (content: string) => {
    if (!content) return '';
    
    // Replace YouTube links with embeds
    const youtubeRegex = /\[youtube\](https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+)\[\/youtube\]/g;
    return content.replace(youtubeRegex, (match, url) => {
      const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1];
      if (videoId) {
        return `<div class="aspect-video mb-6"><iframe src="https://www.youtube.com/embed/${videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="w-full h-full rounded-lg"></iframe></div>`;
      }
      return match;
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brandae-dark text-white">
        <Navbar />
        <div className="pt-32 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brandae-green mx-auto mb-4"></div>
            <p className="text-gray-400">Loading documentation...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!doc) {
    return (
      <div className="min-h-screen bg-brandae-dark text-white">
        <Navbar />
        <div className="pt-32 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Document not found</h1>
            <Link to="/docs">
              <Button className="bg-brandae-green text-brandae-dark hover:bg-brandae-green/90">
                Back to Documentation
              </Button>
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
        description={doc.meta_description || doc.excerpt || `Learn about ${doc.title} in our comprehensive documentation.`}
        keywords={doc.seo_keywords || doc.tags.join(', ')}
        canonicalUrl={doc.canonical_url}
      />
      
      <Navbar />
      
      <div className="pt-32 px-6 md:px-12 lg:px-24">
        <div className="container mx-auto max-w-4xl">
          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
              <Link to="/" className="hover:text-brandae-green transition-colors">
                <Home size={16} />
              </Link>
              <ChevronRight size={14} />
              <Link to="/docs" className="hover:text-brandae-green transition-colors">
                Documentation
              </Link>
              <ChevronRight size={14} />
              <Link to={`/docs?category=${encodeURIComponent(doc.category)}`} className="hover:text-brandae-green transition-colors">
                {doc.category}
              </Link>
              <ChevronRight size={14} />
              <span className="text-brandae-green">{doc.title}</span>
            </div>

            <Link 
              to="/docs"
              className="inline-flex items-center gap-2 text-brandae-green hover:text-brandae-green/80 transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Documentation
            </Link>
          </motion.div>

          {/* Article Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge variant="outline" className="border-brandae-green/50 text-brandae-green">
                {doc.category}
              </Badge>
              {doc.featured && (
                <Badge className="bg-brandae-green/20 text-brandae-green">
                  Featured
                </Badge>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {doc.title}
            </h1>

            {doc.excerpt && (
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                {doc.excerpt}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-6">
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>By {doc.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{new Date(doc.created_at).toLocaleDateString()}</span>
              </div>
              {doc.reading_time && (
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{doc.reading_time} min read</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Eye size={16} />
                <span>{doc.views_count + 1} views</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {doc.tags.map((tag) => (
                  <Link 
                    key={tag}
                    to={`/docs?tag=${encodeURIComponent(tag)}`}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-brandae-gray rounded text-xs text-gray-300 hover:bg-brandae-green/20 hover:text-brandae-green transition-colors"
                  >
                    <Tag size={12} />
                    {tag}
                  </Link>
                ))}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="border-brandae-green/50 text-brandae-green hover:bg-brandae-green/10"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                <span className="ml-1">{copied ? 'Copied!' : 'Share'}</span>
              </Button>
            </div>
          </motion.div>

          {/* Featured Image */}
          {doc.featured_image_url && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12"
            >
              <img 
                src={doc.featured_image_url} 
                alt={doc.title}
                className="w-full aspect-video object-cover rounded-lg"
              />
            </motion.div>
          )}

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <div 
              className="article-content prose prose-invert prose-brandae max-w-none"
              dangerouslySetInnerHTML={{ __html: processContent(doc.content || '') }}
            />
          </motion.div>

          {/* Media Gallery */}
          {media.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-12"
            >
              <h3 className="text-2xl font-bold mb-6">Related Media</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {media.map((item) => (
                  <Card key={item.id} className="bg-brandae-gray border-brandae-green/20">
                    <CardContent className="p-4">
                      {item.media_type === 'youtube' && renderYouTubeEmbed(item.media_url)}
                      {item.media_type === 'image' && (
                        <img 
                          src={item.media_url} 
                          alt={item.title || 'Documentation image'}
                          className="w-full aspect-video object-cover rounded"
                        />
                      )}
                      {item.media_type === 'file' && (
                        <a 
                          href={item.media_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-brandae-green hover:text-brandae-green/80"
                        >
                          <ExternalLink size={16} />
                          {item.title || 'Download File'}
                        </a>
                      )}
                      {item.title && (
                        <h4 className="font-semibold text-white mt-3">{item.title}</h4>
                      )}
                      {item.description && (
                        <p className="text-gray-300 text-sm mt-2">{item.description}</p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {/* Related Articles */}
          {relatedDocs.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-12"
            >
              <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedDocs.map((relatedDoc) => (
                  <Link key={relatedDoc.id} to={`/docs/${relatedDoc.slug}`}>
                    <Card className="bg-brandae-gray border-brandae-green/20 hover:border-brandae-green/40 transition-all h-full card-hover-glow">
                      <CardHeader>
                        <Badge variant="outline" className="border-brandae-green/50 text-brandae-green w-fit mb-2">
                          {relatedDoc.category}
                        </Badge>
                        <CardTitle className="text-white line-clamp-2">{relatedDoc.title}</CardTitle>
                        {relatedDoc.excerpt && (
                          <p className="text-gray-300 text-sm line-clamp-3">{relatedDoc.excerpt}</p>
                        )}
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <div className="flex items-center gap-4">
                            {relatedDoc.reading_time && (
                              <div className="flex items-center gap-1">
                                <Clock size={12} />
                                <span>{relatedDoc.reading_time} min</span>
                              </div>
                            )}
                            <div className="flex items-center gap-1">
                              <Eye size={12} />
                              <span>{relatedDoc.views_count}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
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
