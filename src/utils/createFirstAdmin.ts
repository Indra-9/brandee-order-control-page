import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export async function createFirstAdmin() {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) {
      toast.error('Please sign in first');
      return;
    }

    // Check if any admin exists
    const { data: existingAdmins } = await supabase
      .from('user_roles')
      .select('id')
      .eq('role', 'admin')
      .limit(1);

    // If no admin exists, make current user an admin
    if (!existingAdmins || existingAdmins.length === 0) {
      const { error } = await supabase
        .from('user_roles')
        .upsert({
          user_id: session.user.id,
          role: 'admin'
        }, {
          onConflict: 'user_id'
        });

      if (error) {
        console.error('Error creating admin:', error);
        toast.error('Failed to create admin user');
        return false;
      }

      toast.success('Admin access granted! Please refresh the page.');
      return true;
    }

    toast.info('Admin user already exists');
    return false;
  } catch (error) {
    console.error('Error creating first admin:', error);
    toast.error('Failed to create admin user');
    return false;
  }
}