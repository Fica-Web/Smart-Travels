// import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthGuard = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem('token'); // or your auth logic

  // If not logged in, redirect to /admin/login
  if (!isLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }

  // If logged in, render the children (admin page)
  return children;
};

export default AuthGuard;  