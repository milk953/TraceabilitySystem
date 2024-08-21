// Eye
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { color } from "framer-motion";
import { green } from "@mui/material/colors";

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
    visble: "",
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
    style: {},
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


  const [gvSerial, setgvSerial] = useState("");

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
  const fntxtPack = useRef([]);
  const fngvSerial = useRef([]);
  const fntxtOP = useRef([]);
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

  setHfserialcount

  const [hfAutoScan, setHfAutoScan] = useState("");
  const [hfCheckAOICoatF, setHfCheckAOICoatF] = useState("");
  const [hfCheckAOICoatB, setHfCheckAOICoatB] = useState("");
  const [hfSerialInfo, setHfSerialInfo] = useState("");
  const [hfMode, setHfMode] = useState("");
  const [hfSerialCountOriginal, setHfSerialCountOriginal] = useState("");

  const [hfUserID, sethfUserID] = useState("");
  const [hfUserStation, sethfUserStation] = useState("");


  const [hfFQC, setHfFQC] = useState("");
  const [hfOP,setHfOP] = useState("");
  // const [hfFQC, setHfFQC] = useState("");
  
  const params = new URLSearchParams(window.location.search);
  const FQC = params.get("FQC");
  const OP = params.get("OP");

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
    if(FQC !== null){
      console.log(FQC,OP,"FFFF")
      setHfFQC(FQC)
    }else{
      setHfFQC("")
    }
    if(OP !== null){
      setHfOP(OP)
    }else{
      setHfOP("")
    }
    SetMode("LOT")

    // PageLoad();
  }, []);

  const txtLot_TextChanged = async () => {
    console.log("Ok 1 ", txtLot.value);
    if (txtLot.value !== "") {
      let _strPrdName = "";
      let _strLot = "";
      let _strLotAll = txtLot.value.toUpperCase().split(";");
      if (_strLotAll.length > 2) {
        console.log(_strLotAll," เข้า LOT")
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
              console.log(dtLotPassCount,"dtLotPassCount :")
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
            console.log(ddlProduct,"ddlProduct")
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
                console.log(res.data,"res")
                let GetFinalGateMasterCheckResult = res.data;
                if (GetFinalGateMasterCheckResult == "OK") {
                  console.log("OK เข้ามา ")
                  getProductSerialMaster(_strPrdName);
                  console.log(hfFQC,"hfFQC")
                  if (hfFQC == "Y") {
                    console.log("hfFQC",hfFQC)
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
      // fntxtLot.current.focus()
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
    console.log(selectvalue, "selectvalue");
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
    console.log("เข้ามาแล้ว getProductSerialMaster",PrdName)
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
  value: hfserialcount,
}));
   
        }
      });
      await axios
      .post("/api/common/GetSerialBoxProductByProduct", {
        prdName: PrdName,
      })
      .then((res) => { 
        dtProductBox =res.data[0]
        console.log(dtProductBox.SLM_FIX_DIGIT,"data")
        if (dtProductBox.length > 0){
          if((hfSerialDigit !== dtProductBox.SLM_FIX_DIGIT) || 
          ((parseInt(hfSerialLength)) !== dtProductBox.SLM_FIX_START_DIGIT) ||
          ((parseInt(hfSerialEndDigit) !== dtProductBox.SLM_FIX_END_DIGIT)))
          {
            setpnlLog(true)
            setlblLog((prevState) => ({
              ...prevState,
              value: "Engineering code not same",
            }));
          }
          setHfSerialLength(dtProductBox.SLM_SERIAL_LENGTH)
          setHfSerialFixFlag(dtProductBox.SLM_FIX_FLAG)
          setHfSerialDigit(dtProductBox.SLM_FIX_DIGIT)
          setHfSerialStartDigit(dtProductBox.SLM_FIX_START_DIGIT)
          setHfSerialEndDigit(dtProductBox.SLM_FIX_END_DIGIT)
          setHfTrayFlag(dtProductBox.SLM_TRAY_FLAG)
          setHfTrayLength(dtProductBox.SLM_TRAY_LENGTH)
          setHfserialcount(dtProductBox.SLM_SERIAL_COUNT)
          setHfConfigCheck(dtProductBox.SLM_BARCODE_REQ_CONFIG)
          setHfConfigCode(dtProductBox.SLM_CONFIG_CODE)
          setHfConfigStart(dtProductBox.SLM_START_CONFIG)
          setHfConfigEnd(dtProductBox.SLM_END_CONFIG)
          // setHfPlasmaBoxCheck(dt)
        
        }
      });
      
    return dtProductSerial;
  };
  const SetMode = (_strType) => {
    console.log(_strType, "_strType :");
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
        if (hfFQC == "Y") {
          console.log("เข้าแล้วน้อ'g,pNF;p;kp")
          setpnlMachine(true);
          settxtMachine((prevState) => ({ ...prevState, disbled: false }));
          settxtOP((prevState) => ({ ...prevState, disbled: false }));
        } else {
          setpnlMachine(false);
          setpnlOP(false);
        }
        // fntxtLot.current.focus()
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
        // fntxtLot.current.focus();
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
        setpnlOP(false)
        if (hfFQC == "Y") {
          settxtMachine((prevState) => ({ ...prevState, disbled: false }));
          settxtOP((prevState) => ({ ...prevState, disbled: false }));
          setibtMachineBack(true);
          setibtOPBack(true);
        } else {
          setpnlMachine(false);
        }
        setHfMode("BOX");
        // fntxtBox.current.focus();
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
        // fntxtBox.current.focus();
        break;
      case "PACKING":
        setdis_ddlProduct(false);
        settxtLot((prevState) => ({ ...prevState, disbled: true }));
        settxtBox((prevState) => ({ ...prevState, disbled: true }));
        settxtPack((prevState) => ({ ...prevState, value: "", disbled: false }));
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
        // fntxtPack.current.focus();
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
        //  getInitialSerial()
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
        settxtLot((prevState) => ({ ...prevState,  disbled: true }));
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
    if (gvSerial.length > 0) {
      // fc_txtSerial.current[0].focus();
    }
    return 0;
  };
  const txtMachine_TextChanged = () => {
    console.log(txtMachine.value," MCN.NO  :")
    if (txtMachine.value.trim().toUpperCase() !== "") {
      SetMode("OP");
    }
  };
  const ibtMachineBack_Click = () => {
    SetMode("MACHINE");
  };
  const ibtBack_Click = () => {
    setdis_ddlProduct(true)
    settxtLot((prevState) => ({ ...prevState,value:"", style:{enableState} ,disbled :false }));
    setpnlSerial(false)
    SetMode("LOT")
    // fntxtLot.current.focus()

  };
  
  const txtOP_TextChanged = () => {
    let OP = txtOP.value.trim().toUpperCase()
    if (txtOP.value !== "") { 
      console.log("เข้า OP :",OP)
      settxtOP((prevState) => ({...prevState,value: OP,}));
      if (hfOP !== "") {
        console.log("hfOP",hfOP)
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
    console.log("txtBox : ",txtBox)
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
            console.log(data, "เข้าโว้ย มีมากกว่า 1");
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
            console.log(data, "ไม่เข้าโว้ย  1");
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
      // fntxtBox.current.focus();
    }
  };
  const txtPack_TextChanged = async () => {
    if(txtPack.value.toUpperCase() !== ""){
      let _dtTrayCount = []
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
        _dtTrayCount = res.data
      });
      if(_dtTrayCount.length > 0){
        setlblBoxTotal((prevState) => ({
          ...prevState,
          value: _dtTrayCount[0].BOX_COUNT,
        }));
        setlblPackingTotal((prevState) => ({
          ...prevState,
          value: _dtTrayCount[0].PACKING_COUNT,
        }));
      }
      SetMode("SERIAL")
    }else{
      settxtPack((prevState) => ({
        ...prevState,
        value: "",
      }));
      // fntxtPack.current.focus()
    }
  
  };
  const txtPcsTray_TextChanged = () => {
    console.log(txtPcsTray.value,"value",hfSerialCountOriginal)
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
    txtPack,settxtPack,lblLot,lblLotTotal,txtPcsTray,settxtPcsTray,txtPcsTray_TextChanged,lblSerialNG,
    ibtBack_Click,gvSerial,pnlMachine,lblLastTray
  };
}

export { fn_ScanSMTSerialPcsBoxOnlyGood };
