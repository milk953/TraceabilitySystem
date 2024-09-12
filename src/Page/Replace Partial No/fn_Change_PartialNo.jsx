import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Tag } from "antd";
function fn_Change_PartialNo() {
  const [txtTotalPcs, settxtTotalPcs] = useState(1);
  const [hfSerialCount, sethfSerialCount] = useState("");
  const [gvSerial, setgvSerial] = useState({
    value: "",
    disbled: "",
    visble: "none",
    style: "",
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
  const [gvRow, setgvRow] = useState({
    value: "",
    disbled: "",
    visble: 'none',
    style: {},
    focus: "",
  });
  let SERIAL_DATABASE_SWITCH = import.meta.env.VITE_SERIAL_DATABASE_SWITCH;
  const Fac = import.meta.env.VITE_FAC;
  console.log(Fac,'Fac')
  const IP = localStorage.getItem("ipAddress");
  //PageLoad----------
  useEffect(() => {

    getInitialSerial();
  }, []);
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
      align: "left",
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
    console.log()
    let dtData = [];
    for (let intRow = 0; intRow < txtTotalPcs; intRow++) {
      dtData.push({
        SEQ: intRow + 1,
      });
    }
    setgvSerial((prevState) => ({ ...prevState, visble: "", value: dtData }));
    settxtSerialNo( Array(gvSerial.value.length).fill(""))
    settxtSerialNoNew( Array(gvSerial.value.length).fill(""))
    sethfSerialCount(txtTotalPcs);
    if (dtData.length > 0) {
      // fnSetFocus("gvSerial_txtSerialNo_0")   โฟกัสserialเก่า0
    }
  };
  const getInputSerial = async (strError) => {
    let dtData = [];

    for (let intSeq = 0; intSeq < gvSerial.value.length; intSeq++) {
      
      dtData.push({
        SEQ: intSeq + 1,
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
      console.log(txtSerialNo[intSeq],'txtSerialNo')
      if (txtSerialNo[intSeq] == ""||txtSerialNo[intSeq] == undefined)  {
        console.log('11111')
        strError = String(intSeq + 1) + " Please input Old Serial Number.";
      }
      if (txtSerialNoNew[intSeq] == ""||txtSerialNoNew[intSeq] == undefined) {
        console.log('2222')
        strError = String(intSeq + 1) + " Please input New Serial Number.";
      }
    }
    console.log('dtData',strError)
    return [dtData, strError];
  };

  const BtnSubmit_Click = async () => {
    let CheckerHeaderFlg = false;
    let CheckerHeaderFlg3 = false;
    let TouchUpCnt = 0;
    let RejectCnt = 0;
    let FinalGateCnt = 0;
    let strError = "";
    let strOldSerial = "";
    let strNewSerial = "";
    let CheckerOldSerialShtFlg = true;
    let dtData=[{}];
    const result  = await getInputSerial(strError);
     [dtData, strError] = result;
    console.log('iiii',dtData)
    if (strError != "") {
      setlblResult((prevState) => ({
        ...prevState,
        visble: "",
        value: strError,
        style: "#BA0900",
      }));
      return;
    }
    let Get_INSPECT_COUNT = [];

    for (let intRow = 0; intRow < dtData.length; intRow++) {
      strOldSerial = dtData[intRow].SERIAL_OLD;
      strNewSerial = dtData[intRow].SERIAL_NEW;
      console.log(strOldSerial,'----',strNewSerial)
      await axios
        .post("/api/ChangPatial/GetFgh_inspect_count", {
          Plant_Code: Fac,
          strOldSerial: strOldSerial,
        })
        .then((res) => {
          console.log(res.data.length,'<<<<<<')
        if(res.data.length>0){
          Get_INSPECT_COUNT = res.data[0].inspect_count;
        }
          
         
        });
      if (Get_INSPECT_COUNT > 0) {
       
        FinalGateCnt = Get_INSPECT_COUNT + 1;
        dtData[intRow].FINALGATE_FLG = "Y";
     
        dtData[intRow].FINALGATE_ROW = FinalGateCnt;
      }
    }
    console.log(dtData,'gvrow')
    setgvRow((prevState) => ({
      ...prevState,
      visble: '',
      value: dtData,
    }));
 

    for (let intRow = 0; intRow < dtData.length; intRow++) {
      strOldSerial = dtData[intRow].SERIAL_OLD;
      strNewSerial = dtData[intRow].SERIAL_NEW;
      let Str_ErrorUpdate;
      if (dtData[intRow].FINALGATE_FLG == "Y") {
        await axios
          .post("/api/ChangPatial/Set_UpdateGateheader", {
            dataList: {
              strNewSerial: strNewSerial,
              IP_ADDRESS: IP,
              PLANT_CODE: Fac,
              strOldSerial: strOldSerial,
            },
          })
          .then((res) => {
            if(res.data.length>0){
              Str_ErrorUpdate = res.data[0].p_error;
            }
            console.log('Get_INSPECT_COUNT',Str_ErrorUpdate)
            if (Str_ErrorUpdate != "") {
              setlblResult((prevState) => ({
                ...prevState,
                visble: "",
                value: Str_ErrorUpdate,
                style:"#BA0900",
              }));
            }
          });
      }
    }
    if (strError == "") {
      setlblResult((prevState) => ({
        ...prevState,
        visble: "",
        value: "Change Serial Successed",
        style:  "#059212" ,
      }));
      getInitialSerial();
    }
  };

  const handleSerialOldChange = async (index, event) => {
    const newValues = [...txtSerialNo];
    newValues[index] = event.target.value;
    settxtSerialNo(newValues);
  };

  const handleSerialNewChange = async (index, event) => {
    const newValues = [...txtSerialNoNew];
    newValues[index] = event.target.value;
    settxtSerialNoNew(newValues);
  };


  return {
    columns,
    settxtSerialNo,
    settxtSerialNoNew,
    settxtTotalPcs,
    txtSerialNo,
    txtSerialNoNew,
    txtTotalPcs,
    txtTotalPcs_TextChanged,
    BtnSubmit_Click,
    gvSerial,
    handleSerialOldChange,
    handleSerialNewChange,
    lblResult,
    gvRow
  };
}

export { fn_Change_PartialNo };
