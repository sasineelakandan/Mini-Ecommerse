import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import heroImage1 from '../assets/sanju-pandita-36MiHf2KKr8-unsplash.jpg';
const ProductDetailsPage = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const product = {
    id: 1,
    name: 'Nike Air Max',
    description: 'The Nike Air Max provides unparalleled comfort with cutting-edge technology, making every step smooth and effortless.',
    price: 120,
    image: heroImage1,
    reviews: [
      { id: 1, user: 'John Doe', rating: 5, comment: 'Amazing product! Super comfortable and stylish.' },
      { id: 2, user: 'Jane Smith', rating: 4.5, comment: 'Great shoe but slightly overpriced.' },
    ],
  };

  const handleRatingClick = (rate) => {
    setRating(rate);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white">
      <Navbar />
      <div className="container mx-auto mt-10 p-5">
        <div className="flex flex-col md:flex-row space-x-6">
          <div className="flex-1">
            <img src={product.image} alt={product.name} className="w-full h-96 object-cover rounded-lg shadow-xl" />
          </div>
          <div className="flex-1 text-white mt-8 md:mt-0">
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-xl mb-4">${product.price}</p>
            <p className="text-lg mb-6">{product.description}</p>
            <button className="bg-yellow-400 text-black font-bold py-3 px-8 rounded-lg hover:bg-yellow-500 transition duration-300 transform hover:scale-105 mb-6">
              Add to Cart <FontAwesomeIcon icon={faShoppingCart} className="ml-2" />
            </button>
            
            {/* Ratings */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold">Rate this product</h2>
              <div className="flex space-x-2 mt-4">
                {[1, 2, 3, 4, 5].map((rate) => (
                  <FontAwesomeIcon
                    key={rate}
                    icon={faStar}
                    className={`text-3xl cursor-pointer ${hoverRating >= rate || rating >= rate ? 'text-yellow-400' : 'text-gray-400'}`}
                    onClick={() => handleRatingClick(rate)}
                    onMouseEnter={() => setHoverRating(rate)}
                    onMouseLeave={() => setHoverRating(0)}
                  />
                ))}
              </div>
              {rating > 0 && (
                <p className="mt-4 text-lg">You rated this product {rating} stars!</p>
              )}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-10">
          <h2 className="text-3xl font-bold">User Reviews</h2>
          <div className="space-y-4 mt-6">
            {product.reviews.map((review) => (
              <div key={review.id} className="bg-white bg-opacity-10 p-5 rounded-lg shadow-lg">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-yellow-400">{review.user}</h3>
                  <div className="flex">
                    {[...Array(Math.floor(review.rating))].map((_, index) => (
                      <FontAwesomeIcon key={index} icon={faStar} className="text-yellow-400 text-lg" />
                    ))}
                    {review.rating % 1 !== 0 && <FontAwesomeIcon icon={faStarHalfAlt} className="text-yellow-400 text-lg" />}
                  </div>
                </div>
                <p className="mt-3">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
