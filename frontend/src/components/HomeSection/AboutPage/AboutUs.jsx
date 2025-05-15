import React from 'react';
import SectionHeading from '../../reusable/SectionHeading';
import img1 from '../../../assets/image/about/about1.jpg';
import img2 from '../../../assets/image/about/about2.jpg';
import img3 from '../../../assets/image/about/about3.jpg';

const AboutUs = () => {
  return (
    <div>
      <SectionHeading
        backgroundText="OUR STORY"
        heading="About Our Journey"
        subtext="Explore travel tips, hidden gems, and expert guides to make your next adventure unforgettable!"
      />

      <div className="pt-5 mt-6 p-17">
        <div className="w-full grid md:grid-cols-3 gap-6 px-14 items-start justify-center  ">

          {/* Left Column */}
          <div className="flex flex-col justify-between w-full h-[600px] space-y-3">
            <div className="w-full h-[290px] rounded-3xl overflow-hidden">
              <img
                src={img1}
                alt="About 1"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="w-full h-[290px] bg-[#4A94D0]/10 rounded-3xl hidden md:flex items-center justify-center text-xl font-semibold">
              Box 1
            </div>
          </div>

          {/* Center Image */}
          <div className="flex items-center justify-center w-full h-[600px]">
            <img
              src={img2}
              alt="About 2"
              className="h-full w-auto object-cover rounded-2xl shadow-lg"
            />
          </div>

          {/* Right Column */}
          <div className="flex flex-col justify-between w-full h-[600px] space-y-3">
            <div className="w-full h-[290px] bg-[#4A94D0]/10 rounded-3xl flex items-center justify-center text-xl font-semibold">
              Box 5
            </div>
            <div className="w-full h-[290px] rounded-3xl overflow-hidden hidden md:block">
              <img
                src={img3}
                alt="About 3"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AboutUs;
