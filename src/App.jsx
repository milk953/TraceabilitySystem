import React, { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Sheet_Master from "./Page/Sheet Structure Master/SheetMaster";
import Serial_Master from "./Page/Serial Structure Master/SerialMaster";
import Product_master from "./Page/Product Master/ProductMaster";

import FINConncetSht from './Page/FIN Connect Sht & Pcs/ScanSMTSerialShtFINManySht'
import ScanSMTRoollSht from "./Page/Scan SMTRoollSht/ScanSMTRoollSht";
import Login from "./Login/Login"; 
import axios from "axios";
const backendUrl = "http://10.17.74.228:3001";
axios.defaults.baseURL = backendUrl;
const App = () => {
  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Login />} />
          <Route path="/SheetMaster" element={<Sheet_Master />} />
          <Route path="/SerialMaster" element={<Serial_Master />} />
          <Route path="/ProductMaster" element={<Product_master />} />
          <Route path="/ScanSMTRoollSht" element={<ScanSMTRoollSht />} />
          <Route path="/ScanSMTSerialShtFINManySht" element={<FINConncetSht />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
};

export default App;
