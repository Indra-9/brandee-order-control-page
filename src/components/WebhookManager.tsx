
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Plus, Trash2, Link, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';

interface WebhookEndpoint {
  id: string;
  name: string;
  url: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface WebhookFormData {
  name: string;
  url: string;
}

export default function WebhookManager() {
  const [webhooks, setWebhooks] = useState<WebhookEndpoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<WebhookFormData>();

  useEffect(() => {
    fetchWebhooks();
  }, []);

  const fetchWebhooks = async () => {
    try {
      const { data, error } = await supabase
        .from('webhook_endpoints')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setWebhooks(data || []);
    } catch (error) {
      console.error('Error fetching webhooks:', error);
      toast({
        title: "Error",
        description: "Failed to fetch webhook endpoints",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: WebhookFormData) => {
    try {
      const { error } = await supabase
        .from('webhook_endpoints')
        .insert([{
          name: data.name,
          url: data.url,
          is_active: true
        }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Webhook endpoint added successfully"
      });

      reset();
      setIsAdding(false);
      fetchWebhooks();
    } catch (error) {
      console.error('Error adding webhook:', error);
      toast({
        title: "Error",
        description: "Failed to add webhook endpoint",
        variant: "destructive"
      });
    }
  };

  const toggleWebhook = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('webhook_endpoints')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      setWebhooks(webhooks.map(webhook => 
        webhook.id === id ? { ...webhook, is_active: !currentStatus } : webhook
      ));

      toast({
        title: "Success",
        description: `Webhook ${!currentStatus ? 'enabled' : 'disabled'} successfully`
      });
    } catch (error) {
      console.error('Error toggling webhook:', error);
      toast({
        title: "Error",
        description: "Failed to update webhook status",
        variant: "destructive"
      });
    }
  };

  const deleteWebhook = async (id: string) => {
    if (!confirm('Are you sure you want to delete this webhook?')) return;

    try {
      const { error } = await supabase
        .from('webhook_endpoints')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setWebhooks(webhooks.filter(webhook => webhook.id !== id));
      toast({
        title: "Success",
        description: "Webhook endpoint deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting webhook:', error);
      toast({
        title: "Error",
        description: "Failed to delete webhook endpoint",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <Card className="bg-brandae-gray border-brandae-green/20">
        <CardContent className="py-12">
          <div className="text-center text-gray-400">Loading webhooks...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-brandae-gray border-brandae-green/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Webhook Endpoints ({webhooks.length})
          </CardTitle>
          <Button
            onClick={() => setIsAdding(!isAdding)}
            className="bg-brandae-green text-brandae-dark hover:bg-brandae-green/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Webhook
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border border-brandae-green/20 rounded-lg p-4 bg-brandae-dark/50"
          >
            <h4 className="text-white font-medium mb-4">Add New Webhook Endpoint</h4>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Input
                  placeholder="Webhook Name (e.g., Slack Notifications)"
                  {...register('name', { required: 'Name is required' })}
                  className="bg-brandae-dark border-white/10 text-white"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <Input
                  placeholder="https://hooks.slack.com/services/..."
                  {...register('url', { 
                    required: 'URL is required',
                    pattern: {
                      value: /^https?:\/\/.+/,
                      message: 'Please enter a valid URL'
                    }
                  })}
                  className="bg-brandae-dark border-white/10 text-white"
                />
                {errors.url && <p className="text-red-500 text-sm mt-1">{errors.url.message}</p>}
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="bg-brandae-green text-brandae-dark hover:bg-brandae-green/90">
                  Add Webhook
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setIsAdding(false);
                    reset();
                  }}
                  className="border-white/10 text-white hover:bg-white/5"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        )}

        {webhooks.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Settings className="h-12 w-12 mx-auto mb-4 text-gray-600" />
            <p>No webhook endpoints configured</p>
            <p className="text-sm mt-2">Add a webhook to receive notifications when new contacts submit the form</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-brandae-green/20">
                  <TableHead className="text-gray-300">Name</TableHead>
                  <TableHead className="text-gray-300">URL</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Created</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {webhooks.map((webhook, index) => (
                  <motion.tr
                    key={webhook.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-brandae-green/10 hover:bg-brandae-green/5"
                  >
                    <TableCell className="text-white font-medium">{webhook.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-gray-300 max-w-xs">
                        <Link className="h-3 w-3 flex-shrink-0" />
                        <span className="truncate text-sm">{webhook.url}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={webhook.is_active}
                          onCheckedChange={() => toggleWebhook(webhook.id, webhook.is_active)}
                        />
                        <Badge variant={webhook.is_active ? "default" : "secondary"}>
                          {webhook.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-400 text-sm">
                      {new Date(webhook.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteWebhook(webhook.id)}
                        className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
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
