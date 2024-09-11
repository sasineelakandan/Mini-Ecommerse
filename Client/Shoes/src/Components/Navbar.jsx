import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-red-500 via-red-500 to-red-500 p-5 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <a
          href="/"
          className="text-white font-bold text-3xl hover:text-red-200 transition-transform transform hover:scale-110"
        >
          Sports Shoes
        </a>
        <ul className="flex space-x-8">
          <li>
            <a
              href="/"
              className="text-white text-lg font-medium hover:text-red-200 transition duration-300 ease-in-out hover:underline hover:scale-105 transform"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/products"
              className="text-white text-lg font-medium hover:text-red-200 transition duration-300 ease-in-out hover:underline hover:scale-105 transform"
            >
              Products
            </a>
          </li>
          <li>
            <a
              href="/cart"
              className="text-white text-lg font-medium hover:text-red-200 transition duration-300 ease-in-out hover:underline hover:scale-105 transform"
            >
              Cart
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
