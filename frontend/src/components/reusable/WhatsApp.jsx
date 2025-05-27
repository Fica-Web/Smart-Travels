import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const Whatsapp = () => {
  return (
    <div className="fixed bottom-8 right-6 z-50">
      <a
        href="https://wa.me/+971527418272"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 text-white rounded-full w-20 h-20 flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
      >
        <FaWhatsapp className="text-4xl" />
      </a>
    </div>
  );
};

export default Whatsapp;
