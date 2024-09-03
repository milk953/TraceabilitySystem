import React, { useEffect } from 'react'
import axios from "axios";

function fn_ScanSMTSerialPcsBox() {
    const [enableState, setEnableState] = useState({styled: { backgroundColor: "" }, });
    const [txtLot, settxtLot] = useState({value: "",disbled: "",visble: "",style: { enableState }, });
    const [ddlProduct, setddlProduct] = useState([]);
    const [selectddlProduct, setselectddlProduct] = useState({value: "",disbled: "",visble: "",style: {},});
    const [lblLotTotal, setlblLotTotal] = useState({value: "",disbled: "",visble: "",style: {},});
    const [lblSerialNG, setlblSerialNG] = useState({value: "",disbled: "",visble: "",style: {},});
    const [lblLot, setlblLot] = useState({value: "",disbled: "",visble: "",style: {},});
    const [lblLog, setlblLog] = useState({value: "",disbled: "",visble: false,style: {},});
    const [txtBox, settxtBox] = useState({ value: "", disbled: "",visble: "",style: {},});
    const [txtPack, settxtPack] = useState({value: "",disbled: "",visble: "",style: {},});
    const [txtMachine, settxtMachine] = useState({ value: "", disbled: "",visble: "",style: {},});
    const [txtOP, settxtOP] = useState({value: "",disbled: "",visble: "",style: {},});
    const [lblBox, setlblBox] = useState({ value: "", disbled: "", visble: "", style: {},});
    const [lblBoxFull, setlblBoxFull] = useState({ value: "",disbled: "",visble: "",style: {},});
    const [lblBoxTotal, setlblBoxTotal] = useState({value: "",disbled: "",visble: "",style: {},});
    const [lblBoxStatus, setlblBoxStatus] = useState({value: "",disbled: "",visble: "",style: { textAlign: "center", width: "15%" },});
    const [lblPacking, setlblPacking] = useState({ value: "", disbled: "", visble: "",style: {},});
    const [lblPackingTotal, setlblPackingTotal] = useState({value: "", disbled: "",visble: "",style: {},});
    const [lblLastTray, setlblLastTray] = useState({ value: "", disbled: "",visble: "",style: {},});
    const [lblOP, setlblOP] = useState({value: "", disbled: "",visble: "",style: {},});
    const [txtPcsTray, settxtPcsTray] = useState({value: "0",disbled: "", visble: "",style: {},});
    const [lblTime, setlblTime] = useState({value: "",disbled: "",visble: "",style: {},});
    const [lblResult, setlblResult] = useState({ value: "",disbled: "", visble: "",style: {},});
    const [txtSerial, settxtSerial] = useState("");
  
    const [gvSerial, setgvSerial] = useState([]);
    const [gvScanResult, setgvScanResult] = useState([]);
  
    // Visible
    const [pnlLog, setpnlLog] = useState(true);
    const [ibtback, setibtback] = useState(true);
    const [ibtBox, setibtBox] = useState(true);
    const [ibtPack, seibtPack] = useState(true);
    const [ibtMachineBack, setibtMachineBack] = useState(true);
    const [ibtOPBack, setibtOPBack] = useState(true);
  
    //gv
    const [pnlSerial, setpnlSerial] = useState(true);
    const [pnlMachine, setpnlMachine] = useState(true);
    const [pnlOP, setpnlOP] = useState(false);
    const [pnlgvScanResult, setpnlgvScanResult] = useState(false);
  
    // Focus
    const fntxtLot = useRef([]);
    const fntxtMachine = useRef([]);
    const fntxtTray = useRef([]);
    const fntxtBox = useRef([]);
    const fntxtOP = useRef([]);
    const fntxtPack = useRef([]);
    const fc_txtSerial = useRef([]);
    // const fngvSerial = useRef([]);
  
    // disable
    const [dis_ddlProduct, setdis_ddlProduct] = useState(false);
  
    const FAC = import.meta.env.VITE_FAC;
    const FINAL_GATE_SPECIAL_FLG = import.meta.env.VITE_FINAL_GATE_SPECIAL_FLG;
    const FINAL_GATE_SPECIAL_PRD = import.meta.env.VITE_FINAL_GATE_SPECIAL_PRD;
    const FINAL_GATE_SPECIAL_SERIAL_VAR =""
    const FINAL_GATE_SPECIAL_MESSAGE = import.meta.env.VITE_FINAL_GATE_SPECIAL_MESSAGE;
    const FINAL_GATE_SPECIAL_OK = ""
    const FINAL_GATE_SPECIAL_QUERY =""
  
    //hf
    const hfLotLength = 9;
    const [hfLotAll, setHfLotAll] = useState("");
    const [hfTestResultFlag, setHfTestResultFlag] = useState("");
    const [hfSerialLength, setHfSerialLength] = useState("");
    const [hfSerialFixFlag, setHfSerialFixFlag] = useState("");
    const [hfSerialDigit, setHfSerialDigit] = useState("");
    const [hfSerialStartDigit, setHfSerialStartDigit] = useState("");
    const [hfSerialEndDigit, setHfSerialEndDigit] = useState("");
    const [hfTrayFlag, setHfTrayFlag] = useState("");
    const [hfTrayLength, setHfTrayLength] = useState("");
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
    const [hfPlasmaTime, setHfPlasmaTime] = useState("");
    const [hfCheckStartSeq, setHfCheckStartSeq] = useState("");
    const [hfCheckStartSeqCode, setHfCheckStartSeqCode] = useState("");
    const [hfCheckStartSeqStart, setHfCheckStartSeqStart] = useState("");
    const [hfCheckStartSeqEnd, setHfCheckStartSeqEnd] = useState("");
    const [hfCheckSPIAOI, setHfCheckSPIAOI] = useState("");
    const [hfCheckDateInProc, setHfCheckDateInProc] = useState("");
    const [hfDateInProc, setHfDateInProc] = useState("");
    const [hfCheckWeekCode, setHfCheckWeekCode] = useState("");
    const [hfCheckWeekCodeStart, setHfCheckWeekCodeStart] = useState("");
    const [hfCheckWeekCodeEnd, setHfCheckWeekCodeEnd] = useState("");
    const [hfWeekCode, setHfWeekCode] = useState("");
    const [hfWeekCodeType, setHfWeekCodeType] = useState("");
    const [hfCheckPreAOIF, setHfCheckPreAOIF] = useState("");
    const [hfCheckPreAOIB, setHfCheckPreAOIB] = useState("");
    const [hfCheckAOIF, setHfCheckAOIF] = useState("");
    const [hfCheckAOIB, setHfCheckAOIB] = useState("");
    const [hfCheckSPIF, setHfCheckSPIF] = useState("");
    const [hfCheckSPIB, setHfCheckSPIB] = useState("");
    const [hfCheckPackingNo, setHfCheckPackingNo] = useState("");
    const [hfSerialStartCode, setHfSerialStartCode] = useState("");
    const [hfPlasmaCheck, setHfPlasmaCheck] = useState("");
    const [hfPlasmaSkipELT, setHfPlasmaSkipELT] = useState("");
    const [hfPlasmaHideTime, setHfPlasmaHideTime] = useState("");
    const [hfCheckEFPCAOM, setHfCheckEFPCAOM] = useState("");
    const [hfCheckEFPCAOI, setHfCheckEFPCAOI] = useState("");
    const [hfCheckEFPCOST, setHfCheckEFPCOST] = useState("");
    const [hfCheckEFPCAVI, setHfCheckEFPCAVI] = useState("");
    const [hfCheckXrayF, setHfCheckXrayF] = useState("");
    const [hfCheckXrayB, setHfCheckXrayB] = useState("");
    const [hfCheckXrayOneTime, setHfCheckXrayOneTime] = useState("");
    const [hfCheckFinInspect, setHfCheckFinInspect] = useState("");
    const [hfCheckFinInspectProc, setHfCheckFinInspectProc] = useState("");
    const [hfserialcount, setHfserialcount] = useState("");
  
    const [hfAutoScan, setHfAutoScan] = useState("");
    const [hfCheckAOICoatF, setHfCheckAOICoatF] = useState("");
    const [hfCheckAOICoatB, setHfCheckAOICoatB] = useState("");
    const [hfSerialInfo, setHfSerialInfo] = useState("");
    const [hfMode, setHfMode] = useState("");
    const [hfSerialCountOriginal, setHfSerialCountOriginal] = useState("");
  
    const [hfPlasmaBoxCheck, setHfPlasmaBoxCheck] = useState("");
    const [hfPlasmaBoxTime, setHfPlasmaBoxTime] = useState("");
  
    const [hfUserID, sethfUserID] = useState("");
    const [hfUserStation, sethfUserStation] = useState("");
  
    const [hfFQC, setHfFQC] = useState("");
    const [hfOP, setHfOP] = useState("");
    // const [hfFQC, setHfFQC] = useState("");
  
    const params = new URLSearchParams(window.location.search);
    const FQC = params.get("FQC");
    const OP = params.get("OP");
    let DUPLICATE_CHECK_FLG = "0";

    useEffect(() => {
        let ID = localStorage.getItem("ipAddress");
        sethfUserID(ID);
        sethfUserStation(ID);
        setHfMode("");
        setHfLotAll("");
        if (FQC !== null) {
            setHfFQC(FQC);
            setHfOP(OP);
        } else {
            setHfFQC("");
        }

        if (OP !== null) {
            setHfOP(OP);
        } else {
            setHfOP(1);
        }
          getProductSerialMaster();
          SetMode("LOT");
      
      }, []);

      const txtLot_TextChanged = async () => {
        if (txtLot.value !== "") {
          let _strPrdName = "";
          let _strLot = "";
          let _strLotAll = txtLot.value.toUpperCase().split(";");
          if (_strLotAll.length > 2) {
            _strLot = _strLotAll[0];
            _strPrdName = selectddlProduct.value;
            setHfTestResultFlag("Y");
            if (_strLot.length == parseInt(hfLotLength, 10)) {
                await axios
                .post("/api/Common/GetProductNameByLot", {
                  strLot: _strLot,
                })
                .then((res) => {
                  _strPrdName = res.data.prdName[0];
                });
              let dtLotPassCount = [];
                await axios
                .post("/api/Common/getSerialPassByLot", {
                  strLotNo: _strLot,
                  strPlantCode: "5",
                })
                .then((res) => {
                  dtLotPassCount = res.data.lotcount;
                  setlblLotTotal((prevState) => ({ ...prevState, value: "0" }));
                  setlblSerialNG((prevState) => ({ ...prevState, value: "0" }));
                });
              if (dtLotPassCount.length > 0) {
                setlblLotTotal((prevState) => ({...prevState, value: dtLotPassCount,}));
              }
              let dtLotProduct = [];
              await axios
                .post("/api/Common/getProductDataByLot", {
                  strLot: _strLot,
                })
                .then((res) => {
                  dtLotProduct = res.data.flat().flat();
                });
              if (dtLotProduct.length > 0) {
                if (dtLotProduct[0][2] == "Y") {
                  setHfTestResultFlag("N");
                }
                setHfLotAll(dtLotProduct[0][3]);
              }
              setlblLot((prevState) => ({ ...prevState, value: _strLot }));
              try {
                const isInArray = ddlProduct.some(
                  (item) => item.prd_name === _strPrdName
                );
                if (isInArray) {
                  setselectddlProduct((prevState) => ({
                    ...prevState,
                    value: _strPrdName,
                  }));
                  await axios
                  .post("/api/Common/GetFinalGateMasterCheckResult", {
                    strProduct: _strLot,
                  })
                  .then(async (res) => {
                    let GetFinalGateMasterCheckResult = res.data;
                   
                    if (GetFinalGateMasterCheckResult == "OK") {
                      getProductSerialMaster(_strPrdName);
                      if (hfFQC == "Y") {
                        SetMode("MACHINE");
                      } else {
                        SetMode("BOX");
                      }
                    } else {
                      setlblLog((prevState) => ({
                        ...prevState,
                        value: `${_strPrdName} not test master! / ${_strPrdName} ยังไม่ทดสอบมาสเตอร์ `,
                        visble: "",
                      }));
                      setlblLog((prevState) => ({ ...prevState, value: "" }));
                      setlblLotTotal((prevState) => ({...prevState,value: "", }));
                      setlblSerialNG((prevState) => ({...prevState, value: "",}));
                      SetMode("LOT_ERROR");
                      setpnlLog(true);
                    }
                  });
                }else {
                  setlblLog((prevState) => ({
                    ...prevState,
                    value: `Product ${_strPrdName} not found.`,
                    // visble: "",
                  }));
                  // fc_SlProduct.current.focus();
                  return;
                }
              
              } catch (error) {
                const intProduct = _strPrdName.indexOf("-", 13);
                if (intProduct > 0) {
                  _strPrdName =
                    _strPrdName.substring(0, intProduct) +
                    _strPrdName.substring(intProduct + 1, intProduct + 11).trim();
                  try {
                    setselectddlProduct(_strPrdName);
                    await axios
                      .post("/api/Common/GetFinalGateMasterCheckResult", {
                        strProduct: _strLot,
                      })
                      .then(async (res) => {
                        let GetFinalGateMasterCheckResult = res.data;
                        if (GetFinalGateMasterCheckResult == "OK") {
                          await getProductSerialMaster(_strPrdName);
                          if (hfFQC == "Y") {
                            SetMode("MACHINE");
                          } else {
                            SetMode("BOX");
                          }
                        } else {
                          setlblLog((prevState) => ({
                            ...prevState,
                            value: `${_strPrdName} not test master! / ${_strPrdName} ยังไม่ทดสอบมาสเตอร์ `,
                          }));
                          setlblLot((prevState) => ({ ...prevState, value: "" }));
                          setlblLotTotal((prevState) => ({...prevState,value: "",}));
                          setlblSerialNG((prevState) => ({...prevState,value: "",}));
                          setpnlLog(true);
                          SetMode("LOT_ERROR");
                        }
                      });
                  } catch (error2) {
                    setlblLog((prevState) => ({
                      ...prevState,
                      value: `Product ${_strPrdName} not found.`,
                      visble: "",
                    }));
                    await getProductSerialMaster(_strPrdName);
                    // fc_SlProduct.current.focus();
                  }
                } else {
                  setlblLog((prevState) => ({...prevState,value: `Product ${_strPrdName} not found.`,}));
                  await getProductSerialMaster(_strPrdName);
                  setpnlLog(true);
                  // fc_SlProduct.current.focus();
                }
              }
            } else {
              setlblLog((prevState) => ({...prevState, value: _strLot+" invalid lot no.!/" + _strLot + "หมายเลขล็อตไม่ถูกต้อง",}));
              setlblLot((prevState) => ({ ...prevState, value: "" }));
              setlblLotTotal((prevState) => ({ ...prevState, value: "" }));
              setlblSerialNG((prevState) => ({ ...prevState, value: "" }));
              SetMode("LOT_ERROR");
            }
          } else {
            setlblLog((prevState) => ({  ...prevState,value: " Please scan QR Code! / กรุณาสแกนที่คิวอาร์โค้ด",}));
            setlblLot((prevState) => ({ ...prevState, value: "" }));
            setlblLotTotal((prevState) => ({ ...prevState, value: "" }));
            setlblSerialNG((prevState) => ({ ...prevState, value: "" }));
            SetMode("LOT_ERROR");
          }
        } else {
          setlblLot((prevState) => ({ ...prevState, value: "" }));
          fntxtLot.current.focus();
        }
      };

      const btnCancel_Click = async () =>{
        SetMode("SERIAL")
      }
      const btnSave_Click = async () =>{
        if(hfMode == 'SERIAL')
            setSerialDataTray()
      }
      const ddlProduct_SelectedIndexChanged = async (selectvalue) => {
        setselectddlProduct((prevState) => ({ ...prevState, value: selectvalue }));
        let GetFinalGateMasterCheckResult =''
        if (lblLot.value !== "") {
          await axios
            .post("/api/Common/GetFinalGateMasterCheckResult", {
              strProduct: lblLot,
            })
            .then(async (res) => {
                GetFinalGateMasterCheckResult = res.data;
            } );

            if( GetFinalGateMasterCheckResult == 'OK'){
                getProductSerialMaster();
                if (hfFQC == "Y") {
                    SetMode("MACHINE");
                  } else {
                    SetMode("BOX");
                  }
            }else{
                setlblLog((prevState) => ({...prevState, value: `${selectddlProduct} not test master! / ${selectddlProduct} ยังไม่ทดสอบมาสเตอร์ `,}));
                  setlblLot((prevState) => ({ ...prevState, value: "" }));
                  setlblLotTotal((prevState) => ({...prevState,value: "",}));
                  setlblSerialNG((prevState) => ({...prevState,value: "", }));
                  setpnlLog(true);
                  SetMode("LOT_ERROR");
            }
        SetMode("LOT")
        }
      };

      const txtBox_TextChanged = async () => {
        if (txtBox.value.trim() !== "") {
          let _strBoxNo;
          let _strItem;
          let _strPrd;
          let _strError = "";
          let _dblBoxQty = 0;
          let _strBox;
    
          _strBox = txtBox.value.toUpperCase().split(";");
          if (_strBox.length >= 1) {
            _strItem = _strBox[0];
            _strBoxNo = _strBox[1];
            await axios
              .post("/api/Common/GetBoxCount", {
                prdName: selectddlProduct.value,
                boxNo: _strBoxNo,
              })
              .then((res) => {
                let data = res.data;
                if (data <= 0) {
                  _strError = "Box No. not found / ไม่พบกล่องหมายเลขนี้";
                } else {
                  setlblBoxFull((prevState) => ({...prevState,value: _dblBoxQty,}));
                }
              });
          } else {
            _strBoxNo = txtBox.value;
            await axios
              .post("/api/Common/GetBoxCount", {
                prdName: selectddlProduct.value,
                boxNo: _strBoxNo,
              })
              .then((res) => {
                let data = res.data;
                if (data <= 0) {
                  _strError = "Box No. not found / ไม่พบกล่องหมายเลขนี้";
                } else {
                  setlblBoxFull((prevState) => ({...prevState,value: _dblBoxQty,}));
                }
              });
          }
          settxtBox((prevState) => ({...prevState,value: _strBoxNo,}));
          setlblBox((prevState) => ({...prevState,value: _strBoxNo,}));
          if (_strError == "") {
            let _dtTrayCount = [];
            setlblBoxTotal((prevState) => ({...prevState,value: "0",}));
            await axios
              .post("/api/Common/GetCountTrayByBoxPacking", {
                prdName: selectddlProduct.value,
                boxNo: lblBox.value,
                srtPack: "",
              })
              .then((res) => {
                _dtTrayCount = res.data[0].BOX_COUNT;
                if (_dtTrayCount.length > 0) {
                  setlblBoxTotal((prevState) => ({
                    ...prevState,
                    value: _dtTrayCount,
                  }));
                }
                if (parseFloat(lblBoxTotal.value) == parseFloat(lblBoxFull.value)) {
                  setlblBoxStatus((prevState) => ({...prevState,value: "OK",style: { color: green },
                  }));
                } else {
                  setlblBoxStatus((prevState) => ({...prevState,value: "NG",style: { color: red }, }));
                }
                SetMode("PACKING");
              });
          } else {
            setlblLog((prevState) => ({...prevState,value: _strError, }));
            SetMode("BOX_ERROR");
          }
        } else {
          setlblBox((prevState) => ({ ...prevState, value: "" }));
          fntxtBox.current.focus();
        }
      };
      const txtPack_TextChanged = async () => {
        if (txtPack.value.toUpperCase() !== "") {
          let _dtTrayCount = [];
          setlblBoxTotal((prevState) => ({...prevState,value: "0",}));
          setlblPackingTotal((prevState) => ({...prevState,value: "0",}));
          setlblPacking((prevState) => ({...prevState,value: txtPack.value.toUpperCase(), }));
          await axios
            .post("/api/Common/GetCountTrayByBoxPacking", {
              prdName: selectddlProduct.value,
              boxNo: lblBox.value,
              srtPack: txtPack.value.toUpperCase(),
            })
            .then((res) => {
              _dtTrayCount = res.data;
            });
          if (_dtTrayCount.length > 0) {
            setlblBoxTotal((prevState) => ({...prevState,value: _dtTrayCount[0].BOX_COUNT,}));
            setlblPackingTotal((prevState) => ({...prevState, value: _dtTrayCount[0].PACKING_COUNT, }));
          }
          SetMode("SERIAL");
        } else {
          settxtPack((prevState) => ({...prevState,value: "",}));
          fntxtPack.current.focus();
        }
      };
      const ibtBox_Click =async () =>{
        SetMode("BOX")
      }
      const ibtPack_Click =async () =>{
        SetMode("PACKING")
      }
      const txtMachine_TextChanged =async () =>{
        if(txtMachine.value.trim().toUpperCase()){
           SetMode("PACKING") 
        }
        
      }
      const txtOP_TextChanged = () => {
        let OP = txtOP.value.trim().toUpperCase(); // ตัดช่องว่างและแปลงเป็นตัวพิมพ์ใหญ่
        if (OP !== "") {
          if (hfOP !== "") {
            let strOPData = lblOP.value.trim().toUpperCase().split(","); // แยกข้อความที่มีอยู่ใน lblOP ด้วยเครื่องหมายจุลภาค
            let bolError = false;
    
            for (let intRow = 0; intRow < strOPData.length; intRow++) {
              if (strOPData[intRow] === OP) {
                bolError = true;
                break;
              }
            }
    
            if (!bolError) {
              if (strOPData.length === parseInt(hfOP, 10)) {
                setlblOP((prevState) => ({...prevState,value: lblOP.value + txtOP.value,}));
                settxtOP((prevState) => ({...prevState, value: lblOP.value + txtOP.value, }));
                SetMode("BOX");
              } else {
                setlblOP((prevState) => ({...prevState, value: lblOP.value + txtOP.value + ",",}));
                settxtOP((prevState) => ({ ...prevState, value: "" }));
                fntxtOP.current.focus();
              }
            }
          } else {
            SetMode("BOX");
          }
        }
      }; 
      const ibtMachineBack_Click = () => {
        SetMode("MACHINE")
      };
      const ibtOPBack_Click = () => {
        SetMode("OP")
      };
    
  return {

  }
}

export  {fn_ScanSMTSerialPcsBox}