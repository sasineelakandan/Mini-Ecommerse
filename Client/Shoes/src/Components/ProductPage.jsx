// src/pages/ProductPage.js
import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import ProductCard from '../Components/ProductCard';

import axios from 'axios';


const ProductPage = () => {
  const [products,setProducts]=useState([])
  useEffect(()=>{
    axios.get('http://localhost:8001/userproducts',{withCredentials:true})
    .then((response)=>{
      if(response.data){
        console.log(response.data)
          setProducts(response.data)
      }
    }).catch((err)=>{
      console.log(err)
    })
  },[])
  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-8 bg-gradient-to-r bg-white text-black p-4">
        <h1 className="text-2xl font-bold mb-6">All Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductPage;
