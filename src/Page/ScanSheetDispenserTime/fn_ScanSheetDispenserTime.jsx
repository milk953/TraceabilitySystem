import { StopScreenShareRounded } from "@mui/icons-material";
import { set } from "lodash";
import React, { useEffect, useRef, useState } from "react";

function fn_ScanSheetDispenserTime() {
  //State
  const [pnlSaveState, setPnlSaveState] = useState(false);
  // txtField
  const [txtmcNo, setTxtmcNo] = useState("");
  const [txtSheetNo, setTxtSheetNo] = useState("");
  const [txtCBno, setTxtCBno] = useState("");
  //txtFieldState
  const [txtmcNoState, setTxtmcNoState] = useState({
    disabled: false,
    styled: { backgroundColor: "white" },
    open: true,
    focused: true,
  });
  const [txtSheetNoState, setTxtSheetNoState] = useState({
    disabled: false,
    styled: { backgroundColor: "#B2A8A8" },
    open: true,
  });
  const [txtCBnoState, setTxtCBnoState] = useState({
    disabled: false,
    styled: { backgroundColor: "#B2A8A8" },
    open: true,
  });
  //lblResutl
  const [lblResult, setLblResult] = useState({
    text: "",
    styled: { color: "" },
  });
  const [lblRemark, setLblRemark] = useState("");
  const [lblSheet, setLblSheet] = useState("");

  //Foucus
  const Fctxtmcno = useRef(null);
  const FctxtSheetNo = useRef(null);
  const FctxtCBno = useRef(null);
  //Hidden Field
  const [hfURL, setHfURL] = useState("");
  const [hfPeriod, setHfPeriod] = useState("0.2");
  const [hfRow, setHfRow] = useState("10");
  const [hfTimeControl, setHfTimeControl] = useState("1");
  const [hfSPIPeriod, setHfSPIPeriod] = useState("10");
  const [hfConnLeafLength, setHfConnLeafLength] = useState("20");
  const [hfCBNoFlg, setHfCBNoFlg] = useState("Y");
  const [strPlantCode, setStrPlantCode] = useState("");
  const [strIp, setStrIp] = useState("");
  //Funtion
  useEffect(() => {
    PageLoad();
  }, []);
  function PageLoad() {
    let strPlantCodeHidden = import.meta.env.VITE_FAC;
    let ip = localStorage.getItem("ip");
    setStrPlantCode;
    strPlantCodeHidden;
    setStrIp(ip);

    //settxtField
    setTxtmcNo("");
    setTxtmcNoState({ disabled: false, styled: { backgroundColor: "white" } });
    setTxtSheetNo("");
    setTxtSheetNoState({
      disabled: true,
      styled: { backgroundColor: "#B2A8A8" },
    });

    if (hfCBNoFlg == "Y") {
      setTxtCBno("");
      setTxtCBnoState({
        disabled: true,
        styled: { backgroundColor: "#B2A8A8" },
        open: true,
      });
    } else {
      setTxtCBnoState({
        disabled: true,
        styled: { backgroundColor: "#B2A8A8" },
        open: false,
      });
    }
  }

  const txtMcno_change = () => {
    setTxtmcNoState({ disabled: true, styled: { backgroundColor: "#B2A8A8" } });
    setTxtSheetNo("");
    setTxtSheetNoState({
      disabled: false,
      styled: { backgroundColor: "white" },
      focused: true,
    });
    FctxtSheetNo.current.focus();
  };
  //Btn
  const btnReturn_Click = () => {
    console.log("btnReturn_Click");
  };

  const btnReplace_Click = () => {
    let strError = "";
    let strStatus = "";
    strError = getData(
      "CallSMTDispenserRecordTimeResult",
      "Sheetno,txtcb,frm_ScanSheetDispenserTime,txt,mc"
    ); // FPC
    const currentTime = new Date().toLocaleTimeString("en-US", {
      hour12: false,
    });
    setLblSheet(`${lblSheet} [${currentTime}]`);
    setLblRemark(strError);

    if (strError == "") {
      setLblResult({ text: "OK", styled: { color: "green" } });
    } else {
      setLblResult({ text: "NG", styled: { color: "red" } });
    }
    setPnlSaveState(false);
    PnlmainEnable();
    setTxtSheetNo("");
    setTxtSheetNoState({
      disabled: false,
      styled: { backgroundColor: "white" },
      focused: true,
    });
  };
  const btnDelete_Click = () => {
    let strError = "";
    let strStatus = "";

    strError = getData("DeleteDispenserRecordTimeData", "Sheetno"); // FPC

    setLblSheet(`${lblSheet} Delete`);
    setLblRemark(strError);

    if (strStatus == "P") {
      setLblResult({ text: "OK", styled: { color: "green" } });
    } else {
      setLblResult({ text: "NG", styled: { color: "red" } });
    }
    setPnlSaveState(false);
    PnlmainEnable();
    setTxtSheetNo("");
    setTxtSheetNoState({
      disabled: false,
      styled: { backgroundColor: "white" },
      focused: true,
    });
  };
  function PnlmainDisable() {
    setTxtmcNoState({ disabled: true, styled: { backgroundColor: "#B2A8A8" } });
    setTxtSheetNoState({
      disabled: true,
      styled: { backgroundColor: "#B2A8A8" },
    });
    setTxtCBnoState({ disabled: true, styled: { backgroundColor: "#B2A8A8" } });
  }
  function PnlmainEnable() {
    setTxtmcNoState({ disabled: false, styled: { backgroundColor: "white" } });
    setTxtSheetNoState({
      disabled: true,
      styled: { backgroundColor: "#B2A8A8" },
    });
    setTxtCBnoState({ disabled: true, styled: { backgroundColor: "#B2A8A8" } });
  }
  const btnCancel_Click = () => {
    setPnlSaveState(false);
    PnlmainEnable();
    setLblSheet("");
    setLblRemark("");
    setTxtSheetNo("");
    setLblResult({ text: "", styled: { color: "" } });
    setTxtSheetNoState({
      disabled: false,
      styled: { backgroundColor: "white" },
      focused: true,
    });
  };
  const ibtback_Click = () => {
    setTxtmcNo("");
    setTxtSheetNo("");
    setTxtSheetNoState({
      disabled: true,
      styled: { backgroundColor: "#B2A8A8" },
      open: true,
    });
    setTxtCBno("");
    setTxtCBnoState({
      disabled: true,
      styled: { backgroundColor: "#B2A8A8" },
      open: true,
    });
    setTxtmcNoState({
      disabled: false,
      styled: { backgroundColor: "white" },
      focused: true,
      open: true,
    });
  };
  const txtSheetno_change = () => {
    let rowCount = 0;
    let strError = "";
    let strStatus = "";
    setLblRemark("");
    setPnlSaveState(false);
    if (txtSheetNo != "") {
      if (
        parseInt(hfConnLeafLength) > 0 &&
        parseInt(hfConnLeafLength) != txtSheetNo.length &&
        strStatus != "F"
      ) {
        strError = "Invalid sheet length";
        strStatus = "F";
      }
    }
    if (strStatus != "F") {
      if (hfCBNoFlg != "Y") {
        setTxtCBnoState({
          disabled: false,
          styled: { backgroundColor: "white" },
          focused: false,
        });
        setTxtCBno("");
        rowCount = getData("GetDispenserRecordTimeData", "");
        if (rowCount == 0) {
        } else {
          setLblSheet(`${txtSheetNo}`);
          pnlSaveState(true);
          PnlmainDisable();
          setLblRemark("Exists record time, please be confirm.");
        }
        setTxtSheetNo("");
        setTxtSheetNoState({
          disabled: false,
          styled: { backgroundColor: "white" },
          focused: true,
        });
      } else {
        setTxtCBno("");
        setTxtCBnoState({
          disabled: false,
          styled: { backgroundColor: "white" },
          focused: true,
          open: true,
        });
        FctxtCBno.current.focus();
      }
    } else {
      setLblResult({ text: "NG", styled: { color: "red" } });
      setLblRemark(strError);
      setTxtSheetNo("");
      setTxtSheetNoState({
        disabled: false,
        styled: { backgroundColor: "white" },
        focused: true,
      });
    }
  };

  function getData(Config, Param) {
    if (Config == "DeleteDispenserRecordTimeData") {
      const res = "";
      //FPC Param.Sheetno
      return res;
    } else if (Congif == "CallSMTDispenserRecordTimeResult") {
      const res = "";
      // FPC Oracle
      return res;
    } else if (Config == "GetDispenserRecordTimeData") {
      const res = "";
      // FPC Oracle
      return res;
    }
  }

  return {
    pnlSaveState,
    btnReplace_Click,
    btnDelete_Click,
    btnCancel_Click,
    ibtback_Click,
    lblResult,
    lblRemark,
    lblSheet,
    btnReturn_Click,
    //txtField
    txtmcNo,
    setTxtmcNo,
    txtSheetNo,
    setTxtSheetNo,
    txtCBno,
    setTxtCBno,
    //Focus
    Fctxtmcno,
    FctxtSheetNo,
    FctxtCBno,

    //txtFieldState
    txtCBnoState,
    txtSheetNoState,
    txtmcNoState,

    //TextChange
    txtMcno_change,
    txtSheetno_change,
  };
}

export { fn_ScanSheetDispenserTime };
