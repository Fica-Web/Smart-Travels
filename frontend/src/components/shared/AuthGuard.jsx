import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthGuard = ({ children }) => {
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;

  console.log("AuthGuard: token =", token);

  return isLoggedIn ? children : <Navigate to="/admin/login" replace />;
};

export default AuthGuard;
