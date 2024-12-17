import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Tag } from "antd";
import * as XLSX from "xlsx";
import { useLoading } from "../../loading/fn_loading";
import {DataConfig} from "../Common/function_Common";
function fn_ScanSMTSerialPcsChrome() {
  const{ConfigData} = DataConfig();
  const { showLoading, hideLoading } = useLoading();
  const [Product, setProduct] = useState([]);
  const [Sl_Product, setSl_Product] = useState({
    value: "",
    disbled: "",
    visble: "",
    style: {},
    focus: "",
  });
  const [txtLot, settxtLot] = useState({
    value: "",
    disbled: "",
    visble: "",
    style: {},
    focus: "",
  });

  const [txtPackingNo, settxtPackingNo] = useState({
    value: "",
    disbled: "",
    visble: "none",
    style: {},
    focus: "",
  });

  const [txtPcsTray, settxtPcsTray] = useState({
    value: "",
    disbled: "",
    visble: "",
    style: {},
    focus: "",
  });

  const [gvSerial, setgvSerial] = useState({
    value: "",
    disbled: "",
    visble: "none",
    style: {},
    focus: "",
  });

  const [gvScanResult, setgvScanResult] = useState({
    value: "",
    disbled: "",
    visble: false,
    style: {},
    focus: "",
  });

  const [txtSerial, settxtSerial] = useState(
    Array(gvSerial.value.length).fill("")
  );

  const [lblLastTray, setlblLastTray] = useState("Not Use");
  const [lblLotTotal, setlblLotTotal] = useState("");
  const [lblLot, setlblLot] = useState("");
  const [lblSerialNG, setlblSerialNG] = useState("");

  const [lblResult, setlblResult] = useState({
    value: "",
    disbled: "",
    visble: "none",
    style: {},
    focus: "",
  });

  const [lblLog, setlblLog] = useState({
    value: "",
    disbled: "",
    visble: "none",
    style: {},
    focus: "",
  });

  const [lblTime, setlblTime] = useState({
    value: "",
    disbled: "",
    visble: "none",
    style: {},
    focus: "",
  });

  //hf
  const hfLotLength = 9;
  const [hfLotAll, setHfLotAll] = useState("");
  const [hfTestResultFlag, setHfTestResultFlag] = useState("");
  const [hfSerialLength, setHfSerialLength] = useState("");
  const [hfSerialFixFlag, setHfSerialFixFlag] = useState("");
  const [hfSerialDigit, setHfSerialDigit] = useState("");
  const [hfSerialStartDigit, setHfSerialStartDigit] = useState("");
  const [hfSerialEndDigit, setHfSerialEndDigit] = useState("");
  const [hfTrayFlag, setHfTrayFlag] = useState("");
  const [hfTrayLength, setHfTrayLength] = useState("");
  const [hfConfigCheck, setHfConfigCheck] = useState("");
  const [hfConfigCode, setHfConfigCode] = useState("");
  const [hfConfigStart, setHfConfigStart] = useState("");
  const [hfConfigEnd, setHfConfigEnd] = useState("");
  const [hfConfigRuning, setHfConfigRuning] = useState("");
  const [hfDuplicateStart, setHfDuplicateStart] = useState("");
  const [hfDuplicateEnd, setHfDuplicateEnd] = useState("");
  const [hfChipIDCheck, setHfChipIDCheck] = useState("");
  const [hfCheckPrdSht, setHfCheckPrdSht] = useState("");
  const [hfCheckPrdShtStart, setHfCheckPrdShtStart] = useState("");
  const [hfCheckPrdShtEnd, setHfCheckPrdShtEnd] = useState("");
  const [hfCheckPrdAbbr, setHfCheckPrdAbbr] = useState("");
  const [hfPlasmaCheck, setHfPlasmaCheck] = useState("");
  const [hfPlasmaTime, setHfPlasmaTime] = useState("");
  const [hfCheckStartSeq, setHfCheckStartSeq] = useState("");
  const [hfCheckStartSeqCode, setHfCheckStartSeqCode] = useState("");
  const [hfCheckStartSeqStart, setHfCheckStartSeqStart] = useState("");
  const [hfCheckStartSeqEnd, setHfCheckStartSeqEnd] = useState("");
  const [hfCheckSPIAOI, setHfCheckSPIAOI] = useState("");
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
  const [hfCheckPackingNo, setHfCheckPackingNo] = useState("");
  const [hfSerialStartCode, setHfSerialStartCode] = useState("");
  const [hfPlasmaSkipELT, setHfPlasmaSkipELT] = useState("");
  const [hfPlasmaHideTime, setHfPlasmaHideTime] = useState("");
  const [hfCheckEFPCAOM, setHfCheckEFPCAOM] = useState("");
  const [hfCheckEFPCAOI, setHfCheckEFPCAOI] = useState("");
  const [hfCheckEFPCOST, setHfCheckEFPCOST] = useState("");
  const [hfCheckEFPCAVI, setHfCheckEFPCAVI] = useState("");
  const [hfCheckXrayF, setHfCheckXrayF] = useState("");
  const [hfCheckXrayB, setHfCheckXrayB] = useState("");
  const [hfCheckXrayOneTime, setHfCheckXrayOneTime] = useState("");
  const [hfCheckFinInspect, setHfCheckFinInspect] = useState("");
  const [hfCheckFinInspectProc, setHfCheckFinInspectProc] = useState("");
  const [hfserialcount, setHfserialcount] = useState("");

  const [hfAutoScan, setHfAutoScan] = useState("");
  const [hfCheckAOICoatF, setHfCheckAOICoatF] = useState("");
  const [hfCheckAOICoatB, setHfCheckAOICoatB] = useState("");
  const [hfSerialInfo, setHfSerialInfo] = useState("");
  const [hfMode, setHfMode] = useState("");
  const [hfSerialCountOriginal, setHfSerialCountOriginal] = useState("");

  const hfUserID = localStorage.getItem("ipAddress");
  const hfUserStation = localStorage.getItem("ipAddress");

  //Focus
  const fc_txtSerial = useRef([]);
  const fc_txtLotNo = useRef([]);
  const fc_txtPackingNo = useRef([]);
  const fc_txtTray = useRef([]);
  const fc_SlProduct = useRef([]);

  //env
  console.log(';ConfigData',ConfigData);
  const FINAL_GATE_AUTO_PRD = ConfigData.FINAL_GATE_AUTO_PRD;
  const DUPLICATE_CHECK_FLG = ConfigData.DUPLICATE_CHECK_FLG;
  const FINAL_GATE_MASTER_CODE = ConfigData.FINAL_GATE_MASTER_CODE;
  const FINAL_GATE_SPECIAL_FLG =ConfigData.FINAL_GATE_SPECIAL_FLG;
  const FINAL_GATE_SPECIAL_PRD = ConfigData.FINAL_GATE_SPECIAL_PRD;
  const Fac = ConfigData.FACTORY;
  const EXPORT_CSV_FLG = ConfigData.EXPORT_CSV_FLG;
  const FINAL_GATE_SPECIAL_MESSAGE = ConfigData.FINAL_GATE_SPECIAL_MESSAGE
  //PageLoad----------
  useEffect(() => {
    const fetchData = async () => {
      setHfMode("");
      setHfLotAll("");
      if (FINAL_GATE_AUTO_PRD == "") {
        await GetProductDataFix();
      } else {
        await GetProductData();
      }

      SetMode("LOT");
    };
    fetchData();
  }, []);
  //-------------------

  useEffect(() => {
    if (gvSerial.visble == "") {
      getInitialSerial();
      if (gvSerial.value.length > 0) {
        fc_txtSerial.current[0].focus();
      }
    }
  }, [gvSerial.visble, gvSerial.value.length]);

  useEffect(() => {
    getInitialSerial();
  }, [hfserialcount]);

  const GetProductData = async () => {
    await axios.get("/api/Common/GetProductData").then(async (res) => {
      let data = res.data.flat();
      setProduct(data);
      setSl_Product((prevState) => ({ ...prevState, value: data[0].prd_name }));
      await getProductSerialMaster(data[0].prd_name);
    });
  };

  const GetProductDataFix = async () => {
    await axios
      .post("/api/Common/getProductDataFix", {
        strPlantCode: Fac,
        strPrdName: FINAL_GATE_AUTO_PRD,
      })
      .then((res) => {
        let data = res.data;

        setProduct(data);
        setSl_Product((prevState) => ({
          ...prevState,
          value: data[0].prd_name,
        }));
      });
  };

  const txtLot_TextChanged = async () => {
    if (txtLot.value != "") {
      let _strPrdName = "";
      let _strLot = "";
      let _strLotAll = txtLot.value.toUpperCase().split(";");

      if (_strLotAll.length - 1 >= 2) {
        _strLot = _strLotAll[0];
        _strPrdName = Sl_Product;
        setHfTestResultFlag("Y");
        if (_strLot.length === parseInt(hfLotLength, 10)) {
          await axios
            .post("/api/Common/GetProductNameByLot", {
              strLot: _strLot,
            })
            .then((res) => {
              _strPrdName = res.data.prdName[0];
            });
          let dtLotPassCount;
          await axios
            .post("/api/Common/getSerialPassByLot", {
              strLotNo: _strLot,
              strPlantCode: Fac,
            })
            .then((res) => {
              dtLotPassCount = res.data.lotcount;
            });
          setlblLotTotal("0");
          setlblSerialNG("0");
          if (dtLotPassCount.length > 0) {
            setlblLotTotal(dtLotPassCount);
          }
          let dtLotProduct;
          await axios
            .post("/api/Common/getProductDataByLot", {
              strLot: _strLot,
            })
            .then((res) => {
              dtLotProduct = res.data.flat().flat();
            });
          if (dtLotProduct > 0) {
            if (dtLotProduct[0][2] == "Y") {
              setHfTestResultFlag("N");
            }
            setHfLotAll(dtLotProduct[0][3]);
          }
          setlblLot(_strLot);
          try {
            const isInArray = Product.some(
              (item) => item.prd_name === _strPrdName
            );

            if (isInArray) {
              setSl_Product((prevState) => ({
                ...prevState,
                value: _strPrdName,
              }));
              await axios
                .post("/api/Common/GetFinalGateMasterCheckResult", {
                  strProduct: _strLot,
                })
                .then(async (res) => {
                  let GetFinalGateMasterCheckResult = res.data;
                  if (GetFinalGateMasterCheckResult == "OK") {
                    let datagetPd = await getProductSerialMaster(_strPrdName);
                    if (datagetPd.prm_final_packing_group_flg == "Y") {
                      SetMode("PACK");
                    } else {
                      SetMode("SERIAL");
                    }
                  } else {
                    setlblLog((prevState) => ({
                      ...prevState,
                      value: `${_strPrdName} not test master! / ${_strPrdName} ยังไม่ทดสอบมาสเตอร์ `,
                      visble: "",
                    }));
                    setlblLot("");
                    setlblLotTotal("");
                    setlblSerialNG("");
                    SetMode("LOT_ERROR");
                  }
                });
            } else {
              setlblLog((prevState) => ({
                ...prevState,
                value: `Product ${_strPrdName} not found.`,
                visble: "",
              }));
              setTimeout(() => {
                fc_SlProduct.current.focus();
              }, 300);

              return;
            }
          } catch (error) {
            const intProduct = _strPrdName.indexOf("-", 13);
            if (intProduct > 0) {
              _strPrdName =
                _strPrdName.substring(0, intProduct) +
                _strPrdName.substring(intProduct + 1, intProduct + 11).trim();
              try {
                setSl_Product(_strPrdName);
                await axios
                  .post("/api/Common/GetFinalGateMasterCheckResult", {
                    strProduct: _strLot,
                  })
                  .then(async (res) => {
                    let GetFinalGateMasterCheckResult = res.data;
                    if (GetFinalGateMasterCheckResult == "OK") {
                      let datagetPd = await getProductSerialMaster(_strPrdName);
                      if (datagetPd.prm_final_packing_group_flg == "Y") {
                        SetMode("PACK");
                      } else {
                        SetMode("SERIAL");
                      }
                    } else {
                      setlblLog((prevState) => ({
                        ...prevState,
                        value: `${_strPrdName} not test master! / ${_strPrdName} ยังไม่ทดสอบมาสเตอร์ `,
                        visble: "",
                      }));
                      setlblLot("");
                      setlblLotTotal("");
                      setlblSerialNG("");
                      SetMode("LOT_ERROR");
                    }
                  });
              } catch (error2) {
                setlblLog((prevState) => ({
                  ...prevState,
                  value: `Product ${_strPrdName} not found.`,
                  visble: "",
                }));
                await getProductSerialMaster(_strPrdName);
                setTimeout(() => {
                  fc_SlProduct.current.focus();
                }, 300);
              }
            } else {
              setlblLog((prevState) => ({
                ...prevState,
                value: `Product ${_strPrdName} not found.`,
                visble: "",
              }));
              await getProductSerialMaster(_strPrdName);
              setTimeout(() => {
                fc_SlProduct.current.focus();
              }, 300);
            }
          }
        } else {
          setlblLog((prevState) => ({
            ...prevState,
            value: `invalid lot no.! / ${_strLot} หมายเลขล็อตไม่ถูกต้อง `,
            visble: "",
          }));
          setlblLot("");
          setlblLotTotal("");
          setlblSerialNG("");
          SetMode("LOT_ERROR");
        }
      } else {
        setlblLog((prevState) => ({
          ...prevState,
          value: `Please scan QR Code! / กรุณาสแกนที่คิวอาร์โค้ด`,
          visble: "",
        }));
        setlblLot("");
        setlblLotTotal("");
        setlblSerialNG("");
        SetMode("LOT_ERROR");
      }
    } else {
      setlblLot("");
      setTimeout(() => {
        fc_txtLotNo.current.focus();
      }, 300);
    }
  };

  const getProductSerialMaster = async (PrdName) => {
    let data = [];
    setHfSerialLength("0");
    setHfSerialFixFlag("N");
    setHfSerialDigit("");
    setHfSerialStartDigit("0");
    setHfSerialEndDigit("0");
    setHfTrayFlag("");
    setHfTrayLength("0");
    setHfTestResultFlag("");
    setHfConfigCheck("N");
    setHfConfigCode("");
    setHfConfigStart("0");
    setHfConfigEnd("0");
    setHfConfigRuning("N");
    setHfDuplicateStart("0");
    setHfDuplicateEnd("0");
    setHfChipIDCheck("N");
    setHfCheckPrdSht("N");
    setHfCheckPrdShtStart("0");
    setHfCheckPrdShtEnd("0");
    setHfCheckPrdAbbr("");
    setHfPlasmaCheck("N");
    setHfPlasmaTime("0");
    setHfCheckStartSeq("N");
    setHfCheckStartSeqCode("");
    setHfCheckStartSeqStart("0");
    setHfCheckStartSeqEnd("0");
    setHfCheckSPIAOI("N");
    setHfCheckDateInProc("N");
    setHfDateInProc("");
    setHfCheckWeekCode("N");
    setHfCheckWeekCodeStart("");
    setHfCheckWeekCodeEnd("");
    setHfWeekCode("");
    setHfWeekCodeType("");
    setHfCheckPreAOIF("N");
    setHfCheckPreAOIB("N");
    setHfCheckAOIF("N");
    setHfCheckAOIB("N");
    setHfCheckSPIF("N");
    setHfCheckSPIB("N");
    setHfCheckPackingNo("N");
    setHfSerialStartCode("");
    setHfPlasmaSkipELT("N");
    setHfPlasmaHideTime("N");
    setHfCheckEFPCAOM("N");
    setHfCheckEFPCAOI("N");
    setHfCheckEFPCOST("N");
    setHfCheckEFPCAVI("N");
    setHfCheckXrayF("N");
    setHfCheckXrayB("N");
    setHfCheckXrayOneTime("N");
    setHfCheckFinInspect("N");
    setHfCheckFinInspectProc("");

    await axios
      .post("/api/common/GetSerialProductByProduct", {
        prdName: PrdName,
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
          setHfserialcount(data.slm_serial_count);
          setHfAutoScan(data.slm_auto_scan);
          setHfConfigCheck(data.prm_barcode_req_config);
          setHfConfigCode(data.prm_config_code);
          setHfConfigStart(data.prm_start_config);
          setHfConfigEnd(data.prm_end_config);
          setHfConfigRuning(data.prm_running_req_config);
          setHfDuplicateStart(data.prm_duplicate_start);
          setHfDuplicateEnd(data.prm_duplicate_end);
          setHfChipIDCheck(data.prm_check_chip_id_flg);
          setHfCheckPrdSht(data.prm_req_check_prd_sht);
          setHfCheckPrdShtStart(data.prm_check_prd_sht_start);
          setHfCheckPrdShtEnd(data.prm_check_prd_sht_end);
          setHfCheckPrdAbbr(data.prm_abbr);
          setHfPlasmaCheck(data.prm_plasma_time_flg);
          setHfPlasmaTime(data.prm_plasma_time);
          setHfCheckStartSeq(data.prm_req_start_seq_flg);
          setHfCheckStartSeqCode(data.prm_start_seq_code);
          setHfCheckStartSeqStart(data.prm_start_seq_start);
          setHfCheckStartSeqEnd(data.prm_start_seq_end);
          setHfCheckSPIAOI(data.prm_final_aoi_spi_flg);
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
          setHfCheckPackingNo(data.prm_final_packing_group_flg);
          setHfSerialStartCode(data.prm_serial_start_code);
          setHfPlasmaSkipELT(data.prm_plasma_time_skip_elt);
          setHfPlasmaHideTime(data.prm_plasma_time_hide_time);
          setHfCheckEFPCAOM(data.prm_check_efpc_aom_flg);
          setHfCheckEFPCAOI(data.prm_check_efpc_aoi_flg);
          setHfCheckEFPCOST(data.prm_check_efpc_ost_flg);
          setHfCheckEFPCAVI(data.prm_check_efpc_avi_flg);
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

  const SetMode = async (mode) => {
    if (mode == "LOT") {
      settxtLot((prevState) => ({
        ...prevState,
        value: "",
        disbled: false,
        style: { background: "" },
      }));
      setlblLot("");
      setlblLotTotal("");
      setlblSerialNG("");
      setlblLog((prevState) => ({ ...prevState, visble: "none" }));
      setgvSerial((prevState) => ({ ...prevState, visble: "none", value: "" }));
      settxtSerial("");
      setTimeout(() => {
        fc_txtLotNo.current.focus();
      }, 300);
    } else if (mode == "LOT_ERROR") {
      settxtLot((prevState) => ({
        ...prevState,
        value: "",
        disbled: true,
        style: { background: "#e0e0e0" },
      }));
      setlblLot("");
      setlblLotTotal("");
      setlblSerialNG("");
      setlblLog((prevState) => ({ ...prevState, visble: "" }));
      setgvSerial((prevState) => ({ ...prevState, visble: "none" }));
      setHfMode("LOT");
      setTimeout(() => {
        fc_txtLotNo.current.focus();
      }, 300);
    } else if (mode == "TRAY") {
      settxtLot((prevState) => ({
        ...prevState,
        disbled: true,
        style: { background: "#e0e0e0" },
      }));
      setlblSerialNG("");
      settxtPackingNo((prevState) => ({
        ...prevState,
        visble: "none",
      }));
      setlblLog((prevState) => ({ ...prevState, visble: "none" }));
      setgvSerial((prevState) => ({ ...prevState, visble: "" }));
      getInitialSerial();
      setHfMode("TRAY");
      setTimeout(() => {
        fc_txtTray.current.focus();
      }, 300);
    } else if (mode == "TRAY_ERROR") {
      settxtLot((prevState) => ({
        ...prevState,
        disbled: true,
        style: { background: "#e0e0e0" },
      }));
      setlblSerialNG("");
      settxtPackingNo((prevState) => ({
        ...prevState,
        visble: "none",
        value: "",
      }));
      setlblLog((prevState) => ({ ...prevState, visble: "" }));
      setgvSerial((prevState) => ({ ...prevState, visble: "none" }));
      setHfMode("TRAY");
      setTimeout(() => {
        fc_txtTray.current.focus();
      }, 300);
    } else if (mode == "PACK") {
      settxtLot((prevState) => ({
        ...prevState,
        disbled: true,
        style: { background: "#e0e0e0" },
      }));
      settxtPackingNo((prevState) => ({
        ...prevState,
        visble: "",
        value: "",
        disbled: false,
        style: { background: "" },
      }));
      setlblLog((prevState) => ({ ...prevState, visble: "none" }));
      setgvSerial((prevState) => ({ ...prevState, visble: "none", value: "" }));
      settxtSerial("");

      setTimeout(() => {
        fc_txtPackingNo.current.focus();
      }, 300);
    } else if (mode == "SERIAL") {
      settxtLot((prevState) => ({
        ...prevState,
        disbled: true,
        style: { background: "#e0e0e0" },
      }));
      setlblLog((prevState) => ({ ...prevState, visble: "none" }));
      setHfMode("SERIAL");
      setgvSerial((prevState) => ({ ...prevState, visble: "" }));
      getInitialSerial();
    } else if (mode == "SERIAL_ERROR") {
      settxtLot((prevState) => ({
        ...prevState,
        disbled: true,
        style: { background: "#e0e0e0" },
      }));
      setlblLog((prevState) => ({ ...prevState, visble: "" }));
    } else if (mode == "SERIAL_OK") {
      settxtLot((prevState) => ({
        ...prevState,
        disbled: true,
        style: { background: "#e0e0e0" },
      }));
      setlblLog((prevState) => ({ ...prevState, visble: "none" }));
      setgvSerial((prevState) => ({ ...prevState, visble: "" }));
      getInitialSerial();

      setTimeout(() => {
        fc_txtSerial.current[0].focus();
      }, 300);
    } else if (mode == "SERIAL_NG") {
      settxtLot((prevState) => ({
        ...prevState,
        disbled: true,
        style: { background: "#e0e0e0" },
      }));
      setlblLog((prevState) => ({ ...prevState, visble: "" }));
    }
  };

  const getInitialSerial = async () => {
    let dtData = [];
    for (let intRow = 0; intRow < hfserialcount; intRow++) {
      dtData.push({
        SEQ: intRow + 1,
      });
    }
    setgvSerial((prevState) => ({ ...prevState, value: dtData }));
    settxtSerial(Array(gvSerial.value.length).fill(""));
    if (gvSerial.value.length > 0) {
      setTimeout(() => {
        fc_txtSerial.current[0].focus();
      }, 300);
    }
    return dtData;
  };

  const ibtBack_Click = async () => {
    setSl_Product((prevState) => ({ ...prevState, disbled: false }));
    settxtLot((prevState) => ({
      ...prevState,
      disbled: false,
      value: "",
      style: "",
    }));
    // pnlSerial.Visible = False
    settxtPackingNo((prevState) => ({
      ...prevState,
      visble: "none",
    }));
    setgvSerial((prevState) => ({ ...prevState, visble: "none" }));
    SetMode("LOT");
    setTimeout(() => {
      fc_txtLotNo.current.focus();
    }, 300);
  };

  const btnCancel_Click = async () => {
    SetMode("SERIAL");
  };

  const btnSave_Click = async () => {
    if (hfMode == "SERIAL") {
      setSerialDataTray();
    }
  };

  const ibtPackingBack_Click = async () => {
    SetMode("PACK");
  };

  const ddlProduct_SelectedIndexChanged = async (valueProduct) => {
    setSl_Product((prevState) => ({ ...prevState, value: valueProduct }));
    if (lblLot != "") {
      await axios
        .post("/api/Common/GetFinalGateMasterCheckResult", {
          strProduct: lblLot,
        })
        .then(async (res) => {
          let GetFinalGateMasterCheckResult = res.data;
          if (GetFinalGateMasterCheckResult == "OK") {
            let datagetpd = await getProductSerialMaster(valueProduct);
            if (datagetpd.prm_final_packing_group_flg == "Y") {
              SetMode("PACK");
            } else {
              SetMode("SERIAL");
            }
          } else {
            setlblLog((prevState) => ({
              ...prevState,
              value: `${valueProduct} not test master! / ${valueProduct} ยังไม่ทดสอบมาสเตอร์ `,
              visble: "",
            }));
            setlblLot("");
            setlblLotTotal("");
            setlblSerialNG("");
            SetMode("LOT_ERROR");
          }
        });
    } else {
      SetMode("LOT");
    }
  };

  const txtPackingNo_TextChanged = async () => {
    if (txtPackingNo.value.trim().length !== 0) {
      let dtLotPassCount;
      let dtPackPassCount;
      let dtTotal

      await axios
        .post("/api/Common/getSerialPassByLot", {
          strLotNo: lblLot,
          strPlantCode: Fac,
        })
        .then((res) => {
          dtLotPassCount = res.data.lotcount;
        });

      await axios
        .post("/api/Common/getserialpassbylotpacking", {
          strlotNo: lblLot,
          strPackingGroup: txtPackingNo.value,
          strPlantCode: Fac,
        })
        .then((res) => {
          dtPackPassCount = res.data.lot_count;
        });
      let LotTotal = "0";
      setlblSerialNG(0);
      if (dtLotPassCount > 0) {
        LotTotal = dtLotPassCount;
      }

      if (dtPackPassCount > 0) {
        LotTotal = dtPackPassCount + " / " + dtLotPassCount;
      } else {
        LotTotal = "0/" + dtLotPassCount;
      }
      setlblLotTotal(LotTotal);
      SetMode("SERIAL");
    } else {
      SetMode("PACK");
    }
  };

  const getInputSerial = () => {
    let dtData = [];
    let intRow = 0;

    for (let intSeq = 0; intSeq < gvSerial.value.length; intSeq++) {
        intRow++;
        let drRow = {
            SEQ: intRow,
            SERIAL: txtSerial[intSeq].trim().toUpperCase(),
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
            UPDATE_FLG: "N",
            PACKING_NO: txtPackingNo.value.trim().toUpperCase(),
            MASTER_NO: "",
            FRONT_SHEET_NO: "",
            BACK_SHEET_NO: "",
            SHEET_PCS_NO: 0,
            ROLL_LEAF_NO: ""
        };

        if (drRow.SERIAL !== "") {
            for (let intNo = 0; intNo < intRow - 1; intNo++) {
                if (drRow.SERIAL === txtSerial[intNo].trim().toUpperCase()) {
                    drRow.ROW_COUNT = 9;
                    break;
                }
            }
        }

        dtData.push(drRow);
    }

    return dtData;
};

  const handleSerialChange = async (index, event) => {
    const newValues = [...txtSerial];
    newValues[index] = event.target.value;
    settxtSerial(newValues);
  };

  const setSerialDataTray = async () => {
    showLoading("กำลังบันทึก กรุณารอสักครู่");
    setlblSerialNG(0)
    setlblLog((prevState) => ({
      ...prevState,
      value: ``,
      visble: "none",
    }));
    try {
      let dtSerial = getInputSerial();
      let _strLot = lblLot.trim().toUpperCase();
      let _strPrdName = Sl_Product.value;
      let _strTray;
      let _bolTrayError = false;
      let _bolError = false;
      let _strScanResultAll = "OK";
      let _intRowSerial = 0;
      let _dblPlasmaRemain = parseFloat(hfPlasmaTime);
      const allSerialEmpty = dtSerial.every(item => item.SERIAL === "");
      if (allSerialEmpty) {
        hideLoading();
        setlblLog((prevState) => ({
          ...prevState,
          value: `Please Input Serial No.`,
          visble: "",
        }));
        setlblResult((prevState) => ({
          ...prevState,
          value: '',
        }));
        setgvSerial((prevState) => ({ ...prevState, visble: "", value: "" }));
        setgvScanResult((prevState) => ({ ...prevState, visble: "", value: "" }));
        setTimeout(() => {
        fc_txtSerial.current[0].focus();
      }, 300);
        return;        
      }
      if (!_bolTrayError) {
        // for (let i = 0; i < dtSerial.length; i++) {
        await axios
          .post("/api/common/GetSerialTestResultManyTable", {
            dataList: [
              {
                strPlantCode: Fac,
                strPrdname: _strPrdName,
                strWeekCodeType: hfWeekCodeType,
              },
            ],
            dtSerial: dtSerial,
          })
          .then((res) => {
            dtSerial = res.data;
          });

        if (hfCheckWeekCode == "Y") {
          await axios
            .post("/api/common/GetWeekCodebyLot", {
              _strLot: _strLot,
              _strProc: hfDateInProc,
              _strWeekType: hfWeekCodeType,
              _strSerialInfo: hfSerialInfo,
            })
            .then((res) => {
              setHfWeekCode(res.data);
            });
        }
        // }
        for (let drRow = 0; drRow < dtSerial.length; drRow++) {
          if (dtSerial[drRow].SERIAL != "") {
            let _intCount = 0;
            let _intCountOK = 0;
            let _intCountNG = 0;
            let _intCountDup = 0;
            let _strRemark = "";
            let _strError = "";
            let _strSerial = dtSerial[drRow].SERIAL;
            let _dtSerialAll;
            let _bolScanDouble = false;
            let _bolScanDuplicate = false;
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
            let _strRejectGroup = "";

            _bolError = false;
            let _strTestResult = "NO";
            if (hfTestResultFlag == "Y") {
              _strTestResult = dtSerial[drRow].TEST_RESULT;
              _strTypeTestResult = dtSerial[drRow].TYPE_TEST_RESULT;
              _strReject1 = dtSerial[drRow].REJECT;
              _strRejectUpdate = dtSerial[drRow].REJECT_CODE;
              _strReject2 = dtSerial[drRow].REJECT2;
              _strTouchUp = dtSerial[drRow].TOUCH_UP;
              _strRejectGroup = dtSerial[drRow].REMARK;
            }
            if (DUPLICATE_CHECK_FLG == "1") {
              if (dtSerial[drRow].ROW_COUNT == 0) {
                await axios
                  .post("/api/Common/GetSerialDuplicate", {
                    dataList: {
                      strFghSerialNo: _strSerial.substring(
                        parseInt(hfDuplicateStart) - 1,
                        parseInt(hfDuplicateEnd)
                      ),
                      strPlantCode: Fac,
                    },
                  })
                  .then((res) => {
                    _intCountDup = res.data.row_count;
                    console.log("GetSerialDuplicate", _intCountDup);
                  });
                dtSerial[drRow].ROW_COUNT = _intCountDup;
              } else {
                _intCountDup = dtSerial[drRow].ROW_COUNT;
              }
            }
            if (
              _strSerial.length == parseInt(hfSerialLength, 10) &&
              _strScanResultUpdate != "NG"
            ) {
              let _strFixDigit = "";
              let GetCheckSumSerial;
              await axios
                .post("/api/Common/GetCheckSumSerial", {
                  _str_Serial: _strSerial,
                  _str_DateType: hfWeekCodeType,
                  _intEngRevEndDigit: Number(hfSerialEndDigit),
                })
                .then((res) => {
                  GetCheckSumSerial = res.data;
                });
              if (!GetCheckSumSerial) {
                _strMessageUpdate =
                  "Serial invalid check sum / หมายเลขบาร์โค้ดมีค่าตรวจสอบไม่ถูกค้อง";
                _strRemark = "Serial invalid check sum";
                _strScanResultUpdate = "NG";
                _strTestResultUpdate = _strTestResult;
                dtSerial[drRow].REMARK_UPDATE = _strRemark;
                dtSerial[drRow].ROW_UPDATE = "Y";
                _intCountNG = 1;
                _bolError = true;
              }
              if (hfSerialFixFlag == "Y" && _strScanResultUpdate != "NG") {
                var startDigit = parseInt(hfSerialStartDigit, 10);
                var endDigit = parseInt(hfSerialEndDigit, 10);
                _strFixDigit = _strSerial.substring(
                  parseInt(startDigit) - 1,
                  parseInt(endDigit)
                );
                console.log("ตรงนี่1", _strFixDigit, hfSerialDigit);
                if (_strFixDigit != hfSerialDigit) {
                  _strMessageUpdate =
                    "Serial barcode mix product / หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
                  _strRemark = "Serial barcode mix product";
                  _strScanResultUpdate = "NG";
                  _strTestResultUpdate = _strTestResult;
                  dtSerial[drRow].REMARK_UPDATE = _strRemark;
                  dtSerial[drRow].ROW_UPDATE = "Y";
                  _intCountNG = 1;
                  _bolError = true;
                }
                if (hfConfigCheck != "Y" && _strScanResultUpdate != "NG") {
                  let _strConfigDigit;
                  var configStart = parseInt(hfConfigStart, 10);
                  var configEnd = parseInt(hfConfigEnd, 10);
                  _strConfigDigit = _strSerial.substring(
                    parseInt(configStart) - 1,
                    parseInt(configEnd)
                  );
                  console.log("ตรงนี่2", _strStartSeq, hfCheckStartSeqCode);
                  if (_strStartSeq != hfCheckStartSeqCode) {
                    _strMessageUpdate =
                      "Serial barcode mix product / หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
                    _strRemark = "Serial barcode mix product";
                    _strScanResultUpdate = "NG";
                    _strTestResultUpdate = _strTestResult;
                    dtSerial[drRow].REMARK_UPDATE = _strRemark;
                    dtSerial[drRow].ROW_UPDATE = "Y";
                    _intCountNG = 1;
                    _bolError = true;
                  }
                }
                if (hfCheckWeekCode == "Y" && _strScanResultUpdate != "NG") {
                  let _strWeekCode = "";
                  _strWeekCode = _strSerial.substring(
                    parseInt(hfCheckWeekCodeStart) - 1,
                    parseInt(hfCheckWeekCodeEnd)
                  );
                  if (_strWeekCode != hfWeekCode) {
                    _strMessageUpdate =
                      "Serial barcode mix week code / หมายเลขบาร์โค้ดปนรหัสสัปดาห์กัน";
                    _strRemark = "Serial barcode mix week code";
                    _strScanResultUpdate = "NG";
                    _strTestResultUpdate = _strTestResult;
                    dtSerial[drRow].REMARK_UPDATE = _strRemark;
                    dtSerial[drRow].ROW_UPDATE = "Y";
                    _intCountNG = 1;
                    _bolError = true;
                  }
                }
              }
              if (!_bolError) {
                for (
                  let _intRow = _intRowSerial;
                  _intRow < dtSerial.length;
                  _intRow++
                ) {
     
                  let isDuplicate = dtSerial.some((item, index) => {
                    console.log(
                      `Checking duplicate ${index}: ${item.SERIAL} -----  ${_strSerial}`
                    );
                    return (
                      index !== _intRowSerial &&
                      _strSerial.toUpperCase() === item.SERIAL.toUpperCase()
                    );
                  });
                  if (isDuplicate) {
                    console.log("ซ้ำ1", _strSerial);
                    _strMessageUpdate =
                      "Serial duplicate in tray / หมายเลขบาร์โค้ดซ้ำในถาดเดียวกัน";
                    _strRemark = "Serial duplicate in tray  ";
                    _strScanResultUpdate = "NG";
                    _strTestResultUpdate = _strTestResult;
                    dtSerial[drRow].REMARK_UPDATE = _strRemark;
                    dtSerial[drRow].ROW_UPDATE = "N";
                    _intCountNG = 1;
                    _bolError = true;
                  }
                }
              }
              if (!_bolError && hfCheckPrdSht == "Y") {
                let strSheetLot = "";
                let _strShtNo = "";
                await axios
                  .post("/api/Common/GetSheetNoBySerialNo", {
                    data: {
                      strPlantCode: Fac,
                      strSerial: _strSerial,
                      strLot: strSheetLot,
                    },
                  })
                  .then((res) => {
                    _strShtNo = res.data._strsheet;
                    console.log("GetSheetNoBySerialNo", res.data);
                  });
                if (
                  _strShtNo !== "" &&
                  hfCheckPrdAbbr !==
                    _strShtNo.substring(
                      parseInt(hfCheckPrdShtStart) - 1,
                      parseInt(hfCheckPrdShtEnd)
                    )
                ) {
                  _strMessageUpdate =
                    "Change serial barcode mix product / เปลี่ยนหมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
                  _strRemark = "Change serial barcode mix product  ";
                  _strScanResultUpdate = "NG";
                  _strTestResultUpdate = _strTestResult;
                  dtSerial[drRow].REMARK_UPDATE = _strRemark;
                  dtSerial[drRow].ROW_UPDATE = "Y";
                  _intCountNG = 1;
                  _bolError = true;
                } else if (_strShtNo == "") {
                  _strMessageUpdate =
                    "No data connect sheet / ไม่มีข้อมูลแสกนประกบกับหมายเลขชีส";
                  _strRemark = "No data connect sheet  ";
                  _strScanResultUpdate = "NG";
                  _strTestResultUpdate = _strTestResult;
                  dtSerial[drRow].REMARK_UPDATE = _strRemark;
                  dtSerial[drRow].ROW_UPDATE = "Y";
                  _intCountNG = 1;
                  _bolError = true;
                } else if (hfLotAll.indexOf(strSheetLot) === -1) {
                  _strMessageUpdate =
                    "Lot not same connect sheet / ล๊อตไม่ตรงตามที่แสกนประกบกับหมายเลขชีส";
                  _strRemark = "Lot not same connect sheet  ";
                  _strScanResultUpdate = "NG";
                  _strTestResultUpdate = _strTestResult;
                  dtSerial[drRow].REMARK_UPDATE = _strRemark;
                  dtSerial[drRow].ROW_UPDATE = "Y";
                  _intCountNG = 1;
                  _bolError = true;
                }
              }
              if (!_bolError && hfCheckSPIAOI == "Y") {
                let _Result = "";
                let _FrontSheetBarcode;
                let _RearSheetBarcode;
                let _strMessage = "";
                let _intShtSeq;
                if (dtSerial[drRow].FRONT_SHEET_NO != "") {
                  _FrontSheetBarcode = dtSerial[drRow].FRONT_SHEET_NO;
                  _RearSheetBarcode = dtSerial[drRow].BACK_SHEET_NO;
                  _intShtSeq = parseInt(dtSerial[drRow].SHEET_PCS_NO);

                  await axios
                    .post("/api/Common/Get_Spi_aoi_result", {
                      dataList: {
                        _strPlantCode: Fac,
                        _pcsPosition: _intShtSeq,
                        _frontSheetNumber: _FrontSheetBarcode,
                        _rearSheetNumber: _RearSheetBarcode,
                        _strProduct: _strPrdName,
                        _Message: _strMessage,
                      },
                    })
                    .then((res) => {
                      _Result = res.data;
                      console.log("Get_Spi_aoi_result", res.data);
                    });

                  if (_Result == "NG") {
                    _strScanResultUpdate = _Result;
                    _strMessageUpdate = _strMessage;
                    _strRemark = _strMessage;
                    _strScanResultUpdate = "NG";
                    _strTestResultUpdate = _Result;
                    dtSerial[drRow].REMARK_UPDATE = _strRemark;
                    dtSerial[drRow].ROW_UPDATE = "Y";
                    _intCountNG = 1;
                    _bolError = true;
                  }
                } else {
                  _strMessageUpdate =
                    "No data connect sheet / ไม่มีข้อมูลแสกนประกบกับหมายเลขชีส";
                  _strRemark = "No data connect sheet";
                  _strScanResultUpdate = "NG";
                  _strTestResultUpdate = _strTestResult;
                  dtSerial[drRow].REMARK_UPDATE = _strRemark;
                  dtSerial[drRow].ROW_UPDATE = "Y";
                  _intCountNG = 1;
                  _bolError = true;
                }
              }
              if (!_bolError) {
                if (hfTestResultFlag == "Y") {
                  if (_strTouchUp == "NG" && _strRejectGroup == "MASTER") {
                    if (_strTestResult == "OK") {
                      _strMessageUpdate =
                        "Touch up result was fail / ผล Touch up ชิ้นงานแสดงไม่ผ่าน";
                    } else {
                      _strMessageUpdate =
                        "Touch up result was fail " +
                        _strTypeTestResult +
                        " / ผล Touch up ชิ้นงานแสดงไม่ผ่าน " +
                        _strTypeTestResult;
                    }
                    _strRemark =
                      "Touch up result was fail" + _strTypeTestResult;
                    _strScanResultUpdate = "NG";
                    _strTestResultUpdate = _strTestResult;
                    dtSerial[drRow].REMARK_UPDATE = _strRemark;
                    dtSerial[drRow].ROW_UPDATE = "Y";
                    _bolError = true;
                  } else if (
                    _strTouchUp == "NO" &&
                    _strRejectGroup != "MASTER"
                  ) {
                    if (_strTestResult == "OK") {
                      _strMessageUpdate =
                        "Not found touch up result / ไม่พบผล Touch up ชิ้นงาน";
                    } else {
                      _strMessageUpdate =
                        "Not found touch up result " +
                        _strTypeTestResult +
                        " / ไม่พบผล Touch up ชิ้นงาน " +
                        _strTypeTestResult;
                    }
                    _strRemark = "Not found touch up result";
                    _strScanResultUpdate = "NG";
                    _strTestResultUpdate = _strTestResult;
                    dtSerial[drRow].REMARK_UPDATE = _strRemark;
                    dtSerial[drRow].ROW_UPDATE = "Y";
                    _bolError = true;
                  } else if (_strTestResult == "OK") {
                    if (_intCountDup == 0) {
                      _strScanResultUpdate = "OK";
                      _strTestResultUpdate = _strTestResult;
                      dtSerial[drRow].REMARK_UPDATE = _strRemark;
                      dtSerial[drRow].ROW_UPDATE = "Y";
                    } else {
                      _strMessageUpdate =
                        "Duplicate scan serial " +
                        _strTypeTestResult +
                        " / แสกนบาร์โค้ดของชิ้นงานซ้ำ" +
                        _strTypeTestResult;
                      _strRemark =
                        "Duplicate scan serial " + _strTypeTestResult;
                      _strScanResultUpdate = "NG";
                      _strTestResultUpdate = _strTestResult;
                      dtSerial[drRow].REMARK_UPDATE = _strRemark;
                      dtSerial[drRow].ROW_UPDATE = "Y";
                      _bolError = true;
                    }
                  } else if (_strTestResult == "NG") {
                    _strMessageUpdate =
                      "Test result was fail " +
                      _strTypeTestResult +
                      _strTagNewLine +
                      "ผลทดสอบชิ้นงานแสดงไม่ผ่าน " +
                      _strTypeTestResult;
                    _strRemark = "Test result was fail" + _strTypeTestResult;
                    _strScanResultUpdate = "NG";
                    _strTestResultUpdate = _strTestResult;
                    dtSerial[drRow].REMARK_UPDATE = _strRemark;
                    dtSerial[drRow].ROW_UPDATE = "Y";
                    _bolError = true;
                  } else {
                    _strMessageUpdate =
                      "Not found test result " +
                      _strTypeTestResult +
                      " / ไม่พบผลทดสอบชิ้นงาน " +
                      _strTypeTestResult;
                    _strRemark = "Not found test result " + _strTypeTestResult;
                    _strScanResultUpdate = "NG";
                    _strTestResultUpdate = _strTestResult;
                    dtSerial[drRow].REMARK_UPDATE = _strRemark;
                    dtSerial[drRow].ROW_UPDATE = "Y";
                    _bolError = true;
                  }
                } else {
                  if (_intCountDup == 0) {
                    _strScanResultUpdate = "OK";
                    _strTestResultUpdate = "OK";
                    dtSerial[drRow].REMARK_UPDATE = _strRemark;
                    dtSerial[drRow].ROW_UPDATE = "Y";
                  } else {
                    _strMessageUpdate =
                      "Duplicate scan serial " +
                      _strTypeTestResult +
                      " / แสกนบาร์โค้ดของชิ้นงานซ้ำ" +
                      _strTypeTestResult;
                    _strRemark = "Duplicate scan serial " + _strTypeTestResult;
                    _strScanResultUpdate = "NG";
                    _strTestResultUpdate = _strTestResult;
                    dtSerial[drRow].REMARK_UPDATE = _strRemark;
                    dtSerial[drRow].ROW_UPDATE = "Y";
                    _bolError = true;
                  }
                }
                if (hfPlasmaCheck == "Y" && _strRejectGroup != "MASTER") {
                  let _dblPlasmaTime;
                  await axios
                    .post("/api/Common/GetPlasmaTimeBySerialNo", {
                      dataList: {
                        strSerial: _strSerial,
                        strPlantCode: Fac,
                        strPacking: txtPackingNo,
                        strMasterCode: FINAL_GATE_MASTER_CODE,
                        strPrdname: _strPrdName,
                      },
                    })
                    .then((res) => {
                      _dblPlasmaTime = res.data.plasma_time;
                      console.log("GetPlasmaTimeBySerialNo", res.data);
                    });

                  if (_dblPlasmaTime == 0) {
                    _strMessageUpdate =
                      _strMessageUpdate + " Skip Plasma / งานไม่ผ่านพลาสม่า";
                    _strRemark = "Skip Plasma";
                    _strScanResultUpdate = "NG";
                    _strTestResultUpdate = _strTestResult;
                    dtSerial[drRow].REMARK_UPDATE = _strRemark;
                    dtSerial[drRow].ROW_UPDATE = "Y";
                    _intCountNG = 1;
                    _bolError = true;
                  } else if (_dblPlasmaTime < 0) {
                    _strMessageUpdate =
                      _strMessageUpdate +
                      " Plasma time do not record / ไม่พบข้อมูลการแสกนก่อนเข้าพลาสม่า";
                    _strRemark = "Not record plasma time";
                    _strScanResultUpdate = "NG";
                    _strTestResultUpdate = _strTestResult;
                    dtSerial[drRow].REMARK_UPDATE = _strRemark;
                    dtSerial[drRow].ROW_UPDATE = "Y";
                    _intCountNG = 1;
                    _bolError = true;
                  } else if (
                    parseFloat(hfPlasmaTime) < _dblPlasmaTime &&
                    hfPlasmaHideTime === "N"
                  ) {
                    _strMessageUpdate =
                      _strMessageUpdate +
                      " Plasma time over " +
                      hfPlasmaTime +
                      " hr. / เวลาพลาสม่าเกิน " +
                      hfPlasmaTime +
                      " ชม.";
                    _strRemark = "Plasma time over " + hfPlasmaTime + " hr.";
                    _strScanResultUpdate = "NG";
                    _strTestResultUpdate = _strTestResult;
                    dtSerial[drRow].REMARK_UPDATE = _strRemark;
                    dtSerial[drRow].ROW_UPDATE = "Y";
                    _intCountNG = 1;
                    _bolError = true;
                    _dblPlasmaRemain = 0;
                  } else if (hfPlasmaHideTime === "N") {
                    if (
                      _dblPlasmaRemain >
                      parseFloat(hfPlasmaTime) - _dblPlasmaTime
                    ) {
                      _dblPlasmaRemain =
                        parseFloat(hfPlasmaTime) - _dblPlasmaTime;
                    }
                  }
                }
              }
              if (hfChipIDCheck == "Y" && _bolError == false) {
                let _intCheckPass;

                await axios
                  .post("/api/Common/GetCheckChipDuplicate", {
                    dataList: {
                      _strPrdName: _strPrdName,
                      _strSerial: _strSerial,
                      _strPlantCode: Fac,
                    },
                  })
                  .then((res) => {
                    _intCheckPass = res.data;
                    console.log("GetCheckChipDuplicate", res.data);
                  });

                if (_intCheckPass == 0) {
                  _strMessageUpdate = "USER SKIP TEST ELT2";
                  _strRemark = "USER SKIP TEST ELT2";
                  _strScanResultUpdate = "NG";
                  _strTestResultUpdate = _strTestResult;
                  dtSerial[drRow].REMARK_UPDATE = _strRemark;
                  dtSerial[drRow].ROW_UPDATE = "Y";
                  _intCountNG = 1;
                  _bolError = true;
                }
              }
              if (
                hfCheckEFPCAOM == "Y" ||
                hfCheckEFPCAOI == "Y" ||
                hfCheckEFPCOST == "Y" ||
                hfCheckEFPCAVI == "Y"
              ) {
                let _strEFPCResult;
                let _strEFPCRemark;
                await axios
                  .post("/api/Common/GetEFPCSheetInspectionResult", {
                    _strPlantCode: Fac,
                    _strProduct: selectddlProduct.value,
                    _strFrontSheetNo: dtSerial[drRow].FRONT_SHEET_NO,
                    _strBackSheetNo: dtSerial[drRow].BACK_SHEET_NO,
                    _intPcsNo: parseInt(dtSerial[drRow].SHEET_PCS_NO),
                    _strAOMFlg: hfCheckEFPCAOM,
                    _strAOIFlg: hfCheckEFPCAOI,
                    _strOSTFlg: hfCheckEFPCOST,
                    _strAVIFlg: hfCheckEFPCAVI,
                    _strResult: _strEFPCResult,
                  })
                  .then((res) => {
                    _strEFPCRemark = res.data;
                    console.log("GetEFPCSheetInspectionResult", res.data);
                  });
                if (_strEFPCResult == "NG") {
                  _strMessageUpdate = _strEFPCRemark;
                  _strRemark = _strEFPCRemark;
                  _strScanResultUpdate = "NG";
                  _strTestResultUpdate = _strTestResult;
                  dtSerial[drRow].REMARK_UPDATE = _strRemark;
                  dtSerial[drRow].ROW_UPDATE = "Y";
                  _intCountNG = 1;
                  _bolError = true;
                }
              }
              if (hfCheckFinInspect == "Y" && _bolError == false) {
                let _strInspResult;
                await axios
                  .post("/api/Common/GetSerialFinInspectResult", {
                    dataList: {
                      _strSerialNo: _strSerial,
                      _strProc: hfCheckFinInspectProc,
                      _strPlantCode: Fac,
                    },
                  })
                  .then((res) => {
                    _strInspResult = res.data;
                  });
                if (_strInspResult == "OK") {
                  _strMessageUpdate = _strMessageUpdate + _strInspResult;
                  _strRemark = _strInspResult;
                  _strScanResultUpdate = "NG";
                  _strTestResultUpdate = _strTestResult;
                  dtSerial[drRow].REMARK_UPDATE = _strRemark;
                  dtSerial[drRow].ROW_UPDATE = "Y";
                  _intCountNG = 1;
                  _bolError = true;
                }
              }
              if (
                FINAL_GATE_SPECIAL_FLG === "1" &&
                FINAL_GATE_SPECIAL_PRD.includes(_strPrdName) &&
                _bolError === false
              ) {
                let _intCheckPass;
                await axios
                  .post("/api/Common/getcheckspecialbyserial", {
                    dataList: {
                      strSerialno: _strSerial,
                      strPlantCode: Fac,
                    },
                  })
                  .then((res) => {
                    _intCheckPass = res.data.result;
                    console.log("getcheckspecialbyserial", res.data);
                  });
                if (_intCheckPass == 0) {
                  _strMessageUpdate = FINAL_GATE_SPECIAL_MESSAGE;
                  _strRemark = FINAL_GATE_SPECIAL_MESSAGE;
                  _strScanResultUpdate = "NG";
                  _strTestResultUpdate = _strTestResult;
                  dtSerial[drRow].REMARK_UPDATE = _strRemark;
                  dtSerial[drRow].ROW_UPDATE = "Y";
                  _intCountNG = 1;
                  _bolError = true;
                }
              }
            } else {
              _strMessageUpdate =
                "Serial not matching product / หมายเลขบาร์โค้ดไม่ตรงตามที่กำหนดไว้";
              _strRemark = "Serial barcode not matching product";
              _strScanResultUpdate = "NG";
              _strTestResultUpdate = _strTestResult;

              dtSerial[drRow].REMARK_UPDATE = _strRemark;
              dtSerial[drRow].ROW_UPDATE = "Y";
              _bolError = true;
            }

            if (_strScanResultUpdate=='NG') {
              // setLblSerialNG(0)
              setlblSerialNG((prevValue) => {
                const numericValue = parseInt(prevValue, 10);
                if (isNaN(numericValue)) {
                  return 1;
                } else {
                  return numericValue + 1;
                }
              });
            }
            dtSerial[drRow].REJECT = _strReject1;
            dtSerial[drRow].TOUCH_UP = _strTouchUp;
            dtSerial[drRow].REJECT2 = _strReject2;
            dtSerial[drRow].SCAN_RESULT = _strScanResultUpdate;
            dtSerial[drRow].TEST_RESULT = _strTestResultUpdate;
            dtSerial[drRow].REMARK = _strMessageUpdate;
            if (_strScanResultUpdate == "NG") {
              _strScanResultAll = "NG";
            }
          } else {
            dtSerial[drRow].SCAN_RESULT = "NG";
            dtSerial[drRow].ROW_UPDATE = "N";
            _strScanResultAll = "NG";
          }
          _intRowSerial = _intRowSerial + 1;
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
        if (hfPlasmaCheck == "Y" && hfPlasmaHideTime == "N") {
          if (_dblPlasmaRemain > 0) {
            let labeltime = "Remain";

            if (Math.floor(_dblPlasmaRemain) > 0) {
              setlblTime((prevState) => ({
                ...prevState,
                value:
                  "Remain" + Math.floor(_dblPlasmaRemain).toString() + " hr. ",
              }));
            }
            if (_dblPlasmaRemain % 1 > 0) {
              setlblTime((prevState) => ({
                ...prevState,
                value:
                  "Remain" +
                  Math.floor((_dblPlasmaRemain % 1) * 60).toString() +
                  " min. ",
              }));
            }
            setlblTime((prevState) => ({
              ...prevState,
              style: { background: "Green" },
            }));
          } else {
            setlblTime((prevState) => ({
              ...prevState,
              style: { background: "Red" },
              value: "Over " + hfPlasmaTime + " hr.",
            }));
          }
        } else {
          setlblTime((prevState) => ({ ...prevState, value: "" }));
        }
        let _strErrorUpdate = "";
        if (_strScanResultAll == "OK") {
          for (let drRow = 0; drRow < dtSerial.length; drRow++) {
            await axios
              .post("/api/Common/setseriallottraytable", {
                dataList: {
                  strPlantCode: Fac,
                  strPrdName: _strPrdName,
                  strLot: _strLot,
                  strUserID: hfUserID,
                  data: [
                    {
                      SERIAL: dtSerial[drRow].SERIAL,
                      UPDATE_FLG: dtSerial[drRow].UPDATE_FLG,
                      ROW_UPDATE: dtSerial[drRow].ROW_UPDATE,
                      REJECT_CODE: dtSerial[drRow].REJECT_CODE,
                      TEST_RESULT: dtSerial[drRow].TEST_RESULT,
                      REMARK_UPDATE: dtSerial[drRow].REMARK_UPDATE,
                      SCAN_RESULT: dtSerial[drRow].SCAN_RESULT,
                      PACKING_NO: dtSerial[drRow].PACKING_NO,
                      MASTER_NO: dtSerial[drRow].MASTER_NO,
                    },
                  ],
                },
              })

              .then((res) => {
                _strErrorUpdate = res.data.p_error;
                console.log(_strErrorUpdate, "_strErrorUpdate");
                // console.log(dtSerial, "Test3");
              });

            if (_strErrorUpdate != "") {
              setlblResult((prevState) => ({
                ...prevState,
                value: "Error :" + _strErrorUpdate,
                style: { background: "Red" },
              }));
            }
          }
        }
      }
      //-----------------------------------------------
      setlblLotTotal("0"); //1016
      let datalblLotTotal = 0;
      let dtLotPassCount;
      let dtPackPassCount;
      if (hfCheckPackingNo == "Y") {
        await axios
          .post("/api/Common/getSerialPassByLot", {
            strLotNo: lblLot,
            strPlantCode: Fac,
          })
          .then((res) => {
            console.log(res.data, "getSerialPassByLot");
            dtLotPassCount = res.data.lotcount;
          });

        await axios
          .post("/api/Common/getserialpassbylotpacking", {
            strlotNo: lblLot,
            strPackingGroup: txtPackingNo.value,
            strPlantCode: Fac,
          })
          .then((res) => {
            console.log(res.data, "dtPackPassCountxx");
            dtPackPassCount = res.data.lot_count;
          
          });
        if (dtLotPassCount > 0) {
          datalblLotTotal = dtLotPassCount;
        }

        if (dtPackPassCount > 0) {
          datalblLotTotal = dtPackPassCount + " / " + dtLotPassCount;
        } else {
          datalblLotTotal = "0 / " + dtLotPassCount;
        }
        setlblLotTotal(datalblLotTotal);
      } else {
        await axios
          .post("/api/Common/getSerialPassByLot", {
            strLotNo: dtSerial[0].SERIAL,
            strPlantCode: Fac,
          })
          .then((res) => {
            dtLotPassCount = res.data.lotcount;
          });
        if (dtLotPassCount.length > 0) {
          setlblLotTotal(dtLotPassCount);
        }
      }
      if (!_bolTrayError) {
        setgvScanResult((prevState) => ({
          ...prevState,
          visble: true,
          value: dtSerial,
        }));
        // ExportGridToCSV(dtSerial, columns);
      } else {
        setgvScanResult((prevState) => ({
          ...prevState,
          visble: true,
          value: {},
        }));
      }
      console.log("EXPORT_CSV_FLG", EXPORT_CSV_FLG);
      if(EXPORT_CSV_FLG=='Y'){
        ExportCSV(dtSerial,columns);
      }
      scrollToTop();
      await getInitialSerial();
    } catch (error) {
      // hideLoading();
      console.error("An error occurred while fetching serial data:", error);
      Swal.fire({
        title: error,
        icon: "error",
      });
    }
    hideLoading();
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
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
    saveAs(blob, `Final_Gate_Auto.csv`);
  };

  const columns = [
    {
      title: "No.",
      dataIndex: "SEQ",
      key: "No.",
      render: (text, record, index) => {
        return index + 1;
      },
      align: "center",
    },
    {
      title: "Serial No.",
      dataIndex: "SERIAL",
      key: "Serial No.",
      align: "left",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "Re-Judgement 1",
      dataIndex: "REJECT",
      key: "Re-Judgement 1",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },

    {
      title: "Result",
      key: "Result",
      dataIndex: "TOUCH_UP",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "Re-Judgement 2",
      key: "Re-Judgement 2",
      dataIndex: "REJECT2",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "Test Result",
      key: "Test Result",
      dataIndex: "TEST_RESULT",

      render: (text, record, index) => {
        if (record.SERIAL == "") return "";
        else {
          return text;
        }
      },
      align: "center",
    },
    {
      title: "Scan Result",
      key: "Scan Result",
      dataIndex: "SCAN_RESULT",

      render: (text, record, index) => {
        if (record.SERIAL == "") return "";
        else {
          return (
            <Tag
              className={
                text === "OK" ? "Tag-OK" : text === "NG" || "NO" ? "Tag-NG" : ""
              }
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
    txtLot,
    settxtLot,
    lblLog,
    Product,
    Sl_Product,
    txtLot_TextChanged,
    lblLot,
    ddlProduct_SelectedIndexChanged,
    txtPackingNo,
    settxtPackingNo,
    txtPackingNo_TextChanged,
    lblLotTotal,
    txtPcsTray,
    settxtPcsTray,
    lblSerialNG,
    ibtBack_Click,
    ibtPackingBack_Click,
    lblLastTray,
    gvSerial,
    handleSerialChange,
    settxtSerial,
    txtSerial,
    fc_txtSerial,
    fc_txtLotNo,
    fc_txtPackingNo,
    fc_txtTray,
    fc_SlProduct,
    btnSave_Click,
    btnCancel_Click,
    gvScanResult,
    lblResult,
    lblTime,
    columns,
  };
}

export { fn_ScanSMTSerialPcsChrome };
