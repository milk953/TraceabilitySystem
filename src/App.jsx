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
import ConfirmBarcodeGrade from "./Page/Confirm Barcode Grade/ConfirmBarcodeGrade";
// import Login from "./Page/Login/Login"; 
// import TestApi from "./testApi";
import axios from "axios";
import ScanSheetBakeTime from "./Page/ScanSheetBakeTime/ScanSheetBakeTime";
import ScanSheetInspect from "./Page/ScanSheetInspect/ScanSheetInspect";
import ScanSheetInspectXOut from "./Page/ScanSheetInspectXOut/ScanSheetInspectXOut";
import ScanSheetOvenTime from "./Page/ScanSheetOvenTime/ScanSheetOvenTime";
import Reject from "./Page/Reject/Reject";
// const backendUrl = "http://10.17.74.228:3001";
const backendUrl = import.meta.env.VITE_SERVICE_URL;
console.log(backendUrl);

axios.defaults.baseURL = backendUrl;
const App = () => {
  return (
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Homepage />} />
          <Route path="/SheetMaster" element={<Sheet_Master />} />
          <Route path="/SerialMaster" element={<Serial_Master />} />
          <Route path="/ProductMaster" element={<Product_master />} />
          <Route path="/ScanSMTRollSht" element={<ScanSMTRoollSht />} />
          <Route path="/ScanSMTSerialShtFINManySht" element={<FINConncetSht />} />          
          <Route path="/ScanSheetMOTTime" element={<ScanSheetMOTTime />} />          
          <Route path="/ConfirmBarcodeGrade" element={<ConfirmBarcodeGrade />} />
          <Route path='/ScanSheetBakeTime' element={<ScanSheetBakeTime />} />
          <Route path='/ScanSheetInspect' element={<ScanSheetInspect />} />
          <Route path='/ScanSheetInspectXOut' element={<ScanSheetInspectXOut />} />          

          {/* Maintenance */}
          <Route path='/ScanSheetOvenTime' element={<ScanSheetOvenTime />} />
          <Route path="/ScanSheetReflowTime" element={<ReflowControlTime />} />
          <Route path="/Reject" element={<Reject />} />
        </Routes>
      </BrowserRouter>
  );
};

export default App;
