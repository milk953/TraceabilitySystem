import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Tag } from "antd";
function fn_Change_PartialNo() {
  const [txtTotalPcs, settxtTotalPcs] = useState("");
  const [hfSerialCount, sethfSerialCount] = useState("");
  const [gvSerial, setgvSerial] = useState({
    value: "",
    disbled: "",
    visble: "none",
    style: {},
    focus: "",
  });
  const [txtSerialNo, settxtSerialNo] = useState(
    Array(gvSerial.value.length).fill("")
  );
  const [txtSerialNoNew, settxtSerialNoNew] = useState(
    Array(gvSerial.value.length).fill("")
  );

  const [lblResult, setlblResult] = useState({
    value: "",
    disbled: "",
    visble: "none",
    style: {},
    focus: "",
  });
  let SERIAL_DATABASE_SWITCH = import.meta.env.VITE_SERIAL_DATABASE_SWITCH;
  const Fac = import.meta.env.VITE_FAC;
  //PageLoad----------
  useEffect(() => {}, []);
  //-------------------
  const columns = [
    {
      title: "No.",
      dataIndex: "SEQ",
      key: "No.",
      render: (text, record, index) => {
        return index + 1;
      },
      align: "center",
    },
    {
      title: "Old Partial No.",
      dataIndex: "SERIAL_OLD",
      key: "Old Partial No.",
      align: "left",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "New Partial No.",
      dataIndex: "SERIAL_NEW",
      key: "New Partial No.",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },

    {
      title: "Count",
      key: "Count",
      dataIndex: "FINALGATE_ROW",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
  ];

  const txtTotalPcs_TextChanged = async () => {
    getInitialSerial();
  };

  const getInitialSerial = async () => {
    let dtData = [];
    for (let intRow = 0; intRow < txtTotalPcs.length; intRow++) {
      dtData.push({
        SEQ: intRow + 1,
      });
    }
    setgvSerial((prevState) => ({ ...prevState, visble: "", value: dtData }));
    sethfSerialCount(txtTotalPcs);
    if (dtData.length > 0) {
      // fnSetFocus("gvSerial_txtSerialNo_0")   โฟกัสserialเก่า0
    }
  };
  const getInputSerial = async (strError) => {
    let dtData = [];

    for (let intSeq = 0; intSeq < gvSerial.value.length; intSeq++) {
      dtData.push({
        SEQ: intSht + 1,
        SERIAL_OLD: txtSerialNo[intSeq],
        SERIAL_NEW: txtSerialNoNew[intSeq],
        SHEET_FLG: "",
        TOUCHUP_FLG: "",
        REJECT_FLG: "",
        CHECKER1_FLG: "",
        CHECKER3_FLG: "",
        FINALGATE_FLG: "N",
        FINALGATE_ROW: 0,
      });
      if (txtSerialNo[intSeq] == "") {
        strError = String(intSeq + 1) + "Please input Old Serial Number.";
      }
      if (txtSerialNoNew[intSeq] == "") {
        strError = String(intSeq + 1) + "Please input New Serial Number.";
      }
    }
    return dtData, strError;
  };

  const BtnSubmit_Click = async () => {
    let CheckerHeaderFlg = false;
    let CheckerHeaderFlg3 = False;
    let TouchUpCnt = 0;
    let RejectCnt = 0;
    let FinalGateCnt = 0;
    let strError = "";
    let strOldSerial = "";
    let strNewSerial = "";
    let CheckerOldSerialShtFlg = true;
    let dtData;
    dtData, (strError = getInputSerial(strError));
    if (strError != "") {
      setlblResult((prevState) => ({
        ...prevState,
        visble: "",
        value: strError,
        style: { background: "#BA0900" },
      }));
      return;
    }
    let Get_INSPECT_COUNT = [];

    for (let intRow = 0; intRow < dtData.length; intRow++) {
      // await axios
      //   .post("/api/Common/setseriallottraytable", {
      //     PLANT_CODE: Fac,
      //     strOldSerial: txtSerialNo[intRow],
      //   })
      //   .then((res) => {
      //     Get_INSPECT_COUNT=res.data
      //   });
        if (Get_INSPECT_COUNT.length > 0) {
          FinalGateCnt = Get_INSPECT_COUNT[0] + 1;
          dtData[intRow].FINALGATE_FLG = "Y";
          dtData[intRow].FINALGATE_ROW = FinalGateCnt;
        }
    }
    // gvRow.DataSource = dtData
    // gvRow.DataBind()

    for (let intRow = 0; intRow < dtData.length; intRow++) {
      // dtData[intRow].FINALGATE_FLG
      let Str_ErrorUpdate
      if(dtData[intRow].FINALGATE_FLG=='Y'){
           await axios
        .post("/api/Common/setseriallottraytable", {
          PLANT_CODE: Fac,
          strOldSerial: txtSerialNo[intRow],
        })
        .then((res) => {
          Str_ErrorUpdate=res.data
           if(Str_ErrorUpdate!=''){
            setlblResult((prevState) => ({
              ...prevState,
              visble: "",
              value: Str_ErrorUpdate,
              style: { background: "#BA0900" },
            }));
           }

        });
      }
    }
    if(strError==''){
      setlblResult((prevState) => ({
        ...prevState,
        visble: "",
        value: 'Change Serial Successed',
        style: { background: "#059212" },
      }));
    }
  };

  return {
    columns,
  };
}

export { fn_Change_PartialNo };
