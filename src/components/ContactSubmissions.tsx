
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Mail, Phone, Building2, MessageSquare, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  business: string;
  message: string;
  created_at: string;
}

export default function ContactSubmissions() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      toast({
        title: "Error",
        description: "Failed to fetch contact submissions",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Card className="bg-brandae-gray border-brandae-green/20">
        <CardContent className="py-12">
          <div className="text-center text-gray-400">Loading submissions...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-brandae-gray border-brandae-green/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Contact Submissions ({submissions.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {submissions.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            No contact submissions yet
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-brandae-green/20">
                  <TableHead className="text-gray-300">Contact Info</TableHead>
                  <TableHead className="text-gray-300">Business</TableHead>
                  <TableHead className="text-gray-300">Message</TableHead>
                  <TableHead className="text-gray-300">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map((submission, index) => (
                  <motion.tr
                    key={submission.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-brandae-green/10 hover:bg-brandae-green/5"
                  >
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-white font-medium">{submission.name}</div>
                        <div className="flex items-center gap-1 text-sm text-gray-400">
                          <Mail className="h-3 w-3" />
                          {submission.email}
                        </div>
                        {submission.phone && (
                          <div className="flex items-center gap-1 text-sm text-gray-400">
                            <Phone className="h-3 w-3" />
                            {submission.phone}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-gray-300">
                        <Building2 className="h-3 w-3" />
                        {submission.business}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        {submission.message ? (
                          <div className="flex items-start gap-1 text-sm text-gray-400">
                            <MessageSquare className="h-3 w-3 mt-0.5 flex-shrink-0" />
                            <span className="truncate">{submission.message}</span>
                          </div>
                        ) : (
                          <span className="text-gray-500 italic">No message</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-gray-400">
                        <Calendar className="h-3 w-3" />
                        {new Date(submission.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
