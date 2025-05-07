import React from 'react';

const AdminHero = ({ title = 'Admin Section' }) => {
    // , subtitle = 'Manage your admin content here.'
  return (
    <div className="p-5   mb-9">
      <h1 className="text-3xl font-bold text-gray-800">{title} Dashboard</h1>
      {/* <p className="text-gray-600 mt-1">{subtitle}</p> */}
    </div>
  );
};

export default AdminHero;
