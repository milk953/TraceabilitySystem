import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { SetMeal } from "@mui/icons-material";

function fn_P1ConnectBoard() {
  const [Product, setProduct] = useState([]);

  const [txtLot, settxtLot] = useState({
    value: "171236724;171236724;171236724",
    disbled: "",
    visble: "",
    style: {},
  });
  const [ddlProduct, setddlProduct] = useState({
    value: "",
    disbled: "",
    visble: "",
    style: "",
  });
  const [txtLotRef, settxtLotRef] = useState({
    value: "",
    disbled: "",
    visble: "",
    style: "",
  });

  const [lblTotalSht, setlblTotalSht] = useState({
    value: "",
    disbled: "",
    visble: "",
    style: "",
  });
  const [lblTotalPcs, setlblTotalPcs] = useState({
    value: "",
    disbled: "",
    visble: "",
    style: "",
  });
  const [txtRollLeaf, settxtRollLeaf] = useState({
    value: "",
    disbled: "",
    visble: "none",
    style: "",
  });
  const [txtMachineNo, settxtMachineNo] = useState({
    value: "",
    disbled: "",
    visble: "none",
    style: "",
  });
  const [lblLog, setlblLog] = useState({
    value: "",
    disbled: "",
    visble: false,
    style: "",
  });
  const [lblConfirm, setlblConfirm] = useState({
    value: "",
    disbled: "",
    visble: "none",
    style: "",
  });
  const [lblResult, setlblResult] = useState("");
  const [GvSerial, setGvSerial] = useState({
    value: "",
    disbled: "",
    visble: false,
    style: "",
  });
  const [GvBackSide, setGvBackSide] = useState({
    value: "",
    disbled: "",
    visble: false,
    style: "",
  });
  const [gvScanResult, setgvScanResult] = useState({
    value: "",
    disbled: "",
    visble: false,
    style: "",
  });
  const [txtSideBack, settxtSideBack] = useState({
    value: "",
    disbled: "",
    visble: false,
    style: "",
  });
  const [txtSideFront, settxtSideFront] = useState("");
  const [txtSerial, settxtSerial] = useState("");

  //Focus
  const fcRollleaf = useRef(null);
  const fctMachchine = useRef(null);
  const fcLotNo = useRef(null);
  const fcOperator = useRef(null);
  const fcProduct = useRef(null);
  const fcGvSerial = useRef(null);
  const fcGvBackSide_txtsideback_0 = useRef([]);
  const fcGvSerial_txtSerial_0 = useRef([]);
  const fcGvBackSide_txtsideback_1 = useRef([]);

  //hf
  const [hfRollNo, sethfRollNo] = useState("");
  const [hfSerialLength, setHfSerialLength] = useState("");
  const [hfSerialFixFlag, setHfSerialFixFlag] = useState("");
  const [hfSerialDigit, setHfSerialDigit] = useState("");
  const [hfSerialStartDigit, setHfSerialStartDigit] = useState("");
  const [hfSerialEndDigit, setHfSerialEndDigit] = useState("");
  const [hfTrayFlag, setHfTrayFlag] = useState("");
  const [hfTrayLength, setHfTrayLength] = useState("");
  const [hfTestResultFlag, setHfTestResultFlag] = useState("");
  const [hfBarcodeSide, setHfBarcodeSide] = useState("");
  const [hfShtScan, setHfShtScan] = useState("");
  const [hfConfigCheck, setHfConfigCheck] = useState("");
  const [hfConfigCode, setHfConfigCode] = useState("");
  const [hfConfigStart, setHfConfigStart] = useState("");
  const [hfConfigEnd, setHfConfigEnd] = useState("");
  const [hfConfigRuning, setHfConfigRuning] = useState("");
  const [hfDuplicateStart, setHfDuplicateStart] = useState("");
  const [hfDuplicateEnd, setHfDuplicateEnd] = useState("");
  const [hfCheckPrdSht, setHfCheckPrdSht] = useState("");
  const [hfCheckPrdShtStart, setHfCheckPrdShtStart] = useState("");
  const [hfCheckPrdShtEnd, setHfCheckPrdShtEnd] = useState("");
  const [hfCheckPrdAbbr, setHfCheckPrdAbbr] = useState("");
  const [hfCheckLotSht, setHfCheckLotSht] = useState("");
  const [hfCheckLotShtStart, setHfCheckLotShtStart] = useState("");
  const [hfCheckLotShtEnd, setHfCheckLotShtEnd] = useState("");
  const [hfCheckStartSeq, setHfCheckStartSeq] = useState("");
  const [hfCheckStartSeqCode, setHfCheckStartSeqCode] = useState("");
  const [hfCheckStartSeqStart, setHfCheckStartSeqStart] = useState("");
  const [hfCheckStartSeqEnd, setHfCheckStartSeqEnd] = useState("");
  const [hfCheckSheetELT, setHfCheckSheetELT] = useState("");
  const [hfCheckRollSht, setHfCheckRollSht] = useState("");
  const [hfCheckRollShtDigit, setHfCheckRollShtDigit] = useState("");
  const [hfCheckDateInProc, setHfCheckDateInProc] = useState("");
  const [hfDateInProc, setHfDateInProc] = useState("");
  const [hfCheckWeekCode, setHfCheckWeekCode] = useState("");
  const [hfCheckWeekCodeStart, setHfCheckWeekCodeStart] = useState("");
  const [hfCheckWeekCodeEnd, setHfCheckWeekCodeEnd] = useState("");
  const [hfWeekCode, setHfWeekCode] = useState("");
  const [hfWeekCodeType, setHfWeekCodeType] = useState("");
  const [hfCheckPreAOIF, setHfCheckPreAOIF] = useState("");
  const [hfCheckPreAOIB, setHfCheckPreAOIB] = useState("");
  const [hfCheckAOIF, setHfCheckAOIF] = useState("");
  const [hfCheckAOIB, setHfCheckAOIB] = useState("");
  const [hfCheckSPIF, setHfCheckSPIF] = useState("");
  const [hfCheckSPIB, setHfCheckSPIB] = useState("");
  const [hfReqMachine, setHfReqMachine] = useState("");
  const [hfConnRollLength, setHfConnRollLength] = useState("");
  const [hfConnLeafLength, setHfConnLeafLength] = useState("");
  const [hfCheckRollPrdFlg, setHfCheckRollPrdFlg] = useState("");
  const [hfCheckRollPrdStart, setHfCheckRollPrdStart] = useState("");
  const [hfCheckRollPrdEnd, setHfCheckRollPrdEnd] = useState("");
  const [hfCheckRollPrd, setHfCheckRollPrd] = useState("");
  const [hfSerialStartCode, setHfSerialStartCode] = useState("");
  const [hfCheckXrayF, setHfCheckXrayF] = useState("");
  const [hfCheckXrayB, setHfCheckXrayB] = useState("");
  const [hfCheckXrayOneTime, setHfCheckXrayOneTime] = useState("");
  const [hfCheckFinInspect, setHfCheckFinInspect] = useState("");
  const [hfCheckFinInspectProc, setHfCheckFinInspectProc] = useState("");
  const [hfChipIDCheck, setHfChipIDCheck] = useState("");
  const [hfPlasmaCheck, setHfPlasmaCheck] = useState("");
  const [hfPlasmaTime, setHfPlasmaTime] = useState("");
  const [hfAutoScan, setHfAutoScan] = useState("");
  const [hfCheckAOICoatF, setHfCheckAOICoatF] = useState("");
  const [hfCheckAOICoatB, setHfCheckAOICoatB] = useState("");
  const [hfSerialInfo, setHfSerialInfo] = useState("");
  const [hfBarcodeGrade, setHfBarcodeGrade] = useState("");
  const [hfMode, setHfMode] = useState("");
  const [hfSerialCount, setHfSerialCount] = useState("");
  const hfUserStation = localStorage.getItem("ipAddress");
  const hfUserID = localStorage.getItem("ipAddress");
  const CONNECT_SERIAL_ERROR = import.meta.env.VITE_CONNECT_SERIAL_ERROR;
  const AUTO_SCAN_CHECK_FLG = import.meta.env.VITE_AUTO_SCAN_CHECK_FLG;
  const Fac = import.meta.env.VITE_FAC;
  const hfProcessList = "''MPRN'',''MMOT'',''MREF'',''MAOI''";
  //Start pageload
  useEffect(() => {
    // txtLot_TextChanged();
    const PageLoad = async () => {
      setHfMode("");
      GetProductData();
      SetMode("LOT");
    };
    PageLoad();
  }, []);

  const GetProductData = async () => {
    await axios.get("/api/Common/GetProductData").then((res) => {
      let data = res.data.flat();
      // console.log(data)
      setProduct(data);
      setddlProduct((prevState) => ({ ...prevState, value: data[0].prd_name }));
    });
  };

  const ibtBack_Click = async () => {
    settxtLot((prevState) => ({
      ...prevState,
      value: "",
      disbled: "กดได้",
      style: "",
    }));
    // pnlSerial.Visible = False
    setddlProduct((prevState) => ({
      ...prevState,
      value: Product[0].prd_name,
    }));
    SetMode("LOT");
    // fnSetFocus("txtLot")
  };

  const btnSave_Click = async () => {
    getInputSerial()
    if (hfMode == "SERIAL") {
      // setSerialData()
    }
  };

  const ddlProduct_SelectedIndexChanged = async () => {
    let data = getProductSerialMaster();
    if (txtLot.value != "") {
      setlblLog((prevState) => ({ ...prevState, value: "", visble: "show" }));
      getCountDataBylot(txtLot.value);
      getInitialSheet();
      if (data.prm_conn_roll_sht_length == "Y") {
        settxtRollLeaf((prevState) => ({
          ...prevState,
          visble: "show",
          value: "",
        }));
        // fnSetFocus("txtRollLeaf")
      } else {
        SetMode("SERIAL");
        settxtMachineNo((prevState) => ({ ...prevState, value: "" }));
        if (data.prm_sht_machine_flg == "Y") {
          settxtMachineNo((prevState) => ({ ...prevState, visble: "show" }));
          // fnSetFocus("txtMachineNo")
        } else {
          // fnSetFocus("gvBackSide_txtSideBack_0")
        }
      }
    }
    setddlProduct((prevState) => ({
      ...prevState,
      value: Product[0].prd_name,
    }));
  };

  const txtLot_TextChanged = async () => {
    let strLotData = [];
    let strLot = "";
    let strPrdName = "";
    let strError = "";
    strLotData = txtLot.value.toUpperCase().split(";");
    console.log(strLotData, "strLotData");
    if (strLotData.length >= 2) {
      strLot = strLotData[0];
      await axios
        .post("/api/Common/GetProductNameByLot", {
          strLot: strLot,
        })
        .then((res) => {
          strPrdName = res.data.prdName[0];
          console.log(res.data, "strPrdName");
        });
      settxtRollLeaf((prevState) => ({ ...prevState, visble: "not show" }));
      if (strPrdName != "") {
        await axios
          .post("/api/P1ConnectBoard/GetConfirmToolingByLot", {
            strLot: strLot,
            strProcList: hfProcessList,
          })
          .then((res) => {
            strError = res.data; // strPrdName = res.data.prdName[0];
            console.log(res.data, "strPrdName");
          });
        if (strError == "") {
          setlblLog((prevState) => ({
            ...prevState,
            value: "",
            visble: "not show",
          }));
          settxtLot((prevState) => ({ ...prevState, value: strLot }));
          settxtLotRef((prevState) => ({ ...prevState, value: strLot }));
          getCountDataBylot(strLot);
          try {
            const isInArray = Product.some(
              (item) => item.prd_name === strPrdName
            );
            if (isInArray) {
              setddlProduct((prevState) => ({
                ...prevState,
                value: strPrdName,
              }));
              let data = await getProductSerialMaster(strPrdName);
              getInitialSheet();
              if (data.prm_conn_roll_sht_flg == "Y") {
                settxtRollLeaf((prevState) => ({
                  ...prevState,
                  value: "",
                  visble: "show",
                }));
                // fnSetFocus("txtRollLeaf")
              } else {
                SetMode("SERIAL");
                if (data.prm_sht_machine_flg == "Y") {
                  settxtMachineNo((prevState) => ({
                    ...prevState,
                    visble: "show",
                  }));
                  // fnSetFocus("txtMachineNo")
                } else {
                  // fnSetFocus("gvBackSide_txtSideBack_0")
                }
              }
            } else {
              setlblLog((prevState) => ({
                ...prevState,
                visble: true,
                value: `Product ${strPrdName} not found.`,
              }));
              setTimeout(() => {
                // fcProduct.current.focus();
              }, 300);
            }
          } catch (error) {
            console.error(error, "CatchError");
            const intProduct = strPrdName.indexOf("-", 12);
            if (intProduct > -1) {
              strPrdName =
                strPrdName.substring(0, intProduct) +
                strPrdName.substring(intProduct + 1, intProduct + 11).trim();
              try {
                if (datagetPd.prm_conn_roll_sht_flg == "Y") {
                  settxtRollLeaf((prevState) => ({
                    ...prevState,
                    value: "",
                    visble: "",
                  }));
                  setTimeout(() => {
                    // fcRollleaf.current.focus();
                  }, 300);
                } else {
                  SetMode("SERIAL");
                  settxtMachineNo((prevState) => ({ ...prevState, value: "" }));
                  if (datagetPd.prm_sht_machine_flg == "Y") {
                    settxtMachineNo((prevState) => ({
                      ...prevState,
                      visble: "",
                    }));
                    setTimeout(() => {
                      // fctMachchine.current.focus();
                    }, 300);
                  } else {
                    settxtMachineNo((prevState) => ({
                      ...prevState,
                      visble: "none",
                    }));
                    setTimeout(() => {
                      // fcGvBackSide_txtsideback_0.current.focus();
                    }, 300);
                  }
                }
              } catch (error) {
                setlblLog((prevState) => ({
                  ...prevState,
                  visble: true,
                  value: `Product ${strPrdName} not found.`,
                }));
                setTimeout(() => {
                  // fcProduct.current.focus();
                }, 300);
              }
            } else {
              setlblLog((prevState) => ({
                ...prevState,
                visble: true,
                value: `Product ${strPrdName} not found.`,
              }));
              setTimeout(() => {
                // fcProduct.current.focus();
              }, 300);
            }
          }
        } else {
          setddlProduct((prevState) => ({
            ...prevState,
            value: Product[0].prd_name,
          }));
          settxtLot((prevState) => ({ ...prevState, value: "" }));
          // gvSerial.DataSource = Nothing
          // gvSerial.DataBind()
          setlblLog((prevState) => ({
            ...prevState,
            value: strError,
            visble: "show",
          }));
          setHfMode("LOT");
          // fnSetFocus("txtLot")
        }
      } else {
        setddlProduct((prevState) => ({
          ...prevState,
          value: Product[0].prd_name,
        }));
        settxtLot((prevState) => ({ ...prevState, value: "" }));
        // gvSerial.DataSource = Nothing
        // gvSerial.DataBind()
        setlblLog((prevState) => ({
          ...prevState,
          value: "Invalid lot no.",
          visble: "show",
        }));
        setHfMode("LOT");
        // fnSetFocus("txtLot")
      }
    } else {
      setddlProduct((prevState) => ({
        ...prevState,
        value: Product[0].prd_name,
      }));
      settxtLot((prevState) => ({ ...prevState, value: "" }));
      // gvSerial.DataSource = Nothing
      // gvSerial.DataBind()
      setlblLog((prevState) => ({
        ...prevState,
        value: "Please scan QR Code! / กรุณาสแกนที่คิวอาร์โค้ด",
        visble: "show",
      }));
      setHfMode("LOT");
      // fnSetFocus("txtLot")
    }
  };

  const getCountDataBylot = async () => {};

  const SetMode = async (strMode) => {
    if (strMode == "LOT") {
      setddlProduct((prevState) => ({
        ...prevState,
        disbled: false,
        style: {},
      }));
      settxtLot((prevState) => ({
        ...prevState,
        disbled: false,
        style: {},
        value: "",
      }));
      setlblLog((prevState) => ({ ...prevState, visble: "not show" }));
      // pnlSerial.Visible = False
      setHfMode("LOT");
      // fnSetFocus("txtLot")
    }
    if (strMode == "LOT_ERROR") {
      settxtLot((prevState) => ({
        ...prevState,
        disbled: false,
        style: {},
        value: "",
      }));
      setlblLog((prevState) => ({ ...prevState, visble: "show" }));
      // pnlSerial.Visible = False
      setHfMode("LOT");
      fnSetFocus("txtLot");
    }
    if (strMode == "SERIAL") {
      settxtLot((prevState) => ({
        ...prevState,
        disbled: true,
        style: { background: "#e0e0e0" },
      }));
      setlblLog((prevState) => ({ ...prevState, visble: "not show" }));
      // pnlSerial.Visible = True
      setHfMode("SERIAL");
      await getInitialSerial();
    }
    if (strMode == "SERIAL_ERROR") {
      settxtLot((prevState) => ({
        ...prevState,
        disbled: true,
        style: { background: "#e0e0e0" },
      }));
      setlblLog((prevState) => ({ ...prevState, visble: "show" }));
    }
    if (strMode == "SERIAL_OK") {
      settxtLot((prevState) => ({
        ...prevState,
        disbled: true,
        style: { background: "#e0e0e0" },
      }));
      setlblLog((prevState) => ({ ...prevState, visble: "not show" }));
      await getInitialSerial();
      // fnSetFocus("gvSerial")
    }
    if (strMode == "SERIAL_NG") {
      settxtLot((prevState) => ({
        ...prevState,
        disbled: true,
        style: { background: "#e0e0e0" },
      }));
      setlblLog((prevState) => ({ ...prevState, visble: "not show" }));
    }
  };

  const txtRollLeaf_TextChanged = async () => {
    if (
      txtRollLeaf.value != "" &&
      txtRollLeaf.length === parseInt(hfCheckRollShtDigit)
    ) {
      SetMode("SERIAL");
      if (hfReqMachine == "Y") {
        // pnlMachine.Visible = True
        // fnSetFocus("txtMachineNo")
      } else {
        // fnSetFocus("gvBackSide_txtSideBack_0")
      }
    } else {
      settxtRollLeaf((prevState) => ({ ...prevState, value: "" }));
      // fnSetFocus("txtRollLeaf")
    }
  };

  const txtLotRef_TextChanged = async () => {
    if (txtLotRef.value) {
      let strLotData = txtLotRef.value.toUpperCase().split(";");
      settxtLotRef((prevState) => ({ ...prevState, value: strLotData[0] })); //=strLotData[0]
      if (hfCheckRollSht == "Y") {
        settxtRollLeaf((prevState) => ({
          ...prevState,
          value: "",
          visble: "not show",
        }));
        // fnSetFocus("txtRollLeaf")
      } else {
        SetMode("SERIAL");
        settxtMachineNo((prevState) => ({ ...prevState, value: "" }));
        if (hfReqMachine == "Y") {
          settxtMachineNo((prevState) => ({ ...prevState, visble: "Show" }));
          // fnSetFocus("txtMachineNo")
        } else {
          // fnSetFocus("gvBackSide_txtSideBack_0")
        }
      }
    }
  };

  const getInitialSheet = async () => {
    const dtData1 = [];
    for (let intRow = 1; intRow <= parseInt(hfShtScan); intRow++) {
      const drRow = {
        SEQ:
          hfBarcodeSide === "F"
            ? `Back Side ${intRow} :`
            : `Front Side ${intRow} :`,
      };
      dtData1.push(drRow);
    }
    // gvBackSide.DataSource = dtData1
    // gvBackSide.DataBind()
    return dtData1;
  };

  useEffect(() => {
    const fetchData = async () => {
      await getInitialSerial();
    };
    fetchData();
  }, [hfShtScan, hfSerialCount]);

  const getInputSerial = async () => {
    const dtData = [];
    let intRow = 0;
    let strFrontSide = "";
console.log(GvSerial.value,'gvgvgvgvgv')
  for (let intSeq = 0; intSeq < GvSerial.value.length; intSeq++) {
    intRow++;
    const hfType = GvSerial.value[intSeq].TYPE; 
    const serialValue =txtSerial[intSeq] 
    console.log(hfType,serialValue,'------------')
    if (hfType === "SHT") {
      strFrontSide = serialValue;
    }else if ( txtSideBack.value[intSeq] !== "" && strFrontSide !== "") {

      const drRow = {
        SHEET: GvSerial.value[intSeq].SHEET,
        BACK_SIDE: txtSideBack.value[intSeq],
        FRONT_SIDE: strFrontSide,
        SEQ: GvSerial.value[intSeq].SEQ,
        SERIAL: txtSerial[intSeq],
        SCAN_RESULT: "",
        REMARK: "",
        UPDATE_FLG: "N",
        MACHINE: txtMachineNo.value,
        MASTER_NO: "",
        BOARD_NO_F: "",
        BOARD_NO_B: ""
      };
      dtData.push(drRow); // เพิ่มแถวข้อมูลเข้าไปใน array
    }
  }
  console.log(dtData,'getInputSerial')
  return dtData; // ส่งคืนข้อมูลที่ได้
  }

  const getInitialSerial = async () => {
    console.log(
      hfShtScan,
      hfSerialCount,
      hfBarcodeSide,
      "hfSerialCounthfSerialCount"
    );
    const dtData = [];
    for (let intSht = 1; intSht <= parseInt(hfShtScan); intSht++) {
      const drRowSht = {
        SHEET:
          hfBarcodeSide === "F"
            ? `Front Side ${intSht} :`
            : `Back Side ${intSht} :`,
        SEQ: 0,
        TYPE: "SHT",
      };
      dtData.push(drRowSht);
      console.log(drRowSht, "drRowSht");
      for (let intRow = 1; intRow <= parseInt(hfSerialCount); intRow++) {
        const drRow = {
          SHEET: intSht,
          SEQ: intRow,
          TYPE: "PCS",
        };
        dtData.push(drRow);
      }
    }
    setGvSerial((prevState) => ({
      ...prevState,
      visble: true,
      value: dtData,
    }));
    console.log(dtData, "getInitialSerial");
    // setGvSerial((prevState)=>({...prevState,value:dtData}))
    return dtData;
  };

  const setSerialData = async () => {};

  const getProductSerialMaster = async (strPrdName) => {
    let data = [];
    setHfSerialLength("0");
    setHfSerialFixFlag("N"); //= "N"
    setHfSerialDigit(""); //= ""
    setHfSerialStartDigit("0"); //= "0"
    setHfSerialEndDigit("0"); //= "0"
    setHfTrayFlag(""); //= ""
    setHfTrayLength("0"); //= "0"
    setHfTestResultFlag(""); // = ""
    setHfConfigCheck("N"); // = "N"
    setHfConfigCode(""); // = ""
    setHfConfigStart("0"); //= "0"
    setHfConfigEnd("0"); //= "0"
    setHfConfigRuning("N"); //= "N"
    setHfDuplicateStart("0"); //= "0"
    setHfDuplicateEnd("0"); //= "0"
    setHfChipIDCheck("N"); //= "N" //may
    setHfCheckPrdSht("N"); //= "N"
    setHfCheckPrdShtStart("0"); //= "0"
    setHfCheckPrdShtEnd("0"); // = "0"
    setHfCheckPrdAbbr(""); // = ""
    setHfPlasmaCheck("N"); //= "N" //may
    setHfPlasmaTime("0"); //= "0" //may
    setHfCheckStartSeq("N"); //= "N"
    setHfCheckStartSeqCode(""); //= ""
    setHfCheckStartSeqStart("0"); // = "0"
    setHfCheckStartSeqEnd("0"); //= "0"
    setHfCheckDateInProc("N"); //= "N"
    setHfDateInProc(""); //= ""
    setHfCheckWeekCode("N"); //= "N"
    setHfCheckWeekCodeStart(""); //= ""
    setHfCheckWeekCodeEnd(""); //= ""
    setHfWeekCode(""); //= ""
    setHfWeekCodeType(""); //= ""
    setHfSerialStartCode(""); //= ""

    await axios
      .post("/api/common/GetSerialProductByProduct", {
        prdName: strPrdName,
      })
      .then((res) => {
        console.log("GetSerialProductByProduct", res.data);
        data = res.data[0];
        if (data != null) {
          setHfSerialLength(data.slm_serial_length);
          setHfSerialFixFlag(data.slm_fix_flag);
          setHfSerialDigit(data.slm_fix_digit);
          setHfSerialStartDigit(data.slm_fix_start_digit);
          setHfSerialEndDigit(data.slm_fix_end_digit);
          setHfTrayFlag(data.slm_tray_flag);
          setHfTrayLength(data.slm_tray_length);
          setHfTestResultFlag(data.slm_test_result_flag);
          setHfSerialCount(data.slm_serial_sht);
          setHfAutoScan(data.slm_auto_scan);
          setHfBarcodeSide(data.slm_barcode_side);
          setHfShtScan(data.slm_sht_scan);
          setHfConfigCheck(data.prm_barcode_req_config);
          setHfConfigCode(data.prm_config_code);
          setHfConfigStart(data.prm_start_config);
          setHfConfigEnd(data.prm_end_config);
          setHfConfigRuning(data.prm_running_req_config);
          setHfDuplicateStart(data.prm_duplicate_start);
          setHfDuplicateEnd(data.prm_duplicate_end);
          setHfCheckPrdSht(data.prm_req_check_prd_sht);
          setHfCheckPrdShtStart(data.prm_check_prd_sht_start);
          setHfCheckPrdShtEnd(data.prm_check_prd_sht_end);
          setHfCheckPrdAbbr(data.prm_abbr);
          setHfCheckLotSht(data.prm_req_check_lot_sht);
          setHfCheckLotShtStart(data.prm_check_lot_sht_start);
          setHfCheckLotShtEnd(data.prm_check_lot_sht_end);
          setHfCheckStartSeq(data.prm_req_start_seq_flg);
          setHfCheckStartSeqCode(data.prm_start_seq_code);
          setHfCheckStartSeqStart(data.prm_start_seq_start);
          setHfCheckStartSeqEnd(data.prm_start_seq_end);
          setHfCheckSheetELT(data.prm_sheet_elt_flg);
          setHfCheckRollSht(data.prm_conn_roll_sht_flg);
          setHfCheckRollShtDigit(data.prm_conn_roll_sht_length);
          setHfCheckDateInProc(data.prm_date_inproc_flg);
          setHfDateInProc(data.prm_date_inproc);
          setHfWeekCodeType(data.prm_date_type);
          setHfCheckWeekCode(data.prm_check_weekcode_flg);
          setHfCheckWeekCodeStart(data.prm_check_weekcode_start);
          setHfCheckWeekCodeEnd(data.prm_check_weekcode_end);
          setHfCheckPreAOIF(data.prm_sht_pre_aoi_f);
          setHfCheckPreAOIB(data.prm_sht_pre_aoi_b);
          setHfCheckAOIF(data.prm_sht_aoi_f);
          setHfCheckAOIB(data.prm_sht_aoi_b);
          setHfCheckAOICoatF(data.prm_sht_aoi_coat_f);
          setHfCheckAOICoatB(data.prm_sht_aoi_coat_b);
          setHfCheckSPIF(data.prm_sht_spi_f);
          setHfCheckSPIB(data.prm_sht_spi_b);
          setHfReqMachine(data.prm_sht_machine_flg);
          setHfBarcodeGrade(data.prm_barcode_grade);
          setHfConnRollLength(data.prm_conn_roll_length);
          setHfConnLeafLength(data.prm_conn_leaf_length);
          setHfCheckRollPrdFlg(data.prm_conn_roll_prd_flg);
          setHfCheckRollPrdStart(data.prm_conn_roll_prd_start);
          setHfCheckRollPrdEnd(data.prm_conn_roll_prd_end);
          setHfCheckRollPrd(data.prm_conn_roll_prd_fix);
          setHfSerialStartCode(data.prm_serial_start_code);
          setHfSerialInfo(data.prm_additional_info);
          setHfCheckXrayF(data.prm_sht_xray_f);
          setHfCheckXrayB(data.prm_sht_xray_b);
          setHfCheckXrayOneTime(data.prm_sht_xray_1_time_flg);
          setHfCheckFinInspect(data.prm_fin_gate_inspect_flg);
          setHfCheckFinInspectProc(data.prm_fin_gate_inspect_proc);
        }
      });
    return data;
  };

  return { Product, ddlProduct, txtLot_TextChanged, txtLot, settxtLot, lblLog ,btnSave_Click,GvSerial};
}

export { fn_P1ConnectBoard };
