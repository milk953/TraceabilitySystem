import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

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
    disabled: true,
    styled: { backgroundColor: "#dbdede" },
  });
  const [txtLotNoState, setTxtLotNoState] = useState({
    disabled: true,
    styled: { backgroundColor: "#dbdede" },
  });
  const [txtSheetNoState, setTxtSheetNoState] = useState({
    disabled: true,
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
  useEffect(() => {
    PageLoad();
  }, []);
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

  const handleTxtProcess_Change = () => {
    if (txtProcess !== "") {
      setTxtmc("");
      setTxtmcState({
        disabled: false,
        styled: { backgroundColor: "white" },
        Focus: true,
      });
    } else {
      setTxtProcess("");
      FctxtProcess.current.focus();
    }
  };
  const handleTxtmc_Change = () => {
    if (txtmc !== "") {
      setTxtLotNo("");
      setTxtLotNoState({
        disabled: false,
        styled: { backgroundColor: "white" },
        Focus: true,
      });
      FctxtLotNo.current.focus();
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
      setTxtSheetNo("");
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
    if (strStatus == "P"){  
      setLblResult({ text: "OK", styled: "green" });
    }else{
      setLblResult({ text: "NG", styled: "red" });
    }
    setPnlSaveState(false);
    PnlmainEnable();
    setTxtSheetNo("");
    setTxtSheetNoState({Focus: true});

  };
  const btnReplace = async () =>{
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
      setLblResult({ text: "OK", styled: "green" });
    } else {
      setLblResult({ text: "NG", styled: "red" });
    }
    setPnlSaveState(false);
    PnlmainEnable();
    setTxtSheetNo("");
    setTxtSheetNoState({Focus: true});
  }
  const btnCancel = () => {
    setPnlSaveState(false);
    PnlmainEnable();
    setLblSheet("");
    setLblRemark("");
    setLblResult("");
    setTxtSheetNo("");
    setTxtSheetNoState({Focus: true});

  }
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
  function PnlmainEnable(){
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
    if (type == "prdName") { //ok
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
          alert(error);
        });
    } else if (type == "getSerial") {   //ok
      await axios
        .post(
          "/api/GetSerialProductByProduct",
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
            alert("Not Found Data");
          }
        })
        .catch((error) => {
          alert(error);
        });
    } else if (type == "GetMOTRecordTimeData") { //ok
      await axios
        .post(
          "/api/Common/getMOTRecordTimeData",
          {
            dataList: {
              strSheetNo: params.txtSheetNo,
              strProcId: params.txtProcess,
              strPlantCode :'G'
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
            alert("Not Found Data");
          } else {
            alert("Error");
          }
        })
        .catch((error) => {
          alert(error);
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
               strPlantCode :'G'
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
          alert(error);
        });
    } else if (type == "DeleteBakingRecordTimeData") {
      await axios
        .post(
          "/api/DeleteBakingRecordTimeData",
          {
            dataList: {
              strPlantCode: hfFactory,
              strSheetNo: params.strSheetNo,
              strProcId: params.strProcId,
               strPlantCode :'G'
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
          alert(error);
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
    btnCancel
  };
}

export default fn_ScanSheetBakeTime;
