import axios from "axios";
import { set } from "lodash";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

function fn_ScanSMTSerialPcsNG() {
  var _strEventArgument = "";
  var hfMode = "";
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
  var hfPlasmaCheck = "";
  var hfPlasmaTime = "";
  var hfPlasmaHideTime = "";
  var hfCheckSPIAOI = "";
  var hfChipIDCheck = "";
  var hfCheckEFPCAOM = "";
  var hfCheckEFPCAOI = "";
  var hfCheckEFPCOST = "";
  var hfCheckEFPCAVI = "";
  //inpage
  var hfLotAll = "";
  //hiding Variable
  const DUPLICATE_CHECK_FLG = "0";
  const FINAL_GATE_SPECIAL_FLG = "1";
  const FINAL_GATE_SPECIAL_PRD = "RGPZ-098ML-6A,RGPZ-098ML-7A";
  const FINAL_GATE_SPECIAL_SERIAL_VAR = ":P_SERIAL_NO";
  const FINAL_GATE_SPECIAL_MESSAGE = "Csig value less then 3000";
  const FINAL_GATE_SPECIAL_OK = "OK";
  const FINAL_GATE_MASTER_CODE = import.meta.env.VITE_FINAL_GATE_MASTER_CODE;
  const Fac = import.meta.env.VITE_FAC;

  //lable
  const [lblError, setLblError] = useState("");
  const [lblLot, setLblLot] = useState("");
  const [lblLotTotal, setLblLotTotal] = useState("");
  const [lblSerialNG, setLblSerialNG] = useState(0);
  // hiddenField
  const [ip, setIp] = useState("");
  const [userStation, setUserStation] = useState("");

  //txtField
  const [txtLot, setTxtLot] = useState("");
  const [txtMasterCode, setTxtMasterCode] = useState("");
  const [ddlproduct, setDdlproduct] = useState("");
  const [productSelected, setProductSelected] = useState("");
  const [lblResult, setLblResult] = useState({
    value: "",
    styled: {
      color: "",
    },
  });
  //state
  const [panalSerialState, setPanalSerialState] = useState(true);
  const [hideImg, setHideImg] = useState(true);
  const [lblResultState, setLblResultState] = useState(false);
  //table Data
  const [gvSerialResult, setGvSerialResult] = useState([]);
  const [gvSerial, setGvSerial] = useState([]);
  const [txtSerial, setTxtSerial] = useState(gvSerial.map(() => ""));

  useEffect(() => {
    Pageload();
    setMode("LOT");
  }, []);
  async function Pageload() {
    await getData("getProductData", null);
    setIp(localStorage.getItem("ipAddress"));
    setUserStation(localStorage.getItem("ipAddress"));
    getData("getProductSerialMaster", productSelected);
  }
  const txtLot_Change = async () => {
    setLblError("");
    let strLotAll;
    let strLot;
    let strPrdName;
    let dtLotData;
    strLotAll = txtLot.split(";");
    if (txtLot != "") {
      if (strLotAll.length >= 2) {
        strLot = strLotAll[0];
        strPrdName = productSelected;
        hfTestResultFlag = "Y";

        if (strLot.length == 9) {
          strPrdName = await getData("GetProductNameByLot", strLot);
          let dtLotPassCount = await getData("GetSerialPassByLot", strLot);
          if (dtLotPassCount != "") {
            setLblLotTotal(dtLotPassCount);
          }
          let dtLotProduct = await getData("GetProductDataByLot", strLot);
          if (dtLotProduct.length > 0) {
            if (dtLotProduct[2] == "Y") {
              hfTestResultFlag = "N";
            }
            hfLotAll = dtLotProduct[3];
          }
          setLblLot(strLot);
          if (ddlproduct.some((x) => x.prd_name == strPrdName)) {
            setProductSelected(strPrdName);
            await getData("getProductSerialMaster", strPrdName);
            setMode("SERIAL");
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Product " + strPrdName + " not found",
            });
            setLblError("Product " + strPrdName + " not found");
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "invalid lot no.! / " + strLot + " หมายเลขล็อตไม่ถูกต้อง",
          });
          setLblError(
            "invalid lot no.! / " + strLot + " หมายเลขล็อตไม่ถูกต้อง"
          );
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: " Please scan QR Code! / กรุณาสแกนที่คิวอาร์โค้ด",
        });
        setLblError(" Please scan QR Code! / กรุณาสแกนที่คิวอาร์โค้ด");
      }
    } else {
      setLblLot("");
      SetFocus("txtLot");
    }
  };
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
    hfPlasmaCheck = "N";
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
    hfPlasmaTime = "0";
    hfPlasmaHideTime = "N";
    hfPlasmaHideTime = "N";
    hfChipIDCheck = "N";
    hfCheckEFPCAOM = "N";
    hfCheckEFPCAOI = "N";
    hfCheckEFPCOST = "N";
    hfCheckEFPCAVI = "N";
    if (item != "") {
      console.log("item is not empty");
      item.map((res) => {
        hfSerialLength = res.slm_serial_length || "0";
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
        // hfPlasmaCheck = res.prm_plasma_time_flg;
        hfPlasmaCheck = 'Y';
        hfPlasmaTime = res.prm_plasma_time;
        hfPlasmaHideTime = res.prm_plasma_time_hide_time;
        hfPlasmaHideTime = res.rpm_final_aoi_spi_flg;
        hfChipIDCheck = res.prm_check_chip_id_flg;
        hfCheckEFPCAOM = res.prm_check_efpc_aom_flg;
        hfCheckEFPCAOI = res.prm_check_efpc_aoi_flg;
        hfCheckEFPCOST = res.prm_check_efpc_ost_flg;
        hfCheckEFPCAVI = res.prm_check_efpc_avi_flg;
        hfCheckSPIAOI = res.prm_final_aoi_spi_flg;
      });
    }
  }
  async function getData(type, params) {
    if (type == "getProductData") {
      await axios.get("/api/common/GetProductData").then((res) => {
        setProductSelected(res.data[0].prd_name);
        setDdlproduct(res.data);
      });
    } else if (type == "getProductSerialMaster") {
      let dtdata = [];
      await axios
        .post("/api/common/GetSerialProductByProduct", { prdName: params })
        .then((res) => {
          setSerialMaster(res.data);
        });
    } else if (type == "GetProductDataByLot") {
      let dtdata = [];
      await axios
        .post("/api/common/getProductDataByLot", {
          strLot: params,
        })
        .then((res) => {
          dtdata.push(res.data[0][0][0]);
        });
      return dtdata;
    } else if (type == "GetProductNameByLot") {
      let prdName = "";
      await axios
        .post("/api/common/getProductNameByLot", { strLot: params })
        .then((res) => {
          prdName = res.data.prdName[0];
        });
      return prdName;
    } else if (type == "GetSerialPassByLot") {
      let dtData = "";
      await axios
        .post("/api/common/getSerialPassByLot", {
          strLotNo: params,
          strPlantCode: Fac,
        })
        .then((res) => {
          dtData = res.data.lotcount;
        });
      return dtData;
    } else if (type == "GetSheetNoBySerialNo") {
      let response = "";
      await axios
        .post("/api/common/GetSheetNoBySerialNo", {
          strSerialno: params,
          strPlantCode: Fac,
        })
        .then((res) => {
          response = res.data.sheet_no;
        });
      return response;
    } else if (type == "GetSheetDataBySerialNo") {
      let response = [];
      await axios
        .post("/api/common/GetSheetDataBySerialNo", {
          strSerialno: params,
          strPlantCode: Fac,
        })
        .then((res) => {
          response = res.data;
        });
      return response;
    } else if (type == "GetSerialManyTable") {
      let response = [];
      await axios
        .post("/api/Common/GetSerialTestResultManyTable", {
          dataList: [
            {
              strPlantCode: Fac,
              strPrdname: params._strPrdName,
              strWeekCodeType: hfWeekCodeType,
              strSerial: params.dtSerial.SERIAL,
            },
          ],
          dtSerial: params.dtSerial,
        })
        .then((res) => {
          response = res.data;
        })
        .catch((error) => {
          Swal.fire("Please Try Again", error.message, "error");
        });
      return response;
    } else if (type == "GetWeekCodebyLot") {
      let response = "";
      await axios
        .post("/api/common/GetWeekCodebyLot", {
          _strLot: params.strLot,
          _strProc: hfDateInProc,
          _strWeekType: hfWeekCodeType,
          _strSerialInfo: hfSerialInfo,
        })
        .then((res) => {
          response = res.data.weekCode;
        });
      return response;
    } else if (type == "GetPlasmaTimeBySerialNo") {
      let response = 0;
      await axios
        .post("/api/Common/GetPlasmaTimeBySerialNo", {
          dataList : {  strSerial: params.strSerial,
          strPlantCode: Fac,
          strPacking : params.strPacking,
          strMasterCode : params.strMasterCode,
          strPrdname:params.strPrdname}
        })
        .then((res) => {
          response = res.data.plasma_time;
        });
        return response;
    } else if (type == "Get_Spi_aoi_result"){
      let result = "";
      await axios.post('/api/Common/Get_Spi_aoi_result',{
        dataList: {
          _strPlantCode: Fac,
          _pcsPosition: params.intShtSeq,
          _frontSheetNumber: params.FrontSheetBarcode,
          _rearSheetNumber: params.RearSheetBarcode,
          _strProduct: params.RearSheetBarcode,
          _Message:  params.Message,         
        },
      }).then((res) => {
        result = res.data;
      })
      return result;
    } else if (type =="GetCheckChipDuplicate"){
      let result = "";
      await axios.post('/api/Common/GetCheckChipDuplicate',{
        dataList: {
          _strPlantCode: Fac,
          _strSerial: params.strSerial,
          _strPrdName: params.strPrdName,
        },
      }).then((res) => {
        result = res.data;
      })
      return result;
    } else if (type == "GetSerialFinInspectResult"){
      let  result ='';
      await axios.post('/api/Common/GetSerialFinInspectResult',{
        dataList: {
          _strPlantCode: Fac,
          _strSerialNo: params.strSerialNo,
          _strProc: params.strProc,
        },
      }).then((res) => {
        result = res.data;
      })
      return result;
    } else if (type == "GetCheckSpecialBySerial"){
      let result = "";
      await axios("/api/Common/getcheckspecialbyserial",{strSerialno:params.strSerialno,strPlantCode:Fac}
      ).then((res) => {
        result = res.data;
      }
      ).catch((error) => {
        Swal.fire("Please Try Again", error.message, "error");
      })
      return result;
    } else if(type == "GetEFPCSheetInspectionResult"){ // Wrong
      let result = "";
      await axios.post('/api/Common/GetEFPCSheetInspectionResult',{
        _strPlantCode: params.strPlantCode,
        _strProduct: params.strProduct,
        _strFrontSheetNo: params.strFrontSheetNo,
        _strBackSheetNo: params.strBackSheetNo,
        _intPcsNo: parseInt(params.strSheetPcsNo),
        _strAOMFlg: params.strHfCheckEFPCAOM,
        _strAOIFlg: params.strHfCheckEFPCAOI,
        _strOSTFlg: params.strHfCheckEFPCOST,
        _strAVIFlg: params.strHfCheckEFPCAVI,
        _strResult: params.strEFPCResult,
      }).then((res) => {
        result = res.data;
        console.log(res.data);
      }).catch((error) => {
        Swal.fire("Please Try Again", error.message, "error");
      })
      return result;
    } else if (type == "SetSerialLotTrayTable"){
      let result = "";
      console.log(
        params.strPlantCode,
        params.strPrdName,
        params.strLot,
        params.strHfUserId,
        params.strSerial,
        params.strUpdateFlg,
        params.strRowUpdate,
        params.strRejectCode,
        params.strTestResult,
        params.strRemarkUpdate,
        params.strScanResult,
        "",
        ""
      );
      await axios.post('/api/Common/setseriallottraytable',{
        dataList: {
          strPlantCode: params.strPlantCode,
          strPrdName: params.strPrdName,
          strLot: params.strLot,
          strUserID: params.strHfUserId,
          data: [
              {
                  SERIAL: params.strSerial,
                  UPDATE_FLG:params.strUpdateFlg,
                  ROW_UPDATE: params.strRowUpdate,
                  REJECT_CODE: params.strRejectCode,
                  TEST_RESULT: params.strTestResult,
                  REMARK_UPDATE: params.strRemarkUpdate,
                  SCAN_RESULT: params.strScanResult,
                  PACKING_NO: "",
                  MASTER_NO: ""
              }
          ]
        }
      }).then((res) => {
        result = res.data.p_error;
      }).catch((error) => {
        Swal.fire("Please Try Again", error.message, "error");
      })
      return result;
      
    }
  }
  function SetFocus(txtField) {
    document.getElementById(`${txtField}`).focus();
  }
  function Setdisable(type, txtField) {
    if (type == "disable") {
      document.getElementById(`${txtField}`).disabled = true;
      document.getElementById(`${txtField}`).className = "styleDisable";
    } else {
      document.getElementById(`${txtField}`).disabled = false;
      document.getElementById(`${txtField}`).className = "styleEnable";
    }
  }
  function setMode(strType) {
    if (strType == "LOT") {
      setTxtLot("");
      Setdisable("", "txtLot");
      setLblLot("");
      setLblLotTotal("");
      setPanalSerialState(false);
      setLblSerialNG("");
      setLblResultState(false);
      SetFocus("txtLot");
    } else if (strType == "LOT_ERROR") {
      setTxtLot("");
      Setdisable("disable", "txtLot");
      setTxtMasterCode("");
      setLblLot("");
      setLblLotTotal("");
      setLblSerialNG("");
      setPanalSerialState(false);

      hfMode = "LOT";
      SetFocus("txtLot");
    } else if (strType == "TRAY") {
      setTxtLot("");
      Setdisable("disable", "txtLot");
      setLblSerialNG("");
      setPanalSerialState(true);
      getInitialSerial();

      hfMode = "TRAY";
      SetFocus("txtTray");
    } else if (strType == "TRAY_ERROR") {
      setTxtLot("");
      Setdisable("disable", "txtLot");
      setLblSerialNG("");
      setPanalSerialState(true);
      getInitialSerial();

      hfMode = "TRAY";
      SetFocus("txtTray");
    } else if (strType == "SERIAL") {
      setTxtMasterCode("");
      Setdisable("disable", "txtLot");
      setPanalSerialState(true);

      hfMode = "SERIAL";
      getInitialSerial();
      SetFocus("txtMasterCode");
    } else if (strType == "SERIAL_ERROR") {
      Setdisable("disable", "txtLot");
    } else if (strType == "SERIAL_OK") {
      Setdisable("disable", "txtLot");
      setPanalSerialState(true);
      getInitialSerial();
      // SetFocus("gvSerial");
    } else if (strType == "SERIAL_NG") {
      Setdisable("disable", "txtLot");
      setPanalSerialState(true);
    }
  }
  function getInitialSerial() {
    let dtData = [];
    for (let intRow = 1; intRow <= hfSerialCount; intRow++) {
      dtData.push({
        SEQ: intRow,
      });
    }
    setGvSerial(dtData);
    setPanalSerialState(true);
  }
  const handle_ibtBack = () => {
    setTxtMasterCode("");
    setLblError("");
    setTxtLot("");
    Setdisable("", "txtLot");
    setPanalSerialState(false);
    setMode("LOT");
    SetFocus("txtLot");
  };
  const handle_Cancel_Click = () => {
    setMode("SERIAL");
  };
  const handle_Save_Click = () => {
    // if (_strEventArgument != "SAVE" && hfMode == "SERIAL") {
    // }
    setSerialDataTray();
  };
  const ddlproduct_Change = () => {
    getData("getProductSerialMaster", productSelected);
    if (lblLot != "") {
      getData("getProductSerialMaster", productSelected);
    } else {
      setMode("LOT");
    }
  };
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
    let dtData = [];
    for (let i = 0; i < gvSerial.length; i++) {
      let masterNo = txtMasterCode;

      let row = {
        SEQ: i,
        SERIAL: txtSerial[i],
        REJECT: "",
        TOUCH_UP: "",
        REJECT2: "",
        REJECT_CODE: "",
        SCAN_RESULT: "",
        TEST_RESULT: "",
        TYPE_TEST_RESULT: "",
        REMARK: "",
        REMARK_UPDATE: "",
        ROW_COUNT: 0,
        ROW_UPDATE: "N",
        UPDATE_FLG: "N",
        PACKING_NO: "",
        MASTER_NO: masterNo,
        FRONT_SHEET_NO: "",
        BACK_SHEET_NO: "",
        SHEET_PCS_NO: 0,
        ROLL_LEAF_NO: "",
      };
      if (row.SERIAL == undefined || row.SERIAL == null) {
        row.SERIAL = "";
      }
      if (txtSerial[i] !== "") {
        for (let j = 0; j < dtData.length; j++) {
          if (row.SERIAL === dtData[j].SERIAL) {
            row.ROW_COUNT = 9;
            break;
          }
        }
      }
      dtData.push(row);
    }

    return dtData;
  }
  const txtmasterCode_Change = () => {
    if (txtMasterCode == FINAL_GATE_MASTER_CODE) {
      setLblError("");
      SetFocus("txtSerial_0");
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Scan master code incorrect / สแกน master code ไม่ถูกต้อง",
      });
      setLblError("Scan master code incorrect / สแกน master code ไม่ถูกต้อง");
      setTxtMasterCode("");
      SetFocus("txtMasterCode");
    }
  };
  async function setSerialDataTray() {
    await getData("getProductSerialMaster", productSelected);
    if (txtMasterCode == FINAL_GATE_MASTER_CODE) {
      let dtSerial = await getInputSerial();
      let _strLot = lblLot;
      let _strPrdName = productSelected;
      let _strTray = "";
      let _bolTrayError = false;
      let _bolError = false;
      let _strScanResultAll = "OK";
      let _intRowSerial = 0;

      if (!_bolTrayError) {
        if (hfCheckWeekCode == "Y") {
          hfWeekCode = await getData("GetWeekCodebyLot", { strLot: _strLot });
        }
        for (let x = 0; x < dtSerial.length; x++) {
          dtSerial[x] = await getData("GetSerialManyTable", {
            dtSerial: dtSerial[x],
            strPlantCode: Fac,
            strPrdname: _strPrdName,
            strWeekCodeType: "U",
            strSerial: dtSerial[x].SERIAL,
          });
        }
        for (let i = 0; i < dtSerial.length; i++) {
          dtSerial[i] = await getData("GetSerialManyTable", {
            dtSerial: dtSerial[i],
            strPlantCode: Fac,
            strPrdname: _strPrdName,
            strWeekCodeType: "U",
            strSerial: dtSerial[i].SERIAL,
          });
          if (dtSerial[i].SERIAL != "") {
            let _intCount = 0;
            let _intCountOK = 0;
            let _intCountNG = 0;
            let _intCountDup = 0;
            let _strRemark = "";
            let _strError = "";
            let _strSerial = dtSerial[i].SERIAL;
            let _dtSerialAll = [];
            let _bolScanDouble = false;
            let _bolScanDuplicate = false;
            let _strPrdNameOrg = "";
            let _strLotOrg = "";
            let _strTrayOrg = "";
            let _strTestResultOrg = "";
            let _strOK = "OK";
            let _strNG = "NG";
            let _strScanResultUpdate = "";
            let _strMessageUpdate = "";
            let _strTestResultUpdate = "";
            let _strTypeTestResult = "";
            let _strRejectUpdate = "";
            let _strReject1 = "";
            let _strReject2 = "";
            let _strTouchUp = "";
            let _strRejectGroup = "";

            _bolError = false;
            let _strTestResult = "NO";
            if (hfTestResultFlag == "") {
              _strTestResult = dtSerial[i].TEST_RESULT;
              _strTypeTestResult = dtSerial[i].TYPE_TEST_RESULT;
              _strReject1 = dtSerial[i].REJECT;
              _strRejectUpdate = dtSerial[i].REJECT_CODE;
              _strReject2 = dtSerial[i].REJECT2;
              _strTouchUp = dtSerial[i].TOUCH_UP;
              _strRejectGroup = dtSerial[i].REMARK;
            }
            //Check format serial no
   
            if (_strScanResultUpdate != "NG") {
              if (_strSerial.length == hfSerialLength) {

                let _strFixDigit = "";
                if (!getCheckSumSerial(_strSerial,hfWeekCodeType,parseInt(hfSerialEndDigit))
                ) {
                  _strMessageUpdate =
                    "Serial invalid check sum / หมายเลขบาร์โค้ดมีค่าตรวจสอบไม่ถูกค้อง";
                  _strRemark = "Serial invalid check sum";
                  _strScanResultUpdate = "NG";
                  _strTestResultUpdate = _strTestResult;
                  dtSerial[i].REMARK_UPDATE = _strRemark;
                  dtSerial[i].ROW_UPDATE = "Y";
                  _intCountNG = 1;
                  _bolError = true;
                }
                if (hfSerialFixFlag == "Y" && _strScanResultUpdate != "NG") {
                  _strFixDigit = _strSerial.substring(
                    parseInt(hfSerialStartDigit) - 1,
                    parseInt(hfSerialEndDigit)
                  );
                  if (_strFixDigit != hfSerialDigit) {
                    _strMessageUpdate =
                      "Serial barcode mix product / หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
                    _strRemark = "Serial barcode mix product";
                    _strScanResultUpdate = "NG";
                    _strTestResultUpdate = _strTestResult;
                    dtSerial[i].REMARK_UPDATE = _strRemark;
                    dtSerial[i].ROW_UPDATE = "Y";
                    _intCountNG = 1;
                    _bolError = true;
                  }
                  if (hfConfigCheck == "Y" && _strScanResultUpdate != "NG") {
                    let _strConfigDigit = "";
                    const strConfigDigit = _strSerial.substring(
                      parseInt(hfConfigStart) - 1,
                      parseInt(hfConfigEnd)
                    );
                    if (_strConfigDigit != hfConfigCode) {
                      _strMessageUpdate =
                        "Serial barcode mix product / หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
                      _strRemark = "Serial barcode mix product";
                      _strScanResultUpdate = "NG";
                      _strTestResultUpdate = _strTestResult;
                      dtSerial[i].REMARK_UPDATE = _strRemark;
                      dtSerial[i].ROW_UPDATE = "Y";
                      _intCountNG = 1;
                      _bolError = true;
                    }
                  }
                }
                if (hfSerialStartCode != "" && _strScanResultUpdate != "NG") {
                  if (
                    _strSerial.substring(0, strSerialStartCodeLength) !=
                    hfSerialStartCode
                  ) {
                    _strMessageUpdate =
                      "Serial barcode mix product / หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
                    _strRemark = "Serial barcode mix product";
                    _strScanResultUpdate = "NG";
                    _strTestResultUpdate = _strTestResult;
                    dtSerial[i].REMARK_UPDATE = _strRemark;
                    dtSerial[i].ROW_UPDATE = "Y";
                    _intCountNG = 1;
                    _bolError = true;
                  }
                }
                if (hfCheckStartSeq == "Y" && _strScanResultUpdate != "NG") {
                  let _strStartSeq = "";
                  const start = parseInt(hfCheckStartSeqStart) - 1;
                  const length =
                    parseInt(hfCheckStartSeqEnd) -
                    parseInt(hfCheckStartSeqStart) +
                    1;
                  _strStartSeq = _strSerial.substring(start, start + length);
                  if (_strStartSeq != hfCheckStartSeqCode) {
                    _strMessageUpdate =
                      "Serial barcode mix product / หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
                    _strRemark = "Serial barcode mix product";
                    _strScanResultUpdate = "NG";
                    _strTestResultUpdate = _strTestResult;
                    dtSerial[i].REMARK_UPDATE = _strRemark;
                    dtSerial[i].ROW_UPDATE = "Y";
                    _intCountNG = 1;
                    _bolError = true;
                  }
                }
                if (hfCheckWeekCode == "Y" && _strScanResultUpdate != "NG") {
                  let _strWeekCode = "";
                  const start = parseInt(hfCheckWeekCodeStart) - 1;
                  const length =
                    parseInt(hfCheckWeekCodeEnd) -
                    parseInt(hfCheckWeekCodeStart) +
                    1;
                  _strWeekCode = _strSerial.substring(start, start + length);
                  if (_strWeekCode != hfWeekCode) {
                    _strMessageUpdate =
                      "Serial barcode mix week code / หมายเลขบาร์โค้ดปนรหัสสัปดาห์กัน";
                    _strRemark = "Serial barcode mix week code";
                    _strScanResultUpdate = "NG";
                    _strTestResultUpdate = _strTestResult;
                    dtSerial[i].REMARK_UPDATE = _strRemark;
                    dtSerial[i].ROW_UPDATE = "Y";
                    _intCountNG = 1;
                    _bolError = true;
                  }
                }
                if (!_bolError) {
                  for (let intRow = _intRowSerial + 1;intRow < dtSerial.length;intRow++) {
                    if (_strSerial == dtSerial[intRow].SERIAL) {
                      _strMessageUpdate =
                        "Serial duplicate in tray / หมายเลขบาร์โค้ดซ้ำในถาดเดียวกัน";
                      _strRemark = "Serial duplicate in tray  ";
                      _strScanResultUpdate = "NG";
                      _strTestResultUpdate = _strTestResult;
                      dtSerial[intRow].REMARK_UPDATE = _strRemark;
                      dtSerial[intRow].ROW_UPDATE = "N";
                      _intCountNG = 1;
                      _bolError = true;
                    }
                  }
                }
                if (!_bolError && hfCheckPrdSht == "Y") {
                  let strSheetLot = "";
                  let _strShtNo = await getData(
                    "GetSheetNoBySerialNo",
                    _strSerial
                  );
                  const strShtNo = _strShtNo;
                  const start = parseInt(hfCheckPrdShtStart);
                  const end = parseInt(hfCheckPrdShtEnd);
                  const result = strShtNo.substring(start - 1, end);
                  if (_strShtNo != "" && hfCheckPrdAbbr != result) {
                    _strMessageUpdate =
                      "Change serial barcode mix product / เปลี่ยนหมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
                    _strRemark = "Change serial barcode mix product  ";
                    _strScanResultUpdate = "NG";
                    _strTestResultUpdate = _strTestResult;
                    dtSerial[i].REMARK_UPDATE = _strRemark;
                    dtSerial[i].ROW_UPDATE = "Y";
                    _intCountNG = 1;
                    _bolError = true;
                  } else if (_strShtNo == "") {
                    _strMessageUpdate =
                      "No data connect sheet / ไม่มีข้อมูลแสกนประกบกับหมายเลขชีส";
                    _strRemark = "No data connect sheet  ";
                    _strScanResultUpdate = "NG";
                    _strTestResultUpdate = _strTestResult;
                    dtSerial[i].REMARK_UPDATE = _strRemark;
                    dtSerial[i].ROW_UPDATE = "Y";
                    _intCountNG = 1;
                    _bolError = true;
                  } else if (
                    hfLotAll.toLowerCase().indexOf(strSheetLot.toLowerCase()) <=
                    0
                  ) {
                    _strMessageUpdate =
                      "Lot not same connect sheet / ล๊อตไม่ตรงตามที่แสกนประกบกับหมายเลขชีส";
                    _strRemark = "Lot not same connect sheet  ";
                    _strScanResultUpdate = "NG";
                    _strTestResultUpdate = _strTestResult;
                    dtSerial[i].REMARK_UPDATE = _strRemark;
                    dtSerial[i].ROW_UPDATE = "Y";
                    _intCountNG = 1;
                    _bolError = true;
                  }
                }
                if (!_bolError && hfPlasmaCheck == "Y" &&_strRejectGroup != "MASTER") {
                  let _dblPlasmatime = 0;
                  const responseDBL = await getData("GetPlasmaTimeBySerialNo", {strSerial:_strSerial,strPacking:txtMasterCode,strMasterCode:FINAL_GATE_MASTER_CODE,strPrdname:_strPrdName});
                  _dblPlasmatime = parseInt(responseDBL)
                  if (_dblPlasmatime == 0) {
                    _strMessageUpdate = "Skip Plasma / งานไม่ผ่านพลาสม่า";
                    _strRemark = "Skip plasma ";
                    _strScanResultUpdate = "NG";
                    _strTestResultUpdate = _strTestResult;
                    dtSerial[i].REMARK_UPDATE = _strRemark;
                    dtSerial[i].ROW_UPDATE = "Y";
                    _intCountNG = 1;
                    _bolError = true;
                  } else if (_dblPlasmatime < 0) {
                    _strMessageUpdate =
                      "Plasma time do not record / ไม่พบข้อมูลการแสกนก่อนเข้าพลาสม่า";
                    _strRemark = "Plasma time do not record ";
                    _strScanResultUpdate = "NG";
                    _strTestResultUpdate = _strTestResult;
                    dtSerial[i].REMARK_UPDATE = _strRemark;
                    dtSerial[i].ROW_UPDATE = "Y";
                    _intCountNG = 1;
                    _bolError = true;
                  } else if (parseFloat(hfPlasmaTime) < _dblPlasmatime &&hfPlasmaHideTime) {
                    _strMessageUpdate =
                      "Plasma time over " +
                      hfPlasmaTime +
                      " hr. / เวลาพลาสม่าเกิน " +
                      hfPlasmaTime +
                      " ชม.";
                    _strRemark = "Plasma time over " + hfPlasmaTime + " hr.";
                    _strScanResultUpdate = "NG";
                    _strTestResultUpdate = _strTestResult;
                    dtSerial[i].REMARK_UPDATE = _strRemark;
                    dtSerial[i].ROW_UPDATE = "Y";
                    _intCountNG = 1;
                    _bolError = true;
                  }
                }
                if (!_bolError && hfCheckSPIAOI == "Y") { 
                  let _Result = "";
                  let _FrontSheetBarcode = "";
                  let _RearSheetBarcode = "";
                  let _strMessage = "";
                  let _intShtSeq = "";
                  let _dtShtData = await getData("GetSheetDataBySerialNo",_strSerial);
                  console.log(_dtShtData,'_dtShtData')
                  if (_dtShtData != "") {
                    _FrontSheetBarcode = _dtShtData.sheet_no_front;
                    _RearSheetBarcode = _dtShtData.sheet_no_back;
                    _intShtSeq = _dtShtData.pcs_no;
                    _Result = await getData("Get_Spi_aoi_result",
                      {
                        intShtSeq:_intShtSeq,
                        FrontSheetBarcode:_FrontSheetBarcode,
                        RearSheetBarcode:_RearSheetBarcode,
                        strPrdName:_strPrdName,
                        Message:_strMessage
                      });
                      console.log(_Result,'_Result')
                    if (_Result == "NG") {
                      _strScanResultUpdate = _Result;
                      _strMessageUpdate = _strMessage;
                      _strRemark = _strMessage;
                      _strScanResultUpdate = "NG";
                      _strTestResultUpdate = _Result;
                      dtSerial[i].REMARK_UPDATE = _strRemark;
                      dtSerial[i].ROW_UPDATE = "Y";
                      _intCountNG = 1;
                      _bolError = true;
                    }
                  } else {
                    _strMessageUpdate =
                      "No data connect sheet / ไม่มีข้อมูลแสกนประกบกับหมายเลขชีส";
                    _strRemark = "No data connect sheet  ";
                    _strScanResultUpdate = "NG";
                    _strTestResultUpdate = _strTestResult;
                    dtSerial[i].REMARK_UPDATE = _strRemark;
                    dtSerial[i].ROW_UPDATE = "Y";
                    _intCountNG = 1;
                    _bolError = true;
                  }
                }
                if (!_bolError) {
                  if (hfTestResultFlag == "Y") {
                    if (_strTouchUp == "NG" && _strRejectGroup != "MASTER") {
                      if (_strTestResult == "OK") {
                        _strMessageUpdate =
                          "Touch up result was fail / ผล Touch up ชิ้นงานแสดงไม่ผ่าน";
                      } else {
                        _strMessageUpdate =
                          "Touch up result was fail " +
                          _strTypeTestResult +
                          "/ ผล Touch up ชิ้นงานแสดงไม่ผ่าน " +
                          _strTypeTestResult;
                      }
                      _strRemark =
                        "Touch up result was fail" + _strTypeTestResult;
                      _strScanResultUpdate = "NG";
                      _strTestResultUpdate = _strTestResult;
                      dtSerial[i].REMARK_UPDATE = _strRemark;
                      dtSerial[i].ROW_UPDATE = "Y";
                      _bolError = true;
                    } else if (
                      _strTouchUp == "NO" &&
                      _strRejectGroup != "MASTER"
                    ) {
                      if (_strTestResult == "OK") {
                        _strMessageUpdate =
                          "Not found touch up result / ไม่พบผล Touch up ชิ้นงาน";
                      } else {
                        _strMessageUpdate =
                          "Not found touch up result " +
                          _strTypeTestResult +
                          "/ ไม่พบผล Touch up ชิ้นงาน " +
                          _strTypeTestResult;
                      }
                      _strRemark = "Not found touch up result";
                      _strScanResultUpdate = "NG";
                      _strTestResultUpdate = _strTestResult;
                      dtSerial[i].REMARK_UPDATE = _strRemark;
                      dtSerial[i].ROW_UPDATE = "Y";
                      _bolError = true;
                    } else if (_strTestResult == "OK") {
                      if (_intCountDup == 0) {
                        _strScanResultUpdate = "OK";
                        _strTestResultUpdate = _strTestResult;
                        dtSerial[i].REMARK_UPDATE = _strRemark;
                        dtSerial[i].ROW_UPDATE = "Y";
                      } else {
                        _strMessageUpdate =
                          "Duplicate scan serial " +
                          _strTypeTestResult +
                          "/ แสกนบาร์โค้ดของชิ้นงานซ้ำ" +
                          _strTypeTestResult;
                        _strRemark =
                          "Duplicate scan serial " + _strTypeTestResult;
                        _strScanResultUpdate = "NG";
                        _strTestResultUpdate = _strTestResult;

                        dtSerial[i].REMARK_UPDATE = _strRemark;
                        dtSerial[i].ROW_UPDATE = "Y";
                        _bolError = true;
                      }
                    } else if ((_strTestResult = "NG")) {
                      _strMessageUpdate =
                        "Test result was fail " +
                        _strTypeTestResult +
                        "/ ผลทดสอบชิ้นงานแสดงไม่ผ่าน " +
                        _strTypeTestResult;
                      _strRemark = "Test result was fail" + _strTypeTestResult;
                      _strScanResultUpdate = "NG";
                      _strTestResultUpdate = _strTestResult;

                      dtSerial[i].REMARK_UPDATE = _strRemark;
                      dtSerial[i].ROW_UPDATE = "Y";
                      _bolError = true;
                    } else {
                      _strMessageUpdate =
                        "Not found test result " +
                        _strTypeTestResult +
                        "/ ไม่พบผลทดสอบชิ้นงาน " +
                        _strTypeTestResult;
                      _strRemark =
                        "Not found test result " + _strTypeTestResult;
                      _strScanResultUpdate = "NG";
                      _strTestResultUpdate = _strTestResult;

                      dtSerial[i].REMARK_UPDATE = _strRemark;
                      dtSerial[i].ROW_UPDATE = "Y";
                      _bolError = true;
                    }
                  } else {
                    if (_intCountDup == 0) {
                      _strScanResultUpdate = "OK";
                      _strTestResultUpdate = "OK";

                      dtSerial[i].REMARK_UPDATE = _strRemark;
                      dtSerial[i].ROW_UPDATE = "Y";
                    } else {
                      _strMessageUpdate =
                        "Duplicate scan serial " +
                        _strTypeTestResult +
                        _strTagNewLine +
                        "แสกนบาร์โค้ดของชิ้นงานซ้ำ" +
                        _strTypeTestResult;
                      _strRemark =
                        "Duplicate scan serial " + _strTypeTestResult;
                      _strScanResultUpdate = "NG";
                      _strTestResultUpdate = _strTestResult;

                      dtSerial[i].REMARK_UPDATE = _strRemark;
                      dtSerial[i].ROW_UPDATE = "Y";
                      _bolError = true;
                    }
                  }
                }
                if (hfChipIDCheck == "Y" && _bolError == false) {
                  let _intCheckPass;
                  
                  let result = await getData("GetCheckChipDuplicate", {strPrdname:_strPrdName,strSerial:_strSerial}); //api
                  _intCheckPass = parseInt(result)
                  if (_intCheckPass == 0) {
                    _strMessageUpdate = "USER SKIP TEST ELT2";
                    _strRemark = "USER SKIP TEST ELT2";
                    _strScanResultUpdate = "NG";
                    _strTestResultUpdate = _strTestResult;

                    dtSerial[i].REMARK_UPDATE = _strRemark;
                    dtSerial[i].ROW_UPDATE = "Y";
                    _intCountNG = 1;
                    _bolError = true;
                  }
                }
                console.log(hfCheckEFPCAOM,hfCheckEFPCAOI,hfCheckEFPCOST,hfCheckEFPCAVI,'CheckEFPC')
                if (hfCheckEFPCAOM == "Y" ||hfCheckEFPCAOI == "Y" ||hfCheckEFPCOST == "Y" ||hfCheckEFPCAVI == "Y") {
                  let _strEFPCResult = "";
                  let _strEFPCRemark;
                  // รอทำต่อ
                  _strEFPCResult = await getData("GetEFPCSheetInspectionResult",{strPlantCode:Fac,strProduct:_strPrdName,strFrontSheetNo:dtSerial[i].FRONT_SHEET_NO,strBackSheetNo:dtSerial[i].BACK_SHEET_NO,strSheetPcsNo:dtSerial[i].SHEET_PCS_NO,strHfCheckEFPCAOM:hfCheckEFPCAOM,strHfCheckEFPCAOI:hfCheckEFPCAOI,strHfCheckEFPCOST:hfCheckEFPCOST,strHfCheckEFPCAVI:hfCheckEFPCAVI});
                  console.log({strPlantCode:Fac,strProduct:_strPrdName,strFrontSheetNo:dtSerial[i].FRONT_SHEET_NO,strBackSheetNo:dtSerial[i].BACK_SHEET_NO,strSheetPcsNo:dtSerial[i].SHEET_PCS_NO,strHfCheckEFPCAOM:hfCheckEFPCAOM,strHfCheckEFPCAOI:hfCheckEFPCAOI,strHfCheckEFPCOST:hfCheckEFPCOST,strHfCheckEFPCAVI:hfCheckEFPCAVI},'_strEFPCResult')
                  if (_strEFPCResult == "NG") {
                    _strMessageUpdate = _strEFPCRemark;
                    _strRemark = _strEFPCRemark;
                    _strScanResultUpdate = "NG";
                    _strTestResultUpdate = _strTestResult;

                    dtSerial[i].REMARK_UPDATE = _strRemark;
                    dtSerial[i].ROW_UPDATE = "Y";
                    _intCountNG = 1;
                    _bolError = true;
                  }
                }
                if (hfCheckFinInspect == "Y" && _bolError == false) {
                  let _strInspResult = await getData("/GetSerialFinInspectResult",{strSerialNo:_strSerial,strProc:hfCheckFinInspectProc,strPrdName:_strPrdName}); //api ใหม่
                  if (_strInspResult == "NG") {
                    _strMessageUpdate = _strMessageUpdate + _strInspResult;
                    _strRemark = _strInspResult;
                    _strScanResultUpdate = "NG";
                    _strTestResultUpdate = _strTestResult;

                    dtSerial[i].REMARK_UPDATE = _strRemark;
                    dtSerial[i].ROW_UPDATE = "Y";
                    _intCountNG = 1;
                    _bolError = true;
                  }
                }
                if (
                  FINAL_GATE_SPECIAL_FLG == "1" &&
                  FINAL_GATE_SPECIAL_PRD.indexOf(_strPrdName) >= 0 &&
                  _bolError == false
                ) {
                  let _intCheckPass;
                  let resultCheckpass = await getData("GetCheckSpecialBySerial", {strSerialno:_strSerial}); //api ใหม่
                  _intCheckPass = parseInt(resultCheckpass)
                  if (_intCheckPass == 0) {
                    _strMessageUpdate = FINAL_GATE_SPECIAL_MESSAGE;
                    _strRemark = FINAL_GATE_SPECIAL_MESSAGE;
                    _strScanResultUpdate = "NG";
                    _strTestResultUpdate = _strTestResult;

                    dtSerial[i].REMARK_UPDATE = _strRemark;
                    dtSerial[i].ROW_UPDATE = "Y";
                    _intCountNG = 1;
                    _bolError = true;
                  }
                }
              } else {
                _strMessageUpdate =
                  "Serial not matching product / หมายเลขบาร์โค้ดไม่ตรงตามที่กำหนดไว้";
                _strRemark = "Serial barcode not matching product";
                _strScanResultUpdate = "NG";
                _strTestResultUpdate = _strTestResult;

                dtSerial[i].REMARK_UPDATE = _strRemark;
                dtSerial[i].ROW_UPDATE = "Y";
                _bolError = true;
              }
              if (_bolError) {
                // setLblSerialNG(0)
                setLblSerialNG(prevValue => {
                  const numericValue = parseInt(prevValue, 10); 
                  if (isNaN(numericValue)) {
                    return 1; 
                  } else {
                    return numericValue + 1;
                  }
                });
              }
            }
            if (_strRejectGroup == "MASTER") {
              _strTestResultUpdate = _strTestResult;
              _strTouchUp = "";
              _strReject2 = "";

              if (_strTestResult == "OK" && _strMessageUpdate == "") {
                _strMessageUpdate = "";
              }
            }
            dtSerial[i].REJECT = _strReject1;
            dtSerial[i].TOUCH_UP = _strTouchUp;
            dtSerial[i].REJECT2 = _strReject2;
            dtSerial[i].SCAN_RESULT = _strScanResultUpdate;
            dtSerial[i].TEST_RESULT = _strTestResultUpdate;
            dtSerial[i].REMARK = _strMessageUpdate;
            if (_strScanResultUpdate == "NG") {
              _strScanResultAll = "NG";
            }
          }
          _intRowSerial += 1;
        }

        if (_strScanResultAll == "NG") {
          setLblResult({ value: _strScanResultAll, styled: { color: "white" } });
        } else {
          setLblResult({
            value: _strScanResultAll,
            styled: { color: "white" },
          });
        }
        let _strErrorUpdate = "";
        console.log(dtSerial, "dtSerialFinal answwer");

        // _strErrorUpdate = BIZ_ScanSMTSerial.SetSerialLotTrayTable(Session("PLANT_CODE"), _strLot, _strPrdName, dtSerial, hfUserID.Value, hfUserStation.Value, Session("PRODUCT_KIND")) ทำ api
        for(let insertDt = 0 ;insertDt < dtSerial.length;insertDt++){
          if (dtSerial[insertDt].SERIAL != '' || dtSerial[insertDt].SERIAL != null) {
            console.log('insertDt')
            _strErrorUpdate  = await getData("SetSerialLotTrayTable",{strPlantCode:Fac,strPrdName:_strPrdName,strLot:_strLot,strHfUserId:ip,
              strSerial:dtSerial[insertDt].SERIAL,
              strUpdateFlg:dtSerial[insertDt].UPDATE_FLG,
              strRowUpdate:dtSerial[insertDt].ROW_UPDATE,
              strRejectCode:dtSerial[insertDt].REJECT_CODE,
              strTestResult:dtSerial[insertDt].TEST_RESULT,
              strRemarkUpdate:dtSerial[insertDt].REMARK_UPDATE,
              strScanResult:dtSerial[insertDt].SCAN_RESULT
            });
  
            if (_strErrorUpdate != "") {
              if (_strErrorUpdate == 'duplicate key value violates unique constraint "pk_final_gate_header"'){
                dtSerial[insertDt].REMARK = 'duplicate serial'
              }
              Swal.fire({
                icon: "error",
                title: "Error",
                text: `Error : ${_strErrorUpdate}`,
              });
            }
          }
        }
        if (_strErrorUpdate != "") {
          setLblError(`Error : ${_strErrorUpdate}`);
        //   Swal.fire({
        //     icon: "error",
        //     title: "Error",
        //     text: `Error : ${_strErrorUpdate}`,
        //   });
        }
      }
      let dtLotPassCount = await getData("GetSerialPassByLot", _strLot);
      if (dtLotPassCount != "") {
        setLblLotTotal(dtLotPassCount);
      }
      if (!_bolTrayError) {
        setGvSerialResult(dtSerial);
        setHideImg(false);
        setLblResultState(true);
        // ExportGridToCSV()
      } else {
        setGvSerialResult([]);
      }
      setTxtSerial(gvSerial.map(() => ""));
      getInitialSerial();      
      SetFocus("txtSerial_0");
      
    } else {
      setLblError("Scan master code incorrect / สแกน master code ไม่ถูกต้อง");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Scan master code incorrect / สแกน master code ไม่ถูกต้อง",
      });
    }
  }
  function convertBase34(num) {
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
  function convertBase34to10(strText) {
    const strChange = "0123456789ABCDEFGHJKLMNPQRSTUVWXYZ";
    let result = 0;

    if (!strText) {
      return result;
    }

    let j = 0;
    for (let i = strText.length - 1; i >= 0; i--) {
      const char = strText.charAt(i);
      const position = strChange.indexOf(char);
      if (position === -1) {
        throw new Error(`Invalid character '${char}' in input string.`);
      }
      result += position * Math.pow(34, j);
      j++;
    }

    return result;
  }
  function getCheckSumSerial(_strSerial, _strDateType, _intEngRevEndDigit) {
    let boolResult = true;

    let maxEvenNumber =
      Math.trunc(_intEngRevEndDigit / 2) * 2 +
      ((_intEngRevEndDigit % 2) * 2 - 1);
    let maxOddNumber = Math.trunc(_intEngRevEndDigit / 2) * 2;

    let evenNumber = 0;
    let oddNumber = 0;
    let triNumber = 0;
    let fouNumber = 0;
    let fivNumber = 0;
    let sixNumber = 0;
    let sevNumber = 0;

    if (["Y", "W", "R", "B", "I", "M"].includes(_strDateType)) {
      if (_strSerial.length >= _intEngRevEndDigit) {
        let serialNumber = _strSerial.substring(0, _intEngRevEndDigit);
        let strSerialCheckSum = _strSerial.charAt(_intEngRevEndDigit);
        for (let j = 0; j < maxEvenNumber; j += 2) {
          evenNumber += convertBase34to10(serialNumber.charAt(j));
        }
        for (let j = 1; j < maxOddNumber; j += 2) {
          oddNumber += convertBase34to10(serialNumber.charAt(j));
        }
        triNumber = oddNumber * 3;
        fouNumber = evenNumber + triNumber;
        fivNumber = Math.ceil(fouNumber / 34);
        sixNumber = fivNumber * 34;
        sevNumber = sixNumber - fouNumber;
        if (convertBase34(sevNumber) !== strSerialCheckSum) {
          boolResult = false;
        }
      } else {
        boolResult = false;
      }
    }

    return boolResult;
  }

  return {
    hideImg,
    lblResultState,
    ddlproduct,
    productSelected,
    setProductSelected,
    setTxtLot,
    txtLot,
    txtLot_Change,
    lblError,
    txtMasterCode,
    setTxtMasterCode,
    lblLot,
    lblLotTotal,
    lblSerialNG,
    panalSerialState,
    gvSerial,
    handle_ibtBack,
    handle_Cancel_Click,
    handle_Save_Click,
    ddlproduct_Change,
    txtSerial,
    setTxtSerial,
    handletxtSerialChange,
    txtmasterCode_Change,
    gvSerialResult,
    lblResult,
  };
}

export { fn_ScanSMTSerialPcsNG };
