import { getBottomNavigationActionUtilityClass } from "@mui/material";
import { Tag } from "antd";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";

const fn_ScanSMTSerialShtFINManySht = () => {
  //region useState
  //env State
  let AUTO_SCAN_CHECK_FLG = import.meta.env.VITE_AUTO_SCAN_CHECK_FLG;
  let CONNECT_SERIAL_ERROR = import.meta.env.VITE_CONNECT_SERIAL_ERROR;
  let CONNECT_SERIAL_NOT_FOUND = import.meta.env.VITE_CONNECT_SERIAL_NOT_FOUND;
  let ROLL_SHT_ROLL_START_DIGIT = import.meta.env
    .VITE_ROLL_SHT_ROLL_START_DIGIT;
  let plantCode = import.meta.env.VITE_FAC;
  let ROLL_SHT_ROLL_LENGTH = import.meta.env.VITE_ROLL_SHT_ROLL_LENGTH;
  var _strEventArgument = "";
  // hidden Satate
  const [hfUserID, sethfUserID] = useState("");
  const [hfUserStation, sethfUserStation] = useState("");
  const [hfMode, sethfMode] = useState("");
  var hfSerialCount = "";
  var hfShtScan = "";
  var hfBarcodeSide = "";
  var hfUserFactory = "";
  var hfSerialLength = "";
  var hfSerialFixFlag = "";
  var hfSerialDigit = "";
  var hfSerialStartDigit = "";
  var hfSerialEndDigit = "";
  var hfTrayFlag = "";
  var hfTrayLength = "";
  var hfTestResultFlag = "";
  var hfAutoScan = "";
  var hfConfigCheck = "";
  var hfConfigCode = "";
  var hfConfigStart = "";
  var hfConfigEnd = "";
  var hfConfigRuning = "";
  var hfDuplicateStart = "";
  var hfDuplicateEnd = "";
  var hfCheckPrdSht = "";
  var hfCheckPrdShtStart = "";
  var hfCheckPrdShtEnd = "";
  var hfCheckPrdAbbr = "";
  var hfCheckLotSht = "";
  var hfCheckLotShtStart = "";
  var hfCheckLotShtEnd = "";
  var hfCheckStartSeq = "";
  var hfCheckStartSeqCode = "";
  var hfCheckStartSeqStart = "";
  var hfCheckStartSeqEnd = "";
  var hfCheckSheetELT = "";
  var hfCheckRollSht = "";
  var hfCheckRollShtDigit = "";
  var hfCheckDateInProc = "";
  var hfDateInProc = "";
  var hfCheckWeekCode = "";
  var hfCheckWeekCodeStart = "";
  var hfCheckWeekCodeEnd = "";
  var hfWeekCodeType = "";
  var hfWeekCode = "";
  var hfCheckPreAOIF = "";
  var hfCheckPreAOIB = "";
  var hfCheckAOIF = "";
  var hfCheckAOIB = "";
  var hfCheckAOICoatF = "";
  var hfCheckAOICoatB = "";
  var hfCheckSPIF = "";
  var hfCheckSPIB = "";
  var hfReqMachine = "";
  var hfConnLeafLength = "";
  var hfRollNo = "";
  var hfCheckRollPrdFlg = "";
  var hfCheckRollPrdStart = "";
  var hfCheckRollPrdEnd = "";
  var hfCheckRollPrd = "";
  var hfConnRollLength = "";
  var hfSerialStartCode = "";
  var hfShtPlasmaTimeFlg = "";
  var hfShtPlasmaTime = "";
  var hfSheetType = "";
  var hfPlasmaConnShtPcs = "";
  var hfSerialInfo = "";
  var hfCheckXrayF = "";
  var hfCheckXrayB = "";
  var hfCheckXrayOneTime = "";
  var hfCheckFinInspect = "";
  var hfCheckFinInspectProc = "";
  var hfReqBoardNo = "";

  const [gvBackSide, setGvBackSide] = useState([]);
  const [gvSerial, setGvSerial] = useState([]);
  const [gvScanResult, setGvScanResult] = useState([]);

  //lblState
  const [lblTotalSht, setlblTotalSht] = useState("");
  const [lblTotalPcs, setlblTotalPcs] = useState("");
  const [lblLog, setlblLog] = useState("");
  const [lblCheckRoll, setlblCheckRoll] = useState({
    text: "",
    styled: { backgroundColor: "white", color: "white" },
  });
  const [lblResult, setlblResult] = useState({
    text: "",
    styled: { backgroundColor: "white", color: "white" },
  });
  // visibleState
  const [pnlRollLeafState, setPnlRollLeafState] = useState(false);
  const [lblLogState, setlblLogState] = useState(false);
  const [gvBackSideState, setGvBackSideState] = useState(false);
  const [pnlMachineState, setPnlMachineState] = useState(false);
  const [pnlBoardState, setPnlBoardState] = useState(false);
  const [panalSerialState, setPanalSerialState] = useState(false);
  const [lblResultState, setLblResultState] = useState(false);
  const [hideImg, setHideImg] = useState(true);
  // Focus State
  const Fctxtlot = useRef(null);
  const FCtxtRollleaf = useRef(null);
  const Fctxtmcno = useRef(null);
  const FcgvBackside = useRef(null);
  const FcgvFrontside = useRef(null);
  const FcSelectproduct = useRef(null);
  const FctxtOperator = useRef(null);
  const FctxtBoardnoF = useRef(null);
  const FctxtBoardnoB = useRef(null);
  // disabled State
  const [disabledState, setDisabledState] = useState({
    styled: { disabled: true, backgroundColor: "#B2A8A8" },
  });
  const [enableState, setEnableState] = useState({
    styled: { disabled: false, backgroundColor: "" },
  });
  const [selectproductState, setSelectproductState] = useState(false);
  //textField State
  const [productCombo, setProductcombo] = useState([]);
  const [productSelect, setProductSelect] = useState("");
  const [lotValue, setLotValue] = useState("");
  const [lotState, setLotState] = useState(enableState);
  const [txtLotRef, setTxtLotRef] = useState("");
  const [txtRollLeaf, setTxtRollLeaf] = useState("");
  const [txtmcno, setTxtmcno] = useState("");
  const [txtOperator, setTxtOperator] = useState("");
  const [txtSideBack, setTxtSideBack] = useState(gvBackSide.map(() => ""));
  const [txtSideFront, setTxtSideFront] = useState(gvBackSide.map(() => ""));
  const [txtSerial, setTxtSerial] = useState(gvSerial.map(() => ""));
  const [txtBoardNoF, setTxtBoardNoF] = useState("");
  const [txtBoardNoB, setTxtBoardNoB] = useState("");

  //endregion
  useEffect(() => {
    Pageload();
  }, []);

  function SetFocus(txtField) {
    document.getElementById(`${txtField}`).focus();
    
  }

  const Pageload = () => {
    let Ipaddress = localStorage.getItem("ipAddress");
    sethfUserID(Ipaddress);
    sethfUserStation(Ipaddress);
    sethfMode("");
    getData("getProductCombo", "");
    Setmode("Lot");
  
    Fctxtlot.current.focus();
  };
  const btnBack_Click = () => {
    // location.reload();
    setLblResultState(false);
    setGvBackSide([]);
    setGvSerial([]);
    setPanalSerialState(false);
    setLotValue("");
    setLotState(enableState);
    setProductSelect(productCombo[0].prd_name);
    setTimeOut(Fctxtlot)
    sethfMode("lot");
  };
  const btnCancel_Click = () => {
    Setmode("SERIAL");
    setTxtSerial(gvSerial.map(() => ""))
    if(txtOperator == ""){
      FctxtOperator.current.focus();
    }else{
      // FcgvBackside.current.focus();
      document.getElementById(`txtSerial_0`).focus();
    }
  };
  const btnSave_Click = async () => {
    if (_strEventArgument != "Save" && hfMode == "SERIAL") {
      if (txtOperator == "") {
        setlblLog("Please input Operator !!!");
        setlblLogState(true);
        FctxtOperator.current.focus();
        return;
      }
      setSerialData();      
    }
  };
  async function setSerialData() {
    await getData("getProductSerialMaster", productSelect);
    var dtSerial = [];
    dtSerial = await getInputSerial();

    let _strPrdName = productSelect;
    let _strLotData = lotValue.split(";").toString();
    let _strLotRefData = txtLotRef.split(";").toString();
    let _strLot = lotValue;
    let _strLotRef = "";
    let _strShtNoBack = "";
    let _strShtNoFront = "";
    let _strTray = " ";
    let _intSeq = 1;
    let _strScanResultAll = "OK";
    let _strErrorAll = "";
    let _strUpdateError = "";
    let _bolError = false;
    hfWeekCode = "";
    setlblLogState(false);
    if (lotValue != "" && dtSerial.length > 0) {
      if (hfCheckWeekCode == "Y") {
        hfCheckWeekCode = await getData("GetWeekCodebyLot", {lotValue,hfDateInProc,hfWeekCodeType,hfSerialInfo});
      }
      let _intRowSerial = 0;
      for (let i = 0; i < dtSerial.length; i++) {
        _strShtNoBack = dtSerial[i].BACK_SIDE;
        _strShtNoFront = dtSerial[i].FRONT_SIDE;
        console.log(dtSerial, "dtSerial");
        
        if (hfSheetType == "D" && _strShtNoBack == _strShtNoFront) {
          _strScanResultAll = "NG";
          _strErrorAll = "Double Product sheet F,B not same";
          _bolError = true;
        }
        
        if (hfCheckPrdSht == "Y" && parseInt(dtSerial[i].SEQ) == 1 &&!_bolError ) {
        
          if (hfCheckPrdAbbr !=_strShtNoBack.substring(parseInt(hfCheckPrdShtStart)-1, parseInt(hfCheckPrdShtEnd))) {
            _strScanResultAll = "NG";
            _strErrorAll = "Sheet product mix";
            _bolError = true;
          }
          
          if (hfCheckPrdAbbr !==_strShtNoFront.substring(parseInt(hfCheckPrdShtStart) -1 ,parseInt(hfCheckPrdShtEnd) )) {
            _strScanResultAll = "NG";
            _strErrorAll = "Sheet product mix";
            _bolError = true;
          }
        }
        
        if (hfCheckLotSht == "Y" &&parseInt(dtSerial[i].SEQ) == 1 &&!_bolError) {
          if (txtLotRef !==_strShtNoBack.substring(parseInt(hfCheckLotShtStart)-1,parseInt(hfCheckLotShtEnd))) {
            _strScanResultAll = "NG";
            _strErrorAll = "Sheet lot mix";
            _bolError = true;
          }
          if (txtLotRef !==_strShtNoFront.substring(parseInt(hfCheckLotShtStart) -1, parseInt(hfCheckLotShtEnd) )) {
            _strScanResultAll = "NG";
            _strErrorAll = "Sheet lot mix";
            _bolError = true;
          }
        }
        
        // Check sheet plasma time control
        if (hfShtPlasmaTimeFlg == "Y" &&parseInt(dtSerial[i].SEQ) == 1 &&!_bolError ) {
          _strErrorAll = await getData("GetConnectShtPlasmaTime", {
            ShtnoF: _strShtNoFront,
            ShtnoB: _strShtNoBack,
            lot: _strLot,
            hfShtPlasmaTime: hfShtPlasmaTime,
          });
          if (_strErrorAll != "") {
            _strScanResultAll = "NG";
            _bolError = true;
          }
        }

        if (parseInt(dtSerial[i].SEQ) == 1) {
          let _inCountSeq = 0;
          let _strSerialNoDup = "";
          _inCountSeq = await getData("GetSheetDuplicateConnectShtType", {
            strSheetnoF: _strShtNoFront,
            strSheetnoB: _strShtNoBack,
            strSheetType: hfSheetType,
          });

          if (parseInt(_inCountSeq) > 1) {
            _strScanResultAll = "NG";
            _strErrorAll = "Sheet no. duplicate";
            _bolError = true;
          }
        }
        if (hfReqMachine == "Y") {
          if (txtmcno == "" ||txtmcno == "999999" ||txtmcno == "NOT FOUND CODE") {
            _strScanResultAll = "NG";
            _strErrorAll = "Invalid machine no";
            _bolError = true;
          }
        }
        if (parseInt(hfConnLeafLength) > 0 && parseInt(hfConnLeafLength) != _strShtNoFront.length &&parseInt(hfConnLeafLength) != _strShtNoBack.length) {
          _strScanResultAll = "NG";
          _strErrorAll = "Invalid sheet length";
          _bolError = true;
        }
        
        if (hfReqBoardNo == "Y" &&(dtSerial[i].BOARD_NO_F == 0 || dtSerial[i].BOARD_NO_B == 0)) {
          _strScanResultAll = "NG";
          _strErrorAll = "Please input board no.";
          _bolError = true;
        }
        if (dtSerial[i].SERIAL != "") {

          let _strSerial = dtSerial[i].SERIAL;
          let _strTestResult = "NONE";
          let _strMessageUpdate = "";
          let _strScanResultUpdate = "";
          // let _intRow = 0;
          if (!CONNECT_SERIAL_ERROR.includes(_strSerial)) {
            // for (let _intRow = _intRowSerial + 1;_intRow < dtSerial.length ;_intRow++) {
            //   if (_strSerial === dtSerial[_intRow].SERIAL.toString()) {
            //     _strScanResultUpdate = "NG";
            //     _strMessageUpdate = "Serial duplicate / หมายเลขบาร์โค้ดซ้ำ";
            //     _strScanResultAll = "NG";
            //     _bolError = true;
            //   }
            // }
            
            let isDuplicate = dtSerial.some((item, index) => index !== i && _strSerial.toUpperCase() === item.SERIAL.toString().trim().toUpperCase());
            if (isDuplicate) {
              _strScanResultUpdate = "NG";
              _strMessageUpdate = "Serial duplicate / หมายเลขบาร์โค้ดซ้ำ";
              _strScanResultAll = "NG";
              _bolError = true;
            }
            if (_strSerial.length == parseInt(hfSerialLength)) {
              var _strFixDigit = "";
              _strFixDigit = _strSerial.substring(parseInt(hfSerialStartDigit)-1,parseInt(hfSerialEndDigit) );
              if (_strFixDigit !== hfSerialDigit) {
                _strScanResultUpdate = "NG";
                _strMessageUpdate = `Serial barcode mix product / หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น`;
                _strScanResultAll = "NG";
                _bolError = true;
              } else if (hfConfigCheck === "Y") {
                var _strConfigDigit = "";
                _strConfigDigit = _strSerial.substring(parseInt(hfConfigStart)-1, parseInt(hfConfigEnd));
                if (_strConfigDigit !== hfConfigCode) {
                  _strScanResultUpdate = "NG";
                  _strMessageUpdate = `Serial barcode mix product / หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น`;
                  _strScanResultAll = "NG";
                  _bolError = true;
                }
              }
              if (hfSerialStartCode !== "" && !_bolError ) {
                if (_strSerial.substring(0, hfSerialStartCode.length) !==hfSerialStartCode) {
                  _strScanResultUpdate = "NG";
                  _strMessageUpdate = `Serial barcode mix product / หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น`;
                  _strScanResultAll = "NG";
                  _bolError = true;
                }
              }
              if (hfCheckStartSeq === "Y" && _strScanResultUpdate !== "NG") {
                var _strStartSeq = "";
                _strStartSeq = _strSerial.substring(parseInt(hfCheckStartSeqStart) - 1,parseInt(hfCheckStartSeqEnd) );
                if (_strStartSeq !== hfCheckStartSeqCode) {
                  _strScanResultUpdate = "NG";
                  _strMessageUpdate = `Serial barcode mix product / หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น`;
                  _strScanResultAll = "NG";
                  _bolError = true;
                }
              }
              if (hfCheckWeekCode === "Y" && _strScanResultUpdate === "NG") {
                var _strWeekCode = "";
                _strWeekCode = _strSerial.substring(parseInt(hfCheckWeekCodeStart) -1 ,parseInt(hfCheckWeekCodeEnd));
                if (_strWeekCode !== hfWeekCode) {
                  _strScanResultUpdate = "NG";
                  _strMessageUpdate = `Serial barcode mix product / หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น`;
                  _strScanResultAll = "NG";
                  _bolError = true;
                }
              }
            } else {
              _strScanResultUpdate = "NG";
              _strMessageUpdate ="Serial not matching product / หมายเลขบาร์โค้ดไม่ตรงตามที่กำหนดไว้";
              _strScanResultAll = "NG";
              _bolError = true;
            }
            if (_strScanResultUpdate != "NG") {
              var _inCountSeq = 0;
              var _strSerialNoDup = "";
              _inCountSeq = await getData("GetSerialDuplicateConnectSht", {
                strSerial: dtSerial[i].SERIAL,
                strplantcode: plantCode,
              });
              if (_inCountSeq > 0) {
                _strScanResultUpdate = "NG";
                _strMessageUpdate = "Serial duplicate / หมายเลขบาร์โค้ดซ้ำ";
                _strScanResultAll = "NG";
                _bolError = true;
              }
            }
          } else {
            _strMessageUpdate ="Bad mark piece / ชิ้นงานเสียทำเครื่องหมายไว้แล้ว";
          }
          dtSerial[i].SCAN_RESULT = _strScanResultUpdate;
          dtSerial[i].REMARK = _strMessageUpdate;
        }
      }
      
      //Shipping2D serial special check condition lot, panel and strip
      if (hfWeekCodeType == "S" && _bolError == false) {
        var strReturn = "";
        await axios
          .post("/api/Common/GetShippingSerialNo", {
            strLotNo: _strLotRefData,
            dtSerial: dtSerial,
            strWeekType: hfWeekCodeType,
          })
          .then((res) => {
            strReturn = res.data;
          });
        if (strReturn !== "") {
          _strScanResultAll = "NG";
          _bolError = true;
          if (strReturn !== "NG") {
            setlblLogState(true);
            setlblLog(strReturn);
          }
        }
      }
      
      for(let x =0 ;x<dtSerial.length;x++){
        if (hfCheckSheetELT == "Y" && _bolError == false) { 
          let _strReturn = "";
          _strReturn = getData("SetSerialLotShtELTTable", {
            strSheetNo: dtSerial[x].SHEET,
            strprdName: productSelect,
            strPlantCode: "5",
            strSideF: dtSerial[x].FRONT_SIDE,
            strSideB: dtSerial[x].BACK_SIDE,
            strPcsno: dtSerial[x].SEQ,
            strSerial: dtSerial[x].SERIAL,
          });
          if (_strReturn != "") {
            dtSerial[x].SCAN_RESULT = "NG";
            dtSerial[x].REMARK =" No sheet ELT result " + _strTagNewLine + "ไม่พบผลการทดสอบ ELT"
            _strScanResultAll = "NG";
            _bolError = true;
          }
          if (_strReturn != "NG") {
            setlblLogState(true);
            setlblLog(_strReturn);
          }
        }
      }
      
      if (!_bolError  ) {
        for (let x = 0; x < dtSerial.length; x++) {
          if (dtSerial[x].SERIAL != "") {
            let _intCount = 0;
            let _intCountOK = 0;
            let _intCountNG = 0;
            let _strRemark = "";
            let _strError = "";
            let _strSerial = dtSerial[x].SERIAL;
            let _dtSerialAll = [];
            let _bolScanDouble = false;
            let _bolScanDuplicate = false;
            let _strPrdNameOrg = "";
            let _strNG = "NG";
            let _strScanResultUpdate = "OK";
            let _strMessageUpdate = "";
            let _strRejectUpdate = "";
            let _Message = "";

            _bolError = false;
            let _strTestResult = "NONE";
            // if (!CONNECT_SERIAL_ERROR.includes(_strSerial)) {
              
            //   _strMessageUpdate ="Bad mark piece / ชิ้นงานเสียทำเครื่องหมายไว้แล้ว";
            //   _strScanResultUpdate = "OK";
            // }
            // ' ***** Miya ADD 2016/02/25 START N1 Request from Mr. Sunaga *****
            // ' ***** N1 Original. If transfer A1, Need change program     *****
            if (0 == 1 &&_strScanResultUpdate != "NG" && _strSerial != "999999") {
              let _Result;
              let _FrontSheetBarcode;
              let _BackSheetBarcode;
              if (hfBarcodeSide == "F") {
                _FrontSheetBarcode = dtSerial[x].FRONT_SIDE;
                _BackSheetBarcode = dtSerial[x].BACK_SIDE;
              } else {
                _FrontSheetBarcode = dtSerial[x].BACK_SIDE;
                _BackSheetBarcode = dtSerial[x].FRONT_SIDE;
              }
              _Result = getData("Get_SPI_AOI_RESULT", {
                strPlantCode: plantCode,
                strFrontSide: _FrontSheetBarcode,
                strBackSide: _BackSheetBarcode,
                strPrdname: productSelect,
                strMassage: _Message,
                strPcs: _intSeq,
              });
              if (_Result == "NG") {
                _strScanResultUpdate = _Result;
              }
              _strMessageUpdate = _Message;
            }
            // ' '' ***** Miya ADD 2016/02/25  END  N1 Request from Mr. Sunaga *****
            // ' ''If _strSerial <> CONNECT_SERIAL_ERROR And _strSerial.Length = CInt(hfSerialLength.Value) Then
            // ' ''    _strError = BIZ_ScanSMTSerial.SetSerialLotSht(Session("PLANT_CODE"), _strLot, _strSerial, drRow("FRONT_SIDE"), drRow("BACK_SIDE"), _intSeq, _strRemark, hfUserID.Value, hfUserStation.Value, hfBarcodeSide.Value, Session("PRODUCT_KIND"))
            // ' ''End If
            if (_strError != "") {
              _strMessageUpdate = _strError;
              _strScanResultUpdate = "NG";
              _bolError = true;
            }
            dtSerial[x].SCAN_RESULT = _strScanResultUpdate;
            dtSerial[x].REMARK = _strMessageUpdate;
            if (_strScanResultUpdate == "NG") {
              _strScanResultAll = "NG";
            }
          }
          _intSeq = _intSeq + 1;
        }
        // Manual connect roll and sheet leaf  08/04/2019
        
        if (!_bolError  && hfCheckRollSht == "Y") {
          if (txtRollLeaf.length == hfConnRollLength) {
            let resultRBMP = "";
            resultRBMP = await getData("GetRollLeafScrapRBMP", txtRollLeaf);
            if (resultRBMP == "Y") {
              _bolError = true;
              _strScanResultAll = "NG";
              _strUpdateError = "Problem sheet from RBMP";
              _strErrorAll = "Problem sheet from RBMP";
            } else {
              let dtRowLeaf = await getConnectRollSheetData(dtSerial);
              let _intCount = 0;
              let _strrollLeaf = txtRollLeaf;
              _intCount = await getData("GetRollLeafDuplicate", {
                strRollLeaf: txtRollLeaf,
                dtRowLeaf: dtRowLeaf,
              });
              if ((_intCount = 1)) {
                _bolError = true;
                _strScanResultAll = "NG";
                for (let drRow = 0; drRow < dtRowLeaf.length; drRow++) {
                  (dtRowLeaf[drRow].UPDATE_FLG = "N"),
                    (dtRowLeaf[drRow].ROW_UPDATE = "N"),
                    (dtRowLeaf[drRow].SCAN_RESULT = "NG"),
                    (dtRowLeaf[drRow].REMARK =
                      "Roll/Sheet barcode duplicate / หมายเลขบาร์โค้ดซ้ำ");
                }
                _strUpdateError = "Roll/Sheet barcode duplicate";
                _strErrorAll = "Roll/Sheet barcode duplicate";
              }
              if (hfCheckRollPrd == "Y" && !_bolError ) {
                let strRollProduct = hfRollNo + hfCheckRollPrd;
                if (
                  strRollProduct != txtRollLeaf.substring(parseInt(hfCheckRollPrdStart),parseInt(hfCheckRollPrdEnd) -parseInt(hfCheckRollPrdStart) +1)
                ) {
                  _bolError = true;
                  _strScanResultAll = "NG";
                  for (let drRow = 0; drRow < dtRowLeaf.length; drRow++) {
                    (dtRowLeaf[drRow].UPDATE_FLG = "N"),
                      (dtRowLeaf[drRow].ROW_UPDATE = "N"),
                      (dtRowLeaf[drRow].SCAN_RESULT = "NG"),
                      (dtRowLeaf[drRow].REMARK ="Roll/Sheet not matching product / หมายเลขบาร์โค้ดไม่ตรงกับผลิตภัณฑ์");
                    _intCount += 1;
                  }
                  _strUpdateError = "Roll/Sheet not matching product";
                  _strErrorAll = "Roll/Sheet not matching product";
                }
              }
              if (!_bolError  && dtRowLeaf.length > 0) {
                for (let drRow = 0; drRow < dtRowLeaf.length; drRow++) {
                  (dtRowLeaf[drRow].UPDATE_FLG = "N"),
                  (dtRowLeaf[drRow].ROW_UPDATE = "Y"),
                  (dtRowLeaf[drRow].SCAN_RESULT = "NG"),
                  (dtRowLeaf[drRow].REMARK ="Roll/Sheet not matching product / หมายเลขบาร์โค้ดไม่ตรงกับผลิตภัณฑ์");
                  _intCount += 1;
                }
                _strUpdateError = await getData("SetRollLeafTrayTable", {
                  strOperator: "SerialShtPcs",
                  strUserID: "",
                  strPlantCode: plantCode,
                  strStation: txtOperator,
                  strRowUpdate: dtRowLeaf.ROW_UPDATE,
                  strUpdateFlg: dtRowLeaf.UPDATE_FLG,
                  strRollNo: dtRowLeaf.ROLL_NO,
                  strLotNo: dtRowLeaf.LOT_NO,
                  strRollLeaf: dtRowLeaf.ROLL_LEAF,
                  strSheetNo: dtRowLeaf.SHEET_NO,
                  strShtSeq: dtRowLeaf.SHT_SEQ,
                  strIntRow: dtRowLeaf.intRow,
                  strProduct: dtRowLeaf.PRODUCT,
                  strMachine: dtRowLeaf.MACHINE,
                });
              }
            }
          } else {
            _strScanResultAll = "NG";
            _strUpdateError = "Roll leaf no. incorrect.";
            _strErrorAll = "Roll leaf no. incorrect.";
          }
        }
        
        if (!_bolError  && _strUpdateError == "") {
          console.log(dtSerial, "dtSerial",'inlast');
          for (let drRow = 0; drRow < dtSerial.length; drRow++) {
            if (dtSerial[drRow].SERIAL != ''){
              _strUpdateError = await getData("SetSerialLotShtTable", {
                SERIAL: dtSerial[drRow].SERIAL,
                FRONT_SIDE: dtSerial[drRow].FRONT_SIDE,
                BACK_SIDE : dtSerial[drRow].BACK_SIDE,
                MACHINE : dtSerial[drRow].MACHINE,
                MASTER_NO: dtSerial[drRow].MASTER_NO,
                intSerialLength : hfSerialLength,
                UPDATE_FLG: dtSerial[drRow].UPDATE_FLG,
                BarcodeSide : hfBarcodeSide,
                SEQ: dtSerial[drRow].SEQ,
                PRODUCT: productSelect,
                USER_ID: hfUserID,
                REMARK: dtSerial[drRow].REMARK,
                LOT: _strLot,
              })
            }            
            if (_strUpdateError != "") {
              _strScanResultAll = "NG";
            } else if (hfPlasmaConnShtPcs == "Y") {
              _strUpdateError = await getData("SetSerialRecordTimeTrayTable", {
                SERIAL: dtSerial[drRow].SERIAL,
                MACHINE : dtSerial[drRow].MACHINE,
                PRODUCT:dtSerial[drRow].PRODUCT,
                LOT : dtSerial[drRow].LOT,
                DATA_TYPE : '',
                ROW_UPDATE :dtSerial[drRow].ROW_UPDATE,
                UPDATE_FLG : dtSerial[drRow].UPDATE_FLG,
                strUserID: txtOperator,
                strPlantCode: plantCode,
                hfUserStation: hfUserStation,
                strProgram: "frm_ScanSMTSerialShtFIN",
              });
              if (_strUpdateError != "") {
                _strScanResultAll = "NG";
              }
            }
          }
        
        } else {
          _strScanResultAll = "NG";
        }
      }
      setLblResultState(true);
      setHideImg(false);
      if (_strScanResultAll == "NG") {
        setlblResult({
          text: _strScanResultAll,
          styled: { backgroundColor: "red", color: "white" },
        });
      } else if (_strErrorAll != "") {
        setlblResult({
          text: _strScanResultAll + _strErrorAll,
          styled: { backgroundColor: "red", color: "white" },
        });
      } else {
        setlblResult({
          text: _strScanResultAll,
          styled: { backgroundColor: "green", color: "white" },
        });
      }
      setGvScanResult(dtSerial);
      setTxtSideBack(gvBackSide.map(() => ""));
      setTxtSideFront(gvBackSide.map(() => ""));
      setTxtSerial(gvSerial.map(() => ""));
      getIntitiaSheet();
      getInitialSerial();
    } else {
      setlblLogState(true);
      setlblLog("Please input Sheet Side No. !!!");
      Setmode("SERIAL_ERROR");
    }
    getCountDataBylot(lotValue);
    setTxtRollLeaf("");
    setTxtmcno("");
    setTxtBoardNoF("");
    setTxtBoardNoB("");
    if (hfCheckRollSht == "Y") {
      setPnlRollLeafState(true);
      FCtxtRollleaf.current.focus();
    } else if (hfReqMachine == "Y") {
      setPnlMachineState(true);
      Fctxtmcno.current.focus();
    } else {
      FcgvBackside.current.focus();
    }
  }
  const ProductSelect_Change = async (e) => {
    setProductSelect(e);
    await getData("getProductSerialMaster", e);
    if (lotValue != "") {
      setlblLog("");
      setlblLogState(false);
      let result = await getData("GetConnectShtMasterCheckResult", e);
      if (result == "OK") {
        await getCountDataBylot(lotValue);
        getIntitiaSheet();
        if (hfCheckRollSht == "Y") {
          setPnlRollLeafState(true);
          setTxtRollLeaf("");
          FCtxtRollleaf.current.focus();
        } else {
          Setmode("SERIAL");
          setTxtmcno("");
          if (hfReqMachine == "Y") {
            setPnlMachineState(true);
            Fctxtmcno.current.focus();
          } else {
            FcgvBackside.current.focus();
          }
        }
      } else {
        productSelect(productCombo[0].prd_name);
        setLotValue("");
        setGvSerial([]);
        setlblLog(
          `${productSelect} not test master! / ${productSelect} ยังไม่ทดสอบมาสเตอร์`
        );
        setlblLogState(true);
        sethfMode("LOT");
        Fctxtlot.current.focus();
      }
    }
  };

  
  function setTimeOut(txtField) {
    setTimeout(() => {
      txtField.current.focus();
    }, 200);

  }
  const txtLot_Change = async () => {
    let lot = lotValue;
    let dtData = [];
    let strPrdname = "";
    let strLotData = lot.split(";");
    let strLot = "";
    if (strLotData.length >= 2) {
      strLot = strLotData[0];
      dtData = await getData("GetProductDataByLot", strLot);
      setPnlRollLeafState(false);
      hfRollNo = "";
      setlblTotalSht("");
      if (dtData != "") {
        strPrdname = dtData.PRD_NAME;
        hfRollNo = dtData.ROLL_NO;
      }

      if (strPrdname != "") {
        setlblLog("");
        setlblLogState(false);
        setLotValue(strLot);
        setTxtLotRef(strLot);
        await getCountDataBylot(strLot);
        try {
          if (productCombo.some((x) => x.prd_name == strPrdname)) {
            setProductSelect(strPrdname);
            await getData("getProductSerialMaster", strPrdname);
            setGvBackSide(getIntitiaSheet());
            Setmode("SERIAL");
            setGvSerial(getInitialSerial());
            setGvBackSideState(true);
            // setTimeOut(FcgvBackside)
            if(txtOperator == ""){setTimeOut(FctxtOperator);}else{setTimeOut(FcgvBackside);}            
            if (hfCheckRollSht == "Y") {
              setPnlRollLeafState(true);
              setTxtRollLeaf("");
            } else {
              Setmode("SERIAL");
              setTxtmcno("");
              if (hfReqMachine == "Y") {
                setPnlMachineState(true);
                Fctxtmcno.current.focus();
              } else {
                setPnlMachineState(false);
              }
            }
          } else {
            Swal.fire("error", "Product not found.", "error");
            setLotValue("");
            Fctxtlot.current.focus();
          }
        } catch (error) {
          var intProduct = strPrdname.indexOf("-", 12);
          if (intProduct > -1) {
            strPrdname =
              strPrdname.substring(0, intProduct) +
              strPrdname.substring(intProduct + 1, intProduct + 11).trim();
            try {
              setProductSelect(strPrdname);
              // await getProductSerialMaster(strPrdname);
              await getData("getProductSerialMaster", strPrdname);

              setGvBackSide(getIntitiaSheet());
              
              
              if (hfCheckRollSht == "Y") {
                setPnlRollLeafState(true);
                setTxtRollLeaf("");
                FCtxtRollleaf.current.focus();
              } else {
                Setmode("SERIAL");
                setTxtmcno("");
                if (hfReqMachine == "Y") {
                  setPnlMachineOpen(true);
                  fctextFieldMachine.current.focus();
                } else {
                  setPnlMachineState(false);
                  FctxtOperator.current.focus();
                  
                }
              }
            } catch (error) {
              setlblLog(`Product ${strPrdname} not found.`);
              setlblLogState(true);
              FcSelectproduct.current.focus();
            }
          }
        }
      } else {
        setProductSelect(productCombo[0].prd_name);
        setLotValue("");
        setGvSerial([]);
        setlblLog("Invalid lot no.");
        setlblLogState(true);
        sethfMode("LOT");
        Fctxtlot.current.focus();
      }
    } else {
      setProductSelect(productCombo[0].prd_name);
      setLotValue("");
      setGvSerial([]);

      setlblLog("Please scan QR Code! / กรุณาสแกนที่คิวอาร์โค้ด");

      setlblLogState(true);
      sethfMode("LOT");
      Fctxtlot.current.focus();
    }
  };
  const txtRollLeaf_Change = () => {
    setlblLogState(false);
    setlblLog("");
    if (txtRollLeaf != "" && txtRollLeaf.length == parseInt(hfConnRollLength)) {
      let strRollProduct = hfRollNo + hfCheckRollPrd;
      let start = parseInt(hfCheckRollPrdStart);
      let end = parseInt(hfCheckRollPrdEnd);
      let result = text.substring(start - 1, end);
      if (strRollProduct != result) {
        setlblLog("Roll/Leaf No. mix product");
        setlblLogState(true);
        sethfMode("ROLL");
        setGvBackSide(getIntitiaSheet());
        setTxtRollLeaf('');
        FCtxtRollleaf.current.focus();
      } else {
        Setmode("SERIAL");
        setTxtmcno("");
        if (hfReqMachine == "Y") {
          setPnlMachineState(true);
          Fctxtmcno.current.focus();
        } else {
          setPnlMachineState(false);
          FcgvBackside.current.focus();
        }
      }
    } else {
      setlblLog("Invalid Roll/Leaf No.");
      setlblLogState(true);
      setPanalSerialState(false);
      sethfMode("ROLL");
      setGvBackSide(getIntitiaSheet());
      setTxtRollLeaf("");
      FCtxtRollleaf.current.focus();
    }
  };
  const txtLotRef_Change = () => {
    if (txtLotRef != "") {
      let strLotData = txtLotRef.split(";");
      setTxtLotRef(strLotData[0]);
      FctxtOperator.current.focus();
    }
  };
  const txtOperator_Change = () => {
    if (txtOperator != "") {
      if (hfCheckRollSht == "Y") {
        setPnlRollLeafState(true);
        setTxtRollLeaf("");
        FCtxtRollleaf.current.focus();
      } else {
        Setmode("SERIAL");
        setTxtmcno("");
        if (hfReqMachine == "Y") {
          setPnlMachineState(true);
          Fctxtmcno.current.focus();
        } else {
          setPnlMachineState(false);
          setTimeOut(FcgvBackside);
        }
      }
    } else {
      setTxtOperator("");
      txtOperator.current.focus();
    }
  };
  const handleBackSideChange = (index, event) => {
    const newValues = [...txtSideBack];
    newValues[index] = event.target.value;
    setTxtSideBack(newValues);
    
  };
  const handleFrontSideChange = (index, event) => {
    const newValues = [...txtSideFront];
    newValues[index] = event.target.value;
    setTxtSideFront(newValues);
    // if (event.key === "Enter") {
    //   SetFocus("txtSerial_0");
    // }else{
    // }
    console.log("txtSideBack",txtSideBack,"txtSideFront",txtSideFront);
  };
  async function getInputSerial() {
    await getData("getProductSerialMaster", productSelect);
    var dtData = [];
    var updatedt = [];
    var intRow = 0;
    var strFrontSide = "";
    let _strlotno = lotValue.split(";");
    for (let i = 0; i < gvSerial.length; i++) {
      if (txtSerial[i] == undefined) {
        txtSerial[i] = "";
      }
      intRow += 1;
      let dataitem = {
        SHEET: gvSerial[i].SHEET,
        BACK_SIDE: txtSideBack.toString(),
        FRONT_SIDE: txtSideFront.toString(),
        SEQ: gvSerial[i].SEQ,
        SERIAL: txtSerial[i],
        SCAN_RESULT: "",
        REMARK: "",
        UPDATE_FLG: "N",
        MACHINE: txtmcno.toString(),
        MASTER_NO: "",
        LOT: _strlotno.toString(),
        PRODUCT: productSelect,
        ROW_UPDATE: "Y",
      };

      if (hfReqBoardNo == "Y") {
        updatedt = {
          ...dataitem,
          BOARD_NO_F: txtBoardNoF,
          BOARD_NO_B: txtBoardNoB,
        };
        dtData.push(updatedt);
      } else {
        dtData.push(dataitem);
      }
    }
    return dtData;
  }
  async function getConnectRollSheetData(dtSerial) {
    let dtData = [];
    let intRollRow = 1;
    let intRow = 0;
    let strShtNoOld = "";
    let strRollNo = hfRollNo;

    for (let i = 0; i < dtSerial.length; i++) {
      let drRow = dtSerial[i];

      if (drRow.FRONT_SIDE !== strShtNoOld) {
        intRow++;
        let drShtRow = {
          ROLL_SEQ: intRollRow,
          SHT_SEQ: intRow,
          LOT_NO: lotValue,
          ROLL_NO: strRollNo,
          ROLL_LEAF: txtRollLeaf,
          SHT_NO: drRow.FRONT_SIDE,
          SCAN_RESULT: "",
          REMARK: "",
          ROW_UPDATE: "Y",
          UPDATE_FLG: "N",
          MACHINE: txtmcno,
          PRODUCT: productSelect,
        };
        dtData.push(drShtRow);

        if (drRow.FRONT_SIDE !== drRow.BACK_SIDE) {
          intRow++;
          let drShtRow2 = {
            ROLL_SEQ: intRollRow,
            SHT_SEQ: intRow,
            LOT_NO: lotValue,
            ROLL_NO: strRollNo,
            ROLL_LEAF: txtRollLeaf,
            SHT_NO: drRow.BACK_SIDE,
            SCAN_RESULT: "",
            REMARK: "",
            ROW_UPDATE: "Y",
            UPDATE_FLG: "N",
            MACHINE: txtmcno,
            PRODUCT: productSelect,
          };
          dtData.push(drShtRow2);
        }
      }
      strShtNoOld = drRow.FRONT_SIDE;
    }

    return dtData;
  }

  const handletxtSerialChange = (index, event) => {
    const newValues = [...txtSerial];
    newValues[index] = event.target.value;
    setTxtSerial(newValues);
    if (event.key === "Enter") {
      try {
        SetFocus(`txtSerial_${index + 1}`);
      } catch (error) {
        btnSave_Click();
      }
    }
  };
  async function getData(type, param) {
    if (type == "getProductCombo") {
      await axios
        .get("/api/ScanFin/GetProductData")
        .then((response) => {
          setProductcombo(response.data);
        })
        .catch((error) => {
          Swal.fire("Error", error.message);
        });
    } else if (type == "getProductSerialMaster") {
      await axios
        .post("/api/common/GetSerialProductByProduct", { prdName: param })
        .then((res) => {
          setSerialMaster(res.data);
        })
        .catch((error) => {
          Swal.fire("Error", error.message);
        });
    } else if (type == "GetProductDataByLot") {
      let dtData = [];
      await axios
        .post("/api/ScanFin/GetProductDataByLot", { strLot: param })
        .then((res) => {
          setProductSelect(res.data);
          dtData = res.data;
        })
        .catch((error) => {
          // Swal.fire("Error", error.message);
        });
      return dtData;
    } else if (type == "GetLotSerialCountData") {
      let drSerialCount = [];
      await axios
        .post("/api/ScanFin/GetLotSerialCountData", {
          dataList: { strLotNo: param, strPlantCode: plantCode },
        })
        .then((res) => {
          drSerialCount = res.data;
        })
        .catch((error) => {
          Swal.fire("Error", error.message);
        });
      return drSerialCount;
    } else if (type == "GetConnectShtMasterCheckResult") {
      let result = "";
      await axios
        .post("/api/ScanFin/GetConnectShtMasterCheckResult", {
          strPrdname: param,
        })
        .then((res) => {
          result = res.data.prd_name;
        })
        .catch((error) => {
          result = error.message;
        });
      return result;
    } else if (type == "GetWeekCodebyLot") {
      let result = "";
      await axios
        // .post("/api/ScanFin/GetWeekCodebyLot", {
        //   strLot: param.lotValue,
        //   strProc: param.hfDateInProc,
        // })
        .post('/api/common/GetWeekCodebyLot', {
          _strLot: param.lotValue,
          _strProc: param.hfDateInProc,
          _strWeekType: param.hfWeekCodeType,
          _strSerialInfo: param.hfSerialInfo,
        })
        .then((res) => {
          result = res.data.strReturn;
        })
        .catch((error) => {
          result = error.message;
        });
      return result;
    } else if (type == "GetConnectShtPlasmaTime") {
      let result = "";
      await axios
        .post("/api/ScanFin/GetConnectShtPlasmaTime", {
          strSheetnoF: param.ShtnoF,
          strSheetnoB: param.ShtnoB,
          lot_no: param.lot,
          dblPlasmaTime: param.hfShtPlasmaTime,
        })
        .then((res) => {
          result = res.data.error;
        })
        .catch((error) => {
          Swal.fire("Error", error.message);
        });
      return result;
    } else if (type == "GetSheetDuplicateConnectShtType") {
      let result = "";
      await axios
        .post("/api/ScanFin/GetSheetDuplicateConnectShtType", {
          strSheetnoF: param.strSheetnoF,
          strSheetnoB: param.strSheetnoB,
          strSheetType: param.strSheetType,
        })
        .then((res) => {
          result = res.data.sheet_count;
        })
        .catch((error) => {
          Swal.fire("Error", error.message);
        });
      return result;
    } else if (type == "GetSerialDuplicateConnectSht") {
      let result = 0;
      await axios
        .post("/api/ScanFin/GetSerialDuplicateConnectSht", {
          dataList: {
            strLssSerialNo: param.strSerial,
            strPlantCode: param.strplantcode,
          },
        })
        .then((res) => {
          result = res.data.intRow;
        })
        .catch((error) => {
          Swal.fire("Error", error.message);
        });
      return result;
    } else if (type == "SetSerialLotShtELTTable") {
      let result = "";
      console.log("SetSerialLotShtELTTable Insert");
      await axios
        .post("/api/Common/SetSerialLotShtELTTable", {
          dataList: {
            strSheetNo: param.strSheetNo,
            strprdName: param.strprdName,
            strPlantCode: param.strPlantCode,
            strSideF: param.strSideF,
            strSideB: param.strSideB,
            strPcsno: param.strPcsno,
            strSerial: param.strSerial,
          },
        })
        .then((res) => {
          result = res.data.p_error;
        })
        .catch((error) => {
          Swal.fire("Error", error.message);
        });
      return result;
    } else if (type == "GetRollLeafScrapRBMP") {
      let result = "";
      await axios
        .post("/api/ScanFin/GetRollLeafScrapRBMP", {
          strRollNo: param,
        })
        .then((res) => {
          result = res.data.SCRAP_FLG;
        })
        .catch((error) => {
          Swal.fire("Error", error.message);
        });
      return result;
    } else if (type == "SetSerialRecordTimeTrayTable") {
      let result = "";
      console.log("SetSerialRecordTimeTrayTable Insert");
      await axios
        .post("/api/Common/SetSerialRecordTimeTrayTable", {
          dataList: {
            strUserID: param.strUserID,
            strPlantCode: Fac,
            hfUserStation: param.hfUserStation,
            strProgram: param.strProgram,
            data: [{
              SERIAL: param.SERIAL,
              MACHINE: param.MACHINE,
              PRODUCT: param.PRODUCT,
              LOT: param.LOT,
              DATA_TYPE: param.DATA_TYPE,
              ROW_UPDATE: param.ROW_UPDATE,
              UPDATE_FLG: param.UPDATE_FLG,
            }],
          },
        })
        .then((res) => {
          result = res.data.p_error;
        })
        .catch((error) => {
          Swal.fire("Error", error.message);
        });
      return result;
    } else if (type == "SetRollLeafTrayTable") {
      let result = "";
      await axios
        .post("/api/Common/SetRollLeafTrayTable", {
          dataList: {
            strOperator: param.strOperator,
            strUserID: "",
            strPlantCode: param.strPlantCode,
            strStation: param.strStation,
            strRowUpdate: param.strRowUpdate,
            strUpdateFlg: param.strUpdateFlg,
            strRollNo: param.strRollNo,
            strLotNo: param.strLotNo,
            strRollLeaf: param.strRollLeaf,
            strSheetNo: param.strSheetNo,
            strShtSeq: param.strShtSeq,
            strIntRow: param.strIntRow,
            strProduct: param.strProduct,
            strMachine: param.strMachine,
          },
        })
        .then((res) => {
          result = res.data.p_error;
        })
        .catch((error) => {
          Swal.fire("Error", error.message);
        });
      return result;
    } else if (type == "GetRollLeafDuplicate") {
      let result;
      await axios
        .post("/api/ScanFin/GetRollLeafDuplicate", {
          strRollLeaf: param.strRollLeaf,
          _dtRowLeaf: param.dtRowLeaf,
        })
        .then((res) => {
          result = res.data.intCount;
        })
        .catch((error) => {
          Swal.fire("Error", error.message);
        });
        return
    } else if (type == "Get_SPI_AOI_RESULT") {
      let result;
      await axios
        .post("/api/Common/Get_Spi_aoi_result", {
          dataList: {
            _strPlantCode: param.strPlantCode,
            _pcsPosition: param.strPcs,
            _frontSheetNumber: param.strFrontSide,
            _rearSheetNumber: param.strBackSide,
            _strProduct: param.strPrdname,
            _Message: param.strMassage,
          },
        })
        .then((res) => {
          result = res.data;
        })
        .catch((error) => {
          Swal.fire("Error", error.message);
        });
      return result;
    }else if (type == "SetSerialLotShtTable"){
      let result = '';
      await axios.post("/api/Common/SetSerialLotShtTable",{
        SERIAL: param.SERIAL,
        FRONT_SIDE: param.FRONT_SIDE,
        BACK_SIDE: param.BACK_SIDE,
        MACHINE: param.MACHINE,
        MASTER_NO: param.MASTER_NO,
        intSerialLength: param.intSerialLength,
        UPDATE_FLG: param.UPDATE_FLG,
        BarcodeSide: hfBarcodeSide,
        SEQ: param.SEQ,
        PRODUCT: param.PRODUCT,
        USER_ID: param.USER_ID,
        REMARK: param.REMARK,
        LOT: param.LOT,
      }).then((res) => {
        result = res.data.p_error;
      }).catch((error) => {
        Swal.fire("Error", error.message);
      })
      return result;
    }
   
  }
  async function setSerialMaster(item) {
    hfSerialLength = "0";
    hfSerialFixFlag = "N";
    hfSerialDigit = "";
    hfSerialStartDigit = "0";
    hfSerialEndDigit = "0";
    hfTrayFlag = "";
    hfTrayLength = "0";
    hfTestResultFlag = "";
    hfBarcodeSide = "";
    hfShtScan = "1";
    hfConfigCheck = "N";
    hfConfigCode = "";
    hfConfigStart = "0";
    hfConfigEnd = "0";
    hfConfigRuning = "N";
    hfDuplicateStart = "0";
    hfDuplicateEnd = "0";
    hfCheckPrdSht = "N";
    hfCheckPrdShtStart = "0";
    hfCheckPrdShtEnd = "0";
    hfCheckPrdAbbr = "";
    hfCheckLotSht = "N";
    hfCheckLotShtStart = "0";
    hfCheckLotShtEnd = "0";

    hfCheckStartSeq = "N";
    hfCheckStartSeqCode = "";
    hfCheckStartSeqStart = "0";
    hfCheckStartSeqEnd = "0";
    hfCheckSheetELT = "N";
    hfCheckRollSht = "N";
    hfCheckRollShtDigit = "0";
    hfCheckDateInProc = "N";
    hfDateInProc = "";
    hfCheckWeekCode = "N";
    hfCheckWeekCodeStart = "";
    hfCheckWeekCodeEnd = "";
    hfWeekCode = "";
    hfWeekCodeType = "";
    hfCheckPreAOIF = "N";
    hfCheckPreAOIB = "N";
    hfCheckAOIF = "N";
    hfCheckAOIB = "N";
    hfCheckSPIF = "N";
    hfCheckSPIB = "N";
    hfReqMachine = "N";

    hfConnRollLength = "0";
    hfConnLeafLength = "0";
    hfCheckRollPrdFlg = "N";
    hfCheckRollPrdStart = "0";
    hfCheckRollPrdEnd = "0";
    hfCheckRollPrd = "";

    hfSerialStartCode = "";
    hfShtPlasmaTimeFlg = "N";
    hfShtPlasmaTime = "0";
    hfSheetType = "D";
    hfPlasmaConnShtPcs = "N";
    hfCheckXrayF = "N";
    hfCheckXrayB = "N";
    hfCheckXrayOneTime = "N";
    hfCheckFinInspect = "N";
    hfCheckFinInspectProc = "";
    hfReqBoardNo = "N";
    if (item != "") {
      item.map((res) => {
        hfSerialLength = res.slm_serial_length;
        hfSerialFixFlag = res.slm_fix_flag;
        hfSerialDigit = res.slm_fix_digit;
        hfSerialStartDigit = res.slm_fix_start_digit;
        hfSerialEndDigit = res.slm_fix_end_digit;
        hfTrayFlag = res.slm_tray_flag;
        hfTrayLength = res.slm_tray_length;
        hfTestResultFlag = res.slm_test_result_flag;
        hfSerialCount = res.slm_serial_sht;
        hfAutoScan = res.slm_auto_scan;
        hfBarcodeSide = res.slm_barcode_side;
        hfShtScan = res.slm_sht_scan;
        hfConfigCheck = res.prm_barcode_req_config;
        hfConfigCode = res.prm_config_code;
        hfConfigStart = res.prm_start_config;
        hfConfigEnd = res.prm_end_config;
        hfConfigRuning = res.prm_running_req_config;
        hfDuplicateStart = res.prm_duplicate_start;
        hfDuplicateEnd = res.prm_duplicate_end;
        hfCheckPrdSht = res.prm_req_check_prd_sht;
        hfCheckPrdShtStart = res.prm_check_prd_sht_start;
        hfCheckPrdShtEnd = res.prm_check_prd_sht_end;
        hfCheckPrdAbbr = res.prm_abbr;
        hfCheckLotSht = res.prm_req_check_lot_sht;
        hfCheckLotShtStart = res.prm_check_lot_sht_start;
        hfCheckLotShtEnd = res.prm_check_lot_sht_end;
        hfCheckStartSeq = res.prm_req_start_seq_flg;
        hfCheckStartSeqCode = res.prm_start_seq_code;
        hfCheckStartSeqStart = res.prm_start_seq_start;
        hfCheckStartSeqEnd = res.prm_start_seq_end;
        hfCheckSheetELT = res.prm_sheet_elt_flg;
        hfCheckRollSht = res.prm_conn_roll_sht_flg;
        hfCheckRollShtDigit = res.prm_conn_roll_sht_length;
        hfCheckDateInProc = res.prm_date_inproc_flg;
        hfDateInProc = res.prm_date_inproc;
        hfWeekCodeType = res.prm_date_type;
        hfCheckWeekCode = res.prm_check_weekcode_flg;
        hfCheckWeekCodeStart = res.prm_check_weekcode_start;
        hfCheckWeekCodeEnd = res.prm_check_weekcode_end;
        hfCheckPreAOIF = res.prm_sht_pre_aoi_f;
        hfCheckPreAOIB = res.prm_sht_pre_aoi_b;
        hfCheckAOIF = res.prm_sht_aoi_f;
        hfCheckAOIB = res.prm_sht_aoi_b;
        hfCheckAOICoatF = res.prm_sht_aoi_coat_f;
        hfCheckAOICoatB = res.prm_sht_aoi_coat_b;
        hfCheckSPIF = res.prm_sht_spi_f;
        hfCheckSPIB = res.prm_sht_spi_b;
        hfReqMachine = res.prm_sht_machine_flg;
        hfConnRollLength = res.prm_conn_roll_length;
        hfConnLeafLength = res.prm_conn_leaf_length;
        hfCheckRollPrdFlg = res.prm_conn_roll_prd_flg;
        hfCheckRollPrdStart = res.prm_conn_roll_prd_start;
        hfCheckRollPrdEnd = res.prm_conn_roll_prd_end;
        hfCheckRollPrd = res.prm_conn_roll_prd_fix;
        hfSerialStartCode = res.prm_serial_start_code;
        hfShtPlasmaTimeFlg = res.prm_sht_plasma_time_flg;
        hfShtPlasmaTime = res.prm_sht_plasma_time;
        hfSheetType = res.prm_sheet_type;
        hfPlasmaConnShtPcs = res.prm_conn_shtpcs_plasma_time_flg;
        hfSerialInfo = res.prm_additional_info;
        hfCheckXrayF = res.prm_sht_xray_f;
        hfCheckXrayB = res.prm_sht_xray_b;
        hfCheckXrayOneTime = res.prm_sht_xray_1_time_flg;
        hfCheckFinInspect = res.prm_fin_gate_inspect_flg;
        hfCheckFinInspectProc = res.prm_fin_gate_inspect_proc;
        hfReqBoardNo = res.prm_conn_sht_board_flg;
      });
    }

    if (hfCheckRollPrdFlg == "Y") {
      setlblCheckRoll({
        text: "ON",
        styled: { backgroundColor: "bule", color: "green" },
      });
    } else {
      setlblCheckRoll({
        text: "OFF",
        styled: { backgroundColor: "red", color: "black" },
      });
    }
  }
  function ConvertBase34(num) {
    let shou;
    let Amari = [];
    let i = 1;
    let StrTemp = "";
    let LngNumber = num;

    do {
      Amari.push(LngNumber % 34);
      shou = Math.floor(LngNumber / 34);
      if (shou === 0) {
        break;
      }
      i += 1;
      if (shou < 34) {
        Amari.push(shou);
        break;
      }
      LngNumber = shou;
    } while (true);

    for (let j = i - 1; j >= 0; j--) {
      StrTemp += ChangeBase34(Amari[j]);
    }
    return StrTemp;
  }
  function ChangeBase34(intnumber) {
    const strChange = "0123456789ABCDEFGHJKLMNPQRSTUVWXYZ";
    return strChange[intnumber];
  }
  function Convert0000(strText) {
    let paddedStr = "0000" + strText;
    return paddedStr.substring(paddedStr.length - 4);
  }
  async function getCountDataBylot(lot) {
    let dtSerialCount = [];
    setlblTotalSht("");
    setlblTotalPcs("");
    dtSerialCount = await getData("GetLotSerialCountData", lot);
    if (dtSerialCount != "") {
      const formattedCountSht = new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(dtSerialCount.count_sht);

      const formattedCountPcs = new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(dtSerialCount.count_pcs);
      setlblTotalSht(formattedCountSht);
      setlblTotalPcs(formattedCountPcs);
    }
  }
  function getIntitiaSheet() {
    let dtData = [];
    for (let i = 0; i < hfShtScan; i++) {
      const newRow = {
        SEQ: (i+1).toString(),
        TITLE: hfBarcodeSide === "F" ? "Back/Front :" : "Front/Back :",
      };
      dtData.push(newRow);
    }
    return dtData;
  }
  const getInitialSerial = () => {
    
    const newData = [];
    if (hfReqBoardNo == "Y") {
      setPnlBoardState(true);
    } else {
      setPnlBoardState(false);
    }
    for (let intSht = 1; intSht <= parseInt(hfShtScan); intSht++) {
      for (let intRow = 1; intRow <= parseInt(hfSerialCount); intRow++) {
        var data = {
          SHEET: intSht.toString(),
          SEQ: intRow,
          TYPE: "PCS",
        };
        newData.push(data);
      }
    }
    setPanalSerialState(true);
    return newData;
  };
  function SetFocus(txtField) {
    document.getElementById(`${txtField}`).focus();
  }
  function Setmode(strType) {
    if (strType === "LOT") {
      setSelectproductState(true);
      setLotValue("");
      setLotState(enableState);
      setlblLogState(false);
      setPnlBoardState(false);
      sethfMode("LOT");

      setPanalSerialState(false);      
      Fctxtlot.current.focus();
      SetFocus('txtlot')
    } else if (strType === "LOT_ERROR") {
      setLotValue("");
      setLotState(enableState);

      setlblLogState(true);
      setPanalSerialState(false);

      sethfMode("LOT");
      Fctxtlot.current.focus();
    } else if (strType === "SERIAL") {
      setLotState(disabledState);
      setLblResultState(false);
      setlblLogState(false);
      setPanalSerialState(true);

      sethfMode("SERIAL");
      getInitialSerial();
      
    } else if (strType === "SERIAL_ERROR") {
      setLotState(disabledState);
      setlblLogState(true);
    } else if (strType === "SERIAL_OK") {
      setLotState(disabledState);
      setlblLogState(false);
      setPanalSerialState(true);
      setGvSerial(getInitialSerial());
      // fnSetFocus("gvSerial")
    } else if (strType === "SERIAL_NG") {
      setLotState(disabledState);
      setlblLogState(false);
    }
  }
  const columns = [
    {
    title: "Sheet No.",
    dataIndex: "SHEET",
    key: "SHEET",
    align: "center",
    width:80,
    render: (text, record, index) => {
      return text;
    },
  },
  {
    title: "No.",
    dataIndex: "SEQ",
    key: "SEQ",
    align: "center",
    width: 80,
    render: (text, record, index) => {
      return text;
    },
  },
  {
    title: "Serial No.",
    dataIndex: "SERIAL",
    key: "SERIAL",
    align: "center",
    width: 150,
    render: (text, record, index) => {
      return (
        <div style={{ textAlign: 'center' }}>
          {text}
        </div>
      );
    },
    
  },
  {
    title: "Scan Result",
    dataIndex: "SCAN_RESULT",
    key: "SCAN_RESULT",
    align: "center",
    width: 80,
    padding: '0px 0px 0px 0px',
    render: (text, record, index) => {
      const backgroundColor =
        record.SCAN_RESULT === "NG" ? "#f50" : 
        record.SCAN_RESULT === "OK" ? "#87d068" : 
        "transparent";
      
      return (
        < Tag style={{width:100,textAlign:'center',padding:'0px 0px 0px 0px'}}  color={backgroundColor} >
          {text}
        </Tag>
      );
    },
  },
  {
    title: "Remark",
    dataIndex: "REMARK",
    key: "REMARK",
    align: "center",
    width: 300,
    render: (text, record, index) => {
      return text;
    },
  },
];
  return {
    productCombo,
    setProductcombo,
    productSelect,
    setProductSelect,
    lotValue,
    setLotValue,
    lotState,
    btnBack_Click,
    Fctxtlot,
    ProductSelect_Change,
    txtLot_Change,
    pnlRollLeafState,
    lblTotalSht,
    lblLog,
    lblLogState,
    txtLotRef,
    setTxtLotRef,
    lblTotalPcs,
    lblCheckRoll,
    gvBackSideState,
    gvBackSide,
    txtRollLeaf,
    setTxtRollLeaf,
    FCtxtRollleaf,
    txtmcno,
    setTxtmcno,
    Fctxtmcno,
    pnlMachineState,
    FcgvBackside,
    FcgvFrontside,
    FcSelectproduct,
    selectproductState,
    pnlBoardState,
    panalSerialState,
    gvSerial,
    txtRollLeaf_Change,
    txtLotRef_Change,
    txtOperator,
    setTxtOperator,
    FctxtOperator,
    txtOperator_Change,
    btnSave_Click,
    btnCancel_Click,
    txtSideFront,
    setTxtSideFront,
    txtSideBack,
    setTxtSideBack,
    handleBackSideChange,
    handleFrontSideChange,
    txtSerial,
    handletxtSerialChange,
    txtBoardNoB,
    setTxtBoardNoB,
    txtBoardNoF,
    setTxtBoardNoF,
    FctxtBoardnoB,
    FctxtBoardnoF,
    lblResultState,
    lblResult,
    gvScanResult,
    hideImg,
    columns
  };
};

export { fn_ScanSMTSerialShtFINManySht };
