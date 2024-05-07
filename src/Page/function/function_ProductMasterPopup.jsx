import React, { useState, useEffect } from "react";
import axios from "axios";
import { getBaseURL, useIPAddress } from "../Common/function_Common";
import swal from "sweetalert";

function function_ProductMasterPopup(onClose, item, searchFunction) {
    const { baseURL } = getBaseURL();
    const STATUS_P = localStorage.getItem("STATUS");

    const UserLogin = localStorage.getItem("IDCode");
    const [user_id, setuser_id] = useState("");
    const { ipaddress, setipaddress } = useIPAddress();

    const [DDL_Factory, setDDL_Factory] = useState("");
    const [txtProductName, settxtProductName] = useState("");
    const [txtUpCount, settxtUpCount] = useState("");
    const [txtConfig, settxtConfig] = useState("");
    const [txtStSeqSerial, settxtStSeqSerial] = useState("");
    const [txtStSeqCode, settxtStSeqCode] = useState("");
    const [DDL_ProductStatus, setDDL_ProductStatus] = useState("");
    //Date In Process
    const [CheckDateProFlag, setCheckDateProFlag] = useState("");
    const [txtDateInProcess, settxtDateInProcess] = useState("");
    //Pcs Per Sheet
    const [txtPcsPerSHTEFPC, settxtPcsPerSHTEFPC] = useState("");
    const [txtPcsPerSHTSMT, settxtPcsPerSHTSMT] = useState("");
    //Serial
    const [txtSerialFile, settxtSerialFile] = useState("");
    const [DDL_Serialside, setDDL_Serialside] = useState("");
    const [DDL_SerialStruc, setDDL_SerialStruc] = useState("");
    //Barcode
    const [CheckBarReqFlag, setCheckBarReqFlag] = useState("");
    const [txtBarcodeGrade, settxtBarcodeGrade] = useState("");

    //Sheet
    const [txtshtFileFormat, settxtshtFileFormat] = useState("");
    const [DDL_ShtStructure, setDDL_ShtStructure] = useState("");
    const [DDL_ShtType, setDDL_ShtType] = useState("");
    const [txtShtperLotEFPC, settxtShtperLotEFPC] = useState("");
    const [txtShtperLotSMT, settxtShtperLotSMT] = useState("");
    const [txtShtperscan, settxtShtperscan] = useState("");
    const [txtShtperlaser, settxtShtperlaser] = useState("");
    const [txtShtModelCode, settxtShtModelCode] = useState("");
    const [CheckShtProFlag, setCheckShtProFlag] = useState("");
    const [CheckShtLotFlag, setCheckShtLotFlag] = useState("");
    const [CheckShtXrayFlag, setCheckShtXrayFlag] = useState("");
    const [CheckPlasmaTimeFlag, setCheckPlasmaTimeFlag] = useState("");
    const [txtPlasmaTime, settxtPlasmaTime] = useState("");
    
    //Conn Roll
    const [CheckConRollShtFlag, setCheckConRollShtFlag] = useState("");
    const [txtConRollShtLength, settxtConRollShtLength] = useState("");

    const [CheckConRollLeafFlag, setCheckConRollLeafFlag] = useState("");
    const [txtConRollLength, settxtConRollLength] = useState("");
    const [txtConLeafLength, settxtConLeafLength] = useState("");
    
  return (
    item, STATUS_P
  )
}

export {function_ProductMasterPopup};