import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
function fn_SPIAOITimeView() {
  const plantCode = import.meta.env.VITE_FAC;
  const [hfURL, setHfURL] = useState("");
  const [btnRetrive, setBtnRetrive] = useState({
    value: "",
    disbled: "",
    visble: false,
    style: {},
  });
  const [txtAOIMCNo, setTxtAOIMCNo] = useState({
    value: "",
    disbled: "",
    visble: false,
    style: {},
  });
  const [txtSPIMCNo, setTxtSPIMCNo] = useState({
    value: "",
    disbled: "",
    visble: false,
    style: {},
  });
  const [hfPeriod, setHfPeriod] = useState({
    value: "0.2",
    disbled: "",
    visble: false,
    style: {},
  });
  const [hfRow, setHfRow] = useState({
    value: "10",
    disbled: "",
    visble: false,
    style: {},
  });
  const [hfTimeControl, setHfTimeControl] = useState({
    value: "1",
    disbled: "",
    visble: false,
    style: {},
  });
  const [hfSPIPeriod, setHfSPIPeriod] = useState({
    value: "30",
    disbled: "",
    visble: false,
    style: {},
  });
  const [gvData, setGvData] = useState({
    value: [],
    disbled: "",
    visble: false,
    style: {},
  });

  useEffect(() => {
    const fetchData = async () => {
      setHfURL(window.location.href);
      if (txtAOIMCNo.value.trim() !== "" || txtSPIMCNo.value.trim() !== "") {
        setBtnRetrive((prevState) => ({
          ...prevState,
          value: "STOP",
        }));
        setTxtAOIMCNo((prevState) => ({
          ...prevState,
          disbled: true,
        }));
        setTxtSPIMCNo((prevState) => ({
          ...prevState,
          disbled: true,
        }));
        await fnSetPageTimeOut();
        await setGrid();
      } else {
        setBtnRetrive((prevState) => ({
          ...prevState,
          value: "START",
        }));
        setTxtAOIMCNo((prevState) => ({
          ...prevState,
          disbled: false,
        }));
        setTxtSPIMCNo((prevState) => ({
          ...prevState,
          disbled: false,
        }));
      }
    };
    fetchData();
  }, []);
  const btnRetrive_Click = async () => {
    if (
      btnRetrive.value === "START" &&
      (txtAOIMCNo.value !== "" || txtSPIMCNo.value !== "")
    ) {
      setBtnRetrive((prevState) => ({
        ...prevState,
        value: "STOP",
      }));
      setTxtAOIMCNo((prevState) => ({
        ...prevState,
        disbled: true,
      }));
      setTxtSPIMCNo((prevState) => ({
        ...prevState,
        disbled: true,
      }));

      let currentURL = hfURL;
      if (currentURL.includes("?")) {
        currentURL = currentURL.substring(0, currentURL.indexOf("?"));
      }
      setHfURL(
        `${currentURL}?MC=${txtAOIMCNo.value
          .toUpperCase()
          .trim()}&SPIMC=${txtSPIMCNo.value.toUpperCase().trim()}`
      );
      fnSetPageTimeOut();
      setGrid();

      await fnSetPageTimeOut();
      await setGrid();
    } else {
      setBtnRetrive((prevState) => ({
        ...prevState,
        value: "START",
      }));
      setTxtAOIMCNo((prevState) => ({
        ...prevState,
        disbled: false,
      }));
      setTxtSPIMCNo((prevState) => ({
        ...prevState,
        disbled: false,
      }));
      if (currentURL.includes("?")) {
        setHfURL(currentURL.substring(0, currentURL.indexOf("?")));
      }
      fnSetPageTimeOut();
    }
  };
  const fnSetPageTimeOut = async () => {
    const script = document.createElement("script");
    script.innerHTML = "";
    document.body.appendChild(script);
  };
  const setGrid = async () => {
    let dtData = [];
    await axios
      .post("/api/SPIAOITimeView/fnSheetSPIAOITimeData", {
        dataList: {
          strplantcode: plantCode,
          strmachineno: txtAOIMCNo.value,
          strspimachineno: txtSPIMCNo.value,
          strrow: hfRow.value,
          strperiod: hfPeriod.value,
          strcontroltime: hfTimeControl.value,
          strspiperiodtime: hfSPIPeriod.value,
        },
      })
      .then((res) => {
        console.log("fnSheetSPIAOITimeData", res.data);
        dtData = res.data;
        setGvData((prevState) => ({
          ...prevState,
          value: dtData,
          visble: true,
        }));
      });
  };

  return { btnRetrive };
}


export { fn_SPIAOITimeView };
