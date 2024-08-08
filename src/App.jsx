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
import SerialTestType from "./Page/ELT_Type/SerialTestType";
import AVIManualConfirm from "./Page/AVIConfirm/AVIManualConfirm";
import ScanSMTSerialShtConfirm from "./Page/ScanSMTSerialShtConfirm/ScanSMTSerialShtConfirm";
import ScanSMTSerialBackendConfirm from "./Page/ScanSMTSerialBackendConfirm/ScanSMTSerialBackendConfirm";
import ScanAutoBendingTime from "./Page/ScanAutoBendingTime/ScanAutoBendingTime";
import PrivateRoute from "./PrivateRoute";
import ScanSMTSerialPcsChrome from "./Page/ScanSMTSerialPcsChrome/ScanSMTSerialPcsChrome";
import ReJudgement from "./Page/ReJudgement/ReJudgement";
import ScanSMTSerialPcsBoxOnlyGood from "./Page/PackingGateOnlyGood/PackingGateOnlyGood"




const backendUrl = import.meta.env.VITE_SERVICE_URL;

axios.defaults.baseURL = backendUrl;
const App = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    checkToken(token);
  });
  const checkToken = async (token) => {
    await axios
      .post(
        "/api/VerifyToken",
        {
          token: token,
        },
        {
          validateStatus: function (status) {
            return true;
          },
        }
      )
      .then((res) => {
        if (res.status == 200) {
          return;
        } else if (res.status == 401) {
          localStorage.removeItem("Username");
          localStorage.removeItem("Lastname");
          localStorage.removeItem("UserLogin");
          localStorage.removeItem("IDCode");
          localStorage.removeItem("token");
        }
      });
  };
  return (
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Homepage />} />
          <Route element={<PrivateRoute />}>
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
            <Route path='/AVIConfirm' element = {<AVIManualConfirm />} /> 
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
            <Route path='/AVIConfirm' element = {<AVIManualConfirm />} /> 
            <Route path='/ScanSMTSerialPcs' element = {<ScanSMTSerialPcsChrome />} /> 
            <Route path='/ScanSMTSerialPcsBoxOnlyGood' element = {<ScanSMTSerialPcsBoxOnlyGood />} /> 

            {/* View Data */}
            <Route path='/ELTmaster' element={<ELTmaster />} />
            <Route path='/ScanSMTPlasmaStopStart' element={<ScanSMTPlasmaStopStart />} />          
            <Route path='/SheetBincheking' element={<SheetBincheking />} />
            <Route path='/ScanSMTSerialBackendConfirm' element={<ScanSMTSerialBackendConfirm />} />  

            {/* Maintenance */}
            <Route path='/ScanSheetBakeTime' element={<ScanSheetBakeTime />} />
            <Route path='/ScanSheetOvenTime' element={<ScanSheetOvenTime />} />
            <Route path="/ScanSheetReflowTime" element={<ReflowControlTime />} />
            <Route path="/ScanSheetDispenserTime" element={<ScanSheetDispenserTime />} />          
            <Route path="/Reject" element={<Reject />} />
            <Route path="/ELTType" element={<SerialTestType />} />
            <Route path="/ReJudgement" element={<ReJudgement />} />

            <Route path="/ScanAutoBendingTime" element={<ScanAutoBendingTime />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
};

export default App;
