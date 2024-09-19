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

  const [txtSerialNoOld, setTxtSerialNoOld] = useState("");
  const [txtSerialNoNew, setTxtSerialNoNew] = useState("");
  const [hfSerialCount, setHfSerialCount] = useState("");
  const plantCode = import.meta.env.VITE_FAC;
  const IP = localStorage.getItem("ipAddress");

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
    Swal.fire({
      title: "Are you confirm submit?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Confirm",
      denyButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
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
        let Out1 = 0;
        let Out2 = 0;
        let Out3 = 0;
        let Out4 = 0;
        const Result = await getInputSerial();
        dtData = Result.dtData;
        strError = Result.strError;
        if (strError.trim !== "") {
          setLblResult((prevState) => ({
            ...prevState,
            value: strError,
            style: "red",
          }));
        }

        try {
          console.log("เข้ามาใน try one");
          for (let i = 0; i < dtData.length; i++) {
            console.log("เข้ามาใน Loop one");
            const drRow = dtData[i];
            strOldSerial = drRow.SERIAL_OLD;
            strNewSerial = drRow.SERIAL_NEW;
            await axios
              .post("/api/GetserialnoChangserial", {
                dataList: {
                  strplant_code: plantCode,
                  strnewserial: strNewSerial,
                },
              })
              .then((res) => {
                console.log("GetserialnoChangserial", res.data.length);
                Out1 = res.data.length;
                if (res.data.length > 0) {
                  setLblResult((prevState) => ({
                    ...prevState,
                    value: res.data[0].trc_028_changserial_getserialno,
                    style: "red",
                  }));
                }
              });
            if (Out1 > 0) {
              return;
            }
          }

          for (let i = 0; i < dtData.length; i++) {
            const drRow = dtData[i];
            strOldSerial = drRow.SERIAL_OLD;
            strNewSerial = drRow.SERIAL_NEW;
            console.log("เข้ามาใน Loop two", strNewSerial);
            await axios
              .post("/api/GetserialnoChangserialoldnew", {
                dataList: {
                  strplant_code: plantCode,
                  stroldserial: strOldSerial,
                  strnewserial: strNewSerial,
                },
              })
              .then((res) => {
                console.log(
                  "GetserialnoChangserialoldnew",
                  res.data[0].response,
                  res.data[0].p_lblresult.length
                );
                Out2 = res.data[0].p_lblresult.length
                if (res.data[0].p_lblresult.length > 0) {
                  setLblResult((prevState) => ({
                    ...prevState,
                    value: res.data[0].p_lblresult,
                    style: "red",
                  }));
                  return;
                }
                if (
                  res.data[0].response !== "" ||
                  res.data[0].response !== null
                ) {
                  setLblResult((prevState) => ({
                    ...prevState,
                    value: res.data[0].response.lblresult,
                    style: "red",
                  }));
                  if (res.data[0].response.sheet_flg !== null) {
                    drRow.SHEET_FLG = res.data[0].response.sheet_flg;
                  }

                  if (res.data[0].response.touchupcnt !== null) {
                    TouchUpCnt = res.data[0].response.touchupcnt;
                  }

                  if (res.data[0].response.touchup_flg !== null) {
                    drRow.TOUCHUP_FLG = res.data[0].response.touchup_flg;
                  }

                  if (res.data[0].response.rejectcnt !== null) {
                    RejectCnt = res.data[0].response.rejectcnt;
                  }

                  if (res.data[0].response.reject_flg !== null) {
                    drRow.REJECT_FLG = res.data[0].response.reject_flg;
                  }

                  if (res.data[0].response.checkerheaderflg !== null) {
                    CheckerHeaderFlg = res.data[0].response.checkerheaderflg;
                  }

                  if (res.data[0].response.checker_flg !== null) {
                    drRow.CHECKER1_FLG = res.data[0].response.checker_flg;
                  }

                  if (res.data[0].response.finalgatecnt !== null) {
                    FinalGateCnt = res.data[0].response.finalgatecnt;
                  }

                  if (res.data[0].response.finalgate_flg !== null) {
                    drRow.FINALGATE_FLG = res.data[0].response.finalgate_flg;
                  }
                }
              });
              if (Out2 > 0) {
                return
              }
          }
          for (let i = 0; i < dtData.length; i++) {
            const drRow = dtData[i];
            strOldSerial = drRow.SERIAL_OLD;
            strNewSerial = drRow.SERIAL_NEW;
            console.log("เข้ามาใน Loop three", strNewSerial);
            await axios
              .post("/api/SetserialnoChangserial", {
                dataList: {
                  strplant_code: plantCode,
                  stroldserial: strOldSerial,
                  strnewserial: strNewSerial,
                  ip_address: IP,
                  touchupcnt: TouchUpCnt,
                  rejectcnt: RejectCnt,
                  strsheet_flg: drRow.SHEET_FLG,
                  strtouchup_flg: drRow.TOUCHUP_FLG,
                  strreject_flg: drRow.REJECT_FLG,
                  strchecker_flg: drRow.CHECKER1_FLG,
                  strfinalgate_flg: drRow.FINALGATE_FLG,
                },
              })
              .then((res) => {
                console.log(
                  "insert_and_update_smt_change_serial_hist",
                  res.data
                );
              });
          }
        } catch (ex) {
          console.log("Error ครับผม");
          strError = ex.message;
          setLblResult((prevState) => ({
            ...prevState,
            value: strError,
            style: "red",
          }));
        }
        if (strError.trim() === "") {
          setLblResult((prevState) => ({
            ...prevState,
            value: `${prevState.value} Change Serial Successed`.replace(
              /\n/g,
              "<br />"
            ),
            style: "blue",
          }));

          await getInitialSerial();
        }
      } else if (result.isDenied) {
        return;
      }
    });
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
    console.log("gvSerial.value.length", dtData.length);
    if (dtData.length > 0) {
      console.log("เข้ามาใน Focus");
      fnSetFocus("gvSerial_txtSerialNo_0");
    }

    return 0;
  };

  const getInputSerial = async () => {
    console.log("เข้ามาละ getInputSerial", gvSerial.value);
    let dtData = [];
    let intRow = 0;
    let strFrontSide = "";
    let strError = "";
    for (let intSeq = 0; intSeq < gvSerial.value.length; intSeq++) {
      const serialGV = txtSerialNoOld[intSeq] || "";
      const serialNEW = txtSerialNoNew[intSeq] || "";
      const drRow = {
        SEQ: gvSerial.value[intSeq].SEQ,
        SERIAL_OLD: serialGV,
        SERIAL_NEW: serialNEW,
        SHEET_FLG: "N",
        TOUCHUP_FLG: "N",
        REJECT_FLG: "N",
        CHECKER1_FLG: "N",
        FINALGATE_FLG: "N",
      };
      console.log("เข้ามาละ getInputSerial drRow", drRow.SERIAL_OLD);
      if (drRow.SERIAL_OLD == "") {
        console.log("เข้ามาละ getInputSerial drRow.SERIAL_OLD");
        strError = `${intSeq + 1} Please input Old Serial Number.`;
        break;
      }
      if (drRow.SERIAL_NEW == "") {
        console.log("เข้ามาละ getInputSerial drRow.SERIAL_NEW");
        strError = `${intSeq + 1} Please input New Serial Number.`;
        break;
      }
      dtData.push(drRow);
    }
    return { dtData, strError };
  };

  const handleSerialOldChange = async (index, event) => {
    const newValues = [...txtSerialNoOld];
    newValues[index] = event.target.value;
    setTxtSerialNoOld(newValues);
  };
  const handleSerialNewChange = async (index, event) => {
    const newValues = [...txtSerialNoNew];
    newValues[index] = event.target.value;
    setTxtSerialNoNew(newValues);
  };

  function fnSetFocus(txtField) {
    setTimeout(() => {
      document.getElementById(`${txtField}`).focus();
    }, 300);
  }

  return {
    gvSerial,
    txtTotalPcs,
    setTxtTotalPcs,
    txtTotalPcs_TextChanged,
    BtnSubmit_Click,
    txtSerialNoOld,
    handleSerialOldChange,
    txtSerialNoNew,
    handleSerialNewChange,
    lblResult,
    gvNewSerial,
  };
}

export { fn_Change_Serial };
