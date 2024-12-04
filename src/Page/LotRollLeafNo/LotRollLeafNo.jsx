import React, { useEffect, useState, useRef } from "react";
import "../Common/StyleCommon.css";
import Hearder from "../Header/Header";
import { Card, Paper } from "@mui/material";
import { Input, Button, Table, Typography, Tag, Tooltip, Avatar } from "antd";
import {
  SearchOutlined,
  UndoOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import "../LotRollLeafNo/LotRollLeafNo.css";
import excel from "/src/assets/excel.png";
import { fn_LotRollLeafNo } from "./fn_LotRollLeafNo.jsx";

function LotTraceView() {
  const { tblLeafNo, txtProd, txtRollNo, columns,btnExport_Click } = fn_LotRollLeafNo();

  return (
    <>
      <Hearder />
      <Card component={Paper} className="Card-Common">
        <div style={{ display: "flex", gap: "10px" }}>
          <Card
            component={Paper}
            className="Card-ViewRollTitlePage"
            style={{ maxWidth: "230px",width:'100%' }}
          >
            <b style={{ fontSize: "32px" }}>Roll Leaf No.</b>
          </Card>
          <Card
            component={Paper}
            className="Card-ViewRoll"
            style={{ width: "200px" }}
          >
            <b style={{ fontSize: "20px" }}> {txtRollNo.label}</b>
            <br />
            {txtRollNo.value}
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
            <div
          style={{
            width: "87%",
            display: "flex",
            justifyContent: "flex-end",
            marginTop:'25px',
            marginRight:'5px'
            // display: gvMaterial.value.length > 0 ? "flex" : "none",
          }}
        >
          <Button
            size="small"
            icon={<Avatar shape="square" src={excel} size="small" />}
            onClick={() => btnExport_Click()}
          >
            Export
          </Button>
        </div>
  
          {/* <Tooltip title="Click!! Export to Excel">
            <Button
              type="primary"
              icon={
                <Avatar
                  src={excel}
                  shape="square"
                  style={{
                    cursor: "pointer",
                    height: "30px",
                    width: "30px",
                    transition: "transform 0.3s ease",
                  }}
                />
              }
              style={{
                height: "50px",
                fontSize: "17px",
                background: "#609EA2",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
              onClick={() => btnExport_Click()}
            >
              Export
            </Button>
          </Tooltip> */}
        </div>
        
        <Table
          dataSource={tblLeafNo.value}
          columns={columns}
          className="tableGvResultViewRoll"
          pagination={false}
          size="small"
          bordered
        />
      </Card>
    </>
  );
}

export default LotTraceView;
