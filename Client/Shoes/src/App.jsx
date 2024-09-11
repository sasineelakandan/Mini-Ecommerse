import React from 'react'
import SignUpPage from './Components/Signup'
import HomePage from './Components/Home'
import ProductPage from './Components/ProductPage'
import CartPage from './Components/Cart'
import ProductDetailsPage from './Components/SinglePage'
import AdminUsersPage from './Components/AdminUser'
import LoginPage from './Components/Loginpage'

const App = () => {
  return (
    <div>
      <AdminUsersPage/>
      <ProductDetailsPage/>
      <CartPage/>
      <LoginPage/>
      <ProductPage/>
      <HomePage/>
      <SignUpPage/>
    </div>
  )
}

export default App