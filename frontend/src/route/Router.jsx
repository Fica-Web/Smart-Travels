import React, { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import HomeLayout from '../layouts/HomeLayout';
import AdminLayout from '../layouts/AdminLayout';
import Loading from '../components/reusable/Loading';
import AuthGuard from '../auth/AuthGuard';  // Protect routes
import SignUpPage from '../pages/user/SignUpPage';
import ResetPassword from '../components/shared/ResetPassword';

// Lazy-loaded pages
const HomePage = lazy(() => import('../pages/user/HomePage'));
const AdminPage = lazy(() => import('../pages/admin/AdminPage'));
const LoginPage = lazy(() => import('../pages/admin/LoginPage'));
const UserLoginPage = lazy(() => import('../pages/user/UserLoginPage'));
const SignUp = lazy(() => import('../pages/user/SignUpPage'));
const ForgetPasswordPage = lazy(() => import('../pages/user/ForgetPasswordPage'))



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
    path: '/signup',
    element: (
      <Suspense fallback={<Loading />}>
        <SignUpPage />
      </Suspense>
    ),
  },
  {
    path: '/forgot-password',
    element: (
      <Suspense fallback={<Loading />}>
        <ForgetPasswordPage />
      </Suspense>
    ),
  },
  {
    path: '/reset-password',
    element: (
      <Suspense fallback={<Loading />}>
        <ResetPassword />
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
