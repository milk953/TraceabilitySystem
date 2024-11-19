import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function fn_ScanSMTPlasmaStopStart() {

  const [txtLotNo, settxtLotNo] = useState("");
  const [selProduct, setselProduct] = useState(null);
  const [Productdata, setProductdata] = useState([]);
  const [selectedrbt, setselectedrbt] = useState("rbtStop");
  const [txtPartialNo, settxtPartialNo] = useState("");
  const [lblPatialNo, setlblPatialNo] = useState("");
  const [visiblelog, setvisiblelog] = useState(false);
  const [lblLog, setlblLog] = useState("");
  const [pnlStatus, setpnlStatus] = useState(false);
  const [lblStatus, setlblStatus] = useState("");
  const [lblStatusColor, setlblStatusColor] = useState("green");

  //hiddenfield
  const hfUserID = localStorage.getItem("hfUserID");
  const hfUserStation = localStorage.getItem("hfUserStation");
  const [hfUserFactory, sethfUserFactory] = useState("");
  const [hfPlantCode, sethfPlantCode] = useState("");
  const [hfProductKind, sethfProductKind] = useState("");
  const [hfSerialLength, sethfSerialLength] = useState("");
  const [hfSerialFixFlag, sethfSerialFixFlag] = useState("");
  const [hfSerialDigit, sethfSerialDigit] = useState("");
  const [hfSerialStartDigit, sethfSerialStartDigit] = useState("");
  const [hfSerialEndDigit, sethfSerialEndDigit] = useState("");
  const [hfTrayFlag, sethfTrayFlag] = useState("");
  const [hfTrayLength, sethfTrayLength] = useState("");
  const [hfTestResultFlag, sethfTestResultFlag] = useState("");
  const [hfSerialCount, sethfSerialCount] = useState("");
  const [hfAutoScan, sethfAutoScan] = useState("");
  const [hfMode, sethfMode] = useState("");
  const [hfConfigCheck, sethfConfigCheck] = useState("");
  const [hfConfigCode, sethfConfigCode] = useState("");
  const [hfConfigStart, sethfConfigStart] = useState("");
  const [hfConfigEnd, sethfConfigEnd] = useState("");
  const [hfConfigRuning, sethfConfigRuning] = useState("");
  const [hfDuplicateStart, sethfDuplicateStart] = useState("");
  const [hfDuplicateEnd, sethfDuplicateEnd] = useState("");
  const [hfChipIDCheck, sethfChipIDCheck] = useState("");
  const [hfCheckPrdSht, sethfCheckPrdSht] = useState("");
  const [hfCheckPrdShtStart, sethfCheckPrdShtStart] = useState("");
  const [hfCheckPrdShtEnd, sethfCheckPrdShtEnd] = useState("");
  const [hfCheckPrdAbbr, sethfCheckPrdAbbr] = useState("");
  const [hfPlasmaCheck, sethfPlasmaCheck] = useState("");
  const [hfPlasmaTime, sethfPlasmaTime] = useState("");
  const [hfCheckStartSeq, sethfCheckStartSeq] = useState("");
  const [hfCheckStartSeqCode, sethfCheckStartSeqCode] = useState("");
  const [hfCheckStartSeqStart, sethfCheckStartSeqStart] = useState("");
  const [hfCheckStartSeqEnd, sethfCheckStartSeqEnd] = useState("");
  const [hfCheckDateInProc, sethfCheckDateInProc] = useState("");
  const [hfDateInProc, sethfDateInProc] = useState("");
  const [hfCheckWeekCode, sethfCheckWeekCode] = useState("");
  const [hfCheckWeekCodeStart, sethfCheckWeekCodeStart] = useState("");
  const [hfCheckWeekCodeEnd, sethfCheckWeekCodeEnd] = useState("");
  const [hfWeekCodeType, sethfWeekCodeType] = useState("");
  const [hfWeekCode, sethfWeekCode] = useState("");
  const [hfUserName, sethfUserName] = useState("");

  //Disabled
  const [txtLotDisabled, settxtLotDisabled] = useState(false);
  const [selProductDisabled, setselProductDisabled] = useState(false);
  const [txtPartialDisabled, settxtPartialDisabled] = useState(false);

  //inputRef
  const inputLot = useRef(null);
  const ddlProduct = useRef(null);
  const inputPartial = useRef(null);

  const plantCode = import.meta.env.VITE_FAC;
  const name = localStorage.getItem("Username");
  const surname = localStorage.getItem("Lastname");

  const initialSurname = surname ? surname.charAt(0) : '';
  const Username = `${name}.${initialSurname}`;

  useEffect(() => {
    PageLoad();
    sethfUserName(Username);
  }, []);

  const PageLoad = async () => {
    localStorage.setItem("hfUserID", localStorage.getItem("ipAddress"));
    localStorage.setItem("hfUserStation", localStorage.getItem("ipAddress"));
    sethfPlantCode(import.meta.env.VITE_FAC);
    sethfProductKind(import.meta.env.VITE_PRODUCT_KIND);

    localStorage.setItem("hfMode", "");
    getProductData();

  };

  const getProductData = async () => {
    axios.get("/api/Common/GetProductData").then((res) => {
      let data = res.data.flat();
      setProductdata(data);
      setselProduct(data[0].prd_name);
    });
  };

  const handleChangeLot = async () => {
    let strLot = "";
    let strPrdName = "";
    const strLotData = txtLotNo.toUpperCase().split(";");
    strLot = strLotData[0];
    axios.post("/api/Common/getProductNameByLot", {
      strLot: strLot,
    })
      .then((res) => {
        strPrdName = res.data.prdName[0];
        console.log("PrdName:", strPrdName);
        if (strPrdName !== "") {
          setlblLog("");
          setvisiblelog(false);
          settxtLotNo(strLot);
          setlblPatialNo(strLot);
          console.log("yyy", lblPatialNo)
          try {
            setselProduct(strPrdName);
            SetMode("PARTIAL");
          } catch (error) {
            const intProduct = strPrdName.indexOf('-', 12);
            if (intProduct > -1) {
              strPrdName =
                strPrdName.substring(0, intProduct) +
                strPrdName.substring(intProduct + 1, intProduct + 11).trim();
              try {
                setselProduct(strPrdName);
                SetMode("PARTIAL");
              } catch (error) {
                setlblLog("Product " + strPrdName + " not found.");
                setvisiblelog(true);
                ddlProduct.current.focus();
              }
            } else {
              setlblLog("Product " + strPrdName + " not found.");
              setvisiblelog(true);
              ddlProduct.current.focus();
            }
          }
        } else {
          setselProduct(Productdata[0].prd_name);
          settxtLotNo("");
          setlblPatialNo("");
          setlblLog("Invalid lot no.");
          setvisiblelog(true);
          setpnlStatus(false);
          sethfMode("LOT");
          inputLot.current.focus();
        }
      })
  };

  const ibtBackClick = () => {
    setselProduct(Productdata[0].prd_name);
    SetMode("LOT");
    inputLot.current.focus();
  };

  const handleChangeProduct = async (value) => {
    setselProduct(value);
    getProductSerialMaster(value);
    if (txtLotNo !== "") {
      setlblLog("");
      setvisiblelog(false);
      SetMode("PARTIAL");
    } else {
      setselProduct(Productdata[0].prd_name);
      SetMode("LOT");
    }
  };

  const handleChangerbtStopStart = (event) => {
    setselectedrbt(event.target.value);
  };

  const handleChangePartial = async () => {
    if (txtPartialNo !== "") {
      settxtPartialNo(txtPartialNo);
      setPartialRecordTime();
    } else {
      settxtPartialNo("");
      inputPartial.current.focus();
    }
  };

  const getProductSerialMaster = async (strPrdName) => {
    let dtPro = "";
    sethfSerialLength("0");
    sethfSerialFixFlag("N");
    sethfSerialDigit("");
    sethfSerialStartDigit("0");
    sethfSerialEndDigit("0");
    sethfTrayFlag("");
    sethfTrayLength("0");
    sethfTestResultFlag("");
    sethfConfigCheck("N");
    sethfConfigCode("");
    sethfConfigStart("0");
    sethfConfigEnd("0");
    sethfConfigRuning("N");
    sethfDuplicateStart("0");
    sethfDuplicateEnd("0");
    sethfChipIDCheck("N");
    sethfCheckPrdSht("N");
    sethfCheckPrdShtStart("0");
    sethfCheckPrdShtEnd("0");
    sethfCheckPrdAbbr("");
    sethfPlasmaCheck("N");
    sethfPlasmaTime("0");

    sethfCheckStartSeq("N");
    sethfCheckStartSeqCode("");
    sethfCheckStartSeqStart("0");
    sethfCheckStartSeqEnd("0");
    sethfCheckDateInProc("N");
    sethfDateInProc("");
    sethfCheckWeekCode("N");
    sethfCheckWeekCodeStart("");
    sethfCheckWeekCodeEnd("");
    sethfWeekCode("");
    sethfWeekCodeType("");

    axios.post("/api/Common/GetSerialProductByProduct", {
      prdName: strPrdName,
    })
      .then((res) => {
        dtPro = res.data[0];
        if (dtPro !== "") {
          sethfSerialLength(dtPro.SLM_SERIAL_LENGTH);
          sethfSerialFixFlag(dtPro.SLM_FIX_FLAG);
          sethfSerialDigit(dtPro.SLM_FIX_DIGIT);
          sethfSerialStartDigit(dtPro.SLM_FIX_START_DIGIT);
          sethfSerialEndDigit(dtPro.SLM_FIX_END_DIGIT);
          sethfTrayFlag(dtPro.SLM_TRAY_FLAG);
          sethfTrayLength(dtPro.SLM_TRAY_LENGTH);
          sethfTestResultFlag(dtPro.SLM_TEST_RESULT_FLAG);
          sethfAutoScan(dtPro.SLM_AUTO_SCAN);
          sethfConfigCheck(dtPro.PRM_BARCODE_REQ_CONFIG);
          sethfConfigCode(dtPro.PRM_CONFIG_CODE);
          sethfConfigStart(dtPro.PRM_START_CONFIG);
          sethfConfigEnd(dtPro.PRM_END_CONFIG);
          sethfConfigRuning(dtPro.PRM_RUNNING_REQ_CONFIG);
          sethfDuplicateStart(dtPro.PRM_DUPLICATE_START);
          sethfDuplicateEnd(dtPro.PRM_DUPLICATE_END);
          sethfChipIDCheck(dtPro.PRM_CHECK_CHIP_ID_FLG);
          sethfCheckPrdSht(dtPro.PRM_REQ_CHECK_PRD_SHT);
          sethfCheckPrdShtStart(dtPro.PRM_CHECK_PRD_SHT_START);
          sethfCheckPrdShtEnd(dtPro.PRM_CHECK_PRD_SHT_END);
          sethfCheckPrdAbbr(dtPro.PRM_ABBR);
          sethfPlasmaCheck(dtPro.PRM_PLASMA_TIME_FLG);
          sethfPlasmaTime(dtPro.PRM_PLASMA_TIME);
          sethfCheckStartSeq(dtPro.PRM_REQ_START_SEQ_FLG);
          sethfCheckStartSeqCode(dtPro.PRM_START_SEQ_CODE);
          sethfCheckStartSeqStart(dtPro.PRM_START_SEQ_START);
          sethfCheckStartSeqEnd(dtPro.PRM_START_SEQ_END);
          sethfCheckDateInProc(dtPro.PRM_DATE_INPROC_FLG);
          sethfDateInProc(dtPro.PRM_DATE_INPROC);
          sethfWeekCodeType(dtPro.PRM_DATE_TYPE);
          sethfCheckWeekCode(dtPro.PRM_CHECK_WEEKCODE_FLG);
          sethfCheckWeekCodeStart(dtPro.PRM_CHECK_WEEKCODE_START);
          sethfCheckWeekCodeEnd(dtPro.PRM_CHECK_WEEKCODE_END);
        }
      })
  };

  const setPartialRecordTime = async () => {
    let _strLotNo = txtLotNo.toUpperCase().trim();
    let _strPartialNo = txtPartialNo.toUpperCase().trim();
    let _strPrdName = selProduct.toUpperCase().trim();
    let _strTimeType = "";
    let _strScanType = "";
    let _strErrorUpdate = "";
    let intSerialCount = 0;

    setlblPatialNo(_strPartialNo);
    setvisiblelog(false);
    setpnlStatus(false);
    setlblLog("");
    setlblStatus("");

    if (selectedrbt === "rbtStop") {
      _strTimeType = "STOP"
    }
    if (selectedrbt === "rbtStart") {
      _strTimeType = "START"
    }

    await axios.post("/api/getStartStopRecordTimeByPackingNo", {
      strPlantCode: plantCode,
      strLotNo: txtLotNo,
      strPackingNo: _strPartialNo,
      strTimeType: _strTimeType
    })
      .then((res) => {
        intSerialCount = res.data.row_count;
        console.log("มาเปล่า", intSerialCount);
      });

    if (intSerialCount === 0) {
      await axios.post("/api/getStartStopRecordTimeByPartialNo", {
        strPlantCode: plantCode,
        strPartialNo: _strPartialNo,
        strTimeType: _strTimeType
      })
        .then((res) => {
          intSerialCount = res.data.row_count;
          console.log("มาดิ", intSerialCount);
        });
      _strScanType = "PARTIAL";

    } else {
      _strScanType = "PACKING";
    }

    if (intSerialCount > 0) {
      console.log(intSerialCount)
      axios.post("/api/setStartStopRecordTimeByPartialNo", {
        strPlantCode: plantCode,
        strPartialNo: _strPartialNo,
        strLotNo: _strLotNo,
        strTimeType: _strTimeType,
        strScanType: _strScanType,
        strUser: hfUserName
      })
        .then((res) => {
          _strErrorUpdate = res.data.p_error;
          console.log("มาไหม", _strErrorUpdate)
          if (_strErrorUpdate !== "") {
            setlblLog(_strErrorUpdate);
            setvisiblelog(true);
            SetMode("PARTIAL_NG");
          } else {
            setlblStatus(_strTimeType);
            if (_strTimeType === "STOP") {
              setlblStatusColor("red");
            } else {
              setlblStatusColor("green");
            }
            SetMode("PARTIAL_OK");
          }
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      setlblLog("Not found serial no. ");
      SetMode("PARTIAL_NG");
    }

  };

  const SetMode = (strType) => {
    if (strType === "LOT") {
      settxtLotNo("");
      settxtLotDisabled(false);
      setselProductDisabled(false);
      settxtPartialDisabled(true);
      settxtPartialNo("");
      setlblPatialNo("");
      setvisiblelog(false);
      setpnlStatus(false);
      inputLot.current.focus();
    } else if (strType === "LOT_ERROR") {
      settxtLotNo("");
      settxtLotDisabled(false);
      setselProductDisabled(false);
      settxtPartialDisabled(true);
      settxtPartialNo("");
      setlblPatialNo("");
      setvisiblelog(true);
      setpnlStatus(false);
      inputLot.current.focus();
    } else if (strType === "PARTIAL") {
      settxtLotDisabled(true);
      setselProductDisabled(true);
      settxtPartialDisabled(false);
      settxtPartialNo("");
      setlblPatialNo("");
      setpnlStatus(false);
      inputPartial.current.focus();
    } else if (strType === "PARTIAL_OK") {
      settxtPartialDisabled(false);
      settxtPartialNo("");
      setpnlStatus(true);
      inputPartial.current.focus();
    } else if (strType === "PARTIAL_NG") {
      settxtPartialDisabled(false);
      settxtPartialNo("");
      setpnlStatus(false);
      inputPartial.current.focus();
    }
  };

  useEffect(() => {
    if (!txtLotDisabled) {
      inputLot.current.focus();
    }
  }, [txtLotDisabled])

  return {
    txtLotNo, settxtLotNo, selProduct, Productdata, selectedrbt, txtPartialNo, settxtPartialNo, lblPatialNo, visiblelog, lblLog,
    pnlStatus, txtLotDisabled, selProductDisabled, txtPartialDisabled, inputLot, ddlProduct, inputPartial, handleChangeLot, ibtBackClick,
    handleChangeProduct, handleChangePartial, lblStatus, handleChangerbtStopStart, lblStatusColor
  }
};

export { fn_ScanSMTPlasmaStopStart };