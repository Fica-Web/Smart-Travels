import React, { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import HomeLayout from '../layouts/HomeLayout';
import AdminLayout from '../layouts/AdminLayout';
import Loading from '../components/reusable/Loading';
import UserAuth from '../services/auth/UserAuth';
import GuestGuard from '../services/auth/GuestGuard';
import AdminAuthGuard from '../services/auth/AdminAuthGuard';
import AdminPublicRoute from '../services/auth/AdminPublicRoute';

// Lazy-loaded pages
const HomePage = lazy(() => import('../pages/user/HomePage'));
const AdminPage = lazy(() => import('../pages/admin/AdminPage'));
const LoginPage = lazy(() => import('../pages/admin/LoginPage'));
const UserLoginPage = lazy(() => import('../pages/user/UserLoginPage'));
const SignUpPage = lazy(() => import('../pages/user/SignUpPage'));
const ForgetPasswordPage = lazy(() => import('../pages/user/ForgetPasswordPage'));
const ResetPassword = lazy(() => import('../components/shared/ResetPassword'));
const UserProfilePage = lazy(() => import('../pages/user/UserProfilePage'));
// const NotFoundPage = lazy(() => import('../pages/shared/NotFoundPage'));

// Suspense wrapper
const withSuspense = (Component) => (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: withSuspense(HomePage),
      },
      {
        path: 'profile',
        element: (
          <UserAuth>
            {withSuspense(UserProfilePage)}
          </UserAuth>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: (
      <GuestGuard>
        {withSuspense(UserLoginPage)}
      </GuestGuard>
    ),
  },
  {
    path: '/signup',
    element: (
      <GuestGuard>
        {withSuspense(SignUpPage)}
      </GuestGuard>
    ),
  },
  {
    path: '/forgot-password',
    element: withSuspense(ForgetPasswordPage),
  },
  {
    path: '/reset-password',
    element: withSuspense(ResetPassword),
  },
  {
    path: '/admin/login',
    element: (
      <AdminPublicRoute>
        {withSuspense(LoginPage)}
      </AdminPublicRoute>
    ),
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        element: <AdminAuthGuard />,
        children: [
          {
            index: true,
            element: withSuspense(AdminPage),
          },
        ],
      },
    ],
  },
  // {
  //   path: '*',
  //   element: withSuspense(NotFoundPage),
  // },
]);

export default router;