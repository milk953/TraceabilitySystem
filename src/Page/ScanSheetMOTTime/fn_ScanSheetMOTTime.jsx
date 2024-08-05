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
  const [lblResult, setlblResult] = useState({
    value: "",
    disbled: "",
    visble: "",
    style: {  },
  });
  const [lblSheet, setlblSheet] = useState("");
  const [lblRemark, setlblRemark] = useState("");

  //Button
  const [pnlSave, setpnlSave] = useState("");

  //hf
  const [hfCheckPrdSht, sethfCheckPrdSht] = useState("");
  const [hfCheckPrdShtStart, sethfCheckPrdShtStart] = useState("");
  const [hfCheckPrdShtEnd, sethfCheckPrdShtEnd] = useState("");
  const [hfCheckPrdAbbr, sethfCheckPrdAbbr] = useState("");
  const [hfConnLeafLength, sethfConnLeafLength] = useState("");

  //time
  const currentTime = new Date().toLocaleTimeString("en-GB", { hour12: false });

  //Focus
  let fctxtMcNo = useRef(null);
  let fctxtLotno = useRef(null);
  let fctxtSheetNo = useRef(null);
  let fctxtSUSNo = useRef(null);
  let fctxtCBNo = useRef(null);

  //link
  const params = new URLSearchParams(window.location.search);
  const CB = params.get("CB");
  const SUS = params.get("SUS");
  console.log(CB, "---", SUS);

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
    // pnlMain.Enabled = True
    // pnlSave.Visible = False
    if (CB == "Y") {
      // pnlCB.Visible = True
      // txtCBNo.Text = ""
      // txtCBNo.Enabled = False
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
    fctxtMcNo.current.focus();
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
      focus:true
    }));
    if (txtCBNo.visble) {
      //ถ้าโชว์
      settxtCBNo((prevState) => ({
        ...prevState,
        disbled: true,
        value: "",
        style: { background: "#EEEEEE" },
      }));
    }
    if (txtSUSNo.visble=='') {
      //ถ้าโชว์
      settxtSUSNo((prevState) => ({
        ...prevState,
        disbled: true,
        value: "",
        style: { background: "#EEEEEE" },
      }));
      
    }
    fctxtLotno.current.focus();
   
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
          sethfCheckPrdSht(dtProductSerial.prm_req_check_prd_sht); //PRM_REQ_CHECK_PRD_SHT
          sethfCheckPrdShtStart(dtProductSerial.prm_check_prd_sht_start); //PRM_CHECK_PRD_SHT_START
          sethfCheckPrdShtEnd(dtProductSerial.prm_check_prd_sht_end); //PRM_CHECK_PRD_SHT_END
          sethfCheckPrdAbbr(dtProductSerial.prm_abbr); //PRM_ABBR
          sethfConnLeafLength(dtProductSerial.prm_conn_leaf_length); //PRM_CONN_LEAF_LENGTH
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
          //ถ้าโชว์
          settxtCBNo((prevState) => ({
            ...prevState,
            disbled: false,
            style: { background: "" },
            value: "",
          }));
        }
        if (txtSUSNo.visble=='') {
          //ถ้าโชว์
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
        fctxtSheetNo.current.focus();
      } else {
        settxtlot((prevState) => ({ ...prevState, value: "",focus:true }));
        // txtLotNo.Focus()
        fctxtLotno.current.focus();
      }
    } else {
      settxtlot((prevState) => ({ ...prevState, value: "",focus:true }));
      // txtLotNo.Focus()
      fctxtLotno.current.focus();
    }
  };

  const txtSheetNo_TextChanged = async () => {
    console.log(txtSheet.value,'txtcbno')

  
    if (txtSheet.value != "") {
      console.log('เข้าtxtCBNo',hfCheckPrdSht)
      let strError = "";
      let strStatus = "";
      let rowCount = 0;
      setlblRemark("");
      setpnlSave("ซ่อนfalse");
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
          //ถ้าโชว์
          settxtCBNo((prevState) => ({
            ...prevState,
            disbled: false,
            style: { background: "" },
            value: "",
            focus:true
          }));
          //  txtCBNo.Focus()
          fctxtCBNo.current.focus();
        } else if (txtSUSNo.visble=='') {
          //ถ้าโชว์
          settxtSUSNo((prevState) => ({
            ...prevState,
            disbled: false,
            value: "",
            style: { background: "" },
            focus:true
          }));
          // txtSUSNo.Focus()
          fctxtSUSNo.current.focus();
        } else {
          console.log('else')
          await axios
            .post("/api/GetMOTRecordTimeData", {
              SheetNo: txtSheet.value,
            })
            .then((res) => {
              rowCount = res.data[0].row_count              ;
              console.log(res.data[0].row_count, "rowCount");
            });

          if (rowCount == 0) {
            // strError = BIZ_ScanSMTSerial.CallFPCSheetLeadTimeResult(txtLotNo.Text.Trim.ToUpper, txtSheetNo.Text.Trim.ToUpper, txtMCNo.Text.Trim.ToUpper, hfZPRNProcID.Value, "frm_ScanSheetMOTTime", "", "", strStatus)
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
            setpnlSave("โชว์มั้ยนะ"); // pnlSave.Visible = True
            // pnlMain.Enabled = False
            setlblRemark("Exists record time, please be confirm.");
          }
          settxtSheet((prevState) => ({ ...prevState, value: "" , focus:true}));
          // txtSheetNo.Focus()
          fctxtSheetNo.current.focus();
        }
      } else {
        setlblResult((prevState) => ({
          ...prevState,
          value: "NG",
          style: { color: "Red" },
        }));
        setlblRemark(strError);
        settxtSheet((prevState) => ({ ...prevState, value: "" , focus:true}));
        // txtSheetNo.Focus()
        fctxtSheetNo.current.focus();
      }
    } else {
      settxtSheet((prevState) => ({ ...prevState, value: "", focus:true }));
      // txtSheetNo.Focus()
      fctxtSheetNo.current.focus();
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
      // pnlSave.Visible = False

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
          //ถ้าโชว์
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
              rowCount = res.data[0].row_count ;
              console.log(res.data[0].row_count, "rowCount");
            });

          if (rowCount == 0) {
            // strError = BIZ_ScanSMTSerial.CallFPCSheetLeadTimeResult(txtLotNo.Text.Trim.ToUpper, txtSheetNo.Text.Trim.ToUpper, txtMCNo.Text.Trim.ToUpper, hfZPRNProcID.Value, "frm_ScanSheetMOTTime", "", "", strStatus)
            setlblSheet(txtSheet + " " + currentTime);
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
            setlblSheet(txtSheet);
            setpnlSave("โชว์มั้ยนะ"); // pnlSave.Visible = True
            // pnlMain.Enabled = False
            setlblRemark("Exists record time, please be confirm.");
          }
          settxtSheet((prevState) => ({ ...prevState, value: "" }));
          // txtSheetNo.Focus()
          fctxtSheetNo.current.focus();
        }
      } else {
        setlblResult((prevState) => ({
          ...prevState,
          value: "NG",
          style: { color: "Red" },
        }));
        setlblRemark(strError);
        settxtSheet((prevState) => ({ ...prevState, value: "" }));
        // txtSheetNo.Focus()
        fctxtSheetNo.current.focus();
      }
    } else {
      settxtSheet((prevState) => ({ ...prevState, value: "" }));
      // txtSheetNo.Focus()
      fctxtSheetNo.current.focus();
    }
  };

  const txtSUSNo_TextChanged = async () => {
    if (txtSheet != "" && txtCBNo != "") {
      let strError = "";
      let strStatus = "";
      let rowCount = 0;
      setlblRemark("");
      // pnlSave.Visible = False

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
              rowCount = res.data[0].row_count ;
              console.log(res.data[0].row_count, "rowCount");
            });

          if (rowCount == 0) {
            // strError = BIZ_ScanSMTSerial.CallFPCSheetLeadTimeResult(txtLotNo.Text.Trim.ToUpper, txtSheetNo.Text.Trim.ToUpper, txtMCNo.Text.Trim.ToUpper, hfZPRNProcID.Value, "frm_ScanSheetMOTTime", "", "", strStatus)
            setlblSheet(txtSheet + " " + currentTime);
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
            setlblSheet(txtSheet);
            setpnlSave("โชว์มั้ยนะ"); // pnlSave.Visible = True
            // pnlMain.Enabled = False
            setlblRemark("Exists record time, please be confirm.");
          }
          settxtSheet((prevState) => ({ ...prevState, value: "" }));
          // txtSheetNo.Focus()
          fctxtSheetNo.current.focus();
        
      } else {
        setlblResult((prevState) => ({
          ...prevState,
          value: "NG",
          style: { background: "Red" },
        }));
        setlblRemark(strError);
        settxtSheet((prevState) => ({ ...prevState, value: "" }));
        // txtSheetNo.Focus()
        fctxtSheetNo.current.focus();
      }
    } else {
      settxtSheet((prevState) => ({ ...prevState, value: "" }));
      // txtSheetNo.Focus()
      fctxtSheetNo.current.focus();
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
      //ถ้าโชว์
      settxtCBNo((prevState) => ({
        ...prevState,
        disbled: true,
        style: { background: "#EEEEEE" },
        value: "",
      }));
    }
    if (txtSUSNo.visble=='') {
      //ถ้าโชว์
      settxtSUSNo((prevState) => ({
        ...prevState,
        disbled: true,
        style: { background: "#EEEEEE" },
      }));
    }
    // txtLotNo.Focus()
    fctxtLotno.current.focus();
  };

  const BtClick_Cancel = async () => {
    // pnlSave.Visible = False
    // pnlMain.Enabled = True
    setlblSheet("");
    setlblRemark("");
    settxtSheet((prevState) => ({ ...prevState, value: "" }));
    setlblResult((prevState) => ({ ...prevState, value: "" }));

    if (txtCBNo.visble=='') {
      //ถ้าโชว์
      settxtCBNo((prevState) => ({
        ...prevState,
        disbled: false,
        style: { background: "" },
        value: "",
      }));
    }
    if (txtSUSNo.visble=='') {
      //ถ้าโชว์
      settxtSUSNo((prevState) => ({
        ...prevState,
        disbled: false,
        style: { background: "" },
        value: "",
      }));
    }
    // txtSheetNo.Focus()
    fctxtSheetNo.current.focus();
  };

  const BtClick_Replace = async () => {
    let strError = "";
    let strStatus = "";
    // strError = BIZ_ScanSMTSerial.CallFPCSheetLeadTimeResult(txtLotNo.Text.Trim.ToUpper, lblSheet.Text.Trim.ToUpper, txtMCNo.Text.Trim.ToUpper, hfZPRNProcID.Value, "frm_ScanSheetMOTTime", "", "", strStatus)
    setlblSheet(lblSheet + "Replace");
    setlblRemark(strError);
    // pnlSave.Visible = False
    // pnlMain.Enabled = True
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
    // pnlSave.Visible = False
    // pnlMain.Enabled = True
    settxtSheet((prevState) => ({
      ...prevState,
      value: "",
    }));
    if (txtCBNo.visble=='') {
      //ถ้าโชว์
      settxtCBNo((prevState) => ({
        ...prevState,
        disbled: false,
        style: { background: "" },
        value: "",
      }));
    }
    if (txtSUSNo.visble=='') {
      //ถ้าโชว์
      settxtSUSNo((prevState) => ({
        ...prevState,
        disbled: false,
        style: { background: "" },
        value: "",
      }));
    }
    // txtSheetNo.Focus()
    fctxtSheetNo.current.focus();
  };

  const BtClick_Delete = async () => {
    let strError = "";
    let strStatus = "";
    // strError = BIZ_ScanSMTSerial.DeleteMOTRecordTimeData(Session("PLANT_CODE"), lblSheet.Text.Trim.ToUpper, hfZPRNProcID.Value, Session("PRODUCT_KIND"))
    setlblSheet(lblSheet + "Delete");
    setlblRemark(strError);
    if (strStatus == "P") {
      setlblResult((prevState) => ({
        ...prevState,
        style: { background: "Green" },
        value: "OK",
      }));
    } else {
      setlblResult((prevState) => ({
        ...prevState,
        style: { background: "Red" },
        value: "NG",
      }));
    }
    // pnlSave.Visible = False
    // pnlMain.Enabled = True
    settxtSheet((prevState) => ({
      ...prevState,
      value: "",
    }));
    if (txtCBNo.visble=='') {
      //ถ้าโชว์
      settxtCBNo((prevState) => ({
        ...prevState,
        disbled: false,
        style: { background: "" },
        value: "",
      }));
    }
    if (txtSUSNo.visble=='') {
      //ถ้าโชว์
      settxtSUSNo((prevState) => ({
        ...prevState,
        disbled: false,
        style: { background: "" },
        value: "",
      }));
    }
    // txtSheetNo.Focus()
    fctxtSheetNo.current.focus();
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
    txtSUSNo_TextChanged
  };
}

export { fn_ScanSheetMOTTime };
