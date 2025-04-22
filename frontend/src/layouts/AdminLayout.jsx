import React from 'react'
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../components/shared/AdminNavbar';

const AdminLayout = () => {
    return (
        <div>
            <AdminNavbar />
            <Outlet />
            {/* The Outlet component will render the child routes here */}
        </div>
    )
}

export default AdminLayout