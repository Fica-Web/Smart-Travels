import React from 'react'
import BookingImageSection from '../../../reusable/BookingImageSection'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Img from '../../../../assets/image/booking/hotel/hotel.png'
import img1 from '../../../../assets/image/booking/hotel/imagesection/flag.png'
import img2 from '../../../../assets/image/booking/hotel/imagesection/location.png'
import img3 from '../../../../assets/image/booking/flight/imageSection/Date.png'
import CountrySelect from '../../../reusable/CountrySelect'
import { ClassNames } from '@emotion/react'


const ImageSection = () => {
  const today = new Date();

  const hotelFields = [
    {

      component: CountrySelect,
      name: "country",
      
      props: {
        variant: "hotel",
        placeholder: "Choose country",
        label: "Country",
        name: "country", // optional but useful
        noBorder: true,
        isHotel: true,
      },
      icon: img1,
    },
    {
      label: "Location",
      placeholder: "Enter your location",
      icon: img2,
      type: "text",
      name: "location",
      className: "bg-transparent outline-none border-none focus:ring-0 shadow-none text-sm text-secondary-blue",
      
    },
    {
      label: "Check In",
      placeholder: "Choose your date",
      icon: img3,
      type: "date",
      name: "checkIn",
      component: DatePicker, // use DatePicker as custom component
      props: {
        dateFormat: "yyyy-MM-dd",
        placeholderText: "Choose your dates",
        minDate: today,
        className: "bg-transparent outline-none border-none focus:ring-0 shadow-none text-sm text-secondary-blue",
      },
    },
    {
      label: "Check Out",
      placeholder: "Choose your date",
      icon: img3,
      type: "date",
      name: "checkOut",
      component: DatePicker, // use DatePicker as custom component
     props: (formData) => ({
      dateFormat: "yyyy-MM-dd",
      placeholderText: "Choose your dates",
      minDate: formData.checkIn ? new Date(formData.checkIn) : today,
      className: "bg-transparent outline-none border-none focus:ring-0 shadow-none text-sm text-secondary-blue",
    }),
    },
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
      modalTitle="Apply for hotel"
      serviceType="hotel"

    />
  );
};

export default ImageSection;
