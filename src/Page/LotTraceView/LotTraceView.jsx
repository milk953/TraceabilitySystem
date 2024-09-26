import React, { useEffect, useState, useRef } from "react";
import "../Common/StyleCommon.css";
import Hearder from "../Header/Header";
import { Card, Paper } from "@mui/material";
import { Input, Button, Table, Typography,Tag } from "antd";
const { Text } = Typography;
import { fn_LotTraceView } from "./fn_LotTraceView";
import {
  SearchOutlined,
  UndoOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import "../LotTraceView/ViewLot.css";
function LotTraceView() {
  const {
    settxtLotNo,
    txtLotNo,
    fc_txtLotNo,
    btnSearch_Click,
    gvLot,
    gvMaterial,
    gvRouting,
  } = fn_LotTraceView();
  console.log(gvRouting,'gvRouting')

  const columnsgvMaterial = [
    {
      title: "Material Code",
      dataIndex: "MAT_CODE",
      key: "Material Code",
      render: (text, record, index) => {
        return index + 1;
      },
      align: "center",
      width:'66px'

    },
    {
      title: "Material Name",
      dataIndex: "MAT_NAME",
      key: "Material Name",
      align: "left",
      render: (text, record, index) => {
        return text;
      },

    },
    {
      title: "Category",
      dataIndex: "MAT_CATEGORY",
      key: "Category",
      align: "left",
      render: (text, record, index) => {
        return text;
      },
    },

    {
      title: "Vender Lot",
      key: "Vender Lot",
      dataIndex: "VENDER_LOT",
      align: "left",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "Sub Lot",
      key: "Sub Lot",
      dataIndex: "SUB_VENDER_LOT",
      align: "left",
      render: (text, record, index) => {
        return text;
      },
     width:100
    },
    {
      title: "Expired Date",
      key: "Expired Date",
      dataIndex: "EXPIRE_DATE",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
      width :100
    },
    {
      title: "Invoice No.",
      key: "Invoice No.",
      dataIndex: "INVOICE_NO",
      align: "left",
      render: (text, record, index) => {
        return text;
      },
      width :110
    },
    {
      title: "Vender Name",
      key: "Vender Name",
      dataIndex: "VENDER_NAME",
      align: "left",
      render: (text, record, index) => {
        return text;
      },
    },
  ];

  const columnsgvLot = [
    {
      title: gvLot.value && gvLot.value[0] && gvLot.value[0].LOT_ROLL_NO 
      ? `Roll No. : ${gvLot.value[0].LOT_ROLL_NO}` 
      : `Roll No.`,    
      dataIndex: "LOT",
      key: "Roll No.",
      render: (text, record, index) => {
        return text
      },
      align: "center",
    },
  ];

  const columnsgvRouting = [
    {
      title: "No.",
      dataIndex: "SEQ",
      key: "No.",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width:50
    },
    {
      title: "Factory",
      dataIndex: "FACTORY",
      key: "Factory",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width:63
    },
    {
      title: "Process",
      dataIndex: "PROC",
      key: "Process",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width:70
    },
    {
      title: "Process Name",
      dataIndex: "PROC_DESC",
      key: "Process Name",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
    },
    {
      title: "Production Date",
      dataIndex: "PROD_DATE",
      key: "Production Date",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
    },
    {
      title: "Machine No.",
      dataIndex: "MC_NO",
      key: "Machine No.",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
    },
    {
      title: "Operator",
      dataIndex: "OPER",
      key: "Operator",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
    },
    {
      title: "Document No.",
      dataIndex: "EMCS",
      key: "Document No.",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
    },
    {
      title: "Tools Type",
      dataIndex: "TTT_TOOLS_TYPE_NAME",
      key: "Tools Type",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
    },
    {
      title: "Tools Name",
      dataIndex: "TTL_TOOLS_CODE",
      key: "Tools Name",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
    },
  ];

  const columns4 = [
    {
      title: "Process",
      dataIndex: "SHT_SEQ",
      key: "Process",
      render: (text, record, index) => {
        return index + 1;
      },
      align: "center",
    },
    {
      title: "Process Name",
      dataIndex: "SHT_SEQ",
      key: "Process Name",
      render: (text, record, index) => {
        return index + 1;
      },
      align: "center",
    },
    {
      title: "Test Data",
      dataIndex: "SHT_SEQ",
      key: "Test Data",
      render: (text, record, index) => {
        return index + 1;
      },
      align: "center",
    },
    {
      title: "Detail",
      dataIndex: "SHT_SEQ",
      key: "Detail",
      render: (text, record, index) => {
        return index + 1;
      },
      align: "center",
    },
  ];

  return (
    <>
      <Hearder />
      <h1>LotTraceView</h1>
      <Card component={Paper} className="Card-Common">
        <Input
          placeholder="Lot No. :"
          style={{ width: "250px" }}
          value={txtLotNo}
          onChange={(e) => {
            settxtLotNo(e.target.value);
          }}
          ref={fc_txtLotNo}
        />{" "}
        &nbsp;
        <Input placeholder="Sheet No. :" style={{ width: "300px" }} /> &nbsp;
        <Input placeholder="Serial No.   :" style={{ width: "300px" }} /> &nbsp;
        <Button
          type="primary"
          //   icon={loading ? <LoadingOutlined /> : <SearchOutlined />}
          icon={<SearchOutlined />}
            onClick={() => btnSearch_Click()}
        >
          Execute
        </Button>
        &nbsp;
        <Button
          type="primary"
          danger
          icon={<UndoOutlined />}
          //   onClick={() => Reset()}
        >
          Reset
        </Button>
        <br />
        <br />
        <div style={{ display: "flex", gap: "10px" }}>
          <Card
            component={Paper}
            className="Card-ViewLot1"
            style={{ width: "180px" }}
          >
            <b style={{ fontSize: "20px" }}>Lotno.</b>
            <br />
            1873576464
          </Card>
          <Card
            component={Paper}
            className="Card-ViewLot1"
            style={{ width: "200px" }}
          >
            <b style={{ fontSize: "20px" }}> Product Name </b>
            <br />
            1873576464
          </Card>
          <Card
            component={Paper}
            className="Card-ViewLot1"
            style={{ width: "250px" }}
          >
            <b style={{ fontSize: "20px" }}>Previous Lot No. </b>
            <br />
            1873576464
          </Card>
          <Card
            component={Paper}
            className="Card-ViewLot1"
            style={{ width: "180px" }}
          >
            <b style={{ fontSize: "20px" }}>Next Lot No. </b>
            <br />
            1873576464
          </Card>
          <Card
            component={Paper}
            className="Card-ViewLot1"
            style={{ width: "180px" }}
          >
            <b style={{ fontSize: "18px" }}> Sheet No. </b>
            <br />
            <b style={{ fontSize: "18px" }}> Roll Leaf</b>
          </Card>
          <Card
            component={Paper}
            className="Card-ViewLot1"
            style={{ width: "210px" }}
          >
            <b style={{ fontSize: "20px" }}> Connect Sheet </b>
            <br />0
          </Card>
          <Card className="Card-ViewLot1" style={{ width: "170px" }}>
            <b style={{ fontSize: "20px" }}> Final Gate </b>
            <br />
            <b style={{ color: "#00712D" }}> OK: 0</b>{" "}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
            <b style={{ color: "red" }}> NG: 0</b>
          </Card>
          <div>
            <Card component={Paper} className="Card-ViewLot2">
              <b style={{ fontSize: "16px" }}>Sheet Front: </b>12123917348274836
            </Card>

            <Card component={Paper} className="Card-ViewLot2">
              <b style={{ fontSize: "16px" }}> Sheet Back: </b>12123917348274836
            </Card>
          </div>
        </div>
        <br />
        <div style={{ display: "flex", width: "100%" }}>
          {/*----------------------------- Table1.1--------------------- */}
          <Table
            style={{ width: "85%",fontSize:'12px' }}
            columns={columnsgvMaterial}
            dataSource={gvMaterial.value}
            className="tableGvResultViewLot"
            pagination={false}
            size="small"
            bordered
            scroll={{ y: 200 }}
          />{" "}
          &nbsp;
          {/*----------------------------- Table1.2--------------------- */}
          <Table
            style={{ width: "15%" }}
            columns={columnsgvLot}
            dataSource={gvLot.value}
            pagination={false}
            size="small"
            bordered
            className="tableGvResultViewLot"
         
          />
        </div>
        <br />
        {/*----------------------------- Table2--------------------- */}
        <Table
          style={{ width: "100%" }}
          columns={columnsgvRouting}
          dataSource={gvRouting.value}
          className="tableGvResultViewLot"
          pagination={false}
          size="small"
          bordered
          scroll={{ y: 300 }}
        />
        {/*----------------------------- Table3--------------------- */}
        <br />
        <Table
          style={{ width: "50%" }}
          columns={columns4}
          className="tableGvResultViewLot"
          pagination={false}
          size="small"
          bordered
        />
      </Card>
    </>
  );
}

export default LotTraceView;
