import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../components/shared/AdminNavbar';
import AdminSidebar from '../components/shared/AdminSidebar';

const AdminLayout = () => {
    return (
        <div className="flex flex-col h-screen">
            {/* Top Navbar */}
            <AdminNavbar />

            {/* Main layout: sidebar + content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar with fixed width */}
                <div className="w-64 bg-gray-800 text-white z-40">
                    <AdminSidebar />
                </div>

                {/* Main content area */}
                <main className="flex-1 bg-gray-100 p-4 overflow-auto relative z-30">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
