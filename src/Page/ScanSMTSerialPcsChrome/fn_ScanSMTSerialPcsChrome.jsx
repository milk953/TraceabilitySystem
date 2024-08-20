import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function fn_ScanSMTSerialPcsChrome() {
  const [Product, setProduct] = useState([]);
  const [Sl_Product, setSl_Product] = useState({
    value: "",
    disbled: "",
    visble: "",
    style: {},
    focus: "",
  });
  const [txtLot, settxtLot] = useState({
    //231175237;231175237;231175237
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
  let DUPLICATE_CHECK_FLG = "0";

  //PageLoad
  useEffect(() => {
    const fetchData = async () => {
      setHfMode("");
      setHfLotAll("");
      await GetProductData();
      SetMode("LOT");
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (gvSerial.visble == "") {
      console.log("gvSerialgvSerialgvSerial");
      getInitialSerial();
      if (gvSerial.value.length > 0) {
        fc_txtSerial.current[0].focus();
      }
    }
  }, [gvSerial.visble, gvSerial.value.length]);

  useEffect(() => {
    if (txtPackingNo.visble == "") {
      fc_txtPackingNo.current.focus();
    }
  }, [txtPackingNo.visble]);

  const GetProductData = async () => {
    await axios.get("/api/Common/GetProductData").then(async (res) => {
      let data = res.data.flat();
      setProduct(data);
      setSl_Product((prevState) => ({ ...prevState, value: data[0].prd_name }));
      await getProductSerialMaster(data[0].prd_name);
    });
  };

  const txtLot_TextChanged = async () => {
    if (txtLot.value != "") {
      let _strPrdName = "";
      let _strLot = "";
      let _strLotAll = txtLot.value.toUpperCase().split(";");

      setHfLotAll("");
      if (_strLotAll.length - 1 >= 2) {
        _strLot = _strLotAll[0];
        console.log(_strLot, "_strLot_strLot_strLot");
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
              strPlantCode: "5",
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
              // console.log(res.data,'dtLotProductdtLotProductdtLotProductdtLotProduct')
              dtLotProduct = res.data.flat().flat();
              console.log(
                dtLotProduct,
                "dtLotProductdtLotProductdtLotProductdtLotProduct"
              );
            });
          if (dtLotProduct > 0) {
            if (dtLotProduct[0][2] == "Y") {
              setHfTestResultFlag("N");
            }
            setHfLotAll(dtLotProduct[0][3]);
          }
          setlblLot(_strLot);
          console.log("_strPrdName", _strPrdName);
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
              fc_SlProduct.current.focus();
              return;
            }
          } catch (error) {
            console.error(error, "errorrrr");
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
                fc_SlProduct.current.focus();
              }
            } else {
              setlblLog((prevState) => ({
                ...prevState,
                value: `Product ${_strPrdName} not found.`,
                visble: "",
              }));
              await getProductSerialMaster(_strPrdName);
              fc_SlProduct.current.focus();
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
      fc_txtLotNo.current.focus();
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
          setHfAutoScan(data.slm_auto_scan); //sethfautoscan,sethfcheckaoicoatf
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
          setHfSerialCountOriginal(data.slm_serial_count);
          settxtPcsTray((prevState) => ({
            ...prevState,
            value: data.slm_serial_count,
          }));
        }
      });
    return data;
  };

  const SetMode = async (mode) => {
    console.log(mode, "Modeee", hfMode);
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
      settxtPackingNo((prevState) => ({
        ...prevState,
        value: "",
        visble: "none",
        style: { background: "#eeeeee" },
      }));
      setlblLog((prevState) => ({ ...prevState, visble: "none" }));
      setgvSerial((prevState) => ({ ...prevState, visble: "none", value: "" }));
      settxtSerial("");
      fc_txtLotNo.current.focus();
    } else if (mode == "LOT_ERROR") {
      settxtLot((prevState) => ({
        ...prevState,
        value: "",
        disbled: true,
        style: { background: "#eeeeee" },
      }));
      setlblLot("");
      setlblLotTotal("");
      setlblSerialNG("");
      settxtPackingNo((prevState) => ({
        ...prevState,
        value: "",
        visble: "none",
      }));
      setlblLog((prevState) => ({ ...prevState, visble: "" }));
      setgvSerial((prevState) => ({ ...prevState, visble: "none" }));
      setHfMode("LOT");
      fc_txtLotNo.current.focus();
    } else if (mode == "TRAY") {
      settxtLot((prevState) => ({
        ...prevState,
        disbled: true,
        style: { background: "#eeeeee" },
      }));
      setlblSerialNG("");
      settxtPackingNo((prevState) => ({
        ...prevState,
        visble: "none",
      }));
      setlblLog((prevState) => ({ ...prevState, visble: "none" }));
      setgvSerial((prevState) => ({ ...prevState, visble: "" }));
      setHfMode("LOT");
      getInitialSerial();
      setHfMode("TRAY");
      fc_txtTray.current.focus();
    } else if (mode == "TRAY_ERROR") {
      settxtLot((prevState) => ({
        ...prevState,
        disbled: true,
        style: { background: "#eeeeee" },
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
      fc_txtTray.current.focus();
    } else if (mode == "PACK") {
      settxtLot((prevState) => ({
        ...prevState,
        disbled: true,
        style: { background: "#eeeeee" },
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
      fc_txtPackingNo.current.focus();
    } else if (mode == "SERIAL") {
      settxtLot((prevState) => ({
        ...prevState,
        disbled: true,
        style: { background: "#eeeeee" },
      }));
      settxtPackingNo((prevState) => ({
        ...prevState,
        disbled: true,
        style: { background: "#eeeeee" },
      }));
      setlblLog((prevState) => ({ ...prevState, visble: "none" }));
      setHfMode("SERIAL");
      setgvSerial((prevState) => ({ ...prevState, visble: "" }));
      getInitialSerial();
    } else if (mode == "SERIAL_ERROR") {
      settxtLot((prevState) => ({
        ...prevState,
        disbled: true,
        style: { background: "#eeeeee" },
      }));
      setlblLog((prevState) => ({ ...prevState, visble: "" }));
    } else if (mode == "SERIAL_OK") {
      settxtLot((prevState) => ({
        ...prevState,
        disbled: true,
        style: { background: "#eeeeee" },
      }));
      setlblLog((prevState) => ({ ...prevState, visble: "none" }));
      setgvSerial((prevState) => ({ ...prevState, visble: "" }));
      getInitialSerial();
      fc_txtSerial.current[0].focus();
    } else if (mode == "SERIAL_NG") {
      settxtLot((prevState) => ({
        ...prevState,
        disbled: true,
        style: { background: "#eeeeee" },
      }));
      setlblLog((prevState) => ({ ...prevState, visble: "" }));
    }
  };

  const getInitialSerial = async () => {
    let dtData = [];
    for (let intRow = 0; intRow < txtPcsTray.value; intRow++) {
      dtData.push({
        SEQ: intRow + 1,
      });
    }
    setgvSerial((prevState) => ({ ...prevState, value: dtData }));
    if (gvSerial.value.length > 0) {
      console.log(hfMode, "hfMode");
      fc_txtSerial.current[0].focus();
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
    setgvSerial((prevState) => ({ ...prevState, visble: "none" }));
    SetMode("LOT");
    fc_txtLotNo.current.focus();
  };

  const btnCancel_Click = async () => {
    SetMode("SERIAL");
  };

  const btnSave_Click = async () => {
    if (hfMode == "SERIAL") {
      console.log("setSerialDataTray");
      setSerialDataTray();
    }
  };

  const ibtPackingBack_Click = async () => {
    SetMode("PACK");
  };

  const ddlProduct_SelectedIndexChanged = async (valueProduct) => {
    setSl_Product((prevState) => ({ ...prevState, value: valueProduct }));
    console.log(valueProduct, Sl_Product.value);
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

  const txtPcsTray_TextChanged = async () => {
    if (!isNaN(txtPcsTray.value)) {
      setHfserialcount(txtPcsTray.value);
      if (parseInt(txtPcsTray.value) !== parseInt(hfSerialCountOriginal)) {
        setlblLastTray("Use");
      } else {
        setlblLastTray("Not Use");
      }
      SetMode("SERIAL");
    }
  };

  const txtPackingNo_TextChanged = async () => {
    if (txtPackingNo.value.trim().length !== 0) {
      let dtLotPassCount;
      let dtPackPassCount;

      await axios
        .post("/api/Common/getSerialPassByLot", {
          strLotNo: lblLot,
          strPlantCode: "5",
        })
        .then((res) => {
          dtLotPassCount = res.data.lotcount;
        });

      await axios
        .post("/api/Common/getserialpassbylotpacking", {
          strlotNo: lblLot,
          strPackingGroup: txtPackingNo.value,
          strPlantCode: "5",
        })
        .then((res) => {
          dtPackPassCount = res.data.lotcount;
        });
      console.log("Packkkkingtxt", dtPackPassCount, " ", dtLotPassCount);
      setlblLotTotal(0);
      setlblSerialNG(0);
      if (dtLotPassCount > 0) {
        setlblLotTotal(dtLotPassCount);
      }

      if (dtPackPassCount > 0) {
        setlblLotTotal(dtLotPassCount + " / " + lblLotTotal);
      } else {
        setlblLotTotal("0 / " + lblLotTotal);
      }
      SetMode("SERIAL");
    } else {
      SetMode("PACK");
    }
  };

  const getInputSerial = () => {
    let dtData = [];
    for (let intSht = 0; intSht < gvSerial.value.length; intSht++) {
      dtData.push({
        SEQ: intSht + 1,
        SERIAL: txtSerial[intSht],
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
        PACKING_NO: txtPackingNo.value,
        MASTER_NO: "",
        FRONT_SHEET_NO: "",
        BACK_SHEET_NO: "",
        SHEET_PCS_NO: 0,
        ROLL_LEAF_NO: "",
      });
      if (dtData[intSht].SERIAL != "") {
        //      For intNo As Integer = 0 To intRow - 2
        //           If drRow("SERIAL").ToString.Trim = CType(gvSerial.Rows(intNo).FindControl("txtSerial"), TextBox).Text.Trim.ToUpper Then
        //               drRow("ROW_COUNT") = 9
        //               Exit For
        //           End If
        //       Next
      }
    }
    return dtData;
  };

  const handleSerialChange = async (index, event) => {
    const newValues = [...txtSerial];
    newValues[index] = event.target.value;
    settxtSerial(newValues);
  };

  const setSerialDataTray = async () => {
    let dtSerial = getInputSerial();
    console.log(dtSerial, "dtSerial");
    // let xxxx = '';
    let _strLot =lblLot.trim().toUpperCase();
    console.log('_strLot ',lblLot,lblLot.trim(),lblLot.trim().toUpperCase())
    let _strPrdName = Sl_Product.value;
    let _strTray;
    let _bolTrayError = false;
    let _bolError = false;
    let _strScanResultAll = "OK";
    let _intRowSerial = 0;
    let _dblPlasmaRemain;
    let dblPlasmaRemain = parseFloat(hfPlasmaTime);

    if (!_bolTrayError) {
      for(let i=0;i<dtSerial.length;i++){
        await axios
        .post("/api/common/GetSerialTestResultManyTable", {
          dataList: [{strPlantCode:'5',strPrdname:_strPrdName,strWeekCodeType:hfWeekCodeType,strSerial:dtSerial[i].SERIAL}],dtSerial:dtSerial
        })
        .then((res) => {
          dtSerial[i]=res.data
        })
      }
     console.log(hfCheckWeekCode,'hfCheckWeekCode')
      if (hfCheckWeekCode == "Y") {
        await axios
        .post("/api/common/GetWeekCodebyLot", {
          _strLot:_strLot, _strProc:hfDateInProc,_strWeekType:hfWeekCodeType ,_strSerialInfo:hfSerialInfo
        })
        .then((res) => {
         console.log(res.data,'hfWeekCodehfWeekCode')
         setHfWeekCode(res.data)
        })
      }
      for (let drRow = 0; drRow < dtSerial.length; drRow++) {
        if (dtSerial[drRow].SERIAL) {
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
          if (_strScanResultUpdate != "NG") {
            if (DUPLICATE_CHECK_FLG == "1") {
              if (dtSerial[drRow].ROW_COUNT == 0) {
                // _intCountDup = BIZ_ScanSMTSerial.GetSerialDuplicate(Session("PLANT_CODE"), Mid(_strSerial, CInt(hfDuplicateStart.Value), ((CInt(hfDuplicateEnd.Value) - CInt(hfDuplicateStart.Value)) + 1)), Session("PRODUCT_KIND"))
                dtSerial[drRow].ROW_COUNT = _intCountDup;
              } else {
                _intCountDup = dtSerial[drRow].ROW_COUNT;
              }
            }
            // Check format serial no
            if (
              _strSerial.length == parseInt(hfSerialLength, 10) &&
              _strScanResultUpdate != "NG"
            ) {
              let _strFixDigit;
              let GetCheckSumSerial;
              // If Not BIZ_ScanSMTSerial.GetCheckSumSerial(_strSerial, hfWeekCodeType.Value, CInt(hfSerialEndDigit.Value)) Then
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
                _strFixDigit = _strSerial.substring(startDigit - 1, endDigit);
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
                    configStart - 1,
                    configEnd
                  );
                }
              }
              if (hfSerialStartCode != "" && _strScanResultUpdate != "NG") {
                if (
                  _strSerial.substring(0, hfSerialStartCode.length) !==
                  hfSerialStartCode
                ) {
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
              if (hfCheckStartSeq == "Y" && _strScanResultUpdate != "NG") {
                let _strStartSeq;
                _strStartSeq = _strSerial.substring(
                  parseInt(hfCheckStartSeqStart) - 1,
                  parseInt(hfCheckStartSeqEnd)
                );
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
              if (!_bolError) {
                for (
                  let _intRow = _intRowSerial + 1;
                  _intRow < dtSerial.length - 1;
                  i++
                ) {
                  if (
                    _strSerial.toUpperCase ==
                    dtSerial[_intRow].SERIAL.trim().toUpperCase
                  ) {
                    _strMessageUpdate =
                      "Serial duplicate in tray / หมายเลขบาร์โค้ดซ้ำในถาดเดียวกัน";
                    _strRemark = "Serial duplicate in tray  ";
                    _strScanResultUpdate = "NG";
                    _strTestResultUpdate = _strTestResult;
                    dtSerial[drRow].REMARK_UPDATE = _strRemark;
                    dtSerial[drRow].ROW_UPDATE = "N";
                    _intCountNG = 1;
                    _bolError = True;
                  }
                }
              }
              if (!_bolError && hfCheckPrdSht == "Y") {
                let strSheetLot;
                let _strShtNo;
                // Dim _strShtNo As String = BIZ_ScanSMTSerial.GetSheetNoBySerialNo(Session("PLANT_CODE"), _strSerial, Session("PRODUCT_KIND"), strSheetLot)
                if (
                  _strShtNo.trim() !== "" &&
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
              //-----
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
                  // _Result = BIZ_ScanSMTSerial.Get_SPI_AOI_RESULT(Session("PLANT_CODE"), _intShtSeq, Session("PRODUCT_KIND"), _FrontSheetBarcode, _RearSheetBarcode, _strPrdName, _strMessage)
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
                    _bolError = True;
                  }
                }
                if (hfPlasmaCheck == "Y" && _strRejectGroup != "MASTER") {
                  let _dblPlasmaTime;
                  //  _dblPlasmaTime As Double = BIZ_ScanSMTSerial.GetPlasmaTimeBySerialNo(Session("PLANT_CODE"), _strSerial, _strPrdName, txtPackingNo.Text.Trim.ToUpper, Session("PRODUCT_KIND"))
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
                // _intCheckPass As Integer = BIZ_ScanSMTSerial.GetCheckChipDuplicate(Session("PLANT_CODE"), Session("PRODUCT_KIND"), _strPrdName, _strSerial)
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
                // _strEFPCRemark As String = BIZ_ScanSMTSerial.GetEFPCSheetInspectionResult(Session("PLANT_CODE"), Session("PRODUCT_KIND"), _strPrdName, drRow("FRONT_SHEET_NO"), drRow("BACK_SHEET_NO"), CInt(drRow("SHEET_PCS_NO").ToString), hfCheckEFPCAOM.Value, hfCheckEFPCAOI.Value, hfCheckEFPCOST.Value, hfCheckEFPCAVI.Value, _strEFPCResult)
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
                // _strInspResult As String = BIZ_ScanSMTSerial.GetSerialFinInspectResult(Session("PLANT_CODE"), _strSerial, hfCheckFinInspectProc.Value, Session("PRODUCT_KIND"))
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
                // _intCheckPass As Integer = BIZ_ScanSMTSerial.GetCheckSpecialBySerial(Session("PLANT_CODE"), Session("PRODUCT_KIND"), _strSerial, FINAL_GATE_SPECIAL_SERIAL_VAR, FINAL_GATE_SPECIAL_OK, FINAL_GATE_SPECIAL_QUERY)
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
          }
          if (_strRejectGroup == "MASTER") {
            _strScanResultUpdate = "NG";
            _strTestResultUpdate = _strTestResult;
            _strTouchUp = "";
            _strReject2 = "";
            _bolError = true;
            if (_strTestResult == "OK" && _strMessageUpdate.trim() == "") {
              _strMessageUpdate = "";
            }
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

          if (_bolError) {
            // lblSerialNG.textContent = (
            //   parseInt(lblSerialNG.textContent) + 1
            // ).toString();
          }
        }
        _intRowSerial = _intRowSerial + 1;
      }

      setlblResult((prevState) => ({ ...prevState, value: _strScanResultAll }));
      if (_strScanResultAll == "NG") {
        setlblResult((prevState) => ({
          ...prevState,
          style: { color: "red" },
        }));
      } else {
        setlblResult((prevState) => ({
          ...prevState,
          style: { color: "green" },
        }));
      }
      if (hfPlasmaCheck == "Y" && hfPlasmaHideTime == "N") {
        if (_dblPlasmaRemain > 0) {
          let labeltime= 'Remain'
         
          if (Math.floor(_dblPlasmaRemain) > 0) {
            
              setlblTime((prevState) => ({ ...prevState, value: "Remain"+Math.floor(_dblPlasmaRemain).toString() + " hr. " }));
          }
          if (_dblPlasmaRemain % 1 > 0) {
            setlblTime((prevState) => ({ ...prevState, value: "Remain"+ Math.floor((_dblPlasmaRemain % 1) * 60).toString() + " min. "}));
            
          }
         setlblTime((prevState) => ({ ...prevState, style:{color:'Green'} }));
        }
        else{
          setlblTime((prevState) => ({ ...prevState, style:{color:'Red'},value: "Over " + hfPlasmaTime + " hr."}));
        }
      }
      else{
        setlblTime((prevState) => ({ ...prevState, value: "" }));
      }
      let _strErrorUpdate
      if(_strScanResultAll=='OK'){
        // _strErrorUpdate = BIZ_ScanSMTSerial.SetSerialLotTrayTable(Session("PLANT_CODE"), _strLot, _strPrdName, dtSerial, hfUserID.Value, hfUserStation.Value, Session("PRODUCT_KIND"))
      if(_strErrorUpdate!=''){
        setlblResult((prevState) => ({ ...prevState, value:"Error :" + _strErrorUpdate,style:{color:'Red'}}));
      }
      }
    }
    setlblLotTotal(0);
    let dtLotPassCount;
    let dtPackPassCount;
    if (hfCheckPackingNo == "Y") {
      await axios
        .post("/api/Common/getSerialPassByLot", {
          strLotNo: dtSerial.SERIAL,
          strPlantCode: "5",
        })
        .then((res) => {
          dtLotPassCount = res.data.lotcount;
        });

      await axios
        .post("/api/Common/getserialpassbylotpacking", {
          strlotNo: lblLot,
          strPackingGroup: txtPackingNo.value,
          strPlantCode: "5",
        })
        .then((res) => {
          console.log( res.data,'dtPackPassCountxx')
          dtPackPassCount = res.data.lot_count;
          console.log(dtPackPassCount,'dtPackPassCount')
        });
      if (dtLotPassCount.length > 0 ) {
        setlblLotTotal(dtLotPassCount);
      }
      console.log(dtPackPassCount,'dtPackPassCount.')
      if (dtPackPassCount.length > 0 ) {
        setlblLotTotal(dtPackPassCount);
      } else {
        setlblLotTotal("0 / " + lblLotTotal);
      }
    }
    else{

      await axios
      .post("/api/Common/getSerialPassByLot", {
        strLotNo: dtSerial[0].SERIAL,
        strPlantCode: "5",
      })
      .then((res) => {
        dtLotPassCount = res.data.lotcount;
      });
      if (dtLotPassCount.length > 0) {
        setlblLotTotal(dtLotPassCount);
      }
    }
    if(!_bolTrayError){
      console.log('มีแวรู่ ',dtSerial)
      setgvScanResult((prevState) => ({ ...prevState, visble: true,value :dtSerial.flat()})); 
    }
    else{
      console.log('ไม่มีแวรู่ ',dtSerial)
      setgvScanResult((prevState) => ({ ...prevState, visble: true,value :{}}));
    }
    settxtPcsTray((prevState) => ({ ...prevState,value:hfSerialCountOriginal }));
    setHfserialcount(hfSerialCountOriginal)
    getInitialSerial()
    setlblLastTray("Not Use")
  };

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
    txtPcsTray_TextChanged,
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
    lblResult
  };
}

export { fn_ScanSMTSerialPcsChrome };
