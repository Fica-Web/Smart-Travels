import React from 'react';
import { travelOptions } from '../../../data/HomeSection/travelOperations';
import { useNavigate, useLocation } from 'react-router-dom';

const TopIcons = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getNormalizedPath = () => {
    return location.pathname === '/bookings' ? '/bookings/flights' : location.pathname;
  };

  const isActive = (route) => {
    const normalizedPath = getNormalizedPath();
    if (route === '/bookings/trips') {
      return normalizedPath.startsWith('/bookings/trips');
    }
    return normalizedPath === route;
  };

  const handleNavigate = (route) => {
    navigate(route);
  };

  return (
    <div className="flex flex-row items-center justify-center px-4 md:px-5 lg:px-9 bg-[#FFFFFF] mx-1 md:mx-9 lg:mx-50 md:h-[71px] sm:rounded-3xl sm:shadow text-secondary-blue overflow-x-hidden scrollbar-none">
      {travelOptions.map((item, index) => (
        <div key={index} className="flex flex-col items-center w-auto md:flex-row md:items-center md:w-auto">
          <div
            className="flex flex-col items-center md:flex-row md:items-center cursor-pointer px-2 md:px-2 lg:px-6"
            onClick={() => handleNavigate(item.route)}
          >
            <img
             src={isActive(item.route) ? item.activeIcon : item.icon}
              alt={`${item.title} Icon`}
              className="w-[23px] h-[23px]"
            />

           <p className={`mt-1 text-sm md:mt-0 md:ml-2 md:text-lg font-semibold whitespace-nowrap no-underline 
  ${isActive(item.route) ? 'text-blue-600' : 'text-secondary-blue'}`}>

              <span className="block md:hidden">{item.mobileTitle || item.title}</span>
              <span className="hidden md:block">{item.title}</span>
            </p>
          </div>

          {/* Divider: hidden on mobile */}
         {index !== travelOptions.length - 1 && (
  <div className="hidden md:block w-[1px] h-6 bg-secondary-blue md:mx-2 lg:mx-5" />
)}

        </div>
      ))}
    </div>
  );
};

export default TopIcons;
