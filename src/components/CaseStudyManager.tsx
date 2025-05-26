import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, EyeOff, ExternalLink } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import CaseStudyEditor from '@/components/CaseStudyEditor';
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
const CaseStudyManager = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingStudy, setEditingStudy] = useState<CaseStudy | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const {
    toast
  } = useToast();
  useEffect(() => {
    fetchCaseStudies();
  }, []);
  const fetchCaseStudies = async () => {
    try {
      const {
        data,
        error
      } = await supabase.from('case_studies').select('*').order('created_at', {
        ascending: false
      });
      if (error) throw error;
      setCaseStudies(data || []);
    } catch (error) {
      console.error('Error fetching case studies:', error);
      toast({
        title: "Error",
        description: "Failed to fetch case studies",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleCreateNew = () => {
    setEditingStudy(null);
    setShowEditor(true);
  };
  const handleEdit = (study: CaseStudy) => {
    setEditingStudy(study);
    setShowEditor(true);
  };
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this case study?')) return;
    try {
      const {
        error
      } = await supabase.from('case_studies').delete().eq('id', id);
      if (error) throw error;
      setCaseStudies(caseStudies.filter(study => study.id !== id));
      toast({
        title: "Success",
        description: "Case study deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting case study:', error);
      toast({
        title: "Error",
        description: "Failed to delete case study",
        variant: "destructive"
      });
    }
  };
  const togglePublished = async (study: CaseStudy) => {
    try {
      const {
        error
      } = await supabase.from('case_studies').update({
        published: !study.published
      }).eq('id', study.id);
      if (error) throw error;
      setCaseStudies(caseStudies.map(s => s.id === study.id ? {
        ...s,
        published: !s.published
      } : s));
      toast({
        title: "Success",
        description: `Case study ${!study.published ? 'published' : 'unpublished'} successfully`
      });
    } catch (error) {
      console.error('Error updating case study:', error);
      toast({
        title: "Error",
        description: "Failed to update case study status",
        variant: "destructive"
      });
    }
  };
  const handleSaveStudy = async (studyData: Partial<CaseStudy>) => {
    try {
      if (editingStudy) {
        const {
          error
        } = await supabase.from('case_studies').update(studyData).eq('id', editingStudy.id);
        if (error) throw error;
        toast({
          title: "Success",
          description: "Case study updated successfully"
        });
      } else {
        const {
          error
        } = await supabase.from('case_studies').insert([studyData]);
        if (error) throw error;
        toast({
          title: "Success",
          description: "Case study created successfully"
        });
      }
      setShowEditor(false);
      setEditingStudy(null);
      fetchCaseStudies();
    } catch (error) {
      console.error('Error saving case study:', error);
      toast({
        title: "Error",
        description: "Failed to save case study",
        variant: "destructive"
      });
    }
  };
  if (showEditor) {
    return <CaseStudyEditor study={editingStudy} onSave={handleSaveStudy} onCancel={() => {
      setShowEditor(false);
      setEditingStudy(null);
    }} />;
  }
  return <div>
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.4
    }} className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Case Studies Management</h2>
        <Button onClick={handleCreateNew} className="bg-brandae-green text-brandae-dark hover:bg-brandae-green/90 rounded">
          <Plus size={20} className="mr-2" />
          Create New Case Study
        </Button>
      </motion.div>

      {isLoading ? <div className="text-center py-12">
          <div className="text-gray-400">Loading case studies...</div>
        </div> : <motion.div className="grid gap-6" initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      duration: 0.6,
      delay: 0.2
    }}>
          {caseStudies.length === 0 ? <Card className="bg-brandae-gray border-brandae-green/20">
              <CardContent className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2 text-white">No case studies yet</h3>
                <p className="text-gray-400 mb-4">Create your first case study to showcase success stories</p>
                <Button onClick={handleCreateNew} className="bg-brandae-green text-brandae-dark hover:bg-brandae-green/90">
                  <Plus size={20} className="mr-2" />
                  Create Your First Case Study
                </Button>
              </CardContent>
            </Card> : caseStudies.map((study, index) => <motion.div key={study.id} initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.4,
        delay: index * 0.1
      }}>
                <Card className="bg-brandae-gray border-brandae-green/20 hover:border-brandae-green/40 transition-colors">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-white mb-2">{study.title}</CardTitle>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <Badge variant="outline" className="border-brandae-green/50 text-brandae-green">
                            {study.industry}
                          </Badge>
                          {study.featured && <Badge className="bg-brandae-green/20 text-brandae-green">
                              Featured
                            </Badge>}
                          <Badge variant={study.published ? "default" : "secondary"} className={study.published ? "bg-green-600" : "bg-gray-600"}>
                            {study.published ? "Published" : "Draft"}
                          </Badge>
                        </div>
                        <p className="text-gray-300 text-sm mb-2">{study.excerpt}</p>
                        <p className="text-brandae-green text-sm font-medium mb-2">{study.results_summary}</p>
                        <p className="text-gray-500 text-xs">
                          {study.client_name} • {new Date(study.created_at).toLocaleDateString()} • {study.reading_time} min read • {study.views_count} views
                        </p>
                      </div>
                      {study.featured_image_url && <img src={study.featured_image_url} alt={study.title} className="w-24 h-16 object-cover rounded ml-4" />}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(study)} className="border-brandae-green/50 text-brandae-green hover:bg-brandae-green/10 rounded">
                        <Edit size={16} className="mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => togglePublished(study)} className="border-brandae-green/50 text-brandae-green hover:bg-brandae-green/10 rounded">
                        {study.published ? <EyeOff size={16} className="mr-1" /> : <Eye size={16} className="mr-1" />}
                        {study.published ? 'Unpublish' : 'Publish'}
                      </Button>
                      {study.published && <Button size="sm" variant="outline" asChild className="border-brandae-green/50 text-brandae-green hover:bg-brandae-green/10">
                          <a href={`/case-studies/${study.slug}`} target="_blank" rel="noopener noreferrer" className="round">
                            <ExternalLink size={16} className="mr-1" />
                            View
                          </a>
                        </Button>}
                      <Button size="sm" variant="outline" onClick={() => handleDelete(study.id)} className="border-red-500/50 text-red-400 hover:bg-red-500/10 rounded">
                        <Trash2 size={16} className="mr-1" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>)}
        </motion.div>}
    </div>;
};
export default CaseStudyManager;