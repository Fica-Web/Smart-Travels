import React from 'react';
import { Link } from 'react-router-dom';

const AdminHero = ({ title = 'Admin Section', link, button }) => {
    // , subtitle = 'Manage your admin content here.'
  return (
    <div className="p-5   mb-9">
      <h1 className="text-3xl font-bold text-gray-800">{title} Dashboard</h1>
      {/* <p className="text-gray-600 mt-1">{subtitle}</p> */}

      {button && (
        <div className='flex justify-end mt-10'>
          <Link to={link} className="text-blue-600 hover:text-blue-800 border border-blue-600 hover:border-blue-800 rounded-md px-4 py-2 transition">
            + { button }
          </Link>
        </div>
      )}
    </div>
  );
};

export default AdminHero;
