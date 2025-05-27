
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Book, Clock, Tag, ArrowRight, Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import { Link } from 'react-router-dom';

interface Documentation {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
  reading_time: number;
  views_count: number;
  featured: boolean;
  published: boolean;
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
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchDocumentation();
    fetchCategories();
  }, []);

  const fetchDocumentation = async () => {
    try {
      const { data, error } = await supabase
        .from('documentation')
        .select('id, title, slug, excerpt, category, tags, reading_time, views_count, featured, published, created_at')
        .eq('published', true)
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDocs(data || []);
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
    }
  };

  const filteredDocs = docs.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const featuredDocs = filteredDocs.filter(doc => doc.featured).slice(0, 3);
  const regularDocs = filteredDocs.filter(doc => !doc.featured);

  return (
    <div className="min-h-screen bg-brandae-dark text-white">
      <SEO 
        title="Documentation - Brandae Knowledge Base"
        description="Comprehensive documentation and guides for the Brandae platform. Learn how to set up your restaurant, manage orders, and grow your business."
        keywords="brandae documentation, restaurant platform guide, food delivery help, restaurant management"
      />
      
      <Navbar />
      
      <div className="pt-32 px-6 md:px-12 lg:px-24">
        <div className="container mx-auto max-w-7xl">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Knowledge Base</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Everything you need to know about using Brandae to grow your restaurant business
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Search documentation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg bg-brandae-gray border-brandae-green/20 focus:border-brandae-green rounded-lg"
              />
            </div>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('all')}
                className={selectedCategory === 'all' 
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
          </motion.div>

          {/* Featured Articles */}
          {featuredDocs.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold mb-8 flex items-center">
                <Star className="mr-3 text-brandae-green" size={32} />
                Featured Articles
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {featuredDocs.map((doc, index) => (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Link to={`/docs/${doc.slug}`}>
                      <Card className="bg-brandae-gray border-brandae-green/20 hover:border-brandae-green/40 transition-all duration-300 h-full group">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <Badge className="bg-brandae-green/20 text-brandae-green mb-3">
                              {doc.category}
                            </Badge>
                            <Star className="text-brandae-green" size={16} />
                          </div>
                          <CardTitle className="text-white group-hover:text-brandae-green transition-colors">
                            {doc.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-300 mb-4 line-clamp-3">{doc.excerpt}</p>
                          <div className="flex items-center justify-between text-sm text-gray-400">
                            <div className="flex items-center">
                              <Clock size={14} className="mr-1" />
                              {doc.reading_time} min read
                            </div>
                            <ArrowRight size={14} className="group-hover:text-brandae-green transition-colors" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* All Articles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-8 flex items-center">
              <Book className="mr-3 text-brandae-green" size={32} />
              All Articles
            </h2>
            
            {isLoading ? (
              <div className="text-center py-12">
                <div className="text-gray-400">Loading documentation...</div>
              </div>
            ) : regularDocs.length === 0 ? (
              <Card className="bg-brandae-gray border-brandae-green/20">
                <CardContent className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-2 text-white">No articles found</h3>
                  <p className="text-gray-400">Try adjusting your search or category filter</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {regularDocs.map((doc, index) => (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <Link to={`/docs/${doc.slug}`}>
                      <Card className="bg-brandae-gray border-brandae-green/20 hover:border-brandae-green/40 transition-all duration-300 group">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center mb-3">
                                <Badge className="bg-brandae-green/20 text-brandae-green mr-3">
                                  {doc.category}
                                </Badge>
                                <div className="flex items-center text-sm text-gray-400">
                                  <Clock size={14} className="mr-1" />
                                  {doc.reading_time} min read
                                </div>
                              </div>
                              <h3 className="text-xl font-semibold text-white group-hover:text-brandae-green transition-colors mb-2">
                                {doc.title}
                              </h3>
                              <p className="text-gray-300 mb-4 line-clamp-2">{doc.excerpt}</p>
                              {doc.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                  {doc.tags.slice(0, 3).map((tag, tagIndex) => (
                                    <div key={tagIndex} className="flex items-center text-xs text-gray-400">
                                      <Tag size={12} className="mr-1" />
                                      {tag}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                            <ArrowRight size={20} className="text-gray-400 group-hover:text-brandae-green transition-colors ml-4" />
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
      </div>
    </div>
  );
};

export default Documentation;
