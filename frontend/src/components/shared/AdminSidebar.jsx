import React, { useState } from 'react';
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
    <aside
      className={`fixed top-[73px] left-0 h-[calc(100vh-60px)] flex flex-col ${isCollapsed ? 'w-25' : 'w-64'} bg-white border border-gray-300 transition-all duration-300 z-50`}
    >
      {/* Sidebar content section (with scroll) */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* Expanded Sidebar Content */}
        <div className="p-6">
          {!isCollapsed && (
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Panel</h2>
          )}
          <nav className="flex flex-col space-y-3 text-gray-700">
            <SidebarLink icon={<Home size={20} />} label="Dashboard" isCollapsed={isCollapsed} />
            <SidebarLink icon={<Users size={20} />} label="Users" isCollapsed={isCollapsed} />
            <SidebarLink icon={<Briefcase size={20} />} label="Services" isCollapsed={isCollapsed} />
            <SidebarLink icon={<FileText size={20} />} label="Blog" isCollapsed={isCollapsed} />
            <SidebarLink icon={<Image size={20} />} label="Carousel" isCollapsed={isCollapsed} />
            <SidebarLink icon={<Settings size={20} />} label="Settings" isCollapsed={isCollapsed} />
          </nav>
        </div>
      </div>

      {/* Bottom area (Collapse button inside the sidebar) */}
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
  );
};

const SidebarLink = ({ icon, label, isCollapsed }) => (
  <a
    href="#"
    className={`flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-200 transition ${isCollapsed ? 'justify-center' : ''}`}
  >
    {icon}
    {!isCollapsed && <span>{label}</span>}
  </a>
);

export default AdminSidebar;
