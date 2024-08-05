import axios from "axios";
import { set } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
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
  const [resultSelect, setResultSelect] = useState("");
  const [getSearchData, setGetSearchData] = useState([]);
  const [updateFlg, setUpdateFlg] = useState(false);
  // const [dataNotfound, setDataNotfound] = useState([]);
  let dataNotfound = [];
  let SearchDataTest = [];
  useEffect(() => {
    Pageload();
    setUsername(localStorage.getItem("Username") || "");
    setIp(localStorage.getItem("ipAddress") || "");
  }, []);
  async function Pageload() {
    await getData("getELTType", "");
  }
  const btnRetrieveClick = async () => {
    if (pieceNo == "") {
      return;
    } else {
      SearchData();
    }
  };
  const handleResultSelect = (e) => {
    setResultSelect(e.target.value);
  };
  const btnSubmitClick = async () => {
    setLblResult("");
    if (resultSelect == "") {
      setLblResult("Please select result.");
      return;
    }
    if (result == "") {
      setLblResult("Please input serial no.");
      return;
    }
    for (let x = 0; x < result.length; x++) {
      await getData("getData", { serial: result[x].CHE_SERIAL_NO });
    }
    for (let i = 0; i < result.length; i++) {
      const updatedData = result.map((item) => {
        const match = dataNotfound.find(
          (element) => element.dataNotfound === item.CHE_SERIAL_NO
        );
        return match
          ? { ...item, remark: "Not Found Data", color: "red" }
          : {
              ...item,
              result: resultSelect,
              remark: "Update complete.",
              color: "green",
            };
      });
      setResult(updatedData);
    }
    setPieceNo("");
    setEltTypeState({
      styled: { disable: false, backgroundColor: "white" },
    });
    pieceNoRef.current.focus();
  };
  const SearchData = async () => {
    let updatedData = [];
    if (lblResult != "" && lblResult != "Dupplicate serial no.") {
      setResult([]);
      setLblResult("");
    } else {
      let isDuplicate = false;
      for (let i = 0; i < result.length; i++) {
        if (result[i].CHE_SERIAL_NO === pieceNo && updateFlg == false) {
          setLblResult("Dupplicate serial no.");
          isDuplicate = true;
          pieceNoRef.current.focus();
          break;
        }
      }
      if (!isDuplicate && updateFlg == false) {
        const newSeq =
          result.length > 0 ? result[result.length - 1].SEQ + 1 : 1;
        const newData = {
          SEQ: newSeq,
          CHE_SERIAL_NO: pieceNo,
        };
        const updatedData = [...result, newData];
        setResult(updatedData);
      } else if (updateFlg == true) {
        setResult([]);
        const newSeq =
          result.length > 0 ? result[result.length - 1].SEQ + 1 : 1;
        const newData = {
          SEQ: newSeq,
          CHE_SERIAL_NO: pieceNo,
        };
        const updatedData = [newData];
        setResult(updatedData);
        setUpdateFlg(false);
      }
    }

    // console.log(updatedData);
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
    } else if (type == "getData") {
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
            setGetSearchData(res.data);
            getData("updateData", {
              serial: params.serial,
              elttype: eltTypeSelect,
              results: resultSelect,
              ip: ip,
            });
          } else if (res.status == 204) {
            dataNotfound.push({ dataNotfound: params.serial });
          }
        });
    } else if (type == "updateData") {
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
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "update complete.",
          }).then(() => {
            setUpdateFlg(true);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

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
  };
}

export { fn_AVIManualConfirm };
