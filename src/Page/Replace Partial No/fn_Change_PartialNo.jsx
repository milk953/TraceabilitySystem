import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Tag } from "antd";
import {DataConfig} from "../Common/function_Common";
function fn_Change_PartialNo() {
  const{ConfigData} = DataConfig();
  console.log(ConfigData,'ConfigData');
  const [txtTotalPcs, settxtTotalPcs] = useState(1);
  const [hfSerialCount, sethfSerialCount] = useState("");
  const [loading, setloading] = useState(false);
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
    visble: "none",
    style: {},
    focus: "",
  });
  const fc_txtSerialOld = useRef([]);
  const fc_txtSerialNew = useRef([]);
  const SERIAL_DATABASE_SWITCH =  ConfigData.SERIAL_DATABASE_SWITCH;
  const Fac = ConfigData.FACTORY;
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
      width:'30px'
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
       width:'60px',
      render: (text, record, index) => {
        return text;
      },
    },
  ];

  const txtTotalPcs_TextChanged = async () => {
    getInitialSerial();
  };

  const getInitialSerial = async () => {
    console.log();
    let dtData = [];
    for (let intRow = 0; intRow < txtTotalPcs; intRow++) {
      dtData.push({
        SEQ: intRow + 1,
      });
    }
    setgvSerial((prevState) => ({ ...prevState, visble: "", value: dtData }));
    settxtSerialNo(Array(gvSerial.value.length).fill(""));
    settxtSerialNoNew(Array(gvSerial.value.length).fill(""));
    sethfSerialCount(txtTotalPcs);
    if (dtData.length > 0) {
      setTimeout(() => {
        fc_txtSerialOld.current[0].focus();   
        }, 300);
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
      console.log(txtSerialNo[intSeq], "txtSerialNo");
      if (txtSerialNo[intSeq] == "" || txtSerialNo[intSeq] == undefined) {
        console.log("11111");
        strError = "Please input Old Serial Number.";
      }
      if (txtSerialNoNew[intSeq] == "" || txtSerialNoNew[intSeq] == undefined) {
        console.log("2222");
        strError = "Please input New Serial Number.";
      }
    }
    console.log("dtData", strError);
    return [dtData, strError];
  };

  const BtnSubmit_Click = async () => {
    setloading(true)
    Swal.fire({
      title: "Are you confirm submit?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "ConFirm",
      denyButtonText: `Cancel`,
    }).then(async (result) => {
 
      if (result.isConfirmed) {
        let CheckerHeaderFlg = false;
        let CheckerHeaderFlg3 = false;
        let TouchUpCnt = 0;
        let RejectCnt = 0;
        let FinalGateCnt = 0;
        let strError = "";
        let strOldSerial = "";
        let strNewSerial = "";
        let CheckerOldSerialShtFlg = true;
        let dtData = [{}];
        const result = await getInputSerial(strError);
        [dtData, strError] = result;
        if (strError != "") {
          
          setTimeout(() => {
            // setlblResult((prevState) => ({
            //   ...prevState,
            //   visble: "",
            //   value: strError,
            //   style: "#BA0900",
            // }));
            Swal.fire({
              title: strError,
              icon: "error",
              // timer: 2000,
              // showConfirmButton: false,
            });
            setloading(false); 
            
          }, 500);
          return;
          
        }
        let Get_INSPECT_COUNT = [];

        for (let intRow = 0; intRow < dtData.length; intRow++) {
          strOldSerial = dtData[intRow].SERIAL_OLD;
          strNewSerial = dtData[intRow].SERIAL_NEW;
          console.log(strOldSerial, "----", strNewSerial);
          await axios
            .post("/api/ChangPatial/GetFgh_inspect_count", {
              Plant_Code: Fac,
              strOldSerial: strOldSerial,
            })
            .then((res) => {
              if (res.data.length > 0) {
                Get_INSPECT_COUNT = res.data[0].inspect_count;
              }
            });
          if (Get_INSPECT_COUNT > 0) {
            FinalGateCnt = Get_INSPECT_COUNT + 1;
            dtData[intRow].FINALGATE_FLG = "Y";

            dtData[intRow].FINALGATE_ROW = FinalGateCnt;
          }
        }
        setTimeout(() => {
          setloading(false); 
          setgvRow((prevState) => ({
            ...prevState,
            visble: "",
            value: dtData,
          })); 
        }, 1000);
        

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
                if (res.data.length > 0) {
                  Str_ErrorUpdate = res.data[0].p_error;
                }

                if (Str_ErrorUpdate != "") {
                  Swal.fire({
                    title: Str_ErrorUpdate,
                    icon: "error",
                    // timer: 2000,
                    // showConfirmButton: false,
                  });
                  // setlblResult((prevState) => ({
                  //   ...prevState,
                  //   visble: "",
                  //   value: Str_ErrorUpdate,
                  //   style: "#BA0900",
                  // }));
                }
              });
            
          }
        }
        if (strError == "") {
          Swal.fire({
            title: 'Change Serial Successed',
            icon: "success",
            // timer: 2000,
            // showConfirmButton: false,
          });
          // setlblResult((prevState) => ({
          //   ...prevState,
          //   visble: "",
          //   value: "Change Serial Successed",
          //   style: "#059212",
          // }));
          getInitialSerial();
         
        }
      } else {
        setloading(false)
        return;
      }
    });
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
    gvRow,
    loading,
    fc_txtSerialOld,
    fc_txtSerialNew
  };
}

export { fn_Change_PartialNo };
