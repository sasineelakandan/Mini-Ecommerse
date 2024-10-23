import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast,ToastContainer } from 'react-toastify';
const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const user =useSelector((state)=>state.user.user)
  
  useEffect(() => {
    // Fetch product details by ID
    axios.get(`http://localhost:8001/Sviewpage?id=${id}`)
      .then(response => setProduct(response.data))
      .catch(error => console.error(error));
  }, [id]);

  // Handle adding product to cart with specified quantity
  const handleAddToCart = (id) => {
    
    axios.post(`http://localhost:8001/addtocart`, { id:id, quantity,userId:user._id })
      .then(response =>{
        if(response.data){
          toast.success('Success! AddtoCard', {
          
            autoClose: 1000, 
          });
        }else{
          toast.error('Stock not Availaple!', {
            position: "top-right",
            autoClose: 5000,  // Close the toast automatically after 5 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored", // You can use other themes like 'dark', 'light', etc.
          })
        }
      })
      .catch(error => console.error(error));
  };

  // Increment quantity
  const incrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  // Decrement quantity (minimum 1)
  const decrementQuantity = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white">
      <Navbar />
      <div className="container mx-auto mt-10 p-5">
        <div className="flex flex-col md:flex-row space-x-6">
        <ToastContainer />
          <div className="flex-1">
            <img src={product.imageUrl} alt={product.name} className="w-full h-96 object-cover rounded-lg shadow-xl" />
          </div>
          <div className="flex-1 text-white mt-8 md:mt-0">
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-xl mb-4">${product.price}</p>
            <p className="text-lg mb-6">{product.description}</p>

            {/* Quantity Controls */}
            <div className="mb-6 flex items-center">
              <button 
                onClick={decrementQuantity}
                className="bg-gray-300 text-black font-bold py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-300">
                -
              </button>
              <span className="mx-4 text-lg">{quantity}</span>
              <button 
                onClick={incrementQuantity}
                className="bg-gray-300 text-black font-bold py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-300">
                +
              </button>
            </div>

            {/* Add to Cart Button */}
            <button 
              onClick={()=>{handleAddToCart(product._id)}} 
              className="bg-yellow-400 text-black font-bold py-3 px-8 rounded-lg hover:bg-yellow-500 transition duration-300 transform hover:scale-105 mb-6">
              Add to Cart <FontAwesomeIcon icon={faShoppingCart} className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
