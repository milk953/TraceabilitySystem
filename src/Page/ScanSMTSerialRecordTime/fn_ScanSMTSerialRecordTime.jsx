import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Tag } from "antd";
import { useLoading } from "../../loading/fn_loading";

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
  const [lblOP, setlblOP] = useState("");
  const [pnlOP, setpnlOP] = useState(false);
  const [pnlOPReJudge, setpnlOPReJudge] = useState(false);
  const [pnlAreaRejudge, setpnlAreaRejudge] = useState(false);
  const [txtOPRejudge, settxtOPRejudge] = useState("");
  const [txtAreaRejudge, settxtAreaRejudge] = useState("");

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
  const [hfProcRejudge, sethfProcRejudge] = useState("ZFIN");
  const [hfOPRejudge, sethfOPRejudge] = useState("");
  const [hfAreaRejudge, sethfAreaRejudge] = useState("");

  //Table
  const [pnlSerial, setpnlSerial] = useState(false);
  const [gvSerialData, setgvSerialData] = useState([]);
  const [gvScanResult, setgvScanResult] = useState(false);
  const [gvScanData, setgvScanData] = useState([]);
  // const [txtgvSerial, settxtgvSerial] = useState(Array(hfSerialCount).fill(""));
  const [txtgvSerial, settxtgvSerial] = useState([]);

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
  const [ibtOPRejudgeDisabled, setibtOPRejudgeDisabled] = useState(false);
  const [txtOPRejudgeDisabled, settxtOPRejudgeDisabled] = useState(false);
  const [ibtAreaRejudgeDisabled, setibtAreaRejudgeDisabled] = useState(false);
  const [ibtAreaConfirmDisabled, setibtAreaConfirmDisabled] = useState(false);
  const [txtAreaRejudgeDisabled, settxtAreaRejudgeDisabled] = useState(false);

  //inputRef
  const inputMachine = useRef(null);
  const inputOperator = useRef(null);
  const inputTotalPcs = useRef(null);
  const inputLot = useRef(null);
  const inputTray = useRef(null);
  const ddlProduct = useRef(null);
  const inputgvSerial = useRef([]);
  const inputRackNo = useRef([]);
  const inputOPRejudge = useRef(null);
  const inputAreaRejudge = useRef(null);

  const plantCode = import.meta.env.VITE_FAC;
  const CONNECT_SERIAL_ERROR = import.meta.env.VITE_CONNECT_SERIAL_ERROR;
  const CONNECT_SERIAL_NOT_FOUND = import.meta.env
    .VITE_CONNECT_SERIAL_NOT_FOUND;
  const _strTagNewLine = "/";
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    localStorage.setItem("hfUserID", localStorage.getItem("ipAddress"));
    localStorage.setItem("hfUserStation", localStorage.getItem("ipAddress"));
    sethfPlantCode(import.meta.env.VITE_FAC);
    sethfProductKind(import.meta.env.VITE_PRODUCT_KIND);
    sethfMode("");
    getProductData();
    setselectedrbt("rbtRecordTime");

    const queryParams = new URLSearchParams(window.location.search);
    const op = queryParams.get("OP");
    const oprejudge = queryParams.get("OP-REJUDGE");
    const arearejudge = queryParams.get("AREA-REJUDGE");

    if (op !== null) {
      sethfOP(op);
    } else {
      sethfOP("");
    }
    if (oprejudge !== null) {
      sethfOPRejudge(oprejudge);
      setpnlOPReJudge(true);
    } else {
      sethfOPRejudge("");
      setpnlOPReJudge(false);
    }
    if (arearejudge !== null) {
      sethfAreaRejudge(arearejudge);
      setpnlAreaRejudge(true);
    } else {
      sethfAreaRejudge("");
      setpnlAreaRejudge(false);
    }

    SetMode("RECORD");
  }, []);

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
    setgvScanResult(false);
    setgvScanData([]);
    setpnlSerial(false);
    setgvSerialData([]);
    getProductData();
    setlblLot("");
    setlblResult("");
    setlblLotTotal("");
  };

  const handleChangeOperator = () => {
    if (txtOperator !== "") {
      const Operator = txtOperator.toUpperCase();
      settxtOperator(Operator);
      if (hfOP !== "") {
        const strOPData = lblOP.trim().toUpperCase().split(",");
        let bolError = false;
        for (let intRow = 0; intRow < strOPData.length; intRow++) {
          if (strOPData[intRow] === Operator) {
            bolError = true;
            break;
          }
        }
        if (!bolError) {
          if (strOPData.length === parseInt(hfOP, 10)) {
            const updatedLblOP = lblOP + Operator;
            setlblOP(updatedLblOP);
            settxtOperator(updatedLblOP);

            if (hfOPRejudge !== "") {
              SetMode("OP-REJUDGE");
            } else if (hfAreaRejudge !== "") {
              SetMode("AREA-REJUDGE");
            } else {
              SetMode("PCS");
            }
          } else {
            setlblOP(lblOP + Operator + ",");
            settxtOperator("");
            inputOperator.current.focus();
          }
        } else {
          settxtOperator("");
          inputOperator.current.focus();
        }
      } else {
        if (hfOPRejudge !== "") {
          SetMode("OP-REJUDGE");
        } else if (hfAreaRejudge !== "") {
          SetMode("AREA-REJUDGE");
        } else {
          SetMode("PCS");
        }
      }
    }
  };

  const ibtOperatorClick = () => {
    SetMode("OP");
  };

  const handleChangeOPRejudge = async () => {
    if (txtOPRejudge !== "") {
      const OPRejudge = txtOPRejudge.toUpperCase();
      settxtOPRejudge(OPRejudge);
      if (hfOPRejudge !== "") {
        let bolError = false;
        const strOPData = lblOP.trim().toUpperCase().split(",");
        let dt = [];
        await axios
          .post("/api/RecordTime/GetOperatorRecordTimeData", {
            strplancode: plantCode,
            strProc: hfProcRejudge,
            strOperator: txtOPRejudge,
          })
          .then((res) => {
            dt = res.data;
          });
        if (dt.length > 0) {
          dt = dt[0];
          if (dt.count_op > 0) {
            for (let intRow = 0; intRow < strOPData.length; intRow++) {
              if (strOPData[intRow] === OPRejudge) {
                bolError = true;
                break;
              }
            }
          } else {
            bolError = true;
          }
        } else {
          bolError = true;
        }

        if (!bolError) {
          if (strOPData.length === parseInt(hfOPRejudge)) {
            const updatedlblOP = lblOP + OPRejudge;
            setlblOP(updatedlblOP);
            settxtOPRejudge(updatedlblOP);

            if (hfAreaRejudge !== "") {
              SetMode("AREA-REJUDGE");
            } else {
              SetMode("PCS");
            }
          } else {
            setlblOP(lblOP + OPRejudge + ",");
            settxtOPRejudge("");
            setTimeout(() => {
              if (inputOPRejudge.current) {
                inputOPRejudge.current.focus();
              }
            }, 0);
          }
        } else {
          settxtOPRejudge("");
          setTimeout(() => {
            if (inputOPRejudge.current) {
              inputOPRejudge.current.focus();
            }
          }, 0);
        }
      } else {
        if (hfAreaRejudge !== "") {
          SetMode("AREA-REJUDGE");
        } else {
          SetMode("PCS");
        }
      }
    }
  };

  const handleChangeAreaRejudge = async () => {
    if (txtAreaRejudge !== "") {
      settxtAreaRejudge(txtAreaRejudge.toUpperCase().trim());
      if (hfAreaRejudge !== "") {
        let bolError = false;
        let strOPData = lblOP.toUpperCase().trim().split(",");
        for (let intRow = 0; intRow < strOPData.length; intRow++) {
          if (strOPData[intRow] === txtAreaRejudge) {
            bolError = true;
            break;
          }
        }
        if (!bolError) {
          if (strOPData.length === parseInt(hfAreaRejudge)) {
            const updatedlblOP = lblOP + txtAreaRejudge;
            setlblOP(updatedlblOP);
            settxtAreaRejudge(updatedlblOP);
            SetMode("PCS");
          } else {
            setlblOP(lblOP + txtAreaRejudge + ",");
            settxtAreaRejudge("");
            setTimeout(() => {
              inputAreaRejudge.current.focus();
            }, 0);
          }
        } else {
          settxtAreaRejudge("");
          setTimeout(() => {
            if (inputAreaRejudge.current) {
              inputAreaRejudge.current.focus();
            }
          }, 0);
        }
      } else {
        SetMode("PCS");
      }
    }
  };

  const ibtOPRejudgeClick = async () => {
    SetMode("OP-REJUDGE");
  };

  const ibtAreaRejudgeClick = async () => {
    SetMode("AREA-REJUDGE");
  };

  const ibtAreaConfirmClick = async () => {
    if (lblOP !== "") {
      setlblOP(lblOP + txtAreaRejudge);
      const trimmedLblOP = lblOP.endsWith(",") ? lblOP.slice(0, -1) : lblOP;
      settxtAreaRejudge(trimmedLblOP);
      SetMode("PCS");
    } else {
      settxtAreaRejudge("");
      setTimeout(() => {
        if (inputAreaRejudge.current) {
          inputAreaRejudge.current.focus();
        }
      }, 0);
    }
  };

  const handleChangeTotalPcs = () => {
    if (txtTotalPcs !== "") {
      sethfSerialCount(txtTotalPcs);
      SetMode("LOT");
    } else {
      sethfSerialCount("0");
      SetMode("PCS");
    }
  };

  const handleChangerbtPcsSht = (event) => {
    if (event.type === "change") {
      setselrbtPcsSht(event.target.value);
    } else if (event.type === "keydown" && event.key === "Enter") {
      SetMode("LOT");
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
    await axios
      .post("/api/Common/getProductNameByLot", {
        strLot: strLot,
      })
      .then((res) => {
        strPrdName = res.data.prdName[0];
      });

    if (strPrdName !== undefined) {
      setlblLog("");
      setvisiblelog(false);
      settxtLotNo(strLot);
      setlblLot(strLot);
      await getCountDataBylot(strLot);
      try {
        setselProduct(strPrdName);
        await getProductSerialMaster(strPrdName);
        SetMode("SERIAL");
      } catch (error) {
        console.log(error);
        const intProduct = strPrdName.indexOf("-", 12);
        if (intProduct > -1) {
          strPrdName =
            strPrdName.substring(0, intProduct) +
            strPrdName.substring(intProduct + 1, intProduct + 11).trim();
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
  const getCountDataBylot = async (strLot) => {
    let strType = "";
    if (selrbtPcsSht === "rbtPcs") {
      strType = "PCS";
    } else {
      strType = "SHT";
    }
    await axios
      .post("/api/Common/getLotSerialRecordTimeData", {
        strLotNo: strLot,
        strPlantCode: plantCode,
      })
      .then((res) => {
        setdtSerailCount(res.data.count_pcs);
        if (res.data.count_pcs > 0) {
          setlblLotTotal(res.data.count_pcs);
        } else {
          setlblLotTotal("0");
        }
      });
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

    await axios
      .post("/api/Common/GetSerialProductByProduct", {
        prdName: strPrdName,
      })
      .then((res) => {
        dtPro = res.data[0];
        if (dtPro != null) {
          sethfSerialLength(dtPro.slm_serial_length);
          sethfSerialFixFlag(dtPro.slm_fix_flag);
          sethfSerialDigit(dtPro.slm_fix_digit);
          sethfSerialStartDigit(dtPro.slm_fix_start_digit);
          sethfSerialEndDigit(dtPro.slm_fix_end_digit);
          sethfTrayFlag(dtPro.slm_tray_flag);
          sethfTrayLength(dtPro.slm_tray_length);
          sethfTestResultFlag(dtPro.slm_test_result_flag);
          sethfSerialCount(txtTotalPcs);
          sethfAutoScan(dtPro.slm_auto_scan);
          sethfConfigCheck(dtPro.prm_barcode_req_config);
          sethfConfigCode(dtPro.prm_config_code);
          sethfConfigStart(dtPro.prm_start_config);
          sethfConfigEnd(dtPro.prm_end_config);
          sethfConfigRuning(dtPro.prm_running_req_config);
          sethfDuplicateStart(dtPro.prm_duplicate_start);
          sethfDuplicateEnd(dtPro.prm_duplicate_end);
          sethfChipIDCheck(dtPro.prm_check_chip_id_flg);
          sethfCheckPrdSht(dtPro.prm_req_check_prd_sht);
          sethfCheckPrdShtStart(dtPro.prm_check_prd_sht_start);
          sethfCheckPrdShtEnd(dtPro.prm_check_prd_sht_end);
          sethfCheckPrdAbbr(dtPro.prm_abbr);
          sethfPlasmaCheck(dtPro.prm_plasma_time_flg);
          sethfPlasmaTime(dtPro.prm_plasma_time);
          sethfCheckStartSeq(dtPro.prm_req_start_seq_flg);
          sethfCheckStartSeqCode(dtPro.prm_start_seq_code);
          sethfCheckStartSeqStart(dtPro.prm_start_seq_start);
          sethfCheckStartSeqEnd(dtPro.prm_start_seq_end);
          sethfCheckDateInProc(dtPro.prm_date_inproc_flg);
          sethfDateInProc(dtPro.prm_date_inproc);
          sethfWeekCodeType(dtPro.prm_date_type);
          sethfCheckWeekCode(dtPro.prm_check_weekcode_flg);
          sethfCheckWeekCodeStart(dtPro.prm_check_weekcode_start);
          sethfCheckWeekCodeEnd(dtPro.prm_check_weekcode_end);
          sethfSerialStartCode(dtPro.prm_serial_start_code);
          sethfSerialInfo(dtPro.prm_additional_info);
        }
      });
    return dtPro;
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
    istxtLotDisabled,
  ]);

  const handleKeygvSerial = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const nextIndex = index + 1;
      console.log(
        "No. 1 : ",
        nextIndex,
        "No. 2 : ",
        gvSerialData.length,
        "No. 3 : ",
        inputgvSerial.current[nextIndex],
        "No 4 : ",
        nextIndex < gvSerialData.length && inputgvSerial.current[nextIndex]
      );
      if (nextIndex < gvSerialData.length && inputgvSerial.current[nextIndex]) {
        inputgvSerial.current[nextIndex].focus();
      } else if (nextIndex === gvSerialData.length) {
        btnSaveClick();
      }
    }
  };

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
      setibtOPRejudgeDisabled(true);
      settxtOPRejudgeDisabled(true);
      settxtOPRejudge("");
      setibtAreaRejudgeDisabled(true);
      setibtAreaConfirmDisabled(true);
      settxtAreaRejudgeDisabled(true);
      settxtAreaRejudge("");
      settxtTotalPcs("");
      setselrbtPcsSht("rbtPcs");
      setistxtTotalPcsDisabled(true);
      settxtLotNo("");
      setistxtLotDisabled(true);
      settxtRackNo("");
      setistxtRackDisabled(true);
      setisselProDisabled(true);
      setisibtPcsBackDisabled(true);
      setpnlSerial(false);
      setgvSerialData([]);
      sethfMode("MC");
      setTimeout(() => {
        inputMachine.current.focus();
      }, 0);
    } else if (strType === "OP") {
      setistxtMachineDisabled(true);
      setisibtMCBackDisabled(false);
      setlblOP("");
      settxtOperator("");
      setistxtOpDisabled(false);
      setisibtOperatorDisabled(false);
      setibtOPRejudgeDisabled(true);
      settxtOPRejudgeDisabled(true);
      settxtOPRejudge("");
      setibtAreaRejudgeDisabled(true);
      setibtAreaConfirmDisabled(true);
      settxtAreaRejudgeDisabled(true);
      settxtAreaRejudge("");
      settxtTotalPcs("");
      setistxtTotalPcsDisabled(true);
      settxtLotNo("");
      setistxtLotDisabled(true);
      setselrbtPcsSht("rbtPcs");
      settxtRackNo("");
      setistxtRackDisabled(true);
      setisselProDisabled(true);
      setisibtPcsBackDisabled(true);
      setselProduct(Productdata[0].prd_name);
      setlblLot("");
      setlblLotTotal("");
      setlblResult("");
      setpnlSerial(false);
      setgvSerialData([]);
      settxtgvSerial([]);
      setgvScanResult(false);
      setgvScanData([]);
      sethfMode("OP");
      if (hfOP !== "") {
        setpnlOP(true);
      } else {
        setpnlOP(false);
      }
      inputOperator.current.focus();
    } else if (strType === "OP-REJUDGE") {
      setistxtMachineDisabled(true);
      setisibtMCBackDisabled(false);
      setistxtOpDisabled(true);
      setisibtOperatorDisabled(false);
      setibtOPRejudgeDisabled(false);
      settxtOPRejudgeDisabled(false);
      settxtOPRejudge("");
      setibtAreaRejudgeDisabled(false);
      setibtAreaConfirmDisabled(true);
      settxtAreaRejudgeDisabled(true);
      settxtAreaRejudge("");
      settxtTotalPcs("");
      setistxtTotalPcsDisabled(true);
      settxtLotNo("");
      setselProduct(Productdata[0].prd_name);
      setselrbtPcsSht("rbtPcs");
      setlblLot("");
      setlblLotTotal("");
      setlblOP("");
      setistxtLotDisabled(true);
      settxtRackNo("");
      setistxtRackDisabled(true);
      setisselProDisabled(true);
      setisibtPcsBackDisabled(false);
      setpnlSerial(false);
      setgvSerialData([]);
      setgvScanResult(false);
      setgvScanData([]);
      setlblResult("");
      sethfMode("OP-REJUDGE");

      if (hfOPRejudge !== "") {
        setpnlOP(true);
      } else {
        setpnlOP(false);
      }
      setTimeout(() => {
        if (inputOPRejudge.current) {
          inputOPRejudge.current.focus();
        }
      }, 0);
    } else if (strType === "AREA-REJUDGE") {
      setistxtMachineDisabled(true);
      setisibtMCBackDisabled(false);
      setistxtOpDisabled(true);
      setisibtOperatorDisabled(false);
      //setibtOPRejudgeDisabled(true);
      settxtOPRejudgeDisabled(false);
      setibtAreaRejudgeDisabled(false);
      setibtAreaConfirmDisabled(false);
      settxtAreaRejudgeDisabled(false);
      settxtAreaRejudge("");
      settxtTotalPcs("");
      setselrbtPcsSht("rbtPcs");
      setistxtTotalPcsDisabled(true);
      settxtLotNo("");
      setlblOP("");
      setistxtLotDisabled(true);
      settxtRackNo("");
      setistxtRackDisabled(true);
      setisselProDisabled(true);
      setisibtPcsBackDisabled(false);
      setselProduct(Productdata[0].prd_name);
      setlblLot("");
      setlblLotTotal("");
      setpnlSerial(false);
      setgvSerialData([]);
      setgvScanResult(false);
      setgvScanData([]);
      setlblResult("");
      sethfMode("AREA-REJUDGE");

      if (hfAreaRejudge !== "") {
        setpnlOP(true);
      } else {
        setpnlOP(false);
      }
      setTimeout(() => {
        if (inputAreaRejudge.current) {
          inputAreaRejudge.current.focus();
        }
      }, 0);
    } else if (strType === "PCS") {
      setistxtMachineDisabled(true);
      setisibtMCBackDisabled(false);
      setistxtOpDisabled(true);
      setisibtOperatorDisabled(false);
      setibtOPRejudgeDisabled(false);
      settxtOPRejudgeDisabled(false);
      setibtAreaRejudgeDisabled(false);
      setibtAreaConfirmDisabled(true);
      settxtAreaRejudgeDisabled(false);
      settxtTotalPcs("");
      setistxtTotalPcsDisabled(false);
      settxtLotNo("");
      setistxtLotDisabled(true);
      settxtRackNo("");
      setistxtRackDisabled(true);
      setisselProDisabled(true);
      setisibtPcsBackDisabled(false);
      setselrbtPcsSht("rbtPcs");
      setlblLot("");
      setlblLotTotal("");
      getProductData();
      setlblOP("");
      setpnlSerial(false);
      setpnlOP(false);
      setgvSerialData([]);
      setgvScanResult(false);
      setgvScanData([]);
      setlblResult("");
      sethfMode("PCS");
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
      setgvScanResult(false);
      setlblResult("");
      setgvScanData([]);
      setlblResult("");
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
      sethfMode("LOT");
      inputLot.current.focus();
    } else if (strType === "TRAY") {
      setistxtLotDisabled(true);
      setvisiblelog(false);
      setpnlSerial(true);
      getInitialSerial();
      sethfMode("TRAY");
      inputTray.current.focus();
    } else if (strType === "TRAY_ERROR") {
      setistxtLotDisabled(true);
      setvisiblelog(true);
      setpnlSerial(false);
      sethfMode("TRAY");
      inputTray.current.focus();
    } else if (strType === "SERIAL") {
      setisselProDisabled(true);
      setistxtLotDisabled(true);
      setvisiblelog(false);
      setpnlSerial(true);
      sethfMode("SERIAL");
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

  const getInitialSerial = async () => {
    let dtData = [];
    for (let intRow = 1; intRow <= hfSerialCount; intRow++) {
      dtData.push({ SEQ: intRow });
    }
    setgvSerialData(dtData);

    if (dtData.length > 0) {
      if (selectedrbt === "rbtRecordTime") {
        settxtgvSerial(Array(dtData.length).fill(""));
        inputgvSerial.current.forEach((input) => {
          if (input) input.value = "";
        });
        setTimeout(() => {
          inputgvSerial.current[0].focus();
        }, 0);
      } else {
        settxtRackNo("");
        setistxtRackDisabled(false);
        setTimeout(() => {
          inputRackNo.current.focus();
        }, 0);
      }
    }

    return dtData;
  };

  const getInputSerial = async (txtgvSerial) => {
    let dtData = [];
    let intRow = 0;
    console.log("gvSerialData", gvSerialData);
    for (let intSeq = 0; intSeq < gvSerialData.length; intSeq++) {
      intRow = intRow + 1;

      // เพิ่ม drRow ลงใน dtData
      let drRow = {
        SEQ: intRow,
        SERIAL: txtgvSerial[intSeq] || "",
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
        drRow.MACHINE = txtRackNo;
      }

      drRow.PRODUCT = selProduct;
      drRow.LOT = lblLot;

      if (selrbtPcsSht === "rbtPcs") {
        drRow.DATA_TYPE = "PCS";
      } else {
        drRow.DATA_TYPE = "SHT";
      }

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

  const setSerialDataTray = async (txtgvSerial) => {
    let _strFileError = "";
    let dtSerial = await getInputSerial(txtgvSerial);
    let _strLot = lblLot.toUpperCase().trim();
    let _strPrdName = selProduct;
    let _strTray = " ";
    let _strScanResultAll = "OK";
    let _intRowSerial = 0;
    let bolError = false;
    let bolTrayError = false;
    let dtLotPassCount = [];
    console.log("dtSerial", dtSerial);
    setlblLog("");
    showLoading("กำลังบันทึก กรุณารอสักครู่");

    const allSerialEmpty = dtSerial.every((item) => item.SERIAL === "");
    if (allSerialEmpty) {
      hideLoading();
      setlblLog("Please Input Serial No.");
      setvisiblelog(true);
      settxtgvSerial(Array(gvSerialData.length).fill(""));
      inputgvSerial.current.forEach((input) => {
        if (input) input.value = "";
      });
      setTimeout(() => {
        inputgvSerial.current[0].focus();
      }, 0);
      setgvScanResult(false);
      setgvScanData([]);
      return;
    }

    if (_strLot !== "") {
      if (_strLot.length === 9 && _strPrdName !== "") {
        setlblLot(_strLot);
        setlblLotTotal("0");
      } else {
        setlblLog(
          _strLot +
            " invalid lot no.!" +
            _strTagNewLine +
            _strLot +
            " หมายเลขล็อตไม่ถูกต้อง"
        );
        setlblLot("");
        setlblLotTotal("");
        setlblResult("NG");
        _strScanResultAll = "NG";
        bolTrayError = true;
      }
    }

    if (!bolTrayError) {
      await axios
        .post("/api/Common/getSerialRecordTimeTrayTable", {
          strPlantCode: plantCode,
          dtSerial: dtSerial,
        })
        .then((res) => {
          dtSerial = res.data;
        });

      if (hfCheckWeekCode === "Y" && selrbtPcsSht === "rbtPcs") {
        axios
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
          if (
            dtSerial[i].SERIAL !== CONNECT_SERIAL_ERROR &&
            dtSerial[i].SERIAL !== CONNECT_SERIAL_NOT_FOUND
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
            let _strScanResultUpdate = "";
            let _strMessageUpdate = "";
            let _strTestResultUpdate = "";
            let _strTypeTestResult = "";
            let _strRejectUpdate = "";
            let _strReject1 = "";
            let _strReject2 = "";
            let _strTouchUp = "";

            bolError = false;

            let _strTestResult = "NO";

            if (dtSerial[i].DATA_TYPE === "SHT") {
              if (hfCheckPrdSht === "Y" && !bolError) {
                const start = parseInt(hfCheckPrdShtStart);
                const end = parseInt(hfCheckPrdShtEnd);
                const CheckPrdSht = _strSerial.substring(start - 1, end);

                if (hfCheckPrdAbbr !== CheckPrdSht) {
                  _strMessageUpdate =
                    "Sheet barcode mix product" +
                    _strTagNewLine +
                    "หมายเลขบาร์โค้ดปนกันกับผลิตภัณฑ์อื่น";
                  _strRemark = "Sheet barcode mix product";
                  _strScanResultUpdate = "NG";
                  _strTestResultUpdate = _strTestResult;

                  dtSerial[i].REMARK_UPDATE = _strRemark;
                  dtSerial[i].ROW_UPDATE = "Y";

                  bolError = true;
                } else {
                  _strMessageUpdate = "";
                  _strRemark = "";
                  _strScanResultUpdate = "OK";
                  _strTestResultUpdate = "";
                  dtSerial[i].REMARK_UPDATE = _strRemark;
                  dtSerial[i].ROW_UPDATE = "Y";
                }
              } else {
                _strMessageUpdate =
                  "Req. check sheet product" +
                  _strTagNewLine +
                  "ไม่ได้กำหนดการตรวจสอบชื่อผลิตภัณฑ์";
                _strRemark = "Req. check sheet product";
                _strScanResultUpdate = "NG";
                _strTestResultUpdate = _strTestResult;

                dtSerial[i].REMARK_UPDATE = _strRemark;
                dtSerial[i].ROW_UPDATE = "Y";

                bolError = true;
              }
            } else {
              // Check format serial no

              if (_strSerial.length === hfSerialLength) {
                let _strFixDigit = "";
                if (hfSerialFixFlag === "Y") {
                  const start = parseInt(hfSerialStartDigit);
                  const end = parseInt(hfSerialEndDigit);
                  _strFixDigit = _strSerial.substring(start - 1, end);

                  if (_strFixDigit !== hfSerialDigit) {
                    _strMessageUpdate =
                      "Serial barcode mix product" +
                      _strTagNewLine +
                      "หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
                    _strRemark = "Serial barcode mix product";
                    _strScanResultUpdate = "NG";
                    _strTestResultUpdate = _strTestResult;

                    dtSerial[i].REMARK_UPDATE = _strRemark;
                    dtSerial[i].ROW_UPDATE = "Y";

                    _intCountNG = 1;
                    bolError = true;
                  }

                  if (hfConfigCheck === "Y" && _strScanResultUpdate !== "NG") {
                    let _strConfigDigit = "";
                    const start = parseInt(hfConfigStart);
                    const end = parseInt(hfConfigEnd);
                    _strConfigDigit = _strSerial.substring(start - 1, end);
                    if (_strConfigDigit !== hfConfigCode) {
                      _strMessageUpdate =
                        "Serial barcode mix product" +
                        _strTagNewLine +
                        "หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
                      _strRemark = "Serial barcode mix product";
                      _strScanResultUpdate = "NG";
                      _strTestResultUpdate = _strTestResult;
                      dtSerial[i].REMARK_UPDATE = _strRemark;
                      dtSerial[i].ROW_UPDATE = "Y";

                      _intCountNG = 1;
                      bolError = true;
                    }
                  }

                  if (
                    hfSerialStartCode !== "" &&
                    _strScanResultUpdate !== "NG"
                  ) {
                    if (
                      _strSerial.substring(0, hfSerialStartCode.length) !==
                      hfSerialStartCode
                    ) {
                      _strMessageUpdate =
                        "Serial barcode mix product" +
                        _strTagNewLine +
                        "หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
                      _strRemark = "Serial barcode mix product";
                      _strScanResultUpdate = "NG";
                      _strTestResultUpdate = _strTestResult;
                      dtSerial[i].REMARK_UPDATE = _strRemark;
                      dtSerial[i].ROW_UPDATE = "Y";

                      _intCountNG = 1;
                      bolError = true;
                    }
                  }
                }

                if (hfCheckStartSeq === "Y" && _strScanResultUpdate !== "NG") {
                  let _strStartSeq = "";
                  const start = parseInt(hfCheckStartSeqStart);
                  const end = parseInt(hfCheckStartSeqEnd);
                  _strStartSeq = _strSerial.substring(start - 1, end);
                  if (_strStartSeq !== hfCheckStartSeqCode) {
                    _strMessageUpdate =
                      "Serial barcode mix product" +
                      _strTagNewLine +
                      "หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
                    _strRemark = "Serial barcode mix product";
                    _strScanResultUpdate = "NG";
                    _strTestResultUpdate = _strTestResult;
                    dtSerial[i].REMARK_UPDATE = _strRemark;
                    dtSerial[i].ROW_UPDATE = "Y";

                    _intCountNG = 1;
                    bolError = true;
                  }
                }

                if (hfCheckWeekCode === "Y" && _strScanResultUpdate !== "NG") {
                  let _strWeekCode = "";
                  const start = parseInt(hfCheckWeekCodeStart);
                  const end = parseInt(hfCheckWeekCodeEnd);
                  _strWeekCode = _strSerial.substring(start - 1, end);
                  if (_strWeekCode !== hfWeekCode) {
                    _strMessageUpdate =
                      "Serial barcode mix week code" +
                      _strTagNewLine +
                      "หมายเลขบาร์โค้ดปนรหัสสัปดาห์กัน";
                    _strRemark = "Serial barcode mix week code";
                    _strScanResultUpdate = "NG";
                    _strTestResultUpdate = _strTestResult;
                    dtSerial[i].REMARK_UPDATE = _strRemark;
                    dtSerial[i].ROW_UPDATE = "Y";

                    _intCountNG = 1;
                    bolError = true;
                  }
                }

                if (!bolError) {
                  // for (let intRow = _intRowSerial + 1; intRow < dtSerial.length; intRow++) {
                  //     if (_strSerial === dtSerial[intRow].SERIAL) {
                  //         _strMessageUpdate = "Serial duplicate in tray" + _strTagNewLine + "หมายเลขบาร์โค้ดซ้ำในถาดเดียวกัน";
                  //         _strRemark = "Serial duplicate in tray  ";
                  //         _strScanResultUpdate = "NG";
                  //         _strTestResultUpdate = _strTestResult;
                  //         dtSerial[i].REMARK_UPDATE = _strRemark;
                  //         dtSerial[i].ROW_UPDATE = "N";

                  //         _intCountNG = 1;
                  //         bolError = true;
                  //     }
                  // }
                  let isDuplicate = dtSerial.some(
                    (item, index) =>
                      index !== i &&
                      _strSerial.toUpperCase() ===
                        item.SERIAL.toString().trim().toUpperCase()
                  );

                  if (isDuplicate) {
                    _strMessageUpdate =
                      "Serial duplicate in tray" +
                      _strTagNewLine +
                      "หมายเลขบาร์โค้ดซ้ำในถาดเดียวกัน";
                    _strRemark = "Serial duplicate in tray  ";
                    _strScanResultUpdate = "NG";
                    _strTestResultUpdate = _strTestResult;
                    dtSerial[i].REMARK_UPDATE = _strRemark;
                    dtSerial[i].ROW_UPDATE = "N";

                    _intCountNG = 1;
                    bolError = true;
                  }
                }

                if (!bolError) {
                  _strMessageUpdate = "";
                  _strRemark = "";
                  _strScanResultUpdate = "OK";
                  _strTestResultUpdate = "";
                  dtSerial[i].REMARK_UPDATE = _strRemark;
                  dtSerial[i].ROW_UPDATE = "Y";
                }
              } else {
                _strMessageUpdate =
                  "Serial not matching product" +
                  _strTagNewLine +
                  "หมายเลขบาร์โค้ดไม่ตรงตามที่กำหนดไว้";
                _strRemark = "Serial barcode not matching product";
                _strScanResultUpdate = "NG";
                _strTestResultUpdate = _strTestResult;
                dtSerial[i].REMARK_UPDATE = _strRemark;
                dtSerial[i].ROW_UPDATE = "Y";

                bolError = true;
              }
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
            dtSerial[i].SCAN_RESULT = "NG";
            dtSerial[i].ROW_UPDATE = "N";
            _strScanResultAll = "NG";
            bolError = true;
          }
        } else {
        }
        _intRowSerial = _intRowSerial + 1;
      }

      setlblResult(_strScanResultAll);

      let _strErrorUpdate = "";
      setvisiblelog(false);
      setlblLog("");

      for (let i = 0; i < dtSerial.length; i++) {
        if (_strScanResultAll !== "NG") {
          axios
            .post("/api/Common/setSerialRecordTimeTrayTable", {
              dataList: {
                strUserID: txtOperator,
                strProgram: "ScanSMTSerialRecordTime",
                strPlantCode: plantCode,
                strStation: hfUserStation,
                strOPRejudge: txtOPRejudge,
                strAreaRejudge: txtAreaRejudge,
                data: [
                  {
                    SERIAL: dtSerial[i].SERIAL,
                    MACHINE: dtSerial[i].MACHINE,
                    PRODUCT: dtSerial[i].PRODUCT,
                    LOT: dtSerial[i].LOT,
                    DATA_TYPE: dtSerial[i].DATA_TYPE,
                    ROW_UPDATE: dtSerial[i].ROW_UPDATE,
                    UPDATE_FLG: dtSerial[i].UPDATE_FLG,
                  },
                ],
              },
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

    await getCountDataBylot(lblLot);

    if (!bolTrayError) {
      setgvScanData(dtSerial);
      setgvScanResult(true);
    } else {
      setgvScanData([]);
      setgvScanResult(false);
    }

    getInitialSerial();
    hideLoading();
  };

  // const handleChangeSerial = (index, event) => {
  //     const trimmedValue = event.target.value.trim().toUpperCase();
  //     const newValue = [...txtgvSerial];
  //     newValue[index] = trimmedValue;
  //     settxtgvSerial(newValue);
  // };
  let newData = [];
  const handleChangeSerial = (index, e) => {
    newData[index] = e.target.value.trim().toUpperCase();
    return newData;
  };

  // const btnSaveClick = () => {
  //     if (hfMode === "SERIAL") {
  //         setSerialDataTray();
  //         settxtgvSerial("");
  //     }
  // };
  const btnSaveClick = async (txtgvSerial) => {
    if (hfMode === "SERIAL") {
      console.log("txtgvSerial : ", txtgvSerial);
      await setSerialDataTray(txtgvSerial);
    }
  };

  const btnCancelClick = () => {
    SetMode("SERIAL");
    setgvScanResult(false);
    setgvScanData([]);
    settxtgvSerial(Array(gvSerialData.length).fill(""));
    if (selectedrbt === "rbtRecordTime") {
      setTimeout(() => {
        inputgvSerial.current[0].focus();
      }, 0);
    } else {
      setTimeout(() => {
        inputRackNo.current.focus();
      }, 0);
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
        if (record.SERIAL == "") {
          return "";
        } else {
          return text;
        }
        // return text ? (
        //   < Tag className={text === "OK" ? "Tag-OK" : text === "NG" ? "Tag-NG" : ""} >
        //     {text}
        //   </Tag>
        // ) : null;
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
    selectedrbt,
    txtMachine,
    settxtMachine,
    handleChangeMachine,
    txtOperator,
    settxtOperator,
    txtTotalPcs,
    settxtTotalPcs,
    txtLotNo,
    settxtLotNo,
    selProduct,
    setselProduct,
    txtRackNo,
    settxtRackNo,
    lblLot,
    lblLotTotal,
    lblLog,
    visiblelog,
    lblResult,
    pnlSerial,
    gvScanResult,
    istxtOpDisabled,
    istxtTotalPcsDisabled,
    istxtLotDisabled,
    isselProDisabled,
    istxtMachineDisabled,
    handleChangerbt,
    istxtRackDisabled,
    isibtMCBackDisabled,
    isibtOperatorDisabled,
    isibtPcsBackDisabled,
    inputMachine,
    inputOperator,
    inputTotalPcs,
    inputLot,
    pnlMachine,
    pnlRackNo,
    Productdata,
    ibtMCBackClick,
    handleChangeOperator,
    ibtOperatorClick,
    handleChangeTotalPcs,
    handleChangerbtPcsSht,
    ibtPcsBackClick,
    selrbtPcsSht,
    ddlProduct,
    handleChangeLot,
    ibtBackClick,
    handleChangeProduct,
    hfSerialCount,
    txtgvSerial,
    inputRackNo,
    inputgvSerial,
    handleChangeSerial,
    lblResultcolor,
    gvScanData,
    btnSaveClick,
    btnCancelClick,
    pnlOP,
    lblOP,
    handleKeygvSerial,
    columns,
    pnlOPReJudge,
    pnlAreaRejudge,
    txtOPRejudge,
    settxtOPRejudge,
    txtAreaRejudge,
    settxtAreaRejudge,
    ibtOPRejudgeDisabled,
    txtOPRejudgeDisabled,
    ibtAreaRejudgeDisabled,
    ibtAreaConfirmDisabled,
    txtAreaRejudgeDisabled,
    inputOPRejudge,
    inputAreaRejudge,
    handleChangeOPRejudge,
    handleChangeAreaRejudge,
    ibtOPRejudgeClick,
    ibtAreaRejudgeClick,
    ibtAreaConfirmClick,
    settxtgvSerial,
    gvSerialData,
  };
}

export { fn_ScanSMTSerialRecordTime };
