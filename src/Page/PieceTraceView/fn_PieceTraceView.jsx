import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function fn_PieceTraceView() {
  const [txtSerialNo, settxtSerialNo] = useState("");
  const [txtSerialChip, settxtSerialChip] = useState("");
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
  const [txtBarcodeGradeTime, settxtBarcodeGradeTime] = useState("");
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
  const [txtELTCnt1, settxtELTCnt1] = useState("");
  const [txtELTTime1, settxtELTTime1] = useState("");
  const [txtELTCnt2, settxtELTCnt2] = useState("");
  const [txtELTTime2, settxtELTTime2] = useState("");
  const [txtELTCnt3, settxtELTCnt3] = useState("");
  const [txtELTTime3, settxtELTTime3] = useState("");
  const [txtELTCnt4, settxtELTCnt4] = useState("");
  const [txtELTTime4, settxtELTTime4] = useState("");
  const [txtELTCnt5, settxtELTCnt5] = useState("");
  const [txtELTTime5, settxtELTTime5] = useState("");
  const [txtELTCnt6, settxtELTCnt6] = useState("");
  const [txtELTTime6, settxtELTTime6] = useState("");
  const [txtELTCnt7, settxtELTCnt7] = useState("");
  const [txtELTTime7, settxtELTTime7] = useState("");
  const [txtFQCTime, settxtFQCTime] = useState("");
  const [lblFQCMachine, setlblFQCMachine] = useState("");
  const [lblFQCOperator, setlblFQCOperator] = useState("");
  const [txtFinalGateTime, settxtFinalGateTime] = useState("");
  const [lblFinalGateRemark, setlblFinalGateRemark] = useState("");
  const [txtPackingTime, settxtPackingTime] = useState("");
  const [lblScanPackRemark, setlblScanPackRemark] = useState("");
  const [lblMessage, setlblMessage] = useState("");
  const [hypMaterialF, sethypMaterialF] = useState({ visible: false, value: "" });
  const [hypMaterialB, sethypMaterialB] = useState({ visible: false, value: "" });

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
  const [btnAOMEFPC, setbtnAOMEFPC] = useState("");
  const [btnAOIEFPC, setbtnAOIEFPC] = useState("");
  const [btnBarcodeGrade, setbtnBarcodeGrade] = useState("");
  const [btnOST, setbtnOST] = useState("");
  const [btnAVIF, setbtnAVIF] = useState("");
  const [btnAVIB, setbtnAVIB] = useState("");
  const [btnAVIMarkF, setbtnAVIMarkF] = useState("");
  const [btnAVIMarkB, setbtnAVIMarkB] = useState("");
  const [btnSPIF, setbtnSPIF] = useState({ visible: true, value: "" });
  const [btnSPIB, setbtnSPIB] = useState({ visible: true, value: "" });
  const [btnPreAOIF, setbtnPreAOIF] = useState({ visible: true, value: "" });
  const [btnPreAOIB, setbtnPreAOIB] = useState({ visible: true, value: "" });
  const [btnReflowF, setbtnReflowF] = useState("");
  const [btnReflowB, setbtnReflowB] = useState("");
  const [btnAOIF, setbtnAOIF] = useState("");
  const [btnAOIB, setbtnAOIB] = useState("");
  const [btnXRAY_F, setbtnXRAY_F] = useState("");
  const [btnbtnXRAY_B, setbtnXRAY_B] = useState("");
  const [btnAOICOAF, setbtnAOICOAF] = useState("");
  const [btnAOICOAB, setbtnAOICOAB] = useState("");
  const [btnSMTIntF, setbtnSMTIntF] = useState("");
  const [btnSMTIntB, setbtnSMTIntB] = useState("");
  const [btnReject1, setbtnReject1] = useState("");
  const [btnTouchUp, setbtnTouchUp] = useState("");
  const [btnBending, setbtnBending] = useState("");
  const [btnELT1, setbtnELT1] = useState("");
  const [btnELT2, setbtnELT2] = useState("");
  const [btnELT3, setbtnELT3] = useState("");
  const [btnELT4, setbtnELT4] = useState("");
  const [btnELT5, setbtnELT5] = useState("");
  const [btnELT6, setbtnELT6] = useState("");
  const [btnELT7, setbtnELT7] = useState("");
  const [btnFQC, setbtnFQC] = useState("");
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

  const PanelNo = "";
  const SPI_Maker = "ABC";
  const strConnectNAPK = "NAPK";
  const FINAL_GATE_SPECIAL_FLG = import.meta.env.FINAL_GATE_SPECIAL_FLG;
  const FINAL_GATE_SPECIAL_PRD = import.meta.env.FINAL_GATE_SPECIAL_PRD;
  const FINAL_GATE_SPECIAL_MESSAGE = import.meta.env.FINAL_GATE_SPECIAL_MESSAGE;
  const FINAL_GATE_SPECIAL_OK = "OK";
  const FINAL_GATE_SPECIAL_TYPE = import.meta.env.FINAL_GATE_SPECIAL_TYPE;
  const SERIAL_DATABASE_SWITCH = 0;
  const AOI_SHOW_ERROR = "SIP HEIGHT";
  const plantCode = import.meta.env.VITE_FAC;

  useEffect(() => {
    PageLoad();
  }, []);

  const PageLoad = async () => {
    const searchParams = new URLSearchParams(window.location.search);
    const paramValue = searchParams.get("SERIAL");
    Clear_View();
    if (paramValue !== "") {
      settxtSerialNo(paramValue);
      //ViewData();
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
    setbtnSPIFColor("#B6BBC4");
    settxtSPICntF("");
    settxtSPITimeF("");
    setbtnSPIBColor("#B6BBC4");
    settxtSPICntB("");
    settxtSPITimeB("");

    //PreAOI
    setbtnPreAOIFColor("#B6BBC4");
    settxtPreAOICntF("");
    settxtPreTimeF("");
    setbtnPreAOIB("");
    setbtnPreAOIBColor("#B6BBC4");
    settxtPreAOICntB("");
    settxtPreTimeB("");

    //AOI
    setbtnAOIFColor("#B6BBC4");
    settxtAOICntF("");
    settxtAOITimeF("");
    setbtnAOIBColor("#B6BBC4");
    settxtAOICntB("");
    settxtAOITimeB("");

    //XRAY
    setbtnXRAY_FColor("#B6BBC4");
    settxtXRAYCnt_F("");
    settxtXRAYTime_F("");
    setbtnXRAY_BColor("#B6BBC4");
    settxtXRAYCnt_B("");
    settxtXRAYTime_B("");

    //AOICOAT
    setbtnAOICOAFColor("#B6BBC4");
    settxtAOICOACntF("");
    settxtAOICOATimeF("");
    setbtnAOICOABColor("#B6BBC4");
    settxtAOICOACntB("");
    settxtAOICOATimeB("");

    //SMT
    setbtnSMTIntFColor("#B6BBC4");
    settxtSMTIntCntF("");
    settxtSMTIntTimeF("");
    setbtnSMTIntBColor("#B6BBC4");
    settxtSMTIntCntB("");
    settxtSMTIntTimeB("");

    //Reject1
    setbtnReject1Color("#B6BBC4");
    settxtRejectCnt1("");
    settxtRejectTime1("");

    //TouchUp
    setbtnTouchUpColor("#B6BBC4");
    settxtTouchUpCnt("");
    settxtTouchUpTime("");

    //FQC
    setbtnFQCColor("#B6BBC4");
    settxtFQCTime("");

    //Bending
    setbtnBendingColor("#B6BBC4");
    settxtBendingTime("");
    setlblBendingMachine("");

    //ELT1
    setbtnELT1Color("#B6BBC4");
    settxtELTCnt1("");
    settxtELTTime1("");

    //ELT2
    setbtnELT2Color("#B6BBC4");
    settxtELTCnt2("");
    settxtELTTime2("");

    //ELT3
    setbtnELT3Color("#B6BBC4");
    settxtELTCnt3("");
    settxtELTTime3("");

    //ELT4
    setbtnELT4Color("#B6BBC4");
    settxtELTCnt4("");
    settxtELTTime4("");

    //ELT5
    setbtnELT5Color("#B6BBC4");
    settxtELTCnt5("");
    settxtELTTime5("");

    //ELT6
    setbtnELT6Color("#B6BBC4");
    settxtELTCnt6("");
    settxtELTTime6("");

    //ELT7
    setbtnELT7Color("#B6BBC4");
    settxtELTCnt7("");
    settxtELTTime7("");

    //AOMEFPC
    setbtnAOMEFPCColor("#B6BBC4");
    settxtAOMEFPCCntF("");
    settxtAOMEFPCTimeF("");
    sethfAOMRollLeafNo("");
    sethfAOMLeafNo("");
    sethfAOMPcsNo("");

    //AOIEFPC
    setbtnAOIEFPCColor("#B6BBC4");
    settxtAOIEFPCCntF("");
    settxtAOIEFPCTimeF("");
    sethfAOIRollLeafNo("");
    sethfAOILeafNo("");
    sethfAOIPcsNo("");

    //OST
    setbtnOSTColor("#B6BBC4");
    settxtOSTCntF("");
    settxtOSTTimeF("");
    sethfOSTSheetNo("");
    sethfOSTPcsNo("");

    //AVI
    setbtnAVIFColor("#B6BBC4");
    settxtAVICntF("");
    settxtAVITimeF("");

    setbtnAVIBColor("#B6BBC4");
    settxtAVICntB("");
    settxtAVITimeB("");

    setbtnAVIMarkFColor("#B6BBC4");
    settxtAVIMarkCntF("");
    settxtAVIMarkTimeF("");

    setbtnAVIMarkBColor("#B6BBC4");
    settxtAVIMarkCntB("");
    settxtAVIMarkTimeB("");

    //Reflow
    setbtnReflowFColor("#B6BBC4");
    settxtReflowCntF("");
    settxtReflowTimeF("");

    setbtnReflowBColor("#B6BBC4");
    settxtReflowCntB("");
    settxtReflowTimeB("");

    //FinalGate
    setbtnFinalGateColor("#B6BBC4");
    settxtFinalGateTime("");
    setlblFinalGateRemark("");
    //BarcodeGrade
    setbtnBarcodeGradeColor("#B6BBC4");
    settxtBarcodeGradeTime("");
    //ScanPack
    setbtnScanPackColor("#B6BBC4");
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
    let SheetType = "D";
    let BarcodeSide = "";
    let i = 0;
    let StrResult = "";
    let ELT_Count = 0;
    let strFinalGateStation = "";

    try {
      if (SERIAL_DATABASE_SWITCH === 1) {
        SERIAL_DATABASE_SWITCH;
      } else {
        SERIAL_DATABASE_SWITCH = 0;
      }

      await axios.post("/api/GetSerialNo", {
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

      await axios.post("/api/getdataproduct", {
        strplantcode: plantCode,
        strserialno: txtSerialNo
      })
        .then((res) => {
          dtPrd = res.data;
        });
      console.log("dtPrd", dtPrd);
      if (dtPrd !== "") {
        settxtProduct(dtPrd.product_name);
        sethypLotNo(dtPrd.lot_no);
        //hypLotNo.NavigateUrl = "./rpt_LotTraceView.aspx?LOT=" & dtPrd.lot_no)

        setbtnFinalGate(dtPrd.final_result);
        strFinalGateStation = dtPrd.update_by;

        if (btnFinalGate === "OK" || btnFinalGate === "PASS") {
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

      if (dtPrd === "") {
        await axios.post("/api/getproductname", {
          strplantcode: plantCode,
          strserialno: txtSerialNo
        })
          .then((res) => {
            dt = res.data;
          });

        if (dt.length <= 0) {
          if (dtSerial.length > 0) {
            settxtProduct(dtSerial.productname);
            sethypLotNo(dtSerial.lotno);
            //hypLotNo.NavigateUrl = "./rpt_LotTraceView.aspx?LOT=" & dtSerial.lotno
          } else {
            setlblMessage("Error : SMT_SERIAL_NO isn't Found!");
          }
        }
      }

      await axios.post("/api/getproductmst", {
        strprdname: txtProduct
      })
        .then((res) => {
          dt1 = res.data;
        });

      if (dt.length > 0) {
        SheetType = dt1.sheet_type;
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
        // if (ELT_Count === 3) {
        //api trc_checker_header3 ไม่ใช้แล้ว
        // }
      } else {
        setlblMessage("Error : Product Master not Found!");
      }

      await axios.post("/api/getlotsheetserial", {
        strplantcode: plantCode,
        strserialno: txtSerialNo
      })
        .then((res) => {
          dt2 = res.data;
        });

      sethypMaterialF("");
      sethypMaterialB("");

      if (dt2.length > 0) {
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

      if (hypSheetNoF !== "") {
        await axios.post("/api/getspifront", {
          strplantcode: plantCode,
          strprdname: txtProduct,
          strpcsno: txtPcsNo,
          strsheetnof: hypSheetNoF
        })
          .then((res) => {
            dt3 = res.data;
          });

        if (dt3.length === 0) {
          if (SPI_Maker === "CKD") {
            PanelNo = String(Math.max(0, parseInt(txtPcsNo, 10) - 1)).trim();
          } else {
            PanelNo = txtPcsNo;
          }

          await axios.post("/api/getspiresult", {
            strplantcode: plantCode,
            strsheetnof: hypSheetNoF,
            strpanel: PanelNo
          })
            .then((res) => {
              dt4 = res.data;
            });
          console.log("dt4", dt4)
        }

        if (dt3.length > 0) {
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
          setbtnSPIF(prevState => ({ ...prevState, visible: true, value: StrResult }));

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
              setbtnSPIF(prevState => ({ ...prevState, visible: true, value: "" }));
              break;
            default:
              setbtnSPIFColor("#059212");
              break;
          }
        } else {
          await axios.post("/api/getresult", {
            strplantcode: plantCode,
            strsheetnof: hypSheetNoF
          })
            .then((res) => {
              dt5 = res.data;
            });

          if (dt5.length > 0) {
            StrResult = "BADMARK"
            settxtSPICntF(dt5.int_count);
            settxtSPITimeF(dt5.inspect_date);
            setbtnSPIF(prevState => ({ ...prevState, visible: true, value: StrResult }));
            setbtnSPIFColor("#BA0900");
          } else {
            setbtnSPIF(prevState => ({ ...prevState, visible: false, value: "" }));
            settxtSPICntF("");
            settxtSPITimeF("");
          }
        }
      }

      //SPI Back
      if (hypSheetNoB !== "") {
        await axios.post("/api/getspiback", {
          strplantcode: plantCode,
          strprdname: txtProduct,
          strpcsno: txtPcsNo,
          strsheetnob: hypSheetNoB
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

          await axios.post("/api/getspiresult", {
            strplantcode: plantCode,
            strsheetnof: hypSheetNoB,
            strpanel: PanelNo
          })
            .then((res) => {
              dt7 = res.data;
            });
          console.log("dt7", dt7)
        }

        if (dt6.length > 0) {
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
          await axios.post("/api/getresult", {
            strplantcode: plantCode,
            strsheetnof: hypSheetNoB
          })
            .then((res) => {
              dt8 = res.data;
            });

          if (dt8.length > 0) {
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
        await axios.post("/api/getspi", {
          strplantcode: plantCode,
          strsheetno: txtSerialNo
        })
          .then((res) => {
            dt9 = res.data;
          });

        if (dt9.length > 0) {
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
        await axios.post("/api/getpreaoifront", {
          strplantcode: plantCode,
          strsheetno: hypSheetNoF
        })
          .then((res) => {
            dt10 = res.data;
          });

        if (dt10.length > 0) {
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
              await axios.post("/api/getpreaoifronttelse", {
                strplantcode: plantCode,
                strsheetno: hypSheetNoF,
                strpcsno: txtPcsNo
              })
                .then((res) => {
                  dt11 = res.data;
                });

              if (dt11.length > 0) {
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
          setbtnPreAOIF(prevState => ({ ...prevState, visible: false }));
          settxtPreAOICntF("");
          settxtPreTimeF("");
        }
      }

      //PreAOIB
      if (hypSheetNoB !== "") {
        await axios.post("/api/getpreaoifront", {
          strplantcode: plantCode,
          strsheetno: hypSheetNoB
        })
          .then((res) => {
            dt12 = res.data;
          });

        if (dt12.length > 0) {
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
              await axios.post("/api/getpreaoifronttelse", {
                strplantcode: plantCode,
                strsheetno: hypSheetNoB,
                strpcsno: txtPcsNo
              })
                .then((res) => {
                  dt13 = res.data;
                });

              if (dt13.length > 0) {
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
          setbtnPreAOIB(prevState => ({ ...prevState, visible: false }));
          settxtPreAOICntB("");
          settxtPreTimeB("");
        }
      }

      //AOI Front
      await axios.post("/api/getaoi", {
        strplantcode: plantCode,
        strsheetno: hypSheetNoF,
        strpcsno: txtPcsNo
      })

    } catch (error) {

    }
  };

  return {

  }
};

export { fn_PieceTraceView };