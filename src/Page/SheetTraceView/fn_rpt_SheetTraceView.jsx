import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { dropWhile, values } from "lodash";
import { color } from "framer-motion";

function fn_rpt_SheetTraceView() {
    const[txtSheetNo,settxtSheetNo] =useState("")
    const[txtProduct,settxtProduct] =useState("")
    const[ddlCavity,setddlCavity] =useState([])
    const[dtddlCavity,setdtddlCavity]=useState([])
    const[selectddlCavity,setselectddlCavity]=useState("")
    const[lblShtMachine,setlblShtMachine]=useState({ visible: "",value:''})
    const[lblTitleMachine,setlblTitleMachine]=useState({ visible: "",value:''})
    const[hypMaterial,sethypMaterial]=useState({ visible: "",value:''})
    const[lblCavity,setlblCavity]=useState({value:''})
    const[txtAOMEFPCCnt,settxtAOMEFPCCnt]=useState("")
    const[txtAOMEFPCTime,settxtAOMEFPCTime]=useState("")
    const[txtAOMEFPCMachine,settxtAOMEFPCMachine]=useState("")
    const[txtAOIEFPCCnt,settxtAOIEFPCCnt]=useState("")
    const[txtAOIEFPCTime,settxtAOIEFPCTime]=useState("")
    const[txtAOIEFPCMachine,settxtAOIEFPCMachine]=useState("")
    
    const[txtOSTCnt,settxtOSTCnt]=useState("")
    const[txtOSTTime,settxtOSTTime]=useState("")
    const[txtOSTMachine,settxtOSTMachine]=useState("")
    const[txtAVICnt,settxtAVICnt]=useState("")
    const[txtAVITime,settxtAVITime]=useState("")
    const[txtAVIMachine,settxtAVIMachine]=useState("")
    const[txtFVICnt,settxtFVICnt]=useState("")
    const[txtFVITime,settxtFVITime]=useState("")
    const[txtFVIMachine,settxtFVIMachine]=useState("")
    const[txtSPICnt,settxtSPICnt]=useState("")
    const[txtSPITime,settxtSPITime]=useState("")
    const[txtSPIMachine,settxtSPIMachine]=useState("")
    const[TxtPreCnt,setTxtPreCnt]=useState("")
    const[txtPreTime,settxtPreTime]=useState("")
    const[txtPreMachine,settxtPreMachine]=useState("")
    const[txtReflowCnt,settxtReflowCnt]=useState("")
    const[txtReflowTime,settxtReflowTime]=useState("")
    const[txtReflowMachine,settxtReflowMachine]=useState("")
    const[txtAOICnt,settxtAOICnt]=useState("")
    const[txtAOITime,settxtAOITime]=useState("")
    const[txtAOIMachine,settxtAOIMachine]=useState("")
    const[txtXRayCnt,settxtXRayCnt]=useState("")
    const[txtXRayTime,settxtXRayTime]=useState("")
    const[txtXRayMachine,settxtXRayMachine]=useState("")
    const[txtAOICOACnt,settxtAOICOACnt]=useState("")
    const[txtAOICOATime,settxtAOICOATime]=useState("")
    const[txtAOICOAMachine,settxtAOICOAMachine]=useState("")
    const[txtSMTIntCnt,settxtSMTIntCnt]=useState("")
    const[txtSMTIntTime,settxtSMTIntTime]=useState("")
    const[txtSMTIntMachine,settxtSMTIntMachine]=useState("")
    const[lblMessage,setlblMessage]=useState("")
    let PanelNo =""
   
    //table
    const[tblData1,settblData1]=useState([])

    //pnl
    const[pnltblData1,setpnltblData1]=useState(false)

    // HF
    const[hfMaterialA1,sethfMaterialA1]=useState("")
    const[hfMaterialN1,sethfMaterialN1]=useState("http://10.17.100.236/Reports/report/Traceability%20Reports/N1/Valor/PcbTraceReference?PcbID=#SHEET_NO#")
    const[hfAOMRollLeafNo,sethfAOMRollLeafNo]=useState("")
    const[hfAOMLeafNo,sethfAOMLeafNo]=useState("")
    const[hfAOMPcsNo,sethfAOMPcsNo]=useState("")
    const[hfSMPJCavityFlg,sethfSMPJCavityFlg]=useState("")
    const[hfAOIRollLeafNo,sethfAOIRollLeafNo]=useState("")
    const[hfAOILeafNo,sethfAOILeafNo]=useState("")
    const[hfAOIPcsNo,sethfAOIPcsNo]=useState("")
    const[hfOSTSheetNo,sethfOSTSheetNo]=useState("")
    const[hfOSTPcsNo,sethfOSTPcsNo]=useState("")
    const[hypLotNo,sethypLotNo]=useState("")

    //btn
    const[ btnAOMEFPC, setbtnAOMEFPC]= useState({ disbled: true,value:"",style:{}})
    const[ btnAOIEFPC, setbtnAOIEFPC ]= useState({ disbled: true,value:"",style:{}})
    const[ btnOST,setbtnOST ]= useState({ disbled: true,value:"",style:{},  })
    const[ btnAVI, setbtnAVI]= useState({ disbled: true,value:"",style:{}, })
    const[ btnFVI,setbtnFVI ]= useState({ disbled: true,value:"",style:{}, })
    const[ btnSPI,setbtnSPI ]= useState({ disbled: true,value:"",style:{}, })
    const[ btnPre,setbtnPre ]= useState({ disbled: true,value:"",style:{}, })
    const[ btnReflow,setbtnReflow ]= useState({ disbled: true,value:"",style:{}, })
    const[ btnXRay,setbtnXRay ]= useState({ disbled: true,value:"",style:{}, })
    const[ btnAOI,setbtnAOI ]= useState({ disbled: true,value:"",style:{}, })
    const[ btnAOICOA,setbtnAOICOA ]= useState({ disbled: true,value:"",style:{}, })
    const[ btnSMTInt,setbtnSMTInt ]= useState({ disbled: true,value:"",style:{}, })
    //URL 
    const [hypLotNoUrl ,sethypLotNoUrl]=useState('')
    // ENV import.meta.env.
    
    const fntxtSheetNo =useRef([])
    
    const SERIAL_DATABASE_SWITCH =import.meta.env.VITE_SERIAL_DATABASE_SWITCH 
    const FAC = import.meta.env.VITE_FAC
    const searchParams = new URLSearchParams(window.location.search);
    const SHEETNO = searchParams.get("SHEETNO");
    const SPI_Maker = import.meta.env.VITE_SPI_MAKER
    useEffect(() => {
        if(SHEETNO !== ""){
            settxtSheetNo(SHEETNO)
            Clear_View();
            // btnRetrive1(SHEETNO)
            ViewData(SHEETNO)
        }
        setTimeout(() => {
            fntxtSheetNo.current.focus();
          }, 300);
      }, []);

      useEffect(() => {
        if(SHEETNO!=''){
            ViewData(SHEETNO);

        }
       
      }, [SHEETNO]);
      

    const Clear_View = () =>{
       
        setbtnSPI((prevState) => ({...prevState,value: " ",style:{}}));
        settxtSPICnt("");
        settxtSPITime("");
        settxtSPIMachine("");
        setbtnPre((prevState) => ({...prevState,value: " ",style:{}}));
        setTxtPreCnt("");
        settxtPreTime("");
        settxtPreMachine("");
        setbtnAOI((prevState) => ({...prevState,value: " ",style:{}}));
        settxtAOICnt("");
        settxtAOITime("");
        settxtAOIMachine("");

        setlblShtMachine((prevState) => ({...prevState,value: "",visible:false,style:{}}))
        setlblTitleMachine((prevState) => ({...prevState,value: "",style:{}}))

        setbtnXRay((prevState) => ({...prevState,value: " ",style:{}}));
        settxtXRayCnt("");
        settxtXRayTime("");
        settxtXRayMachine("");

        setbtnAOICOA((prevState) => ({...prevState,value: " ",style:{}}));
        settxtAOICOACnt("");
        settxtAOICOATime("");
        settxtAOICOAMachine("");

        setbtnSMTInt((prevState) => ({...prevState,value: " ",style:{}}));
        settxtSMTIntCnt("");
        settxtSMTIntTime("");
        settxtSMTIntMachine("");

        setbtnAOMEFPC((prevState) => ({...prevState,value: " ",style:{}}));
        settxtAOMEFPCCnt("");
        settxtAOMEFPCTime("");
        settxtAOMEFPCMachine("");
        sethfAOIRollLeafNo("");
        sethfAOMLeafNo("");
        sethfAOMPcsNo("");

        setbtnAOIEFPC((prevState) => ({...prevState,value: " ",style:{}}))
        settxtAOIEFPCCnt("");
        settxtAOIEFPCTime("");
        settxtAOIEFPCMachine("");
        sethfAOIRollLeafNo("");
        sethfAOMLeafNo("");
        sethfAOMPcsNo("");

        setbtnOST((prevState) => ({...prevState,value: " ",style:{}}))
        settxtOSTCnt("");
        settxtOSTTime("");
        settxtOSTMachine("");
        sethfOSTSheetNo("");
        sethfOSTPcsNo("");

        setbtnAVI((prevState) => ({...prevState,value: " ",style:{}}))
        settxtAVICnt("");
        settxtAVITime("");
        settxtAVIMachine("");

        setbtnFVI((prevState) => ({...prevState,value: " ",style:{}}))
        settxtFVICnt("");
        settxtFVITime("");
        settxtFVIMachine("");

        setbtnReflow((prevState) => ({...prevState,value: " ",style:{}}))
        settxtReflowCnt("");
        settxtReflowTime("");
        settxtReflowMachine("");

    }

    const ViewData = async (sheetno) => {
        let txtSheetNo =   sheetno;
        console.log('Selected sheet no:', txtSheetNo, 'Selected cavity:', selectddlCavity);
        setlblMessage("");
        let DBOpenFlg = false
        let dt =[]
        let i;
        let StrResult =""
        let ELT_Count = 0
        let Product =""
        try{
            sethypMaterial((prevState) => ({...prevState,value: "",visible:true}));
            if(SERIAL_DATABASE_SWITCH == '1'){
                if(hfMaterialN1 !== ""){
                    sethypMaterial((prevState) => ({...prevState,value: "Material",visible:false}));
                    //sethypMaterialUrl บรรทัดที่ 184 ส่งลิงค์ไป  hypMaterial.NavigateUrl = hfMaterialN1.Value.Replace("#SHEET_NO#", txtSheetNo.Text)
                }
            }else{
            
                if(hfMaterialA1 !== ""){
                    sethypMaterial((prevState) => ({...prevState,value: "Material",visible:false}));
                    // sethypMaterialUrl("") // hfMaterialA1 ส่ง URL บรรทัด 190
                }
            }
            await axios
            .post("/api/ViewTraceSheet/GetLotSheet", {
              dataList: {
                strPlantCode: FAC,
                strSheetNo: txtSheetNo,
              },
            })
            .then((res) => {
                dt = res.data;
                console.log(res.data,"DATA1")
            });
            if (dt && dt.length > 0) {
                if ( dt[0].lss_lot_no !== null) { 
                  settxtProduct(dt[0].lss_product_name);
                  console.log(dt[0].lss_product_name,"dt[0].lss_product_name")
                  Product = dt[0].lss_product_name
                  sethypLotNo(dt[0].lss_lot_no);
                  //   hypLotNo.href = "./rpt_LotTraceView.aspx?LOT=" + dt[0].Item0;
                  console.log(dt[0].lss_machine_no,"OK",dt[0].lss_machine_no)
                  if (dt[0].lss_machine_no && dt[0].lss_machine_no.trim() !== "") {
                  
                    setlblTitleMachine((prevState) => ({...prevState,value: "",visible:false}));
                    setlblShtMachine((prevState) => ({...prevState,value: dt[0].lss_machine_no.trim(),visible:false}));
                  }
                }
              }
            await axios
            .post("/api/ViewTraceSheet/GetProductSheet", {
              dataList: {
                strPlantCode: FAC,
                strSheetNo: txtSheetNo,
              },
            })
            .then((res) => {
                dt = res.data;
                console.log(res.data,"GetProductSheet")
              
            });
            if(dt != ""){
                console.log(dt,"dt444",dt[0].shn_product_name)
                if(dt[0].shn_product_name !== null){
                    settxtProduct(dt[0].shn_product_name)
                    console.log(dt[0].shn_product_name,"dt[0].lss_product_name1")
                    Product = dt[0].shn_product_name
                    if(hypLotNo == ""){
                        sethypLotNo(dt[0].shn_lot_no)
                     // sethypLotNoUrl(./rpt_LotTraceView.aspx?LOT=&hypLotNo)
                    }
                }
            }
            //SPI
            await axios
            .post("/api/ViewTraceSheet/GetSPI", {
              dataList: {
                strPlantCode: FAC,
                strSheetNo: txtSheetNo,
              },
            })
            .then((res) => {
                dt = res.data;
                console.log("dt14",dt)
            });
            if(dt.length > 0){
                console.log("เข้า 14")
                StrResult = "OK"
                
              
                setbtnSPI((prevState) => ({...prevState,value: "",disbled:false}));
                for(let i =0;i < dt.length;i++){
                    if(dt[i].spr_result !== "GOOD" &&
                       dt[i].spr_result !== "OK" &&
                       dt[i].spr_result !== "WN" &&
                       dt[i].spr_result !== "JUDGE" &&
                       dt[i].spr_result !== "BADMARK" &&
                       dt[i].spr_result !== "PASS" 
                    )
                    {
                        console.log(dt[i].spr_result ,"gt14 :data")
                        StrResult =dt [i].spr_result
                    }
                }
                setbtnSPI((prevState) => ({...prevState,value: StrResult}));
                settxtSPICnt(dt[0].spr_ins_count)
                settxtSPITime(dt[0].spr_inspect_date)
                settxtSPIMachine(dt[0].spr_machine_name)
                if(StrResult.toUpperCase() =="NG" || StrResult.toUpperCase() =="FAIL" || StrResult.toUpperCase() =="BADMARK"){
                    setbtnSPI((prevState) => ({...prevState,style:{backgroundColor:'red'}}));
                }else{
                    setbtnSPI((prevState) => ({...prevState,style:{backgroundColor:'green'}}));
                }
            }else{
                console.log("เข้าาาึ--ภภ")
                setbtnSPI((prevState) => ({...prevState,disbled:true}));
                settxtSPICnt("")
                settxtSPITime("")
                settxtSPIMachine("")
            }
            //PreAOI 321
            await axios
            .post("/api/ViewTraceSheet/GetPreAOI", {
                dataList:{
                    strplantcode: FAC,
                strsheetno: txtSheetNo,
            } 
            })
            .then((res) => {
                dt = res.data;
                console.log(dt,"dt3")
            });
            if(dt.length > 0){
                setbtnPre((prevState) => ({...prevState,disbled:false}));
                console.log("OK",)
                switch (dt[0].prh_result.toUpperCase()) {
                    case "GOOD":
                    case "OK":
                    case "JUDGE":
                    case "WN":
                    case "PASS":
                    case "RPASS":
                        setbtnPre((prevState) => ({
                            ...prevState,
                            style: { backgroundColor: 'green', color: 'white', height: "33px",width: "90%",} 
                        }));
                        break;
                    default:
                        setbtnPre((prevState) => ({
                            ...prevState,
                            disabled: false,
                            style: { backgroundColor: 'red', color: 'white' } 
                        }));
                }
                setbtnPre((prevState) => ({...prevState, disabled: true,value:dt[0].prh_result }));
                setTxtPreCnt(dt[0].prh_inspect_count);
                settxtPreTime(dt[0].prh_inspect_date);
                settxtPreMachine(dt[0].machine_name)
            }else{
                setbtnPre((prevState) => ({...prevState, disabled: true,value:'' }));
                setTxtPreCnt("");
                settxtPreTime("");
            }
            // AOI 358
            await axios
            .post("/api/ViewTraceSheet/GetAOI", {
                dataList:{
                plantcode: FAC,
                sheetno: txtSheetNo,
            }
                
            })
            .then((res) => {
                dt = res.data;
                console.log(dt,"dt5")
            });
            if(dt.length > 0){  
                setbtnAOI((prevState) => ({...prevState, disabled: false,style:{color:'white'} }));
                let AOI_Result = "OK"
                for(let i =0; i < dt.length;i++){
                    if(dt[i].aor_result !== "GOOD" &&
                        dt[i].aor_result !== "OK" &&
                        dt[i].aor_result !== "WN" &&
                        dt[i].aor_result !== "JUDGE" &&
                        dt[i].aor_result !== "BADMARK" &&
                        dt[i].aor_result !== "SKIP" &&
                        dt[i].aor_result !== "RPASS" &&
                        dt[i].aor_result !== "PASS" 
                    ){
                        if(dt[i].error_code > 0){
                            AOI_Result = dt[i].error_code.toUpperCase()
                        }else{
                            AOI_Result = dt[i].aor_result
                        }
                    }
                }
                setbtnAOI((prevState) => ({...prevState, value:AOI_Result}));
                switch (AOI_Result.toUpperCase()) {
                    case 'PASS':
                    case 'SKIP':
                    case 'OK':
                    case 'GOOD':
                        setbtnAOI((prevState) => ({...prevState, value:AOI_Result,style:{backgroundColor:'green'}}));
                      break;
                    case 'RPASS':
                        setbtnAOI((prevState) => ({...prevState, value:AOI_Result,style:{backgroundColor:'#eb984e'}}));
                      break;
                    default:
                        setbtnAOI((prevState) => ({...prevState, value:AOI_Result,style:{backgroundColor:'red'}}));
                  }
                  settxtAOICnt(dt[0].aor_inspect_count)
                  settxtAOITime(dt[0].aor_inspect_date)
                  settxtAOIMachine(dt[0].aor_machine_no)
            }else{
                setbtnAOI((prevState) => ({...prevState,disabled: true}));
            }
            //'AOI Coating 426
            await axios
            .post("/api/ViewTraceSheet/GetAOI_Coating", {
                dataList:{
                    strplantcode: FAC,
                strsheetno: txtSheetNo,
                }
                
            })
            .then((res) => {
                dt = res.data;
            });
            if(dt.length > 0){
                setbtnAOICOA((prevState) => ({...prevState,disabled: false,style:{color:'white'}}));
                let AOI_Result = 'OK';
                for(let i =0; i < dt.length;i++){
                    if(dt[i].aor_result !== "GOOD" &&
                        dt[i].aor_result !== "OK" &&
                        dt[i].aor_result !== "WN" &&
                        dt[i].aor_result !== "JUDGE" &&
                        dt[i].aor_result !== "BADMARK" &&
                        dt[i].aor_result !== "SKIP" &&
                        dt[i].aor_result !== "RPASS" &&
                        dt[i].aor_result !== "PASS" 
                    ){
                        if(dt[i].error_code > 0){
                            AOI_Result = dt[i].error_code.toUpperCase()
                        }else{
                            AOI_Result = dt[i].aor_result
                        }
                    }
                }
                setbtnAOICOA((prevState) => ({...prevState,value: AOI_Result}));
                switch (AOI_Result.toUpperCase()) {
                    case "PASS":
                    case "SKIP":
                    case "OK":
                    case "GOOD":
                        setbtnAOICOA((prevState) => ({...prevState,value: AOI_Result,style:{backgroundColor:'green'}}));
                        break;
                    case "RPASS":
                        setbtnAOICOA((prevState) => ({...prevState,value: AOI_Result,style:{backgroundColor:'#eb984e'}}));
                        break;
                    default:
                        setbtnAOICOA((prevState) => ({...prevState,value: AOI_Result,style:{backgroundColor:'red'}}));
                }
                settxtAOICnt(dt[0].aor_inspect_count)
                settxtAOITime(dt[0].aor_inspect_date)
                settxtAOIMachine(dt[0].aor_machine_no)
            }else{
                setbtnAOICOA((prevState) => ({...prevState,disbled:true}));
            }
            //' SMT Inspection resul 488
            await axios
            .post("/api/ViewTraceSheet/Getinspection", {
                dataList:{  strplantcode: FAC,
                strsheetno: txtSheetNo,}
              
            })
            .then((res) => {
                dt = res.data;
            });
            if(dt.length > 0){
                setbtnSMTInt((prevState) => ({...prevState,value:dt[0].inspect_result}));
                settxtSMTIntCnt((prevState) => ({...prevState,value:dt[0].inspect_count}));
                settxtSMTIntCnt((prevState) => ({...prevState,value:dt[0].machine_no}));
                settxtSMTIntTime((prevState) => ({...prevState,value:dt[0].inspect_date}));
                if(btnSMTInt == "NG"){
                    setbtnSMTInt((prevState) => ({...prevState,value:dt[0].inspect_result,style:{backgroundColor:'red',color:'white'}}));
                }else{
                    setbtnSMTInt((prevState) => ({...prevState,value:dt[0].inspect_result,style:{backgroundColor:'green',color:'white'}}));
                }
            }
            // ' Get SMT_LOT_SHEET_SERIAL 514
            let DataShow = [];
            await axios
            .post("/api/ViewTraceSheet/Get_LOT_SHEET_SERIAL", {
             dataList:{
                plantcode: FAC,
                sheetno: txtSheetNo,
                }
            })
            .then((res) => {
                dt = res.data;
                for (let i = 0; i < dt.length; i += 5) {
                    DataShow.push(dt.slice(i, i + 5));
                  }
          
                  DataShow = DataShow.map((group, index) => {
                    return {
                      key: index,
                      PIECE1: group[0] ? group[0].lss_serial_no  : "",
                      PIECE2: group[1] ? group[1].lss_serial_no  : "",
                      PIECE3: group[2] ? group[2].lss_serial_no  : "",
                      PIECE4: group[3] ? group[3].lss_serial_no  : "",
                      PIECE5: group[4] ? group[4].lss_serial_no  : "",
                    };
                  });
                  settblData1(DataShow);
                 
                });
            //' Get SMT_LOT_SHEET_SERIAL 586
            await axios
            .post("/api/ViewTraceSheet/GetXray", {
             dataList:{
                sheetno: txtSheetNo,
                }
            })
            .then((res) => {
                dt = res.data;
                console.log(dt,"dt66")
            });
            if(dt.length > 0){
                setbtnXRay((prevState) => ({...prevState,value:dt[0].xray_result}));
                if(dt[0].xray_result == "GOOD" ||
                    dt[0].xray_result == "OK" ||
                    dt[0].xray_result == "PASS")
                    {
                    setbtnXRay((prevState) => ({...prevState,value:dt[0].xray_result,style:{backgroundColor:'green'}}));
                    }else{
                    setbtnXRay((prevState) => ({...prevState,value:dt[0].xray_result,style:{backgroundColor:'red'}}));  
                    }
                    settxtXRayCnt(dt[0].xray_count.toString())
                    settxtXRayTime(dt[0].xray_date)
                    settxtXRayMachine(dt[0].xray_machine)
                    setbtnXRay((prevState) => ({...prevState,disbled:false}));        
            }
            let dtSMPJ=[];
            let dtPcsNo=[]
            // 733
            
            await axios
            .post("/api/ViewTraceSheet/GetFPCSMPJPcsCavity", {
                strPrdName: Product
            })
            .then((res) => {
                dtSMPJ = res.data;
                setddlCavity(dtSMPJ);
            });
            if(dtSMPJ.length > 1){
               console.log("เข้าdll")
                setlblCavity((prevState) => ({...prevState,value:'SMPJ Cavity'}));
                setddlCavity(dtSMPJ)
                sethfSMPJCavityFlg("Y")
                setdtddlCavity([])
                setselectddlCavity(dtSMPJ[0].pcs_no)
            }else{
                console.log("เข้าdll2")
                console.log(Product,"Product")
                await axios
                .post("/api/ViewTraceSheet/GetSMTConnectShtPcsCavity", {
                    dataList:{
                        strPlantCode: FAC,
                        strPrdName:Product.trim()
                    }
                    
                })
                .then((res) => {
                    dtPcsNo = res.data;
                    console.log(dtPcsNo,"dtPcsNo")
                    setddlCavity(dtPcsNo)
                });
                setlblCavity((prevState) => ({...prevState,value:'Connect Sht&Pcs'}));
                sethfSMPJCavityFlg("N")
                setdtddlCavity([])
                setselectddlCavity(dtPcsNo[0].pcs_no)
            }
            if(txtSheetNo.trim() !== '' && txtProduct.trim() !== ""){
                let dtData = []
                //757 มิ้วทำ
                await axios.post("/api/ViewTracePiece/GetSerialAOMEFPCResult", {
                    _strPlantCode: FAC,
                    _strSheetNo: txtSheetNo,
                    _intPcsNo: selectddlCavity,
                    _strPrdName: Product,
                    _strSMPJCavityFlg: hfSMPJCavityFlg
                  })
                    .then((res) => {
                      dtData = res.data;
                    });
                if(dtData.length > 0){
                    let AOM_Result = 'OK'
                    for(let i = 0; i < dtData.length;i++){
                        if( dtData[i].AOM_RESULT !== "GOOD" &&
                            dtData[i].AOM_RESULT !== "OK" &&
                            dtData[i].AOM_RESULT !== "WN" &&
                            dtData[i].AOM_RESULT !== "JUDGE" &&
                            dtData[i].AOM_RESULT !== "BADMARK" &&
                            dtData[i].AOM_RESULT !== "SKIP" &&
                            dtData[i].AOM_RESULT !== "RPASS" &&
                            dtData[i].AOM_RESULT !== "PASS" 
                        ){
                            AOM_Result = dtData[i].AOM_RESULT
                        }
                    }
                    StrResult =  AOM_Result
                    if(StrResult.trim() !== ""){
                        setbtnAOMEFPC((prevState) => ({...prevState,value:StrResult}));
                        settxtAOMEFPCTime(dtData[0].AOM_DATE)
                        settxtAOMEFPCCnt("");
                        settxtAOMEFPCMachine(dtData[0].AOM_MACHINE)
                        sethfAOMRollLeafNo(dtData[0].ROLL_LEAF)
                        sethfAOMLeafNo(dtData[0].LEAF_NO)
                        sethfAOMPcsNo(selectddlCavity)
                        if( StrResult == "GOOD" || StrResult == "OK" || StrResult == "PASS" ){
                            setbtnAOMEFPC((prevState) => ({...prevState,value:StrResult,style:{backgroundColor:'green'}}));
                        }else{
                            setbtnAOMEFPC((prevState) => ({...prevState,value:StrResult,style:{backgroundColor:'red'}}));
                        }
                    }
                }
                //793
                await axios
                .post("/api/ViewTraceSheet/GetSerialAOIEFPCResult", {
                  _strPlantCode: FAC,
                  _strFrontSheetNo: txtSheetNo,
                  _intPcsNo:selectddlCavity,
                  _strProduct: txtProduct,
                  _strSMPJCavityFlg: hfSMPJCavityFlg,
                })
                .then((res) => {
                    dtData = res.data;
                });
                if(dtData.length > 0){
                    let AOI_Result ='OK'
                    for(let i =0; i < dtData.length;i++){
                        if(dtData[i].AOI_RESULT !== "GOOD" &&
                           dtData[i].AOI_RESULT !== "OK" &&
                           dtData[i].AOI_RESULT !== "WN" &&
                           dtData[i].AOI_RESULT !== "JUDGE" &&
                           dtData[i].AOI_RESULT !== "BADMARK" &&
                           dtData[i].AOI_RESULT !== "SKIP" &&
                           dtData[i].AOI_RESULT !== "RPASS" &&
                           dtData[i].AOI_RESULT !== "PASS" 
                        ){
                            AOI_Result = dtData[i].AOI_RESULT
                        }
                    }
                    StrResult = AOI_Result
                    if(StrResult.trim() !== ""){
                        setbtnAOIEFPC((prevState) => ({...prevState,value:StrResult}));
                        settxtAOIEFPCTime(dtData[0].AOI_DATE);
                        settxtAOIEFPCCnt("")
                        settxtAOIEFPCMachine(dtData[0].AOI_MACHINE)
                        sethfAOIRollLeafNo(dtData[0].ROLL_LEAF)
                        sethfAOILeafNo(dtData[0].LEAF_NO)
                        sethfAOIPcsNo(selectddlCavity)
                        if(StrResult == "GOOD" ||StrResult == "OK" ||StrResult == "PASS" ){
                            setbtnAOIEFPC((prevState) => ({...prevState,value:StrResult,style:{backgroundColor:'green'}}));
                        }else{
                            setbtnAOIEFPC((prevState) => ({...prevState,value:StrResult,style:{backgroundColor:'red',disabled:false}}));
                        }

                    }
                }
                await axios
                .post("/api/ViewTraceSheet/GetSerialOSTResult", {
                  SerialNo: txtSheetNo.trim().toUpperCase(),
                  intPCSNo:selectddlCavity,
                  strSMPJCavityFlg: hfSMPJCavityFlg,
                })
                .then((res) => {
                  dtData = res.data;
                });
                if(dtData.length > 0){
                    let OST_Result = "OK"
                    for(let i =0;i < dtData.length;i++){
                        if(dtData[i].OST_RESULT !== "GOOD" &&
                            dtData[i].OST_RESULT !== "OK" &&
                            dtData[i].OST_RESULT !== "WN" &&
                            dtData[i].OST_RESULT !== "JUDGE" &&
                            dtData[i].OST_RESULT !== "BADMARK" &&
                            dtData[i].OST_RESULT !== "SKIP" &&
                            dtData[i].OST_RESULT !== "RPASS" &&
                            dtData[i].OST_RESULT !== "PASS" 
                         ){
                            OST_Result = dtData[i].OST_RESULT
                         }
                    }
                    StrResult =OST_Result
                    setbtnOST((prevState) => ({...prevState,value:StrResult,disbled:false}));
                    settxtOSTTime(dtData[0].OST_DATE)
                    settxtOSTCnt("");
                    settxtOSTMachine(dtData[0].OST_MACHINE)
                    sethfOSTPcsNo(selectddlCavity);
                    sethfOSTSheetNo(txtSheetNo.trim().toUpperCase())
                    if( StrResult == "GOOD"||StrResult == "OK"||StrResult == "PASS"){
                        setbtnOST((prevState) => ({...prevState,value:StrResult,disbled:false,style:{backgroundColor:'green'}}));
                    }else{
                        setbtnOST((prevState) => ({...prevState,value:StrResult,disbled:false,style:{backgroundColor:'red'}}));
                    }
                }
                await axios
                .post("/api/ViewTraceSheet/GetSerialAVIResult", {
                    _strFrontSheetNo: txtSheetNo.trim().toUpperCase(),
                    _intPcsNo:selectddlCavity,
                    _strSMPJCavityFlgfv: hfSMPJCavityFlg,
                })
                .then((res) => {
                  dtData = res.data;
                });
                if(dtData.length >0){
                    let AVI_Result ="OK"
                    for(let i =0; i < dtData.length;i++)
                    {
                        if(dtData[i].AVI_RESULT !== "GOOD" &&
                           dtData[i].AVI_RESULT !== "OK" &&
                           dtData[i].AVI_RESULT !== "WN" &&
                           dtData[i].AVI_RESULT !== "JUDGE" &&
                           dtData[i].AVI_RESULT !== "BADMARK" &&
                           dtData[i].AVI_RESULT !== "SKIP" &&
                           dtData[i].AVI_RESULT !== "RPASS" &&
                           dtData[i].AVI_RESULT !== "PASS" 
                        ){
                            AVI_Result = dtData[i].AVI_RESULT
                        }
                    }
                    StrResult = AVI_Result
                    setbtnAVI((prevState) => ({...prevState,value:StrResult,disbled:false}));
                    settxtAVITime(dtData[i].AVI_DATE)
                    settxtAVICnt("");
                    settxtAVIMachine(dtData[i].AVI_MACHINE)
                    if(StrResult == "GOOD" ||StrResult == "OK" || StrResult == "PASS" ){
                        setbtnAVI((prevState) => ({...prevState,value:StrResult,style:{backgroundColor:'green'}}));
                    }else{
                        setbtnAVI((prevState) => ({...prevState,value:StrResult,style:{backgroundColor:'red'}}));
                    }
                }
                // 900
               await axios.post("/api/ViewTracePiece/GetSerialAVIBadmarkResult", {
                intPCSNo: selectddlCavity,
                strSMPJCavityFlg: hfSMPJCavityFlg,
                strSheetNo: txtSheetNo,
              })
                .then((res) => {
                  dtData = res.data;
                  console.log(dtData,"dtDatadtData")
                });
               if(dtData.length >0){
                    let FVI_Result = "OK"
                    for(let i =0; i < dtData.length;i++){
                        if(dtData[i].AVI_RESULT !== "GOOD" &&
                            dtData[i].AVI_RESULT !== "OK" &&
                            dtData[i].AVI_RESULT !== "RPASS" &&
                            dtData[i].AVI_RESULT !== "PASS" 
                         )
                         {
                            FVI_Result = dtData[i].AVI_RESULT
                         }
                    }
                    StrResult =FVI_Result
                    setbtnFVI((prevState) => ({...prevState,value:StrResult,disbled:false}));
                    settxtFVITime(dtData[i].AVI_DATE)
                    settxtFVICnt("")
                    settxtFVIMachine(dtData[i].AVI_MACHINE)
                    if(StrResult == "GOOD" ||StrResult == "OK" ||StrResult == "PASS" ){
                    setbtnFVI((prevState) => ({...prevState,value:StrResult,style:{backgroundColor:'green'}}));
                    }else if(StrResult !=""){
                    setbtnFVI((prevState) => ({...prevState,value:StrResult,style:{backgroundColor:'red'}}));
                    }

                }
                //932
                let dtReflow=[];
                await axios.post("/api/Common/GetSMTSheetReflowResult", {
                    strplantcode: FAC,
                    strsheetno: txtSheetNo
                  })
                    .then((res) => {
                        dtReflow = res.data;
                        console.log(dtReflow,"dtReflow")
                    });
                if(dtReflow.length >0){
                    setbtnReflow((prevState) => ({...prevState,value:dtReflow[0].REFLOW_RESULT}));  
                    if(btnReflow == "NG"){
                        setbtnReflow((prevState) => ({...prevState,value:dtReflow[0].REFLOW_RESULT,style:{backgroundColor:'red'}}));  
                    }else{
                        setbtnReflow((prevState) => ({...prevState,value:dtReflow[0].REFLOW_RESULT,style:{backgroundColor:'green'}}));  
                    }
                    settxtReflowTime(dtReflow[0].REFLOW_DATE)
                    settxtReflowCnt(dtReflow[0].REFLOW_COUNT)
                    settxtReflowMachine(dtReflow[0].REFLOW_MACHINE)
                }
            }
        }catch (ex){
            // setlblMessage("ERROR")
        }




    }
    const  btnAllLInk= (page) =>{
        if(page == 'SPI'){
            if(txtSPICnt !== ""){
                window.open(`/TraceabilitySystem/SPIResult?sheet_no=${txtSheetNo}&PRODUCT_NAME=${txtProduct.trim()}&panel_no=${PanelNo}`, '_blank');
            }else{
                setlblMessage("Please input SerialNo and click Retrive.")
            }
    
        }else if(page=='PRE_AOI'){
            if(TxtPreCnt !== ""){
               window.open(`/TraceabilitySystem/PREResult2?sheet_no=${txtSheetNo}&PRODUCT_NAME=${txtProduct.trim()}`, '_blank');
                
            }
        }else if(page=='OST'){
            if(txtSheetNo !== ""){;
               window.open(`/TraceabilitySystem/OSTResult?sheet_no=${txtSheetNo}&PRODUCT_NAME=${txtProduct.trim()}&panel_no=${PanelNo}`, '_blank');
                
            }else{
                setlblMessage("Please input SerialNo and click Retrive.")
            }
        }else if(page=='AOI'){
            if(txtAOICnt !== ""){
                window.open(`/TraceabilitySystem/AOIResult?sheet_no=${txtSheetNo}&PRODUCT_NAME=${txtProduct.trim()}`, '_blank');
            }
        }else if(page=='XRAY'){
            let SERIAL_NO = '0'
        if(SERIAL_DATABASE_SWITCH == "1"){
            window.open(`/TraceabilitySystem/XRayResult?sheet_no=${txtSheetNo}&serial_no=${SERIAL_NO}&INSPECT_NO=${txtXRayCnt.trim()}&INSPECT_DATE=${txtXRayTime.trim()}`, '_blank');
        }else{
            window.open(`/TraceabilitySystem/XRayResult?sheet_no=${txtSheetNo}&serial_no=${SERIAL_NO}&INSPECT_NO=${txtXRayCnt.trim()}&INSPECT_DATE=${txtXRayTime.trim()}`, '_blank');

        }
        }else if(page=='AOI_COA'){
            if(txtAOICOACnt !== "")
                {
                    window.open(`/TraceabilitySystem/AOICOAResult2?sheet_no=${txtSheetNo}&PRODUCT_NAME=${txtProduct.trim()}&panel_no=${PanelNo}`, '_blank');
                   
                    
             }
        }
       
    }
    const btnClear =() =>{
        Clear_View();
        settxtSheetNo("")
    }
    const btnRetrive =() =>{
        // Clear_View()
        sethypLotNo("");
        sethypLotNoUrl("")
        ViewData(txtSheetNo)

    }
    const ddlCavity_SelectedIndexChanged =(event) =>{
        const dropdawn = event.target.value;
        console.log(dropdawn,"dropdawn")
        setselectddlCavity(dropdawn)
        if(txtSheetNo.trim() !== "")
        {    
            // Clear_View()
            if(dropdawn > 0){
                ViewDataPcs(txtSheetNo);
            }else{
                ViewData(txtSheetNo);
            }
            
     }
      
       
            
       
    }
    const ViewDataPcs =async()=>{
        let intPcsNo =0
        console.log(hfSMPJCavityFlg,"hfSMPJCavityFlg")
        if(hfSMPJCavityFlg == "Y"){
            GetFPCPcsNoBySMPJCavity
            await axios.post("/api/ViewTraceSheet/GetSerialAOMEFPCResult", {
                strProduct:txtProduct,
                _intPcsNo:selectddlCavity
              })
                .then((res) => {
                  dtData = res.data;
                  console.log(dtData,"dtData1")
                });
            //1048
        }else{
            console.log(selectddlCavity,"selectddlCavity333")
            intPcsNo = selectddlCavity
        }
        if( intPcsNo > 0){
            console.log("เข้าจ้า-ภภภ-",intPcsNo)
            setlblMessage("")
            let DBOpenFlg = false
            let dt = [];
            let i;
            let StrResult ="";
            let ELT_Count = 0;
            console.log(FAC,txtSheetNo,intPcsNo,txtProduct,hfSMPJCavityFlg,"HJHJHJ")
            if(txtSheetNo.trim() !=="" && txtProduct.trim() !== ""){
                let dtData = []
                //1071
                await axios.post("/api/ViewTracePiece/GetSerialAOMEFPCResult", {
                    _strPlantCode: FAC,
                    _strSheetNo: txtSheetNo,
                    _intPcsNo: intPcsNo,
                    _strPrdName: txtProduct,
                    _strSMPJCavityFlg: hfSMPJCavityFlg
                  })
                    .then((res) => {
                      dtData = res.data;
                    });
                if( dtData.length > 0){
                    StrResult = dtData[0].AOM_RESULT
                    if( StrResult.trim() !== ""){
                        setbtnAOMEFPC((prevState) => ({...prevState,value:StrResult}));  
                        settxtAOMEFPCTime(dtData[0].AOM_DATE)
                        settxtAOMEFPCCnt(dtData[0].PCS_NO)
                        settxtAOMEFPCMachine(dtData[0].AOM_MACHINE)
                        sethfAOMRollLeafNo(dtData[0].ROLL_LEAF)
                        sethfAOMLeafNo(dtData[0].LEAF_NO)
                        sethfAOMPcsNo(dtData[0].PCS_NO)
                        if(StrResult == "GOOD" ||StrResult == "OK" ||StrResult == "PASS" ){
                            setbtnAOMEFPC((prevState) => ({...prevState,value:StrResult,style:{backgroundColor:'green'}}));  
                        }else{
                            setbtnAOMEFPC((prevState) => ({...prevState,value:StrResult,style:{backgroundColor:'red'}}));  
                        }
                    }
                }
                //AOI
                await axios
                .post("/api/ViewTraceSheet/GetSerialAOIEFPCResult", {
                  _strPlantCode: FAC,
                  _strFrontSheetNo: txtSheetNo.trim().toUpperCase(),
                  _intPcsNo:selectddlCavity,
                  _strProduct: txtProduct,
                  _strSMPJCavityFlg: hfSMPJCavityFlg,
                })
                .then((res) => {
                    dtData = res.data;
                });
                if(dtData.length > 0){
                    StrResult = dtData[0].AOI_RESULT
                    if(StrResult.trim() !== ""){
                        setbtnAOIEFPC((prevState) => ({...prevState,value:StrResult}));
                        settxtAOIEFPCTime(dtData[0].AOI_DATE);
                        settxtAOIEFPCCnt(dtData[0].PCS_NO)
                        settxtAOIEFPCMachine(dtData[0].AOI_MACHINE)
                        sethfAOIRollLeafNo(dtData[0].ROLL_LEAF)
                        sethfAOILeafNo(dtData[0].LEAF_NO)
                        sethfAOIPcsNo(dtData[0].PCS_NO)
                        if(StrResult == "GOOD" ||StrResult == "OK" ||StrResult == "PASS" ){
                            setbtnAOIEFPC((prevState) => ({...prevState,value:StrResult,style:{backgroundColor:'green'}}));
                        }else{
                            setbtnAOIEFPC((prevState) => ({...prevState,value:StrResult,style:{backgroundColor:'red',disabled:false}}));
                        }

                    }
                }
                //OST
                await axios
                .post("/api/ViewTraceSheet/GetSerialOSTResult", {
                  SerialNo: txtSheetNo.trim().toUpperCase(),
                  intPCSNo:selectddlCavity,
                  strSMPJCavityFlg: hfSMPJCavityFlg,
                })
                .then((res) => {
                  dtData = res.data;
                });
                if(dtData.length > 0){
                    StrResult =dtData[0].OST_RESULT
                    setbtnOST((prevState) => ({...prevState,value:StrResult,disbled:false}));
                    settxtOSTTime(dtData[0].OST_DATE)
                    settxtOSTCnt(dtData[0].PCS_NO);
                    settxtOSTMachine(dtData[0].OST_MACHINE)
                    sethfOSTPcsNo(dtData[0].PCS_NO);
                    sethfOSTSheetNo(txtSheetNo.trim().toUpperCase())
                    if( StrResult == "GOOD"||StrResult == "OK"||StrResult == "PASS"){
                        setbtnOST((prevState) => ({...prevState,value:StrResult,disbled:false,style:{backgroundColor:'green'}}));
                    }else{
                        setbtnOST((prevState) => ({...prevState,value:StrResult,disbled:false,style:{backgroundColor:'red'}}));
                    }
                }
                //AVI
                await axios
                .post("/api/ViewTraceSheet/GetSerialAVIResult", {
                    _strFrontSheetNo: txtSheetNo.trim().toUpperCase(),
                    _intPcsNo:selectddlCavity,
                    _strSMPJCavityFlgfv: hfSMPJCavityFlg,
                })
                .then((res) => {
                  dtData = res.data;
                });
                if(dtData.length >0){
                    StrResult = AVI_Result
                    setbtnAVI((prevState) => ({...prevState,value:StrResult,disbled:false}));
                    settxtAVITime(dtData[0].AVI_DATE)
                    settxtAVICnt(dtData[0].PCS_NO);
                    settxtAVIMachine(dtData[0].AVI_MACHINE)
                    if(StrResult == "GOOD" ||StrResult == "OK" || StrResult == "PASS" ){
                        setbtnAVI((prevState) => ({...prevState,value:StrResult,style:{backgroundColor:'green'}}));
                    }else{
                        setbtnAVI((prevState) => ({...prevState,value:StrResult,style:{backgroundColor:'red'}}));
                    }
                }
                //FVI
                // 1150
                await axios.post("/api/ViewTracePiece/GetSerialAVIBadmarkResult", {
                    intPCSNo: selectddlCavity,
                    strSMPJCavityFlg: hfSMPJCavityFlg,
                    strSheetNo: txtSheetNo,
                  })
                    .then((res) => {
                      dtData = res.data;
                    });
                if(dtData.length >0){
                    let FVI_Result = "OK"
                    for(let i =0; i < dtData.length;i++){
                        if(dtData[i].AVI_RESULT !== "GOOD" &&
                            dtData[i].AVI_RESULT !== "OK" &&
                            dtData[i].AVI_RESULT !== "RPASS" &&
                            dtData[i].AVI_RESULT !== "PASS" 
                         )
                         {
                            FVI_Result = dtData[i].AVI_RESULT
                         }
                    }
                    StrResult =FVI_Result
                    setbtnFVI((prevState) => ({...prevState,value:StrResult,disbled:false}));
                    settxtFVITime(dtData[i].AVI_DATE)
                    settxtFVICnt("")
                    settxtFVIMachine(dtData[i].AVI_MACHINE)
                    if(StrResult == "GOOD" ||StrResult == "OK" ||StrResult == "PASS" ){
                    setbtnFVI((prevState) => ({...prevState,value:StrResult,style:{backgroundColor:'green'}}));
                    }else if(StrResult !=""){
                    setbtnFVI((prevState) => ({...prevState,value:StrResult,style:{backgroundColor:'red'}}));
                    }

                }
            }
            try {
                //1194
                await axios
                .post("/api/ViewTraceSheet/GetSPI_Front", {
                    dataList:{
                        strplantcode:FAC,
                        strprd:txtProduct,
                        strintPcsNo: intPcsNo,
                        strsheetno:txtSheetNo
                    }
                    
                })
                .then((res) => {
                  dtData = res.data;
                });
                //1215 
                if(dt.length > 0){
                    await axios 
                    .post("/api/ViewTraceSheet/GetSPI_RSLT", {
                        dataList:{
                            plantcode:FAC,
                            sheetno:txtProduct
                        }
                        
                    })
                    .then((res) => {
                      dtData = res.data;
                      console.log(res.data,"SPI1")
                    });
                    if(SPI_Maker == "CKD"){
                        PanelNo =  (intPcsNo - 1).toString().trim();
                    }else{
                        PanelNo = intPcsNo
                    }
                }
           
       
           if(dt.length > 0){
            StrResult = '';
            for(let i =0; i < dt.length;i++){
                StrResult = dt[i].SPR_RESULT.trim().toUpperCase();
                if(StrResult.toUpperCase() == "NG" ||StrResult.toUpperCase() == "FAIL"||StrResult.toUpperCase() == "BADMARK"||StrResult.toUpperCase() == "SKIP"){
                    break;  
                }
            }
            if(StrResult.toUpperCase() != "NG" ||StrResult.toUpperCase() != "FAIL"||StrResult.toUpperCase() != "BADMARK"||StrResult.toUpperCase() != "SKIP"){
                for(let i =0;i>dt.length;i++){
                    StrResult = dt[i].SPR_RESULT.trim()
                    if (StrResult.substring(0, 1).toUpperCase() === "E" || StrResult.substring(0, 1).toUpperCase() === "W") {
                        break;
                    }
                    
                }
            }
            settxtSPICnt(dt[0].spr_ins_count)
            settxtSPITime(dt[0].spr_inspect_date)
            settxtSPIMachine(dt[0].spr_machine_name)
            setbtnSPI((prevState) => ({...prevState,value:StrResult}));  
            switch (StrResult.toUpperCase()) {
                case "GOOD":
                case "OK":
                case "JUDGE":
                case "WN":
                case "PASS":
                case "RPASS":
                    setbtnSPI((prevState) => ({...prevState,value:StrResult,style:{backgroundColor:'green',color:'white'}})); 
                    break;
                case "NG":
                case "FAIL":
                case "BADMARK":
                case "SKIP":
                    setbtnSPI((prevState) => ({...prevState,value:StrResult,style:{backgroundColor:'red',color:'white'}})); 
                case "":
                    setbtnSPI((prevState) => ({...prevState,value:""})); 
                    break;
                default:
                    setbtnSPI((prevState) => ({...prevState,value:StrResult,style:{backgroundColor:'green',color:'white'}})); 
                    break;
            }
           }else{
            await axios
                .post("/api/ViewTraceSheet/GetSPI_RSLT", {
                    dataList:{
                        plantcode:FAC,
                        sheetno:txtProduct
                    }
                    
                })
                .then((res) => {
                  dtData = res.data;
                });
                if(dt.length>0){
                    StrResult = "BADMARK"
                    settxtSPICnt(dt[0].spr_ins_count)
                    settxtSPITime(dt[0].spr_inspect_date)
                    settxtSPIMachine(dt[0].spr_machine_name)
                    setbtnSPI((prevState) => ({...prevState,value:StrResult,style:{backgroundColor:'red',color:'white'}}));  
                }else{
                    settxtSPICnt("")
                    settxtSPITime("")
                    settxtSPIMachine("")
                    setbtnSPI((prevState) => ({...prevState,value:StrResult,disbled:true}));  
                }
           }
           if(btnSPI.value == ""){
            await axios
            .post("/api/ViewTraceSheet/GetRslt_Header", {
                dataList:{
                    plantcode:FAC,
                    sheetno:txtSheetNo
                }
                
            })
            .then((res) => {
              dtData = res.data;
            });
            if(dt.length > 0){
            settxtSPICnt(dt[0].sph_panel_count)
            settxtSPITime(dt[0].sph_inspection_date)
            settxtSPIMachine(dt[0].sph_machine_name)
            setbtnSPI((prevState) => ({...prevState,value:dt[0].sph_result}));  
            switch (dt[0].sph_result.toUpperCase()) {
                case "GOOD":
                case "OK":
                case "JUDGE":
                case "WN":
                case "PASS":
                case "RPASS":
                    setbtnSPI((prevState) => ({...prevState,style:{backgroundColor:'green',color:'white'}})); 
                    break;
                case "NG":
                case "FAIL":
                case "BADMARK":
                case "SKIP":
                    setbtnSPI((prevState) => ({...prevState,style:{backgroundColor:'red',color:'white'}})); 
                case "":
                    setbtnSPI((prevState) => ({...prevState,value:""})); 
                    break;
                default:
                    setbtnSPI((prevState) => ({...prevState,style:{backgroundColor:'green',color:'white'}})); 
                    break;
            }
            }

            //SPI 1340 trc_037_traceviewsheet_getprespi
            await axios
            .post("/api/ViewTraceSheet/GetPreSPI", {
              dataList: {
                strPlantCode: FAC,
                strSheetNo: txtSheetNo,
              },
            })
            .then((res) => {
                dt = res.data;
            });
            if(dt.length >0){
                setTxtPreCnt(dt[0].prh_inspect_count)
                settxtPreTime(dt[0].prh_inspect_date)
                settxtPreMachine(dt[0].prh_machine_id)
              

                const result = dt.rows[0].PRH_RESULT.toString().toUpperCase().trim();

                switch (result) {
                    case "GOOD":
                    case "OK":
                    case "JUDGE":
                    case "WN":
                    case "PASS":
                    case "RPASS":
                        btnPre.style.backgroundColor = "green"; // ตั้งค่าสีพื้นหลัง
                        btnPre.style.color = "white"; // ตั้งค่าสีตัวอักษร
                        btnPre.textContent = "OK"; // ตั้งค่าข้อความ
                        break; // ออกจาก switch
                
                    default:
                        await axios
            .post("/api/ViewTraceSheet/GetPRD_NG_DETAIL", {
              dataList: {
                plantcode: FAC,
                sheetno: txtSheetNo,
                intPcsNo:intPcsNo
              },
            })
            .then((res) => {
                dt = res.data;
            });
                        // ตรวจสอบจำนวนแถว
                        if (dt.length > 0) {
                            setbtnPre((prevState) => ({...prevState,value:"NG",style:{backgroundColor:'red',color:'white'}}));  
                        } else {
                            setbtnPre((prevState) => ({...prevState,value:"OK",style:{backgroundColor:'green',color:'white'}}));
                        }
                        break; // ออกจาก switch
                }
                

            }
            setbtnPre((prevState) => ({...prevState,disbled:true}));  
            setTxtPreCnt("");
            settxtPreTime("");
            settxtPreMachine("");
                //AOI 1397  trc_037_traceviewsheet_getaoi_rslt
                await axios
                .post("/api/ViewTraceSheet/GetAoi_rslt", {
                dataList:{
                    plantcode: FAC,
                    sheetno: txtSheetNo,
                    intPcsNo: intPcsNo
                    }
                })
                .then((res) => {
                    dt = res.data;
                });
                if(dt.length > 0){
                    setbtnAOI((prevState) => ({...prevState,disbled:false,style:{backgroundColor:'green',color:'white',value:'OK'}})); 
                    settxtAOICnt(dt[0].aor_inspect_count)
                    settxtAOITime(dt[0].aor_inspect_date)
                    settxtAOIMachine(dt[0].aor_machine_no)
                }else{
                    await axios
                    .post("/api/ViewTraceSheet/GetAoi_rslt_short", {
                    dataList:{
                        plantcode: FAC,
                        sheetno: txtSheetNo
                        }
                    })
                    .then((res) => {
                        dt = res.data;
                    });
                    if(dt.length > 0){
                        settxtAOICnt(dt[0].aor_inspect_count)
                        settxtAOITime(dt[0].aor_inspect_date);
                        settxtAOIMachine(dt[0].aor_machine_no)
                        await axios
                        .post("/api/ViewTraceSheet/GetAoi_rslt_short2", {
                        dataList:{
                            plantcode: FAC,
                            sheetno: txtSheetNo,
                            intPcs: intPcsNo
                            }
                        })
                        .then((res) => {
                            dt = res.data;
                        });
                        if(dt.length > 0){
                            //NG
                            setbtnAOI((prevState) => ({...prevState,style:{backgroundColor:'red',color:'white',value:dt[0].aor_result}}));
                            for (let i = 0; i < dt.length; i++) {
                              
                                if (dt[drRow].error_code) {
                                    setbtnAOI((prevState) => ({...prevState,value:dt[drRow].error_code}));
                                  break;
                                }
                              }
                              settxtAOICnt(dt[0].aor_inspect_count)
                              settxtAOITime(dt[0].aor_inspect_date)
                              settxtAOIMachine(dt[0].aor_machine_no)
                              
                        }else{
                            setbtnAOI((prevState) => ({...prevState,style:{backgroundColor:'green',color:'white',disabled:false,value:'OK'}}));
                        }
                    }
                }
                if(btnAOI.trim() !== ""){
                    await axios
                    .post("/api/ViewTraceSheet/GetAoi_rslt_short", {
                    dataList:{
                        plantcode: FAC,
                        sheetno: txtSheetNo
                        }
                    })
                    .then((res) => {
                        dt = res.data;
                    });
                    if(dt.length >0){
                        setbtnAOI((prevState) => ({...prevState,value:dt[0].aor_result}))
                        for(let drRow =0;drRow <dt.length;drRow++){
                            if(dt[drRow].error_code.trim().toUpperCase() > 0){
                                setbtnAOI((prevState) => ({...prevState,value:dt[drRow].error_code}));
                                break;

                            }
                        }
                        settxtAOICnt(dt[0].aor_inspect_count)
                        settxtAOITime(dt[0].aor_inspect_date)
                        settxtAOIMachine(dt[0].aor_machine_no)
                        switch (btnAOI.toUpperCase()) { // สมมุติว่า btnAOIText เป็นค่าของ btnAOI.Text
                            case "GOOD":
                            case "OK":
                            case "JUDGE":
                            case "WN":
                            case "PASS":
                            case "RPASS":
                                setbtnAOI((prevState) => ({...prevState,style:{backgroundColor:'green',color:'white'}}));
                              break;
                              
                            case "NG":
                            case "FAIL":
                            case "BADMARK":
                            case "SKIP":
                                setbtnAOI((prevState) => ({...prevState,style:{backgroundColor:'red',color:'white'}}));
                              break;
                            default:
                              break;
                          }
                          
                    }
                    
                //end if 1519
                }
                //'AOI Coating 1521 กำลังทำ

//1663
            await axios
            .post("/api/ViewTraceSheet/Get_LOT_SHEET_SERIAL", {
            dataList:{
                plantcode: FAC,
                sheetno: txtSheetNo,
                }
                
            })
            .then((res) => {
                dt = res.data; dt = res.data;
                for (let i = 0; i < dt.length; i += 5) {
                    DataShow.push(dt.slice(i, i + 5));
                  }
          
                  DataShow = DataShow.map((group, index) => {
                    return {
                      key: index,
                      PIECE1: group[0] ? group[0].lss_serial_no  : "",
                      PIECE2: group[1] ? group[1].lss_serial_no  : "",
                      PIECE3: group[2] ? group[2].lss_serial_no  : "",
                      PIECE4: group[3] ? group[3].lss_serial_no  : "",
                      PIECE5: group[4] ? group[4].lss_serial_no  : "",
                    };
                  });
                  settblData1(DataShow);
                 
            });

           }

        } catch (error) {
                
            }
        }
        
    }
    const createLink= (text) => {
        return (
          <a
            href={`/TraceabilitySystem/PieceTraceView?SERIAL=${text}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {text}
          </a>
        );
    };  
    const columnstblData1= [
        {
          title: "PIECE1",
          dataIndex: "PIECE1",
          key: "PIECE1",
          render: (text, record, index) => {
            return createLink(text);
          },
          align: "center",
        },
        {
          title: "PIECE2",
          dataIndex: "PIECE2",
          key: "PIECE2",
          align: "center",
          render: (text, record, index) => {
            return createLink(text);
          },
        },
        {
          title: "PIECE3",
          dataIndex: "PIECE3",
          key: "PIECE3",
          align: "center",
          render: (text, record, index) => {
            return createLink(text);
          },
        },
    
        {
          title: "PIECE4",
          key: "PIECE4",
          dataIndex: "PIECE4",
          align: "center",
          render: (text, record, index) => {
            return createLink(text);
          },
        },
        {
          title: "PIECE5",
          key: "PIECE5",
          dataIndex: "PIECE5",
          align: "center",
          render: (text, record, index) => {
            return createLink(text);
          },
        },
    ];
    
  return {
    lblMessage,txtSheetNo,settxtSheetNo,btnRetrive,btnClear,txtProduct,settxtProduct,hypLotNo,
    ddlCavity,selectddlCavity,setselectddlCavity,lblShtMachine,hypMaterial,
    btnAOMEFPC,txtAOMEFPCCnt,txtAOMEFPCTime,txtAOMEFPCMachine,btnAOIEFPC,txtAOIEFPCCnt,txtAOIEFPCTime,
    btnOST,txtOSTCnt,txtOSTTime,txtOSTMachine,btnAVI,txtAVICnt,txtAVITime,txtAVIMachine,
    btnFVI,txtFVICnt,txtFVITime,txtFVIMachine,btnSPI,txtSPICnt,txtSPITime,txtSPIMachine,
    btnPre,TxtPreCnt,txtPreTime,txtPreMachine,btnReflow,txtReflowCnt,txtReflowTime,txtReflowMachine,
    btnAOI,txtAOICnt,txtAOITime,txtAOIMachine,btnXRay,txtXRayCnt,txtXRayTime,txtXRayMachine,
    btnAOICOA,txtAOICOACnt,txtAOICOATime,txtAOICOAMachine,btnSMTInt,txtSMTIntCnt,txtSMTIntTime,txtSMTIntMachine,tblData1,
    btnAllLInk,ddlCavity_SelectedIndexChanged,
    lblCavity,txtAOIEFPCMachine,columnstblData1,fntxtSheetNo

    // onClick={() => btnAllLInk('AOI')}


  }
}

export{fn_rpt_SheetTraceView}