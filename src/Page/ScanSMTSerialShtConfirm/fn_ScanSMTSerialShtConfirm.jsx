import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Tag } from "antd";
import { useLoading } from "../../loading/fn_loading";

function fn_ScanSMTSerialShtConfirm() {
    const [txtLotNo, settxtLotNo] = useState("");
    const [selProduct, setselProduct] = useState(null);
    const [Productdata, setProductdata] = useState([]);
    const [lblTotalSht, setlblTotalSht] = useState("");
    const [lblLog, setlblLog] = useState("");
    const [visiblelog, setvisiblelog] = useState(false);
    const [lblResult, setlblResult] = useState("");
    const [lblResultcolor, setlblResultcolor] = useState("#059212");

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

    //inputRef
    const inputLot = useRef(null);
    const ddlProduct = useRef(null);
    const inputgvSerial = useRef([]);
    const fcGvBackSide_txtsideback_0 = useRef(null);

    const plantCode = import.meta.env.VITE_FAC;
    const CONNECT_SERIAL_ERROR = import.meta.env.VITE_CONNECT_SERIAL_ERROR;
    const _strTagNewLine = "/";
    const { showLoading, hideLoading } = useLoading();

    useEffect(() => {
        localStorage.setItem("hfUserID", localStorage.getItem("ipAddress"));
        localStorage.setItem("hfUserStation", localStorage.getItem("ipAddress"));
        sethfMode("");
        getProductData();
        SetMode("LOT");
    }, []);

    useEffect(() => {
        if (hfShtScan != "" && !visiblelog && gvSerialData !== "") {
            getInitialSerial();
        }
    }, [hfShtScan, visiblelog]);

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
        const strLotData = txtLotNo.toUpperCase().split(";");

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
                await getCountDataBylot(strLot);

                try {
                    setselProduct(strPrdName);
                    await getProductSerialMaster(strPrdName);

                    SetMode("SERIAL");
                    inputgvSerial.current[0]?.focus();
                } catch (error) {
                    console.error("try-catch error:", error);
                    const intProduct = strPrdName.indexOf('-', 12);
                    if (intProduct > -1) {
                        strPrdName = strPrdName.substring(0, intProduct) + strPrdName.substring(intProduct + 1, intProduct + 11).trim();
                        try {
                            setselProduct(strPrdName);
                            getProductSerialMaster(strPrdName);

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
        setlblTotalSht("");
        setgvScanResult(false);
        setgvScanData([]);
        setlblResult("");
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
            fcGvBackSide_txtsideback_0.current.focus();
        } else {
            setselProduct(Productdata[0].prd_name);
            SetMode("LOT");
        }
    };

    const getCountDataBylot = async (strLot) => {
        let dtSerailCount = [];
        setlblTotalSht("0");
        await axios.post("/api/Common/getSerialPassByLot", {
            strLotNo: strLot,
            strPlantCode: plantCode
        })
            .then((res) => {
                dtSerailCount = res.data.lotcount;
            });
        console.log("Count:", dtSerailCount);
        if (dtSerailCount.length > 0) {
            setlblTotalSht(dtSerailCount.toLocaleString('en-US'));
        }
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
        sethfChipIDCheck("N");
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

    const handleChangeSerial = (index, e) => {
        const newValues = [...txtgvSerial];
        newValues[index] = e.target.value;
        settxtgvSerial(newValues);
    };

    const btnSaveClick = async () => {
        if (hfMode === "SERIAL") {
            await setSerialData();
            settxtgvSerial("");
        }
    };

    const btnCancelClick = async () => {
        SetMode("SERIAL");
        settxtgvSerial("");
        setgvScanResult(false);
        setgvScanData([]);
        setlblResult("");
        inputgvSerial.current[0].focus();
    };

    const SetMode = async (strType) => {
        if (strType === "LOT") {
            setselProDisabled(false);
            settxtLotNo("");
            settxtLotDisabled(false);
            setvisiblelog(false);
            setpnlSerial(false);
            sethfMode("LOT");
            inputLot.current.focus();
        } else if (strType === "LOT_ERROR") {
            settxtLotNo("");
            settxtLotDisabled(false);
            setvisiblelog(true);
            setpnlSerial(false);
            sethfMode("LOT");
            inputLot.current.focus();
        } else if (strType === "SERIAL") {
            settxtLotDisabled(true);
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

        for (let intRow = 1; intRow <= hfShtScan; intRow++) {
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
        let _bolError = false;

        const strLotData = txtLotNo.toUpperCase().split(";");
        _strLot = strLotData[0];
        showLoading('กำลังบันทึก กรุณารอสักครู่');

        if (txtLotNo !== "" && dtSerial.length > 0) {
            let _intRowSerial = 0;
            for (let i = 0; i < dtSerial.length; i++) {
                if (dtSerial[i].SERIAL !== "") {
                    let _strSerial = dtSerial[i].SERIAL;
                    let _strTestResult = "NONE";
                    let _strMessageUpdate = "";
                    let _strScanResultUpdate = "";
                    let _inCountSeq = 0;
                    let _strSerialDup = "";

                    if (!CONNECT_SERIAL_ERROR.includes(_strSerial)) {
                        await axios.post("/api/getSerialForUpdate", {
                            strPlantCode: plantCode,
                            strSerialNo: _strSerial
                        })
                            .then((res) => {
                                _strSerialDup = res.data.strresult
                            });
                        console.log("_strSerialDup:", _strSerialDup);

                        if (_strSerialDup === "Y") {
                            _strScanResultUpdate = "NG";
                            _strMessageUpdate = "Sheet barcode duplicate" + _strTagNewLine + "หมายเลขบาร์โค้ดซ้ำ";
                            _strScanResultAll = "NG";
                            _bolError = true;
                        } else {
                            for (let _intRow = _intRowSerial + 1; _intRow < dtSerial.length; _intRow++) {
                                if (_strSerial === dtSerial[_intRow].SERIAL) {
                                    _strScanResultUpdate = "NG";
                                    _strMessageUpdate = "Sheet barcode duplicate" + _strTagNewLine + "หมายเลขบาร์โค้ดซ้ำ";
                                    _strScanResultAll = "NG";
                                    _bolError = true;
                                }
                            }
                        }

                        if (_strSerial.length === hfSerialLength) {
                            let _strFixDigit = "";
                            const start = parseInt(hfSerialStartDigit);
                            const end = parseInt(hfSerialEndDigit);
                            _strFixDigit = _strSerial.substring(start - 1, end);

                            console.log(_strFixDigit,hfSerialDigit, "1")
                            if (_strFixDigit !== hfSerialDigit) {
                                _strScanResultUpdate = "NG";
                                _strMessageUpdate = "Sheet barcode mix product" + _strTagNewLine + "หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
                                _strScanResultAll = "NG";
                                _bolError = true;
                            } else if (hfConfigCheck === "Y") {
                                let _strConfigDigit = "";
                                const start = parseInt(hfConfigStart);
                                const end = parseInt(hfConfigEnd);
                                _strConfigDigit = _strSerial.substring(start - 1, end);
                                console.log(_strConfigDigit,hfConfigCode, "2")
                                if (_strConfigDigit !== hfConfigCode) {
                                    _strScanResultUpdate = "NG";
                                    _strMessageUpdate = "Sheet barcode mix product" + _strTagNewLine + "หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
                                    _strScanResultAll = "NG";
                                    _bolError = true;
                                }
                            }

                            if (hfSerialStartCode !== "" && !_bolError) {
                                console.log(hfSerialStartCode.length,hfSerialStartCode, "3")
                                if (_strSerial.substring(0, hfSerialStartCode.length) !== hfSerialStartCode) {
                                    _strScanResultUpdate = "NG";
                                    _strMessageUpdate = "Serial barcode mix product" + _strTagNewLine + "หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
                                    _strScanResultAll = "NG";
                                    _bolError = true;
                                }
                            }

                            if (hfCheckStartSeq === "Y" && !_bolError) {
                                let _strStartSeq = "";
                                const start = parseInt(hfCheckStartSeqStart);
                                const end = parseInt(hfCheckStartSeqEnd);
                                _strStartSeq = _strSerial.substring(start - 1, end);
                                console.log(_strStartSeq.length,hfCheckStartSeqCode, "4")
                                if (_strStartSeq !== hfCheckStartSeqCode) {
                                    _strScanResultUpdate = "NG";
                                    _strMessageUpdate = "Sheet barcode mix product" + _strTagNewLine + "หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
                                    _strScanResultAll = "NG";
                                    _bolError = true;
                                }
                            }
                        } else {
                            _strScanResultUpdate = "NG";
                            _strMessageUpdate = "Sheet not matching product" + _strTagNewLine + "หมายเลขบาร์โค้ดไม่ตรงตามที่กำหนดไว้";
                            _strScanResultAll = "NG";
                            _bolError = true;
                        }

                        if (!_bolError) {
                            _strScanResultUpdate = "OK";
                            dtSerial[i].ROW_UPDATE = "Y";
                        }

                    } else {
                        _strMessageUpdate = "Bad mark piece" + _strTagNewLine + "ชิ้นงานเสียทำเครื่องหมายไว้แล้ว";
                    }

                    dtSerial[i].SCAN_RESULT = _strScanResultUpdate;
                    dtSerial[i].REMARK = _strMessageUpdate;
                }
                _intRowSerial += 1;
            }

            if (!_bolError) {
                for (let i = 0; i < dtSerial.length; i++) {
                    await axios.post("/api/Common/setseriallottraytable", {
                        dataList: {
                            strPlantCode: plantCode,
                            strPrdName: _strPrdName,
                            strLot: _strLot,
                            strUserID: hfUserID,
                            data: [
                                {
                                    SERIAL: dtSerial[i].SERIAL,
                                    UPDATE_FLG: dtSerial[i].UPDATE_FLG,
                                    ROW_UPDATE: dtSerial[i].ROW_UPDATE,
                                    REJECT_CODE: dtSerial[i].REJECT_CODE,
                                    TEST_RESULT: dtSerial[i].TEST_RESULT,
                                    REMARK_UPDATE: dtSerial[i].REMARK_UPDATE,
                                    SCAN_RESULT: dtSerial[i].SCAN_RESULT,
                                    PACKING_NO: "",
                                    MASTER_NO: ""
                                }
                            ]
                        }
                    })
                        .then((res) => {
                            _strUpdateError = res.data.p_error;
                            if (_strUpdateError !== "") {
                                _strScanResultAll = "NG";
                            }
                        });
                }
            }

            setlblResult(_strScanResultAll);
            if (_strScanResultAll === "NG") {
                setlblResultcolor("#BA0900");
            } else {
                setlblResultcolor("#059212");
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

        getCountDataBylot(_strLot);

        inputgvSerial.current[0].focus();
        hideLoading();
    };

    const getInputSerial = async () => {
        let dtData = [];
        let intRow = 0;

        for (let intSeq = 0; intSeq < gvSerialData.length; intSeq++) {
            intRow++;

            dtData.push({
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
                UPDATE_FLG: "N"
            });
        }
        console.log(dtData);
        return dtData;
    };

    useEffect(() => {
        if (!txtLotDisabled) {
            inputLot.current.focus();
        }
        if (hfMode === "SERIAL" && inputgvSerial.current[0]) {
            inputgvSerial.current[0].focus();
        }
    }, [
        txtLotDisabled,
        gvSerialData
    ]);

    const handleKeygvSerial = (e, index) => {
        if (e.key === 'Enter') {
            e.preventDefault(); 
            const nextIndex = index + 1;
            if (nextIndex < hfShtScan && inputgvSerial.current[nextIndex]) {
                inputgvSerial.current[nextIndex].focus();
                console.log('Calling btnSaveClick',nextIndex);
            } else if (nextIndex === nextIndex) {
                
                btnSaveClick();
                e.target.blur();
            }
        }
    };

    const columns = [
        {
            title: "No.",
            dataIndex: "SEQ",
            key: "No.",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "Serial No.",
            dataIndex: "SERIAL",
            key: "Serial No.",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "Scan Result",
            key: "Scan Result",
            dataIndex: "SCAN_RESULT",

            render: (text, record, index) => {
                if (text == '')
                    return text;
                else {
                    return (
                        <Tag
                            className={text === "OK" ? "Tag-OK" : text === "NG" ? "Tag-NG" : ""}
                        >
                            {text}
                        </Tag>
                    );
                }
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

    return {
        txtLotNo, settxtLotNo, selProduct, Productdata, lblTotalSht, visiblelog, lblLog, pnlSerial, txtLotDisabled, selProDisabled,
        gvScanResult, inputLot, ddlProduct, lblResultcolor, gvScanData, txtgvSerial, handleChangeLot, ibtBackClick, lblResult,
        handleChangeProduct, handleChangeSerial, btnSaveClick, btnCancelClick, hfShtScan, gvSerialData, inputgvSerial, 
        handleKeygvSerial, columns
    }
};

export { fn_ScanSMTSerialShtConfirm };