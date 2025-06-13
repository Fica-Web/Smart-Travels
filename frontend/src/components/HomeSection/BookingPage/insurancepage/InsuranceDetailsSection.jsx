import React from 'react';
import HelpBox from '../../../reusable/HelpBox';
import ContactForm from '../../../reusable/ContactForm';
import { useState, useEffect } from 'react';
import { getSettings } from '../../../../services/api/settingsApi';

const InsuranceDetailsSection = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start gap-7 lg:gap-3 pt-2 md:pt-5 lg:px-10">
      <LeftDetails />
      <ContactForm 
  messageFieldName="policyType"
  messageLabel="Policy Type"
  messagePlaceholder="Enter your policy type"
  defaultMessage=""
  isInputInsteadOfTextarea={true}
  buttonText="Send Query"
       destination={{
                        serviceType: 'insurance',
                    }}
  
/>

    </div>
  );
};

export default InsuranceDetailsSection;





export const LeftDetails = () => {
  const [settings, setSettings] = useState({
    email: '',
    contactNumber: '',
    location: '',
    instagram: '',
    facebook: '',
    tiktok: '',
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await getSettings();
        setSettings(res.data.data);
      } catch (err) {
        console.log('Failed to load settings');
      }
    };
    fetchSettings();
  }, []);

  return (
    <div className="max-w-xl flex flex-col justify-center items-start gap-5  lg:mt-9">
      <div className=" ">
        <h2 className="text-3xl md:text-[40px] font-bold text-secondary-blue max-w-lg ">
          Travel with Confidence – We've Got You Covered
        </h2>
        <p className="text-lg sm:text-base text-secondary-blue/80 max-w-2xl text-justify pt-3 pb-3 ">
Unexpected events can disrupt even the best travel plans. With Rukn Travels’ Travel Insurance, enjoy peace of mind knowing you're protected every step of the way.        </p>
      </div>
      <div>
        <HelpBox
        settings={settings}
        paragraphtext="Our insurance expert will be happy to help you resolve your queries."
      />
      </div>
      
    </div>
  );
};
