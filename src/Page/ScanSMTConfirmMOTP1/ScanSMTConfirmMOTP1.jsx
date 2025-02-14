import React, { useState, useEffect } from "react";
import {
  TextField,
  Card,
  Table,
  TableCell,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  Paper,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  InputLabel,
  Autocomplete,
  Box,
  Tooltip,
} from "@mui/material";
import { Table as AntTable, Button as AntButton } from "antd";
import "../Common/StyleCommon.css";
import Pageimg from "/src/assets/1.jpg";
import BackspaceIcon from "@mui/icons-material/Backspace";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import Header from "../Header/Header";
import "../ScanSMTConfirmMOTP1/ScanSMTConfirmMOTP1.css";
import { fn_ScanSMTConfirmMOTP1 } from "./fn_ScanSMTConfirmMOTP1";
import { fn_Homepage } from "../Homepage/fn_Homepage";
let data;
function ScanSMTConfirmMOTP1() {
  const {
    txtLot,
    settxtLot,
    selProduct,
    Productdata,
    lblLot,
    pnlLog,
    lblLog,
    lblResult,
    lblResultcolor,
    pnlSerial,
    hfSerialCount,
    gvScanResult,
    gvScanData,
    txtgvSerial,
    inputLot,
    ddlProduct,
    inputgvSerial,
    handleChangeLot,
    ibtBackClick,
    handleChangeProduct,
    handleChangeSerial,
    handleKeygvSerial,
    btnSaveClick,
    btnCancelClick,
    columnsgvResult,
    settxtgvSerial,
    gvSerialData
  } = fn_ScanSMTConfirmMOTP1();
  const { menuName } = fn_Homepage();
  return (
    <div>
      <Header />
      <Card component={Paper} className="Card-Common" sx={{ display: "flex" }}>
        <Box justifyContent="space-between">
          <TableContainer
            component={Card}
            style={{
              width: "450px",
            }}
          >
            <Table className="Header_Left">
              <TableHead>
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    {menuName ? menuName : "P1 Confirm Process"}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="right">
                    <Typography>Scan Lot :</Typography>
                  </TableCell>
                  <TableCell>
                    <TextField
                      className="input_txt"
                      size="small"
                      inputRef={(el) => (inputLot.current = el)}
                      fullWidth
                      value={txtLot.value.trim()}
                      disabled={txtLot.disabled}
                      style={{
                        backgroundColor: txtLot.disabled
                          ? "#e0e0e0"
                          : "inherit",
                      }}
                      onChange={(e) => {
                        settxtLot({ ...txtLot, value: e.target.value });
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleChangeLot();
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button className="Bt_ibtBack" onClick={ibtBackClick}>
                      <Tooltip title="Lock" placement="right-end">
                        <BackspaceIcon className="Icon_ibtBack" />
                      </Tooltip>
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">
                    <Typography>Product :</Typography>
                  </TableCell>
                  <TableCell colSpan={2}>
                    <Autocomplete
                      className="Select_dropDown"
                      disabled={selProduct.disabled}
                      style={{
                        backgroundColor: selProduct.disabled
                          ? "#e0e0e0"
                          : "inherit",
                      }}
                      value={selProduct.value}
                      onChange={(e, value) => handleChangeProduct(value)}
                      options={Productdata.map((item) => item.prd_name)}
                      renderInput={(params) => (
                        <TextField
                          inputRef={(el) => (ddlProduct.current = el)}
                          {...params}
                          size="small"
                          sx={{ textAlign: "left" }}
                        />
                      )}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">
                    <Typography>Lot :</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{lblLot}</Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          {pnlLog && (
            <Paper
              elevation={3}
              className="Card-lblLog"
              style={{
                width: "450px",
              }}
            >
              {lblLog}
            </Paper>
          )}

          {pnlSerial && (
            <div
              className="divgvSerialConfirm"
              //   style={{ position: "relative" }}
            >
              <TableContainer
                component={Card}
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  border: "1px solid #d9d9d9"
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>No.</TableCell>
                      <TableCell>Serial No.</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* {Array.from({ length: hfSerialCount }, (_, index) => ( */}
                    {console.log(txtgvSerial, "txtgvSerial")}
                    {txtgvSerial.map((serial, index) => (
                      <tr key={index}>
                        <td align="center">{index + 1}</td>
                        <td>
                          <input
                            // className="input_txt"
                            // size="small"
                            className="styleSeraial"
                            type="text"
                            fullWidth
                            // value={txtgvSerial[index] || ""}
                            defaultValue={serial}
                            // inputRef={(el) =>
                            //   (inputgvSerial.current[index] = el)
                            // }
                            ref={(el) =>
                              (inputgvSerial.current[index] = el)
                            }
                            onChange={(e) => {
                              handleChangeSerial(index, e);
                            }}
                            // onKeyDown={(e) => handleKeygvSerial(e, index)}
                            onKeyDown={async (event) => {
                              if (event.key === "Enter") {
                                event.preventDefault();
                                data = await handleChangeSerial(index, event);
                                if (index < gvSerialData.length - 1) {
                                  inputgvSerial.current[index + 1].focus();
                                } else {
                                  settxtgvSerial(data);
                                  btnSaveClick(data);
                                  event.target.blur();
                                }
                              }
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                  </TableBody>
                </Table>
                <div
                  style={{
                    marginTop: "8px",
                    display: "flex",
                    justifyContent: "center",
                    // marginLeft: "5px",
                    // marginBottom: "2px"
                  }}
                >
                  <AntButton
                    className="BtSave"
                    type="primary"
                    onClick={() => {
                      settxtgvSerial(data);
                      btnSaveClick(data);
                    }}
                  >
                    Save
                  </AntButton>
                  &nbsp;&nbsp;
                  <AntButton
                    className="ButtonDelete"
                    style={{ height: "30px" }}
                    type="primary"
                    onClick={btnCancelClick}
                  >
                    Cancel
                  </AntButton>
                </div>
              </TableContainer>
            </div>
          )}
          {/* <Button
                        style={{
                            width: '1px',
                            height: '1px',
                            padding: "0px"
                        }}
                        onClick={btnHiddenClick}
                    >
                        <FileDownloadOutlinedIcon />
                    </Button> */}
        </Box>

        <div className="divgvScanResultCon">
          {gvScanResult === false && (
            <>
              <img
                className="Img_GvResult"
                style={{ marginLeft: "35%" }}
                src={Pageimg} // Import the image
                alt="Description of the image"
              />
            </>
          )}

          {gvScanResult && (
            <>
              <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                <Paper
                  className="Card-lblResult"
                  style={{
                    background: lblResultcolor,
                    width: "99%",
                    marginLeft: "10px",
                  }}
                >
                  <Typography
                    variant="h4"
                    style={{ paddingTop: "5px", color: "#fff" }}
                  >
                    {lblResult}
                  </Typography>
                </Paper>
              </div>
              {/* <br /> */}
              <AntTable
                columns={columnsgvResult}
                dataSource={gvScanData}
                rowKey={(record) => record.SEQ}
                style={{
                  width: "99%",
                  border: "none",
                  borderCollapse: "collapse",
                  marginLeft: "10px",
                }}
                pagination={false}
                size="small"
                bordered
                className="tableGvResult"
                rowClassName={(record) =>
                  record.SCAN_RESULT === "NG"
                    ? "row-red"
                    : record.SCAN_RESULT === "OK"
                    ? "row-green"
                    : ""
                }
              />
            </>
          )}
        </div>
      </Card>
    </div>
  );
}

export default ScanSMTConfirmMOTP1;
