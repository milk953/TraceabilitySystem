import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Tag } from "antd";
import "../Common/StyleCommon.css";

function fn_ScanSMTSerialSpotHeat() {
  const [Product, setProduct] = useState([]);
  const [visibledll_product, setvisibledll_product] = useState(true);
  const [txtLot, settxtLot] = useState({value: "",disbled: "",visble: "",style: "",});
  const [SlProduct, setSlProduct] = useState("");
  const [txtTotalPCS, settxtTotalPCS] = useState({value: "",disbled: "",visble: "",style: "",});
  const [lblLog, setlblLog] = useState("");
  const [dataGvSerial, setdataGvSerial] = useState([]);
  const [gvScanResult, setgvScanResult] = useState("");
  const [txtSerial, settxtSerial] = useState(Array(dataGvSerial.length).fill(""));
  const [lblResult, setlblResult] = useState({ text: "", styled: {} });
  //ซ่อน
  const [pnlLog, setpnlLog] = useState(false);
  const [visiblpnlSerial, setvisiblepnlSerial] = useState(false);
  const [visiblgvSerial, setvisiblgvSerial] = useState(false);
  const [visiblegvScanResult, setvisiblegvScanResult] = useState(false);
  //Focus
  const fcTotalSht = useRef([]);
  const fcLotNo = useRef([]);
  const fcProduct = useRef(null);
  const fcGvSerial_txtSerial_0 = useRef([]);
  const fcGvSerial = useRef(null);
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

  const CONNECT_SERIAL_ERROR = "999999";
  const FAC1 = "5";

  useEffect(() => {
    const fetchData = async () => {
      await GetProductData();
      SetMode("LOT");
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (txtTotalPCS.value !== "") {
      getInitialSerial();
    }
  }, [hfSerialCount]);
  const GetProductData = async () => {
    axios.get("/api/Common/GetProductData").then((res) => {
      let data = res.data.flat();
      setProduct(data);
      setSlProduct(data)
    });
  };
 
  const handletxt_Lotno = async () => {
    let strLot = "";
    let strPrdName = "";
    const strLotData = txtLot.value.toUpperCase().split(";");

    if (strLotData.length >= 2) {
      strLot = strLotData[0];

      await axios
        .post("/api/Common/GetProductNameByLot", {
          strLot: strLot,
        })
        .then((res) => {
          strPrdName = res.data.prdName[0];
          console.log(strPrdName,"strPrdName")
        });
      if (strPrdName != null) {
        setlblLog("");
        setpnlLog(false);
        settxtLot((prevState) => ({ ...prevState, value: strLot }));
        const dataDT = await GetProductSerialMaster(strPrdName);
        console.log("เข้านะ")

        try {
          const isInArray = Product.some(
            (item) => item.prd_name === strPrdName
          );

          if (isInArray) {
            setSlProduct(strPrdName);
          } else {
            setlblLog(`Product ${strPrdName} not found.`);
            setvisibleLog(true);
            return;
          }
          if (txtTotalPCS.value == "") {
            settxtTotalPCS((prevState) => ({
              ...prevState,
              value: dataDT.slm_serial_sht,
            }));
          } else {
            SetMode("SERIAL");
          }
        } catch (error) {
          const intProduct = strPrdName.indexOf("-", 12);
          if (intProduct > -1) {
            strPrdName =
              strPrdName.substring(0, intProduct) +
              strPrdName.substring(intProduct + 1, intProduct + 11).trim();
            try {
              if (txtTotalPCS.value == "") {
                settxtTotalPCS((prevState) => ({
                  ...prevState,
                  value: dataDT.SLM_SERIAL_SHT,
                }));
              } else {
                SetMode("SERIAL");
                fcGvSerial_txtSerial_0.current[0].focus();
              }
            } catch (error) {
              setlblLog(`Product ${strPrdName} not found.`);
              setpnlLog(true);
            }
          } else {
            setlblLog("Product " + strPrdName + " not found.");
            setpnlLog(true);
            fcProduct.current.focus();
          }
        }
      } else {
        setSlProduct(Product[0].prd_name);
        settxtLot((prevState) => ({ ...prevState, value: "" }));
        setvisiblgvSerial(false);
        setlblLog("Invalid lot no.");
        setpnlLog(true);
        setHfMode("LOT");
        fcLotNo.current.focus();
      }
    } else {
      setSlProduct(Product[0].prd_name);
      settxtLot((prevState) => ({ ...prevState, value: "" }));
      setvisiblgvSerial(false);
      setlblLog("Please scan QR Code! / กรุณาสแกนที่คิวอาร์โค้ด");
      setpnlLog(true);
      setHfMode("LOT");
      fcLotNo.current.focus();
    }
  };
  const handleTotal_Sht = async () => {
    if (!isNaN(txtTotalPCS.value)) {
      setHfSerialCount(txtTotalPCS.value);
      SetMode("SERIAL");
    } else {
      settxtTotalPCS((prevState) => ({ ...prevState, value: "value" }));
      fcTotalSht.current.focus();
    }
  };

  const GetProductSerialMaster = async (strPrdName) => {
    let data = [];
    setHfSerialLength("0");
    setHfSerialFixFlag("N");
    setHfSerialDigit("");
    setHfSerialStartDigit("0");
    setHfSerialEndDigit("0");
    setHfTrayFlag("");
    setHfTrayLength("0");
    setHfTestResultFlag("");
    setHfBarcodeSide(""); //eye
    setHfShtScan("1"); //  eye
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
    setHfCheckLotSht("N"); // N eye
    setHfCheckLotShtStart("0"); //0 eye
    setHfCheckLotShtEnd("0"); //0 eye

    setHfCheckStartSeq("N");
    setHfCheckStartSeqCode("");
    setHfCheckStartSeqStart("0");
    setHfCheckStartSeqEnd("0");
    setHfCheckSheetELT("N"); //N eye
    setHfCheckDateInProc("N");
    setHfDateInProc("");
    setHfCheckWeekCode("N");
    setHfCheckWeekCodeStart("");
    setHfCheckWeekCodeEnd("");
    setHfWeekCode("");
    setHfWeekCodeType("");
    setHfCheckPreAOIF("N"); //N eye
    setHfCheckPreAOIB("N"); // N eye
    setHfCheckAOIF("N"); //N eye
    setHfCheckSPIF("N"); // N eye
    setHfCheckSPIB("N"); // N eye
    setHfSerialStartCode("");

    await axios
      .post("/api/Common/GetSerialProductByProduct", {
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
        }
      });

    return data;
  };

  const ibtBack_Click = async () => {
    settxtLot((prevState) => ({ ...prevState, value: "", disbled: true }));
    setvisiblepnlSerial(false);
    setvisiblgvSerial(false);
    setvisiblegvScanResult(false);
    setSlProduct(Product[0].prd_name);
    await SetMode("LOT");
  };

  const btnCancel_Click = async () => {
    await SetMode("SERIAL");
    setvisiblegvScanResult(false)
    fcGvSerial_txtSerial_0.current[0].focus();
  };

  const btnSave_Click = () => { 
    const hasAnyInput = Array.from(fcGvSerial_txtSerial_0.current).some(
        (input) => input.value.trim() !== ""
    );

    if (hasAnyInput == true) {
        if (hfMode === "SERIAL") {
            setSerialData();
            scrollToTop();
           
        }
    } else{
      setlblLog("Please Input Serial No.");
        setpnlLog(true);
        setTimeout(() => {
          fcGvSerial_txtSerial_0.current[0].focus();
        }, 300);
        setvisiblegvScanResult(false)
        scrollToTop();
       }
};



  const handleddlProduct = async () => {
    GetProductSerialMaster(SlProduct);

    if (txtLot.value != "") {
      setlblLog("");
      setpnlLog(false);
      await SetMode("SERIAL");
    } else {
      setSlProduct(Product[0].prd_name);
      await SetMode("LOT");
    }
  };

  const SetMode = async (_strType) => {
    switch (_strType) {
      case "LOT":
        setvisibledll_product(false);
        settxtLot((prevState) => ({ ...prevState, value: "", disbled: false }));
        settxtTotalPCS((prevState) => ({
          ...prevState,
          value: "",
          disbled: false,
        }));
        setpnlLog(false);
        setvisiblepnlSerial(false);
        setHfMode("LOT");
        fcLotNo.current.focus();
        break;

      case "LOT_ERROR":
        settxtLot((prevState) => ({ ...prevState, value: "", disbled: false }));
        settxtTotalPCS((prevState) => ({
          ...prevState,
          value: "",
          disbled: false,
        }));
        setpnlLog(false);
        setvisiblepnlSerial(false);
        setHfMode("LOT");
        fcLotNo.current.focus();
        break;

      case "PCS":
        settxtLot((prevState) => ({ ...prevState, value: "", disbled: true }));
        settxtTotalPCS((prevState) => ({
          ...prevState,
          value: "",
          disbled: false,
        }));
        setpnlLog(false);
        setvisiblepnlSerial(true);
        setHfMode("PCS");
        fcTotalSht.current.focus();
        break;

      case "SERIAL":
        settxtLot((prevState) => ({ ...prevState, disbled: true }));
        setpnlLog(false);
        setvisiblepnlSerial(true);
        setHfMode("SERIAL");
        setTimeout(() => {
          fcGvSerial_txtSerial_0.current[0].focus();
        }, 300);
        getInitialSerial();
        break;

      case "SERIAL_ERROR":
        settxtLot((prevState) => ({ ...prevState, disbled: true }));
        setpnlLog(true);
        break;

      case "SERIAL_OK":
        settxtLot((prevState) => ({ ...prevState, disbled: true }));
        setpnlLog(false);
        setvisiblepnlSerial(true);
        getInitialSerial();
        fcGvSerial.current.focus();
        break;

      case "SERIAL_NG":
        settxtLot((prevState) => ({ ...prevState, disbled: true }));
        setpnlLog(false);
      default:
        break;
    }
  };

  const getInputSerial = async () => {
    let dtData = [];
    for (let intSht = 0; intSht < txtTotalPCS.value; intSht++) {
      dtData.push({
        SEQ: intSht + 1,
        SERIAL: txtSerial[intSht],
        SCAN_RESULT: "",
        REMARK: "",
      });
    }

    return dtData;
  };

  const setSerialData = async () => {
    let dtSerial = await getInputSerial();
    let strLotData = [];
    let _strLot = "";
    let _strPrdName = SlProduct;
    let _strShtNoBack = "";
    let _strShtNoFront = "";
    let _strTray = " ";
    let _intSeq = 1;
    let _strScanResultAll = "OK";
    let _strErrorAll = "";
    let _strUpdateError = "";
    let _bolError = false;

    strLotData = txtLot.value.split(";");
    _strLot = strLotData[0];
    console.log(strLotData,"_strLot",_strLot)
    if (txtLot.value != "" && dtSerial.length > 0) {
      console.log("มาจ้า")
      let _intRowSerial = 0;
      for (let drRow = 0; drRow < dtSerial.length; drRow++) {
        if (dtSerial[drRow].SERIAL !== "") {
          let _strSerial = dtSerial[drRow].SERIAL;
          let _strMessageUpdate = "";
          let _strScanResultUpdate = "OK";
          let _strSerialResult = "";
          if (!CONNECT_SERIAL_ERROR.includes(_strSerial)) {
            await axios
              .post("/api/SpotHeat/GetSerialSpotHeatResult", {
                dataList: {
                  str_Factory: FAC1,
                  str_txtSerial: _strSerial,
                },
              })

              .then((res) => {
                _strSerialResult = res.data;
                console.log(_strSerialResult,"_strSerialResult")
                if (_strSerialResult !== "OK") {
                  _strScanResultUpdate = _strSerialResult;
                  console.log()

                  if (_strSerialResult == "NG") {
                    _strMessageUpdate =
                      "No data Spot Heat /  ไม่พบข้อมูลเวลา Spot Heat";
                  } else {
                    _strMessageUpdate =
                      "Serial not found / ไม่พบหมายเลขบาร์โค้ดนี้";
                  }

                  _strScanResultAll = "NG";
                  _bolError = true;
                }
                dtSerial[drRow].SCAN_RESULT = _strScanResultUpdate;
                dtSerial[drRow].REMARK = _strMessageUpdate;
              });
          }
        }
        _intRowSerial += 1;
      }
      setlblResult({
        text: _strScanResultAll,
        styled: { color: "", fontSize: "50px" },
      });

      if (_strScanResultAll == "OK") {
        setlblResult({ text: _strScanResultAll, styled: { fontSize: "50px" } });
      } else {
        setlblResult({ text: _strScanResultAll, styled: { fontSize: "50px" } });
      }
      if (_strErrorAll !== "") {
        setlblResult({
          text: _strScanResultAll < br > _strErrorAll,
          styled: { fontSize: "50px" },
        });
      }
      setgvScanResult(dtSerial);
      setvisiblegvScanResult(true);
      getInitialSerial();
    } else {
      setlblLog("Please input lot no. ");
      SetMode("SERIAL_ERROR");
    }
    setpnlLog(false)
    fcGvSerial_txtSerial_0.current[0].focus();
  };

  const getInitialSerial = async () => {
    let dtData = [];

    for (let intRow = 0; intRow < hfSerialCount; intRow++) {
      dtData.push({
        SEQ: intRow + 1,
      });
    }
    setvisiblgvSerial(true);
    setdataGvSerial(dtData);
    settxtSerial( Array(dtData.length).fill(""))
    if (dataGvSerial.length > 0) {
      setTimeout(() => {
        fcGvSerial_txtSerial_0.current[0].focus();
        }, 300);
    
    }
    return 0;
  };

  const handleSerialChange = (index, event) => {
    const newValues = [...txtSerial];
    newValues[index] = event.target.value;
    settxtSerial(newValues);
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
      title: "Scan Result",
      key: "Scan Result",
      dataIndex: "SCAN_RESULT",
      render: (text, record, index) => {
        return text ; 
        //?
        // (
        //   <Tag className={text === "OK" ? "Tag-OK" : text === "NG"|| "NO" ? "Tag-NG" : ""}>
        //     {text}
        //   </Tag>
        // ) : null; // คืนค่า null ถ้า text เป็นค่าว่าง
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
    handletxt_Lotno,
    txtLot,
    settxtLot,
    handleddlProduct,
    Product,
    SlProduct,
    txtTotalPCS,
    settxtTotalPCS,
    fcGvSerial_txtSerial_0,
    fcProduct,
    fcLotNo,
    lblLog,
    pnlLog,
    ibtBack_Click,
    handleTotal_Sht,
    btnSave_Click,
    setSlProduct,
    hfMode,
    txtSerial,
    handleSerialChange,
    gvScanResult,
    lblResult,
    visiblgvSerial,
    btnCancel_Click,
    visiblpnlSerial,
    fcGvSerial,
    visiblegvScanResult,
    visibledll_product,
    dataGvSerial,
    columns
  };
}

export { fn_ScanSMTSerialSpotHeat };
