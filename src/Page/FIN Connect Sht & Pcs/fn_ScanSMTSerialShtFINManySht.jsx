import { ConsoleSqlOutlined } from "@ant-design/icons";
import { LineAxisOutlined } from "@mui/icons-material";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";

const fn_ScanSMTSerialShtFINManySht = () => {
  //region useState

  const [hfUserID, sethfUserID] = useState("");
  const [hfUserStation, sethfUserStation] = useState("");
  const [hfUserFactory, sethfUserFactory] = useState("");
  const [hfSerialLength, sethfSerialLength] = useState("");
  const [hfSerialFixFlag, sethfSerialFixFlag] = useState("");
  const [hfSerialDigit, sethfSerialDigit] = useState("");
  const [hfSerialStartDigit, sethfSerialStartDigit] = useState("");
  const [hfSerialEndDigit, sethfSerialEndDigit] = useState("");
  const [hfTrayFlag, sethfTrayFlag] = useState("");
  const [hfTrayLength, sethfTrayLength] = useState("");
  const [hfTestResultFlag, sethfTestResultFlag] = useState("");

  const [hfAutoScan, sethfAutoScan] = useState("");
  const [hfMode, sethfMode] = useState("");

  const [hfConfigCheck, sethfConfigCheck] = useState("");
  const [hfConfigCode, sethfConfigCode] = useState("");
  const [hfConfigStart, sethfConfigStart] = useState("");
  const [hfConfigEnd, sethfConfigEnd] = useState("");
  const [hfConfigRuning, sethfConfigRuning] = useState("");
  const [hfDuplicateStart, sethfDuplicateStart] = useState("");
  const [hfDuplicateEnd, sethfDuplicateEnd] = useState("");
  const [hfCheckPrdSht, sethfCheckPrdSht] = useState("");
  const [hfCheckPrdShtStart, sethfCheckPrdShtStart] = useState("");
  const [hfCheckPrdShtEnd, sethfCheckPrdShtEnd] = useState("");
  const [hfCheckPrdAbbr, sethfCheckPrdAbbr] = useState("");
  const [hfCheckLotSht, sethfCheckLotSht] = useState("");
  const [hfCheckLotShtStart, sethfCheckLotShtStart] = useState("");
  const [hfCheckLotShtEnd, sethfCheckLotShtEnd] = useState("");
  const [hfCheckStartSeq, sethfCheckStartSeq] = useState("");
  const [hfCheckStartSeqCode, sethfCheckStartSeqCode] = useState("");
  const [hfCheckStartSeqStart, sethfCheckStartSeqStart] = useState("");
  const [hfCheckStartSeqEnd, sethfCheckStartSeqEnd] = useState("");
  const [hfCheckSheetELT, sethfCheckSheetELT] = useState("");
  const [hfCheckRollSht, sethfCheckRollSht] = useState("");
  const [hfCheckRollShtDigit, sethfCheckRollShtDigit] = useState("");
  const [hfCheckDateInProc, sethfCheckDateInProc] = useState("");
  const [hfDateInProc, sethfDateInProc] = useState("");
  const [hfCheckWeekCode, sethfCheckWeekCode] = useState("");
  const [hfCheckWeekCodeStart, sethfCheckWeekCodeStart] = useState("");
  const [hfCheckWeekCodeEnd, sethfCheckWeekCodeEnd] = useState("");
  const [hfWeekCodeType, sethfWeekCodeType] = useState("");
  const [hfWeekCode, sethfWeekCode] = useState("");
  const [hfCheckPreAOIF, sethfCheckPreAOIF] = useState("");
  const [hfCheckPreAOIB, sethfCheckPreAOIB] = useState("");
  const [hfCheckAOIF, sethfCheckAOIF] = useState("");
  const [hfCheckAOIB, sethfCheckAOIB] = useState("");
  const [hfCheckAOICoatF, sethfCheckAOICoatF] = useState("");
  const [hfCheckAOICoatB, sethfCheckAOICoatB] = useState("");
  const [hfCheckSPIF, sethfCheckSPIF] = useState("");
  const [hfCheckSPIB, sethfCheckSPIB] = useState("");
  const [hfReqMachine, sethfReqMachine] = useState("");
  const [hfConnLeafLength, sethfConnLeafLength] = useState("");
  const [hfRollNo, sethfRollNo] = useState("");
  const [hfCheckRollPrdFlg, sethfCheckRollPrdFlg] = useState("");
  const [hfCheckRollPrdStart, sethfCheckRollPrdStart] = useState("");
  const [hfCheckRollPrdEnd, sethfCheckRollPrdEnd] = useState("");
  const [hfCheckRollPrd, sethfCheckRollPrd] = useState("");
  const [hfConnRollLength, sethfConnRollLength] = useState("");
  const [hfSerialStartCode, sethfSerialStartCode] = useState("");
  const [hfShtPlasmaTimeFlg, sethfShtPlasmaTimeFlg] = useState("");
  const [hfShtPlasmaTime, sethfShtPlasmaTime] = useState("");
  const [hfSheetType, sethfSheetType] = useState("");
  const [hfPlasmaConnShtPcs, sethfPlasmaConnShtPcs] = useState("");
  const [hfSerialInfo, sethfSerialInfo] = useState("");
  const [hfCheckXrayF, sethfCheckXrayF] = useState("");
  const [hfCheckXrayB, sethfCheckXrayB] = useState("");
  const [hfCheckXrayOneTime, sethfCheckXrayOneTime] = useState("");
  const [hfCheckFinInspect, sethfCheckFinInspect] = useState("");
  const [hfCheckFinInspectProc, sethfCheckFinInspectProc] = useState("");

  const [lot, setLot] = useState("");
  const [lotState, setLotState] = useState(true);
  const [product, setProduct] = useState([]);
  const [productState, setProductState] = useState(true);
  const [lblError, setLblError] = useState("Error Message");
  const [lblErrorState, setLblErrorState] = useState(true);
  const [operator, setOperator] = useState("");
  const [sht, setSht] = useState("");
  const [pcs, setPcs] = useState("");

  const [selectproduct, setselectproduct] = useState(null);
  const [dtData1, setDtData1] = useState([]);
  const [serialData, setSerialData] = useState([]);

  const [pnlRollLeafOpen, setPnlRollLeafOpen] = useState(false);
  const [lblCheckRoll, setLblCheckRoll] = useState("");
  const [pnlMachineOpen, setPnlMachineOpen] = useState(false);

  const [lblTotalSht, setLblTotalSht] = useState("");
  const [lblTotalPcs, setLblTotalPcs] = useState("");
  const [dtProductSerial, setDtProductSerial] = useState([]);
  const [txtRollLeaf, settxtRollLeaf] = useState("");

  const [lblresultState, setLblresultState] = useState(false);
  const [gvScanResult, setGvScanResult] = useState([]);
  const [gvScanResultState, setGvScanResultState] = useState(false);
  const [txtMachine, settxtmachine] = useState("");
  const [txtLotRef, settxtLotRef] = useState("");

  const [lblresult, setLblresult] = useState("SUCCESS");
  const [lblresultOpen, setLblresultOpen] = useState(false);

  const fctextFieldlot = useRef(null);
  const fctextFieldMachine = useRef(null);
  const fctextFileRollLeaf = useRef(null);
  const fcddlProduct = useRef(null);
  const fcgvBackSide_txtSideback_0 = useRef(null);
  const fcgvSerial = useRef(null);
  const fcOpertor = useRef(null);

  const [imageSize, setImageSize] = useState({
    width: "320px",
    height: "250px",
    padding: "0",
    margin: "0",
  });

  const ibtBack = () => {
    setLot("");
    setLotState(true);
    setPanalSerialOpen(false);
    setselectproduct(product[0]);
    Setmode("LOT");
    // fctextFieldlot.current.focus();8
  };
  const ShowTableResult = () => {
    setLblresultOpen(true);
    setLblresultState(true);
    setGvScanResultState(true);
  };

  const Setmode = (strType) => {
    console.log(strType, "strType");

    if (strType === "LOT") {
      console.log("LOT is called");
      setProductState(true);
      setLot("");
      setLotState(true);
      // txtLot.CSs
      setLblErrorState(false);
      setPanalSerialOpen(false);
      localStorage.setItem("hfMode", "LOT");
      // fctextFieldlot.current.focus();
    } else if (strType === "LOT_ERROR") {
      console.log("LOT_ERROR is called");
      setLot("");
      setLotState(true);
      // txtLot.CSs
      setLblErrorState(true);
      //pnlSerial.Visible = False
      localStorage.setItem("hfMode", "LOT");
      // fctextFieldlot.current.focus();
    } else if (strType === "SERIAL") {
      console.log("SERIAL is called");
      setLotState(false);
      //txtLot.CSs
      setLblErrorState(false);
      // setPanalSerialOpen(true);
      localStorage.setItem("hfMode", "SERIAL");
      getInitialSerial();
    } else if (strType === "SERIAL_ERROR") {
      console.log("SERIAL_ERROR is called");
      setLotState(false);
      //txtLot.CSs
      setLblErrorState(true);
    } else if (strType === "SERIAL_OK") {
      console.log("SERIAL_OK is called");
      setLotState(false);
      //txtLot.CSs
      setLblErrorState(false);
      // setPanalSerialOpen(false);
      // getInitialSerial()
      //fnSetFocus("gvSerial")
    } else if (strType === "SERIAL_NG") {
      console.log("SERIAL_NG is called");
      setLotState(false);
      //txtLot.CSs
      setLblErrorState(false);
    }
  };

  const [hfShtScan, sethfShtScan] = useState("1");
  const [gvbacksideOpen, setGvbacksideOpen] = useState(false);
  const [hfBarcodeSide, sethfBarcodeSide] = useState("F");
  const [hfSerialCount, sethfSerialCount] = useState("1");
  const getIntialSheet = () => {
    const newData = [];
    const hfShtScanValue = parseInt(hfShtScan);
    const hfBarcodeSideValue = hfBarcodeSide;
    for (let intRow = 1; intRow <= hfShtScanValue; intRow++) {
      const newRow = {
        SEQ: intRow.toString(),
        TITLE: hfBarcodeSideValue === "F" ? "Back/Front :" : "Front/Back :",
      };
      newData.push(newRow);
    }
    setDtData1(newData);
    setGvbacksideOpen(true);
  };

  const [panalSerialOpen, setPanalSerialOpen] = useState(false);
  const getInitialSerial = () => {
    console.log("getInitialSerial is called");
    const newData = [];
    const hfShtScanValue = parseInt(hfShtScan);
    const hfSerialCountValue = parseInt(hfSerialCount);
    console.log(hfShtScanValue, hfSerialCountValue, "hfShtScanValue");
    for (let intSht = 1; intSht <= hfShtScanValue; intSht++) {
      for (let intRow = 1; intRow <= hfSerialCountValue; intRow++) {
        newData.push({
          SHEET: intSht.toString(),
          SEQ: intRow,
          TYPE: "PCS",
        });
      }
    }
    setSerialData(newData);
    setPanalSerialOpen(true);
  };
  const handleSave = () => {
    console.log("Save clicked!");
  };

  const handleCancel = () => {
    console.log("Cancel clicked!");
  };
  const Getproduct = () => {
    try {
      axios.get("/api/GetProductData").then((res) => {
        setProduct(res.data.Product.flat());
      });
    } catch (error) {
      console.error(error, "get data error");
    }
  };
  useEffect(() => {
    localStorage.setItem("hfUserID", localStorage.getItem("ip"));
    localStorage.setItem("hfUserStation", localStorage.getItem("ip"));
    localStorage.setItem("hfMode", "");
    // txtLottxtChange();
    Getproduct();
    Setmode("LOT");
    const dummyData = [
      {
        SheetNo: "001",
        No: "A01",
        SerialNo: "SN123456",
        ScanResult: "Pass",
        Remark: "No issues",
      },
      {
        SheetNo: "002",
        No: "A02",
        SerialNo: "SN123457",
        ScanResult: "Fail",
        Remark: "Missing component",
      },
      {
        SheetNo: "003",
        No: "A03",
        SerialNo: "SN123458",
        ScanResult: "Pass",
        Remark: "No issues",
      },
    ];
    setGvScanResult(dummyData);
  }, []);

  //txtLot
  const txtLottxtChange = async (e) => {
    setLot(e);
    setImageSize({
      width: "250px",
      height: "150px",
      padding: "0",
      margin: "0",
    });
    var strLotData = "";
    var strLot = "";
    var strPrdname = "";

    strLotData = e.trim().toLocaleUpperCase().split(";");
    if (strLotData.length >= 2) {
      strLot = strLotData[0].trim();
      try {
        const response = await axios.post("/api/GetProductDataByLot", {
          strLot: strLot,
        });
        if (response.data.PRD_NAME.length > 0) {
          strPrdname = response.data.PRD_NAME;
          sethfRollNo(response.data.ROLL_NO);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }

      if (strPrdname !== "") {
        setLblError("");
        setLblErrorState(false);
        setLot(strLot);
        settxtLotRef(strLot);
        getCountDataBylot(strLot);
        try {
          setselectproduct(strPrdname);
          // getProductSerialMaster(); wait to add
          getIntialSheet();
          if (hfCheckRollSht === "Y") {
            setPnlMachineOpen(true);
            // fctextFieldMachine.current.focus();
          } else {
            setPnlMachineOpen(false);
            // focus("gvBackSide_txtSideback_0");
          }
        } catch (error) {
          var intProduct = strPrdname.toLowerCase().indexOf("-", 12) + 1;
          if (intProduct > 0) {
            var part1 = strPrdname.substring(0, intProduct);
            var part2 = strPrdname
              .substring(intProduct + 1, intProduct + 1 + 10)
              .trim();
            strPrdname = part1 + part2;
            try {
              setselectproduct(strPrdname);
              // getProductSerialMaster();

              // getIntialSheet();
              if (hfCheckRollSht === "Y") {
                setPnlRollLeafOpen(true);
                settxtRollLeaf("");
                // fctextFileRollLeaf.current.focus();
              } else {
                Setmode("SERIAL");
                // settxtMachine("");
                if (hfReqMachine === "y") {
                  setPnlMachineOpen(true);
                  // fctextFieldMachine.current.focus();
                } else {
                  setPnlMachineOpen(false);
                  // focus("gvBackSide_txtSideback_0");
                }
              }
            } catch (error) {
              setLblError("Product" + strPrdname + "not found.");
              setLblErrorState(true);
              // fcddlProduct.current.focus();
            }
          } else {
            setLblError("Product" + strPrdname + "not found.");
            setLblErrorState(true);
            // fcddlProduct.current.focus();
          }
        }
      } else {
        setselectproduct(product[0]);
        // setLot("");
        setGvScanResult([]);

        setLblError("Invalid Lot No.");
        sethfMode("LOT");
        // fctextFieldlot.current.focus();
      }
    } else {
      setselectproduct(product[0]);
      // setLot("");
      setGvScanResult([]);

      setLblError("Please scan QR Code! / กรุณาสแกนที่คิวอาร์โค้ด");
      sethfMode("LOT");
      // fctextFieldlot.current.focus();
    }
  };
  const handleProductChange = async (event, value) => {
    setselectproduct(value);
    // getProductSerialMaster();
    var GetConnectShtMasterCheckResultState = "";
    if (lot.trim.toLocaleUpperCase != "") {
      setLblError("");
      setLblErrorState(false);
      try {
        const response = await axios.get("/api/GetConnectShtMasterCheckResult");
        if (response.data.Result.length > 0) {
          GetConnectShtMasterCheckResultState = response.data.Result;
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    } else {
      setselectproduct(product[0]);
      Setmode("LOT");
    }
    if (GetConnectShtMasterCheckResultState == "OK") {
      getCountDataBylot(lot.trim.toLocaleUpperCase);
      // getInitialSheet();
      if (hfCheckRollSht === "Y") {
        setPnlMachineOpen(true);
        settxtRollLeaf("");
        // fctextFieldMachine.current.focus();
      } else {
        Setmode("SERIAL");
        settxtmachine("");
        if (hfReqMachine === "Y") {
          pnlMachineOpen(true);
          // fctextFieldMachine.current.focus();
        } else {
          // fcgvBackSide_txtSideback_0.current.focus();
        }
      }
    } else {
      setselectproduct(product[0]);
      setLot("");
      setGvScanResult([]);
      setLblError(
        `${product[0]} not test maxter! / ${product[0]} ยังไม่ทดสอบมาสเตอร์`
      );
      setLblErrorState(true);
      sethfMode("LOT");
    }
  };
  const txtLotRef_TextChanged = async (event) => {
    const value = event.target.value;
    settxtLotRef(value);
    if (value && value.trim().toLocaleUpperCase() !== "") {
      var strLotdata = value.trim().toLocaleUpperCase().split(";");
      if (strLotdata.length >= 2) {
        settxtLotRef(strLotdata[0]);
        // fcOpertor.current.focus();
      } else {
        settxtLotRef(value.trim().toLocaleUpperCase());
      }
    } else {
      settxtLotRef("");
    }
  };
  const getCountDataBylot = (lot) => {
    setLblTotalSht("0");
    setLblTotalPcs("0");
    const format = (number) => {
      return new Intl.NumberFormat("en-US", {
        style: "decimal",
        maximumFractionDigits: 0,
      }).format(number);
    };
    axios
      .post("/api/GetLotSerialCountData", {
        strLot: lot,
      })
      .then((res) => {
        if (res.data.length > 0) {
          setLblTotalSht(format(res.data.COUNT_SHT));
          setLblTotalPcs(format(res.data.COUNT_PCS));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  async function getProductSerialMaster() {
    sethfSerialLength("0");
    sethfSerialFixFlag("N");
    sethfSerialDigit("");
    sethfSerialStartDigit("0");
    sethfSerialEndDigit("0");
    sethfTrayFlag("");
    sethfTrayLength("0");
    sethfTestResultFlag("");
    sethfBarcodeSide("");
    sethfShtScan("20");
    sethfConfigCheck("N");
    sethfConfigCode("");
    sethfConfigStart("0");
    sethfConfigEnd("0");
    sethfConfigRuning("N");
    sethfDuplicateStart("0");
    sethfDuplicateEnd("0");
    sethfCheckPrdSht("N");
    sethfCheckPrdShtStart("0");
    sethfCheckPrdShtEnd("0");
    sethfCheckPrdAbbr("");
    sethfCheckLotSht("N");
    sethfCheckLotShtStart("0");
    sethfCheckLotShtEnd("0");
    sethfCheckStartSeq("N");
    sethfCheckStartSeqCode("");
    sethfCheckStartSeqStart("0");
    sethfCheckStartSeqEnd("0");
    sethfCheckSheetELT("N");
    sethfCheckRollSht("N");
    sethfCheckRollShtDigit("0");
    sethfCheckDateInProc("N");
    sethfDateInProc("");
    sethfCheckWeekCode("N");
    sethfCheckWeekCodeStart("");
    sethfCheckWeekCodeEnd("");
    sethfWeekCode("");
    sethfWeekCodeType("");
    sethfCheckPreAOIF("N");
    sethfCheckPreAOIB("N");
    sethfCheckAOIF("N");
    sethfCheckAOIB("N");
    sethfCheckSPIF("N");
    sethfCheckSPIB("N");
    sethfReqMachine("N");
    sethfConnRollLength("0");
    sethfConnLeafLength("0");
    sethfCheckRollPrdFlg("N");
    sethfCheckRollPrdStart("0");
    sethfCheckRollPrdEnd("0");
    sethfCheckRollPrd("");
    sethfSerialStartCode("");
    sethfShtPlasmaTimeFlg("N");
    sethfShtPlasmaTime("0");
    sethfSheetType("D");
    sethfPlasmaConnShtPcs("N");
    sethfCheckXrayF("N");
    sethfCheckXrayB("N");
    sethfCheckXrayOneTime("N");
    sethfCheckFinInspect("N");
    sethfCheckFinInspectProc("");
    axios
      .post("/api/GetSerialProductByProduct", {
        strPrdname: strPrdname,
      })
      .then((res) => {
        if (res.data.length > 0) {
          sethfSerialLength(res.data[0][0]);
          sethfSerialFixFlag(res.data[0][1]);
          sethfSerialDigit(res.data[0][2]);
          sethfSerialStartDigit(res.data[0][3]);
          sethfSerialEndDigit(res.data[0][4]);
          sethfTrayFlag(res.data[0][5]);
          sethfTrayLength(res.data[0][6]);
          sethfTestResultFlag(res.data[0][7]);
          sethfSerialCount(res.data[0][8]);
          sethfAutoScan(res.data[0][9]);
          sethfBarcodeSide(res.data[0][10]);
          sethfShtScan(res.data[0][11]);
          sethfConfigCheck(res.data[0][12].trim());
          sethfConfigCode(res.data[0][13].trim());
          sethfConfigStart(res.data[0][14].trim());
          sethfConfigEnd(res.data[0][15].trim());
          sethfConfigRuning(res.data[0][16].trim());
          sethfDuplicateStart(res.data[0][17].trim());
          sethfDuplicateEnd(res.data[0][18].trim());
          sethfCheckPrdSht(res.data[0][19].trim());
          sethfCheckPrdShtStart(res.data[0][20].trim());
          sethfCheckPrdShtEnd(res.data[0][21].trim());
          sethfCheckPrdAbbr(res.data[0][22].trim());
          sethfCheckLotSht(res.data[0][23].trim());
          sethfCheckLotShtStart(res.data[0][24].trim());
          sethfCheckLotShtEnd(res.data[0][25].trim());
          sethfCheckStartSeq(res.data[0][26].trim());
          sethfCheckStartSeqCode(res.data[0][27].trim());
          sethfCheckStartSeqStart(res.data[0][28].trim());
          sethfCheckStartSeqEnd(res.data[0][29].trim());
          sethfCheckSheetELT(res.data[0][30].trim());
          sethfCheckRollSht(res.data[0][31].trim());
          sethfCheckRollShtDigit(res.data[0][32].trim());
          sethfCheckDateInProc(res.data[0][33].trim());
          sethfDateInProc(res.data[0][34].trim());
          sethfWeekCodeType(res.data[0][35].trim());
          sethfCheckWeekCode(res.data[0][36].trim());
          sethfCheckWeekCodeStart(res.data[0][37].trim());
          sethfCheckWeekCodeEnd(res.data[0][38].trim());
          sethfCheckPreAOIF(res.data[0][39].trim());
          sethfCheckPreAOIB(res.data[0][40].trim());
          sethfCheckAOIF(res.data[0][41].trim());
          sethfCheckAOIB(res.data[0][42].trim());
          sethfCheckAOICoatF(res.data[0][43].trim());
          sethfCheckAOICoatB(res.data[0][44].trim());
          sethfCheckSPIF(res.data[0][45].trim());
          sethfCheckSPIB(res.data[0][46].trim());
          sethfReqMachine(res.data[0][47].trim());
          sethfConnRollLength(res.data[0][48].trim());
          sethfConnLeafLength(res.data[0][49].trim());
          sethfCheckRollPrdFlg(res.data[0][50].trim());
          sethfCheckRollPrdStart(res.data[0][51].trim());
          sethfCheckRollPrdEnd(res.data[0][52].trim());
          sethfCheckRollPrd(res.data[0][53].trim());
          sethfSerialStartCode(res.data[0][54].trim());
          sethfShtPlasmaTimeFlg(res.data[0][55].trim());
          sethfShtPlasmaTime(res.data[0][56].trim());
          sethfSheetType(res.data[0][57].trim());
          sethfPlasmaConnShtPcs(res.data[0][58].trim());
          sethfSerialInfo(res.data[0][59].trim());
          sethfCheckXrayF(res.data[0][60].trim());
          sethfCheckXrayB(res.data[0][61].trim());
          sethfCheckXrayOneTime(res.data[0][62].trim());
          sethfCheckFinInspect(res.data[0][63].trim());
          sethfCheckFinInspectProc(res.data[0][64].trim());
        }
      });
  }

  return {
    lot,
    setLot,
    product,
    setProduct,
    selectproduct,
    setselectproduct,
    getIntialSheet,
    dtData1,
    setDtData1,
    lblError,
    setLblError,
    lblErrorState,
    setLblErrorState,
    productState,
    setProductState,
    getInitialSerial,
    serialData,
    setSerialData,
    handleSave,
    handleCancel,
    panalSerialOpen,
    setPanalSerialOpen,
    pnlRollLeafOpen,
    setPnlRollLeafOpen,
    lblCheckRoll,
    setLblCheckRoll,
    pnlMachineOpen,
    setPnlMachineOpen,
    lblTotalSht,
    setLblTotalSht,
    lblTotalPcs,
    setLblTotalPcs,
    txtLottxtChange,
    lblresult,
    setLblresult,
    gvScanResult,
    setGvScanResult,
    gvScanResultState,
    lblresultState,
    fctextFieldlot,
    ibtBack,
    fctextFieldMachine,
    fctextFileRollLeaf,
    fcddlProduct,
    fcgvBackSide_txtSideback_0,
    fcgvSerial,
    txtRollLeaf,
    fcOpertor,
    txtLotRef,
    gvbacksideOpen,
    handleProductChange,
    txtLotRef_TextChanged,
    lblresultOpen,
    ShowTableResult,
    imageSize,
  };
};

export { fn_ScanSMTSerialShtFINManySht };
