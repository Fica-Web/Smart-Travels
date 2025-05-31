import React from 'react'
import { useState } from 'react';



const BottomOverlayBox = ({ onSubmit, fields }) => {
  const initialFormData = fields.reduce((acc, field) => {
    acc[field.name] = '';
    return acc;
  }, {});

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    onSubmit?.(formData);
    setFormData(initialFormData);
  };

  return (
    <div className="w-full md:max-w-2xl lg:max-w-5xl 
      grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 md:items-center md:justify-items-center lg:flex 
      justify-center items-center gap-4 md:gap-x-4 md:gap-y-3 lg:gap-4 
      py-4 md:py-2 lg:py-4 rounded-2xl z-10 
      md:absolute md:bottom-1 lg:bottom-10 md:left-1/2 md:-translate-x-1/2 
      md:bg-white/30 md:border md:border-white/20 md:backdrop-blur-[20px] md:shadow-[inset_0px_2px_6px_0px_#0000001A] 
      bg-white"
    >
      {fields.map(({ label, placeholder, icon, type, name }, index) => (
        <div
          key={name}
          className={`flex items-center gap-2  lg:gap-1 min-w-[220px] w-full sm:w-[220px] 
            ${index === 2 ? 'md:col-start-1' : ''} 
            rounded-xl`}
        >
          <div className="min-w-[44px] min-h-[44px] md:min-w-[40px] md:min-h-[40px] lg:min-w-[44px] lg:min-h-[44px] flex items-center justify-center rounded-full bg-[#4A94D0]">
            <img src={icon} alt={label} className="w-6 h-6 object-contain" />
          </div>

          <div className="flex flex-col w-full px-1 lg:px-2 text-left">
            <label className="text-sm text-secondary-blue">{label}</label>
            <input
              type={type}
              placeholder={placeholder}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="text-sm bg-transparent outline-none placeholder:text-secondary-blue text-secondary-blue"
            />
          </div>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="bg-[#4A94D0] text-white font-semibold px-9 md:px-5 lg:px-9 py-2 rounded-xl hover:bg-[#3B7DB1] transition w-full md:w-[190px] lg:w-auto"
      >
        Send Query
      </button>
    </div>
  );
};
export default BottomOverlayBox