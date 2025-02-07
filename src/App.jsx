import React, { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Sheet_Master from "./Page/Sheet Structure Master/SheetMaster";
import Serial_Master from "./Page/Serial Structure Master/SerialMaster";
import Product_master from "./Page/Product Master/ProductMaster";
import FINConncetSht from './Page/FIN Connect Sht & Pcs/ScanSMTSerialShtFINManySht'
import ScanSMTRoollSht from "./Page/Connect Roll Leaf/ScanSMTRollSht";
import ReflowControlTime from "./Page/ScanSheetReflowTime/ScanSheetReflowTime";
import ScanSheetMOTTime1 from "./Page/ScanSheetMOTTime1/ScanSheetMOTTime1";
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
import ScanSMTSerialPcsChrome from "./Page/Final Gate/ScanSMTSerialPcsChrome";
import ReJudgement from "./Page/ReJudgement/ReJudgement";
import ScanSMTSerialPcsBoxOnlyGood from "./Page/ScanSMTSerialPcsBoxOnlyGood/ScanSMTSerialPcsBoxOnlyGood"
import ScanSMTSerialPcsNG from "./Page/Master Final Gate/ScanSMTSerialPcsNG";
import ScanSMTSerialPcsAutoTray from "./Page/ScanSMTSerialPcsAutoTray/ScanSMTSerialPcsAutoTray";
import ScanSMTConnectRollConfirm from "./Page/ScanSMTConnectRollConfirm/ScanSMTConnectRollConfirm";
import ScanSMTSerialSht from "./Page/ScanSMTSerialSht/ScanSMTSerialSht";
import PackingGate from "./Page/ScanSMTSerialPcsBox/ScanSMTSerialPcsBox"
import ScanSheetMOTTime2 from "./Page/ScanSheetMOTTime2/ScanSheetMOTTime2";
import ScanSMTSerialPcsAuto from "./Page/Final Gate Auto/ScanSMTSerialPcsAuto"
import ScanSMTConnectShtConfirm from "./Page/ScanSMTConnectShtConfirm/ScanSMTConnectShtConfirm";
import ScanSMTSerialShtMaster from "./Page/ScanSMTSerialShtMaster/ScanSMTSerialShtMaster";
import PackingConfirmSheet from './Page/ScanSMTPackingConfirm/ScanSMTPackingConfirm'
import Change_PartialNo from './Page/Replace Partial No/Change_PartialNo'
import Change_Serial from './Page/Change_Serial/Change_Serial';
import ScanSheetAOIXrayConfirm from './Page/AOI Confirm Result/ScanSheetAOIXrayConfirm';
import ScanSMTSerialPcsAutoTrayConfirm from './Page/Confirm Final Only Good/ScanSMTSerialPcsAutoTrayConfirm';
import ScanSMTSerialShtShtCopy from './Page/FIN Duplicate Sht&Pcs/ScanSMTSerialShtCopy';
import FVIBadmarkMonitoring from './Page/FVI Badmark Monitoring/rpt_LotFVIBadmarkView';
import SerialReplaceRecordTime from './Page/Serial Replace Record Time/ScanSMTSerialRecordTimeReplace';
import SMTDeleteData from "./Page/SMTDeleteData/SMTDeleteData";
import ScanAVIConfirmResult from "./Page/ScanAVIConfirmResult/ScanAVIConfirmResult";
import PieceTraceView from "./Page/PieceTraceView/PieceTraceView";
import LotTraceView from "./Page/LotTraceView/LotTraceView";
import RollTraceView from "./Page/RollTraceView/rollTraceView";
import LotRollLeafNo from "./Page/LotRollLeafNo/LotRollLeafNo";
import SheetTraceView from './Page/SheetTraceView/rpt_SheetTraceView'
import ScanSMTSerialXrayConfirm from "./Page/ScanSMTSerialXrayConfirm/ScanSMTSerialXrayConfirm";
import LotSheetNo from "./Page/LotSheetNo/LotSheetNo";
import SheetBadMarkView from "./Page/SheetBadMarkReport/SheetBadMarkView";
import ScanSerialNo from "./Page/P1 Record Serial No/ScanSerialNo";
import FinalGate_History from "./Page/FinalGate_History/FinalGate_History";
import MaterialTrace from "./Page/Material_Trace/Material_Trace";
import AOICOAResult2 from "./Page/Result/Result";
import SPIResult from "./Page/Result/Result";
import AOIResult2 from "./Page/Result/Result";
import OSTResult from "./Page/Result/Result";
import PREResult2 from "./Page/Result/Result";
import XRayResultN1 from "./Page/Result/Result";
import XRayResult from "./Page/Result/Result";
import SPIAOITimeView from "./Page/SPIAOITimeView/SPIAOITimeView";
import AOIResult from "./Page/AOI_Result/AOI_Result";
import OSTResultPiece from "./Page/OSTResultPiece/OSTResultPiece";
import PREResult from "./Page/PREResult/PREResult";
import RejectResult from "./Page/RejectResult/RejectResult";
import LOT_Trace from "./Page/LOTTrace/LOTTrace";
import SheetBarcodeGradeView from "./Page/SheetBarcodeGradeView/SheetBarcodeGradeView";
import TouchUpResult from "./Page/TouchUpResult/TouchUpResult";
import CheckerResult from "./Page/CheckerResult/CheckerResult";
import AOICOAResult from "./Page/AOICOAResult/AOICOAResult";
import ScanSMTSerialPcsP1 from "./Page/P1 Final Gate/ScanSMTSerialPcsP1";
import SheetInspection from "./Page/SheetInspection/SheetInspection";
import ScanAOISheetNo from "./Page/ScanAOISheetNo/ScanAOISheetNo";
import ScanConfirmMagazineP1 from "./Page/ScanConfirmMagazineP1/ScanConfirmMagazineP1";
import P1ConnectBoard from "./Page/P1 Connect Board/P1ConnectBoard";
import AOIManualConfirmP1 from "./Page/AOIManualConfirmP1/AOIManualConfirmP1";
import ScanSMTConfirmMOTP1 from "./Page/ScanSMTConfirmMOTP1/ScanSMTConfirmMOTP1";
import {LoadingProvider} from "./loading/fn_loading";
import Scantest from "./Page/Scantest/Scantest";
import TestFin from "./Page/TEST FIN Connect Sht & Pcs/ScanSMTSerialShtFINManySht";
// import Prdmaster from "./Page/ProductMasterMay/prdmaster";
 
// const backendUrl = import.meta.env.VITE_SERVICE_URL;
const backendUrl = `http://${window.location.hostname}:3001`;
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
    <LoadingProvider>
      <BrowserRouter>
        <Routes>
        <Route path="/TraceabilitySystem" element={<Homepage />} />
        <Route path="/TraceabilitySystem/TestFin" element={<TestFin />} />
        <Route path="/TraceabilitySystem/Scantest" element={<Scantest />} />
        {/* No Login */}
        {/* Work */}
        <Route path='/TraceabilitySystem/ScanSMTSerialSht' element = {<ScanSMTSerialSht />} />
        <Route path="/TraceabilitySystem/ScanSMTSerialShtFINManySht" element={<FINConncetSht />} /> 
        <Route path='/TraceabilitySystem/ScanSMTSerialShtCopy' element = {<ScanSMTSerialShtShtCopy />} />
        <Route path='/TraceabilitySystem/ScanSMTSerialRecordTime' element={<ScanSMTSerialRecordTime />} />
        <Route path="/TraceabilitySystem/ScanSMTRollSht" element={<ScanSMTRoollSht />} />
        <Route path='/TraceabilitySystem/ScanSMTSerialPcs' element = {<ScanSMTSerialPcsChrome />} />
        <Route path='/TraceabilitySystem/ScanSMTSerialPcsAuto' element = {<ScanSMTSerialPcsAuto/>} />  
        <Route path='/TraceabilitySystem/ScanSMTSerialPcsAutoTray' element = {<ScanSMTSerialPcsAutoTray />} />
        <Route path='/TraceabilitySystem/ScanSMTSerialShtConfirm' element={<ScanSMTSerialShtConfirm />} />
        <Route path='/TraceabilitySystem/ScanSMTSerialPcsBox' element = {<PackingGate />} />
        <Route path='/TraceabilitySystem/ScanSMTSerialControlTime' element={<ScanSMTSerialControlTime />} />
        <Route path="/TraceabilitySystem/ConfirmBarcodeGrade" element={<ConfirmBarcodeGrade />} />
        <Route path="/TraceabilitySystem/ScanSMTConnectRollConfirm" element={<ScanSMTConnectRollConfirm />} />
        <Route path='/TraceabilitySystem/ScanSMTConnectShtConfirm' element = {<ScanSMTConnectShtConfirm />} />
        <Route path='/TraceabilitySystem/ScanSMTPackingConfirm' element = {<PackingConfirmSheet/>} />  
        <Route path='/TraceabilitySystem/Change_PartialNo' element = {<Change_PartialNo/>} />  
        <Route path='/TraceabilitySystem/ScanSMTSerialPcsAutoTrayConfirm' element = {<ScanSMTSerialPcsAutoTrayConfirm />} />
        <Route path='/TraceabilitySystem/ScanSMTSerialPcsBoxOnlyGood' element = {<ScanSMTSerialPcsBoxOnlyGood />} />
        <Route path='/TraceabilitySystem/ScanSMTSerialSpotHeat' element={<ScanSMTSerialSpotHeat />} />
        {/* Maintenance */}
        <Route path='/TraceabilitySystem/ScanSheetInspect' element={<ScanSheetInspect />} />
        <Route path="/TraceabilitySystem/Change_Serial" element={<Change_Serial />} />
        <Route path="/TraceabilitySystem/Reject" element={<Reject />} />
        <Route path="/TraceabilitySystem/ReJudgement" element={<ReJudgement />} />
        <Route path="/TraceabilitySystem/ScanAVIConfirmResult" element={<ScanAVIConfirmResult />} />
        <Route path="/TraceabilitySystem/ScanSheetMOTTime" element={<ScanSheetMOTTime1 />} />  
        <Route path="/TraceabilitySystem/ScanSheetMOTTime2" element={<ScanSheetMOTTime2 />} />   
        <Route path="/TraceabilitySystem/ScanSheetReflowTime" element={<ReflowControlTime />} />
        <Route path="/TraceabilitySystem/ScanSheetAOIXrayConfirm" element={<ScanSheetAOIXrayConfirm />} />
        <Route path="/TraceabilitySystem/ScanSMTSerialShtMaster" element={<ScanSMTSerialShtMaster />} />
        <Route path="/TraceabilitySystem/ScanSMTSerialPcsNG" element={<ScanSMTSerialPcsNG />} />
        <Route path="/TraceabilitySystem/SerialReplaceRecordTime" element={<SerialReplaceRecordTime />} />
        <Route path='/TraceabilitySystem/ScanSheetBakeTime' element={<ScanSheetBakeTime />} />
        <Route path="/TraceabilitySystem/ScanSheetDispenserTime" element={<ScanSheetDispenserTime />} />          
        <Route path='/TraceabilitySystem/ScanSheetOvenTime' element={<ScanSheetOvenTime />} />
        <Route path="/TraceabilitySystem/ScanAutoBendingTime" element={<ScanAutoBendingTime />} />
        <Route path="/TraceabilitySystem/ScanSMTSerialXrayConfirm" element={<ScanSMTSerialXrayConfirm />} />
        {/* View Data */}
        <Route path='/TraceabilitySystem/PieceTraceView' element={<PieceTraceView />} />
        <Route path="/TraceabilitySystem/SheetTraceView" element={<SheetTraceView />} />       
        <Route path="/TraceabilitySystem/LotTraceView" element={<LotTraceView />} />
        <Route path="/TraceabilitySystem/RollTraceView" element={<RollTraceView />} />
        <Route path="/TraceabilitySystem/MaterialTrace" element={<MaterialTrace />} />
        <Route path="/TraceabilitySystem/SheetInspection" element={<SheetInspection />} />
        <Route path="/TraceabilitySystem/SheetBadMarkView" element={<SheetBadMarkView />} />
        <Route path="/TraceabilitySystem/SPIAOITimeView" element={<SPIAOITimeView />} />
        <Route path="/TraceabilitySystem/SheetBarcodeGradeView" element={<SheetBarcodeGradeView />} />
        <Route path="/TraceabilitySystem/ScanAOISheetNo" element={<ScanAOISheetNo />} />
        <Route path='/TraceabilitySystem/SheetBincheking' element={<SheetBincheking />} />
        <Route path="/TraceabilitySystem/ScanSerialNo" element={<ScanSerialNo />} />
        <Route path="/TraceabilitySystem/ScanConfirmMagazineP1" element={<ScanConfirmMagazineP1 />} />
        <Route path="/TraceabilitySystem/ScanSMTConfirmMOTP1" element={<ScanSMTConfirmMOTP1 />} />
        <Route path="/TraceabilitySystem/rpt_LotFVIBadmarkView" element={<FVIBadmarkMonitoring />} />   
        <Route path="/TraceabilitySystem/ScanSMTSerialPcsP1" element={<ScanSMTSerialPcsP1 />} />
        <Route path='/TraceabilitySystem/ScanSMTSerialBackendConfirm' element={<ScanSMTSerialBackendConfirm />} />


               
        {/* Result Page */}
        <Route path="/TraceabilitySystem/AOICOAResult2" element={<AOICOAResult2 />} />
        <Route path="/TraceabilitySystem/SPIResult" element={<SPIResult />} />
        <Route path="/TraceabilitySystem/AOIResult2" element={<AOIResult2 />} />
        <Route path="/TraceabilitySystem/OSTResult" element={<OSTResult />} />
        <Route path="/TraceabilitySystem/PREResult2" element={<PREResult2 />} />
        <Route path="/TraceabilitySystem/XRayResultN1" element={<XRayResultN1 />} />
        <Route path="/TraceabilitySystem/XRayResult" element={<XRayResult />} />
        <Route path="/TraceabilitySystem/AOIResult" element={<AOIResult />} />
        <Route path="/TraceabilitySystem/OSTResultPiece" element={<OSTResultPiece />} />
        <Route path="/TraceabilitySystem/PREResult" element={<PREResult />} />
        <Route path="/TraceabilitySystem/RejectResult" element={<RejectResult />} />
        <Route path="/TraceabilitySystem/TouchUpResult" element={<TouchUpResult />} />
        <Route path="/TraceabilitySystem/CheckerResult" element={<CheckerResult />} />
        <Route path="/TraceabilitySystem/AOICOAResult" element={<AOICOAResult />} />
        {/* ไม่รู้ */}
        <Route path="/TraceabilitySystem/SheetMaster" element={<Sheet_Master />} />
        <Route path="/TraceabilitySystem/SerialMaster" element={<Serial_Master />} />
        <Route path='/TraceabilitySystem/LOT_Trace' element = {<LOT_Trace />} />
        <Route path="/TraceabilitySystem/SPIAOITimeView" element={<SPIAOITimeView />} />
        <Route path='/TraceabilitySystem/FinalGate_History' element={<FinalGate_History />} />  
        <Route path="/TraceabilitySystem/LotSheetNo" element={<LotSheetNo />} />  
        <Route path="/TraceabilitySystem/P1ConnectBoard" element={<P1ConnectBoard />} />

        <Route element={<PrivateRoute />}>
        {/* work */}
        <Route path='/TraceabilitySystem/AVIConfirm' element = {<AVIManualConfirm />} />
        <Route path='/TraceabilitySystem/ScanSMTPlasmaStopStart' element={<ScanSMTPlasmaStopStart />} />          
        {/* Maintenance */}
        <Route path="/TraceabilitySystem/ProductMaster" element={<Product_master />} />
        <Route path="/TraceabilitySystem/ELTType" element={<SerialTestType />} />
        {/* View Data */}
        <Route path='/TraceabilitySystem/ELTmaster' element={<ELTmaster />} />
        <Route path="/TraceabilitySystem/SMTDeleteData" element={<SMTDeleteData />} />
        <Route path="/TraceabilitySystem/LotRollLeafNo" element={<LotRollLeafNo />} />  
        <Route path="/TraceabilitySystem/AOIManualConfirmP1" element={<AOIManualConfirmP1 />} />
       
        

        {/* <Route path="/TraceabilitySystem/LotTraceView" element={<LotTraceView />} /> */}
        {/* P1 */}
        </Route>
        </Routes>
      </BrowserRouter>
      </LoadingProvider>
  );
};
 
export default App;