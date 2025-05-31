import React from 'react'
import Img from '../../../../assets/image/booking/flight/flight1.png'
import img1 from '../../../../assets/image/booking/flight/imageSection/FlightTakeoff.png'
import img2 from '../../../../assets/image/booking/flight/imageSection/FlightLand.png'
import img3 from '../../../../assets/image/booking/flight/imageSection/Date.png'
import BottomOverlayBox from '../../../reusable/BottomOverlayBox'


const ImageSection = () => {
  const handleQuerySubmit = ({ formData }) => {
    console.log("Received from child:", formData);

  };

  const flightFields = [
  { label: "Flying From", placeholder: "Choose your location", icon: img1, type: "text", name: "from" },
  { label: "Destination", placeholder: "Choose your destination", icon: img2, type: "text", name: "to" },
  { label: "Date", placeholder: "Choose your dates", icon: img3, type: "date", name: "date" },
];

  return (
    <div className="relative w-full inline-block mt-10 overflow-hidden">
      {/* Image */}
      <img src={Img} alt="" className="w-full h-auto rounded-3xl " />

      {/* Top-left text (inside image) */}
      {/* <div className="absolute top-30 left-10 max-w-xs text-secondary-blue font-extrabold text-[48px] leading-[60px] tracking-[0.02em] capitalize z-10">
  Are you ready for take off
</div> */}
      {/* Bottom box inside image */}
  <BottomOverlayBox
        onSubmit={handleQuerySubmit}
        fields={flightFields}
      />
    </div>

  )
}

export default ImageSection




// Example fields array — customize as needed








