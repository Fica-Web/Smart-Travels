// FlightPage.jsx or FlightBooking.jsx
import React from 'react'
import BookingImageSection from '../../../reusable/BookingImageSection'
import AirportSelect from '../../../reusable/AirportSelect';
import CustomDatePicker from '../../../reusable/CustomDatePicker';
import "react-datepicker/dist/react-datepicker.css";
import Img from '../../../../assets/image/booking/flight/flight1.png'
import img1 from '../../../../assets/image/booking/flight/imageSection/FlightTakeoff.png'
import img2 from '../../../../assets/image/booking/flight/imageSection/FlightLand.png'
import img3 from '../../../../assets/image/booking/flight/imageSection/Date.png'

const ImageSection = () => {
  const today = new Date();
  const flightFields = [
    {
      label: "Flying From",
      placeholder: "Choose your location",
      icon: img1,
      name: "from",
      component: AirportSelect,
      props: {
        isSearchable: false,
      }
    },
    {
      label: "Destination",
      placeholder: "Choose your destination",
      icon: img2,
      name: "to",
      component: AirportSelect,
      props: {
        isSearchable: false,
      }
    },

    {
      label: "Date",
      placeholder: "Choose your dates",
      icon: img3,
      name: "date",
      component: CustomDatePicker, // use DatePicker as custom component
      props: {
        dateFormat: "yyyy-MM-dd",
        placeholderText: "Choose your dates",
        minDate: today,
        popperPlacement: "bottom-end",
         // 👈 calendar below input
        popperModifiers: [
          {
            name: "preventOverflow",
            options: {
              altAxis: true,
              tether: false,
            },
          },
        ],
        className: "outline-none border-none focus:ring-0 shadow-none text-sm text-secondary-blue",
      },

    },
  ];




  return (
    <BookingImageSection
      backgroundImage={Img}
      fields={flightFields}
      maxWidth="max-w-5xl"
      modalTitle="Apply for flight"
      serviceType="flight"
    />

  );
};

export default ImageSection;
