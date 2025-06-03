// FlightPage.jsx or FlightBooking.jsx
import React from 'react'
import BookingImageSection from '../../../reusable/BookingImageSection'
import Img from '../../../../assets/image/booking/flight/flight1.png'
import img1 from '../../../../assets/image/booking/flight/imageSection/FlightTakeoff.png'
import img2 from '../../../../assets/image/booking/flight/imageSection/FlightLand.png'
import img3 from '../../../../assets/image/booking/flight/imageSection/Date.png'

const ImageSection = () => {
  const flightFields = [
    { label: "Flying From", placeholder: "Choose your location", icon: img1, type: "text", name: "from" },
    { label: "Destination", placeholder: "Choose your destination", icon: img2, type: "text", name: "to" },
    { label: "Date", placeholder: "Choose your dates", icon: img3, type: "date", name: "date" },
  ];

  

  return (
    <BookingImageSection
      backgroundImage={Img}
      fields={flightFields}
      maxWidth="max-w-5xl"
    />
  );
};

export default ImageSection;
