import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, Clock, Eye, ArrowRight, BookOpen } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface Documentation {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
  reading_time: number;
  views_count: number;
  featured_image_url: string;
  created_at: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
}

const DocCategory = () => {
  const { slug } = useParams<{ slug: string }>();
  const [docs, setDocs] = useState<Documentation[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchCategory();
      fetchCategoryDocs();
    }
  }, [slug]);

  const fetchCategory = async () => {
    try {
      const { data, error } = await supabase
        .from('doc_categories')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) throw error;
      setCategory(data);
    } catch (error) {
      console.error('Error fetching category:', error);
    }
  };

  const fetchCategoryDocs = async () => {
    try {
      // First get the category name from slug
      const { data: categoryData, error: categoryError } = await supabase
        .from('doc_categories')
        .select('name')
        .eq('slug', slug)
        .single();

      if (categoryError) throw categoryError;

      // Then fetch docs for this category
      const { data, error } = await supabase
        .from('documentation')
        .select('*')
        .eq('published', true)
        .eq('category', categoryData.name)
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDocs(data || []);
    } catch (error) {
      console.error('Error fetching category docs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredDocs = docs.filter(doc => {
    return doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           doc.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
           doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brandae-dark text-white">
        <Navbar />
        <div className="pt-32 px-6 md:px-12 lg:px-24">
          <div className="container mx-auto">
            <div className="text-center py-12">
              <div className="text-gray-400">Loading category...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-brandae-dark text-white">
        <Navbar />
        <div className="pt-32 px-6 md:px-12 lg:px-24">
          <div className="container mx-auto">
            <div className="text-center py-12">
              <h1 className="text-2xl font-bold mb-4">Category not found</h1>
              <Link to="/docs">
                <button className="text-brandae-green hover:underline">
                  ← Back to Documentation
                </button>
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
        title={`${category?.name || 'Category'} - Brandae Documentation`} 
        description={`${category?.description || 'Documentation category'} - Comprehensive guides and tutorials for ${category?.name?.toLowerCase() || 'this category'}.`} 
        keywords={`${category?.name?.toLowerCase() || 'category'}, brandae documentation, guides, tutorials`} 
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

      {/* Category Header */}
      <section className="pb-12 px-6 md:px-12 lg:px-24">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center mb-6">
              <div 
                className="w-16 h-16 rounded-lg flex items-center justify-center mr-4"
                style={{ backgroundColor: `${category.color}20`, color: category.color }}
              >
                <BookOpen size={32} />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">
                {category.name}
              </h1>
            </div>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              {category.description}
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder={`Search ${category.name.toLowerCase()} articles...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 py-3 bg-brandae-gray border-brandae-green/20 text-white placeholder-gray-400"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="px-6 md:px-12 lg:px-24 pb-20">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {filteredDocs.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400">
                  {searchTerm ? 'No articles found matching your search.' : 'No articles in this category yet.'}
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-8">
                  {searchTerm ? `Search Results (${filteredDocs.length})` : `All ${category.name} Articles`}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredDocs.map((doc, index) => (
                    <motion.div
                      key={doc.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Link to={`/docs/${doc.slug}`}>
                        <Card className="bg-brandae-gray border-brandae-green/20 hover:border-brandae-green/40 transition-all duration-300 group h-full">
                          {doc.featured_image_url && (
                            <div className="relative overflow-hidden">
                              <img 
                                src={doc.featured_image_url} 
                                alt={doc.title}
                                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            </div>
                          )}
                          <CardContent className="p-6">
                            <h3 className="text-lg font-semibold mb-3 group-hover:text-brandae-green transition-colors line-clamp-2">
                              {doc.title}
                            </h3>
                            <p className="text-gray-300 text-sm mb-4 line-clamp-3">{doc.excerpt}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {doc.tags.slice(0, 3).map(tag => (
                                <Badge key={tag} variant="outline" className="text-xs border-brandae-green/30 text-brandae-green">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex items-center justify-between text-sm text-gray-400">
                              <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1">
                                  <Clock size={12} />
                                  <span>{doc.reading_time}m</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Eye size={12} />
                                  <span>{doc.views_count}</span>
                                </div>
                              </div>
                              <ArrowRight size={14} className="text-brandae-green group-hover:translate-x-1 transition-transform" />
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DocCategory;
