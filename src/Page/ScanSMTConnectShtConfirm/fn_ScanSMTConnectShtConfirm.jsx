import React, { useEffect, useState } from "react";
import axios from "axios";
import { get } from "lodash";
import Swal from "sweetalert2";
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
  const [lblResultState, setLblResultState] = useState(false);
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
        console.log('inSERialmode')
        getInitialSerial()
        break;
      case "SERIAL_ERROR":
        Setdisable("disable", "ScanSMTConnectShtConfirmtxtLot");
        break;
      case "SERIAL_OK":
        Setdisable("disable", "ScanSMTConnectShtConfirmtxtLot");
        setPanalSerialState(false);
        getInitialSerial();
        SetFocus("gvSerial_0");
        break;
      case "SERIAL_NG":
        Setdisable("disable", "ScanSMTConnectShtConfirmtxtLot");
        break;
    }
  }
  const ddlproduct_Change = async (value) => {
    setProductSelected(value);
    if (txtLot !== "") {
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
          setLblError("Invalid lot no.");
        }
      } else {
        setProductSelected(ddlproduct[0].prd_name);
        setTxtLot("");
        setGvSerial([]);
        setLblError("Please scan QR Code. / กรุณาสแกนที่คิวอาร์โค้ด");
        hfMode = "LOT";
        SetFocus("ScanSMTConnectShtConfirmtxtLot");
      }
    } else {
      setProductSelected(ddlproduct[0].prd_name);
      setTxtLot("");
      setGvSerial([]);
      setLblError("Please scan QR Code. / กรุณาสแกนที่คิวอาร์โค้ด");
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
    console.log(dtSheet,'dtSheet')
    setGvScanResult(dtSheet);
    setLblShtCount(0);
    for (let i = 0; i < dtSheet.length; i++) {
      if (dtSheet[i].SCAN_RESULT == "OK") {
        setLblShtCount(lblShtCount + 1);
      }
    }
    setHideImg(false);
    setGvResutlState(true);
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
  const handle_Save_Click = async () => {};
  const handle_Cancel_Click = async () => {};
  async function getCountDataBylot(strLot) {
    let dtSerialCount = [];
    dtSerialCount = await getData("GetLotSerialCountData", strLot);
    if (dtSerialCount != ''){
    console.log(dtSerialCount)      
      setlblTotalSht(dtSerialCount.count_sht);
    }
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
        .post("/api/common/GetLotRollLeafDataAllByLot", {
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
    }
  }
  function getInitialSerial() {
    let arrSerial = [];
    for (let i = 0; i < hfShtScan; i++) {
      console.log('in',i)
      arrSerial.push({
        SEQ: i + 1,
      });
    }
    setGvSerial(arrSerial);
  }
  const columns = [
    {
      title: "No.",
      dataIndex: "seq",
      key: "seq",
      render: (text, record, index) => {
        return index + 1;
      },
      align: "center",
    },
    {
      title: "Sheet No. Front",
      dataIndex: "sheet_no_front",
      key: "sheet_no_front",
      align: "left",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "Sheet No. Back",
      dataIndex: "sheet_no_front",
      key: "sheet_no_front",
      align: "left",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "Scan Result",
      dataIndex: "scan_result",
      key: "scan_result",
      align: "left",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "Remark",
      dataIndex: "remark",
      key: "remark",
      align: "left",
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
    gvResutlState
  };
}

export { fn_ScanSMTConnectShtConfirm };
