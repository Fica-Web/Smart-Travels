import React, { useState } from 'react';
import { travelOptions } from '../../../data/HomeSection/travelOperations';



const TopIcons = () => {
  const [active, setActive] = useState('Flights'); // Default active title

  return (
   <div className="flex flex-row items-center md:px-14 bg-[#FFFFFF] md:mx-45 md:h-[71px] rounded-3xl text-secondary-blue overflow-x-auto">
  {travelOptions.map((item, index) => (
    <div key={index} className="flex flex-col items-center w-auto  md:flex-row md:items-center md:w-auto">
      <div
        className="flex flex-col items-center md:flex-row md:items-center cursor-pointer px-5"
        onClick={() => setActive(item.title)}
      >
        <img src={item.icon} alt={`${item.title} Icon`} className="w-[23px] h-[23px]" />
        <p
          className={`mt-1 text-sm md:mt-0 md:ml-2 md:text-lg font-semibold whitespace-nowrap  ${
            active === item.title ? 'text-blue-600' : 'text-secondary-blue'
          }`}
        >
          <span className="block md:hidden">{item.mobileTitle || item.title}</span>
          <span className="hidden md:block">{item.title}</span>
        </p>
      </div>

      {/* Divider: hidden on mobile */}
      {index !== travelOptions.length - 1 && (
        <div className="hidden md:block w-[1px] h-6 bg-black mx-5" />
      )}
    </div>
  ))}
</div>


  );
};

export default TopIcons;

