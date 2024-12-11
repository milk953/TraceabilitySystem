import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Tag } from "antd";
import { Tooltip, Avatar } from "antd";
import excel from "/src/assets/excel.png";
import { values } from "lodash";
import Column from "antd/es/table/Column";
import { useLoading } from "../../loading/fn_loading";
function fn_Material_Trace() {
  const { showLoading, hideLoading } = useLoading();
  const [txtLotNo, settxtLotNo] = useState("");
  const [txtInviceNo, settxtInviceNo] = useState("");
  const [tblData1, settblData1] = useState("");
  const [loading, setloading] = useState(false);
  const [gvMaterial, setgvMaterial] = useState("");

  //link
  const params = new URLSearchParams(window.location.search);
  const Vender_lot = params.get("VENDER_LOTNO") || "";
  const InvoiceNo = params.get("INVOICE_NO") || "";
  const Fac = import.meta.env.VITE_FAC;

  //เข้ามาแล้วSearch
  useEffect(() => {
    console.log(Vender_lot, InvoiceNo, "Useeffect");
    settxtLotNo(Vender_lot);
    settxtInviceNo(InvoiceNo);
    if (
      (Vender_lot != null && Vender_lot != "") ||
      (InvoiceNo != null && InvoiceNo != "")
    ) {
      console.log("เข้ามาแล้วSearch", Vender_lot, InvoiceNo);
      ViewData(Vender_lot, InvoiceNo);
    }
  }, []);

  const ViewData = async (strlot, Invoice) => {
    showLoading("กำลังค้นหา กรุณารอสักครู่...");
    settblData1([]);
    console.log("ViewData", strlot,Invoice);
    let Meterial = [];

    await axios
      .post("/api/Common/MaterialDataSearch", {
        Venderlot: strlot||'',
        Invoice: Invoice||'',
      })
      .then((res) => {
        console.log(res.data, "MaterialDataSearch");
        setgvMaterial(res.data);
      });

    await axios
      .post("/api/Common/GetMeterial", {
        Venderlot: strlot||'',
        Invoice: Invoice||'',
      })
      .then((res) => {
        console.log(res.data, "GetMeterial");
        for (let i = 0; i < res.data.length; i += 5) {
          Meterial.push(res.data.slice(i, i + 5));
        }

        Meterial = Meterial.map((group, index) => {
          return {
            key: index,
            LOT1: group[0] ? group[0].LOT : "",
            LOT2: group[1] ? group[1].LOT : "",
            LOT3: group[2] ? group[2].LOT : "",
            LOT4: group[3] ? group[3].LOT : "",
            LOT5: group[4] ? group[4].LOT : "",
          };
        });
 
        settblData1(Meterial);

      });
    hideLoading();
  };
  const createLink = (text) => {
    return (
      <a
        href={`/TraceabilitySystem/LotTraceView?lot=${text}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {text}
      </a>
    );
  };

  const Clear = () => {
    setloading(false);
    settblData1("");
    settxtLotNo("");
  };

  const columnstblData1 = [
    {
      title: "LOT-NO1",
      dataIndex: "LOT1",
      key: "LOT-NO1",
      render: (text, record, index) => {
        return createLink(text);
      },
      align: "center",
    },
    {
      title: "LOT-NO2",
      dataIndex: "LOT2",
      key: "LOT-NO2",
      align: "center",
      render: (text, record, index) => {
        return createLink(text);
      },
    },
    {
      title: "LOT-NO3",
      dataIndex: "LOT3",
      key: "FRONT-SHEET-NO. 3",
      align: "center",
      render: (text, record, index) => {
        return createLink(text);
      },
    },

    {
      title: "LOT-NO4",
      key: "LOT-NO4",
      dataIndex: "LOT4",
      align: "center",
      render: (text, record, index) => {
        return createLink(text);
      },
    },
    {
      title: "LOT-NO5",
      key: "LOT-NO5",
      dataIndex: "LOT5",
      align: "center",
      render: (text, record, index) => {
        return createLink(text);
      },
    },
  ];

  // หาข้อมูล Material
  //   await axios
  //   .post("/api/Common/fnGetMaterialData", {
  //     strLOTNO: datalblLot,
  //   })
  //   .then((res) => {
  //     dt = res.data;
  //   });
  // setgvMaterial((prevState) => ({
  //   ...prevState,
  //   value: dt,
  //   visible: "โชว์",
  // }));

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
      title: "Process",
      dataIndex: "PROCESS",
      key: "Process",
      align: "left",
      width: "85px",
      render: (text, record, index) => {
        return text;
      },
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

  return {
    tblData1,
    txtLotNo,
    columnstblData1,
    ViewData,
    loading,
    settxtLotNo,
    Clear,
    columnsgvMaterial,
    gvMaterial,
    txtInviceNo,
    settxtInviceNo,
  };
}

export { fn_Material_Trace };
