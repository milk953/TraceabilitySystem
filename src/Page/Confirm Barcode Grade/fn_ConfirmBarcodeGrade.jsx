import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function fn_ConfirmBarcodeGrade() {
  const [Product, setProduct] = useState([]);

  const [Check_Master, setCheck_Master] = useState(false);
  const [txt_lotNo, settxt_lotNo] = useState("");
  const [SlProduct, setSlProduct] = useState("");
  const [txtLotRef, settxtLotRef] = useState("");
  const [txtOperator, settxtOperator] = useState("");
  const [lblTotalSht, setlblTotalSht] = useState("");
  const [lblTotalPcs, setlblTotalPcs] = useState("");
  const [txtRollLeaf, settxtRollLeaf] = useState("");
  const [txtMachineNo, settxtMachineNo] = useState("");
  const [lblLog, setlblLog] = useState("");
  const [hfRollNo, sethfRollNo] = useState("");
  const [tableData, setTableData] = useState([]);
  const [lblConfirm, setlblConfirm] = useState("");
  const [lblResult, setlblResult] = useState("");
  const [dataGvSerial, setdataGvSerial] = useState("");
  const [dataGvBackSide, setdataGvBackSide] = useState("");
  const [gvScanResult, setgvScanResult] = useState("");
  const [txtSideBack, settxtSideBack] = useState("");
  const [txtSideFront, settxtSideFront] = useState("");
  const [txtSerial, settxtSerial] = useState("");

  //ซ่อน
  const [visibleRollLeaf, setvisibleRollLeaf] = useState('none');
  const [visibleLog, setvisibleLog] = useState(false);
  const [visibleMachine, setvisibleMachine] = useState('none');
  const [visiblpnlSerial, setvisiblepnlSerial] = useState(false);
  const [visiblgvBackSide, setvisiblgvBackSide] = useState(false);
  const [visiblgvSerial, setvisiblgvSerial] = useState(false);
  const [visiblegvScanResult, setvisiblegvScanResult] = useState(false);

  //Focus
  const fcRollleaf = useRef(null);
  const fctMachchine = useRef(null);
  const fcLotNo = useRef(null);
  const fcOperator = useRef(null);
  const fcProduct = useRef(null);
  const fcGvSerial = useRef(null);
  const fcGvBackSide_txtsideback_0 = useRef(null);
  const fcGvSerial_txtSerial_0 = useRef(null);

  //hf
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

  const CONNECT_SERIAL_ERROR = "999999";
  const hfBarcodeErrorValue = "NA";
  const AUTO_SCAN_CHECK_FLG = "0";

  // --------------------------------------231175237;231175237;231175237

  useEffect(() => {
    console.log("เข้าง");
    const fetchData = async () => {
      await GetProductData();
      console.log(hfShtScan, hfSerialCount, "getInitialSerial3");
      if (hfShtScan != "" && hfSerialCount != "") {
        getInitialSerial();
        console.log("x12");
      }
    };
    fetchData();
  }, [hfCheckRollSht, hfReqMachine, SlProduct, hfShtScan, hfSerialCount]);

  const GetProductData = async () => {
    axios.get("/api/Common/GetProductData").then((res) => {
      let data = res.data.flat();
      console.log(data[0].prd_name, "dataxxxxx");
      setProduct(data);
      //  setSlProduct(data[0].prd_name);
    });
  };

  const handletxt_Lotno = async () => {
    let strLot = "";
    let strPrdName = "";
    if (!Check_Master) {
      // console.log("Checkbox is not checked",Check_Master);
      const strLotData = txt_lotNo.toUpperCase().split(";");

      if (strLotData.length >= 2) {
        strLot = strLotData[0];
        console.log(strLot, "strLot");
        axios
          .post("/api/Common/getProductDataByLot", {
            strLot: strLot,
          })
          .then((res) => {
            setvisibleRollLeaf('none');
            sethfRollNo("");
            console.log(res.data.flat().flat(), "api");
            let data = res.data.flat().flat();
            if (data.length > 0) {
              console.log(data[0][0], "data");
              strPrdName = data[0][0];
              sethfRollNo(data[0][1]);
            }
            if (strPrdName != "") {
              setlblLog("");
              setvisibleLog(false);
              settxt_lotNo(strLot);
              settxtLotRef(strLot);
              getCountDataBylot(strLot);

              try {
                const isInArray = Product.some(
                  (item) => item.prd_name === strPrdName
                );
                console.log("strPrdName", Product, strPrdName);
                if (isInArray) {
                  console.log("เข้าis 1", strPrdName);
                  setSlProduct(strPrdName);
                  GetProductSerialMaster(strPrdName);
                  getInitialSheet();
                } else {
                  console.log("mayyyyyy1");
                  setSlProduct(strPrdName);
                  setlblLog(`Product ${strPrdName} not found.`);
                  setvisibleLog(true);
                  fcProduct.current.focus();
                  return;
                }
                if (hfCheckRollSht == "Y") {
                  setvisibleRollLeaf('');
                  settxtRollLeaf("");
                  fcRollleaf.current.focus();
                } else {
                  console.log("เข้าหรอ");
                  SetMode("SERIAL");
                  settxtMachineNo("");
                  if (hfReqMachine == "Y") {
                    setvisibleMachine('');
                    fctMachchine.current.focus();
                  } else {
                    setvisibleMachine('none');
                    console.log(fcGvBackSide_txtsideback_0,'fcGvBackSide_txtsideback_0')
                    fcGvBackSide_txtsideback_0.current.focus();
                  }
                }
              } catch (error) {
                console.error(error, "mayer");
                const intProduct = strPrdName.indexOf("-", 12);
                console.log(intProduct, "intProduct");
                if (intProduct > -1) {
                  strPrdName =
                    strPrdName.substring(0, intProduct) +
                    strPrdName
                      .substring(intProduct + 1, intProduct + 11)
                      .trim();
                  try {
                    if (hfCheckRollSht == "Y") {
                      setvisibleRollLeaf('');
                      settxtRollLeaf("");
                      fcRollleaf.current.focus();
                    } else {
                      console.log("setserialllllllllll3");
                      SetMode("SERIAL");
                      settxtMachineNo("");
                      if (hfReqMachine == "Y") {
                        setvisibleMachine('');
                        fctMachchine.current.focus();
                      } else {
                        setvisibleMachine('none');
                        fcGvBackSide_txtsideback_0.current.focus();
                      }
                    }
                  } catch (error) {
                    console.log("mayyyyyy3");
                    setlblLog(`Product ${strPrdName} not found.`);
                    setvisibleLog(true);
                    fcProduct.current.focus();
                  }
                } else {
                  console.log("mayyyyyy2");
                  setlblLog("Product " + strPrdName + " not found.");
                  setvisibleLog(true);
                  fcProduct.current.focus();
                }
              }
            } else {
              setSlProduct(Product[0].prd_name);
              settxt_lotNo("");
              setvisiblgvSerial(false);
              setlblLog("Invalid lot no.");
              setvisibleLog(true);
              setHfMode("LOT");
              fcLotNo.current.focus();
            }
          });
      } else {
        setSlProduct(Product[0].prd_name);
        settxt_lotNo("");
        setvisiblgvSerial(false);
        setlblLog("Please scan QR Code! / กรุณาสแกนที่คิวอาร์โค้ด");
        setvisibleLog(true);
        setHfMode("LOT");
        fcLotNo.current.focus();
      }
    } else {
      GetProductSerialMaster(SlProduct);
      fcProduct.current.focus();
    }
  };

  const getCountDataBylot = (strLot) => {
    setlblTotalSht("0");
    setlblTotalPcs("0");
    axios
      .post("/api/Common/getlotserialcountdata", {
        Lotno: strLot,
      })
      .then((res) => {
        if (res.data.length > 0) {
          console.log(res.data[0], "count");
          setlblTotalPcs(res.data[0].count_pcs);
          setlblTotalSht(res.data[0].count_sht);
        }
      });
  };

  const GetProductSerialMaster = async (strPrdName) => {
    let data = "";
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

    axios
      .post("/api/GetSerialProductByProduct", {
        prdName: strPrdName,
      })
      .then((res) => {
        data = res.data;
        console.log(data.PRM_REQ_CHECK_PRD_SHT, "data.PRM_REQ_CHECK_PRD_SHT");
        if (data != null) {
          setHfSerialLength(data.SLM_SERIAL_LENGTH);
          setHfSerialFixFlag(data.SLM_FIX_FLAG);
          setHfSerialDigit(data.SLM_FIX_DIGIT);
          setHfSerialStartDigit(data.SLM_FIX_START_DIGIT);
          setHfSerialEndDigit(data.SLM_FIX_END_DIGIT);
          setHfTrayFlag(data.SLM_TRAY_FLAG);
          setHfTrayLength(data.SLM_TRAY_LENGTH);
          setHfTestResultFlag(data.SLM_TEST_RESULT_FLAG);
          setHfSerialCount(data.SLM_SERIAL_SHT);
          setHfAutoScan(data.SLM_AUTO_SCAN);
          setHfBarcodeSide(data.SLM_BARCODE_SIDE);
          setHfShtScan(data.SLM_SHT_SCAN); //= dtProductSerial.Rows(data.0)(data."SLM_SHT_SCAN").ToString(data.)
          setHfConfigCheck(data.PRM_BARCODE_REQ_CONFIG); //= dtProductSerial.Rows(data.0)(data."PRM_BARCODE_REQ_CONFIG").ToString(data.).Trim
          setHfConfigCode(data.PRM_CONFIG_CODE); //= dtProductSerial.Rows(data.0)(data."PRM_CONFIG_CODE").ToString(data.).Trim
          setHfConfigStart(data.PRM_START_CONFIG); //= dtProductSerial.Rows(data.0)(data."PRM_START_CONFIG").ToString(data.).Trim
          setHfConfigEnd(data.PRM_END_CONFIG); // = dtProductSerial.Rows(data.0)(data."PRM_END_CONFIG").ToString(data.).Trim
          setHfConfigRuning(data.PRM_RUNNING_REQ_CONFIG); //= dtProductSerial.Rows(data.0)(data."PRM_RUNNING_REQ_CONFIG").ToString(data.).Trim
          setHfDuplicateStart(data.PRM_DUPLICATE_START); // = dtProductSerial.Rows(data.0)(data."PRM_DUPLICATE_START").ToString(data.).Trim
          setHfDuplicateEnd(data.PRM_DUPLICATE_END); //= dtProductSerial.Rows(data.0)(data."PRM_DUPLICATE_END").ToString(data.).Trim
          setHfCheckPrdSht(data.PRM_REQ_CHECK_PRD_SHT); //= dtProductSerial.Rows(data.0)(data."PRM_REQ_CHECK_PRD_SHT").ToString(data.).Trim
          setHfCheckPrdShtStart(data.PRM_CHECK_PRD_SHT_START); //= dtProductSerial.Rows(data.0)(data."PRM_CHECK_PRD_SHT_START").ToString(data.).Trim
          setHfCheckPrdShtEnd(data.PRM_CHECK_PRD_SHT_END); //= dtProductSerial.Rows(data.0)(data."PRM_CHECK_PRD_SHT_END").ToString(data.).Trim
          setHfCheckPrdAbbr(data.PRM_ABBR); //= dtProductSerial.Rows(data.0)(data."PRM_ABBR").ToString(data.).Trim
          setHfCheckLotSht(data.PRM_REQ_CHECK_LOT_SHT); //= dtProductSerial.Rows(0)("PRM_REQ_CHECK_LOT_SHT").ToString(data.).Trim
          setHfCheckLotShtStart(data.PRM_CHECK_LOT_SHT_START); //= dtProductSerial.Rows(0)("PRM_CHECK_LOT_SHT_START").ToString(data.).Trim
          setHfCheckLotShtEnd(data.PRM_CHECK_LOT_SHT_END); //= dtProductSerial.Rows(0)("PRM_CHECK_LOT_SHT_END").ToString(data.).Trim
          setHfCheckStartSeq(data.PRM_REQ_START_SEQ_FLG); //= dtProductSerial.Rows(0)("PRM_REQ_START_SEQ_FLG").ToString(data.).Trim
          setHfCheckStartSeqCode(data.PRM_START_SEQ_CODE); // = dtProductSerial.Rows(0)("PRM_START_SEQ_CODE").ToString(data.).Trim
          setHfCheckStartSeqStart(data.PRM_START_SEQ_START); //= dtProductSerial.Rows(0)("PRM_START_SEQ_START").ToString(data.).Trim
          setHfCheckStartSeqEnd(data.PRM_START_SEQ_END); //= dtProductSerial.Rows(0)("PRM_START_SEQ_END").ToString(data.).Trim
          setHfCheckSheetELT(data.PRM_SHEET_ELT_FLG); //= dtProductSerial.Rows(0)("PRM_SHEET_ELT_FLG").ToString(data.).Trim
          setHfCheckRollSht(data.PRM_CONN_ROLL_SHT_FLG); //= dtProductSerial.Rows(0)("PRM_CONN_ROLL_SHT_FLG").ToString(data.).Trim
          setHfCheckRollShtDigit(data.PRM_CONN_ROLL_SHT_LENGTH); //= dtProductSerial.Rows(0)("PRM_CONN_ROLL_SHT_LENGTH").ToString(data.).Trim
          setHfCheckDateInProc(data.PRM_DATE_INPROC_FLG); // = dtProductSerial.Rows(0)("PRM_DATE_INPROC_FLG").ToString(data.).Trim
          setHfDateInProc(data.PRM_DATE_INPROC); //= dtProductSerial.Rows(0)("PRM_DATE_INPROC").ToString(data.).Trim
          setHfWeekCodeType(data.PRM_DATE_TYPE); // = dtProductSerial.Rows(0)("PRM_DATE_TYPE").ToString(data.).Trim
          setHfCheckWeekCode(data.PRM_CHECK_WEEKCODE_FLG); //= dtProductSerial.Rows(0)("PRM_CHECK_WEEKCODE_FLG").ToString(data.).Trim
          setHfCheckWeekCodeStart(data.PRM_CHECK_WEEKCODE_START); //= dtProductSerial.Rows(0)("PRM_CHECK_WEEKCODE_START").ToString(data.).Trim
          setHfCheckWeekCodeEnd(data.PRM_CHECK_WEEKCODE_END); //= dtProductSerial.Rows(0)("PRM_CHECK_WEEKCODE_END").ToString(data.).Trim
          setHfCheckPreAOIF(data.PRM_SHT_PRE_AOI_F); //=// dtProductSerial.Rows(0)("PRM_SHT_PRE_AOI_F").ToString(data.).Trim
          setHfCheckPreAOIB(data.PRM_SHT_PRE_AOI_B); // = dtProductSerial.Rows(0)("PRM_SHT_PRE_AOI_B").ToString(data.).Trim
          setHfCheckAOIF(data.PRM_SHT_AOI_F); //= dtProductSerial.Rows(0)("PRM_SHT_AOI_F").ToString(data.).Trim
          setHfCheckAOIB(data.PRM_SHT_AOI_B); //dtProductSerial.Rows(0)("PRM_SHT_AOI_B").ToString(data.).Trim
          setHfCheckAOICoatF(data.PRM_SHT_AOI_COAT_F); // //May  = dtProductSerial.Rows(0)("PRM_SHT_AOI_COAT_F").ToString(data.).Trim
          setHfCheckAOICoatB(data.PRM_SHT_AOI_COAT_B); // //May = dtProductSerial.Rows(0)("PRM_SHT_AOI_COAT_B").ToString(data.).Trim
          setHfCheckSPIF(data.PRM_SHT_SPI_F); // = dtProductSerial.Rows(0)("PRM_SHT_SPI_F").ToString(data.).Trim
          setHfCheckSPIB(data.PRM_SHT_SPI_B); // = dtProductSerial.Rows(0)("PRM_SHT_SPI_B").ToString(data.).Trim
          setHfReqMachine(data.PRM_SHT_MACHINE_FLG); // = dtProductSerial.Rows(0)("PRM_SHT_MACHINE_FLG").ToString(data.).Trim
          setHfBarcodeGrade(data.PRM_BARCODE_GRADE); // = dtProductSerial.Rows(0)("PRM_BARCODE_GRADE").ToString(data.).Trim
          setHfConnRollLength(data.PRM_CONN_ROLL_LENGTH); //= dtProductSerial.Rows(0)("PRM_CONN_ROLL_LENGTH").ToString(data.).Trim
          setHfConnLeafLength(data.PRM_CONN_LEAF_LENGTH); //= dtProductSerial.Rows(0)("PRM_CONN_LEAF_LENGTH").ToString(data.).Trim
          setHfCheckRollPrdFlg(data.PRM_CONN_ROLL_PRD_FLG); // = dtProductSerial.Rows(0)("PRM_CONN_ROLL_PRD_FLG").ToString(data.).Trim
          setHfCheckRollPrdStart(data.PRM_CONN_ROLL_PRD_START); // = dtProductSerial.Rows(0)("PRM_CONN_ROLL_PRD_START").ToString(data.).Trim
          setHfCheckRollPrdEnd(data.PRM_CONN_ROLL_PRD_END); // = dtProductSerial.Rows(0)("PRM_CONN_ROLL_PRD_END").ToString(data.).Trim
          setHfCheckRollPrd(data.PRM_CONN_ROLL_PRD_FIX); // = dtProductSerial.Rows(0)("PRM_CONN_ROLL_PRD_FIX").ToString(data.).Trim
          setHfSerialStartCode(data.PRM_SERIAL_START_CODE); // = dtProductSerial.Rows(0)("PRM_SERIAL_START_CODE").ToString(data.).Trim
          setHfSerialInfo(data.PRM_ADDITIONAL_INFO); // //May = dtProductSerial.Rows(0)("PRM_ADDITIONAL_INFO").ToString(data.).Trim
          setHfCheckXrayF(data.PRM_SHT_XRAY_F); // = dtProductSerial.Rows(0)("PRM_SHT_XRAY_F").ToString(data.).Trim
          setHfCheckXrayB(data.PRM_SHT_XRAY_B); // = dtProductSerial.Rows(0)("PRM_SHT_XRAY_B").ToString(data.).Trim
          setHfCheckXrayOneTime(data.PRM_SHT_XRAY_1_TIME_FLG); // = dtProductSerial.Rows(0)("PRM_SHT_XRAY_1_TIME_FLG").ToString(data.).Trim
          setHfCheckFinInspect(data.PRM_FIN_GATE_INSPECT_FLG); // = dtProductSerial.Rows(0)("PRM_FIN_GATE_INSPECT_FLG").ToString(data.).Trim
          setHfCheckFinInspectProc(data.PRM_FIN_GATE_INSPECT_PROC); // = dtProductSerial.Rows(0)("PRM_FIN_GATE_INSPECT_PROC").ToString().Trim
        }
      });
  };

  const getInitialSheet = async () => {
    let dtData = [];
    for (let intRow = 0; intRow < hfShtScan; intRow++) {
      dtData.push({
        SEQ: intRow + 1,
        TITLE: hfBarcodeSide,
      });
    }

    setvisiblgvBackSide(true);
    setdataGvBackSide(dtData);
    return dtData;
  };

  const getInitialSerial = async () => {
    let dtData = [];
    console.log(hfShtScan, hfSerialCount, "getInitialSerial2");
    for (let intSht = 0; intSht < hfShtScan; intSht++) {
      console.log("iiii", intSht);
      for (let intRow = 0; intRow < hfSerialCount; intRow++) {
        console.log("jjjjj", intRow);
        dtData.push({
          SHEET: intSht + 1,
          SEQ: intRow + 1,
          TYPE: "PCS",
        });
      }
    }
    setvisiblgvSerial(true);

    setdataGvSerial(dtData);
    return dtData;
  };

  const ibtBack_Click = async () => {
    setSerialData();
    settxt_lotNo("");
    // txtLot.Enabled = True  ให้พิมได้
    setvisiblepnlSerial(false);
    setSlProduct(Product[0].prd_name);
    await SetMode("LOT");
    
    fcLotNo.current.focus();
  };

  const btnCancel_Click = async () => {
    await SetMode("SERIAL");
    fcGvSerial_txtSerial_0.current.focus();
  };

  const btnSave_Click = () => {
    SetMode("SERIAL");
    setSerialData();
    fcGvSerial_txtSerial_0.current.focus();
    if (hfMode == "SERIAL") {
    }
  };

  const handleSL_Product = async (value) => {
    setSlProduct(value);
    console.log("เข้าSL", value, txt_lotNo);
    GetProductSerialMaster(value);
    if (txt_lotNo != "") {
      setlblLog("");
      setvisibleLog(false);
      getCountDataBylot(txt_lotNo);
      getInitialSheet();
      if (hfCheckRollSht == "Y") {
        setvisibleRollLeaf('');
        settxtRollLeaf("");
        fcRollleaf.current.focus();
      } else {
        console.log("setserialllllllllll1");
        await SetMode("SERIAL");
        settxtMachineNo("");
        if (hfReqMachine == "Y") {
          setvisibleMachine('');
          fctMachchine.current.focus();
        } else {
          fcGvBackSide_txtsideback_0.current.focus();
        }
      }
    } else {
      setSlProduct(Product[0].prd_name);
      await SetMode("LOT");
    }
  };

  //เดี๋ยวมาทำใหม่งง
  const handleTxt_RollLeaf = () => {
    //เดี๋ยวมาทำใหม่งง
    setvisibleLog(false);
    setlblLog("");
    let strRollProduct = hfRollNo + hfCheckRollPrd;
    if (
      !Check_Master &&
      strRollProduct !==
        txtRollLeaf
          .trim()
          .toUpperCase()
          .substring(
            parseInt(hfCheckRollPrdStart),
            parseInt(hfCheckRollPrdEnd) - parseInt(hfCheckRollPrdStart) + 1
          )
    ) {
      // ทำสิ่งที่ต้องการทำ
      visibleLog("โชว์");
      setlblLog("Roll/Leaf No. mix product");
      setvisiblepnlSerial(false);
      setHfMode("ROLL");
      getInitialSheet();
      settxtRollLeaf("");
      fnSetFocus("txtRollLeaf")
    } else {
      console.log("setserialllllllllll2");
      SetMode("SERIAL");
      settxtMachineNo("");
      if (hfReqMachine == "Y") {
        setvisibleMachine('');
        fnSetFocus("txtMachineNo")
      } else {
        setvisibleMachine('none');
        fnSetFocus("gvBackSide_txtSideBack_0")
      }
    }
  };

  const handleTxt_LotRef = () => {
    if (txtOperator != "") {
      const strLotData = txtLotRef.trim().toUpperCase().split(";");
      settxtLotRef(strLotData[0]);
      fcOperator.current.focus();
    }
  };

  const SetMode = async (_strType) => {
    if (_strType == "LOT") {
      // ddlProduct.Enabled = True
      settxt_lotNo("");
      // txtLot.Enabled = True
      // txtLot.CssClass = "styleEnable"
      setvisibleLog(false);
      setvisiblepnlSerial(false);
      setHfMode("LOT");
      fcLotNo.current.focus();
    }
    if (_strType == "LOT_ERROR") {
      txtLot.Text = "";
      // txtLot.Enabled = True
      // txtLot.CssClass = "styleEnable"
      setvisibleLog(true);
      setvisiblepnlSerial(false);
      setHfMode("LOT");
      fcLotNo.current.focus();
    }
    if (_strType == "SERIAL") {
      // txtLot.Enabled = False
      // txtLot.CssClass = "styleDisable"
      setvisibleLog(false);
      setvisiblepnlSerial(true);
      setHfMode("SERIAL");
      console.log("geiiiiiii");
      await getInitialSerial();
    }
    if (_strType == "SERIAL_ERROR") {
      // txtLot.Enabled = False
      // txtLot.CssClass = "styleDisable"
      setvisibleLog(true);
    }
    if (_strType == "SERIAL_OK") {
      // txtLot.Enabled = False
      // txtLot.CssClass = "styleDisable"
      setvisibleLog(false);
      await getInitialSerial();
      fcGvSerial.current.focus();
    }
    if (_strType == "SERIAL_NG") {
      // txtLot.Enabled = False
      // txtLot.CssClass = "styleDisable"
      setvisibleLog(false);
    }
  };

  const getInputSerial = () => {
    let dtData = [];
    for (let intSht = 0; intSht < hfShtScan; intSht++) {
      console.log("txtSerial", txtSerial[intSht]);
      for (let intRow = 0; intRow < hfSerialCount; intRow++) {
        dtData.push({
          SHEET: intSht + 1,
          BACK_SIDE: txtSideBack[intSht],
          FRONT_SIDE: txtSideFront[intSht],
          SEQ: intRow + 1,
          SERIAL_GRADE:
            hfBarcodeErrorValue.includes(txtSerial[intRow]) && txtSerial[intRow]
              ? "X"
              : txtSerial[intRow]
              ? txtSerial[intRow].slice(-1)
              : "",
          SERIAL: txtSerial[intRow],
          GRADE_RESULT: "",
          SCAN_RESULT: txtSerial[intSht],
          REMARK: "",
          UPDATE_FLG: "N",
          MACHINE: txtMachineNo,
          PRODUCT: SlProduct,
        });
      }
    }
    console.log(dtData, "dtData");
    return dtData;
  };

  const setSerialData = () => {
    let dtSerial = getInputSerial();

    console.log(dtSerial, "dtSerial", txtLotRef, "-----", hfWeekCodeType);
    let _strLotData = "";
    let _strLotRefData = "";
    let _strLot = "";
    let _strLotRef = "";
    let _strPrdName = SlProduct;
    let _strShtNoBack = "";
    let _strShtNoFront = "";
    let _strTray = " ";
    let _intSeq = 1;
    let _strScanResultAll = "OK";
    let _strBarcodeResultAll = "OK";
    let _strErrorAll = "";
    let _strUpdateError = "";
    let _bolConfirm = false;
    setHfWeekCode("");
    let _bolError = false;

    const strLotData = txt_lotNo.toUpperCase().split(";");
    _strLot = strLotData[0];

    const strLotRefData = txtLotRef.toUpperCase().split(";");
    _strLotRef = strLotRefData[0];

    setvisibleLog(false);

    if (lblConfirm) {
      _bolConfirm = true;
    }
    setlblConfirm(false);

    if (txt_lotNo != "" && dtSerial.length > 0) {
      if (!Check_Master && hfCheckWeekCode == "Y") {
        axios
          .post("/api/Common/getWeekCodebyLot", {
            STRLOT: _strLot,
            STRPROC: hfDateInProc,
          })
          .then((res) => {
            console.log(res.data);
            setHfWeekCode(res.data);
          });
      }

      let _intRowSerial = 0;
      if (!Check_Master) {
        for (let i = 0; i < dtSerial.length; i++) {
          _strShtNoBack = dtSerial[i].BACK_SIDE;
          _strShtNoFront = dtSerial[i].FRONT_SIDE;
          console.log(_strShtNoBack);
          if (hfCheckPrdSht == "Y" && dtSerial[i].SEQ == "1") {
            const start = parseInt(hfCheckPrdShtStart);
            const end = parseInt(hfCheckPrdShtEnd);
            const substringBack = _strShtNoBack.substring(start, end + 1);
            const substringFront = _strShtNoFront.substring(start, end + 1);
            if (hfCheckPrdAbbr !== substringBack) {
              _strScanResultAll = "NG";
              _strErrorAll = "Sheet product mix";
              _bolError = true;
            }
            if (hfCheckPrdAbbr !== substringFront) {
              _strScanResultAll = "NG";
              _strErrorAll = "Sheet product mix";
              _bolError = true;
            }
          }

          if (hfCheckLotSht == "Y" && dtSerial[i].SEQ == "1") {
            const start = parseInt(hfCheckLotShtStart);
            const end = parseInt(hfCheckLotShtEnd);
            const substringBack = _strShtNoBack.substring(start, end + 1);
            const substringFront = _strShtNoFront.substring(start, end + 1);
            if (_strLotRef !== substringFront) {
              _strScanResultAll = "NG";
              _strErrorAll = "Sheet lot mix";
              _bolError = true;
            }
            if (_strLotRef !== substringBack) {
              _strScanResultAll = "NG";
              _strErrorAll = "Sheet lot mix";
              _bolError = true;
            }
          }

          if (
            hfConnLeafLength > 0 &&
            (hfConnLeafLength !== _strShtNoBack.length ||
              hfConnLeafLength !== _strShtNoFront.length) &&
            !_bolError
          ) {
            _strScanResultAll = "NG";
            _strErrorAll = "Invalid sheet no.";
            _bolError = true;
          }
          if (txtOperator == "") {
            _strScanResultAll = "NG";
            _strErrorAll = "Invalid operator";
            _bolError = true;
          }

          if (hfReqMachine == "Y") {
            if (txtMachineNo == "") {
              _strScanResultAll = "NG";
              _strErrorAll = "Invalid machine no";
              _bolError = true;
            }

            if (dtSerial[i].SERIAL != "") {
              let _strSerial = dtSerial[i].SERIAL;
              let _strTestResult = "NONE";
              let _strMessageUpdate = "";
              let _strScanResultUpdate = "";
              if (_strSerial != CONNECT_SERIAL_ERROR) {
                for (
                  let _intRow = _intRowSerial + 1;
                  _intRow < dtSerial.length;
                  _intRow++
                ) {
                  if (_strSerial == dtSerial[_intRow].SERIAL) {
                    _strScanResultUpdate = "NG";
                    _strMessageUpdate = "Serial duplicate/หมายเลขบาร์โค้ดซ้ำ";
                    _strScanResultAll = "NG";
                    _bolError = true;
                    _strErrorAll = "Serial duplicate/หมายเลขบาร์โค้ดซ้ำ";
                  }
                }
                if (_strSerial.length == hfSerialLength) {
                  let _strFixDigit = "";
                  const start = parseInt(hfSerialStartDigit);
                  const end = parseInt(hfSerialEndDigit);
                  _strFixDigit = _strSerial.substring(start, end + 1);
                  if (_strFixDigit != hfSerialDigit) {
                    _strScanResultUpdate = "NG";
                    _strMessageUpdate =
                      "Serial barcode mix product/หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
                    _strScanResultAll = "NG";
                    _bolError = true;
                  } else if (hfConfigCheck == "Y") {
                    let _strConfigDigit = "";
                    const Start = parseInt(hfConfigStart);
                    const End = parseInt(hfConfigEnd);
                    _strConfigDigit = _strSerial.substring(Start, End + 1);
                    if (_strConfigDigit != hfConfigCode) {
                      _strScanResultUpdate = "NG";
                      _strMessageUpdate =
                        "Serial barcode mix product/หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
                      _strScanResultAll = "NG";
                      _bolError = true;
                    }
                  }

                  if (hfSerialStartCode.trim() !== "" && !_bolError) {
                    if (
                      _strSerial.substring(0, hfSerialStartCode.length) !==
                      hfSerialStartCode
                    ) {
                      _strScanResultUpdate = "NG";
                      _strMessageUpdate =
                        "Serial barcode mix product/หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
                      _strScanResultAll = "NG";
                      _bolError = true;
                    }
                  }
                  if (hfCheckStartSeq == "Y" && _strScanResultUpdate != "NG") {
                    let _strStartSeq = "";
                    const start = parseInt(hfCheckStartSeqStart);
                    const end = parseInt(hfCheckStartSeqEnd);
                    _strStartSeq = _strSerial.substring(start, end + 1);
                    if (_strStartSeq != hfCheckStartSeqCode) {
                      _strScanResultUpdate = "NG";
                      _strMessageUpdate =
                        "Serial barcode mix product/หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
                      _strScanResultAll = "NG";
                      _bolError = true;
                    }
                  }

                  if (hfCheckWeekCode == "Y" && _strScanResultUpdate != "NG") {
                    let _strWeekCode = "";
                    const start = parseInt(hfCheckWeekCodeStart);
                    const end = parseInt(hfCheckWeekCodeEnd);
                    _strWeekCode = _strSerial.substring(start, end + 1);
                    if (_strWeekCode != hfWeekCode) {
                      _strScanResultUpdate = "NG";
                      _strMessageUpdate =
                        "Serial barcode mix week code/หมายเลขบาร์โค้ดปนรหัสสัปดาห์กัน";
                      _strScanResultAll = "NG";
                      _bolError = true;
                    }
                  }
                } else {
                  _strScanResultUpdate = "NG";
                  _strMessageUpdate =
                    "Serial not matching product/หมายเลขบาร์โค้ดไม่ตรงตามที่กำหนดไว้";
                  _strScanResultAll = "NG";
                  _bolError = True;
                }
                if (_strScanResultUpdate != "NG") {
                  let _inCountSeq = 0;
                  let _strSerialNoDup = "";
                  let serial = _strSerial.substring(
                    parseInt(hfDuplicateStart),
                    parseInt(hfDuplicateEnd) - parseInt(hfDuplicateStart) + 1
                  );
                  axios
                    .post("/api/Common/GetSerialDuplicateConnectSht", {
                      Serial: serial,
                    })
                    .then((res) => {
                      _inCountSeq = res.data;
                      if (_inCountSeq > 0) {
                        _strScanResultUpdate = "NG";
                        _strMessageUpdate =
                          "Serial duplicate/หมายเลขบาร์โค้ดซ้ำ";
                        _strScanResultAll = "NG";
                        _bolError = true;

                        _strErrorAll = "Serial duplicate/หมายเลขบาร์โค้ดซ้ำ";
                        _strUpdateError = "Serial duplicate/หมายเลขบาร์โค้ดซ้ำ";
                      }
                    });
                }
              } else {
                _strMessageUpdate =
                  "Bad mark piece/ชิ้นงานเสียทำเครื่องหมายไว้แล้ว";
              }
              if ((_strMessageUpdate = "")) {
                dtSerial[i].UPDATE_FLG = "Y";
                console.log(_strMessageUpdate, "_strMessageUpdate1");
              } else {
                dtSerial[i].UPDATE_FLG = "N";
                console.log(_strMessageUpdate, "_strMessageUpdate2");
              }
              dtSerial[i].SCAN_RESULT = _strScanResultUpdate;
              dtSerial[i].REMARK = _strMessageUpdate;
            }
            _intRowSerial += 1;
          }
        }
      }

      //-----

      if (!Check_Master && hfWeekCodeType == "S" && _bolError == false) {
        console.log("เข้สมั้ยนะะะ", _strLotRef);
        let _strReturn = "";
        _strReturn = GetShippingSerialNo(dtSerial, _strLotRef, hfWeekCodeType);
        console.log(dtSerial, "mmmmmmaaaaa");
        if (_strReturn != "") {
          _strScanResultAll = "NG";
          _bolError = true;
          if (_strReturn != "NG") {
            setvisibleLog(true);
            setlblLog(_strReturn);
          }
        }
      }
      if (!Check_Master && hfCheckSheetELT == "Y") {
        let _strReturn = "";
        // _strReturn = BIZ_ScanSMTSerial.SetSerialLotShtELTTable(Session("PLANT_CODE"), _strLot, dtSerial, txtOperator.Text.Trim, hfUserStation.Value, Session("PRODUCT_KIND"), hfSerialLength.Value, ddlProduct.SelectedValue)
        // If _strReturn.Trim <> "" Then
        //     _strScanResultAll = "NG"
        //     _bolError = True
        //     If _strReturn <> "NG" Then
        //         pnlLog.Visible = True
        //         lblLog.Text = _strReturn
        //     End If
        // End If
      }
      for (let i = 0; i < dtSerial.length; i++) {
        if (!Check_Master) {
          if (dtSerial[i].SERIAL != "" && dtSerial[i].SCAN_RESULT != "NG") {
            let _intCount = 0;
            let _intCountOK = 0;
            let _intCountNG = 0;
            let _strRemark = "";
            let _strError = "";
            let _strSerial = dtSerial[i].SERIAL;
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
            if (_strSerial == CONNECT_SERIAL_ERROR) {
              _strMessageUpdate =
                "Bad mark piece/ชิ้นงานเสียทำเครื่องหมายไว้แล้ว";
              _strScanResultUpdate = "OK";
            }
            if (
              AUTO_SCAN_CHECK_FLG == "1" &&
              _strSerial != CONNECT_SERIAL_ERROR
            ) {
              let _Result = "";
              let _FrontSheetBarcode = "";
              let _RearSheetBarcode = "";
              if (hfBarcodeSide == "F") {
                _FrontSheetBarcode = dtSerial[i].FRONT_SIDE;
                _RearSheetBarcode = dtSerial[i].BACK_SIDE;
              } else {
                _FrontSheetBarcode = dtSerial[i].BACK_SIDE;
                _RearSheetBarcode = dtSerial[i].FRONT_SIDE;
              }
              // _Result = BIZ_ScanSMTSerial.Get_SPI_AOI_RESULT(Session("PLANT_CODE"), _intSeq, Session("PRODUCT_KIND"), _FrontSheetBarcode, _RearSheetBarcode, _strPrdName, _Message)
              if (_Result == "NG") {
                _strScanResultUpdate = _Result;
              }
              _strMessageUpdate = _Message;
              if (_strError != "") {
                _strMessageUpdate = _strError;
                _strScanResultUpdate = "NG";
                _bolError = true;
              } else {
                dtSerial[i].UPDATE_FLG = "Y";
              }
            }
            if (_strScanResultUpdate == "NG") {
              _strScanResultAll = "NG";
            }
            if (_strError == "" && dtSerial[i].UPDATE_FLG == "Y") {
              const serialGrade = dtSerial[i].SERIAL_GRADE;
              if (!hfBarcodeGrade.includes(serialGrade)) {
                _strScanResultUpdate = "NG";
                _strMessageUpdate = `Barcode grade ${dtSerial[i].SERIAL_GRADE} not accept/คุณภาพบาร์โค้ด ${dtSerial[i].SERIAL_GRADE} ไม่ผ่าน`;
                // drRow("UPDATE_FLG") = "N"
                dtSerial[i].UPDATE_FLG = "N";
              }
            }
            dtSerial[i].SCAN_RESULT = _strScanResultUpdate;
            dtSerial[i].REMARK = _strMessageUpdate;
          } else {
            if (dtSerial[i].SERIAL_GRADE != "") {
              dtSerial[i].UPDATE_FLG = "Y";
            }
          }

          if (
            dtSerial[i].SERIAL_GRADE !== "" &&
            hfBarcodeGrade.includes(dtSerial[i].SERIAL_GRADE)
          ) {
            dtSerial[i].GRADE_RESULT = "OK";
          } else if (dtSerial[i].SERIAL_GRADE !== "") {
            dtSerial[i].GRADE_RESULT = "NG";
            dtSerial[i].SCAN_RESULT = "NG";
            _strBarcodeResultAll = "NG";
          } else {
            dtSerial[i].GRADE_RESULT = "";
          }
          _intSeq = _intSeq + 1;
        }
      }
      if (!Check_Master && hfCheckRollSht == "Y") {
        if (txtRollLeaf.length == parseInt(hfConnRollLength)) {
          if (txtRollLeaf) {
            //BIZ_ScanSMTSerial.GetRollLeafScrapRBMP(txtRollLeaf.Text.Trim) = "Y" Then
            _bolError = true;
            _strScanResultAll = "NG";
            _strUpdateError = "Problem sheet from RBMP";
            _strErrorAll = "Problem sheet from RBMP";
          } else {
            let dtRowLeaf = getConnectRollSheetData(
              dtSerial,
              SlProduct,
              txtRollLeaf
            );
            let _intCount = 0;
            let _strRollLeaf = txtRollLeaf;
            // _intCount = BIZ_ScanSMTSerial.GetRollLeafDuplicate(Session("PLANT_CODE"), Session("PRODUCT_KIND"), _strRollLeaf, dtRowLeaf)
            if ((_intCount = 1)) {
              _bolError = true;
              for (let i = 0; i < dtRowLeaf.length; i++) {
                dtRowLeaf[i].UPDATE_FLG = "N";
                dtRowLeaf[i].ROW_UPDATE = "N";
                dtRowLeaf[i].SCAN_RESULT = "NG";
                dtRowLeaf[i].REMARK =
                  "Roll/Sheet barcode duplicate/หมายเลขบาร์โค้ดซ้ำ";
                _intCount += 1;
              }
              _strUpdateError = "Roll/Sheet barcode duplicate";
              _strErrorAll = "Roll/Sheet barcode duplicate";
            }
            if (hfCheckRollPrdFlg == "Y") {
              let strRollProduct = hfRollNo + hfCheckRollPrd;
              if (
                strRollProduct !==
                _strRollLeaf.substring(
                  parseInt(hfCheckRollPrdStart),
                  parseInt(hfCheckRollPrdEnd) + 1
                )
              ) {
                _bolError = true;
                _strScanResultAll = "NG";
                for (let i = 0; i < dtRowLeaf.length; i++) {
                  dtRowLeaf[i].UPDATE_FLG = "N";
                  dtRowLeaf[i].ROW_UPDATE = "N";
                  dtRowLeaf[i].SCAN_RESULT = "NG";
                  dtRowLeaf[i].REMARK =
                    "Roll/Sheet not matching product/หมายเลขบาร์โค้ดไม่ตรงกับผลิตภัณฑ์";
                  _intCount += 1;
                }
                _strUpdateError = "Roll/Sheet not matching product";
                _strErrorAll = "Roll/Sheet not matching product";
              }
            }
            if (
              dtRowLeaf.length > 0 &&
              (_strBarcodeResultAll != "NG" || _bolConfirm)
            ) {
              // _strUpdateError = BIZ_ScanSMTSerial.SetRollSheetTrayTable(Session("PLANT_CODE"), dtRowLeaf, txtOperator.Text.Trim, hfUserStation.Value, Session("PRODUCT_KIND"))
            }
          }
        } else {
          _strScanResultAll = "NG";
          _strUpdateError = "Roll leaf no. incorrect.";
          _strErrorAll = "Roll leaf no. incorrect.";
        }
      }
      let _strMasterSheet = "N";
      if (Check_Master) {
        _strMasterSheet = "Y";
      }
      if (
        (_strScanResultAll != "NG" && _strBarcodeResultAll != "NG") ||
        _bolConfirm
      ) {
        // _strUpdateError = BIZ_ScanSMTSerial.SetSerialLotShtGradeTable(Session("PLANT_CODE"), _strLot, dtSerial, dtSerial.Rows(0)("FRONT_SIDE"), dtSerial.Rows(0)("BACK_SIDE"), _intSeq, "", txtOperator.Text.Trim, hfUserStation.Value, hfBarcodeSide.Value, Session("PRODUCT_KIND"), CInt(hfSerialLength.Value), ddlProduct.SelectedValue, hfCheckSheetELT.Value, _strMasterSheet)
        if (_strUpdateError != "") {
          _strScanResultAll = "NG";
          _strErrorAll = _strUpdateError;
        }
      }
      if (_strBarcodeResultAll == "NG") {
        _strScanResultAll = _strBarcodeResultAll;
      }
      setlblResult(_strScanResultAll);
      if (_strScanResultAll == "NG") {
        // lblResult.ForeColor = Drawing.Color.Red
      } else {
        // lblResult.ForeColor = Drawing.Color.Green
      }
      if (_strErrorAll != "") {
        setlblResult(_strScanResultAll + _strErrorAll);
      }
      if (_strBarcodeResultAll != "NG" || _bolConfirm) {
        setgvScanResult(dtSerial);
        setvisiblegvScanResult();
        getInitialSheet();
        getInitialSerial();
        getCountDataBylot(txt_lotNo);
        txtMachineNo("");
        if (hfReqMachine == "Y") {
          setvisibleMachine('');
      
          fctMachchine.current.focus();
        } else {
          fcGvBackSide_txtsideback_0.current.focus();
        }
      } else {
        setgvScanResult(dtSerial);
        setvisiblegvScanResult(true);
        setlblConfirm(true);
      }
    } else {
      setlblLog("Please input Sheet Side No. !!! ");
      SetMode("SERIAL_ERROR");
      // fnPlaySound()
      getCountDataBylot(txt_lotNo);
      settxtMachineNo("");
      if (hfReqMachine == "Y") {
        setvisibleMachine('');
        // fnSetFocus("txtMachineNo")
        fctMachchine.current.focus();
      } else {
       
        fcGvBackSide_txtsideback_0.current.focus();
      }
    }
  };
  const getConnectRollSheetData = (_dtSerial, _strProduct, _strRollLeaf) => {
    let _dtData = [];
    let _intRollRow = 1;
    let _intRow = 0;
    let _strShtNoOld = "";
    let _strRollNo = "";
    _strRollNo = hfRollNo;
    for (let i = 0; i < _dtSerial.length; i++) {
      if (
        _dtSerial[i].FRONT_SIDE != _strShtNoOld &&
        _dtSerial[i].FRONT_SIDE != ""
      ) {
        let _drShtRow = {
          ROLL_SEQ: _intRollRow,
          SHT_SEQ: _intRow,
          ROLL_NO: _strRollNo,
          ROLL_LEAF: _strRollLeaf,
          SHT_NO:
            hfBarcodeSide === "F"
              ? _dtSerial[i].FRONT_SIDE
              : _dtSerial[i].BACK_SIDE,
          SCAN_RESULT: "",
          REMARK: "",
          ROW_UPDATE: "Y",
          UPDATE_FLG: "N",
          MACHINE: txtMachineNo,
          PRODUCT: _strProduct,
          LOT_NO: txt_lotNo,
        };
        _dtData.push(_drShtRow);
        if (_dtSerial[i].FRONT_SIDE != _dtSerial[i].BACK_SIDE) {
          _intRow += 1;
          let _drShtRow2 = {
            ROLL_SEQ: _intRollRow,
            SHT_SEQ: _intRow,
            ROLL_NO: _strRollNo,
            ROLL_LEAF: _strRollLeaf,
            SHT_NO:
              hfBarcodeSide === "F"
                ? _dtSerial[i].BACK_SIDE
                : _dtSerial[i].FRONT_SIDE,
            SCAN_RESULT: "",
            REMARK: "",
            ROW_UPDATE: "Y",
            UPDATE_FLG: "N",
            MACHINE: txtMachineNo,
            PRODUCT: _strProduct,
            LOT_NO: txt_lotNo,
          };
          _dtData.push(_drShtRow2);
        }
      }
      _strShtNoOld = _dtSerial[i].FRONT_SIDE;
    }
    return _dtData;
  };

  const ChangeBase34 = (num) => {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return chars[num];
  };

  const ConvertBase34 = (lngNumber2) => {
    let shou;
    let Amari = [];
    let i = 0;
    let StrTemp = "";
    let LngNumber = lngNumber2;
    console.log(lngNumber2);
    do {
      Amari[i] = LngNumber % 34;
      shou = Math.floor(LngNumber / 34);
      if (shou === 0) {
        break;
      }
      i++;
      if (shou < 34) {
        Amari[i] = shou;
        break;
      }
      LngNumber = shou;
    } while (true);

    for (let j = i; j >= 0; j--) {
      StrTemp += ChangeBase34(Amari[j]);
    }

    return StrTemp;
  };

  const Convert0000 = (strText) => {
    return ("0000" + strText).slice(-4);
  };

  const GetShippingSerialNo = (dtSerial, strLotNo, strWeekType) => {
    let _strReturn = "";
    let _intSeq = 1;
    console.log(
      parseInt(strLotNo.substring(1, 2)),
      parseInt(strLotNo.substring(2, 3)),
      parseInt(strLotNo.substring(3, 4))
    );
    let _strLotBase34_1 = ConvertBase34(
      parseInt(strLotNo.substring(1, 2)) +
        parseInt(strLotNo.substring(2, 3)) +
        parseInt(strLotNo.substring(3, 4))
    );

    let _strLotBase34_4 = Convert0000(
      ConvertBase34(parseInt(strLotNo.substring(4, 10)))
    );
    for (let i = 0; i < dtSerial.length; i++) {
      let _strResult = "OK";
      let _strRemark = "";
      if (strWeekType == "S") {
        if (
          _strLotBase34_1 != dtSerial[i].SERIAL.charAt(10) ||
          _strLotBase34_4 != dtSerial[i].SERIAL.charAt(19, 23)
        ) {
          _strReturn = "NG";
          _strResult = "NG";
          _strRemark = "Serial mix lot";
        } else {
          if (dtSerial[i].SEQ != dtSerial[i].SERIAL.charAt(11, 12)) {
            _strReturn = "NG";
            _strResult = "NG";
            _strRemark = "Serial mix strip";
          } else {
            if (_intSeq == 1) {
              _strShetSeq = dtSerial[i].SERIAL.charAt(7, 10);
            } else {
              if (dtSerial[i].SERIAL.charAt(7, 10) != _strShetSeq) {
                _strReturn = "NG";
                _strResult = "NG";
                _strRemark = "Serial mix sheet";
              }
            }
          }
        }
      }
      dtSerial[i].SCAN_RESULT = _strResult;
      dtSerial[i].REMARK = _strRemark;
      _intSeq += 1;
    }
    console.log(dtSerial, "ddddd");
    return _strReturn;
  };

  const handleTxt_Opreator = async () => {
    if (txtOperator != "") {
      if (hfCheckRollSht == "Y") {
        setvisibleRollLeaf('');
        settxtRollLeaf("");
        fcRollleaf.current.focus();
      } else {
        await SetMode("SERIAL");
        settxtMachineNo("");
        if (hfReqMachine == "Y") {
          setvisibleMachine('');
          fctMachchine.current.focus();
        }
      }
    } else {
      settxtOperator("");
      fnSetFocus("txtOperator");
    }
  };

  const handleFrontSideChange = (index, event) => {
    const newValues = [...txtSideFront];
    newValues[index] = event.target.value;
    settxtSideFront(newValues);
    console.log(newValues, "settxtSideFront");
  };

  const handleBackSideChange = (index, event) => {
    const newValues = [...txtSideBack];
    newValues[index] = event.target.value;
    settxtSideBack(newValues);
    console.log(newValues, "settxtSideFront");
  };

  const handleSerialChange = (index, event) => {
    const newValues = [...txtSerial];
    newValues[index] = event.target.value;
    settxtSerial(newValues);
    console.log(newValues, "settxtSideFront");
  };

  return {
    settxt_lotNo,
    txt_lotNo,
    handletxt_Lotno,
    Product,
    Check_Master,
    setCheck_Master,
    SlProduct,
    setSlProduct,
    txtLotRef,
    settxtLotRef,
    settxtOperator,
    txtOperator,
    lblTotalPcs,
    lblTotalSht,
    txtRollLeaf,
    settxtRollLeaf,
    txtMachineNo,
    settxtMachineNo,
    ibtBack_Click,
    handleSL_Product,
    visiblgvBackSide,
    hfBarcodeSide,
    hfShtScan,
    hfSerialCount,
    visiblgvSerial,
    lblLog,
    visibleLog,
    txtSerial,
    txtSideBack,
    txtSideFront,
    settxtSideBack,
    settxtSideFront,
    settxtSerial,
    handleBackSideChange,
    handleFrontSideChange,
    handleSerialChange,
    gvScanResult,
    lblResult,
    btnCancel_Click,
    btnSave_Click,
    handleTxt_RollLeaf,
    handleTxt_LotRef,
    handleTxt_Opreator,
    visiblegvScanResult,
    fcRollleaf,
    fctMachchine,
    fcLotNo,
    fcOperator,
    fcProduct,
    fcGvSerial,
    fcGvBackSide_txtsideback_0,
    fcGvSerial_txtSerial_0,
    visibleRollLeaf,
    visibleMachine
  };
}

export { fn_ConfirmBarcodeGrade };
// _intRow += 1
// _dtData[i].ROLL_SEQ=_intRollRow
// _dtData[i].SHT_SEQ=_intRow
// _dtData[i].ROLL_NO=_strRollNo
// _dtData[i].ROLL_LEAF=_strRollLeaf
// if (hfBarcodeSide=='F'){
//   _dtData[i].SHT_NO=_dtSerial[i].FRONT_SIDE
// }else{
//   _dtData[i].SHT_NO=_dtSerial[i].BACK_SIDE
// }
// _dtData[i].SCAN_RESULT=""
// _dtData[i].REMARK=""
// _dtData[i].ROW_UPDATE="Y"
// _dtData[i].UPDATE_FLG="N"
// _dtData[i].MACHINE=txtMachineNo
// _dtData[i].PRODUCT=_strProduct
// _dtData[i].LOT_NO=txt_lotNo
// if(_dtSerial[i].FRONT_SIDE!=_dtSerial[i].BACK_SIDE){
//   _intRow += 1
// }
