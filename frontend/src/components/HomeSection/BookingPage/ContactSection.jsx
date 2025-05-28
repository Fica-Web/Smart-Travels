import React from 'react'
import { useState, useEffect } from 'react';
import { getSettings } from '../../../services/api/settingsApi';
import ContactForm from '../../reusable/ContactForm'
import { MdLocalPhone } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { toast } from 'react-toastify';



const ContactSection = ({ destination }) => {
    const [settings, setSettings] = useState({
        email: '',
        contactNumber: '',
        location: '',
        instagram: '',
        facebook: '',
        tiktok: ''
    });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await getSettings();
                setSettings(res.data.data);

            } catch (err) {
                toast.error('Failed to load settings');
            }
        };
        fetchSettings();
    }, []);
    return (
        <div className='flex flex-col justify-between gap-8 pt-5 md:pt-7' >
            <ContactForm
                title="Send a Query"
                buttonText="Send Query"
                messageFieldName="location"
                messageLabel="Location"
                messagePlaceholder="Enter your location"
                destination={destination}
            />
            <HelpBox settings={settings} />

        </div>
        //         <div className='flex flex-col justify-between gap-8 pt-5 md:pt-7 h-full'>
        //   <ContactForm
        //     title="Send a Query"
        //     buttonText="Send Query"
        //     messageFieldName="location"
        //     messageLabel="Location"
        //     messagePlaceholder="Enter your preferred location"
        //   />
        //   <HelpBox />
        // </div>

    )
}

export default ContactSection




export const HelpBox = ({ settings }) => {
    return (
        <div className='text-title-blue bg-light-blue gap-5 p-6 lg:p-10 rounded-3xl shadow-md lg:max-w-lg w-full'>
            <h1 className='text-xl font-bold'>Need help ?</h1>
            <p className='text-sm sm:text-base text-secondary-blue/80 max-w-1xl text-justify pt-3'>Our Destination expert will be happy to help you resolve your queries for this tour.</p>
            <div className="flex items-center gap-2 mt-3 text-md text-secondary-blue">
                <div className="bg-black p-1 rounded-full text-white">
                    <MdLocalPhone size={16} />
                </div>
                <a
                    href="mailto:Info@rukntravels.com"
                    className="hover:text-[#005BF0] transition"
                >
                    {settings.contactNumber}
                </a>
            </div>
            <div className="flex items-center gap-2 mt-3 text-md text-secondary-blue">
                <div className="bg-black p-1 rounded-full text-white">
                    <MdEmail size={16} />
                </div>

                <a
                    href="mailto:Info@rukntravels.com"
                    className="hover:text-[#005BF0] transition"
                >
                    {settings.email}
                </a>
            </div>

        </div>
    )
}
