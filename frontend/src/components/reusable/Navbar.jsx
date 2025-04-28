import React from "react";
import { Rocket, User } from "lucide-react";
import logo from '../../assets/image/logo/logo.png'

const Header = () => {
  return (
    <header className="absolute top-6 left-1/2 transform -translate-x-1/2 w-[96%] max-w-8xl flex justify-between items-center backdrop-blur-md px-1">
      {/* Logo */}
      <div className="text-2xl font-bold whitespace-nowrap">
        <img src={logo} alt="" className="w-15 h-15" />
      </div>

      {/* Nav */}
      <nav className="hidden md:flex bg-white rounded-full px-6 py-2 shadow-sm space-x-8">
        {["Home", "Tour", "About Us", "Contact Us"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
            className="text-gray-700 font-medium hover:text-black transition"
          >
            {item}
          </a>
        ))}
      </nav>

      {/* Icons */}
      <div className="flex items-center space-x-4">
        <button className="p-3 bg-white rounded-full shadow hover:bg-gray-100">
          <Rocket size={20} className="text-black" />
        </button>
        <button className="p-3 bg-white rounded-full shadow hover:bg-gray-100">
          <User size={20} className="text-black" />
        </button>
      </div>
    </header>
  );
};

export default Header;
