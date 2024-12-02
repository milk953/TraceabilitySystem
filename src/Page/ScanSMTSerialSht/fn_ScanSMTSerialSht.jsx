import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Tag } from "antd";
import Swal from 'sweetalert2';

function fn_ScanSMTSerialSht() {
  const [txtLotNo, settxtLotNo] = useState("");
  const [selProduct, setselProduct] = useState(null);
  const [Productdata, setProductdata] = useState([]);
  const [txtLotRef, settxtLotRef] = useState("");
  const [lblTotalSht, setlblTotalSht] = useState("");
  const [lblTotalPcs, setlblTotalPcs] = useState("");
  const [txtRollLeaf, settxtRollLeaf] = useState("");
  const [lblCheckRoll, setlblCheckRoll] = useState("");
  const [lblCheckRollcolor, setlblCheckRollcolor] = useState("#ff4d4f");
  const [txtMachineNo, settxtMachineNo] = useState("");
  const [pnlRollLeaf, setpnlRollLeaf] = useState(false);
  const [pnlMachine, setpnlMachine] = useState(false);
  const [pnlLog, setpnlLog] = useState(false);
  const [lblLog, setlblLog] = useState("");
  const [lblResult, setlblResult] = useState("");
  const [lblResultcolor, setlblResultcolor] = useState("#059212");
  const [pnlBoard, setpnlBoard] = useState(false);
  const [txtBoardNoB, settxtBoardNoB] = useState("");
  const [txtBoardNoF, settxtBoardNoF] = useState("");

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
  const [hfPlasmaConnShtPcs, sethfPlasmaConnShtPcs] = useState("");
  const [hfFPCDatabase, sethfFPCDatabase] = useState("");
  const [hfSerialInfo, sethfSerialInfo] = useState("");
  const [hfCheckXrayF, sethfCheckXrayF] = useState("");
  const [hfCheckXrayB, sethfCheckXrayB] = useState("");
  const [hfCheckXrayOneTime, sethfCheckXrayOneTime] = useState("");
  const [hfCheckFinInspect, sethfCheckFinInspect] = useState("");
  const [hfCheckFinInspectProc, sethfCheckFinInspectProc] = useState("");
  const [hfReqBoardNo, sethfReqBoardNo] = useState("");
  const [hfAutoPressF, sethfAutoPressF] = useState("");
  const [hfAutoPressB, sethfAutoPressB] = useState("");
  const [hfConnShtStatusFlg, sethfConnShtStatusFlg] = useState("");
  const [hfConnShtStatusSplit, sethfConnShtStatusSplit] = useState("_");
  const [hfConnShtStatusSerialColumn, sethfConnShtStatusSerialColumn] = useState(0);
  const [hfConnShtStatusStatusColumn, sethfConnShtStatusStatusColumn] = useState(1);

  //inputRef
  const inputLot = useRef([]);
  const ddlProduct = useRef(null);
  const inputRollLeaf = useRef([]);
  const inputMachineNo = useRef(null);
  const inputSideBack = useRef([]);
  const inputgvSerial = useRef([]);

  const AUTO_SCAN_CHECK_FLG = import.meta.env.VITE_AUTO_SCAN_CHECK_FLG;
  const CONNECT_SERIAL_ERROR = import.meta.env.VITE_CONNECT_SERIAL_ERROR;
  const CONNECT_SERIAL_NOT_FOUND = import.meta.env.VITE_CONNECT_SERIAL_NOT_FOUND;
  const ROLL_SHT_ROLL_START_DIGIT = 1;
  const ROLL_SHT_ROLL_LENGTH = 12;
  const plantCode = import.meta.env.VITE_FAC;

  useEffect(() => {
    PageLoad();
  }, []);

  useEffect(() => {
    if (hfSerialCount != "" && !pnlLog && gvSerialData !== "") {
      getInitialSerial();
    }
  }, [hfSerialCount, pnlLog]);

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
      console.log("strPrdName", strPrdName);

      if (strPrdName !== "") {
        setlblLog("");
        setpnlLog(false);
        settxtLotNo(strLot);
        settxtLotRef(strLot);
        await getCountDataBylot(strLot);
        let dt = "";
        try {
          setselProduct(strPrdName);
          await axios.post("/api/Common/getconnectshtmastercheckresult", {
            strProduct: strPrdName,
          })
            .then((res) => {
              dt = res.data.prd_name;
            });
          console.log("dt", dt);
          if (dt === "OK") {
            const datagetPd = await getProductSerialMaster(strPrdName);
            await getInitialSheet(datagetPd.slm_sht_scan);
            if (datagetPd.prm_conn_roll_sht_flg === "Y") {
              setpnlRollLeaf(true);
              settxtRollLeaf("");
              setTimeout(() => {
                inputRollLeaf.current.focus();
              }, 200);
            } else {
              SetMode("SERIAL");
              settxtMachineNo("");
              if (datagetPd.prm_sht_machine_flg === "Y") {
                setpnlMachine(true);
                inputMachineNo.current?.focus();
              } else {
                setpnlMachine(false);
                setTimeout(() => {
                  inputSideBack.current[0].focus();
                }, 200);
              }
            }
          } else {
            setselProduct(Productdata[0].prd_name);
            settxtLotNo("");
            setgvSerialData([]);
            setlblLog(`${strPrdName} not test master!  /  ${strPrdName} ยังไม่ทดสอบมาสเตอร์`);
            setpnlLog(true);
            sethfMode("LOT");
            inputLot.current.focus();
          }

        } catch (error) {
          const intProduct = strPrdName.indexOf('-', 12);
          if (intProduct > -1) {
            strPrdName = strPrdName.substring(0, intProduct) + strPrdName.substring(intProduct + 1, intProduct + 11).trim();
            try {
              setselProduct(strPrdName);
              const datagetPd = await getProductSerialMaster(strPrdName);
              await getInitialSheet(datagetPd.slm_sht_scan);
              if (datagetPd.prm_conn_roll_sht_flg === "Y") {
                setpnlRollLeaf(true);
                settxtRollLeaf("");
                inputRollLeaf.current?.focus();
              } else {
                SetMode("SERIAL");
                settxtMachineNo("");
                if (datagetPd.prm_sht_machine_flg === "Y") {
                  setpnlMachine(true);
                  inputMachineNo.current?.focus();
                } else {
                  setpnlMachine(false);
                  inputSideBack.current[0]?.focus();
                }
              }
            } catch (error) {
              setlblLog(`Product ${strPrdName} not found.`);
              setpnlLog(true);
              ddlProduct.current.focus();
            }
          } else {
            setlblLog(`Product ${strPrdName} not found.`);
            setpnlLog(true);
            ddlProduct.current.focus();
          }
        }
      } else {
        setselProduct(Productdata[0].prd_name);
        settxtLotNo("");
        setgvSerialData([]);
        setlblLog("Invalid lot no.");
        setpnlLog(true);
        sethfMode("LOT");
        inputLot.current.focus();
      }
    } else {
      setselProduct(Productdata[0].prd_name);
      settxtLotNo("");
      setgvSerialData([]);
      setlblLog(`Please scan QR Code! / กรุณาสแกนที่คิวอาร์โค้ด`);
      setpnlLog(true);
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
    setTimeout(() => {
      inputLot.current.focus();
    }, 200);
    settxtLotRef("");
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
      let dt = "";

      await axios.post("/api/Common/getconnectshtmastercheckresult", {
        strProduct: selProduct,
      })
        .then((res) => {
          dt = res.data.prd_name;
        });
      if (dt === "OK") {
        await getCountDataBylot(txtLotNo);
        await getInitialSheet(value);
        if (hfCheckRollSht === "Y") {
          setpnlRollLeaf(true);
          settxtRollLeaf("");
          inputRollLeaf.current.focus();
        } else {
          SetMode("SERIAL");
          settxtMachineNo("");
          if (hfReqMachine === "Y") {
            setpnlMachine(true);
            inputMachineNo.current.focus();
          } else {
            inputSideBack.current[0]?.focus();
          }
        }
      } else {
        setselProduct(Productdata[0].prd_name);
        settxtLotNo("");
        setgvSerialData([]);
        setlblLog(`${selProduct} not test master! /${selProduct} ยังไม่ทดสอบมาสเตอร์`);
        setpnlLog(true);
        sethfMode("LOT");
        inputLot.current.focus();
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
      if (hfCheckRollSht === "Y") {
        setpnlRollLeaf(true);
        settxtRollLeaf("");
        inputRollLeaf.current.focus();
      } else {
        SetMode("SERIAL");
        settxtMachineNo("");
        if (hfReqMachine === "Y") {
          setpnlMachine(true);
          inputMachineNo.current.focus();
        } else {
          inputSideBack.current[0]?.focus();
        }
      }
    }
  };

  const handleChangeRollLeaf = async () => {
    setpnlLog(false);
    setlblLog("");
    console.log(hfConnRollLength, "hfConnRollLength")
    if (txtRollLeaf !== "" && txtRollLeaf.length === parseInt(hfConnRollLength)) {
      let strRollProduct = hfRollNo + hfCheckRollPrd;
      if (hfCheckRollPrdFlg === "Y") {
        if (strRollProduct !==
          txtRollLeaf.substring(
            parseInt(hfCheckRollPrdStart) - 1,
            parseInt(hfCheckRollPrdEnd)
          )
        ) {
          setpnlLog(true);
          setlblLog("Roll/Leaf No. mix product");
          setpnlSerial(false);
          sethfMode("ROLL");
          await getInitialSheet();
          settxtRollLeaf("");
          inputRollLeaf.current.focus();
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
      inputRollLeaf.current.focus();
    }
  };

  const handleChangeMachine = (event) => {
    const txtMachineNo = event.target.value;
    settxtMachineNo(txtMachineNo);
  };

  const handleChangeSerial = (index, e) => {
    const newValues = [...txtgvSerial];
    newValues[index] = e.target.value;
    settxtgvSerial(newValues);
  };

  const handleChangegvBackSide = (index, e) => {
    const newValues = [...txtSideBack];
    newValues[index] = e.target.value;
    settxtSideBack(newValues);
  };

  const handleChangegvFontSide = (index, e) => {
    const newValues = [...txtSideFront];
    newValues[index] = e.target.value;
    settxtSideFront(newValues);
  };

  const handleChangeBoardNoB = (event) => {
    const txtBoardNoB = event.target.value;
    settxtBoardNoB(txtBoardNoB);
  };

  const handleChangeBoardNoF = (event) => {
    const txtBoardNoF = event.target.value;
    settxtBoardNoF(txtBoardNoF);
  };

  const btnSaveClick = async () => {
    if (hfMode === "SERIAL") {
      await setSerialData();
      settxtgvSerial("");
      settxtSideBack("");
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
      setpnlBoard(false);
      sethfMode("LOT");
      inputLot.current.focus();
    } else if (strType === "LOT_ERROR") {
      settxtLotNo("");
      settxtLotDisabled(false);
      setpnlLog(true);
      setpnlSerial(false);
      sethfMode("LOT");
      inputLot.current.focus();
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

    if (hfReqBoardNo === "Y") {
      setpnlBoard(true);
    } else {
      setpnlBoard(false);
    }

    console.log("hfShtScan", hfShtScan)
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

  const setSerialData = async () => {
    const dtSerial = await getInputSerial();
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
      for (let i = 0; i < dtSerial.length; i++) {
        _strShtNoBack = dtSerial[i].BACK_SIDE;
        _strShtNoFront = dtSerial[i].FRONT_SIDE;

        if (_strShtNoFront === undefined) {
          setpnlLog(true);
          setlblLog("Please input Sheet Side");
          setTimeout(() => {
            inputgvSerial.current[0].focus();
          }, 200);
        }

        if (hfSheetType === "D" && _strShtNoBack === _strShtNoFront) {
          _strScanResultAll = "NG";
          _strErrorAll = "Double Product sheet F,B not same";
          _bolError = true;
        }

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
          if (_strLotRef !== _strShtNoFront.substring(
            parseInt(hfCheckLotShtStart) - 1,
            parseInt(hfCheckLotShtEnd)
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
          let _inCountSeq = 0;
          let _strSerialNoDup = "";
          await axios.post("/api/Common/getSheetDuplicateConnectSht", {
            strPlantCode: plantCode,
            strSheetType: hfSheetType,
            strSheetNoF: _strShtNoFront,
            strSheetNoB: _strShtNoBack,
          })
            .then((res) => {
              _inCountSeq = res.data.int_count;
            });
          if (_inCountSeq > 0) {
            _strScanResultAll = "NG";
            _strErrorAll = "Sheet no. duplicate";
            _bolError = true;
          }

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

        if (hfReqBoardNo === "Y" && dtSerial[i].BOARD_NO_F.length === 0) {
          _strScanResultAll = "NG";
          _strErrorAll = "Please input board no.";
          _bolError = true;
        }

        if (dtSerial[i].SERIAL !== "") {
          let _strSerial = dtSerial[i].SERIAL;
          let _strTestResult = "NONE";
          let _strMessageUpdate = "";
          let _strScanResultUpdate = "";

          if (!CONNECT_SERIAL_ERROR.includes(_strSerial)) {

            for (let _intRow = _intRowSerial + 1; _intRow < dtSerial.length; _intRow++) {
              console.log("////", dtSerial[_intRow].SERIAL)
              if (_strSerial === dtSerial[_intRow].SERIAL) {
                _strScanResultUpdate = "NG";
                _strMessageUpdate = "Serial duplicate / หมายเลขบาร์โค้ดซ้ำ";
                _strScanResultAll = "NG";
                _bolError = true;
              }
            }

            let isDuplicate = dtSerial.some((item, index) => index !== i && _strSerial.toUpperCase() === item.SERIAL.toString().trim().toUpperCase());
            console.log(isDuplicate)
            if (isDuplicate) {
              _strScanResultUpdate = "NG";
              _strMessageUpdate = "Serial duplicate / หมายเลขบาร์โค้ดซ้ำ";
              _strScanResultAll = "NG";
              _bolError = true;
            }

            if (_strSerial.length === parseInt(hfSerialLength)) {
              let _strFixDigit = "";
              const start = parseInt(hfSerialStartDigit);
              const end = parseInt(hfSerialEndDigit);
              _strFixDigit = _strSerial.substring(start - 1, end);

              console.log(_strFixDigit, hfSerialDigit);
              if (_strFixDigit !== hfSerialDigit) {
                _strScanResultUpdate = "NG";
                _strMessageUpdate = "Serial barcode mix product / หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
                _strScanResultAll = "NG";
                _bolError = true;
              } else if (hfConfigCheck === "Y") {
                let _strConfigDigit = "";
                const start = parseInt(hfConfigStart);
                const end = parseInt(hfConfigEnd);
                _strConfigDigit = _strSerial.substring(start - 1, end);
                if (_strConfigDigit !== hfConfigCode) {
                  _strScanResultUpdate = "NG";
                  _strMessageUpdate = "Serial barcode mix product / หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
                  _strScanResultAll = "NG";
                  _bolError = true;
                }
              }

              if (hfSerialStartCode !== "" && _bolError === false) {
                if (_strSerial.substring(0, hfSerialStartCode.length) !== hfSerialStartCode) {
                  _strScanResultUpdate = "NG";
                  _strMessageUpdate = "Serial barcode mix product / หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
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
                  _strMessageUpdate = "Serial barcode mix product / หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
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
                  _strMessageUpdate = "Serial barcode mix week code / หมายเลขบาร์โค้ดปนรหัสสัปดาห์กัน";
                  _strScanResultAll = "NG";
                  _bolError = true;
                }
              }
            } else {
              _strScanResultUpdate = "NG";
              _strMessageUpdate = "Serial not matching product / หมายเลขบาร์โค้ดไม่ตรงตามที่กำหนดไว้";
              _strScanResultAll = "NG";
              _bolError = true;
            }

            if (_strScanResultUpdate !== "NG") {
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
                    _strScanResultUpdate = "NG";
                    _strMessageUpdate = "Serial duplicate / หมายเลขบาร์โค้ดซ้ำ";
                    _strScanResultAll = "NG";
                    _bolError = true;
                  }
                });
            }
          } else {
            _strMessageUpdate = "Bad mark piece / ชิ้นงานเสียทำเครื่องหมายไว้แล้ว";
            _strScanResultUpdate = "NG";
          }

          dtSerial[i].SCAN_RESULT = _strScanResultUpdate;
          dtSerial[i].REMARK = _strMessageUpdate;
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
                dtSerial[i].REMARK = " No sheet ELT result / ไม่พบผลการทดสอบ ELT";
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
              _strMessageUpdate = "Bad mark piece / ชิ้นงานเสียทำเครื่องหมายไว้แล้ว";
              _strScanResultUpdate = "OK";
              console.log("มาหรือเปล่า")
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
              _strMessageUpdate = _Message;
            }
            if (_strError != "") {
              _strMessageUpdate = _strError;
              _strScanResultUpdate = "NG";
              _bolError = true;
            }

            dtSerial[i].SCAN_RESULT = _strScanResultUpdate;
            dtSerial[i].REMARK = _strMessageUpdate;

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
              let dtRowLeaf = await getConnectRollSheetData(dtSerial);
              let _intCount = 0;
              let _strRollLeaf = txtRollLeaf.toUpperCase().trim();
              await axios.post("/api/ScanFin/GetRollLeafDuplicate", {
                strRollLeaf: _strRollLeaf,
                _dtRollLeaf: dtRowLeaf,
              })
                .then((res) => {
                  _intCount = res.data.intCount;
                });

              console.log(_intCount, "_intCount")
              if (_intCount === 1) {
                console.log(_intCount, "_intCount")
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
                      "Roll/Sheet not matching product / หมายเลขบาร์โค้ดไม่ตรงกับผลิตภัณฑ์";
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
                    strPlantCode: plantCode
                  })
                    .then((res) => {
                      _strUpdateError = res.data.p_error;
                      console.log(_strUpdateError, "SetRollLeafTrayTable")
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

        if (!_bolError && _strUpdateError === "") {
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
            })
              .then((res) => {
                _strUpdateError = res.data.p_error;
                console.log(_strUpdateError, "SetSerialLotShtTable")
              });

            if (_strUpdateError !== "") {
              _strScanResultAll = "NG";
            }
            else if (hfPlasmaConnShtPcs === "Y") {
              await axios.post("/api/Common/setSerialRecordTimeTrayTable", {
                dataList:
                {
                  strUserID: hfUserStation,
                  strProgram: "frm_ScanSMTSerialSht",
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
              })
                .then((res) => {
                  _strUpdateError = res.data.p_error;
                  console.log(_strUpdateError, "setSerialRecordTimeTrayTable")
                });
              if (_strUpdateError !== "") {
                _strScanResultAll = "NG";
              }
            }
          }
        } else {
          _strScanResultAll = "NG";
        }
      }

      setlblResult(_strScanResultAll);
      if (_strScanResultAll === "NG") {
        setlblResultcolor("#BA0900");
      } else {
        setlblResultcolor("#059212");
      }
      if (_strErrorAll !== "") {
        setlblResult(_strErrorAll);
      }

      setgvScanData(dtSerial);
      setgvScanResult(true);
      await getInitialSheet();
      await getInitialSerial();

    } else {
      setlblLog("Please input Sheet Side No. !!! ");
      SetMode("SERIAL_ERROR");
    }

    await getCountDataBylot(txtLotNo);
    settxtRollLeaf("");
    settxtMachineNo("");
    settxtBoardNoB("");
    settxtBoardNoF("");
    if (hfCheckRollSht === "Y") {
      setpnlRollLeaf(true);
      settxtRollLeafDisabled(false);
      sethfMode("ROLL");
      inputRollLeaf.current.focus();
    } else if (hfReqMachine === "Y") {
      setpnlMachine(true);
      inputMachineNo.current.focus();
    } else {
      inputSideBack.current[0].focus();
    }
  };

  const getInputSerial = async () => {
    let dtData = [];
    let intRow = 0;
    let strFrontSide = "";
    const strLotData = txtLotNo.toUpperCase().split(";");
    let _strSerialData = "";
    let _strLot = "";
    _strLot = strLotData[0];

    for (let intSeq = 0; intSeq < gvSerialData.length; intSeq++) {
      intRow = intRow + 1;

      if (gvSerialData[intSeq].TYPE === "SHT") {
        strFrontSide = txtgvSerial[intSeq];
        console.log(txtgvSerial[intSeq], "////////////")
      } else {
        const backSideIndex = txtSideBack[0];
        const backSideText = backSideIndex;

        console.log(backSideText, "bbbbbb")
        console.log(strFrontSide, "sssss")
        if (backSideText !== "" && strFrontSide !== "") {
          if (txtgvSerial[intSeq] == undefined) {
            txtgvSerial[intSeq] = "";
          }

          const drRow = {
            SHEET: gvSerialData[intSeq].SHEET || "",
            BACK_SIDE: backSideText,
            FRONT_SIDE: strFrontSide,
            SEQ: gvSerialData[intSeq].SEQ || "",
            SERIAL: txtgvSerial[intSeq],
            SCAN_RESULT: "",
            REMARK: "",
            UPDATE_FLG: "N",
            MACHINE: txtMachineNo,
            MASTER_NO: "",
            LOT: _strLot,
            PRODUCT: selProduct,
            DATA_TYPE: "PCS",
            ROW_UPDATE: "Y",
            BOARD_NO_F: hfReqBoardNo === "Y" ? txtBoardNoF : "",
            BOARD_NO_B: hfReqBoardNo === "Y" ? txtBoardNoB : "",
          };

          if (hfConnShtStatusFlg === "Y") {
            _strSerialData = txtgvSerial[intSeq].split(hfConnShtStatusSplit);
            drRow.SERIAL = _strSerialData[parseInt(hfConnShtStatusSerialColumn)];
            if (_strSerialData.length >= parseInt(hfConnShtStatusStatusColumn)) {
              drRow.SERIAL_STATUS = _strSerialData[parseInt(hfConnShtStatusStatusColumn)];
            } else {
              drRow.SERIAL_STATUS = "";
            }
          } else {
            drRow.SERIAL_STATUS = "";
          }

          if (hfReqBoardNo === "Y") {
            updatedt = {
              ...drRow,
              BOARD_NO_F: txtBoardNoF,
              BOARD_NO_B: txtBoardNoB,
            };
            dtData.push(updatedt);
          } else {
            dtData.push(drRow);
          }
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
    sethfPlasmaConnShtPcs("N");
    sethfCheckXrayF("N");
    sethfCheckXrayB("N");
    sethfCheckXrayOneTime("N");
    sethfCheckFinInspect("N");
    sethfCheckFinInspectProc("");
    sethfReqBoardNo("N");
    sethfAutoPressB("N");
    sethfAutoPressF("N");
    sethfConnShtStatusFlg("N");

    await axios
      .post("/api/common/GetSerialProductByProduct", {
        prdName: strPrdName,
      })
      .then((res) => {
        dtProductSerial = res.data[0];
        console.log(res.data[0], "////////")
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
          sethfPlasmaConnShtPcs(dtProductSerial.prm_conn_shtpcs_plasma_flg);

          sethfSerialInfo(dtProductSerial.prm_additional_info);
          sethfCheckXrayF(dtProductSerial.prm_sht_xray_f);
          sethfCheckXrayB(dtProductSerial.prm_sht_xray_b);
          sethfCheckXrayOneTime(dtProductSerial.prm_sht_xray_1_time_flg);
          sethfCheckFinInspect(dtProductSerial.prm_fin_gate_inspect_flg);
          sethfCheckFinInspectProc(dtProductSerial.prm_fin_gate_inspect_proc);
          sethfReqBoardNo(dtProductSerial.prm_conn_sht_board_flg);

          sethfAutoPressF(dtProductSerial.prm_sht_auto_press_f);
          sethfAutoPressB(dtProductSerial.prm_sht_auto_press_b);
          sethfConnShtStatusFlg(dtProductSerial.prm_sht_serial_status_flg);

          if (dtProductSerial.prm_conn_roll_prd_flg === "Y") {
            setlblCheckRoll("ON");
            setlblCheckRollcolor("green");
          } else {
            setlblCheckRoll("OFF");
            setlblCheckRollcolor("#ff4d4f");
          }
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

  const getConnectRollSheetData = async (dtSerial) => {
    let _dtData = [];
    let _intRollRow = 1;
    let _intRow = 0;
    let _strShtNoOld = "";
    let _strRollNo = "";

    _strRollNo = hfRollNo;

    for (let i = 0; i < dtSerial.length; i++) {
      if (dtSerial[i].FRONT_SIDE !== _strShtNoOld) {
        _intRow++;
        let _drShtRow = {
          ROLL_SEQ: _intRollRow,
          SHT_SEQ: _intRow,
          LOT_NO: txtLotNo,
          ROLL_NO: _strRollNo,
          ROLL_LEAF: txtRollLeaf,
          SHT_NO: dtSerial[i].FRONT_SIDE,
          SCAN_RESULT: "",
          REMARK: "",
          ROW_UPDATE: "Y",
          UPDATE_FLG: "N",
          MACHINE: txtMachineNo,
          PRODUCT: selProduct,
          DATA_TYPE: "SHT"
        }
        _dtData.push(_drShtRow);

        if (dtSerial[i].FRONT_SIDE !== dtSerial[i].BACK_SIDE) {
          _intRow++;
          let _drShtRow2 = {
            ROLL_SEQ: _intRollRow,
            SHT_SEQ: _intRow,
            LOT_NO: txtLotNo,
            ROLL_NO: _strRollNo,
            ROLL_LEAF: txtRollLeaf,
            SHT_NO: dtSerial[i].BACK_SIDE,
            SCAN_RESULT: "",
            REMARK: "",
            ROW_UPDATE: "Y",
            UPDATE_FLG: "N",
            MACHINE: txtMachineNo,
            PRODUCT: selProduct,
            DATA_TYPE: "SHT"
          }
          _dtData.push(_drShtRow2);
        }
      }
      _strShtNoOld = dtSerial[i].FRONT_SIDE;
    }
    console.log("_dtData", _dtData);
    return _dtData;
  };

  const handleKeygvSerial = (e, index) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const nextIndex = index + 1;
      if (nextIndex < gvSerialData.length && inputgvSerial.current[nextIndex]) {
        inputgvSerial.current[nextIndex].focus();
        console.log('Calling btnSaveClick', nextIndex);
      } else if (nextIndex === gvSerialData.length) {
        btnSaveClick();
        e.target.blur();
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
      render: (text, record, index) => {
        return index + 1;
      },
    },
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
        return text ? (
          < Tag className={text === "OK" ? "Tag-OK" : text === "NG" ? "Tag-NG" : ""} >
            {text}
          </Tag>
        ) : null;
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
    txtLotNo, settxtLotNo, selProduct, Productdata, txtLotRef, settxtLotRef, lblTotalSht, lblTotalPcs, txtRollLeaf, settxtRollLeaf,
    lblCheckRoll, lblCheckRollcolor, txtMachineNo, settxtMachineNo, pnlRollLeaf, pnlMachine, pnlLog, lblLog, lblResult, lblResultcolor,
    pnlBoard, txtBoardNoB, settxtBoardNoB, txtBoardNoF, settxtBoardNoF, pnlBackSide, hfShtScan, txtSideBack, gvBackSide, pnlFrontSide,
    txtSideFront, pnlSerial, gvSerialData, gvScanResult, gvScanData, txtgvSerial, handleChangeBoardNoB, txtLotDisabled, selProDisabled,
    txtRollLeafDisabled, inputLot, ddlProduct, inputRollLeaf, inputMachineNo, inputSideBack, inputgvSerial, handleChangeLot, ibtBackClick,
    handleChangeProduct, handleChangeLotRef, handleChangeRollLeaf, handleChangeMachine, handleChangeSerial, handleChangegvBackSide, handleChangegvFontSide,
    btnSaveClick, btnCancelClick, handleKeygvSerial, handleKeySideBack, handleChangeBoardNoF, columns
  }
};

export { fn_ScanSMTSerialSht };