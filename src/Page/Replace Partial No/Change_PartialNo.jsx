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
import { Table as AntTable, Spin } from "antd";
import "./ChangePartialNO.css";
import Hearder from "../Header/Header";
import BackspaceIcon from "@mui/icons-material/Backspace";
import "../Common/StyleCommon.css";
import { fn_Change_PartialNo } from "../Replace Partial No/fn_Change_PartialNo";
function ScanSheetMOTTime() {
  const {
    columns,
    settxtSerialNo,
    settxtSerialNoNew,
    settxtTotalPcs,
    txtSerialNo,
    txtSerialNoNew,
    txtTotalPcs,
    txtTotalPcs_TextChanged,
    BtnSubmit_Click,
    gvSerial,
    handleSerialOldChange,
    handleSerialNewChange,
    lblResult,
    gvRow,
    loading,
    fc_txtSerialOld,
    fc_txtSerialNew
  } = fn_Change_PartialNo();

  return (
    <div>
      <Hearder />
     
      <Card component={Paper} className="Card-Common">
        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
          <Grid container spacing={2}>
            <Grid item xs={10} md={12} align="center">
              <Paper
                className="Card-lblResult"
                style={{
                  background: lblResult.style,
                  marginBottom: "10px",
                  width: "50%",
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

              <Table
                component={Card}
                className="ChangePartino"
                style={{ width: "50%" }}
              >
                <TableHead style={{ height: "60px" }}>
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      align="center"
                      style={{ fontSize: "30px" }}
                    >
                      <b>Replace Partial No.</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="right" style={{ width: "150px" }}>
                      <Typography>Total Partial No.:</Typography>
                    </TableCell>
                    <TableCell colSpan={2}>
                      <TextField
                        size="small"
                        className="input_txt"
                        style={{ width: "50%" }}
                        fullWidth
                        value={txtTotalPcs}
                        onChange={(e) => {
                          settxtTotalPcs(e.target.value);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            txtTotalPcs_TextChanged();
                          }
                        }}
                        // onBlur={txtTotalPcs_TextChanged}
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
                  // display: gvSerial.visblew
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
                    Old Partial No.
                  </TableCell>
                  <TableCell align="center">New Partial No.</TableCell>
                  <TableRow></TableRow>
                </TableHead>
                <TableBody>
                  {/* <TableRow> */}

                  {Array.from({ length: gvSerial.value.length }, (_, index) => (
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
                          className="input_txt"
                          size="small"
                          fullWidth
                          inputRef={(el) => (fc_txtSerialOld.current[index] = el)}
                          value={txtSerialNo[index]}
                          // onBlur={(event) => {
                          //   handleSerialOldChange(index, event);
                          // }}
                          onChange={(event) =>
                            handleSerialOldChange(index, event)
                          }
                          onKeyDown={(event) => {
                            if (event.key === "Enter") {
                              event.preventDefault();
                              if (index < gvSerial.value.length ) {
                                fc_txtSerialNew.current[index].focus();
                              } else {
                                BtnSubmit_Click();
                                event.target.blur();
                              }
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          key={index}
                          className="input_txt"
                          size="small"
                          fullWidth
                          inputRef={(el) => (fc_txtSerialNew.current[index] = el)}
                          value={txtSerialNoNew[index]}
                          // onBlur={(event) => {
                          //   handleSerialNewChange(index, event);
                          // }}
                          onChange={(event) =>
                            handleSerialNewChange(index, event)
                          }
                          onKeyDown={(event) => {
                            if (event.key === "Enter") {
                              event.preventDefault();
                              if (index < gvSerial.value.length-1 ) {
                               
                                fc_txtSerialOld.current[index + 1].focus();
                              } else {
                              
                                BtnSubmit_Click();
                                event.target.blur();
                              }
                            }
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}

                  <TableRow>
                    <TableCell colSpan={3} style={{ textAlign: "center" }}>
                      {/* ถ้า loading เป็น false จะแสดงปุ่ม Submit */}
                      {!loading && (
                        <Button className="BtSave" onClick={BtnSubmit_Click}>
                          Submit
                        </Button>
                      )}

                      {/* ถ้า loading เป็น true จะแสดง Spin */}
                      {loading && <Spin tip="Loading..." size="large" />}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <AntTable
                columns={columns}
                dataSource={gvRow.value}
                pagination={false}
                size="small"
                bordered
                className="tableGvResult"
                style={{ width: "70%", display: gvRow.visble }}
              />
            </Grid>
            {/* <Grid item xs={10} md={7} >             */}

            {/* </Grid> */}
          </Grid>
        </Box>
      </Card>
      {/* </Card> */}
    </div>
  );
}

export default ScanSheetMOTTime;
