import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import ExcelJS from "exceljs";
import Swal from "sweetalert2";

function fn_FinalGate_History() {
    //link
    const searchParams = new URLSearchParams(window.location.search);
    let Serial = searchParams.get("SERIAL");
    let Inspecno = searchParams.get("INSPECT_NO");
    const plantCode = import.meta.env.VITE_FAC;

    //table
    const [gvViewFinal, setgvViewFinal] = useState([]);

    useEffect(() => {
        if (Serial !== null) {
            Serial = searchParams.get("SERIAL");
            Inspecno = searchParams.get("INSPECT_NO");
        } else {
            Inspecno = "0";
        }
        ViewData();
    }, []);

    const ViewData = async () => {
        let dt = [];
        try {
            await axios.post("/api/ViewTracePiece/getfinalgatehistory", {
                strplantcode: plantCode,
                strserialno: Serial,
                strinspectno: Inspecno
            })
                .then((res) => {
                    dt = res.data;
                });
            console.log(dt)
            setgvViewFinal(dt);
        } catch (error) {
            console.log(error.message);
        }
    };

    const formatDate = (dateString) => {
        const [datePart, timePart] = dateString.split("T");
        const [year, month, day] = datePart.split("-");
        const [hours, minutes, secondsWithFraction] = timePart.split(":");

        const seconds = secondsWithFraction.split(".")[0];

        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    };

    const columns = [
        {
            title: "PLANT_CODE",
            dataIndex: "plant_code",
            key: "PLANT_CODE",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "SERIAL_NO",
            dataIndex: "serial_no",
            key: "SERIAL_NO",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "INSPECT_COUNT",
            dataIndex: "inspect_count",
            key: "INSPECT_COUNT",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "LOT_NO",
            dataIndex: "lot_no",
            key: "LOT_NO",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "PRODUCT_NAME",
            dataIndex: "product_name",
            key: "PRODUCT_NAME",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "ELT_RESULT",
            dataIndex: "elt_result",
            key: "ELT_RESULT",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "FINAL_RESULT",
            dataIndex: "final_result",
            key: "FINAL_RESULT",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "REMARKS",
            dataIndex: "elt_remarks",
            key: "REMARKS",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "UPDATE_BY",
            dataIndex: "update_by",
            key: "UPDATE_BY",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "UPDATE_PROGRAM",
            dataIndex: "update_program",
            key: "UPDATE_PROGRAM",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "UPDATE_DATE",
            dataIndex: "update_date",
            key: "UPDATE_DATE",
            align: "center",
            render: (text, record, index) => {
                return formatDate(text);
            },
        },
    ]

//Export
const BtnExport = async (nameFile) => {
    if (gvViewFinal.length <= 0) {
      Swal.fire({
        icon: "error",
        title: "No Data Export!",
      });
    } else {
      console.log(nameFile, "nameFile");
      exportExcelFile(gvViewFinal, nameFile);
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
        gvViewFinal, columns, BtnExport, Serial
    }
};

export { fn_FinalGate_History };