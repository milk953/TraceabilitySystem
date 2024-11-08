import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button } from 'antd';
import DeleteIcon from '@mui/icons-material/Delete';
import swal from "sweetalert";

function fn_ScanAOISheetNo() {
    const [txtOperator, settxtOperator] = useState("");
    const [txtTotalPcs, settxtTotalPcs] = useState("");
    const [txtNo, settxtNo] = useState("");
    const [txtLeaf, settxtLeaf] = useState(1);
    const [txtLayer, settxtLayer] = useState("");
    const [txtLotNo, settxtLotNo] = useState("");
    const [lblProduct, setlblProduct] = useState("");
    const [ibtOperator, setibtOperator] = useState({ disabled: false, value: "" });
    const [ibtback, setibtback] = useState({ disabled: false, value: "" });
    const [ibtLayerBack, setibtLayerBack] = useState({ disabled: false, value: "" });
    const [ibtLotBack, setibtLotBack] = useState({ disabled: false, value: "" });

    //Table
    const [pnlSerial, setpnlSerial] = useState(false);
    const [gvSerial, setgvSerial] = useState([]);
    const [lblSEQ, setlblSEQ] = useState("");
    const [txtgvSerial, settxtgvSerial] = useState("");
    const [lblResult, setlblResult] = useState("");
    const [lblResultcolor, setlblResultcolor] = useState("#059212");
    const [gvScanResult, setgvScanResult] = useState({ visible: false, value: [] });

    //hiddenfield
    const hfUserID = localStorage.getItem("ipAddress");
    const hfUserStation = localStorage.getItem("ipAddress");
    const [hfUserFactory, sethfUserFactory] = useState("");
    const [hfAutoScan, sethfAutoScan] = useState("");
    const [hfMode, sethfMode] = useState("");
    const [hfPlantCode, sethfPlantCode] = useState("");
    const [hfProductKind, sethfProductKind] = useState("");
    const [hfSerialCount, sethfSerialCount] = useState(1);
    const [hfSerialLength, sethfSerialLength] = useState(22);
    const [hfRollNo, sethfRollNo] = useState("");

    //Disabled
    const [txtOperatorDisabled, settxtOperatorDisabled] = useState(false);
    const [txtTotalPcsDisabled, settxtTotalPcsDisabled] = useState(false);
    const [txtNoDisabled, settxtNoDisabled] = useState(false);
    const [txtLeafDisabled, settxtLeafDisabled] = useState(false);
    const [txtLayerDisabled, settxtLayerDisabled] = useState(false);
    const [txtLotNoDisabled, settxtLotNoDisabled] = useState(false);
    const [lblProductDisabled, setlblProductDisabled] = useState(false);

    //inputRef
    const inputOperator = useRef([]);
    const inputTotalPcs = useRef([]);
    const inputNo = useRef([]);
    const inputLeaf = useRef([]);
    const inputLayer = useRef([]);
    const inputLot = useRef([]);
    const inputSerial = useRef([]);

    const CONNECT_SERIAL_ERROR = import.meta.env.VITE_CONNECT_SERIAL_ERROR;
    const CONNECT_SERIAL_NOT_FOUND = import.meta.env.VITE_CONNECT_SERIAL_NOT_FOUND;
    const plantCode = import.meta.env.VITE_FAC;

    useEffect(() => {
        PageLoad();
    }, []);

    const PageLoad = async () => {
        sethfMode("");
        SetMode("OP");
    };

    const handleChangeOperator = async () => {
        if (txtOperator.trim() !== "") {
            settxtOperator(txtOperator.toUpperCase().trim());
            SetMode("PCS");
        }
    };

    const ibtOperator_Click = async () => {
        SetMode("OP");
    };

    const handleChangeTotalPcs = async () => {
        if (txtTotalPcs.trim() !== "" && !isNaN(txtTotalPcs)) {
            SetMode("LEAF");
        } else {
            SetMode("PCS");
        }
    };

    const handleChangeNo = async () => {
        if (!isNaN(txtNo)) {
            SetMode("LEAF");
        }
    };

    const ibtBack_Click = async () => {
        settxtTotalPcs("");
        settxtTotalPcsDisabled(false);
        setpnlSerial(false);
        SetMode("PCS");
    };

    const handleChangeLeaf = async () => {
        if (txtLeaf.trim() !== "" && !isNaN(txtLeaf)) {
            sethfSerialCount(txtLeaf);
            SetMode("LAYER");
        } else {
            sethfSerialCount("1");
            SetMode("LEAF");
        }
    };

    const handleChangeLayer = async () => {
        if (txtLayer.trim() !== "") {
            SetMode("LOT");
        } else {
            SetMode("LAYER");
        }
    };

    const ibtLayerBack_Click = async () => {
        SetMode("LEAF");
    };

    const handleChangeLotNo = async () => {
        setlblProduct("");
        sethfRollNo("");
        if (txtLotNo.trim() !== "") {
            let _strLotAll = txtLotNo.toUpperCase().trim().split(";");
            settxtLotNo(_strLotAll[0]);
            if (txtLotNo.length === 9) {
                let dtLotData = [];
                await axios.post("/api/Common/getProductDataByLot", {
                    strLot: txtLotNo,
                })
                    .then((res) => {
                        dtLotData = res.data.flat().flat();
                    });
                if (dtLotData.length > 0) {
                    setlblProduct(dtLotData[0][0]);
                    sethfRollNo(dtLotData[0][1]);
                }

                await axios.post("/api/ScanAOISheetNo/GetAOISheetCountbyLot", {
                    strlotno: txtLotNo,
                    strlayer: txtLayer
                })
                    .then((res) => {
                        settxtNo(res.data);
                    });

                let data = [];
                await axios.post("/api/ScanAOISheetNo/GetAOISheetDataByLot", {
                    strlotno: txtLotNo,
                    strlayer: txtLayer
                })
                    .then((res) => {
                        data = res.data;
                    });
                setgvScanResult(prevState => ({ ...prevState, visible: true, value: data }));
                SetMode("SERIAL");
            } else {
                SetMode("LOT");
            }
        } else {
            SetMode("LOT");
        }
    };

    const ibtLotBack_Click = async () => {
        SetMode("LOT");
    };

    const handleChangeSerial = (index, e) => {
        const newValues = [...txtgvSerial];
        newValues[index] = e.target.value;
        settxtgvSerial(newValues);
    };

    const btnSave_Click = async () => {
        if (hfMode === "SERIAL") {
            await setSerialDataTray();
            settxtgvSerial("");
        }
    };

    const btnCancel_Click = async () => {
        SetMode("SERIAL");
    };

    const SetMode = async (strType) => {
        if (strType === "OP") {
            settxtOperator("");
            settxtOperatorDisabled(false);
            settxtTotalPcs("");
            settxtTotalPcsDisabled(true);
            settxtLeaf("");
            settxtLeafDisabled(true);
            settxtLayer("");
            settxtLayerDisabled(true);
            settxtLotNo("");
            settxtLotNoDisabled(true);
            setibtLotBack(prevState => ({ ...prevState, disabled: true }));
            setibtOperator(prevState => ({ ...prevState, disabled: true }));
            setibtLayerBack(prevState => ({ ...prevState, disabled: true }));
            setibtback(prevState => ({ ...prevState, disabled: true }));
            setpnlSerial(false);
            setgvScanResult(prevState => ({ ...prevState, value: [] }));
            sethfMode("OP");
            setTimeout(() => {
                inputOperator.current.focus();
            }, 300);
        } else if (strType === "PCS") {
            settxtLotNoDisabled(true);
            setibtLotBack(prevState => ({ ...prevState, disabled: false }));
            settxtOperatorDisabled(true);
            setibtOperator(prevState => ({ ...prevState, disabled: false }));
            settxtLeaf("");
            settxtLeafDisabled(true);
            settxtLayer("");
            settxtLayerDisabled(true);
            settxtTotalPcs("");
            settxtTotalPcsDisabled(false);
            setibtLayerBack(prevState => ({ ...prevState, disabled: true }));
            setibtback(prevState => ({ ...prevState, disabled: false }));
            setpnlSerial(false);
            setgvSerial([]);
            setgvScanResult(prevState => ({ ...prevState, value: GetAOISheetDataByLot("", "") }));
            sethfMode("PCS");
            setTimeout(() => {
                inputTotalPcs.current.focus();
            }, 300);
        } else if (strType === "LEAF") {
            settxtOperatorDisabled(true);
            setibtOperator(prevState => ({ ...prevState, disabled: false }));
            settxtTotalPcsDisabled(true);
            settxtLeaf("");
            settxtLeafDisabled(false);
            settxtLayer("");
            settxtLayerDisabled(true);
            setibtback(prevState => ({ ...prevState, disabled: false }));
            settxtLotNo("");
            settxtLotNoDisabled(true);
            setibtLayerBack(prevState => ({ ...prevState, disabled: true }));
            setpnlSerial(false);
            setgvSerial([]);
            setgvScanResult(prevState => ({ ...prevState, value: GetAOISheetDataByLot("", "") }));
            sethfMode("LEAF");
            setTimeout(() => {
                inputLeaf.current.focus();
            }, 300);
        } else if (strType === "LAYER") {
            settxtOperatorDisabled(true);
            setibtOperator(prevState => ({ ...prevState, disabled: false }));
            settxtTotalPcsDisabled(true);
            settxtLeafDisabled(true);
            settxtLayer("");
            settxtLayerDisabled(false);
            setibtback(prevState => ({ ...prevState, disabled: false }));
            settxtLotNo("");
            settxtLotNoDisabled(true);
            setibtLayerBack(prevState => ({ ...prevState, disabled: true }));
            setpnlSerial(false);
            setgvSerial([]);
            setgvScanResult(prevState => ({ ...prevState, value: GetAOISheetDataByLot("", "") }));
            sethfMode("LAYER");
            setTimeout(() => {
                inputLayer.current.focus();
            }, 300);
        } else if (strType === "LOT") {
            settxtOperatorDisabled(true);
            setibtOperator(prevState => ({ ...prevState, disabled: false }));
            settxtTotalPcsDisabled(true);
            setibtback(prevState => ({ ...prevState, disabled: false }));
            settxtLeafDisabled(true);
            settxtLayerDisabled(true);
            settxtLotNo("");
            settxtLotNoDisabled(false);
            setibtLayerBack(prevState => ({ ...prevState, disabled: false }));
            setpnlSerial(false);
            setgvSerial([]);
            setgvScanResult(prevState => ({ ...prevState, value: GetAOISheetDataByLot("", txtLayer) }));
            sethfMode("LOT");
            setTimeout(() => {
                inputLot.current.focus();
            }, 300);
        } else if (strType === "SERIAL") {
            settxtTotalPcsDisabled(true);
            setpnlSerial(true);
            setibtLayerBack(prevState => ({ ...prevState, disabled: false }));
            sethfMode("SERIAL");
            await getInitialSerial();
        }
    };

    const getInitialSerial = async () => {
        let dtData = [];
        if (parseInt(txtTotalPcs) > parseInt(txtNo)) {
            setlblSEQ((txtNo));
            for (let intRow = 0; intRow <= hfSerialCount; intRow++) {
                let drRow = {
                    SEQ: parseInt(txtNo) + intRow
                }
                dtData.push(drRow);
            }
            setgvSerial(dtData);
            if (gvSerial.length > 0) {
                setTimeout(() => {
                    inputSerial.current.focus();
                }, 300);
            }
        } else {
            setpnlSerial(false);
        }
    };

    const GetAOISheetDataByLot = async (LotNo, Layer) => {
        let data = [];
        await axios.post("/api/ScanAOISheetNo/GetAOISheetDataByLot", {
            strlotno: LotNo,
            strlayer: Layer
        })
            .then((res) => {
                data = res.data;
            });
        return data;
    };

    const setSerialDataTray = async () => {
        let dtSerial = getInputSerial();

        let _bolTrayError = false;
        let _bolError = false;
        let _strScanResultAll = "OK";
        let _intRowSerial = 0;

        if (!_bolTrayError) {
            for (let i = 0; i < dtSerial.length; i++) {
                if (dtSerial[i].SERIAL !== "") {
                    let _intCount = 0;
                    let _strRemark = "";
                    let _strError = "";
                    let _strSerial = dtSerial[i].SERIAL;
                    let _strTestResultOrg = "";
                    let _strOK = "OK";
                    let _strNG = "NG";

                    _bolError = false;

                    if (!_bolError) {
                        if (hfRollNo === "" || hfRollNo !== _strSerial.substring(0, hfRollNo.length)) {
                            _strScanResultAll = "NG";
                            dtSerial[i].SCAN_RESULT = "NG";
                            dtSerial[i].REMARK = "Sheet mix roll no. / หมายเลขบาร์โค้ดปนม้วนกัน";
                            dtSerial[i].ROW_UPDATE = "N";

                            _bolError = true;
                            _bolTrayError = true;
                        }
                    }

                    if (!_bolError) {
                        for (let _intRow = _intRowSerial + 1; _intRow < dtSerial.length; _intRow++) {
                            if (_strSerial === dtSerial[_intRow].SERIAL) {
                                _strScanResultAll = "NG";
                                dtSerial[i].SCAN_RESULT = "NG";
                                dtSerial[i].REMARK = "Sheet duplicate / หมายเลขบาร์โค้ดซ้ำกัน";
                                dtSerial[i].ROW_UPDATE = "N";

                                _bolError = true;
                                _bolTrayError = true;
                            }
                        }

                        for (let gvRow = 0; gvRow < gvScanResult.length; gvRow++) {
                            if (_strSerial === gvScanResult[gvRow].SHEET_NO) {
                                _strScanResultAll = "NG";
                                dtSerial[i].SCAN_RESULT = "NG";
                                dtSerial[i].REMARK = "Sheet duplicate / หมายเลขบาร์โค้ดซ้ำกัน";
                                dtSerial[i].ROW_UPDATE = "N";

                                _bolError = true;
                                _bolTrayError = true;
                            }
                        }
                    }

                    if (!_bolError) {
                        if (_strSerial.length !== parseInt(hfSerialLength)) {
                            _strScanResultAll = "NG";
                            dtSerial[i].SCAN_RESULT = "NG";
                            dtSerial[i].REMARK = "Sheet no. invalid / หมายเลขบาร์โค้ดไม่ถูกต้อง";
                            dtSerial[i].ROW_UPDATE = "N";

                            _bolError = true;
                            _bolTrayError = true;
                        }
                    }

                    if (!_bolError) {
                        let data = [];
                        await axios.post("/api/ScanAOISheetNo/GetAOISheetCount", {
                            strsheetno: _strSerial
                        })
                            .then((res) => {
                                data = res.data;
                            });
                        if (data.length > 0) {
                            _strScanResultAll = "NG";
                            dtSerial[i].SCAN_RESULT = "NG";
                            dtSerial[i].REMARK = "Sheet duplicate / หมายเลขบาร์โค้ดซ้ำกัน";
                            dtSerial[i].ROW_UPDATE = "N";

                            _bolError = true;
                            _bolTrayError = true;
                        }
                    }

                    if (!_bolError) {
                        dtSerial[i].SCAN_RESULT = "OK";
                        dtSerial[i].ROW_UPDATE = "Y";
                    }
                } else {
                    _strScanResultAll = "NG";
                    dtSerial[i].SCAN_RESULT = "NG";
                    dtSerial[i].REMARK = "Barcode can not scan / สแกนบาร์โค้ดไม่ได้";
                    dtSerial[i].ROW_UPDATE = "N";
                    _bolTrayError = true;
                }
                _intRowSerial = _intRowSerial + 1;
            }

            setlblResult(_strScanResultAll);

            if (_strScanResultAll === "NG") {
                setlblResultcolor("#BA0900");
            } else {
                let _strErrorUpdate = "";
                await axios.post("/api/ScanAOISheetNo/SetAOISheetNo", {
                    strlot: dtSerial[i].LOT,
                    strlayer: dtSerial[i].LAYER,
                    seq: dtSerial[i].SEQ,
                    leafno: dtSerial[i].LEAF,
                    strserial: dtSerial[i].SERIAL,
                    strstation: hfUserStation
                })
                    .then((res) => {
                        _strErrorUpdate = res.data.p_error;
                    });
                if (_strErrorUpdate !== "") {
                    setlblResult("Error :" + _strErrorUpdate);
                    setlblResultcolor("#BA0900");
                } else {
                    setlblResultcolor("#059212");
                }
            }
        }

        await GetAOISheetDataByLot(txtLotNo, txtLayer);

        await axios.post("/api/ScanAOISheetNo/GetAOISheetCountbyLot", {
            strlotno: txtLotNo,
            strlayer: txtLayer
        })
            .then((res) => {
                settxtNo(res.data);
            });

        SetMode("SERIAL");
    };

    const getInputSerial = async () => {
        let dtData = [];
        let intRow = 0;

        for (let intSeq = 0; intSeq < gvSerial.length; intSeq++) {
            dtData.push({
                SEQ: lblSEQ,
                LEAF: intSeq + 1,
                SERIAL: txtgvSerial[intSeq] || "",
                LOT: txtLotNo,
                LAYER: txtLayer,
                SCAN_RESULT: "",
                REMARK: "",
                ROW_UPDATE: "N"
            });
        }
        return dtData;
    };

    const handleKeygvSerial = (e, index) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const nextIndex = index + 1;
            if (nextIndex < hfSerialCount && inputSerial.current[nextIndex]
            ) {
                inputSerial.current[nextIndex].focus();
                console.log('Calling btnSaveClick', nextIndex);
            } else if (nextIndex === nextIndex) {
                btnSave_Click();
                e.target.blur();
            }
        }
    };

    const btnDeleteClick = async (rowno) => {
        console.log(rowno, "////////////")
        let data = [];
        if (!isNaN(rowno)) {
            const selectedItem = gvScanResult.value.find(item => item.row_no === rowno);
            const strSheetNo = selectedItem.sheet_no;
            await axios.post("/api/ScanAOISheetNo/DeleteAOISheetNo", {
                strlotno: txtLotNo,
                strsheetno: strSheetNo,
            })
                .then((res) => {
                    data = res.data.p_error;
                    console.log("ลบข้อมูลสำเร็จ =", data);
                    swal("success", "You delete data success", "success");
                })
                .catch((error) => {
                    console.error("เกิดข้อผิดพลาด =", error);
                    swal("Error", error.data.message, "error");
                });
            await axios.post("/api/ScanAOISheetNo/GetAOISheetDataByLot", {
                strlotno: txtLotNo,
                strlayer: txtLayer
            })
                .then((res) => {
                    data = res.data;
                });
            setgvScanResult(prevState => ({ ...prevState, visible: true, value: data }));
            await axios.post("/api/ScanAOISheetNo/GetAOISheetCountbyLot", {
                strlotno: txtLotNo,
                strlayer: txtLayer
            })
                .then((res) => {
                    settxtNo(res.data);
                });
            SetMode("SERIAL");
        }
    };

    const columns = [
        {
            title: "No.",
            dataIndex: "seq",
            key: "No.",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "Leaf",
            dataIndex: "leaf",
            key: "Leaf",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "Sheet No.",
            dataIndex: "sheet_no",
            key: "Sheet No.",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "Delete",
            dataIndex: "row_no",
            key: "Delete",
            align: "center",
            render: (text, record, index) => {
                return (
                    <Button
                        type="primary"
                        style={{ backgroundColor: '#BA0900', color: '#fff' }}
                        onClick={() => btnDeleteClick(record.row_no)}
                    >
                        Delete
                    </Button>
                );
            },
        },
    ];

    return {
        txtOperator, settxtOperator, txtTotalPcs, settxtTotalPcs, txtNo, settxtNo, txtLeaf, settxtLeaf, txtLayer, settxtLayer,
        txtLotNo, settxtLotNo, lblProduct, ibtOperator, ibtback, ibtLayerBack, ibtLotBack, pnlSerial, gvSerial, lblSEQ, txtgvSerial,
        lblResult, lblResultcolor, gvScanResult, txtOperatorDisabled, txtTotalPcsDisabled, txtLeafDisabled, txtLayerDisabled, txtLotNoDisabled,
        inputOperator, inputTotalPcs, inputLeaf, inputLayer, inputLot, inputSerial, handleChangeOperator, ibtOperator_Click, handleChangeTotalPcs,
        handleChangeNo, ibtBack_Click, handleChangeLeaf, handleChangeLayer, ibtLayerBack_Click, handleChangeLotNo, ibtLotBack_Click, handleChangeSerial,
        btnSave_Click, btnCancel_Click, columns, handleKeygvSerial
    }
};

export { fn_ScanAOISheetNo };