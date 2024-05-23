import React, { useState, useEffect } from "react";
import axios from "axios";
import { useIPAddress } from "../Common/function_Common";
import swal from "sweetalert";

function ProductMasterPopup(onClose, item, searchFunction) {

  const STATUS_P = localStorage.getItem("STATUS");
  const UserLogin = localStorage.getItem("IDCode");
  const factory_login = localStorage.getItem("Factory");
  const [user_id, setuser_id] = useState("");
  const { ipaddress, setipaddress } = useIPAddress();

  const [factory, setFactory] = useState([]);
  const [DDL_Factory, setDDL_Factory] = useState("");
  const [txtProductName, settxtProductName] = useState("");
  const [txtUpCount, settxtUpCount] = useState("");
  const [txtConfig, settxtConfig] = useState("");
  const [txtStSeqSerial, settxtStSeqSerial] = useState("");
  const [txtStSeqCode, settxtStSeqCode] = useState("");
  const [DDL_ProductStatus, setDDL_ProductStatus] = useState("");
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

  const [DDL_RollReqLotSht, setDDL_RollReqLotSht] = useState("");
  const [txtRollLotShtSt, settxtRollLotShtSt] = useState("");
  const [txtRollLotShtEnd, settxtRollLotShtEnd] = useState("");

  const [DDL_RollReqProSht, setDDL_RollReqProSht] = useState("");
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
  const [DDL_FinalPDStimeELT, setDDL_FinalPDStimeELT] = useState("");

  const [DDL_FinalPDSHidetime, setDDL_FinalPDSHidetime] = useState("");
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
  const [ErrorFactory, setErrorFactory] = useState(false);
  const [ErrorProdName, setErrorProdName] = useState(false);
  const [ErrorUpCount, setErrorUpCount] = useState(false);
  const [ErrorConfigCode, setErrorConfigCode] = useState(false);
  const [ErrorStSeqSerial, setErrorStSeqSerial] = useState(false);
  const [ErrorStSeqCode, setErrorStSeqCode] = useState(false);
  const [ErrorProStatus, setErrorProStatus] = useState(false);
  const [ErrorDateInProcess, setErrorDateInProcess] = useState(false);
  const [ErrorPcsPerShtEFPC, setErrorPcsPerShtEFPC] = useState(false);
  const [ErrorPcsPerShtSMT, setErrorPcsPerShtSMT] = useState(false);
  const [ErrorSerialFile, setErrorSerialFile] = useState(false);
  const [ErrorSerialside, setErrorSerialside] = useState(false);
  const [ErrorSerialStruc, setErrorSerialStruc] = useState(false);
  const [ErrorBarcodeGrade, setErrorBarcodeGrade] = useState(false);
  const [ErrorShtFileFormat, setErrorShtFileFormat] = useState(false);
  const [ErrorShtStruc, setErrorShtStruc] = useState(false);
  const [ErrorShtType, setErrorShtType] = useState(false);
  const [ErrorShtPerLotEFPC, setErrorShtPerLotEFPC] = useState(false);
  const [ErrorShtPerLotSMT, setErrorShtPerLotSMT] = useState(false);
  const [ErrorShtPerscan, setErrorShtPerscan] = useState(false);
  const [ErrorShtPerlaser, setErrorShtPerlaser] = useState(false);
  const [ErrorShtModelCode, setErrorShtModelCode] = useState(false);
  const [ErrorShtPlasTime, setErrorShtPlasTime] = useState(false);
  const [ErrorRollShtLength, setErrorRollShtLength] = useState(false);
  const [ErrorRollLength, setErrorRollLength] = useState(false);
  const [ErrorConLeafLength, setErrorConLeafLength] = useState(false);
  const [ErrorRollProSt, setErrorRollProSt] = useState(false);
  const [ErrorRollProEnd, setErrorRollProEnd] = useState(false);
  const [ErrorRollLeafScan, setErrorRollLeafScan] = useState(false);
  const [ErrorRollReqLotSht, setErrorRollReqLotSht] = useState(false);
  const [ErrorRollLotShtSt, setErrorRollLotShtSt] = useState(false);
  const [ErrorRollLotShtEnd, setErrorRollLotShtEnd] = useState(false);
  const [ErrorRollReqProSht, setErrorRollReqProSht] = useState(false);
  const [ErrorRollProShtSt, setErrorRollProShtSt] = useState(false);
  const [ErrorRollProShtEnd, setErrorRollProShtEnd] = useState(false);
  const [ErrorRollProFix, setErrorRollProFix] = useState(false);
  const [ErrorConShtConTime, setErrorConShtConTime] = useState(false);
  const [ErrorConShtPlasTime, setErrorConShtPlasTime] = useState(false);
  const [ErrorProcessConTime, setErrorProcessConTime] = useState(false);
  const [ErrorFinalpcstray, setErrorFinalpcstray] = useState(false);
  const [ErrorFinalpcsscan, setErrorFinalpcsscan] = useState(false);
  const [ErrorFinalPDStimeELT, setErrorFinalPDStimeELT] = useState(false);
  const [ErrorFinalPDSHidetime, setErrorFinalPDSHidetime] = useState(false);
  const [ErrorFinalPDStime, setErrorFinalPDStime] = useState(false);
  const [ErrorFinalPDStimeby, setErrorFinalPDStimeby] = useState(false);

  //CheckTable
  const [checkHead, setCheckHead] = useState("hidden");
  const [checkEmpty, setCheckEmpty] = useState("hidden");
  const [checkData, setCheckData] = useState("visible");


  useEffect(() => {
    if (STATUS_P === "NEW") {
      setDDL_Factory(factory_login)
      settxtProductName("");
      settxtUpCount("");
      settxtConfig("");
      settxtStSeqSerial("");
      settxtStSeqCode("");
      setDDL_ProductStatus("Active");
      setDateProFlag("");
      settxtDateInProcess("");
      settxtPcsPerSHTEFPC("");
      settxtPcsPerSHTSMT("");
      settxtSerialFile("");
      setDDL_Serialside("");
      setDDL_SerialStruc("");
      setBarReqFlag("");
      settxtBarcodeGrade("");
      settxtshtFileFormat("");
      setDDL_ShtStructure("");
      setDDL_ShtType("");
      settxtShtperLotEFPC("");
      settxtShtperLotSMT("");
      settxtShtperscan("");
      settxtShtperlaser("");
      settxtShtModelCode("");
      setShtProFlag("");
      setShtLotFlag("");
      setShtXrayFlag("");
      setPlasmaTimeFlag("");
      settxtPlasmaTime("");
      setConRollShtFlag("");
      settxtConRollShtLength("");
      setConRollLeafFlag("");
      settxtConRollLength("");
      settxtConLeafLength("");
      setConRollProFlag("");
      settxtConRollProSt("");
      settxtConRollProEnd("");
      setConRollSerialFlag("");
      settxtConRollLeafScan("");
      setDDL_RollReqLotSht("Y");
      settxtRollLotShtSt("");
      settxtRollLotShtEnd("");
      setDDL_RollReqProSht("Y");
      settxtRollProShtSt("");
      settxtRollProShtEnd("");
      settxtRollProFix("");
      setConShtTimeFlag("");
      settxtConShtTime("");
      setConShtsumFlag("");
      setConShtPlasTimeFlag("");
      settxtConShtPlasTime("");
      setConShtCodeFlag("");
      setConShtMixLotFlag("");
      setConShtMixProFlag("");
      setProcessConTimeFlag("");
      setDDL_ProcessConTime("");
      settxtFinalpcstray("");
      settxtFinalpcsscan("");
      setFinalpackgroupflag("");
      setFinalweekcodeflag("");
      setDDL_FinalPDStimeELT("Y");
      setDDL_FinalPDSHidetime("Y");
      setFinalPDStimeflag("");
      settxtFinalPDStime("");
      settxtFinalPDStimeby("");
      setFinalPDSconfirmflag("");
      setFinalconnshtflag("");
      setFinalmixLotflag("");
      setFinalmixproflag("");
      setFinalchecksumflag("");
      setFinalchipIDflag("");
    } else if (STATUS_P === "EDIT" && item) {
      console.log("CASE EDIT", item);
      setDDL_Factory(item.tpm_factory);
      settxtProductName(item.tpm_product_name);
      settxtUpCount(item.tpm_update_count);
      settxtConfig(item.tpm_config_code);
      settxtStSeqSerial(item.tpm_start_seq_serial);
      settxtStSeqCode(item.tpm_start_seq_code);
      setDDL_ProductStatus(item.tpm_product_status);
      setDateProFlag(item.tpm_date_inproc_flg);
      settxtDateInProcess(item.tpm_date_inproc);
      settxtPcsPerSHTEFPC(item.tpm_pcs_per_sht_efpc);
      settxtPcsPerSHTSMT(item.tpm_pcs_per_sht_smt);
      settxtSerialFile(item.tpm_serial_file_format);
      setDDL_Serialside(item.tpm_serial_side);
      setDDL_SerialStruc(item.tpm_serial_structure);
      setBarReqFlag(item.tpm_barcode_req_lot);
      settxtBarcodeGrade(item.tpm_barcode_grade);
      settxtshtFileFormat(item.tpm_sht_file_format);
      setDDL_ShtStructure(item.tpm_sht__structure);
      setDDL_ShtType(item.tpm_sht_type);
      settxtShtperLotEFPC(item.tpm_sht_per_lot_efpc);
      settxtShtperLotSMT(item.tpm_sht_per_lot_smt);
      settxtShtperscan(item.tpm_sht_per_scan);
      settxtShtperlaser(item.tpm_sht_per_laser);
      settxtShtModelCode(item.tpm_sht_model_code);
      setShtProFlag(item.tpm_sht_check_prd_flag);
      setShtLotFlag(item.tpm_sht_check_lot_flag);
      setShtXrayFlag(item.tpm_sht_xray_1_time_flg);
      setPlasmaTimeFlag(item.tpm_sht_plasma_time_flg);
      settxtPlasmaTime(item.tpm_sht_plasma_time);
      setConRollShtFlag(item.tpm_conn_roll_sht_flg);
      settxtConRollShtLength(item.tpm_conn_roll_sht_length);
      setConRollLeafFlag(item.tpm_conn_roll_leaf_flg);
      settxtConRollLength(item.tpm_conn_roll_length);
      settxtConLeafLength(item.tpm_conn_leaf_length);
      setConRollProFlag(item.tpm_conn_roll_prd_flg);
      settxtConRollProSt(item.tpm_conn_roll_prd_start);
      settxtConRollProEnd(item.tpm_conn_roll_prd_end);
      setConRollSerialFlag(item.tpm_conn_roll_serial_flg);
      settxtConRollLeafScan(item.tpm_conn_roll_leaf_scan);
      setDDL_RollReqLotSht(item.tpm_conn_roll_req_lot_sht);
      settxtRollLotShtSt(item.tpm_conn_roll_lot_sht_start);
      settxtRollLotShtEnd(item.tpm_conn_roll_lot_sht_end);
      setDDL_RollReqProSht(item.tpm_conn_roll_req_prd_sht);
      settxtRollProShtSt(item.tpm_conn_roll_prd_sht_start);
      settxtRollProShtEnd(item.tpm_conn_roll_prd_sht_end);
      settxtRollProFix(item.tpm_conn_roll_prd_fix);
      setConShtTimeFlag(item.tpm_conn_sht_control_time_flg);
      settxtConShtTime(item.tpm_conn_sht_control_time);
      setConShtsumFlag(item.tpm_conn_sht_checksum_flg);
      setConShtPlasTimeFlag(item.tpm_conn_sht_plasma_time_flg);
      settxtConShtPlasTime(item.tpm_conn_sht_plasma_time);
      setConShtCodeFlag(item.tpm_conn_sht_check_weekcode_flg);
      setConShtMixLotFlag(item.tpm_conn_sht_mix_lot_flg);
      setConShtMixProFlag(item.tpm_conn_sht_mix_product_flg);
      setProcessConTimeFlag(item.tpm_proc_control_time_flg);
      setDDL_ProcessConTime(item.tpm_proc_control_time);
      settxtFinalpcstray(item.tpm_fin_pcs_per_tray);
      settxtFinalpcsscan(item.tpm_fin_pcs_per_scan);
      setFinalpackgroupflag(item.tpm_fin_pack_group_flg);
      setFinalweekcodeflag(item.tpm_fin_check_weekcode_flg);
      setDDL_FinalPDStimeELT(item.tpm_fin_pds_time_skip_elt);
      setDDL_FinalPDSHidetime(item.tpm_fin_pds_time_hide_time);
      setFinalPDStimeflag(item.tpm_fin_pds_time_flg);
      settxtFinalPDStime(item.tpm_fin_pds_time);
      settxtFinalPDStimeby(item.tpm_fin_pds_time_by);
      setFinalPDSconfirmflag(item.tpm_fin_pds_time_confirm_flg);
      setFinalconnshtflag(item.tpm_fin_conn_sht_flg);
      setFinalmixLotflag(item.tpm_fin_mix_lot_flg);
      setFinalmixproflag(item.tpm_fin_mix_product_flg);
      setFinalchecksumflag(item.tpm_fin_checksum_flg);
      setFinalchipIDflag(item.tpm_fin_chip_id_flg);
    }
  }, [STATUS_P, item]);


  useEffect(() => {
    SerialStrucData();
    SheetStrucData();
    SheetTypeData();
    ProcessConTimeData();
  }, []);

  const SerialStrucData = async () => {
    try {
      const res = await axios.post("/api/SerialStructure");
      setSerialStruc(res.data);
      console.log("SSSS", res.data)
    } catch (error) {
      console.error('Error fetching factories:', error.message);
    }
  };

  const SheetStrucData = async () => {
    try {
      const res = await axios.post("/api/SheetStructure");
      setShtStructure(res.data);
    } catch (error) {
      console.error('Error fetching factories:', error.message);
    }
  };

  const SheetTypeData = async () => {
    try {
      const res = await axios.post("/api/SheetType");
      setShtType(res.data);
      console.log("ShtType", res.data)
    } catch (error) {
      console.error('Error fetching factories:', error.message);
    }
  };

  const ProcessConTimeData = async () => {
    try {
      const res = await axios.post("/api/ProceesControl");
      setProcessConTime(res.data);
      console.log("Pro", res.data)
    } catch (error) {
      console.error('Error fetching factories:', error.message);
    }
  };

  const handleDDLFactory = (event) => {
    const DDL_Factory = event.target.value;
    setDDL_Factory(DDL_Factory);
    setErrorFactory(false);
  };

  const handleKeyProductName = (event) => {
    const txtProductName = event.target.value;
    settxtProductName(txtProductName);
    setErrorProdName(false)
  };

  const handleKeyUpCount = (event) => {
    const txtUpCount = event.target.value;
    settxtUpCount(txtUpCount);
    setErrorUpCount(false);
  };

  const handleKeyConfigCode = (event) => {
    const txtConfig = event.target.value;
    settxtConfig(txtConfig);
    setErrorConfigCode(false);
  };

  const handleKeyStSeqSeriel = (event) => {
    const txtStSeqSerial = event.target.value;
    settxtStSeqSerial(txtStSeqSerial);
    setErrorStSeqSerial(false);
  };

  const handleKeyStSeqCode = (event) => {
    const txtStSeqCode = event.target.value;
    settxtStSeqCode(txtStSeqCode);
    setErrorStSeqCode(false);
  };

  const handleDDLProStatus = (event) => {
    const DDL_ProductStatus = event.target.value;
    setDDL_ProductStatus(DDL_ProductStatus);
    setErrorProStatus(false);
  };

  const handleKeyDateInProcees = (event) => {
    const txtDateInProcess = event.target.value;
    settxtDateInProcess(txtDateInProcess);
    setErrorDateInProcess(false);
  };

  const handleKeyPcsPerShtEFPC = (event) => {
    const txtPcsPerSHTEFPC = event.target.value;
    settxtPcsPerSHTEFPC(txtPcsPerSHTEFPC);
    setErrorPcsPerShtEFPC(false);
  };

  const handleKeyPcsPerShtSMT = (event) => {
    const txtPcsPerSHTSMT = event.target.value;
    settxtPcsPerSHTSMT(txtPcsPerSHTSMT);
    setErrorPcsPerShtSMT(false);
  };

  const handleKeySerialFile = (event) => {
    const txtSerialFile = event.target.value;
    settxtSerialFile(txtSerialFile);
    setErrorSerialFile(false);
  };

  const handleDDLSerialside = (event) => {
    const DDL_Serialside = event.target.value;
    setDDL_Serialside(DDL_Serialside);
    setErrorSerialside(false);
  };

  const handleDDLSerialStruc = (event) => {
    const DDL_SerialStruc = event.target.value;
    setDDL_SerialStruc(DDL_SerialStruc);
    setErrorSerialStruc(false);
  };

  const handleKeyBarcodeGrade = (event) => {
    const txtBarcodeGrade = event.target.value;
    settxtBarcodeGrade(txtBarcodeGrade);
    setErrorBarcodeGrade(false);
  };

  const handleKeyShtFileFormat = (event) => {
    const txtshtFileFormat = event.target.value;
    settxtshtFileFormat(txtshtFileFormat);
    setErrorShtFileFormat(false);
  };

  const handleDDLShtStructure = (event) => {
    const DDL_ShtStructure = event.target.value;
    setDDL_ShtStructure(DDL_ShtStructure);
    setErrorShtStruc(false);
  };

  const handleDDLShtType = (event) => {
    const DDL_ShtType = event.target.value;
    setDDL_ShtType(DDL_ShtType);
    setErrorShtType(false);
  };

  const handleKeyShtperLotEFPC = (event) => {
    const txtShtperLotEFPC = event.target.value;
    settxtShtperLotEFPC(txtShtperLotEFPC);
    setErrorShtPerLotEFPC(false);
  };

  const handleKeyShtperLotSMT = (event) => {
    const txtShtperLotSMT = event.target.value;
    settxtShtperLotSMT(txtShtperLotSMT);
    setErrorShtPerLotSMT(false);
  };

  const handleKeyShtperscan = (event) => {
    const txtShtperscan = event.target.value;
    settxtShtperscan(txtShtperscan);
    setErrorShtPerscan(false);
  };

  const handleKeyShtperlaser = (event) => {
    const txtShtperlaser = event.target.value;
    settxtShtperlaser(txtShtperlaser);
    setErrorShtPerlaser(false);
  };

  const handleKeyShtModelCode = (event) => {
    const txtShtModelCode = event.target.value;
    settxtShtModelCode(txtShtModelCode);
    setErrorShtModelCode(false);
  };

  const handleKeyShtPlasTime = (event) => {
    const txtPlasmaTime = event.target.value;
    settxtPlasmaTime(txtPlasmaTime);
    setErrorShtPlasTime(false);
  };

  const handleKeyRollShtLength = (event) => {
    const txtConRollShtLength = event.target.value;
    settxtConRollShtLength(txtConRollShtLength);
    setErrorRollShtLength(false);
  };

  const handleKeyConRollLength = (event) => {
    const txtConRollLength = event.target.value;
    settxtConRollLength(txtConRollLength);
    setErrorRollLength(false);
  };

  const handleKeyConLeafLength = (event) => {
    const txtConLeafLength = event.target.value;
    settxtConLeafLength(txtConLeafLength);
    setErrorConLeafLength(false);
  };

  const handleKeyConRollProSt = (event) => {
    const txtConRollProSt = event.target.value;
    settxtConRollProSt(txtConRollProSt);
    setErrorRollProSt(false);
  };

  const handleKeyConRollProEnd = (event) => {
    const txtConRollProEnd = event.target.value;
    settxtConRollProEnd(txtConRollProEnd);
    setErrorRollProEnd(false);
  };

  const handleKeyRollLeafScan = (event) => {
    const txtConRollLeafScan = event.target.value;
    settxtConRollLeafScan(txtConRollLeafScan);
    setErrorRollLeafScan(false);
  };

  const handleDDLRollReqLotSht = (event) => {
    const DDL_RollReqLotSht = event.target.value;
    setDDL_RollReqLotSht(DDL_RollReqLotSht);
    setErrorRollReqLotSht(false);
  };

  const handleKeyRollLotShtSt = (event) => {
    const txtRollLotShtSt = event.target.value;
    settxtRollLotShtSt(txtRollLotShtSt);
    setErrorRollLotShtSt(false);
  };

  const handleKeyRollLotShtEnd = (event) => {
    const txtRollLotShtEnd = event.target.value;
    settxtRollLotShtEnd(txtRollLotShtEnd);
    setErrorRollLotShtEnd(false);
  };

  const handleDDLRollReqProSht = (event) => {
    const DDL_RollReqProSht = event.target.value;
    setDDL_RollReqProSht(DDL_RollReqProSht);
    setErrorRollReqProSht(false);
  };

  const handleKeyRollProShtSt = (event) => {
    const txtRollProShtSt = event.target.value;
    settxtRollProShtSt(txtRollProShtSt);
    setErrorRollProShtSt(false);
  };

  const handleKeyRollProShtEnd = (event) => {
    const txtRollProShtEnd = event.target.value;
    settxtRollProShtEnd(txtRollProShtEnd);
    setErrorRollProShtEnd(false);
  };

  const handleKeyRollProFix = (event) => {
    const txtRollProFix = event.target.value;
    settxtRollProFix(txtRollProFix);
    setErrorRollProFix(false);
  };

  const handleKeyConShtTime = (event) => {
    const txtConShtTime = event.target.value;
    settxtConShtTime(txtConShtTime);
    setErrorConShtConTime(false);
  };

  const handleKeyConShtPlasTime = (event) => {
    const txtConShtPlasTime = event.target.value;
    settxtConShtPlasTime(txtConShtPlasTime);
    setErrorConShtPlasTime(false);
  };

  const handleDDLProcessConTime = (event) => {
    const DDL_ProcessConTime = event.target.value;
    setDDL_ProcessConTime(DDL_ProcessConTime);
    setErrorProcessConTime(false);
  };

  const handleKeyFinalpcstray = (event) => {
    const txtFinalpcstray = event.target.value;
    settxtFinalpcstray(txtFinalpcstray);
    setErrorFinalpcstray(false);
  };

  const handleKeyFinalpcsscan = (event) => {
    const txtFinalpcsscan = event.target.value;
    settxtFinalpcsscan(txtFinalpcsscan);
    setErrorFinalpcsscan(false);
  };

  const handleDDLFinalPDStimeELT = (event) => {
    const DDL_FinalPDStimeELT = event.target.value;
    setDDL_FinalPDStimeELT(DDL_FinalPDStimeELT);
    setErrorFinalPDStimeELT(false);
  };

  const handleDDLFinalPDSHidetime = (event) => {
    const DDL_FinalPDSHidetime = event.target.value;
    setDDL_FinalPDSHidetime(DDL_FinalPDSHidetime);
    setErrorFinalPDSHidetime(false);
  };

  const handleKeyFinalPDStime = (event) => {
    const txtFinalPDStime = event.target.value;
    settxtFinalPDStime(txtFinalPDStime);
    setErrorFinalPDStime(false);
  };

  const handleKeyFinalPDStimeby = (event) => {
    const txtFinalPDStimeby = event.target.value;
    settxtFinalPDStimeby(txtFinalPDStimeby);
    setErrorFinalPDStimeby(false);
  };

  useEffect(() => {
    if (STATUS_P === "EDIT") {

      if (DateProFlag === "Y") {
        setisDateInproflag(true);
      } else {
        setisDateInproflag(false);
      }
      if (BarReqFlag === "Y") {
        setisBarcodeReqflag(true);
      } else {
        setisBarcodeReqflag(false);
      }
      if (PlasmaTimeFlag === "Y") {
        setisPlasmaTimeFlag(true);
      } else {
        setisPlasmaTimeFlag(false);
      }
      if (ConRollShtFlag === "Y") {
        setisConRollShtFlag(true);
      } else {
        setisConRollShtFlag(false);
      }
      if (ConRollLeafFlag === "Y") {
        setisConRollLeafFlag(true);
      } else {
        setisConRollLeafFlag(false);
      }
      if (ConRollProFlag === "Y") {
        setisConRollProFlag(true);
      } else {
        setisConRollProFlag(false);
      }
      if (ConRollSerialFlag === "Y") {
        setisConRollSerialFlag(true);
      } else {
        setisConRollSerialFlag(false);
      }
      if (ConShtTimeFlag === "Y") {
        setisConShtTimeFlag(true);
      } else {
        setisConShtTimeFlag(false);
      }
      if (ConShtPlasTimeFlag === "Y") {
        setisConShtPlasTimeFlag(true);
      } else {
        setisConShtPlasTimeFlag(false);
      }
      if (ProcessConTimeFlag === "Y") {
        setisProcessConTimeFlag(true);
      } else {
        setisProcessConTimeFlag(false);
      }
      if (FinalPDStimeflag === "Y") {
        setisFinalPDStimeflag(true);
      } else {
        setisFinalPDStimeflag(false);
      }

    }
  }, [STATUS_P, DateProFlag]);

  const handleSaveClick = async () => {
    if (!DDL_Factory) {
      setErrorFactory(true);
    }
    if (txtProductName === "") {
      setErrorProdName(true);
    }
    if (isNaN(txtUpCount) || txtUpCount === "") {
      setErrorUpCount(true);
    }
    if (txtConfig === "") {
      setErrorConfigCode(true);
    }
    if (isNaN(txtStSeqSerial) || txtStSeqSerial === "") {
      setErrorStSeqSerial(true);
    }
    if (txtStSeqCode === "") {
      setErrorStSeqCode(true);
    }
    if (!DDL_ProductStatus) {
      setErrorProStatus(true);
    }
    if (isDateInproflag && txtDateInProcess === "") {
      setErrorDateInProcess(true);
    }
    if (isNaN(txtPcsPerSHTEFPC) || txtPcsPerSHTEFPC === "") {
      setErrorPcsPerShtEFPC(true);
    }
    if (isNaN(txtPcsPerSHTSMT) || txtPcsPerSHTSMT === "") {
      setErrorPcsPerShtSMT(true);
    }
    if (txtSerialFile === "") {
      setErrorSerialFile(true);
    }
    if (!DDL_Serialside) {
      setErrorSerialside(true);
    }
    if (!DDL_SerialStruc) {
      setErrorSerialStruc(true);
    }
    if (isBarcodeReqflag && txtBarcodeGrade === "") {
      setErrorBarcodeGrade(true);
    }
    if (txtshtFileFormat === "") {
      setErrorShtFileFormat(true);
    }
    if (!DDL_ShtStructure) {
      setErrorShtStruc(true);
    }
    if (!DDL_ShtType) {
      setErrorShtType(true);
    }
    if (isNaN(txtShtperLotEFPC) || txtShtperLotEFPC === "") {
      setErrorShtPerLotEFPC(true);
    }
    if (isNaN(txtShtperLotSMT) || txtShtperLotSMT === "") {
      setErrorShtPerLotSMT(true);
    }
    if (isNaN(txtShtperscan) || txtShtperscan === "") {
      setErrorShtPerscan(true);
    }
    if (isNaN(txtShtperlaser) || txtShtperlaser === "") {
      setErrorShtPerlaser(true);
    }
    if (txtShtModelCode === "") {
      setErrorShtModelCode(true);
    }
    if (isNaN(txtPlasmaTime) || isPlasmaTimeFlag && txtPlasmaTime === "") {
      setErrorShtPlasTime(true);
    }
    if (isNaN(txtConRollShtLength) || isConRollShtFlag && txtConRollShtLength === "") {
      setErrorRollShtLength(true);
    }
    if (isNaN(txtConRollLength) || isConRollLeafFlag && txtConRollLength === "") {
      setErrorRollLength(true);
    }
    if (isNaN(txtConLeafLength) || isConRollLeafFlag && txtConLeafLength === "") {
      setErrorConLeafLength(true);
    }
    if (isNaN(txtConRollProSt) || isConRollProFlag && txtConRollProSt === "") {
      setErrorRollProSt(true);
    }
    if (isNaN(txtConRollProEnd) || isConRollProFlag && txtConRollProEnd === "") {
      setErrorRollProEnd(true);
    }
    if (isNaN(txtConRollLeafScan) || isConRollSerialFlag && txtConRollLeafScan === "") {
      setErrorRollLeafScan(true);
    }
    if (!DDL_RollReqLotSht) {
      setErrorRollReqLotSht(true);
    }
    if (isNaN(txtRollLotShtSt) || DDL_RollReqLotSht === "Y" && txtRollLotShtSt === "") {
      setErrorRollLotShtSt(true);
    }
    if (isNaN(txtRollLotShtEnd) || DDL_RollReqLotSht === "Y" && txtRollLotShtEnd === "") {
      setErrorRollLotShtEnd(true);
    }
    if (!DDL_RollReqProSht) {
      setErrorRollReqProSht(true);
    }
    if (isNaN(txtRollProShtSt) || DDL_RollReqProSht === "Y" && txtRollProShtSt === "") {
      setErrorRollProShtSt(true);
    }
    if (isNaN(txtRollProShtEnd) || DDL_RollReqProSht === "Y" && txtRollProShtEnd === "") {
      setErrorRollProShtEnd(true);
    }
    if (txtRollProFix === "") {
      setErrorRollProFix(true);
    }
    if (isNaN(txtConShtTime) || isConShtTimeFlag && txtConShtTime === "") {
      setErrorConShtConTime(true);
    }
    if (isNaN(txtConShtPlasTime) || isConShtPlasTimeFlag && txtConShtPlasTime === "") {
      setErrorConShtPlasTime(true);
    }
    if (isProcessConTimeFlag && !DDL_ProcessConTime) {
      setErrorProcessConTime(true)
    }
    if (isNaN(txtFinalpcstray) || txtFinalpcstray === "") {
      setErrorFinalpcstray(true);
    }
    if (isNaN(txtFinalpcsscan) || txtFinalpcsscan === "") {
      setErrorFinalpcsscan(true);
    }
    if (!DDL_FinalPDStimeELT) {
      setErrorFinalPDStimeELT(true);
    }
    if (!DDL_FinalPDSHidetime) {
      setErrorFinalPDSHidetime(true);
    }
    if (isNaN(txtFinalPDStime) || isFinalPDStimeflag && txtFinalPDStime === "") {
      setErrorFinalPDStime(true);
    }
    if (txtFinalPDStimeby === "") {
      setErrorFinalPDStimeby(true);
    }

  };

  const Clear = () => {
    if (STATUS_P === "EDIT") {
      setDDL_Factory("")
      settxtProductName("");
      settxtUpCount("");
      settxtConfig("");
      settxtStSeqSerial("");
      settxtStSeqCode("");
      setDDL_ProductStatus("");
      setDateProFlag("");
      settxtDateInProcess("");
      settxtPcsPerSHTEFPC("");
      settxtPcsPerSHTSMT("");
      settxtSerialFile("");
      setDDL_Serialside("");
      setDDL_SerialStruc("");
      setBarReqFlag("");
      settxtBarcodeGrade("");
      settxtshtFileFormat("");
      setDDL_ShtStructure("");
      setDDL_ShtType("");
      settxtShtperLotEFPC("");
      settxtShtperLotSMT("");
      settxtShtperscan("");
      settxtShtperlaser("");
      settxtShtModelCode("");
      setShtProFlag("");
      setShtLotFlag("");
      setShtXrayFlag("");
      setPlasmaTimeFlag("");
      settxtPlasmaTime("");
      setConRollShtFlag("");
      settxtConRollShtLength("");
      setConRollLeafFlag("");
      settxtConRollLength("");
      settxtConLeafLength("");
      setConRollProFlag("");
      settxtConRollProSt("");
      settxtConRollProEnd("");
      setConRollSerialFlag("");
      settxtConRollLeafScan("");
      setDDL_RollReqLotSht("");
      settxtRollLotShtSt("");
      settxtRollLotShtEnd("");
      setDDL_RollReqProSht("");
      settxtRollProShtSt("");
      settxtRollProShtEnd("");
      settxtRollProFix("");
      setConShtTimeFlag("");
      settxtConShtTime("");
      setConShtsumFlag("");
      setConShtPlasTimeFlag("");
      settxtConShtPlasTime("");
      setConShtCodeFlag("");
      setConShtMixLotFlag("");
      setConShtMixProFlag("");
      setProcessConTimeFlag("");
      setDDL_ProcessConTime("");
      settxtFinalpcstray("");
      settxtFinalpcsscan("");
      setFinalpackgroupflag("");
      setFinalweekcodeflag("");
      setDDL_FinalPDStimeELT("");
      setDDL_FinalPDSHidetime("");
      setFinalPDStimeflag("");
      settxtFinalPDStime("");
      settxtFinalPDStimeby("");
      setFinalPDSconfirmflag("");
      setFinalconnshtflag("");
      setFinalmixLotflag("");
      setFinalmixproflag("");
      setFinalchecksumflag("");
      setFinalchipIDflag("");
    }
  };


  return {
    STATUS_P, DDL_Factory, setDDL_Factory, DDL_ProductStatus, setDDL_ProductStatus, SerialStruc, DDL_Serialside, setDDL_Serialside, DDL_SerialStruc, setDDL_SerialStruc, ShtStructure,
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
    checkHead, checkEmpty, checkData, handleDDLFactory, handleKeyProductName, handleKeyUpCount, handleKeyConfigCode, handleKeyStSeqSeriel, handleKeyStSeqCode, handleDDLProStatus,
    handleKeyDateInProcees, handleKeyPcsPerShtEFPC, handleKeyPcsPerShtSMT, handleKeySerialFile, handleDDLSerialside, handleDDLSerialStruc, handleKeyBarcodeGrade,
    handleKeyShtFileFormat, handleDDLShtStructure, handleDDLShtType, handleKeyShtperLotEFPC, handleKeyShtperLotSMT, handleKeyShtperscan, handleKeyShtperlaser,
    handleKeyShtModelCode, handleKeyShtPlasTime, handleKeyRollShtLength, handleKeyConRollLength, handleKeyConLeafLength, handleKeyConRollProSt, handleKeyConRollProEnd,
    handleKeyRollLeafScan, handleDDLRollReqLotSht, handleKeyRollLotShtSt, handleKeyRollLotShtEnd, handleDDLRollReqProSht, handleKeyRollProShtSt, handleKeyRollProShtEnd,
    handleKeyRollProFix, handleKeyConShtTime, handleKeyConShtPlasTime, handleDDLProcessConTime, handleKeyFinalpcstray, handleKeyFinalpcsscan, handleDDLFinalPDStimeELT,
    handleDDLFinalPDSHidetime, handleKeyFinalPDStime, handleKeyFinalPDStimeby, ErrorFactory, ErrorProdName, ErrorUpCount, ErrorConfigCode, ErrorStSeqSerial, ErrorStSeqCode, ErrorProStatus,
    ErrorDateInProcess, ErrorPcsPerShtEFPC, ErrorPcsPerShtSMT, ErrorSerialFile, ErrorSerialside, ErrorSerialStruc, ErrorBarcodeGrade, ErrorShtFileFormat, ErrorShtStruc, ErrorShtType, ErrorShtPerLotEFPC,
    ErrorShtPerLotSMT, ErrorShtPerscan, ErrorShtPerlaser, ErrorShtModelCode, ErrorShtPlasTime, ErrorRollShtLength, ErrorRollLength, ErrorConLeafLength, ErrorRollProSt, ErrorRollProEnd, ErrorRollLeafScan,
    ErrorRollReqLotSht, ErrorRollLotShtSt, ErrorRollLotShtEnd, ErrorRollReqProSht, ErrorRollProShtSt, ErrorRollProShtEnd, ErrorRollProFix, ErrorConShtConTime, ErrorConShtPlasTime, ErrorProcessConTime,
    ErrorFinalpcstray, ErrorFinalpcsscan, ErrorFinalPDStimeELT, ErrorFinalPDSHidetime, ErrorFinalPDStime, ErrorFinalPDStimeby, handleSaveClick, Clear
  }
};

export { ProductMasterPopup };