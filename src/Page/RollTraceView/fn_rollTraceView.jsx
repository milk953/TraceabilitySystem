import axios from "axios";
import { set } from "lodash";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

function fn_rollTraceView() {
  const [Product, setProduct] = useState("");
  const [RollNo, setRollNo] = useState("");
  const [LotNo, setLotNo] = useState("");
  const [RollSheetNo, setRollSheetNo] = useState("");
  const [RollLeafTextFiled, setRollLeafTextFiled] = useState("");
  const [gvResult, setGvResult] = useState([]);
  const [gvResultState, setgvResultState] = useState(false);
  const params = new URLSearchParams(window.location.search);
  const lot = params.get("ROLLLEAF");
  useEffect(() => {
    if (RollLeafTextFiled == "") {
      setFocus("RollLeafTextFiledFirst");
    }
    if(lot !== '' && lot !== null){
      setRollLeafTextFiled(lot);
      searchData();
    }
  }, [RollLeafTextFiled]);
  function setFocus(id) {
    document.getElementById(id).focus();
  }
  async function removeURLParameter(parameter) {
    const url = new URL(window.location);
    url.searchParams.delete(parameter);
    window.history.pushState({}, '', url);
  }
  async function enterBtn() {
    if (RollLeafTextFiled === "") {
      alert("Please Input Roll Leaf");
      setFocus("RollLeafTextFiledFirst");
    } else {
      searchData();
    }
  }

  const clearViwe = () => {
    removeURLParameter('ROLLLEAF');
    setgvResultState(false);
    setRollLeafTextFiled("");
    setProduct("");
    setRollNo("");
    setLotNo("");
    setRollSheetNo("");
    setGvResult([]);
  };
  async function searchData() {
    let dtLeft = await getData("fnLotRollLeafData", RollLeafTextFiled);
    if (dtLeft == []) {
      setRollLeafTextFiled("");
      Swal.fire("Roll Leaf No. Not Found", '', "error");
      setFocus("RollLeafTextFiledFirst");
      await removeURLParameter('ROLLLEAF');
      return ;
    }
    setGvResult(dtLeft);
    setgvResultState(true);

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
      title: <div style={{ textAlign: "center" }}>Sheet No.</div>,
      dataIndex: "sheet_no",
      key: "sheet_no",
      align: "left",
      width: 80,
      render: (text, record, index) => {
        return (
          <a href={`SheetTraceView?SHEETNO=${text}`} target="_blank">
            {text}
          </a>
        );
      },
    },
    {
      title: <div style={{ textAlign: "center" }}>Operator</div>,
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
    clearViwe,
  };
}

export { fn_rollTraceView };
