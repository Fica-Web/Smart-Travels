import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/reusable/Navbar';

const HomeLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default HomeLayout;

