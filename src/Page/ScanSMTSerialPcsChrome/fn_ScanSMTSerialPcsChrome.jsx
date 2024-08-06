
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function fn_ScanSMTSerialPcsChrome() {
    const [txtLot, settxtLot] = useState({
        value: "",
        disbled: "",
        visble: "",
        style: {},
        focus:'',
      });

      const [txtPackingNo, settxtPackingNo] = useState({
        value: "",
        disbled: "",
        visble: "",
        style: {},
        focus:'',
      });

      const [txtPcsTray, settxtPcsTray] = useState({
        value: "",
        disbled: "",
        visble: "",
        style: {},
        focus:'',
      });

      const [lblLastTray, setlblLastTray] = useState('')
      const [lblSerialNG, setlblSerialNG] = useState({
        value: "",
        disbled: "",
        visble: "",
        style: {},
        focus:'',
      });

      const [lblLotTotal, setlblLotTotal] = useState({
        value: "",
        disbled: "",
        visble: "",
        style: {},
        focus:'',
      });

      const [lblLot, setlblLot] = useState({
        value: "",
        disbled: "",
        visble: "",
        style: {},
        focus:'',
      });
      


  return {

  };
}

export { fn_ScanSMTSerialPcsChrome };



