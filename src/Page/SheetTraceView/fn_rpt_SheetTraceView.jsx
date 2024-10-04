import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { values } from "lodash";
import { color } from "framer-motion";

function fn_rpt_SheetTraceView() {
    const[txtSheetNo,settxtSheetNo] =useState("")
    const[txtProduct,settxtProduct] =useState("")
    const[ddlCavity,setddlCavity] =useState({ text: "",value:[]})
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
            ViewData()
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
            .post("/api/ViewTraceSheet/GetLotSheet", {
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
            .post("/api/ViewTraceSheet/GetProductSheet", {
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
            .post("/api/ViewTraceSheet/GetSPI", {
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
            .post("/api/ViewTraceSheet/GetPreAOI", {
                dataList:{strplantcode: FAC,
                strsheetno: txtSheetNo,}
                
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
            .post("/api/ViewTraceSheet/GetAOI", {
                dataList:{plantcode: FAC,
                sheetno: txtSheetNo,}
                
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
            await axios
            .post("/api/ViewTraceSheet/Get_LOT_SHEET_SERIAL", {
             dataList:{
                plantcode: FAC,
                sheetno: txtSheetNo,
                }
                
            })
            .then((res) => {
                dt = res.data;
            });
            if(dt.length >0){
                //527
                // Me.tblData1.Visible = True
                // Me.tblData1.Rows.Clear()
                // Dim wkRowHead As New Web.UI.WebControls.TableHeaderRow
                // Dim ArryTitle0() As String = {"PIECE1", "PIECE2", "PIECE3", "PIECE4", "PIECE5"}
                // wkRowHead.CssClass = "tablehead"
                // For Each wkTitle As String In ArryTitle0
                //     Dim wkCell As New Web.UI.WebControls.TableCell
                //     wkCell.HorizontalAlign = HorizontalAlign.Center
                //     wkCell.Wrap = False
                //     wkCell.Text = wkTitle
                //     wkRowHead.Cells.Add(wkCell)
                // Next
                //538
            let StrSerial;
            for(let introw =0;introw < dt.length;introw++){
               //543 ReDim Preserve StrSerial(introw)
               StrSerial(introw) = dt[introw].lss_serial_no
            }
            let MaxCount = dt.length;
            let DataCount = 0;
            let ColCount = 0;
            let RowCount = 0;
            let ExitFlg = false
            while (!ExitFlg) {
                RowCount=RowCount + 1;
                let rowCells = [];
                let rowClass = "tabledata" + (RowCount % 2);
    
                while (true) {
                    let strParameter = StrSerial[DataCount];
                    const strSpecial = "+";
    
                    // ถ้าพบ '+' ให้แทนที่ด้วย '%2B'
                    if (StrSerial[DataCount].includes(strSpecial)) {
                        strParameter = strParameter.replace(strSpecial, "%2B");
                    }
    
                    // สร้างลิงก์ใน cell
                    rowCells.push(
                        <td key={DataCount}>
                            <a href={`./rpt_PieceTraceView.aspx?SERIAL=${strParameter}`}>
                                {StrSerial[dataCount]}
                            </a>
                        </td>
                    );
    
                    DataCount =DataCount + 1;
                    ColCount += 1;
    
                    if (DataCount >= MaxCount) {
                        tableRows.push(<tr className={rowClass} key={rowCount}>{rowCells}</tr>);
                        setExitFlag(true);
                        break;
                    }
    
                    if (ColCount === MaxCount) {
                        tableRows.push(<tr className={rowClass} key={rowCount}>{rowCells}</tr>);
                        ColCount = 0;
                        break;
                    }
                }
            }
    
            return tableRows;
            }
            await axios
            .post("/api/ViewTraceSheet/GetXray", {
             dataList:{
                sheetno: txtSheetNo,
                }
            })
            .then((res) => {
                dt = res.data;
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
            await axios
            .post("/api/ViewTraceSheet/GetFPCSMPJPcsCavity", {
                strPrdName: txtProduct.toUpperCase(),
            })
            .then((res) => {
                dtSMPJ = res.data;
            });
            // Dim dtPcsNo As DataTable = BIZ_ScanSMTSerial.GetSMTConnectShtPcsCavity(Session("PLANT_CODE"), Session("PRODUCT_KIND"), txtProduct.Text.ToUpper)
      
            setddlCavity((prevState) => ({...prevState,text:res.data[0].PCS_NAME,value:res.data[0].PCS_NO}));
            if(dtSMPJ.length > 1){
                setlblCavity((prevState) => ({...prevState,value:'SMPJ Cavity'}));
                setdtddlCavity(dtSMPJ)
                sethfSMPJCavityFlg("Y")
            }else{
                setlblCavity((prevState) => ({...prevState,value:'Connect Sht&Pcs'}));
                setdtddlCavity(dtPcsNo)
                sethfSMPJCavityFlg("N")
            }
            setdtddlCavity([])
            setselectddlCavity()
            if(txtSheetNo.trim() !== '' && txtProduct.trim() !== ""){
                let dtData = []
                //757 มิ้วทำ
                //  dtData = BIZ_ScanSMTSerial.GetSerialAOMEFPCResult(Session("PLANT_CODE"), Session("PRODUCT_KIND"), txtSheetNo.Text.Trim.ToUpper, ddlCavity.SelectedValue, txtProduct.Text.Trim.ToUpper, hfSMPJCavityFlg.Value)
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
               // dtData = BIZ_ScanSMTSerial.GetSerialAVIBadmarkResult(Session("PLANT_CODE"), txtSheetNo.Text.Trim.ToUpper, ddlCavity.SelectedValue, hfSMPJCavityFlg.Value, Session("PRODUCT_KIND"))
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
                //Table จริงไม่มีข้อมูล
                // Dim dtReflow As DataTable = BIZ_ScanSMTSerial.GetSMTSheetReflowResult(Session("plant_code"), txtSheetNo.Text.Trim.ToUpper, Session("PRODUCT_KIND"))
                let dtReflow=[];
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
            setlblMessage("ERROR")
        }




    }
    const  btnSPI_Click= () =>{
        if(txtSPICnt !== ""){
            localStorage.setItem("SHEET_NO", txtSheetNo);
            localStorage.setItem("PRODUCT_NAME", txtProduct);
            localStorage.setItem("PANEL_NO", "");
            window.location.href = '/SPI_Result';
        }else{
            setlblMessage("Please input SerialNo and click Retrive.")
        }

    }
    const btnClear =() =>{
        Clear_View();
    }
    const btnRetrive =() =>{
        localStorage.setItem("SHEET_NO", txtSheetNo);
        Clear_View()
        settxtSheetNo(txtSheetNo.trim().toUpperCase())
        settxtProduct("");
        sethypLotNo("");
        sethypLotNoUrl("")
        ViewData()

    }
    const btnPre_Click =() =>{
        if(TxtPreCnt !== ""){
            localStorage.setItem("SHEET_NO", txtSheetNo);
            localStorage.setItem("PRODUCT_NAME", txtProduct);
            localStorage.setItem("PIECE_NO", "");
            window.location.href = '/PRE_Result2';
        }
    }
    const btnOST_Click =() =>{
        if(txtSheetNo !== ""){
            localStorage.setItem("SHEET_NO", txtSheetNo);
            localStorage.setItem("PRODUCT_NAME", txtProduct);
            localStorage.setItem("PANEL_NO", "");
            window.location.href = '/OST_Result';
        }else{
            setlblMessage("Please input SerialNo and click Retrive.")
        }
    }
    const btnAOI_Click =() =>{
        if(txtAOICnt !== ""){
            localStorage.setItem("SHEET_NO", txtSheetNo);
            localStorage.setItem("PRODUCT_NAME", txtProduct);
            localStorage.setItem("PANEL_NO", "");
            window.location.href = '/AOI_Result2';
        }
    }
    const btnXRay_Click =() =>{
        localStorage.setItem("LOT_NO", hypLotNo.trim().toUpperCase());
        localStorage.setItem("SHEET_NO", txtSheetNo.trim().toUpperCase());
        localStorage.setItem("PRODUCT_NAME", txtProduct);
        localStorage.setItem("SERIAL_NO", "0");
        localStorage.setItem("INSPECT_NO", txtXRayCnt);
        localStorage.setItem("INSPECT_DATE", txtXRayTime);
        if(SERIAL_DATABASE_SWITCH == "1"){
            window.location.href = 'XRay_Result_N1.aspx';
        }else{
            window.location.href = 'XRay_Result.aspx';
        }
    }
    const btnAOICOA_Click =() =>{
        if(txtAOICOACnt !== "")
        {
            localStorage.setItem("SHEET_NO", txtSheetNo);
            localStorage.setItem("PRODUCT_NAME",txtProduct);
            localStorage.setItem("PANEL_NO", "");
            window.location.href = 'AOI_COA_Result2.aspx';  
     }
      
       
            
       
    }
    const ddlCavity_SelectedIndexChanged =() =>{
        if(txtSheetNo.trim() !== "")
        {    
            Clear_View()
            if(selectddlCavity > 0){
                ViewDataPcs()
            }else{
                ViewData()
            }
            
     }
      
       
            
       
    }
    const ViewDataPcs =async()=>{
        let intPcsNo =0
        if(hfSMPJCavityFlg == "Y"){
            //1048
            //ยังไม่ทำ
           // intPcsNo = BIZ_ScanSMTSerial.GetFPCPcsNoBySMPJCavity(txtProduct.Text, ddlCavity.SelectedValue)
        }else{
            intPcsNo = selectddlCavity
        }
        if( intPcsNo > 0){
            setlblMessage("")
            let DBOpenFlg = false
            let dt = [];
            let i;
            let StrResult ="";
            let ELT_Count = 0;
            if(txtSheetNo.trim() !=="" && txtProduct.trim() !== ""){
                let dtData = []
                //ยังไม่ทำ
                //1071
                //dtData = BIZ_ScanSMTSerial.GetSerialAOMEFPCResult(Session("PLANT_CODE"), Session("PRODUCT_KIND"), txtSheetNo.Text.Trim.ToUpper, ddlCavity.SelectedValue, txtProduct.Text.Trim.ToUpper, hfSMPJCavityFlg.Value)
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
                //ยังไม่ทำ
                // 1150
                // dtData = BIZ_ScanSMTSerial.GetSerialAVIBadmarkResult(Session("PLANT_CODE"), txtSheetNo.Text.Trim.ToUpper, ddlCavity.SelectedValue, hfSMPJCavityFlg.Value, Session("PRODUCT_KIND"))

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
            //     If dt.Rows.Count = 0 Then
            //     sbSql.Clear()
            //     sbSql.AppendLine(" select")
            //     sbSql.AppendLine(" SPR_RESULT,")
            //     sbSql.AppendLine(" SPR_INS_COUNT,")
            //     sbSql.AppendLine(" TO_CHAR(SPR_INSPECT_DATE,'DD/MM/YYYY HH24:MI:SS'),")
            //     sbSql.AppendLine(" SPR_MACHINE_NAME ")
            //     sbSql.AppendLine(" from")
            //     sbSql.AppendLine(" SMT_SPI_RSLT")
            //     sbSql.AppendLine(" where")
            //     sbSql.AppendLine(" SPR_PLANT_CODE = '" & Session("plant_code") & "' and ")
            //     sbSql.AppendLine(" SPR_SHEET_NO = '" & txtSheetNo.Text.Trim.ToUpper & "' and ")
            //     If SPI_Maker = "CKD" Then
            //         PanelNo = Trim(CStr(intPcsNo - 1))
            //     Else
            //         PanelNo = intPcsNo.ToString
            //     End If
            //     sbSql.AppendLine(" SPR_PANEL = " & PanelNo & "")
            //     dt = clsDB.GetDataTable(sbSql.ToString)
            // End If
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
            
           }

        } catch (error) {
                
            }
        }
        
    }

  return {

  }
}

export{fn_rpt_SheetTraceView}