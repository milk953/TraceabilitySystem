import React, { useEffect, useState ,useRef} from "react";
import axios from "axios";
import Swal from "sweetalert2";

function fn_SheetBinCheck() {
const [txtSheetNo,settxtSheetNo] = useState("")
const [lblSheet,setlblSheet] = useState("")
const [lblResult, setlblResult] = useState({  text: "", styled: {} });

// ตัวแปร focus
const FctxtSht = useRef(null);

// hiddenfield hf
const [hfURL,sethfURL] = useState("")
const hfPeriod = "0.2"
const hfRow ="10"
const hfTimeControl = "1"
const hfSPIPeriod = "10"
const hfConnLeafLength = "20"

const txtSheetNo_TextChanged = async () => {
    if (txtSheetNo.trim().toUpperCase() !== "") {
        await axios
        .post("/api/SheetBinChecking/GetSheetBinInspectNo",
            {
                dataList: {
                    str_TxtSheetNo: txtSheetNo,  
                },
              }
        )
        .then((response) => {
        if(response.data == 'NO BIN'){
            setlblResult({
                text: response.data,
                styled: { color: "red" , fontSize:'100px' ,fontWeight: 'bold' },
              });
              setlblSheet(txtSheetNo.trim().toUpperCase());
              settxtSheetNo("")
              FctxtSht.current.focus();
             

        }else{
            setlblResult({
                text: response.data,
                styled: { color: "green" , fontSize:'100px',fontWeight: 'bold'  },
              });
              setlblSheet(txtSheetNo.trim().toUpperCase());
              settxtSheetNo("")
              FctxtSht.current.focus();

        }
        })

    }else{
        settxtSheetNo("");
        setlblSheet("");
        setlblResult("");
        FctxtSht.current.focus();
    }
}

  return {
    txtSheetNo,settxtSheetNo,lblSheet,lblResult,txtSheetNo_TextChanged,FctxtSht
  }
}

export  {fn_SheetBinCheck}