import React, { useState, useRef } from 'react';
import ContactForm from './ContactForm';
import ReusableModal from '../../components/reusable/ReusableModal';

const BottomOverlayBox = ({ fields, maxWidth, serviceType, modalTitle }) => {
  const [open, setOpen] = useState(false);
  const inputRefs = useRef({});

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

 const getInitialFormData = () =>
  fields.reduce((acc, field) => {
    if (field.name) {
      acc[field.name] = '';
    }
    return acc;
  }, {});


const [formData, setFormData] = useState(getInitialFormData());


  const handleIconClick = (name) => {
    const ref = inputRefs.current[name];

    if (!ref) return;

    // Handle react-select (CountrySelect) and native input
    if (typeof ref.focus === 'function') {
      ref.focus();
    }
    // Handle react-datepicker
    else if (ref.input && typeof ref.input.focus === 'function') {
      ref.input.focus();
    }
  };

  // Add this function inside BottomOverlayBox
const handleFormSuccess = () => {
  setFormData(getInitialFormData());    // ✅ reset values
  inputRefs.current = {};               // ✅ optional: reset refs
  setOpen(false);                       // ✅ close modal
};
  



  const getDestinationData = () => {
    let key = '';
    let destination = {};

    switch (serviceType) {
      case 'flight':
        key = 'flightDetails';
        destination = {
          from: formData.from || '',
          to: formData.to || '',
          departureDate: formData.date || '',
        };
        break;

      case 'hotel':
        key = 'hotelDetails';
        destination = {
          country: formData.country || '',
          location: formData.location || '',
          checkInDate: formData.checkIn || '',
          checkOutDate: formData.checkOut || '',
        };
        break;

      default:
        break;
    }

    return {
      serviceType,
      [key]: destination,
    };
  };

  return (
    <div
      className={`w-full ${maxWidth ?? 'md:max-w-2xl lg:max-w-5xl'} 
        grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 md:items-center md:justify-items-center lg:flex 
        justify-center items-center gap-4 md:gap-x-4 md:gap-y-3 lg:gap-4 
        py-4 md:py-2 lg:py-4 rounded-2xl z-10 
        md:absolute md:bottom-1 lg:bottom-15 md:left-1/2 md:-translate-x-1/2 
        md:bg-white/30 md:border md:border-white/20 md:backdrop-blur-[20px] md:shadow-[inset_0px_2px_6px_0px_#0000001A] 
        bg-white`}
    >
     {fields.map((field, index) => {
  const { label, placeholder, icon, type, name, component: Component, props = {} } = field;
  const passedProps = typeof props === 'function' ? props(formData) : props;
  const value = formData[name];

  const handleChange = (newValue) => {
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

const refCallback = (name) => (el) => {
  inputRefs.current[name] = el;
};


  return (
    <div
      key={name || index}
      onClick={() => handleIconClick(name)}
      className={`cursor-pointer flex items-center gap-2 lg:gap-1 min-w-[220px] w-full sm:w-[220px] 
        ${index === 2 ? 'md:col-start-1' : ''} 
        rounded-xl`}
    >
      <div
        onClick={() => handleIconClick(name)}
        className="cursor-pointer min-w-[44px] min-h-[44px] md:min-w-[40px] md:min-h-[40px] lg:min-w-[44px] lg:min-h-[44px] flex items-center justify-center rounded-full bg-[#4A94D0]"
      >
        <img src={icon} alt={label} className="w-6 h-6 object-contain" />
      </div>

      <div className="cursor-pointer flex flex-col w-full px-1 lg:px-2 text-left">
        <label className="cursor-pointer text-sm text-secondary-blue">{label}</label>

        {Component ? (
          <Component
          key={value || ''}
            {...passedProps}
            value={value}
            selected={value}
            onChange={handleChange}
            placeholder={field.placeholder}
            name={name}
            ref={refCallback(name)} 
          />
        ) : (
          <input
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            // className=" cursor-pointer text-sm bg-transparent outline-none placeholder:text-secondary-blue/50 text-secondary-blue/50 autofill:bg-transparent"
            className="cursor-pointer text-sm bg-transparent outline-none text-secondary-blue placeholder:text-secondary-blue/50"

            style={{
              backgroundColor: 'transparent',
              WebkitBoxShadow: '0 0 0px 1000px transparent inset',
             WebkitTextFillColor: 'inherit', // ensures autofill text color remains
    transition: 'background-color 9999s ease-in-out 0s',
            }}
            ref={refCallback(name)}
          />
        )}
      </div>
    </div>
  );
})}


      <button
        onClick={openModal}
        className="bg-[#4A94D0] text-white font-semibold px-9 md:px-5 lg:px-9 py-2 rounded-xl hover:bg-[#3B7DB1] transition w-full md:w-[190px] lg:w-auto"
      >
        Send Query
      </button>

      <ReusableModal open={open} onClose={closeModal} title={modalTitle}>
        <ContactForm
          buttonText="Send Query"
          showCountrySelect={true}
          countrySelectPlaceholder="Select your nationality"
          hideMessageField={true}
          destination={getDestinationData()}
          onSuccess={handleFormSuccess}
        />
      </ReusableModal>
    </div>
  );
};

export default BottomOverlayBox;
