import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const AuthGuard = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  if (isAuthenticated === null) {
    // You can return a loader here if needed
    return <div className="text-center p-10">Checking authentication...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

export default AuthGuard;
