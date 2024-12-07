import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Tag } from "antd";
import { Tooltip, Avatar } from "antd";
import excel from "/src/assets/excel.png";
import ExcelJS from "exceljs";
import { values } from "lodash";
import Column from "antd/es/table/Column";

function fn_Result() {
  const [tblData1, settblData1] = useState(""); //เก็บข้อมูลใส่ตาราง
  const [ColumntblData1, setColumntblData1] = useState([]);
  const [DatatblData1, setDatatblData1] = useState([]); //เก็บข้อมูลใส่ExportCSV
  let Now =  new Date();
  const Fac = import.meta.env.VITE_FAC;
  const params = new URLSearchParams(window.location.search);
  const Url = window.location.href;
  const Page = Url.split("/").pop().split("?")[0];
  let sheet_no = params.get("sheet_no");
  let panel_no = params.get("panel_no");
  let product_name = params.get("PRODUCT_NAME");
  let piece_no = params.get("piece_no");
  let serial_no = params.get("serial_no");
  let Serial = params.get("Serial");
  let INSPECT_DATE = params.get("INSPECT_DATE");
  let INSPECT_NO = params.get("INSPECT_NO");

  //เข้ามาแล้วSearch
  useEffect(() => {
    if (panel_no == "") {
      panel_no = null;
    }
    if(sheet_no==null){
        sheet_no=''
    }
    if(piece_no==null){
        piece_no=''
    }
    if(product_name==null){
        product_name=''
    }
    if (Page == "AOICOAResult2") {
      GetDataAOICOAResult();
      setColumntblData1(columnsAoiCoaResult2);
    } else if ( Page=='AOIResult2') {
      GetDataAOIResult();
      setColumntblData1(columnsAoiResult2);
    } else if (Page == "SPIResult") {
      GetDataSPIResult();
      setColumntblData1(columnsSPIResult);
    } else if (Page == "PREResult2") {
      GetDataPreResult();
      setColumntblData1(columnsPreResult);
    }
    else if(Page=='XRayResult' ||Page=='XRayResultN1'){
      GetDataXrayResult()
      setColumntblData1(columnsXrayResult)
    }else if(Page=='OSTResult'){
      GetDataOSTResult()
      setColumntblData1(columnsOSTResult)
    }

  }, []);

  //AOI_COA_Result
  const GetDataAOICOAResult = async () => {
    await axios
      .post("/api/Result/GetAoi_Coa_Result2", {
        dataList: {
          strprdname: product_name,
          strplantcode: Fac,
          panelno:panel_no === '' ? null : panel_no,
          strsheetno: sheet_no,
        },
      })
      .then((res) => {
        console.log(res.data,'GetAoi_Coa_Result2');
        settblData1(res.data);
      });

      await axios
      .post("/api/Result/GetAoi_Coa_Result2_Export", {
        dataList: {
          strprdname: product_name,
          strplantcode: Fac,
          panelno:panel_no === '' ? null : panel_no,
          strsheetno: sheet_no,
        },
      })
      .then((res) => {
        console.log(res.data,'GetAoi_Coa_Result2_Export');
        setDatatblData1(res.data);
      });


  };

   const GetDataAOIResult = async () => {
    await axios
      .post("/api/Result/getAOI_RESULT", {
        dataList: {
          strprdname: product_name,
          strplantcode: Fac,
          panelno:panel_no === '' ? null : panel_no,
          strsheetno: sheet_no,
        },
      })
      .then((res) => {
        console.log(res.data,'getAOI');
        settblData1(res.data);
      });

      await axios
      .post("/api/Result/Get_AOI_Export", {
        dataList: {
          strprdname: product_name,
          strplantcode: Fac,
          panelno:panel_no === '' ? null : panel_no,
          strsheetno: sheet_no,
        },
      })
      .then((res) => {
        console.log(res.data,'GetAoi_Coa_Result2_Export');
        setDatatblData1(res.data);
      });


  };

  const columnsAoiCoaResult2 = [
    {
      title: "Link",
      dataIndex: "link", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "link",
      render: (text, record, index) => {
        let modifiedText=''
        if(text!=''){
           modifiedText = text.replace("<a ", '<a target="_blank" '); 
        }
        return (
          <span
            dangerouslySetInnerHTML={{ __html: modifiedText }} 
          />
        );
      },
      align: "center",
      width: 45,
    },
    {
      title: "PLANT_CODE",
      dataIndex: "plant_code", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "plant_code",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
      width: 70,
    },
    {
      title: "SHEET_NO",
      dataIndex: "sheet_no", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "sheet_no",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
      width: 190,
    },
    {
      title: "CABITY_NO",
      key: "cabity_no", // เปลี่ยนเป็นพิมพ์เล็ก
      dataIndex: "cabity_no", // เปลี่ยนเป็นพิมพ์เล็ก
      align: "center",
      render: (text, record, index) => {
        return text;
      },
      width: 70,
    },
    {
      title: "SEQ",
      key: "seq", // เปลี่ยนเป็นพิมพ์เล็ก
      dataIndex: "seq", // เปลี่ยนเป็นพิมพ์เล็ก
      align: "center",
      render: (text, record, index) => {
        return text;
      },
      width: 50,
    },
    {
      title: "INS_COUNT",
      dataIndex: "ins_count", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "ins_count",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 90,
    },
    {
      title: "MACHINE_NAME",
      dataIndex: "machine_name", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "machine_name",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
      width: 90,
    },
    {
      title: "REFERENCE",
      dataIndex: "reference", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "reference",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
      width: 90,
    },
    {
      title: "POSITION",
      key: "position", // เปลี่ยนเป็นพิมพ์เล็ก
      dataIndex: "p_position", // เปลี่ยนเป็นพิมพ์เล็ก
      align: "center",
      render: (text, record, index) => {
        return text;
      },
      width: 90,
    },
    {
      title: "INSPECT_DATE",
      key: "inspect_date", // เปลี่ยนเป็นพิมพ์เล็ก
      dataIndex: "inspect_date", // เปลี่ยนเป็นพิมพ์เล็ก
      align: "center",
      render: (text, record, index) => {
        return text;
      },
      width: 110,
    },
    {
      title: "LOT_NO",
      dataIndex: "lot_no", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "lot_no",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 110,
    },
    {
      title: "RESULT",
      dataIndex: "result", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "result",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
      width: 70,
    },
    {
      title: "PROGRAM_NAME",
      dataIndex: "program_name", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "program_name",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "IMAGE_PATH",
      key: "image_path", // เปลี่ยนเป็นพิมพ์เล็ก
      dataIndex: "image_path", // เปลี่ยนเป็นพิมพ์เล็ก
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "COMPONENT",
      key: "component", // เปลี่ยนเป็นพิมพ์เล็ก
      dataIndex: "component", // เปลี่ยนเป็นพิมพ์เล็ก
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "CREATE_BY",
      dataIndex: "create_by", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "create_by",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
    },
    {
      title: "CREATE_PROGRAM",
      dataIndex: "create_program", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "create_program",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "CREATE_DATE",
      dataIndex: "create_date", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "create_date",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
  ];
  const columnsAoiResult2 = [
    {
      title: "Link",
      dataIndex: "link", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "link",
      render: (text, record, index) => {
        let modifiedText=''
        if(text!=''){
           modifiedText = text.replace("<a ", '<a target="_blank" '); 
        }
        return (
          <span
            dangerouslySetInnerHTML={{ __html: modifiedText }} 
          />
        );
      },
      align: "center",
      width: 45,
    },
    {
      title: "PLANT_CODE",
      dataIndex: "plant_code", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "plant_code",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
      width: 70,
    },
    {
      title: "SHEET_NO",
      dataIndex: "sheet_no", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "sheet_no",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
      width: 190,
    },
    {
      title: "CABITY_NO",
      key: "cabity_no", // เปลี่ยนเป็นพิมพ์เล็ก
      dataIndex: "cabity_no", // เปลี่ยนเป็นพิมพ์เล็ก
      align: "center",
      render: (text, record, index) => {
        return text;
      },
      width: 70,
    },
    {
      title: "SEQ",
      key: "seq", // เปลี่ยนเป็นพิมพ์เล็ก
      dataIndex: "seq", // เปลี่ยนเป็นพิมพ์เล็ก
      align: "center",
      render: (text, record, index) => {
        return text;
      },
      width: 50,
    },
    {
      title: "INS_COUNT",
      dataIndex: "ins_count", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "ins_count",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 90,
    },
    {
      title: "MACHINE_NAME",
      dataIndex: "machine_name", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "machine_name",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
      width: 90,
    },
    {
      title: "REFERENCE",
      dataIndex: "reference", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "reference",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
      width: 90,
    },
    {
      title: "POSITION",
      key: "position", // เปลี่ยนเป็นพิมพ์เล็ก
      dataIndex: "p_position", // เปลี่ยนเป็นพิมพ์เล็ก
      align: "center",
      render: (text, record, index) => {
        return text;
      },
      width: 90,
    },
    {
      title: "INSPECT_DATE",
      key: "inspect_date", // เปลี่ยนเป็นพิมพ์เล็ก
      dataIndex: "inspect_date", // เปลี่ยนเป็นพิมพ์เล็ก
      align: "center",
      render: (text, record, index) => {
        return text;
      },
      width: 110,
    },
    {
      title: "LOT_NO",
      dataIndex: "lot_no", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "lot_no",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 110,
    },
    {
      title: "RESULT",
      dataIndex: "result", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "result",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
      width: 70,
    },
    {
      title: "PROGRAM_NAME",
      dataIndex: "program_name", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "program_name",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "IMAGE_PATH",
      key: "image_path", // เปลี่ยนเป็นพิมพ์เล็ก
      dataIndex: "image_path", // เปลี่ยนเป็นพิมพ์เล็ก
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "COMPONENT",
      key: "component", // เปลี่ยนเป็นพิมพ์เล็ก
      dataIndex: "component", // เปลี่ยนเป็นพิมพ์เล็ก
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "CREATE_BY",
      dataIndex: "create_by", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "create_by",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
    },
    {
      title: "CREATE_PROGRAM",
      dataIndex: "create_program", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "create_program",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "CREATE_DATE",
      dataIndex: "create_date", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "create_date",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
  ];

  //SPI_Result
  const GetDataSPIResult = async () => {
    let dtCheck = [];
    await axios
      .post("/api/Result/SPIResult_getCheckData", {
        dataList: {
          strProduct: product_name,
          strPlantCode: Fac,
          strPanelNo: panel_no,
        },
      })
      .then((res) => {
        console.log(res.data, "position_v");
        if (res.data.length > 0) {
          dtCheck = res.data[0].position_v;
        }
      });

    await axios
      .post("/api/Result/SPIResult_Getfinaldata", {
        dataList: {
          strPlantCode: Fac,
          strPanelNo: panel_no,
          strProduct: product_name,
          strSheetNo: sheet_no,
          strdtCheck: dtCheck,
          strExport: "0",
        },
      })
      .then((res) => {
        console.log(res.data, "SPIResult_Getfinaldata");
        settblData1(res.data);
      });

    await axios
      .post("/api/Result/SPIResult_Getfinaldata", {
        dataList: {
          strPlantCode: Fac,
          strPanelNo: panel_no,
          strProduct: product_name,
          strSheetNo: sheet_no,
          strdtCheck: dtCheck,
          strExport: "1",
        },
      })
      .then((res) => {
        console.log(res.data, "SPIResult_GetfinaldataExport");
        setDatatblData1(res.data);
      });
  };

  const columnsSPIResult = [
    {
      title: "PLANT_CODE",
      dataIndex: "PLANT_CODE", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "PLANT_CODE",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "SHEET_NO",
      dataIndex: "SHEET_NO", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "SHEET_NO",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "CABITY_NO",
      key: "CABITY_NO", // เปลี่ยนเป็นพิมพ์เล็ก
      dataIndex: "CABITY_NO", // เปลี่ยนเป็นพิมพ์เล็ก
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "PAD_ID",
      key: "PAD_ID", // เปลี่ยนเป็นพิมพ์เล็ก
      dataIndex: "PAD_ID", // เปลี่ยนเป็นพิมพ์เล็ก
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "INS_COUNT",
      dataIndex: "INS_COUNT", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "INS_COUNT",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
    },
    {
      title: "MACHINE_NAME",
      dataIndex: "MACHINE_NAME", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "MACHINE_NAME",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "HEIGHT_UM",
      dataIndex: "HEIGHT_UM", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "HEIGHT_UM",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "VOLUME_P",
      key: "VOLUME_P", // เปลี่ยนเป็นพิมพ์เล็ก
      dataIndex: "VOLUME_P", // เปลี่ยนเป็นพิมพ์เล็ก
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "AREA_P",
      key: "AREA_P", // เปลี่ยนเป็นพิมพ์เล็ก
      dataIndex: "AREA_P", // เปลี่ยนเป็นพิมพ์เล็ก
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "OFFSETX_MM",
      dataIndex: "OFFSETX_MM", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "OFFSETX_MM",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
    },
    {
      title: "OFFSETY_MM",
      dataIndex: "OFFSETY_MM", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "OFFSETY_MM",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "SIZE_X",
      dataIndex: "SIZE_X", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "SIZE_X",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "SIZE_Y",
      key: "SIZE_Y", // เปลี่ยนเป็นพิมพ์เล็ก
      dataIndex: "SIZE_Y", // เปลี่ยนเป็นพิมพ์เล็ก
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "VOLUME_UM3",
      key: "VOLUME_UM3", // เปลี่ยนเป็นพิมพ์เล็ก
      dataIndex: "VOLUME_UM3", // เปลี่ยนเป็นพิมพ์เล็ก
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "AREA_UM2",
      dataIndex: "AREA_UM2", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "AREA_UM2",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
    },
    {
      title: "BARCODE",
      dataIndex: "BARCODE", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "BARCODE",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "PCB_ID",
      dataIndex: "PCB_ID", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "PCB_ID",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "PANEL",
      dataIndex: "PANEL", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "PANEL",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "CARRIERBOARD_NO",
      dataIndex: "CARRIERBOARD_NO", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "CARRIERBOARD_NO",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "POSX",
      dataIndex: "POSX", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "POSX",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "POSY",
      dataIndex: "POSY", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "POSY",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "OFFSETX_ERR",
      dataIndex: "OFFSETX_ERR", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "OFFSETX_ERR",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "OFFSETY_ERR",
      dataIndex: "OFFSETY_ERR", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "OFFSETY_ERR",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "OFFSETX_P",
      dataIndex: "OFFSETX_P", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "OFFSETX_P",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "OFFSETY_P",
      dataIndex: "OFFSETY_P", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "OFFSETY_P",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "INSPECT_DATE",
      dataIndex: "INSPECT_DATE", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "INSPECT_DATE",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "IMAGE_PATH",
      dataIndex: "IMAGE_PATH", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "IMAGE_PATH",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "CREATE_BY",
      dataIndex: "CREATE_BY", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "CREATE_BY",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "CREATE_PROGRAM",
      dataIndex: "CREATE_PROGRAM", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "CREATE_PROGRAM",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "CREATE_DATE",
      dataIndex: "CREATE_DATE", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "CREATE_DATE",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
  ];

  //Pre Result
  const GetDataPreResult = async () => {
    let dt = [];
    let dt2 = [];
    await axios
      .post("/api/Result/PreResult_GetCheck", {
        dataList: {
          strProduct: product_name,
          strPlantCode: Fac,
        },
      })
      .then((res) => {
        console.log(res.data, "position_v2");
        if (res.data.length > 0) {
          dt2 = res.data;
        }
      });
      console.log(dt2.length,'dtdtdtdt')
    if (dt2.length > 0) {
      await axios
        .post("/api/Result/PreResult_GetDataFound", {
          dataList: {
            strPlantCode: Fac,
            strProduct: product_name,
            strSheetNo: sheet_no,
            strPiece_no: piece_no,
          },
        })
        .then((res) => {
  
          if (res.data.length> 0) {
            console.log(res.data, "SPIResult_Getfinaldata000000");
            settblData1(res.data);
            dt = res.data;
          }
        });
    } else {
      await axios
        .post("/api/Result/PreResult_GetDataNotFound", {
          dataList: {
            strPlantCode: Fac,
            strProduct: product_name,
            strSheetNo: sheet_no,
            strPiece_no: piece_no,
          },
        })
        .then((res) => {
          console.log(res.data, "SPIResult_Getfinaldata1");
          if (res.data.length > 0) {
            settblData1(res.data);
            dt = res.data;
          }
        });
      if (dt.length <= 0) {
        await axios
          .post("/api/Result/PreResult_GetDataNotFoundFound", {
            dataList: {
              strPlantCode: Fac,
              strProduct: product_name,
              strSheetNo: sheet_no,
              strPiece_no: piece_no,
            },
          })
          .then((res) => {
            console.log(res.data, "SPIResult_Getfinaldata1");
            if (res.data.length > 0) {
              settblData1(res.data);
              dt = res.data;
            }
          });
      }
      
    }
    setDatatblData1(dt)
  };

  const columnsPreResult = [
    {
      title: "LINK",
      dataIndex: "link", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "LINK",
      align: "center",
      render: (text, record, index) => {
        let modifiedText=''
        if(text!=''){
           modifiedText = text.replace("<a ", '<a target="_blank" '); // เพิ่ม target="_blank"
        }
       
        return (
          <span
            dangerouslySetInnerHTML={{ __html: modifiedText }} // แสดง HTML ที่แก้ไขแล้ว
          />
        );
      },
    },
    {
      title: "PLANT_CODE",
      dataIndex: "prh_plant_code", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "PLANT_CODE",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "SHEET_NO",
      dataIndex: "prh_sheet_no", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "SHEET_NO",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "INS_COUNT",
      key: "INS_COUNT", // เปลี่ยนเป็นพิมพ์เล็ก
      dataIndex: "prh_inspect_count", // เปลี่ยนเป็นพิมพ์เล็ก
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "CIRCUIT_ID",
      key: "CIRCUIT_ID", // เปลี่ยนเป็นพิมพ์เล็ก
      dataIndex: "prh_circuit_id", // เปลี่ยนเป็นพิมพ์เล็ก
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "MACHINE_NAME",
      dataIndex: "prh_machine_id", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "MACHINE_NAME",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
    },
    {
      title: "SIZE_X",
      dataIndex: "prh_size_x", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "SIZE_X",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "SIZE_Y",
      dataIndex: "prh_size_y", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "SIZE_Y",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "PROGRAM_NO",
      key: "PROGRAM_NO", // เปลี่ยนเป็นพิมพ์เล็ก
      dataIndex: "prh_program_no", // เปลี่ยนเป็นพิมพ์เล็ก
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "PROGRAM_ID",
      key: "PROGRAM_ID", // เปลี่ยนเป็นพิมพ์เล็ก
      dataIndex: "prh_program_id", // เปลี่ยนเป็นพิมพ์เล็ก
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "INSPECT_CNT_LOT",
      dataIndex: "prh_inspect_cnt_lot", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "INSPECT_CNT_LOT",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
    },
    {
      title: "PIC_X1",
      dataIndex: "prh_pic_x1", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "PIC_X1",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "PIC_X2",
      dataIndex: "prh_pic_x2", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "PIC_X2",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "PIC_Y1",
      key: "PIC_Y1", // เปลี่ยนเป็นพิมพ์เล็ก
      dataIndex: "prh_pic_y1", // เปลี่ยนเป็นพิมพ์เล็ก
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "PIC_Y2",
      key: "PIC_Y2", // เปลี่ยนเป็นพิมพ์เล็ก
      dataIndex: "prh_pic_y2", // เปลี่ยนเป็นพิมพ์เล็ก
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "RESULT",
      dataIndex: "prh_result", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "RESULT",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
    },
    {
      title: "PIC_FILENAME",
      dataIndex: "prh_pic_filename", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "PIC_FILENAME",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "INSPECT_DATE",
      dataIndex: "prh_inspect_date", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "INSPECT_DATE",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "CABITY_NO",
      dataIndex: "cabity_no", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "CABITY_NO",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "SEQ",
      dataIndex: "prd_seq", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "SEQ",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "NG_DETAIL",
      dataIndex: "prd_ng_detail", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "NG_DETAIL",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "BLOCK_NO",
      dataIndex: "prd_block_no", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "BLOCK_NO",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "STEP_NO",
      dataIndex: "prd_step_no", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "STEP_NO",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "REFER",
      dataIndex: "prd_refer", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "REFER",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "LIB_PART_NAME",
      dataIndex: "prd_lib_part_name", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "LIB_PART_NAME",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "STEP_POS",
      dataIndex: "prd_step_pos", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "STEP_POS",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "STEP_X2",
      dataIndex: "prd_step_x2", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "STEP_X2",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "STEP_Y1",
      dataIndex: "prd_step_y1", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "STEP_Y1",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "STEP_Y2",
      dataIndex: "prd_step_y2", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "STEP_Y2",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "MEASURE_NUM",
      dataIndex: "prd_measure_num", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "MEASURE_NUM",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "CREATE_BY",
      dataIndex: "prh_create_by", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "CREATE_BY",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "CREATE_PROGRAM",
      dataIndex: "prh_create_program", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "CREATE_PROGRAM",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "CREATE_DATE",
      dataIndex: "prh_create_date", // เปลี่ยนเป็นพิมพ์เล็ก
      key: "CREATE_DATE",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
  ];

  //OST Result
  const GetDataOSTResult = async () => {
    let dataOst=[]
    let OST=[]
    let OST_BAD=[]
    let dt=[]
    let dtB=[]
    await axios
      .post("/api/Result/OSTResult_GetData1", {
        dataList: {
          SHEET_NO: sheet_no
        },
      })
      .then((res) => {
        console.log(res.data,'OST111');
        OST=res.data
      });
      if(OST.length>0){
        let strArr=[]
        let strArrResult=[]
        for(let i =0;i<OST.length;i++){
          if(OST[i].RESULT!=null){
            if (OST[i].RESULT.substring(0, 3).toUpperCase() === "PIN") {
              strArr = OST[i].RESULT.split(",");
            } else {
              strArrResult = OST[i].RESULT.split(",");
            }
          }
        }
        console.log(strArr,strArrResult,'strArr')
        for (let i = 0; i <= strArr.length - 1; i++) {
          if (strArr[i].toUpperCase().includes("PIECE")) {
            const drRow = {
              SEQ: parseInt(strArr[i].toUpperCase().replace("PIECE ", "")),
              RESULT: strArrResult[i]
            }
          
            dt.push(drRow); 
          }
        }
      }
      // -------------------------------------------------------------------


      //BADMARK
      await axios
      .post("/api/Result/OSTResult_GetData2", {
        dataList: {
          SHEET_NO: sheet_no
        },
      })
      .then((res) => {
        console.log(res.data,'OST222');
        OST_BAD=res.data
      });
      if(OST_BAD.length>0){
        let strArr
        for (let i = 0; i < OST_BAD.length; i++) {
          let dr = dt[i];
          if (dr.TOSB_RESULT !== null) {
            let strArr = dr.TOSB_RESULT.toString().split(",");
            
            if (strArr.length >= 2) {
              const drRow = {
                SEQ:strArr[0],
                RESULT: strArr[1]
              }
              dt.push(drRow); 
            }
        }
      }
      }
      let drNews=[]
      if(dt.length>dtB.length){
        drNews=dt
      }
      else{
        drNews=dtB
      }
      
      console.log(dt,dtB,'bbbbbbb')
      settblData1(drNews);
      setDatatblData1(drNews);
  };

  const columnsOSTResult = [
   
    {
      title: "CAVITY",
      dataIndex: "SEQ",
      key: "CAVITY",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "OST",
      dataIndex: "OST_RESULT", 
      key: "OST",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "BADMARK",
      key: "BADMARK_RESULT", 
      dataIndex: "prh_inspect_count",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    
    
  ]
  //XRAY_Result  
  const GetDataXrayResult = async () => {
    await axios
      .post("/api/Result/XrayResult", {
        dataList: {
          strsheetno: sheet_no,
          strserialno: serial_no,
          inspectno:panel_no === '' ? null : INSPECT_NO,
          inspectdate: INSPECT_DATE,
        },
      })
      .then((res) => {
        console.log(res.data,'GetDataXrayResult');
        settblData1(res.data);
        setDatatblData1(res.data);
      });
  };

  const columnsXrayResult = [
   
    {
      title: "TSX_PRODUCT",
      dataIndex: "TSX_PRODUCT",
      key: "TSX_PRODUCT",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "LOT NO.",
      dataIndex: "TSX_LOT", 
      key: "LOT NO.",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "TSX_SHEET_NO",
      key: "TSX_SHEET_NO", 
      dataIndex: "TSX_SERIAL",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "TSX_INSPECTION_NO",
      key: "TSX_INSPECTION_NO", 
      dataIndex: "TSX_INSPECTION_NO",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "TSX_SAMPLE_NO",
      key: "TSX_SAMPLE_NO", 
      dataIndex: "TSX_SAMPLE_NO",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "TSX_BLOCK_NO",
      key: "TSX_BLOCK_NO", 
      dataIndex: "TSX_BLOCK_NO",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "TSX_MC",
      key: "TSX_MC", 
      dataIndex: "TSX_MC",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "TSX_TIME_OUT",
      key: "TSX_TIME_OUT", 
      dataIndex: "TSX_TIME_OUT",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "TSX_PROGRAM",
      key: "TSX_PROGRAM", 
      dataIndex: "TSX_PROGRAM",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "TSX_RESULT_PIECE",
      key: "TSX_RESULT_PIECE", 
      dataIndex: "TSX_RESULT_2",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "TSX_RESULT_SHEET",
      key: "TSX_RESULT_SHEET", 
      dataIndex: "TSX_RESULT",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "TSX_MC_BRAND",
      key: "TSX_MC_BRAND", 
      dataIndex: "TSX_MC_BRAND",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    
    
  ]

  //Export--------------------------------------------------------------------------
  const BtnExport = async () => {
    let nameFile=''
    if (tblData1.length <= 0) {
      Swal.fire({
        icon: "error",
        title: "No Data Export!",
      });
    } else {
      console.log(nameFile, "nameFile");
      let formattedNow = Now.getFullYear().toString() + 
      (Now.getMonth() + 1).toString().padStart(2, '0') +  // เดือนเริ่มต้นที่ 0 ต้องบวก 1
      Now.getDate().toString().padStart(2, '0') + 
      Now.getHours().toString().padStart(2, '0') + 
      Now.getMinutes().toString().padStart(2, '0') + 
      Now.getSeconds().toString().padStart(2, '0');
      nameFile=`${Page.replace(/Result2?|/g, "")}_${formattedNow}.csv`
      exportExcelFile(ColumntblData1,DatatblData1, nameFile);
    }
  };

  const exportExcelFile = (HeaderColumn, data, namefile) => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("My Sheet");
    sheet.properties.defaultRowHeight = 20;
  

    const dynamicColumns = HeaderColumn.map(col => ({
      header: col.title.toUpperCase(), 
      key: col.dataIndex,
      width: 10, 
      style: { alignment: { horizontal: "center" } },
    }));
  
    sheet.columns = dynamicColumns;
  

    if (data.length === 0) {
      const emptyRow = {};
      dynamicColumns.forEach((col) => (emptyRow[col.dataIndex] = "")); // เติมค่าค่าว่าง
      data.push(emptyRow);
    }
  

    data.forEach((row) => {
      const newRow = sheet.addRow(row);
      newRow.eachCell({ includeEmpty: true }, (cell) => {
        cell.alignment = { horizontal: "center" };
  
   
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
    });
  

    const firstRow = sheet.getRow(1);
    firstRow.eachCell({ includeEmpty: true }, (cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFF00" }, 
      };
      cell.font = {
        name: "Roboto",
        size: 9,
        bold: true,
      };
  
     
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });
  
   
    sheet.columns.forEach((column) => {
      let maxWidth = column.header.length; 
      data.forEach((row) => {
        const cellValue = String(row[column.key] || ""); 
        maxWidth = Math.max(maxWidth, cellValue.length); 
      });
      column.width = maxWidth + 2; 
    });
  

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: "application/octet-stream" });
      saveAs(blob, `${namefile}`);
    });
  };

  return { tblData1, ColumntblData1, BtnExport,Page ,sheet_no};
}

export { fn_Result };
