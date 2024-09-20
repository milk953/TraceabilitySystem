import axios from "axios";
import { set } from "lodash";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

function fn_ScanSMTSerialShtCopy() {
  //hidden parameter
  const AUTO_SCAN_CHECK_FLG = import.meta.env.VITE_AUTO_SCAN_CHECK_FLG;
  const CONNECT_SERIAL_ERROR = import.meta.env.VITE_CONNECT_SERIAL_ERROR;
  const CONNECT_SERIAL_NOT_FOUND = import.meta.env
    .VITE_CONNECT_SERIAL_NOT_FOUND;
  const ROLL_SHT_ROLL_START_DIGIT = import.meta.env
    .VITE_ROLL_SHT_ROLL_START_DIGIT;
  const ROLL_SHT_ROLL_LENGTH = import.meta.env.VITE_ROLL_SHT_ROLL_LENGTH;
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
  let _strTagNewLine = '/'
  //State
  const plantCode = import.meta.env.VITE_FAC;
  const [gvBackSideState, setGvBackSideState] = useState(false);
  const [lblErrorState, setLblErrorState] = useState(false);
  const [lblError, setLblError] = useState("");
  const [panalSerialState, setPanalSerialState] = useState(false);
  const [hideImg, setHideImg] = useState(true);
  const [lblResultState, setLblResultState] = useState(false);
  const [pnlRollLeafState, setPnlRollLeafState] = useState(false);
  const [pnlMachineState, setPnlMachineState] = useState(false);
  const [pnlButtonFixState, setPnlButtonFixState] = useState(false);
  const [ddlProductState, setDdlProductState] = useState(false);

  //textField
  const [txtlotNo, setTxtlotNo] = useState("");
  const [ddlProduct, setDdlproduct] = useState([]);
  const [productSelected, setProductSelected] = useState("");
  const [txtLotRef, setTxtLotRef] = useState("");
  const [txtRollLeaf, setTxtRollLeaf] = useState("");
  const [txtCheckRoll, setTxtCheckRoll] = useState({
    text: "",
    styled: { backgroundColor: "", color: "white" },
  });
  const [txtMachineNo, setTxtMachineNo] = useState("");
  const [txtButtonFix, setTxtButtonFix] = useState("");
  const [txtTopFix, setTxtTopFix] = useState("");
  const [lblTotalPcs, setlblTotalPcs] = useState(0);
  const [lblTotalSht, setlblTotalSht] = useState(0);
  const [txtbackSide, setTxtbackSide] = useState("");
  // TableView
  const [gvBackSide, setGvBackSide] = useState([]);
  const [gvSerial, setGvSerial] = useState([]);
  const [gvScanResult, setGvScanResult] = useState([]);
  const [txtSerial, setTxtSerial] = useState(gvSerial.map(() => ""));

  //Funtion
  useEffect(() => {
    PageLoad();
  }, []);
  // textfile
  const handle_ibtnBack_Click = () => {
    setTxtlotNo("");
    setProductSelected(ddlProduct[0].prd_name);
    sethfMode("LOT");
    setLblErrorState(false);
    setPanalSerialState(false);
    SetFocus("txtlotNoFinCopy");
  };
  const ddlproduct_Change = async (value) => {
    setProductSelected(value);
    await getData("getProductSerialMaster", value);
    if (txtlotNo == "") {
      sethfMode("LOT");
      SetFocus("txtlotNoFinCopy");
      setProductSelected(ddlProduct[0].prd_name);
    }
  };
  const handle_Save_Click = async () => {
    const UpdateData = await UpdateGvSerial(txtSerial);

    setSerialData(UpdateData);
  };

  const handle_Cancel_Click = async () => {
    setMode("SERIAL");
    SetFocus("txtSerial_0");
    setTxtSerial(gvSerial.map(() => ""));
  };
  const handle_txtlotNo_Change = async (e) => {
    let strLotData = [];
    let strLot = "";
    let strPrdname = "";
    let dtLotData = [];
    strLotData = e.target.value.split(";");
    if (strLotData.length > 2) {
      strLot = strLotData[0];
      dtLotData = await getData("GetProductDataByLot", strLot);
      setPnlRollLeafState(false);
      if (dtLotData != "") {
        strPrdname = dtLotData.PRD_NAME;
        hfRollNo = dtLotData.ROLL_NO;
      }
      if (strPrdname != "") {
        setLblErrorState(false);
        setLblError("");
        // setTxtlotNo(strLot);
        setTxtLotRef(strLot);
        getCountDataBylot(strLot);

        try {
          if (ddlProduct.some((item) => item.prd_name === strPrdname)) {
            setProductSelected(strPrdname);
          } else {
            alert("x");
          }

          await getData("getProductSerialMaster", strPrdname);
          setGvBackSide(getIntitiaSheet());
          setGvSerial(getInitialSerial());

          if (hfCheckRollSht == "Y") {
            setPnlRollLeafState(true);
            setTxtRollLeaf("");
            SetFocus("txtRollLeafFinCopy");
          } else {
            setMode("SERIAL");
            setTxtMachineNo("");
            if (hfReqMachine == "Y") {
              setPnlMachineState(true);
              SetFocus("txtMachineNoFinCopy");
            } else {
              setPnlMachineState(false);
              // SetFocus("txtbackSide_0");
            }
          }
        } catch (error) {
          console.log(error, "error");
          setLblError("Product" + strPrdname + "not found");
          setLblErrorState(true);
          SetFocus("ddlProductFinCopy");
        }
      } else {
        setProductSelected(ddlProduct[0].prd_name);
        setTxtlotNo("");
        setGvSerial([]);
        setLblError("Invalid lot no.");
        setLblErrorState(true);
        sethfMode("LOT");
        SetFocus("txtlotNoFinCopy");
      }
    }
  };
  const handle_txtLotRef_Change = (e) => {
    setTxtLotRef(e.target.value);
    let lotRef = e.target.value;
    if (lotRef != "") {
      lotRef = lotRef.split(";");
      setTxtlotNo(lotRef[0]);
      SetFocus("txtOperatorFinCopy");
    }
  };
  const handle_txtRollleaf_Change = (e) => {
    setTxtRollLeaf(e.target.value);
    let lotRollLeaf = e.target.value;
    if (lotRollLeaf != "" && lotRollLeaf.length == parseInt(hfConnLeafLength)) {
      let strRollProduct = hfRollNo + hfCheckRollPrd;
      let start = parseInt(hfCheckRollPrdStart);
      let end = parseInt(hfCheckRollPrdEnd);
      let result = text.substring(start - 1, end);
      if (hfCheckRollPrdFlg == "Y") {
        if (strRollProduct !== result) {
          setLblError("Roll/Leaf No. mix product");
          setLblErrorState(true);
          setGvBackSide(getIntitiaSheet());
          setTxtRollLeaf("");
          SetFocus("txtRollLeafFinCopy");
        } else {
          setMode("SERIAL");
          setTxtMachineNo("");
          if (hfReqMachine == "Y") {
            setPnlMachineState(true);
            SetFocus("txtMachineNoFinCopy");
          } else {
            setPnlMachineState(false);
            SetFocus("txtbackSide_0");
          }
        }
      } else {
        setMode("SERIAL");
        setTxtMachineNo("");
        if (hfReqMachine == "Y") {
          setPnlMachineState(true);
          SetFocus("txtMachineNoFinCopy");
        } else {
          setPnlMachineState(false);
          SetFocus("txtbackSide_0");
        }
      }
    } else {
      setLblError("Invalid Roll/Leaf No.");
      setLblErrorState(true);
      setPanalSerialState(false);
      sethfMode("ROLL");
      setGvBackSide(getIntitiaSheet());
      setTxtRollLeaf("");
      SetFocus("txtRollLeafFinCopy");
    }
  };

  //function
  async function setSerialData(dtBackSideUpdate) {
    await getData("getProductSerialMaster", productSelected);
    let dtSerial = await getInputSerial();
    let _strPrdName = productSelected;
    let _strLotData = txtlotNo.split(";")
    let _strLotRefData = txtLotRef.split(";")
    let _strLot = _strLotData[0];
    let _strLotRef = _strLotRefData[0];
    let _strShtNoBack = "";
    let _strShtNoFront = "";
    let _strTray = " ";
    let _intSeq = 1;
    let _strScanResultAll = "OK";
    let _strErrorAll = "";
    let _strUpdateError = "";
    let _bolError = false;
    hfWeekCode = "";

    setLblErrorState(false);
    if (txtlotNo != '' && dtSerial != ''){
      if (hfCheckWeekCode == 'Y'){
        hfWeekCode = await getData("GetWeekCodebyLot",{txtlotNo,hfDateInProc});
      }
      let _intRowSerial = 0;
      for (let i =0;i<dtSerial.length;i++){
        _strShtNoBack = dtSerial[i].BACK_SIDE;
        _strShtNoFront = dtSerial[i].FRONT_SIDE;

        if (hfSheetType == 'D' && _strShtNoBack ==_strShtNoFront){
          _strScanResultAll = "NG"
          _strErrorAll = "Double Product sheet F,B not same"
          _bolError = true;
        }
        if(hfCheckPrdSht == 'Y' && parseInt(dtSerial[i].SEQ) == 1 && !_bolError){
          if (hfCheckPrdAbbr !== _strShtNoBack.substring(parseInt(hfCheckPrdShtStart), parseInt(hfCheckPrdShtEnd) + 1)){
            _strScanResultAll = "NG"
            _strErrorAll = "Sheet product mix"
            _bolError = true
          }
          if (hfCheckPrdAbbr !== _strShtNoFront.substring(parseInt(hfCheckPrdShtStart), parseInt(hfCheckPrdShtEnd) - parseInt(hfCheckPrdShtStart) + 1)){
            _strScanResultAll = "NG"
            _strErrorAll = "Sheet product mix"
            _bolError = true
          }
        }
        if(hfCheckLotSht == 'Y' && parseInt(dtSerial[i].SEQ) == 1 && !_bolError){
         if(_strLotRef !== _strShtNoBack.substring(parseInt(hfCheckLotShtStart), parseInt(hfCheckLotShtEnd) - parseInt(hfCheckLotShtStart) + 1)){
          _strScanResultAll = "NG"
          _strErrorAll = "Sheet lot mix"
          _bolError = true
         }
         if (_strLotRef !== _strShtNoFront.substring(parseInt(hfCheckLotShtStart), parseInt(hfCheckLotShtEnd) - parseInt(hfCheckLotShtStart) + 1)) {
          _strScanResultAll = "NG";
          _strErrorAll = "Sheet lot mix";
          _bolError = true;
        }
        }
        // Check sheet plasma time control
        if ( parseInt(dtSerial[i].SEQ) == 1 && !_bolError){
          _strErrorAll = await getData("GetConnectShtPlasmaTime",{ShtnoF:_strShtNoFront,ShtnoB:_strShtNoBack,lot:_strLot,shfShtPlasmaTime:parseFloat(hfShtPlasmaTime)})
          if(_strErrorAll !== 'NG'){
            _strScanResultAll = "NG";
            _bolError = true;
          }
        }
        if(parseInt(dtSerial[i].SEQ) == 1){
          let _inCountSeq = 0;
          let _strSerialNoDup = ''
          _inCountSeq = await getData("GetSheetDuplicateConnectShtType",{strSheetnoF:_strShtNoFront,strSheetnoB:_strShtNoBack,strSheetType:hfSheetType});
          if (_inCountSeq > 0){
            _strScanResultAll = "NG"
            _strErrorAll = "Sheet no. duplicate"
            _bolError = true
          }
        }
        if(hfReqMachine == 'Y'){
          if (txtMachineNo == "" || txtMachineNo == CONNECT_SERIAL_ERROR || txtMachineNo == CONNECT_SERIAL_NOT_FOUND){
            _strScanResultAll = "NG"
            _strErrorAll = "Invalid machine no."
            _bolError = true
          }
        }
        if(parseInt(hfConnLeafLength) > 0 && (parseInt(hfConnLeafLength) !== _strShtNoBack.length || parseInt(hfConnLeafLength) !== _strShtNoFront.length)){
          _strScanResultAll = "NG"
          _strErrorAll = "Invalid sheet length"
          _bolError = true
        }
        if(hfReqBoardNo == 'Y' && dtSerial[i].BOARD_NO_F.length ==0 ){
          _strScanResultAll = "NG"
          _strErrorAll = "Please input board no."
          _bolError = true
        }
        if(dtSerial[i].SERIAL != ""){
          let _strSerial = dtSerial[i].SERIAL;
          let _strTestResult = "None";
          let _strMessageUpdate = "";
          let _strScanResultUpdate = "";
          if (CONNECT_SERIAL_ERROR.indexOf(_strSerial) <= 0) {
            for(let j=0;i<dtSerial.length;j++){
              if(_strSerial == dtSerial[j].SERIAL ){
                _strScanResultUpdate = "NG"
                _strMessageUpdate = "Serial duplicate" + _strTagNewLine + "หมายเลขบาร์โค้ดซ้ำ"
                _strScanResultAll = "NG"
                _bolError = true
              }
            }
            if(_strSerial.length == parseInt(hfSerialLength)){
              let _strFixDigit = '';
              _strFixDigit = _strSerial.substring(parseInt(hfSerialStartDigit), parseInt(hfSerialEndDigit) - parseInt(hfSerialStartDigit) + 1);

              if(_strFixDigit != hfSerialDigit){
                _strScanResultUpdate = "NG"
                _strMessageUpdate = "Serial barcode mix product" + _strTagNewLine + "หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น"
                _strScanResultAll = "NG"
                _bolError = true
              }else if(hfConfigCheck =='Y'){
                let _strConfigDigit = ''
                _strConfigDigit = _strSerial.substring(parseInt(hfConfigStart), parseInt(hfConfigEnd) - parseInt(hfConfigStart) + 1)
                if (_strConfigDigit !== hfConfigCode){
                  _strScanResultUpdate = "NG"
                  _strMessageUpdate = "Serial barcode mix product" + _strTagNewLine + "หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น"
                  _strScanResultAll = "NG"
                  _bolError = true
                }
              }
              if(hfSerialStartCode !== '' && _bolError == false){
                if (_strSerial.substring(0, hfSerialStartCode.length) !== hfSerialStartCode){
                  _strScanResultUpdate = "NG"
                  _strMessageUpdate = "Serial barcode mix product" + _strTagNewLine + "หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น"
                  _strScanResultAll = "NG"
                  _bolError = true
                }
              }
              if (hfCheckStartSeq =='Y' && _strScanResultUpdate != 'NG'){
                  let _strStartSeq = ''
                  _strStartSeq = _strSerial.substring(parseInt(hfCheckStartSeqStart), parseInt(hfCheckStartSeqEnd) - parseInt(hfCheckStartSeqStart) + 1)
                  if(_strStartSeq != hfCheckStartSeqCode){
                    _strScanResultUpdate = "NG"
                    _strMessageUpdate = "Serial barcode mix product" + _strTagNewLine + "หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น"
                    _strScanResultAll = "NG"
                    _bolError = true
                  }
              }
              if(hfCheckWeekCode == 'Y' && _strScanResultUpdate !== 'NG'){
                let _strWeekCode = ''
                _strWeekCode = _strSerial.substring(parseInt(hfCheckWeekCodeStart), parseInt(hfCheckWeekCodeEnd) - parseInt(hfCheckWeekCodeStart) + 1)
                if(_strWeekCode !== hfWeekCode){
                  _strScanResultUpdate = "NG"
                  _strMessageUpdate = "Serial barcode mix week code" + _strTagNewLine + "หมายเลขบาร์โค้ดปนรหัสสัปดาห์กัน"
                  _strScanResultAll = "NG"
                  _bolError = true
                }
              }
            }else{
              _strScanResultUpdate = "NG"
              _strMessageUpdate = "Serial not matching product" + _strTagNewLine + "หมายเลขบาร์โค้ดไม่ตรงตามที่กำหนดไว้"
              _strScanResultAll = "NG"
              _bolError = true
            }
            if(_strScanResultUpdate !== 'NG'){
              let _inCountSeq =0
              let _strSerialNoDup =''
              _inCountSeq,_strSerialNoDup = await getData("GetSerialDuplicateConnectSht",{}) //รอทำ api ใหม่
              if (_inCountSeq > 0){
                _strScanResultUpdate = "NG"
                _strMessageUpdate = "Serial duplicate" + _strTagNewLine + "หมายเลขบาร์โค้ดซ้ำ"
                _strScanResultAll = "NG"
                _bolError = true
              }
            }
          }else{
            _strMessageUpdate = "Bad mark piece" + _strTagNewLine + "ชิ้นงานเสียทำเครื่องหมายไว้แล้ว"
          }
          dtSerial[i].SCAN_RESULT = _strScanResultUpdate
          dtSerial[i].REMARK = _strMessageUpdate
        }
        _intRowSerial += 1
      }
    }
  }
  async function UpdateGvSerial(txtSerial) {
    const combinedData = gvSerial.map((item, index) => ({
      ...item,
      SERIAL: txtSerial[index],
    }));
    return combinedData;
  }
  function SetFocus(txtField) {
    document.getElementById(`${txtField}`).focus();
  }
  function Setdisable(type, txtField) {
    if (type == "disable") {
      document.getElementById(`${txtField}`).disabled = true;
      document.getElementById(`${txtField}`).className = "styleDisableFinCopy";
    } else {
      document.getElementById(`${txtField}`).disabled = false;
      document.getElementById(`${txtField}`).className = "styleEnableFinCopy";
    }
  }
  async function PageLoad() {
    let Ipaddress = localStorage.getItem("ipAddress");
    sethfUserID(Ipaddress);
    sethfUserStation(Ipaddress);
    await getData("getProductData", null);
    setMode("LOT");
  }
  async function getData(type, params) {
    if (type == "getProductData") {
      await axios.get("/api/common/GetProductData").then((res) => {
        setProductSelected(res.data[0].prd_name);
        setDdlproduct(res.data);
      });
    } else if (type == "GetProductDataByLot") {
      let dtData = [];
      await axios
        .post("/api/ScanFin/GetProductDataByLot", { strLot: params })
        .then((res) => {
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
          dataList: { strLotNo: params, strPlantCode: plantCode },
        })
        .then((res) => {
          drSerialCount = res.data;
        })
        .catch((error) => {
          Swal.fire("Error", error.message);
        });
      return drSerialCount;
    } else if (type == "getProductSerialMaster") {
      await axios
        .post("/api/common/GetSerialProductByProduct", { prdName: params })
        .then((res) => {
          setSerialMaster(res.data);
        })
        .catch((error) => {
          // Swal.fire("Error", error.message);
        });
    } else if (type == "GetWeekCodebyLot") {
      let result = "";
      await axios
        .post("/api/ScanFin/GetWeekCodebyLot", {
          strLot: params.txtlotNo,
          strProc: params.hfDateInProc,
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
      console.log(params);
      await axios
        .post("/api/ScanFin/GetConnectShtPlasmaTime", {
          strSheetnoF: params.ShtnoF,
          strSheetnoB: params.ShtnoB,
          lot_no: params.lot,
          dblPlasmaTime: params.shfShtPlasmaTime,
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
          strSheetnoF: params.strSheetnoF,
          strSheetnoB: params.strSheetnoB,
          strSheetType: params.strSheetType,
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
      await axios //ทำใหม่ต้อง check useRef _strSerialNoDup
        .post("/api/ScanFin/GetSerialDuplicateConnectSht", {
          dataList: {
            strLssSerialNo: params.strSerial,
            strPlantCode: params.strplantcode,
          },
        })
        .then((res) => {
          result = res.data.intRow;
        })
        .catch((error) => {
          Swal.fire("Error", error.message);
        });
      return result;
    }
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
      setTxtCheckRoll({
        text: "ON",
        styled: { backgroundColor: "bule", color: "green" },
      });
    } else {
      setTxtCheckRoll({
        text: "OFF",
        styled: { backgroundColor: "red", color: "black" },
      });
    }
  }
  function getIntitiaSheet() {
    let dtData = [];
    for (let i = 1; i <= hfShtScan; i++) {
      const newRow = {
        SEQ: i.toString(),
        TITLE:
          hfBarcodeSide === "F" ? `Back/Front ${i} : ` : `Front/Back ${i} : `,
      };
      dtData.push(newRow);
    }
    setGvBackSideState(true);
    return dtData;
  }
  const getInitialSerial = () => {
    const newData = [];
    if (hfReqBoardNo == "Y") {
      setTxtButtonFix(true);
    } else {
      setTxtButtonFix(false);
    }
    for (let intSht = 1; intSht <= parseInt(hfShtScan); intSht++) {
      const newRow = {
        SEQ: 0,
        SHEET:
          hfBarcodeSide === "F"
            ? "Front/Back : " + intSht
            : "Back/Front : " + intSht,
        TYPE: "SHT",
      };
      newData.push(newRow);
      for (let intRow = 1; intRow <= parseInt(hfSerialCount); intRow++) {
        var data = {
          SEQ: intRow,
          SHEET: intSht.toString(),
          TYPE: "PCS",
        };
        newData.push(data);
      }
    }
    setPanalSerialState(true);
    return newData;
  };
  const handletxtBackSide = (index, event) => {
    const newValues = [...txtbackSide];
    newValues[index] = event.target.value;
    setTxtbackSide(newValues);
    if (event.key === "Enter") {
      try {
        SetFocus(`txtbackSide_${index + 1}`);
      } catch (error) {
        SetFocus(`txtSerial_0`);
      }
    }
  };
  function setMode(mode) {
    switch (mode) {
      case "LOT":
        setDdlProductState(false);
        setTxtlotNo("");
        Setdisable("", "txtlotNoFinCopy");

        setLblErrorState(false);
        setPanalSerialState(false);
        setPnlButtonFixState(false);
        sethfMode("LOT");
        SetFocus("txtlotNoFinCopy");
        break;
      case "LOT_ERROR":
        setTxtlotNo("");
        Setdisable("", "txtlotNoFinCopy");

        setLblErrorState(true);
        setPanalSerialState(false);
        sethfMode("LOT");
        SetFocus("txtlotNoFinCopy");
        break;
      case "SERIAL":
        Setdisable("disable", "txtlotNoFinCopy");
        setLblErrorState(false);
        setPanalSerialState(true);
        sethfMode("SERIAL");
        getInitialSerial();
        break;
      case "SERIAL_ERROR":
        Setdisable("disable", "txtlotNoFinCopy");
        setLblErrorState(true);
        break;
      case "SERIAL_OK":
        Setdisable("disable", "txtlotNoFinCopy");
        setLblErrorState(false);
        setPanalSerialState(true);
        getInitialSerial();
        // SetFocus("gvSerial");
        break;
      case "SERIAL_NG":
        Setdisable("disable", "txtlotNoFinCopy");
        setLblErrorState(false);
        break;
    }
  }
  function getConnectRollSheetData(_dtSerial, _strProduct, _strRollLeaf) {
    let _dtData = [];
    let _intRollRow = 1;
    let _intRow = 0;
    let _strShtNoOld = "";
    let _strRollNo = "";

    _strRollNo = hfRollNo;

    for (let i = 0; i < _dtSerial; i++) {
      let drRow = _dtSerial[i];
      if (drRow.FRONT_SIDE != _strShtNoOld) {
        _intRow++;
        let _drShtRow = {
          ROLL_SEQ: _intRollRow,
          SHT_SEQ: _intRow,
          LOT_NO: txtlotNo,
          ROLL_NO: _strRollNo,
          ROLL_LEAF: _strRollLeaf,
          SHT_NO: drRow.FRONT_SIDE,
          SCAN_RESULT: "",
          REMARK: "",
          ROW_UPDATE: "Y",
          UPDATE_FLG: "N",
          MACHINE: txtMachineNo,
          PRODUCT: _strProduct,
        };
        _dtData.push(_drShtRow);
        if (drRow.FRONT_SIDE !== drRow.BACK_SIDE) {
          _intRow++;
          let drShtRow2 = {
            ROLL_SEQ: _intRollRow,
            SHT_SEQ: _intRow,
            LOT_NO: txtlotNo,
            ROLL_NO: _strRollNo,
            ROLL_LEAF: _strRollLeaf,
            SHT_NO: drRow.FRONT_SIDE,
            SCAN_RESULT: "",
            REMARK: "",
            ROW_UPDATE: "Y",
            UPDATE_FLG: "N",
            MACHINE: txtMachineNo,
            PRODUCT: _strProduct,
          };
          _dtData.push(drShtRow2);
        }
      }
      _strShtNoOld = drRow.FRONT_SIDE;
    }
    return _dtData;
  }
  const handletxtSerialChange = (index, event) => {
    const newValues = [...txtSerial];
    newValues[index] = event.target.value;
    setTxtSerial(newValues);
    if (event.key === "Enter") {
      try {
        SetFocus(`txtSerial_${index + 1}`);
      } catch (error) {
        handle_Save_Click();
      }
    }
  };

  async function getInputSerial() {
    await getData("getProductSerialMaster", productSelected);
    //เช็คอีกที
    var dtData = [];
    var updatedt = [];
    var intRow = 0;
    var strFrontSide = "";
    let _strlotno = txtlotNo;
    for (let i = 0; i < gvSerial.length; i++) {
      if (txtSerial[i] == undefined) {
        txtSerial[i] = "";
      }
      if (gvSerial[i].TYPE == "SHT") {
        strFrontSide = txtSerial[i];
      } else if (txtbackSide[i-1] != "" && strFrontSide != "") {
        console.log(txtbackSide[i-1],i, "txtbackSide[i]");
        let dtRow = {
          SHEET: gvSerial[i].SHEET,
          BACK_SIDE: txtbackSide[i-1] || '',
          FRONT_SIDE: strFrontSide,
          SEQ: gvSerial[i].SEQ,
          SERIAL: txtSerial[i],
          SCAN_RESULT: "",
          REMARK: "",
          UPDATE_FLG: "N",
          MACHINE: txtMachineNo,
          LOT: txtLotRef,
          PRODUCT: productSelected,
          ROW_UPDATE: "Y",
        };
        if (hfReqBoardNo == "Y") {
          updatedt = {
            ...dtRow,
            BOARD_NO_F: txtBoardNoF,
            BOARD_NO_B: txtBoardNoB,
          };
          dtData.push(updatedt);
        } else {
          dtData.push(dtRow);
        }
      }
    }
    return dtData;
  }
  return {
    handle_txtlotNo_Change,
    gvBackSideState,
    lblErrorState,
    panalSerialState,
    hideImg,
    lblResultState,
    pnlRollLeafState,
    pnlMachineState,
    pnlButtonFixState,
    txtlotNo,
    setTxtlotNo,
    productSelected,
    setProductSelected,
    txtLotRef,
    setTxtLotRef,
    txtRollLeaf,
    setTxtRollLeaf,
    txtCheckRoll,
    setTxtCheckRoll,
    txtMachineNo,
    setTxtMachineNo,
    txtButtonFix,
    setTxtButtonFix,
    txtTopFix,
    setTxtTopFix,
    ddlProduct,
    ddlproduct_Change,
    lblTotalSht,
    lblTotalPcs,
    gvBackSide,
    txtbackSide,
    handletxtBackSide,
    lblError,
    ddlProductState,
    handle_ibtnBack_Click,
    gvSerial,
    txtSerial,
    handletxtSerialChange,
    handle_Cancel_Click,
    handle_Save_Click,
    handle_txtLotRef_Change,
    handle_txtRollleaf_Change,
  };
}

export { fn_ScanSMTSerialShtCopy };
