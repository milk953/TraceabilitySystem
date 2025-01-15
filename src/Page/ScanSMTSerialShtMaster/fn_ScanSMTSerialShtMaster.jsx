import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Tag } from "antd";
import { useLoading } from "../../loading/fn_loading";
import { DataConfig } from "../Common/function_Common";

function fn_ScanSMTSerialShtMaster() {
    const [txtLotNo, settxtLotNo] = useState("");
    const [selProduct, setselProduct] = useState(null);
    const [Productdata, setProductdata] = useState([]);
    const [txtLotRef, settxtLotRef] = useState("");
    const [txtMasterCode, settxtMasterCode] = useState("");
    const [lblTotalSht, setlblTotalSht] = useState("");
    const [lblTotalPcs, setlblTotalPcs] = useState("");
    const [txtRollLeaf, settxtRollLeaf] = useState("");
    const [txtMachineNo, settxtMachineNo] = useState("");
    const [pnlRollLeaf, setpnlRollLeaf] = useState(false);
    const [pnlMachine, setpnlMachine] = useState(false);
    const [pnlLog, setpnlLog] = useState(false);
    const [lblLog, setlblLog] = useState("");
    const [lblResult, setlblResult] = useState("");
    const [lblResultcolor, setlblResultcolor] = useState("green");

    //Table
    const [pnlBackSide, setpnlBackSide] = useState(false);
    const [gvBackSide, setGvBackSide] = useState([]);
    const [txtSideBack, settxtSideBack] = useState("");
    const [pnlFrontSide, setpnlFrontSide] = useState(false);
    const [txtSideFront, settxtSideFront] = useState("");
    const [pnlSerial, setpnlSerial] = useState(false);
    const [gvSerialData, setgvSerialData] = useState([]);
    const [gvScanResult, setgvScanResult] = useState(false);
    const [gvScanData, setgvScanData] = useState([]);
    const [txtgvSerial, settxtgvSerial] = useState("");

    //Disabled
    const [txtLotDisabled, settxtLotDisabled] = useState(false);
    const [selProDisabled, setselProDisabled] = useState(false);
    const [txtMasterCodeDisabled, settxtMasterCodeDisabled] = useState(false);
    const [txtRollLeafDisabled, settxtRollLeafDisabled] = useState(false);

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
    const [hfBarcodeSide, sethfBarcodeSide] = useState("");
    const [hfShtScan, sethfShtScan] = useState("");
    const [hfConfigCheck, sethfConfigCheck] = useState("");
    const [hfConfigCode, sethfConfigCode] = useState("");
    const [hfConfigStart, sethfConfigStart] = useState("");
    const [hfConfigEnd, sethfConfigEnd] = useState("");
    const [hfConfigRuning, sethfConfigRuning] = useState("");
    const [hfDuplicateStart, sethfDuplicateStart] = useState("");
    const [hfDuplicateEnd, sethfDuplicateEnd] = useState("");
    const [hfCheckPrdSht, sethfCheckPrdSht] = useState("");
    const [hfCheckPrdShtStart, sethfCheckPrdShtStart] = useState("");
    const [hfCheckPrdShtEnd, sethfCheckPrdShtEnd] = useState("");
    const [hfCheckPrdAbbr, sethfCheckPrdAbbr] = useState("");
    const [hfCheckLotSht, sethfCheckLotSht] = useState("");
    const [hfCheckLotShtStart, sethfCheckLotShtStart] = useState("");
    const [hfCheckLotShtEnd, sethfCheckLotShtEnd] = useState("");
    const [hfCheckStartSeq, sethfCheckStartSeq] = useState("");
    const [hfCheckStartSeqCode, sethfCheckStartSeqCode] = useState("");
    const [hfCheckStartSeqStart, sethfCheckStartSeqStart] = useState("");
    const [hfCheckStartSeqEnd, sethfCheckStartSeqEnd] = useState("");
    const [hfCheckSheetELT, sethfCheckSheetELT] = useState("");
    const [hfCheckRollSht, sethfCheckRollSht] = useState("");
    const [hfCheckRollShtDigit, sethfCheckRollShtDigit] = useState("");
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
    const [hfReqMachine, sethfReqMachine] = useState("");
    const [hfConnLeafLength, sethfConnLeafLength] = useState("");
    const [hfRollNo, sethfRollNo] = useState("");
    const [hfCheckRollPrdFlg, sethfCheckRollPrdFlg] = useState("");
    const [hfCheckRollPrdStart, sethfCheckRollPrdStart] = useState("");
    const [hfCheckRollPrdEnd, sethfCheckRollPrdEnd] = useState("");
    const [hfCheckRollPrd, sethfCheckRollPrd] = useState("");
    const [hfConnRollLength, sethfConnRollLength] = useState("");
    const [hfSerialStartCode, sethfSerialStartCode] = useState("");
    const [hfShtPlasmaTimeFlg, sethfShtPlasmaTimeFlg] = useState("");
    const [hfShtPlasmaTime, sethfShtPlasmaTime] = useState("");
    const [hfSheetType, sethfSheetType] = useState("");
    const [hfSerialInfo, sethfSerialInfo] = useState("");
    const [hfCheckXrayF, sethfCheckXrayF] = useState("");
    const [hfCheckXrayB, sethfCheckXrayB] = useState("");
    const [hfCheckXrayOneTime, sethfCheckXrayOneTime] = useState("");
    const [hfCheckFinInspect, sethfCheckFinInspect] = useState("");
    const [hfCheckFinInspectProc, sethfCheckFinInspectProc] = useState("");
    const [hfAutoPressF, sethfAutoPressF] = useState("");
    const [hfAutoPressB, sethfAutoPressB] = useState("");

    //inputRef
    const inputLot = useRef([]);
    const ddlProduct = useRef([]);
    const inputRollLeaf = useRef([]);
    const inputMachineNo = useRef([]);
    const inputSideBack = useRef([]);
    const inputgvSerial = useRef([]);
    const inputMasterCode = useRef([]);
    const { ConfigData } = DataConfig();
    const plantCode = ConfigData.FACTORY;
    const AUTO_SCAN_CHECK_FLG = ConfigData.AUTO_SCAN_CHECK_FLG;
    const CONNECT_SERIAL_ERROR = ConfigData.CONNECT_SERIAL_ERROR;
    const CONNECT_SERIAL_NOT_FOUND = ConfigData.CONNECT_SERIAL_NOT_FOUND; CONNECT_SERIAL_NOT_FOUND
    const MASTER_SHEET = ConfigData.SHT_PCS_MASTER_CODE;

    const { showLoading, hideLoading } = useLoading();

    useEffect(() => {
        PageLoad();
    }, []);

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
            getProductSerialMaster(data[0].prd_name);
        });
    };

    const handleChangeLot = async () => {
        let strLot = "";
        let strPrdName = "";
        let dtLotData = [];
        const strLotData = txtLotNo.toUpperCase().trim().split(";");

        if (strLotData.length >= 2) {
            strLot = strLotData[0];
            await axios.post("/api/Common/getProductDataByLot", {
                strLot: strLot,
            })
                .then((res) => {
                    dtLotData = res.data.flat().flat();
                });
            setpnlRollLeaf(false);
            sethfRollNo("");
            setlblTotalSht("");
            if (dtLotData.length > 0) {
                strPrdName = dtLotData[0][0];
                sethfRollNo(dtLotData[0][1]);
            }

            if (strPrdName !== "") {
                setlblLog("");
                setpnlLog(false);
                settxtLotNo(strLot);
                settxtLotRef(strLot);
                await getCountDataBylot(strLot);
                try {
                    setselProduct(strPrdName);
                    const datagetPd = await getProductSerialMaster(strPrdName);
                    await getInitialSheet(datagetPd.slm_sht_scan);
                    settxtMasterCode("");
                    setTimeout(() => {
                        inputMasterCode.current?.focus();
                    }, 300);
                } catch (error) {
                    const intProduct = strPrdName.indexOf('-', 12);
                    if (intProduct > -1) {
                        strPrdName = strPrdName.substring(0, intProduct) + strPrdName.substring(intProduct + 1, intProduct + 11).trim();
                        try {
                            setselProduct(strPrdName);
                            const datagetPd = await getProductSerialMaster(strPrdName);
                            await getInitialSheet(datagetPd.slm_sht_scan);
                            settxtMasterCode("");
                            setTimeout(() => {
                                inputMasterCode.current?.focus();
                            }, 300);
                        } catch (error) {
                            setlblLog(`Product ${strPrdName} not found.`);
                            setpnlLog(true);
                            setTimeout(() => {
                                ddlProduct.current.focus();
                            }, 300);
                        }
                    } else {
                        setlblLog(`Product ${strPrdName} not found.`);
                        setpnlLog(true);
                        setTimeout(() => {
                            ddlProduct.current.focus();
                        }, 300);
                    }
                }
            } else {
                setselProduct(Productdata[0].prd_name);
                settxtLotNo("");
                setgvSerialData([]);
                setlblLog("Invalid lot no.");
                setpnlLog(true);
                sethfMode("LOT");
                setTimeout(() => {
                    inputLot.current.focus();
                }, 300);
            }
        } else {
            setselProduct(Productdata[0].prd_name);
            settxtLotNo("");
            setgvSerialData([]);
            setlblLog(`Please scan QR Code! / กรุณาสแกนที่คิวอาร์โค้ด`);
            setpnlLog(true);
            sethfMode("LOT");
            setTimeout(() => {
                inputLot.current.focus();
            }, 300);
        }
    };

    const ibtBackClick = () => {
        settxtLotNo("");
        settxtLotDisabled(false);
        setpnlSerial(false);
        setselProduct(Productdata[0].prd_name);
        SetMode("LOT");
        setTimeout(() => {
            inputLot.current.focus();
        }, 300);
        settxtLotRef("");
        settxtMasterCode("");
        setlblTotalSht("");
        setlblTotalPcs("");
        setpnlBackSide(false);
        setgvScanResult(false);
    };

    const handleChangeProduct = async (value) => {
        setselProduct(value);
        await getProductSerialMaster(value);
        if (txtLotNo !== "") {
            setlblLog("");
            setpnlLog(false);
            await getCountDataBylot(txtLotNo);
            await getInitialSheet(value);
            if (hfCheckRollSht === "Y") {
                setpnlRollLeaf(true);
                settxtRollLeaf("");
                setTimeout(() => {
                    inputRollLeaf.current.focus();
                }, 300);
            } else {
                SetMode("SERIAL");
                settxtMachineNo("");
                if (hfReqMachine === "Y") {
                    setpnlMachine(true);
                    setTimeout(() => {
                        inputMachineNo.current.focus();
                    }, 300);
                } else {
                    inputSideBack.current[0].focus();
                }
            }
        } else {
            setselProduct(Productdata[0].prd_name);
            SetMode("LOT");
        }
    };

    const handleChangeLotRef = () => {
        if (txtLotRef !== "") {
            const strLotData = txtLotRef.toUpperCase().trim().split(";");
            settxtLotRef(strLotData[0]);
            setTimeout(() => {
                inputMasterCode.current.focus();
            }, 300);
        }
    };

    const handleChangeMasterCode = async () => {
        if (txtMasterCode.trim() !== "") {
            console.log(MASTER_SHEET)
            if (txtMasterCode === MASTER_SHEET) {
                setpnlLog(false);
                setlblLog("");
                const datagetPd = await getProductSerialMaster(selProduct);
                // await getInitialSheet(datagetPd.slm_sht_scan);
                console.log("hfCheckRollSht", datagetPd.prm_conn_roll_sht_flg);
                if (datagetPd.prm_conn_roll_sht_flg === "Y") {
                    setpnlRollLeaf(true);
                    settxtRollLeaf("");
                    setTimeout(() => {
                        inputRollLeaf.current.focus();
                    }, 300);
                } else {
                    SetMode("SERIAL");
                    settxtMachineNo("");
                    if (hfReqMachine === "Y") {
                        setpnlMachine(true);
                        inputMachineNo.current.focus();
                    } else {
                        setpnlMachine(false);
                        setTimeout(() => {
                            inputSideBack.current[0].focus();
                        }, 300);
                    }

                }
            } else {
                settxtMasterCode("");
                setpnlLog(true);
                setpnlSerial(false);
                setlblLog("Scan master code incorrect / สแกน master code ไม่ถูกต้อง");
                setTimeout(() => {
                    inputMasterCode.current.focus();
                }, 300);
            }
        } else {
            setTimeout(() => {
                inputMasterCode.current.focus();
            }, 300);
        }
    };

    const handleChangeRollLeaf = async () => {
        setpnlLog(false);
        setlblLog("");
        console.log("hfConnRollLength", hfConnRollLength)
        if (txtRollLeaf !== "" && txtRollLeaf.length === parseInt(hfConnRollLength)) {
            let strRollProduct = hfRollNo + hfCheckRollPrd;
            if (hfCheckRollPrdFlg === "Y" &&
                strRollProduct !==
                txtRollLeaf.substring(
                    parseInt(hfCheckRollPrdStart) - 1,
                    parseInt(hfCheckRollPrdEnd))
            ) {
                setpnlLog(true);
                setlblLog("Roll/Leaf No. mix product");
                setpnlSerial(false);
                sethfMode("ROLL");
                await getInitialSheet();
                settxtRollLeaf("");
                setTimeout(() => {
                    inputRollLeaf.current.focus();
                }, 300);
            } else {
                SetMode("SERIAL");
                settxtMachineNo("");
                if (hfReqMachine === "Y") {
                    setpnlMachine(true);
                    inputMachineNo.current.focus();
                } else {
                    setpnlMachine(false);
                    inputSideBack.current[0].focus();
                }
            }
        } else {
            setpnlLog(true);
            setlblLog("Invalid Roll/Leaf No.");
            setpnlSerial(false);
            sethfMode("ROLL");
            await getInitialSheet();
            settxtRollLeaf("");
            setTimeout(() => {
                inputRollLeaf.current.focus();
            }, 300);
        }
    };

    const handleChangeMachine = (event) => {
        const txtMachineNo = event.target.value;
        settxtMachineNo(txtMachineNo);
    };

    const handleChangeSerial = (index, e) => {
        const trimmedValue = e.target.value.trim().toUpperCase();
        const newValue = [...txtgvSerial];
        newValue[index] = trimmedValue;
        settxtgvSerial(newValue);
    };

    const handleChangegvBackSide = (index, e) => {
        const newValues = [...txtSideBack];
        newValues[index] = e.target.value.trim().toUpperCase();
        settxtSideBack(newValues);
    };

    const handleChangegvFontSide = (index, e) => {
        const newValues = [...txtSideFront];
        newValues[index] = e.target.value.trim().toUpperCase();
        settxtSideFront(newValues);
    };

    const btnSaveClick = async () => {
        if (hfMode === "SERIAL") {
            await setSerialData();
            scrollToTop();
            // setTimeout(() => setlblResult(""), 5000);
            // setTimeout(() => setgvScanResult(false), 5000);
        }
    };

    const btnCancelClick = async () => {
        SetMode("SERIAL");
        inputSideBack.current[0].focus();
        setgvScanData([]);
        setgvScanResult(false);
        settxtgvSerial("");
        settxtSideBack("");
    };

    const SetMode = async (strType) => {
        if (strType === "LOT") {
            setselProDisabled(false);
            settxtLotNo("");
            settxtLotDisabled(false);
            setpnlLog(false);
            setpnlSerial(false);
            sethfMode("LOT");
            setTimeout(() => {
                inputLot.current.focus();
            }, 300);
        } else if (strType === "LOT_ERROR") {
            settxtLotNo("");
            settxtLotDisabled(false);
            setpnlLog(true);
            setpnlSerial(false);
            sethfMode("LOT");
            setTimeout(() => {
                inputLot.current.focus();
            }, 300);
        } else if (strType === "SERIAL") {
            settxtLotDisabled(true);
            setpnlLog(false);
            setpnlSerial(true);
            sethfMode("SERIAL");
            await getInitialSerial();
        } else if (strType === "SERIAL_ERROR") {
            settxtLotDisabled(true);
            setpnlLog(true);
        } else if (strType === "SERIAL_OK") {
            settxtLotDisabled(true);
            setpnlLog(false);
            setpnlSerial(true);
            await getInitialSerial();
            inputgvSerial.current[0].focus();
        } else if (strType === "SERIAL_NG") {
            settxtLotDisabled(true);
            setpnlLog(false);
        }
    };

    const getInitialSerial = async () => {
        let dtData = [];

        for (let intSht = 1; intSht <= hfShtScan; intSht++) {
            let drRowSht = {
                SHEET: "",
                SEQ: 0,
                TYPE: "SHT"
            };
            if (drRowSht.SEQ === 0) {
                drRowSht.SEQ = "";
            }
            if (hfBarcodeSide === "F") {
                drRowSht.SHEET = `Front Side ${intSht}:`;
            } else {
                drRowSht.SHEET = `Back Side ${intSht}:`;
            }
            dtData.push(drRowSht);

            for (let intRow = 1; intRow <= hfSerialCount; intRow++) {
                let drRow = {
                    SHEET: intSht.toString(),
                    SEQ: intRow,
                    TYPE: "PCS"
                }

                dtData.push(drRow);
            }
        }

        settxtgvSerial("");
        settxtSideBack("");
        setgvSerialData(dtData);
        console.log("gvserialdata:", dtData)
        return dtData;
    };

    const getInitialSheet = async (hfShtScan) => {
        let dtData1 = [];

        for (let intRow = 1; intRow <= hfShtScan; intRow++) {
            dtData1.push({
                SEQ: hfBarcodeSide === "F" ? `Back Side ${intRow}:` : `Front Side ${intRow}:`
            });
        }

        setGvBackSide(dtData1);
        setpnlBackSide(true);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const setSerialData = async () => {

        showLoading('กำลังบันทึก กรุณารอสักครู่');
        if (txtMasterCode === MASTER_SHEET) {
            const dtSerial = await getInputSerial();
            console.log(dtSerial)
            let _strLot = "";
            let _strLotRef = "";
            let _strPrdName = selProduct;
            let _strShtNoBack = "";
            let _strShtNoFront = "";
            let _strTray = " ";
            let _intSeq = 1;
            let _strScanResultAll = "OK";
            let _strErrorAll = "";
            let _strUpdateError = "";
            sethfWeekCode("");
            setlblResult("");

            const CheckFontSideBackSide = dtSerial.every(item => item.BACK_SIDE === "" || item.BACK_SIDE === undefined || item.FRONT_SIDE === "" || item.FRONT_SIDE === undefined);
            if (dtSerial.length === 0 || CheckFontSideBackSide) {
                hideLoading();
                setlblLog("Please input Sheet Side No.");
                setpnlLog(true);
                setlblResult("");
                setgvScanResult(false);
                setgvScanData([]);
                setTimeout(() => {
                    inputSideBack.current[0].focus();
                }, 300);
                return;
            }

            const allSerialEmpty = dtSerial.every(item => item.SERIAL === "" || item.SERIAL === undefined);
            if (allSerialEmpty) {
                hideLoading();
                setpnlLog(true);
                setlblLog("Please Input Serial No.");
                setgvScanResult(false);
                setgvScanData([]);
                setTimeout(() => {
                    inputgvSerial.current[1].focus();
                }, 300);
            }

            let _bolError = false;
            const _strLotData = txtLotNo.toUpperCase().split(";");
            _strLot = _strLotData[0];
            const _strLotRefData = txtLotRef.toUpperCase().split(";");
            _strLotRef = _strLotRefData[0];

            setpnlLog(false);


            if (txtLotNo !== "" && dtSerial.length > 0) {
                if (hfCheckWeekCode === "Y") {
                    await axios.post("/api/Common/getWeekCodebyLot", {
                        _strLot: _strLot,
                        _strProc: hfDateInProc,
                        _strWeekType: hfWeekCodeType,
                        _strSerialInfo: hfSerialInfo,
                    })
                        .then((res) => {
                            sethfWeekCode(res.data);
                            console.log("hfWeekCode", res.data);
                        });
                }

                let _intRowSerial = 0;
                let CheckValue = false;
                for (let i = 0; i < dtSerial.length; i++) {
                    _strShtNoBack = dtSerial[i].BACK_SIDE;
                    _strShtNoFront = dtSerial[i].FRONT_SIDE;

                    if (_strShtNoFront === undefined) {
                        setpnlLog(true);
                        setlblLog("Please input Sheet Side");
                        setTimeout(() => {
                            inputSideBack.current[0].focus();
                        }, 200);
                        settxtSideBack("");
                        settxtgvSerial("");
                        hideLoading();
                    }

                    if (_strShtNoBack === undefined) {
                        setpnlLog(true);
                        setlblLog("Please input Sheet Side");
                        setTimeout(() => {
                            inputSideBack.current[0].focus();
                        }, 200);
                        settxtSideBack("");
                        settxtgvSerial("");
                        hideLoading();
                    }
                    //------------------------------------------
                    if (Array.isArray(txtgvSerial)) {
                        const Value = txtgvSerial.slice(1).some((item) => item.trim() !== "");
                        CheckValue = Value;
                    }

                    if (CheckValue === false) {
                        setlblLog(`Please Input Serial No.`);
                        setpnlLog(true);
                        inputgvSerial.current[0].focus();
                        settxtgvSerial("");
                        setgvScanData([]);
                        setgvScanResult(false);
                        hideLoading();
                    }


                    //------------------------------------------

                    if (hfCheckPrdSht === "Y" && dtSerial[i].SEQ === 1 && !_bolError) {
                        if (hfCheckPrdAbbr !== _strShtNoBack.substring(parseInt(hfCheckPrdShtStart) - 1, parseInt(hfCheckPrdShtEnd)
                        )) {
                            _strScanResultAll = "NG";
                            _strErrorAll = "Sheet product mix";
                            _bolError = true;
                        }
                        if (hfCheckPrdAbbr !== _strShtNoFront.substring(parseInt(hfCheckPrdShtStart) - 1, parseInt(hfCheckPrdShtEnd)
                        )) {
                            _strScanResultAll = "NG";
                            _strErrorAll = "Sheet product mix";
                            _bolError = true;
                        }
                    }

                    if (hfCheckLotSht === "Y" && dtSerial[i].SEQ === 1 && !_bolError) {
                        if (_strLotRef !== _strShtNoBack.substring(parseInt(hfCheckLotShtStart) - 1, parseInt(hfCheckLotShtEnd)
                        )) {
                            _strScanResultAll = "NG";
                            _strErrorAll = "Sheet lot mix";
                            _bolError = true;
                        }
                        if (_strLotRef !== _strShtNoFront.substring(parseInt(hfCheckLotShtStart) - 1, parseInt(hfCheckLotShtEnd)
                        )) {
                            _strScanResultAll = "NG";
                            _strErrorAll = "Sheet lot mix";
                            _bolError = true;
                        }
                    }

                    if (hfShtPlasmaTimeFlg === "Y" && dtSerial[i].SEQ === 1 && !_bolError) {
                        await axios.post("/api/Common/getconnectshtplasmatime", {
                            dataList: {
                                strSheetnoF: _strShtNoFront,
                                strSheetnoB: _strShtNoBack,
                                strPlantCode: plantCode,
                                _strLotNo: _strLotRef,
                                dblPlasmaTime: hfShtPlasmaTime,
                            },
                        })
                            .then((res) => {
                                _strErrorAll = res.data;
                            });
                        if (_strErrorAll !== "") {
                            _strScanResultAll = "NG";
                            _bolError = true;
                        }
                    }

                    if (dtSerial[i].SEQ === 1) {
                        if (hfAutoPressB === "Y" || hfAutoPressF === "Y") {
                            await axios.post("/api/getSheetAutoPressResult", {
                                strPlantCode: plantCode,
                                strSheetFront: _strShtNoFront,
                                strSheetBack: _strShtNoBack,
                                strCheckFront: hfAutoPressF,
                                strCheckBack: hfAutoPressB,
                            })
                                .then((res) => {
                                    _strErrorAll = res.data.p_error;
                                });
                            if (_strErrorAll !== "") {
                                _strScanResultAll = "NG";
                                _bolError = true;
                            }
                        }
                    }

                    if (hfReqMachine === "Y") {
                        if (txtMachineNo === "" ||
                            txtMachineNo === CONNECT_SERIAL_ERROR ||
                            txtMachineNo === CONNECT_SERIAL_NOT_FOUND
                        ) {
                            _strScanResultAll = "NG";
                            _strErrorAll = "Invalid machine no";
                            _bolError = true;
                        }
                    }

                    if (parseInt(hfConnLeafLength) > 0 &&
                        parseInt(hfConnLeafLength) !== dtSerial[i].BACK_SIDE.length ||
                        parseInt(hfConnLeafLength) !== dtSerial[i].FRONT_SIDE.length) {
                        _strScanResultAll = "NG";
                        _strErrorAll = "Invalid sheet length";
                        _bolError = true;
                    }

                    if (dtSerial[i].SERIAL !== "") {
                        let _strSerial = dtSerial[i].SERIAL;
                        let _strTestResult = "NONE";
                        let _strMessageUpdate = "";
                        let _strRemark = "";
                        let _strScanResultUpdate = "";

                        if (!CONNECT_SERIAL_ERROR.includes(_strSerial)) {
                            for (let _intRow = _intRowSerial + 1; _intRow < dtSerial.length; _intRow++) {
                                if (_strSerial === dtSerial[_intRow].SERIAL) {
                                    dtSerial[i].UPDATE_FLG === "Y";
                                    _strScanResultUpdate = "NG";
                                    _strRemark = "Serial duplicate / หมายเลขบาร์โค้ดซ้ำ";
                                    _strMessageUpdate = "Serial duplicate";
                                    _strScanResultAll = "NG";
                                    _bolError = true;
                                }
                            }

                            if (_strSerial.length === parseInt(hfSerialLength)) {
                                let _strFixDigit = "";
                                const start = parseInt(hfSerialStartDigit);
                                const end = parseInt(hfSerialEndDigit);
                                _strFixDigit = _strSerial.substring(start - 1, end);

                                console.log(_strFixDigit, hfSerialDigit);
                                if (_strFixDigit !== hfSerialDigit) {
                                    _strScanResultUpdate = "NG";
                                    _strRemark = "Serial barcode mix product / หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
                                    _strMessageUpdate = "Serial barcode mix product";
                                    _strScanResultAll = "NG";
                                    _bolError = true;
                                } else if (hfConfigCheck === "Y") {
                                    let _strConfigDigit = "";
                                    const start = parseInt(hfConfigStart);
                                    const end = parseInt(hfConfigEnd);
                                    _strConfigDigit = _strSerial.substring(start - 1, end);
                                    if (_strConfigDigit !== hfConfigCode) {
                                        _strScanResultUpdate = "NG";
                                        _strRemark = "Serial barcode mix product / หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
                                        _strMessageUpdate = "Serial barcode mix product";
                                        _strScanResultAll = "NG";
                                        _bolError = true;
                                    }
                                }

                                if (hfSerialStartCode !== "" && _bolError === false) {
                                    if (_strSerial.substring(0, hfSerialStartCode.length) !== hfSerialStartCode) {
                                        _strScanResultUpdate = "NG";
                                        _strRemark = "Serial barcode mix product / หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
                                        _strMessageUpdate = "Serial barcode mix product";
                                        _strScanResultAll = "NG";
                                        _bolError = true;
                                    }
                                }

                                if (hfCheckStartSeq === "Y" && _strScanResultUpdate !== "NG") {
                                    let _strStartSeq = "";
                                    const start = parseInt(hfCheckStartSeqStart);
                                    const end = parseInt(hfCheckStartSeqEnd);
                                    _strStartSeq = _strSerial.substring(start - 1, end);
                                    if (_strStartSeq !== hfCheckStartSeqCode) {
                                        _strScanResultUpdate = "NG";
                                        _strRemark = "Serial barcode mix product\nหมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
                                        _strMessageUpdate = "Serial barcode mix product";
                                        _strScanResultAll = "NG";
                                        _bolError = true;
                                    }
                                }

                                if (hfCheckWeekCode === "Y" && _strScanResultUpdate !== "NG") {
                                    let _strWeekCode = "";
                                    const start = parseInt(hfCheckWeekCodeStart);
                                    const end = parseInt(hfCheckWeekCodeEnd);
                                    _strWeekCode = _strSerial.substring(start - 1, end);
                                    if (_strWeekCode !== hfWeekCode) {
                                        _strScanResultUpdate = "NG";
                                        _strRemark = "Serial barcode mix week code / หมายเลขบาร์โค้ดปนรหัสสัปดาห์กัน";
                                        _strMessageUpdate = "Serial barcode mix week code";
                                        _strScanResultAll = "NG";
                                        _bolError = true;
                                    }
                                }
                            } else {
                                _strScanResultUpdate = "NG";
                                _strRemark = "Serial not matching product / หมายเลขบาร์โค้ดไม่ตรงตามที่กำหนดไว้";
                                _strMessageUpdate = "Serial not matching product";
                                _strScanResultAll = "NG";
                                _bolError = true;
                            }

                            let _inCountSeq = 0;
                            let _strSerialNoDup = "";
                            await axios.post("/api/Common/getserialduplicateconnectsht", {
                                dataList: {
                                    strLssSerialNo: _strSerial.substring(
                                        parseInt(hfDuplicateStart) - 1,
                                        parseInt(hfDuplicateEnd)),
                                    strPlantCode: plantCode,
                                    _strSerialNoDup: _strSerialNoDup,
                                }
                            })
                                .then((res) => {
                                    _inCountSeq = res.data;

                                    if (_inCountSeq > 0) {
                                        dtSerial[i].UPDATE_FLG = "Y";
                                    }
                                });

                        } else {
                            _strMessageUpdate = "Bad mark piece / ชิ้นงานเสียทำเครื่องหมายไว้แล้ว";
                            _strScanResultUpdate = "NG";
                        }

                        dtSerial[i].SCAN_RESULT = _strScanResultUpdate;
                        dtSerial[i].REMARK = _strMessageUpdate;
                        dtSerial[i].REMARK_DETAIL = _strRemark;
                    }

                    _intRowSerial = _intRowSerial + 1;
                }

                if (hfWeekCodeType === "S" && _bolError === false) {
                    let _strReturn = "";
                    for (let i = 0; i < dtSerial.length; i++) {
                        await axios.post("/api/Common/GetShippingSerialNo", {
                            strLotNo: _strLotRef,
                            dtSerial: [
                                {
                                    SERIAL: dtSerial[i].SERIAL,
                                    SEQ: dtSerial[i].SEQ
                                }
                            ],
                            strWeekType: hfWeekCodeType,
                        })
                            .then((res) => {
                                _strReturn = res.data;
                            });
                        if (_strReturn !== "") {
                            _strScanResultAll = "NG";
                            _bolError = true;
                            if (_strReturn !== "NG") {
                                setpnlLog(true);
                                setlblLog(_strReturn);
                            }
                        }
                    }
                }

                if (hfCheckSheetELT === "Y" && _bolError === false) {
                    let _strReturn = "";
                    for (let i = 0; i < dtSerial.length; i++) {
                        await axios.post("/api/Common/setseriallotshtelttable", {
                            dataList: {
                                //strSheetNo: "",
                                strPrdName: selProduct,
                                strPlantCode: plantCode,
                                strSideF: dtSerial[i].FRONT_SIDE,
                                strSideB: dtSerial[i].BACK_SIDE,
                                strPcsno: dtSerial[i].SEQ,
                                strSerialNo: dtSerial[i].SERIAL,
                                strIntSerialLength: hfSerialLength
                            },
                        })
                            .then((res) => {
                                _strReturn = res.data[0].p_error;
                                console.log(_strReturn, "setseriallotshtelttable");
                                if (_strReturn !== "") {
                                    dtSerial[i].SCAN_RESULT = "NG";
                                    dtSerial[i].REMARK = "No sheet ELT result / ไม่พบผลการทดสอบ ELT";
                                    _strScanResultAll = "NG";
                                    _bolError = true;
                                    if (_strReturn !== "NG") {
                                        setpnlLog(true);
                                        setlblLog(_strReturn);
                                    }
                                }
                            });
                    }
                }

                if (!_bolError) {
                    for (let i = 0; i < dtSerial.length; i++) {
                        if (dtSerial[i].SERIAL !== "") {
                            let _intCount = 0;
                            let _intCountOK = 0;
                            let _intCountNG = 0;
                            let _strRemark = "";
                            let _strError = "";
                            let _strSerial = dtSerial[i].SERIAL;
                            let _dtSerialAll = [];
                            let _bolScanDouble = false;
                            let _bolScanDuplicate = false;
                            let _strPrdNameOrg = "";
                            let _strNG = "NG";
                            let _strScanResultUpdate = "OK";
                            let _strMessageUpdate = "";
                            let _strRejectUpdate = "";
                            let _Message = "";

                            _bolError = false;
                            let _strTestResult = "NONE";

                            if (CONNECT_SERIAL_ERROR.includes(_strSerial)) {
                                _strRemark = "Bad mark piece / ชิ้นงานเสียทำเครื่องหมายไว้แล้ว";
                                _strMessageUpdate = "Bad mark piece";
                                _strScanResultUpdate = "OK";
                            }

                            if (AUTO_SCAN_CHECK_FLG === "1" &&
                                _strScanResultUpdate !== "NG" &&
                                CONNECT_SERIAL_ERROR.indexOf(_strSerial) === -1
                            ) {
                                let _Result = "";
                                let _FrontSheetBarcode = "";
                                let _RearSheetBarcode = "";
                                if (hfBarcodeSide == "F") {
                                    _FrontSheetBarcode = dtSerial[i].FRONT_SIDE;
                                    _RearSheetBarcode = dtSerial[i].BACK_SIDE;
                                } else {
                                    _FrontSheetBarcode = dtSerial[i].BACK_SIDE;
                                    _RearSheetBarcode = dtSerial[i].FRONT_SIDE;
                                }
                                await axios.post("/api/Common/Get_Spi_aoi_result", {
                                    dataList: {
                                        _strPlantCode: plantCode,
                                        _pcsPosition: _intSeq,
                                        _frontSheetNumber: _FrontSheetBarcode,
                                        _rearSheetNumber: _RearSheetBarcode,
                                        _strProduct: _strPrdName,
                                        _Message: _Message,
                                    },
                                })
                                    .then((res) => {
                                        _Result = res.data._strresult;
                                        _strMessage = res.data._strmessage;
                                    });
                                if (_Result === "NG") {
                                    _strScanResultUpdate = _Result;
                                }
                                _strRemark = _Message;
                                _strMessageUpdate = _Message;
                            }

                            dtSerial[i].SCAN_RESULT = _strScanResultUpdate;
                            dtSerial[i].REMARK = _strMessageUpdate;
                            dtSerial[i].REMARK_DETAIL = _strRemark;

                            if (_strScanResultUpdate === "NG") {
                                _strScanResultAll = "NG";
                            }
                        }

                        _intSeq = _intSeq + 1;
                    }

                    if (!_bolError && hfCheckRollSht === "Y") {
                        if (txtRollLeaf.length === hfConnRollLength) {
                            let dataRBMP = "";
                            await axios.post("/api/ScanFin/GetRollLeafScrapRBMP", {
                                strRollNo: txtRollLeaf,
                            })
                                .then((res) => {
                                    dataRBMP = res.data;
                                });
                            if (dataRBMP === "Y") {
                                _bolError = true;
                                _strScanResultAll = "NG";
                                _strUpdateError = "Problem sheet from RBMP";
                                _strErrorAll = "Problem sheet from RBMP";
                            } else {
                                let dtRowLeaf = await getConnectRollSheetData(
                                    dtSerial,
                                    selProduct,
                                    txtRollLeaf
                                );
                                let _intCount = 0;
                                let _strRollLeaf = txtRollLeaf.toUpperCase().trim();
                                await axios.post("/api/ScanFin/GetRollLeafDuplicate", {
                                    strRollLeaf: _strRollLeaf,
                                    _dtRollLeaf: dtRowLeaf,
                                })
                                    .then((res) => {
                                        _intCount = res.data;
                                    });
                                if (_intCount = 1) {
                                    _bolError = true;
                                    _strScanResultAll = "NG";
                                    for (let i = 0; i < dtRowLeaf.length; i++) {
                                        dtRowLeaf[i].UPDATE_FLG = "N";
                                        dtRowLeaf[i].ROW_UPDATE = "N";
                                        dtRowLeaf[i].SCAN_RESULT = "NG";
                                        dtRowLeaf[i].REMARK =
                                            "Roll/Sheet barcode duplicate / หมายเลขบาร์โค้ดซ้ำ";
                                        _intCount += 1;
                                    }

                                    _strUpdateError = "Roll/Sheet barcode duplicate";
                                    _strErrorAll = "Roll/Sheet barcode duplicate";
                                }

                                if (hfCheckRollPrdFlg === "Y" && !_bolError) {
                                    let strRollProduct = hfRollNo + hfCheckRollPrd;
                                    if (strRollProduct !==
                                        _strRollLeaf.substring(
                                            parseInt(hfCheckRollPrdStart) - 1,
                                            parseInt(hfCheckRollPrdEnd)
                                        )
                                    ) {
                                        _bolError = true;
                                        _strScanResultAll = "NG";
                                        for (let i = 0; i < dtRowLeaf.length; i++) {
                                            dtRowLeaf[i].UPDATE_FLG = "N";
                                            dtRowLeaf[i].ROW_UPDATE = "N";
                                            dtRowLeaf[i].SCAN_RESULT = "NG";
                                            dtRowLeaf[i].REMARK =
                                                "Roll/Sheet not matching product\nหมายเลขบาร์โค้ดไม่ตรงกับผลิตภัณฑ์";
                                            _intCount += 1;
                                        }
                                        _strUpdateError = "Roll/Sheet not matching product";
                                        _strErrorAll = "Roll/Sheet not matching product";
                                    }
                                }

                                if (!_bolError && dtRowLeaf.length > 0) {
                                    for (let i = 0; i < dtRowLeaf.length; i++) {
                                        dtRowLeaf[i].UPDATE_FLG = "N";
                                        dtRowLeaf[i].ROW_UPDATE = "Y";
                                        dtRowLeaf[i].SCAN_RESULT = "OK";
                                        dtRowLeaf[i].REMARK = "";
                                        _intCount += 1

                                        let _intRow = 0;
                                        await axios.post("/api/Common/SetRollLeafTrayTable", {
                                            strRowUpdate: dtRowLeaf[i].ROW_UPDATE,
                                            strUpdateFlg: dtRowLeaf[i].UPDATE_FLG,
                                            strRollNo: dtRowLeaf[i].ROLL_NO,
                                            strLotNo: dtRowLeaf[i].LOT_NO,
                                            strRollLeaf: dtRowLeaf[i].ROLL_LEAF,
                                            strSheetNo: dtRowLeaf[i].SHT_NO,
                                            strShtSeq: dtRowLeaf[i].SHT_SEQ,
                                            strIntRow: _intRow + 1,
                                            strProduct: dtRowLeaf[i].PRODUCT,
                                            strMachine: dtRowLeaf[i].MACHINE,
                                            strUserID: hfUserStation,
                                            strOperator: "SerialShtPcs",
                                            strPlantCode: plantCode,
                                            strProgram: 'ScanSMTSerialShtMaster'
                                        })
                                            .then((res) => {
                                                _strUpdateError = res.data.p_error;
                                            });
                                    }
                                }
                            }
                        } else {
                            _strScanResultAll = "NG";
                            _strUpdateError = "Roll leaf no. incorrect.";
                            _strErrorAll = "Roll leaf no. incorrect.";
                        }
                    }
                }

                for (let i = 0; i < dtSerial.length; i++) {
                    await axios.post("/api/Common/SetSerialLotShtTable", {
                        SERIAL: dtSerial[i].SERIAL,
                        FRONT_SIDE: dtSerial[i].FRONT_SIDE,
                        BACK_SIDE: dtSerial[i].BACK_SIDE,
                        MACHINE: dtSerial[i].MACHINE,
                        MASTER_NO: dtSerial[i].MASTER_NO,
                        intSerialLength: hfSerialLength,
                        UPDATE_FLG: dtSerial[i].UPDATE_FLG,
                        BarcodeSide: hfBarcodeSide,
                        SEQ: dtSerial[i].SEQ,
                        PRODUCT: selProduct,
                        USER_ID: hfUserID,
                        REMARK: dtSerial[i].REMARK,
                        LOT: _strLot,
                        strProgram: 'ScanSMTSerialShtMaster'
                    })
                        .then((res) => {
                            _strUpdateError = res.data.p_error;
                            console.log("/////////")
                        });
                }

                if (_strUpdateError !== "") {
                    _strScanResultAll = "NG";
                }

                if (_bolError || _strUpdateError !== "") {
                    _strScanResultAll = "NG";
                }

                setlblResult(_strScanResultAll);
                if (_strScanResultAll === "NG") {
                    setlblResultcolor("red");
                } else {
                    setlblResultcolor("green");
                }
                if (_strErrorAll !== "") {
                    // setlblResult(lblResult + "/" + _strErrorAll);
                    setlblResult(_strErrorAll);
                }

                setgvScanData(dtSerial);
                setgvScanResult(true);
                //await getInitialSheet();
                await getInitialSerial();

            } else {
                setlblLog("Please input Sheet Side No. !!! ");
                SetMode("SERIAL_ERROR");
                hideLoading();
            }

            await getCountDataBylot(txtLotNo);
            settxtRollLeaf("");
            settxtMachineNo("");
            if (hfCheckRollSht === "Y") {
                setpnlRollLeaf(true);
                settxtRollLeafDisabled(false);
                sethfMode("ROLL");
                setTimeout(() => {
                    inputRollLeaf.current.focus();
                }, 300);
            } else if (hfReqMachine === "Y") {
                setpnlMachine(true);
                inputMachineNo.current.focus();
            } else {
                setTimeout(() => {
                    inputSideBack.current[0].focus();
                }, 200);
            }
        } else {
            settxtMasterCode("");
            setpnlLog(true);
            setpnlSerial(false);
            setlblLog("Scan master code incorrect / สแกน master code ไม่ถูกต้อง");
            setTimeout(() => {
                inputMasterCode.current.focus();
            }, 300);
        }
        hideLoading();
    };

    const getInputSerial = async () => {
        let dtData = [];
        let intRow = 0;
        let strFrontSide = "";

        if (!Array.isArray(txtgvSerial)) {
            console.error("txtgvSerial is not an array:", txtgvSerial);
            return [];
        }

        for (let intSeq = 0; intSeq < gvSerialData.length; intSeq++) {
            intRow = intRow + 1;

            if (gvSerialData[intSeq].TYPE === "SHT") {
                strFrontSide = txtgvSerial[intSeq];
                console.log("strFrontSide", strFrontSide);
            } else {
                const backSideIndex = txtSideBack[0];
                const backSideText = backSideIndex;

                if (backSideText !== "" && strFrontSide !== "") {
                    if (txtgvSerial[intSeq] == undefined) {
                        txtgvSerial[intSeq] = "";
                    }
                    dtData.push({
                        SHEET: gvSerialData[intSeq].SHEET || "",
                        BACK_SIDE: backSideText,
                        FRONT_SIDE: strFrontSide,
                        SEQ: gvSerialData[intSeq].SEQ || "",
                        SERIAL: txtgvSerial[intSeq],
                        SCAN_RESULT: "",
                        REMARK: "",
                        REMARK_DETAIL: "",
                        UPDATE_FLG: "N",
                        MACHINE: txtMachineNo,
                        MASTER_NO: txtMasterCode,
                        BOARD_NO_F: "",
                        BOARD_NO_B: "",
                    });
                }
            }
        }
        console.log("dtData", dtData);
        return dtData;
    };

    const getProductSerialMaster = async (strPrdName) => {
        let dtProductSerial = [];
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
        sethfCheckRollSht("N");
        sethfCheckRollShtDigit("0");
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
        sethfReqMachine("N");

        sethfConnRollLength("0");
        sethfConnLeafLength("0");
        sethfCheckRollPrdFlg("N");
        sethfCheckRollPrdStart("0");
        sethfCheckRollPrdEnd("0");
        sethfCheckRollPrd("");

        sethfSerialStartCode("");
        sethfShtPlasmaTimeFlg("N");
        sethfShtPlasmaTime("0");
        sethfSheetType("D");
        sethfCheckXrayF("N");
        sethfCheckXrayB("N");
        sethfCheckXrayOneTime("N");
        sethfCheckFinInspect("N");
        sethfCheckFinInspectProc("");
        sethfAutoPressB("N");
        sethfAutoPressF("N");

        await axios
            .post("/api/common/GetSerialProductByProduct", {
                prdName: strPrdName,
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
                    sethfTestResultFlag(dtProductSerial.slm_test_result_flag);
                    sethfSerialCount(dtProductSerial.prm_pcs_tray);
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
                    sethfCheckRollSht(dtProductSerial.prm_conn_roll_sht_flg);
                    sethfCheckRollShtDigit(dtProductSerial.prm_conn_roll_sht_length);
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
                    sethfReqMachine(dtProductSerial.prm_sht_machine_flg);

                    sethfConnRollLength(dtProductSerial.prm_conn_roll_length);
                    sethfConnLeafLength(dtProductSerial.prm_conn_leaf_length);
                    sethfCheckRollPrdFlg(dtProductSerial.prm_conn_roll_prd_flg);
                    sethfCheckRollPrdStart(dtProductSerial.prm_conn_roll_prd_start);
                    sethfCheckRollPrdEnd(dtProductSerial.prm_conn_roll_prd_end);
                    sethfCheckRollPrd(dtProductSerial.prm_conn_roll_prd_fix);
                    sethfSerialStartCode(dtProductSerial.prm_serial_start_code);
                    sethfShtPlasmaTimeFlg(dtProductSerial.prm_sht_plasma_time_flg);
                    sethfShtPlasmaTime(dtProductSerial.prm_sht_plasma_time);
                    sethfSheetType(dtProductSerial.prm_sheet_type);
                    sethfSerialInfo(dtProductSerial.prm_additional_info);
                    sethfCheckXrayF(dtProductSerial.prm_sht_xray_f);
                    sethfCheckXrayB(dtProductSerial.prm_sht_xray_b);
                    sethfCheckXrayOneTime(dtProductSerial.prm_sht_xray_1_time_flg);
                    sethfCheckFinInspect(dtProductSerial.prm_fin_gate_inspect_flg);
                    sethfCheckFinInspectProc(dtProductSerial.prm_fin_gate_inspect_proc);
                    sethfAutoPressF(dtProductSerial.prm_sht_auto_press_f);
                    sethfAutoPressB(dtProductSerial.prm_sht_auto_press_b);
                }
            });
        return dtProductSerial;
    };

    const getCountDataBylot = async (strLot) => {
        let dtSerailCount = [];
        setlblTotalSht("0");
        setlblTotalPcs("0");
        await axios.post("/api/Common/getlotserialcountdata", {
            dataList: {
                strLotNo: strLot,
                strPlantCode: plantCode
            }
        })
            .then((res) => {
                dtSerailCount = res.data[0];
            });
        console.log("dtSerailCount", dtSerailCount);
        if (dtSerailCount.length !== "") {
            setlblTotalSht(dtSerailCount.count_sht.toLocaleString('en-US'));
            setlblTotalPcs(dtSerailCount.count_pcs.toLocaleString('en-US'));
        }
    };

    const getConnectRollSheetData = async (_dtSerial, _strProduct, _strRollLeaf) => {
        let _dtData = [];
        let _intRollRow = 1;
        let _intRow = 0;
        let _strShtNoOld = "";
        let _strRollNo = "";

        _strRollNo = hfRollNo;

        for (let i = 0; i < _dtSerial.length; i++) {
            if (_dtSerial[i].FRONT_SIDE !== _strShtNoOld) {
                _intRow += 1;
                let _drShtRow = {
                    ROLL_SEQ: _intRollRow,
                    SHT_SEQ: _intRow,
                    LOT_NO: txtLotNo,
                    ROLL_NO: _strRollNo,
                    ROLL_LEAF: _strRollLeaf,
                    SHT_NO: _dtSerial[i].FRONT_SIDE,
                    SCAN_RESULT: "",
                    REMARK: "",
                    ROW_UPDATE: "Y",
                    UPDATE_FLG: "N",
                    MACHINE: txtMachineNo,
                    PRODUCT: _strProduct
                }
                _dtData.push(_drShtRow);

                if (_dtSerial[i].FRONT_SIDE !== _dtSerial[i].BACK_SIDE) {
                    _intRow += 1;
                    let _drShtRow2 = {
                        ROLL_SEQ: _intRollRow,
                        SHT_SEQ: _intRow,
                        LOT_NO: txtLotNo,
                        ROLL_NO: _strRollNo,
                        ROLL_LEAF: _strRollLeaf,
                        SHT_NO: _dtSerial[i].BACK_SIDE,
                        SCAN_RESULT: "",
                        REMARK: "",
                        ROW_UPDATE: "Y",
                        UPDATE_FLG: "N",
                        MACHINE: txtMachineNo,
                        PRODUCT: _strProduct
                    }
                    _dtData.push(_drShtRow2);
                }
            }
            _strShtNoOld = _dtSerial[i].FRONT_SIDE;
        }
        console.log("_dtData", _dtData);
        return _dtData;
    };

    const handleKeygvSerial = (e, index) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const nextIndex = index + 1;
            if (nextIndex < gvSerialData.length && inputgvSerial.current[nextIndex]
            ) {
                inputgvSerial.current[nextIndex].focus();
                console.log('Calling btnSaveClick', nextIndex);
            } else if (nextIndex === gvSerialData.length) {
                btnSaveClick();
            }
        }
    };

    const handleKeySideBack = (e, index) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const nextIndex = index + 1;
            if (nextIndex < hfShtScan && inputSideBack.current[nextIndex]) {
                inputSideBack.current[nextIndex].focus();
            } else if (nextIndex === hfShtScan) {
                setTimeout(() => {
                    inputgvSerial.current[0].focus();
                }, 200);
            }
        }
    };

    const columns = [
        {
            title: "Sheet No.",
            dataIndex: "SHEET",
            key: "Sheet No.",
            align: "center",
            width: 80,
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "No.",
            dataIndex: "SEQ",
            key: "No.",
            align: "center",
            width: 60,
            render: (text, record, index) => {
                return index + 1;
            },
        },
        {
            title: "Serial No.",
            dataIndex: "SERIAL",
            key: "Serial No.",
            align: "center",
            width: 440,
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "Scan Result",
            key: "Scan Result",
            dataIndex: "SCAN_RESULT",
            align: "center",
            width: 120,
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
        txtLotNo, settxtLotNo, selProduct, Productdata, txtLotRef, settxtLotRef, txtMasterCode, settxtMasterCode, lblTotalSht, lblTotalPcs,
        txtRollLeaf, settxtRollLeaf, txtMachineNo, settxtMachineNo, pnlRollLeaf, pnlMachine, pnlLog, lblLog, lblResult, lblResultcolor,
        pnlBackSide, txtSideBack, pnlFrontSide, txtSideFront, pnlSerial, gvSerialData, gvScanResult, gvScanData, txtgvSerial, txtLotDisabled,
        selProDisabled, txtRollLeafDisabled, inputLot, ddlProduct, inputRollLeaf, inputMachineNo, inputSideBack, inputgvSerial, inputMasterCode,
        handleChangeLot, ibtBackClick, handleChangeProduct, handleChangeLotRef, handleChangeMasterCode, handleChangeRollLeaf, handleChangeMachine,
        handleChangeSerial, handleChangegvBackSide, handleChangegvFontSide, btnSaveClick, btnCancelClick, handleKeygvSerial, handleKeySideBack,
        columns, gvBackSide
    }
};

export { fn_ScanSMTSerialShtMaster };