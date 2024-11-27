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

import {
  ArrowRightOutlined,
  DeleteOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { Table as AntTable } from "antd";
import "./Change_Serial.css";
import Hearder from "../Header/Header";
import BackspaceIcon from "@mui/icons-material/Backspace";
import "../Common/StyleCommon.css";
import { fn_Change_Serial } from "../Change_Serial/fn_Change_Serial";

function Change_Serial() {
  const {
    gvSerial,
    txtTotalPcs,
    setTxtTotalPcs,
    txtTotalPcs_TextChanged,
    BtnSubmit_Click,
    BtnCancle_Click,
    txtSerialNoOld,
    handleSerialOldChange,
    txtSerialNoNew,
    handleSerialNewChange,
    lblResult,
    gvNewSerial,
    fnSetFocus,
  } = fn_Change_Serial();

  return (
    <div>
      <Hearder />
      <Card component={Paper} className="Card-Common">
        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
          <Grid container spacing={2}>
            <Grid item xs={10} md={12} align="center">
              {lblResult.value.trim() !== "" && (
                <Paper
                  className="Card-lblResult"
                  style={{
                    background: lblResult.style,
                    marginBottom: "10px",
                    width: "50%",
                    height: "auto",
                    display: lblResult.visble,
                  }}
                >
                  <Typography
                    variant="h5"
                    style={{ paddingTop: "6px", color: "#fff" }}
                  >
                    {lblResult.value}
                  </Typography>
                </Paper>
              )}

              <Table
                component={Card}
                className="ChangePartino"
                style={{ width: "50%" }}
              >
                <TableBody>
                  <TableRow>
                    <TableCell align="right" style={{ width: "150px" }}>
                      <Typography>Total Piece :</Typography>
                    </TableCell>
                    <TableCell colSpan={2}>
                      <TextField
                        size="small"
                        className="input_txt"
                        style={{ width: "50%" }}
                        fullWidth
                        value={txtTotalPcs.value}
                        onChange={(e) => {
                          const inputValue = e.target.value.trim();
                          const numericValue = inputValue.replace(/\D/g, ""); // กรองเฉพาะตัวเลข
                          setTxtTotalPcs((prevState) => ({
                            ...prevState,
                            value: numericValue, // อัปเดตเฉพาะค่าตัวเลข
                          }));
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            txtTotalPcs_TextChanged();
                          }
                        }}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Table
                className="CSS-GvSerial"
                style={{
                  width: "50%",
                  marginTop: "20px",
                }}
                component={Card}
              >
                <TableHead>
                  <TableCell
                    sx={{ borderRight: "1px solid #d9d9d9" }}
                    align="center"
                  >
                    No.
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ borderRight: "1px solid #d9d9d9" }}
                  >
                    Old Piece No.
                  </TableCell>
                  <TableCell align="center">New Piece No.</TableCell>
                  <TableRow></TableRow>
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
                              id={`gvSerial_txtSerialNoOld_${index}`}
                              className="input_txt"
                              value={txtSerialNoOld[index] || ""}
                              onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                  if (txtTotalPcs.value == index + 1) {
                                    fnSetFocus(`gvSerial_txtSerialNoNew_${0}`);
                                  } else {
                                    handleSerialOldChange(index, event);
                                  }
                                }
                              }}
                              onChange={(event) =>
                                handleSerialOldChange(index, event)
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              key={index}
                              size="small"
                              fullWidth
                              id={`gvSerial_txtSerialNoNew_${index}`}
                              className="input_txt"
                              value={txtSerialNoNew[index] || ""}
                              onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                  if (txtTotalPcs.value == index + 1) {
                                    BtnSubmit_Click();
                                  } else {
                                    handleSerialNewChange(index, event);
                                  }
                                }
                              }}
                              onChange={(event) =>
                                handleSerialNewChange(index, event)
                              }
                            />
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      <Button
                        className="BtSave"
                        onClick={BtnSubmit_Click}
                        style={{ margin: "0 10px" }}
                      >
                        Submit
                      </Button>
                      <Button
                        className="BtCancel"
                        style={{ margin: "0 10px" }}
                        onClick={BtnCancle_Click}
                      >
                        Cancel
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </div>
  );
}

export default Change_Serial;
