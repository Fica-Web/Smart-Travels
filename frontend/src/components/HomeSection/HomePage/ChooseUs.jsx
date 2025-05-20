import React from 'react'
import SectionHeading from '../../reusable/SectionHeading'
import img from '../../../assets/image/Destination/vertical-shot-beautiful-eiffel-tower-captured-paris-france.jpg'
import img2 from '../../../assets/image/hero/Ruknhero.jpg'
import { FaMapMarkedAlt, FaTags } from 'react-icons/fa';
import { Ri24HoursFill } from "react-icons/ri";
import { MdOutlineFlightTakeoff } from 'react-icons/md';

const ChooseUs = () => {
    return (
        <div className="px-4 md:px-20  ">
            <SectionHeading
                backgroundText="CHOOSE US"
                heading="Your Trusted Travel Partner"
                subtext="Handpicked travel experiences to the most iconic, breathtaking, and exciting locations. Choose your next adventure and start making memories today."
            />

            {/* Responsive Wrapper */}
            <div className="w-full flex flex-col md:grid md:grid-cols-[auto_auto_auto] gap-8 md:px-4  p-0 md:p-5 items-center justify-center ">

                {/* Left Column */}
                {/* <div className="hidden sm:block w-full md:w-[400px] h-[300px] bg-gray-100 rounded-xl overflow-hidden mx-auto">
                        <img
                            src={img2}
                            alt=""
                            className="w-full h-full object-cover rounded-xl"
                        /> */}
                {/* Left Column */}
                <div className="flex flex-col justify-between w-full md:w-[400px] h-auto md:h-[600px] space-y-6 items-center order-1 md:order-none ">
                    <div className="w-full h-[200px] bg-[#4A94D0]/10 rounded-3xl flex flex-col justify-center px-6 text-left text-xl  space-y-2 p-2 ">
                        {/* Icon inside a circle */}
                        <div className="text-white p-3 rounded-full w-fit bg-gradient-to-b from-[#005BF0] to-[#63CCF6]">
                            <FaMapMarkedAlt className="text-2xl" />
                        </div>

                        {/* Heading */}
                        <h3 className="text-secondary-blue font-semibold">Expertly Curated Experiences</h3>

                        {/* Description */}
                        <p className="text-sm sm:text-base  text-secondary-blue/80">
                            Discover handpicked destinations and authentic local adventures.
                        </p>
                    </div>


                    <div className="w-full h-[200px] bg-[#4A94D0]/10 rounded-3xl flex flex-col justify-center px-6 text-left text-xl  space-y-2 p-2">

                        {/* Icon inside a circle */}
                        <div className="text-white p-3 rounded-full w-fit bg-gradient-to-b from-[#005BF0] to-[#63CCF6]">
                            <Ri24HoursFill className="text-2xl" />
                        </div>

                        {/* Heading */}
                        <h3 className="text-secondary-blue font-semibold">24/7 Support & Safety</h3>

                        {/* Description */}
                        <p className="text-sm sm:text-base text-secondary-blue/80">
                            Discover handpicked destinations and authentic local adventures.
                        </p>

                    </div>
                    <div className="w-full md:w-[400px] h-[200px] bg-[#4A94D0]/10 rounded-3xl hidden md:flex items-center justify-center mx-auto text-xl font-semibold order-4 md:order-none ">
                        <img
                            src={img2}
                            alt=""
                            className="w-full h-full object-cover rounded-xl"
                        />
                    </div>
                </div>

                {/* Center Image */}
                <div className="flex items-center justify-center w-full md:w-[400px] h-[400px] md:h-[600px] order-3 md:order-none ">
                    <img
                        src={img}
                        alt="Center"
                        className="w-full md:w-auto h-full object-cover rounded-2xl shadow-lg"
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
                    <div className="w-full h-[200px] bg-[#4A94D0]/10 rounded-3xl flex flex-col justify-center px-6 text-left text-xl space-y-2 p-2">

                        {/* Icon inside a circle */}
                        <div className="text-white p-3 rounded-full w-fit bg-gradient-to-b from-[#005BF0] to-[#63CCF6]">
                            <FaTags className="text-2xl" />
                        </div>

                        {/* Heading */}
                        <h3 className="text-secondary-blue font-semibold">Best Price Guarantee</h3>

                        {/* Description */}
                        <p className="text-sm sm:text-base text-secondary-blue/80">
                            Enjoy value with transparent pricing, exclusive deals, and no fees.                        </p>

                    </div>
                    <div className="w-full h-[200px] bg-[#4A94D0]/10 rounded-3xl flex flex-col justify-center px-6 text-left text-xl space-y-2 p-2">

                        {/* Icon inside a circle */}
                        <div className="text-white p-3 rounded-full w-fit bg-gradient-to-b from-[#005BF0] to-[#63CCF6]">
                            <MdOutlineFlightTakeoff className="text-2xl" />
                        </div>

                        {/* Heading */}
                        <h3 className=" text-secondary-blue font-semibold">Easy & Flexible Booking</h3>

                        {/* Description */}
                        <p className="text-sm sm:text-base text-secondary-blue/80">
                            Plan stress-free trips with easy booking and flexible options.
                        </p>

                    </div>
                </div>

            </div>
        </div >
    )
}

export default ChooseUs
