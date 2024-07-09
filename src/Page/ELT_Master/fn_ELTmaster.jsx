import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
function fn_ELTmaster() {
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
  let IP = "";
  let plant_code = import.meta.env.VITE_FAC;

  useEffect(() => {
    let Idcode = localStorage.getItem("IDCode");
    IP = localStorage.getItem("ipAddress");
    sethfUserName(Idcode);
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
              styled: { color: "black" },
            });
          } else {
            setlblResult({
              text: "Data reject can not modify",
              styled: { color: "red" },
            });
            settxtSerialNo_TextChanged("");
          }
        } else {
          setlblResult({
            text: "Data Read Complete",
            styled: { color: "black" },
          });
        }
      });
  };

  const Submit = async () => {
    if (selectddlReason1.trim() == "") {
      setlblResult({
        text: "Please select before reject reason.",
        styled: { color: "red" },
      });
    } else {
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
          console.log(res.data, "datatatataat");
          if (res.status == 200) {
            if (selectddlReason1 == "DELETE") {
              setlblResult({
                text: "Data Delete Complete.",
                styled: { color: "blue" },
              });
              settxtUpdateBy("");
            } else {
              setlblResult({
                text: "Data Update Complete.",
                styled: { color: "blue" },
              });
              settxtUpdateBy(hfUserName);
            }
          } else {
            setlblResult({
              text: res.data.message,
              styled: { color: "red" },
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
  };
}

export { fn_ELTmaster };
