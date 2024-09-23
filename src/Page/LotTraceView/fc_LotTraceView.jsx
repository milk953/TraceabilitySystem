import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Tag } from "antd";
function fc_LotTraceView() {

    const [txtLotNo, settxtLotNo] = useState("");
    
    //link
    const params = new URLSearchParams(window.location.search);
    const lot = params.get("lot"); 
    
    useEffect(() => {
        if(lot!=''){
          
        }  else{
            // reset()
        }
      
      }, []);
    return {};
}

export { fc_LotTraceView };
