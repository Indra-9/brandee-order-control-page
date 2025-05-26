
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen, Tag, Clock, User, Eye, ChevronRight, Home, Filter } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  reading_time: number | null;
  views_count: number;
  created_at: string;
  updated_at: string;
}

interface DocCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  color: string;
  sort_order: number;
}

const Docs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [docs, setDocs] = useState<Documentation[]>([]);
  const [categories, setCategories] = useState<DocCategory[]>([]);
  const [filteredDocs, setFilteredDocs] = useState<Documentation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedTag, setSelectedTag] = useState(searchParams.get('tag') || '');
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterDocs();
  }, [docs, searchQuery, selectedCategory, selectedTag]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    if (selectedTag) params.set('tag', selectedTag);
    setSearchParams(params, { replace: true });
  }, [searchQuery, selectedCategory, selectedTag, setSearchParams]);

  const fetchData = async () => {
    try {
      const [docsResponse, categoriesResponse] = await Promise.all([
        supabase
          .from('documentation')
          .select('*')
          .eq('published', true)
          .order('sort_order', { ascending: true })
          .order('created_at', { ascending: false }),
        supabase
          .from('doc_categories')
          .select('*')
          .order('sort_order', { ascending: true })
      ]);

      if (docsResponse.error) throw docsResponse.error;
      if (categoriesResponse.error) throw categoriesResponse.error;

      setDocs(docsResponse.data || []);
      setCategories(categoriesResponse.data || []);
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

  const filterDocs = () => {
    let filtered = docs;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(doc => 
        doc.title.toLowerCase().includes(query) ||
        doc.excerpt?.toLowerCase().includes(query) ||
        doc.content?.toLowerCase().includes(query) ||
        doc.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(doc => doc.category === selectedCategory);
    }

    if (selectedTag) {
      filtered = filtered.filter(doc => doc.tags.includes(selectedTag));
    }

    setFilteredDocs(filtered);
  };

  const getAllTags = () => {
    const tagSet = new Set<string>();
    docs.forEach(doc => {
      doc.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  };

  const featuredDocs = filteredDocs.filter(doc => doc.featured);
  const regularDocs = filteredDocs.filter(doc => !doc.featured);

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

  return (
    <div className="min-h-screen bg-brandae-dark text-white">
      <SEO 
        title="Documentation - Brandae Knowledge Base"
        description="Comprehensive documentation and knowledge base for Brandae platform. Learn how to grow your restaurant business with our detailed guides and tutorials."
        keywords="brandae documentation, restaurant platform guide, knowledge base, how-to guides, restaurant growth"
      />
      
      <Navbar />
      
      <div className="pt-32 px-6 md:px-12 lg:px-24">
        <div className="container mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Knowledge <span className="gradient-text">Base</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Everything you need to know to succeed with Brandae. From getting started to advanced features.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  type="text"
                  placeholder="Search documentation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-3 bg-brandae-gray border-brandae-green/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-brandae-green"
                />
              </div>
            </div>

            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mb-8">
              <Link to="/" className="hover:text-brandae-green transition-colors">
                <Home size={16} />
              </Link>
              <ChevronRight size={14} />
              <span>Documentation</span>
              {selectedCategory !== 'all' && (
                <>
                  <ChevronRight size={14} />
                  <span className="text-brandae-green">{selectedCategory}</span>
                </>
              )}
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex flex-wrap gap-4 items-center justify-center mb-6">
              <div className="flex items-center gap-2">
                <Filter size={16} className="text-gray-400" />
                <span className="text-sm text-gray-400">Filter by category:</span>
              </div>
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('all')}
                className={selectedCategory === 'all' ? 'bg-brandae-green text-brandae-dark' : 'border-brandae-green/50 text-brandae-green hover:bg-brandae-green/10'}
              >
                All Categories
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.name ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category.name)}
                  className={selectedCategory === category.name ? 'bg-brandae-green text-brandae-dark' : 'border-brandae-green/50 text-brandae-green hover:bg-brandae-green/10'}
                >
                  {category.name}
                </Button>
              ))}
            </div>

            {/* Tags Filter */}
            {getAllTags().length > 0 && (
              <div className="flex flex-wrap gap-2 items-center justify-center">
                <span className="text-sm text-gray-400">Tags:</span>
                <Button
                  variant={selectedTag === '' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedTag('')}
                  className="h-6 px-2 text-xs"
                >
                  All
                </Button>
                {getAllTags().slice(0, 10).map((tag) => (
                  <Button
                    key={tag}
                    variant={selectedTag === tag ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setSelectedTag(tag)}
                    className="h-6 px-2 text-xs"
                  >
                    #{tag}
                  </Button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Categories Grid */}
          {selectedCategory === 'all' && !searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold mb-8 text-center">Browse by Category</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card 
                      className="bg-brandae-gray border-brandae-green/20 hover:border-brandae-green/40 transition-all cursor-pointer card-hover-glow"
                      onClick={() => setSelectedCategory(category.name)}
                    >
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-12 h-12 rounded-lg flex items-center justify-center text-brandae-dark font-bold"
                            style={{ backgroundColor: category.color }}
                          >
                            {category.icon || category.name.charAt(0)}
                          </div>
                          <div>
                            <CardTitle className="text-white">{category.name}</CardTitle>
                            <p className="text-gray-400 text-sm">{category.description}</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">
                            {docs.filter(doc => doc.category === category.name).length} articles
                          </span>
                          <ChevronRight size={16} className="text-brandae-green" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Featured Articles */}
          {featuredDocs.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold mb-8 text-center">Featured Articles</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredDocs.map((doc, index) => (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Link to={`/docs/${doc.slug}`}>
                      <Card className="bg-brandae-gray border-brandae-green/20 hover:border-brandae-green/40 transition-all h-full card-hover-glow">
                        {doc.featured_image_url && (
                          <div className="aspect-video overflow-hidden rounded-t-lg">
                            <img 
                              src={doc.featured_image_url} 
                              alt={doc.title}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <CardHeader>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className="bg-brandae-green/20 text-brandae-green">
                              Featured
                            </Badge>
                            <Badge variant="outline" className="border-brandae-green/50 text-brandae-green">
                              {doc.category}
                            </Badge>
                          </div>
                          <CardTitle className="text-white line-clamp-2">{doc.title}</CardTitle>
                          {doc.excerpt && (
                            <p className="text-gray-300 text-sm line-clamp-3">{doc.excerpt}</p>
                          )}
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between text-xs text-gray-400">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <User size={12} />
                                <span>{doc.author}</span>
                              </div>
                              {doc.reading_time && (
                                <div className="flex items-center gap-1">
                                  <Clock size={12} />
                                  <span>{doc.reading_time} min</span>
                                </div>
                              )}
                              <div className="flex items-center gap-1">
                                <Eye size={12} />
                                <span>{doc.views_count}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-3">
                            {doc.tags.slice(0, 3).map((tag) => (
                              <Badge 
                                key={tag} 
                                variant="secondary" 
                                className="text-xs bg-brandae-dark/50 text-gray-300 cursor-pointer hover:bg-brandae-green/20"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setSelectedTag(tag);
                                }}
                              >
                                #{tag}
                              </Badge>
                            ))}
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
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">
                {selectedCategory !== 'all' ? `${selectedCategory} Articles` : 'All Articles'}
              </h2>
              <span className="text-gray-400">
                {filteredDocs.length} article{filteredDocs.length !== 1 ? 's' : ''} found
              </span>
            </div>

            {filteredDocs.length === 0 ? (
              <Card className="bg-brandae-gray border-brandae-green/20">
                <CardContent className="text-center py-12">
                  <BookOpen size={48} className="text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-white">No articles found</h3>
                  <p className="text-gray-400 mb-4">
                    {searchQuery || selectedTag
                      ? "Try adjusting your search or filters"
                      : "No articles available in this category yet"
                    }
                  </p>
                  <Button 
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setSelectedTag('');
                    }}
                    className="bg-brandae-green text-brandae-dark hover:bg-brandae-green/90"
                  >
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularDocs.map((doc, index) => (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Link to={`/docs/${doc.slug}`}>
                      <Card className="bg-brandae-gray border-brandae-green/20 hover:border-brandae-green/40 transition-all h-full card-hover-glow">
                        {doc.featured_image_url && (
                          <div className="aspect-video overflow-hidden rounded-t-lg">
                            <img 
                              src={doc.featured_image_url} 
                              alt={doc.title}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <CardHeader>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="border-brandae-green/50 text-brandae-green">
                              {doc.category}
                            </Badge>
                          </div>
                          <CardTitle className="text-white line-clamp-2">{doc.title}</CardTitle>
                          {doc.excerpt && (
                            <p className="text-gray-300 text-sm line-clamp-3">{doc.excerpt}</p>
                          )}
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <User size={12} />
                                <span>{doc.author}</span>
                              </div>
                              {doc.reading_time && (
                                <div className="flex items-center gap-1">
                                  <Clock size={12} />
                                  <span>{doc.reading_time} min</span>
                                </div>
                              )}
                              <div className="flex items-center gap-1">
                                <Eye size={12} />
                                <span>{doc.views_count}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {doc.tags.slice(0, 3).map((tag) => (
                              <Badge 
                                key={tag} 
                                variant="secondary" 
                                className="text-xs bg-brandae-dark/50 text-gray-300 cursor-pointer hover:bg-brandae-green/20"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setSelectedTag(tag);
                                }}
                              >
                                #{tag}
                              </Badge>
                            ))}
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

export default Docs;
