import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { DataConfig } from "../Common/function_Common";

function fn_ScanAVIConfirmResult() {
  const [lblNo, setLblNo] = useState({
    value: "",
    disbled: "",
    visble: false,
    style: {},
  });
  const [ddlProduct, setDdlProduct] = useState({
    value: "",
    disbled: "",
    visble: false,
    style: {},
  });
  const [ddlTestType, setDdlTestType] = useState({
    value: "",
    disbled: "",
    visble: false,
    style: {},
  });
  const [hfDefaultColor, setHfDefaultColor] = useState({
    value: "#00CCFF",
    disbled: "",
    visble: false,
    style: {},
  });
  const [hfOKColor, setHfOKColor] = useState({
    value: "green",
    disbled: "",
    visble: false,
    style: {},
  });
  const [hfNGColor, setHfNGColor] = useState({
    value: "yellow",
    disbled: "",
    visble: false,
    style: {},
  });
  const [hfSerialError, setHfSerialError] = useState({
    value: "ERROR",
    disbled: "",
    visble: false,
    style: {},
  });
  const [hfFontSize, setHfFontSize] = useState({
    value: "20px",
    disbled: "",
    visble: false,
    style: {},
  });
  const [hfPCSSize, setHfPCSSize] = useState({
    value: "27px",
    disbled: "",
    visble: false,
    style: {},
  });
  const [hfBarcodeType, setHfBarcodeType] = useState({
    value: "TSIP",
    disbled: "",
    visble: false,
    style: {},
  });
  const [hfBarcodeError, setHfBarcodeError] = useState({
    value: "BARCODE ERROR,TSIP REJECT",
    disbled: "",
    visble: false,
    style: {},
  });
  const [hfBarcodeErrorColor, setHfBarcodeErrorColor] = useState({
    value: "#CC99FF",
    disbled: "",
    visble: false,
    style: {},
  });
  const [txtSerialBarcode, setTxtSerialBarcode] = useState({
    value: "",
    disbled: false,
    visble: false,
    style: {},
  });

  const [Product, setProduct] = useState([]);
  const [TestType, setTestType] = useState([]);
  // const plantCode = import.meta.env.VITE_FAC;
  const { ConfigData } = DataConfig();
  const plantCode = ConfigData.FACTORY;
  const reftxtSerialBarcode = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      let p_name = "";
      const GetProductDataAVIResultConfirm = async () => {
        await axios
          .post("/api/GetProductDataAVIResultConfirm", {
            strplantcode: plantCode,
          })
          .then((res) => {
            let data = res.data;
            p_name = data[0].prd_name;
            setProduct(data);
            // setDdlProduct((prevState) => ({
            //   ...prevState,
            //   value: data[0].prd_name,
            // }));
            document.getElementById("ddlProduct").value = data[0].prd_name;
          });
      };
      const GetTestTypeAVIResultConfirm = async () => {
        await axios
          .post("/api/GetTestTypeAVIResultConfirm", {
            dataList: {
              strplantcode: plantCode,
              strprdname: p_name,
            },
          })
          .then((res) => {
            let data = res.data;
            setTestType(data);
            // setDdlTestType((prevState) => ({
            //   ...prevState,
            //   value: data[0].test_type,
            // }));
            document.getElementById("ddlTestType").value = data[0].test_type;
          });
      };
      await GetProductDataAVIResultConfirm();
      await GetTestTypeAVIResultConfirm();
      fnSetFocus(reftxtSerialBarcode);
    };
    fetchData();
  }, [plantCode]);
  const ddlRef = useRef(null);
  useEffect(() => {
    if (ddlRef.current) {
      ddlRef.current.value = "NewValue";
      ddlRef.current.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }, []);

  const ddlProduct_SelectedIndexChanged = async () => {
    let ddlTestType;
    const ddlProduct = document.getElementById("ddlProduct").value;
    console.log("ddlProduct00", ddlProduct);
    await axios
      .post("/api/GetTestTypeAVIResultConfirm", {
        dataList: {
          strplantcode: plantCode,
          strprdname: ddlProduct,
        },
      })
      .then((res) => {
        let data = res.data;
        setTestType(data);
        setTimeout(() => {
          document.getElementById("ddlTestType").value = data[0].test_type;
        }, 0);
        ddlTestType = data[0].test_type;
      });
    console.log("ddlProduct", ddlProduct);
    await ClearResult(ddlProduct, ddlTestType);
  };
  const ddlTestType_SelectedIndexChanged = async () => {
    const ddlProduct = document.getElementById("ddlProduct").value;
    const ddlTestType = document.getElementById("ddlTestType").value;
    await ClearResult(ddlProduct, ddlTestType);
  };

  const txtSerialBarcode_TextChanged = async () => {
    const ddlProduct = document.getElementById("ddlProduct").value;
    const ddlTestType = document.getElementById("ddlTestType").value;
    const txtSerialBarcode = document.getElementById("txtSerialBarcode").value;
    if (txtSerialBarcode.trim().length > 0) {
      const strSerial = await axios.post("/api/GetSerialNoByVendorBarcode", {
        dataList: {
          strplant_code: plantCode,
          strbarcode: txtSerialBarcode.toUpperCase().trim(),
          strbarcodetype: hfBarcodeType.value,
        },
      });
      const dtResult = await axios.post("/api/GetAVIResultConfirmSerial", {
        dataList: {
          strplant_code: plantCode,
          strprdname: ddlProduct,
          strserialno: strSerial.data[0].serial_no,
          strserialokcolor: hfOKColor.value,
          strserialngcolor: hfNGColor.value,
          strserialerror: hfSerialError.value,
          strtesttype: ddlTestType,
        },
      });
      if (hfBarcodeType.value === "TSIP" || hfBarcodeType.value === "DSIP") {
        for (let i = 0; i < dtResult.data.length; i++) {
          const drRow = dtResult.data[i];

          if (
            hfBarcodeType.value === "TSIP" &&
            hfBarcodeError.value.includes(drRow.serial_no)
          ) {
            drRow.serial_no = drRow.t_sip;
            drRow.type_color = hfBarcodeErrorColor.value;
          } else if (
            hfBarcodeType.value === "DSIP" &&
            hfBarcodeError.value.includes(drRow.serial_no)
          ) {
            drRow.serial_no = drRow.d_sip;
            drRow.type_color = hfBarcodeErrorColor.value;
          }
        }

        setLblNo((prevState) => ({
          ...prevState,
          value: txtSerialBarcode.toUpperCase().trim(),
        }));
        await showResult(dtResult.data);
        await DataTable(dtResult.data);
      }
    }

    setTxtSerialBarcode((prevState) => ({
      ...prevState,
      value: "",
    }));

    if (txtSerialBarcode.trim().length <= 0) {
      setLblNo((prevState) => ({
        ...prevState,
        value: txtSerialBarcode.toUpperCase().trim(),
      }));
      setShowtableRow((prevState) => ({
        ...prevState,
        visble: false,
      }));
    }

    fnSetFocus(reftxtSerialBarcode);
  };

  const ClearResult = async (strProduct, strTestType) => {
    const ddlProduct = document.getElementById("ddlProduct").value;
    console.log("strTestType", strTestType);
    let dtResult = [];
    await axios
      .post("/api/GetAVIResultConfirmDefault", {
        dataList: {
          strplantcode: plantCode,
          strprdname: strProduct,
          strtesttype: strTestType,
        },
      })
      .then((res) => {
        dtResult = res.data;
      });
    for (let i = 0; i < dtResult.length; i++) {
      const drRow = dtResult[i];
      drRow.serial_color = hfDefaultColor.value;
      drRow.type_color = hfDefaultColor.value;
    }
    await showResult(dtResult);
    console.log("ShowtableRow", ShowtableRow);
    if (ddlProduct.length > 0) {
      setTxtSerialBarcode((prevState) => ({
        ...prevState,
        disbled: false,
      }));
      fnSetFocus(reftxtSerialBarcode);
    } else {
      setTxtSerialBarcode((prevState) => ({
        ...prevState,
        disbled: true,
      }));
    }
  };

  const [ShowtableRow, setShowtableRow] = useState({
    value: null,
    disbled: "",
    visble: false,
  });
  const showResult = async (dtResult) => {
    console.log(dtResult, "nnnnnnnnnnnnnnnnn");
    setShowtableRow((prevState) => ({
      ...prevState,
      visble: true,
    }));
    if (!dtResult || dtResult.length === 0) return null;
    const intDataRow = dtResult[0].data_row;
    const intDataColumn = dtResult[0].data_column;
    const intTypeColumn = dtResult[0].type_column;
    let intBarcode = 0;
    let intData = 0;
    const tableRows = [];
    for (let intRow = 1; intRow <= intDataRow; intRow++) {
      const bcRow = [];
      const wkRow = [];
      for (let intCol = 1; intCol <= intDataColumn; intCol++) {
        intBarcode++;
        const cellData = dtResult[intTypeColumn * (intBarcode - 1)];
        let cellStyle = {
          width: `${
            Math.floor(100 / intDataColumn / (intTypeColumn + 2)) *
            intTypeColumn
          }%`,
          textAlign: "center",
          backgroundColor: "#FFFFFF",
          fontSize: hfFontSize.value,
          fontFamily: "Arial, Helvetica, sans-serif",
          border: "2px double #006666",
          color: "black",
        };
        if (
          hfBarcodeType.value !== "" &&
          (cellData.serial_no.startsWith(hfBarcodeType.value.substring(0, 2)) ||
            cellData.serial_no === "BARCODE ERROR")
        ) {
          cellStyle.color = "red";
        }

        const colSpan = hfBarcodeType ? intTypeColumn + 1 : 1;
        bcRow.push(
          <td
            style={cellStyle}
            colSpan={colSpan}
            key={`bcRow-${intRow}-${intCol}`}
          >
            {cellData.serial_no}
          </td>
        );
      }
      tableRows.push(<tr key={`bcRow-${intRow}`}>{bcRow}</tr>);
      for (let intCol = 1; intCol <= intDataColumn; intCol++) {
        const wkCellData = dtResult[intData];
        const wkCellStyle = {
          width: `${Math.floor(100 / intDataColumn / (intTypeColumn + 2))}%`,
          textAlign: "center",
          backgroundColor: "#FFFFFF",
          fontSize: hfPCSSize, // Assume this is defined elsewhere
          fontFamily: "Arial, Helvetica, sans-serif",
          borderLeft: "2px double #006666",
          borderBottom: "2px double #006666",
        };
        wkRow.push(
          <td style={wkCellStyle} key={`wkRow-${intRow}-${intCol}`}>
            {wkCellData.pcs_no}
          </td>
        );
        for (let intType = 1; intType <= intTypeColumn; intType++) {
          const typeCellData = dtResult[intData];
          let typeCellStyle = {
            width: `${
              (Math.floor(100 / intDataColumn) -
                Math.floor(100 / intDataColumn / (intTypeColumn + 2))) /
              intTypeColumn
            }%`,
            textAlign: "center",
            backgroundColor: typeCellData.type_color,
            borderBottom: "2px double #006666",
            verticalAlign: "top",
          };
          if (intType === intTypeColumn) {
            typeCellStyle.borderRight = "2px double #006666";
          }
          wkRow.push(
            <td
              style={typeCellStyle}
              key={`wkRow2-${intRow}-${intCol}-${intType}`}
            >
              {typeCellData.avi_type}
              {typeCellData.type_item && (
                <>
                  <br />
                  <br />
                  {typeCellData.type_item}
                </>
              )}
            </td>
          );
          intData += 1;
        }
      }
      tableRows.push(
        <tr
          key={`wkRow-${intRow}`}
          style={{
            height: `${Math.floor(500 / intDataRow)}px`,
            fontSize: hfFontSize.value,
          }}
        >
          {wkRow}
        </tr>
      );
    }

    setShowtableRow((prevState) => ({
      ...prevState,
      value: tableRows,
    }));
  };

  // function fnSetFocus(txtField) {
  //   setTimeout(() => {
  //     document.getElementById(`${txtField}`).focus();
  //   }, 0);
  // }

  const fnSetFocus = (ref, index = null) => {
    setTimeout(() => {
      if (index !== null && Array.isArray(ref.current)) {
        ref.current[index]?.focus();
      } else {
        ref?.current?.focus();
      }
    }, 0);
  };

  //----------------------------------------  เนื้อหาของ const DataTable ส่วนนี้เก็บไว้ก่อนอาจต้องใช้  {
  const [tableData, setTableData] = useState(null);
  const DataTable = async (dtResult) => {
    if (!dtResult || dtResult.length === 0) {
      return null;
    }
    const intDataRow = dtResult[0].data_row;
    const intDataColumn = dtResult[0].data_column;
    const intTypeColumn = dtResult[0].type_column;
    const renderTable = () => {
      let table = [];
      let intData = 0;
      let intBarcode = 0;
      for (let intRow = 1; intRow <= intDataRow; intRow++) {
        let bcRow = [];
        let wkRow = [];
        for (let intCol = 1; intCol <= intDataColumn; intCol++) {
          intBarcode++;
          const barcodeData = dtResult[intTypeColumn * (intBarcode - 1)];
          const isBarcodeError = barcodeData.serial_no === "BARCODE ERROR";
          const barcodeStyle = {
            width: `${
              Math.trunc(100 / intDataColumn / (intTypeColumn + 2)) *
              intTypeColumn
            }%`,
            textAlign: "center",
            backgroundColor: "#FFFFFF",
            fontSize: hfFontSize.value, // Assume this is defined elsewhere
            fontFamily: "Arial, Helvetica, sans-serif",
            border: "2px double #006666",
            color: isBarcodeError ? "red" : "black",
          };
          bcRow.push(
            <td
              key={`bc-${intRow}-${intCol}`}
              style={barcodeStyle}
              colSpan={intTypeColumn + 1}
            >
              {barcodeData.serial_no}
            </td>
          );
          const wkCellStyle = {
            width: `${Math.trunc(100 / intDataColumn / (intTypeColumn + 2))}%`,
            textAlign: "center",
            backgroundColor: "#FFFFFF",
            borderColor: "#FFFFFF",
            margin: "0px",
            fontSize: hfPCSSize, // Assume this is defined elsewhere
            fontFamily: "Arial, Helvetica, sans-serif",
            borderLeft: "2px double #006666",
            borderBottom: "2px double #006666",
          };
          wkRow.push(
            <td key={`wk-${intRow}-${intCol}-pcs`} style={wkCellStyle}>
              {dtResult[intData].pcs_no}
            </td>
          );
          for (let intType = 1; intType <= intTypeColumn; intType++) {
            const typeData = dtResult[intData];
            const typeStyle = {
              width: `${
                (Math.trunc(100 / intDataColumn) -
                  Math.trunc(100 / intDataColumn / (intTypeColumn + 2))) /
                intTypeColumn
              }%`,
              borderColor: "#FFFFFF",
              textAlign: "center",
              backgroundColor: typeData.type_color,
              borderBottom: "2px double #006666",
              verticalAlign: "top",
              borderRight:
                intType === intTypeColumn ? "2px double #006666" : "none",
            };
            wkRow.push(
              <td key={`wk-${intRow}-${intCol}-${intType}`} style={typeStyle}>
                {typeData.avi_type}
                {typeData.type_item && (
                  <>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    {typeData.type_item}
                  </>
                )}
              </td>
            );
            intData++;
          }
        }
        table.push(<tr key={`bcrow-${intRow}`}>{bcRow}</tr>);
        table.push(
          <tr
            key={`wkrow-${intRow}`}
            style={{
              height: `${Math.trunc(500 / intDataRow)}px`,
              fontSize: hfFontSize.value,
              fontFamily: "Arial, Helvetica, sans-serif",
            }}
          >
            {wkRow}
          </tr>
        );
      }
      return table;
    };
    const table = renderTable();
    setTableData(table);
  };

  //----------------------------------------  อย่าลบเด็ดขาดนะครับ  }

  return {
    ddlProduct,
    Product,
    ddlTestType,
    TestType,
    txtSerialBarcode,
    setTxtSerialBarcode,
    txtSerialBarcode_TextChanged,
    ddlProduct_SelectedIndexChanged,
    ddlTestType_SelectedIndexChanged,
    lblNo,
    tableData,
    ShowtableRow,
    reftxtSerialBarcode,
    ddlRef,
  };
}

export { fn_ScanAVIConfirmResult };
