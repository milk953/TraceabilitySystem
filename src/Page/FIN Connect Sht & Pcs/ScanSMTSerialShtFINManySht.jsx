import React, { useEffect, useState } from "react";
import {
  TextField,
  Table,
  TableBody,
  TableCell,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TableHead,
  TableContainer,
  Box,
  Tooltip,
  Autocomplete,
  Grid,
  Paper,
  Card,
  Typography,
} from "@mui/material";

import BackspaceIcon from "@mui/icons-material/Backspace";
import "./ScanSMTSerialShtFINManySht.css";
import "../Common/StyleCommon.css";
import Hearder from "../Header/Header";
import { fn_ScanSMTSerialShtFINManySht } from "./fn_ScanSMTSerialShtFINManySht";
import { Table as AntTable } from "antd";
import Pageimg from "/src/assets/1.jpg";
function ScanSMTSerialShtFINManySht() {
  const {
    productCombo,
    productSelect,
    setProductSelect,
    lotValue,
    setLotValue,
    lotState,
    btnBack_Click,
    Fctxtlot,
    ProductSelect_Change,
    txtLot_Change,
    pnlRollLeafState,
    lblTotalSht,
    lblLog,
    lblLogState,
    txtLotRef,
    setTxtLotRef,
    lblTotalPcs,
    lblCheckRoll,
    gvBackSideState,
    gvBackSide,
    txtRollLeaf,
    setTxtRollLeaf,
    FCtxtRollleaf,
    txtmcno,
    setTxtmcno,
    Fctxtmcno,
    pnlMachineState,
    FcgvBackside,
    FcgvFrontside,
    FcSelectproduct,
    selectproductState,
    pnlBoardState,
    panalSerialState,
    gvSerial,
    txtRollLeaf_Change,
    txtLotRef_Change,
    txtOperator,
    setTxtOperator,
    FctxtOperator,
    txtOperator_Change,
    btnSave_Click,
    btnCancel_Click,
    txtSideFront,
    txtSideBack,
    handleBackSideChange,
    handleFrontSideChange,
    txtSerial,
    handletxtSerialChange,
    txtBoardNoB,
    setTxtBoardNoB,
    txtBoardNoF,
    setTxtBoardNoF,
    FctxtBoardnoB,
    FctxtBoardnoF,
    lblResultState,
    lblResult,
    gvScanResult,
    hideImg,
    columns,
  } = fn_ScanSMTSerialShtFINManySht();
  useEffect(() => {
    if (gvBackSideState === true) {
      FcgvBackside.current.focus();
    }
  }, [gvBackSideState]);
  return (
    <div>
      <Hearder />
      <h1>ScanSMTRoollSht</h1>
      <Card
        component={Paper}
        style={{
          margin: "auto",
          width: "95%",
          maxWidth: "1450px",
          marginTop: "50px",
          minHeight: "200px",
          padding: "20px",
          overflow: "auto",
        }}
      >
        <table>
          <tr>
            <td className="maintd">
              <Table className="mainTable" component={Card}>
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      FIN Connect Sht & Pcs
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ width: "400px" }}>Lot No.:</TableCell>
                    <TableCell>
                      <input
                        className="txtField"
                        id="txtlot"
                        value={lotValue}
                        onChange={(e) => setLotValue(e.target.value)}
                        disabled={lotState.styled.disabled}
                        style={lotState.styled}
                        ref={Fctxtlot}
                        // onBlur={txtLot_Change}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            txtLot_Change();
                          }
                        }}
                      ></input>
                    </TableCell>
                    <TableCell>
                      <Button onClick={btnBack_Click}>
                        <BackspaceIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Product:</TableCell>
                    <TableCell>
                      <FormControl fullWidth>
                        <select
                          onInputChange={(e) =>
                            ProductSelect_Change(e.target.value)
                          }
                          onChange={(e) => ProductSelect_Change(e.target.value)}
                          // onBlur={ProductSelect_Change}
                          value={productSelect}
                          disabled={selectproductState}
                          ref={FcSelectproduct}
                        >
                          {productCombo.map((option, index) => (
                            <option key={index} value={`${option.prd_name}`}>
                              {`${option.prd_name}`}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Lot Ref. No.:</TableCell>
                    <TableCell>
                      <input
                        size="small"
                        className="txtField"
                        value={txtLotRef}
                        onChange={
                          ((e) => setTxtLotRef(e.target.value),
                          { txtLotRef_Change })
                        }
                      ></input>
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Operator:</TableCell>
                    <TableCell>
                      <input
                        size="small"
                        className="txtField"
                        ref={FctxtOperator}
                        value={txtOperator}
                        onChange={(e) => {
                          setTxtOperator(e.target.value),
                            { txtOperator_Change };
                        }}
                      ></input>
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Total Sht:</TableCell>
                    <TableCell>{lblTotalSht}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Total Pcs:</TableCell>
                    <TableCell>{lblTotalPcs}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  {pnlRollLeafState && (
                    <>
                      <TableRow>
                        <TableCell>Roll Leaf No.:</TableCell>
                        <TableCell>
                          <input
                            size="small"
                            className="txtField"
                            ref={FCtxtRollleaf}
                            value={txtRollLeaf}
                            onChange={(e) => {
                              setTxtRollLeaf(e.target.value);
                            }}
                            onBlur={txtRollLeaf_Change}
                          ></input>
                        </TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Check Roll:</TableCell>
                        <TableCell style={lblCheckRoll.styled}>
                          {lblCheckRoll.text}
                        </TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </>
                  )}
                  {pnlMachineState && (
                    <>
                      <TableRow>
                        <TableCell>Machine No.:</TableCell>
                        <TableCell>
                          <input
                            size="small"
                            className="txtField"
                            ref={Fctxtmcno}
                            value={txtmcno}
                            onChange={(e) => {
                              setTxtmcno(e.target.value);
                            }}
                          ></input>
                        </TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </>
                  )}
                </TableBody>
              </Table>
              {/* <td> */}
              {gvBackSideState && (
                <div className="pnlBackside">
                  <Table component={Card} className="gvBackSide">
                    <TableBody>
                      {gvBackSide.map((row, index) => (
                        <TableRow
                          key={index}
                          style={{ backgroundColor: "White" }}
                        >
                          <TableCell>{row.SEQ}</TableCell>
                          <TableCell>{row.TITLE}</TableCell>
                          <TableCell>
                            <input
                              type="text"
                              id="gvBackside_1"
                              style={{
                                width: "98%",
                                textTransform: "uppercase",
                              }}
                              maxLength="30"
                              className="styleEnable"
                              ref={FcgvBackside}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  FcgvFrontside.current.focus();
                                }
                              }}
                              value={txtSideBack[index]}
                              onChange={(e) => handleBackSideChange(index, e)}
                            />
                            <input
                              type="text"
                              id="gvBackside_2"
                              style={{
                                width: "98%",
                                textTransform: "uppercase",
                              }}
                              maxLength="30"
                              ref={FcgvFrontside}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  document
                                    .getElementById(`txtSerial_0`)
                                    .focus();
                                  handleFrontSideChange(index, e);
                                }
                              }}
                              className="styleEnable"
                              value={txtSideFront[index]}
                              onChange={(e) => handleFrontSideChange(index, e)}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {pnlBoardState && (
                    <>
                      <Table component={Paper} sx={{ marginTop: 2 }}>
                        <TableRow>
                          <TableCell>Bottom Fixture</TableCell>
                          <TableCell>
                            <input
                              size="small"
                              className="txtField"
                              ref={FctxtBoardnoB}
                              value={txtBoardNoB}
                              onChange={(e) => {
                                setTxtBoardNoB(e.target.value);
                              }}
                            ></input>
                          </TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Top Fixture:</TableCell>
                          <TableCell>
                            <input
                              size="small"
                              className="txtField"
                              ref={FctxtBoardnoF}
                              value={txtBoardNoF}
                              onChange={(e) => {
                                setTxtBoardNoF(e.target.value);
                              }}
                            ></input>
                          </TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </Table>
                    </>
                  )}
                </div>
              )}
              {lblLogState && (
                <div className="lblLog">
                  <Table className="lblTbLog">
                    <TableCell>{lblLog}</TableCell>
                  </Table>
                </div>
              )}
              <div className="panelgvSerial">
                {panalSerialState && (
                  <Table className="gvSerial" component={Card}>
                    <TableHead
                      sx={{
                        background: "#12422e",
                        padding: "5px",
                        color: "white",
                      }}
                    >
                      <TableRow>
                        <TableCell
                          className="gvSerialThead"
                          style={{ width: "30px" }}
                        >
                          Sheet
                        </TableCell>
                        <TableCell
                          className="gvSerialThead"
                          style={{ width: "30px" }}
                        >
                          No.
                        </TableCell>
                        <TableCell className="gvSerialThead">
                          Serial No.
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {console.log(gvSerial,'gvSerial')}
                      {gvSerial.map((row, index) => (
                        <TableRow
                          key={index}
                          style={{ padding: "4px 4px 4px 4px" }}
                        >
                          <TableCell
                            className="gvSerialCell"
                            style={{ width: "10px", textAlign: "right" }}
                          >
                            {row.SHEET}
                          </TableCell>
                          <TableCell
                            className="gvSerialCell"
                            style={{ width: "10px", textAlign: "right" }}
                          >
                            {row.SEQ}
                          </TableCell>
                          <TableCell
                            className="gvSerialCell"
                            style={{ width: "300px", paddingRight: "10px" }}
                          >
                            <input
                              id={`txtSerial_${index}`}
                              type="text"
                              style={{
                                width: "90%",
                                textTransform: "uppercase",
                              }}
                              maxLength="30"
                              className="styleEnable"
                              value={txtSerial[index]}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  document
                                    .getElementById(`txtSerial_0`)
                                    .focus();
                                  handletxtSerialChange(index, e);
                                }
                              }}
                              onChange={(e) => handletxtSerialChange(index, e)}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell
                          colSpan={3}
                          style={{
                            textAlign: "center",
                            padding: "3px",
                            gap: "10px",
                          }}
                        >
                          <Button className="BtSave" onClick={btnSave_Click}>
                            SAVE
                          </Button>
                          &nbsp;&nbsp;
                          <Button
                            className="BtCancel"
                            onClick={btnCancel_Click}
                          >
                            {" "}
                            Cancel
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                )}
              </div>
            </td>
            {/* </td> */}
            <td
              style={{
                textAlign: "center",
                width: "900px",
                padding: "0",
                margin: '0',
                verticalAlign: "top",
                
              }}
            >
              {hideImg && (
                <img
                  style={{
                    width: "320px",
                    height: "250px",
                    padding: "0",
                    align: "center",
                    margin: "auto",
                  }}
                  src={Pageimg}
                  alt="Description of the image"
                />
              )}
              <td>
              {lblResultState && (
                <div className="lblResultFin">
                  <Paper
                    className="lblResultCard"
                    elevation={3}
                    style={{
                      alignItems: "center",
                      background:
                        lblResult.text === "OK"
                          ? "#059212"
                          : lblResult.text === "NG"
                          ? "red"
                          : "#BA0900",
                    }}
                  >
                    <Typography
                      variant="h4"
                      style={{
                        paddingTop: "5px",
                        color: lblResult.styled.color
                      }}
                    >
                      {lblResult.text}
                    </Typography>
                  </Paper>
                <AntTable
                  className="tableGvResult"
                  columns={columns}
                  bordered
                  dataSource={gvScanResult}
                  style={{ width: "1000px",marginTop:"10px" }}
                  pagination={false}
                  size="small"
                />

                </div>                
              )}
              
              </td>
            </td>
          </tr>
        </table>
      </Card>
    </div>
  );
}

export default ScanSMTSerialShtFINManySht;
