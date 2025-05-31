
import React from 'react'
import BookingImageSection from '../../../reusable/BookingImageSection'
import Img from '../../../../assets/image/booking/hotel/hotel.png'
import img1 from '../../../../assets/image/booking/hotel/imagesection/flag.png'
import img2 from '../../../../assets/image/booking/hotel/imagesection/location.png'
import img3 from '../../../../assets/image/booking/flight/imageSection/Date.png'

const ImageSection = () => {
 const hotelFields = [
  { label: "Country", placeholder: "Choose country", icon: img1, type: "text", name: "country" },
  { label: "Location", placeholder: "Enter your location", icon: img2, type: "text", name: "location" },
  { label: "Check In", placeholder: "Choose your date", icon: img3, type: "date", name: "checkIn" },
  { label: "Check Out", placeholder: "Choose your date", icon: img3, type: "date", name: "checkOut" },
];


  const handleQuerySubmit = ({ formData }) => {
    console.log("hotel form data:", formData);
  };

  return (
    <BookingImageSection
      backgroundImage={Img}
      fields={hotelFields}
      onSubmit={handleQuerySubmit}
      maxWidth="max-w-6xl"
    />
  );
};

export default ImageSection;
