import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/image/logo/logo.png';
import { IoPower } from "react-icons/io5";
import { adminLogoutApi } from '../../services/api/adminApi'; // Make sure the path is correct

const AdminNavbar = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleLogout = async () => {
    try {
      // Call API to log out
      await adminLogoutApi();

      // Clear auth token from localStorage
      localStorage.removeItem('token');

      // Redirect to login page
      navigate('/admin/login');

      // Close the modal
      setShowModal(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="p-3 m-1 px-8 bg-white flex items-center justify-between text-gray-700 h-[70px] border-b border-gray-200">
      {/* Logo */}
      <div>
        <img src={logo} alt="Logo" className="w-25 h-25 object-contain" />
      </div>

      {/* Logout Button and Modal */}
      <div className="relative">
        <button
          onClick={toggleModal}
          className="bg-white text-red-600 w-10 h-10 rounded-full flex items-center justify-center border-2 hover:bg-red-600 hover:text-white shadow transition-colors duration-200"
        >
          <IoPower className="w-5 h-5 " />
        </button>

        {showModal && (
          <div className="absolute right-0 mt-2 bg-white p-6 rounded-xl shadow-2xl w-64 z-50 border border-gray-200">
            <h3 className="text-base mb-5 text-gray-700 font-medium">
              Are you sure you want to log out?
            </h3>
            <div className="flex gap-4">
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 transition-colors duration-200 text-white px-4 py-2 rounded-lg text-sm font-semibold w-full whitespace-nowrap"
              >
                Yes, Log Out
              </button>
              <button
                onClick={toggleModal}
                className="bg-gray-300 hover:bg-gray-400 transition-colors duration-200 text-gray-800 px-4 py-2 rounded-lg text-sm font-semibold w-full"
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
