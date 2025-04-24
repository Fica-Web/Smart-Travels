import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/image/logo/logo.png';
import { IoPower } from "react-icons/io5";

const AdminNavbar = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleLogout = () => {
    // Clear auth token from localStorage
    localStorage.removeItem('token');

    // Redirect to login page
    navigate('/admin/login');

    // Close the modal after logout
    setShowModal(false);
  };

  return (
    <nav className="p-3 m-1 px-8 bg-gray-800 flex items-center justify-between text-white">
      {/* Logo */}
      <div>
        <img src={logo} alt="Logo" className="w-25 h-25 object-contain" />
      </div>

      {/* Logout Button and Modal */}
      <div className="relative">
        <button
          onClick={toggleModal}
          className="bg-red-600 text-amber-50 px-5 py-2 rounded-md text-sm font-semibold flex items-center gap-2 shadow transition-colors hover:bg-red-800 "
        >
          <IoPower className="w-5 h-5  text-white" />
          Logout
        </button>

        {/* Logout Confirmation Modal */}
        {showModal && (
          <div className="absolute right-0 mt-1 bg-white p-6 rounded-lg shadow-lg w-56 z-50">
            <h3 className="text-md mb-4 text-gray-800">Are you sure you want to log out?</h3>
            <div className="flex justify-between space-x-4">
              <button
                onClick={handleLogout}
                className="bg-green-500 text-white px-4 py-2 rounded text-sm font-semibold whitespace-nowrap w-full"
              >
                Yes, Log Out
              </button>
              <button
                onClick={toggleModal}
                className="bg-gray-400 text-white px-4 py-2 rounded text-sm font-semibold whitespace-nowrap w-full"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AdminNavbar;
