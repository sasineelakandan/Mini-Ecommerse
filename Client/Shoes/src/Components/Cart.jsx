import React from 'react';
import Navbar from '../Components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import heroImage1 from '../assets/sanju-pandita-36MiHf2KKr8-unsplash.jpg';
const CartPage = () => {
  const cartItems = [
    { id: 1, name: 'Nike Air Max', price: 120, quantity: 2, image: heroImage1 },
    { id: 2, name: 'Adidas UltraBoost', price: 150, quantity: 1, image: heroImage1 },
  ];

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white">
      <Navbar />
      <div className="container mx-auto mt-10 p-5">
        <h2 className="text-4xl font-bold mb-8 text-center">
          <FontAwesomeIcon icon={faShoppingCart} className="mr-4" />
          Your Cart
        </h2>
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white bg-opacity-10 backdrop-blur-md p-5 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300">
                <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-md mb-4" />
                <h3 className="text-2xl font-bold mb-2">{item.name}</h3>
                <p className="text-lg">Price: ${item.price}</p>
                <p className="text-lg">Quantity: {item.quantity}</p>
                <div className="flex justify-between items-center mt-4">
                  <button className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-lg transition duration-300">
                    <FontAwesomeIcon icon={faTrash} /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-xl mt-10">Your cart is empty.</p>
        )}

        {cartItems.length > 0 && (
          <div className="mt-8 text-right">
            <h3 className="text-3xl font-bold">Total: ${totalPrice.toFixed(2)}</h3>
            <button className="bg-yellow-400 text-black font-bold px-8 py-3 rounded-lg mt-5 hover:bg-yellow-500 transition duration-300">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
