import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { color } from "framer-motion";
import styled from "styled-components";
import { set } from "lodash";
function fn_Reject() {
  //visible state
  const [pnlTouchupState, setPnlTouchupState] = useState(false);
  const [pnlTableDisplaySatate, setPnlTableDisplaySatate] = useState(false);

  //collection
  const [rejectCombo, setRejectCombo] = useState([]);
  const [txtSerialno, setTxtSerialno] = useState("");
  const [lot, setLot] = useState("");
  const [dtDataSearch, setDtDataSearch] = useState([]);
  
  //display state
  const [lblResult, setLblResult] = useState({
    text: "",
    styled: { color: "black" },
  });
  //radio button state
  const [rdSelect, setRdSelect] = useState("rdPcsno");

  useEffect(() => {
    if (rejectCombo == "") {
      PageLoad();
    }
  }, []);
  // function
  const handleRDChange = (event) => {
    setRdSelect(event.target.value);
  };
  const PageLoad = async () => {
    await getData("GetCombo");
  };
  const txtSerialnoChange = async () => {
    await SearchData();
  };
  async function SearchData() {
    setLblResult({ text: "", styled: { color: "black" } });
    let txtSerialnoValue = txtSerialno.trim().toLocaleUpperCase();
    let strSerialAll = txtSerialnoValue.replace(/\r?\n/g, ",").split(",");
    let i;
    let _strLotno = "";

    if (rdSelect == "rdPcsno") {
      for (let i = 0; i < strSerialAll.length; i++) {
        if (strSerialAll[i].length > 0) {
          let duplicateFound = false;
          for (let j = 0; j < dtDataSearch.length; j++) {
            if (strSerialAll[i] === dtDataSearch[j].rem_serial_no) {
              duplicateFound = true;
              break;
            }
          }

          if (duplicateFound) {
            setLblResult({
              text: "Duplicate serial no.",
              styled: { color: "red" },
            });
          } else {
            await getData("GetSearchbySerialno", { Serialno: strSerialAll[i] });
          }
        }
        setTxtSerialno("");
      }
    } else if (rdSelect == "rdLotNo") {
      setDtDataSearch([]);
      setPnlTableDisplaySatate(false);
      await getData("GetSearchbyLot", { Lotno: lot });
    }
  }


  const handleExport = async () => {
    // await SearchData();
    console.log(selectedRows);
  };
  const handleRetrice_Click = async () => {
    await SearchData();
  };

  async function getData(Select, params) {
    if (Select == "GetCombo") {
      await axios
        .get("/api/reject/getrejectcombo")
        .then((response) => {
          setRejectCombo(response.data);
        })
        .catch((error) => {
          setLblResult({
            text: error.message,
            styled: { color: "red" },
          });
          swal("Error", error.message, "error");
        });
    } else if (Select == "GetSearchbySerialno") {
      await axios
        .post("/api/reject/getsearchbyserial", {
          strSerialNo: params.Serialno,
        })
        .then((response) => {
          const updatedData = {
            ...response.data[0],
            rem_serial_no: params.Serialno,
          };
          const newData = [updatedData];

          // setDtDataSearch(newData);
          setDtDataSearch((prevData) => [...prevData, updatedData]);
          setLblResult({
            text: "Data Read Complete",
            styled: { color: "black" },
          });
          setPnlTableDisplaySatate(true);
        })
        .catch((error) => {
          setLblResult({
            text: error.message,
            styled: { color: "red" },
          });
          swal("Error", error.message, "error");
        });
    } else if (Select == "GetSearchbyLot") {
      await axios
        .post("/api/reject/getsearchbylot", {
          strLotNo: params.Lotno,
        })
        .then((response) => {
          setDtDataSearch(response.data);
          setPnlTableDisplaySatate(true);
          setLblResult({
            text: "Data Read Complete",
            styled: { color: "black" },
          });
        })
        .catch((error) => {
          setLblResult({
            text: error.message,
            styled: { color: "red" },
          });
          swal("Error", error.message, "error");
        });
    }
  }
  return {
    rdSelect,
    handleRDChange,
    pnlTouchupState,
    pnlTableDisplaySatate,
    rejectCombo,
    lblResult,
    txtSerialno,
    setTxtSerialno,
    txtSerialnoChange,
    dtDataSearch,
    setLot,
    lot,
    handleRetrice_Click,
    handleExport
  };
}

export { fn_Reject };
