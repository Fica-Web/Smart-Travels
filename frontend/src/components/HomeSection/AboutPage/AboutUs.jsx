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
        subtext="We are your trusted travel partner, dedicated to delivering seamless, personalized journeys that create unforgettable memories."
      />

      <div className="  px-3 md:px-0 lg:px-16 ">
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-2  md:px-2 items-start justify-center pt-2 ">

          {/* Left Column */}
          <div className="w-full md:w-auto ">
            <div className="flex flex-col w-full h-auto  lg:h-[600px] space-y-5 ">
              <div className="w-full hidden sm:block  h-[250px] lg:h-[290px] rounded-3xl overflow-hidden">
                <img
                  src={img1}
                  alt="About 1"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="w-full h-[250px] lg:h-[290px] bg-[#4A94D0]/10 rounded-3xl p-6 lg:p-5 flex flex-col items-start justify-start gap-0 md:gap-2 text-xl">
                <div className='flex items-center justify-start '>
                  <div className='w-[4px] h-[20px] bg-[#4A94D0] rounded-xl'></div>
                  <h1 className="text-lg sm:text-2xl pl-3 font-semibold text-secondary-blue">
                    Our Mission
                  </h1>
                </div>

                <p
                  className="text-sm sm:text-base text-secondary-blue/80 lg:max-w-3xl text-justify  "
                 style={{ wordSpacing: "-0.05rem" }}
                >
                  Our mission is to provide travelers with seamless, stress-free journeys worldwide. We deliver personalized experiences, expert guidance, and pricing tailored to meet your needs. From booking to return, we carefully plan every detail so you can focus on creating unforgettable memories.
                </p>
              </div>

            </div>
          </div>


          {/* Center Image */}
        
            <div className="flex items-center justify-center h-[500px] lg:h-[600px]">

              <img
                src={img2}
                alt="About 2"
                className="w-full lg:w-auto h-full object-cover rounded-2xl shadow-lg"
              />
            </div>


          {/* Right Column */}
          <div className="w-full lg:w-auto ">
            <div className="flex flex-col w-full h-auto lg:h-[600px] space-y-5 ">

              <div className="w-full h-[250px] lg:h-[290px] bg-[#4A94D0]/10 rounded-3xl p-6 lg:p-5 flex flex-col items-start justify-start gap-0 md:gap-2 text-xl">
                <div className='flex items-center justify-center '>
                  <div className='w-[4px] h-[20px] bg-[#4A94D0] rounded-xl'></div>
                  <h1 className="text-lg sm:text-2xl text-secondary-blue pl-3 font-semibold">
                    Our Vision
                  </h1>
                </div>
                <div className=' '>
                    <p
                  className="text-sm sm:text-base text-secondary-blue/80 lg:max-w-3xl text-justify  "
                 style={{ wordSpacing: "0.05rem" }}
                >
Our vision is to be travel partner, known for exceptional service, reliability, and personalized experiences tailored to needs. We strive to inspire travel, simplify planning, and create meaningful journeys that leave lasting impressions on every traveler we have the honor to serve.
                    </p>                 
                     </div>
              </div>
              <div className="hidden sm:block w-full h-[0px] md:h-[290px] rounded-3xl overflow-hidden">
                <img
                  src={img3}
                  alt="About 1"
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
