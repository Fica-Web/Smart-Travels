import React from 'react';

const SectionHeading = ({ backgroundText, heading, subtext }) => {
  return (
    <section>
      <div className="relative w-full text-center px-4 py-10 sm:py-20 lg:py-40 overflow-hidden sm:mt-0 mt-10">

        {/* Background large text */}
        <h1 className="font-coastal-clean absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
          whitespace-nowrap
          text-[15vw] sm:text-[8vw] md:text-[11vw]
          text-secondary-blue opacity-8
          uppercase tracking-wide pointer-events-none select-none leading-none"
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


        {/* Foreground heading */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[15%] md:translate-y-[55%] z-10">
          <h2 className="inline whitespace-nowrap text-base sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-secondary-blue">
            {heading}
          </h2>
        </div>
      </div>

      {/* Subtext */}
      <div className="text-center pb-10 px-4">
        <p className="text-sm sm:text-base md:text-lg text-secondary-blue max-w-2xl mx-auto leading-relaxed mt-4 md:mt-1">
          {subtext}
        </p>
      </div>
    </section>
  );
};

export default SectionHeading;
