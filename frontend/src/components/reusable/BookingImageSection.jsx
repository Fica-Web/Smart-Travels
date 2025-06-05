// BookingImageSection.jsx
import React from 'react'
import BottomOverlayBox from '../../components/reusable/BottomOverlayBox'

const BookingImageSection = ({ backgroundImage, fields, maxWidth, modalTitle,serviceType}) => {
  return (
    <div className="relative w-full inline-block mt-10 overflow-hidden">
      {/* Background Image */}
      <img src={backgroundImage} alt="" className="w-full h-auto rounded-3xl" />

      {/* Bottom Overlay Form */}
      <BottomOverlayBox
        
        fields={fields}
        maxWidth={maxWidth}
        modalTitle={modalTitle}
  serviceType={serviceType}
          
      />
    </div>
  );
};

export default BookingImageSection;
