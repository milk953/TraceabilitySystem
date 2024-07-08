import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Fn_ScanSMTRollSht() {
  const [txt_lotNo, settxt_lotNo] = useState("");
  const [sl_Product, setsl_Product] = useState("");
  const [Product, setProduct] = useState([]);
  const [lbllog, setlbllog] = useState("");
  const [visblelog, setvisblelog] = useState(false); //falseซ่อน true โชว์
  const [gvScanResult, setgvScanResult] = useState("none");
  const [txtRollLeaf, settxtRollLeaf] = useState("");
  const [txtTotalLeaf, settxtTotalLeaf] = useState("");
  const [txtOperator, settxtOperator] = useState("");
  const [lblCheckRoll, setlblCheckRoll] = useState("");
  const [lbltotalSht, setlbltotalSht] = useState("");
  // const [Mode, SetMode] = useState("");
  const [GvSerial, SetGvSerial] = useState("none");
  const [txtLeafNo, SettxtLeafNo] = useState(Array(txtTotalLeaf).fill(""));
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

  // --------------------------------------
  useEffect(() => {
    setHfMode("");
    getProduct();
    SetMode("LOT");
  }, []);

  const handleLotxt_Lotno = () => {
    setlbllog("");
    setvisblelog(false);
    SetGvSerial("none");
    setgvScanResult("none");
    let strPrdName = "";
    let RollNo = "";
    let strLot = "";
    const strLotData = txt_lotNo.toUpperCase().split(";");
    strLot = strLotData[0];
    console.log("LotNo", txt_lotNo, " ", strLot);
    axios
      .post("/api/Common/getProductDataByLot", {
        strLot: strLot,
      })
      .then((res) => {
        // SetGvSerial('')

        console.log("GetProductDataByLot", res.data.flat().flat());
        let data = res.data.flat().flat();
        if (res.data.length > 0) {
          SetGvSerial("");
          strPrdName = data[0][0];
          RollNo = data[0][1];
          console.log("strPrdName1", strPrdName, "xxx", RollNo, "yyy");
          setHfRollNo(RollNo);
          if (strPrdName != "") {
            setlbllog("");
            setvisblelog(false);
            settxt_lotNo(strLot);
            if (RollNo == " ") {
              // console.log("strPrdName2")
              setHfRollNo(strPrdName);
            }
            const intProduct = strPrdName.indexOf("-", 12);
            console.log(intProduct, "intProduct", strPrdName);
            try {
              console.log("try");
              setsl_Product(strPrdName);
              getProductSerialMaster(strPrdName);
              // getInitialSheet()
              // SetMode("ROLL")
            } catch (error) {
              console.log("Catch");
              // console.error("Error during login:", error);
              const intProduct = strPrdName.indexOf("-", 12);
              //มีทำต่ออีกนิดหน่อย ยังไม่ได้เขียน May
            }
            axios
              .post("/api/GetRollLeafTotalByLot", {
                LotNo: strLot,
              })
              .then((res) => {
                console.log(res.data, "ROLL_LEAF");
                setlbltotalSht(res.data);
              });
          }
        } else {
          //data[0].prd_name
          if (sl_Product != Product[0].prd_name) {
            setsl_Product(Product[0].prd_name);
          }
          settxt_lotNo("");
          SetGvSerial("none");
          setlbllog("Invalid lot no.");
          setvisblelog(false);
          setvisblelog(true);

          // hfMode.Value = "LOT"
          // fnSetFocus("txtLot")
        }
      });
  };

  const getInitialSheet = async () => {
    let dtData = [];
    for (let intRow = 0; intRow < txtTotalLeaf; intRow++) {
      dtData.push({
        SHEET: "",
        SEQ: intRow + 1,
      });
    }

    setvisiblgvBackSide(true);
    setdataGvBackSide(dtData);
    return dtData;
  };

  const getProduct = () => {
    axios.get("/api/Common/GetProductData").then((res) => {
      let data = res.data.flat();
      // console.log(data[0].prd_name, "dataxxxxx");
      setProduct(data);
      //  setSlProduct(data[0].prd_name);
    });
  };
  const StyleDisabled = (disabled) => disabled;

  const StyleEneble = (Eneble) => {
    if ((Eneble = true)) {
      return {
        backgroundColor: "lightgray",
        color: "black",
      };
    } else {
      return {};
    }
  };

  // const StyleCheckRoll = (Check) => {

  //   if (Check == 'ON'){
  //     return {
  //       backgroundColor: "green",
  //       color: "black",
  //     };
  //   } else if (Check=='OFF'){
  //     return {
  //       backgroundColor: "red",
  //       color: "white",
  //     };
  //   }
  //   else {
  //     return {
  //       backgroundColor: "",
  //     };
  //   }
  // };

  const getProductSerialMaster = async (strPrdName) => {
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
        console.log(data.PRM_DATE_INPROC.length, "data.PRM_DATE_INPROC");
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
          setHfCheckFinInspect(data.PRM_FIN_GATE_INSPECT_FLG); // = dtProductSerial.Rows(0)("PRM_FIN_GATE_INSPECT_FLG").ToString(data.).Trim
          setHfCheckFinInspectProc(data.PRM_FIN_GATE_INSPECT_PROC); // = dtProductSerial.Rows(0)("PRM_FIN_GATE_INSPECT_PROC").ToString().Trim
          setHfLeafScan(data.PRM_CONN_ROLL_LEAF_SCAN);

          settxtTotalLeaf(data.PRM_CONN_ROLL_LEAF_SCAN);
          console.log("data.PRM_CONN_ROLL_PRD_FLG", data.PRM_CONN_ROLL_PRD_FLG);
          if (data.PRM_CHECK_WEEKCODE_FLG == "Y") {
            axios
              .post("/api/Common/getWeekCodebyLot", {
                STRLOT: txt_lotNo,
                STRPROC: data.PRM_DATE_INPROC,
              })
              .then((res) => {
                // console.log(res.data.flat().flat(), "getWeekCodebyLot");
                if (res.data.length > 0) {
                  setHfWeekCode(res.data[0].roll_leaf);
                }
              });
          }
          if (data.PRM_CONN_ROLL_PRD_FLG == "Y") {
            setlblCheckRoll("ON");
            // lblCheckRoll.BackColor = Drawing.Color.Green
            // lblCheckRoll.ForeColor = Drawing.Color.Blue
          } else {
            setlblCheckRoll("OFF");
            // lblCheckRoll.BackColor = Drawing.Color.Red
            // lblCheckRoll.ForeColor = Drawing.Color.Black
          }
        }
      });
  };

  const SetMode = async (_strType) => {
    if (_strType == "LOT") {
      settxt_lotNo("");
      // txtLot.Enabled = True
      // txtLot.CssClass = "styleEnable"
      // ddlProduct.Enabled = True
      setsl_Product(Product[0].prd_name);
      settxtRollLeaf("");
      // txtRollLeaf.Enabled = False
      // txtRollLeaf.CssClass = "styleDisable"
      setvisblelog(false);
      setvisiblepnlSerial(false);
      setHfMode("LOT");

      // fnSetFocus("txtLot")
    }
    if (_strType == "LOT_ERROR") {
      settxt_lotNo("");
      // txtLot.Enabled = True
      // txtLot.CssClass = "styleEnable"
      // ddlProduct.Enabled = True
      settxtRollLeaf("");
      // txtRollLeaf.Enabled = False
      // txtRollLeaf.CssClass = "styleDisable"
      setvisblelog(true);
      setvisiblepnlSerial(false);
      setHfMode("LOT");
      // fnSetFocus("txtLot")
    }
    if (_strType == "OP") {
      // txtLot.Enabled = False
      // txtLot.CssClass = "styleDisable"
      // ddlProduct.Enabled = False
      settxtRollLeaf("");

      // txtRollLeaf.Enabled = True
      // txtRollLeaf.CssClass = "styleEnable"
      // pnlLog.Visible = False
      setvisblelog(false);
      setvisiblepnlSerial(false);
      setHfMode("OP");
      settxtOperator("");
      // fnSetFocus("txtOperator")
    }
    if (_strType == "ROLL") {
      // txtLot.Enabled = False
      // txtLot.CssClass = "styleDisable"
      // ddlProduct.Enabled = False
      settxtRollLeaf("");

      // txtRollLeaf.Enabled = True
      // txtRollLeaf.CssClass = "styleEnable"

      setvisblelog(false);
      setvisiblepnlSerial(true);
      setHfMode("SHEET");
    }
    if (_strType == "SHEET") {
      // txtLot.Enabled = False
      // txtLot.CssClass = "styleDisable"
      setvisblelog(false);
      setvisiblepnlSerial(true);
      setHfMode("SHEET");
      await getInitialSerial();
    }
    if (_strType == "SHEET_ERROR") {
      // txtLot.Enabled = False
      // txtLot.CssClass = "styleDisable"
      setvisblelog(true);
    }
    if (_strType == "SHEET_OK") {
      // txtLot.Enabled = False
      // txtLot.CssClass = "styleDisable"
      setvisblelog(false);
      setvisiblepnlSerial(true);
      await getInitialSerial();
      // fcGvSerial.current.focus();
    }
    if (_strType == "SHEET_NG") {
      // txtLot.Enabled = False
      // txtLot.CssClass = "styleDisable"
      setvisblelog(false);
    }
  };

  const HandleSL_Product = (PD) => {
    setsl_Product(PD);
    console.log(PD, "Pd");
    if (txt_lotNo != "") {
      setlbllog("");
      setvisblelog(false);
    }
  };

  const Bt_Save = () => {
    setgvScanResult("");
    if (hfMode == save) {
      // setgvScanResult('')
      //   setRollSheetData()
    }
  };

  const getInputSheet = () => {
    console.log("เข้าค่าาาาาา");
    let dtData = [];
    for (let i = 0; i < txtTotalLeaf; i++) {
      dtData.push({
        SHT_SEQ: i + 1,
        LOT_NO: txt_lotNo,
        ROLL_NO: hfRollNo,
        ROLL_LEAF: txtRollLeaf,
        SHT_NO: txtLeafNo[i],
        SCAN_RESULT: "",
        REMARK: "",
        ROW_UPDATE: "N",
        UPDATE_FLG: "N",
        MACHINE: "",
        PRODUCT: sl_Product,
      });
    }

    console.log(dtData, "dtData");
    return dtData;
  };

  const setRollSheetData = () => {
    let _strFileError = "";
    let dtSheet = getInputSheet();
    console.log(dtSheet, "dtSheet",hfConnRollLength);
    let _bolPrdError = false;
    let _bolError = false;
    let _strScanResultAll = "OK";
    let _intCount = 0;
    let _intRow = 0;
    let _strLot = "";

    let _strRollLeaf = txtRollLeaf;
    setvisblelog(false);
    setlbllog("");

    // if (!_bolError) {
    //   console.log(!_bolError, "_bolError1");
    // } else {
    //   console.log(_bolError, "_bolError2");
    // }

    if (hfConnRollLength == txtRollLeaf.length) {
      if (txtOperator != "") {
        console.log('g-hk')
        axios
          .post("/api/GetRollLeafDuplicate", {
            strRollLeaf: _strRollLeaf, //5-190617-001RGP021S048
            _dtRollLeaf:dtSheet
          })
          .then((res) => {
            console.log(res.data,'GetRollLeafDuplicate');
            _intCount=res.data
            if(_intCount==1){
              _bolError = true
              _strScanResultAll = "NG"

              for( let i=0;i<dtSheet.length;i++){
                dtSheet[i].UPDATE_FLG='N'
                dtSheet[i].ROW_UPDATE='N'
                dtSheet[i].SCAN_RESULT="NG"
                dtSheet[i].REMARK="Roll/Sheet barcode duplicate/หมายเลขบาร์โค้ดซ้ำ"
                _intCount += 1
              }
            }
          });

        axios
          .post("/api/GetRollLeafScrapRBMP", {
            strRollNo: _strRollLeaf, //A190562285RGP0020420  //5-240205-125RGP398S375
          })
          .then((res) => {
            console.log(res.data.SCRAP_FLG,"GetRollLeafScrapRBMP");
          if(res.data.SCRAP_FLG=='Y'){
            _bolError = true
            _strScanResultAll = "NG"
          
            for( let i=0;i<dtSheet.length;i++){
              dtSheet[i].UPDATE_FLG='N'
              dtSheet[i].ROW_UPDATE='N'
              dtSheet[i].SCAN_RESULT="NG"
              dtSheet[i].REMARK="Problem sheet from RBMP"
             
            }
          
          }
          });
          if (hfCheckRollPrdFlg == "Y" && _bolError == true) {
            const strRollProduct = hfRollNo+ hfCheckRollPrd
            const start = parseInt(hfCheckRollPrdStart, 10);
            const end = parseInt(hfCheckRollPrdEnd, 10);
            if(strRollProduct!= _strRollLeaf.slice(start - 1, end)){
              _bolError = True
              _strScanResultAll = "NG"
              for( let i=0;i<dtSheet.length;i++){
                dtSheet[i].UPDATE_FLG='N'
                dtSheet[i].ROW_UPDATE='N'
                dtSheet[i].SCAN_RESULT="NG"
                dtSheet[i].REMARK="Roll/Sheet not matching product/หมายเลขบาร์โค้ดไม่ตรงกับผลิตภัณฑ์"
                _intCount += 1
               
              }
            }
          }
        if(!_bolError){//true

        }
      }
    }
  };
  const handleTextFieldChange = (index, event) => {
    const newData = [...txtLeafNo];
    newData[index] = event.target.value;
    SettxtLeafNo(newData);
  };

  const ibtback_Click = () => {
    // console.log("ibttt");
    setRollSheetData();
  };

  return {
    settxt_lotNo,
    txt_lotNo,
    handleLotxt_Lotno,
    sl_Product,
    Product,
    StyleEneble,
    StyleDisabled,
    HandleSL_Product,
    lbllog,
    visblelog,
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
    settxtOperator
  };
}

export { Fn_ScanSMTRollSht };
