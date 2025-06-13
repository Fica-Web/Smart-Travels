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
      className="p-4 md:p-7 px-2 md:px-15 max-w-full w-[250px] md:w-auto 
      
        rounded-[20px] border border-white/25  bg-white/25 backdrop-blur-7xl shadow-inner
        text-white "
    >
      <p className="text-sm sm:text-base text-secondary-blue pb-2 sm:pb-4 text-center">
        Choose your visa type, duration,<br /> and destination - all in one place
      </p>

      <div className="flex justify-center">
        <button
          onClick={openModal}
          className="w-[95px] md:w-[153px] px-2 md:px-4 py-1 md:py-2 rounded-md cursor-pointer text-white transition duration-200 bg-[#2e6bbf] hover:bg-[#4a94d0]"
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
    <div className="relative w-full inline-block mt-10">
      {/* Image */}
      <img
        src={img}
        alt=""
        className="w-full h-[370px] sm:h-[420px] md:h-auto rounded-3xl object-cover"
      />

      {/* BoxContent over image on all screens */}
      <div className="absolute bottom-9 right-4  md:bottom-13 md:right-15">
        <BoxContent />
      </div>
    </div>
  );
};

export default ImageBox;
