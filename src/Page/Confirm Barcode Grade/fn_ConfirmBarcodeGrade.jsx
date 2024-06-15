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
  //ซ่อน
  const [visibleRollLeaf, setvisibleRollLeaf] = useState("");
  const [visibleLog, setvisibleLog] = useState("");
  const [visibleMachine, setvisibleMachine] = useState("");
  const [visiblpnlSerial, setvisiblepnlSerial] = useState("");
  const [visiblgvBackSide, setvisiblgvBackSide] = useState(false);
  const [visiblgvSerial, setvisiblgvSerial] = useState(false);

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

  // --------------------------------------

  useEffect(() => {
    const fetchData = async () => {
      await GetProductData();
      // await GetProductData2()
      console.log("HfSerialLength", hfSerialLength, hfReqMachine);
    };
    fetchData();
  }, [hfCheckRollSht, hfReqMachine, SlProduct]);

  const GetProductData = async () => {
    axios.get("/api/Common/GetProductData").then((res) => {
      let data = res.data.flat();
      console.log(data, "dataxxxxx");
      setProduct(data);
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
            Lotno: strLot,
          })
          .then((res) => {
            //console.log(res.data,'api')
            setvisibleRollLeaf(false);
            sethfRollNo("");
            let data = res.data.flat().flat();
            if (data.length > 0) {
              //console.log(data[0][0],'data')
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
                console.log("เข้าๅๅๅ", strPrdName);
                setSlProduct(strPrdName);
                GetProductSerialMaster(strPrdName);
                getInitialSheet();
                if (hfSerialLength == "Y") {
                  setvisibleRollLeaf(true);
                  settxtRollLeaf("");
                  fcRollleaf.current.focus();
                } else {
                  SetMode("SERIAL");
                  settxtMachineNo("");
                  if (hfReqMachine == "Y") {
                    setvisibleMachine(true);
                    fctMachchine.current.focus();
                  } else {
                    setvisibleMachine(false);
                    fcGvBackSide_txtsideback_0.current.focus();
                  }
                }
              } catch (error) {
                const intProduct = strPrdName.indexOf("-", 12);
                if (intProduct > 0) {
                  const part1 = strPrdName.substring(0, intProduct);
                  const part2 = strPrdName
                    .substring(intProduct + 1, intProduct + 11)
                    .trim(); // 10 characters after the found position
                  strPrdName = part1 + part2;
                  try {
                    setSlProduct(strPrdName);
                    GetProductSerialMaster(strPrdName);
                    getInitialSheet();
                    if (hfSerialLength == "Y") {
                      setvisibleRollLeaf(true);
                      settxtRollLeaf("");
                      fcRollleaf.current.focus();
                    } else {
                      SetMode("SERIAL");
                      settxtMachineNo("");
                      if (hfReqMachine == "Y") {
                        setvisibleMachine(true);
                        fctMachchine.current.focus();
                      } else {
                        setvisibleMachine(false);
                        fcGvBackSide_txtsideback_0.current.focus();
                      }
                    }
                  } catch (error) {
                    console.error("Error ", error);
                  }
                } else {
                  setlblLog("Product " + strPrdName + " not found.");
                  setvisibleLog(true);
                  // fnSetFocus("ddlProduct")
                }
              }
            } else {
              setSlProduct(Product[0].prd_name);
              settxt_lotNo("");
              // gvSerial.DataSource = Nothing
              // gvSerial.DataBind()
              setlblLog("Please scan QR Code! / กรุณาสแกนที่คิวอาร์โค้ด");
              setvisibleLog(true);
              setHfMode("LOT");

              fcLotNo.current.focus();
            }
          });
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
        console.log(data.PRM_DATE_INPROC, "data.PRM_DATE_INPROC");
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
    setTimeout(() => {
      setvisiblgvBackSide(true);
    }, 1000);
  };
  const getInitialSerial = () => {
    setTimeout(() => {
      setvisiblgvSerial(true);
    }, 1000);
  };
  const ibtBack_Click = () => {
    setSerialData();
    settxt_lotNo("");
    // txtLot.Enabled = True  ให้พิมได้
    setvisiblepnlSerial(false);
    setSlProduct(Product[0].prd_name);
    SetMode("LOT");
    // fnSetFocus("txtLot")
    fcLotNo.current.focus();
  };
  const btnCancel_Click = () => {
    SetMode("SERIAL");
    fcGvSerial_txtSerial_0.current.focus();
  };
  const btnSave_Click = () => {
    SetMode("SERIAL");
    fcGvSerial_txtSerial_0.current.focus();
    if (hfMode == "SERIAL") {
      // setSerialData()
    }
  };
  const handleSL_Product = (value) => {
    setSlProduct(value);
    console.log("เข้าSL", value, txt_lotNo);
    GetProductSerialMaster(value);
    if (txt_lotNo != "") {
      setlblLog("");
      setvisibleLog(false);
      getCountDataBylot(txt_lotNo);
      getInitialSheet();
      if (hfCheckRollSht == "Y") {
        setvisibleRollLeaf(true);
        settxtRollLeaf("");
        fcRollleaf.current.focus();
      } else {
        SetMode("SERIAL");
        settxtMachineNo("");
        if (hfReqMachine == "Y") {
          setvisibleMachine(true);
          fctMachchine.current.focus();
        } else {
          fcGvBackSide_txtsideback_0.current.focus();
        }
      }
    } else {
      setSlProduct(Product[0].prd_name);
      SetMode("LOT");
    }
  };
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
      // fnSetFocus("txtRollLeaf")
    } else {
      SetMode("SERIAL");
      settxtMachineNo("");
      if (hfReqMachine == "Y") {
        setvisibleMachine(true);
        // fnSetFocus("txtMachineNo")
      } else {
        setvisibleMachine(false);
        // fnSetFocus("gvBackSide_txtSideBack_0")
      }
    }
  };

  const handleTxt_LotRef = () => {
    if (txtOperator != "") {
      const strLotData = txtLotRef.trim().toUpperCase().split(";");
      settxtLotRef(strLotData[0]);
      // fnSetFocus("txtOperator")
      fcOperator.current.focus();
    }
  };
  const SetMode = (_strType) => {
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
      getInitialSerial();
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
      getInitialSerial();
      fcGvSerial.current.focus();
    }
    if (_strType == "SERIAL_NG") {
      // txtLot.Enabled = False
      // txtLot.CssClass = "styleDisable"
      setvisibleLog(false);
    }
  };

  const setSerialData = () => {
    // Dim dtSerial As DataTable = getInputSerial()
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
    _strLotData = strLotData[0];
    // console.log(_strLotData, "_strLotData");
    const strLotRefData = txtLotRef.toUpperCase().split(";");
    _strLotRefData = strLotRefData[0];
    setvisibleLog(false);

    if (lblConfirm) {
      _bolConfirm = true;
    }
    setlblConfirm(false);

    if (txt_lotNo != "" && hfSerialCount > 0) {
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
        for(let i =0;i<hfSerialCount;i++){
          // _strShtNoBack = drRow("BACK_SIDE").ToString
          // _strShtNoFront = drRow("FRONT_SIDE").ToString
          // if(hfCheckPrdSht=='Y' && ){

          // }

        }
      }
    }
    console.log(hfDateInProc, "hfDateInProc");
  };
  const handleTxt_Opreator = () => {
    if (txtOperator != "") {
      if (hfCheckRollSht == "Y") {
        setvisibleRollLeaf(true);
        settxtRollLeaf("");

        fcRollleaf.current.focus();
      } else {
        SetMode("SERIAL");
        settxtMachineNo("");
        if (hfReqMachine == "Y") {
          setvisibleMachine(true);
          fctMachchine.current.focus();
        }
      }
    } else {
      settxtOperator("");
      fnSetFocus("txtOperator");
    }
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
  };
}

export { fn_ConfirmBarcodeGrade };
