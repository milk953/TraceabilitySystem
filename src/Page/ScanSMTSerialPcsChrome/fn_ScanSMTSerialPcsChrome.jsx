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
    visble: "",
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

  const [txtSerial, settxtSerial] = useState(
    Array(gvSerial.value.length).fill("")
  );

  const [lblLastTray, setlblLastTray] = useState("Not Use");
  const [lblLotTotal, setlblLotTotal] = useState("");
  const [lblLot, setlblLot] = useState("");
  const [lblSerialNG, setlblSerialNG] = useState("");
  const [lblLog, setlblLog] = useState({
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
      console.log('gvSerialgvSerialgvSerial')
      getInitialSerial();
      if (gvSerial.value.length > 0) {
        fc_txtSerial.current[0].focus();
      }
    }
  }, [gvSerial.visble, gvSerial.value.length]);

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
              dtLotProduct = res.data.flat().flat();
            });
          if (dtLotProduct > 0) {
            if (dtLotProduct[0][2] == "y") {
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
                    console.log(
                      datagetPd.prm_final_packing_group_flg,
                      "datagetPd"
                    );
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
        visble: "ซ่อน",
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
        visble: "ซ่อน",
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
        visble: "ซ่อน",
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
        visble: "ซ่อน",
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
        visble: "ซ่อน",
        value: "",
        disbled: false,
        style: { background: "" },
        visble: "โชว์",
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
      setgvSerial((prevState) => ({ ...prevState, visble: '' }));
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
    for (let intRow = 0; intRow < hfserialcount; intRow++) {
      dtData.push({
        SEQ: intRow + 1,
      });
    }
    setgvSerial((prevState) => ({ ...prevState, value: dtData }));
    if (gvSerial.value.length>0) {
      console.log(hfMode,'hfMode')
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
      console.log('setSerialDataTray')
      // setSerialDataTray()
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
      setlblLotTotal(0);
      setlblSerialNG(0);
      if (dtLotPassCount > 0) {
        setlblLotTotal(dtLotPassCount);
      }

      if (dtPackPassCount > 0) {
        setlblLotTotal(dtLotPassCount + " / " + lblLotTotal);
      } else {
        setlblLotTotal("0/ " + lblLotTotal);
      }
      SetMode("SERIAL");
    } else {
      SetMode("PACK");
    }
  };

  const getInputSerial = async () => {
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
        ROW_UPDATE: "",
        UPDATE_FLG: "",
        PACKING_NO: txtPackingNo.value,
        MASTER_NO: "",
        FRONT_SHEET_NO: "",
        BACK_SHEET_NO: "N",
        SHEET_PCS_NO: 0,
        ROLL_LEAF_NO: "",
      });
      if (dtData[i].SERIAL != "") {
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
    btnCancel_Click
  };
}

export { fn_ScanSMTSerialPcsChrome };
