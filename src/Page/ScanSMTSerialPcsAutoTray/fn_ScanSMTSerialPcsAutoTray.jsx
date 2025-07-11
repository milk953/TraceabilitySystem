import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { Tag } from "antd";
import ExcelJS from "exceljs";
import Swal from "sweetalert2";
import { useLoading } from "../../loading/fn_loading";
import { DataConfig } from "../Common/function_Common";

function fn_ScanSMTSerialPcsAutoTray() {
    const { ConfigData } = DataConfig();

    const [txtLot, settxtLot] = useState("");
    const [selProduct, setselProduct] = useState("");
    const [Productdata, setProductdata] = useState([]);
    const [txtPackingNo, settxtPackingNo] = useState("");
    const [lblLot, setlblLot] = useState("");
    const [lblLotTotal, setlblLotTotal] = useState("");
    const [txtPcsTray, settxtPcsTray] = useState("");
    const [lblSerialNG, setlblSerialNG] = useState("");
    const [lblLog, setlblLog] = useState("");
    const [visiblelog, setvisiblelog] = useState(false);
    const [lblResult, setlblResult] = useState("");
    const [lblResultcolor, setlblResultcolor] = useState("green");
    const [lblTime, setlblTime] = useState("");
    const [pnlPackingGroup, setpnlPackingGroup] = useState(false);
    const [lblTimecolor, setlblTimecolor] = useState("green");
    const [lblLastTray, setlblLastTray] = useState("Not Use");

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
    const [hfCheckAOICoatF, sethfCheckAOICoatF] = useState("");
    const [hfCheckAOICoatB, sethfCheckAOICoatB] = useState("");
    const [hfLotLength, sethfLotLength] = useState("");
    const [hfLotAll, sethfLotAll] = useState("");
    const [hfCheckPackingNo, sethfCheckPackingNo] = useState("");
    const [hfSerialStartCode, sethfSerialStartCode] = useState("");
    const [hfPlasmaSkipELT, sethfPlasmaSkipELT] = useState("");
    const [hfPlasmaHideTime, sethfPlasmaHideTime] = useState("");
    const [hfCheckEFPCAOM, sethfCheckEFPCAOM] = useState("");
    const [hfCheckEFPCAOI, sethfCheckEFPCAOI] = useState("");
    const [hfCheckEFPCOST, sethfCheckEFPCOST] = useState("");
    const [hfCheckEFPCAVI, sethfCheckEFPCAVI] = useState("");
    const [hfSerialInfo, sethfSerialInfo] = useState("");
    const [hfCheckXrayF, sethfCheckXrayF] = useState("");
    const [hfCheckXrayB, sethfCheckXrayB] = useState("");
    const [hfCheckXrayOneTime, sethfCheckXrayOneTime] = useState("");
    const [hfCheckFinInspect, sethfCheckFinInspect] = useState("");
    const [hfCheckFinInspectProc, sethfCheckFinInspectProc] = useState("");
    const [hfSerialCountOriginal, sethfSerialCountOriginal] = useState("");

    //Table
    const [pnlSerial, setpnlSerial] = useState(false);
    const [gvSerialData, setgvSerialData] = useState([]);
    const [gvScanResult, setgvScanResult] = useState(false);
    const [gvScanData, setgvScanData] = useState([]);
    const [txtgvSerial, settxtgvSerial] = useState([]);

    //Disabled
    const [txtLotDisabled, settxtLotDisabled] = useState(false);
    const [selProDisabled, setselProDisabled] = useState(false);
    const [txtPackingNoDisabled, settxtPackingNoDisabled] = useState(false);

    //inputRef
    const inputLot = useRef(null);
    const ddlProduct = useRef(null);
    const inputPackingNo = useRef(null);
    const inputgvSerial = useRef([]);
    const inputTray = useRef(null);

    const plantCode = ConfigData.FACTORY;
    const DUPLICATE_CHECK_FLG = ConfigData.DUPLICATE_CHECK_FLG;
    const FINAL_GATE_AUTO_PRD = ConfigData.FINAL_GATE_AUTO_PRD;
    const FINAL_GATE_SPECIAL_FLG = ConfigData.FINAL_GATE_SPECIAL_FLG;
    const FINAL_GATE_SPECIAL_PRD = ConfigData.FINAL_GATE_SPECIAL_PRD;
    const FINAL_GATE_SPECIAL_MESSAGE = ConfigData.FINAL_GATE_SPECIAL_MESSAGE;
    const FINAL_GATE_SPECIAL_OK = "OK";
    const FINAL_GATE_MASTER_CODE = ConfigData.FINAL_GATE_MASTER_CODE;
    const FINAL_GATE_MASTER_FLG = import.meta.env.VITE_FINAL_GATE_MASTER_FLG;
    const FINAL_GATE_MASTER_TIME = import.meta.env.VITE_FINAL_GATE_MASTER_TIME;
    const WORKING_START_TIME = import.meta.env.VITE_WORKING_START_TIME;
    const EXPORT_CSV_FLG = ConfigData.EXPORT_CSV_FLG;

    const { showLoading, hideLoading } = useLoading();

    let hfTestResultFlagBkp = ""

    useEffect(() => {
        PageLoad();
    }, []);

    useEffect(() => {
        if (hfSerialCount != "" && !visiblelog && gvSerialData !== "") {
            getInitialSerial();
        }
    }, [hfSerialCount, visiblelog]);

    const PageLoad = async () => {
        sethfMode("");
        sethfLotAll("");

        if (FINAL_GATE_AUTO_PRD === "") {
            await getProductDataFix();
        } else {
            await getProductData();
        }
        SetMode("LOT");
    };

    const getProductData = async () => {
        await axios.get("/api/Common/GetProductData").then((res) => {
            let data = res.data.flat();
            setProductdata(data);
            setselProduct(data[0].prd_name);
            getProductSerialMaster(data[0].prd_name);
        });
    };

    const getProductDataFix = async () => {
        await axios
            .post("/api/Common/getProductDataFix", {
                strPlantCode: plantCode,
                strPrdName: FINAL_GATE_AUTO_PRD,
            })
            .then((res) => {
                let data = res.data;
                setProductdata(data);
                setselProduct(data[0].prd_name);
            });
    };

    const handleChangeLot = async () => {
        if (txtLot !== "") {
            let _strLot = "";
            let _strPrdName = "";
            const _strLotAll = txtLot.trim().toUpperCase().split(";");
            if (_strLotAll.length >= 2) {
                _strLot = _strLotAll[0];
                _strPrdName = selProduct;
                hfTestResultFlagBkp = "Y"
                sethfTestResultFlag("Y");

                if (_strLot.length === parseFloat(hfLotLength)) {
                    await axios
                        .post("/api/Common/getProductNameByLot", {
                            strLot: _strLot,
                        })
                        .then((res) => {
                            _strPrdName = res.data.prdName[0];
                        });

                    let dtLotPassCount = [];
                    await axios
                        .post("/api/Common/getSerialPassByLot", {
                            strLotNo: _strLot,
                            strPlantCode: plantCode,
                        })
                        .then((res) => {
                            dtLotPassCount = res.data.lotcount;
                        });

                    setlblLotTotal("0");
                    setlblSerialNG("0");
                    if (dtLotPassCount.length > 0) {
                        setlblLotTotal(dtLotPassCount);
                    }

                    let dtLotProduct = [];
                    await axios
                        .post("/api/Common/getProductDataByLot", {
                            strLot: _strLot,
                        })
                        .then((res) => {
                            dtLotProduct = res.data.flat().flat();
                        });
                    if (dtLotProduct.length > 0) {
                        if (dtLotProduct[0][2] === "Y") {
                            sethfTestResultFlag("N");
                            hfTestResultFlagBkp = "N"
                        }
                        sethfLotAll(dtLotProduct[0][3]);
                    }
                    setlblLot(_strLot);

                    try {
                        setselProduct(_strPrdName);
                        await axios
                            .post("/api/Common/GetFinalGateMasterCheckResult", {
                                strProduct: _strPrdName,
                            })
                            .then(async (res) => {
                                let dtgetfinal = res.data;

                                if (dtgetfinal === "OK") {
                                    const datagetPd = await getProductSerialMaster(_strPrdName);
                                    if (datagetPd.prm_final_packing_group_flg === "Y") {
                                        SetMode("PACK");
                                    } else {
                                        SetMode("SERIAL");
                                    }
                                } else {
                                    setlblLog(
                                        `${_strPrdName} not test master! / ${_strPrdName} ยังไม่ทดสอบมาสเตอร์`
                                    );
                                    setlblLot("");
                                    setlblLotTotal("");
                                    setlblSerialNG("");
                                    setvisiblelog(true);
                                    SetMode("LOT_ERROR");
                                }
                            });
                    } catch (error) {
                        const intProduct = _strPrdName.indexOf("-", 12);
                        if (intProduct > -1) {
                            _strPrdName =
                                _strPrdName.substring(0, intProduct) +
                                _strPrdName.substring(intProduct + 1, intProduct + 11).trim();
                            try {
                                setselProduct(_strPrdName);
                                await axios
                                    .post("/api/Common/GetFinalGateMasterCheckResult", {
                                        strProduct: _strPrdName,
                                    })
                                    .then(async (res) => {
                                        let dtgetfinal = res.data;

                                        if (dtgetfinal === "OK") {
                                            const datagetPd = await getProductSerialMaster(
                                                _strPrdName
                                            );
                                            if (datagetPd.prm_final_packing_group_flg === "Y") {
                                                SetMode("PACK");
                                            } else {
                                                SetMode("SERIAL");
                                            }
                                        } else {
                                            setlblLog(
                                                `${_strPrdName} not test master! / ${_strPrdName} ยังไม่ทดสอบมาสเตอร์`
                                            );
                                            setlblLot("");
                                            setlblLotTotal("");
                                            setlblSerialNG("");
                                            setvisiblelog(true);
                                            SetMode("LOT_ERROR");
                                        }
                                    });
                            } catch (error) {
                                setlblLog(`Product ${_strPrdName} not found.`);
                                setvisiblelog(true);
                                await getProductSerialMaster(_strPrdName);
                                ddlProduct.current.focus();
                            }
                        } else {
                            setlblLog(`Product ${_strPrdName} not found.`);
                            setvisiblelog(true);
                            await getProductSerialMaster(_strPrdName);
                            ddlProduct.current.focus();
                        }
                    }
                }
            } else {
                setlblLog(` Please scan QR Code! / กรุณาสแกนที่คิวอาร์โค้ด`);
                setlblLot("");
                setlblLotTotal("");
                setlblSerialNG("");
                setvisiblelog(true);
                SetMode("LOT_ERROR");
            }
        } else {
            setlblLot("");
            inputLot.current.focus();
        }
    };

    const ibtBackClick = () => {
        setselProDisabled(false);
        settxtLot("");
        settxtLotDisabled(false);
        setpnlSerial(false);
        settxtgvSerial(Array(gvSerialData.length).fill(""));
        setgvScanResult(false);
        setgvScanData([]);
        setselProduct(Productdata[0].prd_name);
        settxtPackingNo("");
        settxtPcsTray("");
        SetMode("LOT");
        setTimeout(() => {
            inputLot.current.focus();
        }, 0);
    };

    const handleChangeProduct = async (value) => {
        setselProduct(value);

        if (lblLot !== "") {
            await getProductSerialMaster(value);
            if (hfCheckPackingNo === "Y") {
                SetMode("PACK");
            } else {
                SetMode("SERIAL");
            }
        } else {
            SetMode("LOT");
        }
    };

    const handleChangePackingNo = async () => {
        setlblLotTotal("0");
        setlblSerialNG("0");
        if (txtPackingNo.length !== 0) {
            let dtLotPassCount = 0;
            let dtPackPassCount = 0;

            await axios
                .post("/api/Common/getSerialPassByLot", {
                    strLotNo: lblLot,
                    strPlantCode: plantCode,
                })
                .then((res) => {
                    dtLotPassCount = res.data.lotcount;
                });

            await axios
                .post("/api/Common/GetSerialPassByLotPacking", {
                    strlotNo: lblLot,
                    strPackingGroup: txtPackingNo,
                    strPlantCode: plantCode,
                })
                .then((res) => {
                    dtPackPassCount = res.data.lot_count;
                });

            if (dtLotPassCount > 0) {
                setlblLotTotal(dtLotPassCount);
            }
            if (dtPackPassCount > 0) {
                setlblLotTotal(`${dtPackPassCount} / ${dtLotPassCount}`);
            } else {
                setlblLotTotal(`0 / ${dtLotPassCount}`);
            }
            SetMode("SERIAL");
        } else {
            SetMode("PACK");
        }
    };

    const ibtPackingBackClick = () => {
        SetMode("PACK");
        setgvScanResult(false);
        setgvScanData([]);
        setlblSerialNG("0");
    };

    const handleChangePcsTray = () => {
        if (!isNaN(txtPcsTray)) {
            sethfSerialCount(txtPcsTray);
            if (parseInt(hfSerialCount) !== parseInt(hfSerialCountOriginal)) {
                setlblLastTray("Use");
            } else {
                setlblLastTray("Not Use");
            }
            SetMode("SERIAL");
        }
    };

    let newValue = [];
    const handleChangeSerial = (index, event) => {
        newValue[index] = event.target.value.trim().toUpperCase();
        return newValue;
        // const newValue = [...txtgvSerial];
        // newValue[index] = trimmedValue;
        // settxtgvSerial(newValue);
    };

    const btnSaveClick = async (txtgvSerial) => {
        let CheckValue = false;
        let data = [];
        const serialTable = document.getElementById("gvSerial");
        const serialInputs = serialTable.querySelectorAll("[id^='txtSerial']");
        serialInputs.forEach((input) => {
            data.push(input.value);
        });
        if (hfMode === "SERIAL") {
            if (Array.isArray(txtgvSerial)) {
                const Value = txtgvSerial.some((item) => item.trim() !== "");
                CheckValue = Value;
            }
            if (txtgvSerial !== "" && CheckValue !== false) {
                setvisiblelog(false);
                await setSerialDataTray(data);
                scrollToTop();
            } else {
                setlblLog(`Please Input Serial No.`);
                setvisiblelog(true);
                inputgvSerial.current[0].focus();
                settxtgvSerial(Array(gvSerialData.length).fill(""));
            }
        }
    };

    const btnCancelClick = async () => {
        SetMode("SERIAL");
        //setlblSerialNG("0");
        settxtgvSerial(Array(gvSerialData.length).fill(""));
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const SetMode = async (strType) => {
        if (strType === "LOT") {
            settxtLot("");
            settxtLotDisabled(false);
            setlblLot("");
            setlblLotTotal("");
            setlblSerialNG("");
            setvisiblelog(false);
            setpnlSerial(false);
            setgvSerialData([]);
            inputLot.current.focus();
        } else if (strType === "LOT_ERROR") {
            settxtLot("");
            settxtLotDisabled(false);
            setlblLot("");
            setlblLotTotal("");
            setlblSerialNG("");
            setvisiblelog(true);
            setpnlSerial(false);
            sethfMode("LOT");
            inputLot.current.focus();
        } else if (strType === "TRAY") {
            settxtLotDisabled(true);
            setlblSerialNG("");
            setvisiblelog(false);
            setpnlSerial(true);
            await getInitialSerial();
            sethfMode("TRAY");
            inputTray.current.focus();
        } else if (strType === "TRAY_ERROR") {
            settxtLotDisabled(true);
            setlblSerialNG("");
            setvisiblelog(true);
            setpnlSerial(false);
            sethfMode("TRAY");
            inputTray.current.focus();
        } else if (strType === "PACK") {
            settxtLotDisabled(true);
            settxtPackingNo("");
            settxtPackingNoDisabled(false);
            setpnlPackingGroup(true);
            setvisiblelog(false);
            setpnlSerial(false);
            // settxtgvSerial("");
            settxtgvSerial(Array(gvSerialData.length).fill(""));
            inputgvSerial.current.forEach((input) => {
                if (input) input.value = "";
            });
            setgvSerialData([]);
            setTimeout(() => {
                inputPackingNo.current.focus();
            }, 0);
        } else if (strType === "SERIAL") {
            settxtLotDisabled(true);
            setvisiblelog(false);
            setpnlSerial(true);
            setgvScanResult(false);
            setgvScanData([]);
            setlblResult("");
            setlblTime("");
            sethfMode("SERIAL");
            await getInitialSerial();
            setTimeout(() => {
                inputgvSerial.current[0].focus();
            }, 0);
        } else if (strType === "SERIAL_ERROR") {
            settxtLotDisabled(true);
            setvisiblelog(true);
        } else if (strType === "SERIAL_OK") {
            settxtLotDisabled(true);
            setvisiblelog(false);
            setpnlSerial(true);
            await getInitialSerial();
            inputgvSerial.current[0].focus();
        } else if (strType === "SERIAL_NG") {
            settxtLotDisabled(true);
            setvisiblelog(false);
        }
    };

    const getInitialSerial = async () => {
        let dtData = [];
        for (let intRow = 0; intRow < hfSerialCount; intRow++) {
            dtData.push({ SEQ: intRow + 1 });
        }
        setgvSerialData(dtData);
        settxtgvSerial(Array(dtData.length).fill(""));
        inputgvSerial.current.forEach((input) => {
            if (input) input.value = "";
        });

        return dtData;
    };

    const setSerialDataTray = async (txtgvSerial) => {
        try {
            let dtSerial = await getInputSerial(txtgvSerial);
            let _strLot = lblLot;
            let _strPrdName = selProduct;
            let _strTray = " ";
            let _bolTrayError = false;
            let _bolError = false;
            let _strScanResultAll = "OK";
            let _intRowSerial = 0;
            let _dblPlasmaRemain = parseFloat(hfPlasmaTime);
            showLoading("กำลังบันทึก กรุณารอสักครู่");

            const allSerialEmpty = dtSerial.every((item) => item.SERIAL === "");
            if (allSerialEmpty) {
                hideLoading();
                setlblLog("Please Input Serial No.");
                setvisiblelog(true);
                setTimeout(() => {
                    inputgvSerial.current[0].focus();
                }, 0);
                setgvScanResult(false);
                setgvScanData([]);
                return;
            } else {
                setvisiblelog(false);
                setlblLog("");
            }

            if (!_bolTrayError) {
                await axios
                    .post("/api/Common/GetSerialTestResultManyOnlyGood", {
                        dataList: [
                            {
                                strPlantCode: plantCode,
                                strPrdname: _strPrdName,
                            },
                        ],
                        dtSerial: dtSerial,
                    })
                    .then((res) => {
                        dtSerial = res.data;
                    });

                if (hfCheckWeekCode === "Y") {
                    await axios
                        .post("/api/Common/getWeekCodebyLot", {
                            _strLot: _strLot,
                            _strProc: hfDateInProc,
                            _strWeekType: hfWeekCodeType,
                            _strSerialInfo: hfSerialInfo,
                        })
                        .then((res) => {
                            sethfWeekCode(res.data);
                        });
                }

                for (let i = 0; i < dtSerial.length; i++) {
                    if (dtSerial[i].SERIAL !== "") {
                        let _intCount = 0;
                        let _intCountOK = 0;
                        let _intCountNG = 0;
                        let _intCountDup = 0;
                        let _strRemark = "";
                        let _strError = "";
                        let _strSerial = dtSerial[i].SERIAL;
                        let _dtSerialAll = [];
                        let _bolScanDouble = false;
                        let _bolScanDuplicate = false;
                        let _strPrdNameOrg = "";
                        let _strLotOrg = "";
                        let _strTrayOrg = "";
                        let _strTestResultOrg = "";
                        let _strOK = "OK";
                        let _strNG = "NG";
                        let _strScanResultUpdate = "";
                        let _strMessageUpdate = "";
                        let _strTestResultUpdate = "";
                        let _strTypeTestResult = "";
                        let _strRejectUpdate = "";
                        let _strReject1 = "";
                        let _strReject2 = "";
                        let _strTouchUp = "";
                        let _strRejectGroup = "";

                        _bolError = false;

                        let _strTestResult = "NO";
                        if (hfTestResultFlagBkp === "Y") {
                            _strTestResult = dtSerial[i].TEST_RESULT;
                            _strTypeTestResult = dtSerial[i].TYPE_TEST_RESULT;
                            _strReject1 = dtSerial[i].REJECT;
                            _strRejectUpdate = dtSerial[i].REJECT_CODE;
                            _strReject2 = dtSerial[i].REJECT2;
                            _strTouchUp = dtSerial[i].TOUCH_UP;
                            _strRejectGroup = dtSerial[i].REMARK;
                        }

                        if (DUPLICATE_CHECK_FLG === "1") {
                            let _strSerialSegment = "";
                            const start = parseInt(hfDuplicateStart);
                            const end = parseInt(hfDuplicateEnd);
                            _strSerialSegment = _strSerial.substring(start - 1, end);
                            if (dtSerial[i].ROW_COUNT === 0) {
                                await axios
                                    .post("/api/Common/GetSerialDuplicate", {
                                        dataList: {
                                            strFghSerialNo: _strSerialSegment,
                                            strPlantCode: plantCode,
                                        },
                                    })
                                    .then((res) => {
                                        _intCountDup = res.data.row_count;
                                        dtSerial[i].ROW_COUNT = _intCountDup;
                                    });
                            } else {
                                _intCountDup = dtSerial[i].ROW_COUNT;
                            }
                        }

                        if (_strSerial.length === hfSerialLength) {
                            let _strFixDigit = "";
                            let dtchecksumserial = true;
                            await axios
                                .post("/api/Common/GetCheckSumSerial", {
                                    _str_Serial: _strSerial,
                                    _str_DateType: hfWeekCodeType,
                                    _intEngRevEndDigit: hfSerialEndDigit,
                                })
                                .then((res) => {
                                    dtchecksumserial = res.data;
                                });

                            if (!dtchecksumserial) {
                                _strMessageUpdate =
                                    "Serial invalid check sum / หมายเลขบาร์โค้ดมีค่าตรวจสอบไม่ถูกค้อง";
                                _strRemark = "Serial invalid check sum";
                                _strScanResultUpdate = "NG";
                                _strTestResultUpdate = _strTestResult;
                                dtSerial[i].REMARK_UPDATE = _strRemark;
                                dtSerial[i].ROW_UPDATE = "Y";

                                _intCountNG = 1;
                                _bolError = true;
                            }

                            if (hfSerialFixFlag === "Y" && _strScanResultUpdate !== "NG") {
                                const start = parseInt(hfSerialStartDigit);
                                const end = parseInt(hfSerialEndDigit);
                                _strFixDigit = _strSerial.substring(start - 1, end);

                                if (_strFixDigit !== hfSerialDigit) {
                                    _strMessageUpdate =
                                        "Serial barcode mix product / หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
                                    _strRemark = "Serial barcode mix product";
                                    _strScanResultUpdate = "NG";
                                    _strTestResultUpdate = _strTestResult;
                                    dtSerial[i].REMARK_UPDATE = _strRemark;
                                    dtSerial[i].ROW_UPDATE = "Y";

                                    _intCountNG = 1;
                                    _bolError = true;
                                }

                                if (hfConfigCheck === "Y" && _strScanResultUpdate !== "NG") {
                                    let _strConfigDigit = "";
                                    const start = parseInt(hfConfigStart);
                                    const end = parseInt(hfConfigEnd);
                                    _strConfigDigit = _strSerial.substring(start - 1, end);

                                    if (_strConfigDigit !== hfConfigCode) {
                                        _strMessageUpdate =
                                            "Serial barcode mix product / หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
                                        _strRemark = "Serial barcode mix product";
                                        _strScanResultUpdate = "NG";
                                        _strTestResultUpdate = _strTestResult;
                                        dtSerial[i].REMARK_UPDATE = _strRemark;
                                        dtSerial[i].ROW_UPDATE = "Y";

                                        _intCountNG = 1;
                                        _bolError = true;
                                    }
                                }
                            }

                            if (hfSerialStartCode !== "" && _strScanResultUpdate !== "NG") {
                                if (
                                    _strSerial.substring(0, hfSerialStartCode.length) !==
                                    hfSerialStartCode
                                ) {
                                    _strMessageUpdate =
                                        "Serial barcode mix product / หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
                                    _strRemark = "Serial barcode mix product";
                                    _strScanResultUpdate = "NG";
                                    _strTestResultUpdate = _strTestResult;
                                    dtSerial[i].REMARK_UPDATE = _strRemark;
                                    dtSerial[i].ROW_UPDATE = "Y";

                                    _intCountNG = 1;
                                    _bolError = true;
                                }
                            }

                            if (hfCheckStartSeq === "Y" && _strScanResultUpdate !== "NG") {
                                let _strStartSeq = "";
                                const start = parseInt(hfCheckStartSeqStart);
                                const end = parseInt(hfCheckStartSeqEnd);
                                _strStartSeq = _strSerial.substring(start - 1, end);

                                if (_strStartSeq !== hfCheckStartSeqCode) {
                                    _strMessageUpdate =
                                        "Serial barcode mix product / หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
                                    _strRemark = "Serial barcode mix product";
                                    _strScanResultUpdate = "NG";
                                    _strTestResultUpdate = _strTestResult;
                                    dtSerial[i].REMARK_UPDATE = _strRemark;
                                    dtSerial[i].ROW_UPDATE = "Y";

                                    _intCountNG = 1;
                                    _bolError = true;
                                }
                            }

                            if (hfCheckWeekCode === "Y" && _strScanResultUpdate !== "NG") {
                                let _strWeekCode = "";
                                const start = parseInt(hfCheckWeekCodeStart);
                                const end = parseInt(hfCheckWeekCodeEnd);
                                _strWeekCode = _strSerial.substring(start - 1, end);
                                if (_strWeekCode !== hfWeekCode) {
                                    _strMessageUpdate =
                                        "Serial barcode mix week code / หมายเลขบาร์โค้ดปนรหัสสัปดาห์กัน";
                                    _strRemark = "Serial barcode mix week code";
                                    _strScanResultUpdate = "NG";
                                    _strTestResultUpdate = _strTestResult;
                                    dtSerial[i].REMARK_UPDATE = _strRemark;
                                    dtSerial[i].ROW_UPDATE = "Y";

                                    _intCountNG = 1;
                                    _bolError = true;
                                }
                            }

                            if (!_bolError) {
                                for (
                                    let intRow = _intRowSerial + 1;
                                    intRow < dtSerial.length;
                                    intRow++
                                ) {
                                    if (_strSerial === dtSerial[intRow].SERIAL) {
                                        _strMessageUpdate =
                                            "Serial duplicate in tray / หมายเลขบาร์โค้ดซ้ำในถาดเดียวกัน";
                                        _strRemark = "Serial duplicate in tray  ";
                                        _strScanResultUpdate = "NG";
                                        _strTestResultUpdate = _strTestResult;
                                        dtSerial[i].REMARK_UPDATE = _strRemark;
                                        dtSerial[i].ROW_UPDATE = "N";

                                        _intCountNG = 1;
                                        _bolError = true;
                                    }
                                }
                            }

                            if (!_bolError && hfCheckPrdSht === "Y") {
                                let strSheetLot = "";
                                let _strShtNo;
                                await axios
                                    .post("/api/common/GetSheetNoBySerialNo", {
                                        data: {
                                            strPlantCode: plantCode,
                                            strSerial: _strSerial,
                                        },
                                    })
                                    .then((res) => {
                                        _strShtNo = res.data._strsheet;
                                        strSheetLot = res.data.lot_no;
                                    });
                                let _strPrdSht = "";
                                const start = parseInt(hfCheckPrdShtStart);
                                const end = parseInt(hfCheckPrdShtEnd);
                                _strPrdSht = _strShtNo.substring(start - 1, end);

                                if (_strShtNo !== "" && hfCheckPrdAbbr !== _strPrdSht) {
                                    _strMessageUpdate =
                                        "Change serial barcode mix product / เปลี่ยนหมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
                                    _strRemark = "Change serial barcode mix product  ";
                                    _strScanResultUpdate = "NG";
                                    _strTestResultUpdate = _strTestResult;
                                    dtSerial[i].REMARK_UPDATE = _strRemark;
                                    dtSerial[i].ROW_UPDATE = "Y";

                                    _intCountNG = 1;
                                    _bolError = true;
                                } else if (_strShtNo === "") {
                                    _strMessageUpdate =
                                        "No data connect sheet / ไม่มีข้อมูลแสกนประกบกับหมายเลขชีส";
                                    _strRemark = "No data connect sheet  ";
                                    _strScanResultUpdate = "NG";
                                    _strTestResultUpdate = _strTestResult;
                                    dtSerial[i].REMARK_UPDATE = _strRemark;
                                    dtSerial[i].ROW_UPDATE = "Y";

                                    _intCountNG = 1;
                                    _bolError = true;
                                } else if (hfLotAll && !hfLotAll.includes(strSheetLot)) {
                                    _strMessageUpdate =
                                        "Lot not same connect sheet / ล๊อตไม่ตรงตามที่แสกนประกบกับหมายเลขชีส";
                                    _strRemark = "Lot not same connect sheet  ";
                                    _strScanResultUpdate = "NG";
                                    _strTestResultUpdate = _strTestResult;
                                    dtSerial[i].REMARK_UPDATE = _strRemark;
                                    dtSerial[i].ROW_UPDATE = "Y";

                                    _intCountNG = 1;
                                    _bolError = true;
                                }
                            }

                            if (
                                !_bolError &&
                                hfPlasmaCheck === "Y" &&
                                _strRejectGroup !== "MASTER"
                            ) {
                                let _dblPlasmaTime = 0;
                                await axios
                                    .post("/api/Common/GetPlasmaTimeBySerialNo", {
                                        dataList: {
                                            strSerial: _strSerial,
                                            strPlantCode: plantCode,
                                            strPacking: txtPackingNo,
                                            strMasterCode: FINAL_GATE_MASTER_CODE,
                                            strPrdname: _strPrdName,
                                        },
                                    })
                                    .then((res) => {
                                        _dblPlasmaTime = res.data.plasma_time;
                                    });

                                if (_dblPlasmaTime === 0) {
                                    _strMessageUpdate =
                                        _strMessageUpdate + " Skip Plasma / งานไม่ผ่านพลาสม่า";
                                    _strRemark = "Skip Plasma";
                                    _strScanResultUpdate = "NG";
                                    _strTestResultUpdate = _strTestResult;
                                    dtSerial[i].REMARK_UPDATE = _strRemark;
                                    dtSerial[i].ROW_UPDATE = "Y";

                                    _intCountNG = 1;
                                    _bolError = true;
                                } else if (_dblPlasmaTime < 0) {
                                    _strMessageUpdate =
                                        _strMessageUpdate +
                                        " Plasma time do not record / ไม่พบข้อมูลการแสกนก่อนเข้าพลาสม่า";
                                    _strRemark = "Not record plasma time";
                                    _strScanResultUpdate = "NG";
                                    _strTestResultUpdate = _strTestResult;
                                    dtSerial[i].REMARK_UPDATE = _strRemark;
                                    dtSerial[i].ROW_UPDATE = "Y";

                                    _intCountNG = 1;
                                    _bolError = true;
                                } else if (
                                    parseFloat(hfPlasmaTime) < _dblPlasmaTime &&
                                    hfPlasmaHideTime === "N"
                                ) {
                                    _strMessageUpdate =
                                        "Plasma time over " +
                                        hfPlasmaTime +
                                        " hr. / เวลาพลาสม่าเกิน " +
                                        hfPlasmaTime +
                                        " ชม.";
                                    _strRemark = "Plasma time over " + hfPlasmaTime + " hr.";
                                    _strScanResultUpdate = "NG";
                                    _strTestResultUpdate = _strTestResult;
                                    dtSerial[i].REMARK_UPDATE = _strRemark;
                                    dtSerial[i].ROW_UPDATE = "Y";

                                    _intCountNG = 1;
                                    _bolError = true;

                                    _dblPlasmaRemain = 0;
                                } else if (hfPlasmaHideTime === "N") {
                                    if (
                                        _dblPlasmaRemain >
                                        parseFloat(hfPlasmaTime) - _dblPlasmaTime
                                    ) {
                                        _dblPlasmaRemain =
                                            parseFloat(hfPlasmaTime) - _dblPlasmaTime;
                                    }
                                }
                            }

                            if (!_bolError && hfCheckSPIAOI === "Y") {
                                let _Result = "";
                                let _FrontSheetBarcode = "";
                                let _RearSheetBarcode = "";
                                let _strMessage = "";
                                let _intShtSeq = 0;
                                let _dtShtData = [];

                                await axios
                                    .post("/api/Common/GetSheetDataBySerialNo", {
                                        strSerialno: _strSerial,
                                        strPlantCode: plantCode,
                                    })
                                    .then((res) => {
                                        _dtShtData = res.data;
                                    });
                                if (_dtShtData !== "") {
                                    _FrontSheetBarcode = _dtShtData.sheet_no_front;
                                    _RearSheetBarcode = _dtShtData.sheet_no_back;
                                    _intShtSeq = _dtShtData.pcs_no;

                                    await axios
                                        .post("/api/Common/Get_Spi_aoi_result", {
                                            dataList: {
                                                _strPlantCode: plantCode,
                                                _pcsPosition: _intShtSeq,
                                                _frontSheetNumber: _FrontSheetBarcode,
                                                _rearSheetNumber: _RearSheetBarcode,
                                                _strProduct: _strPrdName,
                                                _Message: _strMessage,
                                            },
                                        })
                                        .then((res) => {
                                            _Result = res.data._strresult;
                                            _strMessage = res.data._strmessage;
                                        });

                                    if (_Result === "NG") {
                                        _strScanResultUpdate = _Result;
                                        _strMessageUpdate = _strMessage;
                                        _strRemark = _strMessage;
                                        _strScanResultUpdate = "NG";
                                        _strTestResultUpdate = _Result;
                                        dtSerial[i].REMARK_UPDATE = _strRemark;
                                        dtSerial[i].ROW_UPDATE = "Y";

                                        _intCountNG = 1;
                                        _bolError = true;
                                    }
                                } else {
                                    _strMessageUpdate =
                                        "No data connect sheet / ไม่มีข้อมูลแสกนประกบกับหมายเลขชีส";
                                    _strRemark = "No data connect sheet  ";
                                    _strScanResultUpdate = "NG";
                                    _strTestResultUpdate = _strTestResult;
                                    dtSerial[i].REMARK_UPDATE = _strRemark;
                                    dtSerial[i].ROW_UPDATE = "Y";

                                    _intCountNG = 1;
                                    _bolError = true;
                                }
                            }

                            if (!_bolError) {
                                if (hfTestResultFlagBkp === "Y") {
                                    if (_strTouchUp === "NG" && _strRejectGroup !== "MASTER") {
                                        if (_strTestResult === "OK") {
                                            _strMessageUpdate =
                                                "Touch up result was fail / ผล Touch up ชิ้นงานแสดงไม่ผ่าน";
                                        } else {
                                            _strMessageUpdate =
                                                "Touch up result was fail " +
                                                _strTypeTestResult +
                                                " / " +
                                                "ผล Touch up ชิ้นงานแสดงไม่ผ่าน " +
                                                _strTypeTestResult;
                                        }
                                        _strRemark =
                                            "Touch up result was fail" + _strTypeTestResult;
                                        _strScanResultUpdate = "NG";
                                        _strTestResultUpdate = _strTestResult;
                                        dtSerial[i].REMARK_UPDATE = _strRemark;
                                        dtSerial[i].ROW_UPDATE = "Y";

                                        _bolError = true;
                                    } else if (
                                        _strTouchUp === "NO" &&
                                        _strRejectGroup !== "MASTER"
                                    ) {
                                        if (_strTestResult === "OK") {
                                            _strMessageUpdate =
                                                "Not found touch up result / ไม่พบผล Touch up ชิ้นงาน";
                                        } else {
                                            _strMessageUpdate =
                                                "Not found touch up result " +
                                                _strTypeTestResult +
                                                " / " +
                                                "ไม่พบผล Touch up ชิ้นงาน " +
                                                _strTypeTestResult;
                                        }
                                        _strRemark = "Not found touch up result";
                                        _strScanResultUpdate = "NG";
                                        _strTestResultUpdate = _strTestResult;

                                        dtSerial[i].REMARK_UPDATE = _strRemark;
                                        dtSerial[i].ROW_UPDATE = "Y";

                                        _bolError = true;
                                    } else if (_strTestResult === "OK") {
                                        if (_intCountDup === 0) {
                                            _strScanResultUpdate = "OK";
                                            _strTestResultUpdate = _strTestResult;

                                            dtSerial[i].REMARK_UPDATE = _strRemark;
                                            dtSerial[i].ROW_UPDATE = "Y";
                                        } else {
                                            _strMessageUpdate =
                                                "Duplicate scan serial " +
                                                _strTypeTestResult +
                                                " / " +
                                                "แสกนบาร์โค้ดของชิ้นงานซ้ำ" +
                                                _strTypeTestResult;
                                            _strRemark =
                                                "Duplicate scan serial " + _strTypeTestResult;
                                            _strScanResultUpdate = "NG";
                                            _strTestResultUpdate = _strTestResult;

                                            dtSerial[i].REMARK_UPDATE = _strRemark;
                                            dtSerial[i].ROW_UPDATE = "Y";

                                            _bolError = true;
                                        }
                                    } else if (_strTestResult === "NG") {
                                        _strMessageUpdate =
                                            "Test result was fail " +
                                            _strTypeTestResult +
                                            " / " +
                                            "ผลทดสอบชิ้นงานแสดงไม่ผ่าน " +
                                            _strTypeTestResult;
                                        _strRemark = "Test result was fail" + _strTypeTestResult;
                                        _strScanResultUpdate = "NG";
                                        _strTestResultUpdate = _strTestResult;

                                        dtSerial[i].REMARK_UPDATE = _strRemark;
                                        dtSerial[i].ROW_UPDATE = "Y";

                                        _bolError = true;
                                    } else {
                                        _strMessageUpdate =
                                            "Not found test result " +
                                            _strTypeTestResult +
                                            " / " +
                                            "ไม่พบผลทดสอบชิ้นงาน " +
                                            _strTypeTestResult;
                                        _strRemark = "Not found test result " + _strTypeTestResult;
                                        _strScanResultUpdate = "NG";
                                        _strTestResultUpdate = _strTestResult;

                                        dtSerial[i].REMARK_UPDATE = _strRemark;
                                        dtSerial[i].ROW_UPDATE = "Y";

                                        _bolError = true;
                                    }
                                } else {
                                    if (_intCountDup === 0) {
                                        _strScanResultUpdate = "OK";
                                        _strTestResultUpdate = "OK";

                                        dtSerial[i].REMARK_UPDATE = _strRemark;
                                        dtSerial[i].ROW_UPDATE = "Y";
                                    } else {
                                        _strMessageUpdate =
                                            "Duplicate scan serial " +
                                            _strTypeTestResult +
                                            " / " +
                                            "แสกนบาร์โค้ดของชิ้นงานซ้ำ" +
                                            _strTypeTestResult;
                                        _strRemark = "Duplicate scan serial " + _strTypeTestResult;
                                        _strScanResultUpdate = "NG";
                                        _strTestResultUpdate = _strTestResult;

                                        dtSerial[i].REMARK_UPDATE = _strRemark;
                                        dtSerial[i].ROW_UPDATE = "Y";

                                        _bolError = true;
                                    }
                                }
                            }

                            if (hfChipIDCheck === "Y" && _bolError === false) {
                                let _intCheckPass = 0;
                                await axios
                                    .post("/api/common/GetCheckChipDuplicate", {
                                        dataList: {
                                            _strPrdName: _strPrdName,
                                            _strSerial: _strSerial,
                                            _strPlantCode: plantCode,
                                        },
                                    })
                                    .then((res) => {
                                        _intCheckPass = res.data;
                                    });

                                if (_intCheckPass === 0) {
                                    _strMessageUpdate = "USER SKIP TEST ELT2";
                                    _strRemark = "USER SKIP TEST ELT2";
                                    _strScanResultUpdate = "NG";
                                    _strTestResultUpdate = _strTestResult;
                                    dtSerial[i].REMARK_UPDATE = _strRemark;
                                    dtSerial[i].ROW_UPDATE = "Y";

                                    _intCountNG = 1;
                                    _bolError = true;
                                }
                            }

                            if (
                                hfCheckEFPCAOM === "Y" ||
                                hfCheckEFPCAOI === "Y" ||
                                hfCheckEFPCOST === "Y" ||
                                hfCheckEFPCAVI === "Y"
                            ) {
                                let _strEFPCResult = "";
                                let _strEFPCRemark = "";
                                await axios
                                    .post("/api/Common/GetEFPCSheetInspectionResult", {
                                        _strPlantCode: plantCode,
                                        _strProduct: _strPrdName,
                                        _strFrontSheetNo: dtSerial[i].FRONT_SHEET_NO,
                                        _strBackSheetNo: dtSerial[i].BACK_SHEET_NO,
                                        _intPcsNo: dtSerial[i].SHEET_PCS_NO,
                                        _strAOMFlg: hfCheckEFPCAOM,
                                        _strAOIFlg: hfCheckEFPCAOI,
                                        _strOSTFlg: hfCheckEFPCOST,
                                        _strAVIFlg: hfCheckEFPCAVI,
                                        _strResult: _strEFPCResult,
                                    })
                                    .then((res) => {
                                        _strEFPCRemark = res.data;
                                    });
                                if (_strEFPCResult === "NG") {
                                    _strMessageUpdate = _strEFPCRemark;
                                    _strRemark = _strEFPCRemark;
                                    _strScanResultUpdate = "NG";
                                    _strTestResultUpdate = _strTestResult;
                                    dtSerial[i].REMARK_UPDATE = _strRemark;
                                    dtSerial[i].ROW_UPDATE = "Y";

                                    _intCountNG = 1;
                                    _bolError = true;
                                }
                            }

                            if (hfCheckFinInspect === "Y" && _bolError === false) {
                                let _strInspResult = "";
                                await axios
                                    .post("/api/Common/GetSerialFinInspectResult", {
                                        dataList: {
                                            _strSerialNo: _strSerial,
                                            _strProc: hfCheckFinInspectProc,
                                            _strPlantCode: plantCode,
                                        },
                                    })
                                    .then((res) => {
                                        _strInspResult = res.data;
                                    });
                                if (_strInspResult !== "OK") {
                                    _strMessageUpdate = _strMessageUpdate + _strInspResult;
                                    _strRemark = _strInspResult;
                                    _strScanResultUpdate = "NG";
                                    _strTestResultUpdate = _strTestResult;
                                    dtSerial[i].REMARK_UPDATE = _strRemark;
                                    dtSerial[i].ROW_UPDATE = "Y";

                                    _intCountNG = 1;
                                    _bolError = true;
                                }
                            }

                            if (
                                FINAL_GATE_SPECIAL_FLG === "1" &&
                                FINAL_GATE_SPECIAL_PRD.includes(_strPrdName) > 0 &&
                                _bolError === false
                            ) {
                                let _intCheckPass = 0;
                                await axios
                                    .post("/api/Common/getcheckspecialbyserial", {
                                        dataList: {
                                            strSerialno: _strSerial,
                                            strPlantCode: plantCode,
                                        },
                                    })
                                    .then((res) => {
                                        _intCheckPass = res.data;
                                    });
                                if (_intCheckPass === 0) {
                                    _strMessageUpdate = FINAL_GATE_SPECIAL_MESSAGE;
                                    _strRemark = FINAL_GATE_SPECIAL_MESSAGE;
                                    _strScanResultUpdate = "NG";
                                    _strTestResultUpdate = _strTestResult;
                                    dtSerial[i].REMARK_UPDATE = _strRemark;
                                    dtSerial[i].ROW_UPDATE = "Y";

                                    _intCountNG = 1;
                                    _bolError = true;
                                }
                            }
                        } else {
                            _strMessageUpdate =
                                "Serial not matching product / หมายเลขบาร์โค้ดไม่ตรงตามที่กำหนดไว้";
                            _strRemark = "Serial barcode not matching product";
                            _strScanResultUpdate = "NG";
                            _strTestResultUpdate = _strTestResult;

                            dtSerial[i].REMARK_UPDATE = _strRemark;
                            dtSerial[i].ROW_UPDATE = "Y";

                            _bolError = true;
                        }

                        if (_bolError) {
                            setlblSerialNG((parseInt(lblSerialNG) + 1).toString());
                        }

                        dtSerial[i].REJECT = _strReject1;
                        dtSerial[i].TOUCH_UP = _strTouchUp;
                        dtSerial[i].REJECT2 = _strReject2;
                        dtSerial[i].SCAN_RESULT = _strScanResultUpdate;
                        dtSerial[i].TEST_RESULT = _strTestResultUpdate;
                        dtSerial[i].REMARK = _strMessageUpdate;

                        if (_strScanResultUpdate === "NG") {
                            _strScanResultAll = "NG";
                        }
                    } else {
                        dtSerial[i].SCAN_RESULT = "";
                        dtSerial[i].ROW_UPDATE = "N";
                        _strScanResultAll = "NG";
                    }
                    _intRowSerial = _intRowSerial + 1;
                }
                setlblResult(_strScanResultAll);

                if (_strScanResultAll === "NG") {
                    setlblResultcolor("red");
                } else {
                    setlblResultcolor("green");
                }

                if (hfPlasmaCheck === "Y" && hfPlasmaHideTime === "N") {
                    if (_dblPlasmaRemain > 0) {
                        //setlblTime("Remain ");
                        if (Math.floor(_dblPlasmaRemain) > 0) {
                            const formattedText = `${Math.floor(_dblPlasmaRemain)} hr.`;
                            setlblTime("Remain" + formattedText);
                        }
                        const fractionalPart = _dblPlasmaRemain % 1;
                        if (fractionalPart > 0) {
                            let newlblTime = lblTime;
                            const minutes = Math.floor(fractionalPart * 60);
                            newlblTime += `${minutes} min. `;
                            setlblTime(newlblTime);
                            setlblTimecolor("green");
                        }
                    } else {
                        setlblTime("Over " + hfPlasmaTime + " hr.");
                        setlblTimecolor("red");
                    }
                } else {
                    setlblTime("");
                    setlblTimecolor("#fff");
                }

                let _strErrorUpdate = "";
                for (let i = 0; i < dtSerial.length; i++) {

                    if (dtSerial[i].SERIAL == "") {
                        continue;
                    }
                    await axios
                        .post("/api/Common/SetSerialLotTrayTableGood2", {
                            dataList: {
                                strPlantCode: plantCode,
                                strPrdName: _strPrdName,
                                strLot: _strLot,
                                strUserID: hfUserID,
                                strStation: hfUserStation,
                                SCAN_RESULT: dtSerial[i].SCAN_RESULT,
                                SERIAL: dtSerial[i].SERIAL,
                                UPDATE_FLG: dtSerial[i].UPDATE_FLG,
                                ROW_UPDATE: dtSerial[i].ROW_UPDATE,
                                REJECT_CODE: dtSerial[i].REJECT_CODE,
                                TEST_RESULT: dtSerial[i].TEST_RESULT,
                                REMARK_UPDATE: dtSerial[i].REMARK_UPDATE,
                                PACKING_NO: dtSerial[i].PACKING_NO,
                                strPage: "ScanSMTSerialPcsAutoTray",
                            },
                        })
                        .then((res) => {
                            _strErrorUpdate = res.data.p_error;
                        });
                }

                // let _strErrorUpdate = "";
                // await axios.post("/api/Common/SetSerialLotTrayTableGood2", {
                //     dataList: {
                //         strPlantCode: plantCode,
                //         strPrdName: _strPrdName,
                //         strLot: _strLot,
                //         strUserID: hfUserID,
                //         strStation: hfUserStation,
                //         // SCAN_RESULT: item.SCAN_RESULT,
                //         // SERIAL: item.SERIAL,
                //         // UPDATE_FLG: item.UPDATE_FLG,
                //         // ROW_UPDATE: item.ROW_UPDATE,
                //         // REJECT_CODE: item.REJECT_CODE,
                //         // TEST_RESULT: item.TEST_RESULT,
                //         // REMARK_UPDATE: item.REMARK_UPDATE,
                //         // PACKING_NO: item.PACKING_NO,
                //         strPage: "ScanSMTSerialPcsAutoTray",
                //     },
                //     dtSerial: dtSerial,
                // })
                //     .then((res) => {
                //         _strErrorUpdate = res.data.p_error;
                //     });

                if (_strErrorUpdate !== "") {
                    setlblResult("Error : " + _strErrorUpdate);
                    setlblResultcolor("red");
                }
            }
            let datalblLotTotal = 0;
            let dtLotPassCount = 0;
            let dtPackPassCount = 0;
            if (hfCheckPackingNo === "Y") {
                await axios
                    .post("/api/Common/getSerialPassByLot", {
                        strLotNo: _strLot,
                        strPlantCode: plantCode,
                    })
                    .then((res) => {
                        dtLotPassCount = res.data.lotcount;
                    });
                await axios
                    .post("/api/Common/GetSerialPassByLotPacking", {
                        strlotNo: lblLot,
                        strPackingGroup: txtPackingNo,
                        strPlantCode: plantCode,
                    })
                    .then((res) => {
                        dtPackPassCount = res.data.lot_count;
                    });
                if (dtLotPassCount > 0) {
                    datalblLotTotal = dtLotPassCount;
                }
                if (dtPackPassCount > 0) {
                    datalblLotTotal = dtPackPassCount + " / " + dtLotPassCount;
                } else {
                    datalblLotTotal = "0 / " + dtLotPassCount;
                }
                setlblLotTotal(datalblLotTotal);
            } else {
                await axios
                    .post("/api/Common/getSerialPassByLot", {
                        strLotNo: _strLot,
                        strPlantCode: plantCode,
                    })
                    .then((res) => {
                        dtLotPassCount = res.data.lotcount;
                    });
                if (dtLotPassCount.length > 0) {
                    setlblLotTotal(dtLotPassCount);
                }
            }

            if (!_bolTrayError) {
                setgvScanResult(true);
                setgvScanData(dtSerial);
            } else {
                setgvScanData([]);
            }

            if (EXPORT_CSV_FLG === "Y") {
                ExportGridToCSV(dtSerial, columns);
            }

            settxtPcsTray(hfSerialCountOriginal);
            sethfSerialCount(hfSerialCountOriginal);
            setlblLastTray("Not Use");

            getInitialSerial();

            hideLoading();
        } catch (e) {
            console.error(e);
            hideLoading();
        }
    };

    const getInputSerial = async (txtgvSerial) => {
        let dtData = [];
        let intRow = 0;

        for (let intSeq = 0; intSeq < gvSerialData.length; intSeq++) {
            intRow++;

            let drRow = {
                SEQ: intRow,
                SERIAL: txtgvSerial[intSeq] || "",
                REJECT: "",
                TOUCH_UP: "",
                REJECT2: "",
                REJECT_CODE: "",
                SCAN_RESULT: "",
                TEST_RESULT: "",
                TYPE_TEST_RESULT: "",
                REMARK: "",
                REMARK_UPDATE: "",
                ROW_COUNT: 0,
                ROW_UPDATE: "N",
                UPDATE_FLG: "N",
                PACKING_NO: txtPackingNo,
                FRONT_SHEET_NO: "",
                BACK_SHEET_NO: "",
                SHEET_PCS_NO: 0,
                ROLL_LEAF_NO: "",
            };
            if (drRow.SERIAL !== "") {
                for (let intNo = 0; intNo < intRow - 1; intNo++) {
                    if (drRow.SERIAL === txtgvSerial[intNo]) {
                        drRow.ROW_COUNT = 9;
                        break;
                    }
                }
            }
            dtData.push(drRow);
        }

        return dtData;
    };

    const getProductSerialMaster = async (_strPrdName) => {
        let dtProductSerial = [];
        sethfSerialLength("0");
        sethfSerialFixFlag("N");
        sethfSerialDigit("");
        sethfSerialStartDigit("0");
        sethfSerialEndDigit("0");
        sethfTrayFlag("");
        sethfTrayLength("0");
        hfTestResultFlagBkp = ""
        sethfTestResultFlag("");
        sethfConfigCheck("N");
        sethfConfigCode("");
        sethfConfigStart("0");
        sethfConfigEnd("0");
        sethfConfigRuning("N");
        sethfDuplicateStart("0");
        sethfDuplicateEnd("0");
        sethfChipIDCheck("N");
        sethfCheckPrdSht("N");
        sethfCheckPrdShtStart("0");
        sethfCheckPrdShtEnd("0");
        sethfCheckPrdAbbr("");
        sethfPlasmaCheck("N");
        sethfPlasmaTime("0");
        sethfLotLength("9");

        sethfCheckStartSeq("N");
        sethfCheckStartSeqCode("");
        sethfCheckStartSeqStart("0");
        sethfCheckStartSeqEnd("0");
        sethfCheckSPIAOI("N");
        sethfCheckDateInProc("N");
        sethfDateInProc("");
        sethfCheckWeekCode("N");
        sethfCheckWeekCodeStart("");
        sethfCheckWeekCodeEnd("");
        sethfWeekCode("");
        sethfWeekCodeType("");
        sethfCheckPreAOIF("N");
        sethfCheckPreAOIB("N");
        sethfCheckAOIF("N");
        sethfCheckAOIB("N");
        sethfCheckSPIF("N");
        sethfCheckSPIB("N");
        sethfCheckPackingNo("N");
        sethfSerialStartCode("");
        sethfPlasmaSkipELT("N");
        sethfPlasmaHideTime("N");

        sethfCheckEFPCAOM("N");
        sethfCheckEFPCAOI("N");
        sethfCheckEFPCOST("N");
        sethfCheckEFPCAVI("N");
        sethfCheckXrayF("N");
        sethfCheckXrayB("N");
        sethfCheckXrayOneTime("N");
        sethfCheckFinInspect("N");
        sethfCheckFinInspectProc("");

        await axios
            .post("/api/common/GetSerialProductByProduct", {
                prdName: _strPrdName,
            })
            .then((res) => {
                dtProductSerial = res.data[0];
                if (dtProductSerial !== null) {
                    sethfSerialLength(dtProductSerial.slm_serial_length);
                    sethfSerialFixFlag(dtProductSerial.slm_fix_flag);
                    sethfSerialDigit(dtProductSerial.slm_fix_digit);
                    sethfSerialStartDigit(dtProductSerial.slm_fix_start_digit);
                    sethfSerialEndDigit(dtProductSerial.slm_fix_end_digit);
                    sethfTrayFlag(dtProductSerial.slm_tray_flag);
                    sethfTrayLength(dtProductSerial.slm_tray_length);
                    hfTestResultFlagBkp = dtProductSerial.slm_test_result_flag
                    sethfTestResultFlag(dtProductSerial.slm_test_result_flag);
                    sethfSerialCount(dtProductSerial.prm_pcs_tray);
                    sethfAutoScan(dtProductSerial.slm_auto_scan);
                    sethfConfigCheck(dtProductSerial.prm_barcode_req_config);
                    sethfConfigCode(dtProductSerial.prm_config_code);
                    sethfConfigStart(dtProductSerial.prm_start_config);
                    sethfConfigEnd(dtProductSerial.prm_end_config);
                    sethfConfigRuning(dtProductSerial.prm_running_req_config);
                    sethfDuplicateStart(dtProductSerial.prm_duplicate_start);
                    sethfDuplicateEnd(dtProductSerial.prm_duplicate_end);
                    sethfChipIDCheck(dtProductSerial.prm_check_chip_id_flg);
                    sethfCheckPrdSht(dtProductSerial.prm_req_check_prd_sht);
                    sethfCheckPrdShtStart(dtProductSerial.prm_check_prd_sht_start);
                    sethfCheckPrdShtEnd(dtProductSerial.prm_check_prd_sht_end);
                    sethfCheckPrdAbbr(dtProductSerial.prm_abbr);
                    sethfPlasmaCheck(dtProductSerial.prm_plasma_time_flg);
                    sethfPlasmaTime(dtProductSerial.prm_plasma_time);
                    sethfCheckStartSeq(dtProductSerial.prm_req_start_seq_flg);
                    sethfCheckStartSeqCode(dtProductSerial.prm_start_seq_code);
                    sethfCheckStartSeqStart(dtProductSerial.prm_start_seq_start);
                    sethfCheckStartSeqEnd(dtProductSerial.prm_start_seq_end);
                    sethfCheckSPIAOI(dtProductSerial.prm_final_aoi_spi_flg);
                    sethfCheckDateInProc(dtProductSerial.prm_date_inproc_flg);
                    sethfDateInProc(dtProductSerial.prm_date_inproc);
                    sethfWeekCodeType(dtProductSerial.prm_date_type);
                    sethfCheckWeekCode(dtProductSerial.prm_check_weekcode_flg);
                    sethfCheckWeekCodeStart(dtProductSerial.prm_check_weekcode_start);
                    sethfCheckWeekCodeEnd(dtProductSerial.prm_check_weekcode_end);
                    sethfCheckPreAOIF(dtProductSerial.prm_sht_pre_aoi_f);
                    sethfCheckPreAOIB(dtProductSerial.prm_sht_pre_aoi_b);
                    sethfCheckAOIF(dtProductSerial.prm_sht_aoi_f);
                    sethfCheckAOIB(dtProductSerial.prm_sht_aoi_b);
                    sethfCheckAOICoatF(dtProductSerial.prm_sht_aoi_coat_f);
                    sethfCheckAOICoatB(dtProductSerial.prm_sht_aoi_coat_b);
                    sethfCheckSPIF(dtProductSerial.prm_sht_spi_f);
                    sethfCheckSPIB(dtProductSerial.prm_sht_spi_b);
                    sethfCheckPackingNo(dtProductSerial.prm_final_packing_group_flg);
                    sethfSerialStartCode(dtProductSerial.prm_serial_start_code);
                    sethfPlasmaSkipELT(dtProductSerial.prm_plasma_time_skip_elt);
                    sethfPlasmaHideTime(dtProductSerial.prm_plasma_time_hide_time);
                    sethfCheckEFPCAOM(dtProductSerial.prm_check_efpc_aom_flg);
                    sethfCheckEFPCAOI(dtProductSerial.prm_check_efpc_aoi_flg);
                    sethfCheckEFPCOST(dtProductSerial.prm_check_efpc_ost_flg);
                    sethfCheckEFPCAVI(dtProductSerial.prm_check_efpc_avi_flg);
                    sethfSerialInfo(dtProductSerial.prm_additional_info);
                    sethfCheckXrayF(dtProductSerial.prm_sht_xray_f);
                    sethfCheckXrayB(dtProductSerial.prm_sht_xray_b);
                    sethfCheckXrayOneTime(dtProductSerial.prm_sht_xray_1_time_flg);
                    sethfCheckFinInspect(dtProductSerial.prm_fin_gate_inspect_flg);
                    sethfCheckFinInspectProc(dtProductSerial.prm_fin_gate_inspect_proc);
                }
            });
        settxtPcsTray(dtProductSerial?.prm_pcs_tray);
        sethfSerialCountOriginal(dtProductSerial?.prm_pcs_tray);
        return dtProductSerial;
    };

    const columns = [
        {
            title: "No.",
            dataIndex: "SEQ",
            key: "No.",
            render: (text, record, index) => {
                return index + 1;
            },
            align: "center",
        },
        {
            title: "Serial No.",
            dataIndex: "SERIAL",
            key: "Serial No.",
            align: "left",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "Re-Judgement 1",
            dataIndex: "REJECT",
            key: "Re-Judgement 1",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },

        {
            title: "Result",
            key: "Result",
            dataIndex: "TOUCH_UP",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "Re-Judgement 2",
            key: "Re-Judgement 2",
            dataIndex: "REJECT2",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "Test Result",
            key: "Test Result",
            dataIndex: "TEST_RESULT",

            render: (text, record, index) => {
                return text;
            },
            align: "center",
        },
        {
            title: "Scan Result",
            key: "Scan Result",
            dataIndex: "SCAN_RESULT",

            render: (text, record, index) => {
                if (record.SERIAL == "") {
                    return "";
                } else {
                    return text;
                }
                // if (text == '')
                //     return text;
                // else {
                //     return (
                //         <Tag
                //             className={text === "OK" ? "Tag-OK" : text === "NG" ? "Tag-NG" : ""}
                //         >
                //             {text}
                //         </Tag>
                //     );
                // }
            },
            align: "center",
        },
        {
            title: "Remark",
            key: "Remark",
            dataIndex: "REMARK",

            render: (text, record, index) => {
                return text;
            },
            align: "center",
        },
    ];

    useEffect(() => {
        if (!txtLotDisabled) {
            inputLot.current.focus();
        }
        if (pnlPackingGroup && txtPackingNo === "") {
            inputPackingNo.current.focus();
        }
        if (hfMode === "SERIAL" && inputgvSerial.current[0]) {
            inputgvSerial.current[0].focus();
        }
    }, [txtLotDisabled, txtPackingNoDisabled, pnlPackingGroup, gvSerialData]);

    const handleKeygvSerial = (e, index) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const nextIndex = index + 1;
            if (nextIndex < hfSerialCount && inputgvSerial.current[nextIndex]) {
                inputgvSerial.current[nextIndex].focus();
            } else if (nextIndex === nextIndex) {
                btnSaveClick();
            }
        }
    };

    // const btnHiddenClick = () => {
    //     ExportGridToCSV(gvScanData, 'ELTResult.csv');
    // };

    //Export
    // const ExportGridToCSV = async (data, nameFile) => {
    //     if (data.length <= 0) {
    //         Swal.fire({
    //             icon: "error",
    //             title: "No Data Export!",
    //         });
    //     } else {
    //         exportExcelFile(data, nameFile);
    //     }
    // };

    // const exportExcelFile = (data, namefile) => {
    //     const workbook = new ExcelJS.Workbook();
    //     const sheet = workbook.addWorksheet("My Sheet");
    //     sheet.properties.defaultRowHeight = 20;

    //     // สร้างคอลัมน์แบบ dynamic
    //     const dynamicColumns = Object.keys(data[0] || {}).map((key) => ({
    //         header: key.toUpperCase(), // ทำให้ header เป็นตัวพิมพ์ใหญ่
    //         key: key,
    //         width: 10, // กำหนดขนาดความกว้างเริ่มต้น
    //         style: { alignment: { horizontal: "center" } },
    //     }));

    //     sheet.columns = dynamicColumns;

    //     // ถ้าไม่มีข้อมูลก็สร้างแถวว่าง
    //     if (data.length === 0) {
    //         const emptyRow = {};
    //         dynamicColumns.forEach((col) => (emptyRow[col.key] = "")); // เติมค่าค่าว่าง
    //         data.push(emptyRow);
    //     }

    //     // ใส่ข้อมูลลงใน sheet
    //     data.forEach((row) => {
    //         const newRow = sheet.addRow(row);
    //         newRow.eachCell({ includeEmpty: true }, (cell) => {
    //             // includeEmpty เพื่อให้ทุก cell รวมถึงที่ว่างมีเส้นขอบ
    //             cell.alignment = { horizontal: "center" };

    //             // เพิ่มเส้นขอบให้ทุก cell
    //             cell.border = {
    //                 top: { style: "thin" },
    //                 left: { style: "thin" },
    //                 bottom: { style: "thin" },
    //                 right: { style: "thin" },
    //             };
    //         });
    //     });

    //     // จัดรูปแบบให้แถวแรก (header)
    //     const firstRow = sheet.getRow(1);
    //     firstRow.eachCell({ includeEmpty: true }, (cell) => {
    //         cell.fill = {
    //             type: "pattern",
    //             pattern: "solid",
    //             fgColor: { argb: "FFFF00" }, // สีพื้นหลังเหลือง
    //         };
    //         cell.font = {
    //             name: "Roboto",
    //             size: 9,
    //             bold: true,
    //         };

    //         // เพิ่มเส้นขอบให้ header
    //         cell.border = {
    //             top: { style: "thin" },
    //             left: { style: "thin" },
    //             bottom: { style: "thin" },
    //             right: { style: "thin" },
    //         };
    //     });

    //     // กำหนดความกว้างของคอลัมน์ให้พอดีกับข้อความ
    //     sheet.columns.forEach((column) => {
    //         let maxWidth = column.header.length; // เริ่มต้นความกว้างจากความยาวของ header
    //         data.forEach((row) => {
    //             const cellValue = String(row[column.key] || ""); // แปลงค่าเป็นสตริง
    //             maxWidth = Math.max(maxWidth, cellValue.length); // คำนวณความกว้างสูงสุด
    //         });
    //         column.width = maxWidth + 2; // เพิ่มขนาดพิเศษเล็กน้อยเพื่อความสบาย
    //     });

    //     // สร้างไฟล์ Excel
    //     workbook.xlsx.writeBuffer().then((buffer) => {
    //         const blob = new Blob([buffer], { type: "application/octet-stream" });
    //         saveAs(blob, `${namefile}`);
    //     });
    // };

    const ExportGridToCSV = (data, ColumnsHeader) => {
        const date = new Date();
        const formattedDate = `${String(date.getDate()).padStart(2, "0")}/${String(
            date.getMonth() + 1
        ).padStart(2, "0")}/${date.getFullYear()}`;

        const filteredColumns = ColumnsHeader.filter(
            (col) => col.title !== "" && col.key !== null && col.title !== undefined
        );

        const headers = filteredColumns.map((col) => col.key);

        const filteredData = data.map((row) =>
            filteredColumns.map((col) => row[col.dataIndex] || "")
        );

        const csvContent = [
            headers.join(","),
            ...filteredData.map((row) => row.join(",")),
        ].join("\n");

        const bom = "\uFEFF";
        const blob = new Blob([bom + csvContent], {
            type: "text/csv;charset=utf-8;",
        });
        saveAs(blob, `ELTResult.csv`);
    };

    return {
        txtLot,
        selProduct,
        Productdata,
        txtPackingNo,
        lblLot,
        lblLotTotal,
        txtPcsTray,
        lblSerialNG,
        lblLog,
        visiblelog,
        lblResult,
        lblResultcolor,
        lblTime,
        pnlPackingGroup,
        pnlSerial,
        hfSerialCount,
        txtgvSerial,
        txtLotDisabled,
        selProDisabled,
        txtPackingNoDisabled,
        inputLot,
        ddlProduct,
        inputPackingNo,
        inputgvSerial,
        inputTray,
        handleChangeLot,
        ibtBackClick,
        handleChangeProduct,
        handleChangePackingNo,
        ibtPackingBackClick,
        handleChangePcsTray,
        settxtLot,
        settxtPackingNo,
        settxtPcsTray,
        handleChangeSerial,
        handleKeygvSerial,
        btnSaveClick,
        btnCancelClick,
        gvScanData,
        gvScanResult,
        lblTimecolor,
        lblLastTray,
        columns,
        settxtgvSerial,
        gvSerialData,
    };
}

export { fn_ScanSMTSerialPcsAutoTray };
