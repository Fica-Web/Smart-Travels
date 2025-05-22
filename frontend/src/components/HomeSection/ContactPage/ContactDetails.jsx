import React from 'react';
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";

const contactData = [
    {
        icon: FaPhone,
        title: 'Phone Number',
        description: '+971 52 741 8272',
    },
    {
        icon: IoMdMail,
        title: 'Email Address',
        description: 'Info@rukntravels.com'
    },
    {
        icon: FaLocationDot,
        title: 'Address',
        description: 'Opp Al FUTTIM MASJID Al MURARA, DEIRA, Dubai - UAE'
    }
];

const ContactDetails = () => {
    return (
        <div className='flex flex-col gap-5 text-secondary-blue'>
            <h2 className='text-4xl font-semibold'>
                We’d Love to Hear from You
            </h2>
            <p>
                Whether you need assistance or have a query, we’re just a message or call away. Our team is committed to providing you with the best support.
            </p>
            <div className='flex flex-col gap-4 w-fit'>
                {contactData.map((item, index) => (
                    <ContactBox
                        key={item.title}
                        icon={item.icon}
                        title={item.title}
                        description={item.description}
                    />
                ))}
            </div>
        </div>
    );
};

export default ContactDetails;

const ContactBox = ({ icon: Icon, title, description }) => {
    return (
        <div className='flex gap-3 py-3 items-center border-b border-secondary-blue last:border-b-0 w-full'>
            <div className='bg-secondary-blue p-3 rounded-full'>
                <Icon className='text-2xl text-white' />
            </div>
            <div>
                <h4 className='text-xl font-semibold'>
                    {title}
                </h4>
                <p>
                    {description}
                </p>
            </div>
        </div>
    );
};