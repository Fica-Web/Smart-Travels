import React, { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import HomeLayout from '../layouts/HomeLayout';
import AdminLayout from '../layouts/AdminLayout';
import { AuthProvider } from '../contexts/AuthContext';
import Loading from '../components/reusable/Loading';
import UserAuth from '../services/auth/UserAuth';
import GuestGuard from '../services/auth/GuestGuard';
import AdminAuthGuard from '../services/auth/AdminAuthGuard';
import AdminPublicRoute from '../services/auth/AdminPublicRoute';

// Lazy-loaded pages
const HomePage = lazy(() => import('../pages/user/HomePage'));
const LoginPage = lazy(() => import('../pages/admin/LoginPage'));
const UserLoginPage = lazy(() => import('../pages/user/UserLoginPage'));
const SignUpPage = lazy(() => import('../pages/user/SignUpPage'));
const ForgotPasswordPage = lazy(() => import('../pages/user/ForgotPasswordPage'));
const UserServicePage = lazy(() => import('../pages/user/ServicePage'));
const resetPasswordPage = lazy(() => import('../pages/user/ResetPasswordPage'));
const BlogPage = lazy(() => import('../pages/user/BlogPage'));
const BlogDetails = lazy(() => import('../pages/user/BlogDetailsPage'));
const UserProfilePage = lazy(() => import('../pages/user/UserProfilePage'));
const AdminDashboardPage = lazy(() => import('../pages/admin/AdminDashboardPage'));
const AdminUsersPage = lazy(() => import('../pages/admin/AdminUsersPage'));
const AdminServices = lazy(() => import('../pages/admin/AdminServices'));
const AdminBlogPage = lazy(() => import('../pages/admin/AdminBlogPage'));
const AdminCarouselPage = lazy(() => import('../pages/admin/AdminCarouselPage'));
const AdminSettingsPage = lazy(() => import('../pages/admin/AdminSettingsPage'));
const AdminBlogFormPage = lazy(() => import('../pages/admin/AdminBlogFormPage'));
const AdminBlogEditPage = lazy(() => import('../pages/admin/AdminBlogEditPage'));
const AdminDestinationPage = lazy(() => import('../pages/admin/AdminDestinationPage'));
const AdminDestinationFormPage = lazy(() => import('../pages/admin/AdminDestinationFormPage'));
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
    element: (
      <AuthProvider>
        <HomeLayout />
      </AuthProvider>
    ),
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
        path: 'blog',
        children: [
          {
            index: true,
            element: withSuspense(BlogPage),
          },
          {
            path: ':id',
            element: withSuspense(BlogDetails),
          },
        ],
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
      <AuthProvider>
        <GuestGuard>
          {withSuspense(UserLoginPage)}
        </GuestGuard>
      </AuthProvider>
    ),
  },
  {
    path: '/signup',
    element: (
      <AuthProvider>
        <GuestGuard>
          {withSuspense(SignUpPage)}
        </GuestGuard>
      </AuthProvider>
    ),
  },
  {
    path: '/forgot-password',
    element: withSuspense(ForgotPasswordPage),
  },
  {
    path: '/reset-password',
    element: withSuspense(resetPasswordPage),
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
            index: true, // for "/admin"
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
            path: 'destination',
            children: [
              {
                index: true,
                element: withSuspense(AdminDestinationPage), // Page to list all destinations
              },
              {
                path: 'new',
                element: withSuspense(AdminDestinationFormPage), // Create new destination
              },
              {
                path: 'edit/:id',
                element: withSuspense(AdminDestinationFormPage), // Edit existing destination
              },
            ],
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