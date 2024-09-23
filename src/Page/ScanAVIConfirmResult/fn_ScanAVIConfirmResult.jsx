import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function fn_ScanAVIConfirmResult() {
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
    value: "#FFFFFF",
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
  const plantCode = import.meta.env.VITE_FAC;

  useEffect(() => {
    const fetchData = async () => {
      let p_name = "";
      const GetProductDataAVIResultConfirm = async () => {
        await axios
          .post("/api/GetProductDataAVIResultConfirm", {
            strplantcode: plantCode,
          })
          .then((res) => {
            console.log("GetProductDataAVIResultConfirm", res.data);
            let data = res.data;
            p_name = data[0].prd_name;
            setProduct(data);
            setDdlProduct((prevState) => ({
              ...prevState,
              value: data[0].prd_name,
            }));
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
            console.log("GetTestTypeAVIResultConfirm", res.data);
            let data = res.data;
            setTestType(data);
            setDdlTestType((prevState) => ({
              ...prevState,
              value: data[0].test_type,
            }));
          });
      };
      await GetProductDataAVIResultConfirm();
      await GetTestTypeAVIResultConfirm();
    };
    fetchData();
  }, []);

  const ddlProduct_SelectedIndexChanged = async () => {
    await axios
      .post("/api/GetTestTypeAVIResultConfirm", {
        dataList: {
          strplantcode: plantCode,
          strprdname: ddlProduct.value,
        },
      })
      .then((res) => {
        console.log("GetTestTypeAVIResultConfirm", res.data);
        let data = res.data;
        setTestType(data);
        setDdlTestType((prevState) => ({
          ...prevState,
          value: data[0].test_type,
        }));
      });
    await ClearResult(ddlProduct.value, ddlTestType.value);
  };
  const ddlTestType_SelectedIndexChanged = async () => {
    await ClearResult(ddlProduct.value, ddlTestType.value);
  };

  const txtSerialBarcode_TextChanged = async () => {
    if (txtSerialBarcode.value.trim().length > 0) {

    } else {
      setTxtSerialBarcode("");
      fnSetFocus("txtSerialBarcode");
    }
  }


  const ClearResult = async (strProduct, strTestType) => {
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
        console.log("GetAVIResultConfirmDefault", res.data);
        dtResult = res.data;
      });
    console.log("dtResult", dtResult);
    for (let i = 0; i < dtResult.length; i++) {
      const drRow = dtResult[i];
      drRow.serial_color = hfDefaultColor.value;
      drRow.type_color = hfDefaultColor.value;
    }
    await showResult(dtResult);
    if (ddlProduct.length > 0) {
      setTxtSerialBarcode((prevState) => ({
        ...prevState,
        disbled: false,
      }));
      fnSetFocus("txtSerialBarcode");
    } else {
      setTxtSerialBarcode((prevState) => ({
        ...prevState,
        disbled: true,
      }));
    }
  };

  const showResult = async (dtResult) => {
    if (!dtResult || dtResult.length === 0) return null;

    const intDataRow = dtResult[0].data_row;
    const intDataColumn = dtResult[0].data_column;
    const intTypeColumn = dtResult[0].type_column;
    let intData = 0;
    let intBarcode = 0;

    // Function to render the table
    const renderTable = () => {
      const rows = [];

      for (let intRow = 1; intRow <= intDataRow; intRow++) {
        const bcRow = [];

        for (let intCol = 1; intCol <= intDataColumn; intCol++) {
          intBarcode += 1;
          const bcCell = dtResult[intTypeColumn * (intBarcode - 1)].serial_no;
          const isBarcodeError =
            bcCell === "BARCODE ERROR" ||
            dtResult[intTypeColumn * (intBarcode - 1)].serial_no.startsWith(
              lblNo.slice(0, 2)
            );

          const bcCellStyle = {
            width: `${
              Math.trunc(100 / intDataColumn / (intTypeColumn + 2)) *
              intTypeColumn
            }%`,
            textAlign: "center",
            backgroundColor: "#FFFFFF",
            fontSize: `${hfFontSize}px`,
            fontFamily: "Arial, Helvetica, sans-serif",
            border: "2px double #006666",
            color: isBarcodeError ? "red" : "black",
          };

          bcRow.push(
            <td key={`bc-cell-${intRow}-${intCol}`} style={bcCellStyle}>
              {bcCell}
            </td>
          );
        }

        rows.push(<tr key={`bc-row-${intRow}`}>{bcRow}</tr>);

        const wkRow = [];

        for (let intCol = 1; intCol <= intDataColumn; intCol++) {
          const wkCellText = dtResult[intData].pcs_no;
          const strSerialColor = dtResult[intData].serial_color;

          const wkCellStyle = {
            width: `${Math.trunc(100 / intDataColumn / (intTypeColumn + 2))}%`,
            textAlign: "center",
            backgroundColor: "#FFFFFF",
            borderLeft: "2px double #006666",
            borderBottom: "2px double #006666",
            fontSize: `${hfPCSSize}px`,
            fontFamily: "Arial, Helvetica, sans-serif",
          };

          wkRow.push(
            <td key={`wk-cell-${intRow}-${intCol}`} style={wkCellStyle}>
              {wkCellText}
            </td>
          );

          for (let intType = 1; intType <= intTypeColumn; intType++) {
            const strTypeColor = dtResult[intData].type_color;
            const wkCell2Text =
              dtResult[intData].avi_type +
              (dtResult[intData].type_item.trim() !== ""
                ? "<br /><br /><br /><br /><br />" +
                  dtResult[intData].type_item.trim()
                : "");

            const wkCell2Style = {
              width: `${
                (Math.trunc(100 / intDataColumn) -
                  Math.trunc(100 / intDataColumn / (intTypeColumn + 2))) /
                intTypeColumn
              }%`,
              textAlign: "center",
              backgroundColor: strTypeColor,
              borderBottom: "2px double #006666",
              verticalAlign: "top",
              ...(intType === intTypeColumn && {
                borderRight: "2px double #006666",
              }),
            };

            wkRow.push(
              <td
                key={`wk-cell2-${intRow}-${intCol}-${intType}`}
                style={wkCell2Style}
              >
                {wkCell2Text}
              </td>
            );

            intData += 1;
          }
        }

        rows.push(
          <tr
            key={`wk-row-${intRow}`}
            style={{
              height: `${Math.trunc(500 / intDataRow)}px`,
              fontSize: `${hfFontSize}px`,
              fontFamily: `Arial, Helvetica, sans-serif`,
            }}
          >
            {wkRow}
          </tr>
        );
      }

      return rows;
    };

    // Return the rendered table
    return <table>{renderTable()}</table>;
  };

  function fnSetFocus(txtField) {
    setTimeout(() => {
      document.getElementById(`${txtField}`).focus();
    }, 300);
  }

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
    ClearResult,
    showResult,
  };
}

export { fn_ScanAVIConfirmResult };
