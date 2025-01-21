import React, { useRef, useEffect, useState } from "react";
import axios from "axios";

function fn_rpt_LotFVIBadmarkView() {
  const [selectedValue, setSelectedValue] = useState("");
  const [rbtLot, setrbtLot] = useState(true);
  const [rbtSheet, setrbtSheet] = useState(false);
  const [txtBarcode, settxtBarcode] = useState({
    value: "",
    disbled: "",
    style: {},
  });
  const [lblProduct, setlblProduct] = useState({
    value: "",
    disbled: "",
    style: {},
  });
  const [lblNo, setlblNo] = useState({ value: "", disbled: "", style: {} });
  const [tblData1,settblData1] = useState([])
  // Focus
  const fntxtBarcode = useRef([]);
  const FAC = import.meta.env.VITE_FAC;
  const params = new URLSearchParams(window.location.search);
  const TYPE = params.get("TYPE");
  const NO = params.get("NO");

  const [hfDefaultColor, sethfDefaultColor] = useState("#00CCFF");
  const [hfOKColor, sethfOKColor] = useState("Green");
  const [hfNGColor, sethfNGColor] = useState("Yellow");
  const [hfSerialError, sethfSerialError] = useState("ERROR");
  const [hfFontSize, sethfFontSize] = useState("14px");
  const [hfPCSSize, sethfPCSSize] = useState("27px");
  const [hfBarcodeType, sethfBarcodeType] = useState("TSIP");
  const [hfBadmarkRate, sethfBadmarkRate] = useState("-8");
  const [hfX, sethfX] = useState("");
  const [hfY, sethfY] = useState("");
  const [hfPCSNO, sethfPCSNO] = useState("");
  const [hfColor, sethfColor] = useState("");

  useEffect(() => {
    settblData1([])
    if (TYPE !== "" && TYPE != null) {
      if (TYPE === "LOT") {
        setrbtLot(true);
        setrbtSheet(false);
      } else {
        setrbtLot(false);
        setrbtSheet(true);
      }
    }

    if (NO !== "" && NO !== null) {
      lblNo_useEffect();
    }
    // txtBarcode.Focus()
  }, []);
  const lblNo_useEffect = async () => {
    let Product = "";
    setlblNo((prevState) => ({ ...prevState, value: NO }));
    let dtProduct = [];
    let dtResult = [];
    if (rbtLot == true) {
      sethfBarcodeType("LOT");
      await axios
        .post("/api/Common/fnGetLotData", {
          strLOTNO: NO,
        })
        .then((res) => {
          dtProduct = res.data;
        });
      if (dtProduct.length > 0) {
        dtProduct = dtProduct[0].LOT_PRD_NAME;
        setlblProduct((prevState) => ({ ...prevState, value: dtProduct }));

        await axios
          .post("/api/Common/GetFVIBadmarkResultByLot", {
            _strPrdName: dtProduct,
            _strLotNo: NO,
            _strRate: hfBadmarkRate,
          })
          .then((res) => {
            dtResult = res.data;
          });
      }
    } else {
      sethfBarcodeType("SHT");
      await axios
        .post("/api/GetSMTConnectShtPcsProduct", {
          dataList: {
            _strPlantCode: FAC,
            _strSheetNo: NO,
          },
        })
        .then((res) => {
          Product = res.data.product;
          setlblProduct((prevState) => ({
            ...prevState,
            value: res.data.product,
          }));
        });

      await axios
        .post("/api/GetFVIBadmarkResultBySheet", {
          dataList: {
            _strPlantCode: FAC,
            _strPrdName: Product,
            _strShippingNo: NO,
            _Rate: hfBadmarkRate,
          },
        })
        .then((res) => {
          dtResult = res.data[0];
        });
    }
    showResult(dtResult);
  };
  const handleRadioChange = (event) => {
    const { value } = event.target;
    if (value === "rbtLot") {
      sethfBarcodeType("LOT");
      setrbtLot(true);
      setrbtSheet(false);
    } else if (value === "rbtSheet") {
      sethfBarcodeType("SHT");
      setrbtLot(false);
      setrbtSheet(true);
    }
  };

  
  const txtBarcode_TextChanged = async () => {
    settblData1([])
    if (txtBarcode.value.trim().length > 0) {
      setlblNo((prevState) => ({
        ...prevState,
        value: txtBarcode.value.trim().toUpperCase(),
      }));
      let dtProduct = [];
      let dtResult = [];

      if (rbtLot == true) {
        sethfBarcodeType("LOT");
        
        await axios
          .post("/api/Common/fnGetLotData", {
            strLOTNO: txtBarcode.value,
          })
          .then((res) => {
            dtProduct = res.data;
          });
        if (dtProduct.length > 0) {
          dtProduct = dtProduct[0].LOT_PRD_NAME;
          setlblProduct((prevState) => ({ ...prevState, value: dtProduct }));

          await axios
          .post("/api/Common/GetFVIBadmarkResultByLot", {
            _strPrdName: dtProduct,
            _strLotNo: txtBarcode.value,
            _strRate: hfBadmarkRate,
          })
          .then((res) => {
            dtResult = res.data;
   
          });
        }
      }else{
        sethfBarcodeType("SHT");
        await axios
          .post("/api/GetSMTConnectShtPcsProduct", {
            dataList: {
              _strPlantCode: FAC,
              _strSheetNo: NO,
            },
          })
          .then((res) => {
            dtProduct = res.data.product;
            setlblProduct((prevState) => ({
              ...prevState,
              value: res.data.product,
            }));
          });
          await axios
        .post("/api/GetFVIBadmarkResultBySheet", {
          dataList: {
            _strPlantCode: FAC,
            _strPrdName: lblProduct.value,
            _strShippingNo: NO,
            _Rate: hfBadmarkRate,
          },
        })
        .then((res) => {
          dtResult = res.data;
        });
      }
      showResult(dtResult);
    }
    settxtBarcode((prevState) => ({ ...prevState, value: "" }));
    // setTimeout(() => {
    //     fntxtBarcode.current.focus();
    //   }, 300);
  };
  const btnHidden = async () => {
    let dtProduct = [];
    let dtResult = [];
    let dtSheet = [];
    let strFrontSheet = "";
    let strBackSheet = "";
    let strOstResult = "";
    let strAoiResult = "";
    if (hfBarcodeType == "LOT") {
     
      await axios
        .post("/api/Common/GetFVIBadmarkResultByLot", {
          _strPrdName: lblProduct.value,
          _strLotNo: NO,
          _strRate: hfBadmarkRate,
        })
        .then((res) => {
          dtResult = res.data;
         
        });
      await axios
        .post("/api/GetFVIBadmarkSheetByLot", {
          _strPlantCode: FAC,
          strPrdName: lblProduct.value,
          strLot: NO,
          StrX: hfX,
          StrY: hfY,
        })
        .then((res) => {
          dtSheet = res.data;
        });
    } else {
      await axios
        .post("/api/GetFVIBadmarkResultBySheet", {
          dataList: {
            _strPlantCode: FAC,
            _strPrdName: lblProduct.value,
            _strShippingNo: NO,
            _Rate: hfBadmarkRate,
          },
        })
        .then((res) => {
          dtResult = res.data;
        
        });
      await axios
        .post("/api/GetFVIBadmarkSerialBySheet", {
          strPlantCode: FAC,
          strPrdName: lblProduct.value,
          strLot: NO,
          StrX: hfX,
          StrY: hfY,
        })
        .then((res) => {
          dtSheet = res.data;
        });
    }
    for (let drRow = 0; drRow < dtSheet.length; drRow++) {
      strFrontSheet = dtSheet[drRow].FRONT_SHEET_NO;
      strBackSheet = dtSheet[drRow].BACK_SHEET_NO;
      let dtOstData = [];
      let dtAoiData = [];
      await axios
        .post("/api/GetSerialOSTResult", {
          SerialNo: strFrontSheet,
          intPCSNo: parseInt(dtSheet[drRow].CONN_SHT_PCS_NO),
          strSMPJCavityFlg: "N",
        })
        .then((res) => {
          dtOstData = res.data;
        });
      if (dtOstData.length > 0) {
        strOstResult = dtOstData.OST_RESULT.trim().toUpperCase();
      }
      if (
        (strOstResult == "GOOD" ||
          strOstResult == "OK" ||
          strOstResult == "PASS" ||
          strOstResult == "") &&
        strFrontSheet !== strBackSheet &&
        strBackSheet !== ""
      ) {
        await axios
          .post("/api/GetSerialOSTResult", {
            SerialNo: strFrontSheet,
            intPCSNo: parseInt(dtSheet[drRow].CONN_SHT_PCS_NO),
            strSMPJCavityFlg: "N",
          })
          .then((res) => {
            dtOstData = res.data;
          });
        if (dtOstData.length > 0) {
          strOstResult = dtOstData.OST_RESULT.trim().toUpperCase();
        }
      }
      if (
        strOstResult == "GOOD" ||
        strOstResult == "OK" ||
        strOstResult == "PASS" ||
        strOstResult == ""
      ) {
        await axios
          .post("/api/GetSerialAOIEFPCResult", {
            _strPlantCode: FAC,
            _strFrontSheetNo: strFrontSheet,
            _intPcsNo: parseInt(dtSheet[drRow].CONN_SHT_PCS_NO),
            _strProduct: lblProduct.value,
            _strSMPJCavityFlg: "N",
          })
          .then((res) => {
            dtAoiData = res.data;
          });
        if (dtAoiData.length > 0) {
          strAoiResult = dtAoiData.AOI_RESULT;
        }
        if (
          (strAoiResult == "GOOD" ||
            strAoiResult == "OK" ||
            strAoiResult == "PASS" ||
            strAoiResult == "") &&
          strFrontSheet !== strBackSheet &&
          strBackSheet !== ""
        ) {
          await axios
            .post("/api/GetSerialAOIEFPCResult", {
              _strPlantCode: FAC,
              _strFrontSheetNo: strFrontSheet,
              _intPcsNo: parseInt(dtSheet[drRow].CONN_SHT_PCS_NO),
              _strProduct: lblProduct.value,
              _strSMPJCavityFlg: "N",
            })
            .then((res) => {
              dtAoiData = res.data;
            });
          if (dtAoiData.length > 0) {
            strAoiResult = dtAoiData.AOI_RESULT;
            if (
              strAoiResult !== "GOOD" &&
              strAoiResult !== "OK" &&
              strAoiResult !== "PASS" &&
              strAoiResult !== ""
            ) {
              dtAoiData.AOI_RESULT = strAoiResult;
            }
          }
        }
      } else {
        dtAoiData.OST_RESULT = strOstResult;
      }
    }
    showResult(dtResult);
    showResultLink(dtSheet);
  };
  const showResult = (dtResult) => {
    if (dtResult !== "") {
      let intDataRow = dtResult[0].DATA_ROW;
      let intDataColumn = dtResult[0].DATA_COLUMN;
      //   let intTypeColumn = 1
      //   let intData = 0
      //   let intBarcode = 0
      //  for (let intRow = 1 ; intRow < intDataRow ; intRow++){
      //   for (let intCol = 1 ;intCol < intDataColumn;intCol++){
      //     ///////////////
      //   }
      //  }
      const grid = [];
      let dataIndex = 0;

      // ลูปเพื่อใส่ข้อมูลลงใน grid ตามแถวและคอลัมน์
      for (let row = 0; row < intDataRow; row++) {
        const rowData = [];
        for (let col = 0; col < intDataColumn; col++) {
          // ตรวจสอบว่าข้อมูลใน index นี้มีอยู่หรือไม่
          if (dataIndex < dtResult.length) {
            rowData.push(dtResult[dataIndex]);
            dataIndex++;
          } else {
            // ถ้าไม่มีข้อมูลแล้วให้ใส่ null
            rowData.push(null);
          }
        }
        grid.push(rowData);
        settblData1(grid)
      }
      
    }
  };
  const showResultLink = (dtResult) => {
  };

  return {
    selectedValue,
    handleRadioChange,
    rbtLot,
    rbtSheet,
    btnHidden,
    txtBarcode_TextChanged,
    txtBarcode,
    settxtBarcode,
    lblNo,
    setlblNo,
    lblProduct,
    setlblProduct,
    tblData1
  };
}

export { fn_rpt_LotFVIBadmarkView };
