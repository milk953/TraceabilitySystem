import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Tag } from "antd";
import { Tooltip, Avatar } from "antd";
import excel from "/src/assets/excel.png";
import ExcelJS from "exceljs";
import { values } from "lodash";
import Column from "antd/es/table/Column";

function fn_Result() {
  const [txtLotNo, settxtLotNo] = useState("");
  const [tblData1, settblData1] = useState("");
  const [ColumntblData1, setColumntblData1] = useState([]);
  const [DatatblData1, setDatatblData1] = useState([]);

  const Fac = import.meta.env.VITE_FAC;
  const params = new URLSearchParams(window.location.search);
  const Url = window.location.href;
  const Page = Url.split("/").pop().split("?")[0];
  let sheet_no = params.get("sheet_no");
  let panel_no = params.get("panel_no");
  let PRODUCT_NAME = params.get("PRODUCT_NAME");

  //เข้ามาแล้วSearch
  useEffect(() => {
    if (panel_no == "") {
      panel_no = null;
    }
    if (Page == "AOICOAResult2") {
      GetDataAOICOAResult();
      setColumntblData1(columnsAoiCoaResult2);
    } else if (Page == "SPIResult") {
      GetDataSPIResult();
      setColumntblData1(columnsSPIResult);
    }
    else if(Page=='PREResult2'){

    }
  }, []);

  //AOI_COA_Result
  const GetDataAOICOAResult = async () => {
    await axios
      .post("/api/Result/GetAoi_Coa_Result2", {
        dataList: {
          PRODUCT_NAME: PRODUCT_NAME,
          plant_code: Fac,
          panel_no: panel_no,
          sheet_no: sheet_no,
        },
      })
      .then((res) => {
        console.log(res.data);
        settblData1(res.data);
        setDatatblData1(res.data);
      });
  };

  //Use
  // const columnstblData1= [
  //   {
  //     title: "Link",
  //     dataIndex: "LINK",
  //     key: "Link",
  //     render: (text, record, index) => {
  //       return text;
  //     },
  //     align: "center",
  //     width:45
  //   },
  //   {
  //     title: "PLANT_CODE",
  //     dataIndex: "PLANT_CODE",
  //     key: "PLANT_CODE",
  //     align: "center",
  //     render: (text, record, index) => {
  //       return text;
  //     },
  //   },
  //   {
  //     title: "SHEET_NO",
  //     dataIndex: "SHEET_NO",
  //     key: "SHEET_NO",
  //     align: "center",
  //     render: (text, record, index) => {
  //       return text;
  //     },
  //   },

  //   {
  //     title: "CABITY_NO",
  //     key: "CABITY_NO",
  //     dataIndex: "CABITY_NO",
  //     align: "center",
  //     render: (text, record, index) => {
  //       return text;
  //     },
  //   },
  //   {
  //     title: "SEQ",
  //     key: "SEQ",
  //     dataIndex: "SEQ",
  //     align: "center",
  //     render: (text, record, index) => {
  //       return text;
  //     },
  //     width:50
  //   },
  //   {
  //     title: "INS_COUNT",
  //     dataIndex: "INS_COUNT",
  //     key: "INS_COUNT",
  //     render: (text, record, index) => {
  //       return text;
  //     },
  //     align: "center",
  //   },
  //   {
  //     title: "MACHINE_NAME",
  //     dataIndex: "MACHINE_NAME",
  //     key: "MACHINE_NAME",
  //     align: "center",
  //     render: (text, record, index) => {
  //       return text;
  //     },
  //   },
  //   {
  //     title: "REFERENCE",
  //     dataIndex: "REFERENCE",
  //     key: "REFERENCE",
  //     align: "center",
  //     render: (text, record, index) => {
  //       return text;
  //     },
  //   },

  //   {
  //     title: "POSITION",
  //     key: "POSITION",
  //     dataIndex: "POSITION",
  //     align: "center",
  //     render: (text, record, index) => {
  //       return text;
  //     },
  //   },
  //   {
  //     title: "INSPECT_DATE",
  //     key: "INSPECT_DATE",
  //     dataIndex: "INSPECT_DATE",
  //     align: "center",
  //     render: (text, record, index) => {
  //       return text;
  //     },
  //   },
  //   {
  //     title: "LOT_NO",
  //     dataIndex: "LOT_NO",
  //     key: "LOT_NO",
  //     render: (text, record, index) => {
  //       return text;
  //     },
  //     align: "center",
  //   },
  //   {
  //     title: "RESULT",
  //     dataIndex: "RESULT",
  //     key: "RESULT",
  //     align: "center",
  //     render: (text, record, index) => {
  //       return text;
  //     },
  //     width:70
  //   },
  //   {
  //     title: "PROGRAM_NAME",
  //     dataIndex: "PROGRAM_NAME",
  //     key: "PROGRAM_NAME",
  //     align: "center",
  //     render: (text, record, index) => {
  //       return text;
  //     },
  //   },

  //   {
  //     title: "IMAGE_PATH",
  //     key: "IMAGE_PATH",
  //     dataIndex: "IMAGE_PATH",
  //     align: "center",
  //     render: (text, record, index) => {
  //       return text;
  //     },
  //   },
  //   {
  //     title: "COMPONENT",
  //     key: "COMPONENT",
  //     dataIndex: "COMPONENT",
  //     align: "center",
  //     render: (text, record, index) => {
  //       return text;
  //     },
  //   },
  //   {
  //     title: "CREATE_BY",
  //     dataIndex: "CREATE_BY",
  //     key: "CREATE_BY",
  //     render: (text, record, index) => {
  //       return text;
  //     },
  //     align: "center",
  //   },
  //   {
  //     title: "CREATE_PROGRAM",
  //     dataIndex: "CREATE_PROGRAM",
  //     key: "CREATE_PROGRAM",
  //     align: "center",
  //     render: (text, record, index) => {
  //       return text;
  //     },
  //   },
  //   {
  //     title: "CREATE_DATE",
  //     dataIndex: "CREATE_DATE",
  //     key: "CREATE_DATE",
  //     align: "center",
  //     render: (text, record, index) => {
  //       return text;
  //     },
  //   },

  // ];

  //test

  const columnsAoiCoaResult2 = [
    {
      title: "Link",
      dataIndex: "link", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "link",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 45,
    },
    {
      title: "PLANT_CODE",
      dataIndex: "plant_code", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "plant_code",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
      width: 70,
    },
    {
      title: "SHEET_NO",
      dataIndex: "sheet_no", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "sheet_no",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
      width: 190,
    },
    {
      title: "CABITY_NO",
      key: "cabity_no", // เปลี่ยนเป็นพิมพ์เล็ก
      dataIndex: "cabity_no", // เปลี่ยนเป็นพิมพ์เล็ก
      align: "center",
      render: (text, record, index) => {
        return text;
      },
      width: 70,
    },
    {
      title: "SEQ",
      key: "seq", // เปลี่ยนเป็นพิมพ์เล็ก
      dataIndex: "seq", // เปลี่ยนเป็นพิมพ์เล็ก
      align: "center",
      render: (text, record, index) => {
        return text;
      },
      width: 50,
    },
    {
      title: "INS_COUNT",
      dataIndex: "ins_count", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "ins_count",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 90,
    },
    {
      title: "MACHINE_NAME",
      dataIndex: "machine_name", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "machine_name",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
      width: 90,
    },
    {
      title: "REFERENCE",
      dataIndex: "reference", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "reference",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
      width: 90,
    },
    {
      title: "POSITION",
      key: "position", // เปลี่ยนเป็นพิมพ์เล็ก
      dataIndex: "position", // เปลี่ยนเป็นพิมพ์เล็ก
      align: "center",
      render: (text, record, index) => {
        return text;
      },
      width: 90,
    },
    {
      title: "INSPECT_DATE",
      key: "inspect_date", // เปลี่ยนเป็นพิมพ์เล็ก
      dataIndex: "inspect_date", // เปลี่ยนเป็นพิมพ์เล็ก
      align: "center",
      render: (text, record, index) => {
        return text;
      },
      width: 110,
    },
    {
      title: "LOT_NO",
      dataIndex: "lot_no", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "lot_no",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 110,
    },
    {
      title: "RESULT",
      dataIndex: "result", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "result",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
      width: 70,
    },
    {
      title: "PROGRAM_NAME",
      dataIndex: "program_name", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "program_name",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "IMAGE_PATH",
      key: "image_path", // เปลี่ยนเป็นพิมพ์เล็ก
      dataIndex: "image_path", // เปลี่ยนเป็นพิมพ์เล็ก
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "COMPONENT",
      key: "component", // เปลี่ยนเป็นพิมพ์เล็ก
      dataIndex: "component", // เปลี่ยนเป็นพิมพ์เล็ก
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "CREATE_BY",
      dataIndex: "create_by", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "create_by",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
    },
    {
      title: "CREATE_PROGRAM",
      dataIndex: "create_program", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "create_program",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "CREATE_DATE",
      dataIndex: "create_date", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "create_date",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
  ];

  //SPI_Result
  const GetDataSPIResult = async () => {
    let dtCheck = [];
    await axios
      .post("/api/Result/SPIResult_getCheckData", {
        dataList: {
          strProduct: PRODUCT_NAME,
          strPlantCode: Fac,
          strPanelNo: panel_no,
        },
      })
      .then((res) => {
        console.log(res.data,'position_v');
        if(res.data.length>0){
            dtCheck = res.data[0].position_v;
        }
       
      });

    await axios
      .post("/api/Result/SPIResult_Getfinaldata", {
        dataList: {
          strPlantCode: Fac,
          strPanelNo: panel_no,
          strProduct: PRODUCT_NAME,
          strSheetNo: sheet_no,
          strdtCheck: dtCheck,
          strExport: "0",
        },
      })
      .then((res) => {
        console.log(res.data,'SPIResult_Getfinaldata');
        settblData1(res.data)
      });

      await axios
      .post("/api/Result/SPIResult_Getfinaldata", {
        dataList: {
          strPlantCode: Fac,
          strPanelNo: panel_no,
          strProduct: PRODUCT_NAME,
          strSheetNo: sheet_no,
          strdtCheck: dtCheck,
          strExport: "1",
        },
      })
      .then((res) => {
        console.log(res.data,'SPIResult_GetfinaldataExport');
        setDatatblData1(res.data)
      });
  };

  const columnsSPIResult = [
    {
      title: "PLANT_CODE",
      dataIndex: "PLANT_CODE", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "PLANT_CODE",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "SHEET_NO",
      dataIndex: "SHEET_NO", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "SHEET_NO",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "CABITY_NO",
      key: "CABITY_NO", // เปลี่ยนเป็นพิมพ์เล็ก
      dataIndex: "CABITY_NO", // เปลี่ยนเป็นพิมพ์เล็ก
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "PAD_ID",
      key: "PAD_ID", // เปลี่ยนเป็นพิมพ์เล็ก
      dataIndex: "PAD_ID", // เปลี่ยนเป็นพิมพ์เล็ก
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "INS_COUNT",
      dataIndex: "INS_COUNT", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "INS_COUNT",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
    },
    {
      title: "MACHINE_NAME",
      dataIndex: "MACHINE_NAME", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "MACHINE_NAME",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "HEIGHT_UM",
      dataIndex: "HEIGHT_UM", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "HEIGHT_UM",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "VOLUME_P",
      key: "VOLUME_P", // เปลี่ยนเป็นพิมพ์เล็ก
      dataIndex: "VOLUME_P", // เปลี่ยนเป็นพิมพ์เล็ก
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "AREA_P",
      key: "AREA_P", // เปลี่ยนเป็นพิมพ์เล็ก
      dataIndex: "AREA_P", // เปลี่ยนเป็นพิมพ์เล็ก
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "OFFSETX_MM",
      dataIndex: "OFFSETX_MM", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "OFFSETX_MM",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
    },
    {
      title: "OFFSETY_MM",
      dataIndex: "OFFSETY_MM", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "OFFSETY_MM",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "SIZE_X",
      dataIndex: "SIZE_X", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "SIZE_X",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "SIZE_Y",
      key: "SIZE_Y", // เปลี่ยนเป็นพิมพ์เล็ก
      dataIndex: "SIZE_Y", // เปลี่ยนเป็นพิมพ์เล็ก
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "VOLUME_UM3",
      key: "VOLUME_UM3", // เปลี่ยนเป็นพิมพ์เล็ก
      dataIndex: "VOLUME_UM3", // เปลี่ยนเป็นพิมพ์เล็ก
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "AREA_UM2",
      dataIndex: "AREA_UM2", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "AREA_UM2",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
    },
    {
      title: "BARCODE",
      dataIndex: "BARCODE", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "BARCODE",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "PCB_ID",
      dataIndex: "PCB_ID", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "PCB_ID",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "PANEL",
      dataIndex: "PANEL", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "PANEL",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "CARRIERBOARD_NO",
      dataIndex: "CARRIERBOARD_NO", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "CARRIERBOARD_NO",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "POSX",
      dataIndex: "POSX", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "POSX",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "POSY",
      dataIndex: "POSY", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "POSY",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "OFFSETX_ERR",
      dataIndex: "OFFSETX_ERR", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "OFFSETX_ERR",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "OFFSETY_ERR",
      dataIndex: "OFFSETY_ERR", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "OFFSETY_ERR",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "OFFSETX_P",
      dataIndex: "OFFSETX_P", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "OFFSETX_P",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "OFFSETY_P",
      dataIndex: "OFFSETY_P", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "OFFSETY_P",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "INSPECT_DATE",
      dataIndex: "INSPECT_DATE", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "INSPECT_DATE",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "IMAGE_PATH",
      dataIndex: "IMAGE_PATH", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "IMAGE_PATH",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "CREATE_BY",
      dataIndex: "CREATE_BY", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "CREATE_BY",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "CREATE_PROGRAM",
      dataIndex: "CREATE_PROGRAM", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "CREATE_PROGRAM",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "CREATE_DATE",
      dataIndex: "CREATE_DATE", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "CREATE_DATE",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
  ];

//Export
  const BtnExport = async (nameFile) => {
    if (tblData1.length <= 0) {
      Swal.fire({
        icon: "error",
        title: "No Data Export!",
      });
    } else {
      console.log(nameFile, "nameFile");
      exportExcelFile(DatatblData1, nameFile);
    }
  };

  const exportExcelFile = (data, namefile) => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("My Sheet");
    sheet.properties.defaultRowHeight = 20;

    // สร้างคอลัมน์แบบ dynamic
    const dynamicColumns = Object.keys(data[0] || {}).map((key) => ({
      header: key.toUpperCase(), // ทำให้ header เป็นตัวพิมพ์ใหญ่
      key: key,
      width: 10, // กำหนดขนาดความกว้างเริ่มต้น
      style: { alignment: { horizontal: "center" } },
    }));

    sheet.columns = dynamicColumns;

    // ถ้าไม่มีข้อมูลก็สร้างแถวว่าง
    if (data.length === 0) {
      const emptyRow = {};
      dynamicColumns.forEach((col) => (emptyRow[col.key] = "")); // เติมค่าค่าว่าง
      data.push(emptyRow);
    }

    // ใส่ข้อมูลลงใน sheet
    data.forEach((row) => {
      const newRow = sheet.addRow(row);
      newRow.eachCell({ includeEmpty: true }, (cell) => {
        // includeEmpty เพื่อให้ทุก cell รวมถึงที่ว่างมีเส้นขอบ
        cell.alignment = { horizontal: "center" };

        // เพิ่มเส้นขอบให้ทุก cell
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
    });

    // จัดรูปแบบให้แถวแรก (header)
    const firstRow = sheet.getRow(1);
    firstRow.eachCell({ includeEmpty: true }, (cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFF00" }, // สีพื้นหลังเหลือง
      };
      cell.font = {
        name: "Roboto",
        size: 9,
        bold: true,
      };

      // เพิ่มเส้นขอบให้ header
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    // กำหนดความกว้างของคอลัมน์ให้พอดีกับข้อความ
    sheet.columns.forEach((column) => {
      let maxWidth = column.header.length; // เริ่มต้นความกว้างจากความยาวของ header
      data.forEach((row) => {
        const cellValue = String(row[column.key] || ""); // แปลงค่าเป็นสตริง
        maxWidth = Math.max(maxWidth, cellValue.length); // คำนวณความกว้างสูงสุด
      });
      column.width = maxWidth + 2; // เพิ่มขนาดพิเศษเล็กน้อยเพื่อความสบาย
    });

    // สร้างไฟล์ Excel
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: "application/octet-stream" });
      saveAs(blob, `${namefile}`);
    });
  };

  return { tblData1, ColumntblData1, BtnExport };
}

export { fn_Result };
