import React, { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Sheet_Master from "./Page/Sheet Structure Master/SheetMaster";
import Serial_Master from "./Page/Serial Structure Master/SerialMaster";
import Product_master from "./Page/Product Master/ProductMaster";
// import Login from "./Login/Login"; #LOGIN PAGE
import axios from "axios";

const backendUrl = "http://localhost:3080";
axios.defaults.baseURL = backendUrl;
const App = () => {
  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/SheetMaster" element={<Sheet_Master />} />
          <Route path="/SerialMaster" element={<Serial_Master />} />
          <Route path="/ProductMaster" element={<Product_master />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
};

export default App;
