import axios from "axios";
import React, { useEffect, useState } from "react";

function fn_ScanSMTSerialPcsP1() {
  const Fac = import.meta.env.VITE_FAC;
  const [scanLot, setScanLot] = useState("");
  const [ddlproduct, setddlproduct] = useState([]);
  const [productSelected, setProductSelected] = useState("");
  const [lblLot, setlblLot] = useState("");
  const [lblLotTotal, setlblLotTotal] = useState("");
  const [lblSerialNG, setlblSerialNG] = useState("");
  const [lblError, setlblError] = useState("");
  const [lblErrorState, setlblErrorState] = useState(false);
  const [panalSerialState, setpanalSerialState] = useState(false);
  const [hideImg, setHideImg] = useState(true);
  const [lblResultState, setlblResultState] = useState(false);
  const [lblResult, setLblResult] = useState({
    value: "",
    styled: {
      color: "",
    },
  });
  const [gvSerialResult, setGvSerialResult] = useState([]);
  const [gvSerial, setGvSerial] = useState([]);
  const [txtSerial, setTxtSerial] = useState(gvSerial.map(() => ""));
  const columns = [];
  useEffect(() => {
    PageLoad();
  }, []);
  async function PageLoad() {
    await getData("getProductData");
  }
  async function getData(type, params) {
    try {
      if (type == "getProductData") {
        await axios.get("/api/common/GetProductData").then((res) => {
          setProductSelected(res.data[0].prd_name);
          setddlproduct(res.data);
        });
      }else if (type == "GetProductNameByLot") {
        let prdName = "";
        await axios
          .post("/api/common/getProductNameByLot", { strLot: params })
          .then((res) => {
            prdName = res.data.prdName[0];
          });
        return prdName;
      }else if (type == "GetSerialPassByLot") {
        let dtData = "";
        await axios
          .post("/api/common/getSerialPassByLot", {
            strLotNo: params,
            strPlantCode: Fac,
          })
          .then((res) => {
            dtData = res.data.lotcount;
          });
        return dtData;
      }else if (type == "GetProductDataByLot") {
        let dtData = [];
        await axios
          .post("/api/ScanFin/GetProductDataByLot", { strLot: params })
          .then((res) => {
            dtData = res.data;
          })
        return dtData;
      }else if (type == "GetSerialTestResultManyTable"){
        // Check อีกที 
      }else if (type == "GetWeekCodebyLot") {
        let response = "";
        await axios
          .post("/api/common/GetWeekCodebyLot", {
            _strLot: params.strLot,
            _strProc: params.hfDateInProc,
            _strWeekType: params.hfWeekCodeType,
            _strSerialInfo: params.hfSerialInfo,
          })
          .then((res) => {
            response = res.data.weekCode;
          });
        return response;

      }else if (type == "GetSerialDuplicate"){
        //Check อีกที
      }else if (type == "GetCheckSumSerial"){
        //Check อีกที
      }else if (type == "GetSheetNoBySerialNo") {
        let response = "";
        await axios
          .post("/api/common/GetSheetNoBySerialNo", {
            strSerialno: params,
            strPlantCode: Fac,
          })
          .then((res) => {
            response = res.data.sheet_no;
          });
        return response;
      }else if (type == "GetPlasmaTimeBySerialNo") {
        let response = 0;
        await axios
          .post("/api/Common/GetPlasmaTimeBySerialNo", {
            dataList: {
              strSerial: params.strSerial,
              strPlantCode: Fac,
              strPacking: params.strPacking,
              strMasterCode: params.strMasterCode,
              strPrdname: params.strPrdname,
            },
          })
          .then((res) => {
            response = res.data.plasma_time;
          });
        return response;
      }else if (type == "GetCheckChipDuplicate") {
        let result = "";
        await axios
          .post("/api/Common/GetCheckChipDuplicate", {
            dataList: {
              _strPlantCode: Fac,
              _strSerial: params.strSerial,
              _strPrdName: params.strPrdName,
            },
          })
          .then((res) => {
            result = res.data;
          });
        return result;
      }else if (type == 'Get_SPI_AOI_RESULT_P1') {
        
      }
    } catch (error) {
        console.error(error);
    }
  }
  const ddlproduct_Change = (e) => {
    console.log(e);
  }
  return {
    scanLot,
    setScanLot,
    ddlproduct,
    setddlproduct,
    productSelected,
    setProductSelected,
    lblLot,
    setlblLot,
    lblLotTotal,
    setlblLotTotal,
    lblSerialNG,
    setlblSerialNG,
    lblError,
    setlblError,
    lblErrorState,
    panalSerialState,
    hideImg,
    lblResultState,
    lblResult,
    columns,
    gvSerialResult,
    gvSerial,
    txtSerial,
    setTxtSerial,
    ddlproduct_Change
  };
}

export { fn_ScanSMTSerialPcsP1 };
