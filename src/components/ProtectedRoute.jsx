import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) {
    // Jika tidak ada token, alihkan ke halaman login
    return <Navigate to="/" />;
  }

  if (requiredRole && role !== requiredRole) {
    // Jika role tidak sesuai, alihkan ke halaman yang sesuai
    return <Navigate to={role === 'admin' ? '/admin' : '/employee'} />;
  }

  return children; // Jika login valid dan role sesuai, render children
};

export default ProtectedRoute;
