import React from 'react';
import ReusableHero from '../../components/reusable/ReusableHero';
import contactBg from '../../assets/image/hero/contact.jpg';
import ContactDetails from '../../components/HomeSection/ContactPage/ContactDetails';
import ContactForm from '../../components/HomeSection/ContactPage/ContactForm';

const ContactPage = () => {
    return (
        <div>
            <ReusableHero
                title='Get in Touch with Us'
                bgImage={contactBg}
            />
            <div className='flex flex-col md:flex-row justify-center items-center gap-10 md:gap-20 md:px-20 px-5 py-20'>
                <div className='w-full md:w-1/2'>
                    <ContactDetails />
                </div>
                <div className='w-full md:w-1/2 '>
                    <ContactForm />
                </div>
            </div>
        </div>
    )
}

export default ContactPage
