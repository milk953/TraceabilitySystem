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
        if(strPrdName !==""){
          setlblLog((prevState) => ({...prevState, value: '',}));
          setpnlLog(false)
          settxtLot((prevState) => ({...prevState, value: strLot,}));
          try {
            const isInArray = ddlProduct.some(
              (item) => item.prd_name === strPrdName
            );
            if (isInArray) {
              setselectddlProduct((prevState) => ({...prevState, value: strPrdName,}));
              SetMode("SERIAL")
              setTimeout(() => {
                //fnSetFocus("gvSerial_txtSerial_0")
              }, 300);
          }

          }catch(error){
            const intProduct = strPrdName.indexOf("-", 12)
            if (intProduct > 0) {
              strPrdName =
                strPrdName.substring(0, intProduct) + 
                strPrdName.substring(intProduct + 1, intProduct + 11).trim();
                try{
                  setselectddlProduct((prevState) => ({...prevState, value: strPrdName,}));
                  SetMode("SERIAL")
                  setTimeout(() => {
                    //fnSetFocus("gvSerial_txtSerial_0")
                  }, 300);
                }catch(error2){
                  setlblLog((prevState) => ({...prevState, value: 'Product ' +strPrdName + 'not found',}));
                  setpnlLog(true)
                  //fnSetFocus("ddlProduct")
                }

            }else{
            setlblLog((prevState) => ({...prevState, value: 'Product ' +strPrdName + 'not found',}));
            setpnlLog(true)  
            }
            
            //fnSetFocus("ddlProduct")
          }
        }else{
        setselectddlProduct((prevState) => ({...prevState, value: ddlProduct[0].prd_name,}));
        settxtLot((prevState) => ({...prevState, value: '',}));
        setgvSerial([])
        setlblLog((prevState) => ({...prevState, value: 'Invalid lot no.',}));
        setpnlLog(true)
        sethfMode("LOT")
        setTimeout(() => {
          // fntxtLot.current.focus();
        }, 300);
        }
    }else{
      setselectddlProduct((prevState) => ({...prevState, value: ddlProduct[0].prd_name,}));
      settxtLot((prevState) => ({...prevState, value: '',}));
      setlblLog((prevState) => ({...prevState, value: 'Please scan QR Code. / กรุณาสแกนที่คิวอาร์โค้ด',}));
      setpnlLog(true)
      sethfMode("LOT")
      setgvSerial([])
      setTimeout(() => {
        // fntxtLot.current.focus();
      }, 300);
    }
    // getShtDataBylot(strLot)
 }
 const ddlProduct_SelectedIndexChanged = async (selectvalue) => {
  setselectddlProduct((prevState) => ({ ...prevState, value: selectvalue }));
  if (txtLot.value.trim().toUpperCase() !== "") {
    setlblLog((prevState) => ({...prevState, value: '',}));
    setpnlLog(false)
    SetMode("SERIAL")
    //fnSetFocus("gvSerial_txtSerial_0")
  }else{
    setselectddlProduct((prevState) => ({...prevState, value: data[0].prd_name,}));
    SetMode("LOT")
  }
};
   
  return {

  }
}

export  {fn_ScanSMTPackingConfirm}