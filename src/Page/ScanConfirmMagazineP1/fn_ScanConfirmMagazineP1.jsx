import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { color } from "framer-motion";
import { Tag } from "antd";
import { values } from "lodash";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

function fn_ScanConfirmMagazineP1() {
  const plantCode = import.meta.env.VITE_FAC;
  const [hfUserID, setHfUserID] = useState("");
  const [hfUserStation, setHfUserStation] = useState("");
  const [txtLotNo, setTxtLotNo] = useState({
    value: "",
    disabled: "",
    visble: "",
    style: {},
  });
  const [lblProduct, setLblProduct] = useState({
    value: "",
    disabled: "",
    visble: "",
    style: {},
  });
  const [txtOperator, setTxtOperator] = useState({
    value: "",
    disabled: "",
    visble: "",
    style: {},
  });
  const [txtMagNo, setTxtMagNo] = useState({
    value: "",
    disabled: "",
    visble: "",
    style: {},
  });
  const [lblTotalPcs, setLblTotalPcs] = useState({
    value: "",
    disabled: "",
    visble: "",
    style: {},
  });
  const [lblResult, setLblResult] = useState({
    value: "",
    disabled: "",
    visble: "",
    style: {},
  });
  const [ibtLotBack, setIbtLotBack] = useState({
    value: "",
    disabled: "",
    visble: "",
    style: {},
  });
  const [ibtOperator, setIbtOperator] = useState({
    value: "",
    disabled: "",
    visble: "",
    style: {},
  });
  const [ibtExcel, setIbtExcel] = useState({
    value: "",
    disabled: "",
    visble: "",
    style: {},
  });
  const [gvScanResult, setGvScanResult] = useState({
    value: [],
    disbled: "",
    visble: false,
    style: {},
  });

  useEffect(() => {
    let ID = localStorage.getItem("ipAddress");
    const fetchData = async () => {
      setHfUserID(ID);
      setHfUserStation(ID);
      await SetMode("OP");
    };
    fetchData();
  }, []);

  const txtLotNo_TextChanged = async () => {
    let txtLotNo_data = "";
    if (txtLotNo.value.trim() !== "") {
      let dtLotData = [];
      let _strLotAll = "";
      _strLotAll = txtLotNo.value.toUpperCase().split(";");
      setTxtLotNo((prevState) => ({
        ...prevState,
        value: _strLotAll[0],
      }));
      txtLotNo_data = _strLotAll[0];
      if ((dtLotData.length = 9)) {
        await axios
          .post("/api/Common/getProductDataByLot", {
            strLot: txtLotNo_data,
          })
          .then((res) => {
            let data = res.data.flat().flat();
            console.log("data prd_name", data[0][0]);
            dtLotData = data[0][0];
            if (data.length > 0) {
              setLblProduct((prevState) => ({
                ...prevState,
                value: dtLotData,
              }));
              SetMode("MAGAZINE");
            } else {
              SetMode("LOT");
            }
          });
      } else {
        SetMode("LOT");
      }
    } else {
      SetMode("LOT");
    }
  };

  const ibtLotBack_Click = async () => {
    SetMode("LOT");
  };

  const txtOperator_TextChanged = async () => {
    if (txtOperator.value.trim() !== "") {
      setTxtOperator((prevState) => ({
        ...prevState,
        value: txtOperator.value.trim(),
      }));
      SetMode("LOT");
    }
  };

  const ibtOperator_Click = async () => {
    SetMode("OP");
  };

  const txtMagNo_TextChanged = async () => {
    let strError = "";
    try {
      const res1 = await axios.post("/api/GetCountSerialByLotMagazine", {
        dataList: {
          strPlantCode: plantCode,
          strLotno: txtLotNo.value,
          strMgzNo: txtMagNo.value,
        },
      });
      let data = res1.data.flat().flat();
      console.log("data", data);
      setLblTotalPcs((prevState) => ({
        ...prevState,
        value: data[0].lot_count,
      }));

      if (data.length > 0) {
        const res2 = await axios.post("/api/SetManualConfirmMagazine", {
          dataList: {
            strPlantCode: plantCode,
            strLotno: txtLotNo.value,
            strMgzNo: txtMagNo.value,
            strStation: hfUserStation,
          },
        });
        let data2 = res2.data.flat().flat();
        strError = data2[0].p_error;
        console.log("data2", strError);
        if (strError.trim() === "") {
          setLblResult((prevState) => ({
            ...prevState,
            value: "OK",
            visble: true,
          }));
        } else {
          setLblResult((prevState) => ({
            ...prevState,
            value: "NG",
            visble: true,
          }));
        }
      } else {
        setLblResult((prevState) => ({
          ...prevState,
          value: "NG",
          visble: true,
        }));
      }
      SetMode("MAGAZINE");
    } catch (error) {
      SetMode("MAGAZINE");
      console.error("Error occurred: ", error);
    }
  };

  const SetMode = async (_strType) => {
    if (_strType == "OP") {
      setTxtOperator((prevState) => ({
        ...prevState,
        value: "",
        disabled: false,
        style: { background: "" },
      }));
      setTxtLotNo((prevState) => ({
        ...prevState,
        value: "",
        disabled: true,
        style: { background: "#EEEEEE" },
      }));

      setTxtMagNo((prevState) => ({
        ...prevState,
        value: "",
        disabled: true,
        style: { background: "#EEEEEE" },
      }));
      setLblProduct((prevState) => ({
        ...prevState,
        value: "",
      }));
      setLblTotalPcs((prevState) => ({
        ...prevState,
        value: "",
      }));
      setIbtLotBack((prevState) => ({
        ...prevState,
        disabled: true,
      }));
      setIbtOperator((prevState) => ({
        ...prevState,
        disabled: true,
      }));
      setIbtExcel((prevState) => ({
        ...prevState,
        disabled: true,
      }));
      fnSetFocus("txtOperator_ScanConfirmMagazineP1_focus");
      setLblResult((prevState) => ({
        ...prevState,
        value: "",
        visble: false,
      }));
    }
    if (_strType == "LOT") {
      setTxtOperator((prevState) => ({
        ...prevState,
        disabled: true,
        style: { background: "#EEEEEE" },
      }));
      setIbtOperator((prevState) => ({
        ...prevState,
        disabled: false,
      }));
      setTxtLotNo((prevState) => ({
        ...prevState,
        value: "",
        disabled: false,
        style: { background: "" },
      }));
      setIbtLotBack((prevState) => ({
        ...prevState,
        disabled: false,
      }));
      setTxtMagNo((prevState) => ({
        ...prevState,
        value: "",
        disabled: true,
        style: { background: "#EEEEEE" },
      }));
      setLblProduct((prevState) => ({
        ...prevState,
        value: "",
      }));
      setLblTotalPcs((prevState) => ({
        ...prevState,
        value: "",
      }));
      setIbtExcel((prevState) => ({
        ...prevState,
        disabled: true,
      }));
      fnSetFocus("txtLotNo_ScanConfirmMagazineP1_focus");
      setLblResult((prevState) => ({
        ...prevState,
        value: "",
        visble: false,
      }));
    }
    if (_strType == "MAGAZINE") {
      setTxtOperator((prevState) => ({
        ...prevState,
        disabled: true,
        style: { background: "#EEEEEE" },
      }));
      setIbtOperator((prevState) => ({
        ...prevState,
        disabled: false,
      }));
      setTxtLotNo((prevState) => ({
        ...prevState,
        disabled: true,
        style: { background: "#EEEEEE" },
      }));
      setIbtLotBack((prevState) => ({
        ...prevState,
        disabled: false,
      }));
      setTxtMagNo((prevState) => ({
        ...prevState,
        value: "",
        disabled: false,
        style: { background: "" },
      }));
      setLblTotalPcs((prevState) => ({
        ...prevState,
        value: "",
      }));
      setIbtExcel((prevState) => ({
        ...prevState,
        disabled: false,
      }));
      fnSetFocus("txtMagNo_ScanConfirmMagazineP1_focus");
    }
  };

  const ibtExcel_Click = async () => {
    console.log("เข้ามาในเงื่อนไขแล้ว : ");
    await axios
      .post("/api/GetSerialMagazineByLot", {
        dataList: {
          strplant_code: plantCode,
          strlot: txtLotNo.value,
        },
      })
      .then((res) => {
        let data = res.data.flat().flat();
        console.log("data ibtExcel_Click", data);
        setGvScanResult((prevState) => ({
          ...prevState,
          value: data,
        }));
        FN_ExportGridView("Serail_" + txtLotNo.value + ".xls", data);
      });
  };

  const FN_ExportGridView = async (namefile, data) => {
    console.log(data, "hhhhhhhh", namefile);
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("My Sheet");
    sheet.properties.defaultRowHeight = 20;

    // ดึงชื่อคีย์จาก data[0] เพื่อสร้าง header อัตโนมัติ
    const dynamicColumns = Object.keys(data[0] || {}).map((key) => ({
      header: key.toUpperCase(),
      key: key,
      width: 10,
      style: { alignment: { horizontal: "center" } },
    }));
    sheet.columns = dynamicColumns;
    // const dynamicColumns = HeaderColumn.map(col => ({
    //   header: col.title.toUpperCase(),
    //   key: col.dataIndex,
    //   width: 10,
    //   style: { alignment: { horizontal: "center" } },
    // }));
    // sheet.columns = dynamicColumns;

    if (data.length === 0) {
      const emptyRow = {};
      dynamicColumns.forEach((col) => (emptyRow[col.dataIndex] = "")); // เติมค่าค่าว่าง
      data.push(emptyRow);
    }

    data.forEach((row) => {
      const newRow = sheet.addRow(row);
      newRow.eachCell({ includeEmpty: true }, (cell) => {
        cell.alignment = { horizontal: "center" };

        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
    });

    const firstRow = sheet.getRow(1);
    firstRow.eachCell({ includeEmpty: true }, (cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFF00" },
      };
      cell.font = {
        name: "Roboto",
        size: 9,
        bold: true,
      };

      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    sheet.columns.forEach((column) => {
      let maxWidth = column.header.length;
      data.forEach((row) => {
        const cellValue = String(row[column.key] || "");
        maxWidth = Math.max(maxWidth, cellValue.length);
      });
      column.width = maxWidth + 2;
    });

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: "application/octet-stream" });
      saveAs(blob, `${namefile}`);
    });
  };

  function fnSetFocus(txtField) {
    setTimeout(() => {
      document.getElementById(`${txtField}`).focus();
    }, 300);
  }
  return {
    txtOperator,
    setTxtOperator,
    txtOperator_TextChanged,
    ibtOperator_Click,
    txtLotNo,
    setTxtLotNo,
    txtLotNo_TextChanged,
    ibtLotBack_Click,
    txtMagNo,
    setTxtMagNo,
    txtMagNo_TextChanged,
    ibtLotBack,
    ibtOperator,
    ibtExcel,
    lblResult,
    lblTotalPcs,
    lblProduct,
    ibtExcel_Click,
  };
}

export { fn_ScanConfirmMagazineP1 };
