import React from "react";
import hero from '../../../assets/image/hero/heroImage.jpg';

const Hero = () => {
    return (
        <section className="w-full h-screen bg-cover bg-center relative" style={{ backgroundImage: `url(${hero})` }}>
            <div className="flex justify-center items-center w-full h-full">
                <div className="flex flex-col ">
                    <h2 className="text-center text-white leading-none">
                        <span className="uppercase md:text-2xl text-xl md:tracking-[10px] tracking-[3px]">Discover Your Next</span><br />
                        <span className="text-[20vw] md:text-[16vw] font-coastal-clean tracking-wide ">Adventure</span>
                    </h2>
                </div>
            </div>
        </section>
    );
};

export default Hero;