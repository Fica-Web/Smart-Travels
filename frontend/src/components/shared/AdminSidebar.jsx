import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  Users,
  Settings,
  Briefcase,
  FileText,
  Image,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <aside
        className={`fixed top-[75px] left-0 h-[calc(100vh-70px)] flex flex-col bg-white border-r border-gray-300 transition-all duration-300 z-50
        ${isCollapsed ? 'w-20' : 'w-64'} md:w-64 lg:w-64`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto">
          <div className="p-6">
            {!isCollapsed && (
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Panel</h2>
            )}
            <nav className="flex flex-col space-y-3 text-gray-700">
              <SidebarLink icon={<Home size={20} />} label="Dashboard" to="/admin/dashboard" isCollapsed={isCollapsed} />
              <SidebarLink icon={<Users size={20} />} label="Users" to="/admin/users" isCollapsed={isCollapsed} />
              <SidebarLink icon={<Briefcase size={20} />} label="Services" to="/admin/services" isCollapsed={isCollapsed} />
              <SidebarLink icon={<FileText size={20} />} label="Blog" to="/admin/blog" isCollapsed={isCollapsed} />
              <SidebarLink icon={<Image size={20} />} label="Carousel" to="/admin/carousel" isCollapsed={isCollapsed} />
              <SidebarLink icon={<Settings size={20} />} label="Settings" to="/admin/settings" isCollapsed={isCollapsed} />
            </nav>
          </div>
        </div>

        <div
          className="p-4 border-t border-gray-300 hover:bg-gray-100 cursor-pointer transition mt-auto"
          onClick={toggleSidebar}
        >
          <div className="flex items-center space-x-2">
            {isCollapsed ? (
              <ChevronRight size={18} />
            ) : (
              <>
                <ChevronLeft size={18} />
                <span className="text-sm pb-1">Collapse Sidebar</span>
              </>
            )}
          </div>
        </div>
      </aside>

      <main
        className={`ml-${isCollapsed ? '20' : '64'} transition-all duration-300`}
        style={{ paddingTop: '75px' }} // Adjust top padding to avoid overlap with header
      >
        {/* Your main content goes here */}
      </main>
    </>
  );
};

const SidebarLink = ({ icon, label, to, isCollapsed }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-200 transition ${isCollapsed ? 'justify-start' : ''}
      ${isActive ? 'text-[#4a94d0] font-semibold' : 'text-gray-700'}`
    }
  >
    {icon}
    {!isCollapsed && <span className="text-sm">{label}</span>}
  </NavLink>
);

export default AdminSidebar;
