import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import AIChatbot from './components/AIChatbot/AIChatbot'

import Home from './pages/Home/Home'
import Shop from './pages/Shop/Shop'
import ProductDetails from './pages/ProductDetails/ProductDetails'
import Checkout from './pages/Checkout/Checkout'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import UserDashboard from './pages/UserDashboard/UserDashboard'
import Cart from './pages/Cart/Cart'
import Wishlist from './pages/Wishlist/Wishlist'
import Categories from './pages/Categories/Categories'
import ProductComparison from './pages/ProductComparison/ProductComparison'
import AdminDashboard from './admin/Dashboard/Dashboard'
import Products from './admin/Products/Products'
import VendorDashboard from './admin/Vendors/VendorDashboard'

const Placeholder = ({ name }) => (
  <div className="pt-32 pb-20 container mx-auto px-4 min-h-screen">
    <div className="glass p-10 text-center">
      <h1 className="text-4xl font-bold mb-4">{name} Page</h1>
      <p className="opacity-70 text-lg">This section is currently under construction. Please check back later.</p>
    </div>
  </div>
)

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col relative">
        <Navbar />
        <main className="grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/compare" element={<ProductComparison />} />

            {/* Admin & Vendor */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<Products />} />
            <Route path="/vendor" element={<VendorDashboard />} />

            <Route path="/vendors" element={<Placeholder name="Marketplace" />} />
          </Routes>
        </main>
        <Footer />
        <AIChatbot />
      </div>
    </Router>
  )
}

export default App
