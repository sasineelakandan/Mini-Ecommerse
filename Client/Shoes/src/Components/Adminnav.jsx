import React from 'react';
import { FaHome, FaBox, FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import logo from '../assets/vecteezy_creative-abstract-black-silhouette-running-shoe-design-logo_8956590.jpg';

const ANavbar = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <nav className="w-full bg-red-200 text-red-800 shadow-md">
      <div className="max-w-screen-xl w-full mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo and Title Container */}
        <a className="flex items-center text-xl font-semibold" href="/" aria-label="Brand">
          <img className="w-10 h-auto mr-2" src={logo} alt="ShoesStore Logo" />
          ShoesStore
        </a>
        
        {/* Navigation Links */}
        <div className="flex items-center space-x-4">
          <a className="py-2 px-4 font-medium text-red-800 hover:text-red-600 transition-colors duration-300" href="/">
            <FaHome className="inline mr-2" /> Home
          </a>
          <a className="py-2 px-4 text-red-800 hover:text-red-600 transition-colors duration-300" href="/product">
            <FaBox className="inline mr-2" /> Products
          </a>
          <a className="py-2 px-4 text-red-800 hover:text-red-600 transition-colors duration-300" href="/cart">
            <FaShoppingCart className="inline mr-2" /> Cart
          </a>
          {user && (
            <div className="py-2 px-4 text-lg text-red-800">
              <span className="font-semibold">Hi, {user.Name}</span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default ANavbar;
