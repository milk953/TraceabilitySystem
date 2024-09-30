import React, { useEffect, useState, useRef } from "react";
import "../Common/StyleCommon.css";
import Hearder from "../Header/Header";
import { Card, Paper } from "@mui/material";
import { Input, Button, Table, Typography, Tag ,Tooltip} from "antd";
import {
  SearchOutlined,
  UndoOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import "../LotRollLeafNo/LotRollLeafNo.css";
// import { fn_LotTraceView } from "./fn_LotTraceView";
function LotTraceView() {
//   const {
//     settxtLotNo,
//     txtLotNo,
//     fc_txtLotNo,
//     btnSearch_Click,
//     gvLot,
//     gvMaterial,
//     gvRouting,
//     gvProcessLink,
//     columnsgvMaterial,
//     columnsgvLot,
//     columnsgvRouting,
//     columnsgvProcessLink,
//     loading,
//     reset,
//     lblLotNo,
//     txtProd,
//     txtPreviousLotNo,
//     txtNextLotNo,
//     lbtFinalGate,
//     lblTitleShtFront,
//     lblTitleShtBack,
//     lbtConnectSht,
//     setShtSerialGrid,
//     setFinalGateGrid
//   } = fn_LotTraceView();


  return (
    <>
      <Hearder />
      <h1>LotTraceView</h1>
      <Card component={Paper} className="Card-Common">
      
      </Card>
    </>
  );
}

export default LotTraceView;
