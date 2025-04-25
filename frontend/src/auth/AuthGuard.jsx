import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const AuthGuard = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  if (isAuthenticated === null) {
    return <div className="text-center p-10">Checking authentication...</div>;
  }

  const loginPath = import.meta.env.VITE_ADMIN_LOGIN_URL || '/admin/login';
  console.log("Redirecting to login:", loginPath);

  return isAuthenticated ? children : <Navigate to={loginPath} replace />;
};

export default AuthGuard;

