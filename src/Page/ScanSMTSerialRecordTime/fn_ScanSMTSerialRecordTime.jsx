import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function fn_ScanSMTSerialRecordTime() {
    const [selectedrbt, setselectedrbt] = useState("");
    const [txtMachine, settxtMachine] = useState("");
    const [txtOperator, settxtOperator] = useState("");
    const [txtTotalPcs, settxtTotalPcs] = useState("");
    const [selrbtPcsSht, setselrbtPcsSht] = useState("rbtPcs");
    // const [rbtPcs, setrbtPcs] = useState(false);
    // const [rbtSht, setrbtSht] = useState(false);
    const [txtLotNo, settxtLotNo] = useState("");
    const [selProduct, setselProduct] = useState(null);
    const [Productdata, setProductdata] = useState([]);
    const [txtRackNo, settxtRackNo] = useState("");
    const [lblLot, setlblLot] = useState("");
    const [lblLotTotal, setlblLotTotal] = useState("");
    const [lblLog, setlblLog] = useState("");
    const [visiblelog, setvisiblelog] = useState(false);
    const [lblResult, setlblResult] = useState("");
    const [lblResultcolor, setlblResultcolor] = useState("green");
    const [pnlMachine, setpnlMachine] = useState(true);
    const [pnlRackNo, setpnlRackNo] = useState(false);
    let eventArgument = "";
    const [lblOP, setlblOP] = useState("");
    const [pnlOP, setpnlOP] = useState(false);

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
    const [hfSerialInfo, sethfSerialInfo] = useState("");
    const [hfOP, sethfOP] = useState("");

    //Table
    const [pnlSerial, setpnlSerial] = useState(false);
    const [gvSerialData, setgvSerialData] = useState([]);
    const [gvScanResult, setgvScanResult] = useState(false);
    const [gvScanData, setgvScanData] = useState([]);
    const [txtgvSerial, settxtgvSerial] = useState(Array(hfSerialCount).fill(""));

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
    const ddlProduct = useRef(null);
    const inputgvSerial = useRef(null);
    const inputRackNo = useRef(null);

    const plantCode = import.meta.env.VITE_FAC;
    const _strTagNewLine = "\n";

    useEffect(() => {
        localStorage.setItem("hfUserID", localStorage.getItem("ipAddress"));
        localStorage.setItem("hfUserStation", localStorage.getItem("ipAddress"));
        sethfPlantCode(import.meta.env.VITE_FAC);
        sethfProductKind(import.meta.env.VITE_PRODUCT_KIND);
        localStorage.setItem("hfMode", "");
        getProductData();
        setselectedrbt("rbtRecordTime");

        const queryParams = new URLSearchParams(window.location.search);
        const op = queryParams.get("OP");

        if (op !== null) {
            set(op);
        } else {
            sethfOP("");
        }

        SetMode("RECORD");
    }, []);

    useEffect(() => {
        if (eventArgument === "Save") {
            setSerialDataTray();
        }
    }, [eventArgument]);

    const getProductData = async () => {
        axios.get("/api/Common/GetProductData").then((res) => {
            let data = res.data.flat();
            setProductdata(data);
            setselProduct(data[0].prd_name);
        });
    };

    const handleChangerbt = (event) => {
        const newValue = event.target.value;
        setselectedrbt(newValue);

        if (newValue === "rbtRecordTime") {
            SetMode("RECORD");
        } else if (newValue === "rbtPlasmaTime") {
            SetMode("PLASMA");
        }
    };

    const handleChangeMachine = () => {
        if (txtMachine !== "") {
            const Machine = txtMachine.toUpperCase().trim();
            settxtMachine(Machine);
            SetMode("OP");
        }
    };

    const ibtMCBackClick = () => {
        SetMode("MC");
    };

    const handleChangeOperator = () => {
        if (txtOperator !== "") {
            const Operator = txtOperator.toUpperCase();
            settxtOperator(Operator);
            if (hfOP !== "") {
                const strOPData = lblOP.toUpperCase().split(",");
                for (let intRow = 0; intRow < strOPData.length; intRow++) {
                    if (strOPData[intRow] === txtOperator) {
                        setbolError(true);
                        break;
                    }
                }
                if (!bolError) {
                    if (strOPData.length === parseInt(hfOP)) {
                        setlblOP(lblOP + txtOperator);
                        settxtOperator(lblOP + txtOperator);
                        SetMode("PCS");
                    } else {
                        setlblOP(lblOP + txtOperator + ",");
                        settxtOperator("");
                        inputOperator.current.focus();
                    }
                }
            } else {
                SetMode("PCS");
            }
        }
    };

    const ibtOperatorClick = () => {
        SetMode("OP");
    };

    const handleChangeTotalPcs = () => {
        if (txtTotalPcs !== "" && !isNaN(txtTotalPcs)) {
            sethfSerialCount(txtTotalPcs);
            SetMode("LOT");
        } else {
            sethfSerialCount("0");
            SetMode("PCS");
        }
    };

    const handleChangerbtPcsSht = (event) => {
        setselrbtPcsSht(event.target.value);
    };

    const ibtPcsBackClick = () => {
        sethfSerialCount("0");
        SetMode("PCS");
    };

    const handleChangeLot = async () => {
        let strLot = "";
        let strPrdName = "";
        const strLotData = txtLotNo.toUpperCase().split(";");
        strLot = strLotData[0];
        axios.post("/api/Common/getProductNameByLot", {
            strLot: strLot,
        })
            .then((res) => {
                strPrdName = res.data.prdName[0];
                console.log("PrdName:", strPrdName);
                if (strPrdName !== "") {
                    setlblLog("");
                    setvisiblelog(false);
                    settxtLotNo(strLot);
                    setlblLot(strLot);
                    getCountDataBylot(strLot);
                    try {
                        setselProduct(strPrdName);
                        getProductSerialMaster(strPrdName);
                        SetMode("SERIAL");
                    } catch (error) {
                        const intProduct = strPrdName.indexOf('-', 12);
                        if (intProduct > -1) {
                            strPrdName =
                                strPrdName.substring(0, intProduct) +
                                strPrdName
                                    .substring(intProduct + 1, intProduct + 11)
                                    .trim();
                            try {
                                setselProduct(strPrdName);
                                getProductSerialMaster(strPrdName);
                                SetMode("SERIAL");
                            } catch (error) {
                                setlblLog("Product " + strPrdName + " not found.");
                                setvisiblelog(true);
                                ddlProduct.current.focus();
                            }
                        } else {
                            setlblLog("Product " + strPrdName + " not found.");
                            setvisiblelog(true);
                            ddlProduct.current.focus();
                        }
                    }
                } else {
                    setselProduct(Productdata[0].prd_name);
                    settxtLotNo("");
                    setlblLot("");
                    setgvSerialData([]);
                    setlblLog("Invalid lot no.");
                    setvisiblelog(true);
                    sethfMode("LOT");
                    inputLot.current.focus();
                }
            });
    };

    const ibtBackClick = () => {
        settxtLotNo("");
        setistxtLotDisabled(false);
        setpnlSerial(false);
        setselProduct(Productdata[0].prd_name);
        SetMode("LOT");
        inputLot.current.focus();
    };

    const handleChangeProduct = async (value) => {
        setselProduct(value);
        getProductSerialMaster(value);
        if (txtLotNo !== "") {
            setlblLog("");
            setvisiblelog(false);
            getCountDataBylot(txtLotNo);
            SetMode("SERIAL");
        } else {
            setselProduct(Productdata[0].prd_name);
            SetMode("LOT");
        }
    };

    const [dtSerialCount, setdtSerailCount] = useState([]);
    const getCountDataBylot = (strLot) => {
        let strType = "";
        setlblLotTotal("0");
        if (selrbtPcsSht === "rbtPcs") {
            strType = "PCS";
        } else {
            strType = "SHT";
        }
        axios.post("/api/Common/getLotSerialRecordTimeData", {
            strLotNo: strLot,
            strPlantCode: plantCode
        })
            .then((res) => {
                setdtSerailCount(res.data.count_pcs);
            })
        if (dtSerialCount.length > 0) {
            const countPcs = dtSerialCount.count_pcs;
            setlblLotTotal(countPcs.toLocaleString());
        }
    };

    const getProductSerialMaster = async (strPrdName) => {
        let dtPro = "";
        sethfSerialLength("0");
        sethfSerialFixFlag("N");
        sethfSerialDigit("");
        sethfSerialStartDigit("0");
        sethfSerialEndDigit("0");
        sethfTrayFlag("");
        sethfTrayLength("0");
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

        sethfCheckStartSeq("N");
        sethfCheckStartSeqCode("");
        sethfCheckStartSeqStart("0");
        sethfCheckStartSeqEnd("0");
        sethfCheckDateInProc("N");
        sethfDateInProc("");
        sethfCheckWeekCode("N");
        sethfCheckWeekCodeStart("");
        sethfCheckWeekCodeEnd("");
        sethfWeekCode("");
        sethfWeekCodeType("");
        sethfSerialStartCode("");

        axios.post("/api/Common/GetSerialProductByProduct", {
            prdName: strPrdName,
        })
            .then((res) => {
                dtPro = res.data[0];
                if (dtPro != null) {
                    sethfSerialLength(dtPro.SLM_SERIAL_LENGTH);
                    sethfSerialFixFlag(dtPro.SLM_FIX_FLAG);
                    sethfSerialDigit(dtPro.SLM_FIX_DIGIT);
                    sethfSerialStartDigit(dtPro.SLM_FIX_START_DIGIT);
                    sethfSerialEndDigit(dtPro.SLM_FIX_END_DIGIT);
                    sethfTrayFlag(dtPro.SLM_TRAY_FLAG);
                    sethfTrayLength(dtPro.SLM_TRAY_LENGTH);
                    sethfTestResultFlag(dtPro.SLM_TEST_RESULT_FLAG);
                    sethfSerialCount(txtTotalPcs);
                    sethfAutoScan(dtPro.SLM_AUTO_SCAN);
                    sethfConfigCheck(dtPro.PRM_BARCODE_REQ_CONFIG);
                    sethfConfigCode(dtPro.PRM_CONFIG_CODE);
                    sethfConfigStart(dtPro.PRM_START_CONFIG);
                    sethfConfigEnd(dtPro.PRM_END_CONFIG);
                    sethfConfigRuning(dtPro.PRM_RUNNING_REQ_CONFIG);
                    sethfDuplicateStart(dtPro.PRM_DUPLICATE_START);
                    sethfDuplicateEnd(dtPro.PRM_DUPLICATE_END);
                    sethfChipIDCheck(dtPro.PRM_CHECK_CHIP_ID_FLG);
                    sethfCheckPrdSht(dtPro.PRM_REQ_CHECK_PRD_SHT);
                    sethfCheckPrdShtStart(dtPro.PRM_CHECK_PRD_SHT_START);
                    sethfCheckPrdShtEnd(dtPro.PRM_CHECK_PRD_SHT_END);
                    sethfCheckPrdAbbr(dtPro.PRM_ABBR);
                    sethfPlasmaCheck(dtPro.PRM_PLASMA_TIME_FLG);
                    sethfPlasmaTime(dtPro.PRM_PLASMA_TIME);
                    sethfCheckStartSeq(dtPro.PRM_REQ_START_SEQ_FLG);
                    sethfCheckStartSeqCode(dtPro.PRM_START_SEQ_CODE);
                    sethfCheckStartSeqStart(dtPro.PRM_START_SEQ_START);
                    sethfCheckStartSeqEnd(dtPro.PRM_START_SEQ_END);
                    sethfCheckDateInProc(dtPro.PRM_DATE_INPROC_FLG);
                    sethfDateInProc(dtPro.PRM_DATE_INPROC);
                    sethfWeekCodeType(dtPro.PRM_DATE_TYPE);
                    sethfCheckWeekCode(dtPro.PRM_CHECK_WEEKCODE_FLG);
                    sethfCheckWeekCodeStart(dtPro.PRM_CHECK_WEEKCODE_START);
                    sethfCheckWeekCodeEnd(dtPro.PRM_CHECK_WEEKCODE_END);
                    sethfSerialStartCode(dtPro.PRM_SERIAL_START_CODE);
                    sethfSerialInfo(dtPro.PRM_ADDITIONAL_INFO);
                }
            })
    };

    useEffect(() => {
        if (!istxtMachineDisabled) {
            inputMachine.current.focus();
        }
        if (!istxtOpDisabled) {
            inputOperator.current.focus();
        }
        if (!istxtTotalPcsDisabled) {
            inputTotalPcs.current.focus();
        }
        if (!istxtLotDisabled) {
            inputLot.current.focus();
        }
    }, [
        istxtMachineDisabled,
        istxtOpDisabled,
        istxtTotalPcsDisabled,
        istxtLotDisabled
    ]);

    const SetMode = (strType) => {
        if (strType === "RECORD") {
            setpnlMachine(true);
            setpnlRackNo(false);
            setpnlOP(false);
            SetMode("MC");
        } else if (strType === "PLASMA") {
            setpnlMachine(false);
            setpnlRackNo(true);
            setpnlOP(false);
            SetMode("OP");
        } else if (strType === "MC") {
            settxtMachine("");
            setistxtMachineDisabled(false);
            setisibtMCBackDisabled(false);
            setlblOP("");
            settxtOperator("");
            setistxtOpDisabled(true);
            setisibtOperatorDisabled(true);
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
            setlblOP("");
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
            if (hfOP != "") {
                setpnlOP(true);
            } else {
                setpnlOP(false);
            }
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
            setlblOP("");
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
            setlblOP("");
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
            getInitialSerial();
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
            getInitialSerial();
        } else if (strType === "SERIAL_ERROR") {
            setistxtLotDisabled(true);
            setvisiblelog(true);
        } else if (strType === "SERIAL_OK") {
            setistxtLotDisabled(true);
            setvisiblelog(false);
            setpnlSerial(true);
            getInitialSerial();
        } else if (strType === "SERIAL_NG") {
            setistxtLotDisabled(true);
            setvisiblelog(false);
        }
    };

    const getInitialSerial = () => {
        let dtData = [];
        for (let intRow = 1; intRow <= hfSerialCount; intRow++) {
            dtData.push({ SEQ: intRow });
        }
        setgvSerialData(dtData);

        if (dtData.length > 0) {
            if (selectedrbt === "rbtRecordTime") {
                inputgvSerial.current.focus();
            } else {
                settxtRackNo("");
                setistxtRackDisabled(false);
                inputRackNo.current.focus();
            }
        }
    };

    const getInputSerial = async () => {
        let dtData = [];
        let intRow = 0;

        dtData.push({
            SEQ: null,
            SERIAL: "",
            REJECT: "",
            TOUCH_UP: "",
            REJECT2: "",
            REJECT_CODE: "",
            TEST_RESULT: "",
            TYPE_TEST_RESULT: "",
            SCAN_RESULT: "",
            REMARK: "",
            REMARK_UPDATE: "",
            ROW_COUNT: null,
            ROW_UPDATE: "",
            UPDATE_FLG: "",
            MACHINE: "",
            PRODUCT: "",
            LOT: "",
            DATA_TYPE: "",
        });

        for (let intSeq = 0; intSeq < gvSerialData.length; intSeq++) {
            let drRow = gvSerialData[intSeq];
            intRow = intRow + 1

            // เพิ่ม drRow ลงใน dtData
            drRow = {
                SEQ: intRow,
                SERIAL: gvSerialData[intSeq].txtgvSerial.toUpperCase().trim(),
                REJECT: "",
                TOUCH_UP: "",
                REJECT2: "",
                REJECT_CODE: "",
                TEST_RESULT: "",
                TYPE_TEST_RESULT: "",
                SCAN_RESULT: "",
                REMARK: "",
                REMARK_UPDATE: "",
                ROW_COUNT: 0,
                ROW_UPDATE: "N",
                UPDATE_FLG: "N",
            };

            if (selectedrbt === "rbtRecordTime") {
                drRow.MACHINE = txtMachine;
            } else {
                drRow.MACHINE = txtRackNo.toUpperCase().trim();
            }

            drRow.PRODUCT = selProduct;
            drRow.LOT = lblLot;

            if (selrbtPcsSht === "rbtPcs") {
                drRow.DATA_TYPE = "PCS";
            } else {
                drRow.DATA_TYPE = "SHT";
            }

            if (drRow.SERIAL.trim() !== "") {
                for (let intNo = 0; intNo < intRow - 1; intNo++) {
                    if (drRow.SERIAL.trim() === gvSerial.rows[intNo].txtgvSerial.toUpperCase().trim()) {
                        drRow.ROW_COUNT = 9;
                        break;
                    }
                }
            }
            dtData.push(drRow);
        }
        return dtData;
    };

    const [bolTrayError, setbolTrayError] = useState(false);
    const [bolError, setbolError] = useState(false);


    const [bolScanDouble, setbolScanDouble] = useState(false);
    const [bolScanDuplicate, setbolScanDuplicate] = useState(false);

    const setSerialDataTray = async () => {
        let _strFileError = "";
        let dtSerial = getInputSerial();
        let _strLot = lblLot.toUpperCase().trim();
        let _strPrdName = selProduct;
        let _strTray = " ";
        let _strScanResultAll = "OK";
        let _intRowSerial = 0;

        let dtLotPassCount = [];

        setlblLog("");

        if (_strLot !== "") {
            if (_strLot.length === 9 && _strPrdName !== "") {
                setlblLot(_strLot);
                setlblLotTotal("0");
            } else {
                setlblLog(_strLot + " invalid lot no.!" + _strTagNewLine + _strLot + " หมายเลขล็อตไม่ถูกต้อง");
                setlblLot("");
                setlblLotTotal("");
                setlblResult("NG");
                _strScanResultAll = "NG";
                setbolTrayError(true);
            }
        }

        if (!bolTrayError) {

            for (let i = 0; i < dtSerial.length; i++) {
                //ลองเทสไปก่อน
                axios.post("/api/Common/getSerialRecordTimeTrayTable", {
                    data: dtSerial[i],
                    strPlantCode: plantCode,
                })
                    .then((res) => {
                        console.log(res.data.row_count);
                    })
            }

            if (hfCheckWeekCode === "Y" && selrbtPcsSht === "rbtPcs") {
                axios.post("/api/Common/getWeekCodebyLot", {
                    STRLOT: _strLot,
                    STRPROC: hfDateInProc,
                })
                    .then((res) => {
                        console.log(res.data);
                        sethfWeekCode(res.data);
                    });
            }

            for (let i = 0; i < dtSerial.length; i++) {
                let drRow = dtSerial[i];
                if (drRow.SERIAL.trim() !== "") {
                    if (drRow.SERIAL !== CONNECT_SERIAL_ERROR && drRow.SERIAL !== CONNECT_SERIAL_NOT_FOUND) {
                        let _intCount = 0;
                        let _intCountOK = 0;
                        let _intCountNG = 0;
                        let _intCountDup = 0;
                        let _strRemark = "";
                        let _strError = "";
                        let _strSerial = drRow.SERIAL.toUpperCase.trim();
                        let _dtSerialAll = [];
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

                        setbolError(false);

                        let _strTestResult = "NO";

                        if (drRow.DATA_TYPE === "SHT") {
                            if (hfCheckPrdSht === "Y" && !bolError) {
                                const start = parseInt(hfCheckPrdShtStart);
                                const end = parseInt(hfCheckPrdShtEnd);
                                const substring = _strSerial.substring(start, (end - start) + 1);

                                if (hfCheckPrdAbbr !== substring) {
                                    _strMessageUpdate = "Sheet barcode mix product" + _strTagNewLine + "หมายเลขบาร์โค้ดปนกันกับผลิตภัณฑ์อื่น";
                                    _strRemark = "Sheet barcode mix product";
                                    _strScanResultUpdate = "NG";
                                    _strTestResultUpdate = _strTestResult;

                                    drRow.REMARK_UPDATE = _strRemark;
                                    drRow.ROW_UPDATE = "Y";

                                    setbolError(true);
                                } else {
                                    _strMessageUpdate = "";
                                    _strRemark = "";
                                    _strScanResultUpdate = "OK";
                                    _strTestResultUpdate = "";
                                    drRow.REMARK_UPDATE = _strRemark;
                                    drRow.ROW_UPDATE = "Y";
                                }
                            } else {
                                _strMessageUpdate = "Req. check sheet product" + _strTagNewLine + "ไม่ได้กำหนดการตรวจสอบชื่อผลิตภัณฑ์";
                                _strRemark = "Req. check sheet product";
                                _strScanResultUpdate = "NG";
                                _strTestResultUpdate = _strTestResult;

                                drRow.REMARK_UPDATE = _strRemark;
                                drRow.ROW_UPDATE = "Y";

                                setbolError(true);
                            }
                        } else {
                            // Check format serial no
                            if (_strSerial.length === parseInt(hfSerialLength)) {
                                let _strFixDigit = "";
                                if (hfSerialFixFlag === "Y") {
                                    const start = parseInt(hfSerialStartDigit);
                                    const end = parseInt(hfSerialEndDigit);
                                    _strFixDigit = _strSerial.substring(start, (end - start) + 1);

                                    if (_strFixDigit !== hfSerialDigit) {
                                        _strMessageUpdate = "Serial barcode mix product" + _strTagNewLine + "หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
                                        _strRemark = "Serial barcode mix product";
                                        _strScanResultUpdate = "NG";
                                        _strTestResultUpdate = _strTestResult;

                                        drRow.REMARK_UPDATE = _strRemark;
                                        drRow.ROW_UPDATE = "Y";

                                        _intCountNG = 1;
                                        setbolError(true);
                                    }

                                    if (hfConfigCheck === "Y" && _strScanResultUpdate !== "NG") {
                                        let _strConfigDigit = "";
                                        const start = parseInt(hfConfigStart);
                                        const end = parseInt(hfConfigEnd);
                                        _strConfigDigit = _strSerial.substring(start, (end - start) + 1);
                                        if (_strConfigDigit !== hfConfigCode) {
                                            _strMessageUpdate = "Serial barcode mix product" + _strTagNewLine + "หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
                                            _strRemark = "Serial barcode mix product";
                                            _strScanResultUpdate = "NG";
                                            _strTestResultUpdate = _strTestResult;
                                            drRow.REMARK_UPDATE = _strRemark;
                                            drRow.ROW_UPDATE = "Y";

                                            _intCountNG = 1;
                                            setbolError(true);
                                        }
                                    }

                                    if (hfSerialStartCode !== "" && _strScanResultUpdate !== "NG") {
                                        if (_strSerial.substring(1, hfSerialStartCode.length) !== hfSerialStartCode) {
                                            _strMessageUpdate = "Serial barcode mix product" + _strTagNewLine + "หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
                                            _strRemark = "Serial barcode mix product";
                                            _strScanResultUpdate = "NG";
                                            _strTestResultUpdate = _strTestResult;
                                            drRow.REMARK_UPDATE = _strRemark;
                                            drRow.ROW_UPDATE = "Y";

                                            _intCountNG = 1;
                                            setbolError(true);
                                        }
                                    }
                                }

                                if (hfCheckStartSeq === "Y" && _strScanResultUpdate !== "NG") {
                                    let _strStartSeq = "";
                                    const start = parseInt(hfCheckStartSeqStart);
                                    const end = parseInt(hfCheckStartSeqEnd);
                                    _strStartSeq = _strSerial.substring(start, (end - start) + 1);
                                    if (_strStartSeq !== hfCheckStartSeqCode) {
                                        _strMessageUpdate = "Serial barcode mix product" + _strTagNewLine + "หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
                                        _strRemark = "Serial barcode mix product";
                                        _strScanResultUpdate = "NG";
                                        _strTestResultUpdate = _strTestResult;
                                        drRow.REMARK_UPDATE = _strRemark;
                                        drRow.ROW_UPDATE = "Y";

                                        _intCountNG = 1;
                                        setbolError(true);
                                    }
                                }

                                if (hfCheckWeekCode === "Y" && _strScanResultUpdate !== "NG") {
                                    let _strWeekCode = "";
                                    const start = parseInt(hfCheckWeekCodeStart);
                                    const end = parseInt(hfCheckWeekCodeEnd);
                                    _strWeekCode = _strSerial.substring(start, (end - start) + 1);
                                    if (_strWeekCode !== hfWeekCode) {
                                        _strMessageUpdate = "Serial barcode mix week code" + _strTagNewLine + "หมายเลขบาร์โค้ดปนรหัสสัปดาห์กัน";
                                        _strRemark = "Serial barcode mix week code";
                                        _strScanResultUpdate = "NG";
                                        _strTestResultUpdate = _strTestResult;
                                        drRow.REMARK_UPDATE = _strRemark;
                                        drRow.ROW_UPDATE = "Y";

                                        _intCountNG = 1;
                                        setbolError(true);
                                    }
                                }

                                if (!bolError) {
                                    for (let intRow = _intRowSerial + 1; intRow < dtSerial.length; intRow++) {
                                        if (_strSerial.toUpperCase() === dtSerial[intRow].SERIAL.toUpperCase()) {
                                            _strMessageUpdate = "Serial duplicate in tray" + _strTagNewLine + "หมายเลขบาร์โค้ดซ้ำในถาดเดียวกัน";
                                            _strRemark = "Serial duplicate in tray  ";
                                            _strScanResultUpdate = "NG";
                                            _strTestResultUpdate = _strTestResult;
                                            drRow.REMARK_UPDATE = _strRemark;
                                            drRow.ROW_UPDATE = "N";

                                            _intCountNG = 1;
                                            setbolError(true);
                                        }
                                    }
                                }

                                if (!bolError) {
                                    _strMessageUpdate = "";
                                    _strRemark = "";
                                    _strScanResultUpdate = "OK";
                                    _strTestResultUpdate = "";
                                    drRow.REMARK_UPDATE = _strRemark;
                                    drRow.ROW_UPDATE = "Y";
                                }
                            } else {
                                _strMessageUpdate = "Serial not matching product" + _strTagNewLine + "หมายเลขบาร์โค้ดไม่ตรงตามที่กำหนดไว้";
                                _strRemark = "Serial barcode not matching product";
                                _strScanResultUpdate = "NG";
                                _strTestResultUpdate = _strTestResult;
                                drRow.REMARK_UPDATE = _strRemark;
                                drRow.ROW_UPDATE = "Y";

                                setbolError(true);
                            }
                        }

                        drRow.REJECT = _strReject1;
                        drRow.TOUCH_UP = _strTouchUp;
                        drRow.REJECT2 = _strReject2;
                        drRow.SCAN_RESULT = _strScanResultUpdate;
                        drRow.TEST_RESULT = _strTestResultUpdate;
                        drRow.REMARK = _strMessageUpdate;

                        if (_strScanResultUpdate === "NG") {
                            _strScanResultAll = "NG";
                        }
                    } else {
                        drRow.SCAN_RESULT = "NG";
                        drRow.ROW_UPDATE = "N";
                        _strScanResultAll = "NG";
                        setbolError(true);
                    }
                }
                _intRowSerial = _intRowSerial + 1;
            }

            setlblResult(_strScanResultAll);

            let _strErrorUpdate = "";
            setvisiblelog(false);
            setlblLog("");

            for (let i = 0; i < dtSerial.length; i++) {
                if (_strScanResultAll !== "NG") {
                    axios.post("/api/Common/setSerialRecordTimeTrayTable", {
                        dataList: [
                            {
                                strUserID: txtOperator,
                                strProgram: "frm_ScanSMTSerialRecordTime",
                                strPlantCode: plantCode,
                                strStation: hfUserStation,
                                data: [{
                                    SERIAL: dtSerial[i].SERIAL,
                                    MACHINE: dtSerial[i].MACHINE,
                                    PRODUCT: dtSerial[i].PRODUCT,
                                    LOT: dtSerial[i].LOT,
                                    DATA_TYPE: dtSerial[i].DATA_TYPE,
                                    ROW_UPDATE: dtSerial[i].ROW_UPDATE,
                                    UPDATE_FLG: dtSerial[i].UPDATE_FLG,
                                }],
                            },
                        ],
                    })
                        .then((res) => {
                            _strErrorUpdate = res.data.p_error;
                            if (_strErrorUpdate !== "") {
                                _strScanResultAll = "NG";
                                setlblResult(_strScanResultAll);
                                setlblResultcolor("red");
                                setlblLog(_strErrorUpdate);
                                setvisiblelog(true);
                            }
                        })
                        .catch((error) => {
                            alert(error);
                        });
                }
            }
        }

        if (_strScanResultAll === "NG") {
            setlblResultcolor("red");
        } else {
            setlblResultcolor("green");
        }

        getCountDataBylot(lblLot);

        if (!bolTrayError) {
            setgvScanData(dtSerial);
            setgvScanResult(true);
        } else {
            setgvScanData([]);
            setgvScanResult(false);
        }

        getInitialSerial();
    };

    const handleChangeSerial = (index, event) => {
        const newValue = [...txtgvSerial];
        newValue[index] = event.target.value;
        settxtgvSerial(newValue);
    };

    const btnSaveClick = () => {
        if (eventArgument !== "Save" && hfMode === "SERIAL") {
            setSerialDataTray();
        }
    };

    const btnCancelClick = () => {
        SetMode("SERIAL");
    };

    return {
        selectedrbt, txtMachine, settxtMachine, handleChangeMachine, txtOperator, settxtOperator, txtTotalPcs, settxtTotalPcs, txtLotNo, settxtLotNo,
        selProduct, setselProduct, txtRackNo, settxtRackNo, lblLot, lblLotTotal, lblLog, visiblelog, lblResult, pnlSerial, gvScanResult, istxtOpDisabled,
        istxtTotalPcsDisabled, istxtLotDisabled, isselProDisabled, istxtMachineDisabled, handleChangerbt, istxtRackDisabled, isibtMCBackDisabled,
        isibtOperatorDisabled, isibtPcsBackDisabled, inputMachine, inputOperator, inputTotalPcs, inputLot, pnlMachine, pnlRackNo, Productdata, ibtMCBackClick,
        handleChangeOperator, ibtOperatorClick, handleChangeTotalPcs, handleChangerbtPcsSht, ibtPcsBackClick, selrbtPcsSht, ddlProduct, handleChangeLot,
        ibtBackClick, handleChangeProduct, hfSerialCount, txtgvSerial, settxtgvSerial, inputgvSerial, handleChangeSerial, lblResultcolor, gvScanData,
        btnSaveClick, btnCancelClick, pnlOP, lblOP
    }
};

export { fn_ScanSMTSerialRecordTime };