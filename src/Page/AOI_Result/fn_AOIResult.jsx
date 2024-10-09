import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import ExcelJS from "exceljs";
import Swal from "sweetalert2";

function fn_AOIResult() {
    //link
    const searchParams = new URLSearchParams(window.location.search);
    let Sheetno = searchParams.get("sheet_no");
    let Prdname = searchParams.get("PRODUCT_NAME");
    let panelno = searchParams.get("panel_no");
    const plantCode = import.meta.env.VITE_FAC;

    //table
    const [gvViewAOI, setgvViewAOI] = useState([]);
    const [lbl_Message, setlbl_Message] = useState("");
    const [lblMessageColor, setlblMessageColor] = useState("#059212");

    useEffect(() => {
        if (Sheetno !== null && Prdname !== null ) {
            Sheetno = searchParams.get("sheet_no");
            Prdname = searchParams.get("PRODUCT_NAME");
            panelno = searchParams.get("panel_no");
        }
        ViewData();
    }, []);

    const ViewData = async () => {
        let dt = [];
        try {
            await axios.post("/api/ViewTracePiece/getaoiresult", {
                strplantcode: plantCode,
                strsheetno: Sheetno,
                strprdname: Prdname,
                strpanelno: panelno
            })
                .then((res) => {
                    dt = res.data;
                });
            console.log(dt)
            setgvViewAOI(dt);
        } catch (error) {
            console.log(error.message);
        }
    };

    const columns = [
        {
            title: "LINK",
            dataIndex: "link",
            key: "LINK",
            align: "center",
            render: (text, record) => {
                return (
                    <a href={record.image_name} target="_blank" rel="noopener noreferrer">
                        {record.seq}
                    </a>
                );
            },
        },
        {
            title: "AOR_PLANT_CODE",
            dataIndex: "plant_code",
            key: "AOR_PLANT_CODE",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "AOR_SHEET_NO",
            dataIndex: "sheet_no",
            key: "AOR_SHEET_NO",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "CABITY_NO",
            dataIndex: "cabity_no",
            key: "CABITY_NO",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "AOR_SEQ",
            dataIndex: "seq",
            key: "AOR_SEQ",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "AOR_INSPECT_COUNT",
            dataIndex: "ins_count",
            key: "AOR_INSPECT_COUNT",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "AOR_MACHINE_NO",
            dataIndex: "machine_name",
            key: "AOR_MACHINE_NO",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "AOR_REFERENCE",
            dataIndex: "reference",
            key: "AOR_REFERENCE",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "AOR_POSITION",
            dataIndex: "p_position",
            key: "AOR_POSITION",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "AOR_INSPECT_DATE",
            dataIndex: "inspect_date",
            key: "AOR_INSPECT_DATE",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "AOR_LOT_NO",
            dataIndex: "lot_no",
            key: "AOR_LOT_NO",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "AOR_RESULT",
            dataIndex: "result",
            key: "AOR_RESULT",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "AOR_PROGRAM_NAME",
            dataIndex: "program_name",
            key: "AOR_PROGRAM_NAME",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "AOR_IMAGE_PATH",
            dataIndex: "image_path",
            key: "AOR_IMAGE_PATH",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "AOR_COMPONENT",
            dataIndex: "component",
            key: "AOR_COMPONENT",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "AOR_CREATE_BY",
            dataIndex: "create_by",
            key: "AOR_CREATE_BY",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "AOR_CREATE_PROGRAM",
            dataIndex: "create_program",
            key: "AOR_CREATE_PROGRAM",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "AOR_CREATE_DATE",
            dataIndex: "create_date",
            key: "AOR_CREATE_DATE",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
    ]

//Export
const BtnExport = async (nameFile) => {
    if (gvViewAOI.length <= 0) {
      Swal.fire({
        icon: "error",
        title: "No Data Export!",
      });
      setlbl_Message("error", title);
      setlblMessageColor("#BA0900");

    } else {
      console.log(nameFile, "nameFile");
      exportExcelFile(gvViewAOI, nameFile);
      setlbl_Message("CSV export Complete.");
      setlblMessageColor("#059212");
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

  return {
    gvViewAOI, columns, BtnExport, lbl_Message, lblMessageColor
  }
};

export { fn_AOIResult };