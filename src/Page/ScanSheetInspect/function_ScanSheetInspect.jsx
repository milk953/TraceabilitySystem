import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import * as XLSX from 'xlsx';
import { Tag } from "antd";

function fn_ScanSheetInspect() {
    const [txtLotNo, settxtLotNo] = useState("");
    const [txtProduct, settxtProduct] = useState("");
    const [txtRollNo, settxtRollNo] = useState("");
    const [txtScanBy, settxtScanBy] = useState("");
    const [txtScanDate, settxtScanDate] = useState("");
    const [selShift, setselShift] = useState('A');
    const [txtWeekCode, settxtWeekCode] = useState("");
    const [selBinNo, setselBinNo] = useState("");
    const [ddlBinNoData, setddlBinNoData] = useState([]);
    const [txtShtNo, settxtShtNo] = useState("");
    const [labellog, setlabellog] = useState("");
    const [visiblelog, setvisiblelog] = useState(false);
    const [pnlSuccess, setpnlSuccess] = useState(false);
    const [pnlSerial, setpnlSerial] = useState(false);

    //hiddenfield
    const [hfBINGroup, sethfBINGroup] = useState("");
    const [hfControlBy, sethfControlBy] = useState("");
    const [hfCheckFlg, sethfCheckFlg] = useState("");
    const [hfSerialStart, sethfSerialStart] = useState("");
    const [hfSerialEnd, sethfSerialEnd] = useState("");
    const [hfControlStart, sethfControlStart] = useState("");
    const [hfControlEnd, sethfControlEnd] = useState("");
    const [hfMode, sethfMode] = useState("");
    const hfUserID = localStorage.getItem("ipAddress");
    const hfUserStation = localStorage.getItem("ipAddress");
    const [hfUserFactory, sethfUserFactory] = useState("");


    //Table
    const [gvScanResult, setgvScanResult] = useState(false);
    const [gvScanData, setgvScanData] = useState([]);
    const [gvExport, setgvExport] = useState(false);
    const [gvExportData, setgvExportData] = useState([]);

    const [isBinNoDisabled, setisBinNoDisabled] = useState(false);
    const [isShtNoDisabled, setisShtNoDisabled] = useState(false);
    const [istxtLotDisabled, setistxtLotDisabled] = useState(false);

    const inputLot = useRef(null);
    const inputScanBy = useRef(null);
    const ddlShtBin = useRef(null);
    const inputShtNo = useRef(null);
    const inputScanDate = useRef(null);
    const selShtXOut = useRef(null);
    const btnCancel = useRef(null);

    useEffect(() => {
        PageLoad();
    }, []);

    const PageLoad = async () => {
        sethfMode("");
        sethfBINGroup("");
        sethfControlBy("");
        fetchData();
        SetMode("LOT");
    };

    const fetchData = async () => {
        try {
            const res = await axios.post("/api/Common/getworkingdate");
            const result = res.data.Result.rows[0].system_date;
            settxtScanDate(result);
        } catch (error) {
            console.error('Error fetching workingdate:', error.message);
        }
    };

    const ClearLot = () => {
        settxtLotNo("");
        inputLot.current.focus();
    }

    const handleLotNo = async () => {
        let strPrdName = "";
        let RollNo = "";
        let strLot = "";

        const strLotData = txtLotNo.toUpperCase().split(";");
        strLot = strLotData[0];

        if (strLot != "") {
            settxtLotNo(strLot);
            await axios.post("/api/Common/getProductDataByLot", {
                strLot: strLot,
            })
                .then((res) => {
                    let dtData = res.data.flat().flat();
                    if (dtData.length > 0) {
                        strPrdName = dtData[0][0];
                        settxtRollNo(dtData[0][1]);
                    }
                });
            console.log(strPrdName);

            await axios.post("/api/Common/getProductShtGroup", {
                strprdname: strPrdName
            })
                .then(async (res) => {
                    let dtGroup = res.data;
                    console.log("dtGroup", dtGroup);
                    if (strPrdName !== "" && dtGroup !== "") {
                        settxtProduct(strPrdName);
                        sethfBINGroup(dtGroup.bin_group);
                        sethfControlBy(dtGroup.control_type);
                        sethfCheckFlg(dtGroup.check_flg);
                        sethfSerialStart(dtGroup.serial_start_digit);
                        sethfSerialEnd(dtGroup.serial_end_digit);
                        sethfControlStart(dtGroup.control_start_digit);
                        sethfControlEnd(dtGroup.control_end_digit);
                        console.log("hfBINGroup", dtGroup.bin_group);
                        if (dtGroup.control_type === "ROLL" && txtRollNo === "") {
                            settxtLotNo("");
                            settxtProduct("");
                            sethfBINGroup("");
                            sethfControlBy("");
                            sethfCheckFlg("N");
                            sethfSerialStart("");
                            sethfSerialEnd("");
                            setlabellog("Not found roll no.");
                            SetMode("LOT_ERROR");
                            sethfMode("LOT");
                        } else {
                            await setDDLSheetBIN(dtGroup.bin_group);
                            await getSheetInspectData();
                            SetMode("DATE");
                        }
                    } else if (strPrdName !== "") {
                        settxtLotNo("");
                        setlabellog("Product " + strPrdName + " not found in master.");
                        SetMode("LOT_ERROR");
                        sethfMode("LOT");
                    } else {
                        settxtLotNo("");
                        setlabellog("Lot " + strLot + " not found");
                        SetMode("LOT_ERROR");
                        sethfMode("LOT");
                    }
                });
        }
    };

    const [exportReady, setExportReady] = useState(false);

    useEffect(() => {
        if (exportReady) {
            ExportToExcel();
            setExportReady(false); 
        }
    }, [exportReady, gvExportData]);

    const ibtExportClick = async () => {
        try {
            const res = await axios.post("/api/getProductShtInsByLot", {
                strType: hfControlBy,
                strLot: txtLotNo,
                strRollNo: txtRollNo,
                strPrdName: txtProduct
            });
            const data = res.data;
            setgvExportData(data);
            setExportReady(true);
        } catch (error) {
            console.error('Error fetching binno:', error.message);
        }
    };

    const dataTableexport = [...gvExportData];
    // console.log("gvexport:", dataTableexport);
    const ExportToExcel = () => {
        const ScanSheetInspect = [
            [
                "Seq",
                "Roll No.",
                "Lot No.",
                "Product",
                "Scan Date",
                "Shift",
                "Week Code",
                "Bin No.",
                "Sheet No.",
                "Update Date",
            ],
            ...dataTableexport.map((item) => [
                item.seq,
                item.roll_no,
                item.lot_no,
                item.product,
                item.scan_date,
                item.shift,
                item.week_code,
                item.bin_no,
                item.sheet_no,
                item.update_date,
            ])
        ];
        const ws = XLSX.utils.aoa_to_sheet(ScanSheetInspect);
        const wb = XLSX.utils.book_new();

        const fileName = hfControlBy === "LOT" ? `${txtProduct}_${txtLotNo}` : `${txtProduct}_${txtRollNo}`;
        XLSX.utils.book_append_sheet(wb, ws, fileName);
        XLSX.writeFile(wb, `${fileName}.xlsx`);
    };

    const ibtDateRefresh = async () => {
        fetchData();
        inputScanDate.current.focus();
    };

    const setDDLSheetBIN = async (hfBINGroup) => {
        try {
            const res = await axios.post("/api/Common/getProductShtBIN", {
                strBinGroup: hfBINGroup,
            });
            let dtshtbin = res.data;
            setddlBinNoData(dtshtbin);
            setselBinNo("-select-");
        } catch (error) {
            console.error('Error fetching binno:', error.message);
        }
    };

    const handleselShtBin = async (value) => {
        setselBinNo(value);
        await getSheetInspectData(value);
        selShtXOut.current?.focus();
        console.log(value,'handleselShtBin')
    };

    const [boolDup, setboolDup] = useState(false);

    const handleShtNo = async () => {

        let strError = "";
        let strCheckValue = "";
        let strSheetNo = txtShtNo.toUpperCase().trim();

        if (txtShtNo.trim() != "") {
            if (txtWeekCode.length !== 4) {
                setlabellog("Please input correct week code.");
                SetMode("SHEET_ERROR");
            } else if (txtScanBy.trim() === "") {
                setlabellog("Please input scan by.");
                SetMode("SHEET_ERROR");
            } else {
                try {
                    const res = await axios.post("/api/Common/getproductshtinspectdup", {
                        strLotno: txtLotNo,
                        strSheetno: strSheetNo
                    });
                    const data = res.data;
                    setboolDup(data);
                } catch (error) {
                    console.error('Error getinspectdup:', error.message);
                }
                console.log("boolDup",boolDup);
                if (boolDup) {
                    setlabellog("Please confirm for delete?");
                    SetMode("SHEET_CONFIRM");
                } else {
                    if (hfControlBy === "LOT") {
                        strCheckValue = txtLotNo.toUpperCase().trim();
                    } else {
                        strCheckValue = txtRollNo.toUpperCase().trim().replace("-", "");
                    }
                    if (hfCheckFlg === "Y") {
                        if (
                            strCheckValue.substring(
                                parseInt(hfControlStart) - 1,
                                parseInt(hfControlEnd)
                            ) !==
                            strSheetNo.substring(
                                parseInt(hfSerialStart) - 1,
                                parseInt(hfSerialEnd)
                            )
                        ) {
                            strError = "Serial mix lot";
                        }
                    }

                    if (strError === "") {
                        await axios.post("/api/SetLotSheetIns", {
                            strLot: txtLotNo,
                            strShtNo: txtShtNo,
                            strPrdName: txtProduct,
                            strRollNo: txtRollNo,
                            strScanBy: txtScanBy,
                            strDate: txtScanDate,
                            strShift: selShift,
                            strWeekNo: txtWeekCode,
                            strBinGrp: hfBINGroup,
                            strBinNo: selBinNo,
                            strUserID: hfUserID,
                            strStation: hfUserStation,
                            strFlag: "I"
                        })
                            .then((res) => {
                                strError = res.data.p_error;
                            });
                        if (strError === "") {
                            SetMode("SHEET_OK");
                        } else {
                            setlabellog("Error: " + strError);
                            SetMode("SHEET_ERROR");
                        }
                    } else {
                        setlabellog("Error: " + strError);
                        SetMode("SHEET_ERROR");
                    }
                }
            }
        } else {
            SetMode("SHEET");
        }
        getSheetInspectData();
    };

    const getSheetInspectData = async (selBinNo) => {
        console.log("มาไหม", hfBINGroup, selBinNo);
        try {
            const res = await axios.post("/api/getProductShtInspect", {
                strLot: txtLotNo,
                strPrdName: txtProduct,
                strBinGrp: hfBINGroup,
                strBinNo: selBinNo,
            });
            const data = res.data;
            
            setgvScanData(data);
            if (data.length > 0) {
                setgvScanResult(true);
            }
            console.log("naaa", data.length,data);
        } catch (error) {
            console.error('Error fetching getProductShtIn:', error.message);
        }
    };

    const btDelShtClick = async () => {
        let strError = "";
        await axios.post("/api/SetLotSheetIns", {
            strLot: txtLotNo,
            strShtNo: txtShtNo,
            strPrdName: txtProduct,
            strRollNo: txtRollNo,
            strScanBy: txtScanBy,
            strDate: txtScanDate,
            strShift: selShift,
            strWeekNo: txtWeekCode,
            strBinGrp: hfBINGroup,
            strBinNo: selBinNo,
            strUserID: hfUserID,
            strStation: hfUserStation,
            strFlag: "D"
        })
            .then((res) => {
                strError = res.data.p_error;
            });
        if (strError === "") {
            settxtShtNo("");
            setlabellog("Deleted complete.");
            setvisiblelog(true);
            setpnlSerial(false);
            getSheetInspectData();
            inputShtNo.current.focus();
        } else {
            setlabellog("Error: " + strError);
            SetMode("SHEET_ERROR");
        }
    };

    const btDelLotClick = async () => {
        let strError = "";
        await axios.post("/api/SetLotSheetIns", {
            strLot: txtLotNo,
            strShtNo: "%",
            strPrdName: "%",
            strRollNo: "%",
            strScanBy: "%",
            strDate: "%",
            strShift: "%",
            strWeekNo: "%",
            strBinGrp: "%",
            strBinNo: "%",
            strUserID: "%",
            strStation: "%",
            strFlag: "D"
        })
            .then((res) => {
                strError = res.data.p_error;
            });
        if (strError === "") {
            settxtShtNo("");
            setlabellog("Deleted complete.");
            setvisiblelog(true);
            setpnlSerial(false);
            getSheetInspectData();
            inputShtNo.current.focus();
        } else {
            setlabellog("Error: " + strError);
            SetMode("SHEET_ERROR");
        }
    };

    const btCancelClick = () => {
        setpnlSuccess(false);
        setpnlSerial(false);
        settxtShtNo("");
        inputShtNo.current.focus();
    }

    const SetMode = (strType) => {
        if (strType === "LOT") {
            settxtLotNo("");
            settxtProduct("");
            setselBinNo("");
            setisBinNoDisabled(true);
            settxtShtNo("");
            setisShtNoDisabled(true);
            setlabellog("");
            setvisiblelog(false);
            setpnlSuccess(false);
            setpnlSerial(false);
            setgvScanData([]);
            sethfMode("LOT");
            inputLot.current.focus();
        } else if (strType === "LOT_ERROR") {
            settxtLotNo("");
            settxtProduct("");
            setselBinNo("");
            setisBinNoDisabled(true);
            settxtShtNo("");
            setisShtNoDisabled(true);
            setvisiblelog(true);
            setpnlSuccess(false);
            setpnlSerial(false);
            sethfMode("LOT");
            inputLot.current.focus();
        } else if (strType === "DATE") {
            setistxtLotDisabled(true);
            setisBinNoDisabled(false);
            setisShtNoDisabled(false);
            setlabellog("");
            setvisiblelog(false);
            setpnlSuccess(false);
            setpnlSerial(false);
            settxtWeekCode("");
            inputScanBy.current?.focus();
        } else if (strType === "SHEET") {
            setistxtLotDisabled(true);
            setisBinNoDisabled(false);
            setisShtNoDisabled(false);
            setlabellog("");
            setvisiblelog(false);
            setpnlSuccess(false);
            setpnlSerial(false);
            sethfMode("SHEET");
            ddlShtBin.current.focus();
        } else if (strType === "SHEET_ERROR") {
            settxtShtNo("");
            setistxtLotDisabled(true);
            setvisiblelog(true);
            setpnlSerial(false);
            setpnlSuccess(false);
            inputShtNo.current.focus();
        } else if (strType === "SHEET_CONFIRM") {
            setistxtLotDisabled(true);
            setvisiblelog(true);
            setpnlSerial(true);
            setpnlSuccess(false);
            btnCancel.current?.focus();
        } else if (strType === "SHEET_OK") {
            settxtShtNo("");
            setlabellog("");
            setvisiblelog(false);
            setpnlSerial(false);
            setpnlSuccess(true);
            inputShtNo.current.focus();
        }
    };

    const columns = [
        {
            title: "No.",
            dataIndex: "seq",
            key: "seq",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "Roll No.",
            dataIndex: "roll_no",
            key: "roll_no",
            align: "left",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "Lot No.",
            key: "lot_no",
            dataIndex: "lot_no",
            align: "left",

            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "Shift",
            key: "shift",
            dataIndex: "shift",
            align: "center",

            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "Week Code",
            key: "week_no",
            dataIndex: "week_no",
            align: "center",

            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "Bin",
            key: "bin_no",
            dataIndex: "bin_no",
            align: "center",

            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "Sheet No.",
            key: "sheet",
            dataIndex: "sheet",
            align: "center",

            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "Scan By",
            key: "scan_by",
            dataIndex: "scan_by",
            align: "center",

            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "Scan Date",
            key: "scan_date",
            dataIndex: "scan_date",
            align: "center",

            render: (text, record, index) => {
                return text;
            },
        },
    ];

    return {
        txtLotNo, settxtLotNo, ClearLot, txtProduct, settxtProduct, txtRollNo, settxtRollNo, txtScanBy, settxtScanBy,
        txtScanDate, settxtScanDate, selShift, setselShift, txtWeekCode, settxtWeekCode, selBinNo, ddlShtBin,
        txtShtNo, labellog, visiblelog, pnlSuccess, handleLotNo, inputLot, pnlSerial, gvScanResult, inputScanDate,
        ibtDateRefresh, ddlBinNoData, istxtLotDisabled, isBinNoDisabled, isShtNoDisabled, handleselShtBin, gvScanData,
        handleShtNo, ibtExportClick, inputScanBy, inputShtNo, btnCancel, btDelShtClick, btDelLotClick, settxtShtNo,
        btCancelClick, columns
    }
}

export { fn_ScanSheetInspect };