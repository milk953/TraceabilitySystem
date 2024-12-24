import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import ExcelJS from "exceljs";
import { useLoading } from "../../loading/fn_loading";
import {DataConfig} from "../Common/function_Common"; 
function fn_P1ConnectBoard() {
  const{ConfigData} = DataConfig();
    const { showLoading, hideLoading } = useLoading();
  const [Product, setProduct] = useState([]);

  const [txtLot, settxtLot] = useState({
    value: "",
    disbled: "",
    visble: "",
    style: {},
  });
  const [ddlProduct, setddlProduct] = useState({
    value: "",
    disbled: "",
    visble: "",
    style: {},
  });
  const [txtLotRef, settxtLotRef] = useState({
    value: "",
    disbled: "",
    visble: "",
    style: {},
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
    style: {},
  });
  const [txtMachineNo, settxtMachineNo] = useState({
    value: "",
    disbled: "",
    visble: "none",
    style: {},
  });
  const [lblLog, setlblLog] = useState({
    value: "",
    disbled: "",
    visble: false,
    style: "",
  });
  const [lblResult, setlblResult] = useState({
    value: "",
    disbled: "",
    visble: "none",
    style: "",
  });
  const [GvSerial, setGvSerial] = useState({
    value: "",
    disbled: "",
    visble: "none",
    style: "",
  });
  const [GvBackSide, setGvBackSide] = useState({
    value: "",
    disbled: "",
    visble: "none",
    style: "",
  });

  const [GvFrontSide, setGvFrontSide] = useState({
    value: "",
    disbled: "",
    visble: "none",
    style: "",
  });

  const [gvScanResult, setgvScanResult] = useState({
    value: "",
    disbled: "",
    visble: false,
    style: "",
  });

  const [txtSideBack, settxtSideBack] = useState(Array(GvBackSide.value.length).fill(""));
  const [txtSerial, settxtSerial] = useState(Array(GvSerial.value.length).fill(""));

  //Focus
  const fcRollleaf = useRef(null);
  const fctMachchine = useRef(null);
  const fcLotNo = useRef(null);
  const fcProduct = useRef(null);
  const fcGvSerial = useRef([]);
  const fcLotRef = useRef(null);
  const fcGvBackSide = useRef([]);

  //hf
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

  const CONNECT_SERIAL_ERROR = ConfigData.CONNECT_SERIAL_ERROR;
  const AUTO_SCAN_CHECK_FLG = ConfigData.AUTO_SCAN_CHECK_FLG;
  const ROLL_SHT_ROLL_START_DIGIT = ConfigData.ROLL_SHT_ROLL_START_DIGIT;
  const ROLL_SHT_ROLL_LENGTH = ConfigData.ROLL_SHT_ROLL_LENGTH;
  const CONNECT_SERIAL_NOT_FOUND = ConfigData.CONNECT_SERIAL_NOT_FOUND;
  const Fac = ConfigData.FACTORY;
  const EXPORT_CSV_FLG = ConfigData.EXPORT_CSV_FLG;
  
  const hfProcessList = "''MPRN'',''MMOT'',''MREF'',''MAOI''";
  let Now = new Date();
  //Start pageload
  useEffect(() => {
    const PageLoad = async () => {
      setHfMode("");
      GetProductData();
      SetMode("LOT");
    };
    PageLoad();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (hfShtScan != "" && hfSerialCount != "") {
        await getInitialSerial();
        await getInitialSheet();
      }
    };
    fetchData();
  }, [hfShtScan, hfSerialCount]);

  const GetProductData = async () => {
    await axios.get("/api/Common/GetProductData").then((res) => {
      let data = res.data.flat();
      setProduct(data);
      setddlProduct((prevState) => ({ ...prevState, value: data[0].prd_name }));
    });
  };

  const ibtBack_Click = async () => {
    settxtLot((prevState) => ({
      ...prevState,
      value: "",
      disbled: false,
      style: {},
    }));
    // setGvBackSide((prevState) => ({ ...prevState, visble: "none", value: "" }));
    // settxtSideBack(Array(GvBackSide.value.length).fill(""));
        // settxtSerial(Array(GvSerial.value.length).fill(""));
    setGvSerial((prevState) => ({ ...prevState, visble: "none", value: "" }));
    // settxtSerial(Array(GvSerial.value.length).fill(""));
    setlblResult((prevState) => ({
      ...prevState,
      value: "",
      disbled: "",
      visble: "none",
      style: "",
    }));
    setgvScanResult((prevState) => ({
      ...prevState,
      visble: false,
      value: "",
    }));
    setddlProduct((prevState) => ({
      ...prevState,
      value: Product[0].prd_name,
    }));
    SetMode("LOT");
    setTimeout(() => {
      fcLotNo.current.focus();
    }, 300);
  };

  const btnCancel_Click = async () => {
   
    settxtSideBack(Array(GvBackSide.value.length).fill(""));
    settxtSerial(Array(GvSerial.value.length).fill(""));
    setlblResult((prevState) => ({
      ...prevState,
      value: "",
      disbled: "",
      visble: "none",
      style: "",
    }));
    setgvScanResult((prevState) => ({
      ...prevState,
      visble: false,
      value: "",
    }));
    SetMode("SERIAL");
    setTimeout(() => {
      fcGvBackSide.current[0].focus();
    }, 300);
  };

  const btnSave_Click = async () => {
    console.log(hfMode, "hfMode");
    if (hfMode == "SERIAL") {
      setSerialData();
    }
  };

  const ddlProduct_SelectedIndexChanged = async (Sl_Product) => {
    let data = await getProductSerialMaster(Sl_Product);
    console.log(data, "data.prm_conn_roll_sht_length0");
    if (txtLot.value != "") {
      setlblLog((prevState) => ({ ...prevState, value: "", visble: false }));
      getCountDataBylot(txtLot.value);
      getInitialSheet();
      console.log(data.prm_conn_roll_sht_flg, "data.prm_conn_roll_sht_length");
      if (data.prm_conn_roll_sht_flg == "Y") {
        settxtRollLeaf((prevState) => ({
          ...prevState,
          visble: "",
          value: "",
        }));
        setTimeout(() => {
          fcRollleaf.current.focus();
        }, 300);
      } else {
        SetMode("SERIAL");
        settxtMachineNo((prevState) => ({ ...prevState, value: "" }));
        if (data.prm_sht_machine_flg == "Y") {
          settxtMachineNo((prevState) => ({ ...prevState, visble: "" }));

          setTimeout(() => {
            fctMachchine.current.focus();
          }, 300);
        } else {
          setTimeout(() => {
            if (GvBackSide.length > 0) {
              fcGvBackSide.current[0].focus();
            }
          }, 300);
        }
      }
    } else {
      SetMode("LOT");
      setddlProduct((prevState) => ({
        ...prevState,
        value: Product[0].prd_name,
      }));
    }
  };

  const txtLot_TextChanged = async () => {
    let strLotData = [];
    let strLot = "";
    let strPrdName = "";
    let strError = "";
    if (txtLot.value != "") {
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
        settxtRollLeaf((prevState) => ({ ...prevState, visble: "none" }));
        if (strPrdName != "") {
          await axios
            .post("/api/P1ConnectBoard/GetConfirmToolingByLot", {
              strLot: strLot,
              strProcList: hfProcessList,
            })
            .then((res) => {
              strError = res.data;
              console.log(res.data, "strPrdName");
            });
          if (strError == "") {
            setlblLog((prevState) => ({
              ...prevState,
              value: "",
              visble: false,
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
                    visble: "",
                  }));
                  setTimeout(() => {
                    fcRollleaf.current.focus();
                  }, 300);
                } else {
                  SetMode("SERIAL");
                  if (data.prm_sht_machine_flg == "Y") {
                    settxtMachineNo((prevState) => ({
                      ...prevState,
                      visble: "",
                    }));
                    setTimeout(() => {
                      fctMachchine.current.focus();
                    }, 300);
                  } else {
                    setTimeout(() => {
                      fcGvBackSide.current[0].focus();
                    }, 300);
                  }
                }
              } else {
                setlblLog((prevState) => ({
                  ...prevState,
                  visble: true,
                  value: `Product ${strPrdName} not found.`,
                }));
                setTimeout(() => {
                  fcProduct.current.focus();
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
                      fcRollleaf.current.focus();
                    }, 300);
                  } else {
                    SetMode("SERIAL");
                    settxtMachineNo((prevState) => ({
                      ...prevState,
                      value: "",
                    }));

                    if (datagetPd.prm_sht_machine_flg == "Y") {
                      settxtMachineNo((prevState) => ({
                        ...prevState,
                        visble: "",
                      }));
                      setTimeout(() => {
                        fctMachchine.current.focus();
                      }, 300);
                    } else {
                      settxtMachineNo((prevState) => ({
                        ...prevState,
                        visble: "none",
                      }));
                      setTimeout(() => {
                        if (GvBackSide.length > 0) {
                          fcGvBackSide.current[0].focus();
                        }
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
                    fcProduct.current.focus();
                  }, 300);
                }
              } else {
                setlblLog((prevState) => ({
                  ...prevState,
                  visble: true,
                  value: `Product ${strPrdName} not found.`,
                }));
                setTimeout(() => {
                  fcProduct.current.focus();
                }, 300);
              }
            }
          } else {
            setddlProduct((prevState) => ({
              ...prevState,
              value: Product[0].prd_name,
            }));
            settxtLot((prevState) => ({
              ...prevState,
              value: "",
              visble: false,
            }));
            setGvSerial((prevState) => ({
              ...prevState,
              value: "",
              visble: "none",
            }));
            settxtSerial(Array(GvSerial.value.length).fill(""));
            setlblLog((prevState) => ({
              ...prevState,
              value: strError,
              visble: true,
            }));
            setHfMode("LOT");
            setTimeout(() => {
              fcLotNo.current.focus();
            }, 300);
          }
        } else {
          setddlProduct((prevState) => ({
            ...prevState,
            value: Product[0].prd_name,
          }));
          settxtLot((prevState) => ({ ...prevState, value: "" }));
          setGvSerial((prevState) => ({ ...prevState, visble: "none" }));
          settxtSerial(Array(GvSerial.value.length).fill(""));
          setlblLog((prevState) => ({
            ...prevState,
            value: "Invalid lot no.",
            visble: true,
          }));
          setHfMode("LOT");
          setTimeout(() => {
            fcLotNo.current.focus();
          }, 300);
        }
      } else {
        setddlProduct((prevState) => ({
          ...prevState,
          value: Product[0].prd_name,
        }));
        settxtLot((prevState) => ({ ...prevState, value: "" }));
        setGvSerial((prevState) => ({ ...prevState, visble: "none", value: "" }));
        settxtSerial(Array(GvSerial.value.length).fill(""));
        setlblLog((prevState) => ({
          ...prevState,
          value: "Please scan QR Code! / กรุณาสแกนที่คิวอาร์โค้ด",
          visble: true,
        }));
        setHfMode("LOT");
        setTimeout(() => {
          fcLotNo.current.focus();
        }, 300);
      }
    }
  };

  const getCountDataBylot = async (strLot) => {
    let TotalSht = 0;
    let TotalPcs = 0;
    console.log(strLot, Fac, "strLot");
    await axios
      .post("/api/Common/getlotserialcountdata", {
        dataList: {
          strLotNo: strLot,
          strPlantCode: Fac,
        },
      })
      .then((res) => {
        if (res.data.length > 0) {
          TotalPcs = res.data[0].count_pcs;
          TotalSht = res.data[0].count_sht;
        }

        setlblTotalPcs((prevState) => ({ ...prevState, value: TotalPcs }));
        setlblTotalSht((prevState) => ({ ...prevState, value: TotalSht }));
      });
  };

  const SetMode = async (strMode) => {
    console.log(strMode, "Modeee1");
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
      setlblLog((prevState) => ({ ...prevState, visble: false }));
      setGvBackSide((prevState) => ({ ...prevState, visble: "none", value: "" }));
      settxtSideBack(Array(GvBackSide.value.length).fill(""));
      settxtSerial(Array(GvSerial.value.length).fill(""));
      setGvSerial((prevState) => ({ ...prevState, visble: "none", value: "" }));
      settxtLotRef((prevState) => ({...prevState, value: ""}));
      setlblTotalSht((prevState) => ({ ...prevState, value: "" }));
      setlblTotalPcs((prevState) => ({ ...prevState, value: "" }));
      setHfMode("LOT");
      setTimeout(() => {
        fcLotNo.current.focus();
      }, 300);
    }
    if (strMode == "LOT_ERROR") {
      settxtLot((prevState) => ({
        ...prevState,
        disbled: false,
        style: {},
        value: "",
      }));
      setlblLog((prevState) => ({ ...prevState, visble: true }));
      setGvSerial((prevState) => ({ ...prevState, visble: false }));
      setHfMode("LOT");
      setTimeout(() => {
        fcLotNo.current.focus();
      }, 300);
    }
    if (strMode == "SERIAL") {
      settxtLot((prevState) => ({
        ...prevState,
        disbled: true,
        style: { background: "#e0e0e0" },
      }));
      setlblLog((prevState) => ({ ...prevState, visble: false }));
      setGvSerial((prevState) => ({ ...prevState, visble: "" }));
      setHfMode("SERIAL");
      await getInitialSerial();
    }
    if (strMode == "SERIAL_ERROR") {
      settxtLot((prevState) => ({
        ...prevState,
        disbled: true,
        style: { background: "#e0e0e0" },
      }));
      setlblLog((prevState) => ({ ...prevState, visble: true }));
    }
    if (strMode == "SERIAL_OK") {
      settxtLot((prevState) => ({
        ...prevState,
        disbled: true,
        style: { background: "#e0e0e0" },
      }));
      setlblLog((prevState) => ({ ...prevState, visble: false }));
      await getInitialSerial();

      setTimeout(() => {
        fcGvSerial.current[0].focus();
      }, 300);
    }
    if (strMode == "SERIAL_NG") {
      settxtLot((prevState) => ({
        ...prevState,
        disbled: true,
        style: { background: "#e0e0e0" },
      }));
      setlblLog((prevState) => ({ ...prevState, visble: false }));
    }
  };

  const txtRollLeaf_TextChanged = async () => {
    console.log(txtRollLeaf.value.length, hfCheckRollShtDigit, "txtRollLeaf");
    if (
      txtRollLeaf.value != "" &&
      txtRollLeaf.value.length === parseInt(hfCheckRollShtDigit)
    ) {
      SetMode("SERIAL");
      settxtMachineNo((prevState) => ({ ...prevState, value: "" }));
      if (hfReqMachine == "Y") {
        settxtMachineNo((prevState) => ({ ...prevState, visble: "" }));
        setTimeout(() => {
          fctMachchine.current.focus();
        }, 300);
      } else {
        setTimeout(() => {
          fcGvBackSide.current[0].focus();
        }, 300);
      }
    } else {
      settxtRollLeaf((prevState) => ({ ...prevState, value: "" }));
      setTimeout(() => {
        fcRollleaf.current.focus();
      }, 300);
    }
  };

  const txtLotRef_TextChanged = async () => {
    if (txtLotRef.value != "") {
      let strLotData = txtLotRef.value.toUpperCase().split(";");
      settxtLotRef((prevState) => ({ ...prevState, value: strLotData[0] })); //=strLotData[0]
      if (hfCheckRollSht == "Y") {
        settxtRollLeaf((prevState) => ({
          ...prevState,
          value: "",
          visble: "",
        }));
        setTimeout(() => {
          fcRollleaf.current.focus();
        }, 300);
      } else {
        SetMode("SERIAL");
        settxtMachineNo((prevState) => ({ ...prevState, value: "" }));
        if (hfReqMachine == "Y") {
          settxtMachineNo((prevState) => ({ ...prevState, visble: "" }));
          setTimeout(() => {
            fctMachchine.current.focus();
          }, 300);
        } else {
          setTimeout(() => {
            fcGvBackSide.current[0].focus();
          }, 300);
        }
      }
    }
  };

  const getInitialSheet = async () => {
    const dtData1 = [];
    console.log(hfShtScan, hfBarcodeSide, "hfShtScanhfShtScan");
    for (let intRow = 1; intRow <= parseInt(hfShtScan); intRow++) {
      const drRow = {
        SEQ:
          hfBarcodeSide === "F"
            ? `Back Side ${intRow} :`
            : `Front Side ${intRow} :`,
      };
      dtData1.push(drRow);
    }
        settxtSideBack(Array(GvBackSide.value.length).fill(""));

    setGvBackSide((prevState) => ({
      ...prevState,
      value: dtData1,
      visble: "",
    }));
    return dtData1;
  };

  const getInputSerial = async () => {
    const dtData = [];
    let intRow = 0;
    let strFrontSide = "";
    console.log(txtSideBack, GvSerial.value, "txtSideBack");
    for (let intSeq = 0; intSeq < GvSerial.value.length; intSeq++) {
      intRow++;
      const hfType = GvSerial.value[intSeq].TYPE;
      const serialValue = txtSerial[intSeq];

      if (hfType === "SHT") {
        strFrontSide = serialValue;
      } else if (txtSideBack[intSeq] !== "" && strFrontSide !== "") {
        const drRow = {
          SHEET: GvSerial.value[intSeq].SHEET,
          BACK_SIDE: txtSideBack[GvSerial.value[intSeq].SHEET - 1],
          FRONT_SIDE: strFrontSide,
          SEQ: GvSerial.value[intSeq].SEQ,
          SERIAL: txtSerial[intSeq],
          SCAN_RESULT: "",
          REMARK: "",
          UPDATE_FLG: "N",
          MACHINE: txtMachineNo.value,
          MASTER_NO: "",
          BOARD_NO_F: "",
          BOARD_NO_B: "",
        };
        dtData.push(drRow);
      }
    }
    console.log(dtData, "getInputSerial");
    return dtData;
  };

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
            settxtSerial(Array(GvSerial.value.length).fill(""));
    setGvSerial((prevState) => ({
      ...prevState,
      value: dtData,
      visble: "",
    }));
    console.log(dtData, "getInitialSerial");
    return dtData;
  };

  const getConnectRollSheetData = async (
    _dtSerial,
    _strProduct,
    _strRollLeaf
  ) => {
    let _dtData = [];
    let _intRollRow = 1;
    let _intRow = 0;
    let _strShtNoOld = "";
    let _strRollNo = "";
    _strRollNo = _strRollLeaf.substring(
      ROLL_SHT_ROLL_START_DIGIT - 1,
      ROLL_SHT_ROLL_LENGTH
    );
    console.log("getConnectRollSheetData", _strRollNo);
    for (let _drRow = 0; _drRow < _dtSerial.length; _drRow++) {
      if (
        _dtSerial[_drRow].FRONT_SIDE != _strShtNoOld &&
        _dtSerial[_drRow].FRONT_SIDE != ""
      ) {
        _intRow += 1;
        const drRow = {
          ROLL_SEQ: _intRollRow,
          SHT_SEQ: _intRow,
          ROLL_NO: _strRollNo,
          ROLL_LEAF: _strRollLeaf,
          SHT_NO: _dtSerial[_drRow].FRONT_SIDE,
          SCAN_RESULT: "",
          REMARK: "",
          ROW_UPDATE: "Y",
          UPDATE_FLG: "N",
          MACHINE: txtMachineNo.value,
          PRODUCT: _strProduct,
        };
      }
    }
    return _dtData;
  };

  const setSerialData = async () => {
    showLoading('กำลังบันทึก กรุณารอสักครู่')
    try {
      let dtSerial = await getInputSerial();
      console.log(dtSerial, "dtSerialxxxxxxx");
      let _strLotData;
      let _strLotRefData;
      let _strLot = "";
      let _strLotRef = "";
      let _strPrdName = ddlProduct.SelectedValue;
      let _strShtNoBack = "";
      let _strShtNoFront = "";
      let _strTray = " ";
      let _intSeq = 1;
      let _strScanResultAll = "OK";
      let _strErrorAll = "";
      let _strUpdateError = "";
      setHfWeekCode("");
      let dataHfWeekCode = "";
      let _bolError = false;
      const CheckFontSideBackSide = dtSerial.every(item => item.BACK_SIDE === ""||item.BACK_SIDE === undefined||item.FRONT_SIDE === ""||item.FRONT_SIDE === undefined);
      if (dtSerial.length == 0||CheckFontSideBackSide) {
        hideLoading();
        setlblLog((prevState) => ({
          ...prevState,
          value: `Please input Sheet Side No.`,
          visble: true,
        }));
        setlblResult((prevState) => ({
          ...prevState,
          value: '',
        }));
        setgvScanResult((prevState) => ({ ...prevState, visble: "", value: "" }));
        // setgvSerial((prevState) => ({ ...prevState, visble: "none", value: "" }));
        setTimeout(() => {
        fcGvBackSide.current[0].focus();
      }, 300);
        return;        
      }
      const allSerialEmpty = dtSerial.every(item => item.SERIAL === ""||item.SERIAL === undefined);
      console.log(allSerialEmpty, "allSerialEmpty");
      if(allSerialEmpty){
        hideLoading();
        setlblLog((prevState) => ({
          ...prevState,
          value: `Please Input Serial No.`,
          visble: true,
        }));
        setlblResult((prevState) => ({
          ...prevState,
          value: '',
        }));
        setgvScanResult((prevState) => ({ ...prevState, visble: "", value: "" }));
        // setgvSerial((prevState) => ({ ...prevState, visble: "none", value: "" }));
        setTimeout(() => {
        fcGvSerial.current[1].focus();
      }, 300);
        return;  
      }
      _strLotData = txtLot.value.toUpperCase().split(";");
      _strLot = _strLotData[0];
      _strLotRefData =  txtLotRef.value.toUpperCase().split(";");
      _strLotRef = txtLotRef.value;
      setlblLog((prevState) => ({ ...prevState, visble: false }));
      if (txtLot.value != "" && dtSerial.length > 0) {
        if (hfCheckWeekCode == "Y") {
          await axios
            .post("/api/common/GetWeekCodebyLot", {
              _strLot: _strLot,
              _strProc: hfDateInProc,
              _strWeekType: hfWeekCodeType,
              _strSerialInfo: hfSerialInfo,
            })
            .then((res) => {
              console.log("GetWeekCodebyLot", res.data);
              dataHfWeekCode = res.data;
              setHfWeekCode(res.data);
            });
        }
        let _intRowSerial = 0;

        for (let drRow = 0; drRow < dtSerial.length; drRow++) {
          if (hfCheckPrdSht == "Y" && parseInt(dtSerial[drRow].SEQ, 10) == 1) {
            _strShtNoBack = dtSerial[drRow].BACK_SIDE;
            _strShtNoFront = dtSerial[drRow].FRONT_SIDE;
            if (
              hfCheckPrdAbbr !==
              _strShtNoBack.substring(
                parseInt(hfCheckPrdShtStart, 10) - 1,
                parseInt(hfCheckPrdShtEnd, 10)
              )
            ) {
              _strScanResultAll = "NG";
              _strErrorAll = "Sheet product mix";
              _bolError = true;
            }
            if (
              hfCheckPrdAbbr !==
              _strShtNoFront.substring(
                parseInt(hfCheckPrdShtStart, 10) - 1,
                parseInt(hfCheckPrdShtEnd, 10)
              )
            ) {
              _strScanResultAll = "NG";
              _strErrorAll = "Sheet product mix";
              _bolError = true;
            }
          }
          if (hfCheckLotSht == "Y" && parseInt(dtSerial[drRow].SEQ, 10) == 1) {
            _strShtNoBack = dtSerial[drRow].BACK_SIDE;
            _strShtNoFront = dtSerial[drRow].FRONT_SIDE;
            console.log(
              "if นี้ค้าบ1",
              _strLotRef,
              _strShtNoBack.substring(
                parseInt(hfCheckLotShtStart, 10) - 1,
                parseInt(hfCheckLotShtEnd, 10)
              )
            );
            if (
              _strLotRef !==
              _strShtNoBack.substring(
                parseInt(hfCheckLotShtStart, 10) - 1,
                parseInt(hfCheckLotShtEnd, 10)
              )
            ) {
              _strScanResultAll = "NG";
              _strErrorAll = "Sheet lot mix";
              _bolError = true;
              console.log("ตรวนี้1", _strErrorAll);
            }
            console.log(
              "if นี้ค้าบ2",
              _strLotRef,
              _strShtNoBack.substring(
                parseInt(hfCheckLotShtStart, 10) - 1,
                parseInt(hfCheckLotShtEnd, 10)
              )
            );
            if (
              _strLotRef !==
              _strShtNoFront.substring(
                parseInt(hfCheckLotShtStart, 10) - 1,
                parseInt(hfCheckLotShtEnd, 10)
              )
            ) {
              _strScanResultAll = "NG";
              _strErrorAll = "Sheet lot mix";
              _bolError = true;
              console.log("ตรวนี้2", _strErrorAll);
            }
          }
          if (hfReqMachine == "Y") {
            if (
              txtMachineNo.value == "" ||
              txtMachineNo.value == CONNECT_SERIAL_ERROR ||
              txtMachineNo.value == CONNECT_SERIAL_NOT_FOUND
            ) {
              _strScanResultAll = "NG";
              _strErrorAll = "Invalid machine no";
              _bolError = true;
            }
          }
          if (
            dtSerial[drRow].SERIAL != "" &&
            dtSerial[drRow].SERIAL != undefined
          ) {
            let _strSerial = dtSerial[drRow].SERIAL;
            let _strTestResult = "NONE";
            let _strMessageUpdate = "";
            let _strScanResultUpdate = "";

            if (_strSerial != CONNECT_SERIAL_ERROR) {
              let isDuplicate = dtSerial.some((item, index) => {
                console.log(
                  `Checking duplicate ${index + 1}: ${
                    item.SERIAL
                  } -----  ${_strSerial}`
                );
                return index !== _intRowSerial && _strSerial === item.SERIAL;
              });

              if (isDuplicate) {
                _strScanResultUpdate = "NG";
                _strMessageUpdate = "Serial duplicate / หมายเลขบาร์โค้ดซ้ำ";
                console.log("ซ้ำตรงนี้1", _strMessageUpdate);
                _strScanResultAll = "NG";
                _bolError = true;
              }
              if (_strSerial.length == parseInt(hfSerialLength, 10)) {
                let _strFixDigit = "";
                _strFixDigit = _strSerial.substring(
                  parseInt(hfSerialStartDigit, 10) - 1,
                  parseInt(hfSerialEndDigit, 10)
                );
                if (_strFixDigit != hfSerialDigit) {
                  _strScanResultUpdate = "NG";
                  _strMessageUpdate =
                    "Serial barcode mix product / หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
                  _strScanResultAll = "NG";
                  _bolError = true;
                } else if (hfConfigCheck == "Y") {
                  let _strConfigDigit = "";
                  _strConfigDigit = _strSerial.substring(
                    parseInt(hfConfigStart, 10) - 1,
                    parseInt(hfConfigEnd, 10)
                  );
                  if (_strConfigDigit != hfConfigCode) {
                    _strScanResultUpdate = "NG";
                    _strMessageUpdate =
                      "Serial barcode mix product / หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
                    _strScanResultAll = "NG";
                    _bolError = true;
                  }
                }
                if (hfSerialStartCode != "" && _bolError == false) {
                  if (
                    _strSerial.substring(0, hfSerialStartCode.length) !==
                    hfSerialStartCode
                  ) {
                    _strScanResultUpdate = "NG";
                    _strMessageUpdate =
                      "Serial barcode mix product / หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
                    _strScanResultAll = "NG";
                    _bolError = true;
                  }
                }
                if (hfCheckStartSeq == "Y" && _strScanResultUpdate != "NG") {
                  let _strStartSeq = "";
                  _strStartSeq = _strSerial.substring(
                    parseInt(hfCheckStartSeqStart, 10) - 1,
                    parseInt(hfCheckStartSeqEnd, 10)
                  );
                  if (_strStartSeq != hfCheckStartSeqCode) {
                    _strScanResultUpdate = "NG";
                    _strMessageUpdate =
                      "Serial barcode mix product / หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
                    _strScanResultAll = "NG";
                    _bolError = true;
                  }
                }
                if (hfCheckWeekCode == "Y" && _strScanResultUpdate == "NG") {
                  let _strWeekCode = "";
                  _strWeekCode = _strSerial.substring(
                    parseInt(hfCheckWeekCodeStart, 10) - 1,
                    parseInt(hfCheckWeekCodeEnd, 10)
                  );
                  if (_strWeekCode != dataHfWeekCode) {
                    _strScanResultUpdate = "NG";
                    _strMessageUpdate =
                      "Serial barcode mix week cod / หมายเลขบาร์โค้ดปนรหัสสัปดาห์กัน";
                    _strScanResultAll = "NG";
                    _bolError = true;
                  }
                }
                // --------------------------------------------------------------
              } else {
                _strScanResultUpdate = "NG";
                _strMessageUpdate =
                  "Serial not matching product / หมายเลขบาร์โค้ดไม่ตรงตามที่กำหนดไว้";
                _strScanResultAll = "NG";
                _bolError = true;
              }
              if (_strScanResultUpdate != "NG") {
                let _intSerialCount = 0;
                let _strSerialLot = "";

                await axios
                  .post("/api/P1ConnectBoard/GetCheckConfirmMagazineBySerial", {
                    dataList: {
                      strSerial: _strSerial,
                      strPlantCode: Fac,
                    },
                  })
                  .then((res) => {
                    console.log("GetCheckConfirmMagazineBySerial", res.data);

                    let data = res.data[0];
                    _strSerialLot = data.LOT_NO;
                    _intSerialCount = data.LOT_COUNT;
                  });

                if (_intSerialCount == 0) {
                  _strScanResultUpdate = "NG";
                  _strMessageUpdate =
                    "Serial not record data / หมายเลขบาร์โค้ดยังไม่บันทึกข้อมูล";
                  _strScanResultAll = "NG";
                  _bolError = true;
                } else if (_strSerialLot != _strLot) {
                  _strScanResultUpdate = "NG";
                  _strMessageUpdate = "Serial duplicate / หมายเลขบาร์โค้ดซ้ำ";
                  console.log("ซ้ำตรงนี้2", _strMessageUpdate);
                  _strScanResultAll = "NG";
                  _bolError = true;
                }
              }
              if (_strScanResultUpdate != "NG") {
                let _intCountSeq = 0;
                let start = parseInt(hfDuplicateStart) - 1;
                let end = parseInt(hfDuplicateEnd);
                let serialSubString = _strSerial.substring(start, end);
                await axios
                  .post("/api/Common/GetSerialDuplicateConnectSht", {
                    dataList: {
                      strLssSerialNo: serialSubString,
                      strPlantCode: Fac,
                    },
                  })
                  .then((res) => {
                    console.log("GetSerialDuplicateConnectSht", res.data);
                    _intCountSeq = res.data;
                  });
                if (_intCountSeq > 0) {
                  _strScanResultUpdate = "NG";
                  _strMessageUpdate = "Serial duplicate / หมายเลขบาร์โค้ดซ้ำ";
                  console.log("ซ้ำตรงนี้3", _strMessageUpdate);
                  _strScanResultAll = "NG";
                  _bolError = true;
                }
              }
            } else {
              _strMessageUpdate =
                "Bad mark piece / ชิ้นงานเสียทำเครื่องหมายไว้แล้ว";
            }
            console.log("ว่างตรงนี้แหละค้าบบบ1", _strScanResultUpdate);
            dtSerial[drRow].SCAN_RESULT = _strScanResultUpdate;
            dtSerial[drRow].REMARK = _strMessageUpdate;
          }
          _intRowSerial += 1;
        }
        if (hfWeekCodeType == "S" && _bolError == false) {
          let _strReturn = "";
          await axios
            .post("/api/Common/GetShippingSerialNo", {
              strLotNo: _strLotRef,
              dtSerial: dtSerial,
              strWeekType: hfWeekCodeType,
            })
            .then((res) => {
              console.log("GetShippingSerialNo", res.data);
              _strReturn = res.data;
            });
          if (_strReturn != "") {
            _strScanResultAll = "NG";
            _bolError = true;
            if (_strReturn != "NG") {
              setlblLog((prevState) => ({
                ...prevState,
                _strReturn,
                visble: false,
              }));
            }
          }
        }
        console.log("ถึงตรงนี้แล้วค้าบ96", hfCheckSheetELT, _bolError);
        if (hfCheckSheetELT == "Y" && _bolError == false) {
          let _strReturn = "";
          for (let i = 0; i < dtSerial.length; i++) {
            await axios
              .post("/api/Common/setseriallotshtelttable", {
                dataList: {
                  strPrdName: ddlProduct.value,
                  strPlantCode: Fac,
                  strSideF: dtSerial[i].FRONT_SIDE,
                  strSideB: dtSerial[i].BACK_SIDE,
                  strPcsno: dtSerial[i].SEQ,
                  strSerialNo: dtSerial[i].SERIAL,
                  strIntSerialLength: hfSerialLength,
                },
              })
              .then((res) => {
                _strReturn = res.data.p_error;
                console.log(
                  _strReturn,
                  "setseriallotshtelttable",
                  dtSerial[i].SERIAL
                );
              });
            if (_strReturn != "") {
              _strScanResultAll = "NG";
              _bolError = true;
              if (_strReturn != "NG") {
                setlblLog((prevState) => ({
                  ...prevState,
                  visble: true,
                  value: _strReturn,
                }));
              }
            }
          }
        }
        if (!_bolError) {
          for (let drRow = 0; drRow < dtSerial.length; drRow++) {
            if (
              dtSerial[drRow].SERIAL != "" &&
              dtSerial[drRow].SERIAL != undefined
            ) {
              let _intCount = 0;
              let _intCountOK = 0;
              let _intCountNG = 0;
              let _strRemark = "";
              let _strError = "";
              let _strSerial = dtSerial[drRow].SERIAL;
              let _dtSerialAll = [];
              let _bolScanDouble = false;
              let _bolScanDuplicate = false;
              let _strPrdNameOrg = "";
              let _strNG = "NG";
              let _strScanResultUpdate = "OK";
              let _strMessageUpdate = "";
              let _strRejectUpdate = "";
              let _Message = "";
              let _strTestResult = "NONE";
              if (_strSerial == CONNECT_SERIAL_ERROR) {
                _strMessageUpdate =
                  "Bad mark piece / ชิ้นงานเสียทำเครื่องหมายไว้แล้ว";
                _strScanResultUpdate = "OK";
              }
              if (
                AUTO_SCAN_CHECK_FLG == "1" &&
                _strScanResultUpdate != "NG" &&
                _strSerial != CONNECT_SERIAL_ERROR
              ) {
                let _Result = "";
                let _FrontSheetBarcode = "";
                let _RearSheetBarcode = "";
                if (hfBarcodeSide == "F") {
                  _FrontSheetBarcode = dtSerial[drRow].FRONT_SIDE;
                  _RearSheetBarcode = dtSerial[drRow].BACK_SIDE;
                } else {
                  _FrontSheetBarcode = dtSerial[drRow].BACK_SIDE;
                  _RearSheetBarcode = dtSerial[drRow].FRONT_SIDE;
                }
                await axios
                  .post("/api/Common/Get_Spi_aoi_result", {
                    dataList: {
                      _strPlantCode: Fac,
                      _pcsPosition: intShtSeq,
                      _frontSheetNumber: _FrontSheetBarcode,
                      _rearSheetNumber: _RearSheetBarcode,
                      _strProduct: _strPrdName,
                      _Message: _Message,
                    },
                  })
                  .then((res) => {
                    console.log("Get_Spi_aoi_result", res.data);
                    _Result = res.data._strresult;
                    _Message = res.data._strmessage;
                  });
                if (_Result == "NG") {
                  _strScanResultUpdate = _Result;
                }
                _strMessageUpdate = _Message;
              }
              if (_strError != "") {
                _strMessageUpdate = _strError;
                _strScanResultUpdate = "NG";
                _bolError = true;
              }
              console.log("ว่างตรงนี้แหละค้าบบบ2", _strScanResultUpdate);
              dtSerial[drRow].SCAN_RESULT = _strScanResultUpdate;
              dtSerial[drRow].REMARK = _strMessageUpdate;
              if (_strScanResultUpdate == "NG") {
                _strScanResultAll = "NG";
              }
            }
            _intSeq = _intSeq + 1;
          }
          if (!_bolError && hfCheckRollSht == "Y") {
            if (txtRollLeaf.value.length == hfCheckRollShtDigit) {
              let dataRBMP;
              await axios
                .post("/api/ScanFin/GetRollLeafScrapRBMP", {
                  strRollNo: txtRollLeaf.value,
                })
                .then((res) => {
                  console.log("GetRollLeafScrapRBMP", res.data);
                  dataRBMP = res.data.SCRAP_FLG;
                });
              if (dataRBMP == "Y") {
                _bolError = true;
                _strScanResultAll = "NG";
                _strUpdateError = "Problem sheet from RBMP";
                _strErrorAll = "Problem sheet from RBMP";
              } else {
                let dtRowLeaf = getConnectRollSheetData(
                  dtSerial,
                  ddlProduct.value,
                  txtRollLeaf.value
                );
                console.log("ถึงตรงนี้แล้วค้าบ97", dtRowLeaf);
                if (dtRowLeaf.length > 0) {
                  await axios
                    .post("/api/Common/SetRollSheetTrayTable", {
                      dataList: dtRowLeaf,
                    })
                    .then((res) => {
                      _strUpdateError = res.data;
                    });
                }
                console.log("ถึงตรงนี้แล้วค้าบ", dtSerial);
              }
            } else {
              _strScanResultAll = "NG";
              _strUpdateError = "Roll leaf no. incorrect.";
              _strErrorAll = "Roll leaf no. incorrect.";
            }
          }

          console.log("ถึงตรงนี้แล้วค้าบ99", _bolError, _strUpdateError);
          if (!_bolError && _strUpdateError == "") {
            for (let i = 0; i < dtSerial.length; i++) {
              await axios
                .post("/api/Common/SetSerialLotShtTable", {
                  SERIAL: dtSerial[i].SERIAL,
                  FRONT_SIDE: dtSerial[i].FRONT_SIDE,
                  BACK_SIDE: dtSerial[i].BACK_SIDE,
                  MACHINE: dtSerial[i].MACHINE,
                  MASTER_NO: dtSerial[i].MASTER_NO,
                  intSerialLength: hfSerialLength,
                  UPDATE_FLG: dtSerial[i].UPDATE_FLG,
                  BarcodeSide: hfBarcodeSide,
                  SEQ: dtSerial[i].SEQ,
                  PRODUCT: ddlProduct.value,
                  USER_ID: hfUserID,
                  REMARK: dtSerial[i].REMARK,
                  LOT: _strLot,
                })
                .then((res) => {
                  _strUpdateError = res.data.p_error;
                  console.log(_strUpdateError, "SetSerialLotShtTable");
                });

              if (_strUpdateError !== "") {
                _strScanResultAll = "NG";
              }
            }
          } else {
            _strScanResultAll = "NG";
          }
        }
        setlblResult((prevState) => ({
          ...prevState,
          value: _strScanResultAll,
        }));
        if (_strScanResultAll == "NG") {
          setlblResult((prevState) => ({
            ...prevState,
            style: { background: "red" },
          }));
        } else {
          setlblResult((prevState) => ({
            ...prevState,
            style: { background: "green" },
          }));
        }
        if (_strErrorAll != "") {
          setlblResult((prevState) => ({
            ...prevState,
            value: prevState.value + " " + _strErrorAll,
          }));
        }
        setgvScanResult((prevState) => ({
          ...prevState,
          value: dtSerial,
          visble: true,
        }));
        if(EXPORT_CSV_FLG=='Y'){
          ExportCSV(dtSerial,columns);
        }
        getInitialSheet();
        getInitialSerial();
        getCountDataBylot(txtLot.value);
        setTimeout(() => {
          fcGvBackSide.current[0].focus();
        }, 300);
      } else {
        setlblLog((prevState) => ({
          ...prevState,
          value: "Please input Sheet Side No. !!!",
        }));
        SetMode("SERIAL_ERROR");
        getCountDataBylot(txtLot.value);
        settxtMachineNo((prevState) => ({ ...prevState, value: "" }));
        if (hfReqMachine == "Y") {
          settxtMachineNo((prevState) => ({ ...prevState, visble: "" }));
          setTimeout(() => {
            fctMachchine.current.focus();
          }, 300);
        } else {
          setTimeout(() => {
            fcGvBackSide.current[0].focus();
          }, 300);
        }
      }
      scrollToTop();
    } catch (error) {
      hideLoading();
      console.error("An error occurred while fetching serial data:", error);
      Swal.fire({
        title: error,
        icon: "error",
      });
    }
    hideLoading();
  };

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

  const handleBackSideChange = (index, event) => {
    const newData = [...txtSideBack];
    newData[index] = event.target.value;
    console.log(newData, "newData1");
    settxtSideBack(newData);
  };

  const handleSerialChange = (index, event) => {
    const newData = [...txtSerial];
    newData[index] = event.target.value;
    console.log(newData, "newData2");
    settxtSerial(newData);
  };

  const columns = [
    {
      title: "Sheet No.",
      dataIndex: "SHEET",
      key: "Sheet No.",
      align: "center",
      render: (text, record, index) => {
        return text;
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
      dataIndex: "SCAN_RESULT",
      key: "Scan Result",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "Remark",
      dataIndex: "REMARK",
      key: "Remark",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const ExportCSV = (data, ColumnsHeader) => {
    const filteredColumns = ColumnsHeader.filter(
      (col) => col.title !== "" && col.key !== null && col.title !== undefined
    );
  
    const headers = filteredColumns.map((col) => col.key);
  
    const filteredData = data.map((row) =>
      filteredColumns.map((col) => row[col.dataIndex] || "")
    );
  
    const csvContent = [
      headers.join(","), 
      ...filteredData.map((row) => row.join(",")) 
    ].join("\n");
  

    const bom = "\uFEFF";
    const blob = new Blob([bom + csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `P1_ConectBoard.csv`);
  };


  return {
    Product,
    ddlProduct,
    txtLot_TextChanged,
    txtLot,
    settxtLot,
    lblLog,
    btnSave_Click,
    GvSerial,
    GvBackSide,
    gvScanResult,
    txtLotRef,
    txtMachineNo,
    txtSerial,
    lblTotalPcs,
    lblTotalSht,
    txtRollLeaf,
    settxtLotRef,
    setddlProduct,
    settxtRollLeaf,
    settxtMachineNo,
    ddlProduct_SelectedIndexChanged,
    ibtBack_Click,
    txtRollLeaf_TextChanged,
    txtLotRef_TextChanged,
    handleBackSideChange,
    settxtSideBack,
    txtSideBack,
    settxtSerial,
    handleSerialChange,
    columns,
    fcLotNo,
    fcGvBackSide,
    fcGvSerial,
    fcProduct,
    fcRollleaf,
    fctMachchine,
    fcLotRef,
    lblResult,
    btnCancel_Click,
  };
}

export { fn_P1ConnectBoard };
