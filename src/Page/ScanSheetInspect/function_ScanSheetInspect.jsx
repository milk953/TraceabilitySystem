import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import * as XLSX from 'xlsx';

function fn_ScanSheetInspect() {
    const [txtLotNo, settxtLotNo] = useState("");
    const [txtProduct, settxtProduct] = useState("");
    const [txtRollNo, settxtRollNo] = useState("");
    const [txtScanBy, settxtScanBy] = useState("");
    const [txtScanDate, settxtScanDate] = useState("");
    const [selShift, setselShift] = useState('A');
    const [txtWeekCode, settxtWeekCode] = useState("");
    const [selBinNo, setselBinNo] = useState("");
    const [BinNo, setBinNo] = useState([]);
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
    const [hfUserID, sethfUserID] = useState("");
    const [hfUserStation, sethfUserStation] = useState("");
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
    const selShtBin = useRef(null);
    const inputShtNo = useRef(null);
    const inputScanDate = useRef(null);
    const selShtXOut = useRef(null);
    const btnCancel = useRef(null);

    const ClearLot = () => {
        settxtLotNo("");
        inputLot.current.focus();
    }

    const handleLotNo = () => {
        let strPrdName = "";
        let RollNo = "";
        let strLot = "";

        const strLotData = txtLotNo.toUpperCase().split(";");
        strLot = strLotData[0];

        if (strLot != "") {
            settxtLotNo(strLot);
            axios.post("/api/Common/getProductDataByLot", {
                txtlotno: strLot,
            })
                .then((res) => {
                    if (res.data.length > 0) {
                        strPrdName = res.data.flat()[0];
                        settxtRollNo(res.data.flat()[1]);
                    }
                })

            axios.post("/api/getProductShtGroup", {
                strprdname: strPrdName
            })
                .then((res) => {
                    if (strPrdName != "" && res.data.length > 0) {
                        settxtProduct(strPrdName);
                        sethfBINGroup(res.data.bin_group);
                        sethfControlBy(res.data.control_type);
                        sethfCheckFlg(res.data.check_flg);
                        sethfSerialStart(res.data.serial_start_digit);
                        sethfSerialEnd(res.data.serial_end_digit);
                        sethfControlStart(res.data.control_start_digit);
                        sethfControlEnd(res.data.control_end_digit);
                        if (hfControlBy === "ROLL" && txtRollNo === "") {
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
                            setselBinNo(hfBINGroup);
                            setgvScanResult(true);
                            handlegvScanResult();
                            SetMode("DATE");
                        }
                    } else if (strPrdName != "") {
                        settxtLotNo("");
                        setlabellog("Product " + strPrdName + " not found in master.");
                        setvisiblelog(true);
                        sethfMode("LOT");
                    } else {
                        settxtLotNo("");
                        setlabellog("Lot " + strLot + " not found");
                        setvisiblelog(true);
                        // setgvScanResult(true); //ลองโชว์ Table เฉยๆ
                        sethfMode("LOT");
                    }
                });
        }
    };

    useEffect(() => {
        localStorage.setItem("hfUserID", localStorage.getItem("ip"));
        localStorage.setItem("hfUserStation", localStorage.getItem("ip"));
        localStorage.setItem("hfMode", "");
        localStorage.setItem("hfBINGroup", "");
        localStorage.setItem("hfControlBy", "");
        fetchData();
        SetMode("LOT");
    }, []);

    const fetchData = async () => {
        try {
            const res = await axios.post("/api/Common/getworkingdate");
            const result = res.data.Result.rows[0].system_date;
            settxtScanDate(result);
        } catch (error) {
            console.error('Error fetching workingdate:', error.message);
        }
    };

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
            console.log("gvexport:", data);
        } catch (error) {
            console.error('Error fetching binno:', error.message);
        }
        ExportToExcel();

    }

    const dataTableexport = [...gvExportData];
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
            ...dataTableexport.map((item, index) => [
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

    useEffect(() => {
        BinNoData();
        // handlegvScanResult(); //ทดสอบว่ามีข้อมูลมามั้ย
    }, []);

    const BinNoData = async (strBinGroup) => {
        try {
            const res = await axios.post("/api/getProductShtBIN", {
                bingroup: strBinGroup,
            });
            const data = res.data;
            setBinNo(data);
            console.log("kkk", data);
        } catch (error) {
            console.error('Error fetching binno:', error.message);
        }
    };

    const handleselShtBin = async (event) => {
        const selBinNo = event.target.value;
        setselBinNo(selBinNo);
        handlegvScanResult();
        setgvScanResult(true);
        selShtXOut.current.focus();
    };

    const [boolDup, setboolDup] = useState([]);

    const handleShtNo = async () => {

        let strError = "";
        let strCheckValue = "";
        let strSheetNo = txtShtNo.toUpperCase().trim();

        if (strSheetNo != "") {
            if (txtWeekCode.trim().length !== 4) {
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
                    console.error('Error fetching getinspectdup:', error.message);
                }
                if (boolDup) {
                    setlabellog("Please confirm for delete?");
                    SetMode("SHEET_CONFIRM");
                } else {
                    if (hfControlBy === "LOT") {
                        strCheckValue = txtLotNo.toUpperCase().trim();
                    } else {
                        strCheckValue = txtRollNo.toUpperCase().trim().replace(/-/g, "");
                    }
                    if (hfCheckFlg === "Y") {
                        if (
                            strCheckValue.substring(
                                parseInt(hfControlStart),
                                parseInt(hfControlEnd) - parseInt(hfControlStart) + 1
                            ) !==
                            strSheetNo.substring(
                                parseInt(hfSerialStart),
                                parseInt(hfSerialEnd) - parseInt(hfSerialStart) + 1
                            )
                        ) {
                            strError = "Serial mix lot";
                        }
                    }
                    if (strError === "") {
                        strError === SetLotSheetIns();
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
        handlegvScanResult();
        setgvScanResult(true);
    };

    const SetLotSheetIns = async () => {
        try {
            const res = await axios.post("/api/SetLotSheetIns", {
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
            });
            console.log("บันทึกข้อมูลสำเร็จ =", res);
        } catch (error) {
            console.error('Error fetching SetLotSheetIns:', error.message);
        }
    };

    const handlegvScanResult = async () => {

        let strControlBy = ""
        sethfControlBy(strControlBy);

        try {
            const res = await axios.post("/api/getProductShtInspect", {
                strLot: txtLotNo,
                strPrdName: txtProduct,
                strBinGrp: hfBINGroup,
                strBinNo: selBinNo,
            });
            const data = res.data;
            setgvScanData(data);
            console.log("naaa", data);
        } catch (error) {
            console.error('Error fetching getProductShtIn:', error.message);
        }
    };

    const btDelShtClick = () => {
        let strError = "";
        strError = SetLotSheetIns();
        if (strError === "") {
            settxtShtNo("");
            setlabellog("Deleted complete.");
            setvisiblelog(true);
            setpnlSerial(false);
            setgvScanResult(true);
            handlegvScanResult();
            inputShtNo.current.focus();
        } else {
            setlabellog("Error: " + strError);
            SetMode("SHEET_ERROR");
        }
    };

    const btDelLotClick = () => {
        let strError = "";
        strError = SetLotSheetIns();
        if (strError === "") {
            settxtShtNo("");
            setlabellog("Deleted complete.");
            setvisiblelog(true);
            setpnlSerial(false);
            setgvScanResult(true);
            handlegvScanResult();
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
            setlabellog(false);
            setvisiblelog(false);
            setpnlSuccess(false);
            setpnlSerial(false);
            setgvScanResult(false);
            localStorage.setItem("hfMode", "LOT");
            inputLot.current.focus();
        } else if (strType === "LOT_ERROR") {
            settxtLotNo("");
            settxtProduct("");
            setselBinNo("");
            setisBinNoDisabled(true);
            settxtShtNo("");
            setisShtNoDisabled(true);
            setlabellog(true);
            setvisiblelog(true);
            setpnlSuccess(false);
            setpnlSerial(false);
            localStorage.setItem("hfMode", "LOT");
            inputLot.current.focus();
        } else if (strType === "DATE") {
            setistxtLotDisabled(true);
            setisBinNoDisabled(false);
            setisShtNoDisabled(false);
            setlabellog(false);
            setvisiblelog(false);
            setpnlSuccess(false);
            setpnlSerial(false);
            settxtWeekCode("");
            inputScanBy.current.focus();
        } else if (strType === "SHEET") {
            setistxtLotDisabled(true);
            setisBinNoDisabled(false);
            setisShtNoDisabled(false);
            setlabellog(false);
            setvisiblelog(false);
            setpnlSuccess(false);
            setpnlSerial(false);
            localStorage.setItem("hfMode", "SHEET");
            selShtBin.current.focus();
        } else if (strType === "SHEET_ERROR") {
            settxtShtNo("");
            setistxtLotDisabled(true);
            setlabellog(true);
            setvisiblelog(true);
            setpnlSerial(false);
            setpnlSuccess(false);
            inputShtNo.current.focus();
        } else if (strType === "SHEET_CONFIRM") {
            setistxtLotDisabled(true);
            setlabellog(true);
            setvisiblelog(true);
            setpnlSerial(true);
            setpnlSuccess(false);
            btnCancel.current.focus();
        } else if (strType === "SHEET_OK") {
            settxtShtNo("");
            setlabellog(false);
            setvisiblelog(false);
            setpnlSerial(false);
            setpnlSuccess(true);
            inputShtNo.current.focus();
        }
    };

    return {
        txtLotNo, settxtLotNo, ClearLot, txtProduct, settxtProduct, txtRollNo, settxtRollNo, txtScanBy, settxtScanBy,
        txtScanDate, settxtScanDate, selShift, setselShift, txtWeekCode, settxtWeekCode, selBinNo, setselBinNo,
        txtShtNo, settxtShtNo, labellog, visiblelog, pnlSuccess, handleLotNo, inputLot, pnlSerial, hfUserID, hfUserStation,
        hfUserFactory, hfMode, hfCheckFlg, hfSerialStart, hfSerialEnd, hfControlStart, hfControlEnd, hfBINGroup, hfControlBy,
        gvScanResult, inputScanDate, ibtDateRefresh, BinNo, istxtLotDisabled, isBinNoDisabled, isShtNoDisabled, handleselShtBin,
        gvScanData, handleShtNo, ibtExportClick, inputScanBy, selShtBin, inputShtNo, btnCancel, btDelShtClick, btDelLotClick,
        btCancelClick
    }
}

export { fn_ScanSheetInspect };