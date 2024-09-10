//  *** Khun *** //
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { color } from "framer-motion";

function fn_ScanSMTConnectRollConfirm() {
  const hfUserFactory = "";
  const [hfFlowID, setHfFlowID] = useState("0016");
  const [hfSerialCount, setHfSerialCount] = useState("");
  const [hfAutoScan, setHfAutoScan] = useState("");
  const [hfProduct, setHfProduct] = useState("");
  const [hfLot, setHfLot] = useState("");
  const [hfIPAddress, setHfIPAddress] = useState("");
  const [hfRefreshTime, sethfRefreshTime] = useState("");
  const [hfScanResult, setHfScanResult] = useState("");
  const [hfRollNo, setHfRollNo] = useState("");
  const [hfAutoDownload, setHfAutoDownload] = useState("");
  const [hfRollNoStart, setHfRollNoStart] = useState("");
  const [gvScanResult, setGvScanResult] = useState({
    value: [],
    disbled: "",
    visble: false,
    style: {},
  });
  const [lblRemark, setLblRemark] = useState("");
  const [txtSerial, setTxtSerial] = useState("");

  const [hfSerialLength, setHfSerialLength] = useState("0");
  const [hfSerialFixFlag, setHfSerialFixFlag] = useState("N");
  const [hfSerialDigit, setHfSerialDigit] = useState("");
  const [hfSerialStartDigit, setHfSerialStartDigit] = useState("0");
  const [hfSerialEndDigit, setHfSerialEndDigit] = useState("0");
  const [hfTrayFlag, setHfTrayFlag] = useState("");
  const [hfTrayLength, setHfTrayLength] = useState("0");
  const [hfTestResultFlag, setHfTestResultFlag] = useState("");
  const [hfConfigCheck, setHfConfigCheck] = useState("N");
  const [hfConfigCode, setHfConfigCode] = useState("");
  const [hfConfigStart, setHfConfigStart] = useState("0");
  const [hfConfigEnd, setHfConfigEnd] = useState("0");
  const [hfConfigRuning, setHfConfigRuning] = useState("N");
  const [hfDuplicateStart, setHfDuplicateStart] = useState("0");
  const [hfDuplicateEnd, setHfDuplicateEnd] = useState("0");
  const [hfChipIDCheck, setHfChipIDCheck] = useState("N");
  const [hfCheckPrdSht, setHfCheckPrdSht] = useState("N");
  const [hfCheckPrdShtStart, setHfCheckPrdShtStart] = useState("0");
  const [hfCheckPrdShtEnd, setHfCheckPrdShtEnd] = useState("0");
  const [hfCheckPrdAbbr, setHfCheckPrdAbbr] = useState("");
  const [hfPlasmaCheck, setHfPlasmaCheck] = useState("N");
  const [hfPlasmaTime, setHfPlasmaTime] = useState("0");
  const [hfCheckLotSht, setHfCheckLotSht] = useState("N");
  const [hfCheckLotShtStart, setHfCheckLotShtStart] = useState("0");
  const [hfCheckLotShtEnd, setHfCheckLotShtEnd] = useState("0");
  const [hfCheckStartSeq, setHfCheckStartSeq] = useState("N");
  const [hfCheckStartSeqCode, setHfCheckStartSeqCode] = useState("");
  const [hfCheckStartSeqStart, setHfCheckStartSeqStart] = useState("0");
  const [hfCheckStartSeqEnd, setHfCheckStartSeqEnd] = useState("0");
  const [hfConnRollLeafFlg, setHfConnRollLeafFlg] = useState("N");
  const [hfConnRollLength, setHfConnRollLength] = useState("0");
  const [hfConnLeafLength, setHfConnLeafLength] = useState("0");
  const [hfCheckDateInProc, setHfCheckDateInProc] = useState("N");
  const [hfDateInProc, setHfDateInProc] = useState("");
  const [hfCheckWeekCode, setHfCheckWeekCode] = useState("N");
  const [hfCheckWeekCodeStart, setHfCheckWeekCodeStart] = useState("");
  const [hfCheckWeekCodeEnd, setHfCheckWeekCodeEnd] = useState("");
  const [hfWeekCode, setHfWeekCode] = useState("");
  const [hfWeekCodeType, setHfWeekCodeType] = useState("");
  const [hfLeafScan, setHfLeafScan] = useState("0");
  const [hfLeafSerialFlg, setHfLeafSerialFlg] = useState("N");
  const [hfCheckRollPrdFlg, setHfCheckRollPrdFlg] = useState("N");
  const [hfCheckRollPrdStart, setHfCheckRollPrdStart] = useState("0");
  const [hfCheckRollPrdEnd, setHfCheckRollPrdEnd] = useState("0");
  const [hfCheckRollPrd, setHfCheckRollPrd] = useState("");
  const [hfSerialStartCode, setHfSerialStartCode] = useState("");
  const [lblShtCount, setLblShtCount] = useState("");
  const [lblTotalSht, setLblTotalSht] = useState("");
  const [hfMode, setHfMode] = useState("LOT");
  const [Product, setProduct] = useState([]);
  const [hfShtScan, setHfShtScan] = useState("1");
  const [gvSerial, setGvSerial] = useState({
    value: [],
    disbled: "",
    visble: false,
    style: {},
  });
  const [txtLot, setTxtLot] = useState({
    value: "",
    disbled: "",
    visble: "",
    style: {},
  });

  const [ddlProduct, setDdlProduct] = useState({
    value: "",
    disbled: "",
    visble: false,
    style: {},
  });
  const [lblpnlLog, setLblPnlLog] = useState({
    value: "",
    disbled: "",
    visble: false,
    style: {},
  });
  const [lblResult, setLblResult] = useState({
    value: "",
    disbled: "",
    visble: false,
    style: {},
  });

  const [pnlSerial, setPnlSerial] = useState({
    value: "",
    disbled: "",
    visble: false,
    style: {},
  });
  const hfCheckOST = "Y";
  const plantCode = import.meta.env.VITE_FAC;
  const hfUserID = localStorage.getItem("ipAddress");
  const hfUserStation = localStorage.getItem("ipAddress");
  const gvSerialRefs = useRef([]);

  useEffect(() => {
    const fetchData = async () => {
      setHfMode("");
      await getProduct();
      await SetMode("LOT");
    };
    fetchData();
  }, []);

  const ibtBack_Click = async () => {
    setTxtLot((prevState) => ({
      ...prevState,
      value: "",
      disbled: false,
      style: { background: "" },
    }));
    setPnlSerial((prevState) => ({
      ...prevState,
      visble: false,
    }));
    setDdlProduct((prevState) => ({
      ...prevState,
      value: Product[0].prd_name,
    }));
    setLblShtCount("");
    SetMode("LOT");
    fnSetFocus("txtLot_ScanSMTConnectRollConfirm_focus");
  };

  const btnCancel_Click = async () => {
    SetMode("SERIAL");
    fnSetFocus("gvSerial_txtSerial_0");
  };

  const btnSave_Click = async () => {
    if (hfMode == "SERIAL") {
      await setSerialData();
    }
  };

  const handleSerialChange = async (index, event) => {
    const newValues = [...txtSerial];
    newValues[index] = event.target.value;
    setTxtSerial(newValues);
  };

  const getProduct = async () => {
    await axios.get("/api/Common/GetProductData").then((res) => {
      let data = res.data.flat();
      setProduct(data);
      setDdlProduct((prevState) => ({ ...prevState, value: data[0].prd_name }));
    });
  };

  const SetMode = async (_strType) => {
    console.log("MODE", _strType);
    if (_strType == "LOT") {
      await getProduct();
      setDdlProduct((prevState) => ({
        ...prevState,
        disbled: false,
      }));
      setTxtLot((prevState) => ({
        ...prevState,
        value: "",
        disbled: false,
        style: { background: "" },
      }));
      setLblShtCount("");
      setLblTotalSht("");
      setLblResult((prevState) => ({
        ...prevState,
        value: "",
      }));
      setLblPnlLog((prevState) => ({
        ...prevState,
        visble: false,
      }));
      setPnlSerial((prevState) => ({
        ...prevState,
        visble: false,
      }));
      setHfMode("LOT");
      fnSetFocus("txtLot_ScanSMTConnectRollConfirm_focus");
    }
    if (_strType == "LOT_ERROR") {
      setTxtLot((prevState) => ({
        ...prevState,
        value: "",
        disbled: false,
        style: { background: "" },
      }));
      setLblShtCount("");
      setLblTotalSht("");
      setLblResult((prevState) => ({
        ...prevState,
        value: "",
      }));
      setLblPnlLog((prevState) => ({
        ...prevState,
        visble: true,
      }));
      setPnlSerial((prevState) => ({
        ...prevState,
        visble: false,
      }));
      setHfMode("LOT");
      fnSetFocus("txtLot_ScanSMTConnectRollConfirm_focus");
    }
    if (_strType == "SERIAL") {
      setTxtLot((prevState) => ({
        ...prevState,
        disbled: true,
        style: { background: "#EEEEEE" },
      }));
      setLblPnlLog((prevState) => ({
        ...prevState,
        visble: false,
      }));
      setPnlSerial((prevState) => ({
        ...prevState,
        visble: true,
      }));
      setHfMode("SERIAL");
      await getInitialSerial();
    }
    if (_strType == "SERIAL_ERROR") {
      setTxtLot((prevState) => ({
        ...prevState,
        disbled: true,
        style: { background: "#EEEEEE" },
      }));
      setLblPnlLog((prevState) => ({
        ...prevState,
        visble: true,
      }));
    }
    if (_strType == "SERIAL_OK") {
      setTxtLot((prevState) => ({
        ...prevState,
        disbled: true,
        style: { background: "#EEEEEE" },
      }));
      setLblPnlLog((prevState) => ({
        ...prevState,
        visble: false,
      }));
      setPnlSerial((prevState) => ({
        ...prevState,
        visble: true,
      }));
      await getInitialSerial();
      fnSetFocus("gvSerial");
    }
    if (_strType == "SERIAL_NG") {
      setTxtLot((prevState) => ({
        ...prevState,
        disbled: true,
        style: { background: "#EEEEEE" },
      }));
      setLblPnlLog((prevState) => ({
        ...prevState,
        visble: false,
      }));
    }
  };

  const getInitialSerial = async () => {
    let dtData = [];
    for (let intRow = 1; intRow <= parseInt(hfShtScan, 10); intRow++) {
      // for (let intRow = 0; intRow < txtTotalLeaf; intRow++) {
      dtData.push({
        SEQ: intRow,
      });
    }

    setGvSerial((prevState) => ({ ...prevState, value: dtData, visble: true }));
    return 0;
  };

  const setSerialData = async () => {
    console.log(" เข้ามายัง setSerialData แล้ว");
    let dtSerial = await getInputSerial();
    let dtSheet = await getSheetResult();
    let _strLotData = "";
    let _strLot = "";
    let _strPrdName = setDdlProduct.value;
    let _strShtNoBack = "";
    let _strShtNoFront = "";
    let _strTray = " ";
    let _intSeq = 1;
    let _intOK = 0;
    let _strScanResultAll = "";
    let _strErrorAll = "";
    let _strUpdateError = "";
    let _bolUpdate = false;
    let _bolError = false;
    setLblShtCount("0");
    setLblRemark("");
    _strLotData = txtLot.value.trim().toUpperCase().split(";");
    _strLot = _strLotData[0];
    if (txtLot.value !== "" && dtSerial.length > 0) {
      _strScanResultAll = "NG";
      setLblRemark("");
      let _intRowSerial = 0;
      for (let i = 0; i < dtSerial.length; i++) {
        const drRow = dtSerial[i];

        if (drRow.SERIAL !== "") {
          let _strSerial = drRow.SERIAL;
          let _strTestResult = "NONE";
          let _strMessageUpdate = "";
          let _strScanResultUpdate = "";
          let _inCountSeq = 0;
          let _strSerialDup = "";
          for (let j = 0; j < dtSheet.length; j++) {
            const drShtRow = dtSheet[j];
            console.log(
              drShtRow,
              " 190567332;#####",
              _strSerial,
              drRow
            );
            if (
              drShtRow.SHEET_NO === _strSerial &&
              drShtRow.DATA_REMARK === ""
            ) {
              console.log("C-1");
              drShtRow.SCAN_RESULT = "OK";
              drRow.ROLL_LEAF_NO = drShtRow.ROLL_LEAF_NO;
              drRow.SHEET_NO = drShtRow.SHEET_NO;
              drRow.SCAN_RESULT = drShtRow.SCAN_RESULT;
              _strScanResultAll = drShtRow.SCAN_RESULT;
              setLblRemark("");
              _bolUpdate = true;
            } else if (
              drShtRow.SHEET_NO === _strSerial &&
              drShtRow.DATA_REMARK !== ""
            ) {
              console.log("C-2");
              drShtRow.SCAN_RESULT = "NG";
              drRow.ROLL_LEAF_NO = drShtRow.ROLL_LEAF_NO;
              drRow.SHEET_NO = drShtRow.SHEET_NO;
              drRow.SCAN_RESULT = drShtRow.SCAN_RESULT;
              _strScanResultAll = drShtRow.SCAN_RESULT;
              setLblRemark(drShtRow.DATA_REMARK);
              _bolUpdate = true;
            }
          }
          if (
            _strSerial.length === parseInt(hfConnLeafLength) &&
            lblRemark === "" &&
            _strScanResultAll === "NG"
          ) {
            console.log(" เข้ามายัง if ขั้นตอนแรก ");
            if (hfCheckLotSht === "Y") {
              console.log(" เข้ามายัง if ขั้นตอนสอง ");
              if (
                _strLot !==
                _strSerial.substring(
                  parseInt(hfCheckLotShtStart),
                  parseInt(hfCheckLotShtEnd) + 1
                )
              ) {
                console.log(" เข้ามายัง if ขั้นตอนสาม ");
                setLblRemark("MIX LOT");
              } else {
                console.log(" เข้ามายัง else if ขั้นตอนสาม ");
                setLblRemark("NO DATA");
              }
            } else {
              console.log(" เข้ามายัง  else if ขั้นตอนสอง ");
              setLblRemark("NO DATA");
            }
          } else if (
            _strSerial.length !== parseInt(hfConnLeafLength) &&
            lblRemark === "" &&
            _strScanResultAll === "NG"
          ) {
            console.log(" เข้ามายัง else if ขั้นตอนแรก ");
            setLblRemark("DATA INCORRECT");
          }
        }
      }
      for (let i = 0; i < dtSheet.length; i++) {
        const drShtRow = dtSheet[i];
        if (drShtRow.SCAN_RESULT === "OK") {
          _intOK = _intOK + 1;
        }
      }
      if (_bolUpdate) {
        console.log(" เข้ามายัง _bolUpdate ขั้นตอนแรก ");
        let strError = "";
        // for (let i = 0; i < dtSerial.length; i++) {
        //   dtSerial[i].strPlantCode = "5";
        //   await axios
        //     .post("/api/SetConfirmConnectRollLeaf", {
        //       dataList: {
        //         strPlantCode:  dtSerial[i].strPlantCode,
        //         SCAN_RESULT: dtSerial[i].SCAN_RESULT,
        //         ROLL_LEAF_NO :dtSerial[i].ROLL_LEAF_NO,
        //         SHEET_NO :dtSerial[i].SHEET_NO,
        //       },
        //     })
        //     .then((res) => {
        //       strError = res.data;
        //     });
        // }
        if (strError !== "") {
          console.log(" เข้ามายัง _bolUpdate ขั้นตอนสอง ที่ strError ");
          _strScanResultAll = "NG";
        }
        if (_intOK == parseInt(lblTotalSht, 10)) {
          console.log(" เข้ามายัง _bolUpdate ขั้นตอนสาม ที่ _intOK ");
          //   await axios
          //     .post("/api/CallFPCFlowConfirmConnectRollLeaf", {
          //       strFlowID: hfFlowID,
          //       strLotNo: _strLot,
          //       strResult: "P",
          //     })
          //     .then((res) => {
          //       strError = res.data;
          //     });
          // } else if (_intOK > parseInt(lblTotalSht, 10)) {
          //   await axios
          //     .post("/api/CallFPCFlowConfirmConnectRollLeaf", {
          //       strFlowID: hfFlowID,
          //       strLotNo: _strLot,
          //       strResult: "F",
          //     })
          //     .then((res) => {
          //       strError = res.data;
          //     });
        }

        setLblResult((prevState) => ({
          ...prevState,
          value: _strScanResultAll,
        }));
        console.log("_strScanResultAll",_strScanResultAll)

        if (_strScanResultAll.slice(0, 2) === "NG") {
          setLblResult((prevState) => ({
            ...prevState,
            style: { color: "red" },
          }));
        } else {
          setLblResult((prevState) => ({
            ...prevState,
            style: { color: "green" },
          }));
        }

        setGvScanResult((prevState) => ({
          ...prevState,
          value: dtSheet,
        }));

        await getInitialSerial();
        setLblPnlLog((prevState) => ({
          ...prevState,
          visble: false,
        }));
        console.log(" ออกจาก _bolUpdate ขั้นตอนแรก ");
      }
    } else {
      setLblPnlLog((prevState) => ({
        ...prevState,
        value: "Please input lot no. ",
      }));
      SetMode("SERIAL_ERROR");
      console.log("กรอกข้อมูล lot no ซะ");
    }
    await getShtDataBylot(txtLot.value);
    fnSetFocus("gvSerial_txtSerial_0");
    console.log("ออกจาก setSerialData แล้ว ");
    return 0;
  };
  const ddlProduct_SelectedIndexChanged = async () => {
    if (txtLot.value.trim().toUpperCase() !== "") {
      setLblPnlLog((prevState) => ({
        ...prevState,
        value: "",
        visble: false,
      }));
      SetMode("SERIAL");
      fnSetFocus("gvSerial_txtSerial_0");
    } else {
      setDdlProduct((prevState) => ({
        ...prevState,
        value: Product[0].prd_name,
      }));
      SetMode("LOT");
    }
  };

  const txtLot_TextChanged = async () => {
    let strLotData = "";
    let strLot = "";
    let strPrdName = "";
    strLotData = txtLot.value.trim().toUpperCase().split(";");
    setLblShtCount("0");
    setLblTotalSht("0");
    if (strLotData.length >= 2) {
      strLot = strLotData[0].trim();
      await axios
        .post("/api/Common/getProductNameByLot", {
          strLot: strLot,
        })
        .then((res) => {
          let data = res.data.prdName[0];
          strPrdName = data;
        });

      if (strPrdName !== "") {
        setLblPnlLog((prevState) => ({
          ...prevState,
          value: "",
          visble: false,
        }));
        setTxtLot((prevState) => ({ ...prevState, value: strLot }));
        try {
          setDdlProduct((prevState) => ({ ...prevState, value: strPrdName }));
          await getProductSerialMaster(strPrdName);
          SetMode("SERIAL");
          fnSetFocus("gvSerial_txtSerial_0");
        } catch (ex) {
          let intProduct = strPrdName.slice(13).indexOf("-") + 13;
          if (intProduct > 0) {
            strPrdName =
              strPrdName.substring(0, intProduct) +
              strPrdName.substring(intProduct + 1, intProduct + 11).trim();
            try {
              setDdlProduct((prevState) => ({
                ...prevState,
                value: strPrdName,
              }));
              await getProductSerialMaster(strPrdName);
              SetMode("SERIAL");
              fnSetFocus("gvSerial_txtSerial_0");
            } catch (ex2) {
              setLblPnlLog((prevState) => ({
                ...prevState,
                value: `Product ${strPrdName} not found.`,
                visble: true,
              }));
              fnSetFocus("ddlProduct_ScanSMTConnectRollConfirm_focus");
            }
          } else {
            setLblPnlLog((prevState) => ({
              ...prevState,
              value: `Product ${strPrdName} not found.`,
              visble: true,
            }));
            fnSetFocus("ddlProduct_ScanSMTConnectRollConfirm_focus");
          }
        }
      } else {
        setDdlProduct((prevState) => ({
          ...prevState,
          value: Product[0].prd_name,
        }));
        setTxtLot((prevState) => ({ ...prevState, value: "" }));
        setGvSerial((prevState) => ({ ...prevState, value: "" }));
        setLblPnlLog((prevState) => ({
          ...prevState,
          value: "Invalid lot no.",
          visble: true,
        }));
        setHfMode("LOT");
        fnSetFocus("txtLot_ScanSMTConnectRollConfirm_focus");
      }
    } else {
      setDdlProduct((prevState) => ({
        ...prevState,
        value: Product[0].prd_name,
      }));
      setTxtLot((prevState) => ({ ...prevState, value: "" }));
      setGvSerial((prevState) => ({ ...prevState, value: "" }));

      setLblPnlLog((prevState) => ({
        ...prevState,
        value: "Please scan QR Code.\n กรุณาสแกนที่คิวอาร์โค้ด",
        visble: true,
      }));
      setHfMode("LOT");
      fnSetFocus("txtLot_ScanSMTConnectRollConfirm_focus");
    }
    await getShtDataBylot(strLot);
  };

  const getInputSerial = async () => {
    const dtData = [];
    for (let intRow = 0; intRow < gvSerial.value.length; intRow++) {
      const serial = txtSerial[intRow];
      dtData.push({
        SEQ: intRow + 1,
        SERIAL: serial,
      });
    }
    return dtData;
  };

  const getSheetResult = async () => {
    const dtData = [];
    let intRow = 0;

    for (let intSeq = 0; intSeq < gvScanResult.value.length; intSeq++) {
      intRow = intRow + 1;
      const row = {
        SEQ: intRow,
        ROLL_LEAF_NO: gvScanResult.value[intSeq].roll_leaf_no,
        SHEET_NO: gvScanResult.value[intSeq].sheet_no,
        SCAN_RESULT: gvScanResult.value[intSeq].scan_result,
        REMARK: gvScanResult.value[intSeq].remark,
        DATA_REMARK: gvScanResult.value[intSeq].date_remark,
      };
      dtData.push(row);
    }
    return dtData;
  };

  const getShtDataBylot = async (strLot) => {
    let dtSheet = [];

    let intOk = 0;
    try {
      const res = await axios.post("/api/common/GetLotRollLeafDataAllByLot", {
        dataList: {
          strlotNo: strLot,
          strPlantCode: plantCode,
          strCheckOST: hfCheckOST,
        },
      });
      dtSheet = res.data;
      if (dtSheet.length > 0) {
        setGvScanResult((prevState) => ({
          ...prevState,
          value: dtSheet,
          visble: true,
        }));
      } else {
        setGvScanResult((prevState) => ({
          ...prevState,
          value: dtSheet,
          visble: false,
        }));
      }

      for (let i = 0; i < dtSheet.length; i++) {
        if (dtSheet[i].scan_result === "OK") {
          intOk = intOk + 1;
        }
      }
      setLblShtCount(intOk);
      if (lblTotalSht === "" || lblTotalSht === "0") {
        setLblTotalSht(dtSheet.length);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    return 0;
  };

  const getProductSerialMaster = async (strPrdName) => {
    let dtProductSerial = [];
    setHfSerialLength("0");
    setHfSerialFixFlag("N");
    setHfSerialDigit("");
    setHfSerialStartDigit("0");
    setHfSerialEndDigit("0");
    setHfTrayFlag("");
    setHfTrayLength("0");
    setHfTestResultFlag("");
    setHfConfigCheck("N");
    setHfConfigCode("");
    setHfConfigStart("0");
    setHfConfigEnd("0");
    setHfConfigRuning("N");
    setHfDuplicateStart("0");
    setHfDuplicateEnd("0");
    setHfChipIDCheck("N");
    setHfCheckPrdSht("N");
    setHfCheckPrdShtStart("0");
    setHfCheckPrdShtEnd("0");
    setHfCheckPrdAbbr("");
    setHfPlasmaCheck("N");
    setHfPlasmaTime("0");
    setHfCheckLotSht("N");
    setHfCheckLotShtStart("0");
    setHfCheckLotShtEnd("0");
    setHfCheckStartSeq("N");
    setHfCheckStartSeqCode("");
    setHfCheckStartSeqStart("0");
    setHfCheckStartSeqEnd("0");
    setHfConnRollLeafFlg("N");
    setHfConnRollLength("0");
    setHfConnLeafLength("0");
    setHfCheckDateInProc("N");
    setHfDateInProc("");
    setHfCheckWeekCode("N");
    setHfCheckWeekCodeStart("");
    setHfCheckWeekCodeEnd("");
    setHfWeekCode("");
    setHfWeekCodeType("");
    setHfLeafScan("0");
    setHfLeafSerialFlg("N");
    setHfCheckRollPrdFlg("N");
    setHfCheckRollPrdStart("0");
    setHfCheckRollPrdEnd("0");
    setHfCheckRollPrd("");
    setHfSerialStartCode("");

    await axios
      .post("/api/common/GetSerialProductByProduct", {
        prdName: strPrdName,
      })
      .then((res) => {
        dtProductSerial = res.data[0];
        if (dtProductSerial != null) {
          setHfSerialLength(dtProductSerial.slm_serial_length);
          setHfSerialFixFlag(dtProductSerial.slm_fix_flag);
          setHfSerialDigit(dtProductSerial.slm_fix_digit);
          setHfSerialStartDigit(dtProductSerial.slm_fix_start_digit);
          setHfSerialEndDigit(dtProductSerial.slm_fix_end_digit);
          setHfTrayFlag(dtProductSerial.slm_tray_flag);
          setHfTrayLength(dtProductSerial.slm_tray_length);
          setHfTestResultFlag(dtProductSerial.slm_test_result_flag);
          setHfSerialCount(dtProductSerial.slm_serial_count);
          setHfAutoScan(dtProductSerial.slm_auto_scan);
          setHfConfigCheck(dtProductSerial.prm_barcode_req_config);
          setHfConfigCode(dtProductSerial.prm_config_code);
          setHfConfigStart(dtProductSerial.prm_start_config);
          setHfConfigEnd(dtProductSerial.prm_end_config);
          setHfConfigRuning(dtProductSerial.prm_running_req_config);
          setHfDuplicateStart(dtProductSerial.prm_duplicate_start);
          setHfDuplicateEnd(dtProductSerial.prm_duplicate_end);
          setHfChipIDCheck(dtProductSerial.prm_check_chip_id_flg);
          setHfCheckPrdAbbr(dtProductSerial.prm_abbr);
          setHfPlasmaCheck(dtProductSerial.prm_plasma_time_flg);
          setHfPlasmaTime(dtProductSerial.prm_plasma_time);
          setHfCheckStartSeq(dtProductSerial.prm_req_start_seq_flg);
          setHfCheckStartSeqCode(dtProductSerial.prm_start_seq_code);
          setHfCheckStartSeqStart(dtProductSerial.prm_start_seq_start);
          setHfCheckStartSeqEnd(dtProductSerial.prm_start_seq_end);
          setHfConnRollLeafFlg(dtProductSerial.prm_conn_roll_leaf_flg);
          setHfConnRollLength(dtProductSerial.prm_conn_roll_length);
          setHfConnLeafLength(dtProductSerial.prm_conn_leaf_length);
          setHfCheckDateInProc(dtProductSerial.prm_date_inproc_flg);
          setHfDateInProc(dtProductSerial.prm_date_inproc);
          setHfWeekCodeType(dtProductSerial.prm_date_type);
          setHfCheckWeekCode(dtProductSerial.prm_check_weekcode_flg);
          setHfCheckWeekCodeStart(dtProductSerial.prm_check_weekcode_start);
          setHfCheckWeekCodeEnd(dtProductSerial.prm_check_weekcode_end);
          setHfLeafScan(dtProductSerial.prm_conn_roll_leaf_scan);
          setHfLeafSerialFlg(dtProductSerial.prm_conn_roll_serial_flg);
          setHfCheckRollPrdFlg(dtProductSerial.prm_conn_roll_prd_flg);
          setHfCheckRollPrdStart(dtProductSerial.prm_conn_roll_prd_start);
          setHfCheckRollPrdEnd(dtProductSerial.prm_conn_roll_prd_end);
          setHfCheckRollPrd(dtProductSerial.prm_conn_roll_prd_fix);
          setHfCheckPrdSht(dtProductSerial.prm_conn_roll_req_prd_sht);
          setHfCheckPrdShtStart(dtProductSerial.prm_conn_roll_prd_sht_start);
          setHfCheckPrdShtEnd(dtProductSerial.prm_conn_roll_prd_sht_end);
          setHfCheckLotSht(dtProductSerial.prm_conn_roll_req_lot_sht);
          setHfCheckLotShtStart(dtProductSerial.prm_conn_roll_lot_sht_start);
          setHfCheckLotShtEnd(dtProductSerial.prm_conn_roll_lot_sht_end);
          setHfSerialStartCode(dtProductSerial.prm_serial_start_code);
        }
      });
    return 0;
  };

  function fnSetFocus(txtField) {
    document.getElementById(`${txtField}`).focus();
    // const element = document.getElementById(txtField);
    // if (element) {
    //   element.focus();
    // } else {
    //   console.error(`Element with id ${txtField} not found.`);
    // }
  }
  return {
    txtLot,
    setTxtLot,
    txtLot_TextChanged,
    ddlProduct,
    setDdlProduct,
    ddlProduct_SelectedIndexChanged,
    Product,
    lblTotalSht,
    lblShtCount,
    lblpnlLog,
    ibtBack_Click,
    getInputSerial,
    gvSerial,
    txtSerial,
    gvScanResult,
    gvSerialRefs,
    handleSerialChange,
    btnCancel_Click,
    lblResult,
    pnlSerial,
    btnSave_Click,
  };
}

export { fn_ScanSMTConnectRollConfirm };
