// src/components/ProductCard.js
import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
const ProductCard = ({ product }) => {
  const navigate=useNavigate()
  function handleClick(id){
     navigate(`/viewproduct/${id}`)
  }
    
  
  return (
    <div onClick={()=>{handleClick(product._id)}} className="bg-white shadow-lg rounded-lg overflow-hidden">
      <img className="w-full h-48 object-cover" src={product.imageUrl} alt={product.name} />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600">${product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
