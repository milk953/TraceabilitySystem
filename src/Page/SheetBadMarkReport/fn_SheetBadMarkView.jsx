import axios from "axios";
import { get } from "lodash";
import React, { useState } from "react";
import ExcelJS  from "exceljs"
import Swal from "sweetalert2";

function fn_SheetBadMarkView() {
  const [gvResult, setGvResult] = useState([]);
  const [gvResultState, setGvResultState] = useState(false);
  const [lotNotextField, setLotNotextField] = useState("");
  const [radioValue, setRadioValue] = useState("RESULT");
  const [resultValue, setResultValue] = useState("ALL");
  const [product_result, setProduct_result] = useState('');
  const [lotNo_result, setLotNo_result] = useState('');
  const [totalSheet_result, setTotalSheet_result] = useState('');

  const Fac = import.meta.env.VITE_FAC;
  const RetriveBtn =async () => {
    await getData("fnLotSheetBadmarkData", {lot: lotNotextField, resultBy: radioValue, result: resultValue});
    await getData("fnLotNoByRoll", lotNotextField);
  }
  async function getData(type, params) {
    if (type === "fnLotSheetBadmarkData") {
      let dtData = [];
      await axios
        .post("/api/SheetBadmarkReport/s", {
          dataList: {
            strPlantCode: Fac,
            strLotNo: params.lot,
            strResultBy: params.resultBy,
            strResult: params.result,
          },
        })
        .then((response) => {
          if(response.data == ''|| response.data ==[]) {
            Swal.fire({
              icon: 'error',
              title: 'No Data Found',
              showConfirmButton: false,
              timer: 1000,
            })
            setLotNotextField('');
            return;
          }
          setGvResult(response.data);
          setTotalSheet_result(response.data.length);
          setGvResultState(true)
        }).catch((error) => {
          console.error(error);
        })
    }else if (type == "fnLotNoByRoll") {
      await axios
        .post("/api/common/fnGetLotData", { strLOTNO: params })
        .then((response) => {
 
          if (response.data !=''){
            setProduct_result(response.data[0].LOT_PRD_NAME);
            setLotNo_result(response.data[0].LOT);
          }
 
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  
  const predefinedColumns =[ 
    {
    title: "Sheet No.",
    dataIndex: "sheet_no",
    key: "sheet_no",
    align: "center",
    width:30,
    render: (text, record, index) => {
      return text;
    },
  },
  {
    title: "OK",
    dataIndex: "ok",
    key: "ok",
    align: "center",
    width:30,
    render: (text, record, index) => {
      return text;
    },
  },
  {
    title: "NG",
    dataIndex: "ng",
    key: "ng",
    align: "center",
    width:30,
    render: (text, record, index) => {
      return text;
    },
  },
  ]
  const dynamicColumns = Object.keys(gvResult[0]||{})
    .filter(key => !['sheet_no', 'ok', 'ng'].includes(key))
    .map(key => ({
      title: `${key}`,
      dataIndex: key,
      key: key,
      align: "center",
      width: 10,
      render: (text) => (
        <span style={{ color: text === 'NG' ? 'red' : 'inherit' }}>
          {text}
        </span>
      ),
    }));
  const columns = [...predefinedColumns, ...dynamicColumns];

  const exportExcelFile = () => {
    if (gvResult == '' || gvResult == null || gvResult == []) {
      Swal.fire({
        icon: 'error',
        title: 'No Data to Export',
        showConfirmButton: false,
        timer: 1000,
      })
    }
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("My Sheet");
    sheet.properties.defaultRowHeight = 20;
    const columns = [
      { header: "Sheet No.", key: "sheet_no", width: 30, style: { alignment: { horizontal: 'center' } } }
    ];
  
    const dynamicColumns = Object.keys(gvResult[0])
      .filter(key => !['sheet_no', 'ok', 'ng'].includes(key))
      .map(key => ({
        header: `${key}`,
        key: key,
        width: 5,
        style: { alignment: { horizontal: 'center' } },
      }));
  
    sheet.columns = [...columns, ...dynamicColumns];
  
    gvResult.forEach((row) => {
      const newRow = sheet.addRow(row);
      newRow.eachCell((cell) => {
        cell.alignment = { horizontal: 'center' };       
        if (cell.value === 'NG') {
          cell.font = {color : { argb: 'FF0000' } } 
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
        top: { style: 'thick' },
      };
    });
    sheet.eachRow((row, rowNumber) => {
      const firstCell = row.getCell(1);
      const lastCell = row.getCell(row.cellCount);
      firstCell.border = {
        left: { style: 'thick' }

      };
      lastCell.border = {
        right: { style: 'thick' }
      };
    });

    const lastRow = sheet.getRow(sheet.rowCount);
    lastRow.eachCell((cell) => {
      cell.border = {
        bottom: { style: 'thick' },
      };
    });
    sheet.eachRow((row, rowNumber) => {
      const firstCell = row.getCell(1);
      const lastCell = row.getCell(row.cellCount);
  
      if (rowNumber === sheet.rowCount) {
        firstCell.border = {
          bottom: { style: 'thick' },
          left: { style: 'thick' }
        };
        lastCell.border = {
          bottom: { style: 'thick' },
          right: { style: 'thick' }
        };
      } if (rowNumber === 1) {
        firstCell.border = {
          top: { style: 'thick' },
          left: { style: 'thick' }
        };
        lastCell.border = {
          top: { style: 'thick' },
          right: { style: 'thick' }
        };
      }

    });  
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: "application/octet-stream" });
      saveAs(blob, `${lotNo_result}_${resultValue}.xlsx`);
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
    exportExcelFile
  };
}

export { fn_SheetBadMarkView };
