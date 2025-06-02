import React from 'react';

const CircleIconLabel = ({ icon, step, index, page }) => {
  const isFourthFlightIcon = index === 3 && page === 'flight';

  return (
    <div className="w-35 h-35 md:w-35 md:h-35 lg:w-40 lg:h-40 bg-[#4A94D0]/20 rounded-full flex flex-col items-center justify-center">
      <img
        src={icon}
        alt="Step icon"
        className={` object-contain 
          ${isFourthFlightIcon ? 'w-16 h-16 sm:w-15 sm:h-15 md:w-15 md:h-15 mb-0' : 'w-10 h-10 sm:w-10 sm:h-10 md:w-12 md:h-12 mb-2'}`}
      />
      <p
        className="w-[110px] text-xs text-secondary-blue text-center leading-[18px] whitespace-pre-line break-words"
        style={{ minHeight: '36px' }}
      >
        {step}
      </p>
    </div>
  );
};

export default CircleIconLabel;
