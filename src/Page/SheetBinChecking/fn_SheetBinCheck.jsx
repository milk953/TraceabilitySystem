import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

function fn_SheetBinCheck() {
  const [txtSheetNo, settxtSheetNo] = useState("");
  const [lblSheet, setlblSheet] = useState("");
  const [lblResult, setlblResult] = useState({ text: "", styled: {} });
  const [pnlResult, setpnlResult] = useState(false);
  // ตัวแปร focus
  const FctxtSht = useRef(null);

  // hiddenfield hf
  const [hfURL, sethfURL] = useState("");
  const hfPeriod = "0.2";
  const hfRow = "10";
  const hfTimeControl = "1";
  const hfSPIPeriod = "10";
  const hfConnLeafLength = "20";

  const txtSheetNo_TextChanged = async () => {
    const serialTable = document.getElementById("txtSheetNo").value;
    if (serialTable.trim().toUpperCase() !== "") {
      await axios
        .post("/api/SheetBinChecking/GetSheetBinInspectNo", {
          dataList: {
            str_TxtSheetNo: serialTable,
          },
        })
        .then((response) => {
          if (response.data == "NO BIN") {
            setlblResult({
              text: response.data,
              styled: {
                color: "white",
                fontSize: "60px",
                backgroundColor: "red",
              },
            });
            setlblSheet(serialTable.trim().toUpperCase());
            document.getElementById("txtSheetNo").value = "";
            setpnlResult(true);
            FctxtSht.current.focus();
          } else {
            setlblResult({
              text: response.data,
              styled: {
                color: "white",
                fontSize: "60px",
                backgroundColor: "green",
              },
            });
            setlblSheet(serialTable.trim().toUpperCase());
            document.getElementById("txtSheetNo").value = "";
            FctxtSht.current.focus();
            setpnlResult(true);
          }
        });
    } else {
      document.getElementById("txtSheetNo").value = "";
      setlblSheet("");
      setlblResult("");
      FctxtSht.current.focus();
      setpnlResult(false);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      FctxtSht.current.focus();
    }, 0);
  }, []);
  useEffect(() => {
    const handleExternalSet = (e) => {
      const id = e.type;
      const value = e.detail;
      switch (id) {
        case "txtSheetNo":
          document.getElementById("txtSheetNo").value = value;
      }
    };

    const fields = ["txtSheetNo"];
    fields.forEach((field) =>
      window.addEventListener(field, handleExternalSet)
    );
    return () => {
      fields.forEach((field) =>
        window.removeEventListener(field, handleExternalSet)
      );
    };
  }, []);

  return {
    txtSheetNo,
    settxtSheetNo,
    lblSheet,
    lblResult,
    txtSheetNo_TextChanged,
    FctxtSht,
    pnlResult,
  };
}

export { fn_SheetBinCheck };
