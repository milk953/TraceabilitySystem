import axios from "axios";
import React, { useEffect, useState } from "react";
import { Tag } from "antd";
function fn_ScanSerialNo() {
  const hiddenParams = {
    hfSerialLength: "0",
    hfSerialFixFlag: "N",
    hfSerialDigit: "",
    hfSerialStartDigit: "0",
    hfSerialEndDigit: "0",
    hfTrayFlag: "",
    hfTrayLength: "0",
    hfTestResultFlag: "",
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
    hfMode: "",
    hfTotalPcs: "1",
  };
  const _strTagNewLine ='/';
  const Fac = import.meta.env.VITE_FAC;
  const [operator, setOperator] = useState("");
  const [pcs, setPcs] = useState("");
  const [lotNo, setLotNo] = useState("");
  const [magazine, setMagazine] = useState("");
  const [product, setProduct] = useState("product");
  const [total, setTotal] = useState("Total");
  const [gvSerialState, setGvSerialState] = useState(false);
  const [hideImg, setHideImg] = useState(true);
  const [lblResultState, setLblResultState] = useState(false);
  const [ip, setIp] = useState("");
  const [userStation, setUserStation] = useState("");
  //btnState
  const [btnLotBack, setBtnLotBack] = useState(true);
  const [btnOperatorBack, setBtnOperatorBack] = useState(true);
  const [btnback, setBtnback] = useState(true);
  const [btnMagBack, setBtnMagBack] = useState(true);
  const [gvSerialResult, setGvSerialResult] = useState([]);
  const [gvSerial, setGvSerial] = useState([]);
  const [txtSerial, setTxtSerial] = useState(gvSerial.map(() => ""));

  const [lblResult, setLblResult] = useState({
    value: "",
    styled: {
      color: "",
    },
  });
  //btnHandle
  const handle_Save_Click = () => {
    setSerialDataTray();
  };
  const handle_Cancel_Click = () => {
    setMode("SERIAL");
  };
  const handle_BtnBack_Click = () => {
    setPcs("");
    Setdisable("enable", "txtPCS");
    setGvSerialState(false);
    setMode("PCS");
  };
  const handle_txtPCS_Change = () => {
    if (pcs !== "") {
      hiddenParams.hfSerialCount = parseInt(pcs);
      setMode("LOT");
    } else {
      hiddenParams.hfSerialCount = "0";
      setMode("PCS");
    }
  };
  const handle_txtlotNo_Change = async () => {
    console.log(lotNo, "lotNo");
    if (lotNo !== "") {
      let dtDataLot = [];
      let strLotAll = lotNo.split(";");
      setLotNo(strLotAll[0]);
      if (strLotAll[0].length == 9) {
        dtDataLot = await getData("GetProductDataByLot", strLotAll[0]);
        if (dtDataLot !== "") {
          setProduct(dtDataLot.PRD_NAME);
          await getData("getProductSerialMaster", dtDataLot.PRD_NAME);
          setMode("MAGAZINE");
        } else {
          setMode("LOT");
        }
      }
    } else {
      setMode("LOT");
    }
  };
  const handle_LotBack_Click = () => {
    setMode("LOT");
  };
  const handle_Operator_Change = () => {
    if (operator !== "") {
      setPcs(hiddenParams.hfTotalPcs);
      setMode("LOT");
    }
  };
  const handle_OperatorBack_Click = () => {
    setMode("OP");
  };
  const handle_Magazine_Change = async () => {
    let result = await getData("GetCountSerialByLotMagazine", lotNo);
    hiddenParams.hfSerialCount = parseInt(result);
    setTotal(result);
    setMode("SERIAL");
  };
  const handle_MagazineBack_Click = () => {
    setMode("MAGAZINE");
  };
  //ResultTable
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
      title: "Magazine No.",
      dataIndex: "MAGAZINE",
      key: "MAGAZINE",
      align: "center",
      width: 50,
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
      title: "Scan Result",
      dataIndex: "SCAN_RESULT",
      key: "SCAN_RESULT",
      align: "center",
      width: 50,
      render: (text, record, index) => {
        const backgroundColor =
          record.SCAN_RESULT === "NG"
            ? "#f50"
            : record.SCAN_RESULT === "OK"
            ? "#87d068"
            : "transparent";

        return (
          <Tag
            style={{
              width: 100,
              textAlign: "center",
              padding: "0px 0px 0px 0px",
            }}
            color={backgroundColor}
          >
            {text}
          </Tag>
        );
      },
    },
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
  async function Pageload() {
    setIp(localStorage.getItem("ipAddress"));
    setUserStation(localStorage.getItem("ipAddress"));
    setMode("OP");
    hiddenParams.hfMode = "";
    setPcs(hiddenParams.hfTotalPcs);
  }

  useEffect(() => {
    Pageload();
  }, []);
  async function getData(type, params) {
    if (type == "getProductSerialMaster") {
      await axios
        .post("/api/Common/GetSerialProductByProduct", {
          prdName: params,
        })
        .then((res) => {
          setSerialMaster(res.data);
        });
    } else if (type == "GetProductDataByLot") {
      let dtData = [];
      await axios
        .post("/api/ScanFin/GetProductDataByLot", { strLot: params })
        .then((res) => {
          dtData = res.data;
        })
        .catch((error) => {
          console.error(error);
        });
      return dtData;
    } else if (type == "GetCountSerialByLotMagazine") {
      let result = "";
      await axios
        .post("/api/ScanFin/GetCountSerialByLotMagazine", {
          dataList: {
            strLotno: params,
            strMgzNo: magazine,
            strPlantCode: Fac,
          },
        })
        .then((res) => {
          result = res.data[0].lot_count;
        })
        .catch((error) => {
          console.error(error);
        });
      return result;
    } else if (type == "SetManualSerialNo") {
      let result = "";
      await axios
        .post("/api/ScanFin/SetManualSerialNo", {
          dataList: {
            strSerialNo: params.dtSerial.SERIAL,
            strProduct: magazine,
            strPlantCode: Fac,
            strLotNo: lotNo,
            strStation: userStation,
            strMagaZine: magazine
          },
        })
        .then((res) => {
          result = res.data[0].p_error;
        })
        .catch((error) => {
          console.error(error);
        });
      return result;
    }else if (type == "GetCountSerial") {
      let result = "";
      await axios
        .post("/api/ScanFin/GetCountSerial", {
          dataList: {
            strSerialNo: params,
            strPlantCode: Fac
          },
        })
        .then((res) => {
          result = res.data[0].serial_count;
        })
        .catch((error) => {
          console.error(error);
        });
      return result;
    }
  }
  function setSerialMaster(data) {
    if (data !== "") {
      hiddenParams.hfSerialLength = data[0].slm_serial_length;
      hiddenParams.hfSerialFixFlag = data[0].slm_fix_flag;
      hiddenParams.hfSerialDigit = data[0].slm_fix_digit;
      hiddenParams.hfSerialStartDigit = data[0].slm_fix_start_digit;
      hiddenParams.hfSerialEndDigit = data[0].slm_fix_end_digit;
      hiddenParams.hfTrayFlag = data[0].slm_tray_flag;
      hiddenParams.hfTrayLength = data[0].slm_tray_length;
      hiddenParams.hfTestResultFlag = data[0].slm_test_result_flag;
      hiddenParams.hfSerialCount = data[0].slm_serial_count;
      hiddenParams.hfAutoScan = data[0].slm_auto_scan;
      hiddenParams.hfConfigCheck = data[0].prm_barcode_req_config;
      hiddenParams.hfConfigCode = data[0].prm_config_code;
      hiddenParams.hfConfigStart = data[0].prm_start_config;
      hiddenParams.hfConfigEnd = data[0].prm_end_config;
      hiddenParams.hfConfigRuning = data[0].prm_running_req_config;
      hiddenParams.hfDuplicateStart = data[0].prm_duplicate_start;
      hiddenParams.hfDuplicateEnd = data[0].prm_duplicate_end;
      hiddenParams.hfChipIDCheck = data[0].prm_check_chip_id_flg;
      hiddenParams.hfCheckPrdSht = data[0].prm_req_check_prd_sht;
      hiddenParams.hfCheckPrdShtStart = data[0].prm_check_prd_sht_start;
      hiddenParams.hfCheckPrdShtEnd = data[0].prm_check_prd_sht_end;
      hiddenParams.hfCheckPrdAbbr = data[0].prm_abbr;
      hiddenParams.hfPlasmaCheck = data[0].prm_plasma_time_flg;
      hiddenParams.hfPlasmaTime = data[0].prm_plasma_time;
      hiddenParams.hfCheckStartSeq = data[0].prm_req_start_seq_flg;
      hiddenParams.hfCheckStartSeqCode = data[0].prm_start_seq_code;
      hiddenParams.hfCheckStartSeqStart = data[0].prm_start_seq_start;
      hiddenParams.hfCheckStartSeqEnd = data[0].prm_start_seq_end;
      hiddenParams.hfCheckSPIAOI = data[0].prm_final_aoi_spi_flg;
      hiddenParams.hfCheckDateInProc = data[0].prm_date_inproc_flg;
      hiddenParams.hfDateInProc = data[0].prm_date_inproc;
      hiddenParams.hfWeekCodeType = data[0].prm_date_type;
      hiddenParams.hfCheckWeekCode = data[0].prm_check_weekcode_flg;
      hiddenParams.hfCheckWeekCodeStart = data[0].prm_check_weekcode_start;
      hiddenParams.hfCheckWeekCodeEnd = data[0].prm_check_weekcode_end;
      hiddenParams.hfCheckPreAOIF = data[0].prm_sht_pre_aoi_f;
      hiddenParams.hfCheckPreAOIB = data[0].prm_sht_pre_aoi_b;
      hiddenParams.hfCheckAOIF = data[0].prm_sht_aoi_f;
      hiddenParams.hfCheckAOIB = data[0].prm_sht_aoi_b;
      hiddenParams.hfCheckSPIF = data[0].prm_sht_spi_f;
      hiddenParams.hfCheckSPIB = data[0].prm_sht_spi_b;
    }
  }
  async function getInputSerial() {
    let dtData = [];
    for (let i = 0; i < gvSerial.length; i++) {
      dtData.push({
        SEQ: i + 1,
        SERIAL: txtSerial[i],
        LOT: lotNo,
        MAGAZINE: magazine,
        SCAN_RESULT: "",
        REMARK: "",
        ROW_UPDATE: "N",
      });
    }
    return dtData;
  }
  function getInitialSerial() {
    let dtData = [];
    for (let intRow = 1; intRow <= pcs; intRow++) {
      dtData.push({
        SEQ: intRow,
      });
    }
    setGvSerial(dtData);
    setGvSerialState(true);
  }
  function SetFocus(txtField) {
    document.getElementById(`${txtField}`).focus();
  }
  function setMode(strType) {
    if (strType == "OP") {
      setOperator("");
      Setdisable("enable", "txtOperator");
      setPcs("");
      Setdisable("disable", "txtPCS");
      setLotNo("");
      Setdisable("disable", "txtLotNo");
      setMagazine("");
      Setdisable("disable", "txtMagazine");
      setProduct("");
      setTotal("");
      setBtnLotBack(false);
      setBtnOperatorBack(false);
      setBtnback(false);
      setBtnMagBack(false);
      setGvSerial([]);
      hiddenParams.hfMode = "OP";
      SetFocus("txtOperator");
    } else if (strType == "PCS") {
      setLotNo("");
      Setdisable("disable", "txtLotNo");
      setOperator("");
      Setdisable("disable", "txtOperator");
      setBtnOperatorBack(false);
      setPcs(hiddenParams.hfTotalPcs);
      Setdisable("enable", "txtPCS");
      setMagazine("");
      Setdisable("disable", "txtMagazine");
      setBtnMagBack(false);
      setProduct("");
      setTotal("");
      setBtnback(true);
      setBtnLotBack(true);
      setGvSerialState(false);
      setGvSerial([]);
      hiddenParams.hfMode = "PCS";
      SetFocus("txtPCS");
    } else if (strType == "LOT") {
      Setdisable("disable", "txtOperator");
      setBtnOperatorBack(false);
      Setdisable("disable", "txtPCS");
      setBtnback(false);
      setLotNo("");
      Setdisable("enable", "txtLotNo");
      setBtnLotBack(false);
      setMagazine("");
      Setdisable("disable", "txtMagazine");
      setBtnMagBack(true);
      setProduct("");
      setTotal("");
      setGvSerialState(false);
      setGvSerial([]);
      hiddenParams.hfMode = "LOT";
      SetFocus("txtLotNo");
    } // false ปิด true เปิด
    else if (strType == "MAGAZINE") {
      Setdisable("disable", "txtOperator");
      setBtnOperatorBack(false);
      Setdisable("disable", "txtPCS");
      setBtnback(false);
      Setdisable("disable", "txtLotNo");
      setBtnLotBack(false);
      setMagazine("");
      Setdisable("enable", "txtMagazine");
      setBtnMagBack(false);
      setTotal("");
      setGvSerialState(false);
      setGvSerial([]);
      hiddenParams.hfMode = "MAGAZINE";
      SetFocus("txtMagazine");
    } else if (strType == "SERIAL") {
      Setdisable("disable", "txtMagazine");
      setBtnMagBack(false);
      Setdisable("disable", "txtPCS");
      setGvSerialState(true);
      hiddenParams.hfMode = "SERIAL";
      getInitialSerial();
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
  const handletxtSerialChange = (index, event) => {
    const newValues = [...txtSerial];
    newValues[index] = event.target.value;
    setTxtSerial(newValues);

    if (event.key === "Enter") {
      try {
        SetFocus(`txtSerial_${index + 1}`);
      } catch (error) {
        handle_Save_Click();
      }
    }
    console.log(txtSerial, "txtSerial");
  };
  async function setSerialDataTray() {
    let dtSerial = await getInputSerial();
    await getData("getProductSerialMaster", product);
    let _bolTrayError = false;
    let _bolError = false;
    let _strScanResultAll = "OK";
    let _intRowSerial = 0;

    if (!_bolTrayError) {
      for (let i = 0; i < dtSerial.length; i++) {
        if (dtSerial[i].SERIAL !== "") {
          let _intCount = 0;
          let _strRemark = "";
          let _strError = "";
          let _strSerial = dtSerial[i].SERIAL;
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

          _bolError = false;
          if (!_bolError) {
            for (let j = _intRowSerial; j < dtSerial; j++) {
              if (_strSerial == dtSerial[j].SERIAL) {
                _intCount = _intCount + 1;
                dtSerial[i].SCAN_RESULT = "NG";
                dtSerial[i].REMARK = "Serial duplicate in tray" + _strTagNewLine +"หมายเลขบาร์โค้ดซ้ำในถาดเดียวกัน";
                dtSerial[i].ROW_UPDATE = "N";
                _bolError = true;
              }
            }
          }
          //ต่อ
          console.log(hiddenParams.hfSerialLength, "hiddenParams.hfSerialLength",_strSerial.length,"_strSerial.length");
          if(_strSerial.length == parseInt(hiddenParams.hfSerialLength)){
            console.log('in')
            let _intSerialCount = await getData("GetCountSerial", _strSerial)
            if (_intSerialCount > 0){
              _strScanResultAll = "NG"
              dtSerial[i].SCAN_RESULT = "NG";
              dtSerial[i].REMARK = "Serial no. duplicate " + _strTagNewLine +"หมายเลขบาร์โค้ดซ้ำกัน";
              dtSerial[i].ROW_UPDATE = "N";
              _bolError = true;
            }
            let _strFixDigit = '';
            if (hiddenParams.hfSerialFixFlag == "Y" && _strScanResultAll !== 'NG'){
               _strFixDigit = _strSerial.substring(parseInt(hiddenParams.hfSerialStartDigit), parseInt(hiddenParams.hfSerialEndDigit) + 1);
               if(_strFixDigit !== hiddenParams.hfSerialDigit){
                _strScanResultAll = "NG"
                dtSerial[i].SCAN_RESULT = "NG";
                dtSerial[i].REMARK = "Serial barcode mix product" + _strTagNewLine +"หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
                dtSerial[i].ROW_UPDATE = "Y";
                _bolError = true;
               }
               if (hiddenParams.hfConfigCheck == 'Y' && _strScanResultAll !== 'NG'){
                console.log('_strConfigDigit')
                let _strConfigDigit = '';
                _strConfigDigit = _strSerial.substring(parseInt(hiddenParams.hfConfigStart), parseInt(hiddenParams.hfConfigEnd) + 1);
                if(_strConfigDigit !== hiddenParams.hfConfigCode){
                  _strScanResultAll = "NG"
                  dtSerial[i].REMARK = "Serial barcode mix product" + _strTagNewLine +"หมายเลขบาร์โค้ดซ้ำในถาดเดียวกัน";
                  dtSerial[i].SCAN_RESULT = "NG";
                  dtSerial[i].ROW_UPDATE = "Y";
                  _bolError = true;
                }
               }
            }
            if(hiddenParams.hfCheckStartSeq == 'Y' && _strScanResultAll !== 'NG'){
              let _strStartSeq = '';
              console.log('hfCheckStartSeq')
              _strStartSeq = _strSerial.substring(parseInt(hiddenParams.hfCheckStartSeqStart), parseInt(hiddenParams.hfCheckStartSeqEnd) + 1);
              if(_strStartSeq !== hiddenParams.hfCheckStartSeqCode){
                _strScanResultAll = "NG"
                dtSerial[i].REMARK = "Serial barcode mix product" + _strTagNewLine +"หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
                dtSerial[i].SCAN_RESULT = "NG";
                dtSerial[i].ROW_UPDATE = "Y";
                _bolError = true;
              }
            }
            if (hiddenParams.hfWeekCode =='Y' && _strScanResultAll !== 'NG'){
              console.log('hfWeekCode')
              let _strWeekCode = '';
              _strWeekCode = _strSerial.substring(parseInt(hiddenParams.hfCheckWeekCodeStart), parseInt(hiddenParams.hfCheckWeekCodeEnd) + 1);
              if(_strWeekCode !== hiddenParams.hfWeekCode){
                _strScanResultAll = "NG"
                dtSerial[i].REMARK = "Serial duplicate in tray" + _strTagNewLine +"หมายเลขบาร์โค้ดซ้ำในถาดเดียวกัน";
                dtSerial[i].SCAN_RESULT = "NG";
                dtSerial[i].ROW_UPDATE = "Y";
                _bolError = true;
              }
            }
          }else{
            _strScanResultAll = "NG"
            dtSerial[i].SCAN_RESULT = "NG";
            dtSerial[i].REMARK = "Serial not matching product " + _strTagNewLine +"หมายเลขบาร์โค้ดไม่ตรงตามที่กำหนดไว้";
            dtSerial[i].ROW_UPDATE = "Y";
            _bolError = true;
          }
          if (!_bolError){
            dtSerial[i].SCAN_RESULT = "OK";
            dtSerial[i].REMARK = "";
            dtSerial[i].ROW_UPDATE = "Y";
          }
        }else{
          _strScanResultAll = "NG"
          dtSerial[i].SCAN_RESULT = "NG";
          dtSerial[i].REMARK = "Barcode can not scan" + _strTagNewLine +"สแกนบาร์โค้ดไม่ได้";
          dtSerial[i].ROW_UPDATE = "N";
          _bolTrayError = true;
        }
        _intRowSerial = _intRowSerial + 1;
      }
      setLblResult(_strScanResultAll);
      if (_strScanResultAll == "NG") {
        setLblResult({
          value: _strScanResultAll,
          styled: { color: "white" },
        });
      } else {
        console.log(dtSerial, "dtSerial");
        _strErrorUpdate = getData("SetManualSerialNo", dtSerial); 
        if (_strErrorUpdate !== '') {
          setLblResult({
            value: "Error : " + _strErrorUpdate,
            styled: { color: "white" },
          });
        }else{
          setLblResult({
            value: '',
            styled: { color: "white" },
          });
        }
      }
      setLblResultState(true);
      setGvSerialResult(dtSerial);
      console.log(dtSerial, "dtSerial");
      let result = await getData("GetCountSerialByLotMagazine", lotNo);
      hiddenParams.hfSerialCount = parseInt(result);
      setTotal(result);
      setTxtSerial(gvSerial.map(() => ""))
      setMode("SERIAL");
      
    }
  }
  return {
    operator,
    setOperator,
    pcs,
    setPcs,
    lotNo,
    setLotNo,
    magazine,
    setMagazine,
    product,
    setProduct,
    total,
    setTotal,
    gvSerialState,
    hideImg,
    lblResultState,
    handle_Save_Click,
    handle_Cancel_Click,
    lblResult,
    columns,
    btnLotBack,
    btnOperatorBack,
    btnback,
    btnMagBack,
    handle_BtnBack_Click,
    handle_OperatorBack_Click,
    handle_LotBack_Click,
    handle_MagazineBack_Click,
    handle_txtPCS_Change,
    handle_txtlotNo_Change,
    handle_Operator_Change,
    handle_Magazine_Change,
    gvSerial,
    handletxtSerialChange,
    txtSerial,
    gvSerialResult,
  };
}

export { fn_ScanSerialNo };
