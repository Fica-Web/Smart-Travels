import React from 'react';

const SectionHeading = ({ backgroundText, heading, subtext }) => {
  return (
    <section>
      <div className="relative w-full text-center py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        {/* Background large text */}
        <h1
          className="absolute inset-0 text-[13vw] lg:text-[10vw] font-extrabold text-gray-200 opacity-60 uppercase tracking-wide pointer-events-none select-none leading-none"
          style={{ top: '50%', transform: 'translateY(-50%)' }}
        >
          {backgroundText}
        </h1>

        {/* Foreground content */}
        <div className="relative z-10 max-w-4xl mx-auto py-8 text-center">
          {/* Heading centered on top of background text */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-black mb-4 relative z-20"
            style={{ position: 'absolute', top: '70%', left: '50%', transform: 'translate(-50%, -50%)' }}
          >
            {heading}
          </h2>
        </div>
      </div>

      {/* Subtext below the background large text */}
      <div className="text-center mt-2">
  <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">{subtext}</p>
</div>

    </section>
  );
};

export default SectionHeading;
