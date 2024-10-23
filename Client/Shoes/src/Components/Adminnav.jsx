import React from 'react';
import { FaHome, FaBox, FaShoppingCart, FaUsers, FaChartPie } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import logo from '../assets/vecteezy_creative-abstract-black-silhouette-running-shoe-design-logo_8956590.jpg'; // Assuming you want to use the logo

const ANavbar = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <div className="w-1/6 bg-gradient-to-b from-red-400 to-red-600 text-white p-5 shadow-lg">
      <div className="flex items-center justify-center mb-8">
        {/* Logo */}
        <a className="flex items-center text-xl font-semibold" href="/" aria-label="Brand">
          <img src={logo} alt="Logo" className="w-10 h-auto mr-2" /> Admin Dashboard
        </a>
      </div>

      {/* Sidebar Links */}
      <ul className="space-y-6">
        <li>
          <Link
            to="/admin/home"
            className="block py-3 px-4 rounded-lg hover:bg-red-700 hover:scale-105 transform transition duration-300 ease-in-out"
          >
            <FaHome className="inline mr-2" /> Home
          </Link>
        </li>
        <li>
          <Link
            to="/admin/product"
            className="block py-3 px-4 rounded-lg hover:bg-red-700 hover:scale-105 transform transition duration-300 ease-in-out"
          >
            <FaBox className="inline mr-2" /> Products
          </Link>
        </li>
        <li>
          <Link
            to="/admin/orders"
            className="block py-3 px-4 rounded-lg hover:bg-red-700 hover:scale-105 transform transition duration-300 ease-in-out"
          >
            <FaShoppingCart className="inline mr-2" /> Orders
          </Link>
        </li>
        <li>
          <Link
            to="/admin/users"
            className="block py-3 px-4 rounded-lg hover:bg-red-700 hover:scale-105 transform transition duration-300 ease-in-out"
          >
            <FaUsers className="inline mr-2" /> Users
          </Link>
        </li>
      </ul>

      {/* User Greeting */}
      {user && (
        <div className="mt-10 text-lg text-center text-white">
          <span className="font-semibold">Hi, {user.Name}</span>
        </div>
      )}
    </div>
  );
};

export default ANavbar;
