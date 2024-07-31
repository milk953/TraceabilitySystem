import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { TableSortLabel } from "@mui/material";

function fn_ScanSheetMOTTime() {

  //txt
  const [txtlot, settxtlot] = useState({
    value: "",
    disbled: "",
    visble: "",
    style: {},
  });
  const [txtSheet, settxtSheet] = useState({
    value: "",
    disbled: "",
    visble: "",
    style: {},
  });
  const [txtMCNo, settxtMCNo] = useState({
    value: "",
    disbled: "",
    visble: "",
    style: {},
  });
  const [txtCBNo, settxtCBNo] = useState({
    value: "",
    disbled: "",
    visble: "",
    style: {},
  });
  const [txtSUSNo, settxtSUSNo] = useState({
    value: "",
    disbled: "",
    visble: "",
    style: {},
  });

  //lbl
  const [lblProductName, setlblProductName] = useState("");
  const [lblResult, setlblResult] = useState({
    value: "",
    disbled: "",
    visble: "",
    style: {},
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
  const fctxtMcNo = useRef(null);
  const fctxtLotno = useRef(null);
  const fctxtSheetNo = useRef(null);

  useEffect(() => {}, []);
  // setgvScanResult((prevState) =>({...prevState,visble:false}));
  const txtLotNo_TextChanged = async () => {
    setlblProductName("");
    setlblRemark("");
    setlblResult((prevState) =>({...prevState,value:''}));
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
          _strPrdName = res.data.prdName[0];
        });
      if (_strPrdName != "") {
        setlblProductName(_strPrdName);
        await axios
          .post("/api/common/GetSerialProductByProduct", {
            prdName: _strPrdName,
          })
          .then((res) => {
            dtProductSerial = res.data[0];
          });
        if (dtProductSerial != null) {
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
          disbled: true,
          style: { background: "#EEEEEE" },
          value: "",
        }));
        if (txtCBNo.visble) {
          //ถ้าโชว์
          settxtCBNo((prevState) => ({
            ...prevState,
            disbled: false,
            style: { background: "" },
            value: "",
          }));
        }
        if (txtSUSNo.visble) {
          //ถ้าโชว์
          settxtSUSNo((prevState) => ({
            ...prevState,
            disbled: false,
            style: { background: "" },
          }));
        }
      } else {
        settxtlot((prevState) => ({ ...prevState, value: "" }));
        // txtLotNo.Focus()
      }
    } else {
      settxtlot((prevState) => ({ ...prevState, value: "" }));
      // txtLotNo.Focus()
    }
  };

  const txtSheetNo_TextChanged = async () => {
    if (txtSheet.value != "") {
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
      const sheetLength = txtSheet.trim().toUpperCase().length;
      if (
        connLeafLength > 0 &&
        connLeafLength !== sheetLength &&
        strStatus !== "F"
      ) {
        strStatus = "F";
        strError = "Invalid sheet length";
      }
      if (strStatus != "F") {
        if (txtCBNo.visble) {
          //ถ้าโชว์
          settxtCBNo((prevState) => ({
            ...prevState,
            disbled: false,
            style: { background: "" },
            value: "",
          }));
          //  txtCBNo.Focus()
        } else if (txtSUSNo.visble) {
          //ถ้าโชว์
          settxtSUSNo((prevState) => ({
            ...prevState,
            disbled: false,
            value: "",
            style: { background: "" },
          }));
          // txtSUSNo.Focus()
        } else {
          await axios
            .post("/api/GetMOTRecordTimeData", {
              SheetNo: txtSheet,
            })
            .then((res) => {
              rowCount = res.data.flat();
              console.log(rowCount, "rowCount");
            });

            if(rowCount==0){
              // strError = BIZ_ScanSMTSerial.CallFPCSheetLeadTimeResult(txtLotNo.Text.Trim.ToUpper, txtSheetNo.Text.Trim.ToUpper, txtMCNo.Text.Trim.ToUpper, hfZPRNProcID.Value, "frm_ScanSheetMOTTime", "", "", strStatus)
              setlblSheet(txtSheet + " " + currentTime);
              setlblRemark(strError)
              if(strStatus=='P'){
                setlblResult((prevState) =>({...prevState,value:'OK',style:{background:'Green'}}));
              }else{
                setlblResult((prevState) =>({...prevState,value:'NG',style:{background:'Red'}}));
              }
            }
            else{
              setlblSheet(txtSheet)
              setpnlSave('โชว์มั้ยนะ') // pnlSave.Visible = True
              // pnlMain.Enabled = False
              setlblRemark("Exists record time, please be confirm.")
            }
            settxtSheet((prevState) =>({...prevState,value:''}));
            // txtSheetNo.Focus()
        }
      }
      else{
        setlblResult((prevState) =>({...prevState,value:'NG',style:{background:'Red'}}));
        setlblRemark(strError)
        settxtSheet((prevState) =>({...prevState,value:''}));
        // txtSheetNo.Focus()
      }
    }
    else{
      settxtSheet((prevState) =>({...prevState,value:''}));
      // txtSheetNo.Focus()
    }

  };

  const txtMCNo_TextChanged = async () => {
    settxtSheet((prevState) => ({ ...prevState, value: "", disbled: true }));
    settxtlot((prevState) => ({
      ...prevState,
      disbled: false,
      style: { background: "" },
    }));
    if (txtCBNo.visble) {
      //ถ้าโชว์
      settxtCBNo((prevState) => ({
        ...prevState,
        disbled: true,
        value: "",
      }));
    }
    if (txtSUSNo.visble) {
      //ถ้าโชว์
      settxtSUSNo((prevState) => ({
        ...prevState,
        disbled: true,
        value: "",
      }));
    }
    // txtLotNo.Focus()
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
      value:''
    }));

    settxtSheet((prevState) => ({
      ...prevState,
      disbled: true,
      style: { background: "#EEEEEE" },
      value:''
    }));

    if (txtCBNo.visble) {
      //ถ้าโชว์
      settxtCBNo((prevState) => ({
        ...prevState,
        disbled: true,
        style: { background: "#EEEEEE" },
        value: "",
      }));
    }
    if (txtSUSNo.visble) {
      //ถ้าโชว์
      settxtSUSNo((prevState) => ({
        ...prevState,
        disbled: true,
        style: { background: "#EEEEEE" },
      }));
    }
    // txtLotNo.Focus() 
  };

  const BtClick_Cancel = async () => {
    // pnlSave.Visible = False
    // pnlMain.Enabled = True
    // lblSheet.Text = ""
    // lblRemark.Text = ""
    // txtSheetNo.Text = ""
    // lblResult.Text = ""
    // If pnlCB.Visible Then
    //     txtCBNo.Enabled = True
    //     txtCBNo.Text = ""
    // End If
    // If pnlSUS.Visible Then
    //     txtSUSNo.Enabled = True
    //     txtSUSNo.Text = ""
    // End If
    // txtSheetNo.Focus()

  };

  const BtClick_Replace = async () => {
    // let strError = ""
    // let strStatus = ""
    // axios.post("/api/CallFPCSheetLeadTimeResult", {
    //   txtLotNo: txtlot,
    //   txtSheetNo: txtSheet,
    //   txtMCNo: txtMCNo,
    // })
    // .then((res) => {
    // })
  };

  const BtClick_Delete = async () => {};

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
  };
}

export { fn_ScanSheetMOTTime };
