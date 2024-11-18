import { CompassOutlined } from "@ant-design/icons";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
function fn_ScanSheetOvenTime() {
  const [txtmcNo, setTxtmcNo] = useState("");
  const [txtmcNoState, setTxtmcNoState] = useState({
    styled: { disabled: false, focus: true, backgroundColor: "white" },
  });
  const FctxtmcNo = useRef(null);
  const [txtSheetNo, setTxtSheetNo] = useState("");
  const FctxtSheetNo = useRef(null);
  const [txtSheetNoState, setTxtSheetNoState] = useState({
    styled: { disabled: true, backgroundColor: "#B2A8A9" },
  });
  const [lblSheet, setLblSheet] = useState({ text: "", styled: { color: "" } });
  const [lblResult, setLblResult] = useState({
    text: "",
    styled: { color: "" },
  });
  const [lblRemark, setLblRemark] = useState({
    text: "",
    styled: { color: "" },
  });

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

    setTxtSheetNoState({
      styled: { disabled: true, backgroundColor: "#B2A8A8" },
    });
    setLblSheet("");
    setLblRemark("");
    setLblResult("");
    FctxtmcNo.current.focus();
  };
  const handleTxtMcNo = () => {
    if (txtmcNo == "") {
      FctxtmcNo.current.focus();
    }else{
      setTxtmcNoState({
        styled: { disabled: true, focus: false, backgroundColor: "#B2A8A8" },
      });
      setTxtSheetNo("");
      setTxtSheetNoState({
        styled: { disabled: false, backgroundColor: "white", focus: true },
      });
    }
   
  };

  const handleTxtSheetNo = async()  => {
    if (txtSheetNo !== "") {
      let strError = "";
      let strStatus = "" ;
      if (parseInt(hfConnLeafLength) > 0 && parseInt(hfConnLeafLength) !== txtSheetNo.length && strStatus !== "F") {
        strStatus = 'F'
        strError = "Invalid Sheet length";
      }
      if (strStatus !== 'F'){
      console.log('in')
        const currentTime = new Date().toLocaleTimeString("en-US", {
          hour12: false,
        });
        setLblSheet(`${txtSheetNo} [${currentTime}]`);
        const res = await axios
        .post("api/setsmtprocflowoven", {
          strSheetNo: txtSheetNo,
          strUser:'frm_ScanSheetDispenserTime',
          strStation:txtmcNo,
          strPlantCode:'5',
        })
        .then((res) => {
          console.log(res, "res");
          strError = res.data.p_error;
          alert(strError)
          console.log(strError)
        })
        // .catch((error) => {
        //   Swal.fire("Error", `${error}`, "error")
        // });
      }

      setLblRemark(strError)
      if(strError === ""){
        setLblRemark({text:"ok", styled:{color:"green"}})
      }else{
        setLblRemark({text:strError, styled:{color:"red"}})
      }
      setTxtSheetNo('');
      setTxtSheetNoState({styled:{disabled:false, backgroundColor:"white", focus:true}})
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
  };
}

export { fn_ScanSheetOvenTime };
