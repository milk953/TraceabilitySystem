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
  const { tblData1, txtLotNo, columnstblData1,ViewData,loading  } = fn_Material_Trace();

  return (
    <>
      <Hearder />
     
      <Card component={Paper} className="Card-Common">
        {/* <div style={{ display: "flex", gap: "10px" }}> */}
          {/* <Card
            component={Paper}
            className="Card-ViewRollTitlePage"
            style={{ width: "200px" }}
          >
            <b style={{ fontSize: "32px" }}>Sheet No.</b>
          </Card> */}
          {/* <Card
            component={Paper}
            className="Card-ViewRoll"
            style={{ width: "200px" }}
          >
            <b style={{ fontSize: "20px" }}>Lot No.</b>
            <br />
            {txtLotNo}
          </Card> */}
           <Input
          placeholder="Vendor Lot NO :"
          style={{ width: "250px" }}
          value={txtLotNo}
          // onChange={(e) => {
          //   settxtLotNo(e.target.value);
          // }}
          // ref={fc_txtLotNo}
        />{" "}
                 <Button
          type="primary"
          icon={loading ? <LoadingOutlined /> : <SearchOutlined />}
          // icon={<SearchOutlined />}
          onClick={() => ViewData(txtLotNo)}
          disabled={loading ? true : false}
        >
          Retrive
        </Button>
        {/* </div> */}
        <br />
        
      
        <Table
          dataSource={tblData1}
          columns={columnstblData1}
          className="tableGvResultView"
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
