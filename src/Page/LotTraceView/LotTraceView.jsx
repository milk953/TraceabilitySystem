import React, { useEffect, useState, useRef } from "react";
import "../Common/StyleCommon.css";
import Hearder from "../Header/Header";
import { Card, Paper } from "@mui/material";
import { Input, Button, Table,Typography  } from "antd";
const { Text } = Typography;
import { fc_LotTraceView } from "./fc_LotTraceView";
import {
  SearchOutlined,
  UndoOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
function LotTraceView() {
    const {
  
      } = fc_LotTraceView();
  const columns = [
    {
      title: "Material Code",
      dataIndex: "SHT_SEQ",
      key: "Material Code",
      render: (text, record, index) => {
        return index + 1;
      },
      align: "center",
    },
    {
      title: "Material Name",
      dataIndex: "ROLL_LEAF",
      key: "Material Name",
      align: "left",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "Category",
      dataIndex: "SHT_NO",
      key: "Category",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },

    {
      title: "Vender Lot",
      key: "Vender Lot",
      dataIndex: "SCAN_RESULT",
      align: "center",
      render: (text, record, index) => {
        const backgroundColor =
          text === "NG" ? "#f50" : text === "OK" ? "#87d068" : "transparent";

        return <Tag color={backgroundColor}>{text}</Tag>;
      },
    },
    {
      title: "Sub Lot",
      key: "Sub Lot",
      dataIndex: "REMARK",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "Expired Date",
      key: "Expired Date",
      dataIndex: "REMARK",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "Invoice No.",
      key: "Invoice No.",
      dataIndex: "REMARK",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "Vender Name",
      key: "Vender Name",
      dataIndex: "REMARK",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
  ];

  const columns2 = [
    {
      title: "Roll No.",  //`Roll No.${txtno}`
      dataIndex: "SHT_SEQ",
      key: "Roll No.",
      render: (text, record, index) => {
        return index + 1;
      },
      align: "center",
    },
  ];

  const columns3 = [
    {
      title: "No.",
      dataIndex: "SHT_SEQ",
      key: "No.",
      render: (text, record, index) => {
        return index + 1;
      },
      align: "center",
    },
    {
        title: "Factory",
        dataIndex: "SHT_SEQ",
        key: "Factory",
        render: (text, record, index) => {
          return index + 1;
        },
        align: "center",
      },
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
        title: "Production Date",
        dataIndex: "SHT_SEQ",
        key: "Production Date",
        render: (text, record, index) => {
          return index + 1;
        },
        align: "center",
      },
      {
        title: "Machine No.",
        dataIndex: "SHT_SEQ",
        key: "Machine No.",
        render: (text, record, index) => {
          return index + 1;
        },
        align: "center",
      },
      {
        title: "Operator",
        dataIndex: "SHT_SEQ",
        key: "Operator",
        render: (text, record, index) => {
          return index + 1;
        },
        align: "center",
      },
      {
        title: "Document No.",
        dataIndex: "SHT_SEQ",
        key: "Document No.",
        render: (text, record, index) => {
          return index + 1;
        },
        align: "center",
      },
      {
        title: "Tools Type",
        dataIndex: "SHT_SEQ",
        key: "Tools Type",
        render: (text, record, index) => {
          return index + 1;
        },
        align: "center",
      },
      {
        title: "Tools Name",
        dataIndex: "SHT_SEQ",
        key: "Tools Name",
        render: (text, record, index) => {
          return index + 1;
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
          //   value={txt_PONo}
          //   onChange={(e) => {
          //     settxt_PONo(e.target.value);
          //   }}
        />{" "}
        &nbsp;
        <Input
          placeholder="Sheet No. :"
          style={{ width: "300px" }}
          //   value={txt_PONo}
          //   onChange={(e) => {
          //     settxt_PONo(e.target.value);
          //   }}
        />{" "}
        &nbsp;
        <Input
          placeholder="Serial No.   :"
          style={{ width: "300px" }}
          //   value={txt_PONo}
          //   onChange={(e) => {
          //     settxt_PONo(e.target.value);
          //   }}
        />{" "}
        &nbsp;
        <Button
          type="primary"
          //   icon={loading ? <LoadingOutlined /> : <SearchOutlined />}
          icon={<SearchOutlined />}
          //   onClick={() => Search()}
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
            style={{
              width: "250px",
              height: "50px",
              textAlign: "center",
              background: "#F0A500",
              fontFamily:
                "Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif", // ฟอนต์ของ Ant Design
              color: "#fff",
            }}
          >
            <b style={{ fontSize: "20px" }}> Lotno. </b>
            <br />
            1873576464
          </Card>
          <Card
            component={Paper}
            style={{
              width: "250px",
              height: "50px",
              textAlign: "center",
              background: "#F0A500",
              fontFamily:
                "Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif", // ฟอนต์ของ Ant Design
              color: "#fff",
            }}
          >
            <b style={{ fontSize: "20px" }}> Product Name </b>
            <br />
            1873576464
          </Card>
          <Card
            component={Paper}
            style={{
              width: "250px",
              height: "50px",
              textAlign: "center",
              background: "#F0A500",
              fontFamily:
                "Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif", // ฟอนต์ของ Ant Design
              color: "#fff",
            }}
          >
            <b style={{ fontSize: "18px" }}> Sheet No. </b>
            <br />
            <b style={{ fontSize: "18px" }}>  Roll Leaf</b>
          
          </Card>
          <Card
            component={Paper}
            style={{
              width: "250px",
              height: "50px",
              textAlign: "center",
              background: "#F0A500",
              fontFamily:
                "Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif", // ฟอนต์ของ Ant Design
              color: "#fff",
            }}
          >
            <b style={{ fontSize: "20px" }}> Connect Sheet </b>
            <br />
            0
          </Card>
          <Card
            component={Paper}
            style={{
              width: "250px",
              height: "50px",
              textAlign: "center",
              background: "#F0A500",
              fontFamily:
                "Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif", // ฟอนต์ของ Ant Design
              color: "#fff",
            }}
          >
            <b style={{ fontSize: "20px" }}> Final Gate </b>
            <br />
           <b style={{color:'#00712D'}}> OK: 0</b>   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b style={{color:'red'}}> NG: 0</b>
          </Card>
        </div>
        <br />
        <div style={{ display: "flex", width: "100%" }}>
          <Table
            style={{ width: "80%" }}
            columns={columns}
            className="tableGvResult"
            pagination={false}
            size="small"
            bordered
          />{" "}
          &nbsp;
          <Table
            style={{ width: "20%" }}
            columns={columns2}
            // dataSource={gvScanResult.value}
            pagination={false}
            size="small"
            bordered
            className="tableGvResult"
          />
        </div>
        <br/>
        <Table
          style={{ width: "100%" }}
          columns={columns3}
          className="tableGvResult"
          pagination={false}
          size="small"
          bordered
        /><br/>
        <Table
          style={{ width: "50%" }}
          columns={columns4}
          className="tableGvResult"
          pagination={false}
          size="small"
          bordered
        />
      </Card>
    </>
  );
}

export default LotTraceView;
