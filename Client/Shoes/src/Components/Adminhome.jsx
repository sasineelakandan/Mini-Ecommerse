import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaBox, FaShoppingCart, FaUsers, FaChartPie } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto'; // Automatically imports necessary chart.js modules

// Mock Data for Product Categories Doughnut chart
const doughnutData = {
  labels: ['Electronics', 'Clothing', 'Shoes', 'Accessories'],
  datasets: [
    {
      label: 'Product Categories',
      data: [300, 150, 200, 100],
      backgroundColor: [
        'rgba(255, 99, 132, 0.7)', // Red
        'rgba(54, 162, 235, 0.7)', // Blue
        'rgba(255, 206, 86, 0.7)', // Yellow
        'rgba(75, 192, 192, 0.7)', // Green
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
      ],
      borderWidth: 2,
    },
  ],
};

// Mock Data for Sales Performance Doughnut chart
const salesData = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  datasets: [
    {
      label: 'Quarterly Sales',
      data: [400, 300, 450, 600],
      backgroundColor: [
        'rgba(153, 102, 255, 0.7)', // Purple
        'rgba(255, 159, 64, 0.7)', // Orange
        'rgba(75, 192, 192, 0.7)', // Green
        'rgba(54, 162, 235, 0.7)', // Blue
      ],
      borderColor: [
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(54, 162, 235, 1)',
      ],
      borderWidth: 2,
    },
  ],
};

const doughnutOptions = {
  responsive: true,
  cutout: '70%', // Doughnut style
  plugins: {
    legend: {
      position: 'bottom', // Move legend to bottom
    },
  },
};

const AdminDashboard = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/6 bg-gradient-to-b from-red-400 to-red-600 text-white p-5 shadow-lg">
        <div className="flex items-center justify-center mb-8">
          {/* Logo */}
          <a className="flex items-center text-xl font-semibold" href="/" aria-label="Brand">
            <FaChartPie className="w-10 h-auto mr-2" /> Admin Dashboard
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

      {/* Main Content */}
      <div className="flex-grow p-10 bg-white">
        <h1 className="text-4xl font-bold text-red-500 mb-6">Admin Dashboard Overview</h1>

        {/* Dashboard Charts */}
        <div className="grid grid-cols-2 gap-6">
          {/* Product Categories Chart */}
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Product Categories</h2>
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>

          {/* Sales Performance Chart */}
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Sales Performance</h2>
            <Doughnut data={salesData} options={doughnutOptions} />
          </div>
        </div>

        {/* Add more dashboard content below */}
      </div>
    </div>
  );
};

export default AdminDashboard;
