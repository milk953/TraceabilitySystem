import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Tag } from "antd";
function fc_LotTraceView() {
  const [txtLotNo, settxtLotNo] = useState("");
  const [txtSheetNo, settxtSheetNo] = useState("");
  const [txtSerialNo, settxtSerialNo] = useState("");
  const [txtProd, settxtProd] = useState("");
//   txtRollNo url text 
// 
  //Focus
  const fc_txtLotNo = useRef(null);

  //link
  const params = new URLSearchParams(window.location.search);
  const lot = params.get("lot");

  useEffect(() => {
    if (lot == "" || lot == null || lot == undefined) {
      console.log("lot1", lot);
      // reset()
    } else {
      console.log("lot2", lot);
      settxtLotNo(lot);
      // btnSearch_Click(btnSearch, Nothing)
    }
    fc_txtLotNo.current.focus();
  }, []);

  const btnSearch_Click = async () => {
    let strPrevLot;
    let strNextLot;
  };

  const reset = async () => {
    let strPrevLot;
    let strNextLot;
  };
  return {
    settxtLotNo,
    txtLotNo,
    fc_txtLotNo,
  };
}

export { fc_LotTraceView };
