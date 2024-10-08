import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import heroImage1 from '../assets/sanju-pandita-36MiHf2KKr8-unsplash.jpg';
import heroImage2 from '../assets/domino-studio-164_6wVEHfI-unsplash.jpg';
import heroImage3 from '../assets/—Pngtree—vibrant red canvas sports shoes_6679754.jpg';

const images = [
  heroImage1,
  heroImage2,
  heroImage3,
  heroImage1
];

const HomePage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      {/* Hero Section */}
      <div className="relative">
        <img
          src={images[currentImageIndex]}
          alt="Hero"
          className="w-full h-[600px] object-cover"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Find Your Perfect Fit</h1>
          <p className="text-lg mb-8">Explore our latest collection</p>
          <button className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">
            Shop Now
          </button>
        </div>
      </div>

      {/* Product Showcase */}
      <div className="py-12 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-red-900">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {images.map((image, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:-translate-y-2">
              <img
                src={image}
                alt={`Product ${index + 1}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-red-900">Product {index + 1}</h3>
                <p className="text-gray-600 mb-4">$99.99</p>
                <button className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-red-300 text-black py-12 text-center">
        <h2 className="text-2xl font-bold mb-4 text-black">Stay Ahead of the Game</h2>
        <p className="text-lg mb-6 text-black">Sign up for our newsletter for exclusive offers</p>
        <a href="/signup">
          <button className="bg-white text-red-900 py-2 px-4 rounded-lg hover:bg-red-600 transition-colors">
            Subscribe Now
          </button>
        </a>
      </div>
    </div>
  );
};

export default HomePage;

