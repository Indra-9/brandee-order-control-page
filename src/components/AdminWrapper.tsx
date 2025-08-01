import React, { useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { useUserRole } from '@/hooks/useUserRole';
import AuthPage from '@/pages/Auth';

interface AdminWrapperProps {
  children: React.ReactNode;
  session: Session | null;
}

export default function AdminWrapper({ children, session }: AdminWrapperProps) {
  const { userRole, loading, isAdmin } = useUserRole(session);

  if (loading) {
    return (
      <div className="min-h-screen bg-brandae-dark flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return <AuthPage />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-brandae-dark flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-300">You do not have permission to access this area.</p>
          <p className="text-gray-400 mt-2">Administrator privileges required.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}