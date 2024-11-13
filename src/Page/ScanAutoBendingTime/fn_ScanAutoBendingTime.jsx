import React, { useState,useRef,useEffect } from 'react'
import axios from 'axios'
import { color } from 'framer-motion'

function fn_ScanAutoBendingTime() {

    const[txtMCNo,settxtMCNo] = useState({value: "",disbled: "",visble: "",style: "",})
    const [txtLotNo,settxtLotNo] = useState({value: "",disbled: "",visble: "",style: "",})
    const [lblProductName,setlblProductName] = useState({value: "",disbled: "",visble: "",style: "",})
    const [lblResult ,setlblResult]  = useState({value: "",disbled: "",visble: "",style: "",})
    const [lblRemark,setlblRemark]  = useState({value: "",disbled: "",visble: "",style: "",})
    const [txtSerial,settxtSerial]  = useState("")
    
    const [hfURL,sethfURL] =useState("")
    const [hfSerialCount ,sethfSerialCount] =useState("")
    const plantcode = '5'
    
    // focus
    const fcMCno = useRef(null);
    const fcLotNo = useRef(null);
    const fcGvSerial_txtSerial_0 = useRef([]);

    const [pnlResult,setpnlResult] =useState(true)
    const [pnlDetail,setpnlDetail] =useState(true)
    const [pnlMain,setpnlMain] =useState(true)

    
    const [gvBendingVisible,setgvBendingVisible]  =useState(true)

    const [gvBending,setgvBending] =useState("")
    const [gvSerial,setgvSerial] =useState("")

   const IP = localStorage.getItem("ipAddress");
   const currentTime = new Date().toLocaleTimeString("en-GB", { hour12: false });
    const  IsPostBack = ""
    
    useEffect(() => {
      settxtMCNo((prevState) => ({ ...prevState, value: "" , disbled: false}));
      settxtLotNo((prevState) => ({ ...prevState, value: "", disbled:true}));
      setlblResult((prevState) => ({ ...prevState, value: "", disbled:false}));
      setlblRemark((prevState) => ({ ...prevState, value: "", disbled:false}));
      setpnlResult(false)
      setpnlDetail(false)
      setpnlMain(true)
      setgvBendingVisible(false)
      fcMCno.current.focus();
      
    }, []);



    useEffect(() => {
      if(txtLotNo.value !== "") {
      //   console.log("เข้ามาจ้า")
        if(gvSerial.length >0 ){
        fcGvSerial_txtSerial_0.current[0].focus();
      } 
      }
     
    }, [gvBending,gvSerial.length]);


    const handletxtMCNo_TextChanged = async () => {
      setpnlResult(false)
      setlblResult((prevState) => ({ ...prevState, value: "", style: { backgroundColor: 'green' ,height:'100px' }}));
      setlblRemark((prevState) => ({ ...prevState, value: ""}));
      sethfSerialCount("0")
      if(txtMCNo.value.trim() !== ""){
        let dtBending = []
        await axios
        .post("/api/BendingTime/GetBangdingMachineData", {
          dataList: {
            _strPlantCode: plantcode,
            _strMachineNo: txtMCNo.value,
          },
        })
        .then((res) =>{
      dtBending  =res.data
      console.log(dtBending,"dtBending")
        });
        if(dtBending.length > 0){
          setgvBending(dtBending);
          sethfSerialCount(dtBending.length)
          settxtLotNo((prevState) => ({ ...prevState, value: "",disbled:false}));
          setTimeout(() => {
            fcLotNo.current.focus();
          }, 300);
       
        }else{
          setpnlResult(true)
          setlblResult((prevState) => ({ ...prevState, value: "NG", style: { backgroundColor: 'yellow' , color:'red', fontSize: '70px', padding: '0px' ,  textAlign: 'center' }}));
          setlblRemark((prevState) => ({ ...prevState, value:`Machine ${txtMCNo.value} not found in master!`,style: { fontSize: '30px', padding: '0px' ,textAlign: 'center'}}));
          setTimeout(() => {
            fcMCno.current.focus();
          }, 300);
          
        }
      }
    }
    const handletxtLotNo_TextChanged = async() => {  
      let  dtProductSerial =[]
      setlblProductName((prevState) => ({ ...prevState, value: ""}));
      setlblResult((prevState) => ({ ...prevState, value: "", style: { backgroundColor: 'yellow',color:'green' }}));
      setlblRemark((prevState) => ({ ...prevState, value: ""}));
      setpnlResult(false)
      if(txtLotNo.value.trim().toUpperCase() !== ""){
        let _strPrdName=""
        let _strLot =""
        let _strLotAll = txtLotNo.value.trim().toUpperCase().split(';')

        _strLot = _strLotAll[0];
        _strPrdName =[]

        await axios
        .post("/api/Common/GetProductNameByLot", {
          strLot: _strLot,
        })
        .then((res) => {
          _strPrdName = res.data.prdName;
        });
        if(_strPrdName !== ""){
          setlblProductName((prevState) => ({ ...prevState, value:_strPrdName}));
          settxtLotNo((prevState) => ({ ...prevState, value: _strLot,disbled:true}));
          settxtMCNo((prevState) => ({ ...prevState,disbled:true}));
          getInitialSerial()
        }else{
          setpnlResult(true)
          setlblResult((prevState) => ({ ...prevState, value:"NG",  disbled: false , style: { backgroundColor: 'Yellow',color:"red" ,fontSize: '70px', padding: '0px' ,  textAlign: 'center' }}));
          setlblRemark((prevState) => ({ ...prevState, value: 'LOT   '+txtLotNo.value+'  not found!' }));
          settxtLotNo((prevState) => ({ ...prevState, value: '' }));
          setTimeout(() => {
            fcLotNo.current.focus();
          }, 300);
         
        }

      }else{
        settxtLotNo((prevState) => ({ ...prevState, value: '' }));
         setTimeout(() => {
            fcLotNo.current.focus();
          }, 300);
         
        // fcLotNo.current.focus();
      }
    }
    const getInitialSerial = async () => {
      let dtData = [];
      for (let intRow = 0; intRow < gvBending.length; intRow++) {
        dtData.push({
          SEQ: intRow + 1,
          BENDING_NO : gvBending[intRow].bending_no
        });
      }
      // setvisiblgvSerial(true);
      setgvSerial(dtData); 
      if(dtData.length>0){
        setpnlDetail(true)
      }
      if(gvSerial.length >0){
        fcGvSerial_txtSerial_0.current[0].focus();
      }
      return 0;
    };
    const btnCancel = async () => {
   getInitialSerial()
    };
    const getInputSerial = async () => {
      let dtData = [];
      let intRow= 0
      let strFrontSide = ''
      let _strLotData = []
      let _strLot = ''

      _strLotData = txtLotNo.value.toUpperCase().split(";");
      _strLot =  _strLotData[0];
      for (let i = 0; i < gvSerial.length; i++) {
        dtData.push({
          MACHINE: txtMCNo.value,
          LOT: _strLot,
          PRODUCT: lblProductName.value.toString(),
          SEQ: parseInt(gvSerial[i].SEQ) ,
          BENDING_NO:gvSerial[i].BENDING_NO,
          SERIAL: txtSerial[i],
          SCAN_RESULT:"",
          ROW_UPDATE:"Y",
        });
      }
  
      return dtData;
    };
    const handleSerialChange = (index, event) => {
      const newValues = [...txtSerial];
      newValues[index] = event.target.value;
      settxtSerial(newValues);
    };
    const ibtback_Click = async () => {
      settxtMCNo((prevState) => ({ ...prevState, disbled: false  }));
      settxtLotNo((prevState) => ({ ...prevState, value: "", disbled: false }));
      setTimeout(() => {
        fcLotNo.current.focus();
      }, 300);
     
    };
    const btnSave_Click = async () => {
      setSerialData()
    }

    const setSerialData = async () => {
    let dtSerial = await getInputSerial();
    let strError = [];
    if(dtSerial.length >0 ){
      for(let i=0 ; i < dtSerial.length; i++){ 
        dtSerial[i].PLANTCODE = "5"
        dtSerial[i].strUser = IP
      }
     await axios
    .post("/api/BendingTime/SetSerialBendingData", {
     dataList: dtSerial,
  })
  .then((res) =>{
    strError  =res.data
   
  });
    }
    setpnlResult(true)
    if(strError !== ""){
      setlblResult((prevState) => ({ ...prevState, value:"NG",  disbled: false , style: { backgroundColor: 'yellow' ,fontSize: '70px', padding: '0px' ,  textAlign: 'center' ,color:'red'}}));
      setlblRemark((prevState) => ({ ...prevState, value:strError}));
    }
    else{ setlblResult((prevState) => ({ ...prevState, value:"OK",  disbled: false , style: { backgroundColor: 'Yellow' ,fontSize: '70px', padding: '0px' ,  textAlign: 'center' ,color:'green'}}));
    setlblRemark((prevState) => ({ ...prevState, value:currentTime , style: { fontSize: '40px', padding: '0px' ,  textAlign: 'center' } }));}
    getInitialSerial();
    }

  return {
    txtMCNo,settxtMCNo,txtLotNo,settxtLotNo,lblProductName,lblResult,lblRemark,handletxtMCNo_TextChanged
    ,handletxtLotNo_TextChanged,fcLotNo,fcMCno,gvSerial,txtSerial,handleSerialChange,ibtback_Click,btnSave_Click,btnCancel,pnlDetail,pnlResult,gvBending,gvBendingVisible,fcGvSerial_txtSerial_0
  }
}

export  {fn_ScanAutoBendingTime}