import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Redux/Slice'
import productReducer from '../Redux/ProductSlice.js'; 
export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer
  },
});
