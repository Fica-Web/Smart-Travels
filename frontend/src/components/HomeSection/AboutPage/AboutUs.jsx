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

      <div className="  px-3 md:px-17 ">
        <div className="w-full grid md:grid-cols-3 gap-6  md:pt-3 md:px-14 items-start justify-center">

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
              <div className="w-full h-[200px] md:h-[290px] bg-[#4A94D0]/10 rounded-3xl p-6 md:p-8  flex flex-col items-start justify-start gap-4 text-xl ">
                <div className='flex items-center justify-start '>
                  <div className='w-[4px] h-[20px] bg-[#4A94D0] rounded-xl'></div>
                  <h1 className="text-lg sm:text-2xl pl-3 font-semibold text-secondary-blue">
                    Our Mission
                  </h1>
                </div>
                <div className=' '>
                  <p
                    className="text-sm sm:text-base text-secondary-blue/80 max-w-2xl text-justify "
                    style={{ wordSpacing: "-0.05rem" }}
                  >
                    Our mission is to provide travelers with seamless and stress-free journeys worldwide. We deliver personalized experiences, expert guidance, and competitive pricing tailored to meet your unique needs. From booking to return, we carefully plan every detail so you can focus on creating unforgettable and lasting memories.</p>                </div>
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
            <div className="flex flex-col w-full h-[400px] md:h-[600px] space-y-5 ">

              <div className="w-full h-[200px] md:h-[290px] bg-[#4A94D0]/10 rounded-3xl p-6 md:p-8  flex flex-col items-start justify-start gap-4 text-xl ">
                <div className='flex items-center justify-start '>
                  <div className='w-[4px] h-[20px] bg-[#4A94D0] rounded-xl'></div>
                  <h1 className="text-lg sm:text-2xl text-secondary-blue pl-3 font-semibold">
                    Our Vision
                  </h1>
                </div>
                <div className=' '>
                  <p
                    className="text-sm sm:text-base text-secondary-blue/80 max-w-2xl text-justify  "
                    style={{ wordSpacing: "-0.05rem" }}
                  >
                    Our vision is to be the trusted and innovative travel partner, known for exceptional service, reliability, and personalized experiences tailored to individual needs. We strive to inspire travel, simplify planning, and create meaningful, enriching journeys that leave lasting impressions on every traveler we have the privilege to serve.                    </p>
                </div>
              </div>
              <div className="w-full h-[200px] md:h-[290px] rounded-3xl overflow-hidden">
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
