import React from 'react';

const SectionHeading = ({ backgroundText = '', heading, subtext = '', align = 'center', py='py-17 md:py-20 lg:py-35' ,variant,top='mt-8'}) => {
   const isCentered = align === 'center';
  const isHotelPage = variant === 'hotel';

  return (
    <section className=''>
      <div className={`relative w-full px-4 ${py} overflow-visible mt-0 md:${top}  text-${align} `}>
        {/* Background large text (only if centered) */}
        {isCentered && backgroundText && (
          <h1 className="font-coastal-clean absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  
            whitespace-nowrap
            text-[15vw] sm:text-[8vw] md:text-[11vw]
            text-secondary-blue opacity-8
            uppercase tracking-wide pointer-events-none select-none leading-none "
          >
            {backgroundText.split(" ").map((word, index) => (
              <span key={index} className="inline-block">
                {index === 0 ? (
                  <>
                    <span className="text-[125%]">{word[0]}</span>
                    {word.slice(1)}
                  </>
                ) : (
                  word
                )}
                &nbsp;
              </span>
            ))}
          </h1>
        )}

        {/* Foreground heading */}
              <div className={`${isCentered ? 'absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[15%] md:translate-y-[55%] ' : ''} z-10`}>
          <h2
  className={` 
    ${isHotelPage ? 'inline whitespace-nowrap text-2xl font-bold  text-center   text-secondary-blue ' : 'inline whitespace-nowrap overflow-hidden text-ellipsis max-w-[90vw] text-base sm:text-2xl md:text-3xl lg:text-4xl font-semibold'} 
    text-secondary-blue ${!isCentered ? 'text-left' : ''}`}
>
  {heading}
</h2>

        </div>
      </div>

      {/* Subtext */}
      {subtext && (
       <div className={`pb-3 md:pb-8 pt-1 px-4 ${isCentered ? 'text-center' : 'text-left'}`}>
  <p className="text-sm sm:text-base md:text-lg text-secondary-blue max-w-2xl mx-auto leading-relaxed mt-0 md:mt-6">
    {subtext}
  </p>
</div>

      )}
    </section>
  );
};


export default SectionHeading;
