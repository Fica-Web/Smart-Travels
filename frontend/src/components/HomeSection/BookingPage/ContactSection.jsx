import React from 'react'
import ContactForm from '../../reusable/ContactForm'
import { MdLocalPhone } from "react-icons/md";
import { MdEmail } from "react-icons/md";

const ContactSection = () => {
    return (
        <div className='flex flex-col gap-4 pt-5 md:pt-7' >
            <ContactForm
                title="Send a Query"
                buttonText="Send Query"
                messageFieldName="location"
                messageLabel="Location"
                messagePlaceholder="Enter your preferred location"
            />
            <HelpBox />

        </div>
    )
}

export default ContactSection




export const HelpBox = () => {
    return (
        <div className='text-title-blue bg-light-blue gap-5 p-6 lg:p-10 rounded-3xl shadow-md lg:max-w-lg w-full'>
            <h1 className='text-xl font-bold'>Need help ?</h1>
            <p className='text-sm sm:text-base text-secondary-blue/80 max-w-1xl text-justify pt-3'>Our Destination expert will be happy to help you resolve your queries for this tour.</p>
            <div className="flex items-center gap-2 mt-3 text-md text-secondary-blue">
                <MdEmail size={20} />
                <a
                    href="mailto:Info@rukntravels.com"
                    className="hover:text-[#005BF0] transition"
                >
                    Info@rukntravels.com
                </a>
            </div>
            <div className="flex items-center gap-2 mt-3 text-md text-secondary-blue">
                <MdLocalPhone size={20} />
                <a
                    href="mailto:Info@rukntravels.com"
                    className="hover:text-[#005BF0] transition"
                >
                    +971 52 741 8272
                </a>
            </div>
        </div>
    )
}
