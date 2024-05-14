import React, { useState, useEffect } from "react";
import axios from "axios";
import { useIPAddress } from "../Common/function_Common";
import swal from "sweetalert";

function ProductMasterPopup(onClose, item, searchFunction) {
  const STATUS_P = localStorage.getItem("STATUS");

  const UserLogin = localStorage.getItem("IDCode");
  const [user_id, setuser_id] = useState("");
  const { ipaddress, setipaddress } = useIPAddress();

  const [factory, setFactory] = useState([]);
  const [DDL_Factory, setDDL_Factory] = useState("");
  const [txtProductName, settxtProductName] = useState("");
  const [txtUpCount, settxtUpCount] = useState("");
  const [txtConfig, settxtConfig] = useState("");
  const [txtStSeqSerial, settxtStSeqSerial] = useState("");
  const [txtStSeqCode, settxtStSeqCode] = useState("");
  const [DDL_ProductStatus, setDDL_ProductStatus] = useState("ACTIVE");
  //Date In Process
  const [DateProFlag, setDateProFlag] = useState("");
  const [txtDateInProcess, settxtDateInProcess] = useState("");
  //Pcs Per Sheet
  const [txtPcsPerSHTEFPC, settxtPcsPerSHTEFPC] = useState("");
  const [txtPcsPerSHTSMT, settxtPcsPerSHTSMT] = useState("");
  //Serial
  const [txtSerialFile, settxtSerialFile] = useState("");
  const [DDL_Serialside, setDDL_Serialside] = useState('');
  const [SerialStruc, setSerialStruc] = useState([]);
  const [DDL_SerialStruc, setDDL_SerialStruc] = useState("");
  //Barcode
  const [BarReqFlag, setBarReqFlag] = useState("");
  const [txtBarcodeGrade, settxtBarcodeGrade] = useState("");

  //Sheet
  const [txtshtFileFormat, settxtshtFileFormat] = useState("");
  const [ShtStructure, setShtStructure] = useState([]);
  const [DDL_ShtStructure, setDDL_ShtStructure] = useState("");

  const [ShtType, setShtType] = useState([]);
  const [DDL_ShtType, setDDL_ShtType] = useState("");
  const [txtShtperLotEFPC, settxtShtperLotEFPC] = useState("");
  const [txtShtperLotSMT, settxtShtperLotSMT] = useState("");

  const [txtShtperscan, settxtShtperscan] = useState("");
  const [txtShtperlaser, settxtShtperlaser] = useState("");
  const [txtShtModelCode, settxtShtModelCode] = useState("");

  const [ShtProFlag, setShtProFlag] = useState("");
  const [ShtLotFlag, setShtLotFlag] = useState("");
  const [ShtXrayFlag, setShtXrayFlag] = useState("");

  const [PlasmaTimeFlag, setPlasmaTimeFlag] = useState("");
  const [txtPlasmaTime, settxtPlasmaTime] = useState("");

  //Conn Roll
  const [ConRollShtFlag, setConRollShtFlag] = useState("");
  const [txtConRollShtLength, settxtConRollShtLength] = useState("");

  const [ConRollLeafFlag, setConRollLeafFlag] = useState("");
  const [txtConRollLength, settxtConRollLength] = useState("");
  const [txtConLeafLength, settxtConLeafLength] = useState("");

  const [ConRollProFlag, setConRollProFlag] = useState("");
  const [txtConRollProSt, settxtConRollProSt] = useState("");
  const [txtConRollProEnd, settxtConRollProEnd] = useState("");

  const [ConRollSerialFlag, setConRollSerialFlag] = useState("");
  const [txtConRollLeafScan, settxtConRollLeafScan] = useState("");

  const [DDL_RollReqLotSht, setDDL_RollReqLotSht] = useState("Yes");
  const [txtRollLotShtSt, settxtRollLotShtSt] = useState("");
  const [txtRollLotShtEnd, settxtRollLotShtEnd] = useState("");

  const [DDL_RollReqProSht, setDDL_RollReqProSht] = useState("Yes");
  const [txtRollProShtSt, settxtRollProShtSt] = useState("");
  const [txtRollProShtEnd, settxtRollProShtEnd] = useState("");

  const [txtRollProFix, settxtRollProFix] = useState("");

  //Conn Sheet, Process Control
  const [ConShtTimeFlag, setConShtTimeFlag] = useState("");
  const [txtConShtTime, settxtConShtTime] = useState("");
  const [ConShtsumFlag, setConShtsumFlag] = useState("");

  const [ConShtPlasTimeFlag, setConShtPlasTimeFlag] = useState("");
  const [txtConShtPlasTime, settxtConShtPlasTime] = useState("");
  const [ConShtCodeFlag, setConShtCodeFlag] = useState("");

  const [ConShtMixLotFlag, setConShtMixLotFlag] = useState("");
  const [ConShtMixProFlag, setConShtMixProFlag] = useState("");

  const [ProcessConTimeFlag, setProcessConTimeFlag] = useState("");
  const [ProcessConTime, setProcessConTime] = useState([]);
  const [DDL_ProcessConTime, setDDL_ProcessConTime] = useState('');

  //Final
  const [txtFinalpcstray, settxtFinalpcstray] = useState("");
  const [txtFinalpcsscan, settxtFinalpcsscan] = useState("");

  const [Finalpackgroupflag, setFinalpackgroupflag] = useState("");
  const [Finalweekcodeflag, setFinalweekcodeflag] = useState("");
  const [DDL_FinalPDStimeELT, setDDL_FinalPDStimeELT] = useState("Yes");

  const [DDL_FinalPDSHidetime, setDDL_FinalPDSHidetime] = useState("Yes");
  const [FinalPDStimeflag, setFinalPDStimeflag] = useState("");
  const [txtFinalPDStime, settxtFinalPDStime] = useState("");

  const [txtFinalPDStimeby, settxtFinalPDStimeby] = useState("");
  const [FinalPDSconfirmflag, setFinalPDSconfirmflag] = useState("");
  const [Finalconnshtflag, setFinalconnshtflag] = useState("");

  const [FinalmixLotflag, setFinalmixLotflag] = useState("");
  const [Finalmixproflag, setFinalmixproflag] = useState("");
  const [Finalchecksumflag, setFinalchecksumflag] = useState("");

  const [FinalchipIDflag, setFinalchipIDflag] = useState("");

  //Checkbox
  const [isDateInproflag, setisDateInproflag] = useState(false);
  const [isBarcodeReqflag, setisBarcodeReqflag] = useState(false);
  const [isPlasmaTimeFlag, setisPlasmaTimeFlag] = useState(false);
  const [isConRollShtFlag, setisConRollShtFlag] = useState(false);
  const [isConRollLeafFlag, setisConRollLeafFlag] = useState(false);
  const [isConRollProFlag, setisConRollProFlag] = useState(false);
  const [isConRollSerialFlag, setisConRollSerialFlag] = useState(false);
  const [isConShtTimeFlag, setisConShtTimeFlag] = useState(false);
  const [isConShtPlasTimeFlag, setisConShtPlasTimeFlag] = useState(false);
  const [isProcessConTimeFlag, setisProcessConTimeFlag] = useState(false);
  const [isFinalPDStimeflag, setisFinalPDStimeflag] = useState(false);

  //SetError
  const [ErrorProdName, setErrorProdName] = useState(false);
  const [ErrorUpCount, setErrorUpCount] = useState(false);
  const [ErrorConfigCode, setErrorConfigCode] = useState(false);
  const [ErrorStSeqSerial, setErrorStSeqSerial] = useState(false);
  const [ErrorStSeqCode, setErrorStSeqCode] = useState(false);
  const [ErrorDateInProcess, setErrorDateInProcess] = useState(false);

  //CheckTable
  const [checkHead, setCheckHead] = useState("hidden");
  const [checkEmpty, setCheckEmpty] = useState("hidden");
  const [checkData, setCheckData] = useState("visible");

  useEffect(() => {
    SerialStrucData();
    SheetStrucData();
    SheetTypeData();
    ProcessConTimeData();
  }, []);

  const SerialStrucData = async () => {
    try {
      const res = await axios.post("/SerialStructure");
      setSerialStruc(res.data);
      console.log("SSSS", res.data)
    } catch (error) {
      console.error('Error fetching factories:', error.message);
    }
  };

  const SheetStrucData = async () => {
    try {
      const res = await axios.post("/SheetStructure");
      setShtStructure(res.data);
    } catch (error) {
      console.error('Error fetching factories:', error.message);
    }
  };

  const SheetTypeData = async () => {
    try {
      const res = await axios.post("/SheetType");
      setShtType(res.data);
      console.log("ShtType", res.data)
    } catch (error) {
      console.error('Error fetching factories:', error.message);
    }
  };

  const ProcessConTimeData = async () => {
    try {
      const res = await axios.post("/ProceesControl");
      setProcessConTime(res.data);
      console.log("Pro", res.data)
    } catch (error) {
      console.error('Error fetching factories:', error.message);
    }
  };

  const handleKeyProductName= (event) => {
    const txtProductName = event.target.value;
    settxtProductName(txtProductName);
  };

  const handleKeyUpCount= (event) => {
    const txtUpCount= event.target.value;
    settxtUpCount(txtUpCount);
    // setErrorDateInProcess(false);
  };

  const handleKeyConfigCode= (event) => {
    const txtConfig= event.target.value;
    settxtConfig(txtConfig);
    // setErrorDateInProcess(false);
  };

  const handleKeyStSeqSeriel= (event) => {
    const txtStSeqSerial= event.target.value;
    settxtStSeqSerial(txtStSeqSerial);
    // setErrorDateInProcess(false);
  };

  const handleKeyStSeqCode= (event) => {
    const txtStSeqCode= event.target.value;
    settxtStSeqCode(txtStSeqCode);
    // setErrorDateInProcess(false);
  };
  
  const handleKeyDateInProcees= (event) => {
    const txtDateInProcess= event.target.value;
    settxtDateInProcess(txtDateInProcess);
    setErrorDateInProcess(false);
  };
  

  const handleKeyBarcodeGrade= (event) => {
    const txtBarcodeGrade= event.target.value;
    settxtBarcodeGrade(txtBarcodeGrade);
    // setErrorDateInProcess(false);
  };


  return {
    STATUS_P, DDL_ProductStatus, setDDL_ProductStatus, SerialStruc, DDL_SerialStruc, setDDL_SerialStruc, ShtStructure,
    DDL_ShtStructure, setDDL_ShtStructure, ShtType, DDL_ShtType, setDDL_ShtType, ProcessConTime, DDL_ProcessConTime, setDDL_ProcessConTime,
    DDL_RollReqLotSht, setDDL_RollReqLotSht, DDL_RollReqProSht, setDDL_RollReqProSht, DDL_FinalPDStimeELT, setDDL_FinalPDStimeELT,
    DDL_FinalPDSHidetime, setDDL_FinalPDSHidetime, isDateInproflag, setisDateInproflag, isBarcodeReqflag, setisBarcodeReqflag,
    isPlasmaTimeFlag, setisPlasmaTimeFlag, isConRollShtFlag, setisConRollShtFlag, isConRollLeafFlag, setisConRollLeafFlag,
    isConRollProFlag, setisConRollProFlag, isConRollSerialFlag, setisConRollSerialFlag, isConShtTimeFlag, setisConShtTimeFlag,
    isConShtPlasTimeFlag, setisConShtPlasTimeFlag, isProcessConTimeFlag, setisProcessConTimeFlag, isFinalPDStimeflag, setisFinalPDStimeflag,
    txtProductName, txtUpCount, txtConfig, txtStSeqSerial, txtStSeqCode, txtDateInProcess, txtPcsPerSHTEFPC, txtPcsPerSHTSMT, txtSerialFile,
    txtBarcodeGrade, txtshtFileFormat, txtShtperLotEFPC, txtShtperLotSMT, txtShtperscan, txtShtperlaser, txtShtModelCode, txtPlasmaTime,
    txtConRollShtLength, txtConRollLength, txtConLeafLength, txtConRollProSt, txtConRollProEnd, txtConRollLeafScan, txtRollLotShtSt, txtRollLotShtEnd,
    txtRollProShtSt, txtRollProShtEnd, txtRollProFix, txtConShtTime, txtConShtPlasTime, txtFinalpcstray, txtFinalpcsscan, txtFinalPDStime, txtFinalPDStimeby,
    checkHead, checkEmpty, checkData
  }
}

export { ProductMasterPopup };