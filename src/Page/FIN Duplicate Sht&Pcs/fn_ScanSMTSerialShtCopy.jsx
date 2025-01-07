import axios from "axios";
import { Tag } from "antd";
import React, { useEffect, useState } from "react";
import {useLoading} from "../../loading/fn_loading";
import {DataConfig} from "../Common/function_Common";
function fn_ScanSMTSerialShtCopy() {
  const{ConfigData} = DataConfig();
  //hidden parameter
  const plantCode = ConfigData.FACTORY;
  const AUTO_SCAN_CHECK_FLG = ConfigData.AUTO_SCAN_CHECK_FLG;
  const CONNECT_SERIAL_ERROR = ConfigData.CONNECT_SERIAL_ERROR;
  const CONNECT_SERIAL_NOT_FOUND = ConfigData.CONNECT_SERIAL_NOT_FOUND;
  const ROLL_SHT_ROLL_START_DIGIT = ConfigData.ROLL_SHT_ROLL_START_DIGIT;
  const ROLL_SHT_ROLL_LENGTH = ConfigData.ROLL_SHT_ROLL_LENGTH;

  const [hfUserID, sethfUserID] = useState("");
  const [hfUserStation, sethfUserStation] = useState("");
  const [hfMode, sethfMode] = useState("");
  const {showLoading,hideLoading} = useLoading();
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
  const [gvBackSideState, setGvBackSideState] = useState(false);
  const [lblErrorState, setLblErrorState] = useState(false);
  const [lblError, setLblError] = useState("");
  const [panalSerialState, setPanalSerialState] = useState(false);
  const [hideImg, setHideImg] = useState(true);
  const [lblResultState, setLblResultState] = useState(false);
  const [lblResult, setlblResult] = useState({
    text: "",
    styled: { backgroundColor: "white", color: "white" },
  });
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
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  //Funtion
  useEffect(() => {
    PageLoad();
  }, []);
  // textfile
  const handle_ibtnBack_Click = () => {
    setlblTotalPcs(0);
    setlblTotalSht(0);
    setTxtlotNo("");
    setProductSelected(ddlProduct[0].prd_name);
    setGvBackSideState(false);
    setGvBackSide([]);
    setTxtbackSide(gvBackSide.map(() => ""));
    setTxtSerial(gvSerial.map(() => ""));
    setLblResultState(false);
    setHideImg(true);
    sethfMode("LOT");
    setMode("LOT");
    setLblErrorState(false);
    setPanalSerialState(false);
    SetFocus("txtlotNoFinCopy");
    setTxtLotRef("");
    
  };
  const ddlproduct_Change = async (value) => {
    setProductSelected(value);
    await getData("getProductSerialMaster", value);
    if (txtlotNo == "") {
      sethfMode("LOT");
      SetFocus("txtlotNoFinCopy");
      setProductSelected(ddlProduct[0].prd_name);
    }else{
      setLblError("");
      setLblErrorState(false);
      let result = await getData("GetConnectShtMasterCheckResult", value);
      if (result == "OK") {
        await getCountDataBylot(txtlotNo);
        getIntitiaSheet();
        if (hfCheckRollSht == "Y") {
          setPnlRollLeafState(true);
          setTxtRollLeaf("");
          SetFocus("txtRollLeafFinCopy");
        }else{
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
        productSelected(ddlProduct[0].prd_name);
        
        setGvSerial([]);
        setLblError(`${value} not test master! / ${value} ยังไม่ทดสอบมาสเตอร์`)
        setLblErrorState(true);
        sethfMode("LOT");
        SetFocus('txtlotNoFinCopy')
      }
    }
  };
  const handle_Save_Click = async () => {
    const UpdateData = await UpdateGvSerial(txtSerial);

    setSerialData(UpdateData);
  };

  const handle_Cancel_Click = async () => {
    setGvScanResult([]);
    setLblResultState(false);
    setMode("SERIAL");
    setTxtbackSide(gvBackSide.map(() => ""));
    SetFocus("txtbackSide_0");
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
      setTimeout(() => {
        document.getElementById("txtbackSide_0").focus();        
      }, 200);
    }else{
      setLblError("Please scan QR Code! / กรุณาสแกนที่คิวอาร์โค้ด");
      setLblErrorState(true);
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
    setLblErrorState(false);
    showLoading('กำลังบันทึก กรุณารอสักครู่')
    await getData("getProductSerialMaster", productSelected);
    let dtSerial = await getInputSerial();
    let _strPrdName = productSelected;
    let _strLotData = txtlotNo.split(";")
    let _strLotRefData = txtLotRef.split(";")
    let _strLot = _strLotData[0];
    let _strLotRef = _strLotRefData[0];
    let _strShtNoBack = "";
    let _strShtNoFront = "";
    let _strTray = " ";0
    let _intSeq = 1;
    let _strScanResultAll = "OK";
    let _strErrorAll = "";
    let _strUpdateError = "";
    let _bolError = false;
    hfWeekCode = "";
    setLblErrorState(false);
    console.log(dtSerial,'dtSerial')
    const allSerialEmpty = dtSerial.every(item => item.SERIAL === "");
    if (allSerialEmpty) {
      hideLoading();
      setLblError("Please Input Serial No.");
      setLblErrorState(true);
      SetFocus("txtSerial_1");
      setLblResultState(false);
      setGvScanResult([]);
      return;        
    }
    if (txtlotNo != '' && dtSerial != ''){
      if (hfCheckWeekCode == 'Y'){
        hfWeekCode = await getData("GetWeekCodebyLot",{txtlotNo,hfDateInProc});
      }
      let _intRowSerial = 0;
      for (let i =0;i<dtSerial.length;i++){
        _strShtNoBack = dtSerial[i].BACK_SIDE;
        _strShtNoFront = dtSerial[i].FRONT_SIDE;
        if(dtSerial[i].SERIAL == ''){
          break;
        }
        if (hfSheetType == 'D' && _strShtNoBack ==_strShtNoFront){
          _strScanResultAll = "NG"
          _strErrorAll = "Double Product sheet F,B not same"
          _bolError = true;
        }
        if(hfCheckPrdSht == 'Y' && parseInt(dtSerial[i].SEQ) == 1 && !_bolError){
          if (hfCheckPrdAbbr !== _strShtNoBack.substring(parseInt(hfCheckPrdShtStart) -1 , parseInt(hfCheckPrdShtEnd))){
            _strScanResultAll = "NG"
            _strErrorAll = "Sheet product mix"
            _bolError = true
          }
          if (hfCheckPrdAbbr !== _strShtNoFront.substring(parseInt(hfCheckPrdShtStart) -1 , parseInt(hfCheckPrdShtEnd))){
            _strScanResultAll = "NG"
            _strErrorAll = "Sheet product mix"
            _bolError = true
          }
        }
        if(hfCheckLotSht == 'Y' && parseInt(dtSerial[i].SEQ) == 1 && !_bolError){
         if(_strLotRef !== _strShtNoBack.substring(parseInt(hfCheckLotShtStart) -1 , parseInt(hfCheckLotShtEnd))){
          _strScanResultAll = "NG"
          _strErrorAll = "Sheet lot mix"
          _bolError = true
         }
         if (_strLotRef !== _strShtNoFront.substring(parseInt(hfCheckLotShtStart) -1 , parseInt(hfCheckLotShtEnd))) {
          _strScanResultAll = "NG";
          _strErrorAll = "Sheet lot mix";
          _bolError = true;
        }
        
        }
        // Check sheet plasma time control
        if (hfShtPlasmaTimeFlg == 'Y' && parseInt(dtSerial[i].SEQ) == 1 && !_bolError){          
          _strErrorAll = await getData("GetConnectShtPlasmaTime",{ShtnoF:_strShtNoFront,ShtnoB:_strShtNoBack,lot:_strLot,shfShtPlasmaTime:parseFloat(hfShtPlasmaTime),plantCode:plantCode})
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
        console.log(_strScanResultAll,'_strScanResultAll ',_strErrorAll)
        if(dtSerial[i].SERIAL != ""){
          let _strSerial = dtSerial[i].SERIAL;
          let _strTestResult = "None";
          let _strMessageUpdate = "";
          let _strScanResultUpdate = "";
          if (!CONNECT_SERIAL_ERROR.includes(_strSerial)) {

            let isDuplicate = dtSerial.some((item, index) => index !== i && _strSerial.toUpperCase() === item.SERIAL.toString().trim().toUpperCase());
            if (isDuplicate) {
              _strScanResultUpdate = "NG";
              _strMessageUpdate = "Serial duplicate / หมายเลขบาร์โค้ดซ้ำ";
              _strScanResultAll = "NG";
              _bolError = true;
            }
            if(_strSerial.length == parseInt(hfSerialLength)){
              let _strFixDigit = '';
              _strFixDigit = _strSerial.substring(parseInt(hfSerialStartDigit) -1 , parseInt(hfSerialEndDigit));

              if(_strFixDigit != hfSerialDigit){
                _strScanResultUpdate = "NG"
                _strMessageUpdate = "Serial barcode mix product" + _strTagNewLine + "หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น"
                _strScanResultAll = "NG"
                _bolError = true
              }else if(hfConfigCheck =='Y'){
                let _strConfigDigit = ''
                _strConfigDigit = _strSerial.substring(parseInt(hfConfigStart) -1 , parseInt(hfConfigEnd))
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
                  _strStartSeq = _strSerial.substring(parseInt(hfCheckStartSeqStart) -1 , parseInt(hfCheckStartSeqEnd))
                  if(_strStartSeq != hfCheckStartSeqCode){
                    _strScanResultUpdate = "NG"
                    _strMessageUpdate = "Serial barcode mix product" + _strTagNewLine + "หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น"
                    _strScanResultAll = "NG"
                    _bolError = true
                  }
              }
              if(hfCheckWeekCode == 'Y' && _strScanResultUpdate !== 'NG'){
                let _strWeekCode = ''
                _strWeekCode = _strSerial.substring(parseInt(hfCheckWeekCodeStart) -1 , parseInt(hfCheckWeekCodeEnd))
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
              let [_inCountSeq, _strSerialNoDup] = await getData("GetSerialDuplicateConnectSht",{strLssSerialNo:dtSerial[i].SERIAL}) 
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
      } //end for
      // Shipping2D serial special check condition lot, panel and strip 
      if (hfWeekCodeType =='S' && _bolError == false){
        let _strReturn = ''
        _strReturn = await getData("GetShippingSerialNo",{strLot:_strLotRef,serial:dtSerial[i].SERIAL,seq:dtSerial[i].SEQ,weekType:hfWeekCodeType})
        if(_strReturn !== ''){
          _strScanResultAll = "NG"
          _bolError = true
          if (_strReturn !== 'NG'){
            setLblError(_strReturn)
            setLblErrorState(true)
          }
        }
      }
      for(let x =0 ;x<dtSerial.length;x++){
        if (hfCheckSheetELT == "Y" && _bolError == false) {
          let _strReturn = "";
          _strReturn = await getData("SetSerialLotShtELTTable", {
            
            strSheetNo: dtSerial[x].SHEET,
            strprdName: productSelected,
            strPlantCode: plantCode,
            strSideF: dtSerial[x].FRONT_SIDE,
            strSideB: dtSerial[x].BACK_SIDE,
            strPcsno: dtSerial[x].SEQ,
            strSerial: dtSerial[x].SERIAL,
            strIntSerialLength: hfSerialLength
          });
          if (_strReturn != "") {
            dtSerial[x].SCAN_RESULT = "NG";
            dtSerial[x].REMARK =" No sheet ELT result " + _strTagNewLine + "ไม่พบผลการทดสอบ ELT"
            _strScanResultAll = "NG";
            _bolError = true;
          }
          if (_strReturn != "NG") {
            setLblErrorState(false);
            setLblError(_strReturn);
          }
        }
      }
      if(!_bolError){
        for(let y=0;y<dtSerial.length;y++){
          if(dtSerial[y].SERIAL !== ''){
            let _intCount = 0;
            let _intCountOK = 0;
            let _intCountNG = 0;
            let _strRemark = "";
            let _strError = "";
            let _strSerial = dtSerial[y].SERIAL;
            let _dtSerialAll = [];
            let _bolScanDouble = false;
            let _bolScanDuplicate = false;
            let _strPrdNameOrg = "";
            let _strNG = "NG";
            let _strScanResultUpdate = "OK";
            let _strMessageUpdate = "";
            let _strRejectUpdate = "";
            let _Message = "";

            _bolError  =  false;
            let _strTestResult = 'NONE'
            if(CONNECT_SERIAL_ERROR.includes(_strSerial)){
              _strMessageUpdate = "Bad mark piece" + _strTagNewLine + "ชิ้นงานเสียทำเครื่องหมายไว้แล้ว"
              _strScanResultUpdate = "OK"
            }
            // ' ***** Miya ADD 2016/02/25 START N1 Request from Mr. Sunaga ***** 
            // ' ***** N1 Original. If transfer A1, Need change program     *****

            if (AUTO_SCAN_CHECK_FLG == '1' && _strScanResultUpdate !== 'NG' && !CONNECT_SERIAL_ERROR.includes(_strSerial)){
              let _Result =''
              let _FrontSheetBarcode = ''
              let _RearSheetBarcode =''
              if (hfBarcodeSide == 'F'){
                _FrontSheetBarcode = dtSerial[y].FRONT_SIDE
                _RearSheetBarcode = dtSerial[y].BACK_SIDE
              }else{
                _FrontSheetBarcode = dtSerial[y].BACK_SIDE
                _RearSheetBarcode = dtSerial[y].FRONT_SIDE
              }
              _Result = await getData("Get_SPI_AOI_RESULT", {
                strPlantCode: plantCode,
                strFrontSide: _FrontSheetBarcode,
                strBackSide: _RearSheetBarcode,
                strPrdname: productSelected,
                strMassage: _Message,
                strPcs: _intSeq,
              });
              if (_Result =='NG'){
                _strScanResultUpdate = _Result
              }
              _strMessageUpdate = _Message 
            }
            if (_strError !== ''){
              _strMessageUpdate = _strError
              _strScanResultUpdate = "NG"     
              _bolError = true
            }
            dtSerial[y].SCAN_RESULT = _strScanResultUpdate
            dtSerial[y].REMARK = _strMessageUpdate
            if(_strScanResultUpdate == 'NG'){
              _strScanResultAll = "NG"
            }
          }
          _intSeq += + 1
        }

        // ' '' Manual connect roll and sheet leaf  08/04/2019
        if(!_bolError && hfCheckRollSht == 'Y'){
          if(txtRollLeaf.length == hfConnRollLength){
            let resultRBMP = ""; 
            resultRBMP = await getData("GetRollLeafScrapRBMP", txtRollLeaf);
            if (resultRBMP == 'Y'){
              _bolError = true
              _strScanResultAll = "NG"
              _strUpdateError = "Problem sheet from RBMP"
              _strErrorAll = "Problem sheet from RBMP"
            }else{
              let dtRowLeaf = await getConnectRollSheetData(dtSerial,productSelected,txtRollLeaf);
              let _intCount = 0;
              let _strRollLeaf = txtRollLeaf;
              _intCount = await getData("GetRollLeafDuplicate", {strRollLeaf: txtRollLeaf,dtRowLeaf: dtRowLeaf,});
              if (_intCount ='1'){
                _bolError = true
                _strScanResultAll = "NG" 
                for(let drRow = 0;drRow<dtRowLeaf.length;drRow++){
                  dtRowLeaf[drRow].UPDATE_FLG = "N"
                  dtRowLeaf[drRow].ROW_UPDATE = "N"
                  dtRowLeaf[drRow].SCAN_RESULT = "NG"
                  dtRowLeaf[drRow].REMARK = "Roll/Sheet barcode duplicate" + _strTagNewLine + "หมายเลขบาร์โค้ดซ้ำ"
                  _intCount += 1
                }
                _strUpdateError = "Roll/Sheet barcode duplicate"
                _strErrorAll = "Roll/Sheet barcode duplicate"
              }
              if(hfCheckRollPrdFlg == 'Y' && !_bolError ){
                let strRollProduct = hfRollNo + hfCheckRollPrd;
                if ((strRollProduct !== _strRollLeaf.substring(parseInt(hfCheckRollPrdStart)-1 , parseInt(hfCheckRollPrdEnd) ))){
                  _bolError = true
                  _strScanResultAll = "NG"
                  for(let drRow = 0;drRow<dtRowLeaf.length;drRow++){
                    dtRowLeaf[drRow].UPDATE_FLG = "N"
                    dtRowLeaf[drRow].ROW_UPDATE = "N"
                    dtRowLeaf[drRow].SCAN_RESULT = "NG"
                    dtRowLeaf[drRow].REMARK = "Roll/Sheet barcode duplicate" + _strTagNewLine + "หมายเลขบาร์โค้ดซ้ำ"
                    _intCount += 1
                  }
                  _strUpdateError = "Roll/Sheet not matching product"
                  _strErrorAll = "Roll/Sheet not matching product"
                }

              }
              if(!_bolError && dtRowLeaf !== ''){
                for(let drRow = 0;drRow<dtRowLeaf.length;drRow++){
                  dtRowLeaf[drRow].UPDATE_FLG = "N"
                  dtRowLeaf[drRow].ROW_UPDATE = "Y"
                  dtRowLeaf[drRow].SCAN_RESULT = "OK"
                  dtRowLeaf[drRow].REMARK = ""
                  _intCount += 1
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
          }else{
            _strScanResultAll = "NG"
            _strUpdateError = "Roll leaf no. incorrect."
            _strErrorAll = "Roll leaf no. incorrect."
          }
        }
      
        if(!_bolError && _strUpdateError ==''){
          // 'Sucha modify 31-Aug-2016 update slowly
          
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
                PRODUCT: productSelected,
                USER_ID: hfUserID,
                REMARK: dtSerial[drRow].REMARK,
                LOT: _strLot,
                strProgram : 'ScanSMTSerialShtCopy'
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
                strProgram: "FIN Duplicate Sht&Pcs",
              });
              if (_strUpdateError != "") {
                _strScanResultAll = "NG";
              }
            }
          }
          
          hideLoading();
          scrollToTop();
        }
      }
      setLblResultState(true);
      setHideImg(false);
      setLblError(_strErrorAll);
      if (_strScanResultAll == "NG") {
        // setLblErrorState(true);
        setlblResult({
                text: _strScanResultAll,
                styled: { backgroundColor: "red", color: "white" },
              })
      } else if (_strErrorAll != "") {
        setLblErrorState(true);
        setlblResult({
          text: _strScanResultAll + _strErrorAll,
          styled: { backgroundColor: "red", color: "white" },
        });
      } else {
        setLblErrorState(false);
        setlblResult({
          text: _strScanResultAll,
          styled: { backgroundColor: "green", color: "white" },
        });
      }
     
      setGvScanResult(dtSerial);
      console.log(dtSerial,'dtSerialLast')
      setTxtSerial(gvSerial.map(() => ""));
      getIntitiaSheet();
      getInitialSerial();
    }else {
      setLblErrorState(true);
      setLblError("Please input Sheet Side No. !!!");
      setMode("SERIAL_ERROR");
    }
    getCountDataBylot(txtlotNo.split(";")[0]);
    alert(txtlotNo.split(";")[0]);
    setTxtRollLeaf("");
    setTxtbackSide(gvBackSide.map(() => ""));
    setTxtMachineNo("");
    setTxtButtonFix("");
    setTxtTopFix("");
    if (hfCheckRollSht == "Y") {
      setPnlRollLeafState(true);
      SetFocus('txtRollLeafFinCopy')
    } else if (hfReqMachine == "Y") {
      setPnlMachineState(true);
      SetFocus('txtMachineNoFinCopy')
    } else {
      SetFocus('txtbackSide_0')
    }
    hideLoading();
    scrollToTop();
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
          setLblError(error.message);
        });
      return dtData;
    } else if (type == "GetConnectShtMasterCheckResult") {
      let result = "";
      await axios
        .post("/api/ScanFin/GetConnectShtMasterCheckResult", {
          strPrdname: params,
        })
        .then((res) => {
          result = res.data.prd_name;
        })
        .catch((error) => {
          result = error.message;
        });
      return result;
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
          setLblError(error.message);
        });
      return drSerialCount;
    } else if (type == "getProductSerialMaster") {
      await axios
        .post("/api/common/GetSerialProductByProduct", { prdName: params })
        .then((res) => {
          setSerialMaster(res.data);
        })
        .catch((error) => {
          setLblError(error.message);
        });
    } else if (type == "GetWeekCodebyLot") {
      let result = "";
      await axios
        // .post("/api/ScanFin/GetWeekCodebyLot", {
        //   strLot: params.txtlotNo,
        //   strProc: params.hfDateInProc,
        // })
        .post('/api/common/GetWeekCodebyLot', {
          _strLot: params.txtlotNo,
          _strProc:  params.hfDateInProc,
          _strWeekType: hfWeekCodeType,
          _strSerialInfo: hfSerialInfo,
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
          strSheetnoF: params.ShtnoF,
          strSheetnoB: params.ShtnoB,
          lot_no: params.lot,
          dblPlasmaTime: params.hfShtPlasmaTime,
        })
        .then((res) => {
          result = res.data.error;
        })
        .catch((error) => {
          setLblError(error.message);
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
          setLblError(error.message);
        });
      return result;
    } else if (type == "GetSerialDuplicateConnectSht") {
      let result1 = 0;
      let result2 ='';
      await axios 
        .post("/api/ScanFin/GetSerialDuplicateConnectSht", {
          dataList: {
            strLssSerialNo: params.strLssSerialNo,
            strPlantCode: plantCode,
          },
        })
        .then((res) => {
          result1 = res.data.intRow;
          result2= res.data.strSerialNoDup;
        })
        .catch((error) => {
          setLblError(error.message);
        });
      return [result1,result2];
    } else if (type == "SetSerialLotShtELTTable") {
      let result = "";
      await axios
        .post("/api/Common/SetSerialLotShtELTTable", {
          dataList: {
            strSheetNo: params.strSheetNo,
            strprdName: params.strprdName,
            strPlantCode: params.strPlantCode,
            strSideF: params.strSideF,
            strSideB: params.strSideB,
            strPcsno: params.strPcsno,
            strSerial: params.strSerial,
            strIntSerialLength: params.strIntSerialLength,
          },
        })
        .then((res) => {
          result = res.data.p_error;
        })
        .catch((error) => {
          setLblError(error.message);
        });
      return result;
    } else if (type == "Get_SPI_AOI_RESULT") {
      let result;
      await axios
        .post("/api/Common/Get_Spi_aoi_result", {
          dataList: {
            _strPlantCode: params.strPlantCode,
            _pcsPosition: params.strPcs,
            _frontSheetNumber: params.strFrontSide,
            _rearSheetNumber: params.strBackSide,
            _strProduct: params.strPrdname,
            _Message: params.strMassage,
          },
        })
        .then((res) => {
          result = res.data;
        })
        .catch((error) => {
          setLblError(error.message);
        });
      return result;
    } else if (type == "GetRollLeafScrapRBMP") {
      let result = "";
      await axios
        .post("/api/ScanFin/GetRollLeafScrapRBMP", {
          strRollNo: params,
        })
        .then((res) => {
          result = res.data.SCRAP_FLG;
        })
        .catch((error) => {
          setLblError(error.message);
        });
      return result;
    } else if (type == "GetRollLeafDuplicate") {
      let result;
      await axios
        .post("/api/ScanFin/GetRollLeafDuplicate", {
          strRollLeaf: params.strRollLeaf,
          _dtRowLeaf: params.dtRowLeaf,
        })
        .then((res) => {
          result = res.data.intCount;
        })
        .catch((error) => {
          setLblError(error.message);
        });
        return result;  
    } else if (type == "SetRollLeafTrayTable") {
      let result = "";
      await axios
        .post("/api/Common/SetRollLeafTrayTable", {
          dataList: {
            strOperator: params.strOperator,
            strUserID: "",
            strPlantCode: params.strPlantCode,
            strStation: params.strStation,
            strRowUpdate: params.strRowUpdate,
            strUpdateFlg: params.strUpdateFlg,
            strRollNo: params.strRollNo,
            strLotNo: params.strLotNo,
            strRollLeaf: params.strRollLeaf,
            strSheetNo: params.strSheetNo,
            strShtSeq: params.strShtSeq,
            strIntRow: params.strIntRow,
            strProduct: params.strProduct,
            strMachine: params.strMachine,
            strProgram : 'ScanSMTSerialShtCopy'
          },
        })
        .then((res) => {
          result = res.data.p_error;
        })
        .catch((error) => {
          setLblError(error.message);
        });
      return result;
    } else if (type == "SetSerialLotShtTable"){
      let result = '';
      await axios.post("/api/Common/SetSerialLotShtTable",{
        SERIAL: params.SERIAL,
        FRONT_SIDE: params.FRONT_SIDE,
        BACK_SIDE: params.BACK_SIDE,
        MACHINE: params.MACHINE,
        MASTER_NO: params.MASTER_NO,
        intSerialLength: params.intSerialLength,
        UPDATE_FLG: params.UPDATE_FLG,
        BarcodeSide: hfBarcodeSide,
        SEQ: params.SEQ,
        PRODUCT: params.PRODUCT,
        USER_ID: params.USER_ID,
        REMARK: params.REMARK,
        LOT: params.LOT,
        strProgram : params.strProgram
      }).then((res) => {
        result = res.data.p_error;
      }).catch((error) => {
        setLblError(error.message);
      })
      return result;
    } else if (type == 'GetShippingSerialNo'){
      let result = '';
      await axios.post("/api/Common/GetShippingSerialNo",
        {strLotNo: params.strLot,
          dtSerial:[{
          SERIAL: params.serial,
          SEQ: params.seq
      }],
      strWeekType: params.weekType
    }
      ).then((res) => {
        result = res.data
      }).catch((error) => {
      })
     return result 
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
        hfPlasmaConnShtPcs = res.prm_conn_shtpcs_plasma_flg;
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
          hfBarcodeSide === "F" ? `Back Side ${i} : ` : `Front Side ${i} : `,
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
    newValues[index] = event.target.value.trim();
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
  async function getConnectRollSheetData(_dtSerial, _strProduct, _strRollLeaf) {
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
    newValues[index] = event.target.value.trim().toUpperCase();
    setTxtSerial(newValues);
    if (event.key === "Enter") {
      try {
        SetFocus(`txtSerial_${index + 1}`);
      } catch (error) {
        handle_Save_Click();
        event.target.blur();
      }
    }
  };

  async function getInputSerial() {
    await getData("getProductSerialMaster", productSelected);
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
        let dtRow = {
          SHEET: gvSerial[i].SHEET,
          BACK_SIDE: txtbackSide[gvSerial[i].SHEET -1] || '',
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
            BOARD_NO_F: txtTopFix,
            BOARD_NO_B: txtButtonFix,
          };
          dtData.push(updatedt);
        } else {
          dtData.push(dtRow);
        }
      }
    }
    return dtData;
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
        <div style={{ textAlign: 'left' }}>
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
      // const backgroundColor =
      //   record.SCAN_RESULT === "NG" ? "#f50" : 
      //   record.SCAN_RESULT === "OK" ? "#87d068" : 
      //   "transparent";
      
      return text;
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
const getRowClassName = (record) => {
  if (record.SCAN_RESULT === "NG") {
    return 'row-red';
  } else if (record.SCAN_RESULT === "OK") {
    return 'row-green';
  }
  return '';
};
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
    lblResult,
    gvScanResult,
    columns,
    getRowClassName
  };
}

export { fn_ScanSMTSerialShtCopy };
