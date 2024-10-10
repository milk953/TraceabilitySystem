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
import { fn_LOTTrace } from "./fn_LOTTrace.jsx";

function LotTrace() {
  const {
    tblData1,
    txtLotNo,
    columnsMaterial,
    ViewData,
    loading,
    columnsDetail,
    dataNext,
    dataPREVIUS,
    dataDetail,
    dataProdRoll,
    dataMaterial,
    reset,
    settxtLotNo
  } = fn_LOTTrace();
  console.log(dataMaterial, "dataMaterial");
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
        </Button>{" "}
        <Button
          type="primary"
          danger
          icon={<UndoOutlined />}
          onClick={() => { reset(); settxtLotNo(''); }}
        >
          Reset
        </Button>
        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          {/* <Card
            component={Paper}
            className="Card-ViewRollTitlePage"
            style={{ width: "200px" }}
          >
            <b style={{ fontSize: "32px" }}>Sheet No.</b>
          </Card>  */}
          <Card
            component={Paper}
            className="Card-ViewRollTitlePage"
            style={{
              width: "200px",
              display: dataProdRoll[0].LOT_PRD_NAME === "" ? "none" : "",
            }}
          >
            <b style={{ fontSize: "20px" }}>ProductName</b>
            <br />
            {dataProdRoll[0].LOT_PRD_NAME}
          </Card>
          <Card
            component={Paper}
            className="Card-ViewRollTitlePage"
            style={{
              width: "200px",
              display: dataProdRoll[0].LOT_ROLL_NO === "" ? "none" : "",
            }}
          >
            <b style={{ fontSize: "20px" }}>Roll NO</b>
            <br />
            {dataProdRoll[0].LOT_ROLL_NO}
          </Card>
          <Card
            component={Paper}
            className="Card-ViewRollTitlePage"
            style={{
              width: "200px",
              display: dataPREVIUS === "" ? "none" : "",
            }}
          >
            <b style={{ fontSize: "20px" }}>Previus LOTNO</b>
            <br />
            {dataPREVIUS}
          </Card>
          <Card
            component={Paper}
            className="Card-ViewRollTitlePage"
            style={{
              width: "200px",
              display: dataNext === "" ? "none" : "",
            }}
          >
            <b style={{ fontSize: "20px" }}>Next LOTNO</b>
            <br />
            {dataNext}
          </Card>
        </div>
        <br />
        <Table
          dataSource={dataMaterial}
          columns={columnsMaterial}
          className="tableGvResult"
          pagination={false}
          size="small"
          bordered
          scroll={{ y: 280, x: "max-content" }}
        />
        <br />
        <Table
          dataSource={dataDetail}
          columns={columnsDetail}
          className="tableGvResult"
          pagination={false}
          size="small"
          bordered
          style={{ width: "35%" }}
          scroll={{ y: 280, x: "max-content" }}
        />
      </Card>
    </>
  );
}

export default LotTrace;
