import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Tag } from "antd";
function fn_LotTraceView() {
  const [txtLotNo, settxtLotNo] = useState("");
  const [txtSheetNo, settxtSheetNo] = useState("");
  const [txtSerialNo, settxtSerialNo] = useState("");
  const [txtProd, settxtProd] = useState("");
  const [lblLotNo, setlblLotNo] = useState("");
  const [OQC, setOQC] = useState("");

  const [txtRollNo, settxtRollNo] = useState({
    text: "",
    url: "",
    visible: "none",
    style: {},
  });
  const [txtNextLotNo, settxtNextLotNo] = useState({
    text: "",
    url: "",
    visible: "none",
    style: {},
  });

  const [txtPreviousLotNo, settxtPreviousLotNo] = useState({
    text: "",
    url: "",
    visible: "none",
    style: {},
  });

  const [lblTitleShtFront, setlblTitleShtFront] = useState({
    text: "Sheet No.(F)",
    value: "",
    visible: "none",
    style: {},
  });

  const [lblTitleShtBack, setlblTitleShtBack] = useState({
    text: "Sheet No.(B))",
    value: "",
    visible: "none",
    style: {},
  });

  const [gvMaterial, setgvMaterial] = useState({
    value: "",
    disbled: "",
    visible: false,
    style: {},
    focus: "",
  });

  const [gvLot, setgvLot] = useState({
    value: "",
    disbled: "",
    visible: false,
    style: {},
    focus: "",
  });

  const [gvRouting, setgvRouting] = useState({
    value: "",
    disbled: "",
    visible: false,
    style: {},
    focus: "",
  });

  const [hplFinalGate, sethplFinalGate] = useState({
    text: "",
    value: "",
    visible: "none",
    style: {},
    url: "",
  });

  const [hplSheetNo, sethplSheetNo] = useState({
    text: "",
    value: "",
    visible: "none",
    style: {},
  });

  const [lbtConnectSht, setlbtConnectSht] = useState({
    text: "",
    value: "",
    visible: "none",
    style: {},
  });

  const [lbtFinalGate, setlbtFinalGate] = useState({
    valueOK: "",
    valueNG: "",
    disabledOK: "",
    disabledNG: "",
    style: {},
  });
  //   txtRollNo  tr1 tr2 gvMaterial lblTitleShtFront lblTitleShtBack
  //
  //Focus
  const fc_txtLotNo = useRef(null);

  //link
  const params = new URLSearchParams(window.location.search);
  const lot = params.get("lot");
  const Fac = import.meta.env.VITE_FAC;
  useEffect(() => {
    if (lot == "" || lot == null || lot == undefined) {
      console.log("lot1", lot);
      // reset()
    } else {
      console.log("lot2", lot);
      settxtLotNo(lot);
      // btnSearch_Click(btnSearch, Nothing)
    }
    fc_txtLotNo.current.focus();
  }, []);

  const btnSearch_Click = async () => {
    let strPrevLot;
    let strNextLot;

    if (txtLotNo != "" || txtSheetNo != "" || txtSerialNo != "") {
      const datalblLot = await setHead();
      
      console.log(datalblLot,"datalblLot");
      await setGrid(datalblLot);
      if (txtPreviousLotNo != "") {
      }
    }
  };

  const reset = async () => {
    settxtProd("_ _ _ _ _ _");
    settxtRollNo((prevState) => ({
      ...prevState,
      text: "_ _ _ _ _ _",
      url: "",
    }));

    settxtNextLotNo((prevState) => ({
      ...prevState,
      text: "_ _ _ _ _ _",
      visible: "ซ่อน",
    }));

    settxtPreviousLotNo((prevState) => ({
      ...prevState,
      visible: "ซ่อน",
    }));
  

    setgvMaterial((prevState) => ({
      ...prevState,
      value: "",
    }));

    setlblTitleShtFront((prevState) => ({
      ...prevState,
      text: "Sheet No.(F)",
      value: "",
      visible: "ซ่อน",
    }));

    setlblTitleShtBack((prevState) => ({
      ...prevState,
      text: "Sheet No.(B)",
      value: "",
      visible: "ซ่อน",
    }));

    sethplFinalGate((prevState) => ({
      ...prevState,
      url: "",
    }));

    sethplSheetNo((prevState) => ({
      ...prevState,
      url: "",
    }));
  };

  const setHead = async () => {
    let datalblLot = "";

    let dt = [];
    if (txtSerialNo != "") {
      let dtLot;
      let StrResult = "";
      let ELT_Count = 0;
      await axios
        .post("/api/ViewTraceLot/GetDataViewLot", {
          txtserialno: txtSerialNo,
          plant_code: Fac,
        })
        .then((res) => {
          dtLot = res.data;
        });
      if (dtLot.length > 0) {
        dtLot = dtLot[0];
        setlblLotNo(dtLot.fgh_lot_no);
        datalblLot = dtLot.fgh_lot_no;

        sethplFinalGate((prevState) => ({
          ...prevState,
          value: txtSerialNo,
          url: "link navigate _blank",
        }));
        if (dtLot.lss_front_sheet_no != dtLot.lss_back_sheet_no) {
          setlblTitleShtFront((prevState) => ({
            ...prevState,
            value: dtLot.lss_front_sheet_no,
            url: "link navigate _blank",
            text: "Sheet No.(F)",
            visible: "โชว์",
          }));
          setlblTitleShtBack((prevState) => ({
            ...prevState,
            value: dtLot.lss_back_sheet_no,
            url: "link navigate _blank",
            text: "Sheet No.(B)",
            visible: "โชว์",
          }));
        } else if (dtLot.lss_front_sheet_no != null) {
          setlblTitleShtFront((prevState) => ({
            ...prevState,
            value: dtLot.lss_front_sheet_no,
            url: "link navigate _blank",
            text: "Sheet No.",
            visible: "โชว์",
          }));
        }
      } else {
        await axios
          .post("/api/ViewTraceLot/GetDataViewLot2", {
            txtserialno: txtSerialNo,
            plant_code: Fac,
          })
          .then((res) => {
            dtLot = res.data;
          });

        if (dtLot.length > 0) {
          dtLot = dtLot[0];
          setlblLotNo(dtLot.lss_lot_no);
          datalblLot = dtLot.lss_lot_no;
          if (dtLot.lss_front_sheet_no != dtLot.lss_back_sheet_no) {
            setlblTitleShtFront((prevState) => ({
              ...prevState,
              value: dtLot.lss_front_sheet_no,
              url: "link navigate _blank",
              text: "Sheet No.(F)",
              visible: "โชว์",
            }));
            setlblTitleShtBack((prevState) => ({
              ...prevState,
              value: dtLot.lss_back_sheet_no,
              url: "link navigate _blank",
              text: "Sheet No.(B)",
              visible: "โชว์",
            }));
          } else if (dtLot.lss_front_sheet_no != null) {
            setlblTitleShtFront((prevState) => ({
              ...prevState,
              value: dtLot.lss_front_sheet_no,
              url: "link navigate _blank",
              text: "Sheet No.",
              visible: "โชว์",
            }));
          }
        }
      }
    } else if (txtSheetNo != "") {
      let dtLot;
      await axios
        .post("/api/ViewTraceLot/GetDataViewLot3", {
          txtsheetno: txtSheetNo,
          plant_code: Fac,
        })
        .then((res) => {
          dtLot = res.data;
        });
      if (dtLot.length > 0) {
        dtLot = dtLot[0];
        setlblLotNo(dtLot.lss_lot_no);
        datalblLot = dtLot.lss_lot_no;
        if (dtLot.lss_front_sheet_no != dtLot.lss_back_sheet_no) {
          setlblTitleShtFront((prevState) => ({
            ...prevState,
            value: dtLot.lss_front_sheet_no,
            url: "link navigate _blank",
            text: "Sheet No.(F)",
            visible: "โชว์",
          }));
          setlblTitleShtBack((prevState) => ({
            ...prevState,
            value: dtLot.lss_back_sheet_no,
            url: "link navigate _blank",
            text: "Sheet No.(B)",
            visible: "โชว์",
          }));
        } else if (dtLot.lss_front_sheet_no != null) {
          setlblTitleShtFront((prevState) => ({
            ...prevState,
            value: dtLot.lss_front_sheet_no,
            url: "link navigate _blank",
            text: "Sheet No.",
            visible: "โชว์",
          }));
        }
      }
    } else if (txtLotNo != "") {
      setlblLotNo(txtLotNo);
      datalblLot = txtLotNo;
    }
    await axios
      .post("/api/Common/fnGetLotData", {
        strLOTNO: datalblLot,
      })
      .then((res) => {
        dt = res.data;
      
      });

    settxtPreviousLotNo((prevState) => ({
      ...prevState,
      visible: "ซ่อน",
    }));

    settxtNextLotNo((prevState) => ({
      ...prevState,
      visible: "ซ่อน",
    }));



    if (dt.length > 0) {
    
      for (let dr = 0; dr < dt.length; dr++) {
     
        if (dt[dr].LOT_PRD_NAME !== null) {
          settxtProd(dr.LOT_PRD_NAME);
        } else {
          settxtProd("");
        }
        if (dt[dr].LOT_ROLL_NO !== null) {
          console.log(dt,'dtdtdtdtdtdt3')
          settxtRollNo((prevState) => ({
            ...prevState,
            value: dt[dr].LOT_ROLL_NO,
            url: "link navigate _blank",
          }));
          let dataGvLot;
          await axios
            .post("/api/Common/fnGetLotData", {
              strLOTNO: datalblLot,
            })
            .then((res) => {
              dataGvLot = res.data;
            });

          setgvLot((prevState) => ({
            ...prevState,
            value: dataGvLot,
            visible: "โชว์",
          }));
        } else {
          settxtRollNo((prevState) => ({
            ...prevState,
            value: "",
            url: "",
          }));
          let dataGvLot;
          await axios
            .post("/api/Common/fnGetLotData", {
              strLOTNO: "",
            })
            .then((res) => {
              dataGvLot = res.data;
              console.log(dataGvLot, "dataGvLot");
            });

          setgvLot((prevState) => ({
            ...prevState,
            value: dataGvLot,
            visible: "โชว์",
          }));
        }
        if (dt[dr].NEXTLOT !== null) {
         
          settxtNextLotNo((prevState) => ({
            ...prevState,
            text: dt[dr].NEXTLOT,
            visible: "โชว์",
          }));


        }
        if (dt[dr].PREVTLOT !== null) {
          settxtPreviousLotNo((prevState) => ({
            ...prevState,
            text: dt[dr].PREVTLOT,
            visible: "โชว์",
          }));
          
        }
      }
    }

    await axios
      .post("/api/Common/fnGetMaterialData", {
        strLOTNO: datalblLot,
      })
      .then((res) => {
        dt = res.data;
      });
    setgvMaterial((prevState) => ({
      ...prevState,
      value: dt,
      visible: "โชว์",
    }));

    if (dt.length > 0) {
      for (let i = 0; i < dt.length; i++) {
        if (dt[i].INVOICE_NO != null) {
          if (!OQC.includes("," + dt[i].INVOICE_NO)) {
            setOQC(OQC + "," + dt[i].INVOICE_NO);
          }
        }
      }
    }
    // lbtConnectSht.Enabled = False กดไม่ได้
    let dtSerailCount = [];
    axios
      .post("/api/Common/getlotserialcountdata", {
        dataList: {
          strLotNo: datalblLot,
          strPlantCode: Fac,
        },
      })
      .then((res) => {
        dtSerailCount = res.data;
        console.log(dtSerailCount.length, "dtSerailCount");
      });
    let dataConnectSht = 0;
    if (dtSerailCount.length > 0) {
      dataConnectSht = dtSerailCount[0]?.count_sht.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
    } else {
      dataConnectSht = "0";
    }

    setlbtConnectSht((prevState) => ({
      ...prevState,
      value: dataConnectSht,
      disabled: dataConnectSht !== "0" ? "กดได้" : "กดไม่ได้",
    }));
    let dtFinalGate = [];
    let dataOK;
    let dataNG;
    axios
      .post("/api/ViewTraceLot/fnlotresultfinalgatedata", {
        strlotno: datalblLot,
        strplantcode: Fac,
      })
      .then((res) => {
        dtFinalGate = res.data;
        console.log(dtFinalGate, "dtFinalGate");
      });
    if (dtFinalGate.length > 0) {
      dataOK = dtFinalGate[0]?.final_ok.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
      dataNG = dtFinalGate[0]?.final_ng.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
    } else {
      dataOK = "0";
      dataNG = "0";
    }
    setlbtFinalGate((prevState) => ({
      ...prevState,
      value: dataConnectSht,
      disabledOK: dataOK !== "0" ? "กดได้" : "กดไม่ได้",
      disabledNG: dataNG !== "0" ? "กดได้" : "กดไม่ได้",
    }));


    console.log('retiurn2',datalblLot)


    

    return datalblLot;
  };

  const setGrid = async (datalblLot) => {
    await axios
      .post("/api/Common/fnGetLotProcessDetailData", {
        strLOTNO: datalblLot,
      })
      .then((res) => {
        setgvRouting((prevState) => ({
          ...prevState,
          value: res.data,
          visible: "โชว์",
        }));
      });
    // gvProcessLink.DataSource = BIZ_LotTraceView.fnGetProcessLinkData(lblLotNo.Text.Trim.ToUpper)
    // gvProcessLink.DataBind()    not have table''''trc_PROC_TRACE_REPORT''''
  };
  return {
    settxtLotNo,
    txtLotNo,
    fc_txtLotNo,
    btnSearch_Click,
    gvLot,
    gvMaterial,
    gvRouting,
  };
}

export { fn_LotTraceView };
