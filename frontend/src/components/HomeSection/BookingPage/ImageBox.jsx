import React, { useState } from 'react';
import img from '../../../assets/image/booking/visa/visa.png';
import ReusableModal from '../../reusable/ReusableModal';
import ContactForm from '../../reusable/ContactForm';

const ImageBox = () => {
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const handleFormSuccess = () => {
    setOpen(false); // ✅ Closes modal after successful submit
  };

  // Box content as a reusable JSX block
  const BoxContent = () => (
    <div
      className="p-2  md:p-7 px-1 md:px-15
        max-w-full sm:max-w-[400px]
        rounded-[20px] border border-white/25 sm:bg-[#4A94D0]/20 md:bg-white/25 backdrop-blur-3xl shadow-inner
        text-white bg-[#4A94D0]/20 "
    >
      <p className="text-sm sm:text-base text-secondary-blue pb-2 sm:pb-4 text-center">
        Choose your visa type, duration,<br /> and destination - all in one place
      </p>

      <div className="flex justify-center">
        <button
          onClick={openModal}
          className="w-auto md:w-[153px] px-4 py-2 rounded-md cursor-pointer text-white transition duration-200 bg-[#2e6bbf] hover:bg-[#4a94d0]"
        >
          Apply Now
        </button>
        <ReusableModal open={open} onClose={closeModal} title="Apply for Visa">
          <ContactForm
            buttonText="Apply Now"
            showCountrySelect={true}
            showLocationSelect={true}
            hideMessageField={true}
            destination={{ serviceType: 'visa' }}
            onSuccess={handleFormSuccess}
          />
        </ReusableModal>
      </div>
    </div>
  );

  return (
    <div className="relative w-full inline-block mt-3 md:mt-10">
      {/* Image */}
      <img src={img} alt="" className="w-full h-auto rounded-2xl" />

      {/* Show below image on mobile */}
      <div className="block sm:hidden mt-4">
        <BoxContent />
      </div>

      {/* Show over image (bottom-right) on sm and above */}
      <div
        className="hidden sm:block absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-13 md:right-15"
      >
        <BoxContent />
      </div>
    </div>
  );
};

export default ImageBox;
