import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function fn_ConfirmBarcodeGrade() {
  const [txt_lotNo, settxt_lotNo] = useState("");
 
  // --------------------------------------
  useEffect(() => {
    
  }, []);
  // const handleLotxt_Lotno = () => {
  //   setlbllog("")
  //   setvisblelog(false)
  //   SetGvSerial('none')
  //   setgvScanResult('none')
  //   let strPrdName = "";
  //   let RollNo = "";
  //   let strLot = "";

  //   const strLotData = txt_lotNo.toUpperCase().split(";");
  //   strLot = strLotData[0];
  //   console.log("LotNo", txt_lotNo, " ", strLot);
  //   axios
  //     .post("/api/getLot", {
  //       txt_lotno: strLot,
  //     })
  //     .then((res) => {
  //       // SetGvSerial('')
        
  //       // console.log("GetProductDataByLot",res.data)
  //       if (res.data.length > 0) {
  //         SetGvSerial('')
  //         strPrdName = res.data.flat()[0];
  //         RollNo = res.data.flat()[1];
  //          console.log("strPrdName1",strPrdName,"xxx",RollNo,"yyy")
  //         setHfRollNo(RollNo);
  //         if (strPrdName != "") {
       
  //           setlbllog("");
  //           setvisblelog(false);
  //           settxt_lotNo(strLot);
  //           if (RollNo == " ") {
  //             // console.log("strPrdName2")
  //             setHfRollNo(strPrdName);
  //           }
  //           const intProduct = strPrdName.indexOf("-", 12);
  //           console.log(intProduct, "intProduct", strPrdName);
  //           try {
  //             console.log("try");
  //             setsl_Product(strPrdName);
  //             getProductSerialMaster(strPrdName);
  //             // getInitialSheet()
  //             // SetMode("ROLL")
  //           } catch (error) {
  //             console.log("Catch");
  //             // console.error("Error during login:", error);
  //             const intProduct = strPrdName.indexOf("-", 12);
  //             //มีทำต่ออีกนิดหน่อย ยังไม่ได้เขียน May
            
            
  //           }
  //           axios
  //             .post("/api/GetRollLeafTotalByLot", {
  //               LotNo: strLot,
  //             })
  //             .then((res) => {
  //               console.log(res.data,'ROLL_LEAF')
  //               setlbltotalSht(res.data[0].ROLL_LEAF);
  //             });
  //         }
        
  //       }
  //       else{
  //         // If ddlProduct.Items.Count > 0 Then
  //         // ddlProduct.SelectedIndex = 0
  //         // End If
  //         settxt_lotNo("")
  //         setlbllog("Invalid lot no.")
  //         setvisblelog(true)
  //         // hfMode.Value = "LOT"
  //         // fnSetFocus("txtLot")
  //       }
  //     });
  // };

   
  const getProduct = () => {
  
  };
 

 
  const handleLotxt_Lotno = () => {
   
  };

  
  



  return {
    settxt_lotNo,
    txt_lotNo,
    handleLotxt_Lotno,
    
    
  };
}

export { fn_ConfirmBarcodeGrade };

