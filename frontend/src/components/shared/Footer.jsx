import React from 'react';
import { Link } from 'react-router-dom';
import navOptions from '../../data/navOptions';
import logo from '../../assets/image/logo/logo.png';
import { AiOutlineCopyright } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa";
import { SlSocialFacebook } from "react-icons/sl";
import { PiTiktokLogoLight } from "react-icons/pi";
import { MdLocalPhone } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";



const Footer = () => {
  return (
    <footer className="relative w-full h-auto  py-10 px-5 sm:px-20 bg-[#4A94D0]/40">

      {/* Top Section */}
      <div className="pb-5 md:pb-12 border-b border-gray-700 flex flex-col md:flex-row justify-items-center gap-10 md:gap-5 lg:gap-30  ">
        {/* Left Section */}
        <div className="space-y-3 md:space-y-6 ">
          <div className='space-y-1 md:space-y-2'>
            <img src={logo} alt="Logo" className="h-14 w-auto" />
            <p className="text-secondary-blue/80 font-semibold text-sm">
              Your trusted partner in exploring the world with curated travel experiences.
            </p>
          </div>
          <div className='flex justify-start items-center gap-6'>
            <div>
              <a
                href="https://www.instagram.com/your_username"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-8 h-8 bg-secondary-blue rounded-full text-white transform transition-transform duration-300 hover:scale-110"
              >
                <FaInstagram size={20} />
              </a>
            </div>
            <div>
              <a
                href="https://www.facebook.com/your_username"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-8 h-8 bg-secondary-blue  rounded-full text-white transform transition-transform duration-300 hover:scale-110"
              >
                <SlSocialFacebook size={20} />
              </a>
            </div>
            <div>
              <a
                href="https://www.tiktok.com/@your_username"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-8 h-8 bg-secondary-blue  rounded-full text-white transform transition-transform duration-300 hover:scale-110"
              >
                <PiTiktokLogoLight size={20} />
              </a>
            </div>

          </div>


        </div>


        {/* Right Section */}
        <div className="flex flex-col md:flex-row justify-between md:items-start w-full gap-x-3 md:gap-x-6 lg:gap-x-1 gap-y-4 px-0 md:px-4 text-secondary-blue ">
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-3 whitespace-nowrap">Quick Links</h4>
            <ul className="space-y-2 text-md">
              {navOptions.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="inline hover:text-[#005BF0] transition whitespace-nowrap"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>


          <div className="block md:hidden border-t border-secondary-blue/30 my-2 w-full"></div>

          {/* Destinations */}
          <div className='text-secondary-blue  '>
            <h4 className="font-semibold mb-3">Destinations</h4>
            <ul className="space-y-2 text-secondary-blue text-md">
              <li><Link to="" className="hover:text-[#005BF0] transition">Paris</Link></li>
              <li><Link to="" className="hover:text-[#005BF0] transition">fchgvh</Link></li>
              <li><Link to="" className="hover:text-[#005BF0] transition">bnmnkml</Link></li>
              <li><Link to="" className="hover:text-[#005BF0] transition">New York</Link></li>
              <li><Link to="" className="hover:text-[#005BF0] transition">bnmnkml</Link></li>
            </ul>
          </div>

          <div className="block md:hidden border-t border-secondary-blue/30 my-2 w-full"></div>

          {/* Support */}
          <div className='text-secondary-blue '>
            <h4 className="font-semibold  mb-3">Contact Us</h4>
            <p className='text-md'>Have questions? We’re here to help with your travel plans.</p>
            <div className="flex items-center gap-2 mt-2 text-md text-secondary-blue whitespace-nowrap">
              <MdLocalPhone size={20} />

              <div className="flex flex-row gap-3">
                <a
                  href="tel:+045707023"
                  className="hover:text-[#005BF0] transition"
                >
                  045707023
                </a>
                <span>,</span>
                <a
                  href="tel:+971527418272"
                  className="hover:text-[#005BF0] transition"
                >
                  +971 52 741 8272
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-2 text-md text-secondary-blue">
              <MdEmail size={20} />
              <a
                href="mailto:Info@rukntravels.com"
                className="hover:text-[#005BF0] transition"
              >
                Info@rukntravels.com
              </a>
            </div>
            <div className="flex flex-row  items-start gap-2 mt-2 text-md text-secondary-blue">
              <IoLocationSharp size={21} className='' />
              <p className="">Opp Al Futtim Masjid Al Murara,Deira,Dubai - UAE</p>
            </div>
          </div>


        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 space-y-8 ">
        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full text-sm text-secondary-blue">
          <div>
            <p className="flex items-center flex-wrap justify-center gap-1 text-center whitespace-nowrap">
              Copyright <AiOutlineCopyright className="text-secondary-blue" /> 2025,Rukn Travels. All Rights Reserved
            </p>
          </div>

          <div className="flex items-center space-x-1 whitespace-nowrap">
            <p>Created By</p>
            <span>
              <Link
                to="https://www.ficaads.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                Ficaads
              </Link>
            </span>
          </div>



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
