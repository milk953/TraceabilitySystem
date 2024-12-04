import axios from "axios";
import { set } from "lodash";
import React, { useState, useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import {notification} from 'antd';
function fn_ScanSheetReflowTime() {
  const [txtmcNo, setTxtmcNo] = useState("");
  const FctxtmcNo = useRef(null);
  const [txtmcNoState, setTxtmcNoState] = useState({
    disabled: false,
    styled: { backgroundColor: "#B2A8A8" },
    open: true,
  });

  const [txtSheetNo, setTxtSheetNo] = useState("");
  const FctxtSheetNo = useRef(null);
  const [txtSheetNoState, setTxtSheetNoState] = useState({
    disabled: false,
    styled: { backgroundColor: "#B2A8A8" },
    state: false,
  });
  const [lblSheet, setLblSheet] = useState("");
  const [lblResult, setLblResult] = useState({
    text: "",
    styled: { color: "",background:'' },
  });
  const [lblRemark, setLblRemark] = useState({
    text: "",
    styled: { color: "",background:'' },
  });
  const [pnlSaveState, setPnlSaveState] = useState(false);
  const [PnlShowresult, setPnlShowresult] = useState(false);
  //Hidden item
  const [hfURL, setHfURL] = useState("");
  const [hfPeriod, setHfPeriod] = useState("0.2");
  const [hfRow, setHfRow] = useState("10");
  const [hfTimeControl, setHfTimeControl] = useState("1");
  const [hfSPIPeriod, setHfSPIPeriod] = useState("10");
  const [hfConnLeafLength, setHfConnLeafLength] = useState("20");
  const [hfFactory, setHfFactory] = useState("A1");
  const CompanyCode = import.meta.env.VITE_COMPANY_CODE;
  const Product_type = import.meta.env.VITE_PRODUCT_KIND;
  const plantCode = import.meta.env.VITE_FAC;

  useEffect(() => {
    Pageload();
  }, []);
  const Pageload = () => {
    setTxtmcNo("");
    setTxtmcNoState({ disabled: false, open: true });
    setTxtSheetNoState({
      disabled: true,
      styled: { backgroundColor: "#B2A8A8" },
    });
    setLblResult({ text: "", styled: { color: "" } });
    setLblSheet("");
    setLblRemark("");
    setPnlSaveState(false);
    setPnlShowresult(false);
    FctxtmcNo.current.focus();
  };
  const handleTxtMcNo = () => {
    setTxtmcNoState({
      disabled: true,
      styled: { backgroundColor: "#B2A8A8" },
      open: true,
    });
    setTxtSheetNo("");
    setTxtSheetNoState({ disabled: false, state: true });
  };
  const handleTxtSheetNo = async (e) => {
    let rowCount = 0;
    setLblRemark({text:"",styled:{color: "",background:''}})
    setLblResult({ text: "", styled: { color: "" } });
    setPnlSaveState(false);
    setPnlShowresult(false);
    if (txtmcNo !== "" && txtSheetNo !== "") {
      let strError = "";
      let strStatus = "";
      if (parseInt(hfConnLeafLength) > 0 && parseInt(hfConnLeafLength) !== txtSheetNo.length &&
        strStatus !== "F"
      ) {
        strStatus = "F";
        strError = "Invalid sheet length";
      }
      if (strStatus !== "F") {
        await axios.post("/api/common/getreflowrecordtimedata", {dataList: {strSheetno: txtSheetNo,strPlantCode :plantCode},})
          .then((res) => {rowCount = res.data.row_count;})
          .catch((error) => {
            setLblRemark({text:error,styled:{color: "white",background:'red',border:'1px solid red'}});
            setPnlShowresult(true);
          });

        if (rowCount == 0) {
          const res = await axios
            .post("api/common/CallSMTReflowRecordTimeResult", {
              dataList: [
                {
                  strFactory: hfFactory,
                  strSheetNo: txtSheetNo,
                  strmachineNo: txtmcNo,
                  strLotno: "",
                  strProduct: "",
                  strPlantCode:plantCode
                },
              ],
            })
            .then((res) => {
              console.log(res.data.p_error,'error')
              strError = res.data.p_error;
              console.log(strError,'strError')
            })
            .catch((error) => {
              setLblRemark({text:error,styled:{color: "white",background:'red',border:'1px solid red'}});
            setPnlShowresult(true);
            });
            console.log(strError,'strError2')
          if (strError == "") {
            const currentTime = new Date().toLocaleTimeString("en-US", {
              hour12: false,
            });
            setLblSheet(`${txtSheetNo} [${currentTime}]`);
            setLblResult({ text: "OK", styled:{color: "white",background:'green'} });
            setPnlShowresult(true);
          } else if (strError != '') {
            console.log(strError,'strError3')
            setLblResult({ text: "NG", styled:{color: "white",background:'red'} });
            setLblRemark({text:strError,styled:{color: "white",background:'red',border:'1px solid red'}});
            setPnlSaveState(false);
            setPnlShowresult(true);
          }
        } else {
          setPnlSaveState(true);
          setPnlShowresult(true);
          setLblSheet(txtSheetNo);
          setTxtmcNoState({ open: true });
          PnlmainDisable();
          setLblRemark({text:"Exists record time, please be confirm.",styled:{color: "black",background:'yellow'}});
          return;
        }
      } else {
        // setLblResult({ text: "NG", styled: "red" });
        setLblResult({ text: "NG", styled:{color: "white",background:'red'} });
        setLblRemark(strError);
      }
      setTxtSheetNo("");
      setTxtmcNoState({
        disabled: false,
        styled: { backgroundColor: "#B2A8A8" },
        open: true,
      });
      setTxtSheetNoState({ disabled: false, state: true });
    }
  };
  function PnlmainDisable() {
    setTxtmcNoState({ disabled: true, styled: { backgroundColor: "#dbdede" } });
    setTxtSheetNoState({
      disabled: true,
      styled: { backgroundColor: "#dbdede" },
    });
  }
  const btnCancel_Click = () => {
    setPnlSaveState(false);
    setPnlShowresult(false);
    setTxtmcNoState({
      disabled: true,
      styled: { backgroundColor: "#B2A8A8" },
      open: true,
    });
    setTxtSheetNoState({
      disabled: false,
      styled: { backgroundColor: "white" },
      state: true,
    });
    setLblResult({ text: "", styled: { color: "" } });
    setLblRemark("");
    setTimeOut(FctxtSheetNo);
    setLblSheet("");
    setLblRemark("");
    setTxtSheetNo("");

  };
  
  function setTimeOut(txtField) {
    setTimeout(() => {
      txtField.current.focus();
    }, 200);
  }

  const btnReplace_Click = async () => {
    var strError = "";
    var strStatus = "";
    const res = await axios
      .post("api/common/CallSMTReflowRecordTimeResult", {
        dataList: [
          {
            strFactory: hfFactory,
            strSheetNo: txtSheetNo,
            strmachineNo: txtmcNo,
            strLotno: "",
            strProduct: "",
            strPlantCode:plantCode
          },
        ],
      })
      .then((res) => {
        strError = res.data.p_error;
        console.log(strError,'strError')
      })
      .catch((error) => {
        setLblRemark({text:error,styled:{color: "white",background:'red',border:'1px solid red'}});
        setPnlShowresult(true);
      });
    if (strError.split("") == "") {
      const currentTime = new Date().toLocaleTimeString("en-US", {
        hour12: false,
      });
      setLblSheet(`${txtSheetNo} [${currentTime}]`);
      setLblResult({ text: "OK", styled:{color: "white",background:'green'} });
      setLblRemark("");

    } else {
      setLblResult({ text: "NG", styled:{color: "white",background:'red'} });
      setLblRemark(strError);
    }
    setTxtSheetNo("");
    setTxtmcNoState({
      disabled: true,
      styled: { backgroundColor: "#B2A8A8" },
      open: true,
    });
    setTxtSheetNoState({ disabled: false, state: true });
    setPnlSaveState(false);
  };

  const btnDelete_Click = async () => {
    var strError = "";
    var strStatus = "";

    const res = await axios
      .post("/api/common/deleteReflowRecordTimeData", {
        strSheetNo: txtSheetNo,
        strPlantCode : plantCode
      })
      .then((res) => {
        strError = res.data.p_error;
      })
      .catch((error) => {
        setLblRemark({text:error,styled:{color: "white",background:'red',border:'1px solid red'}});
        setPnlShowresult(true);
      });
    setLblSheet(`${lblSheet} Delete`);
    setLblRemark(strError);
    if (strError == "") {
      setPnlSaveState(false);
      setPnlShowresult(false);
    }else{
      setLblRemark({text:error,styled:{color: "white",background:'red',border:'1px solid red'}});
      setPnlShowresult(true);
    }


    setTxtSheetNo("");
    setTxtmcNoState({
      disabled: true,
      styled: { backgroundColor: "#B2A8A8" },
      open: true,
    });
    setTxtSheetNoState({ disabled: false, state: true });
  };
  const btnIbtback_Click = () => {
    setTxtmcNo("");
    setTxtSheetNo("");
    setTxtmcNoState({ disabled: false, open: true });
    setTxtSheetNoState({
      disabled: true,
      styled: { backgroundColor: "#B2A8A8" },
    });
    setLblResult({ text: "", styled: { color: "" } });
    setLblSheet("");
    setLblRemark("");
    setPnlSaveState(false);
    setPnlShowresult(false);
    FctxtmcNo.current.focus();
  };
  return {
    txtmcNo,
    txtSheetNo,
    lblSheet,
    lblResult,
    lblRemark,
    CompanyCode,
    Product_type,
    txtmcNoState,
    txtSheetNoState,
    handleTxtSheetNo,
    setTxtSheetNo,
    pnlSaveState,
    FctxtmcNo,
    FctxtSheetNo,
    handleTxtMcNo,
    setTxtmcNo,
    btnCancel_Click,
    btnReplace_Click,
    btnDelete_Click,
    btnIbtback_Click,
    PnlShowresult
  };
}

export { fn_ScanSheetReflowTime };
