import React, { useState,useRef } from 'react'
import axios from 'axios'
import { color } from 'framer-motion'

function fn_ScanAutoBendingTime() {

    const[txtMCNo,settxtMCNo] = useState({value: "",disbled: "",visble: "",style: "",})
    const [txtLotNo,settxtLotNo] = useState({value: "",disbled: "",visble: "",style: "",})
    const [lblProductName,setlblProductName] = useState({value: "",disbled: "",visble: "",style: "",})
    const [lblResult ,setlblResult]  = useState({value: "",disbled: "",visble: "",style: "",})
    const [lblRemark,setlblRemark]  = useState({value: "",disbled: "",visble: "",style: "",})
    const [hfURL,sethfURL] =useState("")
    const [hfSerialCount ,sethfSerialCount] =useState("")
    const plantcode = '5'
    
    // focus
    const fcMCno = useRef(null);
    const fcLotNo = useRef(null);

    const [pnlResult,setpnlResult] =useState(true)
    const [pnlDetail,setpnlDetail] =useState(true)

    

    const [gvBending,setgvBending] =useState("")
    const [gvSerial,setgvSerial] =useState("")


    const handletxtMCNo_TextChanged = async () => {
      setpnlResult(false)
      setlblResult((prevState) => ({ ...prevState, value: "", style: { backgroundColor: 'green' }}));
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
          console.log(dtBending,"res.data",dtBending.length)
        });
        if(dtBending.length > 0){
          setgvBending(dtBending);
          sethfSerialCount(dtBending.length)
          settxtLotNo((prevState) => ({ ...prevState, value: "",disbled:false}));
          fcLotNo.current.focus()
        }else{
          setpnlResult(true)
          setlblResult((prevState) => ({ ...prevState, value: "NG", style: { backgroundColor: 'red' ,fontSize: '70px', padding: '0px' ,  textAlign: 'center' ,color:'white'}}));
          setlblRemark((prevState) => ({ ...prevState, value:`Machine ${txtMCNo.value} not found in master!`,style: { fontSize: '30px', padding: '0px' ,textAlign: 'center'}}));
          fcMCno.current.focus();
        }
      }
    }
    const handletxtLotNo_TextChanged = async() => {  
      let  dtProductSerial =[]
      setlblProductName((prevState) => ({ ...prevState, value: ""}));
      setlblResult((prevState) => ({ ...prevState, value: "", style: { backgroundColor: 'green' }}));
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
          console.log(res.data.prdName,"res.data.prdName[0]")
          _strPrdName = res.data.prdName;
        });
        if(_strPrdName !== ""){
          setlblProductName((prevState) => ({ ...prevState, value:_strPrdName}));
          settxtLotNo((prevState) => ({ ...prevState, value: _strLot,disbled:true}));
          settxtMCNo((prevState) => ({ ...prevState,disbled:true}));
          getInitialSerial()
        }

      }
    }
    const getInitialSerial = async () => {
      let dtData = [];
  
      for (let intRow = 0; intRow < gvBending.length; intRow++) {
        dtData.push({
          SEQ: intRow + 1,
          BENDING_NO : gvBending.length
        });
      }
      // setvisiblgvSerial(true);
      setgvSerial(dtData);
      console.log(dtData.length,"มาแล้ว")
      if(dtData.length >0){
        setpnlDetail(true)
      }
      return dtData;
    };
    const getInputSerial = async () => {
      let dtData = [];
      for (let intSht = 0; intSht < txtTotalPCS.value; intSht++) {
        dtData.push({
          SEQ: intSht + 1,
          SERIAL: txtSerial[intSht],
          SCAN_RESULT: "",
          REMARK: "",
        });
      }
  
      return dtData;
    };

  return {
    txtMCNo,settxtMCNo,txtLotNo,settxtLotNo,lblProductName,lblResult,lblRemark,handletxtMCNo_TextChanged
    ,handletxtLotNo_TextChanged,fcLotNo,fcMCno
  }
}

export  {fn_ScanAutoBendingTime}