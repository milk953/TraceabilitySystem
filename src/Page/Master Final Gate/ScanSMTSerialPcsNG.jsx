import React, { useState } from "react";
import Header from "../Header/Header";
import BackspaceIcon from "@mui/icons-material/Backspace";
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
import "./ScanSMTSerialPcsNG.css";
import { Typography ,Table as AntTable  } from "antd";
import { fn_ScanSMTSerialPcsNG } from "./fn_ScanSMTSerialPcsNG";
import Pageimg from "/src/assets/1.jpg";
import "../Common/StyleCommon.css";
function ScanSMTSerialPcsNG() {
  const {
    hideImg,
    lblResultState,
    ddlproduct,
    productSelected,
    setProductSelected,
    setTxtLot,
    txtLot,
    txtLot_Change,
    lblError,
    txtMasterCode,
    setTxtMasterCode,
    lblLot,
    lblLotTotal,
    lblSerialNG,
    panalSerialState,
    gvSerial,
    handle_ibtBack,
    handle_Cancel_Click,
    handle_Save_Click,
    ddlproduct_Change,
    txtSerial,
    setTxtSerial,
    handletxtSerialChange,
    txtmasterCode_Change,
    gvSerialResult,
    lblResult,
    columns,
    lblErrorState
  } = fn_ScanSMTSerialPcsNG();
  return (
    <div>
      <Header />
      <Card
        component={Paper}
        // style={{
        //   margin: "auto",
        //   width: "95%",
        //   maxWidth: "1450px",
        //   marginTop: "50px",
        //   minHeight: "200px",
        //   padding: "20px",
        //   overflow: "auto",
        // }}
      className="Card-Common"
      >
        <table>
          <tr>
            <td className="masterFGmaintd">
              <Table className="masterFGTable" component={Paper}>
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      Confirm Master Scan
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Scan Lot:</TableCell>
                    <TableCell>
                      <input
                        id="txtLot"
                        className="masterFGtxtF"
                        value={txtLot}
                        onChange={(e) => setTxtLot(e.target.value)}
                        // onBlur={txtLot_Change}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            txtLot_Change();
                          }
                        }}
                      ></input>
                    </TableCell>
                    <TableCell>
                      <Button onClick={handle_ibtBack}>
                        <BackspaceIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Product:</TableCell>
                    <TableCell>
                      {ddlproduct && (
                        <select
                          style={{ width: 240 }}
                          onChange={(e) => {
                            setProductSelected(e.target.value);
                            ddlproduct_Change();
                          }}
                          onInputChange={(e) => {
                            setProductSelected(e.target.value);
                            ddlproduct_Change();
                          }}
                          value={productSelected}
                        >
                          {ddlproduct.map((item) => (
                            <option key={item.prd_name} value={item.prd_name}>
                              {item.prd_name}
                            </option>
                          ))}
                        </select>
                      )}
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Master Code:</TableCell>
                    <TableCell>
                      <input
                        className="masterFGtxtF"
                        id="txtMasterCode"
                        onChange={(e) => setTxtMasterCode(e.target.value)}
                        value={txtMasterCode}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            txtmasterCode_Change();
                          }
                        }}
                      ></input>
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Table component={Paper} className="masterFGlblTable">
                <TableBody>
                  <TableRow>
                    <TableCell style={{ width: 30, textAlign: "right" }}>
                      Lot :
                    </TableCell>
                    <TableCell>{lblLot}</TableCell>
                    <TableCell
                      style={{ width: 30, color: "green", fontWeight: "bold" }}
                    >
                      OK:
                    </TableCell>
                    <TableCell style={{ width: 60 }}>{lblLotTotal}</TableCell>
                  </TableRow>
                </TableBody>
                <TableBody>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell
                      style={{ width: 30, color: "red", fontWeight: "bold" }}
                    >
                      NG:
                    </TableCell>
                    <TableCell>{lblSerialNG}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              {(lblErrorState &&
              <Paper
              className="Card-lblLog"
                // style={{
                //   textAlign: "center",
                //   background: "red",
                //   color: "yellow",
                // }}
              >
                {lblError}
              </Paper>
              ) }
              &nbsp;&nbsp;
              {panalSerialState && (
                <Table classname="masterFGgvSerial" component={Card}>
                  <TableHead className="gvSerialHead" style={{background:'#12422e'}}>
                    <TableRow>
                      <TableCell className="masterFGgvSerialCell" style={{color:'white'}}>
                        No.
                      </TableCell>
                      <TableCell className="masterFGgvSerialCell" style={{color:'white'}}>
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
                        <TableCell
                          className="masterFGgvSerialCell"
                          style={{ width: "40%", textAlign: "right" }}
                        >
                          {row.SEQ}
                        </TableCell>
                        <TableCell
                          className="masterFGgvSerialCell"
                          style={{ width: "70%", paddingRight: "10px" }}
                        >
                          <input
                            id={`txtSerial_${index}`}
                            type="text"
                            style={{
                              padding:'5px',
                              width: "300px",
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
                        <Button className="BtSave" onClick={handle_Save_Click}>
                          SAVE
                        </Button>
                        &nbsp;&nbsp;
                        <Button
                          className="BtCancel"
                          onClick={handle_Cancel_Click}
                        >
                          {" "}
                          Cancel
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              )}
            </td>
            <td
              style={{
                textAlign: "left",
                width: "900px",
                display: "flex",
                flexDirection: "column",
                alignItems: "left",
                padding: "0",
                margin: "0",
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
              {lblResultState && (
                <div className="lblResultMasterFinal">
                  <Paper
                    className="lblResultCardMasterFinal"
                    elevation={3}
                    style={{
                      alignItems: "center",
                      // background: lblResult.value === "OK" ? "green" : lblResult.value === "NG" ? "red" : "white",
                      background:
                      lblResult.value === "OK"
                        ? "#059212"
                        : lblResult.value === "NG"
                        ? "red"
                        : "#BA0900",
                    }}
                  >
                    <Typography
                      variant="h4"
                      style={{
                        color: lblResult.styled.color,
                        fontSize: "30px",
                      }}
                    >
                      {lblResult.value}
                    </Typography>
                  </Paper>
                  <AntTable
                  className="tableGvResult"
                  columns={columns}
                  bordered
                  dataSource={gvSerialResult}
                  style={{ width: "980pxs",marginTop:"10px" }}
                  pagination={false}
                  size="small"
                />
                  &nbsp; &nbsp;
                </div>
              )}
            </td>
          </tr>
        </table>
      </Card>
    </div>
  );
}

export default ScanSMTSerialPcsNG;
