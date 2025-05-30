import React from 'react'
import { useState } from 'react';
import Img from '../../../../assets/image/booking/flight/flight1.png'
import img1 from '../../../../assets/image/booking/flight/imageSection/FlightTakeoff.png'
import img2 from '../../../../assets/image/booking/flight/imageSection/FlightLand.png'
import img3 from '../../../../assets/image/booking/flight/imageSection/Date.png'


const ImageSection = () => {
  const handleQuerySubmit = ({ formData }) => {
    console.log("Received from child:", formData);

  };

  return (
    <div className="relative w-full inline-block mt-10 overflow-hidden ">
      {/* Image */}
      <img src={Img} alt="" className="w-full h-auto rounded-3xl " />

      {/* Top-left text (inside image) */}
      {/* <div className="absolute top-30 left-10 max-w-xs text-secondary-blue font-extrabold text-[48px] leading-[60px] tracking-[0.02em] capitalize z-10">
  Are you ready for take off
</div> */}
      {/* Bottom box inside image */}
      <BottomOverlayBox onSubmit={handleQuerySubmit} />
    </div>

  )
}

export default ImageSection




// Example fields array — customize as needed
const fields = [
  { label: "Flying From", placeholder: "Choose your location", icon: img1, type: "text", name: "from" },
  { label: "Destination", placeholder: "Choose your destination", icon: img2, type: "text", name: "to" },
  { label: "Date", placeholder: "Choose your dates", icon: img3, type: "date", name: "date" },
];

const BottomOverlayBox = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);

    if (onSubmit) {
      onSubmit(formData); // ✅ pass data to parent
    }

    // Clear the form
    setFormData({
      from: '',
      to: '',
      date: '',
    });
  };




  return (
    <div className="absolute md:bottom-8 left-1/2 -translate-x-1/2 md:bg-white/30 border md:border-white/20 md:backdrop-blur-[20px] md:shadow-[inset_0px_2px_6px_0px_#0000001A] py-4 rounded-2xl z-10 w-full max-w-5xl flex flex-wrap justify-center items-center md:gap-20">
      {fields.map(({ label, placeholder, icon, type, name }) => (
        <div
          key={name}
          className="flex items-center gap-0 w-full sm:w-[180px] rounded-xl"
        >
          {/* Icon */}
          <div className="min-w-[44px] h-[44px] flex items-center justify-center rounded-full bg-[#4A94D0]">
            <img src={icon} alt={label} className="w-6 h-6 object-contain" />
          </div>

          {/* Label and Input */}
          <div className="flex flex-col w-full px-2 text-left">
            <label className="text-sm text-secondary-blue">{label}</label>
            <input
              type={type}
              placeholder={placeholder}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="text-sm  bg-transparent outline-none placeholder:text-secondary-blue text-secondary-blue"
            />
          </div>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="bg-[#4A94D0] text-white font-semibold px-9 py-2 rounded-md hover:bg-[#3B7DB1] transition w-full sm:w-auto"
      >
        Send Query
      </button>
    </div>
  );
};





