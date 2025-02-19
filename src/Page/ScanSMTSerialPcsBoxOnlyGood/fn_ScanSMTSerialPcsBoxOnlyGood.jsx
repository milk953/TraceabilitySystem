// Eye
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Tag } from "antd";
import { useLoading } from "../../loading/fn_loading";
import { DataConfig } from "../Common/function_Common";
import "../Common/StyleCommon.css";

function fn_ScanSMTSerialPcsBoxOnlyGood() {
  const { ConfigData } = DataConfig();
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
    valusettxtSeriale: "",
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
  const [gvSerial, setgvSerial] = useState([]);
  const [txtSerial, settxtSerial] = useState([]);

  const [gvScanResult, setgvScanResult] = useState([]);

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
  const [pnlOP, setpnlOP] = useState(false);
  const [pnlgvScanResult, setpnlgvScanResult] = useState(false);

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
  const [dis_ddlProduct, setdis_ddlProduct] = useState(false);

  // const FAC = import.meta.env.VITE_FAC;
  // const FINAL_GATE_SPECIAL_FLG = import.meta.env.VITE_FINAL_GATE_SPECIAL_FLG;
  // const FINAL_GATE_SPECIAL_PRD = import.meta.env.VITE_FINAL_GATE_SPECIAL_PRD;
  // const FINAL_GATE_SPECIAL_MESSAGE = import.meta.env.VITE_FINAL_GATE_SPECIAL_MESSAGE;

  const FAC = ConfigData.FACTORY;
  const FINAL_GATE_SPECIAL_FLG = ConfigData.FINAL_GATE_SPECIAL_FLG;
  const FINAL_GATE_SPECIAL_PRD = ConfigData.FINAL_GATE_SPECIAL_PRD;
  const FINAL_GATE_SPECIAL_MESSAGE = ConfigData.FINAL_GATE_SPECIAL_MESSAGE;

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
  const { showLoading, hideLoading } = useLoading();

  const params = new URLSearchParams(window.location.search);
  const FQC = params.get("FQC");
  const OP = params.get("OP");
  let DUPLICATE_CHECK_FLG = "0";
  const fetchData = async () => {
    await GetProductData();
  };
  useEffect(() => {
    let ID = localStorage.getItem("ipAddress");
    sethfUserID(ID);
    sethfUserStation(ID);
    setHfMode("");
    setHfLotAll("");

    if (ddlProduct != "") {
      fetchData();
    } else {
      GetProductData();
    }
    if (FQC !== null) {
      setHfFQC(FQC);
      setHfOP(OP);
    } else {
      setHfFQC("");
    }
    if (OP !== null) {
      setHfOP(OP);
    } else {
      setHfOP(1);
    }

    SetMode("LOT");
  }, []);

  useEffect(() => {
    getInitialSerial();
  }, [hfserialcount]);
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
      align: "center",
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
      align: "center",

      render: (text, record, index) => {
        if (!record.SERIAL) {
          return null;
        }
        return text;
      },
    },
    {
      title: "Scan Result",
      key: "Scan Result",
      dataIndex: "SCAN_RESULT",

      render: (text, record, index) => {
        // const backgroundColor =
        //   record.SCAN_RESULT === "NG"
        //     ? "#BA0900"
        //     : record.SCAN_RESULT === "OK"
        //     ? "#87d068"
        //     : "transparent";

        // return <Tag color={backgroundColor}>{text}</Tag>;
        return text;
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
              strPlantCode: FAC,
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
            } else {
              setlblLog((prevState) => ({
                ...prevState,
                value: `Product ${_strPrdName} not found.`,
                // visble: "",
              }));
              // fc_SlProduct.current.focus();
              return;
            }
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

      setTimeout(() => {
        fntxtBox.current.focus();
      }, 0);
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
      // await getProductSerialMaster(data[0].prd_name);
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
    let serial_digit;
    let serial_length;
    let start_digit;
    let end_digit;
    let serial_count;
    let plasma_hidetime;
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
          serial_length = dtProductSerial.slm_serial_length;
          setHfSerialFixFlag(dtProductSerial.slm_fix_flag);
          setHfSerialDigit(dtProductSerial.slm_fix_digit);
          serial_digit = dtProductSerial.slm_fix_digit;
          setHfSerialStartDigit(dtProductSerial.slm_fix_start_digit);
          start_digit = dtProductSerial.slm_fix_start_digit;
          setHfSerialEndDigit(dtProductSerial.slm_fix_end_digit);
          end_digit = dtProductSerial.slm_fix_end_digit;
          setHfTrayFlag(dtProductSerial.slm_tray_flag);
          setHfTrayLength(dtProductSerial.slm_tray_length);
          setHfTestResultFlag(dtProductSerial.slm_test_result_flag);
          setHfserialcount(dtProductSerial.slm_serial_count);
          serial_count = dtProductSerial.slm_serial_count;
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
          plasma_hidetime = dtProductSerial.prm_plasma_time_hide_time;
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
      .post("/api/Common/GetSerialBoxProductByProduct", {
        prdName: PrdName,
      })

      .then((res) => {
        dtProductBox = res.data[0];
        if (dtProductBox != "") {
          if (
            serial_digit !== dtProductBox.SLM_FIX_DIGIT ||
            parseInt(serial_length) !== dtProductBox.SLM_SERIAL_LENGTH ||
            parseInt(start_digit) !== dtProductBox.SLM_FIX_START_DIGIT ||
            parseInt(end_digit) !== dtProductBox.SLM_FIX_END_DIGIT
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
          serial_count = dtProductBox.SLM_SERIAL_COUNT;
          setHfConfigCheck(dtProductBox.SLM_BARCODE_REQ_CONFIG);
          setHfConfigCode(dtProductBox.SLM_CONFIG_CODE);
          setHfConfigStart(dtProductBox.SLM_START_CONFIG);
          setHfConfigEnd(dtProductBox.SLM_END_CONFIG);
          setHfPlasmaBoxCheck(dtProductBox.SLM_PLASMA_TIME_FLG);
          setHfPlasmaBoxTime(dtProductBox.SLM_PLASMA_TIME);
          setHfSerialStartCode(dtProductBox.SLM_SERIAL_START_CODE);

          settxtPcsTray((prevState) => ({
            ...prevState,
            value: dtProductBox.SLM_SERIAL_COUNT,
          }));
        } else {
          setpnlLog(true);
          setlblLog((prevState) => ({
            ...prevState,
            value: "Box product master not found!",
          }));
        }
        setHfSerialCountOriginal(serial_count);
        setlblLastTray((prevState) => ({ ...prevState, value: "Not Use" }));
      });

    return 0;
  };
  const SetMode = (_strType) => {
    switch (_strType) {
      case "LOT":
        settxtLot((prevState) => ({
          ...prevState,
          value: "",
          disbled: false,
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
        setpnlLog(false);
        setpnlSerial(false);
        settxtMachine((prevState) => ({ ...prevState, value: "" }));
        settxtOP((prevState) => ({ ...prevState, value: "" }));
        setlblOP((prevState) => ({ ...prevState, value: "" }));
        setibtMachineBack(false);
        setibtOPBack(false);
        if (FQC == "Y") {
          setpnlMachine(true);
          settxtMachine((prevState) => ({ ...prevState, disbled: true }));
          settxtOP((prevState) => ({ ...prevState, disbled: true }));
        } else {
          setpnlMachine(false);
          setpnlOP(false);
        }
        setTimeout(() => {
          fntxtLot.current.focus();
        }, 0);
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
          settxtMachine((prevState) => ({ ...prevState, disbled: true }));
          settxtOP((prevState) => ({ ...prevState, disbled: true }));
        } else {
          setpnlMachine(false);
          setpnlOP(false);
        }
        setTimeout(() => {
          fntxtLot.current.focus();
        }, 0);
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
          disbled: false,
        }));
        settxtOP((prevState) => ({ ...prevState, value: "", disbled: true }));
        setlblOP((prevState) => ({ ...prevState, value: "" }));
        setibtMachineBack(true);
        setibtOPBack(false);
        setHfMode("MACHINE");
        setTimeout(() => {
          fntxtMachine.current.focus();
        }, 0);

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
          disbled: true,
        }));
        settxtOP((prevState) => ({
          ...prevState,
          disbled: false,
        }));
        setlblOP((prevState) => ({ ...prevState, value: "" }));
        setibtMachineBack(true);
        setibtOPBack(false);
        setHfMode("OP");
        setTimeout(() => {
          fntxtOP.current.focus();
        }, 0);

        break;
      case "TRAY":
        settxtLot((prevState) => ({ ...prevState, disbled: true }));
        setlblSerialNG((prevState) => ({ ...prevState, value: "" }));
        setpnlLog(false);
        setpnlSerial(true);
        getInitialSerial();
        setHfMode("TRAY");
        setTimeout(() => {
          fntxtTray.current.focus();
        }, 0);
        break;
      case "TRAY_ERROR":
        settxtLot((prevState) => ({ ...prevState, disbled: true }));
        setlblSerialNG((prevState) => ({ ...prevState, value: "" }));
        setpnlLog(true);
        setpnlSerial(false);
        setHfMode("TRAY");
        setTimeout(() => {
          fntxtTray.current.focus();
        }, 0);

        break;
      case "BOX":
        settxtLot((prevState) => ({ ...prevState, disbled: true }));
        settxtBox((prevState) => ({
          ...prevState,
          value: "",
          disbled: false,
          style: { enableState },
        }));
        settxtPack((prevState) => ({
          ...prevState,
          value: "",
          disbled: true,
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
          settxtMachine((prevState) => ({ ...prevState, disbled: true }));
          settxtOP((prevState) => ({ ...prevState, disbled: true }));
          setibtMachineBack(true);
          setibtOPBack(true);
        } else {
          setpnlMachine(false);
        }
        setHfMode("BOX");
        setTimeout(() => {
          fntxtBox.current.focus();
        }, 0);
        break;
      case "BOX_ERROR":
        settxtLot((prevState) => ({ ...prevState, disbled: true }));
        settxtBox((prevState) => ({
          ...prevState,
          value: "",
          disbled: false,
          style: { enableState },
        }));
        settxtPack((prevState) => ({
          ...prevState,
          value: "",
          disbled: true,
        }));
        //setlblLotTotal((prevState) => ({ ...prevState, value: "" }));
        //setlblSerialNG((prevState) => ({ ...prevState, value: "" }));
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
          settxtMachine((prevState) => ({ ...prevState, disbled: true }));
          settxtOP((prevState) => ({ ...prevState, disbled: true }));
          setibtMachineBack(true);
          setibtOPBack(true);
        } else {
          setpnlMachine(false);
        }
        setHfMode("BOX");
        setTimeout(() => {
          fntxtBox.current.focus();
        }, 0);
        break;
      case "PACKING":
        setdis_ddlProduct(true);
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
          settxtMachine((prevState) => ({ ...prevState, disbled: true }));
          settxtOP((prevState) => ({ ...prevState, disbled: true }));
          setibtMachineBack(true);
          setibtOPBack(true);
        } else {
          setpnlMachine(false);
        }
        setHfMode("PACK");
        setTimeout(() => {
          fntxtPack.current.focus();
        }, 0);
        break;
      case "SERIAL":
        setdis_ddlProduct(true);
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
          settxtMachine((prevState) => ({ ...prevState, disbled: true }));
          settxtOP((prevState) => ({ ...prevState, disbled: true }));
          setibtMachineBack(true);
          setibtOPBack(true);
        } else {
          setpnlMachine(false);
        }
        setHfMode("SERIAL");
        getInitialSerial();
        break;
      case "SERIAL_ERROR":
        settxtLot((prevState) => ({ ...prevState, disbled: true }));
        setpnlLog(true);
        break;
      case "SERIAL_OK":
        settxtLot((prevState) => ({ ...prevState, disbled: true }));
        setpnlLog(false);
        setpnlSerial(true);
        getInitialSerial();
        // fngvSerial.current.focus(); // focus Serial
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
    for (let intRow = 0; intRow < hfserialcount; intRow++) {
      dtData.push({
        SEQ: intRow + 1,
      });
    }
    setgvSerial(dtData);
    settxtSerial(Array(gvSerial.length).fill(""));
    fc_txtSerial.current.forEach((input) => {
      if (input) input.value = "";
    });
    if (gvSerial.length > 0) {
      setTimeout(() => {
        fc_txtSerial.current[0].focus();
      }, 0);
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
    setpnlgvScanResult(false);
  };
  const ibtBack_Click = () => {
    settxtPcsTray((prevState) => ({ ...prevState, value: "" }));
    setdis_ddlProduct(false);
    setselectddlProduct((prevState) => ({ value: ddlProduct[0].prd_name }));
    settxtLot((prevState) => ({
      ...prevState,
      value: "",
      style: { enableState },
      disbled: false,
    }));
    setpnlgvScanResult(false);
    setpnlSerial(false);
    SetMode("LOT");
    setTimeout(() => {
      fntxtLot.current.focus();
    }, 0);
    settxtPcsTray((prevState) => ({
      ...prevState,
      value: "",
    }));
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const txtOP_TextChanged = () => {
    let OP = txtOP.value.trim().toUpperCase();
    let lbl = "";
    if (OP !== "") {
      if (hfOP !== "") {
        let strOPData = lblOP.value.trim().toUpperCase().split(",");
        let bolError = false;

        for (let intRow = 0; intRow < strOPData.length; intRow++) {
          if (strOPData[intRow] === OP) {
            bolError = true;
            break;
          }
        }

        if (!bolError) {
          if (strOPData.length === parseInt(hfOP, 10)) {
            setlblOP((prevState) => ({
              ...prevState,
              value: lblOP.value + txtOP.value,
            }));
            settxtOP((prevState) => ({
              ...prevState,
              value: lblOP.value + txtOP.value,
            }));
            SetMode("BOX");
          } else {
            setlblOP((prevState) => ({
              ...prevState,
              value: lblOP.value + txtOP.value + ",",
            }));
            settxtOP((prevState) => ({ ...prevState, value: "" }));
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
      let datalbTotal = 0;
      let datalblFull = 0;

      _strBox = txtBox.value.toUpperCase().split(";");
      if (_strBox.length > 1) {
        _strItem = _strBox[0];
        _strBoxNo = _strBox[1];

        await axios
          .post("/api/Common/GetBoxCount", {
            prdName: selectddlProduct.value,
            boxNo: _strBoxNo,
          })
          .then((res) => {
            datalblFull = res.data[0].BOX_QTY;
            datalbTotal = res.data[0].BOX_COUNT;
          });
        if (datalbTotal <= 0) {
          _strError = "Box No. not found / ไม่พบกล่องหมายเลขนี้";
        } else {
          setlblBoxFull((prevState) => ({ ...prevState, value: datalblFull }));
        }
      } else {
        _strBoxNo = txtBox.value;
        await axios
          .post("/api/Common/GetBoxCount", {
            prdName: selectddlProduct.value,
            boxNo: _strBoxNo,
          })
          .then((res) => {
            datalblFull = res.data[0].BOX_QTY;
            datalbTotal = res.data[0].BOX_COUNT;
          });
        if (datalbTotal <= 0) {
          _strError = "Box No. not found / ไม่พบกล่องหมายเลขนี้";
        } else {
          setlblBoxFull((prevState) => ({
            ...prevState,
            value: datalblFull,
          }));
        }
      }
      settxtBox((prevState) => ({ ...prevState, value: _strBoxNo }));
      setlblBox((prevState) => ({ ...prevState, value: _strBoxNo }));

      if (_strError == "") {
        let _dtTrayCount = [];
        setlblBoxTotal((prevState) => ({ ...prevState, value: "0" }));
        await axios
          .post("/api/Common/GetCountTrayByBoxPacking", {
            prdName: selectddlProduct.value,
            boxNo: _strBoxNo,
            srtPack: "",
          })
          .then((res) => {
            datalbTotal = res.data[0].BOX_COUNT;
          });
        if (datalbTotal > 0) {
          setlblBoxTotal((prevState) => ({ ...prevState, value: datalbTotal }));

          if (parseFloat(datalbTotal) > parseFloat(datalblFull)) {
            setlblLog((prevState) => ({
              ...prevState,
              value: "Box was full / กล่องเต็มแล้ว",
            }));
            setpnlLog(true);
            return;
          }
        }
        if (parseFloat(datalbTotal) == parseFloat(datalblFull)) {
          setlblBoxStatus((prevState) => ({
            ...prevState,
            value: "OK",
            style: { color: "green" },
          }));
          setlblLog((prevState) => ({
            ...prevState,
            value: "Box was full / กล่องเต็มแล้ว",
          }));
          setpnlLog(true);
          return;
        } else {
          setlblBoxStatus((prevState) => ({
            ...prevState,
            value: "NG",
          }));
        }
        SetMode("PACKING");
      } else {
        setlblLog((prevState) => ({ ...prevState, value: _strError }));
        SetMode("BOX_ERROR");
      }
    } else {
      setlblBox((prevState) => ({ ...prevState, value: "" }));
      setTimeout(() => {
        fntxtBox.current.focus();
      }, 0);
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
      setTimeout(() => {
        fntxtPack.current.focus();
      }, 0);
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
  // const btnSave_Click = () => {
  //   const hasAnyInput = Array.from(fc_txtSerial.current).some(
  //     (input) => input.value.trim() !== ""
  //   );
  //   if (hasAnyInput == true) {
  //     if (hfMode == "SERIAL") {
  //       setSerialDataTray();
  //       scrollToTop();
  //     }
  //   } else {
  //     setlblLog((prevState) => ({
  //       ...prevState,
  //       value: "Please Input Serial No.",
  //     }));
  //     setpnlLog(true);
  //     setpnlgvScanResult(false)
  //     setTimeout(() => {
  //       fc_txtSerial.current[0].focus();
  //     }, 0);
  //     scrollToTop();
  //   }
  // };

  const btnSave_Click = async (txtSerial) => {
    // ตรวจสอบว่า fc_txtSerial.current มีค่าก่อน
    if (!fc_txtSerial.current || !Array.isArray(fc_txtSerial.current)) {
      setlblLog((prevState) => ({
        ...prevState,
        value: "Unexpected error: Input elements not found.",
      }));
      setpnlLog(true);
      scrollToTop();
      return;
    }

    // ตรวจสอบว่ามี input ใดที่ไม่ว่าง
    const hasAnyInput = Array.from(fc_txtSerial.current).some(
      (input) => input && input.value.trim() !== ""
    );

    if (hasAnyInput) {
      if (hfMode === "SERIAL") {
        setSerialDataTray(txtSerial);
        scrollToTop();
      }
    } else {
      // แจ้งเตือนให้ใส่ Serial No.
      setlblLog((prevState) => ({
        ...prevState,
        value: "Please Input Serial No.",
      }));
      setpnlLog(true);
      setpnlgvScanResult(false);
      scrollToTop();

      // รอ 0ms และโฟกัสที่ input แรก
      setTimeout(() => {
        if (fc_txtSerial.current[0]) {
          fc_txtSerial.current[0].focus();
        } else {
        }
      }, 0);
    }
  };
  // const handleSerialChange = async (index, event) => {
  //   const newValues = [...txtSerial];
  //   newValues[index] = event.target.value.trim().toUpperCase();
  //   settxtSerial(newValues);
  // };
  let newValues = [];
  const handleSerialChange = async (index, event) => {
    newValues[index] = event.target.value.trim().toUpperCase();
    // event.target.value = '';
    return newValues;
  };
  const setSerialDataTray = async (txtSerial) => {
    showLoading("กำลังบันทึก กรุณารอสักครู่");
    try {
      // await fetchData();
      let dtSerial = await getInputSerial(txtSerial);
      let _strLot = lblLot.value;
      let _strPrdName = selectddlProduct.value;
      let _strTray = "";
      let _bolTrayError = false;
      let _bolError = false;
      let _strScanResultAll = "OK";
      let _intRowSerial = 0;
      let _intCountOK = 0;
      let _dblPlasmaRemain = parseFloat(hfPlasmaTime);

      if (!_bolTrayError) {
        showLoading("กำลังบันทึก กรุณารอสักครู่");

        await axios
          .post("/api/common/GetSerialBoxTestResultManyTableOnlyGood", {
            dataList: [
              {
                strPlantCode: FAC,
                strPrdname: _strPrdName,
                strWeekCodeType: hfWeekCodeType,
                // strSerial: dtSerial[drRow].SERIAL,
              },
            ],
            dtSerial: dtSerial,
          })
          .then((res) => {
            dtSerial = res.data;
          });

        await axios
          .post("/api/GetExistsBoxSerial", {
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

        hideLoading();
        scrollToTop();
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
            const duplicateStart = parseInt(hfDuplicateStart, 10);
            const duplicateEnd = parseInt(hfDuplicateEnd, 10);
            const strFghSerialNo = _strSerial.substring(
              duplicateStart - 1,
              duplicateEnd
            );
            if (_strScanResultUpdate != "NG") {
              if (DUPLICATE_CHECK_FLG == "1") {
                if (dtSerial[drRow].ROW_COUNT == 0) {
                  await axios
                    .post("/api/Common/GetSerialDuplicate", {
                      dataList: {
                        strFghSerialNo: strFghSerialNo,
                        strPlantCode: FAC,
                      },
                    })
                    .then((res) => {
                      _intCountDup = res.data.row_count;
                    });
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
                const res = await axios.post("/api/Common/GetCheckSumSerial", {
                  _str_Serial: _strSerial,
                  _str_DateType: hfWeekCodeType,
                  _intEngRevEndDigit: Number(hfSerialEndDigit),
                });
                if (res.data == false) {
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
                  let isDuplicate = dtSerial.some((item, index) => {
                    return (
                      index !== _intRowSerial &&
                      _strSerial.toUpperCase() === item.SERIAL.toUpperCase()
                    );
                  });
                  // for (
                  //   let _intRow = _intRowSerial + 1;
                  //   _intRow < dtSerial.length - 1;
                  //   _intRow++
                  // ) {
                  if (isDuplicate) {
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
                if (!_bolError && hfCheckPrdSht == "Y") {
                  let strSheetLot = "";
                  let _strShtNo = "";
                  await axios
                    .post("/api/Common/GetSheetNoBySerialNo", {
                      data: {
                        strPlantCode: FAC,
                        strSerial: _strSerial,
                        // strLot: strSheetLot,
                      },
                    })
                    .then((res) => {
                      _strShtNo = res.data._strsheet;
                      strSheetLot = res.data.lot_no;
                    });
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
                    _strMessageUpdate = "No data connect sheet       ";
                    _strRemark = "No data connect sheet  ";
                    _strScanResultUpdate = "NG";
                    _strTestResultUpdate = _strTestResult;
                    dtSerial[drRow].REMARK_UPDATE = _strRemark;
                    dtSerial[drRow].ROW_UPDATE = "Y";
                    _intCountNG = 1;
                    _bolError = true;
                  } else if (hfLotAll.indexOf(strSheetLot) === -1) {
                    _strMessageUpdate =
                      "Lot not same connect sheet  ล๊อตไม่ตรงตามที่แสกนประกบกับหมายเลขชีส";
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
                  await axios
                    .post("/api/Common/GetSheetDataBySerialNo", {
                      strSerialno: _strSerial,
                      strPlantCode: FAC,
                    })
                    .then((res) => {
                      _dtShtData = res.data;
                    });
                  if (_dtShtData != "") {
                    _FrontSheetBarcode = _dtShtData.sheet_no_front;
                    _RearSheetBarcode = _dtShtData.sheet_no_back;
                    _intShtSeq = parseInt(_dtShtData.pcs_no);
                    let _Result = "";
                    await axios
                      .post("/api/Common/Get_Spi_aoi_result", {
                        dataList: {
                          _strPlantCode: FAC,
                          _pcsPosition: _intShtSeq,
                          _frontSheetNumber: _FrontSheetBarcode,
                          _rearSheetNumber: _RearSheetBarcode,
                          _strProduct: _strPrdName,
                          _Message: _strMessage,
                        },
                      })
                      .then((res) => {
                        _Result = res.data._strresult;
                        _strMessage = res.data._strmessage;
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
                // -------------------------

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
                      }
                    } else if (_strTestResult == "NG") {
                      _strMessageUpdate =
                        "Test result was fail " +
                        _strTypeTestResult +
                        "/ ผลทดสอบชิ้นงานแสดงไม่ผ่าน " +
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
                      _strRemark =
                        "Not found test result " + _strTypeTestResult;
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
                    }
                  }
                  if (!_bolError) {
                    if (dtSerial[drRow].BOX_PACK !== "") {
                      _strMessageUpdate =
                        "Serial exists in" +
                        dtSerial[drRow].BOX_PACK +
                        " / หมายเลขบาร์โค้ดซ้ำ" +
                        dtSerial[drRow].BOX_PACK;
                      _strRemark =
                        "Serial exists in" + dtSerial[drRow].BOX_PACK;
                      _strScanResultUpdate = "NG";
                      _strTestResultUpdate = _strTestResult;
                      dtSerial[drRow].REMARK_UPDATE = _strRemark;
                      dtSerial[drRow].ROW_UPDATE = "Y";
                      _intCountNG = 1;
                      _bolError = true;
                    }
                  }
                  if (hfPlasmaCheck == "Y" && _strRejectGroup !== "MASTER") {
                    let _dblPlasmaTime = dtSerial[drRow].PLASMA_TIME;
                    if (_dblPlasmaTime == 0) {
                      _strMessageUpdate =
                        _strMessageUpdate +
                        "Skip Plasma / ไม่พบข้อมูลการแสกนก่อนเข้าพลาสม่า";
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
                        "Plasma time do not record / ไม่พบข้อมูลการแสกนก่อนเข้าพลาสม่า";
                      _strRemark = "Plasma time do not record";
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
                        "Plsma time over" +
                        hfPlasmaTime +
                        "hr. / เวลาพลาสม่าเกิน" +
                        hfPlasmaTime +
                        "ชม.";
                      _strRemark = "Plasma time over " + hfPlasmaTime + "hr.";
                      _strScanResultUpdate = "NG";
                      _strTestResultUpdate = _strTestResult;
                      dtSerial[drRow].REMARK_UPDATE = _strRemark;
                      dtSerial[drRow].ROW_UPDATE = "Y";
                      _intCountNG = 1;
                      _bolError = true;
                      _dblPlasmaRemain = 0;
                    } else if (hfPlasmaHideTime == "N") {
                      if (
                        _dblPlasmaRemain >
                        parseFloat(hfPlasmaHideTime) - _dblPlasmaTime
                      ) {
                        _dblPlasmaRemain =
                          parseFloat(hfPlasmaHideTime) - _dblPlasmaTime;
                      }
                    }
                  }
                  if (!_bolError) {
                    if (_intCountDup > 0) {
                      _strMessageUpdate =
                        "Duplicate scan serial" + _strTypeTestResult;
                      _strRemark = "Duplicate scan serial" + _strTypeTestResult;
                      _strScanResultUpdate = "NG";
                      _strTestResultUpdate = _strTestResult;
                      dtSerial[drRow].REMARK_UPDATE = _strRemark;
                      dtSerial[drRow].ROW_UPDATE = "Y";
                      _bolError = true;
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
                        _strPlantCode: FAC,
                      },
                    })
                    .then((res) => {
                      const response = res.data;
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
                      _strPlantCode: FAC,
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
                      const response = res.data.sheet_no;
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
                if (
                  hfFQC !== "Y" &&
                  hfCheckFinInspect == "Y" &&
                  _bolError == false
                ) {
                  let _strInspResult;
                  await axios
                    .post("/api/Common/GetSerialFinInspectResult", {
                      dataList: {
                        _strSerialNo: _strSerial,
                        _strProc: hfCheckFinInspectProc,
                        _strPlantCode: FAC,
                      },
                    })
                    .then((res) => {
                      _strInspResult = res.data;
                    });
                  if (_strInspResult !== "OK") {
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
                  FINAL_GATE_SPECIAL_PRD.includes(_strPrdName) > 0 &&
                  _bolError === false
                ) {
                  let _intCheckPass;

                  await axios
                    .post("/api/Common/getcheckspecialbyserial", {
                      dataList: {
                        strSerialno: _strSerial,
                        strPlantCode: FAC,
                      },
                    })
                    .then((res) => {
                      _intCheckPass = res.data;
                    });
                  if (_intCheckPass == "0") {
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
            // ---------- สุด
            if (_strRejectGroup == "MASTER") {
              _strTestResultUpdate = _strTestResult;
              _strTouchUp = "";
              _strReject2 = "";
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
              if (lblSerialNG.value !== "") {
                setlblSerialNG((prevState) => ({
                  ...prevState,
                  value: (parseInt(lblSerialNG.value, 10) + 1).toString(),
                }));
              }
            } else {
              _intCountOK = _intCountOK + 1;
            }
          }
          _intRowSerial = _intRowSerial + 1;
        }
        // -------- 1308 จบ for

        setlblLog((prevState) => ({ ...prevState, value: "" }));
        setpnlLog(false);
        if (_strScanResultAll !== "NG") {
          if (
            parseFloat(lblBoxTotal.value + _intCountOK) >
            parseFloat(lblBoxFull.value)
          ) {
            setlblLog((prevState) => ({
              ...prevState,
              value: "Box was full / กล่องเต็มแล้ว",
            }));
            setpnlLog(true);
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
        if (hfPlasmaCheck == "Y" && hfPlasmaHideTime == "N") {
          if (_dblPlasmaRemain > 0) {
            setlblTime((prevState) => ({ ...prevState, value: "Remain" }));
            if (Math.floor(_dblPlasmaRemain) > 0) {
              setlblTime((prevState) => ({
                ...prevState,
                value: "Remain" + Math.floor(_dblPlasmaRemain) + " hr. ",
                style: { backgroundColor: "green" },
              }));
            }
            if (_dblPlasmaRemain % 1 > 0) {
              setlblTime((prevState) => ({
                ...prevState,
                value:
                  "Remain" + Math.floor((_dblPlasmaRemain % 1) * 60) + " min. ",
                style: { backgroundColor: "green" },
              }));
            }
          } else {
            setlblTime((prevState) => ({
              ...prevState,
              value: "Over" + hfPlasmaTime + "hr",
              style: { backgroundColor: "red" },
            }));
          }
        } else {
          setlblTime((prevState) => ({ ...prevState, value: "" }));
        }
        //1352
        let _strErrorUpdate = "";
        if (_strScanResultAll == "OK") {
          for (let i = 0; i < dtSerial.length; i++) {
            if (dtSerial[i].SERIAL == "") {
              continue;
            } else {
              await axios
                .post("/api/Common/SetSerialLotTrayTableGood2", {
                  dataList: {
                    strPlantCode: FAC,
                    strPrdName: _strPrdName,
                    strLot: _strLot,
                    strUserID: hfUserID,
                    strStation: hfUserStation,
                    strPage: "ScanSMTSerialPcsBoxOnlyGood",
                    SCAN_RESULT: dtSerial[i].SCAN_RESULT,
                    SERIAL: dtSerial[i].SERIAL,
                    UPDATE_FLG: dtSerial[i].UPDATE_FLG,
                    ROW_UPDATE: dtSerial[i].ROW_UPDATE,
                    REJECT_CODE: dtSerial[i].REJECT_CODE,
                    TEST_RESULT: dtSerial[i].TEST_RESULT,
                    REMARK_UPDATE: dtSerial[i].REMARK_UPDATE,
                    PACKING_NO: dtSerial[i].PACKING_NO,
                  },
                })
                .then((res) => {
                  _strErrorUpdate = res.data.p_error;
                });
            }
          }

          if (_strErrorUpdate != "") {
            setlblResult((prevState) => ({
              ...prevState,
              value: "Error :" + _strErrorUpdate,
              style: { color: "Red" },
            }));
          } else {
            for (let drRow = 0; drRow < dtSerial.length; drRow++) {
              if (dtSerial[drRow].SERIAL == "") {
                continue;
              } else {
                await axios
                  .post("/api/Common/SetBoxPackingSerialTray", {
                    strPrdName: _strPrdName,
                    strBox: lblBox.value,
                    strPack: lblPacking.value,
                    strSerial: dtSerial[drRow].SERIAL,
                    strUserID: hfUserID,
                    strStation: hfUserStation,
                    _strResult: _strScanResultAll,
                  })
                  .then((res) => {
                    // _strErrorUpdate = res.data.p_error;
                    if (res.data.p_error != "OK" && res.data.p_error != "") {
                      dtSerial[drRow].SCAN_RESULT = "NG";
                      dtSerial[drRow].REMARK = res.data.p_error;
                      //_strResult="NG"
                      _strErrorUpdate = res.data.p_error;
                    }
                  });
              }
            }
            //////
            if (_strErrorUpdate != "") {
              setlblResult((prevState) => ({
                ...prevState,
                value: "Error :" + _strErrorUpdate,
                style: { color: "Red" },
              }));
            } else {
              if (FQC == "Y") {
                await axios
                  .post("/api/Common/getSerialRecordTimeTrayTable", {
                    strPlantCode: FAC,
                    dtSerial: dtSerial,
                  })
                  .then((res) => {
                    dtSerial = res.data;
                  });

                for (let drRow = 0; drRow < dtSerial.length; drRow++) {
                  await axios
                    .post("/api/Common/setSerialRecordTimeTrayTable", {
                      dataList: {
                        strUserID: txtOP.value,
                        strProgram: "ScanSMTSerialPcsBoxOnlyGood",
                        strPlantCode: FAC,
                        strStation: hfUserStation,
                        data: [
                          {
                            SERIAL: dtSerial[drRow].SERIAL,
                            MACHINE: dtSerial[drRow].MACHINE,
                            PRODUCT: dtSerial[drRow].PRODUCT,
                            LOT: dtSerial[drRow].LOT,
                            DATA_TYPE: dtSerial[drRow].DATA_TYPE,
                            ROW_UPDATE: dtSerial[drRow].ROW_UPDATE,
                            UPDATE_FLG: dtSerial[drRow].UPDATE_FLG,
                          },
                        ],
                      },
                    })
                    .then((res) => {
                      _strErrorUpdate = res.data.p_error;
                    });
                }
                if (_strErrorUpdate !== "") {
                  setlblResult((prevState) => ({
                    ...prevState,
                    value: "Error :" + _strErrorUpdate,
                    style: { color: "Red" },
                  }));
                }
              }
            }
          }
        }
      }
      let dtLotPassCount = []; // บรรทัด 1380
      await axios
        .post("/api/Common/getSerialPassByLot", {
          strLotNo: _strLot,
          strPlantCode: FAC,
        })
        .then((res) => {
          dtLotPassCount = res.data.lotcount;
        });
      if (dtLotPassCount.length > 0) {
        setlblLotTotal((prevState) => ({
          ...prevState,
          value: dtLotPassCount,
        }));
      }

      let _dblBoxQty = 0; // 1386
      let data_count = 0;
      // setlblBoxFull((prevState) => ({ ...prevState, value: "0" }));
      await axios
        .post("/api/Common/GetBoxCount", {
          prdName: selectddlProduct.value,
          boxNo: lblBox.value,
        })
        .then((res) => {
          _dblBoxQty = res.data[0].BOX_QTY;
          data_count = res.data[0].BOX_COUNT;
        });
      if (_dblBoxQty > 0) {
        setlblBoxFull((prevState) => ({ ...prevState, value: _dblBoxQty }));
      }
      let _dtTrayCount = []; // 1392
      setlblBoxTotal((prevState) => ({ ...prevState, value: "0" }));
      setlblPackingTotal((prevState) => ({ ...prevState, value: "0" }));
      await axios
        .post("/api/Common/GetCountTrayByBoxPacking", {
          prdName: selectddlProduct.value,
          boxNo: lblBox.value,
          srtPack: txtPack.value,
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
      if (parseFloat(lblBoxTotal.value) == parseFloat(lblBoxFull.value)) {
        setlblBoxStatus((prevState) => ({ ...prevState, value: "OK" }));
      } else {
        setlblBoxStatus((prevState) => ({ ...prevState, value: "NG" }));
      }
      if (!_bolTrayError) {
        setgvScanResult(dtSerial);
        setpnlgvScanResult(true);
      } else {
        setgvScanResult("");
      }
      settxtPcsTray((prevState) => ({
        ...prevState,
        value: hfSerialCountOriginal,
      }));
      setHfserialcount(hfSerialCountOriginal);
      setlblLastTray((prevState) => ({ ...prevState, value: "Not Use" }));
      getInitialSerial();
      hideLoading();
    } catch (error) {
      console.error("An error occurred while fetching serial data:", error);
      Swal.fire({
        title: error,
        icon: "error",
      });
    }
  };

  const getInputSerial = async (txtSerial) => {
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
        PRODUCT: selectddlProduct.value,
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
    return dtData;
  };

  const ibtBox_Click = async () => {
    SetMode("BOX");
    setpnlgvScanResult(false);
  };
  const ibtPack_Click = async () => {
    SetMode("PACKING");
    setpnlgvScanResult(false);
  };
  const btnCancel = async () => {
    SetMode("SERIAL");
    setpnlgvScanResult(false);
    scrollToTop();
  };

  return {
    txtLot_TextChanged,
    txtLot,
    settxtLot,
    selectddlProduct,
    setselectddlProduct,
    ddlProduct_SelectedIndexChanged,
    ddlProduct,
    txtMachine_TextChanged,
    txtMachine,
    settxtMachine,
    ibtMachineBack_Click,
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
    lblLog,
    lblBoxFull,
    btnSave_Click,
    ibtBox_Click,
    ibtPack_Click,
    pnlSerial,
    txtSerial,
    pnlLog,
    pnlOP,
    handleSerialChange,
    lblResult,
    fntxtLot,
    fntxtMachine,
    fntxtTray,
    fntxtBox,
    fntxtPack,
    fc_txtSerial,
    fntxtOP,
    btnCancel,
    gvScanResult,
    pnlgvScanResult,
    lblTime,
    lblOP,
    dis_ddlProduct,
    columns,
    settxtSerial,
  };
}

export { fn_ScanSMTSerialPcsBoxOnlyGood };
