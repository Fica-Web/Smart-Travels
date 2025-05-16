import React from 'react'
import SectionHeading from '../../reusable/SectionHeading'
import img from '../../../assets/image/Destination/vertical-shot-beautiful-eiffel-tower-captured-paris-france.jpg'
import img2 from '../../../assets/image/hero/Ruknhero.jpg'

const ChooseUs = () => {
    return (
        <div className="sm:px-6 md:px-20 ">
            <SectionHeading
                backgroundText="CHOOSE US"
                heading="Your Trusted Travel Partner"
                subtext="Handpicked travel experiences to the most iconic, breathtaking, and exciting locations. Choose your next adventure and start making memories today."
            />

            {/* Responsive Wrapper */}
            <div className="w-full flex flex-col md:grid md:grid-cols-[auto_auto_auto] gap-8 px-4 pt-5 mt-6 p-17 items-center justify-center">

                {/* Left Column */}
                {/* <div className="hidden sm:block w-full md:w-[400px] h-[300px] bg-gray-100 rounded-xl overflow-hidden mx-auto">
                        <img
                            src={img2}
                            alt=""
                            className="w-full h-full object-cover rounded-xl"
                        /> */}
                {/* Left Column */}
                <div className="flex flex-col justify-between w-full md:w-[400px] h-auto md:h-[600px] space-y-6 items-center order-1 md:order-none">
                    <div className="w-full h-[200px] bg-[#4A94D0]/10 rounded-3xl flex items-center justify-center text-xl font-semibold">
                        Box 1
                    </div>
                    <div className="w-full h-[200px] bg-[#4A94D0]/10 rounded-3xl flex items-center justify-center text-xl font-semibold">
                        Box 2
                    </div>
                     <div className="w-full md:w-[400px] h-[200px] bg-[#4A94D0]/10 rounded-3xl hidden md:flex items-center justify-center mx-auto text-xl font-semibold order-4 md:order-none">
      <img
        src={img2}
        alt=""
        className="w-full h-full object-cover rounded-xl"
      />
    </div>
                </div>

                {/* Center Image */}
                <div className="flex items-center justify-center w-full md:w-[450px] h-[400px] md:h-[600px] order-3 md:order-none">
                    <img
                        src={img}
                        alt="Center"
                        className="h-full w-auto object-cover rounded-2xl shadow-lg"
                    />
                </div>

                {/* Right Column */}
                <div className="flex flex-col justify-between w-full md:w-[400px] h-auto md:h-[600px] space-y-6 items-center order-4 md:order-none">
                     <div className="w-full md:w-[400px] h-[200px] bg-[#4A94D0]/10 rounded-3xl hidden md:flex items-center justify-center mx-auto text-xl font-semibold order-4 md:order-none">
      <img
        src={img2}
        alt=""
        className="w-full h-full object-cover rounded-xl"
      />
    </div>
                    <div className="w-full h-[200px] bg-[#4A94D0]/10 rounded-3xl flex items-center justify-center text-xl font-semibold">
                        Box 5
                    </div>
                    <div className="w-full h-[200px] bg-[#4A94D0]/10 rounded-3xl flex items-center justify-center text-xl font-semibold">
                        Box 6
                    </div>
                </div>

            </div>
    </div>
            )
}

            export default ChooseUs
