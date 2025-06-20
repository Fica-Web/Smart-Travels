import React from 'react';

const SectionHeading = ({ backgroundText = '', heading, subtext = '', align = 'center', py = 'py-17 md:py-20 lg:py-27', variant, }) => {
  const isCentered = align === 'center';
  const isHotelPage = variant === 'hotel';

  return (
    <section className=''>
      <div className={`relative w-full px-4 ${py} overflow-visible   text-${align} `}>
        {/* Background large text (only if centered) */}
        {isCentered && backgroundText && (
          <h1 className=" font-coastal-clean absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  
            whitespace-nowrap
            text-[15vw] sm:text-[8vw] md:text-[11vw]
            text-secondary-blue opacity-8
            uppercase tracking-wide pointer-events-none select-none leading-none "
          >
            {backgroundText}
          </h1>
        )}

        {/* Foreground heading */}
        <div className={`${isCentered ? 'absolute top-1/2 left-1/2 -translate-x-1/2  ' : ''} `}>
          <h2
            className={` 
    ${isHotelPage ? 'inline whitespace-nowrap text-2xl font-bold  text-center   text-secondary-blue pb-8 ' : 'inline whitespace-nowrap overflow-hidden text-ellipsis max-w-[90vw] text-base sm:text-2xl md:text-3xl lg:text-4xl font-semibold'} 
    text-secondary-blue ${!isCentered ? 'text-left' : ''}`}
          >
            {heading}
          </h2>

        </div>
      </div>

      {/* Subtext */}
      {subtext && (
        <div className={`pb-3 md:pb-8  px-4 ${isCentered ? 'text-center ' : 'text-left'}`}>
          <p className="text-sm sm:text-base md:text-lg text-secondary-blue max-w-2xl mx-auto leading-relaxed mt-0 md:mt-6">
            {subtext}
          </p>
        </div>

      )}
    </section>
  );
};


export default SectionHeading;
