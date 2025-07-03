import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import { DataConfig } from "../Common/function_Common";
function fn_ScanSheetMOTTime() {
  const { ConfigData } = DataConfig();
  const [txtlot, settxtlot] = useState({
    value: "",
    disbled: "",
    visble: "",
    style: {},
    focus: false,
  });
  const [txtSheet, settxtSheet] = useState({
    value: "",
    disbled: "",
    visble: "",
    style: {},
    focus: false,
  });
  const [txtMCNo, settxtMCNo] = useState({
    value: "",
    disbled: "",
    visble: "",
    style: {},
    focus: false,
  });
  const [txtCBNo, settxtCBNo] = useState({
    value: "",
    disbled: "",
    visble: "none",
    style: {},
    focus: false,
  });
  const [txtSUSNo, settxtSUSNo] = useState({
    value: "",
    disbled: "",
    visble: "none",
    style: {},
    focus: false,
  });

  const [lblProductName, setlblProductName] = useState("");
  const [lblSheet, setlblSheet] = useState("");
  const [lblRemark, setlblRemark] = useState("");
  const [lblResult, setlblResult] = useState({
    value: "",
    disbled: "",
    visble: "",
    style: {},
  });

  //Button
  const [pnlSave, setpnlSave] = useState("none");

  //hf
  const [hfCheckPrdSht, sethfCheckPrdSht] = useState("");
  const [hfCheckPrdShtStart, sethfCheckPrdShtStart] = useState("");
  const [hfCheckPrdShtEnd, sethfCheckPrdShtEnd] = useState("");
  const [hfCheckPrdAbbr, sethfCheckPrdAbbr] = useState("");
  const [hfConnLeafLength, sethfConnLeafLength] = useState("");

  //time
  const currentTime = new Date().toLocaleTimeString("en-GB", { hour12: false });

  //Focus
  let fctxtMcNo = useRef([]);
  let fctxtLotno = useRef([]);
  let fctxtSheetNo = useRef([]);
  let fctxtSUSNo = useRef([]);
  let fctxtCBNo = useRef([]);

  //link
  const params = new URLSearchParams(window.location.search);
  const url = window.location.href;
  const partweb = url.split("/")[4].split("?")[0];

  const CB = params.get("CB");
  const SUS = params.get("SUS");
  let hfZPRNProcID = "";

  if (partweb.toUpperCase() == "ScanSheetMOTTime") {
    hfZPRNProcID = ConfigData.hfZPRNProcID_MOT1;
  } else if (partweb.toUpperCase() == "ScanSheetMOTTime2") {
    hfZPRNProcID = ConfigData.hfZPRNProcID_MOT2;
  }
  const Fac = ConfigData.FACTORY;
  const VITE_FINAL_GATE_AUTO_PRD = import.meta.env.VITE_FINAL_GATE_AUTO_PRD;

  useEffect(() => {
    document.getElementById("txtMCNo").value='';
    document.getElementById("txtLotNo").value='';
    document.getElementById("txtSheetNo").value='';
    settxtMCNo((prevState) => ({
      ...prevState,
      value: "",
      disbled: false,
      focus: true,
    }));
    settxtlot((prevState) => ({
      ...prevState,
      value: "",
      disbled: true,
      style: { background: "#e0e0e0" },
    }));
    settxtSheet((prevState) => ({
      ...prevState,
      value: "",
      disbled: true,
      style: { background: "#e0e0e0" },
    }));

    setlblRemark("");
    setlblSheet("");
    setlblResult((prevState) => ({ ...prevState, value: "" }));
    /// pnlMain.Enabled = True

    setpnlSave("none");
    if (CB != null) {
      if (CB.toUpperCase() == "Y") {
            document.getElementById("txtCBNo").value='';

        settxtCBNo((prevState) => ({
          ...prevState,
          value: "",
          disbled: true,
          visble: "",
          style: { background: "#e0e0e0" },
        }));
      } else {
        settxtCBNo((prevState) => ({ ...prevState, visble: "none" }));
      }
    }

    if (SUS != null) {
      if (SUS.toUpperCase() == "Y") {
         document.getElementById("txtSUSNo").value='';
        settxtSUSNo((prevState) => ({
          ...prevState,
          value: "",
          disbled: true,
          visble: "",
          style: { background: "#e0e0e0" },
        }));
      } else {
        settxtSUSNo((prevState) => ({ ...prevState, visble: "none" }));
      }
    }

    setTimeout(() => {
      fctxtMcNo.current.focus();
    }, 300);
  }, []);

  const txtMCNo_TextChanged = async () => {
    const MotMachince = document.getElementById("txtMCNo").value;
    // alert("txtMCNo_TextChanged: " + MotMachince);
    document.getElementById("txtSheetNo").value='';
    settxtSheet((prevState) => ({
      ...prevState,
      value: "",
      disbled: true,
      style: { background: "#e0e0e0" },
    }));
    settxtlot((prevState) => ({
      ...prevState,
      disbled: false,
      style: { background: "" },
    }));
    if (txtCBNo.visble) {
      document.getElementById("txtCBNo").value='';
      settxtCBNo((prevState) => ({
        ...prevState,
        disbled: true,
        value: "",
        style: { background: "#e0e0e0" },
      }));
    }
    if (txtSUSNo.visble == "") {
      document.getElementById("txtSUSNo").value='';
      settxtSUSNo((prevState) => ({
        ...prevState,
        disbled: true,
        value: "",
        style: { background: "#e0e0e0" },
      }));
    }
    if (MotMachince != "") {
      // alert("txtMCNo_TextChanged: " + MotMachince);
      setTimeout(() => {
        fctxtLotno.current.focus();
      }, 0);
    }
  };

  const txtLotNo_TextChanged = async () => {
    const txtlot = document.getElementById("txtLotNo").value;
    setlblProductName("");
    setlblRemark("");
    setlblResult((prevState) => ({ ...prevState, value: "" }));
    setlblSheet("");
    let dtProductSerial;

    if (txtlot != "") {
      let _strPrdName = "";
      let _strLot = "";
      let _strLotAll = txtlot.toUpperCase().split(";");
      _strLot = _strLotAll[0];
      await axios
        .post("/api/Common/GetProductNameByLot", {
          strLot: _strLot,
        })
        .then((res) => {
          _strPrdName = res.data.prdName;
        });

      if (_strPrdName != "") {
        setlblProductName(_strPrdName);
        await axios
          .post("/api/common/GetSerialProductByProduct", {
            prdName: _strPrdName[0],
          })
          .then((res) => {
            dtProductSerial = res.data[0];
          });
        if (dtProductSerial != null) {
          sethfCheckPrdSht(dtProductSerial.prm_req_check_prd_sht);
          sethfCheckPrdShtStart(dtProductSerial.prm_check_prd_sht_start);
          sethfCheckPrdShtEnd(dtProductSerial.prm_check_prd_sht_end);
          sethfCheckPrdAbbr(dtProductSerial.prm_abbr);
          sethfConnLeafLength(dtProductSerial.prm_conn_leaf_length);
        }
         document.getElementById("txtLotNo").value=_strLot;
        settxtlot((prevState) => ({
          ...prevState,
          value: _strLot,
          disbled: true,
          style: { background: "#e0e0e0" },
        }));

        settxtMCNo((prevState) => ({
          ...prevState,
          disbled: true,
          style: { background: "#e0e0e0" },
        }));
 document.getElementById("txtSheetNo").value='';
        settxtSheet((prevState) => ({
          ...prevState,
          disbled: false,
          style: { background: "" },
          value: "",
        }));

        if (txtCBNo.visble == "") {
           document.getElementById("txtCBNo").value='';
          settxtCBNo((prevState) => ({
            ...prevState,
            disbled: false,
            style: { background: "" },
            value: "",
          }));
        }
        if (txtSUSNo.visble == "") {
          
          settxtSUSNo((prevState) => ({
            ...prevState,
            disbled: false,
            style: { background: "" },
          }));
        }
        document.getElementById("txtSUSNo").value='';
        settxtSUSNo((prevState) => ({
          ...prevState,
          value: "",
        }));
        settxtSheet((prevState) => ({
          ...prevState,
          focus: true,
        }));
        setTimeout(() => {
          fctxtSheetNo.current.focus();
        }, 300);
      } else {
        document.getElementById("txtLotNo").value='';
        settxtlot((prevState) => ({ ...prevState, value: "", focus: true }));
        setTimeout(() => {
          fctxtLotno.current.focus();
        }, 300);
      }
    }
  };

  const txtSheetNo_TextChanged = async () => {
    const txtSheet = document.getElementById("txtSheetNo").value;
    const txtlot = document.getElementById("txtLotNo").value;
    const txtMCNo = document.getElementById("txtMCNo").value;
    if (txtSheet != "") {
      let strError = "";
      let strStatus = "";
      let rowCount = 0;
      setlblRemark("");
      setpnlSave("none");
      if (hfCheckPrdSht == "Y") {
        const sheetNo = txtSheet.trim().toUpperCase();
        const midValue = sheetNo.substring(
          parseInt(hfCheckPrdShtStart) - 1,
          parseInt(hfCheckPrdShtEnd)
        );
        if (hfCheckPrdAbbr !== midValue) {
          strStatus = "F";
          strError = "Sheet product mix";
        }
      }

      const connLeafLength = parseInt(hfConnLeafLength);
      const sheetLength = txtSheet.trim().toUpperCase().length;

      if (
        connLeafLength > 0 &&
        connLeafLength !== sheetLength &&
        strStatus == "F"
      ) {
        strStatus = "F";
        strError = "Invalid sheet length";
      }
      if (strStatus != "F") {
        if (txtCBNo.visble == "") {
           document.getElementById("txtCBNo").value='';
          settxtCBNo((prevState) => ({
            ...prevState,
            disbled: false,
            style: { background: "" },
            value: "",
          }));
          settxtSheet((prevState) => ({
            ...prevState,
            disbled: true,
            style: { background: "#e0e0e0" },
          }));
          fctxtCBNo.current.focus();
        } else if (txtSUSNo.visble == "") {
           document.getElementById("txtSUSNo").value='';
          settxtSUSNo((prevState) => ({
            ...prevState,
            disbled: false,
            value: "",
            style: { background: "" },
          }));

          fctxtSUSNo.current.focus();
        } else {
          await axios
            .post("/api/GetMOTRecordTimeData", {
              dataList: {
                strSheetNo: txtSheet,
                strProcId: hfZPRNProcID,
                strPlantCode: Fac,
              },
            })
            .then((res) => {
              rowCount = res.data;
            });

          if (rowCount == 0) {
            setTimeout(() => {
              fctxtSheetNo.current.focus();
            }, 300);
            setlblRemark("");
            await axios
              .post("/api/CallFPCSheetLeadTimeResult", {
                LotNo: txtlot,
                PROC_ID: hfZPRNProcID,
                SHT_NO: txtSheet,
                MACHINE_NO: txtMCNo,
                PROGRAM: "frm_ScanSheetMOTTime",
                CB_NO: "",
                SUS_NO: "",
                strStatus: strStatus,
              })
              .then((res) => {
                strError = res.data.strReturn;
                strStatus = res.data.strStatus;
              });
            setlblSheet(txtSheet + " [" + currentTime + "] Save Success");
            setlblRemark(strError);
            if (strStatus == "P") {
              setlblResult((prevState) => ({
                ...prevState,
                value: "OK",
                style: { color: "#fff", background: "green" },
              }));
            } else {
              setlblResult((prevState) => ({
                ...prevState,
                value: "NG",
                style: { color: "#fff", background: "red" },
              }));
            }
          } else {
            setlblSheet(txtSheet);
            setpnlSave("");
            setlblResult("");
            setlblRemark("Exists record time,\nPlease be confirm.");
            setlblResult((prevState) => ({
              ...prevState,
              style: { color: "black", background: "yellow" },
            }));
          }
          document.getElementById("txtSheetNo").value='';
          settxtSheet((prevState) => ({
            ...prevState,
            disbled: false,
            style: { background: "" },
            value: "",
          }));
          fctxtSheetNo.current.blur(); //cancel focus
        }
      } else {
        setlblResult((prevState) => ({
          ...prevState,
          value: "NG",
          style: { color: "#fff", background: "red" },
        }));
        setlblRemark(strError);
        document.getElementById("txtSheetNo").value='';
        settxtSheet((prevState) => ({
          ...prevState,
          disbled: false,
          style: { background: "" },
          value: "",
        }));

        setTimeout(() => {
          fctxtSheetNo.current.focus();
        }, 300);
      }
    } else {
      document.getElementById("txtSheetNo").value='';
      settxtSheet((prevState) => ({
        ...prevState,
        disbled: false,
        style: { background: "" },
        value: "",
      }));
    }
  };

  const txtCBNo_TextChanged = async () => {
    const txtSheet = document.getElementById("txtSheetNo").value;
    const txtCBNo = document.getElementById("txtCBNo").value;
    const txtlot = document.getElementById("txtLotNo").value;
    const txtMCNo = document.getElementById("txtMCNo").value;
    if (txtSheet != "" && txtCBNo != "") {
      settxtCBNo((prevState) => ({
        ...prevState,
        disbled: true,
        style: { background: "#e0e0e0" },
      }));

      let strError = "";
      let strStatus = "";
      let rowCount = 0;
      setlblRemark("");
      setpnlSave("none");
      if (hfCheckPrdSht == "Y") {
        const sheetNo = txtSheet.trim().toUpperCase();
        const start = parseInt(hfCheckPrdShtStart, 10);
        const end = parseInt(hfCheckPrdShtEnd, 10);

        const extractedValue = sheetNo.substring(start - 1, end);

        if (hfCheckPrdAbbr !== extractedValue) {
          strStatus = "F";
          strError = "Sheet product mix";
        }
      }

      const connLeafLength = parseInt(hfConnLeafLength, 10);
      const sheetNoLength = txtSheet.trim().toUpperCase().length;

      if (
        connLeafLength > 0 &&
        connLeafLength !== sheetNoLength &&
        strStatus !== "F"
      ) {
        strStatus = "F";
        strError = "Invalid sheet length";
      }
      if (strStatus != "F") {
     
        if (txtSUSNo.visble == "") {
             document.getElementById("txtSUSNo").value='';
          settxtSUSNo((prevState) => ({
            ...prevState,
            disbled: false,
            value: "",
            style: { background: "" },
          }));

          fctxtSUSNo.current.focus();
        } else {
          await axios
            .post("/api/GetMOTRecordTimeData", {
              dataList: {
                strSheetNo: txtSheet,
                strProcId: hfZPRNProcID,
                strPlantCode: Fac,
              },
            })
            .then((res) => {
              rowCount = res.data;
            });

          if (rowCount == 0) {
            setlblRemark("");
            await axios
              .post("/api/CallFPCSheetLeadTimeResult", {
                LotNo: txtlot,
                PROC_ID: hfZPRNProcID,
                SHT_NO: txtSheet,
                MACHINE_NO: txtMCNo,
                PROGRAM: "frm_ScanSheetMOTTime",
                CB_NO: txtCBNo,
                SUS_NO: "",
                strStatus: strStatus,
              })
              .then((res) => {
                strError = res.data.strReturn;
                strStatus = res.data.strStatus;
              });

            setlblSheet(txtSheet + " [" + currentTime + "] Save Success");
            setlblRemark(strError);
            if (strStatus == "P") {
              setlblResult((prevState) => ({
                ...prevState,
                value: "OK",
                style: { color: "#fff", background: "green" },
              }));
            } else {
              setlblResult((prevState) => ({
                ...prevState,
                value: "NG",
                style: { color: "#fff", background: "red" },
              }));
            }
          } else {
            setlblSheet(txtSheet);
            setpnlSave("");
            /// pnlMain.Enabled = False
            setlblResult("");
            setlblRemark("Exists record time,\nPlease be confirm.");
            setlblResult((prevState) => ({
              ...prevState,
              style: { color: "Black", background: "yellow" },
            }));
          }
             document.getElementById("txtSheetNo").value='';
          settxtSheet((prevState) => ({
            ...prevState,
            disbled: false,
            style: { background: "" },
            value: "",
          }));
          document.getElementById("txtCBNo").value='';
          settxtCBNo((prevState) => ({
            ...prevState,
            value: "",
            disbled: false,
            style: { background: "" },
          }));
          fctxtCBNo.current.blur();
        }
      } else {
        setlblResult((prevState) => ({
          ...prevState,
          value: "NG",
          style: { color: "#fff", background: "red" },
        }));
        setlblRemark(strError);
        document.getElementById("txtSheetNo").value='';
        settxtSheet((prevState) => ({
          ...prevState,
          disbled: false,
          style: { background: "" },
          value: "",
        }));
        setTimeout(() => {
          fctxtSheetNo.current.focus();
        }, 300);
      }
    } else {
       document.getElementById("txtSheetNo").value='';
      settxtSheet((prevState) => ({
        ...prevState,
        disbled: false,
        style: { background: "" },
        value: "",
      }));

      setTimeout(() => {
        fctxtSheetNo.current.focus();
      }, 300);
    }
  };

  const txtSUSNo_TextChanged = async () => {
    const txtSheet = document.getElementById("txtSheetNo").value;
    const txtCBNo = document.getElementById("txtCBNo").value;
    const txtSUSNo = document.getElementById("txtSUSNo").value;
    const txtlot = document.getElementById("txtLotNo").value;
    if (txtSheet != "" && txtCBNo != "") {
      settxtSUSNo((prevState) => ({
        ...prevState,
        disbled: true,
        style: { background: "#e0e0e0" },
      }));
      let strError = "";
      let strStatus = "";
      let rowCount = 0;
      setlblRemark("");
      setpnlSave("none");
      if (hfCheckPrdSht == "Y") {
        const sheetNo = txtSheet.trim().toUpperCase();
        const start = parseInt(hfCheckPrdShtStart, 10);
        const end = parseInt(hfCheckPrdShtEnd, 10);

        const extractedValue = sheetNo.substring(start - 1, end);

        if (hfCheckPrdAbbr !== extractedValue) {
          strStatus = "F";
          strError = "Sheet product mix";
        }
      }

      const connLeafLength = parseInt(hfConnLeafLength, 10);
      const sheetNoLength = txtSheet.trim().toUpperCase().length;

      if (
        connLeafLength > 0 &&
        connLeafLength !== sheetNoLength &&
        strStatus !== "F"
      ) {
        strStatus = "F";
        strError = "Invalid sheet length";
      }
      if (strStatus != "F") {
        await axios
          .post("/api/GetMOTRecordTimeData", {
            dataList: {
              strSheetNo: txtSheet,
              strProcId: hfZPRNProcID,
              strPlantCode: Fac,
            },
          })
          .then((res) => {
            rowCount = res.data;
          });

        if (rowCount == 0) {
          setlblRemark("");
          await axios
            .post("/api/CallFPCSheetLeadTimeResult", {
              LotNo: txtlot,
              PROC_ID: hfZPRNProcID,
              SHT_NO: txtSheet,
              MACHINE_NO: txtMCNo,
              PROGRAM: "frm_ScanSheetMOTTime",
              CB_NO: txtCBNo,
              SUS_NO: txtSUSNo,
              strStatus: strStatus,
            })
            .then((res) => {
              strError = res.data.strReturn;
              strStatus = res.data.strStatus;
            });

          setlblSheet(txtSheet + " [" + currentTime + "] Save Success");
          setlblRemark(strError);
          if (strStatus == "P") {
            setlblResult((prevState) => ({
              ...prevState,
              value: "OK",
              style: { color: "#fff", background: "green" },
            }));
          } else {
            setlblResult((prevState) => ({
              ...prevState,
              value: "NG",
              style: { color: "#fff", background: "red" },
            }));
          }
          setTimeout(() => {
            fctxtSheetNo.current.focus();
          }, 300);
        } else {
          setlblSheet(txtSheet);
          setpnlSave("");
          setlblResult("");
          setlblRemark("Exists record time,\nPlease be confirm.");
          setlblResult((prevState) => ({
            ...prevState,
            style: { color: "black", background: "yellow" },
          }));
        }
        document.getElementById("txtSheetNo").value='';
        settxtSheet((prevState) => ({
          ...prevState,
          disbled: false,
          style: { background: "" },
          value: "",
        }));
        document.getElementById("txtCBNo").value='';
        settxtCBNo((prevState) => ({
          ...prevState,
          value: "",
          disbled: false,
          style: { background: "" },
        }));
        document.getElementById("txtSUSNo").value='';
        settxtSUSNo((prevState) => ({
          ...prevState,
          value: "",
          disbled: false,
          style: { background: "" },
        }));
        // fctxtSheetNo.current.blur();
        fctxtSUSNo.current.blur();
      } else {
        setlblResult((prevState) => ({
          ...prevState,
          value: "NG",
          style: { color: "#fff", background: "red" },
        }));
        setlblRemark(strError);
        document.getElementById("txtSheetNo").value='';
        settxtSheet((prevState) => ({
          ...prevState,
          disbled: false,
          style: { background: "" },
          value: "",
        }));
        document.getElementById("txtCBNo").value='';
        settxtCBNo((prevState) => ({
          ...prevState,
          value: "",
          disbled: false,
          style: { background: "" },
        }));
        document.getElementById("txtSUSNo").value='';
        settxtSUSNo((prevState) => ({
          ...prevState,
          value: "",
          disbled: false,
          style: { background: "" },
        }));
        setTimeout(() => {
          fctxtSheetNo.current.focus();
        }, 300);
      }
    } else {
       document.getElementById("txtSheetNo").value='';
      settxtSheet((prevState) => ({
        ...prevState,
        disbled: false,
        style: { background: "" },
        value: "",
      }));
       document.getElementById("txtCBNo").value='';
      settxtCBNo((prevState) => ({
        ...prevState,
        value: "",
        disbled: false,
        style: { background: "" },
      }));
       document.getElementById("txtSUSNo").value='';
      settxtSUSNo((prevState) => ({
        ...prevState,
        value: "",
        disbled: false,
        style: { background: "" },
      }));
      setTimeout(() => {
        fctxtSheetNo.current.focus();
      }, 300);
    }
  };

  const BtClick_back = async () => {
    setpnlSave("none");

    setlblSheet("");
    setlblRemark("");
    settxtSheet((prevState) => ({ ...prevState, value: "" }));
    setlblResult((prevState) => ({ ...prevState, value: "" }));
     document.getElementById("txtLotNo").value='';
    settxtlot((prevState) => ({
      ...prevState,
      disbled: false,
      style: { background: "" },
      value: "",
    }));
document.getElementById("txtMCNo").value='';
    settxtMCNo((prevState) => ({
      ...prevState,
      disbled: false,
      style: { background: "" },
      value: "",
    }));
document.getElementById("txtSheetNo").value='';
    settxtSheet((prevState) => ({
      ...prevState,
      disbled: true,
      style: { background: "#e0e0e0" },
      value: "",
    }));

    if (txtCBNo.visble == "") {
      document.getElementById("txtCBNo").value='';
      settxtCBNo((prevState) => ({
        ...prevState,
        disbled: true,
        style: { background: "#e0e0e0" },
        value: "",
      }));
    }
    if (txtSUSNo.visble == "") {
       document.getElementById("txtSUSNo").value='';
      settxtSUSNo((prevState) => ({
        ...prevState,
        disbled: true,
        style: { background: "#e0e0e0" },
      }));
    }
    setlblProductName("");
    setTimeout(() => {
      fctxtMcNo.current.focus();
    }, 300);
  };

  const BtClick_Cancel = async () => {
    setpnlSave("none");
    /// pnlMain.Enabled = True
    setlblSheet("");
    setlblRemark("");
    settxtSheet((prevState) => ({ ...prevState, value: "" }));
    setlblResult((prevState) => ({ ...prevState, value: "" }));

    if (txtCBNo.visble == "") {
       document.getElementById("txtCBNo").value='';
      settxtCBNo((prevState) => ({
        ...prevState,
        disbled: false,
        style: { background: "" },
        value: "",
      }));
    }
    if (txtSUSNo.visble == "") {
       document.getElementById("txtSUSNo").value='';
      settxtSUSNo((prevState) => ({
        ...prevState,
        disbled: false,
        style: { background: "" },
        value: "",
      }));
    }
    setTimeout(() => {
      fctxtSheetNo.current.focus();
    }, 300);
  };

  const BtClick_Replace = async () => {
    const txtlot = document.getElementById("txtLotNo").value;
    const txtMCNo = document.getElementById("txtMCNo").value;
    setTimeout(() => {
      fctxtSheetNo.current.focus();
    }, 300);
    let strError = "";
    let strStatus = "";

    await axios
      .post("/api/CallFPCSheetLeadTimeResult", {
        LotNo: txtlot,
        PROC_ID: hfZPRNProcID,
        SHT_NO: lblSheet,
        MACHINE_NO: txtMCNo,
        PROGRAM: "frm_ScanSheetMOTTime",
        CB_NO: "",
        SUS_NO: "",
        strStatus: strStatus,
      })
      .then((res) => {
        strError = res.data.strReturn;
        strStatus = res.data.strStatus;
      });
    setlblSheet(lblSheet + " [" + currentTime + "] Replace Success");
    setlblRemark(strError);

    setpnlSave("none");
    /// pnlMain.Enabled = True
    if (strStatus == "P") {
      setlblResult((prevState) => ({
        ...prevState,
        style: { color: "#fff", background: "green" },
        value: "OK",
      }));
    } else {
      setlblResult((prevState) => ({
        ...prevState,
        style: { color: "#fff", background: "red" },
        value: "NG",
      }));
    }
    setpnlSave("none");
    /// pnlMain.Enabled = True
     document.getElementById("txtSheetNo").value='';
    settxtSheet((prevState) => ({
      ...prevState,
      value: "",
    }));
    if (txtCBNo.visble == "") {
      document.getElementById("txtCBNo").value='';
      settxtCBNo((prevState) => ({
        ...prevState,
        disbled: false,
        style: { background: "" },
        value: "",
      }));
    }
    if (txtSUSNo.visble == "") {
      document.getElementById("txtSUSNo").value='';
      settxtSUSNo((prevState) => ({
        ...prevState,
        disbled: false,
        style: { background: "" },
        value: "",
      }));
    }

    setTimeout(() => {
      fctxtSheetNo.current.focus();
    }, 300);
  };

  const BtClick_Delete = async () => {
    let strError = "";
    let strStatus = "";
    Swal.fire({
      title: "Are you sure to Delete this Data?",
      // text: "Are you sure to Delete this Data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios
          .post("/api/DeleteMOTRecordTimeData", {
            data: {
              _strPlantCode: Fac,
              _strSheetNo: lblSheet,
              _strProcID: hfZPRNProcID,
            },
          })
          .then((res) => {
            strError = res.data.p_error;
          });
        setlblSheet(lblSheet + " Delete Success");
        setlblRemark(strError);
        setpnlSave("none");
        settxtSheet((prevState) => ({
          ...prevState,
          value: "",
        }));
        if (txtCBNo.visble == "") {
           document.getElementById("txtCBNo").value='';
          settxtCBNo((prevState) => ({
            ...prevState,
            disbled: false,
            style: { background: "" },
            value: "",
          }));
        }
        if (txtSUSNo.visble == "") {
           document.getElementById("txtSUSNo").value='';
          settxtSUSNo((prevState) => ({
            ...prevState,
            disbled: false,
            style: { background: "" },
            value: "",
          }));
        }
        Swal.fire({
          title: "Delete Success!",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }
      setTimeout(() => {
        fctxtSheetNo.current.focus();
      }, 300);
    });

    setTimeout(() => {
      fctxtSheetNo.current.focus();
    }, 300);
  };

  return {
    txtLotNo_TextChanged,
    settxtlot,
    txtlot,
    lblProductName,
    lblResult,
    lblSheet,
    lblRemark,
    txtSheetNo_TextChanged,
    settxtSheet,
    txtSheet,
    settxtMCNo,
    txtMCNo,
    txtMCNo_TextChanged,
    fctxtMcNo,
    fctxtLotno,
    fctxtSheetNo,
    BtClick_back,
    BtClick_Cancel,
    BtClick_Delete,
    BtClick_Replace,
    txtCBNo,
    txtSUSNo,
    fctxtCBNo,
    fctxtSUSNo,
    settxtCBNo,
    settxtSUSNo,
    txtCBNo_TextChanged,
    txtSUSNo_TextChanged,
    pnlSave,
  };
}

export { fn_ScanSheetMOTTime };
