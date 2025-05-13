import React from 'react';
import { Link } from 'react-router-dom';
import navOptions from '../../data/navOptions';
import logo from '../../assets/image/logo/logo.png';
import { AiOutlineCopyright } from "react-icons/ai";

const Footer = () => {
  return (
<footer className="relative w-full text-white py-12 px-6 sm:px-12 bg-black">
      {/* Top Section */}
      <div className="pb-12 border-b border-gray-700 flex flex-col md:flex-row justify-between gap-8">
        {/* Left Section */}
        <div className="md:w-1/2 space-y-4">
          <img src={logo} alt="Logo" className="h-14 w-auto" />
          <p className="text-white font-semibold text-sm">
            Discover the best destinations, tips, and experiences with us.
          </p>
        </div>

        {/* Right Section */}
        <div className="flex flex-wrap gap-8 md:w-1/2 justify-between">
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              {navOptions.map((item, index) => (
                <li key={index}>
                  <Link to={item.path} className="hover:text-white transition">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-semibold mb-3">Destinations</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="" className="hover:text-white transition">Paris</Link></li>
              <li><Link to="" className="hover:text-white transition">fchgvh</Link></li>
              <li><Link to="" className="hover:text-white transition">bnmnkml</Link></li>
              <li><Link to="" className="hover:text-white transition">New York</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="" className="hover:text-white transition">Help Center</Link></li>
              <li><Link to="" className="hover:text-white transition">Contact Us</Link></li>
              <li><Link to="" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link to="" className="hover:text-white transition">FAQ</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 space-y-8">
        {/* Copyright */}
        <div className="flex justify-center items-center text-sm text-white">
          <p className="flex items-center flex-wrap justify-center gap-1 text-center">
            Copyright <AiOutlineCopyright className="text-amber-50" /> 2025
            <span>
              <Link
                to="https://www.ficaads.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition mx-1"
              >
                ficaads
              </Link>
            </span>
            , All Rights Reserved
          </p>
        </div>

        {/* Adventure Text */}
        {/* <div className="relative h-[150px] sm:h-[180px] md:h-[200px]">
          <span className="absolute bottom-0 inset-x-0 text-center text-[20vw] sm:text-[14vw] md:text-[10vw] font-coastal-clean tracking-wide text-amber-100 opacity-10 leading-none select-none pointer-events-none">
            Adventure
          </span>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
