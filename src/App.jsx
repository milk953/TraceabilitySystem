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
import ScanSMTSerialPcsBoxOnlyGood from "./Page/ScanSMTSerialPcsBoxOnlyGood/ScanSMTSerialPcsBoxOnlyGood"
import ScanSMTSerialPcsNG from "./Page/Master Final Gate/ScanSMTSerialPcsNG";
import ScanSMTSerialPcsAutoTray from "./Page/ScanSMTSerialPcsAutoTray/ScanSMTSerialPcsAutoTray";
import ScanSMTConnectRollConfirm from "./Page/ScanSMTConnectRollConfirm/ScanSMTConnectRollConfirm";
// import Prdmaster from "./Page/ProductMasterMay/prdmaster";
 
 
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
        <Route path="/TraceabilitySystem" element={<Homepage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/TraceabilitySystem/SheetMaster" element={<Sheet_Master />} />
            <Route path="/TraceabilitySystem/SerialMaster" element={<Serial_Master />} />
            <Route path="/TraceabilitySystem/ProductMaster" element={<Product_master />} />
            <Route path="/TraceabilitySystem/ScanSMTRollSht" element={<ScanSMTRoollSht />} />
            <Route path="/TraceabilitySystem/ScanSMTSerialShtFINManySht" element={<FINConncetSht />} />          
            <Route path="/TraceabilitySystem/ScanSheetMOTTime" element={<ScanSheetMOTTime />} />          
            <Route path="/TraceabilitySystem/ConfirmBarcodeGrade" element={<ConfirmBarcodeGrade />} />
            <Route path='/TraceabilitySystem/ScanSheetInspect' element={<ScanSheetInspect />} />
            <Route path='/TraceabilitySystem/ScanSMTSerialRecordTime' element={<ScanSMTSerialRecordTime />} />
            <Route path='/TraceabilitySystem/ScanSMTSerialSpotHeat' element={<ScanSMTSerialSpotHeat />} />
            <Route path='/TraceabilitySystem/ScanSMTSerialControlTime' element={<ScanSMTSerialControlTime />} />
            <Route path='/TraceabilitySystem/ScanSMTSerialShtConfirm' element={<ScanSMTSerialShtConfirm />} />
            <Route path='/TraceabilitySystem/AVIConfirm' element = {<AVIManualConfirm />} />
            <Route path='/TraceabilitySystem/ScanSMTSerialPcs' element = {<ScanSMTSerialPcsChrome />} />
            <Route path='/TraceabilitySystem/ScanSMTSerialPcsBoxOnlyGood' element = {<ScanSMTSerialPcsBoxOnlyGood />} />
            <Route path='/TraceabilitySystem/ScanSMTSerialPcsAutoTray' element = {<ScanSMTSerialPcsAutoTray />} />
            {/* <Route path="/TraceabilitySystem/Prdmaster" element={<Prdmaster/>} /> */}
 
            {/* View Data */}
            <Route path='/TraceabilitySystem/ELTmaster' element={<ELTmaster />} />
            <Route path='/TraceabilitySystem/ScanSMTPlasmaStopStart' element={<ScanSMTPlasmaStopStart />} />          
            <Route path='/TraceabilitySystem/SheetBincheking' element={<SheetBincheking />} />
            <Route path='/TraceabilitySystem/ScanSMTSerialBackendConfirm' element={<ScanSMTSerialBackendConfirm />} />  
 
            {/* Maintenance */}
            <Route path='/TraceabilitySystem/ScanSheetBakeTime' element={<ScanSheetBakeTime />} />
            <Route path='/TraceabilitySystem/ScanSheetOvenTime' element={<ScanSheetOvenTime />} />
            <Route path="/TraceabilitySystem/ScanSheetReflowTime" element={<ReflowControlTime />} />
            <Route path="/TraceabilitySystem/ScanSheetDispenserTime" element={<ScanSheetDispenserTime />} />          
            <Route path="/TraceabilitySystem/Reject" element={<Reject />} />
            <Route path="/TraceabilitySystem/ELTType" element={<SerialTestType />} />
            <Route path="/TraceabilitySystem/ReJudgement" element={<ReJudgement />} />
            <Route path="/TraceabilitySystem/ScanSMTSerialPcsNG" element={<ScanSMTSerialPcsNG />} />
            <Route path="/TraceabilitySystem/ScanAutoBendingTime" element={<ScanAutoBendingTime />} />

            <Route path="/TraceabilitySystem/ScanSMTConnectRollConfirm" element={<ScanSMTConnectRollConfirm />} />
            
          </Route>
        </Routes>
      </BrowserRouter>
  );
};
 
export default App;