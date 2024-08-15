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
  const [selCheckIC, setselCheckIC] = useState("");
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
  const [lblMessage, setlblMessage] = useState("");
  const [lblMessageColor, setlblMessageColor] = useState("green");
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

  const [hfUserName, sethfUserName] = useState("");
  const MST_PASSWORD = "";
  const FIX_CHECK_PRODUCT_MIX = "Y";
  const FIX_CHECK_PRODUCT_MIX_START = "11";
  const FIX_CHECK_PRODUCT_MIX_END = "16";
  const plantCode = import.meta.env.VITE_FAC;

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
  };

  const btnRetriveClick = async () => {
    GetDataProductMaster();
  };

  const handleKeyUpdateCount = (event) => {
    const txtUpdateCount = event.target.value;
    settxtUpdateCount(txtUpdateCount);
    // setErrorPrdName(false);
  };

  const handleKeyCheckDigitFrom = (event) => {
    const txtChkStartDig = event.target.value;
    settxtChkStartDig(txtChkStartDig);
    // setErrorPrdName(false);
  };

  const handleKeyShtLot = (event) => {
    const txtShtLot = event.target.value;
    settxtShtLot(txtShtLot);
    // setErrorPrdName(false);
  };
  const handleKeyCheckDigitTo = (event) => {
    const txtChkEndDig = event.target.value;
    settxtChkEndDig(txtChkEndDig);
    // setErrorPrdName(false);
  };

  const handleKeyPcsSht = (event) => {
    const txtPcsSht = event.target.value;
    settxtPcsSht(txtPcsSht);
    // setErrorPrdName(false);
  };

  const handleKeyCheckWord = (event) => {
    const txtChkWord = event.target.value;
    settxtChkWord(txtChkWord);
    // setErrorPrdName(false);
  };

  const handleselSheettype = (value) => {
    setselSheetType(value);
    // setErrorPrdName(false);
  };

  const handlekeySerialLength = (event) => {
    const txtSerialLength = event.target.value;
    settxtSerialLength(txtSerialLength);
    // setErrorPrdName(false);
  };

  const handlekeyPcsScan = (event) => {
    const txtPcsScan = event.target.value;
    settxtPcsScan(txtPcsScan);
    // setErrorPrdName(false);
  };

  const handlekeyEngCode = (event) => {
    const txtEngCode = event.target.value;
    settxtEngCode(txtEngCode);
    // setErrorPrdName(false);
  };

  const handlekeyPcsTray = (event) => {
    const txtPcsTray = event.target.value;
    settxtPcsTray(txtPcsTray);
    // setErrorPrdName(false);
  };

  const handlekeyRevision = (event) => {
    const txtRevision = event.target.value;
    settxtRevision(txtRevision);
    // setErrorPrdName(false);
  };

  const handlekeySerialFormat = (event) => {
    const txtSerialFormat = event.target.value;
    settxtSerialFormat(txtSerialFormat);
    // setErrorPrdName(false);
  };

  const handleselLaminationSide = (value) => {
    setselLaminationSide(value);
    // setErrorPrdName(false);
  };
  
  const handlekeySheetFormat = (event) => {
    const txtSheetFormat = event.target.value;
    settxtSheetFormat(txtSheetFormat);
    // setErrorPrdName(false);
  };

  const handlekeyShtScan = (event) => {
    const txtShtScan = event.target.value;
    settxtShtScan(txtShtScan);
    // setErrorPrdName(false);
  };

  const handlekeyShtLaser = (event) => {
    const txtShtLaser = event.target.value;
    settxtShtLaser(txtShtLaser);
    // setErrorPrdName(false);
  };

  const handlekeyConfigWord = (event) => {
    const txtConfigWord = event.target.value;
    settxtConfigWord(txtConfigWord);
    // setErrorPrdName(false);
  };

  const handlekeyConfigStart = (event) => {
    const txtConfigStart = event.target.value;
    settxtConfigStart(txtConfigStart);
    // setErrorPrdName(false);
  };

  const handlekeyConfigEnd = (event) => {
    const txtConfigEnd = event.target.value;
    settxtConfigEnd(txtConfigEnd);
    // setErrorPrdName(false);
  };

  const handlekeyDupStart = (event) => {
    const txtDupStart = event.target.value;
    settxtDupStart(txtDupStart);
    // setErrorPrdName(false);
  };

  const handlekeyDupEnd = (event) => {
    const txtDupEnd = event.target.value;
    settxtDupEnd(txtDupEnd);
    // setErrorPrdName(false);
  };

  const handlekeyAddInfo = (event) => {
    const txtAddInfo = event.target.value;
    settxtAddInfo(txtAddInfo);
    // setErrorAddInfo(false);
  };

  const handlekeyPassWord = (event) => {
    const txtPassWord = event.target.value;
    settxtPassWord(txtPassWord);
    // setErrorPassWord(false);
  };

  const handlekeyAbbr = (event) => {
    const txtAbbr = event.target.value;
    settxtAbbr(txtAbbr);
    // setErrorAbbr(false);
  };

  const handlekeySerialStartCode = (event) => {
    const txtSerialStartCode = event.target.value;
    settxtSerialStartCode(txtSerialStartCode);
    // setErrorSerialStartCode(false);
  };

  const handlekeyCheckPrdShtFrom = (event) => {
    const txtCheckPrdShtFrom = event.target.value;
    settxtCheckPrdShtFrom(txtCheckPrdShtFrom);
    // setErrorCheckPrdShtFrom(false);
  };

  const handlekeyCheckPrdShtTo = (event) => {
    const txtCheckPrdShtTo = event.target.value;
    settxtCheckPrdShtTo(txtCheckPrdShtTo);
    // setErrorCheckPrdShtTo(false);
  };

  const handlekeyCheckLotShtFrom = (event) => {
    const txtCheckLotShtFrom = event.target.value;
    settxtCheckLotShtFrom(txtCheckLotShtFrom);
    // setErrorCheckLotShtFrom(false);
  };

  const handlekeyCheckLotShtTo = (event) => {
    const txtCheckLotShtTo = event.target.value;
    settxtCheckLotShtTo(txtCheckLotShtTo);
    // setErrorCheckLotShtTo(false);
  };

  const handleselStatus = (value) => {
    setselStatus(value);
    // setErrorselStatus(false);
  };

  const handleselCheckIC = (value) => {
    setselCheckIC(value);
    // setErrorselCheckIC(false);
  };

  const handlekeyPlasmaTime = (event) => {
    const txtPlasmaTime = event.target.value;
    settxtPlasmaTime(txtPlasmaTime);
    // setErrorPlasmaTime(false);
  };

  const handlekeyStartSeqCode = (event) => {
    const txtStartSeqCode = event.target.value;
    settxtStartSeqCode(txtStartSeqCode);
    // setErrorStartSeqCode(false);
  };

  const handlekeyStartSeqDigitFrom = (event) => {
    const txtStartSeqDigitFrom = event.target.value;
    settxtStartSeqDigitFrom(txtStartSeqDigitFrom);
    // setErrorStartSeqDigitFrom(false);
  };

  const handlekeyStartSeqDigitTo = (event) => {
    const txtStartSeqDigitTo = event.target.value;
    settxtStartSeqDigitTo(txtStartSeqDigitTo);
    // setErrorStartSeqDigitTo(false);
  };

  const handlekeyVendorLotLength = (event) => {
    const txtVendorLotLength = event.target.value;
    settxtVendorLotLength(txtVendorLotLength);
    // setErrorVendorLotLength(false);
  };

  const handlekeyDateFromProc = (event) => {
    const txtDateFromProc = event.target.value;
    settxtDateFromProc(txtDateFromProc);
    // setErrorDateFromProc(false);
  };

  const handlekeyWeekCodeStart = (event) => {
    const txtWeekCodeStart = event.target.value;
    settxtWeekCodeStart(txtWeekCodeStart);
    // setErrorWeekCodeStart(false);
  };
  
  const handlekeyWeekCodeEnd = (event) => {
    const txtWeekCodeEnd = event.target.value;
    settxtWeekCodeEnd(txtWeekCodeEnd);
    // setErrorWeekCodeEnd(false);
  };

  const handlekeyLeafScan = (event) => {
    const txtLeafScan = event.target.value;
    settxtLeafScan(txtLeafScan);
    // setErrorLeafScan(false);
  };

  const handlekeyRollNoLength = (event) => {
    const txtRollNoLength = event.target.value;
    settxtRollNoLength(txtRollNoLength);
    // setErrorRollNoLength(false);
  };

  const handlekeyLeafNoLength = (event) => {
    const txtLeafNoLength = event.target.value;
    settxtLeafNoLength(txtLeafNoLength);
    // setErrorLeafNoLength(false);
  };

  const handlekeyCheckRollPrdFrom = (event) => {
    const txtCheckRollPrdFrom = event.target.value;
    settxtCheckRollPrdFrom(txtCheckRollPrdFrom);
    // setErrorCheckRollPrdFrom(false);
  };

  const handlekeyCheckRollPrdTo = (event) => {
    const txtCheckRollPrdTo = event.target.value;
    txtCheckRollPrdTo(txtCheckRollPrdTo);
    // setErrorCheckRollPrdTo(false);
  };

  const handlekeyCheckRollPrdWord = (event) => {
    const txtCheckRollPrdWord = event.target.value;
    settxtCheckRollPrdWord(txtCheckRollPrdWord);
    // setErrorCheckRollPrdWord(false);
  };

  const handlekeyRollCheckPrdLeafFrom = (event) => {
    const txtRollCheckPrdLeafFrom = event.target.value;
    settxtRollCheckPrdLeafFrom(txtRollCheckPrdLeafFrom);
    // setErrorRollCheckPrdLeafFrom(false);
  };

  const handlekeyRollCheckPrdLeafTo = (event) => {
    const txtRollCheckPrdLeafTo = event.target.value;
    settxtRollCheckPrdLeafTo(txtRollCheckPrdLeafTo);
    // setErrorRollCheckPrdLeafTo(false);
  };

  const handlekeyRollCheckLotLeafFrom = (event) => {
    const txtRollCheckLotLeafFrom = event.target.value;
    settxtRollCheckLotLeafFrom(txtRollCheckLotLeafFrom);
    // setErrorRollCheckLotLeafFrom(false);
  };

  const handlekeyRollCheckLotLeafTo = (event) => {
    const txtRollCheckLotLeafTo = event.target.value;
    settxtRollCheckLotLeafTo(txtRollCheckLotLeafTo);
    // setErrorRollCheckLotLeafTo(false);
  };

  const handlekeyProcControlTime = (event) => {
    const txtProcControlTime = event.target.value;
    settxtProcControlTime(txtProcControlTime);
    // setErrorProcControlTime(false);
  };

  const handlekeyFinInspectProc = (event) => {
    const txtFinInspectProc = event.target.value;
    settxtFinInspectProc(txtFinInspectProc);
    // setErrorFinInspectProc(false);
  };

  const handlekeyShtPlasmaTime = (event) => {
    const txtShtPlasmaTime = event.target.value;
    settxtShtPlasmaTime(txtShtPlasmaTime);
    // setErrorShtPlasmaTime(false);
  };

  const handlekeyBarcodeGrade = (event) => {
    const txtBarcodeGrade = event.target.value;
    settxtBarcodeGrade(txtBarcodeGrade);
    // setErrorBarcodeGrade(false);
  };

  const handlekeyUpdateBy = (event) => {
    const txtUpdateBy = event.target.value;
    settxtUpdateBy(txtUpdateBy);
    // setErrorUpdateBy(false);
  };

  const handlekeyUpdateDate = (event) => {
    const txtUpdateDate = event.target.value;
    settxtUpdateDate(txtUpdateDate);
    // setErrorUpdateDate(false);
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
    if (txtProduct.trim() === "") {
      setErrorPrdName(true);
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
      }

      setlblMessageColor("darkblue");
      setlblMessage("Data read complete.");

    } catch (error) {
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

  const btnSubmitClick = () => {
    Swal.fire({
      title: 'Are you confirm submit?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        // User clicked 'Yes'
        console.log('Form submitted');
      } else {
        // User clicked 'No'
        console.log('Form not submitted');
      }
    });
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
    handlekeyBarcodeGrade, handlekeyUpdateBy, handlekeyUpdateDate, chk_DelFlgCheckChanged 
  }
};

export { fn_ProductMaster };