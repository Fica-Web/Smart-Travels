import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/reusable/Navbar';

const HomeLayout = () => {
  return (
    <div className="min-h-screen bg-[#d6d6d6] flex justify-center items-start py-10">
      {/* Big white container */}
      <div className="w-[96%] max-w-8xl bg-[#f0f0f0] rounded-3xl shadow-xl overflow-hidden relative">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default HomeLayout;

