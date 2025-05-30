import React from 'react';

const IconStepCard = ({ icon, step }) => {
  return (
  <div className="w-40 h-40   md:w-35 md:h-35 lg:w-40 lg:h-40 bg-[#4A94D0]/20 rounded-full flex flex-col items-center justify-center">
  <img src={icon} alt="Step icon" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mb-2" />
  <p className="w-[110px] text-xs text-secondary-blue text-center leading-[18px] break-words">
  {step}
</p>

</div>

  );
};

export default IconStepCard;
