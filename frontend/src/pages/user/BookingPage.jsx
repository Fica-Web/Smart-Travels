import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import ReusableHero from '../../components/reusable/ReusableHero';
import TopIcons from '../../components/HomeSection/BookingPage/TopIcons';
import img from '../../assets/image/booking/booking-hero.jpg';

const BookingPage = () => {
  
  return (
    <div>
      <ReusableHero title="Start Your Journey – Book Now" bgImage={img} />
      <div className="relative md:-mt-8 md:z-10">
        <TopIcons />
      </div>
      {/* Render the child route component here */}
      <Outlet />
    </div>
  );
};

export default BookingPage;
