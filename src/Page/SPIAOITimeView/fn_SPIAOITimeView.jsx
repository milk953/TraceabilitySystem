import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Table, TableCell, TableBody, TableRow, Grid } from "@mui/material";
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
      console.log("window.location.href : ( ", window.location.href, " )");
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
    console.log(
      "เข้ามายัง btnRetrive_Click",
      txtAOIMCNo.value,
      txtSPIMCNo.value
    );
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
      let currentURL = hfURL;
      if (currentURL.includes("?")) {
        setHfURL(currentURL.substring(0, currentURL.indexOf("?")));
      }
      fnSetPageTimeOut();
    }
  };
  const fnSetPageTimeOut = async () => {
    console.log("เข้ามายัง fnSetPageTimeOut");
    const script = document.createElement("script");
    script.innerHTML = "";
    document.body.appendChild(script);
  };
  const setGrid = async () => {
    console.log("เข้ามายัง setGrid");
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

  const columns = [
    {
      title: (
        <div
          style={{
            fontSize: "22px",
            backgroundColor: "#336699",
            color: "#ffffff",
            padding: 0,
            margin: 0,
            borderTopLeftRadius: "4px",
          }}
        >
          No.
        </div>
      ),
      dataIndex: "sheet_seq",
      key: "No.",
      onCell: () => ({
        style: {
          padding: 0,
        },
      }),
      onHeaderCell: () => ({
        style: {
          padding: 0,
        },
      }),
      render: (text, record, index) => {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
              width: "100%",
              height: "70px",
              backgroundColor: record.sheet_seq === 1 ? "LightYellow" : "Azure",
              // border: "1px solid #000000",
              borderBlockEnd: "1px solid #000000",
              borderLeft: "1px solid #000000",
              // borderBlockStart: "1px solid #000000",
              // borderRight: "1px solid #000000",
            }}
          >
            <div
              style={{
                fontWeight: "bold",
                fontSize: "20px",
                color: "#000000",
                width: "100%",
              }}
            >
              {text}
            </div>
          </div>
        );
      },
      align: "center",
      width: "10%",
    },
    {
      title: (
        <div
          style={{
            fontSize: "22px",
            backgroundColor: "#336699",
            color: "#ffffff",
            padding: "0px",
            margin: "0px",
          }}
        >
          Sheet No.
        </div>
      ),
      key: "Sheet No.",
      dataIndex: "sheet_no",
      align: "center",
      width: "75%",
      onCell: () => ({
        style: {
          padding: 0,
        },
      }),
      onHeaderCell: () => ({
        style: {
          padding: 0,
        },
      }),
      render: (text, record, index) => {
        return (
          <div
            style={{
              height: "70px",
              padding: "0px",
              width: "100%",
              backgroundColor: record.sheet_seq === 1 ? "LightYellow" : "Azure",
              borderBlockEnd: "1px solid #000000",
              borderLeft: "1px solid #000000",
            }}
          >
            <div
              style={{
                fontWeight: "bold",
                fontSize: "26px",
                color: "#336699",
                width: "100%",
                borderBlockEnd: "1px solid #000000",
              }}
            >
              <Grid container spacing={0} alignItems="center">
                <Grid item xs={12} md={12} align="left">
                  <span
                    style={{
                      color:
                        record.time_result === "OK" ? "#059212" : "#E0282E",
                    }}
                  >
                    &nbsp;&nbsp;{text}
                  </span>
                </Grid>
              </Grid>
            </div>
            <div style={{ width: "100%", fontWeight: 500, }}>
              <Grid container spacing={0} alignItems="center">
                <Grid
                  item
                  xs={1}
                  md={1}
                  align="left"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    borderRight: "1px solid #000000",
                  }}
                >
                  <span style={{ fontSize: "20px", color: "#660066" }}>
                    SPI :
                  </span>
                </Grid>
                <Grid
                  item
                  xs={4}
                  md={4}
                  align="left"
                  style={{
                    borderRight: "1px solid #000000",
                  }}
                >
                  <span style={{ fontSize: "20px", color: "#660066" }}>
                    &nbsp;&nbsp;{record.spi_time}
                  </span>
                </Grid>
                <Grid
                  item
                  xs={1}
                  md={1}
                  align="left"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    borderRight: "1px solid #000000",
                  }}
                >
                  <span style={{ fontSize: "20px", color: "#003366" }}>
                    AOI :
                  </span>
                </Grid>
                <Grid
                  item
                  xs={4}
                  md={4}
                  align="left"
                  style={{
                    borderRight: "1px solid #000000",
                  }}
                >
                  <span style={{ fontSize: "20px", color: "#003366" }}>
                    &nbsp;&nbsp;{record.aoi_time}
                  </span>
                </Grid>
                <Grid item xs={2} md={2} align="center">
                  <span
                    style={{
                      fontSize: "20px",
                      color:
                        record.time_result === "OK" ? "#059212" : "#E0282E",
                    }}
                  >
                    {record.total_time}
                  </span>
                </Grid>
              </Grid>
            </div>
          </div>
        );
      },
    },
    {
      title: (
        <div
          style={{
            fontSize: "22px",
            backgroundColor: "#336699",
            color: "#ffffff",
            padding: "0px",
            margin: "0px",
            borderTopRightRadius: "4px",
          }}
        >
          Result
        </div>
      ),
      key: "Time Result",
      dataIndex: "time_result",
      align: "center",
      width: "15%",
      onCell: () => ({
        style: {
          padding: 0,
        },
      }),
      onHeaderCell: () => ({
        style: {
          padding: 0,
        },
      }),
      render: (text, record, index) => {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "70px",
              padding: "0px",
              width: "100%",
              backgroundColor: record.sheet_seq === 1 ? "LightYellow" : "Azure",
              borderBlockEnd: "1px solid #000000",
              borderLeft: "1px solid #000000",
              borderRight: "1px solid #000000",
            }}
          >
            <div
              style={{
                fontSize: "30px",
                fontWeight: "bold",
                color: "#000000",
                padding: "0px",
                color: text === "OK" ? "#059212" : "#E0282E",
              }}
            >
              {text}
            </div>
          </div>
        );
      },
    },
  ];

  return {
    btnRetrive,
    columns,
    gvData,
    btnRetrive_Click,
    txtSPIMCNo,
    setTxtSPIMCNo,
    txtAOIMCNo,
    setTxtAOIMCNo,
  };
}

export { fn_SPIAOITimeView };
