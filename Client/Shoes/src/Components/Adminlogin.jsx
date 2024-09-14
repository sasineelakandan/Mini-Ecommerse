import React from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import { setAdmin } from '../Redux/Slice';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css'

const AdminLoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    axios.post('http://localhost:8001/adminlogin', data, { withCredentials: true })
      .then(response => {
        if (response.data) {
          console.log(response.data);
          dispatch(setAdmin(response.data.AdminVer));
          toast.success('Success! Redirecting...', {
            autoClose: 1000, // duration for toast visibility
          });
          
          // Navigate after showing the toast
          setTimeout(() => {
            navigate('/admin');
          }, 1000); // Delay the navigation to allow the toast to be visible
        }
      }).catch(err => {
        toast.error('Something went wrong! Please check your email & password.', {
          position: "top-right",
          autoClose: 2000,  // Close the toast automatically after 2 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            background: '#ffffff',  // White background
            color: '#000000',       // Black text color for contrast
          },
        });
      });
  };

  return (
    <div className="h-screen flex items-center justify-center p-4 bg-gradient-to-r from-red-500 via-red-600 to-red-700">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-10 shadow-2xl w-full max-w-md transform hover:scale-105 transition-all duration-300">
        <h2 className="text-4xl font-extrabold text-white mb-8 text-center animate-pulse">Admin Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <ToastContainer />

          <div className="input-field relative">
            <input
              {...register('email', { 
                required: 'Email Address is required', 
                pattern: { 
                  value: /^\S+@\S+$/i, 
                  message: 'Invalid email address' 
                }
              })}
              type="email"
              id="email"
              className="w-full px-5 py-3 rounded-lg bg-white bg-opacity-20 focus:bg-opacity-30 focus:ring-4 focus:ring-red-500 text-white placeholder-gray-200 transition duration-200"
              placeholder="Email Address"
            />
            <FontAwesomeIcon icon={faEnvelope} className="absolute right-4 top-4 text-white" />
            {errors.email && <span className="text-red-600">{errors.email.message}</span>}
          </div>
          <div className="input-field relative">
            <input
              {...register('password', { 
                required: 'Password is required', 
                minLength: { 
                  value: 6, 
                  message: 'Password must be at least 6 characters long' 
                } 
              })}
              type="password"
              id="password"
              className="w-full px-5 py-3 rounded-lg bg-white bg-opacity-20 focus:bg-opacity-30 focus:ring-4 focus:ring-red-500 text-white placeholder-gray-200 transition duration-200"
              placeholder="Password"
            />
            <FontAwesomeIcon icon={faLock} className="absolute right-4 top-4 text-white" />
            {errors.password && <span className="text-red-500">{errors.password.message}</span>}
          </div>
          <button
            type="submit"
            className="btn w-full bg-gradient-to-r from-red-500 to-red-500 text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 focus:ring-4 focus:ring-red-500 transition duration-300 transform hover:scale-110"
          >
            Login
            <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
          </button>
        </form>
        <p className="text-white text-center mt-6">
          Don't have an account?{' '}
          <a href="/signup" className="font-bold hover:underline text-red-200">
            Sign up
          </a>
        </p>
        <div className="mt-8 flex justify-center space-x-6">
          <a href="#" className="text-white hover:text-red-300 transition-colors duration-200">
            <FontAwesomeIcon icon={faFacebookF} className="fab text-2xl" />
          </a>
          <a href="#" className="text-white hover:text-red-300 transition-colors duration-200">
            <FontAwesomeIcon icon={faTwitter} className="fab text-2xl" />
          </a>
          <a href="#" className="text-white hover:text-red-300 transition-colors duration-200">
            <FontAwesomeIcon icon={faGoogle} className="fab text-2xl" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
