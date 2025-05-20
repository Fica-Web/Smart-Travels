import React from "react";
import hero from '../../../assets/image/hero/heroImage 1.jpg';
import img from '../../../assets/image/hero/hr.jpg'; // Image behind the text

const Hero = () => {
    return (
        <section
            className="w-full h-screen bg-cover bg-center relative overflow-hidden"
            style={{ backgroundImage: `url(${hero})` }}
        >
            {/* Decorative Image Behind Text */}
            <img
                src={img}
                alt="Decorative Layer"
                className="absolute top-0 left-0 w-full object-cover z-30"
                style={{ height: '100vh' }} // Adjust height as needed
            />

            {/* Text on top */}
            <div className="absolute inset-0 z-20 flex justify-center items-center">
                <div className="flex flex-col">
                    <h2 className="text-center text-white leading-none">
                        <span className="uppercase md:text-2xl text-xl md:tracking-[10px] tracking-[3px]">
                            Discover Your Next
                        </span>
                        <br />
                        <span className="text-[20vw] md:text-[16vw] font-coastal-clean tracking-wide z-0">
                            Adventure
                        </span>
                    </h2>
                </div>
            </div>
        </section>
    );
};

export default Hero;
