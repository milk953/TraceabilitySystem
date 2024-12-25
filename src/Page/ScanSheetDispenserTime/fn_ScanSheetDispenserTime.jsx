import { ConsoleSqlOutlined } from "@ant-design/icons";
import { CompareSharp, StopScreenShareRounded } from "@mui/icons-material";
import axios from "axios";
import { set } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import {useLoading} from "../../loading/fn_loading";  
import {DataConfig} from "../Common/function_Common";

function fn_ScanSheetDispenserTime() {
  const{ConfigData} = DataConfig();
  const holding_time_flg = ConfigData.DIS_HOLDINGTIME_FLG;
  const {showLoading,hideLoading} = useLoading();
  //State
  const [pnlSaveState, setPnlSaveState] = useState(false);
  const [pnlResultState, setPnlResultState] = useState(false);
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
    styled: { backgroundColor: "#e0e0e0" },
    open: true,
  });
  const [txtCBnoState, setTxtCBnoState] = useState({
    disabled: false,
    styled: { backgroundColor: "#e0e0e0" },
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
      styled: { backgroundColor: "#e0e0e0" },
    });

    if (hfCBNoFlg == "Y") {
      // setTxtCBno("");
      setTxtCBnoState({
        disabled: true,
        styled: { backgroundColor: "#e0e0e0" },
        open: true,
      });
    } else {
      setTxtCBnoState({
        disabled: true,
        styled: { backgroundColor: "#e0e0e0" },
        open: false,
      });
    }
  }
