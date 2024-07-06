import React, { useEffect, useState } from "react";
import axios from "axios";
import { color } from "framer-motion";
import styled from "styled-components";
import { set } from "lodash";
import { WatchOutlined } from "@mui/icons-material";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
function fn_Reject() {
  //visible state
  const [pnlTouchupState, setPnlTouchupState] = useState(false);
  const [pnlTableDisplaySatate, setPnlTableDisplaySatate] = useState(false);

  //collection
  const [rejectCombo, setRejectCombo] = useState([]);
  const [txtSerialno, setTxtSerialno] = useState("");
  const [lot, setLot] = useState("");
  const [dtDataSearch, setDtDataSearch] = useState([]);
  const [cbSelected, setCbSelected] = useState("");
  const [ip, setIp] = useState("");
  const [Fac, setFac] = useState("");
  const [txtOperator, setTxtOperator] = useState("");

  //display state
  const [lblResult, setLblResult] = useState({
    text: "",
    styled: { color: "black" },
  });
  //radio button state
  const [rdSelect, setRdSelect] = useState("rdPcsno");
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    let ipX = localStorage.getItem("ipAddress");
    let Fac = localStorage.getItem("Fac");
    setIp(ipX);
    setFac(Fac);
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

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allDocNos = dtDataSearch.map((item) => item.rem_serial_no);
      setSelectedRows(allDocNos);
    } else {
      setSelectedRows([]);
    }
  };

  const handleCheckboxChange = (event, docNo) => {
    if (event.target.checked) {
      setSelectedRows((prevSelected) => [...prevSelected, docNo]);
    } else {
      setSelectedRows((prevSelected) =>
        prevSelected.filter((item) => item !== docNo)
      );
    }
  };
  const handleExport = async () => {
    console.log(selectedRows);
    const filteredData = dtDataSearch.filter((item) =>
      selectedRows.includes(item.rem_serial_no)
    );
    if (selectedRows.length > 0 || selectAll.length > 0) {
      const headers = [
        "Serial No",
        "Reason",
        "Inspect Count",
        "Sheet Front",
        "Sheet Back",
        "PCS No",
        "MPE Result",
      ];

      const data = filteredData.map((row) => [
        row.rem_serial_no,
        row.rem_reject_name,
        row.rej_inspect_count,
        row.front_no,
        row.back_no,
        row.pcs_no,
        row.mpe_result,
      ]);

      const ws_data = [headers, ...data];
      const ws = XLSX.utils.aoa_to_sheet(ws_data);

      const headerRange = XLSX.utils.decode_range(ws["!ref"]);

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

      const now = new Date();
      const formattedDate =
        now.getFullYear() +
        ("0" + (now.getMonth() + 1)).slice(-2) +
        ("0" + now.getDate()).slice(-2) +
        ("0" + now.getHours()).slice(-2) +
        ("0" + now.getMinutes()).slice(-2) +
        ("0" + now.getSeconds()).slice(-2);
      const filename = `RejectHistory_${formattedDate}.xlsx`;

      XLSX.writeFile(wb, filename);
    } else {
      Swal.fire("Error", "Please select data to export", "error");
    }
  };
  const handleRetrice_Click = async () => {
    await SearchData();
  };
  const handleSubmit_Click = async () => {
    setLblResult({ text: "", styled: { color: "black" } });
    if (txtOperator != "" && cbSelected != "") {
      console.log(selectedRows.length);
      const filteredData = dtDataSearch.filter((item) =>
        selectedRows.includes(item.rem_serial_no)
      );
      console.log(filteredData, "filteredData");
      for (let i = 0; i < filteredData.length; i++) {
        console.log(i, "i");
        getData("SetSubmitData", {
          strSerialNo: filteredData[i].rem_serial_no,
          strTxtoperator: txtOperator,
          strReason: cbSelected,
          strInspectCount: filteredData[i].rej_inspect_count,
          strIp: ip,
          strPlantCode: Fac,
        });
      }
    } else {
      if (txtOperator == "") {
        setLblResult({
          text: "Please input operator Code . ",
          styled: { color: "red" },
        });
        Swal.fire("Error", "Please input operator Code . ", "error");
      } else if (cbSelected == "") {
        setLblResult({
          text: "Please select reject code . ",
          styled: { color: "red" },
        });
        Swal.fire("Error", "Please select reject code . ", "error");
      }
    }
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
          Swal.fire("Error", error.message, "error");
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
          Swal.fire("Error", error.message, "error");
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
          Swal.fire("Error", error.message, "error");
        });
    } else if (Select == "SetSubmitData") {
      await axios
        .post(
          "/api/reject/setsubmitdata",
          {
            dataList: {
              strSerialNo: params.strSerialNo,
              strTxtoperator: params.strTxtoperator,
              strReason: params.strReason,
              strInspectCount: params.strInspectCount,
              strIp: params.strIp,
              strPlantCode: params.strPlantCode,
            },
          },
          {
            validateStatus: function (status) {
              return true;
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            if (cbSelected == "DELETE") {
              setLblResult({
                text: "Data Delete Complete..",
                styled: { color: "black" },
              });
              Swal.fire("Success", "Data Delete Complete.", "success").then(
                (result) => {
                  if (result.isConfirmed) {
                    setDtDataSearch([]);
                    SearchData();
                  }
                }
              );
            } else {
              setLblResult({
                text: "Data save Complete.",
                styled: { color: "black" },
              });
              Swal.fire("Success", "Data Read Complete", "success").then(
                (result) => {
                  if (result.isConfirmed) {
                    setDtDataSearch([]);
                    SearchData();
                  }
                }
              );
            }
          }
        })
        .catch((error) => {
          Swal.fire("Error", error.message, "error");
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
    handleCheckboxChange,
    selectAll,
    selectedRows,
    handleSelectAll,
    handleExport,
    setCbSelected,
    cbSelected,
    ip,
    Fac,
    setTxtOperator,
    txtOperator,
    handleSubmit_Click,
  };
}

export { fn_Reject };
