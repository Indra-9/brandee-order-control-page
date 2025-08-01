import { supabase } from '@/integrations/supabase/client';

export async function createAdminUser(userId: string) {
  try {
    // First, check if user already has a role
    const { data: existingRole } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .single();

    if (existingRole) {
      // Update existing role to admin
      const { error } = await supabase
        .from('user_roles')
        .update({ role: 'admin' })
        .eq('user_id', userId);

      if (error) throw error;
    } else {
      // Insert new admin role
      const { error } = await supabase
        .from('user_roles')
        .insert({ user_id: userId, role: 'admin' });

      if (error) throw error;
    }

    return { success: true };
  } catch (error) {
    console.error('Error creating admin user:', error);
    return { success: false, error };
  }
}

export async function getUserRole(userId: string) {
  try {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No rows found, user has default 'user' role
        return { role: 'user' };
      }
      throw error;
    }

    return { role: data?.role || 'user' };
  } catch (error) {
    console.error('Error fetching user role:', error);
    return { role: 'user' };
  }
}