import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Tag } from "antd";
function Fn_ScanSMTRollSht() {
  const [txt_lotNo, settxt_lotNo] = useState({
    value: "",
    disbled: "",
    visble: "",
    style: {},
  });
  const [sl_Product, setsl_Product] = useState({
    value: "",
    disbled: "",
    visble: "",
    style: {},
  });
  const [Product, setProduct] = useState([]);
  const [lbllog, setlbllog] = useState({
    value: "",
    disbled: "",
    visble: false,
    style: "",
  });
  const [txtRollLeaf, settxtRollLeaf] = useState({
    value: "",
    disbled: "",
    visble: "",
    style:{},
  });
  const [txtTotalLeaf, settxtTotalLeaf] = useState("4");
  const [txtOperator, settxtOperator] = useState("");
  const [lblCheckRoll, setlblCheckRoll] = useState({
    value: "",
    disbled: "",
    visble: "",
    style: {},
  });
  const [lbltotalSht, setlbltotalSht] = useState("");
  const [GvSerial, SetGvSerial] = useState({
    value: "",
    disbled: "",
    visble: "none",
    style: {},
  });
  const [txtLeafNo, SettxtLeafNo] = useState(Array(txtTotalLeaf).fill(""));

  const [lblResult, setlblResult] = useState({
    value: "",
    disbled: "",
    visble: "",
    style: {},
  });

  const [gvScanResult, setgvScanResult] = useState({
    value: "",
    disbled: "",
    visble: false,
    style: "",
  });

    //Focus
    const fc_txtRollleaf = useRef([]);
    const fc_SlProduct = useRef([]);
    const fc_GvSerial= useRef([]);
    const fc_txtLotNo= useRef([]);
    const fc_txtOperator = useRef([]); 
  // --------------------------------------
  const [hfSerialLength, setHfSerialLength] = useState("");
  const [hfSerialFixFlag, setHfSerialFixFlag] = useState("");
  const [hfSerialDigit, setHfSerialDigit] = useState("");
  const [hfSerialStartDigit, setHfSerialStartDigit] = useState("");
  const [hfSerialEndDigit, setHfSerialEndDigit] = useState("");
  const [hfTrayFlag, setHfTrayFlag] = useState("");
  const [hfTrayLength, setHfTrayLength] = useState("");
  const [hfTestResultFlag, setHfTestResultFlag] = useState("");
  const [hfBarcodeSide, setHfBarcodeSide] = useState("");
  const [hfShtScan, setHfShtScan] = useState("");
  const [hfConfigCheck, setHfConfigCheck] = useState("");
  const [hfConfigCode, setHfConfigCode] = useState("");
  const [hfConfigStart, setHfConfigStart] = useState("");
  const [hfConfigEnd, setHfConfigEnd] = useState("");
  const [hfConfigRuning, setHfConfigRuning] = useState("");
  const [hfDuplicateStart, setHfDuplicateStart] = useState("");
  const [hfDuplicateEnd, setHfDuplicateEnd] = useState("");
  const [hfCheckPrdSht, setHfCheckPrdSht] = useState("");
  const [hfCheckPrdShtStart, setHfCheckPrdShtStart] = useState("");
  const [hfCheckPrdShtEnd, setHfCheckPrdShtEnd] = useState("");
  const [hfCheckPrdAbbr, setHfCheckPrdAbbr] = useState("");
  const [hfCheckLotSht, setHfCheckLotSht] = useState("");
  const [hfCheckLotShtStart, setHfCheckLotShtStart] = useState("");
  const [hfCheckLotShtEnd, setHfCheckLotShtEnd] = useState("");
  const [hfCheckStartSeq, setHfCheckStartSeq] = useState("");
  const [hfCheckStartSeqCode, setHfCheckStartSeqCode] = useState("");
  const [hfCheckStartSeqStart, setHfCheckStartSeqStart] = useState("");
  const [hfCheckStartSeqEnd, setHfCheckStartSeqEnd] = useState("");
  const [hfCheckSheetELT, setHfCheckSheetELT] = useState("");
  const [hfCheckRollSht, setHfCheckRollSht] = useState("");
  const [hfCheckRollShtDigit, setHfCheckRollShtDigit] = useState("");
  const [hfCheckDateInProc, setHfCheckDateInProc] = useState("");
  const [hfDateInProc, setHfDateInProc] = useState("");
  const [hfCheckWeekCode, setHfCheckWeekCode] = useState("");
  const [hfCheckWeekCodeStart, setHfCheckWeekCodeStart] = useState("");
  const [hfCheckWeekCodeEnd, setHfCheckWeekCodeEnd] = useState("");
  const [hfWeekCode, setHfWeekCode] = useState("");
  const [hfWeekCodeType, setHfWeekCodeType] = useState("");
  const [hfCheckPreAOIF, setHfCheckPreAOIF] = useState("");
  const [hfCheckPreAOIB, setHfCheckPreAOIB] = useState("");
  const [hfCheckAOIF, setHfCheckAOIF] = useState("");
  const [hfCheckAOIB, setHfCheckAOIB] = useState("");
  const [hfCheckSPIF, setHfCheckSPIF] = useState("");
  const [hfCheckSPIB, setHfCheckSPIB] = useState("");
  const [hfReqMachine, setHfReqMachine] = useState("");
  const [hfConnRollLength, setHfConnRollLength] = useState("");
  const [hfConnLeafLength, setHfConnLeafLength] = useState("");
  const [hfCheckRollPrdFlg, setHfCheckRollPrdFlg] = useState("");
  const [hfCheckRollPrdStart, setHfCheckRollPrdStart] = useState("");
  const [hfCheckRollPrdEnd, setHfCheckRollPrdEnd] = useState("");
  const [hfCheckRollPrd, setHfCheckRollPrd] = useState("");
  const [hfSerialStartCode, setHfSerialStartCode] = useState("");
  const [hfCheckXrayF, setHfCheckXrayF] = useState("");
  const [hfCheckXrayB, setHfCheckXrayB] = useState("");
  const [hfCheckXrayOneTime, setHfCheckXrayOneTime] = useState("");
  const [hfCheckFinInspect, setHfCheckFinInspect] = useState("");
  const [hfCheckFinInspectProc, setHfCheckFinInspectProc] = useState("");
  const [hfChipIDCheck, setHfChipIDCheck] = useState("");
  const [hfPlasmaCheck, setHfPlasmaCheck] = useState("");
  const [hfPlasmaTime, setHfPlasmaTime] = useState("");
  const [hfAutoScan, setHfAutoScan] = useState("");
  const [hfCheckAOICoatF, setHfCheckAOICoatF] = useState("");
  const [hfCheckAOICoatB, setHfCheckAOICoatB] = useState("");
  const [hfSerialInfo, setHfSerialInfo] = useState("");
  const [hfBarcodeGrade, setHfBarcodeGrade] = useState("");
  const [hfMode, setHfMode] = useState("");
  const [hfSerialCount, setHfSerialCount] = useState("");
  const [hfRollNo, setHfRollNo] = useState("");
  const [hfLeafScan, setHfLeafScan] = useState("");
  const [hfConnRollLeafFlg, setHfConnRollLeafFlg] = useState("");
  const [hfLeafSerialFlg, setHfLeafSerialFlg] = useState("");
  const [hfScanResult, setHfScanResult] = useState("");

  const CONNECT_SERIAL_ERROR = "999999";
  const CONNECT_SERIAL_NOT_FOUND = "NOT FOUND CODE";
  const hfAutoDownload = "N";
  // --------------------------------------
  //Page loade
  useEffect(() => {
    const fetchData = async () => {
      setHfMode("");
      await getProduct();
      await SetMode("LOT");
    };
    fetchData();
  }, []);

  const getProduct = async () => {
    await axios.get("/api/Common/GetProductData").then((res) => {
      let data = res.data.flat();
      setProduct(data);
      setsl_Product((prevState) => ({ ...prevState, value: data[0].prd_name }));
    });
  };

  const handleLotxt_Lotno = async () => {
    // 5-190617-001RGP021S048
    SetGvSerial((prevState) => ({ ...prevState, value: "", visble: 'none' }));
    setgvScanResult((prevState) => ({ ...prevState, value: "", visble: false }));
    setlbllog((prevState) => ({ ...prevState, value: "", visble: false }));
    let strLotData = "";
    let strLot = "";
    let strPrdName = "";
    let dtLotData = "";
    let RollNo = "";
    strLotData = txt_lotNo.value.toUpperCase().split(";");
    strLot = strLotData[0];
    await axios
      .post("/api/Common/getProductDataByLot", {
        strLot: strLot,
      })
      .then((res) => {
        let data = res.data.flat().flat();
        dtLotData = data;
      });
    setHfRollNo("");
    setlbltotalSht("");
    console.log(dtLotData, "dtLotData");
    if (dtLotData.length > 0) {
      strPrdName = dtLotData[0][0];
      setHfRollNo(dtLotData[0][1]);
      RollNo = dtLotData[0][1];
    }
    console.log("strPrdName", strPrdName);
    if (strPrdName != "") {
      setlbllog((prevState) => ({ ...prevState, value: "", visble: false }));
      settxt_lotNo((prevState) => ({ ...prevState, value: strLot }));
      if (RollNo == "") {
        setHfRollNo(strLot);
      }

      try {
        const isInArray = Product.some((item) => item.prd_name === strPrdName);

        if (isInArray) {
          console.log("isInArray", isInArray);
          setsl_Product((prevState) => ({ ...prevState, value: strPrdName }));
          await getProductSerialMaster(strPrdName);
          await getInitialSheet();
          SetMode("ROLL");
          setTimeout(() => {
            fc_txtRollleaf.current.focus();
          }, 300);
         
        } else {
          console.log("not found1");
          setlbllog((prevState) => ({
            ...prevState,
            value: `Product ${strPrdName} not found.`,
            visble: true,
          }));
          setTimeout(() => {
            fc_SlProduct.current.focus();
          }, 300);
          return;
        }
      } catch (error) {
        console.log("catch", error);
        setlbllog((prevState) => ({
          ...prevState,
          value: `Product ${strPrdName} not found.`,
          visble: true,
        }));
        setTimeout(() => {
          fc_SlProduct.current.focus();
        }, 300);
       
      
      }
      await axios
        .post("/api/GetRollLeafTotalByLot", {
          LotNo: strLot,
        })
        .then((res) => {
          console.log(res.data,'mmmmmm')
          setlbltotalSht(res.data);
        });
    } else {
      setsl_Product((prevState) => ({
        ...prevState,
        value: Product[0].prd_name,
      }));
      settxt_lotNo((prevState) => ({ ...prevState, value: '' }));
      // SetGvSerial((prevState) => ({ ...prevState, value: "", visble: true }));
      setlbllog((prevState) => ({
        ...prevState,
        value: `Invalid lot no.`,
        visble: true,
      }));
      setHfMode("LOT");
      setTimeout(() => {
        fc_txtLotNo.current.focus();
      }, 300);
     
    }
  };

  useEffect(() => {
  // GvSerial
  if(GvSerial.visble==''){
    getInitialSheet();
  }
  }, [hfSerialCount]);

  const getInitialSheet = async () => {
    console.log('>>>>>',txtTotalLeaf)
    let dtData = [];
    setHfSerialCount(txtTotalLeaf)
    for (let intRow = 0; intRow < hfSerialCount; intRow++) {
      dtData.push({
        SEQ: intRow + 1,
      });
    }
    SetGvSerial((prevState) => ({ ...prevState, value: dtData }));
    return dtData;
  };

  const getProductSerialMaster = async (strPrdName) => {
    let data = [];
    setHfSerialLength("0");
    setHfSerialFixFlag("N"); //= "N"
    setHfSerialDigit(""); //= ""
    setHfSerialStartDigit("0"); //= "0"
    setHfSerialEndDigit("0"); //= "0"
    setHfTrayFlag(""); //= ""
    setHfTrayLength("0"); //= "0"
    setHfTestResultFlag(""); // = ""
    setHfConfigCheck("N"); // = "N"
    setHfConfigCode(""); // = ""
    setHfConfigStart("0"); //= "0"
    setHfConfigEnd("0"); //= "0"
    setHfConfigRuning("N"); //= "N"
    setHfDuplicateStart("0"); //= "0"
    setHfDuplicateEnd("0"); //= "0"
    setHfChipIDCheck("N"); //= "N" //may
    setHfCheckPrdSht("N"); //= "N"
    setHfCheckPrdShtStart("0"); //= "0"
    setHfCheckPrdShtEnd("0"); // = "0"
    setHfCheckPrdAbbr(""); // = ""
    setHfPlasmaCheck("N"); //= "N" //may
    setHfPlasmaTime("0"); //= "0" //may
    setHfCheckStartSeq("N"); //= "N"
    setHfCheckStartSeqCode(""); //= ""
    setHfCheckStartSeqStart("0"); // = "0"
    setHfCheckStartSeqEnd("0"); //= "0"
    setHfCheckDateInProc("N"); //= "N"
    setHfDateInProc(""); //= ""
    setHfCheckWeekCode("N"); //= "N"
    setHfCheckWeekCodeStart(""); //= ""
    setHfCheckWeekCodeEnd(""); //= ""
    setHfWeekCode(""); //= ""
    setHfWeekCodeType(""); //= ""
    setHfSerialStartCode(""); //= ""

    await axios
      .post("/api/Common/GetSerialProductByProduct", {
        prdName: strPrdName,
      })
      .then((res) => {
        data = res.data[0];
        console.log("GetSerialProductByProduct", data);
        if (data != null) {
          setHfSerialLength(data.slm_serial_length);
          setHfSerialFixFlag(data.slm_fix_flag);
          setHfSerialDigit(data.slm_fix_digit);
          setHfSerialStartDigit(data.slm_fix_start_digit);
          setHfSerialEndDigit(data.slm_fix_end_digit);
          setHfTrayFlag(data.slm_tray_flag);
          setHfTrayLength(data.slm_tray_length);
          setHfTestResultFlag(data.slm_test_result_flag);
          setHfSerialCount(data.slm_serial_count);
          setHfAutoScan(data.slm_auto_scan);
          setHfConfigCheck(data.prm_barcode_req_config);
          setHfConfigCode(data.prm_config_code);
          setHfConfigStart(data.prm_start_config);
          setHfConfigEnd(data.prm_end_config);
          setHfConfigRuning(data.prm_running_req_config);
          setHfDuplicateStart(data.prm_duplicate_start);
          setHfDuplicateEnd(data.prm_duplicate_end);
          setHfChipIDCheck(data.prm_check_chip_id_flg);
          setHfCheckPrdAbbr(data.prm_abbr);
          setHfPlasmaCheck(data.prm_plasma_time_flg);
          setHfPlasmaTime(data.prm_plasma_time);
          setHfCheckStartSeq(data.prm_req_start_seq_flg);
          setHfCheckStartSeqCode(data.prm_start_seq_code);
          setHfCheckStartSeqStart(data.prm_start_seq_start);
          setHfCheckStartSeqEnd(data.prm_start_seq_end);
          setHfConnRollLeafFlg(data.prm_conn_roll_leaf_flg);
          setHfConnRollLength(data.prm_conn_roll_length);
          setHfConnLeafLength(data.prm_conn_leaf_length);
          setHfCheckDateInProc(data.prm_date_inproc_flg);
          setHfDateInProc(data.prm_date_inproc);
          setHfWeekCodeType(data.prm_date_type);
          setHfCheckWeekCode(data.prm_check_weekcode_flg);
          setHfCheckWeekCodeStart(data.prm_check_weekcode_start);
          setHfCheckWeekCodeEnd(data.prm_check_weekcode_end);
          setHfLeafScan(data.prm_conn_roll_leaf_scan);
          setHfLeafSerialFlg(data.prm_conn_roll_serial_flg);
          setHfCheckRollPrdFlg(data.prm_conn_roll_prd_flg);
          setHfCheckRollPrdStart(data.prm_conn_roll_prd_start);
          setHfCheckRollPrdEnd(data.prm_conn_roll_prd_end);
          setHfCheckRollPrd(data.prm_conn_roll_prd_fix);
          setHfCheckPrdSht(data.prm_conn_roll_req_prd_sht);
          setHfCheckPrdShtStart(data.prm_conn_roll_prd_sht_start);
          setHfCheckPrdShtEnd(data.prm_conn_roll_prd_sht_end);
          setHfCheckLotSht(data.prm_conn_roll_req_lot_sht);
          setHfCheckLotShtStart(data.prm_conn_roll_lot_sht_start);
          setHfCheckLotShtEnd(data.prm_conn_roll_lot_sht_end);
          setHfSerialStartCode(data.prm_serial_start_code);
          setHfSerialInfo(data.prm_additional_info);
        }
      });
    settxtTotalLeaf(data.prm_conn_roll_leaf_scan);
    if (data.prm_check_weekcode_flg == "Y") {
      axios
        .post("/api/Common/getWeekCodebyLot", {
          STRLOT: txt_lotNo.value,
          STRPROC: data.prm_date_inproc,
        })
        .then((res) => {
          if (res.data.length > 0) {
            setHfWeekCode(data.roll_leaf);
          }
        });
    }
    if (data.prm_conn_roll_prd_flg == "Y") {
      setlblCheckRoll((prevState) => ({
        ...prevState,
        value: "ON",
        style: { background: "#73d13d", color: "Blue" },
      }));
    } else {
      setlblCheckRoll((prevState) => ({
        ...prevState,
        value: "OFF",
        style: { background: "#f5222d", color: "black" },
      }));
    }
    return data;
  };

  const SetMode = async (_strType) => {
    if (_strType == "LOT") {
      settxt_lotNo((prevState) => ({
        ...prevState,
        value: "",
        disbled: false,
        style: { background: "" },
      }));
      await getProduct();
      setsl_Product((prevState) => ({
        ...prevState,
        disbled: false,
        style: { background: "" },
      }));
      settxtRollLeaf((prevState) => ({
        ...prevState,
        value: "",
        disbled: true,
        style: { background: "#e0e0e0" },
      }));
      setlbllog((prevState) => ({ ...prevState, visble: false }));
      SetGvSerial((prevState) => ({ ...prevState, visble: 'none' }));
      setHfMode("LOT");
     
      setTimeout(() => {
        fc_txtLotNo.current.focus();
      }, 300);
    }
    if (_strType == "LOT_ERROR") {
      settxt_lotNo((prevState) => ({
        ...prevState,
        value: "",
        disbled: false,
        style: { background: "" },
      }));
      setsl_Product((prevState) => ({
        ...prevState,
        disbled: false,
        style: { background: "" },
      }));
      settxtRollLeaf((prevState) => ({
        ...prevState,
        value: "",
        disbled: true,
        style: { background: "#e0e0e0" },
      }));
      setlbllog((prevState) => ({ ...prevState, visble: true })); //falseโชว์ true ซ่อน
      SetGvSerial((prevState) => ({ ...prevState, visble: "none" }));
      setHfMode("LOT");
      setTimeout(() => {
        fc_txtLotNo.current.focus();
      }, 300);
    }
    if (_strType == "OP") {
      settxt_lotNo((prevState) => ({
        ...prevState,
        disbled: true,
        style: { background: "#e0e0e0" },
      }));
      setsl_Product((prevState) => ({ ...prevState, disbled: true }));
      settxtRollLeaf((prevState) => ({
        ...prevState,
        value: "",
        disbled: false,
      }));
      setlbllog((prevState) => ({ ...prevState, visble: false }));
      SetGvSerial((prevState) => ({ ...prevState, visble: "" }));
      settxtOperator("");
      setHfMode("OP");
      setTimeout(() => {
        fc_txtOperator.current.focus();
      }, 300);
    
    }
    if (_strType == "ROLL") {
      settxt_lotNo((prevState) => ({
        ...prevState,
        disbled: true,
        style: { background: "#e0e0e0" },
      }));
      setsl_Product((prevState) => ({ ...prevState, disbled: true,style:{ background: "#e0e0e0"} }));
      settxtRollLeaf((prevState) => ({
        ...prevState,
        value: "",
        disbled: false,
        style:{}
      }));
      setlbllog((prevState) => ({ ...prevState, visble: false }));
      SetGvSerial((prevState) => ({ ...prevState, visble: "" }));
      setHfMode("SHEET");
    }
    if (_strType == "SHEET") {
      settxt_lotNo((prevState) => ({
        ...prevState,
        disbled: true,
        style: { background: "#e0e0e0" },
      }));
      setlbllog((prevState) => ({ ...prevState, visble: false }));
      SetGvSerial((prevState) => ({ ...prevState, visble: "" }));
      setHfMode("SHEET");
      await getInitialSheet();
    }
    if (_strType == "SHEET_ERROR") {
      settxt_lotNo((prevState) => ({
        ...prevState,
        disbled: true,
        style: { background: "#e0e0e0" },
      }));
      setlbllog((prevState) => ({ ...prevState, visble: true }));
    }
    if (_strType == "SHEET_OK") {
      settxt_lotNo((prevState) => ({
        ...prevState,
        disbled: true,
        style: { background: "#e0e0e0" },
      }));
      setlbllog((prevState) => ({ ...prevState, visble: false }));
      SetGvSerial((prevState) => ({ ...prevState, visble: "none" }));
      await getInitialSheet();
      setTimeout(() => {
        fc_GvSerial.current.focus();
      }, 300);
     
      
    }
    if (_strType == "SHEET_NG") {
      settxt_lotNo((prevState) => ({
        ...prevState,
        disbled: true,
        style: { background: "#e0e0e0" },
      }));
      setlbllog((prevState) => ({ ...prevState, visble: false }));
    }
  };

  const handletxtTotalLeaf = async () => {
    if (txt_lotNo.value != "") {
      await getInitialSheet();
      SetMode("ROLL");
      setTimeout(() => {
        fc_txtRollleaf.current.focus();
      }, 300);
    }
  };

  const HandleSL_Product = async (PD) => {
    setsl_Product((prevState) => ({ ...prevState, value: PD }));
    await getProductSerialMaster(PD);
    if (txt_lotNo.value != "") {
      setlbllog((prevState) => ({ ...prevState, value: "", visble: false }));
      await getInitialSheet();
      SetMode("ROLL");
      setTimeout(() => {
        fc_txtRollleaf.current.focus();
      }, 300);
    }
  };

  const Bt_Save = async () => {
    console.log('hfMode',hfMode)
    if (hfMode == "SHEET") {
      await setRollSheetData();
    }
  };

  const getInputSheet = () => {
    let dtData = [];
    for (let i = 0; i < txtTotalLeaf; i++) {
      dtData.push({
        SHT_SEQ: i + 1,
        LOT_NO: txt_lotNo.value,
        ROLL_NO: hfRollNo,
        ROLL_LEAF: txtRollLeaf.value,
        SHT_NO: txtLeafNo[i],
        SCAN_RESULT: "",
        REMARK: "",
        ROW_UPDATE: "N",
        UPDATE_FLG: "N",
        MACHINE: "",
        PRODUCT: sl_Product.value,
      });
    }
    return dtData;
  };

  const setRollSheetData = async () => {
    let _strFileError = "";
    let dtSheet = getInputSheet();
    console.log(hfConnRollLength,'hfConnRollLength',txtRollLeaf.value.length)
    let _bolPrdError = false;
    let _bolError = false;
    let _strScanResultAll = "OK";
    let _intCount = 0;
    let _intRow = 0;
    let _strLot = "";

    let _strRollLeaf = txtRollLeaf.value;
    if (hfConnRollLength == txtRollLeaf.value.length) {
      if (txtOperator != "") {
        await axios
          .post("/api/ScanFin/GetRollLeafDuplicate", {
            strRollLeaf: _strRollLeaf,
            _dtRollLeaf: dtSheet,
          })
          .then((res) => {
            console.log('GetRollLeafDuplicate',res.data)
            _intCount = res.data;
          });
        if (_intCount == 1) {
          _bolError = true;
          _strScanResultAll = "NG";
          for (let i = 0; i < dtSheet.length; i++) {
            dtSheet[i].UPDATE_FLG = "N";
            dtSheet[i].ROW_UPDATE = "N";
            dtSheet[i].SCAN_RESULT = "NG";
            dtSheet[i].REMARK =
              "Roll/Sheet barcode duplicate / หมายเลขบาร์โค้ดซ้ำ";
            _intCount += 1;
          }
        }
        let dataRBMP = "";
        await axios
          .post("/api/ScanFin/GetRollLeafScrapRBMP", {
            strRollLeaf: _strRollLeaf,
            _dtRollLeaf: dtSheet,
          })
          .then((res) => {
            console.log('GetRollLeafScrapRBMP',res.data)
            dataRBMP = res.data;
          });
        if (dataRBMP == "Y") {
          _bolError = true;
          _strScanResultAll = "NG";
          for (let i = 0; i < dtSheet.length; i++) {
            dtSheet[i].UPDATE_FLG = "N";
            dtSheet[i].ROW_UPDATE = "N";
            dtSheet[i].SCAN_RESULT = "NG";
            dtSheet[i].REMARK = "Problem sheet from RBMP";
            _intCount += 1;
          }
        }
        if (hfCheckRollPrdFlg == "Y" && !_bolError) {
          let strRollProduct = hfRollNo + hfCheckRollPrd;
          const start = parseInt(hfCheckRollPrdStart, 10);
          const end = parseInt(hfCheckRollPrdEnd, 10);
          console.log('_strRollLeaf',_strRollLeaf)
          if (strRollProduct != _strRollLeaf.slice(start - 1, end)) {
            _bolError = true;
            _strScanResultAll = "NG";
            for (let i = 0; i < dtSheet.length; i++) {
              dtSheet[i].UPDATE_FLG = "N";
              dtSheet[i].ROW_UPDATE = "N";
              dtSheet[i].SCAN_RESULT = "NG";
              dtSheet[i].REMARK =
                "Roll/Sheet not matching product / หมายเลขบาร์โค้ดไม่ตรงกับผลิตภัณฑ์";
              _intCount += 1;
            }
          }
        }
        if (!_bolError) {
          for (let i = 0; i < dtSheet.length; i++) {
            _strLot = dtSheet[i].LOT_NO;
            let _strPrdName = dtSheet[i].PRODUCT;
            let _strRollNo = dtSheet[i].ROLL_NO;
            let _inSeq = dtSheet[i].SHT_SEQ;
            _strRollLeaf = dtSheet[i].ROLL_LEAF;
            _intRow += 1;

            if (
              dtSheet[i].SHT_NO != "" &&
              dtSheet[i].SHT_NO != CONNECT_SERIAL_ERROR &&
              dtSheet[i].SHT_NO != CONNECT_SERIAL_NOT_FOUND
            ) {
              let _intCountDup = 0;
              let _strRemark = "";
              let _strError = "";
              let _strShtNo = dtSheet[i].SHT_NO;
              let _strShtNoDup = "";
              let _strScanResultUpdate = "";
              let _strMessageUpdate = "";
              _bolError = false;

              for (let _intSeq = 0; _intSeq <= dtSheet.length - 1; _inSeq++) {
                if (dtSheet[_intSeq].SHT_NO == _strShtNo) {
                  _bolError = true;
                  _strScanResultAll = "NG";
                  _strScanResultUpdate = "NG";
                  _strRemark =
                    "Leaf barcode scan duplicate / หมายเลขบาร์โค้ดสแกนซ้ำกัน";
                }
              }
              if (
                (parseInt(hfConnLeafLength, 10) === 0 ||
                  parseInt(hfConnLeafLength, 10) === _strShtNo.length) &&
                !_bolError
              ) {
                if (hfCheckPrdSht == "Y" && !_bolError) {
                  if (
                    hfCheckPrdAbbr !==
                    _strShtNo.substring(
                      parseInt(hfCheckPrdShtStart, 10),
                      parseInt(hfCheckPrdShtEnd, 10) + 1
                    )
                  ) {
                    _strScanResultAll = "NG";
                    _strScanResultUpdate = "NG";
                    _strRemark =
                      "Leaf barcode mix product / หมายเลขบาร์โค้ดปนกันกับผลิตภัณฑ์อื่น";
                    _bolError = true;
                  }
                }
                if (hfCheckLotSht === "Y" && !_bolError) {
                  if (
                    _strLot !==
                    _strShtNo.substring(
                      parseInt(hfCheckLotShtStart, 10),
                      parseInt(hfCheckLotShtEnd, 10) + 1
                    )
                  ) {
                    _strScanResultAll = "NG";
                    _strScanResultUpdate = "NG";
                    _strRemark =
                      "Leaf barcode mix lot / หมายเลขบาร์โค้ดปนกันกับล็อตอื่น";
                    _bolError = true;
                  }
                }
                if (!_bolError && hfLeafSerialFlg === "Y") {
                  let _strFixDigit = "";

                  if (hfSerialFixFlag === "Y") {
                    _strFixDigit = _strShtNo.substring(
                      parseInt(hfSerialStartDigit, 10),
                      parseInt(hfSerialEndDigit, 10) + 1
                    );

                    if (_strFixDigit !== hfSerialDigit) {
                      _strScanResultAll = "NG";
                      _strScanResultUpdate = "NG";
                      _strRemark =
                        "Serial barcode mix product / หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
                      _bolError = true;
                    }

                    if (
                      hfConfigCheck === "Y" &&
                      _strScanResultUpdate !== "NG"
                    ) {
                      let _strConfigDigit = "";
                      _strConfigDigit = _strShtNo.substring(
                        parseInt(hfConfigStart, 10),
                        parseInt(hfConfigEnd, 10) + 1
                      );
                      if (_strConfigDigit !== hfConfigCode) {
                        _strScanResultAll = "NG";
                        _strScanResultUpdate = "NG";
                        _strRemark =
                          "Serial barcode mix product / หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
                        _bolError = true;
                      }
                    }
                  }

                  if (
                    hfSerialStartCode.trim() !== "" &&
                    _strScanResultUpdate !== "NG"
                  ) {
                    if (
                      _strShtNo.substring(0, hfSerialStartCode.length) !==
                      hfSerialStartCode
                    ) {
                      _strScanResultAll = "NG";
                      _strScanResultUpdate = "NG";
                      _strRemark =
                        "Serial barcode mix product / หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
                      _bolError = true;
                    }
                  }

                  if (
                    hfCheckStartSeq === "Y" &&
                    _strScanResultUpdate !== "NG"
                  ) {
                    let _strStartSeq = "";
                    _strStartSeq = _strShtNo.substring(
                      parseInt(hfCheckStartSeqStart, 10),
                      parseInt(hfCheckStartSeqEnd, 10) + 1
                    );
                    if (_strStartSeq !== hfCheckStartSeqCode) {
                      _strScanResultAll = "NG";
                      _strScanResultUpdate = "NG";
                      _strRemark =
                        "Serial barcode mix product / หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
                      _bolError = true;
                    }
                  }

                  if (
                    hfCheckWeekCode === "Y" &&
                    _strScanResultUpdate !== "NG"
                  ) {
                    let _strWeekCode = "";
                    _strWeekCode = _strShtNo.substring(
                      parseInt(hfCheckWeekCodeStart, 10),
                      parseInt(hfCheckWeekCodeEnd, 10) + 1
                    );
                    if (_strWeekCode !== hfWeekCode) {
                      _strScanResultAll = "NG";
                      _strScanResultUpdate = "NG";
                      _strRemark =
                        "Serial barcode mix week code / หมายเลขบาร์โค้ดปนรหัสสัปดาห์กัน";
                      _bolError = true;
                    }
                  }
                }
                if (!_bolError) {
                  await axios
                    .post("/api/getleafduplicateconnectroll", {
                      dataList: {
                        strPlantCode: "5",
                        strSheetno: _strShtNo,
                        _strLot: _strLot,
                        _strRollNo: _strRollNo,
                        _strRollLeaf: _strRollLeaf,
                        _intSeq: _inSeq,
                        _strShtNoDup: _strShtNoDup,
                      },
                    })
                    .then((res) => {
                      console.log('getleafduplicateconnectroll',res.data)
                      _intCountDup = res.data;
                    });
                  if (_intCountDup != 0) {
                    _strScanResultAll = "NG";
                    _strScanResultUpdate = "NG";
                    _strRemark =
                      "Leaf barcode duplicate / หมายเลขบาร์โค้ดซ้ำกับชิ้นงานอื่น";
                    _bolError = true;
                  }
                  if (_strShtNoDup != "") {
                    dtSheet[i].UPDATE_FLG = "Y";
                  }
                }
                if (!_bolError) {
                  dtSheet[i].ROW_UPDATE = "Y";
                  _strScanResultUpdate = "OK";
                  _strRemark = "";
                }
                console.log('เข้าาาาาาาา111111')
                dtSheet[i].SCAN_RESULT = _strScanResultUpdate;
                dtSheet[i].REMARK = _strRemark;
                _intCount += 1;
              }
            }
          }
        }
      } else {
        _bolError = true;
        _strScanResultAll = "NG";
        setlbllog((prevState) => ({
          ...prevState,
          Visible: true,
          value: "Please input operator / กรุณาระบุพนักงาน",
        }));
      }
    } else {
      console.log('เข้าาาาาาาา222222')
      _bolError = true;
      _strScanResultAll = "NG";
      setlbllog((prevState) => ({
        ...prevState,
        Visible: true,
        value: `Roll/Sht. length <> ${hfConnRollLength} digits / หมายเลขบาร์โค้ดยาว <> ${hfConnRollLength} ตัว`,
      }));
    }
    setlblResult((prevState) => ({
      ...prevState,
      Visible: true,
      value: _strScanResultAll,
    }));

    setHfScanResult(_strScanResultAll);

    await axios
      .post("/api/GetRollLeafTotalByLot", {
        LotNo: _strLot,
      })
      .then((res) => {
        console.log('GetRollLeafTotalByLot',res.data)
        setlbltotalSht(res.data);
      });
    if (_strScanResultAll == "NG") {
      setlblResult((prevState) => ({
        ...prevState,
        style: 'Red',
      }));
    } else {
      setlblResult((prevState) => ({
        ...prevState,
        style: 'Green',
      }));
    }

    if (!_bolPrdError) {
      console.log(_bolPrdError,'_bolPrdError1')
      setgvScanResult((prevState) => ({
        ...prevState,
        value: dtSheet,
        visble: true,
      }));
    } else {
      console.log(_bolPrdError,'_bolPrdError2')
      setgvScanResult((prevState) => ({
        ...prevState,
        value: "",
        visble: true,
      }));
    }
    if (hfAutoDownload == "N") {
      await getInitialSheet();
      if (lbllog.value != "") {
        settxtRollLeaf((prevState) => ({
          ...prevState,
          value: "",
          disbled: false,
        }));
        // pnlSerial.Visible = True
        SetGvSerial((prevState) => ({ ...prevState,visble: false }));
        setHfMode("SHEET");
      } else {
        SetMode("ROLL");
      }
      setTimeout(() => {
        fc_txtRollleaf.current.focus();
      }, 300);
    } else {
      settxtRollLeaf((prevState) => ({
        ...prevState,
        value: "",
        disbled: false,
      }));
      getInitialSheet();
    }
  };

  const handleTextFieldChange = (index, event) => {
    const newData = [...txtLeafNo];
    newData[index] = event.target.value;
    SettxtLeafNo(newData);
  };

  const ibtback_Click = () => {
    SetMode("LOT");
  };

  const columns = [
    {
      title: "No.",
      dataIndex: "SHT_SEQ",
      key: "No.",
      render: (text, record, index) => {
        return index + 1;
      },
      align: "center",
    },
    {
      title: "Roll/Sheet No.",
      dataIndex: "ROLL_LEAF",
      key: "Roll/Sheet No.",
      align: "left",
      render: (text, record, index) => {
          return text;
      },
    },
    {
      title: "Leaf No.",
      dataIndex: "SHT_NO",
      key: "Leaf No.",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },

    {
      title: "Scan Result",
      key: "Scan Result",
      dataIndex: "SCAN_RESULT",
      align: "center",
      render: (text, record, index) => {
        const backgroundColor =
        text === "NG" ? "#f50" :
        text === "OK" ? "#87d068" :
          "transparent";
       
        return (
          <Tag  color={backgroundColor} >
            {text}
          </Tag>
        );
      },
    },
    {
      title: "Remark",
      key: "Remark",
      dataIndex: "REMARK",
      align: "center",
      render: (text, record, index) => {
    
          return text;
        
      },
    },
    
  ];

  return {
    settxt_lotNo,
    txt_lotNo,
    handleLotxt_Lotno,
    sl_Product,
    Product,

    HandleSL_Product,
    lbllog,
    settxtRollLeaf,
    txtRollLeaf,
    gvScanResult,
    txtTotalLeaf,
    settxtTotalLeaf,
    lblCheckRoll,
    lbltotalSht,
    // StyleCheckRoll
    GvSerial,
    hfSerialCount,
    Bt_Save,
    txtOperator,
    hfRollNo,
    SettxtLeafNo,
    txtLeafNo,
    handleTextFieldChange,
    ibtback_Click,
    settxtOperator,
    lblResult,
    fc_txtRollleaf,
    fc_SlProduct,
    fc_GvSerial,
    fc_txtLotNo,
    fc_txtOperator,
    handletxtTotalLeaf,
    columns
  };
}

export { Fn_ScanSMTRollSht };