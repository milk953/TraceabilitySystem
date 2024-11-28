import { Tag } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLoading } from "../../loading/fn_loading";

function fn_ScanSMTSerialPcsP1() {
  const Fac = import.meta.env.VITE_FAC;
  const hfUserID = localStorage.getItem("ipAddress");
  const hfUserStation = localStorage.getItem("ipAddress");
  const DUPLICATE_CHECK_FLG = "0";
  let hfMode = "";
  const hiddenParams = {
    hfSerialLength: "0",
    hfSerialFixFlag: "N",
    hfSerialDigit: "",
    hfSerialStartDigit: "0",
    hfSerialEndDigit: "0",
    hfTrayFlag: "",
    hfTrayLength: "0",
    hfTestResultFlag: "Y",
    hfConfigCheck: "N",
    hfConfigCode: "",
    hfConfigStart: "0",
    hfConfigEnd: "0",
    hfConfigRuning: "N",
    hfDuplicateStart: "0",
    hfDuplicateEnd: "0",
    hfChipIDCheck: "N",
    hfCheckPrdSht: "N",
    hfCheckPrdShtStart: "0",
    hfCheckPrdShtEnd: "0",
    hfCheckPrdAbbr: "",
    hfPlasmaCheck: "N",
    hfPlasmaTime: "0",
    hfCheckStartSeq: "N",
    hfCheckStartSeqCode: "",
    hfCheckStartSeqStart: "0",
    hfCheckStartSeqEnd: "0",
    hfCheckSPIAOI: "N",
    hfCheckDateInProc: "N",
    hfDateInProc: "",
    hfCheckWeekCode: "N",
    hfCheckWeekCodeStart: "",
    hfCheckWeekCodeEnd: "",
    hfWeekCode: "",
    hfWeekCodeType: "",
    hfCheckPreAOIF: "N",
    hfCheckPreAOIB: "N",
    hfCheckAOIF: "N",
    hfCheckAOIB: "N",
    hfCheckSPIF: "N",
    hfCheckSPIB: "N",
    hfSerialStartCode: "",
    hfCheckAOICoatB: "",
    hfCheckAOICoatF: "",
    hfAutoScan: "",
    hfSerialCount: "",
    hfLotLength: "9",
    hfLotAll: "server",
    hfExportCSV :'N'
  };
  const {showLoading,hideLoading} = useLoading();
  const FINAL_GATE_SPECIAL_FLG = import.meta.env.VITE_FINAL_GATE_SPECIAL_FLG;
  const FINAL_GATE_SPECIAL_PRD = import.meta.env.VITE_FINAL_GATE_SPECIAL_PRD;
  const FINAL_GATE_SPECIAL_SERIAL_VAR = import.meta.env.VITE_FINAL_GATE_SPECIAL_SERIAL_VAR;
  const FINAL_GATE_SPECIAL_MESSAGE = import.meta.env.VITE_FINAL_GATE_SPECIAL_MESSAGE;
  const FINAL_GATE_SPECIAL_OK = import.meta.env.VITE_FINAL_GATE_SPECIAL_OK;
  const _strTagNewLine = "/";
  const [scanLot, setScanLot] = useState("");
  const [ddlproduct, setddlproduct] = useState([]);
  const [productSelected, setProductSelected] = useState("");
  const [ddlProductState, setddlProductState] = useState(false);
  const [lblLot, setlblLot] = useState("");
  const [lblLotTotal, setlblLotTotal] = useState("");
  const [lblSerialNG, setlblSerialNG] = useState(0);
  const [lblError, setlblError] = useState("");
  const [lblErrorState, setlblErrorState] = useState(false);
  const [panalSerialState, setpanalSerialState] = useState(false);
  const [hideImg, setHideImg] = useState(true);
  const [lblResultState, setlblResultState] = useState(false);
  const [lblResult, setLblResult] = useState({
    value: "",
    styled: {
      color: "",
    },
  });
  const [gvSerialResult, setGvSerialResult] = useState([]);
  const [gvSerial, setGvSerial] = useState([]);
  const [txtSerial, setTxtSerial] = useState(gvSerial.map(() => ""));
  const columns = [
    {
      title: "No.",
      dataIndex: "SEQ",
      key: "SEQ",
      align: "center",
      width: 30,
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "Serial No.",
      dataIndex: "SERIAL",
      key: "SERIAL",
      align: "center",
      width: 50,
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "Reject",
      dataIndex: "REJECT",
      key: "REJECT",
      align: "center",
      width: 100,
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "Touch Up",
      dataIndex: "TOUCH_UP",
      key: "TOUCH_UP",
      align: "center",
      width: 50,
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "Reject 2",
      dataIndex: "REJECT_2",
      key: "REJECT_2",
      align: "center",
      width: 50,
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "Test Result",
      dataIndex: "TEST_RESULT",
      key: "TEST_RESULT",
      align: "center",
      width: 50,
      render: (text, record, index) => {
        return record.SERIAL ? text : null;
      },
    },
    {
      title: "Scan Result",
      dataIndex: "SCAN_RESULT",
      key: "SCAN_RESULT",
      align: "center",
      width: 50,
      render: (text, record, index) => {return text;},},
    {
      title: "Remark",
      dataIndex: "REMARK",
      key: "REMARK",
      align: "center",
      width: 200,
      render: (text, record, index) => {
        return text;
      },
    },
  ];
  const getRowClassName = (record) => {
    if (record.SCAN_RESULT === "NG") {
      return 'row-red';
    } else if (record.SCAN_RESULT === "OK") {
      return 'row-green';
    }
    return '';
  };
  useEffect(() => {
    PageLoad();
  }, []);
  // Event Method
  async function PageLoad() {
    await getData("getProductData");
    SetMode("LOT");
  }
  const textScanLotChange = async (e) => {
    let _strLot_V = e.target.value;
    if (_strLot_V != "") {
      let _strPrdName = "";
      let _strLot = "";
      let _strLotAll = _strLot_V.split(";");
      if (_strLotAll.length >= 2) {
        _strLot = _strLotAll[0];
        _strPrdName = productSelected;
        hiddenParams.hfTestResultFlag = "Y";
        if (_strLot.length == parseInt(hiddenParams.hfLotLength)) {
          _strPrdName = await getData("GetProductNameByLot", _strLot);
          let dtLotPassCount = await getData("GetSerialPassByLot", _strLot);
          setlblLotTotal("0");
          setlblSerialNG(0);
          if (parseInt(dtLotPassCount) > 0) {
            setlblLotTotal(dtLotPassCount);
          }
          let dtLotProduct = await getData("GetProductDataByLot", _strLot);
          if (dtLotProduct.length != "") {
            if (dtLotProduct.LOT_EN == "Y") {
              hiddenParams.hfTestResultFlag = "N";
            }
            hiddenParams.hfLotAll = dtLotProduct.LOT_ALL;
          }
          setlblLot(_strLot);
          if (ddlproduct.some((x) => x.prd_name == _strPrdName)) {
            setProductSelected(_strPrdName);
            await getData("getProductSerialMaster", _strPrdName);
            SetMode("SERIAL");
          } else {
            setlblError("Product " + _strPrdName + " not found.");
          }
        } else {
          setlblError(
            _strLot +
              " invalid lot no.!" +
              _strTagNewLine +
              _strLot +
              " หมายเลขล็อตไม่ถูกต้อง"
          );
          setlblLot("");
          setlblLotTotal("");
          setlblSerialNG(0);
          SetMode("LOT_ERROR");
        }
      } else {
        setlblError(
          " Please scan QR Code!" + _strTagNewLine + " กรุณาสแกนที่คิวอาร์โค้ด"
        );
        setlblLot("");
        setlblLotTotal("");
        setlblSerialNG(0);
        SetMode("LOT_ERROR");
      }
    } else {
      setlblError("");
      SetFocus("P1FGScanLot");
    }
  };

  const ibtBack_Click = () => {
    setddlProductState(false);
    console.log(ddlproduct)
    setlblResultState(false);
    setProductSelected(ddlproduct[0].prd_name);
    setScanLot("");
    Setdisable("enable", "P1FGScanLot");
    setpanalSerialState(false);
    setlblErrorState(false);
    SetMode("LOT");
    SetFocus("P1FGScanLot");
  };
  const btnCancel_Click = () => {
    setTxtSerial(gvSerial.map(() => ""));
    SetFocus("txtSerial_0");
  };
  const btnSvae_Click = () => {
    setSerialDataTray();
  };
  const ddlproduct_Change = async (e) => {
    await getData("getProductSerialMaster", e);
    if (lblLot != "") {
      await getData("getProductSerialMaster", e);
      SetMode("SERIAL");
    } else {
      SetMode("LOT");
    }
  };
  const btnHidden_Click = () => {
    // DownloadCSV();
  };
  //Function Method
  async function getData(type, params) {
    try {
      if (type == "getProductData") {
        await axios.get("/api/common/GetProductData").then((res) => {
          setProductSelected(res.data[0].prd_name);
          setddlproduct(res.data);
          getData("getProductSerialMaster", res.data[0].prd_name);
        });
      } else if (type == "GetProductNameByLot") {
        let prdName = "";
        await axios
          .post("/api/common/getProductNameByLot", { strLot: params })
          .then((res) => {
            prdName = res.data.prdName[0];
          });
        return prdName;
      } else if (type == "GetSerialPassByLot") {
        let dtData = "";
        await axios
          .post("/api/common/getSerialPassByLot", {
            strLotNo: params,
            strPlantCode: Fac,
          })
          .then((res) => {
            dtData = res.data.lotcount;
          });
        return dtData;
      } else if (type == "GetProductDataByLot") {
        let dtData = [];
        await axios
          .post("/api/ScanFin/GetProductDataByLot", { strLot: params })
          .then((res) => {
            dtData = res.data;
          });
        return dtData;
      } else if (type == "GetSerialTestResultManyTable") {
        let dtData = [];
        await axios.post("/api/common/GetSerialTestResultManyTable", {
          dataList: [{
            strPlantCode: Fac,
            strPrdname: params.dataList[0].strPrdname,
            strWeekCodeType: params.dataList[0].strWeekCodeType,
          }],
          dtSerial: params.dtSerial,
        }).then((res) => {
          dtData = res.data;
        });
        console.log(dtData, "GetSerialTestResultManyTable");
        return dtData;
      } else if (type == "GetWeekCodebyLot") {
        let response = "";
        await axios
          .post("/api/common/GetWeekCodebyLot", {
            _strLot: params.strLot,
            _strProc: params.hfDateInProc,
            _strWeekType: params.hfWeekCodeType,
            _strSerialInfo: params.hfSerialInfo,
          })
          .then((res) => {
            response = res.data.weekCode;
          });
        return response;
      } else if (type == "GetSerialDuplicate") {
        let result = "";
        await axios.post("/api/Common/GetSerialDuplicate", {
          dataList: {
            strFghSerialNo: params,
            strPlantCode: Fac,
          },
        }).then((res) => {
          result = res.data.row_count;
        });
        return result;
      } else if (type == "GetSheetNoBySerialNo") {
        let response = "";
      let response2 = "";
      await axios
        .post("/api/common/GetSheetNoBySerialNo", {
          data:{
            strSerial: params,
            strPlantCode: Fac
          }
          
        })
        .then((res) => {
          console.log(res.data);
          response = res.data._strsheet;
          response2 = res.data.lot_no;
        });
        return { response, response2 };
      } else if (type == "GetPlasmaTimeBySerialNo") {
        let response = 0;
        await axios
          .post("/api/Common/GetPlasmaTimeBySerialNo", {
            dataList: {
              strSerial: params.strSerial,
              strPlantCode: Fac,
              strPacking: params.strPacking,
              strMasterCode: params.strMasterCode,
              strPrdname: params.strPrdname,
            },
          })
          .then((res) => {
            response = res.data.plasma_time;
          });
        return response;
      } else if (type == "GetCheckChipDuplicate") {
        let result = "";
        await axios
          .post("/api/Common/GetCheckChipDuplicate", {
            dataList: {
              _strPlantCode: Fac,
              _strSerial: params.strSerial,
              _strPrdName: params.strPrdName,
            },
          })
          .then((res) => {
            result = res.data;
          });
        return result;
      } else if (type == "Get_SPI_AOI_RESULT_P1") {
        let result1 = "";
        let result2 = "";
        await axios
        .post("/api/common/get_spi_aoi_result_p1", 
          {
            strSerialNo:params.strSerialNo,
            strPlantCode:Fac,
            strPreAOIF:params.strPreAOIF,
            strPreAOIB:params.strPreAOIB,
            strAOIF:params.strAOIF,
            strAOIB:params.strAOIB,
            strSPIF:params.strSPIF,
            strSPIB:params.strSPIB,
          }).then((res) => {
            result1 = res.data[0].result_v;
            result2 = res.data[0]._message;
          });
          console.log(result1, result2, "Get_SPI_AOI_RESULT_P1");
          return { result1, result2 };
      } else if (type == "getProductSerialMaster") {
        await axios
          .post("/api/Common/GetSerialProductByProduct", {
            prdName: params,
          })
          .then((res) => {
            setSerialMaster(res.data);
          });
      }  else if (type == "SetSerialLotTrayTable") {
        let result = "";
        await axios
          .post("/api/Common/setseriallottraytable", {
            dataList: {
              strPlantCode: params.strPlantCode,
              strPrdName: params.strPrdName,
              strLot: params.strLot,
              strUserID: params.strHfUserId,
              data: [
                {
                  SERIAL: params.strSerial,
                  UPDATE_FLG: params.strUpdateFlg,
                  ROW_UPDATE: params.strRowUpdate,
                  REJECT_CODE: params.strRejectCode,
                  TEST_RESULT: params.strTestResult,
                  REMARK_UPDATE: params.strRemarkUpdate,
                  SCAN_RESULT: params.strScanResult,
                  PACKING_NO: "",
                  MASTER_NO: "",
                },
              ],
            },
          })
          .then((res) => {
            result = res.data.p_error;
          })
          .catch((error) => {
            setlblError(error.message);
          });
        return result;
      }
    } catch (error) {
      console.error(error);
    }
  }
  async function setSerialMaster(data) {
    if (data != "") {
      (hiddenParams.hfSerialLength = data[0].slm_serial_length),
        (hiddenParams.hfSerialFixFlag = data[0].slm_fix_flag),
        (hiddenParams.hfSerialDigit = data[0].slm_fix_digit),
        (hiddenParams.hfSerialStartDigit = data[0].slm_fix_start_digit),
        (hiddenParams.hfSerialEndDigit = data[0].slm_fix_end_digit),
        (hiddenParams.hfTrayFlag = data[0].slm_tray_flag),
        (hiddenParams.hfTrayLength = data[0].slm_tray_length),
        
        (hiddenParams.hfTestResultFlag = data[0].slm_test_result_flag),
        // (hiddenParams.hfSerialCount = data[0].slm_serial_count), // เปลี่ยนกลับ
        (hiddenParams.hfSerialCount = 3),
        (hiddenParams.hfAutoScan = data[0].slm_auto_scan),
        (hiddenParams.hfConfigCheck = data[0].prm_barcode_req_config),
        (hiddenParams.hfConfigCode = data[0].prm_config_code),
        (hiddenParams.hfConfigStart = data[0].prm_start_config),
        (hiddenParams.hfConfigEnd = data[0].prm_end_config),
        (hiddenParams.hfConfigRuning = data[0].prm_running_req_config),
        (hiddenParams.hfDuplicateStart = data[0].prm_duplicate_start),
        (hiddenParams.hfDuplicateEnd = data[0].prm_duplicate_end),
        (hiddenParams.hfChipIDCheck = data[0].prm_check_chip_id_flg),
        (hiddenParams.hfCheckPrdSht = data[0].prm_req_check_prd_sht),
        (hiddenParams.hfCheckPrdShtStart = data[0].prm_check_prd_sht_start),
        (hiddenParams.hfCheckPrdShtEnd = data[0].prm_check_prd_sht_end),
        (hiddenParams.hfCheckPrdAbbr = data[0].prm_abbr),
        (hiddenParams.hfPlasmaCheck = data[0].prm_plasma_time_flg),
        (hiddenParams.hfPlasmaTime = data[0].prm_plasma_time),
        (hiddenParams.hfCheckStartSeq = data[0].prm_req_start_seq_flg),
        (hiddenParams.hfCheckStartSeqCode = data[0].prm_start_seq_code),
        (hiddenParams.hfCheckStartSeqStart = data[0].prm_start_seq_start),
        (hiddenParams.hfCheckStartSeqEnd = data[0].prm_start_seq_end),
        (hiddenParams.hfCheckSPIAOI = data[0].prm_final_aoi_spi_flg),
        (hiddenParams.hfCheckDateInProc = data[0].prm_date_inproc_flg),
        (hiddenParams.hfDateInProc = data[0].prm_date_inproc),
        (hiddenParams.hfWeekCodeType = data[0].prm_date_type),
        (hiddenParams.hfCheckWeekCode = data[0].prm_check_weekcode_flg),
        (hiddenParams.hfCheckWeekCodeStart = data[0].prm_check_weekcode_start),
        (hiddenParams.hfCheckWeekCodeEnd = data[0].prm_check_weekcode_end),
        (hiddenParams.hfCheckPreAOIF = data[0].prm_sht_pre_aoi_f),
        (hiddenParams.hfCheckPreAOIB = data[0].prm_sht_pre_aoi_b),
        (hiddenParams.hfCheckAOIF = data[0].prm_sht_aoi_f),
        (hiddenParams.hfCheckAOIB = data[0].prm_sht_aoi_b),
        (hiddenParams.hfCheckAOICoatF = data[0].prm_sht_aoi_coat_f),
        (hiddenParams.hfCheckAOICoatB = data[0].prm_sht_aoi_coat_b),
        (hiddenParams.hfCheckSPIF = data[0].prm_sht_spi_f),
        (hiddenParams.hfCheckSPIB = data[0].prm_sht_spi_b),
        (hiddenParams.hfSerialStartCode = data[0].prm_serial_start_code),
        (hiddenParams.hfSerialInfo = data[0].prm_additional_info);
    }
  }
  function Setdisable(type, txtField) {
    if (type == "disable") {
      document.getElementById(`${txtField}`).disabled = true;
      document.getElementById(`${txtField}`).className = "styleDisable";
    } else {
      document.getElementById(`${txtField}`).disabled = false;
      document.getElementById(`${txtField}`).className = "styleEnable";
    }
  }
  function SetFocus(txtField) {
    document.getElementById(`${txtField}`).focus();
  }
  function getInitialSerial() {
    let dtData = [];
    for (
      let intRow = 1;
      intRow <= parseInt(hiddenParams.hfSerialCount);
      intRow++
    ) {
      dtData.push({
        SEQ: intRow,
      });
    }
    setGvSerial(dtData);
    setpanalSerialState(true);
  }
  async function getInputSerial() {
    let dtData = [];
    for (let i = 0; i < gvSerial.length; i++) {
      let row = {
        SEQ: i,
        SERIAL: txtSerial[i],
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
        PACKING_NO: "",
        MASTER_NO: "",
        FRONT_SHEET_NO: "",
        BACK_SHEET_NO: "",
        SHEET_PCS_NO: 0,
        ROLL_LEAF_NO: "",
      };
      if (row.SERIAL == undefined || row.SERIAL == null) {
        row.SERIAL = "";
      }
      if (txtSerial[i] !== "") {
        for (let j = 0; j < dtData.length; j++) {
          if (row.SERIAL === dtData[j].SERIAL) {
            row.ROW_COUNT = 9;
            break;
          }
        }
      }
      dtData.push(row);
    }
    return dtData;
  }
  const handletxtSerialChange = (index, event) => {
    const newValues = [...txtSerial];
    newValues[index] = event.target.value;
    setTxtSerial(newValues);

    if (event.key === "Enter") {
      try {
        SetFocus(`txtSerial_${index + 1}`);
      } catch (error) {
        btnSvae_Click();
      }
    }
  };
  async function setSerialDataTray() {
    setlblSerialNG(0);
    showLoading('กำลังบันทึก กรุณารอสักครู่');
    let dtSerial = await getInputSerial();
    await getData("getProductSerialMaster", productSelected);
    let _strLot = lblLot;
    let _strPrdName = productSelected;
    let _strTray = "";
    let _bolTrayError = false;
    let _bolError = false;
    let _strScanResultAll = "OK";
    let _intRowSerial = 0;
    if(!_bolTrayError){
      let dtResponse = await getData("GetSerialTestResultManyTable", {
        dataList: [
          {
            strPlantCode: Fac,
            strPrdname: _strPrdName,
            strWeekCodeType: hiddenParams.hfWeekCodeType,
          },
        ],
        dtSerial: dtSerial,
      })
      dtSerial = await dtResponse.length ? [...dtResponse] : [];

      console.log(dtResponse, "dtSerial");
      if (hiddenParams.hfWeekCodeType == "Y") {
        hiddenParams.hfWeekCode = await getData("GetWeekCodebyLot", {
          strLot: _strLot,
          hfDateInProc: hiddenParams.hfDateInProc,
          hfWeekCodeType: hiddenParams.hfWeekCodeType,
          hfSerialInfo: hiddenParams.hfSerialInfo,
        });
      }
      for (let i = 0; i < dtSerial.length; i++) {
        if (dtSerial[i].SERIAL != "") {
          let _intCount = 0;
          let _intCountOK = 0;
          let _intCountNG = 0;
          let _intCountDup = 0;
          let _strRemark = "";
          let _strError = "";
          let _strSerial = dtSerial[i].SERIAL;
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
          _bolError = false;

          let _strTestResult = "NO";
          if (hiddenParams.hfTestResultFlag == "Y") {
            _strTestResult = dtSerial[i].TEST_RESULT;
            _strTypeTestResult = dtSerial[i].TYPE_TEST_RESULT;
            _strReject1 = dtSerial[i].REJECT;
            _strRejectUpdate = dtSerial[i].REJECT_CODE;
            _strReject2 = dtSerial[i].REJECT2;
            _strTouchUp = dtSerial[i].TOUCH_UP;
          }
          if (DUPLICATE_CHECK_FLG == "1") {
            if (dtSerial[i].ROW_COUNT == 0) {
              _intCountDup = await getData("GetSerialDuplicate", dtSerial[i].SERIAL);
              dtSerial[i].ROW_COUNT = _intCountDup;
            }else{
              _intCountDup = dtSerial[i].ROW_COUNT;
            }
          }
          if(_strSerial.length == parseInt(hiddenParams.hfSerialLength)){
            let _strFixDigit = "";
            let GetCheckSumSerial;
            await axios
            .post("/api/Common/GetCheckSumSerial", {
              _str_Serial: _strSerial,
              _str_DateType: hiddenParams.hfWeekCodeType,
              _intEngRevEndDigit: parseInt(hiddenParams.hfSerialEndDigit),
            })
            .then((res) => {
              GetCheckSumSerial = res.data;
            });
            if (!GetCheckSumSerial) {
              _strMessageUpdate = "Serial invalid check sum" + _strTagNewLine + "หมายเลขบาร์โค้ดมีค่าตรวจสอบไม่ถูกค้อง";
              _strRemark = "Serial barcode mix product";
              _strScanResultUpdate = "NG";
              _strTestResultUpdate = _strTestResult;
              dtSerial[i].REMARK_UPDATE = _strRemark;
              dtSerial[i].ROW_UPDATE = "Y";
              _intCountNG = 1;
              _bolError = true;
            }
            if(hiddenParams.hfSerialFixFlag == 'Y' && _strScanResultUpdate !== 'NG'){
              _strFixDigit = _strSerial.substring(parseInt(hiddenParams.hfSerialStartDigit) - 1, parseInt(hiddenParams.hfSerialEndDigit));
              if(_strFixDigit !== hiddenParams.hfSerialDigit){
                _strMessageUpdate = "Serial barcode mix product" + _strTagNewLine + "หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
                _strRemark = "Serial barcode mix product";
                _strScanResultUpdate = "NG";
                _strTestResultUpdate = _strTestResult;
                dtSerial[i].REMARK_UPDATE = _strRemark;
                dtSerial[i].ROW_UPDATE = "Y";
                _intCountNG = 1;
                _bolError = true;
              }
              if(hiddenParams.hfConfigCheck == 'Y' && _strScanResultUpdate !== 'NG' ){
                let _strConfigDigit ='';
                _strConfigDigit = _strSerial.substring(parseInt(hiddenParams.hfConfigStart) - 1, parseInt(hiddenParams.hfConfigEnd));
                if (_strConfigDigit !== hiddenParams.hfConfigCode){
                  _strMessageUpdate = "Serial barcode mix product" + _strTagNewLine + "หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
                  _strRemark = "Serial barcode mix product";
                  _strScanResultUpdate = "NG";
                  _strTestResultUpdate = _strTestResult;
                  dtSerial[i].REMARK_UPDATE = _strRemark;
                  dtSerial[i].ROW_UPDATE = "Y";
                  _intCountNG = 1;
                  _bolError = true;
                }
              }
            }
            if(hiddenParams.hfSerialStartCode !== '' && _strScanResultUpdate !== 'NG'){
              if (_strSerial.substring(0, hiddenParams.hfSerialStartCode.length) !== hiddenParams.hfSerialStartCode) {
                _strMessageUpdate = "Serial barcode mix product" + _strTagNewLine + "หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
                _strRemark = "Serial barcode mix product";
                _strScanResultUpdate = "NG";
                _strTestResultUpdate = _strTestResult;
                dtSerial[i].REMARK_UPDATE = _strRemark;
                dtSerial[i].ROW_UPDATE = "Y";
                _intCountNG = 1;
                _bolError = true;
              }
            }
            if(hiddenParams.hfCheckStartSeq == 'Y' && _strScanResultUpdate !== 'NG'){
              let _strStartSeq = '';
              _strStartSeq = _strSerial.substring(parseInt(hiddenParams.hfCheckStartSeqStart) - 1, parseInt(hiddenParams.hfCheckStartSeqEnd));
              if (_strStartSeq !== hiddenParams.hfCheckStartSeqCode){
                _strMessageUpdate = "Serial barcode mix product" + _strTagNewLine + "หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
                _strRemark = "Serial barcode mix product";
                _strScanResultUpdate = "NG";
                _strTestResultUpdate = _strTestResult;
                dtSerial[i].REMARK_UPDATE = _strRemark;
                dtSerial[i].ROW_UPDATE = "Y";
                _intCountNG = 1;
                _bolError = true;
              }            
            }
            if(hiddenParams.hfCheckWeekCode =='Y' &&_strScanResultUpdate !== 'NG' ){
              let _strWeekCode = '';
              _strWeekCode = _strSerial.substring(parseInt(hiddenParams.hfCheckWeekCodeStart) - 1, parseInt(hiddenParams.hfCheckWeekCodeEnd));
              if (_strWeekCode !== hiddenParams.hfWeekCode){
                _strMessageUpdate = "Serial barcode mix week code" + _strTagNewLine + "หมายเลขบาร์โค้ดปนรหัสสัปดาห์กัน";
                _strRemark = "Serial barcode mix week code";
                _strScanResultUpdate = "NG";
                _strTestResultUpdate = _strTestResult;
                dtSerial[i].REMARK_UPDATE = _strRemark;
                dtSerial[i].ROW_UPDATE = "Y";
                _intCountNG = 1;
                _bolError = true;
              }
            }
            if(!_bolError){
              // for(let _intRow = _intRowSerial+1; _intRow < dtSerial.length; _intRow++){
              //   if(_strSerial == dtSerial[_intRow].SERIAL){
              //     _strMessageUpdate = "Serial duplicate in tray" + _strTagNewLine + "หมายเลขบาร์โค้ดซ้ำในถาดเดียวกัน";
              //     _strRemark = "Serial duplicate in tray  ";
              //     _strScanResultUpdate = "NG";
              //     _strTestResultUpdate = _strTestResult;
              //     dtSerial[_intRow].REMARK_UPDATE = _strRemark; 
              //     dtSerial[_intRow].ROW_UPDATE = "N";
              //     _intCountNG = 1;
              //     _bolError = true;
              //   }
              // }
              let isDuplicate = dtSerial.some((item, index) => {
                _intCountNG = 1;
                console.log(`Checking duplicate ${index+1}: ${item.SERIAL} -----  ${_strSerial}`);
                return (
                  index !== _intRowSerial &&
                  _strSerial ===
                    item.SERIAL
                );
              });
              if (isDuplicate) {
                _strMessageUpdate =
                  "Serial duplicate in tray / หมายเลขบาร์โค้ดซ้ำในถาดเดียวกัน";
                _strRemark = "Serial duplicate in tray  ";
                _strScanResultUpdate = "NG";
                _strTestResultUpdate = _strTestResult;
                dtSerial[i].REMARK_UPDATE = _strRemark;
                dtSerial[i].ROW_UPDATE = "N";
                _intCountNG = 1;
                _bolError = true;
              }
            }
            if (!_bolError && hiddenParams.hfCheckPrdSht == 'Y'){
              const { response: _strShtNo, response2: strSheetLot } = await getData(
                "GetSheetNoBySerialNo",_strSerial
              );
              if (_strShtNo !== "" && hiddenParams.hfCheckPrdAbbr !== _strShtNo.substring(parseInt(hiddenParams.hfCheckPrdShtStart) - 1, parseInt(hiddenParams.hfCheckPrdShtEnd))){
                _strMessageUpdate = "Change serial barcode mix product" + _strTagNewLine + "เปลี่ยนหมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
                _strRemark = "Change serial barcode mix product  ";
                _strScanResultUpdate = "NG";
                _strTestResultUpdate = _strTestResult;
                dtSerial[i].REMARK_UPDATE = _strRemark;
                dtSerial[i].ROW_UPDATE = "Y";
                _intCountNG = 1;
                _bolError = true;
              }else if(_strShtNo == ''){
                _strMessageUpdate = "No data connect sheet" + _strTagNewLine + "ไม่มีข้อมูลแสกนประกบกับหมายเลขชีส";
                _strRemark = "No data connect sheet  ";
                _strScanResultUpdate = "NG";
                _strTestResultUpdate = _strTestResult;
                dtSerial[i].REMARK_UPDATE = _strRemark;
                dtSerial[i].ROW_UPDATE = "Y";
                _intCountNG = 1;
                _bolError = true;
              // }else if(!hiddenParams.hfLotAll.includes(strSheetLot)){
              }else if (hiddenParams.hfLotAll.indexOf(strSheetLot) >= 0) {
                _strMessageUpdate = "Lot not same connect sheet" + _strTagNewLine + "ล๊อตไม่ตรงตามที่แสกนประกบกับหมายเลขชีส";
                _strRemark = "Lot not same connect sheet  ";
                _strScanResultUpdate = "NG";
                _strTestResultUpdate = _strTestResult;       
                dtSerial[i].REMARK_UPDATE = _strRemark;
                dtSerial[i].ROW_UPDATE = "Y";
                _intCountNG = 1;
                _bolError = true;
              }
            }
            if(!_bolError && (hiddenParams.hfPlasmaCheck == 'Y')){
            let _dblPlasmaTime ;
              _dblPlasmaTime = await getData("GetPlasmaTimeBySerialNo", {
                strSerial: _strSerial,
                strPacking : dtSerial[i].PACKING_NO,
                strMasterCode : dtSerial[i].MASTER_NO,
                strPrdname : _strPrdName,
              });
              if (_dblPlasmaTime <= 0){
                _strMessageUpdate = "Plasma time do not record" + _strTagNewLine + "ไม่พบข้อมูลการแสกนก่อนเข้าพลาสม่า";
                _strRemark = "Plasma time do not record";
                _strScanResultUpdate = "NG";
                _strTestResultUpdate = _strTestResult;
                dtSerial[i].REMARK_UPDATE = _strRemark;
                dtSerial[i].ROW_UPDATE = "Y";
                _intCountNG = 1;
                _bolError = true;
              }else if(parseFloat(hiddenParams.hfPlasmaTime) < parseInt(_dblPlasmaTime)){
                console.log(parseInt(hiddenParams.hfPlasmaTime),':::::12345:::' ,parseInt(_dblPlasmaTime));
                _strMessageUpdate = "Plasma time over " + hiddenParams.hfPlasmaTime + " hr." + _strTagNewLine + "เวลาพลาสม่าเกิน " + hiddenParams.hfPlasmaTime + " ชม.";
                _strRemark = "Plasma time over " + hiddenParams.hfPlasmaTime + " hr.";
                _strScanResultUpdate = "NG";
                _strTestResultUpdate = _strTestResult;
                dtSerial[i].REMARK_UPDATE = _strRemark;
                dtSerial[i].ROW_UPDATE = "Y";
                _intCountNG = 1;
                _bolError = true;
              }
            }
            if(!_bolError && hiddenParams.hfCheckSPIAOI == 'Y'){
              // let _Result = '';
              // let _strMessage = '';

              const { result1: _Result, result2: _strMessage } = await getData("Get_SPI_AOI_RESULT_P1", {
                strSerialNo: _strSerial,
                strPlantCode: Fac,
                strPreAOIF: hiddenParams.hfCheckPreAOIF,
                strPreAOIB: hiddenParams.hfCheckPreAOIB,
                strAOIF: hiddenParams.hfCheckAOIF,
                strAOIB: hiddenParams.hfCheckAOIB,
                strSPIF: hiddenParams.hfCheckSPIF,
                strSPIB: hiddenParams.hfCheckSPIB,
              });
              console.log(_Result,'_Result',_strMessage,'_strMessage');
              if(_Result == 'NG'){
                _strScanResultUpdate = _Result;
                _strMessageUpdate = _strMessage;
                _strRemark = _strMessage;
                _strScanResultUpdate = "NG";
                _strTestResultUpdate = _strTestResult;
                dtSerial[i].REMARK_UPDATE = _strRemark;
                dtSerial[i].ROW_UPDATE = "Y";
                _intCountNG = 1;
                _bolError = true;             
              }
            }
            if(!_bolError){
              console.log(hiddenParams.hfTestResultFlag,'HfResultflg',);
              if(hiddenParams.hfTestResultFlag == 'Y'){
                if(_strTouchUp == 'NG'){
                  if(_strTestResult == 'NG'){
                    _strMessageUpdate = "Touch up result was fail " + _strTagNewLine + "ผล Touch up ชิ้นงานแสดงไม่ผ่าน";
                  }else{
                    _strMessageUpdate = "Touch up result was fail " + _strTypeTestResult + _strTagNewLine + "ผล Touch up ชิ้นงานแสดงไม่ผ่าน " + _strTypeTestResult;
                  }
                  _strRemark = "Touch up result was fail" + _strTypeTestResult;
                  _strScanResultUpdate = "NG";
                  _strTestResultUpdate = _strTestResult;       
                  dtSerial[i].REMARK_UPDATE = _strRemark;
                  dtSerial[i].ROW_UPDATE = "Y";
                  _bolError = true;               
                }else if (_strTouchUp == 'NO'){
                  if(_strTestResult == 'OK'){
                    _strMessageUpdate = "Not found touch up result " + _strTagNewLine + "ไม่พบผล Touch up ชิ้นงาน";
                  }else{
                    _strMessageUpdate = "Not found touch up result " + _strTypeTestResult + _strTagNewLine + "ไม่พบผล Touch up ชิ้นงาน " + _strTypeTestResult;
                  }
                  _strRemark = "Not found touch up result";
                  _strScanResultUpdate = "NG";
                  _strTestResultUpdate = _strTestResult;
                  dtSerial[i].REMARK_UPDATE = _strRemark;
                  dtSerial[i].ROW_UPDATE = "Y";
                  _bolError = true;               
                }else if(_strTestResult == 'OK'){
                  if(_intCountDup == 0){
                    _strScanResultUpdate = "OK";
                    _strTestResultUpdate = _strTestResult;
                    dtSerial[i].REMARK_UPDATE = _strRemark;
                    dtSerial[i].ROW_UPDATE = "Y";                 
                  }else{
                    _strMessageUpdate = "Duplicate scan serial " + _strTypeTestResult + _strTagNewLine + "แสกนบาร์โค้ดของชิ้นงานซ้ำ" + _strTypeTestResult;
                    _strRemark = "Duplicate scan serial " + _strTypeTestResult;
                    _strScanResultUpdate = "NG";
                    _strTestResultUpdate = _strTestResult;
                    dtSerial[i].REMARK_UPDATE = _strRemark;
                    dtSerial[i].ROW_UPDATE = "Y";
                    _bolError = true;               
                  }
                }else if (_strTestResult == 'NG'){
                  _strMessageUpdate = "Test result was fail " + _strTypeTestResult + _strTagNewLine + "ผลทดสอบชิ้นงานแสดงไม่ผ่าน " + _strTypeTestResult;
                  _strRemark = "Test result was fail" + _strTypeTestResult;
                  _strScanResultUpdate = "NG";
                  _strTestResultUpdate = _strTestResult;       
                  dtSerial[i].REMARK_UPDATE = _strRemark;
                  dtSerial[i].ROW_UPDATE = "Y";
                  _bolError = true;      
                }else{
                  _strMessageUpdate = "Not found test result " + _strTypeTestResult + _strTagNewLine + "ไม่พบผลทดสอบชิ้นงาน " + _strTypeTestResult;
                  _strRemark = "Not found test result " + _strTypeTestResult;
                  _strScanResultUpdate = "NG";
                  _strTestResultUpdate = _strTestResult;       
                  dtSerial[i].REMARK_UPDATE = _strRemark;
                  dtSerial[i].ROW_UPDATE = "Y";
                  _bolError = true;       
                }
              }else{
                if(_intCountDup == 0){
                  _strScanResultUpdate = "OK";
                  _strTestResultUpdate = "OK";     
                  dtSerial[i].REMARK_UPDATE = _strRemark;
                  dtSerial[i].ROW_UPDATE = "Y";
                }else{
                  _strMessageUpdate = "Duplicate scan serial " + _strTypeTestResult + _strTagNewLine + "แสกนบาร์โค้ดของชิ้นงานซ้ำ" + _strTypeTestResult;
                  _strRemark = "Duplicate scan serial " + _strTypeTestResult;
                  _strScanResultUpdate = "NG";
                  _strTestResultUpdate = _strTestResult;              
                  dtSerial[i].REMARK_UPDATE = _strRemark;
                  dtSerial[i].ROW_UPDATE = "Y";
                  _bolError = true;
                }
              }
            }
            if(hiddenParams.hfChipIDCheck == 'Y' && _bolError == false){
              let _intCheckPass = await getData("GetCheckChipDuplicate", {strSerial:_strSerial,strPrdName:productSelected});
              if(parseInt(_intCheckPass) == 0){
                _strMessageUpdate = FINAL_GATE_SPECIAL_MESSAGE;
                _strRemark = FINAL_GATE_SPECIAL_MESSAGE;
                _strScanResultUpdate = "NG";
                _strTestResultUpdate = _strTestResult;   
                dtSerial[i].REMARK_UPDATE = _strRemark;
                dtSerial[i].ROW_UPDATE = "Y";
                _intCountNG = 1;
                _bolError = true;       
              }
            }
          }else{
            _strMessageUpdate = "Serial not matching product" + _strTagNewLine + "หมายเลขบาร์โค้ดไม่ตรงตามที่กำหนดไว้";
            _strRemark = "Serial barcode not matching product";
            _strScanResultUpdate = "NG";
            _strTestResultUpdate = _strTestResult;       
            dtSerial[i].REMARK_UPDATE = _strRemark;
            dtSerial[i].ROW_UPDATE = "Y";
            _bolError = true; 
          }
          dtSerial[i].REJECT = _strReject1;
          dtSerial[i].REJECT2 = _strReject2;
          dtSerial[i].TOUCH_UP = _strTouchUp;
          dtSerial[i].SCAN_RESULT = _strScanResultUpdate;
          dtSerial[i].TEST_RESULT = _strTestResultUpdate;
          dtSerial[i].REMARK =_strMessageUpdate;

          if(_strScanResultUpdate == 'NG'){
            _strScanResultAll = 'NG';
          }
          if(_bolError){
              setlblSerialNG((prevValue) => {
                const numericValue = parseInt(prevValue, 10);
                if (isNaN(numericValue)) {
                  return 1;
                } else {
                  return numericValue + 1;
                }
              });
          }
        }
        _intRowSerial = _intRowSerial + 1
      }
      if (_strScanResultAll == "NG") {
        setLblResult({
          value: _strScanResultAll,
          styled: { color: "white" },
        });
      }else {
        setLblResult({
          value: 'OK',
          styled: { color: "white" },
        });
      }
      let _strErrorUpdate = '';
      for (let insertDt = 0; insertDt < dtSerial.length; insertDt++) {
        if (
          dtSerial[insertDt].SERIAL != "" ||
          dtSerial[insertDt].SERIAL != null
        ) {
          console.log("insertDt");
          _strErrorUpdate = await getData("SetSerialLotTrayTable", {
            strPlantCode: Fac,
            strPrdName: _strPrdName,
            strLot: _strLot,
            strHfUserId: hfUserID,
            strSerial: dtSerial[insertDt].SERIAL,
            strUpdateFlg: dtSerial[insertDt].UPDATE_FLG,
            strRowUpdate: dtSerial[insertDt].ROW_UPDATE,
            strRejectCode: dtSerial[insertDt].REJECT_CODE,
            strTestResult: dtSerial[insertDt].TEST_RESULT,
            strRemarkUpdate: dtSerial[insertDt].REMARK_UPDATE,
            strScanResult: dtSerial[insertDt].SCAN_RESULT,
          });

          if (_strErrorUpdate != "") {
            if (
              _strErrorUpdate ==
              'duplicate key value violates unique constraint "pk_final_gate_header"'
            ) {
              dtSerial[insertDt].REMARK = "duplicate serial";
            }
            setlblError(`Error : ${_strErrorUpdate}`);
          }
        }
      }
      if (_strErrorUpdate != "") {
        setlblError(`Error : ${_strErrorUpdate}`);
        setlblErrorState(true);
      }
    }
    if(!_bolTrayError){
      for(let i = 0; i < dtSerial.length; i++){
        dtSerial[i].SEQ = i + 1;
      }
      setGvSerialResult(dtSerial);
      setlblResultState(true);
      setHideImg(false);
      // if(hiddenParams.hfExportCSV == 'Y'){

      // }
    }else{
      setGvSerialResult([]);
    }
    let dtLotPassCount = await getData("GetSerialPassByLot", _strLot);
    if(dtLotPassCount != ''){
      setlblLotTotal(dtLotPassCount);
    }
    btnCancel_Click();
    hideLoading();
    scrollToTop();
  }
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  function SetMode(type) {
    if (type == "LOT") {
      setScanLot("");
      Setdisable("enable", "P1FGScanLot");

      setlblLot("");
      setlblLotTotal("");
      setlblSerialNG("");
      setpanalSerialState(false);
      setGvSerial([]);
      SetFocus("P1FGScanLot");
    } else if (type == "LOT_ERROR") {
      setScanLot("");
      Setdisable("enable", "P1FGScanLot");
      setlblLot("");
      setlblLotTotal("");
      setlblSerialNG(0);
      setpanalSerialState(false);
      setlblErrorState(true);
      hfMode = "LOT";
      SetFocus("P1FGScanLot");
    } else if (type == "TRAY") {
      Setdisable("disable", "P1FGScanLot");
      setlblSerialNG(0);
      setpanalSerialState(true);
      getInitialSerial();
      hfMode = "TRAY";
      // SetFocus('txtTray');//ไม่มี
    } else if (type == "TRAY_ERROR") {
      Setdisable("disable", "P1FGScanLot");
      setlblSerialNG(0);
      setpanalSerialState(false);
      setlblErrorState(true);
      getInitialSerial();
      hfMode = "TRAY";
      // SetFocus('txtTray');//ไม่มี
    } else if (type == "SERIAL") {
      setddlProductState(true);
      Setdisable("disable", "P1FGScanLot");
      setlblErrorState(false);
      setpanalSerialState(true);
      hfMode = "SERIAL";
      getInitialSerial();
    } else if (type == "SERIAL_ERROR") {
      Setdisable("disable", "P1FGScanLot");
      setlblErrorState(true);
    } else if (type == "SERIAL_OK") {
      Setdisable("disable", "P1FGScanLot");
      setlblErrorState(false);
      setpanalSerialState(true);
      getInitialSerial();
      SetFocus("txtSerial");
    } else if (type == "SERIAL_NG") {
      Setdisable("disable", "P1FGScanLot");
      setlblErrorState(false);
    }
  }
  return {
    scanLot,
    setScanLot,
    ddlproduct,
    setddlproduct,
    productSelected,
    setProductSelected,
    lblLot,
    setlblLot,
    lblLotTotal,
    setlblLotTotal,
    lblSerialNG,
    setlblSerialNG,
    lblError,
    setlblError,
    lblErrorState,
    panalSerialState,
    hideImg,
    lblResultState,
    lblResult,
    columns,
    gvSerialResult,
    gvSerial,
    txtSerial,
    setTxtSerial,
    ddlproduct_Change,
    ddlProductState,
    ibtBack_Click,
    textScanLotChange,
    btnCancel_Click,
    btnSvae_Click,
    handletxtSerialChange,
    setSerialDataTray,
    getRowClassName
  };
}

export { fn_ScanSMTSerialPcsP1 };
