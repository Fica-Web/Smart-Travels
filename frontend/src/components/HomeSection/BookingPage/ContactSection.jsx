import React,{ useState, useEffect } from 'react';
import { getSettings } from '../../../services/api/settingsApi';
import ContactForm from '../../reusable/ContactForm'
import HelpBox from '../../reusable/HelpBox';



const ContactSection = ({ destination }) => {
    const [settings, setSettings] = useState({
        email: '',
        contactNumber: '',
        location: '',
        instagram: '',
        facebook: '',
        tiktok: ''
    });
    
     const destinationData = {
        serviceType: 'destination',
        destination: destination,
    };

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
        <div className='flex flex-col justify-between gap-8 pt-5 md:pt-7' >
            <ContactForm
                title="Send a Query"
                buttonText="Send Query"
                messageFieldName="location"
                messageLabel="Location"
                messagePlaceholder="Enter your location"
                destination={destinationData}
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





