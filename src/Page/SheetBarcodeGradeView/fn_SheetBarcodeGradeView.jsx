import axios from "axios";
import { get } from "lodash";
import React, { useState } from "react";
import ExcelJS from "exceljs";
import Swal from "sweetalert2";
import { Tag } from "antd";
import {useLoading} from "../../loading/fn_loading"; 
import {DataConfig} from "../Common/function_Common"; 
function fn_SheetBarcodeGradeView() {
  const{ConfigData} = DataConfig();

  const {showLoading,hideLoading} = useLoading();
  const [gvResult, setGvResult] = useState([]);
  const [gvResultState, setGvResultState] = useState(false);
  const [lotNotextField, setLotNotextField] = useState("");
  const [radioValue, setRadioValue] = useState("RESULT");
  const [resultValue, setResultValue] = useState("ALL");
  const [product_result, setProduct_result] = useState("");
  const [lotNo_result, setLotNo_result] = useState("");
  const [totalSheet_result, setTotalSheet_result] = useState("");
  const hfBarcodeGrade = "A,B,C";

  const Fac = import.meta.env.VITE_FAC;
  const RetriveBtn = async () => {
    Clear_View();
    setGrid();
  };

  const Clear_View = async () => {
    setProduct_result("");
    setGvResult([]);
    setLotNo_result("");
    setTotalSheet_result("0");
  };

  const setGrid = async () => {
    showLoading('กำลังค้นหา กรุณารอสักครู่')
    let dtData = [];
    let strShowBy = "";
    strShowBy = radioValue;
    await axios
      .post("/api/Barcode/fnLotSheetBadmarkData", {
        dataList: {
          strPlantCode: Fac,
          strLotNo: lotNotextField,
          strResultBy: radioValue,
          strResult: resultValue,
        },
      })
      .then((res) => {
        dtData = res.data;
        if (dtData == "" || dtData == []) {
          Swal.fire({
            icon: "error",
            title: "No Data Found",
            showConfirmButton: false,
            timer: 1000,
          });
          setLotNotextField("");
          return;
        }
      });
    setGvResult(dtData);
    setTotalSheet_result(dtData.length);
    setGvResultState(true);
    if (dtData.length > 0) {
      let dtLot = [];
      await axios
        .post("/api/common/fnGetLotData", { strLOTNO: lotNotextField })
        .then((res) => {

          if (res.data != "") {
            setProduct_result(res.data[0].LOT_PRD_NAME);
            setLotNo_result(res.data[0].LOT);
          }
      
        });
    }

    setTotalSheet_result(dtData.length);
    hideLoading();
  };

  const predefinedColumns = [
    {
      title: "Sheet No.",
      dataIndex: "sheet_no",
      key: "sheet_no",
      align: "center",
      width: 180,
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "OK",
      dataIndex: "ok",
      key: "ok",
      align: "center",
      width: 45,
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "NG",
      dataIndex: "ng",
      key: "ng",
      align: "center",
      width: 45,
      render: (text, record, index) => {
        if (text > 0) {
          return (
            <Tag color="#cd201f" style={{ fontSize: 14, margin: 0 }}>
              {text}
            </Tag>
          );
        } else {
          return text;
        }
      },
    },
  ];

  const dynamicColumns = Object.keys(gvResult[0] || {})
    .filter((key) => !["sheet_no", "ok", "ng"].includes(key))
    .map((key) => ({
      title: `${key}`,
      dataIndex: key,
      key: key,
      align: "center",
      width: 35,
      render: (text) => {
        if (radioValue === "RESULT") {
          const barcodeGrades = hfBarcodeGrade.split(",");
          const isTextInBarcodeGrade = barcodeGrades.includes(text)
          // return <span style={{ color: text === "NG" ? "red" : "inherit",margin:0,border:'1px solid red' }}>{text}</span>;
          return text === "NG" ? (
            <Tag
            color="#cd201f"
            style={{ fontSize: 13, margin: 0 }}
          >
            {text}
          </Tag>
          ) : (
           text
          );
        } else {
          const barcodeGrades = hfBarcodeGrade.split(",");
          const isTextInBarcodeGrade =
            barcodeGrades.includes(text) || text === "OK" || text === "NG";
          return isTextInBarcodeGrade ? (
            text
          ) : (
            <Tag
              color={isTextInBarcodeGrade ? "" : "#cd201f"}
              style={{ fontSize: 13, margin: 0 }}
            >
              {text}
            </Tag>
          );
          // return <span style={{ color: isTextInBarcodeGrade ? "inherit" : "red" }}>{text}</span>;
        }
      },
    }));

  const columns = [
    ...predefinedColumns,
    ...dynamicColumns.slice(0, dynamicColumns.length - 1),
  ];

  const exportExcelFile = () => {
    if (gvResult == "" || gvResult == null || gvResult == []) {
      Swal.fire({
        icon: "error",
        title: "No Data to Export",
        showConfirmButton: false,
        timer: 1000,
      });
    }
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("My Sheet");
    sheet.properties.defaultRowHeight = 20;
    const columns = [
      {
        header: "Sheet No.",
        key: "sheet_no",
        width: 30,
        style: { alignment: { horizontal: "center" } },
      },
    ];

    const dynamicColumns = Object.keys(gvResult[0])
      .filter((key) => !["sheet_no", "ok", "ng"].includes(key))
      .map((key) => ({
        header: `${key}`,
        key: key,
        width: 5,
        style: { alignment: { horizontal: "center" } },
      }));
      if (dynamicColumns.length > 0) {
        dynamicColumns.pop();
      }

    sheet.columns = [...columns, ...dynamicColumns];

gvResult.forEach((row) => {
  const newRow = sheet.addRow(row);
  newRow.eachCell((cell, colNumber) => {
    cell.alignment = { horizontal: "center" };
    const barcodeGrades = hfBarcodeGrade.split(",");
    const isTextInBarcodeGrade = barcodeGrades.includes(cell.value);
    const columnHeader = sheet.getRow(1).getCell(colNumber).value;

    if (columnHeader !== "Sheet No." && columnHeader !== "OK" && columnHeader !== "NG") {
      if (cell.value === "NG" || !isTextInBarcodeGrade&& cell.value !== "OK") {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFFF0000" }, // สีแดง
        };
      }
    }
  });
});

    const firstRow = sheet.getRow(1);
    firstRow.eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFF00" },
      };
      cell.font = {
        name: "Roboto",
        family: 4,
        size: 14,
        bold: true,
      };
      cell.border = {
        top: { style: "thick" },
      };
    });
    sheet.eachRow((row, rowNumber) => {
      const firstCell = row.getCell(1);
      const lastCell = row.getCell(row.cellCount);
      firstCell.border = {
        left: { style: "thick" },
      };
      lastCell.border = {
        right: { style: "thick" },
      };
    });

    const lastRow = sheet.getRow(sheet.rowCount);
    lastRow.eachCell((cell) => {
      cell.border = {
        bottom: { style: "thick" },
      };
    });
    sheet.eachRow((row, rowNumber) => {
      const firstCell = row.getCell(1);
      const lastCell = row.getCell(row.cellCount);

      if (rowNumber === sheet.rowCount) {
        firstCell.border = {
          bottom: { style: "thick" },
          left: { style: "thick" },
        };
        lastCell.border = {
          bottom: { style: "thick" },
          right: { style: "thick" },
        };
      }
      if (rowNumber === 1) {
        firstCell.border = {
          top: { style: "thick" },
          left: { style: "thick" },
        };
        lastCell.border = {
          top: { style: "thick" },
          right: { style: "thick" },
        };
      }
    });

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: "application/octet-stream" });
      saveAs(blob, `Barcode Grade Report.xlsx`);
    });
  };

  return {
    gvResult,
    gvResultState,
    lotNotextField,
    setLotNotextField,
    setRadioValue,
    radioValue,
    resultValue,
    setResultValue,
    RetriveBtn,
    product_result,
    lotNo_result,
    totalSheet_result,
    columns,
    exportExcelFile,
  };
}

export { fn_SheetBarcodeGradeView };
