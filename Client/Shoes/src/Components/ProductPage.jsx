// src/pages/ProductPage.js
import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import ProductCard from '../Components/ProductCard';
import heroImage1 from '../assets/sanju-pandita-36MiHf2KKr8-unsplash.jpg';

const ProductPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetching product data (mock data for now)
    const fetchedProducts = [
      { id: 1, name: 'Nike Air Max', image:heroImage1, price: 120 },
      { id: 2, name: 'Adidas UltraBoost', image: heroImage1, price: 140 },
      { id: 3, name: 'Puma Suede', image:heroImage1, price: 100 },
      { id: 4, name: 'Reebok Classic', image: heroImage1, price: 90 },
    ];
    setProducts(fetchedProducts);
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-8">
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
