import React from "react";
import { Route, Routes } from "react-router-dom";
import Pay from "./pages/Pay";
import Success from "./pages/Success";
import "./App.css";
import { Home, Product, ProductList, Login, Register } from "./pages";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/product" element={<Product />} />
        <Route path="/" element={<Product  />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/success" element={<Success />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
