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

      <div className="pt-5 mt-6 px-3 md:px-17 ">
        <div className="w-full grid md:grid-cols-3 gap-6 md:px-14 items-start justify-center">

          {/* Left Column */}
          <div className="w-full md:w-auto">
            <div className="flex flex-col w-full h-[400px] md:h-[600px] space-y-5 ">
              <div className="w-full h-[200px] md:h-[290px] rounded-3xl overflow-hidden">
                <img
                  src={img1}
                  alt="About 1"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="w-full h-[200px] md:h-[290px] bg-[#4A94D0]/10 rounded-3xl p-6 md:p-4 flex flex-col items-start justify-start gap-4 text-xl font-semibold">
                <h1 className="text-lg sm:text-2xl font-semibold md:pt-5">
                  Our Mission
                </h1>
                <p className="text-sm sm:text-base text-gray-600 max-w-2xl">
                  Our mission is to empower travelers with seamless, stress-free, and unforgettable journeys. We provide personalized experiences, expert guidance, and competitive pricing through complete travel solutions. From booking to return, we ensure every detail is thoughtfully planned so you can focus on making lasting memories.
                </p>
              </div>
            </div>
          </div>


          {/* Center Image */}
          <div className="w-full md:w-auto">
            <div className="flex items-center justify-center w-full h-[600px] ">
              <img
                src={img2}
                alt="About 2"
                className="w-full md:w-auto h-full object-cover rounded-2xl shadow-lg"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full md:w-auto">
            <div className="flex flex-col justify-between w-full  h-[400px] md:h-[600px] space-y-5 md:space-y-4 ">
              <div className="w-full h-[200px] md:h-[290px]  bg-[#4A94D0]/10 rounded-3xl p-6 md:p-4 flex flex-col items-start justify-start gap-4 text-xl font-semibold">
                <h1 className="text-lg sm:text-2xl font-semibold md:pt-5">
                  Our Vision
                </h1>
                <p className="text-sm sm:text-base text-gray-600 max-w-2xl">
                  Our vision is to be the most trusted and innovative travel partner, known for exceptional service, reliability, and personalized experiences. We strive to inspire travel, simplify planning, and create meaningful journeys that leave lasting impressions on every traveler.</p>
              </div>
              <div className="w-full h-[200px] md:h-[290px] rounded-3xl overflow-hidden">
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
    </div>
  );
};

export default AboutUs;
