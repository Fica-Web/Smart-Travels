import React from 'react';

const IconStepCard = ({ icon, step }) => {
  return (
  <div className="w-35 h-35   md:w-35 md:h-35 lg:w-40 lg:h-40 bg-[#4A94D0]/20 rounded-full flex flex-col items-center justify-center">
  <img src={icon} alt="Step icon" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mb-2" />
  <p
  className="w-[110px] text-xs text-secondary-blue text-center leading-[18px] whitespace-pre-line break-words"
  style={{ minHeight: '36px' }}
>
  {step}
</p>


</div>

  );
};

export default IconStepCard;
