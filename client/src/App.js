import React from "react";
import { Route, Routes } from "react-router-dom";
import Pay from "./pages/Pay";
import Success from "./pages/Success";
import './App.css'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/pay" element={<Pay />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </div>
  );
};

export default App;
