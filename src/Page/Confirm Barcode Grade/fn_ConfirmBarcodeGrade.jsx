import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function fn_ConfirmBarcodeGrade() {
  const [Product, setProduct] = useState([]);

  const [Check_Master, setCheck_Master] = useState(false);
  const [txt_lotNo, settxt_lotNo] = useState("");
  const [SlProduct, setSlProduct] = useState("");
  const [txtLotRef, settxtLotRef] = useState("");
  const [txtOperator, settxtOperator] = useState("");
  const [lblTotalSht, setlblTotalSht] = useState("");
  const [lblTotalPcs, setlblTotalPcs] = useState("");
  const [txtRollLeaf, settxtRollLeaf] = useState("");
  const [txtMachineNo, settxtMachineNo] = useState("");
  const [lblLog, setlblLog] = useState("");
  const [hfRollNo, sethfRollNo] = useState("");
  const [tableData, setTableData] = useState([]);
  const [lblConfirm, setlblConfirm] = useState("");
  const [lblResult, setlblResult] = useState("");
  const [dataGvSerial, setdataGvSerial] = useState("");
  const [dataGvBackSide, setdataGvBackSide] = useState("");
  const [gvScanResult, setgvScanResult] = useState("");
  const [txtSideBack, settxtSideBack] = useState("");
  const [txtSideFront, settxtSideFront] = useState("");
  const [txtSerial, settxtSerial] = useState("");

  //ซ่อน
  const [visibleRollLeaf, setvisibleRollLeaf] = useState("none");
  const [visibleLog, setvisibleLog] = useState(false);
  const [visibleMachine, setvisibleMachine] = useState("none");
  const [visibleConfirm, setvisibleConfirm] = useState("none");
  const [visiblpnlSerial, setvisiblepnlSerial] = useState(false);
  const [visiblgvBackSide, setvisiblgvBackSide] = useState(false);
  const [visiblgvSerial, setvisiblgvSerial] = useState(false);
  const [visiblegvScanResult, setvisiblegvScanResult] = useState(false);

  //Focus
  const fcRollleaf = useRef(null);
  const fctMachchine = useRef(null);
  const fcLotNo = useRef(null);
  const fcOperator = useRef(null);
  const fcProduct = useRef(null);
  const fcGvSerial = useRef(null);
  const fcGvBackSide_txtsideback_0 = useRef(null);
  const fcGvSerial_txtSerial_0 = useRef(null);

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
  const CONNECT_SERIAL_ERROR = "999999";
  const hfBarcodeErrorValue = "NA";
  const AUTO_SCAN_CHECK_FLG = "0";


  useEffect(() => {
    if (hfShtScan != "" && hfSerialCount != "") {
      console.log(hfShtScan, hfSerialCount, "getInitialSerial3");
      getInitialSerial();
      console.log("x12");
    }
    if (fcGvBackSide_txtsideback_0.current) {
      fcGvBackSide_txtsideback_0.current.focus();
    }
  }, [hfShtScan, hfSerialCount, fcGvBackSide_txtsideback_0, hfMode]);

  //Start pageload
  useEffect(() => {
    const fetchData = async () => {
      await GetProductData();
      SetMode("LOT");
      setHfMode("");
    };
    fetchData();
  }, []);

  const GetProductData = async () => {
    axios.get("/api/Common/GetProductData").then((res) => {
      let data = res.data.flat();
      console.log(data[0].prd_name, "dataxxxxx");
      setProduct(data);
      setSlProduct(data[0].prd_name);
    });
  };

  const handletxt_Lotno = async () => {
    let strLot = "";
    let strPrdName = "";
    setvisiblegvScanResult(false);
    setvisiblgvBackSide(false);
    setvisiblgvSerial(false);
    setHfSerialCount(0);

    if (!Check_Master) {
      // console.log("Checkbox is not checked",Check_Master);
      const strLotData = txt_lotNo.toUpperCase().split(";");

      if (strLotData.length >= 2) {
        strLot = strLotData[0];
        console.log(strLot, "strLot");
        await axios
          .post("/api/Common/getProductDataByLot", {
            strLot: strLot,
          })
          .then((res) => {
            setvisibleRollLeaf("none");
            sethfRollNo("");
            console.log(res.data.flat().flat(), "api");
            let data = res.data.flat().flat();
            if (data.length > 0) {
              // console.log(data[0][0], "data");
              strPrdName = data[0][0];
              sethfRollNo(data[0][1]);
            }
          });
        if (strPrdName != "") {
          setlblLog("");
          setvisibleLog(false);
          settxt_lotNo(strLot);
          settxtLotRef(strLot);
          getCountDataBylot(strLot);
          const datagetPd = await GetProductSerialMaster(strPrdName);
          console.log(datagetPd, "datagetPd");
          try {
            const isInArray = Product.some(
              (item) => item.prd_name === strPrdName
            );
            // console.log("strPrdName", Product, strPrdName, SlProduct);
            if (isInArray) {
              console.log("เข้า is 1", strPrdName);
              setSlProduct(strPrdName);
              getInitialSheet();
            } else {
              console.log("mayyyyyy1");
              setSlProduct(strPrdName);
              setlblLog(`Product ${strPrdName} not found.`);
              setvisibleLog(true);
              fcProduct.current.focus();
              return;
            }

            if (datagetPd.PRM_CONN_ROLL_SHT_FLG == "Y") {
              setvisibleRollLeaf("");
              settxtRollLeaf("");
              SetMode("SERIAL");
              fcRollleaf.current.focus();
            } else {
              console.log("เข้าหรอ");
              SetMode("SERIAL");
              settxtMachineNo("");
              if (datagetPd.PRM_SHT_MACHINE_FLG == "Y") {
                setvisibleMachine("");
                fctMachchine.current.focus();
              } else {
                setvisibleMachine("none");
              }
            }
          } catch (error) {
            console.error(error, "mayer");
            const intProduct = strPrdName.indexOf("-", 12);
            console.log(intProduct, "intProduct");
            if (intProduct > -1) {
              strPrdName =
                strPrdName.substring(0, intProduct) +
                strPrdName.substring(intProduct + 1, intProduct + 11).trim();
              try {
                if (datagetPd.PRM_CONN_ROLL_SHT_FLG == "Y") {
                  setvisibleRollLeaf("");
                  settxtRollLeaf("");
                  fcRollleaf.current.focus();
                } else {
                  console.log("setserialllllllllll3");
                  SetMode("SERIAL");
                  settxtMachineNo("");
                  if (datagetPd.PRM_SHT_MACHINE_FLG == "Y") {
                    setvisibleMachine("");
                    fctMachchine.current.focus();
                  } else {
                    setvisibleMachine("none");
                    fcGvBackSide_txtsideback_0.current.focus();
                  }
                }
              } catch (error) {
                console.log("mayyyyyy3");
                setlblLog(`Product ${strPrdName} not found.`);
                setvisibleLog(true);
                fcProduct.current.focus();
              }
            } else {
              console.log("mayyyyyy2");
              setlblLog("Product " + strPrdName + " not found.");
              setvisibleLog(true);
              fcProduct.current.focus();
            }
          }
        } else {
          setSlProduct(Product[0].prd_name);
          settxt_lotNo("");
          setvisiblgvSerial(false);
          setlblLog("Invalid lot no.");
          setvisibleLog(true);
          setHfMode("LOT");
          fcLotNo.current.focus();
        }
      } else {
        setSlProduct(Product[0].prd_name);
        settxt_lotNo("");
        setvisiblgvSerial(false);
        setlblLog("Please scan QR Code! / กรุณาสแกนที่คิวอาร์โค้ด");
        setvisibleLog(true);
        setHfMode("LOT");
        fcLotNo.current.focus();
      }
    } else {
      GetProductSerialMaster(SlProduct);
      fcProduct.current.focus();
    }
  };

  const getCountDataBylot = async(strLot) => {
    setlblTotalSht("0");
    setlblTotalPcs("0");
    axios
      .post("/api/Common/getlotserialcountdata", {
        dataList: {
          strLotNo: strLot,
          strPlantCode: "5",
        },
      })
      .then((res) => {
        if (res.data.length > 0) {
          console.log(res.data, "count");
          setlblTotalPcs(res.data[0].count_pcs);
          setlblTotalSht(res.data[0].count_sht);
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
        console.log(data, "data.PRM_REQ_CHECK_PRD_SHT");
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
           console.log(data, "daaaa");
        }
      });

    return data;
  };

  const getInitialSheet = async () => {
    let dtData = [];
    for (let intRow = 0; intRow < hfShtScan; intRow++) {
      dtData.push({
        SEQ: intRow + 1,
        TITLE: hfBarcodeSide,
      });
    }

    setvisiblgvBackSide(true);
    setdataGvBackSide(dtData);
    return dtData;
  };

  const getInitialSerial = async () => {
    let dtData = [];
    console.log(hfShtScan, hfSerialCount, "getInitialSerial2");
    for (let intSht = 0; intSht < hfShtScan; intSht++) {
      console.log("iiii", intSht);
      for (let intRow = 0; intRow < hfSerialCount; intRow++) {
       
        dtData.push({
          SHEET: intSht + 1,
          SEQ: intRow + 1,
          TYPE: "PCS",
        });
      }
    }
    setvisiblgvSerial(true);

    setdataGvSerial(dtData);
    return dtData;
  };

  const ibtBack_Click = async () => {
    settxt_lotNo("");
    // txtLot.Enabled = True  ให้พิมได้
    setvisiblepnlSerial(false);
    setSlProduct(Product[0].prd_name);
    await SetMode("LOT");
    fcLotNo.current.focus();
  };

  const btnCancel_Click = async () => {
    await SetMode("SERIAL");
    fcGvSerial_txtSerial_0.current.focus();
  };

  const btnSave_Click = async() => {
    console.log("Setmode2 save", hfMode);
    if (hfMode == "SERIAL") {
      setSerialData();
    }
  };

  const handleSL_Product = async (value) => {
    setSlProduct(value);
    console.log("เข้าSL", value, txt_lotNo);
    GetProductSerialMaster(value);
    if (txt_lotNo != "") {
      setlblLog("");
      setvisibleLog(false);
      getCountDataBylot(txt_lotNo);
      getInitialSheet();
      if (hfCheckRollSht == "Y") {
        setvisibleRollLeaf("");
        settxtRollLeaf("");
        fcRollleaf.current.focus();
      } else {
        console.log("setserialllllllllll1");
        await SetMode("SERIAL");
        settxtMachineNo("");
        if (hfReqMachine == "Y") {
          setvisibleMachine("");
          fctMachchine.current.focus();
        } else {
          fcGvBackSide_txtsideback_0.current.focus();
        }
      }
    } else {
      setSlProduct(Product[0].prd_name);
      await SetMode("LOT");
    }
  };

  const handleTxt_RollLeaf = async () => {
    console.log(
      hfReqMachine,
      "mamamam88",
      txtRollLeaf.substring(hfCheckRollPrdStart - 1, hfCheckRollPrdEnd
        ),hfConnRollLength,hfConnRollLength
    );
    setvisibleLog(false);
    setlblLog("");
    if (
      Check_Master ||
      (txtRollLeaf !== "" && txtRollLeaf === hfConnRollLength)
    ) {
      console.log("mamamam999", txtRollLeaf);
      const strRollProduct = hfRollNo + hfCheckRollPrd;
      if (hfCheckRollPrdFlg === "Y") {
        if (
          !Check_Master &&
          strRollProduct !==
            txtRollLeaf.substring(hfCheckRollPrdStart - 1, hfCheckRollPrdEnd)
        ) {
          setvisibleLog(true);
          setlblLog("Roll/Leaf No. mix product");
          setvisiblepnlSerial(false);
          setHfMode("ROLL");
          await getInitialSheet();
          settxtRollLeaf("");
          fcRollleaf.current.focus();
        } else {
          SetMode("SERIAL");
          settxtMachineNo("");
          if (hfReqMachine == "Y") {
            setvisibleMachine("");
            fctMachchine.current.focus();
          } else {
            setvisibleMachine("none");
            fcGvBackSide_txtsideback_0.current.focus();
          }
        }
      } else {
        SetMode("SERIAL");
        settxtMachineNo("");
        if (hfReqMachine == "Y") {
          setvisibleMachine("");
          fctMachchine.current.focus();
        } else {
          setvisibleMachine("none");
          // fcGvBackSide_txtsideback_0.current.focus();
        }
      }
    } else {
      setvisibleLog(true);
      setlblLog("Invalid Roll/Leaf No.");
      setvisiblepnlSerial(false);
      setHfMode("ROLL");
      await getInitialSheet();
      settxtRollLeaf("");
      fcRollleaf.current.focus();
    }
  };

  const handleTxt_LotRef = async() => {
    if (txtOperator != "") {
      const strLotData = txtLotRef.trim().toUpperCase().split(";");
      settxtLotRef(strLotData[0]);
      fcOperator.current.focus();
    }
  };

  const SetMode = async (_strType) => {
    console.log("Setmode1", _strType);
    if (_strType == "LOT") {
      // ddlProduct.Enabled = True
      settxt_lotNo("");
      // txtLot.Enabled = True
      // txtLot.CssClass = "styleEnable"
      setvisibleLog(false);
      setvisiblepnlSerial(false);
      setHfMode("LOT");
      fcLotNo.current.focus();
    }
    if (_strType == "LOT_ERROR") {
      txtLot.Text = "";
      // txtLot.Enabled = True
      // txtLot.CssClass = "styleEnable"
      setvisibleLog(true);
      setvisiblepnlSerial(false);
      setHfMode("LOT");
      fcLotNo.current.focus();
    }
    if (_strType == "SERIAL") {
      console.log("ttttt", hfMode);
      // txtLot.Enabled = False
      // txtLot.CssClass = "styleDisable"
      setvisibleLog(false);
      setvisiblepnlSerial(true);
      setHfMode("SERIAL");
      await getInitialSerial();
    }
    if (_strType == "SERIAL_ERROR") {
      // txtLot.Enabled = False
      // txtLot.CssClass = "styleDisable"
      setvisibleLog(true);
    }
    if (_strType == "SERIAL_OK") {
      // txtLot.Enabled = False
      // txtLot.CssClass = "styleDisable"
      setvisibleLog(false);
      await getInitialSerial();
      fcGvSerial.current.focus();
    }
    if (_strType == "SERIAL_NG") {
      // txtLot.Enabled = False
      // txtLot.CssClass = "styleDisable"
      setvisibleLog(false);
    }
  };

  const getInputSerial = async () => {
    let dtData = [];
    for (let intSht = 0; intSht < hfShtScan; intSht++) {
      console.log("txtSerial", txtSerial[intSht]);
      for (let intRow = 0; intRow < hfSerialCount; intRow++) {
        dtData.push({
          SHEET: intSht + 1,
          BACK_SIDE: txtSideBack[intSht],
          FRONT_SIDE: txtSideFront[intSht],
          SEQ: intRow + 1,
          SERIAL_GRADE:
            hfBarcodeErrorValue.includes(txtSerial[intRow]) && txtSerial[intRow]
              ? "X"
              : txtSerial[intRow]
              ? txtSerial[intRow].slice(-1)
              : "",
          SERIAL: txtSerial[intRow],
          GRADE_RESULT: "",
          SCAN_RESULT: '',
          REMARK: "",
          UPDATE_FLG: "N",
          MACHINE: txtMachineNo,
          PRODUCT: SlProduct,
        });
      }
    }
    console.log(dtData, "dtData");
    return dtData;
  };

  const setSerialData = async () => {
    const dtSerial = await getInputSerial();
    // const datagetPd = await GetProductSerialMaster(strPrdName);
    console.log(dtSerial, "dtSerial", txtLotRef, "-----", hfWeekCodeType);
    let _strLotData = "";
    let _strLotRefData = "";
    let _strLot = "";
    let _strLotRef = "";
    let _strPrdName = SlProduct;
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

    const strLotData = txt_lotNo.toUpperCase().split(";");
    _strLot = strLotData[0];

    const strLotRefData = txtLotRef.toUpperCase().split(";");
    _strLotRef = strLotRefData[0];

    setvisibleLog(false);

    if (visibleConfirm) {
      _bolConfirm = true;
    }
    setvisibleConfirm("none");

    if (txt_lotNo != "" && dtSerial.length > 0) {
      if (!Check_Master && hfCheckWeekCode == "Y") {
        await axios
          .post("/api/Common/getWeekCodebyLot", {
            STRLOT: _strLot,
            STRPROC: hfDateInProc,
          })
          .then((res) => {
            console.log(res.data);
            setHfWeekCode(res.data);
            dataHfWeekCode(res.data);
          });
      }

      let _intRowSerial = 0;
      if (!Check_Master) {
        for (let i = 0; i < dtSerial.length; i++) {
          _strShtNoBack = dtSerial[i].BACK_SIDE;
          _strShtNoFront = dtSerial[i].FRONT_SIDE;
          console.log(_strShtNoBack);
          if (hfCheckPrdSht == "Y" && dtSerial[i].SEQ == "1") {
            const start = parseInt(hfCheckPrdShtStart);
            const end = parseInt(hfCheckPrdShtEnd);
            const substringBack = _strShtNoBack.substring(start, end + 1);
            const substringFront = _strShtNoFront.substring(start, end + 1);
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
            const substringBack = _strShtNoBack.substring(start, end + 1);
            const substringFront = _strShtNoFront.substring(start, end + 1);
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
          if (txtOperator == "") {
            _strScanResultAll = "NG";
            _strErrorAll = "Invalid operator";
            _bolError = true;
          }

          if (hfReqMachine == "Y") {
            if (txtMachineNo == "") {
              _strScanResultAll = "NG";
              _strErrorAll = "Invalid machine no";
              _bolError = true;
            }

            if (dtSerial[i].SERIAL != "") {
              let _strSerial = dtSerial[i].SERIAL;
              let _strTestResult = "NONE";
              let _strMessageUpdate = "";
              let _strScanResultUpdate = "";
              if (_strSerial != CONNECT_SERIAL_ERROR) {
                for (
                  let _intRow = _intRowSerial + 1;
                  _intRow < dtSerial.length;
                  _intRow++
                ) {
                  if (_strSerial == dtSerial[_intRow].SERIAL) {
                    _strScanResultUpdate = "NG";
                    _strMessageUpdate = "Serial duplicate/หมายเลขบาร์โค้ดซ้ำ";
                    _strScanResultAll = "NG";
                    _bolError = true;
                    _strErrorAll = "Serial duplicate/หมายเลขบาร์โค้ดซ้ำ";
                  }
                }
                if (_strSerial.length == hfSerialLength) {
                  let _strFixDigit = "";
                  const start = parseInt(hfSerialStartDigit);
                  const end = parseInt(hfSerialEndDigit);
                  _strFixDigit = _strSerial.substring(start, end + 1);
                  if (_strFixDigit != hfSerialDigit) {
                    _strScanResultUpdate = "NG";
                    _strMessageUpdate =
                      "Serial barcode mix product/หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
                    _strScanResultAll = "NG";
                    _bolError = true;
                  } else if (hfConfigCheck == "Y") {
                    let _strConfigDigit = "";
                    const Start = parseInt(hfConfigStart);
                    const End = parseInt(hfConfigEnd);
                    _strConfigDigit = _strSerial.substring(Start, End + 1);
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
                    _strStartSeq = _strSerial.substring(start, end + 1);
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
                    _strWeekCode = _strSerial.substring(start, end + 1);
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
                  _bolError = True;
                }
                if (_strScanResultUpdate != "NG") {
                  let _inCountSeq = 0;
                  let _strSerialNoDup = "";
                  let serial = _strSerial.substring(
                    parseInt(hfDuplicateStart),
                    parseInt(hfDuplicateEnd) - parseInt(hfDuplicateStart) + 1
                  );
                  axios
                    .post("/api/Common/GetSerialDuplicateConnectSht", {
                      Serial: serial,
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
              if ((_strMessageUpdate = "")) {
                dtSerial[i].UPDATE_FLG = "Y";
                console.log(_strMessageUpdate, "_strMessageUpdate1");
              } else {
                dtSerial[i].UPDATE_FLG = "N";
                console.log(_strMessageUpdate, "_strMessageUpdate2");
              }
              console.log('_strResult3',_strScanResultUpdate)
              dtSerial[i].SCAN_RESULT = _strScanResultUpdate;
              dtSerial[i].REMARK = _strMessageUpdate;
            }
            _intRowSerial += 1;
          }
        }
      }

      //-----

      if (!Check_Master && hfWeekCodeType == "S" && _bolError == false) {
        console.log("เข้สมั้ยนะะะ", _strLotRef);
        let _strReturn = "";
        _strReturn = await GetShippingSerialNo(
          dtSerial,
          _strLotRef,
          hfWeekCodeType
        );
        console.log(dtSerial, "mmmmmmaaaaa");
        if (_strReturn != "") {
          _strScanResultAll = "NG";
          _bolError = true;
          if (_strReturn != "NG") {
            setvisibleLog(true);
            setlblLog(_strReturn);
          }
        }
      }
      if (!Check_Master && hfCheckSheetELT == "Y") {
        let _strReturn = "";
        for (let i = 0; i < dtSerial.length; i++) {
          console.log("mamama9", dtSerial[i]);
          await axios
            .post("/api/Common/setseriallotshtelttable", {
              dataList: {
                strSheetNo: "",
                strPrdName: dtSerial[i].PRODUCT,
                strPlantCode: "G",
                strSideF: dtSerial[i].FRONT_SIDE,
                strSideB: dtSerial[i].BACK_SIDE,
                strPcsno: dtSerial[i].SEQ,
                strSerialNo: dtSerial[i].SERIAL,
              },
            })
            .then((res) => {
              console.log("setseriallotshtelttable", res.data[0].p_error);
              _strReturn = res.data[0].p_error;
              if (_strReturn != "") {
                _strScanResultAll = "NG";
                _bolError = True;
                if (_strReturn != "NG") {
                  setvisibleLog(true);
                  setlblLog(_strReturn);
                }
              }
            });
        }
      }
      for (let i = 0; i < dtSerial.length; i++) {
        if (!Check_Master) {
          console.log('_strResult4',dtSerial[i].SCAN_RESULT)
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
              // _Result = BIZ_ScanSMTSerial.Get_SPI_AOI_RESULT(Session("PLANT_CODE"), _intSeq, Session("PRODUCT_KIND"), _FrontSheetBarcode, _RearSheetBarcode, _strPrdName, _Message)
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
            console.log('_strResult2',_strScanResultUpdate)
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
        // PRM_CONN_ROLL_LENGTH = hfConnRollLength
        if (txtRollLeaf.length == parseInt(hfConnRollLength)) {
          if (txtRollLeaf) {
            let dataRBMP = "";
            await axios
              .post("/api/GetRollLeafScrapRBMP", {
                strRollNo: "",
              })
              .then((res) => {
                // console.log("GetRollLeafScrapRBMP", res.data);
                dataRBMP = res.data;
              });
            if (dataRBMP == "Y") {
              _bolError = true;
              _strScanResultAll = "NG";
              _strUpdateError = "Problem sheet from RBMP";
              _strErrorAll = "Problem sheet from RBMP";
            } else {
              let dtRowLeaf =await getConnectRollSheetData(
                dtSerial,
                SlProduct,
                txtRollLeaf
              );
              let _intCount = 0;
              let _strRollLeaf = txtRollLeaf;
              await axios
                .post("/api/Common/setseriallotshtelttable", {
                  strRollLeaf: _strRollLeaf,
                  _dtRollLeaf: dtRowLeaf,
                })
                .then((res) => {
                  _intCount = res.data;
                });
              if ((_intCount = 1)) {
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
                    parseInt(hfCheckRollPrdStart),
                    parseInt(hfCheckRollPrdEnd) + 1
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
                  dtRowLeaf[i].strPlantCode = "THA";
                  dtRowLeaf[i]._strUserID = txtOperator;
                  dtRowLeaf[i]._strStation = hfUserStation;
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
          dtSerial[i]._strPlantCode = "5";
          dtSerial[i].hfBarcodeSide = hfBarcodeSide;
          dtSerial[i].hfSerialLength = hfSerialLength;
          dtSerial[i]._strMasterSheet = _strMasterSheet;
          dtSerial[i].hfUserStation = hfUserStation;
          dtSerial[i].ddlPD = SlProduct;
          dtSerial[i].hfUserStation = hfUserStation;
        }
        console.log("maykubbbb1", dtSerial);
        await axios
          .post("/api/Common/SetSerialLotShtGradeTable", {
            dataList: dtSerial,
          })
          .then((res) => {
            console.log("maykubbbb2", res.data.SCAN_RESULT);

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
        console.log('maykubbbb3',_strErrorAll,'---',_strScanResultAll)
        setlblResult(_strScanResultAll + _strErrorAll);
      }
      if (_strBarcodeResultAll != "NG" || _bolConfirm) {
        console.log("mamama7", dtSerial);
        setgvScanResult(dtSerial);
        setvisiblegvScanResult(true);
        getInitialSheet();
        getInitialSerial();
        getCountDataBylot(txt_lotNo);
        settxtMachineNo("");
        if (hfReqMachine == "Y") {
          setvisibleMachine("");

          fctMachchine.current.focus();
        } else {
          // fcGvBackSide_txtsideback_0.current.focus();
        }
      } else {
        console.log("mamama8", _strBarcodeResultAll, _bolConfirm);
        setgvScanResult(dtSerial);
        setvisiblegvScanResult(true);
        setlblConfirm(true);
      }
    } else {
      setlblLog("Please input Sheet Side No. !!! ");
      SetMode("SERIAL_ERROR");
      // fnPlaySound()
      getCountDataBylot(txt_lotNo);
      settxtMachineNo("");
      if (hfReqMachine == "Y") {
        setvisibleMachine("");
        // fnSetFocus("txtMachineNo")
        fctMachchine.current.focus();
      } else {
        fcGvBackSide_txtsideback_0.current.focus();
      }
    }
  };

  const getConnectRollSheetData = async (_dtSerial, _strProduct, _strRollLeaf) => {
    let _dtData = [];
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
        let _drShtRow = {
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
          MACHINE: txtMachineNo,
          PRODUCT: _strProduct,
          LOT_NO: txt_lotNo,
        };
        _dtData.push(_drShtRow);
        if (_dtSerial[i].FRONT_SIDE != _dtSerial[i].BACK_SIDE) {
          _intRow += 1;
          let _drShtRow2 = {
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
            MACHINE: txtMachineNo,
            PRODUCT: _strProduct,
            LOT_NO: txt_lotNo,
          };
          _dtData.push(_drShtRow2);
        }
      }
      _strShtNoOld = _dtSerial[i].FRONT_SIDE;
    }
    return _dtData;
  };

  const ChangeBase34 = async (num) => {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return chars[num];
  };

  const ConvertBase34 = async (lngNumber2) => {
    let shou;
    let Amari = [];
    let i = 0;
    let StrTemp = "";
    let LngNumber = lngNumber2;
    console.log(lngNumber2);
    do {
      Amari[i] = LngNumber % 34;
      shou = Math.floor(LngNumber / 34);
      if (shou === 0) {
        break;
      }
      i++;
      if (shou < 34) {
        Amari[i] = shou;
        break;
      }
      LngNumber = shou;
    } while (true);

    for (let j = i; j >= 0; j--) {
      StrTemp += await ChangeBase34(Amari[j]);
    }

    return StrTemp;
  };

  const Convert0000 = async (strText) => {
    return ("0000" + strText).slice(-4);
  };

  const GetShippingSerialNo = async (dtSerial, strLotNo, strWeekType) => {
    let _strReturn = "";
    let _intSeq = 1;
    console.log(
      parseInt(strLotNo.substring(1, 2)),
      parseInt(strLotNo.substring(2, 3)),
      parseInt(strLotNo.substring(3, 4))
    );
    let _strLotBase34_1 = await ConvertBase34(
      parseInt(strLotNo.substring(1, 2)) +
        parseInt(strLotNo.substring(2, 3)) +
        parseInt(strLotNo.substring(3, 4))
    );

    let _strLotBase34_4 = await Convert0000(
      await ConvertBase34(parseInt(strLotNo.substring(4, 10)))
    );
    for (let i = 0; i < dtSerial.length; i++) {
      let _strResult = "OK";
      let _strRemark = "";
      console.log("mamama");
      if (strWeekType == "S") {
        console.log("mamama1");
        if (
          _strLotBase34_1 != dtSerial[i].SERIAL.charAt(10) ||
          _strLotBase34_4 != dtSerial[i].SERIAL.charAt(19, 23)
        ) {
          console.log("mamama2");
          _strReturn = "NG";
          _strResult = "NG";
          _strRemark = "Serial mix lot";
        } else {
          if (dtSerial[i].SEQ != dtSerial[i].SERIAL.charAt(11, 12)) {
            console.log("mamama3");
            _strReturn = "NG";
            _strResult = "NG";
            _strRemark = "Serial mix strip";
          } else {
            if (_intSeq == 1) {
              _strShetSeq = dtSerial[i].SERIAL.charAt(7, 10);
            } else {
              if (dtSerial[i].SERIAL.charAt(7, 10) != _strShetSeq) {
                console.log("mamama4");
                _strReturn = "NG";
                _strResult = "NG";
                _strRemark = "Serial mix sheet";
              }
            }
          }
        }
      }
      console.log('_strResult1',_strResult)
      dtSerial[i].SCAN_RESULT = _strResult;
      dtSerial[i].REMARK = _strRemark;
      _intSeq += 1;
    }
    console.log(dtSerial, "ddddd");
    return _strReturn;
  };

  const handleTxt_Opreator = async () => {
    if (txtOperator != "") {
      if (hfCheckRollSht == "Y") {
        setvisibleRollLeaf("");
        settxtRollLeaf("");
        fcRollleaf.current.focus();
      } else {
        await SetMode("SERIAL");
        settxtMachineNo("");
        if (hfReqMachine == "Y") {
          setvisibleMachine("");
          fctMachchine.current.focus();
        }
      }
    } else {
      settxtOperator("");
      fnSetFocus("txtOperator");
    }
  };

  const handleFrontSideChange = async (index, event) => {
    const newValues = [...txtSideFront];
    newValues[index] = event.target.value;
    settxtSideFront(newValues);
    console.log(newValues, "settxtSideFront");
  };

  const handleBackSideChange =async (index, event) => {
    const newValues = [...txtSideBack];
    newValues[index] = event.target.value;
    settxtSideBack(newValues);
    console.log(newValues, "settxtSideFront");
  };

  const handleSerialChange =async (index, event) => {
    const newValues = [...txtSerial];
    newValues[index] = event.target.value;
    settxtSerial(newValues);
    console.log(newValues, "settxtSideFront");
  };

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
    visiblgvBackSide,
    hfBarcodeSide,
    hfShtScan,
    hfSerialCount,
    visiblgvSerial,
    lblLog,
    visibleLog,
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
    visiblegvScanResult,
    fcRollleaf,
    fctMachchine,
    fcLotNo,
    fcOperator,
    fcProduct,
    fcGvSerial,
    fcGvBackSide_txtsideback_0,
    fcGvSerial_txtSerial_0,
    visibleRollLeaf,
    visibleMachine,
    visibleConfirm,
  };
}

export { fn_ConfirmBarcodeGrade };
