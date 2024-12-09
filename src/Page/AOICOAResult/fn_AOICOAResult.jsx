import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import ExcelJS from "exceljs";
import Swal from "sweetalert2";

function fn_AOICOAResult() {
    const params = new URLSearchParams(window.location.search);
    let sheetno = params.get("sheet_no");
    let prdname = params.get("PRODUCT_NAME");
    let Panelno = params.get("panel_no");
    const plantCode = import.meta.env.VITE_FAC;
    const Now = new Date().toLocaleTimeString("en-GB", { hour12: false });

    //table
    const [gvViewAOICOA, setgvViewAOICOA] = useState([]);
    const [lbl_Message, setlbl_Message] = useState("");
    const [lblMessageColor, setlblMessageColor] = useState("#059212");

    useEffect(() => {
        Viewdata();
    }, []);

    const Viewdata = async () => {
        try {
            await axios.post("/api/ViewTracePiece/getaoicoaresult", {
                strprdname: prdname,
                strplantcode: plantCode,
                panelno: Panelno,
                strsheetno: sheetno,
            })
                .then((res) => {
                    setgvViewAOICOA(res.data);
                });
        } catch (error) {
            setlbl_Message(error.message);
            setlblMessageColor("#BA0900");
        }
    };

    const formatDate = (dateString) => {
        const [datePart, timePart] = dateString.split("T");
        const [year, month, day] = datePart.split("-");
        const [hours, minutes, secondsWithFraction] = timePart.split(":");

        const seconds = secondsWithFraction.split(".")[0];

        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    };

    const columnsAoiCoaResult = [
        {
            title: "Link",
            dataIndex: "link",
            key: "link",
            render: (text, record) => {
                return (
                    <a href={record.image_name} target="_blank" rel="noopener noreferrer">
                        {record.link}
                    </a>
                );
            },
            align: "center",
            width: 45,
        },
        {
            title: "AOR_PLANT_CODE",
            dataIndex: "plant_code",
            key: "plant_code",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
            width: 70,
        },
        {
            title: "AOR_SHEET_NO",
            dataIndex: "sheet_no",
            key: "sheet_no",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
            width: 190,
        },
        {
            title: "CABITY_NO",
            key: "cabity_no",
            dataIndex: "cabity_no",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
            width: 70,
        },
        {
            title: "AOR_SEQ",
            key: "seq",
            dataIndex: "seq",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
            width: 50,
        },
        {
            title: "AOR_INSPECT_COUNT",
            dataIndex: "ins_count",
            key: "ins_count",
            render: (text, record, index) => {
                return text;
            },
            align: "center",
            width: 90,
        },
        {
            title: "AOR_MACHINE_NAME",
            dataIndex: "machine_name",
            key: "machine_name",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
            width: 90,
        },
        {
            title: "AOR_REFERENCE",
            dataIndex: "reference",
            key: "reference",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
            width: 90,
        },
        {
            title: "AOR_POSITION",
            key: "p_position",
            dataIndex: "p_position",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
            width: 90,
        },
        {
            title: "AOR_INSPECT_DATE",
            key: "inspect_date",
            dataIndex: "inspect_date",
            align: "center",
            render: (text, record, index) => {
                return formatDate(text);
            },
            width: 110,
        },
        {
            title: "AOR_LOT_NO",
            dataIndex: "lot_no",
            key: "lot_no",
            render: (text, record, index) => {
                return text;
            },
            align: "center",
            width: 110,
        },
        {
            title: "AOR_RESULT",
            dataIndex: "result",
            key: "result",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
            width: 70,
        },
        {
            title: "AOR_PROGRAM_NAME",
            dataIndex: "program_name",
            key: "program_name",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "AOR_IMAGE_PATH",
            key: "image_path",
            dataIndex: "image_path",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "AOR_COMPONENT",
            key: "component",
            dataIndex: "component",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "AOR_CREATE_BY",
            dataIndex: "create_by",
            key: "create_by",
            render: (text, record, index) => {
                return text;
            },
            align: "center",
        },
        {
            title: "AOR_CREATE_PROGRAM",
            dataIndex: "create_program",
            key: "create_program",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "AOR_CREATE_DATE",
            dataIndex: "create_date",
            key: "create_date",
            align: "center",
            render: (text, record, index) => {
                return formatDate(text);
            },
        },
    ];

    //Export
    const btnExport = async (nameFile) => {
        if (gvViewAOICOA.length <= 0) {
            Swal.fire({
                icon: "error",
                title: "No Data Export!",
            });
        } else {
            exportExcelFile(gvViewAOICOA, nameFile);
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
        gvViewAOICOA, columnsAoiCoaResult, btnExport, lbl_Message, lblMessageColor, Now
    }
};

export { fn_AOICOAResult };