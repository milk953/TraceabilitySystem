import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from 'xlsx';
import swal from "sweetalert";
import Swal from 'sweetalert2';

function fn_ProductMaster() {

  const [txtProduct, settxtProduct] = useState("");
  const [txtUpdateCount, settxtUpdateCount] = useState("");
  const [txtChkStartDig, settxtChkStartDig] = useState("");
  const [txtShtLot, settxtShtLot] = useState("");
  const [txtChkEndDig, settxtChkEndDig] = useState("");
  const [txtPcsSht, settxtPcsSht] = useState("");
  const [txtChkWord, settxtChkWord] = useState("");
  const [selSheetType, setselSheetType] = useState("");
  const [txtSerialLength, settxtSerialLength] = useState("");
  const [selDateType, setselDateType] = useState("");
  const [txtPcsScan, settxtPcsScan] = useState("");
  const [txtEngCode, settxtEngCode] = useState("");
  const [txtPcsTray, settxtPcsTray] = useState("");
  const [txtRevision, settxtRevision] = useState("");
  const [txtSerialFormat, settxtSerialFormat] = useState("");
  const [selLaminationSide, setselLaminationSide] = useState("");
  const [txtSheetFormat, settxtSheetFormat] = useState("");
  const [txtShtScan, settxtShtScan] = useState("");
  const [txtShtLaser, settxtShtLaser] = useState("");
  const [cbxReqLot, setcbxReqLot] = useState("");
  const [cbxReqVendor, setcbxReqVendor] = useState("");
  const [cbxReqConfig, setcbxReqConfig] = useState("");
  const [txtConfigWord, settxtConfigWord] = useState("");
  const [txtConfigStart, settxtConfigStart] = useState("");
  const [txtConfigEnd, settxtConfigEnd] = useState("");
  const [cbxReqConfigRun, setcbxReqConfigRun] = useState("");
  const [txtDupStart, settxtDupStart] = useState("");
  const [txtDupEnd, settxtDupEnd] = useState("");
  const [txtAddInfo, settxtAddInfo] = useState("");
  const [txtPassWord, settxtPassWord] = useState("");
  const [txtAbbr, settxtAbbr] = useState("");
  const [txtSerialStartCode, settxtSerialStartCode] = useState("");
  const [cbxReqCheckPrdSht, setcbxReqCheckPrdSht] = useState("");
  const [txtCheckPrdShtFrom, settxtCheckPrdShtFrom] = useState("");
  const [txtCheckPrdShtTo, settxtCheckPrdShtTo] = useState("");
  const [selectedrbt, setselectedrbt] = useState("");
  const [cbxReqCheckLotSht, setcbxReqCheckLotSht] = useState("");
  const [txtCheckLotShtFrom, settxtCheckLotShtFrom] = useState("");
  const [txtCheckLotShtTo, settxtCheckLotShtTo] = useState("");
  const [selStatus, setselStatus] = useState("ACTIVE");
  const [selCheckIC, setselCheckIC] = useState("N");
  const [cbxReqControlPlasma, setcbxReqControlPlasma] = useState("");
  const [txtPlasmaTime, settxtPlasmaTime] = useState("");
  const [selectedrbtPDS, setselectedrbtPDS] = useState("");
  const [cbxReqUpdatePlasma, setcbxReqUpdatePlasma] = useState("");
  const [cbxPlasmaNotStartELT, setcbxPlasmaNotStartELT] = useState("");
  const [cbxPlasmaNotShowTime, setcbxPlasmaNotShowTime] = useState("");
  const [cbxReqStartSeqCode, setcbxReqStartSeqCode] = useState("");
  const [txtStartSeqCode, settxtStartSeqCode] = useState("");
  const [txtStartSeqDigitFrom, settxtStartSeqDigitFrom] = useState("");
  const [txtStartSeqDigitTo, settxtStartSeqDigitTo] = useState("");
  const [cbxReqSheetELT, setcbxReqSheetELT] = useState("");
  const [cbxReqSPIAOI, setcbxReqSPIAOI] = useState("");
  const [cbxReqVendorLot, setcbxReqVendorLot] = useState("");
  const [txtVendorLotLength, settxtVendorLotLength] = useState("");
  const [cbxReqDateProc, setcbxReqDateProc] = useState("");
  const [txtDateFromProc, settxtDateFromProc] = useState("");
  const [cbxReqCheckWeekCode, setcbxReqCheckWeekCode] = useState("");
  const [cbxReqSheetMC, setcbxReqSheetMC] = useState("");
  const [txtWeekCodeStart, settxtWeekCodeStart] = useState("");
  const [txtWeekCodeEnd, settxtWeekCodeEnd] = useState("");
  const [cbxReqConRollLeaf, setcbxReqConRollLeaf] = useState("");
  const [txtLeafScan, settxtLeafScan] = useState("");
  const [txtRollNoLength, settxtRollNoLength] = useState("");
  const [txtLeafNoLength, settxtLeafNoLength] = useState("");
  const [cbxLeafReqSerial, setcbxLeafReqSerial] = useState("");
  const [cbxReqCheckPrdRoll, setcbxReqCheckPrdRoll] = useState("");
  const [txtCheckRollPrdFrom, settxtCheckRollPrdFrom] = useState("");
  const [txtCheckRollPrdTo, settxtCheckRollPrdTo] = useState("");
  const [txtCheckRollPrdWord, settxtCheckRollPrdWord] = useState("");
  const [cbxRollReqCheckPrdLeaf, setcbxRollReqCheckPrdLeaf] = useState("");
  const [txtRollCheckPrdLeafFrom, settxtRollCheckPrdLeafFrom] = useState("");
  const [txtRollCheckPrdLeafTo, settxtRollCheckPrdLeafTo] = useState("");
  const [cbxRollReqCheckLotLeaf, setcbxRollReqCheckLotLeaf] = useState("");
  const [txtRollCheckLotLeafFrom, settxtRollCheckLotLeafFrom] = useState("");
  const [txtRollCheckLotLeafTo, settxtRollCheckLotLeafTo] = useState("");
  const [cbxReqConShtPcsRoll, setcbxReqConShtPcsRoll] = useState("");
  const [cbxReqPreAOIF, setcbxReqPreAOIF] = useState("");
  const [cbxReqPreAOIB, setcbxReqPreAOIB] = useState("");
  const [cbxReqAOIF, setcbxReqAOIF] = useState("");
  const [cbxReqAOIB, setcbxReqAOIB] = useState("");
  const [cbxReqSPIF, setcbxReqSPIF] = useState("");
  const [cbxReqSPIB, setcbxReqSPIB] = useState("");
  const [cbxReqAOICoatF, setcbxReqAOICoatF] = useState("");
  const [cbxReqAOICoatB, setcbxReqAOICoatB] = useState("");
  const [cbxReqReflowF, setcbxReqReflowF] = useState("");
  const [cbxReqReflowB, setcbxReqReflowB] = useState("");
  const [cbxReqXrayF, setcbxReqXrayF] = useState("");
  const [cbxReqXrayB, setcbxReqXrayB] = useState("");
  const [cbxReqXrayOneTime, setcbxReqXrayOneTime] = useState("");
  const [cbxReqProcControlTime, setcbxReqProcControlTime] = useState("");
  const [txtProcControlTime, settxtProcControlTime] = useState("");
  const [cbxReqConnShtPcsTime, setcbxReqConnShtPcsTime] = useState("");
  const [cbxReqFinalPackingGroup, setcbxReqFinalPackingGroup] = useState("");
  const [cbxReqFinInspect, setcbxReqFinInspect] = useState("");
  const [txtFinInspectProc, settxtFinInspectProc] = useState("");
  const [cbxReqShtControlPlasma, setcbxReqShtControlPlasma] = useState("");
  const [txtShtPlasmaTime, settxtShtPlasmaTime] = useState("");
  const [cbxPlasmaConnShtPcs, setcbxPlasmaConnShtPcs] = useState("");
  const [txtBarcodeGrade, settxtBarcodeGrade] = useState("");
  const [cbxReqEFPCAOM, setcbxReqEFPCAOM] = useState("");
  const [cbxReqEFPCAOI, setcbxReqEFPCAOI] = useState("");
  const [cbxReqEFPCOST, setcbxReqEFPCOST] = useState("");
  const [cbxReqEFPCAVI, setcbxReqEFPCAVI] = useState("");
  const [cbxConnShtReqBoardFlg, setcbxConnShtReqBoardFlg] = useState("");
  const [cbxAutoPressF, setcbxAutoPressF] = useState("");
  const [cbxAutoPressB, setcbxAutoPressB] = useState("");
  const [txtUpdateBy, settxtUpdateBy] = useState("");
  const [txtUpdateDate, settxtUpdateDate] = useState("");
  const [chk_DelFlg, setchk_DelFlg] = useState("");

  const [pnlMessage, setpnlMessage] = useState(false);
  const [lblMessage, setlblMessage] = useState("");
  const [lblMessageColor, setlblMessageColor] = useState("");
  const [rbtselLotRoll, setrbtselLotRoll] = useState("");
  const [rbtPlasmaTime, setrbtPlasmaTime] = useState("");

  //Checkbox
  const [ReqLotCheck, setReqLotCheck] = useState(false);
  const [ReqCheckPrdShtCheck, setReqCheckPrdShtCheck] = useState(false);
  const [ReqVendorCheck, setReqVendorCheck] = useState(false);
  const [ReqConfigCheck, setReqConfigCheck] = useState(false);
  const [ReqConfigRunCheck, setReqConfigRunCheck] = useState(false);
  const [ReqControlPlasmaCheck, setReqControlPlasmaCheck] = useState(false);
  const [ReqShtELTCheck, setReqShtELTCheck] = useState(false);
  const [ReqVendorLotCheck, setReqVendorLotCheck] = useState(false);
  const [ReqDateProcCheck, setReqDateProcCheck] = useState(false);
  const [ReqCheckWeekCodeCheck, setReqCheckWeekCodeCheck] = useState(false);
  const [ReqSheetMCCheck, setReqSheetMCCheck] = useState(false);
  const [ReqConRollLeafCheck, setReqConRollLeafCheck] = useState(false);
  const [LeafReqSerialCheck, setLeafReqSerialCheck] = useState(false);
  const [ReqCheckPrdRollCheck, setReqCheckPrdRollCheck] = useState(false);
  const [RollReqCheckPrdLeafCheck, setRollReqCheckPrdLeafCheck] = useState(false);
  const [RollReqCheckLotLeafCheck, setRollReqCheckLotLeafCheck] = useState(false);
  const [ReqConShtPcsRollCheck, setReqConShtPcsRollCheck] = useState(false);
  const [ReqXrayOneTimeCheck, setReqXrayOneTimeCheck] = useState(false);
  const [ReqProcControlTimeCheck, setReqProcControlTimeCheck] = useState(false);
  const [ReqConnShtPcsTimeCheck, setReqConnShtPcsTimeCheck] = useState(false);
  const [ReqFinalPackingGroupCheck, setReqFinalPackingGroupCheck] = useState(false);
  const [ReqFinInspectCheck, setReqFinInspectCheck] = useState(false);
  const [ReqShtControlPlasmaCheck, setReqShtControlPlasmaCheck] = useState(false);
  const [PlasmaConnShtPcsCheck, setPlasmaConnShtPcsCheck] = useState(false);
  const [ReqEFPCAOMCheck, setReqEFPCAOMCheck] = useState(false);
  const [ReqEFPCAOICheck, setReqEFPCAOICheck] = useState(false);
  const [ReqEFPCOSTCheck, setReqEFPCOSTCheck] = useState(false);
  const [ReqEFPCAVICheck, setReqEFPCAVICheck] = useState(false);
  const [ConnShtReqBoardFlg, setConnShtReqBoardFlg] = useState(false);
  const [AutoPressFCheck, setAutoPressFCheck] = useState(false);
  const [AutoPressBCheck, setAutoPressBCheck] = useState(false);
  const [chk_DelFlgCheck, setchk_DelFlgCheck] = useState(false);
  const [ReqCheckLotShtCheck, setReqCheckLotShtCheck] = useState(false);
  // const [rbtPlasmaTimePCSCheck, setrbtPlasmaTimePCSCheck] = useState(false);
  // const [rbtPlasmaTimeSHTCheck, setrbtPlasmaTimeSHTCheck] = useState(false);
  // const [rbtPlasmaTimeGRPCheck, setrbtPlasmaTimeGRPCheck] = useState(false);
  const [ReqUpdatePlasmaCheck, setReqUpdatePlasmaCheck] = useState(false);
  const [PlasmaNotStartELTCheck, setPlasmaNotStartELTCheck] = useState(false);
  const [PlasmaNotShowTimeCheck, setPlasmaNotShowTimeCheck] = useState(false);
  const [ReqStartSeqCodeCheck, setReqStartSeqCodeCheck] = useState(false);
  const [ReqSPIAOICheck, setReqSPIAOICheck] = useState(false);
  // const [rbtLotCheck, setrbtLotCheck] = useState(false);
  // const [rbtRollCheck, setrbtRollCheck] = useState(false);
  const [ReqPreAOIFCheck, setReqPreAOIFCheck] = useState(true);
  const [ReqPreAOIBCheck, setReqPreAOIBCheck] = useState(true);
  const [ReqAOIFCheck, setReqAOIFCheck] = useState(true);
  const [ReqAOIBCheck, setReqAOIBCheck] = useState(true);
  const [ReqAOICoatFCheck, setReqAOICoatFCheck] = useState(false);
  const [ReqAOICoatBCheck, setReqAOICoatBCheck] = useState(false);
  const [ReqSPIFCheck, setReqSPIFCheck] = useState(true);
  const [ReqSPIBCheck, setReqSPIBCheck] = useState(true);
  const [ReqXrayFCheck, setReqXrayFCheck] = useState(false);
  const [ReqXrayBCheck, setReqXrayBCheck] = useState(false);
  const [ReqReflowFCheck, setReqReflowFCheck] = useState(false);
  const [ReqReflowBCheck, setReqReflowBCheck] = useState(false);

  //Disabled
  const [txtCheckPrdShtDisabled, settxtCheckPrdShtFromDisabled] = useState(false);
  const [txtCheckPrdShtToDisabled, settxtCheckPrdShtToDisabled] = useState(false);
  const [txtProcControlTimeDisabled, settxtProcControlTimeDisabled] = useState(false);
  const [cbxReqConnShtPcsTimeDisabled, setcbxReqConnShtPcsTimeDisabled] = useState(false);
  const [txtPlasmaTimeDisabled, settxtPlasmaTimeDisabled] = useState(false);
  const [rbtPlasmaTimePCSDisabled, setrbtPlasmaTimePCSDisabled] = useState(false);
  const [rbtPlasmaTimeSHTDisabled, setrbtPlasmaTimeSHTDisabled] = useState(false);
  const [rbtPlasmaTimeGRPDisabled, setrbtPlasmaTimeGRPDisabled] = useState(false);
  const [cbxReqUpdatePlasmaDisabled, setcbxReqUpdatePlasmaDisabled] = useState(false);
  const [cbxPlasmaNotStartELTDisabled, setcbxPlasmaNotStartELTDisabled] = useState(false);
  const [cbxPlasmaNotShowTimeDisabled, setcbxPlasmaNotShowTimeDisabled] = useState(false);
  const [cbxReqCheckPrdShtDisabled, setcbxReqCheckPrdShtDisabled] = useState(false);
  const [txtStartSeqCodeDisabled, settxtStartSeqCodeDisabled] = useState(false);
  const [txtStartSeqDigitFromDisabled, settxtStartSeqDigitFromDisabled] = useState(false);
  const [txtStartSeqDigitToDisabled, settxtStartSeqDigitToDisabled] = useState(false);
  const [txtVendorLotLengthDisabled, settxtVendorLotLengthDisabled] = useState(false);
  const [txtRollNoLengthDisabled, settxtRollNoLengthDisabled] = useState(false);
  const [txtLeafNoLengthDisabled, settxtLeafNoLengthDisabled] = useState(false);
  const [txtLeafScanDisabled, settxtLeafScanDisabled] = useState(false);
  const [cbxLeafReqSerialDisabled, setcbxLeafReqSerialDisabled] = useState(false);
  const [cbxReqCheckPrdRollDisabled, setcbxReqCheckPrdRollDisabled] = useState(false);
  const [txtCheckRollPrdFromDisabled, settxtCheckRollPrdFromDisabled] = useState(false);
  const [txtCheckRollPrdToDisabled, settxtCheckRollPrdToDisabled] = useState(false);
  const [txtCheckRollPrdWordDisabled, settxtCheckRollPrdWordDisabled] = useState(false);
  const [cbxRollReqCheckPrdLeafDisabled, setcbxRollReqCheckPrdLeafDisabled] = useState(false);
  const [txtRollCheckPrdLeafFromDisabled, settxtRollCheckPrdLeafFromDisabled] = useState(false);
  const [txtRollCheckPrdLeafToDisabled, settxtRollCheckPrdLeafToDisabled] = useState(false);
  const [cbxRollReqCheckLotLeafDisabled, setcbxRollReqCheckLotLeafDisabled] = useState(false);
  const [txtRollCheckLotLeafFromDisabled, settxtRollCheckLotLeafFromDisabled] = useState(false);
  const [txtRollCheckLotLeafToDisabled, settxtRollCheckLotLeafToDisabled] = useState(false);
  const [txtDateFromProcDisabled, settxtDateFromProcDisabled] = useState(false);
  const [cbxReqCheckWeekCodeDisabled, setcbxReqCheckWeekCodeDisabled] = useState(false);
  const [txtWeekCodeStartDisabled, settxtWeekCodeStartDisabled] = useState(false);
  const [txtWeekCodeEndDisabled, settxtWeekCodeEndDisabled] = useState(false);
  const [txtShtPlasmaTimeDisabled, settxtShtPlasmaTimeDisabled] = useState(false);
  const [txtFinInspectProcDisabled, settxtFinInspectProcDisabled] = useState(false);
  const [cbxReqVendorDisabled, setcbxReqVendorDisabled] = useState(false);
  const [cbxReqStartSeqCodeDisabled, setcbxReqStartSeqCodeDisabled] = useState(false);
  const [txtConfigWordDisabled, settxtConfigWordDisabled] = useState(false);
  const [txtConfigStartDisabled, settxtConfigStartDisabled] = useState(false);
  const [txtConfigEndDisabled, settxtConfigEndDisabled] = useState(false);
  const [cbxReqConfigRunDisabled, setcbxReqConfigRunDisabled] = useState(false);
  const [txtCheckLotShtFromDisabled, settxtCheckLotShtFromDisabled] = useState(false);
  const [txtCheckLotShtToDisabled, settxtCheckLotShtToDisabled] = useState(false);

  const [visiblePassWord, setvisiblePassWord] = useState(false);
  const [visibletxtPassWord, setvisibletxtPassWord] = useState(false);

  //SetError
  const [ErrorPrdName, setErrorPrdName] = useState(false);
  const [ErrorPrdNameMessage, setErrorPrdNameMessage] = useState("");
  const [ErrorShtLot, setErrorShtLot] = useState(false);
  const [ErrorShtLotMessage, setErrorShtLotMessage] = useState("");
  const [ErrorPcsSht, setErrorPcsSht] = useState(false);
  const [ErrorPcsShtMessage, setErrorPcsShtMessage] = useState("");
  const [ErrorShtScan, setErrorShtScan] = useState(false);
  const [ErrorShtScanMessage, setErrorShtScanMessage] = useState("");
  const [ErrorShtLaser, setErrorShtLaser] = useState(false);
  const [ErrorShtLaserMessage, setErrorShtLaserMessage] = useState("");
  const [ErrorConfigWord, setErrorConfigWord] = useState(false);
  const [ErrorConfigWordMessage, setErrorConfigWordMessage] = useState("");
  const [ErrorConfigStart, setErrorConfigStart] = useState(false);
  const [ErrorConfigStartMessage, setErrorConfigStartMessage] = useState("");
  const [ErrorConfigEnd, setErrorConfigEnd] = useState(false);
  const [ErrorConfigEndMessage, setErrorConfigEndMessage] = useState("");
  const [ErrorDupStart, setErrorDupStart] = useState(false);
  const [ErrorDupStartMessage, setErrorDupStartMessage] = useState("");
  const [ErrorDupEnd, setErrorDupEnd] = useState(false);
  const [ErrorDupEndMessage, setErrorDupEndMessage] = useState("");
  const [ErrorCheckPrdShtFrom, setErrorCheckPrdShtFrom] = useState(false);
  const [ErrorCheckPrdShtFromMessage, setErrorCheckPrdShtFromMessage] = useState("");
  const [ErrorCheckPrdShtTo, setErrorCheckPrdShtTo] = useState(false);
  const [ErrorCheckPrdShtToMessage, setErrorCheckPrdShtToMessage] = useState("");
  const [ErrorCheckLotShtFrom, setErrorCheckLotShtFrom] = useState(false);
  const [ErrorCheckLotShtFromMessage, setErrorCheckLotShtFromMessage] = useState("");
  const [ErrorCheckLotShtTo, setErrorCheckLotShtTo] = useState(false);
  const [ErrorCheckLotShtToMessage, setErrorCheckLotShtToMessage] = useState("");
  const [ErrorPlasmaTime, setErrorPlasmaTime] = useState(false);
  const [ErrorPlasmaTimeMessage, setErrorPlasmaTimeMessage] = useState("");
  const [ErrorStartSeqCode, setErrorStartSeqCode] = useState(false);
  const [ErrorStartSeqCodeMessage, setErrorStartSeqCodeMessage] = useState("");
  const [ErrorStartSeqDigitFrom, setErrorStartSeqDigitFrom] = useState(false);
  const [ErrorStartSeqDigitFromMessage, setErrorStartSeqDigitFromMessage] = useState("");
  const [ErrorStartSeqDigitTo, setErrorStartSeqDigitTo] = useState(false);
  const [ErrorStartSeqDigitToMessage, setErrorStartSeqDigitToMessage] = useState("");
  const [ErrorVendorLotLength, setErrorVendorLotLength] = useState(false);
  const [ErrorVendorLotLengthMessage, setErrorVendorLotLengthMessage] = useState("");
  const [ErrorRollNoLength, setErrorRollNoLength] = useState(false);
  const [ErrorRollNoLengthMessage, setErrorRollNoLengthMessage] = useState("");
  const [ErrorLeafNoLength, setErrorLeafNoLength] = useState(false);
  const [ErrorLeafNoLengthMessage, setErrorLeafNoLengthhMessage] = useState("");
  const [ErrorLeafScan, setErrorLeafScan] = useState(false);
  const [ErrorLeafScanMessage, setErrorLeafScanMessage] = useState("");
  const [ErrorCheckRollPrdFrom, setErrorCheckRollPrdFrom] = useState(false);
  const [ErrorCheckRollPrdFromMessage, setErrorCheckRollPrdFromMessage] = useState("");
  const [ErrorCheckRollPrdTo, setErroCheckRollPrdTo] = useState(false);
  const [ErrorCheckRollPrdToMessage, setErrorCheckRollPrdToMessage] = useState("");
  const [ErrorCheckRollPrdWord, setErrorCheckRollPrdWord] = useState(false);
  const [ErrorCheckRollPrdWordMessage, setErrorCheckRollPrdWordMessage] = useState("");
  const [ErrorRollCheckPrdLeafFrom, setErrorRollCheckPrdLeafFrom] = useState(false);
  const [ErrorRollCheckPrdLeafFromMessage, setErrorRollCheckPrdLeafFromMessage] = useState("");
  const [ErrorRollCheckPrdLeafTo, setErrorRollCheckPrdLeafTo] = useState(false);
  const [ErrorRollCheckPrdLeafToMessage, setErrorRollCheckPrdLeafToMessage] = useState("");
  const [ErrorRollCheckLotLeafFrom, setErrorRollCheckLotLeafFrom] = useState(false);
  const [ErrorRollCheckLotLeafFromMessage, setErrorRollCheckLotLeafFromMessage] = useState("");
  const [ErrorRollCheckLotLeafTo, setErrorRollCheckLotLeafTo] = useState(false);
  const [ErrorRollCheckLotLeafToMessage, setErrorRollCheckLotLeafToMessage] = useState("");
  const [ErrorDateFromProc, setErrorDateFromProc] = useState(false);
  const [ErrorDateFromProcMessage, setErrorDateFromProcMessage] = useState("");
  const [ErrorWeekCodeStart, setErrorWeekCodeStart] = useState(false);
  const [ErrorWeekCodeStartMessage, setErrorWeekCodeStartMessage] = useState("");
  const [ErrorWeekCodeEnd, setErrorWeekCodeEnd] = useState(false);
  const [ErrorWeekCodeEndMessage, setErrorWeekCodeEndMessage] = useState("");
  const [ErrorProcControlTime, setErrorProcControlTime] = useState(false);
  const [ErrorProcControlTimeMessage, setErrorProcControlTimeMessage] = useState("");
  const [ErrorShtPlasmaTime, setErrorShtPlasmaTime] = useState(false);
  const [ErrorShtPlasmaTimeMessage, setErrorShtPlasmaTimeMessage] = useState("");
  const [ErrorFinInspectProc, setErrorFinInspectProc] = useState(false);
  const [ErrorFinInspectProcMessage, setErrorFinInspectProcMessage] = useState("");
  const [ErrorselSheetType, setErrorselSheetType] = useState(false);
  const [ErrorselSheetTypeMessage, setErrorselSheetTypeMessage] = useState("");
  const [ErrorselDateType, setErrorselDateType] = useState(false);
  const [ErrorselDateTypeMessage, setErrorselDateTypeMessage] = useState("");
  const [ErrorEngCode, setErrorEngCode] = useState(false);
  const [ErrorEngCodeMessage, setErrorEngCodeMessage] = useState("");
  const [ErrorRevision, setErrorRevision] = useState(false);
  const [ErrorRevisionMessage, setErrorRevisionMessage] = useState("");
  const [ErrorPcsTray, setErrorPcsTray] = useState(false);
  const [ErrorPcsTrayMessage, setErrorPcsTrayMessage] = useState("");
  const [ErrorPcsScan, setErrorPcsScan] = useState(false);
  const [ErrorPcsScanMessage, setErrorPcsScanMessage] = useState("");
  const [ErrorChkStartDig, setErrorChkStartDig] = useState(false);
  const [ErrorChkStartDigMessage, setErrorChkStartDigMessage] = useState("");
  const [ErrorChkEndDig, setErrorChkEndDig] = useState(false);
  const [ErrorChkEndDigMessage, setErrorChkEndDigMessage] = useState("");
  const [ErrorChkWord, setErrorChkWord] = useState(false);
  const [ErrorChkWordMessage, setErrorChkWordMessage] = useState("");
  const [ErrorSerialLength, setErrorSerialLength] = useState(false);
  const [ErrorSerialLengthMessage, setErrorSerialLengthMessage] = useState("");
  const [ErrorSerialFormat, setErrorSerialFormat] = useState(false);
  const [ErrorSerialFormatMessage, setErrorSerialFormatMessage] = useState("");
  const [ErrorLaminationSide, setErrorLaminationSide] = useState(false);
  const [ErrorLaminationSideMessage, setErrorLaminationSideMessage] = useState("");
  const [ErrorPassWord, setErrorPassWord] = useState(false);
  const [ErrorPassWordMessage, setErrorPassWordMessage] = useState("");

  const [hfUserName, sethfUserName] = useState("");
  const MST_PASSWORD = "";
  const FIX_CHECK_PRODUCT_MIX = "Y";
  const FIX_CHECK_PRODUCT_MIX_START = "11";
  const FIX_CHECK_PRODUCT_MIX_END = "16";
  const plantCode = import.meta.env.VITE_FAC;
  const ip = localStorage.getItem("ipAddress");

  useEffect(() => {
    PageLoad();
  }, []);

  const PageLoad = async () => {

    if (hfUserName === "") {
      sethfUserName("");

      if (FIX_CHECK_PRODUCT_MIX === "Y") {
        setcbxReqCheckPrdShtDisabled(true);
        setReqCheckPrdShtCheck(true);
        settxtCheckPrdShtFrom(FIX_CHECK_PRODUCT_MIX_START);
        settxtCheckPrdShtTo(FIX_CHECK_PRODUCT_MIX_END);
        settxtCheckPrdShtFromDisabled(false);
        settxtCheckPrdShtToDisabled(false);
      } else {
        setcbxReqCheckPrdShtDisabled(false);
        setReqCheckPrdShtCheck(false);
        settxtCheckPrdShtFrom("");
        settxtCheckPrdShtTo("");
        settxtCheckPrdShtFromDisabled(true);
        settxtCheckPrdShtToDisabled(true);
      }
      setselCheckIC("N");
      setReqProcControlTimeCheck(false);
      settxtProcControlTime("");
      settxtProcControlTimeDisabled(true);
      setReqConnShtPcsTimeCheck(false);
      setcbxReqConnShtPcsTimeDisabled(true);
      setReqFinalPackingGroupCheck(false);
      setReqConShtPcsRollCheck(false);
      settxtBarcodeGrade("");

      setReqShtControlPlasmaCheck(false);
      settxtShtPlasmaTime("");

      settxtPlasmaTime("");
      settxtPlasmaTimeDisabled(true);
      setrbtPlasmaTimePCSDisabled(true);
      setrbtPlasmaTimeSHTDisabled(true);
      setrbtPlasmaTimeGRPDisabled(true);
      setcbxReqUpdatePlasmaDisabled(true);

      setcbxPlasmaNotStartELTDisabled(true);
      setcbxPlasmaNotShowTimeDisabled(true);
      setPlasmaConnShtPcsCheck(false);
      setConnShtReqBoardFlg(false);
      setAutoPressFCheck(false);
      setAutoPressBCheck(false);

      // txtUserName.Focus()
    } else {

      if (MST_PASSWORD !== "") {
        setvisiblePassWord(true);
        setvisibletxtPassWord(true);
      } else {
        setvisiblePassWord(false);
        setvisibletxtPassWord(false);
      }
    }

  };

  const handleKeyProductName = (event) => {
    const txtProduct = event.target.value;
    settxtProduct(txtProduct);
    setErrorPrdName(false);
    setErrorPrdNameMessage("");
  };

  const btnRetriveClick = async () => {
    GetDataProductMaster();
  };

  const handleKeyUpdateCount = (event) => {
    const txtUpdateCount = event.target.value;
    settxtUpdateCount(txtUpdateCount);
  };

  const handleKeyCheckDigitFrom = (event) => {
    const txtChkStartDig = event.target.value;
    settxtChkStartDig(txtChkStartDig);
    setErrorChkStartDig(false);
    setErrorChkStartDigMessage("");
  };

  const handleKeyShtLot = (event) => {
    const txtShtLot = event.target.value;
    settxtShtLot(txtShtLot);
    setErrorShtLot(false);
    setErrorShtLotMessage("");
  };
  const handleKeyCheckDigitTo = (event) => {
    const txtChkEndDig = event.target.value;
    settxtChkEndDig(txtChkEndDig);
    setErrorChkEndDig(false);
    setErrorChkEndDigMessage("");
  };

  const handleKeyPcsSht = (event) => {
    const txtPcsSht = event.target.value;
    settxtPcsSht(txtPcsSht);
    setErrorPcsSht(false);
    setErrorPcsShtMessage("");
  };

  const handleKeyCheckWord = (event) => {
    const txtChkWord = event.target.value;
    settxtChkWord(txtChkWord);
    setErrorChkWord(false);
    setErrorChkWordMessage("");
  };

  const handleselSheettype = (value) => {
    setselSheetType(value);
    setErrorselSheetType(false);
    setErrorselSheetTypeMessage("");
  };

  const handlekeySerialLength = (event) => {
    const txtSerialLength = event.target.value;
    settxtSerialLength(txtSerialLength);
    setErrorSerialLength(false);
    setErrorSerialLengthMessage("");
  };

  const handlekeyPcsScan = (event) => {
    const txtPcsScan = event.target.value;
    settxtPcsScan(txtPcsScan);
    setErrorPcsScan(false);
    setErrorPcsScanMessage("");
  };

  const handlekeyEngCode = (event) => {
    const txtEngCode = event.target.value;
    settxtEngCode(txtEngCode);
    setErrorEngCode(false);
    setErrorEngCodeMessage("");
  };

  const handlekeyPcsTray = (event) => {
    const txtPcsTray = event.target.value;
    settxtPcsTray(txtPcsTray);
    setErrorPcsTray(false);
    setErrorPcsTrayMessage("");
  };

  const handlekeyRevision = (event) => {
    const txtRevision = event.target.value;
    settxtRevision(txtRevision);
    setErrorRevision(false);
    setErrorRevisionMessage("");
  };

  const handlekeySerialFormat = (event) => {
    const txtSerialFormat = event.target.value;
    settxtSerialFormat(txtSerialFormat);
    setErrorSerialFormat(false);
    setErrorSerialFormatMessage("");
  };

  const handleselLaminationSide = (value) => {
    setselLaminationSide(value);
    setErrorLaminationSide(false);
    setErrorLaminationSideMessage("");
  };

  const handlekeySheetFormat = (event) => {
    const txtSheetFormat = event.target.value;
    settxtSheetFormat(txtSheetFormat);
  };

  const handlekeyShtScan = (event) => {
    const txtShtScan = event.target.value;
    settxtShtScan(txtShtScan);
    setErrorShtScan(false);
    setErrorShtScanMessage("");
  };

  const handlekeyShtLaser = (event) => {
    const txtShtLaser = event.target.value;
    settxtShtLaser(txtShtLaser);
    setErrorShtLaser(false);
    setErrorShtLaserMessage("");
  };

  const handlekeyConfigWord = (event) => {
    const txtConfigWord = event.target.value;
    settxtConfigWord(txtConfigWord);
    setErrorConfigWord(false);
    setErrorConfigWordMessage("");
  };

  const handlekeyConfigStart = (event) => {
    const txtConfigStart = event.target.value;
    settxtConfigStart(txtConfigStart);
    setErrorConfigStart(false);
    setErrorConfigStartMessage("");
  };

  const handlekeyConfigEnd = (event) => {
    const txtConfigEnd = event.target.value;
    settxtConfigEnd(txtConfigEnd);
    setErrorConfigEnd(false);
    setErrorConfigEndMessage("");
  };

  const handlekeyDupStart = (event) => {
    const txtDupStart = event.target.value;
    settxtDupStart(txtDupStart);
    setErrorDupStart(false);
    setErrorDupStartMessage("");
  };

  const handlekeyDupEnd = (event) => {
    const txtDupEnd = event.target.value;
    settxtDupEnd(txtDupEnd);
    setErrorDupEnd(false);
    setErrorDupEndMessage("");
  };

  const handlekeyAddInfo = (event) => {
    const txtAddInfo = event.target.value;
    settxtAddInfo(txtAddInfo);
  };

  const handlekeyPassWord = (event) => {
    const txtPassWord = event.target.value;
    settxtPassWord(txtPassWord);
    setErrorPassWord(false);
    setErrorPassWordMessage("");
  };

  const handlekeyAbbr = (event) => {
    const txtAbbr = event.target.value;
    settxtAbbr(txtAbbr);
  };

  const handlekeySerialStartCode = (event) => {
    const txtSerialStartCode = event.target.value;
    settxtSerialStartCode(txtSerialStartCode);
  };

  const handlekeyCheckPrdShtFrom = (event) => {
    const txtCheckPrdShtFrom = event.target.value;
    settxtCheckPrdShtFrom(txtCheckPrdShtFrom);
    setErrorCheckPrdShtFrom(false);
    setErrorCheckPrdShtFromMessage("");
  };

  const handlekeyCheckPrdShtTo = (event) => {
    const txtCheckPrdShtTo = event.target.value;
    settxtCheckPrdShtTo(txtCheckPrdShtTo);
    setErrorCheckPrdShtTo(false);
    setErrorCheckPrdShtToMessage("");
  };

  const handlekeyCheckLotShtFrom = (event) => {
    const txtCheckLotShtFrom = event.target.value;
    settxtCheckLotShtFrom(txtCheckLotShtFrom);
    setErrorCheckLotShtFrom(false);
    setErrorCheckLotShtFromMessage("");
  };

  const handlekeyCheckLotShtTo = (event) => {
    const txtCheckLotShtTo = event.target.value;
    settxtCheckLotShtTo(txtCheckLotShtTo);
    setErrorCheckLotShtTo(false);
    setErrorCheckLotShtToMessage("");
  };

  const handleselStatus = (value) => {
    setselStatus(value);
  };

  const handleselCheckIC = (value) => {
    setselCheckIC(value);
  };

  const handlekeyPlasmaTime = (event) => {
    const txtPlasmaTime = event.target.value;
    settxtPlasmaTime(txtPlasmaTime);
    setErrorPlasmaTime(false);
    setErrorPlasmaTimeMessage("");
  };

  const handlekeyStartSeqCode = (event) => {
    const txtStartSeqCode = event.target.value;
    settxtStartSeqCode(txtStartSeqCode);
    setErrorStartSeqCode(false);
    setErrorStartSeqCodeMessage("");
  };

  const handlekeyStartSeqDigitFrom = (event) => {
    const txtStartSeqDigitFrom = event.target.value;
    settxtStartSeqDigitFrom(txtStartSeqDigitFrom);
    setErrorStartSeqDigitFrom(false);
    setErrorStartSeqDigitFromMessage("");
  };

  const handlekeyStartSeqDigitTo = (event) => {
    const txtStartSeqDigitTo = event.target.value;
    settxtStartSeqDigitTo(txtStartSeqDigitTo);
    setErrorStartSeqDigitTo(false);
    setErrorStartSeqDigitToMessage("");
  };

  const handlekeyVendorLotLength = (event) => {
    const txtVendorLotLength = event.target.value;
    settxtVendorLotLength(txtVendorLotLength);
    setErrorVendorLotLength(false);
    setErrorVendorLotLengthMessage("");
  };

  const handlekeyDateFromProc = (event) => {
    const txtDateFromProc = event.target.value;
    settxtDateFromProc(txtDateFromProc);
    setErrorDateFromProc(false);
    setErrorDateFromProcMessage("");
  };

  const handlekeyWeekCodeStart = (event) => {
    const txtWeekCodeStart = event.target.value;
    settxtWeekCodeStart(txtWeekCodeStart);
    setErrorWeekCodeStart(false);
    setErrorWeekCodeStartMessage("");
  };

  const handlekeyWeekCodeEnd = (event) => {
    const txtWeekCodeEnd = event.target.value;
    settxtWeekCodeEnd(txtWeekCodeEnd);
    setErrorWeekCodeEnd(false);
    setErrorWeekCodeEndMessage("");
  };

  const handlekeyLeafScan = (event) => {
    const txtLeafScan = event.target.value;
    settxtLeafScan(txtLeafScan);
    setErrorLeafScan(false);
    setErrorLeafScanMessage("");
  };

  const handlekeyRollNoLength = (event) => {
    const txtRollNoLength = event.target.value;
    settxtRollNoLength(txtRollNoLength);
    setErrorRollNoLength(false);
    setErrorRollNoLengthMessage("");
  };

  const handlekeyLeafNoLength = (event) => {
    const txtLeafNoLength = event.target.value;
    settxtLeafNoLength(txtLeafNoLength);
    setErrorLeafNoLength(false);
    setErrorLeafNoLengthhMessage("");
  };

  const handlekeyCheckRollPrdFrom = (event) => {
    const txtCheckRollPrdFrom = event.target.value;
    settxtCheckRollPrdFrom(txtCheckRollPrdFrom);
    setErrorCheckRollPrdFrom(false);
    setErrorCheckRollPrdFromMessage("");
  };

  const handlekeyCheckRollPrdTo = (event) => {
    const txtCheckRollPrdTo = event.target.value;
    txtCheckRollPrdTo(txtCheckRollPrdTo);
    setErroCheckRollPrdTo(false);
    setErrorCheckRollPrdToMessage("");
  };

  const handlekeyCheckRollPrdWord = (event) => {
    const txtCheckRollPrdWord = event.target.value;
    settxtCheckRollPrdWord(txtCheckRollPrdWord);
    setErrorCheckRollPrdWord(false);
    setErrorCheckRollPrdWordMessage("");
  };

  const handlekeyRollCheckPrdLeafFrom = (event) => {
    const txtRollCheckPrdLeafFrom = event.target.value;
    settxtRollCheckPrdLeafFrom(txtRollCheckPrdLeafFrom);
    setErrorRollCheckPrdLeafFrom(false);
    setErrorRollCheckPrdLeafFromMessage("");
  };

  const handlekeyRollCheckPrdLeafTo = (event) => {
    const txtRollCheckPrdLeafTo = event.target.value;
    settxtRollCheckPrdLeafTo(txtRollCheckPrdLeafTo);
    setErrorRollCheckPrdLeafTo(false);
    setErrorRollCheckPrdLeafToMessage("");
  };

  const handlekeyRollCheckLotLeafFrom = (event) => {
    const txtRollCheckLotLeafFrom = event.target.value;
    settxtRollCheckLotLeafFrom(txtRollCheckLotLeafFrom);
    setErrorRollCheckLotLeafFrom(false);
    setErrorRollCheckLotLeafFromMessage("");
  };

  const handlekeyRollCheckLotLeafTo = (event) => {
    const txtRollCheckLotLeafTo = event.target.value;
    settxtRollCheckLotLeafTo(txtRollCheckLotLeafTo);
    setErrorRollCheckLotLeafTo(false);
    setErrorRollCheckLotLeafToMessage("");
  };

  const handlekeyProcControlTime = (event) => {
    const txtProcControlTime = event.target.value;
    settxtProcControlTime(txtProcControlTime);
    setErrorProcControlTime(false);
    setErrorProcControlTimeMessage("");
  };

  const handlekeyFinInspectProc = (event) => {
    const txtFinInspectProc = event.target.value;
    settxtFinInspectProc(txtFinInspectProc);
    setErrorFinInspectProc(false);
    setErrorFinInspectProcMessage("");
  };

  const handlekeyShtPlasmaTime = (event) => {
    const txtShtPlasmaTime = event.target.value;
    settxtShtPlasmaTime(txtShtPlasmaTime);
    setErrorShtPlasmaTime(false);
    setErrorShtPlasmaTimeMessage("");
  };

  const handlekeyBarcodeGrade = (event) => {
    const txtBarcodeGrade = event.target.value;
    settxtBarcodeGrade(txtBarcodeGrade);
  };

  const handlekeyUpdateBy = (event) => {
    const txtUpdateBy = event.target.value;
    settxtUpdateBy(txtUpdateBy);
  };

  const handlekeyUpdateDate = (event) => {
    const txtUpdateDate = event.target.value;
    settxtUpdateDate(txtUpdateDate);
  };

  const handlerbtLotRollChange = (event) => {
    setrbtselLotRoll(event.target.value);
  };

  const handlerbtPlasmaTimeChange = (event) => {
    setrbtPlasmaTime(event.target.value);
  };

  const ReqConfigCheckChanged = (event) => {
    const ReqConfigCheck = event.target.checked;
    setReqConfigCheck(ReqConfigCheck);
    if (ReqConfigCheck) {
      settxtConfigWord("");
      settxtConfigStart("");
      settxtConfigEnd("");
      settxtConfigWordDisabled(false);
      settxtConfigStartDisabled(false);
      settxtConfigEndDisabled(false);
      setcbxReqConfigRunDisabled(false);
    } else {
      settxtConfigWord("");
      settxtConfigStart("");
      settxtConfigEnd("");
      settxtConfigWordDisabled(true);
      settxtConfigStartDisabled(true);
      settxtConfigEndDisabled(true);
      setReqConfigRunCheck(false);
      setcbxReqConfigRunDisabled(true);
    }
  };

  const ReqCheckPrdShtCheckChanged = (event) => {
    const ReqCheckPrdShtCheck = event.target.checked;
    setReqCheckPrdShtCheck(ReqCheckPrdShtCheck);
    if (ReqCheckPrdShtCheck) {
      settxtCheckPrdShtFrom("");
      settxtCheckPrdShtTo("");
      settxtCheckPrdShtFromDisabled(false);
      settxtCheckPrdShtToDisabled(false);
    } else {
      settxtCheckPrdShtFrom("");
      settxtCheckPrdShtTo("");
      settxtCheckPrdShtFromDisabled(true);
      settxtCheckPrdShtToDisabled(true);
    }
  };

  const ReqCheckLotShtCheckChanged = (event) => {
    const ReqCheckLotShtCheck = event.target.checked;
    setReqCheckLotShtCheck(ReqCheckLotShtCheck);
    if (ReqCheckLotShtCheck) {
      settxtCheckLotShtFrom("");
      settxtCheckLotShtTo("");
      settxtCheckLotShtFromDisabled(false);
      settxtCheckLotShtToDisabled(false);
    } else {
      settxtCheckLotShtFrom("");
      settxtCheckLotShtTo("");
      settxtCheckLotShtFromDisabled(true);
      settxtCheckLotShtToDisabled(true);
    }
  };

  const selDateTypeselChanged = async (value) => {
    setselDateType(value);
    if (selDateType === "M") {
      setReqVendorCheck(true);
      setcbxReqVendorDisabled(true);
      setReqStartSeqCodeCheck(false);
      setcbxReqStartSeqCodeDisabled(true);
      settxtStartSeqCode("");
      settxtStartSeqCodeDisabled(true);
      settxtStartSeqDigitFrom("");
      settxtStartSeqDigitFromDisabled(true);
      settxtStartSeqDigitTo("");
      settxtStartSeqDigitToDisabled(true);
    } else {
      setReqVendorCheck(false);
      setcbxReqVendorDisabled(false);
      setcbxReqStartSeqCodeDisabled(false);
    }
  };

  const ReqControlPlasmaCheckChanged = (event) => {
    const ReqControlPlasmaCheck = event.target.checked;
    setReqControlPlasmaCheck(ReqControlPlasmaCheck);
    if (ReqControlPlasmaCheck) {
      settxtPlasmaTime("");
      settxtPlasmaTimeDisabled(false);
      setrbtPlasmaTimePCSDisabled(false);
      setrbtPlasmaTime("rbtPlasmaTimePCSCheck");
      setrbtPlasmaTimeSHTDisabled(false);
      setrbtPlasmaTimeGRPDisabled(false);
      setcbxReqUpdatePlasmaDisabled(false);

      setcbxPlasmaNotStartELTDisabled(false);
      setcbxPlasmaNotShowTimeDisabled(false);
      setPlasmaNotStartELTCheck(false);
      setPlasmaNotShowTimeCheck(false);
    } else {
      settxtPlasmaTime("");
      settxtPlasmaTimeDisabled(true);
      setrbtPlasmaTimePCSDisabled(true);
      setrbtPlasmaTime("");
      setrbtPlasmaTimeSHTDisabled(true);
      setrbtPlasmaTimeGRPDisabled(true);
      setcbxReqUpdatePlasmaDisabled(true);

      setcbxPlasmaNotStartELTDisabled(true);
      setcbxPlasmaNotShowTimeDisabled(true);
      setPlasmaNotStartELTCheck(false);
      setPlasmaNotShowTimeCheck(false);
    }
  };

  const ReqStartSeqCodeCheckChanged = (event) => {
    const ReqStartSeqCodeCheck = event.target.checked;
    setReqStartSeqCodeCheck(ReqStartSeqCodeCheck);
    if (ReqStartSeqCodeCheck) {
      settxtStartSeqCode("");
      settxtStartSeqCodeDisabled(false);
      settxtStartSeqDigitFrom("");
      settxtStartSeqDigitFromDisabled(false);
      settxtStartSeqDigitTo("");
      settxtStartSeqDigitToDisabled(false);
    } else {
      settxtStartSeqCode("");
      settxtStartSeqCodeDisabled(true);
      settxtStartSeqDigitFrom("");
      settxtStartSeqDigitFromDisabled(true);
      settxtStartSeqDigitTo("");
      settxtStartSeqDigitToDisabled(true);
    }
  };

  const ReqVendorLotCheckChanged = (event) => {
    const ReqVendorLotCheck = event.target.checked;
    setReqVendorLotCheck(ReqVendorLotCheck);
    if (ReqVendorLotCheck) {
      settxtVendorLotLength("");
      settxtVendorLotLengthDisabled(false);
    } else {
      settxtVendorLotLength("");
      settxtVendorLotLengthDisabled(true);
    }
  };

  const ReqConnectRollCheckChanged = (event) => {
    const ReqConRollLeafCheck = event.target.checked;
    setReqConRollLeafCheck(ReqConRollLeafCheck);
    if (ReqConRollLeafCheck) {
      settxtRollNoLength("");
      settxtRollNoLengthDisabled(false);
      settxtLeafNoLength("");
      settxtLeafNoLengthDisabled(false);
      settxtLeafScan("");
      settxtLeafScanDisabled(false);
      setcbxLeafReqSerialDisabled(false);
      setcbxReqCheckPrdRollDisabled(false);
      settxtCheckRollPrdFrom("");
      settxtCheckRollPrdFromDisabled(true);
      settxtCheckRollPrdTo("");
      settxtCheckRollPrdToDisabled(true);

      setcbxRollReqCheckPrdLeafDisabled(false);
      settxtRollCheckPrdLeafFrom("");
      settxtRollCheckPrdLeafFromDisabled(true);
      settxtRollCheckPrdLeafTo("");
      settxtRollCheckPrdLeafToDisabled(true);

      setcbxRollReqCheckLotLeafDisabled(false);
      settxtRollCheckLotLeafFrom("");
      settxtRollCheckLotLeafFromDisabled(true);
      settxtRollCheckLotLeafTo("");
      settxtRollCheckLotLeafToDisabled(true);
    } else {
      settxtRollNoLength("");
      settxtRollNoLengthDisabled(true);
      settxtLeafNoLength("");
      settxtLeafNoLengthDisabled(true);
      settxtLeafScan("");
      settxtLeafScanDisabled(true);
      setcbxLeafReqSerialDisabled(true);
      setcbxReqCheckPrdRollDisabled(true);
      settxtCheckRollPrdFrom("");
      settxtCheckRollPrdFromDisabled(true);
      settxtCheckRollPrdTo("");
      settxtCheckRollPrdToDisabled(true);

      setcbxRollReqCheckPrdLeafDisabled(true);
      setRollReqCheckPrdLeafCheck(false);
      settxtRollCheckPrdLeafFrom("");
      settxtRollCheckPrdLeafFromDisabled(true);
      settxtRollCheckPrdLeafTo("");
      settxtRollCheckPrdLeafToDisabled(true);

      setcbxRollReqCheckLotLeafDisabled(true);
      setRollReqCheckLotLeafCheck(false);
      settxtRollCheckLotLeafFrom("");
      settxtRollCheckLotLeafFromDisabled(true);
      settxtRollCheckLotLeafTo("");
      settxtRollCheckLotLeafToDisabled(true);
    }
  };

  const ReqDateProcCheckChanged = (event) => {
    const ReqDateProcCheck = event.target.checked;
    setReqDateProcCheck(ReqDateProcCheck);
    if (ReqDateProcCheck) {
      settxtDateFromProc("");
      settxtDateFromProcDisabled(false);
      setcbxReqCheckWeekCodeDisabled(false);
    } else {
      settxtDateFromProc("");
      settxtDateFromProcDisabled(true);
      setcbxReqCheckWeekCodeDisabled(true);
      setReqCheckWeekCodeCheck(false);
      settxtWeekCodeStart("");
      settxtWeekCodeStartDisabled(true);
      settxtWeekCodeEnd("");
      settxtWeekCodeEndDisabled(true);
    }
  };

  const ReqCheckWeekCodeCheckChanged = (event) => {
    const ReqCheckWeekCodeCheck = event.target.checked;
    setReqCheckWeekCodeCheck(ReqCheckWeekCodeCheck);
    if (ReqCheckWeekCodeCheck) {
      settxtWeekCodeStart("");
      settxtWeekCodeStartDisabled(false);
      settxtWeekCodeEnd("");
      settxtWeekCodeEndDisabled(false);
    } else {
      settxtWeekCodeStart("");
      settxtWeekCodeStartDisabled(true);
      settxtWeekCodeEnd("");
      settxtWeekCodeEndDisabled(true);
    }
  };

  const ReqCheckPrdRollCheckChanged = (event) => {
    const ReqCheckPrdRollCheck = event.target.checked;
    setReqCheckPrdRollCheck(ReqCheckPrdRollCheck);
    if (ReqCheckPrdRollCheck) {
      settxtCheckRollPrdFrom("");
      settxtCheckRollPrdFromDisabled(false);
      settxtCheckRollPrdTo("");
      settxtCheckRollPrdToDisabled(false);
      settxtCheckRollPrdWord("");
      settxtCheckRollPrdWordDisabled(false);
    } else {
      settxtCheckRollPrdFrom("");
      settxtCheckRollPrdFromDisabled(true);
      settxtCheckRollPrdTo("");
      settxtCheckRollPrdToDisabled(true);
      settxtCheckRollPrdWord("");
      settxtCheckRollPrdWordDisabled(true);
    }
  };

  const RollReqCheckPrdLeafCheckChanged = (event) => {
    const RollReqCheckPrdLeafCheck = event.target.checked;
    setRollReqCheckPrdLeafCheck(RollReqCheckPrdLeafCheck);
    if (RollReqCheckPrdLeafCheck) {
      settxtRollCheckPrdLeafFrom("");
      settxtRollCheckPrdLeafFromDisabled(false);
      settxtRollCheckPrdLeafTo("");
      settxtRollCheckPrdLeafToDisabled(false);
    } else {
      settxtRollCheckPrdLeafFrom("");
      settxtRollCheckPrdLeafFromDisabled(true);
      settxtRollCheckPrdLeafTo("");
      settxtRollCheckPrdLeafToDisabled(true);
    }
  };

  const RollReqCheckLotLeafCheckChanged = (event) => {
    const RollReqCheckLotLeafCheck = event.target.checked;
    setRollReqCheckLotLeafCheck(RollReqCheckLotLeafCheck);
    if (RollReqCheckLotLeafCheck) {
      settxtRollCheckLotLeafFrom("");
      settxtRollCheckLotLeafFromDisabled(false);
      settxtRollCheckLotLeafTo("");
      settxtRollCheckLotLeafToDisabled(false);
    } else {
      settxtRollCheckLotLeafFrom("");
      settxtRollCheckLotLeafFromDisabled(true);
      settxtRollCheckLotLeafTo("");
      settxtRollCheckLotLeafToDisabled(true);
    }
  };

  const ReqProcControlTimeCheckChanged = (event) => {
    const ReqProcControlTimeCheck = event.target.checked;
    setReqProcControlTimeCheck(ReqProcControlTimeCheck);
    if (ReqProcControlTimeCheck) {
      settxtProcControlTime("");
      settxtProcControlTimeDisabled(false);
      setcbxReqConnShtPcsTimeDisabled(false);
    } else {
      settxtProcControlTime("");
      settxtProcControlTimeDisabled(true);
      setcbxReqConnShtPcsTimeDisabled(true);
    }
  };

  const ReqShtControlPlasmaCheckChanged = (event) => {
    const ReqShtControlPlasmaCheck = event.target.checked;
    setReqShtControlPlasmaCheck(ReqShtControlPlasmaCheck);
    if (ReqShtControlPlasmaCheck) {
      settxtShtPlasmaTime("");
      settxtShtPlasmaTimeDisabled(false);
    } else {
      settxtShtPlasmaTime("");
      settxtShtPlasmaTimeDisabled(true);
    }
  };

  const GetDataProductMaster = async () => {
    if (txtProduct === "") {
      setErrorPrdName(true);
      setErrorPrdNameMessage("Please input product name.");
    } else {
      settxtProduct(txtProduct.toUpperCase().trim());
    }

    try {
      const res = await axios.post("/api/getdatatable", {
        strplantcode: plantCode,
        strprdname: txtProduct
      });
      const Data = res.data;
      console.log("/////", Data)

      settxtUpdateCount("");
      settxtShtLot("");
      settxtPcsSht("");
      setselSheetType("");
      setselDateType("");
      settxtEngCode("");
      settxtRevision("");
      settxtPcsTray("");
      settxtPcsScan("");
      settxtChkStartDig("");
      settxtChkEndDig("");
      settxtChkWord("");
      settxtSerialLength("");
      settxtSerialFormat("");
      settxtSheetFormat("");
      settxtAbbr("");
      settxtShtScan("");
      settxtShtLaser("");
      setselLaminationSide("");
      setchk_DelFlgCheck(false);
      setReqLotCheck(false);
      setReqConfigCheck(false);
      setReqConfigRunCheck(false);
      settxtAddInfo("");
      settxtSerialStartCode("");
      settxtUpdateBy("");
      settxtUpdateDate("");
      if (FIX_CHECK_PRODUCT_MIX === "Y") {
        setReqCheckPrdShtCheck(true);
        settxtCheckPrdShtFrom(FIX_CHECK_PRODUCT_MIX_START);
        settxtCheckPrdShtTo(FIX_CHECK_PRODUCT_MIX_END);
        setcbxReqCheckPrdShtDisabled(true);
        settxtCheckPrdShtFromDisabled(true);
        settxtCheckPrdShtToDisabled(true);
      } else {
        setReqCheckPrdShtCheck(false);
        settxtCheckPrdShtFrom("");
        settxtCheckPrdShtTo("");
        setcbxReqCheckPrdShtDisabled(false);
        settxtCheckPrdShtFromDisabled(true);
        settxtCheckPrdShtToDisabled(true);
      }

      setReqCheckLotShtCheck(false);
      settxtCheckLotShtFrom("");
      settxtCheckLotShtTo("");
      setselStatus("ACTIVE");

      setReqShtControlPlasmaCheck(false);
      settxtPlasmaTime("");
      settxtPlasmaTimeDisabled(true);
      setrbtPlasmaTimePCSDisabled(true);
      setrbtPlasmaTime("");
      setrbtPlasmaTimeSHTDisabled(true);
      setrbtPlasmaTimeGRPDisabled(true);
      setcbxReqUpdatePlasmaDisabled(true);
      setReqUpdatePlasmaCheck(false);

      setcbxPlasmaNotStartELTDisabled(true);
      setPlasmaNotStartELTCheck(false);
      setcbxPlasmaNotShowTimeDisabled(true);
      setPlasmaNotShowTimeCheck(false);

      setReqStartSeqCodeCheck(false);
      settxtStartSeqCode("");
      settxtStartSeqCodeDisabled(true);
      settxtStartSeqDigitFrom("");
      settxtStartSeqDigitFromDisabled(true);
      settxtStartSeqDigitTo("");
      settxtStartSeqDigitToDisabled(true);

      setReqShtELTCheck(false);
      setReqSPIAOICheck(false);
      setReqVendorLotCheck(false);
      settxtVendorLotLengthDisabled(true);
      settxtVendorLotLength("");

      setReqConRollLeafCheck(false);
      settxtRollNoLength("");
      settxtRollNoLengthDisabled(true);
      settxtLeafNoLength("");
      settxtLeafNoLengthDisabled(true);
      settxtLeafScan("");
      settxtLeafScanDisabled(true);
      setcbxLeafReqSerialDisabled(true);
      setcbxReqCheckPrdRollDisabled(true);
      settxtCheckRollPrdFrom("");
      settxtCheckRollPrdFromDisabled(true);
      settxtCheckRollPrdTo("");
      settxtCheckRollPrdToDisabled(true);
      settxtCheckRollPrdWord("");
      settxtCheckRollPrdWordDisabled(true);

      setRollReqCheckPrdLeafCheck(false);
      setcbxRollReqCheckPrdLeafDisabled(true);
      settxtRollCheckPrdLeafFrom("");
      settxtRollCheckPrdLeafFromDisabled(true);
      settxtRollCheckPrdLeafTo("");
      settxtRollCheckPrdLeafToDisabled(true);

      setRollReqCheckLotLeafCheck(false);
      setcbxRollReqCheckLotLeafDisabled(true);
      settxtRollCheckLotLeafFrom("");
      settxtRollCheckLotLeafFromDisabled(true);
      settxtRollCheckLotLeafTo("");
      settxtRollCheckLotLeafToDisabled(true);

      setrbtselLotRoll("rbtLotCheck");

      setReqDateProcCheck(false);
      settxtDateFromProc("");
      settxtDateFromProcDisabled(true);

      setReqCheckWeekCodeCheck(false);
      setcbxReqCheckWeekCodeDisabled(true);
      settxtWeekCodeStart("");
      settxtWeekCodeStartDisabled(true);
      settxtWeekCodeEnd("");
      settxtWeekCodeEndDisabled(true);

      if (FIX_CHECK_PRODUCT_MIX === "Y") {
        setReqCheckPrdShtCheck(true);
        settxtCheckPrdShtFrom(FIX_CHECK_PRODUCT_MIX_START);
        settxtCheckPrdShtTo(FIX_CHECK_PRODUCT_MIX_END);
        settxtCheckPrdShtFromDisabled(false);
        settxtCheckPrdShtToDisabled(false);
      } else {
        setReqCheckPrdShtCheck(false);
        settxtCheckPrdShtFrom("");
        settxtCheckPrdShtTo("");
        settxtCheckPrdShtFromDisabled(true);
        settxtCheckPrdShtToDisabled(true);
      }
      setselCheckIC("N");

      setReqPreAOIFCheck(true);
      setReqPreAOIBCheck(true);
      setReqAOIFCheck(true);
      setReqAOIBCheck(true);
      setReqAOICoatFCheck(false);
      setReqAOICoatBCheck(false);
      setReqSPIFCheck(true);
      setReqSPIBCheck(true);

      setReqSheetMCCheck(false);
      setReqProcControlTimeCheck(false);
      settxtProcControlTime("");
      settxtProcControlTimeDisabled(true);

      setReqFinalPackingGroupCheck(false);
      setReqConShtPcsRollCheck(false);
      settxtBarcodeGrade("");

      setReqShtControlPlasmaCheck(false);
      settxtShtPlasmaTime("");
      settxtShtPlasmaTimeDisabled(true);

      setReqEFPCAOMCheck(false);
      setReqEFPCAOICheck(false);
      setReqEFPCOSTCheck(false);
      setReqEFPCAVICheck(false);

      setReqXrayFCheck(false);
      setReqXrayBCheck(false);
      setReqXrayOneTimeCheck(false);
      setReqFinInspectCheck(false);
      settxtFinInspectProc("");
      settxtFinInspectProcDisabled(true);

      setReqReflowFCheck(false);
      setReqReflowBCheck(false);

      setPlasmaConnShtPcsCheck(false);
      setConnShtReqBoardFlg(false);
      setAutoPressFCheck(false);
      setAutoPressBCheck(false);

      if (Data === "") {
        setpnlMessage(true);
        setlblMessageColor("#ff4d4f");
        setlblMessage("Not found");
      } else {

        settxtUpdateCount(Data.p_prm_update_count);
        settxtShtLot(Data.p_prm_sht_lot);
        settxtPcsSht(Data.p_prm_pcs_sht);
        if (Data.p_prm_sheet_type !== null && Data.p_prm_sheet_type !== undefined) {
          setselSheetType(Data.p_prm_sheet_type);
        }
        if (Data.p_prm_date_type !== null && Data.p_prm_date_type !== undefined) {
          setselDateType(Data.p_prm_date_type);
        }
        if (Data.p_prm_eng_code !== null && Data.p_prm_eng_code !== undefined) {
          settxtEngCode(Data.p_prm_eng_code);
        }
        if (Data.p_prm_rev !== null && Data.p_prm_rev !== undefined) {
          settxtRevision(Data.p_prm_rev);
        }
        if (Data.p_prm_pcs_tray !== null && Data.p_prm_pcs_tray !== undefined) {
          settxtPcsTray(Data.p_prm_pcs_tray);
        }
        if (Data.p_prm_pcs_scan !== null && Data.p_prm_pcs_scan !== undefined) {
          settxtPcsScan(Data.p_prm_pcs_scan);
        }
        if (Data.p_prm_start_digit !== null && Data.p_prm_start_digit !== undefined) {
          settxtChkStartDig(Data.p_prm_start_digit);
        }
        if (Data.p_prm_end_digit !== null && Data.p_prm_end_digit !== undefined) {
          settxtChkEndDig(Data.p_prm_end_digit);
        }
        if (Data.p_prm_sum_fix_digit !== null && Data.p_prm_sum_fix_digit !== undefined) {
          settxtChkWord(Data.p_prm_sum_fix_digit);
        }
        if (Data.p_prm_serial_length !== null && Data.p_prm_serial_length !== undefined) {
          settxtSerialLength(Data.p_prm_serial_length);
        }
        if (Data.p_prm_serial_format !== null && Data.p_prm_serial_format !== undefined) {
          settxtSerialFormat(Data.p_prm_serial_format);
        }
        if (Data.p_prm_sheet_format !== null && Data.p_prm_sheet_format !== undefined) {
          settxtSheetFormat(Data.p_prm_sheet_format);
        }
        if (Data.p_prm_lamination_side !== null && Data.p_prm_lamination_side !== undefined) {
          setselLaminationSide(Data.p_prm_lamination_side);
        }

        if (Data.p_prm_delete_flg === "1") {
          setchk_DelFlgCheck(true);
        } else {
          setchk_DelFlgCheck(false);
        }

        settxtAbbr(Data.p_prm_abbr);

        if (Data.p_prm_sheet_scan !== null && Data.p_prm_sheet_scan !== undefined) {
          settxtShtScan(Data.p_prm_sheet_scan);
        }
        if (Data.p_prm_sheet_laser !== null && Data.p_prm_sheet_laser !== undefined) {
          settxtShtLaser(Data.p_prm_sheet_laser);
        }

        setReqLotCheck(false);
        if (Data.p_prm_barcode_req_lot !== null && Data.p_prm_barcode_req_lot !== undefined) {
          if (Data.p_prm_barcode_req_lot === "Y") {
            setReqLotCheck(true);
          }
        }
        setReqVendorCheck(false);
        if (Data.p_prm_barcode_req_vendor !== null && Data.p_prm_barcode_req_vendor !== undefined) {
          if (Data.p_prm_barcode_req_vendor === "Y") {
            setReqVendorCheck(true);
          }
        }
        if (Data.p_prm_date_type !== null && Data.p_prm_date_type !== undefined) {
          if (Data.p_prm_date_type === "M") {
            setcbxReqVendorDisabled(true);
            setReqStartSeqCodeCheck(false);
            setcbxReqStartSeqCodeDisabled(true);
            settxtStartSeqCode("");
            settxtStartSeqCodeDisabled(true);
            settxtStartSeqDigitFrom("");
            settxtStartSeqDigitFromDisabled(true);
            settxtStartSeqDigitTo("");
            settxtStartSeqDigitToDisabled(true);
          } else {
            setcbxReqVendorDisabled(false);
            setcbxReqStartSeqCodeDisabled(false);
          }
        }

        setReqConfigCheck(false);
        setReqConfigRunCheck(false);

        settxtConfigWord("");
        settxtConfigStart("");
        settxtConfigEnd("");
        settxtConfigWordDisabled(true);
        settxtConfigStartDisabled(true);
        settxtConfigEndDisabled(true);
        setcbxReqConfigRunDisabled(true);

        if (Data.p_prm_barcode_req_config !== null && Data.p_prm_barcode_req_config !== undefined) {
          if (Data.p_prm_barcode_req_config === "Y") {
            setReqConfigCheck(true);
            settxtConfigWord(Data.p_prm_config_code);
            settxtConfigStart(Data.p_prm_start_config);
            settxtConfigEnd(Data.p_prm_end_config);

            settxtConfigWordDisabled(false);
            settxtConfigStartDisabled(false);
            settxtConfigEndDisabled(false);
            setcbxReqConfigRunDisabled(false);
          }
        }

        if (Data.p_prm_running_req_config !== null && Data.p_prm_running_req_config !== undefined) {
          if (Data.p_prm_running_req_config === "Y" && ReqConfigCheck) {
            setReqConfigRunCheck(true);
          }
        }

        settxtDupStart(Data.p_prm_duplicate_start);
        settxtDupEnd(Data.p_prm_duplicate_end);
        settxtAddInfo(Data.p_prm_additional_info);
        settxtSerialStartCode(Data.p_prm_serial_start_code);
        settxtUpdateBy(Data.p_prm_update_by);
        settxtUpdateDate(Data.p_prm_update_date);

        if (Data.p_prm_req_check_prd_sht === "Y") {
          if (FIX_CHECK_PRODUCT_MIX === "Y") {
            setcbxReqCheckPrdShtDisabled(true);
          }
          setReqCheckPrdShtCheck(true);
          settxtCheckPrdShtFrom(Data.p_prm_check_prd_sht_start);
          settxtCheckPrdShtTo(Data.p_prm_check_prd_sht_end);
          settxtCheckPrdShtFromDisabled(false);
          settxtCheckPrdShtToDisabled(false);
        } else {
          setcbxReqCheckPrdShtDisabled(false);
          setReqCheckPrdShtCheck(false);
          settxtCheckPrdShtFrom("");
          settxtCheckPrdShtTo("");
          settxtCheckPrdShtFromDisabled(true);
          settxtCheckPrdShtToDisabled(true);
        }

        if (Data.p_prm_req_check_lot_sht === "Y") {
          setReqCheckLotShtCheck(true);
          settxtCheckLotShtFrom(Data.p_prm_check_lot_sht_start);
          settxtCheckLotShtTo(Data.p_prm_check_lot_sht_end);
          settxtCheckLotShtFromDisabled(false);
          settxtCheckLotShtToDisabled(false);
        } else {
          setReqCheckLotShtCheck(false);
          settxtCheckLotShtFrom("");
          settxtCheckLotShtTo("");
          settxtCheckLotShtFromDisabled(true);
          settxtCheckLotShtToDisabled(true);
        }

        if (Data.p_prm_sht_control_by === "R") {
          setrbtselLotRoll("rbtRollCheck");
        } else {
          setrbtselLotRoll("rbtLotCheck");
        }

        if (Data.p_prm_product_status !== null && Data.p_prm_product_status !== undefined) {
          setselStatus(Data.p_prm_product_status);
        }

        if (Data.p_prm_check_chip_id_flg !== null && Data.p_prm_check_chip_id_flg !== undefined) {
          setselCheckIC(Data.p_prm_check_chip_id_flg);
        }

        if (Data.p_prm_plasma_time_flg === "Y") {
          setReqControlPlasmaCheck(true);
          settxtPlasmaTime(Data.p_prm_plasma_time);
          settxtPlasmaTimeDisabled(false);
          setrbtPlasmaTimePCSDisabled(false);
          setrbtPlasmaTimeSHTDisabled(false);
          setrbtPlasmaTimeGRPDisabled(false);
          setcbxReqUpdatePlasmaDisabled(false);

          if (Data.p_prm_plasma_time_by === "PCS") {
            setrbtPlasmaTime("rbtPlasmaTimePCSCheck");
          } else {
            setrbtPlasmaTime("");
          }
          if (Data.p_prm_plasma_time_by === "SHT") {
            setrbtPlasmaTime("rbtPlasmaTimeSHTCheck");
          } else {
            setrbtPlasmaTime("");
          }
          if (Data.p_prm_plasma_time_by === "GROUP") {
            setrbtPlasmaTime("rbtPlasmaTimeGRPCheck");
          } else {
            setrbtPlasmaTime("");
          }

          if (Data.p_prm_plasma_time_confirm_flg === "Y") {
            setReqUpdatePlasmaCheck(true);
          } else {
            setrbtPlasmaTime("");
          }

          setcbxPlasmaNotStartELTDisabled(false);
          if (Data.p_prm_plasma_time_skip_elt === "Y") {
            setPlasmaNotStartELTCheck(true);
          }

          setcbxPlasmaNotShowTimeDisabled(false);
          if (Data.p_prm_plasma_time_hide_time === "Y") {
            setPlasmaNotShowTimeCheck(true);
          }
        } else {
          setReqControlPlasmaCheck(false);
          settxtPlasmaTime("");
          settxtPlasmaTimeDisabled(true);
          setrbtPlasmaTime("");
          setrbtPlasmaTimeSHTDisabled(true);
          setrbtPlasmaTimeGRPDisabled(true);
          setcbxReqUpdatePlasmaDisabled(true);
          setReqUpdatePlasmaCheck(false);

          setcbxPlasmaNotStartELTDisabled(true);
          setPlasmaNotStartELTCheck(false);
          setcbxPlasmaNotShowTimeDisabled(true);
          setPlasmaNotShowTimeCheck(false);
        }

        if (Data.p_prm_req_start_seq_flg === "Y") {
          setReqStartSeqCodeCheck(true);
          settxtStartSeqCode(Data.p_prm_start_seq_code);
          settxtStartSeqCodeDisabled(false);
          settxtStartSeqDigitFrom(Data.p_prm_start_seq_start);
          settxtStartSeqDigitFromDisabled(false);
          settxtStartSeqDigitTo(Data.p_prm_start_seq_end);
          settxtStartSeqDigitToDisabled(false);
        } else {
          setReqStartSeqCodeCheck(false);
          settxtStartSeqCode("");
          settxtStartSeqCodeDisabled(true);
          settxtStartSeqDigitFrom("");
          settxtStartSeqDigitFromDisabled(true);
          settxtStartSeqDigitTo("");
          settxtStartSeqDigitToDisabled(true);
        }

        if (Data.p_prm_sheet_elt_flg === "Y") {
          setReqShtELTCheck(true);
        } else {
          setReqShtELTCheck(false);
        }

        if (Data.p_prm_final_aoi_spi_flg === "Y") {
          setReqSPIAOICheck(true);
        } else {
          setReqSPIAOICheck(false);
        }

        if (Data.p_prm_vendor_lot_flg === "Y") {
          setReqVendorLotCheck(true);
          settxtVendorLotLengthDisabled(false);
          settxtVendorLotLength(Data.p_prm_vendor_lot_length);
        } else {
          setReqVendorLotCheck(false);
          settxtVendorLotLengthDisabled(true);
          settxtVendorLotLength("");
        }

        if (Data.p_prm_conn_roll_leaf_flg === "Y") {
          setReqConRollLeafCheck(true);
          settxtRollNoLengthDisabled(false);
          settxtRollNoLength(Data.p_prm_conn_roll_length);
          settxtLeafNoLengthDisabled(false);
          settxtLeafNoLength(Data.p_prm_conn_leaf_length);

          settxtLeafScan(Data.p_prm_conn_roll_leaf_scan);
          settxtLeafScanDisabled(false);

          setcbxLeafReqSerialDisabled(false);
          if (Data.p_prm_conn_roll_serial_flg === "Y") {
            setLeafReqSerialCheck(true);
          } else {
            setLeafReqSerialCheck(false);
          }

          setcbxReqCheckPrdRollDisabled(false);
          if (Data.p_prm_conn_roll_prd_flg === "Y") {
            setReqCheckPrdRollCheck(true);
            settxtCheckRollPrdFrom(p_prm_conn_roll_prd_start);
            settxtCheckRollPrdFromDisabled(false);
            settxtCheckRollPrdTo(Data.p_prm_conn_roll_prd_end);
            settxtCheckRollPrdToDisabled(false);
            settxtCheckRollPrdWord(Data.p_prm_conn_roll_prd_fix);
            settxtCheckRollPrdWordDisabled(false);
          } else {
            setReqCheckPrdRollCheck(false);
            settxtCheckRollPrdFrom("");
            settxtCheckRollPrdFromDisabled(true);
            settxtCheckRollPrdTo("");
            settxtCheckRollPrdToDisabled(true);
            settxtCheckRollPrdWord("");
            settxtCheckRollPrdWordDisabled(true);
          }

          setcbxRollReqCheckPrdLeafDisabled(false);
          if (Data.p_prm_conn_roll_req_prd_sht === "Y") {
            setRollReqCheckPrdLeafCheck(true);
            settxtRollCheckPrdLeafFrom(Data.p_prm_conn_roll_prd_sht_start);
            settxtRollCheckPrdLeafFromDisabled(false);
            settxtRollCheckPrdLeafTo(Data.p_prm_conn_roll_prd_sht_end);
            settxtRollCheckPrdLeafToDisabled(false);
          } else {
            setRollReqCheckPrdLeafCheck(false);
            settxtRollCheckPrdLeafFrom("");
            settxtRollCheckPrdLeafFromDisabled(true);
            settxtRollCheckPrdLeafTo("");
            settxtRollCheckPrdLeafToDisabled(true);
          }

          setcbxRollReqCheckLotLeafDisabled(false);
          if (Data.p_prm_conn_roll_req_lot_sht === "Y") {
            setRollReqCheckLotLeafCheck(true);
            settxtRollCheckLotLeafFrom(Data.p_prm_conn_roll_lot_sht_start);
            settxtRollCheckLotLeafFromDisabled(false);
            settxtRollCheckLotLeafTo(Data.p_prm_conn_roll_lot_sht_end);
            settxtRollCheckLotLeafToDisabled(false);
          } else {
            setRollReqCheckLotLeafCheck(false);
            settxtRollCheckLotLeafFrom("");
            settxtRollCheckLotLeafFromDisabled(true);
            settxtRollCheckLotLeafTo("");
            settxtRollCheckLotLeafToDisabled(true);
          }
        } else {
          setReqConRollLeafCheck(false);
          settxtRollNoLengthDisabled(true);
          settxtRollNoLength("");
          settxtLeafNoLengthDisabled(true);
          settxtLeafNoLength("");

          settxtLeafScan("");
          settxtLeafScanDisabled(true);
          setcbxLeafReqSerialDisabled(true);
          setcbxReqCheckPrdRollDisabled(true);
          settxtCheckRollPrdFrom("");
          settxtCheckRollPrdFromDisabled(true);
          settxtCheckRollPrdTo("");
          settxtCheckRollPrdToDisabled(true);

          setRollReqCheckPrdLeafCheck(false);
          setcbxRollReqCheckPrdLeafDisabled(true);
          settxtRollCheckPrdLeafFrom("");
          settxtRollCheckPrdLeafFromDisabled(true);
          settxtRollCheckPrdLeafTo("");
          settxtRollCheckPrdLeafToDisabled(true);

          setRollReqCheckLotLeafCheck(false);
          setcbxRollReqCheckLotLeafDisabled(true);
          settxtRollCheckLotLeafFrom("");
          settxtRollCheckLotLeafFromDisabled(true);
          settxtRollCheckLotLeafTo("");
          settxtRollCheckLotLeafToDisabled(true);
        }

        if (Data.p_prm_date_inproc_flg === "Y") {
          setReqDateProcCheck(true);
          settxtDateFromProcDisabled(false);
          settxtDateFromProc(Data.p_prm_date_inproc);
          setcbxReqCheckWeekCodeDisabled(false);
        } else {
          setReqDateProcCheck(false);
          settxtDateFromProcDisabled(true);
          settxtDateFromProc("");
        }

        if (Data.p_prm_check_weekcode_flg === "Y") {
          setcbxReqCheckWeekCodeDisabled(false);
          setReqCheckWeekCodeCheck(true);
          settxtWeekCodeStartDisabled(false);
          settxtWeekCodeStart(Data.p_prm_check_weekcode_start);
          settxtWeekCodeEndDisabled(false);
          settxtWeekCodeEnd(Data.p_prm_check_weekcode_end);
        } else {
          setReqCheckWeekCodeCheck(false);
          settxtWeekCodeStartDisabled(true);
          settxtWeekCodeStart("");
          settxtWeekCodeEndDisabled(true);
          settxtWeekCodeEnd("");
        }

        if (Data.p_prm_sht_pre_aoi_f === "Y") {
          setReqPreAOIFCheck(true);
        } else {
          setReqPreAOIFCheck(false);
        }

        if (Data.p_prm_sht_pre_aoi_b === "Y") {
          setReqPreAOIBCheck(true);
        } else {
          setReqPreAOIBCheck(false);
        }

        if (Data.p_prm_sht_aoi_f === "Y") {
          setReqAOIFCheck(true);
        } else {
          setReqAOIFCheck(false);
        }

        if (Data.p_prm_sht_aoi_b === "Y") {
          setReqAOIBCheck(true);
        } else {
          setReqAOIBCheck(false);
        }

        if (Data.p_prm_sht_aoi_coat_f === "Y") {
          setReqAOICoatFCheck(true);
        } else {
          setReqAOICoatFCheck(false);
        }

        if (Data.p_prm_sht_aoi_coat_b === "Y") {
          setReqAOICoatBCheck(true);
        } else {
          setReqAOICoatBCheck(false);
        }

        if (Data.p_prm_sht_spi_f === "Y") {
          setReqSPIFCheck(true);
        } else {
          setReqSPIFCheck(false);
        }

        if (Data.p_prm_sht_spi_b === "Y") {
          setReqSPIBCheck(true);
        } else {
          setReqSPIBCheck(false);
        }

        if (Data.p_prm_sht_machine_flg === "Y") {
          setReqSheetMCCheck(true);
        } else {
          setReqSheetMCCheck(false);
        }

        if (Data.p_prm_proc_control_time_flg === "Y") {
          setReqProcControlTimeCheck(true);
          settxtProcControlTimeDisabled(false);
          settxtProcControlTime(Data.p_prm_proc_control_time);
          setcbxReqConnShtPcsTimeDisabled(false);
          if (Data.p_prm_conn_sht_control_time_flg === "Y") {
            setReqConnShtPcsTimeCheck(true);
          } else {
            setReqConnShtPcsTimeCheck(false);
          }
        } else {
          setReqProcControlTimeCheck(false);
          settxtProcControlTimeDisabled(true);
          settxtProcControlTime("");
          setReqConnShtPcsTimeCheck(false);
          setcbxReqConnShtPcsTimeDisabled(true);
        }

        if (Data.p_prm_final_packing_group_flg === "Y") {
          setReqFinalPackingGroupCheck(true);
        } else {
          setReqFinalPackingGroupCheck(false);
        }

        if (Data.p_prm_conn_roll_sht_flg === "Y") {
          setReqConShtPcsRollCheck(true);
        } else {
          setReqConShtPcsRollCheck(false);
        }

        settxtBarcodeGrade(Data.p_prm_barcode_grade);

        if (Data.p_prm_sht_plasma_time_flg === "Y") {
          setReqShtControlPlasmaCheck(true);
          settxtShtPlasmaTimeDisabled(false);
          settxtShtPlasmaTime(Data.p_prm_sht_plasma_time);
        } else {
          setReqShtControlPlasmaCheck(false);
          settxtShtPlasmaTimeDisabled(true);
          settxtShtPlasmaTime("");
        }

        if (Data.p_prm_check_efpc_aom_flg === "Y") {
          setReqEFPCAOMCheck(true);
        } else {
          setReqEFPCAOMCheck(false);
        }

        if (Data.p_prm_check_efpc_aoi_flg === "Y") {
          setReqEFPCAOICheck(true);
        } else {
          setReqEFPCAOICheck(false);
        }

        if (Data.p_prm_check_efpc_ost_flg === "Y") {
          setReqEFPCOSTCheck(true);
        } else {
          setReqEFPCOSTCheck(false);
        }

        if (Data.p_prm_check_efpc_avi_flg === "Y") {
          setReqEFPCAVICheck(true);
        } else {
          setReqEFPCAVICheck(false);
        }

        if (Data.p_prm_conn_shtpcs_plasma_flg === "Y") {
          setPlasmaConnShtPcsCheck(true);
        } else {
          setPlasmaConnShtPcsCheck(false);
        }

        if (Data.p_prm_sht_xray_f === "Y") {
          setReqXrayFCheck(true);
        } else {
          setReqXrayFCheck(false);
        }

        if (Data.p_prm_sht_xray_b === "Y") {
          setReqXrayBCheck(true);
        } else {
          setReqXrayBCheck(false);
        }

        if (Data.p_prm_sht_xray_1_time_flg === "Y") {
          setReqXrayOneTimeCheck(true);
        } else {
          setReqXrayOneTimeCheck(false);
        }

        if (Data.p_prm_fin_gate_inspect_flg === "Y") {
          setReqFinInspectCheck(true);
          settxtFinInspectProc(Data.p_prm_fin_gate_inspect_proc);
          settxtFinInspectProcDisabled(false);
        } else {
          setReqFinInspectCheck(false);
          settxtFinInspectProc("");
          settxtFinInspectProcDisabled(true);
        }

        if (Data.p_prm_sht_reflow_f === "Y") {
          setReqReflowFCheck(true);
        } else {
          setReqReflowFCheck(false);
        }

        if (Data.p_prm_sht_reflow_b === "Y") {
          setReqReflowBCheck(true);
        } else {
          setReqReflowBCheck(false);
        }

        if (Data.p_prm_conn_sht_board_flg === "Y") {
          setConnShtReqBoardFlg(true);
        } else {
          setConnShtReqBoardFlg(false);
        }

        if (Data.p_prm_sht_auto_press_f === "Y") {
          setAutoPressFCheck(true);
        } else {
          setAutoPressFCheck(false);
        }

        if (Data.p_prm_sht_auto_press_b === "Y") {
          setAutoPressBCheck(true);
        } else {
          setAutoPressBCheck(false);
        }

        setpnlMessage(true);
        setlblMessageColor("darkblue");
        setlblMessage("Data read complete.");
      }

    } catch (error) {
      setpnlMessage(true);
      setlblMessageColor("#ff4d4f");
      setlblMessage(error);
    }
  };

  const ReqFinInspectCheckChanged = (event) => {
    const ReqFinInspectCheck = event.target.checked;
    setReqFinInspectCheck(ReqFinInspectCheck);
    if (ReqFinInspectCheck) {
      settxtFinInspectProcDisabled(false);
      settxtFinInspectProc("");
    } else {
      settxtFinInspectProc("");
      settxtFinInspectProcDisabled(true);
    }
  };

  const chk_DelFlgCheckChanged = (event) => {
    const chk_DelFlgCheck = event.target.checked;
    setchk_DelFlgCheck(chk_DelFlgCheck);
  };

  const btnSubmitClick = async () => {
    const result = await Swal.fire({
      title: 'Are you sure you want to submit?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      icon: 'warning',
    });

    if (result.isConfirmed) {
      let BeginTransFlg = false;

      setpnlMessage(true);
      setlblMessageColor("black");
      setlblMessage("exec...");

      if (txtProduct === "") {
        setErrorPrdName(true);
        setErrorPrdNameMessage("Please input product name.");
      } else {
        settxtProduct(txtProduct.toUpperCase().trim());
      }

      if (txtShtLot === "") {
        setErrorShtLot(true);
        setErrorShtLotMessage("Please input Sheet/Lot.")
      } else if (isNaN(txtShtLot)) {
        setErrorShtLot(true);
        setErrorShtLotMessage("Please input Sheet/Lot with numbers.")
      } else {
        settxtShtLot(txtShtLot);
      }

      if (txtPcsSht === "") {
        setErrorPcsSht(true);
        setErrorPcsShtMessage("Please input Piece/Sheet.");
      } else if (isNaN(txtPcsSht)) {
        setErrorPcsSht(true);
        setErrorPcsShtMessage("Please input Piece/Sheet with numbers.");
      } else {
        settxtPcsSht(txtPcsSht);
      }

      if (txtShtScan === "") {
        setErrorShtScan(true);
        setErrorShtScanMessage("Please input Sheet/Scan.");
      } else if (isNaN(txtShtScan)) {
        setErrorShtScan(true);
        setErrorShtScanMessage("Please input Sheet/Scan with numbers.");
      } else {
        settxtShtScan(txtShtScan);
      }

      if (txtShtLaser === "") {
        settxtShtLaser("0");
      } else if (isNaN(txtShtLaser)) {
        setErrorShtLaser(true);
        setErrorShtLaserMessage("Please input Sheet/Laser with numbers.");
      } else {
        settxtShtLaser(txtShtLaser);
      }

      if (ReqConfigCheck) {
        const start = parseInt(txtConfigEnd);
        const end = parseInt(txtConfigStart);
        if (txtConfigWord === "") {
          setErrorConfigWord(true);
          setErrorConfigWordMessage("Please input config word.");
        } else if (isNaN(txtConfigStart)) {
          setErrorConfigStart(true);
          setErrorConfigStartMessage("Please input start config digit with numbers.");
        } else if (isNaN(txtConfigEnd)) {
          setErrorConfigEnd(true);
          setErrorConfigEndMessage("Please input end config digit with numbers.");
        } else if (parseInt(txtConfigStart) > parseInt(txtConfigEnd)) {
          setErrorConfigStart(true);
          setErrorConfigStartMessage("Please input start less than end of config digit.");
        } else if (parseInt(txtConfigEnd) > parseInt(txtSerialLength)) {
          setErrorConfigEnd(true);
          setErrorConfigEndMessage("Please input end config digit not over serial length.");
        } else if (txtConfigWord.length !== (start - 1, end)) {
          setErrorConfigStart(true);
          setErrorConfigStartMessage("Please input start and end digit same as length of config word.");
        }
      } else {
        setReqConfigRunCheck(false);
      }

      if (txtDupStart === "") {
        setErrorDupStart(true);
        setErrorDupStartMessage("Please input duplicate start digit.");
      } else if (isNaN(txtDupStart)) {
        setErrorDupStart(true);
        setErrorDupStartMessage("Please input duplicate start digit with numbers.");
      } else {
        settxtDupStart(txtDupStart);
      }

      if (txtDupEnd === "") {
        setErrorDupEnd(true);
        setErrorDupEndMessage("Please input duplicate end digit.");
      } else if (isNaN(txtDupEnd)) {
        setErrorDupEnd(true);
        setErrorDupEndMessage("Please input duplicate end digit with numbers.");
      } else {
        settxtDupEnd(txtDupEnd);
      }

      if (ReqCheckPrdShtCheck) {
        if (isNaN(txtCheckPrdShtFrom)) {
          setErrorCheckPrdShtFrom(true);
          setErrorCheckPrdShtFromMessage("Please input sheet PRD. start digit.");
        } else if (isNaN(txtCheckPrdShtTo)) {
          setErrorCheckPrdShtTo(true);
          setErrorCheckPrdShtToMessage("Please input sheet PRD. end digit.");
        } else if (isNaN(txtCheckPrdShtTo) && isNaN(txtCheckPrdShtFrom) && parseInt(txtCheckPrdShtFrom) > parseInt(txtCheckPrdShtTo)) {
          setErrorCheckPrdShtFrom(true);
          setErrorCheckPrdShtFromMessage("Please input sheet PRD. start less than end digit.");
        }
      } else {
        settxtCheckPrdShtFrom("");
        settxtCheckPrdShtTo("");
      }

      if (ReqCheckLotShtCheck) {
        if (isNaN(txtCheckLotShtFrom)) {
          setErrorCheckLotShtFrom(true);
          setErrorCheckLotShtFromMessage("Please input sheet lot start digit.");
        } else if (isNaN(txtCheckLotShtTo)) {
          setErrorCheckLotShtTo(true);
          setErrorCheckLotShtToMessage("Please input sheet lot end digit.");
        } else if (isNaN(txtCheckLotShtTo) && isNaN(txtCheckLotShtFrom) && parseInt(txtCheckLotShtFrom) > parseInt(txtCheckLotShtTo)) {
          setErrorCheckLotShtFrom(true);
          setErrorCheckLotShtFromMessage("Please input sheet lot start less than end digit.");
        }
      } else {
        settxtCheckLotShtFrom("");
        settxtCheckLotShtTo("");
      }

      if (ReqControlPlasmaCheck) {
        if (isNaN(txtPlasmaTime)) {
          setErrorPlasmaTime(true);
          setErrorPlasmaTimeMessage("Please control plasma time.");
        }
      }

      if (ReqStartSeqCodeCheck) {
        if (txtStartSeqCode === "") {
          setErrorStartSeqCode(true);
          setErrorStartSeqCodeMessage("Please input start seq. code");
        } else if (isNaN(txtStartSeqDigitFrom)) {
          setErrorStartSeqDigitFrom(true);
          setErrorStartSeqDigitFromMessage("Please input start seq. start digit.");
        } else if (isNaN(txtStartSeqDigitTo)) {
          setErrorStartSeqDigitTo(true);
          setErrorStartSeqDigitToMessage("Please input start seq. end digit.");
        } else if (isNaN(txtStartSeqDigitTo) && isNaN(txtStartSeqDigitFrom) && parseInt(txtStartSeqDigitFrom) > parseInt(txtStartSeqDigitTo)) {
          setErrorStartSeqDigitFrom(true);
          setErrorStartSeqDigitFromMessage("Please input start seq. start less than end digit.");
        }
      } else {
        settxtStartSeqCode("");
        settxtStartSeqCodeDisabled(true);
        settxtStartSeqDigitFrom("");
        settxtStartSeqDigitFromDisabled(true);
        settxtStartSeqDigitTo("");
        settxtStartSeqDigitToDisabled(true);
      }

      if (ReqVendorLotCheck) {
        if (txtVendorLotLength === "") {
          setErrorVendorLotLength(true);
          setErrorVendorLotLengthMessage("Please input length of vendor lot.");
        }
      } else {
        settxtVendorLotLength("");
        settxtVendorLotLengthDisabled(true);
      }

      if (ReqConRollLeafCheck) {
        if (txtRollNoLength === "") {
          setErrorRollNoLength(true);
          setErrorRollNoLengthMessage("Please input length of roll seq.");
        }
        if (txtLeafNoLength === "") {
          setErrorLeafNoLength(true);
          setErrorLeafNoLengthhMessage("Please input length of roll seq.");
        }

        if (txtLeafScan === "") {
          setErrorLeafScan(true);
          setErrorLeafScanMessage("Please input of leaf scan");
        } else if (isNaN(txtLeafScan)) {
          setErrorLeafScan(true);
          setErrorLeafScanMessage("Please input number of leaf scan");
        } else if (parseInt(txtLeafScan) === 0) {
          setErrorLeafScan(true);
          setErrorLeafScanMessage("Please input number of leaf scan");
        }

        if (ReqCheckPrdRollCheck) {
          if (isNaN(txtCheckRollPrdFrom)) {
            setErrorCheckRollPrdFrom(true);
            setErrorCheckRollPrdFromMessage("Please input roll PRD. start digit.");
          } else if (isNaN(txtCheckRollPrdTo)) {
            setErroCheckRollPrdTo(true);
            setErrorCheckRollPrdToMessage("Please input roll PRD. end digit.");
          } else if (isNaN(txtCheckRollPrdTo) && isNaN(txtCheckRollPrdFrom) && parseInt(txtCheckRollPrdFrom) > parseInt(txtCheckRollPrdTo)) {
            setErrorCheckRollPrdFrom(true);
            setErrorCheckRollPrdFromMessage("Please input roll PRD. start less than end digit.");
          } else if (txtCheckRollPrdWord === "") {
            setErrorCheckRollPrdWord(true);
            setErrorCheckRollPrdWordMessage("Please input check roll PRD. word.");
          }
        } else {
          settxtCheckRollPrdFrom("");
          settxtCheckRollPrdFromDisabled(true);
          settxtCheckRollPrdTo("");
          settxtCheckRollPrdToDisabled(true);
          settxtCheckRollPrdWord("");
          settxtCheckRollPrdWordDisabled(true);
        }

        if (RollReqCheckPrdLeafCheck) {
          if (isNaN(txtRollCheckPrdLeafFrom)) {
            setErrorRollCheckPrdLeafFrom(true);
            setErrorRollCheckPrdLeafFromMessage("Please input leaf PRD. start digit.");
          } else if (isNaN(txtRollCheckPrdLeafTo)) {
            setErrorRollCheckPrdLeafTo(true);
            setErrorRollCheckPrdLeafToMessage("Please input leaf PRD. end digit.");
          } else if (isNaN(txtRollCheckPrdLeafTo) && isNaN(txtRollCheckPrdLeafFrom) && parseInt(txtRollCheckPrdLeafFrom) > parseInt(txtRollCheckPrdLeafTo)) {
            setErrorRollCheckPrdLeafFrom(true);
            setErrorRollCheckPrdLeafFromMessage("Please input leaf PRD. start less than end digit.");
          }
        } else {
          settxtRollCheckPrdLeafFrom("");
          settxtRollCheckPrdLeafFromDisabled(true);
          settxtRollCheckPrdLeafTo("");
          settxtRollCheckPrdLeafToDisabled(true);
        }

        if (RollReqCheckLotLeafCheck) {
          if (isNaN(txtRollCheckLotLeafFrom)) {
            setErrorRollCheckLotLeafFrom(true);
            setErrorRollCheckLotLeafFromMessage("Please input leaf lot start digit.");
          } else if (isNaN(txtRollCheckLotLeafTo)) {
            setErrorRollCheckLotLeafTo(true);
            setErrorRollCheckLotLeafToMessage("Please input leaf lot end digit.");
          } else if (isNaN(txtRollCheckLotLeafTo) && isNaN(txtRollCheckLotLeafFrom) && parseInt(txtRollCheckLotLeafFrom) > parseInt(txtRollCheckLotLeafTo)) {
            setErrorRollCheckLotLeafFrom(true);
            setErrorRollCheckLotLeafFromMessage("Please input leaf lot start less than end digit.");
          }
        } else {
          settxtRollCheckLotLeafFrom("");
          settxtRollCheckLotLeafFromDisabled(true);
          settxtRollCheckLotLeafTo("");
          settxtRollCheckLotLeafToDisabled(true);
        }
      } else {
        settxtRollNoLength("");
        settxtRollNoLengthDisabled(true);
        settxtLeafNoLength("");
        settxtLeafNoLengthDisabled(true);

        settxtLeafScan("");
        settxtLeafScanDisabled(true);
        setcbxLeafReqSerialDisabled(true);
        setLeafReqSerialCheck(false);
        setcbxReqCheckPrdRollDisabled(true);
        setReqCheckPrdRollCheck(false);
        settxtCheckRollPrdFrom("");
        settxtCheckRollPrdFromDisabled(true);
        settxtCheckRollPrdTo("");
        settxtCheckRollPrdToDisabled(true);
        settxtCheckRollPrdWord("");
        settxtCheckRollPrdWordDisabled(true);

        setcbxRollReqCheckPrdLeafDisabled(true);
        setRollReqCheckPrdLeafCheck(false);
        settxtRollCheckPrdLeafFrom("");
        settxtRollCheckPrdLeafFromDisabled(true);
        settxtRollCheckPrdLeafTo("");
        settxtRollCheckPrdLeafToDisabled(true);

        setcbxRollReqCheckLotLeafDisabled(true);
        setRollReqCheckLotLeafCheck(false);
        settxtRollCheckLotLeafFrom("");
        settxtRollCheckLotLeafFromDisabled(true);
        settxtRollCheckLotLeafTo("");
        settxtRollCheckLotLeafToDisabled(true);
      }

      if (ReqDateProcCheck) {
        if (txtDateFromProc === "") {
          setErrorDateFromProc(true);
          setErrorDateFromProcMessage("Please input process for serial date.");
        }
      } else {
        settxtDateFromProc("");
        settxtDateFromProcDisabled(true);
      }

      if (ReqCheckWeekCodeCheck) {
        if (isNaN(txtWeekCodeStart)) {
          setErrorWeekCodeStart(true);
          setErrorWeekCodeStartMessage("Please input week code start digit.");
        } else if (isNaN(txtWeekCodeEnd)) {
          setErrorWeekCodeEnd(true);
          setErrorWeekCodeEndMessage("Please input week code end digit.");
        } else if (isNaN(txtWeekCodeEnd) && isNaN(txtWeekCodeStart) && parseInt(txtWeekCodeStart) > parseInt(txtWeekCodeEnd)) {
          setErrorWeekCodeStart(true);
          setErrorWeekCodeStartMessage("Please input week code start less than end digit.");
        }
      } else {
        settxtWeekCodeStart("");
        settxtWeekCodeStartDisabled(true);
        settxtWeekCodeEnd("");
        settxtWeekCodeEndDisabled(true);
      }

      if (ReqProcControlTimeCheck) {
        if (txtProcControlTime === "") {
          setErrorProcControlTime(true);
          setErrorProcControlTimeMessage("Please input process control time.");
        }
      } else {
        settxtProcControlTime("");
        settxtProcControlTimeDisabled(true);
        setReqConnShtPcsTimeCheck(false);
        setcbxReqConnShtPcsTimeDisabled(true);
      }

      if (ReqShtControlPlasmaCheck) {
        if (txtShtPlasmaTime === "") {
          setErrorShtPlasmaTime(true);
          setErrorShtPlasmaTimeMessage("Please input sheet process control time.");
        }
      } else {
        settxtShtPlasmaTime("");
        settxtShtPlasmaTimeDisabled(true);
      }

      if (ReqFinInspectCheck) {
        if (txtFinInspectProc === "") {
          setErrorFinInspectProc(true);
          setErrorFinInspectProcMessage("Please input final inspection process.");
        }
      } else {
        settxtFinInspectProc("");
        settxtFinInspectProcDisabled(true);
      }

      if (txtAbbr === "") {
        if (selSheetType === "") {
          setErrorselSheetType(true);
          setErrorselSheetTypeMessage("Please select sheet type.");
        }

        if (selDateType === "") {
          setErrorselDateType(true);
          setErrorselDateTypeMessage("Pease select date type.");
        }

        if (txtEngCode === "") {
          setErrorEngCode(true);
          setErrorEngCodeMessage("Please input engineer code.");
        }

        if (txtRevision === "") {
          setErrorRevision(true);
          setErrorRevisionMessage("Please input revision.");
        }

        if (txtPcsTray === "") {
          setErrorPcsTray(true);
          setErrorPcsTrayMessage("Please input pcs/tray.");
        } else if (isNaN(txtPcsTray)) {
          setErrorPcsTray(true);
          setErrorPcsTrayMessage("Please input pcs/tray with number.");
        }

        if (txtPcsScan === "") {
          setErrorPcsScan(true);
          setErrorPcsScanMessage("Please input pcs/scan.");
        } else if (isNaN(txtPcsScan)) {
          setErrorPcsScan(true);
          setErrorPcsScanMessage("Please input pcs/scan with number.");
        }

        if (txtChkStartDig === "") {
          setErrorChkStartDig(true);
          setErrorChkStartDigMessage("Please input check start digit.");
        } else if (isNaN(txtChkStartDig)) {
          setErrorChkStartDig(true);
          setErrorChkStartDigMessage("Please input check start digit with number.");
        }

        if (txtChkEndDig === "") {
          setErrorChkEndDig(true);
          setErrorChkEndDigMessage("Please input check engineer digit.");
        } else if (isNaN(txtChkEndDig)) {
          setErrorChkEndDig(true);
          setErrorChkEndDigMessage("Please input check end digit with number.");
        }

        if (txtChkWord === "") {
          setErrorChkWord(true);
          setErrorChkWordMessage("Please input check word.");
        }

        if (txtSerialLength === "") {
          setErrorSerialLength(true);
          setErrorSerialLengthMessage("Please input serial length.");
        } else if (isNaN(txtSerialLength)) {
          setErrorSerialLength(true);
          setErrorSerialLengthMessage("Please input serial length with number.");
        }

        if (txtSerialFormat === "") {
          setErrorSerialFormat(true);
          setErrorSerialFormatMessage("Please input serial btw file name.");
        }

        if (selLaminationSide === "") {
          setErrorLaminationSide(true);
          setErrorLaminationSideMessage("Please select lamination side.");
        }

        if (MST_PASSWORD !== "") {
          if (txtPassWord !== MST_PASSWORD) {
            setErrorPassWord(true);
            setErrorPassWordMessage("Password incorrect.");
          }
        }
      }

      try {
        const res = await axios.post("/api/getupdatecount", {
          strplantcode: plantCode,
          strprdname: txtProduct
        });
        const dt = res.data.p_prm_update_count;
        console.log("kkkk", dt);

        if (dt > 0) {
          BeginTransFlg = true;
          const txtUpdateCount = String(parseInt(dt) + 1).trim();
          settxtUpdateCount(txtUpdateCount);
          await axios.post("/api/updateProductMst", {
            strUpdateCount: txtUpdateCount,
            strShtLot: txtShtLot,
            strPcsSht: txtPcsSht,
            ddlSheetType: selSheetType,
            ddlDateType: selDateType,
            strEngCode: txtEngCode,
            strRevision: txtRevision,
            strPcsTray: txtPcsTray,
            strPcsScan: txtPcsScan,
            strChkStartDig: txtChkStartDig,
            strChkEndDig: txtChkEndDig,
            strChkWord: txtChkWord,
            strSerialLength: txtSerialLength,
            strSerialFormat: txtSerialFormat,
            strSheetFormat: txtSheetFormat,
            ddlLaminationSide: selLaminationSide,
            strUserName: hfUserName,
            ipAddress: ip,
            chk_DelFlg: chk_DelFlgCheck,
            strAbbr: txtAbbr,
            strShtScan: txtShtScan,
            strShtLaser: txtShtLaser,
            cbxReqLot: ReqLotCheck,
            cbxReqVendor: ReqVendorCheck,
            cbxReqConfig: ReqConfigCheck,
            strConfigWord: txtConfigWord,
            strConfigStart: ReqConfigCheck ? txtConfigStart : null,
            strConfigEnd: ReqConfigCheck ? txtConfigEnd : null,
            cbxReqConfigRun: ReqConfigRunCheck,
            strDupStart: txtDupStart,
            strDupEnd: txtDupEnd,
            strAddInfo: txtAddInfo,
            strSerialStartCode: txtSerialStartCode,
            cbxReqCheckPrdSht: ReqCheckPrdShtCheck,
            strCheckPrdShtFrom: ReqCheckPrdShtCheck ? txtCheckPrdShtFrom : null,
            strCheckPrdShtTo: ReqCheckPrdShtCheck ? txtCheckPrdShtTo : null,
            cbxReqCheckLotSht: ReqCheckLotShtCheck,
            strCheckLotShtFrom: ReqCheckLotShtCheck ? txtCheckLotShtFrom : null,
            strCheckLotShtTo: ReqCheckLotShtCheck ? txtCheckLotShtTo : null,
            rbtRoll: rbtselLotRoll,
            ddlStatus: selStatus,
            cbxReqControlPlasma: ReqControlPlasmaCheck,
            strPlasmaTime: ReqControlPlasmaCheck ? txtPlasmaTime : null,
            rbtPlasmaTimePCS: rbtPlasmaTime,
            rbtPlasmaTimeSHT: rbtPlasmaTime,
            rbtPlasmaTimeGRP: rbtPlasmaTime,
            cbxReqUpdatePlasma: ReqUpdatePlasmaCheck,
            cbxReqStartSeqCode: ReqStartSeqCodeCheck,
            strStartSeqCode: txtStartSeqCode,
            strStartSeqDigitFrom: ReqStartSeqCodeCheck ? txtStartSeqDigitFrom : null,
            strStartSeqDigitTo: ReqStartSeqCodeCheck ? txtStartSeqDigitTo : null,
            cbxReqSheetELT: ReqShtELTCheck,
            cbxReqSPIAOI: ReqSPIAOICheck,
            cbxReqVendorLot: ReqVendorCheck,
            strVendorLotLength: txtVendorLotLength,
            cbxReqConRollLeaf: ReqConRollLeafCheck,
            strRollNoLength: txtRollNoLength,
            strLeafNoLength: txtLeafNoLength,
            cbxReqDateProc: ReqDateProcCheck,
            strDateFromProc: txtDateFromProc,
            cbxReqCheckWeekCode: ReqCheckWeekCodeCheck,
            strWeekCodeStart: ReqCheckWeekCodeCheck ? txtWeekCodeStart : null,
            strWeekCodeEnd: ReqCheckWeekCodeCheck ? txtWeekCodeEnd : null,
            cbxReqPreAOIF: ReqPreAOIFCheck,
            cbxReqPreAOIB: ReqPreAOIBCheck,
            cbxReqAOIF: ReqAOIFCheck,
            cbxReqAOIB: ReqAOIBCheck,
            cbxReqAOICoatF: ReqAOICoatFCheck,
            cbxReqAOICoatB: ReqAOICoatBCheck,
            cbxReqSPIF: ReqSPIFCheck,
            cbxReqSPIB: ReqSPIBCheck,
            strLeafScan: ReqConRollLeafCheck ? txtLeafScan : null,
            cbxLeafReqSerial: LeafReqSerialCheck,
            cbxReqCheckPrdRoll: ReqCheckPrdRollCheck,
            strCheckRollPrdFrom: ReqCheckPrdRollCheck ? txtCheckRollPrdFrom : null,
            strCheckRollPrdTo: ReqCheckPrdRollCheck ? txtCheckRollPrdTo : null,
            strCheckRollPrdWord: txtCheckRollPrdWord,
            cbxRollReqCheckPrdLeaf: RollReqCheckPrdLeafCheck,
            strRollCheckPrdLeafFrom: RollReqCheckPrdLeafCheck ? txtRollCheckPrdLeafFrom : null,
            strRollCheckPrdLeafTo: RollReqCheckPrdLeafCheck ? txtRollCheckPrdLeafTo : null,
            cbxRollReqCheckLotLeaf: RollReqCheckLotLeafCheck,
            strRollCheckLotLeafFrom: RollReqCheckLotLeafCheck ? txtRollCheckLotLeafFrom : null,
            strRollCheckLotLeafTo: RollReqCheckLotLeafCheck ? txtRollCheckLotLeafTo : null,
            cbxReqSheetMC: ReqSheetMCCheck,
            cbxReqProcControlTime: ReqProcControlTimeCheck,
            strProcControlTime: ReqProcControlTimeCheck ? txtProcControlTime : null,
            cbxReqConnShtPcsTime: ReqConnShtPcsTimeCheck,
            cbxReqFinalPackingGroup: ReqFinalPackingGroupCheck,
            cbxReqConShtPcsRoll: ReqConShtPcsRollCheck,
            strBarcodeGrade: txtBarcodeGrade,
            cbxReqShtControlPlasma: ReqShtControlPlasmaCheck,
            strShtPlasmaTime: txtShtPlasmaTime,
            cbxPlasmaNotStartELT: PlasmaNotStartELTCheck,
            cbxPlasmaNotShowTime: PlasmaNotShowTimeCheck,
            cbxReqEFPCAOM: ReqEFPCAOMCheck,
            cbxReqEFPCAOI: ReqEFPCAOICheck,
            cbxReqEFPCOST: ReqEFPCOSTCheck,
            cbxReqEFPCAVI: ReqEFPCAVICheck,
            cbxPlasmaConnShtPcs: PlasmaConnShtPcsCheck,
            cbxReqXrayF: ReqXrayFCheck,
            cbxReqXrayB: ReqXrayBCheck,
            cbxReqXrayOneTime: ReqXrayOneTimeCheck,
            cbxReqFinInspect: ReqFinInspectCheck,
            strFinInspectProc: txtFinInspectProc,
            cbxReqReflowF: ReqReflowFCheck,
            cbxReqReflowB: ReqReflowBCheck,
            cbxConnShtReqBoardFlg: ConnShtReqBoardFlg,
            cbxAutoPressF: AutoPressFCheck,
            cbxAutoPressB: AutoPressBCheck,
            strplantcode: plantCode,
            strprdname: txtProduct
          })
            .then((res) => {
              console.log("แก้ไขข้อมูลสำเร็จ =", res);
              swal("success", "You update data success", "success");
              setlblMessageColor("darkblue");
              setlblMessage("Data Update complete.");
              setpnlMessage(true);
            })
            .catch((error) => {
              console.error("เกิดข้อผิดพลาด =", error);
              swal("Error", error.response.data.message, "error");
            });
        } else {
          BeginTransFlg = true;
          const txtUpdateCount = 1;
          settxtUpdateCount(txtUpdateCount);

          await axios.post("/api/insertProductMst", {
            strplantcode: plantCode,
            strprdname: txtProduct,
            strUpdateCount: txtUpdateCount,
            strShtLot: txtShtLot,
            strPcsSht: txtPcsSht,
            ddlSheetType: selSheetType,
            ddlDateType: selDateType,
            strEngCode: txtEngCode,
            strRevision: txtRevision,
            strPcsTray: txtPcsTray,
            strPcsScan: txtPcsScan,
            strChkStartDig: txtChkStartDig,
            strChkEndDig: txtChkEndDig,
            strChkWord: txtChkWord,
            strSerialLength: txtSerialLength,
            strSerialFormat: txtSerialFormat,
            strSheetFormat: txtSheetFormat,
            ddlLaminationSide: selLaminationSide,
            strUserName: hfUserName,
            ipAddress: ip,
            chk_DelFlg: chk_DelFlgCheck,
            strAbbr: txtAbbr,
            strShtScan: txtShtScan,
            strShtLaser: txtShtLaser,
            cbxReqLot: ReqLotCheck,
            cbxReqVendor: ReqVendorCheck,
            cbxReqConfig: ReqConfigCheck,
            strConfigWord: txtConfigWord,
            strConfigStart: ReqConfigCheck ? txtConfigStart : null,
            strConfigEnd: ReqConfigCheck ? txtConfigEnd : null,
            cbxReqConfigRun: ReqConfigRunCheck,
            strDupStart: txtDupStart,
            strDupEnd: txtDupEnd,
            strAddInfo: txtAddInfo,
            strSerialStartCode: txtSerialStartCode,
            cbxReqCheckPrdSht: ReqCheckPrdShtCheck,
            strCheckPrdShtFrom: ReqCheckPrdShtCheck ? txtCheckPrdShtFrom : null,
            strCheckPrdShtTo: ReqCheckPrdShtCheck ? txtCheckPrdShtTo : null,
            cbxReqCheckLotSht: ReqCheckLotShtCheck,
            strCheckLotShtFrom: ReqCheckLotShtCheck ? txtCheckLotShtFrom : null,
            strCheckLotShtTo: ReqCheckLotShtCheck ? txtCheckLotShtTo : null,
            rbtRoll: rbtselLotRoll,
            ddlStatus: selStatus,
            cbxReqControlPlasma: ReqControlPlasmaCheck,
            strPlasmaTime: ReqControlPlasmaCheck ? txtPlasmaTime : null,
            rbtPlasmaTimePCS: rbtPlasmaTime,
            rbtPlasmaTimeSHT: rbtPlasmaTime,
            rbtPlasmaTimeGRP: rbtPlasmaTime,
            cbxReqUpdatePlasma: ReqUpdatePlasmaCheck,
            cbxReqStartSeqCode: ReqStartSeqCodeCheck,
            strStartSeqCode: txtStartSeqCode,
            strStartSeqDigitFrom: ReqStartSeqCodeCheck ? txtStartSeqDigitFrom : null,
            strStartSeqDigitTo: ReqStartSeqCodeCheck ? txtStartSeqDigitTo : null,
            cbxReqSheetELT: ReqShtELTCheck,
            cbxReqSPIAOI: ReqSPIAOICheck,
            cbxReqVendorLot: ReqVendorCheck,
            strVendorLotLength: txtVendorLotLength,
            cbxReqConRollLeaf: ReqConRollLeafCheck,
            strRollNoLength: txtRollNoLength,
            strLeafNoLength: txtLeafNoLength,
            cbxReqDateProc: ReqDateProcCheck,
            strDateFromProc: txtDateFromProc,
            cbxReqCheckWeekCode: ReqCheckWeekCodeCheck,
            strWeekCodeStart: ReqCheckWeekCodeCheck ? txtWeekCodeStart : null,
            strWeekCodeEnd: ReqCheckWeekCodeCheck ? txtWeekCodeEnd : null,
            cbxReqPreAOIF: ReqPreAOIFCheck,
            cbxReqPreAOIB: ReqPreAOIBCheck,
            cbxReqAOIF: ReqAOIFCheck,
            cbxReqAOIB: ReqAOIBCheck,
            cbxReqAOICoatF: ReqAOICoatFCheck,
            cbxReqAOICoatB: ReqAOICoatBCheck,
            cbxReqSPIF: ReqSPIFCheck,
            cbxReqSPIB: ReqSPIBCheck,
            strLeafScan: ReqConRollLeafCheck ? txtLeafScan : null,
            cbxLeafReqSerial: LeafReqSerialCheck,
            cbxReqCheckPrdRoll: ReqCheckPrdRollCheck,
            strCheckRollPrdFrom: ReqCheckPrdRollCheck ? txtCheckRollPrdFrom : null,
            strCheckRollPrdTo: ReqCheckPrdRollCheck ? txtCheckRollPrdTo : null,
            strCheckRollPrdWord: txtCheckRollPrdWord,
            cbxRollReqCheckPrdLeaf: RollReqCheckPrdLeafCheck,
            strRollCheckPrdLeafFrom: RollReqCheckPrdLeafCheck ? txtRollCheckPrdLeafFrom : null,
            strRollCheckPrdLeafTo: RollReqCheckPrdLeafCheck ? txtRollCheckPrdLeafTo : null,
            cbxRollReqCheckLotLeaf: RollReqCheckLotLeafCheck,
            strRollCheckLotLeafFrom: RollReqCheckLotLeafCheck ? txtRollCheckLotLeafFrom : null,
            strRollCheckLotLeafTo: RollReqCheckLotLeafCheck ? txtRollCheckLotLeafTo : null,
            cbxReqSheetMC: ReqSheetMCCheck,
            cbxReqProcControlTime: ReqProcControlTimeCheck,
            strProcControlTime: ReqProcControlTimeCheck ? txtProcControlTime : null,
            cbxReqConnShtPcsTime: ReqConnShtPcsTimeCheck,
            cbxReqFinalPackingGroup: ReqFinalPackingGroupCheck,
            cbxReqConShtPcsRoll: ReqConShtPcsRollCheck,
            strBarcodeGrade: txtBarcodeGrade,
            cbxReqShtControlPlasma: ReqShtControlPlasmaCheck,
            strShtPlasmaTime: txtShtPlasmaTime,
            cbxPlasmaNotStartELT: PlasmaNotStartELTCheck,
            cbxPlasmaNotShowTime: PlasmaNotShowTimeCheck,
            cbxReqEFPCAOM: ReqEFPCAOMCheck,
            cbxReqEFPCAOI: ReqEFPCAOICheck,
            cbxReqEFPCOST: ReqEFPCOSTCheck,
            cbxReqEFPCAVI: ReqEFPCAVICheck,
            cbxPlasmaConnShtPcs: PlasmaConnShtPcsCheck,
            cbxReqXrayF: ReqXrayFCheck,
            cbxReqXrayB: ReqXrayBCheck,
            cbxReqXrayOneTime: ReqXrayOneTimeCheck,
            cbxReqFinInspect: ReqFinInspectCheck,
            strFinInspectProc: txtFinInspectProc,
            cbxReqReflowF: ReqReflowFCheck,
            cbxReqReflowB: ReqReflowBCheck,
            cbxConnShtReqBoardFlg: ConnShtReqBoardFlg,
            cbxAutoPressF: AutoPressFCheck,
            cbxAutoPressB: AutoPressBCheck
          })
            .then((res2) => {
              console.log("บันทึกข้อมูลสำเร็จ =", res2);
              swal("success", "You summit data success", "success");
              setlblMessageColor("darkblue");
              setlblMessage("Data Insert complete.");
              setpnlMessage(true);
            })
            .catch((error) => {
              console.error("เกิดข้อผิดพลาด =", error);
              swal("Error", error.response.data.message, "error");
            });
        }
      } catch (error) {
        lblMessageColor("#ff4d4f");
        lblMessage(`Error: ${error.message}`);
        setpnlMessage(true);
      }

    } else {
      // User clicked 'No'
      console.log('Form not submitted');
    }
  };

  return {
    txtCheckPrdShtFrom, txtCheckPrdShtTo, selCheckIC, txtPlasmaTime, txtProcControlTime, txtShtPlasmaTime, txtBarcodeGrade, ReqCheckPrdShtCheck, ReqCheckPrdShtCheckChanged, ReqConShtPcsRollCheck, setReqConShtPcsRollCheck,
    ReqProcControlTimeCheck, ReqProcControlTimeCheckChanged, ReqConnShtPcsTimeCheck, setReqConnShtPcsTimeCheck, ReqFinalPackingGroupCheck, setReqFinalPackingGroupCheck, ReqShtControlPlasmaCheck, ReqShtControlPlasmaCheckChanged,
    PlasmaConnShtPcsCheck, setPlasmaConnShtPcsCheck, ConnShtReqBoardFlg, setConnShtReqBoardFlg, AutoPressFCheck, setAutoPressFCheck, AutoPressBCheck, setAutoPressBCheck, txtCheckPrdShtDisabled, txtStartSeqDigitFromDisabled,
    txtCheckPrdShtToDisabled, txtProcControlTimeDisabled, cbxReqConnShtPcsTimeDisabled, txtPlasmaTimeDisabled, rbtPlasmaTimePCSDisabled, rbtPlasmaTimeSHTDisabled, rbtPlasmaTimeGRPDisabled, cbxReqUpdatePlasmaDisabled,
    cbxPlasmaNotStartELTDisabled, cbxPlasmaNotShowTimeDisabled, visiblePassWord, visibletxtPassWord, txtProduct, handleKeyProductName, btnRetriveClick, ErrorPrdName, txtUpdateCount, txtChkStartDig, txtShtLot, txtChkEndDig,
    txtPcsSht, txtChkWord, selSheetType, txtSerialLength, selDateType, selDateTypeselChanged, txtPcsScan, txtEngCode, txtPcsTray, txtRevision, txtSerialFormat, selLaminationSide, txtSheetFormat, txtShtScan, txtShtLaser, ReqLotCheck,
    ReqConfigCheck, txtConfigWord, txtConfigStart, txtConfigEnd, ReqConfigRunCheck, txtDupStart, txtDupEnd, txtAddInfo, txtPassWord, txtAbbr, txtSerialStartCode, rbtselLotRoll, ReqCheckLotShtCheck, txtCheckLotShtFrom, ReqVendorCheck,
    txtCheckLotShtTo, selStatus, ReqControlPlasmaCheck, rbtPlasmaTime, ReqUpdatePlasmaCheck, PlasmaNotStartELTCheck, PlasmaNotShowTimeCheck, ReqStartSeqCodeCheck, ReqCheckWeekCodeCheck, ReqSheetMCCheck, txtWeekCodeStart,
    txtStartSeqCode, txtStartSeqDigitFrom, txtStartSeqDigitTo, ReqShtELTCheck, ReqSPIAOICheck, ReqVendorLotCheck, txtVendorLotLength, ReqDateProcCheck, txtDateFromProc, txtCheckRollPrdWord, RollReqCheckPrdLeafCheck, txtRollCheckPrdLeafFrom,
    txtWeekCodeEnd, ReqConRollLeafCheck, txtLeafScan, txtRollNoLength, txtLeafNoLength, LeafReqSerialCheck, ReqCheckPrdRollCheck, txtCheckRollPrdFrom, txtCheckRollPrdTo, ReqSPIBCheck, ReqAOICoatFCheck, ReqAOICoatBCheck,
    txtRollCheckPrdLeafTo, RollReqCheckLotLeafCheck, txtRollCheckLotLeafFrom, txtRollCheckLotLeafTo, ReqPreAOIFCheck, ReqPreAOIBCheck, ReqAOIFCheck, ReqAOIBCheck, ReqSPIFCheck, ReqEFPCAVICheck, txtUpdateBy, txtUpdateDate, chk_DelFlgCheck,
    ReqReflowFCheck, ReqReflowBCheck, ReqXrayFCheck, ReqXrayBCheck, ReqXrayOneTimeCheck, ReqFinInspectCheck, txtFinInspectProc, ReqEFPCAOMCheck, ReqEFPCAOICheck, ReqEFPCOSTCheck, cbxReqCheckPrdShtDisabled, txtStartSeqCodeDisabled,
    txtStartSeqDigitToDisabled, txtVendorLotLengthDisabled, txtRollNoLengthDisabled, txtLeafNoLengthDisabled, txtLeafScanDisabled, cbxLeafReqSerialDisabled, cbxReqCheckPrdRollDisabled, txtCheckRollPrdFromDisabled, txtCheckRollPrdToDisabled,
    txtCheckRollPrdWordDisabled, cbxRollReqCheckPrdLeafDisabled, txtRollCheckPrdLeafFromDisabled, txtRollCheckPrdLeafToDisabled, cbxRollReqCheckLotLeafDisabled, txtRollCheckLotLeafFromDisabled, txtRollCheckLotLeafToDisabled, txtDateFromProcDisabled,
    cbxReqCheckWeekCodeDisabled, txtWeekCodeStartDisabled, txtWeekCodeEndDisabled, txtShtPlasmaTimeDisabled, txtFinInspectProcDisabled, cbxReqVendorDisabled, cbxReqStartSeqCodeDisabled, txtConfigWordDisabled, txtConfigStartDisabled, txtConfigEndDisabled,
    cbxReqConfigRunDisabled, txtCheckLotShtFromDisabled, txtCheckLotShtToDisabled, handleKeyUpdateCount, handleKeyCheckDigitFrom, handleKeyShtLot, handleKeyCheckDigitTo, handleKeyPcsSht, handleKeyCheckWord, handleselSheettype, handlerbtLotRollChange,
    setReqLotCheck, setReqVendorCheck, ReqConfigCheckChanged, setReqConfigRunCheck, ReqCheckLotShtCheckChanged, ReqControlPlasmaCheckChanged, handlerbtPlasmaTimeChange, setReqEFPCAVICheck, setReqSPIFCheck, setReqSPIBCheck, setReqAOICoatBCheck,
    setReqUpdatePlasmaCheck, setPlasmaNotStartELTCheck, setPlasmaNotShowTimeCheck, ReqStartSeqCodeCheckChanged, setReqShtELTCheck, setReqSPIAOICheck, ReqVendorLotCheckChanged, ReqDateProcCheckChanged, ReqCheckWeekCodeCheckChanged, setReqAOICoatFCheck,
    setReqSheetMCCheck, ReqConnectRollCheckChanged, setLeafReqSerialCheck, ReqCheckPrdRollCheckChanged, RollReqCheckPrdLeafCheckChanged, RollReqCheckLotLeafCheckChanged, setReqPreAOIFCheck, setReqPreAOIBCheck, setReqAOIFCheck, setReqAOIBCheck,
    setReqReflowFCheck, setReqReflowBCheck, setReqXrayFCheck, setReqXrayBCheck, setReqXrayOneTimeCheck, ReqFinInspectCheckChanged, setReqEFPCAOMCheck, setReqEFPCAOICheck, setReqEFPCOSTCheck, handlekeySerialLength, handlekeyPcsScan, handlekeyEngCode,
    handlekeyPcsTray, handlekeyRevision, handlekeySerialFormat, handleselLaminationSide, handlekeySheetFormat, handlekeyShtScan, handlekeyShtLaser, handlekeyConfigWord, handlekeyConfigStart, handlekeyConfigEnd, handlekeyDupStart, handlekeyDupEnd,
    handlekeyAddInfo, handlekeyPassWord, handlekeyAbbr, handlekeySerialStartCode, handlekeyCheckPrdShtFrom, handlekeyCheckPrdShtTo, handlekeyCheckLotShtFrom, handlekeyCheckLotShtTo, handleselStatus, handleselCheckIC, handlekeyPlasmaTime, handlekeyStartSeqCode,
    handlekeyStartSeqDigitFrom, handlekeyStartSeqDigitTo, handlekeyVendorLotLength, handlekeyDateFromProc, handlekeyWeekCodeStart, handlekeyWeekCodeEnd, handlekeyLeafScan, handlekeyRollNoLength, handlekeyLeafNoLength, handlekeyCheckRollPrdFrom,
    handlekeyCheckRollPrdTo, handlekeyCheckRollPrdWord, handlekeyRollCheckPrdLeafFrom, handlekeyRollCheckPrdLeafTo, handlekeyRollCheckLotLeafFrom, handlekeyRollCheckLotLeafTo, handlekeyProcControlTime, handlekeyFinInspectProc, handlekeyShtPlasmaTime,
    handlekeyBarcodeGrade, handlekeyUpdateBy, handlekeyUpdateDate, chk_DelFlgCheckChanged, btnSubmitClick, ErrorPrdNameMessage, lblMessage, lblMessageColor, ErrorShtLot, ErrorShtLotMessage, ErrorPcsSht, ErrorPcsShtMessage, ErrorShtScan, ErrorShtScanMessage,
    ErrorShtLaser, ErrorShtLaserMessage, ErrorConfigWord, ErrorConfigWordMessage, ErrorConfigStart, ErrorConfigStartMessage, ErrorConfigEnd, ErrorConfigEndMessage, ErrorDupStart, ErrorDupStartMessage, ErrorDupEnd, ErrorDupEndMessage, ErrorCheckPrdShtFrom,
    ErrorCheckPrdShtFromMessage, ErrorCheckPrdShtTo, ErrorCheckPrdShtToMessage, ErrorCheckLotShtFrom, ErrorCheckLotShtFromMessage, ErrorCheckLotShtTo, ErrorCheckLotShtToMessage, ErrorPlasmaTime, ErrorPlasmaTimeMessage, ErrorStartSeqCode, ErrorStartSeqCodeMessage,
    ErrorStartSeqDigitFrom, ErrorStartSeqDigitFromMessage, ErrorStartSeqDigitTo, ErrorStartSeqDigitToMessage, ErrorVendorLotLength, ErrorVendorLotLengthMessage, ErrorRollNoLength, ErrorRollNoLengthMessage, ErrorLeafNoLength, ErrorLeafNoLengthMessage, ErrorLeafScan,
    ErrorLeafScanMessage, ErrorCheckRollPrdFrom, ErrorCheckRollPrdFromMessage, ErrorCheckRollPrdTo, ErrorCheckRollPrdToMessage, ErrorCheckRollPrdWord, ErrorCheckRollPrdWordMessage, ErrorRollCheckPrdLeafFrom, ErrorRollCheckPrdLeafFromMessage, ErrorRollCheckPrdLeafTo,
    ErrorRollCheckPrdLeafToMessage, ErrorRollCheckLotLeafFrom, ErrorRollCheckLotLeafFromMessage, ErrorRollCheckLotLeafTo, ErrorRollCheckLotLeafToMessage, ErrorDateFromProc, ErrorDateFromProcMessage, ErrorWeekCodeStart, ErrorWeekCodeStartMessage, ErrorWeekCodeEnd,
    ErrorWeekCodeEndMessage, ErrorProcControlTime, ErrorProcControlTimeMessage, ErrorShtPlasmaTime, ErrorShtPlasmaTimeMessage, ErrorFinInspectProc, ErrorFinInspectProcMessage, ErrorselSheetType, ErrorselSheetTypeMessage, ErrorselDateType, ErrorselDateTypeMessage,
    ErrorEngCode, ErrorEngCodeMessage, ErrorRevision, ErrorRevisionMessage, ErrorPcsTray, ErrorPcsTrayMessage, ErrorPcsScan, ErrorPcsScanMessage, ErrorChkStartDig, ErrorChkStartDigMessage, ErrorChkEndDig, ErrorChkEndDigMessage, ErrorChkWord, ErrorChkWordMessage,
    ErrorSerialLength, ErrorSerialLengthMessage, ErrorSerialFormat, ErrorSerialFormatMessage, ErrorLaminationSide, ErrorLaminationSideMessage, ErrorPassWord, ErrorPassWordMessage, pnlMessage
  }
};

export { fn_ProductMaster };