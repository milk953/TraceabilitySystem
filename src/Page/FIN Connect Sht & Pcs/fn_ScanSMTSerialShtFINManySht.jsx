import axios from "axios";
import React, { useEffect, useState } from "react";

const fn_ScanSMTSerialShtFINManySht = () => {
  const [lot, setLot] = useState("");
  const [product, setProduct] = useState("");
  const [lotRef, setLotRef] = useState("");
  const [operator, setOperator] = useState("");
  const [sht, setSht] = useState("");
  const [pcs, setPcs] = useState("");
  
  const ibtBack = () => {
    setLot("");
  };
  let ipAddress = localStorage.getItem("ip");
  
  return { lot, setLot ,ipAddress};
};

export { fn_ScanSMTSerialShtFINManySht };
