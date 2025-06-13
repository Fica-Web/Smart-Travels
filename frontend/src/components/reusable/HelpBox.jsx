import React from 'react'
import { MdLocalPhone } from "react-icons/md";
import { MdEmail } from "react-icons/md";

const HelpBox = ({ settings ,paragraphtext='Our Destination expert will be happy to help you resolve your queries for this tour.'}) => {
    return (
        <div className='text-title-blue bg-light-blue gap-5 p-6 lg:p-5  rounded-3xl  lg:max-w-lg w-full text-secondary-blue '>
            <h1 className='text-xl font-bold text-secondary-blue '>Need help ?</h1>
            <p className="text-sm sm:text-base text-secondary-blue/80 text-justify pt-3 leading-snug sm:leading-relaxed line-clamp-2 lg:pr-7 ">
  {paragraphtext}
</p>

            <div className="flex items-center gap-2 mt-3 text-md text-secondary-blue">
                <div className="bg-secondary-blue  p-1 rounded-full text-white">
                    <MdLocalPhone size={16} />
                </div>
                <a
                    href="mailto:Info@rukntravels.com"
                    className="hover:text-[#005BF0] transition text-secondary-blue "
                >
                    {settings.contactNumber}
                </a>
            </div>
            <div className="flex items-center gap-2 mt-3 text-md text-secondary-blue">
                <div className="bg-secondary-blue  p-1 rounded-full text-white">
                    <MdEmail size={16} />
                </div>

                <a
                    href="mailto:Info@rukntravels.com"
                    className="hover:text-[#005BF0] transition text-secondary-blue "
                >
                    {settings.email}
                </a>
            </div>

        </div>
    )
}
export default HelpBox