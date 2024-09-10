import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { TableSortLabel } from "@mui/material";
import { color } from "framer-motion";


function fn_ScanSheetMOTTime() {
  //txt
  const [txtlot, settxtlot] = useState({
    value: "",
    disbled: '',
    visble: "",
    style: {},
    focus:false
  });
  const [txtSheet, settxtSheet] = useState({
    value: "",
    disbled: "",
    visble: "",
    style: {},
    focus:false
  });
  const [txtMCNo, settxtMCNo] = useState({
    value: "",
    disbled: "",
    visble: "",
    style: {},
    focus:false
  });
  const [txtCBNo, settxtCBNo] = useState({
    value: "",
    disbled: "",
    visble: "none",
    style: {},
    focus:false
  }); //visible 'none'ซ่อน//''โชว์
  const [txtSUSNo, settxtSUSNo] = useState({
    value: "",
    disbled: "",
    visble: "none",
    style: {},
    focus:false   //falseยังไม่โฟกัส trueโฟกัส
  }); //visible 'none'ซ่อน//''โชว์

  //lbl
  const [lblProductName, setlblProductName] = useState("");
  const [lblSheet, setlblSheet] = useState("");
  const [lblRemark, setlblRemark] = useState("");
  const [lblResult, setlblResult] = useState({
    value: "",
    disbled: "",
    visble: "",
    style: {color:"#EFBC9B"},
  });

  //Button
  const [pnlSave, setpnlSave] = useState("none");

  //hf
  const [hfCheckPrdSht, sethfCheckPrdSht] = useState("");
  const [hfCheckPrdShtStart, sethfCheckPrdShtStart] = useState("");
  const [hfCheckPrdShtEnd, sethfCheckPrdShtEnd] = useState("");
  const [hfCheckPrdAbbr, sethfCheckPrdAbbr] = useState("");
  const [hfConnLeafLength, sethfConnLeafLength] = useState("");

  //time
  const currentTime = new Date().toLocaleTimeString("en-GB", { hour12: false });

  //Focus
  let fctxtMcNo = useRef([]);
  let fctxtLotno = useRef([]);
  let fctxtSheetNo = useRef([]);
  let fctxtSUSNo = useRef([]);
  let fctxtCBNo = useRef([]);

  //link
  const params = new URLSearchParams(window.location.search);
  const CB = params.get("CB");
  const SUS = params.get("SUS");
  let hfZPRNProcID='1840'
  const Fac = import.meta.env.VITE_FAC;
  const VITE_FINAL_GATE_AUTO_PRD= import.meta.env.VITE_FINAL_GATE_AUTO_PRD;
  
  useEffect(() => {
    settxtMCNo((prevState) => ({ ...prevState, value: "", disbled: false,focus:true }));
    settxtlot((prevState) => ({
      ...prevState,
      value: "",
      disbled: true,
      style: { background: "#EEEEEE" },
    }));
    settxtSheet((prevState) => ({
      ...prevState,
      value: "",
      disbled: true,
      style: { background: "#EEEEEE" },
    }));

    setlblRemark("");
    setlblSheet("");
    setlblResult((prevState) => ({ ...prevState, value: ""}));
    /// pnlMain.Enabled = True
 
    setpnlSave("none");
    if (CB == "Y") {
      settxtCBNo((prevState) => ({
        ...prevState,
        value: "",
        disbled: true,
        visble: "",
        style: { background: "#EEEEEE" },
      }));
    } else {
      settxtCBNo((prevState) => ({ ...prevState, visble: "none" }));
    }

    if (SUS == "Y") {
      settxtSUSNo((prevState) => ({
        ...prevState,
        value: "",
        disbled: true,
        visble: "",
        style: { background: "#EEEEEE" },
      }));
    } else {
      settxtSUSNo((prevState) => ({ ...prevState, visble: "none" }));
    }
    setTimeout(() => {
      fctxtMcNo.current.focus();
    }, 300);
  
  }, []);

  const txtMCNo_TextChanged = async () => {
  
    settxtSheet((prevState) => ({
      ...prevState,
      value: "",
      disbled: true,
      style: { background: "#eeeeee" },
    }));
    settxtlot((prevState) => ({
      ...prevState,
      disbled: false,
      style: { background: "" },
   
    }));
    if (txtCBNo.visble) {
   
      settxtCBNo((prevState) => ({
        ...prevState,
        disbled: true,
        value: "",
        style: { background: "#EEEEEE" },
      }));
    }
    if (txtSUSNo.visble=='') {
    
      settxtSUSNo((prevState) => ({
        ...prevState,
        disbled: true,
        value: "",
        style: { background: "#EEEEEE" },
      }));
      
    }
   
    setTimeout(() => {
      fctxtLotno.current.focus();
    }, 300);
  };

  const txtLotNo_TextChanged = async () => {
    setlblProductName("");
    setlblRemark("");
    setlblResult((prevState) => ({ ...prevState, value: "" }));
    setlblSheet("");
    let dtProductSerial;

    if (txtlot.value != "") {
      let _strPrdName = "";
      let _strLot = "";
      let _strLotAll = txtlot.value.toUpperCase().split(";");
      _strLot = _strLotAll[0];
      await axios
        .post("/api/Common/GetProductNameByLot", {
          strLot: _strLot,
        })
        .then((res) => {
          console.log('srttt',res.data)
            _strPrdName = res.data.prdName;
        });
       
      if (_strPrdName != "") {
        setlblProductName(_strPrdName);
        await axios
          .post("/api/common/GetSerialProductByProduct", {
            prdName: _strPrdName[0],
          })
          .then((res) => {
            dtProductSerial = res.data[0];
            console.log(dtProductSerial,'dtProductSerial1')
          });
        if (dtProductSerial != null) {
          console.log(dtProductSerial,'dtProductSerial2')
          sethfCheckPrdSht(dtProductSerial.prm_req_check_prd_sht); 
          sethfCheckPrdShtStart(dtProductSerial.prm_check_prd_sht_start);
          sethfCheckPrdShtEnd(dtProductSerial.prm_check_prd_sht_end); 
          sethfCheckPrdAbbr(dtProductSerial.prm_abbr);
          sethfConnLeafLength(dtProductSerial.prm_conn_leaf_length); 
        }

        settxtlot((prevState) => ({
          ...prevState,
          value: _strLot,
          disbled: true,
          style: { background: "#EEEEEE" },
        }));

        settxtMCNo((prevState) => ({
          ...prevState,
          disbled: true,
          style: { background: "#EEEEEE" },
        }));

        settxtSheet((prevState) => ({
          ...prevState,
          disbled: false,
          style: { background: "" },
          value: "",
        }));

        if (txtCBNo.visble=='') {
       
          settxtCBNo((prevState) => ({
            ...prevState,
            disbled: false,
            style: { background: "" },
            value: "",
          }));
        }
        if (txtSUSNo.visble=='') {
    
          settxtSUSNo((prevState) => ({
            ...prevState,
            disbled: false,
            style: { background: "" },
          }));
        }
        settxtSUSNo((prevState) => ({
          ...prevState,
          value: '',
        }));
        settxtSheet((prevState) => ({
          ...prevState,
          focus: true,
        }));
      
        setTimeout(() => {
          fctxtSheetNo.current.focus();
        }, 300);
      } else {
        settxtlot((prevState) => ({ ...prevState, value: "",focus:true }));
       
        setTimeout(() => {
          fctxtLotno.current.focus();
        }, 300);
      }
    } else {
      settxtlot((prevState) => ({ ...prevState, value: "",focus:true }));
      setTimeout(() => {
        fctxtLotno.current.focus();
      }, 300);
    }
  };

  const txtSheetNo_TextChanged = async () => {
  
    if (txtSheet.value != "") {
      let strError = "";
      let strStatus = "";
      let rowCount = 0;
      setlblRemark("");
      setpnlSave("none");
      if (hfCheckPrdSht == "Y") {
        const sheetNo = txtSheet.value.trim().toUpperCase();
        const start = parseInt(hfCheckPrdShtStart);
        const end = parseInt(hfCheckPrdShtEnd);
        const midValue = sheetNo.substring(start - 1, end);
        if (hfCheckPrdAbbr !== midValue) {
          strStatus = "F";
          strError = "Sheet product mix";
        }
      }
     
      const connLeafLength = parseInt(hfConnLeafLength);
      const sheetLength = txtSheet.value.trim().toUpperCase().length;
      console.log('connLeafLength',connLeafLength,sheetLength)
      if (
        connLeafLength > 0 &&
        connLeafLength !== sheetLength &&
        strStatus == "F"
      ) {
        strStatus = "F";
        strError = "Invalid sheet length";
      }
      if (strStatus != "F") {
        console.log('strStatus != "F"',strStatus)
        if (txtCBNo.visble=='') {
        
          settxtCBNo((prevState) => ({
            ...prevState,
            disbled: false,
            style: { background: "" },
            value: "",
           
          }));
         
          fctxtCBNo.current.focus();
        } else if (txtSUSNo.visble=='') {
         
          settxtSUSNo((prevState) => ({
            ...prevState,
            disbled: false,
            value: "",
            style: { background: "" },
         
          }));
         
          fctxtSUSNo.current.focus();
        } else {
          console.log('else')
          await axios
            .post("/api/GetMOTRecordTimeData", {
              SheetNo: txtSheet.value,
            })
            .then((res) => {
              rowCount = res.data;
            });

          if (rowCount == 0) {
            setlblRemark("");
            await axios
            .post("/api/CallFPCSheetLeadTimeResult", {
              LotNo:txtlot.value, 
              PROC_ID:hfZPRNProcID,
              SHT_NO:txtSheet.value,
              MACHINE_NO:txtMCNo.value,
              PROGRAM:"frm_ScanSheetMOTTime",
              CB_NO:"",
              SUS_NO:"",
              strStatus:strStatus
            })
            .then((res) => {
              strError=res.data.strError
              strStatus=res.data.strStatus
            });
           
            setlblSheet(txtSheet.value + " " + currentTime);
            setlblRemark(strError);
            if (strStatus == "P") {
              setlblResult((prevState) => ({
                ...prevState,
                value: "OK",
                style: { color: "Green" }, 
              }));
            } else {
              setlblResult((prevState) => ({
                ...prevState,
                value: "NG",
                style: { color: "Red" },
              }));
            }
          } else {
            setlblSheet(txtSheet.value);
            setpnlSave(""); 
            /// pnlMain.Enabled = False
            setlblResult('')
            setlblRemark("Exists record time, please be confirm.");
          }
          settxtSheet((prevState) => ({ ...prevState, value: "" , focus:true}));
         
          setTimeout(() => {
            fctxtSheetNo.current.focus();
          }, 300);
        }
      } else {
        setlblResult((prevState) => ({
          ...prevState,
          value: "NG",
          style: { color: "Red" },
        }));
        setlblRemark(strError);
        settxtSheet((prevState) => ({ ...prevState, value: "" , focus:true}));
        
        setTimeout(() => {
          fctxtSheetNo.current.focus();
        }, 300);
      }
    } else {
      settxtSheet((prevState) => ({ ...prevState, value: "", focus:true }));
      
      setTimeout(() => {
        fctxtSheetNo.current.focus();
      }, 300);
    }
  };

  const txtCBNo_TextChanged = async () => {
    console.log(txtCBNo.value,'txtcbno')
    if (txtSheet != "" && txtCBNo.value != "") {
      console.log('เข้าtxtCBNo',hfCheckPrdSht)
      let strError = "";
      let strStatus = "";
      let rowCount = 0;
      setlblRemark("");
      
      setpnlSave("none");
      if (hfCheckPrdSht == "Y") {
        const sheetNo = txtSheet.value.trim().toUpperCase();
        const start = parseInt(hfCheckPrdShtStart, 10);
        const end = parseInt(hfCheckPrdShtEnd, 10);
        const extractedValue = sheetNo.substring(start, end + 1);
        if (hfCheckPrdAbbr !== extractedValue) {
          strStatus = "F";
          strError = "Sheet product mix";
        }
      }

      const connLeafLength = parseInt(hfConnLeafLength.value, 10);
      const sheetNoLength = txtSheet.value.trim().toUpperCase().length;

      if (
        connLeafLength > 0 &&
        connLeafLength !== sheetNoLength &&
        strStatus !== "F"
      ) {
        strStatus = "F";
        strError = "Invalid sheet length";
      }
      if (strStatus != "F") {
         if (txtSUSNo.visble=='') {
          
          settxtSUSNo((prevState) => ({
            ...prevState,
            disbled: false,
            value: "",
            style: { background: "" },
          }));
          
          fctxtSUSNo.current.focus();
        } else {
          await axios
            .post("/api/GetMOTRecordTimeData", {
              SheetNo: txtSheet,
            })
            .then((res) => {
              rowCount = res.data;
              console.log(res.data, "rowCount");
            });

          if (rowCount == 0) {
            setlblRemark("");
            await axios
            .post("/api/CallFPCSheetLeadTimeResult", {
              LotNo:txtlot.value, 
              PROC_ID:hfZPRNProcID,
              SHT_NO:txtSheet.value,
              MACHINE_NO:txtMCNo.value,
              PROGRAM:"frm_ScanSheetMOTTime",
              CB_NO:txtCBNo.value,
              SUS_NO:"",
              strStatus:strStatus
            })
            .then((res) => {
              strError=res.data.strError
              strStatus=res.data.strStatus
            });
           
            setlblSheet(txtSheet.value + " " + currentTime);
            setlblRemark(strError);
            if (strStatus == "P") {
              setlblResult((prevState) => ({
                ...prevState,
                value: "OK",
                style: { color: "Green" },
              }));
            } else {
              setlblResult((prevState) => ({
                ...prevState,
                value: "NG",
                style: { color: "Red" },
              }));
            }
          } else {
            setlblSheet(txtSheet.value);
            setpnlSave(""); 
            /// pnlMain.Enabled = False
            setlblResult('')
            setlblRemark("Exists record time, please be confirm.");
          }
          settxtSheet((prevState) => ({ ...prevState, value: "" }));
         
          setTimeout(() => {
            fctxtSheetNo.current.focus();
          }, 300);
        }
      } else {
        setlblResult((prevState) => ({
          ...prevState,
          value: "NG",
          style: { color: "Red" },
        }));
        setlblRemark(strError);
        settxtSheet((prevState) => ({ ...prevState, value: "" }));
      
        setTimeout(() => {
          fctxtSheetNo.current.focus();
        }, 300);
      }
    } else {
      settxtSheet((prevState) => ({ ...prevState, value: "" }));
   
      setTimeout(() => {
        fctxtSheetNo.current.focus();
      }, 300);
    }
  };

  const txtSUSNo_TextChanged = async () => {
    if (txtSheet != "" && txtCBNo != "") {
      let strError = "";
      let strStatus = "";
      let rowCount = 0;
      setlblRemark("");
      setpnlSave("none");
      if (hfCheckPrdSht == "Y") {
        const sheetNo = txtSheet.value.trim().toUpperCase();
        const start = parseInt(hfCheckPrdShtStart, 10);
        const end = parseInt(hfCheckPrdShtEnd, 10);
        const extractedValue = sheetNo.substring(start, end + 1);
        if (hfCheckPrdAbbr !== extractedValue) {
          strStatus = "F";
          strError = "Sheet product mix";
        }
      }

      const connLeafLength = parseInt(hfConnLeafLength, 10);
      const sheetNoLength = txtSheet.value.trim().toUpperCase().length;

      if (
        connLeafLength > 0 &&
        connLeafLength !== sheetNoLength &&
        strStatus !== "F"
      ) {
        strStatus = "F";
        strError = "Invalid sheet length";
      }
      if (strStatus != "F") {
       
          await axios
            .post("/api/GetMOTRecordTimeData", {
              SheetNo: txtSheet,
            })
            .then((res) => {
              rowCount = res.data;
              console.log(res.data, "rowCount");
            });

          if (rowCount == 0) {
            setlblRemark("");
            await axios
            .post("/api/CallFPCSheetLeadTimeResult", {
              LotNo:txtlot.value, 
              PROC_ID:hfZPRNProcID,
              SHT_NO:txtSheet.value,
              MACHINE_NO:txtMCNo.value,
              PROGRAM:"frm_ScanSheetMOTTime",
              CB_NO:txtCBNo.value,
              SUS_NO:txtSUSNo.value,
              strStatus:strStatus
            })
            .then((res) => {
              strError=res.data.strError
              strStatus=res.data.strStatus
            });
         
            setlblSheet(txtSheet.value + " " + currentTime);
            setlblRemark(strError);
            if (strStatus == "P") {
              setlblResult((prevState) => ({
                ...prevState,
                value: "OK",
                style: { color: "Green" },
              }));
            } else {
              setlblResult((prevState) => ({
                ...prevState,
                value: "NG",
                style: { color: "Red" },
              }));
            }
          } else {
            setlblSheet(txtSheet.value);
            setpnlSave(""); 
            /// pnlMain.Enabled = False
            setlblResult('')
            setlblRemark("Exists record time, please be confirm.");
          }
          settxtSheet((prevState) => ({ ...prevState, value: "" }));
          settxtCBNo((prevState) => ({ ...prevState, value: "" }));
          setTimeout(() => {
            fctxtSheetNo.current.focus();
          }, 300);
        
      } else {
        setlblResult((prevState) => ({
          ...prevState,
          value: "NG",
          style: { color: "Red" },
        }));
        setlblRemark(strError);
        settxtSheet((prevState) => ({ ...prevState, value: "" }));
        settxtCBNo((prevState) => ({ ...prevState, value: "" }));
        settxtSUSNo((prevState) => ({ ...prevState, value: "" }));
        setTimeout(() => {
          fctxtSheetNo.current.focus();
        }, 300);
      }
    } else {
      settxtSheet((prevState) => ({ ...prevState, value: "" }));
      settxtCBNo((prevState) => ({ ...prevState, value: "" }));
      settxtSUSNo((prevState) => ({ ...prevState, value: "" }));
      setTimeout(() => {
        fctxtSheetNo.current.focus();
      }, 300);
    }
  };

  const BtClick_back = async () => {
    settxtlot((prevState) => ({
      ...prevState,
      disbled: false,
      style: { background: "" },
    }));

    settxtMCNo((prevState) => ({
      ...prevState,
      disbled: false,
      style: { background: "" },
      value: "",
    }));

    settxtSheet((prevState) => ({
      ...prevState,
      disbled: true,
      style: { background: "#EEEEEE" },
      value: "",
    }));

    if (txtCBNo.visble=='') {
     
      settxtCBNo((prevState) => ({
        ...prevState,
        disbled: true,
        style: { background: "#EEEEEE" },
        value: "",
      }));
    }
    if (txtSUSNo.visble=='') {
     
      settxtSUSNo((prevState) => ({
        ...prevState,
        disbled: true,
        style: { background: "#EEEEEE" },
      }));
    }
   
    setTimeout(() => {
      fctxtLotno.current.focus();
    }, 300);
  };

  const BtClick_Cancel = async () => {
    setpnlSave('none')
    /// pnlMain.Enabled = True
    setlblSheet("");
    setlblRemark("");
    settxtSheet((prevState) => ({ ...prevState, value: "" }));
    setlblResult((prevState) => ({ ...prevState, value: "" }));

    if (txtCBNo.visble=='') {
      settxtCBNo((prevState) => ({
        ...prevState,
        disbled: false,
        style: { background: "" },
        value: "",
      }));
    }
    if (txtSUSNo.visble=='') {
      settxtSUSNo((prevState) => ({
        ...prevState,
        disbled: false,
        style: { background: "" },
        value: "",
      }));
    }
    setTimeout(() => {
      fctxtSheetNo.current.focus();
    }, 300);
  };

  const BtClick_Replace = async () => {
    let strError = "";
    let strStatus = "";
    console.log('lblSheet',lblSheet)
    await axios
    .post("/api/CallFPCSheetLeadTimeResult", {
      LotNo:txtlot.value, 
      PROC_ID:hfZPRNProcID,
      SHT_NO:lblSheet,
      MACHINE_NO:txtMCNo.value,
      PROGRAM:"frm_ScanSheetMOTTime",
      CB_NO:"",
      SUS_NO:"",
      strStatus:strStatus
    })
    .then((res) => {
      strError=res.data.strError
      strStatus=res.data.strStatus
    });
   
    setlblSheet(lblSheet + "Replace");
    setlblRemark(strError);
    
    setpnlSave("none");
    /// pnlMain.Enabled = True
    if (strStatus == "P") {
      setlblResult((prevState) => ({
        ...prevState,
        style: { color: "Green" },
        value: "OK",
      }));
    } else {
      setlblResult((prevState) => ({
        ...prevState,
        style: { color: "Red" },
        value: "NG",
      }));
    }
    setpnlSave("none");
    /// pnlMain.Enabled = True
    settxtSheet((prevState) => ({
      ...prevState,
      value: "",
    }));
    if (txtCBNo.visble=='') {
      settxtCBNo((prevState) => ({
        ...prevState,
        disbled: false,
        style: { background: "" },
        value: "",
      }));
    }
    if (txtSUSNo.visble=='') {
      settxtSUSNo((prevState) => ({
        ...prevState,
        disbled: false,
        style: { background: "" },
        value: "",
      }));
    }
 
    setTimeout(() => {
      fctxtSheetNo.current.focus();
    }, 300);
  };

  const BtClick_Delete = async () => {
    let strError = "";
    let strStatus = "";
    
    await axios
    .post("/api/DeleteMOTRecordTimeData", {
      data: {
        _strPlantCode:Fac,
        _strSheetNo:lblSheet,
        _strProcID:hfZPRNProcID
      },
    })
    .then((res) => {
      strError=res.data.p_error
    });
    setlblSheet(lblSheet + "Delete");
    setlblRemark(strError);
    if (strStatus == "P") {
      setlblResult((prevState) => ({
        ...prevState,
        style: { color: "Green" },
        value: "OK",
      }));
    } else {
      setlblResult((prevState) => ({
        ...prevState,
        style: { color: "Red" },
        value: "NG",
      }));
    }
    setpnlSave("none"); 

    settxtSheet((prevState) => ({
      ...prevState,
      value: "",
    }));
    if (txtCBNo.visble=='') {
    
      settxtCBNo((prevState) => ({
        ...prevState,
        disbled: false,
        style: { background: "" },
        value: "",
      }));
    }
    if (txtSUSNo.visble=='') {
   
      settxtSUSNo((prevState) => ({
        ...prevState,
        disbled: false,
        style: { background: "" },
        value: "",
      }));
    }
    
    setTimeout(() => {
      fctxtSheetNo.current.focus();
    }, 300);
  };

  return {
    txtLotNo_TextChanged,
    settxtlot,
    txtlot,
    lblProductName,
    lblResult,
    lblSheet,
    lblRemark,
    txtSheetNo_TextChanged,
    settxtSheet,
    txtSheet,
    settxtMCNo,
    txtMCNo,
    txtMCNo_TextChanged,
    fctxtMcNo,
    fctxtLotno,
    fctxtSheetNo,
    BtClick_back,
    BtClick_Cancel,
    BtClick_Delete,
    BtClick_Replace,
    txtCBNo,
    txtSUSNo,
    fctxtCBNo,
    fctxtSUSNo,
    settxtCBNo,
    settxtSUSNo,
    txtCBNo_TextChanged,
    txtSUSNo_TextChanged,
    pnlSave
  };
}

export { fn_ScanSheetMOTTime };