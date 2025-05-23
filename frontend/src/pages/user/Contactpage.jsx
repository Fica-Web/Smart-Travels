import ReusableHero from '../../components/reusable/ReusableHero';
import contactBg from '../../assets/image/hero/contactHero.jpg';
import ContactDetails from '../../components/HomeSection/ContactPage/ContactDetails';
import ContactForm from '../../components/HomeSection/ContactPage/ContactForm';

const ContactPage = () => {
    return (
        <div>
            <ReusableHero
                title='Get in Touch with Us'
                bgImage={contactBg}
            />
            <div className='flex flex-col lg:flex-row justify-center items-center gap-10 lg:gap-20 md:px-20 px-5 py-20'>
                <div className='w-full lg:w-1/2'>
                    <ContactDetails />
                </div>
                <div className='w-full lg:w-1/2 flex justify-end'>
                    <ContactForm />
                </div>
            </div>
        </div>
    )
}

export default ContactPage