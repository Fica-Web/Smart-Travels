import React, { useState } from 'react';
import logo from '../../assets/image/logo/logo.png';
import { IoPower } from "react-icons/io5";

const AdminNavbar = () => {
  // State to manage whether the modal is visible or not
  const [showModal, setShowModal] = useState(false);

  // Function to toggle modal visibility
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // Function to handle logout action (for now, just hide the modal)
  const handleLogout = () => {
    // You can add your logout logic here (e.g., clear session, redirect to login page)
    alert('Logged out!');
    setShowModal(false); // Close the modal after logout
  };

  return (
    <nav className="p-3 m-1 px-8 flex items-center justify-between text-white ">
      {/* Logo */}
      <div className="">
        <img src={logo} alt="Logo" className="w-25 h-25 object-contain" />
      </div>

      <div className="relative">
      <button
  onClick={toggleModal}
  className="border border-red-600 text-red-600 px-5 py-2 rounded-md text-sm font-semibold flex items-center gap-2 shadow transition-colors hover:bg-red-600 hover:text-white"
>
  <IoPower className="w-5 h-5 text-red-600" />
  Logout
</button>



        {/* Modal for confirmation, positioned below the button */}
        {showModal && (
          <div className="absolute right-0 mt-1 bg-white p-6 rounded-lg shadow-lg w-56">
            <h3 className="text-md mb-4 text-gray-800">Are you sure you want to log out?</h3>
            <div className="flex justify-between space-x-4 ">
              <button
                onClick={handleLogout}
                className="bg-green-500 text-white  px-4 py-2 rounded text-sm font-semibold whitespace-nowrap w-full"
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
