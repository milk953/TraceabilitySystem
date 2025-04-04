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
import "../Material_Trace/MaterialTrace.css";
import excel from "/src/assets/excel.png";
import { fn_Result } from "./fn_Result.jsx";

function AOI_COA_Result2() {
  const {tblData1, ColumntblData1,BtnExport,Page ,sheet_no } = fn_Result();
  const Now = new Date().toLocaleTimeString("en-GB", { hour12: false });
  return (
    <>
      <Hearder />
      <Card component={Paper} className="Card-Common" style={{width:'97%'}}>
      <div
  style={{
    width: "99%",
    display: "flex",
    justifyContent: Page === "OSTResult" ? "space-between" : "flex-end",
    alignItems: "flex-end", // ชิดล่างสุด
    marginBottom: '5px'
  }}
>
  <Card
    component={Paper}
    className="Card-ViewLot1"
    style={{ width: "230px",display:Page === "OSTResult" ? "" : "none" }}
  >
    <b style={{ fontSize: "20px" }}>SHEET NO</b>
    <br />
    <b>{sheet_no}</b>
  </Card>
  <Button
    size="small"
    icon={<Avatar shape="square" src={excel} size="small" />}
    onClick={() => BtnExport()}
  >
    Export
  </Button>
</div>


     
        <Table
          dataSource={tblData1}
          columns={ColumntblData1}
          className="tableGvResult"
          
          size="small"
          bordered
          // scroll={{ y: 310 }}
          scroll={{ x: 'max-content' }}
        />
        <br/>
      </Card>
    </>
  );
}

export default AOI_COA_Result2;
