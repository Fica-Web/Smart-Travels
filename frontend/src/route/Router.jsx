import React, { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import HomeLayout from '../layouts/HomeLayout';
import AdminLayout from '../layouts/AdminLayout';
import Loading from '../components/reusable/Loading';
import AuthGuard from '../auth/AuthGuard';  // Protect routes
import SignUpPage from '../pages/SignUpPage';

// Lazy-loaded pages
const HomePage = lazy(() => import('../pages/HomePage'));
const AdminPage = lazy(() => import('../pages/AdminPage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const UserLoginPage = lazy(() => import('../pages/UserLoginPage'));
const SignUp = lazy(() => import('../pages/SignUpPage'));



const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <HomePage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '/login',  // ✅ General login route
    element: (
      <Suspense fallback={<Loading />}>
        <UserLoginPage />
      </Suspense>
    ),
  },
  {
    path: '/signup',  // ✅ General login route
    element: (
      <Suspense fallback={<Loading />}>
        <SignUpPage />
      </Suspense>
    ),
  },
  {
    path: '/admin/login',
    element: (
      <Suspense fallback={<Loading />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: '/admin',
    element: (
      <AuthGuard>
        <AdminLayout />
      </AuthGuard>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <AdminPage />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
