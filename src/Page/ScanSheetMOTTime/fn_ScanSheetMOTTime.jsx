import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { TableSortLabel } from "@mui/material";

function fn_ScanSheetMOTTime() {
  const [txtlot, settxtlot] = useState("");
  const [txtSheet, settxtSheet] = useState("");
  const [lblProductName, setlblProductName] = useState("");
  const [lblResult, setlblResult] = useState("");
  const [lblSheet, setlblSheet] = useState("");
  const [lblRemark, setlblRemark] = useState("");
  const [ClassnamelblResult, setClassnamelblResult] = useState("");
  const [txtMCNo, settxtMCNo] = useState("");

  const [EnableMCNo, setEnableMCNo] = useState("");
  const [EnableLotNo, setEnableLotNo] = useState("");
  const [EnableSheetNo, setEnableSheetNo] = useState("");

  const [hfCheckPrdSht, sethfCheckPrdSht] = useState("");
  const [hfCheckPrdShtStart, sethfCheckPrdShtStart] = useState("");
  const [hfCheckPrdShtEnd, sethfCheckPrdShtEnd] = useState("");
  const [hfCheckPrdAbbr, sethfCheckPrdAbbr] = useState("");
  const [hfConnLeafLength, sethfConnLeafLength] = useState("");
  const currentTime = new Date().toLocaleTimeString("en-GB", { hour12: false });
  // console.log(currentTime)
  const fctxtMcNo = useRef(null);
  const fctxtLotno = useRef(null);
  const fctxtSheetNo = useRef(null);
  useEffect(() => {
    settxtMCNo("");
    settxtlot("");
    settxtSheet("");
    setlblRemark("");
    setlblResult("");
    setlblSheet("");
    setEnableMCNo(false);
    setEnableLotNo(true);
    setEnableSheetNo(true);
    // pnlMain.Enabled = True
    // pnlSave.Visible = False

    fctxtMcNo.current.focus();
  }, []);

  const txtLotNo_TextChanged = () => {
    setlblProductName("");
    setlblRemark("");
    setlblResult("");
    setlblSheet("");

    if (txtlot != "") {
      const strLotData = txtlot.toUpperCase().split(";");
      let strLot = strLotData[0];
      axios
        .post("/api/GetProductNameByLot", {
          LotNo: strLot,
        })
        .then((res) => {
          let data = res.data[0][0];
          console.log(data, "lotnoooo");
          if (res.data.length > 0) {
            setlblProductName(data);
            axios
              .post("/api/GetSerialProductByProduct", {
                strPrdName: data,
              })
              .then((res) => {
                if (res.data.length > 0) {
                  sethfCheckPrdSht(res.data[0].PRM_REQ_CHECK_PRD_SHT);
                  sethfCheckPrdShtStart(res.data[0].PRM_CHECK_PRD_SHT_START);
                  sethfCheckPrdShtEnd(res.data[0].PRM_CHECK_PRD_SHT_END);
                  sethfCheckPrdAbbr(res.data[0].PRM_ABBR);
                  sethfConnLeafLength(res.data[0].PRM_CONN_LEAF_LENGTH);
                }
              });
            settxtlot(strLot);

            // setEnableMCNo(true);
            // setEnableLotNo(true);
            setEnableSheetNo(false);
            fctxtSheetNo.current.focus();
          } else {
            settxtlot("");
            fctxtSheetNo.current.focus();
          }
        });
    }
    settxtlot("");
    fctxtSheetNo.current.focus();
  };
  const txtSheetNo_TextChanged = () => {
    let strStatus = "";
    let strError = "";
    let rowCount = "";
    if (txtSheet != "") {
      setlblRemark("");
      //  sethfCheckPrdSht('Y')
      // pnlSave.Visible = False
      console.log(hfCheckPrdSht, "hfCheckPrdSht");
      if (hfCheckPrdSht == "Y") {
        const start = parseInt(hfCheckPrdShtStart);
        console.log("ค่า1hfCheckPrdShtStart", hfCheckPrdShtStart);
        const end = parseInt(hfCheckPrdShtEnd);
        console.log("ค่า2hfCheckPrdShtEnd", hfCheckPrdShtEnd);
        const substring = txtSheet.toUpperCase().substring(start, end + 1);
        console.log("ค่า3", substring);
        if (hfCheckPrdAbbr !== substring) {
          strStatus = "Y";
          strError = "Sheet product mix";
          console.log("ค่าไม่ตรงกัน", hfCheckPrdAbbr, " ", substring);
        }
      }

      const leafLength = parseInt(hfConnLeafLength);
      const inputLength = txtSheet.toUpperCase().length;
      if (leafLength > 0 && leafLength !== inputLength && strStatus !== "F") {
        console.log("เงื่อนไขเป็นจริง");
        strStatus = "F";
        strError = "Invalid sheet length";
      }
      console.log("strStatus", strStatus);
      if (strStatus != "F") {
        console.log("เข้า");
        axios
          .post("/api/GetMOTRecordTimeData", {
            SheetNo: txtSheet,
          })
          .then((res) => {
            rowCount = res.data.flat();
            console.log(rowCount,'rowCount')
          });
        if (rowCount = 0) {
          axios.post("/api/CallFPCSheetLeadTimeResult", {
              txtLotNo: txtlot,
              txtSheetNo: txtSheet,
              txtMCNo: txtMCNo,
            })
            .then((res) => {
            let data = res.data
            for(let i =0;i<data.length;i++){
              if(i==0){
                strStatus=data[i].P_STATUS

              }
            }
              // if(res.data.length=0){

              // }
              // console.log("CallFPCSheetLeadTimeResult", res.data);
              //มีทำต่อ แต่ว่าทำไรรร
            });
          setlblSheet(txtSheet + " " + currentTime);
          setlblRemark(strError);
          if (strStatus == "P") {
            setlblResult("OK");
            //     lblResult.ForeColor = Drawing.Color.Green
          } else {
            setlblResult("NG");
            //     lblResult.ForeColor = Drawing.Color.Red
          }
        } else {
          setlblSheet(txtSheet);
          setlblRemark("Exists record time, please be confirm.");
        }
        settxtSheet("");
      } else {
        setlblResult("NG");
        setClassnamelblResult("Style-NG");
        setlblRemark(strError);
        // lblResult.ForeColor = Drawing.Color.Red
      }
    }
    settxtSheet("");
  };
  const txtMCNo_TextChanged = async () => {
    // settxtMCNo(e.target.value)
    console.log("keyyyyy");
    // if(e.key=="Enter"){
    settxtSheet("");
    setEnableLotNo(false);
    fctxtLotno.current.focus();
    x; // }
  };

  const BtClick_back = async () => {
    // txtMCNo.Enabled = True
    // txtLotNo.Enabled = True
    // txtSheetNo.Enabled = False
    // txtLotNo.Text = ""
    // txtSheetNo.Text = ""
    // txtLotNo.Focus()
  };

  const BtClick_Cancel = async () => {
    settxtSheet("");
    settxtlot("");
    setEnableMCNo(false);
    setEnableLotNo(false);
    setEnableSheetNo(true);
    fctxtLotno.current.focus();
  };

  const BtClick_Replace = async () => {
    // Dim strError As String = ""
    // Dim strStatus As String = ""
    // strError = BIZ_ScanSMTSerial.CallFPCSheetLeadTimeResult(txtLotNo.Text.Trim.ToUpper, lblSheet.Text.Trim.ToUpper, txtMCNo.Text.Trim.ToUpper, hfZPRNProcID.Value, "frm_ScanSheetMOTTime", strStatus)
    // lblSheet.Text = lblSheet.Text.Trim.ToUpper + " Replace"
    // lblRemark.Text = strError
    // If strStatus = "P" Then
    //     lblResult.Text = "OK"
    //     lblResult.ForeColor = Drawing.Color.Green
    // Else
    //     lblResult.Text = "NG"
    //     lblResult.ForeColor = Drawing.Color.Red
    // End If
    // pnlSave.Visible = False
    // pnlMain.Enabled = True
    // txtSheetNo.Text = ""
    // txtSheetNo.Focus()
  };

  const BtClick_Delete = async () => {
    // Dim strError As String = ""
    //     Dim strStatus As String = ""
    //     strError = BIZ_ScanSMTSerial.DeleteMOTRecordTimeData(Session("PLANT_CODE"), lblSheet.Text.Trim.ToUpper, hfZPRNProcID.Value, Session("PRODUCT_KIND"))
    //     lblSheet.Text = lblSheet.Text.Trim.ToUpper + " Delete"
    //     lblRemark.Text = strError
    //     If strStatus = "P" Then
    //         lblResult.Text = "OK"
    //         lblResult.ForeColor = Drawing.Color.Green
    //     Else
    //         lblResult.Text = "NG"
    //         lblResult.ForeColor = Drawing.Color.Red
    //     End If
    //     pnlSave.Visible = False
    //     pnlMain.Enabled = True
    //     txtSheetNo.Text = ""
    //     txtSheetNo.Focus()
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
    EnableLotNo,
    EnableMCNo,
    EnableSheetNo,
    BtClick_back,
    BtClick_Cancel,
    BtClick_Delete,
    BtClick_Replace,
  };
}

export { fn_ScanSheetMOTTime };
