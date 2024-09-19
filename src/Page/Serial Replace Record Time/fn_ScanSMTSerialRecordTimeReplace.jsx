import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { color } from "framer-motion";
import { Tag } from "antd";
function fn_ScanSMTSerialRecordTimeReplace() {
  const [ddlProduct, setddlProduct] = useState([]);
  const [selectddlProduct, setselectddlProduct] = useState({
    value: "",
    disbled: "",
    style: {},
  });
  const [txtSerialRefer, settxtSerialRefer] = useState({
    value: "",
    disbled: "",
    style: {},
  });
  const [txtSerialReplace, settxtSerialReplace] = useState({
    value: "",
    disbled: "",
    style: {},
  });
  const [lblGroup, setlblGroup] = useState({
    value: "",
    disbled: "",
    style: {},
  });
  const [lblStartTime, setlblStartTime] = useState({
    value: "",
    disbled: "",
    style: {},
  });
  const [lblResult, setlblResult] = useState({
    value: "",
    disbled: "",
    style: {},
  });
  const [lblSerial, setlblSerial] = useState("");
  
  // data
  const [gvSerialReplace, setgvSerialReplace] = useState([]);
  // visible show
  const [pnlgvSerialReplace, setpnlgvSerialReplace] = useState("");
  const FAC = import.meta.env.VITE_FAC;
  // Hf const
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
  const [hfCheckDateInProc, setHfCheckDateInProc] = useState("");
  const [hfDateInProc, setHfDateInProc] = useState("");
  const [hfCheckWeekCode, setHfCheckWeekCode] = useState("");
  const [hfCheckWeekCodeStart, setHfCheckWeekCodeStart] = useState("");
  const [hfCheckWeekCodeEnd, setHfCheckWeekCodeEnd] = useState("");
  const [hfWeekCode, setHfWeekCode] = useState("");
  const [hfWeekCodeType, setHfWeekCodeType] = useState("");
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
  const [hfMode, sethfMode] = useState("");
  const [hfSerialCountOriginal, setHfSerialCountOriginal] = useState("");
  const [hfUserID, sethfUserID] = useState("");
  const [hfUserStation, sethfUserStation] = useState("");
  const [hfMaxSeq, sethfMaxSeq] = useState("");

  const fntxtSerialReplace = useRef([]);
  const fntxtSerialRefer = useRef([]);
  // UseEffect
  useEffect(() => {
    let ID = localStorage.getItem("ipAddress");
    sethfUserID(ID);
    sethfUserStation(ID);
    sethfMode("");
    // SetMode("LOT")
    const fetchData = async () => {
      await GetProductData();
    };
    fetchData();
    getProductSerialMaster();
    settxtSerialRefer((prevState) => ({...prevState,value: "",disbled: false,}));
    settxtSerialReplace((prevState) => ({
      ...prevState,
      value: "",
      disbled: true,
    }));
    setlblGroup((prevState) => ({ ...prevState, value: "" }));
    setlblStartTime((prevState) => ({ ...prevState, value: "" }));
    sethfMaxSeq("0");
    setTimeout(() => {
        fntxtSerialRefer.current.focus();
      }, 300);
  }, []);

  const GetProductData = async () => {
    await axios.get("/api/Common/GetProductData").then(async (res) => {
      let data = res.data.flat();
      setddlProduct(data);
      setselectddlProduct((prevState) => ({
        ...prevState,
        value: data[0].prd_name,
      }));
    });
  };
  const getProductSerialMaster = async (PrdName) => {
    let dtProductSerial = [];
    setHfSerialLength("0");
    setHfSerialFixFlag("N");
    setHfSerialDigit("");
    setHfSerialStartDigit("0");
    setHfSerialEndDigit("0");
    setHfTrayFlag("");
    setHfTrayLength("0");
    setHfTestResultFlag("");
    setHfConfigCheck("N");
    setHfConfigCode("");
    setHfConfigStart("0");
    setHfConfigEnd("0");
    setHfConfigRuning("N");
    setHfDuplicateStart("0");
    setHfDuplicateEnd("0");
    setHfChipIDCheck("N");
    setHfCheckPrdSht("N");
    setHfCheckPrdShtStart("0");
    setHfCheckPrdShtEnd("0");
    setHfCheckPrdAbbr("");
    setHfPlasmaCheck("N");
    setHfPlasmaTime("0");
    setHfCheckStartSeq("N");
    setHfCheckStartSeqCode("");
    setHfCheckStartSeqStart("0");
    setHfCheckStartSeqEnd("0");
    setHfCheckDateInProc("N");
    setHfDateInProc("");
    setHfCheckWeekCode("N");
    setHfCheckWeekCodeStart("");
    setHfCheckWeekCodeEnd("");
    setHfWeekCode("");
    setHfWeekCodeType("");
    setHfCheckPreAOIB("N");
    setHfCheckAOIF("N");
    setHfCheckAOIB("N");
    setHfCheckSPIF("N");
    setHfCheckSPIB("N");
    setHfCheckPackingNo("N");

    setHfPlasmaSkipELT("N");
    setHfPlasmaHideTime("N");
    setHfCheckEFPCAOM("N");
    setHfCheckEFPCAOI("N");
    setHfCheckEFPCOST("N");
    setHfCheckEFPCAVI("N");
    setHfCheckXrayF("N");
    setHfCheckXrayB("N");
    setHfCheckXrayOneTime("N");
    setHfCheckFinInspect("N");
    setHfCheckFinInspectProc("");
    setHfSerialStartCode("");

    await axios
      .post("/api/common/GetSerialProductByProduct", {
        prdName: PrdName,
      })
      .then((res) => {
        dtProductSerial = res.data[0];
        if (dtProductSerial != null) {
          setHfSerialLength(dtProductSerial.slm_serial_length);
          setHfSerialFixFlag(dtProductSerial.slm_fix_flag);
          setHfSerialDigit(dtProductSerial.slm_fix_digit);
          setHfSerialStartDigit(dtProductSerial.slm_fix_start_digit);
          setHfSerialEndDigit(dtProductSerial.slm_fix_end_digit);
          setHfTrayFlag(dtProductSerial.slm_tray_flag);
          setHfTrayLength(dtProductSerial.slm_tray_length);
          setHfTestResultFlag(dtProductSerial.slm_test_result_flag);
          setHfserialcount(dtProductSerial.slm_serial_count);
          setHfAutoScan(dtProductSerial.slm_auto_scan);
          setHfConfigCheck(dtProductSerial.prm_barcode_req_config);
          setHfConfigCode(dtProductSerial.prm_config_code);
          setHfConfigStart(dtProductSerial.prm_start_config);
          setHfConfigEnd(dtProductSerial.prm_end_config);
          setHfConfigRuning(dtProductSerial.prm_running_req_config);
          setHfDuplicateStart(dtProductSerial.prm_duplicate_start);
          setHfDuplicateEnd(dtProductSerial.prm_duplicate_end);
          setHfChipIDCheck(dtProductSerial.prm_check_chip_id_flg);
          setHfCheckPrdSht(dtProductSerial.prm_req_check_prd_sht);
          setHfCheckPrdShtStart(dtProductSerial.prm_check_prd_sht_start);
          setHfCheckPrdShtEnd(dtProductSerial.prm_check_prd_sht_end);
          setHfCheckPrdAbbr(dtProductSerial.prm_abbr);
          setHfPlasmaCheck(dtProductSerial.prm_plasma_time_flg);
          setHfPlasmaTime(dtProductSerial.prm_plasma_time);
          setHfCheckStartSeq(dtProductSerial.prm_req_start_seq_flg);
          setHfCheckStartSeqCode(dtProductSerial.prm_start_seq_code);
          setHfCheckStartSeqStart(dtProductSerial.prm_start_seq_start);
          setHfCheckStartSeqEnd(dtProductSerial.prm_start_seq_end);
          setHfCheckDateInProc(dtProductSerial.prm_date_inproc_flg);
          setHfDateInProc(dtProductSerial.prm_date_inproc);
          setHfWeekCodeType(dtProductSerial.prm_date_type);
          setHfCheckWeekCode(dtProductSerial.prm_check_weekcode_flg);
          setHfCheckWeekCodeStart(dtProductSerial.prm_check_weekcode_start);
          setHfCheckWeekCodeEnd(dtProductSerial.prm_check_weekcode_end);
          setHfCheckPreAOIB(dtProductSerial.prm_sht_pre_aoi_b);
          setHfCheckAOIF(dtProductSerial.prm_sht_aoi_f);
          setHfCheckAOIB(dtProductSerial.prm_sht_aoi_b);
          setHfCheckAOICoatF(dtProductSerial.prm_sht_aoi_coat_f);
          setHfCheckAOICoatB(dtProductSerial.prm_sht_aoi_coat_b);
          setHfCheckSPIF(dtProductSerial.prm_sht_spi_f);
          setHfCheckSPIB(dtProductSerial.prm_sht_spi_b);
          setHfCheckPackingNo(dtProductSerial.prm_final_packing_group_flg);
          setHfSerialStartCode(dtProductSerial.prm_serial_start_code);
          setHfPlasmaSkipELT(dtProductSerial.prm_plasma_time_skip_elt);
          setHfPlasmaHideTime(dtProductSerial.prm_plasma_time_hide_time);
          setHfCheckEFPCAOM(dtProductSerial.prm_check_efpc_aom_flg);
          setHfCheckEFPCAOI(dtProductSerial.prm_check_efpc_aoi_flg);
          setHfCheckEFPCOST(dtProductSerial.prm_check_efpc_ost_flg);
          setHfCheckEFPCAVI(dtProductSerial.prm_check_efpc_avi_flg);
          setHfSerialInfo(dtProductSerial.prm_additional_info);
          setHfCheckXrayF(dtProductSerial.prm_sht_xray_f);
          setHfCheckXrayB(dtProductSerial.prm_sht_xray_b);
          setHfCheckXrayOneTime(dtProductSerial.prm_sht_xray_1_time_flg);
          setHfCheckFinInspect(dtProductSerial.prm_fin_gate_inspect_flg);
          setHfCheckFinInspectProc(dtProductSerial.prm_fin_gate_inspect_proc);
          setHfSerialCountOriginal(dtProductSerial.slm_serial_count);  
       
        }

      });
     
    return 0;
  };
  const txtSerialNo_TextChanged = async () => {
    setlblGroup((prevState) => ({ ...prevState, value: "" }));
    setlblStartTime((prevState) => ({ ...prevState, value: "" }));
    sethfMaxSeq("0");
    await Search_Data();
    if(lblGroup.value > 0){
       if (lblGroup.value == "") {
      settxtSerialRefer((prevState) => ({ ...prevState, value: "" }));
      settxtSerialReplace((prevState) => ({ ...prevState, disbled: true }));
      setTimeout(() => { fntxtSerialRefer.current.focus();}, 300);
    }}else{
    settxtSerialReplace((prevState) => ({...prevState,value: "",disbled: false,}));
    setTimeout(() => {
      fntxtSerialReplace.current.focus();
    }, 300);
    } 
    
   
   
  };
  const Search_Data = async () => {
    let DBOpenFlg = false;
    let _strLotNo = txtSerialReplace.value.trim().toUpperCase();
    // let _strSerialAll=input.trim().toUpperCase().replace(/\r\n/g, ',').split(',');
    let sbSql = [];

    await axios
      .post("/api/SearchDataRecord", {
        dataList: {
          strPlantCode: FAC,
          strSheetNo: txtSerialRefer.value,
        },
      })
      .then((res) => {
        sbSql = res.data;
      });
    if (sbSql.length > 0) {
      setlblGroup((prevState) => ({ ...prevState, value: sbSql[0].group_no }));
      setlblStartTime((prevState) => ({...prevState,value: sbSql[0].start_time,}));
      sethfMaxSeq(sbSql[0].max_seq); setlblResult((prevState) => ({ ...prevState,value: "Data Read Complete",
        style: { paddingTop: "6px", color: "black",fontWeight:'bold' },
      }));
    } else{
      setlblResult((prevState) => ({...prevState,value: "Data record time not found",style: { paddingTop: "6px", color: "red",fontWeight:'bold' }}));
    }

   
  };
  const txtSerialReplace_TextChanged = async () => {
    let _strSerial = txtSerialReplace.value.trim().toUpperCase();
    let _strRemark = "";
   
    if (_strSerial.length == parseInt(hfSerialLength, 10)) {
   
      let _strFixDigit = "";
      if (hfSerialFixFlag == "Y") {
        const startDigit = parseInt(hfSerialStartDigit, 10);
        const endDigit = parseInt(hfSerialEndDigit, 10);
        _strFixDigit = _strSerial.substring(startDigit - 1, endDigit);
        if (_strFixDigit !== hfSerialDigit) {
          _strRemark = "Serial barcode mix product";
        }
        if (hfConfigCheck == "Y" && _strRemark == "") {
          let _strConfigDigit = "";
          const startConfig = parseInt(hfConfigStart, 10);
          const endConfig = parseInt(hfConfigEnd, 10);
          _strConfigDigit = _strSerial.substring(startConfig - 1, endConfig);
          if (_strConfigDigit !== hfConfigCode) {
            _strRemark = "Serial barcode mix product";
          }
        }
        if (hfSerialStartCode.trim() !== "" && _strRemark == "") {
          if ( _strSerial.substring(0, hfSerialStartCode) !== hfSerialStartCode) {
            _strRemark = "Serial barcode mix product";
          }
        }
      }
      if (hfCheckStartSeq == "Y" && _strRemark == "") {
        
        let _strStartSeq = "";
        _strStartSeq = _strSerial.substring(
          parseInt(hfCheckStartSeqStart) - 1, // ลดค่าเพื่อให้ตรงกับ 0-based index
          parseInt(hfCheckStartSeqStart) - 1 + 
          (parseInt(hfCheckStartSeqEnd) - parseInt(hfCheckStartSeqStart)) + 1
        );
        
        if (_strStartSeq !== hfCheckStartSeqCode) {
          _strRemark = "Serial barcode mix product";
        }
      }
    } else {
      _strRemark = "Serial barcode not matching product";
    }
    if (_strRemark == "") {
      let InputSerial = await getInputSerial();
      setgvSerialReplace(InputSerial);
      setpnlgvSerialReplace(true);
      settxtSerialReplace((prevState) => ({ ...prevState, value: "" }));
    } else {
      setlblResult((prevState) => ({...prevState,value: _strRemark, style: { paddingTop: "6px", color: "red",fontWeight:'bold' }}));
      settxtSerialReplace((prevState) => ({ ...prevState, value: "" }));
    }

    setTimeout(() => {
        fntxtSerialReplace.current.focus();
      }, 300);
  };
  const ddlProduct_SelectedIndexChanged = async (selectvalue) => {
    setselectddlProduct((prevState) => ({ ...prevState, value: selectvalue }));
    await getProductSerialMaster(selectvalue);

  };
  const getInputSerial = async () => {
    let dtData = [];
    let intRow = 0
    let strFrontSide =""
    let boolDuplicate = false
    for (let intSeq = 0; intSeq < gvSerialReplace.length; intSeq++) {
      dtData.push({
        SEQ: intRow + 1,
        SERIAL_NO: lblSerial[intSeq],
      });
      if(txtSerialReplace.value.trim().toUpperCase() == gvSerialReplace.SERIAL_NO ){
        boolDuplicate = true
      }
    }
    if(!boolDuplicate){
        dtData.push({
          SEQ: intRow + 1,
          SERIAL_NO: txtSerialReplace.value,
        });
     
      setlblResult((prevState) => ({...prevState,value: ""}));
    }else{
      setlblResult((prevState) => ({...prevState,value: "Serial no. duplicate.", style: { paddingTop: "6px", color: "red",fontWeight:'bold' }}));
    }

    return dtData;
  };

  const getUpdateSerial = async () => {
    let dtData = [];
    let intRow = 0
    let strFrontSide =""
    let boolDuplicate = false
    for (let intRow = 0; intRow < gvSerialReplace.length; intRow++) {
      dtData.push({
        SEQ: intRow + 1,
        SERIAL_NO: gvSerialReplace[intRow].SERIAL_NO,
      });
    }
  

    return dtData;
  };

  const BtnSubmit1_Click = async () => {
    let dtData = await getUpdateSerial() ;
    for(let drRow = 0; drRow < dtData.length;drRow++){
      await axios
      .post("/api/SetInsert_SerialConfirm", 
        {
          dataList: [
            {
              Plantcode: FAC,
              SERIAL_NO: dtData[drRow].SERIAL_NO,
              DDL_PRODUCT: selectddlProduct.value,
              IP_ADDRESS: hfUserID,
              SEQ: dtData[drRow].SEQ,
              txt_Serial:txtSerialRefer.value
            }
          ]
        }
      )
      .then((res) => {
        setlblResult((prevState) => ({...prevState,value: "Data record time save complete.", style: { paddingTop: "6px", color: "blue",fontWeight:'bold' }}));
        setTimeout(() => {
            txtSerialRefer.current.focus();
          }, 300);
        
      });
    }
  
  };

  const handleSetSerial = async (index, event) => {
    const newValues = [...lblSerial];
    newValues[index] = event.target.value;
    setlblSerial(newValues);
  };
  const columns = [
    {
      title: "No.",
      dataIndex: "SEQ",
      key: "No.",
      render: (text, record, index) => {
        return index + 1;
      },
      align: "center",
    },
    {
      title: "Serial No.",
      dataIndex: "SERIAL",
      key: "Serial No.",
      align: "left",
      render: (text, record, index) => {
          return text;
      },
    },
    
  ];


  return {
    columns,
    txtSerialNo_TextChanged,
    txtSerialRefer,
    settxtSerialRefer,
    txtSerialReplace_TextChanged,
    txtSerialReplace,
    settxtSerialReplace,
    ddlProduct_SelectedIndexChanged,
    ddlProduct,
    selectddlProduct,
    setselectddlProduct,
    BtnSubmit1_Click,
    pnlgvSerialReplace,
    lblStartTime,
    lblResult,
    lblGroup ,
    setlblSerial,lblSerial,handleSetSerial,
    fntxtSerialReplace,fntxtSerialRefer,gvSerialReplace 
  };
}

export { fn_ScanSMTSerialRecordTimeReplace };
