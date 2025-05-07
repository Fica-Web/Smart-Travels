import React from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import adminNavOptions from '../../data/adminNavOptions';

const AdminSidebar = ({ isCollapsed, setIsCollapsed }) => {
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <aside
      className={`fixed top-[75px] left-0 h-[calc(100vh-70px)] flex flex-col ${
        isCollapsed ? 'w-16' : 'w-64'
      } bg-white border-r border-gray-300 transition-all duration-300 z-50`}
    >
      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="p-6">
          {!isCollapsed && (
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Panel</h2>
          )}
          <nav className="flex flex-col space-y-3 text-gray-700">
            {adminNavOptions.map((item) => (
              <SidebarLink
                key={item.label}
                icon={<item.icon size={20} />}
                label={item.label}
                to={item.to}
                end={item.end}
                isCollapsed={isCollapsed}
              />
            ))}
          </nav>
        </div>
      </div>

      <div
        className="p-4 border-t border-gray-300 hover:bg-gray-100 cursor-pointer transition mt-auto"
        onClick={toggleSidebar}
      >
        <div className="flex items-center space-x-2 text-gray-700">
          {isCollapsed ? (
            <ChevronRight size={18} />
          ) : (
            <>
              <ChevronLeft size={18} />
              <span className="text-sm">Collapse Sidebar</span>
            </>
          )}
        </div>
      </div>
    </aside>
  );
};

const SidebarLink = ({ icon, label, to, isCollapsed, end }) => (
  <NavLink
    to={to}
    end={end}
    className={({ isActive }) => {
      const baseClasses =
        'flex items-center px-3 py-2 rounded-lg transition group';
      const layoutClasses = isCollapsed ? 'justify-center' : 'space-x-3';
      const activeClasses =
        'text-[#0074cc] font-semibold'; // Active colors
      const inactiveClasses =
        'text-gray-600 hover:bg-gray-100'; // Inactive colors

      return `${baseClasses} ${layoutClasses} ${
        isActive ? activeClasses : inactiveClasses
      }`;
    }}
  >
    {({ isActive }) => (
      <>
        <span className={`${isActive ? 'text-[#0074cc]' : 'text-gray-500'}`}>
          {icon}
        </span>
        {(!isCollapsed || isActive) && (
          <span className="text-sm truncate ml-3">{label}</span>
        )}
      </>
    )}
  </NavLink>
);

export default AdminSidebar;