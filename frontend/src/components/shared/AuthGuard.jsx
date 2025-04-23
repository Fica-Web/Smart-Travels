import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from './useAuth'; // import the hook

const AuthGuard = () => {
  const isAuthenticated = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default AuthGuard;
