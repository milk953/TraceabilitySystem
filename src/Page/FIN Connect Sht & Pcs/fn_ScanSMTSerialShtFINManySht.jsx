import { LineAxisOutlined } from "@mui/icons-material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const fn_ScanSMTSerialShtFINManySht = () => {
  //region useState
  const [hfUserID, sethfUserID] = useState('');
  const [hfUserStation, sethfUserStation] = useState('');
  const [hfUserFactory, sethfUserFactory] = useState('');
  const [hfSerialLength, sethfSerialLength] = useState('');
  const [hfSerialFixFlag, sethfSerialFixFlag] = useState('');
  const [hfSerialDigit, sethfSerialDigit] = useState('');
  const [hfSerialStartDigit, sethfSerialStartDigit] = useState('');
  const [hfSerialEndDigit, sethfSerialEndDigit] = useState('');
  const [hfTrayFlag, sethfTrayFlag] = useState('');
  const [hfTrayLength, sethfTrayLength] = useState('');
  const [hfTestResultFlag, sethfTestResultFlag] = useState('');
  const [hfSerialCount, sethfSerialCount] = useState('');
  const [hfAutoScan, sethfAutoScan] = useState('');
  const [hfMode, sethfMode] = useState('');
  const [hfBarcodeSide, sethfBarcodeSide] = useState('');
  const [hfShtScan, sethfShtScan] = useState('');
  const [hfConfigCheck, sethfConfigCheck] = useState('');
  const [hfConfigCode, sethfConfigCode] = useState('');
  const [hfConfigStart, sethfConfigStart] = useState('');
  const [hfConfigEnd, sethfConfigEnd] = useState('');
  const [hfConfigRuning, sethfConfigRuning] = useState('');
  const [hfDuplicateStart, sethfDuplicateStart] = useState('');
  const [hfDuplicateEnd, sethfDuplicateEnd] = useState('');
  const [hfCheckPrdSht, sethfCheckPrdSht] = useState('');
  const [hfCheckPrdShtStart, sethfCheckPrdShtStart] = useState('');
  const [hfCheckPrdShtEnd, sethfCheckPrdShtEnd] = useState('');
  const [hfCheckPrdAbbr, sethfCheckPrdAbbr] = useState('');
  const [hfCheckLotSht, sethfCheckLotSht] = useState('');
  const [hfCheckLotShtStart, sethfCheckLotShtStart] = useState('');
  const [hfCheckLotShtEnd, sethfCheckLotShtEnd] = useState('');
  const [hfCheckStartSeq, sethfCheckStartSeq] = useState('');
  const [hfCheckStartSeqCode, sethfCheckStartSeqCode] = useState('');
  const [hfCheckStartSeqStart, sethfCheckStartSeqStart] = useState('');
  const [hfCheckStartSeqEnd, sethfCheckStartSeqEnd] = useState('');
  const [hfCheckSheetELT, sethfCheckSheetELT] = useState('');
  const [hfCheckRollSht, sethfCheckRollSht] = useState('');
  const [hfCheckRollShtDigit, sethfCheckRollShtDigit] = useState('');
  const [hfCheckDateInProc, sethfCheckDateInProc] = useState('');
  const [hfDateInProc, sethfDateInProc] = useState('');
  const [hfCheckWeekCode, sethfCheckWeekCode] = useState('');
  const [hfCheckWeekCodeStart, sethfCheckWeekCodeStart] = useState('');
  const [hfCheckWeekCodeEnd, sethfCheckWeekCodeEnd] = useState('');
  const [hfWeekCodeType, sethfWeekCodeType] = useState('');
  const [hfWeekCode, sethfWeekCode] = useState('');
  const [hfCheckPreAOIF, sethfCheckPreAOIF] = useState('');
  const [hfCheckPreAOIB, sethfCheckPreAOIB] = useState('');
  const [hfCheckAOIF, sethfCheckAOIF] = useState('');
  const [hfCheckAOIB, sethfCheckAOIB] = useState('');
  const [hfCheckAOICoatF, sethfCheckAOICoatF] = useState('');
  const [hfCheckAOICoatB, sethfCheckAOICoatB] = useState('');
  const [hfCheckSPIF, sethfCheckSPIF] = useState('');
  const [hfCheckSPIB, sethfCheckSPIB] = useState('');
  const [hfReqMachine, sethfReqMachine] = useState('');
  const [hfConnLeafLength, sethfConnLeafLength] = useState('');
  const [hfRollNo, sethfRollNo] = useState('');
  const [hfCheckRollPrdFlg, sethfCheckRollPrdFlg] = useState('');
  const [hfCheckRollPrdStart, sethfCheckRollPrdStart] = useState('');
  const [hfCheckRollPrdEnd, sethfCheckRollPrdEnd] = useState('');
  const [hfCheckRollPrd, sethfCheckRollPrd] = useState('');
  const [hfConnRollLength, sethfConnRollLength] = useState('');
  const [hfSerialStartCode, sethfSerialStartCode] = useState('');
  const [hfShtPlasmaTimeFlg, sethfShtPlasmaTimeFlg] = useState('');
  const [hfShtPlasmaTime, sethfShtPlasmaTime] = useState('');
  const [hfSheetType, sethfSheetType] = useState('');
  const [hfPlasmaConnShtPcs, sethfPlasmaConnShtPcs] = useState('');
  const [hfSerialInfo, sethfSerialInfo] = useState('');
  const [hfCheckXrayF, sethfCheckXrayF] = useState('');
  const [hfCheckXrayB, sethfCheckXrayB] = useState('');
  const [hfCheckXrayOneTime, sethfCheckXrayOneTime] = useState('');
  const [hfCheckFinInspect, sethfCheckFinInspect] = useState('');
  const [hfCheckFinInspectProc, sethfCheckFinInspectProc] = useState('');

  const [lot, setLot] = useState("");
  const [lotState, setLotState] = useState(true);
  const [product, setProduct] = useState([]);
  const [productState, setProductState] = useState(true);
  const [lblError, setLblError] = useState("");
  const [lblErrorState, setLblErrorState] = useState(false);
  const [lotRef, setLotRef] = useState("");
  const [operator, setOperator] = useState("");
  const [sht, setSht] = useState("");
  const [pcs, setPcs] = useState("");

  const [selectproduct, setselectproduct] = useState([]);
  const [dtData1, setDtData1] = useState([]);
  const [serialData, setSerialData] = useState([]);

  const [panalSerialOpen, setPanalSerialOpen] = useState(false);
  const [pnlRollLeafOpen, setPnlRollLeafOpen] = useState(true);
  const ibtBack = () => {
    setLot("");
  };

  const Setmode = (strType) => {
    switch (strType) {
      case "LOT":
        setProductState(true);
        setLot("");
        setLotState(true);
        // txtLot.CSs
        setLblErrorState(false);
        //pnlSerial.Visible = False
        localStorage.setItem("hfMode", "LOT");
      // focus(txtlot)
      case "LOT_ERROR":
        setLot("");
        setLotState(true);
        // txtLot.CSs

        setLblErrorState(true);
        //pnlSerial.Visible = False

        localStorage.setItem("hfMode", "LOT");
      // fnSetFocus("txtLot")
      case "SERIAL":
        setLotState(false);
        //txtLot.CSs
        setLblErrorState(false);
        //pnlSerial.Visible = true
        localStorage.setItem("hfMode", "SERIAL");
      // getInitialSerial()
      case "SERIAL_ERROR":
        setLotState(false);
        //txtLot.CSs
        setLblErrorState(true);
      case "SERIAL_OK":
        setLotState(false);
        //txtLot.CSs
        setLblErrorState(false);
      //pnlSerial.Visible = False
      // getInitialSerial()
      //fnSetFocus("gvSerial")
      case "SERIAL_NG":
        setLotState(false);
        //txtLot.CSs
        setLblErrorState(false);
    }
  };
  //test
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
  };
  const getInitialSerial = () => {
    const newData = [];
    const hfShtScanValue = parseInt(hfShtScan);
    const hfSerialCountValue = parseInt(hfSerialCount);
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
        setProduct(res.data.Product);
      });
    } catch (error) {
      console.log(error, "get data error");
    }
  };
  useEffect(() => {
    localStorage.setItem("hfUserID", localStorage.getItem("ip"));
    localStorage.setItem("hfUserStation", localStorage.getItem("ip"));
    localStorage.setItem("hfMode", "");
    Getproduct();
    Setmode("LOT");
  }, []);
  //txtLot
  const txtLottxtChange = (e) => {
    let strLotData = "";
    let strLot = "";
    let strPrdname = "";
    let dtLotData = [];
    strLotData = e.target.value;
    strLotData = strLotData.trim().toLocaleUpperCase().split(";");
    if (strLotData.length - 1 >= 2) {
      strLot = strLotData[0];
      try {
        axios
          .get("/api/GetProductDataByLot", { params: { strLot } })
          .then((res) => {
            dtLotData;
            if (res.rows.length > 0) {
              dtLotData.push(res.data);
            } else {
              return;
            }
          });
      } catch (error) {
        alert(error);
      }
      
    }
  };
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
    pnlRollLeafOpen, setPnlRollLeafOpen
  };
};

export { fn_ScanSMTSerialShtFINManySht };
