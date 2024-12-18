import React, { useEffect, useState,useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {DataConfig} from "../Common/function_Common";
function fn_ELTmaster() {
  const{ConfigData} = DataConfig();
  // count pageload
  const [lblUser1, setlblUser1] = useState("");
  const [lblResult, setlblResult] = useState({ text: "", styled: {} });
  // Peice No
  const [txtSerialNo_TextChanged, settxtSerialNo_TextChanged] = useState("");
  // Reason
  const [ddlReason1, setddlReason1] = useState([]);
  const [selectddlReason1, setselectddlReason1] = useState("");
  const [txtUpdateBy, settxtUpdateBy] = useState("");
  //const hfUsername
  const [hfUserName, sethfUserName] = useState("");

  const FctxtSerial = useRef(null);

  let IP = "";
  let plant_code = ConfigData.FACTORY;
  IP = localStorage.getItem("ipAddress");
 
  useEffect(() => {
    let Idcode = localStorage.getItem("IDCode");
    sethfUserName(Idcode);
    FctxtSerial.current.focus();
    PageLoad();
  }, []);

  const PageLoad = async () => {
    await axios
      .get("/api/ELTmaster/GetELTmasterCombo")
      .then((response) => {
        setddlReason1(response.data);
      })
      .catch((error) => {
        Swal.fire("Error", error.message, "error");
      });
  };

  const Search_Data = async () => {
    setselectddlReason1("")
    settxtUpdateBy("")
    setlblResult({
      text: "",
      styled: { color: "" },
    });
    await axios
      .post(
        "/api/ELTmaster/GetELT_search",
        {
          dataList: {
            strPlantCode: plant_code,
            strSerailno: txtSerialNo_TextChanged,
          },
        },
        {
          validateStatus: function (status) {
            return true;
          },
        }
      )
      .then((response) => {
        if (response.data.length > 0) {
          if (response.data[0].rem_reject_group == "MASTER") {
            setselectddlReason1(response.data[0].rej_reject_code);
            settxtUpdateBy(response.data[0].rej_operator_code);
            setlblResult({
              text: "Data Read Complete",
              styled: { color: "white",backgroundColor:'green' , fontSize:'50px' },
            });
          } else {
            setlblResult({
              text: "Data reject can not modify",
              styled: { color: "white" ,backgroundColor:'red', fontSize:'50px' },
            });
            settxtSerialNo_TextChanged("");
            FctxtSerial.current.focus();
          }
        } 
        else {
          setlblResult({
            text: "Data Read Complete",
            styled: { color: "white",backgroundColor:'green' , fontSize:'50px' },
          });
        }
      });
  };

  const Submit = async () => {
    if (selectddlReason1.trim() == "") {
      setlblResult({
        text: "Please select before reject reason.",
        styled: { color: "white" ,backgroundColor:'red', fontSize:'50px' },
      });
    } else {
      console.log(IP,"IP",hfUserName)
      await axios
        .post(
          "/api/ELTmaster/Submit_ELT",
          {
            dataList: {
              strPlantCode: plant_code,
              strSerialNo: txtSerialNo_TextChanged,
              strReason: selectddlReason1,
              strIp: IP,
              strtxtUpdateby: txtUpdateBy,
              strtxthfUser: hfUserName,
            },
          },
          {
            validateStatus: function (status) {
              return true;
            },
          }
        )
        .then((res) => {
          if (res.status == 200) {
            if (selectddlReason1 == "DELETE") {
              setlblResult({
                text: "Data Delete Complete.",
                styled: { color: "white",backgroundColor:'green' , fontSize:'50px' },
              });
              settxtUpdateBy("");
            } else {
              setlblResult({
                text: "Data Update Complete.",
                styled: { color: "white",backgroundColor:'green' , fontSize:'50px' },
              });
              settxtUpdateBy(hfUserName);
            }
          } else {
            setlblResult({
              text: res.data.message,
              styled: { color: "white",backgroundColor:'red' , fontSize:'50px' },
            });
          }
        })
        .catch((error) => {
          setlblResult({
            text: error.message,
            styled: { color: "red" },
          });
        });
    }
  };
  const handleBtnCancel = async () => {
    settxtSerialNo_TextChanged("")
    setselectddlReason1("")
    setddlReason1([])
    settxtUpdateBy("")
    FctxtSerial.current.focus();
  }
  
  return {
    lblUser1,
    lblResult,
    txtSerialNo_TextChanged,
    ddlReason1,
    selectddlReason1,
    setselectddlReason1,
    txtUpdateBy,
    settxtSerialNo_TextChanged,
    Search_Data,
    Submit,
    FctxtSerial,
    handleBtnCancel
  };
}

export { fn_ELTmaster };
