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

function fn_LotSheetNo() {
  const [txtProd, settxtProd] = useState("");
  const [txtLotNo, settxtLotNo] = useState('');
  const [tblFrontSheet, settblFrontSheet] = useState('');
  const [tblBackSheet, settblBackSheet] = useState('');
  //tblBackSheet

  //link
  const params = new URLSearchParams(window.location.search);
  const lot = params.get("lot");
  const Prod = params.get("product");
  const Fac = import.meta.env.VITE_FAC;

  //เข้ามาแล้วSearch
  useEffect(() => {
  if(lot==null){
    reset()
  }else{
    settxtLotNo(lot)
    settxtProd(Prod)
    setGrid(lot)
  }
  }, []);

  const reset = async () => {
    settxtProd("_ _ _ _ _ _ _ _ _ _ _ _");
    settxtLotNo("_ _ _ _ _ _ _ _ _ _ _ _");
  };

  const setGrid = async (strlot) => {
   
    // let dtFront = [];
    // await axios
    //   .post("/api/ViewTraceLot/fnLotSheetFrontData", {
    //     strLOTNO: strlot,
    //   })
    //   .then((res) => {
    //     for (let i = 0; i < res.data.length; i += 5) {
    //       dtFront.push(res.data.slice(i, i + 5));
    //     }

    //     dtFront = dtFront.map((group, index) => {
    //       return {
    //         key: index,
    //         FRONTSHEET1: group[0] ? group[0].FRONT_SHEET_NO  : "",
    //         FRONTSHEET2: group[1] ? group[1].FRONT_SHEET_NO  : "",
    //         FRONTSHEET3: group[2] ? group[2].FRONT_SHEET_NO  : "",
    //         FRONTSHEET4: group[3] ? group[3].FRONT_SHEET_NO  : "",
    //         FRONTSHEET5: group[4] ? group[4].FRONT_SHEET_NO  : "",
    //       };
    //     });

    //     settblFrontSheet(dtFront);
    //   });
      let dtBack = [];
      await axios
      .post("/api/ViewTraceLot/fnLotSheetData", {
        strLOTNO: strlot,
      })
      .then((res) => {
        for (let i = 0; i < res.data.length; i += 5) {
          dtBack.push(res.data.slice(i, i + 5));
        }

        dtBack = dtBack.map((group, index) => {
          return {
            key: index,
            BACKSHEET1: group[0] ? group[0].BACK_SHEET_NO : "",
            BACKSHEET2: group[1] ? group[1].BACK_SHEET_NO : "",
            BACKSHEET3: group[2] ? group[2].BACK_SHEET_NO : "",
            BACKSHEET4: group[3] ? group[3].BACK_SHEET_NO : "",
            BACKSHEET5: group[4] ? group[4].BACK_SHEET_NO : "",
            FRONTSHEET1: group[0] ? group[0].FRONT_SHEET_NO  : "",
            FRONTSHEET2: group[1] ? group[1].FRONT_SHEET_NO  : "",
            FRONTSHEET3: group[2] ? group[2].FRONT_SHEET_NO  : "",
            FRONTSHEET4: group[3] ? group[3].FRONT_SHEET_NO  : "",
            FRONTSHEET5: group[4] ? group[4].FRONT_SHEET_NO  : "",
          };
        });

        settblBackSheet(dtBack);
      });
  };
  const createLink= (text) => {
    return (
      <a
        href={`/TraceabilitySystem/SheetTraceView?SHEETNO=${text}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {text}
      </a>
    );
  };

  const columnsFRONT= [
    {
      title: "FRONT-SHEET-NO. 1",
      dataIndex: "FRONTSHEET1",
      key: "FRONT-SHEET-NO. 1",
      render: (text, record, index) => {
        return createLink(text);
      },
      align: "center",
    },
    {
      title: "FRONT-SHEET-NO. 2",
      dataIndex: "FRONTSHEET2",
      key: "FRONT-SHEET-NO. 2",
      align: "center",
      render: (text, record, index) => {
        return createLink(text);
      },
    },
    {
      title: "FRONT-SHEET-NO. 3",
      dataIndex: "FRONTSHEET3",
      key: "FRONT-SHEET-NO. 3",
      align: "center",
      render: (text, record, index) => {
        return createLink(text);
      },
    },

    {
      title: "FRONT-SHEET-NO. 4",
      key: "LEAF-NO. 4",
      dataIndex: "FRONTSHEET4",
      align: "center",
      render: (text, record, index) => {
        return createLink(text);
      },
    },
    {
      title: "FRONT-SHEET-NO. 5",
      key: "FRONT-SHEET-NO. 5",
      dataIndex: "FRONTSHEET5",
      align: "center",
      render: (text, record, index) => {
        return createLink(text);
      },
    },
  ];

  const columnsBACK= [
    {
      title: "BACK-SHEET-NO. 1",
      dataIndex: "BACKSHEET1",
      key: "BACK-SHEET-NO. 1",
      render: (text, record, index) => {
        return createLink(text);
      },
      align: "center",
    },
    {
      title: "BACK-SHEET-NO. 2",
      dataIndex: "BACKSHEET2",
      key: "BACK-SHEET-NO. 2",
      align: "center",
      render: (text, record, index) => {
        return createLink(text);
      },
    },
    {
      title: "BACK-SHEET-NO. 3",
      dataIndex: "BACKSHEET3",
      key: "BACK-SHEET-NO. 3",
      align: "center",
      render: (text, record, index) => {
        return createLink(text);
      },
    },

    {
      title: "BACK-SHEET-NO. 4",
      key: "BACK-SHEET-NO. 4",
      dataIndex: "BACKSHEET4",
      align: "center",
      render: (text, record, index) => {
        return createLink(text);
      },
    },
    {
      title: "BACK-SHEET-NO. 5",
      key: "BACK-SHEET-NO. 5",
      dataIndex: "BACKSHEET5",
      align: "center",
      render: (text, record, index) => {
        return createLink(text);
      },
    },
  ];
  const columns = [
    {
      title: "SHEET No.1",
      children: [
        {
          title: "FRONT-SHEET",
          dataIndex: "FRONTSHEET1",
          key: "FRONT-SHEET",
          render: (text, record, index) => {
            return createLink(text);
          },
          align: "center",
        },
        {
          title: "BACK-SHEET",
          dataIndex: "BACKSHEET1",
          key: "BACK-SHEET",
          render: (text, record, index) => {
            return createLink(text);
          },
          align: "center",
        },
      ],
    },
    {
      title: "SHEET No.2",
      children: [
        {
          title: "FRONT-SHEET",
          dataIndex: "FRONTSHEET2",
          key: "FRONT-SHEET",
          render: (text, record, index) => {
            return createLink(text);
          },
          align: "center",
        },
        {
          title: "BACK-SHEET ",
          dataIndex: "BACKSHEET2",
          key: "BACK-SHEET-NO",
          render: (text, record, index) => {
            return createLink(text);
          },
          align: "center",
        },
      ],
    },
    {
      title: "SHEET No.3",
      children: [
        {
          title: "FRONT-SHEET",
          dataIndex: "FRONTSHEET3",
          key: "FRONT-SHEET",
          render: (text, record, index) => {
            return createLink(text);
          },
          align: "center",
        },
        {
          title: "BACK-SHEET",
          dataIndex: "BACKSHEET3",
          key: "BACK-SHEET",
          render: (text, record, index) => {
            return createLink(text);
          },
          align: "center",
        },
      ],
    },
    {
      title: "SHEET No.4",
      children: [
        {
          title: "FRONT-SHEET",
          dataIndex: "FRONTSHEET4",
          key: "FRONT-SHEET",
          render: (text, record, index) => {
            return createLink(text);
          },
          align: "center",
        },
        {
          title: "BACK-SHEET",
          dataIndex: "BACKSHEET4",
          key: "BACK-SHEET",
          render: (text, record, index) => {
            return createLink(text);
          },
          align: "center",
        },
      ],
    },
    {
      title: "SHEET No.5",
      children: [
        {
          title: "FRONT-SHEET",
          dataIndex: "FRONTSHEET5",
          key: "FRONT-SHEET",
          render: (text, record, index) => {
            return createLink(text);
          },
          align: "center",
        },
        {
          title: "BACK-SHEET",
          dataIndex: "BACKSHEET5",
          key: "BACK-SHEET",
          render: (text, record, index) => {
            return createLink(text);
          },
          align: "center",
        },
      ],
    },
  ];
  // const columnsExport = [
  //   {
  //     key: "SHR_PLANT_CODE",
  //   },
  //   {
  //     key: "SHR_LOT_NO",
  //   },
  //   {
  //     key: "SHR_ROLL_NO",
  //   },
  //   {
  //     key: "SHR_ROLL_LEAF",
  //   },
  //   {
  //     key: "SHR_SHEET_NO",
  //   },
  //   {
  //     key: "SHR_SHEET_SEQ",
  //   },
  //   {
  //     key: "SHR_SEQ_NO",
  //   },
  //   {
  //     key: "SHR_PRODUCT_NAME",
  //   },
  //   {
  //     key: "SHR_MACHINE_NAME",
  //   },
  //   {
  //     key: "SHR_INS_DATE",
  //   },
  //   {
  //     key: "SHR_OPERATOR",
  //   },
  //   {
  //     key: "SHR_CONFIRM_FLG",
  //   },
  //   {
  //     key: "SHR_CONFIRM_REMARK",
  //   },
  //   {
  //     key: "SHR_CONFIRM_DATE",
  //   },
  //   {
  //     key: "SHR_PACKING_FLG",
  //   },
  //   {
  //     key: "SHR_PACKING_DATE",
  //   },
  //   {
  //     key: "SHR_CREATE_BY",
  //   },
  //   {
  //     key: "SHR_CREATE_PROGRAM",
  //   },
  //   {
  //     key: "SHR_CREATE_DATE",
  //   },
  //   {
  //     key: "SHR_UPDATE_BY",
  //   },
  //   {
  //     key: "SHR_UPDATE_PROGRAM",
  //   },
  //   {
  //     key: "SHR_UPDATE_DATE",
  //   },
  // ];

  // const ExportGridToCSV = (data, ColumnsHeader, namefile) => {


  //   const filteredColumns = ColumnsHeader.filter(
  //     (col) => col.key && col.key !== null && col.key !== undefined
  //   );

  //   const headers = filteredColumns.map((col) => col.key);

  //   const filteredData = data.map((row) =>
  //     filteredColumns.map((col) => {
  //       const value = row[col.key];

  //       return value === null || value === "[NULL]" || value === undefined
  //         ? ""
  //         : value;
  //     })
  //   );

  //   const wsData = [headers, ...filteredData];
  //   const ws = XLSX.utils.aoa_to_sheet(wsData);
  //   const wb = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  //   const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

  //   const blobData = new Blob([excelBuffer], {
  //     type: "application/octet-stream",
  //   });

  //   saveAs(blobData, namefile);
  // };

  return { tblBackSheet,tblFrontSheet, txtProd, txtLotNo, columnsBACK,columnsFRONT,columns };
}

export { fn_LotSheetNo };
