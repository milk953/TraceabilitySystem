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
import { Fn_AOI_COA_Result2 } from "./Fn_AOI_COA_Result2.jsx";

function AOI_COA_Result2() {
  const {tblData1, ColumntblData1,BtnExport  } = Fn_AOI_COA_Result2();

  return (
    <>
      <Hearder />
      <h1>AOI COA Result2</h1>
      <Card component={Paper} className="Card-Common" style={{width:'98%'}}>
      <div
          style={{
            width: "99%",
            display: "flex",
            justifyContent: "flex-end",
           
          }}
        >
          <Button
            size="small"
            icon={<Avatar shape="square" src={excel} size="small" />}
            onClick={() =>
              BtnExport()
            
            }
          >
            Export
          </Button>
        </div>
     
        
      
        <Table
          dataSource={tblData1}
          columns={ColumntblData1}
          className="tableGvResultViewLot"
          pagination={false}
   
          size="small"
          bordered
          scroll={{ y: 310, x: 2100 }} // เพิ่ม x เพื่อให้เลื่อนซ้ายขวา
        />
        <br/>
       
      </Card>
    </>
  );
}

export default AOI_COA_Result2;
