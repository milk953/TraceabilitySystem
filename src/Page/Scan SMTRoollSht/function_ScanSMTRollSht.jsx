import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Fn_ScanSMTRollSht() {
  const [txt_lotNo, settxt_lotNo] = useState("");
  const [sl_Product, setsl_Product] = useState("");
  const [Product, setProduct] = useState([]);
  const [lbllog, setlbllog] = useState("");
  const [visblelog, setvisblelog] = useState(false); //falseซ่อน true โชว์
  const [gvScanResult, setgvScanResult] = useState('none');
  const [txtRollLeaf, settxtRollLeaf] = useState("");
  const [txtTotalLeaf, settxtTotalLeaf] = useState("");
  const [txtOperator, setOperator] = useState("");
  const [lblCheckRoll, setlblCheckRoll] = useState("");
  const [lbltotalSht, setlbltotalSht] = useState("");
  const [Mode, SetMode] = useState("");
  const [GvSerial, SetGvSerial] = useState("none");
  const [txtLeafNo, SettxtLeafNo]= useState(Array(txtTotalLeaf).fill(''));
  // --------------------------------------
  const [hfUserID, setHfUserID] = useState("");
  const [hfUserStation, setHfUserStation] = useState("");
  const [hfUserFactory, setHfUserFactory] = useState("");
  const [hfSerialLength, setHfSerialLength] = useState("");
  const [hfSerialFixFlag, setHfSerialFixFlag] = useState("");
  const [hfSerialDigit, setHfSerialDigit] = useState("");
  const [hfSerialStartDigit, setHfSerialStartDigit] = useState("");
  const [hfSerialEndDigit, setHfSerialEndDigit] = useState("");
  const [hfTrayFlag, setHfTrayFlag] = useState("");
  const [hfTrayLength, setHfTrayLength] = useState("");
  const [hfTestResultFlag, setHfTestResultFlag] = useState("");
  const [hfSerialCount, setHfSerialCount] = useState([]);
  const [hfAutoScan, setHfAutoScan] = useState("");
  const [hfMode, setHfMode] = useState("");
  const [hfConfigCheck, setHfConfigCheck] = useState("");
  const [hfConfigCode, setHfConfigCode] = useState("");
  const [hfConfigStart, setHfConfigStart] = useState("");
  const [hfConfigEnd, setHfConfigEnd] = useState("");
  const [hfConfigRuning, setHfConfigRuning] = useState("");
  const [hfDuplicateStart, setHfDuplicateStart] = useState("");
  const [hfDuplicateEnd, setHfDuplicateEnd] = useState("");
  const [hfChipIDCheck, setHfChipIDCheck] = useState("");
  const [hfCheckPrdSht, setHfCheckPrdSht] = useState("");
  const [hfCheckPrdShtStart, setHfCheckPrdShtStart] = useState("");
  const [hfCheckPrdShtEnd, setHfCheckPrdShtEnd] = useState("");
  const [hfCheckPrdAbbr, setHfCheckPrdAbbr] = useState("");
  const [hfPlasmaCheck, setHfPlasmaCheck] = useState("");
  const [hfPlasmaTime, setHfPlasmaTime] = useState("");
  const [hfCheckStartSeq, setHfCheckStartSeq] = useState("");
  const [hfCheckStartSeqCode, setHfCheckStartSeqCode] = useState("");
  const [hfCheckStartSeqStart, setHfCheckStartSeqStart] = useState("");
  const [hfCheckStartSeqEnd, setHfCheckStartSeqEnd] = useState("");
  const [hfCheckLotSht, setHfCheckLotSht] = useState("");
  const [hfCheckLotShtStart, setHfCheckLotShtStart] = useState("");
  const [hfCheckLotShtEnd, setHfCheckLotShtEnd] = useState("");
  const [hfProduct, setHfProduct] = useState("");
  const [hfLot, setHfLot] = useState("");
  const [hfIPAddress, setHfIPAddress] = useState("");
  const [hfRefreshTime, setHfRefreshTime] = useState("");
  const [hfScanResult, setHfScanResult] = useState("");
  const [hfRollNo, setHfRollNo] = useState("");
  const [hfConnRollLeafFlg, setHfConnRollLeafFlg] = useState("");
  const [hfConnRollLength, setHfConnRollLength] = useState("");
  const [hfConnLeafLength, setHfConnLeafLength] = useState("");
  const [hfAutoDownload, setHfAutoDownload] = useState("");
  const [hfCheckDateInProc, setHfCheckDateInProc] = useState("");
  const [hfDateInProc, setHfDateInProc] = useState("");
  const [hfCheckWeekCode, setHfCheckWeekCode] = useState("");
  const [hfCheckWeekCodeStart, setHfCheckWeekCodeStart] = useState("");
  const [hfCheckWeekCodeEnd, setHfCheckWeekCodeEnd] = useState("");
  const [hfWeekCodeType, setHfWeekCodeType] = useState("");
  const [hfWeekCode, setHfWeekCode] = useState("");
  const [hfLeafScan, setHfLeafScan] = useState("");
  const [hfLeafSerialFlg, setHfLeafSerialFlg] = useState("");
  const [hfCheckRollPrdFlg, setHfCheckRollPrdFlg] = useState("");
  const [hfCheckRollPrdStart, setHfCheckRollPrdStart] = useState("");
  const [hfCheckRollPrdEnd, setHfCheckRollPrdEnd] = useState("");
  const [hfCheckRollPrd, setHfCheckRollPrd] = useState("");
  const [hfRollNoStart, setHfRollNoStart] = useState("");
  const [hfRollNoEnd, setHfRollNoEnd] = useState("");
  const [hfSerialStartCode, setHfSerialStartCode] = useState("");
  const [hfSerialInfo, setHfSerialInfo] = useState("");
  // --------------------------------------
  useEffect(() => {
    getProduct();
  }, []);
  const handleLotxt_Lotno = () => {
    setlbllog("")
    setvisblelog(false)
    SetGvSerial('none')
    setgvScanResult('none')
    let strPrdName = "";
    let RollNo = "";
    let strLot = "";

    const strLotData = txt_lotNo.toUpperCase().split(";");
    strLot = strLotData[0];
    console.log("LotNo", txt_lotNo, " ", strLot);
    axios
      .post("/api/getLot", {
        txt_lotno: strLot,
      })
      .then((res) => {
        // SetGvSerial('')
        
        // console.log("GetProductDataByLot",res.data)
        if (res.data.length > 0) {
          SetGvSerial('')
          strPrdName = res.data.flat()[0];
          RollNo = res.data.flat()[1];
           console.log("strPrdName1",strPrdName,"xxx",RollNo,"yyy")
          setHfRollNo(RollNo);
          if (strPrdName != "") {
       
            setlbllog("");
            setvisblelog(false);
            settxt_lotNo(strLot);
            if (RollNo == " ") {
              // console.log("strPrdName2")
              setHfRollNo(strPrdName);
            }
            const intProduct = strPrdName.indexOf("-", 12);
            console.log(intProduct, "intProduct", strPrdName);
            try {
              console.log("try");
              setsl_Product(strPrdName);
              getProductSerialMaster(strPrdName);
              // getInitialSheet()
              // SetMode("ROLL")
            } catch (error) {
              console.log("Catch");
              // console.error("Error during login:", error);
              const intProduct = strPrdName.indexOf("-", 12);
              //มีทำต่ออีกนิดหน่อย ยังไม่ได้เขียน May
            
            
            }
            axios
              .post("/api/GetRollLeafTotalByLot", {
                LotNo: strLot,
              })
              .then((res) => {
                console.log(res.data,'ROLL_LEAF')
                setlbltotalSht(res.data[0].ROLL_LEAF);
              });
          }
        
        }
        else{
          // If ddlProduct.Items.Count > 0 Then
          // ddlProduct.SelectedIndex = 0
          // End If
          settxt_lotNo("")
          setlbllog("Invalid lot no.")
          setvisblelog(true)
          // hfMode.Value = "LOT"
          // fnSetFocus("txtLot")
        }
      });
  };

  const getProduct = () => {
    axios.post("/api/getProduct").then((res) => {
      console.log(res.data, "getPD");
       setProduct(res.data);
    });
  };
  const StyleDisabled = (disabled) => disabled;

  const StyleEneble = (Eneble) => {
    if ((Eneble = true)) {
      return {
        backgroundColor: "lightgray",
        color: "black",
      };
    } else {
      return {};
    }
  };

  // const StyleCheckRoll = (Check) => {
    
  //   if (Check == 'ON'){
  //     return {
  //       backgroundColor: "green",
  //       color: "black",
  //     };
  //   } else if (Check=='OFF'){
  //     return {
  //       backgroundColor: "red",
  //       color: "white",
  //     };
  //   }
  //   else {
  //     return {
  //       backgroundColor: "",
  //     };
  //   }
  // };

 
  const getProductSerialMaster = (strPrdName) => {
    // setHfSerialLength(0)
    // setHfSerialFixFlag('N')
    // setHfSerialDigit("")
    // setHfSerialStartDigit(0)
    // setHfSerialEndDigit(0)
    // setHfTrayFlag("")
    // setHfTrayLength(0)
    // setHfTestResultFlag("")
    // setHfConfigCheck('N')
    // setHfConfigCode("")
    // setHfConfigStart(0)
    // setHfConfigEnd(0)
    // setHfConfigRuning('N')
    // setHfDuplicateStart(0)
    // setHfDuplicateEnd(0)
    // setHfChipIDCheck('N')
    // setHfCheckPrdSht('N')
    // setHfCheckPrdShtStart(0)
    // setHfCheckPrdShtEnd(0)
    // setHfCheckPrdAbbr("")
    // setHfPlasmaCheck('N')
    // setHfPlasmaTime(0)
    // setHfCheckLotSht('N')
    // setHfCheckLotShtStart(0)
    // setHfCheckLotShtEnd(0)

    // setHfCheckStartSeq('N')
    // setHfCheckStartSeqCode("")
    // setHfCheckStartSeqStart(0)
    // setHfCheckStartSeqEnd(0)
    // setHfConnRollLeafFlg('N')
    // setHfConnRollLength(0)
    // setHfConnLeafLength(0)

    // setHfCheckDateInProc('N')
    // setHfDateInProc("")
    // setHfCheckWeekCode('N')
    // setHfCheckWeekCodeStart("")
    // setHfCheckWeekCodeEnd("")
    // setHfWeekCode("")
    // setHfWeekCodeType("")

    // setHfLeafScan(0)
    // setHfLeafSerialFlg('N')
    // setHfCheckRollPrdFlg('N')
    // setHfCheckRollPrdStart(0)
    // setHfCheckRollPrdEnd(0)
    // setHfCheckRollPrd("")
    // setHfSerialStartCode("")
    axios
      .post("/api/GetSerialProductByProduct", {
        strPrdName: strPrdName, //'strPrdName' ,
      })
      .then((res) => {
        console.log(res.data, "GetSPBPD1");
        let data = res.data;
        // console.log(data[PRM_ABBR],"GetSPBPD2")
        if (data.length > 0) {
          console.log("data3", data[0]);
          //HF
            setHfSerialCount([data[0].SLM_SERIAL_COUNT])
          //---
          settxtTotalLeaf(data[0].PRM_CONN_ROLL_LEAF_SCAN);
          
          if (data[0].PRM_CONN_ROLL_PRD_FLG.toUpperCase == "Y") {
            setlblCheckRoll("ON");
            
            //StyleCheckRoll("ON")
          } else {
            setlblCheckRoll("OFF");
            //StyleCheckRoll("OFF")
          }
        }
      });
  };
  // const SetMode = (mode) => {
  //   switch (mode) {
  //     case "LOT":
  //       settxt_lotNo("");
  //       StyleDisabled(true);
  //       StyleEneble(true);

  //     case "LOT_ERROR":
  //       // สร้างโค้ดสำหรับแต่ละ case ตามต้องการ
  //       break;
  //     case "OP":
  //       // สร้างโค้ดสำหรับแต่ละ case ตามต้องการ
  //       break;
  //     case "ROLL":
  //       // สร้างโค้ดสำหรับแต่ละ case ตามต้องการ
  //       break;
  //     case "SHEET":
  //       // สร้างโค้ดสำหรับแต่ละ case ตามต้องการ
  //       break;
  //     case "SHEET_ERROR":
  //       // สร้างโค้ดสำหรับแต่ละ case ตามต้องการ
  //       break;
  //     case "SHEET_OK":
  //       // สร้างโค้ดสำหรับแต่ละ case ตามต้องการ
  //       break;
  //     case "SHEET_NG":
  //       // สร้างโค้ดสำหรับแต่ละ case ตามต้องการ
  //       break;
  //     default:
  //       break;
  //   }
  // }

  const HandleSL_Product = (PD) => {
    setsl_Product(PD)
    console.log(PD, "Pd");
    if (txt_lotNo != "") {
      setlbllog("");
      setvisblelog(false);
    }
  };

  const Bt_Save = () => {
    setgvScanResult('')
   if(hfMode==save){
    // setgvScanResult('')
    //   setRollSheetData()

   }
  };

  const setRollSheetData = () => {
    let _strFileError  = ""
    // let dtSheet  = getInputSheet()
    let _bolPrdError = false
    let _bolError = false
    let _strScanResultAll  = "OK"
    let _intCount = 0
    let _intRow = 0
    let _strLot  = ""

    // Dim _strRollLeaf As String = txtRollLeaf.Text.Trim.ToUpper
    setvisblelog(false)
    setlbllog('')

    if(hfConnRollLength == txtRollLeaf){
    //  if(txtOperator!=''){
    //   axios
    //   .post("/api/GetRollLeafDuplicate", {
    //     strPrdName: strPrdName, //'strPrdName' ,
    //   })
    //   .then((res) => {})
    //  }

    if(hfCheckRollPrdFlg=='Y' &&  _bolError != false ){
      _bolError=true
      // for 
    }
    }



   };
   const handleTextFieldChange = (index, event) => {
    const newData = [...txtLeafNo];
    newData[index] = event.target.value;
    SettxtLeafNo(newData);
  };



  return {
    settxt_lotNo,
    txt_lotNo,
    handleLotxt_Lotno,
    sl_Product,
    Product,
    StyleEneble,
    StyleDisabled,
    HandleSL_Product,
    lbllog,
    visblelog,
    settxtRollLeaf,
    txtRollLeaf,
    gvScanResult,
    txtTotalLeaf,
    settxtTotalLeaf,
    lblCheckRoll,
    lbltotalSht,
    // StyleCheckRoll
    GvSerial,
    hfSerialCount,
    Bt_Save,
    txtOperator,
    hfRollNo,
    SettxtLeafNo,
    txtLeafNo,
   handleTextFieldChange 
    
  };
}

export { Fn_ScanSMTRollSht };
