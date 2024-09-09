import React, { useState } from "react";

function fn_ScanSMTConnectShtConfirm() {
  const [hideImg, setHideImg] = useState(true);
  const [gvSerial, setGvSerial] = useState([]);
  const [panalSerialState, setPanalSerialState] = useState(true);
  const [txtLot, setTxtLot] = useState("");
  const [ddlproduct, setDdlproduct] = useState("");
  const [productSelected, setProductSelected] = useState("");
  const [txtSerial, setTxtSerial] = useState(gvSerial.map(() => ""));

  const txtLot_Change = async () => {
    return;
  };
  function SetFocus(txtField) {
    document.getElementById(`${txtField}`).focus();
  }
  const handletxtSerialChange = (index, event) => {
    const newValues = [...txtSerial];
    newValues[index] = event.target.value;
    setTxtSerial(newValues);

    if (event.key === "Enter") {
      try {
        SetFocus(`txtSerial_${index + 1}`);
      } catch (error) {
        // handle_Save_Click();
      }
    }
  };
  const handle_Save_Click = async () => {

  }
  const handle_Cancel_Click = async () => {

  }
  return {
    hideImg,
    gvSerial,
    panalSerialState,
    txtLot,
    setTxtLot,
    txtLot_Change,
    ddlproduct,
    setDdlproduct,
    productSelected,
    setProductSelected,
    txtSerial, setTxtSerial,
    handletxtSerialChange,
    handle_Save_Click,
    handle_Cancel_Click
  };
}

export { fn_ScanSMTConnectShtConfirm };
