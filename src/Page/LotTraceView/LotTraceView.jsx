import React, { useEffect, useState, useRef } from "react";
import "../Common/StyleCommon.css";
import Hearder from "../Header/Header";
import { Card, Paper } from "@mui/material";
import { Input, Button, Table, Typography, Tag, Tooltip, Avatar ,Spin} from "antd";
const { Text } = Typography;
import { fn_LotTraceView } from "./fn_LotTraceView";
import excel from "/src/assets/excel.png";
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
    gvProcessLink,
    columnsgvMaterial,
    columnsgvLot,
    columnsgvRouting,
    columnsgvProcessLink,
    loading,
    reset,
    lblLotNo,
    txtProd,
    txtPreviousLotNo,
    txtNextLotNo,
    lbtFinalGate,
    lblTitleShtFront,
    lblTitleShtBack,
    lbtConnectSht,
    setShtSerialGrid,
    setFinalGateGrid,
    ExportTableToCSV,
    loadingDoc
  } = fn_LotTraceView();

  return (
    <>
      <Hearder />
      <h1>LotTraceView</h1>
      <Card component={Paper} className="Card-Common">
      <Spin tip="Loading..." spinning={loadingDoc} >
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
          icon={loading ? <LoadingOutlined /> : <SearchOutlined />}
          // icon={<SearchOutlined />}
          onClick={() => btnSearch_Click()}
          disabled={loading ? true : false}
        >
          Execute
        </Button>
        &nbsp;
        <Button
          type="primary"
          danger
          icon={<UndoOutlined />}
          onClick={() => reset()}
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
            <b>{lblLotNo}</b>
          </Card>
          <Card
            component={Paper}
            className="Card-ViewLot1"
            style={{ width: "200px" }}
          >
            <b style={{ fontSize: "20px" }}> Product Name </b>
            <br />
            <b> {txtProd}</b>
          </Card>
          <Card
            component={Paper}
            className="Card-ViewLot1"
            style={{ width: "250px", display: txtPreviousLotNo.visible }}
          >
            <b style={{ fontSize: "20px" }}>Previous Lot No. </b>
            <br />
            <a
              href={`/TraceabilitySystem/LotTraceView?lot=${txtPreviousLotNo.text}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#fff" }}
            >
              <b>{txtPreviousLotNo.text}</b>
            </a>
          </Card>
          <Card
            component={Paper}
            className="Card-ViewLot1"
            style={{ width: "180px", display: txtNextLotNo.visible }}
          >
            <b style={{ fontSize: "20px" }}>Next Lot No. </b>
            <br />
            <a
              href={`/TraceabilitySystem/LotTraceView?lot=${txtNextLotNo.text}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#fff" }}
            >
              <b>{txtNextLotNo.text}</b>
            </a>
          </Card>
          <Card
            component={Paper}
            className="Card-ViewLot1"
            style={{ width: "180px" }}
          >
            <a
              href={`http://10.17.74.226/TraceabilitySystem/LotSheetNo?lot=${txtLotNo}&product=${txtProd}`}
              // http://10.17.74.226/TraceabilitySystem/LotSheetNo?lot=900035953&product=dsafjisdf
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#fff" }}
            >
              {" "}
              <b style={{ fontSize: "18px" }}>Sheet No. </b> {/*linkkkk */}
            </a>
            <br />
            <a
              href={`http://10.17.74.226/TraceabilitySystem/LotRollLeafNo?LOTNO=${txtLotNo}&product=${txtProd}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#fff" }}
            >
              {" "}
              <b style={{ fontSize: "18px" }}> Roll Leaf</b> {/*linkkkk */}
            </a>
            {/* http://10.17.74.226/TraceabilitySystem/LotRollLeafNo?LOTNO=${txtLotNo}&product=${txtProd} */}
          </Card>
          <Card
            component={Paper}
            className="Card-ViewLot1"
            style={{ width: "210px" }}
          >
            <b style={{ fontSize: "20px" }}> Connect Sheet </b>
            <br />
            <div
              style={{ cursor: "pointer" }}
              onClick={() => setShtSerialGrid(txtLotNo)}
            >
              <b> {lbtConnectSht.value}</b>
            </div>
          </Card>
          <Card className="Card-ViewLot1" style={{ width: "170px" }}>
            <b style={{ fontSize: "20px" }}>Final Gate</b>
            <br />
            <b style={{ color: "#6EC207" }}>
              OK:
              <span
                onClick={() => setFinalGateGrid(txtLotNo, "OK")}
                style={{ cursor: "pointer" }}
              >
                &nbsp; {lbtFinalGate.valueOK}
              </span>
            </b>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <b style={{ color: "#C70039" }}>
              NG:
              <span
                onClick={() => setFinalGateGrid(txtLotNo, "NG")}
                style={{ cursor: "pointer" }}
              >
                &nbsp; {lbtFinalGate.valueNG}
              </span>
            </b>
          </Card>

          <div>
            <Card
              component={Paper}
              className="Card-ViewLot2"
              style={{ display: lblTitleShtFront.visible }}
            >
              <b style={{ fontSize: "16px" }}>Sheet Front: </b>
              {lblTitleShtFront.value}
            </Card>

            <Card
              component={Paper}
              className="Card-ViewLot2"
              style={{ display: lblTitleShtBack.visible }}
            >
              <b style={{ fontSize: "16px" }}> Sheet Back: </b>
              {lblTitleShtBack.value}
            </Card>
          </div>
        </div>
        <br />
        <div
          style={{
            width: "87%",
            display: "flex",
            justifyContent: "flex-end",
            display: gvMaterial.value.length > 0 ? "flex" : "none",
          }}
        >
          <Button
            size="small"
            icon={<Avatar shape="square" src={excel} size="small" />}
            onClick={() =>
              ExportTableToCSV(
                gvMaterial.value,
                columnsgvMaterial,
                "MAT_" + txtLotNo + ".xls"
              )
            }
          >
            Export
          </Button>
        </div>
        <div style={{ display: "flex", width: "100%" }}>
          {/*----------------------------- Table1.1--------------------- */}
          <Table
            style={{ width: "88%", fontSize: "12px" }}
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
            style={{ width: "12%" }}
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
        <div
          style={{
            width: "99%",
            display: "flex",
            justifyContent: "flex-end",
            display: gvRouting.value.length > 0 ? "flex" : "none",
          }}
        >
          <Button
            size="small"
            icon={<Avatar shape="square" src={excel} size="small" />}
            onClick={() =>
              ExportTableToCSV(
                gvRouting.value,
                columnsgvRouting,
                "Proc_" + txtLotNo + ".xls"
              )
            }
          >
            Export
          </Button>
        </div>
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
          dataSource={gvProcessLink.value}
          columns={columnsgvProcessLink}
          className="tableGvResultViewLot"
          pagination={false}
          size="small"
          bordered
        />
           </Spin>
      </Card>
    </>
  );
}

export default LotTraceView;
