import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { color } from "framer-motion";

function fn_AOIManualConfirmP1() {
  const plantCode = import.meta.env.VITE_FAC;
  // const Username = localStorage.getItem("Username");
  let Username = localStorage.getItem("IDCode");
  const Lastname = localStorage.getItem("Lastname");
  const [hfUserID, setHfUserID] = useState("");
  const [hfUserStation, setHfUserStation] = useState("");
  const [Result, setResult] = useState([]);
  const [selectedValue, setSelectedValue] = useState("AOI");
  const [CheckComplete, setCheckComplete] = useState("");
  const [txtSerialNo, setTxtSerialNo] = useState({
    value: "",
    disbled: "",
    visble: false,
    style: {},
  });
  const [lblUser1, setLblUser1] = useState({
    value: "",
    disbled: "",
    visble: false,
    style: {},
  });
  const [hfUserName, setHfUserName] = useState({
    value: "",
    disbled: "",
    visble: false,
    style: {},
  });
  const [ddlResult, setDdlResult] = useState({
    value: "",
    disbled: "",
    visble: false,
    style: {},
  });
  const [lblResult, setLblResult] = useState({
    value: "",
    disbled: "",
    visble: false,
    style: {},
  });
  const [rbtAOI, setRbtAOI] = useState({
    value: true,
    disbled: "",
    visble: false,
    style: {},
  });
  const [rbtSPI, setRbtSPI] = useState({
    value: false,
    disbled: "",
    visble: false,
    style: {},
  });
  const [rbtAOIandSPIcheck, setRbtAOIandSPIcheck] = useState({
    value: "AOI",
    disbled: "",
    visble: false,
    style: {},
  });

  const [txtOperatorCode, setTxtOperatorCode] = useState({
    value: Username,
    disbled: "",
    visble: false,
    style: {},
  });
  const [txtCnt, setTxtCnt] = useState({
    value: "",
    disbled: "",
    visble: false,
    style: {},
  });

  useEffect(() => {
    let ID = localStorage.getItem("ipAddress");
    const fetchData = async () => {
      setHfUserID(ID);
      setHfUserStation(ID);
      fnSetFocus("txtSerialNo_AOIManualConfirmP1_focus");
      setLblUser1((prevState) => ({
        ...prevState,
        value: "Welcom to serial trace system, plant_code : " + plantCode,
      }));
      setHfUserName((prevState) => ({
        ...prevState,
        value: "",
      }));
    };
    fetchData();
  }, []);

  const btnRetrive_Click = async () => {
    await Search_Data();
  };

  const BtnSubmit1_Click = async () => {
    let AOI_SPI_Check = "";
    if (CheckComplete === "") {
      setDdlResult((prevState) => ({
        ...prevState,
        value: "",
      }));
      setLblResult((prevState) => ({
        ...prevState,
        value: "Please in put piece no.",
        style: { background: "red" },
      }));
      fnSetFocus("txtSerialNo_AOIManualConfirmP1_focus");
      return;
    }
    if (ddlResult.value === " ") {
      setLblResult((prevState) => ({
        ...prevState,
        value: "Please select result.",
        style: { background: "red" },
      }));
      return;
    }

    try {
      AOI_SPI_Check = rbtAOI.value ? "AOI" : "SPI";
      await axios
        .post("/api/Update_aoiandspi_rslt", {
          dataList: {
            strResult: ddlResult.value,
            strCreate_by: txtOperatorCode.value.trim(),
            strPlantCode: plantCode,
            strSheet_no: txtSerialNo.value.trim().toUpperCase(),
            strRbtAOI: AOI_SPI_Check,
            strPage: "AOIManualConfirmP1",
          },
        })
        .then((res) => {
          let data = res.data.flat().flat();
          setLblResult((prevState) => ({
            ...prevState,
            value:
              txtSerialNo.value.trim().toUpperCase() +
              " => " +
              ddlResult.value +
              " update complete.",
            style: { background: "green" },
          }));
          setDdlResult((prevState) => ({
            ...prevState,
            value: " ",
          }));

          // setTxtOperatorCode((prevState) => ({
          //   ...prevState,
          //   value: "",
          // }));
          setTxtCnt((prevState) => ({
            ...prevState,
            value: "",
          }));
          setTxtSerialNo((prevState) => ({
            ...prevState,
            value: "",
          }));
          setCheckComplete("");
          fnSetFocus("txtSerialNo_AOIManualConfirmP1_focus");
        });
    } catch (ex) {
      setCheckComplete("");
      setLblResult((prevState) => ({
        ...prevState,
        value: ex.message,
        style: { background: "red" },
      }));
    }
  };

  const BtnCancle_Click = async () => {
    setRbtAOIandSPIcheck((prevState) => ({
      ...prevState,
      value: "AOI",
    }));
    setTxtSerialNo((prevState) => ({
      ...prevState,
      value: "",
    }));
    setDdlResult((prevState) => ({
      ...prevState,
      value: "",
    }));
    setTxtCnt((prevState) => ({
      ...prevState,
      value: "",
    }));
    setLblResult((prevState) => ({
      ...prevState,
      value: "",
      style: {},
    }));
    fnSetFocus("txtSerialNo_AOIManualConfirmP1_focus");
    setRbtAOI((prevState) => ({
      ...prevState,
      value: true,
    }));
    setRbtSPI((prevState) => ({
      ...prevState,
      value: false,
    }));
    setCheckComplete("");
  };

  const txtSerialNo_TextChanged = async () => {
    await Search_Data();
  };

  const Search_Data = async () => {
    let AOI_SPI_Check = "";
    try {
      setDdlResult((prevState) => ({
        ...prevState,
        value: "",
      }));
      setTxtCnt((prevState) => ({
        ...prevState,
        value: "",
      }));
      AOI_SPI_Check = rbtAOI.value ? "AOI" : "SPI";
      await axios
        .post("/api/Search_aoiandspi_rslt", {
          dataList: {
            strPlantCode: plantCode,
            strSheet_no: txtSerialNo.value.trim().toUpperCase(),
            strRbtAOI: AOI_SPI_Check,
          },
        })
        .then((res) => {
          let data = res.data.flat().flat();
          if (data.length > 0) {
            setCheckComplete("Y");
            setDdlResult((prevState) => ({
              ...prevState,
              value: data[0].prod_result,
            }));
            setTxtCnt((prevState) => ({
              ...prevState,
              value: String(data[0].inspect_count),
            }));
            setLblResult((prevState) => ({
              ...prevState,
              value: "",
              style: { background: "" },
            }));
          } else {
            setLblResult((prevState) => ({
              ...prevState,
              value: "Data not found.",
              style: { background: "red" },
            }));
            fnSetFocus("txtSerialNo_AOIManualConfirmP1_focus");
          }
        });
    } catch (ex) {
      setLblResult((prevState) => ({
        ...prevState,
        value: ex.message,
        style: { background: "red" },
      }));
    }
  };

  const handleRadioChange = async (event) => {
    let value = event.target.value;
    setRbtAOIandSPIcheck((prevState) => ({
      ...prevState,
      value: value,
    }));
    setTxtSerialNo((prevState) => ({
      ...prevState,
      value: "",
    }));
    setDdlResult((prevState) => ({
      ...prevState,
      value: "",
    }));
    setTxtCnt((prevState) => ({
      ...prevState,
      value: "",
    }));
    setLblResult((prevState) => ({
      ...prevState,
      value: "",
      style: {},
    }));
    setCheckComplete("");
    fnSetFocus("txtSerialNo_AOIManualConfirmP1_focus");
    if (value === "AOI") {
      setRbtAOI((prevState) => ({
        ...prevState,
        value: true,
      }));
      setRbtSPI((prevState) => ({
        ...prevState,
        value: false,
      }));
    } else if (value === "SPI") {
      setRbtAOI((prevState) => ({
        ...prevState,
        value: false,
      }));
      setRbtSPI((prevState) => ({
        ...prevState,
        value: true,
      }));
    }
  };

  function fnSetFocus(txtField) {
    setTimeout(() => {
      document.getElementById(`${txtField}`).focus();
    }, 0);
  }

  return {
    lblUser1,
    lblResult,
    txtOperatorCode,
    rbtAOIandSPIcheck,
    handleRadioChange,
    txtSerialNo,
    setTxtSerialNo,
    txtSerialNo_TextChanged,
    ddlResult,
    setDdlResult,
    txtCnt,
    btnRetrive_Click,
    BtnSubmit1_Click,
    BtnCancle_Click,
  };
}

export { fn_AOIManualConfirmP1 };
