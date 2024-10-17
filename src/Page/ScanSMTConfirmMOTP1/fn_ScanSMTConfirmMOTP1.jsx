import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Tag } from "antd";

function fn_ScanSMTConfirmMOTP1() {
    const [txtLot, settxtLot] = useState({disabled: false, value: ""});
    const [selProduct, setselProduct] = useState({disabled: false, value: null});
    const [Productdata, setProductdata] = useState([]);
    const [lblLot, setlblLot] = useState("");
    const [pnlLog, setpnlLog] = useState(false);
    const [lblLog, setlblLog] = useState("");
    const [lblResult, setlblResult] = useState("");
    const [lblResultcolor, setlblResultcolor] = useState("#059212");

    //Table
    const [pnlSerial, setpnlSerial] = useState(false);
    const [gvSerialData, setgvSerialData] = useState([]);
    const [gvScanResult, setgvScanResult] = useState(false);
    const [gvScanData, setgvScanData] = useState([]);
    const [txtgvSerial, settxtgvSerial] = useState("");

    //hiddenfield
    const hfUserID = localStorage.getItem("ipAddress");
    const hfUserStation = localStorage.getItem("ipAddress");
    const [hfUserFactory, sethfUserFactory] = useState("");
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
    const [hfCheckSPIAOI, sethfCheckSPIAOI] = useState("");
    const [hfCheckDateInProc, sethfCheckDateInProc] = useState("");
    const [hfDateInProc, sethfDateInProc] = useState("");
    const [hfCheckWeekCode, sethfCheckWeekCode] = useState("");
    const [hfCheckWeekCodeStart, sethfCheckWeekCodeStart] = useState("");
    const [hfCheckWeekCodeEnd, sethfCheckWeekCodeEnd] = useState("");
    const [hfWeekCodeType, sethfWeekCodeType] = useState("");
    const [hfWeekCode, sethfWeekCode] = useState("");
    const [hfCheckPreAOIF, sethfCheckPreAOIF] = useState("");
    const [hfCheckPreAOIB, sethfCheckPreAOIB] = useState("");
    const [hfCheckAOIF, sethfCheckAOIF] = useState("");
    const [hfCheckAOIB, sethfCheckAOIB] = useState("");
    const [hfCheckSPIF, sethfCheckSPIF] = useState("");
    const [hfCheckSPIB, sethfCheckSPIB] = useState("");
    const [hfLotLength, sethfLotLength] = useState(9);
    const [hfExportCSV, sethfExportCSV] = useState("N");
    const [hfLotAll, sethfLotAll] = useState("");
    const [hfSerialInfo, sethfSerialInfo] = useState("");

    //inputRef
    const inputLot = useRef([]);
    const ddlProduct = useRef([]);
    const inputTray = useRef([]);

    const plantCode = import.meta.env.VITE_FAC;
    const DUPLICATE_CHECK_FLG = 0;
    const FINAL_GATE_SPECIAL_FLG = 1;
    const FINAL_GATE_SPECIAL_PRD = import.meta.env.FINAL_GATE_SPECIAL_PRD;
    const FINAL_GATE_SPECIAL_MESSAGE = import.meta.env.FINAL_GATE_SPECIAL_MESSAGE;
    const FINAL_GATE_SPECIAL_OK = "OK";

    return {

    }
};

export { fn_ScanSMTConfirmMOTP1 };