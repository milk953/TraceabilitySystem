import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function fn_ScanSMTSerialBackendConfirm() {
    const [txtLotNo, settxtLotNo] = useState("");
    const [selProduct, setselProduct] = useState(null);
    const [Productdata, setProductdata] = useState([]);
    const [txtTotalPCS, settxtTotalPCS] = useState("");
    const [lblLog, setlblLog] = useState("");
    const [visiblelog, setvisiblelog] = useState(false);
    const [lblResult, setlblResult] = useState("");
    const [lblResultcolor, setlblResultcolor] = useState("green");

    //hiddenfield
    const hfUserID = localStorage.getItem("ipAddress");
    const hfUserStation = localStorage.getItem("ipAddress");
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
    const [hfBarcodeSide, sethfBarcodeSide] = useState("");
    const [hfShtScan, sethfShtScan] = useState("");
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
    const [hfCheckLotSht, sethfCheckLotSht] = useState("");
    const [hfCheckLotShtStart, sethfCheckLotShtStart] = useState("");
    const [hfCheckLotShtEnd, sethfCheckLotShtEnd] = useState("");
    const [hfCheckSheetELT, sethfCheckSheetELT] = useState("");
    const [hfCheckPreAOIF, sethfCheckPreAOIF] = useState("");
    const [hfCheckPreAOIB, sethfCheckPreAOIB] = useState("");
    const [hfCheckAOIF, sethfCheckAOIF] = useState("");
    const [hfCheckAOIB, sethfCheckAOIB] = useState("");
    const [hfCheckSPIF, sethfCheckSPIF] = useState("");
    const [hfCheckSPIB, sethfCheckSPIB] = useState("");
    const [hfCheckAOICoatF, sethfCheckAOICoatF] = useState("");
    const [hfCheckAOICoatB, sethfCheckAOICoatB] = useState("");
    const [hfSerialInfo, sethfSerialInfo] = useState("");

    //Table
    const [pnlSerial, setpnlSerial] = useState(false);
    const [gvSerialData, setgvSerialData] = useState([]);
    const [gvScanResult, setgvScanResult] = useState(false);
    const [gvScanData, setgvScanData] = useState([]);
    const [txtgvSerial, settxtgvSerial] = useState("");

    //Disabled
    const [txtLotDisabled, settxtLotDisabled] = useState(false);
    const [selProDisabled, setselProDisabled] = useState(false);
    const [txtTotalDisabled, settxtTotalDisabled] = useState(false);

    //inputRef
    const inputLot = useRef(null);
    const ddlProduct = useRef(null);
    const inputTotal = useRef(null);
    const inputgvSerial = useRef([]);

    const plantCode = import.meta.env.VITE_FAC;
    const CONNECT_SERIAL_ERROR = "999999";
    const _strTagNewLine = "\n";

    useEffect(() => {
        PageLoad();
    }, []);

    useEffect(() => {
        if (txtTotalPCS != "" && !visiblelog && gvSerialData !== "") {
            getInitialSerial();
        }
    }, [txtTotalPCS, visiblelog]);

    const PageLoad = async () => {
        sethfMode("");
        getProductData();
        SetMode("LOT");
    };

    const getProductData = async () => {
        axios.get("/api/Common/GetProductData").then((res) => {
            let data = res.data.flat();
            setProductdata(data);
            setselProduct(data[0].prd_name);
        });
    };

    const handleChangeLot = async () => {
        let strLot = "";
        let strPrdName = "";
        const strLotData = txtLotNo.trim().toUpperCase().split(";");

        if (strLotData.length >= 2) {
            strLot = strLotData[0];
            await axios.post("/api/Common/getProductNameByLot", {
                strLot: strLot,
            })
                .then((res) => {
                    strPrdName = res.data.prdName[0];
                });
            console.log("PrdName:", strPrdName);
            if (strPrdName !== "") {
                setlblLog("");
                setvisiblelog(false);
                settxtLotNo(strLot);

                try {
                    setselProduct(strPrdName);
                    const datagetPd = await getProductSerialMaster(strPrdName);

                    if (txtTotalPCS === "") {
                        settxtTotalPCS(datagetPd.slm_serial_sht);
                    }
                    SetMode("SERIAL");
                    inputgvSerial.current[0]?.focus();
                } catch (error) {
                    const intProduct = strPrdName.indexOf('-', 12);
                    if (intProduct > -1) {
                        strPrdName = strPrdName.substring(0, intProduct) + strPrdName.substring(intProduct + 1, intProduct + 11).trim();
                        try {
                            setselProduct(strPrdName);
                            const datagetPd = await getProductSerialMaster(strPrdName);
                            if (txtTotalPCS === "") {
                                settxtTotalPCS(datagetPd.slm_serial_sht);
                            }

                            SetMode("SERIAL");
                            inputgvSerial.current[0].focus();
                        } catch (error) {
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
                setgvSerialData([]);
                setlblLog("Invalid lot no.");
                setvisiblelog(true);
                sethfMode("LOT");
                inputLot.current.focus();
            }
        } else {
            setselProduct(Productdata[0].prd_name);
            settxtLotNo("");
            setgvSerialData([]);
            setlblLog(`Please scan QR Code. ${_strTagNewLine} กรุณาสแกนที่คิวอาร์โค้ด`);
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
        if (txtLotNo !== "") {
            setlblLog("");
            setvisiblelog(false);
            SetMode("SERIAL");
        } else {
            setselProduct(Productdata[0].prd_name);
            SetMode("LOT");
        }
    };

    const handleChangeTotalPCS = () => {
        if (!isNaN(txtTotalPCS)) {
            SetMode("SERIAL");
            inputgvSerial.current[0].focus();
        } else {
            settxtTotalPCS("");
            inputTotal.current.focus();
        }
    };

    const handleChangeSerial = (index, e) => {
        const newValues = [...txtgvSerial];
        newValues[index] = e.target.value;
        settxtgvSerial(newValues);
    };

    const btnSaveClick = async () => {
        if (hfMode === "SERIAL") {
            setSerialData();
        }
    };

    const btnCancelClick = async () => {
        SetMode("SERIAL");
        inputgvSerial.current[0].focus();
    };

    const SetMode = async (strType) => {
        if (strType === "LOT") {
            setselProDisabled(false);
            settxtLotNo("");
            settxtLotDisabled(false);
            settxtTotalPCS("");
            settxtTotalDisabled(false);
            setvisiblelog(false);
            setpnlSerial(false);
            sethfMode("LOT");
            inputLot.current.focus();
        } else if (strType === "LOT_ERROR") {
            settxtLotNo("");
            settxtLotDisabled(false);
            settxtTotalPCS("");
            settxtTotalDisabled(false);
            setvisiblelog(true);
            setpnlSerial(false);
            sethfMode("LOT");
            inputLot.current.focus();
        } else if (strType === "PCS") {
            settxtLotDisabled(true);
            settxtTotalDisabled(false);
            setvisiblelog(false);
            setpnlSerial(true);
            sethfMode("PCS");
            inputTotal.current.focus();
        } else if (strType === "SERIAL") {
            settxtLotDisabled(true);
            settxtTotalDisabled(false);
            setvisiblelog(false);
            setpnlSerial(true);
            sethfMode("SERIAL");
            await getInitialSerial();
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
        for (let intRow = 1; intRow <= txtTotalPCS; intRow++) {
            dtData.push({ SEQ: intRow });
        }
        setgvSerialData(dtData);
        console.log("gvserialdata:", dtData)
        return dtData;
    };

    const setSerialData = async () => {
        const dtSerial = await getInputSerial();
        let _strLot = "";
        let _strPrdName = selProduct;
        let _strShtNoBack = "";
        let _strShtNoFront = "";
        let _strTray = " ";
        let _intSeq = 1;
        let _strScanResultAll = "OK";
        let _strErrorAll = "";
        let _strUpdateError = "";
        let _strReturn = "";

        let _bolError = false;
        const strLotData = txtLotNo.trim().toUpperCase().split(";");
        _strLot = strLotData[0];

        if (txtLotNo !== "" && dtSerial.length > 0) {
            for (let i = 0; i < dtSerial.length; i++) {
                await axios.post("/api/getSerialSheetManyTable", {
                    SERIAL: dtSerial[i].SERIAL,
                    PLANT_CODE: plantCode
                })
                    .then((res) => {
                        _strReturn = res.data[0];
                    });
                dtSerial[i].FRONT_SHEET_NO = _strReturn.FRONT_SHEET_NO;
                dtSerial[i].BACK_SHEET_NO = _strReturn.BACK_SHEET_NO;
                dtSerial[i].SHEET_PCS_NO = _strReturn.SHEET_PCS_NO;
                dtSerial[i].ROLL_LEAF_NO = _strReturn.ROLL_LEAF_NO;
            }

            console.log("มาไหม", _strReturn)

            let _intRowSerial = 0;
            for (let i = 0; i < dtSerial.length; i++) {

                if (dtSerial[i].SERIAL !== "") {
                    let _strSerial = dtSerial[i].SERIAL;
                    let _strTestResult = "NONE";
                    let _strMessageUpdate = "";
                    let _strScanResultUpdate = "";
                    let _inCountSeq = 0;
                    let _strSerialResult = "";
                    let _Result = "";
                    let _FrontSheetBarcode = "";
                    let _RearSheetBarcode = "";
                    let _strMessage = "";
                    let _intShtSeq = 0;

                    _FrontSheetBarcode = dtSerial[i].FRONT_SHEET_NO;
                    _RearSheetBarcode = dtSerial[i].BACK_SHEET_NO;
                    _intShtSeq = dtSerial[i].SHEET_PCS_NO;

                    if (!CONNECT_SERIAL_ERROR.includes(_strSerial) && _strSerial !== "") {
                        await axios.post("/api/get_backendresult", {
                            strPlantCode: plantCode,
                            strProduct: _strPrdName,
                            pcsPosition: _intShtSeq,
                            frontSheetNumber: _FrontSheetBarcode,
                            rearSheetNumber: _RearSheetBarcode,
                            Message: _strMessage
                        })
                            .then((res) => {
                                _strSerialResult = res.data.backen_result;
                            });
                        console.log(_strSerialResult);

                        if (_strSerialResult !== "OK") {
                            _strScanResultUpdate = _strSerialResult;
                            _strMessageUpdate = _strMessage;
                            _strScanResultAll = "NG";
                            _bolError = true;
                        } else {
                            _strScanResultUpdate = _strSerialResult;
                            _strMessageUpdate = "";
                        }

                        dtSerial[i].SCAN_RESULT = _strScanResultUpdate;
                        dtSerial[i].REMARK = _strMessageUpdate;
                    } else if (CONNECT_SERIAL_ERROR.includes(_strSerial)) {
                        _strScanResultUpdate = "NG";
                        _strMessageUpdate = "NG";
                        _strScanResultAll = "NG";
                        _bolError = true;
                        dtSerial[i].SCAN_RESULT = _strScanResultUpdate;
                        dtSerial[i].REMARK = _strMessageUpdate;
                    }
                }
                _intRowSerial += 1
            }

            setlblResult(_strScanResultAll);
            if (_strScanResultAll === "OK") {
                setlblResultcolor("green");
            } else {
                setlblResultcolor("#ff4d4f");
            }
            if (_strErrorAll !== "") {
                setlblResult(`${lblResult}<br>${_strErrorAll}`);
            }

            setgvScanData(dtSerial);
            setgvScanResult(true);
            await getInitialSerial();

            setvisiblelog(false);
        } else {
            setlblLog("Please input lot no. ");
            SetMode("SERIAL_ERROR");
        }

        inputgvSerial.current[0].focus();
    };

    const getInputSerial = async () => {
        let dtData = [];
        let intRow = 0;
        let strFrontSide = "";

        for (let intSeq = 0; intSeq < gvSerialData.length; intSeq++) {
            intRow++;

            dtData.push({
                SEQ: intRow,
                SERIAL: txtgvSerial[intSeq] || "",
                SCAN_RESULT: "",
                REMARK: "",
                FRONT_SHEET_NO: "",
                BACK_SHEET_NO: "",
                SHEET_PCS_NO: 0,
                ROLL_LEAF_NO: ""
            });
        }
        console.log(dtData);
        return dtData;
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
        sethfBarcodeSide("");
        sethfShtScan("1");
        sethfConfigCheck("N");
        sethfConfigCode("");
        sethfConfigStart("0");
        sethfConfigEnd("0");
        sethfConfigRuning("N");
        sethfDuplicateStart("0");
        sethfDuplicateEnd("0");
        sethfCheckPrdSht("N");
        sethfCheckPrdShtStart("0");
        sethfCheckPrdShtEnd("0");
        sethfCheckPrdAbbr("");
        sethfCheckLotSht("N");
        sethfCheckLotShtStart("0");
        sethfCheckLotShtEnd("0");

        sethfCheckStartSeq("N");
        sethfCheckStartSeqCode("");
        sethfCheckStartSeqStart("0");
        sethfCheckStartSeqEnd("0");
        sethfCheckSheetELT("N");
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
                    sethfSerialCount(dtProductSerial.slm_serial_sht);
                    sethfAutoScan(dtProductSerial.slm_auto_scan);
                    sethfBarcodeSide(dtProductSerial.slm_barcode_side);
                    sethfShtScan(dtProductSerial.slm_sht_scan);
                    sethfConfigCheck(dtProductSerial.prm_barcode_req_config);
                    sethfConfigCode(dtProductSerial.prm_config_code);
                    sethfConfigStart(dtProductSerial.prm_start_config);
                    sethfConfigEnd(dtProductSerial.prm_end_config);
                    sethfConfigRuning(dtProductSerial.prm_running_req_config);
                    sethfDuplicateStart(dtProductSerial.prm_duplicate_start);
                    sethfDuplicateEnd(dtProductSerial.prm_duplicate_end);
                    sethfCheckPrdSht(dtProductSerial.prm_req_check_prd_sht);
                    sethfCheckPrdShtStart(dtProductSerial.prm_check_prd_sht_start);
                    sethfCheckPrdShtEnd(dtProductSerial.prm_check_prd_sht_end);
                    sethfCheckPrdAbbr(dtProductSerial.prm_abbr);
                    sethfCheckLotSht(dtProductSerial.prm_req_check_lot_sht);
                    sethfCheckLotShtStart(dtProductSerial.prm_check_lot_sht_start);
                    sethfCheckLotShtEnd(dtProductSerial.prm_check_lot_sht_end);
                    sethfCheckStartSeq(dtProductSerial.prm_req_start_seq_flg);
                    sethfCheckStartSeqCode(dtProductSerial.prm_start_seq_code);
                    sethfCheckStartSeqStart(dtProductSerial.prm_start_seq_start);
                    sethfCheckStartSeqEnd(dtProductSerial.prm_start_seq_end);
                    sethfCheckSheetELT(dtProductSerial.prm_sheet_elt_flg);
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
                    sethfSerialStartCode(dtProductSerial.prm_serial_start_code);
                    sethfSerialInfo(dtProductSerial.prm_additional_info);
                }
            });
        return dtProductSerial;
    };

    useEffect(() => {
        if (!txtLotDisabled) {
            inputLot.current.focus();
        }
        if (!selProDisabled) {
            ddlProduct.current.focus();
        }
        if (hfMode === "SERIAL" && inputgvSerial.current[0]) {
            inputgvSerial.current[0].focus();
        }
    }, [
        txtLotDisabled,
        selProDisabled
    ]);

    return {
        txtLotNo, settxtLotNo, selProduct, Productdata, txtTotalPCS, settxtTotalPCS, lblLog, visiblelog, lblResultcolor, lblResult,
        pnlSerial, gvScanResult, txtgvSerial, txtLotDisabled, selProDisabled, txtTotalDisabled, gvScanData, handleChangeLot,
        handleChangeProduct, handleChangeTotalPCS, hfSerialCount, ibtBackClick, btnSaveClick, btnCancelClick, handleChangeSerial, inputLot,
        ddlProduct, inputTotal, inputgvSerial
    }

};

export { fn_ScanSMTSerialBackendConfirm };