import React from "react";
import hero from '../../assets/image/hero/woman-hand-holding-camera-standing-top-rock-nature-travel-concept (1).jpg'

const Hero = () => {
    return (
        <section className="w-full bg-[#f0f0f0] pb-16">
            <div className="container mx-auto flex flex-col items-center px-6">

                {/* Title, Description, and Button */}
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10 w-full md:w-4/5 mt-12 text-left">

                    {/* Left (Heading) */}
                    <div className="flex-1">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight text-gray-900">
                            Your Next <br /> Adventure Awaits
                        </h1>
                    </div>

                    {/* Right (Paragraph + Button) */}
                    <div className="flex-1 flex flex-col items-start">
                        <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6">
                            Explore stunning destinations, unique experiences, and unforgettable journeys with WayFarer.
                        </p>
                        <button className="px-6 py-3 bg-[#1d3557] text-white rounded-full text-base sm:text-lg hover:bg-[#16314d] transition-all duration-300">
                            Booking
                        </button>
                    </div>

                </div>

                {/* Hero Image */}
                <div className="mt-16 w-full rounded-3xl overflow-hidden">
                    <img
                        src={hero}
                        alt="Mountains"
                        className="w-full object-cover h-[300px] sm:h-[400px] md:h-[400px]"
                    />
                </div>

                {/* Search Card */}
                <div className="bg-white shadow-xl rounded-2xl p-6 flex flex-wrap justify-between items-center gap-6 mt-[-50px] relative z-10 w-11/12 md:w-4/5">
                    {[
                        { label: "Location", value: "Rinjani, Indonesia" },
                        { label: "Check In", value: "27, January 2025" },
                        { label: "Check Out", value: "30, January 2025" },
                        { label: "People", value: "4 People, 1 Child" },
                    ].map((item, index) => (
                        <div key={index} className="flex flex-col items-start w-full sm:w-auto">
                            <span className="text-gray-400 text-sm">{item.label}</span>
                            <span className="text-gray-800 font-semibold">{item.value}</span>
                        </div>
                    ))}

                    {/* Search Icon */}
                    <button className="bg-[#1d3557] p-4 rounded-full hover:bg-[#16314d] transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>

            </div>
        </section>
    );
};

export default Hero;
