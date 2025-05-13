import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Rocket, User, Menu, X } from "lucide-react";
import logo from '../../assets/image/logo/logo.png';
import navOptions from "../../data/navOptions";
import UserLogoutButton from "../reusable/UserLogoutButton";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Header */}
      <header className="absolute top-6 left-1/2 transform -translate-x-1/2 w-[96%] flex justify-between items-center px-1 z-30">
        {/* Logo */}
        <Link to={'/'}>
          <img src={logo} alt="Logo" className="w-32 h-auto" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex bg-white/10 backdrop-blur-md rounded-full p-1 space-x-1 ring-1 ring-white/20">
          {navOptions.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `px-5 py-2 rounded-full transition ${
                  isActive
                    ? 'bg-white text-black shadow font-medium'
                    : 'text-white bg-white/20 hover:bg-white/30'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 bg-white rounded-full shadow hover:bg-gray-100 cursor-pointer"
          >
            <Menu size={20} className="text-black" />
          </button>
        </div>

        {/* Icons (Desktop Only) */}
        <div className="hidden lg:flex items-center space-x-4">
          <button className="p-3 bg-white rounded-full shadow hover:bg-gray-100">
            <Rocket size={20} className="text-black" />
          </button>
          <NavLink to={'/profile'}>
            <button className="p-3 bg-white rounded-full shadow hover:bg-gray-100">
              <User size={20} className="text-black" />
            </button>
          </NavLink>
          <UserLogoutButton />
        </div>
      </header>

      {/* Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Slide-in Mobile Menu Styled Like Desktop Nav */}
      <div
        className={`fixed top-0 left-0 h-full w-72 z-30 transform transition-transform duration-500 ease-in-out lg:hidden ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full bg-white/10 backdrop-blur-xl ring-1 ring-white/20 p-6 rounded-tr-2xl rounded-br-2xl shadow-lg flex flex-col justify-between">

          {/* Close Button */}
          <div className="flex justify-end mb-6">
            <button onClick={() => setMobileMenuOpen(false)} className="p-2 cursor-pointer">
              <X size={24} className="text-white" />
            </button>
          </div>

          {/* Nav Items */}
          <nav className="flex flex-col space-y-3">
            {navOptions.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.end}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-5 py-2 rounded-full text-center transition ${
                    isActive
                      ? 'bg-white text-black font-medium shadow'
                      : 'text-white bg-white/20 hover:bg-white/30'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Footer Icons */}
          <div className="flex justify-around pt-6 border-t border-white/20">
            <Rocket size={22} className="text-white" />
            <NavLink to={'/profile'} onClick={() => setMobileMenuOpen(false)}>
              <User size={22} className="text-white" />
            </NavLink>
            <UserLogoutButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;