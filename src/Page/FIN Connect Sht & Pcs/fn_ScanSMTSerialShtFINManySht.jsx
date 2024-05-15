import { LineAxisOutlined } from "@mui/icons-material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const fn_ScanSMTSerialShtFINManySht = () => {
  const [lot, setLot] = useState("");
  const [lotState, setLotState] = useState(true);
  const [product, setProduct] = useState([]);
  const [productState, setProductState] = useState(true);
  const [lblError, setLblError] = useState("");
  const [lblErrorState, setLblErrorState] = useState(false);
  const [lotRef, setLotRef] = useState("");
  const [operator, setOperator] = useState("");
  const [sht, setSht] = useState("");
  const [pcs, setPcs] = useState("");

  const [selectproduct, setselectproduct] = useState([]);
  const [dtData1, setDtData1] = useState([]);
  const [serialData, setSerialData] = useState([]);
  const ibtBack = () => {
    setLot("");
  };

  const Setmode = (strType) => {
    switch (strType) {
      case "LOT":
        setProductState(true);
        setLot("");
        setLotState(true);
        // txtLot.CSs
        setLblErrorState(false);
        //pnlSerial.Visible = False
        localStorage.setItem("hfMode", "LOT");
      // focus(txtlot)
      case "LOT_ERROR":
        setLot("");
        setLotState(true);
        // txtLot.CSs

        setLblErrorState(true);
        //pnlSerial.Visible = False

        localStorage.setItem("hfMode", "LOT");
      // fnSetFocus("txtLot")
      case "SERIAL":
        setLotState(false);
        //txtLot.CSs
        setLblErrorState(false);
        //pnlSerial.Visible = true
        localStorage.setItem("hfMode", "SERIAL");
      // getInitialSerial()
      case "SERIAL_ERROR":
        setLotState(false);
        //txtLot.CSs
        setLblErrorState(true);
      case "SERIAL_OK":
        setLotState(false);
        //txtLot.CSs
        setLblErrorState(false);
      //pnlSerial.Visible = False
      // getInitialSerial()
      //fnSetFocus("gvSerial")
      case "SERIAL_NG":
        setLotState(false);
        //txtLot.CSs
        setLblErrorState(false);
    }
  };
  //test
  const hfShtScan = { value: "2" };
  const hfBarcodeSide = { value: "F" };
  const getIntialSheet = () => {
    const newData = [];
    const hfShtScanValue = parseInt(hfShtScan.value);
    const hfBarcodeSideValue = hfBarcodeSide.value;
    for (let intRow = 1; intRow <= hfShtScanValue; intRow++) {
      const newRow = {
        SEQ: intRow.toString(),
        TITLE: hfBarcodeSideValue === "F" ? "Back/Front :" : "Front/Back :",
      };
      newData.push(newRow);
    }
    setDtData1(newData);
  };
  const getInitialSerial = () => {
    const newData = [];
    const hfShtScanValue = 2;
    const hfSerialCountValue = 10;
    for (let intSht = 1; intSht <= hfShtScanValue; intSht++) {
      for (let intRow = 1; intRow <= hfSerialCountValue; intRow++) {
        newData.push({
          SHEET: intSht.toString(),
          SEQ: intRow,
          TYPE: "PCS",
        });
      }
    }

    setSerialData(newData);
  };
  const handleSave = () => {
    console.log("Save clicked!");
  };

  const handleCancel = () => {
    console.log("Cancel clicked!");
  };

  useEffect(() => {
    localStorage.setItem("hfUserID", localStorage.getItem("ip"));
    localStorage.setItem("hfUserStation", localStorage.getItem("ip"));
    localStorage.setItem("hfMode", "");
    const Getproduct = () => {
      try {
        axios.get("/api/GetProductData").then((res) => {
          setProduct(res.data.Product);
        });
      } catch (error) {
        console.log(error, "get data error");
      }
    };
    Getproduct();
  }, []);
  //txtLot
  const txtLottxtChange = (e) => {
    let strLotData = "";
    let strLot = "";
    let strPrdname = "";
    let dtLotData = [];
    strLotData = e.target.value;
    strLotData = strLotData.trim().toLocaleUpperCase().split(";");
    if (strLotData.length - 1 >= 2) {
      strLot = strLotData[0];
      try {
        axios
          .get("/api/GetProductDataByLot", { params: { strLot } })
          .then((res) => {dtLotData
            if (res.rows.length > 0) {
              dtLotData.push(res.data);
            } else {
              return;
            }
          });
      } catch (error) {
        alert(error);
      }
    }
  };
  return {
    lot,
    setLot,
    product,
    setProduct,
    selectproduct,
    setselectproduct,
    getIntialSheet,
    dtData1,
    setDtData1,
    lblError,
    setLblError,
    lblErrorState,
    setLblErrorState,
    productState,
    setProductState,
    getInitialSerial,
    serialData,
    setSerialData,
    handleSave,
    handleCancel,
  };
};

export { fn_ScanSMTSerialShtFINManySht };
