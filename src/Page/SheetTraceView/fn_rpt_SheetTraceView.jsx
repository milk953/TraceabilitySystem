import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { values } from "lodash";
import { color } from "framer-motion";

function fn_rpt_SheetTraceView() {
    const[txtSheetNo,settxtSheetNo] =useState("")
    const[txtProduct,settxtProduct] =useState("")
    const[ddlCavity,setddlCavity] =useState([])
    const[selectddlCavity,setselectddlCavity]=useState("")
    const[lblShtMachine,setlblShtMachine]=useState({ visible: "",value:''})
    const[lblTitleMachine,setlblTitleMachine]=useState({ visible: "",value:''})
    const[hypMaterial,sethypMaterial]=useState({ visible: "",value:''})
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
    
    //table
    const[tblData1,settblData1]=useState([])

    
    // HF
    const[hfMaterialA1,sethfMaterialA1]=useState("")
    const[hfMaterialN1,sethfMaterialN1]=useState("")
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
    const [hypMaterialUrl ,sethypMaterialUrl]=useState('')
    const [hypLotNoUrl ,sethypLotNoUrl]=useState('')
    // ENV import.meta.env.
    const SERIAL_DATABASE_SWITCH =import.meta.env.VITE_SERIAL_DATABASE_SWITCH 
    const searchParams = new URLSearchParams(window.location.search);
    const SHEETNO = searchParams.get("SHEETNO");

    useEffect(() => {
        if(SHEETNO !== ""){
            settxtSheetNo(SHEETNO)
            Clear_View();
            settxtProduct("");
            sethypLotNo("")
        }
      }, []);

    const Clear_View = () =>{
        setbtnSPI((prevState) => ({...prevState,value: " "}));
        settxtSPICnt("");
        settxtSPITime("");
        settxtSPIMachine("");
        setbtnPre((prevState) => ({...prevState,value: " "}));
        setTxtPreCnt("");
        settxtPreTime("");
        settxtPreMachine("");
        setbtnAOI((prevState) => ({...prevState,value: " "}));
        settxtAOICnt("");
        settxtAOITime("");
        settxtAOIMachine("");

        setlblShtMachine((prevState) => ({...prevState,value: "",visible:false}))
        setlblTitleMachine((prevState) => ({...prevState,value: ""}))

        setbtnXRay((prevState) => ({...prevState,value: " "}));
        settxtXRayCnt("");
        settxtXRayTime("");
        settxtXRayMachine("");

        setbtnAOICOA((prevState) => ({...prevState,value: " "}));
        settxtAOICOACnt("");
        settxtAOICOATime("");
        settxtAOICOAMachine("");

        setbtnSMTInt((prevState) => ({...prevState,value: " "}));
        settxtSMTIntCnt("");
        settxtSMTIntTime("");
        settxtSMTIntMachine("");

        setbtnAOMEFPC((prevState) => ({...prevState,value: " "}));
        settxtAOMEFPCCnt("");
        settxtAOMEFPCTime("");
        settxtAOMEFPCMachine("");
        sethfAOIRollLeafNo("");
        sethfAOMLeafNo("");
        sethfAOMPcsNo("");

        setbtnAOIEFPC((prevState) => ({...prevState,value: " "}))
        settxtAOIEFPCCnt("");
        settxtAOIEFPCTime("");
        settxtAOIEFPCMachine("");
        sethfAOIRollLeafNo("");
        sethfAOMLeafNo("");
        sethfAOMPcsNo("");

        setbtnOST((prevState) => ({...prevState,value: " "}))
        settxtOSTCnt("");
        settxtOSTTime("");
        settxtOSTMachine("");
        sethfOSTSheetNo("");
        sethfOSTPcsNo("");

        setbtnAVI((prevState) => ({...prevState,value: " "}))
        settxtAVICnt("");
        settxtAVITime("");
        settxtAVIMachine("");

        setbtnFVI((prevState) => ({...prevState,value: " "}))
        settxtFVICnt("");
        settxtFVITime("");
        settxtFVIMachine("");

        setbtnReflow((prevState) => ({...prevState,value: " "}))
        settxtReflowCnt("");
        settxtReflowTime("");
        settxtReflowMachine("");

    }
    const ViewData = async() =>{
        setlblMessage("");
        let DBOpenFlg = false
        let dt =[]
        let i;
        let StrResult =""
        let ELT_Count = 0
       
        try{
            sethypMaterial((prevState) => ({...prevState,value: "",visible:true}));
            if(SERIAL_DATABASE_SWITCH == '0'){
                if(hfMaterialN1 !== ""){
                    sethypMaterial((prevState) => ({...prevState,value: "Material",visible:false}));
                    //sethypMaterialUrl บรรทัดที่ 184 ส่งลิงค์ไป  hypMaterial.NavigateUrl = hfMaterialN1.Value.Replace("#SHEET_NO#", txtSheetNo.Text)
                }
            }else{
                if(hfMaterialA1 !== ""){
                    sethypMaterial((prevState) => ({...prevState,value: "Material",visible:false}));
                    sethypMaterialUrl("") // hfMaterialA1 ส่ง URL บรรทัด 190
                }
            }
          
            await axios
            .post("/api/GetLotSheet", {
              dataList: {
                strPlantCode: FAC,
                strSheetNo: txtSheetNo,
              },
            })
            .then((res) => {
                dt = res.data;
            });
            if (dt && dt.length > 0) {
                if (dt[0] && dt[0].lss_lot_no !== null) { 
                  settxtProduct(dt[0].lss_product_name); 
                  sethypLotNo(dt[0].lss_lot_no);
                  //   hypLotNo.href = "./rpt_LotTraceView.aspx?LOT=" + dt[0].Item0;
          
                  if (dt[0].lss_machine_no && dt[0].lss_machine_no.trim() !== "") {
                    setlblTitleMachine((prevState) => ({...prevState,value: "",visible:false}));
                    setlblShtMachine((prevState) => ({...prevState,value: dt[0].lss_machine_no.trim(),visible:false}));
                  }
                }
              }
            await axios
            .post("/api/GetProductSheet", {
              dataList: {
                strPlantCode: FAC,
                strSheetNo: txtSheetNo,
              },
            })
            .then((res) => {
                dt = res.data;
            });
            if(dt != ""){
                if(dt[0].shn_product_name !== null){
                    settxtProduct(dt[0].shn_product_name)
                    if(hypLotNo == ""){
                        sethypLotNo(dt[0].shn_lot_no)
                     // sethypLotNoUrl(./rpt_LotTraceView.aspx?LOT=&hypLotNo)
                    }
                }
            }
            await axios
            .post("/api/GetSPI", {
              dataList: {
                strPlantCode: FAC,
                strSheetNo: txtSheetNo,
              },
            })
            .then((res) => {
                dt = res.data;
            });
            if(dt !== ""){
                StrResult =="OK"
                setbtnSPI((prevState) => ({...prevState,value: "",visible:false}));
                for(let i =0;i < dt.length;i++){
                    if(dt[i].spr_result !== "GOOD" &&
                       dt[i].spr_result !== "OK" &&
                       dt[i].spr_result !== "WN" &&
                       dt[i].spr_result !== "JUDGE" &&
                       dt[i].spr_result !== "BADMARK" &&
                       dt[i].spr_result !== "PASS" 
                    )
                    {
                        StrResult =dt [i].spr_result
                    }
                }
                setbtnSPI((prevState) => ({...prevState,value: StrResult}));
                settxtSPICnt(dt[0].spr_ins_count)
                settxtSPITime(dt[0].spr_inspect_date)
                settxtSPIMachine(dt[0].spr_machine_name)
                if(StrResult.toUpperCase() =="NG" || StrResult.toUpperCase() =="FAIL" || StrResult.toUpperCase() =="BADMARK"){
                    setbtnSPI((prevState) => ({...prevState,value: StrResult,style:{backgroungcolor:'red'}}));
                }else{
                    setbtnSPI((prevState) => ({...prevState,value: StrResult,style:{backgroungcolor:'green'}}));
                }
            }else{
                setbtnSPI((prevState) => ({...prevState,value: StrResult,style:{backgroungcolor:'green'},disbled:true}));
                settxtSPICnt("")
                settxtSPITime("")
                settxtSPIMachine("")
            }
            await axios
            .post("/api/GetPreAOI", {
                strplantcode: FAC,
                strsheetno: txtSheetNo,
            })
            .then((res) => {
                dt = res.data;
            });
            if(dt.length > 0){
                setbtnPre((prevState) => ({...prevState,value: StrResult,disbled:false}));
                switch (dt[0].prh_result.toUpperCase()) {
                    case "GOOD":
                    case "OK":
                    case "JUDGE":
                    case "WN":
                    case "PASS":
                    case "RPASS":
                        setbtnPre((prevState) => ({
                            ...prevState,
                            disabled: false,
                            style: { backgroundColor: 'green', color: 'white' } 
                        }));
                        break;
                    default:
                        setbtnPre((prevState) => ({
                            ...prevState,
                            disabled: false,
                            style: { backgroundColor: 'red', color: 'white' } 
                        }));
                }
            }else{
                setbtnPre((prevState) => ({...prevState, disabled: true,value:'' }));
                setTxtPreCnt("");
                settxtPreTime("");
            }
            await axios
            .post("/api/GetAOI", {
                plantcode: FAC,
                sheetno: txtSheetNo,
            })
            .then((res) => {
                dt = res.data;
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
            await axios
            .post("/api/GetAOI_Coating", {
                strplantcode: FAC,
                strsheetno: txtSheetNo,
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

        }catch{

        }




    }
    const btnRetrive = () =>{

    }
    const btnClear =() =>{

    }

  return {

  }
}

export{fn_rpt_SheetTraceView}