
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Admin from '../Admin';

const AdminDashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<Admin />} />
      <Route path="/dashboard" element={<Admin />} />
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
};

export default AdminDashboard;
