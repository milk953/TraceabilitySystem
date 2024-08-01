import axios from "axios";
import React, { useEffect, useState } from "react";

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

  useEffect(() => {
    Pageload();
    setUsername(localStorage.getItem("Username") || "");
  }, []);
  async function Pageload() {
    await getData("getELTType", "");
  }
  const btnRetrieveClick = async () => {
    SearchData();
  };
  const SearchData = async () => {
    if (lblResult != "" && lblResult != "Dupplicate serial no.") {
      setResult([]);
      setLblResult("");
    } else {
      let dtData = [];
      dtData.push({
        SEQ: 1,
        CHE_SERIAL_NO: pieceNo,
      });
      setResult(dtData);
    }
  };
  const handlePieceChange = () => {
    if (pieceNo == "") {
    } else {
      setEltTypeState({styled: {disable: true,backgroundColor: "#B2A8A8"}});
      SearchData();
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
    result
  };
}

export { fn_AVIManualConfirm };
