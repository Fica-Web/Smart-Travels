import React, { useState } from 'react';
import { FaPhoneAlt } from "react-icons/fa";
import logo from '../../assets/image/logo/logo.png'

const Navbar = () => {
    const [active, setActive] = useState('Home');
    const navItems = ['Home', 'About', 'Tours'];

    const phoneNumber = "+1234567890"; // Your phone number here

    const handlePhoneClick = () => {

        if (navigator.clipboard) {
            navigator.clipboard.writeText(phoneNumber).then(() => {
                alert('Phone number copied to clipboard!');
            });
        }
        window.location.href = `tel:${phoneNumber}`;
    };

    return (
        <nav className="absolute top-0 left-0 w-full flex items-center py-8 px-8 bg-transparent z-50">
            {/* Logo */}
            <div className="">
                <img src={logo} alt="Logo" className="w-25 h-25 object-contain" />
            </div>

            {/* Navigation Menu */}
            <div className="flex gap-8 ml-auto pr-6">
                {navItems.map((item) => (
                    <button
                        key={item}
                        onClick={() => setActive(item)}
                        className={`text-lg font-semibold ${active === item ? 'text-[#4a94cf]' : 'text-black'
                            } hover:text-[#4a94cf] transition-colors duration-300`}
                        style={{ fontFamily: 'inherit' }}
                    >
                        {item}
                    </button>
                ))}
            </div>


            <div
                onClick={handlePhoneClick}
                className="bg-[#4a94cf] text-white text-xl font-bold px-6 py-2 rounded-md cursor-pointer ml-4 flex items-center gap-2"
            >
                <FaPhoneAlt className="text-amber-50" />
                <span className='pb-1'>{phoneNumber}</span>
            </div>
        </nav>
    );
};

export default Navbar;