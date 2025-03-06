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
import BackspaceIcon from "@mui/icons-material/Backspace";
import "./ScanSMTSerialBackendConfirm.css";
import Hearder from "../Header/Header";
import { fn_ScanSMTSerialBackendConfirm } from "./fn_ScanSMTSerialBackendConfirm";
import Pageimg from "/src/assets/1.jpg";
import { fn_Homepage } from "../Homepage/fn_Homepage";

function ScanSMTSerialBackendConfirm() {
  const { menuName } = fn_Homepage();
  const {
    txtLotNo,
    settxtLotNo,
    selProduct,
    Productdata,
    txtTotalPCS,
    settxtTotalPCS,
    lblLog,
    visiblelog,
    lblResultcolor,
    lblResult,
    pnlSerial,
    gvScanResult,
    txtgvSerial,
    txtLotDisabled,
    selProDisabled,
    txtTotalDisabled,
    gvScanData,
    handleChangeLot,
    handleChangeProduct,
    handleChangeTotalPCS,
    hfSerialCount,
    ibtBackClick,
    btnSaveClick,
    btnCancelClick,
    handleChangeSerial,
    inputLot,
    ddlProduct,
    inputTotal,
    inputgvSerial,
    handleKeygvSerial,
    columns,
    settxtgvSerial
  } = fn_ScanSMTSerialBackendConfirm();
let data =[];
  return (
    <div>
      <Hearder />
      <Card component={Paper} className="Card-Common" sx={{ display: "flex" }}>
        <Box
          justifyContent="space-between"
          // sx={{
          //     marginLeft: "-6px",
          //     marginTop: "-10px"
          // }}
        >
          <TableContainer
            component={Card}
            style={{
              width: "430px",
              //margin: "4px",
            }}
          >
            <Table className="Header_Left">
              <TableHead>
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    {/* <Typography variant="h6">
                                            SMT Backend E-Mapping
                                        </Typography> */}
                    {menuName ? menuName : "SMT Backend E-Mapping"}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="right">
                    <Typography>Lot No. :</Typography>
                  </TableCell>
                  <TableCell>
                    <TextField
                      className="input_txt"
                      size="small"
                      inputRef={inputLot}
                      fullWidth
                      value={txtLotNo.trim()}
                      disabled={txtLotDisabled}
                      style={{
                        backgroundColor: txtLotDisabled ? "#e0e0e0" : "inherit",
                      }}
                      onChange={(e) => {
                        settxtLotNo(e.target.value);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleChangeLot();
                        }
                      }}
                      onBlur={() => {
                        if (txtLotNo !== "") {
                          handleChangeLot();
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button className="Bt_ibtBack" onClick={ibtBackClick}>
                      <Tooltip title="Clear Lot" placement="right-end">
                        <BackspaceIcon className="Icon_ibtBack" />
                      </Tooltip>
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">
                    <Typography>Product :</Typography>
                  </TableCell>
                  <TableCell>
                    <Autocomplete
                      className="Select_dropDown"
                      disabled={selProDisabled}
                      style={{
                        backgroundColor: selProDisabled ? "#e0e0e0" : "inherit",
                      }}
                      value={selProduct}
                      onChange={(e, value) => handleChangeProduct(value)}
                      options={Productdata.map((item) => item.prd_name)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          inputRef={ddlProduct}
                          size="small"
                          sx={{ textAlign: "left" }}
                        />
                      )}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">
                    <Typography>Total Sht :</Typography>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <TextField
                        className="input_txt"
                        size="small"
                        inputRef={inputTotal}
                        fullWidth
                        value={txtTotalPCS}
                        disabled={txtTotalDisabled}
                        style={{
                          backgroundColor: txtTotalDisabled
                            ? "#e0e0e0"
                            : "inherit",
                          width: "60px",
                        }}
                        onChange={(e) => {
                          const newValue = e.target.value;
                          if (/^\d*$/.test(newValue)) {
                            settxtTotalPCS(newValue);
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleChangeTotalPCS();
                          }
                        }}
                        InputProps={{
                          inputProps: {
                            style: {
                              textAlign: "center",
                            },
                          },
                        }}
                      />
                      <Typography style={{ marginLeft: "10px" }}>
                        Pcs
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          {visiblelog && (
            <Paper
              elevation={3}
              className="Card-lblLog"
              style={{
                width: "430px",
                // marginLeft: "20px",
              }}
            >
              {lblLog}
            </Paper>
          )}

          {pnlSerial && (
            <div className="divgvSerialBack">
              <TableContainer
                component={Card}
                style={{
                  width: "430px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  marginTop: "10px",
                  border: "1px solid #d9d9d9",
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
                    {/* {Array.from({ length: txtTotalPCS }, (_, index) => ( */}
                    {txtgvSerial.map((serial, index) => (
                      <tr key={index}>
                        <td
                          style={{ borderRight: "1px solid #d9d9d9" }}
                          align="center"
                        >
                          {index + 1}
                        </td>
                        <td>
                          <input
                            // className="input_txt"
                            // size="small"
                            fullWidth
                                className="styleSeraial"
                            type="text"
                            // value={txtgvSerial[index] || ""}
                            // inputRef={(el) =>
                            //   (inputgvSerial.current[index] = el)
                            // }
                            defaultValue={serial}
                            ref={(el) =>
                                (inputgvSerial.current[index] = el)
                              }
                            onChange={(e) => {
                              data = handleChangeSerial(index, e);
                            }}
                            // onKeyDown={(e) => handleKeygvSerial(e, index)}
                            onKeyDown={async (event) => {
                                if (event.key === "Enter") {
                                  event.preventDefault();
                                  data = await handleChangeSerial(index, event);
                                  if (index < txtgvSerial.length - 1) {
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
        </Box>

        <div className="divgvScanResultBack">
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
                    width: "100%",
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

              <AntTable
                columns={columns}
                dataSource={gvScanData}
                rowKey={(record) => record.SEQ}
                style={{ width: "100%" }}
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

export default ScanSMTSerialBackendConfirm;
