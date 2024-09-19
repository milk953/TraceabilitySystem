import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function fn_ScanSheetAOIXrayConfirm() {
  const [txtSheetNo, settxtSheetNo] = useState("");
  const [lblResult, setlblResult] = useState("");
  const [lblSheet, setlblSheet] = useState("");
  const [lblRemark, setlblRemark] = useState("");
  const fc_txtSheet = useRef([]);

  const Fac = import.meta.env.VITE_FAC;
  const currentTime = new Date().toLocaleTimeString("en-GB", { hour12: false });

  useEffect(() => {
    settxtSheetNo("");
    setlblResult("");
    setlblSheet("");
    setlblRemark("");
    setTimeout(() => {
        fc_txtSheet.current.focus();
      }, 300);
  }, []);

  const txtSheetNo_TextChanged = async () => {
    if (txtSheetNo != "") {
      let strResult = "";
      let strAOI = "";
      let strXray = "";
      await axios
        .post("/api/AOIConfirmResult/GetSheetAOIXRayResult", {
          Plant_Code: Fac,
          strSheetNo: txtSheetNo,
        })
        .then((res) => {
          let data = res.data[0];
          
          if (res.data.length > 0) {
            strAOI = data.aoi_result            ;
            strXray = data.xray_result;
            strResult = data.scan_result;
          }
        });
      setlblSheet(txtSheetNo + " " + currentTime);
      console.log(strResult,'data')
      setlblResult(strResult);
      setlblRemark("AOI : " + strAOI + " X-Ray : " + strXray);
      settxtSheetNo("");
      setTimeout(() => {
        fc_txtSheet.current.focus();
      }, 300);
    }
    settxtSheetNo("");
    setTimeout(() => {
        fc_txtSheet.current.focus();
      }, 300);
  };

  return {
    settxtSheetNo,
    txtSheetNo,
    lblResult,
    lblSheet,
    lblRemark,
    fc_txtSheet,
    txtSheetNo_TextChanged,
  };
}

export { fn_ScanSheetAOIXrayConfirm };
