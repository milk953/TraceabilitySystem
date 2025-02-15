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
import { Button } from "antd";
import "./Change_Serial.css";
import Hearder from "../Header/Header";
import BackspaceIcon from "@mui/icons-material/Backspace";
import "../Common/StyleCommon.css";
import { fn_Change_Serial } from "../Change_Serial/fn_Change_Serial";
import { fn_Homepage } from "../Homepage/fn_Homepage";
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
    fc_txtSerialOld, fc_txtSerialNew,
  } = fn_Change_Serial();
  const { menuName } = fn_Homepage();
  return (
    <div>
      <Hearder />
      <Box className="Center_Layout">
        <Grid container spacing={2}>
          <Grid item xs={10} md={12} align="center">
            {/* {lblResult.value.trim() !== "" && (
                <Paper
                  className="Card-lblResult"
                  style={{
                    background: lblResult.style,
                    marginBottom: "10px",
                    width: "600px",
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
              )} */}

            <Table component={Card} className="Header_Center">
              <TableHead>
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    {menuName ? menuName : "Serial Config"}
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow>
                  <TableCell align="center" style={{ width: "150px" }}>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Typography>Total Piece :</Typography>
                      <TextField
                        size="small"
                        className="input_txt"
                        style={{ width: "50%", marginLeft: "8px" }}
                        fullWidth
                        autoComplete="off"
                        value={txtTotalPcs.value}
                        onChange={(e) => {
                          const inputValue = e.target.value.trim();
                          const numericValue = inputValue.replace(/\D/g, "");
                          setTxtTotalPcs((prevState) => ({
                            ...prevState,
                            value: numericValue,
                          }));
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            txtTotalPcs_TextChanged();
                          }
                        }}
                      />
                    </Box>
                  </TableCell>
                </TableRow>
              </TableBody>

              {/* <TableBody>
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
                      autoComplete="off"
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
              </TableBody> */}
            </Table>
            <Table
              className="CSS-GvSerial"
              style={{
                marginTop: "5px",
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
                  Array.from({ length: gvSerial.value.length }, (_, index) => (
                    <tr key={index}>
                      <td
                        align="center"
                        sx={{ borderRight: "1px solid #d9d9d9" }}
                      >
                        {index + 1}
                      </td>
                      <td>
                        <input
                          key={index}
                          size="small"
                          fullWidth
                          autoComplete="off"
                          // id={`gvSerial_txtSerialNoOld_${index}`}
                          ref={(el) =>
                            (fc_txtSerialOld.current[index] = el)
                          }
                          className="txtinput"
                          value={txtSerialNoOld[index] || ""}
                          // onKeyDown={(event) => {
                          //   if (event.key === "Enter") {
                          //     if (txtTotalPcs.value == index + 1) {
                          //       fnSetFocus(`gvSerial_txtSerialNoNew_${0}`);
                          //     } else {
                          //       handleSerialOldChange(index, event);
                          //     }
                          //   }
                          // }}
                          onKeyDown={(event) => {
                            if (event.key === "Enter") {
                              event.preventDefault();
                              if (index < gvSerial.value.length-1) {
                                fc_txtSerialOld.current[index+1].focus();  
                              } else {
                                fc_txtSerialNew.current[0].focus();
                              }
                            }
                          }}
                          onChange={(event) =>
                            handleSerialOldChange(index, event)
                          }
                        />
                      </td>
                      <td>
                        <input
                          key={index}
                          size="small"
                          fullWidth
                          autoComplete="off"
                          // id={`gvSerial_txtSerialNoNew_${index}`}
                          ref={(el) =>
                            (fc_txtSerialNew.current[index] = el)
                          }
                          className="txtinput"
                          value={txtSerialNoNew[index] || ""}
                          // onKeyDown={(event) => {
                          //   if (event.key === "Enter") {
                          //     if (txtTotalPcs.value == index + 1) {
                          //       BtnSubmit_Click();
                          //     } else {
                          //       handleSerialNewChange(index, event);
                          //     }
                          //   }
                          // }}
                          onKeyDown={(event) => {
                            if (event.key === "Enter") {
                              event.preventDefault();
                              if (index < gvSerial.value.length - 1) {
                                fc_txtSerialNew.current[index+1].focus();
                              } else {
                                event.target.blur();
                                BtnSubmit_Click();
                          
                              }
                            }
                          }}
                          onChange={(event) =>
                            handleSerialNewChange(index, event)
                          }
                        />
                      </td>
                    </tr>
                  ))}
                <TableRow>
                  <TableCell
                    colSpan={6}
                    style={{ textAlign: "center", verticalAlign: "middle" }}
                  >
                    <Button
                      className="ButtonReplace"
                      onClick={BtnSubmit_Click}
                    >
                      Submit
                    </Button>
                    &nbsp;&nbsp;
                    <Button
                      className="ButtonCancel"
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
    </div>
  );
}

export default Change_Serial;
