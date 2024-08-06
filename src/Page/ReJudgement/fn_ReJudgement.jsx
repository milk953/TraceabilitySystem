import React, { useState } from "react";

function fn_ReJudgement() {
  const [lblResult, setLblResult] = useState({
    text: "",
    styled: { color: "black" },
  });
  //radio button state
  const [rdSelect, setRdSelect] = useState("rdPcsno");
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [txtSerialno, setTxtSerialno] = useState("");
  const [lot, setLot] = useState("");
  const [pnlTableDisplaySatate, setPnlTableDisplaySatate] = useState(true);

  const handleRDChange = (event) => {
    setRdSelect(event.target.value);
  };
  const txtSerialnoChange = async () => {
    console.log(txtSerialno);
    console.log(lot);
  };

  return {
    lblResult,
    setLblResult,
    rdSelect,
    setRdSelect,
    selectAll,
    setSelectAll,
    selectedRows,
    setSelectedRows,
    handleRDChange,
    txtSerialno,
    setTxtSerialno,
    lot,
    setLot,
    txtSerialnoChange,pnlTableDisplaySatate

  };
}

export { fn_ReJudgement };
