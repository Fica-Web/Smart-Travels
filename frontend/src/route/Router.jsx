import React, { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import HomeLayout from '../layouts/HomeLayout';
import AdminLayout from '../layouts/AdminLayout';
import Loading from '../components/reusable/Loading';

// Lazy load the components to optimize performance
const HomePage = lazy(() => import('../pages/HomePage'));
const AdminPage = lazy(() => import('../pages/AdminPage'));

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
        ]
    },

    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={<Loading />}>
                        <AdminPage />
                    </Suspense>
                ),
            },
        ]
    }
   

])

export default router;
// This code sets up a React Router with lazy loading for the HomePage component.