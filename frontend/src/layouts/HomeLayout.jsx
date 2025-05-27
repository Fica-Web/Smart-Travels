import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';
import Whatsapp from '../components/reusable/WhatsApp';

const HomeLayout = () => {
  return (
    <>
      <Navbar />
      <Whatsapp />
      <Outlet />
       <Footer />
    </>
  );
};

export default HomeLayout;

