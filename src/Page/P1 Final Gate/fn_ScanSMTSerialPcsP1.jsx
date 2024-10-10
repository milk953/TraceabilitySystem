import React, { useState } from "react";

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
  const columns =[];
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
    setTxtSerial
  };
}

export { fn_ScanSMTSerialPcsP1 };
