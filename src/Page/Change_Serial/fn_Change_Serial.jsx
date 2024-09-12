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
    value: "1",
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
  const plantCode = import.meta.env.VITE_FAC;

  useEffect(() => {
    const fetchData = async () => {
      await getInitialSerial();
    };
    fetchData();
  }, []);

  const txtTotalPcs_TextChanged = async () => {
    await getInitialSerial();
  };

  const BtnSubmit_Click = async () => {
    console.log("เข้ามาละ BtnSubmit_Click");
    let dt = [];
    let CheckerHeaderFlg = false;
    let CheckerHeaderFlg3 = false;
    let TouchUpCnt = 0;
    let RejectCnt = 0;
    let FinalGateCnt = 0;
    let strError = "";
    let strOldSerial = "";
    let strNewSerial = "";
    let CheckerOldSerialShtFlg = true;
    let dtData = [];
    dtData = await getInputSerial(strError);
    console.log("ได้ค่า  dtData ของ getInputSerial", dtData);
    if (strError.trim !== "") {
      setLblResult((prevState) => ({
        ...prevState,
        value: strError,
        style: { color: "red" },
      }));
    }

    try {
      console.log("เข้ามาใน try one");
      // for (let i = 0; i < dtData.length; i++) {
      //   console.log("เข้ามาใน Loop one");
      //   const drRow = dtData[i];
      //   strOldSerial = drRow.SERIAL_OLD;
      //   strNewSerial = drRow.SERIAL_NEW;
      //   const res = await axios.post("/api/GetserialnoChangserial", {
      //     strplant_code: plantCode,
      //     strnewserial: strNewSerial,
      //   });
      //   console.log(res.data, "res.data");
      //   if (res.data.length == 0)
      //     setLblResult((prevState) => ({
      //       ...prevState,
      //       value: "NEW SERIAL NO not Exists in SMT_SERIAL_NO.",
      //       style: { color: "red" },
      //     }));
      // }

      // for (const drRow of dtData) {
      //   const strOldSerial = drRow.SERIAL_OLD;
      //   const strNewSerial = drRow.SERIAL_NEW;
      //   const res = await axios.post("/api/", {
      //     strplant_code: plantCode,
      //     stroldserial: strOldSerial,
      //   });
      //   setLblResult((prevState) => ({
      //     ...prevState,
      //     value: res.data,
      //     style: { color: "red" },
      //   }));
      // }
    } catch (ex) {
      console.log("Error ครับผม");
    }
  };

  const getInitialSerial = async () => {
    console.log("เข้ามาละ getInitialSerial");
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
    console.log("เข้ามาละ getInputSerial");
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

  return { txtTotalPcs, txtTotalPcs_TextChanged, BtnSubmit_Click };
}

export { fn_Change_Serial };
