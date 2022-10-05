import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Pay from "./pages/Pay";
import Success from "./pages/Success";
import "./App.css";
import { Home, Product, ProductList, Login, Register, Cart } from "./pages";

const App = () => {
  const user =true
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/login" element={user ? <Navigate to="/"></Navigate>:<Login />} />
        <Route path="/register" element={user?<Navigate to="/"/>:<Register />} />
        <Route path="/success" element={<Success />} />
        <Route path="/pay" element={<Pay />} />
      </Routes>
    </div>
  );
};

export default App;
