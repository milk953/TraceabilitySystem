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
// import TestApi from "./testApi";
import axios from "axios";
import ScanSheetBakeTime from "./Page/ScanSheetBakeTime/ScanSheetBakeTime";
import ScanSheetInspect from "./Page/ScanSheetInspect/ScanSheetInspect";
import ScanSheetInspectXOut from "./Page/ScanSheetInspectXOut/ScanSheetInspectXOut";
import ScanSMTSerialRecordTime from "./Page/ScanSMTSerialRecordTime/ScanSMTSerialRecordTime";
import ScanSheetOvenTime from "./Page/ScanSheetOvenTime/ScanSheetOvenTime";
import Reject from "./Page/Reject/Reject";
import ScanSheetDispenserTime from "./Page/ScanSheetDispenserTime/ScanSheetDispenserTime";
import ELTmaster from './Page/ELT_Master/ELTmaster'
import ScanSMTPlasmaStopStart from "./Page/ScanSMTPlasmaStopStart/ScanSMTPlasmaStopStart";
import SheetBincheking from "./Page/SheetBinChecking/SheetBinCheck"
import ScanSMTSerialSpotHeat from "./Page/ScanSMTSerialSpotHeat/ScanSMTSerialSpotHeat"
import ScanSMTSerialControlTime from "./Page/ScanSMTSerialControlTime/ScanSMTSerialControlTime";
import ScanSMTSerialShtConfirm from "./Page/ScanSMTSerialShtConfirm/ScanSMTSerialShtConfirm";



const backendUrl = import.meta.env.VITE_SERVICE_URL;

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
          <Route path='/ScanSheetInspect' element={<ScanSheetInspect />} />
          <Route path='/ScanSheetInspectXOut' element={<ScanSheetInspectXOut />} />
          <Route path='/ScanSMTSerialRecordTime' element={<ScanSMTSerialRecordTime />} />
          <Route path='/ScanSMTSerialSpotHeat' element={<ScanSMTSerialSpotHeat />} />
          <Route path='/ScanSMTSerialControlTime' element={<ScanSMTSerialControlTime />} /> 
          <Route path='/ScanSMTSerialShtConfirm' element={<ScanSMTSerialShtConfirm />} />

          {/* View Data */}
          <Route path='/ELTmaster' element={<ELTmaster />} />
          <Route path='/ScanSMTPlasmaStopStart' element={<ScanSMTPlasmaStopStart />} />          
          <Route path='/SheetBincheking' element={<SheetBincheking />} />  

          {/* Maintenance */}
          <Route path='/ScanSheetBakeTime' element={<ScanSheetBakeTime />} />
          <Route path='/ScanSheetOvenTime' element={<ScanSheetOvenTime />} />
          <Route path="/ScanSheetReflowTime" element={<ReflowControlTime />} />
          <Route path="/ScanSheetDispenserTime" element={<ScanSheetDispenserTime />} />          
          <Route path="/Reject" element={<Reject />} />
        </Routes>
      </BrowserRouter>
  );
};

export default App;
