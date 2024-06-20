import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

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
    const [hfUserID, sethfUserID] = useState("");
    const [hfUserStation, sethfUserStation] = useState("");
    const [hfUserFactory, sethfUserFactory] = useState("");

    //Table
    const [pnlXOut, setpnlXOut] = useState(false);
    const [gvScanResult, setgvScanResult] = useState(false);
    const [gvScanData, setgvScanData] = useState([]);

    //Disabled
    const [isBinNoDisabled, setisBinNoDisabled] = useState(false);
    const [istxtLotDisabled, setistxtLotDisabled] = useState(false);

    //inputRef
    const inputLot = useRef(null);
    const inputPackingDate = useRef(null);

    const SetMode = (strType) => {
        if (strType === "LOT") {
            settxtLotNo("");
            settxtProduct("");
            settxtRollNo("");
            settxtWeekCode("");
            settxtShift("");
            selShtBin("");
            setBinNodata([]);
            setisBinNoDisabled(true);
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
            setlabellog(true);
            setvisiblelog(true);
            setpnlSuccess(false);
            setpnlSerial(false);
            localStorage.setItem("hfMode", "LOT");
            inputLot.current.focus();
        } else if (strType === "DATE") {
            setistxtLotDisabled(true);
            setisBinNoDisabled(false);
            setlabellog(false);
            setvisiblelog(false);
            setpnlSuccess(false);
            setpnlSerial(false);
            settxtWeekCode("");
            inputPackingDate.current.focus();
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
        txtLotNo, settxtLotNo, txtProduct, settxtProduct, txtRollNo, settxtRollNo, txtShift, settxtShift, txtWeekCode, settxtWeekCode,
        txtPackingBy, settxtPackingBy, txtPackingDate, settxtPackingDate, selBinNo, setselBinNo, BinNodata, lblTotalSht, setlblTotalSht,
        labellog, visiblelog, pnlSuccess, pnlSerial, hfBINGroup, hfControlBy, hfCheckFlg, hfSerialStart, hfSerialEnd, hfControlStart,
        hfControlEnd, hfMode, hfUserID, hfUserStation, hfUserFactory, gvScanResult, gvScanData, pnlXOut
    }
}

export { fn_ScanSheetInspectXOut };