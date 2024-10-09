import React, { useState, useEffect } from "react";
import axios from "axios";

function fn_PieceTraceView() {
  const [txtSerialNo, settxtSerialNo] = useState("");
  const [txtSerialChip, settxtSerialChip] = useState({ visible: false, value: "" });
  const [txtProduct, settxtProduct] = useState("");
  const [hypSheetNoF, sethypSheetNoF] = useState("");
  const [hypLotNo, sethypLotNo] = useState("");
  const [hypSheetNoB, sethypSheetNoB] = useState("");
  const [txtPcsNo, settxtPcsNo] = useState("");
  const [txtShtType, settxtShtType] = useState("");
  const [txtAOMEFPCCntF, settxtAOMEFPCCntF] = useState("");
  const [txtAOMEFPCTimeF, settxtAOMEFPCTimeF] = useState("");
  const [txtAOIEFPCCntF, settxtAOIEFPCCntF] = useState("");
  const [txtAOIEFPCTimeF, settxtAOIEFPCTimeF] = useState("");
  const [txtBarcodeGradeTime, settxtBarcodeGradeTime] = useState({ visible: true, value: "" });
  const [txtOSTCntF, settxtOSTCntF] = useState("");
  const [txtOSTTimeF, settxtOSTTimeF] = useState("");
  const [txtAVICntF, settxtAVICntF] = useState("");
  const [txtAVITimeF, settxtAVITimeF] = useState("");
  const [txtAVICntB, settxtAVICntB] = useState("");
  const [txtAVITimeB, settxtAVITimeB] = useState("");
  const [txtAVIMarkCntF, settxtAVIMarkCntF] = useState("");
  const [txtAVIMarkTimeF, settxtAVIMarkTimeF] = useState("");
  const [txtAVIMarkCntB, settxtAVIMarkCntB] = useState("");
  const [txtAVIMarkTimeB, settxtAVIMarkTimeB] = useState("");
  const [txtSPICntF, settxtSPICntF] = useState("");
  const [txtSPITimeF, settxtSPITimeF] = useState("");
  const [txtSPICntB, settxtSPICntB] = useState("");
  const [txtSPITimeB, settxtSPITimeB] = useState("");
  const [txtPreAOICntF, settxtPreAOICntF] = useState("");
  const [txtPreTimeF, settxtPreTimeF] = useState("");
  const [txtPreAOICntB, settxtPreAOICntB] = useState("");
  const [txtPreTimeB, settxtPreTimeB] = useState("");
  const [txtReflowCntF, settxtReflowCntF] = useState("");
  const [txtReflowTimeF, settxtReflowTimeF] = useState("");
  const [txtReflowCntB, settxtReflowCntB] = useState("");
  const [txtReflowTimeB, settxtReflowTimeB] = useState("");
  const [txtAOICntF, settxtAOICntF] = useState("");
  const [txtAOITimeF, settxtAOITimeF] = useState("");
  const [txtAOICntB, settxtAOICntB] = useState("");
  const [txtAOITimeB, settxtAOITimeB] = useState("");
  const [txtXRAYCnt_F, settxtXRAYCnt_F] = useState("");
  const [txtXRAYTime_F, settxtXRAYTime_F] = useState("");
  const [txtXRAYCnt_B, settxtXRAYCnt_B] = useState("");
  const [txtXRAYTime_B, settxtXRAYTime_B] = useState("");
  const [txtAOICOACntF, settxtAOICOACntF] = useState("");
  const [txtAOICOATimeF, settxtAOICOATimeF] = useState("");
  const [txtAOICOACntB, settxtAOICOACntB] = useState("");
  const [txtAOICOATimeB, settxtAOICOATimeB] = useState("");
  const [txtSMTIntCntF, settxtSMTIntCntF] = useState("");
  const [txtSMTIntTimeF, settxtSMTIntTimeF] = useState("");
  const [txtSMTIntCntB, settxtSMTIntCntB] = useState("");
  const [txtSMTIntTimeB, settxtSMTIntTimeB] = useState("");
  const [txtRejectCnt1, settxtRejectCnt1] = useState("");
  const [txtRejectTime1, settxtRejectTime1] = useState("");
  const [txtTouchUpCnt, settxtTouchUpCnt] = useState("");
  const [txtTouchUpTime, settxtTouchUpTime] = useState("");
  const [txtBendingTime, settxtBendingTime] = useState("");
  const [lblBendingMachine, setlblBendingMachine] = useState("");
  const [txtELTCnt1, settxtELTCnt1] = useState({ visible: true, value: "" });
  const [txtELTTime1, settxtELTTime1] = useState({ visible: true, value: "" });
  const [txtELTCnt2, settxtELTCnt2] = useState({ visible: true, value: "" });
  const [txtELTTime2, settxtELTTime2] = useState({ visible: true, value: "" });
  const [txtELTCnt3, settxtELTCnt3] = useState({ visible: true, value: "" });
  const [txtELTTime3, settxtELTTime3] = useState({ visible: true, value: "" });
  const [txtELTCnt4, settxtELTCnt4] = useState({ visible: true, value: "" });
  const [txtELTTime4, settxtELTTime4] = useState({ visible: true, value: "" });
  const [txtELTCnt5, settxtELTCnt5] = useState({ visible: true, value: "" });
  const [txtELTTime5, settxtELTTime5] = useState({ visible: true, value: "" });
  const [txtELTCnt6, settxtELTCnt6] = useState({ visible: true, value: "" });
  const [txtELTTime6, settxtELTTime6] = useState({ visible: true, value: "" });
  const [txtELTCnt7, settxtELTCnt7] = useState({ visible: true, value: "" });
  const [txtELTTime7, settxtELTTime7] = useState({ visible: true, value: "" });
  const [txtFQCTime, settxtFQCTime] = useState({ visible: true, value: "" });
  const [lblFQC, setlblFQC] = useState({ visible: true, value: "FQC" });
  const [lblFQCMachine, setlblFQCMachine] = useState({ visible: false, value: "" });
  const [lblFQCOperator, setlblFQCOperator] = useState({ visible: false, value: "" });
  const [txtFinalGateTime, settxtFinalGateTime] = useState("");
  const [lblFinalGateRemark, setlblFinalGateRemark] = useState("");
  const [txtPackingTime, settxtPackingTime] = useState({ visible: true, value: "" });
  const [lblScanPackRemark, setlblScanPackRemark] = useState("");
  const [lblScanPackRemarkColor, setlblScanPackRemarkColor] = useState("");
  const [lblMessage, setlblMessage] = useState("");
  const [lblSerialChip, setlblSerialChip] = useState({ visible: false, value: "Piece Chip." });
  const [hypMaterialF, sethypMaterialF] = useState({ visible: false, value: "" });
  const [hypMaterialB, sethypMaterialB] = useState({ visible: false, value: "" });

  //label
  const [lblELT1, setlblELT1] = useState({ visible: true, value: "ELT1" });
  const [lblELT2, setlblELT2] = useState({ visible: true, value: "ELT2" });
  const [lblELT3, setlblELT3] = useState({ visible: true, value: "ELT3" });
  const [lblELT4, setlblELT4] = useState({ visible: true, value: "ELT4" });
  const [lblELT5, setlblELT5] = useState({ visible: true, value: "ELT5" });
  const [lblELT6, setlblELT6] = useState({ visible: true, value: "ELT6" });
  const [lblELT7, setlblELT7] = useState({ visible: true, value: "ELT7" });
  const [lblKeyType1, setlblKeyType1] = useState("");
  const [lblKeyType2, setlblKeyType2] = useState("");
  const [lblKeyType3, setlblKeyType3] = useState("");
  const [lblKeyType4, setlblKeyType4] = useState("");
  const [lblKeyType5, setlblKeyType5] = useState("");
  const [lblKeyType6, setlblKeyType6] = useState("");
  const [lblKeyType7, setlblKeyType7] = useState("");
  const [lblCheckID1, setlblCheckID1] = useState("");
  const [lblCheckID2, setlblCheckID2] = useState("");
  const [lblCheckID3, setlblCheckID3] = useState("");
  const [lblCheckID4, setlblCheckID4] = useState("");
  const [lblCheckID5, setlblCheckID5] = useState("");
  const [lblCheckID6, setlblCheckID6] = useState("");
  const [lblCheckID7, setlblCheckID7] = useState("");
  const [lblTestType1, setlblTestType1] = useState("");
  const [lblTestType2, setlblTestType2] = useState("");
  const [lblTestType3, setlblTestType3] = useState("");
  const [lblTestType4, setlblTestType4] = useState("");
  const [lblTestType5, setlblTestType5] = useState("");
  const [lblTestType6, setlblTestType6] = useState("");
  const [lblTestType7, setlblTestType7] = useState("");
  const [lblBarcodeTitle, setlblBarcodeTitle] = useState({ visible: true, value: "" });

  //hiddenfield
  const [hfAOMRollLeafNo, sethfAOMRollLeafNo] = useState("");
  const [hfAOMLeafNo, sethfAOMLeafNo] = useState("");
  const [hfAOMPcsNo, sethfAOMPcsNo] = useState("");
  const [hfAOIRollLeafNo, sethfAOIRollLeafNo] = useState("");
  const [hfAOILeafNo, sethfAOILeafNo] = useState("");
  const [hfAOIPcsNo, sethfAOIPcsNo] = useState("");
  const [hfOSTSheetNo, sethfOSTSheetNo] = useState("");
  const [hfOSTPcsNo, sethfOSTPcsNo] = useState("");
  const [hidAOIF, sethidAOIF] = useState("");
  const [hidAOIB, sethidAOIB] = useState("");
  const [hfMaterialN1, sethfMaterialN1] = useState("http://10.17.100.236/Reports/report/Traceability%20Reports/N1/Valor/PcbTraceReference%20by%20Serial?PcbID=#SHEET_NO#&amp;BlockNo=#PCS_NO#");
  const [hfMaterialA1, sethfMaterialA1] = useState("");

  //button
  const [btnAOMEFPC, setbtnAOMEFPC] = useState({ disabled: false, value: "" });
  const [btnAOIEFPC, setbtnAOIEFPC] = useState({ disabled: false, value: "" });
  const [btnBarcodeGrade, setbtnBarcodeGrade] = useState({ visible: true, value: "" });
  const [btnOST, setbtnOST] = useState({ disabled: false, value: "" });
  const [btnAVIF, setbtnAVIF] = useState({ disabled: false, value: "" });
  const [btnAVIB, setbtnAVIB] = useState({ disabled: false, value: "" });
  const [btnAVIMarkF, setbtnAVIMarkF] = useState({ disabled: false, value: "" });
  const [btnAVIMarkB, setbtnAVIMarkB] = useState({ disabled: false, value: "" });
  const [btnSPIF, setbtnSPIF] = useState({ disabled: false, value: "" });
  const [btnSPIB, setbtnSPIB] = useState({ disabled: false, value: "" });
  const [btnPreAOIF, setbtnPreAOIF] = useState({ disabled: false, value: "" });
  const [btnPreAOIB, setbtnPreAOIB] = useState({ disabled: false, value: "" });
  const [btnReflowF, setbtnReflowF] = useState({ disabled: false, value: "" });
  const [btnReflowB, setbtnReflowB] = useState({ disabled: false, value: "" });
  const [btnAOIF, setbtnAOIF] = useState({ disabled: false, value: "" });
  const [btnAOIB, setbtnAOIB] = useState({ disabled: false, value: "" });
  const [btnXRAY_F, setbtnXRAY_F] = useState("");
  const [btnXRAY_B, setbtnXRAY_B] = useState("");
  const [btnAOICOAF, setbtnAOICOAF] = useState({ disabled: false, value: "" });
  const [btnAOICOAB, setbtnAOICOAB] = useState({ disabled: false, value: "" });
  const [btnSMTIntF, setbtnSMTIntF] = useState("");
  const [btnSMTIntB, setbtnSMTIntB] = useState("");
  const [btnReject1, setbtnReject1] = useState("");
  const [btnTouchUp, setbtnTouchUp] = useState("");
  const [btnBending, setbtnBending] = useState("");
  const [btnELT1, setbtnELT1] = useState({ visible: true, value: "" });
  const [btnELT2, setbtnELT2] = useState({ visible: true, value: "" });
  const [btnELT3, setbtnELT3] = useState({ visible: true, value: "" });
  const [btnELT4, setbtnELT4] = useState({ visible: true, value: "" });
  const [btnELT5, setbtnELT5] = useState({ visible: true, value: "" });
  const [btnELT6, setbtnELT6] = useState({ visible: true, value: "" });
  const [btnELT7, setbtnELT7] = useState({ visible: true, value: "" });
  const [btnFQC, setbtnFQC] = useState({ visible: true, value: "" });
  const [btnFinalGate, setbtnFinalGate] = useState("");
  const [btnScanPack, setbtnScanPack] = useState("");
  //Color
  const [txtSPICntBColor, settxtSPICntBColor] = useState("");
  const [txtSPITimeBColor, settxtSPITimeBColor] = useState("");
  const [txtPreAOICntBColor, settxtPreAOICntBColor] = useState("");
  const [txtPreTimeBColor, settxtPreTimeBColor] = useState("");
  const [txtAOICntBColor, settxtAOICntBColor] = useState("");
  const [txtAOITimeBColor, settxtAOITimeBColor] = useState("");
  const [txtSPICntFColor, settxtSPICntFColor] = useState("");
  const [txtSPITimeFColor, settxtSPITimeFColor] = useState("");
  const [txtPreAOICntFColor, settxtPreAOICntFColor] = useState("");
  const [txtPreTimeFColor, settxtPreTimeFColor] = useState("");
  const [txtAOICntFColor, settxtAOICntFColor] = useState("");
  const [txtAOITimeFColor, settxtAOITimeFColor] = useState("");
  const [btnAOMEFPCColor, setbtnAOMEFPCColor] = useState("");
  const [btnAOIEFPCColor, setbtnAOIEFPCColor] = useState("");
  const [btnBarcodeGradeColor, setbtnBarcodeGradeColor] = useState("");
  const [btnOSTColor, setbtnOSTColor] = useState("");
  const [btnAVIFColor, setbtnAVIFColor] = useState("");
  const [btnAVIBColor, setbtnAVIBColor] = useState("");
  const [btnAVIMarkFColor, setbtnAVIMarkFColor] = useState("");
  const [btnAVIMarkBColor, setbtnAVIMarkBColor] = useState("");
  const [btnSPIFColor, setbtnSPIFColor] = useState("");
  const [btnSPIBColor, setbtnSPIBColor] = useState("");
  const [btnPreAOIFColor, setbtnPreAOIFColor] = useState("");
  const [btnPreAOIBColor, setbtnPreAOIBColor] = useState("");
  const [btnReflowFColor, setbtnReflowFColor] = useState("");
  const [btnReflowBColor, setbtnReflowBColor] = useState("");
  const [btnAOIFColor, setbtnAOIFColor] = useState("");
  const [btnAOIBColor, setbtnAOIBColor] = useState("");
  const [btnXRAY_FColor, setbtnXRAY_FColor] = useState("");
  const [btnbtnXRAY_BColor, setbtnXRAY_BColor] = useState("");
  const [btnAOICOAFColor, setbtnAOICOAFColor] = useState("");
  const [btnAOICOABColor, setbtnAOICOABColor] = useState("");
  const [btnSMTIntFColor, setbtnSMTIntFColor] = useState("");
  const [btnSMTIntBColor, setbtnSMTIntBColor] = useState("");
  const [btnReject1Color, setbtnReject1Color] = useState("");
  const [btnTouchUpColor, setbtnTouchUpColor] = useState("");
  const [btnBendingColor, setbtnBendingColor] = useState("");
  const [btnELT1Color, setbtnELT1Color] = useState("");
  const [btnELT2Color, setbtnELT2Color] = useState("");
  const [btnELT3Color, setbtnELT3Color] = useState("");
  const [btnELT4Color, setbtnELT4Color] = useState("");
  const [btnELT5Color, setbtnELT5Color] = useState("");
  const [btnELT6Color, setbtnELT6Color] = useState("");
  const [btnELT7Color, setbtnELT7Color] = useState("");
  const [btnFQCColor, setbtnFQCColor] = useState("");
  const [btnFinalGateColor, setbtnFinalGateColor] = useState("");
  const [btnScanPackColor, setbtnScanPackColor] = useState("");

  let PanelNo = "";
  const SPI_Maker = "ABC";
  const strConnectNAPK = "NAPK";
  const FINAL_GATE_SPECIAL_FLG = import.meta.env.VITE_FINAL_GATE_SPECIAL_FLG;
  const FINAL_GATE_SPECIAL_PRD = import.meta.env.VITE_FINAL_GATE_SPECIAL_PRD;
  const FINAL_GATE_SPECIAL_MESSAGE = import.meta.env.VITE_FINAL_GATE_SPECIAL_MESSAGE;
  const FINAL_GATE_SPECIAL_OK = "OK";
  const FINAL_GATE_SPECIAL_TYPE = import.meta.env.VITE_FINAL_GATE_SPECIAL_TYPE;
  let SERIAL_DATABASE_SWITCH = 0;
  const AOI_SHOW_ERROR = "SIP HEIGHT";
  const plantCode = import.meta.env.VITE_FAC;

  //link
  const searchParams = new URLSearchParams(window.location.search);
  const Serial = searchParams.get("SERIAL");
  const [SerialSearch, setSerialSearch] = useState("");

  useEffect(() => {
    PageLoad();
  }, []);

  useEffect(() => {
    if (SerialSearch !== "") {
      btnRetrive_Click();
    }
  }, [SerialSearch]);

  const PageLoad = async () => {
    if (Serial == "" || Serial == null || Serial == undefined) {
      Clear_View();
    } else {
      console.log("Serial", Serial);
      settxtSerialNo(Serial);
      setSerialSearch(Serial);
    }
  };

  const Clear_View = () => {
    settxtProduct("");
    sethypLotNo("");
    //sethypLotNo.NavigateUrl = ""
    settxtPcsNo("");
    sethypSheetNoF("");
    //hypSheetNoF.NavigateUrl = ""
    sethypSheetNoB("");
    settxtShtType("");

    //SPI
    setbtnSPIFColor("#E0E0E0");
    settxtSPICntF("");
    settxtSPITimeF("");
    setbtnSPIBColor("#E0E0E0");
    settxtSPICntB("");
    settxtSPITimeB("");

    //PreAOI
    setbtnPreAOIFColor("#E0E0E0");
    settxtPreAOICntF("");
    settxtPreTimeF("");
    setbtnPreAOIB("");
    setbtnPreAOIBColor("#E0E0E0");
    settxtPreAOICntB("");
    settxtPreTimeB("");

    //AOI
    setbtnAOIFColor("#E0E0E0");
    settxtAOICntF("");
    settxtAOITimeF("");
    setbtnAOIBColor("#E0E0E0");
    settxtAOICntB("");
    settxtAOITimeB("");

    //XRAY
    setbtnXRAY_FColor("#E0E0E0");
    settxtXRAYCnt_F("");
    settxtXRAYTime_F("");
    setbtnXRAY_BColor("#E0E0E0");
    settxtXRAYCnt_B("");
    settxtXRAYTime_B("");

    //AOICOAT
    setbtnAOICOAFColor("#E0E0E0");
    settxtAOICOACntF("");
    settxtAOICOATimeF("");
    setbtnAOICOABColor("#E0E0E0");
    settxtAOICOACntB("");
    settxtAOICOATimeB("");

    //SMT
    setbtnSMTIntFColor("#E0E0E0");
    settxtSMTIntCntF("");
    settxtSMTIntTimeF("");
    setbtnSMTIntBColor("#E0E0E0");
    settxtSMTIntCntB("");
    settxtSMTIntTimeB("");

    //Reject1
    setbtnReject1Color("#E0E0E0");
    settxtRejectCnt1("");
    settxtRejectTime1("");

    //TouchUp
    setbtnTouchUpColor("#E0E0E0");
    settxtTouchUpCnt("");
    settxtTouchUpTime("");

    //FQC
    setbtnFQCColor("#E0E0E0");
    settxtFQCTime(prevState => ({ ...prevState, value: "" }));

    //Bending
    setbtnBendingColor("#E0E0E0");
    settxtBendingTime("");
    setlblBendingMachine("");

    //ELT1
    setbtnELT1Color("#E0E0E0");
    settxtELTCnt1(prevState => ({ ...prevState, value: "" }));
    settxtELTTime1(prevState => ({ ...prevState, value: "" }));

    //ELT2
    setbtnELT2Color("#E0E0E0");
    settxtELTCnt2(prevState => ({ ...prevState, value: "" }));
    settxtELTTime2(prevState => ({ ...prevState, value: "" }));

    //ELT3
    setbtnELT3Color("#E0E0E0");
    settxtELTCnt3(prevState => ({ ...prevState, value: "" }));
    settxtELTTime3(prevState => ({ ...prevState, value: "" }));

    //ELT4
    setbtnELT4Color("#E0E0E0");
    settxtELTCnt4(prevState => ({ ...prevState, value: "" }));
    settxtELTTime4(prevState => ({ ...prevState, value: "" }));

    //ELT5
    setbtnELT5Color("#E0E0E0");
    settxtELTCnt5(prevState => ({ ...prevState, value: "" }));
    settxtELTTime5(prevState => ({ ...prevState, value: "" }));

    //ELT6
    setbtnELT6Color("#E0E0E0");
    settxtELTCnt6(prevState => ({ ...prevState, value: "" }));
    settxtELTTime6(prevState => ({ ...prevState, value: "" }));

    //ELT7
    setbtnELT7Color("#E0E0E0");
    settxtELTCnt7(prevState => ({ ...prevState, value: "" }));
    settxtELTTime7(prevState => ({ ...prevState, value: "" }));

    //AOMEFPC
    setbtnAOMEFPCColor("#E0E0E0");
    settxtAOMEFPCCntF("");
    settxtAOMEFPCTimeF("");
    sethfAOMRollLeafNo("");
    sethfAOMLeafNo("");
    sethfAOMPcsNo("");

    //AOIEFPC
    setbtnAOIEFPCColor("#E0E0E0");
    settxtAOIEFPCCntF("");
    settxtAOIEFPCTimeF("");
    sethfAOIRollLeafNo("");
    sethfAOILeafNo("");
    sethfAOIPcsNo("");

    //OST
    setbtnOSTColor("#E0E0E0");
    settxtOSTCntF("");
    settxtOSTTimeF("");
    sethfOSTSheetNo("");
    sethfOSTPcsNo("");

    //AVI
    setbtnAVIFColor("#E0E0E0");
    settxtAVICntF("");
    settxtAVITimeF("");

    setbtnAVIBColor("#E0E0E0");
    settxtAVICntB("");
    settxtAVITimeB("");

    setbtnAVIMarkFColor("#E0E0E0");
    settxtAVIMarkCntF("");
    settxtAVIMarkTimeF("");

    setbtnAVIMarkBColor("#E0E0E0");
    settxtAVIMarkCntB("");
    settxtAVIMarkTimeB("");

    //Reflow
    setbtnReflowFColor("#E0E0E0");
    settxtReflowCntF("");
    settxtReflowTimeF("");

    setbtnReflowBColor("#E0E0E0");
    settxtReflowCntB("");
    settxtReflowTimeB("");

    //FinalGate
    setbtnFinalGateColor("#E0E0E0");
    settxtFinalGateTime("");
    setlblFinalGateRemark("");
    //BarcodeGrade
    setbtnBarcodeGradeColor("#E0E0E0");
    settxtBarcodeGradeTime(prevState => ({ ...prevState, value: "" }));
    //ScanPack
    setbtnScanPackColor("#E0E0E0");
    setlblScanPackRemark("");
  };

  const ViewData = async () => {
    let dt = [];
    let dtSerial = [];
    let dtPrd = [];
    let dt1 = [];
    let dt2 = [];
    let dt3 = [];
    let dt4 = [];
    let dt5 = [];
    let dt6 = [];
    let dt7 = [];
    let dt8 = [];
    let dt9 = [];
    let dt10 = [];
    let dt11 = [];
    let dt12 = [];
    let dt13 = [];
    let dt14 = [];
    let dt15 = [];
    let dt16 = [];
    let dt17 = [];
    let dt18 = [];
    let dt19 = [];
    let dt20 = [];
    let dt21 = [];
    let dt22 = [];
    let dt23 = [];
    let dt24 = [];
    let dt25 = [];
    let dt26 = [];
    let dt27 = [];
    let dt28 = [];
    let dt29 = [];
    let dt30 = [];
    let dt31 = [];
    let dt32 = [];
    let dt33 = [];
    let dt34 = [];
    let dt35 = [];
    let dt36 = [];
    let SheetType = "D";
    let BarcodeSide = "";
    let StrResult = "";
    let ELT_Count = 0;
    let strFinalGateStation = "";
    const SerialNo = txtSerialNo.toUpperCase().trim();

    try {
      if (SERIAL_DATABASE_SWITCH === 1) {
        SERIAL_DATABASE_SWITCH;
      } else {
        SERIAL_DATABASE_SWITCH = 0;
      }

      await axios.post("/api/ViewTracePiece/GetSerialNo", {
        strplantcode: "G",
        strserialno: txtSerialNo
      })
        .then((res) => {
          dtSerial = res.data;
          console.log("dtSerial", dtSerial);
        });

      if (SERIAL_DATABASE_SWITCH === 1) {
        SERIAL_DATABASE_SWITCH;
      } else {
        SERIAL_DATABASE_SWITCH = 0;
      }

      await axios.post("/api/ViewTracePiece/getdataproduct", {
        strplantcode: plantCode,
        strserialno: SerialNo
      })
        .then((res) => {
          dtPrd = res.data;
        });
      console.log("dtPrd", dtPrd);
      if (dtPrd.length > 0) {
        dtPrd = dtPrd[0];
        settxtProduct(dtPrd.product_name);
        sethypLotNo(dtPrd.lot_no);
        //hypLotNo.NavigateUrl = "./rpt_LotTraceView.aspx?LOT=" & dtPrd.lot_no)

        setbtnFinalGate(dtPrd.final_result);
        strFinalGateStation = dtPrd.update_by;

        if (dtPrd.final_result === "OK" || dtPrd.final_result === "PASS") {
          setbtnFinalGateColor("#059212");
          setlblFinalGateRemark("");
        } else {
          setbtnFinalGateColor("#BA0900");
          setlblFinalGateRemark(dtPrd.elt_remarks);
        }
        settxtFinalGateTime(dtPrd.update_date);
      } else {
        sethypLotNo("");
        //hypLotNo.NavigateUrl = ""
      }

      if (dtPrd.length === 0) {
        await axios.post("/api/ViewTracePiece/getproductname", {
          strplantcode: plantCode,
          strserialno: txtSerialNo
        })
          .then((res) => {
            dt = res.data;
          });

        if (dt.length <= 0) {
          if (dtSerial.length > 0) {
            dtSerial = dtSerial[0];
            settxtProduct(dtSerial.productname);
            sethypLotNo(dtSerial.lotno);
            //hypLotNo.NavigateUrl = "./rpt_LotTraceView.aspx?LOT=" & dtSerial.lotno
          } else {
            setlblMessage("Error : SMT_SERIAL_NO isn't Found!");
          }
        }
      }

      //Get SMT_PRODUCT_MST
      console.log(txtProduct, "Produckj");
      await axios.post("/api/ViewTracePiece/getproductmst", {
        strprdname: dtPrd.product_name
      })
        .then((res) => {
          dt1 = res.data;
          console.log("dt1", dt1)
        });


      if (dt1 !== "") {
        SheetType = dt1.sheet_type;
        console.log("SheetType", SheetType)
        BarcodeSide = dt1.lamination_side;

        settxtShtType(SheetType);
        if (SheetType === "S") {
          if (BarcodeSide === "F") {
            settxtSPICntFColor("#fff");
            settxtSPITimeFColor("#fff");
            settxtPreAOICntFColor("#fff");
            settxtPreTimeF("#fff");
            settxtAOICntF("#fff");
            settxtAOITimeFColor("#fff");

            settxtSPICntBColor("#e0e0e0");
            settxtSPITimeBColor("#e0e0e0");
            settxtPreAOICntBColor("#e0e0e0");
            settxtPreTimeBColor("#e0e0e0");
            settxtAOICntBColor("#e0e0e0");
            settxtAOITimeBColor("#e0e0e0");
          } else {
            settxtSPICntFColor("#e0e0e0");
            settxtSPITimeFColor("#e0e0e0");
            settxtPreAOICntFColor("#e0e0e0");
            settxtPreTimeFColor("#e0e0e0");
            settxtAOICntFColor("#e0e0e0");
            settxtAOITimeFColor("#e0e0e0");
          }
        } else {
          settxtSPICntFColor("#fff");
          settxtSPITimeFColor("#fff");
          settxtPreAOICntFColor("#fff");
          settxtPreTimeFColor("#fff");
          settxtAOICntFColor("#fff");
          settxtAOITimeFColor("#fff");

          settxtSPICntBColor("#fff");
          settxtSPITimeBColor("#fff");
          settxtPreAOICntBColor("#fff");
          settxtPreTimeBColor("#fff");
          settxtAOICntBColor("#fff");
          settxtAOITimeBColor("#fff");
        }

        ELT_Count = dt1.elt_count;
        if (ELT_Count === 3) {
          //api/ViewTracePiece trc_checker_header3 ไม่ใช้แล้ว
          setlblSerialChip(prevState => ({ ...prevState, visible: true }));
          settxtSerialChip(prevState => ({ ...prevState, visible: true }));
        }
      } else {
        setlblMessage("Error : Product Master not Found!");
      }

      await axios.post("/api/ViewTracePiece/getlotsheetserial", {
        strplantcode: plantCode,
        strserialno: SerialNo
      })
        .then((res) => {
          dt2 = res.data;
          console.log("dt2", dt2)
        });

      sethypMaterialF("");
      sethypMaterialB("");

      if (dt2.length > 0) {
        dt2 = dt2[0];
        if (hypLotNo === "") {
          sethypLotNo(dt2.lot_no);
          //hypLotNo.NavigateUrl = "./rpt_LotTraceView.aspx?LOT=" & dt2.lot_no
        }

        if (SheetType === "S") {
          if (BarcodeSide === "F") {
            sethypSheetNoF(dt2.front_sheet_no);
            //hypSheetNoF.NavigateUrl = "./rpt_SheetTraceView.aspx?SHEETNO=" & dt2.front_sheet_no
          } else {
            sethypSheetNoB(dt2.back_sheet_no);
            //hypSheetNoB.NavigateUrl = "./rpt_SheetTraceView.aspx?SHEETNO=" & dt2.back_sheet_no
          }
        } else {
          sethypSheetNoF(dt2.front_sheet_no);
          //hypSheetNoF.NavigateUrl = "./rpt_SheetTraceView.aspx?SHEETNO=" & dt2.front_sheet_no
          sethypSheetNoB(dt2.back_sheet_no);
          //hypSheetNoB.NavigateUrl = "./rpt_SheetTraceView.aspx?SHEETNO=" & dt2.back_sheet_no
        }

        settxtPcsNo(dt2.pcs_no);

        if (SERIAL_DATABASE_SWITCH === 1) {
          if (hfMaterialN1 !== "") {

            if (SheetType === "S") {
              if (BarcodeSide === "F") {
                sethypMaterialF(prevState => ({ ...prevState, visible: true, value: "Material" }));
                //hypMaterialF.NavigateUrl = hfMaterialN1.Value.Replace("#SHEET_NO#", hypSheetNoF.Text).Replace("#PCS_NO#", txtPcsNo.Text)
              } else {
                sethypMaterialB(prevState => ({ ...prevState, visible: true, value: "Material" }));
                //hypMaterialB.NavigateUrl = hfMaterialN1.Value.Replace("#SHEET_NO#", hypSheetNoB.Text).Replace("#PCS_NO#", txtPcsNo.Text)
              }
            } else {
              sethypMaterialF(prevState => ({ ...prevState, visible: true, value: "Material" }));
              //hypMaterialF.NavigateUrl
              sethypMaterialB(prevState => ({ ...prevState, visible: true, value: "Material" }));
              //hypMaterialB.NavigateUrl
            }
          }
        } else {
          if (hfMaterialA1 !== "") {

            if (SheetType === "S") {
              if (BarcodeSide === "F") {
                sethypMaterialF(prevState => ({ ...prevState, visible: true, value: "Material" }));
                //hypMaterialF.NavigateUrl = hfMaterialA1.Value.Replace("#SHEET_NO#", hypSheetNoF.Text).Replace("#PCS_NO#", txtPcsNo.Text)
              } else {
                sethypMaterialB(prevState => ({ ...prevState, visible: true, value: "Material" }));
                //hypMaterialB.NavigateUrl = hfMaterialA1.Value.Replace("#SHEET_NO#", hypSheetNoB.Text).Replace("#PCS_NO#", txtPcsNo.Text)
              }
            } else {
              sethypMaterialF(prevState => ({ ...prevState, visible: true, value: "Material" }));
              //hypMaterialF.NavigateUrl
              sethypMaterialB(prevState => ({ ...prevState, visible: true, value: "Material" }));
              //hypMaterialB.NavigateUrl
            }
          }
        }
      } else {
        sethypSheetNoF("");
        //hypSheetNoF.NavigateUrl = ""
        sethypSheetNoB("");
        //hypSheetNoB.NavigateUrl = ""
        settxtPcsNo("");
      }

      console.log(dt2.front_sheet_no, "////////////")
      if (dt2.front_sheet_no !== "") {
        await axios.post("/api/ViewTracePiece/getspifront", {
          strplantcode: plantCode,
          strprdname: dtPrd.product_name,
          strpcsno: dt2.pcs_no,
          strsheetnof: dt2.front_sheet_no
        })
          .then((res) => {
            dt3 = res.data;
            console.log("dt3", dt3)
          });

        if (dt3.length === 0) {
          if (SPI_Maker === "CKD") {
            PanelNo = String(Math.max(0, parseInt(dt2.pcs_no, 10) - 1)).trim();
          } else {
            PanelNo = dt2.pcs_no;
          }

          await axios.post("/api/ViewTracePiece/getspiresult", {
            strplantcode: plantCode,
            strsheetnof: dt2.front_sheet_no,
            strpanel: PanelNo
          })
            .then((res) => {
              dt4 = res.data;
            });
          console.log("dt4", dt4)
        }

        if (dt3.length > 0) {
          dt3 = dt3[0];
          StrResult = "";
          for (let i = 0; i < dt3.length; i++) {
            StrResult = dt3[i].sp_result;
            if (StrResult === "NG" || StrResult === "FAIL" ||
              StrResult === "BADMARK" || StrResult === "SKIP") {
              break;
            }
          }

          if (StrResult !== "NG" || StrResult !== "FAIL" ||
            StrResult !== "BADMARK" || StrResult !== "SKIP"
          ) {
            for (let i = 0; i < dt3.length; i++) {
              StrResult = dt3[i].sp_result;
              const firstChar = StrResult.charAt(0).toUpperCase();
              if (firstChar === "E" || firstChar === "W") {
                break;
              }
            }
          }

          settxtSPICntF(dt3.int_count);
          settxtSPITimeF(dt3.inspect_date);
          setbtnSPIF(prevState => ({ ...prevState, value: StrResult }));

          const result = StrResult.toUpperCase();

          switch (result) {
            case "GOOD":
            case "OK":
            case "JUDGE":
            case "WN":
            case "PASS":
            case "RPASS":
              setbtnSPIFColor("#059212");
              break;
            case "NG":
            case "FAIL":
            case "BADMARK":
            case "SKIP":
              setbtnSPIFColor("#BA0900");
              break;
            case "":
              setbtnSPIF(prevState => ({ ...prevState, value: "" }));
              break;
            default:
              setbtnSPIFColor("#059212");
              break;
          }
        } else {
          await axios.post("/api/ViewTracePiece/getresult", {
            strplantcode: plantCode,
            strsheetnof: dt2.front_sheet_no
          })
            .then((res) => {
              dt5 = res.data;
            });

          if (dt5.length > 0) {
            dt5 = dt5[0];
            StrResult = "BADMARK"
            settxtSPICntF(dt5.int_count);
            settxtSPITimeF(dt5.inspect_date);
            setbtnSPIF(prevState => ({ ...prevState, value: StrResult }));
            setbtnSPIFColor("#BA0900");
          } else {
            setbtnSPIF(prevState => ({ ...prevState, disabled: true }));
            settxtSPICntF("");
            settxtSPITimeF("");
          }
        }
      }

      //SPI Back
      if (hypSheetNoB !== "") {
        await axios.post("/api/ViewTracePiece/getspiback", {
          strplantcode: plantCode,
          strprdname: dtPrd.product_name,
          strpcsno: dt2.pcs_no,
          strsheetnob: dt2.back_sheet_no
        })
          .then((res) => {
            dt6 = res.data;
          });

        if (dt6.length === 0) {
          if (SPI_Maker === "CKD") {
            PanelNo = String(Math.max(0, parseInt(txtPcsNo, 10) - 1)).trim();
          } else {
            PanelNo = txtPcsNo;
          }

          await axios.post("/api/ViewTracePiece/getspiresult", {
            strplantcode: plantCode,
            strsheetnof: dt2.back_sheet_no,
            strpanel: PanelNo
          })
            .then((res) => {
              dt7 = res.data;
            });
          console.log("dt7", dt7)
        }

        if (dt6.length > 0) {
          dt6 = dt6[0];
          StrResult = "";
          for (i = 0; i < dt6.length; i++) {
            StrResult = dt6[i].result;
            if (StrResult === "NG" || StrResult === "FAIL" ||
              StrResult === "BADMARK" || StrResult === "SKIP"
            ) {
              break;
            }
          }

          if (StrResult !== "NG" || StrResult !== "FAIL" ||
            StrResult !== "BADMARK" || StrResult !== "SKIP"
          ) {
            for (let i = 0; i < dt6.length; i++) {
              StrResult = dt6[i].result;
              const firstChar = StrResult.charAt(0).toUpperCase();
              if (firstChar === "E" || firstChar === "W") {
                break;
              }
            }
          }

          setbtnSPIB(prevState => ({ ...prevState, value: StrResult }));
          settxtSPICntB(dt6.int_count);
          settxtSPITimeB(dt6.inspect_date);

          const result = StrResult.toUpperCase();

          switch (result) {
            case "GOOD":
            case "OK":
            case "JUDGE":
            case "WN":
            case "PASS":
            case "RPASS":
              setbtnSPIBColor("#059212");
              break;
            case "NG":
            case "FAIL":
            case "BADMARK":
            case "SKIP":
              setbtnSPIBColor("#BA0900");
              break;
            case "":
              setbtnSPIB(prevState => ({ ...prevState, value: "" }));
              break;
            default:
              setbtnSPIBColor("#059212");
              break;
          }
        } else {
          await axios.post("/api/ViewTracePiece/getresult", {
            strplantcode: plantCode,
            strsheetnof: dt2.back_sheet_no
          })
            .then((res) => {
              dt8 = res.data;
            });

          if (dt8.length > 0) {
            dt8 = dt8[0];
            StrResult = "BADMARK";
            settxtSPICntB(dt8.int_count);
            settxtSPITimeB(dt8.inspect_date);
            setbtnSPIB(prevState => ({ ...prevState, value: StrResult }));
            setbtnSPIBColor("#BA0900");
          } else {
            setbtnSPIB(prevState => ({ ...prevState, visible: false }));
            settxtSPICntB("");
            settxtSPITimeB("");
          }
        }
      }

      if (btnSPIF === "" && btnSPIB === "") {
        await axios.post("/api/ViewTracePiece/getspi", {
          strplantcode: plantCode,
          strsheetno: txtSerialNo
        })
          .then((res) => {
            dt9 = res.data;
          });

        if (dt9.length > 0) {
          dt9 = dt9[0];
          setbtnSPIF(prevState => ({ ...prevState, value: dt9.result }));
          settxtSPICntF(dt9.int_count);
          settxtSPITimeF(dt9.inspect_date);

          const result = btnSPIF.toUpperCase();

          switch (result) {
            case "GOOD":
            case "OK":
            case "JUDGE":
            case "WN":
            case "PASS":
            case "RPASS":
              setbtnSPIFColor("#059212");
              break;
            case "NG":
            case "FAIL":
            case "BADMARK":
            case "SKIP":
              setbtnSPIFColor("#BA0900");
              break;
            default:
              setbtnSPIFColor("#059212");
              break;
          }
        }
      }

      //PreAOI Front
      if (hypSheetNoF !== "") {
        await axios.post("/api/ViewTracePiece/getpreaoifront", {
          strplantcode: plantCode,
          strsheetno: hypSheetNoF
        })
          .then((res) => {
            dt10 = res.data;
          });

        if (dt10.length > 0) {
          dt10 = dt10[0];
          settxtPreAOICntF(dt10.inspect_count);
          settxtPreTimeF(dt10.inspect_date);

          const result = dt10.result;
          switch (result) {
            case "GOOD":
            case "OK":
            case "JUDGE":
            case "WN":
            case "PASS":
            case "RPASS":
              setbtnPreAOIFColor("#059212");
              setbtnPreAOIF(prevState => ({ ...prevState, value: "OK" }));

              break;
            default:
              await axios.post("/api/ViewTracePiece/getpreaoifronttelse", {
                strplantcode: plantCode,
                strsheetno: hypSheetNoF,
                strpcsno: txtPcsNo
              })
                .then((res) => {
                  dt11 = res.data;
                });

              if (dt11.length > 0) {
                dt11 = dt11[0];
                const result = dt11.ng_detail;
                switch (result) {
                  case "GOOD":
                  case "OK":
                  case "JUDGE":
                  case "WN":
                  case "PASS":
                  case "RPASS":
                    setbtnPreAOIFColor("#059212");
                    setbtnPreAOIF(prevState => ({ ...prevState, value: "OK" }));
                    break;
                  default:
                    setbtnPreAOIFColor("#BA0900");
                    setbtnPreAOIF(prevState => ({ ...prevState, value: "NG" }));
                    break;
                }
              } else {
                setbtnPreAOIFColor("#059212");
                setbtnPreAOIF(prevState => ({ ...prevState, value: "OK" }));
              }
          }
        } else {
          setbtnPreAOIF(prevState => ({ ...prevState, disabled: true }));
          settxtPreAOICntF("");
          settxtPreTimeF("");
        }
      }

      //PreAOIB
      if (hypSheetNoB !== "") {
        await axios.post("/api/ViewTracePiece/getpreaoifront", {
          strplantcode: plantCode,
          strsheetno: hypSheetNoB
        })
          .then((res) => {
            dt12 = res.data;
          });

        if (dt12.length > 0) {
          dt12 = dt12[0];
          settxtPreAOICntB(dt12.inspect_count);
          settxtPreTimeB(dt12.inspect_date);

          const result = dt12.result;
          switch (result) {
            case "GOOD":
            case "OK":
            case "JUDGE":
            case "WN":
            case "PASS":
            case "RPASS":
              setbtnPreAOIBColor("#059212");
              setbtnPreAOIB(prevState => ({ ...prevState, value: "OK" }));

              break;
            default:
              await axios.post("/api/ViewTracePiece/getpreaoifronttelse", {
                strplantcode: plantCode,
                strsheetno: hypSheetNoB,
                strpcsno: txtPcsNo
              })
                .then((res) => {
                  dt13 = res.data;
                });

              if (dt13.length > 0) {
                dt13 = dt13[0];
                const result = dt13.ng_detail;
                switch (result) {
                  case "GOOD":
                  case "OK":
                  case "JUDGE":
                  case "WN":
                  case "PASS":
                  case "RPASS":
                    setbtnPreAOIBColor("#059212");
                    setbtnPreAOIB(prevState => ({ ...prevState, value: "OK" }));
                    break;
                  default:
                    setbtnPreAOIBColor("#BA0900");
                    setbtnPreAOIB(prevState => ({ ...prevState, value: "NG" }));
                    break;
                }
              } else {
                setbtnPreAOIBColor("#059212");
                setbtnPreAOIB(prevState => ({ ...prevState, value: "OK" }));
              }
          }
        } else {
          setbtnPreAOIB(prevState => ({ ...prevState, disabled: true }));
          settxtPreAOICntB("");
          settxtPreTimeB("");
        }
      }

      //AOI Front
      if (dt2.front_sheet_no !== "") {
        await axios.post("/api/ViewTracePiece/getaoi", {
          strplantcode: plantCode,
          strsheetno: dt2.front_sheet_no,
          strpcsno: dt2.pcs_no
        })
          .then((res) => {
            dt14 = res.data;
          });
        console.log(dt14)

        if (dt14.length > 0) {
          dt14 = dt14[0];
          setbtnAOIF(prevState => ({ ...prevState, disabled: false }));
          setbtnAOIFColor("#059212");
          setbtnAOIF(prevState => ({ ...prevState, value: "OK" }));
          settxtAOICntF(dt14.inspect_count);
          settxtAOITimeF(dt14.inspect_date);
        } else {
          await axios.post("/api/ViewTracePiece/getaoi2", {
            strplantcode: plantCode,
            strsheetno: dt2.front_sheet_no
          })
            .then((res) => {
              dt15 = res.data;
            });

          if (dt15.length > 0) {
            dt15 = dt15[0];
            settxtAOICntF(dt15.inspect_count);
            settxtAOITimeF(dt15.inspect_date);

            await axios.post("/api/ViewTracePiece/getaoi3", {
              strplantcode: plantCode,
              strsheetno: dt2.front_sheet_no,
              strpcsno: dt2.pcs_no
            })
              .then((res) => {
                dt16 = res.data;
              });

            if (dt16.length > 0) {
              dt16 = dt16[0];
              setbtnAOIFColor("#BA0900");
              setbtnAOIF(prevState => ({ ...prevState, value: dt16.result }));
              for (let i = 0; i < dt16.length; i++) {
                if (AOI_SHOW_ERROR.includes(dt16.error_code.toString().toUpperCase().trim())) {
                  setbtnAOIF(prevState => ({ ...prevState, value: dt16.error_code }));
                  break;
                }
              }

              settxtAOICntF(dt16.inspect_count);
              settxtAOITimeF(dt16.inspect_date);
            } else {
              setbtnAOIF(prevState => ({ ...prevState, disabled: false }));
              setbtnAOIFColor("#059212");
              setbtnAOIF(prevState => ({ ...prevState, value: "OK" }));
            }
          } else {
            setbtnAOIF(prevState => ({ ...prevState, disabled: true }));
            settxtAOICntF("");
            settxtAOITimeF("");
          }
        }
      }

      //AOI Back
      if (dt2.back_sheet_no !== "") {
        await axios.post("/api/ViewTracePiece/getaoi", {
          strplantcode: plantCode,
          strsheetno: dt2.back_sheet_no,
          strpcsno: dt2.pcs_no
        })
          .then((res) => {
            dt17 = res.data;
          });
        if (dt17.length > 0) {
          dt17 = dt17[0];
          setbtnAOIB(prevState => ({ ...prevState, disabled: false }));
          setbtnAOIBColor("#059212");
          setbtnAOIB(prevState => ({ ...prevState, value: "OK" }));
          settxtAOICntB(dt17.inspect_count);
          settxtAOITimeB(dt17.inspect_date);
        } else {
          await axios.post("/api/ViewTracePiece/getaoi2", {
            strplantcode: plantCode,
            strsheetno: dt2.back_sheet_no
          })
            .then((res) => {
              dt18 = res.data;
            });
          if (dt18.length > 0) {
            dt18 = dt18[0];
            settxtAOICntB(dt18.inspect_count);
            settxtAOITimeB(dt18.inspect_date);

            await axios.post("/api/ViewTracePiece/getaoi3", {
              strplantcode: plantCode,
              strsheetno: dt2.back_sheet_no,
              strpcsno: dt2.pcs_no
            })
              .then((res) => {
                dt19 = res.data;
              });
            if (dt19.length > 0) {
              dt19 = dt19[0];
              setbtnAOIBColor("#BA0900");
              setbtnAOIB(prevState => ({ ...prevState, value: dt19.result }));
              for (let i = 0; i < dt19.length; i++) {
                if (AOI_SHOW_ERROR.includes(dt19.error_code.toString().toUpperCase().trim())) {
                  setbtnAOIB(prevState => ({ ...prevState, value: dt19.error_code }));
                  break;
                }
              }
              settxtAOICntB(dt19.inspect_count);
              settxtAOITimeB(dt19.inspect_date);
            } else {
              setbtnAOIB(prevState => ({ ...prevState, disabled: false }));
              setbtnAOIBColor("#059212");
              setbtnAOIB(prevState => ({ ...prevState, value: "OK" }));
            }
          } else {
            setbtnAOIB(prevState => ({ ...prevState, disabled: true }));
            settxtAOICntB("");
            settxtAOITimeB("");
          }
        }
      }
      console.log("bbbbbbbb", btnAOIF);

      if (btnAOIF === "" && btnAOIB === "") {
        await axios.post("/api/ViewTracePiece/getaoi2", {
          strplantcode: plantCode,
          strsheetno: txtSerialNo
        })
          .then((res) => {
            dt20 = res.data;
          });
        if (dt20.length > 0) {
          dt20 = dt20[0];
          setbtnAOIF(prevState => ({ ...prevState, value: dt20.result }));
          settxtAOICntF(dt20.inspect_count);
          settxtAOITimeF(dt20.inspect_date);

          const result = btnAOIF;
          switch (result) {
            case "GOOD":
            case "OK":
            case "JUDGE":
            case "WN":
            case "PASS":
            case "RPASS":
              setbtnAOIFColor("#059212");
              break;
            case "NG":
            case "FAIL":
            case "BADMARK":
            case "SKIP":
              setbtnAOIFColor("#BA0900");
              break;
          }
        }
      }

      if (hypSheetNoF !== "") {
        await axios.post("/api/ViewTracePiece/getaoicoating", {
          strplantcode: plantCode,
          strsheetno: hypSheetNoF,
          strpcsno: txtPcsNo
        })
          .then((res) => {
            dt21 = res.data;
          });
        if (dt21.length > 0) {
          dt21 = dt21[0];
          setbtnAOICOAF(prevState => ({ ...prevState, disabled: false }));
          setbtnAOICOAFColor("#059212");
          setbtnAOICOAF(prevState => ({ ...prevState, value: "OK" }));
          settxtAOICOACntF(dt21.inspect_count);
          settxtAOICOATimeF(dt21.inspect_date);
        } else {
          await axios.post("/api/ViewTracePiece/getaoicoating2", {
            strplantcode: plantCode,
            strsheetno: hypSheetNoF
          })
            .then((res) => {
              dt22 = res.data;
            });
          if (dt22.length > 0) {
            dt22 = dt22[0];
            settxtAOICOACntF(dt22.inspect_count);
            settxtAOICOATimeF(dt22.inspect_date);

            await axios.post("/api/ViewTracePiece/getaoicoating3", {
              strplantcode: plantCode,
              strsheetno: hypSheetNoF,
              strpcsno: txtPcsNo
            })
              .then((res) => {
                dt23 = res.data;
              });
            if (dt23.length > 0) {
              dt23 = dt23[0];
              setbtnAOICOAFColor("#BA0900");
              setbtnAOICOAF(prevState => ({ ...prevState, value: dt23.result }));
              for (i = 0; dt23.length; i++) {
                if (AOI_SHOW_ERROR.includes(dt23.error_code.toString().toUpperCase().trim())) {
                  setbtnAOICOAF(prevState => ({ ...prevState, value: dt23.error_code }));
                  break;
                }
              }

              settxtAOICOACntF(dt23.inspect_count);
              settxtAOICOATimeF(dt23.inspect_date);
            } else {
              setbtnAOICOAF(prevState => ({ ...prevState, disabled: false }));
              setbtnAOICOAFColor("#059212");
              setbtnAOICOAF(prevState => ({ ...prevState, value: "OK" }));
            }
          } else {
            setbtnAOICOAF(prevState => ({ ...prevState, disabled: true }));
            settxtAOICOACntF("");
            settxtAOICOATimeF("");
          }
        }
      }

      //AOI Coating Back
      if (hypSheetNoB !== "") {
        await axios.post("/api/ViewTracePiece/getaoicoating", {
          strplantcode: plantCode,
          strsheetno: hypSheetNoB,
          strpcsno: txtPcsNo
        })
          .then((res) => {
            dt24 = res.data;
          });
        if (dt24.length > 0) {
          dt24 = dt24[0];
          setbtnAOICOAB(prevState => ({ ...prevState, disabled: false }));
          setbtnAOICOABColor("#059212");
          setbtnAOICOAB(prevState => ({ ...prevState, value: "OK" }));
          settxtAOICOACntB(dt24.inspect_count);
          settxtAOICOATimeB(dt24.inspect_date);
        } else {
          await axios.post("/api/ViewTracePiece/getaoicoating2", {
            strplantcode: plantCode,
            strsheetno: hypSheetNoB
          })
            .then((res) => {
              dt25 = res.data;
            });
          if (dt25.length > 0) {
            dt25 = dt25[0];
            settxtAOICOACntB(dt25.inspect_count);
            settxtAOICOATimeB(dt25.inspect_date);

            await axios.post("/api/ViewTracePiece/getaoicoating3", {
              strplantcode: plantCode,
              strsheetno: hypSheetNoB,
              strpcsno: txtPcsNo
            })
              .then((res) => {
                dt26 = res.data;
              });
            if (dt26.length > 0) {
              dt26 = dt26[0];
              setbtnAOICOABColor("#BA0900");
              setbtnAOICOAB(prevState => ({ ...prevState, value: dt26.result }));
              for (i = 0; dt26.length; i++) {
                if (AOI_SHOW_ERROR.includes(dt26.error_code.toString().toUpperCase().trim())) {
                  setbtnAOICOAB(prevState => ({ ...prevState, value: dt26.error_code }));
                  break;
                }
              }

              settxtAOICOACntB(dt26.inspect_count);
              settxtAOICOATimeB(dt26.inspect_date);
            } else {
              setbtnAOICOAB(prevState => ({ ...prevState, disabled: false }));
              setbtnAOICOABColor("#059212");
              setbtnAOICOAB(prevState => ({ ...prevState, value: "OK" }));
            }
          } else {
            setbtnAOICOAB(prevState => ({ ...prevState, disabled: true }));
            settxtAOICOACntB("");
            settxtAOICOATimeB("");
          }
        }
      }

      //AOICOA
      if (btnAOICOAF === "" && btnAOICOAB === "") {
        await axios.post("/api/ViewTracePiece/getaoicoating2", {
          strplantcode: plantCode,
          strsheetno: SerialNo
        })
          .then((res) => {
            dt27 = res.data;
          });
        if (dt27.length > 0) {
          dt27 = dt27[0];
          setbtnAOICOAF(prevState => ({ ...prevState, value: dt27.result }));
          settxtAOICOACntF(dt27.inspect_count);
          settxtAOICOATimeF(dt27.inspect_date);

          const result = btnAOICOAF;
          switch (result) {
            case "GOOD":
            case "OK":
            case "JUDGE":
            case "WN":
            case "PASS":
            case "RPASS":
              setbtnAOICOAFColor("#059212");
              break;
            case "NG":
            case "FAIL":
            case "BADMARK":
            case "SKIP":
              setbtnAOICOAFColor("#BA0900");
              break;
          }
        }
      }

      //SMT-Inspection result Front
      if (dt2.front_sheet_no !== "") {

        await axios.post("/api/ViewTracePiece/getinspectionresult", {
          strplantcode: plantCode,
          strsheetno: dt2.front_sheet_no
        })
          .then((res) => {
            dt28 = res.data;
          });

        if (dt28.length > 0) {
          dt28 = dt28[0];
          setbtnSMTIntF(dt28.inspect_result);
          settxtSMTIntCntF(dt28.inspect_count);
          settxtSMTIntTimeF(dt28.inspect_date);
          if (btnSMTIntF === "NG") {
            setbtnSMTIntFColor("#BA0900");
          } else {
            setbtnSMTIntFColor("#059212");
          }
        }
      }

      //SMT-Inspection result Back
      if (dt2.back_sheet_no !== "") {
        await axios.post("/api/ViewTracePiece/getinspectionresult", {
          strplantcode: plantCode,
          strsheetno: dt2.back_sheet_no
        })
          .then((res) => {
            dt29 = res.data;
          });

        if (dt29.length > 0) {
          dt29 = dt29[0];
          setbtnSMTIntB(dt29.inspect_result);
          settxtSMTIntCntB(dt29.inspect_count);
          settxtSMTIntTimeB(dt29.inspect_date);

          if (btnSMTIntB === "NG") {
            setbtnSMTIntBColor("#BA0900");
          } else {
            setbtnSMTIntBColor("#059212");
          }
        }
      }

      //Reject1
      await axios.post("/api/ViewTracePiece/getreject", {
        strplantcode: plantCode,
        strsheetno: SerialNo
      })
        .then((res) => {
          dt30 = res.data;
        });

      if (dt30.length > 0) {
        dt30 = dt30[0];
        setbtnReject1(dt30.reject_code);
        if (btnReject1 !== "") {
          setbtnReject1Color("#BA0900");
        }
        settxtRejectCnt1(dt30.inspect_count);
        settxtRejectTime1(dt30.update_date);
      }

      //Touch Up
      await axios.post("/api/ViewTracePiece/gettouchup", {
        strplantcode: plantCode,
        strserialno: SerialNo
      })
        .then((res) => {
          dt31 = res.data;
        });
      if (dt31.length > 0) {
        dt31 = dt31[0];
        setbtnTouchUp(dt31.touchup_result);
        if (btnTouchUp === "NG") {
          setbtnTouchUpColor("#BA0900");
        } else {
          setbtnTouchUpColor("#059212");
        }
        settxtTouchUpCnt(dt31.touchup_count);
        settxtTouchUpTime(dt31.update_date);
      }

      setbtnFQC(prevState => ({ ...prevState, visible: false }));
      setlblFQC(prevState => ({ ...prevState, visible: false }));
      settxtFQCTime(prevState => ({ ...prevState, visible: false }));
      setlblFQCMachine(prevState => ({ ...prevState, visible: false }));
      setlblFQCOperator(prevState => ({ ...prevState, visible: false }));

      //Final Inspection check
      await axios.post("/api/ViewTracePiece/getfinalinspection", {
        strplantcode: plantCode,
        strprdname: dtPrd.product_name,
        strserialno: SerialNo
      })
        .then((res) => {
          dt32 = res.data;
        });

      if (dt32.length > 0) {
        dt32 = dt32[0];
        if (dt32.fin_inspect_flg === "Y") {
          setbtnFQC(prevState => ({ ...prevState, visible: true }));
          setlblFQC(prevState => ({ ...prevState, visible: true }));
          settxtFQCTime(prevState => ({ ...prevState, visible: true }));

          if (dt32.ins_date === "") {
            setbtnFQC(prevState => ({ ...prevState, value: "SKIP" }));
            setbtnFQCColor("#BA0900");
            settxtFQCTime(prevState => ({ ...prevState, value: "" }));
          } else {
            setbtnFQC(prevState => ({ ...prevState, value: "OK" }));
            setbtnFQCColor("#059212");
            settxtFQCTime(prevState => ({ ...prevState, value: dt32.ins_date }));

            setlblFQCMachine(prevState => ({ ...prevState, visible: true, value: "Machine no.: " + dt32.machine_no }));
            setlblFQCOperator(prevState => ({ ...prevState, visible: true, value: "Operator :" + dt32.op }));
          }
        }
      }

      await axios.post("/api/ViewTracePiece/getbending", {
        strplantcode: plantCode,
        strserialno: SerialNo
      })
        .then((res) => {
          dt33 = res.data;
        });

      if (dt33.length > 0) {
        dt33 = dt33[0];
        setbtnBending("OK");
        setbtnBendingColor("#059212");
        settxtBendingTime(dt33.bending_date);
        setlblBendingMachine(dt33.bending_no);
      }

      //ELT
      setlblELT1(prevState => ({ ...prevState, visible: false }));
      setbtnELT1(prevState => ({ ...prevState, visible: false }));
      settxtELTCnt1(prevState => ({ ...prevState, visible: false }));
      settxtELTTime1(prevState => ({ ...prevState, visible: false }));
      setlblELT2(prevState => ({ ...prevState, visible: false }));
      setbtnELT2(prevState => ({ ...prevState, visible: false }));
      settxtELTCnt2(prevState => ({ ...prevState, visible: false }));
      settxtELTTime2(prevState => ({ ...prevState, visible: false }));
      setlblELT3(prevState => ({ ...prevState, visible: false }));
      setbtnELT3(prevState => ({ ...prevState, visible: false }));
      settxtELTCnt3(prevState => ({ ...prevState, visible: false }));
      settxtELTTime3(prevState => ({ ...prevState, visible: false }));
      setlblELT4(prevState => ({ ...prevState, visible: false }));
      setbtnELT4(prevState => ({ ...prevState, visible: false }));
      settxtELTCnt4(prevState => ({ ...prevState, visible: false }));
      settxtELTTime4(prevState => ({ ...prevState, visible: false }));
      setlblELT5(prevState => ({ ...prevState, visible: false }));
      setbtnELT5(prevState => ({ ...prevState, visible: false }));
      settxtELTCnt5(prevState => ({ ...prevState, visible: false }));
      settxtELTTime5(prevState => ({ ...prevState, visible: false }));
      setlblELT6(prevState => ({ ...prevState, visible: false }));
      setbtnELT6(prevState => ({ ...prevState, visible: false }));
      settxtELTCnt6(prevState => ({ ...prevState, visible: false }));
      settxtELTTime6(prevState => ({ ...prevState, visible: false }));
      setlblELT7(prevState => ({ ...prevState, visible: false }));
      setbtnELT7(prevState => ({ ...prevState, visible: false }));
      settxtELTCnt7(prevState => ({ ...prevState, visible: false }));
      settxtELTTime7(prevState => ({ ...prevState, visible: false }));

      await axios.post("/api/ViewTracePiece/getelt", {
        strplantcode: plantCode,
        strprdname: dtPrd.product_name,
        strserialno: SerialNo
      })
        .then((res) => {
          dt34 = res.data;
        });
      console.log(dt34, "dt34")
      if (dt34.length > 0) {
        //CHECK CHIP NO
        // for (i = 1; i < dt34.length; i++) {
        //   if (dt34[i - 1].stt_key_type === "2") {
        //     //api/ViewTracePiece SMT_CHECKER_HEADER3
        //   }
        // }

        //VIEW CHECKER DATA
        for (let i = 0; i < dt34.length; i++) {
          console.log(i, "iiiiiiii")
          switch (i + 1) {
            case 1:
              setlblELT1(prevState => ({ ...prevState, visible: true, value: dt34[i].stt_type }));
              setbtnELT1(prevState => ({ ...prevState, visible: true }));
              settxtELTTime1(prevState => ({ ...prevState, visible: true }));
              let sbaql = await Get_Select(dt34[i].stt_key_type, SerialNo, dt34[i].stt_type, txtSerialChip, plantCode);
              let dt1 = sbaql;
              console.log("ELT1", dt1)
              if (dt1.length > 0) {
                dt1 = dt1[0];
                setbtnELT1(prevState => ({ ...prevState, value: dt1.prod_result }));
                if (dt1.prod_result === dt34[i].stt_col_pass_result ||
                  dt1.prod_result === "OK" || dt1.prod_result === "PASS") {
                  setbtnELT1Color("#059212");
                } else {
                  setbtnELT1Color("#BA0900");
                }
                setbtnELT1(prevState => ({ ...prevState, visible: true }));
                settxtELTTime1(prevState => ({ ...prevState, value: dt1.inspect_date }));
                settxtELTCnt1(prevState => ({ ...prevState, value: dt1.inspect_count }));
                setlblKeyType1(dt34[i].stt_key_type);
                if (dt1.check_id === null) {
                  setlblCheckID1("");
                } else {
                  setlblCheckID1(dt1.check_id);
                }
                setlblTestType1(dt34[i].stt_type);

                if (FINAL_GATE_SPECIAL_FLG === 1 &&
                  parseInt(FINAL_GATE_SPECIAL_PRD, txtProduct) > 0 &&
                  parseInt(FINAL_GATE_SPECIAL_TYPE, lblELT1) > 0) {
                  let _intCheckPass = 0;
                  await axios.post("/api/Common/getcheckspecialbyserial", {
                    dataList: {
                      strSerialno: SerialNo,
                      strPlantCode: plantCode
                    }
                  })
                    .then((res) => {
                      _intCheckPass = res.data.result;
                    });
                  if (_intCheckPass === 0) {
                    setbtnELT1(prevState => ({ ...prevState, value: "NG" }));
                    settxtELTTime1(prevState => ({ ...prevState, value: FINAL_GATE_SPECIAL_MESSAGE }));
                    setbtnELT1Color("#BA0900");
                  }
                }
              }
              break;

            case 2:
              setlblELT2(prevState => ({ ...prevState, visible: true, value: dt34[i].stt_type }));
              setbtnELT2(prevState => ({ ...prevState, visible: true }));
              settxtELTTime2(prevState => ({ ...prevState, visible: true }));
              let sbaql2 = Get_Select(dt34[i].stt_key_type, SerialNo, dt34[i].stt_type, txtSerialChip, plantCode);
              let dt2 = sbaql2;

              if (dt2.length > 0) {
                dt2 = dt2[0];
                setbtnELT2(prevState => ({ ...prevState, value: dt2.prod_result }));
                if (dt2.prod_result === dt34[i].stt_col_pass_result ||
                  dt2.prod_result === "OK" || dt2.prod_result === "PASS") {
                  setbtnELT2Color("#059212");
                } else {
                  setbtnELT2Color("#BA0900");
                }
                setbtnELT2(prevState => ({ ...prevState, visible: true }));
                settxtELTTime2(prevState => ({ ...prevState, value: dt2.inspect_date }));
                settxtELTCnt2(prevState => ({ ...prevState, value: dt2.inspect_count }));
                setlblKeyType2(dt34[i].stt_key_type);
                if (dt2.check_id === null) {
                  setlblCheckID2("");
                } else {
                  setlblCheckID2(dt2.check_id);
                }
                setlblTestType2(dt34[i].stt_type);

                if (FINAL_GATE_SPECIAL_FLG === 1 &&
                  parseInt(FINAL_GATE_SPECIAL_PRD, txtProduct) > 0 &&
                  parseInt(FINAL_GATE_SPECIAL_TYPE, lblELT2) > 0) {
                  let _intCheckPass = 0;
                  await axios.post("/api/Common/getcheckspecialbyserial", {
                    dataList: {
                      strSerialno: txtSerialNo,
                      strPlantCode: plantCode
                    }
                  })
                    .then((res) => {
                      _intCheckPass = res.data.result;
                    });
                  if (_intCheckPass === 0) {
                    setbtnELT2(prevState => ({ ...prevState, value: "NG" }));
                    settxtELTTime2(prevState => ({ ...prevState, value: FINAL_GATE_SPECIAL_MESSAGE }));
                    setbtnELT2Color("#BA0900");
                  }
                }
              }
              break;

            case 3:
              setlblELT3(prevState => ({ ...prevState, visible: true, value: dt34[i].stt_type }));
              setbtnELT3(prevState => ({ ...prevState, visible: true }));
              settxtELTTime3(prevState => ({ ...prevState, visible: true }));
              let sbaql3 = Get_Select(dt34[i].stt_key_type, SerialNo, dt34[i].stt_type, txtSerialChip, plantCode);
              let dt3 = sbaql3;

              if (dt3.length > 0) {
                setbtnELT3(prevState => ({ ...prevState, value: dt3.prod_result }));
                if (btnELT3 === dt34[i].stt_col_pass_result ||
                  btnELT3 === "OK" || btnELT3 === "PASS") {
                  setbtnELT3Color("#059212");
                } else {
                  setbtnELT3Color("#BA0900");
                }
                setbtnELT3(prevState => ({ ...prevState, visible: true }));
                settxtELTTime3(prevState => ({ ...prevState, value: dt3.inspect_date }));
                settxtELTCnt3(prevState => ({ ...prevState, value: dt3.inspect_count }));
                setlblKeyType3(dt34[i].stt_key_type);
                if (dt3.check_id === null) {
                  setlblCheckID3("");
                } else {
                  setlblCheckID3(dt3.check_id);
                }
                setlblTestType3(dt34[i].stt_type);

                if (FINAL_GATE_SPECIAL_FLG === 1 &&
                  parseInt(FINAL_GATE_SPECIAL_PRD, txtProduct) > 0 &&
                  parseInt(FINAL_GATE_SPECIAL_TYPE, lblELT3) > 0) {
                  let _intCheckPass = 0;
                  await axios.post("/api/Common/getcheckspecialbyserial", {
                    dataList: {
                      strSerialno: txtSerialNo,
                      strPlantCode: plantCode
                    }
                  })
                    .then((res) => {
                      _intCheckPass = res.data.result;
                    });
                  if (_intCheckPass === 0) {
                    setbtnELT3(prevState => ({ ...prevState, value: "NG" }));
                    settxtELTTime3(prevState => ({ ...prevState, value: FINAL_GATE_SPECIAL_MESSAGE }));
                    setbtnELT3Color("#BA0900");
                  }
                }
              }
              break;

            case 4:
              setlblELT4(prevState => ({ ...prevState, visible: true, value: dt34[i].stt_type }));
              setbtnELT4(prevState => ({ ...prevState, visible: true }));
              settxtELTTime4(prevState => ({ ...prevState, visible: true }));
              let sbaql4 = Get_Select(dt34[i].stt_key_type, SerialNo, dt34[i].stt_type, txtSerialChip, plantCode);
              let dt4 = sbaql4;

              if (dt4.length > 0) {
                setbtnELT4(prevState => ({ ...prevState, value: dt4.prod_result }));
                if (btnELT4 === dt34[i].stt_col_pass_result ||
                  btnELT4 === "OK" || btnELT4 === "PASS") {
                  setbtnELT4Color("#059212");
                } else {
                  setbtnELT4Color("#BA0900");
                }
                setbtnELT4(prevState => ({ ...prevState, visible: true }));
                settxtELTTime4(prevState => ({ ...prevState, value: dt4.inspect_date }));
                settxtELTCnt4(prevState => ({ ...prevState, value: dt4.inspect_count }));
                setlblKeyType4(dt34[i].stt_key_type);
                if (dt4.check_id === null) {
                  setlblCheckID4("");
                } else {
                  setlblCheckID4(dt4.check_id);
                }
                setlblTestType4(dt34[i].stt_type);

                if (FINAL_GATE_SPECIAL_FLG === 1 &&
                  parseInt(FINAL_GATE_SPECIAL_PRD, txtProduct) > 0 &&
                  parseInt(FINAL_GATE_SPECIAL_TYPE, lblELT4) > 0) {
                  let _intCheckPass = 0;
                  await axios.post("/api/Common/getcheckspecialbyserial", {
                    dataList: {
                      strSerialno: SerialNo,
                      strPlantCode: plantCode
                    }
                  })
                    .then((res) => {
                      _intCheckPass = res.data.result;
                    });
                  if (_intCheckPass === 0) {
                    setbtnELT4(prevState => ({ ...prevState, value: "NG" }));
                    settxtELTTime4(prevState => ({ ...prevState, value: FINAL_GATE_SPECIAL_MESSAGE }));
                    setbtnELT4Color("#BA0900");
                  }
                }
              }
              break;

            case 5:
              setlblELT5(prevState => ({ ...prevState, visible: true, value: dt34[i].stt_type }));
              setbtnELT5(prevState => ({ ...prevState, visible: true }));
              settxtELTTime5(prevState => ({ ...prevState, visible: true }));
              let sbaql5 = Get_Select(dt34[i].stt_key_type, SerialNo, dt34[i].stt_type, txtSerialChip, plantCode);
              let dt5 = sbaql5;

              if (dt5.length > 0) {
                setbtnELT5(prevState => ({ ...prevState, value: dt5.prod_result }));
                if (btnELT5 === dt34[i].stt_col_pass_result ||
                  btnELT5 === "OK" || btnELT5 === "PASS") {
                  setbtnELT5Color("#059212");
                } else {
                  setbtnELT5Color("#BA0900");
                }
                setbtnELT5(prevState => ({ ...prevState, visible: true }));
                settxtELTTime5(prevState => ({ ...prevState, value: dt5.inspect_date }));
                settxtELTCnt5(prevState => ({ ...prevState, value: dt5.inspect_count }));
                setlblKeyType5(dt34[i].stt_key_type);
                if (dt5.check_id === null) {
                  setlblCheckID5("");
                } else {
                  setlblCheckID5(dt5.check_id);
                }
                setlblTestType5(dt34[i].stt_type);

                if (FINAL_GATE_SPECIAL_FLG === 1 &&
                  parseInt(FINAL_GATE_SPECIAL_PRD, txtProduct) > 0 &&
                  parseInt(FINAL_GATE_SPECIAL_TYPE, lblELT5) > 0) {
                  let _intCheckPass = 0;
                  await axios.post("/api/Common/getcheckspecialbyserial", {
                    dataList: {
                      strSerialno: SerialNo,
                      strPlantCode: plantCode
                    }
                  })
                    .then((res) => {
                      _intCheckPass = res.data.result;
                    });
                  if (_intCheckPass === 0) {
                    setbtnELT5(prevState => ({ ...prevState, value: "NG" }));
                    settxtELTTime5(prevState => ({ ...prevState, value: FINAL_GATE_SPECIAL_MESSAGE }));
                    setbtnELT5Color("#BA0900");
                  }
                }
              }
              break;

            case 6:
              setlblELT6(prevState => ({ ...prevState, visible: true, value: dt34[i].stt_type }));
              setbtnELT6(prevState => ({ ...prevState, visible: true }));
              settxtELTTime6(prevState => ({ ...prevState, visible: true }));
              let sbaql6 = Get_Select(dt34[i].stt_key_type, SerialNo, dt34[i].stt_type, txtSerialChip, plantCode);
              let dt6 = sbaql6;

              if (dt6.length > 0) {
                setbtnELT6(prevState => ({ ...prevState, value: dt6.prod_result }));
                if (btnELT6 === dt34[i].stt_col_pass_result ||
                  btnELT6 === "OK" || btnELT6 === "PASS") {
                  setbtnELT6Color("#059212");
                } else {
                  setbtnELT6Color("#BA0900");
                }
                setbtnELT6(prevState => ({ ...prevState, visible: true }));
                settxtELTTime6(prevState => ({ ...prevState, value: dt6.inspect_date }));
                settxtELTCnt6(prevState => ({ ...prevState, value: dt6.inspect_count }));
                setlblKeyType6(dt34[i].stt_key_type);
                if (dt6.check_id === null) {
                  setlblCheckID6("");
                } else {
                  setlblCheckID6(dt6.check_id);
                }
                setlblTestType6(dt34[i].stt_type);

                if (FINAL_GATE_SPECIAL_FLG === 1 &&
                  parseInt(FINAL_GATE_SPECIAL_PRD, txtProduct) > 0 &&
                  parseInt(FINAL_GATE_SPECIAL_TYPE, lblELT6) > 0) {
                  let _intCheckPass = 0;
                  await axios.post("/api/Common/getcheckspecialbyserial", {
                    dataList: {
                      strSerialno: SerialNo,
                      strPlantCode: plantCode
                    }
                  })
                    .then((res) => {
                      _intCheckPass = res.data.result;
                    });
                  if (_intCheckPass === 0) {
                    setbtnELT6(prevState => ({ ...prevState, value: "NG" }));
                    settxtELTTime6(prevState => ({ ...prevState, value: FINAL_GATE_SPECIAL_MESSAGE }));
                    setbtnELT6Color("#BA0900");
                  }
                }
              }
              break;

            case 7:
              setlblELT7(prevState => ({ ...prevState, visible: true, value: dt34[i].stt_type }));
              setbtnELT7(prevState => ({ ...prevState, visible: true }));
              settxtELTTime7(prevState => ({ ...prevState, visible: true }));
              let sbaql7 = await Get_Select(dt34[i].stt_key_type, SerialNo, dt34[i].stt_type, txtSerialChip, plantCode);
              let dt7 = sbaql7;

              if (dt7.length > 0) {
                dt7 = dt7[0];
                setbtnELT7(prevState => ({ ...prevState, value: dt7.prod_result }));
                if (btnELT7 === dt34[i].stt_col_pass_result ||
                  btnELT7 === "OK" || btnELT7 === "PASS") {
                  setbtnELT7Color("#059212");
                } else {
                  setbtnELT7Color("#BA0900");
                }
                setbtnELT7(prevState => ({ ...prevState, visible: true }));
                settxtELTTime7(prevState => ({ ...prevState, value: dt7.inspect_date }));
                settxtELTCnt7(prevState => ({ ...prevState, value: dt7.inspect_count }));
                setlblKeyType7(dt34[i].stt_key_type);
                if (dt7.check_id === null) {
                  setlblCheckID7("");
                } else {
                  setlblCheckID7(dt7.check_id);
                }
                setlblTestType7(dt34[i].stt_type);

                if (FINAL_GATE_SPECIAL_FLG === 1 &&
                  parseInt(FINAL_GATE_SPECIAL_PRD, txtProduct) > 0 &&
                  parseInt(FINAL_GATE_SPECIAL_TYPE, lblELT7) > 0) {
                  let _intCheckPass = 0;
                  await axios.post("/api/Common/getcheckspecialbyserial", {
                    dataList: {
                      strSerialno: txtSerialNo,
                      strPlantCode: plantCode
                    }
                  })
                    .then((res) => {
                      _intCheckPass = res.data.result;
                    });
                  if (_intCheckPass === 0) {
                    setbtnELT7(prevState => ({ ...prevState, value: "NG" }));
                    settxtELTTime7(prevState => ({ ...prevState, value: FINAL_GATE_SPECIAL_MESSAGE }));
                    setbtnELT7Color("#BA0900");
                  }
                }
              }
              break;
          }
        }
      }

      //X-RAY Result
      if (hypSheetNoF !== "") {
        setbtnXRAY_F("");
        settxtXRAYCnt_F("");
        settxtXRAYTime_F("");

        await axios.post("/api/ViewTracePiece/getxrayresult", {
          strpcsno: txtPcsNo,
          strsheetno: hypSheetNoF
        })
          .then((res) => {
            dt35 = res.data;
          });

        if (dt35.xray_count > 0) {
          dt35 = dt35[0];
          setbtnXRAY_F(dt35.xray_result);
          if (btnXRAY_F === "NG") {
            setbtnXRAY_FColor("#BA0900");
          } else {
            setbtnXRAY_FColor("#059212");
          }
          settxtXRAYTime_F(dt35.xray_date);
          settxtXRAYCnt_F(dt35.xray_count);
        }
      }

      if (hypSheetNoB !== "") {
        setbtnXRAY_B("");
        settxtXRAYCnt_B("");
        settxtXRAYTime_B("");

        await axios.post("/api/ViewTracePiece/getxrayresult", {
          strpcsno: txtPcsNo,
          strsheetno: hypSheetNoB
        })
          .then((res) => {
            dt36 = res.data;
          });

        if (dt36.xray_count > 0) {
          dt36 = dt36[0];
          setbtnXRAY_B(dt36.xray_result);
          if (btnXRAY_B === "NG" || btnXRAY_B === "FAIL") {
            setbtnXRAY_BColor("#BA0900");
          } else {
            setbtnXRAY_BColor("#059212");
          }
          settxtXRAYTime_B(dt36.xray_date);
          settxtXRAYCnt_B(dt36.xray_count);
        }
      }

      //Barcode Grade
      setlblBarcodeTitle(prevState => ({ ...prevState, visible: false }));
      setbtnBarcodeGrade(prevState => ({ ...prevState, visible: false, value: "" }));
      settxtBarcodeGradeTime(prevState => ({ ...prevState, visible: false, value: "" }));
      if (txtPcsNo !== "") {
        let dt = [];
        await axios.post("/api/ViewTracePiece/getbarcodegrade", {
          strplantcode: plantCode,
          strsheetnof: hypSheetNoF,
          strsheetnob: hypSheetNoB,
          strpcsno: txtPcsNo
        })
          .then((res) => {
            dt = res.data;
          });
        if (dt.length > 0) {
          dt = dt[0];
          setlblBarcodeTitle(prevState => ({ ...prevState, visible: true }));
          setbtnBarcodeGrade(prevState => ({ ...prevState, visible: true, value: dt.barcode_grade }));
          if ("A,B,C".includes(btnBarcodeGrade)) {
            setbtnBarcodeGradeColor("#059212");
          } else {
            setbtnBarcodeGradeColor("#BA0900");
          }
          settxtBarcodeGradeTime(prevState => ({ ...prevState, visible: true, value: dt.inspect_date }));
        }
      }

    } catch (error) {
      setlblMessage(error.message);
    }

    settxtPackingTime(prevState => ({ ...prevState, visible: false }));

    if (dtPrd.product_name !== "") {
      let strPlasmaResult = "";
      let strPlasmaRemark = "";

      await axios.post("/api/ViewTracePiece/GetPlasmaDataResultBySerial", {
        strplantcode: plantCode,
        strprdname: dtPrd.product_name,
        strserial: SerialNo,
        strLot: dt2.lot_no,
      })
        .then((res) => {
          strPlasmaRemark = res.data;
        });

      let strResultRemark = strPlasmaRemark.trim().split(";");

      setbtnScanPack(strPlasmaResult);

      if (strResultRemark.length >= 2) {
        if (strResultRemark[0] !== "") {
          settxtPackingTime(prevState => ({ ...prevState, visible: true, value: strResultRemark[0] }));
        }
        if (strResultRemark[1] !== "") {
          setlblScanPackRemark(strResultRemark[1]);
        } else {
          setlblScanPackRemark("");
        }
      } else if (strResultRemark.length === 1) {
        if (strResultRemark[0] !== "") {
          settxtPackingTime(prevState => ({ ...prevState, visible: true, value: strResultRemark[0] }));
        }
      }

      if (strPlasmaResult.toUpperCase() === "OK" ||
        strPlasmaResult.toUpperCase() === "PASS" ||
        strPlasmaResult.toUpperCase() === "GOOD") {
        setbtnScanPackColor("#059212");
        setlblScanPackRemarkColor("#059212");
      } else if (strPlasmaResult === "NG" || strPlasmaResult === "FAIL") {
        setbtnScanPackColor("#BA0900");
        setlblScanPackRemarkColor("#BA0900");
      }
    }

    if (strFinalGateStation.trim() !== "") {
      let strMCNo = GetFPCMachineNo(strFinalGateStation);
      if (strMCNo.length > 0) {
        setlblFinalGateRemark(lblFinalGateRemark + " M/C No.: " + strMCNo);
      }
    }

    setbtnAOMEFPC(prevState => ({ ...prevState, disabled: true }));
    settxtAOMEFPCCntF("");
    settxtAOMEFPCTimeF("");

    if ((hypSheetNoF !== "" || hypSheetNoB !== "") && !isNaN(txtPcsNo)) {
      let dtData = [];
      if (hypSheetNoF !== "") {
        await axios.post("/api/ViewTracePiece/GetSerialAOMEFPCResult", {
          _intPcsNo: txtPcsNo,
          _strPrdName: txtProduct,
          _strSMPJCavityFlg: "N"
        })
          .then((res) => {
            dtData = res.data;
          });
        if (dtData.length > 0) {
          StrResult = dtData[0].AOM_RESULT;
          if (StrResult !== "") {
            setbtnAOMEFPC(prevState => ({ ...prevState, value: StrResult }));
            settxtAOMEFPCTimeF(dtData[0].AOM_DATE);
            settxtAOMEFPCCntF(dtData[0].PCS_NO);
            sethfAOMRollLeafNo(dtData[0].ROLL_LEAF);
            sethfAOMLeafNo(dtData[0].LEAF_NO);
            sethfAOMPcsNo(dtData[0].PCS_NO);
            if (StrResult === "GOOD" || StrResult === "OK" || StrResult === "PASS") {
              setbtnAOMEFPCColor("#059212");
            } else {
              setbtnAOMEFPCColor("#BA0900");
            }
          }
        }
      }

      if (hypSheetNoB !== "" && btnAOMEFPC === "") {
        let dtData = [];
        await axios.post("/api/ViewTracePiece/GetSerialAOMEFPCResult", {
          _strPlantCode: plantCode,
          _strSheetNo: hypSheetNoB,
          _intPcsNo: txtPcsNo,
          _strPrdName: txtProduct,
          _strSMPJCavityFlg: "N"
        })
          .then((res) => {
            dtData = res.data;
          });
        if (dtData.length > 0) {
          dtData = dtData[0];
          StrResult = dtData.AOM_RESULT;
          if (StrResult !== "") {
            setbtnAOMEFPC(prevState => ({ ...prevState, value: StrResult }));
            settxtAOMEFPCTimeF(dtData.AOM_DATE);
            settxtAOMEFPCCntF(dtData.AOM_DATE);
            sethfAOMRollLeafNo(dtData.ROLL_LEAF);
            sethfAOMLeafNo(dtData.LEAF_NO);
            sethfAOMPcsNo(dtData.PCS_NO);
            if (StrResult === "GOOD" || StrResult === "OK" || StrResult === "PASS") {
              setbtnAOMEFPCColor("#059212");
            } else {
              setbtnAOMEFPC(prevState => ({ ...prevState, disabled: false }));
              setbtnAOMEFPCColor("#BA0900");
            }
          }
        }
      }
    }

    setbtnAOIEFPC(prevState => ({ ...prevState, disabled: true }));
    settxtAOIEFPCCntF("");
    settxtAOIEFPCTimeF("");
    if ((hypSheetNoF !== "" || hypSheetNoB !== "") && !isNaN(txtPcsNo)) {
      let dtData = [];
      if (hypSheetNoF !== "") {
        await axios.post("/api/GetSerialAOIEFPCResult", {
          _strPlantCode: plantCode,
          _strFrontSheetNo: hypSheetNoF,
          _intPcsNo: txtPcsNo,
          _strProduct: txtProduct,
          _strSMPJCavityFlg: "N",
        })
          .then((res) => {
            dtData = res.data;
          });
        console.log("AOIF", dtData)
        if (dtData.length > 0) {
          dtData = dtData[0];
          StrResult = dtData.AOI_RESULT;
          if (StrResult !== "") {
            setbtnAOIEFPC(prevState => ({ ...prevState, value: StrResult }));
            settxtAOIEFPCTimeF(dtData.AOI_DATE);
            settxtAOIEFPCCntF(dtData.PCS_NO);
            sethfAOIRollLeafNo(dtData.ROLL_LEAF);
            sethfAOILeafNo(dtData.LEAF_NO);
            sethfAOIPcsNo(dtData.PCS_NO);
            if (StrResult === "GOOD" || StrResult === "OK" || StrResult === "PASS") {
              setbtnAOIEFPCColor("#059212");
            } else {
              setbtnAOIEFPC(prevState => ({ ...prevState, disabled: false }));
              setbtnAOIEFPCColor("#BA0900");
            }
          }
        }
      }

      if (hypSheetNoB !== "" && btnAOIEFPC === "") {
        await axios.post("/api/GetSerialAOIEFPCResult", {
          _strPlantCode: plantCode,
          _strFrontSheetNo: hypSheetNoB,
          _intPcsNo: txtPcsNo,
          _strProduct: txtProduct,
          _strSMPJCavityFlg: "N",
        })
          .then((res) => {
            dtData = res.data;
          });
        if (dtData.length > 0) {
          dtData = dtData[0];
          StrResult = dtData.AOI_RESULT;
          if (StrResult !== "") {
            setbtnAOIEFPC(prevState => ({ ...prevState, value: StrResult }));
            settxtAOIEFPCTimeF(dtData.AOI_DATE);
            settxtAOIEFPCCntF(dtData.PCS_NO);
            sethfAOIRollLeafNo(dtData.ROLL_LEAF);
            sethfAOILeafNo(dtData.LEAF_NO);
            sethfAOIPcsNo(dtData.PCS_NO);
            if (StrResult === "GOOD" || StrResult === "OK" || StrResult === "PASS") {
              setbtnAOIEFPCColor("#059212");
            } else {
              setbtnAOIEFPC(prevState => ({ ...prevState, disabled: false }));
              setbtnAOIEFPCColor("#BA0900");
            }
          }
        }
      }
    }

    //OST
    setbtnOST(prevState => ({ ...prevState, disabled: true }));
    settxtOSTCntF("");
    settxtOSTTimeF("");
    sethfOSTSheetNo("");
    if ((hypSheetNoF !== "" || hypSheetNoB !== "") && !isNaN(txtPcsNo)) {
      let dtData = [];
      await axios.post("/api/GetSerialOSTResult", {
        SerialNo: hypSheetNoF,
        intPCSNo: parseInt(txtPcsNo),
        strSMPJCavityFlg: "N",
      })
        .then((res) => {
          dtData = res.data;
        });
      if (dtData.length > 0) {
        dtData = dtData[0];
        StrResult = dtData.OST_RESULT;
        setbtnOST(prevState => ({ ...prevState, value: StrResult }));
        settxtOSTTimeF(dtData.OST_DATE);
        settxtOSTCntF(dtData.PCS_NO);
        sethfOSTPcsNo(dtData.PCS_NO);
        sethfOSTSheetNo(hypSheetNoB);

        setbtnOST(prevState => ({ ...prevState, disabled: false }));
        if (StrResult === "GOOD" || StrResult === "OK" || StrResult === "PASS") {
          setbtnOSTColor("#059212");
        } else {
          setbtnOSTColor("#BA0900");
        }
      }
      if (hypSheetNoB !== "" && btnOST === "") {
        let dtData = [];
        await axios.post("/api/GetSerialOSTResult", {
          SerialNo: hypSheetNoB,
          intPCSNo: parseInt(txtPcsNo),
          strSMPJCavityFlg: "N",
        })
          .then((res) => {
            dtData = res.data;
          });
        if (dtData.length > 0) {
          dtData = dtData[0];
          StrResult = dtData.OST_RESULT;
          setbtnOST(prevState => ({ ...prevState, value: StrResult }));
          settxtOSTTimeF(dtData.OST_DATE);
          settxtOSTCntF(dtData.PCS_NO);
          sethfOSTPcsNo(dtData.PCS_NO);
          sethfOSTSheetNo(hypSheetNoB);

          setbtnOST(prevState => ({ ...prevState, disabled: false }));
          if (StrResult === "GOOD" || StrResult === "OK" || StrResult === "PASS") {
            setbtnOSTColor("#059212");
          } else {
            setbtnOSTColor("#BA0900");
          }
        }
      }
    }

    setbtnAVIF(prevState => ({ ...prevState, disabled: true }));
    settxtAVICntF("");
    settxtAVITimeF("");
    if (hypSheetNoF !== "" && !isNaN(txtPcsNo)) {
      let dtData = [];
      await axios.post("/api/ViewTracePiece/GetSerialAVIResult", {
        strSheetNo: hypSheetNoF,
        intPCSNo: parseInt(txtPcsNo),
        strSMPJCavityFlg: "N",
      })
        .then((res) => {
          dtData = res.data;
        });
      if (dtData.length > 0) {
        dtData = dtData[0];
        StrResult = dtData.AVI_RESULT;
        setbtnAVIF(prevState => ({ ...prevState, value: StrResult }));
        settxtAVITimeF(dtData.AVI_DATE);
        settxtAVICntF(dtData.PCS_NO);
        setbtnAVIF(prevState => ({ ...prevState, disabled: false }));
        if (StrResult === "GOOD" || StrResult === "OK" || StrResult === "PASS") {
          setbtnAVIFColor("#059212");
        } else {
          setbtnAVIFColor("#BA0900");
        }
      }
    }

    setbtnAVIB(prevState => ({ ...prevState, disabled: true }));
    settxtAVICntB("");
    settxtAVITimeB("");
    if (hypSheetNoB !== "" && !isNaN(txtPcsNo)) {
      let dtData = [];
      await axios.post("/api/ViewTracePiece/GetSerialAVIResult", {
        strSheetNo: hypSheetNoF,
        intPCSNo: parseInt(txtPcsNo),
        strSMPJCavityFlg: "N",
      })
        .then((res) => {
          dtData = res.data;
        });
      if (dtData.length > 0) {
        dtData = dtData[0];
        StrResult = dtData.AVI_RESULT;
        setbtnAVIB(prevState => ({ ...prevState, value: StrResult }));
        settxtAVITimeB(dtData.AVI_DATE);
        settxtAVICntB(dtData.PCS_NO);
        setbtnAVIB(prevState => ({ ...prevState, disabled: false }));
        if (StrResult === "GOOD" || StrResult === "OK" || StrResult === "PASS") {
          setbtnAVIBColor("#059212");
        } else if (StrResult !== "") {
          setbtnAVIBColor("#BA0900");
        }
      }
    }

    setbtnAVIMarkF(prevState => ({ ...prevState, disabled: true }));
    settxtAVIMarkCntF("");
    settxtAVIMarkTimeF("");
    if (hypSheetNoF !== "" && !isNaN(txtPcsNo)) {
      let dtData = [];
      await axios.post("/api/ViewTracePiece/GetSerialAVIBadmarkResult", {
        intPCSNo: txtPcsNo,
        strSMPJCavityFlg: "N",
        strSheetNo: hypSheetNoF,
      })
        .then((res) => {
          dtData = res.data;
        });
      if (dtData.length > 0) {
        dtData = dtData[0];
        if (dtData.PCS_NO > 0) {
          StrResult = dtData.AVI_RESULT;
          setbtnAVIMarkF(prevState => ({ ...prevState, value: StrResult }));
          settxtAVIMarkTimeF(dtData.AVI_DATE);
          settxtAVIMarkCntF(dtData.PCS_NO);
          setbtnAVIMarkF(prevState => ({ ...prevState, disabled: false }));
          if (StrResult === "GOOD" || StrResult === "OK" || StrResult === "PASS") {
            setbtnAVIMarkFColor("#059212");
          } else if (StrResult !== "") {
            setbtnAVIMarkFColor("#BA0900");
          }
        }
      }
    }

    setbtnAVIMarkB(prevState => ({ ...prevState, disabled: true }));
    settxtAVIMarkCntB("");
    settxtAVIMarkTimeB("");
    if (hypSheetNoB !== "" && !isNaN(txtPcsNo)) {
      let dtData = [];
      await axios.post("/api/ViewTracePiece/GetSerialAVIBadmarkResult", {
        intPCSNo: txtPcsNo,
        strSMPJCavityFlg: "N",
        strSheetNo: hypSheetNoB,
      })
        .then((res) => {
          dtData = res.data;
        });
      if (dtData.length > 0) {
        dtData = dtData[0];
        if (dtData.PCS_NO > 0) {
          StrResult = dtData.AVI_RESULT;
          setbtnAVIMarkB(prevState => ({ ...prevState, value: StrResult }));
          settxtAVIMarkTimeB(dtData.AVI_DATE);
          settxtAVIMarkCntB(dtData.PCS_NO);
          setbtnAVIMarkB(prevState => ({ ...prevState, disabled: false }));
          if (StrResult === "GOOD" || StrResult === "OK" || StrResult === "PASS") {
            setbtnAVIMarkBColor("#059212");
          } else {
            setbtnAVIMarkBColor("#BA0900");
          }
        }
      }
    }

    setbtnReflowF(prevState => ({ ...prevState, disabled: true }));
    settxtReflowCntF("");
    settxtReflowTimeF("");
    if (hypSheetNoF !== "") {
      let dtData = [];
      await axios.post("/api/Common/GetSMTSheetReflowResult", {
        strplantcode: plantCode,
        strsheetno: hypSheetNoF
      })
        .then((res) => {
          dtData = res.data;
        });

      if (dtData !== "") {
        StrResult = dtData.reflow_result;
        setbtnReflowF(prevState => ({ ...prevState, value: StrResult }));
        settxtReflowTimeF(dtData.reflow_date);
        settxtReflowCntF(dtData.reflow_count);
        setbtnReflowF(prevState => ({ ...prevState, disabled: false }));
        if (StrResult === "GOOD" || StrResult === "OK" || StrResult === "PASS") {
          setbtnReflowFColor("#059212");
        } else {
          setbtnReflowFColor("#BA0900");
        }
      }
    }

    setbtnReflowB(prevState => ({ ...prevState, disabled: true }));
    settxtReflowCntB("");
    settxtReflowTimeB("");
    if (hypSheetNoB !== "") {
      let dtData = [];
      await axios.post("/api/Common/GetSMTSheetReflowResult", {
        strplantcode: plantCode,
        strsheetno: hypSheetNoB
      })
        .then((res) => {
          dtData = res.data;
        });

      if (dtData !== "") {
        StrResult = dtData.reflow_result;
        setbtnReflowB(prevState => ({ ...prevState, value: StrResult }));
        settxtReflowTimeB(dtData.reflow_date);
        settxtReflowCntB(dtData.reflow_count);
        setbtnReflowB(prevState => ({ ...prevState, disabled: false }));
        if (StrResult === "GOOD" || StrResult === "OK" || StrResult === "PASS") {
          setbtnReflowBColor("#059212");
        } else {
          setbtnReflowBColor("#BA0900");
        }
      }
    }

  };

  const Get_Select = async (KEY_TYPE, SERIAL_NO, TEST_TYPE, SERIAL_CHIP, plantCode) => {
    let dt = []
    switch (KEY_TYPE) {
      case "1":
        await axios.post("/api/ViewTracePiece/getkeytype", {
          strplantcode: plantCode,
          strserialno: SERIAL_NO,
          strtesttype: TEST_TYPE
        })
          .then((res) => {
            dt = res.data;
          });
    }
    return dt
  };

  const btnRetrive_Click = async () => {
    localStorage.setItem("SERIAL_NO", txtSerialNo);
    Clear_View();
    ViewData();
  };

  const btnSPIF_Click = async () => {
    if (txtSPICntF !== "") {
      if (SPI_Maker === "CKD") {
        PanelNo = (parseInt(txtPcsNo.trim()) - 1).toString();
      } else {
        PanelNo = txtPcsNo;
      }
      let linkfinalGate = `/TraceabilitySystem/SPIResult?sheet_no=${hypSheetNoF}&PRODUCT_NAME=${txtProduct}&panel_no=${PanelNo}`;
      window.open(linkfinalGate, '_blank');
    } else {
      setlblMessage("Please input PieceNo and click Retrive.");
    }
  };

  const btnOST_Click = async () => {
    if (hfOSTSheetNo !== "") {
      let linkfinalGate = `/TraceabilitySystem/OSTResultPiece?sheet_no=${hfOSTSheetNo}&pcs_no=${hfOSTPcsNo}`;
      window.open(linkfinalGate, '_blank');
    }
  };

  const btnPreAOIF_Click = async () => {
    if (txtPreAOICntF !== "") {
      if (hidAOIF === "") {
        localStorage.setItem("SHEET_NO", hypSheetNoF);
        localStorage.setItem("PRODUCT_NAME", txtProduct);
        localStorage.setItem("SHEET_SIDE", "F");
        localStorage.setItem("PIECE_NO", txtPcsNo);
        localStorage.setItem("PRE_RESULT", btnPreAOIF);
        let linkfinalGate = `/TraceabilitySystem/PREResult?sheet_no=${hypSheetNoF}&PRODUCT_NAME=${txtProduct}&piece_no=${txtPcsNo}&pre_result=${btnPreAOIF}`;
        window.open(linkfinalGate, '_blank');
      }
    }
  };

  const btnPreAOIB_Click = async () => {
    if (txtPreAOICntB !== "") {
      if (hidAOIB === "") {
        localStorage.setItem("SHEET_SIDE", "B");
        let linkfinalGate = `/TraceabilitySystem/PREResult?sheet_no=${hypSheetNoB}&PRODUCT_NAME=${txtProduct}&piece_no=${txtPcsNo}&pre_result=${btnPreAOIB}`;
        window.open(linkfinalGate, '_blank');
      }
    }
  };

  const btnClear_Click = () => {
    settxtSerialNo("");
    Clear_View();
  };

  const btnSPIB_Click = async () => {
    if (txtSPICntB !== "") {
      localStorage.setItem("SHEET_NO", hypSheetNoB);
      if (SPI_Maker === "CKD") {
        PanelNo = (parseInt(txtPcsNo.trim()) - 1).toString();
      } else {
        PanelNo = txtPcsNo;
      }
      localStorage.setItem("PANEL_NO", PanelNo);
      let linkfinalGate = `/TraceabilitySystem/SPIResult?sheet_no=${hypSheetNoB}&PRODUCT_NAME=${txtProduct}&panel_no=${PanelNo}`;
      window.open(linkfinalGate, '_blank');
    }
  };


  const btnAOIF_Click = async () => {
    if (txtAOICntF !== "" && btnAOIF !== "OK") {
      let linkfinalGate = `/TraceabilitySystem/AOIResult?sheet_no=${hypSheetNoF}&PRODUCT_NAME=${txtProduct}&panel_no=${txtPcsNo}`;
      window.open(linkfinalGate, '_blank');
    }
  };

  const btnAOIB_Click = async () => {
    if (txtAOICntB !== "" && btnAOIB !== "OK") {
      let linkfinalGate = `/TraceabilitySystem/AOIResult?sheet_no=${hypSheetNoB}&PRODUCT_NAME=${txtProduct}&panel_no=${txtPcsNo}`;
      window.open(linkfinalGate, '_blank');
    }
  };

  const btnReject1_Click = async () => {
    if (txtRejectCnt1 !== "") {
      let linkfinalGate = `/TraceabilitySystem/RejectResult?serial_no=${txtSerialNo}&rej_order=1`;
      window.open(linkfinalGate, '_blank');
    }
  };

  const btnTouchUp_Click = async () => {
    if (txtTouchUpCnt !== "") {
      localStorage.setItem("SERIAL_NO", txtSerialNo);
      //Response.Redirect("TouchUp_Result.aspx")
    }
  };

  const btnELT1_Click = async () => {
    if (txtELTCnt1 !== "") {
      localStorage.setItem("SERIAL_NO", txtSerialNo);
      localStorage.setItem("SERIAL_CHIP", txtSerialChip);
      localStorage.setItem("PRODUCT_NAME", txtProduct);
      localStorage.setItem("KEY_TYPE", lblKeyType1);
      localStorage.setItem("CHECK_ID", lblCheckID1);
      localStorage.setItem("TEST_TYPE", lblTestType1);
      switch (lblKeyType1) {
        case "1":
        //Response.Redirect("Checker_Result.aspx")
        case "2":
        //Response.Redirect("Checker_Result2.aspx")
        case "3":
        //Response.Redirect("Checker_Result3.aspx")
      }
    }
  };

  const btnELT2_Click = async () => {
    if (txtELTCnt2 !== "") {
      localStorage.setItem("SERIAL_NO", txtSerialNo);
      localStorage.setItem("SERIAL_CHIP", txtSerialChip);
      localStorage.setItem("PRODUCT_NAME", txtProduct);
      localStorage.setItem("KEY_TYPE", lblKeyType2);
      localStorage.setItem("CHECK_ID", lblCheckID2);
      localStorage.setItem("TEST_TYPE", lblTestType2);
      switch (lblKeyType2) {
        case "1":
        //Response.Redirect("Checker_Result.aspx")
        case "2":
        //Response.Redirect("Checker_Result2.aspx")
        case "3":
        //Response.Redirect("Checker_Result3.aspx")
      }
    }
  };

  const btnELT3_Click = async () => {
    if (txtELTCnt3 !== "") {
      localStorage.setItem("SERIAL_NO", txtSerialNo);
      localStorage.setItem("SERIAL_CHIP", txtSerialChip);
      localStorage.setItem("PRODUCT_NAME", txtProduct);
      localStorage.setItem("KEY_TYPE", lblKeyType3);
      localStorage.setItem("CHECK_ID", lblCheckID3);
      localStorage.setItem("TEST_TYPE", lblTestType3);
      switch (lblKeyType3) {
        case "1":
        //Response.Redirect("Checker_Result.aspx")
        case "2":
        //Response.Redirect("Checker_Result2.aspx")
        case "3":
        //Response.Redirect("Checker_Result3.aspx")
      }
    }
  };

  const btnELT4_Click = async () => {
    if (txtELTCnt4 !== "") {
      localStorage.setItem("SERIAL_NO", txtSerialNo);
      localStorage.setItem("SERIAL_CHIP", txtSerialChip);
      localStorage.setItem("PRODUCT_NAME", txtProduct);
      localStorage.setItem("KEY_TYPE", lblKeyType4);
      localStorage.setItem("CHECK_ID", lblCheckID4);
      localStorage.setItem("TEST_TYPE", lblTestType4);
      switch (lblKeyType4) {
        case "1":
        //Response.Redirect("Checker_Result.aspx")
        case "2":
        //Response.Redirect("Checker_Result2.aspx")
        case "3":
        //Response.Redirect("Checker_Result3.aspx")
      }
    }
  };

  const btnELT5_Click = async () => {
    if (txtELTCnt5 !== "") {
      localStorage.setItem("SERIAL_NO", txtSerialNo);
      localStorage.setItem("SERIAL_CHIP", txtSerialChip);
      localStorage.setItem("PRODUCT_NAME", txtProduct);
      localStorage.setItem("KEY_TYPE", lblKeyType5);
      localStorage.setItem("CHECK_ID", lblCheckID5);
      localStorage.setItem("TEST_TYPE", lblTestType5);
      switch (lblKeyType5) {
        case "1":
        //Response.Redirect("Checker_Result.aspx")
        case "2":
        //Response.Redirect("Checker_Result2.aspx")
        case "3":
        //Response.Redirect("Checker_Result3.aspx")
      }
    }
  };

  const btnELT6_Click = async () => {
    if (txtELTCnt6 !== "") {
      localStorage.setItem("SERIAL_NO", txtSerialNo);
      localStorage.setItem("SERIAL_CHIP", txtSerialChip);
      localStorage.setItem("PRODUCT_NAME", txtProduct);
      localStorage.setItem("KEY_TYPE", lblKeyType6);
      localStorage.setItem("CHECK_ID", lblCheckID6);
      localStorage.setItem("TEST_TYPE", lblTestType6);
      switch (lblKeyType6) {
        case "1":
        //Response.Redirect("Checker_Result.aspx")
        case "2":
        //Response.Redirect("Checker_Result2.aspx")
        case "3":
        //Response.Redirect("Checker_Result3.aspx")
      }
    }
  };

  const btnELT7_Click = async () => {
    if (txtELTCnt7 !== "") {
      localStorage.setItem("SERIAL_NO", txtSerialNo);
      localStorage.setItem("SERIAL_CHIP", txtSerialChip);
      localStorage.setItem("PRODUCT_NAME", txtProduct);
      localStorage.setItem("KEY_TYPE", lblKeyType7);
      localStorage.setItem("CHECK_ID", lblCheckID7);
      localStorage.setItem("TEST_TYPE", lblTestType7);
      switch (lblKeyType7) {
        case "1":
        //Response.Redirect("Checker_Result.aspx")
        case "2":
        //Response.Redirect("Checker_Result2.aspx")
        case "3":
        //Response.Redirect("Checker_Result3.aspx")
      }
    }
  };

  const GetFPCMachineNo = async (strFinalGateStation) => {
    let strMCNo = "";
    let _dtData = [];

    await axios.post("/api/ViewTracePiece/GetMCNO", {
      p_IPAddress: strFinalGateStation
    })
      .then((res) => {
        _dtData = res.data;
      });

    console.log("strMCNo", _dtData)
    if (_dtData !== "") {
      strMCNo = _dtData.MC_NO;
    }
    return strMCNo;
  };

  const btnXRAY_Click = async () => {
    if (btnXRAY_F !== "") {
      localStorage.setItem("LOT_NO", hypLotNo);
      //localStorage.setItem("SHEET_NO", hypSheetNoF);
      //localStorage.setItem("SERIAL_NO", txtPcsNo);
      localStorage.setItem("INSPECT_NO", txtXRAYCnt_F);
      localStorage.setItem("INSPECT_DATE", txtXRAYTime_F);
      let linkfinalGate = `/TraceabilitySystem/XRayResult?sheet_no=${hypSheetNoF}&Serial=${txtSerialNo}`;
      window.open(linkfinalGate, '_blank');
      localStorage.setItem("SERIAL", txtSerialNo);
    }
  };

  const btnXRAY_B_Click = async () => {
    if (btnXRAY_B !== "") {
      // localStorage.setItem("LOT_NO", hypLotNo);
      // localStorage.setItem("SHEET_NO", hypSheetNoB);
      // localStorage.setItem("SERIAL", txtSerialNo);
      // localStorage.setItem("SERIAL_NO", txtPcsNo);
      // localStorage.setItem("INSPECT_NO", txtXRAYCnt_B);
      // localStorage.setItem("INSPECT_DATE", txtXRAYTime_B);
      let linkfinalGate = `/TraceabilitySystem/XRayResult?sheet_no=${hypSheetNoB}&Serial=${txtSerialNo}`;
      window.open(linkfinalGate, '_blank');
    };
  };

  const btnFinalGate_Click = async () => {
    let linkfinalGate = `/TraceabilitySystem/FinalGate_History?SERIAL=${txtSerialNo}&INSPECT_NO=${txtPcsNo}`;
    localStorage.setItem("SERIAL", txtSerialNo);
    window.open(linkfinalGate, '_blank');
  };

  const btnAOICOAF_Click = async () => {
    if (txtAOICOACntF !== "" && btnAOICOAF !== "OK") {
      localStorage.setItem("PRODUCT_NAME", txtProduct);
      localStorage.setItem("SHEET_NO", hypSheetNoF);
      localStorage.setItem("PANEL_NO", txtPcsNo);
      //Response.Redirect("AOI_COA_Result.aspx")
    }
  };

  const btnAOICOAB_Click = async () => {
    if (txtAOICOACntB !== "" && btnAOICOAB !== "OK") {
      localStorage.setItem("PRODUCT_NAME", txtProduct);
      localStorage.setItem("SHEET_NO", hypSheetNoB);
      localStorage.setItem("PANEL_NO", txtPcsNo);
      //Response.Redirect("AOI_COA_Result.aspx")
    }
  };

  return {
    txtSerialNo, settxtSerialNo, txtSerialChip, lblSerialChip, settxtSerialChip, txtProduct, settxtProduct, hypLotNo, hypSheetNoB, txtPcsNo, settxtPcsNo,
    txtShtType, settxtShtType, txtAOMEFPCCntF, settxtAOMEFPCCntF, txtAOMEFPCTimeF, settxtAOMEFPCTimeF, txtAOIEFPCCntF, settxtAOIEFPCCntF,
    txtAOIEFPCTimeF, settxtAOIEFPCTimeF, txtBarcodeGradeTime, settxtBarcodeGradeTime, txtOSTCntF, settxtOSTCntF, txtOSTTimeF, settxtOSTTimeF,
    txtAVICntF, settxtAVICntF, txtAVITimeF, settxtAVITimeF, txtAVICntB, settxtAVICntB, txtAVITimeB, settxtAVITimeB, txtAVIMarkCntF, settxtAVIMarkCntF,
    txtAVIMarkTimeF, settxtAVIMarkTimeF, txtAVIMarkCntB, settxtAVIMarkCntB, txtAVIMarkTimeB, settxtAVIMarkTimeB, txtSPICntF, settxtSPICntF, txtSPITimeF,
    settxtSPITimeF, txtSPICntB, settxtSPICntB, txtSPITimeB, settxtSPITimeB, txtPreAOICntF, settxtPreAOICntF, txtPreTimeF, settxtPreTimeF, txtPreAOICntB,
    settxtPreAOICntB, txtPreTimeB, settxtPreTimeB, txtReflowCntF, settxtReflowCntF, txtReflowTimeF, settxtReflowTimeF, txtReflowCntB, settxtReflowCntB,
    txtReflowTimeB, settxtReflowTimeB, txtAOICntF, settxtAOICntF, txtAOITimeF, settxtAOITimeF, txtAOICntB, settxtAOICntB, txtAOITimeB, settxtAOITimeB,
    txtXRAYCnt_F, settxtXRAYCnt_F, txtXRAYTime_F, settxtXRAYTime_F, txtXRAYCnt_B, settxtXRAYCnt_B, txtXRAYTime_B, settxtXRAYTime_B, txtAOICOACntF, settxtAOICOACntF,
    txtAOICOATimeF, settxtAOICOATimeF, txtAOICOACntB, settxtAOICOACntB, txtAOICOATimeB, settxtAOICOATimeB, txtSMTIntCntF, settxtSMTIntCntF, txtSMTIntTimeF, settxtSMTIntTimeF,
    txtSMTIntCntB, settxtSMTIntCntB, txtSMTIntTimeB, settxtSMTIntTimeB, txtRejectCnt1, settxtRejectCnt1, txtRejectTime1, settxtRejectTime1, txtTouchUpCnt, settxtTouchUpCnt,
    txtTouchUpTime, settxtTouchUpTime, txtBendingTime, settxtBendingTime, lblBendingMachine, txtELTCnt1, settxtELTCnt1, txtELTTime1, settxtELTTime1, txtELTCnt2, settxtELTCnt2,
    txtELTTime2, settxtELTTime2, txtELTCnt3, settxtELTCnt3, txtELTTime3, settxtELTTime3, txtELTCnt4, settxtELTCnt4, txtELTTime4, settxtELTTime4, txtELTCnt5, settxtELTCnt5,
    txtELTTime5, settxtELTTime5, txtELTCnt6, settxtELTCnt6, txtELTTime6, settxtELTTime6, txtELTCnt7, settxtELTCnt7, txtELTTime7, settxtELTTime7, txtFQCTime, settxtFQCTime,
    lblFQC, lblFQCMachine, lblFQCOperator, txtFinalGateTime, settxtFinalGateTime, lblFinalGateRemark, txtPackingTime, settxtPackingTime, lblScanPackRemark, lblScanPackRemarkColor,
    lblMessage, lblELT1, lblELT2, lblELT3, lblELT4, lblELT5, lblELT6, lblELT7, lblKeyType1, lblKeyType2, lblKeyType3, lblKeyType4, lblKeyType5, lblKeyType6, lblKeyType7, lblCheckID1,
    lblCheckID2, lblCheckID3, lblCheckID4, lblCheckID5, lblCheckID6, lblCheckID7, lblTestType1, lblTestType2, lblTestType3, lblTestType4, lblTestType5, lblTestType6, lblTestType7,
    lblBarcodeTitle, btnAOMEFPC, btnAOIEFPC, btnBarcodeGrade, btnOST, btnAVIF, btnAVIB, btnAVIMarkF, btnAVIMarkB, btnSPIF, btnSPIB, btnPreAOIF, btnPreAOIB, btnReflowF, btnReflowB,
    btnAOIF, btnAOIB, btnXRAY_F, btnXRAY_B, btnAOICOAF, btnAOICOAB, btnSMTIntF, btnSMTIntB, btnReject1, btnTouchUp, btnBending, btnELT1, btnELT2, btnELT3, btnELT4, btnELT5, btnELT6,
    btnELT7, btnFQC, btnFinalGate, btnScanPack, txtSPICntBColor, txtSPITimeBColor, txtPreAOICntBColor, txtPreTimeBColor, txtAOICntBColor, txtAOITimeBColor, txtSPICntFColor, txtSPITimeFColor,
    txtPreAOICntFColor, txtPreTimeFColor, txtAOICntFColor, txtAOITimeFColor, btnAOMEFPCColor, btnAOIEFPCColor, btnBarcodeGradeColor, btnOSTColor, btnAVIFColor, btnAVIBColor, btnAVIMarkFColor,
    btnAVIMarkBColor, btnSPIFColor, btnSPIBColor, btnPreAOIFColor, btnPreAOIBColor, btnReflowFColor, btnReflowBColor, btnAOIFColor, btnAOIBColor, btnXRAY_FColor, btnbtnXRAY_BColor,
    btnAOICOAFColor, btnAOICOABColor, btnSMTIntFColor, btnSMTIntBColor, btnReject1Color, btnTouchUpColor, btnBendingColor, btnELT1Color, btnELT2Color, btnELT3Color, btnELT4Color, btnELT5Color,
    btnELT6Color, btnELT7Color, btnFQCColor, btnFinalGateColor, btnScanPackColor, btnPreAOIF_Click, btnClear_Click, btnSPIB_Click, btnPreAOIB_Click, btnAOIF_Click, btnAOIB_Click, btnReject1_Click,
    btnTouchUp_Click, btnELT1_Click, btnELT2_Click, btnELT3_Click, btnELT4_Click, btnELT5_Click, btnELT6_Click, btnELT7_Click, btnXRAY_Click, btnXRAY_B_Click, btnFinalGate_Click, btnAOICOAF_Click,
    btnAOICOAB_Click, btnRetrive_Click, btnSPIF_Click, btnOST_Click, hypSheetNoF
  }
}

export { fn_PieceTraceView };