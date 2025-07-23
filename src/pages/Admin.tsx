import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart3, FileText, Users, MessageSquare, Settings, Webhook, Layers, ShoppingBag, Map, BookOpen, LogOut } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import ContactSubmissions from '@/components/ContactSubmissions';
import PartnerSubmissions from '@/components/PartnerSubmissions';
import CaseStudyManager from '@/components/CaseStudyManager';
import WebhookManager from '@/components/WebhookManager';
import IntegrationManager from '@/components/IntegrationManager';
import SitemapManager from '@/components/SitemapManager';
import DocumentationManager from '@/components/DocumentationManager';
import AdminStatsCard from '@/components/AdminStatsCard';
import { useAdminStats } from '@/hooks/useAdminStats';

const AdminDashboard = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { toast } = useToast();
  const { stats, isLoading } = useAdminStats();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      window.location.href = '/';
    } catch (error) {
      console.error('Error logging out:', error);
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive"
      });
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, path: '/admin' },
    { id: 'contacts', label: 'Contact Submissions', icon: MessageSquare, path: '/admin/contacts' },
    { id: 'partners', label: 'Partner Submissions', icon: Users, path: '/admin/partners' },
    { id: 'case-studies', label: 'Case Studies', icon: FileText, path: '/admin/case-studies' },
    { id: 'documentation', label: 'Documentation', icon: BookOpen, path: '/admin/documentation' },
    { id: 'integrations', label: 'Integrations', icon: Layers, path: '/admin/integrations' },
    { id: 'webhooks', label: 'Webhooks', icon: Webhook, path: '/admin/webhooks' },
    { id: 'sitemap', label: 'Sitemap', icon: Map, path: '/admin/sitemap' },
  ];

  const DashboardOverview = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
        <p className="text-gray-400">Manage your content and monitor activity</p>
      </motion.div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="bg-brandae-gray border-brandae-green/20 animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-600 rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-600 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-600 rounded w-2/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AdminStatsCard
            title="Contact Submissions"
            count={stats.contactSubmissions.current}
            previousCount={stats.contactSubmissions.previous}
            icon={<MessageSquare className="h-4 w-4" />}
            path="/admin/contacts"
            index={0}
          />
          <AdminStatsCard
            title="Case Studies"
            count={stats.caseStudies.current}
            previousCount={stats.caseStudies.previous}
            icon={<FileText className="h-4 w-4" />}
            path="/admin/case-studies"
            index={1}
          />
          <AdminStatsCard
            title="Documentation"
            count={stats.documentation.current}
            previousCount={stats.documentation.previous}
            icon={<BookOpen className="h-4 w-4" />}
            path="/admin/documentation"
            index={2}
          />
          <AdminStatsCard
            title="Integrations"
            count={stats.integrations.current}
            previousCount={stats.integrations.previous}
            icon={<Layers className="h-4 w-4" />}
            path="/admin/integrations"
            index={3}
          />
          <AdminStatsCard
            title="Webhooks"
            count={stats.webhooks.current}
            previousCount={stats.webhooks.previous}
            icon={<Webhook className="h-4 w-4" />}
            path="/admin/webhooks"
            index={4}
          />
          <AdminStatsCard
            title="Sitemap"
            count={stats.sitemapPages.current}
            previousCount={stats.sitemapPages.previous}
            icon={<Map className="h-4 w-4" />}
            path="/admin/sitemap"
            index={5}
          />
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card className="bg-brandae-gray border-brandae-green/20">
          <CardHeader>
            <CardTitle className="text-brandae-green">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Link to="/admin/case-studies">
                <Button className="w-full bg-brandae-green text-brandae-dark hover:bg-brandae-green/90">
                  <FileText size={18} className="mr-2" />
                  Create Case Study
                </Button>
              </Link>
              <Link to="/admin/documentation">
                <Button variant="outline" className="w-full border-brandae-green/50 text-brandae-green hover:bg-brandae-green/10">
                  <BookOpen size={18} className="mr-2" />
                  Create Documentation
                </Button>
              </Link>
              <Link to="/admin/integrations">
                <Button variant="outline" className="w-full border-brandae-green/50 text-brandae-green hover:bg-brandae-green/10">
                  <Layers size={18} className="mr-2" />
                  Add Integration
                </Button>
              </Link>
              <Link to="/admin/sitemap">
                <Button variant="outline" className="w-full border-brandae-green/50 text-brandae-green hover:bg-brandae-green/10">
                  <Map size={18} className="mr-2" />
                  Update Sitemap
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-brandae-dark text-white">
      <div className="px-6 md:px-12 lg:px-24 py-8">
        <div className="container mx-auto">
          <div className="flex gap-8">
            {/* Sidebar */}
            <div className="w-64 flex-shrink-0">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="sticky top-8"
              >
                <Card className="bg-brandae-gray border-brandae-green/20 mb-4">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-brandae-green">Admin Panel</CardTitle>
                    <Button
                      onClick={handleLogout}
                      size="sm"
                      variant="outline"
                      className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                    >
                      <LogOut size={16} className="mr-1" />
                      Logout
                    </Button>
                  </CardHeader>
                </Card>

                <Card className="bg-brandae-gray border-brandae-green/20">
                  <CardHeader>
                    <CardTitle className="text-brandae-green">Navigation</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <nav className="space-y-1">
                      {menuItems.map((item) => (
                        <Link
                          key={item.id}
                          to={item.path}
                          className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-brandae-green/10 ${
                            currentPath === item.path 
                              ? 'bg-brandae-green/20 text-brandae-green border-r-2 border-brandae-green' 
                              : 'text-gray-300 hover:text-white'
                          }`}
                        >
                          <item.icon size={18} />
                          {item.label}
                        </Link>
                      ))}
                    </nav>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <Routes>
                <Route index element={<DashboardOverview />} />
                <Route path="contacts" element={<ContactSubmissions />} />
                <Route path="partners" element={<PartnerSubmissions />} />
                <Route path="case-studies" element={<CaseStudyManager />} />
                <Route path="documentation" element={<DocumentationManager />} />
                <Route path="integrations" element={<IntegrationManager />} />
                <Route path="webhooks" element={<WebhookManager />} />
                <Route path="sitemap" element={<SitemapManager />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
