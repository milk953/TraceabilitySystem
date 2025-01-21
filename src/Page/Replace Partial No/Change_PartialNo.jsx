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
import { Table as AntTable, Spin, Button } from "antd";
import "./ChangePartialNO.css";
import Hearder from "../Header/Header";
import BackspaceIcon from "@mui/icons-material/Backspace";
import "../Common/StyleCommon.css";
import { fn_Change_PartialNo } from "../Replace Partial No/fn_Change_PartialNo";
import { fn_Homepage } from "../Homepage/fn_Homepage";
function ScanSheetMOTTime() {
  const { menuName } = fn_Homepage();
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
    fc_txtSerialNew,
    BtnCancel_Click,
    fc_total
  } = fn_Change_PartialNo();

  return (
    <div>
      <Hearder />

      {/* <Card component={Paper} className="Card-Common"> */}
        <Box className='Center_Layout'>
          <Grid container spacing={2}>
            <Grid item xs={10} md={12} align="center">
              {/* <Paper
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
              </Paper> */}

              <Table
                component={Card}
                className="Header_Center"
                style={{  }}
              >
                <TableHead >
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      align="center"
                      
                    >
                         {menuName}
                      {/* Replace Partial No. */}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                <TableRow>
  <TableCell align="center" style={{ width: "150px" }}>
    <Box display="flex" alignItems="center" justifyContent="center">
      <Typography>Total Partial No.:</Typography>
      <TextField
        size="small"
        className="input_txt"
        style={{ width: "50%", marginLeft: "8px" }}
        fullWidth
        value={txtTotalPcs}
        // onChange={(e) => {
        //   settxtTotalPcs(e.target.value);
        // }}
        onChange={(e) => {
          const value = e.target.value;
          if (/^\d*$/.test(value)) {
            settxtTotalPcs(value);
          }
        }}
        inputRef={(el) => (fc_total.current = el)}
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
              </Table>
    
              <Table
                className="CSS-GvSerial"
                style={{
               
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
                          inputRef={(el) =>
                            (fc_txtSerialOld.current[index] = el)
                          }
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
                              if (index < gvSerial.value.length-1) {
                            
                                fc_txtSerialOld.current[index+1].focus();
                              } else {
           
                                fc_txtSerialNew.current[0].focus();
                                // event.target.blur();
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
                          inputRef={(el) =>
                            (fc_txtSerialNew.current[index] = el)
                          }
                          value={txtSerialNoNew[index]}
           
                          onChange={(event) =>
                            handleSerialNewChange(index, event)
                          }
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
                        />
                      </TableCell>
                    </TableRow>
                  ))}

                  <TableRow>
                    <TableCell colSpan={3} style={{ textAlign: "center" }}>
                      {/* ถ้า loading เป็น false จะแสดงปุ่ม Submit */}
                      {/* {!loading && ( */}
                        <Button
                          type="primary"
                          className="ButtonReplace"
                          onClick={BtnSubmit_Click}
                        >
                          Submit
                        </Button>
                      {/* )}{" "} */}
                      &nbsp;
                      <Button type="primary" className="ButtonCancel" onClick={BtnCancel_Click}>
                        Cancel
                      </Button>
                      {/* ถ้า loading เป็น true จะแสดง Spin */}
                      {/* {loading && <Spin tip="Loading..." size="large" />} */}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <br />
              <AntTable
                columns={columns}
                dataSource={gvRow.value}
                pagination={false}
                size="small"
                bordered
                className="tableGvResult"
                style={{  display: gvRow.visble }}
              />
            </Grid>
            {/* <Grid item xs={10} md={7} >             */}
            {/* </Grid> */}
          </Grid>
        </Box>
      {/* </Card> */}
      {/* </Card> */}
    </div>
  );
}

export default ScanSheetMOTTime;
