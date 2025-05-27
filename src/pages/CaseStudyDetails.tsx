
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Eye, Share2, Calendar, Building2, Tag, CheckCircle, ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';

interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  meta_title: string | null;
  meta_description: string | null;
  excerpt: string | null;
  content: string | null;
  featured_image_url: string | null;
  client_name: string;
  client_logo_url: string | null;
  industry: string;
  project_duration: string | null;
  project_cost_range: string | null;
  results_summary: string | null;
  tags: string[] | null;
  technologies_used: string[] | null;
  challenge: string | null;
  solution: string | null;
  results: string | null;
  testimonial: string | null;
  testimonial_author: string | null;
  testimonial_position: string | null;
  featured: boolean;
  published: boolean;
  seo_keywords: string | null;
  canonical_url: string | null;
  reading_time: number | null;
  views_count: number;
  created_at: string;
  updated_at: string;
}

export default function CaseStudyDetails() {
  const { slug } = useParams<{ slug: string }>();
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [relatedStudies, setRelatedStudies] = useState<CaseStudy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (slug) {
      fetchCaseStudy();
    }
  }, [slug]);

  const fetchCaseStudy = async () => {
    try {
      // Fetch the main case study with all fields
      const { data: study, error: studyError } = await supabase
        .from('case_studies')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();

      if (studyError) throw studyError;

      if (study) {
        setCaseStudy(study);
        
        // Increment view count
        await supabase
          .from('case_studies')
          .update({ views_count: (study.views_count || 0) + 1 })
          .eq('id', study.id);

        // Fetch related case studies with all required fields
        const { data: related, error: relatedError } = await supabase
          .from('case_studies')
          .select('*')
          .eq('published', true)
          .neq('id', study.id)
          .eq('industry', study.industry)
          .limit(3);

        if (relatedError) throw relatedError;
        setRelatedStudies(related || []);
      }
    } catch (error) {
      console.error('Error fetching case study:', error);
      toast({
        title: "Error",
        description: "Failed to load case study",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brandae-dark text-white">
        <Navbar />
        <div className="pt-32 px-6 md:px-12 lg:px-24">
          <div className="container mx-auto text-center">
            <div className="text-gray-400">Loading case study...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!caseStudy) {
    return (
      <div className="min-h-screen bg-brandae-dark text-white">
        <Navbar />
        <div className="pt-32 px-6 md:px-12 lg:px-24">
          <div className="container mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Case Study Not Found</h1>
            <p className="text-gray-400 mb-8">The case study you're looking for doesn't exist or has been removed.</p>
            <Link to="/case-studies" className="text-brandae-green hover:underline">
              ← Back to Case Studies
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brandae-dark text-white">
      <SEO 
        title={caseStudy.meta_title || caseStudy.title} 
        description={caseStudy.meta_description || caseStudy.excerpt} 
        keywords={caseStudy.seo_keywords || `${caseStudy.industry}, case study, success story, ${caseStudy.tags.join(', ')}`}
      />

      <Navbar />
      
      {/* Back Navigation */}
      <section className="pt-32 pb-8 px-6 md:px-12 lg:px-24">
        <div className="container mx-auto">
          <Link to="/case-studies" className="inline-flex items-center text-brandae-green hover:underline mb-8">
            <ArrowLeft size={20} className="mr-2" />
            Back to Case Studies
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
            {caseStudy.featured_image_url && (
              <div className="mb-8 rounded-2xl overflow-hidden">
                <img 
                  src={caseStudy.featured_image_url} 
                  alt={caseStudy.title} 
                  className="w-full h-64 md:h-96 object-cover" 
                />
              </div>
            )}
            
            <div className="flex flex-wrap gap-4 mb-6">
              <Badge className="bg-brandae-green/20 text-brandae-green">
                <Building2 size={14} className="mr-1" />
                {caseStudy.industry}
              </Badge>
              {caseStudy.featured && (
                <Badge className="bg-brandae-green text-brandae-dark">
                  Featured Case Study
                </Badge>
              )}
            </div>

            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              {caseStudy.title}
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-4xl">
              {caseStudy.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-8">
              <div className="flex items-center gap-2">
                <Building2 size={16} />
                <span>{caseStudy.client_name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>Duration: {caseStudy.project_duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{caseStudy.reading_time} min read</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye size={16} />
                <span>{caseStudy.views_count} views</span>
              </div>
            </div>

            {/* Results Summary Highlight */}
            <div className="bg-brandae-green/10 border border-brandae-green/20 rounded-xl p-6 mb-12">
              <h3 className="text-brandae-green font-semibold mb-2">Key Results</h3>
              <p className="text-lg">{caseStudy.results_summary}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-6 md:px-12 lg:px-24 pb-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6, delay: 0.2 }}
                className="prose prose-invert max-w-none"
              >
                {/* Challenge Section */}
                {caseStudy.challenge && (
                  <Card className="bg-brandae-gray border-brandae-green/20 mb-8">
                    <CardHeader>
                      <CardTitle className="text-brandae-green">The Challenge</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300">{caseStudy.challenge}</p>
                    </CardContent>
                  </Card>
                )}

                {/* Solution Section */}
                {caseStudy.solution && (
                  <Card className="bg-brandae-gray border-brandae-green/20 mb-8">
                    <CardHeader>
                      <CardTitle className="text-brandae-green">Our Solution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300">{caseStudy.solution}</p>
                    </CardContent>
                  </Card>
                )}

                {/* Results Section */}
                {caseStudy.results && (
                  <Card className="bg-brandae-gray border-brandae-green/20 mb-8">
                    <CardHeader>
                      <CardTitle className="text-brandae-green">The Results</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300">{caseStudy.results}</p>
                    </CardContent>
                  </Card>
                )}

                {/* Technologies Used */}
                {caseStudy.technologies_used.length > 0 && (
                  <Card className="bg-brandae-gray border-brandae-green/20 mb-8">
                    <CardHeader>
                      <CardTitle className="text-brandae-green">Technologies Used</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {caseStudy.technologies_used.map(tech => (
                          <Badge key={tech} variant="outline" className="border-brandae-green/50 text-brandae-green">
                            <CheckCircle size={12} className="mr-1" />
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Testimonial */}
                {caseStudy.testimonial && (
                  <Card className="bg-gradient-to-br from-brandae-green/10 to-[#093d30]/20 border-brandae-green/30 mb-8">
                    <CardContent className="p-8">
                      <blockquote className="text-xl italic text-gray-200 mb-4">
                        "{caseStudy.testimonial}"
                      </blockquote>
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="font-semibold text-brandae-green">{caseStudy.testimonial_author}</div>
                          <div className="text-gray-400">{caseStudy.testimonial_position}</div>
                          <div className="text-gray-400">{caseStudy.client_name}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
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
                {/* Project Details */}
                <Card className="bg-brandae-gray border-brandae-green/20 mb-8">
                  <CardHeader>
                    <CardTitle className="text-brandae-green">Project Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-gray-400 text-sm">Client</div>
                      <div className="font-semibold">{caseStudy.client_name}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Industry</div>
                      <div className="font-semibold">{caseStudy.industry}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Duration</div>
                      <div className="font-semibold">{caseStudy.project_duration}</div>
                    </div>
                    {caseStudy.project_cost_range && (
                      <div>
                        <div className="text-gray-400 text-sm">Investment Range</div>
                        <div className="font-semibold">{caseStudy.project_cost_range}</div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Tags */}
                {caseStudy.tags.length > 0 && (
                  <Card className="bg-brandae-gray border-brandae-green/20 mb-8">
                    <CardHeader>
                      <CardTitle className="text-brandae-green">Tags</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {caseStudy.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="border-brandae-green/50 text-brandae-green">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* CTA */}
                <Card className="bg-gradient-to-br from-brandae-green/10 to-[#093d30]/20 border-brandae-green/30">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-lg font-semibold mb-4">Ready for Similar Results?</h3>
                    <p className="text-gray-300 text-sm mb-6">
                      Let's discuss how we can help transform your business.
                    </p>
                    <Link to="/contact">
                      <motion.button 
                        className="w-full bg-brandae-green text-brandae-dark px-6 py-3 rounded-full font-semibold hover:bg-brandae-green/90 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Get Started Today
                      </motion.button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Case Studies */}
      {relatedStudies.length > 0 && (
        <section className="px-6 md:px-12 lg:px-24 py-20 bg-brandae-darker">
          <div className="container mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-12 text-center">
                More Success Stories in <span className="gradient-text">{caseStudy.industry}</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedStudies.map((study, index) => (
                  <motion.div
                    key={study.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="bg-brandae-gray border-brandae-green/20 hover:border-brandae-green/40 transition-all duration-300 h-full">
                      <CardContent className="p-0">
                        {study.featured_image_url && (
                          <img 
                            src={study.featured_image_url} 
                            alt={study.title} 
                            className="w-full h-48 object-cover rounded-t-lg" 
                          />
                        )}
                        <div className="p-6">
                          <h3 className="text-lg font-semibold mb-3 line-clamp-2">
                            {study.title}
                          </h3>
                          <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                            {study.excerpt}
                          </p>
                          <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                            <span>{study.client_name}</span>
                            <span>{study.reading_time} min read</span>
                          </div>
                          <Link to={`/case-studies/${study.slug}`}>
                            <motion.button 
                              className="text-brandae-green hover:text-white transition-colors duration-200 flex items-center gap-2"
                              whileHover={{ x: 5 }}
                            >
                              Read Story <ArrowRight size={16} />
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
