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
import { Table as AntTable, Select } from "antd";
import BackspaceIcon from "@mui/icons-material/Backspace";
import Header from "../Header/Header";
import React, { useEffect } from "react";
import { fn_ScanSMTConnectShtConfirm } from "./fn_ScanSMTConnectShtConfirm";
import Pageimg from "/src/assets/1.jpg";

import { Typography } from "antd";
import "./ScanSMTConnectShtConfirm.css";
function ScanSMTConnectShtConfirm() {
  const {
    hideImg,
    gvSerial,
    panalSerialState,
    txtLot,
    setTxtLot,
    txtLot_Change,
    ddlproduct,
    productSelected,
    setProductSelected,
    txtSerial,
    handletxtSerialChange,
    handle_Save_Click,
    handle_Cancel_Click,
    lblError,
    lblResultState,
    columns,
    ddlproduct_Change,
    ddlproductState,
    lblShtCount,
    lblTotalSht,
    gvScanResult,
    gvResutlState,
    lblResult
  } = fn_ScanSMTConnectShtConfirm();
  useEffect(() => {
    if (gvSerial != '' && txtSerial == ''){
      document.getElementById(`txtSerial_0`).focus();
    }
  }, [gvSerial]);
  return (
    <div>
      <Header />
      <h1>Confirm Sht&Pcs</h1>
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
            <td className="ScanSMTConnectShtConfirmmaintd">
              <Table
                className="ScanSMTConnectShtConfirmTable"
                component={Paper}
              >
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      Confirm Sht&Pcs
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Lot No.:</TableCell>
                    <TableCell>
                      <input
                        id="ScanSMTConnectShtConfirmtxtLot"
                        className="ScanSMTConnectShtConfirmtxtF"
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
                      <Button>
                        <BackspaceIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Product:</TableCell>
                    <TableCell>
                      <Select
                        style={{
                          width: 240,
                          textAlign: "left",
                          padding: "0px 5px 0px 0px",
                        }}
                        size={"small"}
                        value={productSelected}
                        onChange={(value) => {
                          ddlproduct_Change(value);
                        }}
                        options={ddlproduct.map((item) => ({
                          label: item.prd_name,
                          value: item.prd_name,
                        }))}
                      ></Select>
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Total Sht:</TableCell>
                    <TableCell>
                      <table
                        className="subTable"
                        style={{ display: "flex", marginLeft: "10px" }}
                      >
                        <tr style={{ background: "#8DECB4", width: "115px" ,borderRadius:'5%',height:'30px'}}>
                          <td> {lblTotalSht}</td>
                        </tr>
                        <tr style={{ background: "#FFF5E0", width: "115px" ,borderRadius:'5%',height:'30px'}}>
                          <td>{lblShtCount}</td>
                        </tr>
                      </table>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <h3
                style={{
                  textAlign: "center",
                  background: "red",
                  color: "yellow",
                }}
              >
                {lblError}
              </h3>
              &nbsp;&nbsp;
              {panalSerialState && (
                <Table className="GvSerialConnectConfirm" component={Card}>
                  <TableHead >
                    <TableRow>
                      <TableCell >No.</TableCell>
                      <TableCell >Sheet No.</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {gvSerial.map((row, index) => (
                      <TableRow
                        key={index}
                        style={{ padding: "4px 4px 4px 4px" }}
                      >
                        <TableCell
                          className=""
                          style={{ width: "40%", textAlign: "center" }}
                        >
                          {row.SEQ}
                        </TableCell>
                        <TableCell
                          className=""
                          style={{ width: "70%", paddingRight: "10px" }}
                        >
                          <input
                            id={`txtSerial_${index}`}
                            type="text"
                            style={{
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
                <div className="lblResultFin">
                  <Paper
                    className="lblResultCardMasterFinal"
                    elevation={3}
                    style={{
                      alignItems: "center",
                      // background: lblResult.value === "OK" ? "green" : lblResult.value === "NG" ? "red" : "white",
                    }}
                  >
                    <Typography
                      variant="h4"
                      style={{
                        // color: lblResult.styled.color,
                        fontSize: "30px",
                      }}
                    >
                      {lblResult}
                    </Typography>
                  </Paper>
                </div>
              )}
              <div style={{width:'900px'}}>
                {gvResutlState && (
                  // <Paper>
                    <AntTable
                      className="tableGvResultConncetShtConfirm"
                      columns={columns}
                      bordered
                      dataSource={gvScanResult}
                      style={{ width: "100%" }}
                      pagination={false}
                      size="small"
                    />
                  // </Paper>
                )}
                &nbsp; &nbsp;
              </div>
            </td>
          </tr>
        </table>
      </Card>
    </div>
  );
}

export default ScanSMTConnectShtConfirm;
