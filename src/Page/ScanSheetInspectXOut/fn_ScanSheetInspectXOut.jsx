import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import swal from "sweetalert";

function fn_ScanSheetInspectXOut() {

    const [txtLotNo, settxtLotNo] = useState("");
    const [txtProduct, settxtProduct] = useState("");
    const [txtRollNo, settxtRollNo] = useState("");
    const [txtShift, settxtShift] = useState("");
    const [txtWeekCode, settxtWeekCode] = useState("");
    const [txtPackingBy, settxtPackingBy] = useState("");
    const [txtPackingDate, settxtPackingDate] = useState("");
    const [selBinNo, setselBinNo] = useState("");
    const [BinNodata, setBinNodata] = useState([]);
    const [lblTotalSht, setlblTotalSht] = useState("");

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
    const hfUserID = localStorage.getItem("hfUserID");
    const hfUserStation = localStorage.getItem("hfUserStation");
    const [hfUserFactory, sethfUserFactory] = useState("");

    //Table
    const [pnlXOut, setpnlXOut] = useState(false);
    const [gvXOutData, setgvXOutData] = useState([]);
    const [gvScanResult, setgvScanResult] = useState(false);
    const [gvScanData, setgvScanData] = useState([]);

    //Disabled
    const [isBinNoDisabled, setisBinNoDisabled] = useState(false);
    const [istxtLotDisabled, setistxtLotDisabled] = useState(false);

    //inputRef
    const inputLot = useRef(null);
    const inputPackingBy = useRef(null);
    const inputPackingDate = useRef(null);
    const selShtBin = useRef(null);
    const inputShtNo = useRef(null);
    const btnCancel = useRef(null);

    localStorage.setItem("PLANT_CODE", "5");
    const plantCode = localStorage.getItem("PLANT_CODE");

    useEffect(() => {
        localStorage.setItem("hfUserID", localStorage.getItem("ip"));
        localStorage.setItem("hfUserStation", localStorage.getItem("ip"));
        localStorage.setItem("hfMode", "");
        localStorage.setItem("hfBINGroup", "");
        localStorage.setItem("hfControlBy", "");
        fetchDate();
        SetMode("LOT");
    }, []);

    const fetchDate = async () => {
        try {
            const res = await axios.post("/api/Common/getworkingdate");
            const result = res.data.Result.rows[0].system_date;
            settxtPackingDate(result);
        } catch (error) {
            console.error('Error fetching workingdate:', error.message);
        }
    };

    const LotTextChanged = async () => {
        let strLot = "";
        let strPrdName = "";
        sethfBINGroup("");
        settxtProduct("");
        settxtRollNo("");
        settxtShift("");
        settxtWeekCode("");
        setlblTotalSht("");
        setgvScanData([]);

        const strLotData = txtLotNo.toUpperCase().split(";");
        strLot = strLotData[0];

        axios.post("/api/Common/getProductDataByLot", {
            strLot: strLot,
        })
            .then((res) => {
                let data = res.data.flat().flat();
                if (data.length > 0) {
                    strPrdName = data[0][0];
                    console.log(strPrdName);
                }
            })

        axios.post("/api/Common/getProductShtGroup", {
            strprdname: strPrdName,
            strPlantCode: plantCode
        })
            .then((res) => {
                let dtGroup = res.data
                console.log("มาดิ", dtGroup);
                if (dtGroup.length > 0) {
                    sethfBINGroup(dtGroup.bin_group);
                    setselBinNo(hfBINGroup);

                    if (strLot !== "") {
                        settxtLotNo(strLot);
                        axios.post("/api/Common/getproductshtinspectbylot", {
                            strLotno: strLot,
                            strBinno: selBinNo
                        })
                            .then((res) => {
                                let dtData = res.data
                                console.log("dtdata:", dtData)
                                if (dtData.length > 0) {
                                    settxtProduct(dtData.prd_name);
                                    settxtRollNo(dtData.roll_no);
                                    settxtShift(dtData.shift_no);
                                    settxtWeekCode(dtData.week_no);
                                    setlblTotalSht(dtData.sheet_qty.toLocaleString());
                                    getSheetInspectData();
                                    getSheetInspectXOutData();
                                    inputPackingBy.current.focus();
                                } else {
                                    settxtLotNo("");
                                    setlabellog("Lot " + strLot + " not found");
                                    SetMode("LOT_ERROR");
                                    sethfMode("LOT");
                                }
                            })
                    }
                } else {
                    settxtLotNo("");
                    setlabellog("Lot " + strLot + " not found");
                    SetMode("LOT_ERROR");
                    sethfMode("LOT");
                }
            })

    };

    const ClearLot = () => {
        settxtLotNo("");
        setpnlSerial(false);
        SetMode("LOT");
        inputLot.current.focus();
    };

    const btCancelClick = () => {
        setpnlSuccess(false);
        setpnlSerial(false);
        setgvXOutData([]);
        inputShtNo.current.focus();
    };

    useEffect(() => {
        BinNoData();
        // handlegvScanResult(); //ทดสอบว่ามีข้อมูลมามั้ย
    }, []);

    const BinNoData = async (strBinGroup) => {
        try {
            const res = await axios.post("/api/Common/getProductShtBIN", {
                bingroup: strBinGroup,
                strPlantCode: plantCode
            });
            const data = res.data;
            setBinNodata(data);
            console.log("lll", data);
        } catch (error) {
            console.error('Error fetching binno:', error.message);
        }
    };

    const selShtBinChanged = async () => {
        getSheetInspectData();
        getSheetInspectXOutData();
        selShtBin.current.focus();
    };

    const getSheetInspectData = async () => {
        setpnlSuccess(false);
        setpnlXOut(true);
        setlabellog("");
        setvisiblelog(false);
        settxtShift("");
        settxtWeekCode("");
        setlblTotalSht("");
        setpnlSerial(false);

        axios.post("/api/Common/getproductshtinspectbylot", {
            strLotno: strLot,
            strBinno: selBinNo
        })
            .then((res) => {
                let dtData = res.data
                if (dtData.length > 0) {
                    settxtShift(dtData.shift_no);
                    settxtWeekCode(dtData.week_no);
                    setlblTotalSht(dtData.sheet_qty.toLocaleString());
                    setpnlSerial(true);
                } else {
                    setlabellog(selBinNo + " not found data");
                    setvisiblelog(true);
                    setpnlSerial(false);
                    selShtBin.current.focus();
                }
            })

        try {
            const res = await axios.post("/api/Common/getproductshtinsXOutbylot", {
                strLot: txtLotNo,
                strBin: selBinNo,
                strPrdName: txtProduct,
                strPlantCode: plantCode
            });
            const data = res.data;
            setgvXOutData(data);
        } catch (error) {
            console.error('Error fetching XOutbylot:', error.message);
        }
    };

    const getSheetInspectXOutData = async () => {
        let dblTotalSht = 0;
        let dblTotalPcs = 0;

        try {
            const res = await axios.post("/api/Common/getproductshtinspectXOut", {
                strLot: txtLotNo,
                strPrdName: txtProduct,
                strPlantCode: plantCode
            });
            const data = res.data;
            setgvScanData(data);
            if (data.length > 0) {
                data.forEach(row => {
                    if (row.hfCountFlg === "Y") {
                        dblTotalSht = dblTotalSht + parseFloat(row.xout_no);
                        dblTotalPcs = dblTotalPcs + parseFloat(row.qty);
                    }
                    row.xout_no = new Intl.NumberFormat('en-US').format(parseFloat(row.xout_no));
                    row.qty = new Intl.NumberFormat('en-US').format(parseFloat(row.qty));
                });

                setgvScanData(dblTotalSht); //มีต่ออีก
                setgvScanData(dblTotalPcs); //มีต่ออีก
            }
        } catch (error) {
            console.error('Error fetching XOut:', error.message);
        }

    };

    const btSaveClick = async () => {
        let strError = "";
        const dblTotalSht = parseFloat(lblTotalSht);
        let dblShtQty = 0;
        let dtData = getInputXout();
        if (txtWeekCode.trim().length !== 4) {
            setlabellog("Please input correct week code.");
            setvisiblelog(true);
        } else {
            if (txtPackingBy.trim() !== "" && txtPackingDate !== "") {
                for (const drRow of dtData) {
                    if (drRow.COUNT_FLG === "Y") {
                        dblShtQty = dblShtQty + parseFloat(drRow.SSLX_QTY);
                    }
                }
                if (dblShtQty === dblTotalSht) {

                    strError === SetLotSheetInsXOut();
                    if (strError === "") {
                        setpnlSuccess(true);
                        setpnlXOut(false);
                        setvisiblelog(false);
                        selShtBin.current.focus();
                    } else {
                        setlabellog("Error: " + strError);
                        setvisiblelog(true);
                    }
                } else {
                    setlabellog("Total QTY(Sht.) not same.");
                    setvisiblelog(true);
                }

            } else {
                setlabellog("Please input packing by and packing date.");
                setvisiblelog(true);
            }
        }
        getSheetInspectXOutData();
    };

    const SetLotSheetInsXOut = async () => {
        try {
            const res = await axios.post("/api/Common/setLotSheetInsXOut", {
                strPlantCode: plantCode,
                data: dtData,
                strUserID: hfUserID,
                strStation: hfUserStation
            });
            console.log("บันทึกข้อมูลสำเร็จ =", res);
            swal("success", "You save data success", "success");
        } catch (error) {
            console.error('ไม่สามารถบันทึกข้อมูลได้:', error.message);
            swal(
                "Unable to save information",
                "Please check the information entered.",
                "error"
            );
        }
    };

    const [dtData, setdtData] = useState([]);

    const getInputXout = () => {
        const newData = [];
        for (let intSeq = 0; intSeq < gvXOutData.rows.length; intSeq++) {
            const row = gvXOutData.rows[intSeq];
            const newRow = {
                SSLX_LOT_NO: txtLotNo.trim().toUpperCase(),
                SSLX_BIN_GROUP: hfBINGroup,
                SSLX_BIN_NO: selBinNo,
                SSLX_XOUT_GROUP: row.querySelector('[id$="hfXOutGroup"]').value,
                SSLX_XOUT_NO: row.querySelector('[id$="hfXOutNo"]').value,
                SSLX_PRODUCT_NAME: txtProduct.trim().toUpperCase(),
                SSLX_ROLL_NO: txtRollNo.trim().toUpperCase(),
                SSLX_SHIFT: txtShift,
                SSLX_WEEK_NO: txtWeekCode.trim(),
                SSLX_PACK_DATE: txtPackingDate.trim(),
                SSLX_PACK_BY: txtPackingBy.trim(),
                SSLX_QTY: parseFloat(row.querySelector('[id$="txtShtQty"]').value.trim()) || 0,
                COUNT_FLG: row.querySelector('[id$="hfCountFlg"]').value,
            };
            newData.push(newRow);
        }
        setdtData(newData);
    };

    const SetMode = (strType) => {
        if (strType === "LOT") {
            settxtLotNo("");
            settxtProduct("");
            settxtRollNo("");
            settxtWeekCode("");
            settxtShift("");
            setselBinNo("");
            setBinNodata([]);
            setisBinNoDisabled(true);
            setlabellog("");
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
            setvisiblelog(true);
            setpnlSuccess(false);
            setpnlSerial(false);
            localStorage.setItem("hfMode", "LOT");
            inputLot.current.focus();
        } else if (strType === "DATE") {
            setistxtLotDisabled(true);
            setisBinNoDisabled(false);
            setlabellog("");
            setvisiblelog(false);
            setpnlSuccess(false);
            setpnlSerial(false);
            settxtWeekCode("");
            inputPackingDate.current.focus();
        } else if (strType === "SHEET") {
            setistxtLotDisabled(true);
            setisBinNoDisabled(false);
            setlabellog("");
            setvisiblelog(false);
            setpnlSuccess(false);
            setpnlSerial(false);
            localStorage.setItem("hfMode", "SHEET");
            selShtBin.current.focus();
        } else if (strType === "SHEET_ERROR") {
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
            btnCancel.current.focus();
        } else if (strType === "SHEET_OK") {
            settxtPackingBy("");
            setlabellog("");
            setvisiblelog(false);
            setpnlSerial(false);
            setpnlSuccess(true);
            inputShtNo.current.focus();
        }
    };

    return {
        txtLotNo, settxtLotNo, txtProduct, settxtProduct, txtRollNo, settxtRollNo, txtShift, settxtShift, txtWeekCode, settxtWeekCode,
        txtPackingBy, settxtPackingBy, txtPackingDate, settxtPackingDate, selBinNo, setselBinNo, BinNodata, lblTotalSht, inputPackingBy,
        labellog, visiblelog, pnlSuccess, pnlSerial, hfBINGroup, hfControlBy, hfCheckFlg, hfSerialStart, hfSerialEnd, hfControlStart,
        hfControlEnd, hfMode, hfUserID, hfUserStation, hfUserFactory, gvScanResult, gvScanData, pnlXOut, inputLot, inputPackingDate,
        selShtBin, btnCancel, ClearLot, isBinNoDisabled, istxtLotDisabled, LotTextChanged, selShtBinChanged, btSaveClick, btCancelClick,
        gvXOutData
    }
}

export { fn_ScanSheetInspectXOut };