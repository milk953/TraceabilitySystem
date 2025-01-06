//Eye
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {DataConfig} from "../Common/function_Common";
function fn_ScanSMTPackingConfirm() {
  const{ConfigData} = DataConfig();
  const [txtLot, settxtLot] = useState({ value: "", disbled: "", style: {} });
  const [ddlProduct, setddlProduct] = useState([]);
  const [selectddlProduct, setselectddlProduct] = useState({
    value: "",
    disbled: "",
    style: {},
  });
  const [lblTotalSht, setlblTotalSht] = useState({
    value: "",
    disbled: "",
    style: {},
  });
  const [lblShtCount, setlblShtCount] = useState({
    value: "",
    disbled: "",
    style: {},
  });
  const [lblResult, setlblResult] = useState({
    value: "",
    disbled: "",
    style: {},
  });
  const [lblRemark, setlblRemark] = useState({
    value: "",
    disbled: "",
    style: {},
  });
  const [lblLog, setlblLog] = useState({ value: "", disbled: "", style: {} });
  const [txtSerial, settxtSerial] = useState("");
  // const [lblLot , setlblLot ]= useState("");
  // data table
  const [gvSerial, setgvSerial] = useState([]);
  const [gvScanResult, setgvScanResult] = useState([]);

  const [pnlLog, setpnlLog] = useState("");
  const [pnlSerial, setpnlSerial] = useState(false);
  const [pnlgvScanResult, setpnlgvScanResult] = useState("");
  // const [pnlLot,setpnlLot] = useState(false);
 
  //
  const fntxtLot = useRef([]);
  const fngvSerial_txtSerial_0 = useRef([]);
  const fnddlProduct = useRef([]);

  const [hfUserID, sethfUserID] = useState("");
  const [hfUserStation, sethfUserStation] = useState("");
  const [hfMode, sethfMode] = useState("");
  let hfShtScan = "1";
  const FAC = ConfigData.FACTORY;

  useEffect(() => {
    let ID = localStorage.getItem("ipAddress");
    sethfUserID(ID);
    sethfUserStation(ID);
    sethfMode("");
    SetMode("LOT");
    const fetchData = async () => {
      await GetProductData();
    };
    fetchData();
  }, []);

  const GetProductData = async () => {
    await axios.get("/api/Common/GetProductData").then(async (res) => {
      let data = res.data;
      setddlProduct(data);
      setselectddlProduct((prevState) => ({
        ...prevState,
        value: data[0].prd_name,
      }));
    });
  };

  const ibtBack_Click = async () => {
    settxtLot((prevState) => ({ ...prevState, value: "", disbled: false }));
    setpnlSerial(false);
    // setpnlLot(false)
    SetMode("LOT");
    setpnlgvScanResult(false);
    setTimeout(() => {
      fntxtLot.current.focus();
    }, 300);
    await GetProductData();
  };

  const btnCancel_Click = async () => {
    SetMode("SERIAL");
    setlblResult((prevState) => ({ ...prevState, value: "" }));
    fngvSerial_txtSerial_0.current[0].focus();
    
    // setpnlgvScanResult(false);

  };

  const btnSave_Click = async () => {
    const hasAnyInput = Array.from(fngvSerial_txtSerial_0.current).some(input => input.value.trim() !== "");
    if (hasAnyInput == true) {
      if (hfMode == "SERIAL") {
        setSerialData();
      }
    }else {
      setpnlLog(true)
      setlblLog((prevState) => ({
        ...prevState,
        value: "Please input sheet no.",
      }));
      fngvSerial_txtSerial_0.current[0].focus();
    //  setpnlLot(true)
    //  setlblLot("Please Input Sheet No.")
    }
  
  };

  const SetMode = (_strType) => {
    switch (_strType) {
      case "LOT":
        settxtLot((prevState) => ({ ...prevState, value: "", disbled: false }));
        setlblShtCount((prevState) => ({ ...prevState, value: "" }));
        setlblTotalSht((prevState) => ({ ...prevState, value: "" }));
        setlblResult((prevState) => ({ ...prevState, value: "" }));
        setpnlLog(false);
        setpnlSerial(false);
        sethfMode("LOT");
        setTimeout(() => {
          fntxtLot.current.focus();
        }, 300);
        break;
      case "LOT_ERROR":
        settxtLot((prevState) => ({ ...prevState, value: "", disbled: false }));
        setlblShtCount((prevState) => ({ ...prevState, value: "" }));
        setlblTotalSht((prevState) => ({ ...prevState, value: "" }));
        setlblResult((prevState) => ({ ...prevState, value: "" }));
        setpnlLog(true);
        setpnlSerial(false);
        sethfMode("LOT");
        setTimeout(() => {
          fntxtLot.current.focus();
        }, 300);
        break;
      case "SERIAL":
        settxtLot((prevState) => ({ ...prevState, disbled: true }));
        setpnlLog(false);
        setpnlSerial(true);
        sethfMode("SERIAL");
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
        fngvSerial_txtSerial_0.current[0].focus();
        break;
      case "SERIAL_NG":
        settxtLot((prevState) => ({ ...prevState, disbled: true }));
        setpnlLog(false);

        break;

      default:
    }
  };

  const getInitialSerial = async () => {
    let dtData = [];
    for (let intRow = 0; intRow < hfShtScan; intRow++) {
      dtData.push({
        SEQ: intRow + 1,
      });
    }
    setgvSerial(dtData);
    settxtSerial(Array(gvSerial.length).fill(""));
    if (gvSerial.length > 0) {
      setTimeout(() => {
        fngvSerial_txtSerial_0.current[0].focus();
      }, 300);
    }
    return 0;
  };

  const txtLot_TextChanged = async () => {
    let strLotData = "";
    let strLot = "";
    let strPrdName = "";
    strLotData = txtLot.value.toUpperCase().split(";");
    setlblShtCount((prevState) => ({ ...prevState, value: "0" }));
    setlblTotalSht((prevState) => ({ ...prevState, value: "0" }));
    if (strLotData.length >= 2) {
      strLot = strLotData[0];

      await axios
        .post("/api/Common/GetProductNameByLot", {
          strLot: strLot,
        })
        .then((res) => {
          strPrdName = res.data.prdName[0];
        });
      if (strPrdName !== "") {
        setlblLog((prevState) => ({ ...prevState, value: "" }));
        setpnlLog(false);
        settxtLot((prevState) => ({ ...prevState, value: strLot }));
        try {
          const isInArray = ddlProduct.some(
            (item) => item.prd_name === strPrdName
          );
          if (isInArray) {
            setselectddlProduct((prevState) => ({
              ...prevState,
              value: strPrdName,
            }));
            SetMode("SERIAL");
            setTimeout(() => {
              fngvSerial_txtSerial_0.current[0].focus();
            }, 300);
          }else {
            setselectddlProduct((prevState) => ({
              ...prevState,
              value: ddlProduct[0].prd_name,
            }));
            settxtLot((prevState) => ({ ...prevState, value: "" }));
            //setgvSerial([])
            setlblLog((prevState) => ({ ...prevState, value: "Invalid lot no." }));
            setpnlLog(true);
            sethfMode("LOT");
            setTimeout(() => {
              fntxtLot.current.focus();
            }, 300);
          }
        } catch (error) {
          const intProduct = strPrdName.indexOf("-", 12);
          if (intProduct > 0) {
            strPrdName =
              strPrdName.substring(0, intProduct) +
              strPrdName.substring(intProduct + 1, intProduct + 11).trim();
            try {
              setselectddlProduct((prevState) => ({
                ...prevState,
                value: strPrdName,
              }));
              SetMode("SERIAL");
              setTimeout(() => {
                fngvSerial_txtSerial_0.current[0].focus();
              }, 300);
            } catch (error2) {
              setlblLog((prevState) => ({
                ...prevState,
                value: "Product " + strPrdName + "not found",
              }));
              setpnlLog(true);
              setTimeout(() => {
                fnddlProduct.current.focus();
              }, 300);
            }
          } else {
            setlblLog((prevState) => ({
              ...prevState,
              value: "Product " + strPrdName + "not found",
            }));
            setpnlLog(true);
          }

          setTimeout(() => {
            fnddlProduct.current.focus();
          }, 300);
        }
      } 
    } else {
      setselectddlProduct((prevState) => ({
        ...prevState,
        value: ddlProduct[0].prd_name,
      }));
      settxtLot((prevState) => ({ ...prevState, value: "" }));
      setlblLog((prevState) => ({
        ...prevState,
        value: "Please scan QR Code. / กรุณาสแกนที่คิวอาร์โค้ด",
      }));
      setpnlLog(true);
      sethfMode("LOT");
      // setgvSerial([])
      
      setTimeout(() => {
        fntxtLot.current.focus();
      }, 300);
    }
    getShtDataBylot(strLot);
  };

  const ddlProduct_SelectedIndexChanged = async (selectvalue) => {
    setselectddlProduct((prevState) => ({ ...prevState, value: selectvalue }));
    if (txtLot.value.trim().toUpperCase() !== "") {
      setlblLog((prevState) => ({ ...prevState, value: "" }));
      setpnlLog(false);
      SetMode("SERIAL");
      setTimeout(() => {
        fngvSerial_txtSerial_0.current[0].focus();
      });
    } else {
      setselectddlProduct((prevState) => ({
        ...prevState,
        value: data[0].prd_name,
      }));
      SetMode("LOT");
    }
  };

  const setSerialData = async () => {
    let dtSerial = await getInputSerial();
    let dtSheet = await getSheetResult();
    let _strLotData = [];
    let _strLot = "";
    let _strPrdName = selectddlProduct.value;
    let _strShtNoBack = "";
    let _strShtNoFront = "";
    let _strTray = " ";
    let _intSeq = 1;
    let _intOK = 0;
    let _strScanResultAll = "";
    let _strErrorAll = "";
    let _strUpdateError = "";
    let _bolUpdate = false;
    let _bolError = false;
    setlblResult((prevState) => ({ ...prevState, value: "0" }));
    setlblRemark((prevState) => ({ ...prevState, value: "" }));
    _strLotData = txtLot.value.split(";");
    _strLot = _strLotData[0];
    if (txtLot.value.trim() != "" && dtSerial.length > 0) {
      _strScanResultAll = "NG";
      let _intRowSerial = 0;
      for (let drRow = 0; drRow < dtSerial.length; drRow++) {
        if (dtSerial[drRow].SERIAL.trim().toUpperCase() !== "") {
          let _strSerial = dtSerial[drRow].SERIAL.trim().toUpperCase();
          let _strTestResult = "NONE";
          let _strMessageUpdate = "";
          let _strScanResultUpdate = "";
          let _inCountSeq = 0;
          let _strSerialDup = "";
          for (let drShtRow = 0; drShtRow < dtSheet.length; drShtRow++) {
            if (
              dtSheet[drShtRow].sheet_no === _strSerial &&
              dtSheet[drShtRow].confirm_result.trim() === "OK"
            ) {
              dtSheet[drShtRow].scan_result = "OK";
              dtSerial[drRow].SHEET_NO = dtSheet[drShtRow].sheet_no;
              dtSerial[drRow].CONFIRM_RESULT = dtSheet[drShtRow].confirm_result;
              dtSerial[drRow].SCAN_RESULT = dtSheet[drShtRow].scan_result;
              _strScanResultAll = dtSheet[drShtRow].scan_result;
              _bolUpdate = true;
            } else if (
              dtSheet[drShtRow].sheet_no == _strSerial &&
              dtSheet[drShtRow].confirm_result.trim() != "OK"
            ) {
              dtSheet[drShtRow].scan_result = "NG";
              dtSerial[drRow].SHEET_NO = dtSheet[drShtRow].sheet_no;
              dtSerial[drRow].CONFIRM_RESULT = dtSheet[drShtRow].confirm_result;
              dtSerial[drRow].SCAN_RESULT = dtSheet[drShtRow].scan_result;
              _strScanResultAll = dtSheet[drShtRow].scan_result;
              setlblRemark((prevState) => ({
                ...prevState,
                value: "NOT CONFIRM",
              }));
              _bolUpdate = true;
            }
          }
        }
      }
      for (let drShtRow = 0; drShtRow < dtSheet.length; drShtRow++) {
        if (drShtRow.scan_result == "OK") {
          _intOK = _intOK + 1;
        }
      }
      for (let drRow = 0; drRow < dtSerial.length; drRow++) {
        if (_bolUpdate) {
          let strError;
          await axios
            .post("/api/SetConfirmPackingSheet", {
              dataList: {
                Plantcode: FAC,
                SCAN_RESULT: dtSerial[drRow].SCAN_RESULT,
                SHEET_NO: dtSerial[drRow].SHEET_NO,
              },
            })
            .then((res) => {
              strError = res.data[0].p_error;
            });
          if (strError !== "") {
            _strScanResultAll = "NG";
          }
        }
      }
      setlblResult((prevState) => ({ ...prevState, value: _strScanResultAll }));

      if (_strScanResultAll == "NG") {
        setlblResult((prevState) => ({
          ...prevState,
          value: _strScanResultAll,
          style: { background: "red" },
        }));
      } else {
        setlblResult((prevState) => ({
          ...prevState,
          value: _strScanResultAll,
          style: { background: "green" },
        }));
      }
      setgvScanResult(dtSheet);
      getInitialSerial();
      setpnlLog(false);
    } else {
      setlblLog((prevState) => ({
        ...prevState,
        value: "Please input lot no. ",
      }));
      SetMode("SERIAL_ERROR");
    }
    getShtDataBylot(txtLot.value.trim().toUpperCase());
    fngvSerial_txtSerial_0.current[0].focus();
  };

  const getInputSerial = async () => {
    let dtData = [];
    let intRow = 0;
    let strFrontSide = "";
    for (let intSht = 0; intSht < gvSerial.length; intSht++) {
      dtData.push({
        SEQ: intRow + 1,
        SERIAL: txtSerial[intSht],
        SHEET_NO: txtSerial[intSht],
        CONFIRM_RESULT: "",
        SCAN_RESULT: "",
        REMARK: "",
      });
    }

    return dtData;
  };

  const getSheetResult = async () => {
    let dtData = [];
    let intRow = 0;
    let strFrontSide = "";
    for (let intSht = 0; intSht < gvScanResult.length; intSht++) {
      dtData.push({
        seq: intRow + 1,
        sheet_no: gvScanResult[intSht].sheet_no,
        confirm_result: gvScanResult[intSht].confirm_result,
        scan_result: gvScanResult[intSht].scan_result,
        remark: gvScanResult[intSht].remark,
      });
    }
    return dtData;
  };

  const getShtDataBylot = async (_strLot) => {
    let dtSheet = [];
    let intOK = 0;

    await axios
      .post("/api/GetConfirmSheetDataAllByLot", {
        dataList: {
          strPlantCode: FAC,
          strLot: _strLot,
        },
      })
      .then((res) => {
        dtSheet = res.data;
        setgvScanResult(dtSheet);
        if (dtSheet.length > 0) {
          setpnlgvScanResult(true);
          setpnlSerial(true)
        }
        else{
          setpnlgvScanResult(false);
          setpnlSerial(false)
        }
      });
    for (let row = 0; row < dtSheet.length; row++) {
      if (dtSheet[row].scan_result == "OK") {
        intOK += 1;
      }
    }
    setlblShtCount((prevState) => ({ ...prevState, value: intOK.toString() }));
    if (lblTotalSht.value == "" || lblTotalSht == "0") {
      setlblTotalSht((prevState) => ({ ...prevState, value: dtSheet.length }));
    }
    return 0;
  };

  const handleSerialChange = async (index, event) => {
    const newValues = [...txtSerial];
    newValues[index] = event.target.value.trim().toUpperCase();
    settxtSerial(newValues);
  };

  const columns = [
    {
      title: "No.",
      dataIndex: "seq",
      key: "No.",
      render: (text, record, index) => {
        return index + 1;
      },
      align: "center",
    },
    {
      title: "Sheet No.",
      dataIndex: "sheet_no",
      key: "Sheet No.",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "Confirm Result",
      dataIndex: "confirm_result",
      align: "center",
      key: "Confirm Result",
      render: (text, record, index) => {
        return text 
        // != " " ? (
        //   <Tag
        //     className={
        //       text === "OK" ? "Tag-OK" : text === "NG" || "NO" ? "Tag-NG" : ""
        //     }
        //   >
        //     {text}
        //   </Tag>
        // ) : (
        //   ""
        // );
      },
    },
    // {
    //   title: "Confirm Result",
    //   dataIndex: "confirm_result",
    //   align: "center",
    //   key: "Confirm Result",
    //   render: (text) => {
    //     return text.trim() !== "" ? (
    //       <span
    //         style={{
    //           color: text === "OK" 
    //             ? "green" 
    //             : text === "NG" || text === "NO" 
    //             ? "red" 
    //             : "black", // สีดำเป็นค่าเริ่มต้น
    //         }}
    //       >
    //         {text}
    //       </span>
    //     ) : (
    //       ""
    //     );
    //   },
    // },
    

    {
      title: "Scan Result",
      key: "Scan Result",
      dataIndex: "scan_result",

      render: (text, record, index) => {
        return text 
        //!= " " ? (
        //   <Tag
        //     className={
        //       text === "OK" ? "Tag-OK" : text === "NG" || "NO" ? "Tag-NG" : ""
        //     }
        //   >
        //     {text}
        //   </Tag>
        // ) : (
        //   ""
        // );
      },
      align: "center",
    },

    {
      title: "Remark",
      key: "Remark",
      dataIndex: "remark",

      render: (text, record, index) => {
        return text;
      },
      align: "center",
    },
  ];

  return {
    txtLot,
    settxtLot,
    txtLot_TextChanged,
    ddlProduct,
    selectddlProduct,
    setselectddlProduct,
    lblTotalSht,
    lblShtCount,
    lblResult,
    lblRemark,
    txtSerial,
    settxtSerial,
    gvSerial,
    gvScanResult,
    pnlSerial,
    lblLog,
    pnlgvScanResult,
    fntxtLot,
    fngvSerial_txtSerial_0,
    fnddlProduct,
    pnlLog,
    ibtBack_Click,
    btnCancel_Click,
    btnSave_Click,
    ddlProduct_SelectedIndexChanged,
    handleSerialChange,
    columns,
    // pnlLot,
    // lblLot
    
  };
}

export { fn_ScanSMTPackingConfirm };
