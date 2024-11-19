import { ConsoleSqlOutlined } from "@ant-design/icons";
import { CompareSharp, StopScreenShareRounded } from "@mui/icons-material";
import axios from "axios";
import { set } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

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
      // setTxtCBno("");
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

  const btnReplace_Click = async () => {
    let strError = "";
    let strStatus = "";
    strError = await getData("CallSMTDispenserRecordTimeResult", {
      P_SHEET_NO: txtSheetNo,
      P_CB_NO: txtCBno,
      P_USER: "frm_ScanSheetDispenserTime",
      P_STATION: txtmcNo,
    });
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
    // PnlmainEnable();
    setTxtSheetNo("");
    setTxtSheetNoState({
      disabled: false,
      styled: { backgroundColor: "white" },
      focused: true,
    });
  };
  const btnDelete_Click = async () => {
    let strError = "";
    let strStatus = "";
    alert(txtSheetNo);
    strError = await getData("DeleteDispenserRecordTimeData", txtSheetNo); // FPC

    setLblSheet(`${lblSheet} Delete`);
    setLblRemark(strError);
    if (strError == "") {
      Swal.fire({
        title: "Success",
        text: "Delete Success",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    }
    // if (strStatus == "P") {
    //   setLblResult({ text: "OK", styled: { color: "green" } });
    // } else {
    //   setLblResult({ text: "NG", styled: { color: "red" } });
    // }
    setPnlSaveState(false);
    // PnlmainEnable();
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
    setTxtCBnoState({
      disabled: true,
      styled: { backgroundColor: "#B2A8A8" },
      open: true,
    });
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
    // PnlmainEnable();
    setTxtCBno("");
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
  const txtSheetno_change = async () => {
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
        rowCount = await getData("GetDispenserRecordTimeData", txtSheetNo);
        if (rowCount == 0) {
          const currentTime = new Date().toLocaleTimeString("en-US", {
            hour12: false,
          });
          setLblSheet(`${lblSheet} [${currentTime}]`);
        } else {
          setLblSheet(`${txtSheetNo}`);
          pnlSaveState(true);
          PnlmainDisable();
          setLblResult("")
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
  const txtCbno_change = async () => {
    let strError = "";
    let strStatus = "";
    console.log(txtCBno, txtSheetNo);
    setLblResult("");
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
      if (strStatus != "F") {
        setTxtCBnoState({
          disabled: false,
          styled: { backgroundColor: "white" },
          focused: false,
          open: true,
        });
        setTxtCBno("");
        let rowCount = await axios
          .get(
            "/api/Dispenser/GetDispenserRecordTimeData?strSheetNo=" + txtSheetNo
          )
          .then((res) => {
            return res.data.ROW_COUNT;
          })
          .catch((error) => {
            alert(error);
          });

        if (rowCount == 0) {
          const currentTime = new Date().toLocaleTimeString("en-US", {
            hour12: false,
          });
          setLblSheet(`${txtSheetNo} [${currentTime}]`);
          strError = await getData("CallSMTDispenserRecordTimeResult", {
            P_SHEET_NO: txtSheetNo,
            P_CB_NO: txtCBno,
            P_USER: "frm_ScanSheetDispenserTime",
            P_STATION: txtmcNo,
          });
          if (strError == "") {
            setLblResult({ text: "OK", styled: { color: "green" } });
            Swal.fire({
              title: "Success",
              text: "Insert Success",
              icon: "success",
              timer: 2000,
              showConfirmButton: false,
            });
          }
        } else {
          setLblSheet(`${txtSheetNo}`);
          setPnlSaveState(true);
          PnlmainDisable();
          setLblRemark("Exists record time, please be confirm.");
        }
        // setTxtSheetNo("");
        setTxtSheetNoState({
          disabled: false,
          styled: { backgroundColor: "white" },
          focused: true,
        });
      } else {
        setLblResult({ text: "NG", styled: { color: "red" } });
        setLblRemark(strError);
        // setTxtSheetNo("");
        setTxtSheetNoState({
          disabled: false,
          styled: { backgroundColor: "white" },
          focused: true,
        });
      }
    }
  };
  const handleCbNoChange = (e) => {
    setTxtCBno(e.target.value);
  };

  async function getData(Config, Param) {
    if (Config == "DeleteDispenserRecordTimeData") {
      let res = "";
      alert(Param);
      await axios
        .post("/api/Dispenser/DeleteDispenserRecordTimeData", {
          strSheetNo: Param,
        })
        .then((res) => {
          if (res.data.length > 0) {
            res = res.data.p_error;
          }
        })
        .catch((error) => {
          console.error(error);
        });
      return res;
    } else if (Config == "CallSMTDispenserRecordTimeResult") {
      alert(Param);
      let res = "";
      await axios
        .post("/api/Dispenser/Calldispenser", {
          P_SHEET_NO: Param.P_SHEET_NO,
          P_CB_NO: Param.P_CB_NO,
          P_USER: Param.P_USER,
          P_STATION: Param.P_STATION,
        })
        .then((res) => {
          if (res.data.length > 0) {
            res = res.data.p_error;
          }
        })
        .catch((error) => {
          console.error(error);
        });
      return res;
    } else if (Config == "GetDispenserRecordTimeData") {
      // Fininsih
      let res;
      await axios
        .get("/api/Dispenser/GetDispenserRecordTimeData?strSheetNo=" + Param)
        .then((res) => {
          if (res.data.length > 0) {
            res = res.data.ROW_COUNT;
          } else {
            res = 0;
          }
        })
        .catch((error) => {
          console.error(error);
        });
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
    txtCbno_change,

    //txtFieldState
    txtCBnoState,
    txtSheetNoState,
    txtmcNoState,

    //TextChange
    txtMcno_change,
    txtSheetno_change,
    handleCbNoChange,
  };
}

export { fn_ScanSheetDispenserTime };
