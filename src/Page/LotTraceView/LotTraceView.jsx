import React, { useEffect, useState, useRef } from "react";
import "../Common/StyleCommon.css";
import Hearder from "../Header/Header";
import { Card, Paper } from "@mui/material";
import {
  Input,
  Button,
  Table,
  Typography,
  Tag,
  Tooltip,
  Avatar,
  Spin,
} from "antd";
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
    columnsgvMaterial,
    columnsgvLot,
    columnsgvRouting,
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
    settxtSerialNo,
    txtSheetNo,
    settxtSheetNo,
    txtSerialNo,
    loadingDoc,
    handleExport
  } = fn_LotTraceView();

  return (
    <>
      <Hearder />

      <Card component={Paper} className="Card-Common">
        <Spin tip="Loading..." spinning={loadingDoc}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
  <div>
    <Input
      placeholder="Lot No. :"
      style={{ width: "250px" }}
      value={txtLotNo}
      onChange={(e) => {
        settxtLotNo(e.target.value.trim());
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          btnSearch_Click()
        }
      }}
      ref={fc_txtLotNo}
    />{" "}
    &nbsp;
    <Input
      placeholder="Sheet No. :"
      style={{ width: "300px" }}
      value={txtSheetNo}
      onChange={(e) => {
        settxtSheetNo(e.target.value.trim().toUpperCase());
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          btnSearch_Click()
        }
      }}
    />{" "}
    &nbsp;
    <Input
      placeholder="Serial No.   :"
      style={{ width: "300px" }}
      value={txtSerialNo}
      onChange={(e) => {
        settxtSerialNo(e.target.value.trim().toUpperCase());
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          btnSearch_Click()
        }
      }}
    />{" "}
    &nbsp;
    <Button
      type="primary"
      icon={loading ? <LoadingOutlined /> : <SearchOutlined />}
      onClick={() => btnSearch_Click()}
      disabled={loading ? true : false}
    >
      Search
    </Button>
    &nbsp;
    <Button
      type="primary"
      danger
      icon={<UndoOutlined />}
      onClick={() => reset()}
    >
      Clear
    </Button>
  </div>
  <Button
    style={{ marginRight: "10px" ,height:'30px'}}
    size="small"
    disabled={txtLotNo === '' && txtSheetNo=== '' && txtSerialNo === '' ? true : false}
    icon={<Avatar shape="square" src={excel} size="small" />}
    onClick={() =>
      handleExport()
    }
  >
    Export
  </Button>
