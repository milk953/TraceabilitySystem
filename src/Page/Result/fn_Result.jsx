import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Tag } from "antd";
import { Tooltip, Avatar } from "antd";
import excel from "/src/assets/excel.png";
import ExcelJS  from "exceljs"
import { values } from "lodash";
import Column from "antd/es/table/Column";

function fn_Result() {

  const [txtLotNo, settxtLotNo] = useState('');
  const [tblData1, settblData1] = useState('');
  const [ColumntblData1, setColumntblData1] = useState([]);


  const Fac = import.meta.env.VITE_FAC;
  const params = new URLSearchParams(window.location.search);
  const Url = window.location.href;  
  const Page = Url.split('/').pop().split('?')[0];
  let sheet_no = params.get("sheet_no");
  let panel_no = params.get("panel_no");
  let PRODUCT_NAME = params.get("PRODUCT_NAME");

  //เข้ามาแล้วSearch
  useEffect(() => {
    if(panel_no==''){
      panel_no=null
    }
    if(Page=='AOICOAResult2'){
        GetDataAOICOAResult()
        setColumntblData1(columnsAoiCoaResult2)
    }
    else if(Page=='SPIResult'){

    }

  }, []);



  const GetDataAOICOAResult = async () => {
    await axios
      .post("/api/ViewTraceSheet/GetAoi_Coa_Result2", {
        dataList:{        
          PRODUCT_NAME: PRODUCT_NAME,
          plant_code: Fac,
          panel_no: panel_no,
          sheet_no: sheet_no,}
      })
      .then((res) => {
       console.log(res.data)
       settblData1(res.data);
     
      });
   
  };

  const BtnExport = async (nameFile) => {
    if(tblData1.length<=0){
      Swal.fire({
        icon: "error",
        title:  "No Data Export!",
      });
  }
  else{
    // let nameFile ='AOI_'+Now+'.Csv'
    console.log(nameFile,'nameFile')
    ExportGridToCSV(tblData1,ColumntblData1,nameFile) //ชื่อไฟล์ยังไม่ถูก
  }
}


 //Use
  // const columnstblData1= [
  //   {
  //     title: "Link",
  //     dataIndex: "LINK",
  //     key: "Link",
  //     render: (text, record, index) => {
  //       return text;
  //     },
  //     align: "center",
  //     width:45
  //   },
  //   {
  //     title: "PLANT_CODE",
  //     dataIndex: "PLANT_CODE",
  //     key: "PLANT_CODE",
  //     align: "center",
  //     render: (text, record, index) => {
  //       return text;
  //     },
  //   },
  //   {
  //     title: "SHEET_NO",
  //     dataIndex: "SHEET_NO",
  //     key: "SHEET_NO",
  //     align: "center",
  //     render: (text, record, index) => {
  //       return text;
  //     },
  //   },

  //   {
  //     title: "CABITY_NO",
  //     key: "CABITY_NO",
  //     dataIndex: "CABITY_NO",
  //     align: "center",
  //     render: (text, record, index) => {
  //       return text;
  //     },
  //   },
  //   {
  //     title: "SEQ",
  //     key: "SEQ",
  //     dataIndex: "SEQ",
  //     align: "center",
  //     render: (text, record, index) => {
  //       return text;
  //     },
  //     width:50
  //   },
  //   {
  //     title: "INS_COUNT",
  //     dataIndex: "INS_COUNT",
  //     key: "INS_COUNT",
  //     render: (text, record, index) => {
  //       return text;
  //     },
  //     align: "center",
  //   },
  //   {
  //     title: "MACHINE_NAME",
  //     dataIndex: "MACHINE_NAME",
  //     key: "MACHINE_NAME",
  //     align: "center",
  //     render: (text, record, index) => {
  //       return text;
  //     },
  //   },
  //   {
  //     title: "REFERENCE",
  //     dataIndex: "REFERENCE",
  //     key: "REFERENCE",
  //     align: "center",
  //     render: (text, record, index) => {
  //       return text;
  //     },
  //   },

  //   {
  //     title: "POSITION",
  //     key: "POSITION",
  //     dataIndex: "POSITION",
  //     align: "center",
  //     render: (text, record, index) => {
  //       return text;
  //     },
  //   },
  //   {
  //     title: "INSPECT_DATE",
  //     key: "INSPECT_DATE",
  //     dataIndex: "INSPECT_DATE",
  //     align: "center",
  //     render: (text, record, index) => {
  //       return text;
  //     },
  //   },
  //   {
  //     title: "LOT_NO",
  //     dataIndex: "LOT_NO",
  //     key: "LOT_NO",
  //     render: (text, record, index) => {
  //       return text;
  //     },
  //     align: "center",
  //   },
  //   {
  //     title: "RESULT",
  //     dataIndex: "RESULT",
  //     key: "RESULT",
  //     align: "center",
  //     render: (text, record, index) => {
  //       return text;
  //     },
  //     width:70
  //   },
  //   {
  //     title: "PROGRAM_NAME",
  //     dataIndex: "PROGRAM_NAME",
  //     key: "PROGRAM_NAME",
  //     align: "center",
  //     render: (text, record, index) => {
  //       return text;
  //     },
  //   },

  //   {
  //     title: "IMAGE_PATH",
  //     key: "IMAGE_PATH",
  //     dataIndex: "IMAGE_PATH",
  //     align: "center",
  //     render: (text, record, index) => {
  //       return text;
  //     },
  //   },
  //   {
  //     title: "COMPONENT",
  //     key: "COMPONENT",
  //     dataIndex: "COMPONENT",
  //     align: "center",
  //     render: (text, record, index) => {
  //       return text;
  //     },
  //   },
  //   {
  //     title: "CREATE_BY",
  //     dataIndex: "CREATE_BY",
  //     key: "CREATE_BY",
  //     render: (text, record, index) => {
  //       return text;
  //     },
  //     align: "center",
  //   },
  //   {
  //     title: "CREATE_PROGRAM",
  //     dataIndex: "CREATE_PROGRAM",
  //     key: "CREATE_PROGRAM",
  //     align: "center",
  //     render: (text, record, index) => {
  //       return text;
  //     },
  //   },
  //   {
  //     title: "CREATE_DATE",
  //     dataIndex: "CREATE_DATE",
  //     key: "CREATE_DATE",
  //     align: "center",
  //     render: (text, record, index) => {
  //       return text;
  //     },
  //   },

  // ];

  //test
 
 
  const columnsAoiCoaResult2 = [
    {
        title: "Link",
        dataIndex: "link", // เปลี่ยนเป็นพิมพ์เล็ก
        key: "link",
        render: (text, record, index) => {
            return text;
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
        width:70
    },
    {
        title: "SHEET_NO",
        dataIndex: "sheet_no", // เปลี่ยนเป็นพิมพ์เล็ก
        key: "sheet_no",
        align: "center",
        render: (text, record, index) => {
            return text;
        },
        width:190
    },
    {
        title: "CABITY_NO",
        key: "cabity_no", // เปลี่ยนเป็นพิมพ์เล็ก
        dataIndex: "cabity_no", // เปลี่ยนเป็นพิมพ์เล็ก
        align: "center",
        render: (text, record, index) => {
            return text;
        },
        width:70
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
        width:90
    },
    {
        title: "MACHINE_NAME",
        dataIndex: "machine_name", // เปลี่ยนเป็นพิมพ์เล็ก
        key: "machine_name",
        align: "center",
        render: (text, record, index) => {
            return text;
        },
        width:90
    },
    {
        title: "REFERENCE",
        dataIndex: "reference", // เปลี่ยนเป็นพิมพ์เล็ก
        key: "reference",
        align: "center",
        render: (text, record, index) => {
            return text;
        },
        width:90
    },
    {
        title: "POSITION",
        key: "position", // เปลี่ยนเป็นพิมพ์เล็ก
        dataIndex: "position", // เปลี่ยนเป็นพิมพ์เล็ก
        align: "center",
        render: (text, record, index) => {
            return text;
        },
        width:90
    },
    {
        title: "INSPECT_DATE",
        key: "inspect_date", // เปลี่ยนเป็นพิมพ์เล็ก
        dataIndex: "inspect_date", // เปลี่ยนเป็นพิมพ์เล็ก
        align: "center",
        render: (text, record, index) => {
            return text;
        },
        width:110
    },
    {
        title: "LOT_NO",
        dataIndex: "lot_no", // เปลี่ยนเป็นพิมพ์เล็ก
        key: "lot_no",
        render: (text, record, index) => {
            return text;
        },
        align: "center",
        width:110
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


  const ExportGridToCSV = (data, ColumnsHeader, namefile) => {
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
    Swal.fire({
      icon: "success",
      title:  "CSV export Complete.",
    });
  };


  return {tblData1,ColumntblData1,BtnExport};
}

export { fn_Result };
