import axios from "axios";
import React, { useEffect, useState } from "react";

function fn_ScanSMTSerialPcsP1() {
  const [scanLot, setScanLot] = useState("");
  const [ddlproduct, setddlproduct] = useState([]);
  const [productSelected, setProductSelected] = useState("");
  const [lblLot, setlblLot] = useState("");
  const [lblLotTotal, setlblLotTotal] = useState("");
  const [lblSerialNG, setlblSerialNG] = useState("");
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
  const columns = [];
  useEffect(() => {
    PageLoad();
  }, []);
  async function PageLoad() {
    await getData("getProductData");
  }
  async function getData(type, params) {
    try {
      if (type == "getProductData") {
        await axios.get("/api/common/GetProductData").then((res) => {
          setProductSelected(res.data[0].prd_name);
          setddlproduct(res.data);
        });
      }
    } catch (error) {
        console.error(error);
    }
  }
  const ddlproduct_Change = (e) => {
    console.log(e);
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
    ddlproduct_Change
  };
}

export { fn_ScanSMTSerialPcsP1 };
