import axios from "axios";
import { set } from "lodash";
import React, { useState, useRef, useEffect, useCallback } from "react";
import styled from "styled-components";

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
    styled: { color: "" },
  });
  const [lblRemark, setLblRemark] = useState("");
  const [pnlSaveState, setPnlSaveState] = useState(true);
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
    setLblRemark("");
    setPnlSaveState(false);

    if (txtmcNo !== "" && txtSheetNo !== "") {
      let strError = "";
      let strStatus = "";
      if (parseInt(hfConnLeafLength) > 0 && parseInt(hfConnLeafLength) !== txtSheetNo.length && strStatus !== "F") {
        strStatus = "F";
        strError = "Invalid sheet length";
      }
      if (strStatus !== "F") {
        const res = await axios
          .post("/api/common/getreflowrecordtimedata", {
            strSheetNo: txtSheetNo,
          })
          .then((res) => {
            rowCount = res.data.row_count;
            console.log(res.data.row_count, "row_countinfunc");
          })
          .catch((error) => {
            alert(error);
          });

        console.log(rowCount, "rowCount");
        if (rowCount == 0) {
          console.log("in");
          const res = await axios
            .post("api/common/CallSMTReflowRecordTimeResult", {
              dataList: [
                {
                  strFactory: hfFactory,
                  strSheetNo: txtSheetNo,
                  strmachineNo: txtmcNo,
                  strLotno: "",
                  strProduct: "",
                },
              ],
            })
            .then((res) => {
              strError = res.data.p_error;
            })
            .catch((error) => {
              alert(error);
            });
          if (strError.split("") == "") {
            const currentTime = new Date().toLocaleTimeString("en-US", {
              hour12: false,
            });
            setLblSheet(`${txtSheetNo} [${currentTime}]`);
            setLblResult({ text: "OK", styled: "green" });
          } else {
            setLblResult({ text: "NG", styled: "red" });
          }
        } else {
          alert("ไม่พบข้อมูล");
          setPnlSaveState(true);
          setLblSheet(txtSheetNo);
          setPnlSaveState(true);
          setTxtmcNoState({ open: false });
          setLblRemark("Exists record time, please be confirm.");
          return
        }
      } else {
        setLblResult({ text: "NG", styled: "red" });
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
  const btnCancel_Click = () => {
    setPnlSaveState(false);
    setTxtmcNoState({
      disabled: true,
      styled: { backgroundColor: "#B2A8A8" },
      open: true,
    });
    setLblSheet("");
    setLblRemark("");
    setTxtSheetNo("");
  };

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
          },
        ],
      })
      .then((res) => {
        strError = res.data.p_error;
      })
      .catch((error) => {
        alert(error);
      });
    if (strError.split("") == "") {
      const currentTime = new Date().toLocaleTimeString("en-US", {
        hour12: false,
      });
      setLblSheet(`${txtSheetNo} [${currentTime}]`);
      setLblResult({ text: "OK", styled: "green" });
    } else {
      setLblResult({ text: "NG", styled: "red" });
    }
    setTxtSheetNo("");
    setTxtmcNoState({
      disabled: true,
      styled: { backgroundColor: "#B2A8A8" },
      open: true,
    });
    setTxtSheetNoState({ disabled: false, state: true });
  };

  const btnDelete_Click = async () => {
    var strError = "";
    var strStatus = "";

    const res = await axios
      .post("/api/common/deleteReflowRecordTimeData", {
        strSheetNo: txtSheetNo,
      })
      .then((res) => {
        strError = res.data.p_error;
        console.log(res.data.p_error, "p_error")
      })
      .catch((error) => {
        alert(error);
      });
      setLblSheet(`${lblSheet} Delete`)
      setLblRemark(strError)

      if (strStatus == 'P') {
        setLblResult({ text: "OK", styled: "green" });
      }else{
        setLblResult({ text: "NG", styled: "red" });
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
    setTxtmcNoState({ disabled: false, open: true });
    setTxtSheetNoState({
      disabled: true,
      styled: { backgroundColor: "#B2A8A8" },
    });
    setLblResult({ text: "", styled: { color: "" } });
    setLblSheet("");
    setLblRemark("");
    setPnlSaveState(false);
    FctxtmcNo.current.focus();
  }
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
    btnIbtback_Click
  };
}

export { fn_ScanSheetReflowTime };
