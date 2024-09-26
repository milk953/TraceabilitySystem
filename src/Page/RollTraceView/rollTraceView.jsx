import React from "react";
import Header from "../Header/Header";
import "./rollTraceView.css";
import { Input, Button, Tag } from "antd";
import { SearchOutlined, ClearOutlined } from "@ant-design/icons";
import { Card, Paper } from "@mui/material";

function rollTraceView() {
  return (
    <>
      <Header />
      <h1>ViewTraceRoll</h1>
      <Card component={Paper}>
        <div className="RollTracetextField">
          <Tag color="blue" style={{ fontSize: 20, verticalAlign: "center" }}>
            Roll Leaf No.{" "}
          </Tag>
          <Input
            className="RollTraceInput"
            placeholder="Please Input Roll Leaf"
          />
          <Button
            type="primary"
            className="RollTraceBtn"
            iconPosition={"end"}
            icon={<SearchOutlined />}
          >
            Search
          </Button>
          <Button
            type="primary"
            style={{ backgroundColor: "#f5222d", borderColor: "#f5222d" }}
            className="RollTraceBtn"
            iconPosition={"end"}
            icon={<ClearOutlined />}
          >
            Clear
          </Button>
        </div>
        <div className="RollTraceShowData">
          <div className="dataLine1">
            <Tag color="blue" style={{ fontSize: 20, verticalAlign: "center" }}>
              123
            </Tag>
            <Tag color="green">123</Tag>
          </div>
          <div className="dataLine2">
            {" "}
            <Tag color="blue">123</Tag>
            <Tag color="green">123</Tag>
          </div>
          <div className="dataLine3">
            {" "}
            <Tag color="blue">123</Tag>
            <Tag color="green">123</Tag>
          </div>
        </div>
      </Card>
    </>
  );
}

export default rollTraceView;
