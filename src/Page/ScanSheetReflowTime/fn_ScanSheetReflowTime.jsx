import React, { useState } from "react";

function fn_ScanSheetReflowTime() {
  const [txtmcNo, setTxtmcNo] = useState("");
  const [txtSheetNo, setTxtSheetNo] = useState("");
  const [lblSheet, setLblSheet] = useState("lblSheet");
  const [lblResult, setLblResult] = useState("lblResult");
  const [lblRemark, setLblRemark] = useState("lblRemark");
  //Hidden item
  const [hfURL, setHfURL] = useState("");
  const [hfPeriod, setHfPeriod] = useState("");
  const [hfRow, setHfRow] = useState("");
  const [hfTimeControl, setHfTimeControl] = useState("");
  const [hfSPIPeriod, setHfSPIPeriod] = useState("");
  const [hfConnLeafLength, setHfConnLeafLength] = useState("");
  const [hfFactory, setHfFactory] = useState("");
  return { txtmcNo, txtSheetNo, lblSheet, lblResult, lblRemark };
}

export { fn_ScanSheetReflowTime };
