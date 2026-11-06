import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';

export function ProtectedRoute({ children }) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!user || !user.permissions) {
    return <Navigate to="/sem-acesso" />;
  }

  const permissions = user.permissions || [];
  
  const isAdmin = permissions.some(p => 
    p.name === 'ROLE_ADMIN' || p.authority === 'ROLE_ADMIN'
  );

  if (!isAdmin) {
    return <Navigate to="/sem-acesso" />;
  }

  return children;
}