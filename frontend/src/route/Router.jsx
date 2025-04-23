// import React, { lazy, Suspense } from 'react';
// import { createBrowserRouter } from 'react-router-dom';

// // Layouts
// import HomeLayout from '../layouts/HomeLayout';
// import AdminLayout from '../layouts/AdminLayout';

// // Shared Components
// import Loading from '../components/reusable/Loading';
// import AuthGuard from '../components/shared/AuthGuard';

// // Lazy-loaded Pages
// const HomePage = lazy(() => import('../pages/HomePage'));
// const AdminPage = lazy(() => import('../pages/AdminPage'));
// const LoginPage = lazy(() => import('../pages/LoginPage'));

// const router = createBrowserRouter([
//   // Public routes
//   {
//     path: '/',
//     element: <HomeLayout />,
//     children: [
//       {
//         index: true, // Same as path: '/'
//         element: (
//           <Suspense fallback={<Loading />}>
//             <HomePage />
//           </Suspense>
//         ),
//       },
//     ],
//   },

//   // Admin login page (no auth required)
//   {
//     path: '/admin/login',
//     element: (
//       <Suspense fallback={<Loading />}>
//         <LoginPage />
//       </Suspense>
//     ),
//   },

//   // Admin routes (protected by AuthGuard)
//   {
//     path: '/admin',
//     element: (
//       <AuthGuard>
//         <AdminLayout />
//       </AuthGuard>
//     ),
//     children: [
//       {
//         index: true, // Same as path: '/admin'
//         element: (
//           <Suspense fallback={<Loading />}>
//             <AdminPage />
//           </Suspense>
//         ),
//       },
     
//     ],
//   },
// ]);

// export default router;
import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import HomeLayout from '../layouts/HomeLayout';
import AdminLayout from '../layouts/AdminLayout';
import Loading from '../components/reusable/Loading';
import AuthGuard from '../components/shared/AuthGuard';

// Lazy load the components to optimize performance
const HomePage = lazy(() => import('../pages/HomePage'));
const AdminPage = lazy(() => import('../pages/AdminPage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeLayout />,
        children: [
            {
                path: '/',
                element: (
                    <Suspense fallback={<Loading />}>
                        <HomePage />
                    </Suspense>
                ),
                index: true,
            },
        ],
    },
    
    // Admin login page route (accessible if not logged in)
    {
        path: '/admin/login',
        element: (
            <Suspense fallback={<Loading />}>
                <LoginPage />
            </Suspense>
        ),
    },

    // Admin page route, only accessible after login
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: (
              <AuthGuard>
                <Suspense fallback={<Loading />}>
                  <AdminPage />
                </Suspense>
              </AuthGuard>
            ),
          },
        ],
      }
]);

export default router;
