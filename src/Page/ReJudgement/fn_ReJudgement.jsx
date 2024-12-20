import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {useLoading} from "../../loading/fn_loading";  
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
  const [cbReJustment, setCbReJustment] = useState("------ SELECT ------");

  const FcSerial = useRef(null);
  const [serialState, setSerialState] = useState(false);
  const [resultCombo, setResultCombo] = useState([]);
  const [resultComboSelected, setResultComboSelected] = useState("------ SELECT ------");
  const {showLoading,hideLoading} = useLoading();
  const Fac = import.meta.env.VITE_FAC;
  const IpAddress = localStorage.getItem("ipAddress");
  const [isShowlblResult, setIsShowlblResult] = useState(false);
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
    Setdisable("disable", "txtLotnoRejudege");
    SetFocus("txtSerialnoRejudege");
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
  const btnCancelClick = () => {
    setLblResult({ text: "", styled: { color: "black" } });
    setIsShowlblResult(false);
    setCbReJustment("------ SELECT ------");
    setTxtQualified("");
    setTxtOperator("");
    setResultComboSelected("------ SELECT ------");
    setDtDataSearch([]);
    setPnlTableDisplaySatate(false);
    if (rdSelect == "rdPcsno") {
      setTxtSerialno("");
      SetFocus("txtSerialnoRejudege");
    } else {
      setLot("");
      SetFocus("txtLotnoRejudege");
    }
  };
  const btnRetrieveClick = async () => {
   
    if (rdSelect == "rdPcsno") {
      if (txtSerialno == "") {
        setLblResult({
          text: "Please input serial no.",
          styled: { color: "red" },
        });
        setIsShowlblResult(true);
       SetFocus("txtSerialnoRejudege");
        return;
      } else {
        await SearchData("");
      }
    } else {
      if (lot == "") {
        setLblResult({
          text: "Please input lot again !",
          styled: { color: "red" },
        });
        setIsShowlblResult(true);
        SetFocus("txtLotnoRejudege");
        return;
      } else {
        await SearchData("");
      }
    }
  };
  const btnSubmitClick = async () => {
    setLblResult({ text: "", styled: { color: "black" } });
    setIsShowlblResult(false);
    if (
      txtOperator != "" &&
      resultComboSelected != "" &&
      txtQualified != "" &&
      cbReJustment != ""
    ) {
      if (resultComboSelected == "------ SELECT ------") {
        setLblResult({
          text: "Please select Reason.",
          styled: { color: "red" },
        });
        setIsShowlblResult(true);
        return;
      }
      if (cbReJustment == "------ SELECT ------") {
        setLblResult({
          text: "Please select Re-judgement.",
          styled: { color: "red" },
        });
        setIsShowlblResult(true);
        return;
      }

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
        setIsShowlblResult(true);
        SetFocus("txtOperatorRejudege");
      } else if (resultComboSelected == "") {
        setLblResult({
          text: "Please select Reason",
          styled: { color: "red" },
        });
        setIsShowlblResult(true);
      } else if (txtQualified == "") {
        setLblResult({
          text: "Please input Qualified",
          styled: { color: "red" },
        });
        setIsShowlblResult(true);
        SetFocus("txtQualifiedRejudege");
      } else if (cbReJustment == "") {
        setLblResult({
          text: "Please select Re-judgement. ",
          styled: { color: "red" },
        });
        setIsShowlblResult(true);
      }
    }
  };
  async function SubmitData() {
    showLoading('กำลังบันทึก กรุณารอสักครู่')
    setLblResult({ text: "", styled: { color: "black" } });
    setIsShowlblResult(false);
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
    setDtDataSearch([]);
    setSerialState(true);
    if (rdSelect == "rdPcsno") {
      setTimeout(() => {
        SearchData("submit");
        hideLoading();
        setLblResult({
          text: "Data save Complete.",
          styled: { color: "black" },
        });
        setIsShowlblResult(true);
      }, 500);
     
    } else if (rdSelect == "rdLotNo") {
      setTimeout(() => {
        SearchData("submitlot");
        hideLoading();
        setLblResult({
          text: "Data save Complete.",
          styled: { color: "black" },
        });
        setIsShowlblResult(true);
      }, 500);
     
    }
  }
  async function SearchData(flg) {
    setLblResult({ text: "", styled: { color: "black" } });
    setIsShowlblResult(false);
    let txtSerialnoValue = txtSerialno.trim().toLocaleUpperCase();
    let strSerialAll = txtSerialnoValue.replace(/\r?\n/g, ",").split(",");
    let i;
    let _strLotno = "";
    if (flg == "submit") {
      console.log(strSerialAll);
      for (let i = 0; i < strSerialAll.length; i++) {
        if (strSerialAll[i].length > 0) {
          await getData("getSearch", {
            Serialno: strSerialAll[i],
            rdFlg: "PcsNo",
          });
        }
      }
      return;
    } else if (flg == "submitlot") {
      await getData("getSearch", { Serialno: lot.trim(), rdFlg: "lot" });
      return;
    }
    if (rdSelect == "rdPcsno") {
      let isDuplicateSerial = strSerialAll.filter((item, index) => strSerialAll.indexOf(item) !== index);
      if (isDuplicateSerial.length > 0) {
        setLblResult({
          text: "Duplicate serial no.",
          styled: { color: "red" },
        });
        setIsShowlblResult(true);
        // setIsShowlblResult(true);
        setTxtSerialno("");
        SetFocus("txtSerialnoRejudege");
        return;
      }
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
            setIsShowlblResult(true);
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
      console.log(lot,'lot');
      if (lot.length > 9){
        setLot(lot.trim().substring(0,9));
        await getData("getSearch", { Serialno: lot.trim().substring(0,9), rdFlg: "lot" });
      }else{
        await getData("getSearch", { Serialno: lot.trim(), rdFlg: "lot" });
      }
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
      setLblResult({
        text: "Please select data to export",
        styled: { color: "red" },
      });
      setIsShowlblResult(true);
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
            setIsShowlblResult(true);
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
          if (res.status == 200) {
            setLblResult({
              text: "Data save Complete.",
              styled: { color: "black" },
            });
            setIsShowlblResult(true);
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
    btnCancelClick,
    isShowlblResult
  };
}

export { fn_ReJudgement };
