import { ConsoleSqlOutlined } from "@ant-design/icons";
import { Diamond, LineAxisOutlined } from "@mui/icons-material";
import { warnContext } from "antd/es/config-provider";
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
  const [lblLog, setlblLog] = useState("");
  const [lblLogState, setLblLogState] = useState(false);
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
  const [txtOperator, settxtOperator] = useState("");
  const [txtLotRef, settxtLotRef] = useState("");

  const [lblresult, setLblresult] = useState("");
  const [lblresultOpen, setLblresultOpen] = useState(false);
  const [txtSideFront, setTxtSideFront] = useState(serialData.map(() => ""));
  const [txtSideBack, setTxtSideBack] = useState(dtData1.map(() => ""));
  const [txtSideFront2, setTxtSideFront2] = useState(dtData1.map(() => ""));

  const fctextFieldlot = useRef(null);
  const fctextFieldMachine = useRef(null);
  const fctextFileRollLeaf = useRef(null);
  const fcddlProduct = useRef(null);
  const fctxtSideBack = useRef(null);
  const fctxtsideFront = useRef(null);

  const fcgvSerial = useRef(null);
  const fcOpertor = useRef(null);
  const [hfShtScan, sethfShtScan] = useState("");
  const [gvbacksideOpen, setGvbacksideOpen] = useState(false);
  const [hfBarcodeSide, sethfBarcodeSide] = useState("");
  const [hfSerialCount, sethfSerialCount] = useState("");
  const [imageSize, setImageSize] = useState({
    width: "320px",
    height: "250px",
    padding: "0",
    margin: "0",
    align: "center",
    margin:'auto'
  });

  const ibtBack = () => {
    location.reload();
    setLotState(true);
    setPanalSerialOpen(false);
    setselectproduct(null);
    // Getproduct();
    Setmode("LOT");
    fctextFieldlot.current.focus();
  };
  const ShowTableResult = () => {
    setLblresultOpen(true);
    setLblresultState(true);
    setGvScanResultState(true);
  };

  const Setmode = (strType) => {
    if (strType === "LOT") {
      setProductState(true);
      // setLot("");
      setLotState(true);
      // txtLot.CSs
      setLblLogState(false);
      setPanalSerialOpen(false);
      localStorage.setItem("hfMode", "LOT");
      fctextFieldlot.current.focus();
    } else if (strType === "LOT_ERROR") {
      setLot("");
      setLotState(true);
      // txtLot.CSs
      setLblLogState(true);
      pnlSerial.Visible = False;
      localStorage.setItem("hfMode", "LOT");
      fctextFieldlot.current.focus();
    } else if (strType === "SERIAL") {
      setLotState(false);
      //txtLot.CSs
      setLblLogState(false);
      setPanalSerialOpen(true);
      getInitialSerial();
    } else if (strType === "SERIAL_ERROR") {
      setLotState(false);
      //txtLot.CSs
      setLblLogState(true);
    } else if (strType === "SERIAL_OK") {
      setLotState(false);
      //txtLot.CSs
      setLblLogState(false);
      setPanalSerialOpen(false);
      getInitialSerial();
      //fnSetFocus("gvSerial")
    } else if (strType === "SERIAL_NG") {
      setLotState(false);
      //txtLot.CSs
      setLblLogState(false);
    }
  };

  const [panalSerialOpen, setPanalSerialOpen] = useState(false);

  const handleSave = () => {
  };

  const handleCancel = () => {
    setSerialDataTable();
  };
  const Getproduct = () => {
    try {
      axios.get("/api/GetProductData").then((res) => {
        setProduct(res.data);
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
    
    if (selectproduct !== "" && lot !== "") {
      getIntialSheet();
    }
  }, [selectproduct]);

  //txtLot
  const txtLottxtChange = async (e) => {
    setLot(e);
    setImageSize({
      width: "250px",
      height: "150px",
      padding: "0",
      align: "center",
      margin:'auto'
    });
    var strLotData = "";
    var strLot = "";
    var strPrdname = "";
    var listData = [];

    strLotData = e.trim().toLocaleUpperCase().split(";");
    if (strLotData.length >= 2) {
      strLot = strLotData[0].trim();
      try {
        const response = await axios.post("/api/GetProductDataByLot", {
          strLot: strLot,
        });
        if (response.data.PRDNAME != "") {
          strPrdname = response.data.PRD_NAME;
          sethfRollNo(response.data.ROLL_NO);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
      if (strPrdname != "") {
        setlblLog("");
        setLblLogState(false);
        setLot(strLot);
        settxtLotRef(strLot);
        getCountDataBylot(strLot.trim().toLocaleUpperCase());
        await getProductSerialMaster(strPrdname);
        try {
          const isInArray = product.some(
            (item) => item.prd_name === strPrdname
          );
          if (isInArray) {
            setselectproduct(strPrdname);
            getIntialSheet();
          } else {
            setlblLog(`Product ${strPrdname} not found.`);
            setLblLogState(true);
            fcddlProduct.current.focus();
            return;
          }
          if (hfCheckRollSht == "Y") {
            setPnlRollLeafOpen(true);
            settxtRollLeaf("");
            fctextFileRollLeaf.current.focus();
          } else {
            Setmode("SERIAL");
            settxtmachine("");
            if (hfReqMachine == "Y") {
              setPnlMachineOpen(true);
              fctextFieldMachine.current.focus();
            } else {
              setPnlMachineOpen(false);
              // fctxtSideBack.current.focus();
            }
          }
          return;
        } catch (error) {
          console.error('Error occurred:', error);
          console.log('infunction')
          var intProduct = strPrdname.indexOf("-", 12);
          if (intProduct > -1) {
            strPrdname =
              strPrdname.substring(0, intProduct) +
              strPrdname.substring(intProduct + 1, intProduct + 11).trim();
            try {
              setselectproduct(strPrdname);
              await getProductSerialMaster(strPrdname);
              getIntialSheet();

              if (hfCheckRollSht == "Y") {
                setPnlRollLeafOpen(true);
                settxtRollLeaf("");
                fctextFileRollLeaf.current.focus();
              } else {
                // Setmode("SERIAL");
                settxtmachine("");
                if (hfReqMachine == "Y") {
                  setPnlMachineOpen(true);
                  fctextFieldMachine.current.focus();
                } else {
                  setPnlMachineOpen(false);
                  // gvbacksideOpen.focus()
                }
              }
            } catch (error) {
              setlblLog(`Product ${strPrdname} not found.`);
              setLblLogState(true);
              fcddlProduct.current.focus();
            }
          }
        }
      } else {
        // setselectproduct();
        setLot("");
        setDtData1([]);
        setGvbacksideOpen(false);

        setlblLog(`Please scan QR Code! / กรุณาสแกนที่คิวอาร์โค้ด`);
        setLblLogState(true);
        sethfMode("LOT");
        fctextFieldlot.current.focus();
      }
    }
  };

  const handleProductChange = async (event, value) => {
    var prdName = value;
    setselectproduct(prdName);
    getProductSerialMaster(prdName);
    if (lot != "") {
      setLblLogState(false);
      setlblLog("");
      const response = await axios.post("/api/GetConnectShtMasterCheckResult", {
        strPrdname: prdName,
      });
      if (response.data != "" && response.data.prd_name == "OK") {
        getCountDataBylot(lot);
        // getInitialSheet();
        if (hfCheckRollSht == "Y") {
          setPnlRollLeafOpen(true);
          settxtRollLeaf("");
          fctextFileRollLeaf.current.focus();
        } else {
          Setmode("SERIAL");
          settxtmachine("");
          settxtmachine("");
          if (hfReqMachine == "Y") {
            setPnlMachineOpen(true);
            fctextFieldMachine.current.focus();
          } else {
            setPnlMachineOpen(false);
            // gvbacksideOpen.focus()
          }
        }
      } else {
        // setselectproduct(null);
        setLot("");
        setGvbacksideOpen(false);
        setLblLogState(true);
        setlblLog(
          `${prdName} not test master! / ${prdName} ยังไม่ทดสอบมาสเตอร์`
        );
        sethfMode("LOT");
        fctextFieldlot.current.focus();
      }
    } else {
      // setselectproduct(null);
      sethfMode("LOT");
    }
  };

  const txtOperator_TextChanged = (event) => {
    settxtOperator(event);
    var Operator = event;
    if (Operator != "") {
      if (hfCheckRollSht == "Y") {
        setPnlRollLeafOpen(true);
        settxtRollLeaf("");
        fctextFileRollLeaf.current.focus();
      } else {
        settxtmachine("");
        if (hfReqMachine == "Y") {
          setPnlMachineOpen(true);
          fctextFieldMachine.current.focus();
        } else {
          setPnlMachineOpen(false);
          // gvbacksideOpen.focus()
        }
      }
    } else {
      setOperator("");
      fcOpertor.current.focus();
    }
  };

  const txtLotRef_TextChanged = (event) => {
    const value = event.target.value;
    settxtLotRef(value);
    if (value && value.trim().toLocaleUpperCase() !== "") {
      var strLotdata = value.trim().toLocaleUpperCase().split(";");
      if (strLotdata.length >= 2) {
        settxtLotRef(strLotdata[0]);
        fcOpertor.current.focus();
      } else {
        settxtLotRef(value.trim().toLocaleUpperCase());
      }
    } else {
      settxtLotRef("");
    }
  };

  const txtRollLeaf_TextChanged = (even) => {
    settxtRollLeaf(even);
    var Rollleaf = even;
    setLblLogState(false);
    setlblLog("");
    var strRollProduct = hfRollNo + hfCheckRollPrd;
    if (Rollleaf != "" && Rollleaf.length == hfConnRollLength) {
      if (hfCheckRollPrdFlg == "Y") {
        if (
          strRollProduct !==
          txtRollLeaf
            .trim()
            .toUpperCase()
            .substring(
              parseInt(hfCheckRollPrdStart, 10),
              parseInt(hfCheckRollPrdStart, 10) +
                (parseInt(hfCheckRollPrdEnd, 10) -
                  parseInt(hfCheckRollPrdStart, 10)) +
                1
            )
        ) {
          setLblLogState(true);
          setlblLog(`Roll/Leaf No. mix product`);
          panalSerialOpen(false);
          // sethfMode("ROLL");
          getInitialSheet();
          settxtRollLeaf("");
          txtRollLeaf.current.focus();
        }
      } else {
        // Setmode("SERIAL");
        settxtmachine("");
        if (hfReqMachine == "Y") {
          setPnlMachineOpen(true);
          fctextFieldMachine.current.focus();
        } else {
          setPnlMachineOpen(false);
          // gvbacksideOpen.focus()
        }
      }
    } else {
      lblLogState(true);
      setlblLog(`Invalid Roll/Leaf No`);
      panalSerialOpen(false);
      sethfMode("ROLL");
      getInitialSheet();
      settxtRollLeaf("");
      txtRollLeaf.current.focus();
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
        if (res.data != "") {
          setLblTotalSht(format(res.data.count_pcs));
          setLblTotalPcs(format(res.data.count_sht));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getProductSerialMaster = async (strPrdname) => {
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
    try {
      const res = await axios.post("/api/GetSerialProductByProduct", {
        prdName: strPrdname,
      });

      if (res.data != "") {
        sethfSerialLength(res.data.SLM_SERIAL_LENGTH);
        sethfSerialFixFlag(res.data.SLM_FIX_FLAG);
        sethfSerialDigit(res.data.SLM_FIX_DIGIT);
        sethfSerialStartDigit(res.data.SLM_FIX_START_DIGIT);
        sethfSerialEndDigit(res.data.SLM_FIX_END_DIGIT);
        sethfTrayFlag(res.data.SLM_TRAY_FLAG);
        sethfTrayLength(res.data.SLM_TRAY_LENGTH);
        sethfTestResultFlag(res.data.SLM_TEST_RESULT_FLAG);
        sethfSerialCount(res.data.SLM_SERIAL_SHT);
        sethfAutoScan(res.data.SLM_AUTO_SCAN);
        sethfBarcodeSide(res.data.SLM_BARCODE_SIDE);
        sethfShtScan(res.data.SLM_SHT_SCAN);
        sethfConfigCheck(res.data.PRM_BARCODE_REQ_CONFIG);
        sethfConfigCode(res.data.PRM_CONFIG_CODE);
        sethfConfigStart(res.data.PRM_START_CONFIG);
        sethfConfigEnd(res.data.PRM_END_CONFIG);
        sethfConfigRuning(res.data.PRM_RUNNING_REQ_CONFIG);
        sethfDuplicateStart(res.data.PRM_DUPLICATE_START);
        sethfDuplicateEnd(res.data.PRM_DUPLICATE_END);
        sethfCheckPrdSht(res.data.PRM_REQ_CHECK_PRD_SHT);
        sethfCheckPrdShtStart(res.data.PRM_CHECK_PRD_SHT_START);
        sethfCheckPrdShtEnd(res.data.PRM_CHECK_PRD_SHT_END);
        sethfCheckPrdAbbr(res.data.PRM_ABBR);
        sethfCheckLotSht(res.data.PRM_REQ_CHECK_LOT_SHT);
        sethfCheckLotShtStart(res.data.PRM_CHECK_LOT_SHT_START);
        sethfCheckLotShtEnd(res.data.PRM_CHECK_LOT_SHT_END);
        sethfCheckStartSeq(res.data.PRM_REQ_START_SEQ_FLG);
        sethfCheckStartSeqCode(res.data.PRM_START_SEQ_CODE);
        sethfCheckStartSeqStart(res.data.PRM_START_SEQ_START);
        sethfCheckStartSeqEnd(res.data.PRM_START_SEQ_END);
        sethfCheckSheetELT(res.data.PRM_SHEET_ELT_FLG);
        sethfCheckRollSht(res.data.PRM_CONN_ROLL_SHT_FLG);
        sethfCheckRollShtDigit(res.data.PRM_CONN_ROLL_SHT_LENGTH);
        sethfCheckDateInProc(res.data.PRM_DATE_INPROC_FLG);
        sethfDateInProc(res.data.PRM_DATE_INPROC);
        sethfWeekCodeType(res.data.PRM_DATE_TYPE);
        sethfCheckWeekCode(res.data.PRM_CHECK_WEEKCODE_FLG);
        sethfCheckWeekCodeStart(res.data.PRM_CHECK_WEEKCODE_START);
        sethfCheckWeekCodeEnd(res.data.PRM_CHECK_WEEKCODE_END);
        sethfCheckPreAOIF(res.data.PRM_SHT_PRE_AOI_F);
        sethfCheckPreAOIB(res.data.PRM_SHT_PRE_AOI_B);
        sethfCheckAOIF(res.data.PRM_SHT_AOI_F);
        sethfCheckAOIB(res.data.PRM_SHT_AOI_B);
        sethfCheckAOICoatF(res.data.PRM_SHT_AOI_COAT_F);
        sethfCheckAOICoatB(res.data.PRM_SHT_AOI_COAT_B);
        sethfCheckSPIF(res.data.PRM_SHT_SPI_F);
        sethfCheckSPIB(res.data.PRM_SHT_SPI_B);
        sethfReqMachine(res.data.PRM_SHT_MACHINE_FLG);

        sethfConnRollLength(res.data.PRM_CONN_ROLL_LENGTH);
        sethfConnLeafLength(res.data.PRM_CONN_LEAF_LENGTH);
        sethfCheckRollPrdFlg(res.data.PRM_CONN_ROLL_PRD_FLG);
        sethfCheckRollPrdStart(res.data.PRM_CONN_ROLL_PRD_START);
        sethfCheckRollPrdEnd(res.data.PRM_CONN_ROLL_PRD_END);
        sethfCheckRollPrd(res.data.PRM_CONN_ROLL_PRD_FIX);
        sethfSerialStartCode(res.data.PRM_SERIAL_START_CODE);

        sethfShtPlasmaTimeFlg(res.data.PRM_SHT_PLASMA_TIME_FLG);
        sethfShtPlasmaTime(res.data.PRM_SHT_PLASMA_TIME);
        sethfSheetType(res.data.PRM_SHEET_TYPE);
        sethfPlasmaConnShtPcs(res.data.PRM_CONN_SHTPCS_PLASMA_TIME_FLG);
        sethfSerialInfo(res.data.PRM_ADDITIONAL_INFO);
        sethfCheckXrayF(res.data.PRM_SHT_XRAY_F);
        sethfCheckXrayB(res.data.PRM_SHT_XRAY_B);
        sethfCheckXrayOneTime(res.data.PRM_SHT_XRAY_1_TIME_FLG);
        sethfCheckFinInspect(res.data.PRM_FIN_GATE_INSPECT_FLG);
        sethfCheckFinInspectProc(res.data.PRM_FIN_GATE_INSPECT_PROC);
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const getIntialSheet = () => {
    for (var intRow = 1; intRow <= parseInt(hfShtScan); intRow++) {
      const newRow = {
        SEQ: intRow.toString(),
        TITLE: hfBarcodeSide === "F" ? "Back/Front :" : "Front/Back :",
      };
      dtData1.push(newRow);
      setGvbacksideOpen(true);
    }
  };

  const getInitialSerial = () => {
    const newData = [];
    const hfShtScanValue = parseInt(hfShtScan);
    const hfSerialCountValue = parseInt(hfSerialCount);

    for (let intSht = 1; intSht <= hfShtScanValue; intSht++) {
      for (let intRow = 1; intRow <= hfSerialCountValue; intRow++) {
        var data = {
          SHEET: intSht.toString(),
          SEQ: intRow,
          TYPE: "PCS",
        };
        serialData.push(data);
      }
    }
    setPanalSerialOpen(true);
  };

  const handleFrontSideChange = (index, event) => {
    const newValues = [...txtSideFront];
    newValues[index] = event.target.value;
    setTxtSideFront(newValues);
  };

  const handleBackSideChange = (index, event) => {
    const newValues = [...txtSideBack];
    newValues[index] = event.target.value;
    setTxtSideBack(newValues);
  };
  const handleFrontSide2Change = (index, event) => {
    const newValues = [...txtSideFront2];
    newValues[index] = event.target.value;
    setTxtSideFront2(newValues);
  };

  const getInputSerial = () => {
    var dtData = [];
    var intRow = 0;
    var strFrontSide = "";
    for (let i = 0; i < serialData.length; i++) {
      intRow += 1;
      dtData.push({
        SHEET: serialData[i].SHEET,
        BACK_SIDE: txtSideBack,
        FRONT_SIDE: txtSideFront2,
        SEQ: serialData[i].SEQ,
        SERIAL: txtSideFront[i],
        SCAN_RESULT: "",
        REMARK: "",
        UPDATE_FLG: "N",
        MACHINE: txtMachine,
        MASTER_NO: "",
        LOT: lot,
        PRODUCT: selectproduct,
        ROW_UPDATE: "Y",
      });
    }
    return dtData;
  };

  const getConnectRollSheetData = () => {
    var dtData = [];
    var intRollRow = 1;
    var intRow = 0;
    var strShtNoold = "";
    var strRollNo = "";

    strRollNo = hfRollNo;
    for (let i = 0; i < serialData.length; i++) {
      if (serialData[i].FRONT_SIDE !== strShtNoold) {
        intRow += 1;
        dtData.push({
          ROLL_SEQ: intRollRow,
          SHT_SEQ: intRow,
          LOT_NO: lot,
          ROLL_NO: strRollNo,
          ROLL_LEAF: txtRollLeaf,
          SHT_NO: serialData[i].FRONT_SIDE,
          SCAN_RESULT: "",
          REMARK: "",
          ROW_UPDATE: "Y",
          UPDATE_FLG: "N",
          MACHINE: txtMachine,
          PRODUCT: selectproduct,
        });
        if (serialData[i].FRONT_SIDE !== serialData[i].BACK_SIDE) {
          intRow += 1;
          dtData.push({
            ROLL_SEQ: intRollRow,
            SHT_SEQ: intRow,
            LOT_NO: lot,
            ROLL_NO: strRollNo,
            ROLL_LEAF: txtRollLeaf,
            SHT_NO: serialData[i].BACK_SIDE,
            SCAN_RESULT: "",
            REMARK: "",
            ROW_UPDATE: "Y",
            UPDATE_FLG: "N",
            MACHINE: txtMachine,
            PRODUCT: selectproduct,
          });
        }
      }
      strShtNoold = dtData[i].FRONT_SIDE;
    }
    return dtData;
  };

  const setSerialDataTable = async () => {
    var dtSerial = getInputSerial();
    console.log(dtSerial, "dtSerial");
    let prd_name = selectproduct;
    let _strTray = " ";
    let _strScanResultAll = "OK";
    var _strShtNoBack = "";
    var _strShtNoFront = "";
    var _strErrorAll = "";
    sethfWeekCode("");
    var _hfWeekCode = "";
    let _bolError = false;
    let intRowSerial = 0;
    let _intSeq = 1;
    if (lot.trim() !== "" && dtSerial !== "") {
      var _intRowSerial = 0;
      if (hfCheckWeekCode === "N") {
        const res = await axios.post("/api/GetWeekCodebyLot", {
          strLot: lot,
          strProc: hfDateInProc,
        });
        if (res.data != "") {
          sethfWeekCode(res.data.WEEK_CODE);
          _hfWeekCode = res.data.WEEK_CODE;
        }
      }
      for (let i = 0; i < dtSerial.length; i++) {
        _strShtNoBack = dtSerial[i].BACK_SIDE;
        _strShtNoFront = dtSerial[i].FRONT_SIDE;
        console.log(hfCheckPrdSht, "hfCheckPrdSht" , dtSerial[i].SEQ, "dtSerial[i].SEQ",!_bolError )
        if (hfCheckPrdSht === "Y" && parseInt(dtSerial[i].SEQ === 1) && _bolError === true ) 
        {
          if (hfCheckPrdAbbr !== _strShtNoBack.substring( parseInt(hfCheckPrdShtStart), parseInt(hfCheckPrdShtEnd) - parseInt(hfCheckPrdShtStart) + 1 )) 
          {
            _strScanResultAll = "NG";
            _strErrorAll = "Sheet product mix";
            _bolError = true;
          }
          if ( hfCheckPrdAbbr !==_strShtNoFront.substring( parseInt(hfCheckPrdShtStart), parseInt(hfCheckPrdShtEnd) - parseInt(hfCheckPrdShtStart) + 1))
          {
            _strScanResultAll = "NG";
            _strErrorAll = "Sheet product mix";
            _bolError = true;
          }
        }
        if( hfCheckLotSht === "Y" && parseInt(dtSerial[i].SEQ === 1) && !_bolError ) 
        {
          if ( txtLotRef !== _strShtNoBack.substring( parseInt(hfCheckLotShtStart), parseInt(hfCheckLotShtEnd) - parseInt(hfCheckLotShtStart) + 1 ))
          {
            _strScanResultAll = "NG";
            _strErrorAll = "Sheet lot mix";
            _bolError = true;
          }
          if ( txtLotRef !== _strShtNoFront.substring( parseInt(hfCheckLotShtStart), parseInt(hfCheckLotShtEnd) - parseInt(hfCheckLotShtStart) + 1 ))
          {
            _strScanResultAll = "NG";
            _strErrorAll = "Sheet lot mix";
            _bolError = true;
          }
        }
        //Check sheet plasma time control
        if ( hfShtPlasmaTimeFlg === "Y" && parseInt(dtSerial[i].SEQ === 1) && !_bolError )
        {
          const res2 = await axios.post("/api/GetConnectShtPlasmaTime", {
            strSheetnoF: _strShtNoFront,
            strSheetnoB: _strShtNoBack,
            lot_no: txtLotRef,
            dblPlasmaTime: parseFloat(hfShtPlasmaTime),
          });
          _strErrorAll = res2.data.error;
          if (_strErrorAll !== "") {
            _strScanResultAll = "NG";
            _bolError = true;
          }
        }
        if (parseInt(dtSerial[i].SEQ === 1)) 
        {
          let _inCountSeq = 0;
          let _strSerialNoDup = "";
          const res = await axios.post("/api/GetSheetDuplicateConnectShtType", {
            strSheetnoF: _strShtNoFront,
            strSheetnoB: _strShtNoBack,
            strSheetType: hfSheetType,
          });
          _inCountSeq = res.data.sheet_count;
          if (parseInt(_inCountSeq) > 0) {
            _strScanResultAll = "NG";
            _strErrorAll = "Sheet no. duplicate";
            _bolError = true;
          }
        }
        if (hfReqMachine == "Y") 
        {
          if ( txtMachine !== "" || txtMachine === "999999" || txtMachine === "NOT FOUND CODE" )
          {
            _strScanResultAll = "NG";
            _strErrorAll = "Invalid machine no";
            _bolError = true;
          }
        }
        if ( parseInt(hfConnLeafLength) > 0 || parseInt(hfConnLeafLength) !== _strShtNoBack.length || parseInt(hfConnLeafLength) !== _strShtNoFront.length ) 
        {
          _strScanResultAll = "NG";
          _strErrorAll = "Invalid sheet length";
          _bolError = true;
        }
        if (dtSerial[i].SERIAL !== "") 
        {
          var _strSerial = dtSerial[i].SERIAL;
          var _strTestResult = "None";
          var _strMessageUpdate = "";
          var _strScanResultUpdate = "";

          if (_strSerial !== "999999") 
          {
            for (_intRowSerial + 1; _intRowSerial < dtSerial.length - 1; _intRowSerial++) 
            {
              if (_strSerial === dtSerial[_intRowSerial].SERIAL) {
                _strScanResultUpdate = "NG";
                _strMessageUpdate = `Serial duplicate / หมายเลขบาร์โค้ดซ้ำ`;
                _strScanResultAll = "NG";
                _bolError = true;
              }
            }
            if (_strSerial.length == parseInt(hfSerialLength)) 
            {
              var _strFixDigit = "";
              _strSerial = _strSerial.substring(parseInt(hfSerialStartDigit), parseInt(hfSerialEndDigit) + 1 );
              if (_strSerial !== hfSerialDigit) 
              {
                _strScanResultUpdate = "NG";
                _strMessageUpdate = `Serial barcode mix product / หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น`;
                _strScanResultAll = "NG";
                _bolError = true;
              } 
              else if (hfConfigCheck === "Y") 
              {
                var _strConfigDigit = "";
                _strConfigDigit = _strSerial.substring( parseInt(hfConfigStart), parseInt(hfConfigEnd) - parseInt(hfConfigStart) + 1 );
                if (_strConfigDigit !== hfConfigCode) 
                {
                  _strScanResultUpdate = "NG";
                  _strMessageUpdate = `Serial barcode mix product / หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น`;
                  _strScanResultAll = "NG";
                  _bolError = true;
                }
              }
              if (hfSerialStartCode !== "" && !_bolError) 
              {
                if ( _strSerial.substring(0, hfSerialStartCode.length) !== hfSerialStartCode)
                {
                  _strScanResultUpdate = "NG";
                  _strMessageUpdate = `Serial barcode mix product / หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น`;
                  _strScanResultAll = "NG";
                  _bolError = true;
                }
              }
              if (hfCheckStartSeq === "Y" && _strScanResultUpdate !== "NG") 
              {
                var _strStartSeq = "";
                _strStartSeq = _strSerial.substring( parseInt(hfCheckStartSeqStart), parseInt(hfCheckStartSeqEnd) -parseInt(hfCheckStartSeqStart) + 1 );
                if (_strStartSeq !== hfCheckStartSeqCode) 
                {
                  _strScanResultUpdate = "NG";
                  _strMessageUpdate = `Serial barcode mix product / หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น`;
                  _strScanResultAll = "NG";
                  _bolError = true;
                }
              }

              if (hfCheckWeekCode === "Y" && _strScanResultUpdate === "NG") 
              {
                var _strWeekCode = "";
                _strWeekCode = _strSerial.substring( parseInt(hfCheckWeekCodeStart), parseInt(hfCheckWeekCodeEnd) - parseInt(hfCheckWeekCodeStart) + 1 );
                if (_strWeekCode !== _hfWeekCode) 
                {
                  _strScanResultUpdate = "NG";
                  _strMessageUpdate = `Serial barcode mix product / หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น`;
                  _strScanResultAll = "NG";
                  _bolError = true;
                }
              }
            } 
            else 
            {
              _strScanResultUpdate = "NG";
              _strMessageUpdate = `Serial barcode mix product / หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น`;
              _strScanResultAll = "NG";
              _bolError = true;
            }
            if (_strScanResultUpdate !== "NG") 
            {
              var _inCountSeq = 0;
              var _strSerialNoDup = "";
              const res = await axios.post(
                "/api/GetSerialDuplicateConnectSht",
                {
                  strSerial: _strSerial,
                }
              );
              _inCountSeq = res.data.intRow;
              if (_inCountSeq > 0) {
                _strScanResultUpdate = "NG";
                _strMessageUpdate = `Serial duplicate / หมายเลขบาร์โค้ดซ้ำ`;
                _strScanResultAll = "NG";
                _bolError = true;
              }
            }
          } 
          else 
          {
            _strMessageUpdate = `Bad mark piece / ชิ้นงานเสียทำเครื่องหมายไว้แล้ว`;
          }
          dtSerial[i].SCAN_RESULT = _strScanResultUpdate;
          dtSerial[i].REMARK = _strMessageUpdate;
        }
        _intSeq += 1;
      }
        // Shipping2D serial special check condition lot, panel and strip 
      if(hfWeekCodeType == 'S' && _bolError == false)  
        {
          var strReturn = '';
          strReturn = GetShippingSerialNo(dtSerial)
          if (strReturn !=='')
            {
              _strScanResultAll = 'NG';
              _bolError = true
              if (strReturn !== 'NG')
                {
                  setLblLogState(true);
                  setlblLog(strReturn);
                }
            }
        }
      if (hfCheckSheetELT =='Y' && _bolError == false ) // ทำ api
        {
          var strReturn = '';
          // strReturn = await axios.post("/api/SetSerialLotShtELTTable", {
            
          // })
          if (strReturn !== '')
            {
              _strScanResultAll = 'NG';
              _bolError = true;
              if (strReturn !== 'NG')
                {
                  setLblLogState(true);
                  setlblLog(strReturn);
                }
            }
        }
      if (!_bolError)
        {
          for(let i =0 ;i<dtSerial.length; i++)
            {
              if(dtSerial[i].SERIAL !== "")
                {
                  var intCount = 0;
                  var intCountOK = 0;
                  var intCountNG = 0;
                  var strRemark = '';
                  var strError = '';
                  var strSerial = dtSerial[i].SERIAL;
                  var dtSerialAll = [];
                  var bolScanDouble = false;
                  var bolScanDuplicatev = false;
                  var strPrdNameOrg = '';
                  var strNG = '';
                  var strScanResultUpdate = '';
                  var strMessageUpdate = '';
                  var strRejectUpdate = '';
                  var Message = '';
                  _bolError = False


                  var strTestResult = 'None'
                  if (strSerial = '999999')
                    {
                      strMessageUpdate = 'Bad mark piece / ชิ้นงานเสียทำเครื่องหมายไว้แล้ว'
                      strScanResultUpdate = 'OK'
                    }
                  if ('0' == '1' && strScanResultUpdate !== 'NG' && strSerial !== '999999')
                    {
                      var Result = '';
                      var FrontSheetBarcode = '';
                      var RearSheetBarcode = '';
                      if (hfBarcodeSide == 'F')
                        {
                          FrontSheetBarcode = dtSerial[i].FRONT_SIDE
                          RearSheetBarcode = dtSerial[i].BACK_SIDE
                        }
                      else
                        {
                          FrontSheetBarcode = dtSerial[i].BACK_SIDE
                          RearSheetBarcode = dtSerial[i].FRONT_SIDE
                        }
                      Result = await axios.post("/api/Get_SPI_AOI_RESULT", {}) //ทำ api
                      if(Result == 'NG')
                        {
                          strScanResultUpdate = Result
                        }
                      strMessageUpdate = Message
                  }
                  if (strError !== '')
                    {
                      strMessageUpdate = strError
                      strScanResultUpdate = 'NG'
                      _bolError =true
                    }
                  serialData[i].SCAN_RESULT = strScanResultUpdate
                  serialData[i].REMARK = strMessageUpdate
                }
              _intSeq += 1
            }
          //'' Manual connect roll and sheet leaf
          var Rollleaf_fetch = "";
          if (!_bolError && hfCheckRollSht != "Y") {
            if ((txtRollLeaf.length = hfConnRollLength)) {
              const res = await axios.post("/api/GetRollLeafScrapRBMP", {
                strRollNo: txtRollLeaf,
              });
              if (res.data != "") {
                Rollleaf_fetch = res.data.SCRAP_FLG;
                console.log(Rollleaf_fetch, "Rollleaf_fetch");
              }
              if (Rollleaf_fetch == "Y") {
                _bolError = True;
                _strScanResultAll = "NG";
                _strUpdateError = "Problem sheet from RBMP";
                _strErrorAll = "Problem sheet from RBMP";
              } else {
                var dtRowLeaf = getConnectRollSheetData();
                var intCount = 0;
                var rowCount = 0;
                var _strRollLeaf = txtRollLeaf;
                const res = await axios.post("/api/GetRollLeafDuplicate", {
                  strRollLeaf: _strRollLeaf,
                });
                rowCount = res.data.length;
                if (rowCount !== dtRowLeaf.length) {
                  intCount = 1;
                } else {
                  for (let i = 0; i < rowCount; i++) {
                    if (dtRowLeaf[i].SHT_NO !== res.data[i].SHT_NO) {
                      intCount = 1;
                    }
                  }
                }
                if ((intCount = 1)) {
                  _bolError = True;
                  _strScanResultAll = "NG";
                  for (let i = 0; i < dtRowLeaf.length; i++) {
                    dtRowLeaf[i].UPDATE_FLG = "N";
                    dtRowLeaf[i].ROW_UPDATE = "N";
                    dtRowLeaf[i].SCAN_RESULT = "NG";
                    dtRowLeaf[i].REMARK =
                      "Roll/Sheet barcode duplicate / หมายเลขบาร์โค้ดซ้ำ";
                    intCount += 1;
                  }
                  _strUpdateError = "Roll/Sheet barcode duplicate";
                  _strErrorAll = "Roll/Sheet barcode duplicate";
                }
                if (hfCheckRollPrdFlg == 'Y' && !_bolError){
                  var strRollProduct = hfRollNo + hfCheckRollPrd;
                  if (strRollProduct !== txtRollLeaf.substring(parseInt(hfCheckRollPrdStart), (parseInt(hfCheckRollPrdEnd) - parseInt(hfCheckRollPrdStart) + 1 ))){
                    _bolError = true;
                    _strScanResultAll = "NG";
                    for (let i = 0; i < dtRowLeaf.length; i++) {
                      dtRowLeaf[i].UPDATE_FLG = "N";
                      dtRowLeaf[i].ROW_UPDATE = "N";
                      dtRowLeaf[i].SCAN_RESULT = "NG";
                      dtRowLeaf[i].REMARK =
                        "Roll/Sheet not matching product / หมายเลขบาร์โค้ดไม่ตรงกับผลิตภัณฑ์";
                      intCount += 1;
                    }
                  }
                }
                
                if (!_bolError && dtRowLeaf.length > 0){
                  for (let i = 0; i < dtRowLeaf.length; i++) {
                    dtRowLeaf[i].UPDATE_FLG = "N";
                    dtRowLeaf[i].ROW_UPDATE = "N";
                    dtRowLeaf[i].SCAN_RESULT = "NG";
                    dtRowLeaf[i].REMARK =
                      "Roll/Sheet not matching product / หมายเลขบาร์โค้ดไม่ตรงกับผลิตภัณฑ์";
                    intCount += 1;
                  }
                  _strUpdateError = SetRollLeafTrayTable(dtRowLeaf,"SerialShtPcs")
                  console.log(_strUpdateError, "strUpdateError");
                }

              }
            }
            else{
              _strScanResultAll = "NG";
              _strUpdateError = "Roll leaf no. incorrect.";
              _strErrorAll = "Roll leaf no. incorrect.";
            }
          }
          if(!_bolError && _strUpdateError == ""){
            //Sucha modify 31-Aug-2016 update slowly
            const res = await axios.post("/api/SetSerialLotShtTable", {}) //ทำ api
            _strUpdateError == res.data.p_error
            if (_strUpdateError !== ""){
              _strScanResultAll = "NG"
            }else if (hfPlasmaConnShtPcs == 'Y'){
              const res = await axios.post('/api/SetSerialRecordTimeTrayTable', jsonData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) => {_strUpdateError = res.data.p_error}).catch((error) => {alert(error)});            
              if (_strUpdateError !== ""){
                _strScanResultAll = "NG"
              }
            }
          }else{
            _strScanResultAll = "NG"
          }
        }
      setLblresult(_strScanResultAll)
      if (_strScanResultAll == 'NG') {
        // lblresult = red color 
      }else{
        // lblresult = green color
      }
      if (_strErrorAll !== "") {
        setLblresult(`${lblresult} \n ${_strErrorAll}`)
      }
      setGvScanResult(dtSerial);
      // getInitialSerial();
      // getIntialSheet();

      if (_strScanResultAll =='NG'){
        // playsound
      }      
    }else{
      setlblLog("Please input Sheet Side No. !!! ");
      Setmode("SERIAL_ERROR");
      // playsound
    }
    getCountDataBylot(lot);
    settxtRollLeaf("");
    settxtmachine("");
    if (hfCheckRollSht == 'Y'){
      setPnlRollLeafOpen(true);
      sethfMode("ROLL");
      txtRollLeaf.current.focus();
    }else if (hfReqMachine == 'Y'){
      setPnlMachineOpen(true);
      fctextFieldMachine.current.focus();
    }else{
      fctxtSideBack.current.focus()
    }
    return ;
  };

  const GetShippingSerialNo = (dtSerial) =>{
    var strReturn = '';
    var intSeq = 1;
    var strShetSeq = '';
    var strLotbase34_1 = ConvertBase34(parseInt(lot.substring(1, 2)) + parseInt(lot.substring(2, 3)) + parseInt(lot.substring(3, 4)));
    var strLotbase34_4 = Convert0000(ConvertBase34(parseInt(lot.substring(4, 10))));
    
    for(let i = 0; i<dtSerial.length; i++){
      var strResult = 'OK';
      var strRemark = '';
      if (hfWeekCode == 'S'){
        if (strLotbase34_1 !== (dtSerial[i].SERIAL).substring(10, 11) || strLotbase34_4 !== (dtSerial[i].SERIAL).substring(19, 23)){
          strReturn = 'NG';
          strResult = 'NG';
          strRemark = 'Serial mix lot';
        }else{
          if (dtSerial[i].SEQ !== dtSerial[i].SERIAL.substring(12,13)){
            strResult = 'NG';
            strReturn = 'NG';
            strRemark = 'Serial mix strip';
          }else{
            if(intSeq == 1){
              strShetSeq = dtSerial[i].SERIAL.substring(8, 11);
            }else{
              if (dtSerial[i].SERIAL.substring(8, 11) !== strShetSeq){
                strResult = 'NG';
                strReturn = 'NG';
                strRemark = 'Serial mix sheet';
              }
            }
          }
        }
      }
      dtSerial[i].SCAN_RESULT = strResult;
      dtSerial[i].REMARK = strRemark;
      intSeq += 1
    }
    return strReturn;
  }

  const  SetRollLeafTrayTable = async (dtRowLeaf,_strOperator) => {
    for(let i = 0 ;i<dtRowLeaf.length; i++){
      var _strRollNo = dtRowLeaf[i].ROLL_NO;
      var _strLotNo = dtRowLeaf[i].LOT_NO;
      var _strRollLeaf = dtRowLeaf[i].ROLL_LEAF;
      var _strSheetNo = dtRowLeaf[i].SHT_NO;
      var _strMachine = dtRowLeaf[i].MACHINE;
      var _strProduct = dtRowLeaf[i].PRODUCT;
      const res = await axios.post("/api/SetRollLeafTrayTable", {
        strOperator   : _strOperator,
        strRowUpdate  : dtRowLeaf[i].ROW_UPDATE,
        strUpdateFlg  : dtRowLeaf[i].UPDATE_FLG,
        strRollNo     : _strRollNo,
        strLotNo      : _strLotNo,
        strRollLeaf   : _strRollLeaf,
        strSheetNo    : _strSheetNo,
        strShtSeq     : dtRowLeaf[i].SHT_SEQ,
        strIntRow     : dtRowLeaf[i].ROLL_SEQ,
        strProduct    : _strProduct,
        strMachine    : _strMachine,
        strUserID     : txtOperator,
      })
      console.log(res.data.p_error, "res.data.p_error")
      return res.data.p_error;

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
    lblLog,
    lblLogState,
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
    fctxtSideBack,
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
    txtOperator_TextChanged,
    txtRollLeaf_TextChanged,
    txtOperator,
    handleFrontSideChange,
    txtSideFront,
    fctxtsideFront,
    handleBackSideChange,
    txtSideBack,
    handleFrontSide2Change,
    txtSideFront2,
  };
};

export { fn_ScanSMTSerialShtFINManySht };
