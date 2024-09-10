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
    const [txtSerial , settxtSerial] = useState("")
    // data table 
    const [gvSerial,setgvSerial]=useState([])
    const [gvScanResult,setgvScanResult]=useState([])

    const [pnlSerial,setpnlSerial]=useState("")
    const [pnlgvScanResult,setpnlgvScanResult]=useState("")

    const [hfUserID,sethfUserID] =useState("")
    const [hfUserStation,sethfUserStation] =useState("")
    const [hfMode,sethfMode] =useState("")
    const FAC = import.meta.env.VITE_FAC;
      useEffect(() => {
        let ID = localStorage.getItem("ipAddress");
        sethfUserID(ID);
        sethfUserStation(ID);
        sethfMode("");
        const fetchData = async () => {
          await GetProductData();
        };  
        fetchData()
        // SetMode("LOT")
      }, []);


    const GetProductData = async () => {
        await axios.get("/api/Common/GetProductData").then(async (res) => {
          let data = res.data.flat();
          setddlProduct(data);
          setselectddlProduct((prevState) => ({...prevState, value: data[0].prd_name,}));
        });
      };
      
    const ibtBack_Click = async () => {
      settxtLot((prevState) => ({...prevState, value: '',}));
      settxtLot((prevState) => ({...prevState, value: '',}));
    };

    const btnCancel_Click = async () => {
      SetMode("SERIAL")
      // fnSetFocus("gvSerial_txtSerial_0")
    }
    const btnSave_Click = async () => {
      setSerialData()
    }
    const SetMode = (_strType) => {
      switch (_strType) {
        case "LOT":
          settxtLot((prevState) => ({...prevState,value: "",disbled: false,}));
          setlblShtCount((prevState) => ({ ...prevState, value: "" }));
          setlblTotalSht((prevState) => ({ ...prevState, value: "" }));
          setlblResult((prevState) => ({ ...prevState, value: "" }));
          setpnlLog(false);
          setpnlSerial(false);
          sethfMode("LOT")
          setTimeout(() => {
            // fntxtLot.current.focus();
          }, 300);
          break;
        case "LOT_ERROR":
          settxtLot((prevState) => ({...prevState,value: "",disbled: false,}));
          setlblShtCount((prevState) => ({ ...prevState, value: "" }));
          setlblTotalSht((prevState) => ({ ...prevState, value: "" }));
          setlblResult((prevState) => ({ ...prevState, value: "" }));
          setpnlLog(true);
          setpnlSerial(false);
          sethfMode("LOT")
          setTimeout(() => {
            // fntxtLot.current.focus();
          }, 300);
          break;
        case "SERIAL":
          settxtLot((prevState) => ({...prevState,disbled: true,}));
          setpnlLog(false);
          setpnlSerial(true);
          sethfMode("SERIAL")
          getInitialSerial()
          break;
        case "SERIAL_ERROR":
          settxtLot((prevState) => ({ ...prevState, disbled: true }));
          setpnlLog(true);
          break;
        case "SERIAL_OK":
          settxtLot((prevState) => ({ ...prevState, disbled: true }));
          setpnlLog(false);
          setpnlSerial(true);
          getInitialSerial();
          // fngvSerial.current.focus(); // focus Serial
          break;
        case "SERIAL_NG":
          settxtLot((prevState) => ({ ...prevState, disbled: true }));
          setpnlLog(false);
  
          break;
  
        default:
      }
    };

    const getInitialSerial = async () => {
      let dtData = [];
      for (let intRow = 0; intRow < hfserialcount; intRow++) {
        dtData.push({
          SEQ: intRow + 1,
        });
      }
      setgvSerial(dtData);
      settxtSerial( Array(gvSerial.length).fill(""))
      if (gvSerial.length > 0) {
        setTimeout(() => {
          // fc_txtSerial.current[0].focus();
          }, 300);
      
      }
      return 0;
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
      // setpnlLog(true)
      sethfMode("LOT")
      // setgvSerial([])
      setTimeout(() => {
        // fntxtLot.current.focus();
      }, 300);
    }
    getShtDataBylot(strLot)
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
    const setSerialData = async () => {
      let dtSerial = await getInputSerial();
      let dtSheet = await getSheetResult();
      let _strLotData = [];
      let _strLot = "";
      let _strPrdName = selectddlProduct.value;
      let _strShtNoBack = "";
      let _strShtNoFront = "";
      let _strTray = " ";
      let _intSeq = 1;
      let _intOK = 0
      let _strScanResultAll = "";
      let _strErrorAll = "";
      let _strUpdateError = "";
      let _bolUpdate = false;
      let _bolError = false;
      setlblResult((prevState) => ({...prevState, value: '0' }));
      setlblRemark((prevState) => ({...prevState, value: '0' }));
      _strLotData = txtLot.value.split(";");
      _strLot = _strLotData[0];
      if (txtLot.value.trim() != "" && dtSerial.length > 0) {
        _strScanResultAll ='NG'
        let _intRowSerial = 0;
        for (let drRow = 0; drRow < dtSerial.length; drRow++) {

        }
        for (let drShtRow = 0; drShtRow < dtSheet.length ; drShtRow++){
          if(drShtRow.SCAN_RESULT == 'OK'){
            _intOK = _intOK + 1
          }
        }
        for (let drRow = 0; drRow < dtSerial.length; drRow++) {
        if(_bolUpdate){
          let strError
          // data: [
          //   {
          //     SCAN_RESULT: dtSerial[drRow].SCAN_RESULT,
          //     SHEET_NO: dtSerial[drRow].SHEET_NO,
         
          //   },
          // ],
        }
      }
        
      } else {
        setlblLog((prevState) => ({...prevState, value: 'Please input lot no. ' }));
        SetMode("SERIAL_ERROR")
      }
      getShtDataBylot(txtLot.value.trim().toUpperCase())
      // fcGvSerial_txtSerial_0.current[0].focus();
    };
    const getInputSerial = async () => {
      let dtData = [];
      let intRow = 0
      let strFrontSide =""
      for (let intSht = 0; intSht < gvSerial.length; intSht++) {
        dtData.push({
          SEQ: intRow + 1,
          SERIAL: txtSerial[intSht],
          SHEET_NO: txtSerial[intSht],
          CONFIRM_RESULT:'',
          SCAN_RESULT: '',
          REMARK:''
        });
      }
  
      return dtData;
    };
    const getSheetResult = async () => {
      let dtData = [];
      let intRow = 0
      let strFrontSide =""
      for (let intSht = 0; intSht < gvScanResult.length; intSht++) {
        dtData.push({
          SEQ: intRow + 1,
          SHEET_NO: gvScanResult[intSht].SHEET_NO,
          CONFIRM_RESULT:gvScanResult[intSht].CONFIRM_RESULT ,
          SCAN_RESULT:gvScanResult[intSht].SCAN_RESULT,
          REMARK: gvScanResult[intSht].REMARK,
        });
      }
  
      return dtData;
    };
    const getShtDataBylot = async (_strLot) => {
      console.log("เข้า",_strLot)
      let dtSheet = [];
      let intOK = 0
     
      await axios
      .post("/api/GetConfirmSheetDataAllByLot", {
        dataList: [
          {
            strPlantCode: FAC,
            strLot: _strLot
          },
        ]
      })
      .then((res) => {
        dtSheet = res.data
        setgvScanResult(dtSheet)
      });
      dtSheet.forEach(dtSheet => {
        if (dtSheet.SCAN_RESULT === "OK") {
            intOK += 1;
        }
    });
    setlblShtCount((prevState) => ({...prevState, value: intOK.toString(),}));
    if(lblTotalSht.value == "" || lblTotalSht == "0"){
      setlblShtCount((prevState) => ({...prevState, value: dtSheet.length }));
    }
      return 0;
    };






  return {
    txtLot,settxtLot,txtLot_TextChanged

  }
}

export  {fn_ScanSMTPackingConfirm}