import axios from "axios";
import { concat } from "lodash";
import React, { useEffect, useState } from "react";

function fn_ScanSMTSerialShtCopy() {
  //State
  const [gvBackSideState, setGvBackSideState] = useState(false);
  const [lblErrorState, setLblErrorState] = useState(false);
  const [panalSerialState, setPanalSerialState] = useState(false);
  const [hideImg, setHideImg] = useState(true);
  const [lblResultState, setLblResultState] = useState(false);
  const [pnlRollLeafState, setPnlRollLeafState] = useState(false);
  const [pnlMachineState, setPnlMachineState] = useState(false);
  const [pnlButtonFixState, setPnlButtonFixState] = useState(false);
  //textField
  const [txtlotNo, setTxtlotNo] = useState("");
  const [ddlProduct, setDdlproduct] = useState([]);
  const [productSelected, setProductSelected] = useState("");
  const [txtLotRef, setTxtLotRef] = useState("");
  const [txtRollLeaf, setTxtRollLeaf] = useState("");
  const [txtCheckRoll, setTxtCheckRoll] = useState("");
  const [txtMachineNo, setTxtMachineNo] = useState("");
  const [txtButtonFix, setTxtButtonFix] = useState("");
  const [txtTopFix, setTxtTopFix] = useState("");

  //Funtion
  useEffect(() => {
    PageLoad();
  }, []);

  async function PageLoad() {
    await getData("getProductData", null);
  }
  async function getData(type, params) {
    if (type == "getProductData") {
      await axios.get("/api/common/GetProductData").then((res) => {
        setProductSelected(res.data[0].prd_name);
        setDdlproduct(res.data);
      });
    }
  }
  const ddlproduct_Change =async (value) => {
    setProductSelected(value);
    console.log(value);
  }
  return {
    gvBackSideState,
    lblErrorState,
    panalSerialState,
    hideImg,
    lblResultState,
    pnlRollLeafState,
    pnlMachineState,
    pnlButtonFixState,
    txtlotNo,
    setTxtlotNo,
    productSelected,
    setProductSelected,
    txtLotRef,
    setTxtLotRef,
    txtRollLeaf,
    setTxtRollLeaf,
    txtCheckRoll,
    setTxtCheckRoll,
    txtMachineNo,
    setTxtMachineNo,
    txtButtonFix,
    setTxtButtonFix,
    txtTopFix,
    setTxtTopFix,
    ddlProduct,
    ddlproduct_Change
  };
}

export { fn_ScanSMTSerialShtCopy };
