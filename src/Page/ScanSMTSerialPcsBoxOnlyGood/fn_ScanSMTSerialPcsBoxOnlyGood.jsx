// Eye
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { color } from "framer-motion";
import { green } from "@mui/material/colors";
import styled from "styled-components";

function fn_ScanSMTSerialPcsBoxOnlyGood() {
  const [disabledState, setDisabledState] = useState({
    styled: { disabled: true, backgroundColor: "#B2A8A8" },
  });
  const [enableState, setEnableState] = useState({
    styled: { backgroundColor: "" },
  });
  const [txtLot, settxtLot] = useState({
    value: "",
    disbled: "",
    visble: "",
    style: { enableState },
  });
  const [ddlProduct, setddlProduct] = useState([]);
  const [selectddlProduct, setselectddlProduct] = useState({
    value: "",
    disbled: "",
    visble: "",
    style: {},
  });
  const [lblLotTotal, setlblLotTotal] = useState({
    value: "",
    disbled: "",
    visble: "",
    style: {},
  });
  const [lblSerialNG, setlblSerialNG] = useState({
    value: "",
    disbled: "",
    visble: "",
    style: {},
  });
  const [lblLot, setlblLot] = useState({
    value: "",
    disbled: "",
    visble: "",
    style: {},
  });
  const [lblLog, setlblLog] = useState({
    value: "",
    disbled: "",
    visble: false,
    style: {},
  });
  lblLog;

  const [txtBox, settxtBox] = useState({
    value: "",
    disbled: "",
    visble: "",
    style: {},
  });
  const [txtPack, settxtPack] = useState({
    value: "",
    disbled: "",
    visble: "",
    style: {},
  });
  const [txtMachine, settxtMachine] = useState({
    value: "",
    disbled: "",
    visble: "",
    style: {},
  });
  const [txtOP, settxtOP] = useState({
    value: "",
    disbled: "",
    visble: "",
    style: {},
  });

  const [lblBox, setlblBox] = useState({
    value: "",
    disbled: "",
    visble: "",
    style: {},
  });
  const [lblBoxFull, setlblBoxFull] = useState({
    value: "",
    disbled: "",
    visble: "",
    style: {},
  });
  const [lblBoxTotal, setlblBoxTotal] = useState({
    value: "",
    disbled: "",
    visble: "",
    style: {},
  });
  const [lblBoxStatus, setlblBoxStatus] = useState({
    value: "",
    disbled: "",
    visble: "",
    style: { textAlign: "center", width: "15%" },
  });
  const [lblPacking, setlblPacking] = useState({
    value: "",
    disbled: "",
    visble: "",
    style: {},
  });
  const [lblPackingTotal, setlblPackingTotal] = useState({
    value: "",
    disbled: "",
    visble: "",
    style: {},
  });
  const [lblLastTray, setlblLastTray] = useState({
    value: "",
    disbled: "",
    visble: "",
    style: {},
  });
  const [lblOP, setlblOP] = useState({
    value: "",
    disbled: "",
    visble: "",
    style: {},
  });
  const [txtPcsTray, settxtPcsTray] = useState({
    value: "0",
    disbled: "",
    visble: "",
    style: {},
  });
  const [lblTime, setlblTime] = useState({
    value: "",
    disbled: "",
    visble: "",
    style: {},
  });
  const [lblResult, setlblResult] = useState({
    value: "",
    disbled: "",
    visble: "",
    style: {},
  });
  const [txtSerial, settxtSerial] = useState("");

  const [gvSerial, setgvSerial] = useState([]);

  // Visible
  const [pnlLog, setpnlLog] = useState(true);
  const [ibtback, setibtback] = useState(true);
  const [ibtBox, setibtBox] = useState(true);
  const [ibtPack, seibtPack] = useState(true);
  const [ibtMachineBack, setibtMachineBack] = useState(true);
  const [ibtOPBack, setibtOPBack] = useState(true);

  //gv
  const [pnlSerial, setpnlSerial] = useState(true);
  const [pnlMachine, setpnlMachine] = useState(true);
  const [pnlOP, setpnlOP] = useState(true);

  // Focus
  const fntxtLot = useRef([]);
  const fntxtMachine = useRef([]);
  const fntxtTray = useRef([]);
  const fntxtBox = useRef([]);
  const fntxtOP = useRef([]);
  const fntxtPack = useRef([]);
  const fc_txtSerial = useRef([]);
  // const fngvSerial = useRef([]);

  // disable
  const [dis_ddlProduct, setdis_ddlProduct] = useState(true);

  const FAC = import.meta.env.VITE_FAC;

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
  const [hfPlasmaCheck, setHfPlasmaCheck] = useState("");
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

  const [hfPlasmaBoxCheck, setHfPlasmaBoxCheck] = useState("");
  const [hfPlasmaBoxTime, setHfPlasmaBoxTime] = useState("");

  const [hfUserID, sethfUserID] = useState("");
  const [hfUserStation, sethfUserStation] = useState("");

  const [hfFQC, setHfFQC] = useState("");
  const [hfOP, setHfOP] = useState("");
  // const [hfFQC, setHfFQC] = useState("");

  const params = new URLSearchParams(window.location.search);
  const FQC = params.get("FQC");
  const OP = params.get("OP");

  console.log(OP, "OP");

  useEffect(() => {
    let ID = localStorage.getItem("ipAddress");
    sethfUserID(ID);
    sethfUserStation(ID);
    setHfMode("");
    setHfLotAll("");
    const fetchData = async () => {
      await GetProductData();
    };
    fetchData();
    if (FQC !== null) {
      setHfFQC(FQC);
      setHfOP(OP)
    } else {
      setHfFQC("");
    }
    if (OP !== null) {
      setHfOP(OP);
    } else {
      setHfOP("");
    }
    SetMode("LOT");

    // PageLoad();
  }, []);
  useEffect(() => {
    if (gvSerial.length > 0) {
      fc_txtSerial.current[0].focus();
      getInitialSerial();
    }
  }, [gvSerial.length]);

  const txtLot_TextChanged = async () => {
    if (txtLot.value !== "") {
      let _strPrdName = "";
      let _strLot = "";
      let _strLotAll = txtLot.value.toUpperCase().split(";");
      if (_strLotAll.length > 2) {
        _strLot = _strLotAll[0];
        _strPrdName = selectddlProduct.value;
        setHfTestResultFlag("Y");
        if (_strLot.length == hfLotLength) {
          await axios
            .post("/api/Common/GetProductNameByLot", {
              strLot: _strLot,
            })
            .then((res) => {
              _strPrdName = res.data.prdName[0];
            });
          let dtLotPassCount = [];
          await axios
            .post("/api/Common/getSerialPassByLot", {
              strLotNo: _strLot,
              strPlantCode: "5",
            })
            .then((res) => {
              dtLotPassCount = res.data.lotcount;
              setlblLotTotal((prevState) => ({ ...prevState, value: "0" }));
              setlblSerialNG((prevState) => ({ ...prevState, value: "0" }));
            });
          if (dtLotPassCount.length > 0) {
            setlblLotTotal((prevState) => ({
              ...prevState,
              value: dtLotPassCount,
            }));
          }

          let dtLotProduct = [];
          await axios
            .post("/api/Common/getProductDataByLot", {
              strLot: _strLot,
            })
            .then((res) => {
              dtLotProduct = res.data.flat().flat();
            });
          if (dtLotProduct.length > 0) {
            if (dtLotProduct[0][2] == "Y") {
              setHfTestResultFlag("N");
            }
            setHfLotAll(dtLotProduct[0][3]);
          }
          setlblLot((prevState) => ({ ...prevState, value: _strLot }));
          try {
            const isInArray = ddlProduct.some(
              (item) => item.prd_name === _strPrdName
            );
            if (isInArray) {
              setselectddlProduct((prevState) => ({
                ...prevState,
                value: _strPrdName,
              }));
            }
            await axios
              .post("/api/Common/GetFinalGateMasterCheckResult", {
                strProduct: _strLot,
              })
              .then(async (res) => {
                let GetFinalGateMasterCheckResult = res.data;
                if (GetFinalGateMasterCheckResult == "OK") {
                  getProductSerialMaster(_strPrdName);
                  if (hfFQC == "Y") {
                    SetMode("MACHINE");
                  } else {
                    SetMode("BOX");
                  }
                } else {
                  setlblLog((prevState) => ({
                    ...prevState,
                    value: `${_strPrdName} not test master! / ${_strPrdName} ยังไม่ทดสอบมาสเตอร์ `,
                    visble: "",
                  }));
                  setlblLog((prevState) => ({ ...prevState, value: "" }));
                  setlblLotTotal((prevState) => ({
                    ...prevState,
                    value: "",
                  }));
                  setlblSerialNG((prevState) => ({
                    ...prevState,
                    value: "",
                  }));
                  SetMode("LOT_ERROR");
                  setpnlLog(true);
                }
              });
          } catch (error) {
            const intProduct = _strPrdName.indexOf("-", 13);
            if (intProduct > 0) {
              _strPrdName =
                _strPrdName.substring(0, intProduct) +
                _strPrdName.substring(intProduct + 1, intProduct + 11).trim();
              try {
                setselectddlProduct(_strPrdName);
                await axios
                  .post("/api/Common/GetFinalGateMasterCheckResult", {
                    strProduct: _strLot,
                  })
                  .then(async (res) => {
                    let GetFinalGateMasterCheckResult = res.data;
                    if (GetFinalGateMasterCheckResult == "OK") {
                      await getProductSerialMaster(_strPrdName);
                      if (hfFQC == "Y") {
                        SetMode("MACHINE");
                      } else {
                        SetMode("BOX");
                      }
                    } else {
                      setlblLog((prevState) => ({
                        ...prevState,
                        value: `${_strPrdName} not test master! / ${_strPrdName} ยังไม่ทดสอบมาสเตอร์ `,
                      }));
                      setlblLot((prevState) => ({ ...prevState, value: "" }));
                      setlblLotTotal((prevState) => ({
                        ...prevState,
                        value: "",
                      }));
                      setlblSerialNG((prevState) => ({
                        ...prevState,
                        value: "",
                      }));
                      setpnlLog(true);
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
                // fc_SlProduct.current.focus();
              }
            } else {
              setlblLog((prevState) => ({
                ...prevState,
                value: `Product ${_strPrdName} not found.`,
                visble: "",
              }));
              await getProductSerialMaster(_strPrdName);
              setpnlLog(true);
              // fc_SlProduct.current.focus();
            }
          }
        } else {
          setlblLog((prevState) => ({
            ...prevState,
            value:
              " Please scan QR Code! /" + _strLot + "หมายเลขล็อตไม่ถูกต้อง",
          }));
          setlblLot((prevState) => ({ ...prevState, value: "" }));
          setlblLotTotal((prevState) => ({ ...prevState, value: "" }));
          setlblSerialNG((prevState) => ({ ...prevState, value: "" }));
          SetMode("LOT_ERROR");
        }
      } else {
        setlblLog((prevState) => ({
          ...prevState,
          value: " Please scan QR Code! / กรุณาสแกนที่คิวอาร์โค้ด",
        }));
        setlblLot((prevState) => ({ ...prevState, value: "" }));
        setlblLotTotal((prevState) => ({ ...prevState, value: "" }));
        setlblSerialNG((prevState) => ({ ...prevState, value: "" }));
        SetMode("LOT_ERROR");
      }
    } else {
      setlblLot((prevState) => ({ ...prevState, value: "" }));
      fntxtLot.current.focus();
    }
  };
  const GetProductData = async () => {
    await axios.get("/api/Common/GetProductData").then(async (res) => {
      let data = res.data.flat();
      setddlProduct(data);
      setselectddlProduct((prevState) => ({
        ...prevState,
        value: data[0].prd_name,
      }));
      await getProductSerialMaster(data[0].prd_name);
    });
  };
  const ddlProduct_SelectedIndexChanged = async (selectvalue) => {
    setselectddlProduct((prevState) => ({ ...prevState, value: selectvalue }));
    if (lblLot.value !== "") {
      await axios
        .post("/api/Common/GetFinalGateMasterCheckResult", {
          strProduct: lblLot,
        })
        .then(async (res) => {});
    }
  };
  const getProductSerialMaster = async (PrdName) => {
    let dtProductSerial = [];
    let dtProductBox = [];
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

    setpnlLog(false);
    setlblLog((prevState) => ({ ...prevState, value: "" }));
    setHfSerialStartCode("");

    await axios
      .post("/api/common/GetSerialProductByProduct", {
        prdName: PrdName,
      })
      .then((res) => {
        dtProductSerial = res.data[0];
        if (dtProductSerial != null) {
          setHfSerialLength(dtProductSerial.slm_serial_length);
          setHfSerialFixFlag(dtProductSerial.slm_fix_flag);
          setHfSerialDigit(dtProductSerial.slm_fix_digit);
          setHfSerialStartDigit(dtProductSerial.slm_fix_start_digit);
          setHfSerialEndDigit(dtProductSerial.slm_fix_end_digit);
          setHfTrayFlag(dtProductSerial.slm_tray_flag);
          setHfTrayLength(dtProductSerial.slm_tray_length);
          setHfTestResultFlag(dtProductSerial.slm_test_result_flag);
          setHfserialcount(dtProductSerial.slm_serial_count);
          setHfAutoScan(dtProductSerial.slm_auto_scan); //sethfautoscan,sethfcheckaoicoatf
          setHfConfigCheck(dtProductSerial.prm_barcode_req_config);
          setHfConfigCode(dtProductSerial.prm_config_code);
          setHfConfigStart(dtProductSerial.prm_start_config);
          setHfConfigEnd(dtProductSerial.prm_end_config);
          setHfConfigRuning(dtProductSerial.prm_running_req_config);
          setHfDuplicateStart(dtProductSerial.prm_duplicate_start);
          setHfDuplicateEnd(dtProductSerial.prm_duplicate_end);
          setHfChipIDCheck(dtProductSerial.prm_check_chip_id_flg);
          setHfCheckPrdSht(dtProductSerial.prm_req_check_prd_sht);
          setHfCheckPrdShtStart(dtProductSerial.prm_check_prd_sht_start);
          setHfCheckPrdShtEnd(dtProductSerial.prm_check_prd_sht_end);
          setHfCheckPrdAbbr(dtProductSerial.prm_abbr);
          setHfPlasmaCheck(dtProductSerial.prm_plasma_time_flg);
          setHfPlasmaTime(dtProductSerial.prm_plasma_time);
          setHfCheckStartSeq(dtProductSerial.prm_req_start_seq_flg);
          setHfCheckStartSeqCode(dtProductSerial.prm_start_seq_code);
          setHfCheckStartSeqStart(dtProductSerial.prm_start_seq_start);
          setHfCheckStartSeqEnd(dtProductSerial.prm_start_seq_end);
          setHfCheckSPIAOI(dtProductSerial.prm_final_aoi_spi_flg);
          setHfCheckDateInProc(dtProductSerial.prm_date_inproc_flg);
          setHfDateInProc(dtProductSerial.prm_date_inproc);
          setHfWeekCodeType(dtProductSerial.prm_date_type);
          setHfCheckWeekCode(dtProductSerial.prm_check_weekcode_flg);
          setHfCheckWeekCodeStart(dtProductSerial.prm_check_weekcode_start);
          setHfCheckWeekCodeEnd(dtProductSerial.prm_check_weekcode_end);
          setHfCheckPreAOIF(dtProductSerial.prm_sht_pre_aoi_f);
          setHfCheckPreAOIB(dtProductSerial.prm_sht_pre_aoi_b);
          setHfCheckAOIF(dtProductSerial.prm_sht_aoi_f);
          setHfCheckAOIB(dtProductSerial.prm_sht_aoi_b);
          setHfCheckAOICoatF(dtProductSerial.prm_sht_aoi_coat_f);
          setHfCheckAOICoatB(dtProductSerial.prm_sht_aoi_coat_b);
          setHfCheckSPIF(dtProductSerial.prm_sht_spi_f);
          setHfCheckSPIB(dtProductSerial.prm_sht_spi_b);
          setHfCheckPackingNo(dtProductSerial.prm_final_packing_group_flg);
          setHfSerialStartCode(dtProductSerial.prm_serial_start_code);
          setHfPlasmaSkipELT(dtProductSerial.prm_plasma_time_skip_elt);
          setHfPlasmaHideTime(dtProductSerial.prm_plasma_time_hide_time);
          setHfCheckEFPCAOM(dtProductSerial.prm_check_efpc_aom_flg);
          setHfCheckEFPCAOI(dtProductSerial.prm_check_efpc_aoi_flg);
          setHfCheckEFPCOST(dtProductSerial.prm_check_efpc_ost_flg);
          setHfCheckEFPCAVI(dtProductSerial.prm_check_efpc_avi_flg);
          setHfSerialInfo(dtProductSerial.prm_additional_info);
          setHfCheckXrayF(dtProductSerial.prm_sht_xray_f);
          setHfCheckXrayB(dtProductSerial.prm_sht_xray_b);
          setHfCheckXrayOneTime(dtProductSerial.prm_sht_xray_1_time_flg);
          setHfCheckFinInspect(dtProductSerial.prm_fin_gate_inspect_flg);
          setHfCheckFinInspectProc(dtProductSerial.prm_fin_gate_inspect_proc);
          setHfSerialCountOriginal(dtProductSerial.slm_serial_count);

          settxtPcsTray((prevState) => ({
            ...prevState,
            value: dtProductSerial.slm_serial_count,
          }));
        }
      });

    await axios
      .post("/api/common/GetSerialBoxProductByProduct", {
        prdName: PrdName,
      })
      .then((res) => {
        dtProductBox = res.data[0];
        if (dtProductBox.length > 0) {
          if (
            hfSerialDigit !== dtProductBox.SLM_FIX_DIGIT ||
            parseInt(hfSerialLength) !== dtProductBox.SLM_FIX_START_DIGIT ||
            parseInt(hfSerialEndDigit) !== dtProductBox.SLM_FIX_END_DIGIT
          ) {
            setpnlLog(true);
            setlblLog((prevState) => ({
              ...prevState,
              value: "Engineering code not same",
            }));
          }
          setHfSerialLength(dtProductBox.SLM_SERIAL_LENGTH);
          setHfSerialFixFlag(dtProductBox.SLM_FIX_FLAG);
          setHfSerialDigit(dtProductBox.SLM_FIX_DIGIT);
          setHfSerialStartDigit(dtProductBox.SLM_FIX_START_DIGIT);
          setHfSerialEndDigit(dtProductBox.SLM_FIX_END_DIGIT);
          setHfTrayFlag(dtProductBox.SLM_TRAY_FLAG);
          setHfTrayLength(dtProductBox.SLM_TRAY_LENGTH);
          setHfserialcount(dtProductBox.SLM_SERIAL_COUNT);
          setHfConfigCheck(dtProductBox.SLM_BARCODE_REQ_CONFIG);
          setHfConfigCode(dtProductBox.SLM_CONFIG_CODE);
          setHfConfigStart(dtProductBox.SLM_START_CONFIG);
          setHfConfigEnd(dtProductBox.SLM_END_CONFIG);
          setHfPlasmaBoxCheck(dtProductBox.SLM_PLASMA_TIME_FLG);
          setHfPlasmaBoxTime(dtProductBox.SLM_PLASMA_TIME);
          setHfSerialStartCode(dtProductBox.SLM_SERIAL_START_CODE);
          settxtPcsTray((prevState) => ({
            ...prevState,
            value: dtProductBox.SLM_SERIAL_START_CODE,
          }));
        } else {
          setpnlLog(true);
          setlblLog((prevState) => ({
            ...prevState,
            value: "Box product master not found!",
          }));
        }
        setHfSerialCountOriginal(hfserialcount);
        setlblLastTray((prevState) => ({ ...prevState, value: "Not Use" }));
      });

    return 0;
  };
  const SetMode = (_strType) => {
    console.log(_strType, "_strType", hfFQC);
    switch (_strType) {
      case "LOT":
        settxtLot((prevState) => ({
          ...prevState,
          value: "",
          disbled: false,
          style: { enableState },
        }));
        settxtBox((prevState) => ({ ...prevState, value: "", disbled: false }));
        settxtPack((prevState) => ({
          ...prevState,
          value: "",
          disbled: false,
        }));
        setlblLot((prevState) => ({ ...prevState, value: "" }));
        setlblLotTotal((prevState) => ({ ...prevState, value: "" }));
        setlblSerialNG((prevState) => ({ ...prevState, value: "" }));
        setlblBox((prevState) => ({ ...prevState, value: "" }));
        setlblBoxFull((prevState) => ({ ...prevState, value: "" }));
        setlblBoxTotal((prevState) => ({ ...prevState, value: "" }));
        setlblBoxStatus((prevState) => ({ ...prevState, value: "" }));
        setlblPacking((prevState) => ({ ...prevState, value: "" }));
        setlblPackingTotal((prevState) => ({ ...prevState, value: "" }));
        setibtback(false);
        setibtBox(false);
        seibtPack(false);
        setpnlLog(false);
        setpnlSerial(false);
        settxtMachine((prevState) => ({ ...prevState, value: "" }));
        settxtOP((prevState) => ({ ...prevState, value: "" }));
        setlblOP((prevState) => ({ ...prevState, value: "" }));
        setibtMachineBack(false);
        setibtOPBack(false);
        if (FQC == "Y") {
          console.log("ก็มาแล้วนิ");
          setpnlMachine(true);
          settxtMachine((prevState) => ({ ...prevState, disbled: false }));
          settxtOP((prevState) => ({ ...prevState, disbled: false }));
        } else {
          setpnlMachine(false);
          setpnlOP(false);
        }
        fntxtLot.current.focus();
        break;
      case "LOT_ERROR":
        settxtLot((prevState) => ({
          ...prevState,
          value: "",
          disbled: false,
          style: { enableState },
        }));
        settxtBox((prevState) => ({ ...prevState, value: "", disbled: true }));
        settxtPack((prevState) => ({
          ...prevState,
          value: "",
          disbled: true,
        }));
        setlblLot((prevState) => ({ ...prevState, value: "" }));
        setlblLotTotal((prevState) => ({ ...prevState, value: "" }));
        setlblSerialNG((prevState) => ({ ...prevState, value: "" }));
        setlblBox((prevState) => ({ ...prevState, value: "" }));
        setlblBoxFull((prevState) => ({ ...prevState, value: "" }));
        setlblBoxTotal((prevState) => ({ ...prevState, value: "" }));
        setlblBoxStatus((prevState) => ({ ...prevState, value: "" }));
        setlblPacking((prevState) => ({ ...prevState, value: "" }));
        setlblPackingTotal((prevState) => ({ ...prevState, value: "" }));
        setibtback(false);
        setibtBox(false);
        seibtPack(false);
        setpnlLog(true);
        setpnlSerial(false);
        setHfMode("LOT");
        settxtMachine((prevState) => ({ ...prevState, value: "" }));
        settxtOP((prevState) => ({ ...prevState, value: "" }));
        setlblOP((prevState) => ({ ...prevState, value: "" }));
        setibtMachineBack(false);
        setibtOPBack(false);
        if (hfFQC == "Y") {
          setpnlMachine(true);
          settxtMachine((prevState) => ({ ...prevState, disbled: false }));
          settxtOP((prevState) => ({ ...prevState, disbled: false }));
        } else {
          setpnlMachine(false);
          setpnlOP(false);
        }
        fntxtLot.current.focus();
        break;
      case "MACHINE":
        settxtLot((prevState) => ({ ...prevState, disbled: true }));
        settxtBox((prevState) => ({ ...prevState, value: "", disbled: true }));
        settxtPack((prevState) => ({
          ...prevState,
          value: "",
          disbled: true,
        }));
        setlblLot((prevState) => ({ ...prevState, value: "" }));
        setlblLotTotal((prevState) => ({ ...prevState, value: "" }));
        setlblSerialNG((prevState) => ({ ...prevState, value: "" }));
        setlblBox((prevState) => ({ ...prevState, value: "" }));
        setlblBoxFull((prevState) => ({ ...prevState, value: "" }));
        setlblBoxTotal((prevState) => ({ ...prevState, value: "" }));
        setlblBoxStatus((prevState) => ({ ...prevState, value: "" }));
        setlblPacking((prevState) => ({ ...prevState, value: "" }));
        setlblPackingTotal((prevState) => ({ ...prevState, value: "" }));
        setibtback(false);
        setibtBox(false);
        seibtPack(false);
        setpnlLog(false);
        setpnlSerial(false);

        setpnlOP(false);
        settxtMachine((prevState) => ({
          ...prevState,
          value: "",
          disbled: true,
          style: { enableState },
        }));
        settxtOP((prevState) => ({ ...prevState, value: "", disbled: false }));
        setlblOP((prevState) => ({ ...prevState, value: "" }));
        setibtMachineBack(true);
        setibtOPBack(false);
        setHfMode("MACHINE");

        // fntxtMachine.current.focus();

        break;
      case "OP":
        settxtLot((prevState) => ({ ...prevState, disbled: true }));
        settxtBox((prevState) => ({ ...prevState, value: "", disbled: true }));
        settxtPack((prevState) => ({
          ...prevState,
          value: "",
          disbled: true,
        }));
        setlblLot((prevState) => ({ ...prevState, value: "" }));
        setlblLotTotal((prevState) => ({ ...prevState, value: "" }));
        setlblSerialNG((prevState) => ({ ...prevState, value: "" }));
        setlblBox((prevState) => ({ ...prevState, value: "" }));
        setlblBoxFull((prevState) => ({ ...prevState, value: "" }));
        setlblBoxTotal((prevState) => ({ ...prevState, value: "" }));
        setlblBoxStatus((prevState) => ({ ...prevState, value: "" }));
        setlblPacking((prevState) => ({ ...prevState, value: "" }));
        setlblPackingTotal((prevState) => ({ ...prevState, value: "" }));
        setibtback(false);
        setibtBox(false);
        seibtPack(false);
        setpnlLog(false);
        setpnlSerial(false);

        setpnlOP(true);
        settxtMachine((prevState) => ({
          ...prevState,
          disbled: false,
        }));
        settxtOP((prevState) => ({
          ...prevState,
          disbled: true,
          style: { enableState },
        }));
        setlblOP((prevState) => ({ ...prevState, value: "" }));
        setibtMachineBack(true);
        setibtOPBack(false);
        setHfMode("MACHINE");

        // fntxtMachine.current.focus();

        break;
      case "TRAY":
        settxtLot((prevState) => ({ ...prevState, disbled: true }));
        setlblSerialNG((prevState) => ({ ...prevState, value: "" }));
        setpnlLog(false);
        setpnlSerial(true);
        getInitialSerial();
        setHfMode("TRAY");
        // fntxtTray.current.focus();

        break;
      case "TRAY_ERROR":
        settxtLot((prevState) => ({ ...prevState, disbled: true }));
        setlblSerialNG((prevState) => ({ ...prevState, value: "" }));
        setpnlLog(true);
        setpnlSerial(false);
        setHfMode("TRAY");
        // fntxtTray.current.focus();
        break;
      case "BOX":
        settxtLot((prevState) => ({ ...prevState, disbled: true }));
        settxtBox((prevState) => ({
          ...prevState,
          value: "",
          disbled: true,
          style: { enableState },
        }));
        settxtPack((prevState) => ({
          ...prevState,
          value: "",
          disbled: false,
        }));
        setlblBox((prevState) => ({ ...prevState, value: "" }));
        setlblBoxFull((prevState) => ({ ...prevState, value: "" }));
        setlblBoxTotal((prevState) => ({ ...prevState, value: "" }));
        setlblBoxStatus((prevState) => ({ ...prevState, value: "" }));
        setlblPacking((prevState) => ({ ...prevState, value: "" }));
        setlblPackingTotal((prevState) => ({ ...prevState, value: "" }));
        setibtback(true);
        setibtBox(false);
        seibtPack(false);
        setpnlLog(false);
        setpnlSerial(false);
        setpnlOP(false);
        if (hfFQC == "Y") {
          settxtMachine((prevState) => ({ ...prevState, disbled: false }));
          settxtOP((prevState) => ({ ...prevState, disbled: false }));
          setibtMachineBack(true);
          setibtOPBack(true);
        } else {
          setpnlMachine(false);
        }
        setHfMode("BOX");
        fntxtBox.current.focus();
        break;
      case "BOX_ERROR":
        settxtLot((prevState) => ({ ...prevState, disbled: true }));
        settxtBox((prevState) => ({
          ...prevState,
          value: "",
          disbled: true,
          style: { enableState },
        }));
        settxtPack((prevState) => ({
          ...prevState,
          value: "",
          disbled: false,
        }));
        setlblLot((prevState) => ({ ...prevState, value: "" }));
        setlblLotTotal((prevState) => ({ ...prevState, value: "" }));
        setlblSerialNG((prevState) => ({ ...prevState, value: "" }));
        setlblBox((prevState) => ({ ...prevState, value: "" }));
        setlblBoxFull((prevState) => ({ ...prevState, value: "" }));
        setlblBoxTotal((prevState) => ({ ...prevState, value: "" }));
        setlblBoxStatus((prevState) => ({ ...prevState, value: "" }));
        setlblPacking((prevState) => ({ ...prevState, value: "" }));
        setlblPackingTotal((prevState) => ({ ...prevState, value: "" }));
        setibtback(true);
        setibtBox(false);
        seibtPack(false);
        setpnlLog(true);
        setpnlSerial(false);
        setpnlOP(false);
        if (hfFQC == "Y") {
          settxtMachine((prevState) => ({ ...prevState, disbled: false }));
          settxtOP((prevState) => ({ ...prevState, disbled: false }));
          setibtMachineBack(true);
          setibtOPBack(true);
        } else {
          setpnlMachine(false);
        }
        setHfMode("BOX");
        fntxtBox.current.focus();
        break;
      case "PACKING":
        setdis_ddlProduct(false);
        settxtLot((prevState) => ({ ...prevState, disbled: true }));
        settxtBox((prevState) => ({ ...prevState, disbled: true }));
        settxtPack((prevState) => ({
          ...prevState,
          value: "",
          disbled: false,
        }));
        setlblPacking((prevState) => ({ ...prevState, value: "" }));
        setlblPackingTotal((prevState) => ({ ...prevState, value: "" }));
        setibtback(true);
        setibtBox(true);
        seibtPack(false);
        setpnlLog(false);
        setpnlSerial(false);
        setpnlOP(false);
        if (hfFQC == "Y") {
          settxtMachine((prevState) => ({ ...prevState, disbled: false }));
          settxtOP((prevState) => ({ ...prevState, disbled: false }));
          setibtMachineBack(true);
          setibtOPBack(true);
        } else {
          setpnlMachine(false);
        }
        setHfMode("PACK");
        fntxtPack.current.focus();
        break;
      case "SERIAL":
        setdis_ddlProduct(false);
        settxtLot((prevState) => ({ ...prevState, disbled: true }));
        settxtBox((prevState) => ({ ...prevState, disbled: true }));
        settxtPack((prevState) => ({
          ...prevState,
          disbled: true,
        }));
        setibtback(true);
        setibtBox(true);
        seibtPack(true);
        setpnlLog(false);
        setpnlSerial(true);
        setpnlOP(false);
        if (hfFQC == "Y") {
          settxtMachine((prevState) => ({ ...prevState, disbled: false }));
          settxtOP((prevState) => ({ ...prevState, disbled: false }));
          setibtMachineBack(true);
          setibtOPBack(true);
        } else {
          setpnlMachine(false);
        }
        setHfMode("SERIAL");
        getInitialSerial();
        break;
      case "SERIAL_ERROR":
        settxtLot((prevState) => ({ ...prevState, disbled: false }));
        setpnlLog(true);
        break;
      case "SERIAL_OK":
        settxtLot((prevState) => ({ ...prevState, disbled: false }));
        setpnlLog(false);
        setpnlSerial(true);
        getInitialSerial();
        // fngvSerial.current.focus();
        break;
      case "SERIAL_NG":
        settxtLot((prevState) => ({ ...prevState, disbled: true }));
        setpnlLog(false);

        break;

      default:
      // คำสั่งที่จะทำถ้า expression ไม่ตรงกับค่าใน case ใดๆ
    }
  };
  const getInitialSerial = async () => {
    let dtData = [];
    for (let intRow = 0; intRow < txtPcsTray.value; intRow++) {
      dtData.push({
        SEQ: intRow + 1,
      });
    }
    setgvSerial(dtData);
    if (gvSerial.length > 0) {
      fc_txtSerial.current[0].focus();
    }
    return 0;
  };
  const txtMachine_TextChanged = () => {
    if (txtMachine.value.trim().toUpperCase() !== "") {
      SetMode("OP");
    }
  };
  const ibtMachineBack_Click = () => {
    SetMode("MACHINE");
  };
  const ibtBack_Click = () => {
    setdis_ddlProduct(true);
    settxtLot((prevState) => ({
      ...prevState,
      value: "",
      style: { enableState },
      disbled: false,
    }));
    setpnlSerial(false);
    SetMode("LOT");
    fntxtLot.current.focus();
  };

  const txtOP_TextChanged = () => {
    let OP = txtOP.value.trim().toUpperCase();
    if (txtOP.value !== "") {
      settxtOP((prevState) => ({ ...prevState, value: OP }));
      if (hfOP !== "") {
        let strOPData;
        let bolError = false;
        strOPData = lblOP.value.toUpperCase().split(";");
        for (let intRow = 0; intRow < strOPData.length - 1; intRow++) {
          if (strOPData[intRow] == txtOP.value) {
            bolError = true;
          }
        }
        if (!bolError) {
          if (strOPData.length == hfOP) {
            setlblLot((prevState) => ({
              ...prevState,
              value: lblOP.value + txtOP.value,
            }));
            settxtOP((prevState) => ({ ...prevState, value: lblOP.value }));
            SetMode("BOX");
          } else {
            setlblLot((prevState) => ({
              ...prevState,
              value: lblOP.value + txtOP.value + ",",
            }));
            settxtOP((prevState) => ({ ...prevState, value: "" }));
            // fntxtOP.current.focus();
          }
        }
      } else {
        SetMode("BOX");
      }
    }
  };
  const ibtOPBack_Click = () => {
    SetMode("OP");
  };
  const txtBox_TextChanged = async () => {
    if (txtBox.value.trim() !== "") {
      let _strBoxNo;
      let _strItem;
      let _strPrd;
      let _strError = "";
      let _dblBoxQty = 0;
      let _strBox;

      _strBox = txtBox.value.toUpperCase().split(";");
      if (_strBox.length >= 1) {
        _strItem = _strBox[0];
        _strBoxNo = _strBox[1];
        await axios
          .post("/api/Common/GetBoxCount", {
            prdName: selectddlProduct.value,
            boxNo: _strBoxNo,
          })
          .then((res) => {
            let data = res.data;
            if (data <= 0) {
              _strError = "Box No. not found / ไม่พบกล่องหมายเลขนี้";
            } else {
              setlblBoxFull((prevState) => ({
                ...prevState,
                value: _dblBoxQty,
              }));
            }
          });
      } else {
        _strBoxNo = txtBox.value;
        await axios
          .post("/api/Common/GetBoxCount", {
            prdName: selectddlProduct.value,
            boxNo: _strBoxNo,
          })
          .then((res) => {
            let data = res.data;
            if (data <= 0) {
              _strError = "Box No. not found / ไม่พบกล่องหมายเลขนี้";
            } else {
              setlblBoxFull((prevState) => ({
                ...prevState,
                value: _dblBoxQty,
              }));
            }
          });
      }
      settxtBox((prevState) => ({
        ...prevState,
        value: _strBoxNo,
      }));
      setlblBox((prevState) => ({
        ...prevState,
        value: _strBoxNo,
      }));
      if (_strError == "") {
        let _dtTrayCount = [];
        setlblBoxTotal((prevState) => ({
          ...prevState,
          value: "0",
        }));
        await axios
          .post("/api/Common/GetCountTrayByBoxPacking", {
            prdName: selectddlProduct.value,
            boxNo: lblBox.value,
            srtPack: "",
          })
          .then((res) => {
            _dtTrayCount = res.data[0].BOX_COUNT;
            if (_dtTrayCount.length > 0) {
              setlblBoxTotal((prevState) => ({
                ...prevState,
                value: _dtTrayCount,
              }));
            }
            if (lblBoxTotal.value == lblBoxFull.value) {
              setlblBoxStatus((prevState) => ({
                ...prevState,
                value: "OK",
                style: { color: green },
              }));
            } else {
              setlblBoxStatus((prevState) => ({
                ...prevState,
                value: "NG",
                style: { color: red },
              }));
            }
            SetMode("PACKING");
          });
      } else {
        setlblLog((prevState) => ({
          ...prevState,
          value: _strError,
        }));
        SetMode("BOX_ERROR");
      }
    } else {
      setlblBox((prevState) => ({ ...prevState, value: "" }));
      fntxtBox.current.focus();
    }
  };
  const txtPack_TextChanged = async () => {
    if (txtPack.value.toUpperCase() !== "") {
      let _dtTrayCount = [];
      setlblBoxTotal((prevState) => ({
        ...prevState,
        value: "0",
      }));
      setlblPackingTotal((prevState) => ({
        ...prevState,
        value: "0",
      }));
      setlblPacking((prevState) => ({
        ...prevState,
        value: txtPack.value.toUpperCase(),
      }));
      await axios
        .post("/api/Common/GetCountTrayByBoxPacking", {
          prdName: selectddlProduct.value,
          boxNo: lblBox.value,
          srtPack: txtPack.value.toUpperCase(),
        })
        .then((res) => {
          _dtTrayCount = res.data;
        });
      if (_dtTrayCount.length > 0) {
        setlblBoxTotal((prevState) => ({
          ...prevState,
          value: _dtTrayCount[0].BOX_COUNT,
        }));
        setlblPackingTotal((prevState) => ({
          ...prevState,
          value: _dtTrayCount[0].PACKING_COUNT,
        }));
      }
      SetMode("SERIAL");
    } else {
      settxtPack((prevState) => ({
        ...prevState,
        value: "",
      }));
      fntxtPack.current.focus();
    }
  };

  const txtPcsTray_TextChanged = () => {
    if (!isNaN(txtPcsTray.value)) {
      setHfserialcount(txtPcsTray.value);
      if (parseInt(txtPcsTray.value) !== parseInt(hfSerialCountOriginal)) {
        setlblLastTray((prevState) => ({
          ...prevState,
          value: "USE",
        }));
      } else {
        setlblLastTray((prevState) => ({
          ...prevState,
          value: "Not Use",
        }));
      }
      SetMode("SERIAL");
    }
  };
  const btnSave_Click = () => {
    setSerialDataTray();
  };

  const handleSerialChange = async (index, event) => {
    const newValues = [...txtSerial];
    newValues[index] = event.target.value;
    settxtSerial(newValues);
  };
  const setSerialDataTray = async () => {
    let dtSerial = await getInputSerial();
    let _strLot = lblLot.value;
    let _strPrdName = selectddlProduct;
    let _strTray = "";
    let _bolTrayError = false;
    let _bolError = false;
    let _strScanResultAll = "OK";
    let _intRowSerial = 0;
    let _intCountOK = 0;
    let _dblPlasmaRemain = Number(hfPlasmaTime);
    // if (!_bolTrayError) {
    /////  ใน if ที่ยาวๆ

    await axios
      .post("/api/GetExistsBoxSerial", {
        Serial_No: dtSerial[0].SERIAL,
      })
      .then((res) => {
        console.log(res.data, "OK data save");
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
    for (let drRow = 0; drRow < dtSerial.length; drRow++) {
      if (dtSerial[drRow].SERIAL !== "") {
        let _intCount = 0;
        let _intCountOK = 0;
        let _intCountNG = 0;
        let _intCountDup = 0;
        let _strRemark = "";
        let _strError = "";
        let _strSerial = dtSerial[drRow].SERIAL;
        let _dtSerialAll = [];
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
          // บรรทัดที่ 842
          if (
            _strSerial.length == parseInt(hfSerialLength) &&
            _strScanResultUpdate != "NG"
          ) {
            let _strFixDigit;
            // If Not BIZ_ScanSMTSerial.GetCheckSumSerial(_strSerial, hfWeekCodeType.Value, CInt(hfSerialEndDigit.Value)) Then
            if (!res.data) {
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
              _strFixDigit = _strSerial.substring(
                parseInt(hfSerialStartDigit, 10) - 1,
                parseInt(hfSerialEndDigit, 10)
              );

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
                let _strConfigDigit = "";
                _strConfigDigit = _strSerial.substring(
                  parseInt(hfConfigStart, 10) - 1,
                  parseInt(hfConfigEnd, 10)
                );
                if (_strConfigDigit !== hfConfigCode) {
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
              let _dtShtData = "";
              await axios.post("/api/Common/GetSheetDataBySerialNo", {
                data: {
                  strSerialno: _strSerial,
                  strPlantCode: FAC  
                }
              })
              .then((res) => {
                _dtShtData = res.data
              })
              if (_dtShtData.length > 0) {
                _FrontSheetBarcode = _dtShtData.sheet_no;
                _RearSheetBarcode = _dtShtData.sheet_no_back;
                _intShtSeq = parseInt(_dtShtData.pcs_no);
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
                  _strRemark = "Touch up result was fail" + _strTypeTestResult;
                  _strScanResultUpdate = "NG";
                  _strTestResultUpdate = _strTestResult;
                  dtSerial[drRow].REMARK_UPDATE = _strRemark;
                  dtSerial[drRow].ROW_UPDATE = "Y";
                  _bolError = true;
                } else if (_strTouchUp == "NO" && _strRejectGroup != "MASTER") {
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
                    _strRemark = "Duplicate scan serial " + _strTypeTestResult;
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
    setlblLog((prevState) => ({
      ...prevState,
      value: "",
    }));
    setpnlLog(false);
    if (_strScanResultAll !== "NG") {
      if (Number(lblBoxTotal.value + _intCountOK) > Number(lblBoxFull.value)) {
        setlblLog((prevState) => ({
          ...prevState,
          value: "Box was full / กล่องเต็มแล้ว",
        }));
        setpnlLog(true);
        _strScanResultAll("NG");
      }
    }
    setlblResult((prevState) => ({
      ...prevState,
      value: _strScanResultAll,
    }));
    if (_strScanResultAll == "NG") {
      setlblResult((prevState) => ({
        ...prevState,
        value: _strScanResultAll,
        styled: { color: "red" },
      }));
    } else {
      setlblResult((prevState) => ({
        ...prevState,
        value: _strScanResultAll,
        styled: { color: "green" },
      }));
    }
    if (hfPlasmaCheck == "Y" && hfPlasmaTime == "N") {
      if (_dblPlasmaRemain.length > 0) {
        setlblTime((prevState) => ({
          ...prevState,
          value: "Remain",
        }));
        if (Math.floor(_dblPlasmaRemain) > 0) {
          setlblTime((prevState) => ({
            ...prevState,
            value: "Remain" + Math.floor(_dblPlasmaRemain).toString() + " hr. ",
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
          style: { color: "Green" },
        }));
      } else {
        setlblTime((prevState) => ({
          ...prevState,
          value: "Over" + hfPlasmaTime + "hr",
          style: { color: "red" },
        }));
      }
    } else {
      setlblTime((prevState) => ({ ...prevState, value: "" }));
    }
    //1352
    let _strErrorUpdate = "";
    if (_strScanResultAll == "OK") {
      await axios
        .post("/api/Common/SetSerialLotTrayTableGood", {
          dataList: {
            strPlantCode: plantCode,
            strPrdName: _strPrdName,
            strLot: _strLot,
            strUserID: hfUserID,
            strStation: hfUserStation,
            data: [
              {
                SERIAL: dtSerial[i].SERIAL,
                UPDATE_FLG: dtSerial[i].UPDATE_FLG,
                ROW_UPDATE: dtSerial[i].ROW_UPDATE,
                REJECT_CODE: dtSerial[i].REJECT_CODE,
                TEST_RESULT: dtSerial[i].TEST_RESULT,
                REMARK_UPDATE: dtSerial[i].REMARK_UPDATE,
                SCAN_RESULT: dtSerial[i].SCAN_RESULT,
                PACKING_NO: "",
              },
            ],
          },
        })
        .then((res) => {
          _strUpdateError = res.data.p_error;
          if (_strUpdateError !== "") {
            _strScanResultAll = "NG";
          }
        });
      if (_strErrorUpdate != "") {
        setlblResult((prevState) => ({
          ...prevState,
          value: "Error :" + _strErrorUpdate,
          style: { color: "Red" },
        }));
      } else {
      }
    }

    // }
    // let dtLotPassCount = []; // บรรทัด 1380
    // await axios
    //   .post("/api/Common/getSerialPassByLot", {
    //     strLotNo: _strLot,
    //     strPlantCode: "5",
    //   })
    //   .then((res) => {
    //     dtLotPassCount = res.data;
    //   });
    // if (dtLotPassCount.length > 0) {
    //   setlblLotTotal((prevState) => ({
    //     ...prevState,
    //     value: res.data.lotcount,
    //   }));
    // }

    // let _dblBoxQty = 0; // 1386

    // setlblBoxFull((prevState) => ({
    //   ...prevState,
    //   value: res.data.lotcount,
    // }));
    // await axios
    //   .post("/api/Common/GetBoxCount", {
    //     prdName: selectddlProduct.value,
    //     boxNo: lblBox.value,
    //   })
    //   .then((res) => {
    //     _dblBoxQty = res.data;
    //   });
    // if (_dblBoxQty > 0) {
    //   setlblBoxFull((prevState) => ({
    //     ...prevState,
    //     value: _dblBoxQty,
    //   }));
    // }
    // let _dtTrayCount = []; // 1392
    // setlblBoxTotal((prevState) => ({
    //   ...prevState,
    //   value: "0",
    // }));
    // setlblPackingTotal((prevState) => ({
    //   ...prevState,
    //   value: "0",
    // }));
    // await axios
    //   .post("/api/Common/GetCountTrayByBoxPacking", {
    //     prdName: selectddlProduct.value,
    //     boxNo: lblBox.value,
    //     srtPack: "",
    //   })
    //   .then((res) => {
    //     _dtTrayCount = res.data;
    //   });
    // if (_dtTrayCount.length > 0) {
    //   setlblBoxTotal((prevState) => ({
    //     ...prevState,
    //     value: res.data.BOX_COUNT,
    //   }));
    //   setlblPackingTotal((prevState) => ({
    //     ...prevState,
    //     value: res.data.PACKING_COUNT,
    //   }));
    // }
    // if (Number(lblBoxTotal.value) == Number(lblBoxFull.value)) {
    //   setlblBoxStatus((prevState) => ({
    //     ...prevState,
    //     value: "OK",

    //   }));

    // }else{
    //   setlblBoxStatus((prevState) => ({
    //     ...prevState,
    //     value: "NG",

    //   }));
    // }
    // if(!_bolTrayError){
    //   setgvSerial(dtSerial)
    // }else{
    //   setgvSerial("")
    // }
    // settxtPcsTray((prevState) => ({
    //   ...prevState,
    //   value: hfSerialCountOriginal,
    // }));
    // // hfserialcount = hfSerialCountOriginal
    // setlblLastTray((prevState) => ({
    //   ...prevState,
    //   value: "Not Use",
    // }));
    // getInitialSerial();
    return 0;
  };
  const getInputSerial = async () => {
    let dtData = [];
    let intRow = 0;

    for (let intSeq = 0; intSeq < gvSerial.length; intSeq++) {
      intRow++;
      dtData.push({
        SEQ: intRow,
        SERIAL: txtSerial[intSeq] || "",
        REJECT: "",
        TOUCH_UP: "",
        REJECT2: "",
        REJECT_CODE: "",
        SCAN_RESULT: "",
        TEST_RESULT: "",
        TYPE_TEST_RESULT: "",
        SCAN_RESULT: "",
        REMARK: "",
        REMARK_UPDATE: "",
        ROW_COUNT: 0,
        ROW_UPDATE: "N",
        UPDATE_FLG: "N",
        PLASMA_TIME: 0,
        BOX_PACK: "",
        PACKING_NO: txtPack.value.trim().toUpperCase(),
        MASTER_NO: "",
        FRONT_SHEET_NO: "",
        BACK_SHEET_NO: "",
        SHEET_PCS_NO: 0,
        ROLL_LEAF_NO: "",
        MACHINE: txtMachine.value.trim().toUpperCase(),
        PRODUCT: ddlProduct,
        LOT: lblLot.value,
        DATA_TYPE: "PCS",
      });
      if (dtData.SERIAL !== "") {
        for (let intNo = 0; intNo < intRow - 1; intNo++) {
          if (
            dtData.SERIAL ===
            (txtSerial[intNo] ? txtSerial[intNo].trim().toUpperCase() : "")
          ) {
            dtData.ROW_COUNT = 9;
            break;
          }
        }
      }
    }
    console.log(dtData, "ออกแล้ว Serial");
    return dtData;
  };

  const ibtBox_Click = async () => {
    SetMode("BOX");
  };
  const ibtPack_Click = async () => {
    SetMode("PACKING");
  };

  return {
    txtLot_TextChanged,
    txtLot,
    settxtLot,
    ddlProduct_SelectedIndexChanged,
    selectddlProduct,
    setselectddlProduct,
    ddlProduct,
    txtMachine_TextChanged,
    txtMachine,
    settxtMachine,
    ibtMachineBack_Click,
    txtOP_TextChanged,
    txtOP_TextChanged,
    txtOP,
    settxtOP,
    ibtOPBack_Click,
    txtBox_TextChanged,
    txtBox,
    settxtBox,
    txtPack_TextChanged,
    txtPack,
    settxtPack,
    lblLot,
    lblLotTotal,
    txtPcsTray,
    settxtPcsTray,
    txtPcsTray_TextChanged,
    lblSerialNG,
    ibtBack_Click,
    gvSerial,
    pnlMachine,
    lblLastTray,
    lblBox,
    lblBoxTotal,
    lblPacking,
    lblPackingTotal,
    lblBoxStatus,
    lblBoxFull,
    btnSave_Click,
    lblLog,
    pnlLog,
    ibtBox_Click,
    ibtPack_Click,
    pnlOP,
    pnlSerial,
    handleSerialChange,
    txtSerial,
    lblResult,
    fntxtLot,
    fntxtMachine,
    fc_txtSerial,
    fntxtTray,
    fntxtBox,
    fntxtPack,
    fntxtOP,
  };
}

export { fn_ScanSMTSerialPcsBoxOnlyGood };
