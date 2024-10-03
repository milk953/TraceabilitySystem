import React, { useState } from "react";

function fn_SheetBadMarkView() {
  const [product, setProduct] = useState("");
  const [lotNo, setLotNo] = useState("");
  const [totalSheet, setTotalSheet] = useState("");
  const [gvResult, setGvResult] = useState([]);
  const [gvResultState, setGvResultState] = useState(false);
  const [lotNotextField, setLotNotextField] = useState("");
  const [radioValue, setRadioValue] = useState("Result");
  const [resultValue, setResultValue] = useState("ALL");
  return {
    product,
    lotNo,
    totalSheet,
    gvResult,
    gvResultState,
    lotNotextField,
    setLotNotextField,
    setRadioValue,
    radioValue,
    resultValue,
    setResultValue,
  };
}

export { fn_SheetBadMarkView };
