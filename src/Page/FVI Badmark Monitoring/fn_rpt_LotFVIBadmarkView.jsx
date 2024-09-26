import React, { useRef, useEffect, useState } from "react";
import axios from "axios";

function fn_rpt_LotFVIBadmarkView() {

    const [selectedValue, setSelectedValue] = useState("");
    const [rbtLot, setrbtLot] = useState(true);
    const [rbtSheet, setrbtSheet] = useState(false);
    const [txtBarcode, settxtBarcode] = useState({ value: "",disbled: "",style: {},});
    const [lblProduct, setlblProduct] = useState({ value: "",disbled: "",style: {},});
    const [lblNo, setlblNo] = useState({ value: "",disbled: "",style: {},});
    // Focus
    const fntxtBarcode =  useRef([])
    const FAC = import.meta.env.VITE_FAC;
    const params = new URLSearchParams(window.location.search);
    const TYPE = params.get("TYPE");
    const NO = params.get("NO");
    
    const [hfDefaultColor,sethfDefaultColor]=useState("#00CCFF");
    const [hfOKColor,sethfOKColor]=useState("Green");
    const [hfNGColor,sethfNGColor]=useState("Yellow");
    const [hfSerialError,sethfSerialError]=useState("ERROR");
    const [hfFontSize,sethfFontSize]=useState("14px");
    const [hfPCSSize,sethfPCSSize]=useState("27px");
    const [hfBarcodeType,sethfBarcodeType]=useState("TSIP");
    const [hfBadmarkRate,sethfBadmarkRate]=useState("-8");
    const [hfX,sethfX]=useState("");
    const [hfY,sethfY]=useState("");
    const [hfPCSNO,sethfPCSNO]=useState("");
    const [hfColor,sethfColor]=useState("");

    useEffect(() => {
        if(TYPE !== "" && TYPE != null ){  
          console.log("เข้าได้ไง")   
          if (TYPE === 'LOT') {
          setrbtLot(true);  
          setrbtSheet(false); 
        } else {
          setrbtLot(false); 
          setrbtSheet(true); 
        }
      }
   
        if(NO !== "" && NO !== null ){
          console.log("เข้าได้ไง")
          lblNo_useEffect();
        }
        // txtBarcode.Focus()
      }, [])
      const lblNo_useEffect = async () =>{
        let Product =""
        setlblNo((prevState) => ({ ...prevState, value: NO }));
        let dtProduct =[];
        let dtResult =[];
        console.log(rbtLot,"rbtLot")
        if(rbtLot == true){
          console.log(rbtLot,"OKLLK",NO) 
          sethfBarcodeType("LOT")
            await axios.post("/api/Common/fnGetLotData", {
              LOT: NO,
            })
            .then((res) => {
                dtProduct = res.data; 
              
            });
            if(dtProduct.length > 0){
              console.log(dtProduct.length,"dtProduct")
                setlblProduct((prevState) => ({ ...prevState, value: dtProduct[0].LOT_PRD_NAME }));
               
                await axios
                .post("/api/Common/GetFVIBadmarkResultByLot", {
                    _strPrdName: dtProduct[0].LOT_PRD_NAME,
                    _strLotNo:NO,
                    _strRate:hfBadmarkRate,

                })
                .then((res) => {
                  console.log(res.data,"dtResult")
                    dtResult = res.data; 
                    
                });
                
            }
        }else{
        
          sethfBarcodeType("SHT")
            await axios.post("/api/GetSMTConnectShtPcsProduct", {
              dataList:{
                _strPlantCode: FAC,
                _strSheetNo:NO}
                })
                .then((res) => {
                  Product =res.data.product
                    setlblProduct((prevState) => ({ ...prevState, value: res.data.product }));
                }); 

                
                await axios
                .post("/api/GetFVIBadmarkResultBySheet", {
                  dataList: {
                    _strPlantCode:FAC ,
                    _strPrdName: Product,
                    _strShippingNo: NO
                  }
                })
                .then((res) => {
                  dtResult= res.data[0]
                });
        }
        showResult(dtResult);
      };
      const handleRadioChange = (event) => {
        const { value } = event.target;
        if (value === 'rbtLot') {
          sethfBarcodeType("LOT")
          setrbtLot(true); 
          setrbtSheet(false); 
        } else if (value === 'rbtSheet') {
          sethfBarcodeType("SHT")
          setrbtLot(false); 
          setrbtSheet(true); 
        }
      };

      const showResult = (dtResult) => {
        
        console.log(dtResult.DATA_ROW,dtResult.DATA_COLUMN)
        if (dtResult.length > 0){
          let intDataRow = dtResult[0].DATA_ROW
          let intDataColumn = dtResult[0].DATA_COLUMN
          let intTypeColumn = 1
          let intData = 0
          let intBarcode = 0
         for (let intRow = 1 ; intRow < intDataRow ; intRow++){
          for (let intCol = 1 ;intCol < intDataColumn;intCol++){
            ///////////////
          }
         }
        }
      
      };
    const txtBarcode_TextChanged = async () => {
        if(txtBarcode.value.trim().length > 0){
            setlblNo((prevState) => ({ ...prevState, value: txtBarcode.value.trim().toUpperCase() }));
            let dtProduct =[]
            let dtResult=[]
            if(rbtLot == 'rbtLot'){
              sethfBarcodeType("LOT")
              await axios
              .post("/api/Common/fnGetLotData", {
                LOT: NO,
              })
              .then((res) => {
                  dtProduct = res.data[0]; 
              });
              if(dtProduct.length > 0){
                setlblProduct((prevState) => ({ ...prevState, value: dtProduct }));
              }
            }

        }
        settxtBarcode((prevState) => ({ ...prevState, value: "" }));
        setTimeout(() => {
            fntxtBarcode.current.focus();
          }, 300);
     
      };
      const btnHidden = async() =>{
        console.log("OK")
        let dtProduct = [];
        let dtResult =[];
        let dtSheet=[];
        let strFrontSheet ="";
        let strBackSheet="";
        let strOstResult ="";
        let strAoiResult ="";
        if(hfBarcodeType == 'LOT'){
          await axios
          .post("/api/Common/GetFVIBadmarkResultByLot", {
              _strPrdName: lblProduct.value,
              _strLotNo:NO,
              _strRate:hfBadmarkRate,

          })
          .then((res) => {
              dtResult = res.data[0]; 
            
          });
          await axios
          .post("/api/GetFVIBadmarkSheetByLot", {
            _strPlantCode: FAC,
            strPrdName: lblProduct.value,
            strLot:NO,
            StrX:hfX,
            StrY:hfY

          })
          .then((res) => {
            dtSheet = res.data; 
          });
          
        }else{
          

          await axios
          .post("/api/GetFVIBadmarkResultBySheet", {
            dataList:{
              _strPlantCode: FAC,
              strPrdName: lblProduct.value,
              _strShippingNo:NO,
              _Rate:hfBadmarkRate
            }

          })
          .then((res) => {
              dtResult = res.data; 
              console.log(dtResult,"OKLKLKL")
          });
          await axios
          .post("/api/GetFVIBadmarkSheetByLot", {
          
            strPlantCode: FAC,
            strPrdName: lblProduct.value,
            strLot:NO,
            StrX:hfX,
            StrY:hfY
           
          })
          .then((res) => {
            dtSheet = res.data; 
          });
        }
        for (let drRow = 0; drRow < dtSheet.length;drRow++){
          strFrontSheet = dtSheet[drRow].FRONT_SHEET_NO
          strBackSheet = dtSheet[drRow].BACK_SHEET_NO
          let dtOstData = [];
          let dtAoiData = [];
          await axios
          .post("/api/GetSerialOSTResult", {
          
            SerialNo: strFrontSheet,
            intPCSNo: parseInt(dtSheet[drRow].CONN_SHT_PCS_NO),
            strSMPJCavityFlg:"N"
           
          })
          .then((res) => {
            dtOstData = res.data; 
          });
          if(dtOstData.length > 0){
            strOstResult = dtOstData.OST_RESULT.trim().toUpperCase()
          }
          if((strOstResult =='GOOD' || strOstResult == 'OK' || strOstResult == 'PASS' || strOstResult == "" )&& (strFrontSheet !== strBackSheet) && strBackSheet !== ""){
            await axios
            .post("/api/GetSerialOSTResult", {
            
              SerialNo: strFrontSheet,
              intPCSNo: parseInt(dtSheet[drRow].CONN_SHT_PCS_NO),
              strSMPJCavityFlg:"N"
             
            })
            .then((res) => {
              dtOstData = res.data; 
            });
            if(dtOstData.length > 0){
              strOstResult = dtOstData.OST_RESULT.trim().toUpperCase()
            }
          }
          if(strOstResult == 'GOOD' || strOstResult == 'OK' || strOstResult =='PASS' || strOstResult == ''){
            await axios
            .post("/api/GetSerialAOIEFPCResult", {
            
              _strPlantCode: FAC,
              _strFrontSheetNo:strFrontSheet ,
              _intPcsNo:parseInt(dtSheet[drRow].CONN_SHT_PCS_NO),
              _strProduct:lblProduct.value,
              _strSMPJCavityFlg:"N"

             
            })
            .then((res) => {
              dtAoiData = res.data; 
            });
             if(dtAoiData.length > 0){
              strAoiResult = dtAoiData.AOI_RESULT
              }
             if((strAoiResult == "GOOD" || strAoiResult =="OK" || strAoiResult == "PASS" || strAoiResult == "")&& strFrontSheet !== strBackSheet && strBackSheet !== "" ){
                 await axios
                  .post("/api/GetSerialAOIEFPCResult", {
                  
                    _strPlantCode: FAC,
                    _strFrontSheetNo:strFrontSheet ,
                    _intPcsNo:parseInt(dtSheet[drRow].CONN_SHT_PCS_NO),
                    _strProduct:lblProduct.value,
                    _strSMPJCavityFlg:"N"

                  
                  })
                  .then((res) => {
                    dtAoiData = res.data; 
                  });
                      if(dtAoiData.length > 0){
                        strAoiResult =  dtAoiData.AOI_RESULT
                        if( strAoiResult !== "GOOD"  && strAoiResult !== "OK" && strAoiResult !== "PASS" && strAoiResult !== ""){
                          dtAoiData.AOI_RESULT = strAoiResult
                        }
                      }

            }
          }else{
            dtAoiData.OST_RESULT = strOstResult
          }
        }
        showResult(dtResult);
        showResultLink(dtSheet)
      }
      const showResultLink  = () =>{

      }

  return{
selectedValue,handleRadioChange,rbtLot,rbtSheet,btnHidden
  }
}

export{fn_rpt_LotFVIBadmarkView}