//  *** Khun *** //
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { color } from "framer-motion";
import { Tag } from "antd";
function fn_ScanSMTSerialXrayConfirm() {
  const hfUserID = localStorage.getItem("ipAddress");
  const hfUserStation = localStorage.getItem("ipAddress");
  const CONNECT_SERIAL_ERROR = import.meta.env.VITE_CONNECT_SERIAL_ERROR;
  const AUTO_SCAN_CHECK_FLG = import.meta.env.VITE_AUTO_SCAN_CHECK_FLG;
  const hfUserFactory = "";
  const _strTagNewLine = "/";
  const _strEventArgument = "";
  const [txtSerial, setTxtSerial] = useState("");
  const [hfSerialLength, setHfSerialLength] = useState("0");
  const [hfSerialFixFlag, setHfSerialFixFlag] = useState("N");
  const [hfSerialDigit, setHfSerialDigit] = useState("");
  const [hfSerialStartDigit, setHfSerialStartDigit] = useState("0");
  const [hfSerialEndDigit, setHfSerialEndDigit] = useState("0");
  const [hfTrayFlag, setHfTrayFlag] = useState("");
  const [hfTrayLength, setHfTrayLength] = useState("0");
  const [hfTestResultFlag, setHfTestResultFlag] = useState("");
  const [hfSerialCount, setHfSerialCount] = useState("");
  const [hfAutoScan, setHfAutoScan] = useState("");
  const [hfMode, setHfMode] = useState("");
  const [hfBarcodeSide, setHfBarcodeSide] = useState("");
  const [hfShtScan, setHfShtScan] = useState("1");
  const [hfConfigCheck, setHfConfigCheck] = useState("N");
  const [hfConfigCode, setHfConfigCode] = useState("");
  const [hfConfigStart, setHfConfigStart] = useState("0");
  const [hfConfigEnd, setHfConfigEnd] = useState("0");
  const [hfConfigRuning, setHfConfigRuning] = useState("N");
  const [hfDuplicateStart, setHfDuplicateStart] = useState("0");
  const [hfDuplicateEnd, setHfDuplicateEnd] = useState("0");
  const [hfCheckPrdSht, setHfCheckPrdSht] = useState("N");
  const [hfCheckPrdShtStart, setHfCheckPrdShtStart] = useState("0");
  const [hfCheckPrdShtEnd, setHfCheckPrdShtEnd] = useState("0");
  const [hfCheckPrdAbbr, setHfCheckPrdAbbr] = useState("");
  const [hfCheckLotSht, setHfCheckLotSht] = useState("N");
  const [hfCheckLotShtStart, setHfCheckLotShtStart] = useState("0");
  const [hfCheckLotShtEnd, setHfCheckLotShtEnd] = useState("0");
  const [hfCheckStartSeq, setHfCheckStartSeq] = useState("N");
  const [hfCheckStartSeqCode, setHfCheckStartSeqCode] = useState("");
  const [hfCheckStartSeqStart, setHfCheckStartSeqStart] = useState("0");
  const [hfCheckStartSeqEnd, setHfCheckStartSeqEnd] = useState("0");
  const [hfCheckSheetELT, setHfCheckSheetELT] = useState("N");
  const [hfCheckDateInProc, setHfCheckDateInProc] = useState("N");
  const [hfDateInProc, setHfDateInProc] = useState("");
  const [hfCheckWeekCode, setHfCheckWeekCode] = useState("N");
  const [hfCheckWeekCodeStart, setHfCheckWeekCodeStart] = useState("");
  const [hfCheckWeekCodeEnd, setHfCheckWeekCodeEnd] = useState("");
  const [hfWeekCodeType, setHfWeekCodeType] = useState("");
  const [hfWeekCode, setHfWeekCode] = useState("");
  const [hfCheckPreAOIF, setHfCheckPreAOIF] = useState("N");
  const [hfCheckPreAOIB, setHfCheckPreAOIB] = useState("N");
  const [hfCheckAOIF, setHfCheckAOIF] = useState("N");
  const [hfCheckAOIB, setHfCheckAOIB] = useState("N");
  const [hfCheckAOICoatF, setHfCheckAOICoatF] = useState("N");
  const [hfCheckAOICoatB, setHfCheckAOICoatB] = useState("N");
  const [hfCheckSPIF, setHfCheckSPIF] = useState("N");
  const [hfCheckSPIB, setHfCheckSPIB] = useState("N");
  const [hfReqMachine, setHfReqMachine] = useState("");
  const [hfConnLeafLength, setHfConnLeafLength] = useState("");
  const [hfRollNo, setHfRollNo] = useState("");
  const [hfCheckRollPrdFlg, setHfCheckRollPrdFlg] = useState("");
  const [hfCheckRollPrdStart, setHfCheckRollPrdStart] = useState("0");
  const [hfCheckRollPrdEnd, setHfCheckRollPrdEnd] = useState("0");
  const [hfCheckRollPrd, setHfCheckRollPrd] = useState("");
  const [hfSerialStartCode, setHfSerialStartCode] = useState("");
  const [hfSerialInfo, setHfSerialInfo] = useState("");
  const [Product, setProduct] = useState([]);
  const [gvScanResult, setGvScanResult] = useState({
    value: [],
    disbled: "",
    visble: false,
    style: {},
  });
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
  const [txtTotalPCS, setTxtTotalPCS] = useState({
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

  useEffect(() => {
    const fetchData = async () => {
      setHfMode("");
      await getProduct();
      await SetMode("LOT");
    };
    fetchData();
  }, []);

  const handleSerialChange = async (index, event) => {
    console.log("เข้ามาทำงานใน handleSerialChange ")
    const newValues = [...txtSerial];
    newValues[index] = event.target.value;
    setTxtSerial(newValues);
    console.log("เข้ามาทำงานใน handleSerialChange ",index,"index",index + 1)
    if (event.key === "Enter") {
      console.log("เข้ามาทำงานใน handleSerialChange Enter")
        fnSetFocus(`gvSerial_txtSerial_${index + 1}`);
    }
  };

  const getProduct = async () => {
    await axios.get("/api/Common/GetProductData").then((res) => {
      let data = res.data.flat();
      setProduct(data);
      setDdlProduct((prevState) => ({ ...prevState, value: data[0].prd_name }));
    });
  };

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
    SetMode("LOT");
    fnSetFocus("txtLot_ScanSMTSerialXrayConfirm_focus");
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

  const ddlProduct_SelectedIndexChanged = async () => {
    await getProductSerialMaster(ddlProduct.value);
    if (txtLot.value.trim().toUpperCase() !== "") {
      setLblPnlLog((prevState) => ({
        ...prevState,
        value: "",
        visble: false,
      }));
      SetMode("SERIAL");
    } else {
      setDdlProduct((prevState) => ({
        ...prevState,
        value: Product[0].prd_name,
      }));
      SetMode("LOT");
    }
  };

  const SetMode = async (_strType) => {
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
      setTxtTotalPCS((prevState) => ({
        ...prevState,
        value: "",
        disbled: false,
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
      fnSetFocus("txtLot_ScanSMTSerialXrayConfirm_focus");
    }
    if (_strType == "LOT_ERROR") {
      setTxtLot((prevState) => ({
        ...prevState,
        value: "",
        disbled: false,
        style: { background: "" },
      }));
      setTxtTotalPCS((prevState) => ({
        ...prevState,
        value: "",
        disbled: false,
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
      fnSetFocus("txtLot_ScanSMTSerialXrayConfirm_focus");
    }
    if (_strType == "PCS") {
      setTxtLot((prevState) => ({
        ...prevState,
        disbled: true,
        style: { background: "" },
      }));
      setTxtTotalPCS((prevState) => ({
        ...prevState,
        value: "",
        disbled: false,
      }));
      setLblPnlLog((prevState) => ({
        ...prevState,
        visble: false,
      }));
      setPnlSerial((prevState) => ({
        ...prevState,
        visble: true,
      }));
      setHfMode("PCS");
      fnSetFocus("txtTotalPCS_ScanSMTConnectRollConfirm_focus");
    }
    if (_strType == "SERIAL") {
      setTxtLot((prevState) => ({
        ...prevState,
        disbled: true,
        style: { background: "#EEEEEE" },
      }));
      setTxtTotalPCS((prevState) => ({
        ...prevState,
        disbled: false,
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

  const txtLot_TextChanged = async () => {
    let strLotData = "";
    let strLot = "";
    let strPrdName = "";
    strLotData = txtLot.value.toUpperCase().split(";");
    if (strLotData.length >= 2) {
      strLot = strLotData[0];
      await axios
        .post("/api/Common/getProductNameByLot", {
          strLot: strLot,
        })
        .then((res) => {
          let data = res.data.prdName[0];
          strPrdName = data;
        });

      if (
        strPrdName !== "" &&
        strPrdName !== undefined &&
        strPrdName !== null
      ) {
        setLblPnlLog((prevState) => ({
          ...prevState,
          value: "",
          visble: false,
        }));
        setTxtLot((prevState) => ({ ...prevState, value: strLot }));

        try {
          setDdlProduct((prevState) => ({ ...prevState, value: strPrdName }));
          await getProductSerialMaster(strPrdName);
          console.log("XYZ+++",strPrdName,"||",txtTotalPCS.value,"||",hfSerialCount)
          if (txtTotalPCS.value === "") {
            setTxtTotalPCS((prevState) => ({
              ...prevState,
              value: hfSerialCount,
              visble: true,
            }));
          }
          SetMode("SERIAL");
          fnSetFocus("gvSerial_txtSerial_0");
        } catch (ex) {
          console.error(ex);
          let intProduct = strPrdName.slice(13).indexOf("-") + 13;
          if (intProduct > 0) {
            strPrdName =
              strPrdName.slice(0, intProduct) +
              strPrdName.slice(intProduct + 1, intProduct + 11);

            try {
              setDdlProduct((prevState) => ({
                ...prevState,
                value: strPrdName,
              }));

              await getProductSerialMaster(strPrdName);
              if (txtTotalPCS.value === "") {
                setTxtTotalPCS((prevState) => ({
                  ...prevState,
                  value: hfSerialCount,
                  visble: true,
                }));
              }
              SetMode("SERIAL");
              fnSetFocus("gvSerial_txtSerial_0");
            } catch (ex2) {
              setLblPnlLog((prevState) => ({
                ...prevState,
                value: `Product ${strPrdName} not found.`,
                visble: true,
              }));
              fnSetFocus("ddlProduct_ScanSMTSerialXrayConfirm_focus");
            }
          } else {
            setLblPnlLog((prevState) => ({
              ...prevState,
              value: `Product ${strPrdName} not found.`,
              visble: true,
            }));
            fnSetFocus("ddlProduct_ScanSMTSerialXrayConfirm_focus");
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
        fnSetFocus("txtLot_ScanSMTSerialXrayConfirm_focus");
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
        value: "Please scan QR Code." + _strTagNewLine + " กรุณาสแกนที่คิวอาร์โค้ด",
        visble: true,
      }));
      setHfMode("LOT");
      fnSetFocus("txtLot_ScanSMTSerialXrayConfirm_focus");
    }
  };

  const txtTotalPCS_TextChanged = async () => {
    if (isNaN(txtTotalPCS.value)) {
      SetMode("SERIAL");
      fnSetFocus("gvSerial_txtSerial_0");
    } else {
      setTxtTotalPCS((prevState) => ({
        ...prevState,
        value: "",
      }));
      fnSetFocus("txtTotalPCS_ScanSMTConnectRollConfirm_focus");
    }
  };

  const getInitialSerial = async () => {
    let dtData = [];
    console.log("txtTotalPCS.value",parseInt(hfSerialCount, 10))
    for (let intRow = 1; intRow <= parseInt(hfSerialCount, 10); intRow++) {
      dtData.push({
        SEQ: intRow,
      });
    }
    console.log("dtData",dtData)
    setGvSerial((prevState) => ({ ...prevState, value: dtData, visble: true }));
    return 0;
  };

  const getInputSerial = async () => {
    const dtData = [];
    let strFrontSide = "";
    for (let intRow = 0; intRow < gvSerial.value.length; intRow++) {
      const serial = txtSerial[intRow];
      const scanresult = serial !== "" ? "-" : "";
      dtData.push({
        seq: intRow + 1,
        serial: serial,
        scan_result: scanresult,
        remark: "",
      });
    }
    return dtData;
  };

  const setSerialData = async () => {
    console.log("เข้ามายัง setSerialData")
    let dtSerial = await getInputSerial();
    let _strLotData = "";
    let _strLot = "";
    let _strPrdName = ddlProduct.value;
    let _strShtNoBack = "";
    let _strShtNoFront = "";
    let _strTray = " ";
    let _intSeq = 1;
    let _strScanResultAll = "OK";
    let _strErrorAll = "";
    let _strUpdateError = "";
    let _bolError = false;
    _strLotData = txtLot.value.trim().toUpperCase().split(";");
    _strLot = _strLotData[0];
    console.log(_strLot,"เข้ามายัง setSerialData dtSerial",dtSerial)
    if (txtLot.value !== "" && dtSerial.length > 0) {
      let _intRowSerial = 0;
      await axios
        .post("/api/GetSerialXRayResult", {
          strlot: _strLot,
        })
        .then((res) => {
          _strScanResultAll = res.data;
        });
        console.log("เข้ามายัง setSerialData _strScanResultAll",_strScanResultAll)
      if (_strScanResultAll !== "OK") {
        _strScanResultAll === "NG";
        _bolError = true;
      }
      for (let i = 0; i < dtSerial.length; i++) {
        const drRow = dtSerial[i];
        if (drRow.serial !== "") {
          let _strSerial = drRow.serial;
          let _strMessageUpdate = "";
          let _strScanResultUpdate = "";
          let _inCountSeq = 0;
          let _strSerialResult = "";
          console.log("เข้ามายัง setSerialData _strSerial",_strSerial,_strScanResultAll)
          
          if (
            !CONNECT_SERIAL_ERROR.includes(_strSerial) &&
            _strScanResultAll === "OK"
          ) {
            await axios
              .post("/api/GetSerialXRaySheetResult", {
                strsheetno: _strSerial,
              })
              .then((res) => {
                _strScanResultUpdate = res.data;
                console.log("เข้ามายัง setSerialData _strScanResultUpdate",_strScanResultUpdate)
              });
            if (_strSerialResult === "OK") {
              drRow.scan_result = "PASS X-RAY";
              drRow.remark = "Sheet นี้ผ่าน X-RAY";
            }
          }
        }
        _intRowSerial++;
      }
      setLblResult((prevState) => ({
        ...prevState,
        value: _strScanResultAll,
      }));
      if (_strScanResultAll === "OK") {
        setLblResult((prevState) => ({
          ...prevState,
          style: { color: "green" },
        }));
      } else {
        setLblResult((prevState) => ({
          ...prevState,
          style: { color: "red" },
        }));
      }
      if (_strErrorAll !== "") {
        setLblResult((prevState) => ({
          ...prevState,
          value: lblResult.value + `\n` + _strErrorAll,
        }));
      }
      setGvScanResult((prevState) => ({
        ...prevState,
        value: dtSerial,
        visble: true,
      }));
      await getInitialSerial();
      setLblPnlLog((prevState) => ({
        ...prevState,
        visble: false,
      }));
    } else {
      setLblPnlLog((prevState) => ({
        ...prevState,
        value: "Please input lot no. ",
      }));
      SetMode("SERIAL_ERROR");
    }
    fnSetFocus("gvSerial_txtSerial_0");
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
    setHfBarcodeSide("");
    setHfShtScan("1");
    setHfConfigCheck("N");
    setHfConfigCode("");
    setHfConfigStart("0");
    setHfConfigEnd("0");
    setHfConfigRuning("N");
    setHfDuplicateStart("0");
    setHfDuplicateEnd("0");
    setHfCheckPrdSht("N");
    setHfCheckPrdShtStart("0");
    setHfCheckPrdShtEnd("0");
    setHfCheckPrdAbbr("");
    setHfCheckLotSht("N");
    setHfCheckLotShtStart("0");
    setHfCheckLotShtEnd("0");
    setHfCheckStartSeq("N");
    setHfCheckStartSeqCode("");
    setHfCheckStartSeqStart("0");
    setHfCheckStartSeqEnd("0");
    setHfCheckSheetELT("N");
    setHfCheckDateInProc("N");
    setHfDateInProc("");
    setHfCheckWeekCode("N");
    setHfCheckWeekCodeStart("");
    setHfCheckWeekCodeEnd("");
    setHfWeekCode("");
    setHfWeekCodeType("");
    setHfCheckPreAOIF("N");
    setHfCheckPreAOIB("N");
    setHfCheckAOIF("N");
    setHfCheckAOIB("N");
    setHfCheckSPIF("N");
    setHfCheckSPIB("N");
    setHfSerialStartCode("");
    await axios
      .post("/api/common/GetSerialProductByProduct", {
        prdName: strPrdName,
      })
      .then((res) => {
        dtProductSerial = res.data[0];
        console.log("dtProductSerial", dtProductSerial);
        if (dtProductSerial != null) {
          console.log("เข้ามาแล้วทำไมไม่ set วะ");
          setHfSerialLength(dtProductSerial.slm_serial_length);
          setHfSerialFixFlag(dtProductSerial.slm_fix_flag);
          setHfSerialDigit(dtProductSerial.slm_fix_digit);
          setHfSerialStartDigit(dtProductSerial.slm_fix_start_digit);
          setHfSerialEndDigit(dtProductSerial.slm_fix_end_digit);
          setHfTrayFlag(dtProductSerial.slm_tray_flag);
          setHfTrayLength(dtProductSerial.slm_tray_length);
          setHfTestResultFlag(dtProductSerial.slm_test_result_flag);
          setHfSerialCount(dtProductSerial.slm_serial_sht);
          setHfAutoScan(dtProductSerial.slm_auto_scan);
          setHfBarcodeSide(dtProductSerial.slm_barcode_side);
          setHfShtScan(dtProductSerial.slm_sht_scan);
          setHfConfigCheck(dtProductSerial.prm_barcode_req_config);
          setHfConfigCode(dtProductSerial.prm_config_code);
          setHfConfigStart(dtProductSerial.prm_start_config);
          setHfConfigEnd(dtProductSerial.prm_end_config);
          setHfConfigRuning(dtProductSerial.prm_running_req_config);
          setHfDuplicateStart(dtProductSerial.prm_duplicate_start);
          setHfDuplicateEnd(dtProductSerial.prm_duplicate_end);
          setHfCheckPrdSht(dtProductSerial.prm_req_check_prd_sht);
          setHfCheckPrdShtStart(dtProductSerial.prm_check_prd_sht_start);
          setHfCheckPrdShtEnd(dtProductSerial.prm_check_prd_sht_end);
          setHfCheckPrdAbbr(dtProductSerial.prm_abbr);
          setHfCheckLotSht(dtProductSerial.prm_req_check_lot_sht);
          setHfCheckLotShtStart(dtProductSerial.prm_check_lot_sht_start);
          setHfCheckLotShtEnd(dtProductSerial.prm_check_lot_sht_end);
          setHfCheckStartSeq(dtProductSerial.prm_req_start_seq_flg);
          setHfCheckStartSeqCode(dtProductSerial.prm_start_seq_code);
          setHfCheckStartSeqStart(dtProductSerial.prm_start_seq_start);
          setHfCheckStartSeqEnd(dtProductSerial.prm_start_seq_end);
          setHfCheckSheetELT(dtProductSerial.prm_sheet_elt_flg);
          setHfCheckDateInProc(dtProductSerial.prm_date_inproc_flg);
          setHfDateInProc(dtProductSerial.prm_date_inproc);
          setHfCheckWeekCode(dtProductSerial.prm_check_weekcode_flg);
          setHfCheckWeekCodeStart(dtProductSerial.prm_check_weekcode_start);
          setHfCheckWeekCodeEnd(dtProductSerial.prm_check_weekcode_end);
          setHfWeekCodeType(dtProductSerial.prm_date_type);
          setHfCheckPreAOIF(dtProductSerial.prm_sht_pre_aoi_f);
          setHfCheckPreAOIB(dtProductSerial.prm_sht_pre_aoi_b);
          setHfCheckAOIF(dtProductSerial.prm_sht_aoi_f);
          setHfCheckAOIB(dtProductSerial.prm_sht_aoi_b);
          setHfCheckAOICoatF(dtProductSerial.prm_sht_aoi_coat_f);
          setHfCheckAOICoatB(dtProductSerial.prm_sht_aoi_coat_b);
          setHfCheckSPIF(dtProductSerial.prm_sht_spi_f);
          setHfCheckSPIB(dtProductSerial.prm_sht_spi_b);
          setHfSerialStartCode(dtProductSerial.slm_serial_start_code);
          setHfSerialInfo(dtProductSerial.prm_additional_info);
        }
      });
    return 0;
  };


  const columns = [
    {
      title: "No.",
      dataIndex: "seq",
      key: "No.",
      render: (text, record, index) => {
        return index + 1;
      },
      align: "center",
    },
    {
      title: "Serial No.",
      dataIndex: "serial",
      key: "Serial No.",
      align: "left",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "Scan Result",
      key: "Scan Result",
      dataIndex: "scan_result",
      render: (text, record, index) => {
        return text !== ' '  ? (
          <Tag
            className={text === "OK" ? "Tag-OK" : text === "NG" ? "Tag-NG" : ""}
          >
            {text}
          </Tag>
        ) : '';
      },
      align: "center",
    },
    {
      title: "Remark",
      key: "Remark",
      dataIndex: "remark",

      render: (text, record, index) => {
        return text;
      },
      align: "center",
    },
  ];

  function fnSetFocus(txtField) {
    setTimeout(() => {
      document.getElementById(`${txtField}`).focus();
    }, 300);
  }

  return {
    txtLot,
    setTxtLot,
    txtLot_TextChanged,
    ddlProduct,
    setDdlProduct,
    ddlProduct_SelectedIndexChanged,
    Product,
    txtTotalPCS,
    setTxtTotalPCS,
    ibtBack_Click,
    lblpnlLog,
    pnlSerial,
    gvSerial,
    txtSerial,
    handleSerialChange,
    btnCancel_Click,
    btnSave_Click,
    txtTotalPCS_TextChanged,
    gvScanResult,
    columns,
    lblResult,
  };
}

export { fn_ScanSMTSerialXrayConfirm };
