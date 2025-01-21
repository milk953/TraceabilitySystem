import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { notification } from "antd";
import {DataConfig} from "../Common/function_Common";
import Swal from "sweetalert2";
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
    styled: { backgroundColor: "white" },
  });
  const [txtmcState, setTxtmcState] = useState({
    disabled: false,
    styled: { backgroundColor: "white" },
  });
  const [txtLotNoState, setTxtLotNoState] = useState({
    disabled: false,
    styled: { backgroundColor: "white" },
  });
  const [txtSheetNoState, setTxtSheetNoState] = useState({
    disabled: false,
    styled: { backgroundColor: "white" },
    // #e0e0e0
  });
  const [pnlSaveState, setPnlSaveState] = useState(false);
  const [PnlShowresult, setPnlShowresult] = useState(false);
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
  const{ConfigData} = DataConfig();
  const plantCode = ConfigData.FACTORY; 
   
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
      styled: { backgroundColor: "#e0e0e0" },
    });
    setTxtSheetNoState({
      disabled: true,
      styled: { backgroundColor: "#e0e0e0" },
    });
    setTxtmcState({ disabled: true, styled: { backgroundColor: "#e0e0e0" } });
    setTxtSheetNoState({
      disabled: true,
      styled: { backgroundColor: "#e0e0e0" },
    });
  };
  const ibtback_click = () => {
    setPnlShowresult(false);
    setPnlSaveState(false);
    setLblProductName("");
    setLblSheet("");
    setTxtSheetNo("");
    setTxtSheetNoState({
      disabled: true,
      styled: { backgroundColor: "#e0e0e0" },
    });
    setTxtLotNo("");
    setTxtmcState({
      disabled: false,
      styled: { backgroundColor: "white" },
      Focus: false,
    });
    setTxtLotNoState({
      disabled: false,
      styled: { backgroundColor: "white" },
      Focus: true,
    });
    setFocus("txtLotNoBaking");

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
          return;
        }
        setTxtLotNo(strLot);
        setTxtProcessState({
          disabled: true,
          styled: { backgroundColor: "#e0e0e0" },
        });
        setTxtmcState({
          disabled: true,
          styled: { backgroundColor: "#e0e0e0" },
        });
        setTxtLotNoState({
          disabled: true,
          styled: { backgroundColor: "#e0e0e0" },
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
          setLblRemark({text:strError,color:'white',backgroundColor:'red'});
          // setPnlSaveState(true);
          // setPnlShowresult(true);
          if (strError == "") {
            setPnlShowresult(true);
            setLblResult({ text: "OK", styled: "white" ,backgroundColor:'green'});
            setTxtSheetNo("");
          } else {
            setPnlShowresult(true);
            setLblResult({ text: "NG", styled: "white",backgroundColor:'red',border:'1px solid red' });
          }
        } else {
          // setLblSheet(txtSheetNo);
          setLblSheet(txtSheetNo);
          setPnlSaveState(true);
          setPnlShowresult(true)
          PnlmainDisable();
          setLblRemark({text:"Exists record time, \n please be confirm.",color:'black',backgroundColor:'yellow'});
        }
      } else {
        setLblResult({ text: "NG", styled: "white",backgrond:'red',border:'1px solid red' });
        // setLblRemark(strError);
        setLblRemark({text:strError,color:'black',backgroundColor:'red'});
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
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to Delete this record?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteData();
      }
    });
    if (txtSheetNo == "") {
      setFocus("txtSheetNoBaking");
    }else{
      await deleteData();
    }
    
  };
  async function deleteData(){
    let strError = "";
    let strStatus = "";
    strError = await getData("DeleteBakingRecordTimeData", {
      strSheetNo: txtSheetNo,
      strProcId: txtProcess,
    });

    setLblSheet(`${txtSheetNo} Delete Success`);
    setLblRemark(strError);
    setLblRemark({text:strError,color:'black',backgroundColor:'red'});
    if (strError == "") {
      setPnlShowresult(true);
      setLblResult({ text: "OK", styled: "white",backgroundColor:'green' });
      setTxtSheetNo("");
    }else{
      setLblSheet(`${txtSheetNo} Delete Error ${strError}`);
      setPnlShowresult(true);
      setLblResult({ text: "NG", styled: "white" ,backgrond:'red',border:'1px solid red'});
    }
    setPnlSaveState(false);
    setPnlShowresult(false);
    PnlmainEnable();
    setTxtSheetNo("");
    setTxtSheetNoState({ Focus: true });
    setFocus("txtSheetNoBaking");
  }
  const btnReplace = async () => {
    if (txtSheetNo == "") {
      setFocus("txtSheetNoBaking");
    }else{
      await Replace();
    }
    
    // Swal.fire({
    //   title: "Are you sure?",
    //   text: "Do you want to replace this record?",
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: "Yes",
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     Replace();
    //   }
    // });
    
  };
  async function Replace(){
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
    setLblRemark({text:strError,color:'white',backgroundColor:'red'});
    
    if (strError == "") {
      setPnlShowresult(true);
      setLblResult({ text: "OK", styled: "white",backgroundColor:'green' });
      setTxtSheetNo("");
    } else {
      setPnlShowresult(true);
      setLblResult({ text: "NG", styled: "white",backgroundColor:'red',border:'1px solid red' });
    }
    setPnlSaveState(false);
    // setPnlShowresult(false);
    PnlmainEnable();
    setTxtSheetNo("");
    setTxtSheetNoState({ Focus: true });
    setFocus("txtSheetNoBaking");
  }
  const btnCancel = () => {
    setPnlSaveState(false);
    setPnlShowresult(false);
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
      styled: { backgroundColor: "#e0e0e0" },
    });
    setTxtmcState({ disabled: true, styled: { backgroundColor: "#e0e0e0" } });
    setTxtLotNoState({
      disabled: true,
      styled: { backgroundColor: "#e0e0e0" },
    });
    setTxtSheetNoState({
      disabled: true,
      styled: { backgroundColor: "#e0e0e0" },
    });
  }
  function PnlmainEnable() {
    setTxtProcessState({
      disabled: false,
      styled: { backgroundColor: "#e0e0e0" },
    });
    // setTxtmcState({ disabled: false, styled: { backgroundColor: "#e0e0e0" } });
    setTxtLotNoState({
      disabled: false,
      styled: { backgroundColor: "#e0e0e0" },
    });
    setTxtSheetNoState({
      disabled: false,
      styled: { backgroundColor: "#e0e0e0" },
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
            setLblResult({ text: "NG", styled: "white",backgrond:'red',border:'1px solid red' });
            setLblRemark("Not Found Data");
          }
        })
        .catch((error) => {
          setLblResult({ text: "NG", styled: "white",backgrond:'red',border:'1px solid red' });
            setLblRemark(error);
        });
    } else if (type == "GetMOTRecordTimeData") {
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
    PnlShowresult
  };
}

export default fn_ScanSheetBakeTime;
