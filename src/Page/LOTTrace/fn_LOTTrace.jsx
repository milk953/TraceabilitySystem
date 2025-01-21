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

function fn_LOTTrace() {
  const [txtLotNo, settxtLotNo] = useState("");
  const [tblData1, settblData1] = useState("");
  const [dataProdRoll, setdataProdRoll] = useState([{LOT_PRD_NAME:'',LOT_ROLL_NO:''}]);
  const [dataPREVIUS, setdataPREVIUS] = useState("");
  const [dataNext, setdataNext] = useState("");
  const [dataMaterial, setdataMaterial] = useState("");
  const [dataDetail, setdataDetail] = useState("");
  const [loading, setloading] = useState(false);

  //link
  const params = new URLSearchParams(window.location.search);
  const LOTNO = params.get("LOTNO");
  const Fac = import.meta.env.VITE_FAC;

  //เข้ามาแล้วSearch
  useEffect(() => {
    if (LOTNO != null && LOTNO != "") {
      console;
      settxtLotNo(LOTNO);
      ViewData(LOTNO);
    }
  }, []);

  const reset = async () => {
    setdataProdRoll([{LOT_PRD_NAME:'',LOT_ROLL_NO:''}])
    setdataPREVIUS('')
    setdataNext('')
    setdataMaterial('')
    setdataDetail('')
  }
  const ViewData = async (strlot) => {
    setloading(true);
    reset()

    let Meterial1 = [];
    let Meterial2 = [];
    if (strlot.length < 9) {
      Swal.fire({
        icon: "error",
        title: "The lot number need 9-Digit. Pease re input.",
      });
      setloading(false);
      return;
    }
    await axios
      .post("/api/ViewTraceLot/GetDatatLotTrace", {
        txtLotNo: strlot,
      })
      .then((res) => {

        setdataProdRoll(res.data);
      });

    await axios
      .post("/api/ViewTraceLot/ReferPREVIUSLOT", {
        txtLotNo: strlot,
      })
      .then((res) => {
        let data=''
        if(data.length>0){
          data=res.data[0].LOT
        }
          setdataNext(data)
      
      });

    await axios
      .post("/api/ViewTraceLot/ReferNEXTLOT", {
        txtLotNo: strlot,
      })
      .then((res) => {
      let data=''
      if(data.length>0){
        data=res.data[0].LOT
      }
        setdataNext(data)
      });
    // Table
    await axios
      .post("/api/ViewTraceLot/GetMaterial1", {
        txtLotNo: strlot,
      })
      .then((res) => {

        Meterial1 = res.data;
      });

    await axios
      .post("/api/ViewTraceLot/GetMaterial2", {
        txtLotNo: strlot,
      })
      .then((res) => {

        Meterial2 = res.data;
      });

    setdataMaterial(Meterial1.concat(Meterial2));
    await axios
      .post("/api/ViewTraceLot/GetDetail", {
        txtLotNo: strlot,
      })
      .then((res) => {
        // setdataNext(res.data)

        setdataDetail(res.data);
      });
    setloading(false);
  };

  const createLink = (text) => {
    return (
      <a
        href={`/TraceabilitySystem/MaterialTrace?VENDER_LOTNO=${text}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {text}
      </a>
    );
  };

  const columnsDetail = [
    {
      title: "No",
      dataIndex: "SEQ",
      key: "No",
      width:40,
      render: (text, record, index) => {
         return text
      },
      align: "center",
    },
    {
      title: "Factory",
      dataIndex: "FACTORY_CODE",
      key: "Factory",
      align: "center",
      width:70,
      render: (text, record, index) => {
         return text
      },
    },
    {
      title: "Process",
      dataIndex: "PROC_DISP",
      key: "Process",
      align: "center",
   
      render: (text, record, index) => {
         return text
      },
    },
    {
      title: "Production Date",
      key: "Production Date",
      dataIndex: "SCAN_DATE",
      align: "left",
      render: (text, record, index) => {
         return text
      },
    }
  ];

  const columnsMaterial = [
    {
      title: "Material Code",
      dataIndex: "ITEM_CODE",
      key: "Material Code",
      render: (text, record, index) => {
         return text
      },
      align: "center",
    },
    {
      title: "Material Name",
      dataIndex: "ITEM_DESC",
      key: "Material Name",
      align: "left",
      render: (text, record, index) => {
         return text
      },
    },
    {
      title: "Material Type",
      dataIndex: "PROCESS",
      key: "Material Type",
      align: "left",
      render: (text, record, index) => {
         return text
      },
    },

    {
      title: "Vender Lot",
      key: "Vender Lot",
      dataIndex: "VENDER_LOT",
      align: "left",
      render: (text, record, index) => {
         return createLink(text)
      },
    },
  ];

  return {
    tblData1,
    txtLotNo,
    columnsMaterial,
    ViewData,
    loading,
    columnsDetail,
    dataNext,
    dataPREVIUS,
    dataDetail,
    dataProdRoll,
    dataMaterial,
    reset,
    settxtLotNo
  };
}

export { fn_LOTTrace };
