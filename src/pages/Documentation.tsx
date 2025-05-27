
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, BookOpen, Star, Clock, Eye, ArrowRight, Filter } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Documentation {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
  featured: boolean;
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
  sort_order: number;
}

const Documentation = () => {
  const [docs, setDocs] = useState<Documentation[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDocumentation();
    fetchCategories();
  }, []);

  const fetchDocumentation = async () => {
    try {
      const { data, error } = await supabase
        .from('documentation')
        .select('*')
        .eq('published', true)
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDocs(data || []);
    } catch (error) {
      console.error('Error fetching documentation:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('doc_categories')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredDocs = docs.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredDocs = filteredDocs.filter(doc => doc.featured);
  const regularDocs = filteredDocs.filter(doc => !doc.featured);

  return (
    <div className="min-h-screen bg-brandae-dark text-white">
      <SEO 
        title="Documentation - Brandae Knowledge Base" 
        description="Comprehensive documentation and guides for Brandae platform. Learn how to maximize your restaurant's potential with our zero-commission marketplace." 
        keywords="brandae documentation, restaurant guides, help center, knowledge base" 
      />

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
              <span className="gradient-text">Knowledge Base</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Everything you need to know about using Brandae to grow your business. 
              From getting started to advanced features and best practices.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Search documentation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 py-4 text-lg bg-brandae-gray border-brandae-green/20 text-white placeholder-gray-400"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="px-6 md:px-12 lg:px-24 mb-20">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">Browse by Category</h2>
            
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button
                variant={selectedCategory === 'All' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('All')}
                className={selectedCategory === 'All' 
                  ? 'bg-brandae-green text-brandae-dark' 
                  : 'border-brandae-green/50 text-brandae-green hover:bg-brandae-green/10'
                }
              >
                All Categories
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.name ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category.name)}
                  className={selectedCategory === category.name 
                    ? 'bg-brandae-green text-brandae-dark' 
                    : 'border-brandae-green/50 text-brandae-green hover:bg-brandae-green/10'
                  }
                >
                  {category.name}
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link to={`/docs/category/${category.slug}`}>
                    <Card className="bg-brandae-gray border-brandae-green/20 hover:border-brandae-green/40 transition-all duration-300 group h-full">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                          <div 
                            className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                            style={{ backgroundColor: `${category.color}20`, color: category.color }}
                          >
                            <BookOpen size={24} />
                          </div>
                          <h3 className="text-lg font-semibold group-hover:text-brandae-green transition-colors">
                            {category.name}
                          </h3>
                        </div>
                        <p className="text-gray-300 text-sm mb-4">{category.description}</p>
                        <div className="flex items-center text-brandae-green text-sm">
                          <span>Explore guides</span>
                          <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredDocs.length > 0 && (
        <section className="px-6 md:px-12 lg:px-24 mb-20">
          <div className="container mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold mb-8 flex items-center">
                <Star className="mr-3 text-brandae-green" size={32} />
                Featured Articles
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {featuredDocs.slice(0, 2).map((doc, index) => (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Link to={`/docs/${doc.slug}`}>
                      <Card className="bg-brandae-gray border-brandae-green/20 hover:border-brandae-green/40 transition-all duration-300 group h-full overflow-hidden">
                        {doc.featured_image_url && (
                          <div className="relative overflow-hidden">
                            <img 
                              src={doc.featured_image_url} 
                              alt={doc.title}
                              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute top-4 right-4">
                              <Badge className="bg-brandae-green text-brandae-dark">
                                <Star size={12} className="mr-1" />
                                Featured
                              </Badge>
                            </div>
                          </div>
                        )}
                        <CardContent className="p-6">
                          <Badge className="bg-brandae-green/20 text-brandae-green mb-3">
                            {doc.category}
                          </Badge>
                          <h3 className="text-xl font-semibold mb-3 group-hover:text-brandae-green transition-colors">
                            {doc.title}
                          </h3>
                          <p className="text-gray-300 mb-4 line-clamp-3">{doc.excerpt}</p>
                          <div className="flex items-center justify-between text-sm text-gray-400">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <Clock size={14} />
                                <span>{doc.reading_time} min read</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Eye size={14} />
                                <span>{doc.views_count} views</span>
                              </div>
                            </div>
                            <ArrowRight size={16} className="text-brandae-green group-hover:translate-x-1 transition-transform" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* All Articles */}
      <section className="px-6 md:px-12 lg:px-24 pb-20">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-8">
              {selectedCategory === 'All' ? 'All Articles' : `${selectedCategory} Articles`}
            </h2>
            
            {isLoading ? (
              <div className="text-center py-12">
                <div className="text-gray-400">Loading documentation...</div>
              </div>
            ) : regularDocs.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400">No articles found matching your criteria.</div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularDocs.map((doc, index) => (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Link to={`/docs/${doc.slug}`}>
                      <Card className="bg-brandae-gray border-brandae-green/20 hover:border-brandae-green/40 transition-all duration-300 group h-full">
                        <CardContent className="p-6">
                          <Badge className="bg-brandae-green/20 text-brandae-green mb-3">
                            {doc.category}
                          </Badge>
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
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Documentation;
