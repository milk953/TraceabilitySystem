import { text } from "express";
import { useState, useRef, useEffect } from "react";

function fn_ScanSheetOvenTime() {
  const [txtmcNo, setTxtmcNo] = useState("");
  const [txtmcNoState, setTxtmcNoState] = useState({
    styled: { disabled: false, focus: true, backgroundColor: "white" },
  });
  const FctxtmcNo = useRef(null);
  const [txtSheetNo, setTxtSheetNo] = useState("");
  const FctxtSheetNo = useRef(null);
  const [txtSheetNoState, setTxtSheetNoState] = useState({
    styled: { disabled: true, backgroundColor: "#B2A8A8" },
  });
  const [lblSheet, setLblSheet] = useState({text: "", styled: {color: ""}});
  const [lblResult, setLblResult] = useState({text: "", styled: {color: ""}});
  const [lblRemark, setLblRemark] = useState({text: "", styled: {color: ""}});

  useEffect(() => {
    PageLoad();
  }, []);

  const PageLoad = () => {
    setTxtmcNo("");
    setTxtmcNoState({
      styled: { disabled: false, focus: true, backgroundColor: "white" },
    });
    setTxtSheetNo('');
    setLblRemark("");
    setLblResult("");
    setLblSheet("");
  };
  const btnIbtback_Click = () => {
    setTxtmcNo("");

    setTxtmcNoState({
      styled: { disabled: false, focus: true, backgroundColor: "white" },
    });
   
    setTxtSheetNoState({
      styled: { disabled: true, backgroundColor: "#B2A8A8" },
    });
    setLblSheet("");
    setLblRemark("");
    setLblResult("");
    FctxtmcNo.current.focus();
    
  };

  return {
    btnIbtback_Click,
    txtmcNo,
    txtSheetNo,
    lblSheet,
    lblResult,
    lblRemark,
    FctxtmcNo,
    FctxtSheetNo,
    setTxtmcNo,
    setTxtSheetNo,
    txtmcNoState,
    PageLoad,
    txtSheetNoState
  };
}

export { fn_ScanSheetOvenTime };
