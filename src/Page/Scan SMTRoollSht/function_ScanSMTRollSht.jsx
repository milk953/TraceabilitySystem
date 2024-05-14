import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Fn_ScanSMTRollSht() {
  const [txt_lotNo, settxt_lotNo] = useState("");
  const [sl_Product, setsl_Product] = useState("");
  useEffect(() => {
   
  }, []);
  const handleLotxt_Lotno = (event) => {
    let strPrdName =''
    let RollNo =''
    console.log("mmm",event.target.value)
    settxt_lotNo(event.target.value);
    axios.post("/api/getLot", {
    txt_lotno: event.target.value,
    })
    .then((res) => {
      
      if (res.data.length > 0) {
        strPrdName=res.data.flat()[0]
        RollNo=res.data.flat()[1]
        if (strPrdName  != "" ){
            // lblLog.Text = ""
            // pnlLog.Visible = False
            // txtLot.Text = strLot
        }

        if (RollNo!=''){
            // hfRollNo.Value = strLot
        }
        console.log(strPrdName,"data")
        setsl_Product(strPrdName)
        // ddlProduct.SelectedValue = strPrdName
        //         getProductSerialMaster()
        //         getInitialSheet()
        //         SetMode("ROLL")
        //         fnSetFocus("txtRollLeaf")
      } 
      
    });
  };

  return {
    txt_lotNo,handleLotxt_Lotno,sl_Product
  };
}

export { Fn_ScanSMTRollSht };
