import React from 'react';
import { Home, Users, Settings, Briefcase } from 'lucide-react';

const AdminSidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col p-4">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <nav className="flex flex-col space-y-4">
        <a href="#" className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded">
          <Home size={20} />
          <span>Dashboard</span>
        </a>
        <a href="#" className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded">
          <Users size={20} />
          <span>Users</span>
        </a>
        <a href="#" className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded">
          <Briefcase size={20} />
          <span>Services</span>
        </a>
        <a href="#" className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded">
          <Settings size={20} />
          <span>Settings</span>
        </a>
      </nav>
    </div>
  );
};

export default AdminSidebar;

