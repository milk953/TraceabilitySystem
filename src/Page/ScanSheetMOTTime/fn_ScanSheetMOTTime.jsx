import React, { useState, useEffect } from "react";
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

  const [hfCheckPrdSht, sethfCheckPrdSht] = useState("");
  const [hfCheckPrdShtStart, sethfCheckPrdShtStart] = useState("");
  const [hfCheckPrdShtEnd, sethfCheckPrdShtEnd] = useState("");
  const [hfCheckPrdAbbr, sethfCheckPrdAbbr] = useState("");
  const [hfConnLeafLength, sethfConnLeafLength] = useState("");
  const currentTime = new Date().toLocaleTimeString("en-GB", { hour12: false });
  useEffect(() => {}, []);

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
          } else {
            settxtlot("");
          }
        });
    }
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
          strStatus = "F";
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
          });
        if (rowCount != 0) {
          // strError = BIZ_ScanSMTSerial.CallFPCSheetLeadTimeResult(txtLotNo.Text.Trim.ToUpper, txtSheetNo.Text.Trim.ToUpper, txtMCNo.Text.Trim.ToUpper, hfZPRNProcID.Value, "frm_ScanSheetMOTTime", strStatus)
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
  };
}

export { fn_ScanSheetMOTTime };
