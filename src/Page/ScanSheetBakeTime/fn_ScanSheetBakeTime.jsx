import axios from "axios";
import { set } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { notification } from "antd";
import { CribSharp } from "@mui/icons-material";
function fn_ScanSheetBakeTime() {
  //lbl
  const [lblProductName, setLblProductName] = useState("");
  const [lblSheet, setLblSheet] = useState("");
  const [lblResult, setLblResult] = useState("");
  const [lblRemark, setLblRemark] = useState("");

  //txtField
  const [txtProcess, setTxtProcess] = useState("");
  const [txtmc, setTxtmc] = useState("");
  const [txtLotNo, setTxtLotNo] = useState("");
  const [txtSheetNo, setTxtSheetNo] = useState("");

  //State
  const [txtProcessState, setTxtProcessState] = useState({
    disabled: false,
    styled: { backgroundColor: "#dbdede" },
  });
  const [txtmcState, setTxtmcState] = useState({
    disabled: false,
    styled: { backgroundColor: "#dbdede" },
  });
  const [txtLotNoState, setTxtLotNoState] = useState({
    disabled: false,
    styled: { backgroundColor: "#dbdede" },
  });
  const [txtSheetNoState, setTxtSheetNoState] = useState({
    disabled: false,
    styled: { backgroundColor: "#dbdede" },
  });
  const [pnlSaveState, setPnlSaveState] = useState(false);

  // focus item
  const FctxtProcess = useRef(null);
  const Fctxtmc = useRef(null);
  const FctxtLotNo = useRef(null);
  const FctxtSheetNo = useRef(null);
  //Hidden item
  const [hfURL, setHfURL] = useState("");
  const [hfPeriod, setHfPeriod] = useState("0.2");
  const [hfRow, setHfRow] = useState("10");
  const [hfTimeControl, setHfTimeControl] = useState("1");
  const [hfSPIPeriod, setHfSPIPeriod] = useState("10");

  const [hfCheckprdSht, setHfCheckprdSht] = useState("");
  const [hfCheckprdShtStart, setHfCheckprdShtStart] = useState("");
  const [hfCheckprdShtEnd, setHfCheckprdShtEnd] = useState("");
  const [hfCheckprdAbbr, setHfCheckprdAbbr] = useState("");

  const [hfConnLeafLength, setHfConnLeafLength] = useState("20");
  const [hfFactory, setHfFactory] = useState("A1");
  const plantCode = import.meta.env.VITE_FAC;
  function setFocus(id) {
    document.getElementById(id).focus();
  }
  useEffect(() => {
    PageLoad();
  }, []);
  useEffect(() => {
    if (txtLotNoState.Focus) {
      setFocus("txtLotNoBaking");
    }
    if (txtSheetNoState.Focus) {
      setFocus("txtSheetNoBaking");
    }
    if (txtProcessState.Focus) {
      setFocus("txtProcessBaking");
    }
    if (txtmcState.Focus) {
      setFocus("txtMcBaking");
    }
  }, [txtLotNoState.Focus, txtSheetNoState.Focus, txtProcessState.Focus, txtmcState.Focus]);
  const PageLoad = () => {
    setTxtProcess("");
    setTxtmc("");
    setTxtLotNo("");
    setTxtSheetNo("");
    setLblSheet("");
    setLblProductName("");
    setTxtProcessState({ disabled: false, autofocus: true });
    setTxtLotNoState({
      disabled: true,
      styled: { backgroundColor: "#dbdede" },
    });
    setTxtSheetNoState({
      disabled: true,
      styled: { backgroundColor: "#dbdede" },
    });
    setTxtmcState({ disabled: true, styled: { backgroundColor: "#dbdede" } });
    setTxtSheetNoState({
      disabled: true,
      styled: { backgroundColor: "#dbdede" },
    });
  };
  const ibtback_click = () => {
    setTxtSheetNo("");
    setTxtSheetNoState({
      disabled: true,
      styled: { backgroundColor: "#dbdede" },
    });
    setTxtLotNo("");
    setTxtLotNoState({
      disabled: false,
      styled: { backgroundColor: "white" },
      Focus: true,
    });
    setFocus("txtLotNoBaking");
    // FctxtLotNo.current.focus();
  };
  const handleTxtProcess_Change = () => {
    if (txtProcess !== "") {
      setTxtmc("");
      setTxtmcState({
        disabled: false,
        styled: { backgroundColor: "white" },
        Focus: true,
      });
      setFocus("txtMcBaking");
    } else {
      setTxtProcess("");
      setFocus("txtProcessBaking");
    }
  };
  const handleTxtmc_Change = () => {
    if (txtmc !== "") {
      setTxtLotNo("");
      setTxtmcState({
        disabled: false,
        styled: { backgroundColor: "white" },
      });
      setTxtLotNoState({
        disabled: false,
        styled: { backgroundColor: "white" },
        Focus: true,
      });
      setFocus("txtLotNoBaking");
    } else {
      setTxtmc("");
    }
  };
  const handleTxtLotNo_Change = async () => {
    setLblProductName("");
    setLblSheet("");
    setLblResult("");
    setLblRemark("");
    if (txtLotNo !== "") {
      let strPrdname = "";
      let strLot = "";
      let strLotAll = txtLotNo.split(";");
      strLot = strLotAll[0];
      strPrdname = await getData("prdName", strLot);
      if (strPrdname != "") {
        setLblProductName(strPrdname);
        strPrdname = await getData("getSerial", strPrdname);
        if (strPrdname !== "OK") {
          setTxtLotNo("");
          setTxtLotNoState({
            disabled: false,
            styled: { backgroundColor: "white" },
            Focus: true,
          });
          notification.error({
            message: "Error",
            description: "Not Found Data",
            placement: "bottomRight",
            duration: 3,
          });
          return;
        }
        setTxtLotNo(strLot);
        setTxtProcessState({
          disabled: true,
          styled: { backgroundColor: "#dbdede" },
        });
        setTxtmcState({
          disabled: true,
          styled: { backgroundColor: "#dbdede" },
        });
        setTxtLotNoState({
          disabled: true,
          styled: { backgroundColor: "#dbdede" },
        });
        setTxtSheetNo("");
        setTxtSheetNoState({ disabled: false, Focus: true });
      } else {
        setTxtLotNo("");
        setTxtLotNoState({
          disabled: false,
          styled: { backgroundColor: "white" },
          Focus: true,
        });
      }
    } else {
      setTxtLotNo("");
      setTxtLotNoState({
        disabled: false,
        styled: { backgroundColor: "white" },
        Focus: true,
      });
    }
  };
  const handleTxtSheetNo_Change = async () => {
    setLblResult("")
    let rowCout = 0;
    if (lblRemark !== "") {
      setLblRemark("");
    }
    if (txtSheetNo !== "") {
      var strError = "";
      var strStatus = "";
      if (hfCheckprdSht == "Y") {
        let start = parseInt(hfCheckprdShtStart);
        let end = parseInt(hfCheckprdShtEnd);
        let txtSheetNoSubstring = txtSheetNo.substring(start - 1, end);
        if (hfCheckprdAbbr != txtSheetNoSubstring) {
          strStatus = "F";
          strError = "Invalid sheet length";
        }
      }
      if (
        parseInt(hfConnLeafLength) > 0 &&
        parseInt(hfConnLeafLength) !== txtSheetNo.length &&
        strStatus == "F"
      ) {
        strStatus = "N";
        strError = "Invalid sheet length";
      }
      if (strStatus !== "F") {
        rowCout = await getData("GetMOTRecordTimeData", {
          txtSheetNo: txtSheetNo,
          txtProcess: txtProcess,
        });
        console.log(rowCout, "rowCout");
        if (rowCout == 0) {
          strError = await getData("CallSMTBakingRecordTimeResult", {
            strSheetNo: txtSheetNo,
            strmachineNo: txtProcess,
            strLotno: txtLotNo,
            strProduct: lblProductName,
            strProcess: txtProcess,
          });
          const currentTime = new Date().toLocaleTimeString("en-US", {
            hour12: false,
          });
          setLblSheet(`${txtSheetNo} [${currentTime}]`);
          setLblRemark(strError);
          if (strError == "") {
            setLblResult({ text: "OK", styled: "green" });
          } else {
            setLblResult({ text: "NG", styled: "red" });
          }
        } else {
          setLblSheet(txtSheetNo);
          setPnlSaveState(true);
          PnlmainDisable();
          setLblRemark("Exists record time, please be confirm.");
        }
      } else {
        setLblResult({ text: "NG", styled: "red" });
        setLblRemark(strError);
      }
      // setTxtSheetNo("");
      setTxtSheetNoState({
        disabled: false,
        styled: { backgroundColor: "white" },
        Focus: true,
      });
    } else {
      setTxtSheetNo("");
      setTxtSheetNoState({
        disabled: false,
        styled: { backgroundColor: "white" },
        Focus: true,
      });
    }
  };
  const btnDelete = async () => {
    let strError = "";
    let strStatus = "";
    strError = await getData("DeleteBakingRecordTimeData", {
      strSheetNo: lblSheet,
      strProcId: txtProcess,
    });

    setLblSheet(`${lblSheet} Delete`);
    setLblRemark(strError);
    if (strError == "") {
      notification.success({
        message: "Success",
        description: "Delete Success",
        placement: "bottomRight",
        duration: 3,
      });
      setLblResult({ text: "OK", styled: "green" });
    }else{
      notification.error({
        message: "Error",
        description: strError,
        placement: "bottomRight",
        duration: 3,
      });
      setLblResult({ text: "NG", styled: "red" });
    }
    // if (strStatus == "P") {
    //   setLblResult({ text: "OK", styled: "green" });
    // } else {
    //   setLblResult({ text: "NG", styled: "red" });
    // }
    setPnlSaveState(false);
    PnlmainEnable();
    setTxtSheetNo("");
    setTxtSheetNoState({ Focus: true });
    setFocus("txtSheetNoBaking");
  };
  const btnReplace = async () => {
    let strError = "";
    let strStatus = "";
    strError = await getData("CallSMTBakingRecordTimeResult", {
      strSheetNo: txtSheetNo,
      strmachineNo: txtProcess,
      strLotno: txtLotNo,
      strProduct: lblProductName,
      strProcess: txtProcess,
    });
    const currentTime = new Date().toLocaleTimeString("en-US", {
      hour12: false,
    });
    setLblSheet(`${txtSheetNo} [${currentTime}]`);
    setLblRemark(strError);
    if (strError == "") {
      notification.success({
        message: "Success",
        description: "Replace Success",
        placement: "bottomRight",
        duration: 3,
      });
      setLblResult({ text: "OK", styled: "green" });
    } else {
      setLblResult({ text: "NG", styled: "red" });
    }
    setPnlSaveState(false);
    PnlmainEnable();
    setTxtSheetNo("");
    setTxtSheetNoState({ Focus: true });
    setFocus("txtSheetNoBaking");
  };
  const btnCancel = () => {
    setPnlSaveState(false);
    PnlmainEnable();
    setLblSheet("");
    setLblRemark("");
    setLblResult("");
    setTxtSheetNo("");
    setTxtSheetNoState({ Focus: true });
    setFocus("txtSheetNoBaking");
  };
  function PnlmainDisable() {
    setTxtProcessState({
      disabled: true,
      styled: { backgroundColor: "#dbdede" },
    });
    setTxtmcState({ disabled: true, styled: { backgroundColor: "#dbdede" } });
    setTxtLotNoState({
      disabled: true,
      styled: { backgroundColor: "#dbdede" },
    });
    setTxtSheetNoState({
      disabled: true,
      styled: { backgroundColor: "#dbdede" },
    });
  }
  function PnlmainEnable() {
    setTxtProcessState({
      disabled: false,
      styled: { backgroundColor: "#dbdede" },
    });
    setTxtmcState({ disabled: false, styled: { backgroundColor: "#dbdede" } });
    setTxtLotNoState({
      disabled: false,
      styled: { backgroundColor: "#dbdede" },
    });
    setTxtSheetNoState({
      disabled: false,
      styled: { backgroundColor: "#dbdede" },
    });
  }

  async function getData(type, params) {
    let Result = "";
    if (type == "prdName") {
      //ok
      await axios
        .post("/api/Common/getProductNameByLot", {
          strLot: params,
        })
        .then((res) => {
          if (res.data != "") {
            Result = res.data.prdName[0];
          }
        })
        .catch((error) => {
          notification.error({
            message: "Error",
            description: error,
            placement: "bottomRight",
            duration: 3,
          });
        });
    } else if (type == "getSerial") {
      //ok FIN 995123423
      await axios
        .post(
          "/api/Common/GetSerialProductByProduct",
          {
            prdName: params,
          },
          {
            validateStatus: function (status) {
              return true;
            },
          }
        )
        .then((res) => {
          if (res.data != "" && res.status == 200) {
            setHfCheckprdSht(res.data.PRM_REQ_CHECK_PRD_SHT);
            setHfCheckprdShtStart(res.data.PRM_CHECK_PRD_SHT_START);
            setHfCheckprdShtEnd(res.data.PRM_CHECK_PRD_SHT_END);
            setHfCheckprdAbbr(res.data.PRM_ABBR);
            setHfConnLeafLength(res.data.PRM_CONN_LEAF_LENGTH);
            Result = "OK";
          } else if (res.status == 404) {
            notification.error({
              message: "Error",
              description: "Not Found Data",
              placement: "bottomRight",
              duration: 3,
            });
          }
        })
        .catch((error) => {
          notification.error({
            message: "Error",
            description: error,
            placement: "bottomRight",
            duration: 3,
          });
        });
    } else if (type == "GetMOTRecordTimeData") {
      //ok
      await axios
        .post(
          "/api/Common/getMOTRecordTimeData",
          {
            dataList: {
              strSheetNo: params.txtSheetNo,
              strProcId: params.txtProcess,
              strPlantCode: plantCode,
            },
          },
          {
            validateStatus: function (status) {
              return true;
            },
          }
        )
        .then((res) => {
          if (res.data != "" && res.status == 200) {
            Result = res.data[0].row_count;
          } else if (res.status == 404) {
            notification.error({
              message: "Error",
              description: "Not Found Data",
              placement: "bottomRight",
              duration: 3,
            });
          } else {
            notification.error({
              message: "Error",
              description: "Eror",
              placement: "bottomRight",
              duration: 3,
            });
          }
        })
        .catch((error) => {
          notification.error({
            message: "Error",
            description: error,
            placement: "bottomRight",
            duration: 3,
          });
        });
    } else if (type == "CallSMTBakingRecordTimeResult") {
      await axios
        .post(
          "/api/CallSMTBakingRecordTimeResult",
          {
            dataList: {
              strSheetNo: params.strSheetNo,
              strmachineNo: params.strmachineNo,
              strLotno: params.strLotno,
              strProduct: params.strProduct,
              strProcess: params.strProcess,
              strFactory: hfFactory,
              strPlantCode: plantCode,
            },
          },
          {
            validateStatus: function (status) {
              return true;
            },
          }
        )
        .then((res) => {
          Result = res.data.p_error;
        })
        .catch((error) => {
          notification.error({
            message: "Error",
            description: error,
            placement: "bottomRight",
            duration: 3,
          });
        });
    } else if (type == "DeleteBakingRecordTimeData") {
      console.log(params, "params");
      await axios        
        .post(
          "/api/DeleteBakingRecordTimeData",
          {
            dataList: {
              strSheetNo: params.strSheetNo,
              strProcId: params.strProcId,
              strPlantCode: plantCode,
            },
          },
          {
            validateStatus: function (status) {
              return true;
            },
          }
        )
        .then((res) => {
          Result = res.data.p_error;
        })
        .catch((error) => {
          notification.error({
            message: "Error",
            description: error,
            placement: "bottomRight",
            duration: 3,
          });
        });
    }
    return Result;
  }
  return {
    lblProductName,
    lblSheet,
    lblResult,
    lblRemark,

    //txtField
    txtProcess,
    txtmc,
    txtLotNo,
    txtSheetNo,
    setTxtProcess,
    setTxtmc,
    setTxtLotNo,
    setTxtSheetNo,

    //State
    txtProcessState,
    txtmcState,
    txtLotNoState,
    txtSheetNoState,
    pnlSaveState,

    //foucus item
    FctxtProcess,
    Fctxtmc,
    FctxtLotNo,
    FctxtSheetNo,

    //txtChange
    handleTxtProcess_Change,
    handleTxtmc_Change,
    handleTxtLotNo_Change,
    handleTxtSheetNo_Change,
    //btn
    btnDelete,
    btnReplace,
    btnCancel,
    ibtback_click,
  };
}

export default fn_ScanSheetBakeTime;
