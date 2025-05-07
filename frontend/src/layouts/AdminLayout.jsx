import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../components/shared/AdminNavbar';
import AdminSidebar from '../components/shared/AdminSidebar';

const AdminLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <AdminNavbar />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar handles its own width */}
        <AdminSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

        {/* Main content shifts based on sidebar state */}
        <main
          className={`flex-1 p-4 overflow-auto transition-all duration-300 ${
            isCollapsed ? 'ml-16' : 'ml-64'
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;