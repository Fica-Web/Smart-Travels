import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import navOptions from '../../data/navOptions';
import { servicesData } from '../../data/HomeSection/servicesData'
import { getSettings } from '../../services/api/settingsApi';
import logo from '../../assets/image/logo/logo.png';
import { AiOutlineCopyright } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa";
import { SlSocialFacebook } from "react-icons/sl";
import { PiTiktokLogoLight } from "react-icons/pi";
import { MdLocalPhone } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";




const Footer = () => {
  const [settings, setSettings] = useState({
    email: '',
    contactNumber: '',
    location: '',
    instagram: '',
    facebook: '',
    tiktok: ''
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await getSettings();
        setSettings(res.data.data);

      } catch (err) {
        console.log('Failed to load settings');
      }
    };
    fetchSettings();
  }, []);




  return (
    <footer className="relative w-full h-auto  py-10 px-5 sm:px-20 bg-[#4A94D0]/40">

      {/* Top Section */}
      <div className="pb-5 md:pb-12 border-b border-secondary-blue flex flex-col md:flex-row justify-items-center gap-10 md:gap-5 lg:gap-30  ">
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
                href={settings.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-8 h-8 bg-secondary-blue rounded-full text-white transform transition-transform duration-300 hover:scale-110"
              >
                <FaInstagram size={20} />
              </a>
            </div>
            <div>
              <a
                href={settings.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-8 h-8 bg-secondary-blue  rounded-full text-white transform transition-transform duration-300 hover:scale-110"
              >
                <SlSocialFacebook size={20} />
              </a>
            </div>
            <div>
              <a
                href={settings.tiktok}
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
            <h4 className="font-semibold mb-3 whitespace-nowrap text-secondary-blue">Quick Links</h4>
            <ul className="space-y-2 text-md">
              {navOptions.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="inline hover:text-[#005BF0] transition whitespace-nowrap text-secondary-blue"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>


          <div className="block md:hidden border-t border-secondary-blue/30 my-2 w-full"></div>

          {/* Destinations */}


          <div className='text-secondary-blue'>
            <h4 className="font-semibold mb-3 text-secondary-blue">Services</h4>
            <ul className="space-y-2 text-secondary-blue text-md">
              {servicesData.slice(0,5).map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path} // Ensure each item in servicesData has a `path` property
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className=" hover:text-primary hover:text-[#005BF0] transition duration-200 text-secondary-blue"
                  >
                    {item.footerTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>


          <div className="block md:hidden border-t border-secondary-blue/30 my-2 w-full"></div>

          {/* Support */}
          <div className='text-secondary-blue '>
            <h4 className="font-semibold  mb-3 text-secondary-blue">Contact Us</h4>
            <p className='text-md text-secondary-blue'>Have questions? We’re here to help with your travel plans.</p>
            <div className="flex items-center gap-2 mt-2 text-md text-secondary-blue whitespace-nowrap">
              <MdLocalPhone size={20} />

              <div className="flex flex-row gap-3">
                <a href={`tel:${settings.contactNumber}`} className="hover:text-[#005BF0] transition text-secondary-blue">
                  {settings.contactNumber}
                </a>
                {/* <span>,</span>

                <a href={`tel:${settings.phone}`} className="hover:text-[#005BF0] transition">
                  {settings.phone2}
                </a> */}
              </div>
            </div>

            <div className="flex items-center gap-2 mt-2 text-md text-secondary-blue">
              <MdEmail size={20} />
              <a href={`mailto:${settings.email}`} className="hover:text-[#005BF0] transition text-secondary-blue">
                {settings.email}
              </a>
            </div>
            <div className="flex flex-row  items-start gap-2 mt-2 text-md text-secondary-blue">
              <IoLocationSharp size={21} className='' />
              <p>{settings.location}</p>

            </div>
          </div>


        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 space-y-8 ">
        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center w-full text-sm text-secondary-blue ">
          <div>
            <p className="flex items-center flex-wrap justify-center gap-1 text-center whitespace-nowrap text-secondary-blue">
              Copyright <AiOutlineCopyright className="text-secondary-blue" /> 2025,Rukn Travels. All Rights Reserved
            </p>
          </div>

          <div className="flex items-center space-x-1 whitespace-nowrap">
            <p className='text-secondary-blue'>Created By</p>
            <span>
              <Link
                to="https://www.ficaads.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition text-secondary-blue"
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
