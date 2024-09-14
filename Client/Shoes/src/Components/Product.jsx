import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { uploadImageToFirebase } from '../Firebase/firebase.js'; // Update with the correct path
import { useDispatch } from 'react-redux';
import { setProducts } from '../Redux/ProductSlice.js';

const ProductPage = () => {
  const dispatch=useDispatch()
  const [products, setProductss] = useState([]);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState(''); // New state for description
  const [productQuantity, setProductQuantity] = useState(''); // New state for quantity
  const [productImage, setProductImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
  axios.get('http://localhost:8001/productlist',{withCredentials:true})
      .then(response =>{
        if(response.data){
          setProductss(response.data)
          dispatch(setProducts(response.data))
        }
      })
      .catch(error => console.error(error));
  }, []);

  const handleAddProduct = async () => {
    if (!productName || !productPrice || !productImage || !productDescription || !productQuantity) {
      toast.error('Please fill out all fields and upload an image');
      return;
    }

    try {
      // Upload image to Firebase
      const imageUrl = await uploadImageToFirebase(productImage);
      const data = {
        name: productName,
        price: productPrice,
        description: productDescription,
        quantity: productQuantity,
        imageUrl: imageUrl
      };
      const response = await axios.post('http://localhost:8001/product', data, {
        headers: {
        'Content-Type': 'application/json'
        }
      });

      setProducts([...products, response.data]);
      setProductName('');
      setProductPrice('');
      setProductDescription(''); // Reset description
      setProductQuantity(''); // Reset quantity
      setProductImage(null);
      setImagePreview(null);
      setShowModal(false);
      toast.success('Product added successfully!');
    } catch (error) {
      toast.error('Failed to add product');
    }
  };

  const handleDeleteProduct = (id) => {
    axios.delete(`http://localhost:8001/products/${id}`)
      .then(() => {
        setProducts(products.filter(product => product._id !== id));
        toast.success('Product deleted successfully');
      })
      .catch(error => toast.error('Failed to delete product'));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-r from-red-500 via-red-600 to-red-700">
      <ToastContainer />
      <div className="container mx-auto">
        <h1 className="text-5xl font-extrabold text-white text-center mb-12 animate-pulse">Manage Products</h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-r from-red-500 to-red-500 text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 focus:ring-4 focus:ring-red-500 transition duration-300 transform hover:scale-110 mb-6"
        >
          Add Product <FontAwesomeIcon icon={faPlusCircle} className="ml-2" />
        </button>

        <div className="overflow-x-auto bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl shadow-2xl p-6">
          <table className="min-w-full text-white">
            <thead>
              <tr className="text-left bg-red-700">
                <th className="py-2 px-4">Product Name</th>
                <th className="py-2 px-4">Price</th>
                <th className="py-2 px-4">Description</th> {/* Added description header */}
                <th className="py-2 px-4">Quantity</th> {/* Added quantity header */}
                <th className="py-2 px-4">Image</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-red-600 transition duration-200">
                  <td className="py-2 px-4">{product.name}</td>
                  <td className="py-2 px-4">${product.price}</td>
                  <td className="py-2 px-4">{product.description}</td> {/* Display description */}
                  <td className="py-2 px-4">{product.quantity}</td> {/* Display quantity */}
                  <td className="py-2 px-4">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  </td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="bg-gradient-to-r from-red-600 to-red-700 text-white py-2 px-4 rounded-lg hover:opacity-90 transition duration-300"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button
                      className="bg-gradient-to-r from-red-600 to-red-700 text-white py-2 px-4 rounded-lg hover:opacity-90 transition duration-300 ml-2"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-6 shadow-2xl max-w-md w-full">
              <h2 className="text-3xl font-bold text-white mb-4">Add Product</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Product Name"
                  className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 focus:bg-opacity-30 focus:ring-4 focus:ring-red-500 text-white placeholder-gray-200 transition duration-200"
                />
                <input
                  type="number"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  placeholder="Product Price"
                  className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 focus:bg-opacity-30 focus:ring-4 focus:ring-red-500 text-white placeholder-gray-200 transition duration-200"
                />
                <textarea
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  placeholder="Product Description"
                  className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 focus:bg-opacity-30 focus:ring-4 focus:ring-red-500 text-white placeholder-gray-200 transition duration-200"
                />
                <input
                  type="number"
                  value={productQuantity}
                  onChange={(e) => setProductQuantity(e.target.value)}
                  placeholder="Product Quantity"
                  className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 focus:bg-opacity-30 focus:ring-4 focus:ring-red-500 text-white placeholder-gray-200 transition duration-200"
                />

                <label className="block cursor-pointer bg-gradient-to-r from-red-600 to-red-700 text-white text-center py-2 px-4 rounded-lg">
                  {productImage ? 'Change Image' : 'Choose Image'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                
                {imagePreview && (
                  <div className="w-full flex justify-center mt-4">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-32 h-32 object-cover rounded-lg border-2 border-red-500"
                    />
                  </div>
                )}

                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    onClick={() => setShowModal(false)}
                    className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:opacity-90 transition duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddProduct}
                    className="bg-gradient-to-r from-red-600 to-red-700 text-white py-2 px-4 rounded-lg hover:opacity-90 transition duration-300"
                  >
                    Add Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
