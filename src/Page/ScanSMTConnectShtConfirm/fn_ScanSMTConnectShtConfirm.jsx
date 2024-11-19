import React, { useEffect, useState } from "react";
import axios from "axios";
import { get, set } from "lodash";
import Swal from "sweetalert2";
import { SoundFilled } from "@ant-design/icons";
import { FitnessCenter } from "@mui/icons-material";
import { Tag } from "antd";
function fn_ScanSMTConnectShtConfirm() {
  const [hideImg, setHideImg] = useState(true);
  const [gvSerial, setGvSerial] = useState([]);
  const [panalSerialState, setPanalSerialState] = useState(false);
  const [txtLot, setTxtLot] = useState("");
  const [ddlproduct, setDdlproduct] = useState([]);
  const [ddlproductState, setDdlproductState] = useState("");
  const [productSelected, setProductSelected] = useState("");
  const [txtSerial, setTxtSerial] = useState(gvSerial.map(() => ""));
  const [lblError, setLblError] = useState("");
  const [lblErrorState, setLblErrorState] = useState(false);
  const [lblResultState, setLblResultState] = useState(false);
  const [lblResult, setLblResult] = useState("");
  const [gvScanResult, setGvScanResult] = useState([]);
  const [lblShtCount, setLblShtCount] = useState();
  const [lblTotalSht, setlblTotalSht] = useState();
  const [gvResutlState, setGvResutlState] = useState(false);
  //hidden collect data
  const [hfUserID, sethfUserID] = useState("");
  const [userStation, setUserStation] = useState("");

  let hfIPAddress = "";
  let hfMode = "";
  let hfShtScan = 1;

  const Fac = import.meta.env.VITE_FAC;
  useEffect(() => {
    Pageload();
    setMode("LOT");
  }, []);
  async function Pageload() {
    await getData("getProductData", null);
    sethfUserID(localStorage.getItem("ipAddress"));
    setUserStation(localStorage.getItem("ipAddress"));
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
  function setMode(mode) {
    switch (mode) {
      case "LOT":
        setLblErrorState(false);

        setTxtLot("");
        Setdisable("", "ScanSMTConnectShtConfirmtxtLot");

        setDdlproductState(false);
        setPanalSerialState(false);
        setLblResultState(false);
        SetFocus("ScanSMTConnectShtConfirmtxtLot");
        break;
      case "LOT_ERROR":
        setTxtLot("");
        Setdisable("", "ScanSMTConnectShtConfirmtxtLot");
        setPanalSerialState(false);
        hfMode = "LOT";
        SetFocus("ScanSMTConnectShtConfirmtxtLot");
        break;
      case "SERIAL":
        Setdisable("disable", "ScanSMTConnectShtConfirmtxtLot");
        setPanalSerialState(true);
        hfMode = "SERIAL";
        console.log("inSERialmode");
        getInitialSerial();

        break;
      case "SERIAL_ERROR":
        Setdisable("disable", "ScanSMTConnectShtConfirmtxtLot");
        break;
      case "SERIAL_OK":
        Setdisable("disable", "ScanSMTConnectShtConfirmtxtLot");
        setPanalSerialState(false);
        getInitialSerial();
        SetFocus(`txtSerial_0`);
        break;
      case "SERIAL_NG":
        Setdisable("disable", "ScanSMTConnectShtConfirmtxtLot");
        break;
    }
  }
  const ddlproduct_Change = async (value) => {
    setProductSelected(value);
    if (txtLot !== "") {
      setLblError("");
      setHideImg(false);
      setGvResutlState(true);
      getCountDataBylot(txtLot);
      setMode("SERIAL");
    } else {
      setProductSelected(ddlproduct[0].prd_name);
      SetFocus("ScanSMTConnectShtConfirmtxtLot");
    }
  };
  const txtLot_Change = async () => {
    setLblError("");
    let strLotAll;
    let strLot;
    let strPrdName;
    strLotAll = txtLot.split(";");
    if (strLotAll.length >= 2) {
      strLot = strLotAll[0];
      strPrdName = productSelected;
      strPrdName = await getData("GetProductNameByLot", strLot);
      if (strPrdName != "") {
        await getCountDataBylot(strLot);
        if (ddlproduct.some((x) => x.prd_name == strPrdName)) {
          setProductSelected(strPrdName);
          ddlproduct_Change(strPrdName);
          setMode("SERIAL");
        } else {
          setProductSelected(ddlproduct[0].prd_name);
          setTxtLot("");
          setLblError("Invalid lot no.");
          setLblErrorState(true);
          hfMode = "LOT";
          SetFocus("ScanSMTConnectShtConfirmtxtLot");
          // return;
        }
      } else {
        setProductSelected(ddlproduct[0].prd_name);
        setTxtLot("");
        setGvSerial([]);
        setLblError("Please scan QR Code. / กรุณาสแกนที่คิวอาร์โค้ด");
        setLblErrorState(true);
        hfMode = "LOT";
        SetFocus("ScanSMTConnectShtConfirmtxtLot");
      }
    } else {
      setProductSelected(ddlproduct[0].prd_name);
      setTxtLot("");
      setGvSerial([]);
      setLblError("Please scan QR Code. / กรุณาสแกนที่คิวอาร์โค้ด");
      setLblErrorState(true);
      hfMode = "LOT";
      SetFocus("ScanSMTConnectShtConfirmtxtLot");
    }
    getShtDataBylot(strLot);
  };
  function SetFocus(txtField) {
    document.getElementById(`${txtField}`).focus();
  }
  async function getShtDataBylot(strLot) {
    let dtSheet = [];
    dtSheet = await getData("GetLotSheetDataAllByLot", strLot);
    setGvScanResult(dtSheet);
    setLblShtCount(0);
    for (let i = 0; i < dtSheet.length; i++) {
      if (dtSheet[i].SCAN_RESULT == "OK") {
        setLblShtCount(lblShtCount + 1);
      }
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
  };
  const handle_Save_Click = async () => {
    setSerialData();
  };
  const handle_Cancel_Click = async () => {
    setTxtSerial(gvSerial.map(() => ""));
    setMode("SERIAL");
    SetFocus(`txtSerial_0`);
  };
  const handle_ibtnBack_Click = async () => {
    setTxtLot("");
    setMode("LOT");
    setGvResutlState(false);
    setProductSelected(ddlproduct[0].prd_name);
    setHideImg(true);
    setLblError("");
    setLblErrorState(false);
    SetFocus("ScanSMTConnectShtConfirmtxtLot");
    
  }
  async function getCountDataBylot(strLot) {
    let dtSerialCount = [];
    dtSerialCount = await getData("GetLotSerialCountData", strLot);
    if (dtSerialCount != "") {
      setlblTotalSht(dtSerialCount.count_sht);
    }
  }
  function getInputSerial() {
    let dtData = [];
    let intRow = 0;
    let strFrontSide = "";

    for (let intSeq = 0; intSeq < gvSerial.length; intSeq++) {
      intRow = intRow + 1;
      dtData.push({
        seq: intRow,
        SERIAL: txtSerial[intSeq],
        SHEET_NO: txtSerial[intSeq],
        SCAN_RESULT: "",
      });
    }
    return dtData;
  }
  function getSheetResult() {
    let dtData = [];
    let intRow = 0;
    let strFrontSide = "";

    for (let intSeq = 0; intSeq < gvScanResult.length; intSeq++) {
      intRow = intRow + 1;
      dtData.push({
        seq: intRow,
        sheet_no_front: gvScanResult[intSeq].sheet_no_front,
        sheet_no_back: gvScanResult[intSeq].sheet_no_back,
        scan_result: gvScanResult[intSeq].scan_result,
        remark: gvScanResult[intSeq].remark,
      });
    }

    return dtData;
  }
  async function getData(type, params) {
    if (type == "getProductData") {
      await axios.get("/api/common/GetProductData").then((res) => {
        setProductSelected(res.data[0].prd_name);
        setDdlproduct(res.data);
      });
    } else if (type == "GetProductNameByLot") {
      let prdName = "";
      await axios
        .post("/api/common/getProductNameByLot", { strLot: params })
        .then((res) => {
          prdName = res.data.prdName[0];
        });
      return prdName;
    } else if (type == "GetLotSheetDataAllByLot") {
      let dtSheet = [];
      await axios
        .post("/api/common/GetLotSheetDataAllByLot", {
          dataList: {
            strLotNo: params,
            strPlantCode: Fac,
          },
        })
        .then((res) => {
          dtSheet = res.data;
        });
      return dtSheet;
    } else if (type == "GetLotSerialCountData") {
      let drSerialCount = [];
      await axios
        .post("/api/ScanFin/GetLotSerialCountData", {
          dataList: { strLotNo: params, strPlantCode: Fac },
        })
        .then((res) => {
          drSerialCount = res.data;
        })
        .catch((error) => {
          Swal.fire("Error", error.message);
        });
      return drSerialCount;
    } else if (type == "SetConfirmConnectShtPcs") {
      let result = "";
      await axios
        .post("/api/common//SetConfirmConnectShtPcs", {
          dataList: {
            strSheetNo: params.strSheetNo,
            strPlantCode: Fac,
            strScanResult: params.strScanResult,
          },
        })
        .then((res) => {
          result = res.data.p_error;
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.message,
          });
        });
      return result;
    }
  }
  function getInitialSerial() {
    let arrSerial = [];
    for (let i = 0; i < hfShtScan; i++) {
      arrSerial.push({
        SEQ: i + 1,
      });
    }
    setGvSerial(arrSerial);
    // SetFocus(`txtSerial_0`);
  }
  async function setSerialData() {
    let dtSerial = getInputSerial();
    let dtSheet = getSheetResult();

    let _strlot = "";
    let _strLotData;
    let _strPrdName = productSelected;
    let _strShtNoBack = "";
    let _strShtNoFront = "";
    let _strTray = " ";
    let _intSeq = 1;
    let _strScanResultAll = "";
    let _strErrorAll = "";
    let _strUpdateError = "";

    let _bolError = false;

    _strLotData = txtLot.split(";");
    _strlot = _strLotData[0];
    if (txtLot != "" && dtSerial.length > 0) {
      _strScanResultAll = "NG";
      let _intRowSerial = 0;
      for (let i = 0; i < dtSerial.length; i++) {
        if (dtSerial[i].SERIAL != "") {
          let _strSerial = dtSerial[i].SERIAL;
          let _strTestResult = "NONE";
          let _strMessageUpdate = "";
          let _strScanResultUpdate = "";
          let _inCountSeq = 0;
          let _strSerialDup = "";

          for (let j = 0; j < dtSheet.length; j++) {
            if (
              dtSheet[j].sheet_no_front == _strSerial ||
              dtSheet[j].sheet_no_back == _strSerial
            ) {
              dtSheet[j].scan_result = "OK";
              dtSerial[i].SCAN_RESULT = dtSheet[j].scan_result;
              _strScanResultAll = dtSheet[j].scan_result;
            }
          }
        }
      }

      if (_strScanResultAll == "OK") {
        // Dim strError As String = BIZ_ScanSMTSerial.SetConfirmConnectShtPcs(Session("PLANT_CODE"), dtSerial, Session("PRODUCT_KIND"))
        for (let i = 0; i < dtSerial.length; i++) {
          let strError = await getData("SetConfirmConnectShtPcs", {
            strSheetNo: dtSerial[i].SHEET_NO,
            strScanResult: dtSerial[i].SCAN_RESULT,
          });
          if (strError != "") {
            _strErrorAll = "NG";
          }
        }
      }
      setLblResult(_strScanResultAll);
      setLblResultState(true);
      getShtDataBylot(_strlot);

      setTxtSerial(gvSerial.map(() => ""));
      getInitialSerial();
      setLblError("");
    } else {
      setLblError("Please input lot no. ");
      setLblErrorState(true);
      setMode("SERIAL_ERROR");
    }
    getCountDataBylot(_strlot);
    SetFocus("txtSerial_0");
  }
  const columns = [
    {
      title: "No.",
      dataIndex: "seq",
      key: "seq",
      render: (text, record, index) => {
        return index + 1;
      },
      width: 100,
      align: "center",
    },
    {
      title: "Sheet No. Front",
      dataIndex: "sheet_no_front",
      key: "sheet_no_front",
      align: "left",
      width: 200,
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "Sheet No. Back",
      dataIndex: "sheet_no_front",
      key: "sheet_no_front",
      align: "left",
      width: 200,
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "Scan Result",
      dataIndex: "scan_result",
      key: "scan_result",
      align: "left",
      width: 130,
      render: (text, record, index) => {
        const backgroundColor =
          record.scan_result === "NG" ? "#f50" : 
          record.scan_result === "OK" ? "#87d068" : 
          "transparent";
        
        return (
          < Tag style={{width:100,textAlign:'center'}}  color={backgroundColor} >
            {text}
          </Tag>
        );
      },
      align: "center",
    },
    {
      title: "Remark",
      dataIndex: "remark",
      key: "remark",
      align: "left",
      width: 200,
      render: (text, record, index) => {
        return text;
      },
    },
  ];
  return {
    hideImg,
    gvSerial,
    panalSerialState,
    txtLot,
    setTxtLot,
    txtLot_Change,
    ddlproduct,
    setDdlproduct,
    productSelected,
    setProductSelected,
    txtSerial,
    setTxtSerial,
    handletxtSerialChange,
    handle_Save_Click,
    handle_Cancel_Click,
    lblError,
    lblResultState,
    columns,
    ddlproduct_Change,
    ddlproductState,
    lblShtCount,
    lblTotalSht,
    gvScanResult,
    gvResutlState,
    lblResult,
    lblErrorState,
    handle_ibtnBack_Click
  };
}

export { fn_ScanSMTConnectShtConfirm };
