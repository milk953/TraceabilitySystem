import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Tag } from "antd";
import { useLoading } from "../../loading/fn_loading";

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
  let txtTotalPcsCheck = "N";
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    const fetchData = async () => {
      await getInitialSerial();
    };
    fetchData();
  }, []);

  const txtTotalPcs_TextChanged = async () => {
    const newValues = [];
    setTxtSerialNoOld(newValues);
    setTxtSerialNoNew(newValues);
    await getInitialSerial();
  };

  const BtnSubmit_Click = async () => {
    Swal.fire({
      title: "Are you confirm submit?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Confirm",
      denyButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        showLoading("กำลังบันทึก กรุณารอสักครู่...");
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
        if (strError.trim() !== "") {
          setLblResult((prevState) => ({
            ...prevState,
            value: strError,
            style: "red",
          }));
          await new Promise(resolve => setTimeout(resolve, 1000));
          hideLoading();
          return;
        }

        try {
          for (let i = 0; i < dtData.length; i++) {
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
              await new Promise(resolve => setTimeout(resolve, 1000));
              hideLoading();
              return;
            }
          }

          for (let i = 0; i < dtData.length; i++) {
            const drRow = dtData[i];
            strOldSerial = drRow.SERIAL_OLD;
            strNewSerial = drRow.SERIAL_NEW;
            await axios
              .post("/api/GetserialnoChangserialoldnew", {
                dataList: {
                  strplant_code: plantCode,
                  stroldserial: strOldSerial,
                  strnewserial: strNewSerial,
                },
              })
              .then((res) => {
                Out2 = res.data[0].p_lblresult.length;
                if (res.data[0].p_lblresult.length > 0) {
                  setLblResult((prevState) => ({
                    ...prevState,
                    value: res.data[0].p_lblresult,
                    style: "red",
                  }));
                  hideLoading();
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
              await new Promise(resolve => setTimeout(resolve, 1000));
              hideLoading();
              return;
            }
          }
          for (let i = 0; i < dtData.length; i++) {
            const drRow = dtData[i];
            strOldSerial = drRow.SERIAL_OLD;
            strNewSerial = drRow.SERIAL_NEW;
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
              });
          }
        } catch (ex) {
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
        await new Promise(resolve => setTimeout(resolve, 1000));
        hideLoading();
      } else if (result.isDenied) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        hideLoading();
        return;
      }
    });
  };

  const BtnCancle_Click = async () => {
    txtTotalPcsCheck = "Y";
    // const newValues = Array(txtSerialNoOld.length).fill("");
    const newValues = [];
    setTxtSerialNoOld(newValues);
    setTxtSerialNoNew(newValues);
    setGvSerial((prevState) => ({
      ...prevState,
      value: [],
    }));
    setTxtTotalPcs((prevState) => ({
      ...prevState,
      value: "1",
    }));
    setLblResult((prevState) => ({
      ...prevState,
      value: "",
      disbled: "",
      visble: false,
    }));
    await getInitialSerial();
  };

  const getInitialSerial = async () => {
    const DatatxtTotalPcs = txtTotalPcsCheck === "Y" ? "1" : txtTotalPcs.value;
    let dtData = [];
    for (let intRow = 1; intRow <= parseInt(DatatxtTotalPcs); intRow++) {
      dtData.push({ SEQ: intRow });
    }
    setGvSerial((prevState) => ({ ...prevState, value: dtData, visble: true }));
    setGvNewSerial((prevState) => ({
      ...prevState,
      value: dtData,
      visble: true,
    }));
    setHfSerialCount(DatatxtTotalPcs);
    if (dtData.length > 0) {
      fnSetFocus("gvSerial_txtSerialNoOld_0");
    }

    return 0;
  };

  const getInputSerial = async () => {
    let dtData = [];
    let intRow = 0;
    let strFrontSide = "";
    let strError = "";
    for (let intSeq = 0; intSeq < gvSerial.value.length; intSeq++) {
      const serialGV = (txtSerialNoOld[intSeq] || "").trim().toUpperCase();
      const serialNEW = (txtSerialNoNew[intSeq] || "").trim().toUpperCase();
      // const serialGV = (txtSerialNoOld[intSeq] || "").replace(/\s+/g, "").toUpperCase();  -- ลบช่องว่างทั้งหมด
      
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
      if (drRow.SERIAL_OLD == "") {
        strError = `${intSeq + 1} Please input Old Serial Number.`;
        break;
      }
      if (drRow.SERIAL_NEW == "") {
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
    // newValues[index] = event.target.value.trim();
    setTxtSerialNoOld(newValues);
    if (event.key === "Enter") {
      fnSetFocus(`gvSerial_txtSerialNoOld_${index + 1}`);
    }
  };
  const handleSerialNewChange = async (index, event) => {
    const newValues = [...txtSerialNoNew];
    newValues[index] = event.target.value;
    setTxtSerialNoNew(newValues);
    if (event.key === "Enter") {
      fnSetFocus(`gvSerial_txtSerialNoNew_${index + 1}`);
    }
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
    BtnCancle_Click,
    txtSerialNoOld,
    handleSerialOldChange,
    txtSerialNoNew,
    handleSerialNewChange,
    lblResult,
    gvNewSerial,
    fnSetFocus,
  };
}

export { fn_Change_Serial };
