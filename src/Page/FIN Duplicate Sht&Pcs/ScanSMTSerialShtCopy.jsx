import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import BackspaceIcon from "@mui/icons-material/Backspace";
import Pageimg from "/src/assets/1.jpg";
import {
  Button,
  Card,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import {Button as AntButton} from "antd";
import { Typography, Table as AntTable, Select } from "antd";
import { fn_ScanSMTSerialShtCopy } from "./fn_ScanSMTSerialShtCopy";
import { fn_Homepage } from "../Homepage/fn_Homepage";
import "../Common/StyleCommon.css";
import "./ScanSMTSerialShtCopy.css";
function ScanSMTSerialShtCopy() {
  const { menuName } = fn_Homepage();
  const {
    gvBackSideState,
    lblErrorState,
    panalSerialState,
    hideImg,
    lblResultState,
    pnlRollLeafState,
    pnlMachineState,
    pnlButtonFixState,
    txtlotNo,
    ddlProduct,
    setTxtlotNo,
    ddlproduct_Change,
    productSelected,
    setProductSelected,
    txtLotRef,
    setTxtLotRef,
    txtRollLeaf,
    setTxtRollLeaf,
    txtCheckRoll,
    setTxtCheckRoll,
    txtMachineNo,
    setTxtMachineNo,
    txtButtonFix,
    setTxtButtonFix,
    txtTopFix,
    lblTotalSht,
    lblTotalPcs,
    setTxtTopFix,
    handle_txtlotNo_Change,
    gvBackSide,
    txtbackSide,
    handletxtBackSide,
    lblError,
    ddlProductState,
    handle_ibtnBack_Click,
    gvSerial,
    txtSerial,
    handletxtSerialChange,
    handle_Cancel_Click,
    handle_Save_Click,
    handle_txtLotRef_Change,
    handle_txtRollleaf_Change,
    lblResult,
    gvScanResult,
    columns,
    getRowClassName
  } = fn_ScanSMTSerialShtCopy();
  return (
    <>
      <Header />
      <Card component={Paper} 
      className="Card-Common"
      >
        <table>
          <tr>
            <td className="FinCopytxtFtable">
              <Table className="FinCopyTable" component={Paper}>
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                    {menuName || 'FIN Duplicate Sht&Pcs'}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Lot No.:</TableCell>
                    <TableCell>
                      <input
                        id="txtlotNoFinCopy"
                        className="FinCopytxtF"
                        value={txtlotNo}
                        onChange={(e) => {
                          setTxtlotNo(e.target.value.trim());
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handle_txtlotNo_Change(e);
                          }
                        }}
                      ></input>
                    </TableCell>
                    <TableCell>
                      <Button onClick={handle_ibtnBack_Click}>
                        <BackspaceIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Product:</TableCell>
                    <TableCell colSpan={2}>
                      <Select
                        style={{
                          width: '98%',
                          textAlign: "left",
                          padding: "0px 5px 0px 0px",
                        }}
                        id="ddlProductFinCopy"
                        disabled={ddlProductState}
                        size={"small"}
                        value={productSelected}
                        onChange={(value) => {
                          ddlproduct_Change(value);
                        }}
              
                        options={ddlProduct.map((item) => ({
                          label: item.prd_name,
                          value: item.prd_name,
                        }))}
                      ></Select>
                    </TableCell>
                    {/* <TableCell></TableCell> */}
                  </TableRow>
                  <TableRow>
                    <TableCell>Lot Ref. No.:</TableCell>
                    <TableCell>
                      <input className="FinCopytxtF" 
                      id = 'txtLotRefFinCopy'
                      value={txtLotRef} 
                      onChange={(e) => {
                        setTxtLotRef(e.target.value.trim());
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handle_txtLotRef_Change(e);
                        }
                      }}
                      
                      ></input>
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Total Sht:</TableCell>
                    <TableCell className="CelllblSpan">{lblTotalSht}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Total Pcs:</TableCell>
                    <TableCell className="CelllblSpan">{lblTotalPcs}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  {pnlRollLeafState && (
                    <>
                      <TableRow>
                        <TableCell>Roll Leaf No.:</TableCell>
                        <TableCell>
                          <input
                            className="FinCopytxtF"
                            id="txtRollLeafFinCopy"
                            value={txtRollLeaf}
                            onChange={(e) => {
                              setTxtRollLeaf(e.target.value);
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                handle_txtRollleaf_Change(e);
                              }
                            }}
                          ></input>
                        </TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Check Roll:</TableCell>
                        <TableCell>
                          <input
                            className="FinCopytxtF"
                            value={txtCheckRoll.text}
                            style={txtCheckRoll.styled}
                          ></input>
                        </TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </>
                  )}
                  {pnlMachineState && (
                    <TableRow>
                      <TableCell>Machine No.:</TableCell>
                      <TableCell>
                        <input
                          id="txtMachineNoFinCopy"
                          className="FinCopytxtF"
                          value={txtMachineNo}
                          onChange={(e) => {
                            setTxtMachineNo(e.target.value);
                          }}
                        ></input>
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  )}
                  {gvBackSideState &&
                    gvBackSide.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell style={{ textAlign: "right" }}>
                          {row.TITLE}
                        </TableCell>
                        <TableCell>
                          <input
                            className="FinCopytxtF"
                            id={`txtbackSide_${index}`}
                            type="text"
                            style={{
                              textTransform: "uppercase",
                            }}
                            maxLength="30"
                            value={txtbackSide[index]}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                handletxtBackSide(index, e);
                              }
                            }}
                            onChange={(e) => handletxtBackSide(index, e)}
                          />
                        </TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              {pnlButtonFixState && (
                <Table component={Paper} className="FinCopyTable">
                  <TableBody>
                    <TableRow>
                      <TableCell>Button Fixture:</TableCell>
                      <TableCell>
                        <input className="FinCopytxtF"></input>
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Top Fixture:</TableCell>
                      <TableCell>
                        <input className="FinCopytxtF"></input>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              )}
              {lblErrorState && (
                <Paper className="Card-lblLog">{lblError}</Paper>
              )}
              
              {panalSerialState && (
                <Table classname="FinCopygvSerial" component={Card}>
                  <TableHead
                    style={{ background: "#12422e" }}
                  >
                    <TableRow>
                      <TableCell
                        className="FinCopygvSerialCell"
                        style={{ color: "white" }}
                      >
                        Sheet.
                      </TableCell>
                      <TableCell
                        className="FinCopygvSerialCell"
                        style={{ color: "white" }}
                      >
                        No.
                      </TableCell>
                      <TableCell
                        className="FinCopygvSerialCell"
                        style={{ color: "white" }}
                      >
                        Serial No.
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {gvSerial.map((row, index) => (
                      <TableRow
                        key={index}
                        style={{ padding: "4px 4px 4px 4px" }}
                      >
                        {row.SEQ === 0 ? (
                          <>
                            <TableCell
                              className="FinCopygvSerialCell"
                              style={{ width: "80%", textAlign: "right" }}
                              colSpan={2}
                            >
                              {row.SHEET}
                            </TableCell>
                          </>
                        ) : (
                          <>
                            <TableCell
                              className="FinCopygvSerialCell"
                              style={{ width: "40%", textAlign: "right" }}
                            >
                              {row.SHEET}
                            </TableCell>
                            <TableCell
                              className="FinCopygvSerialCell"
                              style={{ width: "40%", textAlign: "right" }}
                            >
                              {row.SEQ}
                            </TableCell>
                          </>
                        )}
                        <TableCell
                          className="FinCopygvSerialCell"
                          style={{ width: "70%", paddingRight: "10px" }}
                        >
                          <input
                            id={`txtSerial_${index}`}
                            type="text"
                            style={{
                              padding: "5px",
                              width: "230px",
                              textTransform: "uppercase",
                            }}
                            maxLength="30"
                            value={txtSerial[index]}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
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
                        <AntButton
                          className="BtSave"
                          onClick={handle_Save_Click}
                        >
                          Save
                        </AntButton>
                        &nbsp;&nbsp;
                        <AntButton
                          className="BtCancel"
                          onClick={handle_Cancel_Click}
                        >
                          {" "}
                          Cancel
                        </AntButton>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              )}
            </td>
            <td className="tdResult">
              {hideImg && (
                <img
                  // className="imgPage"
                  className="Img_GvResult"
                  src={Pageimg}
                  alt="Description of the image"
                />
              )}
              {lblResultState && (
                <div className="lblResultFinCopy">
                  <Paper
                    className="lblResultCardFinCopy"
                    elevation={3}
                    style={{
                      alignItems: "center",
                      background: lblResult.text === "OK" ? "green" : lblResult.text === "NG" ? "red" : "white",
                      background:
                      lblResult.text === "OK"
                        ? "green"
                        : lblResult.text === "NG"
                        ? "red"
                        : "red",
                    }}
                  >
                    <Typography
                      variant="h4"
                      style={{
                        color: lblResult.styled.color,
                        fontSize: "30px",
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
                  style={{ width: "980pxs",marginTop:"10px" }}
                  pagination={false}
                  size="small"
                  rowClassName={getRowClassName}
                />
                  &nbsp; &nbsp;
                </div>
              )}
            </td>
          </tr>
        </table>
      </Card>
    </>
  );
}

export default ScanSMTSerialShtCopy;