</div>
         
          <div style={{ display: "flex", gap: "10px" }}>
            <Card
              component={Paper}
              className="Card-ViewLot1"
              style={{ width: "180px" }}
            >
              <b style={{ fontSize: "20px", color: "#151515" }}>Lot No.</b>
              <br />
              <b>{lblLotNo}</b>
            </Card>
            <Card
              component={Paper}
              className="Card-ViewLot1"
              style={{ width: "200px" }}
            >
              <b style={{ fontSize: "20px", color: "#151515" }}>
                {" "}
                Product Name{" "}
              </b>
              <br />
              <b> {txtProd}</b>
            </Card>
            <Card
              component={Paper}
              className="Card-ViewLot1"
              style={{ width: "180px", display: txtPreviousLotNo.visible }}
            >
              <b style={{ fontSize: "20px", color: "#151515" }}>
                Previous Lot No.{" "}
              </b>
              <br />
              <a
                href={`/TraceabilitySystem/LotTraceView?lot=${txtPreviousLotNo.text}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#fff", textDecoration: "underline" }}
              >
                <b>{txtPreviousLotNo.text}</b>
              </a>
            </Card>
            <Card
              component={Paper}
              className="Card-ViewLot1"
              style={{ width: "180px", display: txtNextLotNo.visible }}
            >
              <b style={{ fontSize: "20px", color: "#151515" }}>
                Next Lot No.{" "}
              </b>
              <br />
              <a
                href={`/TraceabilitySystem/LotTraceView?lot=${txtNextLotNo.text}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#fff", textDecoration: "underline" }}
              >
                <b>{txtNextLotNo.text}</b>
              </a>
            </Card>
            <div>
              <Card
                component={Paper}
                className="Card-ViewLot3"
                style={{ width: "80px" }}
              >
                {txtLotNo === "" && txtProd === "_ _ _ _ _ _ _ _ _ _ _ _" ? (
                  <span style={{ color: "#fff", cursor: "not-allowed" }}>
                    <b
                      style={{ fontSize: "16px", textDecoration: "underline" }}
                    >
                      Sheet No.
                    </b>
                  </span>
                ) : (
                  <a
                    href={`/TraceabilitySystem/LotSheetNo?lot=${txtLotNo}&product=${txtProd}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#fff" }}
                  >
                    <b
                      style={{ fontSize: "16px", textDecoration: "underline" }}
                    >
                      Sheet No.
                    </b>
                  </a>
                )}
              </Card>

              <Card
                component={Paper}
                className="Card-ViewLot3"
                style={{ width: "80px" }}
              >
                {txtLotNo === "" && txtProd === "_ _ _ _ _ _ _ _ _ _ _ _" ? (
                  <span style={{ color: "#fff", cursor: "not-allowed" }}>
                    <b
                      style={{ fontSize: "16px", textDecoration: "underline" }}
                    >
                      Roll Leaf
                    </b>
                  </span>
                ) : (
                  <a
                    href={`/TraceabilitySystem/LotRollLeafNo?LOTNO=${txtLotNo}&product=${txtProd}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#fff" }}
                  >
                    <b
                      style={{ fontSize: "16px", textDecoration: "underline" }}
                    >
                      Roll Leaf
                    </b>
                  </a>
                )}
              </Card>
            </div>

            <Card
              component={Paper}
              className="Card-ViewLot1"
              style={{ width: "210px" }}
            >
              <b style={{ fontSize: "20px", color: "#151515" }}>
                {" "}
                Connect Sheet{" "}
              </b>
              <br />
              <div
                style={{ cursor: "pointer", textDecoration: "underline" }}
                onClick={() => setShtSerialGrid(txtLotNo)}
              >
                <b> {lbtConnectSht.value}</b>
              </div>
            </Card>
            <Card className="Card-ViewLot1" style={{ width: "170px" }}>
              <b style={{ fontSize: "20px", color: "#151515" }}>Final Gate</b>
              <br />
              <b style={{ color: "#6EC207" }}>
                OK: &nbsp;
                <span
                  onClick={() => setFinalGateGrid(txtLotNo, "OK")}
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                >
                  {lbtFinalGate.valueOK}
                </span>
              </b>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <b style={{ color: "#C70039" }}>
                NG: &nbsp;
                <span
                  onClick={() => setFinalGateGrid(txtLotNo, "NG")}
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                >
                  {lbtFinalGate.valueNG}
                </span>
              </b>
            </Card>

            <div>
              <Card
                component={Paper}
                className="Card-ViewLot2"
                style={{ display: lblTitleShtFront.visible, }}
              >
                <b style={{ fontSize: "16px", color: "#151515" }}>
                Sheet No.(F){" "}
                </b>

                <a
                  href={`/TraceabilitySystem/SheetTraceView?SHEETNO=${lblTitleShtFront.value}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#151515" , textDecoration: "underline"}}
                >
                  {lblTitleShtFront.value}
                </a>
              </Card>

              <Card
                component={Paper}
                className="Card-ViewLot2"
                style={{ display: lblTitleShtBack.visible, color: "#151515" }}
              >
                <b style={{ fontSize: "16px", color: "#151515" }}>
                  {" "}
                  Sheet No.(B){" "}
                </b>
                <a
                  href={`/TraceabilitySystem/SheetTraceView?SHEETNO=${lblTitleShtBack.value}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#151515" , textDecoration: "underline"}}
                >
                {lblTitleShtBack.value}
                </a>

              </Card>
            </div>
          </div>
          <div
            style={{
              width: "87%",
              display: "flex",
              justifyContent: "flex-end",
              display: gvMaterial.value.length > 0 ? "flex" : "none",
            }}
          >
           
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
          {/*----------------------------- Table2--------------------- */}
          <div
            style={{
              marginTop: "5px",
              width: "99%",
              display: "flex",
              justifyContent: "flex-end",
              display: gvRouting.value.length > 0 ? "flex" : "none",
            }}
          >

          </div>
          <Table
            style={{ width: "100%" }}
            columns={columnsgvRouting}
            dataSource={gvRouting.value}
            className="tableGvResultViewLot"
            pagination={false}
            size="small"
            bordered
            // scroll={{ y: 265 }}
          />

          <br />
        </Spin>
      </Card>
    </>
  );
}

export default LotTraceView;
