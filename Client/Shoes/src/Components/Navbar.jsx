import React from 'react';
import { FaHome, FaBox, FaShoppingCart, FaUserCircle } from 'react-icons/fa';


const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 p-5 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <a
          href="/"
          className="text-white font-bold text-3xl hover:text-red-200 transition-transform transform hover:scale-110 flex items-center"
        >
          Sports Shoes
        </a>
        <ul className="flex space-x-8 items-center">
          <li>
            <a
              href="/"
              className="flex items-center text-white text-lg font-medium hover:text-red-200 transition duration-300 ease-in-out hover:underline hover:scale-105 transform"
            >
              <FaHome className="mr-1" /> Home
            </a>
          </li>
          <li>
            <a
              href="/product"
              className="flex items-center text-white text-lg font-medium hover:text-red-200 transition duration-300 ease-in-out hover:underline hover:scale-105 transform"
            >
              <FaBox className="mr-1" /> Products
            </a>
          </li>
          <li>
            <a
              href="/cart"
              className="flex items-center text-white text-lg font-medium hover:text-red-200 transition duration-300 ease-in-out hover:underline hover:scale-105 transform"
            >
              <FaShoppingCart className="mr-1" /> Cart
            </a>
          </li>
        </ul>
        
      </div>
    </nav>
  );
};

export default Navbar;

