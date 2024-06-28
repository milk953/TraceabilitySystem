import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function fn_ScanSMTSerialRecordTime() {
    const [selectedrbt, setselectedrbt] = useState("rbtRecordTime");
    const [txtMachine, settxtMachine] = useState("");
    const [txtOperator, settxtOperator] = useState("");
    const [txtTotalPcs, settxtTotalPcs] = useState("");
    const [rbtPcs, setrbtPcs] = useState(false);
    const [rbtSht, setrbtSht] = useState(false);
    const [txtLotNo, settxtLotNo] = useState("");
    const [selProduct, setselProduct] = useState("");
    const [txtRackNo, settxtRackNo] = useState("");
    const [lblLot, setlblLot] = useState("");
    const [lblLotTotal, setlblLotTotal] = useState("");
    const [lblLog, setlblLog] = useState("");
    const [visiblelog, setvisiblelog] = useState(false);
    const [lblResult, setlblResult] = useState("");
    const [pnlMachine, setpnlMachine] = useState(false);
    const [pnlRackNo, setpnlRackNo] = useState(false);

    //hiddenfield
    const hfUserID = localStorage.getItem("hfUserID");
    const hfUserStation = localStorage.getItem("hfUserStation");
    const [hfUserFactory, sethfUserFactory] = useState("");
    const [hfPlantCode, sethfPlantCode] = useState("");
    const [hfProductKind, sethfProductKind] = useState("");
    const [hfSerialLength, sethfSerialLength] = useState("");
    const [hfSerialFixFlag, sethfSerialFixFlag] = useState("");
    const [hfSerialDigit, sethfSerialDigit] = useState("");
    const [hfSerialStartDigit, sethfSerialStartDigit] = useState("");
    const [hfSerialEndDigit, sethfSerialEndDigit] = useState("");
    const [hfTrayFlag, sethfTrayFlag] = useState("");
    const [hfTrayLength, sethfTrayLength] = useState("");
    const [hfTestResultFlag, sethfTestResultFlag] = useState("");
    const [hfSerialCount, sethfSerialCount] = useState("");
    const [hfAutoScan, sethfAutoScan] = useState("");
    const [hfMode, sethfMode] = useState("");
    const [hfConfigCheck, sethfConfigCheck] = useState("");
    const [hfConfigCode, sethfConfigCode] = useState("");
    const [hfConfigStart, sethfConfigStart] = useState("");
    const [hfConfigEnd, sethfConfigEnd] = useState("");
    const [hfConfigRuning, sethfConfigRuning] = useState("");
    const [hfDuplicateStart, sethfDuplicateStart] = useState("");
    const [hfDuplicateEnd, sethfDuplicateEnd] = useState("");
    const [hfChipIDCheck, sethfChipIDCheck] = useState("");
    const [hfCheckPrdSht, sethfCheckPrdSht] = useState("");
    const [hfCheckPrdShtStart, sethfCheckPrdShtStart] = useState("");
    const [hfCheckPrdShtEnd, sethfCheckPrdShtEnd] = useState("");
    const [hfCheckPrdAbbr, sethfCheckPrdAbbr] = useState("");
    const [hfPlasmaCheck, sethfPlasmaCheck] = useState("");
    const [hfPlasmaTime, sethfPlasmaTime] = useState("");
    const [hfCheckStartSeq, sethfCheckStartSeq] = useState("");
    const [hfCheckStartSeqCode, sethfCheckStartSeqCode] = useState("");
    const [hfCheckStartSeqStart, sethfCheckStartSeqStart] = useState("");
    const [hfCheckStartSeqEnd, sethfCheckStartSeqEnd] = useState("");
    const [hfCheckDateInProc, sethfCheckDateInProc] = useState("");
    const [hfDateInProc, sethfDateInProc] = useState("");
    const [hfCheckWeekCode, sethfCheckWeekCode] = useState("");
    const [hfCheckWeekCodeStart, sethfCheckWeekCodeStart] = useState("");
    const [hfCheckWeekCodeEnd, sethfCheckWeekCodeEnd] = useState("");
    const [hfWeekCodeType, sethfWeekCodeType] = useState("");
    const [hfWeekCode, sethfWeekCode] = useState("");
    const [hfSerialStartCode, sethfSerialStartCode] = useState("");

    //Table
    const [pnlSerial, setpnlSerial] = useState(false);
    const [gvSerialData, setgvSerialData] = useState([]);
    const [gvScanResult, setgvScanResult] = useState(false);
    const [gvScanData, setgvScanData] = useState([]);

    //Disabled
    const [istxtMachineDisabled, setistxtMachineDisabled] = useState(false);
    const [istxtOpDisabled, setistxtOpDisabled] = useState(false);
    const [istxtTotalPcsDisabled, setistxtTotalPcsDisabled] = useState(false);
    const [istxtLotDisabled, setistxtLotDisabled] = useState(false);
    const [istxtRackDisabled, setistxtRackDisabled] = useState(false);
    const [isselProDisabled, setisselProDisabled] = useState(false);
    const [isibtMCBackDisabled, setisibtMCBackDisabled] = useState(false);
    const [isibtOperatorDisabled, setisibtOperatorDisabled] = useState(false);
    const [isibtPcsBackDisabled, setisibtPcsBackDisabled] = useState(false);

    //inputRef
    const inputMachine = useRef(null);
    const inputOperator = useRef(null);
    const inputTotalPcs = useRef(null);
    const inputLot = useRef(null);
    const inputTray = useRef(null);

    const handleChangerbt = (event) => {
        setselectedrbt(event.target.value);
    };

    const SetMode = (strType) => {
        if (strType === "RECORD") {
            setpnlMachine(true);
            setpnlRackNo(false);
            SetMode("MC");
        } else if (strType === "PLASMA") {
            setpnlMachine(false);
            setpnlRackNo(true);
            SetMode("OP");
        } else if (strType === "MC") {
            settxtRackNo("");
            setistxtMachineDisabled(true);
            setisibtMCBackDisabled(false);
            settxtOperator("");
            setistxtOpDisabled(false);
            setisibtOperatorDisabled(false);
            settxtTotalPcs("");
            setistxtTotalPcsDisabled(true);
            settxtLotNo("");
            setistxtLotDisabled(true);
            settxtRackNo("");
            setistxtRackDisabled(true);
            setisselProDisabled(true);
            setisibtPcsBackDisabled(true);
            setpnlSerial(false);
            setgvSerialData([]);
            localStorage.setItem("hfMode", "MC");
            inputMachine.current.focus();
        } else if (strType === "OP") {
            setistxtMachineDisabled(true);
            setisibtMCBackDisabled(false);
            settxtOperator("");
            setistxtOpDisabled(false);
            setisibtOperatorDisabled(false);
            settxtTotalPcs("");
            setistxtTotalPcsDisabled(true);
            settxtLotNo("");
            setistxtLotDisabled(true);
            settxtRackNo("");
            setistxtRackDisabled(true);
            setisselProDisabled(true);
            setisibtPcsBackDisabled(true);
            setpnlSerial(false);
            setgvSerialData([]);
            localStorage.setItem("hfMode", "OP");
            inputOperator.current.focus();
        } else if (strType === "PCS") {
            setistxtMachineDisabled(true);
            setisibtMCBackDisabled(false);
            setistxtOpDisabled(true);
            setisibtOperatorDisabled(false);
            settxtTotalPcs("");
            setistxtTotalPcsDisabled(false);
            settxtLotNo("");
            setistxtLotDisabled(true);
            settxtRackNo("");
            setistxtRackDisabled(true);
            setisselProDisabled(true);
            setisibtPcsBackDisabled(false);
            setpnlSerial(false);
            setgvSerialData([]);
            localStorage.setItem("hfMode", "PCS");
            inputTotalPcs.current.focus();
        } else if (strType === "LOT") {
            settxtLotNo("");
            setistxtLotDisabled(false);
            setistxtTotalPcsDisabled(true);
            setisselProDisabled(false);
            settxtRackNo("");
            setistxtRackDisabled(true);
            setlblLot("");
            setlblLotTotal("");
            setvisiblelog(false);
            setpnlSerial(false);
            setgvSerialData([]);
            inputLot.current.focus();
        } else if (strType === "LOT_ERROR") {
            settxtLotNo("");
            setistxtLotDisabled(false);
            setlblLot("");
            setlblLotTotal("");
            setvisiblelog(true);
            setpnlSerial(false);
            settxtRackNo("");
            setistxtRackDisabled(true);
            localStorage.setItem("hfMode", "LOT");
            inputLot.current.focus();
        } else if (strType === "TRAY") {
            setistxtLotDisabled(true);
            setvisiblelog(false);
            setpnlSerial(true);
            // getInitialSerial();
            localStorage.setItem("hfMode", "TRAY");
            inputTray.current.focus();
        } else if (strType === "TRAY_ERROR") {
            setistxtLotDisabled(true);
            setvisiblelog(true);
            setpnlSerial(false);
            localStorage.setItem("hfMode", "TRAY");
            inputTray.current.focus();
        } else if (strType === "SERIAL") {
            setisselProDisabled(true);
            setistxtLotDisabled(true);
            setvisiblelog(false);
            setpnlSerial(true);
            localStorage.setItem("hfMode", "SERIAL");
            // getInitialSerial()
        } else if (strType === "SERIAL_ERROR") {
            setistxtLotDisabled(true);
            setvisiblelog(true);
        } else if (strType === "SERIAL_OK") {
            setistxtLotDisabled(true);
            setvisiblelog(false);
            setpnlSerial(true);
            // getInitialSerial()
        } else if (strType === "SERIAL_NG") {
            setistxtLotDisabled(true);
            setvisiblelog(false);
        }
    };

    return {
        selectedrbt, txtMachine, settxtMachine, txtOperator, settxtOperator, txtTotalPcs, settxtTotalPcs, rbtPcs, rbtSht, txtLotNo, settxtLotNo,
        selProduct, setselProduct, txtRackNo, settxtRackNo, lblLot, lblLotTotal, lblLog, visiblelog, lblResult, pnlSerial, gvScanResult, istxtOpDisabled,
        istxtTotalPcsDisabled, istxtLotDisabled, isselProDisabled, istxtMachineDisabled, handleChangerbt
    }
};

export { fn_ScanSMTSerialRecordTime };