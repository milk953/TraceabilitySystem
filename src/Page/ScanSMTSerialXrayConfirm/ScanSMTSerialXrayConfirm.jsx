//  *** Khun *** //
import React, { useEffect, useState, useRef } from "react";
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
  InputLabel,
  Autocomplete,
  Box,
  Checkbox,
  Grid,
  Input,
} from "@mui/material";
import { Table as AntTable, Button as ButtonAndt } from "antd";

import Pageimg from "/src/assets/1.jpg";
import {
  ArrowRightOutlined,
  DeleteOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import BackspaceIcon from "@mui/icons-material/Backspace";
import "./ScanSMTSerialXrayConfirm.css";
import "../Common/StyleCommon.css";
import Hearder from "../Header/Header";
import { fn_ScanSMTSerialXrayConfirm } from "./fn_ScanSMTSerialXrayConfirm";
import { fn_Homepage } from "../Homepage/fn_Homepage";
function ScanSMTSerialXrayConfirm() {
  const {
    txtLot,
    setTxtLot,
    txtLot_TextChanged,
    ddlProduct,
    setDdlProduct,
    ddlProduct_SelectedIndexChanged,
    Product,
    txtTotalPCS,
    setTxtTotalPCS,
    ibtBack_Click,
    lblpnlLog,
    pnlSerial,
    gvSerial,
    txtSerial,
    handleSerialChange,
    btnCancel_Click,
    btnSave_Click,
    txtTotalPCS_TextChanged,
    gvScanResult,
    columns,
    lblResult,
  } = fn_ScanSMTSerialXrayConfirm();
  const { menuName } = fn_Homepage();
  return (
    <div>
      <Hearder />
      <Card component={Paper} className="Card-Common">
        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
          <Grid container spacing={2}>
            <Grid item xs={10} md={4}>
              <Table className="Header_Left" component={Paper}>
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                    {menuName ? menuName : 'X-Ray Result Checking'}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="right">
                      <Typography> Lot No. :</Typography>
                    </TableCell>
                    <TableCell colSpan={2}>
                      <TextField
                        id="txtLot_ScanSMTSerialXrayConfirm_focus"
                        className="input_txt"
                        size="small"
                        fullWidth
                        autoComplete="off"
                        disabled={txtLot.disbled}
                        style={txtLot.style}
                        value={txtLot.value}
                        onChange={(e) => {
                          setTxtLot((prevState) => ({
                            ...prevState,
                            value: e.target.value.trim(),
                          }));
                        }}
                        // onKeyDown={(e) => {
                        //   if (e.key === "Enter") {
                        //     txtLot_TextChanged();
                        //   }
                        // }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            txtLot_TextChanged();
                            e.target.blur();
                          }
                        }}
                      ></TextField>
                    </TableCell>
                    <TableCell>
                      <Button onClick={ibtBack_Click} className="Bt_ibtBack">
                        <BackspaceIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right">
                      <Typography>Product :</Typography>
                    </TableCell>
                    <TableCell colSpan={3}>
                      <FormControl fullWidth>
                        <Autocomplete
                          id="ddlProduct_ScanSMTConnectRollConfirm_focus"
                          size="small"
                          className="Select_dropDown"
                          autoComplete="off"
                          value={ddlProduct.value}
                          style={ddlProduct.style}
                          disabled={ddlProduct.disbled}
                          onChange={(e, value) =>
                            ddlProduct_SelectedIndexChanged(value)
                          }
                          options={Product.map((item) => item.prd_name)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              size="small"
                              sx={{ textAlign: "left" }}
                            />
                          )}
                        />
                      </FormControl>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell align="right">
                      <Typography>Total Sht :</Typography>
                    </TableCell>
                    <TableCell>
                      <TextField
                        id="lblTotalSht_ScanSMTSerialXrayConfirm_focus"
                        autoComplete="off"
                        className="input_txt"
                        size="small"
                        value={txtTotalPCS.value}
                        onChange={(e) => {
                          const inputValue = e.target.value.trim();
                          const numericValue = inputValue.replace(/\D/g, "");
                          setTxtTotalPCS((prevState) => ({
                            ...prevState,
                            value: numericValue,
                          }));
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            txtTotalPCS_TextChanged();
                          }
                        }}
                        style={{ width: "100%" }}
                      ></TextField>
                    </TableCell>
                    <TableCell colSpan={2}>
                      <Typography
                        variant="body1"
                        style={{
                          width: "100%",

                          display: "flex",
                          justifyContent: "center",
                        }}
                      ></Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              {lblpnlLog.visble == true && (
                <Paper elevation={3} className="Card-lblLog">
                  {lblpnlLog.value}
                </Paper>
              )}

              <Table
                className="CSS-GvSerial"
                style={{
                  display: pnlSerial.visble ? "" : "none",
                }}
                component={Card}
              >
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{ borderRight: "1px solid #d9d9d9" }}
                      align="center"
                    >
                      No.
                    </TableCell>
                    <TableCell align="center">Leaf No.</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.isArray(gvSerial.value) &&
                    Array.from(
                      { length: gvSerial.value.length },
                      (_, index) => (
                        <TableRow key={index}>
                          <TableCell
                            align="center"
                            sx={{ borderRight: "1px solid #d9d9d9" }}
                          >
                            {index + 1}
                          </TableCell>
                          <TableCell>
                            <TextField
                              key={index}
                              size="small"
                              fullWidth
                              autoComplete="off"
                              id={`gvSerial_txtSerial_ScanSMTSerialXrayConfirm_${index}`}
                              className="input_txt"
                              value={txtSerial[index] || ""}
                              onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                  event.preventDefault();
                                  if (Number(txtTotalPCS.value) === index + 1) {
                                    btnSave_Click();
                                    event.target.blur();
                                  } else {
                                    handleSerialChange(index, event);
                                  }
                                }
                              }}
                              onChange={(event) =>
                                handleSerialChange(index, event)
                              }
                            />
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  {/* <TableRow>
                    <TableCell colSpan={2} style={{ textAlign: "center" }}>
                      <Button className="BtSave" onClick={btnSave_Click}>
                        Save
                      </Button>{" "}
                      &nbsp;&nbsp;
                      <Button className="BtCancel" onClick={btnCancel_Click}>
                        Cancel
                      </Button>
                    </TableCell>
                  </TableRow> */}
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      <ButtonAndt
                        className="ButtonReplace"
                        onClick={btnSave_Click}
                      >
                        Save
                      </ButtonAndt>
                      &nbsp;&nbsp;
                      <ButtonAndt
                        className="ButtonDelete"
                        onClick={btnCancel_Click}
                      >
                        Cancel
                      </ButtonAndt>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>

            {/* Result */}
            <Grid
              item
              xs={10}
              md={8}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {gvScanResult.visble === false && (
                <>
                  <img
                    className="Img_GvResult"
                    src={Pageimg}
                    alt="Description of the image"
                  />
                </>
              )}

              {gvScanResult.visble === true && (
                <>
                  {lblResult.value !== "" && (
                    <div
                      style={{ display: "flex", gap: "10px", width: "100%" }}
                    >
                      <Paper
                        className="Card-lblResult"
                        elevation={3}
                        style={{
                          background: lblResult.value == "OK" ? "green" : "red",
                          display: gvScanResult.visble ? "" : "none",
                        }}
                      >
                        <Typography
                          variant="h4"
                          style={{ paddingTop: "5px", color: "#fff" }}
                        >
                          {lblResult.value}
                        </Typography>
                      </Paper>
                    </div>
                  )}

                  <AntTable
                    columns={columns}
                    dataSource={gvScanResult.value}
                    pagination={false}
                    size="small"
                    bordered
                    className="tableGvResult"
                    rowClassName={(record) =>
                      record.scan_result === "-"
                        ? "row-red"
                        : record.scan_result === "PASS X-RAY"
                        ? "row-green"
                        : ""
                    }
                  />
                </>
              )}
            </Grid>
          </Grid>
        </Box>
      </Card>
    </div>
  );
}

export default ScanSMTSerialXrayConfirm;