//txtChange 
  const txtMcno_change = () => {
    setTxtmcNoState({ disabled: true, styled: { backgroundColor: "#e0e0e0" } });
    setTxtSheetNo("");
    setTxtSheetNoState({
      disabled: false,
      styled: { backgroundColor: "white" },
      focused: true,
    });
    FctxtSheetNo.current.focus();
  };
  const txtSheetno_change = async () => {
    setPnlResultState(false);
    let rowCount = 0;
    let strError = "";
    let strStatus = "";
    setLblRemark("");
    setPnlSaveState(false);
    if (txtSheetNo != "") {
      if (parseInt(hfConnLeafLength) > 0 &&parseInt(hfConnLeafLength) != txtSheetNo.length &&strStatus != "F") {
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
        if (parseInt(rowCount) == 0) {
          const currentTime = new Date().toLocaleTimeString("en-US", {
            hour12: false,
          });
          setLblSheet(`${txtSheetNo} [${currentTime}]`);
          showLoading('กำลังบันทึก กรุณารอสักครู่')
          strError = await getData("CallSMTDispenserRecordTimeResult", {
            P_SHEET_NO: txtSheetNo,
            P_CB_NO: txtCBno,
            P_USER: "frm_ScanSheetDispenserTime",
            P_STATION: txtmcNo,
          });
          console.log(strError)
          if (strError == "") {
            
            setTxtCBnoState({
              disabled: true,
              styled: { backgroundColor: "#e0e0e0" },
              open: true,

            })
            setLblResult({ text: "OK", styled: "white" ,backgroundColor:'green' });    
            
            setPnlResultState(true);     
          }else{
            setLblResult({ text: "NG",  styled: "white",backgroundColor:'red' });
            setLblRemark({text:strError,color:'white',backgroundColor:'red'});
            setPnlResultState(true);   
          }
        } else {
          setLblSheet(`${txtSheetNo}`);
          setPnlSaveState(true);
          PnlmainDisable();
          setLblResult("")
          setLblRemark({text:"Exists record time, \n please be confirm.",color:'black',backgroundColor:'yellow'});
          setPnlResultState(true);
        }
        setTxtSheetNo("");
        setTxtSheetNoState({
          disabled: false,
          styled: { backgroundColor: "white" },
          focused: true,
        });
        hideLoading();
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
      setLblResult({ text: "NG",  styled: "white",backgroundColor:'red' });
      setLblRemark({text:strError,color:'white',backgroundColor:'red'});
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
    setLblResult("");
    setLblRemark("");
    setPnlSaveState(false);
    if (txtSheetNo != "") {
      if (parseInt(hfConnLeafLength) > 0 && parseInt(hfConnLeafLength) != txtSheetNo.length &&strStatus != "F") {
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
        let rowCount = await axios.get("/api/Dispenser/GetDispenserRecordTimeData?strSheetNo=" + txtSheetNo)
          .then((res) => {
            return res.data.row_count;
          })
          .catch((error) => {
            setLblRemark({text:error,color:'white',backgroundColor:'red'});
          });
        console.log(rowCount,'rowCount')
        if (rowCount == 0) {
          const currentTime = new Date().toLocaleTimeString("en-US", {
            hour12: false,
          });
          setLblSheet(`${txtSheetNo} [${currentTime}]`);
          showLoading('กำลังบันทึก กรุณารอสักครู่')
          strError = await getData("CallSMTDispenserRecordTimeResult", {
            P_SHEET_NO: txtSheetNo,
            P_CB_NO: txtCBno,
            P_USER: "frm_ScanSheetDispenserTime",
            P_STATION: txtmcNo,
          });
          console.log(strError)
          if (strError == "") {
            
            setTxtCBnoState({
              disabled: true,
              styled: { backgroundColor: "#e0e0e0" },
              open: true,

            })
            setLblResult({ text: "OK", styled: "white" ,backgroundColor:'green' });
            setPnlResultState(true);         
          }else{
            setLblResult({ text: "NG",  styled: "white",backgroundColor:'red' });
            setLblRemark({text:strError,color:'white',backgroundColor:'red'});
            setPnlResultState(true);   
          }
        } else {
          setLblSheet(`${txtSheetNo}`);
          setPnlSaveState(true);
          setTxtCBnoState({
            disabled: true,
            styled: { backgroundColor: "#e0e0e0" },
            open: true,
          })
          setPnlResultState(true);
          setLblRemark({text:"Exists record time, \n please be confirm.",color:'black',backgroundColor:'yellow'});
        }
        setTxtSheetNo("");
        setTxtSheetNoState({
          disabled: false,
          styled: { backgroundColor: "white" },
          open: true,
        })
        setFocus('txtSheetNoDispenser')
        hideLoading();
      } else {
        setLblResult({ text: "NG",  styled: "white",backgroundColor:'red' });
        setLblRemark({text:strError,color:'white',backgroundColor:'red'});
        // setTxtSheetNo("");
        setTxtSheetNoState({
          disabled: false,
          styled: { backgroundColor: "white" },
          focused: true,
        });
      }
    }
  };
  function setFocus(txtField){
    document.getElementById(`${txtField}`).focus();
  }
  const handleCbNoChange = (e) => {
    setTxtCBno(e.target.value);
  };
  //Btn
  const btnReturn_Click = () => {
    console.log("btnReturn_Click");
  };

  const btnReplace_Click = async () => {
    let strError = "";
    let strStatus = "";
    showLoading('กำลังบันทึก กรุณารอสักครู่')
    strError = await getData("CallSMTDispenserRecordTimeResult", {
      P_SHEET_NO: lblSheet,
      P_CB_NO: txtCBno,
      P_USER: "frm_ScanSheetDispenserTime",
      P_STATION: txtmcNo,
    });
    const currentTime = new Date().toLocaleTimeString("en-US", {
      hour12: false,
    });
    setLblSheet(`${lblSheet} [${currentTime}]`);
    setLblRemark({text:strError,color:'white',backgroundColor:'red'});

    if (strError == "") {
      setLblResult({ text: "OK", styled: "white" ,backgroundColor:'green' });
      setPnlResultState(true);
    } else {
      setLblResult({ text: "NG",  styled: "white",backgroundColor:'red' });
      setLblRemark({text:strError,color:'white',backgroundColor:'red'});
      setPnlResultState(true);
    }
    setPnlSaveState(false);
    setTxtSheetNo("");
    setTxtSheetNoState({
      disabled: false,
      styled: { backgroundColor: "white" },
      focused: true,
    });
    hideLoading();
  };
  const btnDelete_Click = async () => { //Delete OK
    let strError = "";
    let strStatus = "";
    showLoading('กำลังบันทึก กรุณารอสักครู่')
    strError = await getData("DeleteDispenserRecordTimeData", lblSheet); 
    console.log(strError)
    setLblRemark({text:strError,color:'white',backgroundColor:'red'});
    if (strError == "") {
      setLblSheet(`${lblSheet} Delete`);
      setPnlResultState(false);
    }else{
      setLblResult({ text: "NG",  styled: "white",backgroundColor:'red' });
      setLblRemark({text:strError,color:'white',backgroundColor:'red'});
      setPnlResultState(true);
    }
    setPnlSaveState(false);
    setTxtSheetNo("");
    setTxtSheetNoState({
      disabled: false,
      styled: { backgroundColor: "white" },
      focused: true,
    });
    hideLoading();
  };
  
  const btnCancel_Click = () => {
    setPnlSaveState(false);
    setPnlResultState(false);
    setLblSheet('');
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
      styled: { backgroundColor: "#e0e0e0" },
      open: true,
    });
    setTxtCBno("");
    setTxtCBnoState({
      disabled: true,
      styled: { backgroundColor: "#e0e0e0" },
      open: true,
    });
    setTxtmcNoState({
      disabled: false,
      styled: { backgroundColor: "white" },
      focused: true,
      open: true,
    });
    setPnlResultState(false);
    setPnlSaveState(false);
    setLblSheet("");
  };
  function Setdisable(type, txtField) {
    if (type == "disable") {
      document.getElementById(`${txtField}`).disabled = true;
      document.getElementById(`${txtField}`).className = "styleDisableDispenSer";
    } else {
      document.getElementById(`${txtField}`).disabled = false;
      document.getElementById(`${txtField}`).className = "styleEnableDispenSer";
    }
  }
  
  function PnlmainDisable() {
    setTxtmcNoState({ disabled: true, styled: { backgroundColor: "#e0e0e0" } });
    setTxtSheetNoState({
      disabled: true,
      styled: { backgroundColor: "#e0e0e0" },
      open: true,
    });
    setTxtCBnoState({
      disabled: true,
      styled: { backgroundColor: "#e0e0e0" },
      open: true,
    });
  }
  function PnlmainEnable() {
    setTxtmcNoState({ disabled: false, styled: { backgroundColor: "white" } });
    setTxtSheetNoState({
      disabled: true,
      styled: { backgroundColor: "#e0e0e0" },
    });
    setTxtCBnoState({ disabled: true, styled: { backgroundColor: "#e0e0e0" } });
  }
  async function getData(Config, Param) {
    if (Config == "DeleteDispenserRecordTimeData") {
      let res = "";
      await axios
        .post("/api/Dispenser/DeleteDispenserRecordTimeData", {
          strSheetNo: Param,
        })
        .then((res) => {
          if (res.data.length > 0) {
            res = res.data.message;
          }
        })
        .catch((error) => {
          console.error(error);
        });
      return res;
    } else if (Config == "CallSMTDispenserRecordTimeResult") {
      let resultcallDispenser = "";
      await axios
        .post("/api/Dispenser/CallSMTDispenserRecordTimeResult", {
          p_sheet_no: Param.P_SHEET_NO,
          p_cb_no: Param.P_CB_NO,
          p_user: Param.P_USER,
          p_station: Param.P_STATION,
          p_holding_time_flg: holding_time_flg,
        })
        .then((res) => {
          resultcallDispenser = res.data.P_ERROR;          
        })
        .catch((error) => {
          console.error(error);
        });
      return resultcallDispenser;
    } else if (Config == "GetDispenserRecordTimeData") {
      // Fininsih
      let response = '';
      await axios
        .get("/api/Dispenser/GetDispenserRecordTimeData?strSheetNo=" + Param)
        .then((res) => {
          response = res.data.row_count
        })
        .catch((error) => {
          console.error(error);
        });
      return response;
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
    pnlResultState
  };
}

export { fn_ScanSheetDispenserTime };
