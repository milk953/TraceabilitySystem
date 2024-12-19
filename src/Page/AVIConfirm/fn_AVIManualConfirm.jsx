import axios from "axios";
import { set } from "lodash";
import React, { useEffect, useRef, useState } from "react";

function fn_AVIManualConfirm() {
  
  const plantCode = import.meta.env.VITE_FAC;
  const [eltType, setEltType] = useState([]);
  const [eltTypeSelect, setEltTypeSelect] = useState("");
  const [eltTypeState, setEltTypeState] = useState({
    styled: {
      disable: false,
      backgroundColor: "white",
    },
  });
  const [username, setUsername] = useState("");
  const [lblResult, setLblResult] = useState("");
  const [result, setResult] = useState([]);
  const [pieceNo, setPieceNo] = useState("");
  const pieceNoRef = useRef(null);
  const [resultState, setResultState] = useState(false);
  const [ip, setIp] = useState("");
  const [resultSelect, setResultSelect] = useState("--- SELECT ---");
  const [getSearchData, setGetSearchData] = useState([]);
  const [seq, setSeq] = useState(1);
  const [updateFlg, setUpdateFlg] = useState(false);
  const [lblResultState, setLblResultState] = useState(false);
  // const [dataNotfound, setDataNotfound] = useState([]);
  let dataNotfound = [];
  let SearchDataTest = [];
  useEffect(() => {
    Pageload();
    setUsername(localStorage.getItem("IDCode") || "");
    setIp(localStorage.getItem("ipAddress") || "");
  }, []);
  async function Pageload() {
    await getData("getELTType", "");
  }
  const btnRetrieveClick = async () => {
    if (pieceNo == "") {
      // Swal.fire({
      //   title: "Please input serial no.",
      //   icon: "warning",
      //   showConfirmButton: false,
      //   timer: 1500,
      // });
      return;
    } else {
      setResultState(true);
      setEltTypeState({
        styled: { disable: true, backgroundColor: "#B2A8A8" },
      });
      await SearchData();
      setPieceNo("");
    }
  };
  const handleResultSelect = (e) => {
    setResultSelect(e);
  };
  const btnSubmitClick = async () => {
    setLblResult("");
    setLblResultState(false);
    if (resultSelect == "" || resultSelect == "--- SELECT ---") {
      setLblResult("Please select Result.");
      setLblResultState(true);
      // Swal.fire({
      //   title: "Please select result.",
      //   icon: "error",
      //   showConfirmButton: false,
      //   timer: 1500,
      // });
      return;
    }
    if (result == "") {
      setLblResult("Please input serial no.");
      setLblResultState(true);
      // Swal.fire({
      //   title: "Please input serial no.",
      //   icon: "error",
      //   showConfirmButton: false,
      //   timer: 1500,
      // });
      return;
    }
    for(let i = 0; i < result.length; i++){
      if(result[i].result == ""){
        result[i].remark = "not found data";
        result[i].color = "red";
      }else{
       const resultUpdate =  await getData("updateData", {serial: result[i].serial, elttype: eltTypeSelect, results: resultSelect, ip: ip});
       if(resultUpdate == ''){
          result[i].result = resultSelect;
          result[i].inspection_count = parseInt(result[i].inspection_count) + 1;
          result[i].remark = "update complete.";
          result[i].color = "green";
       }
      }
    }
    setPieceNo("");
    setEltTypeState({
      styled: { disable: false, backgroundColor: "white" },
    });
    setResultSelect("--- SELECT ---");
    pieceNoRef.current.focus();
  };
  
  const SearchData = async () => {
    let updatedData = [];
    if (lblResult != "" && lblResult != "Dupplicate serial no.") {
      setResult([]);
      setLblResult("");
      setLblResultState(false);
    } else {
      const resultRes = await getData("getDataSearch", { serial: pieceNo });
      const isDuplicate = result.some((item) => item.serial === pieceNo);
      if (!isDuplicate) {
        if (resultRes.length > 0) {
          setResult((prev) => [
            ...prev,
            {
              seq: seq,
              serial: pieceNo,
              result: resultRes[0].che_prod_result,
              inspection_count: resultRes[0].che_inspect_count,
              inspection_date: resultRes[0].che_inspect_date,
              remark: "",
              color: "",
            },
          ]);
        } else {
          setResult((prev) => [
            ...prev,
            {
              seq: seq,
              serial: pieceNo,
              result: "",
              inspection_count: "",
              inspection_date: "",
              remark: "",
              color: "",
            },
          ]);
        }
        setSeq((prevSeq) => prevSeq + 1); 
        setLblResult("");
        setLblResultState(false);
      } else {
        setLblResult("Dupplicate serial no.");
        setLblResultState(true);
      }
    }
  };
  const handlePieceChange = async () => {
    if (pieceNo == "") {
    } else {
      setResultState(true);
      setEltTypeState({
        styled: { disable: true, backgroundColor: "#B2A8A8" },
      });
      await SearchData();
      setPieceNo("");
    }
  };
  const handleBtnCancel = () => {
    setEltTypeState({
      styled: { disable: false, backgroundColor: "white" },
    });
    setResult([]);
    setSeq(1);
    // setEltTypeSelect(eltType[0].elt_type);
    setResultState(false);
    setResultSelect("--- SELECT ---");
    setPieceNo("");
    setLblResult("");
    setLblResultState(false);
    pieceNoRef.current.focus();
  };
  async function getData(type, params) {
    if (type == "getELTType") {
      await axios
        .get("/api/ELTtype/gettype")
        .then((res) => {
          setEltType(res.data);
          setEltTypeSelect(res.data[0].elt_type);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (type == "getDataSearch") {
      let result = [];
      await axios
        .post(
          "/api/AVIconfirm/getData",
          {
            dataList: {
              strSerialNo: params.serial,
              strPlantCode: plantCode,
              strTesttype: eltTypeSelect,
            },
          },
          {
            validateStatus: function (status) {
              return true;
            },
          }
        )
        .then((res) => {
          if (res.status == 200) {
            result = res.data;
          
            // });
          } else if (res.status == 204) {
            dataNotfound.push({ dataNotfound: params.serial });
          }
        });
      return result;
    } else if (type == "updateData") {
      let result = '';
      await axios
        .post("/api/AVIconfirm/updateData", {
          dataList: {
            strPlantCode: plantCode,
            strSerialNo: params.serial,
            strTestType: params.elttype,
            strResult: params.results,
            strName: params.ip,
          },
        })
        .then((res) => {
          result = res.data.result;
        })
        .catch((error) => {
          console.log(error);
        });
        return result;
    }
    
  }
  const columns = [
    {
      title: "No.",
      dataIndex: "seq",
      key: "seq",
      align: "center",
      width: 50,
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "Serial No",
      dataIndex: "serial",
      key: "serial",
      align: "center",
      width: 200,
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "Result",
      dataIndex: "result",
      key: "result",
      align: "center",
      width: 100,
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "Inspection Count",
      dataIndex: "inspection_count",
      key: "inspection_count",
      align: "center",
      width: 150,
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "Inspection Date",
      dataIndex: "inspection_date",
      key: "inspection_date",
      align: "center",
      width: 150,
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "Remark",
      dataIndex: "remark",
      key: "remark",
      align: "center",
      width: 150,
      render: (text, record, index) => {
        return text;
      },
    },
  ];

  return {
    eltType,
    username,
    pieceNo,
    setPieceNo,
    btnRetrieveClick,
    handlePieceChange,
    eltTypeState,
    eltTypeSelect,
    setEltTypeSelect,
    result,
    resultState,
    lblResult,
    pieceNoRef,
    resultSelect,
    handleResultSelect,
    btnSubmitClick,
    dataNotfound,
    handleBtnCancel,
    getSearchData,
    columns,
    lblResultState
  };
}

export { fn_AVIManualConfirm };
