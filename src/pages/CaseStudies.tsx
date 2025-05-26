
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Clock, Star, Building, TrendingUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  meta_title: string;
  meta_description: string;
  excerpt: string;
  featured_image_url: string;
  client_name: string;
  client_logo_url: string;
  industry: string;
  project_duration: string;
  project_cost_range: string;
  results_summary: string;
  tags: string[];
  technologies_used: string[];
  featured: boolean;
  published: boolean;
  reading_time: number;
  views_count: number;
  created_at: string;
}

const CaseStudies = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [industries, setIndustries] = useState<string[]>([]);
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const fetchCaseStudies = async () => {
    try {
      const { data, error } = await supabase
        .from('case_studies')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setCaseStudies(data || []);
      
      // Extract unique industries
      const uniqueIndustries = ['All', ...new Set(data?.map(study => study.industry) || [])];
      setIndustries(uniqueIndustries);
    } catch (error) {
      console.error('Error fetching case studies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredStudies = selectedIndustry === "All" 
    ? caseStudies 
    : caseStudies.filter(study => study.industry === selectedIndustry);

  const featuredStudy = caseStudies.find(study => study.featured);

  return (
    <div className="min-h-screen bg-brandae-dark text-white">
      <SEO 
        title="Success Stories & Case Studies - Brandae Platform Results" 
        description="Explore real success stories from businesses that transformed their operations with Brandae's zero-commission marketplace platform. See measurable results and growth achievements." 
        keywords="case studies, success stories, restaurant growth, marketplace results, zero commission platform, business transformation" 
      />

      {/* Floating animated elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div 
          className="absolute top-32 right-16 w-3 h-3 bg-brandae-green/30 rounded-full" 
          animate={{
            y: [0, -15, 0],
            opacity: [0.3, 0.7, 0.3]
          }} 
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }} 
        />
        <motion.div 
          className="absolute top-1/2 left-8 w-4 h-4 bg-[#093d30]/40 rounded-full" 
          animate={{
            x: [0, 20, 0],
            y: [0, -10, 0]
          }} 
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }} 
        />
      </div>

      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 md:px-12 lg:px-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#093d30]/10 to-transparent"></div>
        
        <div className="container mx-auto relative z-10">
          <motion.div 
            className="text-center mb-16" 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Real Success <span className="gradient-text">Stories</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Discover how businesses across industries have transformed their operations and achieved remarkable growth with our zero-commission marketplace platform.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="text-3xl font-bold text-brandae-green mb-2">500%</div>
                <div className="text-gray-400">Average Growth</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-3xl font-bold text-brandae-green mb-2">100%</div>
                <div className="text-gray-400">Commission Savings</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-3xl font-bold text-brandae-green mb-2">50+</div>
                <div className="text-gray-400">Success Stories</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Industry Filter */}
      {industries.length > 1 && (
        <section className="px-6 md:px-12 lg:px-24 mb-12">
          <div className="container mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.2 }} 
              className="flex flex-wrap justify-center gap-4"
            >
              {industries.map((industry, index) => (
                <motion.button 
                  key={industry} 
                  onClick={() => setSelectedIndustry(industry)} 
                  className={`px-6 py-3 rounded-full border transition-all duration-300 ${
                    selectedIndustry === industry 
                      ? 'bg-brandae-green text-brandae-dark border-brandae-green' 
                      : 'border-brandae-green text-brandae-green hover:bg-brandae-green/10'
                  }`} 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }} 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  {industry}
                </motion.button>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Loading State */}
      {isLoading && (
        <section className="px-6 md:px-12 lg:px-24 py-20">
          <div className="container mx-auto text-center">
            <div className="text-gray-400">Loading case studies...</div>
          </div>
        </section>
      )}

      {/* No Studies State */}
      {!isLoading && caseStudies.length === 0 && (
        <section className="px-6 md:px-12 lg:px-24 py-20">
          <div className="container mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">No case studies yet</h2>
            <p className="text-gray-400">Check back soon for inspiring success stories!</p>
          </div>
        </section>
      )}

      {/* Featured Case Study */}
      {selectedIndustry === "All" && featuredStudy && (
        <section className="px-6 md:px-12 lg:px-24 mb-20">
          <div className="container mx-auto">
            <motion.div 
              className="bg-brandae-gray rounded-2xl overflow-hidden border border-brandae-green/20 shadow-lg" 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8, delay: 0.3 }} 
              whileHover={{ boxShadow: "0 20px 40px rgba(201, 242, 104, 0.1)" }}
            >
              <div className="md:flex">
                <div className="md:w-1/2">
                  {featuredStudy.featured_image_url && (
                    <img 
                      src={featuredStudy.featured_image_url} 
                      alt={featuredStudy.title} 
                      className="w-full h-64 md:h-full object-cover" 
                    />
                  )}
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <Badge className="bg-brandae-green/20 text-brandae-green">
                      <Star size={14} className="mr-1" />
                      Featured
                    </Badge>
                    <Badge variant="outline" className="border-brandae-green/50 text-gray-300">
                      <Building size={14} className="mr-1" />
                      {featuredStudy.industry}
                    </Badge>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    {featuredStudy.title}
                  </h2>
                  <p className="text-gray-300 mb-4">
                    {featuredStudy.excerpt}
                  </p>
                  <div className="text-brandae-green font-semibold mb-6">
                    {featuredStudy.results_summary}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <Building size={16} />
                        <span>{featuredStudy.client_name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} />
                        <span>{featuredStudy.reading_time} min read</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp size={16} />
                        <span>{featuredStudy.views_count} views</span>
                      </div>
                    </div>
                    <Link to={`/case-studies/${featuredStudy.slug}`}>
                      <motion.button 
                        className="text-brandae-green hover:text-white transition-colors duration-200 flex items-center gap-2"
                        whileHover={{ x: 5 }}
                      >
                        Read Full Story <ArrowRight size={16} />
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Case Studies Grid */}
      {!isLoading && filteredStudies.length > 0 && (
        <section className="px-6 md:px-12 lg:px-24 pb-20">
          <div className="container mx-auto">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {filteredStudies
                .filter(study => selectedIndustry === "All" ? !study.featured : true)
                .map((study, index) => (
                <motion.article 
                  key={study.id} 
                  className="bg-brandae-gray rounded-xl overflow-hidden border border-brandae-green/20 group hover:border-brandae-green/40 transition-all duration-300" 
                  initial={{ opacity: 0, y: 30 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.6, delay: index * 0.1 }} 
                  whileHover={{ y: -8, boxShadow: "0 15px 30px rgba(201, 242, 104, 0.1)" }}
                >
                  <div className="relative overflow-hidden">
                    {study.featured_image_url && (
                      <img 
                        src={study.featured_image_url} 
                        alt={study.title} 
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" 
                      />
                    )}
                    <div className="absolute top-4 left-4">
                      <Badge variant="outline" className="bg-[#093d30]/80 border-brandae-green/50 text-gray-200 backdrop-blur-sm">
                        <Building size={12} className="mr-1" />
                        {study.industry}
                      </Badge>
                    </div>
                    {study.featured && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-brandae-green/80 text-brandae-dark backdrop-blur-sm">
                          <Star size={12} className="mr-1" />
                          Featured
                        </Badge>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-brandae-green transition-colors">
                      {study.title}
                    </h3>
                    <p className="text-gray-300 mb-4 line-clamp-3">
                      {study.excerpt}
                    </p>
                    
                    <div className="text-brandae-green font-medium text-sm mb-4">
                      {study.results_summary}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                      <div className="flex items-center gap-2">
                        <Building size={14} />
                        <span>{study.client_name}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{study.reading_time}m</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp size={14} />
                          <span>{study.views_count}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {study.tags.slice(0, 2).map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs border-brandae-green/30 text-brandae-green">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Link to={`/case-studies/${study.slug}`}>
                        <motion.button 
                          className="text-brandae-green hover:text-white transition-colors duration-200 flex items-center gap-2" 
                          whileHover={{ x: 5 }}
                        >
                          Read More <ArrowRight size={16} />
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="px-6 md:px-12 lg:px-24 py-20 bg-brandae-darker relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#093d30]/10 to-[#093c2f]/10"></div>
        <div className="container mx-auto relative z-10">
          <motion.div 
            className="text-center max-w-3xl mx-auto" 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Write Your <span className="gradient-text">Success Story</span>?
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              Join the businesses that have transformed their operations and achieved remarkable growth with our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/pricing">
                <motion.button 
                  className="bg-brandae-green text-brandae-dark px-8 py-4 rounded-full font-semibold hover:bg-brandae-green/90 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Your Journey
                </motion.button>
              </Link>
              <Link to="/contact">
                <motion.button 
                  className="border border-brandae-green text-brandae-green px-8 py-4 rounded-full font-semibold hover:bg-brandae-green/10 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Schedule a Demo
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudies;
