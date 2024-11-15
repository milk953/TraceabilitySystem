import axios from "axios";
import { set } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

import * as XLSX from "xlsx";
function fn_ReJudgement() {
  const [lblResult, setLblResult] = useState({
    text: "",
    styled: { color: "black" },
  });
  //radio button state
  const [rdSelect, setRdSelect] = useState("rdPcsno");
  const [txtSerialno, setTxtSerialno] = useState("");
  const [dtDataSearch, setDtDataSearch] = useState([]);
  const [lot, setLot] = useState("");
  const [pnlTableDisplaySatate, setPnlTableDisplaySatate] = useState(false);
  const [txtOperator, setTxtOperator] = useState("");
  const [txtQualified, setTxtQualified] = useState("");
  const [cbReJustment, setCbReJustment] = useState("");

  const FcSerial = useRef(null);
  const [serialState, setSerialState] = useState(false);
  const [resultCombo, setResultCombo] = useState([]);
  const [resultComboSelected, setResultComboSelected] = useState("");
  const Fac = import.meta.env.VITE_FAC;
  const IpAddress = localStorage.getItem("ipAddress");
  const columns = [
    {
      title: "Serial No",
      dataIndex: "rej_serial_no",
      key: "rej_serial_no",
      align: "center",
      width: 60,
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "Reason",
      dataIndex: "rem_reject_name",
      key: "rem_reject_name",
      align: "center",
      width: 120,
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "Operator",
      dataIndex: "rej_operator_code",
      key: "rej_operator_code",
      align: "center",
      width: 80,
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "Inspect Count	",
      dataIndex: "rej_inspect_count",
      key: "rej_inspect_count",
      align: "center",
      width: 80,
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "Sheet Front",
      dataIndex: "sht_front_no",
      key: "sht_front_no",
      align: "center",
      width: 80,
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "Sheet Back",
      dataIndex: "sht_back_no",
      key: "sht_back_no",
      align: "center",
      width: 80,
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "Pcs No",
      dataIndex: "sht_pcs_no",
      key: "sht_pcs_no",
      align: "center",
      width: 80,
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "Re-Judgement",
      dataIndex: "tou_touch_up_result",
      key: "tou_touch_up_result",
      align: "center",
      width: 80,
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "Qualified",
      dataIndex: "tou_operator_code",
      key: "tou_operator_code",
      align: "center",
      width: 80,
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "Re-Judgement Count",
      dataIndex: "tou_touch_up_count",
      key: "tou_touch_up_count",
      align: "center",
      width: 80,
      render: (text, record, index) => {
        return text;
      },
    },
  ];
  function SetFocus(txtField) {
    document.getElementById(`${txtField}`).focus();
  }
  function Setdisable(type, txtField) {
    if (type == "disable") {
      document.getElementById(`${txtField}`).disabled = true;
      document.getElementById(`${txtField}`).className = "styleDisable";
    } else {
      document.getElementById(`${txtField}`).disabled = false;
      document.getElementById(`${txtField}`).className = "styleEnable";
    }
  }
  useEffect(() => {
    PageLoad();
  }, []);
  const PageLoad = async () => {
    await getData("getResultCombo", "");
  };
  const handleRDChange = (event) => {
    setRdSelect(event.target.value);
    if (event.target.value == "rdPcsno") {
      Setdisable("disable", "txtLotnoRejudege");
      Setdisable("enable", "txtSerialnoRejudege");
      SetFocus("txtSerialnoRejudege");
      setLot("");
    } else {
      Setdisable("disable", "txtSerialnoRejudege");
      Setdisable("enable", "txtLotnoRejudege");
      SetFocus("txtLotnoRejudege");
      setTxtSerialno("");
    }
  };
  const txtSerialnoChange = async () => {
    console.log(txtSerialno);
    console.log(lot);
  };
  const btnRetrieveClick = async () => {
    await SearchData();
  };
  const btnSubmitClick = async () => {
    if (
      txtOperator != "" &&
      resultComboSelected != "" &&
      txtQualified != "" &&
      cbReJustment != ""
    ) {
      Swal.fire({
        title: "Are you confirm submit?",
        text: "Are you sure to submit this data",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          SubmitData();
        }
      });
    } else {
      if (txtOperator == "") {
        setLblResult({
          text: "Please input operator Code.",
          styled: { color: "red" },
        });
        Swal.fire("Error", "Please input operator Code.", "error");
      } else if (resultComboSelected == "") {
        setLblResult({
          text: "Please select reject code . ",
          styled: { color: "red" },
        });
        Swal.fire("Error", "Please select reject reason.", "error");
      } else if (txtQualified == "") {
        setLblResult({
          text: "Please input Qualified Code.",
          styled: { color: "red" },
        });
        Swal.fire("Error", "Please input Qualified Code.", "error");
      } else if (cbReJustment == "") {
        setLblResult({
          text: "Please select Re-judgement. ",
          styled: { color: "red" },
        });
        Swal.fire("Error", "Please select Re-judgement. ", "error");
      }
    }
  };
  async function SubmitData() {
    setLblResult({ text: "", styled: { color: "black" } });
    for (let i = 0; i < dtDataSearch.length; i++) {
      getData("submitData", {
        Serialno: dtDataSearch[i].rej_serial_no,
        PlantCode: Fac,
        strTouchUp: cbReJustment,
        strRejInpecCount: dtDataSearch[i].rej_inspect_count,
        strDdlReason: resultComboSelected,
        IP: IpAddress,
        strOperatorReason: txtOperator,
        strTouinspecCont: dtDataSearch[i].tou_touch_up_count,
        strTouTouchup: cbReJustment,
        strOperatorTOU: dtDataSearch[i].tou_operator_code,
      });
    }

    setSerialState(true);
  }
  async function SearchData() {
    setLblResult({ text: "", styled: { color: "black" } });
    let txtSerialnoValue = txtSerialno.trim().toLocaleUpperCase();
    let strSerialAll = txtSerialnoValue.replace(/\r?\n/g, ",").split(",");
    console.log(strSerialAll);
    let i;
    let _strLotno = "";

    if (rdSelect == "rdPcsno") {

        for (let i = 0; i < strSerialAll.length; i++) {
          if (strSerialAll[i].length > 0) {
            let duplicateFound = false;
            for (let j = 0; j < dtDataSearch.length; j++) {
              if (strSerialAll[i] === dtDataSearch[j].rej_serial_no) {
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
              await getData("getSearch", {
                Serialno: strSerialAll[i],
                rdFlg: "PcsNo",
              });
            }
          }
          // setTxtSerialno("");
        }
    } else if (rdSelect == "rdLotNo") {
      setDtDataSearch([]);
      await getData("getSearch", { Serialno: lot.trim(), rdFlg: "lot" }); //900035953
    }
    setPnlTableDisplaySatate(true);
  }
  const handleExport = async () => {
    if (dtDataSearch.length > 0) {
      const headers = [
        "Serial No",
        "Reason",
        "Operator",
        "Inspect Count",
        "Sheet Front",
        "Sheet Back",
        "Pcs No",
        "Re-Judgement",
        "Qualified",
        "Re-Judgement Count",
      ];
      console.log(dtDataSearch);
      const data = dtDataSearch.map((row) => [
        row.rej_serial_no,
        row.rem_reject_name,
        row.rej_operator_code,
        row.rej_inspect_count,
        row.sht_front_no,
        row.sht_back_no,
        row.sht_pcs_no,
        row.tou_touch_up_result,
        row.tou_operator_code,
        row.tou_touch_up_count,
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

  async function getData(type, params) {
    if (type == "getResultCombo") {
      await axios
        .get("/api/ReJudgement/getCombo", {
          validateStatus: function (status) {
            return true;
          },
        })
        .then((res) => {
          if (res.status == 200) {
            setResultCombo(res.data);
          } else if (res.status == 500) {
            setLblResult({
              text: `Error Connection Please captuer and contact SE`,
              styled: { color: "red" },
            });
          }
        });
    } else if (type == "getSearch") {
      await axios
        .post("/api/ReJudgement/getData", {
          dataList: {
            strTxtSerial: params.Serialno,
            strPlantCode: Fac,
            strRdFlg: params.rdFlg,
          },
        })
        .then((res) => {
          console.log(res.data);

          if (params.rdFlg == "PcsNo") {
            const updatedData = {
              ...res.data[0],
              rem_serial_no: params.Serialno,
            };
            const newData = [updatedData];
            setDtDataSearch((prevData) => [...prevData, updatedData]);
          } else {
            setDtDataSearch(res.data);
          }
        })
        .catch((error) => {
          if (error) {
            const FirstData = [
              {
                rej_serial_no: params.Serialno,
                rej_inspect_count: 0,
                tou_touch_up_count: 0,
              },
            ];
            const updatedData = {
              ...FirstData[0],
              rem_serial_no: params.Serialno,
              rej_inspect_count: 0,
              tou_touch_up_count: 0,
            };
            setDtDataSearch((prevData) => [...prevData, updatedData]);
          }
        });
    } else if (type == "submitData") {
      await axios
        .post(
          "api/ReJudgement/insertData",
          {
            dataList: {
              strSerialNo: params.Serialno,
              strPlantCode: Fac,
              strTouchUp: params.strTouchUp,
              strRejInpecCount: params.strRejInpecCount,
              strDdlReason: params.strDdlReason,
              strIP: params.IP,
              strOperatorReason: params.strOperatorReason,
              strTouinspecCont: params.strTouinspecCont,
              strTouTouchup: params.strTouTouchup,
              strOperatorTOU: params.strOperatorTOU,
            },
          },
          {
            validateStatus: function (status) {
              return true;
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          if (res.status == 200) {
            setLblResult({
              text: "Data save Complete.",
              styled: { color: "black" },
            });
            Swal.fire("Success", "Data Read Complete", "success").then(
              (result) => {
                if (result.isConfirmed) {
                  console.log("btnSubmitClick");
                  setPnlTableDisplaySatate(true);
                  btnRetrieveClick();
                }
              }
            );
          }
        });
    }
  }

  return {
    lblResult,
    setLblResult,
    rdSelect,
    setRdSelect,
    handleRDChange,
    txtSerialno,
    setTxtSerialno,
    lot,
    setLot,
    txtSerialnoChange,
    pnlTableDisplaySatate,
    resultCombo,
    resultComboSelected,
    setResultComboSelected,
    btnRetrieveClick,
    dtDataSearch,
    txtQualified,
    setTxtQualified,
    txtOperator,
    setTxtOperator,
    cbReJustment,
    setCbReJustment,
    btnSubmitClick,
    FcSerial,
    serialState,
    handleExport,
    columns,
  };
}

export { fn_ReJudgement };
