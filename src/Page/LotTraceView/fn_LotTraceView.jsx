import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Tag } from "antd";
import { Tooltip, Avatar } from "antd";
import excel from "/src/assets/excel.png";

function fn_LotTraceView() {
  const [txtLotNo, settxtLotNo] = useState("");
  const [LotNoSearch, setLotNoSearch] = useState("");
  const [txtSheetNo, settxtSheetNo] = useState("");
  const [txtSerialNo, settxtSerialNo] = useState("");
  const [txtProd, settxtProd] = useState("_ _ _ _ _ _");
  const [lblLotNo, setlblLotNo] = useState("xxxxxxxxx");
  const [OQC, setOQC] = useState("");
  const [loading, setloading] = useState(false);
  const [loadingDoc, setLoadingDoc] = React.useState(false);

  const [txtRollNo, settxtRollNo] = useState({
    text: "",
    url: "",
    visible: "none",
    style: {},
  });
  const [txtNextLotNo, settxtNextLotNo] = useState({
    text: "",
    url: "",
    visible: "none",
    style: {},
  });

  const [txtPreviousLotNo, settxtPreviousLotNo] = useState({
    text: "",
    url: "",
    visible: "none",
    style: {},
  });

  const [lblTitleShtFront, setlblTitleShtFront] = useState({
    text: "Sheet No.(F)",
    value: "",
    visible: "none",
    style: {},
  });

  const [lblTitleShtBack, setlblTitleShtBack] = useState({
    text: "Sheet No.(B))",
    value: "",
    visible: "none",
    style: {},
  });

  const [gvMaterial, setgvMaterial] = useState({
    value: "",
    disbled: "",
    visible: false,
    style: {},
    focus: "",
  });

  const [gvProcessLink, setgvProcessLink] = useState({
    value: "",
    disbled: "",
    visible: false,
    style: {},
    focus: "",
  });

  const [gvLot, setgvLot] = useState({
    value: "",
    disbled: "",
    visible: false,
    style: {},
    focus: "",
  });

  const [gvRouting, setgvRouting] = useState({
    value: "",
    disbled: "",
    visible: false,
    style: {},
    focus: "",
  });

  const [hplFinalGate, sethplFinalGate] = useState({
    text: "",
    value: "",
    visible: "none",
    style: {},
    url: "",
  });

  const [hplSheetNo, sethplSheetNo] = useState({
    text: "",
    value: "",
    visible: "none",
    style: {},
  });

  const [lbtConnectSht, setlbtConnectSht] = useState({
    text: "0",
    value: "",
    visible: "none",
    style: {},
  });

  const [lbtFinalGate, setlbtFinalGate] = useState({
    valueOK: "0",
    valueNG: "0",
    disabledOK: "",
    disabledNG: "",
    style: {},
  });
  //   txtRollNo  tr1 tr2 gvMaterial lblTitleShtFront lblTitleShtBack
  //
  //Focus
  const fc_txtLotNo = useRef(null);

  //link
  const params = new URLSearchParams(window.location.search);
  const lot = params.get("lot");
  const Fac = import.meta.env.VITE_FAC;

  useEffect(() => {
    if (lot == "" || lot == null || lot == undefined) {
      console.log("lot1", lot);
      reset();
    } else {
      console.log("lot2", lot);
      settxtLotNo(lot);
      setLotNoSearch(lot);
    }
    fc_txtLotNo.current.focus();
  }, []);

  //เข้ามาแล้วSearch
  useEffect(() => {
    if (LotNoSearch != "") {
      btnSearch_Click();
    }
  }, [LotNoSearch]);

  //   useEffect(() => {
  // fetchdata()
  //     // const [strEMCSNo, linkEmcNo, linkEmcNo2, linkEmcNo3] = test1; // ค่าแต่ละตัวจาก array test1
  //     // console.log(strEMCSNo, linkEmcNo, linkEmcNo2, linkEmcNo3,'useeeeee')

  //   }, [gvRouting.value]);
  //   const fetchdata = async () => {  const test1= await DatagvRouting(); // ค่าแรกจาก DatagvRouting
  //     console.log(test1,'ttttttt')}

  const btnSearch_Click = async () => {
    setloading(true);
    if (txtLotNo != "" || txtSheetNo != "" || txtSerialNo != "") {
      const datalblLot = await setHead();

      console.log(datalblLot, "datalblLot");
      await setGrid(datalblLot);
      setloading(false);
    } else {
      reset();
      setloading(false);
    }
  };

  const reset = async () => {
    settxtProd("_ _ _ _ _ _ _ _ _ _ _ _");
    settxtRollNo((prevState) => ({
      ...prevState,
      text: "_ _ _ _ _ _ _ _ _ _ _ _",
      url: "",
    }));

    settxtNextLotNo((prevState) => ({
      ...prevState,
      text: "_ _ _ _ _ _",
      visible: "none",
    }));

    settxtPreviousLotNo((prevState) => ({
      ...prevState,
      visible: "none",
    }));

    setgvMaterial((prevState) => ({
      ...prevState,
      value: "",
    }));

    setgvLot((prevState) => ({
      ...prevState,
      value: "",
    }));

    setgvProcessLink((prevState) => ({
      ...prevState,
      value: "",
    }));

    setgvRouting((prevState) => ({
      ...prevState,
      value: "",
    }));

    setlblTitleShtFront((prevState) => ({
      ...prevState,
      text: "Sheet No.(F)",
      value: "",
      visible: "none",
    }));

    setlblTitleShtBack((prevState) => ({
      ...prevState,
      text: "Sheet No.(B)",
      value: "",
      visible: "none",
    }));

    sethplFinalGate((prevState) => ({
      ...prevState,
      url: "",
    }));

    sethplSheetNo((prevState) => ({
      ...prevState,
      url: "",
    }));
  };

  const setHead = async () => {
    let datalblLot = "";

    let dt = [];
    if (txtSerialNo != "") {
      let dtLot;
      let StrResult = "";
      let ELT_Count = 0;
      await axios
        .post("/api/ViewTraceLot/GetDataViewLot", {
          dataList: { txtserialno: txtSerialNo, plant_code: Fac },
        })
        .then((res) => {
          dtLot = res.data;
        });
      if (dtLot.length > 0) {
        dtLot = dtLot[0];
        setlblLotNo(dtLot.fgh_lot_no);
        datalblLot = dtLot.fgh_lot_no;

        sethplFinalGate((prevState) => ({
          ...prevState,
          value: txtSerialNo,
          url: "link navigate _blank",
        }));
        if (dtLot.lss_front_sheet_no != dtLot.lss_back_sheet_no) {
          setlblTitleShtFront((prevState) => ({
            ...prevState,
            value: dtLot.lss_front_sheet_no,
            url: "link navigate _blank",
            text: "Sheet No.(F)",
            visible: "",
          }));
          setlblTitleShtBack((prevState) => ({
            ...prevState,
            value: dtLot.lss_back_sheet_no,
            url: "link navigate _blank",
            text: "Sheet No.(B)",
            visible: "",
          }));
        } else if (dtLot.lss_front_sheet_no != null) {
          setlblTitleShtFront((prevState) => ({
            ...prevState,
            value: dtLot.lss_front_sheet_no,
            url: "link navigate _blank",
            text: "Sheet No.",
            visible: "",
          }));
        }
      } else {
        await axios
          .post("/api/ViewTraceLot/GetDataViewLot2", {
            dataList: { txtSerialNo: txtSerialNo, PLANT_CODE: Fac },
          })
          .then((res) => {
            dtLot = res.data;
          });

        if (dtLot.length > 0) {
          dtLot = dtLot[0];
          setlblLotNo(dtLot.lss_lot_no);
          datalblLot = dtLot.lss_lot_no;
          if (dtLot.lss_front_sheet_no != dtLot.lss_back_sheet_no) {
            setlblTitleShtFront((prevState) => ({
              ...prevState,
              value: dtLot.lss_front_sheet_no,
              url: "link navigate _blank",
              text: "Sheet No.(F)",
              visible: "",
            }));
            setlblTitleShtBack((prevState) => ({
              ...prevState,
              value: dtLot.lss_back_sheet_no,
              url: "link navigate _blank",
              text: "Sheet No.(B)",
              visible: "",
            }));
          } else if (dtLot.lss_front_sheet_no != null) {
            setlblTitleShtFront((prevState) => ({
              ...prevState,
              value: dtLot.lss_front_sheet_no,
              url: "link navigate _blank",
              text: "Sheet No.",
              visible: "",
            }));
          }
        }
      }
    } else if (txtSheetNo != "") {
      let dtLot;
      await axios
        .post("/api/ViewTraceLot/GetDataViewLot3", {
          dataList: { txtSerialNo: txtSheetNo, PLANT_CODE: Fac },
        })
        .then((res) => {
          dtLot = res.data;
        });
      if (dtLot.length > 0) {
        dtLot = dtLot[0];
        setlblLotNo(dtLot.lss_lot_no);
        datalblLot = dtLot.lss_lot_no;
        if (dtLot.lss_front_sheet_no != dtLot.lss_back_sheet_no) {
          setlblTitleShtFront((prevState) => ({
            ...prevState,
            value: dtLot.lss_front_sheet_no,
            url: "link navigate _blank",
            text: "Sheet No.(F)",
            visible: "",
          }));
          setlblTitleShtBack((prevState) => ({
            ...prevState,
            value: dtLot.lss_back_sheet_no,
            url: "link navigate _blank",
            text: "Sheet No.(B)",
            visible: "",
          }));
        } else if (dtLot.lss_front_sheet_no != null) {
          setlblTitleShtFront((prevState) => ({
            ...prevState,
            value: dtLot.lss_front_sheet_no,
            url: "link navigate _blank",
            text: "Sheet No.",
            visible: "",
          }));
        }
      }
    } else if (txtLotNo != "") {
      setlblLotNo(txtLotNo);
      datalblLot = txtLotNo;
    }
    await axios
      .post("/api/Common/fnGetLotData", {
        strLOTNO: datalblLot,
      })
      .then((res) => {
        dt = res.data;
        console.log(res.data, "resssss");
      });

    settxtPreviousLotNo((prevState) => ({
      ...prevState,
      visible: "none",
    }));

    settxtNextLotNo((prevState) => ({
      ...prevState,
      visible: "none",
    }));

    if (dt.length > 0) {
      for (let dr = 0; dr < dt.length; dr++) {
        if (dt[dr].LOT_PRD_NAME !== null) {
          settxtProd(dt[dr].LOT_PRD_NAME);
        } else {
          settxtProd("");
        }
        if (dt[dr].LOT_ROLL_NO !== null) {
          console.log(dt, "dtdtdtdtdtdt3");
          settxtRollNo((prevState) => ({
            ...prevState,
            value: dt[dr].LOT_ROLL_NO,
            url: "link navigate _blank",
          }));
          let dataGvLot;
          await axios
            .post("/api/Common/fnGetLotData", {
              strLOTNO: datalblLot,
            })
            .then((res) => {
              dataGvLot = res.data;
            });

          setgvLot((prevState) => ({
            ...prevState,
            value: dataGvLot,
            visible: "โชว์",
          }));
        } else {
          settxtRollNo((prevState) => ({
            ...prevState,
            value: "",
            url: "",
          }));
          let dataGvLot;
          await axios
            .post("/api/Common/fnGetLotData", {
              strLOTNO: "",
            })
            .then((res) => {
              dataGvLot = res.data;
              console.log(dataGvLot, "dataGvLot");
            });

          setgvLot((prevState) => ({
            ...prevState,
            value: dataGvLot,
            visible: "โชว์",
          }));
        }
        if (dt[dr].NEXTLOT !== null) {
          settxtNextLotNo((prevState) => ({
            ...prevState,
            text: dt[dr].NEXTLOT,
            visible: "",
          }));
        }
        if (dt[dr].PREVTLOT !== null) {
          settxtPreviousLotNo((prevState) => ({
            ...prevState,
            text: dt[dr].PREVTLOT,
            visible: "",
          }));
        }
      }
    }

    await axios
      .post("/api/Common/fnGetMaterialData", {
        strLOTNO: datalblLot,
      })
      .then((res) => {
        dt = res.data;
      });
    setgvMaterial((prevState) => ({
      ...prevState,
      value: dt,
      visible: "โชว์",
    }));

    if (dt.length > 0) {
      for (let i = 0; i < dt.length; i++) {
        if (dt[i].INVOICE_NO != null) {
          if (!OQC.includes("," + dt[i].INVOICE_NO)) {
            setOQC(OQC + "," + dt[i].INVOICE_NO);
          }
        }
      }
    }

    let dtSerailCount = [];
    await axios
      .post("/api/Common/getlotserialcountdata", {
        dataList: {
          strLotNo: datalblLot,
          strPlantCode: Fac,
        },
      })
      .then((res) => {
        dtSerailCount = res.data;
        console.log(dtSerailCount.length, "dtSerailCount");
      });
    let dataConnectSht = 0;
    if (dtSerailCount.length > 0) {
      dataConnectSht = dtSerailCount[0]?.count_sht.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
    } else {
      dataConnectSht = "0";
    }

    setlbtConnectSht((prevState) => ({
      ...prevState,
      value: dataConnectSht,
      disabled: dataConnectSht !== "0" ? "กดได้" : "กดไม่ได้",
    }));
    let dtFinalGate = [];
    let dataOK;
    let dataNG;
    await axios
      .post("/api/ViewTraceLot/fnlotresultfinalgatedata", {
        dataList: { strLotNo: datalblLot, strPlantCode: Fac },
      })
      .then((res) => {
        dtFinalGate = res.data;
        console.log(dtFinalGate, "dtFinalGate");
      });
    if (dtFinalGate.length > 0) {
      dataOK = dtFinalGate[0]?.final_ok.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
      dataNG = dtFinalGate[0]?.final_ng.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
    } else {
      dataOK = "0";
      dataNG = "0";
    }
    console.log(dataOK, dataNG, "dtFinalGate2");
    setlbtFinalGate((prevState) => ({
      ...prevState,
      valueOK: dataOK,
      valueOK: dataOK,
      disabledOK: dataOK !== "0" ? "กดได้" : "กดไม่ได้",
      disabledNG: dataNG !== "0" ? "กดได้" : "กดไม่ได้",
    }));
    return datalblLot;
  };

  const setGrid = async (datalblLot) => {
    await axios
      .post("/api/Common/fnGetLotProcessDetailData", {
        strLOTNO: datalblLot,
      })
      .then((res) => {
        console.log(res.data, "fnGetLotProcessDetailData");
        setgvRouting((prevState) => ({
          ...prevState,
          value: res.data,
          visible: "",
        }));
        // DatagvRouting()
      });

    await axios.post("/api/ViewTraceLot/fnGetProcessLinkData").then((res) => {
      console.log("gvProcessLinkgvProcessLink", res.data);
      setgvProcessLink((prevState) => ({
        ...prevState,
        value: res.data,
        visible: "",
      }));
    });
  };

  const setShtSerialGrid = async (strLot) => {
    let namefile = "";
    let FinalExport = [];
    await axios
      .post("/api/ViewTraceLot/fnSheetSerialByLotData", {
        dataList: { strLotNo: strLot, strPlantCode: Fac },
      })
      .then((res) => {
        console.log("FinalExport", res.data);
        FinalExport = res.data;
      });
    if (FinalExport.length > 0) {
      namefile = "ShtSerial" + strLot + ".xls";
      ExportGridToCSV(FinalExport, columnsShtSerialExport, namefile);
    }
  };

  const columnsgvMaterial = [
    {
      title: "Material Code",
      dataIndex: "MAT_CODE",
      key: "Material Code",
      render: (text, record, index) => {
        return text;
      },
      align: "left",
      width: "85px",
    },
    {
      title: "Material Name",
      dataIndex: "MAT_NAME",
      key: "Material Name",
      align: "left",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "Category",
      dataIndex: "MAT_CATEGORY",
      key: "Category",
      align: "left",
      render: (text, record, index) => {
        return text;
      },
    },

    {
      title: "Vender Lot",
      key: "Vender Lot",
      dataIndex: "VENDER_LOT",
      align: "left",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "Sub Lot",
      key: "Sub Lot",
      dataIndex: "SUB_VENDER_LOT",
      align: "left",
      render: (text, record, index) => {
        return text;
      },
      width: 100,
    },
    {
      title: "Expired Date",
      key: "Expired Date",
      dataIndex: "EXPIRE_DATE",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
      width: 100,
    },
    {
      title: "Invoice No.",
      key: "Invoice No.",
      dataIndex: "INVOICE_NO",
      align: "left",
      render: (text, record, index) => {
        return text;
      },
      width: 110,
    },
    {
      title: "Vender Name",
      key: "Vender Name",
      dataIndex: "VENDER_NAME",
      align: "left",
      render: (text, record, index) => {
        return text;
      },
    },
  ];

  const columnsgvLot = [
    {
      title: gvLot.value && gvLot.value[0] && gvLot.value[0].LOT_ROLL_NO ? (
        <>
          Roll No. : {" "}
          <a
            href={`/TraceabilitySystem/LotRollLeafNo?LOTNO=${gvLot.value[0].LOT_ROLL_NO}&product=${txtProd}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#98DED9" }}
          >
            {gvLot.value[0].LOT_ROLL_NO}
          </a>
        </>
      ) : (
        "Roll No."
      ),
      
      dataIndex: "LOT",
      key: "Roll No.",
      render: (text, record, index) => {
        return    <a
        href={`/TraceabilitySystem/LotTraceView?lot=${text}`}
        target="_blank"
        rel="noopener noreferrer"

      >
       {text}
      </a>;
      },
      align:
        gvLot.value && gvLot.value[0] && gvLot.value[0].LOT_ROLL_NO
          ? `left`
          : `center`,
    },
  ];

  const columnsgvRouting = [
    {
      // (text, record, index) => index + 1,
      title: "No.",
      dataIndex: "SEQ",
      key: "No.",
      render: (text, record, index) => {
        return index + 1;
      },
      align: "center",
      width: 50,
    },
    {
      title: "Factory",
      dataIndex: "FACTORY",
      key: "Factory",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 63,
    },
    {
      title: "Process",
      dataIndex: "PROC",
      key: "Process",
      render: (text, record, index) => {
        return text;
      },
      align: "left",
      width: 70,
    },
    {
      title: "Process Name",
      dataIndex: "PROC_DESC",
      key: "Process Name",
      render: (text, record, index) => {
        return text;
      },
      align: "left",
    },
    {
      title: "Production Date",
      dataIndex: "PROD_DATE",
      key: "Production Date",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 135,
    },
    {
      title: "Machine No.",
      dataIndex: "MC_NO",
      key: "Machine No.",
      render: (text, record, index) => {
        return text;
      },
      align: "left",
      width: 100,
    },
    {
      title: "Operator",
      dataIndex: "OPER",
      key: "Operator",
      render: (text, record, index) => {
        return text;
      },
      align: "left",
      width: 115,
    },
    {
      title: "Document No.",
      dataIndex: "EMCS",
      key: "Document No.",
      render: (text, record, index) => {
        let strEMCSNo = [];
        let strEMCSRev = [];
        let linkEmcNo = [];
        let linkEmcNo2 = [];
        let linkEmcNo3 = [];
        const strEMCS = text ? text.split(",") : [];

        for (let intSeq = 0; intSeq < strEMCS.length; intSeq++) {
          strEMCSNo[intSeq] = strEMCS[intSeq]
            .substring(0, strEMCS[intSeq].indexOf("_"))
            .trim(); //ตัดเอาข้างหน้าก่อนเครื่องหมาย'_'
          strEMCSRev[intSeq] = strEMCS[intSeq]
            .substring(
              strEMCS[intSeq].indexOf("_") + 1,
              strEMCS[intSeq].indexOf("_") + 6
            )
            .trim(); //ตัวสุดท้ายหลัง_
        }
        console.log(strEMCSNo, "strEMCSNo");
        return (
          <>
            {strEMCSNo.map((item, idx) => (
              <span key={idx}>
                <a
                  style={{ marginRight: 8 }}
                  onClick={() => DatagvRouting(strEMCS, item, strEMCSRev[idx])}
                >
                  {item}
                </a>
                {idx !== strEMCSNo.length - 1 && ","}
              </span>
            ))}
          </>
        );
      },
      
      // render:  (text, record, index) => {

      //   return text;
      // },

      align: "left",
    },
    {
      title: "Tools Type",
      dataIndex: "TTT_TOOLS_TYPE_NAME",
      key: "Tools Type",
      render: (text, record, index) => {
        return text;
      },
      align: "left",
    },
    {
      title: "Tools Name",
      dataIndex: "TTL_TOOLS_CODE",
      key: "Tools Name",
      render: (text, record, index) => {
        return text;
      },
      align: "left",
    },
  ];
  

  const columnsgvProcessLink = [
    {
      title: "Process",
      dataIndex: "proc_code",
      key: "Process",
      render: (text, record, index) => {
        return index + 1;
      },
      align: "center",
    },
    {
      title: "Process Name",
      dataIndex: "proc_link_data",
      key: "Process Name",
      render: (text, record, index) => {
        return index + 1;
      },
      align: "center",
    },
    {
      title: "Test Data",
      dataIndex: "proc_test_data",
      key: "Test Data",
      render: (text, record, index) => {
        return index + 1;
      },
      align: "center",
    },
    {
      title: "Detail",
      dataIndex: "proc_link_data",
      key: "Detail",
      render: (text, record, index) => {
        return index + 1;
      },
      align: "center",
    },
  ];

  const columnsShtSerialExport = [
    {
      key: "PLANT_CODE",
    },
    {
      key: "PRODUCT_NAME",
    },
    {
      key: "LOT_NO",
    },
    {
      key: "F_SHEET_NO",
    },
    {
      key: "B_SHEET_NO",
    },
    {
      key: "PCS_NO",
    },
    {
      key: "SERIAL_NO",
    },
    {
      key: "BOTTOM_FIXTURE",
    },
    {
      key: "TOP_FIXTURE",
    },
    {
      key: "CONFIRM",
    },
    {
      key: "CREATE_BY",
    },
    {
      key: "CREATE_DATE",
    },
    {
      key: "CREATE_PROGRAM",
    },
    {
      key: "UPDATE_BY",
    },
    {
      key: "UPDATE_DATE",
    },
    {
      key: "UPDATE_PROGRAM",
    },
  ];

  const columnsFinalGatelExport = [
    {
      key: "PLANT_CODE",
    },
    {
      key: "PRODUCT_NAME",
    },
    {
      key: "LOT_NO",
    },
    {
      key: "SERIAL_NO",
    },
    {
      key: "ELT_RESULT",
    },
    {
      key: "FINAL_RESULT",
    },
    {
      key: "FINAL_REMARK",
    },
    {
      key: "UPDATE_STATION",
    },
    {
      key: "UPDATE_DATE",
    },
    {
      key: "PACKING_GROUP",
    },
    {
      key: "MASTER_CODE",
    },
  ];

  const ExportGridToCSV = (data, ColumnsHeader, namefile) => {
    console.log(data, "---", ColumnsHeader, "---", namefile);

    const filteredColumns = ColumnsHeader.filter(
      (col) => col.key && col.key !== null && col.key !== undefined
    );

    const headers = filteredColumns.map((col) => col.key);

    const filteredData = data.map((row) =>
      filteredColumns.map((col) => {
        const value = row[col.key];

        return value === null || value === "[NULL]" || value === undefined
          ? ""
          : value;
      })
    );

    const wsData = [headers, ...filteredData];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

    const blobData = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(blobData, namefile);
  };

  const ExportTableToCSV = (data, ColumnsHeader, namefile) => {
    const filteredColumns = ColumnsHeader.filter(
      (col) => col.key !== "" && col.key !== null && col.key !== undefined
    );

    const headers = filteredColumns.map((col) => col.key);

    const filteredData = data.map((row) =>
      filteredColumns.map((col) => row[col.dataIndex] || "")
    );

    const wsData = [headers, ...filteredData];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blobData = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(blobData, namefile);
  };

  const setFinalGateGrid = async (strLot, strResult) => {
    let namefile = "";
    let FinalExport = [];
    await axios
      .post("/api/ViewTraceLot/fnLotResultFinalGateDeatailData", {
        dataList: {
          strLotNo: strLot,
          strPlantCode: Fac,
          strResult: strResult,
        },
      })
      .then((res) => {
        FinalExport = res.data;
        console.log("FinalExport2", FinalExport.length, FinalExport);
      });
    if (FinalExport.length > 0) {
      namefile = "FinalGate" + strLot + ".xls";
      ExportGridToCSV(FinalExport, columnsFinalGatelExport, namefile);
    }
  };

  const DatagvRouting = async (strEMCS, strEMCSNo, strEMCSRev) => {
    setLoadingDoc(true)
    let linkEmcNo = "";
    let linkEmcNo2 = "";
    let linkEmcNo3 = "";
    console.log(`${strEMCS}หมายเลข: ${strEMCSNo}, รุ่น: ${strEMCSRev}`);
    let dt1 = [];
    let dt2 = [];
    await axios
      .post("/api/common/fnGetEDOCLink", {
        strEMCS: strEMCSNo,
        strRev: strEMCSRev,
      })
      .then((res) => {
        dt1 = res.data;
        console.log(dt1,'fdsfksdhf')
      });

    for (let intSeq = 0; intSeq < strEMCS.length; intSeq++) {
      for (let dr = 0; dr < dt1.length; dr++) {
        dt1 = dt1[0];
        if (intSeq == 0) {
          if (dt1.EMCS_TYPE == "EMCS") {
            linkEmcNo = `http://10.17.100.112/ConditionSystem/View/master/EMCS/E-DOC/rpt_LoadFormEdoc.aspx?FT_NO=${dt1.EMCS_NO}&FT_REV=${dt1.EMCS_REV}&ISSUETYPE=${dt1.EMCS_TYPE}&E_D=E`;
            console.log("เข้าจ้า1.1", linkEmcNo);
          } else if (dt1.EMCS_TYPE == "EPS") {
            linkEmcNo = `http://10.17.100.112/ConditionSystem/View/master/EMCS/E-DOC/rpt_LoadFormePS.aspx?EPS_NO=${dt1.EMCS_NO}&EPS_REV=${dt1.EMCS_REV}&EPS_LANGUAGE=EN&EPS_TYPE=FORM`;
            console.log("เข้าจ้า1.2", linkEmcNo);
          } else {
            linkEmcNo = `http://10.17.100.112/ConditionSystem/View/master/EMCS/E-DOC/rpt_LoadFormEdoc.aspx?FT_NO=${dt1.EMCS_NO}&FT_REV=${dt1.EMCS_REV}&ISSUETYPE=${dt1.EMCS_TYPE}&E_D=E`;
            console.log("เข้าจ้า1.3", linkEmcNo);
          }
        } else if (intSeq == 1) {
          if (dt1.EMCS_TYPE == "EMCS") {
            linkEmcNo = `http://10.17.100.112/ConditionSystem/View/master/EMCS/E-DOC/rpt_LoadFormEdoc.aspx?FT_NO=${dt1.EMCS_NO}&FT_REV=${dt1.EMCS_REV}&ISSUETYPE=${dt1.EMCS_TYPE}&E_D=E`;
            console.log("เข้าจ้า1.1", linkEmcNo);
          } else if (dt1.EMCS_TYPE == "EPS") {
            linkEmcNo = `http://10.17.100.112/ConditionSystem/View/master/EMCS/E-DOC/rpt_LoadFormePS.aspx?EPS_NO=${dt1.EMCS_NO}&EPS_REV=${dt1.EMCS_REV}&EPS_LANGUAGE=EN&EPS_TYPE=FORM`;
            console.log("เข้าจ้า1.2", linkEmcNo);
          } else {
            linkEmcNo = `http://10.17.100.112/ConditionSystem/View/master/EMCS/E-DOC/rpt_LoadFormEdoc.aspx?FT_NO=${dt1.EMCS_NO}&FT_REV=${dt1.EMCS_REV}&ISSUETYPE=${dt1.EMCS_TYPE}&E_D=E`;
            console.log("เข้าจ้า1.3", linkEmcNo);
          }
        } else if (intSeq == 2) {
          if (dt1.EMCS_TYPE == "EMCS") {
            linkEmcNo = `http://10.17.100.112/ConditionSystem/View/master/EMCS/E-DOC/rpt_LoadFormEdoc.aspx?FT_NO=${dt1.EMCS_NO}&FT_REV=${dt1.EMCS_REV}&ISSUETYPE=${dt1.EMCS_TYPE}&E_D=E`;
            console.log("เข้าจ้า1.1", linkEmcNo);
          } else if (dt1.EMCS_TYPE == "EPS") {
            linkEmcNo = `http://10.17.100.112/ConditionSystem/View/master/EMCS/E-DOC/rpt_LoadFormePS.aspx?EPS_NO=${dt1.EMCS_NO}&EPS_REV=${dt1.EMCS_REV}&EPS_LANGUAGE=EN&EPS_TYPE=FORM`;
            console.log("เข้าจ้า1.2", linkEmcNo);
          } else {
            linkEmcNo = `http://10.17.100.112/ConditionSystem/View/master/EMCS/E-DOC/rpt_LoadFormEdoc.aspx?FT_NO=${dt1.EMCS_NO}&FT_REV=${dt1.EMCS_REV}&ISSUETYPE=${dt1.EMCS_TYPE}&E_D=E`;
            console.log("เข้าจ้า1.3", linkEmcNo);
          }
        }
      }
      console.log(strEMCSNo,'strEMCSNostrEMCSNo')
      await axios
        .post("/api/common/fnGetDocumentLink", {
          strEMCS: strEMCSNo,
        })
        .then((res) => {
          dt2 = res.data;
          console.log(dt2,'tdtdtdtdtddt');
        });
      for (let dr = 0; dr < dt2.length; dr++) {
        dt2 = dt2[0];
        if (intSeq == 0) {
          linkEmcNo = dt2.filepdf;
          console.log(linkEmcNo, "dt1.1");
        } else if (intSeq == 1) {
          linkEmcNo2 = dt2.filepdf;
          console.log(linkEmcNo2, "dt1.2");
        } else if (intSeq == 2) {
          linkEmcNo3 = dt2.filepdf;
          console.log(linkEmcNo3, "dt1.3");
        }
      }
      console.log("linkEmcNo", linkEmcNo, linkEmcNo2, linkEmcNo3);
      if (linkEmcNo != "" ||linkEmcNo2 != "" || linkEmcNo3 != "") {
        if (intSeq == 0) {
          window.open(linkEmcNo, '_blank');

        }
        if (intSeq == 1) {
          window.open(linkEmcNo2, '_blank');

  
        }
        if (intSeq == 2) {
          window.open(linkEmcNo3, '_blank');

        }

      }
    }
    // if (dt1.length === 0 && dt2.length === 0) {
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Not Found',
    //     text: 'Document not found',
    //   });
    // }
    setLoadingDoc(false)
  };

  return {
    settxtLotNo,
    txtLotNo,
    fc_txtLotNo,
    btnSearch_Click,
    gvLot,
    gvMaterial,
    gvRouting,
    gvProcessLink,
    columnsgvMaterial,
    columnsgvLot,
    columnsgvRouting,
    columnsgvProcessLink,
    loading,
    reset,
    lblLotNo,
    txtProd,
    txtPreviousLotNo,
    txtNextLotNo,
    lbtFinalGate,
    lblTitleShtFront,
    lblTitleShtBack,
    lbtConnectSht,
    setShtSerialGrid,
    setFinalGateGrid,
    ExportTableToCSV,
    loadingDoc
  };
}

export { fn_LotTraceView };
