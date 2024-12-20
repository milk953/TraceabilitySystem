import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { DataConfig } from "../Common/function_Common";
function fn_ScanSheetAOIXrayConfirm() {
  const { ConfigData } = DataConfig();
  console.log(ConfigData, "ConfigData");
  const [txtSheetNo, settxtSheetNo] = useState("");
  const [lblResult, setlblResult] = useState("");
  const [lblSheet, setlblSheet] = useState("");
  const [lblRemark, setlblRemark] = useState("");
  const fc_txtSheet = useRef([]);

  const Fac = ConfigData.FACTORY;
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
          console.log(data, "data");
          if (res.data.length > 0) {
            strAOI = data.aoi_result;
            strXray = data.xray_result;
            strResult = data.scan_result;
          }
        });
      setlblSheet(txtSheetNo + " " + currentTime);

      setlblResult(strResult);
      setlblRemark("AOI : " + strAOI + " &nbsp;&nbsp; X-Ray : " + strXray);
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

  const ibt_back = async () => {
    settxtSheetNo("");
    setlblResult("");
    setlblSheet("");
    setlblRemark("");
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
    ibt_back,
  };
}

export { fn_ScanSheetAOIXrayConfirm };
