import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Tag } from "antd";
function fn_Change_Serial() {
  const [lblResult, setLblResult] = useState({
    value: "",
    disbled: "",
    visble: false,
    style: {},
  });
  const [txtTotalPcs, setTxtTotalPcs] = useState({
    value: "",
    disbled: "",
    visble: false,
    style: {},
  });
  const [gvSerial, setGvSerial] = useState({
    value: [],
    disbled: "",
    visble: false,
    style: {},
  });
  const [gvNewSerial, setGvNewSerial] = useState({
    value: [],
    disbled: "",
    visble: false,
    style: {},
  });

  const [txtSerialNo, setTxtSerialNo] = useState("");
  const [hfSerialCount, setHfSerialCount] = useState("");

  useEffect(() => {}, []);

  const txtTotalPcs_TextChanged = async () => {
    await getInitialSerial();
  };

  const BtnSubmit_Click = async () => {
    let dt = [];
    let CheckerHeaderFlg = False;
    let CheckerHeaderFlg3 = False;
    let TouchUpCnt = 0;
    let RejectCnt = 0;
    let FinalGateCnt = 0;
    let strError = "";
    let strOldSerial = "";
    let strNewSerial = "";
    let CheckerOldSerialShtFlg = True;
    let dtData = [];
    dtData = await getInputSerial(strError);
    if (strError.trim !== "") {
      setLblResult((prevState) => ({
        ...prevState,
        value: strError,
        style: { color: "red" },
      }));
    }

    try {
      for (const drRow of dtData) {
        const strOldSerial = drRow.SERIAL_OLD;
        const strNewSerial = drRow.SERIAL_NEW;
      }
    } catch (ex) {}
  };

  const getInitialSerial = async () => {
    let dtData = [];
    for (let intRow = 1; intRow <= parseInt(txtTotalPcs.value); intRow++) {
      dtData.push({ SEQ: intRow });
    }
    setGvSerial((prevState) => ({ ...prevState, value: dtData, visble: true }));
    setGvNewSerial((prevState) => ({
      ...prevState,
      value: dtData,
      visble: true,
    }));
    setHfSerialCount(txtTotalPcs.value);
    if (gvSerial.value.length > 0) {
      fnSetFocus("gvSerial_txtSerialNo_0");
    }

    return 0;
  };

  const getInputSerial = async (strError) => {
    let dtData = [];
    let intRow = 0;
    let strFrontSide = "";
    for (let intSeq = 0; intSeq < gvSerial.value.length; intSeq++) {
      const serialGV = txtSerialNo[intSeq];
      const serialNEW = txtSerialNo[intSeq];
      const drRow = {
        SEQ: gvSerial.value[intSeq].seq,
        SERIAL_OLD: serialGV,
        SERIAL_NEW: serialNEW,
        SHEET_FLG: "N",
        TOUCHUP_FLG: "N",
        REJECT_FLG: "N",
        CHECKER1_FLG: "N",
        CHECKER3_FLG: "N",
        FINALGATE_FLG: "N",
      };
      if ((drRow.SERIAL_OLD = "")) {
        strError = `${intSeq + 1} Please input Old Serial Number.`;
        // return [];
      }
      if ((drRow.SERIAL_NEW = "")) {
        strError = `${intSeq + 1} Please input New Serial Number.`;
        // return [];
      }
      dtData.push(drRow);
    }
    return dtData;
  };

  function fnSetFocus(txtField) {
    setTimeout(() => {
      document.getElementById(`${txtField}`).focus();
    }, 300);
  }

  return {};
}

export { fn_Change_Serial };
