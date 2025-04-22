import React from 'react'
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../components/shared/AdminNavbar';
import AdminSidebar from '../components/shared/AdminSidebar';

const AdminLayout = () => {
    return (
        <div>
            <AdminNavbar />
            <AdminSidebar />
            <Outlet />
            {/* The Outlet component will render the child routes here */}
        </div>
    )
}

export default AdminLayout