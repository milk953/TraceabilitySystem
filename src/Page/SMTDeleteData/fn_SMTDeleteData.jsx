import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import swal from "sweetalert";

function fn_SMTDeleteData() {
  const [pnlForm, setpnlForm] = useState(false);
  const [lblResult, setlblResult] = useState("");
  const [lblResultcolor, setlblResultcolor] = useState("#059212");
  const [txtSheetNo, settxtSheetNo] = useState("");
  const [txtRollLeaf, settxtRollLeaf] = useState("");
  const [ddlELTType, setddlELTType] = useState("");
  const [ELTTypedata, setELTTypedata] = useState([]);
  const [txtSerialNo, settxtSerialNo] = useState("");
  const [txtFinalSerialNo, settxtFinalSerialNo] = useState("");

  //Table
  const [gvELTResult, setgvELTResult] = useState(false);
  const [gvELTData, setgvELTData] = useState([]);
  const [gvFinalResult, setgvFinalResult] = useState(false);
  const [gvFinalData, setgvFinalData] = useState([]);

  //hiddenfield
  const [hfUserName, sethfUserName] = useState("");

  //inputRef
  const inputShtNo = useRef([]);

  const plantCode = import.meta.env.VITE_FAC;

  useEffect(() => {
    PageLoad();
    setTimeout(() => {
      inputShtNo.current.focus();
    }, 300);
  }, []);

  const PageLoad = async () => {
    sethfUserName("");
    setpnlForm(false);
    fn_GetELTType();
  };

  const fn_GetELTType = async () => {
    await axios.get("/api/ELTtype/gettype")
      .then((res) => {
        setELTTypedata(res.data);
        setddlELTType(res.data[0].elt_type);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const btnShtDeleteClick = async () => {
    if (txtSheetNo.trim() !== "") {
      const result = await Swal.fire({
        title: 'Are you confirm delete?',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        icon: 'warning',
      });

      if (result.isConfirmed) {
        Delete_Data("SHEET");
      }
    } else {
      setpnlForm(true);
      setlblResult("Please input Sheet No.");
      setlblResultcolor("#BA0900");
    }
  };

  const btnRollDeleteClick = async () => {
    if (txtRollLeaf.trim() !== "") {
      const result = await Swal.fire({
        title: 'Are you confirm delete?',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        icon: 'warning',
      });

      if (result.isConfirmed) {
        Delete_Data("ROLL");
      }
    } else {
      setpnlForm(true);
      setlblResult("Please input Roll leaf No.");
      setlblResultcolor("#BA0900");
    }
  };

  const Delete_Data = async (strType) => {

    try {

      if (strType === "SHEET") {
        await axios.post("/api/SMTDeleteData/DeleteDataSheet", {
          strplantcode: plantCode,
          strsheetno: txtSheetNo.trim().toUpperCase()
        })
          .then((res) => {
            let dtdelsht = res.data;
            if (dtdelsht === "") {
              swal("success", "You delete data success", "success");
              setlblResult(`Sheet No. ${txtSheetNo} Delete Complete.`);
              setpnlForm(true);
              settxtSheetNo("");
            }
          });
      } else {
        await axios.post("/api/SMTDeleteData/DeleteDataRollleaf", {
          strplantcode: plantCode,
          strrollleaf: txtRollLeaf.trim().toUpperCase()
        })
          .then((res) => {
            let dtdelrollleaf = res.data;
            if (dtdelrollleaf === "") {
              swal("success", "You delete data success", "success");
              setlblResult(`RollLeaf No. ${txtSheetNo} Delete Complete.`);
              setpnlForm(true);
              settxtRollLeaf("");
            }
          });

        setlblResultcolor("#059212");
      }
    } catch (error) {
      setpnlForm(true);
      setlblResultcolor("#BA0900");
      setlblResult(error.message);
    }
  };

  const handleELTType = async (value) => {
    setddlELTType(value);
  };

  const handleSerialNo = async (e) => {
    const txtSerialNo = e.target.value;
    settxtSerialNo(txtSerialNo);
    FNGetELTResult();
  };

  const btnSerialSearchClick = async () => {
    FNGetELTResult();
  };

  const FNGetELTResult = async () => {
    let intRow = 0;
    let dtData = [];
    let dt = []

    await axios.post("/api/SMTDeleteData/getELTResult", {
      strserialno: txtSerialNo.trim().toUpperCase(),
      strplantcode: plantCode,
      strelttype: ddlELTType
    })
      .then((res) => {
        dt = res.data;
      });

    for (let i = 0; i < dt.length; i++) {
      let row = dt[i];
      console.log("dt", row)
      intRow++;

      dtData.push({
        SEQ: intRow,
        ELT_TYPE: row.elt_type,
        SERIAL_NO: row.serial_no,
        TABLE_NAME: row.table_name,
        ELT_RESULT: row.elt_result,
        ELT_DATE: row.elt_date
      });
      console.log(dtData)
    }

    if (dtData.length > 0) {
      setgvELTResult(true);
    } else {
      setgvELTResult(false);
    }
    setgvELTData(dtData);
    console.log("gvELTData", dtData)
  };

  const btnELTDeleteClick = async () => {
    const result = await Swal.fire({
      title: 'Are you confirm delete?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      icon: 'warning',
    });

    if (result.isConfirmed) {
      let dtDelELT = "";
      for (let i = 0; i < gvELTData.length; i++) {
        await axios.post("/api/SMTDeleteData/DeleteELT", {
          strplantcode: plantCode,
          strelttype: gvELTData[i].ELT_TYPE,
          strserial: gvELTData[i].SERIAL_NO,
          strtablename: gvELTData[i].TABLE_NAME
        })
          .then((res) => {
            dtDelELT = res.data.p_error;
            if (dtDelELT === "") {
              swal("success", "You delete data success", "success");
            }
          })
          .catch((error) => {
            swal("Error", error.res.data.p_error, "error");
          });
      }

      FNGetELTResult();
    } else {
      console.log('Form not Delete');
    }
  };

  const btnFinalSerialSearchClick = async () => {
    FNGetFinalGateResult();
  };

  const FNGetFinalGateResult = async () => {
    let intRow = 0;
    let dtData = [];

    await axios.post("/api/SMTDeleteData/getFinalGateResult", {
      strplantcode: plantCode,
      strfinalserialno: txtFinalSerialNo.trim().toUpperCase()
    })
      .then((res) => {
        let dt = res.data;
        for (let i = 0; i < dt.length; i++) {
          let row = dt[i];
          intRow++;

          dtData.push({
            SEQ: intRow,
            SERIAL_NO: row.serial_no,
            FINAL_RESULT: row.final_result,
            FINAL_DATE: row.final_date,
          });
        }
      })
      .catch((error) => {
        console.log(error.message);
      });

    if (dtData.length > 0) {
      setgvFinalResult(true);
    } else {
      setgvFinalResult(false);
    }
    setgvFinalData(dtData);
    console.log("gvELTData", dtData)

  };

  const btnFinalDeleteClick = async () => {
    const result = await Swal.fire({
      title: 'Are you confirm delete?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      icon: 'warning',
    });

    if (result.isConfirmed) {
      let dtDelFinal = "";
      for (let i = 0; i < gvFinalData.length; i++) {
        await axios.post("/api/SMTDeleteData/FinalDelete", {
          strplantcode: plantCode,
          strserial: gvFinalData[i].SERIAL_NO,
        })
          .then((res) => {
            dtDelFinal = res.data.p_error;
            if (dtDelFinal === "") {
              swal("success", "You delete data success", "success");
            }
          })
          .catch((error) => {
            swal("Error", error.res.data.p_error, "error");
          });
      }

      FNGetFinalGateResult();
    } else {
      console.log('Form not Delete');
    }
  };

  return {
    pnlForm, lblResult, lblResultcolor, txtSheetNo, settxtSheetNo, txtRollLeaf, settxtRollLeaf, ddlELTType, ELTTypedata, txtSerialNo,
    txtFinalSerialNo, settxtFinalSerialNo, gvELTResult, gvELTData, gvFinalResult, gvFinalData, inputShtNo, btnShtDeleteClick, handleELTType,
    btnRollDeleteClick, handleSerialNo, btnSerialSearchClick, btnELTDeleteClick, btnFinalSerialSearchClick, btnFinalDeleteClick,
  }
};

export { fn_SMTDeleteData };