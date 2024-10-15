import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { color } from "framer-motion";
import { Tag } from "antd";
import { values } from "lodash";
function fn_ScanConfirmMagazineP1() {
  const plantCode = import.meta.env.VITE_FAC;
  const { hfUserID, setHfUserID } = useState("");
  const { hfUserStation, setHfUserStation } = useState("F");
  const { hfMode, setHfMode } = useState("");
  const { txtLotNo, setTxtLotNo } = useState({
    value: "",
    disabled: "",
    visble: "",
    style: "",
  });
  const { lblProduct, setLblProduct } = useState({
    value: "",
    disabled: "",
    visble: "",
    style: "",
  });
  const { txtOperator, setTxtOperator } = useState({
    value: "",
    disabled: "",
    visble: "",
    style: "",
  });
  const { txtMagNo, setTxtMagNo } = useState({
    value: "",
    disabled: "",
    visble: "",
    style: "",
  });
  const { lblTotalPcs, setLblTotalPcs } = useState({
    value: "",
    disabled: "",
    visble: "",
    style: "",
  });
  const { lblResult, setLblResult } = useState({
    value: "",
    disabled: "",
    visble: "",
    style: "",
  });
  const { ibtLotBack, setIbtLotBack } = useState({
    value: "",
    disabled: "",
    visble: "",
    style: "",
  });
  const { ibtOperator, setIbtOperator } = useState({
    value: "",
    disabled: "",
    visble: "",
    style: "",
  });
  const { ibtExcel, setIbtExcel } = useState({
    value: "",
    disabled: "",
    visble: "",
    style: "",
  });
  const [gvScanResult, setGvScanResult] = useState({
    value: [],
    disbled: "",
    visble: false,
    style: {},
  });

  useEffect(() => {
    let ID = localStorage.getItem("ipAddress");
    const fetchData = async () => {
      setHfUserID(ID);
      setHfUserStation(ID);
      setHfMode("OP");
    };
    fetchData();
  }, []);

  const txtLotNo_TextChanged = async () => {
    let txtLotNo_data = "";
    if (txtLotNo.value.trim() !== "") {
      let dtLotData = [];
      let _strLotAll = "";
      _strLotAll = txtLotNo.value.toUpperCase().split(";");
      setTxtLotNo((prevState) => ({
        ...prevState,
        value: _strLotAll[0],
      }));
      txtLotNo_data = _strLotAll[0];
      if ((dtLotData.length = 9)) {
        await axios
          .post("/api/Common/getProductDataByLot", {
            strLot: txtLotNo_data,
          })
          .then((res) => {
            let data = res.data.flat().flat();
            dtLotData = data;
            if (data.length > 0) {
              setLblProduct((prevState) => ({
                ...prevState,
                value: dtLotData[0].prd_name,
              }));
              setHfMode("MAGAZINE");
            } else {
              setHfMode("LOT");
            }
          });
      } else {
        setHfMode("LOT");
      }
    } else {
      setHfMode("LOT");
    }
  };

  const ibtLotBack_Click = async () => {
    setHfMode("LOT");
  };

  const txtOperator_TextChanged = async () => {
    if (txtOperator.value.trim() !== "") {
      setTxtOperator((prevState) => ({
        ...prevState,
        value: txtOperator.value.trim(),
      }));
      setHfMode("LOT");
    }
  };

  const ibtOperator_Click = async () => {
    setHfMode("OP");
  };

  const txtMagNo_TextChanged = async () => {
    let strError = "";
    try {
      const res1 = await axios.post("/api/GetCountSerialByLotMagazine", {
        dataList: {
          strPlantCode: plantCode,
          strLot: txtLotNo.value,
          strMagazine: txtMagNo.value,
        },
      });
      let data = res1.data.flat().flat();
      setLblTotalPcs((prevState) => ({
        ...prevState,
        value: data,
      }));

      if (data.length > 0) {
        const res2 = await axios.post("/api/SetManualConfirmMagazine", {
          dataList: {
            strPlantCode: plantCode,
            strLot: txtLotNo.value,
            strMagazine: txtMagNo.value,
            strStation: hfUserStation.value,
          },
        });
        let data2 = res2.data.flat().flat();
        strError = data2;
        if (data2.length > 0) {
          setLblResult((prevState) => ({
            ...prevState,
            value: "OK",
            style: { color: "green" },
          }));
        } else {
          setLblResult((prevState) => ({
            ...prevState,
            value: "NG",
            style: { color: "red" },
          }));
        }
      } else {
        setLblResult((prevState) => ({
          ...prevState,
          value: "NG",
          style: { color: "red" },
        }));
      }
      setHfMode("MAGAZINE");
    } catch (error) {
      setHfMode("MAGAZINE");
      console.error("Error occurred: ", error);
    }
  };

  const SetMode = async (_strType) => {
    if (_strType == "OP") {
      setTxtOperator((prevState) => ({
        ...prevState,
        value: "",
        disabled: false,
        style: { background: "" },
      }));
      setTxtLotNo((prevState) => ({
        ...prevState,
        value: "",
        disabled: true,
        style: { background: "#EEEEEE" },
      }));

      setTxtMagNo((prevState) => ({
        ...prevState,
        value: "",
        disabled: true,
        style: { background: "#EEEEEE" },
      }));
      setLblProduct((prevState) => ({
        ...prevState,
        value: "",
      }));
      setLblTotalPcs((prevState) => ({
        ...prevState,
        value: "",
      }));
      setIbtLotBack((prevState) => ({
        ...prevState,
        disabled: true,
      }));
      setIbtOperator((prevState) => ({
        ...prevState,
        disabled: true,
      }));
      setIbtExcel((prevState) => ({
        ...prevState,
        disabled: true,
      }));
      fnSetFocus("txtOperator_ScanConfirmMagazineP1_focus");
    }
    if (_strType == "LOT") {
      setTxtOperator((prevState) => ({
        ...prevState,
        value: "",
        disabled: true,
        style: { background: "#EEEEEE" },
      }));
      setIbtOperator((prevState) => ({
        ...prevState,
        disabled: false,
      }));
      setTxtLotNo((prevState) => ({
        ...prevState,
        value: "",
        disabled: false,
        style: { background: "" },
      }));
      setIbtLotBack((prevState) => ({
        ...prevState,
        disabled: false,
      }));
      setTxtMagNo((prevState) => ({
        ...prevState,
        value: "",
        disabled: true,
        style: { background: "#EEEEEE" },
      }));
      setLblProduct((prevState) => ({
        ...prevState,
        value: "",
      }));
      setLblTotalPcs((prevState) => ({
        ...prevState,
        value: "",
      }));
      setIbtExcel((prevState) => ({
        ...prevState,
        disabled: true,
      }));
      fnSetFocus("txtLotNo_ScanConfirmMagazineP1_focus");
    }
    if (_strType == "MAGAZINE") {
      setTxtOperator((prevState) => ({
        ...prevState,
        value: "",
        disabled: true,
        style: { background: "#EEEEEE" },
      }));
      setIbtOperator((prevState) => ({
        ...prevState,
        disabled: false,
      }));
      setTxtLotNo((prevState) => ({
        ...prevState,
        value: "",
        disabled: true,
        style: { background: "#EEEEEE" },
      }));
      setIbtLotBack((prevState) => ({
        ...prevState,
        disabled: false,
      }));
      setTxtMagNo((prevState) => ({
        ...prevState,
        value: "",
        disabled: false,
        style: { background: "" },
      }));
      setLblTotalPcs((prevState) => ({
        ...prevState,
        value: "",
      }));
      setIbtExcel((prevState) => ({
        ...prevState,
        disabled: false,
      }));
      fnSetFocus("txtMagNo_ScanConfirmMagazineP1_focus");
    }
  };

  const ibtExcel_Click = async () => {
    await axios
      .post("/api/GetSerialMagazineByLot", {
        dataList: {
          strPlantCode: plantCode,
          strLot: txtLotNo.value,
        },
      })
      .then((res) => {
        let data = res.data.flat().flat();
        gvScanResult((prevState) => ({
          ...prevState,
          value: data,
        }));
      });
  };

  function fnSetFocus(txtField) {
    setTimeout(() => {
      document.getElementById(`${txtField}`).focus();
    }, 300);
  }
  return {};
}

export { fn_ScanConfirmMagazineP1 };
