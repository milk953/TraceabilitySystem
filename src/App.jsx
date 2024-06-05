import React, { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Sheet_Master from "./Page/Sheet Structure Master/SheetMaster";
import Serial_Master from "./Page/Serial Structure Master/SerialMaster";
import Product_master from "./Page/Product Master/ProductMaster";

import FINConncetSht from './Page/FIN Connect Sht & Pcs/ScanSMTSerialShtFINManySht'
import ScanSMTRoollSht from "./Page/Scan SMTRoollSht/ScanSMTRollSht";
import ReflowControlTime from "./Page/ScanSheetReflowTime/ScanSheetReflowTime";
import ScanSheetMOTTime from "./Page/ScanSheetMOTTime/ScanSheetMOTTime";
import Homepage from "./Page/Homepage/Homepage";
import Login from "./Page/Login/Login"; 
import ConfirmBarcodeGrade from "./Page/Confirm Barcode Grade/ConfirmBarcodeGrade";

import axios from "axios";
const backendUrl = "http://10.17.74.226:3001";

axios.defaults.baseURL = backendUrl;
const App = () => {
  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/SheetMaster" element={<Sheet_Master />} />
          <Route path="/SerialMaster" element={<Serial_Master />} />
          <Route path="/ProductMaster" element={<Product_master />} />
          <Route path="/ScanSMTRollSht" element={<ScanSMTRoollSht />} />
          <Route path="/ScanSMTSerialShtFINManySht" element={<FINConncetSht />} />
          <Route path="/ScanSheetReflowTime" element={<ReflowControlTime />} />
          <Route path="/ScanSheetMOTTime" element={<ScanSheetMOTTime />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/ConfirmBarcodeGrade" element={<ConfirmBarcodeGrade />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
};

export default App;
