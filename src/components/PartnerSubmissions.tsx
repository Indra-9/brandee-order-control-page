import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Mail, Phone, Globe, MapPin, FileText, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';

interface PartnerSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  company_website: string | null;
  address: string;
  country: string;
  state: string;
  pin_code: string;
  proposal: string | null;
  created_at: string;
  updated_at: string;
}

const PartnerSubmissions = () => {
  const [submissions, setSubmissions] = useState<PartnerSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('partner_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error) {
      console.error('Error fetching partner submissions:', error);
      toast({
        title: "Error",
        description: "Failed to load partner submissions.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-foreground">Partner Submissions</h2>
          <Badge variant="secondary" className="text-lg px-4 py-2">
            <Skeleton className="w-8 h-4" />
          </Badge>
        </div>
        <div className="grid gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-foreground">Partner Submissions</h2>
        <Badge variant="secondary" className="text-lg px-4 py-2">
          {submissions.length} {submissions.length === 1 ? 'Submission' : 'Submissions'}
        </Badge>
      </div>

      {submissions.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No Partner Submissions</h3>
            <p className="text-muted-foreground">
              No partnership applications have been submitted yet.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {submissions.map((submission) => (
            <Card key={submission.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl text-foreground flex items-center gap-2">
                      {submission.name}
                      {submission.company_website && (
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                          className="p-1 h-auto"
                        >
                          <a
                            href={submission.company_website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary/80"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {format(new Date(submission.created_at), 'PPP')}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <a 
                        href={`mailto:${submission.email}`}
                        className="text-primary hover:underline"
                      >
                        {submission.email}
                      </a>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <a 
                        href={`tel:${submission.phone}`}
                        className="text-foreground hover:text-primary"
                      >
                        {submission.phone}
                      </a>
                    </div>

                    {submission.company_website && (
                      <div className="flex items-center gap-2 text-sm">
                        <Globe className="w-4 h-4 text-muted-foreground" />
                        <a 
                          href={submission.company_website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {submission.company_website}
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <div>
                        <div className="text-foreground">{submission.address}</div>
                        <div className="text-muted-foreground">
                          {submission.state}, {submission.country} {submission.pin_code}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {submission.proposal && (
                  <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Partnership Proposal
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                      {submission.proposal}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PartnerSubmissions;