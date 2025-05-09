import React from 'react';

const SectionHeading = ({ backgroundText, heading, subtext }) => {
  return (
    <section className=''>
      <div className="relative w-full  text-center  py-16 sm:py-20 lg:py-32 px-4 sm:px-6 lg:px-8  overflow-hidden">
        {/* Background large text */}
        <h1 className="
          absolute top-1/2 -translate-y-1/2 inset-x-0 
          text-[12vw] sm:text-[8vw] md:text-[10vw] 
          font-extrabold text-gray-200 opacity-60 
          uppercase tracking-wide
          pointer-events-none select-none leading-none
        ">
          {backgroundText}
        </h1>

        {/* Foreground heading */}
        <div className="relative z-10 max-w-4xl mx-auto py-2 sm:py-5 text-center"> {/* Reduced padding on mobile */}
          <h2 className="
            absolute top-1/2 left-1/2 
            -translate-x-1/2 -translate-y-1/2 
            text-base sm:text-2xl md:text-3xl lg:text-4xl 
            font-semibold text-black z-20 
            whitespace-nowrap
          ">
            {heading}
          </h2>
        </div>
      </div>

      {/* Subtext */}
      <div className="text-center pb-4 px-4"> {/* Reduced padding bottom on mobile */}
        <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          {subtext}
        </p>
      </div>
    </section>
  );
};

export default SectionHeading;
