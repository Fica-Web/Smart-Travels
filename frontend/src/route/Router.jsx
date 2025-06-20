import React, { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import HomeLayout from '../layouts/HomeLayout';
import AdminLayout from '../layouts/AdminLayout';
// import { AuthProvider } from '../contexts/AuthContext';
import Loading from '../components/reusable/Loading';
import UserAuth from '../services/auth/UserAuth';
// import GuestGuard from '../services/auth/GuestGuard';
import AdminAuthGuard from '../services/auth/AdminAuthGuard';
import AdminPublicRoute from '../services/auth/AdminPublicRoute';

// Lazy-loaded pages
const HomePage = lazy(() => import('../pages/user/HomePage'));
const LoginPage = lazy(() => import('../pages/admin/LoginPage'));
// const UserLoginPage = lazy(() => import('../pages/user/UserLoginPage'));
// const SignUpPage = lazy(() => import('../pages/user/SignUpPage'));
// const ForgotPasswordPage = lazy(() => import('../pages/user/ForgotPasswordPage'));
// const resetPasswordPage = lazy(() => import('../pages/user/ResetPasswordPage'));
const AboutPage = lazy(() => import('../pages/user/AboutPage'));
const BlogPage = lazy(() => import('../pages/user/BlogPage'));
const BookingPage = lazy(() => import('../pages/user/BookingsPage'));
const FlightsBookingPage = lazy(() => import('../pages/user/FlightsBookingPage'));
const HotelsBookingPage = lazy(() => import('../pages/user/HotelsBookingPage'));
const VisaBookingPage = lazy(() => import('../pages/user/VisaBookingPage'));
const UmrahBookingPage = lazy(() => import('../pages/user/UmrahBookingpage'));
const TripsBookingPage = lazy(() => import('../pages/user/TripsBookingPage'));
const DestinationDetailsPage = lazy(() => import('../pages/user/DestinationDetailsPage'));
const InsuranceBookingPage = lazy(() => import('../pages/user/InsuranceBookingPage'));
const ContactPage = lazy(() => import('../pages/user/ContactPage'));
const BlogDetails = lazy(() => import('../pages/user/BlogDetailsPage'));
const UserProfilePage = lazy(() => import('../pages/user/UserProfilePage'));
const AdminDashboardPage = lazy(() => import('../pages/admin/AdminDashboardPage'));
const AdminUsersPage = lazy(() => import('../pages/admin/AdminUsersPage'));
const AdminInquiryPage = lazy(() => import('../pages/admin/AdminInquiryPage'));
const AdminBlogPage = lazy(() => import('../pages/admin/AdminBlogPage'));
const AdminSettingsPage = lazy(() => import('../pages/admin/AdminSettingsPage'));
const AdminBlogFormPage = lazy(() => import('../pages/admin/AdminBlogFormPage'));
const AdminBlogEditPage = lazy(() => import('../pages/admin/AdminBlogEditPage'));
const AdminDestinationPage = lazy(() => import('../pages/admin/AdminDestinationPage'));
const AdminDestinationFormPage = lazy(() => import('../pages/admin/AdminDestinationFormPage'));

const NotFoundPage = lazy(() => import('../pages/shared/NotFountPage'));

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
      <HomeLayout />
    ),
    children: [
      {
        index: true,
        element: withSuspense(HomePage),
      },
      {
        path: 'about',
        element: withSuspense(AboutPage)
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
        path: 'bookings',
        element: withSuspense(BookingPage), // This can be a layout or overview
        children: [
          {
            index: true, // This makes FlightsBookingPage the default
            element: withSuspense(FlightsBookingPage),
          },
          {
            path: 'flights',
            element: withSuspense(FlightsBookingPage),
          },
          {
            path: 'hotels',
            element: withSuspense(HotelsBookingPage)
          },
          {
            path: 'visa',
            element: withSuspense(VisaBookingPage)
          },
          {
            path: 'umrah',
            element: withSuspense(UmrahBookingPage)
          },
          {
            path: 'trips',
            children: [
               {
            index: true,
            element: withSuspense(TripsBookingPage),
          },
          {
            path: ':slug',
            element: withSuspense(DestinationDetailsPage),
          },
            ]
          },
          {
            path: 'insurance',
            element: withSuspense(InsuranceBookingPage)
          },
        ]
      },
      {
        path: 'contact',
        element: withSuspense(ContactPage),
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
  // {
  //   path: '/login',
  //   element: (
  //     <AuthProvider>
  //       <GuestGuard>
  //         {withSuspense(UserLoginPage)}
  //       </GuestGuard>
  //     </AuthProvider>
  //   ),
  // },
  // {
  //   path: '/signup',
  //   element: (
  //     <AuthProvider>
  //       <GuestGuard>
  //         {withSuspense(SignUpPage)}
  //       </GuestGuard>
  //     </AuthProvider>
  //   ),
  // },
  // {
  //   path: '/forgot-password',
  //   element: withSuspense(ForgotPasswordPage),
  // },
  // {
  //   path: '/reset-password',
  //   element: withSuspense(resetPasswordPage),
  // },
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
            path: 'inquiries',
            element: withSuspense(AdminInquiryPage),
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
            path: 'settings',
            element: withSuspense(AdminSettingsPage),
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: withSuspense(NotFoundPage),
  },
]);

export default router;