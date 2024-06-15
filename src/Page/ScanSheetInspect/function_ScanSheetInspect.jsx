import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { usePopupFunctions } from "../Common/function_Common";
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

    const [isBinNoDisabled, setisBinNoDisabled] = useState(false);
    const [isShtNoDisabled, setisShtNoDisabled] = useState(false);
    const [istxtLotDisabled, setistxtLotDisabled] = useState(false);

    const inputLot = useRef(null);
    const inputScanBy = useRef(null);
    const selShtBin = useRef(null);
    const inputShtNo = useRef(null);
    const inputScanDate = useRef(null);

    const ClearLot = () => {
        settxtLotNo("");
        inputLot.current.focus();
    }

    const handleLotNo = () => {
        // setvisiblelog(false)
        let strPrdName = "";
        let RollNo = "";
        let strLot = "";

        const strLotData = txtLotNo.toUpperCase().split(";");
        strLot = strLotData[0];

        if (strLot != "") {
            settxtLotNo(strLot);
            axios.post("/api/getLotNo", {
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
                        setgvScanResult(true); //ลองโชว์ Table เฉยๆ
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

    const ibtDateRefresh = async () => {
        fetchData();
        inputScanDate.current.focus();
    };

    useEffect(() => {
        BinNoData();
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
    };

    const handelgvScanResult = async () => {

        try {
            const res = await axios.post("/api/getProductShtInspect", {
                strLot: txtLotNo,
                strPrdName: txtProduct,
                strBinGrp: hfBINGroup,
                
            });
            const data = res.data;
            // setBinNo(data);
            console.log("naaa", data);
        } catch (error) {
            console.error('Error fetching binno:', error.message);
        }
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
            //gvScanResult();
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
            // btnCancel.current.focus();
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
        gvScanResult, inputScanDate, ibtDateRefresh, BinNo, istxtLotDisabled, isBinNoDisabled, isShtNoDisabled
    }
}

export { fn_ScanSheetInspect };