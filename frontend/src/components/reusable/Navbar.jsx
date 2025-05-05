import React from "react";
import { NavLink } from "react-router-dom";
import { Rocket, User } from "lucide-react";
import logo from '../../assets/image/logo/logo.png';
import navOptions from "../../data/navOptions";
import UserLogoutButton from "./UserLogoutButton";

const Header = () => {
  return (
    <header className="absolute bg-blue-300 top-6 left-1/2 transform -translate-x-1/2 w-[96%] max-w-8xl flex justify-between items-center backdrop-blur-md px-1">
      {/* Logo */}
      <div className="text-2xl font-bold whitespace-nowrap">
        <img src={logo} alt="" className="w-15 h-15" />
      </div>

      {/* Nav */}
      <nav className="hidden md:flex bg-white/10 backdrop-blur-md rounded-full p-1 space-x-1 ring-1 ring-white/20">
        {navOptions.map((item, index) => (
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

      {/* Icons */}
      <div className="flex items-center space-x-4">
        <button className="p-3 bg-white rounded-full shadow hover:bg-gray-100">
          <Rocket size={20} className="text-black" />
        </button>
        <button className="p-3 bg-white rounded-full shadow hover:bg-gray-100">
          <NavLink to={'/profile'}>
            <User size={20} className="text-black" />
          </NavLink>
        </button>
        <UserLogoutButton />
      </div>
    </header>
  );
};

export default Header;
