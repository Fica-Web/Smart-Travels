import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import adminNavOptions from '../../data/adminNavOptions';

const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside
      className={`fixed top-[75px] left-0 h-[calc(100vh-70px)] flex flex-col ${isCollapsed ? 'w-25' : 'w-64'} bg-white border-r border-gray-300 transition-all duration-300 z-50`}
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

const SidebarLink = ({ icon, label, to, isCollapsed, end }) => (
  <NavLink
    to={to}
    end={end}
    className={({ isActive }) =>
      `flex items-center ${
        isCollapsed ? 'justify-center' : 'space-x-3'
      } px-3 py-2 rounded-lg hover:bg-gray-100 transition group ${
        isActive ? 'text-[#4a94d0] font-semibold' : 'text-gray-700'
      }`
    }
  >
    <span className="text-gray-600">{icon}</span>
    {!isCollapsed && <span className="text-sm truncate">{label}</span>}
  </NavLink>
);


export default AdminSidebar;