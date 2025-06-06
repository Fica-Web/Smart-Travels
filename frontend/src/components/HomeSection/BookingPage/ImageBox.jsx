import React, { useState } from 'react'
import img from '../../../assets/image/booking/visa/visa.png'
import ReusableModal from '../../reusable/ReusableModal';
import ContactForm from '../../reusable/ContactForm';


const ImageBox = () => {
    const [open, setOpen] = useState(false);

    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);
    return (
        <div className="relative w-full inline-block mt-10 ">
            {/* Small box above */}
            <div className="absolute items-center md:p-7 md:px-14 md:bottom-8 md:right-19 rounded-[20px] border border-white/25 bg-white/25 backdrop-blur-3xl shadow-inner inset 0px 2px 6px 0px rgba(0, 0, 0, 0.1)
   text-title-blue text-white">
                <p className="text-md sm:text-base text-secondary-blue  pb-1 md:pb-4 text-center">
                    Choose your visa type, duration,<br /> and destination - all in one place
                </p>

                <div className="flex justify-center ">
                    <button
                        onClick={openModal}
                        className="w-auto md:w-[153px] px-4 py-2 rounded-md cursor-pointer text-white transition duration-200 bg-[#2e6bbf] hover:bg-[#4a94d0]">
                        Apply Now
                    </button>
                    <ReusableModal open={open} onClose={closeModal} title="Apply for Visa">
                        <ContactForm
                            buttonText="Apply Now"
                            showCountrySelect={true} // ✅ Only here!
                            showLocationSelect={true}
                            hideMessageField={true}
                             destination={{
                        serviceType: 'visa',
                    }}
                        />
                    </ReusableModal>

                </div>
            </div>


            {/* Image */}
            <img src={img} alt="" className="w-full h-auto" />
        </div>

    )
}

export default ImageBox