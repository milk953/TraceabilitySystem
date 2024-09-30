import axios from "axios";
import { set } from "lodash";
import React, { useState } from "react";

function fn_rollTraceView() {
  const [Product, setProduct] = useState("");
  const [RollNo, setRollNo] = useState("");
  const [LotNo, setLotNo] = useState("");
  const [RollSheetNo, setRollSheetNo] = useState("");
  const [RollLeafTextFiled, setRollLeafTextFiled] = useState("");
  const [gvResult, setGvResult] = useState([]);
  const [gvResultState, setgvResultState] = useState(false);

  async function enterBtn() {
    console.log(RollLeafTextFiled);
    searchData();
  }
  function clearViwe() {
    setProduct("Pond");
    setRollNo("");
    setLotNo("");
    setRollSheetNo("");
    setRollLeafTextFiled("");
    setGvResult([]);
  }
  async function searchData() {
    let dtLeft = await getData("fnLotRollLeafData", RollLeafTextFiled);
    setGvResult(dtLeft);
    setgvResultState(true);
    console.log(dtLeft);

    if (dtLeft != "") {
      let dtLot = await getData("fnLotNoByRoll", dtLeft[0].lot_no);
      if (dtLot != "") setProduct(dtLot[0].LOT_PRD_NAME);
      if (dtLeft[0].lot_no !== dtLeft[0].roll_no) {
        setRollNo(dtLeft[0].roll_no);
      } else {
        setRollNo();
      }
      setLotNo(dtLeft[0].lot_no);
      setRollSheetNo(dtLeft[0].roll_sheet);
    }
  }
  async function getData(type, params) {
    if (type == "fnLotRollLeafData") {
      let dtData = [];
      await axios
        .get("/api/common/fnGetLotRollLeafData?strrollno=" + params)
        .then((response) => {
          dtData = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
      return dtData;
    } else if (type == "fnLotNoByRoll") {
      let dtData = [];
      await axios
        .post("/api/common/fnGetLotData", { strLOTNO: params })
        .then((response) => {
          dtData = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
      return dtData;
    }
  }
  const columns = [
    {
      title: "No.",
      dataIndex: "sheet_seq",
      key: "sheet_seq",
      align: "center",
      width: 80,
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: <div style={{ textAlign: 'center' }}>Sheet No.</div>,
      dataIndex: "sheet_no",
      key: "sheet_no",
      align: "left",
      width: 80,
      render: (text, record, index) => {
        return <a href={`rpt_SheetTraceView?SHEETNO=${text}`} target='#'>{text}</a>; // รอแก้
      },
    },
    {
        title: <div style={{ textAlign: 'center' }}>Operator</div>,
      dataIndex: "operator",
      key: "operator",
      align: "left",
      width: 80,
      render: (text, record, index) => {
        return text;
      },
    },

    {
      title: "Date",
      dataIndex: "update_date",
      key: "update_date",
      align: "center",
      width: 150,
      render: (text, record, index) => {
        return <div style={{ textAlign: "center" }}>{text}</div>;
      },
    },
  ];
  return {
    Product,
    RollNo,
    LotNo,
    RollSheetNo,
    setRollLeafTextFiled,
    RollLeafTextFiled,
    enterBtn,
    gvResultState,
    gvResult,
    columns,
  };
}

export { fn_rollTraceView };
