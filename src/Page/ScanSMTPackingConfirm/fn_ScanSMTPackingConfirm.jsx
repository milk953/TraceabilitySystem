//Eye
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

function fn_ScanSMTPackingConfirm() {
    const [txtLot,settxtLot] = useState({value: "",disbled: "",style: {},});
    const [ddlProduct,setddlProduct]= useState([]);
    const [selectddlProduct,setselectddlProduct]= useState([]);
    const [lblTotalSht,setlblTotalSht]  = useState({value: "",disbled: "",style: {},});
    const [lblShtCount,setlblShtCount] = useState({value: "",disbled: "",style: {},});
    const [lblResult,setlblResult] = useState({value: "",disbled: "",style: {},});
    const [lblRemark,setlblRemark] = useState({value: "",disbled: "",style: {},});
    const [lblLog,setlblLog] = useState({value: "",disbled: "",style: {},});
    // data table 
    const [gvSerial,setgvSerial]=useState([])
    const [gvScanResult,setgvScanResult]=useState([])

    const [pnlSerial,setpnlSerial]=useState("")
    const [pnlgvScanResult,setpnlgvScanResult]=useState("")
    
    
    const GetProductData = async () => {
        await axios.get("/api/Common/GetProductData").then(async (res) => {
          let data = res.data.flat();
          setddlProduct(data);
          setselectddlProduct((prevState) => ({...prevState, value: data[0].prd_name,}));
        });
      };

 const txtLot_TextChanged = async () =>{
    let strLotData = txtLot.value.toUpperCase().split(";");
    let strLot =""
    let strPrdName =""
    setlblShtCount((prevState) => ({...prevState, value: '0',}));
    setlblTotalSht((prevState) => ({...prevState, value: '0',}));
    if(strLotData >= 2){
        strLot = strLotData[0].trim();
        await axios
        .post("/api/Common/GetProductNameByLot", {
          strLot: strLot,
        })
        .then((res) => {
            strPrdName = res.data.prdName[0];
        });
    }


 }
   
  return {

  }
}

export  {fn_ScanSMTPackingConfirm}