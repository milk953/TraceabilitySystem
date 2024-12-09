import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import ExcelJS from "exceljs";
import Swal from "sweetalert2";

function fn_PREResult() {
    const params = new URLSearchParams(window.location.search);
    let sheet_no = params.get("sheet_no");
    let product_name = params.get("PRODUCT_NAME");
    let piece_no = params.get("piece_no");
    let pre_result = params.get("pre_result");
    const plantCode = import.meta.env.VITE_FAC;
    const Now = new Date().toLocaleTimeString("en-GB", { hour12: false });

    //table
    const [gvViewPRE, setgvViewPRE] = useState([]);
    const [lbl_Message, setlbl_Message] = useState("");
    const [lblMessageColor, setlblMessageColor] = useState("#059212");

    useEffect(() => {
        PageLoad();
    }, []);

    const PageLoad = async () => {
        let dt2 = [];
        let dt = [];

        try {
            if (piece_no !== null) {
                await axios.post("/api/ViewTracePiece/getposition", {
                    strplantcode: plantCode,
                    strprdname: product_name,
                    intpieceno: piece_no
                })
                    .then((res) => {
                        dt2 = res.data;
                    });
            }
        } catch (error) {
            setlbl_Message(error.message);
            setlblMessageColor("#BA0900");
        }

        try {

            if (dt2.length > 0) {

                await axios.post("/api/ViewTracePiece/getpreresult", {
                    strplantcode: plantCode,
                    strsheetno: sheet_no,
                    strprdname: product_name,
                    intpieceno: piece_no
                })
                    .then((res) => {
                        dt = res.data;
                    });
            } else {
                await axios.post("/api/ViewTracePiece/getpreresult2", {
                    strplantcode: plantCode,
                    strsheetno: sheet_no,
                    pieceno: piece_no
                })
                    .then((res) => {
                        dt = res.data;
                    });
            }

            setgvViewPRE(dt);

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

    const columnsPRE = [
        {
            title: "LINK",
            dataIndex: "prd_seq",
            key: "LINK",
            align: "center",
            render: (text, record) => {
                return (
                    <a href={record.image_name} target="_blank" rel="noopener noreferrer">
                        {record.prd_seq}
                    </a>
                );
            },
        },
        {
            title: "PRD_PLANT_CODE",
            dataIndex: "prd_plant_code",
            key: "PRD_PLANT_CODE",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "PRD_SHEET_NO",
            dataIndex: "prd_sheet_no",
            key: "PRD_SHEET_NO",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "PRD_NG_DETAIL",
            dataIndex: "prd_ng_detail",
            key: "PRD_NG_DETAIL",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "PRD_BLOCK_NO",
            dataIndex: "prd_block_no",
            key: "PRD_BLOCK_NO",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "PRD_STEP_NO",
            dataIndex: "prd_step_no",
            key: "PRD_STEP_NO",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "PRD_REFER",
            dataIndex: "prd_refer",
            key: "PRD_REFER",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "PRD_LIB_PART_NAME",
            dataIndex: "prd_lib_part_name",
            key: "PRD_LIB_PART_NAME",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "PRD_STEP_POS",
            dataIndex: "prd_step_pos",
            key: "PRD_STEP_POS",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "PRD_STEP_X2",
            dataIndex: "prd_step_x2",
            key: "PRD_STEP_X2",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "PRD_STEP_Y1",
            dataIndex: "prd_step_y1",
            key: "PRD_STEP_Y1",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "PRD_STEP_Y2",
            dataIndex: "prd_step_y2",
            key: "PRD_STEP_Y2",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "PRD_MEASURE_NUM",
            dataIndex: "prd_measure_num",
            key: "PRD_MEASURE_NUM",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "PRD_CREATE_BY",
            dataIndex: "prd_create_by",
            key: "PRD_CREATE_BY",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "PRD_CREATE_PROGRAM",
            dataIndex: "prd_create_program",
            key: "PRD_CREATE_PROGRAM",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "PRD_CREATE_BY",
            dataIndex: "create_by",
            key: "PRD_CREATE_BY",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "PRD_CREATE_PROGRAM",
            dataIndex: "create_program",
            key: "PRD_CREATE_PROGRAM",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "PRD_CREATE_DATE",
            dataIndex: "prd_create_date",
            key: "PRD_CREATE_DATE",
            align: "center",
            render: (text, record, index) => {
                return formatDate(text);
            },
        },
    ];

    const btnExport = async (nameFile) => {
        let dt2 = [];
        let dt = [];
        try {
            if (piece_no !== null) {
                await axios.post("/api/ViewTracePiece/getposition", {
                    strplantcode: plantCode,
                    strprdname: product_name,
                    intpieceno: piece_no
                })
                    .then((res) => {
                        dt2 = res.data;
                    });
            }
            if (pre_result === "OK") {
                await axios.post("/api/ViewTracePiece/getpreresult3", {
                    strplantcode: plantCode,
                    strsheetno: sheet_no
                })
                    .then((res) => {
                        dt = res.data;
                    });
            } else {
                if (dt2.length > 0) {

                    await axios.post("/api/ViewTracePiece/getpreresult", {
                        strplantcode: plantCode,
                        strsheetno: sheet_no,
                        strprdname: product_name,
                        intpieceno: piece_no
                    })
                        .then((res) => {
                            dt = res.data;
                        });
                } else {
                    await axios.post("/api/ViewTracePiece/getpreresult2", {
                        strplantcode: plantCode,
                        strsheetno: sheet_no,
                        pieceno: piece_no
                    })
                        .then((res) => {
                            dt = res.data;
                        });
                }
            }

            if (dt.length > 0) {
                exportExcelFile(dt, nameFile);
                setlbl_Message("CSV export Complete.");
                setlblMessageColor("#059212");
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "No Data Export!",
            });
            setlbl_Message("error", error.message);
            setlblMessageColor("#BA0900");
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
        gvViewPRE, lbl_Message, lblMessageColor, columnsPRE, btnExport, Now
    }
};

export { fn_PREResult };