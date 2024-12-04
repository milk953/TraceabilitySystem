import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Tag } from "antd";
import { Tooltip, Avatar } from "antd";
import excel from "/src/assets/excel.png";
import { values } from "lodash";

function fn_LotRollLeafNo() {
  const [txtProd, settxtProd] = useState("");
  const [txtRollNo, settxtRollNo] = useState({
    label: "",
    value: "",
    visible: "",
    style: {},
  });
  const [tblLeafNo, settblLeafNo] = useState({
    label: "",
    value: "",
    visible: "",
    style: {},
  });
  //

  //link
  const params = new URLSearchParams(window.location.search);
  const lot = params.get("LOTNO");
  const ROLL = params.get("ROLLNO");
  const Prod = params.get("product");
  const Fac = import.meta.env.VITE_FAC;

  //เข้ามาแล้วSearch
  useEffect(() => {
    console.log("Roll");
    if (ROLL != null) {
      if (ROLL != "") {
        settxtRollNo((prevState) => ({
          ...prevState,
          label: "Roll No.",
          value: ROLL,
        }));
        settxtProd(Prod);
        setGrid(ROLL);
      }
    } else if (lot != null) {
      if (lot != "") {
        settxtRollNo((prevState) => ({
          ...prevState,
          label: "Lot No.",
          value: lot,
        }));
        settxtProd(Prod);
        setGrid(lot);
      }
    }
  }, []);

  const reset = async () => {
    settxtProd("_ _ _ _ _ _ _ _ _ _ _ _");
    settxtRollNo((prevState) => ({
      ...prevState,
      value: "_ _ _ _ _ _ _ _ _ _ _ _",
    }));
  };

  const setGrid = async (strRollNO) => {
    console.log("setGrid", strRollNO);
    let dtRollLeaf = [];
    await axios
      .post("/api/ViewTraceLot/fnLotRollLeafNo", {
        strRollNO: strRollNO,
      })
      .then((res) => {
        for (let i = 0; i < res.data.length; i += 5) {
          dtRollLeaf.push(res.data.slice(i, i + 5));
        }

        dtRollLeaf = dtRollLeaf.map((group, index) => {
          return {
            key: index,
            LEAF1: group[0] ? group[0].roll_leaf_no : "",
            LEAF2: group[1] ? group[1].roll_leaf_no : "",
            LEAF3: group[2] ? group[2].roll_leaf_no : "",
            LEAF4: group[3] ? group[3].roll_leaf_no : "",
            LEAF5: group[4] ? group[4].roll_leaf_no : "",
          };
        });
        console.log("dtRollLeaf", dtRollLeaf);
        settblLeafNo((prevState) => ({
          ...prevState,
          value: dtRollLeaf,
        }));
      });
  };

  const btnExport_Click = async () => {
    let strType = "";
    let datagvFinalExport = [];
    if (txtRollNo.label == "Lot No.") {
      strType = "LOT";
    } else {
      strType = "ROLL";
    }
    console.log(txtRollNo.label, "btnExport_Click", strType);
    await axios
      .post("/api/ViewTraceLot/fnLotRollLeafByLotData", {
        dataList:{        
          strNo: txtRollNo.value,
          strPlantCode:Fac,
          strType:strType}

      })
      .then((res) => {
        if(res.data.length>0){
          datagvFinalExport = res.data;
          ExportGridToCSV(datagvFinalExport,columnsExport,'RollLeaf'+txtRollNo.value+'.xls')
        }
        else{
          Swal.fire({
            title: "No Data Export!",
            icon: "error",
          });
        }
        
      });
      
      
      
  };

  const columns = [
    {
      title: "LEAF-NO. 1",
      dataIndex: "LEAF1",
      key: "LEAF-NO. 1",
      render: (text, record, index) => {
        return createLink(text);
      },
      align: "center",
    },
    {
      title: "LEAF-NO. 2",
      dataIndex: "LEAF2",
      key: "LEAF-NO. 2",
      align: "center",
      render: (text, record, index) => {
        return createLink(text);
      },
    },
    {
      title: "LEAF-NO. 3",
      dataIndex: "LEAF3",
      key: "LEAF-NO. 3",
      align: "center",
      render: (text, record, index) => {
        return createLink(text);
      },
    },

    {
      title: "LEAF-NO. 4",
      key: "LEAF-NO. 4",
      dataIndex: "LEAF4",
      align: "center",
      render: (text, record, index) => {
        return createLink(text);
      },
    },
    {
      title: "LEAF-NO. 5",
      key: "LEAF-NO. 5",
      dataIndex: "LEAF5",
      align: "center",
      render: (text, record, index) => {
        return createLink(text);
      },
    },
  ];

  const columnsExport = [
    {
      key: "SHR_PLANT_CODE",
    },
    {
      key: "SHR_LOT_NO",
    },
    {
      key: "SHR_ROLL_NO",
    },
    {
      key: "SHR_ROLL_LEAF",
    },
    {
      key: "SHR_SHEET_NO",
    },
    {
      key: "SHR_SHEET_SEQ",
    },
    {
      key: "SHR_SEQ_NO",
    },
    {
      key: "SHR_PRODUCT_NAME",
    },
    {
      key: "SHR_MACHINE_NAME",
    },
    {
      key: "SHR_INS_DATE",
    },
    {
      key: "SHR_OPERATOR",
    },
    {
      key: "SHR_CONFIRM_FLG",
    },
    {
      key: "SHR_CONFIRM_REMARK",
    },
    {
      key: "SHR_CONFIRM_DATE",
    },
    {
      key: "SHR_PACKING_FLG",
    },
    {
      key: "SHR_PACKING_DATE",
    },
    {
      key: "SHR_CREATE_BY",
    },
    {
      key: "SHR_CREATE_PROGRAM",
    },
    {
      key: "SHR_CREATE_DATE",
    },
    {
      key: "SHR_UPDATE_BY",
    },
    {
      key: "SHR_UPDATE_PROGRAM",
    },
    {
      key: "SHR_UPDATE_DATE",
    },
  ];
  const createLink= (text) => {
    return (
      <a
        href={`/TraceabilitySystem/RollTraceView?ROLLLEAF=${text}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {text}
      </a>
    );
  };
  const ExportGridToCSV = (data, ColumnsHeader, namefile) => {
    console.log(data, "---", ColumnsHeader, "---", namefile);
  
    const filteredColumns = ColumnsHeader.filter(
      (col) => col.key && col.key !== null && col.key !== undefined
    );
  
    const headers = filteredColumns.map((col) => col.key);
  
    const filteredData = data.map((row) =>
      filteredColumns.map((col) => {
        const value = row[col.key];
        return value === null || value === "[NULL]" || value === undefined
          ? ""
          : value;
      })
    );
  
    const wsData = [headers, ...filteredData];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
  
    // ตั้งค่า style สำหรับเซลล์ในแถวแรก (หัวคอลัมน์)
    const range = XLSX.utils.decode_range(ws["!ref"]);
    for (let C = range.s.c; C <= range.e.c; C++) {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: C });
      if (!ws[cellAddress]) continue;
  
      ws[cellAddress].s = {
        fill: {
          fgColor: { rgb: "FFFF00" } // สีเหลือง
        },
        font: {
          bold: true, // ตัวหนา
          color: { rgb: "000000" } // สีตัวอักษรเป็นสีดำ
        },
      };
    }
  
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  
    const blobData = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
  
    saveAs(blobData, namefile);
  };
  

  return { tblLeafNo, txtProd, txtRollNo, columns,btnExport_Click };
}

export { fn_LotRollLeafNo };
