import React, { useState } from "react";
import "./App.css";
import Products from "./components/products/Products";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Navbar from "./components/shared/Navbar";
import About from "./components/About";
import Contact from "./components/Contact";
import { Toaster } from "react-hot-toast";
import Cart from "./components/cart/Cart";
import { Login } from "./components/auth/Login";
import { PrivateRoutes } from "./components/PrivateRoutes";
import { Register } from "./components/auth/Register";
import { Checkout } from "./components/checkout/Checkout";
import PaymentConfirmation from "./components/checkout/PaymentConfirmation";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./components/admin/dashboard/Dashboard";
import AdminProducts from "./components/admin/products/AdminProducts";
import Categories from "./components/admin/categories/Categories";
import Sellers from "./components/admin/sellers/Sellers";
import Orders from "./components/admin/orders/Orders";

function App() {
  const [count, setCount] = useState(0);

  return (
    <React.Fragment>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="/" element={<PrivateRoutes />}>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirm" element={<PaymentConfirmation/>} />
          </Route>

          <Route path="/" element={<PrivateRoutes adminOnly />}>
            <Route path="/admin" element={<AdminLayout/>} >
              <Route path="" element={<Dashboard/>}/>
              <Route path="orders" element={<Orders/>}/>
              <Route path="products" element={<AdminProducts/>}/>
              <Route path="categories" element={<Categories/>}/>
              <Route path="sellers" element={<Sellers/>}/>
            </Route>
          </Route>

          <Route path="/" element={<PrivateRoutes publicPage />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

        </Routes>
      </Router>
      <Toaster position="bottom-center" />
    </React.Fragment>
  );
}

export default App;
