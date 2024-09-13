import React from 'react'
import SignUpPage from './Components/Signup'
import HomePage from './Components/Home'
import ProductPage from './Components/ProductPage'
import CartPage from './Components/Cart'
import ProductDetailsPage from './Components/SinglePage'

import LoginPage from './Components/Loginpage'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
 // Adjust path based on your project structure

const App = () => {
  return (
    

<Router>
      <Routes>
        <Route path='/signup' element={ <SignUpPage/>}/>
        <Route path='/login' element={<LoginPage/> } />
        <Route path='/' element={<HomePage/>}/> 
        <Route path='/product' element={<ProductPage/>}/> 
        <Route path='/viewproduct' element={<ProductDetailsPage/>}/> 
        <Route path='/cart' element={  <CartPage/>}/> 
       
        
      </Routes>
    </Router>
     
      
    
      
      
      
      
    
  )
}

export default App