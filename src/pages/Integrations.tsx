import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Filter, ExternalLink, Clock, Zap, Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import { useToast } from '@/hooks/use-toast';
interface Integration {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo_url: string;
  category: string;
  website_url: string;
  features: string[];
  supported_platforms: string[];
  integration_type: string;
  difficulty_level: string;
  setup_time: string;
  is_featured: boolean;
  is_active: boolean;
  pricing_info: string;
  views_count: number;
}
export default function Integrations() {
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [filteredIntegrations, setFilteredIntegrations] = useState<Integration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const {
    toast
  } = useToast();
  useEffect(() => {
    fetchIntegrations();
  }, []);
  useEffect(() => {
    filterIntegrations();
  }, [integrations, searchTerm, selectedCategory, selectedDifficulty]);
  const fetchIntegrations = async () => {
    try {
      const {
        data,
        error
      } = await supabase.from('integrations').select('*').eq('is_active', true).order('is_featured', {
        ascending: false
      }).order('sort_order', {
        ascending: true
      });
      if (error) throw error;
      setIntegrations(data || []);
    } catch (error) {
      console.error('Error fetching integrations:', error);
      toast({
        title: "Error",
        description: "Failed to load integrations",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  const filterIntegrations = () => {
    let filtered = integrations;
    if (searchTerm) {
      filtered = filtered.filter(integration => integration.name.toLowerCase().includes(searchTerm.toLowerCase()) || integration.description.toLowerCase().includes(searchTerm.toLowerCase()) || integration.category.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(integration => integration.category.toLowerCase() === selectedCategory.toLowerCase());
    }
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(integration => integration.difficulty_level.toLowerCase() === selectedDifficulty.toLowerCase());
    }
    setFilteredIntegrations(filtered);
  };
  const categories = [...new Set(integrations.map(i => i.category))];
  const featuredIntegrations = filteredIntegrations.filter(i => i.is_featured);
  const regularIntegrations = filteredIntegrations.filter(i => !i.is_featured);
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-500/20 text-green-400';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'hard':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'communication':
        return '💬';
      case 'e-commerce':
        return '🛒';
      case 'payments':
        return '💳';
      case 'marketing':
        return '📈';
      case 'analytics':
        return '📊';
      case 'crm':
        return '👥';
      case 'productivity':
        return '⚡';
      case 'database':
        return '🗄️';
      case 'automation':
        return '🔄';
      case 'development':
        return '👨‍💻';
      case 'project management':
        return '📋';
      case 'documentation':
        return '📚';
      case 'design':
        return '🎨';
      case 'storage':
        return '☁️';
      case 'finance':
        return '💰';
      default:
        return '🔧';
    }
  };
  if (isLoading) {
    return <div className="min-h-screen bg-brandae-dark text-white">
        <Navbar />
        <div className="pt-32 px-6 md:px-12 lg:px-24">
          <div className="container mx-auto text-center">
            <div className="text-gray-400">Loading integrations...</div>
          </div>
        </div>
      </div>;
  }
  return <div className="min-h-screen bg-brandae-dark text-white">
      <SEO title="Integrations - Connect Your Favorite Tools" description="Discover 30+ powerful integrations to connect Brandae with your favorite tools and platforms. From Slack to Shopify, enhance your workflow." keywords="integrations, api integrations, workflow automation, third-party apps" />

      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 md:px-12 lg:px-24">
        <div className="container mx-auto text-center">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Connect Your <span className="gradient-text">Favorite Tools</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Seamlessly integrate with 30+ popular platforms and services. 
              From communication tools to payment processors, we've got you covered.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-brandae-green" />
                <span>Easy Setup</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-brandae-green" />
                <span>5-45 Minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <Star size={16} className="text-brandae-green" />
                <span>Production Ready</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="pb-12 px-6 md:px-12 lg:px-24">
        <div className="container mx-auto">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input placeholder="Search integrations..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 bg-brandae-gray border-brandae-green/20 text-white" />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full lg:w-48 bg-brandae-gray border-brandae-green/20 text-white">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => <SelectItem key={category} value={category.toLowerCase()}>
                    {getCategoryIcon(category)} {category}
                  </SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger className="w-full lg:w-48 bg-brandae-gray border-brandae-green/20 text-white">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          <div className="text-sm text-gray-400 mb-8">
            Showing {filteredIntegrations.length} of {integrations.length} integrations
          </div>
        </div>
      </section>

      {/* Featured Integrations */}
      {featuredIntegrations.length > 0 && <section className="pb-16 px-6 md:px-12 lg:px-24">
          <div className="container mx-auto">
            <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }}>
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                <Star className="text-brandae-green" size={24} />
                Featured Integrations
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredIntegrations.map((integration, index) => <motion.div key={integration.id} initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.6,
              delay: index * 0.1
            }}>
                    <Card className="bg-gradient-to-br from-brandae-green/10 to-brandae-purple/10 border-brandae-green/30 hover:border-brandae-green/50 transition-all duration-300 h-full">
                      <CardHeader className="rounded">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <img src={integration.logo_url} alt={integration.name} className="w-12 h-12 rounded-lg object-cover" />
                            <div>
                              <CardTitle className="text-white">{integration.name}</CardTitle>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="border-brandae-green/50 text-brandae-green text-xs">
                                  {getCategoryIcon(integration.category)} {integration.category}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <Badge className="bg-brandae-green/20 text-brandae-green">
                            Featured
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="rounded">
                        <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                          {integration.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge className={getDifficultyColor(integration.difficulty_level)}>
                            {integration.difficulty_level}
                          </Badge>
                          <Badge variant="outline" className="border-gray-500 text-gray-400">
                            <Clock size={12} className="mr-1" />
                            {integration.setup_time}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Link to={`/integrations/${integration.slug}`} className="flex-1">
                            <Button className="w-full bg-brandae-green text-brandae-dark hover:bg-brandae-green/90 rounded">
                              Learn More
                            </Button>
                          </Link>
                          <Button variant="outline" size="sm" asChild className="border-brandae-green/50 text-brandae-green hover:bg-brandae-green/10">
                            <a href={integration.website_url} target="_blank" rel="noopener noreferrer" className="round">
                              <ExternalLink size={16} />
                            </a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>)}
              </div>
            </motion.div>
          </div>
        </section>}

      {/* All Integrations */}
      <section className="pb-20 px-6 md:px-12 lg:px-24">
        <div className="container mx-auto">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }}>
            <h2 className="text-2xl font-bold mb-8">All Integrations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularIntegrations.map((integration, index) => <motion.div key={integration.id} initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.6,
              delay: index * 0.05
            }}>
                  <Card className="bg-brandae-gray border-brandae-green/20 hover:border-brandae-green/40 transition-all duration-300 h-full">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <img src={integration.logo_url} alt={integration.name} className="w-10 h-10 rounded-lg object-cover" />
                        <div className="flex-1">
                          <CardTitle className="text-white text-lg">{integration.name}</CardTitle>
                          <Badge variant="outline" className="border-brandae-green/50 text-brandae-green text-xs mt-1">
                            {getCategoryIcon(integration.category)} {integration.category}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                        {integration.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge className={getDifficultyColor(integration.difficulty_level)}>
                          {integration.difficulty_level}
                        </Badge>
                        <Badge variant="outline" className="border-gray-500 text-gray-400">
                          <Clock size={12} className="mr-1" />
                          {integration.setup_time}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Link to={`/integrations/${integration.slug}`} className="flex-1">
                          <Button variant="outline" className="w-full border-brandae-green/50 text-brandae-green hover:bg-brandae-green/10 rounded">
                            Learn More
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm" asChild className="border-brandae-green/50 text-brandae-green hover:bg-brandae-green/10">
                          <a href={integration.website_url} target="_blank" rel="noopener noreferrer" className="round">
                            <ExternalLink size={16} />
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>)}
            </div>

            {filteredIntegrations.length === 0 && <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2 text-white">No integrations found</h3>
                <p className="text-gray-400 mb-4">Try adjusting your search or filters</p>
                <Button variant="outline" onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setSelectedDifficulty('all');
            }} className="border-brandae-green/50 text-brandae-green hover:bg-brandae-green/10">
                  Clear Filters
                </Button>
              </div>}
          </motion.div>
        </div>
      </section>
    </div>;
}