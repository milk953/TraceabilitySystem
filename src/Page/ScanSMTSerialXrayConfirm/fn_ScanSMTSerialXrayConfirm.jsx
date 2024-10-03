//  *** Khun *** //
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { color } from "framer-motion";
import { Tag } from "antd";
function fn_ScanSMTSerialXrayConfirm() {


  const hfUserID = localStorage.getItem("ipAddress");
  const hfUserStation = localStorage.getItem("ipAddress");
  const hfUserFactory = "";
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

  const getProduct = async () => {
    await axios.get("/api/Common/GetProductData").then((res) => {
      let data = res.data.flat();
      setProduct(data);
      setDdlProduct((prevState) => ({ ...prevState, value: data[0].prd_name }));
    });
  };

  const ddlProduct_SelectedIndexChanged = async () => {
    await getProductSerialMaster();
    if (txtLot.value.toUpperCase() !== "") {
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
      fnSetFocus("txtLot_ScanSMTConnectRollConfirm_focus");
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
      fnSetFocus("txtLot_ScanSMTConnectRollConfirm_focus");
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
    setHfConfigRunning("N");
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
          setHfseriallength(dtproductserial.slm_serial_length);
          setHfserialfixflag(dtproductserial.slm_fix_flag);
          setHfserialdigit(dtproductserial.slm_fix_digit);
          setHfserialstartdigit(dtproductserial.slm_fix_start_digit);
          setHfserialenddigit(dtproductserial.slm_fix_end_digit);
          setHftrayflag(dtproductserial.slm_tray_flag);
          setHftraylength(dtproductserial.slm_tray_length);
          setHftestresultflag(dtproductserial.slm_test_result_flag);
          setHfshtscan(dtproductserial.slm_sht_scan);
          setHfconfigcheck(dtproductserial.prm_barcode_req_config);
          setHfconfigcode(dtproductserial.prm_config_code);
          setHfconfigstart(dtproductserial.prm_start_config);
          setHfconfigend(dtproductserial.prm_end_config);
          setHfconfigrunning(dtproductserial.prm_running_req_config);
          setHfduplicatestart(dtproductserial.prm_duplicate_start);
          setHfduplicateend(dtproductserial.prm_duplicate_end);
          setHfcheckprdsht(dtproductserial.prm_req_check_prd_sht);
          setHfcheckprdshtstart(dtproductserial.prm_check_prd_sht_start);
          setHfcheckprdshtend(dtproductserial.prm_check_prd_sht_end);
          setHfcheckprdabbr(dtproductserial.prm_abbr);
          setHfchecklotsht(dtproductserial.prm_req_check_lot_sht);
          setHfchecklotshtstart(dtproductserial.prm_check_lot_sht_start);
          setHfchecklotshtend(dtproductserial.prm_check_lot_sht_end);
          setHfcheckstartseq(dtproductserial.prm_req_start_seq_flg);
          setHfcheckstartseqcode(dtproductserial.prm_start_seq_code);
          setHfcheckstartseqstart(dtproductserial.prm_start_seq_start);
          setHfcheckstartseqend(dtproductserial.prm_start_seq_end);
          setHfchecksheetelt(dtproductserial.prm_sheet_elt_flg);
          setHfcheckdateinproc(dtproductserial.prm_date_inproc_flg);
          setHfdateinproc(dtproductserial.prm_date_inproc);
          setHfweekcodetype(dtproductserial.prm_date_type);
          setHfcheckweekcode(dtproductserial.prm_check_weekcode_flg);
          setHfcheckweekcodestart(dtproductserial.prm_check_weekcode_start);
          setHfcheckweekcodeend(dtproductserial.prm_check_weekcode_end);
          setHfcheckpreaoif(dtproductserial.prm_sht_pre_aoi_f);
          setHfcheckpreaoib(dtproductserial.prm_sht_pre_aoi_b);
          setHfcheckaoif(dtproductserial.prm_sht_aoi_f);
          setHfcheckaoib(dtproductserial.prm_sht_aoi_b);
          setHfcheckspif(dtproductserial.prm_sht_spi_f);
          setHfcheckspib(dtproductserial.prm_sht_spi_b);
          setHfserialstartcode(dtproductserial.slm_serial_start_code);
        }
      });
    return 0;
  };

  function fnSetFocus(txtField) {
    setTimeout(() => {
      document.getElementById(`${txtField}`).focus();
    }, 300);
  }
  return {};
}

export { fn_ScanSMTSerialXrayConfirm };
