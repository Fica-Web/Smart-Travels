import React from 'react';
import { useState ,useEffect} from 'react';
import { getSettings } from '../../../services/api/settingsApi';
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { toast } from 'react-toastify';



const ContactDetails = () => {
  const [settings, setSettings] = useState([]); // ✅ must be an array

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await getSettings();
        const data = res.data.data;

        const contactItems = [
          {
            title: 'Phone Number',
            description: data.contactNumber,
            icon: FaPhone
          },
          {
            title: 'Email',
            description: data.email,
            icon: IoMdMail
          },
          {
            title: 'Address',
            description: data.location,
            icon: FaLocationDot
          }
        ];

        setSettings(contactItems);
      } catch (err) {
        toast.error('Failed to load settings');
      }
    };

    fetchSettings();
  }, []);



    return (
        <div className='flex flex-col gap-5 text-secondary-blue'>
            <h2 className='text-4xl font-semibold'>
                We’d Love to Hear from You
            </h2>
            <p>
                Whether you need assistance or have a query, we’re just a message or call away. Our team is committed to providing you with the best support.
            </p>
      <div className='flex flex-col gap-4 w-fit'>
    {settings.map((item, index) => (
      <ContactBox
        key={index}
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
        <div className='flex gap-3 py-3 items-center border-b-[0.2px] border-secondary-blue/80 last:border-b-0 w-full'>
            <div className='bg-secondary-blue p-3 rounded-full'>
                <Icon className='text-xl text-white' />
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