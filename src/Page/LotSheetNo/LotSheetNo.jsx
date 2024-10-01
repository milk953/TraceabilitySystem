import React, { useEffect, useState, useRef } from "react";
import "../Common/StyleCommon.css";
import Hearder from "../Header/Header.jsx";
import { Card, Paper } from "@mui/material";
import { Input, Button, Table, Typography, Tag, Tooltip, Avatar } from "antd";
import {
  SearchOutlined,
  UndoOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import "../LotSheetNo/LotSheetNo.css";
import excel from "/src/assets/excel.png";
import { fn_LotSheetNo } from "./fn_LotSheetNo.jsx";

function LotTraceView() {
  const {  tblBackSheet,tblFrontSheet, txtProd, txtLotNo, columnsBACK,columnsFRONT  } = fn_LotSheetNo();

  return (
    <>
      <Hearder />
      <h1>Roll Leaf No.</h1>
      <Card component={Paper} className="Card-Common">
        <div style={{ display: "flex", gap: "10px" }}>
          <Card
            component={Paper}
            className="Card-ViewRollTitlePage"
            style={{ width: "200px" }}
          >
            <b style={{ fontSize: "32px" }}>Sheet No.</b>
          </Card>
          <Card
            component={Paper}
            className="Card-ViewRoll"
            style={{ width: "200px" }}
          >
            <b style={{ fontSize: "20px" }}>Lot No.</b>
            <br />
            {txtLotNo}
          </Card>
          <Card
            component={Paper}
            className="Card-ViewRoll"
            style={{ width: "200px" }}
          >
            <b style={{ fontSize: "20px" }}>Product Name</b>
            <br />
            {txtProd}
          </Card>
         
        </div>
        <br />
        
        {console.log('tblFrontSheet',tblFrontSheet,columnsFRONT)}
        <Table
          dataSource={tblFrontSheet}
          columns={columnsFRONT}
          className="tableGvResultViewSheet"
          pagination={false}
          size="small"
          bordered
          scroll={{ y: 310 }}
        />
        <br/>
        <Table
          dataSource={tblBackSheet}
          columns={columnsBACK}
          className="tableGvResultViewSheet"
          pagination={false}
          size="small"
          bordered
          scroll={{ y: 310 }}
        />
      </Card>
    </>
  );
}

export default LotTraceView;
