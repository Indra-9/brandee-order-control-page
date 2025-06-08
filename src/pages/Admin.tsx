
import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart3, FileText, Users, MessageSquare, Settings, Webhook, Layers, ShoppingBag, Map, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import ContactSubmissions from '@/components/ContactSubmissions';
import CaseStudyManager from '@/components/CaseStudyManager';
import WebhookManager from '@/components/WebhookManager';
import IntegrationManager from '@/components/IntegrationManager';
import SitemapManager from '@/components/SitemapManager';
import DocumentationManager from '@/components/DocumentationManager';

const AdminDashboard = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, path: '/admin' },
    { id: 'contacts', label: 'Contact Submissions', icon: MessageSquare, path: '/admin/contacts' },
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.slice(1).map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="bg-brandae-gray border-brandae-green/20 hover:border-brandae-green/40 transition-colors cursor-pointer">
              <Link to={item.path}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">
                    {item.label}
                  </CardTitle>
                  <item.icon className="h-4 w-4 text-brandae-green" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-brandae-green">-</div>
                  <p className="text-xs text-gray-400">
                    Manage {item.label.toLowerCase()}
                  </p>
                </CardContent>
              </Link>
            </Card>
          </motion.div>
        ))}
      </div>

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
      <Navbar />
      
      <div className="pt-24 px-6 md:px-12 lg:px-24">
        <div className="container mx-auto">
          <div className="flex gap-8">
            {/* Sidebar */}
            <div className="w-64 flex-shrink-0">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="sticky top-32"
              >
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
