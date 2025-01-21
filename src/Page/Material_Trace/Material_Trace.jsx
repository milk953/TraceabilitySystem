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

const { Text } = Typography;
function LotTraceView() {
  const {
    tblData1,
    txtLotNo,
    columnstblData1,
    ViewData,
    loading,
    settxtLotNo,
    Clear,
    columnsgvMaterial,
    gvMaterial,
    txtInviceNo,
    settxtInviceNo,
    ExportGridToCSV
  } = fn_Material_Trace();

  return (
    <>
      <Hearder />

      <Card component={Paper} className="Card-Common">
        <div style={{ marginTop: "5px", marginLeft: "10px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Text>Vendor Lot No. : </Text>&nbsp;
            <Input
              // placeholder="Vendor Lot NO : "
              style={{ width: "250px", marginRight: "10px" }}
              value={txtLotNo}
              onChange={(e) => settxtLotNo(e.target.value.trim())}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  ViewData(e.target.value,txtInviceNo);
                }
              }}
            />
            <Text>Invoice No. : </Text>&nbsp;
            <Input
              // placeholder="Invoice No.:"
              style={{ width: "250px", marginRight: "10px" }}
              value={txtInviceNo}
              onChange={(e) => settxtInviceNo(e.target.value.trim())}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  ViewData(txtLotNo,e.target.value);
                }
              }}
            />
            <Button
              type="primary"
              icon={loading ? <LoadingOutlined /> : <SearchOutlined />}
              onClick={() => ViewData(txtLotNo,txtInviceNo)}
              disabled={loading}
              style={{ marginRight: "10px", marginTop: "5px" }}
            >
              Search
            </Button>
            <Button
              type="primary"
              danger
              icon={<UndoOutlined />}
              onClick={() => Clear()}
              style={{ marginRight: "10px", marginTop: "5px" }}
            >
              Clear
            </Button>
            <div style={{ marginLeft: "auto" }}>
              <Button
                size="small"
                style={{
                  height: "30px",
                  marginTop: "5px",
                  marginRight: "10px",
                }}
                disabled={gvMaterial === ''|| gvMaterial.length === 0}
          
                icon={<Avatar shape="square" src={excel} size="small" />}
                onClick={() =>
                  ExportGridToCSV(
                    gvMaterial,
                    columnsgvMaterial,
                    "Material.xls"
                  )
                }

              >
                Export
              </Button>
            </div>
          </div>
        </div>

        <Table
          // style={{ width: "88%", fontSize: "12px" }}
          columns={columnsgvMaterial}
          dataSource={gvMaterial}
          className="tableGvResult"
          pagination={false}
          size="small"
          bordered
          scroll={{ y: 200 }}
        />

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

        <br />
      </Card>
    </>
  );
}

export default LotTraceView;
