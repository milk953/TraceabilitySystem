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
import { fn_Material_Trace } from "./fn_Material_Trace.jsx";

function LotTraceView() {
  const { tblData1, txtLotNo, columnstblData1,ViewData,loading ,settxtLotNo ,Clear} = fn_Material_Trace();
console.log(loading,'loaddd')
  return (
    <>
      <Hearder />
     
      <Card component={Paper} className="Card-Common">

           <Input
          placeholder="Vendor Lot NO :"
          style={{ width: "250px" }}
          value={txtLotNo}
          onChange={(e) => {
            settxtLotNo(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              ViewData(e.target.value)
            }
          }}
        />{" "}
                 <Button
          type="primary"
          icon={loading ? <LoadingOutlined /> : <SearchOutlined />}
          // icon={<SearchOutlined />}
          onClick={() => ViewData(txtLotNo)}
          disabled={loading ? true : false}
        >
          Retrive
        </Button>                    <Button
          type="primary"
          danger
          icon={<UndoOutlined />}
          onClick={() => Clear()}
        >
          Clear
        </Button>  

        <br />
        
      
        <Table
          dataSource={tblData1}
          columns={columnstblData1}
          className="tableGvResult"
          pagination={false}
          size="small"
          bordered
          scroll={{ y: 310 }}
        />
        
        <br/>
       
      </Card>
    </>
  );
}

export default LotTraceView;
