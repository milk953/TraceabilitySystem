import { set } from "lodash";
import React, { useRef, useState } from "react";

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
  }
  //Btn
  const btnReturn_Click = () => {
    console.log("btnReturn_Click");
  };

  const btnReplace_Click = () => {
    console.log("btnReplace_Click");
  };
  const btnDelete_Click = () => {
    console.log("btnDelete_Click");
  };
  const btnCancel_Click = () => {
    console.log("btnCancel_Click");
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
  };
}

export { fn_ScanSheetDispenserTime };
