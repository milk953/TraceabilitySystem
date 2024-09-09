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
import { Typography } from "antd";
import { fn_ScanSMTSerialPcsNG } from "./fn_ScanSMTSerialPcsNG";
import Pageimg from "/src/assets/1.jpg";
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
  } = fn_ScanSMTSerialPcsNG();
  return (
    <div>
      <Header />
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
              <h2
                style={{
                  textAlign: "center",
                  background: "red",
                  color: "yellow",
                }}
              >
                {lblError}
              </h2>
              &nbsp;&nbsp;
              {panalSerialState && (
                <Table classname="masterFGgvSerial" component={Paper}>
                  <TableHead className="gvSerialHead">
                    <TableRow>
                      <TableCell className="masterFGgvSerialCell">
                        No.
                      </TableCell>
                      <TableCell className="masterFGgvSerialCell">
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
                      background: lblResult.value === "OK" ? "green" : lblResult.value === "NG" ? "red" : "white",
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
                  <Table
                    className="gvScanResultMasterFinal"
                    component={Paper}
                    style={{ width: "960px", margunBottom: "20px" }}
                  >
                    <TableHead sx={{ height: "20px" }}>
                      <TableRow>
                        <TableCell>No.</TableCell>
                        <TableCell>Serial No.</TableCell>
                        <TableCell>Re-Judgement 1</TableCell>
                        <TableCell>Result</TableCell>
                        <TableCell>Re-Judgement 2</TableCell>
                        <TableCell>Test Result</TableCell>
                        <TableCell>Scan Result</TableCell>
                        <TableCell>Remark</TableCell>
                      </TableRow>
                    </TableHead>

                    {gvSerialResult.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.SEQ}</TableCell>
                        <TableCell>{row.SERIAL}</TableCell>
                        <TableCell>{row.REJECT}</TableCell>
                        <TableCell>{row.TOUCH_UP}</TableCell>
                        <TableCell>{row.REJECT2}</TableCell>
                        <TableCell>{row.SERIAL == '' ? '' : row.TEST_RESULT}</TableCell>
                        <TableCell sx={{background:row.SCAN_RESULT == 'NG'? 'red' : row.SCAN_RESULT == 'OK' ? 'green' : 'white'}}>{row.SCAN_RESULT}</TableCell>
                        <TableCell>{row.REMARK}</TableCell>
                      </TableRow>
                    ))}
                  </Table>
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
