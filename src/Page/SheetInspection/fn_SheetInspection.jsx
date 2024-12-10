import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

function fn_SheetInspection() {
    const [txtProductFrom, settxtProductFrom] = useState("");
    const [txtProductTo, settxtProductTo] = useState("");
    const [txtLotFrom, settxtLotFrom] = useState("");
    const [txtLotTo, settxtLotTo] = useState("");
    const [txtRollFrom, settxtRollFrom] = useState("");
    const [txtRollTo, settxtRollTo] = useState("");
    const [txtInvFrom, settxtInvFrom] = useState("");
    const [txtInvTo, settxtInvTo] = useState("");
    const [txtDateFrom, settxtDateFrom] = useState("");
    const [txtDateTo, settxtDateTo] = useState("");
    const [selectcbx, setselectcbx] = useState("");
    const [gvDataXOut, setgvDataXOut] = useState({ visible: false, value: [] })
    const [gvDataSheet, setgvDataSheet] = useState({ visible: false, value: [] })
    const [pnlGridWidth, setpnlGridWidth] = useState("1620px");

    //inputRef
    const inputProduct = useRef([]);

    useEffect(() => {
        reset();
        setselectcbx("cbxXOut");
        setTimeout(() => {
            inputProduct.current.focus();
        }, 200);
    }, []);

    const handleChangecbx = (event) => {
        setselectcbx(event.target.value);
    };

    const btnExecute_Click = async () => {
        if (selectcbx === "cbxXOut") {
            setpnlGridWidth("1620px");
            setgvDataXOut(prevState => ({ ...prevState, visible: true }));
            setgvDataSheet(prevState => ({ ...prevState, visible: false }));
            await getDataXOutResult();
            console.log()
        } else {
            setpnlGridWidth("1020px");
            setgvDataSheet(prevState => ({ ...prevState, visible: true }));
            setgvDataXOut(prevState => ({ ...prevState, visible: false }));
            await getDataXOutResult();
        }
    };

    const btnExport_Click = async () => {
        let nameFile = '';
        if (gvDataXOut.visible) {
            nameFile = `SheetInspectionXOut.xls`;
            exportExcelFile(gvDataXOut.value, nameFile);
        } else {
            nameFile = `SheetInspectionSheetNo.xls`;
            exportExcelFile(gvDataSheet.value, nameFile);
        }
    };

    const reset = async () => {
        setgvDataXOut(prevState => ({ ...prevState, value: [] }));
    };

    const getDataXOutResult = async () => {
        let dtData = [];
        let strPrdFrom = "";
        let strPrdTo = "";
        let strLotFrom = "";
        let strLotTo = "";
        let strRollFrom = "";
        let strRollTo = "";
        let strDateFrom = "";
        let strDateTo = "";
        let strInvFrom = "";
        let strInvTo = "";
        let strInvLot = "";

        if (txtProductFrom === "") {
            strPrdFrom = "ALL";
        } else {
            strPrdFrom = txtProductFrom.toUpperCase().trim();
        }

        if (txtProductTo === "") {
            strPrdTo = "ALL";
        } else {
            strPrdTo = txtProductTo.toUpperCase().trim();
        }

        if (txtLotFrom === "") {
            strLotFrom = "ALL";
        } else {
            strLotFrom = txtLotFrom.toUpperCase().trim();
        }

        if (txtLotTo === "") {
            strLotTo = "ALL";
        } else {
            strLotTo = txtLotTo.toUpperCase().trim();
        }

        if (txtRollFrom === "") {
            strRollFrom = "ALL";
        } else {
            strRollFrom = txtRollFrom.toUpperCase().trim();
        }

        if (txtRollTo === "") {
            strRollTo = "ALL";
        } else {
            strRollTo = txtRollTo.toUpperCase().trim();
        }

        if (txtDateFrom === "") {
            strDateFrom = "ALL";
        } else {
            strDateFrom = txtRollTo.toUpperCase().trim();
        }

        if (txtDateTo === "") {
            strDateTo = "ALL";
        } else {
            strDateTo = txtDateTo.toUpperCase().trim();
        }

        if (txtInvFrom === "" || txtInvTo === "") {
            strInvLot = "ALL";
        } else {
            strInvFrom = txtInvFrom.toUpperCase().trim();
            strInvTo = txtInvTo.toUpperCase().trim();
            await axios.post("/api/SheetInspec/GetSerialAVIResult", {
                strInvNoFrom: strInvFrom,
                strInvNoTo: strInvTo
            })
                .then((res) => {
                    strInvLot = res.data;
                });
        }

        if (selectcbx === "cbxXOut") {
            await axios.post("/api/SheetInspec/GetSheetInspectXOutData", {
                strprdfrom: strPrdFrom,
                strprdto: strPrdTo,
                strlotfrom: strLotFrom,
                strlotto: strLotTo,
                strrollfrom: strRollFrom,
                strrollto: strRollTo,
                strdatefrom: strDateFrom,
                strdateto: strDateTo,
                strinvoicelot: strInvLot
            })
                .then((res) => {
                    dtData = res.data;
                });
            setgvDataXOut(prevState => ({ ...prevState, value: dtData }));
        } else {
            await axios.post("/api/SheetInspec/GetSheetInspectSheetNoData", {
                strprdfrom: strPrdFrom,
                strprdto: strPrdTo,
                strlotfrom: strLotFrom,
                strlotto: strLotTo,
                strrollfrom: strRollFrom,
                strrollto: strRollTo,
                strdatefrom: strDateFrom,
                strdateto: strDateTo,
                strinvoicelot: strInvLot
            })
                .then((res) => {
                    dtData = res.data;
                });
                console.log(dtData)
            setgvDataSheet(prevState => ({ ...prevState, value: dtData }));
        }
    };

    const columnsXOutData = [
        {
            title: "Product",
            key: "Product",
            dataIndex: "prd_name",
            align: "center",
            width: '140px',
            render: (text, record, index) => {
                return text;
            },
            // width: 100,
            
        },
        {
            title: "Packing Date",
            key: "Packing Date",
            dataIndex: "packing_date",
            align: "center",
            width: '100px',
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "Packing By",
            key: "Packing By",
            dataIndex: "packing_by",
            align: "center",
            width: '90px',
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "BIN",
            key: "BIN",
            dataIndex: "bin_name",
            align: "center",
            width: '40px',
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "Shift",
            key: "Shift",
            dataIndex: "shift",
            align: "center",
            width: '50px',
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "Week Code",
            key: "Week Code",
            dataIndex: "week_no",
            align: "center",
            width: '90px',
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "Roll No.",
            key: "Roll No.",
            dataIndex: "roll_no",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "Lot No.",
            key: "Lot No.",
            dataIndex: "lot_no",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "Total Scan",
            key: "Total Scan",
            dataIndex: "total_sht_qty",
            align: "center",
            width: '80px',
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "Total",
            key: "Total",
            dataIndex: "total_xout_qty",
            align: "center",
            width: '50px',
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "GOOD",
            key: "GOOD",
            dataIndex: "sht_x0",
            align: "center",
            width: '60px',
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "1X-OUT",
            key: "1X-OUT",
            dataIndex: "sht_x1",
            align: "center",
            width: '70px',
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "2X-OUT",
            key: "2X-OUT",
            dataIndex: "sht_x2",
            align: "center",
            width: '70px',
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "3X-OUT",
            key: "3X-OUT",
            dataIndex: "sht_x3",
            align: "center",
            width: '70px',
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "4X-OUT",
            key: "4X-OUT",
            dataIndex: "sht_x4",
            align: "center",
            width: '70px',
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "5X-OUT",
            key: "5X-OUT",
            dataIndex: "sht_x5",
            align: "center",
            width: '70px',
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "6X-OUT",
            key: "6X-OUT",
            dataIndex: "sht_x6",
            align: "center",
            width: '70px',
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "7X-OUT",
            key: "7X-OUT",
            dataIndex: "sht_x7",
            align: "center",
            width: '70px',
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "8X-OUT",
            key: "8X-OUT",
            dataIndex: "sht_x8",
            align: "center",
            width: '70px',
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "Total",
            key: "Total",
            dataIndex: "total_pcs_qty",
            align: "center",
            width: '50px',
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "GOOD",
            key: "GOOD",
            dataIndex: "pcs_x0",
            align: "center",
            width: '60px',
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "1X-OUT",
            key: "1X-OUT",
            dataIndex: "pcs_x1",
            align: "center",
            width: '70px',
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "2X-OUT",
            key: "2X-OUT",
            dataIndex: "pcs_x2",
            align: "center",
            width: '70px',
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "3X-OUT",
            key: "3X-OUT",
            dataIndex: "pcs_x3",
            align: "center",
            width: '70px',
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "4X-OUT",
            key: "4X-OUT",
            dataIndex: "pcs_x4",
            align: "center",
            width: '70px',
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "5X-OUT",
            key: "5X-OUT",
            dataIndex: "pcs_x5",
            align: "center",
            width: '70px',
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "6X-OUT",
            key: "6X-OUT",
            dataIndex: "pcs_x6",
            align: "center",
            width: '70px',
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "7X-OUT",
            key: "7X-OUT",
            dataIndex: "pcs_x7",
            align: "center",
            width: '70px',
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "8X-OUT",
            key: "8X-OUT",
            dataIndex: "pcs_x8",
            align: "center",
            width: '70px',
            render: (text, record, index) => {
                return text;
            },
        },
    ];

    const columnsSheetNoData = [
        {
            title: "Product",
            key: "Product",
            dataIndex: "prd_name",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "Packing Date",
            key: "Packing Date",
            dataIndex: "packing_date",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "Packing By",
            key: "Packing By",
            dataIndex: "packing_by",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "Shift",
            key: "Shift",
            dataIndex: "shift",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "Week Code",
            key: "Week Code",
            dataIndex: "week_no",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "Roll No.",
            key: "Roll No.",
            dataIndex: "roll_no",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "Lot No.",
            key: "Lot No.",
            dataIndex: "lot_no",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "Total Scan",
            key: "Total Scan",
            dataIndex: "total_sht_qty",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "BIN",
            key: "BIN",
            dataIndex: "bin_name",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "Seq",
            key: "Seq",
            dataIndex: "seq",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "Sheet No.",
            key: "Sheet No.",
            dataIndex: "sheet_no",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "Scan By",
            key: "Scan By",
            dataIndex: "scan_by",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "Scan Date",
            key: "Scan Date",
            dataIndex: "scan_date",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
    ];

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
        txtProductFrom, settxtProductFrom, txtProductTo, settxtProductTo, txtLotFrom, settxtLotFrom, txtLotTo, settxtLotTo, txtRollFrom, settxtRollFrom,
        txtRollTo, settxtRollTo, txtInvFrom, settxtInvFrom, txtInvTo, settxtInvTo, txtDateFrom, settxtDateFrom, txtDateTo, settxtDateTo, selectcbx,
        gvDataXOut, gvDataSheet, pnlGridWidth, handleChangecbx, btnExecute_Click, btnExport_Click, columnsXOutData, columnsSheetNoData, inputProduct
    }
};

export { fn_SheetInspection };