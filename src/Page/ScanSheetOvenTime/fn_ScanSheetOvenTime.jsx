import axios from "axios";
import { useState, useRef, useEffect } from "react";
import {useLoading} from "../../loading/fn_loading";
import Swal from "sweetalert2";
import {DataConfig} from "../Common/function_Common";
function fn_ScanSheetOvenTime() {
  const{ConfigData} = DataConfig();
  const Fac = ConfigData.FACTORY;  
  const [txtmcNo, setTxtmcNo] = useState("");
  const [txtmcNoState, setTxtmcNoState] = useState({
    styled: { disabled: false, focus: true, backgroundColor: "white" },
  });
  const FctxtmcNo = useRef(null);
  const [txtSheetNo, setTxtSheetNo] = useState("");
  const FctxtSheetNo = useRef(null);
  const [txtSheetNoState, setTxtSheetNoState] = useState({
    styled: { disabled: true, backgroundColor: "#e0e0e0" },
  });
  const [lblSheet, setLblSheet] = useState("");
  const [lblResult, setLblResult] = useState({
    text: "",
    styled: { color: "" },
  });
  const [lblRemark, setLblRemark] = useState({
    text: "",
    styled: { color: "" },
  });
  const {showLoading,hideLoading} = useLoading();
  const [pnlResultState, setPnlResultState] = useState(false);
  //Hidden Field
  const [hfURL, setHfURL] = useState("");
  const [hfPeriod, setHfPeriod] = useState("0.2");
  const [hfRow, setHfRow] = useState("10");
  const [hfTimeControl, setHfTimeControl] = useState("1");
  const [hfSPIPeriod, setHfSPIPeriod] = useState("10");
  const [hfConnLeafLength, setHfConnLeafLength] = useState("20");

  useEffect(() => {
    PageLoad();
  }, []);

  const PageLoad = () => {
    setTxtmcNo("");
    setTxtmcNoState({
      styled: { disabled: false, focus: true, backgroundColor: "white" },
    });
    setTxtSheetNo("");
    setLblRemark("");
    setLblResult("");
    setLblSheet("");
  };
  const btnIbtback_Click = () => {
    setTxtmcNo("");
    setTxtmcNoState({
      styled: { disabled: false, focus: true, backgroundColor: "white" },
    });
    setPnlResultState(false);
    setTxtSheetNoState({
      styled: { disabled: true, backgroundColor: "#e0e0e0" },
    });
    setLblSheet("");
    setLblRemark("");
    setLblResult("");
    FctxtmcNo.current.focus();
  };
  const handleTxtMcNo = () => {
    if (txtmcNo == "") {
      FctxtmcNo.current.focus();
    } else {
      setTxtmcNoState({
        styled: { disabled: true, focus: false, backgroundColor: "#e0e0e0" },
      });
      setTxtSheetNo("");
      setTxtSheetNoState({
        styled: { disabled: false, backgroundColor: "white", focus: true },
      });
    }
  };

  const handleTxtSheetNo = async () => {
    if (txtSheetNo !== "") {
      let strError = "";
      let strStatus = "";
      const currentTime = new Date().toLocaleTimeString("en-US", {
        hour12: false,
      });
      if (
        parseInt(hfConnLeafLength) > 0 &&
        parseInt(hfConnLeafLength) !== txtSheetNo.length &&
        strStatus !== "F"
      ) {
        strStatus = "F";
        strError = "Invalid Sheet length";
      }
      if (strStatus !== "F") {
        showLoading('กำลังบันทึก กรุณารอสักครู่')
        const res = await axios
          .post("api/setsmtprocflowoven", {
            p_sheet_no: txtSheetNo,
            p_user: "ScanSheetOvenTime",
            p_station: txtmcNo,
            strPlantCode: Fac,
          })
          .then((res) => {
            console.log(res, "res");
            strError = res.data.P_ERROR;
          });
      }

      // setLblRemark(strError)
      setLblSheet(`${txtSheetNo} [${currentTime}]`);
      if (strError === "") {
        // setLblRemark({text:"ok", styled:{color:"green"}})
        setLblResult({ text: "OK", styled: "white", backgroundColor: "green" });
        setLblRemark({ text: "", styled: { color: "" } });
        setPnlResultState(true);
      } else {
        setLblResult({ text: "NG", styled: "white", backgroundColor: "red" });
        setLblRemark({
          text: strError,
          color: "white",
          backgroundColor: "red",
        });
        setPnlResultState(true);
      }
      hideLoading();
      setTxtSheetNo("");
      setTxtSheetNoState({
        styled: { disabled: false, backgroundColor: "white", focus: true },
      });
    } else {
      setTxtSheetNo("");
      setTxtSheetNoState({
        styled: { disabled: false, backgroundColor: "white", focus: true },
      });
    }
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
    txtSheetNoState,
    handleTxtMcNo,
    handleTxtSheetNo,
    pnlResultState,
  };
}

export { fn_ScanSheetOvenTime };
