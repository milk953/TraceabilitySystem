import React, { useState } from "react";

function fn_ScanSheetReflowTime() {
  const [txtmcNo, setTxtmcNo] = useState("");
  const [txtSheetNo, setTxtSheetNo] = useState("");
  const [lblSheet, setLblSheet] = useState("lblSheet");
  const [lblResult, setLblResult] = useState("lblResult");
  const [lblRemark, setLblRemark] = useState("lblRemark");

  return { txtmcNo, txtSheetNo, lblSheet, lblResult, lblRemark };
}

export { fn_ScanSheetReflowTime };
