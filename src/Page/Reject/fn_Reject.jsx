import React, { useEffect, useState } from "react";
import axios from "axios";
import { Checkbox } from "antd";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import {useLoading} from "../../loading/fn_loading";
function fn_Reject() {
  //visible state
  const [pnlTouchupState, setPnlTouchupState] = useState(false);
  const [pnlTableDisplaySatate, setPnlTableDisplaySatate] = useState(false);
  const {showLoading,hideLoading} = useLoading();
  //collection
  const [rejectCombo, setRejectCombo] = useState([]);
  const [txtSerialno, setTxtSerialno] = useState("");
  const [lot, setLot] = useState("");
  const [dtDataSearch, setDtDataSearch] = useState([]);
  const [cbSelected, setCbSelected] = useState("------SELECT------");
  const [ip, setIp] = useState("");
  const [Fac, setFac] = useState("");
  const [txtOperator, setTxtOperator] = useState("");
  const [searchafterSubmit, setSearchafterSubmit] = useState([]);
  const [isShowlblResult, setIsShowlblResult] = useState(false);
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
  function SetFocus(txtField) {
    document.getElementById(`${txtField}`).focus();
  }
  const handleRDChange = (event) => {
    if (event.target.value == "rdLotNo") {
      setTxtSerialno("");
      setRdSelect(event.target.value);
      // Setdisable
      Setdisable("disable", "txtPieceNoReject");
      Setdisable("enable", "txtLotnoReject");
      SetFocus("txtLotnoReject");
    } else {
      setTxtSerialno("");
      setLot("");
      setRdSelect(event.target.value);
      Setdisable("enable", "txtPieceNoReject");
      Setdisable("disable", "txtLotnoReject");
      SetFocus("txtPieceNoReject");
    }
  };
  function Setdisable(type, txtField) {
    if (type == "disable") {
      document.getElementById(`${txtField}`).disabled = true;
      document.getElementById(`${txtField}`).className = "styleDisable";
    } else {
      document.getElementById(`${txtField}`).disabled = false;
      document.getElementById(`${txtField}`).className = "styleEnable";
    }
  }
  const PageLoad = async () => {
    await getData("GetCombo");
    let idCode = localStorage.getItem("IDCode");
    setTxtOperator(idCode);  
    Setdisable("disable", "txtLotnoReject");
    Setdisable("disable", "txtOperatorReject");
  };
  const txtSerialnoChange = async () => {
    await SearchData();
  };
  async function SearchData(flg, filteredData) {
    setLblResult({ text: "", styled: { color: "black" } });
    
    let txtSerialnoValue = txtSerialno.trim().toLocaleUpperCase();
    let strSerialAll = txtSerialnoValue.replace(/\r?\n/g, ",").split(",");

    let i;
    let _strLotno = "";
    if (flg != "") {
      if (rdSelect == "rdPcsno") {
        setTimeout(() => {
          setDtDataSearch([]);
          for (let i = 0; i < strSerialAll.length; i++) {
            getData("GetSearchbySerialno", { Serialno: strSerialAll[i] });
          }
        }, 500);
        console.log(dtDataSearch, "searchafterSubmit");
        return;
      } else {
        setSearchafterSubmit(lot);
        setDtDataSearch([]);
        await getData("GetSearchbyLot", { Lotno: filteredData });
        return;
      }
    }
    if (rdSelect == "rdPcsno") {
      let isDuplicateSerial = strSerialAll.filter((item, index) => strSerialAll.indexOf(item) !== index);
      if (isDuplicateSerial.length > 0) {
        setLblResult({
          text: "Duplicate serial no.",
          styled: { color: "red" },
        });
        setIsShowlblResult(true);
        setTxtSerialno("");
        SetFocus("txtPieceNoReject");
        return;
      }
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
            setIsShowlblResult(true);
          } else {
            await getData("GetSearchbySerialno", { Serialno: strSerialAll[i] });
          }
        }
        // setTxtSerialno("");
      }
    } else if (rdSelect == "rdLotNo") {
      setDtDataSearch([]);
      setPnlTableDisplaySatate(false);
      if (lot.length > 9 ){
        setLot(lot.substring(0, 9));
        await getData("GetSearchbyLot", { Lotno: lot.substring(0, 9) });
      }else{
        await getData("GetSearchbyLot", { Lotno: lot });
      }
      
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
  const rowSelection = {
    selectedRowKeys: selectedRows,
    onChange: (selectedRowKeys) => {
      setSelectedRows(selectedRowKeys);
    },
  };
  const handleBtnCancel_Click = () => {
    setIsShowlblResult(false);
    setDtDataSearch([]);
    setPnlTableDisplaySatate(false);
    setLblResult({ text: "", styled: { color: "black" } });
    setCbSelected("------SELECT------");
    if (rdSelect == "rdLotNo") {
      setLot("");
      SetFocus("txtLotnoReject");
    } else {
      setTxtSerialno("");
      SetFocus("txtPieceNoReject");
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
      setLblResult({
        text: "Please select data to export",
        styled: { color: "red" },
      });
      setIsShowlblResult(true);
    }

  };
  const handleRetrice_Click = async () => {
    await SearchData("", "");
  };
  const handleSubmit_Click = async () => {
    setIsShowlblResult(false);
    if(rdSelect == "rdLotNo"){
      if (lot == "" || lot == " ") {
        setLblResult({
          text: "Please input lot no.",
          styled: { color: "red" },
        });
        setIsShowlblResult(true);
        SetFocus("txtLotnoReject");
        return;
      }
    }else if (rdSelect == "rdPcsno") {
      if (txtSerialno == "" || txtSerialno == " ") {
        setLblResult({
          text: "Please input serial no.",
          styled: { color: "red" },
        });
        setIsShowlblResult(true);
        SetFocus("txtPieceNoReject");       
        return;
      }
    }
    if (cbSelected == " " || cbSelected == "" || cbSelected == '------SELECT------') {
      setLblResult({
        text: "Please select Reason",
        styled: { color: "red" },
      });
      setIsShowlblResult(true);
      return;
    }
    if (txtOperator != "" && cbSelected != "") {
      if(selectedRows.length < 1){
        setLblResult({
          text: "Please select data to submit",
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
          text: "Please input operator Code . ",
          styled: { color: "red" },
        });
        setIsShowlblResult(true);
      } else if (cbSelected == "") {
        setLblResult({
          text: "Please select Reason ",
          styled: { color: "red" },
        });
        setIsShowlblResult(true);
      }
    }
  };
  async function SubmitData() {
    setLblResult({ text: "", styled: { color: "black" } });
    const filteredData = dtDataSearch.filter((item) =>
      selectedRows.includes(item.rem_serial_no)
    );
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
    setDtDataSearch([]);
    if (rdSelect == "rdPcsno") {
      SearchData("submit", filteredData);
    } else {
      SearchData("submit", lot);
    }
  }

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
          setIsShowlblResult(true);
        });
    } else if (Select == "GetSearchbySerialno") {
      await axios
        .post(
          "/api/reject/getsearchbyserial",
          {
            strSerialNo: params.Serialno,
          },
          {
            validateStatus: function (status) {
              return true;
            },
          }
        )
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
          setIsShowlblResult(true);
          setPnlTableDisplaySatate(true);
        })
        .catch((error) => {
          setLblResult({
            text: error.message,
            styled: { color: "red" },
          });
          setIsShowlblResult(true);
        });
    } else if (Select == "GetSearchbyLot") {
      await axios
        .post(
          "/api/reject/getsearchbylot",
          {
            strLotNo: params.Lotno,
          },
          {
            validateStatus: function (status) {
              return true;
            },
          }
        )
        .then((response) => {
          if (response.status == 200) {
            setDtDataSearch(response.data);
            setPnlTableDisplaySatate(true);
            setLblResult({
              text: "Data Read Complete",
              styled: { color: "black" },
            });
            setIsShowlblResult(true);
          } else if (response.status == 404) {
            setLblResult({
              text: "Please input lot again !",
              styled: { color: "red" },
            });
            setIsShowlblResult(true);
          }
        })

        .catch((error) => {
          setLblResult({
            text: error.message,
            styled: { color: "red" },
          });
          setIsShowlblResult(true);
        });
    } else if (Select == "SetSubmitData") {
      showLoading('กำลังบันทึก กรุณารอสักครู่')
      await axios
        .post(
          "/api/reject/setsubmitdata",
          {
            dataList: {
              strSerialNo: params.strSerialNo,
              strTxtoperator: params.strTxtoperator,
              strReason: params.strReason,
              strInspectCount: params.strInspectCount || 0,
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
          console.log(res, "res");
          if (res.status === 200) {
            if (cbSelected == "DELETE") {
              setLblResult({
                text: "Data Delete Complete..",
                styled: { color: "black" },
              });
              setIsShowlblResult(true);
              setTimeout(() => {                
                SearchData("submit", lot);
                hideLoading();
              }, 500);
              
            } else {
              
              setLblResult({
                text: "Data save Complete.",
                styled: { color: "black" },
              });
              setIsShowlblResult(true);
              setTimeout(() => {                
                SearchData("submit", lot);
                hideLoading();
              }, 500);
              
            }
          }
        })
        .catch((error) => {
          hideLoading();
          setLblResult({
            text: error.message,
            styled: { color: "red" },
          });
          setIsShowlblResult(true);
        });
    }
  }
  const columns = [
    {
      width: 60,
      align: "center",
      title: (
        <Checkbox
          onChange={(e) => {
            if (e.target.checked) {
              const allKeys = dtDataSearch.map((item) => item.rem_serial_no);
              setSelectedRows(allKeys);
            } else {
              setSelectedRows([]);
            }
          }}
          checked={selectedRows.length === dtDataSearch.length}
        />
      ),
      dataIndex: "rem_serial_no",
      render: (text, record) => (
        <Checkbox
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedRows((prev) => [...prev, record.rem_serial_no]);
            } else {
              setSelectedRows((prev) =>
                prev.filter((key) => key !== record.rem_serial_no)
              );
            }
          }}
          checked={selectedRows.includes(record.rem_serial_no)}
        />
      ),
    },
    {
      title: "Serial No",
      dataIndex: "rem_serial_no",
      key: "rem_serial_no",
      align: "center",
      width: 100,
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "Reason",
      dataIndex: "rem_reject_name",
      key: "rem_reject_name",
      align: "center",
      width: 200,
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "Inspect Count",
      dataIndex: "rej_inspect_count",
      key: "rej_inspect_count",
      align: "center",
      width: 60,
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "Sheet Front",
      dataIndex: "front_no",
      key: "front_no",
      align: "center",
      width: 60,
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "Sheet Back",
      dataIndex: "back_no",
      key: "back_no",
      align: "center",
      width: 60,
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "Pcs No",
      dataIndex: "pcs_no",
      key: "pcs_no",
      align: "center",
      width: 60,
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "MPE Result",
      dataIndex: "mpe_result",
      key: "mpe_result",
      align: "center",
      width: 60,
      render: (text, record, index) => {
        return text;
      },
    },
  ];
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
    columns,
    handleBtnCancel_Click,
    isShowlblResult
  };
}

export { fn_Reject };
