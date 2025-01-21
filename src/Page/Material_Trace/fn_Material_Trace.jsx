import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useLoading } from "../../loading/fn_loading";
import {DataConfig} from "../Common/function_Common"; 
function fn_Material_Trace() {
  const{ConfigData} = DataConfig();

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
  const Fac = ConfigData.FACTORY;

  //เข้ามาแล้วSearch
  useEffect(() => {

    settxtLotNo(Vender_lot);
    settxtInviceNo(InvoiceNo);
    if (
      (Vender_lot != null && Vender_lot != "") ||
      (InvoiceNo != null && InvoiceNo != "")
    ) {

      ViewData(Vender_lot, InvoiceNo);
    }
  }, []);

  const ViewData = async (strlot, Invoice) => {
    showLoading("กำลังค้นหา กรุณารอสักครู่...");
    settblData1([]);
    setgvMaterial('');
    if(strlot==''&&Invoice==''){
      Swal.fire({
        icon: "warning",
        title: "กรุณากรอกข้อมูล",
      });
      hideLoading();
    }else{   
      let Meterial = [];
  
      await axios
        .post("/api/Common/MaterialDataSearch", {
          Venderlot: strlot||'',
          Invoice: Invoice||'',
        })
        .then((res) => {
       
          setgvMaterial(res.data);
        });
  
      await axios
        .post("/api/Common/GetMeterial", {
          Venderlot: strlot||'',
          Invoice: Invoice||'',
        })
        .then((res) => {
     
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
      hideLoading();}

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
    settxtInviceNo("");
    setgvMaterial("");
  };

  const ExportGridToCSV = (data, ColumnsHeader, namefile) => {
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
    ExportGridToCSV
  };
}

export { fn_Material_Trace };
