import { useState } from 'react';
import visaData from '../../../data/visaData';
import ReusableModal from '../../reusable/ReusableModal';
import ContactForm from '../../reusable/ContactForm';

const VisaListing = () => {
    return (
        <div className="px-4 py-8">
            <h2 className="text-2xl font-bold mb-8 text-center pb-6">
                Trusted Visa Services for These Popular Destinations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {visaData.map((visa, index) => (
                    <VisaCard key={index} {...visa} />
                ))}
            </div>
        </div>
    );
};

const VisaCard = ({ country, flag, processingTime }) => {
    const [open, setOpen] = useState(false);

    const openModal = () => {
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);
    };
console.log('destination',country)
    return (
        <div className="border border-secondary-blue/70 rounded-2xl p-4 shadow-sm text-sm flex flex-col gap-2 text-secondary-blue">
            <div className="flex justify-between items-center">
                <img src={flag} alt={`${country} flag`} className="h-10" />
                <span className="text-xs bg-primary-blue/30 rounded px-4 py-1">E-Visa</span>
            </div>
            <div className="mt-1 font-semibold text-lg">{country}</div>
            <div>Tourist & Transit Visas</div>
            <div>Processing Time: {processingTime}</div>
            <div className="flex justify-end">
                <button
                    onClick={openModal}
                    className="mt-auto bg-primary-blue/90 hover:bg-primary-blue text-white px-6 py-2 rounded-lg self-start"
                >
                    Apply Now
                </button>
            </div>

            {/* Only one modal is kept, with the ContactForm */}
            <ReusableModal open={open} onClose={closeModal} title={`Apply for ${country} Visa`}>
                <ContactForm
                    buttonText="Apply Now"
                    defaultMessage={`${country} - Processing Time: ${processingTime}`}
                    showCountrySelect = {true}
                    countrySelectPlaceholder = "Select your nationality"
                    hideMessageField={true}
                    destination={{
                        serviceType: 'visa',
                        country: country,
                        
                    }}
                />
            </ReusableModal>
        </div>
    );
};

export default VisaListing;