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
const UserServicePage = lazy(() => import('../pages/user/ServicePage'));
const ResetPassword = lazy(() => import('../components/shared/ResetPassword'));
const UserProfilePage = lazy(() => import('../pages/user/UserProfilePage'));
const AdminDashboardPage = lazy(() => import('../pages/admin/AdminDashboardPage'));
const AdminUsersPage = lazy(() => import('../pages/admin/AdminUsersPage'));
const AdminServices = lazy(() => import('../pages/admin/AdminServices'));
const AdminBlogPage = lazy(() => import('../pages/admin/AdminBlogPage'));
const AdminCarouselPage = lazy(() => import('../pages/admin/AdminCarouselPage'));
const AdminSettingsPage = lazy(() => import('../pages/admin/AdminSettingsPage'));
const AdminBlogFormPage = lazy(() => import('../pages/admin/AdminBlogFormPage'))
const AdminBlogEditPage = lazy(() => import('../pages/admin/AdminBlogEditPage'))
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
        path: 'services',
        element: withSuspense(UserServicePage),
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
        children: [
          {
            index: true, // for "/admin"
            element: withSuspense(AdminPage),
          },
          {
            path: 'dashboard', // for "/admin/dashboard"
            element: withSuspense(AdminDashboardPage),
          },
          {
            path: 'users',
            element: withSuspense(AdminUsersPage),
          },
          {
            path: 'services',
            element: withSuspense(AdminServices),
          },
          {
            path: 'blog',
            children: [
              {
                index: true,
                element: withSuspense(AdminBlogPage), // shows blog dashboard
              },
              {
                path: 'new',
                element: withSuspense(AdminBlogFormPage), // create blog
              },
              {
                path: 'edit/:id',
                element: withSuspense(AdminBlogEditPage), // edit blog
              },
            ],
          },
          {
            path: 'carousel',
            element: withSuspense(AdminCarouselPage),
          },
          {
            path: 'settings',
            element: withSuspense(AdminSettingsPage),
          },
        ],
      },
    ],
  }
  
  // {
  //   path: '*',
  //   element: withSuspense(NotFoundPage),
  // },
]);

export default router;