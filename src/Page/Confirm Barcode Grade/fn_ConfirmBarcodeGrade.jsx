import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Tag } from "antd";
import { useLoading } from "../../loading/fn_loading";
import { DataConfig } from "../Common/function_Common";
function fn_ConfirmBarcodeGrade() {
  const { ConfigData } = DataConfig();
  const { showLoading, hideLoading } = useLoading();
  const [Product, setProduct] = useState([]);

  const [Check_Master, setCheck_Master] = useState(false);
  const [txt_lotNo, settxt_lotNo] = useState({
    value: "",
    disbled: "",
    visble: "",
    style: "",
  });
  const [SlProduct, setSlProduct] = useState({
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
  const [txtOperator, settxtOperator] = useState({
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
  const [dataGvSerial, setdataGvSerial] = useState({
    value: [{ SHEET: "", SEQ: "" }],
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

  const [txtSerial, settxtSerial] = useState(
    Array(dataGvSerial.value.length).fill("")
  );
  // Array(dataGvSerial.value.length).fill("")

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
  const [hfSheetType, setHfSheetType] = useState("");
  const [hfSerialCount, setHfSerialCount] = useState("");
  const hfUserStation = localStorage.getItem("ipAddress");
  const [txtSideFront, settxtSideFront] = useState(Array(hfShtScan).fill(""));
  const [txtSideBack, settxtSideBack] = useState({
    value: Array(hfShtScan).fill(""),
    disbled: "",
    visble: false,
    style: "",
  });
  const CONNECT_SERIAL_ERROR = ConfigData.CONNECT_SERIAL_ERROR;
  const AUTO_SCAN_CHECK_FLG = ConfigData.AUTO_SCAN_CHECK_FLG;
  const Fac = ConfigData.FACTORY;
  const hfBarcodeErrorValue = "NA";

  //Start pageload
  useEffect(() => {
    const fetchData = async () => {
      await GetProductData();
      await SetMode("LOT");
      setHfMode("");
    };
    fetchData();
  }, []);

  const GetProductData = async () => {
    await axios.get("/api/Common/GetProductData").then((res) => {
      let data = res.data.flat();
      setProduct(data);
      setSlProduct((prevState) => ({ ...prevState, value: data[0].prd_name }));
    });
  };

  const handletxt_Lotno = async () => {
    let strLot = "";
    let strPrdName = "";
    // setgvScanResult((prevState) => ({ ...prevState, visble: false }));
    // settxtSideBack((prevState) => ({ ...prevState, visble: false }));
    // setdataGvSerial((prevState) => ({ ...prevState, visble: false }));
    // setHfSerialCount(0);

    if (!Check_Master) {
      const strLotData = txt_lotNo.value.toUpperCase().split(";");

      if (strLotData.length >= 2) {
        strLot = strLotData[0];

        await axios
          .post("/api/Common/getProductDataByLot", {
            strLot: strLot,
          })
          .then((res) => {
            settxtRollLeaf((prevState) => ({ ...prevState, visble: "none" }));
            sethfRollNo("");

            let data = res.data.flat().flat();
            if (data.length > 0) {
              strPrdName = data[0][0];
              sethfRollNo(data[0][1]);
            }
          });
        if (strPrdName != "") {
          setlblLog((prevState) => ({
            ...prevState,
            value: "",
            visble: false,
          }));
          settxt_lotNo((prevState) => ({ ...prevState, value: strLot }));
          settxtLotRef((prevState) => ({ ...prevState, value: strLot }));

          getCountDataBylot(strLot);
          const datagetPd = await GetProductSerialMaster(strPrdName);

          try {
            const isInArray = Product.some(
              (item) => item.prd_name === strPrdName
            );

            if (isInArray) {
              setSlProduct((prevState) => ({
                ...prevState,
                value: strPrdName,
              }));
              await getInitialSheet();
              setTimeout(() => {
                fcOperator.current.focus();
              }, 300);
              if (datagetPd.prm_conn_roll_sht_flg == "Y") {
                settxtRollLeaf((prevState) => ({
                  ...prevState,
                  value: "",
                  visble: "",
                }));
                SetMode("SERIAL");
              } else {
                SetMode("SERIAL");
                settxtMachineNo((prevState) => ({ ...prevState, value: "" }));
                if (datagetPd.prm_sht_machine_flg == "Y") {
                  settxtMachineNo((prevState) => ({
                    ...prevState,
                    visble: "",
                  }));

                  // setTimeout(() => {
                  //   fctMachchine.current.focus();
                  // }, 300);
                } else {
                  settxtMachineNo((prevState) => ({
                    ...prevState,
                    visble: "none",
                  }));
                }
              }
            } else {
              setlblLog((prevState) => ({
                ...prevState,
                value: `Product ${strPrdName} not found.`,
                visble: true,
              }));
              setTimeout(() => {
                fcProduct.current.focus();
              }, 300);
              return;
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
                  settxtMachineNo((prevState) => ({ ...prevState, value: "" }));
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
                      fcGvBackSide_txtsideback_0.current.focus();
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
          setSlProduct((prevState) => ({
            ...prevState,
            value: Product[0].prd_name,
          }));
          settxt_lotNo((prevState) => ({ ...prevState, value: "" }));
          setdataGvSerial((prevState) => ({ ...prevState, visble: false }));
          setlblLog((prevState) => ({
            ...prevState,
            visble: true,
            value: `Invalid lot no.`,
          }));
          setHfMode("LOT");
          setTimeout(() => {
            fcLotNo.current.focus();
          }, 300);
        }
      } else {
        setSlProduct((prevState) => ({
          ...prevState,
          value: Product[0].prd_name,
        }));
        settxt_lotNo((prevState) => ({ ...prevState, value: "" }));
        setdataGvSerial((prevState) => ({ ...prevState, visble: false }));
        setlblLog((prevState) => ({
          ...prevState,
          visble: true,
          value: `Please scan QR Code! / กรุณาสแกนที่คิวอาร์โค้ด`,
        }));
        setHfMode("LOT");
        setTimeout(() => {
          fcLotNo.current.focus();
        }, 300);
      }
    } else {
      GetProductSerialMaster(SlProduct.value);
      setTimeout(() => {
        fcProduct.current.focus();
      }, 300);
    }
  };

  const getCountDataBylot = async (strLot) => {
    setlblTotalSht((prevState) => ({ ...prevState, value: "0" }));
    setlblTotalPcs((prevState) => ({ ...prevState, value: "0" }));
    axios
      .post("/api/Common/getlotserialcountdata", {
        dataList: {
          strLotNo: strLot,
          strPlantCode: Fac,
        },
      })
      .then((res) => {
        if (res.data.length > 0) {
          setlblTotalPcs((prevState) => ({
            ...prevState,
            value: res.data[0].count_pcs,
          }));
          setlblTotalSht((prevState) => ({
            ...prevState,
            value: res.data[0].count_sht,
          }));
        }
      });
  };

  const GetProductSerialMaster = async (strPrdName) => {
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
          setHfSheetType(data.prm_sheet_type);
        }
      });
    return data;
  };

  const getInitialSheet = async () => {
    let dtData = [];
    for (let intRow = 0; intRow < hfShtScan; intRow++) {
      dtData.push({
        SEQ: intRow + 1,
        TITLE: hfBarcodeSide == "F" ? "Back/Front :" : "Front/Back :",
      });
    }
    settxtSideFront(Array(hfShtScan).fill(""));
    settxtSideBack((prevState) => ({
      ...prevState,
      visble: true,
      value: Array(hfShtScan).fill(""),
    }));
    return dtData;
  };

  const getInitialSerial = async () => {
    let dtData = [];
    let dtCavity = [];
    await axios
      .post("/api/Common/GetCavitySerialBarcodeGrade", {
        strProduct: SlProduct.value,
        plant_code: Fac,
      })
      .then((res) => {
        dtCavity = res.data;
      });
    for (let intSht = 0; intSht < hfShtScan; intSht++) {
      if (dtCavity.length > 0) {
        for (let dr = 0; dr < dtCavity.length; dr++) {
          dtData.push({
            SHEET: intSht + 1,
            SEQ: dtCavity[dr].MOT_CAVITY,
            TYPE: "PCS",
          });
        }
      } else {
        for (let intRow = 0; intRow < hfSerialCount; intRow++) {
          dtData.push({
            SHEET: intSht + 1,
            SEQ: intRow + 1,
            TYPE: "PCS",
          });
        }
      }
    }
    if (dtData.length > 0) {
      setdataGvSerial((prevState) => ({
        ...prevState,
        visble: true,
        value: dtData,
      }));
      settxtSerial(Array(dtData.length).fill(""));
      fcGvSerial_txtSerial_0.current.forEach((input) => {
        if (input) input.value = '';
      });
    } else {
      setdataGvSerial((prevState) => ({
        ...prevState,
        visble: true,
        value: [{ SHEET: "", SEQ: "" }],
      }));
    }

    // lblConfirm.Visible = False
    // return dtData;
  };

  useEffect(() => {
    if (hfShtScan != "" && hfSerialCount != "") {
      getInitialSerial();
    }
  }, [hfSerialCount, hfShtScan]);

  const ibtBack_Click = async () => {
    settxt_lotNo((prevState) => ({ ...prevState, value: "", disbled: false }));
    setdataGvSerial((prevState) => ({ ...prevState, visble: true }));
    setSlProduct((prevState) => ({ ...prevState, value: Product[0].prd_name }));
    settxtLotRef((prevState) => ({ ...prevState, value: "" }));
    settxtOperator((prevState) => ({
      ...prevState,
      value: "",
      style: "",
      disbled: false,
    }));
    setlblTotalPcs((prevState) => ({ ...prevState, value: "" }));
    setlblTotalSht((prevState) => ({ ...prevState, value: "" }));
    settxtSideBack((prevState) => ({
      ...prevState,
      visble: false,
      value: Array(hfShtScan).fill(""),
    }));
    settxtSideFront(Array(hfShtScan).fill(""));
    setgvScanResult((prevState) => ({
      ...prevState,
      visble: false,
      value: [],
    }));

    await SetMode("LOT");
    setTimeout(() => {
      fcLotNo.current.focus();
    }, 300);
  };

  const btnCancel_Click = async () => {
    settxtSideFront(Array(hfShtScan).fill(""));
    settxtSideBack((prevState) => ({
      ...prevState,
      visble: true,
      value: Array(hfShtScan).fill(""),
    }));
    setgvScanResult((prevState) => ({
      ...prevState,
      visble: false,
      value: [],
    }));
    await SetMode("SERIAL");
    setTimeout(() => {
      fcGvBackSide_txtsideback_0.current[0].focus();
    }, 300);

    // set
  };

  const btnSave_Click = async (serial) => {
    // if (hfMode == "SERIAL") {
    //   setSerialData();
    // }
    //   const hasAnyInput = Array.from(fcGvSerial_txtSerial_0.current).some(
    //     (input) => input.value.trim() !== ""
    // );

    // if (hasAnyInput == true) {
    if (hfMode === "SERIAL") {
      setSerialData(serial);
      // scrollToTop();
    }
    // } else{
    //   setlblLog((prevState) => ({
    //     ...prevState,
    //     value: "Please input serial no./กรุณากรอก Serial No.",
    //     visble: true,
    //   }));

    //     setTimeout(() => {
    //       fcGvSerial_txtSerial_0.current[0].focus();
    //     }, 300);

    //     scrollToTop();
    //    }
  };

  const handleSL_Product = async (value) => {
    setSlProduct((prevState) => ({ ...prevState, value: value }));
    GetProductSerialMaster(value);
    if (txt_lotNo.value != "") {
      setlblLog((prevState) => ({ ...prevState, value: "", visble: false }));
      getCountDataBylot(txt_lotNo.value);
      getInitialSheet();
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
        await SetMode("SERIAL");
        settxtMachineNo((prevState) => ({ ...prevState, value: "" }));
        if (hfReqMachine == "Y") {
          settxtMachineNo((prevState) => ({ ...prevState, visble: "" }));
          setTimeout(() => {
            fctMachchine.current.focus();
          }, 300);
        } else {
          setTimeout(() => {
            fcGvBackSide_txtsideback_0.current[0].focus();
          }, 300);
        }
      }
    } else {
      setSlProduct((prevState) => ({
        ...prevState,
        value: Product[0].prd_name,
      }));
      await SetMode("LOT");
    }
  };

  const handleTxt_RollLeaf = async () => {
    setlblLog((prevState) => ({ ...prevState, value: "", visble: false }));
    //ถ้าถูกติ้ก

    if (
      Check_Master == true ||
      (txtRollLeaf.value !== "" &&
        txtRollLeaf.value.length === hfConnRollLength)
    ) {
      const strRollProduct = hfRollNo + hfCheckRollPrd;

      if (hfCheckRollPrdFlg === "Y") {
        if (
          !Check_Master &&
          strRollProduct !==
            txtRollLeaf.value.substring(
              hfCheckRollPrdStart - 1,
              hfCheckRollPrdEnd
            )
        ) {
          setlblLog((prevState) => ({
            ...prevState,
            value: "Roll/Leaf No. mix product",
            visble: true,
          }));
          setdataGvSerial((prevState) => ({ ...prevState, visble: false }));
          setHfMode("ROLL");
          await getInitialSheet();
          settxtRollLeaf((prevState) => ({ ...prevState, value: "" }));
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
            settxtMachineNo((prevState) => ({ ...prevState, visble: "none" }));
            setTimeout(() => {
              fcGvBackSide_txtsideback_0.current[0].focus();
            }, 300);
          }
        }
      } else {
        SetMode("SERIAL");
        settxtMachineNo((prevState) => ({ ...prevState, value: "" }));
        if (hfReqMachine == "Y") {
          settxtMachineNo((prevState) => ({ ...prevState, visble: "" }));
          setTimeout(() => {
            fctMachchine.current.focus();
          }, 300);
        } else {
          settxtMachineNo((prevState) => ({ ...prevState, visble: "none" }));
          setTimeout(() => {
            fcGvBackSide_txtsideback_0.current[0].focus();
          }, 300);
        }
      }
    } else {
      setlblLog((prevState) => ({
        ...prevState,
        visble: true,
        value: "Invalid Roll/Leaf No.",
      }));
      setdataGvSerial((prevState) => ({ ...prevState, visble: false }));
      setHfMode("ROLL");
      await getInitialSheet();
      settxtRollLeaf((prevState) => ({ ...prevState, value: "" }));
      setTimeout(() => {
        fcRollleaf.current.focus();
      }, 300);
    }
  };

  const handleTxt_LotRef = async () => {
    const strLotData = txtLotRef.value.trim().toUpperCase().split(";");
    settxtLotRef((prevState) => ({ ...prevState, value: strLotData[0] }));
    setTimeout(() => {
      fcOperator.current.focus();
    }, 300);
  };

  const SetMode = async (_strType) => {
    if (_strType == "LOT") {
      setSlProduct((prevState) => ({
        ...prevState,
        disbled: false,
        style: "",
      }));
      settxt_lotNo((prevState) => ({
        ...prevState,
        value: "",
        disbled: false,
        style: "",
      }));
      setlblLog((prevState) => ({ ...prevState, visble: false }));
      setdataGvSerial((prevState) => ({ ...prevState, visble: false }));
      setHfMode("LOT");
      setTimeout(() => {
        fcLotNo.current.focus();
      }, 300);
    }
    if (_strType == "LOT_ERROR") {
      settxt_lotNo((prevState) => ({
        ...prevState,
        value: "",
        disbled: false,
        style: "",
      }));
      setlblLog((prevState) => ({ ...prevState, visble: true }));
      setdataGvSerial((prevState) => ({ ...prevState, visble: false }));
      setHfMode("LOT");
      setTimeout(() => {
        fcLotNo.current.focus();
      }, 300);
    }
    if (_strType == "SERIAL") {
      settxt_lotNo((prevState) => ({
        ...prevState,
        disbled: true,
        style: "#e0e0e0",
      }));
      setlblLog((prevState) => ({ ...prevState, visble: false }));
      // setdataGvSerial((prevState) => ({ ...prevState, visble: true }));
      setHfMode("SERIAL");
      await getInitialSerial();
    }
    if (_strType == "SERIAL_ERROR") {
      settxt_lotNo((prevState) => ({
        ...prevState,
        disbled: true,
        style: "#e0e0e0",
      }));
      setlblLog((prevState) => ({ ...prevState, visble: true }));
    }
    if (_strType == "SERIAL_OK") {
      settxt_lotNo((prevState) => ({
        ...prevState,
        disbled: true,
        style: "#e0e0e0",
      }));
      // setvisibleLog(false);
      setlblLog((prevState) => ({ ...prevState, visble: false }));
      await getInitialSerial();
      setTimeout(() => {
        fcGvSerial.current.focus();
      }, 300);
    }
    if (_strType == "SERIAL_NG") {
      settxt_lotNo((prevState) => ({
        ...prevState,
        disbled: true,
        style: "#e0e0e0",
      }));
      // setvisibleLog(false);
      setlblLog((prevState) => ({ ...prevState, visble: false }));
    }
  };

  const getInputSerial = async (txtSerial) => {
    let dtData = [];
    const serialLength = parseInt(hfSerialLength, 10);
  
    let i = 0;
    for (let intSht = 0; intSht < hfShtScan; intSht++) {
     
      for (let intRow = 0; intRow < hfSerialCount; intRow++) {
        dtData.push({
          SHEET: intSht + 1,
          BACK_SIDE: txtSideBack.value[intSht]||'',
          FRONT_SIDE: txtSideFront[intSht]||'',
          SEQ: intRow + 1,
          SERIAL_GRADE:
          !txtSerial[i] || txtSerial[i] === undefined 
            ? ''
            : hfBarcodeErrorValue.includes(txtSerial[intRow]) && txtSerial[intRow]
            ? "X"
            : txtSerial[i].slice(-1),        
          SERIAL: txtSerial[i] ? txtSerial[i].trim().toUpperCase().substring(0, Math.min(txtSerial[i].length, serialLength)) : "",
          GRADE_RESULT: "",
          SCAN_RESULT: "",
          REMARK: "",
          UPDATE_FLG: "N",
          MACHINE: txtMachineNo.value,
          PRODUCT: SlProduct.value,
          PLANT_CODE: Fac,
        });
        i += 1;
      }
    }
    console.log(dtData,'dddddddd');
    return dtData;
  };

  const getConnectRollSheetData = async (
    _dtSerial,
    _strProduct,
    _strRollLeaf
  ) => {
    let _dtData = [];
    let data = [];
    let _intRollRow = 1;
    let _intRow = 0;
    let _strShtNoOld = "";
    let _strRollNo = "";
    _strRollNo = hfRollNo;

    for (let i = 0; i < _dtSerial.length; i++) {
      if (
        _dtSerial[i].FRONT_SIDE != _strShtNoOld &&
        _dtSerial[i].FRONT_SIDE != ""
      ) {
        data = {
          ROLL_SEQ: _intRollRow,
          SHT_SEQ: _intRow,
          ROLL_NO: _strRollNo,
          ROLL_LEAF: _strRollLeaf,
          SHT_NO:
            hfBarcodeSide === "F"
              ? _dtSerial[i].FRONT_SIDE
              : _dtSerial[i].BACK_SIDE,
          SCAN_RESULT: "",
          REMARK: "",
          ROW_UPDATE: "Y",
          UPDATE_FLG: "N",
          MACHINE: txtMachineNo.value,
          PRODUCT: _strProduct,
          LOT_NO: txt_lotNo.value,
        };
        // _dtData.push(_drShtRow);
        if (_dtSerial[i].FRONT_SIDE != _dtSerial[i].BACK_SIDE) {
          _intRow += 1;
          data = {
            ROLL_SEQ: _intRollRow,
            SHT_SEQ: _intRow,
            ROLL_NO: _strRollNo,
            ROLL_LEAF: _strRollLeaf,
            SHT_NO:
              hfBarcodeSide === "F"
                ? _dtSerial[i].BACK_SIDE
                : _dtSerial[i].FRONT_SIDE,
            SCAN_RESULT: "",
            REMARK: "",
            ROW_UPDATE: "Y",
            UPDATE_FLG: "N",
            MACHINE: txtMachineNo.value,
            PRODUCT: _strProduct,
            LOT_NO: txt_lotNo.value,
          };
        }
      }
      _dtData.push(data);
      _strShtNoOld = _dtSerial[i].FRONT_SIDE;
    }

    return _dtData;
  };

  const handleTxt_Opreator = async () => {
    if (txtOperator.value != "") {
      if (hfCheckRollSht == "Y") {
        settxtRollLeaf((prevState) => ({
          ...prevState,
          value: "",
          visble: "",
        }));
        setTimeout(() => {
          fcRollleaf.current.focus();
          // settxtOperator((prevState) => ({
          //   ...prevState,
          //   disbled: true,
          //   style: "#e0e0e0",
          // }));
        }, 300);
      } else {
        await SetMode("SERIAL");
        settxtMachineNo((prevState) => ({ ...prevState, value: "" }));

        if (hfReqMachine == "Y") {
          settxtMachineNo((prevState) => ({ ...prevState, visble: "" }));
          setTimeout(() => {
            fctMachchine.current.focus();
            // settxtOperator((prevState) => ({
            //   ...prevState,
            //   disbled: true,
            //   style: "#e0e0e0",
            // }));
          }, 300);
        } else {
          fcGvBackSide_txtsideback_0.current[0].focus();
          // settxtOperator((prevState) => ({
          //   ...prevState,
          //   disbled: true,
          //   style: "#e0e0e0",
          // }));
        }
      }
    } else {
      settxtOperator((prevState) => ({ ...prevState, value: "" }));
      setTimeout(() => {
        fcOperator.current.focus();
      }, 300);
      setlblLog((prevState) => ({
        ...prevState,
        value: "Please input operator / กรุณาระบุพนักงาน",
        visble: true,
      }));
    }
  };

  const handleFrontSideChange = async (index, event) => {
    const newValues = [...txtSideFront];
    newValues[index] = event.target.value.trim().toUpperCase();
    settxtSideFront(newValues);
  };
  const handleBackSideChange = async (index, event) => {
    const newValues = [...txtSideBack.value];
    newValues[index] = event.target.value.trim().toUpperCase();
    settxtSideBack((prevState) => ({ ...prevState, value: newValues }));
  };

  let newValues = [];
  const handleSerialChange = async (index, event) => {
    newValues[index] = event.target.value.trim().toUpperCase();
    return newValues;
  };

  const setSerialData = async (txtSerial) => {
    showLoading("กำลังบันทึก กรุณารอสักครู่");
    try {
      let dtSerial = await getInputSerial(txtSerial);

      let _strLotData = "";
      let _strLotRefData = "";
      let _strLot = "";
      let _strLotRef = "";
      let _strPrdName = SlProduct.value;
      let _strShtNoBack = "";
      let _strShtNoFront = "";
      let _strTray = " ";
      let _intSeq = 1;
      let _strScanResultAll = "OK";
      let _strBarcodeResultAll = "OK";
      let _strErrorAll = "";
      let _strUpdateError = "";
      let _bolConfirm = false;
      setHfWeekCode("");
      let dataHfWeekCode = "";
      let _bolError = false;

      const allSheetEmpty = dtSerial.every(
        (item) =>
          item.length <= 0 || item.BACK_SIDE === "" || item.FRONT_SIDE === ""
      );
      if (allSheetEmpty) {
        hideLoading();
        setlblLog((prevState) => ({
          ...prevState,
          value: `Please Input Sheet No.`,
          visble: true,
        }));
        setgvScanResult((prevState) => ({
          ...prevState,
          visble: false,
          value: "",
        }));
        // setlblResult((prevState) => ({
        //   ...prevState,
        //   value: '',
        // }));

        setTimeout(() => {
          fcGvBackSide_txtsideback_0.current[0].focus();
        }, 300);
        scrollToTop();
        return;
      }
      //       if(txtSideBack.value[0]=='') {
      //   hideLoading();
      //   setlblLog((prevState) => ({
      //     ...prevState,
      //     value: `Please Input Sheet No.`,
      //     visble: true,
      //   }));
      //   setlblResult((prevState) => ({
      //     ...prevState,
      //     value: '',
      //   }));

      //   setTimeout(() => {
      //     fcGvBackSide_txtsideback_0.current[0].focus();
      //   }, 300);
      //   scrollToTop();
      //     return;
      // }

      const allSerialEmpty = dtSerial.every(
        (item) => item.SERIAL === "" || item.length < 0
      );
      if (allSerialEmpty) {
        hideLoading();
        setlblLog((prevState) => ({
          ...prevState,
          value: `Please Input Serial No.`,
          visble: true,
        }));
        // setlblResult((prevState) => ({
        //   ...prevState,
        //   value: '',
        // }));
        setgvScanResult((prevState) => ({
          ...prevState,
          visble: false,
          value: "",
        }));
        // setgvScanResult((prevState) => ({ ...prevState, visble: "", value: "" }));
        // setgvSerial((prevState) => ({ ...prevState, visble: "none", value: "" }));
        setTimeout(() => {
          fcGvSerial_txtSerial_0.current[0].focus();
        }, 300);
        scrollToTop();
        return;
      }
      const strLotData = txt_lotNo.value.toUpperCase().split(";");
      _strLot = strLotData[0];

      const strLotRefData = txtLotRef.value.toUpperCase().split(";");
      _strLotRef = strLotRefData[0];

      setlblLog((prevState) => ({ ...prevState, visble: false }));

      if (lblConfirm.visble) {
        _bolConfirm = true;
      }
      setlblLog((prevState) => ({ ...prevState, visble: "none" }));
      // setvisibleConfirm("none");

      if (txt_lotNo.value != "" && dtSerial.length > 0) {
        if (!Check_Master && hfCheckWeekCode == "Y") {
          await axios
            .post("/api/Common/getWeekCodebyLot", {
              STRLOT: _strLot,
              STRPROC: hfDateInProc,
            })
            .then((res) => {
              setHfWeekCode(res.data);
              dataHfWeekCode = res.data;
            });
        }

        let _intRowSerial = 0;
        if (!Check_Master) {
          for (let i = 0; i < dtSerial.length; i++) {
            _strShtNoBack = dtSerial[i].BACK_SIDE;
            _strShtNoFront = dtSerial[i].FRONT_SIDE;
            if (hfSheetType == "D" && _strShtNoBack == _strShtNoFront) {
              _strScanResultAll = "NG";
              _strErrorAll = "Double Product sheet F,B not same";
              _bolError = true;
            }

            if (hfCheckPrdSht == "Y" && dtSerial[i].SEQ == "1") {
              const start = parseInt(hfCheckPrdShtStart);
              const end = parseInt(hfCheckPrdShtEnd);
              const substringBack = _strShtNoBack.substring(start - 1, end);
              const substringFront = _strShtNoFront.substring(start - 1, end);
              if (hfCheckPrdAbbr !== substringBack) {
                _strScanResultAll = "NG";
                _strErrorAll = "Sheet product mix";
                _bolError = true;
              }
              if (hfCheckPrdAbbr !== substringFront) {
                _strScanResultAll = "NG";
                _strErrorAll = "Sheet product mix";
                _bolError = true;
              }
            }

            if (hfCheckLotSht == "Y" && dtSerial[i].SEQ == "1") {
              const start = parseInt(hfCheckLotShtStart);
              const end = parseInt(hfCheckLotShtEnd);
              const substringBack = _strShtNoBack.substring(start - 1, end);
              const substringFront = _strShtNoFront.substring(start - 1, end);
              if (_strLotRef !== substringFront) {
                _strScanResultAll = "NG";
                _strErrorAll = "Sheet lot mix";
                _bolError = true;
              }
              if (_strLotRef !== substringBack) {
                _strScanResultAll = "NG";
                _strErrorAll = "Sheet lot mix";
                _bolError = true;
              }
            }

            if (
              hfConnLeafLength > 0 &&
              (hfConnLeafLength !== _strShtNoBack.length ||
                hfConnLeafLength !== _strShtNoFront.length) &&
              !_bolError
            ) {
              _strScanResultAll = "NG";
              _strErrorAll = "Invalid sheet no.";
              _bolError = true;
            }
            if (txtOperator.value == "") {
              _strScanResultAll = "NG";
              _strErrorAll = "Invalid operator";
              _bolError = true;
            }

            if (hfReqMachine == "Y") {
              if (txtMachineNo.value == "") {
                _strScanResultAll = "NG";
                _strErrorAll = "Invalid machine no";
                _bolError = true;
              }
            }

            if (dtSerial[i].SERIAL != "") {
              let _strSerial = dtSerial[i].SERIAL;
              let _strTestResult = "NONE";
              let _strMessageUpdate = "";
              let _strScanResultUpdate = "";
              if (_strSerial != CONNECT_SERIAL_ERROR) {
                let isDuplicate = dtSerial.some((item, index) => {
                  return (
                    index !== _intRowSerial &&
                    _strSerial.toUpperCase() === item.SERIAL.toUpperCase()
                  );
                });
                // let isDuplicate = _strSerial.some((item, index) => index !== i && _strSerial.toUpperCase() === item.SERIAL.toString().trim().toUpperCase());
                if (isDuplicate) {
                  _strScanResultUpdate = "NG";
                  _strMessageUpdate = "Serial duplicate/หมายเลขบาร์โค้ดซ้ำ";
                  _strScanResultAll = "NG";
                  _bolError = true;
                  _strErrorAll = "Serial duplicate/หมายเลขบาร์โค้ดซ้ำ";
                }

                if (_strSerial.length == hfSerialLength) {
                  let _strFixDigit = "";
                  const start = parseInt(hfSerialStartDigit);
                  const end = parseInt(hfSerialEndDigit);
                  _strFixDigit = _strSerial.substring(start - 1, end);
                  if (_strFixDigit != hfSerialDigit) {
                    _strScanResultUpdate = "NG";
                    _strMessageUpdate =
                      "Serial barcode mix product/หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
                    _strScanResultAll = "NG";
                    _bolError = true;
                  } else if (hfConfigCheck == "Y") {
                    let _strConfigDigit = "";
                    const StarthfConfig = parseInt(hfConfigStart);
                    const EndhfConfig = parseInt(hfConfigEnd);
                    _strConfigDigit = _strSerial.substring(
                      StarthfConfig - 1,
                      EndhfConfig
                    );
                    if (_strConfigDigit != hfConfigCode) {
                      _strScanResultUpdate = "NG";
                      _strMessageUpdate =
                        "Serial barcode mix product/หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
                      _strScanResultAll = "NG";
                      _bolError = true;
                    }
                  }

                  if (hfSerialStartCode.trim() !== "" && !_bolError) {
                    if (
                      _strSerial.substring(0, hfSerialStartCode.length) !==
                      hfSerialStartCode
                    ) {
                      _strScanResultUpdate = "NG";
                      _strMessageUpdate =
                        "Serial barcode mix product/หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
                      _strScanResultAll = "NG";
                      _bolError = true;
                    }
                  }
                  if (hfCheckStartSeq == "Y" && _strScanResultUpdate != "NG") {
                    let _strStartSeq = "";
                    const start = parseInt(hfCheckStartSeqStart);
                    const end = parseInt(hfCheckStartSeqEnd);
                    _strStartSeq = _strSerial.substring(start - 1, end);
                    if (_strStartSeq != hfCheckStartSeqCode) {
                      _strScanResultUpdate = "NG";
                      _strMessageUpdate =
                        "Serial barcode mix product/หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
                      _strScanResultAll = "NG";
                      _bolError = true;
                    }
                  }

                  if (hfCheckWeekCode == "Y" && _strScanResultUpdate != "NG") {
                    let _strWeekCode = "";
                    const start = parseInt(hfCheckWeekCodeStart);
                    const end = parseInt(hfCheckWeekCodeEnd);
                    _strWeekCode = _strSerial.substring(start - 1, end);
                    if (_strWeekCode != dataHfWeekCode) {
                      _strScanResultUpdate = "NG";
                      _strMessageUpdate =
                        "Serial barcode mix week code/หมายเลขบาร์โค้ดปนรหัสสัปดาห์กัน";
                      _strScanResultAll = "NG";
                      _bolError = true;
                    }
                  }
                } else {
                  _strScanResultUpdate = "NG";
                  _strMessageUpdate =
                    "Serial not matching product/หมายเลขบาร์โค้ดไม่ตรงตามที่กำหนดไว้";
                  _strScanResultAll = "NG";
                  _bolError = true;
                }

                if (_strScanResultUpdate != "NG") {
                  let _inCountSeq = 0;
                  let _strSerialNoDup = "";
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
                      _inCountSeq = res.data;
                      if (_inCountSeq > 0) {
                        _strScanResultUpdate = "NG";
                        _strMessageUpdate =
                          "Serial duplicate/หมายเลขบาร์โค้ดซ้ำ";
                        _strScanResultAll = "NG";
                        _bolError = true;

                        _strErrorAll = "Serial duplicate/หมายเลขบาร์โค้ดซ้ำ";
                        _strUpdateError = "Serial duplicate/หมายเลขบาร์โค้ดซ้ำ";
                      }
                    });
                }
              } else {
                _strMessageUpdate =
                  "Bad mark piece/ชิ้นงานเสียทำเครื่องหมายไว้แล้ว";
              }

              if (_strMessageUpdate == "") {
                dtSerial[i].UPDATE_FLG = "Y";
              } else {
                dtSerial[i].UPDATE_FLG = "N";
              }
              dtSerial[i].SCAN_RESULT = _strScanResultUpdate;
              dtSerial[i].REMARK = _strMessageUpdate;
            }
            _intRowSerial += 1;
          }
        }

        //---------------------------------------------------------------------------------------

        if (!Check_Master && hfWeekCodeType == "S" && _bolError == false) {
          let _strReturn = "";
          await axios
            .post("/api/Common/GetShippingSerialNo", {
              strLotNo: _strLotRef,
              dtSerial: dtSerial,
              strWeekType: hfWeekCodeType,
            })
            .then((res) => {
              _strReturn = res.data;
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

        if (!Check_Master && hfCheckSheetELT == "Y") {
          let _strReturn = "";
          // dtSerial.strIntSerialLength =hfSerialLength
          dtSerial = dtSerial.map((item) => ({
            ...item,
            strIntSerialLength: hfSerialLength,
          }));
          
          for (let i = 0; i < dtSerial.length; i++) {
            await axios
              .post("/api/Common/setseriallotshtelttable", {
                dataList: {
                  // strSheetNo: ,
                  strPrdName: dtSerial[i].PRODUCT,
                  strPlantCode: Fac,
                  strSideF: dtSerial[i].FRONT_SIDE,
                  strSideB: dtSerial[i].BACK_SIDE,
                  strPcsno: dtSerial[i].SEQ,
                  strSerialNo: dtSerial[i].SERIAL,
                  strIntSerialLength: hfSerialLength,
                },
              })
              .then((res) => {
                _strReturn = res.data[0].p_error;

                if (_strReturn != "") {
                  dtSerial[i].SCAN_RESULT = "NG";
                  dtSerial[i].REMARK =
                    " No sheet ELT result / ไม่พบผลการทดสอบ ELT";
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
              });
          }
        }
        for (let i = 0; i < dtSerial.length; i++) {
          if (!Check_Master) {
            if (dtSerial[i].SERIAL != "" && dtSerial[i].SCAN_RESULT != "NG") {
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
              if (_strSerial == CONNECT_SERIAL_ERROR) {
                _strMessageUpdate =
                  "Bad mark piece/ชิ้นงานเสียทำเครื่องหมายไว้แล้ว";
                _strScanResultUpdate = "OK";
              }
              if (
                AUTO_SCAN_CHECK_FLG == "1" &&
                _strSerial != CONNECT_SERIAL_ERROR
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
                await axios
                  .post("/api/Common/Get_Spi_aoi_result", {
                    dataList: {
                      _strPlantCode: Fac,
                      _pcsPosition: _intSeq,
                      _frontSheetNumber: _FrontSheetBarcode,
                      _rearSheetNumber: _RearSheetBarcode,
                      _strProduct: _strPrdName,
                      _Message: _Message,
                    },
                  })
                  .then((res) => {
                    _Result = res.data;
                  });

                if (_Result == "NG") {
                  _strScanResultUpdate = _Result;
                }
                _strMessageUpdate = _Message;
                if (_strError != "") {
                  _strMessageUpdate = _strError;
                  _strScanResultUpdate = "NG";
                  _bolError = true;
                } else {
                  dtSerial[i].UPDATE_FLG = "Y";
                }
              }
              if (_strScanResultUpdate == "NG") {
                _strScanResultAll = "NG";
              }
              if (_strError == "" && dtSerial[i].UPDATE_FLG == "Y") {
                const serialGrade = dtSerial[i].SERIAL_GRADE;
                if (!hfBarcodeGrade.includes(serialGrade)) {
                  _strScanResultUpdate = "NG";
                  _strMessageUpdate = `Barcode grade ${dtSerial[i].SERIAL_GRADE} not accept/คุณภาพบาร์โค้ด ${dtSerial[i].SERIAL_GRADE} ไม่ผ่าน`;

                  dtSerial[i].UPDATE_FLG = "N";
                }
              }
              dtSerial[i].SCAN_RESULT = _strScanResultUpdate;
              dtSerial[i].REMARK = _strMessageUpdate;
            } else {
              if (dtSerial[i].SERIAL_GRADE != "") {
                dtSerial[i].UPDATE_FLG = "Y";
              }
            }

            if (
              dtSerial[i].SERIAL_GRADE !== "" &&
              hfBarcodeGrade.includes(dtSerial[i].SERIAL_GRADE)
            ) {
              dtSerial[i].GRADE_RESULT = "OK";
            } else if (dtSerial[i].SERIAL_GRADE !== "") {
              dtSerial[i].GRADE_RESULT = "NG";
              dtSerial[i].SCAN_RESULT = "NG";
              _strBarcodeResultAll = "NG";
            } else {
              dtSerial[i].GRADE_RESULT = "";
            }
            _intSeq = _intSeq + 1;
          }
        }
        if (!Check_Master && hfCheckRollSht == "Y") {
          if (txtRollLeaf.value.length == parseInt(hfConnRollLength)) {
            if (txtRollLeaf.value) {
              let dataRBMP = "";
              await axios
                .post("/api/ScanFin/GetRollLeafScrapRBMP", {
                  strRollNo: txtRollLeaf.value,
                })
                .then((res) => {
                  dataRBMP = res.data.SCRAP_FLG;
                });
              if (dataRBMP == "Y") {
                _bolError = true;
                _strScanResultAll = "NG";
                _strUpdateError = "Problem sheet from RBMP";
                _strErrorAll = "Problem sheet from RBMP";
              } else {
                let dtRowLeaf = await getConnectRollSheetData(
                  dtSerial,
                  SlProduct.value,
                  txtRollLeaf.value
                );

                let _intCount = 0;
                let _strRollLeaf = txtRollLeaf.value;
                await axios
                  .post("/api/Common/GetRollLeafDuplicate", {
                    dataList: { strRollLeaf: _strRollLeaf, strPlantCode: Fac },
                    _dtRollLeaf: dtSerial,
                  })
                  .then((res) => {
                    _intCount = res.data;
                  });
                if ((_intCount == 1)) {
                  _bolError = true;
                  for (let i = 0; i < dtRowLeaf.length; i++) {
                    dtRowLeaf[i].UPDATE_FLG = "N";
                    dtRowLeaf[i].ROW_UPDATE = "N";
                    dtRowLeaf[i].SCAN_RESULT = "NG";
                    dtRowLeaf[i].REMARK =
                      "Roll/Sheet barcode duplicate/หมายเลขบาร์โค้ดซ้ำ";
                    _intCount += 1;
                  }
                  _strUpdateError = "Roll/Sheet barcode duplicate";
                  _strErrorAll = "Roll/Sheet barcode duplicate";
                }
                if (hfCheckRollPrdFlg == "Y") {
                  let strRollProduct = hfRollNo + hfCheckRollPrd;
                  if (
                    strRollProduct !==
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
                        "Roll/Sheet not matching product/หมายเลขบาร์โค้ดไม่ตรงกับผลิตภัณฑ์";
                      _intCount += 1;
                    }
                    _strUpdateError = "Roll/Sheet not matching product";
                    _strErrorAll = "Roll/Sheet not matching product";
                  }
                }
                if (
                  dtRowLeaf.length > 0 &&
                  (_strBarcodeResultAll != "NG" || _bolConfirm)
                ) {
                  for (let i = 0; i < dtRowLeaf.length; i++) {
                    dtRowLeaf[i].strPlantCode = Fac;
                    dtRowLeaf[i]._strUserID = txtOperator.value;
                    dtRowLeaf[i]._strStation = hfUserStation;
                    dtRowLeaf[i].strPage = 'ConfirmBarcodeGrade';
                  }
                  await axios
                    .post("/api/Common/SetRollSheetTrayTable", {
                      dataList: dtRowLeaf,
                    })
                    .then((res) => {
                      _strUpdateError = res.data;
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
        let _strMasterSheet = "N";
        if (Check_Master) {
          _strMasterSheet = "Y";
        }
        if (
          (_strScanResultAll != "NG" && _strBarcodeResultAll != "NG") ||
          _bolConfirm
        ) {
          for (let i = 0; i < dtSerial.length; i++) {
            dtSerial[i]._strLot = _strLot;
            dtSerial[i]._strPlantCode = Fac;
            dtSerial[i]._strBarcodeSide = hfBarcodeSide;
            dtSerial[i].intSerialLength = hfSerialLength;
            dtSerial[i]._strMasterSheet = _strMasterSheet;
            dtSerial[i]._strUserID = txtOperator.value;
            dtSerial[i].ddlPD = SlProduct.value;
            dtSerial[i]._strStation = hfUserStation;
          }

          await axios
            .post("/api/Common/SetSerialLotShtGradeTable", {
              dataList: dtSerial,
            })
            .then((res) => {
              _strUpdateError = res.data.strError;
              if (_strUpdateError != "") {
                _strScanResultAll = "NG";
                _strErrorAll = _strUpdateError;
                for (let i = 0; i < dtSerial.length; i++) {
                  dtSerial[i].SCAN_RESULT = res.data.SCAN_RESULT;
                  dtSerial[i].REMARK = res.data.REMARK;
                }
              }
            });
        }
        if (_strBarcodeResultAll == "NG") {
          _strScanResultAll = _strBarcodeResultAll;
        }
        setlblResult(_strScanResultAll);
        if (_strScanResultAll == "NG") {
          // lblResult.ForeColor = Drawing.Color.Red
        } else {
          // lblResult.ForeColor = Drawing.Color.Green
        }
        if (_strErrorAll != "") {
          setlblResult(_strScanResultAll + " " + _strErrorAll);
        }
        if (_strBarcodeResultAll != "NG" || _bolConfirm) {
          setgvScanResult((prevState) => ({ ...prevState, value: dtSerial }));
          // setgvScanResult(dtSerial);
          // setvisiblegvScanResult(true);
          setgvScanResult((prevState) => ({ ...prevState, visble: true }));
          await getInitialSheet();
          await getInitialSerial();
          await getCountDataBylot(txt_lotNo.value);
          settxtMachineNo((prevState) => ({ ...prevState, value: "" }));
          if (hfReqMachine == "Y") {
            // setvisibleMachine("");
            settxtMachineNo((prevState) => ({ ...prevState, visble: "true" }));
            setTimeout(() => {
              fctMachchine.current.focus();
            }, 300);
          } else {
            setTimeout(() => {
              fcGvBackSide_txtsideback_0.current[0].focus();
            }, 300);
          }
        } else {
          // setgvScanResult(dtSerial);
          setgvScanResult((prevState) => ({ ...prevState, value: dtSerial }));
          // setvisiblegvScanResult(true);
          setgvScanResult((prevState) => ({ ...prevState, visble: true }));
          setlblConfirm(true);
        }
      } else {
        setlblLog((prevState) => ({
          ...prevState,
          value: "Please input Sheet Side No. !!!",
        }));
        SetMode("SERIAL_ERROR");
        // fnPlaySound()
        getCountDataBylot(txt_lotNo.value);
        settxtMachineNo((prevState) => ({ ...prevState, value: "" }));
        if (hfReqMachine == "Y") {
          // setvisibleMachine("");
          settxtMachineNo((prevState) => ({ ...prevState, visble: "" }));
          setTimeout(() => {
            fctMachchine.current.focus();
          }, 300);
        } else {
          setTimeout(() => {
            fcGvBackSide_txtsideback_0.current[0].focus();
          }, 300);
        }
      }
      scrollToTop();
      hideLoading();
    } catch (error) {
      console.error("An error occurred while fetching serial data:", error);
      Swal.fire({
        title: error,
        icon: "error",
      });
      hideLoading();
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const columns = [
    {
      title: "Sheet",
      dataIndex: "SHEET",
      key: "Sheet",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
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
      title: "Grade",
      dataIndex: "SERIAL_GRADE",
      key: "Grade",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },

    {
      title: "Scan Result",
      key: "Scan Result",
      dataIndex: "SCAN_RESULT",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "Remark",
      key: "Remark",
      dataIndex: "REMARK",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
  ];

  return {
    settxt_lotNo,
    txt_lotNo,
    handletxt_Lotno,
    Product,
    Check_Master,
    setCheck_Master,
    SlProduct,
    setSlProduct,
    txtLotRef,
    settxtLotRef,
    settxtOperator,
    txtOperator,
    lblTotalPcs,
    lblTotalSht,
    txtRollLeaf,
    settxtRollLeaf,
    txtMachineNo,
    settxtMachineNo,
    ibtBack_Click,
    handleSL_Product,
    hfBarcodeSide,
    hfShtScan,
    hfSerialCount,
    lblLog,
    txtSerial,
    txtSideBack,
    txtSideFront,
    settxtSideBack,
    settxtSideFront,
    settxtSerial,
    handleBackSideChange,
    handleFrontSideChange,
    handleSerialChange,
    gvScanResult,
    lblResult,
    btnCancel_Click,
    btnSave_Click,
    handleTxt_RollLeaf,
    handleTxt_LotRef,
    handleTxt_Opreator,
    fcRollleaf,
    fctMachchine,
    fcLotNo,
    fcOperator,
    fcProduct,
    fcGvSerial,
    fcGvBackSide_txtsideback_0,
    fcGvSerial_txtSerial_0,
    lblConfirm,
    dataGvSerial,
    fcGvBackSide_txtsideback_1,
    columns,
    settxtSerial,
  };
}

export { fn_ConfirmBarcodeGrade };
