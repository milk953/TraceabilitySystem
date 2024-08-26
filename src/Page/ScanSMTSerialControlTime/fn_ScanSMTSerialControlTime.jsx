import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function fn_ScanSMTSerialControlTime() {
    const [txtMachine, settxtMachine] = useState("");
    const [txtOperator, settxtOperator] = useState("");
    const [txtTotalPcs, settxtTotalPcs] = useState("");
    const [txtLotNo, settxtLotNo] = useState("");
    const [selProduct, setselProduct] = useState(null);
    const [Productdata, setProductdata] = useState([]);
    const [lblLot, setlblLot] = useState("");
    const [lblLog, setlblLog] = useState("");
    const [visiblelog, setvisiblelog] = useState(false);
    const [lblResult, setlblResult] = useState("");
    const [lblResultcolor, setlblResultcolor] = useState("green");

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
    const [hfProcControlTimeCheck, sethfProcControlTimeCheck] = useState("");
    const [hfProcControlTime, sethfProcControlTime] = useState("");
    const [hfConnShtPcsTime, sethfConnShtPcsTime] = useState("");
    const [hfProcControl, sethfProcControl] = useState("");
    const [hfSerialStartCode, sethfSerialStartCode] = useState("");
    const [hfBarcodeNotFound, sethfBarcodeNotFound] = useState("");

    //Table
    const [pnlSerial, setpnlSerial] = useState(false);
    const [gvSerialData, setgvSerialData] = useState([]);
    const [gvScanResult, setgvScanResult] = useState(false);
    const [gvScanData, setgvScanData] = useState([]);
    const [txtgvSerial, settxtgvSerial] = useState("");

    //Disabled
    const [txtMachineDisabled, settxtMachineDisabled] = useState(false);
    const [txtOpDisabled, settxtOpDisabled] = useState(false);
    const [txtTotalPcsDisabled, settxtTotalPcsDisabled] = useState(false);
    const [txtLotDisabled, settxtLotDisabled] = useState(false);
    const [selProDisabled, setselProDisabled] = useState(false);
    const [ibtMCBackDisabled, setibtMCBackDisabled] = useState(false);
    const [ibtOperatorDisabled, setibtOperatorDisabled] = useState(false);
    const [ibtPcsBackDisabled, setibtPcsBackDisabled] = useState(false);

    //inputRef
    const inputMachine = useRef(null);
    const inputOperator = useRef(null);
    const inputTotalPcs = useRef(null);
    const inputLot = useRef(null);
    const inputTray = useRef(null);
    const ddlProduct = useRef(null);
    const inputgvSerial = useRef([]);

    const plantCode = import.meta.env.VITE_FAC;
    const CONNECT_SERIAL_ERROR = "999999";
    const CONNECT_SERIAL_NOT_FOUND = "NOT FOUND CODE";
    const _strTagNewLine = "\n";

    useEffect(() => {
        localStorage.setItem("hfUserID", localStorage.getItem("ipAddress"));
        localStorage.setItem("hfUserStation", localStorage.getItem("ipAddress"));
        sethfPlantCode(import.meta.env.VITE_FAC);
        sethfProductKind(import.meta.env.VITE_PRODUCT_KIND);
        sethfMode("");
        getProductData();

        SetMode("MC");
    }, []);

    const getProductData = async () => {
        axios.get("/api/Common/GetProductData").then((res) => {
            let data = res.data.flat();
            setProductdata(data);
            setselProduct(data[0].prd_name);
        });
    };

    const handleChangeMachine = () => {
        if (txtMachine !== "") {
            const Machine = txtMachine.toUpperCase().trim();
            settxtMachine(Machine);
            SetMode("OP");
        }
    };

    const ibtBackMCClick = () => {
        SetMode("MC");
    };

    const handleChangeOperator = () => {
        if (txtOperator !== "") {
            const Operator = txtOperator.toUpperCase().trim();
            settxtOperator(Operator);
            SetMode("PCS");
        }
    };

    const ibtBackOPClick = () => {
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

    const ibtPcsBackClick = () => {
        sethfSerialCount("0");
        SetMode("PCS");
    };

    const handleChangeLot = async () => {
        let strLot = "";
        let strPrdName = "";
        const strLotData = txtLotNo.toUpperCase().split(";");
        strLot = strLotData[0];

        await axios.post("/api/Common/getProductNameByLot", {
            strLot: strLot,
        })
            .then((res) => {
                strPrdName = res.data.prdName[0];
            });
        console.log("PrdName2:", strPrdName);
        if (strPrdName !== "") {
            setlblLog("");
            setvisiblelog(false);
            settxtLotNo(strLot);
            setlblLot(strLot);
            const datagetPd = await getProductSerialMaster(strPrdName);
            try {
                setselProduct(strPrdName);
                console.log("datagetpd", datagetPd.prm_proc_control_time_flg);

                if (datagetPd.prm_proc_control_time_flg === "Y") {
                    SetMode("SERIAL");
                } else {
                    setlblLog(`Product ${strPrdName} not control time!`);
                    setvisiblelog(true);
                    setselProduct(Productdata[0].prd_name);
                    SetMode("LOT");
                }
            } catch (error) {
                console.error("try-catch error:", error);
                const intProduct = strPrdName.indexOf('-', 12);
                if (intProduct > -1) {
                    strPrdName = strPrdName.substring(0, intProduct) + strPrdName.substring(intProduct + 1, intProduct + 11).trim();
                    try {
                        setselProduct(strPrdName);

                        if (datagetPd.prm_proc_control_time_flg === "Y") {
                            SetMode("SERIAL");
                        } else {
                            setlblLog(`Product ${strPrdName} not control time!`);
                            setvisiblelog(true);
                            setselProduct(Productdata[0].prd_name);
                            SetMode("LOT");
                        }
                    } catch (error) {
                        console.error("Second inner try-catch error:", error);
                        setlblLog(`Product ${strPrdName} not found.`);
                        setvisiblelog(true);
                        ddlProduct.current.focus();
                    }
                } else {
                    setlblLog(`Product ${strPrdName} not found.`);
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
    };




    const ibtBackClick = () => {
        settxtLotNo("");
        settxtLotDisabled(false);
        setpnlSerial(false);
        setselProduct(Productdata[0].prd_name);
        SetMode("LOT");
        inputLot.current.focus();
    };

    const handleChangeProduct = async (value) => {
        setselProduct(value);
        getProductSerialMaster(value);
        if (txtLotNo !== "" && hfProcControlTimeCheck === "Y") {
            setlblLog("");
            setvisiblelog(false);
            SetMode("SERIAL");
        } else if (hfProcControlTimeCheck === "N") {
            setlblLog("Product " + selProduct + " not control time!");
            setvisiblelog(true);
            setselProduct(Productdata[0].prd_name);
            SetMode("LOT");
        } else {
            setselProduct(Productdata[0].prd_name);
            SetMode("LOT");
        }
    };

    const [bolTrayError, setbolTrayError] = useState(false);
    const [bolError, setbolError] = useState(false);

    const setSerialDataTray = async () => {
        let _strFileError = "";
        const dtSerial = await getInputSerial();
        let _strLot = lblLot.toUpperCase().trim();
        let _strPrdName = selProduct;
        let _strTray = " ";
        let _bolTrayError = false;
        let _bolError = false;
        let _strScanResultAll = "OK";
        let _intRowSerial = 0;

        let dtLotPassCount = [];

        setlblLog("");

        if (_strLot !== "") {
            if (_strLot.length === 9 && _strPrdName !== "") {
                setlblLot(_strLot);
            } else {
                setlblLog(_strLot + " invalid lot no.!" + _strTagNewLine + _strLot + " หมายเลขล็อตไม่ถูกต้อง");
                setlblLot("");
                setlblResult("NG");
                _strScanResultAll = "NG";
                setbolTrayError(true);
            }
        }

        if (!bolTrayError) {
            if (hfProcControlTimeCheck === "Y") {
                for (let i = 0; i < dtSerial.length; i++) {
                    try {
                        const res = await axios.post("/api/getserialproccontroltimetable", {
                            strPlantCode: plantCode,
                            strProc: hfProcControl,
                            strConnShtPcsFlg: hfConnShtPcsTime,
                            dblTime: hfProcControlTime,
                            data: [
                                {
                                    serial: dtSerial[i].SERIAL,
                                    product: dtSerial[i].PRODUCT,
                                    lot: dtSerial[i].LOT
                                }
                            ]
                        });
                        console.log("SSSS", res.data.strresult);
                    } catch (error) {
                        alert(error);
                        console.log(error);
                    }
                }
            }

            for (let i = 0; i < dtSerial.length; i++) {

                if (dtSerial[i].SERIAL !== "") {
                    if (
                        !CONNECT_SERIAL_ERROR.includes(dtSerial[i].SERIAL) &&
                        !CONNECT_SERIAL_NOT_FOUND.includes(dtSerial[i].SERIAL) &&
                        !hfBarcodeNotFound.includes(dtSerial[i].SERIAL)
                    ) {
                        let _intCount = 0;
                        let _intCountOK = 0;
                        let _intCountNG = 0;
                        let _intCountDup = 0;
                        let _strRemark = "";
                        let _strError = "";
                        let _strSerial = dtSerial[i].SERIAL;
                        let _dtSerialAll = [];
                        let _strPrdNameOrg = "";
                        let _strLotOrg = "";
                        let _strTrayOrg = "";
                        let _strTestResultOrg = "";
                        let _strOK = "OK";
                        let _strNG = "NG";
                        let _strScanResultUpdate = dtSerial[i].SCAN_RESULT;
                        let _strMessageUpdate = dtSerial[i].REMARK;
                        let _strTestResultUpdate = "";
                        let _strTypeTestResult = "";
                        let _strRejectUpdate = "";
                        let _strReject1 = "";
                        let _strReject2 = "";
                        let _strTouchUp = "";

                        setbolError(false);

                        if (_strScanResultUpdate !== "NG") {
                            // Check format serial no
                            if (_strSerial.length === hfSerialLength) {
                                let _strFixDigit = "";

                                if (hfSerialFixFlag === "Y") {

                                    const start = parseInt(hfSerialStartDigit);
                                    const end = parseInt(hfSerialEndDigit);
                                    _strFixDigit = _strSerial.substring(start - 1, end);

                                    console.log("lll", _strFixDigit, hfSerialDigit);

                                    if (_strFixDigit !== hfSerialDigit) {
                                        _strMessageUpdate = "Serial barcode mix product" + _strTagNewLine + "หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
                                        _strRemark = "Serial barcode mix product";
                                        _strScanResultUpdate = "NG";

                                        _intCountNG = 1;
                                        setbolError(true);
                                    }
                                    if (hfConfigCheck === "Y" && _strScanResultUpdate !== "NG") {
                                        let _strConfigDigit = "";
                                        const start = parseInt(hfConfigStart);
                                        const end = parseInt(hfConfigEnd);
                                        _strConfigDigit = _strSerial.substring(start - 1, end);
                                        if (_strConfigDigit !== hfConfigCode) {
                                            _strMessageUpdate = "Serial barcode mix product" + _strTagNewLine + "หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
                                            _strRemark = "Serial barcode mix product";
                                            _strScanResultUpdate = "NG";

                                            _intCountNG = 1;
                                            setbolError(true);
                                        }
                                    }
                                }

                                if (hfSerialStartCode.trim() !== "" && _strScanResultUpdate !== "NG") {
                                    if (_strSerial.substring(1, hfSerialStartCode.length) !== hfSerialStartCode) {
                                        _strMessageUpdate = "Serial barcode mix product" + _strTagNewLine + "หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
                                        _strRemark = "Serial barcode mix product";
                                        _strScanResultUpdate = "NG";

                                        _intCountNG = 1;
                                        setbolError(true);
                                    }
                                }

                                if (hfCheckStartSeq === "Y" && _strScanResultUpdate !== "NG") {
                                    let _strStartSeq = "";
                                    const start = parseInt(hfCheckStartSeqStart);
                                    const end = parseInt(hfCheckStartSeqEnd);
                                    _strStartSeq = _strSerial.substring(start - 1, end);
                                    if (_strStartSeq !== hfCheckStartSeqCode) {
                                        _strMessageUpdate = "Serial barcode mix product" + _strTagNewLine + "หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
                                        _strRemark = "Serial barcode mix product";
                                        _strScanResultUpdate = "NG";

                                        _intCountNG = 1;
                                        setbolError(true);
                                    }
                                }

                                if (hfCheckWeekCode === "Y" && _strScanResultUpdate !== "NG") {
                                    let _strWeekCode = "";
                                    const start = parseInt(hfCheckWeekCodeStart);
                                    const end = parseInt(hfCheckWeekCodeEnd);
                                    _strWeekCode = _strSerial.substring(start - 1, end);
                                    if (_strWeekCode !== hfWeekCode) {
                                        _strMessageUpdate = "Serial barcode mix week code" + _strTagNewLine + "หมายเลขบาร์โค้ดปนรหัสสัปดาห์กัน";
                                        _strRemark = "Serial barcode mix week code";
                                        _strScanResultUpdate = "NG";

                                        _intCountNG = 1;
                                        setbolError(true);
                                    }
                                }

                                if (!bolError) {
                                    for (let intRow = _intRowSerial + 1; intRow < dtSerial.length; intRow++) {
                                        if (_strSerial === dtSerial[intRow].SERIAL) {
                                            _strMessageUpdate = "Serial duplicate in tray" + _strTagNewLine + "หมายเลขบาร์โค้ดซ้ำในถาดเดียวกัน";
                                            _strRemark = "Serial duplicate in tray  ";
                                            _strScanResultUpdate = "NG";

                                            _intCountNG = 1;
                                            setbolError(true);
                                        }
                                    }
                                }

                                if (!bolError) {
                                    _strMessageUpdate = "";
                                    _strRemark = "";
                                    _strScanResultUpdate = "OK";
                                }
                            } else {
                                _strMessageUpdate = "Serial not matching product" + _strTagNewLine + "หมายเลขบาร์โค้ดไม่ตรงตามที่กำหนดไว้";
                                _strRemark = "Serial barcode not matching product";
                                _strScanResultUpdate = "NG";

                                setbolError(true);
                            }
                        }

                        dtSerial[i].SCAN_RESULT = _strScanResultUpdate;
                        dtSerial[i].REMARK = _strMessageUpdate;

                        if (_strScanResultUpdate === "NG") {
                            _strScanResultAll = "NG";
                        }
                    } else {
                        dtSerial[i].SCAN_RESULT = "NG";
                        dtSerial[i].REMARK = "Can not scan" + _strTagNewLine + "หมายเลขบาร์โค้ดสแกนไม่ได้";
                        _strScanResultAll = "NG";
                        setbolError(true);
                    }
                }
                _intRowSerial = _intRowSerial + 1;
            }

            setlblResult(_strScanResultAll);

            setvisiblelog(false);
            setlblLog("");

            if (_strScanResultAll === "OK") {
                let _strErrorUpdate = "";
                for (let i = 0; i < dtSerial.length; i++) {
                    axios.post("/api/setSerialProcControlTimeTable", {
                        strPlantCode: plantCode,
                        strProc: hfProcControl,
                        data: [
                            {
                                MACHINE: dtSerial[i].MACHINE,
                                OP: dtSerial[i].OP,
                                SEQ: dtSerial[i].SEQ,
                                SERIAL: dtSerial[i].SERIAL
                            }
                        ]
                    })
                        .then((res) => {
                            _strErrorUpdate = res.data.p_error;
                            if (_strErrorUpdate !== "") {
                                _strScanResultAll = "NG";
                                setlblResult(_strScanResultAll);
                                setlblResultcolor("#ff4d4f");
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
            setlblResultcolor("#ff4d4f");
        } else {
            setlblResultcolor("green");
        }

        if (!bolTrayError) {
            setgvScanData(dtSerial);
            setgvScanResult(true);
        } else {
            setgvScanData([]);
            setgvScanResult(false);
        }

        await getInitialSerial();
    };

    const getProductSerialMaster = async (strPrdName) => {
        let dtProductSerial = "";
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
        sethfProcControlTimeCheck("N");
        sethfProcControlTime("0");
        sethfConnShtPcsTime("N");
        sethfSerialStartCode("");

        await axios
            .post("/api/common/GetSerialProductByProduct", {
                prdName: strPrdName,
            })
            .then((res) => {
                dtProductSerial = res.data[0];
                if (dtProductSerial != "") {
                    sethfSerialLength(dtProductSerial.slm_serial_length);
                    sethfSerialFixFlag(dtProductSerial.slm_fix_flag);
                    sethfSerialDigit(dtProductSerial.slm_fix_digit);
                    sethfSerialStartDigit(dtProductSerial.slm_fix_start_digit);
                    sethfSerialEndDigit(dtProductSerial.slm_fix_end_digit);
                    sethfTrayFlag(dtProductSerial.slm_tray_flag);
                    sethfTrayLength(dtProductSerial.slm_tray_length);
                    sethfTestResultFlag(dtProductSerial.slm_test_result_flag);
                    sethfSerialCount(txtTotalPcs);
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
                    sethfCheckDateInProc(dtProductSerial.prm_date_inproc_flg);
                    sethfDateInProc(dtProductSerial.prm_date_inproc);
                    sethfWeekCodeType(dtProductSerial.prm_date_type);
                    sethfCheckWeekCode(dtProductSerial.prm_check_weekcode_flg);
                    sethfCheckWeekCodeStart(dtProductSerial.prm_check_weekcode_start);
                    sethfCheckWeekCodeEnd(dtProductSerial.prm_check_weekcode_end);
                    sethfProcControlTimeCheck(dtProductSerial.prm_proc_control_time_flg);
                    sethfProcControlTime(dtProductSerial.prm_proc_control_time);
                    sethfConnShtPcsTime(dtProductSerial.prm_conn_sht_control_time_flg);
                    sethfSerialStartCode(dtProductSerial.prm_serial_start_code);
                    console.log("hfProcControlTimeCheck:", dtProductSerial.prm_proc_control_time_flg);

                }
            });
        return dtProductSerial;
    };

    const getInputSerial = () => {
        let dtData = [];
        let intRow = 0;

        for (let intSeq = 0; intSeq < gvSerialData.length; intSeq++) {
            let drRow = {
                SEQ: intRow + 1,
                SERIAL: txtgvSerial[intSeq] || "",
                SCAN_RESULT: "",
                REMARK: "",
                PRODUCT: selProduct,
                LOT: lblLot,
                MACHINE: txtMachine,
                OP: txtOperator
            };
            dtData.push(drRow);
            intRow++;
        }

        return dtData;
    };

    const getInitialSerial = async () => {
        let dtData = [];

        for (let intRow = 1; intRow <= hfSerialCount; intRow++) {
            let drRow = {
                SEQ: intRow
            };
            dtData.push(drRow);
        }
        setgvSerialData(dtData);
        console.log("gvserialdata:", dtData)
        return dtData;
    };

    useEffect(() => {
        if (!txtMachineDisabled) {
            inputMachine.current.focus();
        }
        if (!txtOpDisabled) {
            inputOperator.current.focus();
        }
        if (!txtTotalPcsDisabled) {
            inputTotalPcs.current.focus();
        }
        if (!txtLotDisabled) {
            inputLot.current.focus();
        }
        if (gvSerialData.length > 0 && inputgvSerial.current[0]) {
            inputgvSerial.current[0].focus();
        }
    }, [
        txtMachineDisabled,
        txtOpDisabled,
        txtTotalPcsDisabled,
        txtLotDisabled,
        gvSerialData
    ]);

    const handleKeygvSerial = (e, index) => {
        if (e.key === 'Enter') {
            e.preventDefault(); 
            const nextIndex = index + 1;
            if (nextIndex < hfSerialCount && inputgvSerial.current[nextIndex]) {
                inputgvSerial.current[nextIndex].focus();
                console.log('Calling btnSaveClick',nextIndex);
            } else if (nextIndex === nextIndex) {
                
                btnSaveClick();
            }
        }
    };

    const SetMode = (strType) => {

        if (strType === "MC") {
            settxtMachine("");
            settxtMachineDisabled(false);
            setibtMCBackDisabled(false);
            settxtOperator("");
            settxtOpDisabled(true);
            setibtOperatorDisabled(true);
            settxtTotalPcs("");
            settxtTotalPcsDisabled(true);
            settxtLotNo("");
            settxtLotDisabled(true);
            setselProDisabled(true);
            setibtPcsBackDisabled(true);
            setpnlSerial(false);
            setgvSerialData([]);
            sethfMode("MC");
            inputMachine.current.focus();
        } else if (strType === "OP") {
            settxtMachineDisabled(true);
            setibtMCBackDisabled(false);
            settxtOperator("");
            settxtOpDisabled(false);
            setibtOperatorDisabled(false);
            settxtTotalPcs("");
            settxtTotalPcsDisabled(true);
            settxtLotNo("");
            settxtLotDisabled(true);
            setselProDisabled(true);
            setibtPcsBackDisabled(true);
            setpnlSerial(false);
            setpnlSerial(false);
            setgvSerialData([]);
            sethfMode("OP");
            inputOperator.current.focus();
        } else if (strType === "PCS") {
            settxtMachineDisabled(true);
            setibtMCBackDisabled(false);
            settxtOpDisabled(true);
            setibtOperatorDisabled(false);
            settxtTotalPcs("");
            settxtTotalPcsDisabled(false);
            settxtLotNo("");
            settxtLotDisabled(true);
            setselProDisabled(true);
            setibtPcsBackDisabled(false);
            setpnlSerial(false);
            setvisiblelog(false);
            setgvSerialData([]);
            sethfMode("PCS");
            inputTotalPcs.current.focus();
        } else if (strType === "LOT") {
            settxtLotNo("");
            settxtLotDisabled(false);
            settxtTotalPcsDisabled(true);
            setselProDisabled(false);
            setlblLot("");
            setpnlSerial(false);
            setgvSerialData([]);
            inputLot.current.focus();
        } else if (strType === "LOT_ERROR") {
            settxtLotNo("");
            settxtLotDisabled(false);
            setlblLot("");
            setvisiblelog(true);
            setpnlSerial(false);
            sethfMode("LOT");
            inputLot.current.focus();
        } else if (strType === "TRAY") {
            settxtLotDisabled(true);
            setvisiblelog(false);
            setpnlSerial(true);
            getInitialSerial();
            sethfMode("TRAY");
            inputTray.current.focus();
        } else if (strType === "TRAY_ERROR") {
            settxtLotDisabled(true);
            setvisiblelog(true);
            setpnlSerial(false);
            sethfMode("TRAY");
            inputTray.current.focus();
        } else if (strType === "SERIAL") {
            setselProDisabled(true);
            settxtLotDisabled(true);
            setvisiblelog(false);
            setpnlSerial(true);
            sethfMode("SERIAL");
            getInitialSerial();
        } else if (strType === "SERIAL_ERROR") {
            settxtLotDisabled(true);
            setvisiblelog(true);
        } else if (strType === "SERIAL_OK") {
            settxtLotDisabled(true);
            setvisiblelog(false);
            setpnlSerial(true);
            getInitialSerial();
            inputgvSerial.current[0].focus();
        } else if (strType === "SERIAL_NG") {
            settxtLotDisabled(true);
            setvisiblelog(false);
        }
    };

    const handleChangeSerial = (index, event) => {
        const newValue = [...txtgvSerial];
        newValue[index] = event.target.value;
        settxtgvSerial(newValue);
    };

    const btnSaveClick = () => {
        console.log(hfMode)
        if (hfMode === "SERIAL") {
            setSerialDataTray();
        }
    };

    const btnCancelClick = () => {
        SetMode("SERIAL");
    };

    return {
        txtMachine, settxtMachine, handleChangeMachine, txtOperator, settxtOperator, txtTotalPcs, settxtTotalPcs, txtLotNo, settxtLotNo, selProduct,
        lblLot, lblLog, visiblelog, lblResult, lblResultcolor, txtMachineDisabled, txtOpDisabled, txtTotalPcsDisabled, txtLotDisabled, selProDisabled,
        ibtMCBackDisabled, ibtOperatorDisabled, ibtPcsBackDisabled, inputMachine, inputOperator, inputTotalPcs, inputLot, ddlProduct, pnlSerial, gvSerialData,
        gvScanResult, gvScanData, txtgvSerial, inputgvSerial, Productdata, ibtBackMCClick, handleChangeOperator, ibtBackOPClick, handleChangeTotalPcs, ibtPcsBackClick,
        handleChangeLot, ibtBackClick, handleChangeProduct, handleChangeSerial, btnSaveClick, btnCancelClick, handleKeygvSerial
    }
};

export { fn_ScanSMTSerialControlTime };