import React from 'react';

const SectionHeading = ({ backgroundText, heading, subtext }) => {
  return (
    <section className=''>
      <div className="relative w-full text-center py-16 sm:py-20 lg:py-40 overflow-hidden ">
        {/* Background large text */}
        <h1 className="font-coastal-clean 
    absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
    whitespace-nowrap
    text-[15vw] sm:text-[8vw] md:text-[11vw]
    text-gray-200 opacity-60
    uppercase tracking-wide
    pointer-events-none select-none leading-none">
          {backgroundText.split(" ").map((word, index) => (
            <span key={index} className="inline-block">
              <span className="text-[125%]">{word[0]}</span>{word.slice(1)}&nbsp;
            </span>
          ))}
        </h1>

        {/* Foreground heading - slightly moved down */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[25%] z-10 ">
          <h2 className="inline whitespace-nowrap text-base sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-black">
            {heading}
          </h2>


        </div>
      </div>



      {/* Subtext */}
      <div className="text-center pb-20  px-4  ">
        <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mt-4 md:mt1">
          {subtext}
        </p>
      </div>
    </section>
  );
};

export default SectionHeading; 